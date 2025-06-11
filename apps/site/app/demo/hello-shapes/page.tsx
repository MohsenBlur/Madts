'use client'

import { useEffect } from 'react'
import Whiteboard from '../../components/Whiteboard'
import SquareBuilder from '@madts/demos/area-perimeter'
import { useProgress } from '@madts/canvas-core'

export default function HelloShapesPage() {
  const { markComplete } = useProgress()
  useEffect(() => {
    markComplete('hello-shapes')
  }, [markComplete])

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border">
        <Whiteboard />
        <SquareBuilder />
      </div>
    </main>
  )
}
