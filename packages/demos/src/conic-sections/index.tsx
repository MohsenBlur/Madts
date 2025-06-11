'use client'

import React, { useState, useMemo } from 'react'
import type p5 from 'p5'
import { P5Canvas, type Sketch } from '@madts/canvas-core'
import { Slider, InfoPanel } from '@madts/ui-kit'

export default function ConicSections(): React.ReactElement {
  const [angle, setAngle] = useState(30)
  const coneAngle = 45

  const sketch = useMemo<Sketch>(() => {
    return (p: p5) => {
      p.setup = () => {
        p.createCanvas(300, 300)
      }
      p.draw = () => {
        p.background(255)
        p.translate(p.width / 2, p.height / 2 + 20)
        p.noFill()
        p.stroke(148, 163, 184)
        const h = 120
        const r = h * Math.tan(coneAngle * Math.PI / 180)
        p.line(0, -h, -r, h)
        p.line(0, -h, r, h)

        p.stroke(220, 38, 38)
        const slope = Math.tan(angle * Math.PI / 180)
        p.line(-r, slope * -r, r, slope * r)

        p.stroke(14, 165, 233)
        p.strokeWeight(2)
        if (angle < coneAngle - 0.01) {
          const a = 40
          const b = 20 + 20 * (coneAngle - angle) / coneAngle
          p.ellipse(0, slope * 0, 2 * a, 2 * b)
        } else if (angle > coneAngle + 0.01) {
          const a = 30
          const b = 40
          p.beginShape()
          for (let y = -40; y <= 40; y += 1) {
            const x = Math.sqrt(1 + (y * y) / (b * b)) * a
            p.vertex(x, y)
          }
          for (let y = 40; y >= -40; y -= 1) {
            const x = -Math.sqrt(1 + (y * y) / (b * b)) * a
            p.vertex(x, y)
          }
          p.endShape()
        } else {
          p.beginShape()
          for (let x = -60; x <= 60; x += 1) {
            const y = (x * x) / 120
            p.vertex(x, y)
          }
          p.endShape()
        }
      }
    }
  }, [angle])

  const shape = angle < coneAngle - 0.01 ? 'Ellipse' : angle > coneAngle + 0.01 ? 'Hyperbola' : 'Parabola'

  return (
    <div className="absolute inset-0">
      <P5Canvas sketch={sketch} />
      <div className="absolute bottom-4 left-4 right-4">
        <Slider min={0} max={80} step={1} value={[angle]} onValueChange={v => setAngle(v[0])} />
      </div>
      <InfoPanel title="Conic" className="absolute right-2 top-2 w-40 space-y-1 text-sm">
        <div>Angle: {angle.toFixed(0)}&deg;</div>
        <div>{shape}</div>
      </InfoPanel>
    </div>
  )
}
