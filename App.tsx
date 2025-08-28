import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Storage</Text>

      <Text style={styles.title}>List View</Text>
      <FlatList
        data={[{ name: 'Sahan' }, { name: 'Danusi' }, { name: 'Amantha' }]}
        renderItem={({ item }) => (
          <Button title={item.name} />
        )}
      />

      <Button title='Save' onPress={async () => {
        try {
          await AsyncStorage.setItem('name', 'sahan');
          Alert.alert('done');
        } catch {

        }
      }} />

      <Button title='View' onPress={async () => {
        try {
          const name = await AsyncStorage.getItem('name');
          Alert.alert(name ? name : 'No name found');
        } catch {

        }
      }} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  }
});
