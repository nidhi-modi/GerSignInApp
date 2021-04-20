import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  Dimensions,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview'


//Variables 
var { width } = Dimensions.get('window');


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {


    };
  }



  openImage = () => {

    this.props.navigation.navigate('SiteMap')

  }

  openSignin = () => {

    this.props.navigation.navigate('SigninForm')

  }

  openSignout = () => {

    this.props.navigation.navigate('SignOutForm')


  }

  openHSFormWebView = () => {


    this.props.navigation.navigate('tandgForms')
  }


  render() {
    return (

      <View style={styles.container}>

        <ScrollView>

          <Image
            style={{ width: width, height: 500 }}
            resizeMode={'cover'}
            source={require('../assets/tandgImage.jpg')}
          />

          <View style={styles.formContainer}>

            <View style={styles.marginDimensionTop} />

            <View style={styles.rowButton}>

              <TouchableOpacity onPress={() => { this.openSignin() }}>

                <View style={styles.button}>

                  <Text style={styles.buttonText}>

                    Visitor Sign In

                </Text>

                </View>


              </TouchableOpacity>

              <View style={styles.marginDimensionTop} />


              <TouchableOpacity onPress={() => { this.openSignout() }}>

                <View style={styles.button}>

                  <Text style={styles.buttonText}>

                    Visitor Sign Out

                </Text>

                </View>


              </TouchableOpacity>

            </View>

            <View style={styles.marginDimensionTop} />

            <TouchableOpacity onPress={() => { this.openImage() }}>

              <Text style={styles.buttonHeaderTextLeft}>Click here to look at our site map</Text>

            </TouchableOpacity>


            <View style={styles.marginDimension} />

            <View style={styles.emptyView} />

            <View style={styles.marginDimension} />

            <View style={{ justifyContent: 'center' }}>
              <Image
                style={styles.alignImage}
                source={require('../assets/h&sSignature.png')}
              />
            </View>

            <View style={styles.marginTop18} />


            <TouchableOpacity
              onPress={() => { this.openHSFormWebView() }}
              style={styles.hsButtonContainer}>
              <Text style={styles.buttonText}>Report Health {'&'} Safety</Text>
            </TouchableOpacity>

            <View style={styles.marginDimension} />

            <View style={styles.emptyView} />

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText}>Key Site Contact Details</Text>

            <View style={styles.marginDimension} />

            <View style={styles.rowButton}>

              <View>

                <Text style={styles.buttonHeaderText2}>Grower Manager</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Nilesh Patel (021 938 274)</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText2}>Grower</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Sign (021 277 4182)</Text>

              </View>

              <View>
                <Text style={styles.buttonHeaderText2}>Production Manager</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Heather Feetham (021 766 785)</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Francis Dee (027 203 3688)</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Sign (021 277 4182)</Text>
              </View>

            </View>

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText2}>Team Leaders</Text>

            <View style={styles.marginDimensionSmallTop} />

            <Text style={styles.buttonHeaderText3}>Marsha Stone Pohatu (027 238 1788)</Text>

            <View style={styles.marginDimensionSmallTop} />

            <Text style={styles.buttonHeaderText3}>Nau Pesa (021 765 037)</Text>

            <View style={styles.marginDimensionSmallTop} />

            <Text style={styles.buttonHeaderText3}>Deep Singh (021 765 157)</Text>

            <View style={styles.marginDimension} />

            <View style={styles.emptyView} />

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText}>H{'&'}S REP's</Text>

            <View style={styles.marginDimension} />

            <View style={{ justifyContent: 'center' }}>
              <ScrollView
                horizontal={true} style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>

                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/picture1.png')}
                  />
                  <View style={styles.marginDimensionSmallTop} />

                  <Text style={styles.buttonHeaderText3}>Elizabeth Qiu</Text>

                </View>



                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/picture2.png')}
                  />
                  <View style={styles.marginDimensionSmallTop} />

                  <Text style={styles.buttonHeaderText3}>Jaya Vytla</Text>

                </View>

                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/picture3.png')}
                  />
                  <View style={styles.marginDimensionSmallTop} />

                  <Text style={styles.buttonHeaderText3}>Huia Flavell</Text>

                </View>

                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/picture4.png')}
                  />
                  <View style={styles.marginDimensionSmallTop} />

                  <Text style={styles.buttonHeaderText3}>Wai Potini</Text>

                </View>

                <View>
                  <Image
                    style={styles.alignImageHS}
                    source={require('../assets/picture5.png')}
                  />
                  <View style={styles.marginDimensionSmallTop} />

                  <Text style={styles.buttonHeaderText3}>Maggie Cornelius</Text>

                </View>

              </ScrollView>

            </View>

            <View style={styles.marginDimension} />

            <View style={styles.emptyView} />

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText}>First Aid Trained</Text>

            <View style={styles.marginDimension} />

            <View style={styles.rowButton}>

              <View>

                <Text style={styles.buttonHeaderText2}>Front Of Site</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Heather Feetham - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Huia Flavell - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Wai Potini - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Deep Singh - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Singh - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Nilesh Patel - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}></Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}></Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}></Text>

              </View>

              <View>
                <Text style={styles.buttonHeaderText2}>Back Of Site</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Francis Dee - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Nau Pesa - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Deep Singh - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Amy Bhana - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Elizabeth Qiu - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Singh - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Nilesh Patel - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Jaya Vytla - In house</Text>

              </View>


            </View>

            <View style={styles.marginDimension} />

            <View style={styles.emptyView} />

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText}>Fire Wardens</Text>

            <View style={styles.marginDimension} />

            <Text style={styles.buttonHeaderText2}>Head Warden</Text>

            <View style={styles.marginDimensionSmallTop} />

            <Text style={styles.buttonHeaderText3}>Nilesh Patel</Text>

            <View style={styles.marginDimension} />

            <View style={styles.rowButton}>

              <View>

                <Text style={styles.buttonHeaderText2}>Front Of Site</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Heather Feetham - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Huia Flavell - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Ruben Subba - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Singh - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}></Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}></Text>


              </View>

              <View>
                <Text style={styles.buttonHeaderText2}>Back Of Site</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Francis Dee - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Helen Brian - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Amy Bhana - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Ruben Subba - In house</Text>

                <View style={styles.marginDimensionSmallTop} />

                <Text style={styles.buttonHeaderText3}>Gurjant Singh - In house</Text>


              </View>


            </View>

            <View style={styles.marginDimension} />

          </View>



        </ScrollView>

      </View>


    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
  },

  hsButtonContainer: {

    backgroundColor: '#cc0000',
    borderRadius: 25,
    padding: 10,
    marginRight: 30,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center'

  },

  alignImage: {

    resizeMode: 'cover',
    alignSelf: 'center'

  },

  alignImageHS: {

    width: 220,
    height: 300,
    margin: 10,

  },

  buttonHeaderText: {

    fontSize: 33,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#2C903D',
    textTransform: 'uppercase'

  },

  buttonHeaderText2: {

    fontSize: 27,
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic'

  },

  modal: {

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  buttonHeaderTextLeft: {

    fontSize: 27,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 45,
    textDecorationLine: 'underline',

  },

  buttonHeaderText3: {

    fontSize: 24,
    textAlign: 'center',

  },

  marginDimensionTop: {

    marginTop: 20,

  },

  marginTop18: {

    marginTop: 19,

  },

  marginDimension: {

    marginTop: 50,

  },

  emptyView: {

    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    marginRight: 40,
    marginLeft: 40

  },

  marginDimensionRight: {

    marginRight: 18,

  },

  marginDimensionSmallTop: {

    marginTop: 15,

  },

  formContainer: {

    padding: 5,
    paddingRight: 10,
    margin: 10,
    marginRight: 10,
    height: '100%',
    width: '100%'

  },

  rowButton: {

    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around'

  },

  imageMargin: {

    marginRight: 8,


  },

  button: {

    backgroundColor: '#2C903D',
    borderRadius: 25,
    flex: 1,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300

  },

  buttonMiddle: {

    alignItems: 'center',
    backgroundColor: '#2C903D',
    borderRadius: 25,
    height: 75,
    justifyContent: 'center',
    width: 300,
    alignSelf: 'center'

  },


  buttonText: {

    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }

});