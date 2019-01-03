---
title: Simple Priestley Diagram
width: 990
height: 400
time: 1546555779904
date: January 03, 2019
---

# Simple Priestley Diagram

Priestly Timelines (named after 18th-century English theologian [Joseph Priestly](https://en.wikipedia.org/wiki/Joseph_Priestley)), show the duration of multiple data points over time by stacking blocks to best fit. Given data with unique IDs and start and end dates:

```js
var data = [
  {id: "alpha",   start: 2004, end: 2007},
  {id: "epsilon", start: 2007, end: 2012},
  {id: "beta",    start: 2005, end: 2010},
];
```

It's only requires a few lines of code to create a Priestly Timeline:

```js
new d3plus.Priestley()
  .data(data)
  .render();
```
