import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 168,
    marginBottom: 12,
  },
});
// 5692 × 3200

export default memo(Logo);
