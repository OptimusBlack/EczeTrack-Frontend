import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/symptomF2Questions';

import {record} from '../../ApiManager';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';


import {theme} from "../../core/theme";



const SymptomF2Screen = ({ navigation }) => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [error, setError] = useState(-1);

  const values = [q1, q2, q3, q4, q5, q6, q7];
  const setters = [setQ1, setQ2, setQ3, setQ4, setQ5, setQ6, setQ7];
  const refs = [0,0,0,0,0,0,0];

  const onComplete = navigation.getParam('onComplete', ()=>{});

  const validate = async ()=>{
    for(let i=0; i<values.length; i++){
      if(isNaN(parseInt(values[i]))){
        setError(i);
        return;
      }
    }
    const vals = {0: q1, 1: q2, 2: q3, 3: q4, 4: q5, 5: q6, 6:q7};
    const res = await record(vals, 'symptomF2'); //TODO Backend
    onComplete('symptomF2');
    navigation.navigate('TabNavigator', {recordAdded: res.recordAdded})
  };

  const allQuestions = questions.map( (q, i) => (
    <QuestionContainer questionNumber={i+1} key={i}>
      <QuestionText>{q}</QuestionText>
      <View style={styles.answerContainer}>
        <TextInput
          style={styles.inputBox}
          keyboardType = 'numeric'
          value={values[i]}
          returnKeyType={Platform.OS === 'ios' ? 'done' : i< questions.length - 1 ? 'next' : 'submit'}
          onChangeText={val => setters[i](val)}
          ref={(input) => { refs[i] = input }}
          onSubmitEditing={() => { i< questions.length - 1 ? refs[i+1].focus() : validate() }}
          blurOnSubmit={false}
        />
        <Text>days</Text>
        {error === i && <Text style={styles.error}>Enter a valid value</Text>}
      </View>
    </QuestionContainer>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>Weekly Exercise</Header>

      <WhiteContainer>
        <ScrollView style={{alignSelf: 'stretch'}}>
          {allQuestions}
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate}>Confirm</Button>


    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  answerContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end'
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


export default memo(SymptomF2Screen);
