import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

const LINES = ['New projects.', 'New people.', 'New places.', 'New ideas.']

export default function Future() {
  return (
    <section id="future" className="section future">
      <div className="shell">
        <Reveal className="future__meta">
          <span className="meta">06 — Future</span>
          <span className="meta">More coming</span>
        </Reveal>

        <RevealText
          as="h2"
          className="future__title font-display"
          lines={[<>This is only</>, <>the beginning.</>]}
          stagger={0.12}
          duration={1.05}
        />

        <div className="future__copy">
          {LINES.map((l, i) => (
            <Reveal key={l} className="future__copy-line" delay={i * 0.08}>
              <span className="numeral future__copy-n">0{i + 1}</span>
              <span>{l}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
