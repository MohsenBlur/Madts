export type Point = {
  x: number;
  y: number;
};

/**
 * Calculate Euclidean distance between two points.
 */
export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/**
 * Area of a rectangle.
 */
export function areaRectangle(width: number, height: number): number {
  return width * height;
}

/**
 * Perimeter of a rectangle.
 */
export function perimeterRectangle(width: number, height: number): number {
  return 2 * (width + height);
}

/**
 * Area of a circle.
 */
export function areaCircle(radius: number): number {
  return Math.PI * radius * radius;
}

/**
 * Circumference of a circle.
 */
export function circumference(radius: number): number {
  return 2 * Math.PI * radius;
}

/**
 * Compute polygon area using the shoelace formula.
 */
export function polygonArea(points: Point[]): number {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i += 1) {
    const { x: x1, y: y1 } = points[i];
    const { x: x2, y: y2 } = points[(i + 1) % n];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
}

/**
 * Compute polygon perimeter by summing edge lengths.
 */
export function polygonPerimeter(points: Point[]): number {
  let peri = 0;
  const n = points.length;
  for (let i = 0; i < n; i += 1) {
    peri += distance(points[i], points[(i + 1) % n]);
  }
  return peri;
}
