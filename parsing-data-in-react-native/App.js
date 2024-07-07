import { FlatList, Text, SafeAreaView, View, StyleSheet } from 'react-native';
import menuItems from './menuItems';




export default App = () => {
  const { menu } = menuItems;

  const Item = ({ title, price }) => (
    <View style={menuStyles.menuContainer}>
      <Text style={menuStyles.menuItmes}>{title}</Text>
      <Text style={menuStyles.menuItmes}>{price}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} price={item.price} />
  );

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon Menu</Text>
      <FlatList data={menu}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={true}/>
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 10
  },
  headerText: {
    color: '#F4CE14',
    fontSize: 30,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItmes: {
    color: '#F4CE14',
    fontSize: 20
  }
});
