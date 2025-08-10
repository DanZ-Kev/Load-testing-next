'use client'

import React from 'react'
import GlassContainer from './GlassContainer'
import { motion } from 'framer-motion'

interface GlassButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles = {
  primary: 'text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 hover:from-blue-500/30 hover:to-purple-600/30',
  secondary: 'text-gray-200 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-400/30 hover:from-gray-500/30 hover:to-gray-600/30',
  danger: 'text-white bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 hover:from-red-500/30 hover:to-red-600/30',
  success: 'text-white bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 hover:from-green-500/30 hover:to-green-600/30',
  ghost: 'text-gray-300 border border-gray-400/20 hover:bg-white/10'
}

const sizeStyles = {
  sm: 'text-sm font-medium',
  md: 'text-base font-medium',
  lg: 'text-lg font-semibold',
  xl: 'text-xl font-semibold'
}

const sizePadding = {
  sm: '8px 16px',
  md: '12px 24px',
  lg: '16px 32px',
  xl: '20px 40px'
}

export default function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}: GlassButtonProps) {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  return (
    <GlassContainer
      variant="button"
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-all duration-200 ease-in-out
        flex items-center justify-center gap-2
        select-none
        ${className}
      `}
      onClick={handleClick}
      padding={sizePadding[size]}
      {...props}
    >
      <div className="flex items-center gap-2">
        {loading ? (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )
        )}
        
        <span>{children}</span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
    </GlassContainer>
  )
}