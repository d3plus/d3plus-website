/*
  d3plus-shape v0.8.0
  Fancy SVG shapes for visualizations
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-selection'), require('d3-transition'), require('d3plus-color'), require('d3plus-text'), require('d3-collection'), require('d3-shape')) :
  typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3plus-common', 'd3-selection', 'd3-transition', 'd3plus-color', 'd3plus-text', 'd3-collection', 'd3-shape'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Selection,global.d3Transition,global.d3plusColor,global.d3plusText,global.d3Collection,global.d3Shape));
}(this, function (exports,d3plusCommon,d3Selection,d3Transition,d3plusColor,d3plusText,d3Collection,d3Shape) { 'use strict';

  var d3$1 = {
    select: d3Selection.select,
    transition: d3Transition.transition
  };
  /**
      @class image
      @desc Creates SVG images based on an array of data.
      @example <caption>a sample row of data</caption>
  var data = {"url": "file.png", "width": "100", "height": "50"};
  @example <caption>passed to the generator</caption>
  new Image().data([data]).render();
  @example <caption>creates the following</caption>
  <image class="d3plus-shape-image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
  @example <caption>this is shorthand for the following</caption>
  image().data([data])();
  @example <caption>which also allows a post-draw callback function</caption>
  image().data([data])(function() { alert("draw complete!"); })
  */
  var Icon = function Icon() {
    this._duration = 600;
    this._height = d3plusCommon.accessor("height");
    this._id = d3plusCommon.accessor("url");
    this._select;
    this._url = d3plusCommon.accessor("url");
    this._width = d3plusCommon.accessor("width");
    this._x = d3plusCommon.accessor("x", 0);
    this._y = d3plusCommon.accessor("y", 0);
  };

  /**
      @memberof Image
      @desc Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.
      @param {Function} [*callback* = undefined]
  */
  Icon.prototype.render = function render (callback) {
      var this$1 = this;


    if (this._select === void 0) this.select(d3$1.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());

    var images = this._select.selectAll(".d3plus-shape-image").data(this._data, this._id);

    var enter = images.enter().append("image")
      .attr("class", "d3plus-shape-image")
      .attr("opacity", 0);

    var t = d3$1.transition().duration(this._duration),
          that = this,
          update = enter.merge(images);

    update
        .attr("xlink:href", this._url)
      .transition(t)
        .attr("opacity", 1)
        .attr("width", function (d, i) { return this$1._width(d, i); })
        .attr("height", function (d, i) { return this$1._height(d, i); })
        .attr("x", function (d, i) { return this$1._x(d, i); })
        .attr("y", function (d, i) { return this$1._y(d, i); })
        .each(function(d, i) {
          var image = d3$1.select(this), link = that._url(d, i);
          var fullAddress = link.indexOf("http://") === 0 || link.indexOf("https://") === 0;
          if (!fullAddress || link.indexOf(window.location.hostname) === 0) {
            var img = new Image();
            img.src = link;
            img.crossOrigin = "Anonymous";
            img.onload = function() {
              var canvas = document.createElement("canvas");
              canvas.width = this.width;
              canvas.height = this.height;
              var context = canvas.getContext("2d");
              context.drawImage(this, 0, 0);
              image.attr("xlink:href", canvas.toDataURL("image/png"));
            };
          }
        });

    images.exit().transition(t)
      .attr("width", function (d, i) { return this$1._width(d, i); })
      .attr("height", function (d, i) { return this$1._height(d, i); })
      .attr("x", function (d, i) { return this$1._x(d, i); })
      .attr("y", function (d, i) { return this$1._y(d, i); })
      .attr("opacity", 0).remove();

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  };

  /**
      @memberof Image
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  Icon.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Image
      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  Icon.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
  function(d) {
  return d.height;
  }
  */
  Icon.prototype.height = function height (_) {
    return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
      @param {Function} [*value*]
      @example
  function(d) {
  return d.url;
  }
  */
  Icon.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Image
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  Icon.prototype.select = function select (_) {
    return arguments.length ? (this._select = d3$1.select(_), this) : this._select;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the URL accessor to the specified function and returns this generator. If *value* is not specified, returns the current URL accessor.
      @param {Function} [*value*]
      @example
  function(d) {
  return d.url;
  }
  */
  Icon.prototype.url = function url (_) {
    return arguments.length ? (this._url = _, this) : this._url;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
  function(d) {
  return d.width;
  }
  */
  Icon.prototype.width = function width (_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
      @example
  function(d) {
  return d.x || 0;
  }
  */
  Icon.prototype.x = function x (_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
      @example
  function(d) {
  return d.y || 0;
  }
  */
  Icon.prototype.y = function y (_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
  };

  var d3 = {
    select: d3Selection.select,
    selectAll: d3Selection.selectAll,
    transition: d3Transition.transition
  };

  /**
      @class Shape
      @desc An abstracted class for generating shapes.
  */
  var Shape = function Shape() {
    var this$1 = this;

    this._backgroundImage = d3plusCommon.constant(false);
    this._data = [];
    this._duration = 600;
    this._fill = d3plusCommon.constant("black");
    this._fontColor = function (d, i) { return d3plusColor.contrast(this$1._fill(d, i)); };
    this._fontFamily = d3plusCommon.constant("Verdana");
    this._fontResize = d3plusCommon.constant(false);
    this._fontSize = d3plusCommon.constant(12);
    this._id = function (d, i) { return d.id !== void 0 ? d.id : i; };
    this._label = d3plusCommon.constant(false);
    this._labelPadding = d3plusCommon.constant(5);
    this._on = {};
    this._opacity = d3plusCommon.constant(1);
    this._scale = d3plusCommon.constant(1);
    this._stroke = d3plusCommon.constant("black");
    this._strokeWidth = d3plusCommon.constant(0);
    this._textAnchor = d3plusCommon.constant("start");
    this._verticalAlign = d3plusCommon.constant("top");
  };

  /**
      @memberof Shape
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Shape.prototype._aes = function _aes () {
    return {};
  };

  /**
      @memberof Shape
      @desc Adds background image to each shape group.
      @param {D3Selection} *g*
      @param {Boolean} [*show* = True] Whether or not to show or remove the image.
      @private
  */
  Shape.prototype._applyImage = function _applyImage (g, show) {
      if ( show === void 0 ) show = true;


    var that = this;

    g.each(function(d, i) {

      var aes = that._aes(d, i);

      var imageData = [];
      var h = 0, w = 0;

      if (show && (aes.r || aes.w && aes.h)) {
        h = aes.r ? aes.r * 2 : aes.h;
        w = aes.r ? aes.r * 2 : aes.w;
        var url = that._backgroundImage(d, i);
        if (url) imageData.push({url: url});
      }

      new Icon()
        .data(imageData)
        .duration(that._duration)
        .height(h)
        .select(this)
        .width(w)
        .x(-w / 2)
        .y(-h / 2)
        .render();

    });

  };

  /**
      @memberof Shape
      @desc Adds labels to each shape group.
      @param {D3Selection} *g*
      @param {Boolean} [*show* = True] Whether or not to show or remove the labels.
      @private
  */
  Shape.prototype._applyLabels = function _applyLabels (g, show) {
      if ( show === void 0 ) show = true;


    var that = this;

    g.each(function(d, i) {

      /* Draws label based on inner bounds */
      var labelData = [];

      if (show) {

        var labels = that._label(d, i);

        if (that._labelBounds && labels !== false && labels !== void 0) {

          var bounds = that._labelBounds(that._aes(d, i), i);

          if (bounds) {

            if (labels.constructor !== Array) labels = [labels];

            var fC = that._fontColor(d, i),
                  fF = that._fontFamily(d, i),
                  fR = that._fontResize(d, i),
                  fS = that._fontSize(d, i),
                  lH = that._lineHeight(d, i),
                  padding = that._labelPadding(d, i),
                  tA = that._textAnchor(d, i),
                  vA = that._verticalAlign(d, i);

            for (var l = 0; l < labels.length; l++) {
              var b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds),
                    p = padding.constructor === Array ? padding[l] : padding;
              b.height -= p * 2;
              b.width -= p * 2;
              b.x += p;
              b.y += p;
              b.id = (that._id(d, i)) + "_" + l;
              b.text = labels[l];

              b.fC = fC.constructor === Array ? fC[l] : fC;
              b.fF = fF.constructor === Array ? fF[l] : fF;
              b.fR = fR.constructor === Array ? fR[l] : fR;
              b.fS = fS.constructor === Array ? fS[l] : fS;
              b.lH = lH.constructor === Array ? lH[l] : lH;
              b.tA = tA.constructor === Array ? tA[l] : tA;
              b.vA = vA.constructor === Array ? vA[l] : vA;

              labelData.push(b);
            }

          }

        }
      }

      d3plusText.textBox()
        .data(labelData)
        .delay(that._duration / 2)
        .duration(that._duration)
        .fontColor(function (d) { return d.fC; })
        .fontFamily(function (d) { return d.fF; })
        .fontResize(function (d) { return d.fR; })
        .fontSize(function (d) { return d.fS; })
        .lineHeight(function (d) { return d.lH; })
        .textAnchor(function (d) { return d.tA; })
        .verticalAlign(function (d) { return d.vA; })
        .select(this)
        ();

    });

  };

  /**
      @memberof Shape
      @desc Provides the default styling to the shape elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyStyle = function _applyStyle (elem) {
      var this$1 = this;

    elem
      .attr("fill", function (d, i) { return this$1._fill(d, i); })
      .attr("stroke", function (d, i) { return this$1._stroke(d, i); })
      .attr("stroke-width", function (d, i) { return this$1._strokeWidth(d, i); });
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background-image accessor.
      @param {Function|String} [*value* = false]
  */
  Shape.prototype.backgroundImage = function backgroundImage (_) {
    return arguments.length ? (this._backgroundImage = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._backgroundImage;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  Shape.prototype.config = function config (_) {
      var this$1 = this;

    if (arguments.length) {
      for (var k in _) if ({}.hasOwnProperty.call(_, k)) this$1[k](_[k]);
      return this;
    }
    else {
      var config = {};
      for (var k$1 in this.prototype.constructor) if (k$1 !== "config" && {}.hasOwnProperty.call(this$1, k$1)) config[k$1] = this$1[k$1]();
      return config;
    }
  };

  /**
      @memberof Shape
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  Shape.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Shape
      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  Shape.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor.
      @param {Function|String} [*value* = "black"]
  */
  Shape.prototype.fill = function fill (_) {
    return arguments.length ? (this._fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fill;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.fontColor = function fontColor (_) {
    return arguments.length ? (this._fontColor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fontColor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "Verdana"]
  */
  Shape.prototype.fontFamily = function fontFamily (_) {
    return arguments.length ? (this._fontFamily = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fontFamily;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Boolean|Array} [*value*]
  */
  Shape.prototype.fontResize = function fontResize (_) {
    return arguments.length ? (this._fontResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fontResize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = 12]
  */
  Shape.prototype.fontSize = function fontSize (_) {
    return arguments.length ? (this._fontSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fontSize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
  */
  Shape.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof Shape
      @desc If *bounds* is specified, sets the label bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.
      @param {Function} [*bounds*] The given function is passed the properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
      @example
  function(shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
  }
  */
  Shape.prototype.labelBounds = function labelBounds (_) {
    return arguments.length ? (this._labelBounds = _, this) : this._labelBounds;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Number|Array} [*value* = 10]
  */
  Shape.prototype.labelPadding = function labelPadding (_) {
    return arguments.length ? (this._labelPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._labelPadding;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.lineHeight = function lineHeight (_) {
    return arguments.length ? (this._lineHeight = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._lineHeight;
  };

  /**
      @memberof Shape
      @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
      @param {String} [*typenames*]
      @param {Function} [*listener*]
  */
  Shape.prototype.on = function on (typenames, listener) {
    return arguments.length === 2 ? (this._on[typenames] = listener, this) : arguments.length ? this._on[typenames] : this._on;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current opacity accessor.
      @param {Number} [*value* = 1]
  */
  Shape.prototype.opacity = function opacity (_) {
    return arguments.length ? (this._opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._opacity;
  };

  /**
      @memberof Shape
      @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
      @param {Function} [*callback* = undefined]
  */
  Shape.prototype.render = function render (callback) {
      var this$1 = this;


    if (this._select === void 0) this.select(d3.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());
    if (this._lineHeight === void 0) this.lineHeight(function (d, i) { return this$1._fontSize(d, i) * 1.1; });

    this._transition = d3.transition().duration(this._duration);

    if (callback) setTimeout(callback, this._duration + 100);

    return this;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the scale accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current scale accessor.
      @param {Function|Number} [*value* = 1]
  */
  Shape.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._scale;
  };

  /**
      @memberof Shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  Shape.prototype.select = function select (_) {
    return arguments.length ? (this._select = d3.select(_), this) : this._select;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.
      @param {Function|String} [*value* = "black"]
  */
  Shape.prototype.stroke = function stroke (_) {
    return arguments.length ? (this._stroke = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._stroke;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke-width accessor.
      @param {Function|Number} [*value* = 0]
  */
  Shape.prototype.strokeWidth = function strokeWidth (_) {
    return arguments.length ? (this._strokeWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeWidth;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  Shape.prototype.textAnchor = function textAnchor (_) {
    return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._textAnchor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  Shape.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._verticalAlign;
  };

  /**
      @class Circle
      @desc Creates SVG circles based on an array of data.
  */
  var Circle = (function (Shape) {
    function Circle() {
      Shape.call(this);
      this._r = d3plusCommon.accessor("r");
      this._x = d3plusCommon.accessor("x");
      this._y = d3plusCommon.accessor("y");
    }

    if ( Shape ) Circle.__proto__ = Shape;
    Circle.prototype = Object.create( Shape && Shape.prototype );
    Circle.prototype.constructor = Circle;

    /**
        Provides the default positioning to the <rect> elements.
        @private
    */
    Circle.prototype._applyPosition = function _applyPosition (elem) {
      var this$1 = this;

      elem
        .attr("r", function (d, i) { return this$1._r(d, i); })
        .attr("x", function (d, i) { return -this$1._r(d, i) / 2; })
        .attr("y", function (d, i) { return -this$1._r(d, i) / 2; });
    };

    /**
        Draws the circles.
        @param {Function} [*callback* = undefined]
        @private
    */
    Circle.prototype.render = function render (callback) {
      var this$1 = this;


      Shape.prototype.render.call(this, callback);

      var groups = this._select.selectAll(".d3plus-shape-circle").data(this._data, this._id);

      groups.transition(this._transition)
        .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")"); });

      groups.select("circle").transition(this._transition).call(this._applyStyle.bind(this));

      groups.exit().transition().delay(this._duration).remove();

      groups.exit().select("circle").transition(this._transition)
        .attr("r", 0)
        .attr("x", 0)
        .attr("y", 0);

      groups.exit()
        .call(this._applyImage.bind(this), false)
        .call(this._applyLabels.bind(this), false);

      var enter = groups.enter().append("g")
          .attr("class", "d3plus-shape-circle")
          .attr("id", function (d, i) { return ("d3plus-shape-circle-" + (this$1._id(d, i))); })
          .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")"); });

      enter.append("circle")
        .attr("r", 0)
        .attr("x", 0)
        .attr("y", 0)
        .call(this._applyStyle.bind(this));

      var update = enter.merge(groups);

      update.select("circle").transition(this._transition)
        .call(this._applyPosition.bind(this));

      update
          .call(this._applyImage.bind(this))
          .call(this._applyLabels.bind(this))
        .transition(this._transition)
          .attr("opacity", this._opacity);

      var events = Object.keys(this._on);
      for (var e = 0; e < events.length; e++) update.on(events[e], this$1._on[events[e]]);

      return this;

    };

    /**
        @memberof Circle
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Circle.prototype._aes = function _aes (d, i) {
      return {r: this._r(d, i)};
    };

    /**
        @memberof Circle
        @desc If *value* is specified, sets the radius accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current radius accessor.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.r;
  }
    */
    Circle.prototype.r = function r (_) {
      return arguments.length ? (this._r = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._r;
    };

    /**
        @memberof Circle
        @desc Updates the style and positioning of the elements matching *selector* and returns this generator. This is helpful when not wanting to loop through all shapes just to change the style of a few.
        @param {String|HTMLElement} *selector*
    */
    Circle.prototype.update = function update (_) {
      var this$1 = this;


      var groups = this._select.selectAll(_),
            t = d3Transition.transition().duration(this._duration);

      groups
          .call(this._applyImage.bind(this))
          .call(this._applyLabels.bind(this))
        .transition(t)
          .attr("opacity", this._opacity)
          .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")scale(" + (this$1._scale(d, i)) + ")"); });

      groups.select("circle").transition(t)
        .call(this._applyStyle.bind(this))
        .call(this._applyPosition.bind(this));

      return this;

    };

    /**
        @memberof Circle
        @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.x;
  }
    */
    Circle.prototype.x = function x (_) {
      return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
    };

    /**
        @memberof Circle
        @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.y;
  }
    */
    Circle.prototype.y = function y (_) {
      return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
    };

    return Circle;
  }(Shape));

  /**
      @class Line
      @desc Creates SVG lines based on an array of data.
  */
  var Line = (function (Shape) {
    function Line() {
      Shape.call(this);
      this._fill = d3plusCommon.constant("none");
      this._path = d3Shape.line().defined(function (d) { return d; });
      this._strokeWidth = d3plusCommon.constant(1);
      this._x = d3plusCommon.accessor("x");
      this._y = d3plusCommon.accessor("y");
    }

    if ( Shape ) Line.__proto__ = Shape;
    Line.prototype = Object.create( Shape && Shape.prototype );
    Line.prototype.constructor = Line;

    /**
        Draws the lines.
        @param {Function} [*callback* = undefined]
        @private
    */
    Line.prototype.render = function render (callback) {
      var this$1 = this;


      Shape.prototype.render.call(this, callback);

      var lines = d3Collection.nest().key(this._id).entries(this._data);

      this._path
        .x(this._x)
        .y(this._y);

      var groups = this._select.selectAll(".d3plus-shape-line").data(lines, function (d) { return d.key; });

      groups.select("path").transition(this._transition)
        .attr("d", function (d) { return this$1._path(d.values); })
        .call(this._applyStyle.bind(this));

      groups.exit().transition().delay(this._duration).remove();

      groups.exit().call(this._applyLabels.bind(this), false);

      var enter = groups.enter().append("g")
          .attr("class", "d3plus-shape-line")
          .attr("id", function (d) { return ("d3plus-shape-line-" + (d.key)); });

      enter.append("path")
        .attr("d", function (d) { return this$1._path(d.values); })
        .call(this._applyStyle.bind(this));

      var update = enter.merge(groups);

      update.call(this._applyLabels.bind(this))
        .transition(this._transition)
          .attr("opacity", this._opacity);

      var events = Object.keys(this._on);
      for (var e = 0; e < events.length; e++) update.on(events[e], this$1._on[events[e]]);

      return this;

    };

    /**
        @memberof Line
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Line.prototype._aes = function _aes (d, i) {
      var this$1 = this;

      return {points: d.values.map(function (p) { return [this$1._x(p, i), this$1._y(p, i)]; })};
    };

    /**
        @memberof Line
        @desc Updates the style and positioning of the elements matching *selector* and returns this generator. This is helpful when not wanting to loop through all shapes just to change the style of a few.
        @param {String|HTMLElement} *selector*
    */
    Line.prototype.update = function update (_) {
      var this$1 = this;


      var groups = this._select.selectAll(_),
            t = d3Transition.transition().duration(this._duration);

      groups
          .call(this._applyLabels.bind(this))
        .transition(t)
          .attr("opacity", this._opacity);

      groups.select("path").transition(t)
        .attr("d", function (d) { return this$1._path(d.values); });

      return this;

    };

    /**
        @memberof Line
        @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.x;
  }
    */
    Line.prototype.x = function x (_) {
      return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
    };

    /**
        @memberof Line
        @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.y;
  }
    */
    Line.prototype.y = function y (_) {
      return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
    };

    return Line;
  }(Shape));

  /**
      @class Rect
      @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
  */
  var Rect = (function (Shape) {
    function Rect() {
      Shape.call(this);
      this._height = d3plusCommon.accessor("height");
      this._labelBounds = function (s) { return ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2}); };
      this._width = d3plusCommon.accessor("width");
      this._x = d3plusCommon.accessor("x");
      this._y = d3plusCommon.accessor("y");
    }

    if ( Shape ) Rect.__proto__ = Shape;
    Rect.prototype = Object.create( Shape && Shape.prototype );
    Rect.prototype.constructor = Rect;

    /**
        Draws the rectangles.
        @param {Function} [*callback* = undefined]
        @private
    */
    Rect.prototype.render = function render (callback) {
      var this$1 = this;


      Shape.prototype.render.call(this, callback);

      var groups = this._select.selectAll(".d3plus-shape-rect").data(this._data, this._id);

      groups.transition(this._transition)
        .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")"); });

      groups.select("rect").transition(this._transition).call(this._applyStyle.bind(this));

      groups.exit().transition().delay(this._duration).remove();

      groups.exit().select("rect").transition(this._transition)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0);

      groups.exit()
        .call(this._applyImage.bind(this), false)
        .call(this._applyLabels.bind(this), false);

      var enter = groups.enter().append("g")
          .attr("class", "d3plus-shape-rect")
          .attr("id", function (d, i) { return ("d3plus-shape-rect-" + (this$1._id(d, i))); })
          .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")"); });

      enter.append("rect")
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", 0)
        .attr("y", 0)
        .call(this._applyStyle.bind(this));

      var update = enter.merge(groups);

      update.select("rect").transition(this._transition)
        .call(this._applyPosition.bind(this));

      update
          .call(this._applyImage.bind(this))
          .call(this._applyLabels.bind(this))
        .transition(this._transition)
          .attr("opacity", this._opacity);

      var events = Object.keys(this._on);
      for (var e = 0; e < events.length; e++) update.on(events[e], this$1._on[events[e]]);

      return this;

    };

    /**
        @memberof Rect
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Rect.prototype._aes = function _aes (d, i) {
      return {width: this._width(d, i), height: this._height(d, i)};
    };

    /**
        @memberof Rect
        @desc Provides the default positioning to the <rect> elements.
        @param {D3Selection} *elem*
        @private
    */
    Rect.prototype._applyPosition = function _applyPosition (elem) {
      var this$1 = this;

      elem
        .attr("width", function (d, i) { return this$1._width(d, i); })
        .attr("height", function (d, i) { return this$1._height(d, i); })
        .attr("x", function (d, i) { return -this$1._width(d, i) / 2; })
        .attr("y", function (d, i) { return -this$1._height(d, i) / 2; });
    };

    /**
        @memberof Rect
        @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.height;
  }
    */
    Rect.prototype.height = function height (_) {
      return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
    };

    /**
        @memberof Rect
        @desc Updates the style and positioning of the elements matching *selector* and returns this generator. This is helpful when not wanting to loop through all shapes just to change the style of a few.
        @param {String|HTMLElement} *selector*
    */
    Rect.prototype.update = function update (_) {
      var this$1 = this;


      var groups = this._select.selectAll(_),
            t = d3Transition.transition().duration(this._duration);

      groups
          .call(this._applyImage.bind(this))
          .call(this._applyLabels.bind(this))
        .transition(t)
          .attr("opacity", this._opacity)
          .attr("transform", function (d, i) { return ("translate(" + (this$1._x(d, i)) + "," + (this$1._y(d, i)) + ")scale(" + (this$1._scale(d, i)) + ")"); });

      groups.select("rect").transition(t)
        .call(this._applyStyle.bind(this))
        .call(this._applyPosition.bind(this));

      return this;

    };

    /**
        @memberof Rect
        @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.width;
  }
    */
    Rect.prototype.width = function width (_) {
      return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
    };

    /**
        @memberof Rect
        @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.x;
  }
    */
    Rect.prototype.x = function x (_) {
      return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
    };

    /**
        @memberof Rect
        @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
        @param {Function|Number} [*value*]
        @example
  function(d) {
    return d.y;
  }
    */
    Rect.prototype.y = function y (_) {
      return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
    };

    return Rect;
  }(Shape));

  exports.Circle = Circle;
  exports.Image = Icon;
  exports.Line = Line;
  exports.Rect = Rect;
  exports.Shape = Shape;

  Object.defineProperty(exports, '__esModule', { value: true });

}));