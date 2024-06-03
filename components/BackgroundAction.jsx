import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackgroundService from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 1000,
    },
};
const StartBGProcess = async ()=>{
    await BackgroundService.start(veryIntensiveTask, options);
await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); 
}

// Only Android, iOS will ignore this call
// iOS will also run everything here in the background until .stop() is called
const EndBGProcess =async ()=>{
    await BackgroundService.stop();
}

const BackgroundAction = () => {
  return (
    <View>
        <TouchableOpacity style={styles.btn} onPress={StartBGProcess} >
            <Text style={styles.btnText}>Start Service</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={EndBGProcess} style={[styles.btn,{backgroundColor: 'red'}]}>
            <Text style={styles.btnText}>Stop Service</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BackgroundAction

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    btn:{
        width:'80%',
        height:50,
        marginTop:100,
        borderRadius:20,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    btnText:{
        color:'#fff',
    }
})