import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Editorial "plate". A composed monochrome panel that never reads as
 * empty: a strong field, an oversized outlined ghost word, the OATH
 * chevron watermark, a grid, index + title bar and corner ticks.
 * If `image` is supplied it layers a grayscale photo on top (revealing
 * to colour), and the typographic layer shows through if it fails to
 * load. Revealed via a clip-path wipe with a restrained inner parallax.
 */
export default function ImagePlate({
  index = '01',
  tag = '',
  title = '',
  word = '',
  image = '',
  imageFallback = '',
  tint = false,
  className = '',
  ratio = '4 / 3',
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yRaw = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const y = reduce ? 0 : yRaw

  return (
    <motion.div
      ref={ref}
      className={`plate ${tint ? 'plate--tint' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div className="plate__inner" style={{ y }}>
        <div className="plate__field" />
        <div className="plate__grid" />

        <span className="plate__word font-display" aria-hidden>
          {word}
        </span>

        {/* OATH chevron watermark */}
        <svg className="plate__mono" viewBox="0 0 320 320" aria-hidden fill="none" stroke="currentColor" strokeWidth="14">
          <polyline points="70,150 160,60 250,150" strokeLinejoin="miter" strokeLinecap="square" />
          <polyline points="70,210 160,120 250,210" strokeLinejoin="miter" strokeLinecap="square" />
          <polyline points="70,270 160,180 250,270" strokeLinejoin="miter" strokeLinecap="square" />
        </svg>

        {image && (
          <img
            className="plate__img"
            src={image}
            onError={(e) => {
              if (imageFallback && !e.currentTarget.dataset.fb) {
                e.currentTarget.dataset.fb = '1'
                e.currentTarget.src = imageFallback
              } else {
                e.currentTarget.style.display = 'none'
              }
            }}
            alt={title || word}
            loading="lazy"
          />
        )}
      </motion.div>

      <div className="plate__bar">
        <span className="plate__title meta">{title}</span>
        {tag && <span className="plate__tag meta">{tag}</span>}
      </div>

      <span className="numeral plate__index">{index}</span>
      <div className="plate__corner plate__corner--tl" />
      <div className="plate__corner plate__corner--br" />
    </motion.div>
  )
}
