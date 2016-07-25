---
title: Getting Started
width: 205
height: 135
---

[width]: 205
[height]: 135

# Getting Started

This module gives the ability to create tooltips in Javascript with no CSS required. It takes an array of [data](https://github.com/d3plus/d3plus-tooltip#tooltip.data) just like most other [D3plus modules](https://github.com/d3plus), and creates a tooltip for each data point.

In this example, and in most use cases, only 1 tooltip is created.

```js
var data = [
  {"title": "D3plus Tooltip", "body": "Check out this cool table:", "x": 100, "y": 120, "label": "Position"}
];

d3plus.tooltip()
  .data(data)
  .thead(["Axis", function(d) { return d.label; }])
  .tbody([
    ["x", function(d) { return d.x; }],
    ["y", function(d) { return d.y; }]
  ])
  ();
```

*Please note the `()` at the end of the chain of commands. This is what tells the [tooltip](https://github.com/d3plus/d3plus-tooltip#tooltip) to finally render to the page, and allows setting multiple properties without it trying to render after each one is set.*
