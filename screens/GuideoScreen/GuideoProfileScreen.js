import { View, Text, StyleSheet , TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const GuideoProfileScreen = () => {
  GoogleSignin.configure({
    webClientId: '417475382829-foj9qii79c52nl4lecmt52mtg41hdo0c.apps.googleusercontent.com',
  });

  const { setIsLoggedIn } = React.useContext(AuthContext);
    
  // get current loging user 

  const currentUser = auth().currentUser;
  const userProfle = currentUser.photoURL
  const name = currentUser.displayName
  const phoneNumbers = currentUser.phoneNumber
  console.log('currentUser', currentUser);
  console.log('userProfle', userProfle);
  console.log('name', name);
  console.log('phoneNumbers', phoneNumbers);
  
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@token');
    } catch (e) {
      console.error('Error removing token:', e);
    }
  };
  const logOutUser = async () => {
    setIsLoggedIn(false);
    await removeToken();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth().signOut();
  };
  
  const [tellMeAbout, setTellMeAbout] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [livingInLocationFrom, setLivingInLocationFrom] = React.useState('');
  const [aboutMe, setAboutMe] = React.useState('');

  // add the user data to the firebase
  const addUserData = async () => {
    try {
      await firestore().collection('GuideoPRofileDetails').doc().set({
        tellMeAbout,
        dateOfBirth,
        phoneNumber,
        location,
        livingInLocationFrom,
        aboutMe,
      });
    } catch (error) {
      console.error('Error adding user data:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
      <View style={{flexDirection:"row",marginTop:40 , marginLeft:20}}>
      <Image style={{height:80,width:80,borderRadius:50,marginLeft:20}} source={{uri: userProfle}} />
      <Text style={{
        color:"#fff",
        fontSize:14,
        fontWeight:"bold",
        marginLeft:20,
        marginTop:10
      }}>{name}</Text>

      </View>

      </View>
      <View style={styles.about}>
        <Text style={{
          color:"#FFC764",
          fontSize:14,
          marginTop:20,
          fontWeight:"bold",
          marginLeft:20,
        }}>About me</Text>
        <TextInput style={{
          backgroundColor:"#1E1E1E",
          borderRadius:10,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          padding:20,
          color:"#fff"
        }} placeholder="Write something about yourself" 
        placeholderTextColor="#fff"
        theme={{ colors: { text: '#FFF' } }}
        value={aboutMe}
        onChangeText={(text) => setAboutMe(text)}
        />
        </View>
        <View style={styles.privateDetails}>
          <Text style={{
            color:"#FFC764",
            fontSize:14,
            marginTop:20,
            fontWeight:"bold",
            marginLeft:20,
          }}>Private Details</Text>
           <View style={styles.private}>
    
            
            </View>
          </View>
          <View style={styles.talk}>
          <Text style={{
          color:"#FFC764",
          fontSize:14,
          marginTop:20,
          fontWeight:"bold",
          marginLeft:20,
        }}>Talk to me About</Text>
        <TextInput style={{
          backgroundColor:"#1E1E1E",
          borderRadius:10,
          marginTop:10,
          marginLeft:20,
          marginRight:20,
          padding:20,
          color:"#fff"
        }} placeholder=" Talk me about " 
        placeholderTextColor="#fff"
        theme={{ colors: { text: '#FFF' } }}
        value={tellMeAbout}
        onChangeText={(text) => setTellMeAbout(text)}

        />
        </View>
        {/* <TouchableOpacity onPress={addUserData}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>Save</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={logOutUser}>
        <View style={styles.buttonContainer}>
          <Text style={styles.button}>LogOut</Text>
          </View>
        </TouchableOpacity>
         
    </View>
  )
}

export default GuideoProfileScreen 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#000"
  },
  profile :{
    backgroundColor:"#191919",
    height:150,
    borderBottomEndRadius:30,
    borderBottomStartRadius:30,

  },
 buttonContainer: {
    backgroundColor: '#0C8CE9',
    borderRadius: 10,
    marginTop: 20, // Adjusted marginTop
    marginHorizontal: 20, // Added marginHorizontal for spacing
    paddingVertical: 15, // Added paddingVertical for better button appearance
    alignItems: 'center',
},

  button: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  
  },
})

