import LogoDraw from '../LogoDraw'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

const LINKS = ['Podcasts', 'Clothing', 'Events', 'Projects', 'Contact']

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="shell">
        <div className="footer__top">
          <Reveal className="footer__cta">
            <span className="meta">Say hello</span>
            <MagneticButton href="mailto:hello@oath.studio" variant="fill-blue">
              Enter OATH →
            </MagneticButton>
          </Reveal>
          <Reveal className="footer__links" delay={0.1}>
            {LINKS.map((l) => (
              <a key={l} href="#" className="footer__link" data-cursor="hover">
                {l}
              </a>
            ))}
          </Reveal>
        </div>

        <div className="footer__mark">
          <LogoDraw className="footer__logo" />
        </div>

        <div className="footer__base">
          <span className="meta">© 2026 OATH</span>
          <span className="meta">This is only the beginning</span>
          <span className="meta">Built around ideas</span>
        </div>
      </div>
    </footer>
  )
}
