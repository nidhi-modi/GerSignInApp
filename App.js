/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  PanResponder,
  View,
} from 'react-native';

import MainStackNavigator from './navigation/MainStackNavigator';
import Database from './screens/Database';

const db = new Database();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inactive: true,
    };
  }
  componentDidMount() {
    db.initDB();
  }

  render() {
    return <MainStackNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
});
