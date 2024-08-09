import * as React from 'react';
import { View, Text } from 'react-native';

export default function LittleLemonHeader() {
    return (
        <View style={{ flex: 0.15, 
                        backgroundColor: '#F4CE14' }}>
            <Text style={{ padding: 40, fontWeight: 'bold', 
                textAlign: 'center', fontSize: 30, 
                color: '#0b5b10' }} numberOfLines={1}>
                Little Lemon</Text>
        </View>
    );
}

