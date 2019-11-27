import { AsyncStorage } from 'react-native'

export const getAllFiles = async () => {
    const keys = await AsyncStorage.getAllKeys()
    return await Promise.all(keys.map(async (key) => await AsyncStorage.getItem(key)))
}
