<template>
  <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 footer">
    <button v-if="props.options.save" @click="onSave" type="button"
      class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
      save
    </button>
    <button v-if="props.options.delete" @click="onDelete" type="button"
      class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">
      delete
    </button>
    <button v-if="props.options.cancel" @click="onHide" type="button"
      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
      Cancel
    </button>
  </div>
</template>

<script lang="ts" setup>
const emmit = defineEmits(['save', 'delete', 'hide'])
const props = defineProps<{
  options: {
    save: boolean,
    delete: boolean,
    cancel: boolean
  }
}>()
const onSave = () => {
  emmit('save')
}

const onDelete = () => {
  emmit('delete')
}

const onHide = () => {
  emmit('hide')
}
</script>

<style lang="scss" scoped>
.footer {
  // box-shadow: 1px 1px 7px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}
</style>