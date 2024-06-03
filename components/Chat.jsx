import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import firestore from '@react-native-firebase/firestore';

const Chat = () =>{
  const [messagesList, setMessagesList] = useState([]);
  const route = useRoute();

  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection('chats')
  //     .doc(route.params.id + route.params.data.userId)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc');
  //   subscribe.onSnapshot(querySnapshot => {
  //     console.log(querySnapshot)
  //     const allMessages = querySnapshot.docs.map(doc => {
  //       const data = doc.data();
  //       return {
  //         ...data,
  //         _id: doc.id, // Use the document ID as _id
  //         createdAt: data.createdAt,
  //         user: { _id: data.sendBy }, // Include user ID for gifted-chat
  //       };
  //     });
  //     setMessagesList(allMessages.reverse());
  //   });
  //   return () => subscribe;
  // }, []);
  
  // const onSend = useCallback((messages = []) => {
  //   const msg = messages[0];
  //   const myMsg = {
  //     ...msg,
  //     _id: Math.random().toString(36).substring(7), // Generate a unique _id
  //     sendBy: route.params.id,
  //     sendTo: route.params.data.userId,
  //     createdAt: new Date(), // Add current timestamp
  //   };
  //   setMessagesList(previousMessages => GiftedChat.append(previousMessages, myMsg));
  //   firestore()
  //     .collection('chats')
  //     .doc(`${route.params.id}${route.params.data.userId}`)
  //     .collection('messages')
  //     .add(myMsg);
  //   firestore()
  //     .collection('chats')
  //     .doc(`${route.params.data.userId}${route.params.id}`)
  //     .collection('messages')
  //     .add(myMsg);
  // }, []);
  
  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection('chats')
  //     .doc(route.params.id + route.params.data.userId)
  //     .collection('messages')
  //     .orderBy('createdAt', 'desc');
  //   subscribe.onSnapshot(querysnapshot => {
  //     console.log(querysnapshot)
  //     const allMessages = querysnapshot.docs.map(item => {
  //       return {...item.data, createdAt: item.data.createdAt};
  //     });
  //     setMessagesList(allMessages);
  //   });
  //   return () => subscribe;
  // }, []);
  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('chats')
  //     .doc(route.params.id + route.params.data.userId)
  //     .onSnapshot(documentSnapshot => {
  //       console.log('User data: ', documentSnapshot.data());
  //     });

  //   // Stop listening for updates when no longer required
  //   return () => subscriber();
  // }, [])
  // setMessages([
  //   {
  //     _id: 1,
  //     text: 'Hello developer',
  //     createdAt: new Date(),
  //     user: {
  //       _id: 2,
  //       name: 'Ali Khan',
  //       //   avatar: 'https://placeimg.com/140/140/any',
  //     },
  //   },
  // ]);

  // const onSend = useCallback((messages = []) => {
  //   return console.log(messages[0]);
  //   const msg = messages[0];
  //   console.log(msg)
  //   const myMsg = {
  //     ...msg,
  //     sendBy: route.params.id,
  //     sendTo: route.params.data.userId,
  //     createdAt: Date.parse(msg.createdAt),
  //   };
  //   return console.log(myMsg)
  //   setMessagesList(previousMessages => GiftedChat.append(previousMessages, myMsg));
  //   firestore()
  //     .collection('chats')
  //     .doc('' + route.params.id + route.params.data.userId)
  //     .collection('messages')
  //     .add(myMsg);
  //   firestore()
  //     .collection('chats')
  //     .doc('' + route.params.data.userId + route.params.id)
  //     .collection('messages')
  //     .add(myMsg);
  // }, []);
  // return (
  //   <View style={{flex: 1}}>
  //     <GiftedChat
  //       messages={messagesList}
  //       onSend={({messages}) => console.log(messages)}
  //       user={{
  //         _id: route.params.id,
  //       }}
  //     />
  //   </View>
  // );
};
export default Chat;

const styles = StyleSheet.create({});
