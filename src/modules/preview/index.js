import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

const Preview = (props) => {

    const [previewUrl, setPreviewUrl] = useState('')

    useEffect(() => {
        setPreviewUrl(props.previewUrl)
    }, [props])

    return (<>
        <View style={styles.previewContainer}>
            <View style={styles.preview}>
                {
                    previewUrl ? <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode={'center'}
                        source={{ uri: previewUrl }}
                    /> : <Text>No Preview</Text>
                }
            </View>
        </View>
    </>);
}

export default Preview;

const styles = StyleSheet.create({
    previewContainer: {
        flex: 3,
        padding: 15,
        flexDirection: "row"
    },
    preview: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        borderStyle: 'dashed',
        justifyContent: "center",
        alignItems: 'center'
    },
    action: {
        flex: 1,
        flexDirection: 'row'
    },
})