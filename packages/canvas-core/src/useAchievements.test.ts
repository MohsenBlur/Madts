import { describe, it, beforeEach, expect, vi } from 'vitest';
import {
  loadAchievements,
  recordCompletion,
  SPEED_BADGE,
} from './useAchievements';

beforeEach(() => {
  vi.useFakeTimers();
  // simple localStorage mock
  const store: Record<string, string> = {};
  global.localStorage = {
    getItem: (k: string) => (k in store ? store[k] : null),
    setItem: (k: string, v: string) => {
      store[k] = String(v);
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {
      for (const k in store) delete store[k];
    },
    key: (i: number) => Object.keys(store)[i] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
  global.localStorage.clear();
});

describe('badge awarding', () => {
  it('awards badge after 3 lessons in 24h', () => {
    vi.setSystemTime(0);
    recordCompletion('a');
    vi.setSystemTime(60 * 60 * 1000);
    recordCompletion('b');
    vi.setSystemTime(2 * 60 * 60 * 1000);
    recordCompletion('c');
    const state = loadAchievements();
    expect(state.badges).toContain(SPEED_BADGE);
  });
});

describe('streaks', () => {
  it('increments streak on consecutive days', () => {
    vi.setSystemTime(0);
    recordCompletion('a');
    vi.setSystemTime(24 * 60 * 60 * 1000);
    recordCompletion('b');
    const state = loadAchievements();
    expect(state.streak).toBe(2);
  });
});
