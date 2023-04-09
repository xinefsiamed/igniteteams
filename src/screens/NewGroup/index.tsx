import { useNavigation } from "@react-navigation/native";
import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useState } from "react";
import { createGroup } from "@storage/group/createGroup";
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";

export function NewGroup() {

  const [group, setGroup] = useState<string>('')

  const navigation = useNavigation()

  async function handleNew() {
    try {

      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informe o nome da turma.')
      }

      await createGroup(group)
      navigation.navigate("players", { group })
    } catch (error) {

      if (error instanceof AppError) {
        return Alert.alert('Novo grupo', error.message)
      }

      Alert.alert('Novo grupo', 'Não foi possivel criar um novo grupo')
      console.log(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="crie a turma para adicionar as pessoas" />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}