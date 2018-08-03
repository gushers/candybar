# Candybar 🍫

A simple, `<canvas>` rendering engine. And by "engine" I mean about as advanced as a broken scooter 🛴

🚨 **This is an alpha release**

_Really, don't use this thing for anything yet._

## Getting started

Install it, duh.

```
yarn add @gush/candybar
```

Then create a canvas.

```javascript
import { Canvas } from '@gush/candybar';

const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
});
```

This will create a beautiful blank canvas. 🙌🏻

## Canvas options

Canvas classes can be created with a few options:

- `canvas`
- `container`
- `hasPointer`
- `entities`

```javascript
new Canvas({
    // This is the required HTML element that the Canvas class will render to.
    canvas: document.getElementById('canvas'),
    // Container is the element that the canvas should be fit within,
    // if this is not provided it's assumed this is a full screen canvas
    container: document.getElementById('container'),
    // Indicates if the canvas should capture mouse/touch pointer events.
    hasPointer: true,
    // Entities are objects that will be renedered by the Canvas engine.
    entities: [...things],
});
```

## Entities

The engine will loop through each entity and call a couple methods to "render" the entity. First a `draw()` method is called where you should do any drawing using the HTML canvas API. Then an `update()` method is called which should be used to update any properties based on the engine.

```javascript
class MyThing {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    draw = ({ ctx }) => {
        // draw with canvas API through the provided context
        ctx.fillRect(this.x, this.y, 100, 100);
    };

    update = ({ pointer }) => {
        // update the rect position based on pointer position
        const { x, y } = this.pointer.position;
        this.x = x;
        this.y = y;
    };
}
```
