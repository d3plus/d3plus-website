/*
  d3plus-legend v0.4.0
  A collection of chart legends and keys.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-selection'), require('d3-transition'), require('d3-scale'), require('d3plus-text'), require('d3-collection'), require('d3plus-shape')) :
  typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3plus-common', 'd3-array', 'd3-selection', 'd3-transition', 'd3-scale', 'd3plus-text', 'd3-collection', 'd3plus-shape'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Array,global.d3Selection,global.d3Transition,global.scales,global.d3plusText,global.d3Collection,global.d3plus));
}(this, function (exports,d3plusCommon,d3Array,d3Selection,d3Transition,scales,d3plusText,d3Collection,d3plus) { 'use strict';

  /**
      @class ScaleLegend
      @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */
  var ScaleLegend = function ScaleLegend() {

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
      fontFamily: d3plusText.textBox().fontFamily(),
      fontResize: false,
      fontSize: d3plusCommon.constant(10)
    };
    this._tickSize = 5;
    this._uuid = new Date().getTime();
    this._width = 400;

  };

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


    if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node());
    if (this._lineHeight === void 0) this._lineHeight = function (d, i) { return this$1._textBoxConfig.fontSize(d, i) * 1.1; };

    var ref = this._position;
      var width = ref.width;
      var height = ref.height;
      var x = ref.x;
      var y = ref.y;

    var clipId = "d3plus-ShapeLegend-clip-" + (this._uuid),
          p = this._padding,
          t = d3Transition.transition().duration(this._duration);

    var size = this[("_" + width)] - p * 2;

    this._d3Scale = scales[("scale" + (this._scale.charAt(0).toUpperCase()) + (this._scale.slice(1)))]()
      .domain(this._domain)
      .range([p, p + size]);

    var values = this._ticks || this._d3Scale.ticks();

    var space = 0;
    for (var i = 0; i < values.length; i++) {
      var s = this$1._d3Scale(values[i + 1]) - this$1._d3Scale(values[i]);
      if (s > space) space = s;
    }
    space -= p;

    function measureText(d, i) {

      var f = this._textBoxConfig.fontFamily(d, i),
            lh = this._lineHeight(d, i),
            s = this._textBoxConfig.fontSize(d, i);

      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(space)
        .height(this._height - this._tickSize - p)
        (d);

      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); })));
      res.height = Math.ceil(res.lines.length * (lh + 1));
      return res;

    }

    var textData = values.map(measureText.bind(this));

    var firstWidth = textData[0][width],
          lastWidth = textData[textData.length - 1][width];

    size -= firstWidth / 2 + lastWidth / 2;
    this._d3Scale.range([p + firstWidth / 2, p + firstWidth / 2 + size]);

    var obj;
      this._outerBounds = ( obj = {}, obj[height] = this._tickSize + d3Array.max(textData, function (t) { return t[height]; }) + p * 2, obj[width] = size, obj[x] = this._d3Scale.range()[0], obj );
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

    var valueData = values.map(function (d) { return ({id: d}); });

    var ticks = group.selectAll("line.tick").data(valueData, function (d) { return d.id; });

    ticks.exit().transition(t)
      .attr("opacity", 0)
      .call(this._tickPosition.bind(this))
      .remove();

    ticks.enter().append("line")
        .attr("class", "tick")
        .attr("stroke", "#000")
        .attr("opacity", 0)
        .attr("clip-path", ("url(#" + clipId + ")"))
        .call(this._tickPosition.bind(this), true)
      .merge(ticks).transition(t)
        .attr("opacity", 1)
        .call(this._tickPosition.bind(this));

    var maxTextHeight = d3Array.max(textData, function (t) { return t.height; }),
          maxTextWidth = d3Array.max(textData, function (t, i) { return t.width + this$1._textBoxConfig.fontSize(values[i], i); });
    d3plusText.textBox()
      .data(valueData)
      .duration(this._duration)
      .height(maxTextHeight)
      .select(group.node())
      .text(function (d) { return d.id; })
      .textAnchor(this._orient === "left" ? "end" : this._orient === "right" ? "start" : "middle")
      .verticalAlign(this._orient === "bottom" ? "top" : this._orient === "top" ? "bottom" : "middle")
      .width(maxTextWidth)
      .x(function (d, i) {
        if (["top", "bottom"].includes(this$1._orient)) return this$1._d3Scale(d.id) - maxTextWidth / 2;
        return this$1._orient === "left" ? this$1._outerBounds.x - this$1._textBoxConfig.fontSize(values[i], i) / 2 : this$1._outerBounds.x + this$1._tickSize + this$1._padding;
      })
      .y(function (d) {
          if (["left", "right"].includes(this$1._orient)) return this$1._d3Scale(d.id) - maxTextHeight / 2;
        return ["right", "bottom"].includes(this$1._orient) ? this$1._outerBounds.y + this$1._tickSize + p : this$1._outerBounds.y;
      })
      .config(this._textBoxConfig)
      ();

    this._lastScale = this._d3Scale;

    if (callback) setTimeout(callback, this._duration + 100);

      return this;

  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  ScaleLegend.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  ScaleLegend.prototype.config = function config (_) {
      var this$1 = this;

    if (arguments.length) {
      for (var k in _) if ({}.hasOwnProperty.call(_, k) && k in this$1) this$1[k](_[k]);
      return this;
    }
    else {
      var config = {};
      for (var k$1 in this.prototype.constructor) if (k$1 !== "config" && {}.hasOwnProperty.call(this$1, k$1)) config[k$1] = this$1[k$1]();
      return config;
    }
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the scale domain of the legend and returns this generator. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
  */
  ScaleLegend.prototype.domain = function domain (_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  ScaleLegend.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof ScaleLegend
      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
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
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
  {"width": 180, "height": 24, "x": 10, "y": 20}
  */
  ScaleLegend.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  ScaleLegend.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the scale of the legend and returns this generator. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
  */
  ScaleLegend.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
    };

    /**
        @memberof ScaleLegend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  ScaleLegend.prototype.select = function select (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns this generator. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  ScaleLegend.prototype.textBoxConfig = function textBoxConfig (_) {
    return arguments.length ? (this._textBoxConfig = Object.assign(this._textBoxConfig, _), this) : this._textBoxConfig;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the tick values of the legend and returns this generator. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#ScaleLegend.domain) and the available [width](#ScaleLegend.width).
      @param {Array} [*value*]
  */
  ScaleLegend.prototype.ticks = function ticks (_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the tick size of the legend and returns this generator. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
  */
  ScaleLegend.prototype.tickSize = function tickSize (_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  };

  /**
      @memberof ScaleLegend
      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  ScaleLegend.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  /**
      @class ShapeLegend
      @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */
  var ShapeLegend = function ShapeLegend() {
    var this$1 = this;


    var s = new d3plus.Shape();

    this._align = "center";
    this._height = 100;
    this._id = d3plusCommon.accessor("id");
    this._label = d3plusCommon.accessor("id");
    this._lineData = [];
    this._orient = "horizontal";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = d3plusCommon.constant("Rect");
    this._shapeConfig = {
      duration: s.duration(),
      fill: d3plusCommon.accessor("color"),
      fontColor: d3plusCommon.constant("#444"),
      fontFamily: s.fontFamily(),
      fontSize: d3plusCommon.constant(10),
      height: d3plusCommon.constant(10),
      labelBounds: function (s, i) {
        var d = this$1._lineData[i],
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
        if (this$1._orient === "horizontal") return this$1._outerBounds.y + d3Array.max(this$1._lineData.map(function (l) { return l.height; }).concat(this$1._data.map(function (l, x) { return s(l, x); }))) / 2;
        else {
          var h = s(d, i);
          var pad = this$1._lineData[i].height > h ? this$1._lineData[i].height / 2 : h / 2,
                prev = d3Array.sum(this$1._lineData.slice(0, i), function (l, x) { return d3Array.max([l.height, s(l.data, x)]); });
          return this$1._outerBounds.y + prev + pad + this$1._padding * i;
        }
      }
    };
    this._verticalAlign = "middle";
    this._width = 400;

  };

  /**
      @memberof ShapeLegend
      @desc Renders the current ShapeLegend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  ShapeLegend.prototype.render = function render (callback) {
      var this$1 = this;


    if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", ((window.innerWidth) + "px")).attr("height", ((window.innerHeight) + "px")).node());
    if (this._lineHeight === void 0) this._lineHeight = function (d, i) { return this$1._shapeConfig.fontSize(d, i) * 1.1; };

    // Calculate Text Sizes
    this._lineData = this._data.map(function (d, i) {
      var f = this$1._shapeConfig.fontFamily(d, i),
            lh = this$1._lineHeight(d, i),
            s = this$1._shapeConfig.fontSize(d, i);
      var h = this$1._orient === "horizontal" ? this$1._height - (this$1._data.length + 1) * this$1._padding : this$1._height,
            w = this$1._orient === "vertical" ? this$1._width - this$1._padding * 3 - this$1._shapeConfig.width(d, i) : this$1._width;
      var res = d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(this$1._label(d, i));
      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); }))) + s;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
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

        if (wrappable.length && this._height > wrappable[0].height * 2) {

          var line = 2;
          while (line <= 5) {
            var labels = wrappable.filter(function (d) { return d.words.length >= line; });
            if (!labels.length) break;
            var loop = function ( x ) {
              var label = wrappable[x];
              var h = label.og.height * line, w = label.og.width * (1.5 * (1 / line));
              var res = d3plusText.textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
              if (!res.truncated) {
                textSpace -= label.width;
                label.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": label.f, "font-size": label.s}); }))) + label.s;
                label.height = res.lines.length * (label.lh + 1);
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

    var innerHeight = d3Array.max(this._lineData, function (d, i) { return d3Array.max([d.height, this$1._shapeConfig.height(d.data, i)]); }),
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

    // Shape <g> Group
    var shapeGroup = this._select.selectAll("g.d3plus-ShapeLegend")
      .data([0]);

    shapeGroup = shapeGroup.enter().append("g")
        .attr("class", "d3plus-ShapeLegend")
      .merge(shapeGroup);

    // Legend Shapes
    d3Collection.nest().key(this._shape).entries(this._data).forEach(function (d) {

      new d3plus[d.key]()
        .data(d.values)
        .id(this$1._id)
        .lineHeight(this$1._lineHeight)
        .label(visibleLabels ? this$1._label : false)
        .labelPadding(0)
        .select(shapeGroup.node())
        .verticalAlign("top")
        .config(this$1._shapeConfig)
        .render();

    });

    if (callback) setTimeout(callback, this._shapeConfig.duration + 100);

    return this;

  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  ShapeLegend.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  ShapeLegend.prototype.config = function config (_) {
      var this$1 = this;

    if (arguments.length) {
      for (var k in _) if ({}.hasOwnProperty.call(_, k) && k in this$1) this$1[k](_[k]);
      return this;
    }
    else {
      var config = {};
      for (var k$1 in this.prototype.constructor) if (k$1 !== "config" && {}.hasOwnProperty.call(this$1, k$1)) config[k$1] = this$1[k$1]();
      return config;
    }
  };

  /**
      @memberof ShapeLegend
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  ShapeLegend.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  ShapeLegend.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
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
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  ShapeLegend.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof ShapeLegend
      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
  */
  ShapeLegend.prototype.orient = function orient (_) {
    return arguments.length ? (this._orient = _, this) : this._orient;
  };

  /**
      @memberof ShapeLegend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
  {"width": 180, "height": 24, "x": 10, "y": 20}
  */
  ShapeLegend.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  ShapeLegend.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof ShapeLegend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  ShapeLegend.prototype.select = function select (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
  */
  ShapeLegend.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
  };

  /**
      @memberof ShapeLegend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns this generator. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  ShapeLegend.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
  */
  ShapeLegend.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  };

  /**
      @memberof ShapeLegend
      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  ShapeLegend.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  exports.ScaleLegend = ScaleLegend;
  exports.ShapeLegend = ShapeLegend;

  Object.defineProperty(exports, '__esModule', { value: true });

}));