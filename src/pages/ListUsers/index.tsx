import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { User } from '../../model/user';
import { Icon, Button } from 'react-native-elements';
import styles from "./styles";

type RootStackParamList = {
  Login: undefined;
  ListUsers: undefined;
  NewUser: undefined;
  EditUser: { userId: string }; // Definindo o tipo para EditUser
};

type NavigationType = NavigationProp<RootStackParamList>;

const ListUsersPage = () => {
  const navigation = useNavigation<NavigationType>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      const response = await axios.get<User[]>('http://192.168.15.32:3030/users', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (response && response.data) {
        setUsers(response.data);
      } else {
        setError('Erro ao buscar usuários cód. 001');
      }
    } catch (error) {
      setError('Erro ao buscar usuários cód. 002');
      navigation.navigate('Login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 3000);
    return () => clearInterval(intervalId);
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => navigation.navigate('NewUser')}
            icon={<Icon name="person-add" type="material" color="white" />}
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            icon={<Icon name="exit-to-app" type="material" color="white" />}
            buttonStyle={{ backgroundColor: 'transparent' }}
          />
        </View>
      ),
    });
  }, [navigation]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado');
        setLoading(false);
        return;
      }

      await axios.delete(`http://192.168.15.32:3030/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      fetchUsers();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao excluir o usuário.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.textMsG}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id?.toString() || item.username}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <View style={styles.userTextContainer}>
              <Text style={styles.userTextName}>{item.name}</Text>
              <Text style={styles.userTextUserName}>{item.username}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#007BFF', width: 64, height: 64 }]}
                onPress={() => navigation.navigate('EditUser', { userId: String(item.id) })}
              >
                <Icon name="edit" type="material" color="white" />

                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DC3545', width: 64, height: 64}]}
                onPress={() => handleDeleteUser(String(item.id))}
              >
                <Icon name="delete" type="material" color="white" />

                <Text style={styles.buttonText}>Excluir</Text>


              </TouchableOpacity>
            </View>
          </View>
        )}
        extraData={users}
      />
    </View>
  );
};

export default ListUsersPage;