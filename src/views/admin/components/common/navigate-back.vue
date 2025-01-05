<template>
  <div class="flex items-center gap-3 cursor-pointer">
    <span class="text-[20px]">🔙</span>

    <span class="text-[20px] uppercase">{{ routerName }}</span>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const router = useRoute()

const routerName = router.name

</script>