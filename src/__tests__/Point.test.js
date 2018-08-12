import Point from '../modules/Point';

describe('Point class', () => {
    it('constructs', () => {
        const point = new Point(50, 75);
        expect(point).toEqual(
            expect.objectContaining({
                x: 50,
                y: 75,
            })
        );
    });

    it('get the position', () => {
        const point = new Point(50, 75);
        expect(point.position).toEqual([50, 75]);
    });

    it('returns delta [x, y] from a given point', () => {
        const a = new Point(50, 75);
        const b = new Point(60, 95);
        const c = new Point(40, 55);

        expect(a.delta(b)).toEqual([10, 20]);
        expect(a.delta(c)).toEqual([-10, -20]);
    });

    it('moves to a given [x, y] position', () => {
        const a = new Point(0, 10);
        const b = new Point(0, 50);

        expect(a.moveTo(100, 100).position).toEqual([100, 100]);
        expect(b.moveTo(100, 100).position).toEqual([100, 100]);
    });

    it('moves a given [x, y] amount', () => {
        const a = new Point(0, 10);
        const b = new Point(40, 50);

        expect(a.move(100, 100).position).toEqual([100, 110]);
        expect(b.move(100, 100).position).toEqual([140, 150]);
    });

    it('moves a given [x, y] amount', () => {
        const a = new Point(0, 10);
        const b = new Point(40, 50);

        expect(a.move(100, 100).position).toEqual([100, 110]);
        expect(b.move(100, 100).position).toEqual([140, 150]);
    });

    // it('moves at a given angle (radians) and distance', () => {
    //     const a = new Point(0, 0);

    //     expect(a.moveAtAngle(Math.PI, 100).position).toEqual([-100, 0]);
    // });

    it('return angle (radians) from a given point', () => {
        const a = new Point(0, 0);
        const b = new Point(-50, 0);
        const c = new Point(0, -50);

        expect(a.angleRadians(b)).toEqual(Math.PI);
        expect(a.angleRadians(c)).toEqual(-Math.PI / 2);
    });
});
