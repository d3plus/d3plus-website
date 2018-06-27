/*
  d3plus-format v0.1.2
  Shorthand formatters for common number types.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-format')) :
  typeof define === 'function' && define.amd ? define('d3plus-format', ['exports', 'd3-format'], factory) :
  (factory((global.d3plus = {}),global.d3Format));
}(this, (function (exports,d3Format) { 'use strict';

  /**
      @function formatAbbreviate
      @desc Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).
      @param {Number} n The number to be formatted.
      @returns {String}
  */
  function abbreviate(n) {
    if (typeof n !== "number") { return "N/A"; }
    var length = n.toString().split(".")[0].length;
    var val;
    if (n === 0) { val = "0"; }
    else if (length >= 3) {
      var f = d3Format.format(".3s")(n)
        .replace("G", "B")
        .replace("T", "t")
        .replace("P", "q")
        .replace("E", "Q");
      var num = f.slice(0, -1);
      var char = f.slice(f.length - 1);
      val = "" + (parseFloat(num)) + char;
    }
    else if (length === 3) { val = d3Format.format(",f")(n); }
    else if (n < 1 && n > -1) { val = d3Format.format(".2g")(n); }
    else { val = d3Format.format(".3g")(n); }

    return val
      .replace(/(\.[1-9]*)[0]*$/g, "$1") // removes any trailing zeros
      .replace(/[.]$/g, ""); // removes any trailing decimal point
  }

  exports.formatAbbreviate = abbreviate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-format.js.map
