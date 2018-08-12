/* @flow */

/**
 * Gets a random float between a given min and max number.
 */
export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Gets a random integer between a given min and max number.
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets the linear interpretation given a start, end, and the current amount (0–1)
 */
export function lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
}

/**
 * Determines if two axis-aligned boxes intersect using AABB.
 */
export function doBoxesIntersect(
    a: { x: number, y: number, w: number, h: number },
    b: { x: number, y: number, w: number, h: number }
): boolean {
    if (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.h + a.y > b.y
    ) {
        return true;
    }
    return false;
}

/**
 * Scales a value given a target range and current range.
 */
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

/**
 * Cycles through a total amount and current value.
 */
export function cycle(value: number, total: number): number {
    return ((value % total) + total) % total;
}

/**
 * Clamps a number between a given min and max range.
 */
export function clamp(number: number, min: number, max: number): number {
    return Math.max(min, Math.min(number, max));
}
