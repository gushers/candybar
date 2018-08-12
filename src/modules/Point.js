import { lerp } from '../utils';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get position() {
        return [this.x, this.y];
    }

    clone() {
        return new Point(this.x, this.y);
    }

    delta(point) {
        return [point.x - this.x, point.y - this.y];
    }

    distance(point) {
        const [dx, dy] = this.delta(point);
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    moveAtAngle(angle, distance) {
        this.x += Math.cos(angle) * distance;
        this.y += Math.sin(angle) * distance;
        return this;
    }

    angleRadians(point) {
        // radians = atan2(deltaY, deltaX)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x);
    }

    angleDeg(point) {
        // degrees = atan2(deltaY, deltaX) * (180 / PI)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x) * (180 / Math.PI);
    }

    rotate(origin, radians) {
        // rotate the point around a given origin point
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x =
            cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
        this.y =
            cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
        return this;
    }

    lerp(destination, amount) {
        this.x = lerp(this.x, destination.x, amount);
        this.y = lerp(this.y, destination.y, amount);
        return this;
    }
}

export default Point;
