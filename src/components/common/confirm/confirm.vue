<template>
  <Modal
    :visible="visible"
    title="CONFIRM"

    class="confirm-class"
  >
    <p>Do you want to Delete</p>
    <div name="footer" class="flex items-center justify-end gap-3">
      <button class="btn bg-red-400" @click="onConfirm">Yes</button>
      <button class="btn bg-blue-400" @click="onCancel">No</button>
    </div>
  </Modal>  
</template>

<script setup lang="ts">
// @ts-ignore
import BtnGroup from '../btn-group/btn-group.vue'
// @ts-ignore
import Modal from 'Components/common/modal/modal.vue'
import { commonStore } from '../../../store/commonStore'
import { computed } from 'vue'

const commonStores = commonStore()

const visible = computed(() => {
  return commonStores.isShowConfirm
})

const onConfirm = () => {
  commonStores.confirmAction()
}

const onCancel = () => {
  commonStores.cancelAction()
}
</script>

<style scoped lang="scss">
.confirm-class {
  ::v-deep .modal-dialog {
    width: 400px;
    height: 120px;
  }
}
</style>