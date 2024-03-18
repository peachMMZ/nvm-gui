<template>
  <div>
    <n-flex v-if="nvmFound" vertical>
      <img src="../assets/node.svg" class="logo node" @click="openNvm"></img>
      <n-text type="info" strong>Nvm version: {{ nvmVersion }}</n-text>
      <n-text type="info" strong>Node version: {{ nodeVersion }}</n-text>
      <n-text type="info" strong v-for="item in bitMode">{{ item }}</n-text>
    </n-flex>
    <n-flex v-else>
      <img src="../assets/node_dark.svg" class="logo node" @click="openNvm"></img>
      <n-text type="error" strong style="margin: 10px;">
        It seems that you have not installed 
        <n-button text @click="openNvm">
          <n-text type="success" underline>nvm-windows</n-text>
        </n-button>
        , please install it first.
      </n-text>
    </n-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  NFlex,
  NText,
  NButton
} from 'naive-ui'
import nvmService from '@/service/nvm'
import { open } from '@tauri-apps/api/shell'
import { invoke } from '@tauri-apps/api'

const nvmFound = ref(false)
const nvmVersion = ref('')
const nodeVersion = ref('')
const bitMode = ref<string[]>([])

async function openNvm() {
  await open('https://github.com/coreybutler/nvm-windows/releases')
}

async function findNvmPath() {
  return await invoke<string>('find_nvm_home')
}

onMounted(async () => {
  const nvmPath = await findNvmPath()
  if (nvmPath) {
    nvmFound.value = true
  } else {
    nvmFound.value = false
    return
  }
  nvmVersion.value = 'v' + (await nvmService.version()).stdout
  nodeVersion.value = (await nvmService.current()).stdout
  nvmService.arch((data) => {
    bitMode.value.push(data)
  })
})

</script>

<style scoped>
.n-text {
  text-align: center;
  font-size: 15px;
}
.logo {
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.logo.node:hover {
  filter: drop-shadow(0 0 10px #3e83437a);
}
</style>
