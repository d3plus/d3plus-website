---
title: Pie Chart
width: 990
height: 400
time: 1566485661046
date: August 22, 2019
---

# Pie Chart

When constructing data to be used with the [Pie](http://d3plus.org/docs/#Pie) class, there must be a unique data point for each sector. Given this data array:

```js
var myData = [
  {"Race": "White Health Center Patients", "Population Percentage": 40},
  {"Race": "Black Health Center Patients", "Population Percentage": 20},
  {"Race": "Hispanic Health Center Patients", "Population Percentage": 25},
  {"Race": "Asian Health Center Patients", "Population Percentage": 10},
  {"Race": "American Indian Health Center Patients", "Population Percentage": 5}
];
```
We can create a simple Pie Chart:

```js
new d3plus.Pie()
  .config({
    data: myData,
    groupBy: "Race",
    value: function(d) {
      return d["Population Percentage"];
    }
  })
  .render();
```
