<template>
  <div class="sidebar w-[400px] h-full fixed top-0 left-0 bg-gray-800 text-white">
    <header class="h-[80px] bg-gray-900 flex items-center justify-between px-5">
      <span class="absolute top-5 left-5"><img src="https://i.pinimg.com/736x/6d/37/3a/6d373a403a01eb017bdc25d0e80f1ce7.jpg" class="w-[50px] h-[50px] rounded-lg" alt="logo"></span>
    </header>

    <div class="body mt-10">
      <h1 class="text-[30px] uppercase">Menu</h1>

      <div class="mt-5">
        <ul class="text-center" ref="menu">
          <li :class="activeMenu('home')"><router-link class="text-white"  :to="{name: 'admin'}">Home</router-link></li>
          <li :class="activeMenu('product')"><router-link class="text-white" :to="{name: 'product'}" >Product</router-link></li>
          <li :class="activeMenu('category')"><router-link class="text-white" :to="{name: 'category'}" >Category</router-link></li>
          <li>User</li>
          <li>Order</li>
          <li>Book</li>
        </ul>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = (type: string) => {
  if(type === route.name) {
    return 'active'
  }

  return ''
}
</script>

<style scoped lang="scss">
li {
  padding: 10px;
  font-size: 20px;
  transform: transition 0.5s ease;

  &:hover {
    background-color: #111827;
    cursor: pointer;
  }

  &.active {
    background-color: #111827;
  }

  a {
    height: 100%;
    width: 100%;
    display: block;
  }
}

</style>