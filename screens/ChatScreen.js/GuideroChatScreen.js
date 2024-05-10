// // import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { AntDesign, Feather } from '@expo/vector-icons';
// // import firestore from '@react-native-firebase/firestore'; // Corrected import
// // import * as Location from 'expo-location'
// // import MapView, { Marker } from 'react-native-maps'

// // const GuideroChatScreen = (props) => {
// //     const { route } = props;
// //     const { category  ,   
// //       inputText , title , duration, priority, budget, id
// //     } = route.params;
// //       console.log( category , inputText , title , duration, priority, budget, id);

// //     const getPriorityColor = (priority) => {
// //         switch (priority) {
// //           case 'High':
// //             return '#FF8787'; // Red
// //           case 'Medium':
// //             return '#FFE071'; // Yellow
// //           case 'Low':
// //             return '#7AFFB8'; // Green
// //           default:
// //             return '#FFF1D840'; // Default to Yellow
// //         }
// //       };

// //       const convertDuration = (duration) => {
// //         // Check if duration is provided and is in the expected format
// //         if (duration && duration.hours !== undefined && duration.minutes !== undefined) {
// //           // Assuming duration is in hours and minutes
// //           const hoursLeft = parseInt(duration.hours, 10);
// //           const minutesLeft = parseInt(duration.minutes, 10);
          
// //           // Convert both hours and minutes to minutes and then calculate the total hours
// //           const totalHoursLeft = hoursLeft + minutesLeft / 60;
      
// //           return totalHoursLeft;
// //         }
      
// //         // Handle invalid or undefined duration
// //         return 0; // Or you can return a default value or an empty string
// //       };

// //     const [inputMessage, setInputMessage] = useState('');
// //     const [messages, setMessages] = useState([]);
  
// //     useEffect(() => {
// //       const unsubscribe = firestore().collection('chats').doc(id).collection('messages').orderBy('timeStamp').onSnapshot((snapshot) => {
// //         const newMessages = snapshot.docs.map((doc) => {
// //           const data = doc.data();
// //           return {
// //             ...data,
// //             id: doc.id,
// //             timestamp: doc.data().timeStamp,
// //           };
// //         });
// //         const exploreMessages = newMessages.filter((message) => message.type === 'explore');
// //         setMessages(exploreMessages);
// //       });
// //       return unsubscribe;
// //     }
// //     , [id]);
// //     const sendMessage = async () => {
// //       if (inputMessage.trim() !== '') {
// //         // Add message to Firestore with type 'explore'
// //           await firestore().collection('chats').doc(id).collection('messages').add({
// //           type: 'explore',
// //           text: inputMessage,
// //           timeStamp: new Date().getTime(),
// //         });
    
// //         setInputMessage('');
// //       }
// //     };
    
  
// //   // get messages of explore from firebase
  
// //   const [exploreMessages, setExploreMessages] = useState([]);
  
// //   useEffect(() => {
// //     const unsubscribe = firestore().collection('chats').doc(id).collection('messages').orderBy('timeStamp').onSnapshot((snapshot) => {
// //       const newMessages = snapshot.docs.map((doc) => {
// //         const data = doc.data();
// //         return {
// //           ...data,
// //           id: doc.id,
// //           timestamp: doc.data().timeStamp,
// //         };
// //       });
// //       const exploreMessages = newMessages.filter((message) => message.type === 'guideo');
// //       setExploreMessages(exploreMessages);
// //     });
// //     return unsubscribe;
// //   }
// //   , [id]);

 
// //   const [address, setAddress] = useState(null);
// //   const [location, setLocation] = useState(null);
  
    
// //   const allowLocationAccess = async () => {
// //     try {
// //       const { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') {
// //         Alert.alert('Permission denied', 'You need to grant location permissions to use this feature', [{ text: 'OK' }]);
// //         return;
// //       }

// //       const currentLocation = await Location.getCurrentPositionAsync({});
// //       const { latitude, longitude } = currentLocation.coords;
// //       setLocation({ latitude, longitude });
      
// //       // add location to firestore
// //       await firestore().collection('chats').doc(id).collection('messages').add({
// //         type: 'loaction',
// //         text: 'Location shared',
// //         timeStamp: new Date().getTime(),
// //         location: { latitude, longitude },
// //       });

// //       // Get the address using geocoding API

// //       let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
// //       setAddress(addressResponse);
      
// //     } catch (error) {
// //       console.error('Error getting location:', error);
// //       Alert.alert('Error', 'Failed to get location. Please try again.', [{ text: 'OK' }]);
// //     }
// //   };
  
// //   console.log('Location:', location);
// //   console.log('Address:', address);

// //   // now using the location and address, we can display the location on the map and mark the location on the map

// //   const getMapRegion = () => ({
// //     latitude: location.latitude,
// //     longitude: location.longitude,
// //     latitudeDelta: 0.0922,
// //     longitudeDelta: 0.0421,
// //   });

  
// //   return (
// //     <View style={Styles.container}>

// //       <View style={Styles.header}>
// //       <AntDesign name="left" size={16} color="white" style={{
// //         marginTop: 50,
// //         marginLeft: 20
// //       }} />
// //        <View style={Styles.questions}>
// //         <Text style={{
// //           color: '#818181',
// //           fontSize: 16,
// //           fontWeight: 'bold',
// //           marginLeft: 30,
// //         }}>Question </Text>
// //         <View style={{
// //             marginTop:5,
// //             flexDirection: 'row',
// //             gap: 10,
// //         }}>
// //          <Text style={Styles.questionText}>{title}</Text>
// //          <Text style={[Styles.text1, { backgroundColor: getPriorityColor(priority) , }]}>
// //                 {priority}
// //               </Text>
// //            <Text style={Styles.text2}>
// //                 {convertDuration(duration)} Hours left</Text>
// //            </View> 
              
// //       </View>
// //       <View>
// //         <Text style={{
// //                     color: '#fff',
// //                     fontSize: 20,
// //                     fontWeight: 'bold',
// //                     marginLeft: 30,
// //                 }}>{inputText}</Text>
// //             </View>  
     
// //       </View> 
     
// //       <View>
// //            <Text style={{
// //                     color: '#818181',
// //                     fontSize: 16,
// //                     fontWeight: 'bold',
// //                     textAlign: 'center',
// //                     marginTop: 50,
// //                 }}>Help out your peer Exploro and {
// //                     `\n`
// //                 } earn rewards</Text>

// //       </View>
// //       <ScrollView style={Styles.messageContainer}>
// //   {exploreMessages.map((message) => (
// //     <View key={message.id} style={Styles.exploreMessage}>
// //       <Text style={Styles.messageText}>
// //         {message.text}
// //         {
// //           `\n`
// //         }
// //         <Text style={{
// //           color: '#818181',
// //           fontSize: 12,
// //           fontWeight: 'bold',
// //           textAlign: 'center',
// //           marginTop: 50,
// //         }}>
// //           {new Date(message.timestamp).toLocaleTimeString('en-US', {
// //           hour: '2-digit',
// //           minute: '2-digit',
// //         })
// //         }
// //         </Text>
// //       </Text>
// //     </View>
// //   ))}
// //     {messages.map((message) => (
// //     <View key={message.id} style={[Styles.messageBubble, Styles.guideoMessage]}>
// //       <Text style={Styles.messageText}>
// //         {message.text}
// //         {
// //           `\n`
// //         }
// //         <Text style={{
// //           color: '#818181',
// //           fontSize: 12,
// //           fontWeight: 'bold',
// //           textAlign: 'center',
// //           marginTop: 50,
// //         }}>
// //           {new Date(message.timestamp).toLocaleTimeString('en-US', {
// //           hour: '2-digit',
// //           minute: '2-digit',
// //         })
// //         }
// //         </Text>
// //       </Text>
// //     </View>
// //   ))}
// //   {location && (
// //     <View style={{ marginTop: 20, marginLeft: 20 }}>
// //       <MapView
// //         style={{ width: 300, height: 200 }}
// //         region={getMapRegion()}
// //       >
// //         <Marker
// //           coordinate={{
// //             latitude: location.latitude,
// //             longitude: location.longitude,
// //           }}
// //           title="Location"
// //           description="Location shared by Exploro"
// //         />
// //       </MapView>
      
// //     </View>
// //   )}



// // </ScrollView>


        
// //       <View style={Styles.message}>
// //          <TextInput 
// //             style={{
// //                 backgroundColor: '#2A2A2A',
// //                 width: 250,
// //                 height: 40,
// //                 borderRadius: 20,
// //                 marginTop: 20,
// //                 marginLeft: 20,
// //                 paddingLeft: 20,
// //                 color: '#fff',
// //                 placeholderTextColor: '##BCBCBC',
// //             }}

// //           placeholder='Message...'
// //           value={inputMessage}
// //           onChangeText={(text) => setInputMessage(text)}
// //            />

// //             <TouchableOpacity onPress={
// //                 sendMessage
// //             }>
// //             <Feather name="arrow-up" size={24}style={{
// //                 backgroundColor:"#0C8CE9",
// //                 borderRadius: 20,
// //                 color:"#fff",
// //                 marginTop: 25,
                
// //                }}
// //                 />
// //             </TouchableOpacity>
// //             <TouchableOpacity onPress={allowLocationAccess}>
// //           <Feather
// //             name="map-pin"
// //             size={24}
// //             style={{
             
// //               borderRadius: 20,
// //               color: '#fff',
// //               marginTop: 25,
// //               marginLeft: 0,
// //             }}
// //           />
// //         </TouchableOpacity>
            
// //       </View>
     
// //         <View style={Styles.bottom}>
// //             <TouchableOpacity>
// //                 <Text style={Styles.Report }>Report</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity>
// //                 <Text style={Styles.Quit}>Quit</Text>
// //             </TouchableOpacity>
// //         </View>
// //     </View>
// //   )
// // }

// // export default GuideroChatScreen

// // const Styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#000',
// //       },
// //       header: {
// //         backgroundColor: '#191919',
// //         width: 400,
// //         height: 200,
// //         borderBottomEndRadius: 40,
// //         borderBottomStartRadius: 40,
// //       },
// //       headerText: {
// //         color: '#818181',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //       },
// //       messageContainer: {
// //         flex: 1,
// //         marginTop: 20,
      
        
// //       },
// //       messageBubble: {
// //         backgroundColor: '#2A2A2A',
// //         width: 300,
// //         minHeight: 40,
// //         borderRadius: 20,
// //         marginTop: 10,
// //         padding: 10,
// //         justifyContent: 'center',
// //         marginLeft: 170,
// //         marginRight: 20,
// //         width: 200,

// //       },
// //       messageText: {
// //         color: '#fff',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //       },
// //       exploreMessage: {
// //         alignSelf: 'flex-start', 
// //         backgroundColor: '#F0F0F0', 
// //         opacity: 0.8,
// //         color: '#000',
// //         padding: 10,
// //         borderRadius: 20,
// //         marginTop:5,
// //         marginLeft: 20,
// //       },
// //       guideoMessage: {
// //         alignSelf: 'flex-end', // Align to the right side
// //         backgroundColor: '#DCF8C6', 
// //         opacity: 0.8,
// //         // Customize background color for guideo messages
// //       },
// //       message: {
// //         flexDirection: 'row',
// //         gap: 10,
// //         marginTop: 20,
// //         marginHorizontal: 20,
// //       },
// //       input: {
// //         backgroundColor: '#2A2A2A',
// //         flex: 1,
// //         height: 40,
// //         borderRadius: 20,
// //         paddingLeft: 20,
// //         color: '#fff',
// //         placeholderTextColor: '#BCBCBC',
// //       },
// //       sendButton: {
// //         backgroundColor: '#0C8CE9',
// //         borderRadius: 20,
// //         color: '#fff',
// //         marginTop: 25,
// //         padding: 10,
// //       },
// //       bottom: {
// //         backgroundColor: '#191919',
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         borderTopEndRadius: 40,
// //         borderTopStartRadius: 40,
// //         marginTop: 20,

// //         paddingVertical: 10,
// //         width: 400,
// //         height: 70,
// //       },
// //       Report: {
// //         color: '#fff',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         backgroundColor: '#191919',
// //         borderRadius: 50,
// //         borderWidth: 1,
// //         borderColor: '#0C8CE9',
// //         marginLeft: 20,
// //         marginTop: 10,
// //         width: 100,
// //         height: 40,
// //         paddingTop: 8,

// //       },
// //       Quit: {
// //         color: '#fff',
// //         fontSize: 16,
// //         fontWeight: 'bold',
// //         textAlign: 'center',
// //         backgroundColor: '#FF5050',
// //         opacity: 0.8,
// //         borderRadius: 50,
// //         width: 100,
// //         marginTop: 10,
// //         height: 40,
// //         paddingTop: 8,
// //         marginRight: 20,
// //       },
// //       questions:{
// //         flexDirection: 'row',
// //         gap: 10,
// //         marginTop: 40,
// //     },
// //     questionText:{
// //         color: '#fff',
// //         fontSize: 12,
// //         fontWeight: 'bold',
// //         width: 50,
// //         height: 20,
// //         textAlign: 'center',
// //         borderRadius: 20,
// //         backgroundColor: '#FFF1D840',
// //     },
// //     text1 :{
// //         color: '#fff',
// //         fontSize: 12,
// //         fontWeight: 'bold',
// //         width: 50,
// //         height: 20,
// //         textAlign: 'center',
// //         borderRadius: 20,
// //         backgroundColor: '#FFF1D840',
// //         opacity: 0.8,
        
// //     },
// //     text2: {
// //         color: '#fff',
// //         fontSize: 12,
// //         fontWeight: 'bold',
// //         paddingVertical: 1,
// //         paddingHorizontal: 12,
// //         textAlign: 'center',
// //         borderRadius: 20,
// //         backgroundColor: '#FFF1D840',
// //       },
// //     })

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Linking } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


const GuideroChatScreen = (props) => {
  const { route } = props;
  const { category, inputText, title, duration, priority, budget, id } = route.params;

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  
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


 // get loaction from firebase
  

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
    if (inputMessage.trim() !== '') {
      await firestore()
        .collection('chats')
        .doc(id)
        .collection('messages')
        .add({
          type: 'guidero',
          text: inputMessage,
          timeStamp: new Date().getTime(),
        });

      setInputMessage('');
    }
  };

  // get location from firebase
  const [location, setLocation] = useState(null);
  

  const renderMessage = (message) => {
    const isSentByUser = message.type === 'guidero' 

    let senderText = '';
    if (message.sender === 'guidero') {
      senderText = 'Guidero';
    } else if (message.sender === 'explore') {
      senderText = 'Explore';
    }
    return (
      <View key={message.id}>
        <View style={isSentByUser ? styles.sentMessage : styles.receivedMessage}>
          
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>{new Date(message.timeStamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
          {message.type === 'location' && (
            <TouchableOpacity onPress={() => viewLocation(message.latitude, message.longitude)}>
              <Text style={{ color: '#0C8CE9', textAlign: 'center' }}>View Location</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
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
                }}>Help out your peer Guideo and {
                    `\n`
                } earn rewards</Text>

      </View>
       
      <ScrollView style={styles.messagesContainer} 
      contentContainerStyle={{ paddingBottom: 20 }}  >
        {messages.map((message) => renderMessage(message))}
         
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}   
           placeholderTextColor="#fff"
        theme={{ colors: { text: '#FFF' } }}
          onChangeText={(text) => setInputMessage(text)}
      
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather name="arrow-up" size={24} color="#0C8CE9" />
        </TouchableOpacity>
        </View>
         <View style={styles.bottom}>
            <TouchableOpacity>
                <Text style={styles.Report }>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={
              () => navigation.navigate('Guideo')
             }  
            >
                <Text style={styles.Quit}>Quit</Text>
            </TouchableOpacity>
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


export default GuideroChatScreen;

