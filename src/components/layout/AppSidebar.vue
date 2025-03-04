<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDashboardStore } from '../../stores/dashboardStore'

const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const dashboardStore = useDashboardStore()

const navItems = [
  { name: 'Dashboard', path: '/', icon: 'dashboard' },
  { name: 'Widget Gallery', path: '/widgets', icon: 'widgets' },
  { name: 'Settings', path: '/settings', icon: 'settings' }
]

function toggleSidebar() {
  collapsed.value = !collapsed.value
}

function isActive(path: string): boolean {
  return route.path === path
}
</script>

<template>
  <aside 
    class="bg-primary-800 text-white transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <div class="p-4 flex items-center justify-between">
      <h2 v-if="!collapsed" class="text-xl font-bold">Analytics</h2>
      <button @click="toggleSidebar" class="p-1 rounded-md hover:bg-primary-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="collapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
    
    <nav class="mt-8">
      <ul class="space-y-2 px-2">
        <li v-for="item in navItems" :key="item.name">
          <router-link 
            :to="item.path" 
            class="flex items-center p-3 rounded-md transition-colors duration-200"
            :class="isActive(item.path) ? 'bg-primary-700' : 'hover:bg-primary-700'"
          >
            <span class="flex items-center justify-center w-6 h-6">
              <!-- Dashboard Icon -->
              <svg v-if="item.icon === 'dashboard'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              
              <!-- Widgets Icon -->
              <svg v-if="item.icon === 'widgets'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              
              <!-- Settings Icon -->
              <svg v-if="item.icon === 'settings'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span v-if="!collapsed" class="ml-3">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <div class="absolute bottom-0 w-full p-4">
      <div v-if="!collapsed" class="bg-primary-700 rounded-md p-3 text-sm">
        <div class="flex items-center justify-between mb-2">
          <span>Active Users</span>
          <span class="font-bold">{{ dashboardStore.realtimeData.visitors.current }}</span>
        </div>
        <div class="w-full bg-primary-600 rounded-full h-1.5">
          <div class="bg-green-500 h-1.5 rounded-full" :style="`width: ${Math.min(100, dashboardStore.realtimeData.visitors.current / 2)}%`"></div>
        </div>
      </div>
    </div>
  </aside>
</template>