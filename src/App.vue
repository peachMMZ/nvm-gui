<template>
  <n-message-provider>
    <div class="container">
      <n-tabs type="line" animated justify-content="center">
        <n-tab-pane v-for="tabPane in tabPaneList" :key="tabPane.name" :name="tabPane.name" :tab="tabPane.tab">
          <KeepAlive>
            <component :is="tabPane.component" />
          </KeepAlive>
        </n-tab-pane>
      </n-tabs>
    </div>
  </n-message-provider>
</template>

<script setup lang="ts">
import {
  NTabs,
  NTabPane,
  NMessageProvider
} from 'naive-ui'
import Home from './components/Home.vue';
import NodeList from './components/NodeList.vue';
import Install from './components/Install.vue';
import Setting from './components/Setting.vue';

const tabPaneList = [
  { name: 'home', tab: 'Home', component: Home },
  { name: 'list', tab: 'List', component: NodeList },
  { name: 'install', tab: 'Install', component: Install },
  { name: 'setting', tab: 'Setting', component: Setting }
]

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
