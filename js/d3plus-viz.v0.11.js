/*
  d3plus-viz v0.11.17
  Abstract ES6 class that drives d3plus visualizations.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-request'), require('d3-selection'), require('d3plus-common'), require('d3plus-export'), require('d3plus-form'), require('d3-collection'), require('d3-array'), require('d3plus-axis'), require('d3-zoom'), require('d3-brush'), require('d3-color'), require('d3-queue'), require('d3-transition'), require('lrucache'), require('d3plus-color'), require('d3plus-format'), require('d3plus-legend'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip')) :
  typeof define === 'function' && define.amd ? define('d3plus-viz', ['exports', 'd3-request', 'd3-selection', 'd3plus-common', 'd3plus-export', 'd3plus-form', 'd3-collection', 'd3-array', 'd3plus-axis', 'd3-zoom', 'd3-brush', 'd3-color', 'd3-queue', 'd3-transition', 'lrucache', 'd3plus-color', 'd3plus-format', 'd3plus-legend', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip'], factory) :
  (factory((global.d3plus = {}),global.d3Request,global.d3Selection,global.d3plusCommon,global.d3plusExport,global.d3plusForm,global.d3Collection,global.d3Array,global.d3plusAxis,global.d3Zoom,global.d3Brush,global.d3Color,global.d3Queue,global.d3Transition,global.lrucache,global.d3plusColor,global.d3plusFormat,global.d3plusLegend,global.d3plusText,global.d3plusTimeline,global.d3plusTooltip));
}(this, (function (exports,d3Request,d3Selection,d3plusCommon,d3plusExport,d3plusForm,d3Collection,d3Array,d3plusAxis,d3Zoom,d3Brush,d3Color,d3Queue,d3Transition,lrucache,d3plusColor,d3plusFormat,d3plusLegend,d3plusText,d3plusTimeline,d3plusTooltip) { 'use strict';

  lrucache = lrucache && lrucache.hasOwnProperty('default') ? lrucache['default'] : lrucache;

  /**
    @function dataFold
    @desc Given a JSON object where the data values and headers have been split into separate key lookups, this function will combine the data values with the headers and returns one large array of objects.
    @param {Object} json A JSON data Object with `data` and `headers` keys.
    @param {String} [data = "data"] The key used for the flat data array inside of the JSON object.
    @param {String} [headers = "headers"] The key used for the flat headers array inside of the JSON object.
  */
  function fold (json, data, headers) {
      if ( data === void 0 ) data = "data";
      if ( headers === void 0 ) headers = "headers";

      return json[data].map(function (data) { return json[headers].reduce(function (obj, header, i) { return (obj[header] = data[i], obj); }, {}); });
  }

  /**
    @function dataLoad
    @desc Loads data from a filepath or URL, converts it to a valid JSON object, and returns it to a callback function.
    @param {Array|String} path The path to the file or url to be loaded. If an Array is passed, the xhr request logic is skipped.
    @param {Function} [formatter] An optional formatter function that is run on the loaded data.
    @param {String} [key] The key in the `this` context to save the resulting data to.
    @param {Function} [callback] A function that is called when the final data is loaded. It is passed 2 variables, any error present and the data loaded.
  */
  function load(path, formatter, key, callback) {
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
        if (this$1._cache) { this$1._lrucache.set(path, data); }
        if (callback) { callback(err, data); }

      });

    }

  }

  /**
      @class Message
      @desc Displays a message using plain HTML.
      @private
  */
  var Message = function Message() {
    this._isVisible = false;
  };

  /**
      @memberof Message
      @desc Removes the message from the page.
      @chainable
  */
  Message.prototype.exit = function exit (elem, duration) {

    elem
      .transition().duration(duration).style("opacity", 0)
      .transition().remove();

    this._isVisible = false;

  };

  /**
      @memberof Message
      @desc Removes the message from the page.
      @chainable
  */
  Message.prototype.hide = function hide (ref) {
      if ( ref === void 0 ) ref = {};
      var duration = ref.duration; if ( duration === void 0 ) duration = 600;
      var callback = ref.callback;


    this.mask.call(this.exit.bind(this), duration);
    this.elem.call(this.exit.bind(this), duration);

    if (callback) { setTimeout(callback, duration + 100); }

    this._isVisible = false;

    return this;

  };

  /**
      @memberof Message
      @desc Draws the message given the specified configuration.
      @param {Object} [*config*]
      @chainable
  */
  Message.prototype.render = function render (ref) {
      if ( ref === void 0 ) ref = {};
      var callback = ref.callback;
      var container = ref.container; if ( container === void 0 ) container = "body";
      var duration = ref.duration; if ( duration === void 0 ) duration = 600;
      var html = ref.html; if ( html === void 0 ) html = "Please Wait";
      var mask = ref.mask; if ( mask === void 0 ) mask = "rgba(0, 0, 0, 0.1)";
      var style = ref.style; if ( style === void 0 ) style = {};


    var parent = d3Selection.select(container)
      .style("position", "relative");

    this.mask = parent.selectAll("div.d3plus-Mask").data(mask ? [mask] : []);

    this.mask = this.mask.enter().append("div")
      .attr("class", "d3plus-Mask")
      .style("opacity", 1)
      .merge(this.mask);

    this.mask.exit().call(this.exit.bind(this), duration);

    d3plusCommon.stylize(this.mask, {
      "background-color": String,
      "bottom": "0px",
      "left": "0px",
      "position": "absolute",
      "right": "0px",
      "top": "0px"
    });

    this.elem = parent.selectAll("div.d3plus-Message").data([html]);

    this.elem = this.elem.enter().append("div")
      .attr("class", "d3plus-Message")
      .style("opacity", 1)
      .merge(this.elem)
      .html(String);

    d3plusCommon.stylize(this.elem, style);

    if (callback) { setTimeout(callback, 100); }

    this._isVisible = true;

    return this;

  };

  /**
      @function _drawBack
      @desc Draws a back button if there are states in this._history.
      @private
  */
  function drawBack() {

    var visible = this._history.length;

    var backGroup = d3plusCommon.elem("g.d3plus-viz-back", {
      parent: this._select,
      transition: this._transition,
      update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
    }).node();

    this._backClass
      .data(visible ? [{text: "Back", x: 0, y: 0}] : [])
      .select(backGroup)
      .config(this._backConfig)
      .render();

    this._margin.top += visible ? this._backClass.fontSize()() : 0;

  }

  /**
      @function _drawColorScale
      @desc Renders the color scale if this._colorScale is not falsy.
      @param {Array} data The filtered data array to be displayed.
      @private
  */
  function drawColorScale(data) {
    var this$1 = this;
    if ( data === void 0 ) data = [];


    if (this._colorScale && data) {

      var position = this._colorScalePosition || "bottom";
      var wide = ["top", "bottom"].includes(position);

      var transform = {
        opacity: this._colorScalePosition ? 1 : 0,
        transform: ("translate(" + (wide ? this._margin.left + this._padding.left : this._margin.left) + ", " + (wide ? this._margin.top : this._margin.top + this._padding.top) + ")")
      };

      var showColorScale = this._colorScale && data && data.length > 1;

      var scaleGroup = d3plusCommon.elem("g.d3plus-viz-colorScale", {
        condition: showColorScale && !this._colorScaleConfig.select,
        enter: transform,
        parent: this._select,
        transition: this._transition,
        update: transform
      }).node();

      var scaleData = data.filter(function (d, i) {
        var c = this$1._colorScale(d, i);
        return c !== undefined && c !== null;
      });

      if (showColorScale) {
        this._colorScaleClass
          .align({bottom: "end", left: "start", right: "end", top: "start"}[position] || "bottom")
          .duration(this._duration)
          .data(scaleData)
          .height(wide ? this._height - (this._margin.bottom + this._margin.top) : this._height - (this._margin.bottom + this._margin.top + this._padding.bottom + this._padding.top))
          .orient(position)
          .select(scaleGroup)
          .value(this._colorScale)
          .width(wide ? this._width - (this._margin.left + this._margin.right + this._padding.left + this._padding.right) : this._width - (this._margin.left + this._margin.right))
          .config(this._colorScaleConfig)
          .render();

        var scaleBounds = this._colorScaleClass.outerBounds();
        if (this._colorScalePosition && !this._colorScaleConfig.select && scaleBounds.height) {
          if (wide) { this._margin[position] += scaleBounds.height + this._legendClass.padding() * 2; }
          else { this._margin[position] += scaleBounds.width + this._legendClass.padding() * 2; }
        }

      }
      else {
        this._colorScaleClass.config(this._colorScaleConfig);
      }

    }

  }

  var formTypes = {Button: d3plusForm.Button, Radio: d3plusForm.Radio, Select: d3plusForm.Select};

  /**
      @function _drawLegend
      @desc Renders the legend if this._legend is not falsy.
      @param {Array} dara The filtered data array to be displayed.
      @private
  */
  function drawControls() {
    var this$1 = this;


    var that = this;

    var areas = ["left", "right", "top", "bottom"];
    var loop = function ( a ) {
      var area = areas[a];
      var controls = (this$1._controls || []).filter(function (c) { return !c.position && area === "bottom" || c.position === area; });

      if (this$1._downloadButton && this$1._downloadPosition === area) {
        controls.push({
          data: [{text: "Download", value: 1}],
          label: "downloadButton",
          on: {
            click: function () {
              var resize = this$1._detectResize;
              if (resize) { this$1.detectResize(false).render(); }
              d3plusExport.saveElement(this$1._select.node(), Object.assign({
                title: this$1._title || undefined
              }, this$1._downloadConfig), {
                callback: function () {
                  setTimeout(function () {
                    if (resize) { this$1.detectResize(resize).render(); }
                  }, 5000);
                }
              });
            }
          },
          type: "Button"
        });
      }

      var wide = area === "top" || area === "bottom";

      var transform = {
        height: wide ? this$1._height - (this$1._margin.top + this$1._margin.bottom) : this$1._height - (this$1._margin.top + this$1._margin.bottom + this$1._padding.top + this$1._padding.bottom),
        width: wide ? this$1._width - (this$1._margin.left + this$1._margin.right + this$1._padding.left + this$1._padding.right) : this$1._width - (this$1._margin.left + this$1._margin.right)
      };

      transform.x = (wide ? this$1._margin.left + this$1._padding.left : this$1._margin.left) + (area === "right" ? transform.width : 0);
      transform.y = (wide ? this$1._margin.top : this$1._margin.top + this$1._padding.top)  + (area === "bottom" ? transform.height : 0);

      var foreign = d3plusCommon.elem(("foreignObject.d3plus-viz-controls-" + area), {
        condition: controls.length,
        enter: Object.assign({opacity: 0}, transform),
        exit: Object.assign({opacity: 0}, transform),
        parent: this$1._select,
        transition: this$1._transition,
        update: {height: transform.height, opacity: 1, width: transform.width}
      });

      var container = foreign.selectAll("div.d3plus-viz-controls-container")
        .data([null]);

      container = container.enter().append("xhtml:div")
          .attr("class", "d3plus-viz-controls-container")
        .merge(container);

      if (controls.length) {

        var loop$1 = function ( i ) {

          var control = Object.assign({}, controls[i]);

          var on = {};
          if (control.on) {
            var loop$2 = function ( event ) {
              if ({}.hasOwnProperty.call(control.on, event)) {
                on[event] = function() {
                  control.on[event].bind(that)(this.value);
                };
              }
            };

            for (var event in control.on) loop$2( event );

          }

          var id = control.label || (area + "-" + i);
          if (!this$1._controlCache[id]) {
            var type = control.type && formTypes[control.type] ? control.type : "Select";
            this$1._controlCache[id] = new formTypes[type]().container(container.node());
            if (control.checked) { this$1._controlCache[id].checked(control.checked); }
            if (control.selected) { this$1._controlCache[id].selected(control.selected); }
          }
          delete control.checked;
          delete control.selected;

          this$1._controlCache[id]
            .config(control)
            .config({on: on})
            .config(this$1._controlConfig)
            .render();

        };

        for (var i = 0; i < controls.length; i++) loop$1( i );

        container
            .style("display", ["top", "bottom"].includes(area) ? "block" : "inline-block")
            .style("text-align", ["top", "bottom"].includes(area) ? "center" : area);

        var bounds = container.node().getBoundingClientRect();

        foreign.transition(this$1._transition)
          .attr("x", transform.x - (area === "right" ? bounds.width : 0))
          .attr("y", transform.y - (area === "bottom" ? bounds.height : 0));

        this$1._margin[area] += ["top", "bottom"].includes(area) ? bounds.height : bounds.width;

      }

    };

    for (var a = 0; a < areas.length; a++) loop( a );

  }

  /**
      @function legendLabel
      @desc Default label function for the legend.
      @private
  */
  function legendLabel(d, i) {
    var l = this._drawLabel(d, i);
    return l instanceof Array ? l.join(", ") : l;
  }

  /**
      @function _drawLegend
      @desc Renders the legend if this._legend is not falsy.
      @param {Array} data The filtered data array to be displayed.
      @private
  */
  function drawLegend(data) {
    var this$1 = this;
    if ( data === void 0 ) data = [];


    if (this._legend) {

      var legendBounds = this._legendClass.outerBounds();
      var position = this._legendPosition;
      var wide = ["top", "bottom"].includes(position);

      var transform = {transform: ("translate(" + (wide ? this._margin.left + this._padding.left : this._margin.left) + ", " + (wide ? this._margin.top : this._margin.top + this._padding.top) + ")")};

      var legendGroup = d3plusCommon.elem("g.d3plus-viz-legend", {
        condition: this._legend && !this._legendConfig.select,
        enter: transform,
        parent: this._select,
        transition: this._transition,
        update: transform
      }).node();

      var legendData = [];

      var color = function (d, i) {
        var shape = this$1._shape(d, i);
        var attr = shape === "Line" ? "stroke" : "fill";
        var value = this$1._shapeConfig[shape] && this$1._shapeConfig[shape][attr]
          ? this$1._shapeConfig[shape][attr] : this$1._shapeConfig[attr];
        return typeof value === "function" ? value(d, i) : value;
      };

      var opacity = function (d, i) {
        var shape = this$1._shape(d, i);
        var value = this$1._shapeConfig[shape] && this$1._shapeConfig[shape].opacity
          ? this$1._shapeConfig[shape].opacity : this$1._shapeConfig.opacity;
        return typeof value === "function" ? value(d, i) : value;
      };

      var fill = function (d, i) { return ((color(d, i)) + "_" + (opacity(d, i))); };

      d3Collection.nest()
        .key(fill)
        .rollup(function (leaves) { return legendData.push(d3plusCommon.merge(leaves, this$1._aggs)); })
        .entries(this._colorScale ? data.filter(function (d, i) { return this$1._colorScale(d, i) === undefined; }) : data);
      
      this._legendClass
        .id(fill)
        .align(wide ? "center" : position)
        .direction(wide ? "row" : "column")
        .duration(this._duration)
        .data(legendData.length > 1 || this._colorScale ? legendData : [])
        .height(wide ? this._height - (this._margin.bottom + this._margin.top) : this._height - (this._margin.bottom + this._margin.top + this._padding.bottom + this._padding.top))
        .select(legendGroup)
        .verticalAlign(!wide ? "middle" : position)
        .width(wide ? this._width - (this._margin.left + this._margin.right + this._padding.left + this._padding.right) : this._width - (this._margin.left + this._margin.right))
        .shapeConfig(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "legend"))
        .config(this._legendConfig)
        .shapeConfig({fill: color, opacity: opacity})
        .render();

      if (!this._legendConfig.select && legendBounds.height) {
        if (wide) { this._margin[position] += legendBounds.height + this._legendClass.padding() * 2; }
        else { this._margin[position] += legendBounds.width + this._legendClass.padding() * 2; }
      }
    }
  }

  /**
      @function setTimeFilter
      @desc Determines whether or not to update the timeFilter method of the Viz.
      @param {Array|Date} The timeline selection given from the d3 brush.
      @private
  */
  function setTimeFilter(s) {
    var this$1 = this;

    if (JSON.stringify(s) !== JSON.stringify(this._timelineSelection)) {
      this._timelineSelection = s;
      if (!(s instanceof Array)) { s = [s, s]; }
      s = s.map(Number);
      this.timeFilter(function (d) {
        var ms = d3plusAxis.date(this$1._time(d)).getTime();
        return ms >= s[0] && ms <= s[1];
      }).render();
    }
  }

  /**
      @function _drawTimeline
      @desc Renders the timeline if this._time and this._timeline are not falsy and there are more than 1 tick available.
      @param {Array} data The filtered data array to be displayed.
      @private
  */
  function drawTimeline(data) {
    var this$1 = this;
    if ( data === void 0 ) data = [];


    var timelinePossible = this._time && this._timeline;
    var ticks = timelinePossible ? Array.from(new Set(this._data.map(this._time))).map(d3plusAxis.date) : [];
    timelinePossible = timelinePossible && ticks.length > 1;

    var transform = {transform: ("translate(" + (this._margin.left + this._padding.left) + ", 0)")};

    var timelineGroup = d3plusCommon.elem("g.d3plus-viz-timeline", {
      condition: timelinePossible,
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    if (timelinePossible) {

      var timeline = this._timelineClass
        .domain(d3Array.extent(ticks))
        .duration(this._duration)
        .height(this._height - this._margin.bottom)
        .select(timelineGroup)
        .ticks(ticks.sort(function (a, b) { return +a - +b; }))
        .width(this._width - (this._margin.left + this._margin.right + this._padding.left + this._padding.right));

      if (this._timelineSelection === void 0) {

        var dates = d3Array.extent(data.map(this._time).map(d3plusAxis.date));
        this._timelineSelection = dates[0] === dates[1] ? dates[0] : dates;
        timeline.selection(this._timelineSelection);

      }

      var config = this._timelineConfig;

      timeline
        .config(config)
        .on("brush", function (s) {
          setTimeFilter.bind(this$1)(s);
          if (config.on && config.on.brush) { config.on.brush(s); }
        })
        .on("end", function (s) {
          setTimeFilter.bind(this$1)(s);
          if (config.on && config.on.end) { config.on.end(s); }
        })
        .render();

      this._margin.bottom += timeline.outerBounds().height + timeline.padding() * 2;

    }

  }

  /**
      @function _drawTitle
      @desc Draws a title if this._title is defined.
      @param {Array} [*data*] The currently filtered dataset.
      @private
  */
  function drawTitle(data) {
    if ( data === void 0 ) data = [];


    var text = this._title ? this._title(data) : false;

    var transform = {transform: ("translate(" + (this._margin.left + this._padding.left) + ", " + (this._margin.top) + ")")};

    var group = d3plusCommon.elem("g.d3plus-viz-title", {
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    this._titleClass
      .data(text ? [{text: text}] : [])
      .select(group)
      .width(this._width - (this._margin.left + this._margin.right + this._padding.left + this._padding.right))
      .config(this._titleConfig)
      .render();

    this._margin.top += text ? group.getBBox().height : 0;

  }

  /**
      @function _drawTotal
      @desc Draws a total title if this._total is defined.
      @param {Array} [*data*] The currently filtered dataset.
      @private
  */
  function drawTotal(data) {
    if ( data === void 0 ) data = [];


    var total = typeof this._total === "function" ? d3Array.sum(data.map(this._total))
      : this._total === true && this._size ? d3Array.sum(data.map(this._size)) : false;

    var transform = {transform: ("translate(" + (this._margin.left + this._padding.left) + ", " + (this._margin.top) + ")")};

    var group = d3plusCommon.elem("g.d3plus-viz-total", {
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    var visible = typeof total === "number";

    this._totalClass
      .data(visible ? [{text: ("Total: " + (this._totalFormat(total)))}] : [])
      .select(group)
      .width(this._width - (this._margin.left + this._margin.right + this._padding.left + this._padding.right))
      .config(this._totalConfig)
      .render();

    this._margin.top += visible ? group.getBBox().height + this._totalConfig.padding * 2 : 0;

  }

  /**
    @desc Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
    @private
  */
  function _elementSize(element, s) {

    if (!element) { return undefined; }

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
  function getSize(elem) {
    return [_elementSize(elem, "width"), _elementSize(elem, "height")];
  }

  /**
    @desc Returns a *Boolean* denoting whether or not a given DOM element is visible in the current window.
    @param {DOMElement} elem The DOM element to analyze.
    @param {Number} [buffer = 0] A pixel offset from the edge of the top and bottom of the screen. If a positive value, the element will be deemed visible when it is that many pixels away from entering the viewport. If negative, the element will have to enter the viewport by that many pixels before being deemed visible.
    @private
  */
  function inViewport(elem, buffer) {
    if ( buffer === void 0 ) buffer = 0;


    var pageX = window.pageXOffset !== undefined ? window.pageXOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollLeft;

    var pageY = window.pageYOffset !== undefined ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    var bounds = elem.getBoundingClientRect();
    var height = bounds.height,
          left = bounds.left + pageX,
          top = bounds.top + pageY,
          width = bounds.width;

    return pageY + window.innerHeight > top + buffer && pageY + buffer < top + height &&
           pageX + window.innerWidth > left + buffer && pageX + buffer < left + width;

  }

  /**
      @desc On click event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */
  function click(d, i) {

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

  }

  /**
      @desc On mouseenter event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */
  function mouseenter(d, i) {
    var this$1 = this;


    var filterId = this._ids(d, i);

    this.hover(function (h, x) {
      var ids = this$1._ids(h, x);
      var index = d3Array.min([ids.length - 1, filterId.length - 1, this$1._drawDepth]);
      return filterId.slice(0, index + 1).join("_") === ids.slice(0, index + 1).join("_");
    });

  }

  /**
      @desc On mouseleave event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */
  function mouseleave() {

    this.hover(false);
    this._select.style("cursor", "auto");
    if (this._tooltip) { this._tooltipClass.data([]).render(); }

  }

  /**
      @desc Tooltip logic for a specified data point.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @param {Object} [*config*] Optional configuration methods for the Tooltip class.
      @private
  */
  function mousemoveLegend(d) {
    var position = d3Selection.event.touches ? [d3Selection.event.touches[0].clientX, d3Selection.event.touches[0].clientY] : [d3Selection.event.clientX, d3Selection.event.clientY];

    if (this._tooltip && d) {
      this._select.style("cursor", "pointer");
      this._tooltipClass.data([d])
        .footer(this._drawDepth < this._groupBy.length - 1 ? "Click to Expand" : "")
        .title(this._legendConfig.label ? this._legendClass.label() : legendLabel.bind(this))
        .position(position)
        .config(this._tooltipConfig)
        .config(this._legendTooltip)
        .render();
    }

  }

  /**
      @desc Tooltip logic for a specified data point.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @param {Object} [*config*] Optional configuration methods for the Tooltip class.
      @private
  */
  function mousemoveShape(d) {
    var position = d3Selection.event.touches ? [d3Selection.event.touches[0].clientX, d3Selection.event.touches[0].clientY] : [d3Selection.event.clientX, d3Selection.event.clientY];

    if (this._tooltip && d) {
      this._select.style("cursor", "pointer");
      this._tooltipClass.data([d])
        .footer(this._drawDepth < this._groupBy.length - 1 ? "Click to Expand" : "")
        .title(this._drawLabel)
        .position(position)
        .config(this._tooltipConfig)
        .render();
    }

  }

  /**
   @desc On touchstart event for the Body element.
   @private
   */
  function touchstartBody(d) {
    d3Selection.event.preventDefault();
    d3Selection.event.stopPropagation();

    if (this._tooltip && !d) { this._tooltipClass.data([]).render(); }
  }

  var brushing = false;

  /**
      @name zoomControls
      @desc Sets up initial zoom events and controls.
      @private
  */
  function zoomControls() {

    if (!this._container || !this._zoomGroup) { return; }

    var height = this._zoomHeight || this._height - this._margin.top - this._margin.bottom,
          that = this,
          width = this._zoomWidth || this._width - this._margin.left - this._margin.right;

    this._zoomBehavior
      .extent([[0, 0], [width, height]])
      .scaleExtent([1, this._zoomMax])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", zoomed.bind(this));

    this._zoomToBounds = zoomToBounds.bind(this);

    var control = d3Selection.select(this._select.node().parentNode).selectAll("div.d3plus-zoom-control").data(this._zoom ? [0] : []);
    var controlEnter = control.enter().append("div").attr("class", "d3plus-zoom-control");
    control.exit().remove();
    control = control.merge(controlEnter)
      .style("position", "absolute")
      .style("top", ((this._margin.top) + "px"))
      .style("left", ((this._margin.left) + "px"));

    controlEnter.append("div").attr("class", "zoom-control zoom-in");
    control.select(".zoom-in")
      .on("click", zoomMath.bind(this, this._zoomFactor))
      .html("&#65291;");

    controlEnter.append("div").attr("class", "zoom-control zoom-out");
    control.select(".zoom-out")
      .on("click", zoomMath.bind(this, 1 / this._zoomFactor))
      .html("&#65293;");

    controlEnter.append("div").attr("class", "zoom-control zoom-reset");
    control.select(".zoom-reset")
      .on("click", zoomMath.bind(this, 0))
      .html("&#8634");

    controlEnter.append("div").attr("class", "zoom-control zoom-brush");
    control.select(".zoom-brush")
      .on("click", function() {
        d3Selection.select(this)
          .classed("active", !brushing)
          .call(d3plusCommon.stylize, brushing ? that._zoomControlStyle || {} : that._zoomControlStyleActive || {});
        zoomEvents.bind(that)(!brushing);
      })
      .html("&#164");

    control.selectAll(".zoom-control")
      .call(d3plusCommon.stylize, that._zoomControlStyle)
      .on("mouseenter", function() {
        d3Selection.select(this).call(d3plusCommon.stylize, that._zoomControlStyleHover || {});
      })
      .on("mouseleave", function() {
        d3Selection.select(this).call(d3plusCommon.stylize, d3Selection.select(this).classed("active") ? that._zoomControlStyleActive || {} : that._zoomControlStyle || {});
      });

    this._zoomBrush
      .extent([[0, 0], [width, height]])
      .filter(function () { return !d3Selection.event.button && d3Selection.event.detail < 2; })
      .handleSize(this._zoomBrushHandleSize)
      .on("start", brushStart.bind(this))
      .on("brush", brushBrush.bind(this))
      .on("end", brushEnd.bind(this));

    var brushGroup = this._container.selectAll("g.brush").data([0]);
    this._brushGroup = brushGroup.enter().append("g")
        .attr("class", "brush")
      .merge(brushGroup)
      .call(this._zoomBrush);

    zoomEvents.bind(this)();
    if (this._renderTiles) { this._renderTiles(d3Zoom.zoomTransform(this._container.node()), 0); }

  }

  /**
      @name zoomEvents
      @desc Handles adding/removing zoom event listeners.
      @private
  */
  function zoomEvents(brush) {
    if ( brush === void 0 ) brush = false;


    brushing = brush;

    if (brushing) { this._brushGroup.style("display", "inline"); }
    else { this._brushGroup.style("display", "none"); }

    if (!brushing && this._zoom) {
      this._container.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._container
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._container
          .on("mousedown.zoom mousemove.zoom", null)
          .on("touchstart.zoom touchmove.zoom touchend.zoom touchcancel.zoom", null);
      }
    }
    else {
      this._container.on(".zoom", null);
    }

  }

  /**
      @name zoomed
      @desc Handles events dispatched from this._zoomBehavior
      @param {Object} [*transform* = event.transform]
      @param {Number} [*duration* = 0]
      @private
  */
  function zoomed(transform, duration) {
    if ( transform === void 0 ) transform = false;
    if ( duration === void 0 ) duration = 0;


    // console.log(transform || event.transform);

    if (this._zoomGroup) {
      if (!duration) { this._zoomGroup.attr("transform", transform || d3Selection.event.transform); }
      else { this._zoomGroup.transition().duration(duration).attr("transform", transform || d3Selection.event.transform); }
    }

    if (this._renderTiles) { this._renderTiles(d3Zoom.zoomTransform(this._container.node()), duration); }

  }

  /**
      @name zoomMath
      @desc Zooms in or out based on the provided multiplier.
      @param {Number} [*factor* = 0]
      @private
  */
  function zoomMath(factor) {
    if ( factor === void 0 ) factor = 0;


    if (!this._container) { return; }

    var center = this._zoomBehavior.extent().bind(document)()[1].map(function (d) { return d / 2; }),
          scaleExtent = this._zoomBehavior.scaleExtent(),
          t = d3Zoom.zoomTransform(this._container.node());

    if (!factor) {
      t.k = scaleExtent[0];
      t.x = 0;
      t.y = 0;
    }
    else {
      var translate0 = [(center[0] - t.x) / t.k, (center[1] - t.y) / t.k];
      t.k = Math.min(scaleExtent[1], t.k * factor);
      if (t.k <= scaleExtent[0]) {
        t.k = scaleExtent[0];
        t.x = 0;
        t.y = 0;
      }
      else {
        t.x += center[0] - (translate0[0] * t.k + t.x);
        t.y += center[1] - (translate0[1] * t.k + t.y);
      }

    }

    zoomed.bind(this)(t, this._duration);

  }

  /**
      @name zoomToBounds
      @desc Zooms to given bounds.
      @param {Array} *bounds*
      @param {Number} [*duration* = 0]
      @private
  */
  function zoomToBounds(bounds, duration) {
    if ( duration === void 0 ) duration = this._duration;


    var scaleExtent = this._zoomBehavior.scaleExtent(),
          t = d3Zoom.zoomTransform(this._container.node());

    if (bounds) {

      var ref = this._zoomBehavior.translateExtent()[1];
      var width = ref[0];
      var height = ref[1];
      var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1];

      var k = Math.min(scaleExtent[1], 1 / Math.max(dx / width, dy / height));

      var xMod, yMod;
      if (dx / dy < width / height) {
        k *= (height - this._zoomPadding * 2) / height;
        xMod = (width - dx * k) / 2 / k;
        yMod = this._zoomPadding / k;
      }
      else {
        k *= (width - this._zoomPadding * 2) / width;
        yMod = (height - dy * k) / 2 / k;
        xMod = this._zoomPadding / k;
      }

      t.x = (t.x - bounds[0][0] + xMod) * (t.k * k / t.k);
      t.y = (t.y - bounds[0][1] + yMod) * (t.k * k / t.k);
      t.k *= k;

      if (t.x > 0) { t.x = 0; }
      else if (t.x < width * -t.k + width) { t.x = width * -t.k + width; }
      if (t.y > 0) { t.y = 0; }
      else if (t.y < height * -t.k + height) { t.y = height * -t.k + height; }

    }
    else {

      t.k = scaleExtent[0];
      t.x = 0;
      t.y = 0;

    }

    zoomed.bind(this)(t, duration);

  }

  /**
      @desc Triggered on brush "brush".
      @private
  */
  function brushBrush() {
    brushStyle.bind(this)();
  }

  /**
      @desc Triggered on brush "end".
      @private
  */
  function brushEnd() {

    if (!d3Selection.event.selection) { return; } // Only transition after input.

    this._brushGroup.call(this._zoomBrush.move, null);
    zoomToBounds.bind(this)(d3Selection.event.selection);

  }

  /**
      @desc Triggered on brush "start".
      @private
  */
  function brushStart() {
    brushStyle.bind(this)();
  }

  /**
      @desc Overrides the default brush styles.
      @private
  */
  function brushStyle() {

    this._brushGroup.selectAll(".selection")
      .call(d3plusCommon.attrize, this._zoomBrushSelectionStyle || {});

    this._brushGroup.selectAll(".handle")
      .call(d3plusCommon.attrize, this._zoomBrushHandleStyle || {});

  }

  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  /**
      @class Viz
      @extends external:BaseClass
      @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
  */
  var Viz = (function (BaseClass) {
    function Viz() {
      var this$1 = this;


      BaseClass.call(this);

      this._aggs = {};
      this._backClass = new d3plusText.TextBox()
        .on("click", function () {
          if (this$1._history.length) { this$1.config(this$1._history.pop()).render(); }
          else { this$1.depth(this$1._drawDepth - 1).filter(false).render(); }
        })
        .on("mousemove", function () { return this$1._backClass.select().style("cursor", "pointer"); });
      this._backConfig = {
        fontSize: 10,
        padding: 5,
        resize: false
      };
      this._cache = true;
      this._color = function (d, i) { return this$1._groupBy[0](d, i); };
      this._colorScaleClass = new d3plusLegend.ColorScale();
      this._colorScaleConfig = {};
      this._colorScalePosition = "bottom";
      var controlTest = new d3plusForm.Select();
      this._controlCache = {};
      this._controlConfig = {
        selectStyle: Object.assign({margin: "5px"}, controlTest.selectStyle())
      };
      this._data = [];
      this._svgDesc = "";
      this._detectResize = true;
      this._detectResizeDelay = 400;
      this._detectVisible = true;
      this._detectVisibleInterval = 1000;
      this._downloadButton = false;
      this._downloadConfig = {type: "png"};
      this._downloadPosition = "top";
      this._duration = 600;
      this._history = [];
      this._groupBy = [d3plusCommon.accessor("id")];
      this._legend = true;
      this._legendConfig = {
        label: legendLabel.bind(this),
        shapeConfig: {
          ariaLabel: legendLabel.bind(this),
          labelConfig: {
            fontColor: undefined,
            fontResize: false,
            padding: 0
          }
        }
      };
      this._legendTooltip = {};
      this._legendClass = new d3plusLegend.Legend();
      this._legendPosition = "bottom";

      this._loadingHTML = d3plusCommon.constant("\n    <div style=\"font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;\">\n      <strong>Loading Visualization</strong>\n      <sub style=\"display: block; margin-top: 5px;\"><a href=\"https://d3plus.org\" target=\"_blank\">Powered by D3plus</a></sub>\n    </div>");

      this._loadingMessage = true;
      this._locale = "en-US";
      this._lrucache = lrucache(10);
      this._messageClass = new Message();
      this._messageMask = "rgba(0, 0, 0, 0.1)";
      this._messageStyle = {
        "left": "0px",
        "position": "absolute",
        "text-align": "center",
        "top": "45%",
        "width": "100%"
      };

      this._noDataHTML = d3plusCommon.constant("\n    <div style=\"font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;\">\n      <strong>No Data Available</strong>\n    </div>");

      this._noDataMessage = true;
      this._on = {
        "click": click.bind(this),
        "mouseenter": mouseenter.bind(this),
        "mouseleave": mouseleave.bind(this),
        "mousemove.shape": mousemoveShape.bind(this),
        "mousemove.legend": mousemoveLegend.bind(this)
      };
      this._queue = [];
      this._scrollContainer = typeof window === undefined ? "" : window;
      this._shape = d3plusCommon.constant("Rect");
      this._shapes = [];
      this._shapeConfig = {
        ariaLabel: function (d, i) { return this$1._drawLabel(d, i); },
        fill: function (d, i) {
          while (d.__d3plus__ && d.data) {
            d = d.data;
            i = d.i;
          }
          if (this$1._colorScale) {
            var c$1 = this$1._colorScale(d, i);
            if (c$1 !== undefined && c$1 !== null) {
              var scale = this$1._colorScaleClass._colorScale;
              if (!scale.domain().length) { return scale.range()[scale.range().length - 1]; }
              return scale(c$1);
            }
          }
          var c = this$1._color(d, i);
          if (d3Color.color(c)) { return c; }
          return d3plusColor.colorAssign(c);
        },
        labelConfig: {
          fontColor: function (d, i) {
            var c = typeof this$1._shapeConfig.fill === "function" ? this$1._shapeConfig.fill(d, i) : this$1._shapeConfig.fill;
            return d3plusColor.colorContrast(c);
          }
        },
        opacity: d3plusCommon.constant(1),
        stroke: function (d, i) {
          var c = typeof this$1._shapeConfig.fill === "function" ? this$1._shapeConfig.fill(d, i) : this$1._shapeConfig.fill;
          return d3Color.color(c).darker();
        },
        role: "presentation",
        strokeWidth: d3plusCommon.constant(0)
      };

      this._timeline = true;
      this._timelineClass = new d3plusTimeline.Timeline().align("end");
      this._timelineConfig = {};

      this._titleClass = new d3plusText.TextBox();
      this._titleConfig = {
        ariaHidden: true,
        fontSize: 12,
        padding: 5,
        resize: false,
        textAnchor: "middle"
      };

      this._tooltip = true;
      this._tooltipClass = new d3plusTooltip.Tooltip();
      this._tooltipConfig = {
        duration: 50,
        pointerEvents: "none",
        titleStyle: {
          "max-width": "200px"
        }
      };

      this._totalClass = new d3plusText.TextBox();
      this._totalConfig = {
        fontSize: 10,
        padding: 5,
        resize: false,
        textAnchor: "middle"
      };
      this._totalFormat = d3plusFormat.formatAbbreviate;

      this._zoom = false;
      this._zoomBehavior = d3Zoom.zoom();
      this._zoomBrush = d3Brush.brush();
      this._zoomBrushHandleSize = 1;
      this._zoomBrushHandleStyle = {
        fill: "#444"
      };
      this._zoomBrushSelectionStyle = {
        "fill": "#777",
        "stroke-width": 0
      };
      this._zoomControlStyle = {
        "background": "rgba(255, 255, 255, 0.75)",
        "border": "1px solid rgba(0, 0, 0, 0.75)",
        "color": "rgba(0, 0, 0, 0.75)",
        "display": "block",
        "font": "900 15px/21px 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        "height": "20px",
        "margin": "5px",
        "opacity": 0.75,
        "padding": 0,
        "text-align": "center",
        "width": "20px"
      };
      this._zoomControlStyleActive = {
        background: "rgba(0, 0, 0, 0.75)",
        color: "rgba(255, 255, 255, 0.75)",
        opacity: 1
      };
      this._zoomControlStyleHover = {
        cursor: "pointer",
        opacity: 1
      };
      this._zoomFactor = 2;
      this._zoomMax = 16;
      this._zoomPadding = 20;
      this._zoomPan = true;
      this._zoomScroll = true;

    }

    if ( BaseClass ) Viz.__proto__ = BaseClass;
    Viz.prototype = Object.create( BaseClass && BaseClass.prototype );
    Viz.prototype.constructor = Viz;

    /**
     @memberof Viz
     @desc Called by draw before anything is drawn. Formats the data and performs preparations for draw.
     @private
     */
    Viz.prototype._preDraw = function _preDraw () {
      var this$1 = this;

      var that = this;

      // based on the groupBy, determine the draw depth and current depth id
      this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
      this._id = this._groupBy[this._drawDepth];
      this._ids = function (d, i) { return this$1._groupBy
        .map(function (g) { return !d || d.__d3plus__ && !d.data ? undefined : g(d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i); })
        .filter(function (g) { return g !== undefined && g !== null && g.constructor !== Array; }); };

      this._drawLabel = function (d, i) {
        if (!d) { return ""; }
        while (d.__d3plus__ && d.data) {
          d = d.data;
          i = d.i;
        }
        if (this$1._label) { return this$1._label(d, i); }
        var l = that._ids(d, i).slice(0, this$1._drawDepth + 1);
        return l[l.length - 1];
      };

      // set the default timeFilter if it has not been specified
      if (this._time && this._timeFilter === void 0 && this._data.length) {

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
        if (this._discrete && ("_" + (this._discrete) + "2") in this) { dataNest.key(this[("_" + (this._discrete) + "2")]); }
        dataNest.rollup(function (leaves) { return this$1._filteredData.push(d3plusCommon.merge(leaves, this$1._aggs)); }).entries(flatData);

      }

      if (this._noDataMessage && !this._filteredData.length) {
        this._messageClass.render({
          container: this._select.node().parentNode,
          html: this._noDataHTML(this),
          mask: this._messageMask,
          style: this._messageStyle
        });
      }

    };

    /**
        @memberof Viz
        @desc Called by render once all checks are passed.
        @private
    */
    Viz.prototype._draw = function _draw () {

      if (this._legendPosition === "left" || this._legendPosition === "right") { drawLegend.bind(this)(this._filteredData); }
      if (this._colorScalePosition === "left" || this._colorScalePosition === "right" || this._colorScalePosition === false) { drawColorScale.bind(this)(this._filteredData); }

      drawBack.bind(this)();
      drawTitle.bind(this)(this._filteredData);
      drawTotal.bind(this)(this._filteredData);
      drawTimeline.bind(this)(this._filteredData);
      drawControls.bind(this)(this._filteredData);

      if (this._legendPosition === "top" || this._legendPosition === "bottom") { drawLegend.bind(this)(this._filteredData); }
      if (this._colorScalePosition === "top" || this._colorScalePosition === "bottom") { drawColorScale.bind(this)(this._filteredData); }

      this._shapes = [];

      // Draws a container and zoomGroup to test functionality.
      // this._container = this._select.selectAll("svg.d3plus-viz").data([0]);

      // this._container = this._container.enter().append("svg")
      //     .attr("class", "d3plus-viz")
      //     .attr("width", this._width - this._margin.left - this._margin.right)
      //     .attr("height", this._height - this._margin.top - this._margin.bottom)
      //     .attr("x", this._margin.left)
      //     .attr("y", this._margin.top)
      //     .style("background-color", "transparent")
      //   .merge(this._container);

      // this._zoomGroup = this._container.selectAll("g.d3plus-viz-zoomGroup").data([0]);
      // const enter = this._zoomGroup.enter().append("g").attr("class", "d3plus-viz-zoomGroup")
      //   .merge(this._zoomGroup);

      // this._zoomGroup = enter.merge(this._zoomGroup);

      // this._shapes.push(new Rect()
      //   .config(this._shapeConfig)
      //   .data(this._filteredData)
      //   .label("Test Label")
      //   .select(this._zoomGroup.node())
      //   .on({
      //     mouseenter: this._on.mouseenter,
      //     mouseleave: this._on.mouseleave,
      //     mousemove: this._on["mousemove.shape"]
      //   })
      //   .id(d => d.group)
      //   .x(d => d.value * 10 + 200)
      //   .y(d => d.value * 10 + 200)
      //   .width(100)
      //   .height(100)
      //   .render());
    };

    /**
        @memberof Viz
        @desc Draws the visualization given the specified configuration.
        @param {Function} [*callback*] An optional callback function that, if passed, will be called after animation is complete.
        @chainable
    */
    Viz.prototype.render = function render (callback) {
      var this$1 = this;


      // Resets margins and padding
      this._margin = {bottom: 0, left: 0, right: 0, top: 0};
      this._padding = {bottom: 0, left: 0, right: 0, top: 0};
      this._transition = d3Transition.transition().duration(this._duration);

      // Appends a fullscreen SVG to the BODY if a container has not been provided through .select().
      if (this._select === void 0 || this._select.node().tagName.toLowerCase() !== "svg") {

        var parent = this._select === void 0 ? d3Selection.select("body").append("div") : this._select;
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

      this._select
        .attr("aria-labelledby", ((this._uuid) + "-title " + (this._uuid) + "-desc"))
        .attr("role", "img")
        .transition(this._transition)
        .style("width", ((this._width) + "px"))
        .style("height", ((this._height) + "px"));

      // Updates the <title> tag if already exists else creates a new <title> tag on this.select.
      var svgTitleText = this._title || "D3plus Visualization";
      var svgTitle = this._select.selectAll("title").data([0]);
      var svgTitleEnter = svgTitle.enter().append("title").attr("id", ((this._uuid) + "-title"));
      svgTitle.merge(svgTitleEnter).text(svgTitleText);

      // Updates the <desc> tag if already exists else creates a new <desc> tag on this.select.
      var svgDesc = this._select.selectAll("desc").data([0]);
      var svgDescEnter = svgDesc.enter().append("desc").attr("id", ((this._uuid) + "-desc"));
      svgDesc.merge(svgDescEnter).text(this._svgDesc);

      this._visiblePoll = clearInterval(this._visiblePoll);
      this._resizePoll = clearTimeout(this._resizePoll);
      this._scrollPoll = clearTimeout(this._scrollPoll);
      d3Selection.select(this._scrollContainer).on(("scroll." + (this._uuid)), null);
      d3Selection.select(this._scrollContainer).on(("resize." + (this._uuid)), null);
      if (this._detectVisible && this._select.style("visibility") === "hidden") {

        this._visiblePoll = setInterval(function () {
          if (this$1._select.style("visibility") !== "hidden") {
            this$1._visiblePoll = clearInterval(this$1._visiblePoll);
            this$1.render(callback);
          }
        }, this._detectVisibleInterval);

      }
      else if (this._detectVisible && this._select.style("display") === "none") {

        this._visiblePoll = setInterval(function () {
          if (this$1._select.style("display") !== "none") {
            this$1._visiblePoll = clearInterval(this$1._visiblePoll);
            this$1.render(callback);
          }
        }, this._detectVisibleInterval);

      }
      else if (this._detectVisible && !inViewport(this._select.node())) {

        d3Selection.select(this._scrollContainer).on(("scroll." + (this._uuid)), function () {
          if (!this$1._scrollPoll) {
            this$1._scrollPoll = setTimeout(function () {
              if (inViewport(this$1._select.node())) {
                d3Selection.select(this$1._scrollContainer).on(("scroll." + (this$1._uuid)), null);
                this$1.render(callback);
              }
              this$1._scrollPoll = clearTimeout(this$1._scrollPoll);
            }, this$1._detectVisibleInterval);
          }
        });

      }
      else {
        var q = d3Queue.queue();

        if (this._loadingMessage) {
          this._messageClass.render({
            container: this._select.node().parentNode,
            html: this._loadingHTML(this),
            mask: this._messageMask,
            style: this._messageStyle
          });
        }

        this._queue.forEach(function (p) {
          var cache = this$1._cache ? this$1._lrucache.get(p[1]) : undefined;
          if (!cache) { q.defer.apply(q, p); }
          else { this$1[("_" + (p[3]))] = cache; }
        });
        this._queue = [];
        q.awaitAll(function () {

          this$1._preDraw();
          this$1._draw(callback);
          zoomControls.bind(this$1)();

          if (this$1._messageClass._isVisible && (!this$1._noDataMessage || this$1._filteredData.length)) { this$1._messageClass.hide(); }

          if (this$1._detectResize && (this$1._autoWidth || this$1._autoHeight)) {
            d3Selection.select(this$1._scrollContainer).on(("resize." + (this$1._uuid)), function () {
              this$1._resizePoll = clearTimeout(this$1._resizePoll);
              this$1._resizePoll = setTimeout(function () {
                this$1._resizePoll = clearTimeout(this$1._resizePoll);
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
              }, this$1._detectResizeDelay);
            });
          }

          if (callback) { setTimeout(callback, this$1._duration + 100); }
        });

      }

      // Attaches touchstart event listener to the BODY to hide the tooltip when the user touches any element without data
      d3Selection.select("body").on(("touchstart." + (this._uuid)), touchstartBody.bind(this));

      return this;

    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the active method to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Viz.prototype.active = function active (_) {

      this._active = _;

      if (this._shapeConfig.activeOpacity !== 1) {
        this._shapes.forEach(function (s) { return s.active(_); });
        if (this._legend) { this._legendClass.active(_); }
      }

      return this;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the aggregation method for each key in the object and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.aggs = function aggs (_) {
      return arguments.length ? (this._aggs = d3plusCommon.assign(this._aggs, _), this) : this._aggs;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the back button and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.backConfig = function backConfig (_) {
      return arguments.length ? (this._backConfig = d3plusCommon.assign(this._backConfig, _), this) : this._backConfig;
    };

    /**
        @memberof Viz
        @desc Enables a lru cache that stores up to 5 previously loaded files/URLs. Helpful when constantly writing over the data array with a URL in the render function of a react component.
        @param {Boolean} [*value* = false]
        @chainable
    */
    Viz.prototype.cache = function cache (_) {
      return arguments.length ? (this._cache = _, this) : this._cache;
    };

    /**
        @memberof Viz
        @desc Defines the main color to be used for each data point in a visualization. Can be either an accessor function or a string key to reference in each data point. If a color value is returned, it will be used as is. If a string is returned, a unique color will be assigned based on the string.
        @param {Function|String|False} [*value*]
        @chainable
    */
    Viz.prototype.color = function color (_) {
      return arguments.length ? (this._color = !_ || typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._color;
    };

    /**
        @memberof Viz
        @desc Defines the value to be used for a color scale. Can be either an accessor function or a string key to reference in each data point.
        @param {Function|String|False} [*value*]
        @chainable
    */
    Viz.prototype.colorScale = function colorScale (_) {
      return arguments.length ? (this._colorScale = !_ || typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._colorScale;
    };

    /**
        @memberof Viz
        @desc A pass-through to the config method of ColorScale.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.colorScaleConfig = function colorScaleConfig (_) {
      return arguments.length ? (this._colorScaleConfig = d3plusCommon.assign(this._colorScaleConfig, _), this) : this._colorScaleConfig;
    };

    /**
        @memberof Viz
        @desc Defines which side of the visualization to anchor the color scale. Acceptable values are `"top"`, `"bottom"`, `"left"`, `"right"`, and `false`. A `false` value will cause the color scale to not be displayed, but will still color shapes based on the scale.
        @param {String|Boolean} [*value* = "bottom"]
        @chainable
    */
    Viz.prototype.colorScalePosition = function colorScalePosition (_) {
      return arguments.length ? (this._colorScalePosition = _, this) : this._colorScalePosition;
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
        @desc If *value* is specified, sets the config method for the controls and returns the current class instance.
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
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "data"; });
        var d = [load.bind(this), _, f, "data"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._data;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the depth to the specified number and returns the current class instance. The *value* should correspond with an index in the [groupBy](#groupBy) array.
        @param {Number} [*value*]
        @chainable
    */
    Viz.prototype.depth = function depth (_) {
      return arguments.length ? (this._depth = _, this) : this._depth;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the description accessor to the specified string and returns the current class instance.
        @param {String} [*value*]
        @chainable
    */
    Viz.prototype.desc = function desc (_) {
      return arguments.length ? (this._svgDesc =  _, this) : this._svgDesc;
    };

    /**
        @memberof Viz
        @desc If the width and/or height of a Viz is not user-defined, it is determined by the size of it's parent element. When this method is set to `true`, the Viz will listen for the `window.onresize` event and adjust it's dimensions accordingly.
        @param {Boolean} *value* = true
        @chainable
    */
    Viz.prototype.detectResize = function detectResize (_) {
      return arguments.length ? (this._detectResize = _, this) : this._detectResize;
    };

    /**
        @memberof Viz
        @desc When resizing the browser window, this is the millisecond delay to trigger the resize event.
        @param {Number} *value* = 400
        @chainable
    */
    Viz.prototype.detectResizeDelay = function detectResizeDelay (_) {
      return arguments.length ? (this._detectResizeDelay = _, this) : this._detectResizeDelay;
    };

    /**
        @memberof Viz
        @desc Toggles whether or not the Viz should try to detect if it visible in the current viewport. When this method is set to `true`, the Viz will only be rendered when it has entered the viewport either through scrolling or if it's display or visibility is changed.
        @param {Boolean} *value* = true
        @chainable
    */
    Viz.prototype.detectVisible = function detectVisible (_) {
      return arguments.length ? (this._detectVisible = _, this) : this._detectVisible;
    };

    /**
        @memberof Viz
        @desc The interval, in milliseconds, for checking if the visualization is visible on the page.
        @param {Number} *value* = 1000
        @chainable
    */
    Viz.prototype.detectVisibleInterval = function detectVisibleInterval (_) {
      return arguments.length ? (this._detectVisibleInterval = _, this) : this._detectVisibleInterval;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the discrete accessor to the specified method name (usually an axis) and returns the current class instance.
        @param {String} [*value*]
        @chainable
    */
    Viz.prototype.discrete = function discrete (_) {
      return arguments.length ? (this._discrete = _, this) : this._discrete;
    };

    /**
        @memberof Viz
        @desc Shows a button that allows for downloading the current visualization.
        @param {Boolean} [*value* = false]
        @chainable
    */
    Viz.prototype.downloadButton = function downloadButton (_) {
      return arguments.length ? (this._downloadButton = _, this) : this._downloadButton;
    };

    /**
        @memberof Viz
        @desc Sets specific options of the saveElement function used when downloading the visualization.
        @param {Object} [*value* = {type: "png"}]
        @chainable
    */
    Viz.prototype.downloadConfig = function downloadConfig (_) {
      return arguments.length ? (this._downloadConfig = d3plusCommon.assign(this._downloadConfig, _), this) : this._downloadConfig;
    };

    /**
        @memberof Viz
        @desc Defines which control group to add the download button into.
        @param {String} [*value* = "top"]
        @chainable
    */
    Viz.prototype.downloadPosition = function downloadPosition (_) {
      return arguments.length ? (this._downloadPosition = _, this) : this._downloadPosition;
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
        @desc If *value* is specified, sets the filter to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Viz.prototype.filter = function filter (_) {
      return arguments.length ? (this._filter = _, this) : this._filter;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns the current class instance.
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
        @desc If *value* is specified, sets the overall height to the specified number and returns the current class instance.
        @param {Number} [*value* = window.innerHeight]
        @chainable
    */
    Viz.prototype.height = function height (_) {
      return arguments.length ? (this._height = _, this) : this._height;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Viz.prototype.hover = function hover (_) {
      var this$1 = this;


      var hoverFunction = this._hover = _;

      if (this._shapeConfig.hoverOpacity !== 1) {

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

      }

      return this;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value*]
        @chainable
    */
    Viz.prototype.label = function label (_) {
      return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Viz.prototype.legend = function legend (_) {
      return arguments.length ? (this._legend = _, this) : this._legend;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, the object is passed to the legend's config method.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.legendConfig = function legendConfig (_) {
      return arguments.length ? (this._legendConfig = d3plusCommon.assign(this._legendConfig, _), this) : this._legendConfig;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the legend tooltip and returns the current class instance.
        @param {Object} [*value* = {}]
        @chainable
    */
    Viz.prototype.legendTooltip = function legendTooltip (_) {
      return arguments.length ? (this._legendTooltip = d3plusCommon.assign(this._legendTooltip, _), this) : this._legendTooltip;
    };

    /**
        @memberof Viz
        @desc Defines which side of the visualization to anchor the legend. Expected values are `"top"`, `"bottom"`, `"left"`, and `"right"`.
        @param {String} [*value* = "bottom"]
        @chainable
    */
    Viz.prototype.legendPosition = function legendPosition (_) {
      return arguments.length ? (this._legendPosition = _, this) : this._legendPosition;
    };

    /**
        @memberof Viz
        @desc Sets the inner HTML of the status message that is displayed when loading AJAX requests and displaying errors. Must be a valid HTML string or a function that, when passed this Viz instance, returns a valid HTML string.
        @param {Function|String} [*value*]
        @chainable
    */
    Viz.prototype.loadingHTML = function loadingHTML (_) {
      return arguments.length ? (this._loadingHTML = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._loadingHTML;
    };

    /**
        @memberof Viz
        @desc Toggles the visibility of the status message that is displayed when loading AJAX requests and displaying errors.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Viz.prototype.loadingMessage = function loadingMessage (_) {
      return arguments.length ? (this._loadingMessage = _, this) : this._loadingMessage;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the locale to the specified string and returns the current class instance.
        @param {String} [*value* = "en-US"]
        @chainable
    */
    Viz.prototype.locale = function locale (_) {
      return arguments.length ? (this._locale = _, this) : this._locale;
    };

    /**
        @memberof Viz
        @desc Sets the color of the mask used underneath the status message that is displayed when loading AJAX requests and displaying errors. Additionally, `false` will turn off the mask completely.
        @param {Boolean|String} [*value* = "rgba(0, 0, 0, 0.1)"]
        @chainable
    */
    Viz.prototype.messageMask = function messageMask (_) {
      return arguments.length ? (this._messageMask = _, this) : this._messageMask;
    };

    /**
        @memberof Viz
        @desc Defines the CSS style properties for the status message that is displayed when loading AJAX requests and displaying errors.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.messageStyle = function messageStyle (_) {
      return arguments.length ? (this._messageStyle = d3plusCommon.assign(this._messageStyle, _), this) : this._messageStyle;
    };

    /**
        @memberof Viz
        @desc Sets the inner HTML of the status message that is displayed when no data is supplied to the visualization. Must be a valid HTML string or a function that, when passed this Viz instance, returns a valid HTML string.
        @param {Function|String} [*value*]
        @chainable
    */
    Viz.prototype.noDataHTML = function noDataHTML (_) {
      return arguments.length ? (this._noDataHTML = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._noDataHTML;
    };

    /**
       @memberof Viz
       @desc Toggles the visibility of the status message that is displayed when no data is supplied to the visualization.
       @param {Boolean} [*value* = true]
       @chainable
    */
    Viz.prototype.noDataMessage = function noDataMessage (_) {
      return arguments.length ? (this._noDataMessage = _, this) : this._noDataMessage;
    };

    /**
        @memberof Viz
        @desc If using scroll or visibility detection, this method allow a custom override of the element to which the scroll detection function gets attached.
        @param {String|HTMLElement} *selector*
        @chainable
    */
    Viz.prototype.scrollContainer = function scrollContainer (_) {
      return arguments.length ? (this._scrollContainer = _, this) : this._scrollContainer;
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
        @desc If *value* is specified, sets the shape accessor to the specified function or number and returns the current class instance.
        @param {Function|String} [*value*]
        @chainable
    */
    Viz.prototype.shape = function shape (_) {
      return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for each shape and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.shapeConfig = function shapeConfig (_) {
      return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the time accessor to the specified function or string and returns the current class instance.
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
        @desc If *value* is specified, sets the time filter to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Viz.prototype.timeFilter = function timeFilter (_) {
      return arguments.length ? (this._timeFilter = _, this) : this._timeFilter;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, toggles the timeline based on the specified boolean and returns the current class instance.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Viz.prototype.timeline = function timeline (_) {
      return arguments.length ? (this._timeline = _, this) : this._timeline;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the timeline and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.timelineConfig = function timelineConfig (_) {
      return arguments.length ? (this._timelineConfig = d3plusCommon.assign(this._timelineConfig, _), this) : this._timelineConfig;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the title accessor to the specified function or string and returns the current class instance.
        @param {Function|String} [*value*]
        @chainable
    */
    Viz.prototype.title = function title (_) {
      return arguments.length ? (this._title = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._title;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the title and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.titleConfig = function titleConfig (_) {
      return arguments.length ? (this._titleConfig = d3plusCommon.assign(this._titleConfig, _), this) : this._titleConfig;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Viz.prototype.tooltip = function tooltip (_) {
      return arguments.length ? (this._tooltip = _, this) : this._tooltip;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the tooltip and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.tooltipConfig = function tooltipConfig (_) {
      return arguments.length ? (this._tooltipConfig = d3plusCommon.assign(this._tooltipConfig, _), this) : this._tooltipConfig;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the total accessor to the specified function or string and returns the current class instance.
        @param {Boolean|Function|String} [*value*]
        @chainable
    */
    Viz.prototype.total = function total (_) {
      return arguments.length ? (this._total = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._total;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the config method for the total and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Viz.prototype.totalConfig = function totalConfig (_) {
      return arguments.length ? (this._totalConfig = d3plusCommon.assign(this._totalConfig, _), this) : this._totalConfig;
    };

    /**
        @memberof Viz
        @desc Formatter function for the value in the total bar.
        @param {Function} *value*
        @chainable
    */
    Viz.prototype.totalFormat = function totalFormat (_) {
      return arguments.length ? (this._totalFormat = _, this) : this._totalFormat;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the overallwidth to the specified number and returns the current class instance.
        @param {Number} [*value* = window.innerWidth]
        @chainable
    */
    Viz.prototype.width = function width (_) {
      return arguments.length ? (this._width = _, this) : this._width;
    };

    /**
        @memberof Viz
        @desc Toggles the ability to zoom/pan the visualization. Certain parameters for zooming are required to be hooked up on a visualization by visualization basis.
        @param {Boolean} *value* = false
        @chainable
    */
    Viz.prototype.zoom = function zoom (_) {
      return arguments.length ? (this._zoom = _, this) : this._zoom;
    };

    /**
        @memberof Viz
        @desc The pixel stroke-width of the zoom brush area.
        @param {Number} *value* = 1
        @chainable
    */
    Viz.prototype.zoomBrushHandleSize = function zoomBrushHandleSize (_) {
      return arguments.length ? (this._zoomBrushHandleSize = _, this) : this._zoomBrushHandleSize;
    };

    /**
        @memberof Viz
        @desc An object containing CSS key/value pairs that is used to style the outer handle area of the zoom brush. Passing `false` will remove all default styling.
        @param {Object|Boolean} *value*
        @chainable
    */
    Viz.prototype.zoomBrushHandleStyle = function zoomBrushHandleStyle (_) {
      return arguments.length ? (this._zoomBrushHandleStyle = _, this) : this._zoomBrushHandleStyle;
    };

    /**
        @memberof Viz
        @desc An object containing CSS key/value pairs that is used to style the inner selection area of the zoom brush. Passing `false` will remove all default styling.
        @param {Object|Boolean} *value*
        @chainable
    */
    Viz.prototype.zoomBrushSelectionStyle = function zoomBrushSelectionStyle (_) {
      return arguments.length ? (this._zoomBrushSelectionStyle = _, this) : this._zoomBrushSelectionStyle;
    };

    /**
        @memberof Viz
        @desc An object containing CSS key/value pairs that is used to style each zoom control button (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
        @param {Object|Boolean} *value*
        @chainable
    */
    Viz.prototype.zoomControlStyle = function zoomControlStyle (_) {
      return arguments.length ? (this._zoomControlStyle = _, this) : this._zoomControlStyle;
    };

    /**
        @memberof Viz
        @desc An object containing CSS key/value pairs that is used to style each zoom control button when active (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
        @param {Object|Boolean} *value*
        @chainable
    */
    Viz.prototype.zoomControlStyleActive = function zoomControlStyleActive (_) {
      return arguments.length ? (this._zoomControlStyleActive = _, this) : this._zoomControlStyleActive;
    };

    /**
        @memberof Viz
        @desc An object containing CSS key/value pairs that is used to style each zoom control button on hover (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
        @param {Object|Boolean} *value*
        @chainable
    */
    Viz.prototype.zoomControlStyleHover = function zoomControlStyleHover (_) {
      return arguments.length ? (this._zoomControlStyleHover = _, this) : this._zoomControlStyleHover;
    };

    /**
        @memberof Viz
        @desc The multiplier that is used in with the control buttons when zooming in and out.
        @param {Number} *value* = 2
        @chainable
    */
    Viz.prototype.zoomFactor = function zoomFactor (_) {
      return arguments.length ? (this._zoomFactor = _, this) : this._zoomFactor;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.
        @param {Number} *value* = 16
        @chainable
    */
    Viz.prototype.zoomMax = function zoomMax (_) {
      return arguments.length ? (this._zoomMax = _, this) : this._zoomMax;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.
        @param {Boolean} *value* = true
        @chainable
    */
    Viz.prototype.zoomPan = function zoomPan (_) {
      return arguments.length ? (this._zoomPan = _, this) : this._zoomPan;
    };

    /**
        @memberof Viz
        @desc A pixel value to be used to pad all sides of a zoomed area.
        @param {Number} *value* = 20
        @chainable
    */
    Viz.prototype.zoomPadding = function zoomPadding (_) {
      return arguments.length ? (this._zoomPadding = _, this) : this._zoomPadding;
    };

    /**
        @memberof Viz
        @desc If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Viz.prototype.zoomScroll = function zoomScroll (_) {
      return arguments.length ? (this._zoomScroll = _, this) : this._zoomScroll;
    };

    return Viz;
  }(d3plusCommon.BaseClass));

  exports.dataFold = fold;
  exports.dataLoad = load;
  exports.Viz = Viz;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-viz.js.map
