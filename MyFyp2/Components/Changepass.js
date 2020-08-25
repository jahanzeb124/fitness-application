import Axios from 'axios';
import React, {Component} from 'react';
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

export default class Changepass extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden></StatusBar>

        <View style={styles.header}>
          <Text
            style={{
              fontSize: 35,
              marginTop: 30,
              color: 'grey',
              fontWeight: 'bold',
            }}>
            Change Password
          </Text>
        </View>

        <View style={styles.footer}>
          <Text
            style={[
              styles.title,
              {
                marginTop: 50,
              },
            ]}>
            Current Password
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder="Current Password"></TextInput>
          </View>

          <View>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 50,
                },
              ]}>
              New Password
            </Text>
            <View style={styles.action}>
              <TextInput
                style={styles.inputbox}
                placeholder="New Password"></TextInput>
            </View>
          </View>

          <View style={styles.btn}>
            <TouchableOpacity>
              <Text style={styles.btntxt}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#ffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputbox: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray',
  },
  btn: {
    marginLeft: 50,
    width: 200,
    borderRadius: 25,
    marginVertical: 30,
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
