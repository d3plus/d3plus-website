/*
  d3plus-color v0.6.4
  Color functions that extent the ability of d3-color.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color'), require('d3-scale')) :
  typeof define === 'function' && define.amd ? define('d3plus-color', ['exports', 'd3-color', 'd3-scale'], factory) :
  (factory((global.d3plus = {}),global.d3Color,global.d3Scale));
}(this, (function (exports,d3Color,d3Scale) { 'use strict';

  /**
      @function colorAdd
      @desc Adds two colors together.
      @param {String} c1 The first color, a valid CSS color string.
      @param {String} c2 The second color, also a valid CSS color string.
      @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
      @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
      @returns {String}
  */
  function add(c1, c2, o1, o2) {
    if ( o1 === void 0 ) o1 = 1;
    if ( o2 === void 0 ) o2 = 1;

    c1 = d3Color.hsl(c1);
    c2 = d3Color.hsl(c2);
    var d = Math.abs(c2.h * o2 - c1.h * o1);
    if (d > 180) { d -= 360; }
    var h = (Math.min(c1.h, c2.h) + d / 2) % 360;
    var l = c1.l + (c2.l * o2 - c1.l * o1) / 2,
          s = c1.s + (c2.s * o2 - c1.s * o1) / 2;
    // a = o1 + (o2 - o1) / 2;
    if (h < 0) { h += 360; }
    return d3Color.hsl(("hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)")).toString();
    // return hsl(`hsl(${h},${s * 100}%,${l * 100}%,${a})`).toString();
  }

  /**
      @namespace {Object} colorDefaults
      @desc A set of default color values used when assigning colors based on data.
        *
        * | Name | Default | Description |
        * |---|---|---|
        * | dark | #444444 | Used in the [contrast](#contrast) function when the color given is very light. |
        * | light | #f7f7f7 | Used in the [contrast](#contrast) function when the color given is very dark. |
        * | missing | #cccccc | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
        * | off | #b22200 | Used in the [assign](#assign) function when the value passed is `false`. |
        * | on | #224f20 | Used in the [assign](#assign) function when the value passed is `true`. |
        * | scale | #b22200, #eace3f, #282f6b, #b35c1e, #224f20, #5f487c, #759143, #419391, #993c88, #e89c89, #ffee8d, #afd5e8, #f7ba77, #a5c697, #c5b5e5, #d1d392, #bbefd0, #e099cf | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |
  */
  var defaults = {
    dark: "#444444",
    light: "#f7f7f7",
    missing: "#cccccc",
    off: "#b22200",
    on: "#224f20",
    scale: d3Scale.scaleOrdinal().range([
      "#b22200", "#282f6b", "#eace3f", "#b35c1e", "#224f20", "#5f487c",
      "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8",
      "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"
    ])
  };

  /**
      Returns a color based on a key, whether it is present in a user supplied object or in the default object.
      @returns {String}
      @private
  */
  function getColor(k, u) {
    if ( u === void 0 ) u = {};

    return k in u ? u[k] : k in defaults ? defaults[k] : defaults.missing;
  }

  /**
      @function colorAssign
      @desc Assigns a color to a value using a predefined set of defaults.
      @param {String} c A valid CSS color string.
      @param {Object} [u = defaults] An object containing overrides of the default colors.
      @returns {String}
  */
  function assign(c, u) {
    if ( u === void 0 ) u = {};


    // If the value is null or undefined, set to grey.
    if ([null, void 0].indexOf(c) >= 0) { return getColor("missing", u); }
    // Else if the value is true, set to green.
    else if (c === true) { return getColor("on", u); }
    // Else if the value is false, set to red.
    else if (c === false) { return getColor("off", u); }

    var p = d3Color.color(c);
    // If the value is not a valid color string, use the color scale.
    if (!p) { return getColor("scale", u)(c); }

    return c.toString();

  }

  /**
      @function colorContrast
      @desc A set of default color values used when assigning colors based on data.
      @param {String} c A valid CSS color string.
      @param {Object} [u = defaults] An object containing overrides of the default colors.
      @returns {String}
  */
  function contrast(c, u) {
    if ( u === void 0 ) u = {};

    c = d3Color.rgb(c);
    var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
    return yiq >= 128 ? getColor("dark", u) : getColor("light", u);
  }

  /**
      @function colorLegible
      @desc Darkens a color so that it will appear legible on a white background.
      @param {String} c A valid CSS color string.
      @returns {String}
  */
  function legible(c) {
    c = d3Color.hsl(c);
    if (c.l > 0.45) {
      if (c.s > 0.8) { c.s = 0.8; }
      c.l = 0.45;
    }
    return c.toString();
  }

  /**
      @function colorLighter
      @desc Similar to d3.color.brighter, except that this also reduces saturation so that colors don't appear neon.
      @param {String} c A valid CSS color string.
      @param {String} [i = 0.5] A value from 0 to 1 dictating the strength of the function.
      @returns {String}
  */
  function lighter(c, i) {
    if ( i === void 0 ) i = 0.5;

    c = d3Color.hsl(c);
    i *= 1 - c.l;
    c.l += i;
    c.s -= i;
    return c.toString();
  }

  /**
      @function colorSubtract
      @desc Subtracts one color from another.
      @param {String} c1 The base color, a valid CSS color string.
      @param {String} c2 The color to remove from the base color, also a valid CSS color string.
      @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
      @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
      @returns {String}
  */
  function subtract(c1, c2, o1, o2) {
    if ( o1 === void 0 ) o1 = 1;
    if ( o2 === void 0 ) o2 = 1;

    c1 = d3Color.hsl(c1);
    c2 = d3Color.hsl(c2);
    var d = c2.h * o2 - c1.h * o1;
    if (Math.abs(d) > 180) { d -= 360; }
    var h = (c1.h - d) % 360;
    var l = c1.l - (c2.l * o2 - c1.l * o1) / 2,
          s = c1.s - (c2.s * o2 - c1.s * o1) / 2;
    // a = o1 - (o2 - o1) / 2;
    if (h < 0) { h += 360; }
    return d3Color.hsl(("hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)")).toString();
    // return hsl(`hsl(${h},${s * 100}%,${l * 100}%,${a})`).toString();
  }

  exports.colorAdd = add;
  exports.colorAssign = assign;
  exports.colorContrast = contrast;
  exports.colorDefaults = defaults;
  exports.colorLegible = legible;
  exports.colorLighter = lighter;
  exports.colorSubtract = subtract;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-color.js.map
