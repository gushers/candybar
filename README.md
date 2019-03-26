# Candybar 🍫 [![Build Status](https://travis-ci.org/gushers/candybar.svg?branch=master)](https://travis-ci.org/gushers/candybar)

A simple `<canvas>` rendering engine and collection of classes and utils. And by "engine" I mean about as advanced as a broken scooter 🛴 on fire 🔥

🚨 **This is an alpha release**

_Really, don't use this thing for anything yet._

## Getting started

First, install it

```
yarn add @gush/candybar
```

then create a canvas

```javascript
import { Canvas } from '@gush/candybar';

const canvas = new Canvas({
    canvas: document.getElementById('canvas'),
});
```

which will leave you with a beautiful blank canvas. 🙌🏻

## Canvas options

Canvas classes can be created with a few options:

- `canvas`
- `container`
- `hasPointer`
- `entities`
- `pauseInBackground`

```javascript
new Canvas({
    // This is the required HTML element that the Canvas class will render to.
    canvas: document.getElementById('canvas'),
    // Container is the element that the canvas should be fit within,
    // if this is not provided it's assumed this is a full screen canvas
    container: document.getElementById('container'),
    // Indicates if the canvas should capture mouse/touch pointer events.
    hasPointer: true,
    // Indicates if the engine should pause when the window is not in focus
    pauseInBackground: true,
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

    setup = ({ canvas }) => {
        // setup will be called once before the first draw and is provided the class context
        this.w = canvas.width / 10;
        window.addEventListener('resize', handleResize);
    };

    destroy = () => {
        // called when destroy is called on the Canvas
        window.removeEventListener('resize', handleResize);
    };

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

    resize = (context, event) => {
        // handle resize events.
        this.w = context.canvas.width / 10;
    };
}
```
