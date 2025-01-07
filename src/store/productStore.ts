import { defineStore } from "pinia"
import { ref } from 'vue'
import { ProductType } from "../types/product.type"

const default_state = {
  product: {
    _id: '',
    name: '',
    price: 0,
    Stock: 0,
    images: '',
    ratings: 0,
    category: '',
    description: '',
  }
}
export const productStore = defineStore('product', () => {
  const products = ref({
    data: default_state.product,
    action: 'add'
  })

  const setProducts = (product: ProductType, action: string) => {
    products.value.data = Object.assign({}, product)
    products.value.action = action 
  }

  return {
    products,
    setProducts
  }
})