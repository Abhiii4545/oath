import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const PANELS = [
  { type: 'intro', n: '04', kicker: 'Chapter — Horizontal', key: 'OATH', big: 'One brand. Many rooms.' },
  { n: '01', kicker: 'Audio', key: 'Podcasts', big: 'Voices, unedited.', desc: 'Long-form conversation, released whole.', img: '/thumbs/800C4RpJlK8.jpg', tint: false },
  { n: '02', kicker: 'Supply', key: 'Clothing', big: 'Worn ideas.', desc: 'Garments made as artefacts, in small runs.', img: '/brand/clothing.jpg', tint: true },
  { n: '03', kicker: 'Live', key: 'Events', big: 'In the room.', desc: 'Gatherings built for people, not feeds.', img: '/brand/events.jpg', tint: false },
  { n: '04', kicker: 'People', key: 'Community', big: 'Not an audience.', desc: 'The ones who show up early and stay.', img: '/brand/community.jpg', tint: true },
  { n: '05', kicker: 'Open', key: 'Future', big: 'More coming.', desc: 'The parts we haven’t named yet.', img: '/brand/abstract.jpg', tint: false, last: true },
]

// Scroll length: 100vh pin + ~78vh of travel per extra panel — snappy, no dead scroll.
const SECTION_VH = 100 + (PANELS.length - 1) * 78

export default function HorizontalStory() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  // translateX is a % of the track's OWN width (N*100vw), so travelling
  // (N-1) viewport-widths means moving (N-1)/N of the track = -83.33% for 6.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((PANELS.length - 1) / PANELS.length) * 100}%`],
  )
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="horizon" className="horizon" ref={ref} style={{ height: `${SECTION_VH}vh` }}>
      <div className="horizon__sticky">
        <div className="horizon__head shell">
          <span className="meta">The OATH Chapters</span>
          <div className="horizon__bar">
            <motion.span className="horizon__bar-fill" style={{ width: reduce ? '100%' : progress }} />
          </div>
          <span className="meta horizon__count">
            <span className="accent">06</span> / 06
          </span>
        </div>

        <motion.div
          className="horizon__track"
          style={{ x: reduce ? 0 : x, width: `${PANELS.length * 100}vw` }}
        >
          {PANELS.map((p, i) =>
            p.type === 'intro' ? (
              <article className="panel panel--intro" key={i}>
                <div className="panel__intro-grid shell">
                  <div className="panel__intro">
                    <span className="panel__n numeral">{p.n} — Horizontal</span>
                    <h3 className="panel__key panel__key--intro font-display">{p.key}</h3>
                    <p className="panel__big font-display">{p.big}</p>
                    <span className="panel__hint meta">Keep scrolling — this chapter moves sideways →</span>
                  </div>

                  <div className="panel__visual panel__visual--intro">
                    <div className="panel__plate" />
                    <img
                      className="panel__img"
                      src="/brand/intro.jpg"
                      alt="OATH"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fb) {
                          e.currentTarget.dataset.fb = '1'
                          e.currentTarget.src = '/brand/studio.jpg'
                        } else {
                          e.currentTarget.style.display = 'none'
                        }
                      }}
                    />
                    <div className="panel__scan" />
                    <span className="panel__label meta">OATH / Est. 2026</span>
                  </div>
                </div>
              </article>
            ) : (
              <article className="panel" key={i}>
                <div className="panel__grid shell">
                  <div className="panel__text">
                    <span className="panel__kicker meta">{p.kicker}</span>
                    <h3 className="panel__key font-display">{p.key}</h3>
                    <p className="panel__big font-display">
                      {p.last ? (
                        <>
                          More <span className="accent">coming.</span>
                        </>
                      ) : (
                        p.big
                      )}
                    </p>
                    <p className="panel__desc">{p.desc}</p>
                    <span className="panel__foot meta">
                      OATH — {p.kicker} · Est. 2026
                    </span>
                  </div>

                  <div className="panel__visual">
                    <div className={`panel__plate ${p.tint ? 'panel__plate--tint' : ''}`} />
                    {p.img && (
                      <img
                        className="panel__img"
                        src={p.img}
                        alt={p.key}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    )}
                    <div className="panel__scan" />
                    <span className="panel__idx numeral">{p.n}</span>
                    {!p.img && (
                      <span className="panel__ghost font-display" aria-hidden>
                        {p.key}
                      </span>
                    )}
                    <span className="panel__label meta">{p.key} / OATH</span>
                  </div>
                </div>
              </article>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
