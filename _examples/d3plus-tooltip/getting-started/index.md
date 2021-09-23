---
title: Getting Started
width: 205
height: 135
time: 1632436572820
date: September 23, 2021
---

[width]: 205
[height]: 135

# Getting Started

This module gives the ability to create tooltips in Javascript with no CSS required. It takes an array of [data](https://github.com/d3plus/d3plus-tooltip#Tooltip.data) just like most other [D3plus modules](https://github.com/d3plus), and creates a tooltip for each data point.

In this example, and in the majority of use cases, only 1 tooltip is needed.

```js
var data = [
  {"title": "D3plus Tooltip", "body": "Check out this cool table:", "x": 100, "y": 120, "label": "Position"}
];

new d3plus.Tooltip()
  .data(data)
  .thead(["Axis", function(d) { return d.label; }])
  .tbody([
    ["x", function(d) { return d.x; }],
    ["y", function(d) { return d.y; }]
  ])
  .render();
```
