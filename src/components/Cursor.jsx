import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Desktop-only custom cursor. A small dot that expands over
 * interactive elements. When hovering a [data-cursor="view"] target
 * it becomes a labelled disc ("VIEW" / "OPEN" / custom).
 * Disabled entirely on touch / coarse pointers.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const raf = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-none')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest('[data-cursor]')
      if (!t) {
        setVariant('default')
        setLabel('')
        return
      }
      const kind = t.getAttribute('data-cursor')
      if (kind === 'view') {
        setVariant('view')
        setLabel(t.getAttribute('data-cursor-label') || 'VIEW')
      } else if (kind === 'button') {
        setVariant('button')
        setLabel('')
      } else {
        setVariant('hover')
        setLabel('')
      }
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('cursor-none')
      cancelAnimationFrame(raf.current)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden>
      <motion.div
        className={`cursor__dot cursor__dot--${variant}`}
        animate={{
          scale: variant === 'view' ? 1 : variant === 'button' ? 2.4 : variant === 'hover' ? 1.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {variant === 'view' && <span className="cursor__label">{label}</span>}
      </motion.div>
    </motion.div>
  )
}
