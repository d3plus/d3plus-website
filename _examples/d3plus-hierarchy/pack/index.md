---
title: Circle Packing Chart
width: 990
height: 400
time: 1558108412675
date: May 17, 2019
---

# Circle Packing Chart

Given an array of data objects that looks something like this:

```js
var data = [
  {parent: "Group 1", id: "alpha", value: 29},
  {parent: "Group 1", id: "beta", value: 10},
  {parent: "Group 1", id: "gamma", value: 2},
  {parent: "Group 2", id: "delta", value: 29},
  {parent: "Group 2", id: "eta", value: 25}
];
```

Only a few lines of code are needed to transform it into an interactive [Pack](http://d3plus.org/docs/#Pack):

```js
new d3plus.Pack()
  .data(data)
  .groupBy(["parent", "id"])
  .sum("value")
  .render();

```

Colors are assigned to each unique ID using the color [assign](http://d3plus.org/docs/#assign) function, and the bubbles are created using the [Circle](http://d3plus.org/docs/#Circle) class.
