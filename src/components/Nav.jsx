import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MENU = [
  { id: 'hero', label: 'Index', n: '00' },
  { id: 'manifesto', label: 'Manifesto', n: '01' },
  { id: 'universe', label: 'Universe', n: '02' },
  { id: 'index', label: 'The Index', n: '03' },
  { id: 'horizon', label: 'Chapters', n: '04' },
  { id: 'podcast', label: 'Podcast', n: '05' },
  { id: 'statement', label: 'Statement', n: '06' },
  { id: 'future', label: 'Future', n: '07' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = MENU.map((m) => m.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start()
  }, [open])

  const go = (id) => {
    setOpen(false)
    // wait for overlay to release scroll lock
    setTimeout(() => scrollTo(id), 40)
  }

  const activeLabel = MENU.find((m) => m.id === active)?.label || 'Index'

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner shell">
          <button className="nav__brand font-display" onClick={() => go('hero')} data-cursor="hover">
            OATH
          </button>

          <div className="nav__center meta">
            <span className="nav__dot" />
            <span>{activeLabel}</span>
          </div>

          <button
            className="nav__menu"
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="nav__menu-label meta">{open ? 'Close' : 'Menu'}</span>
            <span className={`nav__burger ${open ? 'is-open' : ''}`}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="overlay"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="overlay__inner shell">
              <div className="overlay__meta meta">
                <span>OATH — Index</span>
                <span>Est. 2026</span>
              </div>
              <ul className="overlay__list">
                {MENU.map((m, i) => (
                  <li key={m.id} className="overlay__item">
                    <span className="line-mask">
                      <motion.button
                        className={`overlay__link font-display ${active === m.id ? 'is-active' : ''}`}
                        onClick={() => go(m.id)}
                        data-cursor="hover"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%' }}
                        transition={{
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.12 + i * 0.05,
                        }}
                      >
                        <span className="numeral overlay__n">{m.n}</span>
                        {m.label}
                      </motion.button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="overlay__foot meta">
                <span>Podcasts · Clothing · Events · More</span>
                <span>This is only the beginning</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
