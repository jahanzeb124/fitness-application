import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import TimeAgo from 'react-native-timeago';
import {useSelector} from 'react-redux';
export default function Onemsg({
  chatId,
  contents: {timestamp, displayName, email, message, photo, uid, image},
}) {
  const state = useSelector((state) => state.userReducer.user);
  const Showimg = () => {
    console.log(image);
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
        <Text style={{fontSize: 17, fontWeight: 'normal'}}>{message} </Text>

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
    margin: 5,
    backgroundColor: '#e7b99f',
  },
  block2: {
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
});
