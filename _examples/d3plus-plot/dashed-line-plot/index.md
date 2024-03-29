---
title: Dashed Line Plot
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Dashed Line Plot

You can set dash size for a line in a [LinePlot](http://d3plus.org/docs/#LinePlot) by setting the `Line.strokeDasharray` property inside [.shapeConfig( )](http://d3plus.org/docs/#Viz.shapeConfig) to a string of number:

```js
var myData = [
  {fruit: "cherry", price: 7,  year: 2014},
  {fruit: "cherry", price: 9,  year: 2015},
  {fruit: "cherry", price: 5,  year: 2016},
  {fruit: "cherry", price: 10, year: 2017},
  {fruit: "cherry", price: 12, year: 2018}
];

new d3plus.LinePlot()
  .config({
    data: myData,
    groupBy: "fruit",
    x: "year",
    y: "price",
    shapeConfig: {
      Line: {
        strokeDasharray: "10"
      }
    }
  })
  .render();
```
