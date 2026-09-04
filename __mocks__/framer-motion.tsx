import React from 'react'

const motion = new Proxy({} as Record<string, React.FC<Record<string, unknown>>>, {
  get: (_, tag: string) => {
    const Component = ({ children, ...rest }: Record<string, unknown>) => {
      const { initial, animate, exit, transition, variants, whileTap, whileHover, layout, ...props } = rest
      return React.createElement(tag as keyof React.JSX.IntrinsicElements, props as object, children as React.ReactNode)
    }
    Component.displayName = `motion.${tag}`
    return Component
  },
})

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
const useInView = () => true
const useReducedMotion = () => false

export { motion, AnimatePresence, useInView, useReducedMotion }
