import Spring from '../modules/Spring';
import Point from '../modules/Point';

describe('Spring class', () => {
    it('constructs', () => {
        const spring = new Spring({
            x: 100,
            y: 150,
            isFixed: false,
            mass: 10,
            elasticity: 0.4,
            damping: 0.05,
        });
    });
});
