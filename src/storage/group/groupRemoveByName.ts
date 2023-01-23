import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupGetAll'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storageGroups = await groupsGetAll()
    const groups = storageGroups.filter((group) => group !== groupDeleted)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

  } catch (error) {

  }
}