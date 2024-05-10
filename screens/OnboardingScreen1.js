import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GirlWithRocket from '../images/GirlwithRocket';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('boardingScreen2');
  };

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <GirlWithRocket style={styles.image} />
      </View>
      <View style={styles.details}>
            <Text style={styles.title}>Who is exploro?</Text>
            <Text style={styles.description}>Users seeking info, connect with locals for {
                '\n'
            }guidance. Whether chasing hot spots, craving{
                '\n'
            } secrets, or just winging it in a new city, Guidero's {
                '\n'
            
            } got you! 🌍🔍</Text>
           <TouchableOpacity onPress={handleNext}>
              <Text style={styles.button}>Next</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.2, // Adjusted margin for better positioning
  },
  image: {
    width: windowWidth * 0.8, // Adjusted width for better scaling
    height: windowHeight * 0.5, // Adjusted height for better scaling
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
    marginTop: windowHeight * 0.1,
    height: windowHeight * 0.5,
     // Adjusted height for better positioning
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
