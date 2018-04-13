---
title: Tooltip Anchored to an HTML Element
width: 400
height: 400
time: 1523630847908
date: April 13, 2018
---

[width]: 400
[height]: 400

# Tooltip Anchored to an HTML Element

The [`.position( )` method](https://d3plus.org/docs/#Tooltip.position) in the [Tooltip class](https://github.com/d3plus/d3plus-tooltip) accepts an array of two numbers representing x and y values (in [x, y] format), an accessor function that returns an array of two numbers, or an HTML element used as an anchor point.

```html
<div id="square"></div>
```

```css
#square {
  background-color: red;
  height: 25px;
  width: 25px;
  position: absolute;
  left: 50%;
  top: 50%;
}
```

```js
var square = document.getElementById("square");

var tip = new d3plus.Tooltip()
  .data([{title: "Test Tooltip"}])
  .position(square)
  .render();
```