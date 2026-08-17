import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Very subtle vertical progress line on the right edge.
 * 1px track, electric-blue fill that scales with scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <div className="scroll-rail" aria-hidden>
      <motion.div className="scroll-rail__fill" style={{ scaleY }} />
    </div>
  )
}
