import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from './../api/auth.api.js'
import { UserType } from '../types/user.type.js'

const setTokenToLS = (token: string) => {
  localStorage.setItem('token', token)
}

const setUSerToLS = (user: UserType): void => {
  localStorage.setItem('user', JSON.stringify(user))
}


const User = {
  _id: '',
  name: '',
  role: '',
  token: '',
  email: '',
  avartar: '',
  password: '',
  wishlist: [] as string[],
} 

const getUserFromLS = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error: any) {
    throw  new Error(error)
  }
}

export const authStore = defineStore('auth', () => {
  const user = ref<UserType>(getUserFromLS() || User)
  const token = ref(localStorage.getItem('token'))

  const userLogin = async (payload: {email: string, password: string}) => {
    try {
      const response = await login(payload)
      if(response.data.success) {
        setTokenToLS(response.data.token)
        setUSerToLS(response.data.data)
        
      } 
      user.value = response?.data
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return {
    token,
    user,
    userLogin
  }
})