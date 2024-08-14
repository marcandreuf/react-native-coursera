
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MENU_DATA_IMG_URL = "https://github.com/Meta-Mobile-Developer-PC/" +
    "Working-With-Data-API/blob/main/images/";

export default MenuItem = ({item}) => (
    <View style={styles.menuItem}>
        <View style={styles.menuItemBody}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
        </View>
        <Image
            style={styles.menuItemImage}
            source={{
                uri: `${MENU_DATA_IMG_URL + item.image}?raw=true`,
            }}
        />
    </View>
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        paddingVertical: 10,        
    },
    menuItemBody: {
        flex: 1,
    },
    menuItemName: {
        fontSize: 20,
        color: "#000000",
        paddingBottom: 5,
        fontFamily: "Karla-Bold",
    },
    menuItemDescription: {
        color: "#495e57",
        paddingRight: 5,
        fontFamily: "Karla-Medium",
    },
    menuItemPrice: {
        fontSize: 20,
        color: "#EE9972",
        paddingTop: 5,
        fontFamily: "Karla-Medium",
    },
    menuItemImage: {
        width: 100,
        height: 100,
    }
});

