
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert, // Import Alert for displaying error messages
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore';
import { SelectList } from "react-native-dropdown-select-list";
 import auth from '@react-native-firebase/auth' 

function MyComponent(props) {
  const { route } = props;
  
  const { userInfo } = route.params;
  const user = auth().currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [selected, setSelected] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');

  const [details, setDetails] = useState([]);

  const [nameError, setNameError] = useState("");

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");

  const navigation = useNavigation();
  const data = [
    { key: "Male", value: "Male" },
    { key: "Female", value: "Female" },
    { key: "Other", value: "Other" },
  ];
  
// get the users data from firestore

  useEffect(() => {
    const fetchData = async () => {
      const userProfileSnapshot = await firestore().collection('users').doc(user.uid).get();
      const userProfileData = userProfileSnapshot.data();
      setDetails(userProfileData);
    };
    fetchData();
  }, []);





console.log('details', details)

  // add the name email phone number and photo url same as the user id in firestore
  
  const handleContinueClick = async () => {

    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      return;
    }
  
    if (!selected) {
      setGenderError("Gender is required");
      return;
    }

    setGender(selected);
     try {

       const data = await firestore().collection('users').doc(
         user.uid
       ).set({
        name : name,
        // email : details.email,
        phoneNumber : phoneNumber,
        // photoURL : details.photoURL,
        gender : selected
       })
        navigation.navigate('HomeScreen' ,{
          userInfo: userInfo,
        })
      
     } catch (error) { 
        console.log(error)
      
     }
  }
     



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.entypoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> Set Up Profile </Text>
       
      </View>
      <View style={{
        alignItems:'center',
        marginTop:20
      
      }}>
      {/* <Image
          source={{ uri: details.photoURL }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        /> */}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#9B9B9B"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setNameError(""); // Clear error when user starts typing
          }}
          keyboardType="default"
        />
        <Text style={styles.errorText}>{nameError}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#9B9B9B"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            setPhoneNumberError(""); // Clear error when user starts typing
          }}
          keyboardType="phone-pad"
        />
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.subtitle}>Email </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#9B9B9B"
          value={email}
          
          keyboardType="email-address"
          editable={false}
        />
       
      </View>
          <View style={{
            marginTop:20
          }}>
  <Text style={{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
    marginBottom:3

  }}>Gender</Text>
  <SelectList setSelected={setSelected} data={data} 
       // now selected data should store in selected variable
        
          
        dropdownTextStyles={{
          color:'#fff',
          fontSize:16,
          fontWeight:'bold'
          
        }}
        inputStyles={{
            color:'#fff',
            fontSize:16,
            fontWeight:'bold',
            borderColor:'#fff'

        }}
       />
     
        <Text style={styles.errorText}>{genderError}</Text>

</View>

<TouchableOpacity onPress={handleContinueClick} >
      <View style={styles.buttonContainer}>
        
          <Text style={styles.button}>Continue</Text>
        
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default MyComponent;

const styles = StyleSheet.create({
  // make them fit in every screen size and make them responsive
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  entypoContainer: {
    marginTop: 20,
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 3,
  },
  input: {
    color: "#fff",
    borderRadius: 10,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    marginTop: 3,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#2D2D2D",
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: "#0C8CE9",
    borderRadius: 10,
    paddingVertical: 14,
  },
  button: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
   
 subtitleContainer: {

    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },


});