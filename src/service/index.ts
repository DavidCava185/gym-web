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
      withCredentials: false
    });
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
