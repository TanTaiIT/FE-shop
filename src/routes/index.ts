import { createRouter, createWebHistory  } from "vue-router"
import Login from './../views/Login.vue'
import MainLayout from "../layouts/MainLayout.vue"
import Home from './../views/Home.vue'
const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },

  {
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'home',
        path: '',
        component: Home,
      }
    ]   
  },

  
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})