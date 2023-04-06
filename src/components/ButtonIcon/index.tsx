import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./styles";


type ButtonIconProps = TouchableOpacityProps & {

}

export function ButtonIcon({ ...rest }: ButtonIconProps) {

  return (
    <Container {...rest}>
      <Icon name="home" type="SECONDARY" />
    </Container>
  )
}