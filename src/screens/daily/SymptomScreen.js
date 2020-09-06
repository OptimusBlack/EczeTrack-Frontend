import React, { memo, useState } from 'react';
import { GreenBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import {theme} from "../../core/theme";
import BackButton from "../../components/BackButton";
import WhiteContainer from "../../components/WhiteContainer";
import Checkbox from 'react-native-check-box';

import _bodyParts from "../../data/bodyParts";

import {record} from '../../ApiManager';

import { useTranslation } from 'react-i18next';



let selection = {};

const SymptomScreen = ({ navigation }) => {
  const { t } = useTranslation();


  const [showModal, setShowModal] = useState('');

  const [currentFront, setCurrentFront] = useState(false);
  const [currentBack, setCurrentBack] = useState(false);
  const [currentBilateral, setCurrentBilateral] = useState(false);


  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);
  const [q4, setQ4] = useState(0);
  const [q5, setQ5] = useState(0);
  const [q6, setQ6] = useState(0);

  const [showPicker, setShowPicker] = useState(-1);

  const dropdownOptions = [
    {value: 0, label: '0'},
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
  ];

  const questions = [
    {
      label: "Itching",
      value: q1,
      setter: setQ1
    },
    {
      label: "Bleeding",
      value: q2,
      setter: setQ2
    },
    {
      label: "Oozing",
      value: q3,
      setter: setQ3
    },
    {
      label: "Cracked",
      value: q4,
      setter: setQ4
    },
    {
      label: "Flaking",
      value: q5,
      setter: setQ5
    },
    {
      label: "Rough/Dry",
      value: q6,
      setter: setQ6
    },
  ];


  // const [selection, setSelection] = useState({});

  const options = Object.keys(_bodyParts).map( (part, idx) => {
    const isSelected = Object.keys(selection).includes(part);
    return (
    <TouchableOpacity
      onPress={()=>{_onBodyPartPress(part)}}
      style={[styles.bodyBtn, isSelected && styles.isSelected]}
      key={idx}
    >
      <Text>{t(part)}</Text>
    </TouchableOpacity>
  )
  });

  const _onBodyPartPress = part => {
    const isModalSelected = Object.keys(selection).includes(part);
    if(isModalSelected){
      setQ1(selection[part]['q1']);
      setQ2(selection[part]['q2']);
      setQ3(selection[part]['q3']);
      setQ4(selection[part]['q4']);
      setQ5(selection[part]['q5']);
      setQ6(selection[part]['q6']);
      setCurrentFront(_bodyParts[part]['front'] ? selection[part]['front'] : false);
      setCurrentBack(_bodyParts[part]['back'] ? selection[part]['back'] : false);
      setCurrentBilateral(_bodyParts[part]['bilateral'] ? selection[part]['bilateral'] : false);
    }

    setShowModal(part)
  };

  const AllQuestions = questions.map((q, i) => (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}} key={i}>
      <Text style={{flex: 1}}>{t(q.label)}:</Text>
      <View style={{flex:1, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.3)'}}>

        {Platform.OS === 'ios' &&
        <TouchableOpacity onPress={() => setShowPicker(showPicker === i ? -1 : i)}>
          <Text style={{textAlign: 'center', fontSize: 16}}>{q.value}</Text>
        </TouchableOpacity>}

        {(Platform.OS === 'android' || showPicker === i) &&
        <Picker
          selectedValue={q.value}
          onValueChange={(itemValue) => {q.setter(itemValue); setShowPicker(-1)}}
          returnKeyType={'done'}
        >
          <Picker.Item label={t("Clear or Almost Clear")} value={0} />
          <Picker.Item label={t("Mild")} value={1} />
          <Picker.Item label={t("Moderate")} value={2} />
          <Picker.Item label={t("Severe")} value={3} />
          <Picker.Item label={t("Extremely Severe")} value={4} />
        </Picker>}
      </View>
    </View>
  ));

  const onAdd = ()=>{
    selection[showModal] = {q1, q2, q3, q4, q5, q6};

    if (_bodyParts[showModal].front)
      selection[showModal].front = currentFront;
    if (_bodyParts[showModal].back)
      selection[showModal].back = currentBack;
    if (_bodyParts[showModal].bilateral)
      selection[showModal].bilateral = currentBilateral;

    if(showModal === t("Buttock"))
      selection[showModal].back = true;
    if(showModal === t("External Genitalia"))
      selection[showModal].front = true;

    hideModal();
  };
  const hideModal = ()=>{
    setQ1(0);
    setQ2(0);
    setQ3(0);
    setQ4(0);
    setQ5(0);
    setQ6(0);
    setCurrentFront(false);
    setCurrentBack(false);
    setCurrentBilateral(false);
    setShowModal('');
    setShowPicker(-1);
  };
  const removeCurrentModal = ()=>{
    delete selection[showModal];
    hideModal();
  };

  const onComplete = navigation.getParam('onComplete', ()=>{});

  const _onConfirm = async ()=>{
    const res = await record(selection, 'symptom');
    if(res && res.success){
      onComplete('symptom');
      selection = {};
    }
    navigation.navigate('DailyScreen');
  };

  const isCurrentModalSelected = Object.keys(selection).includes(showModal);

  return (
    <GreenBackground notAvoidingKeyboard={true} containerStyle={styles.bgContainer}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Text style={styles.header}>{t('Daily Dermatology')}</Text>

      <WhiteContainer style={{padding: 0, alignItems: 'center'}}>
        <View style={styles.header2Container}>
          <Text style={styles.header2}>{t('Skin')}</Text>
        </View>

        <Image
          resizeMode={'contain'}
          source={require('../../assets/body_image.png')}
          style={styles.img}
        />

        <View style={styles.verticalLine}/>
        <Header style={styles.subheading}>{t('Select a body part')}</Header>
        <View style={styles.verticalLine}/>
        <ScrollView style={{alignSelf: 'stretch', flex: 1}} contentContainerStyle={styles.scrollContainer}>
          {options}
        </ScrollView>


      </WhiteContainer>

      <View style={styles.row}>
        <Button
          mode="text"
          color={'white'}
          style={styles.btn}
          onPress={() => navigation.navigate('DailyScreen')}
        >{t('CANCEL')}</Button>
        <Button mode="contained" style={styles.btn} onPress={_onConfirm}>{t('CONFIRM')}</Button>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal.length > 0}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t(showModal)}</Text>

            {_bodyParts[showModal].front && _bodyParts[showModal].back && <Checkbox
              isChecked={currentFront}
              onClick={() => setCurrentFront(!currentFront)}
              checkBoxColor={theme.colors.primary}
              rightTextView={<Text>{' '+ t('Front')}</Text>}
              isIndeterminate={false}
            />}
            {_bodyParts[showModal].front && _bodyParts[showModal].back && <Checkbox
              isChecked={currentBack}
              onClick={() => setCurrentBack(!currentBack)}
              checkBoxColor={theme.colors.primary}
              rightTextView={<Text>{' '+t('Back')}</Text>}
              isIndeterminate={false}
            />}
            {_bodyParts[showModal].bilateral && <Checkbox
              isChecked={currentBilateral}
              onClick={() => setCurrentBilateral(!currentBilateral)}
              checkBoxColor={theme.colors.primary}
              rightTextView={<Text>{' '+t('Bilateral')}</Text>}
              isIndeterminate={false}
            />}

            {AllQuestions}

            <View style={[styles.row, {marginTop: 20}]}>
              <Button
                mode="text"
                color={'black'}
                style={{flex:1}}
                onPress={isCurrentModalSelected ? removeCurrentModal: hideModal }
              >
                {isCurrentModalSelected ? t('REMOVE') : t('CANCEL')}
              </Button>
              <Button
                mode="contained"
                style={{flex:1}}
                onPress={onAdd}
              >
                {t('ADD')}
              </Button>
            </View>
          </View>
        </View>
      </Modal>

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
    alignItems: 'center',
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
    maxHeight: '50%',
    marginVertical: 10,
    flex: 3
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },

  scrollContainer:{
    alignItems: 'center',
  },
  subheading:{
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  bodyBtn:{
    paddingVertical: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '85%'
  },
  verticalLine:{
    borderTopColor: theme.colors.primary,
    borderTopWidth: 1,
    width: '90%'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'stretch'
  },
  isSelected: {
    backgroundColor: theme.colors.primary
  },
  textInput:{
    borderBottomWidth: 1
  },

});


export default memo(SymptomScreen);
