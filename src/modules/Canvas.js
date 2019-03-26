import Bounds from './Bounds';
import Pointer from './Pointer';

class Canvas {
    constructor({
        canvas,
        container,
        entities = [],
        hasPointer,
        pauseInBackground,
    }) {
        this.canvas = canvas;
        this.container = container;
        this.hasPointer = hasPointer;
        this.pauseInBackground = pauseInBackground;

        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // request animation frame id
        this.rafId = null;

        // entities to be drawn on the canvas
        this.entities = entities;

        // setup and run
        this.setCanvasSize();
        this.setContainerRect();
        this.setPointer();
        this.setupListeners();

        this.setupEntities();
        this.render();
    }

    setupListeners() {
        window.addEventListener('resize', this.handleResize);

        if (this.pauseInBackground) {
            window.addEventListener('blur', this.stop);
            window.addEventListener('focus', this.start);
        }
    }

    destroy() {
        window.removeEventListener('blur', this.stop);
        window.removeEventListener('focus', this.start);
        window.removeEventListener('resize', this.handleResize);

        this.entities.forEach(({ destroy }) => {
            destroy && destroy(this);
        });
    }

    setContainerRect() {
        if (!this.container) return;
        this.containerRect = this.container.getBoundingClientRect();
    }

    handleResize = event => {
        this.setCanvasSize();
        this.setPointer();
        this.setContainerRect();
        this.resizeEntities(event);
    };

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

    setupEntities() {
        this.entities.forEach(({ setup }) => {
            setup && setup(this);
        });
    }

    resizeEntities(event) {
        this.entities.forEach(({ resize }) => {
            resize && resize(this, event);
        });
    }

    addEntity = newEntity => {
        this.entities = [...this.entities, newEntity];
        // call setup since this is new
        newEntity.setup && newEntity.setup(this);

        return this.entities.length - 1;
    };

    removeEntity(deleteIndex) {
        this.entities = this.entities.filter((el, i) => i !== deleteIndex);
        return this.entities;
    }

    removeDead() {
        this.entities = this.entities.filter(({ dead = false }) => !dead);
    }

    cancelRaf() {
        this.rafId && cancelAnimationFrame(this.rafId);
        this.rafId = null;
    }

    stop = () => {
        this.cancelRaf();
        this.paused = true;
    };

    start = () => {
        this.cancelRaf();
        this.paused = false;
        this.render();
    };

    clearCanvas({ ctx, bounds }) {
        ctx.clearRect(...bounds.params);
    }

    // Main loop
    render = () => {
        // Draw and Update items here.
        this.entities.forEach(({ draw, update }) => {
            draw && draw(this);
            update && update(this);
        });

        ++this.tick;

        if (!this.paused) {
            this.rafId = window.requestAnimationFrame(this.render);
        }
    };
}

export default Canvas;
