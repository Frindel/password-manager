<script setup lang="ts">
import { ref, watch } from 'vue'
import { Eye, EyeOff } from '@vicons/ionicons5'
import { NInput, NButton } from 'naive-ui'

interface Props {
  modelValue: string | null
  readonly?: boolean
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | null): void
}>()

const password = ref(props.modelValue)
const show = ref(false)
const toggle = () => (show.value = !show.value)

watch(
  () => props.modelValue,
  (val) => {
    password.value = val
  },
  { immediate: true }
)

watch(password, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <n-input
    v-model:value="password"
    :type="show ? 'text' : 'password'"
    :readonly="props.readonly"
    :placeholder="props.placeholder"
  >
    <template #suffix>
      <n-button text size="tiny" @click="toggle">
        <template #icon>
          <component :is="show ? EyeOff : Eye" />
        </template>
      </n-button>
    </template>
  </n-input>
</template>
