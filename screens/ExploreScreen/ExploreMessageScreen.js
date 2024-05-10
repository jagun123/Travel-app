import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  , TextInput} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Corrected import
import auth from '@react-native-firebase/auth'; // Corrected import

const Message = (props) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');

  const { route } = props;
  const { location, category } = route.params;
  
 
  const currentUser = auth().currentUser;
  const email = currentUser.email;

  const handleContinueClick = async () => {
    try {
      const locationString = `${location.name}, ${location.country}, ${location.formattedAddress}`;
      const id = Math.random().toString(36).substring(7);
      await firestore().collection('messaging').add({
        id: id,
        location: locationString,
        category: category,
        title: title,
        inputText: inputText,
        email: email,
      });
   
    
      // Handle success
      navigation.navigate("ExplorePriortyScreen", { location, category, title, inputText , uniqueId : id , email });
    } catch (error) {
      // Handle error
      console.error('Error uploading data to Firestore: ', error);
    }
  };

  return (
    <View style={styles.view1}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.view8}>
          <AntDesign name="left" size={18} color="#909090" />
        </View>
      </TouchableOpacity>
      <View style={styles.view9}>
        <Text style={styles.text}>
          Describe it as detailed as possible so that {"\n"}
          guidos can answer your doubts and {"\n"}questions easily
        </Text>
      </View>

      {(location && category) && (
        <View style={styles.category}>
          <Text style={{
            color: '#FFD385',
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 18,
            marginTop: 30,
            marginLeft: 20,
            backgroundColor: '#1E1E1E',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
            marginRight: 20,
          }}> {location
            ? `${location.name}, ${location.country} ${location.formattedAddress ? `- ${location.formattedAddress}` : ''}`
            : ''
          }</Text>
          <View>
            <Text style={{
              color: '#FFD385',
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 18,
              marginTop: 30,
              marginLeft: 30,
              backgroundColor: '#1E1E1E',
              borderRadius: 10,
              width: 90,
              padding: 10,
              textAlign: 'center',
            }}>{category.title}</Text>
          </View>
        </View>
      )}

      <View style={styles.view10}>
       
        <TextInput
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: 10,
            maxHeight: 200,
            color: '#FFF', // Set text color to white
          }}
          multiline
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder='Enter Your Title'
          placeholderTextColor="#FFF" // Set the placeholder text color
        />
      </View>

      <View style={styles.view10}>
       
        <TextInput
          style={{
            backgroundColor: '#1E1E1E',
            borderRadius: 10,
            maxHeight: 200,
            color: '#FFF', // Set text color to white
          }}
          multiline
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholderTextColor="#FFF" // Set the placeholder text color
          placeholder='Type your message here'
        />
        <TouchableOpacity
          onPress={handleContinueClick}
        >
          <Feather
            name="arrow-up"
            size={24}
            style={{
              backgroundColor: "#0C8CE9",
              borderRadius: 20,
              color: "#fff",
              marginTop: 10, // Adjusted marginTop
              alignSelf: 'flex-end', // Align to the right
              padding: 5, // Added padding for better visibility
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor: '#000',
  },
  view8: {
    width: 375,
    height: 40,
    marginTop: 50,
    marginLeft: 20,
    flexDirection: 'row',
  },
  category: {
   flexDirection:'column',
    justifyContent:'space-between',
  },
  text1 : {
    color: '#FFD385',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 30,
    marginLeft: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    width : 90,
    height: 40,
    textAlign: 'center',
    marginRight: 20,
  },


  view9: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#787878',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
  },
  view10: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
    padding: 10,
    maxHeight: 200,
  },
});

export default Message;
