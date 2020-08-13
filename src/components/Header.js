import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children, white }) => {
  if (white){
    return (
      <Text style={[styles.header, {color: '#FFFFFF'}]}>{children}</Text>
    );
  }
  return (
    <Text style={styles.header}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    paddingVertical: 14
  }
});

export default memo(Header);
