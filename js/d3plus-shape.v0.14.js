/*
  d3plus-shape v0.14.11
  Fancy SVG shapes for visualizations
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3-array'), require('d3-color'), require('d3plus-color'), require('d3-shape'), require('d3plus-text'), require('d3-polygon'), require('d3-collection'), require('d3-interpolate-path')) :
  typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3-array', 'd3-color', 'd3plus-color', 'd3-shape', 'd3plus-text', 'd3-polygon', 'd3-collection', 'd3-interpolate-path'], factory) :
  (factory((global.d3plus = {}),global.d3Selection,global.d3Transition,global.d3plusCommon,global.d3Array,global.d3Color,global.d3plusColor,global.paths,global.d3plusText,global.d3Polygon,global.d3Collection,global.d3InterpolatePath));
}(this, (function (exports,d3Selection,d3Transition,d3plusCommon,d3Array,d3Color,d3plusColor,paths,d3plusText,d3Polygon,d3Collection,d3InterpolatePath) { 'use strict';

  /**
      @class Image
      @desc Creates SVG images based on an array of data.
      @example <caption>a sample row of data</caption>
  var data = {"url": "file.png", "width": "100", "height": "50"};
  @example <caption>passed to the generator</caption>
  new Image().data([data]).render();
  @example <caption>creates the following</caption>
  <image class="d3plus-Image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
  @example <caption>this is shorthand for the following</caption>
  image().data([data])();
  @example <caption>which also allows a post-draw callback function</caption>
  image().data([data])(function() { alert("draw complete!"); })
  */
  var Image = function Image() {
    this._duration = 600;
    this._height = d3plusCommon.accessor("height");
    this._id = d3plusCommon.accessor("id");
    this._pointerEvents = d3plusCommon.constant("auto");
    this._select;
    this._url = d3plusCommon.accessor("url");
    this._width = d3plusCommon.accessor("width");
    this._x = d3plusCommon.accessor("x", 0);
    this._y = d3plusCommon.accessor("y", 0);
  };

  /**
      @memberof Image
      @desc Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.
      @param {Function} [*callback*]
      @chainable
  */
  Image.prototype.render = function render (callback) {
      var this$1 = this;


    if (this._select === void 0) { this.select(d3Selection.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node()); }

    var images = this._select.selectAll(".d3plus-Image").data(this._data, this._id);

    var enter = images.enter().append("image")
      .attr("class", "d3plus-Image")
      .attr("opacity", 0)
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", function (d, i) { return this$1._x(d, i) + this$1._width(d, i) / 2; })
      .attr("y", function (d, i) { return this$1._y(d, i) + this$1._height(d, i) / 2; });

    var t = d3Transition.transition().duration(this._duration),
          that = this,
          update = enter.merge(images);

    update
      .attr("xlink:href", this._url)
      .style("pointer-events", this._pointerEvents)
      .transition(t)
      .attr("opacity", 1)
      .attr("width", function (d, i) { return this$1._width(d, i); })
      .attr("height", function (d, i) { return this$1._height(d, i); })
      .attr("x", function (d, i) { return this$1._x(d, i); })
      .attr("y", function (d, i) { return this$1._y(d, i); })
      .each(function(d, i) {
        var image = d3Selection.select(this), link = that._url(d, i);
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

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Image
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  Image.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Image
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
      @chainable
  */
  Image.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
  function(d) {
  return d.height;
  }
  */
  Image.prototype.height = function height (_) {
    return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance.
      @param {Function} [*value*]
      @chainable
      @example
  function(d) {
  return d.id;
  }
  */
  Image.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance.
      @param {Function|String} [*value* = "auto"]
      @chainable
  */
  Image.prototype.pointerEvents = function pointerEvents (_) {
    return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
  };

  /**
      @memberof Image
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Image.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the URL accessor to the specified function and returns the current class instance.
      @param {Function} [*value*]
      @chainable
      @example
  function(d) {
  return d.url;
  }
  */
  Image.prototype.url = function url (_) {
    return arguments.length ? (this._url = _, this) : this._url;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
  function(d) {
  return d.width;
  }
  */
  Image.prototype.width = function width (_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
  function(d) {
  return d.x || 0;
  }
  */
  Image.prototype.x = function x (_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
  };

  /**
      @memberof Image
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
  function(d) {
  return d.y || 0;
  }
  */
  Image.prototype.y = function y (_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
  };

  /**
      @function pointDistanceSquared
      @desc Returns the squared euclidean distance between two points.
      @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
      @returns {Number}
  */
  function pointDistanceSquared (p1, p2) {

    var dx = p2[0] - p1[0],
          dy = p2[1] - p1[1];

    return dx * dx + dy * dy;

  }

  /**
      @function pointDistance
      @desc Calculates the pixel distance between two points.
      @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
      @returns {Number}
  */
  function pointDistance (p1, p2) { return Math.sqrt(pointDistanceSquared(p1, p2)); }

  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  /**
      @class Shape
      @extends external:BaseClass
      @desc An abstracted class for generating shapes.
  */
  var Shape = (function (BaseClass) {
    function Shape(tagName) {
      var this$1 = this;
      if ( tagName === void 0 ) tagName = "g";


      BaseClass.call(this);

      this._activeOpacity = 0.25;
      this._activeStyle = {
        "stroke": function (d, i) {
          var c = this$1._fill(d, i);
          if (["transparent", "none"].includes(c)) { c = this$1._stroke(d, i); }
          return d3Color.color(c).darker(1);
        },
        "stroke-width": function (d, i) {
          var s = this$1._strokeWidth(d, i) || 1;
          return s * 3;
        }
      };
      this._ariaLabel = d3plusCommon.constant("");
      this._backgroundImage = d3plusCommon.constant(false);
      this._backgroundImageClass = new Image();
      this._data = [];
      this._duration = 600;
      this._fill = d3plusCommon.constant("black");
      this._fillOpacity = d3plusCommon.constant(1);

      this._hoverOpacity = 0.5;
      this._hoverStyle = {
        "stroke": function (d, i) {
          var c = this$1._fill(d, i);
          if (["transparent", "none"].includes(c)) { c = this$1._stroke(d, i); }
          return d3Color.color(c).darker(0.5);
        },
        "stroke-width": function (d, i) {
          var s = this$1._strokeWidth(d, i) || 1;
          return s * 2;
        }
      };
      this._id = function (d, i) { return d.id !== void 0 ? d.id : i; };
      this._label = d3plusCommon.constant(false);
      this._labelClass = new d3plusText.TextBox();
      this._labelConfig = {
        fontColor: function (d, i) { return d3plusColor.colorContrast(this$1._fill(d, i)); },
        fontSize: 12,
        padding: 5
      };
      this._name = "Shape";
      this._opacity = d3plusCommon.constant(1);
      this._pointerEvents = d3plusCommon.constant("visiblePainted");
      this._role = d3plusCommon.constant("presentation");
      this._rotate = d3plusCommon.constant(0);
      this._rx = d3plusCommon.constant(0);
      this._ry = d3plusCommon.constant(0);
      this._scale = d3plusCommon.constant(1);
      this._shapeRendering = d3plusCommon.constant("geometricPrecision");
      this._stroke = function (d, i) { return d3Color.color(this$1._fill(d, i)).darker(1); };
      this._strokeDasharray = d3plusCommon.constant("0");
      this._strokeLinecap = d3plusCommon.constant("butt");
      this._strokeOpacity = d3plusCommon.constant(1);
      this._strokeWidth = d3plusCommon.constant(0);
      this._tagName = tagName;
      this._textAnchor = d3plusCommon.constant("start");
      this._vectorEffect = d3plusCommon.constant("non-scaling-stroke");
      this._verticalAlign = d3plusCommon.constant("top");

      this._x = d3plusCommon.accessor("x", 0);
      this._y = d3plusCommon.accessor("y", 0);

    }

    if ( BaseClass ) Shape.__proto__ = BaseClass;
    Shape.prototype = Object.create( BaseClass && BaseClass.prototype );
    Shape.prototype.constructor = Shape;

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
        @desc Adds event listeners to each shape group or hit area.
        @param {D3Selection} *update* The update cycle of the data binding.
        @private
    */
    Shape.prototype._applyEvents = function _applyEvents (handler) {
      var this$1 = this;


      var events = Object.keys(this._on);
      var loop = function ( e ) {
        handler.on(events[e], function (d, i) {
          if (!this$1._on[events[e]]) { return; }
          if (d.i !== void 0) { i = d.i; }
          if (d.nested && d.values) {
            var cursor = d3Selection.mouse(this$1._select.node()),
                  values = d.values.map(function (d) { return pointDistance(cursor, [this$1._x(d, i), this$1._y(d, i)]); });
            d = d.values[values.indexOf(d3Array.min(values))];
          }
          this$1._on[events[e]].bind(this$1)(d, i);
        });
      };

      for (var e = 0; e < events.length; e++) loop( e );

    };

    /**
        @memberof Shape
        @desc Provides the updated styling to the given shape elements.
        @param {HTMLElement} *elem*
        @param {Object} *style*
        @private
    */
    Shape.prototype._updateStyle = function _updateStyle (elem, style) {

      var that = this;

      if (elem.size() && elem.node().tagName === "g") { elem = elem.selectAll("*"); }

      /**
          @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
          @param {Object} *d* data point
          @param {Number} *i* index
          @private
      */
      function styleLogic(d, i) {
        return typeof this !== "function" ? this
          : d.nested && d.key && d.values
            ? this(d.values[0], that._data.indexOf(d.values[0]))
            : this(d, i);
      }

      var styleObject = {};
      for (var key in style) {
        if ({}.hasOwnProperty.call(style, key)) {
          styleObject[key] = styleLogic.bind(style[key]);
        }
      }

      elem.transition().duration(0).call(d3plusCommon.attrize, styleObject);

    };

    /**
        @memberof Shape
        @desc Provides the default styling to the shape elements.
        @param {HTMLElement} *elem*
        @private
    */
    Shape.prototype._applyStyle = function _applyStyle (elem) {

      var that = this;

      if (elem.size() && elem.node().tagName === "g") { elem = elem.selectAll("*"); }

      /**
          @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
          @param {Object} *d* data point
          @param {Number} *i* index
          @private
      */
      function styleLogic(d, i) {
        return typeof this !== "function" ? this
          : d.nested && d.key && d.values
            ? this(d.values[0], that._data.indexOf(d.values[0]))
            : this(d, i);
      }

      elem
        .attr("fill", styleLogic.bind(this._fill))
        .attr("fill-opacity", styleLogic.bind(this._fillOpacity))
        .attr("rx", styleLogic.bind(this._rx))
        .attr("ry", styleLogic.bind(this._ry))
        .attr("stroke", styleLogic.bind(this._stroke))
        .attr("stroke-dasharray", styleLogic.bind(this._strokeDasharray))
        .attr("stroke-linecap", styleLogic.bind(this._strokeLinecap))
        .attr("stroke-opacity", styleLogic.bind(this._strokeOpacity))
        .attr("stroke-width", styleLogic.bind(this._strokeWidth))
        .attr("vector-effect", styleLogic.bind(this._vectorEffect));
    };

    /**
        @memberof Shape
        @desc Calculates the transform for the group elements.
        @param {HTMLElement} *elem*
        @private
    */
    Shape.prototype._applyTransform = function _applyTransform (elem) {
      var this$1 = this;


      elem
        .attr("transform", function (d, i) { return ("\n        translate(" + (d.__d3plusShape__
      ? d.translate ? d.translate
      : ((this$1._x(d.data, d.i)) + "," + (this$1._y(d.data, d.i)))
      : ((this$1._x(d, i)) + "," + (this$1._y(d, i)))) + ")\n        scale(" + (d.__d3plusShape__ ? d.scale || this$1._scale(d.data, d.i)
    : this$1._scale(d, i)) + ")\n        rotate(" + (d.__d3plusShape__ ? d.rotate ? d.rotate
    : this$1._rotate(d.data || d, d.i)
    : this$1._rotate(d.data || d, d.i)) + ")"); });
    };

    /**
        @memberof Shape
        @desc Checks for nested data and uses the appropriate variables for accessor functions.
        @param {HTMLElement} *elem*
        @private
    */
    Shape.prototype._nestWrapper = function _nestWrapper (method) {
      return function (d, i) { return method(d.__d3plusShape__ ? d.data : d, d.__d3plusShape__ ? d.i : i); };
    };

    /**
        @memberof Shape
        @desc Modifies existing shapes to show active status.
        @private
    */
    Shape.prototype._renderActive = function _renderActive () {

      var that = this;

      this._group.selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox")
        .each(function(d, i) {

          if (!d) { d = {}; }
          if (!d.parentNode) { d.parentNode = this.parentNode; }
          var parent = d.parentNode;

          if (d3Selection.select(this).classed("d3plus-textBox")) { d = d.data; }
          if (d.__d3plusShape__ || d.__d3plus__) {
            while (d && (d.__d3plusShape__ || d.__d3plus__)) {
              i = d.i;
              d = d.data;
            }
          }
          else { i = that._data.indexOf(d); }

          var group = !that._active || typeof that._active !== "function" || !that._active(d, i) ? parent : that._activeGroup.node();
          if (group !== this.parentNode) {
            group.appendChild(this);
            if (this.className.baseVal.includes("d3plus-Shape")) {
              if (parent === group) { d3Selection.select(this).call(that._applyStyle.bind(that)); }
              else { d3Selection.select(this).call(that._updateStyle.bind(that, d3Selection.select(this), that._activeStyle)); }
            }
          }

        });

      // this._renderImage();
      // this._renderLabels();

      this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text"))
        .attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);

    };

    /**
        @memberof Shape
        @desc Modifies existing shapes to show hover status.
        @private
    */
    Shape.prototype._renderHover = function _renderHover () {

      var that = this;

      this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text, g.d3plus-" + (this._name) + "-hover"))
        .selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox")
        .each(function(d, i) {

          if (!d) { d = {}; }
          if (!d.parentNode) { d.parentNode = this.parentNode; }
          var parent = d.parentNode;

          if (d3Selection.select(this).classed("d3plus-textBox")) { d = d.data; }
          if (d.__d3plusShape__ || d.__d3plus__) {
            while (d && (d.__d3plusShape__ || d.__d3plus__)) {
              i = d.i;
              d = d.data;
            }
          }
          else { i = that._data.indexOf(d); }

          var group = !that._hover || typeof that._hover !== "function" || !that._hover(d, i) ? parent : that._hoverGroup.node();
          if (group !== this.parentNode) { group.appendChild(this); }
          if (this.className.baseVal.includes("d3plus-Shape")) {
            if (parent === group) { d3Selection.select(this).call(that._applyStyle.bind(that)); }
            else { d3Selection.select(this).call(that._updateStyle.bind(that, d3Selection.select(this), that._hoverStyle)); }
          }

        });

      // this._renderImage();
      // this._renderLabels();

      this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text"))
        .attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);

    };

    /**
        @memberof Shape
        @desc Adds background image to each shape group.
        @private
    */
    Shape.prototype._renderImage = function _renderImage () {
      var this$1 = this;


      var imageData = [];

      this._update.merge(this._enter).data()
        .forEach(function (datum, i) {

          var aes = this$1._aes(datum, i);

          if (aes.r || aes.width && aes.height) {

            var d = datum;
            if (datum.nested && datum.key && datum.values) {
              d = datum.values[0];
              i = this$1._data.indexOf(d);
            }

            var height = aes.r ? aes.r * 2 : aes.height,
                  url = this$1._backgroundImage(d, i),
                  width = aes.r ? aes.r * 2 : aes.width;

            if (url) {

              var x = d.__d3plusShape__ ? d.translate ? d.translate[0]
                    : this$1._x(d.data, d.i) : this$1._x(d, i),
                  y = d.__d3plusShape__ ? d.translate ? d.translate[1]
                  : this$1._y(d.data, d.i) : this$1._y(d, i);

              if (aes.x) { x += aes.x; }
              if (aes.y) { y += aes.y; }

              if (d.__d3plusShape__) {
                d = d.data;
                i = d.i;
              }

              imageData.push({
                __d3plus__: true,
                data: d,
                height: height,
                i: i,
                id: this$1._id(d, i),
                url: url,
                width: width,
                x: x + -width / 2,
                y: y + -height / 2
              });

            }

          }

        });

      this._backgroundImageClass
        .data(imageData)
        .duration(this._duration)
        .pointerEvents("none")
        .select(d3plusCommon.elem(("g.d3plus-" + (this._name) + "-image"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}}).node())
        .render();

    };

    /**
        @memberof Shape
        @desc Adds labels to each shape group.
        @private
    */
    Shape.prototype._renderLabels = function _renderLabels () {
      var this$1 = this;


      var labelData = [];

      this._update.merge(this._enter).data()
        .forEach(function (datum, i) {

          var d = datum;
          if (datum.nested && datum.key && datum.values) {
            d = datum.values[0];
            i = this$1._data.indexOf(d);
          }

          var labels = this$1._label(d, i);

          if (this$1._labelBounds && labels !== false && labels !== undefined && labels !== null) {

            var bounds = this$1._labelBounds(d, i, this$1._aes(datum, i));

            if (bounds) {

              if (labels.constructor !== Array) { labels = [labels]; }

              var x = d.__d3plusShape__ ? d.translate ? d.translate[0]
                      : this$1._x(d.data, d.i) : this$1._x(d, i),
                    y = d.__d3plusShape__ ? d.translate ? d.translate[1]
                    : this$1._y(d.data, d.i) : this$1._y(d, i);

              if (d.__d3plusShape__) {
                d = d.data;
                i = d.i;
              }

              for (var l = 0; l < labels.length; l++) {

                var b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds);
                var rotate = this$1._rotate(d, i);
                var r = d.labelConfig && d.labelConfig.rotate ? d.labelConfig.rotate : bounds.angle !== undefined ? bounds.angle : 0;
                r += rotate;
                var rotateAnchor = rotate !== 0 ? [b.x * -1 || 0, b.y * -1 || 0] : [b.width / 2, b.height / 2];

                labelData.push({
                  __d3plus__: true,
                  data: d,
                  height: b.height,
                  l: l,
                  id: ((this$1._id(d, i)) + "_" + l),
                  r: r,
                  rotateAnchor: rotateAnchor,
                  text: labels[l],
                  width: b.width,
                  x: x + b.x,
                  y: y + b.y
                });

              }

            }

          }

        });

      this._labelClass
        .data(labelData)
        .duration(this._duration)
        .pointerEvents("none")
        .rotate(function (d) { return d.__d3plus__ ? d.r : d.data.r; })
        .rotateAnchor(function (d) { return d.__d3plus__ ? d.rotateAnchor : d.data.rotateAnchor; })
        .select(d3plusCommon.elem(("g.d3plus-" + (this._name) + "-text"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}}).node())
        .config(this._labelConfig)
        .render();

    };

    /**
        @memberof Shape
        @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
        @param {Function} [*callback*]
        @chainable
    */
    Shape.prototype.render = function render (callback) {
      var this$1 = this;


      if (this._select === void 0) {
        this.select(d3Selection.select("body").append("svg")
          .style("width", ((window.innerWidth) + "px"))
          .style("height", ((window.innerHeight) + "px"))
          .style("display", "block").node());
      }

      this._transition = d3Transition.transition().duration(this._duration);

      var data = this._data, key = this._id;
      if (this._dataFilter) {
        data = this._dataFilter(data);
        if (data.key) { key = data.key; }
      }

      if (this._sort) {
        data = data.sort(function (a, b) {
          while (a.__d3plusShape__ || a.__d3plus__) { a = a.data; }
          while (b.__d3plusShape__ || b.__d3plus__) { b = b.data; }
          return this$1._sort(a, b);
        });
      }

      d3Selection.selectAll(("g.d3plus-" + (this._name) + "-hover > *, g.d3plus-" + (this._name) + "-active > *")).each(function(d) {
        if (d && d.parentNode) { d.parentNode.appendChild(this); }
        else { this.parentNode.removeChild(this); }
      });

      // Makes the update state of the group selection accessible.
      this._group = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-group"), {parent: this._select});
      var update = this._update = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-shape"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}})
        .selectAll((".d3plus-" + (this._name)))
        .data(data, key);

      // Orders and transforms the updating Shapes.
      update.order().transition(this._transition)
        .call(this._applyTransform.bind(this));

      // Makes the enter state of the group selection accessible.
      var enter = this._enter = update.enter().append(this._tagName)
        .attr("class", function (d, i) { return ("d3plus-Shape d3plus-" + (this$1._name) + " d3plus-id-" + (d3plusText.strip(this$1._nestWrapper(this$1._id)(d, i)))); })
        .call(this._applyTransform.bind(this))
        .attr("aria-label", this._ariaLabel)
        .attr("role", this._role)
        .attr("opacity", this._nestWrapper(this._opacity));

      var enterUpdate = enter.merge(update);

      enterUpdate
        .attr("shape-rendering", this._nestWrapper(this._shapeRendering))
        .attr("pointer-events", "none")
        .transition(this._transition)
        .attr("opacity", this._nestWrapper(this._opacity))
        .transition()
        .attr("pointer-events", this._pointerEvents);

      // Makes the exit state of the group selection accessible.
      var exit = this._exit = update.exit();
      exit.transition().delay(this._duration).remove();

      this._renderImage();
      this._renderLabels();

      this._hoverGroup = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-hover"), {parent: this._group});
      this._activeGroup = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-active"), {parent: this._group});

      var hitAreas = this._group.selectAll(".d3plus-HitArea")
        .data(this._hitArea ? data : [], key);

      hitAreas.order()
        .call(this._applyTransform.bind(this));

      var isLine = this._name === "Line";

      isLine && this._path
        .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
        .defined(this._defined)
        .x(this._x)
        .y(this._y);

      var hitEnter = hitAreas.enter().append(isLine ? "path" : "rect")
        .attr("class", function (d, i) { return ("d3plus-HitArea d3plus-id-" + (d3plusText.strip(this$1._nestWrapper(this$1._id)(d, i)))); })
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("pointer-events", "painted")
        .attr("opacity", 0)
        .call(this._applyTransform.bind(this));

      var that = this;

      var hitUpdates = hitAreas.merge(hitEnter)
        .each(function(d) {
          var i = that._data.indexOf(d);
          var h = that._hitArea(d, i, that._aes(d, i));
          return h && !(that._name === "Line" && parseFloat(that._strokeWidth(d, i)) > 10) ? d3Selection.select(this).call(d3plusCommon.attrize, h) : d3Selection.select(this).remove();
        });

      hitAreas.exit().remove();

      this._applyEvents(this._hitArea ? hitUpdates : enterUpdate);

      setTimeout(function () {
        if (this$1._active) { this$1._renderActive(); }
        else if (this$1._hover) { this$1._renderHover(); }
        if (callback) { callback(); }
      }, this._duration + 100);

      return this;

    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Shape.prototype.active = function active (_) {

      if (!arguments.length || _ === undefined) { return this._active; }
      this._active = _;
      if (this._group) {
        // this._renderImage();
        // this._renderLabels();
        this._renderActive();
      }
      return this;

    };

    /**
        @memberof Shape
        @desc When shapes are active, this is the opacity of any shape that is not active.
        @param {Number} *value* = 0.25
        @chainable
    */
    Shape.prototype.activeOpacity = function activeOpacity (_) {
      return arguments.length ? (this._activeOpacity = _, this) : this._activeOpacity;
    };

    /**
        @memberof Shape
        @desc The style to apply to active shapes.
        @param {Object} *value*
        @chainable
    */
    Shape.prototype.activeStyle = function activeStyle (_) {
      return arguments.length ? (this._activeStyle = d3plusCommon.assign({}, this._activeStyle, _), this) : this._activeStyle;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the aria-label attribute to the specified function or string and returns the current class instance.
        @param {Function|String} *value*
        @chainable
    */
    Shape.prototype.ariaLabel = function ariaLabel (_) {
      return _ !== undefined
        ? (this._ariaLabel = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
        : this._ariaLabel;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value* = false]
        @chainable
    */
    Shape.prototype.backgroundImage = function backgroundImage (_) {
      return arguments.length
        ? (this._backgroundImage = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
        : this._backgroundImage;
    };

    /**
        @memberof Shape
        @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.
        @param {Array} [*data* = []]
        @chainable
    */
    Shape.prototype.data = function data (_) {
      return arguments.length
        ? (this._data = _, this)
        : this._data;
    };

    /**
        @memberof Shape
        @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
        @param {Number} [*ms* = 600]
        @chainable
    */
    Shape.prototype.duration = function duration (_) {
      return arguments.length
        ? (this._duration = _, this)
        : this._duration;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value* = "black"]
        @chainable
    */
    Shape.prototype.fill = function fill (_) {
      return arguments.length
        ? (this._fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
        : this._fill;
    };

    /**
        @memberof Shape
        @desc Defines the "fill-opacity" attribute for the shapes.
        @param {Function|Number} [*value* = 1]
        @chainable
    */
    Shape.prototype.fillOpacity = function fillOpacity (_) {
      return arguments.length
        ? (this._fillOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
        : this._fillOpacity;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Shape.prototype.hover = function hover (_) {

      if (!arguments.length || _ === void 0) { return this._hover; }
      this._hover = _;
      if (this._group) {
        // this._renderImage();
        // this._renderLabels();
        this._renderHover();
      }
      return this;

    };

    /**
        @memberof Shape
        @desc The style to apply to hovered shapes.
        @param {Object} *value*
        @chainable
     */
    Shape.prototype.hoverStyle = function hoverStyle (_) {
      return arguments.length ? (this._hoverStyle = d3plusCommon.assign({}, this._hoverStyle, _), this) : this._hoverStyle;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the hover opacity to the specified function and returns the current class instance.
        @param {Number} [*value* = 0.5]
        @chainable
    */
    Shape.prototype.hoverOpacity = function hoverOpacity (_) {
      return arguments.length ? (this._hoverOpacity = _, this) : this._hoverOpacity;
    };

    /**
        @memberof Shape
        @desc If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.
        @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`.
        @chainable
        @example
  function(d, i, shape) {
    return {
      "width": shape.width,
      "height": shape.height,
      "x": -shape.width / 2,
      "y": -shape.height / 2
    };
  }
    */
    Shape.prototype.hitArea = function hitArea (_) {
      return arguments.length ? (this._hitArea = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._hitArea;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Shape.prototype.id = function id (_) {
      return arguments.length ? (this._id = _, this) : this._id;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.
        @param {Function|String|Array} [*value*]
        @chainable
    */
    Shape.prototype.label = function label (_) {
      return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
    };

    /**
        @memberof Shape
        @desc If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.
        @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
        @chainable
        @example
  function(d, i, shape) {
    return {
      "width": shape.width,
      "height": shape.height,
      "x": -shape.width / 2,
      "y": -shape.height / 2
    };
  }
    */
    Shape.prototype.labelBounds = function labelBounds (_) {
      return arguments.length ? (this._labelBounds = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._labelBounds;
    };

    /**
        @memberof Shape
        @desc A pass-through to the config method of the TextBox class used to create a shape's labels.
        @param {Object} [*value*]
        @chainable
    */
    Shape.prototype.labelConfig = function labelConfig (_) {
      return arguments.length ? (this._labelConfig = d3plusCommon.assign(this._labelConfig, _), this) : this._labelConfig;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance.
        @param {Number} [*value* = 1]
        @chainable
    */
    Shape.prototype.opacity = function opacity (_) {
      return arguments.length ? (this._opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._opacity;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the pointerEvents accessor to the specified function or string and returns the current class instance.
        @param {String} [*value*]
        @chainable
     */
    Shape.prototype.pointerEvents = function pointerEvents (_) {
      return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the role attribute to the specified function or string and returns the current class instance.
        @param {Function|String} *value*
        @chainable
    */
    Shape.prototype.role = function role (_) {
      return _ !== undefined
        ? (this._role = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
        : this._role;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the rotate accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value* = 0]
        @chainable
     */
    Shape.prototype.rotate = function rotate (_) {
      return arguments.length ? (this._rotate = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._rotate;
    };

    /**
        @memberof Shape
        @desc Defines the "rx" attribute for the shapes.
        @param {Function|Number} [*value* = 0]
        @chainable
    */
    Shape.prototype.rx = function rx (_) {
      return arguments.length ? (this._rx = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._rx;
    };

    /**
        @memberof Shape
        @desc Defines the "rx" attribute for the shapes.
        @param {Function|Number} [*value* = 0]
        @chainable
    */
    Shape.prototype.ry = function ry (_) {
      return arguments.length ? (this._ry = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._ry;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance.
        @param {Function|Number} [*value* = 1]
        @chainable
    */
    Shape.prototype.scale = function scale (_) {
      return arguments.length ? (this._scale = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._scale;
    };

    /**
        @memberof Shape
        @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
        @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
        @chainable
    */
    Shape.prototype.select = function select$1 (_) {
      return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value* = "geometricPrecision"]
        @chainable
        @example
  function(d) {
    return d.x;
  }
    */
    Shape.prototype.shapeRendering = function shapeRendering (_) {
      return arguments.length ? (this._shapeRendering = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shapeRendering;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the sort comparator to the specified function and returns the current class instance.
        @param {false|Function} [*value* = []]
        @chainable
    */
    Shape.prototype.sort = function sort (_) {
      return arguments.length ? (this._sort = _, this) : this._sort;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value* = "black"]
        @chainable
    */
    Shape.prototype.stroke = function stroke (_) {
      return arguments.length ? (this._stroke = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._stroke;
    };

    /**
        @memberof Shape
        @desc Defines the "stroke-dasharray" attribute for the shapes.
        @param {Function|String} [*value* = "1"]
        @chainable
    */
    Shape.prototype.strokeDasharray = function strokeDasharray (_) {
      return arguments.length ? (this._strokeDasharray = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeDasharray;
    };

    /**
        @memberof Shape
        @desc Defines the "stroke-linecap" attribute for the shapes. Accepted values are `"butt"`, `"round"`, and `"square"`.
        @param {Function|String} [*value* = "butt"]
        @chainable
    */
    Shape.prototype.strokeLinecap = function strokeLinecap (_) {
      return arguments.length ? (this._strokeLinecap = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeLinecap;
    };

    /**
        @memberof Shape
        @desc Defines the "stroke-opacity" attribute for the shapes.
        @param {Function|Number} [*value* = 1]
        @chainable
    */
    Shape.prototype.strokeOpacity = function strokeOpacity (_) {
      return arguments.length ? (this._strokeOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeOpacity;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance.
        @param {Function|Number} [*value* = 0]
        @chainable
    */
    Shape.prototype.strokeWidth = function strokeWidth (_) {
      return arguments.length ? (this._strokeWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeWidth;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance.
        @param {Function|String|Array} [*value* = "start"]
        @chainable
    */
    Shape.prototype.textAnchor = function textAnchor (_) {
      return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._textAnchor;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value* = "non-scaling-stroke"]
        @chainable
    */
    Shape.prototype.vectorEffect = function vectorEffect (_) {
      return arguments.length ? (this._vectorEffect = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._vectorEffect;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance.
        @param {Function|String|Array} [*value* = "start"]
        @chainable
    */
    Shape.prototype.verticalAlign = function verticalAlign (_) {
      return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._verticalAlign;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.x;
  }
    */
    Shape.prototype.x = function x (_) {
      return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
    };

    /**
        @memberof Shape
        @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.y;
  }
    */
    Shape.prototype.y = function y (_) {
      return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
    };

    return Shape;
  }(d3plusCommon.BaseClass));

  /**
      @function lineIntersection
      @desc Finds the intersection point (if there is one) of the lines p1q1 and p2q2.
      @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function lineIntersection(p1, q1, p2, q2) {

    // allow for some margins due to numerical errors
    var eps = 1e-9;

    // find the intersection point between the two infinite lines
    var dx1 = p1[0] - q1[0],
          dx2 = p2[0] - q2[0],
          dy1 = p1[1] - q1[1],
          dy2 = p2[1] - q2[1];

    var denom = dx1 * dy2 - dy1 * dx2;

    if (Math.abs(denom) < eps) { return null; }

    var cross1 = p1[0] * q1[1] - p1[1] * q1[0],
          cross2 = p2[0] * q2[1] - p2[1] * q2[0];

    var px = (cross1 * dx2 - cross2 * dx1) / denom,
          py = (cross1 * dy2 - cross2 * dy1) / denom;

    return [px, py];

  }

  /**
      @function segmentBoxContains
      @desc Checks whether a point is inside the bounding box of a line segment.
      @param {Array} s1 The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
      @param {Array} s2 The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
      @param {Array} p The point to be checked, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function segmentBoxContains(s1, s2, p) {

    var eps = 1e-9;
    var px = p[0];
    var py = p[1];

    return !(px < Math.min(s1[0], s2[0]) - eps || px > Math.max(s1[0], s2[0]) + eps ||
             py < Math.min(s1[1], s2[1]) - eps || py > Math.max(s1[1], s2[1]) + eps);

  }

  /**
      @function segmentsIntersect
      @desc Checks whether the line segments p1q1 && p2q2 intersect.
      @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function segmentsIntersect(p1, q1, p2, q2) {

    var p = lineIntersection(p1, q1, p2, q2);
    if (!p) { return false; }
    return segmentBoxContains(p1, q1, p) && segmentBoxContains(p2, q2, p);

  }

  /**
      @function polygonInside
      @desc Checks if one polygon is inside another polygon.
      @param {Array} polyA An Array of `[x, y]` points to be used as the inner polygon, checking if it is inside polyA.
      @param {Array} polyB An Array of `[x, y]` points to be used as the containing polygon.
      @returns {Boolean}
  */
  function polygonInside(polyA, polyB) {

    var iA = -1;
    var nA = polyA.length;
    var nB = polyB.length;
    var bA = polyA[nA - 1];

    while (++iA < nA) {

      var aA = bA;
      bA = polyA[iA];

      var iB = -1;
      var bB = polyB[nB - 1];
      while (++iB < nB) {
        var aB = bB;
        bB = polyB[iB];
        if (segmentsIntersect(aA, bA, aB, bB)) { return false; }
      }
    }

    return d3Polygon.polygonContains(polyB, polyA[0]);

  }

  /**
      @function polygonRayCast
      @desc Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.
      @param {Array} poly The polygon to test against, which should be an `[x, y]` formatted Array.
      @param {Array} origin The origin point of the ray to be cast, which should be an `[x, y]` formatted Array.
      @param {Number} [alpha = 0] The angle in radians of the ray.
      @returns {Array} An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.
  */
  function polygonRayCast(poly, origin, alpha) {
    if ( alpha === void 0 ) alpha = 0;


    var eps = 1e-9;
    origin = [origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha)];
    var x0 = origin[0];
    var y0 = origin[1];
    var shiftedOrigin = [x0 + Math.cos(alpha), y0 + Math.sin(alpha)];

    var idx = 0;
    if (Math.abs(shiftedOrigin[0] - x0) < eps) { idx = 1; }
    var i = -1;
    var n = poly.length;
    var b = poly[n - 1];
    var minSqDistLeft = Number.MAX_VALUE;
    var minSqDistRight = Number.MAX_VALUE;
    var closestPointLeft = null;
    var closestPointRight = null;
    while (++i < n) {
      var a = b;
      b = poly[i];
      var p = lineIntersection(origin, shiftedOrigin, a, b);
      if (p && segmentBoxContains(a, b, p)) {
        var sqDist = pointDistanceSquared(origin, p);
        if (p[idx] < origin[idx]) {
          if (sqDist < minSqDistLeft) {
            minSqDistLeft = sqDist;
            closestPointLeft = p;
          }
        }
        else if (p[idx] > origin[idx]) {
          if (sqDist < minSqDistRight) {
            minSqDistRight = sqDist;
            closestPointRight = p;
          }
        }
      }
    }

    return [closestPointLeft, closestPointRight];

  }

  /**
      @function pointRotate
      @desc Rotates a point around a given origin.
      @param {Array} p The point to be rotated, which should always be an `[x, y]` formatted Array.
      @param {Number} alpha The angle in radians to rotate.
      @param {Array} [origin = [0, 0]] The origin point of the rotation, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function pointRotate(p, alpha, origin) {
    if ( origin === void 0 ) origin = [0, 0];


    var cosAlpha = Math.cos(alpha),
          sinAlpha = Math.sin(alpha),
          xshifted = p[0] - origin[0],
          yshifted = p[1] - origin[1];

    return [
      cosAlpha * xshifted - sinAlpha * yshifted + origin[0],
      sinAlpha * xshifted + cosAlpha * yshifted + origin[1]
    ];

  }

  /**
      @function polygonRotate
      @desc Rotates a point around a given origin.
      @param {Array} poly The polygon to be rotated, which should be an Array of `[x, y]` values.
      @param {Number} alpha The angle in radians to rotate.
      @param {Array} [origin = [0, 0]] The origin point of the rotation, which should be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function polygonRotate (poly, alpha, origin) {
      if ( origin === void 0 ) origin = [0, 0];

      return poly.map(function (p) { return pointRotate(p, alpha, origin); });
  }

  /**
      @desc square distance from a point to a segment
      @param {Array} point
      @param {Array} segmentAnchor1
      @param {Array} segmentAnchor2
      @private
  */
  function getSqSegDist(p, p1, p2) {

    var x = p1[0],
        y = p1[1];

    var dx = p2[0] - x,
        dy = p2[1] - y;

    if (dx !== 0 || dy !== 0) {

      var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

      if (t > 1) {
        x = p2[0];
        y = p2[1];

      }
      else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }

    }

    dx = p[0] - x;
    dy = p[1] - y;

    return dx * dx + dy * dy;

  }

  /**
      @desc basic distance-based simplification
      @param {Array} polygon
      @param {Number} sqTolerance
      @private
  */
  function simplifyRadialDist(poly, sqTolerance) {

    var point,
        prevPoint = poly[0];

    var newPoints = [prevPoint];

    for (var i = 1, len = poly.length; i < len; i++) {
      point = poly[i];

      if (pointDistanceSquared(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }

    if (prevPoint !== point) { newPoints.push(point); }

    return newPoints;
  }

  /**
      @param {Array} polygon
      @param {Number} first
      @param {Number} last
      @param {Number} sqTolerance
      @param {Array} simplified
      @private
  */
  function simplifyDPStep(poly, first, last, sqTolerance, simplified) {

    var index, maxSqDist = sqTolerance;

    for (var i = first + 1; i < last; i++) {
      var sqDist = getSqSegDist(poly[i], poly[first], poly[last]);

      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      if (index - first > 1) { simplifyDPStep(poly, first, index, sqTolerance, simplified); }
      simplified.push(poly[index]);
      if (last - index > 1) { simplifyDPStep(poly, index, last, sqTolerance, simplified); }
    }
  }

  /**
      @desc simplification using Ramer-Douglas-Peucker algorithm
      @param {Array} polygon
      @param {Number} sqTolerance
      @private
  */
  function simplifyDouglasPeucker(poly, sqTolerance) {
    var last = poly.length - 1;

    var simplified = [poly[0]];
    simplifyDPStep(poly, 0, last, sqTolerance, simplified);
    simplified.push(poly[last]);

    return simplified;
  }

  /**
      @function largestRect
      @desc Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent [Simplify.js](http://mourner.github.io/simplify-js/).
      @author Vladimir Agafonkin
      @param {Array} poly An Array of points that represent a polygon.
      @param {Number} [tolerance = 1] Affects the amount of simplification (in the same metric as the point coordinates).
      @param {Boolean} [highestQuality = false] Excludes distance-based preprocessing step which leads to highest quality simplification but runs ~10-20 times slower.

  */
  function simplify (poly, tolerance, highestQuality) {
    if ( tolerance === void 0 ) tolerance = 1;
    if ( highestQuality === void 0 ) highestQuality = false;


    if (poly.length <= 2) { return poly; }

    var sqTolerance = tolerance * tolerance;

    poly = highestQuality ? poly : simplifyRadialDist(poly, sqTolerance);
    poly = simplifyDouglasPeucker(poly, sqTolerance);

    return poly;

  }

  // Algorithm constants
  var aspectRatioStep = 0.5; // step size for the aspect ratio
  var angleStep = 5; // step size for angles (in degrees); has linear impact on running time

  var polyCache = {};

  /**
      @typedef {Object} LargestRect
      @desc The returned Object of the largestRect function.
      @property {Number} width The width of the rectangle
      @property {Number} height The height of the rectangle
      @property {Number} cx The x coordinate of the rectangle's center
      @property {Number} cy The y coordinate of the rectangle's center
      @property {Number} angle The rotation angle of the rectangle in degrees. The anchor of rotation is the center point.
      @property {Number} area The area of the largest rectangle.
      @property {Array} points An array of x/y coordinates for each point in the rectangle, useful for rendering paths.
  */

  /**
      @function largestRect
      @author Daniel Smilkov [dsmilkov@gmail.com]
      @desc An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.
      @param {Array} poly An Array of points that represent a polygon.
      @param {Object} [options] An Object that allows for overriding various parameters of the algorithm.
      @param {Number|String|Array} [options.angle = d3.range(-90, 95, 5)] The allowed rotations of the final rectangle.
      @param {Number|String|Array} [options.aspectRatio] The ratio between the width and height of the rectangle. The value can be a number, a string which is parsed to a number, or an array of numbers specifying the possible aspect ratios of the final rectangle.
      @param {Number} [options.maxAspectRatio = 15] The maximum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided.
      @param {Number} [options.minAspectRatio = 1] The minimum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided.
      @param {Number} [options.nTries = 20] The number of randomly drawn points inside the polygon which the algorithm explores as possible center points of the maximal rectangle.
      @param {Number} [options.minHeight = 0] The minimum height of the rectangle.
      @param {Number} [options.minWidth = 0] The minimum width of the rectangle.
      @param {Number} [options.tolerance = 0.02] The simplification tolerance factor, between 0 and 1. A larger tolerance corresponds to more extensive simplification.
      @param {Array} [options.origin] The center point of the rectangle. If specified, the rectangle will be fixed at that point, otherwise the algorithm optimizes across all possible points. The given value can be either a two dimensional array specifying the x and y coordinate of the origin or an array of two dimensional points specifying multiple possible center points of the rectangle.
      @param {Boolean} [options.cache] Whether or not to cache the result, which would be used in subsequent calculations to preserve consistency and speed up calculation time.
      @return {LargestRect}
  */
  function largestRect(poly, options) {
    var assign, assign$1;

    if ( options === void 0 ) options = {};

    if (poly.length < 3) {
      if (options.verbose) { console.error("polygon has to have at least 3 points", poly); }
      return null;
    }

    // For visualization debugging purposes
    var events = [];

    // User's input normalization
    options = Object.assign({
      angle: d3Array.range(-90, 90 + angleStep, angleStep),
      cache: true,
      maxAspectRatio: 15,
      minAspectRatio: 1,
      minHeight: 0,
      minWidth: 0,
      nTries: 20,
      tolerance: 0.02,
      verbose: false
    }, options);

    var angles = options.angle instanceof Array ? options.angle
      : typeof options.angle === "number" ? [options.angle]
      : typeof options.angle === "string" && !isNaN(options.angle) ? [Number(options.angle)]
      : [];

    var aspectRatios = options.aspectRatio instanceof Array ? options.aspectRatio
      : typeof options.aspectRatio === "number" ? [options.aspectRatio]
      : typeof options.aspectRatio === "string" && !isNaN(options.aspectRatio) ? [Number(options.aspectRatio)]
      : [];

    var origins = options.origin && options.origin instanceof Array
      ? options.origin[0] instanceof Array ? options.origin
      : [options.origin] : [];

    var cacheString;
    if (options.cache) {
      cacheString = d3Array.merge(poly).join(",");
      cacheString += "-" + (options.minAspectRatio);
      cacheString += "-" + (options.maxAspectRatio);
      cacheString += "-" + (options.minHeight);
      cacheString += "-" + (options.minWidth);
      cacheString += "-" + (angles.join(","));
      cacheString += "-" + (origins.join(","));
      if (polyCache[cacheString]) { return polyCache[cacheString]; }
    }

    var area = Math.abs(d3Polygon.polygonArea(poly)); // take absolute value of the signed area
    if (area === 0) {
      if (options.verbose) { console.error("polygon has 0 area", poly); }
      return null;
    }
    // get the width of the bounding box of the original polygon to determine tolerance
    var ref = d3Array.extent(poly, function (d) { return d[0]; });
    var minx = ref[0];
    var maxx = ref[1];
    var ref$1 = d3Array.extent(poly, function (d) { return d[1]; });
    var miny = ref$1[0];
    var maxy = ref$1[1];

    // simplify polygon
    var tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;

    if (tolerance > 0) { poly = simplify(poly, tolerance); }
    if (options.events) { events.push({type: "simplify", poly: poly}); }

    // get the width of the bounding box of the simplified polygon
    (assign = d3Array.extent(poly, function (d) { return d[0]; }), minx = assign[0], maxx = assign[1]);
    (assign$1 = d3Array.extent(poly, function (d) { return d[1]; }), miny = assign$1[0], maxy = assign$1[1]);
    var ref$2 = [maxx - minx, maxy - miny];
    var boxWidth = ref$2[0];
    var boxHeight = ref$2[1];

    // discretize the binary search for optimal width to a resolution of this times the polygon width
    var widthStep = Math.min(boxWidth, boxHeight) / 50;

    // populate possible center points with random points inside the polygon
    if (!origins.length) {
      // get the centroid of the polygon
      var centroid = d3Polygon.polygonCentroid(poly);
      if (isNaN(centroid[0])) {
        if (options.verbose) { console.error("cannot find centroid", poly); }
        return null;
      }
      if (d3Polygon.polygonContains(poly, centroid)) { origins.push(centroid); }
      // get few more points inside the polygon
      while (origins.length < options.nTries) {
        var rndX = Math.random() * boxWidth + minx;
        var rndY = Math.random() * boxHeight + miny;
        var rndPoint = [rndX, rndY];
        if (d3Polygon.polygonContains(poly, rndPoint)) { origins.push(rndPoint); }
      }
    }
    if (options.events) { events.push({type: "origins", points: origins}); }
    var maxArea = 0;
    var maxRect = null;

    for (var ai = 0; ai < angles.length; ai++) {
      var angle = angles[ai];
      var angleRad = -angle * Math.PI / 180;
      if (options.events) { events.push({type: "angle", angle: angle}); }
      for (var i = 0; i < origins.length; i++) {
        var origOrigin = origins[i];
        // generate improved origins
        var ref$3 = polygonRayCast(poly, origOrigin, angleRad);
        var p1W = ref$3[0];
        var p2W = ref$3[1];
        var ref$4 = polygonRayCast(poly, origOrigin, angleRad + Math.PI / 2);
        var p1H = ref$4[0];
        var p2H = ref$4[1];
        var modifOrigins = [];
        if (p1W && p2W) { modifOrigins.push([(p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2]); } // average along with width axis
        if (p1H && p2H) { modifOrigins.push([(p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2]); } // average along with height axis

        if (options.events) { events.push({type: "modifOrigin", idx: i, p1W: p1W, p2W: p2W, p1H: p1H, p2H: p2H, modifOrigins: modifOrigins}); }

        for (var i$1 = 0; i$1 < modifOrigins.length; i$1++) {

          var origin = modifOrigins[i$1];

          if (options.events) { events.push({type: "origin", cx: origin[0], cy: origin[1]}); }

          var ref$5 = polygonRayCast(poly, origin, angleRad);
          var p1W$1 = ref$5[0];
          var p2W$1 = ref$5[1];
          if (p1W$1 === null || p2W$1 === null) { continue; }
          var minSqDistW = Math.min(pointDistanceSquared(origin, p1W$1), pointDistanceSquared(origin, p2W$1));
          var maxWidth = 2 * Math.sqrt(minSqDistW);

          var ref$6 = polygonRayCast(poly, origin, angleRad + Math.PI / 2);
          var p1H$1 = ref$6[0];
          var p2H$1 = ref$6[1];
          if (p1H$1 === null || p2H$1 === null) { continue; }
          var minSqDistH = Math.min(pointDistanceSquared(origin, p1H$1), pointDistanceSquared(origin, p2H$1));
          var maxHeight = 2 * Math.sqrt(minSqDistH);

          if (maxWidth * maxHeight < maxArea) { continue; }

          var aRatios = aspectRatios;
          if (!aRatios.length) {
            var minAspectRatio = Math.max(options.minAspectRatio, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
            var maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, maxWidth * maxWidth / maxArea);
            aRatios = d3Array.range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
          }

          for (var a = 0; a < aRatios.length; a++) {

            var aRatio = aRatios[a];

            // do a binary search to find the max width that works
            var left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
            var right = Math.min(maxWidth, maxHeight * aRatio);
            if (right * maxHeight < maxArea) { continue; }

            if (options.events && right - left >= widthStep) { events.push({type: "aRatio", aRatio: aRatio}); }

            while (right - left >= widthStep) {
              var width = (left + right) / 2;
              var height = width / aRatio;
              var cx = origin[0];
              var cy = origin[1];
              var rectPoly = [
                [cx - width / 2, cy - height / 2],
                [cx + width / 2, cy - height / 2],
                [cx + width / 2, cy + height / 2],
                [cx - width / 2, cy + height / 2]
              ];
              rectPoly = polygonRotate(rectPoly, angleRad, origin);
              var insidePoly = polygonInside(rectPoly, poly);
              if (insidePoly) {
                // we know that the area is already greater than the maxArea found so far
                maxArea = width * height;
                rectPoly.push(rectPoly[0]);
                maxRect = {area: maxArea, cx: cx, cy: cy, width: width, height: height, angle: -angle, points: rectPoly};
                left = width; // increase the width in the binary search
              }
              else {
                right = width; // decrease the width in the binary search
              }
              if (options.events) { events.push({type: "rectangle", areaFraction: width * height / area, cx: cx, cy: cy, width: width, height: height, angle: angle, insidePoly: insidePoly}); }

            }

          }

        }

      }

    }

    if (options.cache) {
      polyCache[cacheString] = maxRect;
    }

    return options.events ? Object.assign(maxRect || {}, {events: events}) : maxRect;

  }

  /**
      @class Area
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */
  var Area = (function (Shape$$1) {
    function Area() {
      var this$1 = this;


      Shape$$1.call(this);

      this._curve = "linear";
      this._defined = function () { return true; };
      this._labelBounds = function (d, i, aes) {
        var r = largestRect(aes.points);
        if (!r) { return null; }
        return {angle: r.angle, width: r.width, height: r.height, x: r.cx - r.width / 2 - this$1._x(d, i), y: r.cy - r.height / 2 - this$1._y(d, i)};
      };
      this._labelConfig = Object.assign(this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      this._name = "Area";
      this._x = d3plusCommon.accessor("x");
      this._x0 = d3plusCommon.accessor("x");
      this._x1 = null;
      this._y = d3plusCommon.constant(0);
      this._y0 = d3plusCommon.constant(0);
      this._y1 = d3plusCommon.accessor("y");

    }

    if ( Shape$$1 ) Area.__proto__ = Shape$$1;
    Area.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Area.prototype.constructor = Area;

    /**
        @memberof Area
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Area.prototype._aes = function _aes (d) {
      var this$1 = this;

      var values = d.values.slice().sort(function (a, b) { return this$1._y1 ? this$1._x(a) - this$1._x(b) : this$1._y(a) - this$1._y(b); });
      var points1 = values.map(function (v, z) { return [this$1._x0(v, z), this$1._y0(v, z)]; });
      var points2 = values.reverse().map(function (v, z) { return this$1._y1 ? [this$1._x(v, z), this$1._y1(v, z)] : [this$1._x1(v, z), this$1._y(v, z)]; });
      var points = points1.concat(points2);
      if (points1[0][1] > points2[0][1]) { points = points.reverse(); }
      points.push(points[0]);
      return {points: points};
    };

    /**
        @memberof Area
        @desc Filters/manipulates the data array before binding each point to an SVG group.
        @param {Array} [*data* = the data array to be filtered]
        @private
    */
    Area.prototype._dataFilter = function _dataFilter (data) {
      var this$1 = this;


      var areas = d3Collection.nest().key(this._id).entries(data).map(function (d) {

        d.data = d3plusCommon.merge(d.values);
        d.i = data.indexOf(d.values[0]);

        var x = d3Array.extent(d.values.map(this$1._x)
          .concat(d.values.map(this$1._x0))
          .concat(this$1._x1 ? d.values.map(this$1._x1) : [])
        );
        d.xR = x;
        d.width = x[1] - x[0];
        d.x = x[0] + d.width / 2;

        var y = d3Array.extent(d.values.map(this$1._y)
          .concat(d.values.map(this$1._y0))
          .concat(this$1._y1 ? d.values.map(this$1._y1) : [])
        );
        d.yR = y;
        d.height = y[1] - y[0];
        d.y = y[0] + d.height / 2;

        d.nested = true;
        d.translate = [d.x, d.y];
        d.__d3plusShape__ = true;

        return d;
      });

      areas.key = function (d) { return d.key; };
      return areas;

    };

    /**
        @memberof Area
        @desc Draws the area polygons.
        @param {Function} [*callback*]
        @chainable
    */
    Area.prototype.render = function render (callback) {

      Shape$$1.prototype.render.call(this, callback);

      var path = this._path = paths.area()
        .defined(this._defined)
        .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
        .x(this._x).x0(this._x0).x1(this._x1)
        .y(this._y).y0(this._y0).y1(this._y1);

      var exitPath = paths.area()
        .defined(function (d) { return d; })
        .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
        .x(this._x).x0(this._x0).x1(this._x1)
        .y(this._y).y0(this._y0).y1(this._y1);

      this._enter.append("path")
        .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
        .attr("d", function (d) { return path(d.values); })
        .call(this._applyStyle.bind(this));

      this._update.select("path").transition(this._transition)
        .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
        .attrTween("d", function(d) {
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), path(d.values));
        })
        .call(this._applyStyle.bind(this));

      this._exit.select("path").transition(this._transition)
        .attrTween("d", function(d) {
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), exitPath(d.values));
        });

      return this;

    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.
        @param {String} [*value* = "linear"]
        @chainable
    */
    Area.prototype.curve = function curve (_) {
      return arguments.length ? (this._curve = _, this) : this._curve;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
        @param {Function} [*value*]
        @chainable
    */
    Area.prototype.defined = function defined (_) {
      return arguments.length ? (this._defined = _, this) : this._defined;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
        @param {Function|Number} [*value*]
        @chainable
    */
    Area.prototype.x = function x (_) {
      if (!arguments.length) { return this._x; }
      this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._x0 = this._x;
      return this;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
        @param {Function|Number} [*value*]
        @chainable
    */
    Area.prototype.x0 = function x0 (_) {
      if (!arguments.length) { return this._x0; }
      this._x0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._x = this._x0;
      return this;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.
        @param {Function|Number|null} [*value*]
        @chainable
    */
    Area.prototype.x1 = function x1 (_) {
      return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._x1;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
        @param {Function|Number} [*value*]
        @chainable
    */
    Area.prototype.y = function y (_) {
      if (!arguments.length) { return this._y; }
      this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._y0 = this._y;
      return this;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
        @param {Function|Number} [*value*]
        @chainable
    */
    Area.prototype.y0 = function y0 (_) {
      if (!arguments.length) { return this._y0; }
      this._y0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._y = this._y0;
      return this;
    };

    /**
        @memberof Area
        @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.
        @param {Function|Number|null} [*value*]
        @chainable
    */
    Area.prototype.y1 = function y1 (_) {
      return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._y1;
    };

    return Area;
  }(Shape));

  /**
      @class Bar
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */
  var Bar = (function (Shape$$1) {
    function Bar() {
      var this$1 = this;


      Shape$$1.call(this, "rect");

      this._name = "Bar";
      this._height = d3plusCommon.constant(10);
      this._labelBounds = function (d, i, s) { return ({
        width: s.width,
        height: s.height,
        x: this$1._x1 !== null ? this$1._getX(d, i) : -s.width / 2,
        y: this$1._x1 === null ? this$1._getY(d, i) : -s.height / 2
      }); };
      this._width = d3plusCommon.constant(10);
      this._x = d3plusCommon.accessor("x");
      this._x0 = d3plusCommon.accessor("x");
      this._x1 = null;
      this._y = d3plusCommon.constant(0);
      this._y0 = d3plusCommon.constant(0);
      this._y1 = d3plusCommon.accessor("y");

    }

    if ( Shape$$1 ) Bar.__proto__ = Shape$$1;
    Bar.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Bar.prototype.constructor = Bar;

    /**
        @memberof Bar
        @desc Draws the bars.
        @param {Function} [*callback*]
        @chainable
    */
    Bar.prototype.render = function render (callback) {
      var this$1 = this;


      Shape$$1.prototype.render.call(this, callback);

      this._enter
        .attr("width", function (d, i) { return this$1._x1 === null ? this$1._getWidth(d, i) : 0; })
        .attr("height", function (d, i) { return this$1._x1 !== null ? this$1._getHeight(d, i) : 0; })
        .attr("x", function (d, i) { return this$1._x1 === null ? -this$1._getWidth(d, i) / 2 : 0; })
        .attr("y", function (d, i) { return this$1._x1 !== null ? -this$1._getHeight(d, i) / 2 : 0; })
        .call(this._applyStyle.bind(this))
        .transition(this._transition)
        .call(this._applyPosition.bind(this));

      this._update.transition(this._transition)
        .call(this._applyStyle.bind(this))
        .call(this._applyPosition.bind(this));

      this._exit.transition(this._transition)
        .attr("width", function (d, i) { return this$1._x1 === null ? this$1._getWidth(d, i) : 0; })
        .attr("height", function (d, i) { return this$1._x1 !== null ? this$1._getHeight(d, i) : 0; })
        .attr("x", function (d, i) { return this$1._x1 === null ? -this$1._getWidth(d, i) / 2 : 0; })
        .attr("y", function (d, i) { return this$1._x1 !== null ? -this$1._getHeight(d, i) / 2 : 0; });

      return this;

    };

    /**
        @memberof Bar
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Bar.prototype._aes = function _aes (d, i) {
      return {height: this._getHeight(d, i), width: this._getWidth(d, i)};
    };

    /**
        @memberof Bar
        @desc Provides the default positioning to the <rect> elements.
        @param {D3Selection} *elem*
        @private
    */
    Bar.prototype._applyPosition = function _applyPosition (elem) {
      var this$1 = this;

      elem
        .attr("width", function (d, i) { return this$1._getWidth(d, i); })
        .attr("height", function (d, i) { return this$1._getHeight(d, i); })
        .attr("x", function (d, i) { return this$1._x1 !== null ? this$1._getX(d, i) : -this$1._getWidth(d, i) / 2; })
        .attr("y", function (d, i) { return this$1._x1 === null ? this$1._getY(d, i) : -this$1._getHeight(d, i) / 2; });
    };

    /**
        @memberof Bar
        @desc Calculates the height of the <rect> by assessing the x and y properties.
        @param {Object} *d*
        @param {Number} *i*
        @private
    */
    Bar.prototype._getHeight = function _getHeight (d, i) {
      if (this._x1 !== null) { return this._height(d, i); }
      return Math.abs(this._y1(d, i) - this._y(d, i));
    };

    /**
        @memberof Bar
        @desc Calculates the width of the <rect> by assessing the x and y properties.
        @param {Object} *d*
        @param {Number} *i*
        @private
    */
    Bar.prototype._getWidth = function _getWidth (d, i) {
      if (this._x1 === null) { return this._width(d, i); }
      return Math.abs(this._x1(d, i) - this._x(d, i));
    };

    /**
        @memberof Bar
        @desc Calculates the x of the <rect> by assessing the x and width properties.
        @param {Object} *d*
        @param {Number} *i*
        @private
    */
    Bar.prototype._getX = function _getX (d, i) {
      var w = this._x1 === null ? this._x(d, i) : this._x1(d, i) - this._x(d, i);
      if (w < 0) { return w; }
      else { return 0; }
    };

    /**
        @memberof Bar
        @desc Calculates the y of the <rect> by assessing the y and height properties.
        @param {Object} *d*
        @param {Number} *i*
        @private
    */
    Bar.prototype._getY = function _getY (d, i) {
      var h = this._x1 !== null ? this._y(d, i) : this._y1(d, i) - this._y(d, i);
      if (h < 0) { return h; }
      else { return 0; }
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.height;
  }
    */
    Bar.prototype.height = function height (_) {
      return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.width;
  }
    */
    Bar.prototype.width = function width (_) {
      return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
    */
    Bar.prototype.x0 = function x0 (_) {
      if (!arguments.length) { return this._x0; }
      this._x0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._x = this._x0;
      return this;
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance.
        @param {Function|Number|null} [*value*]
        @chainable
    */
    Bar.prototype.x1 = function x1 (_) {
      return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._x1;
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
    */
    Bar.prototype.y0 = function y0 (_) {
      if (!arguments.length) { return this._y0; }
      this._y0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
      this._y = this._y0;
      return this;
    };

    /**
        @memberof Bar
        @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance.
        @param {Function|Number|null} [*value*]
        @chainable
    */
    Bar.prototype.y1 = function y1 (_) {
      return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._y1;
    };

    return Bar;
  }(Shape));

  /**
      @class Circle
      @extends Shape
      @desc Creates SVG circles based on an array of data.
  */
  var Circle = (function (Shape$$1) {
    function Circle() {
      Shape$$1.call(this, "circle");
      this._labelBounds = function (d, i, s) { return ({width: s.r * 1.5, height: s.r * 1.5, x: -s.r * 0.75, y: -s.r * 0.75}); };
      this._labelConfig = d3plusCommon.assign(this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      this._name = "Circle";
      this._r = d3plusCommon.accessor("r");
    }

    if ( Shape$$1 ) Circle.__proto__ = Shape$$1;
    Circle.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Circle.prototype.constructor = Circle;

    /**
        @memberof Circle
        @desc Provides the default positioning to the <rect> elements.
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
        @memberof Circle
        @desc Draws the circles.
        @param {Function} [*callback*]
        @chainable
    */
    Circle.prototype.render = function render (callback) {

      Shape$$1.prototype.render.call(this, callback);

      this._enter
        .attr("r", 0).attr("x", 0).attr("y", 0)
        .call(this._applyStyle.bind(this))
        .transition(this._transition)
        .call(this._applyPosition.bind(this));

      this._update.transition(this._transition)
        .call(this._applyStyle.bind(this))
        .call(this._applyPosition.bind(this));

      this._exit.transition(this._transition)
        .attr("r", 0).attr("x", 0).attr("y", 0);

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
        @desc If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.r;
  }
    */
    Circle.prototype.r = function r (_) {
      return arguments.length ? (this._r = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._r;
    };

    return Circle;
  }(Shape));

  /**
      @class Line
      @extends Shape
      @desc Creates SVG lines based on an array of data.
  */
  var Line = (function (Shape$$1) {
    function Line() {
      var this$1 = this;


      Shape$$1.call(this);

      this._curve = "linear";
      this._defined = function (d) { return d; };
      this._fill = d3plusCommon.constant("none");
      this._hitArea = d3plusCommon.constant({
        "d": function (d) { return this$1._path(d.values); },
        "fill": "none",
        "stroke-width": 10,
        "transform": null
      });
      this._name = "Line";
      this._path = paths.line();
      this._stroke = d3plusCommon.constant("black");
      this._strokeWidth = d3plusCommon.constant(1);

    }

    if ( Shape$$1 ) Line.__proto__ = Shape$$1;
    Line.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Line.prototype.constructor = Line;

    /**
        @memberof Line
        @desc Filters/manipulates the data array before binding each point to an SVG group.
        @param {Array} [*data* = the data array to be filtered]
        @private
    */
    Line.prototype._dataFilter = function _dataFilter (data) {
      var this$1 = this;


      var lines = d3Collection.nest().key(this._id).entries(data).map(function (d) {

        d.data = d3plusCommon.merge(d.values);
        d.i = data.indexOf(d.values[0]);

        var x = d3Array.extent(d.values, this$1._x);
        d.xR = x;
        d.width = x[1] - x[0];
        d.x = x[0] + d.width / 2;

        var y = d3Array.extent(d.values, this$1._y);
        d.yR = y;
        d.height = y[1] - y[0];
        d.y = y[0] + d.height / 2;

        d.nested = true;
        d.translate = [d.x, d.y];
        d.__d3plusShape__ = true;

        return d;
      });

      lines.key = function (d) { return d.key; };
      return lines;

    };

    /**
        @memberof Line
        @desc Draws the lines.
        @param {Function} [*callback*]
        @chainable
    */
    Line.prototype.render = function render (callback) {
      var this$1 = this;


      Shape$$1.prototype.render.call(this, callback);

      var that = this;

      this._path
        .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
        .defined(this._defined)
        .x(this._x)
        .y(this._y);

      this._enter.append("path")
        .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
        .attr("d", function (d) { return this$1._path(d.values); })
        .call(this._applyStyle.bind(this));

      this._update.select("path").transition(this._transition)
        .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
        .attrTween("d", function(d) {
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), that._path(d.values));
        })
        .call(this._applyStyle.bind(this));

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
        @desc If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.
        @param {String} [*value* = "linear"]
        @chainable
    */
    Line.prototype.curve = function curve (_) {
      return arguments.length ? (this._curve = _, this) : this._curve;
    };

    /**
        @memberof Line
        @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
        @param {Function} [*value*]
        @chainable
    */
    Line.prototype.defined = function defined (_) {
      return arguments.length ? (this._defined = _, this) : this._defined;
    };

    return Line;
  }(Shape));

  var pi = Math.PI;

  /**
      @function shapeEdgePoint
      @desc Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
      @param {Number} angle The angle, in radians, of the offset point.
      @param {Number} distance The pixel distance away from the origin.
      @returns {String} [shape = "circle"] The type of shape, which can be either "circle" or "square".
  */
  function shapeEdgePoint (angle, distance, shape) {
    if ( shape === void 0 ) shape = "circle";


    if (angle < 0) { angle = pi * 2 + angle; }

    if (shape === "square") {

      var diagonal = 45 * (pi / 180);
      var x = 0, y = 0;

      if (angle < pi / 2) {
        var tan = Math.tan(angle);
        x += angle < diagonal ? distance : distance / tan;
        y += angle < diagonal ? tan * distance : distance;
      }
      else if (angle <= pi) {
        var tan$1 = Math.tan(pi - angle);
        x -= angle < pi - diagonal ? distance / tan$1 : distance;
        y += angle < pi - diagonal ? distance : tan$1 * distance;
      }
      else if (angle < diagonal + pi) {
        x -= distance;
        y -= Math.tan(angle - pi) * distance;
      }
      else if (angle < 3 * pi / 2) {
        x -= distance / Math.tan(angle - pi);
        y -= distance;
      }
      else if (angle < 2 * pi - diagonal) {
        x += distance / Math.tan(2 * pi - angle);
        y -= distance;
      }
      else {
        x += distance;
        y -= Math.tan(2 * pi - angle) * distance;
      }

      return [x, y];

    }
    else if (shape === "circle") {
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    }
    else { return null; }

  }

  var pi$1 = Math.PI;

  /**
      @function path2polygon
      @desc Transforms a path string into an Array of points.
      @param {String} path An SVG string path, commonly the "d" property of a <path> element.
      @param {Number} [segmentLength = 20] The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid.
      @returns {Array}
  */
  function path2polygon (path, segmentLength) {
    if ( segmentLength === void 0 ) segmentLength = 20;


    var poly = [],
          regex = /([MLA])([^MLAZ]+)/ig;

    var match = regex.exec(path);
    while (match !== null) {

      if (["M", "L"].includes(match[1])) { poly.push(match[2].split(",").map(Number)); }
      else if (match[1] === "A") {

        var points = match[2].split(",").map(Number);

        var last = points.slice(points.length - 2, points.length),
              prev = poly[poly.length - 1],
              radius = points[0],
              width = pointDistance(prev, last);

        var angle = Math.acos((radius * radius + radius * radius - width * width) / (2 * radius * radius));
        if (points[2]) { angle = pi$1 * 2 - angle; }

        var step = angle / (angle / (pi$1 * 2) * (radius * pi$1 * 2) / segmentLength);
        var start = Math.atan2(-prev[1], -prev[0]) - pi$1;
        var i = step;
        while (i < angle) {
          poly.push(shapeEdgePoint(points[4] ? start + i : start - i, radius));
          i += step;
        }
        poly.push(last);

      }
      match = regex.exec(path);

    }

    return poly;

  }

  /**
      @class Path
      @extends Shape
      @desc Creates SVG Paths based on an array of data.
  */
  var Path = (function (Shape$$1) {
    function Path() {
      var this$1 = this;

      Shape$$1.call(this, "path");
      this._d = d3plusCommon.accessor("path");
      this._labelBounds = function (d, i, aes) {
        var r = largestRect(aes.points, {angle: this$1._labelConfig.rotate ? this$1._labelConfig.rotate(d, i) : 0});
        return {angle: r.angle, width: r.width, height: r.height, x: r.cx - r.width / 2, y: r.cy - r.height / 2};
      };
      this._name = "Path";
      this._labelConfig = Object.assign(this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
    }

    if ( Shape$$1 ) Path.__proto__ = Shape$$1;
    Path.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Path.prototype.constructor = Path;

    /**
        @memberof Path
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */
    Path.prototype._aes = function _aes (d, i) {
      return {points: path2polygon(this._d(d, i))};
    };

    /**
        @memberof Path
        @desc Draws the paths.
        @param {Function} [*callback*]
        @chainable
    */
    Path.prototype.render = function render (callback) {

      Shape$$1.prototype.render.call(this, callback);

      this._enter
        .attr("opacity", 0)
        .attr("d", this._d)
        .call(this._applyStyle.bind(this))
        .transition(this._transition)
        .attr("opacity", 1);

      this._update.transition(this._transition)
        .call(this._applyStyle.bind(this))
        .attr("opacity", 1)
        .attr("d", this._d);

      this._exit.transition(this._transition)
        .attr("opacity", 0);

      return this;

    };

    /**
        @memberof Path
        @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance.
        @param {Function|String} [*value*]
        @chainable
        @example
  function(d) {
    return d.path;
  }
    */
    Path.prototype.d = function d (_) {
      return arguments.length ? (this._d = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._d;
    };

    return Path;
  }(Shape));

  /**
      @class Rect
      @extends Shape
      @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
  */
  var Rect = (function (Shape$$1) {
    function Rect() {
      Shape$$1.call(this, "rect");
      this._height = d3plusCommon.accessor("height");
      this._labelBounds = function (d, i, s) { return ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2}); };
      this._name = "Rect";
      this._width = d3plusCommon.accessor("width");
    }

    if ( Shape$$1 ) Rect.__proto__ = Shape$$1;
    Rect.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
    Rect.prototype.constructor = Rect;

    /**
        @memberof Rect
        @desc Draws the rectangles.
        @param {Function} [*callback*]
        @chainable
    */
    Rect.prototype.render = function render (callback) {

      Shape$$1.prototype.render.call(this, callback);

      this._enter
        .attr("width", 0).attr("height", 0)
        .attr("x", 0).attr("y", 0)
        .call(this._applyStyle.bind(this))
        .transition(this._transition)
        .call(this._applyPosition.bind(this));

      this._update.transition(this._transition)
        .call(this._applyStyle.bind(this))
        .call(this._applyPosition.bind(this));

      this._exit.transition(this._transition)
        .attr("width", 0).attr("height", 0)
        .attr("x", 0).attr("y", 0);

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
        @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
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
        @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
  function(d) {
    return d.width;
  }
    */
    Rect.prototype.width = function width (_) {
      return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
    };

    return Rect;
  }(Shape));

  exports.Image = Image;
  exports.Shape = Shape;
  exports.Area = Area;
  exports.Bar = Bar;
  exports.Circle = Circle;
  exports.Line = Line;
  exports.Path = Path;
  exports.Rect = Rect;
  exports.largestRect = largestRect;
  exports.lineIntersection = lineIntersection;
  exports.path2polygon = path2polygon;
  exports.pointDistance = pointDistance;
  exports.pointDistanceSquared = pointDistanceSquared;
  exports.pointRotate = pointRotate;
  exports.polygonInside = polygonInside;
  exports.polygonRayCast = polygonRayCast;
  exports.polygonRotate = polygonRotate;
  exports.segmentBoxContains = segmentBoxContains;
  exports.segmentsIntersect = segmentsIntersect;
  exports.shapeEdgePoint = shapeEdgePoint;
  exports.simplify = simplify;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-shape.js.map
