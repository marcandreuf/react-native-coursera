import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileHeader = () => {
    const navigation = useNavigation();

    const goBackButton = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }else{
            console.log('Cannot go back');
        }
    };

    return (
        <View style={styles.headerContainer}>
            <View>
                {navigation.canGoBack() && (
                    <TouchableOpacity onPress={() => goBackButton()}>
                        <Image source={require('../imgs/back-arrow.png')} style={styles.icon} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.centerContainer}>
                <Image source={require('../imgs/Logo.png')} style={styles.logo} />
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../imgs/Profile.png')} style={styles.profile} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 80,
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        backgroundColor: 142814,
        borderRadius: 50,
    },
    profile: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginRight: 20,
    },
    logo: {
        height: 50,
        width: 300,
        resizeMode: 'contain',
        alignSelf: 'center',

    },
    centerContainer: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileHeader;
