import Point from './Point';

interface PointerConfig {
    containerRect?: DOMRect;
    scrollPosition?: {
        scrollX: number;
        scrollY: number;
    };
    dpr?: number;
}

class Pointer {
    containerRect?: DOMRect;
    scrollPosition?: {
        scrollX: number;
        scrollY: number;
    };
    dpr: number;
    lastPosition: Point | null;
    position: Point;
    modifier?: any;

    constructor({ containerRect, scrollPosition, dpr }: PointerConfig) {
        // cached getBoundingRect call
        this.containerRect = containerRect;
        // cached position from when the rect is got
        this.scrollPosition = scrollPosition;

        this.dpr = dpr || window.devicePixelRatio || 1;
        this.lastPosition = null;
        this.position = new Point(0, 0);
        this.addListeners();
    }

    delta(): [number, number] {
        if (!this.lastPosition) {
            return [0, 0];
        }
        return this.position.delta(this.lastPosition);
    }

    addListeners(): void {
        ['mousemove', 'touchmove'].forEach((event, touch) => {
            window.addEventListener(
                event,
                (e: Event) => {
                    // move previous point
                    const { x: px, y: py } = this.position;

                    // disable the demo modifier if it's been added
                    if (this.modifier) {
                        this.modifier = null;
                    }

                    // gets touch if avail else normal mouse event
                    let x = 0;
                    let y = 0;
                    if (touch) {
                        const touchEvent = e as TouchEvent;
                        touchEvent.preventDefault();
                        x = touchEvent.targetTouches[0].clientX * this.dpr;
                        y = touchEvent.targetTouches[0].clientY * this.dpr;
                    } else {
                        const mouseEvent = e as MouseEvent;
                        x = mouseEvent.clientX * this.dpr;
                        y = mouseEvent.clientY * this.dpr;
                    }

                    // set new last position
                    if (!this.lastPosition) {
                        this.lastPosition = new Point(x, y);
                    } else {
                        this.lastPosition.moveTo(px, py);
                    }

                    // apply offsets if the pointer is in a container
                    if (this.containerRect && this.scrollPosition) {
                        const { left: offX, top: offY } = this.containerRect;
                        const { scrollX, scrollY } = this.scrollPosition;

                        // account for current and cached scroll positions
                        const sx = window.pageXOffset - scrollX;
                        const sy = window.pageYOffset - scrollY;

                        // apply element offset from viewport
                        x = x - offX * this.dpr;
                        y = y - offY * this.dpr;

                        // apply page scroll offset
                        x = x + sx * this.dpr;
                        y = y + sy * this.dpr;
                    }

                    // set the final positon
                    this.position.moveTo(x, y);
                },
                false
            );
        });
    }
}

export default Pointer;

