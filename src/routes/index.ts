import { createRouter, createWebHistory  } from "vue-router"
import Login from './../views/Login.vue'
import MainLayout from "../layouts/MainLayout.vue"
import Home from './../views/Home.vue'
import dashboard from "../views/admin/dashboard.vue"
import adminLayout from "../views/admin/layouts/admin-layout.vue"
import Product from './../views/admin/Product.vue'
// @ts-ignore
import Category from './../views/admin/category.vue'
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

  {
    path: '/admin',
    component: adminLayout,
    children: [
      {
        name: 'admin',
        path: '',
        component: dashboard
      },
      {
        name: 'product', 
        path: 'product',
        component: Product
      },
      {
        name: 'category',
        path: 'category',
        component: Category
      }
    ]
  }

  
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})