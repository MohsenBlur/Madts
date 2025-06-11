'use client'

import { useEffect } from 'react'
import TriangleTransform from '@madts/demos/transformations'
import { useProgress } from '@madts/canvas-core'

export default function TransformationsPage() {
  const { markComplete } = useProgress()
  useEffect(() => {
    markComplete('transformations')
  }, [markComplete])

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border">
        <TriangleTransform />
      </div>
    </main>
  )
}
