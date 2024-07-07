import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';
import WelcomeScreen from './WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './FeedbackForm';
import FeedbackFormAvoidView from './FeedbackFormAvoidView';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


function LogoTitle() {
  return (
    <Image source={require('./img/littleLemonLogo.png')}
      style={{
        height: 40,
        width: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginLeft: '10%',
      }} />
  )
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <LittleLemonHeader />
          {/* <Stack.Navigator initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#333333'                
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 23
              }
            }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}
              options={{ title: 'Home',
                headerTitle: (props) => <LogoTitle {...props}/>,
                headerTitleStyle: {
                  color: 'red',
                  fontSize: 18         
                }}} />
            <Stack.Screen name="Feedback" component={FeedbackForm} />
            <Stack.Screen name="Menu" component={MenuItems} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator> */}
          {/* <WelcomeScreen/> */}
          {/* <MenuItems /> */}
          {/* <FeedbackForm /> */}
          {/* <FeedbackFormAvoidView/> */}
          {/* <LoginScreen/> */}
          {/* <Tab.Navigator
            initialRouteName='Login' 
            screenOptions={({route})=> ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if(route.name === 'Welcome'){
                  iconName = focused? 'home' : 'home-outline';
                }else if(route.name === 'Menu'){
                  iconName = focused? 'list' : 'list-outline';
                }else if(route.name === 'Login'){
                  iconName = focused? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray'
            })}>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            <Tab.Screen name="Menu" component={MenuItems} />
            <Tab.Screen name="Login" component={LoginScreen} />
          </Tab.Navigator> */}
          <Drawer.Navigator
            // useLegacyImplementation. Not supported on Reanimated 3
            initialRouteName='Login'
            screenOptions={{ drawerPosition: 'right', drawerActiveTintColor: 'red', drawerStyle: { backgroundColor: '#333333' } }}>
            <Drawer.Screen name="Welcome" component={WelcomeScreen} />
            <Drawer.Screen name="Menu" component={MenuItems} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          </Drawer.Navigator>
        </View>
        <View style={{ backgroundColor: '#495E57' }}>
          <LittleLemonFooter />
        </View>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57'
  },
});
