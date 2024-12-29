<template>
  <div class="home flex main-content">
    <div class="sidebar w-[30%]">
      <SideBar />
    </div>

    <div class="products-list flex-1">
      <product-filter />
      
      <products />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilter from './../components/product-filter/product-filter.vue'
import SideBar from './../components/SideBar/sidebar.vue'
import products from '../components/product/products.vue';
</script>