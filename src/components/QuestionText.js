import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import {theme} from "../core/theme";

const QuestionText = ({ navigation, style, children }) =>
  <Text style={[styles.question, style]} children={children}/>;

const styles = StyleSheet.create({
  question:{
    marginBottom: 10
  },
});


export default memo(QuestionText);
