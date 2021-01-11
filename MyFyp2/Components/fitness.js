import YouTube from 'react-native-youtube';
import React, {useCallback, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
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
export default function You() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  return (
    // {/* <YouTube
    //   apiKey="AIzaSyAivCDV_bn-1azEi5xs5i_Fv5y9VLnzoVE"
    //   videoId="9l9guSIjnZY" // The YouTube video ID
    //   play={false} // control playback of video with true/false
    //   fullscreen={false} // control whether the video should play in fullscreen or inline
    //   loop // control whether the video should loop when ended
    //   // onReady={(e) => this.setState({isReady: true})}
    //   // onChangeState={(e) => this.setState({status: e.state})}
    //   // onChangeQuality={(e) => this.setState({quality: e.quality})}
    //   // onError={(e) => this.setState({error: e.error})}
    //   style={{alignSelf: 'stretch', height: 200}}
    // /> */}
    <View>
      <View>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={'_mjNH7HiQ3k'}
          onChangeState={onStateChange}
        />
        {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
        {/* </View>
      <View>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={'AIjsngj5xck'}
          onChangeState={onStateChange}
        />
        {/* <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} /> */}
      </View>
    </View>
  );
}
