/*
  d3plus-viz v0.4.11
  Abstract ES6 class that drives d3plus visualizations.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-color'), require('d3-collection'), require('d3-selection'), require('d3-transition'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-legend'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip')) :
  typeof define === 'function' && define.amd ? define('d3plus-viz', ['exports', 'd3-array', 'd3-color', 'd3-collection', 'd3-selection', 'd3-transition', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-legend', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Color,global.d3Collection,global.d3Selection,global.d3Transition,global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.d3plusLegend,global.d3plusText,global.d3plusTimeline,global.d3plusTooltip));
}(this, (function (exports,d3Array,d3Color,d3Collection,d3Selection,d3Transition,d3plusAxis,d3plusColor,d3plusCommon,d3plusLegend,d3plusText,d3plusTimeline,d3plusTooltip) { 'use strict';

/**
    @function colorNest
    @desc Returns an Array of data objects based on a given color accessor and groupBy levels.
    @param {Array} raw The raw data Array to be grouped by color.
    @param {Function} fill The color accessor for each data object.
    @param {Array} [groupBy = []] An optional array of grouping accessors. Will autodetect if a certain group by level is assigning the colors, and will return the appropriate accessor.
    @private
*/
var colorNest = function(raw, fill, groupBy) {
  if ( groupBy === void 0 ) groupBy = [];


  if (groupBy && !(groupBy instanceof Array)) { groupBy = [groupBy]; }

  var colors = d3Collection.nest().key(fill).entries(raw);
  if (colors.length < 2) { return {data: [], id: fill}; }
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

};

/**
  Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
  @private
*/
function elementSize(element, s) {

  if (element.tagName === undefined || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {

    var val  = window[("inner" + (s.charAt(0).toUpperCase() + s.slice(1)))];
    var elem$$1 = d3Selection.select(element);

    if (s === "width") {
      val -= parseFloat(elem$$1.style("margin-left"), 10);
      val -= parseFloat(elem$$1.style("margin-right"), 10);
      val -= parseFloat(elem$$1.style("padding-left"), 10);
      val -= parseFloat(elem$$1.style("padding-right"), 10);
    }
    else {
      val -= parseFloat(elem$$1.style("margin-top"), 10);
      val -= parseFloat(elem$$1.style("margin-bottom"), 10);
      val -= parseFloat(elem$$1.style("padding-top"), 10);
      val -= parseFloat(elem$$1.style("padding-bottom"), 10);
    }

    return val;

  }
  else {

    var val$1 = parseFloat(d3Selection.select(element).style(s), 10);
    if (typeof val$1 === "number" && val$1 > 0) { return val$1; }
    else { return elementSize(element.parentNode, s); }

  }
}

/**
    @function getSize
    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
    @param {HTMLElement} elem The HTMLElement to find dimensions for.
    @private
*/
var getSize = function(elem$$1) {
  return [elementSize(elem$$1, "width"), elementSize(elem$$1, "height")];
};

/**
    @desc On click event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var click = function(d, i) {

  this._select.style("cursor", "auto");
  if (this._drawDepth < this._groupBy.length - 1) {

    var filterGroup = this._groupBy[this._drawDepth],
          filterId = filterGroup(d, i);

    this.highlight(false);
    if (this._tooltip) { this._tooltipClass.data([]).render(); }

    this._history.push({
      depth: this._depth,
      filter: this._filter
    });

    this.config({
      depth: this._drawDepth + 1,
      filter: function (f, x) { return filterGroup(f, x) === filterId; }
    }).render();

  }

};

/**
    @desc On mouseenter event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseenter = function(d, i) {
  var this$1 = this;


  var filterId = this._ids(d, i);

  this.highlight(function (h, x) {
    var ids = this$1._ids(h, x);
    return filterId[filterId.length - 1] === ids[filterId.length - 1];
  });

};

/**
    @desc On mouseenter event for all legend shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseenterLegend = function(d) {

  if (this._tooltip) {
    var depth = this._drawDepth < this._groupBy.length - 1;
    this._select.style("cursor", depth ? "pointer" : "auto");
    this._tooltipClass.data([d])
      .footer(depth ?  d3plusCommon.locale.t("Click to Expand", {lng: this._locale}) : "")
      .title(this._legendClass.label())
      .translate(d3Selection.mouse(d3Selection.select("html").node()))
      .config(this._tooltipConfig)
      .render();
  }

};

/**
    @desc On mouseenter event for all primary shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseenterShape = function(d) {

  if (this._tooltip) {
    var depth = this._drawDepth < this._groupBy.length - 1;
    this._select.style("cursor", depth ? "pointer" : "auto");
    this._tooltipClass.data([d])
      .footer(depth ? d3plusCommon.locale.t("Click to Expand", {lng: this._locale}) : "")
      .title(this._drawLabel)
      .translate(d3Selection.mouse(d3Selection.select("html").node()))
      .config(this._tooltipConfig)
      .render();
  }

};

/**
    @desc On mouse move event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mousemove = function() {

  if (this._tooltip) {
    this._tooltipClass.translate(d3Selection.mouse(d3Selection.select("html").node())).render();
  }

};

/**
    @desc On mouseleave event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseleave = function() {

  this.highlight(false);
  this._select.style("cursor", "auto");
  if (this._tooltip) { this._tooltipClass.data([]).render(); }

};

/**
    @class Viz
    @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
var Viz = (function (BaseClass$$1) {
  function Viz() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._aggs = {};
    this._backClass = new d3plusText.TextBox()
      .on("click", function () {
        if (this$1._history.length) { this$1.config(this$1._history.pop()).render(); }
        else { this$1.depth(this$1._drawDepth - 1).filter(false).render(); }
      })
      .on("mousemove", function () { return this$1._backClass.select().style("cursor", "pointer"); });
    this._data = [];
    this._duration = 600;
    this._highlightOpacity = 0.5;
    this._history = [];
    this._groupBy = [d3plusCommon.accessor("id")];
    this._legend = true;
    this._legendConfig = {
      shapeConfig: {
        fontResize: false
      }
    };
    this._legendClass = new d3plusLegend.Legend();
    this._locale = "en-US";
    this._on = {
      "click": click.bind(this),
      "mouseenter": mouseenter.bind(this),
      "mouseenter.legend": mouseenterLegend.bind(this),
      "mouseenter.shape": mouseenterShape.bind(this),
      "mousemove": mousemove.bind(this),
      "mouseleave": mouseleave.bind(this)
    };
    this._padding = 5;
    this._shapes = [];
    this._shapeConfig = {
      fill: function (d, i) { return d3plusColor.assign(this$1._groupBy[0](d, i)); },
      highlightDuration: 50,
      opacity: d3plusCommon.constant(1),
      stroke: function (d, i) { return d3Color.color(d3plusColor.assign(this$1._groupBy[0](d, i))).darker(); },
      strokeWidth: d3plusCommon.constant(0)
    };
    this._timeline = true;
    this._timelineClass = new d3plusTimeline.Timeline()
      .align("end")
      .on("end", function (s) {
        if (!(s instanceof Array)) { s = [s, s]; }
        s = s.map(Number);
        this$1._timelineClass.selection(s);
        this$1.timeFilter(function (d) {
          var ms = d3plusAxis.date(this$1._time(d)).getTime();
          return ms >= s[0] && ms <= s[1];
        }).render();
      });
    this._timelineConfig = {};
    this._tooltip = true;
    this._tooltipClass = new d3plusTooltip.Tooltip();
    this._tooltipConfig = {
      duration: 50,
      pointerEvents: "none"
    };

  }

  if ( BaseClass$$1 ) Viz.__proto__ = BaseClass$$1;
  Viz.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Viz.prototype.constructor = Viz;

  /**
      @memberof Viz
      @desc Preps a shapeConfig object for d3plus data, and optionally bubbles up a specific shape type.
      @param {String} *shape* The shape key to bubble up to the parent config level.
      @private
  */
  Viz.prototype._shapeConfigPrep = function _shapeConfigPrep (shape) {
    var this$1 = this;
    if ( shape === void 0 ) shape = false;


    var newConfig = {duration: this._duration};

    var loop = function ( key ) {

      if ({}.hasOwnProperty.call(this$1._shapeConfig, key)) {

        if (typeof this$1._shapeConfig[key] === "function") {
          newConfig[key] = function (d, i, s) { return this$1._shapeConfig[key](d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i, s); };
        }
        else { newConfig[key] = this$1._shapeConfig[key]; }

      }

    };

    for (var key in this._shapeConfig) loop( key );

    newConfig.on = Object.keys(this._on)
      .filter(function (e) { return !e.includes(".") || e.includes(".shape"); })
      .reduce(function (obj, e) {
        obj[e] = function (d, i) { return this$1._on[e] ? this$1._on[e](d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i) : null; };
        return obj;
      }, {});

    if (shape && this._shapeConfig[shape]) { newConfig = d3plusCommon.assign(newConfig, this._shapeConfig[shape]); }
    return newConfig;

  };

  /**
      @memberof Viz
      @desc Manages the SVG group for a UI element.
      @param {String} type
      @private
  */
  Viz.prototype._uiGroup = function _uiGroup (type, condition) {
    if ( condition === void 0 ) condition = true;

    return d3plusCommon.elem(("g.d3plus-viz-" + type), {
      condition: condition,
      enter: {transform: ("translate(0, " + (this._height / 2) + ")")},
      exit: {opacity: 0},
      parent: this._select,
      transition: this._transition,
      update: {opacity: 1, transform: ("translate(0, " + (this._height / 2) + ")")}
    });
  };

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
    if (this._select === void 0 || this._select.node().tagName.toLowerCase() !== "svg") {
      var parent = this._select === void 0 ? d3Selection.select("body") : this._select;
      var ref = getSize(parent.node());
      var w = ref[0];
      var h = ref[1];
      if (!this._width) { this.width(w); }
      if (!this._height) { this.height(h); }
      w = this._width;
      h = this._height;
      this.select(parent.append("svg").style("width", (w + "px")).style("height", (h + "px")).style("display", "block").node());
    }

    // Calculates the width and/or height of the Viz based on the this._select, if either has not been defined.
    if (!this._width || !this._height) {
      var ref$1 = getSize(this._select.node());
      var w$1 = ref$1[0];
      var h$1 = ref$1[1];
      if (!this._width) { this.width(w$1); }
      if (!this._height) { this.height(h$1); }
    }

    var that = this;

    // based on the groupBy, determine the draw depth and current depth id
    this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
    this._id = this._groupBy[this._drawDepth];
    this._ids = function (d, i) { return this$1._groupBy
      .map(function (g) { return g(d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i); })
      .filter(function (g) { return g !== void 0 && g.constructor !== Array; }); };
    this._drawLabel = this._label || function(d, i) {
      var l = that._ids(d, i).filter(function (d) { return d && d.constructor !== Array; });
      return l[l.length - 1];
    };

    this._legendData = [];
    this._filteredData = [];
    if (this._data.length) {

      var data = this._timeFilter ? this._data.filter(this._timeFilter) : this._data;
      if (this._filter) { data = data.filter(this._filter); }

      var dataNest = d3Collection.nest();
      for (var i = 0; i <= this._drawDepth; i++) { dataNest.key(this$1._groupBy[i]); }
      dataNest.rollup(function (leaves) { return this$1._legendData.push(d3plusCommon.merge(leaves, this$1._aggs)); }).entries(data);
      if (this._discrete && ("_" + (this._discrete)) in this) { dataNest.key(this[("_" + (this._discrete))]); }
      dataNest.rollup(function (leaves) { return this$1._filteredData.push(d3plusCommon.merge(leaves, this$1._aggs)); }).entries(data);

    }

    // Renders the timeline if this._time and this._timeline are not falsy and there are more than 1 tick available.
    var timelinePossible = this._time && this._timeline;
    var ticks = timelinePossible ? Array.from(new Set(this._data.map(this._time))).map(d3plusAxis.date) : [];
    timelinePossible = timelinePossible && ticks.length > 1;
    var timelineGroup = this._uiGroup("timeline", timelinePossible);
    if (timelinePossible) {

      var timeline = this._timelineClass
        .domain(d3Array.extent(ticks))
        .duration(this._duration)
        .height(this._height / 2 - this._margin.bottom)
        .select(timelineGroup.node())
        .ticks(ticks.sort(function (a, b) { return +a - +b; }))
        .width(this._width);

      if (timeline.selection() === void 0) {

        var dates = Array.from(new Set(d3Array.merge(this._filteredData.map(function (d) {
          var t = this$1._time(d);
          return t instanceof Array ? t : [t];
        })))).map(d3plusAxis.date);

        var d = this._data[0], i$1 = 0;
        if (this._discrete && ("_" + (this._discrete)) in this && this[("_" + (this._discrete))](d, i$1) === this._time(d, i$1)) { timeline.selection(d3Array.extent(dates)); }
        else { timeline.selection(d3Array.max(dates)); }

      }

      timeline
        .config(this._timelineConfig)
        .render();

      this._margin.bottom += timeline.outerBounds().height + timeline.padding() * 2;

    }

    // Renders the legend if this._legend is not falsy.
    var legendGroup = this._uiGroup("legend", this._legend);
    if (this._legend) {

      var legend = colorNest(this._legendData, this._shapeConfig.fill, this._groupBy);

      this._legendClass
        .id(legend.id)
        .duration(this._duration)
        .data(legend.data.length > 1 ? legend.data : [])
        .height(this._height / 2 - this._margin.bottom)
        .label(this._label || legend.id)
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
        .config(this._legendConfig)
        .render();

      var legendBounds = this._legendClass.outerBounds();
      if (legendBounds.height) { this._margin.bottom += legendBounds.height + this._legendClass.padding() * 2; }

    }

    var titleGroup = d3plusCommon.elem("g.d3plus-viz-titles", {parent: this._select});

    this._backClass
      .data(this._history.length ? [{text: d3plusCommon.locale.t("Back", {lng: this._locale}), x: this._padding * 2, y: 0}] : [])
      .select(titleGroup.node())
      .render();

    this._margin.top += this._history.length ? this._backClass.fontSize()() + this._padding : 0;

    if (callback) { setTimeout(callback, this._duration + 100); }

    // Draws a rectangle showing the available space for a visualization.
    // const tester = this._select.selectAll(".tester").data([0]);
    // tester.enter().append("rect").attr("fill", "#ccc").merge(tester)
    //   .attr("width", this._width - this._margin.left - this._margin.right)
    //   .attr("height", this._height - this._margin.top - this._margin.bottom)
    //   .attr("x", this._margin.left)
    //   .attr("y", this._margin.top);

    return this;

  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the aggregation method for each key in the object and returns the current class instance. If *value* is not specified, returns the current defined aggregation methods.
      @param {Object} [*value*]
  */
  Viz.prototype.aggs = function aggs (_) {
    return arguments.length ? (this._aggs = d3plusCommon.assign(this._aggs, _), this) : this._aggs;
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
      @desc If *value* is specified, sets the discrete accessor to the specified method name (usually an axis) and returns the current class instance. If *value* is not specified, returns the current discrete method.
      @param {String} [*value*]
  */
  Viz.prototype.discrete = function discrete (_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
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
    var this$1 = this;

    if (!arguments.length) { return this._groupBy; }
    if (!(_ instanceof Array)) { _ = [_]; }
    return this._groupBy = _.map(function (k) {
      if (typeof k === "function") { return k; }
      else {
        if (!this$1._aggs[k]) {
          this$1._aggs[k] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
        return d3plusCommon.accessor(k);
      }
    }), this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overall height to the specified number and returns the current class instance. If *value* is not specified, returns the current overall height.
      @param {Number} [*value* = window.innerHeight]
  */
  Viz.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the highlight method to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight method.
      @param {Function} [*value*]
  */
  Viz.prototype.highlight = function highlight (_) {
    var this$1 = this;


    var shapeData = d3Array.merge(this._shapes.map(function (s) { return s.data(); }));
    shapeData = shapeData.concat(this._legendClass.data());
    var highlightData = _ ? shapeData.filter(_) : [];

    var highlightIds = [];
    highlightData.map(this._ids).forEach(function (ids) {
      for (var x = 1; x <= ids.length; x++) {
        highlightIds.push(JSON.stringify(ids.slice(0, x)));
      }
    });
    highlightIds = highlightIds.filter(function (id, i) { return highlightIds.indexOf(id) === i; });

    var highlightFunction;
    if (highlightIds.length) { highlightFunction = function (d, i) { return highlightIds.includes(JSON.stringify(this$1._ids(d, i))); }; }

    this._shapes.forEach(function (s) { return s.highlight(highlightFunction); });
    if (this._legend) { this._legendClass.highlight(highlightFunction); }

    return this;
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
      @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current value.
      @param {Boolean} [*value* = true]
  */
  Viz.prototype.legend = function legend (_) {
    return arguments.length ? (this._legend = _, this) : this._legend;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, the object is passed to the legend's config method. If *value* is not specified, returns the current legend config.
      @param {Object} [*value*]
  */
  Viz.prototype.legendConfig = function legendConfig (_) {
    return arguments.length ? (this._legendConfig = _, this) : this._legendConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the locale to the specified string and returns the current class instance. If *value* is not specified, returns the current locale.
      @param {String} [*value* = "en-US"]
  */
  Viz.prototype.locale = function locale$1 (_) {
    return arguments.length ? (this._locale = _, this) : this._locale;
  };

  /**
      @memberof Viz
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
  */
  Viz.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
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
    return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the time accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current time accessor. The time values that are returned should be valid Date objects, 4-digit year values, or strings that can be parsed into javascript Date objects (click [here](http://dygraphs.com/date-formats.html) for valid string formats).
      @param {Function|String} [*value*]
  */
  Viz.prototype.time = function time (_) {
    if (arguments.length) {
      if (typeof _ === "function") {
        this._time = _;
      }
      else {
        this._time = d3plusCommon.accessor(_);
        if (!this._aggs[_]) {
          this._aggs[_] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else { return this._time; }
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the time filter to the specified function and returns the current class instance. If *value* is not specified, returns the current time filter.
      @param {Function} [*value*]
  */
  Viz.prototype.timeFilter = function timeFilter (_) {
    return arguments.length ? (this._timeFilter = _, this) : this._timeFilter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the timeline based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current timeline visibility.
      @param {Boolean} [*value* = true]
  */
  Viz.prototype.timeline = function timeline (_) {
    return arguments.length ? (this._timeline = _, this) : this._timeline;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the timeline and returns the current class instance. If *value* is not specified, returns the current timeline configuration.
      @param {Object} [*value*]
  */
  Viz.prototype.timelineConfig = function timelineConfig (_) {
    return arguments.length ? (this._timelineConfig = d3plusCommon.assign(this._timelineConfig, _), this) : this._timelineConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current tooltip visibility.
      @param {Boolean} [*value* = true]
  */
  Viz.prototype.tooltip = function tooltip (_) {
    return arguments.length ? (this._tooltip = _, this) : this._tooltip;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the tooltip and returns the current class instance. If *value* is not specified, returns the current tooltip configuration.
      @param {Object} [*value*]
  */
  Viz.prototype.tooltipConfig = function tooltipConfig (_) {
    return arguments.length ? (this._tooltipConfig = d3plusCommon.assign(this._tooltipConfig, _), this) : this._tooltipConfig;
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
//# sourceMappingURL=d3plus-viz.js.map
