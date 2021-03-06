/*
  d3plus-legend v0.6.22
  An easy to use javascript chart legend.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-selection'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3-array', 'd3-selection', 'd3plus-common', 'd3plus-shape', 'd3plus-text'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Selection,global.d3plusCommon,global.shapes,global.d3plusText));
}(this, (function (exports,d3Array,d3Selection,d3plusCommon,shapes,d3plusText) { 'use strict';

/**
    @class Legend
    @extends BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var Legend = (function (BaseClass$$1) {
  function Legend() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._align = "center";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._id = d3plusCommon.accessor("id");
    this._label = d3plusCommon.accessor("id");
    this._lineData = [];
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = d3plusCommon.constant("Rect");
    this._shapeConfig = {
      duration: this._duration,
      fill: d3plusCommon.accessor("color"),
      fontColor: d3plusCommon.constant("#444"),
      fontFamily: new shapes.Rect().fontFamily(),
      fontResize: false,
      fontSize: d3plusCommon.constant(10),
      height: d3plusCommon.constant(10),
      hitArea: function (dd) {
        var d = this$1._lineData[this$1._data.indexOf(dd)],
              h = d3Array.max([d.height, d.shapeHeight]);
        return {width: d.width + d.shapeWidth + (d.width ? this$1._padding : 0), height: h, x: -d.shapeWidth / 2, y: -h / 2};
      },
      labelBounds: function (dd, i, s) {
        var d = this$1._lineData[dd.i],
              w = s.r !== void 0 ? s.r : s.width / 2;
        return {width: d.width, height: d.height, x: w + this$1._padding, y: -d.height / 2};
      },
      opacity: 1,
      r: d3plusCommon.constant(5),
      width: d3plusCommon.constant(10),
      x: function (d, i) {
        var s = this$1._shapeConfig.width;
        var y = this$1._lineData[i].y;
        var pad = this$1._align === "left" ? 0 : this$1._align === "center"
                  ? (this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }))) / 2
                  : this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }));
        return this$1._rowWidth(this$1._lineData.slice(0, i).filter(function (l) { return y === l.y; })) + this$1._padding +
               this$1._outerBounds.x + s(d, i) / 2 + pad;
      },
      y: function (d, i) {
        var s = this$1._shapeConfig.height;
        var ld = this$1._lineData[i];
        return ld.y + this$1._titleHeight + this$1._outerBounds.y +
               d3Array.max(this$1._lineData.filter(function (l) { return ld.y === l.y; }).map(function (l) { return l.height; }).concat(this$1._data.map(function (l, x) { return s(l, x); }))) / 2;
      }
    };
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13
    };
    this._verticalAlign = "middle";
    this._width = 400;

  }

  if ( BaseClass$$1 ) Legend.__proto__ = BaseClass$$1;
  Legend.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Legend.prototype.constructor = Legend;

  Legend.prototype._fetchConfig = function _fetchConfig (key, d, i) {
    return typeof this._shapeConfig[key] === "function"
         ? this._shapeConfig[key](d, i) : this._shapeConfig[key];
  };

  Legend.prototype._rowHeight = function _rowHeight (row) {
    return d3Array.max(row.map(function (d) { return d.height; }).concat(row.map(function (d) { return d.shapeHeight; }))) + this._padding;
  };

  Legend.prototype._rowWidth = function _rowWidth (row) {
    var this$1 = this;

    return d3Array.sum(row.map(function (d) { return d.shapeWidth + d.width + this$1._padding * (d.width ? 2 : 1); })) - this._padding;
  };

  /**
      @memberof Legend
      @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
  */
  Legend.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) { this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node()); }
    if (this._lineHeight === void 0) { this._lineHeight = function (d, i) { return this$1._fetchConfig("fontSize", d, i) * 1.1; }; }

    // Shape <g> Group
    this._group = d3plusCommon.elem("g.d3plus-Legend", {parent: this._select});

    var availableHeight = this._height;
    this._titleHeight = 0;
    if (this._title) {
      var f = this._titleConfig.fontFamily,
            lH = this._titleConfig.lineHeight,
            s = this._titleConfig.fontSize;
      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lH)
        .width(this._width)
        .height(this._height)
        (this._title);
      this._titleHeight = lH + res.lines.length + this._padding;
      availableHeight -= this._titleHeight;
    }

    // Calculate Text Sizes
    this._lineData = this._data.map(function (d, i) {
      var f = this$1._fetchConfig("fontFamily", d, i),
            lh = this$1._lineHeight(d, i),
            s = this$1._fetchConfig("fontSize", d, i),
            shapeWidth = this$1._fetchConfig("width", d, i);
      var h = availableHeight - (this$1._data.length + 1) * this$1._padding,
            w = this$1._width;
      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(w)
        .height(h)
        (this$1._label(d, i));
      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); }))) + s;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
      res.y = 0;
      res.id = this$1._id(d, i);
      res.i = i;
      res.shapeWidth = shapeWidth;
      res.shapeHeight = this$1._fetchConfig("height", d, i);
      return res;
    });

    var spaceNeeded;
    var availableWidth = this._width - this._padding * 2;
    spaceNeeded = d3Array.sum(this._lineData.map(function (d) { return d.shapeWidth + this$1._padding * 2 + d.width; })) - this._padding;

    if (spaceNeeded > availableWidth) {
      var lines = 1, newRows = [];

      var maxLines = d3Array.max(this._lineData.map(function (d) { return d.words.length; }));
      this._wrapLines = function() {
        var this$1 = this;


        lines++;

        if (lines > maxLines) { return; }

        var wrappable = lines === 1 ? this._lineData.slice()
                        : this._lineData.filter(function (d) { return d.width + d.shapeWidth + this$1._padding * (d.width ? 2 : 1) > availableWidth && d.words.length >= lines; })
                            .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

        if (wrappable.length && availableHeight > wrappable[0].height * lines) {

          var truncated = false;
          var loop = function ( x ) {
            var label = wrappable[x];
            var h = label.og.height * lines, w = label.og.width * (1.5 * (1 / lines));
            var res = d3plusText.textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
            if (!res.truncated) {
              label.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": label.f, "font-size": label.s}); }))) + label.s;
              label.height = res.lines.length * (label.lh + 1);
            }
            else {
              truncated = true;
              return 'break';
            }
          };

          for (var x = 0; x < wrappable.length; x++) {
            var returned = loop( x );

            if ( returned === 'break' ) break;
          }
          if (!truncated) { this._wrapRows(); }
        }
        else {
          newRows = [];
          return;
        }

      };

      this._wrapRows = function() {
        var this$1 = this;

        newRows = [];
        var row = 1, rowWidth = 0;
        for (var i = 0; i < this._lineData.length; i++) {
          var d = this$1._lineData[i],
                w = d.width + this$1._padding * (d.width ? 2 : 1) + d.shapeWidth;
          if (d3Array.sum(newRows.map(function (row) { return d3Array.max(row, function (d) { return d3Array.max([d.height, d.shapeHeight]); }); })) > availableHeight) {
            newRows = [];
            break;
          }
          if (rowWidth + w < availableWidth) {
            rowWidth += w;
          }
          else if (w > availableWidth) {
            newRows = [];
            this$1._wrapLines();
            break;
          }
          else {
            rowWidth = w;
            row++;
          }
          if (!newRows[row - 1]) { newRows[row - 1] = []; }
          newRows[row - 1].push(d);
        }
      };

      this._wrapRows();

      if (!newRows.length || d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding > availableHeight) {
        spaceNeeded = d3Array.sum(this._lineData.map(function (d) { return d.shapeWidth + this$1._padding * 1; })) - this._padding;
        for (var i = 0; i < this._lineData.length; i++) {
          this$1._lineData[i].width = 0;
          this$1._lineData[i].height = 0;
        }
        this._wrapRows();
      }

      if (newRows.length && d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding < availableHeight) {
        newRows.forEach(function (row, i) {
          row.forEach(function (d) {
            if (i) {
              d.y = d3Array.sum(newRows.slice(0, i), this$1._rowHeight.bind(this$1));
            }
          });
        });
        spaceNeeded = d3Array.max(newRows, function (l) { return d3Array.sum(l, function (d) { return d.shapeWidth + this$1._padding * (d.width ? 2 : 1) + d.width; }); }) - this._padding;
      }
    }

    var innerHeight = d3Array.max(this._lineData, function (d, i) { return d3Array.max([d.height, this$1._fetchConfig("height", d.data, i)]) + d.y; }) + this._titleHeight,
          innerWidth = spaceNeeded;

    this._outerBounds.width = innerWidth;
    this._outerBounds.height = innerHeight;

    var xOffset = this._padding,
        yOffset = this._padding;
    if (this._align === "center") { xOffset = (this._width - innerWidth) / 2; }
    else if (this._align === "right") { xOffset = this._width - this._padding - innerWidth; }
    if (this._verticalAlign === "middle") { yOffset = (this._height - innerHeight) / 2; }
    else if (this._verticalAlign === "bottom") { yOffset = this._height - this._padding - innerHeight; }
    this._outerBounds.x = xOffset;
    this._outerBounds.y = yOffset;

    new d3plusText.TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .select(this._group.node())
      .textAnchor({left: "start", center: "middle", right: "end"}[this._align])
      .width(this._width - this._padding * 2)
      .x(this._padding)
      .y(this._outerBounds.y)
      .config(this._titleConfig)
      .render();

    this._shapes = [];
    var baseConfig = this._shapeConfig,
          config = {
            id: function (d) { return d.id; },
            label: function (d) { return d.label; },
            lineHeight: function (d) { return d.lH; }
          };

    var data = this._data.map(function (d, i) {

      var obj = {
        __d3plus__: true,
        data: d, i: i,
        id: this$1._id(d, i),
        label: this$1._lineData[i].width ? this$1._label(d, i) : false,
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
                config[k][t] = function(d) {
                  if (!baseConfig[k][t]) { return; }
                  baseConfig[k][t].bind(this)(d.data, d.i);
                };
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
    this._shapes = [];
    ["Circle", "Rect"].forEach(function (Shape) {

      this$1._shapes.push(new shapes[Shape]()
        .data(data.filter(function (d) { return d.shape === Shape; }))
        .duration(this$1._duration)
        .labelPadding(0)
        .select(this$1._group.node())
        .verticalAlign("top")
        .config(Object.assign({}, baseConfig, config))
        .render());

    });

    if (callback) { setTimeout(callback, this._duration + 100); }

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
      @desc If *value* is specified, sets the highlight method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight method.
      @param {Function} [*value*]
  */
  Legend.prototype.highlight = function highlight (_) {
    this._shapes.forEach(function (s) { return s.highlight(_); });
    return this;
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
//# sourceMappingURL=d3plus-legend.js.map
