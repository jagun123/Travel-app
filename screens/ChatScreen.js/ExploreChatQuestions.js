import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const GuideoChatScreens = (props) => {
  const [activeTab, setActiveTab] = useState('explore');
  const [data, setData] = useState([]);

  // Get the current user phone number from firebase
  
  const currentUserId = firebase.auth().currentUser.uid;

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    getData();
  }, []);

  // Now get the data of the email from firebase
  const getData = async () => {
    const db = firebase.firestore();
    const querySnapshot = await db.collection('messagePriortiy').where('uid', '==', currentUserId).get();
    const questions = querySnapshot.docs.map((doc) => doc.data());
    setData(questions);
  };

  console.log('Data:', data);

  const navigate = useNavigation();
  const scrollViewRef = useRef();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FF8787'; // Red
      case 'Medium':
        return '#FFE071'; // Yellow
      case 'Low':
        return '#7AFFB8'; // Green
      default:
        return '#FFF1D840'; // Default to Yellow
    }
  };

  const currentTime = new Date();

  const convertDuration = (duration) => {
    if (duration && duration.hours !== undefined && duration.minutes !== undefined) {
      const endTime = new Date();
      endTime.setHours(endTime.getHours() + parseInt(duration.hours, 10));
      endTime.setMinutes(endTime.getMinutes() + parseInt(duration.minutes, 10));

      const timeDiff = endTime - currentTime;
      if (timeDiff > 0) {
        const minutesLeft = Math.floor((timeDiff / 1000) / 60);
        const hours = Math.floor(minutesLeft / 60);
        const minutes = minutesLeft % 60;
        return `${hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") : ""} ${
          minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""
        } left`;
      } else {
        return "0 minute left";
      }
    }
    return "0 minute left";
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    if (tab === 'guideo') {
      navigate.navigate('GuideChatSession');
    } else if (tab === 'explore') {
      navigate.navigate('ExploreChatSession');
    }
  };

  const navigateToExploreChatScreen = (question) => {
    navigate.navigate('ExploreChatScreen', { 
      location: question.location,
      category: question.category,
      inputText: question.inputText,
      title: question.title,
      id: question.uid,
      duration: question.duration,
      priority: question.priority,
      budget: question.budget,
      
      });
    }
  return (
    <View style={styles.container}>
      <View style={styles.homescreen}>
        <View style={styles.homescreen1}>
        <TouchableOpacity onPress={() => handleTabPress('guideo')}>
          <Text style={{ color: activeTab === 'guideo' ? 'white' : 'gray', fontWeight: 'bold', fontSize: 22 }}>
            As Guideo
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22 }}> | </Text>
        <TouchableOpacity onPress={() => handleTabPress('explore')}>
          <Text style={{ color: activeTab === 'explore' ? 'white' : 'gray', fontWeight: 'bold', fontSize: 22 }}>
            As Explore
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      <View
        style={{
          backgroundColor: '#191919',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: 20,
          paddingVertical: 20,
        }}>
        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {data.map((question, index) => (
        <View key={index}>
          <View style={styles.priority}>
            <View style={styles.priority1}>
              <Text style={styles.text}>{question.category.title}</Text>
              <Text style={[styles.text1, { backgroundColor: getPriorityColor(question.priority) }]}>
                {question.priority}
              </Text>
            </View>
            <View>
              <Text style={styles.text2}>
                {convertDuration(question.duration)}
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => navigateToExploreChatScreen(question)}
          >
            <View style={styles.questions}>
              <Text style={styles.text3}>{question.title}</Text>
              <AntDesign name="rightcircleo" size={12}   
                
               style={{
                 alignSelf: 'flex-end',
                 backgroundColor: '#3E3E3E',
                  borderRadius: 70,
                  color: '#BCBCBC',
                }}
              />
              <View style={{}}>
                <Text style={styles.text4}>{question.inputText} </Text>
                
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GuideoChatScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
  },
  homescreen: {
    backgroundColor: '#191919',
    height: 130,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  homescreen1: { flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 20,
  marginTop: 90, 
  alignItems: 'center',
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  justifyContent: 'center'
},

  text: {
    color:"#fff",
    fontSize:10,
    fontWeight:"bold",
    textAlign:"center",
    paddingHorizontal:15,
    borderRadius:70,
    backgroundColor:"#3E3E3E",
    lineHeight:14,
    paddingVertical: 1,
    paddingHorizontal: 12,
    padding:5,
  },
  text1: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 12,
    borderRadius: 20,
    lineHeight:14,
    backgroundColor: '#FF8787',
    opacity: 0.8,
  },
  text2: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFF1D840',
  },
  priority: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  priority1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    gap: 10,
  },
  questions: {
    marginHorizontal: 40,
    marginTop: 20,
    borderBottomWidth: 1, // Underline
    borderBottomColor: '#BCBCBC', // Underline color
    paddingBottom: 10, // Adjust padding for underline
  },
  text3: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text4: {
    color: '#BCBCBC',
    fontSize: 10,
    fontWeight: '400',
    marginTop: 1,
    marginBottom: 10,
    marginRight: 20,
    lineHeight:12.1,
  },
});
