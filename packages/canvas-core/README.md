# @madts/canvas-core

Utility library for geometric calculations used by Math-Playground.

## Usage

```ts
import { Point, distance, areaRectangle } from '@madts/canvas-core';

const a: Point = { x: 0, y: 0 };
const b: Point = { x: 3, y: 4 };

distance(a, b); // 5
areaRectangle(2, 4); // 8
```

### Rendering p5 sketches

```tsx
import { P5Canvas } from '@madts/canvas-core';

function sketch(p: p5) {
  p.setup = () => {
    p.createCanvas(400, 400);
  };
  p.draw = () => {
    p.background(220);
  };
}

export default function App() {
  return <P5Canvas sketch={sketch} />;
}
```
