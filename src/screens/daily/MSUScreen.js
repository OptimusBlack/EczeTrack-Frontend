import React, { memo, useState } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import QuestionContainer from "../../components/QuestionContainer";
import QuestionText from "../../components/QuestionText";

import questions from '../../data/msuQuestions';
import { steroidNames } from '../../data/steroidNames';

import { record } from '../../ApiManager';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  FlatList,
  Button as bt
} from 'react-native';

import { theme } from "../../core/theme";
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';


const MSUScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState(0);
  const [error, setError] = useState(-1);
  const [list, setList] = useState(steroidNames);
  const [showList, setShowList] = useState(false);

  const values = [q1, q2, q3, q4];
  const setters = [setQ1, setQ2, setQ3, setQ4];
  const refs = [0, 0, 0, 0];

  const onComplete = navigation.getParam('onComplete', () => { });
  const validate = async () => {
    for (let i = 0; i < values.length; i++) {
      if (i % 2 === 0) {
        if (values[i] === '') {
          setError(i);
          return
        }
      } else {
        if (isNaN(values[i])) {
          setError(i);
          return;
        }
      }
    }

    const vals = { steroid: q1, steroidUse: q2, moisturizer: q3, moisturizerUse: q4 };
    const res = await record(vals, 'msu');
    onComplete('msu');
    navigation.navigate('TabNavigator', { recordAdded: res.recordAdded });
  };

  const _listItem = ({ item }) => (
    <TouchableOpacity
      key={item}
      style={styles.listItem}
      onPress={() => setQ1(item)}
    >
      <Text style={styles.listItemText} >{item}</Text>
    </TouchableOpacity>
  );

  const _onChangeText = (text) => {
    setQ1(text);
    setList(steroidNames.filter(name => name.toLowerCase().replace(/\W/g, '').includes(text.toLowerCase().replace(/\W/g, ''))));
  }

  const allQuestions = questions.map((q, i) => (
    <QuestionContainer questionNumber={i + 1} key={i}>
      <QuestionText>{t(q.question)}</QuestionText>
      <View style={styles.answerContainer}>
        {i == 0 && <TextInput
          style={styles.inputBox}
          keyboardType={q.isNumber ? 'numeric' : 'default'}
          value={values[i].toString()}
          returnKeyType={Platform.OS === 'ios' ? 'done' : i < questions.length - 1 ? 'next' : 'submit'}
          onChangeText={_onChangeText}
          onFocus={() => setShowList(true)}
          onEndEditing={() => setShowList(false)}
          ref={(input) => { refs[i] = input }}
          blurOnSubmit={false}
        />}
        {i == 0 && showList && <FlatList
          data={list}
          renderItem={_listItem}
          keyExtractor={item => item.title}
          style={{ maxHeight: 140 }}
          nestedScrollEnabled
        />}
        {i != 0 && <TextInput
          style={styles.inputBox}
          keyboardType={q.isNumber ? 'numeric' : 'default'}
          value={values[i].toString()}
          returnKeyType={Platform.OS === 'ios' ? 'done' : i < questions.length - 1 ? 'next' : 'submit'}
          onChangeText={val => setters[i](val)}
          ref={(input) => { refs[i] = input }}
          blurOnSubmit={false}
        />}
        {error === i && <Text style={styles.error}>{t('Enter a valid value')}</Text>}
      </View>
    </QuestionContainer>
  ));



  return (
    <GreenBackground notAvoidingKeyboard={false}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>{t('Moisturizer & Steroid Usage')}</Header>

      <WhiteContainer>
        <ScrollView style={{ alignSelf: 'stretch' }}>
          {allQuestions}
        </ScrollView>

      </WhiteContainer>

      <Button mode="contained" onPress={validate} >{t('CONFIRM')}</Button>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  answerContainer: {
    // flexDirection: 'row',
    // alignItems: 'flex-end'
  },
  inputBox: {
    width: '50%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5
  },
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  listItemText: {
    fontSize: 16
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    flex: 1,
    textAlign: 'right'
  }
});


export default memo(MSUScreen);
