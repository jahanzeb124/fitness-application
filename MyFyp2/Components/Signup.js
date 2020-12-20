import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      height: '',
      weight: '',
      age: '',
      gender: '',
    };
  }
  back = () => {
    this.props.navigation.navigate('Home');
  };
  submit = () => {
    let user = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password,
      height: this.state.height,
      weight: this.state.weight,
      age: this.state.age,
    };
    Axios.post('http://192.168.10.2:3000/users/Signup', user)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
    alert('operation done');
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden></StatusBar>
        {/* <View style={styles.header}>
          <Text
            style={{
              fontSize: 35,
              marginTop: 30,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Welcome Back
          </Text>
        </View> */}

        <View style={styles.footer}>
          <Text style={[styles.title, {}]}>Name</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter Full Name"
              onChangeText={(text) => {
                this.setState({name: text});
              }}
              onSubmitEditing={() => this.email.focus()}></TextInput>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder=" Enter Email"
              onChangeText={(text) => {
                this.setState({email: text});
              }}
              keyboardType="email-address"
              onSubmitEditing={() => this.password.focus()}
              ref={(input) => (this.email = input)}></TextInput>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder=" Enter Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
              onSubmitEditing={() => this.height.focus()}
              ref={(input) => (this.password = input)}></TextInput>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}>
            Height
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder=" Height in cm"
              onChangeText={(text) => {
                this.setState({height: text});
              }}
              onSubmitEditing={() => this.weight.focus()}
              ref={(input) => (this.height = input)}></TextInput>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}>
            Weight
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder="Weight in kg"
              onChangeText={(text) => {
                this.setState({weight: text});
              }}
              ref={(input) => (this.weight = input)}></TextInput>
          </View>
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
              },
            ]}>
            Age
          </Text>
          <View style={styles.action}>
            <TextInput
              style={styles.inputbox}
              placeholder="age"
              onChangeText={(text) => {
                this.setState({age: text});
              }}
              ref={(input) => (this.age = input)}></TextInput>
          </View>

          <View style={styles.btn}>
            <TouchableOpacity onPress={this.submit}>
              <Text style={styles.btntxt}>Signup</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signin}>
            <Text style={{color: 'black'}}>Already have an Account?</Text>
            <TouchableOpacity onPress={this.back}>
              <Text style={{color: 'brown'}}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },

  header: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 9,
    backgroundColor: '#FFFF',

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',

    borderBottomColor: '#000',
  },
  inputbox: {
    flex: 1,
    marginTop: 5,

    color: 'brown',
  },
  btn: {
    marginLeft: 80,
    width: 180,
    borderRadius: 25,
    marginVertical: 35,
    height: 55,
    backgroundColor: '#631a3e',
    borderColor: 'black',
    borderWidth: 2,
  },
  btntxt: {
    fontSize: 24,
    marginVertical: 8,
    color: 'white',
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  signin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
});
