import Canvas from '../modules/Canvas';

describe('Canvas class', () => {
    it('constructs', () => {
        const el = document.createElement('canvas');
        el.getContext = jest.fn(() => ({
            scale: jest.fn(),
        }));
        const canvas = new Canvas({ canvas: el });
    });

    it('scales the context based on DPR', () => {
        global.devicePixelRatio = 2;
        const el = document.createElement('canvas');
        el.getContext = () => ({ scale: jest.fn() });
        const candy2 = new Canvas({ canvas: el });
        expect(candy2.ctx.scale).toBeCalledWith(2, 2);
        global.devicePixelRatio = 1;
        const candy1 = new Canvas({ canvas: el });
        expect(candy1.ctx.scale).toBeCalledWith(1, 1);
    });

    it('sets the canvas size adjusted for DPR', () => {
        global.devicePixelRatio = 2;
        const el = document.createElement('canvas');
        el.getContext = jest.fn(() => ({ scale: () => {} }));
        const candy = new Canvas({ canvas: el });
        expect(candy.canvas.style).toEqual(
            expect.objectContaining({
                width: '1024px',
                height: '768px',
                position: 'absolute',
                top: '0px',
                left: '0px',
            })
        );
        expect(candy.canvas.width).toEqual(2048);
        expect(candy.canvas.height).toEqual(1536);
    });
});
