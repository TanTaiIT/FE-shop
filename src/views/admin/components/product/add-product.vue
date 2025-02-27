<template>
  <Modal :visible="props.visible" size="xl" title="Add Product" @hide="onHide" @show="onLoadForm">
    <form>
      <div class="form-control">
        <label class="font-bold">Title</label>
        <input v-model="filter.name" type="text" placeholder="Enter title"
          class="border border-gray-300 p-2 rounded-md w-full" />
      </div>

      <div class="form-control">
        <label for="" class="font-bold">Description</label>
        <ckeditor v-model="filter.description" @input="hanleChangeInput" />
      </div>

      <div class="form-control">
        <div class="flex items-center justify-center w-full h-[150px] border-dashed border-2 rounded-md">
          <span v-if="currentImage.length === 0" @click="onUploadImage()"
            class="text-black shadow-lg border-1 bg-gray-100 rounded-full p-2 cursor-pointer text-sm hover:bg-gray-200 transition-all">Upload
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

      <btn-group @save="onConfirm" @hide="onHide" :options="btn_options" />
    </form>


  </Modal>

</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
// @ts-ignore
import Modal from 'Components/common/modal/modal.vue'
import { useToast } from 'vue-toast-notification'
import { addProduct, updateProduct } from '../../../../api/product.api'
import useLoading from '../../../../composable/useLoading'
import { getCategories } from '../../../../api/category.api'
// @ts-ignore
import ckeditor from 'Components/common/ckeditor/ckeditor.vue'
import { CategoryType } from '../../../../types/categories.type'
// @ts-ignore
import BtnGroup from 'Components/common/btn-group/btn-group.vue'
import { productStore } from '../../../../store/productStore'

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
const categories = ref<CategoryType[]>([])
const uploadFile = ref([])
const products = productStore()
const formAction = ref('add')

const filter = ref({
  _id: '',
  name: '',
  price: 0,
  Stock: 0,
  ratings: 0,
  category: '',
  description: '',
  images: []
})
const emit = defineEmits(['hide', 'save'])

const readUrl = (event: any) => {
  if (event.target.files[0]) {
    uploadFile.value = event.target.files[0]
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
  formAction.value = 'edit'
  if(formAction.value !== 'edit') {
    currentImage.value = []
  } else {
    filter.value = Object.assign(filter.value, products.products.data)
    currentImage.value = filter.value.images
  } 
  
  console.log('curent imgage', currentImage.value)
  getCategoryData()
}

const onHide = () => {
  emit('hide')
}

const onUploadImage = () => {
  const file = document.getElementById('upload') as HTMLInputElement
  file.click()
}

const onConfirm = async () => {
  try {
    preLoading(true)
    const payload = new FormData()
    payload.append("name", filter.value.name)
    payload.append('category', filter.value.category)
    payload.append('price', filter.value.price.toString())
    payload.append('Stock', filter.value.Stock.toString())
    payload.append('description', filter.value.description)
    payload.append('ratings', filter.value.ratings.toString())
    // @ts-ignore
    payload.append('images', uploadFile.value)
    console.log('upload file', uploadFile.value)
    if(formAction.value === 'edit') {
      payload.append('id', filter.value._id)
      await updateProduct(payload)
    } else {
      await addProduct(payload)
    }
    emit('save')
  } catch (error: any) {
    $toast.error(error.message)
  } finally {
    preLoading(false)
  }
}

const hanleChangeInput = (event: string) => {
  filter.value.description = event
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