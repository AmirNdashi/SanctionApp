import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '1234') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Invalid Password', 'Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* <Button title="Login" onPress={handleLogin} style={{backgrondColor: 'green'}} /> */}

      <TouchableOpacity
              style={{backgroundColor: 'green', padding: 7, borderRadius: 10, alignItems: 'center', justifyContent: 'center',}}
              onPress={handleLogin}
            >
              <Text style={{fontSize: 22, color: '#fff',}}>Login</Text>
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    marginLeft: '40%',
  },
  input: {
    width: '100%',
    height: '50',
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default LoginScreen;