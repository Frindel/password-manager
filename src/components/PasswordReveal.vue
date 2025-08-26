<script lang="ts" setup>
import { ref } from 'vue'
import PasswordField from './PasswordField.vue'
import { CopyOutline, CheckmarkDoneOutline } from '@vicons/ionicons5'

interface Props {
  password: string
}

const props = defineProps<Props>()
const copied = ref(false)

const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.password)
    copied.value = true
  } finally {
    setTimeout(() => (copied.value = false), 1200)
  }
}
</script>

<template>
  <div class="password-reveal">
    <password-field :model-value="props.password" readonly />
    <n-button text size="tiny" @click="copy">
      <n-icon>
        <component :is="copied ? CheckmarkDoneOutline : CopyOutline" />
      </n-icon>
    </n-button>
  </div>
</template>

<style>
.password-reveal { display: flex; gap: 10px; }
</style>