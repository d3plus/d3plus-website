/*
  d3plus-shape v0.10.9
  Fancy SVG shapes for visualizations
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3plus-color'), require('d3plus-text'), require('d3-array'), require('d3-collection'), require('d3-interpolate-path'), require('d3-shape')) :
  typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3plus-color', 'd3plus-text', 'd3-array', 'd3-collection', 'd3-interpolate-path', 'd3-shape'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Selection,global.d3Transition,global.d3plusCommon,global.d3plusColor,global.d3plusText,global.d3Array,global.d3Collection,global.d3InterpolatePath,global.paths));
}(this, (function (exports,d3Selection,d3Transition,d3plusCommon,d3plusColor,d3plusText,d3Array,d3Collection,d3InterpolatePath,paths) { 'use strict';

/**
    @function distance
    @desc Calculates the pixel distance between two points.
    @param {Array|Object} p1 The first point, either an Array formatted like `[x, y]` or a keyed object formatted like `{x, y}`.
    @param {Array|Object} p2 The second point, either an Array formatted like `[x, y]` or a keyed object formatted like `{x, y}`
    @returns {Number}
*/
var pointDistance = function(p1, p2) {
  if (!(p1 instanceof Array)) { p1 = [p1.x, p1.y]; }
  if (!(p2 instanceof Array)) { p2 = [p2.x, p2.y]; }
  var xx = Math.abs(p1[0] - p2[0]);
  var yy = Math.abs(p1[1] - p2[1]);
  return Math.sqrt(xx * xx + yy * yy);
};

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
    @param {Function} [*callback* = undefined]
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
*/
Image.prototype.data = function data (_) {
  return arguments.length ? (this._data = _, this) : this._data;
};

/**
    @memberof Image
    @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
    @param {Number} [*ms* = 600]
*/
Image.prototype.duration = function duration (_) {
  return arguments.length ? (this._duration = _, this) : this._duration;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
    @param {Function|Number} [*value*]
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
    @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
    @param {Function} [*value*]
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
    @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current pointer-events accessor.
    @param {Function|String} [*value* = "auto"]
*/
Image.prototype.pointerEvents = function pointerEvents (_) {
  return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
};

/**
    @memberof Image
    @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
    @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
*/
Image.prototype.select = function select$1 (_) {
  return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the URL accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current URL accessor.
    @param {Function} [*value*]
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
    @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
    @param {Function|Number} [*value*]
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
    @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
    @param {Function|Number} [*value*]
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
    @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
    @param {Function|Number} [*value*]
    @example
function(d) {
return d.y || 0;
}
*/
Image.prototype.y = function y (_) {
  return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
};

/**
    @class Shape
    @desc An abstracted class for generating shapes.
*/
var Shape = (function (BaseClass$$1) {
  function Shape(tagName) {
    var this$1 = this;
    if ( tagName === void 0 ) tagName = "g";


    BaseClass$$1.call(this);

    this._backgroundImage = d3plusCommon.constant(false);
    this._data = [];
    this._duration = 600;
    this._fill = d3plusCommon.constant("black");

    this._fontColor = function (d, i) { return d3plusColor.contrast(this$1._fill(d, i)); };
    this._fontFamily = d3plusCommon.constant("Verdana");
    this._fontResize = d3plusCommon.constant(false);
    this._fontSize = d3plusCommon.constant(12);

    this._highlightDuration = 200;
    this._highlightOpacity = 0.5;
    this._id = function (d, i) { return d.id !== void 0 ? d.id : i; };
    this._label = d3plusCommon.constant(false);
    this._labelPadding = d3plusCommon.constant(5);
    this._name = "Shape";
    this._opacity = d3plusCommon.constant(1);
    this._scale = d3plusCommon.constant(1);
    this._shapeRendering = d3plusCommon.constant("geometricPrecision");
    this._stroke = d3plusCommon.constant("black");
    this._strokeWidth = d3plusCommon.constant(0);
    this._tagName = tagName;
    this._textAnchor = d3plusCommon.constant("start");
    this._vectorEffect = d3plusCommon.constant("non-scaling-stroke");
    this._verticalAlign = d3plusCommon.constant("top");

    this._x = d3plusCommon.accessor("x", 0);
    this._y = d3plusCommon.accessor("y", 0);

  }

  if ( BaseClass$$1 ) Shape.__proto__ = BaseClass$$1;
  Shape.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
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

    var that = this;

    var events = Object.keys(this._on);
    var loop = function ( e ) {
      handler.on(events[e], function(d, i) {
        if (!that._on[events[e]]) { return; }
        that._on[events[e]].bind(this)(d, i);
      });
    };

    for (var e = 0; e < events.length; e++) loop( e );

  };

  /**
      @memberof Shape
      @desc Provides the default styling to the shape elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyStyle = function _applyStyle (elem$$1) {

    var that = this;

    /**
        @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
        @param {Object} *d* data point
        @param {Number} *i* index
        @private
    */
    function styleLogic(d, i) {
      return d.nested && d.key && d.values
           ? this(d.values[0], that._data.indexOf(d.values[0]))
           : this(d, i);
    }

    elem$$1
      .attr("fill", styleLogic.bind(this._fill))
      .attr("stroke", styleLogic.bind(this._stroke))
      .attr("stroke-width", styleLogic.bind(this._strokeWidth))
      .attr("vector-effect", styleLogic.bind(this._vectorEffect));
  };

  /**
      @memberof Shape
      @desc Calculates the transform for the group elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyTransform = function _applyTransform (elem$$1) {
    var this$1 = this;


    elem$$1
      .attr("transform", function (d, i) { return ("\n        translate(" + (d.__d3plusShape__
                  ? d.translate ? d.translate
                  : ((this$1._x(d.data, d.i)) + "," + (this$1._y(d.data, d.i)))
                  : ((this$1._x(d, i)) + "," + (this$1._y(d, i)))) + ")\n        scale(" + (d.__d3plusShape__ ? d.scale || this$1._scale(d.data, d.i)
              : this$1._scale(d, i)) + ")"); });
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

    new Image()
      .data(imageData)
      .duration(this._duration)
      .pointerEvents("none")
      .select(d3plusCommon.elem(("g.d3plus-" + (this._name) + "-images"), {parent: this._group}).node())
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

        if (this$1._labelBounds && labels !== false && labels !== void 0) {

          var aes = this$1._aes(datum, i),
                bounds = this$1._labelBounds(d, i, aes);

          if (bounds) {

            if (labels.constructor !== Array) { labels = [labels]; }

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

            var fC = this$1._fontColor(d, i),
                  fF = this$1._fontFamily(d, i),
                  fR = this$1._fontResize(d, i),
                  fS = this$1._fontSize(d, i),
                  lH = this$1._lineHeight(d, i),
                  padding = this$1._labelPadding(d, i),
                  tA = this$1._textAnchor(d, i),
                  vA = this$1._verticalAlign(d, i);

            for (var l = 0; l < labels.length; l++) {

              var b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds),
                    p = padding.constructor === Array ? padding[l] : padding;

              labelData.push(Object.assign(b, {
                __d3plusShape__: true,
                data: d,
                fC: fC.constructor === Array ? fC[l] : fC,
                fF: fF.constructor === Array ? fF[l] : fF,
                fR: fR.constructor === Array ? fR[l] : fR,
                fS: fS.constructor === Array ? fS[l] : fS,
                height: b.height - p * 2,
                i: i,
                id: ((this$1._id(d, i)) + "_" + l),
                lH: lH.constructor === Array ? lH[l] : lH,
                tA: tA.constructor === Array ? tA[l] : tA,
                text: labels[l],
                vA: vA.constructor === Array ? vA[l] : vA,
                width: b.width - p * 2,
                x: x + b.x + p,
                y: y + b.y + p
              }));

            }

          }

        }

      });

    new d3plusText.TextBox()
      .data(labelData)
      .delay(this._duration / 2)
      .duration(this._duration)
      .fontColor(function (d) { return d.fC; })
      .fontFamily(function (d) { return d.fF; })
      .fontResize(function (d) { return d.fR; })
      .fontSize(function (d) { return d.fS; })
      .lineHeight(function (d) { return d.lH; })
      .pointerEvents("none")
      .textAnchor(function (d) { return d.tA; })
      .verticalAlign(function (d) { return d.vA; })
      .select(d3plusCommon.elem(("g.d3plus-" + (this._name) + "-labels"), {parent: this._group}).node())
      .render();

  };

  /**
      @memberof Shape
      @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
      @param {Function} [*callback* = undefined]
  */
  Shape.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) {
      this.select(d3Selection.select("body").append("svg")
        .style("width", ((window.innerWidth) + "px"))
        .style("height", ((window.innerHeight) + "px"))
        .style("display", "block").node());
    }

    if (this._lineHeight === void 0) {
      this.lineHeight(function (d, i) { return this$1._fontSize(d, i) * 1.1; });
    }

    this._transition = d3Transition.transition().duration(this._duration);

    var data = this._data, key = this._id;
    if (this._dataFilter) {
      data = this._dataFilter(data);
      if (data.key) { key = data.key; }
    }

    if (this._sort) { data = data.sort(function (a, b) { return this$1._sort(a.__d3plusShape__ ? a.data : a, b.__d3plusShape__ ? b.data : b); }); }

    // Makes the update state of the group selection accessible.
    this._group = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-group"), {parent: this._select});
    var update = this._update = d3plusCommon.elem(("g.d3plus-" + (this._name) + "-shapes"), {parent: this._group})
      .selectAll((".d3plus-" + (this._name)))
        .data(data, key);

    // Orders and transforms the updating Shapes.
    update.order().transition(this._transition)
      .call(this._applyTransform.bind(this));

    // Makes the enter state of the group selection accessible.
    var enter = this._enter = update.enter().append(this._tagName)
        .attr("class", function (d, i) { return ("d3plus-Shape d3plus-" + (this$1._name) + " d3plus-id-" + (d3plusText.strip(this$1._nestWrapper(this$1._id)(d, i)))); })
      .call(this._applyTransform.bind(this))
        .attr("opacity", this._nestWrapper(this._opacity));

    var enterUpdate = enter.merge(update);

    enterUpdate
        .attr("shape-rendering", this._nestWrapper(this._shapeRendering))
        .attr("pointer-events", "none")
      .transition(this._transition)
        .attr("opacity", this._nestWrapper(this._opacity))
      .transition()
        .attr("pointer-events", "all");

    // Makes the exit state of the group selection accessible.
    var exit = this._exit = update.exit();
    exit.transition().delay(this._duration).remove();

    this._renderImage();
    this._renderLabels();

    var that = this;

    var hitAreas = this._group.selectAll((".d3plus-" + (this._name) + "-HitArea"))
      .data(this._hitArea ? data : [], key);

    hitAreas.order().transition(this._transition)
      .call(this._applyTransform.bind(this));

    var hitEnter = hitAreas.enter().append("rect")
        .attr("class", function (d, i) { return ("d3plus-Shape d3plus-" + (this$1._name) + "-HitArea d3plus-id-" + (d3plusText.strip(this$1._nestWrapper(this$1._id)(d, i)))); })
        .attr("fill", "transparent")
      .call(this._applyTransform.bind(this));

    var hitUpdates = hitAreas.merge(hitEnter)
      .each(function(d) {
        var h = that._hitArea(d, that._data.indexOf(d), that._aes(d, that._data.indexOf(d)));
        return h ? d3Selection.select(this).call(d3plusCommon.attrize, h) : d3Selection.select(this).remove();
      });

    hitAreas.exit().remove();

    this._applyEvents(this._hitArea ? hitUpdates : enterUpdate);

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current background-image accessor.
      @param {Function|String} [*value* = false]
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
  */
  Shape.prototype.duration = function duration (_) {
    return arguments.length
         ? (this._duration = _, this)
         : this._duration;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current fill accessor.
      @param {Function|String} [*value* = "black"]
  */
  Shape.prototype.fill = function fill (_) {
    return arguments.length
         ? (this._fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._fill;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.fontColor = function fontColor (_) {
    return arguments.length
         ? (this._fontColor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._fontColor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "Verdana"]
  */
  Shape.prototype.fontFamily = function fontFamily (_) {
    return arguments.length
         ? (this._fontFamily = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._fontFamily;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns the current class instance. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Boolean|Array} [*value*]
  */
  Shape.prototype.fontResize = function fontResize (_) {
    return arguments.length
         ? (this._fontResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._fontResize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = 12]
  */
  Shape.prototype.fontSize = function fontSize (_) {
    return arguments.length
         ? (this._fontSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._fontSize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight accessor.
      @param {Function} [*value*]
  */
  Shape.prototype.highlight = function highlight (_) {

    var that = this;

    this._group.selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox")
      .style(((d3plusCommon.prefix()) + "transition"), ("opacity " + (this._highlightDuration / 1000) + "s"))
      .style("opacity", function(d, i) {
        if (!_ || typeof _ !== "function") { return 1; }
        if (this.tagName === "text") { d = d.data; }
        if (d.__d3plusShape__ || d.__d3plus__) {
          d = d.data;
          i = d.i;
        }
        return _(d, i) ? 1 : that._highlightOpacity;
      });

    return this;
  };

  /**
      @memberof Shape
      @desc If *ms* is specified, sets the highlight duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current highlight duration.
      @param {Number} [*ms* = 200]
  */
  Shape.prototype.highlightDuration = function highlightDuration (_) {
    return arguments.length ? (this._highlightDuration = _, this) : this._highlightDuration;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the highlight opacity to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight opacity.
      @param {Number} [*value* = 0.5]
  */
  Shape.prototype.highlightOpacity = function highlightOpacity (_) {
    return arguments.length ? (this._highlightOpacity = _, this) : this._highlightOpacity;
  };

  /**
      @memberof Shape
      @desc If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.
      @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`.
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
    return arguments.length
         ? (this._hitArea = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._hitArea;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
  */
  Shape.prototype.id = function id (_) {
    return arguments.length
         ? (this._id = _, this)
         : this._id;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.label = function label (_) {
    return arguments.length
         ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._label;
  };

  /**
      @memberof Shape
      @desc If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.
      @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
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
    return arguments.length
         ? (this._labelBounds = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._labelBounds;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label padding to the specified number and returns the current class instance. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Number|Array} [*value* = 10]
  */
  Shape.prototype.labelPadding = function labelPadding (_) {
    return arguments.length
         ? (this._labelPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._labelPadding;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  Shape.prototype.lineHeight = function lineHeight (_) {
    return arguments.length
         ? (this._lineHeight = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._lineHeight;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current opacity accessor.
      @param {Number} [*value* = 1]
  */
  Shape.prototype.opacity = function opacity (_) {
    return arguments.length
         ? (this._opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._opacity;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current scale accessor.
      @param {Function|Number} [*value* = 1]
  */
  Shape.prototype.scale = function scale (_) {
    return arguments.length
         ? (this._scale = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._scale;
  };

  /**
      @memberof Shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  Shape.prototype.select = function select$1 (_) {
    return arguments.length
         ? (this._select = d3Selection.select(_), this)
         : this._select;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape-rendering accessor.
      @param {Function|String} [*value* = "geometricPrecision"]
      @example
function(d) {
  return d.x;
}
  */
  Shape.prototype.shapeRendering = function shapeRendering (_) {
    return arguments.length
         ? (this._shapeRendering = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._shapeRendering;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the sort comparator to the specified function and returns the current class instance. If *value* is not specified, returns the current sort comparator.
      @param {false|Function} [*value* = []]
  */
  Shape.prototype.sort = function sort (_) {
    return arguments.length
         ? (this._sort = _, this)
         : this._sort;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke accessor.
      @param {Function|String} [*value* = "black"]
  */
  Shape.prototype.stroke = function stroke (_) {
    return arguments.length
         ? (this._stroke = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._stroke;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke-width accessor.
      @param {Function|Number} [*value* = 0]
  */
  Shape.prototype.strokeWidth = function strokeWidth (_) {
    return arguments.length
         ? (this._strokeWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._strokeWidth;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  Shape.prototype.textAnchor = function textAnchor (_) {
    return arguments.length
         ? (this._textAnchor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._textAnchor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vector-effect accessor.
      @param {Function|String} [*value* = "non-scaling-stroke"]
  */
  Shape.prototype.vectorEffect = function vectorEffect (_) {
    return arguments.length
         ? (this._vectorEffect = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._vectorEffect;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  Shape.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length
         ? (this._verticalAlign = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._verticalAlign;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.x;
}
  */
  Shape.prototype.x = function x (_) {
    return arguments.length
         ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._x;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.y;
}
  */
  Shape.prototype.y = function y (_) {
    return arguments.length
         ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._y;
  };

  return Shape;
}(d3plusCommon.BaseClass));

/**
    @class Area
    @extends Shape
    @desc Creates SVG areas based on an array of data.
*/
var Area = (function (Shape$$1) {
  function Area() {

    Shape$$1.call(this);

    this._curve = "linear";
    this._defined = function () { return true; };
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
      Filters/manipulates the data array before binding each point to an SVG group.
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
      Draws the area polygons.
      @param {Function} [*callback* = undefined]
      @private
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
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Area.prototype._aes = function _aes (d, i) {
    var this$1 = this;

    return {points: d.values.map(function (p) { return [this$1._x(p, i), this$1._y(p, i)]; })};
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.
      @param {String} [*value* = "linear"]
  */
  Area.prototype.curve = function curve (_) {
    return arguments.length
         ? (this._curve = _, this)
         : this._curve;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
      @param {Function} [*value*]
  */
  Area.prototype.defined = function defined (_) {
    return arguments.length
         ? (this._defined = _, this)
         : this._defined;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
      @param {Function|Number} [*value*]
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
  */
  Area.prototype.x1 = function x1 (_) {
    return arguments.length
         ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this)
         : this._x1;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
      @param {Function|Number} [*value*]
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
  */
  Area.prototype.y1 = function y1 (_) {
    return arguments.length
         ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this)
         : this._y1;
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

    Shape$$1.call(this, "rect");

    this._name = "Bar";
    this._height = d3plusCommon.constant(10);
    this._labelBounds = function (d, i, s) { return ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2}); };
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
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
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
    return {
      height: this._getHeight(d, i),
      width: this._getWidth(d, i),
      x: this._x1 !== null ? this._getX(d, i) + this._getWidth(d, i) / 2 : this._getX(d, i),
      y: this._x1 === null ? this._getY(d, i) + this._getHeight(d, i) / 2 : this._getY(d, i)
    };
  };

  /**
      @memberof Bar
      @desc Provides the default positioning to the <rect> elements.
      @param {D3Selection} *elem*
      @private
  */
  Bar.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
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
    var w = this._x1 === null ? this._width(d, i) : this._x1(d, i) - this._x(d, i);
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
    var h = this._x1 !== null ? this._height(d, i) : this._y1(d, i) - this._y(d, i);
    if (h < 0) { return h; }
    else { return 0; }
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.height;
}
  */
  Bar.prototype.height = function height (_) {
    return arguments.length
         ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._height;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  Bar.prototype.width = function width (_) {
    return arguments.length
         ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._width;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
      @param {Function|Number} [*value*]
  */
  Bar.prototype.x0 = function x0 (_) {
    if (!arguments.length) { return this._x0; }
    this._x0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
    this._x = this._x0;
    return this;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.
      @param {Function|Number|null} [*value*]
  */
  Bar.prototype.x1 = function x1 (_) {
    return arguments.length
         ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this)
         : this._x1;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
      @param {Function|Number} [*value*]
  */
  Bar.prototype.y0 = function y0 (_) {
    if (!arguments.length) { return this._y0; }
    this._y0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
    this._y = this._y0;
    return this;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.
      @param {Function|Number|null} [*value*]
  */
  Bar.prototype.y1 = function y1 (_) {
    return arguments.length
         ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this)
         : this._y1;
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
    this._name = "Circle";
    this._r = d3plusCommon.accessor("r");
  }

  if ( Shape$$1 ) Circle.__proto__ = Shape$$1;
  Circle.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Circle.prototype.constructor = Circle;

  /**
      Provides the default positioning to the <rect> elements.
      @private
  */
  Circle.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
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
      @desc If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current radius accessor.
      @param {Function|Number} [*value*]
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

    Shape$$1.call(this);

    this._curve = "linear";
    this._defined = function (d) { return d; };
    this._fill = d3plusCommon.constant("none");
    this._name = "Line";
    this._path = paths.line();
    this._strokeWidth = d3plusCommon.constant(1);

  }

  if ( Shape$$1 ) Line.__proto__ = Shape$$1;
  Line.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Line.prototype.constructor = Line;

  /**
      Filters/manipulates the data array before binding each point to an SVG group.
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
      Draws the lines.
      @param {Function} [*callback* = undefined]
      @private
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
  */
  Line.prototype.curve = function curve (_) {
    return arguments.length ? (this._curve = _, this) : this._curve;
  };

  /**
      @memberof Line
      @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
      @param {Function} [*value*]
  */
  Line.prototype.defined = function defined (_) {
    return arguments.length ? (this._defined = _, this) : this._defined;
  };

  return Line;
}(Shape));

/**
    @class Path
    @extends Shape
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
var Path = (function (Shape$$1) {
  function Path() {
    Shape$$1.call(this, "path");
    this._d = d3plusCommon.accessor("path");
    this._name = "Path";
  }

  if ( Shape$$1 ) Path.__proto__ = Shape$$1;
  Path.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Path.prototype.constructor = Path;

  /**
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
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
      @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current "d" attribute accessor.
      @param {Function|String} [*value*]
      @example
function(d) {
  return d.path;
}
  */
  Path.prototype.d = function d (_) {
    return arguments.length
         ? (this._d = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._d;
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
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
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
  Rect.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
      .attr("width", function (d, i) { return this$1._width(d, i); })
      .attr("height", function (d, i) { return this$1._height(d, i); })
      .attr("x", function (d, i) { return -this$1._width(d, i) / 2; })
      .attr("y", function (d, i) { return -this$1._height(d, i) / 2; });
  };

  /**
      @memberof Rect
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.height;
}
  */
  Rect.prototype.height = function height (_) {
    return arguments.length
         ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._height;
  };

  /**
      @memberof Rect
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  Rect.prototype.width = function width (_) {
    return arguments.length
         ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
         : this._width;
  };

  return Rect;
}(Shape));

exports.pointDistance = pointDistance;
exports.Image = Image;
exports.Shape = Shape;
exports.Area = Area;
exports.Bar = Bar;
exports.Circle = Circle;
exports.Line = Line;
exports.Path = Path;
exports.Rect = Rect;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-shape.js.map
