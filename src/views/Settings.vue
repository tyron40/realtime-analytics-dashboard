<script setup lang="ts">
import { ref } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import socketService from '../services/socketService'

const dashboardStore = useDashboardStore()
const newLayoutName = ref('')

function createNewLayout() {
  if (!newLayoutName.value) return
  
  const layoutId = dashboardStore.createLayout(newLayoutName.value)
  newLayoutName.value = ''
}

function activateLayout(layoutId: string) {
  dashboardStore.activateLayout(layoutId)
}

function reconnectWebSocket() {
  socketService.disconnect()
  socketService.connect()
}

// Theme settings
const theme = ref('light')
const refreshInterval = ref(5)
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600">Configure your dashboard preferences</p>
    </div>
    
    <!-- Dashboard Layouts -->
    <div class="dashboard-card mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Dashboard Layouts</h2>
      
      <div class="mb-4">
        <div v-for="layout in dashboardStore.layouts" :key="layout.id" class="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
          <div class="flex items-center">
            <div class="h-4 w-4 rounded-full mr-3" :class="layout.isActive ? 'bg-green-500' : 'bg-gray-300'"></div>
            <span>{{ layout.name }}</span>
          </div>
          <button 
            @click="activateLayout(layout.id)" 
            class="btn btn-secondary text-sm py-1"
            :disabled="layout.isActive"
          >
            {{ layout.isActive ? 'Active' : 'Activate' }}
          </button>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <input 
          v-model="newLayoutName" 
          type="text" 
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          placeholder="New layout name"
        />
        <button 
          @click="createNewLayout" 
          class="btn btn-primary"
          :disabled="!newLayoutName"
        >
          Create Layout
        </button>
      </div>
    </div>
    
    <!-- Theme Settings -->
    <div class="dashboard-card mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Theme Settings</h2>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Theme</label>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input type="radio" v-model="theme" value="light" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
            <span class="ml-2 text-gray-700">Light</span>
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="theme" value="dark" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
            <span class="ml-2 text-gray-700">Dark</span>
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="theme" value="system" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
            <span class="ml-2 text-gray-700">System</span>
          </label>
        </div>
      </div>
    </div>
    
    <!-- Data Settings -->
    <div class="dashboard-card mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Data Settings</h2>
      
      <div class="mb-4">
        <label for="refresh-interval" class="block text-sm font-medium text-gray-700 mb-1">Data Refresh Interval (seconds)</label>
        <input 
          id="refresh-interval" 
          v-model="refreshInterval" 
          type="number" 
          min="1" 
          max="60" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      <div class="mb-4">
        <button @click="reconnectWebSocket" class="btn btn-secondary">
          Reconnect to Data Source
        </button>
      </div>
    </div>
    
    <!-- Export/Import -->
    <div class="dashboard-card">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Export/Import</h2>
      
      <div class="flex space-x-4">
        <button class="btn btn-secondary">
          Export Dashboard
        </button>
        <button class="btn btn-secondary">
          Import Dashboard
        </button>
      </div>
    </div>
  </div>
</template>