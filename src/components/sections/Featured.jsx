import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'
import ImagePlate from '../ui/ImagePlate'

const FEATURES = [
  {
    n: '01',
    cat: 'Audio — Season One',
    title: 'The Podcast',
    body: 'Unscripted conversations with the people shaping culture — recorded long, released whole. No highlight reels.',
    word: 'Podcast',
    tag: 'EP. 001',
    plateTitle: 'OATH 001',
    image: 'https://i.ytimg.com/vi/800C4RpJlK8/maxresdefault.jpg',
    imageFallback: 'https://i.ytimg.com/vi/800C4RpJlK8/hqdefault.jpg',
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
    flip: true,
  },
]

export default function Featured() {
  return (
    <section id="featured" className="section featured">
      <div className="shell">
        <div className="featured__head">
          <Reveal>
            <span className="meta">05 — Featured</span>
          </Reveal>
          <RevealText
            as="h2"
            className="featured__title font-display"
            lines={['Currently in motion.']}
            duration={0.95}
          />
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
