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

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  // const [isActive, setIsActive] = useState(0);
  const [timeRange, setTimeRange] = useState(0);

  const [factor, setFactor] = useState(factorList[0].value);
  const [factor2, setFactor2] = useState(factorList[0].value);
  const [factor3, setFactor3] = useState(factorList[1].value);
  const [factorList2, setFactorList2] = useState(factorList);
  const [factorList3, setFactorList3] = useState(factorList);

  const [factor1ChartData, setFactor1ChartData] = useState({
    dates: ['03-06', '05-06', '07-06', '09-06'],
    data: [[3, 0, 0.5, 1.5, 2, 0, 1.5, 2, 1.5]],
    legend: []
  });
  const [factor2ChartData, setFactor2ChartData] = useState({
    dates: ['03-06', '05-06', '07-06', '09-06'],
    data: [[3, 0, 0.5], [1, 0, 0.5, 0.5, 3, 0,5,6,7,8,9,5,4,3,2,1,3,4,5,7,5,4,3]],
    legend: []
  });

  const carouselRef = useRef(null);

  const temp = {
    dates: ['09-6', '09-7', '09-8', '09-9'],
    data: [[3, 0, 0.5, 1.5, 2, 0, 7, 2, 5, 4, 3], [1, 0.5, 0.5, 3, 0]],
    legend: []
  };

  // const onBackPress = ()=>{
  //   BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   BackHandler.exitApp();
  // };
  // BackHandler.addEventListener('hardwareBackPress', onBackPress);

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
    if(res && !res.code){
      setFactor1ChartData(res.chartData);
    }
    setLoading(false);
  };

  const updateFactor2 = async () => {
    setLoading(true);
    const dateFrom = getDateFrom();
    const res = await getChartData(factor2, dateFrom, new Date());
    if(res&& !res.code){
      twoFactorComparisionData.factor2 = res.chartData;
      updateTwoFactorComparisionChartData()
    }
    setLoading(false);
  };

  const updateFactor3 = async () => {
    setLoading(true);
    const dateFrom = getDateFrom();
    const res = await getChartData(factor3, dateFrom, new Date());
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

    const legend = f2.legend.concat(f3.legend);
    const dates = mergeDates(f2.dates, f3.dates);
    let data;
    
    if (f3.dates[0] < f2.dates[0]){
      const f2Data = adjustStart(dates, f2.dates[0], f2.data);
      data = f3.data.concat(f2Data);
    } else {
      const f3Data = adjustStart(dates, f3.dates[0], f3.data);
      data = f2.data.concat(f3Data);
    }
    
    for(let i=0; i<data.length; i++){
      let max = Math.max(...data[i]);
      if(max === 0)
        max = 1;

      for (let j=0; j<data[i].length; j++){
        data[i][j] /= max;
      }
    }
    setFactor2ChartData({data, legend, dates});
  };

  const adjustStart = (dates, startDate, data) => {
    const padding = dates.indexOf(startDate);

    if (padding > 0){
      let finalArray = [];
      data.forEach((dataArray) => {
        let paddedArray = (new Array(padding)).fill(dataArray[0]);
        finalArray.push(paddedArray.concat(dataArray));
      });
      return finalArray;
    }
    return data;
  }

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
    else if(chartData.data[0].length === 0){ // First empty
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
    let mergedDates = date1;
    let tempArray = [];
    date2.forEach((item) => {
      if (!mergedDates.includes(item)){
        tempArray.push(item);
      }
    });
    mergedDates = mergedDates.concat(tempArray);

    return mergedDates.sort();
  };

  const _updateFactor = (item) => {
    setFactor(item.value);
  };

  const _updateFactorList = (item, index) => {
    setFactor2(item.value);
    const factorsArray = factorList.filter((elem) => elem.value != item.value);
    setFactorList3(factorsArray);

    if (factor3 == item.value)
      setFactor3(factorsArray[0].value);
  };

  const _renderItem = ({item, index}) => {
    if (index === 0){
      return(
        <View style={styles.carouselItemContainer} >
          <Header>{t('Case History')}</Header>
          
          <DropDownPicker
            items={factorList.map((item) => {return {'value': item.value, 'label': t(item.label)} })}
            defaultValue={t(factor)}
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
            <Text style={styles.navigationText}>{t('Two-factor Comparison')}</Text>
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
        <Header>{t('Two-factor Comparison')}</Header>
        <View style={[styles.container, styles.dualSelectorContainer, Platform.OS !== 'android' && {
          zIndex: 10
        }]} >
          <DropDownPicker
            items={factorList2.map((item) => {return {'value': item.value, 'label': t(item.label)} })}
            defaultValue={t(factor2)}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={_updateFactorList}
          />
          <Text style={styles.vsText} >{t('vs')}</Text>
          <DropDownPicker
            items={factorList3.map((item) => {return {'value': item.value, 'label': t(item.label)} })}
            defaultValue={t(factor3)}
            containerStyle={{height: 40, flex: 1}}
            style={styles.selector}
            onChangeItem={(item, index) => setFactor3(item.value)}
          />
        </View>
        <Chart
          xValues={factor2ChartData.dates}
          yValues={factor2ChartData.data}
          legend={factor2ChartData.legend}
          loading={loading}
        />
        <View style={styles.navigationContainer}>
          <Text style={styles.navigationText}>{t('Case History')}</Text>
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
      <Header white >{t('Insight')}</Header>
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
