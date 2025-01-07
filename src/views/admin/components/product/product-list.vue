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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
                <template v-if="products.length > 0">
                  <tr v-for="product in products" :key="product._id">
                  <td><img :src="product.images[0]" :alt="product.name" class="w-[50px] h-[50px] rounded-sm mx-auto"></td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ removeHtmlTags(product.description) }}</td>
                  <td>{{ product.Stock }}</td>
                  <td>{{ product.ratings }}</td>
                  <td>{{ product.category }}</td>
                  <td>
                    <button class="text-red" @click="onDeleteProduct(product._id)">🗑️</button>
                    <button class="text-red" @click="onEditProduct(product)">📝</button>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr class="text-center">
                  <td colspan="8">No data for table</td>
                </tr>
              </template>
              
            </tbody>
          </table>
        </div>
      </main>
    </div>
    <confirm />
    <add-product :visible="addProductVisible" @hide="onHide" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useBase } from '../../../../composable/useBase'
import useLoading from '../../../../composable/useLoading'
import { ProductType } from '../../../../types/product.type'
import { getProductData, deleteProduct } from '../../../../api/product.api'
import { productStore } from '../../../../store/productStore'
// @ts-ignore
import { removeHtmlTags } from 'Utils/index'
// @ts-ignore
import AddProduct from './add-product.vue'
const { preLoading } = useLoading()
const $toast = useToast()
const products = ref<ProductType[]>([])
const addProductVisible = ref(false)
const { setProducts } = productStore()
const { showAlertConfirm } = useBase()
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

const onSave = () => {
  addProductVisible.value = false
  getProdcutList()
}

const onDeleteProduct = async (id: string) => {
  try {
    preLoading(true)
    showAlertConfirm(async () => {
      await deleteProduct(id)
      getProdcutList()
    })
    
  } catch (error:any) {
    $toast.error(error.message)
  } finally {
    preLoading(false)
  }
} 
onMounted(() => {
  getProdcutList()
})

const onEditProduct = (product: ProductType) => {
  addProductVisible.value = true
  setProducts(product, 'edit')
}

const onHide = () => {
  addProductVisible.value = false
}
</script>