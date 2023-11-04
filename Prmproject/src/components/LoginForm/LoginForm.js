
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

 
  const handleLogin = () => {
  
    const hardcodedUsername = 'sarath';
    const hardcodedPassword = 'test@123';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setLoginMessage('Login successful');
      setUsername(''); 
      setPassword('')
      navigation.navigate('Home');
    } else {
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text>{loginMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
});

export default LoginForm;
