import {View, ScrollView, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
const Land = ({}) => {
  // const screen = () => {
  //   navigation.navigate('Signup');
  // };
  return (
    <ScrollView>
      <TouchableOpacity>
        <Card title="MEAL PLANS" image={require('../images/pic.jpg')}>
          <Text style={{marginBottom: 10}}>
            Select different Meal Plans that will definitely help you to stay
            fit.....
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 20,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              backgroundColor: 'brown',
            }}
            title="VIEW"
          />
        </Card>
      </TouchableOpacity>
      <Card title="FITNESS VIDEOS" image={require('../images/pic2.jpg')}>
        <Text style={{marginBottom: 10, color: 'black'}}>
          Watch Videos and maintain your posture
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: 'brown',
          }}
          title="VIEW"
        />
      </Card>
      <Card title="EXERCISE ROUTINE" image={require('../images/pic3.jpg')}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          buttonStyle={{
            borderRadius: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: 'brown',
          }}
          title="VIEW"
        />
      </Card>
    </ScrollView>
  );
};
export default Land;
