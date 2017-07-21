---
title: Automatic Font Resizing to Fit Container
width: 450
height: 100
time: 1500677305449
date: July 21, 2017
---

[width]: 450
[height]: 100

# Automatic Font Resizing to Fit Container

A useful method when using text to label variable sized shapes (like in a [tree map](https://github.com/d3plus/d3plus-treemap)) is the [fontResize](https://github.com/d3plus/d3plus-text#textBox.fontResize) function. When set to `true`, the [textBox](https://github.com/d3plus/d3plus-text#textBox) will attempt to scale up or down the [fontSize](https://github.com/d3plus/d3plus-text#textBox.fontSize) value to best fit the containing shape.

```js
var data = [
  {text: "This is a sentence that will not be resized.", resize: false},
  {text: "This is a sentence that will be resized.", resize: true}
];
```

Here, we can compare the output of using [fontResize](https://github.com/d3plus/d3plus-text#textBox.fontResize) against the normal output, given a 200 x 100 rectangle boundary.

```js
new d3plus.TextBox()
  .data(data)
  .fontResize(function(d) { return d.resize; })
  .height(100)
  .width(200)
  .x(function(d, i) { return i * 250; })
  .render();
```

The [fontSize](https://github.com/d3plus/d3plus-text#textBox.fontSize) calculated by this method is constrained by the [fontMin](https://github.com/d3plus/d3plus-text#textBox.fontMin) and [fontMax](https://github.com/d3plus/d3plus-text#textBox.fontMax) values, which default to `8` and `50` respectively.
