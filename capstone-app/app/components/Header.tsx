import { Text, View, Image, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1}>
                Little Lemon</Text>
            <Image source={require('../imgs/Logo.png')}
                style={{ width: 230, height: 50 }}
                accessible={true}
                accessibilityLabel='Little lemon logo' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        paddingLeft: 20,
        fontWeight: 'bold',
        textAlign: 'center', fontSize: 20,
        color: 'black'
    }
});