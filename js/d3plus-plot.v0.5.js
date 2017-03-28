/*
  d3plus-plot v0.5.14
  A reusable javascript x/y plot built on D3.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-shape'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-shape'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3plus-common', 'd3-array', 'd3-collection', 'd3-scale', 'd3-shape', 'd3plus-axis', 'd3plus-color', 'd3plus-shape', 'd3plus-viz'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Array,global.d3Collection,global.scales,global.d3Shape,global.d3plusAxis,global.d3plusColor,global.shapes,global.d3plusViz));
}(this, (function (exports,d3plusCommon,d3Array,d3Collection,scales,d3Shape,d3plusAxis,d3plusColor,shapes,d3plusViz) { 'use strict';

var ordinalBuffer = function(domain) {

  if (domain.includes("d3plus-buffer-start")) { return domain; }

  var newDomain = ["d3plus-buffer-start"];
  domain.forEach(function (b) {
    newDomain.push(b);
    newDomain.push(("d3plus-buffer-" + b));
  });

  return newDomain;

};

var BarBuffer = function(data, x, y) {
  var this$1 = this;


  var oppScale = this._discrete === "x" ? y : x;

  var oppDomain = oppScale.domain().slice();

  if (this._discrete === "x") { oppDomain.reverse(); }

  var vals = data.map(function (d) { return d[this$1._discrete === "x" ? "y" : "x"]; });
  var b = oppScale.invert(oppScale(d3Array.max(vals)) + (this._discrete === "x" ? -10 : 10));

  if (b > oppDomain[1]) { oppDomain[1] = b; }

  if (this._discrete === "x") { oppDomain.reverse(); }

  oppScale.domain(oppDomain);

  var discreteScale = this._discrete === "x" ? x : y;
  discreteScale.domain(ordinalBuffer(discreteScale.domain()));

  return [x, y];

};

var CircleBuffer = function(data, x, y, config) {

  var xD = x.domain().slice(),
      yD = y.domain().slice();

  var xR = x.range(),
        yR = y.range();

  if (!x.invert) { xD = ordinalBuffer(xD); }
  if (!y.invert) { yD = ordinalBuffer(yD); }

  data.forEach(function (d) {

    var s = config.r(d.data, d.i) * 2;

    if (x.invert && x(d.x) - xR[0] < s) {
      var v = x.invert(x(d.x) - s);
      if (v < xD[0]) { xD[0] = v; }
    }
    if (x.invert && xR[1] - x(d.x) < s) {
      var v$1 = x.invert(x(d.x) + s);
      if (v$1 > xD[1]) { xD[1] = v$1; }
    }

    if (y.invert && y(d.y) - yR[0] < s) {
      var v$2 = y.invert(y(d.y) - s);
      if (v$2 > yD[0]) { yD[0] = v$2; }
    }
    if (y.invert && yR[1] - y(d.y) < s) {
      var v$3 = y.invert(y(d.y) + s);
      if (v$3 < yD[1]) { yD[1] = v$3; }
    }

  });

  x.domain(xD).range(xR);
  y.domain(yD).range(yR);

  return [x, y];

};

var RectBuffer = function(data, x, y, config) {

  var xD = x.domain().slice(),
      yD = y.domain().slice();

  var xR = x.range(),
        yR = y.range();

  if (!x.invert) { xD = ordinalBuffer(xD); }
  if (!y.invert) { yD = ordinalBuffer(yD); }

  data.forEach(function (d) {

    var h = config.height(d.data, d.i),
          w = config.width(d.data, d.i);

    if (x.invert && x(d.x) - xR[0] < w) {
      var v = x.invert(x(d.x) - w);
      if (v < xD[0]) { xD[0] = v; }
    }
    if (x.invert && xR[1] - x(d.x) < w) {
      var v$1 = x.invert(x(d.x) + w);
      if (v$1 > xD[1]) { xD[1] = v$1; }
    }

    if (y.invert && y(d.y) - yR[0] < h) {
      var v$2 = y.invert(y(d.y) - h);
      if (v$2 > yD[0]) { yD[0] = v$2; }
    }
    if (y.invert && yR[1] - y(d.y) < h) {
      var v$3 = y.invert(y(d.y) + h);
      if (v$3 < yD[1]) { yD[1] = v$3; }
    }

  });

  x.domain(xD);
  y.domain(yD);

  return [x, y];

};

var LineBuffer = function(data, x, y) {
  var this$1 = this;


  var s = this._discrete === "x" ? y : x;

  var d = s.domain().slice();

  if (this._discrete === "x") { d.reverse(); }

  var vals = data.map(function (d) { return d[this$1._discrete === "x" ? "y" : "x"]; });
  var b = s.invert(s(d3Array.max(vals)) + (this._discrete === "x" ? -10 : 10));

  if (b > d[1]) { d[1] = b; }

  if (this._discrete === "x") { d.reverse(); }

  s.domain(d);

  return [x, y];

};

/**
    @class Plot
    @extends Viz
    @desc Creates an x/y plot based on an array of data.
*/
var Plot = (function (Viz$$1) {
  function Plot() {
    var this$1 = this;


    Viz$$1.call(this);
    this._barPadding = 5;
    this._buffer = {
      Bar: BarBuffer,
      Circle: CircleBuffer,
      Line: LineBuffer,
      Rect: RectBuffer
    };
    this._groupPadding = 20;
    this._shape = d3plusCommon.constant("Circle");
    this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
      Area: {
        fontResize: true,
        label: function (d, i) { return this$1._stacked ? this$1._drawLabel(d, i) : false; }
      },
      Bar: {
        labelConfig: {
          textAnchor: function () { return this$1._discrete === "x" ? "middle" : "end"; },
          verticalAlign: function () { return this$1._discrete === "x" ? "top" : "middle"; }
        }
      },
      Circle: {
        r: d3plusCommon.constant(5)
      },
      Line: {
        fill: d3plusCommon.constant("none"),
        label: false,
        stroke: function (d, i) { return d3plusColor.colorAssign(this$1._id(d, i)); },
        strokeWidth: d3plusCommon.constant(1)
      },
      Rect: {
        height: d3plusCommon.constant(10),
        width: d3plusCommon.constant(10)
      }
    });
    this._stackOffset = d3Shape.stackOffsetNone;
    this._stackOrder = d3Shape.stackOrderNone;
    this._x = d3plusCommon.accessor("x");
    this._xAxis = new d3plusAxis.AxisBottom().align("end");
    this._x2Axis = new d3plusAxis.AxisTop().align("start");
    this._xTest = new d3plusAxis.AxisBottom().align("end").gridSize(0);
    this._xConfig = {
      title: "X Axis"
    };
    this._x2Config = {};
    this._y = d3plusCommon.accessor("y");
    this._yAxis = new d3plusAxis.AxisLeft().align("start");
    this._y2Axis = new d3plusAxis.AxisRight().align("end");
    this._yTest = new d3plusAxis.AxisLeft().align("start").gridSize(0);
    this._yConfig = {
      gridConfig: {
        stroke: function (d) {
          var domain = this$1._yAxis.domain();
          return domain[domain.length - 1] === d.id ? "transparent" : "#ccc";
        }
      },
      title: "Y Axis"
    };
    this._y2Config = {};

  }

  if ( Viz$$1 ) Plot.__proto__ = Viz$$1;
  Plot.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Plot.prototype.constructor = Plot;

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  Plot.prototype._draw = function _draw (callback) {
    var this$1 = this;


    Viz$$1.prototype._draw.call(this, callback);

    if (!this._filteredData.length) { return this; }

    var stackGroup = function (d, i) { return this$1._stacked
                ? ("" + (this$1._groupBy.length > 1 ? this$1._ids(d, i).slice(0, -1).join("_") : "group"))
                : ("" + (this$1._ids(d, i).join("_"))); };

    var data = this._filteredData.map(function (d, i) { return ({
      __d3plus__: true,
      data: d,
      group: stackGroup(d, i),
      i: i,
      id: this$1._ids(d, i).slice(0, this$1._drawDepth + 1).join("_"),
      shape: this$1._shape(d, i),
      x: this$1._x(d, i),
      y: this$1._y(d, i)
    }); });

    var height = this._height - this._margin.top - this._margin.bottom,
          opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
          parent = this._select,
          transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    var xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
          yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (xTime) { d.x = d3plusAxis.date(d.x); }
      if (yTime) { d.y = d3plusAxis.date(d.y); }
      d.discrete = d.shape === "Bar" ? ((d[this$1._discrete]) + "_" + (d.group)) : ("" + (d[this$1._discrete]));
    }

    var discreteKeys, domains, stackData, stackKeys;
    if (this._stacked) {

      var groupValues = d3Collection.nest()
        .key(function (d) { return d.group; })
        .entries(data)
        .reduce(function (obj, d) {
          if (!obj[d.key]) { obj[d.key] = 0; }
          obj[d.key] += d3Array.sum(d.values, function (dd) { return dd[opp]; });
          return obj;
        }, {});

      data = data.sort(function (a, b) {
        var a1 = a[this$1._discrete], b1 = b[this$1._discrete];
        if (a1 - b1 !== 0) { return a1 - b1; }
        if (a.group !== b.group) { return groupValues[b.group] - groupValues[a.group]; }
        return b[opp] - a[opp];
      });

      discreteKeys = Array.from(new Set(data.map(function (d) { return d.discrete; })));
      stackKeys = Array.from(new Set(data.map(function (d) { return d.id; })));

      stackData = d3Collection.nest()
        .key(function (d) { return d.discrete; })
        .entries(data)
        .map(function (d) { return d.values; });

      stackData.forEach(function (g) {
        var ids = Array.from(new Set(g.map(function (d) { return d.id; })));
        if (ids.length < stackKeys.length) {
          stackKeys.forEach(function (k) {
            if (!ids.includes(k)) {
              var d = data.filter(function (d) { return d.id === k; })[0];
              if (d.shape === "Area") {
                var group = stackGroup(d.data, d.i);
                var fillerPoint = {
                  __d3plus__: true,
                  data: d.data,
                  discrete: d.shape === "Bar" ? ((g[0][this$1._discrete]) + "_" + group) : ("" + (g[0][this$1._discrete])),
                  group: group,
                  id: k,
                  shape: d.shape
                };
                fillerPoint[this$1._discrete] = g[0][this$1._discrete];
                fillerPoint[opp] = 0;
                data.push(fillerPoint);
              }
            }
          });
        }
      });

      data.sort(function (a, b) { return a[this$1._discrete] - b[this$1._discrete]; });

      stackData = d3Shape.stack()
        .keys(stackKeys)
        .offset(this._stackOffset)
        .order(this._stackOrder)
        .value(function (group, key) {
          var d = group.filter(function (g) { return g.id === key; });
          return d.length ? d[0][opp] : 0;
        })(stackData);

      domains = {};
      domains[this._discrete] = d3Array.extent(data, function (d) { return d[this$1._discrete]; });
      domains[opp] = [d3Array.min(stackData.map(function (g) { return d3Array.min(g.map(function (p) { return p[1]; })); })), d3Array.max(stackData.map(function (g) { return d3Array.max(g.map(function (p) { return p[1]; })); }))];

    }
    else { domains = {x: d3Array.extent(data, function (d) { return d.x; }), y: d3Array.extent(data, function (d) { return d.y; })}; }

    var xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
        xScale = "Linear";

    if (xDomain[0] === void 0) { xDomain[0] = domains.x[0]; }
    if (xDomain[1] === void 0) { xDomain[1] = domains.x[1]; }

    if (xTime) {
      xDomain = xDomain.map(d3plusAxis.date);
      xScale = "Time";
    }
    else if (this._discrete === "x") {
      xDomain = Array.from(new Set(data.sort(function (a, b) { return this$1._xSort ? this$1._xSort(a.data, b.data) : a.x - b.x; }).map(function (d) { return d.x; })));
      xScale = "Ordinal";
    }

    var yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
        yScale = "Linear";

    if (yDomain[0] === void 0) { yDomain[0] = domains.y[0]; }
    if (yDomain[1] === void 0) { yDomain[1] = domains.y[1]; }

    if (yTime) {
      yDomain = yDomain.map(d3plusAxis.date);
      yScale = "Time";
    }
    else if (this._discrete === "y") {
      yDomain = Array.from(new Set(data.sort(function (a, b) { return this$1._ySort ? this$1._ySort(a.data, b.data) : a.y - b.y; }).map(function (d) { return d.y; })));
      yScale = "Ordinal";
    }

    domains = {x: xDomain, y: yDomain};

    if (opp && this._baseline !== void 0) {
      var b = this._baseline;
      if (domains[opp][0] > b) { domains[opp][0] = b; }
      else if (domains[opp][1] < b) { domains[opp][1] = b; }
    }

    var x = scales[("scale" + xScale)]().domain(domains.x).range(d3Array.range(0, width + 1, width / (domains.x.length - 1))),
        y = scales[("scale" + yScale)]().domain(domains.y.reverse()).range(d3Array.range(0, height + 1, height / (domains.y.length - 1)));

    var shapeData = d3Collection.nest().key(function (d) { return d.shape; }).entries(data);
    shapeData.forEach(function (d) {
      if (this$1._buffer[d.key]) {
        var res = this$1._buffer[d.key].bind(this$1)(d.values, x, y, this$1._shapeConfig[d.key]);
        x = res[0];
        y = res[1];
      }
    });
    xDomain = x.domain();
    yDomain = y.domain();

    var testGroup = d3plusCommon.elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}),
          xTicks = this._discrete === "x" && !xTime ? domains.x : undefined,
          yTicks = this._discrete === "y" && !yTime ? domains.y : undefined;

    var yC = {
      barConfig: {"stroke-width": !this._discrete || this._discrete === "y" ? 1 : 0},
      gridConfig: {"stroke-width": !this._discrete || this._discrete === "x" ? 1 : 0},
      shapeConfig: {stroke: this._discrete ? "transparent" : this._yTest.barConfig().stroke}
    };

    this._yTest
      .domain(yDomain)
      .height(height)
      .scale(yScale.toLowerCase())
      .select(testGroup.node())
      .ticks(yTicks)
      .width(width)
      .config(yC)
      .config(this._yConfig)
      .render();

    var yBounds = this._yTest.outerBounds();
    var xOffset = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

    var xC = {
      barConfig: {"stroke-width": !this._discrete || this._discrete === "x" ? 1 : 0},
      gridConfig: {"stroke-width": !this._discrete || this._discrete === "y" ? 1 : 0},
      shapeConfig: {stroke: this._discrete ? "transparent" : this._xTest.barConfig().stroke}
    };

    this._xTest
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(testGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .config(this._xConfig)
      .render();

    var xGroup = d3plusCommon.elem("g.d3plus-plot-x-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}});

    this._xAxis
      .domain(xDomain)
      .height(height)
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(xGroup.node())
      .ticks(xTicks)
      .width(width)
      .config(xC)
      .config(this._xConfig)
      .render();

    x = this._xAxis._d3Scale;

    this._x2Axis
      .config(xC)
      .domain(xDomain)
      .gridSize(0)
      .height(height)
      .labels([])
      .range([xOffset, undefined])
      .scale(xScale.toLowerCase())
      .select(xGroup.node())
      .ticks([])
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._xAxis.barConfig()["stroke-width"]})
      .config(this._x2Config)
      .render();

    var yGroup = d3plusCommon.elem("g.d3plus-plot-y-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}});

    this._yAxis
      .domain(yDomain)
      .height(height)
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yScale.toLowerCase())
      .select(yGroup.node())
      .ticks(yTicks)
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .config(yC)
      .config(this._yConfig)
      .render();

    this._y2Axis
      .config(yC)
      .domain(yDomain)
      .gridSize(0)
      .height(height)
      .labels([])
      .range([this._xAxis.outerBounds().y, this._xTest.outerBounds().y])
      .scale(yScale.toLowerCase())
      .select(yGroup.node())
      .ticks([])
      .width(x.range()[x.range().length - 1] + this._xAxis.padding())
      .title(false)
      .tickSize(0)
      .barConfig({"stroke-width": this._discrete ? 0 : this._yAxis.barConfig()["stroke-width"]})
      .config(this._y2Config)
      .render();

    y = this._yAxis._d3Scale;

    var shapeConfig = {
      duration: this._duration,
      label: function (d) { return this$1._drawLabel(d.data, d.i); },
      select: d3plusCommon.elem("g.d3plus-plot-shapes", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node(),
      x: function (d) { return x(d.x); },
      y: function (d) { return y(d.y); }
    };

    function wrapConfig(config) {
      var obj = {};
      var loop = function ( k ) {
        if ({}.hasOwnProperty.call(config, k) && !shapes[k]) {
          obj[k] = typeof config[k] === "function" ? function (d) { return config[k](d.data, d.i); } : config[k];
        }
      };

      for (var k in config) loop( k );
      return obj;
    }

    shapeConfig = d3plusCommon.assign(shapeConfig, wrapConfig(this._shapeConfig));

    var positions = {
      x0: this._discrete === "x" ? shapeConfig.x : x(0),
      x1: this._discrete === "x" ? null : shapeConfig.x,
      y0: this._discrete === "y" ? shapeConfig.y : y(0),
      y1: this._discrete === "y" ? null : shapeConfig.y
    };

    if (this._stacked) {
      var scale = opp === "x" ? x : y;
      positions[("" + opp)] = positions[(opp + "0")] = function (d) {
        var dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(0);
      };
      positions[(opp + "1")] = function (d) {
        var dataIndex = stackKeys.indexOf(d.id),
              discreteIndex = discreteKeys.indexOf(d.discrete);
        return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(0);
      };
    }

    shapeConfig = d3plusCommon.assign(shapeConfig, positions);

    var events = Object.keys(this._on);
    shapeData.forEach(function (d) {

      var s = new shapes[d.key]().config(shapeConfig).data(d.values);

      if (d.key === "Bar") {

        var space;
        var scale = this$1._discrete === "x" ? x : y;
        var vals = scale.domain().filter(function (d) { return typeof d !== "string" || d.indexOf("d3plus-buffer-") < 0; });
        var range$$1 = scale.range();
        if (vals.length > 1) { space = scale(vals[1]) - scale(vals[0]); }
        else { space = range$$1[range$$1.length - 1] - range$$1[0]; }
        space -= this$1._groupPadding;

        var barSize = space;

        var groups = d3Collection.nest()
          .key(function (d) { return d[this$1._discrete]; })
          .key(function (d) { return d.group; })
          .entries(d.values);

        var ids = d3Array.merge(groups.map(function (d) { return d.values.map(function (v) { return v.key; }); }));
        var uniqueIds = Array.from(new Set(ids));

        if (d3Array.max(groups.map(function (d) { return d.values.length; })) === 1) {
          s[this$1._discrete](function (d, i) { return shapeConfig[this$1._discrete](d, i); });
        }
        else {

          barSize = (barSize - this$1._barPadding * uniqueIds.length - 1) / uniqueIds.length;

          var offset = space / 2 - barSize / 2;

          var xMod = scales.scaleLinear()
            .domain([0, uniqueIds.length - 1])
            .range([-offset, offset]);

          s[this$1._discrete](function (d, i) { return shapeConfig[this$1._discrete](d, i) + xMod(uniqueIds.indexOf(d.group)); });

        }

        s.width(barSize);
        s.height(barSize);

      }

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

      s.config(this$1._shapeConfig[d.key] ? wrapConfig(this$1._shapeConfig[d.key]) : {}).render();
      this$1._shapes.push(s);

    });

    return this;

  };

  /**
      @memberof Plot
      @desc Sets the pixel space between each bar in a group of bars.
      @param {Number} [*value* = 5]
  */
  Plot.prototype.barPadding = function barPadding (_) {
    return arguments.length ? (this._barPadding = _, this) : this._barPadding;
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
      @desc If *value* is specified, sets the discrete axis to the specified string and returns the current class instance. If *value* is not specified, returns the current discrete axis.
      @param {String} [*value*]
  */
  Plot.prototype.discrete = function discrete (_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
  };

  /**
      @memberof Plot
      @desc Sets the pixel space between groups of bars.
      @param {Number} [*value* = 20]
  */
  Plot.prototype.groupPadding = function groupPadding (_) {
    return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
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
      @desc If *value* is specified, sets the stack offset and returns the current class instance. If *value* is not specified, returns the current stack offset function.
      @param {Function|String} [*value* = "descending"]
  */
  Plot.prototype.stackOffset = function stackOffset (_) {
    return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape[("stackOffset" + (_.charAt(0).toUpperCase() + _.slice(1)))], this) : this._stackOffset;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the stack order and returns the current class instance. If *value* is not specified, returns the current stack order function.
      @param {Function|String} [*value* = "none"]
  */
  Plot.prototype.stackOrder = function stackOrder (_) {
    return arguments.length ? (this._stackOrder = typeof _ === "function" ? _ : d3Shape[("stackOrder" + (_.charAt(0).toUpperCase() + _.slice(1)))], this) : this._stackOrder;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
  */
  Plot.prototype.x = function x (_) {
    if (arguments.length) {
      if (typeof _ === "function") { this._x = _; }
      else {
        this._x = d3plusCommon.accessor(_);
        if (!this._aggs[_] && this._discrete === "x") {
          this._aggs[_] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else { return this._x; }
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the x-axis and returns the current class instance. If *value* is not specified, returns the current x-axis configuration.
      @param {Object} [*value*]
  */
  Plot.prototype.xConfig = function xConfig (_) {
    return arguments.length ? (this._xConfig = d3plusCommon.assign(this._xConfig, _), this) : this._xConfig;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the secondary x-axis and returns the current class instance. If *value* is not specified, returns the current secondary x-axis configuration.
      @param {Object} [*value*]
  */
  Plot.prototype.x2Config = function x2Config (_) {
    return arguments.length ? (this._x2Config = d3plusCommon.assign(this._x2Config, _), this) : this._x2Config;
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
      @desc Defines a custom sorting comparitor function to be used for discrete x axes.
      @param {Function} [*value*]
  */
  Plot.prototype.xSort = function xSort (_) {
    return arguments.length ? (this._xSort = _, this) : this._xSort;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
  */
  Plot.prototype.y = function y (_) {
    if (arguments.length) {
      if (typeof _ === "function") { this._y = _; }
      else {
        this._y = d3plusCommon.accessor(_);
        if (!this._aggs[_] && this._discrete === "y") {
          this._aggs[_] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else { return this._y; }
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the y-axis and returns the current class instance. If *value* is not specified, returns the current y-axis configuration.

*Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
      @param {Object} [*value*]
  */
  Plot.prototype.yConfig = function yConfig (_) {
    if (arguments.length) {
      if (_.domain) { _.domain = _.domain.slice().reverse(); }
      this._yConfig = d3plusCommon.assign(this._yConfig, _);
      return this;
    }
    return this._yConfig;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the config method for the secondary y-axis and returns the current class instance. If *value* is not specified, returns the current secondary y-axis configuration.
      @param {Object} [*value*]
  */
  Plot.prototype.y2Config = function y2Config (_) {
    return arguments.length ? (this._y2Config = d3plusCommon.assign(this._y2Config, _), this) : this._y2Config;
  };

  /**
      @memberof Plot
      @desc If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
      @param {Array} [*value*]
  */
  Plot.prototype.yDomain = function yDomain (_) {
    return arguments.length ? (this._yDomain = _, this) : this._yDomain;
  };

  /**
      @memberof Plot
      @desc Defines a custom sorting comparitor function to be used for discrete y axes.
      @param {Function} [*value*]
  */
  Plot.prototype.ySort = function ySort (_) {
    return arguments.length ? (this._ySort = _, this) : this._ySort;
  };

  return Plot;
}(d3plusViz.Viz));

/**
    @class AreaPlot
    @extends Plot
    @desc Creates an area plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .baseline(0)
  .discrete("x")
  .shape("Area")
*/
var AreaPlot = (function (Plot$$1) {
  function AreaPlot() {

    Plot$$1.call(this);
    this._baseline = 0;
    this._discrete = "x";
    this._shape = d3plusCommon.constant("Area");
    this.x("x");

  }

  if ( Plot$$1 ) AreaPlot.__proto__ = Plot$$1;
  AreaPlot.prototype = Object.create( Plot$$1 && Plot$$1.prototype );
  AreaPlot.prototype.constructor = AreaPlot;

  return AreaPlot;
}(Plot));

/**
    @class BarChart
    @extends Plot
    @desc Creates a line plot based on an array of data.
    @example <caption>the equivalent of calling:</caption>
new d3plus.Plot()
  .discrete("x")
  .shape("Line")
*/
var BarChart = (function (Plot$$1) {
  function BarChart() {

    Plot$$1.call(this);
    this._baseline = 0;
    this._discrete = "x";
    this._shape = d3plusCommon.constant("Bar");
    this.x("x");

  }

  if ( Plot$$1 ) BarChart.__proto__ = Plot$$1;
  BarChart.prototype = Object.create( Plot$$1 && Plot$$1.prototype );
  BarChart.prototype.constructor = BarChart;

  return BarChart;
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
var LinePlot = (function (Plot$$1) {
  function LinePlot() {

    Plot$$1.call(this);
    this._discrete = "x";
    this._shape = d3plusCommon.constant("Line");
    this.x("x");

  }

  if ( Plot$$1 ) LinePlot.__proto__ = Plot$$1;
  LinePlot.prototype = Object.create( Plot$$1 && Plot$$1.prototype );
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
var StackedArea = (function (AreaPlot$$1) {
  function StackedArea() {

    AreaPlot$$1.call(this);
    this._stacked = true;

  }

  if ( AreaPlot$$1 ) StackedArea.__proto__ = AreaPlot$$1;
  StackedArea.prototype = Object.create( AreaPlot$$1 && AreaPlot$$1.prototype );
  StackedArea.prototype.constructor = StackedArea;

  return StackedArea;
}(AreaPlot));

exports.AreaPlot = AreaPlot;
exports.BarChart = BarChart;
exports.LinePlot = LinePlot;
exports.Plot = Plot;
exports.StackedArea = StackedArea;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-plot.js.map
