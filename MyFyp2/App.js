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
    screen: Login,
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
          size={12}
          onPress={() =>
            navigation.dispatch(DrawerActions.openDrawer())
          }></Icon.Button>
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
