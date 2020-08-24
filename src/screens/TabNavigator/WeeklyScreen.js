import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import { factorList } from '../dataItems/factorList.js';
import RecordScreenButton from '../../components/RecordScreenButton';


const SettingScreen = ({ navigation }) => {
  const icons = ['running', 'window-minimize', 'bed'];
  const screenNavigation = ['ExerciseScreen', 'StressScreen', 'SleepScreen'];

  return (
    <GreenBackground>
      <Header white style={styles.header}>
        Your records for the week
      </Header>
      <View style={styles.container}>
        {factorList.slice(4, 7).map((e, idx) =>
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
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    maxHeight: 500
  }
});

export default memo(SettingScreen);
