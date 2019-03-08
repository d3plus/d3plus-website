/*
  d3plus-priestley v0.3.2
  A reusable Priestley timeline built on D3.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3plus-axis'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-priestley', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3plus-axis', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Collection,global.d3Scale,global.d3plusAxis,global.d3plusCommon,global.d3plusShape,global.d3plusViz));
}(this, (function (exports,d3Array,d3Collection,d3Scale,d3plusAxis,d3plusCommon,d3plusShape,d3plusViz) { 'use strict';

  /**
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */

  /**
      @class Priestley
      @extends external:Viz
      @desc Creates a priestley timeline based on an array of data.
  */
  var Priestley = /*@__PURE__*/(function (Viz) {
    function Priestley() {
      var this$1 = this;


      Viz.call(this);

      this._axis = new d3plusAxis.Axis().align("end").orient("bottom");
      this._axisConfig = {scale: "time"};
      this._axisTest = new d3plusAxis.Axis().align("end").gridSize(0).orient("bottom");
      this.end("end");
      this._shapeConfig = d3plusCommon.assign({}, this._shapeConfig, {
        ariaLabel: function (d, i) { return ((this$1._drawLabel(d, i)) + ", " + (this$1._start(d, i)) + " - " + (this$1._end(d, i)) + "."); }
      });
      this.start("start");

    }

    if ( Viz ) Priestley.__proto__ = Viz;
    Priestley.prototype = Object.create( Viz && Viz.prototype );
    Priestley.prototype.constructor = Priestley;

    /**
        @memberof Priestley
        @desc Extends the render behavior of the abstract Viz class.
        @private
    */
    Priestley.prototype.render = function render (callback) {
      var this$1 = this;


      Viz.prototype.render.call(this, callback);

      if (!this._filteredData) { return this; }

      var data = this._filteredData.map(function (data, i) { return ({
        __d3plus__: true,
        data: data,
        end: this$1._axisConfig.scale === "time" ? d3plusAxis.date(this$1._end(data, i)) : this$1._end(data, i),
        i: i,
        id: this$1._id(data, i),
        start: this$1._axisConfig.scale === "time" ? d3plusAxis.date(this$1._start(data, i)) : this$1._start(data, i)
      }); }).filter(function (d) { return d.end - d.start > 0; }).sort(function (a, b) { return a.start - b.start; });

      var nestedData;
      if (this._groupBy.length > 1 && this._drawDepth > 0) {
        var dataNest = d3Collection.nest();
        var loop = function ( i ) {
          dataNest.key(function (d) { return this$1._groupBy[i](d.data, d.i); });
        };

        for (var i = 0; i < this$1._drawDepth; i++) loop( i );
        nestedData = dataNest.entries(data);
      }
      else { nestedData = [{values: data}]; }

      var maxLane = 0;
      nestedData.forEach(function (g) {
        var track = [];
        g.values.forEach(function (d) {
          track = track.map(function (t) { return t <= d.start ? false : t; });
          var i = track.indexOf(false);
          if (i < 0) {
            d.lane = maxLane + track.length;
            track.push(d.end);
          }
          else {
            track[i] = d.end;
            d.lane = maxLane + i;
          }
        });
        maxLane += track.length;
      });

      var axisConfig = {
        domain: [d3Array.min(data, function (d) { return d.start; }) || 0, d3Array.max(data, function (d) { return d.end; }) || 0],
        height: this._height - this._margin.top - this._margin.bottom,
        width: this._width - this._margin.left - this._margin.right
      };

      var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")";

      this._axisTest
        .config(axisConfig)
        .config(this._axisConfig)
        .select(d3plusCommon.elem("g.d3plus-priestley-axis-test", {parent: this._select, enter: {opacity: 0}}).node())
        .render();

      this._axis
        .config(axisConfig)
        .config(this._axisConfig)
        .select(d3plusCommon.elem("g.d3plus-priestley-axis", {parent: this._select, enter: {transform: transform}, update: {transform: transform}}).node())
        .render();

      var axisPad = this._axisTest._padding;

      var xScale = this._axis._d3Scale;

      var yScale = d3Scale.scalePoint()
        .domain(d3Array.range(0, maxLane, 1))
        .padding(0.5)
        .rangeRound([this._height - this._margin.bottom - this._axisTest.outerBounds().height - axisPad, this._margin.top + axisPad]);

      var step = yScale.step();

      this._shapes.push(new d3plusShape.Rect()
        .data(data)
        .duration(this._duration)
        .height(step >= this._padding * 2 ? step - this._padding : step > 2 ? step - 2 : step)
        .label(function (d, i) { return this$1._drawLabel(d.data, i); })
        .select(d3plusCommon.elem("g.d3plus-priestley-shapes", {parent: this._select}).node())
        .width(function (d) {
          var w = Math.abs(xScale(d.end) - xScale(d.start));
          return w > 2 ? w - 2 : w;
        })
        .x(function (d) { return xScale(d.start) + (xScale(d.end) - xScale(d.start)) / 2; })
        .y(function (d) { return yScale(d.lane); })
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Rect"))
        .render());

      return this;

    };

    /**
        @memberof Priestley
        @desc If *value* is specified, sets the config method for the axis and returns the current class instance. If *value* is not specified, returns the current axis configuration.
        @param {Object} [*value*]
        @chainable
    */
    Priestley.prototype.axisConfig = function axisConfig (_) {
      return arguments.length ? (this._axisConfig = d3plusCommon.assign(this._axisConfig, _), this) : this._axisConfig;
    };

    /**
        @memberof Priestley
        @desc If *value* is specified, sets the end accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current end accessor.
        @param {Function|String} [*value*]
        @chainable
    */
    Priestley.prototype.end = function end (_) {
      if (arguments.length) {
        if (typeof _ === "function") { this._end = _; }
        else {
          this._end = d3plusCommon.accessor(_);
          if (!this._aggs[_]) { this._aggs[_] = function (a) { return d3Array.max(a); }; }
        }
        return this;
      }
      else { return this._end; }
    };

    /**
        @memberof Priestley
        @desc If *value* is specified, sets the start accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current start accessor.
        @param {Function|String} [*value*]
        @chainable
    */
    Priestley.prototype.start = function start (_) {
      if (arguments.length) {
        if (typeof _ === "function") { this._start = _; }
        else {
          this._start = d3plusCommon.accessor(_);
          if (!this._aggs[_]) { this._aggs[_] = function (a) { return d3Array.min(a); }; }
        }
        return this;
      }
      else { return this._start; }
    };

    return Priestley;
  }(d3plusViz.Viz));

  exports.Priestley = Priestley;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-priestley.js.map
