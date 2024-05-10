import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Modal from "react-native-modal";

const ExploreChatScreen = (props) => {
  const { route } = props;
  const { category, inputText, title, duration, priority, budget, id } = route.params;
  console.log(category, inputText, title, duration, priority, budget, id);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatEnded, setChatEnded] = useState(false)
  const [address, setAddress] = useState(null);
  const [showLocationMap, setShowLocationMap] = useState(false); // Track whether to display the location map
  
  const apikey ='https://api.opencagedata.com/geocode/v1/json?q=52.3877830,+9.7334394&key=d8f0385e13154bde8933eb7cc2a066f3&language=en&pretty=1'
  const viewLocation = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
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

 

 
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timeStamp')
      .onSnapshot((snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(newMessages);
      });
    return unsubscribe;
  }, [id]);
  const sendMessage = async () => {
    if (!chatEnded && inputMessage.trim() !== '') {
      await firestore()
        .collection('chats')
        .doc(id)
        .collection('messages')
        .add({
          type: 'explore',
          text: inputMessage,
          timeStamp: new Date().getTime(),
        });

      setInputMessage('');
    }
  };
  const renderMessage = (message) => {
    const isSentByUser = message.type === 'explore' || message.type === 'location';
    const isSentByGuidero = message.type === 'guidero' || message.type === 'location';   
    let senderText = '';
    if (message.sender === 'guidero') {
      senderText = 'Guidero';
    } else if (message.sender === 'explore') {
      senderText = 'Explore';
    }
    return (
      <View key={message.id}>
        <View style={isSentByUser ? styles.sentMessage : styles.receivedMessage}>
        {/* {isSentByGuidero && (
          <View style={styles.guideroCircle}>
            <Text style={styles.guideroInitial}>G</Text>
          </View>
        )} */}
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>{new Date(message.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
          
        </View>
      </View>
    );
  };
    
  const [modalVisible, setModalVisible] = useState(false);

  const endChat = () => {
    setModalVisible(true);
    
  }
  
   
    
  const confirmEndChat = () => {
    setChatEnded(true);
    setModalVisible(false);
    // Update chat status in Firebase
    firestore().collection('chats').doc(id).update({
      chatEnded: true
    });
  };
  return (
    <View style={styles.container}>
       
           <View style={styles.header}>
             <AntDesign name="left" size={16} color="white" style={{
        marginTop: 50,
        marginLeft: 20
      }} />
      <View style={styles.questionContainer}>
      <Text style={styles.header1}>Question</Text>
      
      <Text style={styles.questionText}>{
         category.title
      }</Text>
      
      <Text style={[styles.text1, { backgroundColor: getPriorityColor(priority) }]}>
        {priority}
              </Text>
              <Text style={styles.questionText}>{convertDuration(duration)}</Text>
             
                </View>
      <View style={title}>
            <Text style={
                {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 30,
                }
            }
            >{title}</Text>
         </View>
      <View>
        <Text style={{
                    color: 'gray',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginLeft: 30,
                }}>{inputText}</Text>
            </View>  
     
      </View> 
     
      <View>
           <Text style={{
                    color: '#818181',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 50,
                }}>Help out your peer Exploro and {
                    `\n`
                } earn rewards</Text>

      </View>
       
      <ScrollView style={styles.messagesContainer} 
      contentContainerStyle={{ paddingBottom: 20 }}  >
        {messages.map((message) => renderMessage(message))}
         
      </ScrollView>
      <View style={styles.inputContainer}>
        {!chatEnded && ( // Only render input field if chat has not ended
          <>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={inputMessage}
              placeholderTextColor="#fff"
              theme={{ colors: { text: '#FFF' } }}
              onChangeText={(text) => setInputMessage(text)}
              editable={!chatEnded} 
            />
            <TouchableOpacity onPress={sendMessage} disabled={chatEnded} >
              <Feather name="arrow-up" size={24} color="#0C8CE9" />
            </TouchableOpacity>
            
          </>
        )}
       
      </View>
       <View style={styles.bottomend}>
       {!chatEnded && ( // Only render "End" button if chat has not ended
    <TouchableOpacity onPress={endChat} >
      <Text style={styles.Quit}>End</Text>
    </TouchableOpacity>
  )}
         {
          <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onBackdropPress={() => setModalVisible(false)}
          style={{ margin: 0 }}
          backdropOpacity={0.5}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#191919', padding: 20, borderRadius: 10, width: 300, height: 150 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' , color:'#fff' }}>Are you sure you want to end the chat?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#191919',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0C8CE9',
    marginLeft: 20,
    marginTop: 10,
    width: 100,
    height: 40,
    paddingTop: 8,
                 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmEndChat}>
                  <Text style={{ color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FF5050',
    opacity: 0.8,
    borderRadius: 50,
    width: 100,
    marginTop: 10,
    height: 40,
    paddingTop: 8,
    marginRight: 20, }}>End</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
         }
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    gap: 10,
    
  },
  guideroCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3385FF44', // Change this to the desired color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8, // Adjust this to your preference
  },
  guideroInitial: {
    color: 'white',
    fontSize: 18,
  },
  input: {
   width: 250,
    height: 40,
    borderRadius: 20,
    paddingLeft: 20,
    color: '#fff',
    backgroundColor: '#2A2A2A',
    placeholderTextColor: '#BCBCBC',
    
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3385FF',
        width: 300,
        minHeight: 30,
        borderRadius: 20,
        marginTop: 10,
        padding: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'center',
        width: 200,
        opacity: 0.7,
        
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#AAAAAA',
        width: 300,
        minHeight: 30,
        borderRadius: 20,
        marginTop: 10,
        padding: 5,
        justifyContent: 'center',
        width: 200,
        opacity: 0.8,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    
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

  timestamp: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
    textAlign: 'right',
  },
  sender: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#191919',
    width: 400,
    height: 200,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  headerText: {
    color: '#818181',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
   
  questions:{
    flexDirection: 'row',
    gap: 10,
    marginTop: 40,
},  
questionText:{
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

text1 :{
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    width: 50,
    height: 20,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF1D840',
    opacity: 0.8,
    
},

text2: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 1,
    paddingHorizontal: 12,
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF1D840',
  },
  
  bottom: {
    backgroundColor: '#191919',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    marginTop: 20,
   paddingVertical: 10,
  
  },
  Report: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#191919',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0C8CE9',
    marginLeft: 20,
    marginTop: 10,
    width: 100,
    height: 40,
    paddingTop: 8,

  },
  Quit: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#FF5050',
    opacity: 0.8,
    borderRadius: 50,
    width: 100,
    marginTop: 10,
    height: 40,
    paddingTop: 8,
    marginRight: 20,
  },
  bottomend: {
    backgroundColor: '#191919',
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    marginTop: 20,
    
    paddingVertical: 10,
    width: 400,
    height: 70,
  },


});

export default ExploreChatScreen;