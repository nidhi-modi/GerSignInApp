import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  FlatList,
  Dimensions,
  Alert, ImageBackground, Animated
} from 'react-native';


//Variables 
var { width, height } = Dimensions.get('window');



export default class SiteMap extends Component {

  constructor(props) {
    super(props);
    this.state = {


    };
  }


  componentDidMount(){

    const time = 60000 * 10

    this.interval = setInterval(() => this.props.navigation.navigate('Home'), time)


  }

  componentWillUnmount() {

    clearInterval(this.interval)
  }




  render() {

    return (

      <View style={styles.container}>

        <Image
          style={styles.alignImage}
          source={require('../assets/GerMap.jpg')} />


      </View>


    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
  },

  alignImage: {

    maxHeight: height,
    maxWidth: width,
    resizeMode: 'contain',
    alignSelf: 'center',

  },



});