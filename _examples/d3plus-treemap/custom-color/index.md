---
title: Using a Custom Color Accessor
width: 990
height: 400
---

# Using a Custom Color Accessor

Let's take our [Getting Started]() example and color the rectangles by their parent groups.

```js
var data = [
  {color: "cornflowerblue", parent: "Group 1", id: "alpha", value: 29},
  {color: "cornflowerblue", parent: "Group 1", id: "beta", value: 10},
  {color: "cornflowerblue", parent: "Group 1", id: "gamma", value: 2},
  {color: "firebrick", parent: "Group 2", id: "delta", value: 29},
  {color: "firebrick", parent: "Group 2", id: "eta", value: 25}
];
```

Given the new `"color"` variable present in each data point, we can tell the [treemap](https://github.com/d3plus/d3plus-text#treemap) generator to use our specific color for each rectangle's [fill](https://github.com/d3plus/d3plus-text#treemap.fill):

```js
d3plus.treemap()
  .data(data)
  .fill(function(d) { return d.color; })
  .groupBy(["parent", "id"])
  ();
```
