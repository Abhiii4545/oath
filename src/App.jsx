import { useState } from 'react'
import useLenis from './hooks/useLenis'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import Manifesto from './components/sections/Manifesto'
import Universe from './components/sections/Universe'
import ProjectIndex from './components/sections/ProjectIndex'
import HorizontalStory from './components/sections/HorizontalStory'
import Featured from './components/sections/Featured'
import Podcast from './components/sections/Podcast'
import Statement from './components/sections/Statement'
import Future from './components/sections/Future'
import Footer from './components/sections/Footer'

export default function App() {
  useLenis()
  const [, setReady] = useState(false)

  return (
    <>
      <div className="grain" aria-hidden />
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Universe />
        <ProjectIndex />
        <HorizontalStory />
        <Featured />
        <Podcast />
        <Statement />
        <Future />
        <Footer />
      </main>
    </>
  )
}
