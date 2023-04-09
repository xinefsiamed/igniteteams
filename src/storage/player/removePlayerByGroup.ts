import AsyncStorage from "@react-native-async-storage/async-storage"
import { getPlayersByGroup } from "./getPlayersByGroup"
import { PLAYER_COLLECTION } from "@storage/storageConfig"


export async function removePlayerByGroup(playerName: string, groupName: string) {

  try {

    const storedPlayers = await getPlayersByGroup(groupName)

    const filteredPlayers = storedPlayers.filter(player => player.name !== playerName)

    const players = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, players)

  } catch (error) {
    throw error
  }

}