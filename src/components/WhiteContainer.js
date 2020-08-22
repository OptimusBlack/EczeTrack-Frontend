import React, { memo } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const WhiteContainer = ({ navigation, style, children }) =>
  <View style={[styles.container, style]}>{children}</View>;

const styles = StyleSheet.create({
  container:{
    height: '70%',
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    minHeight: 300
  },

});


export default memo(WhiteContainer);
