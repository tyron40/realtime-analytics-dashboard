<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'

const props = defineProps<{
  id: string
  title: string
  dataSource: string
  format?: 'number' | 'currency' | 'percentage'
  icon?: string
  color?: string
}>()

const dashboardStore = useDashboardStore()

const metricValue = computed(() => {
  // Parse the data source path to get the data from the store
  const parts = props.dataSource.split('.')
  let data = dashboardStore.realtimeData
  
  for (const part of parts) {
    if (data && data[part]) {
      data = data[part]
    } else {
      return null
    }
  }
  
  return data
})

const formattedValue = computed(() => {
  if (metricValue.value === null) return 'N/A'
  
  if (props.format === 'currency') {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(metricValue.value)
  } else if (props.format === 'percentage') {
    return `${metricValue.value}%`
  } else {
    return new Intl.NumberFormat().format(metricValue.value)
  }
})

const bgColor = computed(() => {
  switch (props.color) {
    case 'blue': return 'bg-blue-50'
    case 'green': return 'bg-green-50'
    case 'red': return 'bg-red-50'
    case 'yellow': return 'bg-yellow-50'
    case 'purple': return 'bg-purple-50'
    default: return 'bg-gray-50'
  }
})

const iconColor = computed(() => {
  switch (props.color) {
    case 'blue': return 'text-blue-500'
    case 'green': return 'text-green-500'
    case 'red': return 'text-red-500'
    case 'yellow': return 'text-yellow-500'
    case 'purple': return 'text-purple-500'
    default: return 'text-gray-500'
  }
})
</script>

<template>
  <div class="dashboard-card h-full">
    <div class="flex items-start">
      <div :class="['p-3 rounded-lg mr-4', bgColor]" v-if="icon">
        <!-- Users Icon -->
        <svg v-if="icon === 'users'" xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        
        <!-- Money Icon -->
        <svg v-else-if="icon === 'money'" xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <!-- CPU Icon -->
        <svg v-else-if="icon === 'cpu'" xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
        
        <!-- Memory Icon -->
        <svg v-else-if="icon === 'memory'" xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        
        <!-- Error Icon -->
        <svg v-else-if="icon === 'error'" xmlns="http://www.w3.org/2000/svg" :class="['h-6 w-6', iconColor]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <div class="flex-1">
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <p class="mt-1 text-2xl font-semibold text-gray-900">{{ formattedValue }}</p>
      </div>
    </div>
  </div>
</template>