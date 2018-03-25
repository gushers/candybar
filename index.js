//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// utils
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function lerp(start, end, amount) {
    return (1 - amount) * start + amount * end;
}

function doBoxesIntersect(a, b) {
    // AABB axis-aligned bounding boxes
    return (
        Math.abs(a.x - b.x) * 2 < a.w + b.w &&
        Math.abs(a.y - b.y) * 2 < a.h + b.h
    );
}

function scaleBetween(initialVal, minAllow, maxAllow, min, max) {
    // scaleBetween(250, -1, 1, 0, 500) => 0
    return (maxAllow - minAllow) * (initialVal - min) / (max - min) + minAllow;
}

function cycle(value, total) {
    return (value % total + total) % total;
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Point
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get position() {
        return [this.x, this.y];
    }

    delta(point) {
        return [this.x - point.x, this.y - point.y];
    }

    distance(point) {
        const dx = point.x - this.x;
        const dy = point.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    movePointAtAngle(point, angle, distance) {
        this.x = point.x + Math.cos(angle) * distance;
        this.y = point.y + Math.sin(angle) * distance;
        return this;
    }

    applyVelocity(velocity) {
        this.x += velocity.vx;
        this.y += velocity.vy;
        return this;
    }

    angleRadians(point) {
        // radians = atan2(deltaY, deltaX)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x);
    }

    angleDeg(point) {
        // degrees = atan2(deltaY, deltaX) * (180 / PI)
        const y = point.y - this.y;
        const x = point.x - this.x;
        return Math.atan2(y, x) * (180 / Math.PI);
    }
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Velocity
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Velocity {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    flip() {
        // reflection on both axis
        this.vx *= -1;
        this.vy *= -1;
        return this;
    }

    flipX() {
        // reflection on x axis
        this.vx *= -1;
        return this;
    }

    flipY() {
        // reflection on y axis
        this.vy *= -1;
        return this;
    }

    multiply(scalar) {
        this.vx *= scalar;
        this.vy *= scalar;
        return this;
    }

    divide(scalar) {
        this.vx /= scalar;
        this.vy /= scalar;
        return this;
    }
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Bounds
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Bounds {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        const hw = w / 2;
        const hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }

    get params() {
        return [this.x, this.y, this.w, this.h];
    }

    offsetOuter(offset) {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x - offset,
            y - offset,
            w + offset * 2,
            h + offset * 2
        );
    }

    offsetInner(offset) {
        const [x, y, w, h] = this.params;
        return new Bounds(
            x + offset,
            y + offset,
            w - offset * 2,
            h - offset * 2
        );
    }
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Element
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Element {
    dpr = window.devicePixelRatio || 1;
    toValue = value => value * this.dpr;
    draw = () => {};
    update = () => {};
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Background extends Element {
    drawText({ ctx, canvas }) {
        const ms = Math.max(canvas.width, canvas.height);
        const size = ms / 15;

        const copy = "Canvas Starter";
        const x = canvas.width / 2;
        const y = canvas.height / 2 + size / 3;
        ctx.font = `700 italic ${size}px futura, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(copy, x, y);
    }

    drawGradient({ ctx, canvas, bounds }) {
        const offset = this.toValue(20);
        const gradientBounds = bounds.offsetInner(offset);
        const gradient = ctx.createLinearGradient(...gradientBounds.params);
        gradient.addColorStop(0, "#4286f4");
        gradient.addColorStop(1, "#5b3dd3");

        ctx.fillStyle = gradient;
        ctx.fillRect(...gradientBounds.params);
    }

    draw = context => {
        this.drawGradient(context);
        this.drawText(context);
    };
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Pointer {
    constructor() {
        this.dpr = window.devicePixelRatio || 1;
        this.position = new Point(0, 0);
        this.addListeners();
    }

    addListeners() {
        ["mousemove", "touchmove"].forEach((event, touch) => {
            window.addEventListener(
                event,
                e => {
                    if (touch) {
                        e.preventDefault();
                        const x = e.targetTouches[0].clientX * this.dpr;
                        const y = e.targetTouches[0].clientY * this.dpr;
                        this.position.moveTo(x, y);
                    } else {
                        const x = e.clientX * this.dpr;
                        const y = e.clientY * this.dpr;
                        this.position.moveTo(x, y);
                    }
                },
                false
            );
        });
    }
}

class Cursor extends Element {
    constructor(radius) {
        super();
        this.radius = this.toValue(radius);
        this.pi2 = Math.PI * 2;
        this.lineWidth = this.toValue(2);
        this.strokeStyle = "#fff";
    }

    draw = ({ ctx, pointer }) => {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(
            pointer.position.x,
            pointer.position.y,
            this.radius,
            0,
            this.pi2,
            true
        );
        ctx.closePath();
        ctx.stroke();
    };
}

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Canvas {
    constructor({ canvas, elements = [] }) {
        // setup a canvas
        this.canvas = canvas;
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext("2d");
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // elements to be drawn on the canvas
        this.elements = elements;

        // track mouse/touch movement
        this.pointer = new Pointer();

        // setup and run
        this.setCanvasSize();
        this.setupListeners();
        this.render();
    }

    setupListeners() {
        window.addEventListener("resize", this.setCanvasSize);
    }

    setCanvasSize = () => {
        const { innerWidth: w, innerHeight: h } = window;
        const w2 = w * this.dpr;
        const h2 = h * this.dpr;
        this.canvas.width = w2;
        this.canvas.height = h2;
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
        this.bounds = new Bounds(0, 0, w2, h2);
    };

    addElement = newElement => {
        this.elements = [...this.elements, newElement];
        return this.elements.length - 1;
    };

    removeElement(deleteIndex) {
        this.elements = this.elements.filter((el, i) => i !== deleteIndex);
        return this.elements;
    }

    removeDead() {
        this.elements = this.elements.filter(({ dead = false }) => !dead);
    }

    render = () => {
        // Main loop

        // Draw and Update items here.
        this.elements.forEach(({ draw, update }) => {
            draw(this);
            update(this);
        });

        // Cleanup "dead" elements
        this.removeDead();

        ++this.tick;
        window.requestAnimationFrame(this.render);
    };
}

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById("canvas"),
    elements: [new Background(), new Cursor(10)],
});
