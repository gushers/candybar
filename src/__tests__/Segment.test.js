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
});
