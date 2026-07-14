import { useEffect, useState } from 'react'

export const WEBGL_LOST_EVENT = 'bevisa:webgl-lost'

let webglContextLost = false

function hasLostWebGLContext(): boolean {
  return webglContextLost || document.documentElement.dataset.webglContext === 'lost'
}

export function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    return context !== null
  } catch {
    return false
  }
}

export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    const markLost = (event: Event): void => {
      if (event.type === 'webglcontextlost') event.preventDefault()
      // Remember the failure for scenes that mount after the originating canvas.
      webglContextLost = true
      document.documentElement.dataset.webglContext = 'lost'
      setSupported(false)
    }
    setSupported(!hasLostWebGLContext() && detectWebGL())
    window.addEventListener(WEBGL_LOST_EVENT, markLost)
    // WebGL context-loss events do not bubble, so capture them before a newly
    // inserted R3F canvas can race its own onCreated listener.
    document.addEventListener('webglcontextlost', markLost, true)
    return () => {
      window.removeEventListener(WEBGL_LOST_EVENT, markLost)
      document.removeEventListener('webglcontextlost', markLost, true)
    }
  }, [])

  return supported
}
