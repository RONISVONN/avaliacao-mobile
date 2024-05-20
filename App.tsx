import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/pages/Home';
import LoginPage from './src/pages/Login';
import ListUsersPage from './src/pages/ListUsers';
import CreateUserPage from './src/pages/User';
import EditUserPage from './src/pages/EditUser';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#424242' }, // Cor de fundo do cabeçalho
          headerTintColor: '#fff', // Cor do texto e dos ícones no cabeçalho
        }}      
      >
        <Stack.Screen 
          name="Login" 
          component={LoginPage}
          options={{ title: 'Acesso' }}
        />
        
        <Stack.Screen 
          name="ListUsers" 
          component={ListUsersPage}
          options={{ 
            title: 'Usuários', 
            headerBackVisible: false // Remove a seta de voltar
          }} 
        />

        <Stack.Screen 
          name="NewUser" 
          component={CreateUserPage}
          options={{ 
            title: 'Novo Usuário', 
          }} 
        />


        <Stack.Screen 
          name="EditUser" 
          component={EditUserPage}
          options={{ 
            title: 'Editar Usuário', 
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}