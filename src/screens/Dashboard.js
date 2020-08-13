import React, { memo, useState } from 'react';
import { GreenBackground } from '../components/Background';
import Header from '../components/Header';
import { Picker } from '@react-native-community/picker';
import Chart from '../components/Chart';
import TimeRangeSelector from '../components/TimeRangeSelector';
import { AsyncStorage, View, StyleSheet, Text } from 'react-native';
import Button from '../components/Button';
import Carousel from 'react-native-snap-carousel';
import { theme } from '../core/theme';
import { factorList } from './dataItems/factorList';


const Dashboard = ({ navigation }) => {
  const [factor, setFactor] = useState('');
  const [carouselItems, setCarouselItems] = useState([
    {
      header: 'Case History',
      timeframe: ['03-06', '04-06', '05-06', '06-06', '07-06', '08-06', '09-06', '10-06', '11-06'],
      data: [[3, 0, 0.5, 1.5, 2, 0]],  //Make sure to have a 2D array even if 1 graph
    },
    {
      header: 'Two-factor Comparison',
      timeframe: ['03-06', '04-06', '05-06', '06-06', '07-06', '08-06', '09-06', '10-06', '11-06'],
      data: [[3, 0, 0.5, 1.5, 2, 0], [1, 0, 0.5, 0.5, 3, 0]]
    }
  ]);

  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };

  const _renderItem = ({item, index}) => {
    if (index == 0){
      return(
        <View style={styles.carouselItemContainer} >
          <Header>{item.header}</Header>
          <Picker
            selectedValue={factor}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setFactor(itemValue)
            }>
            {Object.keys(factorList).map(key =>
              <Picker.Item label={factorList[key]} value={key} />
            )}
          </Picker>
  
          <Chart xValues={item.timeframe} yValues={item.data} legend={item.legend}></Chart>
        </View>
      );
    }

    return(
      <View style={styles.carouselItemContainer} >
        <Header>{item.header}</Header>
        <View style={[styles.container, {alignItems: 'center', alignContent:'space-between'}]} >
          <Picker
            selectedValue={factor}
            style={{flex: 1}}
            onValueChange={(itemValue, itemIndex) =>
              setFactor(itemValue)
            }>
            {Object.keys(factorList).map(key =>
              <Picker.Item label={factorList[key]} value={key} />
            )}
          </Picker>
          <Text style={styles.vsText} >vs</Text>
          <Picker
            selectedValue={factor}
            style={{flex: 1}}
            onValueChange={(itemValue, itemIndex) =>
              setFactor(itemValue)
            }>
            {Object.keys(factorList).map(key =>
              <Picker.Item label={factorList[key]} value={key} />
            )}
          </Picker>
        </View>

        <Chart xValues={item.timeframe} yValues={item.data} legend={item.legend}></Chart>
      </View>
    );
  }

  return (
    <GreenBackground>
      <Header white >Insight</Header>
      <TimeRangeSelector></TimeRangeSelector>

      <View style={styles.container}>
        <Carousel
          layout={"default"}
          data={carouselItems}
          sliderHeight={400}
          itemHeight={400}
          renderItem={_renderItem}
          vertical
        >
        </Carousel>
      </View>

      <Button mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    justifyContent: 'center'
  },
  carouselItemContainer: {
    alignItems: 'center', 
    backgroundColor: theme.colors.surface,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 10
  },
  picker: {
    height: 50, 
    width: 300
  },
  vsText: {
    color: '#8e8e8e'
  }
})

export default memo(Dashboard);
