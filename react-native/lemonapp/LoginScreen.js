import { useState } from 'react';
import {
    ScrollView, Text, StyleSheet, TextInput,
    KeyboardAvoidingView, Platform, Pressable, Image
} from 'react-native';

export default function LoginScreen({navigation}) {
    const [userLogin, onChangeUserLogin] = useState('');
    const [userPass, onChangeUserPass] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.container}>
                <Image resizeMode='contain'
                    style={styles.logo}
                    source={require("./img/littleLemonLogo.png")}
                    accessible={true}
                    accessibilityLabel='Little lemon logo' />
                <Image
                    style={styles.image}
                    source={require('./img/tableCoverPicture.png')}
                    resizeMode="cover"
                    accessible={true}
                    accessibilityLabel={'Table cover picture'}/>                
                <Text style={styles.headerText}>Welcome to Little Lemon</Text>
                <Text style={styles.regularText}>Login to continue </Text>
                <TextInput
                    style={styles.input}
                    value={userLogin}
                    onChangeText={onChangeUserLogin}
                    keyboardType='email-address'
                    placeholder='valid email address'
                />
                <TextInput
                    style={styles.input}
                    value={userPass}
                    onChangeText={onChangeUserPass}
                    maxLength={14}
                    secureTextEntry={true}
                    placeholder='password'
                    keyboardType={'default'}
                    caretHidden={true} //Hides the blinking cursor
                />
                {userLoggedIn && (
                    <>
                        <Text style={styles.regularText}>
                            You are logged in!
                        </Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                setUserLoggedIn(!userLoggedIn);
                            }}>
                            <Text style={styles.buttonText}>
                                Log out
                            </Text>
                        </Pressable>
                    </>
                )}
                {!userLoggedIn && (
                    <>
                        <Text style={styles.regularText}>
                            You are not logged in
                        </Text>

                        {/* <Pressable>
                            "Click me!"
                        </Pressable> */}
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                if (userLogin && userPass
                                    && userLogin.includes('@')
                                    && userPass.length >= 8
                                    && userPass && userPass.length <= 14
                                    && userPass === "12345678") {
                                    console.log(
                                        'User logged in with email: ',
                                        userLogin,
                                        ' and password: ',
                                        userPass
                                    )
                                    setUserLoggedIn(!userLoggedIn);
                                    navigation.navigate('Welcome');
                                }
                            }}>
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    headerText: {
        padding: 5,
        fontSize: 30,
        color: 'black',
        textAlign: 'center',
    },
    regularText: {
        fontSize: 18,
        padding: 5,
        marginVertical: 8,
        color: 'black',
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        borderColor: 'EDEFEE',
        backgroundColor: '#F4CE14',
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
    },
    logo: {
        height: 100,
        width: 300,
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    image: {
        height: 200,
        width: 300,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#EDEFEE',
    }
});