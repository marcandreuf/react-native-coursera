import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileScreen from './app/screens/ProfileScreen';
import SplashScreen from './app/screens/SplashScreen';
import ProfileHeader from './app/components/ProfileHeader';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(null);

  const fetchIsRegistered = useCallback( async () => {
    const isRegistered = await checkIsUserRegistered();
    console.log('fetch isUserRegistered: ', isRegistered);
    return isRegistered;
  },[]);

  useEffect(() => {
    fetchIsRegistered().then((isRegistered) => {
      setIsUserRegistered(isRegistered);
    }).catch((error) => {
      console.log('Error fetching is registered: ', error);
    })
  }, []);

  useEffect(() => {
    console.log('useEffect isUserRegistered: ', isUserRegistered);
    if (isUserRegistered !== null) {
      setIsLoading(false);
      console.log('finished loading');
    }
  }, [isUserRegistered])


  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserRegistered ? 'Profile' : 'Onboarding'}>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerTitle: (props) => <ProfileHeader {...props} />,
          }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={
            {
              headerShown: false,
            }
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
