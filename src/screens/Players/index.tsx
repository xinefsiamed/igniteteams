import { useState, useEffect, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FlatList, Alert, TextInput } from 'react-native'

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { getPlayersByGroupAndTeam } from '@storage/player/getPlayersByGroupAndTeam';
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup';
import { removeGroupByName } from '@storage/group/removeGroupByName';

import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';


type RouteParams = {
  group: string
}


export function Players() {
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {

    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    const newPlayer = Object.assign({
      name: newPlayerName,
      team
    }) as PlayerStorageDTO


    try {
      await playerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Nova pessoa", error.message)
      }

      console.log(error)
      Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
    }

  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await getPlayersByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRemovePlayer(playerName: string) {

    try {

      await removePlayerByGroup(playerName, group)
      fetchPlayersByTeam()

    } catch (error) {
      console.log(error)
      Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.')
    }

  }

  async function removeGroup() {
    try {

      await removeGroupByName(group)
      navigation.navigate('groups')

    } catch (error) {
      Alert.alert('Remover grupo', 'Não foi possivel remover esse grupo.')
    }
  }

  async function handleRemoveGroup() {
    Alert.alert(
      'Remover',
      'Deseja remover esse grupo?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => removeGroup()
        }
      ]
    )
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {
        isLoading ? <Loading /> :
          <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={<ListEmpty message='Não há pessoas nesse time' />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { paddingBottom: 100 },
              players.length === 0 && { flex: 1 }
            ]}
          />
      }
      <Button title='Remover turma' type='SECONDARY' onPress={handleRemoveGroup} />
    </Container>
  )
}