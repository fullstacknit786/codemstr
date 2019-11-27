import React, { useEffect, useState } from 'react'
import { Text, Image, View, StyleSheet, ScrollView, AsyncStorage, Button, SafeAreaView, Alert } from 'react-native'
import { getAllFiles } from '../../utils/getAllFiles'
import firebase from '../../utils/firebase'
import { getNetInfo } from '../../utils/netInfo'
import * as Progress from 'react-native-progress'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ImageModalPreview from '../../modules/preview/imagePreview'

const MyFiles = (props) => {

    const [myFiles, setMyFiles] = useState([])
    const [isConnected, setIsConnected] = useState(false)
    const [percentUpload, setPercentUpload] = useState(0)
    const [preview, setPreview] = useState(false)
    const [previewUri, setPreviewUri] = useState('')

    useEffect(() => {

        (async () => {
            setIsConnected((await getNetInfo()).isConnected)
            if (props.active == 1)
                handleRefresh()

        })()
    }, [myFiles.length])

    const handlePreviewImage = (uri) => {
        setPreview(!preview)
        setPreviewUri(uri)
    }
    const handleRefresh = () => {
        (async () => {
            const files = await getAllFiles()
            if (files.length > 0)
                setMyFiles(files)
        })()
    }
    //Handle Sync
    const handleSync = async (files) => {

        const parsedFile = JSON.parse(files)

        if (!isConnected)
            return Alert.alert('No internet connection')

        if (parsedFile.uploadStatus) {
            return Alert.alert('Already synced to cloud')
        }

        const blob = await new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            };
            xhr.open('GET', parsedFile.file);
            xhr.responseType = 'blob';
            xhr.send();
        })
        // Firebase file upload
        console.log(blob)

        const storageRef = firebase.storage.ref(`/uploads/chat/private/${Date.now()}-${parsedFile.id}`)
        const res = storageRef.put(blob)
        res.on('state_changed', snap => {
            const percentUploaded = Math.round(
                (snap.bytesTransferred / snap.totalBytes) * 100
            );
            setPercentUpload(percentUploaded)
        }, err => {
            console.log(err)
        }, async () => {
            const durl = await res.snapshot.ref.getDownloadURL()
            if (durl)
                setPercentUpload(0)

            AsyncStorage.getItem(parsedFile.id).then(async (data) => {
                const parsed = JSON.parse(data)
                let tempObj = { ...parsed, uploadStatus: true }

                console.info(Object.keys(tempObj), {
                    ...tempObj
                })
                await AsyncStorage.setItem(parsedFile.id, JSON.stringify(tempObj))
                handleRefresh()
            })
        })

    }

    return (<>
        <View style={styles.container}>
            {
                percentUpload > 0 ? <Progress.Bar color="green" progress={percentUpload / 100} width={300} /> : <></>
            }

            {
                preview && <ImageModalPreview handlePreview={handlePreviewImage} preview={preview} previewUri={previewUri} />
            }

            <ScrollView scrollEnabled={true}
                style={{ flexDirection: 'column', width: '100%', marginTop: 20 }}
            >

                {
                    myFiles.length > 0 ? myFiles.map((files, index) => <View key={JSON.parse(files).id} style={{ flex: 1, flexDirection: 'row', margin: 2, backgroundColor: 'lightblue' }}>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={() => {
                                handlePreviewImage(JSON.parse(files).file)
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Image key={JSON.parse(files).id} resizeMode={"cover"} style={{ width: 100, height: 100 }}
                                    source={{ uri: JSON.parse(files).file }}
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                onPress={() => {
                                    handleSync(files)
                                }}
                                title={!JSON.parse(files).uploadStatus ? 'Sync Now' : 'Synced'}
                                color={!JSON.parse(files).uploadStatus ? 'orangered' : 'green'}
                            />

                        </View>

                    </View>) :
                        <View style={styles.container}>
                            <Text>No files to display</Text>
                        </View>
                }
            </ScrollView>
        </View>
    </>);
}

export default MyFiles;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 40
    }
})
