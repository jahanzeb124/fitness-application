import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {createStore} from 'redux';
import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
const store = createStore(rootReducer);
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
