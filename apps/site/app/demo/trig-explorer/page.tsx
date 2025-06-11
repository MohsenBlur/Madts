'use client'

import { useEffect } from 'react'
import TrigExplorer from '@madts/demos/trig-explorer'
import { useProgress } from '@madts/canvas-core'

export default function TrigExplorerPage() {
  const { markComplete } = useProgress()
  useEffect(() => {
    markComplete('trig-explorer')
  }, [markComplete])

  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <div className="relative h-[80vh] w-full border flex items-center justify-center">
        <TrigExplorer />
      </div>
    </main>
  )
}
