
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const HomeScreen = (props) => {
  const { route } = props;
  const { userInfo } = route.params;
  
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
   
 

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.entypoContainer}>
      <TouchableOpacity onPress={
        () => navigation.goBack()
      
      } >
        <AntDesign name="arrowleft" size={24} color="gray" />
      </TouchableOpacity>
    </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> Where do You live ?</Text>
        <Text style={styles.subtitle}>
          {' '}
          We need to know your location in order to provide a customized home screen
        </Text>

        {location ? (
          <View style={{ flex: 1 }}>
            
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity >
              <Text style={styles.button}>Allow Location Access</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text
          style={{
            color: '#fff',
            fontWeight: '500',
            fontSize: 16,
            textAlign: 'center',
            marginTop: 10,
          }}
        ></Text>

        <TouchableOpacity 
         onPress={() =>
          navigation.navigate('ManualLocation' ,  {
            userInfo: userInfo,
          }
          )}
        >
          <Text style={styles.manual}>Enter Location Manually </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 64,
  },
  entypoContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  titleContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8E8E8E',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: '#0C8CE9',
    borderRadius: 10,
    marginTop: 127,
    paddingVertical: 14,
    paddingHorizontal: 70,
  },
  button: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  manual: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;