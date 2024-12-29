import { defineStore } from "pinia"
import { ref } from "vue"
export const loadingStore = defineStore('loading', () => {
  const loading = ref(false)

  // Actions
  const setLoading = (value: boolean) => {
    console.log('value', value)
    loading.value = value
  }

  return {
    loading, 
    setLoading
  }
})
