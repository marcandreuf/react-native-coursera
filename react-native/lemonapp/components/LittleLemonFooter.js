import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LittleLemonFooter() {
    return (
        <View style={headerStyles.container}>
            <Text style={headerStyles.text}>
                All rights reserved by Little Lemon, 2022 {' '}
            </Text>
        </View>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F4CE14'
    },
    text: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    }
});