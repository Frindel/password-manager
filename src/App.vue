<script setup lang="ts">
import themeButton from '@/components/ThemeButton.vue';
import { computed, ref } from 'vue';
import { darkTheme, lightTheme } from 'naive-ui';
import { ruRU, dateRuRU } from 'naive-ui';

const isDark = ref<boolean>(true);
const theme = computed(() => {
  return isDark.value ? darkTheme : lightTheme;
});
</script>

<template>
  <n-config-provider :theme="theme" :locale="ruRU" :date-locale="dateRuRU">
    <div :class="['app', isDark ? 'app_dark' : '']">
      <div class="app__header">
        <theme-button v-model:is-dark="isDark"></theme-button>
      </div>
      <router-view></router-view>
    </div>
  </n-config-provider>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 10px 15px;
}

.app_dark {
  background-color: #222;
}

.app__header {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin-bottom: 10px;
}
</style>