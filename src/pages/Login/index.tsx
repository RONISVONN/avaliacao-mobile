import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from 'react-native';
import MyTextInput from "../../components/MyTextInput";
import MyButton from "../../components/MyButton";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { authService } from '../../services/auth.service';

import styles from "./styles";

// Defina o tipo de retorno para useNavigation()
type RootStackParamList = {
  ListUsers: undefined;
};

type NavigationType = NavigationProp<RootStackParamList>;

const LoginPage = () => {
  // Obtém a instância de navegação
  const navigation = useNavigation<NavigationType>();

  // Estados para armazenar os valores do usuário e da senha
  const [valueUsuario, setValueUsuario] = useState('');
  const [valueSenha, setValueSenha] = useState('');

  // Função para atualizar o valor do usuário
  const handleChangeUsuario = (text: string) => {
    setValueUsuario(text);
  };

  // Função para atualizar o valor da senha
  const handleChangeSenha = (text: string) => {
    setValueSenha(text);
  };

  // Função para lidar com o pressionamento do botão "Entrar"
  const handleEntrarPress = async () => {
    try {
      const isLogged = await authService.login(valueUsuario, valueSenha);
      if (isLogged) {
        // Navegar para a página ListUsers se o login for bem-sucedido
        navigation.navigate('ListUsers');
      } else {
        // Exibir uma mensagem de erro se o login falhar
        Alert.alert('Erro', 'Usuário/senha inválido(a)');
      }
    } catch (error) {
      // Em caso de erro, exibir uma mensagem de erro para o usuário
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 10 }}>
        <MyTextInput
          value={valueUsuario}
          onChangeText={handleChangeUsuario}
          placeholder="Login"
          placeholderTextColor="#ccc"
          maxLength={20}
        />
        <MyTextInput
          value={valueSenha}
          onChangeText={handleChangeSenha}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          maxLength={20}
          secureTextEntry={true}
        />

        {/* Componente de botão "Entrar" */}
        <MyButton onPress={handleEntrarPress} />
      </View>

      <View style={{ marginTop: 40 }}>
        <Text style={{ color: '#ccc', textAlign: 'center' }}>
          Usuário ADM
        </Text>

        <Text style={{ color: '#ccc', textAlign: 'center' }}>
          Login: uedsonreis | Senha: 123456
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#ccc', textAlign: 'center' }}>
          Obs.: 1º - Configure a url da api com o ip da máquina no user.service.ts
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#ccc', textAlign: 'center' }}>
          2º - Para editar o 'username' tem que adcionar no código da api na pasta 'user' - 'user.repository.ts' -  na função update - adicionando - 'finded.username = record.username' 
        </Text>
      </View>

    </SafeAreaView>
  );
};

export default LoginPage;