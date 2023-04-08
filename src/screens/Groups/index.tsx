import { useState, useCallback } from "react";
import { FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';


import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { getAllGroups } from '@storage/group/getAllGroups';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([
  ])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      const data = await getAllGroups();
      setGroups(data)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  )

  return (
    <Container>
      <Header showBackButton />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )
        }
        style={{ marginBottom: 5 }}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
      />

      <Button title='Adicione' onPress={handleNewGroup} />
    </Container>
  )
}