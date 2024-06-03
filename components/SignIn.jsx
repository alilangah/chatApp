import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false)
  const signInUser = () => {
    setVisible(true)
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setVisible(true)
        if (!querySnapshot.empty) {
          // Assuming there's only one document matching the email
          const userData = querySnapshot.docs[0].data();
          console.log(JSON.stringify(userData));
          // Handle sign in here, for example, comparing passwords
        goToNext(querySnapshot.docs[0].data().name, querySnapshot.docs[0].data().email, querySnapshot.docs[0].data().userId)
        } else {
          console.log("User not found");
          Alert.alert("User not found");
          // Handle case when user is not found
        }
      })
      .catch(error => {
        setVisible(true)
        console.log(error);
        Alert.alert('Error getting user:');
        // Handle error
      });
  };
  const goToNext = async(name, email, userId)=>{
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignIn</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 50}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          signInUser();
        }}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logIn}
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.loginText}>Or SignUp</Text>
      </TouchableOpacity>
      <Loader visible={visible}/>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'purple',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  logIn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  loginText: {
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'black',
  },
});
