import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserInitials } from './ProfileForm';
import InitialsIcon from './InitialsIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileHeader = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [profileInitials, setProfileInitials] = useState(null);

    const loadProfile = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            const data = JSON.parse(userData);
            const fname = data?.firstName;
            const lname = data?.lastName;
            setProfileInitials(getUserInitials(fname, lname));
            setProfileImage(data?.image);
        } catch (error) {
            console.log('Error loading user data: ', error);
        }
    }    
    
    useEffect(() => {
        loadProfile()           
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.centerContainer}>
                <Image source={require('../imgs/Logo.png')} style={styles.logo} />
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profile} />
                    ) : (
                        <InitialsIcon initials={profileInitials} size={60} />
                    )}                    
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 0.95,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 80,
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
        backgroundColor: '#0b5b10',
        borderRadius: 50,
    },
    profile: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginLeft: 10,
    },
    logo: {
        height: 50,
        width: 250,
        resizeMode: 'contain',
        alignSelf: 'center',

    },
    centerContainer: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileHeader;
