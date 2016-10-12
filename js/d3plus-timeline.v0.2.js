/*
  d3plus-timeline v0.2.0
  An easy-to-use javascript timeline.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-brush'), require('d3-selection'), require('d3plus-axis'), require('d3plus-common')) :
  typeof define === 'function' && define.amd ? define('d3plus-timeline', ['exports', 'd3-brush', 'd3-selection', 'd3plus-axis', 'd3plus-common'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Brush,global.d3Selection,global.d3plusAxis,global.d3plusCommon));
}(this, (function (exports,d3Brush,d3Selection,d3plusAxis,d3plusCommon) { 'use strict';

/**
    @class Timeline
    @extends Axis
*/
var Timeline = (function (Axis$$1) {
  function Timeline() {
    var this$1 = this;


    Axis$$1.call(this);

    this._domain = [2001, 2010];
    this._gridSize = 0;
    this._handleConfig = {
      fill: "#444"
    };
    this._handleSize = 6;
    this._height = 100;
    this._on = {};
    this.orient("bottom");
    this._scale = "time";
    this._selectionConfig = {
      fill: "#777"
    };
    this._shape = "Rect";
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      height: 10,
      width: function (d) { return this$1._domain.map(function (t) { return d3plusAxis.date(t).getTime(); }).includes(d.id) ? 2 : 1; }
    });

  }

  if ( Axis$$1 ) Timeline.__proto__ = Axis$$1;
  Timeline.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  Timeline.prototype.constructor = Timeline;

  /**
      @memberof Timeline
      @desc Triggered on brush "brush".
      @private
  */
  Timeline.prototype._brushBrush = function _brushBrush () {

    this._brushStyle();
    if (this._on.brush) this._on.brush();

  };

  /**
      @memberof Timeline
      @desc Triggered on brush "end".
      @private
  */
  Timeline.prototype._brushEnd = function _brushEnd () {

    if (!d3Selection.event.sourceEvent) return; // Only transition after input.

    var domain = (d3Selection.event.selection ? d3Selection.event.selection
                 : [d3Selection.event.sourceEvent.offsetX, d3Selection.event.sourceEvent.offsetX])
                 .map(this._d3Scale.invert)
                 .map(Number);

    var ticks = this._availableTicks.map(Number);
    domain[0] = d3plusAxis.date(d3plusCommon.closest(domain[0], ticks));
    domain[1] = d3plusAxis.date(d3plusCommon.closest(domain[1], ticks));
    var pixelDomain = domain.map(this._d3Scale),
          single = pixelDomain[0] === pixelDomain[1];
    if (single) {
      pixelDomain[0] -= 0.1;
      pixelDomain[1] += 0.1;
    }

    this._brushGroup.transition(this._transition).call(this._brush.move, pixelDomain);

    this._brushStyle();

    if (this._on.end) this._on.end(single ? domain[0] : domain);

  };

  /**
      @memberof Timeline
      @desc Triggered on brush "start".
      @private
  */
  Timeline.prototype._brushStart = function _brushStart () {

    this._brushStyle();
    if (this._on.start) this._on.start();

  };

  /**
      @memberof Timeline
      @desc Overrides the default brush styles.
      @private
  */
  Timeline.prototype._brushStyle = function _brushStyle () {

    var ref = this._position;
    var height = ref.height;
    var timelineHeight = this._shape === "Circle" ? this._shapeConfig.r * 2
             : this._shape === "Rect" ? this._shapeConfig[height]
             : this._tickSize;

    this._brushGroup.selectAll(".selection")
      .call(d3plusCommon.attrize, this._selectionConfig)
      .attr("height", timelineHeight);

    this._brushGroup.selectAll(".handle")
      .call(d3plusCommon.attrize, this._handleConfig)
      .attr("height", timelineHeight + this._handleSize);

  };

  /**
      Draws the timeline.
      @param {Function} [*callback* = undefined]
      @private
  */
  Timeline.prototype.render = function render (callback) {

    Axis$$1.prototype.render.call(this, callback);

    var ref = this._position;
    var height = ref.height;
    var y = ref.y;

    var offset = this._outerBounds[y],
          range = this._d3Scale.range();

    var brush = this._brush = d3Brush.brushX()
      .extent([[range[0], offset], [range[1], offset + this._outerBounds[height]]])
      .handleSize(this._handleSize)
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));

    var latest = this._availableTicks[this._availableTicks.length - 1];
    var selection = (this._selection === void 0 ? [latest, latest]
                    : this._selection instanceof Array
                    ? this._selection.slice()
                    : [this._selection, this._selection])
                    .map(d3plusAxis.date)
                    .map(this._d3Scale);

    if (selection[0] === selection[1]) {
      selection[0] -= 0.1;
      selection[1] += 0.1;
    }

    this._brushGroup = d3plusCommon.elem("g.brushGroup", {parent: this._group});
    this._brushGroup.call(brush).transition(this._transition)
      .call(brush.move, selection);

    return this;

  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
      @param {Object} [*value*]
  */
  Timeline.prototype.handleConfig = function handleConfig (_) {
    return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
      @param {Number} [*value* = 6]
  */
  Timeline.prototype.handleSize = function handleSize (_) {
    return arguments.length ? (this._handleSize = _, this) : this._handleSize;
  };

  /**
      @memberof Timeline
      @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
      @param {String|Object} [*typename*]
      @param {Function} [*listener*]
  */
  Timeline.prototype.on = function on (_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
      @param {Object} [*value*]
  */
  Timeline.prototype.selectionConfig = function selectionConfig (_) {
    return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
      @param {Array|Date|Number|String} [*value*]
  */
  Timeline.prototype.selection = function selection (_) {
    return arguments.length ? (this._selection = _, this) : this._selection;
  };

  return Timeline;
}(d3plusAxis.Axis));

exports.Timeline = Timeline;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-timeline.js.map
