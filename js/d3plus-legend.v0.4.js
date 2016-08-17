/*
  d3plus-legend v0.4.4
  A collection of chart legends and keys.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-selection'), require('d3-transition'), require('d3-array'), require('d3-scale'), require('d3plus-text'), require('d3-collection'), require('d3plus-shape')) :
  typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3plus-common', 'd3-selection', 'd3-transition', 'd3-array', 'd3-scale', 'd3plus-text', 'd3-collection', 'd3plus-shape'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Selection,global.d3Transition,global.d3Array,global.scales,global.d3plusText,global.d3Collection,global.d3plus));
}(this, function (exports,d3plusCommon,d3Selection,d3Transition,d3Array,scales,d3plusText,d3Collection,d3plus) { 'use strict';

  /**
      @class BaseLegend
      @class BaseClass
      @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */
  var BaseLegend = (function (BaseClass) {
    function BaseLegend() {

      BaseClass.call(this);

      this._duration = 600;
      this._height = 200;
      this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
      this._padding = 5;
      this._titleConfig = {
        fontFamily: "Verdana",
        fontSize: 12,
        lineHeight: 13,
        textAnchor: "middle"
      };
      this._width = 400;

    }

    if ( BaseClass ) BaseLegend.__proto__ = BaseClass;
    BaseLegend.prototype = Object.create( BaseClass && BaseClass.prototype );
    BaseLegend.prototype.constructor = BaseLegend;

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
        @param {Number} [*value* = 600]
    */
    BaseLegend.prototype.duration = function duration (_) {
      return arguments.length ? (this._duration = _, this) : this._duration;
    };

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
        @param {Number} [*value* = 100]
    */
    BaseLegend.prototype.height = function height (_) {
      return arguments.length ? (this._height = _, this) : this._height;
    };

    /**
        @memberof BaseLegend
        @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
        @example
  {"width": 180, "height": 24, "x": 10, "y": 20}
    */
    BaseLegend.prototype.outerBounds = function outerBounds () {
      return this._outerBounds;
    };

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
        @param {Number} [*value* = 10]
    */
    BaseLegend.prototype.padding = function padding (_) {
      return arguments.length ? (this._padding = _, this) : this._padding;
    };

    /**
        @memberof BaseLegend
        @desc Renders the current BaseLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
        @param {Function} [*callback* = undefined]
    */
    BaseLegend.prototype.render = function render (callback) {

      if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node());

      this._transition = d3Transition.transition().duration(this._duration);

      if (callback) setTimeout(callback, this._duration + 100);

      return this;

    };

    /**
        @memberof BaseLegend
        @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
        @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
    */
    BaseLegend.prototype.select = function select$1 (_) {
      return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
    };

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
        @param {String} [*value*]
    */
    BaseLegend.prototype.title = function title (_) {
      return arguments.length ? (this._title = _, this) : this._title;
    };

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
        @param {Object} [*value*]
    */
    BaseLegend.prototype.titleConfig = function titleConfig (_) {
      return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
    };

    /**
        @memberof BaseLegend
        @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
        @param {Number} [*value* = 400]
    */
    BaseLegend.prototype.width = function width (_) {
      return arguments.length ? (this._width = _, this) : this._width;
    };

    return BaseLegend;
  }(d3plusCommon.BaseClass));

  /**
      @class ScaleLegend
      @extends BaseLegend
      @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */
  var ScaleLegend = (function (BaseLegend) {
    function ScaleLegend() {

      BaseLegend.call(this);

      this._align = "middle";
      this._domain = [0, 10];
      this.orient("bottom");
      this._scale = "linear";
      this._strokeWidth = 1;
      this._textBoxConfig = {
        fontFamily: new d3plusText.TextBox().fontFamily(),
        fontResize: false,
        fontSize: d3plusCommon.constant(10)
      };
      this._tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
      this._tickSize = 5;

    }

    if ( BaseLegend ) ScaleLegend.__proto__ = BaseLegend;
    ScaleLegend.prototype = Object.create( BaseLegend && BaseLegend.prototype );
    ScaleLegend.prototype.constructor = ScaleLegend;

    /**
        @memberof ScaleLegend
        @desc Sets positioning for the axis bar.
        @param {D3Selection} *bar*
        @private
    */
    ScaleLegend.prototype._barPosition = function _barPosition (bar) {
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
        @memberof ScaleLegend
        @desc Sets positioning for the clip rectangle.
        @param {D3Selection} *click*
        @private
    */
    ScaleLegend.prototype._clipPosition = function _clipPosition (clip) {
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
        @memberof ScaleLegend
        @desc Sets positioning for the axis ticks.
        @param {D3Selection} *ticks*
        @private
    */
    ScaleLegend.prototype._tickPosition = function _tickPosition (ticks, last) {
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
        @memberof ScaleLegend
        @desc Renders the current ScaleLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
        @param {Function} [*callback* = undefined]
    */
    ScaleLegend.prototype.render = function render (callback) {
      var this$1 = this;


      BaseLegend.prototype.render.call(this, callback);

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

      var group = this._select.selectAll(("g#d3plus-ScaleLegend-" + clipId))
        .data([0]);

      group = group.enter().append("g")
          .attr("id", ("d3plus-ScaleLegend-" + clipId))
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
        .merge(axisClip).transition(this._transition)
          .call(this._clipPosition.bind(this));

      var bar = group.selectAll("line.bar").data([null]);

      bar.enter().append("line")
          .attr("class", "bar")
          .attr("stroke", "#000")
          .attr("opacity", 0)
          .call(this._barPosition.bind(this))
        .merge(bar).transition(this._transition)
          .attr("opacity", 1)
          .call(this._barPosition.bind(this));

      var lines = group.selectAll("line.tick").data(ticks.map(function (d) { return ({id: d}); }), function (d) { return d.id; });

      lines.exit().transition(this._transition)
        .attr("opacity", 0)
        .call(this._tickPosition.bind(this))
        .remove();

      lines.enter().append("line")
          .attr("class", "tick")
          .attr("stroke", "#000")
          .attr("opacity", 0)
          .attr("clip-path", ("url(#" + clipId + ")"))
          .call(this._tickPosition.bind(this), true)
        .merge(lines).transition(this._transition)
          .attr("opacity", 1)
          .call(this._tickPosition.bind(this));

      var maxTextHeight = d3Array.max(textData, function (t) { return t.height; }) || 0,
            maxTextWidth = d3Array.max(textData, function (t) { return t.width + t.fS; }) || 0;

      var titleGroup = group.selectAll("g.d3plus-scaleLegend-title").data([null]);
      titleGroup = titleGroup.enter().append("g").attr("class", "d3plus-scaleLegend-title").merge(titleGroup);

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

      var tickGroup = group.selectAll("g.d3plus-scaleLegend-ticks").data([null]);
      tickGroup = tickGroup.enter().append("g").attr("class", "d3plus-scaleLegend-ticks").merge(tickGroup);

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

      return this;

    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
        @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
    */
    ScaleLegend.prototype.align = function align (_) {
      return arguments.length ? (this._align = _, this) : this._align;
    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the scale domain of the legend and returns the current class instance. If *value* is not specified, returns the current scale domain.
        @param {Array} [*value* = [0, 10]]
    */
    ScaleLegend.prototype.domain = function domain (_) {
      return arguments.length ? (this._domain = _, this) : this._domain;
    };

    /**
        @memberof ScaleLegend
        @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
        @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
    */
    ScaleLegend.prototype.orient = function orient (_) {
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
        @memberof ScaleLegend
        @desc If *value* is specified, sets the scale range (in pixels) of the legend and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
        @param {Array} [*value*]
    */
    ScaleLegend.prototype.range = function range (_) {
      return arguments.length ? (this._range = _, this) : this._range;
    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the scale of the legend and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
        @param {String} [*value* = "linear"]
    */
    ScaleLegend.prototype.scale = function scale (_) {
      return arguments.length ? (this._scale = _, this) : this._scale;
    };

    /**
        @memberof ShapeLegend
        @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
        @param {Object} [*config* = {}]
    */
    ScaleLegend.prototype.textBoxConfig = function textBoxConfig (_) {
      return arguments.length ? (this._textBoxConfig = Object.assign(this._textBoxConfig, _), this) : this._textBoxConfig;
    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the visible tick labels of the legend and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
        @param {Array} [*value*]
    */
    ScaleLegend.prototype.tickLabels = function tickLabels (_) {
      return arguments.length ? (this._tickLabels = _, this) : this._tickLabels;
    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the tick values of the legend and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#ScaleLegend.domain) and the available [width](#ScaleLegend.width).
        @param {Array} [*value*]
    */
    ScaleLegend.prototype.ticks = function ticks (_) {
      return arguments.length ? (this._ticks = _, this) : this._ticks;
    };

    /**
        @memberof ScaleLegend
        @desc If *value* is specified, sets the tick size of the legend and returns the current class instance. If *value* is not specified, returns the current tick size.
        @param {Number} [*value* = 5]
    */
    ScaleLegend.prototype.tickSize = function tickSize (_) {
      return arguments.length ? (this._tickSize = _, this) : this._tickSize;
    };

    return ScaleLegend;
  }(BaseLegend));

  /**
      @class ShapeLegend
      @extends BaseLegend
      @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */
  var ShapeLegend = (function (BaseLegend) {
    function ShapeLegend() {
      var this$1 = this;


      BaseLegend.call(this);

      var s = new d3plus.Shape();

      this._align = "center";
      this._data = [];
      this._id = d3plusCommon.accessor("id");
      this._label = d3plusCommon.accessor("id");
      this._lineData = [];
      this._orient = "horizontal";
      this._shape = d3plusCommon.constant("Rect");
      this._shapeConfig = {
        duration: s.duration(),
        fill: d3plusCommon.accessor("color"),
        fontColor: d3plusCommon.constant("#444"),
        fontFamily: s.fontFamily(),
        fontSize: d3plusCommon.constant(10),
        height: d3plusCommon.constant(10),
        labelBounds: function (dd, i, s) {
          var d = this$1._lineData[dd.i],
                w = s.r !== void 0 ? s.r : s.width / 2;
          return {width: d.width, height: d.height, x: w + this$1._padding, y: 1 - d.height / 2};
        },
        opacity: 1,
        r: d3plusCommon.constant(5),
        width: d3plusCommon.constant(10),
        x: function (d, i) {
          var s = this$1._shapeConfig.width;
          if (this$1._orient === "vertical") return this$1._outerBounds.x + s(d, i) / 2;
          else {
            return this$1._outerBounds.x + d3Array.sum(this$1._data.slice(0, i).map(function (b, i) { return s(b, i); })) +
                   d3Array.sum(this$1._lineData.slice(0, i).map(function (l) { return l.width - this$1._shapeConfig.fontSize(d, i); })) +
                   s(d, i) / 2 + this$1._padding * 3 * i;
          }
        },
        y: function (d, i) {
          var s = this$1._shapeConfig.height;
          if (this$1._orient === "horizontal") return this$1._titleHeight + this$1._outerBounds.y + d3Array.max(this$1._lineData.map(function (l) { return l.height; }).concat(this$1._data.map(function (l, x) { return s(l, x); }))) / 2;
          else {
            var h = s(d, i);
            var pad = this$1._lineData[i].height > h ? this$1._lineData[i].height / 2 : h / 2,
                  prev = d3Array.sum(this$1._lineData.slice(0, i), function (l, x) { return d3Array.max([l.height, s(l.data, x)]); });
            return this$1._titleHeight + this$1._outerBounds.y + prev + pad + this$1._padding * i;
          }
        }
      };
      this._verticalAlign = "middle";

    }

    if ( BaseLegend ) ShapeLegend.__proto__ = BaseLegend;
    ShapeLegend.prototype = Object.create( BaseLegend && BaseLegend.prototype );
    ShapeLegend.prototype.constructor = ShapeLegend;

    /**
        @memberof ShapeLegend
        @desc Renders the current ShapeLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
        @param {Function} [*callback* = undefined]
    */
    ShapeLegend.prototype.render = function render (callback) {
      var this$1 = this;


      BaseLegend.prototype.render.call(this, callback);

      if (this._lineHeight === void 0) this._lineHeight = function (d, i) { return this$1._shapeConfig.fontSize(d, i) * 1.1; };

      // Shape <g> Group
      var shapeGroup = this._select.selectAll("g.d3plus-ShapeLegend")
        .data([0]);

      shapeGroup = shapeGroup.enter().append("g")
          .attr("class", "d3plus-ShapeLegend")
        .merge(shapeGroup);

      var availableHeight = this._height;
      this._titleHeight = 0;
      if (this._title) {
        var f = this._titleConfig.fontFamily,
              lH = this._titleConfig.lineHeight,
              s = this._titleConfig.fontSize;
        var res = d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(lH).width(this._width).height(this._height)(this._title);
        this._titleHeight = lH + res.lines.length + this._padding;
        availableHeight -= this._titleHeight;
      }

      // Calculate Text Sizes
      this._lineData = this._data.map(function (d, i) {
        var f = this$1._shapeConfig.fontFamily(d, i),
              lh = this$1._lineHeight(d, i),
              s = this$1._shapeConfig.fontSize(d, i);
        var h = this$1._orient === "horizontal" ? availableHeight - (this$1._data.length + 1) * this$1._padding : this$1._height,
              w = this$1._orient === "vertical" ? this$1._width - this$1._padding * 3 - this$1._shapeConfig.width(d, i) : this$1._width;
        var res = d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(this$1._label(d, i));
        res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); }))) + s;
        res.height = Math.ceil(res.lines.length * (lh + 1));
        res.og = {height: res.height, width: res.width};
        res.data = d;
        res.f = f;
        res.s = s;
        res.lh = lh;
        res.id = this$1._id(d, i);
        return res;
      });

      var availableSpace, textSpace, visibleLabels = true;

      if (this._orient === "horizontal") {
        availableSpace = this._width - d3Array.sum(this._data.map(function (d, i) { return this$1._shapeConfig.width(d, i) + this$1._padding * 3; })) - this._padding * 2;
        textSpace = d3Array.sum(this._lineData.map(function (d, i) { return d.width - this$1._shapeConfig.fontSize(d, i); }));
        if (textSpace > availableSpace) {
          var wrappable = this._lineData
            .filter(function (d) { return d.words.length > 1; })
            .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

          if (wrappable.length && availableHeight > wrappable[0].height * 2) {

            var line = 2;
            while (line <= 5) {
              var labels = wrappable.filter(function (d) { return d.words.length >= line; });
              if (!labels.length) break;
              var loop = function ( x ) {
                var label = wrappable[x];
                var h = label.og.height * line, w = label.og.width * (1.5 * (1 / line));
                var res$1 = d3plusText.textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
                if (!res$1.truncated) {
                  textSpace -= label.width;
                  label.width = Math.ceil(d3Array.max(res$1.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": label.f, "font-size": label.s}); }))) + label.s;
                  label.height = res$1.lines.length * (label.lh + 1);
                  textSpace += label.width;
                  if (textSpace <= availableSpace) return 'break';
                }
              };

              for (var x = 0; x < wrappable.length; x++) {
                var returned = loop( x );

                if ( returned === 'break' ) break;
              }
              if (textSpace <= availableSpace) break;
              line++;

            }

          }
          else visibleLabels = false;
        }
      }
      else {
        availableSpace = this._width - d3Array.max(this._data.map(function (d, i) { return this$1._shapeConfig.width(d, i) + this$1._padding * 3; })) - this._padding * 2;
        textSpace = d3Array.max(this._lineData.map(function (d, i) { return d.width - this$1._shapeConfig.fontSize(d, i); }));
      }

      if (textSpace > availableSpace) visibleLabels = false;

      if (!visibleLabels) {
        textSpace = 0;
        for (var i = 0; i < this._lineData.length; i++) {
          this$1._lineData[i].width = 0;
          this$1._lineData[i].height = 0;
        }
      }

      var innerHeight = d3Array.max(this._lineData, function (d, i) { return d3Array.max([d.height, this$1._shapeConfig.height(d.data, i)]); }) + this._titleHeight,
            innerWidth = this._orient === "horizontal"
                       ? textSpace + d3Array.sum(this._data, function (d, i) { return this$1._shapeConfig.width(d, i); }) + this._padding * (this._data.length * (visibleLabels ? 3 : 1) - 2)
                       : textSpace + d3Array.max(this._data, function (d, i) { return this$1._shapeConfig.width(d, i); }) + this._padding * 3;
      this._outerBounds.width = innerWidth;
      this._outerBounds.height = innerHeight;

      var xOffset = this._padding,
          yOffset = this._padding;
      if (this._align === "center") xOffset = (this._width - this._padding * 2 - innerWidth) / 2;
      else if (this._align === "right") xOffset = this._width - this._padding * 2 - innerWidth;
      if (this._verticalAlign === "middle") yOffset = (this._height - this._padding * 2 - innerHeight) / 2;
      else if (this._verticalAlign === "bottom") yOffset = this._height - this._padding * 2 - innerHeight;
      this._outerBounds.x = xOffset;
      this._outerBounds.y = yOffset;

      new d3plusText.TextBox()
        .data(this._title ? [{text: this._title}] : [])
        .duration(this._duration)
        .select(shapeGroup.node())
        .width(this._width)
        .x(0)
        .y(this._outerBounds.y)
        .config(this._titleConfig)
        .render();

      var baseConfig = this._shapeConfig,
            config = {
              id: function (d) { return d.id; },
              label: function (d) { return d.label; },
              lineHeight: function (d) { return d.lH; }
            };
      var shapeData = this._data.map(function (d, i) {

        var obj = {
          data: d, i: i,
          id: this$1._id(d, i),
          label: visibleLabels ? this$1._label(d, i) : null,
          lH: this$1._lineHeight(d, i),
          shape: this$1._shape(d, i)
        };

        var loop = function ( k ) {
          if (k !== "labelBounds" && {}.hasOwnProperty.call(baseConfig, k) && typeof baseConfig[k] === "function") {
            obj[k] = baseConfig[k](d, i);
            config[k] = function (d) { return d[k]; };
          }
        };

        for (var k in baseConfig) loop( k );

        return obj;

      });

      // Legend Shapes
      d3Collection.nest().key(function (d) { return d.shape; }).entries(shapeData).forEach(function (d) {

        new d3plus[d.key]()
          .data(d.values)
          .duration(this$1._duration)
          .labelPadding(0)
          .select(shapeGroup.node())
          .verticalAlign("top")
          .config(baseConfig)
          .config(config)
          .render();

      });

      return this;

    };

    /**
        @memberof ShapeLegend
        @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
        @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
    */
    ShapeLegend.prototype.align = function align (_) {
      return arguments.length ? (this._align = _, this) : this._align;
    };

    /**
        @memberof ShapeLegend
        @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
        @param {Array} [*data* = []]
    */
    ShapeLegend.prototype.data = function data (_) {
      return arguments.length ? (this._data = _, this) : this._data;
    };

    /**
        @memberof ShapeLegend
        @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
        @param {Function} [*value*]
        @example
  function value(d) {
    return d.id;
  }
    */
    ShapeLegend.prototype.id = function id (_) {
      return arguments.length ? (this._id = _, this) : this._id;
    };

    /**
        @memberof ShapeLegend
        @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
        @param {Function|String} [*value*]
    */
    ShapeLegend.prototype.label = function label (_) {
      return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
    };

    /**
        @memberof ShapeLegend
        @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
        @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
    */
    ShapeLegend.prototype.orient = function orient (_) {
      return arguments.length ? (this._orient = _, this) : this._orient;
    };

    /**
        @memberof ShapeLegend
        @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
        @param {Function|String} [*value* = "Rect"]
    */
    ShapeLegend.prototype.shape = function shape (_) {
      return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
    };

    /**
        @memberof ShapeLegend
        @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
        @param {Object} [*config* = {}]
    */
    ShapeLegend.prototype.shapeConfig = function shapeConfig (_) {
      return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
    };

    /**
        @memberof ShapeLegend
        @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
        @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
    */
    ShapeLegend.prototype.verticalAlign = function verticalAlign (_) {
      return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
    };

    return ShapeLegend;
  }(BaseLegend));

  exports.BaseLegend = BaseLegend;
  exports.ScaleLegend = ScaleLegend;
  exports.ShapeLegend = ShapeLegend;

  Object.defineProperty(exports, '__esModule', { value: true });

}));