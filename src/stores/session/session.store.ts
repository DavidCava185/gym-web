import { defineStore } from 'pinia'
import RestService from '@/service'
import router from '@/router'
import ls from '@/composable/local-storage.composable'

const service = new RestService({ namespace: '/auth' })
const usersService = new RestService({ namespace: '/users' })
const trainersService = new RestService({ namespace: '/trainers' })

export const useSessionStore = defineStore('session', {
  state(): any {
    return {
      sessionFetching: false,
      session: undefined,
      me: undefined
    }
  },
  getters: {

    isAuthenticated() {
      return ls.get('authenticated')
    },

    isTrainer() {
      return (ls.get('is-trainer') === 'true');
    }

  },
  actions: {

    async login(loginPayload: any): Promise<void> {
      try {
        this.sessionFetching = true

        const data = await service.request({
          url: '/login',
          method: 'post',
          data: {
            email: loginPayload.email,
            password: loginPayload.password
          }
        })

        if (data) {
          this.me = data
          ls.set('authenticated', data)
        }
        await router.push({ name: 'UserHome' })
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false
      }
    },

    async loginTrainer(loginPayload: any): Promise<void> {
      try {
        this.sessionFetching = true

        const data = await service.request({
          url: '/login/trainer',
          method: 'post',
          data: {
            email: loginPayload.email,
            password: loginPayload.password
          }
        })

        if (data) {
          ls.set('authenticated', data)
          ls.set('is-trainer', true)
        }
        await router.push({ name: 'TrainerHome' })
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false
      }
    },

    async logout(): Promise<void> {
      try {
        ls.set('authenticated', false)
        ls.set('is-trainer', false)
        await router.push({ name: 'login' })
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false
      }
    },

    async getMe(): Promise<void> {
      try {
        this.sessionFetching = true

        const data = await usersService.request({
          url: `/${this.isAuthenticated.id}`,
          method: 'get'
        })

        this.me = data;
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false
      }
    },

    async getMeTrainer(): Promise<void> {
      try {
        this.sessionFetching = true

        const { data } = await trainersService.request({
          url: `/${this.isAuthenticated.id}`,
          method: 'get'
        })

        this.me = data;
      } catch (err) {
        console.error(err)
      } finally {
        this.sessionFetching = false
      }
    },

    async updateUser(user: any): Promise<void> {
      try {
        await usersService.request({
          url: `/${user.id}`,
          method: 'put',
          data: {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password
          }
        })
        await this.getMe();
        ls.set('authenticated', this.me)
      } catch (err) {
        console.error(err)
      }
    },

    async updateTrainer(trainer: any): Promise<void> {
      try {
        await trainersService.request({
          url: `/${trainer.id}`,
          method: 'put',
          data: {
            name: trainer.name,
            surname: trainer.surname,
            email: trainer.email,
            password: trainer.password
          }
        });
        await this.getMeTrainer();
        ls.set('authenticated', this.me)
      } catch (err) {
        console.error(err)
      }
    }
  }
})