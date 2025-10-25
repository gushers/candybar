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

