/*
  d3plus-axis v0.4.9
  Beautiful javascript scales and axes.
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

if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function(search, start) {
      if (typeof start !== 'number') {
        start = 0
      }

      if (start + search.length > this.length) {
        return false
      } else {
        return this.indexOf(search, start) !== -1
      }
    }
  })
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, pos) {
          pos = !pos || pos < 0 ? 0 : +pos;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

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
          })
        }
        if (node.hasChildNodes()) {
          output.push('>');
          [].forEach.call(node.childNodes, function(childNode){
            serializeXML(childNode, output);
          })
          output.push('</', node.tagName, '>');
        } else {
          output.push('/>');
        }
      } else if (nodeType == 8) {
        output.push('<!--', node.nodeValue, '-->');
      }
    }

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
        } catch (e) {};
      }
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

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-time'), require('d3-time-format'), require('d3-scale'), require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3plus-format'), require('d3plus-shape'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-axis', ['exports', 'd3-array', 'd3-time', 'd3-time-format', 'd3-scale', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3plus-format', 'd3plus-shape', 'd3plus-text'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Time,global.d3TimeFormat,global.scales,global.d3Selection,global.d3Transition,global.d3plusCommon,global.d3plusFormat,global.shapes,global.d3plusText));
}(this, (function (exports,d3Array,d3Time,d3TimeFormat,scales,d3Selection,d3Transition,d3plusCommon,d3plusFormat,shapes,d3plusText) { 'use strict';

  /**
      @function date
      @summary Parses numbers and strings to valid Javascript Date objects.
      @description Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.
      @param {Number|String} *date*
  */
  function date(d) {

    // returns if already Date object
    if (d.constructor === Date) { return d; }
    // detects if milliseconds
    else if (d.constructor === Number && ("" + d).length > 5 && d % 1 === 0) { return new Date(d); }

    var s = "" + d;
    var dayFormat = new RegExp(/^\d{1,2}[./-]\d{1,2}[./-](-*\d{1,4})$/g).exec(s),
          strFormat = new RegExp(/^[A-z]{1,3} [A-z]{1,3} \d{1,2} (-*\d{1,4}) \d{1,2}:\d{1,2}:\d{1,2} [A-z]{1,3}-*\d{1,4} \([A-z]{1,3}\)/g).exec(s);

    // tests for XX/XX/XXXX format
    if (dayFormat) {
      var year = dayFormat[1];
      if (year.indexOf("-") === 0) { s = s.replace(year, year.substr(1)); }
      var date = new Date(s);
      date.setFullYear(year);
      return date;
    }
    // tests for full Date object string format
    else if (strFormat) {
      var year$1 = strFormat[1];
      if (year$1.indexOf("-") === 0) { s = s.replace(year$1, year$1.substr(1)); }
      var date$1 = new Date(s);
      date$1.setFullYear(year$1);
      return date$1;
    }
    // detects if only passing a year value
    else if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
      var date$2 = new Date((s + "/01/01"));
      date$2.setFullYear(d);
      return date$2;
    }
    // parses string to Date object
    else { return new Date(s); }

  }

  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  var formatDay = d3TimeFormat.timeFormat("%a %d"),
        formatHour = d3TimeFormat.timeFormat("%I %p"),
        formatMillisecond = d3TimeFormat.timeFormat(".%L"),
        formatMinute = d3TimeFormat.timeFormat("%I:%M"),
        formatMonth = d3TimeFormat.timeFormat("%b"),
        formatSecond = d3TimeFormat.timeFormat(":%S"),
        formatWeek = d3TimeFormat.timeFormat("%b %d"),
        formatYear = d3TimeFormat.timeFormat("%Y");

  /**
      @class Axis
      @extends external:BaseClass
      @desc Creates an SVG scale based on an array of data.
  */
  var Axis = /*@__PURE__*/(function (BaseClass) {
    function Axis() {
      var this$1 = this;


      BaseClass.call(this);

      this._align = "middle";
      this._barConfig = {
        "stroke": "#000",
        "stroke-width": 1
      };
      this._domain = [0, 10];
      this._duration = 600;
      this._gridConfig = {
        "stroke": "#ccc",
        "stroke-width": 1
      };
      this._gridLog = false;
      this._height = 400;
      this._labelOffset = true;
      this.orient("bottom");
      this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
      this._padding = 5;
      this._paddingInner = 0.1;
      this._paddingOuter = 0.1;
      this._rotateLabels = false;
      this._scale = "linear";
      this._shape = "Line";
      this._shapeConfig = {
        fill: "#000",
        height: function (d) { return d.tick ? 8 : 0; },
        label: function (d) { return d.text; },
        labelBounds: function (d) { return d.labelBounds; },
        labelConfig: {
          fontColor: "#000",
          fontFamily: new d3plusText.TextBox().fontFamily(),
          fontResize: false,
          fontSize: d3plusCommon.constant(10),
          padding: 0,
          textAnchor: function () {
            var rtl = d3plusText.rtl();
            return this$1._orient === "left" ? rtl ? "start" : "end"
              : this$1._orient === "right" ? rtl ? "end" : "start"
              : this$1._rotateLabels ? this$1._orient === "bottom" ? "end" : "start" : "middle";
          },
          verticalAlign: function () { return this$1._orient === "bottom" ? "top" : this$1._orient === "top" ? "bottom" : "middle"; }
        },
        r: function (d) { return d.tick ? 4 : 0; },
        stroke: "#000",
        strokeWidth: 1,
        width: function (d) { return d.tick ? 8 : 0; }
      };
      this._tickSize = 5;
      this._tickSpecifier = undefined;
      this._tickSuffix = "normal";
      this._tickUnit = 0;
      this._titleClass = new d3plusText.TextBox();
      this._titleConfig = {
        fontSize: 12,
        textAnchor: "middle"
      };
      this._width = 400;

    }

    if ( BaseClass ) Axis.__proto__ = BaseClass;
    Axis.prototype = Object.create( BaseClass && BaseClass.prototype );
    Axis.prototype.constructor = Axis;

    /**
        @memberof Axis
        @desc Sets positioning for the axis bar.
        @param {D3Selection} *bar*
        @private
    */
    Axis.prototype._barPosition = function _barPosition (bar) {

      var ref = this._position;
      var height = ref.height;
      var x = ref.x;
      var y = ref.y;
      var opposite = ref.opposite;
      var domain = this._getDomain(),
            offset = this._margin[opposite],
            position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

      bar
        .call(d3plusCommon.attrize, this._barConfig)
        .attr((x + "1"), this._getPosition(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0))
        .attr((x + "2"), this._getPosition(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0))
        .attr((y + "1"), position)
        .attr((y + "2"), position);

    };

    /**
        @memberof Axis
        @desc Returns the scale's domain, taking into account negative and positive log scales.
        @private
    */
    Axis.prototype._getDomain = function _getDomain () {

      var ticks = [];
      if (this._d3ScaleNegative) { ticks = this._d3ScaleNegative.domain(); }
      if (this._d3Scale) { ticks = ticks.concat(this._d3Scale.domain()); }

      var domain = this._scale === "ordinal" ? ticks : d3Array.extent(ticks);
      return ticks[0] > ticks[1] ? domain.reverse() : domain;

    };

    /**
        @memberof Axis
        @desc Returns a value's scale position, taking into account negative and positive log scales.
        @param {Number|String} *d*
        @private
    */
    Axis.prototype._getPosition = function _getPosition (d) {
      return d < 0 && this._d3ScaleNegative ? this._d3ScaleNegative(d) : this._d3Scale(d);
    };

    /**
        @memberof Axis
        @desc Returns the scale's range, taking into account negative and positive log scales.
        @private
    */
    Axis.prototype._getRange = function _getRange () {

      var ticks = [];
      if (this._d3ScaleNegative) { ticks = this._d3ScaleNegative.range(); }
      if (this._d3Scale) { ticks = ticks.concat(this._d3Scale.range()); }
      return ticks[0] > ticks[1] ? d3Array.extent(ticks).reverse() : d3Array.extent(ticks);

    };

    /**
        @memberof Axis
        @desc Returns the scale's ticks, taking into account negative and positive log scales.
        @private
    */
    Axis.prototype._getTicks = function _getTicks () {
      var tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);

      var ticks = [];
      if (this._d3ScaleNegative) {
        var negativeRange = this._d3ScaleNegative.range();
        var size = negativeRange[1] - negativeRange[0];
        ticks = this._d3ScaleNegative.ticks(Math.floor(size / tickScale(size)));
      }
      if (this._d3Scale) {
        var positiveRange = this._d3Scale.range();
        var size$1 = positiveRange[1] - positiveRange[0];
        ticks = ticks.concat(this._d3Scale.ticks(Math.floor(size$1 / tickScale(size$1))));
      }

      return ticks;
    };

    /**
        @memberof Axis
        @desc Sets positioning for the grid lines.
        @param {D3Selection} *lines*
        @private
    */
    Axis.prototype._gridPosition = function _gridPosition (lines, last) {
      if ( last === void 0 ) last = false;

      var ref = this._position;
      var height = ref.height;
      var x = ref.x;
      var y = ref.y;
      var opposite = ref.opposite;
      var offset = this._margin[opposite],
            position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
            scale = last ? this._lastScale || this._getPosition.bind(this) : this._getPosition.bind(this),
            size = ["top", "left"].includes(this._orient) ? offset : -offset,
            xDiff = this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0,
            xPos = function (d) { return scale(d.id) + xDiff; };
      lines
        .call(d3plusCommon.attrize, this._gridConfig)
        .attr((x + "1"), xPos)
        .attr((x + "2"), xPos)
        .attr((y + "1"), position)
        .attr((y + "2"), last ? position : position + size);
    };

    /**
        @memberof Axis
        @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
        @param {Function} [*callback* = undefined]
        @chainable
    */
    Axis.prototype.render = function render (callback) {
      var this$1 = this;
      var obj;


      /**
       * Creates an SVG element to contain the axis if none
       * has been specified using the "select" method.
       */
      if (this._select === void 0) {
        this.select(d3Selection.select("body").append("svg")
          .attr("width", ((this._width) + "px"))
          .attr("height", ((this._height) + "px"))
          .node());
      }

      /**
       * Declares some commonly used variables.
       */
      var ref = this._position;
      var width = ref.width;
      var height = ref.height;
      var x = ref.x;
      var y = ref.y;
      var horizontal = ref.horizontal;
      var opposite = ref.opposite;
      var clipId = "d3plus-Axis-clip-" + (this._uuid),
            flip = ["top", "left"].includes(this._orient),
            p = this._padding,
            parent = this._select,
            rangeOuter = [p, this[("_" + width)] - p],
            t = d3Transition.transition().duration(this._duration);

      var tickValue = this._shape === "Circle" ? this._shapeConfig.r
        : this._shape === "Rect" ? this._shapeConfig[width]
        : this._shapeConfig.strokeWidth;
      var tickGet = typeof tickValue !== "function" ? function () { return tickValue; } : tickValue;

      /**
       * Zeros out the margins for re-calculation.
       */
      var margin = this._margin = {top: 0, right: 0, bottom: 0, left: 0};

      var labels, range, ticks;

      /**
       * (Re)calculates the internal d3 scale
       * @param {} newRange
       */
      function setScale(newRange) {
        var this$1 = this;
        if ( newRange === void 0 ) newRange = this._range;


        /**
         * Calculates the internal "range" array to use, including
         * fallbacks if not specified with the "range" method.
         */
        range = newRange ? newRange.slice() : [undefined, undefined];
        var minRange = rangeOuter[0];
        var maxRange = rangeOuter[1];
        if (this._range) {
          if (this._range[0] !== undefined) { minRange = this._range[0]; }
          if (this._range[this._range.length - 1] !== undefined) { maxRange = this._range[this._range.length - 1]; }
        }
        if (range[0] === undefined || range[0] < minRange) { range[0] = minRange; }
        if (range[1] === undefined || range[1] > maxRange) { range[1] = maxRange; }
        var sizeInner = maxRange - minRange;
        if (this._scale === "ordinal" && this._domain.length > range.length) {
          if (newRange === this._range) {
            var buckets = this._domain.length + 1;
            range = d3Array.range(buckets)
              .map(function (d) { return range[0] + sizeInner * (d / (buckets - 1)); })
              .slice(1, buckets);
            range = range.map(function (d) { return d - range[0] / 2; });
          }
          else {
            var buckets$1 = this._domain.length;
            var size = range[1] - range[0];
            range = d3Array.range(buckets$1)
              .map(function (d) { return range[0] + size * (d / (buckets$1 - 1)); });
          }
        }
        else if (newRange === this._range) {
          var tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
          var domain = this._scale === "time" ? this._domain.map(date) : this._domain;
          var scaleTicks = d3Array.ticks(domain[0], domain[1], Math.floor(sizeInner / tickScale(sizeInner)));
          ticks = (this._ticks
            ? this._scale === "time" ? this._ticks.map(date) : this._ticks
            : scaleTicks).slice();

          labels = (this._labels
            ? this._scale === "time" ? this._labels.map(date) : this._labels
            : scaleTicks).slice();
          var buckets$2 = labels.length;

          if (buckets$2) {
            var pad = Math.ceil(sizeInner / buckets$2 / 2);
            range = [range[0] + pad, range[1] - pad];
          }

        }

        /**
         * Sets up the initial d3 scale, using this._domain and the
         * previously defined range variable.
         */
        this._d3Scale = scales[("scale" + (this._scale.charAt(0).toUpperCase()) + (this._scale.slice(1)))]()
          .domain(this._scale === "time" ? this._domain.map(date) : this._domain);
        if (this._d3Scale.round) { this._d3Scale.round(true); }
        if (this._d3Scale.paddingInner) { this._d3Scale.paddingInner(this._paddingInner); }
        if (this._d3Scale.paddingOuter) { this._d3Scale.paddingOuter(this._paddingOuter); }

        if (this._d3Scale.rangeRound) { this._d3Scale.rangeRound(range); }
        else { this._d3Scale.range(range); }

        /**
         * Constructs a separate "negative only" scale for logarithmic
         * domains, as they cannot pass zero.
         */
        this._d3ScaleNegative = null;
        if (this._scale === "log") {
          var domain$1 = this._d3Scale.domain();
          if (domain$1[0] === 0) { domain$1[0] = 1; }
          if (domain$1[domain$1.length - 1] === 0) { domain$1[domain$1.length - 1] = -1; }
          var range$1 = this._d3Scale.range();
          if (domain$1[0] < 0 && domain$1[domain$1.length - 1] < 0) {
            this._d3ScaleNegative = this._d3Scale.copy()
              .domain(domain$1)
              .range(range$1);
            this._d3Scale = null;
          }
          else if (domain$1[0] > 0 && domain$1[domain$1.length - 1] > 0) {
            this._d3Scale
              .domain(domain$1)
              .range(range$1);
          }
          else {
            var percentScale = scales.scaleLog().domain([1, domain$1[domain$1[1] > 0 ? 1 : 0]]).range([0, 1]);
            var leftPercentage = percentScale(Math.abs(domain$1[domain$1[1] < 0 ? 1 : 0]));
            var zero = leftPercentage / (leftPercentage + 1) * (range$1[1] - range$1[0]);
            if (domain$1[0] > 0) { zero = range$1[1] - range$1[0] - zero; }
            this._d3ScaleNegative = this._d3Scale.copy();
            (domain$1[0] < 0 ? this._d3Scale : this._d3ScaleNegative)
              .domain([Math.sign(domain$1[1]), domain$1[1]])
              .range([range$1[0] + zero, range$1[1]]);
            (domain$1[0] < 0 ? this._d3ScaleNegative : this._d3Scale)
              .domain([domain$1[0], Math.sign(domain$1[0])])
              .range([range$1[0], range$1[0] + zero]);
          }
        }

        /**
         * Determines the of values array to use
         * for the "ticks" and the "labels"
         */
        ticks = (this._ticks
          ? this._scale === "time" ? this._ticks.map(date) : this._ticks
          : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
            ? this._getTicks() : this._domain).slice();

        labels = (this._labels
          ? this._scale === "time" ? this._labels.map(date) : this._labels
          : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks)
            ? this._getTicks() : ticks).slice();

        if (this._scale === "log") {
          labels = labels.filter(function (t) { return Math.abs(t).toString().charAt(0) === "1" &&
            (this$1._d3Scale ? t !== -1 : t !== 1); }
          );
        }
        else if (this._scale === "time") {
          ticks = ticks.map(Number);
          labels = labels.map(Number);
        }

        ticks = ticks.sort(function (a, b) { return this$1._getPosition(a) - this$1._getPosition(b); });
        labels = labels.sort(function (a, b) { return this$1._getPosition(a) - this$1._getPosition(b); });

        /**
         * Get the smallest suffix.
         */
        if (this._scale === "linear" && this._tickSuffix === "smallest") {
          var suffixes = labels.filter(function (d) { return d >= 1000; });
          if (suffixes.length > 0) {
            var min = Math.min.apply(Math, suffixes);
            var i = 1;
            while (i && i < 7) {
              var n = Math.pow(10, 3 * i);
              if (min / n >= 1) {
                this._tickUnit = i;
                i += 1;
              }
              else {
                break;
              }
            }
          }
        }

        /**
         * Removes ticks when they overlap other ticks.
         */
        var pixels = [];
        this._availableTicks = ticks;
        ticks.forEach(function (d, i) {
          var s = tickGet({id: d, tick: true}, i);
          if (this$1._shape === "Circle") { s *= 2; }
          var t = this$1._getPosition(d);
          if (!pixels.length || Math.abs(d3plusCommon.closest(t, pixels) - t) > s * 2) { pixels.push(t); }
          else { pixels.push(false); }
        });
        ticks = ticks.filter(function (d, i) { return pixels[i] !== false; });
        this._visibleTicks = ticks;

      }
      setScale.bind(this)();

      /**
       * Calculates the space available for a given label.
       * @param {Object} datum
       */
      function calculateSpace(datum, diff) {
        if ( diff === void 0 ) diff = 1;

        var i = datum.i;
        var position = datum.position;
        if (this._scale === "band") {
          return this._d3Scale.bandwidth();
        }
        else {
          var prevPosition = i - diff < 0 ? rangeOuter[0] : position - (position - textData[i - diff].position) / 2;
          var prevSpace = Math.abs(position - prevPosition);
          var nextPosition = i + diff > textData.length - 1 ? rangeOuter[1] : position - (position - textData[i + diff].position) / 2;
          var nextSpace = Math.abs(position - nextPosition);
          return d3Array.min([prevSpace, nextSpace]) * 2;
        }
      }

      /**
       * Constructs the tick formatter function.
       */
      var tickFormat = this._tickFormat ? this._tickFormat : function (d) {
        if (this$1._scale === "log") {
          var p = Math.round(Math.log(Math.abs(d)) / Math.LN10);
          var t = Math.abs(d).toString().charAt(0);
          var n$1 = "10 " + (("" + p).split("").map(function (c) { return "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]; }).join(""));
          if (t !== "1") { n$1 = t + " x " + n$1; }
          return d < 0 ? ("-" + n$1) : n$1;
        }
        else if (this$1._scale === "time") {
          return (d3Time.timeSecond(d) < d ? formatMillisecond
            : d3Time.timeMinute(d) < d ? formatSecond
            : d3Time.timeHour(d) < d ? formatMinute
            : d3Time.timeDay(d) < d ? formatHour
            : d3Time.timeMonth(d) < d ? d3Time.timeWeek(d) < d ? formatDay : formatWeek
            : d3Time.timeYear(d) < d ? formatMonth
            : formatYear)(d);
        }
        else if (this$1._scale === "ordinal") {
          return d;
        }

        var n = this$1._d3Scale.tickFormat ? this$1._d3Scale.tickFormat(labels.length - 1)(d) : d;
        n = n.replace(/[^\d\.\-\+]/g, "") * 1;

        if (isNaN(n)) {
          return n;
        }
        else if (this$1._scale === "linear" && this$1._tickSuffix === "smallest") {
          var locale = typeof this$1._locale === "object" ? this$1._locale : d3plusFormat.formatLocale[this$1._locale];
          var separator = locale.separator;
          var suffixes = locale.suffixes;
          var suff = n >= 1000 ? suffixes[this$1._tickUnit + 8] : "";
          var tick = n / Math.pow(10, 3 * this$1._tickUnit);
          var number = d3plusFormat.formatAbbreviate(tick, locale, (",." + (tick.toString().length) + "r"));
          return ("" + number + separator + suff);
        }
        else {
          return d3plusFormat.formatAbbreviate(n, this$1._locale);
        }
      };

      /**
       * Pre-calculates the size of the title, if defined, in order
       * to adjust the internal margins.
       */
      if (this._title) {
        var ref$1 = this._titleConfig;
        var fontFamily = ref$1.fontFamily;
        var fontSize = ref$1.fontSize;
        var lineHeight = ref$1.lineHeight;
        var titleWrap = d3plusText.textWrap()
          .fontFamily(typeof fontFamily === "function" ? fontFamily() : fontFamily)
          .fontSize(typeof fontSize === "function" ? fontSize() : fontSize)
          .lineHeight(typeof lineHeight === "function" ? lineHeight() : lineHeight)
          .width(range[range.length - 1] - range[0] - p * 2)
          .height(this[("_" + height)] - this._tickSize - p * 2);
        var lines = titleWrap(this._title).lines.length;
        margin[this._orient] = lines * titleWrap.lineHeight() + p;
      }

      var hBuff = this._shape === "Circle"
            ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) : this._shapeConfig.r
            : this._shape === "Rect"
              ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
              : this._tickSize,
          wBuff = tickGet({tick: true});

      if (typeof hBuff === "function") { hBuff = d3Array.max(ticks.map(hBuff)); }
      if (this._shape === "Rect") { hBuff /= 2; }
      if (typeof wBuff === "function") { wBuff = d3Array.max(ticks.map(wBuff)); }
      if (this._shape !== "Circle") { wBuff /= 2; }

      /**
       * Calculates the space each label would take up, given
       * the provided this._space size.
       */
      var textData = labels
        .map(function (d, i) {

          var fF = this$1._shapeConfig.labelConfig.fontFamily(d, i),
                fS = this$1._shapeConfig.labelConfig.fontSize(d, i),
                position = this$1._getPosition(d);

          var lineHeight = this$1._shapeConfig.lineHeight ? this$1._shapeConfig.lineHeight(d, i) : fS * 1.4;
          return {d: d, i: i, fF: fF, fS: fS, lineHeight: lineHeight, position: position};

        });

      /**
       * Calculates the text wrapping and size of a given textData object.
       * @param {Object} datum
       */
      function calculateLabelSize(datum) {
        var d = datum.d;
        var i = datum.i;
        var fF = datum.fF;
        var fS = datum.fS;
        var rotate = datum.rotate;
        var space = datum.space;

        var h = rotate ? "width" : "height",
              w = rotate ? "height" : "width";

        var wrap = d3plusText.textWrap()
          .fontFamily(fF)
          .fontSize(fS)
          .lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined)
          [w](horizontal ? space : d3Array.min([this._maxSize, this._width]) - hBuff - p - this._margin.left - this._margin.right)
          [h](horizontal ? d3Array.min([this._maxSize, this._height]) - hBuff - p - this._margin.top - this._margin.bottom : space);

        var res = wrap(tickFormat(d));
        res.lines = res.lines.filter(function (d) { return d !== ""; });

        res.width = res.lines.length ? Math.ceil(d3Array.max(res.widths)) + fS / 4 : 0;
        if (res.width % 2) { res.width++; }

        res.height = res.lines.length ? Math.ceil(res.lines.length * wrap.lineHeight()) + fS / 4 : 0;
        if (res.height % 2) { res.height++; }

        return res;

      }

      textData = textData
        .map(function (datum) {
          datum.rotate = this$1._labelRotation;
          datum.space = calculateSpace.bind(this$1)(datum);
          var res = calculateLabelSize.bind(this$1)(datum);
          return Object.assign(res, datum);
        });

      this._rotateLabels = horizontal && this._labelRotation === undefined
        ? textData.some(function (d) { return d.truncated; }) : this._labelRotation;

      if (this._rotateLabels) {
        textData = textData
          .map(function (datum) {
            datum.rotate = true;
            var res = calculateLabelSize.bind(this$1)(datum);
            return Object.assign(datum, res);
          });
      }

      /**
       * "spillover" will contain the pixel spillover of the first and last label,
       * and then adjust the scale range accordingly.
       */
      var spillover = [0, 0];
      for (var index = 0; index < 2; index++) {
        var datum = textData[index ? textData.length - 1 : 0];
        if (!datum) { break; }
        var height$1 = datum.height;
        var position = datum.position;
        var rotate = datum.rotate;
        var width$1 = datum.width;
        var compPosition = index ? rangeOuter[1] : rangeOuter[0];
        var halfSpace = (rotate || !horizontal ? height$1 : width$1) / 2;
        var spill = index ? position + halfSpace - compPosition : position - halfSpace - compPosition;
        spillover[index] = spill;
      }

      var first = range[0];
      var last = range[range.length - 1];
      var newRange = [first - spillover[0], last - spillover[1]];
      if (this._range) {
        if (this._range[0] !== undefined) { newRange[0] = this._range[0]; }
        if (this._range[this._range.length - 1] !== undefined) { newRange[1] = this._range[this._range.length - 1]; }
      }

      if (newRange[0] !== first || newRange[1] !== last) {
        setScale.bind(this)(newRange);

        textData = labels
          .map(function (d, i) {

            var fF = this$1._shapeConfig.labelConfig.fontFamily(d, i),
                  fS = this$1._shapeConfig.labelConfig.fontSize(d, i),
                  position = this$1._getPosition(d);

            var lineHeight = this$1._shapeConfig.lineHeight ? this$1._shapeConfig.lineHeight(d, i) : fS * 1.4;
            return {d: d, i: i, fF: fF, fS: fS, lineHeight: lineHeight, position: position};

          });

        textData = textData
          .map(function (datum) {
            datum.rotate = this$1._rotateLabels;
            datum.space = calculateSpace.bind(this$1)(datum);
            var res = calculateLabelSize.bind(this$1)(datum);
            return Object.assign(res, datum);
          });
      }

      var labelHeight = d3Array.max(textData, function (t) { return t.height; }) || 0;
      this._rotateLabels = horizontal && this._labelRotation === undefined
        ? textData.some(function (datum) {
          var i = datum.i;
          var height = datum.height;
          var position = datum.position;
          var truncated = datum.truncated;
          var prev = textData[i - 1];
          return truncated || i && prev.position + prev.height / 2 > position - height / 2;
        }) : this._labelRotation;

      if (this._rotateLabels) {

        var offset = 0;
        textData = textData
          .map(function (datum) {

            datum.space = calculateSpace.bind(this$1)(datum, 2);
            var res = calculateLabelSize.bind(this$1)(datum);
            datum = Object.assign(datum, res);

            var prev = textData[datum.i - 1];
            if (!prev) {
              offset = 1;
            }
            else if (prev.position + prev.height / 2 > datum.position) {
              if (offset) {
                datum.offset = prev.width;
                offset = 0;
              }
              else { offset = 1; }
            }

            return datum;

          });

      }

      var globalOffset = this._labelOffset ? d3Array.max(textData, function (d) { return d.offset || 0; }) : 0;
      textData.forEach(function (datum) { return datum.offset = datum.offset ? globalOffset : 0; });

      var tBuff = this._shape === "Line" ? 0 : hBuff;
      var bounds = this._outerBounds = ( obj = {}, obj[height] = (d3Array.max(textData, function (t) { return Math.ceil(t[t.rotate || !horizontal ? "width" : "height"] + t.offset); }) || 0) + (textData.length ? p : 0), obj[width] = rangeOuter[rangeOuter.length - 1] - rangeOuter[0], obj[x] = rangeOuter[0], obj );

      margin[this._orient] += hBuff;
      margin[opposite] = this._gridSize !== undefined ? d3Array.max([this._gridSize, tBuff]) : this[("_" + height)] - margin[this._orient] - bounds[height] - p;
      bounds[height] += margin[opposite] + margin[this._orient];
      bounds[y] = this._align === "start" ? this._padding
        : this._align === "end" ? this[("_" + height)] - bounds[height] - this._padding
        : this[("_" + height)] / 2 - bounds[height] / 2;

      var group = d3plusCommon.elem(("g#d3plus-Axis-" + (this._uuid)), {parent: parent});
      this._group = group;

      var grid = d3plusCommon.elem("g.grid", {parent: group}).selectAll("line")
        .data((this._gridSize !== 0 ? this._grid || this._scale === "log" && !this._gridLog ? labels : ticks : []).map(function (d) { return ({id: d}); }), function (d) { return d.id; });

      grid.exit().transition(t)
        .attr("opacity", 0)
        .call(this._gridPosition.bind(this))
        .remove();

      grid.enter().append("line")
          .attr("opacity", 0)
          .attr("clip-path", ("url(#" + clipId + ")"))
          .call(this._gridPosition.bind(this), true)
        .merge(grid).transition(t)
          .attr("opacity", 1)
          .call(this._gridPosition.bind(this));

      var labelOnly = labels.filter(function (d, i) { return textData[i].lines.length && !ticks.includes(d); });

      var rotated = textData.some(function (d) { return d.rotate; });
      var tickData = ticks.concat(labelOnly)
        .map(function (d) {

          var data = textData.find(function (td) { return td.d === d; });
          var xPos = this$1._getPosition(d);
          var space = data ? data.space : 0;
          var lines = data ? data.lines.length : 1;
          var lineHeight = data ? data.lineHeight : 1;

          var labelOffset = data && this$1._labelOffset ? data.offset : 0;

          var labelWidth = horizontal ? space : bounds.width - margin[this$1._position.opposite] - hBuff - margin[this$1._orient] + p;

          var offset = margin[opposite],
                size = (hBuff + labelOffset) * (flip ? -1 : 1),
                yPos = flip ? bounds[y] + bounds[height] - offset : bounds[y] + offset;

          var tickConfig = {
            id: d,
            labelBounds: rotated && data
              ? {
                x: -data.width / 2 + data.fS / 4,
                y: this$1._orient === "bottom" ? size + p + (data.width - lineHeight * lines) / 2 : size - p * 2 - (data.width + lineHeight * lines) / 2,
                width: data.width,
                height: data.height
              } : {
                x: horizontal ? -space / 2 : this$1._orient === "left" ? -labelWidth - p + size : size + p,
                y: horizontal ? this$1._orient === "bottom" ? size + p : size - p - labelHeight : -space / 2,
                width: horizontal ? space : labelWidth,
                height: horizontal ? labelHeight : space
              },
            rotate: data ? data.rotate : false,
            size: labels.includes(d) ? size : 0,
            text: labels.includes(d) ? tickFormat(d) : false,
            tick: ticks.includes(d)
          };
          tickConfig[x] = xPos + (this$1._scale === "band" ? this$1._d3Scale.bandwidth() / 2 : 0);
          tickConfig[y] = yPos;

          return tickConfig;

        });

      if (this._shape === "Line") {
        tickData = tickData.concat(tickData.map(function (d) {
          var dupe = Object.assign({}, d);
          dupe[y] += d.size;
          return dupe;
        }));
      }

      new shapes[this._shape]()
        .data(tickData)
        .duration(this._duration)
        .labelConfig({
          ellipsis: function (d) { return d && d.length ? (d + "...") : ""; },
          rotate: function (d) { return d.rotate ? -90 : 0; }
        })
        .select(d3plusCommon.elem("g.ticks", {parent: group}).node())
        .config(this._shapeConfig)
        .render();

      var bar = group.selectAll("line.bar").data([null]);

      bar.enter().append("line")
          .attr("class", "bar")
          .attr("opacity", 0)
          .call(this._barPosition.bind(this))
        .merge(bar).transition(t)
          .attr("opacity", 1)
          .call(this._barPosition.bind(this));

      this._titleClass
        .data(this._title ? [{text: this._title}] : [])
        .duration(this._duration)
        .height(margin[this._orient])
        .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
        .select(d3plusCommon.elem("g.d3plus-Axis-title", {parent: group}).node())
        .text(function (d) { return d.text; })
        .verticalAlign("middle")
        .width(range[range.length - 1] - range[0])
        .x(horizontal ? range[0] : this._orient === "left" ? margin[this._orient] / 2 - (range[range.length - 1] - range[0]) / 2 + p : p - margin.right / 2)
        .y(horizontal ? this._orient === "bottom" ? bounds.height - margin.bottom + p : bounds.y : range[0] + (range[range.length - 1] - range[0]) / 2 - margin[this._orient] / 2)
        .config(this._titleConfig)
        .render();

      this._lastScale = this._getPosition.bind(this);

      if (callback) { setTimeout(callback, this._duration + 100); }

      return this;

    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance.
        @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
        @chainable
    */
    Axis.prototype.align = function align (_) {
      return arguments.length ? (this._align = _, this) : this._align;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the axis line style and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Axis.prototype.barConfig = function barConfig (_) {
      return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance.
        @param {Array} [*value* = [0, 10]]
        @chainable
    */
    Axis.prototype.domain = function domain (_) {
      return arguments.length ? (this._domain = _, this) : this._domain;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance.
        @param {Number} [*value* = 600]
        @chainable
    */
    Axis.prototype.duration = function duration (_) {
      return arguments.length ? (this._duration = _, this) : this._duration;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the grid values of the axis and returns the current class instance.
        @param {Array} [*value*]
        @chainable
    */
    Axis.prototype.grid = function grid (_) {
      return arguments.length ? (this._grid = _, this) : this._grid;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the grid config of the axis and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Axis.prototype.gridConfig = function gridConfig (_) {
      return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the grid behavior of the axis when scale is logarithmic and returns the current class instance.
        @param {Boolean} [*value* = false]
        @chainable
    */
    Axis.prototype.gridLog = function gridLog (_) {
      return arguments.length ? (this._gridLog = _, this) : this._gridLog;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the grid size of the axis and returns the current class instance.
        @param {Number} [*value* = undefined]
        @chainable
    */
    Axis.prototype.gridSize = function gridSize (_) {
      return arguments.length ? (this._gridSize = _, this) : this._gridSize;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the overall height of the axis and returns the current class instance.
        @param {Number} [*value* = 100]
        @chainable
    */
    Axis.prototype.height = function height (_) {
      return arguments.length ? (this._height = _, this) : this._height;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance.
        @param {Array} [*value*]
        @chainable
    */
    Axis.prototype.labels = function labels (_) {
      return arguments.length ? (this._labels = _, this) : this._labels;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets whether offsets will be used to position some labels further away from the axis in order to allow space for the text.
        @param {Boolean} [*value* = true]
        @chainable
     */
    Axis.prototype.labelOffset = function labelOffset (_) {
      return arguments.length ? (this._labelOffset = _, this) : this._labelOffset;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets whether whether horizontal axis labels are rotated -90 degrees.
        @param {Boolean}
        @chainable
     */
    Axis.prototype.labelRotation = function labelRotation (_) {
      return arguments.length ? (this._labelRotation = _, this) : this._labelRotation;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the maximum size allowed for the space that contains the axis tick labels and title.
        @param {Number}
        @chainable
     */
    Axis.prototype.maxSize = function maxSize (_) {
      return arguments.length ? (this._maxSize = _, this) : this._maxSize;
    };

    /**
        @memberof Axis
        @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
        @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
        @chainable
    */
    Axis.prototype.orient = function orient (_) {
      if (arguments.length) {

        var horizontal = ["top", "bottom"].includes(_),
              opps = {top: "bottom", right: "left", bottom: "top", left: "right"};

        this._position = {
          horizontal: horizontal,
          width: horizontal ? "width" : "height",
          height: horizontal ? "height" : "width",
          x: horizontal ? "x" : "y",
          y: horizontal ? "y" : "x",
          opposite: opps[_]
        };

        return this._orient = _, this;

      }
      return this._orient;
    };

    /**
        @memberof Axis
        @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.
        @example
  {"width": 180, "height": 24, "x": 10, "y": 20}
    */
    Axis.prototype.outerBounds = function outerBounds () {
      return this._outerBounds;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance.
        @param {Number} [*value* = 10]
        @chainable
    */
    Axis.prototype.padding = function padding (_) {
      return arguments.length ? (this._padding = _, this) : this._padding;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance.
        @param {Number} [*value* = 0.1]
        @chainable
    */
    Axis.prototype.paddingInner = function paddingInner (_) {
      return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance.
        @param {Number} [*value* = 0.1]
        @chainable
    */
    Axis.prototype.paddingOuter = function paddingOuter (_) {
      return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value.
        @param {Array} [*value*]
        @chainable
    */
    Axis.prototype.range = function range (_) {
      return arguments.length ? (this._range = _, this) : this._range;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the scale of the axis and returns the current class instance.
        @param {String} [*value* = "linear"]
        @chainable
    */
    Axis.prototype.scale = function scale (_) {
      return arguments.length ? (this._scale = _, this) : this._scale;
    };

    /**
        @memberof Axis
        @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
        @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
        @chainable
    */
    Axis.prototype.select = function select$1 (_) {
      return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the tick shape constructor and returns the current class instance.
        @param {String} [*value* = "Line"]
        @chainable
    */
    Axis.prototype.shape = function shape (_) {
      return arguments.length ? (this._shape = _, this) : this._shape;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the tick style of the axis and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Axis.prototype.shapeConfig = function shapeConfig (_) {
      return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the tick formatter and returns the current class instance.
        @param {Function} [*value*]
        @chainable
    */
    Axis.prototype.tickFormat = function tickFormat (_) {
      return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the tick values of the axis and returns the current class instance.
        @param {Array} [*value*]
        @chainable
    */
    Axis.prototype.ticks = function ticks (_) {
      return arguments.length ? (this._ticks = _, this) : this._ticks;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the tick size of the axis and returns the current class instance.
        @param {Number} [*value* = 5]
        @chainable
    */
    Axis.prototype.tickSize = function tickSize (_) {
      return arguments.length ? (this._tickSize = _, this) : this._tickSize;
    };

    /**
        @memberof Axis
        @desc Sets the tick specifier for the [tickFormat](https://github.com/d3/d3-scale#continuous_tickFormat) function. If this method is called without any arguments, the default tick specifier is returned.
        @param {String} [*value* = undefined]
        @chainable
    */
    Axis.prototype.tickSpecifier = function tickSpecifier (_) {
      return arguments.length ? (this._tickSpecifier = _, this) : this._tickSpecifier;
    };

    /**
        @memberof Axis
        @desc Sets the behavior of the abbreviations when you are using linear scale. This method accepts two options: "normal" (uses formatAbbreviate to determinate the abbreviation) and "smallest" (uses suffix from the smallest tick as reference in every tick). 
        @param {String} [*value* = "normal"]
        @chainable
    */
    Axis.prototype.tickSuffix = function tickSuffix (_) {
      return arguments.length ? (this._tickSuffix = _, this) : this._tickSuffix;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the title of the axis and returns the current class instance.
        @param {String} [*value*]
        @chainable
    */
    Axis.prototype.title = function title (_) {
      return arguments.length ? (this._title = _, this) : this._title;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance.
        @param {Object} [*value*]
        @chainable
    */
    Axis.prototype.titleConfig = function titleConfig (_) {
      return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
    };

    /**
        @memberof Axis
        @desc If *value* is specified, sets the overall width of the axis and returns the current class instance.
        @param {Number} [*value* = 400]
        @chainable
    */
    Axis.prototype.width = function width (_) {
      return arguments.length ? (this._width = _, this) : this._width;
    };

    return Axis;
  }(d3plusCommon.BaseClass));

  /**
      @class AxisBottom
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.
  */
  var AxisBottom = /*@__PURE__*/(function (Axis$$1) {
    function AxisBottom() {
      Axis$$1.call(this);
      this.orient("bottom");
    }

    if ( Axis$$1 ) AxisBottom.__proto__ = Axis$$1;
    AxisBottom.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    AxisBottom.prototype.constructor = AxisBottom;

    return AxisBottom;
  }(Axis));

  /**
      @class AxisLeft
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */
  var AxisLeft = /*@__PURE__*/(function (Axis$$1) {
    function AxisLeft() {
      Axis$$1.call(this);
      this.orient("left");
    }

    if ( Axis$$1 ) AxisLeft.__proto__ = Axis$$1;
    AxisLeft.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    AxisLeft.prototype.constructor = AxisLeft;

    return AxisLeft;
  }(Axis));

  /**
      @class AxisRight
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */
  var AxisRight = /*@__PURE__*/(function (Axis$$1) {
    function AxisRight() {
      Axis$$1.call(this);
      this.orient("right");
    }

    if ( Axis$$1 ) AxisRight.__proto__ = Axis$$1;
    AxisRight.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    AxisRight.prototype.constructor = AxisRight;

    return AxisRight;
  }(Axis));

  /**
      @class AxisTop
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */
  var AxisTop = /*@__PURE__*/(function (Axis$$1) {
    function AxisTop() {
      Axis$$1.call(this);
      this.orient("top");
    }

    if ( Axis$$1 ) AxisTop.__proto__ = Axis$$1;
    AxisTop.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
    AxisTop.prototype.constructor = AxisTop;

    return AxisTop;
  }(Axis));

  exports.Axis = Axis;
  exports.AxisBottom = AxisBottom;
  exports.AxisLeft = AxisLeft;
  exports.AxisRight = AxisRight;
  exports.AxisTop = AxisTop;
  exports.date = date;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-axis.js.map
