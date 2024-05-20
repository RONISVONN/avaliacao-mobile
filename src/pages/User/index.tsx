import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonSaveUser from '../../components/ButtonSaveUser';

type RootStackParamList = {
  ListUsers: undefined;
  NewUser: undefined; // Atualizado para corresponder ao nome da tela no App.tsx
};

type CreateUserPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewUser'>;

const CreateUserPage: React.FC = () => {
  const navigation = useNavigation<CreateUserPageNavigationProp>();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  const validateFields = () => {
    let isValid = true;

    if (!name) {
      setError('O campo Nome é obrigatório.');
      setIsFocused1(true);
      isValid = false;
    }

    if (!username) {
      setError('O campo Nome de usuário é obrigatório.');
      setIsFocused2(true);
      isValid = false;
    }

    if (!password) {
      setError('O campo Senha é obrigatório.');
      setIsFocused3(true);
      isValid = false;
    }

    if (isValid) {
      setError(null);
    }

    return isValid;
  };

  const handleCreateUser = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const newUser = {
        name,
        username,
        password,
      };

      // Obtém o token armazenado no AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      const response = await axios.post(
        'http://192.168.15.32:3030/users',
        newUser,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso.');
        navigation.navigate('ListUsers');
      } else {
        Alert.alert('Erro', 'Não foi possível criar o usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário.');
    }
  };

  const handleButtonPress = () => {
    inputRef1.current?.blur();
    inputRef2.current?.blur();
    inputRef3.current?.blur();
    handleCreateUser();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        ref={inputRef1}
        style={[styles.input, isFocused1 && styles.inputFocused]}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
        placeholderTextColor="#ccc"
        onFocus={() => setIsFocused1(true)}
        onBlur={() => setIsFocused1(false)}
      />

      <Text style={styles.label}>Nome de usuário:</Text>
      <TextInput
        ref={inputRef2}
        style={[styles.input, isFocused2 && styles.inputFocused]}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu nome de usuário"
        placeholderTextColor="#ccc"
        onFocus={() => setIsFocused2(true)}
        onBlur={() => setIsFocused2(false)}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        ref={inputRef3}
        style={[styles.input, isFocused3 && styles.inputFocused]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Digite sua senha"
        placeholderTextColor="#ccc"
        onFocus={() => setIsFocused3(true)}
        onBlur={() => setIsFocused3(false)}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <ButtonSaveUser onPress={handleButtonPress} />
    </View>
  );
};

export default CreateUserPage;
