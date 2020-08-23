import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const RecordScreenButton = ({ children, ticked, icon }) => (
  <TouchableOpacity
    style={styles.button}
  >
    <ImageBackground
      source={require('../assets/button_background.png')}
      style={styles.background}
    >

      <FontAwesome5
        name={icon}
        size={24}
        color='white'
        style={styles.icon}
      />

      <Text style={styles.text}>
        {children}
      </Text>

      <FontAwesome
        name={ticked && 'check-circle'}
        size={24}
        color='black'
        style={styles.icon}
      />

    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 90,
    margin: 20,
    borderWidth: 4,
    borderRadius: 33,
    borderColor: 'white',
  },
  background: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 29,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1
  },
  icon: {
    padding: 15
  }
});

export default memo(RecordScreenButton);