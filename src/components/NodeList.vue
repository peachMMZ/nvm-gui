<template>
  <div style="padding: 5px;">
    <n-grid x-gap="12" y-gap="12" :cols="2">
      <n-grid-item v-for="(item, index) in nodeList" :key="index">
        <n-card title="node.js" hoverable>
          <n-text type="success" strong>
            {{ item.version }}
          </n-text>
          <template #header-extra>
            <n-icon v-if="item.isCurrent" :size="30">
              <CheckmarkSharp />
            </n-icon>
          </template>
          <template #action>
            <n-flex justify="center">
              <n-button type="primary" size="small" round :disabled="item.isCurrent" @click="switchVersion(item)">Use</n-button>
              <n-button type="error" size="small" round :disabled="item.isCurrent" @click="uninstall(item)">Uninstall</n-button>
            </n-flex>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import {
  NCard,
  NGrid,
  NGridItem,
  NFlex,
  NButton,
  NText,
  NIcon,
  useMessage
} from 'naive-ui'
import { ref, onMounted } from 'vue'
import nvmService from '@/service/nvm'
import { CheckmarkSharp } from '@vicons/ionicons5'

const message = useMessage()

type NodeVersionInfo = {
  version: string
  isCurrent: boolean,
  using?: boolean
  uninstalling?: boolean
}
const nodeList = ref<NodeVersionInfo[]>([])

function getNodeList() {
  nodeList.value = []
  nvmService.list(false, setNodeVersionInfo)
}

function setNodeVersionInfo(data: string) {
  if (data && data.length > 0) {
    let isCurrent = false
    if (data.includes('Currently')) {
      isCurrent = true
    }
    const regex = /(\d+\.\d+\.\d+)/
    const version = data.match(regex)?.[1]
    if (version) {
      nodeList.value.push({
        version: version,
        isCurrent: isCurrent
      })
    }
  }
}

function switchVersion(info: NodeVersionInfo) {
  info.using = true
  nvmService.use(info.version).then(() => {
    message.success('Switch to node.js version ' + info.version + ' success')
    getNodeList()
  }).finally(() => {
    info.using = false
  })
}

function uninstall(info: NodeVersionInfo) {
  info.uninstalling = true
  nvmService.uninstall(info.version).then(() => {
    message.success('Uninstall node.js version ' + info.version + ' success')
    getNodeList()
  }).finally(() => {
    info.uninstalling = false
  })
}

onMounted(() => {
  getNodeList()
})
</script>
<style scoped></style>
