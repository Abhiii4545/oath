import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Editorial button with a subtle magnetic pull on desktop hover.
 * Sharp corners, black -> blue (or black -> white) on hover.
 * Variants: 'fill-blue' (default), 'fill-white', 'ghost'.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'fill-blue',
  className = '',
  strength = 0.35,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 })

  const handleMove = (e) => {
    if (reduce) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button
  const extra = href ? { href } : { onClick, type: 'button' }

  return (
    <Tag
      ref={ref}
      data-cursor="button"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...extra}
      style={{ x: sx, y: sy }}
      className={`oath-btn oath-btn--${variant} ${className}`}
    >
      <span className="oath-btn__label">{children}</span>
    </Tag>
  )
}
