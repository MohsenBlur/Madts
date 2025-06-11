'use client'

import React, { useState, useRef } from 'react'
import { InfoPanel } from '@madts/ui-kit'

type Point = { x: number; y: number }

export default function VectorsDotDemo(): React.ReactElement {
  const size = 300
  const center = size / 2
  const [a, setA] = useState<Point>({ x: 220, y: 120 })
  const [b, setB] = useState<Point>({ x: 80, y: 200 })
  const drag = useRef<'a' | 'b' | null>(null)

  function pos(e: React.PointerEvent<SVGSVGElement>): Point {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function onDown(which: 'a' | 'b', e: React.PointerEvent<SVGCircleElement>): void {
    drag.current = which
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  function onMove(e: React.PointerEvent<SVGSVGElement>): void {
    if (!drag.current) return
    const p = pos(e)
    if (drag.current === 'a') setA(p)
    else setB(p)
  }

  function onUp(e: React.PointerEvent<SVGSVGElement>): void {
    drag.current = null
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  const va = { x: a.x - center, y: center - a.y }
  const vb = { x: b.x - center, y: center - b.y }
  const dot = va.x * vb.x + va.y * vb.y
  const lenA = Math.hypot(va.x, va.y)
  const lenB = Math.hypot(vb.x, vb.y)
  const angle = Math.acos(Math.min(Math.max(dot / (lenA * lenB), -1), 1))

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width={size}
        height={size}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className="touch-none"
      >
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,8 L8,4 z" fill="currentColor" />
          </marker>
        </defs>
        <line x1={center} y1={0} x2={center} y2={size} stroke="#e2e8f0" />
        <line x1={0} y1={center} x2={size} y2={center} stroke="#e2e8f0" />
        <line x1={center} y1={center} x2={a.x} y2={a.y} stroke="#f87171" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1={center} y1={center} x2={b.x} y2={b.y} stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrow)" />
        <circle cx={a.x} cy={a.y} r="6" fill="#f87171" onPointerDown={e => onDown('a', e)} className="cursor-pointer" />
        <circle cx={b.x} cy={b.y} r="6" fill="#60a5fa" onPointerDown={e => onDown('b', e)} className="cursor-pointer" />
      </svg>
      <InfoPanel title="Vectors" className="absolute right-2 top-2 w-44 space-y-1 text-sm">
        <div>dot: {dot.toFixed(1)}</div>
        <div>angle: {(angle * 180 / Math.PI).toFixed(1)}&deg;</div>
      </InfoPanel>
    </div>
  )
}
