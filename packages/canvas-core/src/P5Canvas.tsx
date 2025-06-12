import p5 from 'p5';
import React, { useEffect, useRef } from 'react';

export type Sketch = (p: p5) => void;

/**
 * React wrapper that mounts a p5 sketch and cleans up on unmount.
 * The sketch will reinitialize when the component is hot reloaded.
 */
export function P5Canvas({ sketch }: { sketch: Sketch }): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create new p5 instance in the container
    p5Ref.current = new p5(sketch, containerRef.current);

    return () => {
      // Cleanup the p5 instance on unmount or hot reload
      p5Ref.current?.remove();
      p5Ref.current = null;
    };
  }, [sketch]);

  return <div ref={containerRef} />;
}
