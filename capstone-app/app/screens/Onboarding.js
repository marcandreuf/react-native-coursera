import Header from "../components/Header";
import Registration from "./Registration";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

export default function Onboarding() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Header />
            <Registration />
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});


