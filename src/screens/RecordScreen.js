import React, { memo, useState } from 'react';
import { PlainBackground } from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';


import {theme} from "../core/theme";

const FOOD_LIST = [
  "apple",
  "pear",
  "lemon",
  "pineapple",
  "starfruit",
  "watermelon",
  "peach",
  "banana",
];

const RecordScreen = ({ navigation }) => {

  const [query, setQuery] = useState('');
  const [foodList, setFoodList] = useState(FOOD_LIST);
  const [quantity, setQuantity] = useState(0);
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const _onChangeText = text => {
    setQuery(text);
    const newList = FOOD_LIST.filter(food => food.includes(text.toLowerCase()));
    setFoodList(newList);
  };

  const FoodList = foodList.map( food => (
    <View style={styles.foodContainer}>
      <MaterialCommunityIcons name="food-apple" size={24} color="#aaa" />
      <Text style={styles.foodLabel}>{food.toUpperCase()}</Text>
    </View>
  ));

  const onTimeChange = (event, selectedTime) => {
    console.log("Time selected:", selectedTime)
    selectedTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(selectedTime);
  };



  return (
    <PlainBackground>
      <Header>Daily Diet Record</Header>

      <View style={styles.container}>
        <Text style={styles.foodDiaryHeader}>Food Diary</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={_onChangeText}
          value={query}
          placeholder={'SEARCH'}
        />

        <ScrollView style={styles.scrollView}>
          {FoodList}
        </ScrollView>


        <View style={styles.inputContainerRow}>
          <View style={styles.inputContainerCol}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput2}
                onChangeText={text => setQuantity(parseInt(text.replace(/[^0-9]/g, '')))}
                value={quantity}
                keyboardType={'number-pad'}
                textAlign={'center'}
              />
            </View>
            <Text style={styles.inputLabel}>Quantity</Text>
          </View>

          <TouchableOpacity style={styles.inputContainerCol} onPress={() => setShow(s => !s)}>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput2}>{time.getHours()}:{time.getMinutes()}</Text>
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
              />
            )}
            <Text style={styles.inputLabel}>Time</Text>
          </TouchableOpacity>

        </View>

      </View>

      <Button mode="contained">Confirm</Button>


    </PlainBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    height: '70%',
    borderRadius: 5,
    alignSelf: 'stretch',
    padding: 20
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
    alignItems: 'center'

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
    paddingHorizontal: 20
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


export default memo(RecordScreen);
