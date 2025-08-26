<script setup>
import { NPagination } from "naive-ui"

defineProps({
  page: Number,
  pageSize: Number,
  total: Number
})
defineEmits(["update:page"])
</script>

<template>
  <div class="pagination">
    <NPagination
      :page="page"
      :page-size="pageSize"
      :item-count="total"
      @update:page="$emit('update:page', $event)"
    />
  </div>
</template>