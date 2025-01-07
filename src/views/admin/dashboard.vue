<template>
  <div class="dashboard admin-container">
    <h1>Admin Shop</h1>

    <div class="flex items-center gap-4 flex-wrap">
      <div class="board-card rounded-md bg-white p-4 shadow-md w-[30%] h-[100px]">
        <h2 class="uppercase font-bold text-red-400">Products</h2>
        <p>Number Products: </p>
      </div>

      <div class="board-card rounded-md bg-white p-4 shadow-md w-[30%] h-[100px]">
        <h2 class="uppercase font-bold text-green-400">User</h2>
        <p>Number User: </p>
      </div>

      <div class="board-card rounded-md bg-white p-4 shadow-md w-[30%] h-[100px]">
        <h2 class="uppercase font-bold text-blue-400">Order</h2>
        <p>Number Order: </p>
      </div>

      <div class="board-card rounded-md bg-white p-4 shadow-md w-[30%] h-[100px]">
        <h2 class="uppercase font-bold">Products</h2>
        <p>Number Card: </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { getSummarydata } from 'Api/summary.api'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import useLoading from '../../composable/useLoading'
import { authStore } from '../../store/authStore'

const summaryData = ref(null)
const store = authStore()
const user = computed(() => store.user)
const { preLoading } = useLoading()
const $toast = useToast()
const getSummary = async() => {
  try {
    preLoading(true)
    console.log('id',user.value._id)
    const response = await getSummarydata(user.value._id)
    summaryData.value = response?.data || null
    console.log('respolnse', response)
  } catch (error: any) {
    $toast.error(error.message)
  } finally {
    preLoading(false)
  }
}
onMounted(() => {
  getSummary()
})
</script>