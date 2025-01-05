<template>
  <div class="header h-[80px] sticky top-0 bg-slate-500 flex items-center justify-between px-5">
    
    <div class="action flex items-center gap-3 ml-auto">
      <span class="text-white cursor-pointer">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { authStore } from '../../../store/authStore'

const store = authStore()
const user = computed(() => store.user)

</script>
