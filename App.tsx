import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, Platform, ScrollView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
          <Text style={styles.title1}>Contact Book</Text>

          <Text style={styles.title2}>Create a new contact</Text>

          <TextInput
            style={styles.input}
            placeholder='Mobile'
            keyboardType='phone-pad'
          />
          <TextInput
            style={styles.input}
            placeholder='Name'
          />

          <Pressable style={styles.pressable}>
            <Text style={styles.pressableText}>Save</Text>
          </Pressable>

          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#001BB7',
    marginBottom: 10,
  },
  title2: {
    fontSize: 20,
    fontStyle: 'italic',
    marginVertical: 10,
    alignSelf: 'flex-start',
    color: '#001BB7'
  },
  input: {
    fontSize: 18,
    marginVertical: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  pressable: {
    marginVertical: 15,
    width: "100%",
    borderRadius: 10,
    height: 45,
    backgroundColor: '#001BB7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressableText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});
