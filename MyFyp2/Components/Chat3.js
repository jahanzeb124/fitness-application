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

export default class Chat3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };
  }
  //   _getOpenChannelList = (init) => {
  //     if (init) {
  //         const openChannelListQuery = sbCreateOpenChannelListQuery();
  //         this.setState({ openChannelListQuery }, () => {
  //             this.props.getOpenChannelList(this.state.openChannelListQuery);
  //         });
  //     } else {
  //         this.props.getOpenChannelList(this.state.openChannelListQuery);
  //     }
  // }
  // _handleScroll = (e) => {
  //   if (e.nativeEvent.contentOffset.y < -100 && !this.state.refresh) {
  //       this.setState({ list: [], openChannelList: ds.cloneWithRows([]), refresh: true }, () => {
  //           this._initOpenChannelList();
  //       });
  //   }
  // }
  // _renderList = (rowData) => {
  //   return (
  //       <ListItem
  //           component={TouchableHighlight}
  //           containerStyle={{backgroundColor: '#fff'}}
  //           key={rowData.url}
  //           avatar={(
  //               <Avatar
  //                   source={{uri: rowData.coverUrl}}
  //               />
  //           )}
  //           title={rowData.name.length > 30 ? rowData.name.substring(0, 26) + '...' : rowData.name}
  //           titleStyle={{fontWeight: '500', fontSize: 16}}
  //           onPress={ () => this._onListItemPress(rowData.url) }
  //       />
  //   )
  // }

  _Connect = () => {
    const sb = new SendBird({appId: '390FD31B-D323-4BC7-A3E1-7A5FDDE1E5D7'});
    var channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.order = 'latest_last_message'; // 'chronological', 'latest_last_message', 'channel_name_alphabetical', and 'metadata_value_alphabetical'
    channelListQuery.limit = 15; // The value of pagination limit could be set up to 100.

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (channelList, error) {
        if (error) {
          return;
        }
        const params = new sb.UserMessageParams();
        params.message = 'My name is Jahanzeb Akbar';
        params.customType = '';
        params.data = 'DATA';
        params.mentionType = 'Group Channel'; // Either 'users' or 'channel'
        params.mentionedUserIds = ['123', '222']; // Or mentionedUsers = Array<User>;
        // params.metaArrayKeys = ['linkTo', 'itemType'];
        // params.translationTargetLanguages = ['fe', 'de'];   // French and German
        params.pushNotificationDeliveryOption = 'default'; // Either 'default' or 'suppress'
        channelList[0].sendUserMessage(params, function (message, error) {
          if (error) {
            console(error);
            return;
          }
          console.log(message);
        });
      });
    }
  };

  // var ChannelHandler = new sb.ChannelHandler();

  // ChannelHandler.onMessageReceived = function (channel, message) {
  //   console.log(channel, message);
  // };

  // sb.addChannelHandler(11, ChannelHandler);
  // });

  // console.log(channelList.length);
  // console.log(channelList[0]);

  // showList() {
  //   return (
  //     <View>
  //       <ListView
  //         enableEmptySections={true}
  //         renderRow={this._renderList}
  //         dataSource={this.state.openChannelList}
  //         onEndReached={() => this._getOpenChannelList(false)}
  //         onEndReachedThreshold={-50}
  //         onScroll={this._handleScroll}
  //       />
  //     </View>
  //   );
  // }
  render() {
    return (
      <View style={styles.containerStyle}>
        <View>
          <Button title="Send" onPress={this._Connect}></Button>
        </View>
        {/* {this.state.isConnected ? this.showList() : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 10,
  },
});
