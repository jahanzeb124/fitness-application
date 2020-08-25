import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SendBird from 'sendbird';

import Chat3 from './Chat3';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      nickname: '',
    };
  }
  _userIdChanged = (userId) => {
    this.setState({userId});
  };
  _nicknameChanged = (nickname) => {
    this.setState({nickname});
  };
  _onButtonPress = () => {
    const {userId, nickname} = this.state;
    const sb = new SendBird({appId: '390FD31B-D323-4BC7-A3E1-7A5FDDE1E5D7'});
    sb.connect(userId, (user, error) => {
      if (error) {
        alert('Error');
      } else {
        sb.updateCurrentUserInfo(nickname, null, (user, error) => {
          if (error) {
            alert('Error');
          } else {
            this.setState(
              {
                userId: '',
                nickname: '',
              },
              () => {
                this.props.navigation.navigate('ChatScreen');
              },
            );
          }
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.action}>
          <TextInput
            placeholder="User ID"
            value={this.state.userId}
            onChangeText={this._userIdChanged}></TextInput>
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="NickName"
            value={this.state.nickname}
            onChangeText={this._nicknameChanged}></TextInput>
        </View>
        <View>
          <Button title="Connect" onPress={this._onButtonPress}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});
