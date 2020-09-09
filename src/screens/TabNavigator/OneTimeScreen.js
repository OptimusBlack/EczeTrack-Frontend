import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import RecordScreenButton from '../../components/RecordScreenButton';

import {checkOneTime} from '../../ApiManager';

import { useTranslation } from 'react-i18next';

const factorList = [
  {value: 'environmentOT', label: 'Environment', icon: 'globe', screen: 'EnvironmentOTScreen'},
  {value: 'symptomOT', label: 'Symptoms', icon: 'hand-paper', screen: 'SymptomOTScreen'},
  {value: 'stressOT', label: 'Stress', icon: 'hand-point-down', screen: 'StressOTScreen'},
  {value: 'qualityOfLifeOT', label: 'Quality of Life', icon: 'tree', screen: 'QualityOfLifeOTScreen'},
];

const OneTimeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [refreshing, setRefreshing] = useState(false);
  const [check, setCheck] = useState({
    environmentOT: -1,
    symptomOT: 0,
    stressOT: 0,
    qualityOfLifeOT: 0
  });

  const _onRefresh = async () => {
    setRefreshing(true);
    const response = await checkOneTime();
    if(response && response.success){
      setCheck(response.otCheck);
    }
    setRefreshing(false);
  };

  useEffect(() =>{
    async function fetchData(){
      const response = await checkOneTime();
      if(response && response.success){
        setCheck(response.otCheck); // TODO
      }
    }
    fetchData();
  }, []);

  const onComplete = label => {
    if(label !== 'environmentOT'){
      let update = {};
      update[label] = check[label] + 1;
      setCheck({...check, ...update});
    }
  };


  return (
    <GreenBackground>
      <Header white style={styles.header}>
        {t('Your records for the Bootcamp')}
      </Header>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>

          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />

          {factorList.map((e, idx) =>
            <RecordScreenButton
              key={idx}
              value={check[e.value]}
              disabled={check[e.value] >= 3}
              icon={e.icon}
              onPress={() => navigation.navigate(e.screen, {onComplete})}
            >
              {t(e.label)}
            </RecordScreenButton>
          )}
        </ScrollView>
      </View>
    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    maxHeight: 500
  },
  scrollView:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginTop: -50
  }
});

export default memo(OneTimeScreen);
