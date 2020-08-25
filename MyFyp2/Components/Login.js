import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import {ceil} from 'react-native-reanimated';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      id: '',
    };
  }
  press = () => {
    this.props.navigation.navigate('Signup');
  };
  loginpress = () => {
    let user = {
      username: this.state.username,
      password: this.state.password,
    };
    Axios.post('http://192.168.10.3:3000/users/login', user)
      .then((res) => {
        if (res.status == 200) {
          this.id = res.data.User._id;
          this.props.navigation.navigate('Main');
          // this.props.navigation.navigate("Main");
        }
      })
      .catch((error) => {
        alert('Incorrect Username or Password');
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden></StatusBar>

        <View style={styles.header}>
          <Text
            style={{
              fontSize: 35,
              marginTop: 30,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Welcome Back!!!
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
            Name
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder="Name"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                this.setState({username: text});
              }}
              onSubmitEditing={() => this.password.focus()}></TextInput>
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
              style={styles.inputbox}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              ref={(input) => (this.password = input)}></TextInput>
          </View>

          <View style={styles.btn}>
            <TouchableOpacity onPress={this.loginpress}>
              <Text style={styles.btntxt}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUp}>
            <Text style={{color: 'black'}}>New user?</Text>
            <TouchableOpacity onPress={this.press}>
              <Text style={{color: 'white'}}> Sign up</Text>
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
    backgroundColor: '#FFF',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 5,

    backgroundColor: '#6E5BAA',

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: 'black',

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
    color: 'white',
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btn: {
    marginLeft: 55,
    width: 200,

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
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 185,
  },
});
