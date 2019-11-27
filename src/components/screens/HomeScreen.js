import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Image, Alert, TouchableOpacity, AsyncStorage } from 'react-native'

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

import * as FileSystem from 'expo-file-system'
import Preview from '../../modules/preview';
import { getAllFiles } from '../../utils/getAllFiles';
import { getNetInfo } from '../../utils/netInfo';


class HomeScreen extends Component {
    state = {
        previewUrl: '',
        base64: '',
        netInfo: {}
    }

    async componentDidMount() {
        console.log(await getAllFiles())

        this.setState({
            netInfo: await getNetInfo()
        })
        // AsyncStorage.clear()

        // AsyncStorage.getAllKeys((err, keys) => {

        //     // AsyncStorage.getItem(keys[keys.length - 1]).then(value => {
        //     //     this.setState({ previewUrl: JSON.parse(value).file })
        //     //     FileSystem.readAsStringAsync(JSON.parse(value).file, {
        //     //         encoding: FileSystem.EncodingType.Base64
        //     //     }).then(value => {
        //     //         //console.log(value)
        //     //     })
        //     // })
        //     const res = keys.map(async (key) => (await AsyncStorage.getItem(key).then((res) => res)))
        //     // Promise.all(res).then(res => console.log(res))
        // })
    }


    verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (result.status !== 'granted') {
            Alert.alert('Permission Required', 'Allow camera access to this app.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    handleReset = () => {
        AsyncStorage.clear()
    }

    takeImage = async () => {
        const permission = await this.verifyPermission()
        if (!permission) return
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            base64: true
        })


        if (image) {
            const fileName = image.uri.split('/').pop()
            const newPath = FileSystem.documentDirectory + fileName
            try {
                FileSystem.moveAsync({
                    from: image.uri,
                    to: newPath
                }).then(success => {
                    // console.log({ success }, { newPath }, { fileName })
                    this.setState({ previewUrl: newPath, base64: image.base64 })
                    const id = `${Date.now()}-${fileName.split('.')[0]}`
                    AsyncStorage.setItem(id, JSON.stringify({
                        id: id,
                        uploadStatus: false,
                        file: newPath,
                        base64: image.base64
                    }))
                })
            } catch (error) {
                console.log({ error })
            }
        }
        // console.log(image)
    }

    render() {
        const { previewUrl, netInfo } = this.state
        console.log(netInfo)
        return (<>
            <View style={styles.container}>
                {
                    <Preview previewUrl={previewUrl}  {...this.state} />
                }
                <View style={styles.action}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            onPress={this.takeImage}
                            style={styles.takePhotoButton}
                            underlayColor='#fff'>
                            <Text style={styles.buttonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.handleReset}
                            style={styles.takePhotoButton}
                            underlayColor='#fff'

                        >
                            <Text style={styles.buttonText}>Clear All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>);
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',

    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    takePhotoButton: {
        width: 200,
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'orangered',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10
    }
})
