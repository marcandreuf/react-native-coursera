import { View, StyleSheet, Text, Platform, TextInput, Pressable } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../contexts/AuthContext';

export default function RegistrationForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);

    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        updateIsValidForm();
    }, [firstName, email]);

    function updateIsValidForm() {
        if (checkValidForm()) {
            setIsValidForm(true);
        } else {
            setIsValidForm(false);
        }
    }

    function checkValidForm() {
        //console.log(`firstname: '${firstName}', email: '${email}'`);
        const isNameValid = firstName.trim().length > 0;
        //console.log("isNameValid: ", isNameValid);
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isvalid = isNameValid && isEmailValid;
        //console.log("isvalid: ", isvalid);
        return isvalid;
    }

    const nextBtn = async () => {
        const userData = {
            firstName: firstName,
            email: email
        };
        console.log('data: ', userData);                    
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            console.log(`Stored user data ${userData}.`);
        } catch (error) {
            console.log('Error saving email: ', error);
        }
        setFirstName('');
        setEmail('');
        dispatch({ type: 'userRegisteredComplete'});                    
    };

    return (
        <View
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.title} numberOfLines={1}>
                Let us get to know you!
            </Text>
            <Text style={styles.regularText}>First Name</Text>
            <TextInput
                style={styles.input}
                required
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text style={styles.regularText}>Email</Text>
            <TextInput
                style={styles.input}
                required
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <Pressable
                style={!isValidForm ? styles.buttonDisabled : styles.button}
                disabled={!isValidForm}
                onPress={nextBtn}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.85,
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        padding: 50,
        paddingBottom: 80
    },
    regularText: {
        fontSize: 20,
        padding: 5,
        marginVertical: 8,
        color: 'black',
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: "70%",
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        fontSize: 16,
        borderColor: 'EDEFEE',
    },
    button: {
        width: "70%",
        height: 40,
        padding: 5,
        marginVertical: 15,
        backgroundColor: '#F4CE14',
        borderColor: '#EDEFEE',
        borderWidth: 2,
        borderRadius: 12
    },
    buttonDisabled: {
        width: "70%",
        height: 40,
        padding: 5,
        marginVertical: 15,
        backgroundColor: '#EDEFEE',
        borderColor: '#a3a3a3',
        borderWidth: 2,
        borderRadius: 12
    },
    buttonText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 18,
    },

});
