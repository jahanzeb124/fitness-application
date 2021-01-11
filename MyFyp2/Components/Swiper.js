import React, {Component, useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import YouTube from 'react-native-youtube';
import Swiper from 'react-native-swiper';
import WebView from 'react-native-webview';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Overlay} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import Axios from 'axios';

export default function SwiperComponent() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [waqt, setWaqt] = useState([]);
  const [exercise, setExercise] = useState('');
  const data = useSelector((state) => state.workoutReducer.data);
  const checkuser = useSelector((state) => state.apiUserReducer.user);
  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const toggleOverlay = () => {
    console.log(('selected', exercise));
    setVisible(!visible);
  };
  const send = () => {
    checkuser !== '' &&
      Axios.put('http://192.168.10.9:3000/users/addworkout', {
        id: checkuser._id,
        ex: {name: exercise, time: waqt},
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.data[0].title);
          setData(res.data);
        })
        .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <Swiper
        dot={
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,.3)',
              width: 5,
              height: 5,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: 'brown',
              width: 5,
              height: 5,
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
            }}
          />
        }
        paginationStyle={{bottom: 70}}
        loop={false}>
        {data !== '' &&
          data.exname.map((element, index) => (
            <View style={styles.slide1} key={index}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={styles.text}>{element}</Text>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setExercise(element);
                      toggleOverlay();
                    }}>
                    <Text
                      style={{
                        color: 'blue',
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 20,
                      }}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <YoutubePlayer
                height={300}
                play={playing}
                videoId={data.videoid[index]}
                onChangeState={onStateChange}
              />
              <View style={styles.description}>
                <Text style={styles.descriptionHeaderText}> REPS </Text>
                {data.info[index].map((one, id) => (
                  <Text style={styles.descriptionBodyText} key={id}>
                    {'\n'}• {one}
                  </Text>
                ))}
              </View>
            </View>
          ))}
      </Swiper>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          height: 250,
          width: 250,
          borderRadius: 20,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: 50,
              textAlign: 'center',
              color: 'brown',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Set Reminder
          </Text>
          <View style={{justifyContent: 'center', flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text>9:00 PM</Text>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => {
                  setWaqt(...waqt, '9:00 PM');
                  setToggleCheckBox(newValue);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text>10:00 PM</Text>
              <CheckBox
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => {
                  setWaqt(...waqt, '10:00 PM');
                  setToggleCheckBox1(newValue);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text>11:00 PM</Text>
              <CheckBox
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => {
                  setWaqt(...waqt, '11:00 PM');
                  setToggleCheckBox2(newValue);
                }}
              />
            </View>
          </View>
          <Button
            title="confirm"
            style={{alignSelf: 'center'}}
            onPress={send}
          />
        </View>
      </Overlay>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  description: {
    flex: 7,
    marginTop: 14,
    marginLeft: 8,
    marginRight: 8,
  },
  descriptionHeaderText: {
    fontFamily: 'Avenir-Light',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    color: '#ffffff',
  },
  descriptionBodyText: {
    fontFamily: 'Avenir-Light',
    fontSize: 14,
    color: '#ffffff',
  },
});
