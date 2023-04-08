import { getPlayersByGroup } from "./getPlayersByGroup"

export async function getPlayersByGroupAndTeam(groupName: string, team: string) {

  try {

    const storage = await getPlayersByGroup(groupName)

    const players = storage.filter(player => player.team === team)

    return players
  } catch (error) {
    throw error
  }

}