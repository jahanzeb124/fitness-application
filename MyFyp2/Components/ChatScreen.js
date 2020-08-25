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
  Dimensions,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SendBird from 'sendbird';

const sb = new SendBird({appId: '390FD31B-D323-4BC7-A3E1-7A5FDDE1E5D7'});

const windowSize = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

export default class Changepass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageList: [],
    };
  }

  componentDidMount() {
    const channelURL =
      'sendbird_group_channel_116480872_cef291c1c990664e77998ff4e2d737c06c58411c';

    this.setState({
      channelURL,
    });

    this.loadMessages();

    var ChannelHandler = new sb.ChannelHandler();

    ChannelHandler.onMessageReceived = this.onMessageReceived;
    ChannelHandler.onMessageUpdated = this.onMessageUpdated;
    ChannelHandler.onMessageDeleted = this.onMessageDeleted;
  }

  onMessageReceived = (channel, message) => {
    this.loadMessages();
  };

  onMessageUpdated = (channel, message) => {
    this.loadMessages();
  };

  onMessageDeleted = (channel, message) => {
    this.loadMessages();
  };

  loadMessages = () => {
    sb.GroupChannel.getChannel(this.state.channelURL, (groupChannel, error) => {
      if (error) {
        return;
      }

      var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
      prevMessageListQuery.limit = 50;
      prevMessageListQuery.reverse = true;
      // prevMessageListQuery.includeMetaArray = true;   // Retrieve a list of messages along with their metaarrays.
      // prevMessageListQuery.includeReaction = true;    // Retrieve a list of messages along with their reactions.

      // Retrieving previous messages.
      prevMessageListQuery.load((messages, error) => {
        if (error) {
          return;
        }
        const info = [];
        for (var i = 0; i < messages.length; i++) {
          info.push({
            userID: messages[i]._sender.nickname,
            msg: messages[i].message,
          });
        }
        console.log('MESSAGE LIST: ', info);

        this.setState({
          messages,
        });
      });

      // TODO: Implement what is needed with the contents of the response in the groupChannel parameter.
    });
  };

  onSendPress = () => {
    // console.log(this.state.message);
    // this.setState({message: ''});

    // getMessages = () => {
    //   sendbird.getMessageLoadMore({
    //     limit: 100,
    //     successFunc: (data) => {
    //       var _messageList = [];
    //       data.messages.reverse().forEach(function (msg, index) {
    //         if (sendbird.isMessage(msg.cmd)) {
    //           _messageList.push(msg.payload);
    //         }
    //       });
    //       this.setState({
    //         messageList: _messageList.concat(this.state.messageList),
    //       });
    //     },
    //     errorFunc: (status, error) => {
    //       console.log(status, error);
    //     },
    //   });
    // };

    sb.GroupChannel.getChannel(this.state.channelURL, (groupChannel, error) => {
      if (error) {
        return;
      }

      const params = new sb.UserMessageParams();
      params.message = this.state.message;
      params.customType = '';
      params.data = 'DATA';

      params.pushNotificationDeliveryOption = 'default';
      groupChannel.sendUserMessage(params, (message, error) => {
        if (error) {
          console(error);
          return;
        }
        console.log(message);
        this.loadMessages();
      });
    });

    // var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    // channelListQuery.includeEmpty = true;
    // channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    // channelListQuery.limit = 15; // The value of pagination limit could be set up to 100.

    // if (channelListQuery.hasNext) {
    //   channelListQuery.next(function (channelList, error) {
    //     if (error) {
    //       return;
    //     }

    //   });
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableHighlight
            underlayColor={'#4e4273'}
            onPress={this.onBackPress}
            style={{marginLeft: 15}}>
            <Text style={{color: '#fff'}}>&lt; Back</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.chatContainer}>
          <Text style={{color: '#000'}}></Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <TextInput
              style={styles.input}
              value={this.state.message}
              onChangeText={(text) => this.setState({message: text})}
            />
          </View>
          <View style={styles.sendContainer}>
            <TouchableHighlight
              underlayColor={'#4e4273'}
              onPress={() => this.onSendPress()}>
              <Text style={styles.sendLabel}>SEND</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#6E5BAA',
    paddingTop: 20,
  },
  chatContainer: {
    flex: 11,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6E5BAA',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: (windowSize.width = 350),
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 32,
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  sendLabel: {
    color: '#ffffff',
    fontSize: 15,
  },
});
