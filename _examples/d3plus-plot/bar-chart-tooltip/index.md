---
title: Bar Chart Tooltip Configuration
width: 800
height: 400
time: 1633697936817
date: October 08, 2021
---

# Bar Chart Tooltip Configuration

To show data in a [BarChart](http://d3plus.org/docs/#BarChart) tooltip, use the `tbody` property of the [tooltipConfig](http://d3plus.org/docs/#Viz.tooltipConfig) to define each row in a table as an Array of column values.

By default, the [groupBy](http://d3plus.org/docs/#Viz.groupBy) value is used as the tooltip title. If the BarChart [label](http://d3plus.org/docs/#Viz.label) method is specified, then that label is used as both the tooltip title and the title of the shape. To explicitly set a custom tooltip title, set the `title` property in [tooltipConfig](http://d3plus.org/docs/#Viz.tooltipConfig).

```js
var myData = [
  {"Travel Time": "< 5 Minutes",     "Population Percentage":  2},
  {"Travel Time": "15 - 24 Minutes", "Population Percentage": 30},
  {"Travel Time": "35 - 44 Minutes", "Population Percentage":  7},
  {"Travel Time": "45 - 89 Minutes", "Population Percentage": 11},
  {"Travel Time": "5 - 14 Minutes",  "Population Percentage": 20},
  {"Travel Time": "90+ Minutes",     "Population Percentage":  5},
  {"Travel Time": "25 - 34 Minutes", "Population Percentage": 25}
];

new d3plus.BarChart()
  .config({
    data: myData,
    groupBy: "Travel Time",
    x: "Travel Time",
    y: "Population Percentage",
    tooltipConfig: {
      title: function(d) {
        return "Commute Time: " + d["Travel Time"];
      },
      tbody: [
        ["Percentage", function(d) { return d["Population Percentage"] + "%" }]
      ]
    },
    legend: false
  })
  .render();
```
