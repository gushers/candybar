import Point from './Point';
import Bounds from './Bounds';

export default class Segment {
    p1: Point;
    p2: Point;
    a: Point;
    b: Point;
    points: Point[];
    bounds: Bounds;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
        // alias
        this.a = this.p1;
        this.b = this.p2;
        //
        this.points = [this.p1, this.p2];

        const tl = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        const br = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
        const [dx, dy] = tl.delta(br);
        this.bounds = new Bounds(tl.x, tl.y, dx, dy);
    }

    move(...args: [number, number]): this {
        this.p1 = this.p1.move(...args);
        this.p2 = this.p2.move(...args);
        this.bounds.move(...args);
        return this;
    }
}

