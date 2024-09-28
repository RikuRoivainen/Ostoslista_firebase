import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

export default function App() {

  const [product, setProduct] = useState({
    title: '',
    amount: ''
  });
  const [items, setItems] = useState([]);

  const database = getDatabase(app);

  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);
      setProduct({ title: '', amount: '' });
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  const handleDelete = (key) => {
    const itemRef = ref(database, `items/${key}`);
    remove(itemRef)
      .catch((error) => {
        Alert.alert('Error', 'Could not remove item: ' + error.message);
      });
  };

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsList = Object.keys(data).map(key => ({
          key: key,  
          ...data[key] 
        }));
        setItems(itemsList);
      } else {
        setItems([]);
      }
    })
  }, []);


  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Product '
        onChangeText={text => setProduct({ ...product, title: text })}
        value={product.title}
        style={styles.input} />
      <TextInput
        placeholder='Amount'
        onChangeText={text => setProduct({ ...product, amount: text })}
        value={product.amount}
        style={styles.input} />
      <Button onPress={handleSave} title="Add to list" />
      <Text style={styles.header}>Shopping list</Text>
      <FlatList
        renderItem={({ item }) =>
          <View style={styles.listContainer}>
            <Text style={{ fontSize: 18 }}>{item.title}, {item.amount}</Text>
            <Button
              title="Delete"
              onPress={() => handleDelete(item.key)} 
              color="#ff5733" 
            />
          </View>}
        data={items}
        keyExtractor={(item) => item.key} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: 20,     
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%', 
  },
  button: {
    marginVertical: 10, 
  },
  listContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
  },
  listItem: {
    fontSize: 18,
    color: '#212529',
  },
});