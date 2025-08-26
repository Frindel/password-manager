<script setup lang="ts">
import { Star, StarOutline } from '@vicons/ionicons5'
import { NButton, NIcon } from 'naive-ui'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const toggle = () => emit('update:modelValue', !props.modelValue)
</script>

<template>
  <n-button quaternary circle size="small" @click="toggle">
    <n-icon size="18">
      <component :is="props.modelValue ? Star : StarOutline" />
    </n-icon>
  </n-button>
</template>

<style scoped>
</style>