---
title: Line Plot Custom Color
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Line Plot Custom Color

You can set custom colors for each line in a [LinePlot](http://d3plus.org/docs/#LinePlot) by setting the `Line.stroke` property inside [.shapeConfig( )](http://d3plus.org/docs/#Viz.shapeConfig):

```js
var myData = [
  {fruit: "apple",  price: 5,  year: 2014},
  {fruit: "banana", price: 4,  year: 2014},
  {fruit: "cherry", price: 7,  year: 2014},
  {fruit: "apple",  price: 7,  year: 2015},
  {fruit: "banana", price: 6,  year: 2015},
  {fruit: "cherry", price: 9,  year: 2015},
  {fruit: "apple",  price: 10, year: 2016},
  {fruit: "banana", price: 8,  year: 2016},
  {fruit: "cherry", price: 5,  year: 2016},
  {fruit: "apple",  price: 6,  year: 2017},
  {fruit: "banana", price: 10, year: 2017},
  {fruit: "cherry", price: 10, year: 2017},
  {fruit: "apple",  price: 8,  year: 2018},
  {fruit: "banana", price: 15, year: 2018},
  {fruit: "cherry", price: 12, year: 2018}
];

// define colors as needed
function assignColor(d) {
  if (d === "apple") return "green";
  if (d === "banana") return "goldenrod";
  if (d === "cherry") return "red";
  return "grey";
}

new d3plus.LinePlot()
  .config({
    data: myData,
    groupBy: "fruit",
    x: "year",
    y: "price",
    shapeConfig: {
      Line: {
        stroke: function(d) {
          return assignColor(d.fruit);
        }
      }
    }
  })
  .render();
```
