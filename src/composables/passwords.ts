import { usePasswordsStore } from '@/stores/passwords'
import { onMounted, onUnmounted } from 'vue'

export function useStore() {
  const store = usePasswordsStore()

  onMounted(() => window.addEventListener('beforeunload', store.save))
  onUnmounted(() => {
    store.save()
    window.removeEventListener('beforeunload', store.save)
  })

  return store
}