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
        
        const data = await service.request({
          url: '/login',
          method: 'post',
          data: {
            email: loginPayload.email,
            password: loginPayload.password,
          }
        });
        
        if (data) {
          ls.set('authenticated', data);
        }
        await router.push({ name: 'UserHome' });
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false;
      }
    },

    async loginTrainer (loginPayload: any): Promise<void> {
      try {
        this.sessionFetching = true;
        
        const data = await service.request({
          url: '/login/trainer',
          method: 'post',
          data: {
            email: loginPayload.email,
            password: loginPayload.password,
          }
        });
        
        if (data) {
          ls.set('authenticated', data);
          ls.set('is-trainer', true);
        }
        await router.push({ name: 'TrainerHome' });
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false;
      }
    },

    async logout (): Promise<void> {
      try {
        ls.set('authenticated', false);
        ls.set('is-trainer', false);
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