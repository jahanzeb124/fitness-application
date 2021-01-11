import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

export default function Personal() {
  const checkuser = useSelector((state) => state.apiUserReducer.user);
  //   console.log(checkuser.username);
  //   console.log(checkuser.email);
  //   console.log(checkuser.height);
  //   console.log(checkuser.weight);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',

        // alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
        Personal Info
      </Text>

      <View
        style={{
          justifyContent: 'flex-end',
          marginVertical: 400,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
          Username
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.5,
            alignSelf: 'stretch',
            color: 'blue',
            paddingLeft: 20,
          }}>
          {checkuser.username}
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
          Email
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.5,
            alignSelf: 'stretch',
            color: 'blue',
            paddingLeft: 20,
          }}>
          {checkuser.email}
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
          Height
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.5,
            alignSelf: 'stretch',
            color: 'blue',
            paddingLeft: 20,
          }}>
          {checkuser.height}
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 10}}>
          Weight
        </Text>
        <Text
          style={{
            borderBottomWidth: 0.5,
            alignSelf: 'stretch',
            color: 'blue',
            paddingLeft: 20,
          }}>
          {checkuser.weight}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
