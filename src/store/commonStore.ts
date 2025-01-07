import { defineStore } from "pinia"
import { ref } from "vue"
export const commonStore = defineStore('common', () => {
  const isShowConfirm = ref(false)
  const callback = ref<(() => void) | null>(null)

  const showConfirm = (cb: () => void) => {
    isShowConfirm.value = true
    callback.value = cb
  }

  const confirmAction = () => {
    if(callback.value) {
      callback.value()
    }
    isShowConfirm.value = false
    callback.value = null
  }

  const cancelAction = () => {
    isShowConfirm.value = false
    callback.value = null
  }

  return {
    confirmAction,
    cancelAction,
    isShowConfirm, 
    showConfirm
  }
})