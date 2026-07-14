import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useSmoothScroll(): void {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    let disposed = false
    let destroy: (() => void) | undefined

    const start = window.setTimeout(() => {
      void Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')])
        .then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
          if (disposed) return
          gsap.registerPlugin(ScrollTrigger)
          const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
          const update = (time: number): void => lenis.raf(time * 1000)
          lenis.on('scroll', ScrollTrigger.update)
          gsap.ticker.add(update)
          gsap.ticker.lagSmoothing(0)
          destroy = () => {
            gsap.ticker.remove(update)
            lenis.destroy()
          }
        })
        .catch(() => undefined)
    }, 400)

    return () => {
      disposed = true
      window.clearTimeout(start)
      destroy?.()
    }
  }, [reducedMotion])
}
