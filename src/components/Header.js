import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children, white, style }) => {
  if (white){
    return (
      <Text style={[styles.header, {color: '#FFFFFF'}, style]}>{children}</Text>
    );
  }
  return (
    <Text style={[styles.header, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    paddingVertical: 14
  }
});

export default memo(Header);
