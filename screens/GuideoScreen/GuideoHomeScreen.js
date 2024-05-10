// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import firestore from '@react-native-firebase/firestore';
// import GuideoFilterScreen from './GuideoFilterScreen';
// import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Home from '../../images/Home';

// const HomeScreen = () => {
//   const [data, setData] = useState([]);
//   const navigation = useNavigation();

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const list = [];
//       const snapshot = await firestore().collection('messagePriortiy').get();
//       snapshot.forEach((doc) => {
//         list.push(doc.data());
//       });
//       setData(list);
//     } catch (error) {
//       console.log('Error getting documents: ', error);
//     }
//   };

//   console.log('Data:', data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.homescreen}>
//         <Text style={styles.text}>
//           <Text style={{ color: 'gray' }}>Interests</Text> | General
//         </Text>
//         <View>
//           <Text style={styles.text1}>
//             Earn <Text style={{ color: '#FFC700' }}>₹200*</Text> Now
//           </Text>
//           <Text style={styles.text2}>Earn Rs 200 by answering 100 exploro question</Text>
//         </View>
//       </View>
//       <View style={styles.imageContainer}>
//         <Home />
//       </View>
//       <GuideoFilterScreen data={data} />
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#272727',
//   },
//   homescreen: {
//     backgroundColor: '#191919',
//     height: 290,
//     borderBottomEndRadius: 40,
//     borderBottomStartRadius: 40,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   text1: {
//     color: '#fff',
//     fontSize: 28,
//     fontStyle: 'italic',
//     fontWeight: '700',
//     textAlign: 'center',
//     lineHeight: 33.89,
//     marginTop: 10,
//   },
//   text2: {
//     color: '#BCBCBC',
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   imageContainer: {
//     position: 'absolute',
//     bottom:0, // Adjust this value as needed
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Home from '../../images/Home';
import GuideoFilterScreen from './GuideoFilterScreen';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const GuideoChatScreens = (props) => {
  const [activeTab, setActiveTab] = useState('General');
  const [earnings, setEarnings] = useState(0);
  const [showImage, setShowImage] = useState(false);
    const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const list = [];
      const snapshot = await firestore().collection('messagePriortiy').get();
      snapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setData(list);
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  };

  console.log('Data:', data);

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const handleUpIconPress = () => {
    setShowImage(false);
  };

  const handleDownIconPress = () => {
    setShowImage(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.homescreen}>
        <View style={styles.homescreen1}>
          <TouchableOpacity onPress={() => handleTabPress('guideo')}>
            <Text style={{ color: activeTab === 'guideo' ? 'white' : 'gray', fontWeight: 'bold', fontSize: 20 }}>
              Interests
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, color: 'gray' }}> | </Text>
          <TouchableOpacity onPress={() => handleTabPress('explore')}>
            <Text style={{ color: activeTab === 'explore' ? 'white' : 'gray', fontWeight: 'bold', fontSize: 20 }}>
              General
            </Text>
          </TouchableOpacity>
          {showImage && (
           
            <AntDesign
              name="up"
              size={20}
              style={{
                color: '#BCBCBC',
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 20,
                
              }}
              onPress={handleUpIconPress}
            />
           
          )}
          {!showImage && (
            <AntDesign
              name="down"
              size={20}
              style={{
                color: '#BCBCBC',
                alignSelf: 'flex-end',
                position: 'absolute',
                right: 20,
                top: 90,
              }}
              onPress={handleDownIconPress}
            />
          )}
        </View>
        {showImage && (
          <View>
            <Text style={styles.text1}>Earn <Text style={{ color: '#FFC700' }}>₹200*</Text> Now</Text>
            <Text style={styles.text2}>Earn Rs 200 by answering 100 explore questions</Text>
          </View>
        )}
        <View style={styles.image}>
          {showImage && <Home />}
        </View>
        {!showImage && (
          <View style={styles.imageContainer}>
            <Text style={styles.text3}>Guidos</Text>
            <Text style={{
              color: '#BCBCBC',
              fontSize: 10,
              textAlign: 'center',
              marginBottom: 10,
            }}>Help explores and earn rewards</Text>
          </View>
        )}
      </View>
      <GuideoFilterScreen data={data} />
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
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    
  },
  homescreen1: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
  },
  text1: {
    color: '#fff',
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 33.89,
    marginTop: 10,
  },
  text2: {
    color: '#BCBCBC',
    fontSize: 12,
    textAlign: 'center',
  },
  text3: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text4: {
    color: '#BCBCBC',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  
});
