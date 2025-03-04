<script setup lang="ts">
import { ref } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import type { Widget, WidgetType } from '../types'

const dashboardStore = useDashboardStore()

const widgetTypes: { type: WidgetType, label: string, description: string, icon: string }[] = [
  { 
    type: 'chart', 
    label: 'Chart Widget', 
    description: 'Display data in various chart formats like line, bar, or pie charts.',
    icon: 'chart'
  },
  { 
    type: 'metric', 
    label: 'Metric Widget', 
    description: 'Show a single metric with an optional icon and color.',
    icon: 'metric'
  },
  { 
    type: 'table', 
    label: 'Table Widget', 
    description: 'Display data in a sortable table format.',
    icon: 'table'
  },
  { 
    type: 'map', 
    label: 'Map Widget', 
    description: 'Visualize geographical data on an interactive map.',
    icon: 'map'
  },
  { 
    type: 'custom', 
    label: 'Custom Widget', 
    description: 'Create a custom widget with your own content.',
    icon: 'custom'
  }
]

const newWidget = ref<Partial<Widget>>({
  title: '',
  type: 'chart',
  size: 'medium',
  dataSource: '',
  settings: {}
})

function addWidgetToDashboard() {
  if (!newWidget.value.title || !newWidget.value.dataSource) {
    alert('Please fill in all required fields')
    return
  }
  
  dashboardStore.addWidget({
    id: '',
    title: newWidget.value.title || '',
    type: newWidget.value.type as WidgetType || 'chart',
    size: newWidget.value.size as 'small' | 'medium' | 'large' || 'medium',
    dataSource: newWidget.value.dataSource || '',
    settings: newWidget.value.settings || {}
  })
  
  // Reset form
  newWidget.value = {
    title: '',
    type: 'chart',
    size: 'medium',
    dataSource: '',
    settings: {}
  }
  
  alert('Widget added to dashboard!')
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Widget Gallery</h1>
      <p class="text-gray-600">Browse and add widgets to your dashboard</p>
    </div>
    
    <!-- Widget Types -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div 
        v-for="widgetType in widgetTypes" 
        :key="widgetType.type"
        class="dashboard-card cursor-pointer"
        @click="newWidget.type = widgetType.type"
      >
        <div class="flex items-start">
          <div class="p-3 rounded-lg bg-primary-50 mr-4">
            <!-- Chart Icon -->
            <svg v-if="widgetType.icon === 'chart'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            
            <!-- Metric Icon -->
            <svg v-if="widgetType.icon === 'metric'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            
            <!-- Table Icon -->
            <svg v-if="widgetType.icon === 'table'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            
            <!-- Map Icon -->
            <svg v-if="widgetType.icon === 'map'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            
            <!-- Custom Icon -->
            <svg v-if="widgetType.icon === 'custom'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
          </div>
          
          <div>
            <h3 class="font-semibold text-gray-800">{{ widgetType.label }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ widgetType.description }}</p>
          </div>
          
          <div class="ml-auto">
            <div class="h-5 w-5 rounded-full border-2 border-primary-600" :class="{ 'bg-primary-600': newWidget.type === widgetType.type }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add Widget Form -->
    <div class="dashboard-card mb-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Add New Widget</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="widget-title" class="block text-sm font-medium text-gray-700 mb-1">Widget Title</label>
          <input 
            id="widget-title" 
            v-model="newWidget.title" 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter widget title"
          />
        </div>
        
        <div>
          <label for="widget-size" class="block text-sm font-medium text-gray-700 mb-1">Widget Size</label>
          <select 
            id="widget-size" 
            v-model="newWidget.size" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
      
      <div class="mb-4">
        <label for="widget-datasource" class="block text-sm font-medium text-gray-700 mb-1">Data Source</label>
        <select 
          id="widget-datasource" 
          v-model="newWidget.dataSource" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Select a data source</option>
          <option value="visitors.current">Current Visitors</option>
          <option value="visitors.history">Visitors History</option>
          <option value="sales.today">Today's Sales</option>
          <option value="sales.weekly">Weekly Sales</option>
          <option value="performance.cpu">CPU Usage</option>
          <option value="performance.memory">Memory Usage</option>
          <option value="performance.history">Performance History</option>
          <option value="errors.count">Error Count</option>
          <option value="errors.list">Error List</option>
        </select>
      </div>
      
      <!-- Chart Type (only show if chart widget is selected) -->
      <div class="mb-4" v-if="newWidget.type === 'chart'">
        <label for="chart-type" class="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
        <select 
          id="chart-type" 
          v-model="newWidget.settings.chartType" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>
      
      <!-- Metric Settings (only show if metric widget is selected) -->
      <div v-if="newWidget.type === 'metric'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="metric-format" class="block text-sm font-medium text-gray-700 mb-1">Format</label>
          <select 
            id="metric-format" 
            v-model="newWidget.settings.format" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="number">Number</option>
            <option value="currency">Currency</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        
        <div>
          <label for="metric-color" class="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <select 
            id="metric-color" 
            v-model="newWidget.settings.color" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="purple">Purple</option>
          </select>
        </div>
        
        <div>
          <label for="metric-icon" class="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <select 
            id="metric-icon" 
            v-model="newWidget.settings.icon" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="users">Users</option>
            <option value="money">Money</option>
            <option value="cpu">CPU</option>
            <option value="memory">Memory</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end">
        <button 
          @click="addWidgetToDashboard" 
          class="btn btn-primary"
        >
          Add Widget to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>