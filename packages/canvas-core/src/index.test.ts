import { describe, it, expect, vi } from 'vitest'

vi.mock('./P5Canvas', () => ({
  P5Canvas: () => null,
}))

import {
  distance,
  areaRectangle,
  perimeterRectangle,
  areaCircle,
  circumference,
  polygonArea,
  polygonPerimeter,
  type Point,
} from './index'

describe('distance', () => {
  it('computes Euclidean distance', () => {
    const a: Point = { x: 0, y: 0 }
    const b: Point = { x: 3, y: 4 }
    expect(distance(a, b)).toBe(5)
  })
})

describe('rectangle helpers', () => {
  it('computes area', () => {
    expect(areaRectangle(5, 4)).toBe(20)
  })
  it('computes perimeter', () => {
    expect(perimeterRectangle(5, 4)).toBe(18)
  })
})

describe('circle helpers', () => {
  it('computes area', () => {
    expect(areaCircle(2)).toBeCloseTo(Math.PI * 4)
  })
  it('computes circumference', () => {
    expect(circumference(2)).toBeCloseTo(2 * Math.PI * 2)
  })
})

describe('polygon helpers', () => {
  const square: Point[] = [
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 2 },
    { x: 0, y: 2 },
  ]

  it('calculates area independent of point order', () => {
    expect(polygonArea(square)).toBe(4)
    expect(polygonArea([...square].reverse())).toBe(4)
  })

  it('calculates perimeter', () => {
    expect(polygonPerimeter(square)).toBeCloseTo(8)
  })
})
