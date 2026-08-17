import { motion } from 'framer-motion'

/**
 * Masked line reveal. Each line sits inside an overflow-hidden mask
 * and rises from translateY(105%) -> 0 with a small per-line stagger.
 * Pass `lines` as an array of strings (or nodes).
 */
export default function RevealText({
  lines,
  as: Tag = 'div',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  duration = 0.9,
  amount = 0.6,
  once = true,
}) {
  const MotionTag = motion(Tag)
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <motion.span
            style={{ display: 'block', willChange: 'transform' }}
            className={lineClassName}
            variants={{
              hidden: { y: '108%' },
              show: {
                y: '0%',
                transition: {
                  duration,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
