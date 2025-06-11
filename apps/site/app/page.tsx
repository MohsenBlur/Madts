"use client"

import Link from "next/link";
import { useProgress } from "@madts/canvas-core";

const lessons = [{ slug: "hello-shapes", title: "Hello Shapes" }];

export default function Home() {
  const { isCompleted } = useProgress();
  return (
    <main className="flex min-h-screen w-screen flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Lessons</h1>
      <ul className="space-y-2">
        {lessons.map(l => (
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
