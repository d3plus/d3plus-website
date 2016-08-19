/*
  d3plus-plot v0.1.1
  A reusable plot built on D3
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3plus-axis'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3plus-axis', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Collection,global.scales,global.d3plusAxis,global.d3plusCommon,global.shapes,global.d3plusViz));
}(this, (function (exports,d3Array,d3Collection,scales,d3plusAxis,d3plusCommon,shapes,d3plusViz) { 'use strict';

function CircleBuffer(data, x, y, config) {

  var xD = x.domain().slice(),
        xR = x.range(),
        yD = y.domain().slice(),
        yR = y.range();

  data.forEach(function (d) {
    var r = config.r(d.data, d.i);
    if (x(d.x) - xR[0] < r * 2) {
      var v = x.invert(x(d.x) - r * 2);
      if (v < xD[0]) xD[0] = v;
    }
    if (xR[1] - x(d.x) < r * 2) {
      var v$1 = x.invert(x(d.x) + r * 2);
      if (v$1 > xD[1]) xD[1] = v$1;
    }
    if (y(d.y) - yR[0] < r * 2) {
      var v$2 = y.invert(y(d.y) - r * 2);
      if (v$2 > yD[0]) yD[0] = v$2;
    }
    if (yR[1] - y(d.y) < r * 2) {
      var v$3 = y.invert(y(d.y) + r * 2);
      if (v$3 < yD[1]) yD[1] = v$3;
    }
  });

  x.domain(xD);
  y.domain(yD);

  return [x, y];

}

function RectBuffer(data, x, y, config) {

  var xD = x.domain().slice(),
        xR = x.range(),
        yD = y.domain().slice(),
        yR = y.range();

  data.forEach(function (d) {
    var h = config.height(d.data, d.i),
          w = config.width(d.data, d.i);
    if (x(d.x) - xR[0] < w) {
      var v = x.invert(x(d.x) - w);
      if (v < xD[0]) xD[0] = v;
    }
    if (xR[1] - x(d.x) < w) {
      var v$1 = x.invert(x(d.x) + w);
      if (v$1 > xD[1]) xD[1] = v$1;
    }
    if (y(d.y) - yR[0] < h) {
      var v$2 = y.invert(y(d.y) - h);
      if (v$2 > yD[0]) yD[0] = v$2;
    }
    if (yR[1] - y(d.y) < h) {
      var v$3 = y.invert(y(d.y) + h);
      if (v$3 < yD[1]) yD[1] = v$3;
    }
  });

  x.domain(xD);
  y.domain(yD);

  return [x, y];

}

/**
    @class Plot
    @extends Viz
    @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
var Plot = (function (Viz) {
  function Plot() {

    Viz.call(this);
    this._buffer = {
      Circle: CircleBuffer,
      Rect: RectBuffer
    };
    this._shape = d3plusCommon.constant("Circle");
    this._shapeConfig = Object.assign(this._shapeConfig, {
      Circle: {
        r: d3plusCommon.constant(5)
      },
      Line: {
        label: false
      },
      Rect: {
        height: d3plusCommon.constant(10),
        width: d3plusCommon.constant(10)
      }
    });
    this._x = d3plusCommon.accessor("x");
    this._xAxis = new d3plusAxis.AxisBottom().align("end");
    this._xTest = new d3plusAxis.AxisBottom().align("end").gridSize(0);
    this._xConfig = {
      title: "X Axis"
    };
    this._y = d3plusCommon.accessor("y");
    this._yAxis = new d3plusAxis.AxisLeft().align("start");
    this._yTest = new d3plusAxis.AxisLeft().align("start").gridSize(0);
    this._yConfig = {
      title: "Y Axis"
    };

  }

  if ( Viz ) Plot.__proto__ = Viz;
  Plot.prototype = Object.create( Viz && Viz.prototype );
  Plot.prototype.constructor = Plot;

  /**
      The inner return object and draw function that gets assigned the public methods.
      @private
  */
  Plot.prototype.render = function render (callback) {
    var this$1 = this;


    Viz.prototype.render.call(this, callback);

    var data = this._filteredData.map(function (d, i) { return ({
            data: d,
            i: i,
            id: this$1._id(d, i),
            shape: this$1._shape(d, i),
            x: this$1._x(d, i),
            y: this$1._y(d, i)
          }); }),
          height = this._height - this._margin.top - this._margin.bottom,
          parent = this._select,
          transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    var x = scales.scaleLinear().domain(d3Array.extent(data, function (d) { return d.x; })).range([0, width]),
        y = scales.scaleLinear().domain(d3Array.extent(data, function (d) { return d.y; }).reverse()).range([0, height]);

    var shapeData = d3Collection.nest().key(function (d) { return d.shape; }).entries(data);
    shapeData.forEach(function (d) {
      if (this$1._buffer[d.key]) {
        var res = this$1._buffer[d.key](d.values, x, y, this$1._shapeConfig[d.key]);
        x = res[0];
        y = res[1];
      }
    });

    this._yTest
      .domain(y.domain())
      .height(height)
      .select(d3plusCommon.elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .width(width)
      .config(this._yConfig)
      .render();

    var xOffset = this._yTest.outerBounds().width + this._yTest.padding();

    this._xTest
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(d3plusCommon.elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .width(width)
      .config(this._xConfig)
      .render();

    this._xAxis
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(d3plusCommon.elem("g.d3plus-plot-x-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
      .width(width)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._yAxis
      .domain(y.domain())
      .height(height)
      .range([this._xAxis.outerBounds().y, height - this._xTest.outerBounds().height])
      .select(d3plusCommon.elem("g.d3plus-plot-y-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
      .width(x.range()[1] + this._xAxis.padding())
      .config(this._yConfig)
      .render();

    y = this._yAxis._d3Scale;

    var shapeConfig = {
      duration: this._duration,
      fill: function (d) { return this$1._shapeConfig.fill(d.data, d.i); },
      label: function (d) { return this$1._drawLabel(d.data, d.i); },
      opacity: function (d) { return this$1._shapeConfig.opacity(d.data, d.i); },
      select: d3plusCommon.elem("g.d3plus-plot-shapes", {parent: parent, transition: transition}).node(),
      stroke: function (d) { return this$1._shapeConfig.stroke(d.data, d.i); },
      strokeWidth: function (d) { return this$1._shapeConfig.strokeWidth(d.data, d.i); },
      x: function (d) { return x(d.x); },
      y: function (d) { return y(d.y); }
    };

    var events = Object.keys(this._on);
    shapeData.forEach(function (d) {

      var s = new shapes[d.key]().config(shapeConfig).data(d.values);
      var classEvents = events.filter(function (e) { return e.includes(("." + (d.key))); }),
            globalEvents = events.filter(function (e) { return !e.includes("."); }),
            shapeEvents = events.filter(function (e) { return e.includes(".shape"); });
      var loop = function ( e ) {
        s.on(globalEvents[e], function (d) { return this$1._on[globalEvents[e]](d.data, d.i); });
      };

      for (var e = 0; e < globalEvents.length; e++) loop( e );
      var loop$1 = function ( e ) {
        s.on(shapeEvents[e], function (d) { return this$1._on[shapeEvents[e]](d.data, d.i); });
      };

      for (var e$1 = 0; e$1 < shapeEvents.length; e$1++) loop$1( e$1 );
      var loop$2 = function ( e ) {
        s.on(classEvents[e], function (d) { return this$1._on[classEvents[e]](d.data, d.i); });
      };

      for (var e$2 = 0; e$2 < classEvents.length; e$2++) loop$2( e$2 );
      s.config(this$1._shapeConfig[d.key] || {}).render();
      this$1._shapes.push(s);

    });

    return this;

  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
  */
  Plot.prototype.x = function x (_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  Plot.prototype.y = function y (_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
  };

  return Plot;
}(d3plusViz.Viz));

exports.Plot = Plot;

Object.defineProperty(exports, '__esModule', { value: true });

})));