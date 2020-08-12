import React, { memo, useState } from 'react';
import { PlainBackground } from '../components/Background';
import Header from '../components/Header';
import { Picker } from '@react-native-community/picker';
import Chart from '../components/Chart';
import TimeRangeSelector from '../components/TimeRangeSelector';

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

  const timeframe = ['03-06', '04-06', '05-06', '06-06', '07-06', '08-06', '09-06', '10-06', '11-06'];
  const data = [3, 0, 0.5, 1.5, 2, 0];

  return (
    <PlainBackground>
      <Header>Case History</Header>
      <TimeRangeSelector></TimeRangeSelector>
      <Picker
        selectedValue={factor}
        style={{height: 50, width: 300}}
        onValueChange={(itemValue, itemIndex) =>
          setFactor(itemValue)
        }>
        {Object.keys(factorList).map(key =>
          <Picker.Item label={factorList[key]} value={key} />
        )}
      </Picker>
      
      <Chart xValues={timeframe} yValues={data}></Chart>
    </PlainBackground>
  );
};

export default memo(Dashboard);
