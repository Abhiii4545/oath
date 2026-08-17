import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

export default function Manifesto() {
  return (
    <section id="manifesto" className="section manifesto">
      <div className="shell">
        <Reveal className="manifesto__head" as="div">
          <span className="meta">01 — Manifesto</span>
          <span className="meta">A place for ideas</span>
        </Reveal>

        <hr className="hairline manifesto__rule" />

        <RevealText
          as="h2"
          className="manifesto__statement font-display"
          lines={[
            <>OATH is a place</>,
            <>for ideas that refuse</>,
            <>
              to stay in <span className="accent">one category.</span>
            </>,
          ]}
          stagger={0.12}
          duration={1}
        />

        <div className="manifesto__grid">
          <Reveal className="manifesto__note" delay={0.1}>
            <p>
              Not a single product. Not a single lane. OATH is an umbrella for
              the things we make and the things we haven't made yet — held
              together by a point of view rather than a category.
            </p>
          </Reveal>
          <Reveal className="manifesto__note manifesto__note--meta" delay={0.2}>
            <p className="meta">Podcasts / Clothing / Events</p>
            <p className="meta">Creative / Community / Future</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
