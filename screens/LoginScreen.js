import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthProvider';

GoogleSignin.configure({
  webClientId: '785446412747-7tanohic70rjshkqjk9uc9801ih114vn.apps.googleusercontent.com',
});

const GoogleSignIn = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const [loading  , setLoading] = React.useState(false)

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('@token', token);
    } catch (e) {
      console.error('Error storing token:', e);
    }
  };

 
  const logInUser = async (userInfo) => {
    setIsLoggedIn(true);
    await storeToken(JSON.stringify(userInfo));
  };
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Signed in with Google!', userInfo);

      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);

      // Sign in to Firebase with the Google credential
      await auth().signInWithCredential(credential);

      const userSnapshot = await firestore().collection('users').doc(userInfo.user.id).get();

      if (userSnapshot.exists) {
        // User is existing, navigate to the home page
        navigation.navigate('HomeScreen', {
          userInfo: userInfo.user.id,
        });
      } else {
        // User is new, store data in Firebase and navigate to the profile page
        await storeUserDataInFirebase(userInfo);

        // navigation.navigate('ProfileScreen', {
        //   userInfo: userInfo.user.id,
        // });
      }

      await logInUser(userInfo); // Log in user and store token
    } catch (error) {
      // Handle errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign-In cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Error while trying to sign in with Google:', error.message);
      }
    }
  }

  async function storeUserDataInFirebase(userInfo) {
    const userDocument = firestore().collection('users').doc(userInfo.user.id);
    await userDocument.set({
      name: userInfo.user.name,
      email: userInfo.user.email,
      profilePictureUrl: userInfo.user.photo,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.entypoContainer}>
        <TouchableOpacity>
          <Entypo name="cross" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> Login or Sign up to {'\n'} Guidero</Text>
      </View>
      <TouchableOpacity onPress={onGoogleButtonPress}>
        <View style={styles.heading}>
          <AntDesign name="google" size={24} color="white" />
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Google Sign-In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingVertical: 64,
  },
  heading: {
    flexDirection: 'row',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
    backgroundColor: '#0C8CE9',
    padding: 10,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 350,
    alignSelf: 'center',
  },
  titleContainer: {
    marginTop: 64,
  },
  entypoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    paddingHorizontal: 20,
    fontWeight: '900',
    fontSize: 25,
    lineHeight: 34,
  },
});
