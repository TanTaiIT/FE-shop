<template>
  <div class="products mt-5">
    <div class="products-list flex items-center gap-3">
      <div v-for="product in props.products" :key="product._id" class="product-card ">
        <div class="product-image cursor-pointer">
          <img class="hover:transform hover:scale-105 w-[200px] transition-all" :src="product.images[0]" alt="product" />
          <div class="product-content">
            <p>{{ product.description }}</p>
            <p class="flex items-center justify-between">
              <span>Price: {{ product.price }}$</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  products: any[]
}>()
</script>