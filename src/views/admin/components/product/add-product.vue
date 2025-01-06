<template>
  <Modal :visible="props.visible" size="xl" title="Add Product" @hide="onHide" @show="onLoadForm">
    <form @submit="onSubmit">
      <div class="form-control">
        <label class="font-bold">Title</label>
        <input v-model="filter.name" type="text" placeholder="Enter title"
          class="border border-gray-300 p-2 rounded-md w-full" />
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Description</label>
        <ckeditor v-model="filter.description" />
      </div>

      <div class="form-control">
        <div class="flex items-center justify-center w-full h-[150px] border-dashed border-2 rounded-md">
          <span v-if="currentImage.length === 0" @click="onUploadImage()"
            class="text-black shadow-lg border-1 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-all transition-">Upload
            new</span>
          <div v-else class="flex items-start gap-5 mr-auto">
            <div class="list-image flex items-center gap-3">
              <img v-for="(img, index) in currentImage" :src="img" :key="index" alt=""
                class="w-[150px] h-[150px] rounded-md" />
            </div>
            <div @click="onUploadImage()"
              class="rounded-md border-2 border-gray-300 flex items-center justify-center cursor-pointer w-[80px] h-[80px] border-dashed">
              <span class="text-2xl">+</span>
              
            </div>
          </div>

          <input type="file" id="upload" multiple @change="readUrl" class="hidden" accept="jpg, png, jpeg" />
        </div>
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Price</label>
        <input v-model="filter.price" type="text" placeholder="Enter price"
          class="border border-gray-300 p-2 rounded-md w-full" />
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Category</label>
        <select class="border border-gray-300 p-2 rounded-md w-full outline-none" v-model="filter.category">
          <option :value="cate._id" v-for="cate in categories" :key="cate._id">{{ cate.name }}</option>
        </select>
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Ratings</label>
        <input v-model="filter.ratings" type="text" placeholder="Enter ratings"
          class="border border-gray-300 p-2 rounded-md w-full" />
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Stock</label>
        <input v-model="filter.Stock" type="text" placeholder="Enter Stock"
          class="border border-gray-300 p-2 rounded-md w-full" />
      </div>

      <div class="footer">
        <button type="submit">Save</button>
      </div>
      <!-- <btn-group @save="onConfirm" @hide="onHide" :options="btn_options" /> -->
    </form>


  </Modal>

</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
// @ts-ignore
import Modal from 'Components/common/modal/modal.vue'
// @ts-ignore
import ckeditor from 'Components/common/ckeditor/ckeditor.vue'
import useLoading from '../../../../composable/useLoading'
import { useToast } from 'vue-toast-notification'
import { getCategories } from '../../../../api/category.api'
import { CategoryType } from '../../../../types/categories.type'
import { addProduct } from '../../../../api/product.api'
// @ts-ignore
import BtnGroup from 'Components/common/btn-group/btn-group.vue'

const btn_options = {
  save: true,
  cancel: true,
  delete: false
}
const props = defineProps<{
  visible: boolean
}>()

const $toast = useToast()
const { preLoading } = useLoading()
const currentImage = ref([])
const editorData = ref('<p>Content of the editor111.</p>')
const categories = ref<CategoryType[]>([])
const uploadFile = ref([])
const filter = ref({
  name: '',
  price: '',
  Stock: '',
  ratings: '',
  category: '',
  description: '12345',
})
const emit = defineEmits(['hide'])

const readUrl = (event: any) => {
  if (event.target.files[0]) {
    uploadFile.value = event.target.files[0]
    console.log('upload', uploadFile.value)
    const reader = new FileReader()
    reader.onload = (e) => {
      // @ts-ignore
      currentImage.value = [...currentImage.value, e.target?.result]
    }
    reader.readAsDataURL(event.target.files[0])
  }
}

const getCategoryData = async () => {
  try {
    preLoading(true)
    const category = await getCategories()
    categories.value = category?.data?.categories || []
  } catch (error) {
    $toast.error('Error when get categories')
  } finally {
    preLoading(false)
  }
}

const onLoadForm = () => {
  currentImage.value = []
  getCategoryData()
}

const onHide = () => {
  emit('hide')
}

const onUploadImage = () => {
  const file = document.getElementById('upload') as HTMLInputElement
  file.click()
}

const onSubmit = async (e: any) => {
  e.preventDefault()
  try {
    preLoading(true)
    const payload = new FormData()
    payload.append("name", filter.value.name)
    payload.append('price', filter.value.price)
    payload.append('Stock', filter.value.Stock)
    payload.append('ratings', filter.value.ratings)
    payload.append('category', filter.value.category)
    payload.append('description', filter.value.description)
   
    // @ts-ignore
    payload.append('images', uploadFile.value)
    await addProduct(payload)
  } catch (error: any) {
    $toast.error('Error when add product')
  } finally {
    preLoading(false)
  }
}
</script>

<style lang="scss" scoped>
form {
  .form-control {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>