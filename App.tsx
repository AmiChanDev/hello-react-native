import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollcontent}>
      <View>
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

      <Text style={styles.inputTopic}>Username</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Enter username..."
        value={text}
        onChangeText={setText}
      />
      <Text style={styles.inputTopic}>Password</Text>
      <TextInput
        style={styles.inputUser}
        placeholder="Enter pass..."
        value={pass}
        onChangeText={setPass}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:35,
    flex: 1,
    backgroundColor: 'white',
  },
  scrollcontent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#aaa',
  },
  addText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  inputTopic: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  inputUser: {
    textAlign: 'center',
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8, 
    padding: 10,
    marginVertical: 10, 
  },
});
