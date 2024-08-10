import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import LittleLemonHeader from '../components/LittleLemonHeader';
import ProfileForm from '../components/ProfileForm';

export default function ProfileScreen() {
    return (
        <KeyboardAvoidingView style={styles.container}>            
            <ProfileForm />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
