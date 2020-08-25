import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './Profile';
import Contact from './Contact';

import MainTabScreen from './MainTabNavigator';

const Drawer = createDrawerNavigator();
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            navigation={this.props.navigation}
            component={MainTabScreen}
          />
          <Drawer.Screen
            name="My Profile"
            navigation={this.props.navigation}
            component={Profile}
          />
          <Drawer.Screen
            name="Contact Us"
            navigation={this.props.navigation}
            component={Contact}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
