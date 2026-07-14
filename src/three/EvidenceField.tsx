import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { EVIDENCE_RECORDS, type EvidenceRecord, type EvidenceStatus } from '../content/evidence'

const tokenName: Record<EvidenceStatus, string> = {
  approved: '--sigill',
  expiring: '--expiry',
  missing: '--saknas',
}

function cssColor(token: string): THREE.Color {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  return new THREE.Color(value)
}

function Lineage(): JSX.Element {
  const positions = useMemo(() => {
    const points: number[] = []
    for (let index = 0; index < 42; index += 1) {
      const source = EVIDENCE_RECORDS[index]
      const target = EVIDENCE_RECORDS[(index * 7 + 13) % 81]
      if (!source || !target) continue
      points.push(...source.position, ...target.position)
    }
    return new Float32Array(points)
  }, [])

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={cssColor('--graphite')} transparent opacity={0.2} depthWrite={false} />
    </lineSegments>
  )
}

export function EvidenceField({ onHoverRecord }: { onHoverRecord: (record: EvidenceRecord | null) => void }): JSX.Element {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const { camera, pointer } = useThree()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    EVIDENCE_RECORDS.forEach((record, index) => mesh.setColorAt(index, cssColor(tokenName[record.status])))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh || document.hidden) return

    const elapsed = clock.getElapsedTime()
    const cursorX = pointer.x * 7.5
    const cursorY = pointer.y * 4.5

    // Mutating one instance buffer keeps the 90-node field out of React's render loop.
    EVIDENCE_RECORDS.forEach((record, index) => {
      const [baseX, baseY, baseZ] = record.position
      const driftX = Math.sin(elapsed * 0.12 + index * 0.71) * 0.12
      const driftY = Math.cos(elapsed * 0.1 + index * 0.37) * 0.1
      const distance = Math.hypot(baseX - cursorX, baseY - cursorY)
      const repel = Math.max(0, 1 - distance / 2.2) * 0.55
      const angle = Math.atan2(baseY - cursorY, baseX - cursorX)
      dummy.position.set(
        baseX + driftX + Math.cos(angle) * repel,
        baseY + driftY + Math.sin(angle) * repel,
        baseZ,
      )
      dummy.quaternion.copy(camera.quaternion)
      const scale = (index === hovered ? 1.8 : 1) * Math.max(0.55, 1 - Math.abs(baseZ) * 0.035)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(index, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      <Lineage />
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, EVIDENCE_RECORDS.length]}
        onPointerMove={(event) => {
          event.stopPropagation()
          const next = event.instanceId ?? null
          setHovered((current) => {
            if (current === next) return current
            onHoverRecord(next === null ? null : (EVIDENCE_RECORDS[next] ?? null))
            return next
          })
        }}
        onPointerOut={() => {
          setHovered(null)
          onHoverRecord(null)
        }}
      >
        <planeGeometry args={[0.09, 0.09]} />
        <meshBasicMaterial vertexColors transparent opacity={0.92} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}
