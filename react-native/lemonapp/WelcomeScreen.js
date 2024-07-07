import React, { useState } from "react";
import {
    View, Text, ScrollView, TextInput,
    StyleSheet, ImageBackground, useColorScheme,
    useWindowDimensions, Pressable
} from "react-native";
import { useDeviceOrientation, userDeviceOrientation } from '@react-native-community/hooks'

export default function WelcomeScreen({ navigation }) {
    const { firstName, onChangeFirstName } = useState('');
    const colorScheme = useColorScheme();
    const { height, width, fontScale } = useWindowDimensions();
    const orientation = useDeviceOrientation();
    return (
        <View style={
            [styles.container,
            colorScheme === 'light'
                ? { backgroundColor: '#fff' }
                : { backgroundColor: '#000' }
            ]}>
            <ImageBackground
                resizeMode="contain"
                style={styles.imgBackground}
                source={require('./img/littleLemonBackground.png')}>

                <ScrollView
                    indicatorStyle={'white'}
                    style={{ flex: 0.9 }} >
                    <Text style={{
                        padding: 40, fontWeight: 'bold',
                        fontSize: 50, color: 'grey',
                        textAlign: 'center'
                    }}>Welcome to Little Lemon</Text>
                    <Text style={{
                        fontSize: 28, padding: 20,
                        marginVertical: 8, color: 'black',
                        textAlign: 'center'
                    }}> Little Lemon is a charming neighborhood bistro that serves
                        simple food and classic cocktails in a lively
                        but casual environment.
                    </Text>
                    <Text style={styles.regular}>Window Dimensions</Text>
                    <Text style={styles.regular}>Height: {height}</Text>
                    <Text style={styles.regular}>Width: {width}</Text>
                    <Text style={styles.regular}>Font scale: {fontScale}</Text>
                    <Text style={styles.regular}>Orientation: {orientation}</Text>
                    {/* <TextInput
                        style={styles.inputBox}
                        value={firstName}
                        onChangeText={onChangeFirstName}
                        placeholder={'First Name'}
                    /> */}
                    <Pressable
                        style={styles.button}
                        onPress={()=>{navigation.navigate("Menu")}}
                        >                        
                        <Text style={styles.buttonText} >View menu</Text>
                    </Pressable>
                    <Text style={{ fontSize: 40, flexWrap: 'wrap', color: 'white' }}></Text>
                </ScrollView>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputBox: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: 'EDEFEE',
        backgroundColor: '#EDEFEE',
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        fontSize: 22,
        padding: 10,
        marginVertical: 8,
        margin: 40,
        backgroundColor: '#F4CE14',
        borderColor: '#EDEFEE',
        borderWidth: 2,
        borderRadius: 12
    },
    buttonText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 32,
    }
});