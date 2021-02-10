---
title: Simple Matrix
width: 800
height: 400
time: 1612991309462
date: February 10, 2021
---

# Simple Matrix

The [Matrix](http://d3plus.org/docs/#Matrix) class creates a simple rows/columns Matrix view of any dataset. You are required to set the [row](http://d3plus.org/docs/#Matrix.row) and [column](http://d3plus.org/docs/#Matrix.column) methods, as well as provide a unique index for each square using the [groupBy](http://d3plus.org/docs/#Viz.groupBy) method.

Everything else uses the same color and label methods as in other visualizations, such as the use of [colorScale](http://d3plus.org/docs/#Viz.colorScale) here to create a heatmap, and the use of the [rowConfig](http://d3plus.org/docs/#Matrix.rowConfig) and [columnConfig](http://d3plus.org/docs/#Matrix.columnConfig) methods, which are pass-throughs to the underling [Axis](http://d3plus.org/docs/#Axis) class displaying each corresponding set of labels.

```js
new d3plus.Matrix()
  .config({
    colorScale: "Trade Value",
    colorScaleConfig: {
      legendConfig: {
        title: "Trade Value"
      },
      scale: "jenks"
    },
    colorScalePosition: "right",
    column: "Importer Continent",
    columnConfig: {
      title: "Importer Continent"
    },
    data: "https://api.oec.world/tesseract/data.jsonrecords?cube=trade_i_baci_a_17&drilldowns=Year,Exporter+Continent,Importer+Continent&measures=Trade+Value&Year=2018",
    groupBy: ["Exporter Continent", "Importer Continent"],
    row: "Exporter Continent",
    rowConfig: {
      title: "Exporter Continent"
    },
    title: "Continent to Continent Product Trade",
    titleConfig: {
      fontSize: 20
    },
    tooltipConfig: {
      tbody: [
        ["Trade Value", function(d) { return Math.round(d["Trade Value"]) }]
      ]
    }
  })
  .render();
```
