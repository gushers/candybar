import Stick from '../modules/Stick';
import Point from '../modules/Point';

describe('Stick class', () => {
    it('constructs', () => {
        const stick = new Stick({
            p1: new Point(1, 0),
            p2: new Point(100, 200),
            iterations: 2,
        });
    });
});
