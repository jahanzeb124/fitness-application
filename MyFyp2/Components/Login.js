import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Axios from 'axios';
import React, {Component, useState} from 'react';
import * as useractions from '../redux/actions/apiuseraction';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  DeviceEventEmitter,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ceil} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  const press = () => {
    navigation.navigate('Signup');
  };
  const loginpress = () => {
    let user = {
      username: username,
      password: password,
    };
    Axios.post('http://192.168.10.6:3000/users/login', user)
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          if (res.data.User.ban) {
            alert('You have been banned by admin');
          } else navigation.navigate('Main');
          setId(res.data.User._id);
          dispatch(useractions.ApiloginUser(res.data.User));
        }
      })
      .catch((error) => {
        alert('Incorrect Username or Password');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>
      <View style={styles.header}>
        <Image
          source={require('../header.jpeg')}
          style={styles.imageBackground}></Image>
      </View>

      <View style={styles.footer}>
        <Text
          style={[
            styles.title,
            {
              marginTop: 50,
            },
          ]}>
          Name
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your name...."
            style={styles.textInput}
            // value="a"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>

        <Text
          style={[
            styles.title,
            {
              marginTop: 20,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry
            placeholder="Your password.."
            style={styles.textInput}
            // value="a"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity onPress={loginpress}>
            <Text style={styles.btntxt}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text style={{color: 'black'}}>New user? </Text>
          <TouchableOpacity onPress={press}>
            <Text style={{color: 'brown'}}>Signup...</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 20,
  },
  imageBackground: {
    width: 450,
    height: 250,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#0000',
  },
  textInput: {
    flex: 1,
    marginTop: 5,

    color: 'brown',
  },
  btn: {
    marginLeft: 100,
    width: 180,
    backgroundColor: '#631a3e',
    borderRadius: 25,
    marginVertical: 30,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
  },

  btntxt: {
    fontSize: 20,
    marginVertical: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: 'white',
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
  },
});
