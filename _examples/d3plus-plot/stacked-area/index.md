---
title: Stacked Area Chart
width: 990
height: 400
time: 1572543720472
date: October 31, 2019
---

# Stacked Area Chart

When constructing data to be used with an [StackedArea](http://d3plus.org/docs/#StackedArea) chart, there must be a unique data point for each point on the discrete axis (defaults to the X axis). Given this data array:

```js
var data = [
  {id: "alpha", x: 4, y:  7},
  {id: "alpha", x: 5, y: 25},
  {id: "alpha", x: 6, y: 13},
  {id: "beta",  x: 4, y: 17},
  {id: "beta",  x: 5, y:  8},
  {id: "beta",  x: 6, y: 13}
];
```

We can create a simple Stacked Area Chart:

```js
new d3plus.StackedArea()
  .data(data)
  .groupBy("id")
  .render();
```
