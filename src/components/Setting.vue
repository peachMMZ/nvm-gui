<template>
  <div style="padding: 5px;">
    <n-h1 style="text-align: center;">Setting</n-h1>
    <n-flex vertical>
      <n-space justify="center">
        <n-input placeholder="please input proxy url" />
        <n-button type="primary" round>保存</n-button>
      </n-space>
      <n-space justify="center">
        <n-input placeholder="please input node mirror url" />
        <n-button type="primary" round>保存</n-button>
      </n-space>
      <n-space justify="center">
        <n-input placeholder="please input npm mirror url" />
        <n-button type="primary" round>保存</n-button>
      </n-space>
    </n-flex>
    <n-card title="Debug info" style="margin-top: 10px;">
      <div v-for="(item, index) in debugInfo" :key="index">
        <n-text>{{ item }}</n-text>
      </div>
      <template #header-extra>
        <n-button type="warning" round @click="nvmDebug">Debug</n-button>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import {
  NH1,
  NText,
  NFlex,
  NSpace,
  NInput,
  NButton,
  NCard
} from 'naive-ui'
import { ref } from 'vue'
import nvmService from '@/service/nvm'

const debugInfo = ref<string[]>([])

function nvmDebug() {
  debugInfo.value = []
  nvmService.debug((data) => {
    debugInfo.value.push(data)
  })
}
</script>
<style scoped></style>
