import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, Platform, Alert, Linking, View } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import SiteMap from '../screens/SiteMap'
import SigninForm from '../screens/SigninForm'
import SignOutForm from '../screens/SignOutForm'
import tandgForms from '../screens/tandgForms'


const Stack = createStackNavigator();

function MainStackNavigator() {


    return (


        <NavigationContainer>



            <Stack.Navigator
                initialRouteName='Home'

                screenOptions={{
                    //gestureEnabled: true,
                    headerStyle: {
                        backgroundColor: '#2C903D',
                        height: 80,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 24,
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false
                }

                }



                headerMode='float'>

                <Stack.Screen name='Home' component={Home} options={{ headerShown: false, title: 'T&G Global' }} />

                <Stack.Screen name='SiteMap' component={SiteMap} options={{ headerShown: true, title: 'T&G Global' }} />

                <Stack.Screen name='SigninForm' component={SigninForm} options={{ headerShown: true, title: 'Visitor Sign In - GER Site' }} />

                <Stack.Screen name='SignOutForm' component={SignOutForm} options={{ headerShown: true, title: 'Visitor Sign Out - GER Site' }} />

                <Stack.Screen name='tandgForms' component={tandgForms} options={{ headerShown: false, title: 'T&G Health & Saftey Report' }} />

            </Stack.Navigator>

        </NavigationContainer >



    )
}

const styles = StyleSheet.create({


    headerLeftStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 8,
        
    },

    alignTextView: {

        flexDirection: 'column'
    },

    headerLeftTopStyle: {
        color: '#BBB3B3',
        fontSize: 18,
        marginLeft: 8,
        marginBottom: 8

    },

    headerRightStyle: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10
    },



})



export default MainStackNavigator