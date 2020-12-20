import 'react-native-gesture-handler';
// import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createStackNavigator, HeaderTitle} from 'react-navigation-stack';
import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Back from 'react-native-vector-icons/Ionicons';
//////////////////////
import Login from './Components/Login';
import Signup from './Components/Signup';
import Calories from './Components/Calories';
import Main from './Components/Main';
import Privacy from './Components/Privacy';
import ChatContainer from './Components/chatcontainer';
import Convo from './Components/convo';
import Decide from './Components/decide';
import Profile from './Components/Profile';
import Notification from './Components/Notification';
import Mealslist from './Components/mealslist';
/////////////////////////
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Contact from './Components/Contact';
import MainTabScreen from './Components/MainTabNavigator';
import Meals from './Components/MealPlans';

const Stack = createStackNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Contact Us':
      return 'Contact Us';
  }
}

export default function AuthLoadingScreen(props) {
  const checklogin = useSelector((state) => state.apiUserReducer.user);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Calories"
          component={Calories}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
          // options={({route}) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chats"
          component={ChatContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Convo"
          component={Convo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Decide1"
          component={Decide}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Meallist"
          component={Mealslist}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// <NavigationContainer>
{
  /* <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Calories"
            component={Calories}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={({route}) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
          <Stack.Screen
            name="Privacy"
            component={Privacy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chats"
            component={ChatContainer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Convo"
            component={Convo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Decide1"
            component={Decide}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
          /> */
}
{
  /* </Stack.Navigator> */
}
// </NavigationContainer>;
