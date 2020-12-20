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
    title: 'Weight Loss Diet',
    content: 'This diet contains food with low fat ration high carbs......',
  },
  {
    uri: 'https://i.ibb.co/j62tn4D/epic-meal-prep-5.jpg',
    title: 'Weight Gain Diet ',
    content:
      'This diet is a very low-carb, high-fat diet that shares many similarities with the Atkins and low-carb diets. ',
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
          this.props.navigation.navigate('Meallist', {data: index});
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
    borderColor: 'brown',
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
