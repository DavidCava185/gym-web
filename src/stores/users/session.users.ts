import  RestService  from '@/service';
import { defineStore } from 'pinia';

const usersService = new RestService({ namespace: '/users' });

export const useUsersStore = defineStore('users', {
    state(): any{
        return {
            users: [],
        }   
    },
    actions: {

        async getAllUsers(): Promise<void> {
            try {
                const data = await usersService.request({
                    url:``,
                    method: 'get',
                })
                this.users = data;
            } catch (err) {
                console.error(err)
            }
        },

        async updateUser(user: any): Promise<void> {
            try {
                await usersService.request({
                    url: '',
                    method: 'put',
                    data: {
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        password: user.password,
                    }
                });
            } catch (err) {
                console.error(err)
            }
        },
    }
});