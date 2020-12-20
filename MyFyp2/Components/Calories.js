import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ImageStore,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Card, ListItem, Button} from 'react-native-elements';
import Axios from 'axios';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchBar, Header} from 'react-native-elements';
import Login from './Login';
import {Overlay} from 'react-native-elements';
export default function Calories() {
  const [mealname, setmn] = useState('');
  const [data, setData] = useState('');

  const images = [
    'https://369t7u43n93dgc5pt43uc681-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/epic-meal-prep-5.jpg',
    'https://thegirlonbloor.com/wp-content/uploads/2017/12/Korean-Chicken-Meal-Prep-Bowls-6.jpg',
    'https://post.healthline.com/wp-content/uploads/2020/08/vegetables-fruit-healthy-eating-ingredients-1200x628-facebook-1200x628.jpg',
  ];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const Sharing = async () => {
    const shareoptions = {
      message:
        data.name +
        data.quantity +
        ' ' +
        'Calories: ' +
        data.calories +
        ' ' +
        'Proteins: ' +
        data.proteins,
    };
    try {
      const ShareResponse = await Share.open(shareoptions);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const check = () => {
    console.log(mealname);
    Axios.post('http://192.168.10.7:3000/users/getcalories', {data: mealname})
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setData(res.data);

          // this.id = res.data.User._id;
          // this.props.navigation.navigate('Main');
          // this.props.navigation.navigate("Main");
        }
      })
      .catch((error) => {
        alert('No Data Found');
      });
  };

  Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: images.random()}}
        style={{width: 450, height: windowHeight}}>
        {/* <StatusBar hidden></StatusBar> */}
        {/* <Text style={{fontSize: 35, color: 'white', alignSelf: 'flex-start'}}>
          Search Food here:
        </Text>
        <View style={{display: 'flex', flexDirection: 'row', padding: 10}}>
          <TextInput
            style={{width: 250, height: 30}}
            onChangeText={(text) => {
              setmn(text);
            }}></TextInput>

          <TouchableOpacity style={styles.btn} onPress={check}>
            <Text style={styles.btntxt}>Search</Text>
          </TouchableOpacity>
        </View> */}
        <View>
          <SearchBar
            placeholder="Search Food here"
            containerStyle={{width: 415}}
            onChangeText={(text) => {
              setmn(text);
            }}
            value={mealname}
            round={true}
            showLoading={true}
            searchIcon={{onPress: check}}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {data != '' && (
            <Card
              title={data.name}
              width={300}
              borderRadius={20}
              containerStyle={{borderColor: 'brown'}}
              wrapperStyle={{backgroundColor: 'brown', opacity: 0.7}}>
              {data.quantity != 'null' ? (
                <Text style={styles.txt}>{data.quantity}</Text>
              ) : null}
              <Text style={styles.txt}>Calories: {data.calories}</Text>
              <Text style={styles.txt}>Protiens:{data.proteins}</Text>
              <TouchableOpacity onPress={Sharing}>
                <Icon name="share-social" size={40}></Icon>
              </TouchableOpacity>
            </Card>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    width: 100,
    backgroundColor: '#631a3e',
    borderRadius: 20,
    marginLeft: 15,
    height: 35,
    borderColor: 'black',
    borderWidth: 2,
  },
  btntxt: {
    fontSize: 20,

    textAlign: 'center',
    color: 'white',
  },
  icon: {
    paddingLeft: 240,
  },
});
