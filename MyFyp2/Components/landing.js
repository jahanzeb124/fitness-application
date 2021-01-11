import {View, ScrollView, Text, Image} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Land = ({navigation}) => {
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
      <Card title="Water Intake" image={require('../images/pic2.jpg')}>
        <Text style={{marginBottom: 10, color: 'black'}}>
          Keep track of your water intake
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
          onPress={() => navigation.navigate('Water')}
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
          onPress={() => navigation.navigate('Workouts')}
        />
      </Card>
    </ScrollView>
  );
};
export default Land;
