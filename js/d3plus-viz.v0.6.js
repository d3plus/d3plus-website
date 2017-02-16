/*
  d3plus-viz v0.6.6
  Abstract ES6 class that drives d3plus visualizations.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-request'), require('d3-array'), require('d3-color'), require('d3-collection'), require('d3-queue'), require('d3-selection'), require('d3-transition'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-form'), require('d3plus-legend'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip')) :
	typeof define === 'function' && define.amd ? define('d3plus-viz', ['exports', 'd3-request', 'd3-array', 'd3-color', 'd3-collection', 'd3-queue', 'd3-selection', 'd3-transition', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-form', 'd3plus-legend', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3Request,global.d3Array,global.d3Color,global.d3Collection,global.d3Queue,global.d3Selection,global.d3Transition,global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.d3plusForm,global.d3plusLegend,global.d3plusText,global.d3plusTimeline,global.d3plusTooltip));
}(this, (function (exports,d3Request,d3Array,d3Color,d3Collection,d3Queue,d3Selection,d3Transition,d3plusAxis,d3plusColor,d3plusCommon,d3plusForm,d3plusLegend,d3plusText,d3plusTimeline,d3plusTooltip) { 'use strict';

/**
  @function dataFold
  @desc Given a JSON object where the data values and headers have been split into separate key lookups, this function will combine the data values with the headers and returns one large array of objects.
  @param {Object} json A JSON data Object with `data` and `headers` keys.
  @param {String} [data = "data"] The key used for the flat data array inside of the JSON object.
  @param {String} [headers = "headers"] The key used for the flat headers array inside of the JSON object.
*/
var fold = function (json$$1, data, headers) {
    if ( data === void 0 ) data = "data";
    if ( headers === void 0 ) headers = "headers";

    return json$$1[data].map(function (data) { return json$$1[headers].reduce(function (obj, header, i) { return (obj[header] = data[i], obj); }, {}); });
};

/**
  @function dataLoad
  @desc Loads data from a filepath or URL, converts it to a valid JSON object, and returns it to a callback function.
  @param {Array|String} path The path to the file or url to be loaded. If an Array is passed, the xhr request logic is skipped.
  @param {Function} [formatter] An optional formatter function that is run on the loaded data.
  @param {String} [key] The key in the `this` context to save the resulting data to.
  @param {Function} [callback] A function that is called when the final data is loaded. It is passed 2 variables, any error present and the data loaded.
*/
var load = function(path, formatter, key, callback) {
  var this$1 = this;


  if (typeof path !== "string") {

    var data = formatter ? formatter(path) : path;
    if (key && ("_" + key) in this) { this[("_" + key)] = data; }
    if (callback) { callback(null, data); }

  }
  else {

    var parser = path.slice(path.length - 4) === ".csv" ? d3Request.csv
                 : path.slice(path.length - 4) === ".tsv" ? d3Request.tsv
                 : path.slice(path.length - 4) === ".txt" ? d3Request.text
                 : d3Request.json;

    parser(path, function (err, data) {

      if (parser !== d3Request.json && !err && data && data instanceof Array) {
        data.forEach(function (d) {
          for (var k in d) {
            if (!isNaN(d[k])) { d[k] = parseFloat(d[k]); }
            else if (d[k].toLowerCase() === "false") { d[k] = false; }
            else if (d[k].toLowerCase() === "true") { d[k] = true; }
            else if (d[k].toLowerCase() === "null") { d[k] = null; }
            else if (d[k].toLowerCase() === "undefined") { d[k] = undefined; }
          }
        });
      }

      data = err ? [] : formatter ? formatter(data) : data;
      if (data && !(data instanceof Array) && data.data && data.headers) { data = fold(data); }
      if (key && ("_" + key) in this$1) { this$1[("_" + key)] = data; }
      if (callback) { callback(err, data); }

    });

  }

};

/**
    @function _drawBack
    @desc Draws a back button if there are states in this._history.
    @private
*/
var drawBack = function() {

  var visible = this._history.length;

  var backGroup = d3plusCommon.elem("g.d3plus-viz-back", {
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  this._backClass
    .data(visible ? [{text: d3plusCommon.locale.t("Back", {lng: this._locale}), x: this._padding * 2, y: 0}] : [])
    .select(backGroup)
    .config(this._backConfig)
    .render();

  this._margin.top += visible ? this._backClass.fontSize()() + this._padding : 0;

};

/**
    @function _drawLegend
    @desc Renders the legend if this._legend is not falsy.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawControls = function() {
  var this$1 = this;


  var condition = this._controls && this._controls.length;
  var that = this;
  var transform = {
    height: this._height - this._margin.top - this._margin.bottom,
    width: this._width - this._margin.left - this._margin.right,
    x: this._margin.left,
    y: this._margin.top
  };

  var foreign = d3plusCommon.elem("foreignObject.d3plus-viz-controls", {
    condition: condition,
    enter: Object.assign({opacity: 0}, transform),
    exit: Object.assign({opacity: 0}, transform),
    parent: this._select,
    transition: this._transition,
    update: Object.assign({opacity: 1}, transform)
  });

  var container = foreign.selectAll("div.d3plus-viz-controls-container")
    .data([null]);

  container = container.enter().append("xhtml:div")
      .attr("class", "d3plus-viz-controls-container")
      .style("margin-top", ((transform.height) + "px"))
    .merge(container);

  if (condition) {

    var loop = function ( i ) {

      var control = this$1._controls[i];

      var on = {};
      if (control.on) {
        var loop$1 = function ( event ) {
          if ({}.hasOwnProperty.call(control.on, event)) {
            on[event] = function() {
              control.on[event].bind(that)(this.value);
            };
          }
        };

        for (var event in control.on) loop$1( event );

      }

      var id = control.label || i;
      if (!this$1._controlCache[id]) { this$1._controlCache[id] = new d3plusForm.Select().container(container.node()); }
      this$1._controlCache[id]
        .config(control)
        .config({on: on})
        .config(this$1._controlConfig)
        .render();

    };

    for (var i = 0; i < this._controls.length; i++) loop( i );

    var bounds = container.node().getBoundingClientRect();

    container
        .style("text-align", "center")
      .transition(this._transition)
        .style("margin-top", ((transform.height - bounds.height) + "px"));

    this._margin.bottom += bounds.height;

  }

};

/**
    @function _colorNest
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
    @function _drawLegend
    @desc Renders the legend if this._legend is not falsy.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawLegend = function(data) {
  var this$1 = this;
  if ( data === void 0 ) data = [];


  var position = this._legendPosition;
  var wide = ["top", "bottom"].includes(position);
  var transform = {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")};

  this._legendData = [];
  if (data.length) {

    var dataNest = d3Collection.nest();
    for (var i = 0; i <= this._drawDepth; i++) { dataNest.key(this$1._groupBy[i]); }
    dataNest.rollup(function (leaves) { return this$1._legendData.push(d3plusCommon.merge(leaves, this$1._aggs)); }).entries(data);

  }

  var legendGroup = d3plusCommon.elem("g.d3plus-viz-legend", {
    condition: this._legend,
    enter: transform,
    parent: this._select,
    transition: this._transition,
    update: transform
  }).node();

  if (this._legend) {

    var legend = colorNest(this._legendData, this._shapeConfig.fill, this._groupBy);

    this._legendClass
      .id(legend.id)
      .align(wide ? "center" : position)
      .direction(wide ? "row" : "column")
      .duration(this._duration)
      .data(legend.data.length > 1 ? legend.data : [])
      .height(this._height - this._margin.bottom - this._margin.top)
      .label(this._label || legend.id)
      .select(legendGroup)
      .verticalAlign(!wide ? "middle" : position)
      .width(this._width - this._margin.left - this._margin.right)
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
    if (legendBounds.height) {
      if (wide) { this._margin[position] += legendBounds.height + this._legendClass.padding() * 2; }
      else { this._margin[position] += legendBounds.width + this._legendClass.padding() * 2; }
    }

  }

};

/**
    @function _drawTimeline
    @desc Renders the timeline if this._time and this._timeline are not falsy and there are more than 1 tick available.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawTimeline = function(data) {
  if ( data === void 0 ) data = [];


  var timelinePossible = this._time && this._timeline;
  var ticks = timelinePossible ? Array.from(new Set(this._data.map(this._time))).map(d3plusAxis.date) : [];
  timelinePossible = timelinePossible && ticks.length > 1;

  var timelineGroup = d3plusCommon.elem("g.d3plus-viz-timeline", {
    condition: timelinePossible,
    parent: this._select,
    transition: this._transition
  }).node();

  if (timelinePossible) {

    var timeline = this._timelineClass
      .domain(d3Array.extent(ticks))
      .duration(this._duration)
      .height(this._height - this._margin.bottom)
      .select(timelineGroup)
      .ticks(ticks.sort(function (a, b) { return +a - +b; }))
      .width(this._width);

    if (this._timelineSelection === void 0) {

      var dates = d3Array.extent(data.map(this._time).map(d3plusAxis.date));
      this._timelineSelection = dates[0] === dates[1] ? dates[0] : dates;
      timeline.selection(this._timelineSelection);

    }

    timeline
      .config(this._timelineConfig)
      .render();

    this._margin.bottom += timeline.outerBounds().height + timeline.padding() * 2;

  }

};

/**
    @function _drawTitle
    @desc Draws a title if this._title is defined.
    @param {Array} [*data*] The currently filtered dataset.
    @private
*/
var drawTitle = function(data) {
  if ( data === void 0 ) data = [];


  var text$$1 = this._title ? this._title(data) : false;

  var group = d3plusCommon.elem("g.d3plus-viz-title", {
    enter: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")},
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  this._titleClass
    .data(text$$1 ? [{text: text$$1}] : [])
    .select(group)
    .width(this._width - this._margin.left - this._margin.right)
    .config(this._titleConfig)
    .render();

  this._margin.top += text$$1 ? group.getBBox().height + this._padding : 0;

};

/**
    @function _drawTotal
    @desc Draws a total title if this._total is defined.
    @param {Array} [*data*] The currently filtered dataset.
    @private
*/
var drawTotal = function(data) {
  if ( data === void 0 ) data = [];


  var total = typeof this._total === "function" ? d3Array.sum(data.map(this._total))
              : this._total === true && this._size ? d3Array.sum(data.map(this._size)) : false;

  var group = d3plusCommon.elem("g.d3plus-viz-total", {
    enter: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")},
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  var visible = typeof total === "number";

  this._totalClass
    .data(visible ? [{text: ((d3plusCommon.locale.t("Total", {lng: this._locale})) + ": " + total)}] : [])
    .select(group)
    .width(this._width - this._margin.left - this._margin.right)
    .config(this._totalConfig)
    .render();

  this._margin.top += visible ? group.getBBox().height + this._padding : 0;

};

/**
  @desc Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
  @private
*/
function _elementSize(element, s) {

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
    else { return _elementSize(element.parentNode, s); }

  }
}

/**
    @function getSize
    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
    @param {HTMLElement} elem The HTMLElement to find dimensions for.
    @private
*/
var getSize = function(elem$$1) {
  return [_elementSize(elem$$1, "width"), _elementSize(elem$$1, "height")];
};

/**
  @desc Returns a *Boolean* denoting whether or not a given DOM element is visible in the current window.
  @param {DOMElement} elem The DOM element to analyze.
  @param {Number} [buffer = 0] A pixel offset from the edge of the top and bottom of the screen. If a positive value, the element will be deemed visible when it is that many pixels away from entering the viewport. If negative, the element will have to enter the viewport by that many pixels before being deemed visible.
  @private
*/
var inViewport = function(elem$$1, buffer) {
  if ( buffer === void 0 ) buffer = 0;


  var pageX = window.pageXOffset !== undefined ? window.pageXOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
        pageY = window.pageYOffset !== undefined ? window.pageYOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  var height = elem$$1.offsetHeight,
      left = elem$$1.offsetLeft,
      top = elem$$1.offsetTop,
      width = elem$$1.offsetWidth;

  if (height === void 0) {
    var bounds = elem$$1.getBoundingClientRect();
    height = bounds.height;
    left = bounds.left + pageX;
    top = bounds.top + pageY;
    width = bounds.width;
  }

  return pageY + window.innerHeight > top + buffer && pageY + buffer < top + height &&
         pageX + window.innerWidth > left + buffer && pageX + buffer < left + width;

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

    this.hover(false);
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

  this.hover(function (h, x) {
    var ids = this$1._ids(h, x);
    return filterId[this$1._depth] === ids[this$1._depth];
  });

};

/**
    @desc Tooltip logic for a specified data point.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @param {Object} [*config*] Optional configuration methods for the Tooltip class.
    @private
*/
var tooltip = function(d, i, config) {
  if ( config === void 0 ) config = {};


  if (this._tooltip) {
    this._select.style("cursor", "pointer");
    this._tooltipClass.data([d])
      .footer(this._drawDepth < this._groupBy.length - 1
            ? d3plusCommon.locale.t("Click to Expand", {lng: this._locale})
            : this._active && this._active(d, i)
            ? !this._focus || this._focus === this._id(d, i)
            ? d3plusCommon.locale.t("Click to Remove Highlight", {lng: this._locale})
            : d3plusCommon.locale.t("Click to Highlight", {lng: this._locale})
            : d3plusCommon.locale.t("Click to Highlight", {lng: this._locale}))
      .title(this._drawLabel)
      .translate(d3Selection.mouse(d3Selection.select("html").node()))
      .config(config)
      .config(this._tooltipConfig)
      .render();
  }

};

/**
    @desc On click event for Legend class.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var clickLegend = function(d, i) {
  var this$1 = this;


  if (this._hover && this._drawDepth >= this._groupBy.length - 1) {

    if (this._active && this._active(d, i)) {
      this.active(false);
      mouseenter.bind(this)(d, i);
    }
    else {

      var filterId = this._ids(d, i);

      this.active(function (h, x) {
        var ids = this$1._ids(h, x);
        return filterId[this$1._depth] === ids[this$1._depth];
      });
    }

    tooltip.bind(this)(d, i, {title: this._legendClass.label()});

  }

};

/**
    @desc On click event for Shape classes.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var clickShape = function(d, i) {
  var this$1 = this;


  if (this._hover && this._drawDepth >= this._groupBy.length - 1) {

    if (this._active && this._active(d, i)) {
      this.active(false);
      mouseenter.bind(this)(d, i);
    }
    else {

      var filterId = this._ids(d, i);

      this.active(function (h, x) {
        var ids = this$1._ids(h, x);
        return filterId[this$1._depth] === ids[this$1._depth];
      });
    }

    tooltip.bind(this)(d, i);

  }

};

/**
    @desc On mouseleave event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseleave = function() {

  this.hover(false);
  this._select.style("cursor", "auto");
  if (this._tooltip) { this._tooltipClass.data([]).render(); }

};

/**
    @desc On mousemove event for all legend shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mousemoveLegend = function(d, i) {

  tooltip.bind(this)(d, i, {title: this._legendClass.label()});

};

/**
    @desc On mousemove event for all primary shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mousemoveShape = function(d, i) {

  tooltip.bind(this)(d, i);

};

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Viz
    @extends external:BaseClass
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
    this._backConfig = {
      fontSize: 10,
      resize: false
    };
    var controlTest = new d3plusForm.Select();
    this._controlCache = {};
    this._controlConfig = {
      selectStyle: Object.assign({margin: "5px"}, controlTest.selectStyle())
    };
    this._data = [];
    this._detectResize = true;
    this._detectVisible = true;
    this._duration = 600;
    this._history = [];
    this._groupBy = [d3plusCommon.accessor("id")];
    this._legend = true;
    this._legendConfig = {
      shapeConfig: {
        fontResize: false
      }
    };
    this._legendClass = new d3plusLegend.Legend();
    this._legendPosition = "bottom";
    this._locale = "en-US";
    this._on = {
      "click": click.bind(this),
      "click.legend": clickLegend.bind(this),
      "click.shape": clickShape.bind(this),
      "mouseenter": mouseenter.bind(this),
      "mousemove.legend": mousemoveLegend.bind(this),
      "mousemove.shape": mousemoveShape.bind(this),
      "mouseleave": mouseleave.bind(this)
    };
    this._padding = 5;
    this._queue = [];

    this._shapeConfig = {
      fill: function (d, i) { return d3plusColor.colorAssign(this$1._groupBy[0](d, i)); },
      opacity: d3plusCommon.constant(1),
      stroke: function (d, i) { return d3Color.color(d3plusColor.colorAssign(this$1._groupBy[0](d, i))).darker(); },
      strokeWidth: d3plusCommon.constant(0)
    };

    this._timeline = true;
    this._timelineClass = new d3plusTimeline.Timeline()
      .align("end")
      .on("brush", function (s) {
        if (JSON.stringify(s) !== JSON.stringify(this$1._timelineSelection)) {
          this$1._timelineSelection = s;
          if (!(s instanceof Array)) { s = [s, s]; }
          s = s.map(Number);
          this$1.timeFilter(function (d) {
            var ms = d3plusAxis.date(this$1._time(d)).getTime();
            return ms >= s[0] && ms <= s[1];
          }).render();
        }
      });
    this._timelineConfig = {};

    this._titleClass = new d3plusText.TextBox();
    this._titleConfig = {
      fontSize: 12,
      resize: false,
      textAnchor: "middle"
    };

    this._tooltip = true;
    this._tooltipClass = new d3plusTooltip.Tooltip();
    this._tooltipConfig = {
      duration: 50,
      pointerEvents: "none"
    };

    this._totalClass = new d3plusText.TextBox();
    this._totalConfig = {
      fontSize: 10,
      resize: false,
      textAnchor: "middle"
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

    for (var key in this$1._shapeConfig) loop( key );

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
      @desc Called by render once all checks are passed.
      @private
  */
  Viz.prototype._draw = function _draw () {
    var this$1 = this;


    var that = this;

    // based on the groupBy, determine the draw depth and current depth id
    this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
    this._id = this._groupBy[this._drawDepth];
    this._ids = function (d, i) { return this$1._groupBy
      .map(function (g) { return g(d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i); })
      .filter(function (g) { return g !== void 0 && g.constructor !== Array; }); };
    this._drawLabel = this._label || function(d, i) {
      var l = that._ids(d, i).slice(0, that._depth + 1).filter(function (d) { return d && d.constructor !== Array; });
      return l[l.length - 1];
    };

    // set the default timeFilter if it has not been specified
    if (this._time && this._timeFilter === void 0) {

      var dates = this._data.map(this._time).map(d3plusAxis.date);
      var d = this._data[0], i = 0;

      if (this._discrete && ("_" + (this._discrete)) in this && this[("_" + (this._discrete))](d, i) === this._time(d, i)) {
        this._timeFilter = function () { return true; };
      }
      else {
        var latestTime = +d3Array.max(dates);
        this._timeFilter = function (d, i) { return +d3plusAxis.date(this$1._time(d, i)) === latestTime; };
      }

    }

    this._filteredData = [];
    var flatData = [];
    if (this._data.length) {

      flatData = this._timeFilter ? this._data.filter(this._timeFilter) : this._data;
      if (this._filter) { flatData = flatData.filter(this._filter); }

      var dataNest = d3Collection.nest();
      for (var i$1 = 0; i$1 <= this._drawDepth; i$1++) { dataNest.key(this$1._groupBy[i$1]); }
      if (this._discrete && ("_" + (this._discrete)) in this) { dataNest.key(this[("_" + (this._discrete))]); }
      dataNest.rollup(function (leaves) { return this$1._filteredData.push(d3plusCommon.merge(leaves, this$1._aggs)); }).entries(flatData);

    }

    drawTitle.bind(this)(flatData);
    drawControls.bind(this)(flatData);
    drawTimeline.bind(this)(flatData);
    drawLegend.bind(this)(flatData);
    drawBack.bind(this)();
    drawTotal.bind(this)(flatData);

    this._shapes = [];

    // Draws a rectangle showing the available space for a visualization.
    // const tester = this._select.selectAll(".tester").data([0]);
    // console.log(this._margin);
    // tester.enter().append("rect")
    //     .attr("class", "tester")
    //     .attr("fill", "#ccc")
    //   .merge(tester)
    //     .attr("width", this._width - this._margin.left - this._margin.right)
    //     .attr("height", this._height - this._margin.top - this._margin.bottom)
    //     .attr("x", this._margin.left)
    //     .attr("y", this._margin.top);

  };

  /**
      @memberof Viz
      @desc Draws the visualization given the specified configuration.
      @param {Function} [*callback*] An optional callback function that, if passed, will be called after animation is complete.
      @chainable
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
      var svg = parent.append("svg");
      w -= parseFloat(svg.style("border-left-width"), 10);
      w -= parseFloat(svg.style("border-right-width"), 10);
      h -= parseFloat(svg.style("border-top-width"), 10);
      h -= parseFloat(svg.style("border-bottom-width"), 10);
      if (!this._width) {
        this._autoWidth = true;
        this.width(w);
      }
      if (!this._height) {
        this._autoHeight = true;
        this.height(h);
      }

      svg
        .style("width", ((this._width) + "px"))
        .style("height", ((this._height) + "px"));

      this.select(svg.node());

    }

    // Calculates the width and/or height of the Viz based on the this._select, if either has not been defined.
    if (!this._width || !this._height) {
      var ref$1 = getSize(this._select.node());
      var w$1 = ref$1[0];
      var h$1 = ref$1[1];
      if (!this._width) { this.width(w$1); }
      if (!this._height) { this.height(h$1); }
    }

    this._select.transition(this._transition)
      .style("width", ((this._width) + "px"))
      .style("height", ((this._height) + "px"));

    clearInterval(this._visiblePoll);
    clearTimeout(this._resizePoll);
    d3Selection.select(window).on(("scroll." + (this._uuid)), null);
    d3Selection.select(window).on(("resize." + (this._uuid)), null);
    if (this._detectVisible && this._select.style("visibility") === "hidden") {

      this._visiblePoll = setInterval(function () {
        if (this$1._select.style("visibility") !== "hidden") {
          clearInterval(this$1._visiblePoll);
          this$1.render(callback);
        }
      }, 1000);

    }
    else if (this._detectVisible && this._select.style("display") === "none") {

      this._visiblePoll = setInterval(function () {
        if (this$1._select.style("display") !== "none") {
          clearInterval(this$1._visiblePoll);
          this$1.render(callback);
        }
      }, 1000);

    }
    else if (this._detectVisible && !inViewport(this._select.node())) {

      d3Selection.select(window).on(("scroll." + (this._uuid)), function () {
        if (inViewport(this$1._select.node())) {
          d3Selection.select(window).on(("scroll." + (this$1._uuid)), null);
          this$1.render(callback);
        }
      });

    }
    else {

      var q = d3Queue.queue();
      this._queue.forEach(function (p) { return q.defer.apply(q, p); });
      this._queue = [];
      q.awaitAll(function () {
        this$1._draw(callback);

        if (this$1._detectResize && (this$1._autoWidth || this$1._autoHeight)) {
          d3Selection.select(window).on(("resize." + (this$1._uuid)), function () {
            clearTimeout(this$1._resizePoll);
            this$1._resizePoll = setTimeout(function () {
              clearTimeout(this$1._resizePoll);
              var display = this$1._select.style("display");
              this$1._select.style("display", "none");
              var ref = getSize(this$1._select.node().parentNode);
              var w = ref[0];
              var h = ref[1];
              w -= parseFloat(this$1._select.style("border-left-width"), 10);
              w -= parseFloat(this$1._select.style("border-right-width"), 10);
              h -= parseFloat(this$1._select.style("border-top-width"), 10);
              h -= parseFloat(this$1._select.style("border-bottom-width"), 10);
              this$1._select.style("display", display);
              if (this$1._autoWidth) { this$1.width(w); }
              if (this$1._autoHeight) { this$1.height(h); }
              this$1.render(callback);
            }, 200);
          });
        }

        if (callback) { setTimeout(callback, this$1._duration + 100); }
      });

    }

    return this;

  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the active method to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.active = function active (_) {

    this._active = _;
    this._shapes.forEach(function (s) { return s.active(_); });
    if (this._legend) { this._legendClass.active(_); }

    return this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the aggregation method for each key in the object and returns the current class instance. If *value* is not specified, returns the current defined aggregation methods.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.aggs = function aggs (_) {
    return arguments.length ? (this._aggs = d3plusCommon.assign(this._aggs, _), this) : this._aggs;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the back button and returns the current class instance. If *value* is not specified, returns the current back button configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.backConfig = function backConfig (_) {
    return arguments.length ? (this._backConfig = d3plusCommon.assign(this._backConfig, _), this) : this._backConfig;
  };

  /**
      @memberof Viz
      @desc Defines a list of controls to be rendered at the bottom of the visualization.
      @param {Array} [*value*]
      @chainable
  */
  Viz.prototype.controls = function controls (_) {
    return arguments.length ? (this._controls = _, this) : this._controls;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the controls and returns the current class instance. If *value* is not specified, returns the current control configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.controlConfig = function controlConfig (_) {
    return arguments.length ? (this._controlConfig = d3plusCommon.assign(this._controlConfig, _), this) : this._controlConfig;
  };

  /**
      @memberof Viz
      @desc Sets the primary data array to be used when drawing the visualization. The value passed should be an *Array* of objects or a *String* representing a filepath or URL to be loaded. The following filetypes are supported: `csv`, `tsv`, `txt`, and `json`.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final array of obejcts to be used as the primary data array. For example, some JSON APIs return the headers split from the data values to save bandwidth. These would need be joined using a custom formatter.

If *data* is not specified, this method returns the current primary data array, which defaults to an empty array (`[]`);
      @param {Array|String} *data* = []
      @param {Function} [*formatter*]
      @chainable
  */
  Viz.prototype.data = function data (_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "data"]), this) : this._data;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the depth to the specified number and returns the current class instance. The *value* should correspond with an index in the [groupBy](#groupBy) array. If *value* is not specified, returns the current depth.
      @param {Number} [*value*]
      @chainable
  */
  Viz.prototype.depth = function depth (_) {
    return arguments.length ? (this._depth = _, this) : this._depth;
  };

  /**
      @memberof Viz
      @desc If the width and/or height of a Viz is not user-defined, it is determined by the size of it's parent element. When this method is set to `true`, the Viz will listen for the `window.onresize` event and adjust it's dimensions accordingly.

If no value is specified, the method will return the current *Boolean* value.
      @param {Boolean} *value* = true
      @chainable
  */
  Viz.prototype.detectResize = function detectResize (_) {
    return arguments.length ? (this._detectResize = _, this) : this._detectResize;
  };

  /**
      @memberof Viz
      @desc Toggles whether or not the Viz should try to detect if it visible in the current viewport. When this method is set to `true`, the Viz will only be rendered when it has entered the viewport either through scrolling or if it's display or visibility is changed.

If no value is specified, the method will return the current *Boolean* value.
      @param {Boolean} *value* = true
      @chainable
  */
  Viz.prototype.detectVisible = function detectVisible (_) {
    return arguments.length ? (this._detectVisible = _, this) : this._detectVisible;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the discrete accessor to the specified method name (usually an axis) and returns the current class instance. If *value* is not specified, returns the current discrete method.
      @param {String} [*value*]
      @chainable
  */
  Viz.prototype.discrete = function discrete (_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
  };

  /**
      @memberof Viz
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
      @chainable
  */
  Viz.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the filter to the specified function and returns the current class instance. If *value* is not specified, returns the current filter.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.filter = function filter (_) {
    return arguments.length ? (this._filter = _, this) : this._filter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns the current class instance. If *value* is not specified, returns the current group accessor.
      @param {String|Function|Array} [*value*]
      @chainable
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
      @chainable
  */
  Viz.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.hover = function hover (_) {
    var this$1 = this;


    var hoverFunction = this._hover = _;
    if (typeof _ === "function") {

      var shapeData = d3Array.merge(this._shapes.map(function (s) { return s.data(); }));
      shapeData = shapeData.concat(this._legendClass.data());
      var activeData = _ ? shapeData.filter(_) : [];

      var activeIds = [];
      activeData.map(this._ids).forEach(function (ids) {
        for (var x = 1; x <= ids.length; x++) {
          activeIds.push(JSON.stringify(ids.slice(0, x)));
        }
      });
      activeIds = activeIds.filter(function (id, i) { return activeIds.indexOf(id) === i; });

      if (activeIds.length) { hoverFunction = function (d, i) { return activeIds.includes(JSON.stringify(this$1._ids(d, i))); }; }

    }

    this._shapes.forEach(function (s) { return s.hover(hoverFunction); });
    if (this._legend) { this._legendClass.hover(hoverFunction); }

    return this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.legend = function legend (_) {
    return arguments.length ? (this._legend = _, this) : this._legend;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, the object is passed to the legend's config method. If *value* is not specified, returns the current legend config.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.legendConfig = function legendConfig (_) {
    return arguments.length ? (this._legendConfig = _, this) : this._legendConfig;
  };

  /**
      @memberof Viz
      @desc Defines which side of the visualization to anchor the legend. Acceptable values are `"top"`, `"bottom"`, `"left"`, and `"right"`. If no value is passed, the current legend position will be returned.
      @param {String} [*value* = "bottom"]
      @chainable
  */
  Viz.prototype.legendPosition = function legendPosition (_) {
    return arguments.length ? (this._legendPosition = _, this) : this._legendPosition;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the locale to the specified string and returns the current class instance. If *value* is not specified, returns the current locale.
      @param {String} [*value* = "en-US"]
      @chainable
  */
  Viz.prototype.locale = function locale$$1 (_) {
    return arguments.length ? (this._locale = _, this) : this._locale;
  };

  /**
      @memberof Viz
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Viz.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the shape accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for each shape and returns the current class instance. If *value* is not specified, returns the current shape configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the time accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current time accessor. The time values that are returned should be valid Date objects, 4-digit year values, or strings that can be parsed into javascript Date objects (click [here](http://dygraphs.com/date-formats.html) for valid string formats).
      @param {Function|String} [*value*]
      @chainable
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
      @chainable
  */
  Viz.prototype.timeFilter = function timeFilter (_) {
    return arguments.length ? (this._timeFilter = _, this) : this._timeFilter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the timeline based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current timeline visibility.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.timeline = function timeline (_) {
    return arguments.length ? (this._timeline = _, this) : this._timeline;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the timeline and returns the current class instance. If *value* is not specified, returns the current timeline configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.timelineConfig = function timelineConfig (_) {
    return arguments.length ? (this._timelineConfig = d3plusCommon.assign(this._timelineConfig, _), this) : this._timelineConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the title accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current title accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.title = function title (_) {
    return arguments.length ? (this._title = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._title;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the title and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = d3plusCommon.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current tooltip visibility.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.tooltip = function tooltip (_) {
    return arguments.length ? (this._tooltip = _, this) : this._tooltip;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the tooltip and returns the current class instance. If *value* is not specified, returns the current tooltip configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.tooltipConfig = function tooltipConfig (_) {
    return arguments.length ? (this._tooltipConfig = d3plusCommon.assign(this._tooltipConfig, _), this) : this._tooltipConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the total accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current total accessor.
      @param {Boolean|Function|String} [*value*]
      @chainable
  */
  Viz.prototype.total = function total (_) {
    return arguments.length ? (this._total = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._total;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the total and returns the current class instance. If *value* is not specified, returns the current total configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.totalConfig = function totalConfig (_) {
    return arguments.length ? (this._totalConfig = d3plusCommon.assign(this._totalConfig, _), this) : this._totalConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overallwidth to the specified number and returns the current class instance. If *value* is not specified, returns the current overall width.
      @param {Number} [*value* = window.innerWidth]
      @chainable
  */
  Viz.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Viz;
}(d3plusCommon.BaseClass));

exports.dataFold = fold;
exports.dataLoad = load;
exports.Viz = Viz;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-viz.js.map
