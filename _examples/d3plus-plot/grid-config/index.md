---
title: Changing Grid Styles
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Changing Grid Styles

The [.xConfig( )](http://d3plus.org/docs/#Plot.xConfig) and [.yConfig( )](http://d3plus.org/docs/#Plot.yConfig) methods allow access to the display styles for the axis bar, the grid lines, and the shape ticks.

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "beta",  x: 5, y:  2},
  {id: "gamma", x: 6, y: 13}
];

new d3plus.Plot()
  .data(data)
  .groupBy("id")
  .xConfig({
    gridConfig:  {stroke: "#000"}
  })
  .yConfig({
    barConfig:   {stroke: "red"},
    gridConfig:  {stroke: "transparent"},
    shapeConfig: {stroke: "red"}
  })
  .y2Config({
    barConfig:   {stroke: "red"}
  })
  .render();
```
