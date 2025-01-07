<template>
  <div class="loading relative flex justify-center items-center w-full h-full">
    <span class="relative flex h-[50px] w-[50px]">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      <span class="relative inline-flex rounded-full h-[50px] w-[50px] bg-sky-500"></span>
      <span class="mt-3">loading...</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  z-index: 1000;
}
</style>