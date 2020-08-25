import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  DeviceEventEmitter,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Text,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Steps extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput value="40"></TextInput>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => this.props.navigation.navigate('privacy')}>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}> Steps</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Km</Text>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple>
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Calories</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 80,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
    width: 250,
    height: 250,
    backgroundColor: '#6E5BAA',
  },
  menuWrapper: {
    marginTop: 10,
    backgroundColor: '#6E5BAA',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: 'black',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 50,
  },
});
