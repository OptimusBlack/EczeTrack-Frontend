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
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';


import {theme} from "../../core/theme";



const SleepScreen = ({ navigation }) => {
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [q5, setQ5] = useState(0);
  const [q6, setQ6] = useState(0);
  const [error, setError] = useState(-1);

  const values = [q1, q2, q3, q4, q5, q6];
  const setters = [setQ1, setQ2, setQ3, setQ4, setQ5, setQ6];

  const validate = ()=>{
    for(let i=0; i<values.length; i++){
      if(values[i] === 0){
        setError(i);
        return;
      }
    }

  };

  const allQuestions = questions.map( (q, i) => (
    <QuestionContainer questionNumber={i+1} key={i}>
      <QuestionText>{q}</QuestionText>
      <View style={styles.answerContainer}>

        <RadioButton
          value={values[i]}
          checked={ values[i] === 1}
          onPress={() => setters[i](1)}
          label={i === 5 ? 'Bad' : 'Rarely'}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 2}
          onPress={() => setters[i](2)}
          label={i === 5 ? 'Fair' : 'Sometimes'}
          error={error === i}
        />
        <RadioButton
          value={values[i]}
          checked={ values[i] === 3}
          onPress={() => setters[i](3)}
          label={i === 5 ? 'Good' : 'Often'}
          error={error === i}
        />

      </View>
    </QuestionContainer>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>Weekly Sleep</Header>

      <WhiteContainer>
        <ScrollView style={{alignSelf: 'stretch'}}>
          {allQuestions}

          <View style={styles.hintBox}>
            <Text style={styles.hintLabel}>{'* Rarely: \t\tLess than 3 times a month'}</Text>
            <Text style={styles.hintLabel}>{'* Sometimes: \t(<50%) 1-3 times a week'}</Text>
            <Text style={styles.hintLabel}>{'* Rarely: \t\tLess than 3 times a month'}</Text>
          </View>
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate}>Confirm</Button>


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
