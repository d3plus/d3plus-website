/*
  d3plus-plot v0.7.13
  A reusable javascript x/y plot built on D3.
  Copyright (c) 2018 D3plus - https://d3plus.org
  @license MIT
*/

if (typeof Object.assign !== "function") {
  Object.defineProperty(Object, "assign", {
    value: function assign(target) {
      "use strict";
      if (target === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function includes(searchElement, fromIndex) {

      var o = Object(this);

      var len = o.length >>> 0;

      if (len === 0) return false;

      var n = fromIndex | 0;

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
      }

      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      return false;
    }
  });
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-shape'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3-shape', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Collection,global.scales,global.d3Shape,global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.shapes,global.d3plusViz));
}(this, (function (exports,d3Array,d3Collection,scales,d3Shape,d3plusAxis,d3plusColor,d3plusCommon,shapes,d3plusViz) { 'use strict';

  function ordinalBuffer(domain) {

    if (domain.includes("d3plus-buffer-start")) { return domain; }

    var newDomain = ["d3plus-buffer-start"];
    domain.forEach(function (b) {
      newDomain.push(b);
      newDomain.push(("d3plus-buffer-" + b));
    });

    return newDomain;

  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer = 10]
      @private
  */
  function BarBuffer(ref) {
    var this$1 = this;
    var data = ref.data;
    var x = ref.x;
    var y = ref.y;
    var x2 = ref.x2;
    var y2 = ref.y2;
    var buffer = ref.buffer; if ( buffer === void 0 ) buffer = 10;

    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";

    var oppScale = this._discrete === "x" ? y : x;

    var oppDomain = oppScale.domain().slice();

    var isDiscreteX = this._discrete === "x";

    if (isDiscreteX) { oppDomain.reverse(); }

    var negVals, posVals;
    if (this._stacked) {
      var groupedData = d3Collection.nest()
        .key(function (d) { return d[this$1._discrete]; })
        .entries(data)
        .map(function (d) { return d.values.map(function (x) { return x[isDiscreteX ? yKey : xKey]; }); });
      posVals = groupedData.map(function (arr) { return d3Array.sum(arr.filter(function (d) { return d > 0; })); });
      negVals = groupedData.map(function (arr) { return d3Array.sum(arr.filter(function (d) { return d < 0; })); });
    }
    else {
      posVals = data.map(function (d) { return d[isDiscreteX ? yKey : xKey]; });
      negVals = posVals;
    }

    var bMax = oppScale(d3Array.max(posVals));
    if (isDiscreteX ? bMax < oppScale(0) : bMax > oppScale(0)) { bMax += isDiscreteX ? -buffer : buffer; }
    bMax = oppScale.invert(bMax);

    var bMin = oppScale(d3Array.min(negVals));
    if (isDiscreteX ? bMin > oppScale(0) : bMin < oppScale(0)) { bMin += isDiscreteX ? buffer : -buffer; }
    bMin = oppScale.invert(bMin);

    if (bMax > oppDomain[1]) { oppDomain[1] = bMax; }
    if (bMin < oppDomain[0]) { oppDomain[0] = bMin; }

    if (isDiscreteX) { oppDomain.reverse(); }

    oppScale.domain(oppDomain);

    var discreteScale = isDiscreteX ? x : y;
    discreteScale.domain(ordinalBuffer(discreteScale.domain()));

    return [x, y];

  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the radius of the largest Circle.
      @private
  */
  function CircleBuffer(ref) {
    var data = ref.data;
    var x = ref.x;
    var y = ref.y;
    var x2 = ref.x2;
    var y2 = ref.y2;
    var config = ref.config;
    var buffer = ref.buffer;

    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";

    var xD = x.domain().slice(),
        yD = y.domain().slice();

    var xR = x.range(),
          yR = y.range();

    if (!x.invert) { xD = ordinalBuffer(xD); }
    if (!y.invert) { yD = ordinalBuffer(yD); }

    data.forEach(function (d) {

      var s = buffer ? buffer : config.r(d.data, d.i) * 2;

      if (x.invert && x(d[xKey]) - xR[0] < s) {
        var v = x.invert(x(d[xKey]) - s);
        if (v < xD[0]) { xD[0] = v; }
      }
      if (x.invert && xR[1] - x(d[xKey]) < s) {
        var v$1 = x.invert(x(d[xKey]) + s);
        if (v$1 > xD[1]) { xD[1] = v$1; }
      }

      if (y.invert && y(d[yKey]) - yR[0] < s) {
        var v$2 = y.invert(y(d[yKey]) - s);
        if (v$2 > yD[0]) { yD[0] = v$2; }
      }
      if (y.invert && yR[1] - y(d[yKey]) < s) {
        var v$3 = y.invert(y(d[yKey]) + s);
        if (v$3 < yD[1]) { yD[1] = v$3; }
      }

    });

    x.domain(xD).range(xR);
    y.domain(yD).range(yR);

    return [x, y];

  }

  function RectBuffer(ref) {
    var data = ref.data;
    var x = ref.x;
    var y = ref.y;
    var x2 = ref.x2;
    var y2 = ref.y2;
    var config = ref.config;

    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";

    var xD = x.domain().slice(),
        yD = y.domain().slice();

    var xR = x.range(),
          yR = y.range();

    if (!x.invert) { xD = ordinalBuffer(xD); }
    if (!y.invert) { yD = ordinalBuffer(yD); }

    data.forEach(function (d) {

      var h = config.height(d.data, d.i),
            w = config.width(d.data, d.i);

      if (x.invert && x(d[xKey]) - xR[0] < w) {
        var v = x.invert(x(d[xKey]) - w);
        if (v < xD[0]) { xD[0] = v; }
      }
      if (x.invert && xR[1] - x(d[xKey]) < w) {
        var v$1 = x.invert(x(d[xKey]) + w);
        if (v$1 > xD[1]) { xD[1] = v$1; }
      }

      if (y.invert && y(d[yKey]) - yR[0] < h) {
        var v$2 = y.invert(y(d[yKey]) - h);
        if (v$2 > yD[0]) { yD[0] = v$2; }
      }
      if (y.invert && yR[1] - y(d[yKey]) < h) {
        var v$3 = y.invert(y(d[yKey]) + h);
        if (v$3 < yD[1]) { yD[1] = v$3; }
      }

    });

    x.domain(xD);
    y.domain(yD);

    return [x, y];

  }

  function LineBuffer(ref) {
    var this$1 = this;
    var data = ref.data;
    var x = ref.x;
    var y = ref.y;
    var x2 = ref.x2;
    var y2 = ref.y2;

    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";

    var s = this._discrete === "x" ? y : x;

    var d = s.domain().slice();

    if (this._discrete === "x") { d.reverse(); }

    var vals = data.map(function (d) { return d[this$1._discrete === "x" ? yKey : xKey]; });
    var b = s.invert(s(d3Array.max(vals)) + (this._discrete === "x" ? -10 : 10));

    if (b > d[1]) { d[1] = b; }

    if (this._discrete === "x") { d.reverse(); }

    s.domain(d);

    return [x, y];

  }

  function defaultSize(d) {
    return this._sizeScaleD3(this._size ? this._size(d) : null);
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
      this._annotations = [];
      this._barPadding = 0;
      this._buffer = {
        Bar: BarBuffer,
        Circle: CircleBuffer,
        Line: LineBuffer,
        Rect: RectBuffer
      };
      this._confidenceConfig = {
        fillOpacity: d3plusCommon.constant(0.5)
      };
      this._groupPadding = 5;
      this._shape = d3plusCommon.constant("Circle");
      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        Area: {
          label: function (d, i) { return this$1._stacked ? this$1._drawLabel(d, i) : false; },
          labelConfig: {
            fontResize: true
          }
        },
        ariaLabel: function (d, i) {
          var ariaLabelStr = "";
          if (d.nested) { ariaLabelStr = "" + (this$1._drawLabel(d.data, d.i)); }
          else {
            ariaLabelStr = "" + (this$1._drawLabel(d, i));
            if (this$1._x(d, i) !== undefined) { ariaLabelStr += ", x: " + (this$1._x(d, i)); }
            if (this$1._y(d, i) !== undefined) { ariaLabelStr += ", y: " + (this$1._y(d, i)); }
            if (this$1._x2(d, i) !== undefined) { ariaLabelStr += ", x2: " + (this$1._x2(d, i)); }
            if (this$1._y2(d, i) !== undefined) { ariaLabelStr += ", y2: " + (this$1._y2(d, i)); }
          }
          return (ariaLabelStr + ".");
        },
        Bar: {
          labelConfig: {
            textAnchor: function () { return this$1._discrete === "x" ? "middle" : "end"; },
            verticalAlign: function () { return this$1._discrete === "x" ? "top" : "middle"; }
          }
        },
        Circle: {
          r: defaultSize.bind(this)
        },
        Line: {
          fill: d3plusCommon.constant("none"),
          label: false,
          stroke: function (d, i) { return d3plusColor.colorAssign(this$1._id(d, i)); },
          strokeWidth: d3plusCommon.constant(1)
        },
        Rect: {
          height: function (d) { return defaultSize.bind(this$1)(d) * 2; },
          width: function (d) { return defaultSize.bind(this$1)(d) * 2; }
        }
      });
      this._shapeOrder = ["Area", "Path", "Bar", "Box", "Line", "Rect", "Circle"];
      this._shapeSort = function (a, b) { return this$1._shapeOrder.indexOf(a) - this$1._shapeOrder.indexOf(b); };
      this._sizeMax = 20;
      this._sizeMin = 5;
      this._sizeScale = "sqrt";
      this._stackOffset = d3Shape.stackOffsetDiverging;
      this._stackOrder = d3Shape.stackOrderNone;
      this._x = d3plusCommon.accessor("x");
      this._x2 = d3plusCommon.accessor("x2");
      this._xAxis = new d3plusAxis.AxisBottom().align("end");
      this._x2Axis = new d3plusAxis.AxisTop().align("start");
      this._xTest = new d3plusAxis.AxisBottom().align("end").gridSize(0);
      this._x2Test = new d3plusAxis.AxisTop().align("start").gridSize(0);
      this._xConfig = {};
      this._x2Config = {
        padding: 0
      };
      this._y = d3plusCommon.accessor("y");
      this._y2 = d3plusCommon.accessor("y2");
      this._yAxis = new d3plusAxis.AxisLeft().align("start");
      this._yTest = new d3plusAxis.AxisLeft().align("start").gridSize(0);
      this._y2Axis = new d3plusAxis.AxisRight().align("end");
      this._y2Test = new d3plusAxis.AxisLeft().align("end").gridSize(0);
      this._yConfig = {
        gridConfig: {
          stroke: function (d) {
            var domain = this$1._yAxis.domain();
            return domain[domain.length - 1] === d.id ? "transparent" : "#ccc";
          }
        }
      };
      this._y2Config = {};

    }

    if ( Viz ) Plot.__proto__ = Viz;
    Plot.prototype = Object.create( Viz && Viz.prototype );
    Plot.prototype.constructor = Plot;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Plot.prototype._draw = function _draw (callback) {
      var this$1 = this;


      if (!this._filteredData.length) { return this; }

      var stackGroup = function (d, i) { return this$1._stacked
        ? ("" + (this$1._groupBy.length > 1 ? this$1._ids(d, i).slice(0, -1).join("_") : "group"))
        : ("" + (this$1._ids(d, i).join("_"))); };

      var data = this._filteredData.map(function (d, i) { return ({
        __d3plus__: true,
        data: d,
        group: stackGroup(d, i),
        i: i,
        hci: this$1._confidence && this$1._confidence[1] && this$1._confidence[1](d, i),
        id: this$1._ids(d, i).slice(0, this$1._drawDepth + 1).join("_"),
        lci: this$1._confidence && this$1._confidence[0] && this$1._confidence[0](d, i),
        shape: this$1._shape(d, i),
        x: this$1._x(d, i),
        x2: this$1._x2(d, i),
        y: this$1._y(d, i),
        y2: this$1._y2(d, i)
      }); });

      this._formattedData = data;

      if (this._size) {
        var rExtent = d3Array.extent(data, function (d) { return this$1._size(d.data); });
        this._sizeScaleD3 = function () { return this$1._sizeMin; };
        this._sizeScaleD3 = scales[("scale" + (this._sizeScale.charAt(0).toUpperCase()) + (this._sizeScale.slice(1)))]()
          .domain(rExtent)
          .range([rExtent[0] === rExtent[1] ? this._sizeMax : d3Array.min([this._sizeMax / 2, this._sizeMin]), this._sizeMax]);
      }
      else {
        this._sizeScaleD3 = function () { return this$1._sizeMin; };
      }

      var x2Exists = data.some(function (d) { return d.x2 !== undefined; }),
            y2Exists = data.some(function (d) { return d.y2 !== undefined; });

      var height = this._height - this._margin.top - this._margin.bottom,
            opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
            opp2 = this._discrete ? this._discrete === "x" ? "y2" : "x2" : undefined,
            opps = [opp, opp2],
            parent = this._select,
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;

      var x2Time = this._time && data[0].x2 === this._time(data[0].data, data[0].i),
            xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
            y2Time = this._time && data[0].y2 === this._time(data[0].data, data[0].i),
            yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

      for (var i = 0; i < data.length; i++) {
        var d = data[i];
        if (xTime) { d.x = d3plusAxis.date(d.x); }
        if (x2Time) { d.x2 = d3plusAxis.date(d.x2); }
        if (yTime) { d.y = d3plusAxis.date(d.y); }
        if (y2Time) { d.y2 = d3plusAxis.date(d.y2); }
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
          if (this$1[("_" + (this$1._discrete) + "Sort")]) { return this$1[("_" + (this$1._discrete) + "Sort")](a.data, b.data); }
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

        if (this[("_" + (this._discrete) + "Sort")]) {
          data.sort(function (a, b) { return this$1[("_" + (this$1._discrete) + "Sort")](a.data, b.data); });
        }
        else {
          data.sort(function (a, b) { return a[this$1._discrete] - b[this$1._discrete]; });
        }
        var order = this._stackOrder;

        if (order instanceof Array) { stackKeys.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); }); }
        else if (order === d3Shape.stackOrderNone) { stackKeys.sort(function (a, b) { return a.localeCompare(b); }); }

        stackData = d3Shape.stack()
          .keys(stackKeys)
          .offset(this._stackOffset)
          .order(order instanceof Array ? d3Shape.stackOrderNone : order)
          .value(function (group, key) {
            var d = group.filter(function (g) { return g.id === key; });
            return d.length ? d[0][opp] : 0;
          })(stackData);

        domains = {};
        domains[this._discrete] = d3Array.extent(data, function (d) { return d[this$1._discrete]; });
        domains[opp] = [d3Array.min(stackData.map(function (g) { return d3Array.min(g.map(function (p) { return p[0]; })); })), d3Array.max(stackData.map(function (g) { return d3Array.max(g.map(function (p) { return p[1]; })); }))];

      }
      else {
        var xData = this._discrete === "x" ? data.map(function (d) { return d.x; }) : data.map(function (d) { return d.x; })
          .concat(this._confidence && this._confidence[0] ? data.map(function (d) { return d.lci; }) : [])
          .concat(this._confidence && this._confidence[1] ? data.map(function (d) { return d.hci; }) : []);

        var x2Data = this._discrete === "x" ? data.map(function (d) { return d.x2; }) : data.map(function (d) { return d.x2; })
          .concat(this._confidence && this._confidence[0] ? data.map(function (d) { return d.lci; }) : [])
          .concat(this._confidence && this._confidence[1] ? data.map(function (d) { return d.hci; }) : []);

        var yData = this._discrete === "y" ? data.map(function (d) { return d.y; }) : data.map(function (d) { return d.y; })
          .concat(this._confidence && this._confidence[0] ? data.map(function (d) { return d.lci; }) : [])
          .concat(this._confidence && this._confidence[1] ? data.map(function (d) { return d.hci; }) : []);

        var y2Data = this._discrete === "y" ? data.map(function (d) { return d.y2; }) : data.map(function (d) { return d.y2; })
          .concat(this._confidence && this._confidence[0] ? data.map(function (d) { return d.lci; }) : [])
          .concat(this._confidence && this._confidence[1] ? data.map(function (d) { return d.hci; }) : []);

        if (this[("_" + (this._discrete) + "Sort")]) {
          data.sort(function (a, b) { return this$1[("_" + (this$1._discrete) + "Sort")](a.data, b.data); });
        }
        else {
          data.sort(function (a, b) { return a[this$1._discrete] - b[this$1._discrete]; });
        }

        domains = {
          x: this._xSort ? Array.from(new Set(data.filter(function (d) { return d.x; }).sort(function (a, b) { return this$1._xSort(a.data, b.data); }).map(function (d) { return d.x; }))) : d3Array.extent(xData, function (d) { return d; }),
          x2: this._x2Sort ? Array.from(new Set(data.filter(function (d) { return d.x2; }).sort(function (a, b) { return this$1._x2Sort(a.data, b.data); }).map(function (d) { return d.x2; }))) : d3Array.extent(x2Data, function (d) { return d; }),
          y: this._ySort ? Array.from(new Set(data.filter(function (d) { return d.y; }).sort(function (a, b) { return this$1._ySort(a.data, b.data); }).map(function (d) { return d.y; }))) : d3Array.extent(yData, function (d) { return d; }),
          y2: this._y2Sort ? Array.from(new Set(data.filter(function (d) { return d.y2; }).sort(function (a, b) { return this$1._y2Sort(a.data, b.data); }).map(function (d) { return d.y2; }))) : d3Array.extent(y2Data, function (d) { return d; })
        };
      }

      var xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
          xScale = this._xSort ? "Ordinal" : "Linear";

      if (xDomain[0] === void 0) { xDomain[0] = domains.x[0]; }
      if (xDomain[1] === void 0) { xDomain[1] = domains.x[1]; }

      if (xTime) {
        xDomain = xDomain.map(d3plusAxis.date);
        xScale = "Time";
      }
      else if (this._discrete === "x") {
        xDomain = Array.from(new Set(data.filter(function (d) { return d.x; }).sort(function (a, b) { return this$1._xSort ? this$1._xSort(a.data, b.data) : a.x - b.x; }).map(function (d) { return d.x; })));
        xScale = "Ordinal";
      }

      var x2Domain = this._x2Domain ? this._x2Domain.slice() : domains.x2,
          x2Scale = this._x2Sort ? "Ordinal" : "Linear";

      if (x2Domain && x2Domain[0] === void 0) { x2Domain[0] = domains.x2[0]; }
      if (x2Domain && x2Domain[1] === void 0) { x2Domain[1] = domains.x2[1]; }

      if (x2Time) {
        x2Domain = x2Domain.map(d3plusAxis.date);
        x2Scale = "Time";
      }
      else if (this._discrete === "x") {
        x2Domain = Array.from(new Set(data.filter(function (d) { return d.x2; }).sort(function (a, b) { return this$1._x2Sort ? this$1._x2Sort(a.data, b.data) : a.x2 - b.x2; }).map(function (d) { return d.x2; })));
        x2Scale = "Ordinal";
      }

      var yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
          yScale = this._ySort ? "Ordinal" : "Linear";

      if (yDomain[0] === void 0) { yDomain[0] = domains.y[0]; }
      if (yDomain[1] === void 0) { yDomain[1] = domains.y[1]; }

      var y2Domain = this._y2Domain ? this._y2Domain.slice() : domains.y2,
          y2Scale = this._y2Sort ? "Ordinal" : "Linear";

      if (y2Domain && y2Domain[0] === void 0) { y2Domain[0] = domains.y2[0]; }
      if (y2Domain && y2Domain[1] === void 0) { y2Domain[1] = domains.y2[1]; }

      if (yTime) {
        yDomain = yDomain.map(d3plusAxis.date);
        yScale = "Time";
      }
      else if (this._discrete === "y") {
        yDomain = Array.from(new Set(data.sort(function (a, b) { return this$1._ySort ? this$1._ySort(a.data, b.data) : a.y - b.y; }).map(function (d) { return d.y; })));
        yScale = "Ordinal";

        y2Domain = Array.from(new Set(data.sort(function (a, b) { return this$1._y2Sort ? this$1._y2Sort(a.data, b.data) : a.y2 - b.y2; }).map(function (d) { return d.y2; })));
        y2Scale = "Ordinal";
      }

      if (y2Time) {
        y2Domain = y2Domain.map(d3plusAxis.date);
        y2Scale = "Time";
      }

      domains = {x: xDomain, x2: x2Domain || xDomain, y: yDomain, y2: y2Domain || yDomain};

      opps.forEach(function (opp) {
        if (opp && this$1._baseline !== void 0) {
          var b = this$1._baseline;
          if (domains[opp] && domains[opp][0] > b) { domains[opp][0] = b; }
          else if (domains[opp] && domains[opp][1] < b) { domains[opp][1] = b; }
        }
      });

      var x = scales[("scale" + xScale)]().domain(domains.x).range(d3Array.range(0, width + 1, width / (domains.x.length - 1))),
          x2 = scales[("scale" + x2Scale)]().domain(domains.x2).range(d3Array.range(0, width + 1, width / (domains.x2.length - 1))),
          y = scales[("scale" + yScale)]().domain(domains.y.reverse()).range(d3Array.range(0, height + 1, height / (domains.y.length - 1))),
          y2 = scales[("scale" + y2Scale)]().domain(domains.y2.reverse()).range(d3Array.range(0, height + 1, height / (domains.y2.length - 1)));

      var shapeData = d3Collection.nest()
        .key(function (d) { return d.shape; })
        .entries(data)
        .sort(function (a, b) { return this$1._shapeSort(a.key, b.key); });

      var oppScale = this._discrete === "x" ? yScale : xScale;
      if (this._xConfig.scale !== "log" && this._yConfig.scale !== "log" && oppScale !== "Ordinal") {
        shapeData.forEach(function (d) {
          if (this$1._buffer[d.key]) {
            var res = this$1._buffer[d.key].bind(this$1)({data: d.values, x: x, y: y, config: this$1._shapeConfig[d.key]});
            if (this$1._xConfig.scale !== "log") { x = res[0]; }
            if (this$1._yConfig.scale !== "log") { y = res[1]; }
            var res2 = this$1._buffer[d.key].bind(this$1)({data: d.values, x: x2, y: y2, x2: true, y2: true, config: this$1._shapeConfig[d.key]});
            if (this$1._x2Config.scale !== "log") { x2 = res2[0]; }
            if (this$1._y2Config.scale !== "log") { y2 = res2[1]; }
          }
        });
      }
      xDomain = x.domain();
      x2Domain = x2.domain();
      yDomain = y.domain();
      y2Domain = y2.domain();

      var testGroup = d3plusCommon.elem("g.d3plus-plot-test", {enter: {opacity: 0}, parent: this._select}),
            x2Ticks = this._discrete === "x" && !x2Time ? domains.x2 : undefined,
            xTicks = this._discrete === "x" && !xTime ? domains.x : undefined,
            y2Ticks = this._discrete === "y" && !y2Time ? domains.y2 : undefined,
            yTicks = this._discrete === "y" && !yTime ? domains.y : undefined;

      var yC = {
        gridConfig: {stroke: !this._discrete || this._discrete === "x" ? this._yTest.gridConfig().stroke : "transparent"}
      };

      var defaultConfig = {
        barConfig: {"stroke-width": 0},
        gridSize: 0,
        labels: [],
        title: false,
        tickSize: 0
      };

      var defaultX2Config = x2Exists ? {} : defaultConfig;
      var defaultY2Config = y2Exists ? {} : defaultConfig;

      this._yTest
        .domain(yDomain)
        .height(height)
        .maxSize(width / 2)
        .range([undefined, undefined])
        .scale(yScale.toLowerCase())
        .select(testGroup.node())
        .ticks(yTicks)
        .width(width)
        .config(yC)
        .config(this._yConfig)
        .render();

      var yBounds = this._yTest.outerBounds();
      var yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

      if (y2Exists) {
        this._y2Test
          .domain(y2Domain)
          .height(height)
          .range([undefined, undefined])
          .scale(y2Scale.toLowerCase())
          .select(testGroup.node())
          .ticks(y2Ticks)
          .width(width)
          .config(yC)
          .config(defaultY2Config)
          .config(this._y2Config)
          .render();
      }

      var y2Bounds = this._y2Test.outerBounds();
      var y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;

      var xC = {
        gridConfig: {stroke: !this._discrete || this._discrete === "y" ? this._xTest.gridConfig().stroke : "transparent"}
      };

      this._xTest
        .domain(xDomain)
        .height(height)
        .maxSize(height / 2)
        .range([undefined, undefined])
        .scale(xScale.toLowerCase())
        .select(testGroup.node())
        .ticks(xTicks)
        .width(width)
        .config(xC)
        .config(this._xConfig)
        .render();

      if (x2Exists) {
        this._x2Test
          .domain(x2Domain)
          .height(height)
          .range([undefined, undefined])
          .scale(x2Scale.toLowerCase())
          .select(testGroup.node())
          .ticks(x2Ticks)
          .width(width)
          .config(xC)
          .tickSize(0)
          .config(defaultX2Config)
          .config(this._x2Config)
          .render();
      }

      var xTestRange = this._xTest._getRange();
      var x2TestRange = this._x2Test._getRange();

      var x2Bounds = this._x2Test.outerBounds();
      var x2Height = x2Bounds.height + this._x2Test.padding();

      var xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

      this._xTest
        .range([xOffsetLeft, undefined])
        .render();

      var topOffset = this._yTest.shapeConfig().labelConfig.fontSize() / 2;

      var xOffsetRight = d3Array.max([y2Width, width - xTestRange[1], width - x2TestRange[1]]);
      var xBounds = this._xTest.outerBounds();
      var xHeight = xBounds.height + this._xTest.padding();

      this._padding.left += xOffsetLeft;
      this._padding.right += xOffsetRight;
      this._padding.bottom += xHeight;
      this._padding.top += x2Height + topOffset;

      Viz.prototype._draw.call(this, callback);

      var horizontalMargin = this._margin.left + this._margin.right;
      var verticalMargin = this._margin.top + this._margin.bottom;
      this._yTest
        .domain(yDomain)
        .height(height)
        .maxSize(width / 2)
        .range([x2Height, height - (xHeight + topOffset + verticalMargin)])
        .scale(yScale.toLowerCase())
        .select(testGroup.node())
        .ticks(yTicks)
        .width(width)
        .config(yC)
        .config(this._yConfig)
        .render();

      yBounds = this._yTest.outerBounds();
      yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;
      xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

      if (y2Exists) {
        this._y2Test
          .config(yC)
          .domain(y2Domain)
          .gridSize(0)
          .height(height)
          .range([x2Height, height - (xHeight + topOffset + verticalMargin)])
          .scale(y2Scale.toLowerCase())
          .select(testGroup.node())
          .width(width - d3Array.max([0, xOffsetRight - y2Width]))
          .title(false)
          .config(this._y2Config)
          .config(defaultY2Config)
          .render();
      }

      y2Bounds = this._y2Test.outerBounds();
      y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
      xOffsetRight = d3Array.max([y2Width, width - xTestRange[1], width - x2TestRange[1]]);

      var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top + x2Height + topOffset) + ")";
      var x2Transform = "translate(" + (this._margin.left) + ", " + (this._margin.top + topOffset) + ")";

      var xGroup = d3plusCommon.elem("g.d3plus-plot-x-axis", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}});
      var x2Group = d3plusCommon.elem("g.d3plus-plot-x2-axis", {parent: parent, transition: transition, enter: {transform: x2Transform}, update: {transform: x2Transform}});

      var xTrans = xOffsetLeft > yWidth ? xOffsetLeft - yWidth : 0;
      var yTransform = "translate(" + (this._margin.left + xTrans) + ", " + (this._margin.top + topOffset) + ")";
      var yGroup = d3plusCommon.elem("g.d3plus-plot-y-axis", {parent: parent, transition: transition, enter: {transform: yTransform}, update: {transform: yTransform}});

      var y2Transform = "translate(-" + (this._margin.right) + ", " + (this._margin.top + topOffset) + ")";
      var y2Group = d3plusCommon.elem("g.d3plus-plot-y2-axis", {parent: parent, transition: transition, enter: {transform: y2Transform}, update: {transform: y2Transform}});

      this._xAxis
        .domain(xDomain)
        .height(height - (x2Height + topOffset + verticalMargin))
        .maxSize(height / 2)
        .range([xOffsetLeft, width - (xOffsetRight + horizontalMargin)])
        .scale(xScale.toLowerCase())
        .select(xGroup.node())
        .ticks(xTicks)
        .width(width)
        .config(xC)
        .config(this._xConfig)
        .render();

      if (x2Exists) {
        this._x2Axis
          .domain(x2Domain)
          .height(height - (xHeight + topOffset + verticalMargin))
          .range([xOffsetLeft, width - (xOffsetRight + horizontalMargin)])
          .scale(x2Scale.toLowerCase())
          .select(x2Group.node())
          .ticks(x2Ticks)
          .width(width)
          .config(xC)
          .config(defaultX2Config)
          .config(this._x2Config)
          .render();
      }

      x = function (d, x) {
        if (x === "x2") {
          if (this$1._x2Config.scale === "log" && d === 0) { d = x2Domain[0] < 0 ? -1 : 1; }
          return this$1._x2Axis._getPosition.bind(this$1._x2Axis)(d);
        }
        else {
          if (this$1._xConfig.scale === "log" && d === 0) { d = xDomain[0] < 0 ? -1 : 1; }
          return this$1._xAxis._getPosition.bind(this$1._xAxis)(d);
        }
      };
      var xRange = this._xAxis._getRange();

      this._yAxis
        .domain(yDomain)
        .height(height)
        .maxSize(width / 2)
        .range([this._xAxis.outerBounds().y + x2Height, height - (xHeight + topOffset + verticalMargin)])
        .scale(yScale.toLowerCase())
        .select(yGroup.node())
        .ticks(yTicks)
        .width(xRange[xRange.length - 1])
        .config(yC)
        .config(this._yConfig)
        .render();

      if (y2Exists) {
        this._y2Axis
          .config(yC)
          .domain(y2Exists ? y2Domain : yDomain)
          .gridSize(0)
          .height(height)
          .range([this._xAxis.outerBounds().y + x2Height, height - (xHeight + topOffset + verticalMargin)])
          .scale(y2Exists ? y2Scale.toLowerCase() : yScale.toLowerCase())
          .select(y2Group.node())
          .width(width - d3Array.max([0, xOffsetRight - y2Width]))
          .title(false)
          .config(this._y2Config)
          .config(defaultY2Config)
          .render();
      }

      y = function (d, y) {
        if (y === "y2") {
          if (this$1._y2Config.scale === "log" && d === 0) { d = y2Domain[0] < 0 ? -1 : 1; }
          return this$1._y2Axis._getPosition.bind(this$1._y2Axis)(d) - x2Height;
        }
        else {
          if (this$1._yConfig.scale === "log" && d === 0) { d = yDomain[0] < 0 ? -1 : 1; }
          return this$1._yAxis._getPosition.bind(this$1._yAxis)(d) - x2Height;
        }
      };
      var yRange = this._yAxis._getRange();

      var annotationGroup = d3plusCommon.elem("g.d3plus-plot-annotations", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node();
      this._annotations.forEach(function (annotation) {
        new shapes[annotation.shape]()
          .config(annotation)
          .config({
            x: function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); },
            x0: this$1._discrete === "x" ? function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); } : x(0),
            x1: this$1._discrete === "x" ? null : function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); },
            y: function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y); },
            y0: this$1._discrete === "y" ? function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y); } : y(0) - yOffset,
            y1: this$1._discrete === "y" ? null : function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y) - yOffset; }
          })
          .select(annotationGroup)
          .render();
      });

      var yOffset = this._xAxis.barConfig()["stroke-width"];
      if (yOffset) { yOffset /= 2; }

      var shapeConfig = {
        duration: this._duration,
        label: function (d) { return this$1._drawLabel(d.data, d.i); },
        select: d3plusCommon.elem("g.d3plus-plot-shapes", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node(),
        x: function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); },
        x0: this._discrete === "x" ? function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); } : x(0),
        x1: this._discrete === "x" ? null : function (d) { return d.x2 ? x(d.x2, "x2") : x(d.x); },
        y: function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y); },
        y0: this._discrete === "y" ? function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y); } : y(0) - yOffset,
        y1: this._discrete === "y" ? null : function (d) { return d.y2 ? y(d.y2, "y2") : y(d.y) - yOffset; }
      };

      if (this._stacked) {
        var scale = opp === "x" ? x : y;
        shapeConfig[("" + opp)] = shapeConfig[(opp + "0")] = function (d) {
          var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
          return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(0);
        };
        shapeConfig[(opp + "1")] = function (d) {
          var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
          return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(0);
        };
      }

      var events = Object.keys(this._on);
      shapeData.forEach(function (d) {

        var s = new shapes[d.key]().config(shapeConfig).data(d.values);

        if (d.key === "Bar") {

          var space;
          var scale = this$1._discrete === "x" ? x : y;
          var vals = (this$1._discrete === "x" ? xDomain : yDomain).filter(function (d) { return typeof d !== "string" || d.indexOf("d3plus-buffer-") < 0; });
          var range = this$1._discrete === "x" ? xRange : yRange;
          if (vals.length > 1) { space = scale(vals[1]) - scale(vals[0]); }
          else { space = range[range.length - 1] - range[0]; }
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
        else if (d.key === "Line" && this$1._confidence) {

          var areaConfig = Object.assign({}, shapeConfig);
          var key = this$1._discrete === "x" ? "y" : "x";
          var scaleFunction = this$1._discrete === "x" ? y : x;
          areaConfig[(key + "0")] = function (d) { return scaleFunction(this$1._confidence[0] ? d.lci : d[key]); };
          areaConfig[(key + "1")] = function (d) { return scaleFunction(this$1._confidence[1] ? d.hci : d[key]); };

          var area = new shapes.Area().config(areaConfig).data(d.values);
          var confidenceConfig = Object.assign(this$1._shapeConfig, this$1._confidenceConfig);
          area.config(d3plusCommon.configPrep.bind(this$1)(confidenceConfig, "shape", "Area")).render();
          this$1._shapes.push(area);
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

        s.config(d3plusCommon.configPrep.bind(this$1)(this$1._shapeConfig, "shape", d.key)).render();
        this$1._shapes.push(s);

      });

      return this;

    };

    /**
        @memberof Plot
        @desc Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.
        @param {Array|Object} *annotations* = []
        @chainable
    */
    Plot.prototype.annotations = function annotations (_) {
      return arguments.length ? (this._annotations = _ instanceof Array ? _ : [_], this) : this._annotations;
    };

    /**
        @memberof Plot
        @desc Sets the pixel space between each bar in a group of bars.
        @param {Number} *value* = 0
        @chainable
    */
    Plot.prototype.barPadding = function barPadding (_) {
      return arguments.length ? (this._barPadding = _, this) : this._barPadding;
    };

    /**
        @memberof Plot
        @desc Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.
        @param {Number} *value*
        @chainable
    */
    Plot.prototype.baseline = function baseline (_) {
      return arguments.length ? (this._baseline = _, this) : this._baseline;
    };

    /**
         @memberof Plot
         @desc Sets the confidence to the specified array of lower and upper bounds.
         @param {String[]|Function[]} *value*
         @chainable
         @example <caption>Can be called with accessor functions or static keys:</caption>
         var data = {id: "alpha", value: 10, lci: 9, hci: 11};
         ...
         // Accessor functions
         .confidence([function(d) { return d.lci }, function(d) { return d.hci }])

         // Or static keys
         .confidence(["lci", "hci"])
     */
    Plot.prototype.confidence = function confidence (_) {
      if (arguments.length) {
        this._confidence = [];
        var lower = _[0];
        this._confidence[0] = typeof lower === "function" || !lower ? lower : d3plusCommon.accessor(lower);
        var upper = _[1];
        this._confidence[1] = typeof upper === "function" || !upper ? upper : d3plusCommon.accessor(upper);

        return this;
      }
      else { return this._confidence; }
    };

    /**
         @memberof Plot
         @desc If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.
         @param {Object} [*value*]
         @chainable
     */
    Plot.prototype.confidenceConfig = function confidenceConfig (_) {
      return arguments.length ? (this._confidenceConfig = d3plusCommon.assign(this._confidenceConfig, _), this) : this._confidenceConfig;
    };

    /**
        @memberof Plot
        @desc Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.
        @param {String} *value*
        @chainable
    */
    Plot.prototype.discrete = function discrete (_) {
      return arguments.length ? (this._discrete = _, this) : this._discrete;
    };

    /**
        @memberof Plot
        @desc Sets the pixel space between groups of bars.
        @param {Number} [*value* = 5]
        @chainable
    */
    Plot.prototype.groupPadding = function groupPadding (_) {
      return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
    };

    /**
        @memberof Plot
        @desc A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.
        @param {Function} *value*
        @chainable
    */
    Plot.prototype.shapeSort = function shapeSort (_) {
      return arguments.length ? (this._shapeSort = _, this) : this._shapeSort;
    };

    /**
        @memberof Plot
        @desc Sets the size of bubbles to the given Number, data key, or function.
        @param {Function|Number|String} *value* = 10
        @chainable
    */
    Plot.prototype.size = function size (_) {
      return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
    };

    /**
        @memberof Plot
        @desc Sets the size scale maximum to the specified number.
        @param {Number} *value* = 20
        @chainable
    */
    Plot.prototype.sizeMax = function sizeMax (_) {
      return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
    };

    /**
        @memberof Plot
        @desc Sets the size scale minimum to the specified number.
        @param {Number} *value* = 5
        @chainable
    */
    Plot.prototype.sizeMin = function sizeMin (_) {
      return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
    };

    /**
        @memberof Plot
        @desc Sets the size scale to the specified string.
        @param {String} *value* = "sqrt"
        @chainable
    */
    Plot.prototype.sizeScale = function sizeScale (_) {
      return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
    };

    /**
        @memberof Plot
        @desc If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.
        @param {Boolean} *value* = false
        @chainable
    */
    Plot.prototype.stacked = function stacked (_) {
      return arguments.length ? (this._stacked = _, this) : this._stacked;
    };

    /**
        @memberof Plot
        @desc Sets the stack offset. If *value* is not specified, returns the current stack offset function.
        @param {Function|String} *value* = "descending"
        @chainable
    */
    Plot.prototype.stackOffset = function stackOffset (_) {
      return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape[("stackOffset" + (_.charAt(0).toUpperCase() + _.slice(1)))], this) : this._stackOffset;
    };

    /**
        @memberof Plot
        @desc Sets the stack order. If *value* is not specified, returns the current stack order function.
        @param {Function|String|Array} *value* = "none"
        @chainable
    */
    Plot.prototype.stackOrder = function stackOrder (_) {
      return arguments.length ? (this._stackOrder = typeof _ === "string" ? d3Shape[("stackOrder" + (_.charAt(0).toUpperCase() + _.slice(1)))] : _, this) : this._stackOrder;
    };

    /**
        @memberof Plot
        @desc Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.
        @param {Function|Number} *value*
        @chainable
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
         @desc Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.
         @param {Function|Number} *value*
         @chainable
     */
    Plot.prototype.x2 = function x2 (_) {
      if (arguments.length) {
        if (typeof _ === "function") { this._x2 = _; }
        else {
          this._x2 = d3plusCommon.accessor(_);
          if (!this._aggs[_] && this._discrete === "x") {
            this._aggs[_] = function (a) {
              var v = Array.from(new Set(a));
              return v.length === 1 ? v[0] : v;
            };
          }
        }
        return this;
      }
      else { return this._x2; }
    };

    /**
        @memberof Plot
        @desc Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.
        @param {Object} *value*
        @chainable
    */
    Plot.prototype.xConfig = function xConfig (_) {
      return arguments.length ? (this._xConfig = d3plusCommon.assign(this._xConfig, _), this) : this._xConfig;
    };

    /**
        @memberof Plot
        @desc Sets the config method for the secondary x-axis. If *value* is not specified, returns the current secondary x-axis configuration.
        @param {Object} *value*
        @chainable
    */
    Plot.prototype.x2Config = function x2Config (_) {
      return arguments.length ? (this._x2Config = d3plusCommon.assign(this._x2Config, _), this) : this._x2Config;
    };

    /**
        @memberof Plot
        @desc Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
        @param {Array} *value*
        @chainable
    */
    Plot.prototype.xDomain = function xDomain (_) {
      return arguments.length ? (this._xDomain = _, this) : this._xDomain;
    };

    /**
         @memberof Plot
         @desc Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
         @param {Array} *value*
         @chainable
     */
    Plot.prototype.x2Domain = function x2Domain (_) {
      return arguments.length ? (this._x2Domain = _, this) : this._x2Domain;
    };

    /**
        @memberof Plot
        @desc Defines a custom sorting comparitor function to be used for discrete x axes.
        @param {Function} *value*
        @chainable
    */
    Plot.prototype.xSort = function xSort (_) {
      return arguments.length ? (this._xSort = _, this) : this._xSort;
    };

    /**
         @memberof Plot
         @desc Defines a custom sorting comparitor function to be used for discrete x2 axes.
         @param {Function} *value*
         @chainable
     */
    Plot.prototype.x2Sort = function x2Sort (_) {
      return arguments.length ? (this._x2Sort = _, this) : this._x2Sort;
    };

    /**
        @memberof Plot
        @desc Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.
        @param {Function|Number} *value*
        @chainable
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
         @desc Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.
         @param {Function|Number} *value*
         @chainable
     */
    Plot.prototype.y2 = function y2 (_) {
      if (arguments.length) {
        if (typeof _ === "function") { this._y2 = _; }
        else {
          this._y2 = d3plusCommon.accessor(_);
          if (!this._aggs[_] && this._discrete === "y2") {
            this._aggs[_] = function (a) {
              var v = Array.from(new Set(a));
              return v.length === 1 ? v[0] : v;
            };
          }
        }
        return this;
      }
      else { return this._y2; }
    };

    /**
        @memberof Plot
        @desc Sets the config method for the y-axis. If *value* is not specified, returns the current y-axis configuration.

  *Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
        @param {Object} *value*
        @chainable
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
        @desc Sets the config method for the secondary y-axis. If *value* is not specified, returns the current secondary y-axis configuration.
        @param {Object} *value*
        @chainable
    */
    Plot.prototype.y2Config = function y2Config (_) {
      return arguments.length ? (this._y2Config = d3plusCommon.assign(this._y2Config, _), this) : this._y2Config;
    };

    /**
        @memberof Plot
        @desc Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
        @param {Array} *value*
        @chainable
    */
    Plot.prototype.yDomain = function yDomain (_) {
      return arguments.length ? (this._yDomain = _, this) : this._yDomain;
    };

    /**
         @memberof Plot
         @desc Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
         @param {Array} *value*
         @chainable
     */
    Plot.prototype.y2Domain = function y2Domain (_) {
      return arguments.length ? (this._y2Domain = _, this) : this._y2Domain;
    };

    /**
        @memberof Plot
        @desc Defines a custom sorting comparitor function to be used for discrete y axes.
        @param {Function} *value*
        @chainable
    */
    Plot.prototype.ySort = function ySort (_) {
      return arguments.length ? (this._ySort = _, this) : this._ySort;
    };

    /**
         @memberof Plot
         @desc Defines a custom sorting comparitor function to be used for discrete y2 axes.
         @param {Function} *value*
         @chainable
     */
    Plot.prototype.y2Sort = function y2Sort (_) {
      return arguments.length ? (this._y2Sort = _, this) : this._y2Sort;
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
      @desc Creates a bar chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .baseline(0)
    .discrete("x")
    .shape("Bar")
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
      @class BumpChart
      @extends Plot
      @desc Creates a bump chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Line")
    .x("x")
    .y2(d => this._y(d))
    .yConfig({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const startData = data.filter(d => d.x === xDomain[0]);
        const d = startData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .y2Config({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const endData = data.filter(d => d.x === xDomain[xDomain.length - 1]);
        const d = endData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .ySort((a, b) => b.y - a.y)
    .y2Sort((a, b) => b.y - a.y)
  */
  var BumpChart = (function (Plot$$1) {
    function BumpChart() {
      var this$1 = this;


      Plot$$1.call(this);
      this._discrete = "x";
      this._shape = d3plusCommon.constant("Line");
      this.x("x");
      this.y2(function (d) { return this$1._y(d); });

      this.yConfig({
        tickFormat: function (val) {
          var data = this$1._formattedData;
          var xMin = data[0].x instanceof Date ? data[0].x.getTime() : data[0].x;
          var startData = data.filter(function (d) { return (d.x instanceof Date ? d.x.getTime() : d.x) === xMin; });
          var d = startData.find(function (d) { return d.y === val; });
          return d ? this$1._drawLabel(d, d.i) : "";
        }
      });
      this.y2Config({
        tickFormat: function (val) {
          var data = this$1._formattedData;
          var xMax = data[data.length - 1].x instanceof Date ? data[data.length - 1].x.getTime() : data[data.length - 1].x;
          var endData = data.filter(function (d) { return (d.x instanceof Date ? d.x.getTime() : d.x) === xMax; });
          var d = endData.find(function (d) { return d.y === val; });
          return d ? this$1._drawLabel(d, d.i) : "";
        }
      });
      this.ySort(function (a, b) { return this$1._y(b) - this$1._y(a); });
      this.y2Sort(function (a, b) { return this$1._y(b) - this$1._y(a); });
    }

    if ( Plot$$1 ) BumpChart.__proto__ = Plot$$1;
    BumpChart.prototype = Object.create( Plot$$1 && Plot$$1.prototype );
    BumpChart.prototype.constructor = BumpChart;

    return BumpChart;
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
  new d3plus.AreaPlot()
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
  exports.BumpChart = BumpChart;
  exports.LinePlot = LinePlot;
  exports.Plot = Plot;
  exports.StackedArea = StackedArea;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-plot.js.map
