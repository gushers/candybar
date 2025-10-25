class Velocity {
    vx: number;
    vy: number;

    constructor(vx: number, vy: number) {
        this.vx = vx;
        this.vy = vy;
    }

    flip(): this {
        // reflection on both axis
        this.vx *= -1;
        this.vy *= -1;
        return this;
    }

    flipX(): this {
        // reflection on x axis
        this.vx *= -1;
        return this;
    }

    flipY(): this {
        // reflection on y axis
        this.vy *= -1;
        return this;
    }

    multiply(scalar: number): this {
        this.vx *= scalar;
        this.vy *= scalar;
        return this;
    }

    divide(scalar: number): this {
        this.vx /= scalar;
        this.vy /= scalar;
        return this;
    }
}

export default Velocity;

