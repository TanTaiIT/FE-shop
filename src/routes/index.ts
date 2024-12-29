import { createRouter, createWebHistory  } from "vue-router"
import Login from './../views/Login.vue'
import Home from './../views/Home.vue'
const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },

  {
    name: 'home',
    path: '/',
    component: Home 
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})