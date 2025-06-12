'use client'

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

import en from '@/locales/en.json';

const dictionaries = { en } as const;

export type Dictionary = typeof en;

type Vars = Record<string, string | number>;

export function useLocale() {
  const pathname = usePathname();
  const first = pathname.split('/')[1] ?? 'en';
  const locale = (first in dictionaries ? first : 'en') as keyof typeof dictionaries;
  const dict = dictionaries[locale];

  const t = useCallback(
    (key: keyof Dictionary, vars?: Vars) => {
      let text = dict[key] ?? key;
      if (!vars) return text;
      return Object.entries(vars).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        text,
      );
    },
    [dict],
  );

  return { locale, dict, t };
}
