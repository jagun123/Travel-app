

import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { firebase } from "@react-native-firebase/auth";
import GirlwithRocket from '../../images/GirlwithRocket';
import * as Location from 'expo-location';
import logo from '../../images/logo.png';



const window = Dimensions.get('window');

function MyComponent(props) {
  const navigation = useNavigation();
  const { route } = props;
  
  
  const {location} = route.params || { location: '' }


  console.log('location',location);
  const places = [
    {
      id: "1",
      title: "Food",
    },
    {
      id: "2",
      title: "Hotel",
    },
    {
      id: "3",
      title: "Cafe",
    },
    {
      id: "4",
      title: "Resorts",
    },
    {
      id: "5",
      title: "Tourist spot",
    },
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [locationText, setLocationText] = useState('');
  const [locationSelected, setLocationSelected] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedCategory(place);
  };

  const handleSearchResultSelect = (result) => {
    setSelectedPlace(result);
    setLocationText(result.name);
    setLocationSelected(true);
    setSearchResults([]); // Clear search results after selection
  };

  const searchLocation = async () => {
    try {
      const coordinates = await getCoordinatesFromAddress(locationText);
      setSelectedPlace(coordinates);
      setLocationSelected(true);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  useEffect(() => {
    if (locationText.length > 0) {
      // If locationText is not empty, perform a search
      const performSearch = async () => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationText)}&key=d8f0385e13154bde8933eb7cc2a066f3`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              setSearchResults(data.results.map(result => ({ latitude: result.geometry.lat, longitude: result.geometry.lng, name: result.formatted })));
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

      performSearch();
    } else {
      // If locationText is empty, clear search results
      setSearchResults([]);
    }
  }, [locationText]);

  const handleSend = () => {
    // Assuming you have a function to navigate to the message screen and pass the values
    navigation.navigate("ExploreMessageScreen", {
      location : location,
      category: selectedCategory || "Default Category",
      
    });
  }
  

  return (
    <View style={styles.view1}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
        <AntDesign style={{
          marginTop: 30,
        }} name="left" size={16} color="white" />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
    </View>
      <View style={styles.view10}>
        <Text style={styles.text}>Shoot Your Questions here...   </Text>
        <Text style={{
          padding: 3,
          fontSize: 25,
          height : 75,
          textAlign:"center",
        
        }} >🚀</Text>
        <View style={{
          flex: 1,
          marginRight: 60,
          position: 'absolute',
          top: 90,
          right: 60,
        }}>
          <GirlwithRocket/>
        </View>
      </View>

      <View style={styles.view11}>
        <TouchableOpacity onPress={
        () => navigation.navigate('ExploreManualLoaction')} >
        <View style={styles.view12}>
          <EvilIcons name="location" size={26} color="white" />
          <View style={styles.view13}>
      <Text style={[styles.text1, location ? styles.yellowText : null]}>
  {location  
    ? `${location.name}, ${location.country} ${location.formattedAddress ? `- ${location.formattedAddress}` : ''}`
    : 'Type your location here...'
  }
</Text>



          </View>

        </View>
        </TouchableOpacity>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                <Text
                  style={[
                    styles.title,
                    {
                      backgroundColor:
                       selectedCategory?.id === item.id ? "#FFD385" : "#FFF1D840",
                      color:selectedCategory?.id === item.id ? "#fff" : "#D7D7D7",
                      borderColor: selectedCategory?.id === item.id ? "#fff" : "#fff",
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <View style={styles.view20}>
          <TouchableOpacity onPress={handleSend}>
            <View style={styles.view21}>
              <Text style={styles.text2}>Describe Your Question... </Text>
              <TouchableOpacity>
                <Feather
                  name="arrow-up"
                  size={24}
                  style={{
                    backgroundColor: "#0C8CE9",
                    borderRadius: 20,
                    color: "#fff",
                    marginTop: 100,
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MyComponent;

const styles = StyleSheet.create({
  view1: { 
    flex: 1,
    backgroundColor: "#000",
   },
   header:{
    flexDirection:"row",
    marginHorizontal:20,
    marginTop:30,
    gap:110,   
},
  logo: {
    width: 100,
    height: 50,
    
  },

  view9: {
    width: 40,
    height: 40,
    alignItems:"center",
  },
  view10: {
    width: 375,
    height: 40,
    marginTop: 20,
    marginLeft: 20,
  },
  yellowText:{
    color:"#FFD385",
    fontSize:10,
    fontWeight:"bold",   
    marginTop: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    lineHeight: 34,
    textAlign:"center",
  },
  view11: {
    marginTop: 320,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    height: 400,
    
    backgroundColor: "#191919",
  },
  view12: {
    width: 375,
    height: 40,
    marginTop: 15,
    marginLeft: 30,
    flexDirection:"row",
    color: "#fff",
  },
  view13 :{
   
  },
  
  text1:{
    color: "#818181",
    fontWeight: "900",
    fontSize: 16,
    marginLeft:10,
    marginTop:1,
    textAlign:"center",
  }, 
  title:{
    color:"#fff",
    fontSize:14,
    fontWeight:"bold",
    textAlign:"center",
    paddingHorizontal:25,
    borderRadius:50,
    backgroundColor:"#3E3E3E",
    lineHeight:16,
    padding:9,
    
    marginHorizontal: 5,
    opacity: 0.7,

  },
  
  view15:{
     width: window.width,
      height: 200,
      resizeMode: "cover",
    justifyContent:'flex-start',
    marginRight:120,
  },
   
  view20: {
     marginBottom: 90,
     backgroundColor:"#1E1E1E",
      borderRadius: 20,
     paddingHorizontal: 30,
      paddingVertical: 40,
      margin:10,
  },
  view21: {
    flexDirection:"row",
    justifyContent:"space-between",
  },
  text2:{
    color: "#818181",
    fontWeight: "400",
    fontSize: 16,
    marginLeft:0,
    marginTop:100,
    textAlign:"center",
  },
   text3 :{
    color: "#fff",
    fontWeight: "400",
    fontSize: 13,
    
   }
});

