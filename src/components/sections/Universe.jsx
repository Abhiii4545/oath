import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import RevealText from '../ui/RevealText'

const ITEMS = [
  { n: '01', title: 'Podcasts', desc: 'Long-form conversation, unscripted.', tag: 'Audio', img: '/thumbs/800C4RpJlK8.jpg' },
  { n: '02', title: 'Clothing', desc: 'Wearable ideas, made in small runs.', tag: 'Supply', img: '/brand/clothing.jpg' },
  { n: '03', title: 'Events', desc: 'Rooms built for people, not feeds.', tag: 'Live', img: '/brand/events.jpg' },
  { n: '04', title: 'Creative', desc: 'Film, print, design, experiments.', tag: 'Studio', img: '/brand/studio.jpg' },
  { n: '05', title: 'Future', desc: 'The parts we haven’t named yet.', tag: 'Open', img: '/brand/abstract.jpg' },
]

export default function Universe() {
  const [active, setActive] = useState(0)

  return (
    <section id="universe" className="section universe">
      <div className="shell">
        <div className="universe__head">
          <Reveal>
            <span className="meta">02 — The Universe</span>
          </Reveal>
          <RevealText
            as="h2"
            className="universe__title font-display"
            lines={['Built around ideas.']}
            duration={0.95}
          />
        </div>

        <div className="universe__body">
          <ul className="universe__list" onMouseLeave={() => setActive(0)}>
            {ITEMS.map((it, i) => (
              <li
                key={it.n}
                className={`u-row ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                data-cursor="view"
                data-cursor-label="OPEN"
              >
                <span className="u-row__n numeral">{it.n}</span>
                <span className="u-row__title font-display">{it.title}</span>
                <span className="u-row__desc">{it.desc}</span>
                <span className="u-row__tag meta">{it.tag}</span>
                <ArrowUpRight className="u-row__arrow" size={22} strokeWidth={1.4} />
              </li>
            ))}
          </ul>

          <div className="universe__preview" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="u-preview"
                initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="u-preview__field" />
                <div className="u-preview__grid" />
                {ITEMS[active].img && (
                  <img
                    className="u-preview__img"
                    src={ITEMS[active].img}
                    alt={ITEMS[active].title}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <div className="u-preview__scan" />
                <span className="u-preview__num numeral">{ITEMS[active].n}</span>
                <span className="u-preview__title font-display">{ITEMS[active].title}</span>
                <span className="u-preview__tag meta">OATH — {ITEMS[active].tag}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
