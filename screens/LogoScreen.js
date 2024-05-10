import React, { useState, useEffect } from 'react';
import { View, Image, Text, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen from './OnboardingScreen'; // assuming this is the file containing OnboardingScreen component
import logo from '../images/logo.png';

const LogoAnimation = () => {
  const [logoOpacity] = useState(new Animated.Value(0));
  const [textOpacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    // Animation for logo image
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();

    // Animation for text
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 2000, // Adjust the duration as needed
        useNativeDriver: true,
      }).start(() => {
        // Navigate to onboarding screen after animation completes
        navigation.navigate('OnboardingScreen');
      });
    }, 3000); // Display onboarding screen after 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Image source={logo} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 170,
    marginBottom: 120,
    marginLeft: 25,
  },
});

export default LogoAnimation;

