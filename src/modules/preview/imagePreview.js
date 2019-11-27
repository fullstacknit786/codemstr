import React, { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

import ImageView from 'react-native-image-view';

const screen = Dimensions.get('screen')

const ImageModalPreview = (props) => {

    const [isImageViewVisible, setIsImageViewVisible] = useState(false)
    const [uri, setUri] = useState('')

    useEffect(() => {
        setIsImageViewVisible(props.preview)
        setUri(props.previewUri)
    }, [])

    const images = [
        {
            source: {
                uri: uri
            },
            title: 'Preview',
            width: 806,
            height: 720,
        },
    ];


    return (<>
        <ImageView
            images={images}
            imageIndex={0}
            isVisible={isImageViewVisible}
            isTapZoomEnabled={true}

            onClose={() => {
                props.handlePreview(!isImageViewVisible)
            }}
        />
    </>);
}

export default ImageModalPreview;
