<template>
  <div v-if="props.visible" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" ref="layer">
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <Transition name="modal">
          <div
            ref="modalRef"
            class="relative transform rounded-lg bg-white text-left shadow-xl transition-all w-[1000px] h-[90vh] overflow-auto modal-dialog sm:max-w-[90%]"
            :class="modalSize">
            <div class="close absolute top-3 right-3 cursor-pointer" @click="onClose">✖️</div>
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <!-- <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
              </div> -->
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold text-gray-900 text-[22px] uppercase mb-3" id="modal-title">{{ props.title }}</h3>
                  <div class="mt-2">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <slot name="footer" />
            </div>
          </div>
      </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, watch, ref } from 'vue'
import { commonStore } from '../../../store/commonStore';

const props = defineProps<{
  visible: boolean,
  size: 'sm' | 'md' | 'lg' | 'xl',
  title: string
}>()
const modalRef = ref<HTMLElement | null>(null)
const { cancelAction } = commonStore()
const emit = defineEmits(['hide', 'save', 'delete', 'show'])
const modalSize = computed(() => {
  return {
    'sm': 'w-[640px]',
    'md': 'w-[800px]',
    'lg': 'w-[1000px]',
    'xl': 'w-[1200px]'
  }[props.size]
})

watch(() => props.visible, (val) => {
  if (val) {
    emit('show')
  } else {
    emit('hide')
  }
})

const onClose = () => {
  emit('hide')
  cancelAction()
}

</script>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
