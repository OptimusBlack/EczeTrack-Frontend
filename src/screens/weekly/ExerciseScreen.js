import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-community/picker';

import {theme} from "../../core/theme";



const ExerciseScreen = ({ navigation }) => {
  return (
    <GreenBackground notAvoidingKeyboard={true}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Header white>Weekly Exercise</Header>

      <WhiteContainer>
        <Text style={styles.foodDiaryHeader}>Food Diary</Text>

      </WhiteContainer>

      <Button mode="contained">Confirm</Button>


    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  header:{
    fontSize: 15,
    color: 'white',
    marginBottom: 30
  },
  container:{
    height: '70%',
    borderRadius: 10,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    minHeight: 300
  },
  textInput: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 15,
    width: '70%',
    alignSelf: 'center',

  },
  foodContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  isActive: {
    backgroundColor: theme.colors.surface
  },
  foodDiaryHeader:{
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20
  },
  foodLabel:{
    color: '#555',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 12
  },
  scrollView: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,

  },
  inputContainerRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginVertical: 10
  },
  inputContainerCol:{
    width: '48%',
  },
  inputContainer:{
    borderWidth: 3,
    borderColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput2: {
    width: '100%',
    color: theme.colors.primary,
    fontSize: 25,
    textAlign: 'center'
  },
  inputLabel:{
    color: theme.colors.primary,
    fontSize: 10,
    marginTop: 5
  }
});


export default memo(ExerciseScreen);
