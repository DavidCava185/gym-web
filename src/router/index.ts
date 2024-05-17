import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized, type RouteRecordNormalized } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ls from '@/composable/local-storage.composable';
import { useSessionStore } from '@/stores/session/session.store';

const authenticated: string | null = ls.get('authenticated');

const routes: any = [
  {
    path: '/pathMatch(.*)*',
    redirect: (): any => {
      if (authenticated) {
        return { name: 'app' };
         
      } else {
        return { name: 'login' }; 
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/',
    name: 'app',
    component: () => import('../views/AppView.vue'),
    meta: {
      requiresAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, 
})

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> => {
    let authenticated: string | null;
    let store: any;
    let requiresAuth: boolean;

    authenticated = ls.get('authenticated');
    store = useSessionStore();
    requiresAuth = to.matched.some((route: RouteRecordNormalized) => route.meta.requiresAuth);

    if (!authenticated && requiresAuth) {
      await store.logout();
    }

    next();
  }
);

export default router;
