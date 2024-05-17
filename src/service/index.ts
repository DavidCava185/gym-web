import { useSessionStore } from '@/stores/session/session.store';
import Axios from 'axios';
import HttpStatusCodes from 'http-status-codes';
import Swal from 'sweetalert2';
import router from '@/router';
import type {
  ServiceInterface,
  ServiceRequestInterface
} from '@/service/interfaces/service.interface';

export default class Service {
  private axios: any;

  constructor (private options: ServiceInterface) {
    this.axios = Axios.create({
      baseURL: `${options.baseUri || 'http://localhost:3000'}${options.namespace || ''}`,
      responseType: 'json',
      withCredentials: true
    });

    this.axios.interceptors.response.use(
      this._responseInterceptorFullFilled,
      this._responseInterceptorRejected
    );
  }

  private _responseInterceptorFullFilled () {
    return (response: any) => response;
  }

  private async _responseInterceptorRejected (err: any): Promise<never> {
    if (
      err &&
      err.response &&
      err.response.status === HttpStatusCodes.UNAUTHORIZED &&
      router.currentRoute.value.meta?.requiresAuth
    ) {
      await Swal.fire({
        title: 'La sesión expiró',
        text: 'Vuelve a Logearte',
        icon: 'warning'
      });
      const store = useSessionStore();
      await store.logout();
    }
    return Promise.reject(err);
  }

  async request (options: ServiceRequestInterface): Promise<any> {
    try {
      const response = await this.axios.request({
        url: options.url,
        method: options.method,
        data: options.data,
        params: options.params
      });

      return response.data;
    } catch (err) {
      console.error('error in request', err);
      await this.manageError(err);
    }
  }

  async manageError (err: any): Promise<void> {
    const { data, status } = err;

    if (status >= HttpStatusCodes.INTERNAL_SERVER_ERROR) {
      await Swal.fire({
        title: 'Ocurrió un error',
        text: `${data.traceId}`,
        icon: 'error'
      });
    } else {
      console.error('error', err);
    }
  }
}
