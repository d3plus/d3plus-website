---
title: Simple Tree Map
width: 990
height: 400
time: 1537193935409
date: September 17, 2018
---

# Simple Tree Map

Creating a tree map using d3plus is super simple. Given an array of data objects that looks something like this:

```js
var data = [
  {parent: "Group 1", id: "alpha", value: 29},
  {parent: "Group 1", id: "beta", value: 10},
  {parent: "Group 1", id: "gamma", value: 2},
  {parent: "Group 2", id: "delta", value: 29},
  {parent: "Group 2", id: "eta", value: 25}
];
```

Only a few lines of code are needed to transform it into an interactive [TreeMap](http://d3plus.org/docs/#Treemap):

```js
new d3plus.Treemap()
  .data(data)
  .groupBy(["parent", "id"])
  .sum("value")
  .render();
```

Colors are assigned to each unique ID using the color [assign](http://d3plus.org/docs/#assign) function, and the rectangles are created using the [Rect](http://d3plus.org/docs/#Rect) class.
