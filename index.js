import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';

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

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), new Cursor(10)],
});
