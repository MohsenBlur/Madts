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
