import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GuideoMessageScreen = (props) => {
  const { route } = props;
  const { location, category  ,   
    inputText , title , uid, duration, priority, budget ,id
  } = route.params;
  console.log(location, category , inputText , title , uid, duration, priority, budget ,);
 console.log('Data in FilterScreen:', id);
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

  const navigate = useNavigation();

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
  
  const handleNavigate = () => {
    navigate.navigate('GuideroChatScreen', 
    { location, category , inputText ,category: title ,id:uid, duration, priority, budget });
     
  }

  

  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
        <AntDesign name="left" size={16} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Explore Question </Text>
    </View>
    <View style={styles.questionContainer}>
      <Text style={styles.header1}>Question</Text>
      <Text style={styles.questionText}>{category}</Text>
      <Text style={styles.questionText}>₹ {budget}</Text>
      <Text style={[styles.text1, { backgroundColor: getPriorityColor(priority) }]}>
                {priority}
              </Text>
      <Text style={styles.questionText}>{convertDuration(duration)}</Text>
                </View>
                  <View style={styles.box1}>
                <Text style={styles.boxText1}>{title}</Text>
                  </View>
                
                  <Text style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: 30,
                    marginHorizontal: 30,
                  
                  }}>Description</Text>
                <View style={styles.box}>
                 
                <Text style={styles.boxText}>{inputText}</Text>
                </View>
                <TouchableOpacity 
                onPress={handleNavigate}
                >
                <Text style={styles.answer}>Answer</Text>
                </TouchableOpacity>
                
    </View>
    
  )
}

export default GuideoMessageScreen 

const styles = StyleSheet.create({
    
  container: {
      flex: 1,
      backgroundColor:"#191919"
      },
  header:{
      flexDirection:"row",
      marginHorizontal:20,
      marginTop:70,
      gap:80,
     
  },
  headerText:{
      color:"#fff",
      fontSize:14,
      fontWeight:"bold",
      alignContent:"center",
      marginLeft:30,
  },
  header1:{
      color:"#fff",
      fontSize:14,
      fontWeight:"bold",
      
  },
  questionContainer:{
      flexDirection:"row",
      marginHorizontal:20,
      marginTop:40,
      gap:5,
      marginHorizontal:30,
      fontFamily:'Roboto_400Regular'
  },
  questionText:{
     // make it dynamic for different categories display based on the category change width and height
      color:"#fff",
      fontSize:10,
      fontWeight:"bold",
      textAlign:"center",
      paddingHorizontal:15,
      borderRadius:50,
      backgroundColor:"#3E3E3E",
      lineHeight:14,
      padding:5,
  },
  second:{
      flexDirection:"row",
      gap:20,
  },
  text1 :{
    color:"#fff",
    fontSize:10,
    fontWeight:"bold",
    textAlign:"center",
    paddingHorizontal:15,
    borderRadius:50,
    opacity:0.8,
    lineHeight:14,
    padding:5,
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
  box1:{
      backgroundColor:"#D9D9D91A",
      height:50,
      width:350,
      borderRadius:20,
      marginHorizontal:30,
      marginTop:30,
  },
  boxText1:{
      color:"#fff",
      fontSize:18,
      fontWeight:"bold",
      marginLeft:20,
      marginTop:10,
  },

  box:{
      backgroundColor:"#D9D9D91A",
      height:150,
      width:350,
      borderRadius:20,
      marginHorizontal:30,
      marginTop:30,
  },
  boxText:{
      color:"#fff",
      fontSize:18,
      fontWeight:"bold",
      marginLeft:20,
      marginTop:20,
  },
  answer:{
      backgroundColor:"#0C8CE9",
      color:"#fff",
      fontSize:18,
      fontWeight:"bold",
      textAlign:"center",
      marginTop:30,
      padding:10,
      borderRadius:50,
      marginHorizontal:120,
      width:150,
      height:50,
  }
}
)
