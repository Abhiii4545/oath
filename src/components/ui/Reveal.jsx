import { motion } from 'framer-motion'

/**
 * Generic on-scroll reveal. Restrained distance (18px default),
 * opacity + translateY, editorial easing. Use for metadata, blocks,
 * list rows — anything that should settle in on entry.
 */
export default function Reveal({
  children,
  as = 'div',
  className = '',
  y = 18,
  delay = 0,
  duration = 0.8,
  amount = 0.4,
  once = true,
  style,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
