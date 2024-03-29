---
title: Box and Whisker Chart with Outliers
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Box and Whisker Chart with Outliers

If a data value is very far away from the quartiles (either much less than Q1 or much greater than Q3), it is designated as an outlier. Instead of being shown using the whiskers of the [BoxWhisker](http://d3plus.org/docs/#BoxWhisker), outliers are shown as separately plotted points.

```js
var myData = [
  {id: "alpha", value: 840},
  {id: "alpha", value: 940},
  {id: "alpha", value: 780},
  {id: "alpha", value: 650},
  {id: "alpha", value: 720},
  {id: "alpha", value: 430},
  {id: "alpha", value: 1850},
  {id: "alpha", value: 300},
  {id: "alpha", value: 360},
  {id: "alpha", value: 1690},
  {id: "alpha", value: 690},
  {id: "alpha", value: -950},
  {id: "alpha", value: -600},
  {id: "alpha", value: -850},
  {id: "beta", value: 980},
  {id: "beta", value: 300},
  {id: "beta", value: 120},
  {id: "beta", value: 500},
  {id: "beta", value: 140},
  {id: "beta", value: 115},
  {id: "beta", value: 14},
  {id: "beta", value: -30},
  {id: "beta", value: -1050},
  {id: "beta", value: -100},
  {id: "beta", value: -800},
  {id: "beta", value: -1100},
];

new d3plus.BoxWhisker()
  .config({
    data: myData,
    groupBy: ["id", "value"],
    x: "id",
    y: "value",
    legend: false
  })
  .render();
```