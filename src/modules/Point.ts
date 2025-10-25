import { lerp } from '../utils/lerp';

class Point {
    x: number;
    y: number;
    isFixed?: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get position(): [number, number] {
        return [this.x, this.y];
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    delta(point: Point): [number, number] {
        return [point.x - this.x, point.y - this.y];
    }

    distance(point: Point): number {
        const [dx, dy] = this.delta(point);
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveTo(x: number, y: number): this {
        this.x = x;
        this.y = y;
        return this;
    }

    move(x: number, y: number): this {
        this.x += x;
        this.y += y;
        return this;
    }

    moveAtAngle(angle: number, distance: number): this {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
        return this;
    }

    angleRadians(point: Point): number {
        // radians = atan2(deltaY, deltaX)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x);
    }

    angleDeg(point: Point): number {
        // degrees = atan2(deltaY, deltaX) * (180 / PI)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    rotate(origin: Point, radians: number): this {
        // rotate the point around a given origin point
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x =
            cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
        this.y =
            cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
        return this;
    }

    lerp(destination: Point, amount: number): this {
        this.x = lerp(this.x, destination.x, amount);
        this.y = lerp(this.y, destination.y, amount);
        return this;
    }

    applyForce(x: number, y: number): void {
        // Base implementation does nothing
        // Override in physics-based subclasses
    }
}

export default Point;

