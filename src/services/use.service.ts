// Importação do Axios para realizar requisições HTTP
import axios from 'axios';

// Importação do AsyncStorage para armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importação do modelo de usuário
import { User } from '../model/user';

// URL da API de usuários
const API_URL = 'http://192.168.15.32:3030/users';

// Função para obter o token de autenticação armazenado no AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    // Retorna o token parseado ou null se não estiver presente
    return token ? JSON.parse(token) : null;
  } catch (error) {
    // Registra um erro caso ocorra um problema ao obter o token
    console.error('Error getting token', error);
    return null;
  }
};

// Função para obter todos os usuários da API
export const getUsers = async (): Promise<User[]> => {
  // Obtém o token de autenticação
  const token = await getToken();
  // Lança um erro se o token não estiver presente
  if (!token) throw new Error('Token not found');

  // Realiza uma requisição GET para obter os usuários
  const response = await axios.get<User[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Retorna os dados dos usuários
  return response.data;
};

// Função para obter um usuário específico pelo seu ID
export const getUserById = async (userId: string): Promise<User> => {
  // Obtém o token de autenticação
  const token = await getToken();
  // Lança um erro se o token não estiver presente
  if (!token) throw new Error('Token not found');

  // Realiza uma requisição GET para obter um usuário pelo seu ID
  const response = await axios.get<User>(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Retorna os dados do usuário
  return response.data;
};

// Função para criar um novo usuário na API
export const createUser = async (user: Omit<User, 'id'>): Promise<void> => {
  // Obtém o token de autenticação
  const token = await getToken();
  // Lança um erro se o token não estiver presente
  if (!token) throw new Error('Token not found');

  // Realiza uma requisição POST para criar um novo usuário
  await axios.post(API_URL, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para atualizar um usuário existente na API
export const updateUser = async (userId: string, user: Partial<User>): Promise<void> => {
  // Obtém o token de autenticação
  const token = await getToken();
  // Lança um erro se o token não estiver presente
  if (!token) throw new Error('Token not found');

  //console.log(user);

  // Realiza uma requisição PUT para atualizar um usuário pelo seu ID
  await axios.put(`${API_URL}/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para excluir um usuário existente na API
export const deleteUser = async (userId: string): Promise<void> => {
  // Obtém o token de autenticação
  const token = await getToken();
  // Lança um erro se o token não estiver presente
  if (!token) throw new Error('Token not found');

  // Realiza uma requisição DELETE para excluir um usuário pelo seu ID
  await axios.delete(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
