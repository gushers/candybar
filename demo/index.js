import Canvas from './modules/Canvas';
import Background from './modules/Background';
import Cursor from './modules/Cursor';
import Pointer from './modules/Pointer';

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background(), new Cursor(10)],
});
