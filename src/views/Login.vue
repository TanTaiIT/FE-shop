<script setup lang="ts">
import { ref } from 'vue'
import { login } from '../api/auth.api';
import { useRouter } from 'vue-router'
import useLoading from '../composable/useLoading'
const router = useRouter()
const { preLoading } = useLoading()
const onSubmit = async () => {
  const payload = {
    email:email.value,
    password: password.value 
  }
  try {
    preLoading(true)
    const response = await login(payload)
    if(response.data.success) {
      router.push({path: '/'})
    }
    
  } catch (error:any) {
    throw new Error(error)
  } finally {
    preLoading(false)
  }
  
}

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="login flex flex-col justify-center items-center w-full h-full">
    <h1>Login</h1>
    <form class="mt-4 flex flex-col gap-3 w-[350px]" @submit.prevent="onSubmit">
      <input v-model="email" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button class="px-4 py-2 bg-blue-500 text-white rounded-sm">Submit</button>

    </form>
  </div>
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  height: 40px;
  padding: 4px;
  border-radius: 5px;

}
</style>
