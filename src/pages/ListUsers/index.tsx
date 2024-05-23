import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// Importa o modelo de usuário
import { User } from '../../model/user'; 
import { Icon, Button } from 'react-native-elements';
// Importa os estilos
import styles from "./styles";
// Importa funções para buscar e excluir usuários
import { getUsers, deleteUser } from '../../services/use.service'; 

type RootStackParamList = {
  Login: undefined;
  ListUsers: undefined;
  NewUser: undefined;
  EditUser: { userId: string };
};

type NavigationType = NavigationProp<RootStackParamList>;

const ListUsersPage = () => {
  // Obtém a instância de navegação
  const navigation = useNavigation<NavigationType>();
  // Estado para armazenar os usuários
  const [users, setUsers] = useState<User[]>([]);
  // Estado para controlar o carregamento 
  const [loading, setLoading] = useState(true); 
  // Estado para armazenar erros
  const [error, setError] = useState<string | null>(null); 

  // Função para buscar os usuários
  const fetchUsers = async () => {
    try {
      // Obtém os usuários do serviço
      const users = await getUsers();
      // Atualiza o estado de usuários
      setUsers(users); 
    } catch (error) {
      // Define mensagem de erro
      setError('Erro ao buscar usuários'); 
      // Navega para a tela de login em caso de erro
      navigation.navigate('Login'); 
    } finally {
      // Define o carregamento como concluído
      setLoading(false); 
    }
  };

  // Efeito para buscar usuários ao carregar o componente e configurar um intervalo de atualização
  useEffect(() => {
    // Busca os usuários
    fetchUsers(); 
    // Define um intervalo para atualizar os usuários a cada 3 segundos
    const intervalId = setInterval(fetchUsers, 3000);
    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId); 

    //[navigation] - Dependência de navegação para atualizar quando a navegação mudar
  }, [navigation]); 

  // Efeito para configurar opções de navegação
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            // Navega para a tela de criação de usuário
            onPress={() => navigation.navigate('NewUser')}
            // Ícone para adicionar usuário
            icon={<Icon name="person-add" type="material" color="white" />}
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
          <Button
            // Navega para a tela de login
            onPress={() => navigation.navigate('Login')} 
            // Ícone para sair
            icon={<Icon name="exit-to-app" type="material" color="white" />} 
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      ),
    });

    //[navigation] - Dependência de navegação para atualizar quando a navegação mudar
  }, [navigation]); 

  // Função para lidar com a exclusão de usuário
  const handleDeleteUser = async (userId: string) => {
    try {
      // Exclui o usuário pelo ID
      await deleteUser(userId); 
      // Atualiza a lista de usuários após a exclusão
      fetchUsers(); 
    } catch (error) {
      // Exibe alerta em caso de erro
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o usuário.'); 
    }
  };

  // Retorna um componente de carregamento enquanto os usuários estão sendo buscados
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>Carregando...</Text>
      </View>
    );
  }

  // Retorna um componente de erro se ocorrer um erro ao buscar os usuários
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>{error}</Text>
      </View>
    );
  }

  // Retorna uma lista de usuários
  return (
    <View style={styles.container}>
      <FlatList
        // Dados da lista de usuários
        data={users}
        // Chave para cada item da lista
        keyExtractor={(item) => item.id?.toString() || item.username}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={styles.userTextContainer}>
              {/*Nome do usuário*/}
              <Text style={styles.userTextName}>{item.name}</Text>

              {/*Nome de usuário*/}
              <Text style={styles.userTextUserName}>{item.username}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#007BFF', width: 64, height: 64 }]}

                // Navega para a tela de edição de usuário
                onPress={() => navigation.navigate('EditUser', { userId: String(item.id) })} 
              >
                <Icon name="edit" type="material" color="white" />

                {/*Botão de edição*/}
                <Text style={styles.buttonText}>Editar</Text> 
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DC3545', width: 64, height: 64}]}

                //Exclui o usuário
                onPress={() => handleDeleteUser(String(item.id))}
              >
                <Icon name="delete" type="material" color="white" />
                
                {/*Botão de exclusão*/}
                <Text style={styles.buttonText}>Excluir</Text> 
              </TouchableOpacity>

            </View>
          </View>
        )}
        
        // Dados extra para forçar a atualização da lista
        extraData={users}
      />
    </View>
  );
};

export default ListUsersPage;
