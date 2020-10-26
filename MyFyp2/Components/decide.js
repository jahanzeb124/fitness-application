import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import * as userAction from '../redux/actions/useraction';
import GoogleLogin from './googlelogin';
import ChatContainer from './chatcontainer';
export default function Decide() {
  const user = useSelector((state) => state.userReducer.user);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();
  function onAuthStateChanged(authUser) {
    if (authUser) {
      let userinfo = {
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName,
      };
      dispatch(userAction.loginUser(userinfo));
    } else {
      dispatch(userAction.logoutUser());
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  return (
    <React.Fragment>
      {user ? <ChatContainer /> : <GoogleLogin />}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
