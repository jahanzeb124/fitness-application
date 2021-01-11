import {StyleSheet, Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';

export default function Notification() {
  const [data, setData] = useState('');
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      setData(remoteMessage.data);
      alert('A new FCM message arrived!', remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  async function getFcmToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('FCM TOKEN:', fcmToken);
    } else {
      alert('Failed', 'No token received');
    }
  }
  return (
    <View>
      <Text>{data.hello}</Text>
    </View>
  );
}
