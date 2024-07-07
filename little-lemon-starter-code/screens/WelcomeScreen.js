import * as React from 'react';
import { View, Text, Image, Pressable} from 'react-native';
import styles from '../styles';



const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={require('../assets/little-lemon-logo.png')} />
      <Text style={styles.text}>Little Lemon, your local 
        Mediterranearn Bistro</Text>
      <Pressable onPress={() => navigation.navigate('Subscribe')}>
        <Text style={styles.button}>Newsletter</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;

