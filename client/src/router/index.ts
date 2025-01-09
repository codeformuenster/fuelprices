import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TheHome.vue'),
      children: [
        {path: ':id', component: () => import('../views/StationDetails.vue')},
      ],
    }
  ]
});

export default router;
