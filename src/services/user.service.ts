import axios, { AxiosResponse } from 'axios';
import { authRepository } from './auth.repository';
import { User } from '../model/user';

class UserService {
    private readonly api = axios.create({ baseURL: 'http://192.168.15.32:3030/users' });

    private async getHeaders() {
        const logged = await authRepository.getLoggedUser();
        const token = logged?.token || '';
        return {
            'Authorization': `Bearer ${token}`,
        };
    }

    private isOk(response: AxiosResponse) {
        return response.status >= 200 && response.status < 300;
    }

    private getData(response: AxiosResponse) {
        if (this.isOk(response)) {
            return response.data;
        } else {
            if (response.status === 401 || response.status === 403) return null;
            if (response.status === 400) {
                throw new Error('Usuário já existe!');
            } else {
                throw new Error(`${response.statusText}, status: ${response.status}`);
            }
        }
    }

    public async getList() {
        const headers = await this.getHeaders();
        const response = await this.api.get<User[]>('', { headers });
        const data = this.getData(response);
        return data as User[] | null;
    }

    public async get(id: number) {
        const headers = await this.getHeaders();
        const response = await this.api.get<User>(`${id}`, { headers });
        const data = this.getData(response);
        return data as User | null;
    }

    public async create(user: User) {
        const headers = await this.getHeaders();
        const response = await this.api.post('', user, { headers });
        const data = this.getData(response);
        return data ? !!data.id : null;
    }

    public async update(id: number, name: string) {
        const headers = await this.getHeaders();
        const response = await this.api.put(`${id}`, { name }, { headers });
        const data = this.getData(response);
        return !!data;
    }

    public async delete(id: number) {
        const headers = await this.getHeaders();
        const response = await this.api.delete(`${id}`, { headers });
        if (this.isOk(response)) {
            return true;
        } else {
            if (response.status === 401 || response.status === 403) return null;
            if (response.status === 400) {
                throw new Error('Usuário já existe!');
            } else {
                throw new Error(`${response.statusText}, status: ${response.status}`);
            }
        }
    }
}

export const userService = new UserService();