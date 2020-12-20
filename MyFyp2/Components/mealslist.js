import Axios from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {Divider} from 'react-native-paper';

export default function Mealslist({route, navigation}) {
  const [meals, setMeals] = useState([]);
  var count = -10;
  var limit = 10;
  const [labels, setLabels] = useState([
    'title',
    'measure',
    'quantity',
    'calories',
    'proteins',
    'fat',
    'saturated_fat',
    'fiber',
    'Carbs',
    'Category',
    'clustered',
  ]);

  const id = route.params.data;
  console.log('id: ', id);

  useEffect(() => {
    let dummy = [];
    let dumobj = {};
    Axios.post('http://192.168.10.7:3000/users/getmeals', {
      data: id,
    }).then((res) => {
      res.data.map((single) => {
        if (limit != 0) {
          let i = 0;
          single.map((one) => {
            dumobj = {...dumobj, ...{[labels[i]]: one}};
            i = i + 1;
          });

          dummy.push(dumobj);
          dumobj = {};
          limit = limit - 1;
        }
      });

      setMeals(dummy);
    });
    return () => {
      console.log('cleanup');
    };
  }, []);
  console.log('Total meals', meals.length);
  const renderItem = ({item}) => {
    count = count + 1;
    return (
      <View
        key={item.key}
        style={{
          backgroundColor: '#ffd700',
          height: 250,
          alignSelf: 'center',
          width: '90%',
          marginVertical: 20,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,

          elevation: 18,
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
            marginVertical: 5,
            alignSelf: 'center',
            backgroundColor: '#ffd700',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
          }}>
          <Text
            style={{
              color: 'white',
              textShadowColor: 'black',
              textShadowOffset: {width: -1, height: 0},
              textShadowRadius: 5,
              fontSize: 24,
              fontWeight: '800',
            }}>
            {count}
          </Text>
        </View>
        <Text
          style={{
            color: 'brown',
            textAlign: 'center',
            fontWeight: 'bold',
            marginTop: 20,
            fontSize: 18,
          }}>
          {item.Category}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View>
            <Text style={styles.txt}>Name: {item.title}</Text>

            <Text style={styles.txt}>Measure: {item.measure}</Text>

            <Text style={styles.txt}>Grams: {item.quantity}</Text>
          </View>
          <View>
            <Text style={styles.txt}>Calories: {item.calories}</Text>

            <Text style={styles.txt}>Proteins: {item.proteins}</Text>

            <Text style={styles.txt}>Fat: {item.fat}</Text>
          </View>
          <View>
            <Text style={styles.txt}>Sat. Fat {item.saturated_fat}</Text>

            <Text style={styles.txt}>Fiber {item.fiber}</Text>

            <Text style={styles.txt}>Carbs: {item.Carbs}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: `brown`,
        flex: 1,
      }}>
      {meals && (
        <FlatList
          data={meals}
          renderItem={renderItem}

          //   keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 14,
    padding: 5,
    opacity: 0.7,
  },
});
