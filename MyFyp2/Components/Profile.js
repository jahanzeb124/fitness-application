import React from 'react';
import {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}>
                Dante
              </Title>
              <Caption style={styles.caption}>@dante</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="location" />
            <Text style={{color: '#777777', marginLeft: 20}}>
              Islamabad,Pakistan
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="mail" />
            <Text style={{color: '#777777', marginLeft: 20}}>
              dante@gmail.com
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="call" />
            <Text style={{color: '#777777', marginLeft: 20}}>0332-2323233</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="md-information-circle" color="#dc143c" size={25} />
              <Text style={styles.menuItemText}> Personal Information</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              // console.log(this.props.navigation);
              this.props.navigation.navigate('ChatScreen');
            }}>
            <View style={styles.menuItem}>
              <Icon name="md-information-circle" color="#dc143c" size={25} />
              <Text style={styles.menuItemText}>Private Information</Text>
            </View>
          </TouchableRipple>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="settings" color="#dc143c" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
