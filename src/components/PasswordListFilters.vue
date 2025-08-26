<script setup>
const props = defineProps({
    query: String,
    tag: String,
    favorites: Boolean,
    groupByTag: Boolean
})
const emit = defineEmits(['update:query', 'update:tag', 'update:favorites', 'update:groupByTag'])
</script>

<template>
    <div class="filters">
        <n-input class="filters__search" placeholder="Поиск" :value="query"
            @update:value="$emit('update:query', $event)" clearable />
        <div class="filters__switch">
            <n-switch :value="favorites" @update:value="$emit('update:favorites', $event)" />
            <n-text>Избранные</n-text>
        </div>
        <div class="filters__switch">
            <n-switch :value="groupByTag" @update:value="$emit('update:groupByTag', $event)" />
            <n-text>Группировать по меткам</n-text>
        </div>
    </div>
</template>

<style scoped>
.filters {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.filters__search {
    width: 300px;
}

.filters__switch {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}
</style>
