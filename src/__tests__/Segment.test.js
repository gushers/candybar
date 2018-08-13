import Segment from '../modules/Segment';
import Point from '../modules/Point';
import Bounds from '../modules/Bounds';

describe('Segment class', () => {
    it('constructs', () => {
        const segment = new Segment(new Point(0, 50), new Point(50, 75));
        expect(segment).toEqual(
            expect.objectContaining({
                p1: expect.any(Point),
                p2: expect.any(Point),
                a: expect.any(Point),
                b: expect.any(Point),
                bounds: expect.any(Bounds),
            })
        );
    });

    it('moves', () => {
        const segment = new Segment(new Point(0, 50), new Point(50, 75));
        expect(segment.move(10, 10)).toEqual(
            expect.objectContaining({
                p1: expect.objectContaining({
                    x: 10,
                    y: 60,
                }),
                p2: expect.objectContaining({
                    x: 60,
                    y: 85,
                }),
                a: expect.objectContaining({
                    x: 10,
                    y: 60,
                }),
                b: expect.objectContaining({
                    x: 60,
                    y: 85,
                }),
                bounds: expect.objectContaining({
                    x: 10,
                    y: 60,
                }),
            })
        );
    });
});
