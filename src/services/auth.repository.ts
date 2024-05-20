import { User } from "../model/user"
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthRepository {

    private readonly storeKey = '@auth:LOGGED_USER'

    public getLoggedUser = async () => {
        const json = await AsyncStorage.getItem(this.storeKey);

        if (json) return JSON.parse(json) as User

        return null
    }

    public setLoggedUser = async (user: User) => {
        console.log('token - repository - ' + user.token)

        //localStorage.setItem(this.storeKey, JSON.stringify(user))
        await AsyncStorage.setItem('token', JSON.stringify(user.token));
    }

    public removeLoggedUser = async () => {
        //localStorage.removeItem(this.storeKey)
        await AsyncStorage.removeItem(this.storeKey)
    }

}

export const authRepository = new AuthRepository()