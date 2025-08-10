'use client'

import React from 'react'
import LiquidGlass from 'liquid-glass-react'
import { motion } from 'framer-motion'

interface GlassContainerProps {
  children: React.ReactNode
  variant?: 'panel' | 'button' | 'card' | 'modal' | 'navigation'
  className?: string
  onClick?: () => void
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  elasticity?: number
  cornerRadius?: number
  padding?: string
  animated?: boolean
  animationDelay?: number
}

const variantConfigs = {
  panel: {
    displacementScale: 64,
    blurAmount: 0.1,
    saturation: 130,
    aberrationIntensity: 2,
    elasticity: 0.35,
    cornerRadius: 20,
    padding: '24px'
  },
  button: {
    displacementScale: 32,
    blurAmount: 0.15,
    saturation: 120,
    aberrationIntensity: 1.5,
    elasticity: 0.4,
    cornerRadius: 100,
    padding: '12px 24px'
  },
  card: {
    displacementScale: 48,
    blurAmount: 0.12,
    saturation: 125,
    aberrationIntensity: 1.8,
    elasticity: 0.3,
    cornerRadius: 16,
    padding: '20px'
  },
  modal: {
    displacementScale: 80,
    blurAmount: 0.08,
    saturation: 140,
    aberrationIntensity: 3,
    elasticity: 0.25,
    cornerRadius: 24,
    padding: '32px'
  },
  navigation: {
    displacementScale: 40,
    blurAmount: 0.2,
    saturation: 115,
    aberrationIntensity: 1,
    elasticity: 0.5,
    cornerRadius: 12,
    padding: '16px'
  }
}

export default function GlassContainer({
  children,
  variant = 'panel',
  className = '',
  onClick,
  displacementScale,
  blurAmount,
  saturation,
  aberrationIntensity,
  elasticity,
  cornerRadius,
  padding,
  animated = true,
  animationDelay = 0,
  ...props
}: GlassContainerProps) {
  const config = variantConfigs[variant]
  
  const glassProps = {
    displacementScale: displacementScale ?? config.displacementScale,
    blurAmount: blurAmount ?? config.blurAmount,
    saturation: saturation ?? config.saturation,
    aberrationIntensity: aberrationIntensity ?? config.aberrationIntensity,
    elasticity: elasticity ?? config.elasticity,
    cornerRadius: cornerRadius ?? config.cornerRadius,
    padding: padding ?? config.padding
  }

  const Component = animated ? motion.div : 'div'
  
  const animationProps = animated ? {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.6, 
      delay: animationDelay,
      ease: [0.4, 0.0, 0.2, 1]
    },
    whileHover: variant === 'button' ? { 
      scale: 1.02,
      transition: { duration: 0.2 }
    } : undefined,
    whileTap: variant === 'button' ? { 
      scale: 0.98,
      transition: { duration: 0.1 }
    } : undefined
  } : {}

  return (
    <Component
      className={`glass-container ${className}`}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      <LiquidGlass {...glassProps}>
        {children}
      </LiquidGlass>
    </Component>
  )
}