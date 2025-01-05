<template>
  <div class="ck-container">
    <ckeditor v-if="editor" v-model="editor" :editor="editor" :config="config" tag-name="text-area"
      class="ck-editor-config" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Ckeditor, useCKEditorCloud } from '@ckeditor/ckeditor5-vue'

const props = defineProps({
  data: {
    type: String,
    default: ''
  }
})

const cloud = useCKEditorCloud({
  version: '44.1.0',
  premium: true
});

const editor = computed(() => {
  if (!cloud.data.value) {
    return null
  }
  return cloud.data.value.CKEditor.ClassicEditor
});

const config = computed(() => {
  if (!cloud.data.value) {
    return null
  }

  const { Essentials, Paragraph, Bold } = cloud.data.value.CKEditor
  const { FormatPainter } = cloud.data.value.CKEditorPremiumFeatures

  return {
    licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzczMzExOTksImp0aSI6ImZiYjJjY2JkLWZlNDAtNDcwNy1iMmVjLWQxMmExODI2OTZhNiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjM4NmU4ZGM4In0.tns5tfLFg1p0Wv6PArjHEQLE7nW9q6nvx69gFEcY88y4ED5oT0GKLRyOcagUxjkdFrwVzsEzv44ObZVg2YVphw',
    plugins: [Essentials, Paragraph, Bold, FormatPainter],
    toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter']
  }
})
</script>

<style lang="scss">
.ck-container {
  .ck-editor {
    background-color: red;

    .ck-editor__main {
      .ck-content {
        height: 300px;
      }
    }
  }
}
</style>
