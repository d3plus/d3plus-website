---
title: Changing the Size of Legend Shapes
width: 990
height: 400
time: 1561482614163
date: June 25, 2019
---

# Changing the Size of Legend Shapes

 To change the sizing of the shapes used in the [Legend](http://d3plus.org/docs/#Legend) class, set the width and height properties of [shapeConfig](http://d3plus.org/docs/#Legend.shapeConfig) via the pass-through [legendConfig](http://d3plus.org/docs/#Viz.legendConfig) method.

 ```js
var myData = [
  {id: "alpha", xAxis: 4, yAxis:  7},
  {id: "alpha", xAxis: 5, yAxis: 25},
  {id: "alpha", xAxis: 6, yAxis: 13},
  {id: "beta",  xAxis: 4, yAxis: 17},
  {id: "beta",  xAxis: 5, yAxis:  8},
  {id: "beta",  xAxis: 6, yAxis: 13}
];

 new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "id",
    legendConfig: {
      shapeConfig: {
        height: 25,
        width: 15
      }
    },
    x: "xAxis",
    y: "yAxis"
  })
  .render();
```