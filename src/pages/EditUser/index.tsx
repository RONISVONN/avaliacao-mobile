import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonSaveUser from '../../components/ButtonSaveUser';

type RootStackParamList = {
  ListUsers: undefined;
  NewUser: undefined;
  EditUser: { userId: string };
};

type EditUserPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditUser'>;
type EditUserPageRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

const EditUserPage: React.FC = () => {
  const navigation = useNavigation<EditUserPageNavigationProp>();
  const route = useRoute<EditUserPageRouteProp>();
  const { userId } = route.params;

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('Token não encontrado');
          return;
        }

        const response = await axios.get(`http://192.168.15.32:3030/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });

        if (response && response.data) {
          setName(response.data.name);
          setUsername(response.data.username);
        } else {
          setError('Erro ao buscar dados do usuário.');
        }
      } catch (error) {
        setError('Erro ao buscar dados do usuário.');
      }
    };

    fetchUserData();
  }, [userId]);

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

  const handleUpdateUser = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      const updatedUser = {
        name,
        username,
        password,
      };

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      const response = await axios.put(
        `http://192.168.15.32:3030/users/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso.');
        navigation.navigate('ListUsers');
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o usuário.');
    }
  };

  const handleButtonPress = () => {
    inputRef1.current?.blur();
    inputRef2.current?.blur();
    inputRef3.current?.blur();
    handleUpdateUser();
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

export default EditUserPage;