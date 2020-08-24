import React, { memo, useState } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {theme} from "../../core/theme";
import BackButton from "../../components/BackButton";


const SymptomScreen = ({ navigation }) => {
  return (
    <GreenBackground notAvoidingKeyboard={true} containerStyle={styles.bgContainer}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Text style={styles.header}>Daily Dermatology</Text>

      <View style={styles.container}>
        <View style={styles.header2Container}>
          <Text style={styles.header2}>Skin</Text>
        </View>

        <Image
          resizeMode={'center'}
          source={require('../../../assets/body_image.png')}
          style={styles.img}
        />


      </View>

      <View style={styles.row}>
        <Button mode="contained" color={'white'} style={styles.btn}>Cancel</Button>
        <View style={styles.horizontalLine}/>
        <Button mode="contained" style={styles.btn}>Next</Button>
      </View>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  bgContainer:{
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  header:{
    marginTop: 20,
    fontSize: 15,
    color: 'white',
    marginBottom: 30,
  },
  container:{
    height: '70%',
    borderRadius: 10,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    minHeight: 300,
    alignItems: 'center'
  },
  header2:{
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  header2Container:{
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingTop: 20,
    alignSelf: 'stretch'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    marginHorizontal: 20,
  },
  horizontalLine:{
    borderColor: 'white',
    borderWidth: 1,
    alignSelf: 'stretch'
  },
  img: {
    // width: '90%',
    height: '60%',
    // overflow: 'visible'
  }

});


export default memo(SymptomScreen);
