import React, {createRef, forwardRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import {useSelector} from 'react-redux';
import Sound from 'react-native-sound';
import Play from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default function Onemsg({
  chatId,
  contents: {
    timestamp,
    displayName,
    email,
    message,
    photo,
    uid,
    image,
    voiceurl,
  },
}) {
  const [play, setPlay] = useState(false);

  var voiceplay = () => {
    const sound =
      voiceurl &&
      new Sound(voiceurl, '', (error) => {
        if (error) {
          console.log('error');
        }
        console.log('playing');
        setPlay(!play);
        sound.play();
      });
  };

  const state = useSelector((state) => state.userReducer.user);
  const Showimg = () => {
    if (image !== '') {
      return (
        <Image
          source={{uri: image}}
          style={{
            width: 200,
            height: 200,
          }}
        />
      );
    } else {
      return null;
    }
  };
  return (
    <View style={state.email === email ? styles.block2 : styles.block1}>
      <Avatar
        size="medium"
        rounded
        source={{
          uri: photo,
        }}
      />
      <View
        style={state.email === email ? styles.textstyle1 : styles.textstyle2}>
        {voiceurl === '' ? (
          <Text style={{fontSize: 17, fontWeight: 'normal'}}>{message} </Text>
        ) : (
          image === '' && (
            <View>
              <TouchableOpacity onPress={voiceplay}>
                <Play
                  size={25}
                  name="play-circle"
                  color={play ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          )
        )}

        <Showimg />

        <Text style={{fontSize: 10, marginTop: 10}}>
          <TimeAgo time={timestamp?.toDate()} />
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  block1: {
    position: 'relative',
    padding: 10,
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
    backgroundColor: '#e7b99f',
  },
  block2: {
    flexWrap: 'wrap',
    position: 'relative',
    padding: 10,
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row-reverse',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 0.5,
    margin: 5,
    backgroundColor: '#adb6d6',
  },
  textstyle1: {
    marginRight: 8,
  },
  textstyle2: {
    marginLeft: 8,
  },
  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    width: 300,

    height: 100,
  },
});
