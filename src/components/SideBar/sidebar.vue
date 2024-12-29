<template>
  <div class="pt-10">
    <div class="flex items-center">
    <div class="flex items-center flex-col justify-start">
      <span class="text-lg text-bold font-bold">=</span>
    </div>
    <div class="text-bold text-2xl font-bold">All Categories</div> 
    <hr />
  </div>

    <div class="flex flex-col mt-3 text-lg text-gray-500">
      <span class="cursor-pointer">Dong ho</span>
      <span class="cursor-pointer">Quan ao</span>
      <span class="cursor-pointer">Giay dep</span>
    </div>
    <hr class="mt-3 w-[80%]"/>

    <div class="filter mt-5">
      <h1 class="text-2xl font-bold">Filter Search</h1>
      <div class="mt-3">
        <div class="flex items-center gap-2">
          <input type="text" placeholder="From" class="border border-gray-300 p-2 rounded-md w-[60%]"/>
          <span>-</span>
          <input type="text" placeholder="To" class="border border-gray-300 p-2 rounded-md w-[60%]"/>
        </div>

        <button class="bg-orange-500 text-white p-2 rounded-md mt-3">apply</button>
      </div>
    </div>

    <div class="start mt-5">
      <h1 class="text-xl mt-3">Rating</h1>
      <div class="flex flex-col justify-items-start gap-3 mt-3">
        <star :rating="5" class="cursor-pointer" />
        <star :rating="4" class="cursor-pointer" />
        <star :rating="3" class="cursor-pointer" />
        <star :rating="2" class="cursor-pointer" />
        <star :rating="1" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import star from './../common/star/stars.vue'
</script>