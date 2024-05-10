import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import logo from '../../images/logo.png';
import { SelectList } from 'react-native-dropdown-select-list';
import Rocket from '../../images/Rocket';
import firestore, { firebase } from '@react-native-firebase/firestore';


const window = Dimensions.get('window');
const PriorityScreen = ({ route }) => {
  
  const { uniqueId, inputText, category, location, title  } = route.params;
  
  const { budget } = route.params || {};
  const { duration } = route.params || {};
  const [budgetvalue, setBudgetvalue] = useState(budget); // Store budget locally
  const [durationvalue, setDurationvalue] = useState(duration); // Store duration locally  
  console.log(uniqueId);
 console.log(budget);
 console.log(duration);
  const navigation = useNavigation();

  const [priority, setPriority] = useState('');

   useEffect(() => {
    if (budget) {
      setBudgetvalue(budget);
    }
  }, [budget]);


  useEffect(() => {
    if (duration) {
      setDurationvalue(duration);
    }
  }, [duration]);


  
   useEffect(() => {
    if (durationvalue) {
      if (durationvalue.hours < 2) {
        setPriority('High');
      } else if (durationvalue.hours < 5) {
        setPriority('Medium');
      } else {
        setPriority('Low');
      }
    }
  }, [durationvalue]);

 


  const handleContinueClick = async () => {
    // store to data firebase in that uid
    const currentUserId = firebase.auth().currentUser.uid;
    const locationString = `${location.name}, ${location.country}, ${location.formattedAddress}`;
    await firestore().collection('messagePriortiy').add({
      category,
      title,
     inputText : inputText,
      location: locationString,
      priority,
      budget: budgetvalue,
      duration: durationvalue,
      uid: currentUserId,
      uniqueId,
      createdAt: new Date(),
    });
    navigation.navigate('ExploreShottingScreen', 
     // pass duraation value to next screen
      {
        uniqueId, inputText, category, location, title, budget: budgetvalue, duration: durationvalue, priority
      }
      
    );
  };

  return (
    <View style={styles.view1}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <AntDesign style={{ marginTop: 30 }} name="left" size={16} color="white" />
          </TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </View>
      </TouchableOpacity>
      <View style={styles.view9}>
        <Text style={styles.text}>Few steps to go</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Rocket />
        </View>
      </View>
      <View style={styles.view10}>
        <View style={styles.view11}>
          <Text style={styles.text1}>
            Budget <Text style={{ color: '#33333C', fontSize: 14 }}>(optional)</Text>
          </Text>
        </View>
        
        <View style={styles.view12}>
          <TouchableOpacity onPress={() => navigation.navigate('ExploreBudget',
           {
            uniqueId, inputText, category, location, title 
           }
          )}>
            <Text style={[styles.text2, budgetvalue ? styles.yellow : null]}>
              {budgetvalue ? ` ${budgetvalue} ₹ ` : 'Enter your budget'}
            </Text>
           
          </TouchableOpacity>
        </View>
        <View style={styles.view11}>
          <Text style={styles.text1}>Duration</Text>
          <MaterialIcons name="error-outline" size={16} color="white" style={{ marginTop: 3 }} />
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 29 }}>
          <MaterialIcons style={{ marginTop: 20 }} name="access-time" size={18} color="gray" />
          <TouchableOpacity onPress={() => navigation.navigate('ExploreDuration' ,
          { 
            uniqueId, inputText, category, location, title 
          }
          )}>
            <Text style={[styles.duration, durationvalue ? styles.yellow : null]}>
              {durationvalue ? `${durationvalue.hours}h ${durationvalue.minutes}m` : 'HH:MM'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view11}>
          <Text style={styles.text1}>Set Priority</Text>
          <MaterialIcons name="error-outline" size={16} color="white" style={{ marginTop: 3 }} />
        </View>
        <View style={styles.view13}>
          <Text
            style={[
              styles.text3,
              {
                backgroundColor: priority === 'High' ? '#FF8787' : '#33333C',
                opacity: priority === 'High' ? 0.7 : 1.5,
              },
            ]}>
            High
          </Text>
          <Text
            style={[
              styles.text4,
              {
                backgroundColor: priority === 'Medium' ? '#FFE071' : '#33333C',
                opacity: priority === 'Medium' ? 0.7 : 1.5,
              },
            ]}>
            Medium
          </Text>
          <Text
            style={[
              styles.text5,
              {
                backgroundColor: priority === 'Low' ? '#0BF3BC' : '#33333C',
                opacity: priority === 'Low' ? 0.7 : 1.5,
              },
            ]}>
            Low
          </Text>
        </View>
        <View style={styles.view15}>
          <TouchableOpacity onPress={handleContinueClick}>
            <View style={styles.view14}>
              <Text style={styles.text6}>Shoot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PriorityScreen;


const styles = StyleSheet.create({
    view1: {
        flex: 1,
        backgroundColor: '#000',
    },
    view8: {
        marginTop: 50,
        marginLeft: 20,
    },
    view9: {
        marginTop: 10,
        marginLeft: 10,

    },
    yellow:{
        color:"#FFF",
        fontSize:14,
        fontWeight:"bold",
        borderColor:"#FFD385",
        borderWidth:1,
        borderRadius:24,
    },
    header:{
      flexDirection:"row",
      marginHorizontal:20,
      marginTop:30,
      gap:110,   
  },
    logo: {
      width: 100,
      height: 50,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
       padding: 10,
       textAlign: 'center',
    },
    duration:{
      color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 18,
               marginLeft: 10,
               marginTop:10,
                backgroundColor: '#33333C',
                borderRadius: 24,
                width: 144,
                height: 40,
               textAlign: 'center',
                padding: 10,
    },
    view10: {
        backgroundColor: '#1E1E1E',
      marginTop: 20,
      width: window.width,
      height: window.height,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 10,

    },
    view11:{
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
         marginHorizontal: 30,
    },
    text1: {
        color: '#878787',
        fontSize: 16,
        fontWeight: 'bold',
    },
    view12:{
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor:"#33333C",
        borderRadius: 24,
        width: 144,
        height: 40,
    },
    text2:{
        color:'#fff',
        fontSize: 12,
        fontWeight: '#600',
        lineHeight: 20,
        textAlign: 'center',
        padding: 10,
    },
    view13:{
        flexDirection: 'row',
        gap: 30,
        marginLeft: 30,
        marginTop: 20,
    },
    text3:{
        backgroundColor:'#FF8787',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
          paddingHorizontal: 20,
          paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.7,
    },
    text4:{
        backgroundColor:'#FFE071',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
         paddingHorizontal: 20,
         paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.7,
    },
    text5:{
        backgroundColor:'#0BF3BC',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
         paddingHorizontal: 20,
         paddingVertical: 10,
        borderRadius: 10,
        opacity: 0.7,
    },
     image: {
        width: 96.42,
        height: 158.77,
        top: 30,
        left: 120, 

    },

    view15:{
        marginTop: 20,
alignItems: 'center',
    },



    view14:{
     
      fontWeight: 'bold',
     
      
      backgroundColor: '#0C8CE9',
      borderRadius: 20,   
      width: 135,
      height: 40,
      padding: 10,
      
    },

    text6:{
        color:'#fff',
        fontSize: 15,
        fontWeight: '#600',
        lineHeight: 20,
        textAlign: 'center',
    },

})