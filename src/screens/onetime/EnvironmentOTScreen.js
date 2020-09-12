import React, { memo, useState } from 'react';

import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";

import {
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { theme } from "../../core/theme";
import { useTranslation } from 'react-i18next';

const EnvironmentOTScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const validate = async () => {
    navigation.navigate('OneTimeScreen', {recordAdded: 'environmentOT'});
  };

  const uri = "https://forms.zohopublic.com/wederm/form/EczeTrackBootcampEnvironmentQuestionnare/formperma/HaM8kxSECZQeIjxsSi2vNG7zlDiGR_NZSTVFDf8gznc";


  return (
    <GreenBackground notAvoidingKeyboard={true}>
      <BackButton goBack={() => navigation.navigate('OneTimeScreen')} />
      <Header white>{t('Environment')}</Header>

      <WhiteContainer>
        <WebView
          originWhitelist={['*']}
          source={{ uri }}
          style={{ }}
        />

      </WhiteContainer>

      <Button mode="contained" onPress={validate}>{t('Confirm')}</Button>

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


export default memo(EnvironmentOTScreen);
