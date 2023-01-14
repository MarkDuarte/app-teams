import { useState } from 'react'
import { FlatList } from 'react-native'

import { ButtonIcons } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { PlayerCard } from '@components/PlayersCard'
import { ListEmpty } from '@components/ListEmpty'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Button } from '@components/Button'

export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState([])
  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input 
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcons 
          icon="add"
          type="PRIMARY" 
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

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>
      </HeaderList>

      <FlatList 
        data={players}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item} 
            onRemove={() => {}}
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

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />

    </Container>
  )
}