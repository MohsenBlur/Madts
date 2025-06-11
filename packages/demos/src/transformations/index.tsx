'use client'

import React, { useState, useRef } from 'react'
import { InfoPanel } from '@madts/ui-kit'

export type Point = { x: number; y: number }

const initial: Point[] = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 150, y: 200 },
]

function centroid(pts: Point[]): Point {
  const c = pts.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 })
  return { x: c.x / pts.length, y: c.y / pts.length }
}

function transform(points: Point[]): { dx: number; dy: number; angle: number; scale: number } {
  const c0 = centroid(initial)
  const c1 = centroid(points)
  const dx = c1.x - c0.x
  const dy = c1.y - c0.y
  const v0 = { x: initial[1].x - initial[0].x, y: initial[1].y - initial[0].y }
  const v1 = { x: points[1].x - points[0].x, y: points[1].y - points[0].y }
  const len0 = Math.hypot(v0.x, v0.y)
  const len1 = Math.hypot(v1.x, v1.y)
  const scale = len1 / len0
  const angle = Math.atan2(v1.y, v1.x) - Math.atan2(v0.y, v0.x)
  return { dx, dy, angle, scale }
}

export default function TriangleTransform(): React.ReactElement {
  const [pts, setPts] = useState<Point[]>(initial)
  const dragIndex = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  function getPos(e: React.PointerEvent<HTMLDivElement>): Point {
    const rect = containerRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onDown(idx: number, e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    dragIndex.current = idx
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragIndex.current === null) return
    const pos = getPos(e)
    setPts(p => p.map((pt, i) => (i === dragIndex.current ? pos : pt)))
  }

  function onUp(e: React.PointerEvent<HTMLDivElement>) {
    dragIndex.current = null
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  const { dx, dy, angle, scale } = transform(pts)
  const cos = Math.cos(angle) * scale
  const sin = Math.sin(angle) * scale

  return (
    <div ref={containerRef} className="absolute inset-0" onPointerMove={onMove} onPointerUp={onUp}>
      <svg className="absolute inset-0 h-full w-full" fill="none" stroke="purple" strokeWidth="2">
        <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="rgba(196,167,255,0.5)" />
      </svg>
      {pts.map((p, i) => (
        <div
          key={i}
          style={{ left: p.x - 6, top: p.y - 6 }}
          className="absolute h-3 w-3 rounded-full bg-purple-600 cursor-pointer"
          onPointerDown={e => onDown(i, e)}
        />
      ))}
      <InfoPanel title="Transform" className="absolute right-2 top-2 w-56 space-y-1 text-sm">
        <div>Translation: [{dx.toFixed(1)}, {dy.toFixed(1)}]</div>
        <div>Rotation: {(angle * 180 / Math.PI).toFixed(1)}°</div>
        <div>Scale: {scale.toFixed(2)}</div>
        <div className="mt-2 font-mono text-xs">
          [ {cos.toFixed(2)} , {(-sin).toFixed(2)} , {dx.toFixed(1)} ]<br />
          [ {sin.toFixed(2)} , {cos.toFixed(2)} , {dy.toFixed(1)} ]<br />
          [ 0 , 0 , 1 ]
        </div>
      </InfoPanel>
    </div>
  )
}
