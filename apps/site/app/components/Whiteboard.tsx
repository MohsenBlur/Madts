'use client'

import dynamic from 'next/dynamic'
import 'tldraw/tldraw.css'

const Tldraw = dynamic(() => import('@tldraw/tldraw').then(mod => mod.Tldraw), { ssr: false })

export default function Whiteboard() {
  return (
    <div className="w-full h-full">
      <Tldraw persistenceKey="whiteboard" />
    </div>
  )
}
