import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from './Splash'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Main from './Main'
import Chat from './Chat'

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name={'Splash'} component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name={'SignIn'} component={SignIn} options={{title:'Splash'}}/>
            <Stack.Screen name={'SignUp'} component={SignUp} options={{title:'SignIn'}}/>
            <Stack.Screen name={'Main'} component={Main} options={{title:'SignUp'}}/>
            <Stack.Screen name={'Chat'} component={Chat} options={{title:'Main'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;