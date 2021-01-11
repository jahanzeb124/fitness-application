import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {createStore} from 'redux';
import rootReducer from './redux/reducers';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});
const store = createStore(rootReducer);
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
