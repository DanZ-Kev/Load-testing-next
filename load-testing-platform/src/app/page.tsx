'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import GlassContainer from '@/components/ui/GlassContainer'
import GlassButton from '@/components/ui/GlassButton'
import GlassChart from '@/components/ui/GlassChart'

const features = [
  {
    icon: '🌊',
    title: 'Apple Liquid Glass UI',
    description: 'Stunning visual effects with interactive displacement and elastic animations that respond to your touch.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '⚡',
    title: 'Real-time Monitoring',
    description: 'Live dashboard with WebSocket-powered updates showing active tests, system metrics, and performance data.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '🎛️',
    title: '200+ Admin Controls',
    description: 'Ultimate admin center with subscription management, node control, user management, and enterprise features.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '🌐',
    title: 'Global Node Network',
    description: 'Distributed testing nodes across multiple regions with intelligent load balancing and auto-scaling.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'Advanced security with JWT, MFA, Row Level Security, audit logging, and compliance features.',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Comprehensive reporting engine with custom dashboards, forecasting, and performance insights.',
    color: 'from-teal-500 to-blue-500'
  }
]

const subscriptionTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      '10 tests per month',
      'Basic glass UI',
      'Standard support',
      '1 concurrent test',
      'Community access'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'For growing teams',
    features: [
      '1,000 tests per month',
      'Advanced glass effects',
      'Priority support',
      '10 concurrent tests',
      'Advanced analytics',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$499',
    period: '/month',
    description: 'Unlimited scale & customization',
    features: [
      'Unlimited tests',
      'Full glass customization',
      '24/7 dedicated support',
      'Unlimited concurrent tests',
      'White-label options',
      'Advanced security',
      'Custom integrations'
    ],
    popular: false
  }
]

const mockPerformanceData = [
  { name: 'Jan', tests: 1200, users: 850 },
  { name: 'Feb', tests: 1900, users: 1300 },
  { name: 'Mar', tests: 2800, users: 2100 },
  { name: 'Apr', tests: 3900, users: 2800 },
  { name: 'May', tests: 4800, users: 3500 },
  { name: 'Jun', tests: 5900, users: 4200 }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Load Testing
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of performance testing with our stunning Apple Liquid Glass UI, 
              real-time monitoring, and enterprise-grade controls that scale to millions of users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/dashboard">
              <GlassButton
                variant="primary"
                size="xl"
                icon={<span>🚀</span>}
                className="min-w-[200px]"
              >
                Start Testing Now
              </GlassButton>
            </Link>
            
            <Link href="/admin">
              <GlassButton
                variant="secondary"
                size="xl"
                icon={<span>⚙️</span>}
                className="min-w-[200px]"
              >
                Admin Demo
              </GlassButton>
            </Link>
          </motion.div>

          {/* Performance Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <GlassChart
              data={mockPerformanceData}
              type="area"
              title="Platform Growth & Performance"
              subtitle="Monthly test execution and user growth metrics"
              height={400}
              color="#3B82F6"
              xAxisKey="name"
              yAxisKey="tests"
              gradient={true}
              animated={true}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Features That Make You Say{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                "WOW!"
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every detail crafted for the ultimate load testing experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassContainer
                  variant="card"
                  className="h-full p-8 text-center hover:scale-105 transition-transform duration-300"
                  animationDelay={index * 0.1}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Power Level
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From starter to enterprise, we have the perfect plan for your testing needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassContainer
                  variant="card"
                  className={`h-full p-8 text-center relative ${
                    tier.popular ? 'ring-2 ring-blue-400/50 scale-105' : ''
                  }`}
                  animationDelay={index * 0.1}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-300 mb-6">{tier.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <span className="text-green-400 mr-3">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <GlassButton
                    variant={tier.popular ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                    onClick={() => console.log(`Subscribe to ${tier.name}`)}
                  >
                    Get Started
                  </GlassButton>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassContainer
              variant="modal"
              className="p-12 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Testing Experience?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of developers and enterprises who trust our platform 
                for mission-critical performance testing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <GlassButton
                    variant="primary"
                    size="xl"
                    icon={<span>🚀</span>}
                  >
                    Start Free Trial
                  </GlassButton>
                </Link>
                
                <GlassButton
                  variant="ghost"
                  size="xl"
                  icon={<span>📞</span>}
                  onClick={() => console.log('Schedule demo')}
                >
                  Schedule Demo
                </GlassButton>
              </div>
            </GlassContainer>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 LoadTest Pro. Built with Apple Liquid Glass UI for the ultimate experience.
          </p>
        </div>
      </footer>
    </div>
  )
}
