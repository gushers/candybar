import Canvas from '../modules/Canvas';

describe('Canvas class', () => {
    it('constructs', () => {
        const el = document.createElement('canvas');
        el.getContext = jest.fn(() => ({
            scale: jest.fn(),
        })) as any;
        const canvas = new Canvas({ canvas: el });
    });

    it('scales the context based on DPR', () => {
        (global as any).devicePixelRatio = 2;
        const el = document.createElement('canvas');
        el.getContext = (() => ({ scale: jest.fn() })) as any;
        const candy2 = new Canvas({ canvas: el });
        expect(candy2.ctx.scale).toBeCalledWith(2, 2);
        (global as any).devicePixelRatio = 1;
        const candy1 = new Canvas({ canvas: el });
        expect(candy1.ctx.scale).toBeCalledWith(1, 1);
    });

    it('sets the canvas size adjusted for DPR', () => {
        (global as any).devicePixelRatio = 2;
        const el = document.createElement('canvas');
        el.getContext = jest.fn(() => ({ scale: () => {} })) as any;
        const candy = new Canvas({ canvas: el });
        expect(candy.canvas.style.width).toBe('1024px');
        expect(candy.canvas.style.height).toBe('768px');
        expect(candy.canvas.style.position).toBe('absolute');
        expect(candy.canvas.width).toEqual(2048);
        expect(candy.canvas.height).toEqual(1536);
    });
});

