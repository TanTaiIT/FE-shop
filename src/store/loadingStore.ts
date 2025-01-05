import { defineStore } from "pinia"
import { ref } from "vue"
export const loadingStore = defineStore('loading', () => {
  const loading = ref(false)

  // Actions
  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return {
    loading, 
    setLoading
  }
})
