<template>
  <div class="admin-layout bg-gray-200 h-full">
    <Header />
    <Sidebar />
    <slot>
      <router-view />
    </slot>
    <Footer />
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
// @ts-ignore
import Sidebar from '../components/sidebar.vue';
</script>