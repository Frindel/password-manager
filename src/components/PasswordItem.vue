<script lang="ts" setup>
import { ref, watch } from 'vue'
import Favorite from './Favorite.vue'
import PasswordReveal from './PasswordReveal.vue'
import { useRouter } from 'vue-router'
import type { PasswordRecord } from '@/types'

interface Props {
  record: PasswordRecord
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-favorite', id: string): void
}>()

const router = useRouter()
const isFavorite = ref(props.record.isFavorite)

watch(() => props.record.isFavorite, (val) => {
  isFavorite.value = val
})

watch(isFavorite, (val) => {
  if (val !== props.record.isFavorite) {
    emit('toggle-favorite', props.record.id)
  }
})

const change = () => {
  router.push({ name: 'change-password', params: { id: props.record.id } })
}
</script>

<template>
  <n-card>
    <div class="password-item">
      <div class="password-item__tags">
        <n-tag v-for="tag in props.record.tags" :key="tag.text" type="info" size="small" round>{{ tag.text }}</n-tag>
      </div>
      <div class="password-item__info">
        <Favorite v-model="isFavorite" />
        <div class="password-item__title"><h3>{{ props.record.title }}</h3></div>
        <div class="password-item__login">{{ props.record.login }}</div>
        <div class="password-item__url">{{ props.record.url }}</div>
        <PasswordReveal :password="props.record.password" />
      </div>
      <div class="password-item__actions">
        <n-button size="small" @click="change">Редактировать</n-button>
      </div>
    </div>
  </n-card>
</template>

<style scoped>
.password-item {
    display: flex;
    flex-direction: column;
    position: relative;
}

.password-item__actions {
    position: absolute;
    right: 0;
    bottom: 50%;
    transform:translateY(50%);
}

.password-item__info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.password-item__title {
    width: 200px;
}

.password-item__login {
    width: 200px;
}

.pasword-item__url {
    width: 200px;
}

.password-item__tags {
    display: flex;
    padding-left: 48px;
    gap: 10px
}
</style>