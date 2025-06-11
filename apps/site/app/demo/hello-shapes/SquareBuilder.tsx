'use client'

import React, { useState, useRef } from 'react'
import { areaRectangle, perimeterRectangle } from '@madts/canvas-core'
import { InfoPanel } from '@madts/ui-kit'

export default function SquareBuilder() {
  const [side, setSide] = useState(100)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startOffset = useRef({ x: 0, y: 0 })
  const startSide = useRef(100)

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(true)
    startPos.current = { x: e.clientX, y: e.clientY }
    startOffset.current = { x: position.x, y: position.y }
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    setPosition({ x: startOffset.current.x + dx, y: startOffset.current.y + dy })
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false)
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  function onResizeDown(e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation()
    setResizing(true)
    startPos.current = { x: e.clientX, y: e.clientY }
    startSide.current = side
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }

  function onResizeMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!resizing) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const delta = Math.max(dx, dy)
    setSide(Math.max(10, startSide.current + delta))
  }

  function onResizeUp(e: React.PointerEvent<HTMLDivElement>) {
    setResizing(false)
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  const area = areaRectangle(side, side)
  const peri = perimeterRectangle(side, side)

  return (
    <>
      <div
        className="absolute bg-blue-300/70 border-2 border-blue-500 cursor-move"
        style={{ width: side, height: side, left: position.x, top: position.y }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="absolute bottom-0 right-0 h-4 w-4 bg-blue-500 cursor-se-resize"
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
        />
      </div>
      <InfoPanel title="Square" className="absolute right-2 top-2 w-40">
        <div className="text-sm">Side: {Math.round(side)} px</div>
        <div className="text-sm">Area: {Math.round(area)} px²</div>
        <div className="text-sm">Perim: {Math.round(peri)} px</div>
      </InfoPanel>
    </>
  )
}
