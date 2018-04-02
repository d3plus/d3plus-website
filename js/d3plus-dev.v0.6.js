/*
  d3plus-dev v0.6.7
  A collection of scripts for developing D3plus modules.
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-scale')) :
	typeof define === 'function' && define.amd ? define('d3plus-dev', ['exports', 'd3plus-common', 'd3-scale'], factory) :
	(factory((global.d3plus = {}),global.d3plusCommon,global.d3Scale));
}(this, (function (exports,d3plusCommon,d3Scale) { 'use strict';

	var _import = d3plusCommon.uuid();

	var string = "Ceci n'est pas une |";

	function assign () { return Object.assign({}, {test: true}); }

	function includes () { return [0, 1, 2].includes(1); }

	exports.scaleOrdinal = d3Scale.scaleOrdinal;
	exports.import = _import;
	exports.string = string;
	exports.assign = assign;
	exports.includes = includes;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-dev.js.map
