import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification';


const PUBLIC_URL = "https://72e20cbc7e7e.ngrok-free.app";

export default function SignUpScreen() {
  const [image, setImage] = useState<string | null>(null);

  const [selectedCity, setSelectedCity] = useState("");

  const [getCities, setCities] = React.useState<{ id: number; name: string }[]>(
    []
  );



  useEffect(() => {

    const laodCitites = async () => {

      const response = await fetch(PUBLIC_URL + "/Notebook/LoadCitites");
      if (response.ok) {
        const json = await response.json();
        setCities(json);
        console.log(json);
      } else {
        console.error("city loading fail");
      }

    }

    laodCitites();

  }, []);



  const [getFulLName, setFulLName] = React.useState("");
  const [getUsername, setUsername] = React.useState("");
  const [getEmail, setEmail] = React.useState("");
  const [getPassword, setPassword] = React.useState("");
  const [getConfirmPassword, setConfirmPassword] = React.useState("");

  // const cities = ["Colombo", "Kandy", "Gampaha", "Matara", "Kalutara"];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1], // square profile image
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(image);
    }


  };

  return (


    <AlertNotificationRoot>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>



        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.pageTitle}>Create Account</Text>
            <Text style={styles.subTitle}>
              Fill in this information to create your account
            </Text>
          </View>

          {/* Image Picker */}
          <View style={styles.imageWrapper}>
            <Pressable onPress={pickImage} style={styles.imageContainer}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.plus}>＋</Text>
                  <Text style={styles.addImageText}>Add Image</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert your Full name"
              onChangeText={setFulLName}
              value={getFulLName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert your Username"
              onChangeText={setUsername}
              value={getUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert your Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={getEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert your Password"
              secureTextEntry
              onChangeText={setPassword}
              value={getPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Insert your Confirm Password"
              secureTextEntry
              onChangeText={setConfirmPassword}
              value={getConfirmPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select City</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedCity}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
              >
                <Picker.Item label="Select your city" value={""} />
                {
                  getCities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.id} />
                  ))
                }
              </Picker>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>

            <Pressable style={styles.saveButton}
              onPress={async () => {



                let formData = new FormData();

                formData.append("fullName", getFulLName);
                formData.append("username", getUsername);
                formData.append("email", getEmail);
                formData.append("password", getPassword);
                formData.append("confirmPassword", getConfirmPassword);
                formData.append("city", selectedCity);
                if (image) {
                  formData.append("profileImage",
                    {
                      uri: image,
                      name: "profile.jpg",
                      type: "image/jpg"
                    } as any);
                }


                const response = await fetch(PUBLIC_URL + "/Notebook/NewAccount", {
                  method: "POST",
                  body: formData,
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

                if (response.ok) {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: "Success",
                    textBody: "Congrats! Account created successfully",
                  });
                } else {
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Error",
                    textBody: "Failed to create account. Please try again.",
                  });
                }




              }}

            >


              <Text style={styles.saveButtonText}>Create Account</Text>
            </Pressable>
          </View>


        </ScrollView>



      </SafeAreaView>
    </AlertNotificationRoot>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  scrollContent: {
    padding: 20,
    alignItems: "center",
  },

  header: {
    marginBottom: 32,
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  subTitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  imageWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },

  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    fontSize: 36,
    color: "#888",
    marginBottom: 4,
  },

  addImageText: {
    fontSize: 14,
    color: "#666",
  },

  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#222",
  },

  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  picker: {
    height: 50,
    width: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  backButton: {
    backgroundColor: "#ccc",          // light gray
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginRight: 10,                   // space between buttons
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: "#007BFF",       // blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginLeft: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },


});
