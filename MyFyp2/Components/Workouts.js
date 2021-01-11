import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import * as actions from '../redux/actions/workoutaction';
export default function Workouts(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get('http://192.168.10.6:3000/admin/viewworkout')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
    return () => {
      console.log('cleanup');
    };
  }, []);
  const Cardelement = ({title, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(actions.workoutAction(data[index]));
          console.log('sending data', data[index]);
          props.navigation.navigate('SwiperComponent');
        }}>
        <Card
          title={title}
          image={require('../images/chest.jpg')}
          containerStyle={{backgroundColor: 'black', borderRadius: 20}}>
          <Button
            buttonStyle={{
              borderRadius: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: 'brown',
            }}
            title="VIEW"
            // onPress={press}
          />
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      {data.length > 0 &&
        data.map((element, index) => (
          <Cardelement {...element} key={index} index={index} />
        ))}
    </ScrollView>
  );
}
