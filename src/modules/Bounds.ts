import Point from './Point';
import { doBoxesIntersect } from '../utils/doBoxesIntersect';

class Bounds {
    x: number;
    y: number;
    w: number;
    h: number;
    hw: number;
    hh: number;
    center: Point;
    position: Point;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hw = w / 2;
        this.hh = h / 2;
        this.center = new Point(this.hw, this.hh);
        this.position = new Point(x, y);
    }

    get params(): [number, number, number, number] {
        return [this.x, this.y, this.w, this.h];
    }

    move(x: number, y: number): this {
        this.x += x;
        this.y += y;
        this.center.move(x, y);
        this.position.move(x, y);
        return this;
    }

    moveTo(x: number, y: number): this {
        this.x = x;
        this.y = y;
        this.center.moveTo(x + this.hw, y + this.hh);
        this.position.moveTo(x, y);
        return this;
    }

    intersectsWith(bounds: Bounds): boolean {
        return doBoxesIntersect(this, bounds);
    }

    offsetOuter(offset: number): Bounds {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x - offset,
            y - offset,
            w + offset * 2,
            h + offset * 2
        );
    }

    offsetInner(offset: number): Bounds {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x + offset,
            y + offset,
            w - offset * 2,
            h - offset * 2
        );
    }
}

export default Bounds;

