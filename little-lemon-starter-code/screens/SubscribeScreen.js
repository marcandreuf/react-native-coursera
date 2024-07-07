import React, { useState } from 'react';
import {
  View, Text, Image, TextInput,
  Pressable, Alert
} from 'react-native';
import styles from '../styles';
import { validateEmail } from '../utils/index';

const SubscribeScreen = () => {
  const [email, onChangeEmail] = useState('');
  const [isSubscribeBtnEnabled, setisSubscribeBtnEnabled] = useState(false);  

  function onTypeEmail(email){
    if(validateEmail(email)){
      console.log("valid email");
      setisSubscribeBtnEnabled(true);
    } else {
      console.log("not valid email")
      setisSubscribeBtnEnabled(false);
    }
    onChangeEmail(email);
  }

  function subscribe(){
    Alert.alert(
      "Thanks for subscribing, stay tuned!",
      null,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    )
  }
  
  
  return (
    <View style={styles.newsletterContainer}>
      <Image
        style={styles.imageNewsletter}
        resizeMode='contain'
        source={require('../assets/little-lemon-logo-grey.png')} />

      <Text style={styles.text}>Subscribe to our newsletter for
        our latest delicious recipies!</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={onTypeEmail}
        keyboardType='email-address'
        placeholder='Type your email' />

      <Pressable
         disabled={!isSubscribeBtnEnabled}         
         onPress={subscribe}
         style={({pressed})=>[
            isSubscribeBtnEnabled && !pressed && styles.button,
            isSubscribeBtnEnabled && pressed && styles.buttonPressed,
            !isSubscribeBtnEnabled && styles.disabledButton]}>
        <Text style={[
          styles.buttonText,
          !isSubscribeBtnEnabled && styles.disabledText]}>Subscribe</Text>
      </Pressable>

    </View>
  );
};

export default SubscribeScreen;


