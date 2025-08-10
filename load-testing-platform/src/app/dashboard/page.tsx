'use client'

import React, { useState, useEffect } from 'react'
import GlassContainer from '@/components/ui/GlassContainer'
import GlassButton from '@/components/ui/GlassButton'
import GlassChart from '@/components/ui/GlassChart'
import { motion } from 'framer-motion'

// Mock data for demonstration
const generateMockData = () => {
  const now = new Date()
  return Array.from({ length: 24 }, (_, i) => ({
    name: `${i}:00`,
    requests: Math.floor(Math.random() * 1000) + 500,
    latency: Math.floor(Math.random() * 200) + 50,
    errors: Math.floor(Math.random() * 50),
    timestamp: new Date(now.getTime() - (23 - i) * 60 * 60 * 1000).getTime()
  }))
}

const mockActiveTests = [
  { id: 1, name: 'E-commerce API Load Test', status: 'running', progress: 65, users: 150, duration: '45m' },
  { id: 2, name: 'Authentication Stress Test', status: 'running', progress: 23, users: 75, duration: '12m' },
  { id: 3, name: 'Database Performance Test', status: 'pending', progress: 0, users: 0, duration: '0m' }
]

const mockSystemMetrics = {
  activeTests: 127,
  totalUsers: 12547,
  requestsPerSecond: 2341,
  systemHealth: 98.5,
  nodeCount: 24,
  errorRate: 0.03
}

export default function Dashboard() {
  const [realTimeData, setRealTimeData] = useState(generateMockData())
  const [systemMetrics, setSystemMetrics] = useState(mockSystemMetrics)
  const [isConnected, setIsConnected] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update real-time data
      setRealTimeData(prev => {
        const newData = [...prev]
        newData.shift()
        newData.push({
          name: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          requests: Math.floor(Math.random() * 1000) + 500,
          latency: Math.floor(Math.random() * 200) + 50,
          errors: Math.floor(Math.random() * 50),
          timestamp: Date.now()
        })
        return newData
      })

      // Update system metrics
      setSystemMetrics(prev => ({
        ...prev,
        activeTests: prev.activeTests + Math.floor(Math.random() * 10) - 5,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 100) - 50,
        requestsPerSecond: Math.floor(Math.random() * 3000) + 1000,
        systemHealth: Math.max(95, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
        errorRate: Math.max(0, Math.min(5, prev.errorRate + (Math.random() - 0.5) * 0.1))
      }))
    }, 2000)

    // Simulate WebSocket connection
    setTimeout(() => setIsConnected(true), 1000)

    return () => clearInterval(interval)
  }, [])

  const startNewTest = () => {
    console.log('Starting new load test...')
  }

  const MetricCard = ({ title, value, subtitle, color = 'blue', icon }: any) => (
    <GlassContainer
      variant="card"
      className="text-center"
      animationDelay={Math.random() * 0.5}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <div className={`text-2xl font-bold text-${color}-400 mb-1`}>
        {value}
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500">{subtitle}</p>
      )}
    </GlassContainer>
  )

  const StatusIndicator = ({ connected }: { connected: boolean }) => (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-3 h-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}
        animate={{ scale: connected ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: connected ? Infinity : 0 }}
      />
      <span className="text-sm text-gray-300">
        {connected ? 'Live Data' : 'Connecting...'}
      </span>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassContainer
          variant="navigation"
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Load Testing Dashboard
            </h1>
            <p className="text-gray-300">
              Real-time monitoring and control center
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator connected={isConnected} />
            <GlassButton
              variant="primary"
              size="lg"
              onClick={startNewTest}
              icon={<span>🚀</span>}
            >
              Start New Test
            </GlassButton>
          </div>
        </GlassContainer>

        {/* System Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard
            title="Active Tests"
            value={systemMetrics.activeTests}
            subtitle="Currently running"
            color="blue"
            icon="⚡"
          />
          <MetricCard
            title="Total Users"
            value={systemMetrics.totalUsers.toLocaleString()}
            subtitle="Virtual users"
            color="green"
            icon="👥"
          />
          <MetricCard
            title="RPS"
            value={systemMetrics.requestsPerSecond.toLocaleString()}
            subtitle="Requests/second"
            color="purple"
            icon="📊"
          />
          <MetricCard
            title="System Health"
            value={`${systemMetrics.systemHealth.toFixed(1)}%`}
            subtitle="Overall status"
            color="green"
            icon="💚"
          />
          <MetricCard
            title="Active Nodes"
            value={systemMetrics.nodeCount}
            subtitle="Distributed nodes"
            color="cyan"
            icon="🌐"
          />
          <MetricCard
            title="Error Rate"
            value={`${systemMetrics.errorRate.toFixed(2)}%`}
            subtitle="Request errors"
            color="red"
            icon="⚠️"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlassChart
            data={realTimeData}
            type="area"
            title="Requests Per Hour"
            subtitle="Real-time request volume"
            height={300}
            color="#3B82F6"
            xAxisKey="name"
            yAxisKey="requests"
            animated={true}
          />
          
          <GlassChart
            data={realTimeData}
            type="line"
            title="Response Latency"
            subtitle="Average response time (ms)"
            height={300}
            color="#8B5CF6"
            xAxisKey="name"
            yAxisKey="latency"
            animated={true}
          />
        </div>

        {/* Active Tests */}
        <GlassContainer variant="panel">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Active Tests</h2>
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => console.log('View all tests')}
            >
              View All
            </GlassButton>
          </div>
          
          <div className="space-y-4">
            {mockActiveTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassContainer
                  variant="card"
                  className="flex items-center justify-between p-4"
                  padding="16px"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-white">{test.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.status === 'running' 
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-300">
                      <span>{test.users} users</span>
                      <span>{test.duration} elapsed</span>
                      <span>{test.progress}% complete</span>
                    </div>
                    
                    {test.status === 'running' && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${test.progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <GlassButton
                      variant="ghost"
                      size="sm"
                      onClick={() => console.log(`View test ${test.id}`)}
                    >
                      View
                    </GlassButton>
                    {test.status === 'running' && (
                      <GlassButton
                        variant="danger"
                        size="sm"
                        onClick={() => console.log(`Stop test ${test.id}`)}
                      >
                        Stop
                      </GlassButton>
                    )}
                  </div>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </GlassContainer>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassContainer variant="card" className="text-center p-6">
            <h3 className="text-lg font-semibold text-white mb-2">📈 Analytics</h3>
            <p className="text-gray-300 mb-4">View detailed performance reports</p>
            <GlassButton variant="secondary" onClick={() => console.log('Navigate to analytics')}>
              View Reports
            </GlassButton>
          </GlassContainer>
          
          <GlassContainer variant="card" className="text-center p-6">
            <h3 className="text-lg font-semibold text-white mb-2">⚙️ Node Management</h3>
            <p className="text-gray-300 mb-4">Manage distributed testing nodes</p>
            <GlassButton variant="secondary" onClick={() => console.log('Navigate to nodes')}>
              Manage Nodes
            </GlassButton>
          </GlassContainer>
          
          <GlassContainer variant="card" className="text-center p-6">
            <h3 className="text-lg font-semibold text-white mb-2">🔧 Test Scripts</h3>
            <p className="text-gray-300 mb-4">Create and manage test scenarios</p>
            <GlassButton variant="secondary" onClick={() => console.log('Navigate to scripts')}>
              Edit Scripts
            </GlassButton>
          </GlassContainer>
        </div>
      </div>
    </div>
  )
}