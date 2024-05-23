// Importações necessárias do React e das bibliotecas de navegação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importações das páginas da aplicação
import HomePage from './src/pages/Home';
import LoginPage from './src/pages/Login';
import ListUsersPage from './src/pages/ListUsers';
import CreateUserPage from './src/pages/User';
import EditUserPage from './src/pages/EditUser';

// Criação do componente de navegação
const Stack = createNativeStackNavigator();

// Componente principal da aplicação
export default function App() {
  return (
    // Container de navegação que envolve todas as páginas
    <NavigationContainer>
      {/* Navigator Stack que gerencia as telas da aplicação */}
      <Stack.Navigator
        // Opções padrão para todas as telas do Navigator Stack
        screenOptions={{
          // Estilo do cabeçalho
          // Cor de fundo do cabeçalho
          headerStyle: { backgroundColor: '#424242' }, 
          // Cor do texto e dos ícones no cabeçalho
          headerTintColor: '#fff', 
        }}      
      >
        {/* Definição da tela de login */}
        <Stack.Screen 
          name="Login" 
          // Componente da tela
          component={LoginPage} 
          // Opções específicas para a tela
          options={{ title: 'Acesso' }} 
        />
        
        {/* Definição da tela de listagem de usuários */}
        <Stack.Screen 
          name="ListUsers" 
          // Componente da tela
          component={ListUsersPage}
          options={{ 
            // Título exibido no cabeçalho
            title: 'Usuários',
            // Remove a seta de voltar do cabeçalho
            headerBackVisible: false
          }} 
        />

        {/* Definição da tela de criação de novo usuário */}
        <Stack.Screen 
          name="NewUser" 
          // Componente da tela
          component={CreateUserPage} 
          options={{ 
            // Título exibido no cabeçalho
            title: 'Novo Usuário', 
          }} 
        />

        {/* Definição da tela de edição de usuário */}
        <Stack.Screen 
          name="EditUser" 
          // Componente da tela
          component={EditUserPage} 
          options={{ 
            // Título exibido no cabeçalho
            title: 'Editar Usuário', 
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}