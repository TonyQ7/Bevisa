import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { REQUIREMENTS, type EvidenceStatus } from '../content/evidence'

// Lighter status tints hold 3:1 contrast against the ink stage surface.
const colorTokens: Record<EvidenceStatus, string> = {
  approved: '--sigill-light',
  expiring: '--expiry-light',
  missing: '--saknas-light',
}

function cssColor(token: string): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  return new THREE.Color(value)
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value))
const segment = (progress: number, start: number, end: number): number =>
  clamp01((progress - start) / (end - start))

function targetPosition(index: number, progress: number): THREE.Vector3 {
  // Every phase is derived from progress rather than toggled state, which makes the geometry fully reversible.
  const document = new THREE.Vector3((index % 6) * 0.46 - 1.15, 3.7 - Math.floor(index / 6) * 0.36, 0)
  const spine = new THREE.Vector3(-3.0, 3.3 - index * 0.28, 0)
  const map = new THREE.Vector3(index % 2 === 0 ? -3.8 : 3.4, 3.1 - Math.floor(index / 2) * 0.5, 0)
  const matrix = new THREE.Vector3((index % 6) * 0.95 - 2.4, 1.9 - Math.floor(index / 6) * 0.95, 0)

  if (progress < 0.24) return document.lerp(spine, segment(progress, 0.08, 0.24))
  if (progress < 0.62) return spine.lerp(map, segment(progress, 0.35, 0.62))
  return map.lerp(matrix, segment(progress, 0.76, 0.96))
}

export function PipelineScene({ progressRef }: { progressRef: MutableRefObject<number> }): JSX.Element {
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const documentRef = useRef<THREE.Mesh>(null)
  const gateRef = useRef<THREE.Mesh>(null)
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const linePositions = useMemo(() => new Float32Array(REQUIREMENTS.length * 6), [])
  const statusColors = useMemo(
    () => ({
      approved: cssColor(colorTokens.approved),
      expiring: cssColor(colorTokens.expiring),
      missing: cssColor(colorTokens.missing),
    }),
    [],
  )
  const graphite = useMemo(() => cssColor('--ink-muted'), [])
  const sigill = useMemo(() => cssColor('--sigill-light'), [])
  const arkiv = useMemo(() => cssColor('--arkiv'), [])

  useLayoutEffect(() => {
    const nodes = nodesRef.current
    if (!nodes) return
    REQUIREMENTS.forEach((requirement, index) => nodes.setColorAt(index, statusColors[requirement.status]))
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true
    // The instanceColor attribute is created after the material may have compiled.
    if (!Array.isArray(nodes.material)) nodes.material.needsUpdate = true
  }, [statusColors])

  useFrame(() => {
    const nodes = nodesRef.current
    if (!nodes) return
    const progress = progressRef.current

    // Write directly into reusable instance and line buffers; React never updates per animation frame.
    REQUIREMENTS.forEach((requirement, index) => {
      const position = targetPosition(index, progress)
      dummy.position.copy(position)
      const matrixScale = segment(progress, 0.78, 0.96)
      dummy.scale.set(0.16 + matrixScale * 0.62, 0.16 + matrixScale * 0.42, 1)
      dummy.updateMatrix()
      nodes.setMatrixAt(index, dummy.matrix)
      nodes.setColorAt(index, statusColors[requirement.status])

      const edgeOffset = index * 6
      linePositions[edgeOffset] = position.x
      linePositions[edgeOffset + 1] = position.y
      linePositions[edgeOffset + 2] = -0.05
      linePositions[edgeOffset + 3] = position.x < 0 ? 3.4 : -3.8
      linePositions[edgeOffset + 4] = position.y
      linePositions[edgeOffset + 5] = -0.05
    })
    nodes.instanceMatrix.needsUpdate = true
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true

    const attribute = lineGeometryRef.current?.getAttribute('position') as THREE.BufferAttribute | undefined
    if (attribute) attribute.needsUpdate = true
    if (lineGeometryRef.current) lineGeometryRef.current.setDrawRange(0, progress > 0.38 && progress < 0.83 ? REQUIREMENTS.length * 2 : 0)

    if (documentRef.current) {
      documentRef.current.position.y = 4.8 - segment(progress, 0, 0.18) * 4
      documentRef.current.rotation.z = (1 - segment(progress, 0, 0.18)) * -0.16
      documentRef.current.visible = progress < 0.25
    }
    if (gateRef.current) {
      gateRef.current.visible = progress > 0.82
      gateRef.current.position.y = 2.3 - segment(progress, 0.82, 0.97) * 3.2
    }
  })

  return (
    <group>
      <mesh ref={documentRef} position={[0, 4.8, 0]}>
        <planeGeometry args={[4.0, 5.2, 8, 12]} />
        <meshBasicMaterial color={graphite} wireframe transparent opacity={0.55} />
      </mesh>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, REQUIREMENTS.length]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={sigill} transparent opacity={0.5} />
      </lineSegments>
      <mesh ref={gateRef} position={[0, 2.3, 0.2]} visible={false}>
        <planeGeometry args={[6.4, 0.05]} />
        <meshBasicMaterial color={arkiv} transparent opacity={0.88} />
      </mesh>
    </group>
  )
}
