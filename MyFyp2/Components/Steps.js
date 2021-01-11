import React, {Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  DeviceEventEmitter,
  StatusBar,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Foundation';

import Accordion from 'react-native-collapsible/Accordion';
import {
  Avatar,
  Text,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import GoogleFit, {Scopes} from 'react-native-google-fit';

export default function Steps() {
  const [steps, setSteps] = useState(0);
  const days = [1, 2, 3, 4, 5, 6, 0];
  const daynames = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [content, setContent] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_READ_WRITE,
      ],
    };

    GoogleFit.authorize()
      .then((authResult) => {
        if (authResult.success) {
          console.log('AUTH_SUCCESS');
          GoogleFit.checkIsAuthorized().then(() => {
            console.log(GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
            if (GoogleFit.isAuthorized) {
              let today = new Date().getDay();

              console.log(days.indexOf(today));
              console.log(
                moment(new Date())
                  .subtract(days.indexOf(today), 'day')
                  .format('YYYY-MM-DD'),
              );

              // const options = {
              //   startDate: moment(new Date())
              //     .subtract(days.indexOf(today), 'day')
              //     .format('YYYY-MM-DD'), // required ISO8601Timestamp
              //   endDate: moment(new Date())
              //     .subtract(1, 'day')
              //     .format('YYYY-MM-DD'), // required ISO8601Timestamp
              // };
              console.log(options.endDate);
              GoogleFit.getDailySteps(new Date().toISOString())
                .then((res) => {
                  res.map((item) => {
                    if (
                      item.source === 'com.google.android.gms:merge_step_deltas'
                    ) {
                      console.log(item.steps);
                      console.log(item.steps[0].value);
                      setSteps(item.steps[0].value);
                    }
                  });
                })
                .catch((err) => {
                  console.warn(err);
                });
              // GoogleFit.getDailyStepCountSamples(options)
              //   .then((res) => {
              //     res.map((item) => {
              //       if (
              //         item.source === 'com.google.android.gms:merge_step_deltas'
              //       ) {
              //         // console.log(item.steps.length);
              //         // setSteps(item.steps[0].value);
              //         let dummy = [];
              //         for (let i = 0; i < item.steps.length; i++) {
              //           dummy[i] = {
              //             title: daynames[i],
              //             content: item.steps[i].value,
              //           };
              //         }
              //         setContent(dummy);
              //       }
              //     });
              //   })
              //   .catch((err) => {
              //     console.warn(err);
              //   });
            }
          });
        } else {
          console.log('AUTH_DENIED', authResult.message);
        }
      })
      .catch(() => {
        console.log('AUTH_ERROR');
      });

    return () => {
      console.log('cleanup');
    };
  }, []);

  const _renderSectionTitle = (section) => {
    return (
      // <View>
      //   <Text></Text>
      // </View>
      null
    );
  };
  const _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headertext}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 18,
            padding: 10,
            color: 'grey',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Steps Count: {section.content}
        </Text>
      </View>
    );
  };

  const _updateSections = (activeSection) => {
    setActiveSections(activeSection);
  };
  return (
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.circle}>
          <Icon name="foot" size={50} />
          {steps !== 0 && <Text style={{fontSize: 25}}>{steps}</Text>}
        </View>

        <Text
          style={{
            alignSelf: 'center',
            marginVertical: 20,
            fontSize: 30,
            opacity: 0.7,
          }}>
          Week History
        </Text>
        <View style={{flex: 1}}>
          {new Date().getDay() === 1 ? (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No Week History Available
            </Text>
          ) : (
            <Accordion
              containerStyle={{
                display: 'flex',
                alignItems: 'center',
              }}
              sections={content}
              activeSections={activeSections}
              renderSectionTitle={_renderSectionTitle}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              onChange={_updateSections}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  circle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 125,
    width: 150,
    height: 150,
    marginTop: 15,
    backgroundColor: 'white',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  content: {
    height: 50,
  },
  header: {
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
    padding: 10,

    width: 350,
    borderRadius: 25,
    opacity: 0.7,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headertext: {
    fontSize: 22,
    color: '#980000',
    // opacity: 0.8,
  },
});
