---
title: Tooltip Following Mouse
width: 400
height: 400
time: 1612298800181
date: February 02, 2021
---

[width]: 400
[height]: 400

# Tooltip Following Mouse

In this example, the tooltip follows the mouse. It demonstrates the behavior of the tooltip at different positions on the screen, especially near the edges. Move your mouse around the black box to test out the behavior!

```css
body {
  background-color: #444;
}
```

```js
var tip = new d3plus.Tooltip()
    .data([{title: "Test Tooltip"}])
    .position([window.innerWidth / 2, window.innerHeight / 2])
    .render();

  window.addEventListener("mousemove", function(e) {
    tip
      .position([e.pageX, e.pageY])
      .render();
  });
```
