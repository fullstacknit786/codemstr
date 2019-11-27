import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
    android: `${RNFS.ExternalStorageDirectoryPath}/myAppName`
});

export const dirPicutures = `${RNFS.ExternalStorageDirectoryPath}/Pictures`;
//export const dirAudio = `${dirHome}/Audio`;