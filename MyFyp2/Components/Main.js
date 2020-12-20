import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import Profile from './Profile';
import Contact from './Contact';

import MainTabScreen from './MainTabNavigator';
import Steps from './Steps';

const Drawer = createDrawerNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Meals':
      return 'Meals';
    case 'Calories':
      return 'Calories';
    case 'Decide':
      return 'Decide';
    case 'Steps':
      return 'Steps';
    case 'Settings':
      return 'Settings';
  }
}
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          navigation={this.props.navigation}
          component={MainTabScreen}
          // options={({route}) => ({
          //   headerTitle: getHeaderTitle(route),
          // })}
        />

        <Drawer.Screen
          name="Contact Us"
          navigation={this.props.navigation}
          component={Contact}
        />
      </Drawer.Navigator>
      // </NavigationContainer>
    );
  }
}
