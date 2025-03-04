import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Widget, WidgetType, DashboardLayout } from '../types'

export const useDashboardStore = defineStore('dashboard', () => {
  const widgets = ref<Widget[]>([])
  const layouts = ref<DashboardLayout[]>([
    { id: 'default', name: 'Default Layout', isActive: true }
  ])
  const isEditMode = ref(false)
  
  // Real-time data storage
  const realtimeData = ref({
    visitors: {
      current: 0,
      history: [] as number[]
    },
    sales: {
      today: 0,
      weekly: [] as number[]
    },
    performance: {
      cpu: 0,
      memory: 0,
      history: [] as {cpu: number, memory: number, timestamp: number}[]
    },
    errors: {
      count: 0,
      list: [] as {id: string, message: string, timestamp: number}[]
    }
  })
  
  // Computed properties
  const activeLayout = computed(() => 
    layouts.value.find(layout => layout.isActive) || layouts.value[0]
  )
  
  const widgetsByType = computed(() => {
    const result: Record<WidgetType, Widget[]> = {
      'chart': [],
      'metric': [],
      'table': [],
      'map': [],
      'custom': []
    }
    
    widgets.value.forEach(widget => {
      result[widget.type].push(widget)
    })
    
    return result
  })
  
  // Actions
  function addWidget(widget: Widget) {
    widgets.value.push({
      ...widget,
      id: `widget-${Date.now()}`
    })
  }
  
  function removeWidget(widgetId: string) {
    const index = widgets.value.findIndex(w => w.id === widgetId)
    if (index !== -1) {
      widgets.value.splice(index, 1)
    }
  }
  
  function updateWidget(widgetId: string, updates: Partial<Widget>) {
    const widget = widgets.value.find(w => w.id === widgetId)
    if (widget) {
      Object.assign(widget, updates)
    }
  }
  
  function setEditMode(value: boolean) {
    isEditMode.value = value
  }
  
  function createLayout(name: string) {
    const newLayout: DashboardLayout = {
      id: `layout-${Date.now()}`,
      name,
      isActive: false
    }
    layouts.value.push(newLayout)
    return newLayout.id
  }
  
  function activateLayout(layoutId: string) {
    layouts.value.forEach(layout => {
      layout.isActive = layout.id === layoutId
    })
  }
  
  function updateRealtimeData(data: any) {
    // Update visitors data
    if (data.visitors) {
      realtimeData.value.visitors.current = data.visitors.current
      if (data.visitors.history) {
        realtimeData.value.visitors.history = data.visitors.history
      }
    }
    
    // Update sales data
    if (data.sales) {
      realtimeData.value.sales.today = data.sales.today
      if (data.sales.weekly) {
        realtimeData.value.sales.weekly = data.sales.weekly
      }
    }
    
    // Update performance data
    if (data.performance) {
      realtimeData.value.performance.cpu = data.performance.cpu
      realtimeData.value.performance.memory = data.performance.memory
      if (data.performance.timestamp) {
        realtimeData.value.performance.history.push({
          cpu: data.performance.cpu,
          memory: data.performance.memory,
          timestamp: data.performance.timestamp
        })
        // Keep only the last 100 entries
        if (realtimeData.value.performance.history.length > 100) {
          realtimeData.value.performance.history.shift()
        }
      }
    }
    
    // Update errors data
    if (data.errors) {
      realtimeData.value.errors.count = data.errors.count
      if (data.errors.list) {
        realtimeData.value.errors.list = data.errors.list
      }
    }
  }
  
  return {
    widgets,
    layouts,
    isEditMode,
    realtimeData,
    activeLayout,
    widgetsByType,
    addWidget,
    removeWidget,
    updateWidget,
    setEditMode,
    createLayout,
    activateLayout,
    updateRealtimeData
  }
})