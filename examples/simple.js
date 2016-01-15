"use strict";

const cursor = require('kittik-cursor').Cursor.create().resetTTY();
const Slide = require('../lib/Slide').default;
const shape = require('kittik-shape-rectangle').default.create({
  text: 'Good news, everybody!',
  x: 'center',
  background: 'white',
  width: '50%'
});

new Slide({
  direction: 'inDown',
  easing: 'outBounce',
  duration: 3000
}).on('tick', shape => shape.render(cursor) && cursor.flush().eraseScreen()).animate(shape);
