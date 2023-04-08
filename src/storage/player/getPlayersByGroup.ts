import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";


export async function getPlayersByGroup(groupName: string) {
  try {

    const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${groupName}`)
    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    return players
  } catch (error) {
    throw error
  }

}