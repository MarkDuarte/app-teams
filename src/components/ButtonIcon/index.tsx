import { TouchableOpacityProps } from 'react-native'

import { Container, Icon, ButtonIconTypeStyleProps } from './styles'

type Props = TouchableOpacityProps & {
  icon: string
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcons({ icon, type='PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon 
        name={icon} 
        type="PRIMARY"
      />
    </Container>
  )
}