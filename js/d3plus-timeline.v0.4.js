/*
  d3plus-timeline v0.4.9
  An easy-to-use javascript timeline.
  Copyright (c) 2019 D3plus - https://d3plus.org
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-brush'), require('d3-scale'), require('d3-selection'), require('d3plus-axis'), require('d3plus-common'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-timeline', ['exports', 'd3-array', 'd3-brush', 'd3-scale', 'd3-selection', 'd3plus-axis', 'd3plus-common', 'd3plus-text'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Brush,global.d3Scale,global.d3Selection,global.d3plusAxis,global.d3plusCommon,global.d3plusText));
}(this, (function (exports,d3Array,d3Brush,d3Scale,d3Selection,d3plusAxis,d3plusCommon,d3plusText) { 'use strict';

  /**
      @external Axis
      @see https://github.com/d3plus/d3plus-axis#Axis
  */

  /**
      @class Timeline
      @extends external:Axis
  */
  var Timeline = (function (Axis) {
    function Timeline() {
      var this$1 = this;


      Axis.call(this);

      this._barConfig = Object.assign({}, this._barConfig, {
        "stroke-width": function () { return this$1._buttonBehaviorCurrent === "buttons" ? 0 : 1; }
      });
      this._brushing = true;
      this._brushFilter = function () { return !d3Selection.event.button && d3Selection.event.detail < 2; };
      this._buttonAlign = "middle";
      this._buttonBehavior = "auto";
      this._buttonPadding = 10;
      this._buttonHeight = 30;
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
        "fill": "#777",
        "stroke-width": 0
      };
      this._shape = "Rect";
      this._shapeConfig = Object.assign({}, this._shapeConfig, {
        labelBounds: function (d) { return this$1._buttonBehaviorCurrent === "buttons" ? {x: d.labelBounds.x, y: -5, width: d.labelBounds.width, height: this$1._buttonHeight} : d.labelBounds; },
        fill: function () { return this$1._buttonBehaviorCurrent === "buttons" ? "#EEE" : "#444"; },
        height: function (d) { return this$1._buttonBehaviorCurrent === "buttons" ? this$1._buttonHeight : d.tick ? 10 : 0; },
        width: function (d) { return this$1._buttonBehaviorCurrent === "buttons" ? this$1._ticksWidth / this$1._availableTicks.length : d.tick ? this$1._domain.map(function (t) { return d3plusAxis.date(t).getTime(); }).includes(d.id) ? 2 : 1 : 0; },
        y: function (d) { return this$1._buttonBehaviorCurrent === "buttons" ? this$1._align === "middle" ? this$1._height / 2 : this$1._align === "start" ? this$1._margin.top + this$1._buttonHeight / 2 : this$1._height - this$1._buttonHeight / 2 - this$1._margin.bottom : d.y; }
      });
      this._snapping = true;

    }

    if ( Axis ) Timeline.__proto__ = Axis;
    Timeline.prototype = Object.create( Axis && Axis.prototype );
    Timeline.prototype.constructor = Timeline;


    /**
        @memberof Timeline
        @desc Triggered on brush "brush".
        @private
    */
    Timeline.prototype._brushBrush = function _brushBrush () {

      if (d3Selection.event.sourceEvent && d3Selection.event.sourceEvent.offsetX && d3Selection.event.selection !== null && (!this._brushing || this._snapping)) {

        var domain = this._updateDomain();

        this._brushGroup.call(this._brush.move, this._updateBrushLimit(domain));

      }

      this._brushStyle();
      if (this._on.brush) { this._on.brush(this._selection); }

    };

    /**
        @memberof Timeline
        @desc Triggered on brush "end".
        @private
    */
    Timeline.prototype._brushEnd = function _brushEnd () {

      if (!d3Selection.event.sourceEvent) { return; } // Only transition after input.

      var domain = this._updateDomain();

      this._brushStyle();

      if (this._brushing || !this._snapping) { this._brushGroup.transition(this._transition).call(this._brush.move, this._updateBrushLimit(domain)); }

      if (this._on.end) { this._on.end(this._selection); }

    };

    /**
        @memberof Timeline
        @desc Triggered on brush "start".
        @private
    */
    Timeline.prototype._brushStart = function _brushStart () {

      if (d3Selection.event.sourceEvent !== null && (!this._brushing || this._snapping)) {

        var domain = this._updateDomain();
        this._brushGroup.call(this._brush.move, this._updateBrushLimit(domain));

      }

      this._brushStyle();
      if (this._on.start) { this._on.start(); }

    };

    /**
        @memberof Timeline
        @desc Overrides the default brush styles.
        @private
    */
    Timeline.prototype._brushStyle = function _brushStyle () {

      var ref = this._position;
      var height = ref.height;
      var timelineHeight = this._shape === "Circle"
        ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) * 2 : this._shapeConfig.r
        : this._shape === "Rect"
          ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
          : this._tickSize;

      var brushOverlay = this._brushGroup.selectAll(".overlay")
        .attr("cursor", this._brushing ? "crosshair" : "pointer");

      var brushSelection = this._brushGroup.selectAll(".selection")
        .call(d3plusCommon.attrize, this._selectionConfig)
        .attr("height", timelineHeight);

      var brushHandle = this._brushGroup.selectAll(".handle")
        .call(d3plusCommon.attrize, this._handleConfig)
        .attr("height", this._buttonBehaviorCurrent === "buttons" ? this._buttonHeight : timelineHeight + this._handleSize);

      if (this._buttonBehaviorCurrent === "buttons") {

        var yTransform = this._align === "middle"
          ? this._height / 2 - this._buttonHeight / 2
          : this._align === "start"
            ? this._margin.top : this._height - this._buttonHeight - this._margin.bottom;

        brushHandle.attr("y", yTransform);
        brushOverlay.attr("x", this._marginLeft).attr("width", this._ticksWidth);
        brushSelection.attr("y", yTransform);
      }

    };

    /**
        @memberof Timeline
        @desc Updates domain of the timeline used in brush functions.
        @private
    */
    Timeline.prototype._updateDomain = function _updateDomain () {

      var domain = this._buttonBehaviorCurrent === "ticks"
        ? (d3Selection.event.selection && this._brushing
          ? d3Selection.event.selection
          : [d3Selection.event.sourceEvent.offsetX, d3Selection.event.sourceEvent.offsetX]).map(this._d3Scale.invert).map(Number)
        : (d3Selection.event.selection && this._brushing
          ? d3Selection.event.selection
          : [d3Selection.event.sourceEvent.offsetX, d3Selection.event.sourceEvent.offsetX]).map(Number);

      if (d3Selection.event.type === "brush" && this._brushing && this._buttonBehaviorCurrent === "buttons") {
        var diffs = d3Selection.event.selection.map(function (d) { return Math.abs(d - d3Selection.event.sourceEvent.offsetX); });

        domain = diffs[1] <= diffs[0]
          ? [d3Selection.event.selection[0], d3Selection.event.sourceEvent.offsetX].sort(function (a, b) { return a - b; })
          : [d3Selection.event.sourceEvent.offsetX, d3Selection.event.selection[1]].sort(function (a, b) { return a - b; });

      }

      var ticks = this._buttonBehaviorCurrent === "ticks"
        ? this._availableTicks.map(Number)
        : this._d3Scale.range();

      if (this._buttonBehaviorCurrent === "ticks") {
        domain[0] = d3plusAxis.date(d3plusCommon.closest(domain[0], ticks));
        domain[1] = d3plusAxis.date(d3plusCommon.closest(domain[1], ticks));
      }
      else {
        domain[0] = d3plusCommon.closest(domain[0], ticks);
        domain[1] = d3plusCommon.closest(domain[1], ticks);
      }

      var single = +domain[0] === +domain[1];

      if (d3Selection.event.type === "brush" || d3Selection.event.type === "end") {
        this._selection = this._buttonBehaviorCurrent === "ticks"
          ? single ? domain[0] : domain
          : single
            ? d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[0])])
            : [d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[0])]), d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[1])])];
      }

      return domain;

    };

    /**
        @memberof Timeline
        @desc Updates limits of the brush.
        @private
    */
    Timeline.prototype._updateBrushLimit = function _updateBrushLimit (domain) {

      var selection = this._buttonBehaviorCurrent === "ticks" ? domain.map(d3plusAxis.date).map(this._d3Scale) : domain;

      if (selection[0] === selection[1]) {
        selection[0] -= 0.1;
        selection[1] += 0.1;
      }

      if (this._buttonBehaviorCurrent === "buttons") {
        var buttonWidth = 0.5 * (this._ticksWidth / this._availableTicks.length - this._handleSize);
        selection[0] -= buttonWidth;
        selection[1] += buttonWidth;
      }

      return selection;
    };

    /**
        @memberof Timeline
        @desc Draws the timeline.
        @param {Function} [*callback* = undefined]
        @chainable
    */
    Timeline.prototype.render = function render (callback) {
      var this$1 = this;

      var ref = this._position;
      var height = ref.height;
      var y = ref.y;

      if (this._buttonBehavior !== "ticks") {

        var ticks = this._ticks ? this._ticks.map(d3plusAxis.date) : this._domain.map(d3plusAxis.date);

        var d3Scale$$1 = d3Scale.scaleTime().domain(ticks).range([0, this._width]);

        ticks = this._ticks ? ticks : d3Scale$$1.ticks();

        if (!this._tickFormat) { this._tickFormat = d3Scale$$1.tickFormat(ticks.length - 1, this._tickSpecifier); }

        // Measures size of ticks
        var maxLabel = 0;
        ticks.forEach(function (d, i) {
          var f = this$1._shapeConfig.labelConfig.fontFamily(d, i),
                s = this$1._shapeConfig.labelConfig.fontSize(d, i);

          var wrap = d3plusText.textWrap()
            .fontFamily(f)
            .fontSize(s)
            .lineHeight(this$1._shapeConfig.lineHeight ? this$1._shapeConfig.lineHeight(d, i) : undefined);

          var res = wrap(d3Scale$$1.tickFormat(ticks.length - 1, this$1._tickSpecifier)(d));
          var width = res.lines.length
            ? Math.ceil(d3Array.max(res.lines.map(function (line) { return d3plusText.textWidth(line, {"font-family": f, "font-size": s}); }))) + s / 4
            : 0;
          if (width % 2) { width++; }
          if (maxLabel < width) { maxLabel = width + 2 * this$1._buttonPadding; }
        });

        this._ticksWidth = maxLabel * ticks.length;
      }

      this._buttonBehaviorCurrent = this._buttonBehavior === "auto" ? this._ticksWidth < this._width ? "buttons" : "ticks" : this._buttonBehavior;

      if (this._buttonBehaviorCurrent === "buttons") {
        this._scale = "ordinal";
        this._labelRotation = 0;
        if (!this._brushing) { this._handleSize = 0; }
        var domain = d3Scale.scaleTime().domain(this._domain.map(d3plusAxis.date)).ticks().map(this._tickFormat).map(Number);

        this._domain = this._ticks ? this._ticks.map(d3plusAxis.date) : Array.from(Array(domain[domain.length - 1] - domain[0] + 1), function (_, x) { return domain[0] + x; }).map(d3plusAxis.date);

        this._ticks = this._domain;

        var buttonMargin = 0.5 * this._ticksWidth / this._ticks.length;

        this._marginLeft = this._buttonAlign === "middle"
          ? (this._width - this._ticksWidth) / 2 : this._buttonAlign === "end"
            ? this._width - this._ticksWidth : 0;

        var marginRight = this._buttonAlign === "middle"
          ? (this._width + this._ticksWidth) / 2 : this._buttonAlign === "start"
            ? this._ticksWidth : undefined;

        this._range = [
          this._buttonAlign === "start" ? undefined : this._marginLeft + buttonMargin,
          this._buttonAlign === "end" ? undefined : marginRight - buttonMargin
        ];
      }

      if (this._ticks) { this._domain = this._buttonBehaviorCurrent === "ticks" ? [this._ticks[0], this._ticks[this._ticks.length - 1]] : this._ticks.map(d3plusAxis.date); }

      this._labels = this._ticks;

      Axis.prototype.render.call(this, callback);

      var offset = this._outerBounds[y],
            range = this._d3Scale.range();

      var brush = this._brush = d3Brush.brushX()
        .extent([[range[0], offset], [range[range.length - 1], offset + this._outerBounds[height]]])
        .filter(this._brushFilter)
        .handleSize(this._handleSize)
        .on("start", this._brushStart.bind(this))
        .on("brush", this._brushBrush.bind(this))
        .on("end", this._brushEnd.bind(this));

      var latest = this._buttonBehaviorCurrent === "ticks"
        ? this._availableTicks[this._availableTicks.length - 1]
        : range[range.length - 1];

      var selection = this._selection === void 0 ? [latest, latest]
        : this._selection instanceof Array
          ? this._buttonBehaviorCurrent === "buttons"
            ? this._selection.map(function (d) { return range[this$1._ticks.map(Number).indexOf(+d)]; }).slice() : this._selection.slice()
          : this._buttonBehaviorCurrent === "buttons"
            ? [range[this._ticks.map(Number).indexOf(+this._selection)], range[this._ticks.map(Number).indexOf(+this._selection)]]
            : [this._selection, this._selection];

      this._updateBrushLimit(selection);

      this._brushGroup = d3plusCommon.elem("g.brushGroup", {parent: this._group});
      this._brushGroup.call(brush).transition(this._transition)
        .call(brush.move, this._buttonBehaviorCurrent === "ticks" ? this._updateBrushLimit(selection) : selection);

      this._outerBounds.y -= this._handleSize / 2;
      this._outerBounds.height += this._handleSize / 2;
      
      return this;
    };

    /**
          @memberof Timeline
          @desc If *value* is specified, sets the button padding and returns the current class instance. If *value* is not specified, returns the current button padding.
          @param {Number} [*value* = 10]
          @chainable
      */
    Timeline.prototype.buttonPadding = function buttonPadding (_) {
      return arguments.length ? (this._buttonPadding = _, this) : this._buttonPadding;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Timeline.prototype.brushing = function brushing (_) {
      return arguments.length ? (this._brushing = _, this) : this._brushing;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.
        @param {Function} [*value*]
        @chainable
        @example
  function() {
    return !event.button && event.detail < 2;
  }
    */
    Timeline.prototype.brushFilter = function brushFilter (_) {
      return arguments.length ? (this._brushFilter = _, this) : this._brushFilter;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, toggles the horizontal alignment of the button timeline. Accepted values are `"start"`, `"middle"` and `"end"`. If *value* is not specified, returns the current button value.
        @param {String} [*value* = "middle"]
        @chainable
    */
    Timeline.prototype.buttonAlign = function buttonAlign (_) {
      return arguments.length ? (this._buttonAlign = _, this) : this._buttonAlign;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, toggles the style of the timeline. Accepted values are `"auto"`, `"buttons"` and `"ticks"`. If *value* is not specified, returns the current button value.
        @param {String} [*value* = "auto"]
        @chainable
    */
    Timeline.prototype.buttonBehavior = function buttonBehavior (_) {
      return arguments.length ? (this._buttonBehavior = _, this) : this._buttonBehavior;
    };

    /**
          @memberof Timeline
          @desc If *value* is specified, sets the button height and returns the current class instance. If *value* is not specified, returns the current button height.
          @param {Number} [*value* = 30]
          @chainable
      */
    Timeline.prototype.buttonHeight = function buttonHeight (_) {
      return arguments.length ? (this._buttonHeight = _, this) : this._buttonHeight;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
        @param {Object} [*value*]
        @chainable
    */
    Timeline.prototype.handleConfig = function handleConfig (_) {
      return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
        @param {Number} [*value* = 6]
        @chainable
    */
    Timeline.prototype.handleSize = function handleSize (_) {
      return arguments.length ? (this._handleSize = _, this) : this._handleSize;
    };

    /**
        @memberof Timeline
        @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
        @param {String|Object} [*typename*]
        @param {Function} [*listener*]
        @chainable
    */
    Timeline.prototype.on = function on (_, f) {
      return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
        @param {Object} [*value*]
        @chainable
    */
    Timeline.prototype.selectionConfig = function selectionConfig (_) {
      return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
        @param {Array|Date|Number|String} [*value*]
        @chainable
    */
    Timeline.prototype.selection = function selection (_) {
      return arguments.length ? (this._selection = _, this) : this._selection;
    };

    /**
        @memberof Timeline
        @desc If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.
        @param {Boolean} [*value* = true]
        @chainable
    */
    Timeline.prototype.snapping = function snapping (_) {
      return arguments.length ? (this._snapping = _, this) : this._snapping;
    };

    return Timeline;
  }(d3plusAxis.Axis));

  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-timeline.js.map
