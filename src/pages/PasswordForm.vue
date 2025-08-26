<script lang="ts" setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/composables/passwords'
import PasswordField from '@/components/PasswordField.vue'
import { tagsArrayToString, stringToTagsArray } from '@/utils/tags'
import type { PasswordRecord } from '@/types'

const props = defineProps<{ id?: string }>()
const router = useRouter()
const store = useStore()
const formRef = ref<any>(null)

const isChangeMode = computed(() => Boolean(props.id))

const record = reactive<PasswordRecord & { tagsString: string }>({
  id: '',
  title: '',
  url: '',
  login: '',
  password: '',
  tags: [],
  tagsString: '',
  comment: '',
  isFavorite: false,
  createdAt: Date.now(),
  updatedAt: null
})

onMounted(() => {
  if (isChangeMode.value) {
    const item = store.get(props.id!)
    if (item) {
      Object.assign(record, {
        ...item,
        tagsString: tagsArrayToString(item.tags.map(tag => tag.text))
      })
    }
  }
})

// validations

const urlRegex = /^(https?:\/\/)([\w-]+\.[\w-]+|localhost)(:\d{1,5})?(\/.*)?$/i
const tagsRegex = /^(\s*[^;\s]+\s*)(;\s*[^;\s]+\s*)*$/

function validateUrl(_: any, value: string) {
  return !value || urlRegex.test(value)
}
function validateTags(_: any, value: string) {
  return !value || tagsRegex.test(value)
}

const rules = {
  title: [{ required: true, message: 'Название обязательно', trigger: ['blur', 'input'] }],
  url: [{ validator: validateUrl, message: 'Некорректный URL', trigger: ['blur', 'input'] }],
  login: [{ required: true, message: 'Логин обязателен', trigger: ['blur', 'input'] }],
  password: [{ required: true, message: 'Пароль обязателен', trigger: ['blur', 'input'] }],
  tagsString: [{ validator: validateTags, message: 'Метки должны быть разделены ";" без пустых значений', trigger: ['blur', 'input'] }]
}

// Actions
function save() {
  formRef.value?.validate((errors: any) => {
    if (errors) return

    const { tagsString, ...rest } = record
    const data: PasswordRecord = {
      ...rest,
      tags: stringToTagsArray(record.tagsString).map(tag => ({ text: tag }))
    }

    if (isChangeMode.value) store.change(data)
    else store.add(data)

    router.push({ name: 'password-list' })
  })
}

function remove() {
  store.remove(record.id)
  router.push({ name: 'password-list' })
}

function cancel() {
  router.push({ name: 'password-list' })
}
</script>

<template>
  <n-form ref="formRef" :model="record" :rules="rules" class="form" @submit.prevent="save">
    <n-form-item label="Название" path="title">
      <n-input v-model:value="record.title" placeholder="Введите название" />
    </n-form-item>

    <n-form-item label="URL" path="url">
      <n-input v-model:value="record.url" placeholder="Введите url" />
    </n-form-item>

    <n-form-item label="Логин" path="login">
      <n-input v-model:value="record.login" placeholder="Введите логин" />
    </n-form-item>

    <n-form-item label="Пароль" path="password">
      <PasswordField v-model="record.password" placeholder="Введите пароль" />
    </n-form-item>

    <n-form-item label="Метки" path="tagsString">
      <n-input v-model:value="record.tagsString" placeholder="Введите метки через ;" />
    </n-form-item>

    <n-form-item label="Комментарий">
      <n-input type="textarea" v-model:value="record.comment" placeholder="Введите комментарий" />
    </n-form-item>

    <n-space>
      <n-button @click="cancel">Отмена</n-button>
      <n-button type="primary" @click="save">Сохранить</n-button>
      <n-button v-if="isChangeMode" type="error" @click="remove">Удалить</n-button>
    </n-space>
  </n-form>
</template>

<style scoped>
.form {
  max-width: 500px;
}
</style>
