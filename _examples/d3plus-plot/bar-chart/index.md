---
title: Bar Chart
width: 990
height: 400
time: 1581093035486
date: February 07, 2020
---

# Bar Chart

When constructing data to be used with the [BarChart](http://d3plus.org/docs/#BarChart) class, there must be a unique data point for each bar. Given this data array:

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

We can create a simple Bar Chart using the default accessors:

```js
new d3plus.BarChart()
  .data(data)
  .render();
```
