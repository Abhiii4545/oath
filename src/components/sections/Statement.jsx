import RevealText from '../ui/RevealText'
import Reveal from '../ui/Reveal'

export default function Statement() {
  return (
    <section id="statement" className="section statement">
      <div className="shell statement__inner">
        <Reveal className="statement__meta">
          <span className="meta">05 — Statement</span>
        </Reveal>

        <RevealText
          as="h2"
          className="statement__lines font-display"
          lines={[
            <>We don’t know</>,
            <>what OATH</>,
            <>becomes next.</>,
          ]}
          stagger={0.14}
          duration={1.05}
          amount={0.5}
        />

        <RevealText
          as="p"
          className="statement__punch font-display"
          lines={[<span className="accent">That’s the point.</span>]}
          delay={0.35}
          duration={1}
          amount={0.6}
        />
      </div>
    </section>
  )
}
