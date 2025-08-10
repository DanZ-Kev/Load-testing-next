'use client'

import React from 'react'
import GlassContainer from './GlassContainer'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

interface GlassChartProps {
  data: any[]
  type?: 'line' | 'area' | 'bar' | 'pie'
  title?: string
  subtitle?: string
  height?: number
  color?: string
  gradient?: boolean
  animated?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
  xAxisKey?: string
  yAxisKey?: string
  loading?: boolean
}

const GLASS_COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <GlassContainer
        variant="card"
        className="!p-3 border border-white/20"
        padding="12px"
      >
        <p className="text-gray-200 text-sm font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-white text-sm">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </GlassContainer>
    )
  }
  return null
}

export default function GlassChart({
  data,
  type = 'line',
  title,
  subtitle,
  height = 300,
  color = GLASS_COLORS.primary,
  gradient = true,
  animated = true,
  showGrid = true,
  showTooltip = true,
  className = '',
  xAxisKey = 'name',
  yAxisKey = 'value',
  loading = false
}: GlassChartProps) {
  const renderChart = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-gray-400">Loading chart data...</div>
        </div>
      )
    }

    const chartProps = {
      data,
      height,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart {...chartProps}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              )}
              <XAxis 
                dataKey={xAxisKey} 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <defs>
                {gradient && (
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
                  </linearGradient>
                )}
              </defs>
              <Area
                type="monotone"
                dataKey={yAxisKey}
                stroke={color}
                strokeWidth={2}
                fill={gradient ? "url(#colorGradient)" : color}
                fillOpacity={gradient ? 1 : 0.3}
                animationDuration={animated ? 1000 : 0}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...chartProps}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              )}
              <XAxis 
                dataKey={xAxisKey} 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Bar
                dataKey={yAxisKey}
                fill={color}
                fillOpacity={0.7}
                radius={[4, 4, 0, 0]}
                animationDuration={animated ? 1000 : 0}
              />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={color}
                dataKey={yAxisKey}
                animationDuration={animated ? 1000 : 0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(GLASS_COLORS)[index % Object.values(GLASS_COLORS).length]} />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </ResponsiveContainer>
        )

      default: // line
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...chartProps}>
              {showGrid && (
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              )}
              <XAxis 
                dataKey={xAxisKey} 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              <Line
                type="monotone"
                dataKey={yAxisKey}
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#fff' }}
                animationDuration={animated ? 1000 : 0}
              />
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <GlassContainer
      variant="panel"
      className={`w-full ${className}`}
      animated={animated}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="w-full">
        {renderChart()}
      </div>
    </GlassContainer>
  )
}