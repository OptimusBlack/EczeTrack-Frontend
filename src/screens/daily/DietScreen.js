import React, { memo, useState, useEffect } from 'react';
import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Picker } from '@react-native-community/picker';
import Counter from "react-native-counters";

import { theme } from "../../core/theme";
import WhiteContainer from "../../components/WhiteContainer";
import BackButton from "../../components/BackButton";

import { getFoodList, record, getDayDAS } from "../../ApiManager";
import { useTranslation } from 'react-i18next';

import { Button as RNPButton, Snackbar } from 'react-native-paper';

let FOOD_LIST = [];

const getItems = async () => {
  FOOD_LIST = await getFoodList();
};

getItems();

const DietScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [query, setQuery] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [foodItem, setFoodItem] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [show, setShow] = useState(false);
  const [isSelected, setIsSelected] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const [colorQuantity, setColorQuantity] = useState(0);
  const [snackQuantity, setSnackQuantity] = useState(0);
  const [dietToday, setDietToday] = useState([]);

  const onComplete = navigation.getParam('onComplete', () => { });

  const _onChangeText = text => {
    setQuery(text);
    if (text.length === 0) {
      setFoodList([]);
    }
    else {
      const newList = FOOD_LIST.filter(food => food.toLowerCase().replace(/\W/g, '').includes(text.toLowerCase().replace(/\W/g, '')));
      setFoodList(newList.splice(0, 100));
    }

  };

  const _selectFoodItem = (foodItem, index) => {
    setIsSelected(index);
    setFoodItem(foodItem);
  };

  const validate = async () => {
    let vals;
    if (colorQuantity > 0)
      vals = { 'mealType': 'Fruits', 'foodItem': 'colors', 'foodItemAmt': colorQuantity, 'foodItemAmtUnit': 'g' };
    else if (snackQuantity > 0)
      vals = { 'mealType': 'Snack', 'foodItem': 'snack', 'foodItemAmt': snackQuantity, 'foodItemAmtUnit': 'g' };
    else {
      vals = { 'mealType': mealType, 'foodItem': foodItem, 'foodItemAmt': quantity, 'foodItemAmtUnit': 'g' };
      
      if (vals.foodItem === '') return setSnackBarVisible(true);
    }

    const res = await record(vals, 'das');
    onComplete('das');
    navigation.navigate('TabNavigator', { recordAdded: res.recordAdded });
  };

  const _renderFoodItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[styles.foodContainer, isSelected === index && styles.isActive]}
        onPress={() => _selectFoodItem(item, index)}
        key={index}
      >
        <MaterialCommunityIcons name="food-apple" size={24} color="#aaa" />
        <Text style={styles.foodLabel}>{item.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  };

  const _onChangeQuantity = text => {
    let qty = text.replace(/\D/g, '');
    if (qty === '')
      qty = 0;
    else
      qty = parseInt(qty);
    setQuantity(qty);
  };

  const onChangeMealType = (itemValue) => {
    // setShow(Platform.OS === 'ios');
    setMealType(itemValue);
  };

  const dietForTheDay = dietToday.map((item, idx) => (
    <View>
      {item.mealType != "Snack" && item.mealType != "Fruits" && <Text
        key={idx}
      >
        {item.foodItem}, {item.mealType}, {item.foodItemAmt}g
      </Text>}

      {item.mealType == "Snack" && <Text
        key={idx}
        style={{fontFamily: 'Avenir-Bold', fontSize: 16}}
      >
        {item.mealType}s: {item.foodItemAmt}
      </Text>}

      {item.mealType == "Fruits" && <Text
        key={idx}
        style={{fontFamily: 'Avenir-Bold', fontSize: 16}}
      >
        Colors: {item.foodItemAmt}
      </Text>}
      {}
    </View>
  ));

  const _showDietForTheDay = async () => {
    const response = await getDayDAS();
    if (response.das) {
      console.log(response.das);
      setDietToday(response.das);
    }
    setModalVisible(true)
  }

  return (
    <GreenBackground notAvoidingKeyboard={true}>
      <BackButton goBack={() => navigation.navigate('TabNavigator')} />
      <Text style={styles.header}>{t('Daily Diet Record')}</Text>

      <RNPButton
        onPress={_showDietForTheDay}
        style={{ alignSelf: 'stretch', backgroundColor: 'white', marginBottom: 5 }}
      >
        {t('Show diet for today')}
      </RNPButton>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.header, {color: 'black', fontFamily: 'Avenir-Bold', fontSize: 20}]} >{t('Food items for the day')}</Text>
            {dietForTheDay}
            <Button
              onPress={() => setModalVisible(false)}
            >{t('close')}</Button>
          </View>
        </View>
      </Modal>

      <WhiteContainer style={{ height: '55%' }} pointerEvents={colorQuantity > 0 || snackQuantity > 0 ? "none" : "auto"} >
        <TextInput
          style={styles.textInput}
          onChangeText={_onChangeText}
          value={query}
          placeholder={t('SEARCH')}
        />

        <FlatList
          style={styles.flatList}
          data={query.length > 0 ? foodList : FOOD_LIST}
          renderItem={_renderFoodItem}
          keyExtractor={(item, index) => index.toString()}
        />


        <View style={styles.inputContainerRow}>
          <View style={styles.inputContainerCol}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput2}
                onChangeText={_onChangeQuantity}
                value={quantity.toString()}
                keyboardType={'number-pad'}
                textAlign={'center'}
                returnKeyType={'done'}

              />
            </View>
            <Text style={styles.inputLabel}>{t('Quantity')} in g/ml</Text>
          </View>

          <TouchableOpacity style={styles.inputContainerCol} onPress={() => setShow(s => !s)}>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput2}>{t(mealType)}</Text>
            </View>
            {show &&
              <Picker
                selectedValue={mealType}
                onValueChange={onChangeMealType}
                itemStyle={{ color: theme.colors.secondary }}
                returnKeyType={'done'}
              >
                <Picker.Item label={t("Breakfast")} value="Breakfast" />
                <Picker.Item label={t("Lunch")} value="Lunch" />
                <Picker.Item label={t("Dinner")} value="Dinner" />
              </Picker>
            }
            {!show && <Text style={styles.inputLabel}>{t("Meal Type")}</Text>}
          </TouchableOpacity>

        </View>

        {(colorQuantity > 0 || snackQuantity > 0) && <Text style={{ color: theme.colors.error, fontSize: 12 }}>{t('Set Color and Snack inputs to 0 to enable food input.')}</Text>}
      </WhiteContainer>

      <View style={[styles.colorRow, snackQuantity > 0 && styles.grayOut]} pointerEvents={snackQuantity > 0 ? "none" : "auto"}>
        <Text style={styles.colorLabel}>{t('Colorful Vegetables and Fruits')}</Text>
        <Counter
          start={0}
          max={3}
          onChange={number => {
            setColorQuantity(number);
            if (number > 0)
              setIsSelected(-1);
          }}
          buttonStyle={{ borderColor: theme.colors.primary }}
          buttonTextStyle={{ color: theme.colors.primary }}
          countTextStyle={{ color: theme.colors.primary }}
        />
      </View>

      <View style={[styles.colorRow, colorQuantity > 0 && styles.grayOut]} pointerEvents={colorQuantity > 0 ? "none" : "auto"}>
        <Text style={styles.colorLabel}>{t('Snacks')}</Text>
        <Counter
          start={0}
          max={3}
          onChange={number => {
            setSnackQuantity(number);
            if (number > 0)
              setIsSelected(-1);
          }}
          buttonStyle={{ borderColor: theme.colors.primary }}
          buttonTextStyle={{ color: theme.colors.primary }}
          countTextStyle={{ color: theme.colors.primary }}
        />
      </View>

      <Button mode="contained" onPress={validate}>{t('Confirm')}</Button>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: t('Dismiss'),
          onPress: () => setSnackBarVisible(false)
        }}
      >
        {t('Please select a food item')}
      </Snackbar>

    </GreenBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 15,
    color: 'white',
    marginBottom: 30
  },
  container: {
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
  foodDiaryHeader: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20
  },
  foodLabel: {
    color: '#555',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 12
  },
  flatList: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  inputContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginVertical: 10
  },
  inputContainerCol: {
    width: '48%',
  },
  inputContainer: {
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
  inputLabel: {
    color: theme.colors.primary,
    fontSize: 10,
    marginTop: 5
  },
  colorRow: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignSelf: 'stretch',
    padding: 10,
    paddingVertical: 5,
    marginVertical: 5
  },
  colorLabel: {
    fontWeight: 'bold',
  },
  grayOut: {
    backgroundColor: 'lightgray'
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
  }
});


export default memo(DietScreen);
