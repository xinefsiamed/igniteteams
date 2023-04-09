import { TextInputProps, TextInput } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";


type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {

  const { COLORS } = useTheme()

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}