import React, { memo, useState } from 'react';
import { GreenBackground } from '../../components/Background';
import Button from '../../components/Button';
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
import WhiteContainer from "../../components/WhiteContainer";


const ExerciseScreen = ({ navigation }) => {

  const [query, setQuery] = useState('');
  const [foodList, setFoodList] = useState(FOOD_LIST);
  const [quantity, setQuantity] = useState(0);
  const [mealType, setMealType] = useState('Snack');
  const [show, setShow] = useState(false);
  const [isSelected, setIsSelected] = useState(-1);

  const _onChangeText = text => {
    setQuery(text);
    const newList = FOOD_LIST.filter(food => food.includes(text.toLowerCase()));
    setFoodList(newList);
  };

  const FoodList = foodList.map( (food, idx) => (
    <TouchableOpacity
      style={[styles.foodContainer, isSelected === idx && styles.isActive]}
      onPress={()=> setIsSelected(idx)}
      key={idx}
    >
      <MaterialCommunityIcons name="food-apple" size={24} color="#aaa" />
      <Text style={styles.foodLabel}>{food.toUpperCase()}</Text>
    </TouchableOpacity>
  ));

  const _onChangeQuantity = text => {
    let qty = text.replace(/\D/g, '');
    if(qty === '')
      qty = 0;
    else
      qty = parseInt(qty);
    setQuantity(qty);
  };


  return (
    <GreenBackground notAvoidingKeyboard={true}>
      <Text style={styles.header}>Weekly Exercise</Text>

      <WhiteContainer>
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
                onChangeText={_onChangeQuantity}
                value={quantity.toString()}
                keyboardType={'number-pad'}
                textAlign={'center'}
                returnKeyType={'done'}

              />
            </View>
            <Text style={styles.inputLabel}>Quantity</Text>
          </View>

          <TouchableOpacity style={styles.inputContainerCol} onPress={() => setShow(s => !s)}>
            <View style={styles.inputContainer}>
              <Text style={styles.textInput2}>{mealType}</Text>
            </View>
            {show &&
            <Picker
              selectedValue={mealType}
              onValueChange={(itemValue) => setMealType(itemValue)}
              itemStyle={{color: theme.colors.secondary}}
              returnKeyType={'done'}
            >
              <Picker.Item label="Snack" value="Snack" />
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
            </Picker>
            }
            {!show && <Text style={styles.inputLabel}>Meal Type</Text>}
          </TouchableOpacity>

        </View>

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
