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
import { Loading } from "@components/Loading";

export function Groups() {

  const [groups, setGroups] = useState<string[]>([
  ])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)

      const data = await getAllGroups();
      setGroups(data)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  )

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {
        isLoading ? <Loading /> :
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )
            }
            style={{ marginBottom: 5 }}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
          />
      }

      <Button title='Adicione' onPress={handleNewGroup} />
    </Container>
  )
}