import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    newsletterContainer: {
        flex: 1,
        justifyContent: 'center',
        marginTop: "-70%",
        margin: 20
    },
    image: {
        height: 200,
        width: 300,
        alignSelf: 'center',
        marginBottom: "10%"

    },
    imageNewsletter: {
        height: 100,
        width: 150,
        alignSelf: 'center',
        marginBottom: "10%"
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: "10%",
        paddingHorizontal: 30,
    },
    button: {
        backgroundColor: '#495E57',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,

    },
    input: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        borderStyle: 'solid',
        borderColor: '#495E57',
        borderWidth: 1,

    },
    disabledButton: {
        backgroundColor: 'gray',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    disabledText: {
        color: '#aaa',
    },
    buttonPressed: {
        backgroundColor: 'darkblue',
        opacity: 0.8,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        fontWeight: 'bold'
    }
});

export default styles;

