import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Volume2, X } from 'lucide-react'
import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

const CHANNEL = 'https://www.youtube.com/@OathFitnessCulture'

const FEATURE = {
  id: '800C4RpJlK8',
  title: 'OATH 001 — Ft. Sai Kiran',
  sub: 'From self-made dumbbells to a professional athlete.',
  meta: 'Full Episode · 3.2K views · Aug 2026',
}

const MORE = [
  { id: 'aS95KGjFp7g', title: '#OATH001 — Glimpse', meta: 'Teaser · 872 views' },
  { id: 'wjdRm4cVE3w', title: 'Full Podcast — Out Now', meta: 'Promo · 2.4K views' },
  { id: 'vWIQrx6tG24', title: 'OATH 001 — Out Now', meta: 'Promo · 1.1K views' },
  { id: 'R2zbcFCa_mk', title: '#OATH002 — Coming Soon', meta: 'Teaser · New' },
]

// self-hosted frames captured from each episode (public/thumbs/<id>.jpg),
// with the YouTube CDN as a fallback if a local file is ever missing
const thumb = (id) => `/thumbs/${id}.jpg`
const thumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
const embed = (id, { mute }) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${mute ? 1 : 0}` +
  `&controls=${mute ? 0 : 1}&loop=${mute ? 1 : 0}&playlist=${id}` +
  `&modestbranding=1&rel=0&playsinline=1`

/**
 * Only one card ever mounts an <iframe> (tracked by `active` in the
 * parent), so the section never juggles five players — that was the lag.
 * Hover starts a muted preview after a short delay (so quick passes cost
 * nothing); the sound button and the tile itself promote it to full,
 * unmuted playback with controls.
 */
function VideoCard({ id, title, meta, large = false, active, setActive }) {
  const timer = useRef(null)
  const fine = useRef(false)
  useEffect(() => {
    fine.current = window.matchMedia('(pointer: fine)').matches
    return () => clearTimeout(timer.current)
  }, [])

  const isActive = active?.id === id
  const mode = isActive ? active.mode : null // 'preview' | 'full'

  const enter = () => {
    if (!fine.current) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setActive((a) => (a?.mode === 'full' ? a : { id, mode: 'preview' }))
    }, 420)
  }
  const leave = () => {
    clearTimeout(timer.current)
    setActive((a) => (a?.id === id && a.mode === 'preview' ? null : a))
  }
  const playFull = (e) => {
    e?.stopPropagation()
    clearTimeout(timer.current)
    setActive({ id, mode: 'full' })
  }
  const close = (e) => {
    e.stopPropagation()
    setActive(null)
  }

  return (
    <motion.article
      className={`vcard ${large ? 'vcard--lg' : ''} ${mode ? 'is-live' : ''}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={playFull}
      data-cursor={mode === 'full' ? undefined : 'view'}
      data-cursor-label="PLAY"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="vcard__frame">
        <img
          className="vcard__thumb"
          src={thumb(id)}
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1'
              e.currentTarget.src = thumbFallback(id)
            }
          }}
          alt={title}
          loading="lazy"
        />

        {mode && (
          <iframe
            className="vcard__player"
            src={embed(id, { mute: mode === 'preview' })}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            frameBorder="0"
          />
        )}

        {mode !== 'full' && (
          <>
            <span className="vcard__scan" />
            <button className="vcard__play" aria-label={`Play ${title}`} onClick={playFull}>
              <Play size={large ? 22 : 16} strokeWidth={1.6} fill="currentColor" />
            </button>
            {mode === 'preview' ? (
              <button className="vcard__sound" onClick={playFull} aria-label="Play with sound">
                <Volume2 size={15} strokeWidth={1.6} />
                <span className="meta">Sound</span>
              </button>
            ) : (
              <span className="vcard__badge meta">Watch</span>
            )}
          </>
        )}

        {mode === 'full' && (
          <button className="vcard__close" onClick={close} aria-label="Close video">
            <X size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>

      <div className="vcard__info">
        <h4 className="vcard__title font-display">{title}</h4>
        <span className="vcard__meta meta">{meta}</span>
      </div>
    </motion.article>
  )
}

export default function Podcast() {
  const [active, setActive] = useState(null)

  return (
    <section id="podcast" className="section podcast">
      <div className="shell">
        <Reveal className="podcast__head">
          <span className="meta">04 — Now Streaming</span>
          <span className="meta podcast__live">
            <span className="podcast__dot" /> On air
          </span>
        </Reveal>

        <RevealText
          as="h2"
          className="podcast__title font-display"
          lines={[<>The OATH</>, <>Podcast.</>]}
          stagger={0.1}
          duration={1}
        />

        <div className="podcast__feature">
          <VideoCard {...FEATURE} large active={active} setActive={setActive} />
          <Reveal className="podcast__aside" delay={0.1}>
            <p className="podcast__sub">{FEATURE.sub}</p>
            <p className="podcast__desc">
              The first full episode — a long-form conversation on discipline,
              self-made beginnings and the culture forming around OATH. Hover to
              preview, click for full sound.
            </p>
            <MagneticButton href={CHANNEL} variant="fill-blue">
              Subscribe on YouTube →
            </MagneticButton>
          </Reveal>
        </div>

        <div className="podcast__grid">
          {MORE.map((v) => (
            <VideoCard key={v.id} {...v} active={active} setActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
