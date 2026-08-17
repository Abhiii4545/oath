import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Smooth-scroll driver. Respects prefers-reduced-motion by
 * bailing out entirely (native scroll stays intact).
 * Framer Motion's useScroll reads window scroll, which Lenis keeps
 * in sync, so scroll-linked animation continues to work.
 */
export default function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // expose for anchor scrolling
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}
