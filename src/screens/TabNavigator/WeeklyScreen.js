import React, { memo, useEffect } from 'react';
import { StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { factorList } from '../../data/factorList.js';
import RecordScreenButton from '../../components/RecordScreenButton';

import {checkWeekly} from '../../ApiManager'
import { useTranslation } from 'react-i18next';


const WeeklyScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const icons = ['running', 'hand-point-down', 'bed'];
  const screenNavigation = ['ExerciseScreen', 'StressScreen', 'SleepScreen'];
  const weeklyCheckLabels = ['exercise', 'stress', 'sleep'];

  const [refreshing, setRefreshing] = React.useState(false);
  const [check, setCheck] = React.useState({
    exercise: false,
    stress: false,
    sleep: false
  });

  const _onRefresh = async () => {
    setRefreshing(true);
    const response = await checkWeekly();
    if(response && response.success){
      setCheck(response.weeklyCheck);
    }
    setRefreshing(false);
  };

  useEffect(() =>{
    async function fetchData(){
      const response = await checkWeekly();
      if(response && response.success){
        setCheck(response.weeklyCheck);
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
        {t('Your records for the past week')}
      </Header>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>

          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />

          {factorList.slice(4, 7).map((e, idx) =>
            <RecordScreenButton
              key={idx}
              ticked={check[weeklyCheckLabels[idx]]}
              // disabled={check[weeklyCheckLabels[idx]]}
              icon={icons[idx]}
              onPress={() => navigation.navigate(screenNavigation[idx], {onComplete})}
            >
              {t(e.label)}
            </RecordScreenButton>
          )}
        </ScrollView>
      </View>
    </GreenBackground>
  );
}

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

export default memo(WeeklyScreen);
