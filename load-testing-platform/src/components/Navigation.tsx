'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import GlassContainer from './ui/GlassContainer'
import GlassButton from './ui/GlassButton'
import { motion } from 'framer-motion'

const navigationItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin', label: 'Admin', icon: '⚙️' },
  { href: '/tests', label: 'Tests', icon: '🚀' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
  { href: '/nodes', label: 'Nodes', icon: '🌐' }
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <GlassContainer
          variant="navigation"
          className="flex items-center justify-between"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-white">LoadTest Pro</span>
          </motion.div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <GlassContainer
                      variant="button"
                      className={`
                        transition-all duration-200 cursor-pointer
                        ${isActive 
                          ? 'bg-blue-500/30 border-blue-400/50 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }
                      `}
                      padding="8px 16px"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </GlassContainer>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* User Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => console.log('View notifications')}
              icon={<span>🔔</span>}
            />
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => console.log('Open user menu')}
              icon={<span>👤</span>}
            >
              Admin
            </GlassButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={() => console.log('Toggle mobile menu')}
              icon={<span>☰</span>}
            />
          </div>
        </GlassContainer>
      </div>
    </div>
  )
}