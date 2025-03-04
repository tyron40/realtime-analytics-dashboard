<script setup lang="ts">
import { ref } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'

const dashboardStore = useDashboardStore()
const showNotifications = ref(false)

function toggleEditMode() {
  dashboardStore.setEditMode(!dashboardStore.isEditMode)
}

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <div class="flex items-center">
      <h1 class="text-xl font-semibold text-gray-800">Analytics Dashboard</h1>
    </div>
    
    <div class="flex items-center space-x-4">
      <button 
        @click="toggleEditMode" 
        class="btn" 
        :class="dashboardStore.isEditMode ? 'btn-primary' : 'btn-secondary'"
      >
        {{ dashboardStore.isEditMode ? 'Save Layout' : 'Edit Layout' }}
      </button>
      
      <div class="relative">
        <button 
          @click="toggleNotifications" 
          class="p-2 rounded-full hover:bg-gray-100 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span v-if="dashboardStore.realtimeData.errors.count > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {{ dashboardStore.realtimeData.errors.count }}
          </span>
        </button>
        
        <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div class="px-4 py-2 border-b border-gray-200">
            <h3 class="text-sm font-semibold text-gray-700">Notifications</h3>
          </div>
          <div class="max-h-64 overflow-y-auto">
            <div v-if="dashboardStore.realtimeData.errors.list.length === 0" class="px-4 py-2 text-sm text-gray-500">
              No new notifications
            </div>
            <div 
              v-for="error in dashboardStore.realtimeData.errors.list" 
              :key="error.id"
              class="px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0 pt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ error.message }}</p>
                  <p class="text-xs text-gray-500">{{ new Date(error.timestamp).toLocaleTimeString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="relative">
        <button class="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
          <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="User" class="w-8 h-8 rounded-full" />
        </button>
      </div>
    </div>
  </header>
</template>