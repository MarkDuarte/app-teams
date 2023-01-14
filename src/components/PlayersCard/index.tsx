import { ButtonIcons } from '@components/ButtonIcon'
import { Container, Icon, Name } from './styles'

type Props = {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon 
        name="person"
      /> 

      <Name>
        {name}
      </Name>

      <ButtonIcons 
        icon="close"
        type="SECONDARY"
        onPress={onRemove} 
      />
    </Container>
  )
}