import { defineStore } from 'pinia'
import { toValue } from 'vue'
import type { PasswordRecord, FindOptions } from '@/types'

export const usePasswordsStore = defineStore('passwords', {
  state: () => ({
    records: (JSON.parse(localStorage.getItem('passwords') || '[]') as PasswordRecord[])
  }),
  actions: {
    find(options: FindOptions) {
      let results = [...this.records]

      if (options.query) {
        results = results.filter(r => r.title.includes(options.query!) || r.login.includes(options.query!))
      }
      if (options.tag) {
        results = results.filter(r => r.tags?.some(t => t.text === options.tag))
      }
      if (options.favoritesOnly) {
        results = results.filter(r => r.isFavorite)
      }

      results.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1))

      const total = results.length
      const start = (options.page - 1) * options.pageSize
      return { items: results.slice(start, start + options.pageSize), total }
    },

    getTags(): string[] {
      const set = new Set<string>()
      this.records.forEach(r => r.tags.forEach(t => set.add(t.text)))
      return Array.from(set).sort((a, b) => a.localeCompare(b))
    },

    get(id: string): PasswordRecord | null {
      const rec = this.records.find(r => r.id === id)
      return rec ? { ...toValue(rec) } : null
    },

    add(record: PasswordRecord) {
      const savingRecord: PasswordRecord = {
        ...toValue(record),
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: null,
        isFavorite: false
      }
      this.records.push(savingRecord)
      this.save()
    },

    change(record: PasswordRecord) {
      const index = this.records.findIndex(r => r.id === record.id)
      if (index !== -1) {
        this.records[index] = {
          ...record,
          updatedAt: Date.now(),
        }
        this.save()
      }
    },

    remove(id: string) {
      this.records = this.records.filter(r => r.id !== id)
      this.save()
    },

    toggleFavorite(id: string) {
      const record = this.records.find(r => r.id === id)
      if (record) {
        record.isFavorite = !record.isFavorite
        record.updatedAt = Date.now()
        this.save()
      }
    },

    save() {
      localStorage.setItem('passwords', JSON.stringify(this.records))
    }
  }
})
