<template>
  <div class="product-list mt-4">
    <div class="">
      <header>
        <span class="font-bold text-lg uppercase">Product</span>
      </header>

      <div class="action text-right px-3">
        <button class="bg-gray-700 rounded-md text-white p-2" @click="onAddProduct">Add Product</button>
      </div>

      <main>
        <div class="content mt-3">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Category</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" :key="product._id">
                <td><img :src="product.images[0]" :alt="product.name" class="w-[50px] h-[50px] rounded-sm mx-auto"></td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.Stock }}</td>
                <td>{{ product.ratings }}</td>
                <td>{{ product.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <add-product :visible="addProductVisible" @hide="onHide" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useLoading from '../../../../composable/useLoading'
import { useToast } from 'vue-toast-notification'
import { getProductData } from '../../../../api/product.api'
import { ProductType } from '../../../../types/product.type'
// @ts-ignore
import AddProduct from './add-product.vue'
const { preLoading } = useLoading()
const $toast = useToast()
const products = ref<ProductType[]>([])
const addProductVisible = ref(false)
const getProdcutList = async () => {
  try {
    preLoading(true)
    const response = await getProductData()
    products.value = response?.data?.products || []
  } catch (error: any) {
    $toast.error(error.message)
  } finally {
    preLoading(false)
  }
}

const onAddProduct = (): void => {
  addProductVisible.value = true
}
onMounted(() => {
  getProdcutList()
})

const onHide = () => {
  addProductVisible.value = false
}
</script>