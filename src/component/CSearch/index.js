import React, { memo } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Colors } from '../../styles'

const CSearch = ({onPress, onChangeText}) => {
    return (
        <View style={styles.container}>
            <EvilIcon name='search' size={40} color='grey' />
            <TextInput style={{flex:1}} placeholder='Cari nama, bank, atau nominal' onChangeText={onChangeText} />
            <TouchableOpacity style={styles.sort} onPress={onPress}>
                <Text style={{color: Colors.red, fontWeight: 'bold'}}>URUTKAN</Text>
                <Feather  name='chevron-down' size={40} color={Colors.red} />
            </TouchableOpacity>
        </View>
    )
}

export default memo(CSearch)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 5,
        marginBottom: 10
    },
    sort: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})