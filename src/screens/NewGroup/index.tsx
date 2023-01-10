import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight 
          title="Nova Turma"
          subtitle="Crie a turma para adicionar pessoas"
        />

        <Input 
          placeholder="Nome da turma"
        />

        <Button 
          title="Criar Turmas"
          style={{ marginTop: 20 }}
        />

      </Content>
    </Container>
  )
}