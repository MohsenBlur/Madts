'use client'

import React, { useState, useRef } from 'react'
import { InfoPanel } from '@madts/ui-kit'

export default function TrigExplorer(): React.ReactElement {
  const size = 200
  const r = 80
  const cx = size / 2
  const cy = size / 2
  const [angle, setAngle] = useState(0)
  const dragging = useRef(false)

  function angleFromEvent(e: React.PointerEvent<SVGSVGElement>): number {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - cx
    const y = e.clientY - rect.top - cy
    return Math.atan2(-y, x)
  }

  function onDown(e: React.PointerEvent<SVGCircleElement>): void {
    dragging.current = true
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  function onMove(e: React.PointerEvent<SVGSVGElement>): void {
    if (!dragging.current) return
    setAngle(angleFromEvent(e))
  }
  function onUp(e: React.PointerEvent<SVGSVGElement>): void {
    dragging.current = false
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  const sin = Math.sin(angle)
  const cos = Math.cos(angle)
  const x = cx + r * cos
  const y = cy - r * sin
  const bar = 60

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        width={size}
        height={size}
        onPointerMove={onMove}
        onPointerUp={onUp}
        className="touch-none"
      >
        <circle cx={cx} cy={cy} r={r} stroke="#94a3b8" strokeWidth="2" fill="none" />
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="#94a3b8" strokeWidth="2" />
        <circle
          cx={x}
          cy={y}
          r="6"
          fill="#0ea5e9"
          onPointerDown={onDown}
          className="cursor-pointer"
        />
      </svg>
      <div
        className="absolute left-[240px] origin-bottom w-6 bg-sky-300 transition-transform duration-200"
        style={{ height: bar, transform: `scaleY(${sin})` }}
      />
      <div
        className="absolute top-[240px] origin-left bg-orange-300 h-6 transition-transform duration-200"
        style={{ width: bar, transform: `scaleX(${cos})` }}
      />
      <InfoPanel title="Trig" className="absolute right-2 top-2 w-40 space-y-1 text-sm">
        <div>Angle: {(angle * 180 / Math.PI).toFixed(1)}&deg;</div>
        <div>sin: {sin.toFixed(2)}</div>
        <div>cos: {cos.toFixed(2)}</div>
      </InfoPanel>
    </div>
  )
}
