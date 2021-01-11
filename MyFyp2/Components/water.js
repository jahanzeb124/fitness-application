import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Glass from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import {Chip, Title, Button} from 'react-native-paper';
import {Image} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {ApiloginUser} from '../redux/actions/apiuseraction';
import ProgressCircle from 'react-native-progress-circle';
import CheckBox from '@react-native-community/checkbox';

const screenWidth = Dimensions.get('window').width;

export default function Water() {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();
  const [waterintake, setWaterintake] = useState(0);
  const [currenttarget, setCurrenttarget] = useState(0);
  const checkuser = useSelector((state) => state.apiUserReducer.user);
  const [input, setInput] = useState('');
  //   const progressRef = React.createRef();

  console.log(checkuser.water);
  useEffect(() => {
    setWaterintake(parseInt(checkuser.water.taken));
    setCurrenttarget(parseInt(checkuser.water.target));
    return () => {
      console.log('done');
    };
  }, []);
  useEffect(() => {
    return () => {
      update();
      console.log('cleaned');
    };
  }, [waterintake, currenttarget]);
  const update = () => {
    if (waterintake > 0 && currenttarget > 0) {
      var currentwater = waterintake;
      const water = {
        taken: String(currentwater),
        target: String(currenttarget),
      };
      console.log('water', water);
      console.log('id', checkuser._id);
      axios
        .put('http://192.168.10.6:3000/users/addwater', {
          id: checkuser._id,
          water: water,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log('response', res.data.value);
            dispatch(ApiloginUser(res.data.value));
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <Title style={{marginVertical: 20}}>Today</Title>
      <ProgressCircle
        percent={(waterintake / parseInt(currenttarget)) * 100}
        radius={70}
        borderWidth={10}
        color="brown"
        shadowColor="#999"
        bgColor="#fff">
        <Text style={{fontSize: 18, color: 'brown', fontWeight: 'bold'}}>
          {waterintake}/{currenttarget}
        </Text>
      </ProgressCircle>
      <View
        style={{
          backgroundColor: 'white',
          margin: 20,
          padding: 10,
          alignSelf: 'stretch',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Title style={{textAlign: 'center'}}>Add Cups</Title>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'stretch',
          }}>
          <Text style={{fontSize: 30, color: 'red'}}>{waterintake}</Text>
          <Image
            source={require('../images/glass.png')}
            style={{width: 150, height: 150}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => {
              if (waterintake < parseInt(checkuser.water.target)) {
                setWaterintake(waterintake + 1);
              } else {
                alert('Target is achieved..tu mera putar chuti kr');
              }
            }}>
            <Image
              source={require('../images/plus.png')}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          margin: 20,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Title style={{textAlign: 'center', marginBottom: 10}}>
            Set Your Target
          </Title>
        </View>
        <Text style={{marginVertical: 10}}>
          Current Target: {currenttarget}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => setCurrenttarget(parseInt(input))}>
            <Image
              source={require('../images/tick.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={{opacity: toggleCheckBox ? 1 : 0.5}}>
            <TextInput
              editable={toggleCheckBox}
              placeholder="Enter New Target"
              style={{borderWidth: 1}}
              onChangeText={(text) => setInput(text)}
            />
          </View>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
              setToggleCheckBox(newValue);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    alignItems: 'center',
  },
});
