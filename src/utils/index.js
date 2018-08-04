/* @flow */

export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
}

export function doBoxesIntersect(
    a: { x: number, y: number, w: number, h: number },
    b: { x: number, y: number, w: number, h: number }
): boolean {
    // AABB axis-aligned bounding boxes
    return (
        Math.abs(a.x - b.x) * 2 < a.w + b.w &&
        Math.abs(a.y - b.y) * 2 < a.h + b.h
    );
}

export function scaleBetween(
    initialVal: number,
    minAllow: number,
    maxAllow: number,
    min: number,
    max: number
): number {
    // scaleBetween(250, -1, 1, 0, 500) => 0
    return (
        ((maxAllow - minAllow) * (initialVal - min)) / (max - min) + minAllow
    );
}

export function cycle(value: number, total: number): number {
    return ((value % total) + total) % total;
}

export function clamp(number: number, min: number, max: number): number {
    return Math.max(min, Math.min(number, max));
}
