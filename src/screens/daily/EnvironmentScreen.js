import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/envQuestions';
import envItems from '../../data/envItems';

import {record} from '../../ApiManager';

import {
  View,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';

import Checkbox from 'react-native-check-box';

import { theme } from "../../core/theme";

const EnvironmentScreen = ({ navigation }) => {
  const [q1, setQ1] = useState({value: false});
  const [q2, setQ2] = useState({value: false});
  const [q3, setQ3] = useState({value: false});
  const [q4, setQ4] = useState({value: false});
  const [q5, setQ5] = useState({value: false});
  const [q6, setQ6] = useState({value: false});
  const [q7, setQ7] = useState({value: false, other: ''});
  const [q8, setQ8] = useState({value: false});
  const [q9, setQ9] = useState({value: false});
  const [q10, setQ10] = useState({value: false});
  const [q11, setQ11] = useState({value: false});
  const [q12, setQ12] = useState({value: false});
  const [q13, setQ13] = useState({value: false});
  const [q14, setQ14] = useState({value: false});
  const [q15, setQ15] = useState({value: false});
  const [q16, setQ16] = useState({value: false});
  const [q17, setQ17] = useState({value: false});
  const [q18, setQ18] = useState({value: false});
  const [q19, setQ19] = useState({value: false, other: ''});
  const [q20, setQ20] = useState({value: false});
  const [q21, setQ21] = useState({value: false});
  const [q22, setQ22] = useState({value: false});
  const [q23, setQ23] = useState({value: false});
  const [q24, setQ24] = useState({value: false});
  const [q25, setQ25] = useState({value: false});
  const [q26, setQ26] = useState({value: false});
  const [q27, setQ27] = useState({value: false});
  const [q28, setQ28] = useState({value: false, other: ''});
  const [q29, setQ29] = useState({value: false});
  const [q30, setQ30] = useState({value: false, other: ''});

  const values = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30];
  const setters = [setQ1, setQ2, setQ3, setQ4, setQ5, setQ6, setQ7, setQ8, setQ9, setQ10, setQ11, setQ12, setQ13, setQ14, setQ15, setQ16, setQ17, setQ18, setQ19, setQ20, setQ21, setQ22, setQ23, setQ24, setQ25, setQ26, setQ27, setQ28, setQ29, setQ30];
  const specifyValues = new Array(30).fill('');

  const onComplete = navigation.getParam('onComplete', ()=>{});

  const validate = async () => {
    let vals = {};
    envItems.forEach((e, i) => {
      if (e.other){
        vals[e.item] = {value: values[i].value, other: values[i].other};
      } else {
        vals[e.item] = values[i].value;
      }
    });
    
    const res = await record(vals, 'environment');
    onComplete('environment');
    navigation.navigate('TabNavigator', {recordAdded: res.recordAdded});
  };

  const allQuestions = questions.map((category, j) => (
    <View key={j}>
      <Header>{category.category}</Header>

      {
        category.questions.map((q, i) => (
          <QuestionContainer questionNumber={i + 1} key={category.prev + i}>
            <QuestionText>{q.question}</QuestionText>

            <View style={styles.answerContainer}>
              <Checkbox
                isChecked={values[category.prev + i].value}
                onClick={() => {
                  if (q.isSpecify){
                    setters[category.prev + i]( {value: !values[category.prev + i].value, other: ''} );
                  } else {
                    setters[category.prev + i]( {...values[category.prev + i], value: !values[category.prev + i].value} );
                  }
                }}
                checkBoxColor={theme.colors.primary}
              />

              {
                values[category.prev + i].value && q.isSpecify &&
                <TextInput
                  style={styles.inputBox}
                  placeholder='If so, Specify'
                  onChangeText={(value) => setters[category.prev + i]({...values[category.prev + i], other: value})}
                />
              }
            </View>

          </QuestionContainer>
        ))
      }

    </View>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>Environment</Header>

      <WhiteContainer>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {allQuestions}
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate}>Confirm</Button>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  inputBox: {
    width: '100%',
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


export default memo(EnvironmentScreen);
