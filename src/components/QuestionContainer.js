import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import {theme} from "../core/theme";

const QuestionContainer = ({ navigation, style, children, questionNumber }) => (
    <View style={[styles.container, style]}>
      <Text style={styles.questionNumber}>{questionNumber}</Text>
      <View children={children} style={{flex: 1}}/>

    </View>
  );

const styles = StyleSheet.create({
  container:{
    alignSelf: 'stretch',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },

  questionNumber:{
    color: '#999',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20
  }

});


export default memo(QuestionContainer);
