import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/**
 * Brand reveal. Black screen -> the OATH mark draws on (the ring, the
 * three ascending chevrons, T, H, dot), settles, then the whole panel
 * wipes upward to hand off to the hero. Scroll is locked while it runs.
 */
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.35 + i * 0.28 },
      opacity: { duration: 0.4, delay: 0.35 + i * 0.28 },
    },
  }),
}

export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
    const t = setTimeout(() => setShow(false), reduce ? 400 : 4300)
    return () => clearTimeout(t)
  }, [reduce])

  const release = () => {
    document.documentElement.style.overflow = ''
    if (window.__lenis) window.__lenis.start()
    onDone?.()
  }

  return (
    <AnimatePresence onExitComplete={release}>
      {show && (
        <motion.div
          className="preloader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="preloader__center"
            initial={{ scale: 0.9, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg
              className="preloader__mark"
              viewBox="0 0 2338 824"
              fill="none"
              stroke="#F5F5F5"
              strokeWidth="36"
              initial="hidden"
              animate="show"
              aria-label="OATH"
            >
              <motion.ellipse cx="247" cy="453" rx="203" ry="200" variants={draw} custom={0} />
              <motion.polyline points="697,270 837,8 978,270" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={1} />
              <motion.polyline points="697,537 837,275 978,537" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={2} />
              <motion.polyline points="697,805 837,543 978,805" strokeLinejoin="miter" strokeLinecap="square" variants={draw} custom={3} />
              <motion.path d="M1192 259 H1562 M1377 259 V665" strokeLinecap="square" variants={draw} custom={4} />
              <motion.path d="M1753 242 V665 M2087 242 V665 M1753 453 H2087" strokeLinecap="square" variants={draw} custom={5} />
              <motion.circle
                cx="2273" cy="633" r="37" fill="#F5F5F5" stroke="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 3.05 }}
                style={{ transformOrigin: '2273px 633px' }}
              />
            </motion.svg>

            <motion.span
              className="preloader__tag meta"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 3.3 }}
            >
              An Evolving Culture Platform
            </motion.span>

            <div className="preloader__progress" aria-hidden>
              <motion.span
                className="preloader__progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.9, ease: [0.45, 0, 0.15, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
