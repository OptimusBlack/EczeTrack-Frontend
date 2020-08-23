import React, { memo } from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';

import {theme} from "../core/theme";

let SIZE = 18;

const RadioButton = ({checked, onPress, label, size, error, value}) => {
  SIZE = size ? size : SIZE;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.radioContainer, error && value === 0 && styles.errorRadioContainer]}>
          { checked &&
            <View style={styles.innerRadio}/>
          }
        </View>
      </TouchableOpacity>
      <Text style={[styles.radioLabel, error && value === 0 && styles.errorLabel]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center'
  },
  radioContainer: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE/2,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRadio: {
    height: SIZE/2,
    width: SIZE/2,
    borderRadius: SIZE/4,
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    marginTop: 5
  },
  errorRadioContainer:{
    borderColor: theme.colors.error
  },
  errorLabel: {
    color: theme.colors.error
  }
});

export default memo(RadioButton);

