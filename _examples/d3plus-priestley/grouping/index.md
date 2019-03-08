---
title: Grouping Priestley Bars into Lanes
width: 990
height: 400
time: 1552065087645
date: March 08, 2019
---

# Grouping Priestley Bars into Lanes

If the data provided has inherent groupings, as such:

```js
var data = [
  {parent: "Group 1", id: "alpha",   start: 2004, end: 2007},
  {parent: "Group 2", id: "epsilon", start: 2007, end: 2012},
  {parent: "Group 1", id: "beta",    start: 2005, end: 2010},
  {parent: "Group 1", id: "gamma",   start: 2008, end: 2013},
  {parent: "Group 2", id: "delta",   start: 2004, end: 2007}
];
```

The Priestley Timeline can be grouped into "lanes" by providing a custom [.groupBy( )](https://github.com/d3plus/d3plus-viz#Viz.groupBy) method. Additionally, these lanes become more apparent when [providing colors](https://github.com/d3plus/d3plus-shape#Shape.fill) based on the parent grouping:

```js
new d3plus.Priestley()
  .data(data)
  .groupBy(["parent", "id"])
  .shapeConfig({
    fill: function(d) {
      return d.parent === "Group 1" ? "firebrick" : "cornflowerblue";
    }
  })
  .render();
```
