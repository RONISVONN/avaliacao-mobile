import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';
import ButtonSaveUser from '../../components/ButtonSaveUser';
// Importa função para criar usuário
import { createUser } from '../../services/use.service'; 

type RootStackParamList = {
  ListUsers: undefined;
  NewUser: undefined;
};

type CreateUserPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewUser'>;

const CreateUserPage: React.FC = () => {
  // Obtém a instância de navegação
  const navigation = useNavigation<CreateUserPageNavigationProp>(); 
  // Estado para armazenar o nome do usuário
  const [name, setName] = useState(''); 
  // Estado para armazenar o nome de usuário
  const [username, setUsername] = useState(''); 
  // Estado para armazenar a senha
  const [password, setPassword] = useState(''); 
  // Estado para armazenar a confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState(''); 
  // Estado para armazenar erros
  const [error, setError] = useState<string | null>(null); 
  // Estado para controlar o foco dos campos
  const [isFocused1, setIsFocused1] = useState(false); 
  const [isFocused2, setIsFocused2] = useState(false); 
  const [isFocused3, setIsFocused3] = useState(false); 
  const [isFocused4, setIsFocused4] = useState(false); 
  // Refs para os campos
  const inputRef1 = useRef<TextInput>(null); 
  const inputRef2 = useRef<TextInput>(null); 
  const inputRef3 = useRef<TextInput>(null); 
  const inputRef4 = useRef<TextInput>(null); 

  // Função para validar os campos do formulário
  const validateFields = () => {
    let isValid = true;

    if (!name && !username && !password && !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      setIsFocused1(true);
      setIsFocused2(true);
      setIsFocused3(true);
      setIsFocused4(true);
      isValid = false;
    } else {
      if (!name) {
        setError('O campo Nome é obrigatório.');
        setIsFocused1(true);
        isValid = false;
      } else if (!username) {
        setError('O campo Nome de usuário é obrigatório.');
        setIsFocused2(true);
        isValid = false;
      } else if (!password) {
        setError('O campo Senha é obrigatório.');
        setIsFocused3(true);
        isValid = false;
      } else if (!confirmPassword) {
        setError('O campo Confirmar Senha é obrigatório.');
        setIsFocused4(true);
        isValid = false;
      } else if (password !== confirmPassword) {
        setError('As senhas não coincidem.');
        setIsFocused4(true);
        isValid = false;
      }
    }

    if (isValid) {
      setError(null);
    }

    return isValid;
  };

  // Função para lidar com a criação de usuário
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

      // Cria o novo usuário
      await createUser(newUser); 
      Alert.alert('Sucesso', 'Usuário criado com sucesso.');
      // Navega de volta para a lista de usuários após a criação bem-sucedida
      navigation.navigate('ListUsers'); 
    } catch (error) {
      // Exibe alerta em caso de erro
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário.');
    }
  };

  // Função para lidar com o pressionar do botão de salvar
  const handleButtonPress = () => {
    inputRef1.current?.blur();
    inputRef2.current?.blur();
    inputRef3.current?.blur();
    inputRef4.current?.blur();
    // Chama a função para criar o usuário
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

      <Text style={styles.label}>Confirmar Senha:</Text>
      <TextInput
        ref={inputRef4}
        style={[styles.input, isFocused4 && styles.inputFocused]}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholder="Confirme sua senha"
        placeholderTextColor="#ccc"
        onFocus={() => setIsFocused4(true)}
        onBlur={() => setIsFocused4(false)}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Componente de botão de salvar */}
      <ButtonSaveUser onPress={handleButtonPress} /> 
    </View>
  );
};

export default CreateUserPage;