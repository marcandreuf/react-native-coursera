import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>Profile Page</Text>
            <Pressable style={styles.button}
                onPress={
                    async () => {
                        try {
                            await AsyncStorage.clear();
                            console.log('Storage cleared');
                        } catch (error) {
                            console.log('Error cleaning storage: ', error);
                        }
                    }
                }>
                <Text style={{ color: 'white' }}>Clean storage</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: { backgroundColor: 'blue', padding: 10, margin: 10 }
});
