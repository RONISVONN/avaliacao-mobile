// Importação do Axios para realizar requisições HTTP
import axios from 'axios';

// Importação do modelo de usuário
import { User } from "../model/user";

// Importação do repositório de autenticação para armazenar o usuário logado
import { authRepository } from './auth.repository';

// Classe responsável pelos serviços de autenticação
class AuthService {

    // Método para realizar o login do usuário
    public async login(username: string, password: string): Promise<boolean> {
        try {
            // Realiza uma requisição POST para o endpoint de login com as credenciais fornecidas
            const response = await axios.post('http://192.168.15.32:3030/auth/login', {
                username,
                password
            });
            
            // Obtém os dados de usuário da resposta
            const logged: User = response.data;

            // Verifica se o usuário está logado e se possui um token de autenticação
            if (logged && logged.token) {
                // Armazena o usuário logado no AsyncStorage
                authRepository.setLoggedUser(logged);
                
                // Retorna verdadeiro para indicar que o login foi bem-sucedido
                return true;
            } else {
                // Retorna falso se não houver um token na resposta
                return false;
            }
        } catch (error) {
            // Em caso de erro, retorna falso para indicar que o login falhou
            return false;
        }
    }

}

// Exporta uma instância da classe AuthService para uso em outras partes do aplicativo
export const authService = new AuthService();