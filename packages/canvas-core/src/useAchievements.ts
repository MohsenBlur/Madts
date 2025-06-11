import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'madts-achievements';
export const SPEED_BADGE = 'three-lessons-24h';

export type Completion = {
  slug: string;
  ts: number;
};

export type AchievementState = {
  completions: Completion[];
  badges: string[];
  streak: number;
};

const emptyState: AchievementState = {
  completions: [],
  badges: [],
  streak: 0,
};

export function loadAchievements(): AchievementState {
  if (typeof localStorage === 'undefined') return { ...emptyState };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyState };
    const data = JSON.parse(raw);
    return {
      completions: Array.isArray(data?.completions) ? data.completions : [],
      badges: Array.isArray(data?.badges) ? data.badges : [],
      streak: typeof data?.streak === 'number' ? data.streak : 0,
    };
  } catch {
    return { ...emptyState };
  }
}

function saveAchievements(state: AchievementState) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function recordCompletion(slug: string) {
  const state = loadAchievements();
  const now = Date.now();
  state.completions.push({ slug, ts: now });

  // recompute streak from completions sorted by time
  const sorted = [...state.completions].sort((a, b) => a.ts - b.ts);
  let streak = 1;
  for (let i = sorted.length - 1; i > 0; i -= 1) {
    const diffDays = Math.floor((sorted[i].ts - sorted[i - 1].ts) / 86400000);
    if (diffDays === 1) streak += 1;
    else if (diffDays > 1) break;
  }
  state.streak = streak;

  const dayAgo = now - 86400000;
  const uniqueSlugs = new Set(
    state.completions.filter((c) => c.ts >= dayAgo).map((c) => c.slug),
  );
  if (uniqueSlugs.size >= 3 && !state.badges.includes(SPEED_BADGE)) {
    state.badges.push(SPEED_BADGE);
  }

  saveAchievements(state);
}

export function useAchievements() {
  const [state, setState] = useState<AchievementState>(() =>
    loadAchievements(),
  );

  const refresh = useCallback(() => setState(loadAchievements()), []);

  useEffect(() => {
    refresh();
    if (typeof window !== 'undefined') {
      const handler = () => refresh();
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    }
    return;
  }, [refresh]);

  const reset = useCallback(() => {
    saveAchievements({ ...emptyState });
    refresh();
  }, [refresh]);

  return { ...state, reset };
}
