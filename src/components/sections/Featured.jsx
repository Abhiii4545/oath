import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'
import ImagePlate from '../ui/ImagePlate'

const STATS = [
  { n: '02', label: 'In production' },
  { n: '05', label: 'In development' },
  { n: 'S1', label: 'Season one, 2026' },
  { n: '∞', label: 'Ideas queued' },
]

const FEATURES = [
  {
    n: '01',
    cat: 'Audio — Season One',
    title: 'The Podcast',
    body: 'Unscripted conversations with the people shaping culture — recorded long, released whole. No highlight reels.',
    word: 'Podcast',
    tag: 'EP. 001',
    plateTitle: 'OATH 001',
    image: '/brand/studio.jpg',
    imageFallback: '/thumbs/800C4RpJlK8.jpg',
    specs: ['Long-form', 'Ft. Sai Kiran', 'Out now'],
    flip: false,
  },
  {
    n: '02',
    cat: 'Supply — Drop 001',
    title: 'OATH Supply',
    body: 'A first run of garments built as artefacts, not merch. Considered materials, small numbers, quiet confidence.',
    word: 'Supply',
    tag: 'Drop 001',
    plateTitle: 'Coming 2026',
    image: '/brand/clothing.jpg',
    specs: ['Small batch', 'Considered', 'OATH marked'],
    flip: true,
  },
]

export default function Featured() {
  return (
    <section id="featured" className="section featured">
      <div className="shell">
        <div className="featured__head">
          <div className="featured__head-top">
            <Reveal>
              <span className="meta">05 — Featured</span>
            </Reveal>
            <Reveal delay={0.05}>
              <span className="meta">Active now / 2026</span>
            </Reveal>
          </div>

          <RevealText
            as="h2"
            className="featured__title font-display"
            lines={['Currently', 'in motion.']}
            stagger={0.1}
            duration={0.95}
          />

          <div className="featured__lede">
            <Reveal delay={0.1}>
              <p>
                Not concepts — things already being made. This is what OATH is
                building right now, across sound, cloth and the spaces in
                between.
              </p>
            </Reveal>
          </div>

          <div className="featured__stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} className="featured__stat" delay={0.08 * i}>
                <span className="featured__stat-n numeral">{s.n}</span>
                <span className="featured__stat-label meta">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="featured__list">
          {FEATURES.map((f) => (
            <article key={f.n} className={`feature ${f.flip ? 'feature--flip' : ''}`}>
              <div className="feature__media">
                <ImagePlate
                  index={f.n}
                  word={f.word}
                  title={f.plateTitle}
                  tag={f.tag}
                  image={f.image}
                  imageFallback={f.imageFallback}
                  brand={f.brand}
                  ratio="5 / 6"
                  tint={f.flip}
                />
              </div>
              <div className="feature__text">
                <span className="meta feature__cat">{f.cat}</span>
                <RevealText
                  as="h3"
                  className="feature__name font-display"
                  lines={[f.title]}
                  duration={0.9}
                />
                <Reveal className="feature__body" delay={0.1}>
                  <p>{f.body}</p>
                </Reveal>

                <Reveal className="feature__specs" delay={0.15}>
                  {f.specs.map((s) => (
                    <span key={s} className="feature__spec meta">
                      {s}
                    </span>
                  ))}
                </Reveal>

                <Reveal delay={0.2}>
                  <span
                    className="feature__link"
                    data-cursor="view"
                    data-cursor-label="OPEN"
                  >
                    View project <span className="feature__arrow">→</span>
                  </span>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
