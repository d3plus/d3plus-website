/*
  d3plus-format v0.1.8
  Shorthand formatters for common number types.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-format')) :
  typeof define === 'function' && define.amd ? define('d3plus-format', ['exports', 'd3-format'], factory) :
  (factory((global.d3plus = {}),global.d3Format));
}(this, (function (exports,d3Format) { 'use strict';

  var defaultLocale = {
    "en-GB": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      currency: ["£", ""]
    },
    "en-US": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      currency: ["$", ""]
    },
    "es-ES": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "mm", "b", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      currency: ["€", ""]
    },
    "es-CL": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      currency: ["$", ""]
    },
    "et-EE": {
      separator: " ",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "tuhat", "miljonit", "miljardit", "triljonit", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: " ",
        decimal: ","
      },
      currency: ["", "eurot"]
    },
    "fr-FR": {
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "m", "b", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: " ",
        decimal: ","
      },
      currency: ["€", ""]
    }
  };

  var round = function (x, n) { return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n); };

  /**
   * @private
  */
  function formatSuffix(value, precision, suffixes) {
    var i = 0;
    if (value) {
      if (value < 0) { value *= -1; }
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
    }
    var d = suffixes[8 + i / 3];

    return {
      number: round(d.scale(value), precision),
      symbol: d.symbol
    };
  }

  /**
   * @private
  */
  function parseSuffixes(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function (d) { return d / k; } : function (d) { return d * k; },
      symbol: d
    };
  }


  /**
      @function formatAbbreviate
      @desc Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).
      @param {Number|String} n The number to be formatted.
      @param {Object|String} locale The locale config to be used. If *value* is an object, the function will format the numbers according the object. The object must include `suffixes`, `delimiter` and `currency` properties.
      @returns {String}
  */
  function abbreviate(n, locale) {
    if ( locale === void 0 ) locale = "en-US";

    if (isFinite(n)) { n *= 1; }
    else { return "N/A"; }

    var length = n.toString().split(".")[0].replace("-", "").length,
          localeConfig = typeof locale === "object" ? locale : defaultLocale[locale] || defaultLocale["en-US"],
          suffixes = localeConfig.suffixes.map(parseSuffixes);

    var decimal = localeConfig.delimiters.decimal || ".",
          separator = localeConfig.separator || "";

    var d3plusFormatLocale = d3Format.formatLocale({
      currency: localeConfig.currency || ["$", ""],
      decimal: decimal,
      grouping: localeConfig.grouping || [3],
      thousands: localeConfig.delimiters.thousands || ","
    });

    var val;
    if (n === 0) { val = "0"; }
    else if (length >= 3) {
      var f = formatSuffix(d3plusFormatLocale.format(".3r")(n), 2, suffixes);
      var num = parseFloat(f.number).toString().replace(".", decimal);
      var char = f.symbol;
      val = "" + num + separator + char;
    }
    else if (length === 3) { val = d3plusFormatLocale.format(",f")(n); }
    else if (n < 1 && n > -1) { val = d3plusFormatLocale.format(".2g")(n); }
    else { val = d3plusFormatLocale.format(".3g")(n); }

    return val
      .replace(/(\.[1-9]*)[0]*$/g, "$1") // removes any trailing zeros
      .replace(/[.]$/g, ""); // removes any trailing decimal point
  }

  exports.formatAbbreviate = abbreviate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-format.js.map
