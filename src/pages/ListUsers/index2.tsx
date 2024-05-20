import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { User } from '../../model/user'; 
import { Icon, Button } from 'react-native-elements';
import styles from "./styles";
import { userService } from '../../services/user.service';

type RootStackParamList = {
  Login: undefined;
  ListUsers: undefined;
  NewUser: undefined;
};

type NavigationType = NavigationProp<RootStackParamList>;

const ListUsersPage = () => {
  // Inicialização do hook de navegação
  const navigation = useNavigation<NavigationType>();

  // Estados para armazenar os usuários, status de carregamento e mensagens de erro
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar usuários da API
  const fetchUsers = async () => {
    try {
      // Obtém o token armazenado no AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      
      // Faz a requisição à API para obter a lista de usuários
      const response = await axios.get<User[]>('http://192.168.15.32:3030/users', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      const [users1, setUsers1] = useState<User[]>([]);

      const fetchUsers = async () => {
        try {
          const users = await userService.getList();
          if (users) {
            setUsers1(users);
          } else {
            console.log(users1);
          }
        } catch (error) {
          console.log('Erro ao buscar usuários 2');
          //navigation.navigate('Login');
        } finally {
          //setLoading(false);
        }
      };
      
      fetchUsers();
  
      if (response) {
        setUsers(response.data); // Atualiza o estado com a lista de usuários recebida
      } else {
        setError('Erro ao buscar usuários cód. 001');
      }


    } catch (error) {
      setError('Erro ao buscar usuários cód. 002');
      navigation.navigate('Login'); // Redireciona para a página de Login em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Hook de efeito para buscar usuários e configurar atualização automática
  useEffect(() => {
    // Busca inicial de usuários
    fetchUsers();

    // Atualização automática a cada 3 segundos
    const intervalId = setInterval(fetchUsers, 3000);

    // Limpeza do intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [navigation]);

  // Hook de efeito para configurar o botão do cabeçalho
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => navigation.navigate('NewUser')}
            icon={
              <Icon
                name="person-add"
                type="material"
                color="white"
              />
            }
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            icon={
              <Icon
                name="exit-to-app"
                type="material"
                color="white"
              />
            }
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      ),
    });
  }, [navigation]);

  // Renderiza a tela de carregamento enquanto busca os usuários
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>Carregando...</Text>
      </View>
    );
  }

  // Renderiza a mensagem de erro, se houver um erro
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>{error}</Text>
      </View>
    );
  }

  // Renderiza a lista de usuários
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id?.toString() || item.username}
        renderItem={({ item }: { item: User }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userTextName}>{item.name}</Text>
            <Text style={styles.userTextUserName}>{item.username}</Text>
          </View>
        )}
        extraData={users} // Força a atualização da lista quando os usuários mudarem
      />
    </View>
  );
};

export default ListUsersPage;