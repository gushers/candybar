import Bounds from '../modules/Bounds';

describe('Bounds class', () => {
    it('constructs', () => {
        const bounds = new Bounds(0, 0, 100, 100);
        expect(bounds).toEqual(
            expect.objectContaining({
                x: 0,
                y: 0,
                w: 100,
                h: 100,
                hw: 50,
                hh: 50,
                center: expect.objectContaining({
                    x: 50,
                    y: 50,
                }),
                position: expect.objectContaining({
                    x: 0,
                    y: 0,
                }),
            })
        );
    });

    it('returns rect parameters', () => {
        const bounds1 = new Bounds(10, 20, 30, 40);
        expect(bounds1.params).toEqual([10, 20, 30, 40]);
    });

    it('updates properties when moved', () => {
        const bounds = new Bounds(0, 0, 100, 100);
        bounds.move(10, 10);
        expect(bounds).toEqual(
            expect.objectContaining({
                x: 10,
                y: 10,
                w: 100,
                h: 100,
                hw: 50,
                hh: 50,
                center: expect.objectContaining({
                    x: 60,
                    y: 60,
                }),
                position: expect.objectContaining({
                    x: 10,
                    y: 10,
                }),
            })
        );

        bounds.move(-20, -20);
        expect(bounds).toEqual(
            expect.objectContaining({
                x: -10,
                y: -10,
                w: 100,
                h: 100,
                hw: 50,
                hh: 50,
                center: expect.objectContaining({
                    x: 40,
                    y: 40,
                }),
                position: expect.objectContaining({
                    x: -10,
                    y: -10,
                }),
            })
        );
    });

    it('updates properties when moved', () => {
        const bounds = new Bounds(50, 50, 100, 100);
        bounds.moveTo(10, 10);
        expect(bounds).toEqual(
            expect.objectContaining({
                x: 10,
                y: 10,
                w: 100,
                h: 100,
                hw: 50,
                hh: 50,
                center: expect.objectContaining({
                    x: 60,
                    y: 60,
                }),
                position: expect.objectContaining({
                    x: 10,
                    y: 10,
                }),
            })
        );
    });

    it('gets intersections with other bounds', () => {
        const bounds1 = new Bounds(0, 0, 100, 100);
        const bounds2 = new Bounds(20, 20, 100, 100);
        const bounds3 = new Bounds(100, 100, 100, 100); // adjacent
        const bounds4 = new Bounds(25, 25, 50, 50); // within
        const bounds5 = new Bounds(10.2, 5.3, 10.33333, 20); // within
        const bounds6 = new Bounds(0, 0, 1500, 1000);
        const bounds7 = new Bounds(500, 510, 10, 10);
        const bounds8 = new Bounds(1500, 1000, 10, 10);
        const bounds9 = new Bounds(95, 95, 10, 10);

        expect(bounds1.intersectsWith(bounds2)).toEqual(true);
        expect(bounds1.intersectsWith(bounds3)).toEqual(false);
        expect(bounds1.intersectsWith(bounds4)).toEqual(true);
        expect(bounds5.intersectsWith(bounds1)).toEqual(true);
        expect(bounds6.intersectsWith(bounds7)).toEqual(true);
        expect(bounds6.intersectsWith(bounds8)).toEqual(false);
        expect(bounds1.intersectsWith(bounds9)).toEqual(true);
    });
});
