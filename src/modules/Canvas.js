import Bounds from './Bounds';
import Pointer from './Pointer';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Canvas {
    constructor({ canvas, container, entities = [], hasPointer }) {
        this.canvas = canvas;
        this.container = container;
        this.hasPointer = hasPointer;

        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // entities to be drawn on the canvas
        this.entities = entities;

        // setup and run
        this.setCanvasSize();
        this.setContainerRect();
        this.setPointer();
        this.setupListeners();
        this.render();
    }

    setupListeners() {
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.setPointer();
            this.setContainerRect();
        });
    }

    setContainerRect() {
        if (!this.container) return;
        this.containerRect = this.container.getBoundingClientRect();
    }

    setPointer() {
        // track mouse/touch movement
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;
        this.pointer =
            this.hasPointer &&
            new Pointer({
                containerRect: this.containerRect,
                scrollPosition: {
                    scrollX,
                    scrollY,
                },
            });
    }

    setCanvasSize() {
        let { innerWidth: w, innerHeight: h } = window;

        // sized to the container if available
        if (this.container) {
            w = this.container.clientWidth;
            h = this.container.clientHeight;
        }

        // otherwise, fullscreen
        const w2 = w * this.dpr;
        const h2 = h * this.dpr;
        this.canvas.width = w2;
        this.canvas.height = h2;
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.bounds = new Bounds(0, 0, w2, h2);
    }

    addEntity = newEntity => {
        this.entities = [...this.entities, newEntity];
        return this.entities.length - 1;
    };

    removeEntity(deleteIndex) {
        this.entities = this.entities.filter((el, i) => i !== deleteIndex);
        return this.entities;
    }

    removeDead() {
        this.entities = this.entities.filter(({ dead = false }) => !dead);
    }

    stop() {
        this.paused = true;
    }

    start() {
        this.paused = false;
        this.render();
    }

    // Main loop
    render = () => {
        // Draw and Update items here.
        this.entities.forEach(({ draw, update }) => {
            draw(this);
            update(this);
        });

        ++this.tick;

        !this.paused && window.requestAnimationFrame(this.render);
    };
}

export default Canvas;
