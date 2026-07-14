import { Canvas } from '@react-three/fiber'
import type { MutableRefObject } from 'react'
import type { EvidenceRecord } from '../content/evidence'
import { WEBGL_LOST_EVENT } from '../lib/useWebGLSupport'
import { EvidenceField } from './EvidenceField'
import { PipelineScene } from './PipelineScene'

function monitorContextLoss(canvas: HTMLCanvasElement): void {
  // A lost GPU context swaps every canvas to the same readable SVG fallback path.
  canvas.addEventListener(
    'webglcontextlost',
    (event) => {
      event.preventDefault()
      window.dispatchEvent(new Event(WEBGL_LOST_EVENT))
    },
    { once: true },
  )
}

interface HeroCanvasProps {
  active: boolean
  onHoverRecord: (record: EvidenceRecord | null) => void
}

export function HeroCanvas({ active, onHoverRecord }: HeroCanvasProps): JSX.Element {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 52 }}
        dpr={[1, 1.5]}
        frameloop={active ? 'always' : 'demand'}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => monitorContextLoss(gl.domElement)}
      >
        <EvidenceField onHoverRecord={onHoverRecord} />
      </Canvas>
      <div className="hero-shade absolute inset-0" />
    </div>
  )
}

interface PipelineCanvasProps {
  progressRef: MutableRefObject<number>
  active: boolean
}

export function PipelineCanvas({ progressRef, active }: PipelineCanvasProps): JSX.Element {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 9], fov: 48 }}
      dpr={[1, 1.35]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => monitorContextLoss(gl.domElement)}
    >
      <PipelineScene progressRef={progressRef} />
    </Canvas>
  )
}
