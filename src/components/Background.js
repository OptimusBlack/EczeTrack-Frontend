import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

const WhiteBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/white_background.png')}
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const GreenBackground = ({ children }) => (
  <ImageBackground
    source={require('../assets/green_background.png')}
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
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
