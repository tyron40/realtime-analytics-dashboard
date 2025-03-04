<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDashboardStore } from '../../stores/dashboardStore'
import type { TableColumn } from '../../types'

const props = defineProps<{
  id: string
  title: string
  dataSource: string
  columns: TableColumn[]
}>()

const dashboardStore = useDashboardStore()
const sortBy = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const tableData = computed(() => {
  // Parse the data source path to get the data from the store
  const parts = props.dataSource.split('.')
  let data = dashboardStore.realtimeData
  
  for (const part of parts) {
    if (data && data[part]) {
      data = data[part]
    } else {
      return []
    }
  }
  
  return data
})

const sortedData = computed(() => {
  if (!sortBy.value) return tableData.value
  
  return [...tableData.value].sort((a, b) => {
    if (a[sortBy.value] < b[sortBy.value]) {
      return sortDirection.value === 'asc' ? -1 : 1
    }
    if (a[sortBy.value] > b[sortBy.value]) {
      return sortDirection.value === 'asc' ? 1 : -1
    }
    return 0
  })
})

function toggleSort(column: TableColumn) {
  if (!column.sortable) return
  
  if (sortBy.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column.key
    sortDirection.value = 'asc'
  }
}

function formatValue(value: any, column: TableColumn) {
  if (value === undefined || value === null) return 'N/A'
  
  if (column.key === 'timestamp') {
    return new Date(value).toLocaleString()
  }
  
  return value
}
</script>

<template>
  <div class="dashboard-card h-full flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold text-gray-800">{{ title }}</h3>
      <div class="flex space-x-2">
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="flex-1 overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              scope="col" 
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              :class="{ 'cursor-pointer hover:bg-gray-100': column.sortable }"
              @click="toggleSort(column)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable && sortBy === column.key">
                  <svg v-if="sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, index) in sortedData" :key="index">
            <td 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              {{ formatValue(row[column.key], column) }}
            </td>
          </tr>
          <tr v-if="sortedData.length === 0">
            <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>