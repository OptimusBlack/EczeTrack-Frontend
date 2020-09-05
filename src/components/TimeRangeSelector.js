import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../core/theme';

const TimeRangeSelector = ({ isActive, setIsActive }) => {
  return (
    <View
      style={styles.container}
    >
      {['7 days', '1 Month', '2 Months', '3 Months'].map((e, i) =>
        <Button
          style={[styles.button, isActive === i && styles.activeButton]}
          mode='outlined'
          labelStyle={[styles.buttonText, isActive === i && styles.activeText]}
          onPress={() => setIsActive(i)}
          key={i} >{e}</Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 9,
    borderWidth: 2,
    overflow: 'hidden',
    height: 50,
    width: '100%',
    margin: 15,
    borderColor: theme.colors.primary
  },
  buttonText: {
    fontSize: 10,
    textTransform: 'capitalize',
  },
  button: {
    borderRadius: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.primary,
  },
  activeButton: {
    backgroundColor: theme.colors.primary

  },
  activeText: {
    color: theme.colors.surface
  }
});

export default memo(TimeRangeSelector);