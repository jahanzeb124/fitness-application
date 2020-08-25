import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const {width} = Dimensions.get('window');

const data = [
  {
    uri: 'https://i.ibb.co/NWPWvGj/05ee4b5092d6e47eaf4aec9aacfe1ddf.jpg',
    title: 'KETO DIET',
    content:
      'The ketogenic diet is a very low-carb, high-fat diet that shares many similarities with the Atkins and low-carb diets. ',
  },
  {
    uri: 'https://i.ibb.co/j62tn4D/epic-meal-prep-5.jpg',
    title: 'DIET PLAN 2 ',
    content:
      'his is similar to a standard ketogenic diet, but includes more protein. The ratio is often 60% fat, 35% protein and 5% carbs. ',
  },
  {
    uri: 'https://i.ibb.co/V90rVGD/freezer-meals.jpg',
    title: 'DIET PLAN 3',
    content:
      'This diet involves periods of higher-carb refeeds, such as 5 ketogenic days followed by 2 high-carb days',
  },

  {
    uri: 'https://i.ibb.co/j62tn4D/epic-meal-prep-5.jpg',
    title: 'DIET PLAN 4',
    content:
      'his is a very low-carb, moderate-protein and high-fat diet. It typically contains 75% fat, 20% protein and only 5% carbs ',
  },
];

export default class Car extends Component {
  renderItem = ({item, index}) => {
    const {uri, title, content} = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}>
        <ImageBackground source={{uri: uri}} style={styles.imageBackground}>
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>Lorem</Text>
          </View>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={this.renderItem}
        itemWidth={0.7 * width}
        inActiveOpacity={0.3}
        containerWidth={width + 60}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: '#141518',
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3,
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white',
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rightText: {color: 'white'},
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  contentText: {
    fontSize: 12,
  },
});
