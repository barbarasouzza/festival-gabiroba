import { useEffect, useState } from 'react'

export default function SpeciesProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = null

    const update = () => {
      frame = null
      const article = document.querySelector('.species-page')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const start = window.scrollY + rect.top
      const scrollable = Math.max(article.offsetHeight - window.innerHeight, 1)
      const current = Math.min(Math.max((window.scrollY - start) / scrollable, 0), 1)
      setProgress(current * 100)
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="species-reading-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  )
}
