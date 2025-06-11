'use client'

import { useEffect } from 'react'
import VectorsDotDemo from '@madts/demos/vectors-dot-product'
import { useProgress } from '@madts/canvas-core'

export default function VectorsDotProductPage() {
  const { markComplete } = useProgress()
  useEffect(() => {
    markComplete('vectors-dot-product')
  }, [markComplete])

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border flex items-center justify-center">
        <VectorsDotDemo />
      </div>
    </main>
  )
}
