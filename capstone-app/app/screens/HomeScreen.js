import React, { useEffect, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useNoInitialEffect } from '../lib/useNoInitialEffect';
import MenuFilter from '../components/MenuFilter';
import MenuItem from '../components/MenuItem';

const MENU_DATA_URL = "https://raw.githubusercontent.com/" +
    "Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const menuSections = ["starters", "mains", "desserts"];

const fetchMenuData = async () => {
    try {
        const response = await fetch(MENU_DATA_URL);
        const json = await response.json();
        const menu = json.menu.map((item, index) => ({
            id: index + 1,
            name: item.name,
            price: item.price.toString(),
            description: item.description,
            image: item.image,
            category: item.category,
        }));
        return menu;
    } catch (error) {
        console.error(error);
    }
};

export default function HomeScreen() {
    const [searchBarText, setSearchBarText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [menuData, setMenuData] = useState([]);

    // Entry point for the home screen. 
    useEffect(() => {
        fetchMenuData().then(menu => {
            console.log(menu);
            setMenuData(menu);
        });
    }, []);

    useNoInitialEffect(() => {
        (async () => {
            try {
                console.log(`Search query is: ${searchQuery}`);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [searchQuery]);


    // Search bar functionality
    const setQueryTerm = useCallback((searchTerm) => {
        setSearchQuery(searchTerm);

    }, []);
    const debouncedSetQuery = useMemo(() => debounce(setQueryTerm, 500), [setQueryTerm]);
    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedSetQuery(text);
    };

    // Filter functionality
    const [filterMenuSelections, setFilterSelections] = useState(
        menuSections.map(() => false)
    );
    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterMenuSelections];
        arrayCopy[index] = !filterMenuSelections[index];
        console.log('Filter selections: ', arrayCopy);
        setFilterSelections(arrayCopy);
    };

    // Filter menu data



    





    return (
        <View style={styles.container}>
            <View style={styles.heroSection}>
                <Text style={styles.heroHeader}>Little Lemon</Text>
                <View style={styles.heroBody}>
                    <View style={styles.heroContent}>
                        <Text style={styles.heroHeader2}>Chicago</Text>
                        <Text style={styles.heroText}>
                            We are a family owned Mediterranean restaurant, focused on
                            traditional recipes served with a modern twist.
                        </Text>
                    </View>
                    <Image
                        style={styles.heroImage}
                        source={require("../imgs/Hero image.png")}
                        accessible={true}
                        accessibilityLabel={"Little Lemon Food"}
                    />
                </View>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="#333333"
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={styles.searchBar}
                    iconColor="#333333"
                    inputStyle={{ color: "#333333" }}

                />
            </View>
            <View style={styles.menuSection}>
                <Text style={styles.menuHeader}>ORDER FOR DELIVERY!</Text>
                <MenuFilter
                    selections={filterMenuSelections}
                    onChange={handleFiltersChange}
                    sections={menuSections}
                />
                <FlatList
                    data={menuData}
                    renderItem={({ item }) => <MenuItem item={item}/>}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroSection: {
        backgroundColor: "#495e57",
        padding: 15,
    },
    heroHeader: {
        width: "100%",
        color: "#f4ce14",
        fontSize: 54,
        fontFamily: "MarkaziText-Medium",
    },
    heroBody: {
        width: "100%",
        flexDirection: "row",
    },
    heroContent: {
        flex: 1,
        flexDirection: "column",
        marginRight: 10,
    },
    heroHeader2: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "MarkaziText-Medium",
        marginBottom: 10,
    },
    heroText: {
        color: "#fff",
        fontFamily: "Karla-Medium",
        fontSize: 14,
        alignSelf: 'flex-start',
    },
    heroImage: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginBottom: 10,
    },
    searchBar: {
        backgroundColor: "#e4e4e4",
        shadowRadius: 0,
        shadowOpacity: 0,
    },
    menuSection: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        width: "100%",
        padding: 15,
    },
    menuHeader: {
        fontSize: 20,
        padding: 15,
        fontFamily: "Karla-ExtraBold",
    }
});