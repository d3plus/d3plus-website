/*
  d3plus-timeline v0.4.13
  An easy-to-use javascript timeline.
  Copyright (c) 2019 D3plus - https://d3plus.org
  @license MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-brush'), require('d3-scale'), require('d3-selection'), require('d3plus-axis'), require('d3plus-common'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-timeline', ['exports', 'd3-array', 'd3-brush', 'd3-scale', 'd3-selection', 'd3plus-axis', 'd3plus-common', 'd3plus-text'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Array, global.d3Brush, global.d3Scale, global.d3Selection, global.d3plusAxis, global.d3plusCommon, global.d3plusText));
}(this, function (exports, d3Array, d3Brush, d3Scale, d3Selection, d3plusAxis, d3plusCommon, d3plusText) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
      @class Timeline
      @extends external:Axis
  */

  var Timeline =
  /*#__PURE__*/
  function (_Axis) {
    _inherits(Timeline, _Axis);

    /**
        @memberof Timeline
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
        @private
    */
    function Timeline() {
      var _this;

      _classCallCheck(this, Timeline);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
      _this._barConfig = Object.assign({}, _this._barConfig, {
        "stroke-width": function strokeWidth() {
          return _this._buttonBehaviorCurrent === "buttons" ? 0 : 1;
        }
      });
      _this._brushing = true;

      _this._brushFilter = function () {
        return !d3Selection.event.button && d3Selection.event.detail < 2;
      };

      _this._buttonAlign = "middle";
      _this._buttonBehavior = "auto";
      _this._buttonPadding = 10;
      _this._buttonHeight = 30;
      _this._domain = [2001, 2010];
      _this._gridSize = 0;
      _this._handleConfig = {
        fill: "#444"
      };
      _this._handleSize = 6;
      _this._height = 100;
      _this._labelOffset = false;
      _this._on = {};

      _this.orient("bottom");

      _this._scale = "time";
      _this._selectionConfig = {
        "fill": "#777",
        "stroke-width": 0
      };
      _this._shape = "Rect";
      _this._shapeConfig = Object.assign({}, _this._shapeConfig, {
        labelBounds: function labelBounds(d) {
          return _this._buttonBehaviorCurrent === "buttons" ? {
            x: d.labelBounds.x,
            y: -5,
            width: d.labelBounds.width,
            height: _this._buttonHeight
          } : d.labelBounds;
        },
        fill: function fill() {
          return _this._buttonBehaviorCurrent === "buttons" ? "#EEE" : "#444";
        },
        height: function height(d) {
          return _this._buttonBehaviorCurrent === "buttons" ? _this._buttonHeight : d.tick ? 10 : 0;
        },
        width: function width(d) {
          return _this._buttonBehaviorCurrent === "buttons" ? _this._ticksWidth / _this._availableTicks.length : d.tick ? _this._domain.map(function (t) {
            return d3plusAxis.date(t).getTime();
          }).includes(d.id) ? 2 : 1 : 0;
        },
        y: function y(d) {
          return _this._buttonBehaviorCurrent === "buttons" ? _this._align === "middle" ? _this._height / 2 : _this._align === "start" ? _this._margin.top + _this._buttonHeight / 2 : _this._height - _this._buttonHeight / 2 - _this._margin.bottom : d.y;
        }
      });
      _this._snapping = true;
      return _this;
    }
    /**
        @memberof Timeline
        @desc Triggered on brush "brush".
        @private
    */


    _createClass(Timeline, [{
      key: "_brushBrush",
      value: function _brushBrush() {
        if (d3Selection.event.sourceEvent && d3Selection.event.sourceEvent.offsetX && d3Selection.event.selection !== null && (!this._brushing || this._snapping)) {
          var domain = this._updateDomain();

          this._brushGroup.call(this._brush.move, this._updateBrushLimit(domain));
        }

        this._brushStyle();

        if (this._on.brush) this._on.brush(this._selection);
      }
      /**
          @memberof Timeline
          @desc Triggered on brush "end".
          @private
      */

    }, {
      key: "_brushEnd",
      value: function _brushEnd() {
        if (!d3Selection.event.sourceEvent) return; // Only transition after input.

        var domain = this._updateDomain();

        this._brushStyle();

        if (this._brushing || !this._snapping) this._brushGroup.transition(this._transition).call(this._brush.move, this._updateBrushLimit(domain));
        if (this._on.end) this._on.end(this._selection);
      }
      /**
          @memberof Timeline
          @desc Triggered on brush "start".
          @private
      */

    }, {
      key: "_brushStart",
      value: function _brushStart() {
        if (d3Selection.event.sourceEvent !== null && (!this._brushing || this._snapping)) {
          var domain = this._updateDomain();

          this._brushGroup.call(this._brush.move, this._updateBrushLimit(domain));
        }

        this._brushStyle();

        if (this._on.start) this._on.start();
      }
      /**
          @memberof Timeline
          @desc Overrides the default brush styles.
          @private
      */

    }, {
      key: "_brushStyle",
      value: function _brushStyle() {
        var height = this._position.height;
        var timelineHeight = this._shape === "Circle" ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({
          tick: true
        }) * 2 : this._shapeConfig.r : this._shape === "Rect" ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({
          tick: true
        }) : this._shapeConfig[height] : this._tickSize;

        var brushOverlay = this._brushGroup.selectAll(".overlay").attr("cursor", this._brushing ? "crosshair" : "pointer");

        var brushSelection = this._brushGroup.selectAll(".selection").call(d3plusCommon.attrize, this._selectionConfig).attr("height", timelineHeight);

        var brushHandle = this._brushGroup.selectAll(".handle").call(d3plusCommon.attrize, this._handleConfig).attr("height", this._buttonBehaviorCurrent === "buttons" ? this._buttonHeight : timelineHeight + this._handleSize);

        if (this._buttonBehaviorCurrent === "buttons") {
          var yTransform = this._align === "middle" ? this._height / 2 - this._buttonHeight / 2 : this._align === "start" ? this._margin.top : this._height - this._buttonHeight - this._margin.bottom;
          brushHandle.attr("y", yTransform);
          brushOverlay.attr("x", this._marginLeft).attr("width", this._ticksWidth);
          brushSelection.attr("y", yTransform);
        }
      }
      /**
          @memberof Timeline
          @desc Updates domain of the timeline used in brush functions.
          @private
      */

    }, {
      key: "_updateDomain",
      value: function _updateDomain() {
        var x = d3Selection.mouse(this._select.node())[0];
        var domain = d3Selection.event.selection && this._brushing ? d3Selection.event.selection : [x, x];
        if (this._buttonBehaviorCurrent === "ticks") domain = domain.map(this._d3Scale.invert);
        domain = domain.map(Number);

        if (d3Selection.event.type === "brush" && this._brushing && this._buttonBehaviorCurrent === "buttons") {
          var diffs = d3Selection.event.selection.map(function (d) {
            return Math.abs(d - d3Selection.event.sourceEvent.offsetX);
          });
          domain = diffs[1] <= diffs[0] ? [d3Selection.event.selection[0], d3Selection.event.sourceEvent.offsetX].sort(function (a, b) {
            return a - b;
          }) : [d3Selection.event.sourceEvent.offsetX, d3Selection.event.selection[1]].sort(function (a, b) {
            return a - b;
          });
        }

        var ticks = this._buttonBehaviorCurrent === "ticks" ? this._availableTicks.map(Number) : this._d3Scale.range();

        if (this._buttonBehaviorCurrent === "ticks") {
          domain[0] = d3plusAxis.date(d3plusCommon.closest(domain[0], ticks));
          domain[1] = d3plusAxis.date(d3plusCommon.closest(domain[1], ticks));
        } else {
          domain[0] = d3plusCommon.closest(domain[0], ticks);
          domain[1] = d3plusCommon.closest(domain[1], ticks);
        }

        var single = +domain[0] === +domain[1];

        if (d3Selection.event.type === "brush" || d3Selection.event.type === "end") {
          this._selection = this._buttonBehaviorCurrent === "ticks" ? single ? domain[0] : domain : single ? d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[0])]) : [d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[0])]), d3plusAxis.date(this._availableTicks[ticks.indexOf(domain[1])])];
        }

        return domain;
      }
      /**
          @memberof Timeline
          @desc Updates limits of the brush.
          @private
      */

    }, {
      key: "_updateBrushLimit",
      value: function _updateBrushLimit(domain) {
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
      }
      /**
          @memberof Timeline
          @desc Draws the timeline.
          @param {Function} [*callback* = undefined]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        var _this$_position = this._position,
            height = _this$_position.height,
            y = _this$_position.y;

        if (this._buttonBehavior !== "ticks") {
          var ticks = this._ticks ? this._ticks.map(d3plusAxis.date) : this._domain.map(d3plusAxis.date);
          var d3Scale$1 = d3Scale.scaleTime().domain(ticks).range([0, this._width]);
          ticks = this._ticks ? ticks : d3Scale$1.ticks();
          if (!this._tickFormat) this._tickFormat = d3Scale$1.tickFormat(ticks.length - 1, this._tickSpecifier); // Measures size of ticks

          var maxLabel = 0;
          ticks.forEach(function (d, i) {
            var f = _this2._shapeConfig.labelConfig.fontFamily(d, i),
                s = _this2._shapeConfig.labelConfig.fontSize(d, i);

            var wrap = d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(_this2._shapeConfig.lineHeight ? _this2._shapeConfig.lineHeight(d, i) : undefined);
            var res = wrap(d3Scale$1.tickFormat(ticks.length - 1, _this2._tickSpecifier)(d));
            var width = res.lines.length ? Math.ceil(d3Array.max(res.lines.map(function (line) {
              return d3plusText.textWidth(line, {
                "font-family": f,
                "font-size": s
              });
            }))) + s / 4 : 0;
            if (width % 2) width++;
            if (maxLabel < width) maxLabel = width + 2 * _this2._buttonPadding;
          });
          this._ticksWidth = maxLabel * ticks.length;
        }

        this._buttonBehaviorCurrent = this._buttonBehavior === "auto" ? this._ticksWidth < this._width ? "buttons" : "ticks" : this._buttonBehavior;

        if (this._buttonBehaviorCurrent === "buttons") {
          this._scale = "ordinal";
          this._labelRotation = 0;
          if (!this._brushing) this._handleSize = 0;
          var domain = d3Scale.scaleTime().domain(this._domain.map(d3plusAxis.date)).ticks().map(this._tickFormat).map(Number);
          this._domain = this._ticks ? this._ticks.map(d3plusAxis.date) : Array.from(Array(domain[domain.length - 1] - domain[0] + 1), function (_, x) {
            return domain[0] + x;
          }).map(d3plusAxis.date);
          this._ticks = this._domain;
          var buttonMargin = 0.5 * this._ticksWidth / this._ticks.length;
          this._marginLeft = this._buttonAlign === "middle" ? (this._width - this._ticksWidth) / 2 : this._buttonAlign === "end" ? this._width - this._ticksWidth : 0;
          var marginRight = this._buttonAlign === "middle" ? (this._width + this._ticksWidth) / 2 : this._buttonAlign === "start" ? this._ticksWidth : undefined;
          this._range = [this._buttonAlign === "start" ? undefined : this._marginLeft + buttonMargin, this._buttonAlign === "end" ? undefined : marginRight - buttonMargin];
        }

        if (this._ticks) this._domain = this._buttonBehaviorCurrent === "ticks" ? [this._ticks[0], this._ticks[this._ticks.length - 1]] : this._ticks.map(d3plusAxis.date);
        this._labels = this._ticks;

        _get(_getPrototypeOf(Timeline.prototype), "render", this).call(this, callback);

        var offset = this._outerBounds[y],
            range = this._d3Scale.range();

        var brush = this._brush = d3Brush.brushX().extent([[range[0], offset], [range[range.length - 1], offset + this._outerBounds[height]]]).filter(this._brushFilter).handleSize(this._handleSize).on("start", this._brushStart.bind(this)).on("brush", this._brushBrush.bind(this)).on("end", this._brushEnd.bind(this));
        var latest = this._buttonBehaviorCurrent === "ticks" ? this._availableTicks[this._availableTicks.length - 1] : range[range.length - 1];
        var selection = this._selection === void 0 ? [latest, latest] : this._selection instanceof Array ? this._buttonBehaviorCurrent === "buttons" ? this._selection.map(function (d) {
          return range[_this2._ticks.map(Number).indexOf(+d)];
        }).slice() : this._selection.slice() : this._buttonBehaviorCurrent === "buttons" ? [range[this._ticks.map(Number).indexOf(+this._selection)], range[this._ticks.map(Number).indexOf(+this._selection)]] : [this._selection, this._selection];

        this._updateBrushLimit(selection);

        this._brushGroup = d3plusCommon.elem("g.brushGroup", {
          parent: this._group
        });

        this._brushGroup.call(brush).transition(this._transition).call(brush.move, this._buttonBehaviorCurrent === "ticks" ? this._updateBrushLimit(selection) : selection);

        this._outerBounds.y -= this._handleSize / 2;
        this._outerBounds.height += this._handleSize / 2;
        return this;
      }
      /**
            @memberof Timeline
            @desc If *value* is specified, sets the button padding and returns the current class instance. If *value* is not specified, returns the current button padding.
            @param {Number} [*value* = 10]
            @chainable
        */

    }, {
      key: "buttonPadding",
      value: function buttonPadding(_) {
        return arguments.length ? (this._buttonPadding = _, this) : this._buttonPadding;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "brushing",
      value: function brushing(_) {
        return arguments.length ? (this._brushing = _, this) : this._brushing;
      }
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

    }, {
      key: "brushFilter",
      value: function brushFilter(_) {
        return arguments.length ? (this._brushFilter = _, this) : this._brushFilter;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, toggles the horizontal alignment of the button timeline. Accepted values are `"start"`, `"middle"` and `"end"`. If *value* is not specified, returns the current button value.
          @param {String} [*value* = "middle"]
          @chainable
      */

    }, {
      key: "buttonAlign",
      value: function buttonAlign(_) {
        return arguments.length ? (this._buttonAlign = _, this) : this._buttonAlign;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, toggles the style of the timeline. Accepted values are `"auto"`, `"buttons"` and `"ticks"`. If *value* is not specified, returns the current button value.
          @param {String} [*value* = "auto"]
          @chainable
      */

    }, {
      key: "buttonBehavior",
      value: function buttonBehavior(_) {
        return arguments.length ? (this._buttonBehavior = _, this) : this._buttonBehavior;
      }
      /**
            @memberof Timeline
            @desc If *value* is specified, sets the button height and returns the current class instance. If *value* is not specified, returns the current button height.
            @param {Number} [*value* = 30]
            @chainable
        */

    }, {
      key: "buttonHeight",
      value: function buttonHeight(_) {
        return arguments.length ? (this._buttonHeight = _, this) : this._buttonHeight;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "handleConfig",
      value: function handleConfig(_) {
        return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
          @param {Number} [*value* = 6]
          @chainable
      */

    }, {
      key: "handleSize",
      value: function handleSize(_) {
        return arguments.length ? (this._handleSize = _, this) : this._handleSize;
      }
      /**
          @memberof Timeline
          @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
          @param {String|Object} [*typename*]
          @param {Function} [*listener*]
          @chainable
      */

    }, {
      key: "on",
      value: function on(_, f) {
        return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "selectionConfig",
      value: function selectionConfig(_) {
        return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
          @param {Array|Date|Number|String} [*value*]
          @chainable
      */

    }, {
      key: "selection",
      value: function selection(_) {
        return arguments.length ? (this._selection = _, this) : this._selection;
      }
      /**
          @memberof Timeline
          @desc If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "snapping",
      value: function snapping(_) {
        return arguments.length ? (this._snapping = _, this) : this._snapping;
      }
    }]);

    return Timeline;
  }(d3plusAxis.Axis);

  exports.Timeline = Timeline;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$1();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else hide(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      hide(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var nativeAssign = Object.assign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)
	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	var nativeStartsWith = ''.startsWith;
	var min$2 = Math.min;

	// `String.prototype.startsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('startsWith') }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = String(requireObjectCoercible(this));
	    notARegexp(searchString);
	    var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	if (typeof window !== "undefined") {
	  (function () {
	    var serializeXML = function (node, output) {
	      var nodeType = node.nodeType;
	      if (nodeType === 3) {
	        output.push(node.textContent.replace(/&/, '&amp;').replace(/</, '&lt;').replace('>', '&gt;'));
	      } else if (nodeType === 1) {
	        output.push('<', node.tagName);
	        if (node.hasAttributes()) {
	          [].forEach.call(node.attributes, function(attrNode){
	            output.push(' ', attrNode.item.name, '=\'', attrNode.item.value, '\'');
	          });
	        }
	        if (node.hasChildNodes()) {
	          output.push('>');
	          [].forEach.call(node.childNodes, function(childNode){
	            serializeXML(childNode, output);
	          });
	          output.push('</', node.tagName, '>');
	        } else {
	          output.push('/>');
	        }
	      } else if (nodeType == 8) {
	        output.push('<!--', node.nodeValue, '-->');
	      }
	    };

	    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
	      get: function () {
	        var output = [];
	        var childNode = this.firstChild;
	        while (childNode) {
	          serializeXML(childNode, output);
	          childNode = childNode.nextSibling;
	        }
	        return output.join('');
	      },
	      set: function (markupText) {
	        while (this.firstChild) {
	          this.removeChild(this.firstChild);
	        }

	        try {
	          var dXML = new DOMParser();
	          dXML.async = false;

	          var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markupText + '</svg>';
	          var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;

	          var childNode = svgDocElement.firstChild;
	          while (childNode) {
	            this.appendChild(this.ownerDocument.importNode(childNode, true));
	            childNode = childNode.nextSibling;
	          }
	        } catch (e) {}      }
	    });

	    Object.defineProperty(SVGElement.prototype, 'innerSVG', {
	      get: function () {
	        return this.innerHTML;
	      },
	      set: function (markup) {
	        this.innerHTML = markup;
	      }
	    });

	  })();
	}

}));
//# sourceMappingURL=d3plus-timeline.js.map
