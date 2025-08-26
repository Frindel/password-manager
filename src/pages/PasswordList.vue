<script lang="ts" setup>
import { ref, computed, watchEffect, watch } from 'vue'
import { useStore } from '@/composables/passwords'
import PasswordItem from '@/components/PasswordItem.vue'
import PasswordListFilters from '@/components/PasswordListFilters.vue'
import type { PasswordRecord } from '@/types'

const store = useStore()

const query = ref('')
const favoritesOnly = ref(false)
const groupByTag = ref(false)

const page = ref(1)
const pageSize = ref(5)
const items = ref<PasswordRecord[]>([])
const total = ref(0)

const allTags = computed(() => store.getTags())

const groupedItems = computed<Record<string, PasswordRecord[]>>(() => {
  if (!groupByTag.value) return {}
  const allItems = store.find({ page: 1, pageSize: 9999, query: query.value, favoritesOnly: favoritesOnly.value }).items
  const grouped: Record<string, PasswordRecord[]> = {}
  allTags.value.forEach(tag => grouped[tag] = allItems.filter(r => r.tags.some(t => t.text === tag)))
  return grouped
})

function refresh() {
  if (!groupByTag.value) {
    const res = store.find({ page: page.value, pageSize: pageSize.value, query: query.value, favoritesOnly: favoritesOnly.value })
    items.value = res.items
    total.value = res.total
    const lastPage = Math.max(1, Math.ceil(res.total / pageSize.value))
    if (page.value > lastPage) page.value = 1
  }
}

function onToggleFavorite(id: string) {
  store.toggleFavorite(id)
  refresh()
}

watchEffect(refresh)
watch(() => store.records, refresh, { deep: true })
</script>

<template>
  <div class="password-list">
    <PasswordListFilters v-model:query="query" v-model:favorites="favoritesOnly" v-model:groupByTag="groupByTag" />

    <template v-if="!groupByTag">
      <div class="password-list__items">
        <PasswordItem v-for="record in items" :key="record.id" :record="record" @toggle-favorite="onToggleFavorite" />
      </div>
      <div class="password-list__pagination">
        <n-pagination v-model:page="page" :page-size="pageSize" :item-count="total" />
      </div>
    </template>

    <template v-else>
      <div v-for="(records, tag) in groupedItems" :key="tag" class="group">
        <n-text class="group__title">{{ tag }}</n-text>
        <div class="password-list__items">
          <PasswordItem v-for="record in records" :key="record.id" :record="record"
            @toggle-favorite="onToggleFavorite" />
        </div>
      </div>
    </template>

    <div class="password-list__actions">
      <router-link :to="{ name: 'create-password' }">
        <n-button type="primary">Добавить</n-button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.password-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.password-list__items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.password-list__pagination {
  display: flex;
  justify-content: center;
}

.group {
  border-radius: 8px;
  padding: 6px 8px;
  border: 1px dashed var(--n-border-color);
  margin-bottom: 12px;
}

.group__title {
  opacity: 0.85;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>