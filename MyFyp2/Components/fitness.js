import YouTube from 'react-native-youtube';
import React from 'react';
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
const You = () => {
  return (
    <View>
      <YouTube
        apiKey="AIzaSyAivCDV_bn-1azEi5xs5i_Fv5y9VLnzoVE"
        videoId="KVZ-P-ZI6W4" // The YouTube video ID
        play={false} // control playback of video with true/false
        fullscreen={false} // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        // onReady={(e) => this.setState({isReady: true})}
        // onChangeState={(e) => this.setState({status: e.state})}
        // onChangeQuality={(e) => this.setState({quality: e.quality})}
        // onError={(e) => this.setState({error: e.error})}
        style={{alignSelf: 'stretch', height: 200}}
      />
    </View>
  );
};
export default You;
