import { ScrollView, View, StyleSheet, Text, Image, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from './Checkbox';

export default function ProfileForm({navigation}) {

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
        setEmail(data?.email);
    }

    useEffect(() => {
        loadProfile();
    }, []);


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title} numberOfLines={1}>
                Personal information
            </Text>
            <Text style={styles.sectionTitle}>
                Avatar
            </Text>
            <View style={styles.avatarContainer}>
                <Image source={require('../imgs/Profile.png')}
                    style={styles.avatar} />
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
            />
            <Text style={styles.text}>Last Name</Text>
            <TextInput style={styles.input}
                placeholder='Last Name'
                required
                value={lastName}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input}
                placeholder='Email'
                required
                value={email}
            />
            <Text style={styles.text}>Phone Number</Text>
            <TextInput style={styles.input}
                placeholder='Phone Number'
                required
                value={phone}
            />
            <Text style={styles.text}>Address</Text>
            <TextInput style={styles.multilineInput}
                placeholder='Address'
                multiline
                numberOfLines={5}
                value={address}
            />
            <Text style={styles.title}>Email notifications</Text>
            <View style={styles.emailSettings}>
                <Checkbox isChecked={false}
                    label='Order statuses'
                    value={isOrderStatuses}
                    onPress={() => console.log('Order statuses checkbox pressed!')}
                />
                <Checkbox isChecked={false}
                    label='Password changes'
                    value={isPasswordChanged}
                    onPress={() => console.log('Password changes checkbox pressed!')}
                />
            </View>
            <Pressable style={styles.logoutButton}
                onPress={
                    async () => {
                        try {
                            await AsyncStorage.clear();
                            console.log('Storage cleared');
                            navigation.navigate('Onboarding');
                            //navigator.navigate('Onboarding');
                        } catch (error) {
                            console.log('Error cleaning storage: ', error);
                        }
                    }
                }>
                <Text style={styles.logoutButtonText}>Log out</Text>
            </Pressable>
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
        width: 50,
        height: 50,
        borderRadius: 75,
        marginBottom: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-evenly'
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
        fontSize:20,
        textAlign: 'center'
    }
});