import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExploreDurationScreen = ({ navigation , route }) => {

    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
      
    const { uniqueId, inputText, category, location, title  } = route.params;
    console.log(uniqueId);
    

    const handleAmountEntered = () => {
        if (hours.trim() === '' && minutes.trim() === '') {
            // Handle empty budget case
            return;
        }
        // Save budget to async storage and navigate to next screen
        
        navigation.navigate('ExplorePriortyScreen', {
            duration: { hours, minutes },
            uniqueId: uniqueId,
            inputText: inputText,
            category: category,
            location: location,
            title: title
            
        });

    }

    
  return (
    <View style={styles.view1}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign style={{ marginTop: 30 }} name="left" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Select Duration </Text>
       <Text style={{
        color: '#818181',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 30,
        marginHorizontal: 30,
       }}>
        By setting up timings , you determine the urgency of the question you have asked. This duration informs the Guidos to prioritize and answer your question according to the priority level.


       </Text>
       <View style={styles.inputContainer}>
        <View style={{
            flexDirection: 'column',
        }}>
        <TextInput  style={styles.input} placeholderTextColor="#fff"  keyboardType="numeric" onSubmitEditing={handleAmountEntered}
        value={hours}
        onChangeText={
            text => {
                setHours(text);
                
            }
        }
         />
        <Text style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign: 'center',
            
        }}>Hours</Text>
        </View>
       <View>
       <TextInput style={styles.input} placeholderTextColor="#fff"  keyboardType="numeric" onSubmitEditing={handleAmountEntered} 
        value={minutes}
        onChangeText={
            text => {
                setMinutes(text);
                
            }
        }
       />
         <Text style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 10,
                textAlign: 'center',
          }}>Minutes</Text>
       </View>
           
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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30,
    borderWidth: 1,
   justifyContent:'center',
   gap: 20,
 
   
  },
  input: {
     width: 70,
     height: 60,
     color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#1E1E1E',
        textAlign: 'center',
          borderRadius: 10,
  },
  currency: {
    color: '#FFF',
  },
});

export default ExploreDurationScreen;
