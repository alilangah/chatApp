import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(() => {
            // navigation.navigate('SignIn');
            checkLogIn();
        }, 1000);
    },[])

    const checkLogIn = async () =>{
      const id = await AsyncStorage.getItem('USERID')
      if (id !== null){
        navigation.navigate('Main');
      }else{
        navigation.navigate('SignIn')
      }
    }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{'Firebase\nChat App'}</Text>
      {/* <Button 
      title='Go to SighUp'
      onPress={()=> navigation.navigate('SignUp')}/> */}
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'purple',
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        fontSize:40,
        color:'white',
        textAlign:'center',
    }
})