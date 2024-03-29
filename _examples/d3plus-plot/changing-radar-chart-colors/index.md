---
title: Changing Radar Chart Colors
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Changing Radar Chart Colors

A custom accessor function can be passed to the `fill` property of [shapeConfig](http://d3plus.org/docs/#Shape.fill) in order to set specific colors of a [Radar](http://d3plus.org/docs/#Radar) chart. 

```js
var myData = [
  {Geography: "Midwest",   sport: "Soccer",   total: 20},
  {Geography: "West",      sport: "Soccer",   total: 10},
  {Geography: "Southwest", sport: "Soccer",   total: 20},
  {Geography: "Southeast", sport: "Soccer",   total: 20},
  {Geography: "Northeast", sport: "Soccer",   total: 20},
  {Geography: "Midwest",   sport: "Baseball", total: 15},
  {Geography: "West",      sport: "Baseball", total: 21},
  {Geography: "Southwest", sport: "Baseball", total: 10},
  {Geography: "Southeast", sport: "Baseball", total: 15},
  {Geography: "Northeast", sport: "Baseball", total: 12}
];

var COLORS_SPORTS = {
  "Soccer": "green",
  "Baseball": "orange"
};

new d3plus.Radar()
  .config({
    data: myData,
    groupBy: "sport",
    metric: "Geography",
    value: "total",
    shapeConfig: {
      fill: function(d) {
        return COLORS_SPORTS[d.sport];
      }
    }
  })
  .render();
```
