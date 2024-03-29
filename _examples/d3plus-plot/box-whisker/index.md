---
title: Box and Whisker Chart
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Box and Whisker Chart

In descriptive statistics, a box and whisker plot is a method for graphically depicting groups of numerical data through their quartiles and outliers.

The [BoxWhisker](http://d3plus.org/docs/#BoxWhisker) class defaults to being vertical. For the vertical box, we have to specify the x-axis to be the id and y-axis to be the value. We also need to group data by id and value in order to render the Box and Whisker correctly.

```js
var data = [
  {id: "alpha", value: 300},
  {id: "alpha", value: 20},
  {id: "alpha", value: 180},
  {id: "alpha", value: 40},
  {id: "alpha", value: 170},
  {id: "alpha", value: 125},
  {id: "alpha", value: 74},
  {id: "alpha", value: 80},
  {id: "beta", value: 180},
  {id: "beta", value: 30},
  {id: "beta", value: 120},
  {id: "beta", value: 50},
  {id: "beta", value: 140},
  {id: "beta", value: 115},
  {id: "beta", value: 14},
  {id: "beta", value: 30},
];
```

We can create a simple Box and Whisker Chart:

```js
new d3plus.BoxWhisker()
  .data(data)
  .groupBy(["id", "value"])
  .x("id")
  .y("value")
  .render();
```