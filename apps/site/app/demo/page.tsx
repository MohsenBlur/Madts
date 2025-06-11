'use client'

import Link from 'next/link'
import { useProgress } from '@madts/canvas-core'
import { useLocale, type Dictionary } from '@/useLocale'

const lessons = [
  { slug: 'hello-shapes', title: 'hello_shapes' },
  { slug: 'transformations', title: 'transformations' },
  { slug: 'trig-explorer', title: 'trig_explorer' },
  { slug: 'conic-sections', title: 'conic_sections' },
  { slug: 'vectors-dot-product', title: 'vectors_dot_product' },
]

export default function DemoList() {
  const { isCompleted } = useProgress()
  const { t } = useLocale()
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">{t('lessons_title')}</h1>
      <ul className="space-y-2">
        {lessons.map(l => (
          <li key={l.slug}>
            <Link href={`/demo/${l.slug}`} className="underline">
              {t(l.title as keyof Dictionary)}
            </Link>
            {isCompleted(l.slug) && (
              <span className="ml-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                {t('done')}
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
