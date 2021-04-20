import React, { useRef, useState, useEffect } from 'react';
import {
  ActivityIndicator, TouchableOpacity, View, Text
} from 'react-native';

import WebView from 'react-native-webview'





const tandgForms = ({ navigation }) => {

  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const webviewRef = useRef(null)

  useEffect(() => {

    const time = 60000 * 10

    interval = setInterval(() => navigation.navigate('Home'), time)

    return () => {

      clearInterval(interval)

    }
  })

  backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }

  frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }

  exitButtonHandler = () => {

    navigation.navigate('Home')

  }


  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://tandg-forms.nogginoca.com/' }}
        style={{ marginTop: 40 }}
        renderLoading={() => (
          <ActivityIndicator
            color='#2ed2d2'
            size='large'
            style={{
              flex: 1
            }}
          />
        )}
        startInLoadingState={true}
        ref={webviewRef}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack)
          setCanGoForward(navState.canGoForward)
          setCurrentUrl(navState.url)
        }}
      />

      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#2ed2d2'
        }}>
        <TouchableOpacity onPress={() => { this.exitButtonHandler() }}>
          <Text style={{ color: 'red', fontSize: 24 }}>Exit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.backButtonHandler() }}>
          <Text style={{ color: 'white', fontSize: 24 }}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.frontButtonHandler() }}>
          <Text style={{ color: 'white', fontSize: 24 }}>Forward</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default tandgForms