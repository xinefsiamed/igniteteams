import { TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";


type InputProps = TextInputProps & {

}

export function Input({ ...rest }: InputProps) {

  const { COLORS } = useTheme()

  return (
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}