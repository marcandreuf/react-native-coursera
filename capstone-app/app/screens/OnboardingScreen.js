import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

export default function OnboardingScreen() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header />
            <RegistrationForm />
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});


