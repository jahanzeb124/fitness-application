import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import Single from './Singlehead';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// import {Singlehead} from './Singlehead';

export default function ChatContainer(props) {
  const state = useSelector((state) => state.userReducer.user);
  const trainer = useSelector((state) => state.trainerReducer.trainer);
  const [chat, setchat] = useState([]);
  const db = firestore();

  useEffect(() => {
    db.collection('chats')
      .where('access', 'array-contains', state.email)
      .onSnapshot((snapshot) =>
        setchat(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}))),
      );
  }, []);

  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  const logout = () => {
    auth().signOut();
    props.navigation.navigate('Decide1');
  };
  return (
    <View style={{backgroundColor: '#a0a0a0', display: 'flex', flex: 1}}>
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?ixlib=rb-1.2.1&w=1000&q=80',
        }}
        style={styles.image}>
        <StatusBar hidden></StatusBar>
        <View style={styles.head}>
          <Text style={{fontSize: 35, color: 'grey', alignSelf: 'flex-start'}}>
            Chats
          </Text>
          <View style={{marginLeft: 260}}>
            <TouchableOpacity onPress={logout}>
              <Image
                source={{
                  uri: state?.photo,
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                }}
              />
              <Text style={{color: 'white'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{flex: 0.9}}>
          {chat.map(({id, data: {chatName, access, photo}}) => (
            <Single
              key={id}
              navigation={props.navigation}
              id={id}
              chatName={chatName}
              access={access}
              photo={photo}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 0.1,
  },
  user: {
    alignSelf: 'flex-end',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
