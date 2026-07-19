'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-20 px-4">
        <motion.div variants={item} className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Try Before You Buy
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Virtual AI-powered try-on for beauty and fashion products
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Get Started
            </Link>
            <Link
              href="/products"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-light dark:bg-gray-900">
        <motion.div variants={item} className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💄',
                title: 'Virtual Try-On',
                desc: 'See how products look on you before buying',
              },
              {
                icon: '🤖',
                title: 'AI Recommendations',
                desc: 'Get personalized product suggestions based on your profile',
              },
              {
                icon: '💰',
                title: 'Price Comparison',
                desc: 'Compare prices across all major shopping platforms',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={item}
                className="bg-white dark:bg-dark p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-white">
        <motion.div variants={item} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to revolutionize your shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who are already experiencing the future of shopping
          </p>
          <Link
            href="/auth/signup"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-shadow"
          >
            Start Now - Free
          </Link>
        </motion.div>
      </section>
    </motion.div>
  )
}
