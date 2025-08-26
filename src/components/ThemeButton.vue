<script setup lang="ts">
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { NButton } from 'naive-ui'

interface Props {
  isDark: boolean
}

const { isDark } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:isDark', value: boolean): void
}>()

const toggleMode = () => {
  emit('update:isDark', !isDark)
}
</script>

<template>
  <n-button quaternary circle @click="toggleMode">
    <template #icon>
      <component :is="isDark ? SunnyOutline : MoonOutline"></component>
    </template>
  </n-button>
</template>