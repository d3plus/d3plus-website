---
title: Radial Matrix
width: 800
height: 400
time: 1605886792081
date: November 20, 2020
---

# Radial Matrix

The [Radial Matrix](http://d3plus.org/docs/#RadialMatrix) class creates a radial layout of any rows/columns data matrix. You are required to set the [row](http://d3plus.org/docs/#Matrix.row) and [column](http://d3plus.org/docs/#Matrix.column) methods, as well as provide a unique index for each square using the [groupBy](http://d3plus.org/docs/#Viz.groupBy) method.

Everything else uses the same color and label methods as in other visualizations, such as the use of [colorScale](http://d3plus.org/docs/#Viz.colorScale) here to create a heatmap.

```js
new d3plus.RadialMatrix()
  .config({
      colorScale: "Trade Value",
      colorScaleConfig: {
        legendConfig: {
          title: "Trade Value"
        },
        scale: "jenks"
      },
      colorScalePosition: "left",
      column: "Importer Continent",
      data: "https://api.oec.world/tesseract/data.jsonrecords?cube=trade_i_baci_a_17&drilldowns=Year,Exporter+Continent,Importer+Continent&measures=Trade+Value&Year=2018",
      groupBy: ["Exporter Continent", "Importer Continent"],
      row: "Exporter Continent",
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
