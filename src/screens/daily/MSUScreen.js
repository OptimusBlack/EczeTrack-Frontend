import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/msuQuestions';

import {record} from '../../ApiManager';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';

import { theme } from "../../core/theme";

const MSUScreen = ({ navigation }) => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState(0);
  const [error, setError] = useState(-1);

  const values = [q1, q2, q3, q4];
  const setters = [setQ1, setQ2, setQ3, setQ4];
  const refs = [0,0,0,0];

  const onComplete = navigation.getParam('onComplete', ()=>{});
  const validate = async () => {
    for (let i=0; i<values.length; i++){
      console.log(values[i])
      if (i%2 === 0){
        if (values[i] === ''){
          setError(i);
          return
        }
      } else {
        if (isNaN(values[i])){
          setError(i);
          return;
        }
      }
    }

    const vals = {steroid: q1, steroidUse: q2, moisturizer: q3, moisturizerUse: q4};
    const res = await record(vals, 'msu');
    onComplete('msu');
    navigation.navigate('TabNavigator', {recordAdded: res.recordAdded});
  };

  const allQuestions = questions.map( (q, i) => (
    <QuestionContainer questionNumber={i+1} key={i}>
      <QuestionText>{q.question}</QuestionText>
      <View style={styles.answerContainer}>
        <TextInput
          style={styles.inputBox}
          keyboardType = {q.isNumber ? 'numeric' : 'default'}
          value={values[i].toString()}
          returnKeyType={Platform.OS === 'ios' ? 'done' : i< questions.length - 1 ? 'next' : 'submit'}
          onChangeText={val => setters[i](val)}
          ref={(input) => { refs[i] = input }}
          blurOnSubmit={false}
        />
        {error === i && <Text style={styles.error}>Enter a valid value</Text>}
      </View>
    </QuestionContainer>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>Moisturizer & Stedroid Usage</Header>

      <WhiteContainer>
        <ScrollView style={{alignSelf: 'stretch'}}>
          {allQuestions}
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate} >Confirm</Button>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  answerContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  inputBox:{
    width: '50%',
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


export default memo(MSUScreen);
