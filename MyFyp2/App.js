import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator, HeaderTitle} from 'react-navigation-stack';
import React, {Component} from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Main from './Components/Main';
import Chat from './Components/Chat';
import Chat2 from './Components/Channel';
import Steps from './Components/Steps';
import ChatScreen from './Components/ChatScreen';
import Changepass from './Components/Changepass';
import Land from './Components/landing';
import Privacy from './Components/Privacy';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat3 from './Components/Chat3';
import You from './Components/fitness';
import Car from './Components/MealPlans';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import ChatContainer from './Components/chatcontainer';
import Convo from './Components/convo';
import Decide from './Components/decide';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
// import {firebase} from '@react-native-firebase/firestore';
// firebase.initializeApp({
//   appId: '',
//   apiKey: '',
//   projectId: '',
//   databaseURL: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   clientId: '1:744817106063:android:8c73fe76fd260b6f40a4fa',
// });
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View></View>;
  }
}

const Appstack = createStackNavigator({
  Home: {
    screen: ChatContainer,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerShown: false,
    },
  },
  Main: {
    screen: Main,
    navigationOptions: {
      headerLeft: () => (
        <Icon.Button
          name="ios-menu"
          size={10}
          // onPress={() =>
          //   navigation.dispatch(DrawerActions.openDrawer())
          // }
        ></Icon.Button>
      ),
    },
  },
  Chat2: {
    screen: Chat2,
    navigationOptions: {
      headerShown: true,
    },
  },
  Chat3: {
    screen: Chat3,
    navigationOptions: {
      headerShown: true,
    },
  },
  ChatScreen: {
    screen: ChatScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

  privacy: {
    screen: Privacy,

    navigationOptions: {
      headerShown: false,
    },
  },
  Chats: {
    screen: ChatContainer,

    navigationOptions: {
      headerShown: false,
    },
  },
  Convo: {
    screen: Convo,

    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(Appstack);
//   createSwitchNavigator(
//     {
//       App: AppStack,
//       AuthLoading: AuthLoadingScreen,
//      },
//     {
//       initialRouteName: "AuthLoading",
//     }
//   )
// );
