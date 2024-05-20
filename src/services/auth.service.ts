import axios from 'axios'

import { User } from "../model/user"
import { authRepository } from './auth.repository'

class AuthService {

    public async login(username: string, password: string) {
        try {
            const response = await axios.post('http://192.168.15.32:3030/auth/login', {
                username,
                password
            });            
              

            const logged: User = response.data

                if (logged && logged.token) {
                    console.log('token - service - ' + logged.token)

                    authRepository.setLoggedUser(logged)
                    
                    return true
                } else {
                    return false
            }
            
        } catch (error) {
            return false
        }
    }

}

export const authService = new AuthService()
