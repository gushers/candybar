import Canvas from '../src/modules/Canvas';
import Pointer from '../src/modules/Pointer';
import Background from './modules/Background';
import Cursor from './modules/Cursor';

// Kick off
const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
    container: document.getElementById('container'),
    hasPointer: true,
    entities: [new Background(), new Cursor(10)],
});
