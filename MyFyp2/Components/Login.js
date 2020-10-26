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
  Image,
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
    Axios.post('http://192.168.10.7:3000/users/login', user)
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
                this.setState({username: text});
              }}
              onSubmitEditing={() => this.password.focus()}
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
                this.setState({password: text});
              }}
              ref={(input) => (this.password = input)}
            />
          </View>

          <View style={styles.btn}>
            <TouchableOpacity onPress={this.loginpress}>
              <Text style={styles.btntxt}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUp}>
            <Text style={{color: 'black'}}>New user? </Text>
            <TouchableOpacity onPress={this.press}>
              <Text style={{color: 'brown'}}>Signup...</Text>
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
    marginTop: 120,
  },
});
