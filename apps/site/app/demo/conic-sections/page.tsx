'use client'

import { useEffect } from 'react'
import ConicSections from '@madts/demos/conic-sections'
import { useProgress } from '@madts/canvas-core'

export default function ConicSectionsPage() {
  const { markComplete } = useProgress()
  useEffect(() => {
    markComplete('conic-sections')
  }, [markComplete])

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border flex items-center justify-center">
        <ConicSections />
      </div>
    </main>
  )
}
