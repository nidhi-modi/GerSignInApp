import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
  TextInput,
  Dimensions, Platform,
  Alert, Keyboard, SafeAreaView, Modal, ActivityIndicator
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { ListItem, SearchBar } from 'react-native-elements'
import Database from '../screens/Database'
import Toast from 'react-native-simple-toast';
import moment from 'moment';








//Variables 
var { width, height } = Dimensions.get('window');
var currentWeekNumber = require('current-week-number');
const db = new Database();
var completeDate, completeTime, dbDate;




export default class SigninForm extends Component {

  constructor(props) {
    super(props);
    this.state = {

      weekNumber: '',
      data: [],
      error: null,
      isLoading: false,
    };

    this.arrayholder = [];

  }


  componentDidMount() {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    
    dbDate = month + '/' + date + '/' + year

    db.listVisitorsName(dbDate).then((dataRes) => {
      console.log("Calling database");
      this.setState({
        data: dataRes
      });
      console.log(this.state.data);

      this.arrayholder = dataRes;


    }).catch((err) => {

      console.log(err);
    })

    const time = 60000 * 10

    this.interval = setInterval(() => this.props.navigation.navigate('Home'), time)


  }

  componentWillUnmount() {

    clearInterval(this.interval)
  }

  getFlatlistItem(visitorId, visitorName, signinTime, weekNumber, signinDate, companyName, visitingPerson, visitingPersonOthers, visitedBefore, visitedOtherGH, termsConditions) {

    Alert.alert(
      visitorName + ',',
      'Are you sure you want to sign out??',
      [
        { text: 'Yes', onPress: () => this.signOutVisitors(visitorId, visitorName, signinTime, weekNumber, signinDate, companyName, visitingPerson, visitingPersonOthers, visitedBefore, visitedOtherGH, termsConditions) },
        { text: 'No', onPress: () => console.log("No"), style: 'cancel'}
      ],
      {
        cancelable: false
      }
    );

  }

  signOutVisitors(visitorId, visitorName, signinTime, weekNumber, signinDate, companyName, visitingPerson, visitingPersonOthers, visitedBefore, visitedOtherGH, termsConditions) {


    this.calculateDateTime();

    this.setState({ isLoading: true })

    let data = {

      visitorId: visitorId,
      visitorName: visitorName.toString(),
      signinTime: signinTime.toString(),
      weekNumber: weekNumber.toString(),
      signinDate: signinDate.toString(),
      companyName: companyName.toString(),
      visitingPerson: visitingPerson.toString(),
      visitingPersonOthers: visitingPersonOthers.toString(),
      visitedBefore: visitedBefore.toString(),
      visitedOtherGH: visitedOtherGH.toString(),
      termsConditions: termsConditions.toString(),
      signoutDate: completeDate.toString(),
      signoutTime: completeTime.toString()
    }

    db.updateVisitorDetails(data.visitorId, data).then((result) => {

      console.log(result);

      const scriptUrl = 'https://script.google.com/macros/s/AKfycby9ML4MBF4z7agjCmBaTBHlK9z2np9deD4j6V-twaDXqDdnz9SsnUSUB9Q58Wr9gqPsjg/exec';
      const url = `${scriptUrl}?
        callback=ctrlq&action=${'doPostGerSignOutDetails'}&week_number=${weekNumber}&signin_date=${signinDate}&signin_time=${signinTime}&visitor_name=${visitorName}&company_name=${companyName}&visiting_person=${visitingPerson}&visiting_person_others=${visitingPersonOthers}&inducted_before=${visitedBefore}&visited_glasshouse=${visitedOtherGH}&terms_conditions=${termsConditions}&signout_date=${completeDate}&signout_time=${completeTime}`;

      console.log("URL : " + url);
      fetch(url, { mode: 'no-cors' }).then((response) => {

        if (response.status === 200) {

          this.setState({
            isLoading: false
          })

          Toast.showWithGravity('Thanks for visiting us!!', Toast.LONG, Toast.CENTER);

          this.props.navigation.navigate('Home')

        }

      });

    }).catch((err) => {

      this.setState({
        isLoading: false
      })
      console.log(err);

    })

  }

  calculateDateTime = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    completeDate = month + '/' + date + '/' + year
    completeTime = hours + ':' + minutes + ':' + seconds
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.visitorName.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {


    return (

      <SearchBar style={styles.searchBarStyle}
        round
        lightTheme
        searchIcon={{ size: 30 }}
        platform="ios"
        onChangeText={text => this.searchFilterFunction(text)}
        placeholder="Type Name..."
        value={this.state.value}

      />
    );
  };

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <Text style={styles.btnText}>Signing Out...</Text>
          <ActivityIndicator size="large" color="#2C903D" />
        </View>
      )
    }

    return (

      <SafeAreaView style={styles.container}>

        <View style={styles.formContainer}>

          <View style={styles.backgroundColorImages}>

            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 15, alignItems: 'center' }}>


                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                      padding: 10,
                      fontSize: 26,
                      height: 55,
                      marginTop: 10,
                      color: '#2c903d',
                      fontWeight: 'bold'
                    }}>{item.visitorName}</Text>

                    <Text style={{
                      padding: 10,
                      fontSize: 20,
                      height: 55,
                      marginTop: 10,
                      fontStyle: 'italic'
                    }}>{item.companyName}</Text>

                  </View>
                  <View style={styles.centerAlign}>
                    <TouchableOpacity onPress={this.getFlatlistItem.bind(this, item.visitorId, item.visitorName, item.signinTime, item.weekNumber, item.signinDate, item.companyName, item.visitingPerson, item.visitingPersonOthers, item.visitedBefore, item.visitedOtherGH, item.termsConditions)}
                      style={styles.buttonContainer}
                    >
                      <Text style={styles.buttonText1}>Sign Out</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />

          </View>


        </View>



      </SafeAreaView >


    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#E3EDFD'
  },

  searchBarStyle: {

    height: 70,
    fontSize: 28,
    color: '#000000',


  },

  styleCheckbox: {

    borderRadius: 3

  },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 100,
  },

  text: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center'


  },

  rowButton: {

    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',


  },

  buttonContainer: {
    backgroundColor: '#2C903D',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    height: 65,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center'

  },

  buttonText1: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic'

  },

  itemStyle: {
    padding: 10,
  },

  alignImageHS: {

    width: 220,
    height: 300,
    margin: 10,

  },

  flexDirection: {

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 8,
  },

  alignImage: {

    maxHeight: height,
    maxWidth: width,
    resizeMode: 'contain',
    alignSelf: 'center',

  },

  textInputContainer: {

    flex: 2,
    flexDirection: 'row'

  },

  headerText: {

    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    marginLeft: 12,
    paddingTop: 10,
    marginTop: 12,


  },

  btnText: {

    color: '#000000',
    fontSize: 20
  },

  activity: {

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  formContainer: {

    borderRadius: 5,
    padding: 10,
    margin: 20,
    marginRight: 20,
    height: '100%',
    width: '95%'
  },

  backgroundColor: {

    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#DADCE0',
    borderWidth: 1,

  },

  backgroundColorImages: {

    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderColor: '#DADCE0',
    borderWidth: 1,
  },

  spaceInBetween: {

    marginTop: 10,

  },

  spaceInBetweenTextBox: {

    marginTop: 28,

  },

  spaceInBetweenDropdown: {

    marginTop: 35,

  },

  textInputStyle: {
    fontSize: 22,
    color: 'black',
    paddingBottom: 8,
    backgroundColor: "transparent",

  },

  textStyle: {
    fontSize: 22,
    color: 'black',
    paddingBottom: 8,
    marginLeft: 12,
    backgroundColor: "transparent",
    fontWeight: 'bold',


  },

  textStyleCheckboxed: {
    fontSize: 22,
    color: 'black',
    paddingBottom: 8,
    marginLeft: 12,
    backgroundColor: "transparent",


  },

  borderEdit: {

    marginLeft: 12,
    paddingTop: 8,
    borderColor: '#A9A9A9',
    borderBottomWidth: 1,
    marginRight: 100,
    marginRight: 10,
    marginTop: 40,

  },

  borderEditSmall: {

    marginLeft: 15,
    paddingTop: 8,
    borderColor: '#A9A9A9',
    borderBottomWidth: 1,
    marginRight: 100,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 16,
    width: 460

  },

  radioButton:
  {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  radioButtonHolder:
  {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  radioIcon:
  {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },

  label:
  {
    marginLeft: 10,
    fontSize: 24
  },

  centerAlign: {

    alignItems: 'center'
  }




});