import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/sleepQuestions';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {record} from '../../ApiManager'

import {theme} from "../../core/theme";
import { useTranslation } from 'react-i18next';


const SleepScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [q5, setQ5] = useState(0);
  const [q6, setQ6] = useState(0);
  const [error, setError] = useState(-1);

  const values = [q1, q2, q3, q4, q5, q6];
  const setters = [setQ1, setQ2, setQ3, setQ4, setQ5, setQ6];

  const onComplete = navigation.getParam('onComplete', ()=>{});

  const validate = async ()=>{
    for(let i=0; i<values.length; i++){
      if(values[i] === 0){
        setError(i);
        return;
      }
    }


    const vals = {0: q1-1, 1: q2-1, 2: q3-1, 3: q4-1, 4: q5-1, 5: q6-1};
    const res = await record(vals, 'sleep');
    onComplete('sleep');
    navigation.navigate('WeeklyScreenStack', {recordAdded: res.recordAdded});

  };

  const allQuestions = questions.map( (q, i) => (
    <QuestionContainer questionNumber={i+1} key={i}>
      <QuestionText>{t(q)}</QuestionText>
      <View style={styles.answerContainer}>

        <RadioButton
          value={values[i]}
          checked={ values[i] === 1}
          onPress={() => setters[i](1)}
          label={i === 5 ? t('Bad') : t('Rarely')}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 2}
          onPress={() => setters[i](2)}
          label={i === 5 ? t('Fair') : t('Sometimes')}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 3}
          onPress={() => setters[i](3)}
          label={i === 5 ? t('Good') : t('Often')}
          error={error === i}
        />

      </View>
    </QuestionContainer>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>{t('Weekly Sleep')}</Header>

      <WhiteContainer>
        <ScrollView style={{alignSelf: 'stretch'}}>
          {allQuestions}

          <View style={styles.hintBox}>
            <Text style={styles.hintLabel}>{'* '+t('Rarely')+': ' + t('Less than 3 times a month')}</Text>
            <Text style={styles.hintLabel}>{'* '+t('Sometimes')+': (<50%) '+ t('1-3 times a week')}</Text>
            <Text style={styles.hintLabel}>{'* '+t('Often')+': '+t('4-7 times a week')}</Text>
          </View>
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate}>{t('Confirm')}</Button>


    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  answerContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5
  },
  inputBox:{
    width: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    flex: 1,
    textAlign: 'right'
  },
  hintBox:{
    marginTop: 20
  },
  hintLabel:{
    fontStyle: 'italic',
    fontSize: 12,
    lineHeight: 15
  }
});


export default memo(SleepScreen);
