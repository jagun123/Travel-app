import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GuideoQuestionScreen = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const navigation = useNavigation();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FF878740'; // Red
      case 'Medium':
        return '#FFE07240'; // Yellow
      case 'Low':
        return '#0CF3BC40'; // Green
      default:
        return '#3E3E3E'; // Default to Yellow
    }
  };

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

  const navigateToExploreScreen = (question) => {
    navigation.navigate('GuideoMessageScreen', {
      inputText: question.inputText,
      category: question.category.title,
      location: question.location,
      title: question.title,
      uid: question.uid,
      priority: question.priority,
      duration: question.duration,
      id: question.id,
      budget: question.budget,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
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
            onPress={() => navigateToExploreScreen(question)}
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
  );
};

export default GuideoQuestionScreen;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191919',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingVertical: 20,
    
  },
  priority: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    
  },
  priority1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    gap: 10,
  },
  text: {
    color:"#fff",
    fontSize:10,
    fontWeight:'500',
    textAlign:"center",
    paddingHorizontal:15,
    borderRadius:70,
    backgroundColor:"#3E3E3E",
    lineHeight:12.1,
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
    opacity: 0.7,
    paddingVertical: 1,
    paddingHorizontal: 12,
  },
  text2: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 12,
    lineHeight:14,
    borderRadius: 20,
    backgroundColor: '#FFF1D840',
  },
  questions: {
    
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomWidth: 1, // Underline
    borderBottomColor: '#BCBCBC', // Underline color
    // Adjust padding for underline
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    lineHeight:19.36
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
