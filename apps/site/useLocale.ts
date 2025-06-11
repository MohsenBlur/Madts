'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import en from '@/locales/en.json'

const dictionaries = { en } as const

export type Dictionary = typeof en

type Vars = Record<string, string | number>

export function useLocale() {
  const { locale } = useRouter()
  const dict = dictionaries[(locale ?? 'en') as keyof typeof dictionaries] as Dictionary

  const t = useCallback(
    (key: keyof Dictionary, vars?: Vars) => {
      let text = dict[key] ?? key
      if (!vars) return text
      return Object.entries(vars).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        text,
      )
    },
    [dict],
  )

  return { locale: locale ?? 'en', dict, t }
}
