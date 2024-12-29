<template>
  <div class="product-filter items-center flex gap-3 bg-gray-300 p-4">
    <label class="text-white">Sort by: </label>
    <div class="tab" @click="sortType(1)" :class="{active: tabActive === 1}">
      Popularity
    </div>
    <div class="tab" @click="sortType(2)" :class="{active: tabActive === 2}">
      Newest
    </div>
    <div class="tab" @click="sortType(3)" :class="{active: tabActive === 3}">
      Best Seller
    </div>
    <select class="w-[200px] cursor-pointer h-[30px]">
      <option>
        low to hiest
      </option>
      <option>
        hiest to low
      </option>
    </select>

  </div>  
</template>

<script setup lang="ts">
import {ref} from 'vue'
const tabActive = ref(0)
const sortType = (type: number) => {
  tabActive.value = type
}
</script>

<style lang="scss" scoped>
.product-filter {
  .tab {
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background-color: white;

    &.active {
      background-color: orange;
      color: white;
    }
  }
}

</style>