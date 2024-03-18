<template>
  <n-spin :show="loading">
    <div style="padding: 5px;min-height: 50px;">
      <n-flex justify="space-between">
        <n-checkbox-group v-model:value="filter.tags">
          <n-checkbox
            v-for="tag in tagList"
            :value="tag"
            :key="tag"
            @click="dataFilter"
          >
            {{ tag }}
          </n-checkbox>
        </n-checkbox-group>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon><AlertCircleOutline /></n-icon>
          </template>
          <n-text type="info">
            This is a partial list. For a complete list, visit 
            <n-button text @click="open('https://nodejs.org/en/download/releases')">
              <n-text type="success" underline>https://nodejs.org/en/download/releases.</n-text>
            </n-button>
            <br/>
            You can also enter the version number to try manual installation
          </n-text>
        </n-tooltip>
      </n-flex>
      <n-flex>
        <n-input v-model:value="installVersion" placeholder="please input version number" style="width: 80%;" />
        <n-button type="primary" round @click="install({ version: installVersion, tag: 'LTS' })">install</n-button>
      </n-flex>
      <n-grid x-gap="12" y-gap="12" cols="12" item-responsive style="margin-top: 5px;">
        <n-grid-item v-for="(item, index) in filterNodeList" :key="index" span="400:6 600:4 800:3 1200:2">
          <n-card title="node.js" hoverable>
            <n-flex justify="space-around">
              <n-text type="success" strong>
                {{ item.version }}
              </n-text>
              <n-tag :type="getTagType(item.tag)" size="small" round>{{ item.tag }}</n-tag>
            </n-flex>
            <template #header-extra>
              <img v-if="!existNode.includes(item.version)" src="../assets/node.svg" style="width: 50px;">
              <n-icon v-else :size="50"><CheckmarkSharp /></n-icon>
            </template>
            <template #action>
              <n-flex justify="center">
                <n-button
                  type="primary"
                  size="small"
                  round
                  :disabled="existNode.includes(item.version)"
                  :loading="item.installing"
                  @click="install(item)"
                >
                  install
                </n-button>
              </n-flex>
            </template>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import {
  NSpin,
  NCard,
  NGrid,
  NGridItem,
  NFlex,
  NButton,
  NText,
  NIcon,
  NTag,
  NCheckboxGroup,
  NCheckbox,
  NTooltip,
  NInput,
  useMessage
} from 'naive-ui'
import { ref, onMounted } from 'vue'
import nvmService from '@/service/nvm'
import { CheckmarkSharp, AlertCircleOutline } from '@vicons/ionicons5'
import { open } from '@tauri-apps/api/shell'

const message = useMessage()

type nodeInfo = {
  version: string,
  tag: 'CURRENT' | 'LTS' | 'OLD STABLE' | 'OLD UNSTABLE',
  installing?: boolean
}

const tagList = ['CURRENT', 'LTS', 'OLD STABLE', 'OLD UNSTABLE']
const loading = ref(true)
const existNode = ref('')
const nodeList = ref<nodeInfo[]>([])
const filterNodeList = ref<nodeInfo[]>([])
const filter = ref({
  tags: ['CURRENT', 'LTS'] as nodeInfo['tag'][]
})

const installVersion = ref('')

function getTagType(tag: string) {
  switch (tag) {
    case 'LTS':
      return 'success'
    case 'CURRENT':
      return 'info'
    case 'OLD STABLE':
      return 'warning'
    case 'OLD UNSTABLE':
      return 'error'
    default:
      return undefined
  }
}

function getNodeList() {
  loading.value = true
  let rowNum = 0
  nvmService.list(true, (data) => {
    if (++rowNum >= 4) {
      const regex = /(\d+\.\d+\.\d+)/
      // 如果data中不含有版本信息，进入下一个循环
      if (!regex.test(data)) {
        return
      }
      const versionList = data.replace(' ', '').split('|').map((item) => item.trim()).filter((item) => item !== '')
      for (let i = 0; i < 4; i++) {
        if (versionList[i]) {
          nodeList.value.push({
            version: versionList[i],
            tag: tagList[i] as nodeInfo['tag'],
            installing: false
          })
        }
      }
    }
  }).finally(() => {
    // 根据版本号排序
    nodeList.value.sort((a, b) => {
      const aVersion = a.version.split('.').map((item) => Number(item))
      //数组元素求和
      const aSum = aVersion[0] * 100 + aVersion[1] * 10 + aVersion[2]
      const bVersion = b.version.split('.').map((item) => Number(item))
      const bSum = bVersion[0] * 100 + bVersion[1] * 10 + bVersion[2]
      return bSum - aSum
    })
    dataFilter()
    loading.value = false
  })
}

function dataFilter() {
  filterNodeList.value = nodeList.value.filter((item) => {
    return filter.value.tags.includes(item.tag)
  })
}

function getExistNode() {
  nvmService.list().then((res) => {
    existNode.value = res.stdout
  })
}

function install(info: nodeInfo) {
  if (!info.version) {
    message.error('please input or choose a version')
    return
  }
  info.installing = true
  nvmService.install(info.version).then(() => {
    existNode.value += (' ' + info.version)
    message.success('install success')
  }).finally(() => {
    info.installing = false
  })
}

onMounted(async () => {
  getNodeList()
  getExistNode()
})
</script>
<style scoped></style>
