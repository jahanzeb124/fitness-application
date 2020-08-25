import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  Linking,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Contact extends Component {
  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.openURL(phoneNumber);
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              fontSize: 30,
            }}>
            Contact Us
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.menuItem}>
            <Icon name="call" color="#000" size={25} />

            <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7}>
              <Text style={styles.TextStyle}>Call Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6E5BAA',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 5,
    marginTop: 50,
    marginRight: 300,

    backgroundColor: '#6E5BAA',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  TextStyle: {
    padding: 5,
  },
});
