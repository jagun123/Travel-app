// import React, { useState, useEffect } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthContext } from '../AuthProvider';
// import firestore from '@react-native-firebase/firestore'; // Import firestore if not already imported

// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import HomeScreen from '../screens/HomeScreen';
// import EnterManualLocation from '../screens/EnterManualLocation';
// import ProfileBoostupScreen from '../screens/ProfileBoostupScreen';
// import ExploreHomeScreen from '../screens/ExploreScreen/ExploreHomeScreen';
// import GuideoProfileScreen from '../screens/GuideoScreen/GuideoProfileScreen';
// import GuideoHomeScreen from '../screens/GuideoScreen/GuideoHomeScreen';
// import ExploreManualLocation from '../screens/ExploreScreen/ExploreManualLocation';
// import ExploreMessageScreen from '../screens/ExploreScreen/ExploreMessageScreen';
// import ExplorePriortyScreen from '../screens/ExploreScreen/ExplorePriortyScreen';
// import ExploreShottingScreen from '../screens/ExploreScreen/ExploreShottingScreen';
// import GuideoMessageScreen from '../screens/GuideoScreen/GuideoMessageScreen';
// import LogoAnimation from '../screens/LogoScreen';
// import ExploreChatScreen from '../screens/ChatScreen.js/ExploreChatScreen';
// import GuideroChatScreen from '../screens/ChatScreen.js/GuideroChatScreen';
// import ExploreChatQuestions from '../screens/ChatScreen.js/ExploreChatQuestions';
// import GuideroChatQuestions from '../screens/ChatScreen.js/GuideroChatQuestion';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// import ExploreBudgetScreen from '../screens/ExploreScreen/ExploreBudgetScreen';
// import ExploreDurationScreen from '../screens/ExploreScreen/ExploreDurationScreen';
// import OnboardingScreen1 from '../screens/OnboardingScreen1';
// import OnboardingScreen2 from '../screens/OnboardingScreen2';

// const Stack = createNativeStackNavigator();

// const AppContainer = () => {
//   const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
//   const { getItem } = useAsyncStorage('@token');
//   const [checking, setIsChecking] = React.useState(true);


//   React.useEffect(() => {
//     const checkIfUserIsLoggedIn = async () => {
//       const item = await getItem();

//       if (item !== null) {
//         setIsLoggedIn(true);

//       }

//       setIsChecking(false);
//     };

//     checkIfUserIsLoggedIn();
//   }, []);

//   const Tab = createBottomTabNavigator();

//   const GuideoChatScreens = () => (
//     <Stack.Navigator initialRouteName="Chat">
//       <Stack.Screen name="GuideChatSession" component={GuideroChatQuestions} options={{ headerShown: false }} />
//       <Stack.Screen name="ExploreChatSession" component={ExploreChatQuestions} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
//   const GuideoTabScreen = () => (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#fff',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           backgroundColor: '#272727',
//           borderTopEndRadius: 30,
//           borderTopStartRadius: 30,
//           height: 70,
//           position: 'absolute',
//           paddingBottom: 10,
//           paddingTop: 10,
//         },
//       }}
//       tabBarOptions={{
//         keyboardHidesTabBar: true,
//       }}>
//       <Tab.Screen
//         name="Guideo"
//         component={GuideoHomeScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <MaterialIcons name="groups" size={size} color={focused ? '#fff' : 'gray'} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Explore"
//         component={ExploreHomeScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <MaterialCommunityIcons name="human-greeting" size={24} color={focused ? '#fff' : 'gray'} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Chat"
//         component={GuideoChatScreens}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <MaterialIcons name="chat-bubble" size={size} color={focused ? '#fff' : 'gray'} />
//           ),
//           headerShown: false,
//         }}
//       />
//       {/* <Tab.Screen
//         name="Profile"
//         component={GuideoProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <MaterialCommunityIcons name="account-circle" size={size} color={focused ? '#fff' : 'gray'} />
//           ),
//           headerShown: false,
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
  

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LogoScreen">
//         {isLoggedIn ? (
//           <>
//             <Stack.Screen name="GuideoTabScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
           
//             <Stack.Screen name="ExploreHomeScreen" component={ExploreHomeScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreManualLocation" component={ExploreManualLocation} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreMessageScreen" component={ExploreMessageScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExplorePriortyScreen" component={ExplorePriortyScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreShottingScreen" component={ExploreShottingScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="GuideoHomeScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="GuideoMessageScreen" component={GuideoMessageScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="GuideroChatScreen" component={GuideroChatScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreChatQuestions" component={ExploreChatQuestions} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreChatScreen" component={ExploreChatScreen} options={{ headerShown: false }} />
//              <Stack.Screen name="ExploreManualLoaction" component={ExploreManualLocation} options={{ headerShown: false }} />
//              <Stack.Screen name="ExploreBudget" component={ExploreBudgetScreen} options={{ headerShown: false }} />
//              <Stack.Screen name="ExploreDuration" component={ExploreDurationScreen} options={{ headerShown: false }} />
//           </>
//         ) : (
//           <>
//              <Stack.Screen name="ExploreChatScreen" component={ExploreChatScreen} options={{ headerShown: false }} />
//               <Stack.Screen name="GuideroChatScreen" component={GuideroChatScreen} options={{ headerShown: false }} />
//               <Stack.Screen name="GuideoMessageScreen" component={GuideoMessageScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="GuideoHomeScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="LogoScreen" component={LogoAnimation} options={{ headerShown: false }} />
//             <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
//             <Stack.Screen name='boardingScreen1' component={OnboardingScreen1} options={{ headerShown: false }} />
//             <Stack.Screen name='boardingScreen2' component={OnboardingScreen2} options={{ headerShown: false }
//           } />
//             <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="GuideoTabScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ManualLocation" component={EnterManualLocation} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreManualLoaction" component={ExploreManualLocation} options={{ headerShown: false }} />
//             <Stack.Screen name="ProfileBoostupScreen" component={ProfileBoostupScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreHomeScreen" component={ExploreHomeScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreMessageScreen" component={ExploreMessageScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExplorePriortyScreen" component={ExplorePriortyScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ExploreBudget" component={ExploreBudgetScreen} options={{ headerShown: false }} />
//              <Stack.Screen name="ExploreDuration" component={ExploreDurationScreen} options={{ headerShown: false }} />
//              <Stack.Screen name="ExploreShottingScreen" component={ExploreShottingScreen} options={{ headerShown: false }} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppContainer;

import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../AuthProvider';
import firestore from '@react-native-firebase/firestore'; // Import firestore if not already imported

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import EnterManualLocation from '../screens/EnterManualLocation';
import ProfileBoostupScreen from '../screens/ProfileBoostupScreen';
import ExploreHomeScreen from '../screens/ExploreScreen/ExploreHomeScreen';
import GuideoProfileScreen from '../screens/GuideoScreen/GuideoProfileScreen';
import GuideoHomeScreen from '../screens/GuideoScreen/GuideoHomeScreen';
import ExploreManualLocation from '../screens/ExploreScreen/ExploreManualLocation';
import ExploreMessageScreen from '../screens/ExploreScreen/ExploreMessageScreen';
import ExplorePriortyScreen from '../screens/ExploreScreen/ExplorePriortyScreen';
import ExploreShottingScreen from '../screens/ExploreScreen/ExploreShottingScreen';
import GuideoMessageScreen from '../screens/GuideoScreen/GuideoMessageScreen';
import LogoAnimation from '../screens/LogoScreen';
import ExploreChatScreen from '../screens/ChatScreen.js/ExploreChatScreen';
import GuideroChatScreen from '../screens/ChatScreen.js/GuideroChatScreen';
import ExploreChatQuestions from '../screens/ChatScreen.js/ExploreChatQuestions';
import GuideroChatQuestions from '../screens/ChatScreen.js/GuideroChatQuestion';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import ExploreBudgetScreen from '../screens/ExploreScreen/ExploreBudgetScreen';
import ExploreDurationScreen from '../screens/ExploreScreen/ExploreDurationScreen';
import OnboardingScreen1 from '../screens/OnboardingScreen1';
import OnboardingScreen2 from '../screens/OnboardingScreen2';
import GuideoIntrestScreen from '../screens/GuideoScreen/GuideoIntrestScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const { getItem } = useAsyncStorage('@token');
  const [checking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const item = await getItem();

      // user is logged in
      if (item !== null) {
        setIsLoggedIn(true);
      }

      setIsChecking(false);
    };

    checkIfUserIsLoggedIn();
  }, []);

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }


  const Tab = createBottomTabNavigator();

  const GuideoChatScreens = () => (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen name="GuideChatSession" component={GuideroChatQuestions} options={{ headerShown: false }} />
      <Stack.Screen name="ExploreChatSession" component={ExploreChatQuestions} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  const GuideoTabScreen = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#272727',
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          height: 70,
          position: 'absolute',
          paddingBottom: 10,
          paddingTop: 10,
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Guideo"
        component={GuideoHomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="groups" size={size} color={focused ? '#fff' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreHomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="human-greeting"
              size={24}
              color={focused ? '#fff' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={GuideoChatScreens}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="chat-bubble" size={size} color={focused ? '#fff' : 'gray'} />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={GuideoProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={size}
              color={focused ? '#fff' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogoScreen">
        {isLoggedIn ? (
          <>
            <Stack.Screen name="GuideoTabScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
            
            {/* <Stack.Screen name="EnterManualLocation" component={EnterManualLocation} options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="ProfileBoostupScreen" component={ProfileBoostupScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="ExploreHomeScreen" component={ExploreHomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreManualLocation" component={ExploreManualLocation} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreMessageScreen" component={ExploreMessageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExplorePriortyScreen" component={ExplorePriortyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreShottingScreen" component={ExploreShottingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuideoHomeScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuideoMessageScreen" component={GuideoMessageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuideroChatScreen" component={GuideroChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreChatQuestions" component={ExploreChatQuestions} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreChatScreen" component={ExploreChatScreen} options={{ headerShown: false }} />
             <Stack.Screen name="ExploreManualLoaction" component={ExploreManualLocation} options={{ headerShown: false }} />
             <Stack.Screen name="ExploreBudget" component={ExploreBudgetScreen} options={{ headerShown: false }} />
             <Stack.Screen name="ExploreDuration" component={ExploreDurationScreen} options={{ headerShown: false }} />
             <Stack.Screen name="GuideoInterestScreen" component={GuideoIntrestScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="LogoScreen" component={LogoAnimation} options={{ headerShown: false }} />
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="boardingScreen1" component={OnboardingScreen1} options={{ headerShown: false }} />
              <Stack.Screen name="ManualLocation" component={EnterManualLocation} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileBoostupScreen" component={ProfileBoostupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="boardingScreen2" component={OnboardingScreen2} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuideoTabScreen" component={GuideoTabScreen} options={{ headerShown: false }} />
            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

