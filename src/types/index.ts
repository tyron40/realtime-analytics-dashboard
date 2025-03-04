// Widget types
export type WidgetType = 'chart' | 'metric' | 'table' | 'map' | 'custom'

export interface Widget {
  id: string
  title: string
  type: WidgetType
  size: 'small' | 'medium' | 'large'
  dataSource: string
  settings: Record<string, any>
  position?: {
    x: number
    y: number
    w: number
    h: number
  }
}

// Dashboard layout
export interface DashboardLayout {
  id: string
  name: string
  isActive: boolean
  widgets?: string[] // Widget IDs
}

// Chart data types
export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }[]
}

// Table data types
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
}

export interface TableData {
  columns: TableColumn[]
  rows: Record<string, any>[]
}