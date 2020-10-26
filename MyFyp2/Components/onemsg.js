import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Onemsg() {
  return (
    <View style={styles.block}>
      <Text style={{fontSize: 15, fontWeight: 'normal'}}>testing </Text>
      <Text style={{fontSize: 10}}>12:00</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    padding: 7,
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 0.5,
    margin: 5,
    backgroundColor: '#e7b99f',
  },
});
