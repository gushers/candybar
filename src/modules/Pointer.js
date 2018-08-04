import Point from './Point';

class Pointer {
    constructor({ containerRect, scrollPosition }) {
        // cached getBoundingRect call
        this.containerRect = containerRect;
        // cached position from when the rect is got
        this.scrollPosition = scrollPosition;

        this.dpr = window.devicePixelRatio || 1;
        this.delta;
        this.lastPosition = null;
        this.position = new Point(null, null);
        this.addListeners();
    }

    delta() {
        return this.position.delta(this.lastPosition);
    }

    addListeners() {
        ['mousemove', 'touchmove'].forEach((event, touch) => {
            window.addEventListener(
                event,
                e => {
                    // move previous point
                    const { x: px, y: py } = this.position;

                    // disable the demo modifier if it's been added
                    if (this.modifier) {
                        this.modifier = null;
                    }

                    // gets touch if avail else normal mouse event
                    let x = null;
                    let y = null;
                    if (touch) {
                        e.preventDefault();
                        x = e.targetTouches[0].clientX * this.dpr;
                        y = e.targetTouches[0].clientY * this.dpr;
                    } else {
                        x = e.clientX * this.dpr;
                        y = e.clientY * this.dpr;
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
                        x -= offX;
                        y -= offY;

                        // apply page scroll offset
                        x += sx;
                        y += sy;
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
