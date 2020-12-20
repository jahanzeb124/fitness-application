import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
export default class Notification extends Component {
  componentDidMount() {
    this.requestUserPermission();
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification.message);
        alert(notification.message);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }
  requestUserPermission = async () => {
    const enabled = await messaging().hasPermission();

    if (enabled) {
      this.getFcmToken(); //<---- Add this
    }
  };
  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log(' Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };
  render() {
    return (
      <View>
        <Text>HELLO</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
