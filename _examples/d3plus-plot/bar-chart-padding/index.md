---
title: Custom Bar Chart Padding
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Custom Bar Chart Padding

The default values for padding between each group of bars and the bars within a group do not always work with every dataset. Those values can be changed using the [.barPadding( )](http://d3plus.org/docs/#BarChart.barPadding) and [.groupPadding( )](http://d3plus.org/docs/#BarChart.groupPadding) methods.

```js
var data = [
  {id: "alpha",  x: 4, y:  7},
  {id: "alpha",  x: 5, y: 25},
  {id: "alpha",  x: 6, y: 13},
  {id: "alpha",  x: 7, y:  9},
  {id: "beta",   x: 4, y: 17},
  {id: "beta",   x: 5, y:  8},
  {id: "beta",   x: 6, y: 13},
  {id: "beta",   x: 7, y: 10},
  {id: "gamma",  x: 4, y:  5},
  {id: "gamma",  x: 5, y:  0},
  {id: "gamma",  x: 6, y: 10},
  {id: "gamma",  x: 7, y:  9}
];

new d3plus.BarChart()
  .data(data)
  .barPadding(0)
  .groupPadding(40)
  .render();
```
