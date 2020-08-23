import React, { memo } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { StyleSheet, View } from 'react-native';
import { factorList } from '../dataItems/factorList.js';
import RecordScreenButton from '../../components/RecordScreenButton';

const DailyScreen = ({ navigation }) => {
  const icons = ['hand-paper', 'pills', 'apple-alt', 'globe'];
  const screenNavigation = ['SymptomScreen', '', 'DietScreen', ''];

  return (
    <GreenBackground>
      <Header white style={styles.header}>
        Your records for {(new Date()).toDateString()}
      </Header>
      <View style={styles.container}>
        {factorList.slice(0, 4).map((e, idx) =>
          <RecordScreenButton
            key={idx}
            ticked
            icon={icons[idx]}
            onPress={() => navigation.navigate(screenNavigation[idx])}
          >
            {e.label}
          </RecordScreenButton>
        )}
      </View>
    </GreenBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch'
  }
});

export default memo(DailyScreen);
