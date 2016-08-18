/*
  d3plus-legend v0.5.1
  An easy to use javascript chart legend.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-selection'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3-array', 'd3-collection', 'd3-selection', 'd3plus-common', 'd3plus-shape', 'd3plus-text'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Collection,global.d3Selection,global.d3plusCommon,global.d3plus,global.d3plusText));
}(this, (function (exports,d3Array,d3Collection,d3Selection,d3plusCommon,d3plus,d3plusText) { 'use strict';

/**
    @class Legend
    @extends BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var Legend = (function (BaseClass) {
  function Legend() {
    var this$1 = this;


    BaseClass.call(this);

    var s = new d3plus.Shape();

    this._align = "center";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._id = d3plusCommon.accessor("id");
    this._label = d3plusCommon.accessor("id");
    this._lineData = [];
    this._orient = "horizontal";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = d3plusCommon.constant("Rect");
    this._shapeConfig = {
      duration: this._duration,
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
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13,
      textAnchor: "middle"
    };
    this._verticalAlign = "middle";
    this._width = 400;

  }

  if ( BaseClass ) Legend.__proto__ = BaseClass;
  Legend.prototype = Object.create( BaseClass && BaseClass.prototype );
  Legend.prototype.constructor = Legend;

  /**
      @memberof Legend
      @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  Legend.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node());
    if (this._lineHeight === void 0) this._lineHeight = function (d, i) { return this$1._shapeConfig.fontSize(d, i) * 1.1; };

    // Shape <g> Group
    var shapeGroup = d3plusCommon.elem("g.d3plus-Legend", {parent: this._select});

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
        if (k !== "labelBounds" && {}.hasOwnProperty.call(baseConfig, k)) {
          if (typeof baseConfig[k] === "function") {
            obj[k] = baseConfig[k](d, i);
            config[k] = function (d) { return d[k]; };
          }
          else if (k === "on") {
            config[k] = {};
            var loop$1 = function ( t ) {
              if ({}.hasOwnProperty.call(baseConfig[k], t)) {
                config[k][t] = function (d) { return baseConfig[k][t](d.data, d.i); };
              }
            };

            for (var t in baseConfig[k]) loop$1( t );
          }
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

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
  */
  Legend.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Legend
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  Legend.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
  */
  Legend.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
  */
  Legend.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @example
function value(d) {
  return d.id;
}
  */
  Legend.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
  */
  Legend.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof Legend
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
  */
  Legend.prototype.orient = function orient (_) {
    return arguments.length ? (this._orient = _, this) : this._orient;
  };

  /**
      @memberof Legend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Legend.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
  */
  Legend.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Legend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  Legend.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
  */
  Legend.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
  };

  /**
      @memberof Legend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
  */
  Legend.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
  */
  Legend.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
  */
  Legend.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
  */
  Legend.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
  */
  Legend.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Legend;
}(d3plusCommon.BaseClass));

exports.Legend = Legend;

Object.defineProperty(exports, '__esModule', { value: true });

})));