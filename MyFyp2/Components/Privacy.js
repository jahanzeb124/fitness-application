import Axios from 'axios';
import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

export default function Privacy() {
  const [old, setOld] = useState('');
  const [newP, setNewP] = useState('');
  const [verify, setVerify] = useState('');
  const checkuser = useSelector((state) => state.apiUserReducer.user);

  const update = () => {
    let pass = {
      old: old,
      new: newP,
      verify: verify,
    };
    Axios.put('http://192.168.10.8:3000/users/updatepass', pass)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    alert('UPDATED SUCCESSFULLY');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>

      <Text
        style={{
          fontSize: 30,
          marginTop: 30,
          color: 'black',
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        Change Password
      </Text>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginHorizontal: 10,
          marginTop: 50,
          flex: 1,
          backgroundColor: 'white',

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <TextInput
            placeholder="Old Password"
            onChangeText={(text) => setOld(text)}
            style={{
              borderBottomWidth: 0.5,
              alignSelf: 'stretch',
              paddingLeft: 20,
            }}
          />
          <TextInput
            placeholder="New Password"
            onChangeText={(text) => setNewP(text)}
            style={{
              borderBottomWidth: 0.5,
              alignSelf: 'stretch',
              paddingLeft: 20,
            }}
          />
          <TextInput
            placeholder="Verify Password"
            onChangeText={(text) => setVerify(text)}
            style={{
              borderBottomWidth: 0.5,
              alignSelf: 'stretch',
              paddingLeft: 20,
            }}
          />
        </View>

        <View style={styles.btn}>
          <TouchableOpacity onPress={update}>
            <Text style={styles.btntxt}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  btn: {
    alignSelf: 'center',

    width: 200,
    borderRadius: 25,

    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
  },

  btntxt: {
    fontSize: 20,
    marginVertical: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
});
