import NetInfo from "@react-native-community/netinfo"

export const getNetInfo = async () => {
    return await NetInfo.fetch()
}