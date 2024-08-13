import { ScrollView, View, StyleSheet, Text, Image, TextInput, Pressable } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from './Checkbox';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import InitialsIcon from './InitialsIcon';
import AuthContext from '../contexts/AuthContext.js';

export default function ProfileForm() {

   const { dispatch } = useContext(AuthContext);

   const [image, setImage] = useState(null);
   const [firstName, setFirstName] = useState('');
   const [email, setEmail] = useState('');
   const [lastName, setLastName] = useState('');
   const [phone, setPhone] = useState('');
   const [address, setAddress] = useState('');
   const [isOrderStatuses, setIsOrderStatuses] = useState(false);
   const [isPasswordChanged, setIsPasswordChanged] = useState(false);

   const loadProfile = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const data = JSON.parse(userData);
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setEmail(data?.email);
      setPhone(data?.phone);
      setAddress(data?.address);
      setIsOrderStatuses(data?.isOrderStatuses);
      setIsPasswordChanged(data?.isPasswordChanged);
      setImage(data?.image);
   }

   useEffect(() => {
      loadProfile();
   }, []);

   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
      }
   }

   const saveChanges = async () => {
      try {
         const userData = {
            firstName: firstName,
            email: email,
            lastName: lastName,
            phone: phone,
            address: address,
            isOrderStatuses: isOrderStatuses,
            isPasswordChanged: isPasswordChanged,
            image: image
         };
         await AsyncStorage.setItem('userData', JSON.stringify(userData));
         console.log('Form stored.')
      } catch (error) {
         console.log('Error saving email: ', error);
      }
   }

   const logOutBtn = async () => {      
      try {
         await AsyncStorage.clear();
         console.log('Storage cleared');
         dispatch({ type: 'userLoggedOut'});
      } catch (error) {
         console.log('Error cleaning storage: ', error);
      }
   }


   return (
      <ScrollView style={styles.container}>
         <Text style={styles.title} numberOfLines={1}>
            Personal information
         </Text>
         <Text style={styles.sectionTitle}>
            Avatar
         </Text>
         <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
               {image ?
                  (<Image source={{ uri: image }} style={styles.avatar} />)
                  :
                  (<InitialsIcon initials={getUserInitials(firstName, lastName)} />)
               }
               <Pressable style={styles.uploadImgBbutton} onPress={pickImage}>
                  <Text style={styles.uploadImgBbuttonText} >Upload</Text>
               </Pressable>
            </View>
            <Pressable style={styles.button}
               onPress={() => console.log('Change button pressed!')}>
               <Text style={styles.buttonText}>Change</Text>
            </Pressable>
            <Pressable style={styles.removeButton}
               onPress={() => console.log('Remove button pressed!')}>
               <Text style={styles.removeButtonText}>Remove</Text>
            </Pressable>
         </View>
         <Text style={styles.text}>First Name</Text>
         <TextInput
            style={styles.input}
            placeholder='First Name'
            required
            value={firstName}
            onChangeText={setFirstName} />
         <Text style={styles.text}>Last Name</Text>
         <TextInput style={styles.input}
            placeholder='Last Name'
            required
            value={lastName}
            onChangeText={setLastName} />
         <Text style={styles.text}>Email</Text>
         <TextInput style={styles.input}
            placeholder='Email'
            required
            value={email}
            onChangeText={setEmail} />
         <Text style={styles.text}>Phone Number</Text>
         <MaskedTextInput style={styles.input}
            mask='+1 (999) 999-9999'
            placeholder='+1 (555) 555-5555'
            required
            value={phone}
            onChangeText={(_, rawText) => {
               //console.log('Raw text:', rawText);
               setPhone(rawText);
            }} />
         <Text style={styles.text}>Address</Text>
         <TextInput style={styles.multilineInput}
            placeholder='Address'
            multiline
            numberOfLines={5}
            value={address}
            onChangeText={setAddress} />
         <Text style={styles.title}>Email notifications</Text>
         <View style={styles.emailSettings}>
            <Checkbox isChecked={isOrderStatuses}
               label='Order statuses'
               value={isOrderStatuses}
               onPress={() => {
                  setIsOrderStatuses(!isOrderStatuses);
                  //console.log('Order statuses checkbox pressed!');
               }}
            />
            <Checkbox isChecked={isPasswordChanged}
               label='Password changes'
               value={isPasswordChanged}
               onPress={() => {
                  setIsPasswordChanged(!isPasswordChanged);
                  //console.log('Password changes checkbox pressed!');
               }}
            />
         </View>
         <Pressable style={styles.logoutButton}
            onPress={logOutBtn}>
            <Text style={styles.logoutButtonText}>Log out</Text>
         </Pressable>
         <View style={styles.actionButtonsContainer}>
            <Pressable style={styles.removeButton}
               onPress={() => console.log('Discard changes button pressed!')}>
               <Text style={styles.removeButtonText}>Discard changes</Text>
            </Pressable>
            <Pressable style={styles.saveButton}
               onPress={saveChanges}>
               <Text style={styles.saveButtonText}>Save changes</Text>
            </Pressable>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      padding: 20,
      marginBottom: 20,
   },
   text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
   },
   multilineInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      textAlignVertical: 'top',
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingBottom: 20
   },
   sectionTitle: {
      fontSize: 12,
      fontStyle: 'italic',
      marginBottom: 10,
   },
   avatar: {
      width: 95,
      height: 75,
      borderRadius: 75,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'space-evenly'
   },
   uploadImgBbutton: {
      backgroundColor: '#495E57',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      margin: 10

   },
   uploadImgBbuttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
   },
   button: {
      backgroundColor: '#495E57',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      marginLeft: 10,
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
   },
   removeButton: {
      borderWidth: 1,
      borderColor: '#495E57',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginLeft: 5,
   },
   removeButtonText: {
      color: '#495E57',
      fontWeight: 'bold',
      fontSize: 18,
   },
   emailSettings: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 20,
   },
   logoutButton: {
      backgroundColor: '#f6e71e',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#eb780c',
      marginBottom: 20,
   },
   logoutButtonText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center'
   },
   actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
   },
   saveButton: {
      backgroundColor: '#495E57',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 5,
      marginLeft: 10,
   },
   saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18,
   }
});

export function getUserInitials(firstName, lastName) {
   let initials = '';
   if (firstName !== undefined && firstName.length !== 0) {
      initials = firstName.toUpperCase().charAt(0);
   }
   if( lastName !== undefined && lastName.length !== 0) {
      return initials + lastName.toUpperCase().charAt(0);
   }
   return initials;
}


