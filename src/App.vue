<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import socketService from './services/socketService'

// Connect to WebSocket when app mounts
onMounted(() => {
  socketService.connect()
})

// Disconnect when app unmounts
onUnmounted(() => {
  socketService.disconnect()
})
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <AppSidebar />
    <div class="flex flex-col flex-1 overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-y-auto p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>