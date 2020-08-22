import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View
} from 'react-native';

const WhiteBackground = ({ children, notAvoidingKeyboard, containerStyle }) => (

  <ImageBackground
    source={require('../assets/white_background.png')}
    style={styles.background}
  >
    {!notAvoidingKeyboard ?
      <KeyboardAvoidingView style={[styles.container, containerStyle]} behavior="padding">
        {children}
      </KeyboardAvoidingView> :
      <View style={[styles.container, containerStyle]} behavior="padding">
        {children}
      </View>}
  </ImageBackground>

);

const GreenBackground = ({ children, notAvoidingKeyboard, containerStyle }) => (
  <ImageBackground
    source={require('../assets/green_background.png')}
    style={styles.background}
  >
    {!notAvoidingKeyboard ?
      <KeyboardAvoidingView style={[styles.container, containerStyle]} behavior="padding">
        {children}
      </KeyboardAvoidingView> :
      <View style={[styles.container, containerStyle]} behavior="padding">
        {children}
      </View>}
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 15,
    width: '100%',
    // maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  WhiteBackground, 
  GreenBackground
}
