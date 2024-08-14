import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";

const MenuFilter = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onChange(index);
            }}
            style={{
              flex: 0.9,
              padding: 10,
              backgroundColor: selections[index] ? "#495e57" : "#edefee",
              borderRadius: 9,
              marginRight: 15,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Karla-ExtraBold",
                  color: selections[index] ? "#edefee" : "#495e57",
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {    
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 15,
  },
});

export default MenuFilter;
