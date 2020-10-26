import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Onemsg from './onemsg';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Convo extends Component {
  constructor(props) {
    super(props);
  }
  pressed = () => {
    alert('Pressed');
  };
  goback = () => {
    this.props.navigation.navigate('Chats');
  };
  render() {
    return (
      <View style={{display: 'flex', flex: 1}}>
        <View style={styles.info}>
          <TouchableOpacity onPress={this.goback}>
            <Icon name="chevron-back-outline" size={40}></Icon>
          </TouchableOpacity>

          <Text>Name</Text>
        </View>
        <View style={styles.msgs}>
          <ScrollView>
            <Onemsg />
          </ScrollView>
        </View>
        <View style={styles.send}>
          <TextInput
            style={{
              alignSelf: 'center',
              height: 40,
              color: 'black',
              borderColor: 'gray',
              borderRadius: 20,
              borderWidth: 1,
              width: 370,
            }}
            //   onChangeText={(text) => onChangeText(text)}
          />
          <TouchableOpacity onPress={this.pressed}>
            <Icon
              name="send"
              size={20}
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                marginTop: 10,
              }}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    flex: 0.07,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#bebebe',
  },
  msgs: {
    flex: 0.86,
    display: 'flex',

    backgroundColor: '#dcdcdc',
  },
  send: {
    flex: 0.07,
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#bebebe',
  },
});
