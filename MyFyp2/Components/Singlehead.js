import React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Single = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Convo');
      }}>
      <View style={styles.contain}>
        <View>
          <Avatar
            size="medium"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        </View>

        <View style={{paddingLeft: 10, paddingTop: 3}}>
          <Text>Ali</Text>
          <Text>testing</Text>
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

    borderTopWidth: 0.5,

    borderColor: 'black',
  },
});
