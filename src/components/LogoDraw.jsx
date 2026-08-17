import { motion, useReducedMotion } from 'framer-motion'

/**
 * Self-drawing OATH wordmark. Same geometry as the preloader mark, but
 * triggered on scroll (whileInView): the ring, the three ascending
 * chevrons, T, H and the dot draw on in sequence. Reduced-motion users
 * get the finished mark with no animation.
 */
export default function LogoDraw({ className = '', title = 'OATH' }) {
  const reduce = useReducedMotion()

  const draw = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
        opacity: { duration: 0.25, delay: i * 0.12 },
      },
    }),
  }

  return (
    <motion.svg
      className={className}
      viewBox="0 0 2338 824"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="36"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.ellipse cx="247" cy="453" rx="203" ry="200" variants={draw} custom={0} />
      <motion.polyline points="697,270 837,8 978,270" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={1} />
      <motion.polyline points="697,537 837,275 978,537" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={2} />
      <motion.polyline points="697,805 837,543 978,805" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={3} />
      <motion.path d="M1192 259 H1562 M1377 259 V665" strokeLinecap="square" variants={draw} custom={4} />
      <motion.path d="M1753 242 V665 M2087 242 V665 M1753 453 H2087" strokeLinecap="square" variants={draw} custom={5} />
      <motion.circle
        cx="2273" cy="633" r="37" fill="currentColor" stroke="none"
        initial={{ scale: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.9 }}
        style={{ transformOrigin: '2273px 633px' }}
      />
    </motion.svg>
  )
}
