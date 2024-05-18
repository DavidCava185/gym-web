import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized, type RouteRecordNormalized } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ls from '@/composable/local-storage.composable';
import { useSessionStore } from '@/stores/session/session.store';
import Login from '@/components/Login.vue';
import HomeUser from '@/components/HomeUser.vue';
import HomeTrainer from '@/components/HomeTrainer.vue';
import UserProfile from '@/components/UserProfile.vue';
import TrainerProfile from '@/components/TrainerProfile.vue';
import UserManagement from '@/components/UserManagement.vue';

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
    path: '/auth',
    name: 'auth',
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'login/trainer',
        name: 'loginTrainer',
        component: Login,
        meta: {
          isTrainer: true,
        },
      }
    ]
  },
  {
    path: '/',
    name: 'app',
    component: () => import('../views/AppView.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'user-home',
        name: 'UserHome',
        component: HomeUser,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'trainer-home',
        name: 'TrainerHome',
        component: HomeTrainer,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: 'user-management',
            name: 'UserManagement',
            component: UserManagement,
            meta: {
              requiresAuth: true,
            },
          },
        ]
      },
      {
        path: 'user-profile',
        name: 'UserProfile',
        component: UserProfile,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'trainer-profile',
        name: 'TrainerProfile',
        component: TrainerProfile,
        meta: {
          requiresAuth: true,
        },
      },
    ]
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
