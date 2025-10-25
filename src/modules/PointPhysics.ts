import Point from './Point';

interface PointPhysicsConfig {
    x: number;
    y: number;
    mass: number;
    isFixed?: boolean;
    pointerStrength?: number;
    pointerRadius?: number;
}

interface CanvasContext {
    pointer?: any;
    tick?: number;
}

class PointPhysics extends Point {
    vx: number;
    vy: number;
    fx: number;
    fy: number;
    mass: number;
    isFixed?: boolean;
    pointerRadius: number;
    pointerStrength: number;

    constructor({
        x,
        y,
        mass,
        isFixed,
        pointerStrength = 0.25,
        pointerRadius = 100,
    }: PointPhysicsConfig) {
        super(x, y);
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y
        this.mass = mass;
        this.isFixed = isFixed;

        const DPR = devicePixelRatio || 1;
        this.pointerRadius = pointerRadius * DPR;
        this.pointerStrength = pointerStrength; // 0 - 1
    }

    applyForce(x: number, y: number): void {
        this.fx += x;
        this.fy += y;
    }

    applyForceFromMouse(pointer: any): void {
        const distance = this.distance(pointer.position);

        if (distance < this.pointerRadius) {
            const [dx, dy] = pointer.delta();
            const power =
                (1 - distance / this.pointerRadius) * this.pointerStrength * -1;

            this.applyForce(dx * power, dy * power);
        }
    }

    solveVelocity(): void {
        if (this.fx === 0 && this.fy === 0) return;

        // acceleration = force / mass;
        const ax = this.fx / this.mass;
        const ay = this.fy / this.mass;

        // velocity + acceleration
        this.vx += ax;
        this.vy += ay;

        this.x += this.vx;
        this.y += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;
    }

    update = ({ pointer, tick }: CanvasContext): void => {
        if (this.isFixed) return;
        if (this.pointerRadius && this.pointerStrength && pointer) {
            this.applyForceFromMouse(pointer);
        }
        this.solveVelocity();
    };
}

export default PointPhysics;

