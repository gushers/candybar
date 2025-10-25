/**
 * Cycles through a total amount and current value.
 */
export function cycle(value: number, total: number): number {
    return ((value % total) + total) % total;
}

