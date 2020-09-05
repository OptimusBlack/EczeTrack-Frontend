import React, { memo } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const WhiteContainer = ({ navigation, style, children, pointerEvents }) =>
  <View style={[styles.container, pointerEvents === "none" && styles.grayOut, style]} children={children} pointerEvents={pointerEvents} />;

const styles = StyleSheet.create({
  container:{
    height: '70%',
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    minHeight: 300
  },
  grayOut: {
    backgroundColor: 'lightgray'
  }
});


export default memo(WhiteContainer);
