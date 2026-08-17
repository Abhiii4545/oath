import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import RevealText from '../ui/RevealText'

const PROJECTS = [
  { n: '01', cat: 'Audio', title: 'The Podcast', year: '2026', desc: 'Conversations with the people building culture in real time.', img: '/thumbs/800C4RpJlK8.jpg' },
  { n: '02', cat: 'Supply', title: 'OATH Supply', year: '2026', desc: 'Garments as artefacts — limited, considered, unbranded loud.', img: '/brand/idx-supply.jpg', fb: '/brand/clothing.jpg' },
  { n: '03', cat: 'Live', title: 'Live Sessions', year: '2026', desc: 'Intimate rooms, recorded once, never repeated.', img: '/brand/idx-live.jpg', fb: '/brand/studio.jpg' },
  { n: '04', cat: 'Events', title: 'OATH Events', year: '—', desc: 'Gatherings that turn an audience into a community.', img: '/brand/idx-events.jpg', fb: '/brand/events.jpg' },
  { n: '05', cat: 'Studio', title: 'Project X', year: 'Soon', desc: 'Currently unnamed. Currently unannounced. Currently ours.', img: '/brand/idx-projectx.jpg', fb: '/brand/abstract.jpg' },
  { n: '06', cat: 'Open', title: 'More Soon', year: '∞', desc: 'The index is deliberately unfinished. So is OATH.', img: '/brand/idx-more.jpg', fb: '/brand/community.jpg' },
]

const ease = [0.16, 1, 0.3, 1]

// staggered, scroll-driven reveal — each row uncovers its parts as it
// scrolls into view (rule wipes across, number/title/meta rise from a mask)
const rowV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const rise = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.95, ease } },
}
const fade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function Row({ p }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.article
      className={`p-row ${hover ? 'is-hover' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="view"
      data-cursor-label="VIEW"
      variants={rowV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.55 }}
    >
      <motion.span
        className="p-row__rule"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.9, ease } },
        }}
      />

      <span className="line-mask p-row__n-mask">
        <motion.span className="p-row__n numeral" variants={rise}>
          {p.n}
        </motion.span>
      </span>

      <div className="p-row__main">
        <div className="p-row__titleline">
          <span className="line-mask">
            <motion.h3 className="p-row__title font-display" variants={rise}>
              {p.title}
            </motion.h3>
          </span>
          <motion.span className="p-row__cat meta" variants={fade}>
            {p.cat}
          </motion.span>
        </div>
        <p className="p-row__desc">{p.desc}</p>
      </div>

      <span className="line-mask p-row__year-mask">
        <motion.span className="p-row__year numeral" variants={rise}>
          {p.year}
        </motion.span>
      </span>

      <div className="p-row__preview" aria-hidden>
        <div className="p-row__plate">
          <div className="p-row__field" />
          {p.img && (
            <img
              className="p-row__img"
              src={p.img}
              alt={p.title}
              loading="lazy"
              onError={(e) => {
                if (p.fb && !e.currentTarget.dataset.fb) {
                  e.currentTarget.dataset.fb = '1'
                  e.currentTarget.src = p.fb
                } else {
                  e.currentTarget.style.display = 'none'
                }
              }}
            />
          )}
          <span className="p-row__plate-label meta">{p.title}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectIndex() {
  return (
    <section id="index" className="section p-index">
      <div className="shell">
        <div className="p-index__head">
          <Reveal>
            <span className="meta">03 — The Index</span>
          </Reveal>
          <RevealText
            as="h2"
            className="p-index__title font-display"
            lines={['The OATH Index']}
            duration={0.95}
          />
          <Reveal delay={0.1}>
            <p className="p-index__sub">Six entries. One unfinished archive.</p>
          </Reveal>
        </div>

        <div className="p-index__list">
          {PROJECTS.map((p) => (
            <Row key={p.n} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
