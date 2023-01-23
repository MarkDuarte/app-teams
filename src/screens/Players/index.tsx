import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AppError } from '@utils/AppError'

import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

import { ButtonIcons } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { PlayerCard } from '@components/PlayersCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      console.log(newPlayerName)
      fetchPlayerByTeam()

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      setIsLoading(true)
      
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayerByTeam();
      
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Pessoa', 'Não foi possível remover a pessoa selecionada.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)

      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Grupo', 'Não foi possível remover a turma.')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remove',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    )
  }

  useEffect(() => {
    console.log('useEffect executou!!')
    fetchPlayerByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName} 
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcons 
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)} 
            />
          )}
          horizontal
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      { isLoading ? <Loading /> : 
        <FlatList 
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item.name} 
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty 
              message="Não há pessoas nesse time."
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[ 
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 } 
          ]}
        />
      }

      <Button 
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />

    </Container>
  )
}