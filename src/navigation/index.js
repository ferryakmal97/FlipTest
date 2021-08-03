import 'react-native-gesture-handler';
import React from 'react'
import { DetailScreen, TransactionScreen } from '../screens'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()
const Hide = {headerShown: false}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Transaction List">
                <Stack.Screen name="Transaction List" component={TransactionScreen} options={Hide} />
                <Stack.Screen name="Detail Transaction" component={DetailScreen} options={Hide} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
