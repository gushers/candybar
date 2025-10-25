/**
 * Gets a random float between a given min and max number.
 */
export function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

