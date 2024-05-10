// import { useNavigation } from '@react-navigation/native';
// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../AuthProvider';
// import image1 from '../images/image1.png';
// import logo from '../images/logo.png';

// const window = Dimensions.get('window');

// const OnboardingScreen = () => {
//   const { setIsLoggedIn } = React.useContext(AuthContext);
//   const { setItem } = useAsyncStorage('@token');
//   const navigation = useNavigation();

//   const onPressFinish = async () => {
//     navigation.navigate('login');
//   };

//   const slides = [
//     { key: 1, image: logo },
//     { key: 2, image: image1 },
//     { key: 3, image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8' }
//   ];

//   const Details = [
//     {
//       key: 1,
//       title: 'Your one-stop for personalized travel!',
//       description: 'Designed for curious souls in a new city. Get instant answers! Connect with locals (Guidos) for real-time, personalized insights. Explore the coolest hangouts with Guidero! 🌍✨',
//       image: slides[0].image,
//     },
//     {
//       key: 2,
//       title: 'Who is exploro?',
//       description: 'Users seeking info, connect with locals for guidance. Whether chasing hot spots, craving secrets, or just winging it in a new city, Guidero’s got you! 🌍🔍',
//       image: slides[1].image,
//     },
//     {
//       key: 3,
//       title: 'Who is Guido?',
//       description: 'Local expert offering real-time, personalized insights. Be a Guido for your area and interest. Ensure your guidance is top-notch and authentic! 🌟🗺️',
//       image: slides[2].image,
//     },
//   ];

//   const [currentKey, setCurrentKey] = useState(1);

//   const handleNext = () => {
//     if (currentKey === Details.length) {
//       onPressFinish();
//     } else {
//       setCurrentKey(currentKey + 1);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {Details.map((item) => (
//         item.key === currentKey && (
//           <View key={item.key} style={styles.slide}>
//             <Image source={item.image} style={styles.image} />
//             <View style={styles.details}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//               <TouchableOpacity onPress={handleNext}>
//                 <Text style={styles.button}>
//                   {item.key === Details.length ? 'Join Guidero now!' : 'Next'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#000",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     flex: 1,
//   },
//   slide: {
//     alignItems: "center",
//     justifyContent: "flex-end",
//     flex: 1,
//   },
//   image: {
//     width: 300,
//     height: 400,
//     resizeMode: "cover",
//     marginBottom: 120,
//     backgroundColor: "#000",
//   },
//   details: {
//     borderTopEndRadius: 30,
//     borderTopStartRadius: 30,
//     backgroundColor: "#292929",
//     alignSelf: "stretch",
//     alignItems: "center",
//     paddingTop: 30,
//     paddingBottom: 40,
//     paddingHorizontal: 20,
//     marginTop: -30,
//     width: window.width,
//   },
//   title: {
//     color: "#fff",
//     textAlign: "center",
//     width: 307,
//     fontWeight: "900",
//     fontSize: 28,
//     lineHeight: 34,
//   },
//   description: {
//     color: "gray",
//     textAlign: "center",
//     alignSelf: "stretch",
//     marginTop: 29,
//     fontWeight: "500",
//     fontSize: 16,
//     lineHeight: 17,
//   },
//   button: {
//     color: '#fff',
//     textAlign: "center",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     backgroundColor: "#0C8CE9",
//     alignSelf: "stretch",
//     marginTop: 48,
//     paddingVertical: 14,
//     paddingHorizontal: 60,
//     fontWeight: "600",
//     fontSize: 16,
//     lineHeight: 19,
//     width: 307,
//   },
// });

// export default OnboardingScreen;


import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import logo from '../images/logo.png'
import { useNavigation } from '@react-navigation/native';


const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('boardingScreen1');
  }
  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Image source={logo} style={styles.image} />
          </View>
           <View style={styles.details}>
            <Text style={styles.title}>Your one-stop for personalized travel!</Text>
            <Text style={styles.description}>Designed for curious souls in a new city. Get instant answers! Connect with locals (Guidos) for real-time, personalized insights. Explore the coolest hangouts with Guidero! 🌍✨</Text>
           <TouchableOpacity onPress={handleNext}>
              <Text style={styles.button}>Next</Text>
              </TouchableOpacity>
            </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 120,
    backgroundColor: '#000',
  },
  details: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: '#292929',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
    marginTop: -30,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    width: 307,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 34,
  },
  description: {
    color: 'gray',
    textAlign: 'center',
    alignSelf: 'stretch',
    marginTop: 29,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#0C8CE9',
    alignSelf: 'stretch',
    marginTop: 48,
    paddingVertical: 14,
    paddingHorizontal: 60,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    width: 307,
  },


  
  
});
