import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExploreBudgetScreen = ({ navigation , route }) => {
  const [budget, setBudget] = useState('');
   const { uniqueId, inputText, category, location, title  } = route.params;
   console.log(uniqueId);

  const handleAmountEntered = () => {
    if (budget.trim() === '') {
      // Handle empty budget case
      return;
    }
   // Save budget to async storage and navigate to next screen
  
    navigation.navigate('ExplorePriortyScreen', 
    {
      budget: budget,
      uniqueId: uniqueId,
      inputText: inputText,
      category: category,
      location: location,
      title: title
      
    });
  };
  

  

  return (
    <View style={styles.view1}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign style={{ marginTop: 30 }} name="left" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Enter Your Budget</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          placeholder="Enter Your Budget"
          onSubmitEditing={handleAmountEntered}
          keyboardType="numeric"
          value={budget}
          onChangeText={text => setBudget(text)} // Update budget state on change
        />
        <Text style={styles.currency}>₹</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 30,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    height: 50,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginLeft: 20,
  },
  input: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    flex: 1,
  },
  currency: {
    color: '#FFF',
  },
});

export default ExploreBudgetScreen;
