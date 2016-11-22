/*
  d3plus v2.0.0-alpha.3
  Data visualization made easy. A javascript library that extends the popular D3.js to enable fast and beautiful visualizations.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-geomap'), require('d3plus-hierarchy'), require('d3plus-legend'), require('d3plus-plot'), require('d3plus-priestley'), require('d3plus-shape'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus', ['exports', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-geomap', 'd3plus-hierarchy', 'd3plus-legend', 'd3plus-plot', 'd3plus-priestley', 'd3plus-shape', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip', 'd3plus-viz'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.d3plusGeomap,global.d3plusHierarchy,global.d3plusLegend,global.d3plusPlot,global.d3plusPriestley,global.d3plusShape,global.d3plusText,global.d3plusTimeline,global.d3plusTooltip,global.d3plusViz));
}(this, (function (exports,d3plusAxis,d3plusColor,d3plusCommon,d3plusGeomap,d3plusHierarchy,d3plusLegend,d3plusPlot,d3plusPriestley,d3plusShape,d3plusText,d3plusTimeline,d3plusTooltip,d3plusViz) { 'use strict';

var version = "2.0.0-alpha.3";

exports.version = version;
exports.Axis = d3plusAxis.Axis;
exports.AxisBottom = d3plusAxis.AxisBottom;
exports.AxisLeft = d3plusAxis.AxisLeft;
exports.AxisRight = d3plusAxis.AxisRight;
exports.AxisTop = d3plusAxis.AxisTop;
exports.date = d3plusAxis.date;
exports.colorAdd = d3plusColor.add;
exports.colorAssign = d3plusColor.assign;
exports.colorContrast = d3plusColor.contrast;
exports.colorDefaults = d3plusColor.defaults;
exports.colorLegible = d3plusColor.legible;
exports.colorLighter = d3plusColor.lighter;
exports.colorSubtract = d3plusColor.subtract;
exports.accessor = d3plusCommon.accessor;
exports.assign = d3plusCommon.assign;
exports.attrize = d3plusCommon.attrize;
exports.BaseClass = d3plusCommon.BaseClass;
exports.closest = d3plusCommon.closest;
exports.constant = d3plusCommon.constant;
exports.elem = d3plusCommon.elem;
exports.isObject = d3plusCommon.isObject;
exports.locale = d3plusCommon.locale;
exports.merge = d3plusCommon.merge;
exports.prefix = d3plusCommon.prefix;
exports.stylize = d3plusCommon.stylize;
exports.Geomap = d3plusGeomap.Geomap;
exports.Donut = d3plusHierarchy.Donut;
exports.Pie = d3plusHierarchy.Pie;
exports.Tree = d3plusHierarchy.Tree;
exports.Treemap = d3plusHierarchy.Treemap;
exports.Legend = d3plusLegend.Legend;
exports.AreaPlot = d3plusPlot.AreaPlot;
exports.LinePlot = d3plusPlot.LinePlot;
exports.Plot = d3plusPlot.Plot;
exports.StackedArea = d3plusPlot.StackedArea;
exports.Priestley = d3plusPriestley.Priestley;
exports.Area = d3plusShape.Area;
exports.Circle = d3plusShape.Circle;
exports.Image = d3plusShape.Image;
exports.Line = d3plusShape.Line;
exports.Path = d3plusShape.Path;
exports.pointDistance = d3plusShape.pointDistance;
exports.Rect = d3plusShape.Rect;
exports.Shape = d3plusShape.Shape;
exports.stringify = d3plusText.stringify;
exports.strip = d3plusText.strip;
exports.TextBox = d3plusText.TextBox;
exports.textSplit = d3plusText.textSplit;
exports.textWidth = d3plusText.textWidth;
exports.textWrap = d3plusText.textWrap;
exports.titleCase = d3plusText.titleCase;
exports.Timeline = d3plusTimeline.Timeline;
exports.Tooltip = d3plusTooltip.Tooltip;
exports.Viz = d3plusViz.Viz;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus.js.map
