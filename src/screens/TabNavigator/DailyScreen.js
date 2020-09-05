import React, { memo, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';

import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import RecordScreenButton from '../../components/RecordScreenButton';

import { factorList } from '../../data/factorList';
import {checkDaily} from '../../ApiManager'
import { useTranslation } from 'react-i18next';

const DailyScreen = ({ route, navigation }) => {
  const { t } = useTranslation();

  const icons = ['hand-paper', 'pills', 'apple-alt', 'globe'];
  const screenNavigation = ['SymptomScreen', 'MSUScreen', 'DietScreen', 'EnvironmentScreen'];
  const dailyCheckLabels = ['symptom', 'msu', 'das', 'environment'];

  const [refreshing, setRefreshing] = React.useState(false);
  const [check, setCheck] = React.useState({
    symptom: false,
    msu: false,
    das: false,
    environment: false
  });

  const _onRefresh = async () => {
    setRefreshing(true);
    const response = await checkDaily();
    if(response && response.success){
      setCheck(response.dailyCheck);
    }
    setRefreshing(false);
  };

  useEffect(() =>{
    async function fetchData(){
      const response = await checkDaily();
      if(response && response.success){
        setCheck(response.dailyCheck);
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
        {t('Your records for')} {(new Date()).toDateString()}
      </Header>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          {factorList.slice(0, 4).map((e, idx) =>
            <RecordScreenButton
              key={idx}
              ticked={check[dailyCheckLabels[idx]]}
              // disabled={check[dailyCheckLabels[idx]]}
              icon={icons[idx]}
              onPress={() => navigation.navigate(screenNavigation[idx], {onComplete})}
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

export default memo(DailyScreen);
