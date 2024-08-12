// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginAndRegist from '@/views/LoginAndRegist.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginAndRegist
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
