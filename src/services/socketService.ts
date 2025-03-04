import { io } from 'socket.io-client'
import { useDashboardStore } from '../stores/dashboardStore'

// This would be your actual WebSocket server URL in production
const SOCKET_URL = 'http://localhost:3000'

class SocketService {
  private socket: any
  private connected: boolean = false
  
  constructor() {
    this.socket = null
  }
  
  connect() {
    if (this.connected) return
    
    // In a real app, connect to your actual WebSocket server
    // For demo purposes, we'll simulate the connection
    console.log('Connecting to WebSocket server...')
    
    // Uncomment this when you have a real WebSocket server
    // this.socket = io(SOCKET_URL)
    
    // For demo, we'll simulate WebSocket data
    this.simulateConnection()
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.connected = false
    console.log('Disconnected from WebSocket server')
  }
  
  // For demo purposes only - simulates WebSocket data
  private simulateConnection() {
    this.connected = true
    console.log('Connected to simulated WebSocket server')
    
    const dashboardStore = useDashboardStore()
    
    // Initial data
    const initialData = {
      visitors: {
        current: 127,
        history: [98, 102, 110, 115, 120, 124, 127]
      },
      sales: {
        today: 12580,
        weekly: [9540, 10250, 11200, 9800, 12580, 0, 0]
      },
      performance: {
        cpu: 42,
        memory: 68,
        timestamp: Date.now()
      },
      errors: {
        count: 3,
        list: [
          { id: 'err-1', message: 'API timeout', timestamp: Date.now() - 300000 },
          { id: 'err-2', message: 'Database connection failed', timestamp: Date.now() - 600000 },
          { id: 'err-3', message: 'Authentication error', timestamp: Date.now() - 900000 }
        ]
      }
    }
    
    dashboardStore.updateRealtimeData(initialData)
    
    // Simulate real-time updates
    setInterval(() => {
      const currentVisitors = dashboardStore.realtimeData.visitors.current
      const newVisitors = Math.max(80, Math.min(200, currentVisitors + Math.floor(Math.random() * 11) - 5))
      
      const currentSales = dashboardStore.realtimeData.sales.today
      const salesIncrease = Math.floor(Math.random() * 500)
      
      const newData = {
        visitors: {
          current: newVisitors
        },
        sales: {
          today: currentSales + salesIncrease
        },
        performance: {
          cpu: Math.floor(Math.random() * 60) + 20,
          memory: Math.floor(Math.random() * 40) + 40,
          timestamp: Date.now()
        }
      }
      
      // Randomly add new errors (10% chance)
      if (Math.random() < 0.1) {
        const errorMessages = [
          'API timeout',
          'Database connection failed',
          'Authentication error',
          'Invalid request format',
          'Resource not found',
          'Permission denied'
        ]
        
        const randomError = {
          id: `err-${Date.now()}`,
          message: errorMessages[Math.floor(Math.random() * errorMessages.length)],
          timestamp: Date.now()
        }
        
        const currentErrors = [...dashboardStore.realtimeData.errors.list]
        currentErrors.unshift(randomError)
        
        // Keep only the last 10 errors
        if (currentErrors.length > 10) {
          currentErrors.pop()
        }
        
        newData.errors = {
          count: dashboardStore.realtimeData.errors.count + 1,
          list: currentErrors
        }
      }
      
      dashboardStore.updateRealtimeData(newData)
    }, 5000) // Update every 5 seconds
  }
}

export default new SocketService()