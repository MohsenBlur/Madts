'use client';

import Link from 'next/link';
import { useProgress, useAchievements, SPEED_BADGE } from '@madts/canvas-core';

const lessons = [
  { slug: 'hello-shapes', title: 'Hello Shapes' },
  { slug: 'transformations', title: 'Transformations' },
  { slug: 'trig-explorer', title: 'Trig Explorer' },
  { slug: 'conic-sections', title: 'Conic Sections' },
  { slug: 'vectors-dot-product', title: 'Vectors & Dot Product' },
];

export default function Home() {
  const { isCompleted } = useProgress();
  const { badges, streak } = useAchievements();
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Lessons</h1>
      <p data-testid="streak">Current streak: {streak}</p>
      {badges.includes(SPEED_BADGE) && (
        <p className="text-sm font-bold text-blue-600">
          Speed learner badge unlocked!
        </p>
      )}
      <ul className="space-y-2">
        {lessons.map((l) => (
          <li key={l.slug}>
            <Link href={`/demo/${l.slug}`} className="underline">
              {l.title}
            </Link>
            {isCompleted(l.slug) && (
              <span className="ml-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                Done
              </span>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
