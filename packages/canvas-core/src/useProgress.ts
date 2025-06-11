import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'madts-progress'

function load(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setCompleted(load())
  }, [])

  const save = useCallback((items: string[]) => {
    setCompleted(items)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [])

  const markComplete = useCallback(
    (slug: string) => {
      if (completed.includes(slug)) return
      const updated = [...completed, slug]
      save(updated)
    },
    [completed, save]
  )

  const isCompleted = useCallback(
    (slug: string) => completed.includes(slug),
    [completed]
  )

  const reset = useCallback(() => save([]), [save])

  return { completed, markComplete, isCompleted, reset }
}
