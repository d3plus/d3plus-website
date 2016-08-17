/*
  d3plus-axis v0.1.0
  Beautiful javascript scales and axes.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3plus-text'), require('d3-array'), require('d3-scale'), require('d3-selection'), require('d3-transition')) :
  typeof define === 'function' && define.amd ? define('d3plus-axis', ['exports', 'd3plus-common', 'd3plus-text', 'd3-array', 'd3-scale', 'd3-selection', 'd3-transition'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3plusText,global.d3Array,global.scales,global.d3Selection,global.d3Transition));
}(this, (function (exports,d3plusCommon,d3plusText,d3Array,scales,d3Selection,d3Transition) { 'use strict';

/**
    @class Axis
    @extends BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var Axis = (function (BaseClass) {
  function Axis() {

    BaseClass.call(this);

    this._align = "middle";
    this._domain = [0, 10];
    this._duration = 600;
    this._height = 100;
    this.orient("bottom");
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._scale = "linear";
    this._strokeWidth = 1;
    this._textBoxConfig = {
      fontFamily: new d3plusText.TextBox().fontFamily(),
      fontResize: false,
      fontSize: d3plusCommon.constant(10)
    };
    this._tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
    this._tickSize = 5;
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13,
      textAnchor: "middle"
    };
    this._width = 400;

  }

  if ( BaseClass ) Axis.__proto__ = BaseClass;
  Axis.prototype = Object.create( BaseClass && BaseClass.prototype );
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
    var position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] : this._outerBounds[y];
    bar
      .attr((x + "1"), this._d3Scale(this._d3Scale.domain()[0]))
      .attr((x + "2"), this._d3Scale(this._d3Scale.domain()[1]))
      .attr((y + "1"), position)
      .attr((y + "2"), position);
  };

  /**
      @memberof Axis
      @desc Sets positioning for the clip rectangle.
      @param {D3Selection} *click*
      @private
  */
  Axis.prototype._clipPosition = function _clipPosition (clip) {
    var ref = this._position;
    var width = ref.width;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var d = this._d3Scale.domain(),
          p = this._strokeWidth,
          s = this._d3Scale(d[1]) - this._d3Scale(d[0]);
    var position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - this._tickSize : this._outerBounds[y];
    clip
      .attr(x, this._d3Scale(this._d3Scale.domain()[0]) - p)
      .attr(y, position)
      .attr(width, s + p * 2)
      .attr(height, this._tickSize + p);
  };

  /**
      @memberof Axis
      @desc Sets positioning for the axis ticks.
      @param {D3Selection} *ticks*
      @private
  */
  Axis.prototype._tickPosition = function _tickPosition (ticks, last) {
    if ( last === void 0 ) last = false;

    var ref = this._position;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] : this._outerBounds[y],
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? -this._tickSize : this._tickSize;
    ticks
      .attr("stroke-width", this._strokeWidth)
      .attr((x + "1"), function (d) { return scale(d.id); })
      .attr((x + "2"), function (d) { return scale(d.id); })
      .attr((y + "1"), position)
      .attr((y + "2"), last ? position : position + size);
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  Axis.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the legend and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
  */
  Axis.prototype.domain = function domain (_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
  */
  Axis.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  Axis.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Axis
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
  */
  Axis.prototype.orient = function orient (_) {
    if (arguments.length) {
      var horizontal = ["top", "bottom"].includes(_);
      this._position = {
        width: horizontal ? "width" : "height",
        height: horizontal ? "height" : "width",
        x: horizontal ? "x" : "y",
        y: horizontal ? "y" : "x"
      };
      return this._orient = _, this;
    }
    return this._orient;
  };

  /**
      @memberof Axis
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Axis.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  Axis.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the legend and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
  */
  Axis.prototype.range = function range (_) {
    return arguments.length ? (this._range = _, this) : this._range;
  };

  /**
      @memberof Axis
      @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  Axis.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node());

    var t = d3Transition.transition().duration(this._duration);

    if (this._lineHeight === void 0) this._lineHeight = function (d, i) { return this$1._textBoxConfig.fontSize(d, i) * 1.1; };

    var ref = this._position;
    var width = ref.width;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;

    var clipId = "d3plus-ShapeLegend-clip-" + (this._uuid),
          p = this._padding;

    var range = this._range ? this._range.slice() : [undefined, undefined];
    if (range[0] === void 0) range[0] = p;
    if (range[1] === void 0) range[1] = this[("_" + width)] - p;
    var size = range[1] - range[0];

    this._titleHeight = 0;
    if (this._title) {
      var lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = d3plusText.textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(size)
              .height(this._height - this._tickSize - p)
              (this._title);
      this._titleHeight = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[("scale" + (this._scale.charAt(0).toUpperCase()) + (this._scale.slice(1)))]()
      .domain(this._domain)
      .rangeRound(range);

    var ticks = this._ticks || this._d3Scale.ticks(Math.floor(size / this._tickScale(size)));
    var tickFormat = this._d3Scale.tickFormat(ticks.length - 1);
    if (!this._ticks) ticks = ticks.map(tickFormat).map(Number);
    var values = this._tickLabels || ticks;

    var space = 0;
    if (values.length > 1) {
      for (var i = 0; i < values.length; i++) {
        var s = this$1._d3Scale(values[i + 1]) - this$1._d3Scale(values[i]);
        if (s > space) space = s;
      }
    }
    else space = size;

    var textData = values.map(function (d, i) {

      var f = this$1._textBoxConfig.fontFamily(d, i),
            s = this$1._textBoxConfig.fontSize(d, i);

      var lh = this$1._textBoxConfig.lineHeight ? this$1._textBoxConfig.lineHeight(d, i) : s * 1.1;

      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(space)
        .height(this$1._height - this$1._tickSize - p)
        (d);

      res.lines = res.lines.filter(function (d) { return d !== ""; });
      res.d = d;
      res.fS = s;
      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); })));
      res.height = Math.ceil(res.lines.length * (lh + 1));
      if (res.width % 2) res.width++;

      return res;

    });

    var rangeInit = range.slice();
    if (textData.length) {

      var first = textData[0],
            last = textData[textData.length - 1];

      var firstB = this._d3Scale(first.d) - first[width] / 2 - p;
      if (firstB < range[0]) {
        var d = range[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          size -= d;
          range[0] += d;
        }
        else if (this._range) {
          rangeInit[0] -= d;
        }
      }

      var lastB = this._d3Scale(last.d) + last[width] / 2 + p;
      if (lastB > range[1]) {
        var d$1 = lastB - range[1];
        if (this._range === void 0 || this._range[1] === void 0) {
          size -= d$1;
          range[1] -= d$1;
        }
        else if (this._range) {
          rangeInit[1] += d$1;
        }
      }

      this._d3Scale.rangeRound(range);

    }

    var tPad = textData.length ? p * 2 : 0;
    var obj;
    this._outerBounds = ( obj = {}, obj[height] = this._titleHeight + this._tickSize + (d3Array.max(textData, function (t) { return t[height]; }) || 0) + tPad, obj[width] = rangeInit[1] - rangeInit[0], obj[x] = rangeInit[0], obj );
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[("_" + height)] - this._outerBounds[height]
                         : this[("_" + height)] / 2 - this._outerBounds[height] / 2;

    var group = this._select.selectAll(("g#d3plus-Axis-" + clipId))
      .data([0]);

    group = group.enter().append("g")
        .attr("id", ("d3plus-Axis-" + clipId))
      .merge(group);

    var defs = group.selectAll("defs").data([null]);
    defs = defs.enter().append("defs").merge(defs);

    var clip = defs.selectAll(("clipPath#" + clipId)).data([null]);
    clip = clip.enter().append("clipPath")
        .attr("id", clipId)
      .merge(clip);

    var axisClip = clip.selectAll("rect").data([null]);
    axisClip.enter().append("rect")
      .call(this._clipPosition.bind(this))
      .merge(axisClip).transition(t)
        .call(this._clipPosition.bind(this));

    var bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("stroke", "#000")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(t)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    var lines = group.selectAll("line.tick").data(ticks.map(function (d) { return ({id: d}); }), function (d) { return d.id; });

    lines.exit().transition(t)
      .attr("opacity", 0)
      .call(this._tickPosition.bind(this))
      .remove();

    lines.enter().append("line")
        .attr("class", "tick")
        .attr("stroke", "#000")
        .attr("opacity", 0)
        .attr("clip-path", ("url(#" + clipId + ")"))
        .call(this._tickPosition.bind(this), true)
      .merge(lines).transition(t)
        .attr("opacity", 1)
        .call(this._tickPosition.bind(this));

    var maxTextHeight = d3Array.max(textData, function (t) { return t.height; }) || 0,
          maxTextWidth = d3Array.max(textData, function (t) { return t.width + t.fS; }) || 0;

    var titleGroup = group.selectAll("g.d3plus-Axis-title").data([null]);
    titleGroup = titleGroup.enter().append("g").attr("class", "d3plus-Axis-title").merge(titleGroup);

    new d3plusText.TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(this._outerBounds.height)
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(titleGroup.node())
      .text(function (d) { return d.text; })
      .textAnchor("middle")
      .verticalAlign(this._orient === "bottom" ? "bottom" : "top")
      .width(this._outerBounds[width])
      .x(["top", "bottom"].includes(this._orient) ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._titleHeight / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._titleHeight / 2 - this._outerBounds[width] / 2)
      .y(["top", "bottom"].includes(this._orient) ? this._outerBounds.y : this._outerBounds.y - this._titleHeight / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    var tickGroup = group.selectAll("g.d3plus-Axis-ticks").data([null]);
    tickGroup = tickGroup.enter().append("g").attr("class", "d3plus-Axis-ticks").merge(tickGroup);

    new d3plusText.TextBox()
      .data(values.filter(function (d, i) { return textData[i].lines.length; }).map(function (d) { return ({id: d}); }))
      .duration(this._duration)
      .height(maxTextHeight)
      .select(tickGroup.node())
      .text(function (d) { return tickFormat(d.id); })
      .textAnchor(this._orient === "left" ? "end" : this._orient === "right" ? "start" : "middle")
      .verticalAlign(this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle")
      .width(maxTextWidth)
      .x(function (d, i) {
        if (["top", "bottom"].includes(this$1._orient)) return this$1._d3Scale(d.id) - maxTextWidth / 2;
        return this$1._orient === "left" ? this$1._titleHeight + this$1._outerBounds.x - this$1._textBoxConfig.fontSize(values[i], i) / 2 : this$1._outerBounds.x + this$1._tickSize + this$1._padding;
      })
      .y(function (d) {
        if (["left", "right"].includes(this$1._orient)) return this$1._d3Scale(d.id) - maxTextHeight / 2;
        return this$1._orient === "bottom" ? this$1._outerBounds.y + this$1._tickSize + p : this$1._titleHeight + this$1._outerBounds.y;
      })
      .config(this._textBoxConfig)
      .render();

    this._lastScale = this._d3Scale;

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the legend and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
  */
  Axis.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  };

  /**
      @memberof Axis
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  Axis.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  Axis.prototype.textBoxConfig = function textBoxConfig (_) {
    return arguments.length ? (this._textBoxConfig = Object.assign(this._textBoxConfig, _), this) : this._textBoxConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the legend and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
      @param {Array} [*value*]
  */
  Axis.prototype.tickLabels = function tickLabels (_) {
    return arguments.length ? (this._tickLabels = _, this) : this._tickLabels;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the legend and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
  */
  Axis.prototype.ticks = function ticks (_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the legend and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
  */
  Axis.prototype.tickSize = function tickSize (_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
  */
  Axis.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
  */
  Axis.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
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
var AxisBottom = (function (Axis) {
  function AxisBottom() {
    Axis.call(this);
    this._height = 100;
    this.orient("bottom");
    this._width = 400;
  }

  if ( Axis ) AxisBottom.__proto__ = Axis;
  AxisBottom.prototype = Object.create( Axis && Axis.prototype );
  AxisBottom.prototype.constructor = AxisBottom;

  return AxisBottom;
}(Axis));

/**
    @class AxisLeft
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisLeft = (function (Axis) {
  function AxisLeft() {
    Axis.call(this);
    this._height = 400;
    this.orient("left");
    this._width = 100;
  }

  if ( Axis ) AxisLeft.__proto__ = Axis;
  AxisLeft.prototype = Object.create( Axis && Axis.prototype );
  AxisLeft.prototype.constructor = AxisLeft;

  return AxisLeft;
}(Axis));

/**
    @class AxisRight
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisRight = (function (Axis) {
  function AxisRight() {
    Axis.call(this);
    this._height = 400;
    this.orient("right");
    this._width = 100;
  }

  if ( Axis ) AxisRight.__proto__ = Axis;
  AxisRight.prototype = Object.create( Axis && Axis.prototype );
  AxisRight.prototype.constructor = AxisRight;

  return AxisRight;
}(Axis));

/**
    @class AxisTop
    @extends Axis
    @desc Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
*/
var AxisTop = (function (Axis) {
  function AxisTop() {
    Axis.call(this);
    this._height = 100;
    this.orient("top");
    this._width = 400;
  }

  if ( Axis ) AxisTop.__proto__ = Axis;
  AxisTop.prototype = Object.create( Axis && Axis.prototype );
  AxisTop.prototype.constructor = AxisTop;

  return AxisTop;
}(Axis));

exports.Axis = Axis;
exports.AxisBottom = AxisBottom;
exports.AxisLeft = AxisLeft;
exports.AxisRight = AxisRight;
exports.AxisTop = AxisTop;

Object.defineProperty(exports, '__esModule', { value: true });

})));