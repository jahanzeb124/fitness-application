import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {chatAction} from '../redux/actions/chataction';

const Single = ({navigation, id, chatName, access, photo}) => {
  const dispatch = useDispatch();
  const [info, chatinfo] = useState([]);
  const db = firestore();
  useEffect(() => {
    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        chatinfo(snapshot.docs.map((doc) => doc.data())),
      );
  }, [id]);
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(chatAction(id, chatName, access, photo));
        navigation.navigate('Convo');
      }}>
      <View style={styles.contain}>
        <View>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: photo,
            }}
          />
        </View>

        <View style={{paddingLeft: 10, paddingTop: 3}}>
          <Text style={{color: 'white'}}>{chatName}</Text>
          <Text style={{color: 'white'}}>{info[0]?.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Single;
const styles = StyleSheet.create({
  contain: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 2,
    borderTopWidth: 1,

    borderColor: 'grey',
  },
});
