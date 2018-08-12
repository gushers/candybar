import Canvas from '../modules/Canvas';

describe('Canvas class', () => {
    it('constructs', () => {
        const el = document.createElement('canvas');
        el.getContext = jest.fn(() => ({
            scale: jest.fn(),
        }));
        const canvas = new Canvas({ canvas: el });
    });
});
