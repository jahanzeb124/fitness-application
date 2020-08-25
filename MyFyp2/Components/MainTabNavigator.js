import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Steps from './Steps';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import Signup from './Signup';
import Land from './landing';
import fitness from './fitness';
import car from './MealPlans';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = ({navigation, route}) => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    tabBarColor="#8D574B"
    barStyle={{backgroundColor: '#a9a9a9'}}>
    {/* {console.log(navigation)}x */}
    <Tab.Screen
      name="Home"
      component={Land}
      navigation={navigation}
      route={route}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Meals"
      component={car}
      navigation={navigation}
      route={route}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="md-fast-food-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Fitness Videos"
      navigation={navigation}
      route={route}
      component={fitness}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="fitness" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      navigation={navigation}
      route={route}
      component={Profile}
      options={{
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;
