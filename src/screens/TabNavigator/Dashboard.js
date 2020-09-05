import React, { memo, useState, useRef, useEffect } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import Chart from '../../components/Chart';
import TimeRangeSelector from '../../components/TimeRangeSelector';
import { View, StyleSheet, Text, BackHandler } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { theme } from '../../core/theme';
import { factorList } from '../../data/factorList';
import { IconButton } from 'react-native-paper';

import {getChartData} from '../../ApiManager';

let twoFactorComparisionData = {
  factor2:{
    data: [[]],
    dates: [],
    legend: []
  },
  factor3:{
    data: [[]],
    dates: [],
    legend: []
  },
};

const Dashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  // const [isActive, setIsActive] = useState(0);
  const [timeRange, setTimeRange] = useState(0);

  const [factor, setFactor] = useState(factorList[0].value);
  const [factor2, setFactor2] = useState(factorList[0].value);
  const [factor3, setFactor3] = useState(factorList[1].value);
  const [factor1ChartData, setFactor1ChartData] = useState({
    dates: ['03-06', '05-06', '07-06', '09-06'],
    data: [[3, 0, 0.5, 1.5, 2, 0, 1.5, 2, 1.5]],
    legend: []
  });
  const [factor2ChartData, setFactor2ChartData] = useState({
    dates: ['03-06', '05-06', '07-06', '09-06'],
    data: [[3, 0, 0.5, 1.5, 2, 0], [1, 0, 0.5, 0.5, 3, 0]],
    legend: []
  });

  const carouselRef = useRef(null);


  const onBackPress = ()=>{
    BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    BackHandler.exitApp();
  };
  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  // useEffect(()=>{
  //   updateFactor1();
  //   updateFactor2();
  //   updateFactor3();
  // }, []);


  useEffect(()=>{
    updateFactor1();
  }, [factor]);
  useEffect(()=>{
    updateFactor2();
  }, [factor2]);
  useEffect(()=>{
    updateFactor3();
  }, [factor3]);


  const getDateFrom = ()=>{
    const now = new Date();
    const days = [7, 30, 61, 91];
    return new Date(now.getTime() - (days[timeRange] * 24 * 60 * 60 * 1000));
  };

  const updateFactor1 = async () => {
    setLoading(true);
    const dateFrom = getDateFrom();
    const res = await getChartData(factor, dateFrom);
    console.log(res.chartData.data);
    if(res && !res.code){
      setFactor1ChartData(res.chartData);
    }
    setLoading(false);
  };

  const updateFactor2 = async () => {
    setLoading(true);
    const res = await getChartData(factor2, '1-1-2020', new Date());
    if(res&& !res.code){
      twoFactorComparisionData.factor2 = res.chartData;
      updateTwoFactorComparisionChartData()
    }
    setLoading(false);
  };

  const updateFactor3 = async () => {
    setLoading(true);
    const res = await getChartData(factor3, '1-1-2020', new Date());
    if(res&& !res.code){
      twoFactorComparisionData.factor3 = res.chartData;
      updateTwoFactorComparisionChartData()
    }
    setLoading(false);
  };

  const updateTwoFactorComparisionChartData = ()=>{
    let f2 = {...twoFactorComparisionData.factor2};
    let f3 = {...twoFactorComparisionData.factor3};
    f2 = filterChartData(f2);
    f3 = filterChartData(f3);
    const data = f2.data.concat(f3.data);
    const legend = f2.legend.concat(f3.legend);
    const dates = mergeDates(f2.dates, f3.dates);
    console.log({data, legend, dates});
    if(twoFactorComparisionData.factor2.legend.length > 0 && twoFactorComparisionData.factor3.legend.length > 0)
      setFactor2ChartData({data, legend, dates});

  };

  const filterChartData = chartData => {
    if(chartData.data.length === 1){ // Not MSU
      if(chartData.data[0].length === 0){ //Empty data array
        chartData.data = [];
        chartData.dates = [];
        chartData.legend = [];
      }
      return chartData;
    }

    // MSU
    if(chartData.data[0].length === 0 && chartData.data[1].length === 0){ // Both empty
      chartData.data = [];
      chartData.dates = [];
      chartData.legend = [];
    }
    if(chartData.data[0].length === 0){ // First empty
      chartData.data = [chartData.data[1]];
      chartData.legend = [chartData.legend[1]];
    }
    else if(chartData.data[1].length === 0){ // Second empty
      chartData.data = [chartData.data[0]];
      chartData.legend = [chartData.legend[0]];
    }
    return chartData;
  };


  const mergeDates = (date1, date2) => {
    let mergedDates = [];
    let i=0, j=0;
    while(i<date1.length && j<date2.length){
      if(date1[i] === date2[i]){
        mergedDates.push(date1[i]);
        i++;
        j++;
      }
      else if(date1[i] < date2[i]){
        mergedDates.push(date1[i]);
        i++;
      }
      else{
        mergedDates.push(date2[j]);
        j++;
      }
    }

    while(i<date1.length){
      mergedDates.push(date1[i]);
      i++;
    }
    while(j<date2.length){
      mergedDates.push(date2[j]);
      j++;
    }
    return mergedDates;

  };

  const _updateFactor = (item) => {
    setFactor(item.value);
  };

  const _renderItem = ({item, index}) => {
    if (index === 0){
      return(
        <View style={styles.carouselItemContainer} >
          <Header>{'Case History'}</Header>
          
          <DropDownPicker
            items={factorList}
            defaultValue={factor}
            containerStyle={{height: 40, alignSelf: 'stretch'}}
            style={styles.selector}
            onChangeItem={_updateFactor}
          />
          
          <Chart
            xValues={factor1ChartData.dates}
            yValues={factor1ChartData.data}
            legend={factor1ChartData.legend}
            loading={loading}
          />
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
        <Header>{'Two-factor Comparison'}</Header>
        <View style={[styles.container, styles.dualSelectorContainer, Platform.OS !== 'android' && {
          zIndex: 10
        }]} >
          <DropDownPicker
            items={factorList}
            defaultValue={factor2}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={(item) => setFactor2(item.value)}
          />
          <Text style={styles.vsText} >vs</Text>
          <DropDownPicker
            items={factorList}
            defaultValue={factor3}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={(item) => setFactor3(item.value)}
          />
        </View>
        <Chart
          xValues={factor2ChartData.dates}
          yValues={factor2ChartData.data}
          legend={factor2ChartData.legend}
          loading={loading}
        />
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
  };

  return (
    <GreenBackground>
      <Header white >Insight</Header>
      <TimeRangeSelector isActive={timeRange} setIsActive={setTimeRange}/>

      <View style={styles.container}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={[0,1]}
            sliderHeight={500}
            itemHeight={500}
            renderItem={_renderItem}
            vertical
          />
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
    // fontWeight: 'bold',
    fontFamily: 'Avenir-Bold',
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 10,
  }
});

export default memo(Dashboard);
