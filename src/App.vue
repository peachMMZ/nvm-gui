<template>
  <div class="container">
    <n-tabs type="line" animated justify-content="center">
      <n-tab-pane name="home" tab="Home">
        <Home />
      </n-tab-pane>
      <n-tab-pane name="list" tab="List">
        <Home />
      </n-tab-pane>
      <n-tab-pane name="setting" tab="Setting">
        <Home />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  NTabs,
  NTabPane
} from 'naive-ui'
import Home from './components/Home.vue';

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
