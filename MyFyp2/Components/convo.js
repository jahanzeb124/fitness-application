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
import AudioRecord from 'react-native-audio-record';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default function Convo({navigation}) {
  const info = useSelector((state) => state.chatReducer.chat);
  const user = useSelector((state) => state.userReducer.user);
  const [msgs, setmsgs] = useState([]);
  const [msg, setmsg] = useState('');
  const [selected, setselected] = useState('');
  const db = firestore();

  const [singleFile, setSingleFile] = useState('');
  const [blob, setBlob] = useState('');
  const [vmsg, setVmsg] = useState(true);
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

  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'test.wav', // default 'audio.wav'
  };

  const start = async () => {
    setVmsg(!vmsg);
    console.log(vmsg);
    if (vmsg) {
      console.log('started');
      AudioRecord.init(options);
      AudioRecord.start();
    } else {
      console.log('stopped');
      let audioFile = await AudioRecord.stop();
      let res = await fetch('file:///' + audioFile).then((r) => r.blob());
      setBlob(res);
    }
  };
  // const stopRecord = async () => {
  //   console.log('stopped');
  //   let audioFile = await AudioRecord.stop();
  //   let res = await fetch('file:///' + audioFile).then((r) => r.blob());

  //   setBlob(res);
  // };
  const pressed = () => {
    if ((blob == '' && selected !== '') || msg !== '') {
      db.collection('chats').doc(info.chatId).collection('messages').add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        message: msg,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
        image: singleFile,
        voiceurl: '',
      });
      setBlob('');
      setmsg('');
      setselected('');
      setSingleFile('');
    } else if (blob) {
      const id = uuidv4();
      console.log('id', id);
      storage()
        .ref(`sounds/${id}`)
        .put(blob)
        .then(function (snapshot) {
          console.log('Uploaded a blob or file!');
          console.log(snapshot);
          if (snapshot.state == 'success') {
            storage()
              .ref('sounds')
              .child(id)
              .getDownloadURL()
              .then((url) => {
                db.collection('chats')
                  .doc(info.chatId)
                  .collection('messages')
                  .add({
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    message: '',
                    uid: user.uid,
                    photo: user.photo,
                    email: user.email,
                    displayName: user.displayName,
                    image: singleFile,
                    voiceurl: url,
                  });
              });
          }
        });
      setBlob('');
      setselected('');
      setmsg('');
      setSingleFile('');
    }
    // }
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
            placeholderTextColor="#000"
            value={msg}
            editable={info.chatId ? true : false}
            onChangeText={(text) => setmsg(text)}
            placeholder={
              vmsg && blob == ''
                ? 'Send a message'
                : blob
                ? 'Message recorded...Hit Send'
                : 'Recording messsage'
            }
            style={{
              alignSelf: 'center',
              height: 40,
              color: 'black',
              borderColor: 'black',
              borderRadius: 20,
              borderWidth: 1.5,
              width: 280,
              paddingLeft: 15,
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
            <TouchableOpacity onPress={start}>
              <Icon
                name="mic"
                size={20}
                color={vmsg ? 'black' : 'red'}
                style={{margin: 8}}></Icon>
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
