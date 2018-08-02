import Canvas from '../src/modules/Canvas';
import Background from '../src/modules/Background';
import Cursor from '../src/modules/Cursor';
import Pointer from '../src/modules/Pointer';

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    container: document.getElementById('container'),
    pointer: new Pointer(),
    entities: [new Background(), new Cursor(10)],
});
