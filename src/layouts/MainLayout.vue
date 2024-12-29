<template>
  <div class="w-full h-full">
    <Header />
      <router-view />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './../components/common/footer/footer.vue'
import Header from './../components/common/header/header.vue'
</script>