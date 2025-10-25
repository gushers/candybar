/**
 * Gets the linear interpretation given a start, end, and the current amount (0–1)
 */
export function lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
}

