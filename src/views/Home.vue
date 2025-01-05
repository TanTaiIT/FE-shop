<template>
  <div class="home flex main-content">
    <div class="sidebar w-[30%]">
      <SideBar />
    </div>

    <div class="products-list flex-1">
      <product-filter />
      
      <products :products="productList"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductFilter from './../components/product-filter/product-filter.vue'
import SideBar from './../components/SideBar/sidebar.vue'
import products from '../components/product/products.vue'
import { onMounted, ref } from 'vue'
import useLoading from '../composable/useLoading'
import { useToast } from 'vue-toast-notification'
import { getProductData } from '../api/product.api'
const productList = ref([])
const $toast = useToast()
const { preLoading } = useLoading()

const getProducts = async () => {
  try {
    preLoading(true)
    const response = await getProductData()
    if(!response.data.products.length) {
      return $toast.error('No products found')
    }

    productList.value = response?.data?.products || []
  } catch (error) {
    $toast.error('Error when get products')
  } finally {
    preLoading(false)
  }
}

onMounted(() => {
  getProducts()
})


</script>