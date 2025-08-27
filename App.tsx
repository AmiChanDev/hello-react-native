import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Contact = {
  mobile: string;
  first_name: string;
  last_name: string;
  company: string;
}

export default function App() {
  const [mobile, setMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');

  const emptyInputs = (): void => {
    setMobile('');
    setFirstName('');
    setLastName('');
    setCompany('');
  };

  const saveContact = async () => {
    if (!mobile || !firstName || !lastName) {
      Alert.alert("Error", "Please fill in the details");
      return;
    }

    const newContact: Contact = {
      mobile,
      first_name: firstName,
      last_name: lastName,
      company
    };

    try {
      const res = await fetch("*/Web5/SaveContact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { message: res.statusText };

      if (res.ok) {
        Alert.alert("Success", data.message);
        emptyInputs();
      } else {
        Alert.alert("Error", data.message);
      }

    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Book</Text>
      <Text style={styles.text1}>Create a new contact</Text>

      <TextInput
        style={styles.input1}
        placeholder='Mobile'
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input1}
        placeholder='First Name'
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input1}
        placeholder='Last Name'
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input1}
        placeholder='Company'
        value={company}
        onChangeText={setCompany}
      />

      <Pressable
        style={({ pressed }) => [
          styles.pressableButton,
          pressed && { backgroundColor: '#007bffcc' }
        ]}
        onPress={saveContact}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Save</Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  text1: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#555',
  },
  input1: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  pressableButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  }
});
