/*
  d3plus-plot v0.2.0
  A reusable javascript x/y plot built on D3.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-shape'), require('d3-selection'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3plus-common', 'd3-array', 'd3-collection', 'd3-scale', 'd3-shape', 'd3-selection', 'd3plus-axis', 'd3plus-color', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Array,global.d3Collection,global.scales,global.d3Shape,global.d3Selection,global.d3plusAxis,global.d3plusColor,global.shapes,global.d3plusViz));
}(this, (function (exports,d3plusCommon,d3Array,d3Collection,scales,d3Shape,d3Selection,d3plusAxis,d3plusColor,shapes,d3plusViz) { 'use strict';

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
    @desc Creates an x/y plot based on an array of data.
*/
var Plot = (function (Viz) {
  function Plot() {
    var this$1 = this;


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
        fill: d3plusCommon.constant("none"),
        label: false,
        stroke: function (d, i) { return d3plusColor.assign(this$1._id(d, i)); },
        strokeWidth: d3plusCommon.constant(1)
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
      Extends the render behavior of the abstract Viz class.
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
          opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
          parent = this._select,
          that = this,
          transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    var domains, stackData, stackKeys;
    if (this._stacked) {

      stackKeys = Array.from(new Set(data.map(function (d) { return d.id; })));
      stackData = d3Shape.stack()
        .keys(stackKeys)
        .value(function (group, key) { return group.filter(function (d) { return d.id === key; })[0][opp]; })
        (d3Collection.nest().key(function (d) { return d[this$1._discrete]; }).entries(data).map(function (d) { return d.values; }));

      domains = {};
      domains[this._discrete] = d3Array.extent(data, function (d) { return d[this$1._discrete]; });
      domains[opp] = [d3Array.min(stackData.map(function (g) { return d3Array.min(g.map(function (p) { return p[1]; })); })), d3Array.max(stackData.map(function (g) { return d3Array.max(g.map(function (p) { return p[1]; })); }))];

    }
    else domains = {x: d3Array.extent(data, function (d) { return d.x; }), y: d3Array.extent(data, function (d) { return d.y; })};

    var xDomain = this._xDomain ? this._xDomain.slice() : domains.x;
    if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
    if (xDomain[1] === void 0) xDomain[1] = domains.x[1];
    var yDomain = this._yDomain ? this._yDomain.slice() : domains.y;
    if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
    if (yDomain[1] === void 0) yDomain[1] = domains.y[1];
    domains = {x: xDomain, y: yDomain};

    if (opp && this._baseline !== void 0) {
      var b = this._baseline;
      if (domains[opp][0] > b) domains[opp][0] = b;
      else if (domains[opp][1] < b) domains[opp][1] = b;
    }

    var x = scales.scaleLinear().domain(domains.x).range([0, width]),
        y = scales.scaleLinear().domain(domains.y.reverse()).range([0, height]);

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
      .ticks(this._discrete === "y" ? Array.from(new Set(data.map(function (d) { return d.y; }))) : undefined)
      .width(width)
      .config(this._yConfig)
      .render();

    var xOffset = this._yTest.outerBounds().width + this._yTest.padding();

    this._xTest
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(d3plusCommon.elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}).node())
      .ticks(this._discrete === "x" ? Array.from(new Set(data.map(function (d) { return d.x; }))) : undefined)
      .width(width)
      .config(this._xConfig)
      .render();

    this._xAxis
      .domain(x.domain())
      .height(height)
      .range([xOffset, undefined])
      .select(d3plusCommon.elem("g.d3plus-plot-x-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
      .ticks(this._discrete === "x" ? Array.from(new Set(data.map(function (d) { return d.x; }))) : undefined)
      .width(width)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._yAxis
      .domain(y.domain())
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .select(d3plusCommon.elem("g.d3plus-plot-y-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
      .ticks(this._discrete === "y" ? Array.from(new Set(data.map(function (d) { return d.y; }))) : undefined)
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

    var positions = {
      x0: this._discrete === "x" ? shapeConfig.x : x(0),
      x1: this._discrete === "x" ? null : shapeConfig.x,
      y0: this._discrete === "y" ? shapeConfig.y : y(0),
      y1: this._discrete === "y" ? null : shapeConfig.y
    };

    if (this._stacked) {
      positions[(opp + "0")] = function (d, i) { return (opp === "x" ? x : y)(stackData[stackKeys.indexOf(d.id)][i][0]); };
      positions[(opp + "1")] = function (d, i) { return (opp === "x" ? x : y)(stackData[stackKeys.indexOf(d.id)][i][1]); };
    }

    shapeConfig = Object.assign(shapeConfig, positions);

    function mouseEvent(d) {
      if (d.nested && d.values) {
        var axis = that._discrete,
              cursor = d3Selection.mouse(that._select.node())[axis === "x" ? 0 : 1],
              values = d.values.map(function (d) { return shapeConfig[axis](d); });
        d = d.values[values.indexOf(d3plusCommon.closest(cursor, values))];
      }
      return this(d.data, d.i);
    }

    var events = Object.keys(this._on);
    shapeData.forEach(function (d) {

      var s = new shapes[d.key]().config(shapeConfig).data(d.values);
      var classEvents = events.filter(function (e) { return e.includes(("." + (d.key))); }),
            globalEvents = events.filter(function (e) { return !e.includes("."); }),
            shapeEvents = events.filter(function (e) { return e.includes(".shape"); });
      for (var e = 0; e < globalEvents.length; e++) s.on(globalEvents[e], mouseEvent.bind(this$1._on[globalEvents[e]]));
      for (var e$1 = 0; e$1 < shapeEvents.length; e$1++) s.on(shapeEvents[e$1], mouseEvent.bind(this$1._on[shapeEvents[e$1]]));
      for (var e$2 = 0; e$2 < classEvents.length; e$2++) s.on(classEvents[e$2], mouseEvent.bind(this$1._on[classEvents[e$2]]));
      s.config(this$1._shapeConfig[d.key] || {}).render();
      this$1._shapes.push(s);

    });

    return this;

  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the baseline for the x/y plot and returns the current class instance. If *value* is not specified, returns the current baseline.
      @param {Number} [*value*]
  */
  Plot.prototype.baseline = function baseline (_) {
    return arguments.length ? (this._baseline = _, this) : this._baseline;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.
      @param {Boolean} [*value* = false]
  */
  Plot.prototype.stacked = function stacked (_) {
    return arguments.length ? (this._stacked = _, this) : this._stacked;
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
      @desc If *value* is specified, sets the x domain to the specified array and returns the current class instance. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  Plot.prototype.xDomain = function xDomain (_) {
    return arguments.length ? (this._xDomain = _, this) : this._xDomain;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  Plot.prototype.y = function y (_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  Plot.prototype.yDomain = function yDomain (_) {
    return arguments.length ? (this._yDomain = _, this) : this._yDomain;
  };

  return Plot;
}(d3plusViz.Viz));

/**
    @class Area
    @extends Plot
    @desc Creates an area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Area")
  .xDomain([0, undefined])
*/
var Area = (function (Plot) {
  function Area() {

    Plot.call(this);
    this.discrete("x");
    this._shape = d3plusCommon.constant("Area");

  }

  if ( Plot ) Area.__proto__ = Plot;
  Area.prototype = Object.create( Plot && Plot.prototype );
  Area.prototype.constructor = Area;

  /**
      @memberof Area
      @desc If *value* is specified, sets the discrete axis to the specified method name and returns the current class instance. If *value* is not specified, returns the current discrete axis.
      @param {String} [*value*]
  */
  Area.prototype.discrete = function discrete (_) {
    if (arguments.length) {
      this._discrete = _;
      this._baseline = 0;
      return this;
    }
    return this._discrete;
  };

  return Area;
}(Plot));

/**
    @class LinePlot
    @extends Plot
    @desc Creates a line plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
*/
var LinePlot = (function (Plot) {
  function LinePlot() {

    Plot.call(this);
    this._discrete = "x";
    this._shape = d3plusCommon.constant("Line");

  }

  if ( Plot ) LinePlot.__proto__ = Plot;
  LinePlot.prototype = Object.create( Plot && Plot.prototype );
  LinePlot.prototype.constructor = LinePlot;

  return LinePlot;
}(Plot));

/**
    @class StackedArea
    @extends Area
    @desc Creates a stacked area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Area()
  .stacked(true)
*/
var StackedArea = (function (Area) {
  function StackedArea() {

    Area.call(this);
    this._stacked = true;

  }

  if ( Area ) StackedArea.__proto__ = Area;
  StackedArea.prototype = Object.create( Area && Area.prototype );
  StackedArea.prototype.constructor = StackedArea;

  return StackedArea;
}(Area));

exports.Area = Area;
exports.LinePlot = LinePlot;
exports.Plot = Plot;
exports.StackedArea = StackedArea;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-plot.js.map
