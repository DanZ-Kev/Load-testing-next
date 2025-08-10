'use client'

import React, { useState } from 'react'
import GlassContainer from '@/components/ui/GlassContainer'
import GlassButton from '@/components/ui/GlassButton'
import GlassChart from '@/components/ui/GlassChart'
import { motion } from 'framer-motion'

interface AdminTab {
  id: string
  label: string
  icon: string
  count?: number
}

const adminTabs: AdminTab[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'subscriptions', label: 'Subscription Packages', icon: '💎', count: 12 },
  { id: 'nodes', label: 'Node Management', icon: '🌐', count: 47 },
  { id: 'users', label: 'User Management', icon: '👥', count: 2847 },
  { id: 'tests', label: 'Test Configuration', icon: '⚙️' },
  { id: 'billing', label: 'Billing & Resources', icon: '💰' },
  { id: 'security', label: 'Security & Compliance', icon: '🛡️' },
  { id: 'analytics', label: 'Analytics Engine', icon: '📈' },
  { id: 'branding', label: 'White-Label & Branding', icon: '🎨' },
  { id: 'integrations', label: 'Integration Hub', icon: '🔌' }
]

// Mock data
const subscriptionPackages = [
  { id: 1, name: 'Starter', users: 156, maxTests: 10, revenue: '$2,340', growth: '+12%' },
  { id: 2, name: 'Professional', users: 89, maxTests: 100, revenue: '$8,900', growth: '+34%' },
  { id: 3, name: 'Enterprise', users: 23, maxTests: 1000, revenue: '$46,000', growth: '+67%' }
]

const nodeMetrics = [
  { region: 'US-East', nodes: 12, load: 67, latency: 23, status: 'healthy' },
  { region: 'US-West', nodes: 8, load: 45, latency: 31, status: 'healthy' },
  { region: 'EU-Central', nodes: 15, load: 78, latency: 45, status: 'warning' },
  { region: 'Asia-Pacific', nodes: 12, load: 34, latency: 89, status: 'healthy' }
]

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const TabButton = ({ tab, isActive, onClick }: { tab: AdminTab, isActive: boolean, onClick: () => void }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassContainer
        variant={isActive ? 'button' : 'card'}
        className={`cursor-pointer transition-all duration-200 ${
          isActive 
            ? 'border-blue-400/50 bg-blue-500/20' 
            : 'border-gray-400/20 hover:border-gray-300/30'
        }`}
        onClick={onClick}
        padding="12px 16px"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">{tab.icon}</span>
            <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
              {tab.label}
            </span>
          </div>
          {tab.count && (
            <span className="bg-blue-500/30 text-blue-300 text-xs px-2 py-1 rounded-full">
              {tab.count}
            </span>
          )}
        </div>
      </GlassContainer>
    </motion.div>
  )

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassContainer variant="card" className="text-center">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Total Revenue</h3>
          <div className="text-2xl font-bold text-green-400 mb-1">$127,430</div>
          <p className="text-xs text-gray-500">+23% this month</p>
        </GlassContainer>
        
        <GlassContainer variant="card" className="text-center">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Active Subscriptions</h3>
          <div className="text-2xl font-bold text-blue-400 mb-1">2,847</div>
          <p className="text-xs text-gray-500">+156 this week</p>
        </GlassContainer>
        
        <GlassContainer variant="card" className="text-center">
          <h3 className="text-sm font-medium text-gray-300 mb-2">System Load</h3>
          <div className="text-2xl font-bold text-purple-400 mb-1">67%</div>
          <p className="text-xs text-gray-500">Optimal range</p>
        </GlassContainer>
        
        <GlassContainer variant="card" className="text-center">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Global Nodes</h3>
          <div className="text-2xl font-bold text-cyan-400 mb-1">47</div>
          <p className="text-xs text-gray-500">Across 4 regions</p>
        </GlassContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassChart
          data={[
            { name: 'Jan', revenue: 45000, users: 1200 },
            { name: 'Feb', revenue: 52000, users: 1450 },
            { name: 'Mar', revenue: 61000, users: 1780 },
            { name: 'Apr', revenue: 58000, users: 1650 },
            { name: 'May', revenue: 67000, users: 2100 },
            { name: 'Jun', revenue: 74000, users: 2400 }
          ]}
          type="area"
          title="Revenue Growth"
          subtitle="Monthly revenue and user acquisition"
          height={300}
          color="#10B981"
          xAxisKey="name"
          yAxisKey="revenue"
        />
        
        <GlassChart
          data={nodeMetrics.map(node => ({ name: node.region, value: node.load }))}
          type="bar"
          title="Node Load Distribution"
          subtitle="Current load across regions"
          height={300}
          color="#8B5CF6"
          xAxisKey="name"
          yAxisKey="value"
        />
      </div>
    </div>
  )

  const renderSubscriptions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Subscription Package Management</h2>
        <GlassButton variant="primary" onClick={() => console.log('Create new package')}>
          Create New Package
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionPackages.map((pkg, index) => (
          <GlassContainer
            key={pkg.id}
            variant="card"
            className="p-6"
            animationDelay={index * 0.1}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{pkg.name}</h3>
              <span className={`text-sm px-2 py-1 rounded-full ${
                pkg.growth.startsWith('+') 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {pkg.growth}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Users:</span>
                <span className="text-white font-medium">{pkg.users}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Max Tests:</span>
                <span className="text-white font-medium">{pkg.maxTests}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Revenue:</span>
                <span className="text-green-400 font-medium">{pkg.revenue}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <GlassButton 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => console.log(`Edit ${pkg.name}`)}
              >
                Edit Package
              </GlassButton>
              <GlassButton 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => console.log(`View analytics for ${pkg.name}`)}
              >
                View Analytics
              </GlassButton>
            </div>
          </GlassContainer>
        ))}
      </div>

      <GlassContainer variant="panel">
        <h3 className="text-lg font-semibold text-white mb-4">Package Configuration Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Max Concurrent Users (1-100,000)',
            'Test Duration Limits (1min-24hrs)',
            'Node Allocation per Tier',
            'Geographic Restrictions',
            'API Call Limits',
            'Storage Quotas (1GB-10TB)',
            'Bandwidth Allocation',
            'Test Frequency Caps',
            'Feature Access Matrix',
            'Custom Pricing Models',
            'Resource-based Billing',
            'Promotional Codes'
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30"
            >
              <span className="text-sm text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </GlassContainer>
    </div>
  )

  const renderNodes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Node & Infrastructure Management</h2>
        <div className="flex gap-3">
          <GlassButton variant="secondary" onClick={() => console.log('Auto-scale nodes')}>
            Auto-Scale
          </GlassButton>
          <GlassButton variant="primary" onClick={() => console.log('Add new node')}>
            Add Node
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {nodeMetrics.map((region, index) => (
          <GlassContainer
            key={region.region}
            variant="card"
            animationDelay={index * 0.1}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white">{region.region}</h3>
              <span className={`w-3 h-3 rounded-full ${
                region.status === 'healthy' ? 'bg-green-400' :
                region.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Nodes:</span>
                <span className="text-white">{region.nodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Load:</span>
                <span className="text-white">{region.load}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Latency:</span>
                <span className="text-white">{region.latency}ms</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    region.load < 60 ? 'bg-green-500' :
                    region.load < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${region.load}%` }}
                />
              </div>
            </div>
          </GlassContainer>
        ))}
      </div>

      <GlassContainer variant="panel">
        <h3 className="text-lg font-semibold text-white mb-4">Advanced Node Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Dynamic Provisioning',
            'Geographic Distribution',
            'Load Balancing Algorithms',
            'Auto-failover Configuration',
            'Performance Benchmarking',
            'Maintenance Scheduling',
            'Usage Analytics',
            'Multi-cloud Deployment',
            'Custom Node Pools',
            'Resource Optimization',
            'Health Monitoring',
            'Cost Management'
          ].map((feature, index) => (
            <GlassButton
              key={index}
              variant="ghost"
              size="sm"
              className="justify-start"
              onClick={() => console.log(`Configure ${feature}`)}
            >
              {feature}
            </GlassButton>
          ))}
        </div>
      </GlassContainer>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'subscriptions':
        return renderSubscriptions()
      case 'nodes':
        return renderNodes()
      case 'users':
        return (
          <div className="text-center py-12">
            <h2 className="text-xl text-white mb-4">User Management System</h2>
            <p className="text-gray-300 mb-6">Advanced user controls with 50+ granular permissions</p>
            <GlassButton variant="primary" onClick={() => console.log('Coming soon')}>
              Coming Soon
            </GlassButton>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl text-white mb-4">{adminTabs.find(t => t.id === activeTab)?.label}</h2>
            <p className="text-gray-300 mb-6">Advanced configuration panel with 200+ customization options</p>
            <GlassButton variant="primary" onClick={() => console.log('Feature in development')}>
              Feature in Development
            </GlassButton>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <GlassContainer variant="navigation" className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Ultimate Admin Control Center
            </h1>
            <p className="text-gray-300">
              200+ customization options for enterprise-grade management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search configurations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50"
            />
            <GlassButton variant="secondary" onClick={() => console.log('Export settings')}>
              Export Settings
            </GlassButton>
          </div>
        </GlassContainer>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {adminTabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}