import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './app/screens/ProfileScreen';
import SplashScreen from './app/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function checkIsUserRegistered() {
  try {
    await sleep(500);
    const email = await AsyncStorage.getItem('email');
    console.log('Stored email is: ', email);
    return email !== null && email !== '' && email !== undefined;    
  } catch (error) {
    console.log('Error user registered: ', error);
    return false;
  }
}


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  
  const fetchIsRegistered = useCallback(async () => {
    const isRegistered = await checkIsUserRegistered();
    console.log('isUserRegistered: ', isRegistered);
    setIsUserRegistered(isRegistered);
  },[]);

  useEffect(() => {
    fetchIsRegistered();
  }, []);

  useEffect(() => {
    console.log('isLoading: ', isLoading);
    if (isUserRegistered) {      
      setIsLoading(false);
      console.log('finished loading');
    }
  }, [isUserRegistered]);

  if (isLoading) {
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer>      
      <Stack.Navigator initialRouteName="Onboarding">
        {isUserRegistered ? (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
