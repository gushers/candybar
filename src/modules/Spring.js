import Point from './Point';

class Spring extends Point {
    constructor({
        x,
        y,
        isFixed,
        mass = 10,
        elasticity = 0.4,
        damping = 0.05,
    }) {
        super(x, y);
        this.ox = x; // original origin x, never changes
        this.oy = y; // original origin y, never changes
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y

        this.isFixed = isFixed; // indicates whether this point can be moved

        // spring constants
        this.mass = mass;
        this.elasticity = elasticity;
        this.damping = damping;
    }

    applyForce(x, y) {
        this.fx += x;
        this.fy += y;
    }

    attractors = [];

    addAttractor(point) {
        this.attractors = [...this.attractors, point];
    }

    setAdjacentForces() {
        this.attractors.forEach((point, i) => {
            const { x, y } = point;

            const force = { x: 0, y: 0 }; // prev point force
            const { x: x1, y: y1 } = point;
            const { x: x2, y: y2 } = this;

            force.x = x1 - x2;
            force.y = y1 - y2;

            // apply adjacent forces to current spring
            this.applyForce(force.x, force.y);
        });
    }

    setSpringForce() {
        // force to origin, difference multiplied by elasticity constant
        const fx = (this.ox - this.x) * this.elasticity;
        const fy = (this.oy - this.y) * this.elasticity;

        // sum forces
        this.fx += fx;
        this.fy += fy;
    }

    solveVelocity() {
        if (this.fx === 0 && this.fy === 0) return;

        // acceleration = force / mass;
        const ax = this.fx / this.mass;
        const ay = this.fy / this.mass;

        // velocity, apply damping then ad acceleration
        this.vx = this.damping * this.vx + ax;
        this.vy = this.damping * this.vy + ay;

        // add velocity to center and top/left
        this.x += this.vx;
        this.y += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;
    }

    update = ({ pointer }) => {
        if (this.isFixed) return;
        this.setSpringForce();
        this.setAdjacentForces();
        this.solveVelocity();
    };
}

export default Spring;
