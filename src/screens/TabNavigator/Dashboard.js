import React, { memo, useState, useRef } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Chart from '../../components/Chart';
import TimeRangeSelector from '../../components/TimeRangeSelector';
import { AsyncStorage, View, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { theme } from '../../core/theme';
import { factorList } from '../dataItems/factorList';
import { IconButton } from 'react-native-paper';


const Dashboard = ({ navigation }) => {
  const [factor, setFactor] = useState(factorList[0].value);
  const [factor2, setFactor2] = useState(factorList[1].value);
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
  const carouselRef = useRef(null);

  const onLogout = () => {
    AsyncStorage.removeItem('user', () => navigation.navigate('HomeScreen'));
  };

  const _renderItem = ({item, index}) => {
    if (index == 0){
      return(
        <View style={styles.carouselItemContainer} >
          <Header>{item.header}</Header>
          
          <DropDownPicker
            items={factorList}
            defaultValue={factor}
            containerStyle={{height: 40, alignSelf: 'stretch'}}
            style={styles.selector}
            onChangeItem={(item) => setFactor(item.value)}
          />
          
          <Chart xValues={item.timeframe} yValues={item.data} legend={item.legend}></Chart>
          <View style={styles.navigationContainer}>
            <Text style={styles.navigationText}>Two-factor Comparison</Text>
          </View>
          <IconButton 
            icon="transfer-down"
            onPress={() => carouselRef.current.snapToNext()}
            color={theme.colors.primary}
            size={40}
          />
        </View>
      );
    }

    return(
      <View style={[styles.carouselItemContainer]} >
        <Header>{item.header}</Header>
        <View style={[styles.container, styles.dualSelectorContainer]} >
          <DropDownPicker
            items={factorList}
            defaultValue={factor}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={(item) => setFactor(item.value)}
          />
          <Text style={styles.vsText} >vs</Text>
          <DropDownPicker
            items={factorList}
            defaultValue={factor2}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={(item) => setFactor2(item.value)}
          />
        </View>
        <Chart xValues={item.timeframe} yValues={item.data} legend={item.legend}/>
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationText}>Case History</Text>
        </View>
        <IconButton 
            icon="transfer-up"
            onPress={() => carouselRef.current.snapToPrev()}
            color={theme.colors.primary}
            size={40}
          />
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
          ref={carouselRef}
          data={carouselItems}
          sliderHeight={500}
          itemHeight={500}
          renderItem={_renderItem}
          vertical
        >
        </Carousel>
      </View>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row'
  },
  carouselItemContainer: {
    alignItems: 'center', 
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 10
  },
  picker: {
    height: 50, 
    width: 300
  },
  vsText: {
    color: '#8e8e8e',
    paddingRight: 5,
    paddingLeft: 5
  },
  dualSelectorContainer: {
    alignItems: 'center',
    alignContent:'space-between',
    flexWrap:'wrap'
  },
  selector: {
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  navigationContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: 150,
    height: 25,
    borderColor: theme.colors.primary,
  },
  navigationText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 10,
  }
})

export default memo(Dashboard);
