import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Avatar,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ChatContainer from './chatcontainer';
import * as trainerAction from '../redux/actions/traineraction';
import firestore from '@react-native-firebase/firestore';
export default function Trainer({navigation}) {
  const user = useSelector((state) => state.userReducer.user);
  const db = firestore();

  const data = [
    {
      name: 'Usman Malik',
      gmail: 'maliksuleman2013.lb@gmail.com',
      age: '18',
      exp: '3',
      photo:
        'https://pbs.twimg.com/profile_images/585737969950154753/Y4oMBOhO.jpg',
    },
    {
      name: 'Kayani',
      gmail: 'heenakayani@gmail.com',
      age: '18',
      exp: '3',
      photo:
        'https://pbs.twimg.com/profile_images/585737969950154753/Y4oMBOhO.jpg',
    },
    {
      name: 'zee 2',
      gmail: 'jahanzebakbar77@gmail.com',
      age: '18',
      exp: '3',
      photo:
        'https://pbs.twimg.com/profile_images/585737969950154753/Y4oMBOhO.jpg',
    },
  ];
  const clicked = (name, gmail, photo) => {
    if (user) {
      const access = [];
      access.push(gmail);
      access.push(user.email);
      db.collection('chats')
        .where('chatName', '==', name)
        .where('access', '==', access)
        .onSnapshot((snapshots) => {
          if (snapshots.size === 0) {
            db.collection('chats').add({
              chatName: name,
              access: access,
              photo: photo,
            });
          }
        });
      //   dispatch(trainerAction.trainerAction(name, access, photo));

      navigation.navigate('Chats');
    }
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        flex: 1,
      }}>
      <Text style={{fontSize: 25, margin: 2, fontFamily: 'bold'}}>
        Trainers
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
        <Text>Go to Chats</Text>
      </TouchableOpacity>
      {data.map(({name, age, exp, photo, gmail}, i) => (
        <View style={styles.onetrainer} key={i}>
          <Image
            source={{
              uri: photo,
            }}
            style={{width: 150, height: 120, borderRadius: 10}}
          />
          <View style={{marginLeft: 10}}>
            <Text style={styles.info}>{name}</Text>
            <Text style={styles.info}>{age}</Text>
            <Text style={styles.info}>{exp}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => clicked(name, gmail, photo)}>
              <Text style={styles.btntxt}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* <View style={styles.onetrainer}>
        <Image
          source={{
            uri:
              'https://pbs.twimg.com/profile_images/585737969950154753/Y4oMBOhO.jpg',
          }}
          style={{width: 150, height: 120, borderRadius: 10}}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.info}>Barney Stinson</Text>
          <Text style={styles.info}>Age: 28</Text>
          <Text style={styles.info}>Experience: 5yrs</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btntxt}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  onetrainer: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row',
  },
  btn: {
    width: 80,
    backgroundColor: '#631a3e',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderColor: 'black',
    // textAlign: 'center',
    borderWidth: 2,
  },
  btntxt: {
    fontSize: 15,
    paddingHorizontal: 16,
    color: 'white',
  },
  info: {
    fontSize: 17,
    margin: 2,
  },
});
