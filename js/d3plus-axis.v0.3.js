/*
  d3plus-axis v0.3.31
  Beautiful javascript scales and axes.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-scale'), require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-text')) :
	typeof define === 'function' && define.amd ? define('d3plus-axis', ['exports', 'd3-array', 'd3-scale', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3plus-shape', 'd3plus-text'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3Array,global.scales,global.d3Selection,global.d3Transition,global.d3plusCommon,global.shapes,global.d3plusText));
}(this, (function (exports,d3Array,scales,d3Selection,d3Transition,d3plusCommon,shapes,d3plusText) { 'use strict';

/**
    @function date
    @summary Parses numbers and strings to valid Javascript Date objects.
    @description Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.
    @param {Number|String} *date*
*/
var date = function(d) {

  // returns if already Date object
  if (d.constructor === Date) { return d; }
  // detects if milliseconds
  else if (d.constructor === Number && ("" + d).length > 5 && d % 1 === 0) { return new Date(d); }

  var s = "" + d;
  var dayFormat = new RegExp(/^\d{1,2}[./-]\d{1,2}[./-](-*\d{1,4})$/g).exec(s),
        strFormat = new RegExp(/^[A-z]{1,3} [A-z]{1,3} \d{1,2} (-*\d{1,4}) \d{1,2}:\d{1,2}:\d{1,2} [A-z]{1,3}-*\d{1,4} \([A-z]{1,3}\)/g).exec(s);

  // tests for XX/XX/XXXX format
  if (dayFormat) {
    var year = dayFormat[1];
    if (year.indexOf("-") === 0) { s = s.replace(year, year.substr(1)); }
    var date = new Date(s);
    date.setFullYear(year);
    return date;
  }
  // tests for full Date object string format
  else if (strFormat) {
    var year$1 = strFormat[1];
    if (year$1.indexOf("-") === 0) { s = s.replace(year$1, year$1.substr(1)); }
    var date$1 = new Date(s);
    date$1.setFullYear(year$1);
    return date$1;
  }
  // detects if only passing a year value
  else if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
    var date$2 = new Date((s + "/01/01"));
    date$2.setFullYear(d);
    return date$2;
  }
  // parses string to Date object
  else { return new Date(s); }

};

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Axis
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data.
*/
var Axis = (function (BaseClass$$1) {
  function Axis() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._align = "middle";
    this._barConfig = {
      "stroke": "#000",
      "stroke-width": 1
    };
    this._domain = [0, 10];
    this._duration = 600;
    this._gridConfig = {
      "stroke": "#ccc",
      "stroke-width": 1
    };
    this._height = 400;
    this.orient("bottom");
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._paddingInner = 0.1;
    this._paddingOuter = 0.1;
    this._scale = "linear";
    this._shape = "Line";
    this._shapeConfig = {
      fill: "#000",
      height: function (d) { return d.tick ? 8 : 0; },
      label: function (d) { return d.text; },
      labelBounds: function (d) { return d.labelBounds; },
      labelConfig: {
        fontColor: "#000",
        fontFamily: new d3plusText.TextBox().fontFamily(),
        fontResize: false,
        fontSize: d3plusCommon.constant(10),
        textAnchor: function () { return this$1._orient === "left" ? "end" : this$1._orient === "right" ? "start" : "middle"; },
        verticalAlign: function () { return this$1._orient === "bottom" ? "top" : this$1._orient === "top" ? "bottom" : "middle"; }
      },
      labelPadding: 0,
      r: function (d) { return d.tick ? 4 : 0; },
      stroke: "#000",
      strokeWidth: 1,
      width: function (d) { return d.tick ? 8 : 0; }
    };
    this._tickSize = 5;
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13,
      textAnchor: "middle"
    };
    this._width = 400;

  }

  if ( BaseClass$$1 ) Axis.__proto__ = BaseClass$$1;
  Axis.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Axis.prototype.constructor = Axis;

  /**
      @memberof Axis
      @desc Sets positioning for the axis bar.
      @param {D3Selection} *bar*
      @private
  */
  Axis.prototype._barPosition = function _barPosition (bar) {

    var ref = this._position;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var opposite = ref.opposite;
    var domain = this._d3Scale.domain(),
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

    bar
      .call(d3plusCommon.attrize, this._barConfig)
      .attr((x + "1"), this._d3Scale(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0))
      .attr((x + "2"), this._d3Scale(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0))
      .attr((y + "1"), position)
      .attr((y + "2"), position);

  };

  /**
      @memberof Axis
      @desc Sets positioning for the grid lines.
      @param {D3Selection} *lines*
      @private
  */
  Axis.prototype._gridPosition = function _gridPosition (lines, last) {
    if ( last === void 0 ) last = false;

    var ref = this._position;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var opposite = ref.opposite;
    var offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? offset : -offset,
          xDiff = this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0,
          xPos = function (d) { return scale(d.id) + xDiff; };
    lines
      .call(d3plusCommon.attrize, this._gridConfig)
      .attr((x + "1"), xPos)
      .attr((x + "2"), xPos)
      .attr((y + "1"), position)
      .attr((y + "2"), last ? position : position + size);
  };

  /**
      @memberof Axis
      @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  Axis.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) {
      this.select(d3Selection.select("body").append("svg")
        .attr("width", ((this._width) + "px"))
        .attr("height", ((this._height) + "px"))
        .node());
    }

    if (this._lineHeight === void 0) {
      this._lineHeight = function (d, i) { return this$1._shapeConfig.labelConfig.fontSize(d, i) * 1.1; };
    }

    var ref = this._position;
    var width = ref.width;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var horizontal = ref.horizontal;
    var opposite = ref.opposite;
    var clipId = "d3plus-Axis-clip-" + (this._uuid),
          flip = ["top", "left"].includes(this._orient),
          p = this._padding,
          parent = this._select,
          t = d3Transition.transition().duration(this._duration);

    var range$$1 = this._range ? this._range.slice() : [undefined, undefined];
    if (range$$1[0] === void 0) { range$$1[0] = p; }
    if (range$$1[1] === void 0) { range$$1[1] = this[("_" + width)] - p; }
    this._size = range$$1[1] - range$$1[0];
    if (this._scale === "ordinal" && this._domain.length > range$$1.length) {
      range$$1 = d3Array.range(this._domain.length).map(function (d) { return this$1._size * (d / (this$1._domain.length - 1)) + range$$1[0]; });
    }

    this._margin = {top: 0, right: 0, bottom: 0, left: 0};

    if (this._title) {
      var lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = d3plusText.textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(this._size)
              .height(this[("_" + height)] - this._tickSize - p)
              (this._title);
      this._margin[this._orient] = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[("scale" + (this._scale.charAt(0).toUpperCase()) + (this._scale.slice(1)))]()
      .domain(this._scale === "time" ? this._domain.map(date) : this._domain);

    if (this._d3Scale.rangeRound) { this._d3Scale.rangeRound(range$$1); }
    else { this._d3Scale.range(range$$1); }

    if (this._d3Scale.round) { this._d3Scale.round(true); }
    if (this._d3Scale.paddingInner) { this._d3Scale.paddingInner(this._paddingInner); }
    if (this._d3Scale.paddingOuter) { this._d3Scale.paddingOuter(this._paddingOuter); }

    var tickScale = scales.scaleSqrt().domain([10, 400]).range([10, this._gridSize === 0 ? 50 : 75]);

    var ticks = this._ticks
              ? this._scale === "time" ? this._ticks.map(date) : this._ticks
              : this._d3Scale.ticks
              ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
              : this._domain;

    var labels = this._labels
               ? this._scale === "time" ? this._labels.map(date) : this._labels
               : this._d3Scale.ticks
               ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
               : ticks;


    ticks = ticks.slice();
    labels = labels.slice();

    var tickFormat = this._tickFormat ? this._tickFormat : this._d3Scale.tickFormat
                     ? this._d3Scale.tickFormat(labels.length - 1)
                     : function (d) { return d; };

    if (this._scale === "time") {
      ticks = ticks.map(Number);
      labels = labels.map(Number);
    }

    ticks = ticks.sort(function (a, b) { return this$1._d3Scale(a) - this$1._d3Scale(b); });
    labels = labels.sort(function (a, b) { return this$1._d3Scale(a) - this$1._d3Scale(b); });

    var tickSize = this._shape === "Circle" ? this._shapeConfig.r
                   : this._shape === "Rect" ? this._shapeConfig[width]
                   : this._shapeConfig.strokeWidth;

    var tickGet = typeof tickSize !== "function" ? function () { return tickSize; } : tickSize;

    var pixels = [];
    this._availableTicks = ticks;
    ticks.forEach(function (d, i) {
      var s = tickGet({id: d, tick: true}, i);
      if (this$1._shape === "Circle") { s *= 2; }
      var t = this$1._d3Scale(d);
      if (!pixels.length || Math.abs(d3plusCommon.closest(t, pixels) - t) > s * 2) { pixels.push(t); }
      else { pixels.push(false); }
    });
    ticks = ticks.filter(function (d, i) { return pixels[i] !== false; });

    this._visibleTicks = ticks;

    var hBuff = this._shape === "Circle"
              ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) : this._shapeConfig.r
              : this._shape === "Rect"
              ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
              : this._tickSize,
        wBuff = tickGet({tick: true});

    if (typeof hBuff === "function") { hBuff = d3Array.max(ticks.map(hBuff)); }
    if (this._shape === "Rect") { hBuff /= 2; }
    if (typeof wBuff === "function") { wBuff = d3Array.max(ticks.map(wBuff)); }
    if (this._shape !== "Circle") { wBuff /= 2; }

    if (this._scale === "band") {
      this._space = this._d3Scale.bandwidth();
    }
    else if (labels.length > 1) {
      this._space = 0;
      for (var i = 0; i < labels.length - 1; i++) {
        var s = this$1._d3Scale(labels[i + 1]) - this$1._d3Scale(labels[i]);
        if (s > this$1._space) { this$1._space = s; }
      }
    }
    else { this._space = this._size; }

    // Measures size of ticks
    var textData = labels.map(function (d, i) {

      var f = this$1._shapeConfig.labelConfig.fontFamily(d, i),
            s = this$1._shapeConfig.labelConfig.fontSize(d, i);

      var lh = this$1._shapeConfig.lineHeight ? this$1._shapeConfig.lineHeight(d, i) : s * 1.1;

      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(horizontal ? this$1._space * 2 : this$1._width - hBuff - p)
        .height(horizontal ? this$1._height - hBuff - p : this$1._space * 2)
        (tickFormat(d));

      res.lines = res.lines.filter(function (d) { return d !== ""; });
      res.d = d;
      res.fS = s;
      res.width = res.lines.length
        ? Math.ceil(d3Array.max(res.lines.map(function (line) { return d3plusText.textWidth(line, {"font-family": f, "font-size": s}); }))) + s / 4
        : 0;
      res.height = res.lines.length ? Math.ceil(res.lines.length * (lh + 1)) : 0;
      res.offset = 0;
      if (res.width % 2) { res.width++; }

      return res;

    });

    textData.forEach(function (d, i) {
      if (i) {
        var prev = textData[i - 1];
        if (!prev.offset && this$1._d3Scale(d.d) - d[width] / 2 < this$1._d3Scale(prev.d) + prev[width] / 2) {
          d.offset = prev[height] + this$1._padding;
        }
      }
    });

    var maxOffset = d3Array.max(textData, function (d) { return d.offset; });
    if (maxOffset) {
      textData.forEach(function (d) {
        if (d.offset) {
          d.offset = maxOffset;
          d[height] += maxOffset;
        }
      });
    }

    // Calculates new range, based on any text that may be overflowing.
    var rangeOuter = range$$1.slice();
    var lastI = range$$1.length - 1;
    if (this._scale !== "band" && textData.length) {

      var first = textData[0],
            last = textData[textData.length - 1];

      var firstB = d3Array.min([this._d3Scale(first.d) - first[width] / 2, range$$1[0] - wBuff]);
      if (firstB < range$$1[0]) {
        var d = range$$1[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          this._size -= d;
          range$$1[0] += d;
        }
        else if (this._range) {
          rangeOuter[0] -= d;
        }
      }

      var lastB = d3Array.max([this._d3Scale(last.d) + last[width] / 2, range$$1[lastI] + wBuff]);
      if (lastB > range$$1[lastI]) {
        var d$1 = lastB - range$$1[lastI];
        if (this._range === void 0 || this._range[lastI] === void 0) {
          this._size -= d$1;
          range$$1[lastI] -= d$1;
        }
        else if (this._range) {
          rangeOuter[lastI] += d$1;
        }
      }

      if (range$$1.length > 2) { range$$1 = d3Array.range(this._domain.length).map(function (d) { return this$1._size * (d / (range$$1.length - 1)) + range$$1[0]; }); }
      range$$1 = range$$1.map(Math.round);
      if (this._d3Scale.rangeRound) { this._d3Scale.rangeRound(range$$1); }
      else { this._d3Scale.range(range$$1); }

    }

    if (this._scale === "band") {
      this._space = this._d3Scale.bandwidth();
    }
    else if (labels.length > 1) {
      this._space = 0;
      for (var i$1 = 0; i$1 < labels.length - 1; i$1++) {
        var s$1 = this$1._d3Scale(labels[i$1 + 1]) - this$1._d3Scale(labels[i$1]);
        if (s$1 > this$1._space) { this$1._space = s$1; }
      }
    }
    else { this._space = this._size; }

    var tBuff = this._shape === "Line" ? 0 : hBuff;
    this._outerBounds = ( obj = {}, obj[height] = (d3Array.max(textData, function (t) { return t[height]; }) || 0) + (textData.length ? p : 0), obj[width] = rangeOuter[lastI] - rangeOuter[0], obj[x] = rangeOuter[0], obj );
    var obj;

    this._margin[opposite] = this._gridSize !== void 0 ? d3Array.max([this._gridSize, tBuff]) : this[("_" + height)] - this._margin[this._orient] - this._outerBounds[height] - p * 2 - hBuff;
    this._margin[this._orient] += hBuff;
    this._outerBounds[height] += this._margin[opposite] + this._margin[this._orient];
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[("_" + height)] - this._outerBounds[height] - this._padding
                         : this[("_" + height)] / 2 - this._outerBounds[height] / 2;

    var group = d3plusCommon.elem(("g#d3plus-Axis-" + (this._uuid)), {parent: parent});
    this._group = group;

    var grid = d3plusCommon.elem("g.grid", {parent: group}).selectAll("line")
      .data((this._gridSize !== 0 ? this._grid || ticks : []).map(function (d) { return ({id: d}); }), function (d) { return d.id; });

    grid.exit().transition(t)
      .attr("opacity", 0)
      .call(this._gridPosition.bind(this))
      .remove();

    grid.enter().append("line")
        .attr("opacity", 0)
        .attr("clip-path", ("url(#" + clipId + ")"))
        .call(this._gridPosition.bind(this), true)
      .merge(grid).transition(t)
        .attr("opacity", 1)
        .call(this._gridPosition.bind(this));

    var labelHeight = d3Array.max(textData, function (t) { return t.height; }) || 0,
          labelWidth = horizontal ? this._space : this._outerBounds.width - this._margin[this._position.opposite] - hBuff - this._margin[this._orient] + p;

    var tickData = ticks
      .concat(labels.filter(function (d, i) { return textData[i].lines.length && !ticks.includes(d); }))
      .map(function (d, i, arr) {
        var data = textData.filter(function (td) { return td.d === d; });
        var labelOffset = data.length ? data[0].offset : 0;
        var inline = false;
        if (i) {
          var prev = textData.filter(function (td) { return td.d === arr[i - 1]; });
          if (prev.length && prev[0].offset === labelOffset) { inline = true; }
        }
        if (i < arr.length - 1) {
          var next = textData.filter(function (td) { return td.d === arr[i + 1]; });
          if (next.length && next[0].offset === labelOffset) { inline = true; }
        }
        var offset = this$1._margin[opposite],
              position = flip ? this$1._outerBounds[y] + this$1._outerBounds[height] - offset : this$1._outerBounds[y] + offset,
              size = (hBuff + labelOffset) * (flip ? -1 : 1);

        var space = inline ? labelWidth : labelWidth * 1.9;

        return ( obj = {
          id: d,
          labelBounds: {
            x: horizontal ? -space / 2 : this$1._orient === "left" ? -space - p + size : size + p,
            y: horizontal ? this$1._orient === "bottom" ? size + p : size - p - labelHeight : -labelHeight / 2,
            width: space,
            height: labelHeight
          },
          size: ticks.includes(d) ? size : 0,
          text: labels.includes(d) ? tickFormat(d) : false,
          tick: ticks.includes(d)
        }, obj[x] = this$1._d3Scale(d) + (this$1._scale === "band" ? this$1._d3Scale.bandwidth() / 2 : 0), obj[y] = position, obj );
        var obj;
      });

    if (this._shape === "Line") {
      tickData = tickData.concat(tickData.map(function (d) {
        var dupe = Object.assign({}, d);
        dupe[y] += d.size;
        return dupe;
      }));
    }

    new shapes[this._shape]()
      .data(tickData)
      .duration(this._duration)
      .labelConfig({
        ellipsis: function (d) { return d && d.length ? (d + "...") : ""; }
      })
      .select(d3plusCommon.elem("g.ticks", {parent: group}).node())
      .config(this._shapeConfig)
      .render();

    var bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(t)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    new d3plusText.TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(this._outerBounds.height)
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(d3plusCommon.elem("g.d3plus-Axis-title", {parent: group}).node())
      .text(function (d) { return d.text; })
      .textAnchor("middle")
      .verticalAlign(this._orient === "bottom" ? "bottom" : "top")
      .width(this._outerBounds[width])
      .x(horizontal ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._margin[this._orient] / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._margin[this._orient] / 2 - this._outerBounds[width] / 2)
      .y(horizontal ? this._outerBounds.y : this._outerBounds.y - this._margin[this._orient] / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    this._lastScale = this._d3Scale;

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  Axis.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.barConfig = function barConfig (_) {
    return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
      @chainable
  */
  Axis.prototype.domain = function domain (_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  Axis.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.grid = function grid (_) {
    return arguments.length ? (this._grid = _, this) : this._grid;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.gridConfig = function gridConfig (_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.
      @param {Number} [*value* = undefined]
      @chainable
  */
  Axis.prototype.gridSize = function gridSize (_) {
    return arguments.length ? (this._gridSize = _, this) : this._gridSize;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  Axis.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.labels = function labels (_) {
    return arguments.length ? (this._labels = _, this) : this._labels;
  };

  /**
      @memberof Axis
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
      @chainable
  */
  Axis.prototype.orient = function orient (_) {
    if (arguments.length) {

      var horizontal = ["top", "bottom"].includes(_),
            opps = {top: "bottom", right: "left", bottom: "top", left: "right"};

      this._position = {
        horizontal: horizontal,
        width: horizontal ? "width" : "height",
        height: horizontal ? "height" : "width",
        x: horizontal ? "x" : "y",
        y: horizontal ? "y" : "x",
        opposite: opps[_]
      };

      return this._orient = _, this;

    }
    return this._orient;
  };

  /**
      @memberof Axis
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Axis.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  Axis.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  Axis.prototype.paddingInner = function paddingInner (_) {
    return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  Axis.prototype.paddingOuter = function paddingOuter (_) {
    return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.range = function range$$1 (_) {
    return arguments.length ? (this._range = _, this) : this._range;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
      @chainable
  */
  Axis.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  };

  /**
      @memberof Axis
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Axis.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.
      @param {String} [*value* = "Line"]
      @chainable
  */
  Axis.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = _, this) : this._shape;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).
      @param {Function} [*value*]
      @chainable
  */
  Axis.prototype.tickFormat = function tickFormat (_) {
    return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.ticks = function ticks (_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
      @chainable
  */
  Axis.prototype.tickSize = function tickSize (_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
      @chainable
  */
  Axis.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  Axis.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Axis;
}(d3plusCommon.BaseClass));

/**
    @class AxisBottom
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisBottom = (function (Axis$$1) {
  function AxisBottom() {
    Axis$$1.call(this);
    this.orient("bottom");
  }

  if ( Axis$$1 ) AxisBottom.__proto__ = Axis$$1;
  AxisBottom.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  AxisBottom.prototype.constructor = AxisBottom;

  return AxisBottom;
}(Axis));

/**
    @class AxisLeft
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisLeft = (function (Axis$$1) {
  function AxisLeft() {
    Axis$$1.call(this);
    this.orient("left");
  }

  if ( Axis$$1 ) AxisLeft.__proto__ = Axis$$1;
  AxisLeft.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  AxisLeft.prototype.constructor = AxisLeft;

  return AxisLeft;
}(Axis));

/**
    @class AxisRight
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisRight = (function (Axis$$1) {
  function AxisRight() {
    Axis$$1.call(this);
    this.orient("right");
  }

  if ( Axis$$1 ) AxisRight.__proto__ = Axis$$1;
  AxisRight.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  AxisRight.prototype.constructor = AxisRight;

  return AxisRight;
}(Axis));

/**
    @class AxisTop
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisTop = (function (Axis$$1) {
  function AxisTop() {
    Axis$$1.call(this);
    this.orient("top");
  }

  if ( Axis$$1 ) AxisTop.__proto__ = Axis$$1;
  AxisTop.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  AxisTop.prototype.constructor = AxisTop;

  return AxisTop;
}(Axis));

exports.Axis = Axis;
exports.AxisBottom = AxisBottom;
exports.AxisLeft = AxisLeft;
exports.AxisRight = AxisRight;
exports.AxisTop = AxisTop;
exports.date = date;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-axis.js.map
