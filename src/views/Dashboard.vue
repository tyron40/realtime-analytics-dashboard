<script setup lang="ts">
import { onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboardStore'
import ChartWidget from '../components/widgets/ChartWidget.vue'
import MetricWidget from '../components/widgets/MetricWidget.vue'
import TableWidget from '../components/widgets/TableWidget.vue'

const dashboardStore = useDashboardStore()

// Add default widgets if none exist
onMounted(() => {
  if (dashboardStore.widgets.length === 0) {
    // Add metric widgets
    dashboardStore.addWidget({
      id: '',
      title: 'Active Users',
      type: 'metric',
      size: 'small',
      dataSource: 'visitors.current',
      settings: {
        format: 'number',
        icon: 'users',
        color: 'blue'
      }
    })
    
    dashboardStore.addWidget({
      id: '',
      title: 'Today\'s Sales',
      type: 'metric',
      size: 'small',
      dataSource: 'sales.today',
      settings: {
        format: 'currency',
        icon: 'money',
        color: 'green'
      }
    })
    
    dashboardStore.addWidget({
      id: '',
      title: 'CPU Usage',
      type: 'metric',
      size: 'small',
      dataSource: 'performance.cpu',
      settings: {
        format: 'percentage',
        icon: 'cpu',
        color: 'red'
      }
    })
    
    dashboardStore.addWidget({
      id: '',
      title: 'Memory Usage',
      type: 'metric',
      size: 'small',
      dataSource: 'performance.memory',
      settings: {
        format: 'percentage',
        icon: 'memory',
        color: 'yellow'
      }
    })
    
    // Add chart widgets
    dashboardStore.addWidget({
      id: '',
      title: 'Visitors Trend',
      type: 'chart',
      size: 'medium',
      dataSource: 'visitors.history',
      settings: {
        chartType: 'line'
      }
    })
    
    dashboardStore.addWidget({
      id: '',
      title: 'Weekly Sales',
      type: 'chart',
      size: 'medium',
      dataSource: 'sales.weekly',
      settings: {
        chartType: 'bar'
      }
    })
    
    dashboardStore.addWidget({
      id: '',
      title: 'System Performance',
      type: 'chart',
      size: 'large',
      dataSource: 'performance.history',
      settings: {
        chartType: 'line'
      }
    })
    
    // Add table widget
    dashboardStore.addWidget({
      id: '',
      title: 'Recent Errors',
      type: 'table',
      size: 'large',
      dataSource: 'errors.list',
      settings: {
        columns: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'message', label: 'Message', sortable: true },
          { key: 'timestamp', label: 'Time', sortable: true }
        ]
      }
    })
  }
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600">Real-time analytics overview</p>
    </div>
    
    <!-- Metrics Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="widget in dashboardStore.widgetsByType.metric" :key="widget.id">
        <MetricWidget 
          :id="widget.id"
          :title="widget.title"
          :dataSource="widget.dataSource"
          :format="widget.settings.format"
          :icon="widget.settings.icon"
          :color="widget.settings.color"
        />
      </div>
    </div>
    
    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <div v-for="widget in dashboardStore.widgetsByType.chart.filter(w => w.size === 'medium')" :key="widget.id">
        <ChartWidget 
          :id="widget.id"
          :title="widget.title"
          :type="widget.settings.chartType"
          :dataSource="widget.dataSource"
          :height="250"
        />
      </div>
    </div>
    
    <!-- Full Width Charts -->
    <div class="mb-6">
      <div v-for="widget in dashboardStore.widgetsByType.chart.filter(w => w.size === 'large')" :key="widget.id">
        <ChartWidget 
          :id="widget.id"
          :title="widget.title"
          :type="widget.settings.chartType"
          :dataSource="widget.dataSource"
          :height="300"
        />
      </div>
    </div>
    
    <!-- Tables -->
    <div class="mb-6">
      <div v-for="widget in dashboardStore.widgetsByType.table" :key="widget.id" class="mb-4">
        <TableWidget 
          :id="widget.id"
          :title="widget.title"
          :dataSource="widget.dataSource"
          :columns="widget.settings.columns"
        />
      </div>
    </div>
  </div>
</template>