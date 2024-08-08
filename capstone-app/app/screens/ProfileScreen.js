import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import LittleLemonHeader from '../components/LittleLemonHeader';
import ProfileForm from '../components/ProfileForm';

export default function ProfileScreen({navigation}) {
    return (
        <KeyboardAvoidingView style={styles.container}>            
            <ProfileForm navigation={navigation} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
