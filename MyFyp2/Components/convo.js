import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Onemsg from './onemsg';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {Flipper, Flipped} from 'react-flip-toolkit';
export default function Convo({navigation}) {
  const info = useSelector((state) => state.chatReducer.chat);
  const user = useSelector((state) => state.userReducer.user);
  const [msgs, setmsgs] = useState([]);
  const [msg, setmsg] = useState('');
  const [selected, setselected] = useState('');
  const db = firestore();
  const [singleFile, setSingleFile] = useState('');
  useEffect(() => {
    if (info.chatId) {
      db.collection('chats')
        .doc(info.chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setmsgs(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}))),
        );
    }
  }, [info.chatId]);

  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  const pressed = () => {
    if (selected !== '' || msg !== '') {
      db.collection('chats').doc(info.chatId).collection('messages').add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        message: msg,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
        image: singleFile,
      });
      setmsg('');
      setselected('');
    }
  };
  const goback = () => {
    navigation.navigate('Chats');
  };
  const select = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      var data = await RNFS.readFile(res.uri, 'base64').then((res) => {
        return res;
      });

      var header = 'data:image/png;base64,';
      var source = header.concat(data);
      setSingleFile(source);
      setselected(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <View style={{display: 'flex', flex: 1}}>
      {/* {singleFile !== '' && (
        <Image source={{uri: singleFile}} style={{width: 50, height: 50}} />
      )} */}
      <ImageBackground
        source={{
          uri: 'https://wallpapercave.com/wp/wp4410716.jpg',
        }}
        style={styles.image}>
        <View style={styles.info}>
          <TouchableOpacity onPress={goback}>
            <Icon name="chevron-back-outline" size={40}></Icon>
          </TouchableOpacity>

          <Text style={{fontSize: 20}}>{info.chatName}</Text>
        </View>

        <View style={styles.msgs}>
          <ScrollView>
            {msgs.map(({id, data}) => (
              <Onemsg key={id} contents={data} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.send}>
          <TextInput
            value={msg}
            editable={info.chatId ? true : false}
            onChangeText={(text) => setmsg(text)}
            placeholder="send message"
            style={{
              alignSelf: 'center',
              height: 40,
              color: 'black',
              borderColor: 'black',
              borderRadius: 20,
              borderWidth: 1.5,
              width: 280,
            }}
            //   onChangeText={(text) => onChangeText(text)}
          />
          {selected !== '' && (
            <Image
              source={{uri: selected.uri}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
            }}>
            <TouchableOpacity onPress={select}>
              <Icon name="image" size={25} style={{margin: 8}}></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressed}>
              <Icon name="send" size={20} style={{margin: 8}}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    flex: 0.07,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: 'black',
    // position: 'relative',
    // top: 0,
    // right: 0,
    // left: 0,
  },
  msgs: {
    flex: 0.86,
    display: 'flex',
  },
  send: {
    flex: 0.07,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
