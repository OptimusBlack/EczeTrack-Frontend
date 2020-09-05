import React, { memo, useEffect } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import RecordScreenButton from '../../components/RecordScreenButton';

import {checkOneTime} from '../../ApiManager'

const factorList = [
  {value: 'environmentOT', label: 'Environment (OT)', icon: 'globe', screen: 'EnvironmentOTScreen'},
  {value: 'symptomOT', label: 'Symptoms', icon: 'hand-paper', screen: 'SymptomOTScreen'},
  {value: 'stressOT', label: 'Stress', icon: 'hand-point-down', screen: 'StressOTScreen'},
  {value: 'qualityOfLifeOT', label: 'Quality of Life', icon: 'hand-point-down', screen: 'QualityOfLifeOTScreen'},
];

const OneTimeScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = React.useState(false);
  const [check, setCheck] = React.useState({
    environmentOT: false,
    symptomOT: false,
    stressOT: false
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
    let update = {};
    update[label] = true;
    setCheck({...check, ...update});
  };


  return (
    <GreenBackground>
      <Header white style={styles.header}>
        Your records for the One Time Questionnaire
      </Header>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>

          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />

          {factorList.map((e, idx) =>
            <RecordScreenButton
              key={idx}
              ticked={check[e.value]}
              disabled={check[e.value]}
              icon={e.icon}
              onPress={() => navigation.navigate(e.screen, {onComplete})}
            >
              {e.label}
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
