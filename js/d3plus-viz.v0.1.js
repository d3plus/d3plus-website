/*
  d3plus-viz v0.1.0
  Abstract ES6 class that drives d3plus visualizations.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color'), require('d3-collection'), require('d3-selection'), require('d3-transition'), require('d3plus-color'), require('d3plus-common'), require('d3plus-legend'), require('d3plus-tooltip'), require('d3plus-text'), require('d3-array')) :
  typeof define === 'function' && define.amd ? define('d3plus-viz', ['exports', 'd3-color', 'd3-collection', 'd3-selection', 'd3-transition', 'd3plus-color', 'd3plus-common', 'd3plus-legend', 'd3plus-tooltip', 'd3plus-text', 'd3-array'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Color,global.d3Collection,global.d3Selection,global.d3Transition,global.d3plusColor,global.d3plusCommon,global.d3plusLegend,global.d3plusTooltip,global.d3plusText,global.d3Array));
}(this, (function (exports,d3Color,d3Collection,d3Selection,d3Transition,d3plusColor,d3plusCommon,d3plusLegend,d3plusTooltip,d3plusText,d3Array) { 'use strict';

/**
    @function colorNest
    @desc Returns an Array of data objects based on a given color accessor and groupBy levels.
    @param {Array} raw The raw data Array to be grouped by color.
    @param {Function} fill The color accessor for each data object.
    @param {Array} [groupBy = []] An optional array of grouping accessors. Will autodetect if a certain group by level is assigning the colors, and will return the appropriate accessor.
    @private
*/
function colorNest(raw, fill, groupBy) {
  if ( groupBy === void 0 ) groupBy = [];


  if (groupBy && !(groupBy instanceof Array)) groupBy = [groupBy];

  var colors = d3Collection.nest().key(fill).entries(raw);
  var data, id;

  if (groupBy.length) {
    var numColors = colors.length;
    var loop = function ( i ) {
      var ids = colors.map(function (c) { return Array.from(new Set(c.values.map(function (d) { return groupBy[i](d); }))); }),
            total = d3Array.sum(ids, function (d) { return d.length; }),
            uniques = new Set(d3Array.merge(ids)).size;
      if (total === numColors && uniques === numColors || i === groupBy.length - 1) {
        id = groupBy[i];
        data = d3Collection.nest().key(id).entries(raw).map(function (d) { return d3plusCommon.merge(d.values); });
        return 'break';
      }
    };

    for (var i = 0; i < groupBy.length; i++) {
      var returned = loop( i );

      if ( returned === 'break' ) break;
    }
  }
  else {
    id = fill;
    data = colors.map(function (d) { return d3plusCommon.merge(d.values); });
  }

  return {data: data, id: id};

}

/**
  Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
  @private
*/
function elementSize(element, s) {

  if (element.tagName === undefined || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {

    var val  = window[("inner" + (s.charAt(0).toUpperCase() + s.slice(1)))];
    var elem = d3Selection.select(element);

    if (s === "width") {
      val -= parseFloat(elem.style("margin-left"), 10);
      val -= parseFloat(elem.style("margin-right"), 10);
      val -= parseFloat(elem.style("padding-left"), 10);
      val -= parseFloat(elem.style("padding-right"), 10);
    }
    else {
      val -= parseFloat(elem.style("margin-top"), 10);
      val -= parseFloat(elem.style("margin-bottom"), 10);
      val -= parseFloat(elem.style("padding-top"), 10);
      val -= parseFloat(elem.style("padding-bottom"), 10);
    }

    return val;

  }
  else {

    var val$1 = parseFloat(d3Selection.select(element).style(s), 10);
    if (typeof val$1 === "number" && val$1 > 0) return val$1;
    else return elementSize(element.parentNode, s);

  }
}

/**
    @function getSize
    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
    @param {HTMLElement} elem The HTMLElement to find dimensions for.
*/
function getSize(elem) {
  return [elementSize(elem, "width"), elementSize(elem, "height")];
}

var d3 = {
  color: d3Color.color,
  mouse: d3Selection.mouse,
  nest: d3Collection.nest,
  select: d3Selection.select
};

/**
    @class Viz
    @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
var Viz = (function (BaseClass) {
  function Viz() {
    var this$1 = this;


    BaseClass.call(this);

    this._backClass = new d3plusText.TextBox()
      .on("click", function () {
        if (this$1._history.length) this$1.config(this$1._history.pop()).render();
        else this$1.depth(this$1._drawDepth - 1).filter(false).render();
      });
    this._duration = 600;
    this._history = [];
    this._groupBy = [d3plusCommon.accessor("id")];
    this._highlight = false;
    this._legend = {};
    this._legendClass = new d3plusLegend.Legend();
    this._on = {
      click: function (d, i) {

        if (this$1._drawDepth < this$1._groupBy.length - 1) {

          var filterGroup = this$1._groupBy[this$1._drawDepth],
                filterId = this$1._id(d, i);

          this$1._highlight = false;
          if (this$1._tooltip) this$1._tooltipClass.data([])();

          this$1._history.push({
            depth: this$1._depth,
            filter: this$1._filter
          });

          this$1.config({
            depth: this$1._drawDepth + 1,
            filter: function (f, x) { return filterGroup(f, x) === filterId; }
          }).render();

        }

      },
      mouseenter: function (d, i) {

        var filterId = this$1._id(d, i);

        this$1._highlight = function (h, x) {
          var myId = this$1._id(h, x);
          if (myId.constructor === Array && filterId.constructor !== Array) return myId.includes(filterId);
          if (myId.constructor !== Array && filterId.constructor === Array) return filterId.includes(myId);
          return myId === filterId;
        };

        if (this$1._tooltip) {
          this$1._tooltipClass.data([d])
            .footer(this$1._drawDepth < this$1._groupBy.length - 1 ? "Click to Expand" : "")
            .translate(d3.mouse(d3.select("html").node()))
            ();
        }

        this$1.update(100);

      },
      mousemove: function () {

        var dd = this$1._tooltipClass.duration();

        if (this$1._tooltip) {
          this$1._tooltipClass
            .duration(0)
            .translate(d3.mouse(d3.select("html").node()))
            ().duration(dd);
        }

      },
      mouseleave: function () {

        this$1._highlight = false;
        if (this$1._tooltip) this$1._tooltipClass.data([])();
        this$1.update(100);

      }
    };
    this._padding = 5;
    this._shapes = [];
    this._shapeConfig = {
      fill: function (d, i) { return d3plusColor.assign(this$1._id(d, i)); },
      opacity: function (d, i) { return this$1._highlight ? this$1._highlight(d, i) ? 1 : 0.25 : 1; },
      stroke: function (d, i) { return d3.color(d3plusColor.assign(this$1._id(d, i))).darker(); },
      strokeWidth: function (d, i) { return this$1._highlight ? this$1._highlight(d, i) ? 1 : 0 : 0; }
    };
    this._tooltip = {};
    this._tooltipClass = d3plusTooltip.tooltip().pointerEvents("none");

  }

  if ( BaseClass ) Viz.__proto__ = BaseClass;
  Viz.prototype = Object.create( BaseClass && BaseClass.prototype );
  Viz.prototype.constructor = Viz;

  /**
      The inner return object and draw function that gets assigned the public methods.
      @private
  */
  Viz.prototype.render = function render (callback) {
    var this$1 = this;


    // Resets margins
    this._margin = {bottom: 0, left: 0, right: 0, top: 0};
    this._transition = d3Transition.transition().duration(this._duration);

    // Appends a fullscreen SVG to the BODY if a container has not been provided through .select().
    if (this._select === void 0) {
      var ref = getSize(d3.select("body").node());
      var w = ref[0];
      var h = ref[1];
      this.width(w).height(h);
      this.select(d3.select("body").append("svg").style("width", (w + "px")).style("height", (h + "px")).style("display", "block").node());
    }

    // Calculates the width and/or height of the Viz based on the this._select, if either has not been defined.
    if (!this._width || !this._height) {
      var ref$1 = getSize(this._select.node());
      var w$1 = ref$1[0];
      var h$1 = ref$1[1];
      if (!this._width) this.width(w$1);
      if (!this._height) this.height(h$1);
    }

    var that = this;

    // based on the groupBy, determine the draw depth and current depth id
    this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
    this._id = this._groupBy[this._drawDepth];
    this._drawLabel = this._label || function(d, i) {
      var l = that._id(d, i);
      if (l.constructor !== Array) return l;
      for (var x = that._drawDepth; x >= 0; x--) {
        l = that._groupBy[x](d, i);
        if (l.constructor !== Array) break;
      }
      return l;
    };

    this._filteredData = [];
    var nest = d3.nest().rollup(function (leaves) { return this$1._filteredData.push(d3plusCommon.merge(leaves)); });
    for (var i = 0; i <= this._drawDepth; i++) nest.key(this$1._groupBy[i]);
    nest.entries(this._filter ? this._data.filter(this._filter) : this._data);

    // Manages visualization legend group
    var legendGroup = d3plusCommon.elem("g.d3plus-plot-legend", {
      condition: this._legend,
      enter: {transform: ("translate(0," + (this._height / 2) + ")")},
      exit: {opacity: 0},
      parent: this._select,
      transition: this._transition,
      update: {opacity: 1, transform: ("translate(0," + (this._height / 2) + ")")}
    });

    // Renders the legend if this._legend is not falsy.
    if (this._legend) {

      var legend = colorNest(this._filteredData, this._shapeConfig.fill, this._groupBy);

      this._legendClass
        .id(function (d, i) { return legend.id(d, i); })
        .duration(this._duration)
        .data(legend.data)
        .height(this._height / 2)
        .label(this._drawLabel)
        .select(legendGroup.node())
        .verticalAlign("bottom")
        .width(this._width)
        .shapeConfig(this._shapeConfig)
        .shapeConfig({on: Object.keys(this._on)
          .filter(function (e) { return !e.includes(".") || e.includes(".legend"); })
          .reduce(function (obj, e) {
            obj[e] = this$1._on[e];
            return obj;
          }, {})})
        .config(this._legend.constructor === Object ? this._legend : {})
        .render();

      this._margin.bottom = this._legendClass.outerBounds().height + this._legendClass.padding() * 4;

    }

    var titleGroup = d3plusCommon.elem("g.d3plus-plot-titles", {parent: this._select});

    this._backClass
      .data(this._history.length ? [{text: "Back", x: this._padding * 2, y: 0}] : [])
      .select(titleGroup.node())
      .render();

    this._margin.top += this._history.length ? this._backClass.fontSize()() + this._padding : 0;

    this._tooltipClass.title(this._drawLabel);
    if (this._tooltip.constructor === Object) this._tooltipClass.config(this._tooltip);

    if (callback) setTimeout(callback, this._duration + 100);

    return this;

  };

  /**
      @memberof Viz
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
  */
  Viz.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the depth to the specified number and returns the current class instance. The *value* should correspond with an index in the [groupBy](#groupBy) array. If *value* is not specified, returns the current depth.
      @param {Number} [*value*]
  */
  Viz.prototype.depth = function depth (_) {
    return arguments.length ? (this._depth = _, this) : this._depth;
  };

  /**
      @memberof Viz
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  Viz.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the filter to the specified function and returns the current class instance. If *value* is not specified, returns the current filter.
      @param {Function} [*value*]
  */
  Viz.prototype.filter = function filter (_) {
    return arguments.length ? (this._filter = _, this) : this._filter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns the current class instance. If *value* is not specified, returns the current group accessor.
      @param {String|Function|Array} [*value*]
      @example
function value(d) {
  return d.id;
}
  */
  Viz.prototype.groupBy = function groupBy (_) {
    if (!arguments.length) return this._groupBy;
    if (!(_ instanceof Array)) _ = [_];
    return this._groupBy = _.map(function (k) { return typeof k === "function" ? k : d3plusCommon.accessor(k); }), this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overallheight to the specified number and returns the current class instance. If *value* is not specified, returns the current overall height.
      @param {Number} [*value* = window.innerHeight]
  */
  Viz.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the highlight filter to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight filter. When the highlight function returns true given a data point, the highlight styles will be used.
      @param {Function} [*value* = false]
  */
  Viz.prototype.highlight = function highlight (_) {
    return arguments.length ? (this._highlight = _, this) : this._highlight;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
      @param {Function|String} [*value*]
  */
  Viz.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance. If *value* is an object, then it is passed to the legend's config method. If *value* is not specified, returns the current value.
      @param {Boolean|Object} [*value* = true]
  */
  Viz.prototype.legend = function legend (_) {
    return arguments.length ? (this._legend = _, this) : this._legend;
  };

  /**
      @memberof Viz
      @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
      @param {String} [*typenames*]
      @param {Function} [*listener*]
      @example <caption>By default, listeners apply to both the shapes and the legend. Passing a namespace with the typename gives control over specific elements:</caption>
new Plot
  .on("click.shape", function(d) {
    console.log("data for shape clicked:", d);
  })
  .on("click.legend", function(d) {
    console.log("data for legend clicked:", d);
  })
  */
  Viz.prototype.on = function on (typenames, listener) {
    return arguments.length === 2 ? (this._on[typenames] = listener, this) : arguments.length ? this._on[typenames] : this._on;
  };

  /**
      @memberof Viz
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
  */
  Viz.prototype.select = function select (_) {
    return arguments.length ? (this._select = d3.select(_), this) : this._select;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the shape accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value*]
  */
  Viz.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for each shape and returns the current class instance. If *value* is not specified, returns the current shape configuration.
      @param {Object} [*value*]
  */
  Viz.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance. If *value* is an object, then it is passed to the tooltip's config method. If *value* is not specified, returns the current tooltip visibility.
      @param {Boolean|Object} [*value* = true]
  */
  Viz.prototype.tooltip = function tooltip$1 (_) {
    return arguments.length ? (this._tooltip = _, this) : this._tooltip;
  };

  /**
      @memberof Viz
      @desc If *ms* is specified, all shapes will redraw using the specified duration and return this generator. If *ms* is not specified, shapes will redraw instantly. This method is useful when only needing to change visual styles (and not data), like when setting custom [mouse events](#Plot.on).
      @param {Number} [*ms* = 0]
  */
  Viz.prototype.update = function update (_) {
    var this$1 = this;
    if ( _ === void 0 ) _ = 0;

    this._legendClass.shapeConfig({duration: _}).render().shapeConfig({duration: this._duration});
    for (var s = 0; s < this._shapes.length; s++) this$1._shapes[s].duration(_).render().duration(this$1._duration);
    return this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overallwidth to the specified number and returns the current class instance. If *value* is not specified, returns the current overall width.
      @param {Number} [*value* = window.innerWidth]
  */
  Viz.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Viz;
}(d3plusCommon.BaseClass));

exports.Viz = Viz;

Object.defineProperty(exports, '__esModule', { value: true });

})));