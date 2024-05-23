// Importação do modelo de usuário
import { User } from "../model/user";

// Importação da AsyncStorage para armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Classe para manipulação de autenticação
class AuthRepository {

    // Chave para armazenar o usuário logado
    private readonly storeKey = '@auth:LOGGED_USER'

    // Método para obter o usuário logado
    public getLoggedUser = async () => {
        // Obtém os dados do usuário armazenados localmente
        const json = await AsyncStorage.getItem(this.storeKey);

        // Verifica se existem dados e os retorna como um objeto User
        if (json) return JSON.parse(json) as User

        // Retorna null se não houver usuário logado
        return null
    }

    // Método para definir o usuário logado
    public setLoggedUser = async (user: User) => {
        // Exibe o token do usuário no console para depuração
        console.log('token - repository - ' + user.token)

        // Define o token do usuário na AsyncStorage
        await AsyncStorage.setItem('token', JSON.stringify(user.token));
    }

    // Método para remover o usuário logado
    public removeLoggedUser = async () => {
        // Remove os dados do usuário da AsyncStorage
        await AsyncStorage.removeItem(this.storeKey)
    }

}

// Instância da classe AuthRepository para exportação
export const authRepository = new AuthRepository()