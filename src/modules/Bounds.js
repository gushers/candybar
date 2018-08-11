import Point from './Point';
import { doBoxesIntersect } from './utils';

class Bounds {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hw = w / 2;
        this.hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }

    get params() {
        return [this.x, this.y, this.w, this.h];
    }

    intersectWith(bounds) {
        return doBoxesIntersect(this, bounds);
    }

    offsetOuter(offset) {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x - offset,
            y - offset,
            w + offset * 2,
            h + offset * 2
        );
    }

    offsetInner(offset) {
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
