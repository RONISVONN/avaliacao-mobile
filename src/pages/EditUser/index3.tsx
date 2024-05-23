import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ButtonSaveUser from '../../components/ButtonSaveUser';
import { getUserById, updateUser } from '../../services/use.service';

import styles from './styles';

// Define os tipos para os parâmetros de navegação
type RootStackParamList = {
  ListUsers: undefined;
  NewUser: undefined;
  EditUser: { userId: string };
};

// Define os tipos para as props de navegação e rota
type EditUserPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditUser'>;
type EditUserPageRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

const EditUserPage: React.FC = () => {
  // Inicializa as props de navegação e rota
  const navigation = useNavigation<EditUserPageNavigationProp>();
  const route = useRoute<EditUserPageRouteProp>();
  const { userId } = route.params; // Obtém o userId dos parâmetros da rota

  // Inicializa as variáveis de estado para detalhes do usuário e estados de foco dos inputs
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  // Cria referências para os campos de texto
  const inputRef1 = useRef<TextInput>(null);
  const inputRef2 = useRef<TextInput>(null);
  const inputRef3 = useRef<TextInput>(null);

  // Busca os dados do usuário quando o componente é montado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Busca o usuário pelo ID
        const user = await getUserById(userId); 
        setName(user.name);
        setUsername(user.username);
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');
      }
    };

    fetchUser();
  }, [userId]);

  // Valida os campos de entrada
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

  // Manipula a atualização do usuário
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

      // Chama o serviço updateUser
      await updateUser(userId, updatedUser); 
      Alert.alert('Sucesso', 'Usuário atualizado com sucesso.');
      // Navega de volta para a lista de usuários
      navigation.navigate('ListUsers'); 
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o usuário.');
    }
  };

  // Manipula o evento de pressionar o botão
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