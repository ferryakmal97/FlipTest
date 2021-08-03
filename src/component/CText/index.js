import React, { memo } from 'react'
import { Text } from 'react-native'

const CText = ({
    text='text',
    bold,
    white,
    small,
    title
}) => {
    return (
        <Text style={{
            fontWeight: bold && 'bold',
            fontSize: small ? 14 : 16, 
            color: white ? 'white' : 'black'
        }}
        >
            {title ? text.toUpperCase() : text}
        </Text>        
    )
}

export default memo(CText)
