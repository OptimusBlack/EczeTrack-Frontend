import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import { Picker } from '@react-native-community/picker';

const Dashboard = ({ navigation }) => {
  const [factor, setFactor] = useState('');
  const factorList = {
    'symptoms': 'Symptoms',
    'msu': 'Moisturizer & Steroid Usage',
    'das': 'Diet Adherence Score',
    'stress': 'Stress',
    'environment': 'Environment',
    'sleep': 'Sleep',
    'exercise': 'Exercise'
  };

  return (
    <Background>
      <Header>Case History</Header>
      <Picker
        selectedValue={factor}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          setFactor(itemValue)
        }>
        <Picker.Item label="Java" value="java" />
      </Picker>
    </Background>
  );
};

export default memo(Dashboard);
