import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const LETTERS = ['O', 'A', 'T', 'H']
const META = ['Podcasts', 'Clothing', 'Events', 'More']

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // wordmark grows and lifts out of frame as you leave the hero
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.85])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-42%'])
  const markOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0])
  const supportOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const supportY = useTransform(scrollYProgress, [0, 0.4], [0, -40])
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.55])

  const s = (v) => (reduce ? undefined : v)

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero__sticky">
        {/* top metadata */}
        <motion.div
          className="hero__top shell"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <span className="meta">An Evolving Culture Platform</span>
          <span className="meta hero__coord">
            36.7°N / 3.0°E — <span className="accent">EST. 2026</span>
          </span>
        </motion.div>

        {/* wordmark */}
        <motion.div className="hero__mark-wrap" style={{ opacity: s(markOpacity) }}>
          <motion.h1
            className="hero__mark display-xl"
            style={{ scale: s(scale), y: s(y) }}
            aria-label="OATH"
          >
            {LETTERS.map((l, i) => (
              <span key={i} className="line-mask hero__letter">
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{
                    duration: 1.15,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.45 + i * 0.09,
                  }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </motion.div>

        {/* supporting line + metadata strip */}
        <motion.div
          className="hero__bottom shell"
          style={{ opacity: s(supportOpacity), y: s(supportY) }}
        >
          <div className="line-mask">
            <motion.p
              className="hero__lead"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              An evolving culture platform.
            </motion.p>
          </div>

          <motion.ul
            className="hero__tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.25 }}
          >
            {META.map((m, i) => (
              <li key={m} className="meta">
                {m}
                {i < META.length - 1 && <span className="hero__slash">/</span>}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* scroll invite */}
        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="meta">Scroll</span>
          <span className="hero__scroll-line" />
        </motion.div>

        {/* veil that darkens the hero as the next chapter arrives */}
        <motion.div className="hero__veil" style={{ opacity: s(veil) }} aria-hidden />
      </div>
    </section>
  )
}
