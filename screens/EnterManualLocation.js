import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const EnterManualLocation = ( props) => {
  
  const { route } = props;
  const { userInfo } = route.params;
  
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [isClearIconClicked, setIsClearIconClicked] = useState(false);
  const scrollViewRef = useRef();

  const performSearch = async () => {
    try {
      if (locationText.trim() === '') {
        setSearchResults([]);
        return;
      }

      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationText)}&key=d8f0385e13154bde8933eb7cc2a066f3`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setSearchResults(
            data.results.map(result => ({
              latitude: result.geometry.lat,
              longitude: result.geometry.lng,
              name: result.formatted,
              city: result.components.city,
              state: result.components.state,
              street: result.components.road,
              country: result.components.country,
            }))
          );
        } else {
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  // Use a delay before triggering the search
  let searchTimeout;
  const onChangeTextHandler = text => {
    setLocationText(text);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch();
    }, 300); // Adjust the delay (in milliseconds) according to your preference
  };

  // when the text field is empty, clear the search results
  const onBlurHandler = () => {
    if (!isClearIconClicked && locationText.trim() === '') {
      setSearchResults([]);
    }
    setIsClearIconClicked(false);
  };

  const clearInput = () => {
    setLocationText('');
    setIsClearIconClicked(true);
    setSearchResults([]);
  };

  const allowLocationAccess = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'You need to grant location permissions to use this feature', [{ text: 'OK' }]);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });

      // Get the address using geocoding API
      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });
      setAddress(addressResponse);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to get location. Please try again.', [{ text: 'OK' }]);
    }
  };

   
  



  return (
    <View style={styles.container}>
      <View style={styles.entypoContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={styles.title}>Enter Your Location</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <AntDesign name="search1" size={24} color="gray" />
          <TextInput
            placeholder="Enter Your Location"
            placeholderTextColor="#fff"
            value={locationText}
            onChangeText={onChangeTextHandler}
            onBlur={onBlurHandler}
            style={{ flex: 1, marginLeft: 10, color: '#fff', fontWeight: 'bold', fontSize: 14 }}
          />
          {locationText.trim() !== '' && (
            <TouchableOpacity onPress={clearInput}>
              <AntDesign name="closecircle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.currentLocationContainer}>
        <TouchableOpacity onPress={allowLocationAccess} style={{ flexDirection: 'row' }}>
        <FontAwesome6 name="location-crosshairs" size={24} color="white" />
          <Text style={styles.currentLocation}>Use my Current Location</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 30, marginTop: 20 }}>
          Search Results
        </Text>
        <ScrollView ref={scrollViewRef} style={{ marginTop: 20 }}>
          {searchResults.map(result => (
            <TouchableOpacity
              key={result.name}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#BCBCBC',
                marginLeft: 20,
                width: 340,
                height: 40,
                lineHeight: 40,
              }}
              onPress={() => {
                scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
                navigation.navigate('ProfileBoostupScreen', { location: result , userInfo : userInfo
                    
                },
                  );
              }}
            >
              <AntDesign name="enviromento" size={24} color="white" />
              <Text style={{ color: '#fff', marginLeft: 10 }}>{result.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileBoostupScreen', { location: location,
          userInfo: userInfo,
        
           })}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
          {address && address.length > 0 && (
            
            <Text
              style={{
                color: '#fff',
                marginLeft: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#BCBCBC',
                width: 340,
                height: 40,
                lineHeight: 40,
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >{`${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].postalCode}, ${address[0].country}`}</Text>
          )}
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default EnterManualLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 64,
  },
  entypoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    
  },
  input: {
     flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: '#2D2D2D',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    
  },
  
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    textAlign: 'center',
    marginLeft: 40,
    borderBottomWidth: 1, // Underline
    borderBottomColor: '#BCBCBC', // Underline color
    width: 330,
    height: 50,
  },
  currentLocation: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    width: '100%',
    fontWeight: 'bold',
  },
});
