import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TheHome.vue')
    },
    {
      path: '/:id',
      name: 'homeWithActiveStation',
      component: () => import('../views/TheHome.vue')
    },
  ]
});

export default router;
