import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {CheckBox} from 'react-native-elements';
import Video from 'react-native-video';
import Database from '../screens/Database';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

//Variables
var {width, height} = Dimensions.get('window');
var currentWeekNumber = require('current-week-number');
const GerVideo = require('../assets/HarInductionVideo.mp4');
const db = new Database();
var completeDate, completeTime;

class RadioButton extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        activeOpacity={0.8}
        style={styles.radioButton}>
        <View
          style={[
            styles.radioButtonHolder,
            {
              height: this.props.button.size,
              width: this.props.button.size,
              borderColor: this.props.button.color,
            },
          ]}>
          {this.props.button.selected ? (
            <View
              style={[
                styles.radioIcon,
                {
                  height: this.props.button.size / 2,
                  width: this.props.button.size / 2,
                  backgroundColor: this.props.button.color,
                },
              ]}></View>
          ) : null}
        </View>
        <Text style={[styles.label, {color: this.props.button.color}]}>
          {this.props.button.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default class SignOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioInductionVideo: [
        {
          label: 'Yes',
          size: 40,
          color: 'green',
          selected: false,
        },

        {
          label: 'No',
          size: 40,
          color: 'red',
          selected: false,
        },
      ],

      radioGlasshouses: [
        {
          label: 'Yes, either in New Zealand or overseas.',
          size: 40,
          color: 'green',
          selected: false,
        },

        {
          label: 'No',
          size: 40,
          color: 'red',
          selected: false,
        },
      ],

      weekNumber: '',
      inductedBefore: '',
      visitedGlasshouse: '',
      tcSelected: false,
      personVisiting: '',
      visitorName: '',
      companyName: '',
      personVisitingText: '',
      tcChecked: '',
      modalVisible: false,
      signinDate: '',
      signinTime: '',
      isLoading: false,
    };
  }

  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  handleOnPress = () => this.setState({checked: !this.state.checked});

  componentDidMount() {
    //CALCULATING WEEK NUMBERS
    var currentYear = new Date().getFullYear();

    var shortYear = currentYear.toString().substr(-2);

    var weeks = shortYear + currentWeekNumber(new Date()) - 1;

    //save data to state
    this.setState({weekNumber: weeks});

    //END

    const time = 60000 * 10;

    this.interval = setInterval(
      () => this.props.navigation.navigate('Home'),
      time,
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeActiveRadioInductionVideo(index) {
    this.state.radioInductionVideo.map(item => {
      item.selected = false;
    });

    this.state.radioInductionVideo[index].selected = true;

    this.setState({radioInductionVideo: this.state.radioInductionVideo}, () => {
      this.setState({
        inductedBefore: this.state.radioInductionVideo[index].label,
      });
    });

    if (this.state.radioInductionVideo[index].label === 'No') {
      this.toggleModal(true);
    }
  }

  changeActiveRadioGlasshouse(index) {
    this.state.radioGlasshouses.map(item => {
      item.selected = false;
    });

    this.state.radioGlasshouses[index].selected = true;

    this.setState({radioGlasshouses: this.state.radioGlasshouses}, () => {
      this.setState({
        visitedGlasshouse: this.state.radioGlasshouses[index].label,
      });
    });
  }

  submitData = () => {
    this.calculateDateTime();

    this.setState({
      isLoading: true,
    });

    console.log('NAME : ' + this.state.visitorName);
    console.log('COMPANY : ' + this.state.companyName);
    console.log(
      'PERSON VISITING : ' +
        this.state.personVisiting +
        ' OR ' +
        this.state.personVisitingText,
    );
    console.log('INDUCTED BEFORE : ' + this.state.inductedBefore);
    console.log('GLASSHOUSE BEFORE : ' + this.state.visitedGlasshouse);
    console.log('TC ACCEPTED : ' + this.state.tcSelected);

    const {visitorName} = this.state;
    const {companyName} = this.state;
    const {personVisiting} = this.state;
    const {personVisitingText} = this.state;
    const {inductedBefore} = this.state;
    const {visitedGlasshouse} = this.state;
    const {tcSelected} = this.state;
    const {weekNumber} = this.state;
    const {signinTime} = this.state;
    const {signinDate} = this.state;

    let allData = {
      visitorName: this.state.visitorName.toString(),
      signinTime: completeTime.toString(),
      weekNumber: this.state.weekNumber.toString(),
      signinDate: completeDate.toString(),
      companyName: this.state.companyName.toString(),
      visitingPerson: this.state.personVisiting.toString(),
      visitingPersonOthers: this.state.personVisitingText.toString(),
      visitedBefore: this.state.inductedBefore.toString(),
      visitedOtherGH: this.state.visitedGlasshouse.toString(),
      termsConditions: this.state.tcSelected.toString(),
      signoutDate: '',
      signoutTime: '',
    };

    if (visitorName) {
      if (companyName) {
        if (personVisiting) {
          if (inductedBefore) {
            if (visitedGlasshouse) {
              if (tcSelected) {
                db.addVisitor(allData)
                  .then(result => {
                    console.log(result);

                    const scriptUrl =
                      'https://script.google.com/macros/s/AKfycbyJ1L7FLV8QMfvPsuanVQaGj2QIe6m84y5wDbBka7TKx67NLotvZpGmI7ziw2sDpZJS/exec';
                    const url = `${scriptUrl}?
                    callback=ctrlq&action=${'doPostGerDetails'}&week_number=${
                      this.state.weekNumber
                    }&signin_date=${this.state.signinDate}&signin_time=${
                      this.state.signinTime
                    }&visitor_name=${this.state.visitorName}&company_name=${
                      this.state.companyName
                    }&visiting_person=${
                      this.state.personVisiting
                    }&visiting_person_others=${
                      this.state.personVisitingText
                    }&inducted_before=${
                      this.state.inductedBefore
                    }&visited_glasshouse=${
                      this.state.visitedGlasshouse
                    }&terms_conditions=${this.state.tcSelected}`;

                    console.log('URL : ' + url);
                    fetch(url, {mode: 'no-cors'}).then(response => {
                      if (response.status === 200) {
                        this.setState({
                          isLoading: false,
                        });

                        Toast.showWithGravity(
                          'Sign In Completed.',
                          Toast.LONG,
                          Toast.CENTER,
                        );

                        this.props.navigation.navigate('Home');
                      }
                    });
                  })
                  .catch(err => {
                    this.setState({
                      isLoading: false,
                    });
                    console.log(err);
                  });
              } else {
                this.setState({
                  isLoading: false,
                });

                alert('Please read and agree to all the H&S requirements ');
              }
            } else {
              this.setState({
                isLoading: false,
              });

              alert(
                'Please select appropriate options if you have visited any glasshouses before ',
              );
            }
          } else {
            this.setState({
              isLoading: false,
            });

            alert(
              'Please select appropriate options if you have not been inducted before ',
            );
          }
        } else {
          this.setState({
            isLoading: false,
          });

          alert(
            'Please select name of the person you would like to meet on site ',
          );
        }
      } else {
        this.setState({
          isLoading: false,
        });

        alert('Please enter your company/organization name');
      }
    } else {
      this.setState({
        isLoading: false,
      });

      alert('Please enter your name');
    }
  };

  calculateDateTime = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    completeDate = month + '/' + date + '/' + year;
    completeTime = hours + ':' + minutes + ':' + seconds;

    this.setState({
      signinDate: completeDate,
      signinTime: completeTime,
    });

    console.log(this.state.signinDate + ' ' + this.state.signinTime);

    //this.submitData();
  };

  changeCheckbox = () => {
    this.setState({tcSelected: !this.state.tcSelected});
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <Text style={styles.btnText}>Completing Sign In...</Text>
          <ActivityIndicator size="large" color="#2C903D" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView
            style={styles.formContainer}
            keyboardShouldPersistTaps="handled">
            <View style={styles.spaceInBetween} />

            <View style={styles.backgroundColor}>
              <Text style={styles.headerText}>
                1. Name (if group, seperate by comma)
              </Text>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Enter Name"
                  placeholderTextColor="transparent"
                  autoCapitalize="words"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'visitorName')
                  }
                  returnKeyType={'next'}
                  ref={input => {
                    this.visitorName = input;
                  }}
                  onSubmitEditing={() => {
                    this.companyName.focus();
                  }}
                />
              </View>
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <View style={styles.backgroundColor}>
              <Text style={styles.headerText}>2. Company</Text>

              <View style={styles.borderEdit}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Enter Company's Name"
                  placeholderTextColor="transparent"
                  autoCapitalize="words"
                  multiline={false}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onChangeText={text =>
                    this.updateTextInput(text, 'companyName')
                  }
                  returnKeyType={'done'}
                  onSubmit={Keyboard.dismiss}
                  ref={input => {
                    this.companyName = input;
                  }}
                />
              </View>
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <View
              style={{
                // The solution: Apply zIndex to any device except Android
                ...(Platform.OS !== 'android' && {
                  zIndex: 20,
                }),
              }}>
              <View style={styles.backgroundColorImages}>
                <Text style={styles.headerText}>
                  3. Person Visiting: If unsure, select Nilesh Patel
                </Text>

                <View style={styles.spaceInBetweenDropdown} />

                <DropDownPicker
                  items={[
                    {label: 'Nilesh Patel', value: 'Nilesh Patel'},
                    {label: 'Nick Wang', value: 'Nick Wang'},
                    {label: 'Sai Chandrasekar', value: 'Sai Chandrasekar'},
                    {
                      label: 'Dasharatha Weerakoon',
                      value: 'Dasharatha Weerakoon',
                    },
                    {label: 'Ruben Subba', value: 'Ruben Subba'},
                    {label: 'Ben Smith', value: 'Ben Smith'},
                    {label: 'Chris Norris', value: 'Chris Norris'},
                    {
                      label: 'Deepak Pannirselvam',
                      value: 'Deepak Pannirselvam',
                    },
                    {label: 'Others', value: 'Others'},
                  ]}
                  placeholder="SELECT"
                  containerStyle={{height: 55, width: 500}}
                  style={{
                    backgroundColor: '#ffffff',
                    marginRight: 20,
                    borderColor: '#A9A9A9',
                    borderWidth: 1,
                    marginLeft: 12,
                  }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  labelStyle={{
                    fontSize: 22,
                    textAlign: 'left',
                    color: '#000000',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item =>
                    this.setState({
                      personVisiting: item.value,
                    })
                  }
                />

                {this.state.personVisiting === 'Others' ||
                this.state.personVisiting === null ? (
                  <View style={styles.borderEditSmall}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Enter Visiting Persons Name"
                      placeholderTextColor="transparent"
                      autoCapitalize="words"
                      multiline={false}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onChangeText={text =>
                        this.updateTextInput(text, 'personVisitingText')
                      }
                      returnKeyType={'next'}
                    />
                  </View>
                ) : null}

                <View style={styles.spaceInBetween} />
              </View>
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <Video
                  source={GerVideo}
                  style={{width: width, height: 400}}
                  controls={true}
                  ref={ref => {
                    this.player = ref;
                  }}
                />

                <View style={styles.centerAlign}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                      this.toggleModal(!this.state.modalVisible);
                    }}>
                    <Text style={styles.text}>Close Video</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.backgroundColor}>
              <Text style={styles.headerText}>
                4. Have you been inducted on site before?
              </Text>

              <View style={styles.spaceInBetween} />

              <View style={styles.flexDirection}>
                {this.state.radioInductionVideo.map((item, key) => (
                  <RadioButton
                    key={key}
                    button={item}
                    onClick={this.changeActiveRadioInductionVideo.bind(
                      this,
                      key,
                    )}
                  />
                ))}
              </View>
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <View style={styles.backgroundColorImages}>
              <Text style={styles.headerText}>
                5. Have you visited any other glasshouses recently?
              </Text>

              <View style={styles.spaceInBetweenDropdown} />

              <View style={styles.flexDirection}>
                {this.state.radioGlasshouses.map((item, key) => (
                  <RadioButton
                    key={key}
                    button={item}
                    onClick={this.changeActiveRadioGlasshouse.bind(this, key)}
                  />
                ))}
              </View>

              <View style={styles.spaceInBetweenTextBox} />

              <Text style={styles.textStyle}>
                NOTE: Full body suit, safety gumboots, foot covers and gloves
                are required {'\n'}(Please see pictures below).
              </Text>

              <View style={styles.rowButton}>
                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/safety1.jpg')}
                  />
                  <View style={styles.spaceInBetween} />
                </View>

                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/safety2.jpg')}
                  />
                  <View style={styles.spaceInBetween} />
                </View>
              </View>
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <View style={styles.backgroundColorImages}>
              <Text style={styles.headerText}>
                Health {'&'} Safety requirements for the site. {'\n\n'}While
                onsite at T{'&'}G GER site please observe the following:
              </Text>

              <View style={styles.spaceInBetweenDropdown} />

              <Text style={styles.textStyleCheckboxed}>
                1. Follow all site signage and all reasonable instructions of
                Management team.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                2. Forklifts {'&'} Trucks have right of way over all other
                traffic on site, including cars {'&'} pedestrians.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                3. Vehicles must park in designated areas and observe traffic
                flows, including speed limits {'&'} Reverse parking.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                4. All injury's, near misses, {'&'} hazards must be reported.
                Please inform the Management team in such an occurrence.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                5. In an emergency the alarm will sound. On hearing the alarm,
                proceed immediately to the evacuation area.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                6. Entry into the glasshouse is at Management discretion {'&'}{' '}
                requires the wearing of boots, shoe covers, a coat, {'&'} the
                use of all foot-baths.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                7. Bees are present within the glasshouses, notify Management
                before entering if you are allergic.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                8. Notify Management as soon as possible if you require any
                assistance due to health reasons.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                9. No smoking except in designated areas at all times.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                10. No food or drink (except water or if you are diabetic)
                allowed in the glasshouses. No chewing gum allowed on site.
              </Text>

              <View style={styles.spaceInBetween} />

              <Text style={styles.textStyleCheckboxed}>
                11. Remember to sign out before leaving site.
              </Text>

              <View style={styles.spaceInBetweenTextBox} />

              <CheckBox
                style={styles.styleCheckbox}
                size={50}
                uncheckedColor="red"
                checkedColor="green"
                title="I confirm the above has been read and understood"
                checked={this.state.tcSelected}
                textStyle={{fontSize: 22}}
                containerStyle={{backgroundColor: 'transparent'}}
                onPress={() => this.changeCheckbox()}
              />

              <View style={styles.spaceInBetweenTextBox} />
            </View>

            <View style={styles.spaceInBetweenTextBox} />

            <View style={styles.centerAlign}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  this.submitData();
                }}>
                <Text style={styles.buttonText1}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3EDFD',
  },

  styleCheckbox: {
    borderRadius: 3,
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
    justifyContent: 'center',
  },

  rowButton: {
    flexDirection: 'row',
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
    width: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText1: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
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
    flexDirection: 'row',
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
    fontSize: 20,
  },

  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  formContainer: {
    borderRadius: 5,
    padding: 10,
    margin: 20,
    marginRight: 20,
    height: '100%',
    width: '95%',
  },

  backgroundColor: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 180,
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
    backgroundColor: 'transparent',
  },

  textStyle: {
    fontSize: 22,
    color: 'black',
    paddingBottom: 8,
    marginLeft: 12,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },

  textStyleCheckboxed: {
    fontSize: 22,
    color: 'black',
    paddingBottom: 8,
    marginLeft: 12,
    backgroundColor: 'transparent',
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
    width: 460,
  },

  radioButton: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    marginLeft: 10,
    fontSize: 24,
  },

  centerAlign: {
    alignItems: 'center',
  },
});
