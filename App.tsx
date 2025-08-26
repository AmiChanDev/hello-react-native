import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');  // 👈 Added username state
  const [pass, setPass] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const cities = ['Colombo', 'Gampaha', 'Kegalle', 'Rathnapura'];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createAccount = async () => {
    Alert.alert('Account Created', 'Your account has been successfully created!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollcontent}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Create an account</Text>
        <Text style={styles.pageTitle}>Fill in the information to create your account</Text>
      </View>

      <View style={styles.imageContainer}>
        <Pressable onPress={pickImage} style={styles.imageButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.plus}>+</Text>
              <Text style={styles.addText}>Add Image</Text>
            </View>
          )}
        </Pressable>
      </View>

      <Text style={styles.inputTopic}>Full Name</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Enter your full name..."
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.inputTopic}>Email</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Enter your email..."
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* 👇 New Username field */}
      <Text style={styles.inputTopic}>Username</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Choose a username..."
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.inputTopic}>Password</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Enter password..."
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <Text style={styles.inputTopic}>Confirm Password</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Confirm password..."
        secureTextEntry
        value={confirmPass}
        onChangeText={setConfirmPass}
      />

      <Text style={styles.inputTopic}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select your city..." value="" />
          {cities.map((cityName) => (
            <Picker.Item key={cityName} label={cityName} value={cityName} />
          ))}
        </Picker>
      </View>

      <Pressable style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollcontent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  pageTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 25,
  },
  imageButton: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#aaa',
  },
  addText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  inputTopic: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  inputUser: {
    width: '100%',
    fontSize: 14,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  picker: {
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
