import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        phone: phone,
        userId: userId,
      })
      .then(response => {
        console.log('User Created');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (phone == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        keyboardType="email-address"
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        keyboardType="phone-pad"
        placeholder="Enter Phone#"
        style={[styles.input, {marginTop: 20}]}
        value={phone}
        onChangeText={txt => setPhone(txt)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Enter Confirm Password"
        style={[styles.input, {marginTop: 20}]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter your Data');
          }
        }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logIn}
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={styles.loginText}>Or SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
