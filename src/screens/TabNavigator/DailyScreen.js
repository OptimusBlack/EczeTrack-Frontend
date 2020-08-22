import React, { memo, useState } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { TouchableOpacity, Text } from 'react-native';
import { factorList } from '../dataItems/factorList.js';

const DailyScreen = ({ navigation }) => {
  return (
    <GreenBackground>
      <Header white style={{ fontSize: 30 }}>
        {(new Date()).toDateString()}
      </Header>

      {factorList.slice(0, 4).map((e, idx) =>
        <TouchableOpacity
          key={idx}
        >
          <Text>{e.label}</Text>
        </TouchableOpacity>
      )}

    </GreenBackground>
  );
};

export default memo(DailyScreen);
