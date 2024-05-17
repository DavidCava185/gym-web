import { defineStore } from 'pinia';
import RestService from '@/service';
import router from '@/router';
import ls from '@/composable/local-storage.composable';

const service = new RestService({ namespace: '/auth' });

export const useSessionStore = defineStore('session', {
  state (): any {
    return {
      sessionFetching: false,
      session: undefined,
      me: undefined,
    };
  },
  getters: {

    isAuthenticated () {
      return ls.get('authenticated');
    },

  },
  actions: {

    async login (loginPayload: any): Promise<void> {
      try {
        this.sessionFetching = true;
        
        const { data } = await service.request({
          url: '/login',
          method: 'post',
          data: {
            email: loginPayload.email,
            password: loginPayload.password,
          }
        });
        
        ls.set('authenticated', data);
        await router.push({ name: 'Home' });
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false;
      }
    },

    async logout (): Promise<void> {
      try {
        ls.set('authenticated', false);
        await router.push({ name: 'login' });
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false;
      }
    },

    async getMe (): Promise<void> {
      try {
        this.sessionFetching = true;

        const { data } = await service.request({
          url: '/user',
          method: 'get',
        });

        this.me = data;
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false;
      }
    },

  }
});