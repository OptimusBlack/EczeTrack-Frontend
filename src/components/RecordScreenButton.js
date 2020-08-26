import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../core/theme';

const RecordScreenButton = ({ children, ticked, icon, onPress, disabled }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    disabled={disabled}
  >
    <ImageBackground
      source={require('../assets/button_background.png')}
      style={styles.background}
    >

      <FontAwesome5
        name={icon}
        size={24}
        color='#15342f'
        style={styles.icon}
      />

      <Text style={styles.text}>
        {children}
      </Text>

      <FontAwesome
        name={ticked ? 'check-circle' : 'exclamation-circle'}
        size={24}
        color={ticked ? '#15342f' : '#4f2020'}
        style={styles.icon}
      />

    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 90,
    // margin: 20,
    borderWidth: 4,
    borderRadius: 33,
    borderColor: '#15342f',
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
    color: '#15342f',
    fontSize: 20,
    // fontFamily: 'Avenir-Bold',
    flex: 1
  },
  icon: {
    padding: 15
  }
});

export default memo(RecordScreenButton);