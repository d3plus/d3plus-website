---
title: Stacked Bar Chart
width: 800
height: 400
time: 1612987102986
date: February 10, 2021
---

# Stacked Bar Chart

The rectangles in a bar chart can be stacked on top of each other by simply setting the [.stacked( )](http://d3plus.org/docs/#Plot.stacked) method to `true`:

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];

new d3plus.BarChart()
  .data(data)
  .stacked(true)
  .render();
```
