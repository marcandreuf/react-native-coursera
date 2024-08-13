import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './app/screens/ProfileScreen';
import SplashScreen from './app/screens/SplashScreen';
import ProfileHeader from './app/components/ProfileHeader';
import HomeScreen from './app/screens/HomeScreen';
import AuthContext from "./app/contexts/AuthContext";
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function checkIsUserRegistered() {
  try {
    await sleep(500);
    const userData = await AsyncStorage.getItem('userData');
    console.log('Stored user data is: ', userData);
    return userData !== null && userData !== '' && userData !== undefined;
  } catch (error) {
    console.log('Error user registered: ', error);
    return false;
  }
}

export default function App() {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'loadingComplete':
          return {
            ...prevState,
            isLoading: false,
          };
        case 'userRegisteredComplete':
          return {
            ...prevState,
            isUserRegistered: true,
            isLoading: false,
          };
        case 'userLoggedOut':
          return {
            ...prevState,
            isUserRegistered: false,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      isUserRegistered: false,
    }
  );

  const fetchIsRegistered = useCallback(async () => {
    const isRegistered = await checkIsUserRegistered();
    console.log('fetch isUserRegistered: ', isRegistered);
    return isRegistered;
  }, []);

  useEffect(() => {
    console.log('App.js useEffect');
    fetchIsRegistered().then((isRegistered) => {
      if (isRegistered) {
        dispatch({ type: 'userRegisteredComplete' });
      } else {
        dispatch({ type: 'loadingComplete' });
      }
    }).catch((error) => {
      console.log('Error fetching is registered: ', error);
    })
  }, []);


  // Loading fonts
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("./app/assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("./app/assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("./app/assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("./app/assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("./app/assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("./app/assets/fonts/MarkaziText-Medium.ttf"),
  });


  if (!fontsLoaded || authState.isLoading) {
    return <SplashScreen />
  }

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator>
          {authState.isUserRegistered ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen}
                options={{
                  headerTitle: (props) => <ProfileHeader {...props} />,
                }} />
              <Stack.Screen name="Profile" component={ProfileScreen}
                options={{
                  headerTitle: (props) => <ProfileHeader {...props} />,
                }} />
            </>
          ) : (
            <Stack.Screen name="Onboarding" component={OnboardingScreen}
              options={{
                headerShown: false,
              }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );

}
