import React from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import Single from './Singlehead';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
// import {Singlehead} from './Singlehead';

export default function ChatContainer(props) {
  return (
    <View style={{backgroundColor: '#a0a0a0', display: 'flex', flex: 1}}>
      <StatusBar hidden></StatusBar>
      <View style={styles.head}>
        <Text style={{fontSize: 35, color: 'black'}}>Chats</Text>
      </View>

      <ScrollView>
        <Single navigation={props.navigation} />
        {/* <Single navigation={props.navigation} />
        <Single navigation={props.navigation} />
        <Single navigation={props.navigation} />
        <Single navigation={props.navigation} />
        <Single navigation={props.navigation} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    display: 'flex',
    justifyContent: 'center',

    // backgroundColor: 'grey',
    height: 80,
    alignItems: 'center',
  },
});
