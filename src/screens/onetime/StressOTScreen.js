import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import RadioButton from '../../components/RadioButton';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/stressF2Questions';

import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {record} from '../../ApiManager'

import {theme} from "../../core/theme";
import { useTranslation } from 'react-i18next';

const StressOTScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [q5, setQ5] = useState(0);
  const [q6, setQ6] = useState(0);
  const [q7, setQ7] = useState(0);
  const [q8, setQ8] = useState(0);
  const [q9, setQ9] = useState(0);
  const [q10, setQ10] = useState(0);
  const [q11, setQ11] = useState(0);
  const [q12, setQ12] = useState(0);
  const [q13, setQ13] = useState(0);
  const [q14, setQ14] = useState(0);
  const [q15, setQ15] = useState(0);
  const [q16, setQ16] = useState(0);
  const [q17, setQ17] = useState(0);
  const [error, setError] = useState(-1);

  const values = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17];
  const setters = [setQ1, setQ2, setQ3, setQ4, setQ5, setQ6, setQ7, setQ8, setQ9, setQ10, setQ11, setQ12, setQ13, setQ14, setQ15, setQ16, setQ17];

  const onComplete = navigation.getParam('onComplete', ()=>{});

  const validate = async ()=>{
    for(let i=0; i<values.length; i++){
      if(values[i] === 0){
        setError(i);
        return;
      }
    }

    const vals = {};
    for(let i=0; i<values.length; i++){
      vals[i] = values[i]-1;
    }
    const res = await record(vals, 'stressOT');
    onComplete('stressOT');
    navigation.navigate('OneTimeScreen', {recordAdded: res.recordAdded});
  };

  const allQuestions = questions.map( (q, i) => (
    <QuestionContainer questionNumber={i+1} key={i}>
      <QuestionText>{t(q)}</QuestionText>
      <View style={styles.answerContainer}>

        <RadioButton
          value={values[i]}
          checked={ values[i] === 1}
          onPress={() => setters[i](1)}
          label={t('Never')}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 2}
          onPress={() => setters[i](2)}
          label={t('Sometimes')}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 3}
          onPress={() => setters[i](3)}
          label={t('Often')}
          error={error === i}
        />

      </View>
    </QuestionContainer>
  ));

  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('OneTimeScreen')} />
      <Header white>{t('Stress')}</Header>

      <WhiteContainer>
        <ScrollView style={{alignSelf: 'stretch'}}>
          {allQuestions}
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
  }
});


export default memo(StressOTScreen);
