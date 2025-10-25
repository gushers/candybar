import Bounds from './Bounds';
import Pointer from './Pointer';

interface Entity {
    setup?: (canvas: Canvas) => void;
    resize?: (canvas: Canvas, event?: Event) => void;
    draw?: (canvas: Canvas) => void;
    update?: (canvas: Canvas) => void;
    destroy?: (canvas: Canvas) => void;
    dead?: boolean;
}

interface CanvasConfig {
    canvas: HTMLCanvasElement;
    container?: HTMLElement;
    entities?: Entity[];
    hasPointer?: boolean;
    pauseInBackground?: boolean;
    dpr?: number;
}

class Canvas {
    canvas: HTMLCanvasElement;
    container?: HTMLElement;
    hasPointer?: boolean;
    pauseInBackground?: boolean;
    dpr: number;
    ctx: CanvasRenderingContext2D;
    framesPerSecond: number;
    interval: number;
    startTime: number;
    previousTime: number;
    currentTime: number;
    deltaTime: number;
    tick: number;
    rafId: number | null;
    entities: Entity[];
    containerRect?: DOMRect;
    pointer?: Pointer | false;
    bounds!: Bounds;
    paused?: boolean;

    constructor({
        canvas,
        container,
        entities = [],
        hasPointer,
        pauseInBackground,
        dpr,
    }: CanvasConfig) {
        this.canvas = canvas;
        this.container = container;
        this.hasPointer = hasPointer;
        this.pauseInBackground = pauseInBackground;

        this.dpr = dpr || window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.scale(this.dpr, this.dpr);

        this.framesPerSecond = 60;
        this.interval = Math.floor(1000 / this.framesPerSecond); // rounding down since our code will rarely run at the exact interval
        this.startTime = performance.now();
        this.previousTime = this.startTime;
        this.currentTime = 0;
        this.deltaTime = 0;

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

    setupListeners(): void {
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('load', this.handleResize);

        if (this.pauseInBackground) {
            window.addEventListener('blur', this.stop);
            window.addEventListener('focus', this.start);
        }
    }

    destroy(): void {
        window.removeEventListener('blur', this.stop);
        window.removeEventListener('focus', this.start);
        window.removeEventListener('resize', this.handleResize);

        this.cancelRaf();
        this.entities.forEach(({ destroy }) => {
            destroy && destroy(this);
        });
    }

    setContainerRect(): void {
        if (!this.container) return;
        this.containerRect = this.container.getBoundingClientRect();
    }

    handleResize = (event?: Event): void => {
        this.setCanvasSize();
        this.setPointer();
        this.setContainerRect();
        this.resizeEntities(event);
    };

    setPointer(): void {
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
                dpr: this.dpr,
            });
    }

    setCanvasSize(): void {
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
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.bounds = new Bounds(0, 0, w2, h2);
    }

    setupEntities(): void {
        this.entities.forEach(({ setup }) => {
            setup && setup(this);
        });
    }

    resizeEntities(event?: Event): void {
        this.entities.forEach(({ resize }) => {
            resize && resize(this, event);
        });
    }

    addEntity = (newEntity: Entity): number => {
        this.entities = [...this.entities, newEntity];
        // call setup since this is new
        newEntity.setup && newEntity.setup(this);

        return this.entities.length - 1;
    };

    removeEntity(deleteIndex: number): Entity[] {
        this.entities = this.entities.filter((el, i) => i !== deleteIndex);
        return this.entities;
    }

    removeDead(): void {
        this.entities = this.entities.filter(({ dead = false }) => !dead);
    }

    cancelRaf(): void {
        this.rafId && cancelAnimationFrame(this.rafId);
        this.rafId = null;
    }

    stop = (): void => {
        this.cancelRaf();
        this.paused = true;
    };

    start = (): void => {
        this.cancelRaf();
        this.paused = false;
        this.render();
    };

    clearCanvas({ ctx, bounds }: { ctx: CanvasRenderingContext2D; bounds: Bounds }): void {
        ctx.clearRect(...bounds.params);
    }

    // Main loop
    render = (timestamp?: number): void => {
        this.currentTime = timestamp || 0;
        this.deltaTime = this.currentTime - this.previousTime;

        if (this.deltaTime > this.interval) {
            this.previousTime = this.currentTime - (this.deltaTime % this.interval);

            // Draw and Update items here.
            this.entities.forEach(({ draw, update }) => {
                draw && draw(this);
                update && update(this);
            });

            ++this.tick;
        }

        if (!this.paused) {
            this.rafId = window.requestAnimationFrame(this.render);
        }
    };
}

export default Canvas;

