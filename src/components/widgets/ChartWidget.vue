<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useDashboardStore } from '../../stores/dashboardStore'

Chart.register(...registerables)

const props = defineProps<{
  id: string
  title: string
  type: 'line' | 'bar' | 'pie' | 'doughnut'
  dataSource: string
  height?: number
}>()

const dashboardStore = useDashboardStore()
const chartRef = ref<HTMLCanvasElement | null>(null)
const chartInstance = ref<Chart | null>(null)

const chartData = computed(() => {
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

function createChart() {
  if (!chartRef.value) return
  
  const ctx = chartRef.value.getContext('2d')
  if (!ctx) return
  
  // Destroy existing chart if it exists
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  
  // Prepare data based on chart type and data source
  let labels: string[] = []
  let datasets: any[] = []
  
  if (props.dataSource === 'visitors.history') {
    labels = Array.from({ length: chartData.value.length }, (_, i) => `${i + 1}m ago`)
    datasets = [{
      label: 'Visitors',
      data: chartData.value,
      backgroundColor: 'rgba(14, 165, 233, 0.2)',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 2,
      tension: 0.4
    }]
  } else if (props.dataSource === 'sales.weekly') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    datasets = [{
      label: 'Sales',
      data: chartData.value,
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 1)',
      borderWidth: 2
    }]
  } else if (props.dataSource === 'performance.history') {
    // For performance history, we need to extract CPU and memory data
    labels = chartData.value.map((item: any) => {
      const date = new Date(item.timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    
    datasets = [
      {
        label: 'CPU',
        data: chartData.value.map((item: any) => item.cpu),
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        tension: 0.4
      },
      {
        label: 'Memory',
        data: chartData.value.map((item: any) => item.memory),
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2,
        tension: 0.4
      }
    ]
  }
  
  // Create chart
  chartInstance.value = new Chart(ctx, {
    type: props.type,
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: props.type === 'pie' || props.type === 'doughnut' ? undefined : {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

// Initialize chart when component is mounted
onMounted(() => {
  if (chartData.value) {
    createChart()
  }
})

// Update chart when data changes
watch(chartData, () => {
  if (chartData.value) {
    createChart()
  }
}, { deep: true })
</script>

<template>
  <div class="dashboard-card h-full flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-semibold text-gray-800">{{ title }}</h3>
      <div class="flex space-x-2">
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex-1 min-h-0">
      <canvas ref="chartRef" :height="height || 200"></canvas>
    </div>
  </div>
</template>