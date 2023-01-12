import { ButtonIcons } from '@components/ButtonIcon'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Container, Form } from './styles'

export function Players() {
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
        <ButtonIcons icon="add" />
      </Form>
    </Container>
  )
}