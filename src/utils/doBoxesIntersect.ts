/**
 * Determines if two axis-aligned boxes intersect using AABB.
 */
export function doBoxesIntersect(
    a: { x: number; y: number; w: number; h: number },
    b: { x: number; y: number; w: number; h: number }
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

