/*
  d3plus-export v0.3.13
  Export methods for transforming and downloading SVG.
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('d3plus-export', ['exports'], factory) :
	(factory((global.d3plus = {})));
}(this, (function (exports) {
	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var html2canvas = createCommonjsModule(function (module, exports) {
	/*
	  html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
	  Copyright (c) 2016 Niklas von Hertzen

	  Released under  License
	*/

	(function(f){{module.exports=f();}})(function(){return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a){ return a(o,!0); }if(i){ return i(o,!0); }var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r);}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++){ s(r[o]); }return s})({1:[function(_dereq_,module,exports){
	(function (global){
	(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{}],2:[function(_dereq_,module,exports){
	var log = _dereq_('./log');

	function restoreOwnerScroll(ownerDocument, x, y) {
	    if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
	        ownerDocument.defaultView.scrollTo(x, y);
	    }
	}

	function cloneCanvasContents(canvas, clonedCanvas) {
	    try {
	        if (clonedCanvas) {
	            clonedCanvas.width = canvas.width;
	            clonedCanvas.height = canvas.height;
	            clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
	        }
	    } catch(e) {
	        log("Unable to copy canvas content from", canvas, e);
	    }
	}

	function cloneNode(node, javascriptEnabled) {
	    var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

	    var child = node.firstChild;
	    while(child) {
	        if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
	            clone.appendChild(cloneNode(child, javascriptEnabled));
	        }
	        child = child.nextSibling;
	    }

	    if (node.nodeType === 1) {
	        clone._scrollTop = node.scrollTop;
	        clone._scrollLeft = node.scrollLeft;
	        if (node.nodeName === "CANVAS") {
	            cloneCanvasContents(node, clone);
	        } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
	            clone.value = node.value;
	        }
	    }

	    return clone;
	}

	function initNode(node) {
	    if (node.nodeType === 1) {
	        node.scrollTop = node._scrollTop;
	        node.scrollLeft = node._scrollLeft;

	        var child = node.firstChild;
	        while(child) {
	            initNode(child);
	            child = child.nextSibling;
	        }
	    }
	}

	module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
	    var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
	    var container = containerDocument.createElement("iframe");

	    container.className = "html2canvas-container";
	    container.style.visibility = "hidden";
	    container.style.position = "fixed";
	    container.style.left = "-10000px";
	    container.style.top = "0px";
	    container.style.border = "0";
	    container.width = width;
	    container.height = height;
	    container.scrolling = "no"; // ios won't scroll without it
	    containerDocument.body.appendChild(container);

	    return new Promise(function(resolve) {
	        var documentClone = container.contentWindow.document;

	        /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
	         if window url is about:blank, we can assign the url to current by writing onto the document
	         */
	        container.contentWindow.onload = container.onload = function() {
	            var interval = setInterval(function() {
	                if (documentClone.body.childNodes.length > 0) {
	                    initNode(documentClone.documentElement);
	                    clearInterval(interval);
	                    if (options.type === "view") {
	                        container.contentWindow.scrollTo(x, y);
	                        if ((/(iPad|iPhone|iPod)/g).test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
	                            documentClone.documentElement.style.top = (-y) + "px";
	                            documentClone.documentElement.style.left = (-x) + "px";
	                            documentClone.documentElement.style.position = 'absolute';
	                        }
	                    }
	                    resolve(container);
	                }
	            }, 50);
	        };

	        documentClone.open();
	        documentClone.write("<!DOCTYPE html><html></html>");
	        // Chrome scrolls the parent document for some reason after the write to the cloned window???
	        restoreOwnerScroll(ownerDocument, x, y);
	        documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
	        documentClone.close();
	    });
	};

	},{"./log":13}],3:[function(_dereq_,module,exports){
	// http://dev.w3.org/csswg/css-color/

	function Color(value) {
	    this.r = 0;
	    this.g = 0;
	    this.b = 0;
	    this.a = null;
	    var result = this.fromArray(value) ||
	        this.namedColor(value) ||
	        this.rgb(value) ||
	        this.rgba(value) ||
	        this.hex6(value) ||
	        this.hex3(value);
	}

	Color.prototype.darken = function(amount) {
	    var a = 1 - amount;
	    return  new Color([
	        Math.round(this.r * a),
	        Math.round(this.g * a),
	        Math.round(this.b * a),
	        this.a
	    ]);
	};

	Color.prototype.isTransparent = function() {
	    return this.a === 0;
	};

	Color.prototype.isBlack = function() {
	    return this.r === 0 && this.g === 0 && this.b === 0;
	};

	Color.prototype.fromArray = function(array) {
	    if (Array.isArray(array)) {
	        this.r = Math.min(array[0], 255);
	        this.g = Math.min(array[1], 255);
	        this.b = Math.min(array[2], 255);
	        if (array.length > 3) {
	            this.a = array[3];
	        }
	    }

	    return (Array.isArray(array));
	};

	var _hex3 = /^#([a-f0-9]{3})$/i;

	Color.prototype.hex3 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex3)) !== null) {
	        this.r = parseInt(match[1][0] + match[1][0], 16);
	        this.g = parseInt(match[1][1] + match[1][1], 16);
	        this.b = parseInt(match[1][2] + match[1][2], 16);
	    }
	    return match !== null;
	};

	var _hex6 = /^#([a-f0-9]{6})$/i;

	Color.prototype.hex6 = function(value) {
	    var match = null;
	    if ((match = value.match(_hex6)) !== null) {
	        this.r = parseInt(match[1].substring(0, 2), 16);
	        this.g = parseInt(match[1].substring(2, 4), 16);
	        this.b = parseInt(match[1].substring(4, 6), 16);
	    }
	    return match !== null;
	};


	var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

	Color.prototype.rgb = function(value) {
	    var match = null;
	    if ((match = value.match(_rgb)) !== null) {
	        this.r = Number(match[1]);
	        this.g = Number(match[2]);
	        this.b = Number(match[3]);
	    }
	    return match !== null;
	};

	var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

	Color.prototype.rgba = function(value) {
	    var match = null;
	    if ((match = value.match(_rgba)) !== null) {
	        this.r = Number(match[1]);
	        this.g = Number(match[2]);
	        this.b = Number(match[3]);
	        this.a = Number(match[4]);
	    }
	    return match !== null;
	};

	Color.prototype.toString = function() {
	    return this.a !== null && this.a !== 1 ?
	    "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
	    "rgb(" + [this.r, this.g, this.b].join(",") + ")";
	};

	Color.prototype.namedColor = function(value) {
	    value = value.toLowerCase();
	    var color = colors[value];
	    if (color) {
	        this.r = color[0];
	        this.g = color[1];
	        this.b = color[2];
	    } else if (value === "transparent") {
	        this.r = this.g = this.b = this.a = 0;
	        return true;
	    }

	    return !!color;
	};

	Color.prototype.isColor = true;

	// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
	var colors = {
	    "aliceblue": [240, 248, 255],
	    "antiquewhite": [250, 235, 215],
	    "aqua": [0, 255, 255],
	    "aquamarine": [127, 255, 212],
	    "azure": [240, 255, 255],
	    "beige": [245, 245, 220],
	    "bisque": [255, 228, 196],
	    "black": [0, 0, 0],
	    "blanchedalmond": [255, 235, 205],
	    "blue": [0, 0, 255],
	    "blueviolet": [138, 43, 226],
	    "brown": [165, 42, 42],
	    "burlywood": [222, 184, 135],
	    "cadetblue": [95, 158, 160],
	    "chartreuse": [127, 255, 0],
	    "chocolate": [210, 105, 30],
	    "coral": [255, 127, 80],
	    "cornflowerblue": [100, 149, 237],
	    "cornsilk": [255, 248, 220],
	    "crimson": [220, 20, 60],
	    "cyan": [0, 255, 255],
	    "darkblue": [0, 0, 139],
	    "darkcyan": [0, 139, 139],
	    "darkgoldenrod": [184, 134, 11],
	    "darkgray": [169, 169, 169],
	    "darkgreen": [0, 100, 0],
	    "darkgrey": [169, 169, 169],
	    "darkkhaki": [189, 183, 107],
	    "darkmagenta": [139, 0, 139],
	    "darkolivegreen": [85, 107, 47],
	    "darkorange": [255, 140, 0],
	    "darkorchid": [153, 50, 204],
	    "darkred": [139, 0, 0],
	    "darksalmon": [233, 150, 122],
	    "darkseagreen": [143, 188, 143],
	    "darkslateblue": [72, 61, 139],
	    "darkslategray": [47, 79, 79],
	    "darkslategrey": [47, 79, 79],
	    "darkturquoise": [0, 206, 209],
	    "darkviolet": [148, 0, 211],
	    "deeppink": [255, 20, 147],
	    "deepskyblue": [0, 191, 255],
	    "dimgray": [105, 105, 105],
	    "dimgrey": [105, 105, 105],
	    "dodgerblue": [30, 144, 255],
	    "firebrick": [178, 34, 34],
	    "floralwhite": [255, 250, 240],
	    "forestgreen": [34, 139, 34],
	    "fuchsia": [255, 0, 255],
	    "gainsboro": [220, 220, 220],
	    "ghostwhite": [248, 248, 255],
	    "gold": [255, 215, 0],
	    "goldenrod": [218, 165, 32],
	    "gray": [128, 128, 128],
	    "green": [0, 128, 0],
	    "greenyellow": [173, 255, 47],
	    "grey": [128, 128, 128],
	    "honeydew": [240, 255, 240],
	    "hotpink": [255, 105, 180],
	    "indianred": [205, 92, 92],
	    "indigo": [75, 0, 130],
	    "ivory": [255, 255, 240],
	    "khaki": [240, 230, 140],
	    "lavender": [230, 230, 250],
	    "lavenderblush": [255, 240, 245],
	    "lawngreen": [124, 252, 0],
	    "lemonchiffon": [255, 250, 205],
	    "lightblue": [173, 216, 230],
	    "lightcoral": [240, 128, 128],
	    "lightcyan": [224, 255, 255],
	    "lightgoldenrodyellow": [250, 250, 210],
	    "lightgray": [211, 211, 211],
	    "lightgreen": [144, 238, 144],
	    "lightgrey": [211, 211, 211],
	    "lightpink": [255, 182, 193],
	    "lightsalmon": [255, 160, 122],
	    "lightseagreen": [32, 178, 170],
	    "lightskyblue": [135, 206, 250],
	    "lightslategray": [119, 136, 153],
	    "lightslategrey": [119, 136, 153],
	    "lightsteelblue": [176, 196, 222],
	    "lightyellow": [255, 255, 224],
	    "lime": [0, 255, 0],
	    "limegreen": [50, 205, 50],
	    "linen": [250, 240, 230],
	    "magenta": [255, 0, 255],
	    "maroon": [128, 0, 0],
	    "mediumaquamarine": [102, 205, 170],
	    "mediumblue": [0, 0, 205],
	    "mediumorchid": [186, 85, 211],
	    "mediumpurple": [147, 112, 219],
	    "mediumseagreen": [60, 179, 113],
	    "mediumslateblue": [123, 104, 238],
	    "mediumspringgreen": [0, 250, 154],
	    "mediumturquoise": [72, 209, 204],
	    "mediumvioletred": [199, 21, 133],
	    "midnightblue": [25, 25, 112],
	    "mintcream": [245, 255, 250],
	    "mistyrose": [255, 228, 225],
	    "moccasin": [255, 228, 181],
	    "navajowhite": [255, 222, 173],
	    "navy": [0, 0, 128],
	    "oldlace": [253, 245, 230],
	    "olive": [128, 128, 0],
	    "olivedrab": [107, 142, 35],
	    "orange": [255, 165, 0],
	    "orangered": [255, 69, 0],
	    "orchid": [218, 112, 214],
	    "palegoldenrod": [238, 232, 170],
	    "palegreen": [152, 251, 152],
	    "paleturquoise": [175, 238, 238],
	    "palevioletred": [219, 112, 147],
	    "papayawhip": [255, 239, 213],
	    "peachpuff": [255, 218, 185],
	    "peru": [205, 133, 63],
	    "pink": [255, 192, 203],
	    "plum": [221, 160, 221],
	    "powderblue": [176, 224, 230],
	    "purple": [128, 0, 128],
	    "rebeccapurple": [102, 51, 153],
	    "red": [255, 0, 0],
	    "rosybrown": [188, 143, 143],
	    "royalblue": [65, 105, 225],
	    "saddlebrown": [139, 69, 19],
	    "salmon": [250, 128, 114],
	    "sandybrown": [244, 164, 96],
	    "seagreen": [46, 139, 87],
	    "seashell": [255, 245, 238],
	    "sienna": [160, 82, 45],
	    "silver": [192, 192, 192],
	    "skyblue": [135, 206, 235],
	    "slateblue": [106, 90, 205],
	    "slategray": [112, 128, 144],
	    "slategrey": [112, 128, 144],
	    "snow": [255, 250, 250],
	    "springgreen": [0, 255, 127],
	    "steelblue": [70, 130, 180],
	    "tan": [210, 180, 140],
	    "teal": [0, 128, 128],
	    "thistle": [216, 191, 216],
	    "tomato": [255, 99, 71],
	    "turquoise": [64, 224, 208],
	    "violet": [238, 130, 238],
	    "wheat": [245, 222, 179],
	    "white": [255, 255, 255],
	    "whitesmoke": [245, 245, 245],
	    "yellow": [255, 255, 0],
	    "yellowgreen": [154, 205, 50]
	};

	module.exports = Color;

	},{}],4:[function(_dereq_,module,exports){
	var Support = _dereq_('./support');
	var CanvasRenderer = _dereq_('./renderers/canvas');
	var ImageLoader = _dereq_('./imageloader');
	var NodeParser = _dereq_('./nodeparser');
	var NodeContainer = _dereq_('./nodecontainer');
	var log = _dereq_('./log');
	var utils = _dereq_('./utils');
	var createWindowClone = _dereq_('./clone');
	var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;
	var getBounds = utils.getBounds;

	var html2canvasNodeAttribute = "data-html2canvas-node";
	var html2canvasCloneIndex = 0;

	function html2canvas(nodeList, options) {
	    var index = html2canvasCloneIndex++;
	    options = options || {};
	    if (options.logging) {
	        log.options.logging = true;
	        log.options.start = Date.now();
	    }

	    options.async = typeof(options.async) === "undefined" ? true : options.async;
	    options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
	    options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
	    options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
	    options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
	    options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
	    options.strict = !!options.strict;

	    if (typeof(nodeList) === "string") {
	        if (typeof(options.proxy) !== "string") {
	            return Promise.reject("Proxy must be used when rendering url");
	        }
	        var width = options.width != null ? options.width : window.innerWidth;
	        var height = options.height != null ? options.height : window.innerHeight;
	        return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
	            return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
	        });
	    }

	    var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
	    node.setAttribute(html2canvasNodeAttribute + index, index);
	    return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
	        if (typeof(options.onrendered) === "function") {
	            log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
	            options.onrendered(canvas);
	        }
	        return canvas;
	    });
	}

	html2canvas.CanvasRenderer = CanvasRenderer;
	html2canvas.NodeContainer = NodeContainer;
	html2canvas.log = log;
	html2canvas.utils = utils;

	var html2canvasExport = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
	    return Promise.reject("No canvas support");
	} : html2canvas;

	module.exports = html2canvasExport;

	function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
	    return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
	        log("Document cloned");
	        var attributeName = html2canvasNodeAttribute + html2canvasIndex;
	        var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
	        document.querySelector(selector).removeAttribute(attributeName);
	        var clonedWindow = container.contentWindow;
	        var node = clonedWindow.document.querySelector(selector);
	        var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
	        return oncloneHandler.then(function() {
	            return renderWindow(node, container, options, windowWidth, windowHeight);
	        });
	    });
	}

	function renderWindow(node, container, options, windowWidth, windowHeight) {
	    var clonedWindow = container.contentWindow;
	    var support = new Support(clonedWindow.document);
	    var imageLoader = new ImageLoader(options, support);
	    var bounds = getBounds(node);
	    var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
	    var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
	    var renderer = new options.renderer(width, height, imageLoader, options, document);
	    var parser = new NodeParser(node, renderer, support, imageLoader, options);
	    return parser.ready.then(function() {
	        log("Finished rendering");
	        var canvas;

	        if (options.type === "view") {
	            canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
	        } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
	            canvas = renderer.canvas;
	        } else {
	            canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: 0, y: 0});
	        }

	        cleanupContainer(container, options);
	        return canvas;
	    });
	}

	function cleanupContainer(container, options) {
	    if (options.removeContainer) {
	        container.parentNode.removeChild(container);
	        log("Cleaned up container");
	    }
	}

	function crop(canvas, bounds) {
	    var croppedCanvas = document.createElement("canvas");
	    var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
	    var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
	    var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
	    var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
	    croppedCanvas.width = bounds.width;
	    croppedCanvas.height =  bounds.height;
	    var width = x2-x1;
	    var height = y2-y1;
	    log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
	    log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
	    croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
	    return croppedCanvas;
	}

	function documentWidth (doc) {
	    return Math.max(
	        Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
	        Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
	        Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
	    );
	}

	function documentHeight (doc) {
	    return Math.max(
	        Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
	        Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
	        Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
	    );
	}

	function absoluteUrl(url) {
	    var link = document.createElement("a");
	    link.href = url;
	    link.href = link.href;
	    return link;
	}

	},{"./clone":2,"./imageloader":11,"./log":13,"./nodecontainer":14,"./nodeparser":15,"./proxy":16,"./renderers/canvas":20,"./support":22,"./utils":26}],5:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var smallImage = _dereq_('./utils').smallImage;

	function DummyImageContainer(src) {
	    this.src = src;
	    log("DummyImageContainer for", src);
	    if (!this.promise || !this.image) {
	        log("Initiating DummyImageContainer");
	        DummyImageContainer.prototype.image = new Image();
	        var image = this.image;
	        DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
	            image.onload = resolve;
	            image.onerror = reject;
	            image.src = smallImage();
	            if (image.complete === true) {
	                resolve(image);
	            }
	        });
	    }
	}

	module.exports = DummyImageContainer;

	},{"./log":13,"./utils":26}],6:[function(_dereq_,module,exports){
	var smallImage = _dereq_('./utils').smallImage;

	function Font(family, size) {
	    var container = document.createElement('div'),
	        img = document.createElement('img'),
	        span = document.createElement('span'),
	        sampleText = 'Hidden Text',
	        baseline,
	        middle;

	    container.style.visibility = "hidden";
	    container.style.fontFamily = family;
	    container.style.fontSize = size;
	    container.style.margin = 0;
	    container.style.padding = 0;

	    document.body.appendChild(container);

	    img.src = smallImage();
	    img.width = 1;
	    img.height = 1;

	    img.style.margin = 0;
	    img.style.padding = 0;
	    img.style.verticalAlign = "baseline";

	    span.style.fontFamily = family;
	    span.style.fontSize = size;
	    span.style.margin = 0;
	    span.style.padding = 0;

	    span.appendChild(document.createTextNode(sampleText));
	    container.appendChild(span);
	    container.appendChild(img);
	    baseline = (img.offsetTop - span.offsetTop) + 1;

	    container.removeChild(span);
	    container.appendChild(document.createTextNode(sampleText));

	    container.style.lineHeight = "normal";
	    img.style.verticalAlign = "super";

	    middle = (img.offsetTop-container.offsetTop) + 1;

	    document.body.removeChild(container);

	    this.baseline = baseline;
	    this.lineWidth = 1;
	    this.middle = middle;
	}

	module.exports = Font;

	},{"./utils":26}],7:[function(_dereq_,module,exports){
	var Font = _dereq_('./font');

	function FontMetrics() {
	    this.data = {};
	}

	FontMetrics.prototype.getMetrics = function(family, size) {
	    if (this.data[family + "-" + size] === undefined) {
	        this.data[family + "-" + size] = new Font(family, size);
	    }
	    return this.data[family + "-" + size];
	};

	module.exports = FontMetrics;

	},{"./font":6}],8:[function(_dereq_,module,exports){
	var utils = _dereq_('./utils');
	var getBounds = utils.getBounds;
	var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

	function FrameContainer(container, sameOrigin, options) {
	    this.image = null;
	    this.src = container;
	    var self = this;
	    var bounds = getBounds(container);
	    this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
	        if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
	            container.contentWindow.onload = container.onload = function() {
	                resolve(container);
	            };
	        } else {
	            resolve(container);
	        }
	    })).then(function(container) {
	        var html2canvas = _dereq_('./core');
	        return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
	    }).then(function(canvas) {
	        return self.image = canvas;
	    });
	}

	FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
	    var container = this.src;
	    return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
	};

	module.exports = FrameContainer;

	},{"./core":4,"./proxy":16,"./utils":26}],9:[function(_dereq_,module,exports){
	function GradientContainer(imageData) {
	    this.src = imageData.value;
	    this.colorStops = [];
	    this.type = null;
	    this.x0 = 0.5;
	    this.y0 = 0.5;
	    this.x1 = 0.5;
	    this.y1 = 0.5;
	    this.promise = Promise.resolve(true);
	}

	GradientContainer.TYPES = {
	    LINEAR: 1,
	    RADIAL: 2
	};

	// TODO: support hsl[a], negative %/length values
	// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;

	module.exports = GradientContainer;

	},{}],10:[function(_dereq_,module,exports){
	function ImageContainer(src, cors) {
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.tainted = null;
	    this.promise = new Promise(function(resolve, reject) {
	        self.image.onload = resolve;
	        self.image.onerror = reject;
	        if (cors) {
	            self.image.crossOrigin = "anonymous";
	        }
	        self.image.src = src;
	        if (self.image.complete === true) {
	            resolve(self.image);
	        }
	    });
	}

	module.exports = ImageContainer;

	},{}],11:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var ImageContainer = _dereq_('./imagecontainer');
	var DummyImageContainer = _dereq_('./dummyimagecontainer');
	var ProxyImageContainer = _dereq_('./proxyimagecontainer');
	var FrameContainer = _dereq_('./framecontainer');
	var SVGContainer = _dereq_('./svgcontainer');
	var SVGNodeContainer = _dereq_('./svgnodecontainer');
	var LinearGradientContainer = _dereq_('./lineargradientcontainer');
	var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');
	var bind = _dereq_('./utils').bind;

	function ImageLoader(options, support) {
	    this.link = null;
	    this.options = options;
	    this.support = support;
	    this.origin = this.getOrigin(window.location.href);
	}

	ImageLoader.prototype.findImages = function(nodes) {
	    var images = [];
	    nodes.reduce(function(imageNodes, container) {
	        switch(container.node.nodeName) {
	        case "IMG":
	            return imageNodes.concat([{
	                args: [container.node.src],
	                method: "url"
	            }]);
	        case "svg":
	        case "IFRAME":
	            return imageNodes.concat([{
	                args: [container.node],
	                method: container.node.nodeName
	            }]);
	        }
	        return imageNodes;
	    }, []).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.findBackgroundImage = function(images, container) {
	    container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
	    return images;
	};

	ImageLoader.prototype.addImage = function(images, callback) {
	    return function(newImage) {
	        newImage.args.forEach(function(image) {
	            if (!this.imageExists(images, image)) {
	                images.splice(0, 0, callback.call(this, newImage));
	                log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
	            }
	        }, this);
	    };
	};

	ImageLoader.prototype.hasImageBackground = function(imageData) {
	    return imageData.method !== "none";
	};

	ImageLoader.prototype.loadImage = function(imageData) {
	    if (imageData.method === "url") {
	        var src = imageData.args[0];
	        if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
	            return new SVGContainer(src);
	        } else if (src.match(/data:image\/.*;base64,/i)) {
	            return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
	        } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
	            return new ImageContainer(src, false);
	        } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
	            return new ImageContainer(src, true);
	        } else if (this.options.proxy) {
	            return new ProxyImageContainer(src, this.options.proxy);
	        } else {
	            return new DummyImageContainer(src);
	        }
	    } else if (imageData.method === "linear-gradient") {
	        return new LinearGradientContainer(imageData);
	    } else if (imageData.method === "gradient") {
	        return new WebkitGradientContainer(imageData);
	    } else if (imageData.method === "svg") {
	        return new SVGNodeContainer(imageData.args[0], this.support.svg);
	    } else if (imageData.method === "IFRAME") {
	        return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
	    } else {
	        return new DummyImageContainer(imageData);
	    }
	};

	ImageLoader.prototype.isSVG = function(src) {
	    return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
	};

	ImageLoader.prototype.imageExists = function(images, src) {
	    return images.some(function(image) {
	        return image.src === src;
	    });
	};

	ImageLoader.prototype.isSameOrigin = function(url) {
	    return (this.getOrigin(url) === this.origin);
	};

	ImageLoader.prototype.getOrigin = function(url) {
	    var link = this.link || (this.link = document.createElement("a"));
	    link.href = url;
	    link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
	    return link.protocol + link.hostname + link.port;
	};

	ImageLoader.prototype.getPromise = function(container) {
	    return this.timeout(container, this.options.imageTimeout)['catch'](function() {
	        var dummy = new DummyImageContainer(container.src);
	        return dummy.promise.then(function(image) {
	            container.image = image;
	        });
	    });
	};

	ImageLoader.prototype.get = function(src) {
	    var found = null;
	    return this.images.some(function(img) {
	        return (found = img).src === src;
	    }) ? found : null;
	};

	ImageLoader.prototype.fetch = function(nodes) {
	    this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
	    this.images.forEach(function(image, index) {
	        image.promise.then(function() {
	            log("Succesfully loaded image #"+ (index+1), image);
	        }, function(e) {
	            log("Failed loading image #"+ (index+1), image, e);
	        });
	    });
	    this.ready = Promise.all(this.images.map(this.getPromise, this));
	    log("Finished searching images");
	    return this;
	};

	ImageLoader.prototype.timeout = function(container, timeout) {
	    var timer;
	    var promise = Promise.race([container.promise, new Promise(function(res, reject) {
	        timer = setTimeout(function() {
	            log("Timed out loading image", container);
	            reject(container);
	        }, timeout);
	    })]).then(function(container) {
	        clearTimeout(timer);
	        return container;
	    });
	    promise['catch'](function() {
	        clearTimeout(timer);
	    });
	    return promise;
	};

	module.exports = ImageLoader;

	},{"./dummyimagecontainer":5,"./framecontainer":8,"./imagecontainer":10,"./lineargradientcontainer":12,"./log":13,"./proxyimagecontainer":17,"./svgcontainer":23,"./svgnodecontainer":24,"./utils":26,"./webkitgradientcontainer":27}],12:[function(_dereq_,module,exports){
	var GradientContainer = _dereq_('./gradientcontainer');
	var Color = _dereq_('./color');

	function LinearGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = GradientContainer.TYPES.LINEAR;

	    var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test( imageData.args[0] ) ||
	        !GradientContainer.REGEXP_COLORSTOP.test( imageData.args[0] );

	    if (hasDirection) {
	        imageData.args[0].split(/\s+/).reverse().forEach(function(position, index) {
	            switch(position) {
	            case "left":
	                this.x0 = 0;
	                this.x1 = 1;
	                break;
	            case "top":
	                this.y0 = 0;
	                this.y1 = 1;
	                break;
	            case "right":
	                this.x0 = 1;
	                this.x1 = 0;
	                break;
	            case "bottom":
	                this.y0 = 1;
	                this.y1 = 0;
	                break;
	            case "to":
	                var y0 = this.y0;
	                var x0 = this.x0;
	                this.y0 = this.y1;
	                this.x0 = this.x1;
	                this.x1 = x0;
	                this.y1 = y0;
	                break;
	            case "center":
	                break; // centered by default
	            // Firefox internally converts position keywords to percentages:
	            // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position
	            default: // percentage or absolute length
	                // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
	                var ratio = parseFloat(position, 10) * 1e-2;
	                if (isNaN(ratio)) { // invalid or unhandled value
	                    break;
	                }
	                if (index === 0) {
	                    this.y0 = ratio;
	                    this.y1 = 1 - this.y0;
	                } else {
	                    this.x0 = ratio;
	                    this.x1 = 1 - this.x0;
	                }
	                break;
	            }
	        }, this);
	    } else {
	        this.y0 = 0;
	        this.y1 = 1;
	    }

	    this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
	        var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
	        var value = +colorStopMatch[2];
	        var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"
	        return {
	            color: new Color(colorStopMatch[1]),
	            // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
	            stop: unit === "%" ? value / 100 : null
	        };
	    });

	    if (this.colorStops[0].stop === null) {
	        this.colorStops[0].stop = 0;
	    }

	    if (this.colorStops[this.colorStops.length - 1].stop === null) {
	        this.colorStops[this.colorStops.length - 1].stop = 1;
	    }

	    // calculates and fills-in explicit stop positions when omitted from rule
	    this.colorStops.forEach(function(colorStop, index) {
	        if (colorStop.stop === null) {
	            this.colorStops.slice(index).some(function(find, count) {
	                if (find.stop !== null) {
	                    colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
	                    return true;
	                } else {
	                    return false;
	                }
	            }, this);
	        }
	    }, this);
	}

	LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

	// TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )
	LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;

	module.exports = LinearGradientContainer;

	},{"./color":3,"./gradientcontainer":9}],13:[function(_dereq_,module,exports){
	var logger = function() {
	    if (logger.options.logging && window.console && window.console.log) {
	        Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - logger.options.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
	    }
	};

	logger.options = {logging: false};
	module.exports = logger;

	},{}],14:[function(_dereq_,module,exports){
	var Color = _dereq_('./color');
	var utils = _dereq_('./utils');
	var getBounds = utils.getBounds;
	var parseBackgrounds = utils.parseBackgrounds;
	var offsetBounds = utils.offsetBounds;

	function NodeContainer(node, parent) {
	    this.node = node;
	    this.parent = parent;
	    this.stack = null;
	    this.bounds = null;
	    this.borders = null;
	    this.clip = [];
	    this.backgroundClip = [];
	    this.offsetBounds = null;
	    this.visible = null;
	    this.computedStyles = null;
	    this.colors = {};
	    this.styles = {};
	    this.backgroundImages = null;
	    this.transformData = null;
	    this.transformMatrix = null;
	    this.isPseudoElement = false;
	    this.opacity = null;
	}

	NodeContainer.prototype.cloneTo = function(stack) {
	    stack.visible = this.visible;
	    stack.borders = this.borders;
	    stack.bounds = this.bounds;
	    stack.clip = this.clip;
	    stack.backgroundClip = this.backgroundClip;
	    stack.computedStyles = this.computedStyles;
	    stack.styles = this.styles;
	    stack.backgroundImages = this.backgroundImages;
	    stack.opacity = this.opacity;
	};

	NodeContainer.prototype.getOpacity = function() {
	    return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
	};

	NodeContainer.prototype.assignStack = function(stack) {
	    this.stack = stack;
	    stack.children.push(this);
	};

	NodeContainer.prototype.isElementVisible = function() {
	    return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
	        this.css('display') !== "none" &&
	        this.css('visibility') !== "hidden" &&
	        !this.node.hasAttribute("data-html2canvas-ignore") &&
	        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
	    );
	};

	NodeContainer.prototype.css = function(attribute) {
	    if (!this.computedStyles) {
	        this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
	    }

	    return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
	};

	NodeContainer.prototype.prefixedCss = function(attribute) {
	    var prefixes = ["webkit", "moz", "ms", "o"];
	    var value = this.css(attribute);
	    if (value === undefined) {
	        prefixes.some(function(prefix) {
	            value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
	            return value !== undefined;
	        }, this);
	    }
	    return value === undefined ? null : value;
	};

	NodeContainer.prototype.computedStyle = function(type) {
	    return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
	};

	NodeContainer.prototype.cssInt = function(attribute) {
	    var value = parseInt(this.css(attribute), 10);
	    return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
	};

	NodeContainer.prototype.color = function(attribute) {
	    return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
	};

	NodeContainer.prototype.cssFloat = function(attribute) {
	    var value = parseFloat(this.css(attribute));
	    return (isNaN(value)) ? 0 : value;
	};

	NodeContainer.prototype.fontWeight = function() {
	    var weight = this.css("fontWeight");
	    switch(parseInt(weight, 10)){
	    case 401:
	        weight = "bold";
	        break;
	    case 400:
	        weight = "normal";
	        break;
	    }
	    return weight;
	};

	NodeContainer.prototype.parseClip = function() {
	    var matches = this.css('clip').match(this.CLIP);
	    if (matches) {
	        return {
	            top: parseInt(matches[1], 10),
	            right: parseInt(matches[2], 10),
	            bottom: parseInt(matches[3], 10),
	            left: parseInt(matches[4], 10)
	        };
	    }
	    return null;
	};

	NodeContainer.prototype.parseBackgroundImages = function() {
	    return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
	};

	NodeContainer.prototype.cssList = function(property, index) {
	    var value = (this.css(property) || '').split(',');
	    value = value[index || 0] || value[0] || 'auto';
	    value = value.trim().split(' ');
	    if (value.length === 1) {
	        value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
	    }
	    return value;
	};

	NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
	    var size = this.cssList("backgroundSize", index);
	    var width, height;

	    if (isPercentage(size[0])) {
	        width = bounds.width * parseFloat(size[0]) / 100;
	    } else if (/contain|cover/.test(size[0])) {
	        var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
	        return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
	    } else {
	        width = parseInt(size[0], 10);
	    }

	    if (size[0] === 'auto' && size[1] === 'auto') {
	        height = image.height;
	    } else if (size[1] === 'auto') {
	        height = width / image.width * image.height;
	    } else if (isPercentage(size[1])) {
	        height =  bounds.height * parseFloat(size[1]) / 100;
	    } else {
	        height = parseInt(size[1], 10);
	    }

	    if (size[0] === 'auto') {
	        width = height / image.height * image.width;
	    }

	    return {width: width, height: height};
	};

	NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
	    var position = this.cssList('backgroundPosition', index);
	    var left, top;

	    if (isPercentage(position[0])){
	        left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
	    } else {
	        left = parseInt(position[0], 10);
	    }

	    if (position[1] === 'auto') {
	        top = left / image.width * image.height;
	    } else if (isPercentage(position[1])){
	        top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
	    } else {
	        top = parseInt(position[1], 10);
	    }

	    if (position[0] === 'auto') {
	        left = top / image.height * image.width;
	    }

	    return {left: left, top: top};
	};

	NodeContainer.prototype.parseBackgroundRepeat = function(index) {
	    return this.cssList("backgroundRepeat", index)[0];
	};

	NodeContainer.prototype.parseTextShadows = function() {
	    var textShadow = this.css("textShadow");
	    var results = [];

	    if (textShadow && textShadow !== 'none') {
	        var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
	        for (var i = 0; shadows && (i < shadows.length); i++) {
	            var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
	            results.push({
	                color: new Color(s[0]),
	                offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
	                offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
	                blur: s[3] ? s[3].replace('px', '') : 0
	            });
	        }
	    }
	    return results;
	};

	NodeContainer.prototype.parseTransform = function() {
	    if (!this.transformData) {
	        if (this.hasTransform()) {
	            var offset = this.parseBounds();
	            var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
	            origin[0] += offset.left;
	            origin[1] += offset.top;
	            this.transformData = {
	                origin: origin,
	                matrix: this.parseTransformMatrix()
	            };
	        } else {
	            this.transformData = {
	                origin: [0, 0],
	                matrix: [1, 0, 0, 1, 0, 0]
	            };
	        }
	    }
	    return this.transformData;
	};

	NodeContainer.prototype.parseTransformMatrix = function() {
	    if (!this.transformMatrix) {
	        var transform = this.prefixedCss("transform");
	        var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
	        this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
	    }
	    return this.transformMatrix;
	};

	NodeContainer.prototype.parseBounds = function() {
	    return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
	};

	NodeContainer.prototype.hasTransform = function() {
	    return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
	};

	NodeContainer.prototype.getValue = function() {
	    var value = this.node.value || "";
	    if (this.node.tagName === "SELECT") {
	        value = selectionValue(this.node);
	    } else if (this.node.type === "password") {
	        value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
	    }
	    return value.length === 0 ? (this.node.placeholder || "") : value;
	};

	NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
	NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
	NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
	NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

	function selectionValue(node) {
	    var option = node.options[node.selectedIndex || 0];
	    return option ? (option.text || "") : "";
	}

	function parseMatrix(match) {
	    if (match && match[1] === "matrix") {
	        return match[2].split(",").map(function(s) {
	            return parseFloat(s.trim());
	        });
	    } else if (match && match[1] === "matrix3d") {
	        var matrix3d = match[2].split(",").map(function(s) {
	          return parseFloat(s.trim());
	        });
	        return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
	    }
	}

	function isPercentage(value) {
	    return value.toString().indexOf("%") !== -1;
	}

	function removePx(str) {
	    return str.replace("px", "");
	}

	function asFloat(str) {
	    return parseFloat(str);
	}

	module.exports = NodeContainer;

	},{"./color":3,"./utils":26}],15:[function(_dereq_,module,exports){
	var log = _dereq_('./log');
	var punycode = _dereq_('punycode');
	var NodeContainer = _dereq_('./nodecontainer');
	var TextContainer = _dereq_('./textcontainer');
	var PseudoElementContainer = _dereq_('./pseudoelementcontainer');
	var FontMetrics = _dereq_('./fontmetrics');
	var Color = _dereq_('./color');
	var StackingContext = _dereq_('./stackingcontext');
	var utils = _dereq_('./utils');
	var bind = utils.bind;
	var getBounds = utils.getBounds;
	var parseBackgrounds = utils.parseBackgrounds;
	var offsetBounds = utils.offsetBounds;

	function NodeParser(element, renderer, support, imageLoader, options) {
	    log("Starting NodeParser");
	    this.renderer = renderer;
	    this.options = options;
	    this.range = null;
	    this.support = support;
	    this.renderQueue = [];
	    this.stack = new StackingContext(true, 1, element.ownerDocument, null);
	    var parent = new NodeContainer(element, null);
	    if (options.background) {
	        renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
	    }
	    if (element === element.ownerDocument.documentElement) {
	        // http://www.w3.org/TR/css3-background/#special-backgrounds
	        var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
	        renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
	    }
	    parent.visibile = parent.isElementVisible();
	    this.createPseudoHideStyles(element.ownerDocument);
	    this.disableAnimations(element.ownerDocument);
	    this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
	        return container.visible = container.isElementVisible();
	    }).map(this.getPseudoElements, this));
	    this.fontMetrics = new FontMetrics();
	    log("Fetched nodes, total:", this.nodes.length);
	    log("Calculate overflow clips");
	    this.calculateOverflowClips();
	    log("Start fetching images");
	    this.images = imageLoader.fetch(this.nodes.filter(isElement));
	    this.ready = this.images.ready.then(bind(function() {
	        log("Images loaded, starting parsing");
	        log("Creating stacking contexts");
	        this.createStackingContexts();
	        log("Sorting stacking contexts");
	        this.sortStackingContexts(this.stack);
	        this.parse(this.stack);
	        log("Render queue created with " + this.renderQueue.length + " items");
	        return new Promise(bind(function(resolve) {
	            if (!options.async) {
	                this.renderQueue.forEach(this.paint, this);
	                resolve();
	            } else if (typeof(options.async) === "function") {
	                options.async.call(this, this.renderQueue, resolve);
	            } else if (this.renderQueue.length > 0){
	                this.renderIndex = 0;
	                this.asyncRenderer(this.renderQueue, resolve);
	            } else {
	                resolve();
	            }
	        }, this));
	    }, this));
	}

	NodeParser.prototype.calculateOverflowClips = function() {
	    this.nodes.forEach(function(container) {
	        if (isElement(container)) {
	            if (isPseudoElement(container)) {
	                container.appendToDOM();
	            }
	            container.borders = this.parseBorders(container);
	            var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
	            var cssClip = container.parseClip();
	            if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
	                clip.push([["rect",
	                        container.bounds.left + cssClip.left,
	                        container.bounds.top + cssClip.top,
	                        cssClip.right - cssClip.left,
	                        cssClip.bottom - cssClip.top
	                ]]);
	            }
	            container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
	            container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
	            if (isPseudoElement(container)) {
	                container.cleanDOM();
	            }
	        } else if (isTextNode(container)) {
	            container.clip = hasParentClip(container) ? container.parent.clip : [];
	        }
	        if (!isPseudoElement(container)) {
	            container.bounds = null;
	        }
	    }, this);
	};

	function hasParentClip(container) {
	    return container.parent && container.parent.clip.length;
	}

	NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
	    asyncTimer = asyncTimer || Date.now();
	    this.paint(queue[this.renderIndex++]);
	    if (queue.length === this.renderIndex) {
	        resolve();
	    } else if (asyncTimer + 20 > Date.now()) {
	        this.asyncRenderer(queue, resolve, asyncTimer);
	    } else {
	        setTimeout(bind(function() {
	            this.asyncRenderer(queue, resolve);
	        }, this), 0);
	    }
	};

	NodeParser.prototype.createPseudoHideStyles = function(document) {
	    this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
	        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
	};

	NodeParser.prototype.disableAnimations = function(document) {
	    this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
	        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
	};

	NodeParser.prototype.createStyles = function(document, styles) {
	    var hidePseudoElements = document.createElement('style');
	    hidePseudoElements.innerHTML = styles;
	    document.body.appendChild(hidePseudoElements);
	};

	NodeParser.prototype.getPseudoElements = function(container) {
	    var nodes = [[container]];
	    if (container.node.nodeType === Node.ELEMENT_NODE) {
	        var before = this.getPseudoElement(container, ":before");
	        var after = this.getPseudoElement(container, ":after");

	        if (before) {
	            nodes.push(before);
	        }

	        if (after) {
	            nodes.push(after);
	        }
	    }
	    return flatten(nodes);
	};

	function toCamelCase(str) {
	    return str.replace(/(\-[a-z])/g, function(match){
	        return match.toUpperCase().replace('-','');
	    });
	}

	NodeParser.prototype.getPseudoElement = function(container, type) {
	    var style = container.computedStyle(type);
	    if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
	        return null;
	    }

	    var content = stripQuotes(style.content);
	    var isImage = content.substr(0, 3) === 'url';
	    var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
	    var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

	    for (var i = style.length-1; i >= 0; i--) {
	        var property = toCamelCase(style.item(i));
	        pseudoNode.style[property] = style[property];
	    }

	    pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

	    if (isImage) {
	        pseudoNode.src = parseBackgrounds(content)[0].args[0];
	        return [pseudoContainer];
	    } else {
	        var text = document.createTextNode(content);
	        pseudoNode.appendChild(text);
	        return [pseudoContainer, new TextContainer(text, pseudoContainer)];
	    }
	};


	NodeParser.prototype.getChildren = function(parentContainer) {
	    return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
	        var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
	        return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
	    }, this));
	};

	NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
	    var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
	    container.cloneTo(stack);
	    var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
	    parentStack.contexts.push(stack);
	    container.stack = stack;
	};

	NodeParser.prototype.createStackingContexts = function() {
	    this.nodes.forEach(function(container) {
	        if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
	            this.newStackingContext(container, true);
	        } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
	            this.newStackingContext(container, false);
	        } else {
	            container.assignStack(container.parent.stack);
	        }
	    }, this);
	};

	NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
	    return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
	};

	NodeParser.prototype.isRootElement = function(container) {
	    return container.parent === null;
	};

	NodeParser.prototype.sortStackingContexts = function(stack) {
	    stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
	    stack.contexts.forEach(this.sortStackingContexts, this);
	};

	NodeParser.prototype.parseTextBounds = function(container) {
	    return function(text, index, textList) {
	        if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
	            if (this.support.rangeBounds && !container.parent.hasTransform()) {
	                var offset = textList.slice(0, index).join("").length;
	                return this.getRangeBounds(container.node, offset, text.length);
	            } else if (container.node && typeof(container.node.data) === "string") {
	                var replacementNode = container.node.splitText(text.length);
	                var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
	                container.node = replacementNode;
	                return bounds;
	            }
	        } else if(!this.support.rangeBounds || container.parent.hasTransform()){
	            container.node = container.node.splitText(text.length);
	        }
	        return {};
	    };
	};

	NodeParser.prototype.getWrapperBounds = function(node, transform) {
	    var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
	    var parent = node.parentNode,
	        backupText = node.cloneNode(true);

	    wrapper.appendChild(node.cloneNode(true));
	    parent.replaceChild(wrapper, node);
	    var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
	    parent.replaceChild(backupText, wrapper);
	    return bounds;
	};

	NodeParser.prototype.getRangeBounds = function(node, offset, length) {
	    var range = this.range || (this.range = node.ownerDocument.createRange());
	    range.setStart(node, offset);
	    range.setEnd(node, offset + length);
	    return range.getBoundingClientRect();
	};

	function ClearTransform() {}

	NodeParser.prototype.parse = function(stack) {
	    // http://www.w3.org/TR/CSS21/visuren.html#z-index
	    var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
	    var descendantElements = stack.children.filter(isElement);
	    var descendantNonFloats = descendantElements.filter(not(isFloating));
	    var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
	    var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
	    var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
	    var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
	    var text = stack.children.filter(isTextNode).filter(hasText);
	    var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
	    negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
	        .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
	            this.renderQueue.push(container);
	            if (isStackingContext(container)) {
	                this.parse(container);
	                this.renderQueue.push(new ClearTransform());
	            }
	        }, this);
	};

	NodeParser.prototype.paint = function(container) {
	    try {
	        if (container instanceof ClearTransform) {
	            this.renderer.ctx.restore();
	        } else if (isTextNode(container)) {
	            if (isPseudoElement(container.parent)) {
	                container.parent.appendToDOM();
	            }
	            this.paintText(container);
	            if (isPseudoElement(container.parent)) {
	                container.parent.cleanDOM();
	            }
	        } else {
	            this.paintNode(container);
	        }
	    } catch(e) {
	        log(e);
	        if (this.options.strict) {
	            throw e;
	        }
	    }
	};

	NodeParser.prototype.paintNode = function(container) {
	    if (isStackingContext(container)) {
	        this.renderer.setOpacity(container.opacity);
	        this.renderer.ctx.save();
	        if (container.hasTransform()) {
	            this.renderer.setTransform(container.parseTransform());
	        }
	    }

	    if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
	        this.paintCheckbox(container);
	    } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
	        this.paintRadio(container);
	    } else {
	        this.paintElement(container);
	    }
	};

	NodeParser.prototype.paintElement = function(container) {
	    var bounds = container.parseBounds();
	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
	    }, this);

	    this.renderer.clip(container.clip, function() {
	        this.renderer.renderBorders(container.borders.borders);
	    }, this);

	    this.renderer.clip(container.backgroundClip, function() {
	        switch (container.node.nodeName) {
	        case "svg":
	        case "IFRAME":
	            var imgContainer = this.images.get(container.node);
	            if (imgContainer) {
	                this.renderer.renderImage(container, bounds, container.borders, imgContainer);
	            } else {
	                log("Error loading <" + container.node.nodeName + ">", container.node);
	            }
	            break;
	        case "IMG":
	            var imageContainer = this.images.get(container.node.src);
	            if (imageContainer) {
	                this.renderer.renderImage(container, bounds, container.borders, imageContainer);
	            } else {
	                log("Error loading <img>", container.node.src);
	            }
	            break;
	        case "CANVAS":
	            this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
	            break;
	        case "SELECT":
	        case "INPUT":
	        case "TEXTAREA":
	            this.paintFormValue(container);
	            break;
	        }
	    }, this);
	};

	NodeParser.prototype.paintCheckbox = function(container) {
	    var b = container.parseBounds();

	    var size = Math.min(b.width, b.height);
	    var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
	    var r = [3, 3];
	    var radius = [r, r, r, r];
	    var borders = [1,1,1,1].map(function(w) {
	        return {color: new Color('#A5A5A5'), width: w};
	    });

	    var borderPoints = calculateCurvePoints(bounds, radius, borders);

	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
	        this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
	        if (container.node.checked) {
	            this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
	            this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
	        }
	    }, this);
	};

	NodeParser.prototype.paintRadio = function(container) {
	    var bounds = container.parseBounds();

	    var size = Math.min(bounds.width, bounds.height) - 2;

	    this.renderer.clip(container.backgroundClip, function() {
	        this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
	        if (container.node.checked) {
	            this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
	        }
	    }, this);
	};

	NodeParser.prototype.paintFormValue = function(container) {
	    var value = container.getValue();
	    if (value.length > 0) {
	        var document = container.node.ownerDocument;
	        var wrapper = document.createElement('html2canvaswrapper');
	        var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
	            'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
	            'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
	            'boxSizing', 'whiteSpace', 'wordWrap'];

	        properties.forEach(function(property) {
	            try {
	                wrapper.style[property] = container.css(property);
	            } catch(e) {
	                // Older IE has issues with "border"
	                log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
	            }
	        });
	        var bounds = container.parseBounds();
	        wrapper.style.position = "fixed";
	        wrapper.style.left = bounds.left + "px";
	        wrapper.style.top = bounds.top + "px";
	        wrapper.textContent = value;
	        document.body.appendChild(wrapper);
	        this.paintText(new TextContainer(wrapper.firstChild, container));
	        document.body.removeChild(wrapper);
	    }
	};

	NodeParser.prototype.paintText = function(container) {
	    container.applyTextTransform();
	    var characters = punycode.ucs2.decode(container.node.data);
	    var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
	        return punycode.ucs2.encode([character]);
	    });

	    var weight = container.parent.fontWeight();
	    var size = container.parent.css('fontSize');
	    var family = container.parent.css('fontFamily');
	    var shadows = container.parent.parseTextShadows();

	    this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
	    if (shadows.length) {
	        // TODO: support multiple text shadows
	        this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
	    } else {
	        this.renderer.clearShadow();
	    }

	    this.renderer.clip(container.parent.clip, function() {
	        textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
	            if (bounds) {
	                this.renderer.text(textList[index], bounds.left, bounds.bottom);
	                this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
	            }
	        }, this);
	    }, this);
	};

	NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
	    switch(container.css("textDecoration").split(" ")[0]) {
	    case "underline":
	        // Draws a line at the baseline of the font
	        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
	        this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
	        break;
	    case "overline":
	        this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
	        break;
	    case "line-through":
	        // TODO try and find exact position for line-through
	        this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
	        break;
	    }
	};

	var borderColorTransforms = {
	    inset: [
	        ["darken", 0.60],
	        ["darken", 0.10],
	        ["darken", 0.10],
	        ["darken", 0.60]
	    ]
	};

	NodeParser.prototype.parseBorders = function(container) {
	    var nodeBounds = container.parseBounds();
	    var radius = getBorderRadiusData(container);
	    var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
	        var style = container.css('border' + side + 'Style');
	        var color = container.color('border' + side + 'Color');
	        if (style === "inset" && color.isBlack()) {
	            color = new Color([255, 255, 255, color.a]); // this is wrong, but
	        }
	        var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
	        return {
	            width: container.cssInt('border' + side + 'Width'),
	            color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
	            args: null
	        };
	    });
	    var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

	    return {
	        clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
	        borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
	    };
	};

	function calculateBorders(borders, nodeBounds, borderPoints, radius) {
	    return borders.map(function(border, borderSide) {
	        if (border.width > 0) {
	            var bx = nodeBounds.left;
	            var by = nodeBounds.top;
	            var bw = nodeBounds.width;
	            var bh = nodeBounds.height - (borders[2].width);

	            switch(borderSide) {
	            case 0:
	                // top border
	                bh = borders[0].width;
	                border.args = drawSide({
	                        c1: [bx, by],
	                        c2: [bx + bw, by],
	                        c3: [bx + bw - borders[1].width, by + bh],
	                        c4: [bx + borders[3].width, by + bh]
	                    }, radius[0], radius[1],
	                    borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
	                break;
	            case 1:
	                // right border
	                bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
	                bw = borders[1].width;

	                border.args = drawSide({
	                        c1: [bx + bw, by],
	                        c2: [bx + bw, by + bh + borders[2].width],
	                        c3: [bx, by + bh],
	                        c4: [bx, by + borders[0].width]
	                    }, radius[1], radius[2],
	                    borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
	                break;
	            case 2:
	                // bottom border
	                by = (by + nodeBounds.height) - (borders[2].width);
	                bh = borders[2].width;
	                border.args = drawSide({
	                        c1: [bx + bw, by + bh],
	                        c2: [bx, by + bh],
	                        c3: [bx + borders[3].width, by],
	                        c4: [bx + bw - borders[3].width, by]
	                    }, radius[2], radius[3],
	                    borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
	                break;
	            case 3:
	                // left border
	                bw = borders[3].width;
	                border.args = drawSide({
	                        c1: [bx, by + bh + borders[2].width],
	                        c2: [bx, by],
	                        c3: [bx + bw, by + borders[0].width],
	                        c4: [bx + bw, by + bh]
	                    }, radius[3], radius[0],
	                    borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
	                break;
	            }
	        }
	        return border;
	    });
	}

	NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
	    var backgroundClip = container.css('backgroundClip'),
	        borderArgs = [];

	    switch(backgroundClip) {
	    case "content-box":
	    case "padding-box":
	        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
	        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
	        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
	        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
	        break;

	    default:
	        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
	        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
	        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
	        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
	        break;
	    }

	    return borderArgs;
	};

	function getCurvePoints(x, y, r1, r2) {
	    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
	    var ox = (r1) * kappa, // control point offset horizontal
	        oy = (r2) * kappa, // control point offset vertical
	        xm = x + r1, // x-middle
	        ym = y + r2; // y-middle
	    return {
	        topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
	        topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
	        bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
	        bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
	    };
	}

	function calculateCurvePoints(bounds, borderRadius, borders) {
	    var x = bounds.left,
	        y = bounds.top,
	        width = bounds.width,
	        height = bounds.height,

	        tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
	        tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
	        trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
	        trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
	        brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
	        brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
	        blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
	        blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;

	    var topWidth = width - trh,
	        rightHeight = height - brv,
	        bottomWidth = width - brh,
	        leftHeight = height - blv;

	    return {
	        topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
	        topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
	        topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
	        topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
	        bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
	        bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
	        bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
	        bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
	    };
	}

	function bezierCurve(start, startControl, endControl, end) {
	    var lerp = function (a, b, t) {
	        return {
	            x: a.x + (b.x - a.x) * t,
	            y: a.y + (b.y - a.y) * t
	        };
	    };

	    return {
	        start: start,
	        startControl: startControl,
	        endControl: endControl,
	        end: end,
	        subdivide: function(t) {
	            var ab = lerp(start, startControl, t),
	                bc = lerp(startControl, endControl, t),
	                cd = lerp(endControl, end, t),
	                abbc = lerp(ab, bc, t),
	                bccd = lerp(bc, cd, t),
	                dest = lerp(abbc, bccd, t);
	            return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
	        },
	        curveTo: function(borderArgs) {
	            borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
	        },
	        curveToReversed: function(borderArgs) {
	            borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
	        }
	    };
	}

	function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
	    var borderArgs = [];

	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
	        outer1[1].curveTo(borderArgs);
	    } else {
	        borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
	        borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
	        outer2[0].curveTo(borderArgs);
	        borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
	        inner2[0].curveToReversed(borderArgs);
	    } else {
	        borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
	        borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
	    }

	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
	        inner1[1].curveToReversed(borderArgs);
	    } else {
	        borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
	    }

	    return borderArgs;
	}

	function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
	    if (radius1[0] > 0 || radius1[1] > 0) {
	        borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
	        corner1[0].curveTo(borderArgs);
	        corner1[1].curveTo(borderArgs);
	    } else {
	        borderArgs.push(["line", x, y]);
	    }

	    if (radius2[0] > 0 || radius2[1] > 0) {
	        borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
	    }
	}

	function negativeZIndex(container) {
	    return container.cssInt("zIndex") < 0;
	}

	function positiveZIndex(container) {
	    return container.cssInt("zIndex") > 0;
	}

	function zIndex0(container) {
	    return container.cssInt("zIndex") === 0;
	}

	function inlineLevel(container) {
	    return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function isStackingContext(container) {
	    return (container instanceof StackingContext);
	}

	function hasText(container) {
	    return container.node.data.trim().length > 0;
	}

	function noLetterSpacing(container) {
	    return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
	}

	function getBorderRadiusData(container) {
	    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
	        var value = container.css('border' + side + 'Radius');
	        var arr = value.split(" ");
	        if (arr.length <= 1) {
	            arr[1] = arr[0];
	        }
	        return arr.map(asInt);
	    });
	}

	function renderableNode(node) {
	    return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
	}

	function isPositionedForStacking(container) {
	    var position = container.css("position");
	    var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
	    return zIndex !== "auto";
	}

	function isPositioned(container) {
	    return container.css("position") !== "static";
	}

	function isFloating(container) {
	    return container.css("float") !== "none";
	}

	function isInlineBlock(container) {
	    return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
	}

	function not(callback) {
	    var context = this;
	    return function() {
	        return !callback.apply(context, arguments);
	    };
	}

	function isElement(container) {
	    return container.node.nodeType === Node.ELEMENT_NODE;
	}

	function isPseudoElement(container) {
	    return container.isPseudoElement === true;
	}

	function isTextNode(container) {
	    return container.node.nodeType === Node.TEXT_NODE;
	}

	function zIndexSort(contexts) {
	    return function(a, b) {
	        return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
	    };
	}

	function hasOpacity(container) {
	    return container.getOpacity() < 1;
	}

	function asInt(value) {
	    return parseInt(value, 10);
	}

	function getWidth(border) {
	    return border.width;
	}

	function nonIgnoredElement(nodeContainer) {
	    return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
	}

	function flatten(arrays) {
	    return [].concat.apply([], arrays);
	}

	function stripQuotes(content) {
	    var first = content.substr(0, 1);
	    return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
	}

	function getWords(characters) {
	    var words = [], i = 0, onWordBoundary = false, word;
	    while(characters.length) {
	        if (isWordBoundary(characters[i]) === onWordBoundary) {
	            word = characters.splice(0, i);
	            if (word.length) {
	                words.push(punycode.ucs2.encode(word));
	            }
	            onWordBoundary =! onWordBoundary;
	            i = 0;
	        } else {
	            i++;
	        }

	        if (i >= characters.length) {
	            word = characters.splice(0, i);
	            if (word.length) {
	                words.push(punycode.ucs2.encode(word));
	            }
	        }
	    }
	    return words;
	}

	function isWordBoundary(characterCode) {
	    return [
	        32, // <space>
	        13, // \r
	        10, // \n
	        9, // \t
	        45 // -
	    ].indexOf(characterCode) !== -1;
	}

	function hasUnicode(string) {
	    return (/[^\u0000-\u00ff]/).test(string);
	}

	module.exports = NodeParser;

	},{"./color":3,"./fontmetrics":7,"./log":13,"./nodecontainer":14,"./pseudoelementcontainer":18,"./stackingcontext":21,"./textcontainer":25,"./utils":26,"punycode":1}],16:[function(_dereq_,module,exports){
	var XHR = _dereq_('./xhr');
	var utils = _dereq_('./utils');
	var log = _dereq_('./log');
	var createWindowClone = _dereq_('./clone');
	var decode64 = utils.decode64;

	function Proxy(src, proxyUrl, document) {
	    var supportsCORS = ('withCredentials' in new XMLHttpRequest());
	    if (!proxyUrl) {
	        return Promise.reject("No proxy configured");
	    }
	    var callback = createCallback(supportsCORS);
	    var url = createProxyUrl(proxyUrl, src, callback);

	    return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
	        return decode64(response.content);
	    }));
	}
	var proxyCount = 0;

	function ProxyURL(src, proxyUrl, document) {
	    var supportsCORSImage = ('crossOrigin' in new Image());
	    var callback = createCallback(supportsCORSImage);
	    var url = createProxyUrl(proxyUrl, src, callback);
	    return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
	        return "data:" + response.type + ";base64," + response.content;
	    }));
	}

	function jsonp(document, url, callback) {
	    return new Promise(function(resolve, reject) {
	        var s = document.createElement("script");
	        var cleanup = function() {
	            delete window.html2canvas.proxy[callback];
	            document.body.removeChild(s);
	        };
	        window.html2canvas.proxy[callback] = function(response) {
	            cleanup();
	            resolve(response);
	        };
	        s.src = url;
	        s.onerror = function(e) {
	            cleanup();
	            reject(e);
	        };
	        document.body.appendChild(s);
	    });
	}

	function createCallback(useCORS) {
	    return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
	}

	function createProxyUrl(proxyUrl, src, callback) {
	    return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
	}

	function documentFromHTML(src) {
	    return function(html) {
	        var parser = new DOMParser(), doc;
	        try {
	            doc = parser.parseFromString(html, "text/html");
	        } catch(e) {
	            log("DOMParser not supported, falling back to createHTMLDocument");
	            doc = document.implementation.createHTMLDocument("");
	            try {
	                doc.open();
	                doc.write(html);
	                doc.close();
	            } catch(ee) {
	                log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
	                doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
	            }
	        }

	        var b = doc.querySelector("base");
	        if (!b || !b.href.host) {
	            var base = doc.createElement("base");
	            base.href = src;
	            doc.head.insertBefore(base, doc.head.firstChild);
	        }

	        return doc;
	    };
	}

	function loadUrlDocument(src, proxy, document, width, height, options) {
	    return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
	        return createWindowClone(doc, document, width, height, options, 0, 0);
	    });
	}

	exports.Proxy = Proxy;
	exports.ProxyURL = ProxyURL;
	exports.loadUrlDocument = loadUrlDocument;

	},{"./clone":2,"./log":13,"./utils":26,"./xhr":28}],17:[function(_dereq_,module,exports){
	var ProxyURL = _dereq_('./proxy').ProxyURL;

	function ProxyImageContainer(src, proxy) {
	    var link = document.createElement("a");
	    link.href = src;
	    src = link.href;
	    this.src = src;
	    this.image = new Image();
	    var self = this;
	    this.promise = new Promise(function(resolve, reject) {
	        self.image.crossOrigin = "Anonymous";
	        self.image.onload = resolve;
	        self.image.onerror = reject;

	        new ProxyURL(src, proxy, document).then(function(url) {
	            self.image.src = url;
	        })['catch'](reject);
	    });
	}

	module.exports = ProxyImageContainer;

	},{"./proxy":16}],18:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function PseudoElementContainer(node, parent, type) {
	    NodeContainer.call(this, node, parent);
	    this.isPseudoElement = true;
	    this.before = type === ":before";
	}

	PseudoElementContainer.prototype.cloneTo = function(stack) {
	    PseudoElementContainer.prototype.cloneTo.call(this, stack);
	    stack.isPseudoElement = true;
	    stack.before = this.before;
	};

	PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

	PseudoElementContainer.prototype.appendToDOM = function() {
	    if (this.before) {
	        this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
	    } else {
	        this.parent.node.appendChild(this.node);
	    }
	    this.parent.node.className += " " + this.getHideClass();
	};

	PseudoElementContainer.prototype.cleanDOM = function() {
	    this.node.parentNode.removeChild(this.node);
	    this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
	};

	PseudoElementContainer.prototype.getHideClass = function() {
	    return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
	};

	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
	PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

	module.exports = PseudoElementContainer;

	},{"./nodecontainer":14}],19:[function(_dereq_,module,exports){
	var log = _dereq_('./log');

	function Renderer(width, height, images, options, document) {
	    this.width = width;
	    this.height = height;
	    this.images = images;
	    this.options = options;
	    this.document = document;
	}

	Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
	    var paddingLeft = container.cssInt('paddingLeft'),
	        paddingTop = container.cssInt('paddingTop'),
	        paddingRight = container.cssInt('paddingRight'),
	        paddingBottom = container.cssInt('paddingBottom'),
	        borders = borderData.borders;

	    var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
	    var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
	    this.drawImage(
	        imageContainer,
	        0,
	        0,
	        imageContainer.image.width || width,
	        imageContainer.image.height || height,
	        bounds.left + paddingLeft + borders[3].width,
	        bounds.top + paddingTop + borders[0].width,
	        width,
	        height
	    );
	};

	Renderer.prototype.renderBackground = function(container, bounds, borderData) {
	    if (bounds.height > 0 && bounds.width > 0) {
	        this.renderBackgroundColor(container, bounds);
	        this.renderBackgroundImage(container, bounds, borderData);
	    }
	};

	Renderer.prototype.renderBackgroundColor = function(container, bounds) {
	    var color = container.color("backgroundColor");
	    if (!color.isTransparent()) {
	        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
	    }
	};

	Renderer.prototype.renderBorders = function(borders) {
	    borders.forEach(this.renderBorder, this);
	};

	Renderer.prototype.renderBorder = function(data) {
	    if (!data.color.isTransparent() && data.args !== null) {
	        this.drawShape(data.args, data.color);
	    }
	};

	Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
	    var backgroundImages = container.parseBackgroundImages();
	    backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
	        switch(backgroundImage.method) {
	        case "url":
	            var image = this.images.get(backgroundImage.args[0]);
	            if (image) {
	                this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
	            } else {
	                log("Error loading background-image", backgroundImage.args[0]);
	            }
	            break;
	        case "linear-gradient":
	        case "gradient":
	            var gradientImage = this.images.get(backgroundImage.value);
	            if (gradientImage) {
	                this.renderBackgroundGradient(gradientImage, bounds, borderData);
	            } else {
	                log("Error loading background-image", backgroundImage.args[0]);
	            }
	            break;
	        case "none":
	            break;
	        default:
	            log("Unknown background-image type", backgroundImage.args[0]);
	        }
	    }, this);
	};

	Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
	    var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
	    var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
	    var repeat = container.parseBackgroundRepeat(index);
	    switch (repeat) {
	    case "repeat-x":
	    case "repeat no-repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
	        break;
	    case "repeat-y":
	    case "no-repeat repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
	        break;
	    case "no-repeat":
	        this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
	        break;
	    default:
	        this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
	        break;
	    }
	};

	module.exports = Renderer;

	},{"./log":13}],20:[function(_dereq_,module,exports){
	var Renderer = _dereq_('../renderer');
	var LinearGradientContainer = _dereq_('../lineargradientcontainer');
	var log = _dereq_('../log');

	function CanvasRenderer(width, height) {
	    Renderer.apply(this, arguments);
	    this.canvas = this.options.canvas || this.document.createElement("canvas");
	    if (!this.options.canvas) {
	        this.canvas.width = width;
	        this.canvas.height = height;
	    }
	    this.ctx = this.canvas.getContext("2d");
	    this.taintCtx = this.document.createElement("canvas").getContext("2d");
	    this.ctx.textBaseline = "bottom";
	    this.variables = {};
	    log("Initialized CanvasRenderer with size", width, "x", height);
	}

	CanvasRenderer.prototype = Object.create(Renderer.prototype);

	CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
	    this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
	    return this.ctx;
	};

	CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
	    this.setFillStyle(color).fillRect(left, top, width, height);
	};

	CanvasRenderer.prototype.circle = function(left, top, size, color) {
	    this.setFillStyle(color);
	    this.ctx.beginPath();
	    this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
	    this.ctx.closePath();
	    this.ctx.fill();
	};

	CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
	    this.circle(left, top, size, color);
	    this.ctx.strokeStyle = strokeColor.toString();
	    this.ctx.stroke();
	};

	CanvasRenderer.prototype.drawShape = function(shape, color) {
	    this.shape(shape);
	    this.setFillStyle(color).fill();
	};

	CanvasRenderer.prototype.taints = function(imageContainer) {
	    if (imageContainer.tainted === null) {
	        this.taintCtx.drawImage(imageContainer.image, 0, 0);
	        try {
	            this.taintCtx.getImageData(0, 0, 1, 1);
	            imageContainer.tainted = false;
	        } catch(e) {
	            this.taintCtx = document.createElement("canvas").getContext("2d");
	            imageContainer.tainted = true;
	        }
	    }

	    return imageContainer.tainted;
	};

	CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
	    if (!this.taints(imageContainer) || this.options.allowTaint) {
	        this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
	    }
	};

	CanvasRenderer.prototype.clip = function(shapes, callback, context) {
	    this.ctx.save();
	    shapes.filter(hasEntries).forEach(function(shape) {
	        this.shape(shape).clip();
	    }, this);
	    callback.call(context);
	    this.ctx.restore();
	};

	CanvasRenderer.prototype.shape = function(shape) {
	    this.ctx.beginPath();
	    shape.forEach(function(point, index) {
	        if (point[0] === "rect") {
	            this.ctx.rect.apply(this.ctx, point.slice(1));
	        } else {
	            this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
	        }
	    }, this);
	    this.ctx.closePath();
	    return this.ctx;
	};

	CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
	    this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
	};

	CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
	    this.setVariable("shadowColor", color.toString())
	        .setVariable("shadowOffsetY", offsetX)
	        .setVariable("shadowOffsetX", offsetY)
	        .setVariable("shadowBlur", blur);
	};

	CanvasRenderer.prototype.clearShadow = function() {
	    this.setVariable("shadowColor", "rgba(0,0,0,0)");
	};

	CanvasRenderer.prototype.setOpacity = function(opacity) {
	    this.ctx.globalAlpha = opacity;
	};

	CanvasRenderer.prototype.setTransform = function(transform) {
	    this.ctx.translate(transform.origin[0], transform.origin[1]);
	    this.ctx.transform.apply(this.ctx, transform.matrix);
	    this.ctx.translate(-transform.origin[0], -transform.origin[1]);
	};

	CanvasRenderer.prototype.setVariable = function(property, value) {
	    if (this.variables[property] !== value) {
	        this.variables[property] = this.ctx[property] = value;
	    }

	    return this;
	};

	CanvasRenderer.prototype.text = function(text, left, bottom) {
	    this.ctx.fillText(text, left, bottom);
	};

	CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
	    var shape = [
	        ["line", Math.round(left), Math.round(top)],
	        ["line", Math.round(left + width), Math.round(top)],
	        ["line", Math.round(left + width), Math.round(height + top)],
	        ["line", Math.round(left), Math.round(height + top)]
	    ];
	    this.clip([shape], function() {
	        this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
	    }, this);
	};

	CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
	    var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
	    this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
	    this.ctx.translate(offsetX, offsetY);
	    this.ctx.fill();
	    this.ctx.translate(-offsetX, -offsetY);
	};

	CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
	    if (gradientImage instanceof LinearGradientContainer) {
	        var gradient = this.ctx.createLinearGradient(
	            bounds.left + bounds.width * gradientImage.x0,
	            bounds.top + bounds.height * gradientImage.y0,
	            bounds.left +  bounds.width * gradientImage.x1,
	            bounds.top +  bounds.height * gradientImage.y1);
	        gradientImage.colorStops.forEach(function(colorStop) {
	            gradient.addColorStop(colorStop.stop, colorStop.color.toString());
	        });
	        this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
	    }
	};

	CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
	    var image = imageContainer.image;
	    if(image.width === size.width && image.height === size.height) {
	        return image;
	    }

	    var ctx, canvas = document.createElement('canvas');
	    canvas.width = size.width;
	    canvas.height = size.height;
	    ctx = canvas.getContext("2d");
	    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
	    return canvas;
	};

	function hasEntries(array) {
	    return array.length > 0;
	}

	module.exports = CanvasRenderer;

	},{"../lineargradientcontainer":12,"../log":13,"../renderer":19}],21:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function StackingContext(hasOwnStacking, opacity, element, parent) {
	    NodeContainer.call(this, element, parent);
	    this.ownStacking = hasOwnStacking;
	    this.contexts = [];
	    this.children = [];
	    this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
	}

	StackingContext.prototype = Object.create(NodeContainer.prototype);

	StackingContext.prototype.getParentStack = function(context) {
	    var parentStack = (this.parent) ? this.parent.stack : null;
	    return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
	};

	module.exports = StackingContext;

	},{"./nodecontainer":14}],22:[function(_dereq_,module,exports){
	function Support(document) {
	    this.rangeBounds = this.testRangeBounds(document);
	    this.cors = this.testCORS();
	    this.svg = this.testSVG();
	}

	Support.prototype.testRangeBounds = function(document) {
	    var range, testElement, rangeBounds, rangeHeight, support = false;

	    if (document.createRange) {
	        range = document.createRange();
	        if (range.getBoundingClientRect) {
	            testElement = document.createElement('boundtest');
	            testElement.style.height = "123px";
	            testElement.style.display = "block";
	            document.body.appendChild(testElement);

	            range.selectNode(testElement);
	            rangeBounds = range.getBoundingClientRect();
	            rangeHeight = rangeBounds.height;

	            if (rangeHeight === 123) {
	                support = true;
	            }
	            document.body.removeChild(testElement);
	        }
	    }

	    return support;
	};

	Support.prototype.testCORS = function() {
	    return typeof((new Image()).crossOrigin) !== "undefined";
	};

	Support.prototype.testSVG = function() {
	    var img = new Image();
	    var canvas = document.createElement("canvas");
	    var ctx =  canvas.getContext("2d");
	    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

	    try {
	        ctx.drawImage(img, 0, 0);
	        canvas.toDataURL();
	    } catch(e) {
	        return false;
	    }
	    return true;
	};

	module.exports = Support;

	},{}],23:[function(_dereq_,module,exports){
	var XHR = _dereq_('./xhr');
	var decode64 = _dereq_('./utils').decode64;

	function SVGContainer(src) {
	    this.src = src;
	    this.image = null;
	    var self = this;

	    this.promise = this.hasFabric().then(function() {
	        return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
	    }).then(function(svg) {
	        return new Promise(function(resolve) {
	            window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
	        });
	    });
	}

	SVGContainer.prototype.hasFabric = function() {
	    return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
	};

	SVGContainer.prototype.inlineFormatting = function(src) {
	    return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
	};

	SVGContainer.prototype.removeContentType = function(src) {
	    return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
	};

	SVGContainer.prototype.isInline = function(src) {
	    return (/^data:image\/svg\+xml/i.test(src));
	};

	SVGContainer.prototype.createCanvas = function(resolve) {
	    var self = this;
	    return function (objects, options) {
	        var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
	        self.image = canvas.lowerCanvasEl;
	        canvas
	            .setWidth(options.width)
	            .setHeight(options.height)
	            .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
	            .renderAll();
	        resolve(canvas.lowerCanvasEl);
	    };
	};

	SVGContainer.prototype.decode64 = function(str) {
	    return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
	};

	module.exports = SVGContainer;

	},{"./utils":26,"./xhr":28}],24:[function(_dereq_,module,exports){
	var SVGContainer = _dereq_('./svgcontainer');

	function SVGNodeContainer(node, _native) {
	    this.src = node;
	    this.image = null;
	    var self = this;

	    this.promise = _native ? new Promise(function(resolve, reject) {
	        self.image = new Image();
	        self.image.onload = resolve;
	        self.image.onerror = reject;
	        self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
	        if (self.image.complete === true) {
	            resolve(self.image);
	        }
	    }) : this.hasFabric().then(function() {
	        return new Promise(function(resolve) {
	            window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
	        });
	    });
	}

	SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

	module.exports = SVGNodeContainer;

	},{"./svgcontainer":23}],25:[function(_dereq_,module,exports){
	var NodeContainer = _dereq_('./nodecontainer');

	function TextContainer(node, parent) {
	    NodeContainer.call(this, node, parent);
	}

	TextContainer.prototype = Object.create(NodeContainer.prototype);

	TextContainer.prototype.applyTextTransform = function() {
	    this.node.data = this.transform(this.parent.css("textTransform"));
	};

	TextContainer.prototype.transform = function(transform) {
	    var text = this.node.data;
	    switch(transform){
	        case "lowercase":
	            return text.toLowerCase();
	        case "capitalize":
	            return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
	        case "uppercase":
	            return text.toUpperCase();
	        default:
	            return text;
	    }
	};

	function capitalize(m, p1, p2) {
	    if (m.length > 0) {
	        return p1 + p2.toUpperCase();
	    }
	}

	module.exports = TextContainer;

	},{"./nodecontainer":14}],26:[function(_dereq_,module,exports){
	exports.smallImage = function smallImage() {
	    return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
	};

	exports.bind = function(callback, context) {
	    return function() {
	        return callback.apply(context, arguments);
	    };
	};

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */

	exports.decode64 = function(base64) {
	    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	    var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

	    var output = "";

	    for (i = 0; i < len; i+=4) {
	        encoded1 = chars.indexOf(base64[i]);
	        encoded2 = chars.indexOf(base64[i+1]);
	        encoded3 = chars.indexOf(base64[i+2]);
	        encoded4 = chars.indexOf(base64[i+3]);

	        byte1 = (encoded1 << 2) | (encoded2 >> 4);
	        byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	        byte3 = ((encoded3 & 3) << 6) | encoded4;
	        if (encoded3 === 64) {
	            output += String.fromCharCode(byte1);
	        } else if (encoded4 === 64 || encoded4 === -1) {
	            output += String.fromCharCode(byte1, byte2);
	        } else{
	            output += String.fromCharCode(byte1, byte2, byte3);
	        }
	    }

	    return output;
	};

	exports.getBounds = function(node) {
	    if (node.getBoundingClientRect) {
	        var clientRect = node.getBoundingClientRect();
	        var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
	        return {
	            top: clientRect.top,
	            bottom: clientRect.bottom || (clientRect.top + clientRect.height),
	            right: clientRect.left + width,
	            left: clientRect.left,
	            width:  width,
	            height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
	        };
	    }
	    return {};
	};

	exports.offsetBounds = function(node) {
	    var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

	    return {
	        top: node.offsetTop + parent.top,
	        bottom: node.offsetTop + node.offsetHeight + parent.top,
	        right: node.offsetLeft + parent.left + node.offsetWidth,
	        left: node.offsetLeft + parent.left,
	        width: node.offsetWidth,
	        height: node.offsetHeight
	    };
	};

	exports.parseBackgrounds = function(backgroundImage) {
	    var whitespace = ' \r\n\t',
	        method, definition, prefix, prefix_i, block, results = [],
	        mode = 0, numParen = 0, quote, args;
	    var appendResult = function() {
	        if(method) {
	            if (definition.substr(0, 1) === '"') {
	                definition = definition.substr(1, definition.length - 2);
	            }
	            if (definition) {
	                args.push(definition);
	            }
	            if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
	                prefix = method.substr(0, prefix_i);
	                method = method.substr(prefix_i);
	            }
	            results.push({
	                prefix: prefix,
	                method: method.toLowerCase(),
	                value: block,
	                args: args,
	                image: null
	            });
	        }
	        args = [];
	        method = prefix = definition = block = '';
	    };
	    args = [];
	    method = prefix = definition = block = '';
	    backgroundImage.split("").forEach(function(c) {
	        if (mode === 0 && whitespace.indexOf(c) > -1) {
	            return;
	        }
	        switch(c) {
	        case '"':
	            if(!quote) {
	                quote = c;
	            } else if(quote === c) {
	                quote = null;
	            }
	            break;
	        case '(':
	            if(quote) {
	                break;
	            } else if(mode === 0) {
	                mode = 1;
	                block += c;
	                return;
	            } else {
	                numParen++;
	            }
	            break;
	        case ')':
	            if (quote) {
	                break;
	            } else if(mode === 1) {
	                if(numParen === 0) {
	                    mode = 0;
	                    block += c;
	                    appendResult();
	                    return;
	                } else {
	                    numParen--;
	                }
	            }
	            break;

	        case ',':
	            if (quote) {
	                break;
	            } else if(mode === 0) {
	                appendResult();
	                return;
	            } else if (mode === 1) {
	                if (numParen === 0 && !method.match(/^url$/i)) {
	                    args.push(definition);
	                    definition = '';
	                    block += c;
	                    return;
	                }
	            }
	            break;
	        }

	        block += c;
	        if (mode === 0) {
	            method += c;
	        } else {
	            definition += c;
	        }
	    });

	    appendResult();
	    return results;
	};

	},{}],27:[function(_dereq_,module,exports){
	var GradientContainer = _dereq_('./gradientcontainer');

	function WebkitGradientContainer(imageData) {
	    GradientContainer.apply(this, arguments);
	    this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
	}

	WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

	module.exports = WebkitGradientContainer;

	},{"./gradientcontainer":9}],28:[function(_dereq_,module,exports){
	function XHR(url) {
	    return new Promise(function(resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url);

	        xhr.onload = function() {
	            if (xhr.status === 200) {
	                resolve(xhr.responseText);
	            } else {
	                reject(new Error(xhr.statusText));
	            }
	        };

	        xhr.onerror = function() {
	            reject(new Error("Network Error"));
	        };

	        xhr.send();
	    });
	}

	module.exports = XHR;

	},{}]},{},[4])(4)
	});
	});

	/*
		Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
		http://www.phpied.com/rgb-color-parser-in-javascript/
	*/

	var rgbcolor = function(color_string) {
	    this.ok = false;
	    this.alpha = 1.0;

	    // strip any leading #
	    if (color_string.charAt(0) == '#') { // remove # if any
	        color_string = color_string.substr(1,6);
	    }

	    color_string = color_string.replace(/ /g,'');
	    color_string = color_string.toLowerCase();

	    // before getting into regexps, try simple matches
	    // and overwrite the input
	    var simple_colors = {
	        aliceblue: 'f0f8ff',
	        antiquewhite: 'faebd7',
	        aqua: '00ffff',
	        aquamarine: '7fffd4',
	        azure: 'f0ffff',
	        beige: 'f5f5dc',
	        bisque: 'ffe4c4',
	        black: '000000',
	        blanchedalmond: 'ffebcd',
	        blue: '0000ff',
	        blueviolet: '8a2be2',
	        brown: 'a52a2a',
	        burlywood: 'deb887',
	        cadetblue: '5f9ea0',
	        chartreuse: '7fff00',
	        chocolate: 'd2691e',
	        coral: 'ff7f50',
	        cornflowerblue: '6495ed',
	        cornsilk: 'fff8dc',
	        crimson: 'dc143c',
	        cyan: '00ffff',
	        darkblue: '00008b',
	        darkcyan: '008b8b',
	        darkgoldenrod: 'b8860b',
	        darkgray: 'a9a9a9',
	        darkgreen: '006400',
	        darkkhaki: 'bdb76b',
	        darkmagenta: '8b008b',
	        darkolivegreen: '556b2f',
	        darkorange: 'ff8c00',
	        darkorchid: '9932cc',
	        darkred: '8b0000',
	        darksalmon: 'e9967a',
	        darkseagreen: '8fbc8f',
	        darkslateblue: '483d8b',
	        darkslategray: '2f4f4f',
	        darkturquoise: '00ced1',
	        darkviolet: '9400d3',
	        deeppink: 'ff1493',
	        deepskyblue: '00bfff',
	        dimgray: '696969',
	        dodgerblue: '1e90ff',
	        feldspar: 'd19275',
	        firebrick: 'b22222',
	        floralwhite: 'fffaf0',
	        forestgreen: '228b22',
	        fuchsia: 'ff00ff',
	        gainsboro: 'dcdcdc',
	        ghostwhite: 'f8f8ff',
	        gold: 'ffd700',
	        goldenrod: 'daa520',
	        gray: '808080',
	        green: '008000',
	        greenyellow: 'adff2f',
	        honeydew: 'f0fff0',
	        hotpink: 'ff69b4',
	        indianred : 'cd5c5c',
	        indigo : '4b0082',
	        ivory: 'fffff0',
	        khaki: 'f0e68c',
	        lavender: 'e6e6fa',
	        lavenderblush: 'fff0f5',
	        lawngreen: '7cfc00',
	        lemonchiffon: 'fffacd',
	        lightblue: 'add8e6',
	        lightcoral: 'f08080',
	        lightcyan: 'e0ffff',
	        lightgoldenrodyellow: 'fafad2',
	        lightgrey: 'd3d3d3',
	        lightgreen: '90ee90',
	        lightpink: 'ffb6c1',
	        lightsalmon: 'ffa07a',
	        lightseagreen: '20b2aa',
	        lightskyblue: '87cefa',
	        lightslateblue: '8470ff',
	        lightslategray: '778899',
	        lightsteelblue: 'b0c4de',
	        lightyellow: 'ffffe0',
	        lime: '00ff00',
	        limegreen: '32cd32',
	        linen: 'faf0e6',
	        magenta: 'ff00ff',
	        maroon: '800000',
	        mediumaquamarine: '66cdaa',
	        mediumblue: '0000cd',
	        mediumorchid: 'ba55d3',
	        mediumpurple: '9370d8',
	        mediumseagreen: '3cb371',
	        mediumslateblue: '7b68ee',
	        mediumspringgreen: '00fa9a',
	        mediumturquoise: '48d1cc',
	        mediumvioletred: 'c71585',
	        midnightblue: '191970',
	        mintcream: 'f5fffa',
	        mistyrose: 'ffe4e1',
	        moccasin: 'ffe4b5',
	        navajowhite: 'ffdead',
	        navy: '000080',
	        oldlace: 'fdf5e6',
	        olive: '808000',
	        olivedrab: '6b8e23',
	        orange: 'ffa500',
	        orangered: 'ff4500',
	        orchid: 'da70d6',
	        palegoldenrod: 'eee8aa',
	        palegreen: '98fb98',
	        paleturquoise: 'afeeee',
	        palevioletred: 'd87093',
	        papayawhip: 'ffefd5',
	        peachpuff: 'ffdab9',
	        peru: 'cd853f',
	        pink: 'ffc0cb',
	        plum: 'dda0dd',
	        powderblue: 'b0e0e6',
	        purple: '800080',
	        red: 'ff0000',
	        rosybrown: 'bc8f8f',
	        royalblue: '4169e1',
	        saddlebrown: '8b4513',
	        salmon: 'fa8072',
	        sandybrown: 'f4a460',
	        seagreen: '2e8b57',
	        seashell: 'fff5ee',
	        sienna: 'a0522d',
	        silver: 'c0c0c0',
	        skyblue: '87ceeb',
	        slateblue: '6a5acd',
	        slategray: '708090',
	        snow: 'fffafa',
	        springgreen: '00ff7f',
	        steelblue: '4682b4',
	        tan: 'd2b48c',
	        teal: '008080',
	        thistle: 'd8bfd8',
	        tomato: 'ff6347',
	        turquoise: '40e0d0',
	        violet: 'ee82ee',
	        violetred: 'd02090',
	        wheat: 'f5deb3',
	        white: 'ffffff',
	        whitesmoke: 'f5f5f5',
	        yellow: 'ffff00',
	        yellowgreen: '9acd32'
	    };
	    color_string = simple_colors[color_string] || color_string;
	    // emd of simple type-in colors

	    // array of color definition objects
	    var color_defs = [
	        {
	            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
	            example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
	            process: function (bits){
	                return [
	                    parseInt(bits[1]),
	                    parseInt(bits[2]),
	                    parseInt(bits[3]),
	                    parseFloat(bits[4])
	                ];
	            }
	        },
	        {
	            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
	            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
	            process: function (bits){
	                return [
	                    parseInt(bits[1]),
	                    parseInt(bits[2]),
	                    parseInt(bits[3])
	                ];
	            }
	        },
	        {
	            re: /^(\w{2})(\w{2})(\w{2})$/,
	            example: ['#00ff00', '336699'],
	            process: function (bits){
	                return [
	                    parseInt(bits[1], 16),
	                    parseInt(bits[2], 16),
	                    parseInt(bits[3], 16)
	                ];
	            }
	        },
	        {
	            re: /^(\w{1})(\w{1})(\w{1})$/,
	            example: ['#fb0', 'f0f'],
	            process: function (bits){
	                return [
	                    parseInt(bits[1] + bits[1], 16),
	                    parseInt(bits[2] + bits[2], 16),
	                    parseInt(bits[3] + bits[3], 16)
	                ];
	            }
	        }
	    ];

	    // search through the definitions to find a match
	    for (var i = 0; i < color_defs.length; i++) {
	        var re = color_defs[i].re;
	        var processor = color_defs[i].process;
	        var bits = re.exec(color_string);
	        if (bits) {
	            var channels = processor(bits);
	            this.r = channels[0];
	            this.g = channels[1];
	            this.b = channels[2];
	            if (channels.length > 3) {
	                this.alpha = channels[3];
	            }
	            this.ok = true;
	        }

	    }

	    // validate/cleanup values
	    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
	    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
	    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
	    this.alpha = (this.alpha < 0) ? 0 : ((this.alpha > 1.0 || isNaN(this.alpha)) ? 1.0 : this.alpha);

	    // some getters
	    this.toRGB = function () {
	        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
	    };
	    this.toRGBA = function () {
	        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
	    };
	    this.toHex = function () {
	        var r = this.r.toString(16);
	        var g = this.g.toString(16);
	        var b = this.b.toString(16);
	        if (r.length == 1) { r = '0' + r; }
	        if (g.length == 1) { g = '0' + g; }
	        if (b.length == 1) { b = '0' + b; }
	        return '#' + r + g + b;
	    };

	    // help
	    this.getHelpXML = function () {

	        var examples = new Array();
	        // add regexps
	        for (var i = 0; i < color_defs.length; i++) {
	            var example = color_defs[i].example;
	            for (var j = 0; j < example.length; j++) {
	                examples[examples.length] = example[j];
	            }
	        }
	        // add type-in colors
	        for (var sc in simple_colors) {
	            examples[examples.length] = sc;
	        }

	        var xml = document.createElement('ul');
	        xml.setAttribute('id', 'rgbcolor-examples');
	        for (var i = 0; i < examples.length; i++) {
	            try {
	                var list_item = document.createElement('li');
	                var list_color = new RGBColor(examples[i]);
	                var example_div = document.createElement('div');
	                example_div.style.cssText =
	                        'margin: 3px; '
	                        + 'border: 1px solid black; '
	                        + 'background:' + list_color.toHex() + '; '
	                        + 'color:' + list_color.toHex()
	                ;
	                example_div.appendChild(document.createTextNode('test'));
	                var list_item_value = document.createTextNode(
	                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
	                );
	                list_item.appendChild(example_div);
	                list_item.appendChild(list_item_value);
	                xml.appendChild(list_item);

	            } catch(e){}
	        }
	        return xml;

	    };

	};

	/*

	StackBlur - a fast almost Gaussian Blur For Canvas

	Version: 	0.5
	Author:		Mario Klingemann
	Contact: 	mario@quasimondo.com
	Website:	http://www.quasimondo.com/StackBlurForCanvas
	Twitter:	@quasimondo

	In case you find this class useful - especially in commercial projects -
	I am not totally unhappy for a small donation to my PayPal account
	mario@quasimondo.de

	Or support me on flattr: 
	https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

	Copyright (c) 2010 Mario Klingemann

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use,
	copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following
	conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
	HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	*/

	var mul_table = [
	        512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
	        454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
	        482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
	        437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
	        497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
	        320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
	        446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
	        329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
	        505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
	        399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
	        324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
	        268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
	        451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
	        385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
	        332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
	        289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
	        
	   
	var shg_table = [
		     9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 
			17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 
			19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
			20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 
			23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];

	function blur( pixels, width, height, radius )
	{
		if ( isNaN(radius) || radius < 1 ) { return; }
		radius |= 0;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, 
		r_out_sum, g_out_sum, b_out_sum, a_out_sum,
		r_in_sum, g_in_sum, b_in_sum, a_in_sum, 
		pr, pg, pb, pa, rbs;
				
		var div = radius + radius + 1;
		var widthMinus1  = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1  = radius + 1;
		var sumFactor = radiusPlus1 * ( radiusPlus1 + 1 ) / 2;
		
		var stackStart = new BlurStack();
		var stack = stackStart;
		for ( i = 1; i < div; i++ )
		{
			stack = stack.next = new BlurStack();
			if ( i == radiusPlus1 ) { var stackEnd = stack; }
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;
		
		yw = yi = 0;
		
		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];
		
		for ( y = 0; y < height; y++ )
		{
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
			
			r_out_sum = radiusPlus1 * ( pr = pixels[yi] );
			g_out_sum = radiusPlus1 * ( pg = pixels[yi+1] );
			b_out_sum = radiusPlus1 * ( pb = pixels[yi+2] );
			a_out_sum = radiusPlus1 * ( pa = pixels[yi+3] );
			
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;
			
			stack = stackStart;
			
			for( i = 0; i < radiusPlus1; i++ )
			{
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}
			
			for( i = 1; i < radiusPlus1; i++ )
			{
				p = yi + (( widthMinus1 < i ? widthMinus1 : i ) << 2 );
				r_sum += ( stack.r = ( pr = pixels[p])) * ( rbs = radiusPlus1 - i );
				g_sum += ( stack.g = ( pg = pixels[p+1])) * rbs;
				b_sum += ( stack.b = ( pb = pixels[p+2])) * rbs;
				a_sum += ( stack.a = ( pa = pixels[p+3])) * rbs;
				
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;
				
				stack = stack.next;
			}
			
			
			stackIn = stackStart;
			stackOut = stackEnd;
			for ( x = 0; x < width; x++ )
			{
				pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
				if ( pa != 0 )
				{
					pa = 255 / pa;
					pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
					pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
					pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
				}
				
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;
				
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;
				
				p =  ( yw + ( ( p = x + radius + 1 ) < widthMinus1 ? p : widthMinus1 ) ) << 2;
				
				r_in_sum += ( stackIn.r = pixels[p]);
				g_in_sum += ( stackIn.g = pixels[p+1]);
				b_in_sum += ( stackIn.b = pixels[p+2]);
				a_in_sum += ( stackIn.a = pixels[p+3]);
				
				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;
				
				stackIn = stackIn.next;
				
				r_out_sum += ( pr = stackOut.r );
				g_out_sum += ( pg = stackOut.g );
				b_out_sum += ( pb = stackOut.b );
				a_out_sum += ( pa = stackOut.a );
				
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;
				
				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		
		for ( x = 0; x < width; x++ )
		{
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
			
			yi = x << 2;
			r_out_sum = radiusPlus1 * ( pr = pixels[yi]);
			g_out_sum = radiusPlus1 * ( pg = pixels[yi+1]);
			b_out_sum = radiusPlus1 * ( pb = pixels[yi+2]);
			a_out_sum = radiusPlus1 * ( pa = pixels[yi+3]);
			
			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;
			
			stack = stackStart;
			
			for( i = 0; i < radiusPlus1; i++ )
			{
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}
			
			yp = width;
			
			for( i = 1; i <= radius; i++ )
			{
				yi = ( yp + x ) << 2;
				
				r_sum += ( stack.r = ( pr = pixels[yi])) * ( rbs = radiusPlus1 - i );
				g_sum += ( stack.g = ( pg = pixels[yi+1])) * rbs;
				b_sum += ( stack.b = ( pb = pixels[yi+2])) * rbs;
				a_sum += ( stack.a = ( pa = pixels[yi+3])) * rbs;
			   
				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;
				
				stack = stack.next;
			
				if( i < heightMinus1 )
				{
					yp += width;
				}
			}
			
			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for ( y = 0; y < height; y++ )
			{
				p = yi << 2;
				pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
				if ( pa > 0 )
				{
					pa = 255 / pa;
					pixels[p]   = ((r_sum * mul_sum) >> shg_sum ) * pa;
					pixels[p+1] = ((g_sum * mul_sum) >> shg_sum ) * pa;
					pixels[p+2] = ((b_sum * mul_sum) >> shg_sum ) * pa;
				} else {
					pixels[p] = pixels[p+1] = pixels[p+2] = 0;
				}
				
				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;
			   
				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;
				
				p = ( x + (( ( p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1 ) * width )) << 2;
				
				r_sum += ( r_in_sum += ( stackIn.r = pixels[p]));
				g_sum += ( g_in_sum += ( stackIn.g = pixels[p+1]));
				b_sum += ( b_in_sum += ( stackIn.b = pixels[p+2]));
				a_sum += ( a_in_sum += ( stackIn.a = pixels[p+3]));
			   
				stackIn = stackIn.next;
				
				r_out_sum += ( pr = stackOut.r );
				g_out_sum += ( pg = stackOut.g );
				b_out_sum += ( pb = stackOut.b );
				a_out_sum += ( pa = stackOut.a );
				
				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;
				
				stackOut = stackOut.next;
				
				yi += width;
			}
		}
	}

	function BlurStack()
	{
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	var stackblur = blur;

	//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
	//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
	//[5]   	Name	   ::=   	NameStartChar (NameChar)*
	var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;//\u10000-\uEFFFF
	var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
	var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
	//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
	//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
	var S_TAG = 0;//tag name offerring
	var S_ATTR = 1;//attr name offerring 
	var S_ATTR_SPACE=2;//attr name end and space offer
	var S_EQ = 3;//=space?
	var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
	var S_ATTR_END = 5;//attr value end and no space(quot end)
	var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
	var S_TAG_CLOSE = 7;//closed el<el />

	function XMLReader(){
		
	}

	XMLReader.prototype = {
		parse:function(source,defaultNSMap,entityMap){
			var domBuilder = this.domBuilder;
			domBuilder.startDocument();
			_copy(defaultNSMap ,defaultNSMap = {});
			parse(source,defaultNSMap,entityMap,
					domBuilder,this.errorHandler);
			domBuilder.endDocument();
		}
	};
	function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
		function fixedFromCharCode(code) {
			// String.prototype.fromCharCode does not supports
			// > 2 bytes unicode chars directly
			if (code > 0xffff) {
				code -= 0x10000;
				var surrogate1 = 0xd800 + (code >> 10)
					, surrogate2 = 0xdc00 + (code & 0x3ff);

				return String.fromCharCode(surrogate1, surrogate2);
			} else {
				return String.fromCharCode(code);
			}
		}
		function entityReplacer(a){
			var k = a.slice(1,-1);
			if(k in entityMap){
				return entityMap[k]; 
			}else if(k.charAt(0) === '#'){
				return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
			}else{
				errorHandler.error('entity not found:'+a);
				return a;
			}
		}
		function appendText(end){//has some bugs
			if(end>start){
				var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
				locator&&position(start);
				domBuilder.characters(xt,0,end-start);
				start = end;
			}
		}
		function position(p,m){
			while(p>=lineEnd && (m = linePattern.exec(source))){
				lineStart = m.index;
				lineEnd = lineStart + m[0].length;
				locator.lineNumber++;
				//console.log('line++:',locator,startPos,endPos)
			}
			locator.columnNumber = p-lineStart+1;
		}
		var lineStart = 0;
		var lineEnd = 0;
		var linePattern = /.*(?:\r\n?|\n)|.*$/g;
		var locator = domBuilder.locator;
		
		var parseStack = [{currentNSMap:defaultNSMapCopy}];
		var closeMap = {};
		var start = 0;
		while(true){
			try{
				var tagStart = source.indexOf('<',start);
				if(tagStart<0){
					if(!source.substr(start).match(/^\s*$/)){
						var doc = domBuilder.doc;
		    			var text = doc.createTextNode(source.substr(start));
		    			doc.appendChild(text);
		    			domBuilder.currentElement = text;
					}
					return;
				}
				if(tagStart>start){
					appendText(tagStart);
				}
				switch(source.charAt(tagStart+1)){
				case '/':
					var end = source.indexOf('>',tagStart+3);
					var tagName = source.substring(tagStart+2,end);
					var config = parseStack.pop();
					if(end<0){
						
		        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
		        		//console.error('#@@@@@@'+tagName)
		        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
		        		end = tagStart+1+tagName.length;
		        	}else if(tagName.match(/\s</)){
		        		tagName = tagName.replace(/[\s<].*/,'');
		        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
		        		end = tagStart+1+tagName.length;
					}
					//console.error(parseStack.length,parseStack)
					//console.error(config);
					var localNSMap = config.localNSMap;
					var endMatch = config.tagName == tagName;
					var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase();
			        if(endIgnoreCaseMach){
			        	domBuilder.endElement(config.uri,config.localName,tagName);
						if(localNSMap){
							for(var prefix in localNSMap){
								domBuilder.endPrefixMapping(prefix) ;
							}
						}
						if(!endMatch){
			            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
						}
			        }else{
			        	parseStack.push(config);
			        }
					
					end++;
					break;
					// end elment
				case '?':// <?...?>
					locator&&position(tagStart);
					end = parseInstruction(source,tagStart,domBuilder);
					break;
				case '!':// <!doctype,<![CDATA,<!--
					locator&&position(tagStart);
					end = parseDCC(source,tagStart,domBuilder,errorHandler);
					break;
				default:
					locator&&position(tagStart);
					var el = new ElementAttributes();
					var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
					//elStartEnd
					var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
					var len = el.length;
					
					
					if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
						el.closed = true;
						if(!entityMap.nbsp){
							errorHandler.warning('unclosed xml attribute');
						}
					}
					if(locator && len){
						var locator2 = copyLocator(locator,{});
						//try{//attribute position fixed
						for(var i = 0;i<len;i++){
							var a = el[i];
							position(a.offset);
							a.locator = copyLocator(locator,{});
						}
						//}catch(e){console.error('@@@@@'+e)}
						domBuilder.locator = locator2;
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
						domBuilder.locator = locator;
					}else{
						if(appendElement(el,domBuilder,currentNSMap)){
							parseStack.push(el);
						}
					}
					
					
					
					if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
						end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder);
					}else{
						end++;
					}
				}
			}catch(e){
				errorHandler.error('element parse error: '+e);
				//errorHandler.error('element parse error: '+e);
				end = -1;
				//throw e;
			}
			if(end>start){
				start = end;
			}else{
				//TODO: 这里有可能sax回退，有位置错误风险
				appendText(Math.max(tagStart,start)+1);
			}
		}
	}
	function copyLocator(f,t){
		t.lineNumber = f.lineNumber;
		t.columnNumber = f.columnNumber;
		return t;
	}

	/**
	 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
	 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
	 */
	function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
		var attrName;
		var value;
		var p = ++start;
		var s = S_TAG;//status
		while(true){
			var c = source.charAt(p);
			switch(c){
			case '=':
				if(s === S_ATTR){//attrName
					attrName = source.slice(start,p);
					s = S_EQ;
				}else if(s === S_ATTR_SPACE){
					s = S_EQ;
				}else{
					//fatalError: equal must after attrName or space after attrName
					throw new Error('attribute equal must after attrName');
				}
				break;
			case '\'':
			case '"':
				if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
					){//equal
					if(s === S_ATTR){
						errorHandler.warning('attribute value must after "="');
						attrName = source.slice(start,p);
					}
					start = p+1;
					p = source.indexOf(c,start);
					if(p>0){
						value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						el.add(attrName,value,start-1);
						s = S_ATTR_END;
					}else{
						//fatalError: no end quot match
						throw new Error('attribute value no end \''+c+'\' match');
					}
				}else if(s == S_ATTR_NOQUOT_VALUE){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					//console.log(attrName,value,start,p)
					el.add(attrName,value,start);
					//console.dir(el)
					errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
					start = p+1;
					s = S_ATTR_END;
				}else{
					//fatalError: no equal before
					throw new Error('attribute value must after "="');
				}
				break;
			case '/':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					s =S_TAG_CLOSE;
					el.closed = true;
				case S_ATTR_NOQUOT_VALUE:
				case S_ATTR:
				case S_ATTR_SPACE:
					break;
				//case S_EQ:
				default:
					throw new Error("attribute invalid close char('/')")
				}
				break;
			case ''://end document
				//throw new Error('unexpected end of input')
				errorHandler.error('unexpected end of input');
				if(s == S_TAG){
					el.setTagName(source.slice(start,p));
				}
				return p;
			case '>':
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));
				case S_ATTR_END:
				case S_TAG_SPACE:
				case S_TAG_CLOSE:
					break;//normal
				case S_ATTR_NOQUOT_VALUE://Compatible state
				case S_ATTR:
					value = source.slice(start,p);
					if(value.slice(-1) === '/'){
						el.closed  = true;
						value = value.slice(0,-1);
					}
				case S_ATTR_SPACE:
					if(s === S_ATTR_SPACE){
						value = attrName;
					}
					if(s == S_ATTR_NOQUOT_VALUE){
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start);
					}else{
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!');
						}
						el.add(value,value,start);
					}
					break;
				case S_EQ:
					throw new Error('attribute value missed!!');
				}
	//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
				return p;
			/*xml space '\x20' | #x9 | #xD | #xA; */
			case '\u0080':
				c = ' ';
			default:
				if(c<= ' '){//space
					switch(s){
					case S_TAG:
						el.setTagName(source.slice(start,p));//tagName
						s = S_TAG_SPACE;
						break;
					case S_ATTR:
						attrName = source.slice(start,p);
						s = S_ATTR_SPACE;
						break;
					case S_ATTR_NOQUOT_VALUE:
						var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
						errorHandler.warning('attribute "'+value+'" missed quot(")!!');
						el.add(attrName,value,start);
					case S_ATTR_END:
						s = S_TAG_SPACE;
						break;
					//case S_TAG_SPACE:
					//case S_EQ:
					//case S_ATTR_SPACE:
					//	void();break;
					//case S_TAG_CLOSE:
						//ignore warning
					}
				}else{//not space
	//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
	//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
					switch(s){
					//case S_TAG:void();break;
					//case S_ATTR:void();break;
					//case S_ATTR_NOQUOT_VALUE:void();break;
					case S_ATTR_SPACE:
						var tagName =  el.tagName;
						if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
							errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!');
						}
						el.add(attrName,attrName,start);
						start = p;
						s = S_ATTR;
						break;
					case S_ATTR_END:
						errorHandler.warning('attribute space is required"'+attrName+'"!!');
					case S_TAG_SPACE:
						s = S_ATTR;
						start = p;
						break;
					case S_EQ:
						s = S_ATTR_NOQUOT_VALUE;
						start = p;
						break;
					case S_TAG_CLOSE:
						throw new Error("elements closed character '/' and '>' must be connected to");
					}
				}
			}//end outer switch
			//console.log('p++',p)
			p++;
		}
	}
	/**
	 * @return true if has new namespace define
	 */
	function appendElement(el,domBuilder,currentNSMap){
		var tagName = el.tagName;
		var localNSMap = null;
		//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
		var i = el.length;
		while(i--){
			var a = el[i];
			var qName = a.qName;
			var value = a.value;
			var nsp = qName.indexOf(':');
			if(nsp>0){
				var prefix = a.prefix = qName.slice(0,nsp);
				var localName = qName.slice(nsp+1);
				var nsPrefix = prefix === 'xmlns' && localName;
			}else{
				localName = qName;
				prefix = null;
				nsPrefix = qName === 'xmlns' && '';
			}
			//can not set prefix,because prefix !== ''
			a.localName = localName ;
			//prefix == null for no ns prefix attribute 
			if(nsPrefix !== false){//hack!!
				if(localNSMap == null){
					localNSMap = {};
					//console.log(currentNSMap,0)
					_copy(currentNSMap,currentNSMap={});
					//console.log(currentNSMap,1)
				}
				currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
				a.uri = 'http://www.w3.org/2000/xmlns/';
				domBuilder.startPrefixMapping(nsPrefix, value); 
			}
		}
		var i = el.length;
		while(i--){
			a = el[i];
			var prefix = a.prefix;
			if(prefix){//no prefix attribute has no namespace
				if(prefix === 'xml'){
					a.uri = 'http://www.w3.org/XML/1998/namespace';
				}if(prefix !== 'xmlns'){
					a.uri = currentNSMap[prefix || ''];
					
					//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
				}
			}
		}
		var nsp = tagName.indexOf(':');
		if(nsp>0){
			prefix = el.prefix = tagName.slice(0,nsp);
			localName = el.localName = tagName.slice(nsp+1);
		}else{
			prefix = null;//important!!
			localName = el.localName = tagName;
		}
		//no prefix element has default namespace
		var ns = el.uri = currentNSMap[prefix || ''];
		domBuilder.startElement(ns,localName,tagName,el);
		//endPrefixMapping and startPrefixMapping have not any help for dom builder
		//localNSMap = null
		if(el.closed){
			domBuilder.endElement(ns,localName,tagName);
			if(localNSMap){
				for(prefix in localNSMap){
					domBuilder.endPrefixMapping(prefix); 
				}
			}
		}else{
			el.currentNSMap = currentNSMap;
			el.localNSMap = localNSMap;
			//parseStack.push(el);
			return true;
		}
	}
	function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
		if(/^(?:script|textarea)$/i.test(tagName)){
			var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
			var text = source.substring(elStartEnd+1,elEndStart);
			if(/[&<]/.test(text)){
				if(/^script$/i.test(tagName)){
					//if(!/\]\]>/.test(text)){
						//lexHandler.startCDATA();
						domBuilder.characters(text,0,text.length);
						//lexHandler.endCDATA();
						return elEndStart;
					//}
				}//}else{//text area
					text = text.replace(/&#?\w+;/g,entityReplacer);
					domBuilder.characters(text,0,text.length);
					return elEndStart;
				//}
				
			}
		}
		return elStartEnd+1;
	}
	function fixSelfClosed(source,elStartEnd,tagName,closeMap){
		//if(tagName in closeMap){
		var pos = closeMap[tagName];
		if(pos == null){
			//console.log(tagName)
			pos =  source.lastIndexOf('</'+tagName+'>');
			if(pos<elStartEnd){//忘记闭合
				pos = source.lastIndexOf('</'+tagName);
			}
			closeMap[tagName] =pos;
		}
		return pos<elStartEnd;
		//} 
	}
	function _copy(source,target){
		for(var n in source){target[n] = source[n];}
	}
	function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
		var next= source.charAt(start+2);
		switch(next){
		case '-':
			if(source.charAt(start + 3) === '-'){
				var end = source.indexOf('-->',start+4);
				//append comment source.substring(4,end)//<!--
				if(end>start){
					domBuilder.comment(source,start+4,end-start-4);
					return end+3;
				}else{
					errorHandler.error("Unclosed comment");
					return -1;
				}
			}else{
				//error
				return -1;
			}
		default:
			if(source.substr(start+3,6) == 'CDATA['){
				var end = source.indexOf(']]>',start+9);
				domBuilder.startCDATA();
				domBuilder.characters(source,start+9,end-start-9);
				domBuilder.endCDATA(); 
				return end+3;
			}
			//<!DOCTYPE
			//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
			var matchs = split(source,start);
			var len = matchs.length;
			if(len>1 && /!doctype/i.test(matchs[0][0])){
				var name = matchs[1][0];
				var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
				var sysid = len>4 && matchs[4][0];
				var lastMatch = matchs[len-1];
				domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
						sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
				domBuilder.endDTD();
				
				return lastMatch.index+lastMatch[0].length
			}
		}
		return -1;
	}



	function parseInstruction(source,start,domBuilder){
		var end = source.indexOf('?>',start);
		if(end){
			var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
			if(match){
				var len = match[0].length;
				domBuilder.processingInstruction(match[1], match[2]) ;
				return end+2;
			}else{//error
				return -1;
			}
		}
		return -1;
	}

	/**
	 * @param source
	 */
	function ElementAttributes(source){
		
	}
	ElementAttributes.prototype = {
		setTagName:function(tagName){
			if(!tagNamePattern.test(tagName)){
				throw new Error('invalid tagName:'+tagName)
			}
			this.tagName = tagName;
		},
		add:function(qName,value,offset){
			if(!tagNamePattern.test(qName)){
				throw new Error('invalid attribute:'+qName)
			}
			this[this.length++] = {qName:qName,value:value,offset:offset};
		},
		length:0,
		getLocalName:function(i){return this[i].localName},
		getLocator:function(i){return this[i].locator},
		getQName:function(i){return this[i].qName},
		getURI:function(i){return this[i].uri},
		getValue:function(i){return this[i].value}
	//	,getIndex:function(uri, localName)){
	//		if(localName){
	//			
	//		}else{
	//			var qName = uri
	//		}
	//	},
	//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
	//	getType:function(uri,localName){}
	//	getType:function(i){},
	};




	function _set_proto_(thiz,parent){
		thiz.__proto__ = parent;
		return thiz;
	}
	if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
		_set_proto_ = function(thiz,parent){
			function p(){}		p.prototype = parent;
			p = new p();
			for(parent in thiz){
				p[parent] = thiz[parent];
			}
			return p;
		};
	}

	function split(source,start){
		var match;
		var buf = [];
		var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
		reg.lastIndex = start;
		reg.exec(source);//skip <
		while(match = reg.exec(source)){
			buf.push(match);
			if(match[1]){ return buf; }
		}
	}

	var XMLReader_1 = XMLReader;

	var sax = {
		XMLReader: XMLReader_1
	};

	/*
	 * DOM Level 2
	 * Object DOMException
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
	 */

	function copy(src,dest){
		for(var p in src){
			dest[p] = src[p];
		}
	}
	/**
	^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
	^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
	 */
	function _extends(Class,Super){
		var pt = Class.prototype;
		if(Object.create){
			var ppt = Object.create(Super.prototype);
			pt.__proto__ = ppt;
		}
		if(!(pt instanceof Super)){
			function t(){}		t.prototype = Super.prototype;
			t = new t();
			copy(pt,t);
			Class.prototype = pt = t;
		}
		if(pt.constructor != Class){
			if(typeof Class != 'function'){
				console.error("unknow Class:"+Class);
			}
			pt.constructor = Class;
		}
	}
	var htmlns = 'http://www.w3.org/1999/xhtml' ;
	// Node Types
	var NodeType = {};
	var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
	var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
	var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
	var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
	var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
	var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
	var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
	var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
	var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
	var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
	var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
	var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

	// ExceptionCode
	var ExceptionCode = {};
	var ExceptionMessage = {};
	var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
	var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
	var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
	var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
	var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
	var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
	var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
	var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
	var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
	var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
	//level2
	var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
	var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
	var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
	var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
	var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


	function DOMException(code, message) {
		if(message instanceof Error){
			var error = message;
		}else{
			error = this;
			Error.call(this, ExceptionMessage[code]);
			this.message = ExceptionMessage[code];
			if(Error.captureStackTrace) { Error.captureStackTrace(this, DOMException); }
		}
		error.code = code;
		if(message) { this.message = this.message + ": " + message; }
		return error;
	}DOMException.prototype = Error.prototype;
	copy(ExceptionCode,DOMException);
	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
	 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
	 * The items in the NodeList are accessible via an integral index, starting from 0.
	 */
	function NodeList() {
	}NodeList.prototype = {
		/**
		 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
		 * @standard level1
		 */
		length:0, 
		/**
		 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
		 * @standard level1
		 * @param index  unsigned long 
		 *   Index into the collection.
		 * @return Node
		 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
		 */
		item: function(index) {
			return this[index] || null;
		},
		toString:function(isHTML,nodeFilter){
			for(var buf = [], i = 0;i<this.length;i++){
				serializeToString(this[i],buf,isHTML,nodeFilter);
			}
			return buf.join('');
		}
	};
	function LiveNodeList(node,refresh){
		this._node = node;
		this._refresh = refresh;
		_updateLiveList(this);
	}
	function _updateLiveList(list){
		var inc = list._node._inc || list._node.ownerDocument._inc;
		if(list._inc != inc){
			var ls = list._refresh(list._node);
			//console.log(ls.length)
			__set__(list,'length',ls.length);
			copy(ls,list);
			list._inc = inc;
		}
	}
	LiveNodeList.prototype.item = function(i){
		_updateLiveList(this);
		return this[i];
	};

	_extends(LiveNodeList,NodeList);
	/**
	 * 
	 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
	 * NamedNodeMap objects in the DOM are live.
	 * used for attributes or DocumentType entities 
	 */
	function NamedNodeMap() {
	}
	function _findNodeIndex(list,node){
		var i = list.length;
		while(i--){
			if(list[i] === node){return i}
		}
	}

	function _addNamedNode(el,list,newAttr,oldAttr){
		if(oldAttr){
			list[_findNodeIndex(list,oldAttr)] = newAttr;
		}else{
			list[list.length++] = newAttr;
		}
		if(el){
			newAttr.ownerElement = el;
			var doc = el.ownerDocument;
			if(doc){
				oldAttr && _onRemoveAttribute(doc,el,oldAttr);
				_onAddAttribute(doc,el,newAttr);
			}
		}
	}
	function _removeNamedNode(el,list,attr){
		//console.log('remove attr:'+attr)
		var i = _findNodeIndex(list,attr);
		if(i>=0){
			var lastIndex = list.length-1;
			while(i<lastIndex){
				list[i] = list[++i];
			}
			list.length = lastIndex;
			if(el){
				var doc = el.ownerDocument;
				if(doc){
					_onRemoveAttribute(doc,el,attr);
					attr.ownerElement = null;
				}
			}
		}else{
			throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
		}
	}
	NamedNodeMap.prototype = {
		length:0,
		item:NodeList.prototype.item,
		getNamedItem: function(key) {
	//		if(key.indexOf(':')>0 || key == 'xmlns'){
	//			return null;
	//		}
			//console.log()
			var i = this.length;
			while(i--){
				var attr = this[i];
				//console.log(attr.nodeName,key)
				if(attr.nodeName == key){
					return attr;
				}
			}
		},
		setNamedItem: function(attr) {
			var el = attr.ownerElement;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			var oldAttr = this.getNamedItem(attr.nodeName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},
		/* returns Node */
		setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
			var el = attr.ownerElement, oldAttr;
			if(el && el!=this._ownerElement){
				throw new DOMException(INUSE_ATTRIBUTE_ERR);
			}
			oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
			_addNamedNode(this._ownerElement,this,attr,oldAttr);
			return oldAttr;
		},

		/* returns Node */
		removeNamedItem: function(key) {
			var attr = this.getNamedItem(key);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
			
			
		},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
		
		//for level2
		removeNamedItemNS:function(namespaceURI,localName){
			var attr = this.getNamedItemNS(namespaceURI,localName);
			_removeNamedNode(this._ownerElement,this,attr);
			return attr;
		},
		getNamedItemNS: function(namespaceURI, localName) {
			var i = this.length;
			while(i--){
				var node = this[i];
				if(node.localName == localName && node.namespaceURI == namespaceURI){
					return node;
				}
			}
			return null;
		}
	};
	/**
	 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
	 */
	function DOMImplementation(/* Object */ features) {
		this._features = {};
		if (features) {
			for (var feature in features) {
				 this._features = features[feature];
			}
		}
	}
	DOMImplementation.prototype = {
		hasFeature: function(/* string */ feature, /* string */ version) {
			var versions = this._features[feature.toLowerCase()];
			if (versions && (!version || version in versions)) {
				return true;
			} else {
				return false;
			}
		},
		// Introduced in DOM Level 2:
		createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
			var doc = new Document();
			doc.implementation = this;
			doc.childNodes = new NodeList();
			doc.doctype = doctype;
			if(doctype){
				doc.appendChild(doctype);
			}
			if(qualifiedName){
				var root = doc.createElementNS(namespaceURI,qualifiedName);
				doc.appendChild(root);
			}
			return doc;
		},
		// Introduced in DOM Level 2:
		createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
			var node = new DocumentType();
			node.name = qualifiedName;
			node.nodeName = qualifiedName;
			node.publicId = publicId;
			node.systemId = systemId;
			// Introduced in DOM Level 2:
			//readonly attribute DOMString        internalSubset;
			
			//TODO:..
			//  readonly attribute NamedNodeMap     entities;
			//  readonly attribute NamedNodeMap     notations;
			return node;
		}
	};


	/**
	 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
	 */

	function Node$1() {
	}
	Node$1.prototype = {
		firstChild : null,
		lastChild : null,
		previousSibling : null,
		nextSibling : null,
		attributes : null,
		parentNode : null,
		childNodes : null,
		ownerDocument : null,
		nodeValue : null,
		namespaceURI : null,
		prefix : null,
		localName : null,
		// Modified in DOM Level 2:
		insertBefore:function(newChild, refChild){//raises 
			return _insertBefore(this,newChild,refChild);
		},
		replaceChild:function(newChild, oldChild){//raises 
			this.insertBefore(newChild,oldChild);
			if(oldChild){
				this.removeChild(oldChild);
			}
		},
		removeChild:function(oldChild){
			return _removeChild(this,oldChild);
		},
		appendChild:function(newChild){
			return this.insertBefore(newChild,null);
		},
		hasChildNodes:function(){
			return this.firstChild != null;
		},
		cloneNode:function(deep){
			return cloneNode(this.ownerDocument||this,this,deep);
		},
		// Modified in DOM Level 2:
		normalize:function(){
			var child = this.firstChild;
			while(child){
				var next = child.nextSibling;
				if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
					this.removeChild(next);
					child.appendData(next.data);
				}else{
					child.normalize();
					child = next;
				}
			}
		},
	  	// Introduced in DOM Level 2:
		isSupported:function(feature, version){
			return this.ownerDocument.implementation.hasFeature(feature,version);
		},
	    // Introduced in DOM Level 2:
	    hasAttributes:function(){
	    	return this.attributes.length>0;
	    },
	    lookupPrefix:function(namespaceURI){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			for(var n in map){
	    				if(map[n] == namespaceURI){
	    					return n;
	    				}
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    lookupNamespaceURI:function(prefix){
	    	var el = this;
	    	while(el){
	    		var map = el._nsMap;
	    		//console.dir(map)
	    		if(map){
	    			if(prefix in map){
	    				return map[prefix] ;
	    			}
	    		}
	    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
	    	}
	    	return null;
	    },
	    // Introduced in DOM Level 3:
	    isDefaultNamespace:function(namespaceURI){
	    	var prefix = this.lookupPrefix(namespaceURI);
	    	return prefix == null;
	    }
	};


	function _xmlEncoder(c){
		return c == '<' && '&lt;' ||
	         c == '>' && '&gt;' ||
	         c == '&' && '&amp;' ||
	         c == '"' && '&quot;' ||
	         '&#'+c.charCodeAt()+';'
	}


	copy(NodeType,Node$1);
	copy(NodeType,Node$1.prototype);

	/**
	 * @param callback return true for continue,false for break
	 * @return boolean true: break visit;
	 */
	function _visitNode(node,callback){
		if(callback(node)){
			return true;
		}
		if(node = node.firstChild){
			do{
				if(_visitNode(node,callback)){return true}
	        }while(node=node.nextSibling)
	    }
	}



	function Document(){
	}
	function _onAddAttribute(doc,el,newAttr){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value;
		}
	}
	function _onRemoveAttribute(doc,el,newAttr,remove){
		doc && doc._inc++;
		var ns = newAttr.namespaceURI ;
		if(ns == 'http://www.w3.org/2000/xmlns/'){
			//update namespace
			delete el._nsMap[newAttr.prefix?newAttr.localName:''];
		}
	}
	function _onUpdateChild(doc,el,newChild){
		if(doc && doc._inc){
			doc._inc++;
			//update childNodes
			var cs = el.childNodes;
			if(newChild){
				cs[cs.length++] = newChild;
			}else{
				//console.log(1)
				var child = el.firstChild;
				var i = 0;
				while(child){
					cs[i++] = child;
					child =child.nextSibling;
				}
				cs.length = i;
			}
		}
	}

	/**
	 * attributes;
	 * children;
	 * 
	 * writeable properties:
	 * nodeValue,Attr:value,CharacterData:data
	 * prefix
	 */
	function _removeChild(parentNode,child){
		var previous = child.previousSibling;
		var next = child.nextSibling;
		if(previous){
			previous.nextSibling = next;
		}else{
			parentNode.firstChild = next;
		}
		if(next){
			next.previousSibling = previous;
		}else{
			parentNode.lastChild = previous;
		}
		_onUpdateChild(parentNode.ownerDocument,parentNode);
		return child;
	}
	/**
	 * preformance key(refChild == null)
	 */
	function _insertBefore(parentNode,newChild,nextChild){
		var cp = newChild.parentNode;
		if(cp){
			cp.removeChild(newChild);//remove and update
		}
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			var newFirst = newChild.firstChild;
			if (newFirst == null) {
				return newChild;
			}
			var newLast = newChild.lastChild;
		}else{
			newFirst = newLast = newChild;
		}
		var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

		newFirst.previousSibling = pre;
		newLast.nextSibling = nextChild;
		
		
		if(pre){
			pre.nextSibling = newFirst;
		}else{
			parentNode.firstChild = newFirst;
		}
		if(nextChild == null){
			parentNode.lastChild = newLast;
		}else{
			nextChild.previousSibling = newLast;
		}
		do{
			newFirst.parentNode = parentNode;
		}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
		_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
		//console.log(parentNode.lastChild.nextSibling == null)
		if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
			newChild.firstChild = newChild.lastChild = null;
		}
		return newChild;
	}
	function _appendSingleChild(parentNode,newChild){
		var cp = newChild.parentNode;
		if(cp){
			var pre = parentNode.lastChild;
			cp.removeChild(newChild);//remove and update
			var pre = parentNode.lastChild;
		}
		var pre = parentNode.lastChild;
		newChild.parentNode = parentNode;
		newChild.previousSibling = pre;
		newChild.nextSibling = null;
		if(pre){
			pre.nextSibling = newChild;
		}else{
			parentNode.firstChild = newChild;
		}
		parentNode.lastChild = newChild;
		_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
		return newChild;
		//console.log("__aa",parentNode.lastChild.nextSibling == null)
	}
	Document.prototype = {
		//implementation : null,
		nodeName :  '#document',
		nodeType :  DOCUMENT_NODE,
		doctype :  null,
		documentElement :  null,
		_inc : 1,
		
		insertBefore :  function(newChild, refChild){//raises 
			if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
				var child = newChild.firstChild;
				while(child){
					var next = child.nextSibling;
					this.insertBefore(child,refChild);
					child = next;
				}
				return newChild;
			}
			if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
				this.documentElement = newChild;
			}
			
			return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
		},
		removeChild :  function(oldChild){
			if(this.documentElement == oldChild){
				this.documentElement = null;
			}
			return _removeChild(this,oldChild);
		},
		// Introduced in DOM Level 2:
		importNode : function(importedNode,deep){
			return importNode(this,importedNode,deep);
		},
		// Introduced in DOM Level 2:
		getElementById :	function(id){
			var rtv = null;
			_visitNode(this.documentElement,function(node){
				if(node.nodeType == ELEMENT_NODE){
					if(node.getAttribute('id') == id){
						rtv = node;
						return true;
					}
				}
			});
			return rtv;
		},
		
		//document factory method:
		createElement :	function(tagName){
			var node = new Element$1();
			node.ownerDocument = this;
			node.nodeName = tagName;
			node.tagName = tagName;
			node.childNodes = new NodeList();
			var attrs	= node.attributes = new NamedNodeMap();
			attrs._ownerElement = node;
			return node;
		},
		createDocumentFragment :	function(){
			var node = new DocumentFragment();
			node.ownerDocument = this;
			node.childNodes = new NodeList();
			return node;
		},
		createTextNode :	function(data){
			var node = new Text();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createComment :	function(data){
			var node = new Comment();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createCDATASection :	function(data){
			var node = new CDATASection();
			node.ownerDocument = this;
			node.appendData(data);
			return node;
		},
		createProcessingInstruction :	function(target,data){
			var node = new ProcessingInstruction();
			node.ownerDocument = this;
			node.tagName = node.target = target;
			node.nodeValue= node.data = data;
			return node;
		},
		createAttribute :	function(name){
			var node = new Attr();
			node.ownerDocument	= this;
			node.name = name;
			node.nodeName	= name;
			node.localName = name;
			node.specified = true;
			return node;
		},
		createEntityReference :	function(name){
			var node = new EntityReference();
			node.ownerDocument	= this;
			node.nodeName	= name;
			return node;
		},
		// Introduced in DOM Level 2:
		createElementNS :	function(namespaceURI,qualifiedName){
			var node = new Element$1();
			var pl = qualifiedName.split(':');
			var attrs	= node.attributes = new NamedNodeMap();
			node.childNodes = new NodeList();
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.tagName = qualifiedName;
			node.namespaceURI = namespaceURI;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else{
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			attrs._ownerElement = node;
			return node;
		},
		// Introduced in DOM Level 2:
		createAttributeNS :	function(namespaceURI,qualifiedName){
			var node = new Attr();
			var pl = qualifiedName.split(':');
			node.ownerDocument = this;
			node.nodeName = qualifiedName;
			node.name = qualifiedName;
			node.namespaceURI = namespaceURI;
			node.specified = true;
			if(pl.length == 2){
				node.prefix = pl[0];
				node.localName = pl[1];
			}else{
				//el.prefix = null;
				node.localName = qualifiedName;
			}
			return node;
		}
	};
	_extends(Document,Node$1);


	function Element$1() {
		this._nsMap = {};
	}Element$1.prototype = {
		nodeType : ELEMENT_NODE,
		hasAttribute : function(name){
			return this.getAttributeNode(name)!=null;
		},
		getAttribute : function(name){
			var attr = this.getAttributeNode(name);
			return attr && attr.value || '';
		},
		getAttributeNode : function(name){
			return this.attributes.getNamedItem(name);
		},
		setAttribute : function(name, value){
			var attr = this.ownerDocument.createAttribute(name);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		removeAttribute : function(name){
			var attr = this.getAttributeNode(name);
			attr && this.removeAttributeNode(attr);
		},
		
		//four real opeartion method
		appendChild:function(newChild){
			if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
				return this.insertBefore(newChild,null);
			}else{
				return _appendSingleChild(this,newChild);
			}
		},
		setAttributeNode : function(newAttr){
			return this.attributes.setNamedItem(newAttr);
		},
		setAttributeNodeNS : function(newAttr){
			return this.attributes.setNamedItemNS(newAttr);
		},
		removeAttributeNode : function(oldAttr){
			//console.log(this == oldAttr.ownerElement)
			return this.attributes.removeNamedItem(oldAttr.nodeName);
		},
		//get real attribute name,and remove it by removeAttributeNode
		removeAttributeNS : function(namespaceURI, localName){
			var old = this.getAttributeNodeNS(namespaceURI, localName);
			old && this.removeAttributeNode(old);
		},
		
		hasAttributeNS : function(namespaceURI, localName){
			return this.getAttributeNodeNS(namespaceURI, localName)!=null;
		},
		getAttributeNS : function(namespaceURI, localName){
			var attr = this.getAttributeNodeNS(namespaceURI, localName);
			return attr && attr.value || '';
		},
		setAttributeNS : function(namespaceURI, qualifiedName, value){
			var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
			attr.value = attr.nodeValue = "" + value;
			this.setAttributeNode(attr);
		},
		getAttributeNodeNS : function(namespaceURI, localName){
			return this.attributes.getNamedItemNS(namespaceURI, localName);
		},
		
		getElementsByTagName : function(tagName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
						ls.push(node);
					}
				});
				return ls;
			});
		},
		getElementsByTagNameNS : function(namespaceURI, localName){
			return new LiveNodeList(this,function(base){
				var ls = [];
				_visitNode(base,function(node){
					if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
						ls.push(node);
					}
				});
				return ls;
				
			});
		}
	};
	Document.prototype.getElementsByTagName = Element$1.prototype.getElementsByTagName;
	Document.prototype.getElementsByTagNameNS = Element$1.prototype.getElementsByTagNameNS;


	_extends(Element$1,Node$1);
	function Attr() {
	}Attr.prototype.nodeType = ATTRIBUTE_NODE;
	_extends(Attr,Node$1);


	function CharacterData() {
	}CharacterData.prototype = {
		data : '',
		substringData : function(offset, count) {
			return this.data.substring(offset, offset+count);
		},
		appendData: function(text) {
			text = this.data+text;
			this.nodeValue = this.data = text;
			this.length = text.length;
		},
		insertData: function(offset,text) {
			this.replaceData(offset,0,text);
		
		},
		appendChild:function(newChild){
			throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
		},
		deleteData: function(offset, count) {
			this.replaceData(offset,count,"");
		},
		replaceData: function(offset, count, text) {
			var start = this.data.substring(0,offset);
			var end = this.data.substring(offset+count);
			text = start + text + end;
			this.nodeValue = this.data = text;
			this.length = text.length;
		}
	};
	_extends(CharacterData,Node$1);
	function Text() {
	}Text.prototype = {
		nodeName : "#text",
		nodeType : TEXT_NODE,
		splitText : function(offset) {
			var text = this.data;
			var newText = text.substring(offset);
			text = text.substring(0, offset);
			this.data = this.nodeValue = text;
			this.length = text.length;
			var newNode = this.ownerDocument.createTextNode(newText);
			if(this.parentNode){
				this.parentNode.insertBefore(newNode, this.nextSibling);
			}
			return newNode;
		}
	};
	_extends(Text,CharacterData);
	function Comment() {
	}Comment.prototype = {
		nodeName : "#comment",
		nodeType : COMMENT_NODE
	};
	_extends(Comment,CharacterData);

	function CDATASection() {
	}CDATASection.prototype = {
		nodeName : "#cdata-section",
		nodeType : CDATA_SECTION_NODE
	};
	_extends(CDATASection,CharacterData);


	function DocumentType() {
	}DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
	_extends(DocumentType,Node$1);

	function Notation() {
	}Notation.prototype.nodeType = NOTATION_NODE;
	_extends(Notation,Node$1);

	function Entity() {
	}Entity.prototype.nodeType = ENTITY_NODE;
	_extends(Entity,Node$1);

	function EntityReference() {
	}EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
	_extends(EntityReference,Node$1);

	function DocumentFragment() {
	}DocumentFragment.prototype.nodeName =	"#document-fragment";
	DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
	_extends(DocumentFragment,Node$1);


	function ProcessingInstruction() {
	}
	ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
	_extends(ProcessingInstruction,Node$1);
	function XMLSerializer$1(){}
	XMLSerializer$1.prototype.serializeToString = function(node,isHtml,nodeFilter){
		return nodeSerializeToString.call(node,isHtml,nodeFilter);
	};
	Node$1.prototype.toString = nodeSerializeToString;
	function nodeSerializeToString(isHtml,nodeFilter){
		var buf = [];
		var refNode = this.nodeType == 9?this.documentElement:this;
		var prefix = refNode.prefix;
		var uri = refNode.namespaceURI;
		
		if(uri && prefix == null){
			//console.log(prefix)
			var prefix = refNode.lookupPrefix(uri);
			if(prefix == null){
				//isHTML = true;
				var visibleNamespaces=[
				{namespace:uri,prefix:null} ];
			}
		}
		serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
		//console.log('###',this.nodeType,uri,prefix,buf.join(''))
		return buf.join('');
	}
	function needNamespaceDefine(node,isHTML, visibleNamespaces) {
		var prefix = node.prefix||'';
		var uri = node.namespaceURI;
		if (!prefix && !uri){
			return false;
		}
		if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
			|| uri == 'http://www.w3.org/2000/xmlns/'){
			return false;
		}
		
		var i = visibleNamespaces.length; 
		//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
		while (i--) {
			var ns = visibleNamespaces[i];
			// get namespace prefix
			//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
			if (ns.prefix == prefix){
				return ns.namespace != uri;
			}
		}
		//console.log(isHTML,uri,prefix=='')
		//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
		//	return false;
		//}
		//node.flag = '11111'
		//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
		return true;
	}
	function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
		if(nodeFilter){
			node = nodeFilter(node);
			if(node){
				if(typeof node == 'string'){
					buf.push(node);
					return;
				}
			}else{
				return;
			}
			//buf.sort.apply(attrs, attributeSorter);
		}
		switch(node.nodeType){
		case ELEMENT_NODE:
			if (!visibleNamespaces) { visibleNamespaces = []; }
			var startVisibleNamespaces = visibleNamespaces.length;
			var attrs = node.attributes;
			var len = attrs.length;
			var child = node.firstChild;
			var nodeName = node.tagName;
			
			isHTML =  (htmlns === node.namespaceURI) ||isHTML; 
			buf.push('<',nodeName);
			
			
			
			for(var i=0;i<len;i++){
				// add namespaces for attributes
				var attr = attrs.item(i);
				if (attr.prefix == 'xmlns') {
					visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
				}else if(attr.nodeName == 'xmlns'){
					visibleNamespaces.push({ prefix: '', namespace: attr.value });
				}
			}
			for(var i=0;i<len;i++){
				var attr = attrs.item(i);
				if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
					var prefix = attr.prefix||'';
					var uri = attr.namespaceURI;
					var ns = prefix ? ' xmlns:' + prefix : " xmlns";
					buf.push(ns, '="' , uri , '"');
					visibleNamespaces.push({ prefix: prefix, namespace:uri });
				}
				serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
			}
			// add namespace for current node		
			if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
				var prefix = node.prefix||'';
				var uri = node.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			
			if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
				buf.push('>');
				//if is cdata child node
				if(isHTML && /^script$/i.test(nodeName)){
					while(child){
						if(child.data){
							buf.push(child.data);
						}else{
							serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						}
						child = child.nextSibling;
					}
				}else
				{
					while(child){
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
						child = child.nextSibling;
					}
				}
				buf.push('</',nodeName,'>');
			}else{
				buf.push('/>');
			}
			// remove added visible namespaces
			//visibleNamespaces.length = startVisibleNamespaces;
			return;
		case DOCUMENT_NODE:
		case DOCUMENT_FRAGMENT_NODE:
			var child = node.firstChild;
			while(child){
				serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
				child = child.nextSibling;
			}
			return;
		case ATTRIBUTE_NODE:
			return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
		case TEXT_NODE:
			return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
		case CDATA_SECTION_NODE:
			return buf.push( '<![CDATA[',node.data,']]>');
		case COMMENT_NODE:
			return buf.push( "<!--",node.data,"-->");
		case DOCUMENT_TYPE_NODE:
			var pubid = node.publicId;
			var sysid = node.systemId;
			buf.push('<!DOCTYPE ',node.name);
			if(pubid){
				buf.push(' PUBLIC "',pubid);
				if (sysid && sysid!='.') {
					buf.push( '" "',sysid);
				}
				buf.push('">');
			}else if(sysid && sysid!='.'){
				buf.push(' SYSTEM "',sysid,'">');
			}else{
				var sub = node.internalSubset;
				if(sub){
					buf.push(" [",sub,"]");
				}
				buf.push(">");
			}
			return;
		case PROCESSING_INSTRUCTION_NODE:
			return buf.push( "<?",node.target," ",node.data,"?>");
		case ENTITY_REFERENCE_NODE:
			return buf.push( '&',node.nodeName,';');
		//case ENTITY_NODE:
		//case NOTATION_NODE:
		default:
			buf.push('??',node.nodeName);
		}
	}
	function importNode(doc,node,deep){
		var node2;
		switch (node.nodeType) {
		case ELEMENT_NODE:
			node2 = node.cloneNode(false);
			node2.ownerDocument = doc;
			//var attrs = node2.attributes;
			//var len = attrs.length;
			//for(var i=0;i<len;i++){
				//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
			//}
		case DOCUMENT_FRAGMENT_NODE:
			break;
		case ATTRIBUTE_NODE:
			deep = true;
			break;
		//case ENTITY_REFERENCE_NODE:
		//case PROCESSING_INSTRUCTION_NODE:
		////case TEXT_NODE:
		//case CDATA_SECTION_NODE:
		//case COMMENT_NODE:
		//	deep = false;
		//	break;
		//case DOCUMENT_NODE:
		//case DOCUMENT_TYPE_NODE:
		//cannot be imported.
		//case ENTITY_NODE:
		//case NOTATION_NODE：
		//can not hit in level3
		//default:throw e;
		}
		if(!node2){
			node2 = node.cloneNode(false);//false
		}
		node2.ownerDocument = doc;
		node2.parentNode = null;
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(importNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}
	//
	//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
	//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
	function cloneNode(doc,node,deep){
		var node2 = new node.constructor();
		for(var n in node){
			var v = node[n];
			if(typeof v != 'object' ){
				if(v != node2[n]){
					node2[n] = v;
				}
			}
		}
		if(node.childNodes){
			node2.childNodes = new NodeList();
		}
		node2.ownerDocument = doc;
		switch (node2.nodeType) {
		case ELEMENT_NODE:
			var attrs	= node.attributes;
			var attrs2	= node2.attributes = new NamedNodeMap();
			var len = attrs.length;
			attrs2._ownerElement = node2;
			for(var i=0;i<len;i++){
				node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
			}
			break;
		case ATTRIBUTE_NODE:
			deep = true;
		}
		if(deep){
			var child = node.firstChild;
			while(child){
				node2.appendChild(cloneNode(doc,child,deep));
				child = child.nextSibling;
			}
		}
		return node2;
	}

	function __set__(object,key,value){
		object[key] = value;
	}
	//do dynamic
	try{
		if(Object.defineProperty){
			Object.defineProperty(LiveNodeList.prototype,'length',{
				get:function(){
					_updateLiveList(this);
					return this.$$length;
				}
			});
			Object.defineProperty(Node$1.prototype,'textContent',{
				get:function(){
					return getTextContent(this);
				},
				set:function(data){
					switch(this.nodeType){
					case ELEMENT_NODE:
					case DOCUMENT_FRAGMENT_NODE:
						while(this.firstChild){
							this.removeChild(this.firstChild);
						}
						if(data || String(data)){
							this.appendChild(this.ownerDocument.createTextNode(data));
						}
						break;
					default:
						//TODO:
						this.data = data;
						this.value = data;
						this.nodeValue = data;
					}
				}
			});
			
			function getTextContent(node){
				switch(node.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					var buf = [];
					node = node.firstChild;
					while(node){
						if(node.nodeType!==7 && node.nodeType !==8){
							buf.push(getTextContent(node));
						}
						node = node.nextSibling;
					}
					return buf.join('');
				default:
					return node.nodeValue;
				}
			}
			__set__ = function(object,key,value){
				//console.log(value)
				object['$$'+key] = value;
			};
		}
	}catch(e){//ie8
	}

	//if(typeof require == 'function'){
		var DOMImplementation_1 = DOMImplementation;
		var XMLSerializer_1 = XMLSerializer$1;
	//}

	var dom = {
		DOMImplementation: DOMImplementation_1,
		XMLSerializer: XMLSerializer_1
	};

	var domParser = createCommonjsModule(function (module, exports) {
	function DOMParser(options){
		this.options = options ||{locator:{}};
		
	}
	DOMParser.prototype.parseFromString = function(source,mimeType){
		var options = this.options;
		var sax$$1 =  new XMLReader();
		var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
		var errorHandler = options.errorHandler;
		var locator = options.locator;
		var defaultNSMap = options.xmlns||{};
		var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"};
		if(locator){
			domBuilder.setDocumentLocator(locator);
		}
		
		sax$$1.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
		sax$$1.domBuilder = options.domBuilder || domBuilder;
		if(/\/x?html?$/.test(mimeType)){
			entityMap.nbsp = '\xa0';
			entityMap.copy = '\xa9';
			defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
		}
		defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
		if(source){
			sax$$1.parse(source,defaultNSMap,entityMap);
		}else{
			sax$$1.errorHandler.error("invalid doc source");
		}
		return domBuilder.doc;
	};
	function buildErrorHandler(errorImpl,domBuilder,locator){
		if(!errorImpl){
			if(domBuilder instanceof DOMHandler){
				return domBuilder;
			}
			errorImpl = domBuilder ;
		}
		var errorHandler = {};
		var isCallback = errorImpl instanceof Function;
		locator = locator||{};
		function build(key){
			var fn = errorImpl[key];
			if(!fn && isCallback){
				fn = errorImpl.length == 2?function(msg){errorImpl(key,msg);}:errorImpl;
			}
			errorHandler[key] = fn && function(msg){
				fn('[xmldom '+key+']\t'+msg+_locator(locator));
			}||function(){};
		}
		build('warning');
		build('error');
		build('fatalError');
		return errorHandler;
	}

	//console.log('#\n\n\n\n\n\n\n####')
	/**
	 * +ContentHandler+ErrorHandler
	 * +LexicalHandler+EntityResolver2
	 * -DeclHandler-DTDHandler 
	 * 
	 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
	 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
	 */
	function DOMHandler() {
	    this.cdata = false;
	}
	function position(locator,node){
		node.lineNumber = locator.lineNumber;
		node.columnNumber = locator.columnNumber;
	}
	/**
	 * @see org.xml.sax.ContentHandler#startDocument
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
	 */ 
	DOMHandler.prototype = {
		startDocument : function() {
	    	this.doc = new DOMImplementation().createDocument(null, null, null);
	    	if (this.locator) {
	        	this.doc.documentURI = this.locator.systemId;
	    	}
		},
		startElement:function(namespaceURI, localName, qName, attrs) {
			var doc = this.doc;
		    var el = doc.createElementNS(namespaceURI, qName||localName);
		    var len = attrs.length;
		    appendElement(this, el);
		    this.currentElement = el;
		    
			this.locator && position(this.locator,el);
		    for (var i = 0 ; i < len; i++) {
		        var namespaceURI = attrs.getURI(i);
		        var value = attrs.getValue(i);
		        var qName = attrs.getQName(i);
				var attr = doc.createAttributeNS(namespaceURI, qName);
				this.locator &&position(attrs.getLocator(i),attr);
				attr.value = attr.nodeValue = value;
				el.setAttributeNode(attr);
		    }
		},
		endElement:function(namespaceURI, localName, qName) {
			var current = this.currentElement;
			var tagName = current.tagName;
			this.currentElement = current.parentNode;
		},
		startPrefixMapping:function(prefix, uri) {
		},
		endPrefixMapping:function(prefix) {
		},
		processingInstruction:function(target, data) {
		    var ins = this.doc.createProcessingInstruction(target, data);
		    this.locator && position(this.locator,ins);
		    appendElement(this, ins);
		},
		ignorableWhitespace:function(ch, start, length) {
		},
		characters:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
			//console.log(chars)
			if(chars){
				if (this.cdata) {
					var charNode = this.doc.createCDATASection(chars);
				} else {
					var charNode = this.doc.createTextNode(chars);
				}
				if(this.currentElement){
					this.currentElement.appendChild(charNode);
				}else if(/^\s*$/.test(chars)){
					this.doc.appendChild(charNode);
					//process xml
				}
				this.locator && position(this.locator,charNode);
			}
		},
		skippedEntity:function(name) {
		},
		endDocument:function() {
			this.doc.normalize();
		},
		setDocumentLocator:function (locator) {
		    if(this.locator = locator){// && !('lineNumber' in locator)){
		    	locator.lineNumber = 0;
		    }
		},
		//LexicalHandler
		comment:function(chars, start, length) {
			chars = _toString.apply(this,arguments);
		    var comm = this.doc.createComment(chars);
		    this.locator && position(this.locator,comm);
		    appendElement(this, comm);
		},
		
		startCDATA:function() {
		    //used in characters() methods
		    this.cdata = true;
		},
		endCDATA:function() {
		    this.cdata = false;
		},
		
		startDTD:function(name, publicId, systemId) {
			var impl = this.doc.implementation;
		    if (impl && impl.createDocumentType) {
		        var dt = impl.createDocumentType(name, publicId, systemId);
		        this.locator && position(this.locator,dt);
		        appendElement(this, dt);
		    }
		},
		/**
		 * @see org.xml.sax.ErrorHandler
		 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
		 */
		warning:function(error) {
			console.warn('[xmldom warning]\t'+error,_locator(this.locator));
		},
		error:function(error) {
			console.error('[xmldom error]\t'+error,_locator(this.locator));
		},
		fatalError:function(error) {
			console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
		    throw error;
		}
	};
	function _locator(l){
		if(l){
			return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
		}
	}
	function _toString(chars,start,length){
		if(typeof chars == 'string'){
			return chars.substr(start,length)
		}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
			if(chars.length >= start+length || start){
				return new java.lang.String(chars,start,length)+'';
			}
			return chars;
		}
	}

	/*
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
	 * used method of org.xml.sax.ext.LexicalHandler:
	 *  #comment(chars, start, length)
	 *  #startCDATA()
	 *  #endCDATA()
	 *  #startDTD(name, publicId, systemId)
	 *
	 *
	 * IGNORED method of org.xml.sax.ext.LexicalHandler:
	 *  #endDTD()
	 *  #startEntity(name)
	 *  #endEntity(name)
	 *
	 *
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
	 * IGNORED method of org.xml.sax.ext.DeclHandler
	 * 	#attributeDecl(eName, aName, type, mode, value)
	 *  #elementDecl(name, model)
	 *  #externalEntityDecl(name, publicId, systemId)
	 *  #internalEntityDecl(name, value)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
	 * IGNORED method of org.xml.sax.EntityResolver2
	 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
	 *  #resolveEntity(publicId, systemId)
	 *  #getExternalSubset(name, baseURI)
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
	 * IGNORED method of org.xml.sax.DTDHandler
	 *  #notationDecl(name, publicId, systemId) {};
	 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
	 */
	"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
		DOMHandler.prototype[key] = function(){return null};
	});

	/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
	function appendElement (hander,node) {
	    if (!hander.currentElement) {
	        hander.doc.appendChild(node);
	    } else {
	        hander.currentElement.appendChild(node);
	    }
	}//appendChild and setAttributeNS are preformance key

	//if(typeof require == 'function'){
		var XMLReader = sax.XMLReader;
		var DOMImplementation = exports.DOMImplementation = dom.DOMImplementation;
		exports.XMLSerializer = dom.XMLSerializer ;
		exports.DOMParser = DOMParser;
	//}
	});
	var domParser_1 = domParser.DOMImplementation;
	var domParser_2 = domParser.XMLSerializer;
	var domParser_3 = domParser.DOMParser;

	/*
	 * canvg.js - Javascript SVG parser and renderer on Canvas
	 * MIT Licensed
	 * Gabe Lerner (gabelerner@gmail.com)
	 * http://code.google.com/p/canvg/
	 *
	 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
	 */

	/*
	canvg(target, s)
	  empty parameters: replace all 'svg' elements on page with 'canvas' elements
	  target: canvas element or the id of a canvas element
	  s: svg string, url to svg file, or xml document
	  opts: optional hash of options
	    ignoreMouse: true => ignore mouse events
	    ignoreAnimation: true => ignore animations
	    ignoreDimensions: true => does not try to resize canvas
	    ignoreClear: true => does not clear canvas
	    offsetX: int => draws at a x offset
	    offsetY: int => draws at a y offset
	    scaleWidth: int => scales horizontally to width
	    scaleHeight: int => scales vertically to height
	    renderCallback: function => will call the function after the first render is completed
	    forceRedraw: function => will call the function on every frame, if it returns true, will redraw
	*/
	function canvg(target, s, opts) {

		// no parameters
		if (target == null && s == null && opts == null) {
			var svgTags = document.querySelectorAll('svg');
			for (var i=0; i<svgTags.length; i++) {
				var svgTag = svgTags[i];
				var c = document.createElement('canvas');
				c.width = svgTag.clientWidth;
				c.height = svgTag.clientHeight;
				svgTag.parentNode.insertBefore(c, svgTag);
				svgTag.parentNode.removeChild(svgTag);
				var div = document.createElement('div');
				div.appendChild(svgTag);
				canvg(c, div.innerHTML);
			}
			return;
		}

		if (typeof target == 'string') {
			target = document.getElementById(target);
		}

		// store class on canvas
		if (target.svg != null) { target.svg.stop(); }
		var svg = build(opts || {});
		// on i.e. 8 for flash canvas, we can't assign the property so check for it
		if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) { target.svg = svg; }

		var ctx = target.getContext('2d');
		if (typeof s.documentElement != 'undefined') {
			// load from xml doc
			svg.loadXmlDoc(ctx, s);
		}
		else if (s.substr(0,1) == '<') {
			// load from xml string
			svg.loadXml(ctx, s);
		}
		else {
			// load from url
			svg.load(ctx, s);
		}
	}

	function getMatchesSelector() {
	  // see https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
	  var matchesSelector;
	  if (typeof Element.prototype.matches != 'undefined') {
	  	matchesSelector = function(node, selector) {
	  		return node.matches(selector);
	  	};
	  } else if (typeof Element.prototype.webkitMatchesSelector != 'undefined') {
	  	matchesSelector = function(node, selector) {
	  		return node.webkitMatchesSelector(selector);
	  	};
	  } else if (typeof Element.prototype.mozMatchesSelector != 'undefined') {
	  	matchesSelector = function(node, selector) {
	  		return node.mozMatchesSelector(selector);
	  	};
	  } else if (typeof Element.prototype.msMatchesSelector != 'undefined') {
	  	matchesSelector = function(node, selector) {
	  		return node.msMatchesSelector(selector);
	  	};
	  } else if (typeof Element.prototype.oMatchesSelector != 'undefined') {
	  	matchesSelector = function(node, selector) {
	  		return node.oMatchesSelector(selector);
	  	};
	  } else {
	  	// requires Sizzle: https://github.com/jquery/sizzle/wiki/Sizzle-Documentation
	  	// or jQuery: http://jquery.com/download/
	  	// or Zepto: http://zeptojs.com/#
	  	// without it, this is a ReferenceError

	  	if (typeof jQuery == 'function' || typeof Zepto == 'function') {
	  		matchesSelector = function (node, selector) {
	  			return $(node).is(selector);
	  		};
	  	}

	  	if (typeof matchesSelector == 'undefined') {
	  		matchesSelector = Sizzle.matchesSelector;
	  	}
	  }

	  return matchesSelector;
	}

	function getSelectorSpecificity(selector) {
		var typeCount = [0, 0, 0];

	  // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js
	  var attributeRegex = /(\[[^\]]+\])/g;
	  var idRegex = /(#[^\s\+>~\.\[:]+)/g;
	  var classRegex = /(\.[^\s\+>~\.\[:]+)/g;
	  var pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi;
	  var pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi;
	  var pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g;
	  var elementRegex = /([^\s\+>~\.\[:]+)/g;

		var findMatch = function(regex, type) {
			var matches = selector.match(regex);
			if (matches == null) {
				return;
			}
			typeCount[type] += matches.length;
			selector = selector.replace(regex, ' ');
		};

		selector = selector.replace(/:not\(([^\)]*)\)/g, '     $1 ');
		selector = selector.replace(/{[^]*/gm, ' ');
		findMatch(attributeRegex, 1);
		findMatch(idRegex, 0);
		findMatch(classRegex, 1);
		findMatch(pseudoElementRegex, 2);
		findMatch(pseudoClassWithBracketsRegex, 1);
		findMatch(pseudoClassRegex, 1);
		selector = selector.replace(/[\*\s\+>~]/g, ' ');
		selector = selector.replace(/[#\.]/g, ' ');
		findMatch(elementRegex, 2);
		return typeCount.join('');
	}

	function build(opts) {
		var svg = { opts: opts };

	  var matchesSelector = getMatchesSelector();

	  if (typeof CanvasRenderingContext2D  != 'undefined') {
	    CanvasRenderingContext2D.prototype.drawSvg = function(s, dx, dy, dw, dh, opts) {
	      var cOpts = {
	        ignoreMouse: true,
	        ignoreAnimation: true,
	        ignoreDimensions: true,
	        ignoreClear: true,
	        offsetX: dx,
	        offsetY: dy,
	        scaleWidth: dw,
	        scaleHeight: dh
	      };

	      for(var prop in opts) {
	        if(opts.hasOwnProperty(prop)){
	          cOpts[prop] = opts[prop];
	        }
	      }
	      canvg(this.canvas, s, cOpts);
	    };
	  }

		svg.FRAMERATE = 30;
		svg.MAX_VIRTUAL_PIXELS = 30000;

		svg.log = function(msg) {};
		if (svg.opts.log == true && typeof console != 'undefined') {
			svg.log = function(msg) { console.log(msg); };
		}

		// globals
		svg.init = function(ctx) {
			var uniqueId = 0;
			svg.UniqueId = function () { uniqueId++; return 'canvg' + uniqueId;	};
			svg.Definitions = {};
			svg.Styles = {};
			svg.StylesSpecificity = {};
			svg.Animations = [];
			svg.Images = [];
			svg.ctx = ctx;
			svg.ViewPort = new (function () {
				this.viewPorts = [];
				this.Clear = function() { this.viewPorts = []; };
				this.SetCurrent = function(width, height) { this.viewPorts.push({ width: width, height: height }); };
				this.RemoveCurrent = function() { this.viewPorts.pop(); };
				this.Current = function() { return this.viewPorts[this.viewPorts.length - 1]; };
				this.width = function() { return this.Current().width; };
				this.height = function() { return this.Current().height; };
				this.ComputeSize = function(d) {
					if (d != null && typeof d == 'number') { return d; }
					if (d == 'x') { return this.width(); }
					if (d == 'y') { return this.height(); }
					return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
				};
			});
		};
		svg.init();

		// images loaded
		svg.ImagesLoaded = function() {
			for (var i=0; i<svg.Images.length; i++) {
				if (!svg.Images[i].loaded) { return false; }
			}
			return true;
		};

		// trim
		svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); };

		// compress spaces
		svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); };

		// ajax
		svg.ajax = function(url) {
			var AJAX;
			if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();}
			else{AJAX=new ActiveXObject('Microsoft.XMLHTTP');}
			if(AJAX){
			   AJAX.open('GET',url,false);
			   AJAX.send(null);
			   return AJAX.responseText;
			}
			return null;
		};

		// parse xml
		svg.parseXml = function(xml) {
			if (typeof Windows != 'undefined' && typeof Windows.Data != 'undefined' && typeof Windows.Data.Xml != 'undefined') {
				var xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
				var settings = new Windows.Data.Xml.Dom.XmlLoadSettings();
				settings.prohibitDtd = false;
				xmlDoc.loadXml(xml, settings);
				return xmlDoc;
			}
			else if (window.DOMParser)
			{
				var parser = new DOMParser();
				return parser.parseFromString(xml, 'text/xml');
			}
			else
			{
				xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
				var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = 'false';
				xmlDoc.loadXML(xml);
				return xmlDoc;
			}
		};

		svg.Property = function(name, value) {
			this.name = name;
			this.value = value;
		};
			svg.Property.prototype.getValue = function() {
				return this.value;
			};

			svg.Property.prototype.hasValue = function() {
				return (this.value != null && this.value != '');
			};

			// return the numerical value of the property
			svg.Property.prototype.numValue = function() {
				if (!this.hasValue()) { return 0; }

				var n = parseFloat(this.value);
				if ((this.value + '').match(/%$/)) {
					n = n / 100.0;
				}
				return n;
			};

			svg.Property.prototype.valueOrDefault = function(def) {
				if (this.hasValue()) { return this.value; }
				return def;
			};

			svg.Property.prototype.numValueOrDefault = function(def) {
				if (this.hasValue()) { return this.numValue(); }
				return def;
			};

			// color extensions
				// augment the current color value with the opacity
				svg.Property.prototype.addOpacity = function(opacityProp) {
					var newValue = this.value;
					if (opacityProp.value != null && opacityProp.value != '' && typeof this.value == 'string') { // can only add opacity to colors, not patterns
						var color = new rgbcolor(this.value);
						if (color.ok) {
							newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacityProp.numValue() + ')';
						}
					}
					return new svg.Property(this.name, newValue);
				};

			// definition extensions
				// get the definition from the definitions table
				svg.Property.prototype.getDefinition = function() {
					var name = this.value.match(/#([^\)'"]+)/);
					if (name) { name = name[1]; }
					if (!name) { name = this.value; }
					return svg.Definitions[name];
				};

				svg.Property.prototype.isUrlDefinition = function() {
					return this.value.indexOf('url(') == 0
				};

				svg.Property.prototype.getFillStyleDefinition = function(e, opacityProp) {
					var def = this.getDefinition();

					// gradient
					if (def != null && def.createGradient) {
						return def.createGradient(svg.ctx, e, opacityProp);
					}

					// pattern
					if (def != null && def.createPattern) {
						if (def.getHrefAttribute().hasValue()) {
							var pt = def.attribute('patternTransform');
							def = def.getHrefAttribute().getDefinition();
							if (pt.hasValue()) { def.attribute('patternTransform', true).value = pt.value; }
						}
						return def.createPattern(svg.ctx, e);
					}

					return null;
				};

			// length extensions
				svg.Property.prototype.getDPI = function(viewPort) {
					return 96.0; // TODO: compute?
				};

				svg.Property.prototype.getEM = function(viewPort) {
					var em = 12;

					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					if (fontSize.hasValue()) { em = fontSize.toPixels(viewPort); }

					return em;
				};

				svg.Property.prototype.getUnits = function() {
					var s = this.value+'';
					return s.replace(/[0-9\.\-]/g,'');
				};

				// get the length as pixels
				svg.Property.prototype.toPixels = function(viewPort, processPercent) {
					if (!this.hasValue()) { return 0; }
					var s = this.value+'';
					if (s.match(/em$/)) { return this.numValue() * this.getEM(viewPort); }
					if (s.match(/ex$/)) { return this.numValue() * this.getEM(viewPort) / 2.0; }
					if (s.match(/px$/)) { return this.numValue(); }
					if (s.match(/pt$/)) { return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0); }
					if (s.match(/pc$/)) { return this.numValue() * 15; }
					if (s.match(/cm$/)) { return this.numValue() * this.getDPI(viewPort) / 2.54; }
					if (s.match(/mm$/)) { return this.numValue() * this.getDPI(viewPort) / 25.4; }
					if (s.match(/in$/)) { return this.numValue() * this.getDPI(viewPort); }
					if (s.match(/%$/)) { return this.numValue() * svg.ViewPort.ComputeSize(viewPort); }
					var n = this.numValue();
					if (processPercent && n < 1.0) { return n * svg.ViewPort.ComputeSize(viewPort); }
					return n;
				};

			// time extensions
				// get the time as milliseconds
				svg.Property.prototype.toMilliseconds = function() {
					if (!this.hasValue()) { return 0; }
					var s = this.value+'';
					if (s.match(/s$/)) { return this.numValue() * 1000; }
					if (s.match(/ms$/)) { return this.numValue(); }
					return this.numValue();
				};

			// angle extensions
				// get the angle as radians
				svg.Property.prototype.toRadians = function() {
					if (!this.hasValue()) { return 0; }
					var s = this.value+'';
					if (s.match(/deg$/)) { return this.numValue() * (Math.PI / 180.0); }
					if (s.match(/grad$/)) { return this.numValue() * (Math.PI / 200.0); }
					if (s.match(/rad$/)) { return this.numValue(); }
					return this.numValue() * (Math.PI / 180.0);
				};

			// text extensions
				// get the text baseline
				var textBaselineMapping = {
					'baseline': 'alphabetic',
					'before-edge': 'top',
					'text-before-edge': 'top',
					'middle': 'middle',
					'central': 'middle',
					'after-edge': 'bottom',
					'text-after-edge': 'bottom',
					'ideographic': 'ideographic',
					'alphabetic': 'alphabetic',
					'hanging': 'hanging',
					'mathematical': 'alphabetic'
				};
				svg.Property.prototype.toTextBaseline = function () {
					if (!this.hasValue()) { return null; }
					return textBaselineMapping[this.value];
				};

		// fonts
		svg.Font = new (function() {
			this.Styles = 'normal|italic|oblique|inherit';
			this.Variants = 'normal|small-caps|inherit';
			this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

			this.CreateFont = function(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
				var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
				return {
					fontFamily: fontFamily || f.fontFamily,
					fontSize: fontSize || f.fontSize,
					fontStyle: fontStyle || f.fontStyle,
					fontWeight: fontWeight || f.fontWeight,
					fontVariant: fontVariant || f.fontVariant,
					toString: function () { return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ') }
				}
			};

			var that = this;
			this.Parse = function(s) {
				var f = {};
				var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
				var set = { fontSize: false, fontStyle: false, fontWeight: false, fontVariant: false };
				var ff = '';
				for (var i=0; i<d.length; i++) {
					if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) { if (d[i] != 'inherit') { f.fontStyle = d[i]; } set.fontStyle = true; }
					else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) { if (d[i] != 'inherit') { f.fontVariant = d[i]; } set.fontStyle = set.fontVariant = true;	}
					else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {	if (d[i] != 'inherit') { f.fontWeight = d[i]; } set.fontStyle = set.fontVariant = set.fontWeight = true; }
					else if (!set.fontSize) { if (d[i] != 'inherit') { f.fontSize = d[i].split('/')[0]; } set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true; }
					else { if (d[i] != 'inherit') { ff += d[i]; } }
				} if (ff != '') { f.fontFamily = ff; }
				return f;
			};
		});

		// points and paths
		svg.ToNumberArray = function(s) {
			var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');
			for (var i=0; i<a.length; i++) {
				a[i] = parseFloat(a[i]);
			}
			return a;
		};
		svg.Point = function(x, y) {
			this.x = x;
			this.y = y;
		};
			svg.Point.prototype.angleTo = function(p) {
				return Math.atan2(p.y - this.y, p.x - this.x);
			};

			svg.Point.prototype.applyTransform = function(v) {
				var xp = this.x * v[0] + this.y * v[2] + v[4];
				var yp = this.x * v[1] + this.y * v[3] + v[5];
				this.x = xp;
				this.y = yp;
			};

		svg.CreatePoint = function(s) {
			var a = svg.ToNumberArray(s);
			return new svg.Point(a[0], a[1]);
		};
		svg.CreatePath = function(s) {
			var a = svg.ToNumberArray(s);
			var path = [];
			for (var i=0; i<a.length; i+=2) {
				path.push(new svg.Point(a[i], a[i+1]));
			}
			return path;
		};

		// bounding box
		svg.BoundingBox = function(x1, y1, x2, y2) { // pass in initial points if you want
			this.x1 = Number.NaN;
			this.y1 = Number.NaN;
			this.x2 = Number.NaN;
			this.y2 = Number.NaN;

			this.x = function() { return this.x1; };
			this.y = function() { return this.y1; };
			this.width = function() { return this.x2 - this.x1; };
			this.height = function() { return this.y2 - this.y1; };

			this.addPoint = function(x, y) {
				if (x != null) {
					if (isNaN(this.x1) || isNaN(this.x2)) {
						this.x1 = x;
						this.x2 = x;
					}
					if (x < this.x1) { this.x1 = x; }
					if (x > this.x2) { this.x2 = x; }
				}

				if (y != null) {
					if (isNaN(this.y1) || isNaN(this.y2)) {
						this.y1 = y;
						this.y2 = y;
					}
					if (y < this.y1) { this.y1 = y; }
					if (y > this.y2) { this.y2 = y; }
				}
			};
			this.addX = function(x) { this.addPoint(x, null); };
			this.addY = function(y) { this.addPoint(null, y); };

			this.addBoundingBox = function(bb) {
				this.addPoint(bb.x1, bb.y1);
				this.addPoint(bb.x2, bb.y2);
			};

			this.addQuadraticCurve = function(p0x, p0y, p1x, p1y, p2x, p2y) {
				var cp1x = p0x + 2/3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp1y = p0y + 2/3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)
				var cp2x = cp1x + 1/3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)
				var cp2y = cp1y + 1/3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)
				this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y,	cp2y, p2x, p2y);
			};

			this.addBezierCurve = function(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
				// from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
				var p0 = [p0x, p0y], p1 = [p1x, p1y], p2 = [p2x, p2y], p3 = [p3x, p3y];
				this.addPoint(p0[0], p0[1]);
				this.addPoint(p3[0], p3[1]);

				for (var i=0; i<=1; i++) {
					var f = function(t) {
						return Math.pow(1-t, 3) * p0[i]
						+ 3 * Math.pow(1-t, 2) * t * p1[i]
						+ 3 * (1-t) * Math.pow(t, 2) * p2[i]
						+ Math.pow(t, 3) * p3[i];
					};

					var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
					var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
					var c = 3 * p1[i] - 3 * p0[i];

					if (a == 0) {
						if (b == 0) { continue; }
						var t = -c / b;
						if (0 < t && t < 1) {
							if (i == 0) { this.addX(f(t)); }
							if (i == 1) { this.addY(f(t)); }
						}
						continue;
					}

					var b2ac = Math.pow(b, 2) - 4 * c * a;
					if (b2ac < 0) { continue; }
					var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
					if (0 < t1 && t1 < 1) {
						if (i == 0) { this.addX(f(t1)); }
						if (i == 1) { this.addY(f(t1)); }
					}
					var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
					if (0 < t2 && t2 < 1) {
						if (i == 0) { this.addX(f(t2)); }
						if (i == 1) { this.addY(f(t2)); }
					}
				}
			};

			this.isPointInBox = function(x, y) {
				return (this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2);
			};

			this.addPoint(x1, y1);
			this.addPoint(x2, y2);
		};

		// transforms
		svg.Transform = function(v) {
			var that = this;
			this.Type = {};

			// translate
			this.Type.translate = function(s) {
				this.p = svg.CreatePoint(s);
				this.apply = function(ctx) {
					ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
				};
				this.unapply = function(ctx) {
					ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
				};
				this.applyToPoint = function(p) {
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
				};
			};

			// rotate
			this.Type.rotate = function(s) {
				var a = svg.ToNumberArray(s);
				this.angle = new svg.Property('angle', a[0]);
				this.cx = a[1] || 0;
				this.cy = a[2] || 0;
				this.apply = function(ctx) {
					ctx.translate(this.cx, this.cy);
					ctx.rotate(this.angle.toRadians());
					ctx.translate(-this.cx, -this.cy);
				};
				this.unapply = function(ctx) {
					ctx.translate(this.cx, this.cy);
					ctx.rotate(-1.0 * this.angle.toRadians());
					ctx.translate(-this.cx, -this.cy);
				};
				this.applyToPoint = function(p) {
					var a = this.angle.toRadians();
					p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
					p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
					p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
				};
			};

			this.Type.scale = function(s) {
				this.p = svg.CreatePoint(s);
				this.apply = function(ctx) {
					ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
				};
				this.unapply = function(ctx) {
					ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
				};
				this.applyToPoint = function(p) {
					p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
				};
			};

			this.Type.matrix = function(s) {
				this.m = svg.ToNumberArray(s);
				this.apply = function(ctx) {
					ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
				};
				this.unapply = function(ctx) {
					var a = this.m[0];
					var b = this.m[2];
					var c = this.m[4];
					var d = this.m[1];
					var e = this.m[3];
					var f = this.m[5];
					var g = 0.0;
					var h = 0.0;
					var i = 1.0;
					var det = 1 / (a*(e*i-f*h)-b*(d*i-f*g)+c*(d*h-e*g));
					ctx.transform(
						det*(e*i-f*h),
						det*(f*g-d*i),
						det*(c*h-b*i),
						det*(a*i-c*g),
						det*(b*f-c*e),
						det*(c*d-a*f)
					);
				};
				this.applyToPoint = function(p) {
					p.applyTransform(this.m);
				};
			};

			this.Type.SkewBase = function(s) {
				this.base = that.Type.matrix;
				this.base(s);
				this.angle = new svg.Property('angle', s);
			};
			this.Type.SkewBase.prototype = new this.Type.matrix;

			this.Type.skewX = function(s) {
				this.base = that.Type.SkewBase;
				this.base(s);
				this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
			};
			this.Type.skewX.prototype = new this.Type.SkewBase;

			this.Type.skewY = function(s) {
				this.base = that.Type.SkewBase;
				this.base(s);
				this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
			};
			this.Type.skewY.prototype = new this.Type.SkewBase;

			this.transforms = [];

			this.apply = function(ctx) {
				for (var i=0; i<this.transforms.length; i++) {
					this.transforms[i].apply(ctx);
				}
			};

			this.unapply = function(ctx) {
				for (var i=this.transforms.length-1; i>=0; i--) {
					this.transforms[i].unapply(ctx);
				}
			};

			this.applyToPoint = function(p) {
				for (var i=0; i<this.transforms.length; i++) {
					this.transforms[i].applyToPoint(p);
				}
			};

			var data = svg.trim(svg.compressSpaces(v)).replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g,') ').split(/\s(?=[a-z])/);
			for (var i=0; i<data.length; i++) {
				var type = svg.trim(data[i].split('(')[0]);
				var s = data[i].split('(')[1].replace(')','');
				var transformType = this.Type[type];
				if (typeof transformType != 'undefined') {
					var transform = new transformType(s);
					transform.type = type;
					this.transforms.push(transform);
				}
			}
		};

		// aspect ratio
		svg.AspectRatio = function(ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
			// aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
			aspectRatio = svg.compressSpaces(aspectRatio);
			aspectRatio = aspectRatio.replace(/^defer\s/,''); // ignore defer
			var align = aspectRatio.split(' ')[0] || 'xMidYMid';
			var meetOrSlice = aspectRatio.split(' ')[1] || 'meet';

			// calculate scale
			var scaleX = width / desiredWidth;
			var scaleY = height / desiredHeight;
			var scaleMin = Math.min(scaleX, scaleY);
			var scaleMax = Math.max(scaleX, scaleY);
			if (meetOrSlice == 'meet') { desiredWidth *= scaleMin; desiredHeight *= scaleMin; }
			if (meetOrSlice == 'slice') { desiredWidth *= scaleMax; desiredHeight *= scaleMax; }

			refX = new svg.Property('refX', refX);
			refY = new svg.Property('refY', refY);
			if (refX.hasValue() && refY.hasValue()) {
				ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
			}
			else {
				// align
				if (align.match(/^xMid/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) { ctx.translate(width / 2.0 - desiredWidth / 2.0, 0); }
				if (align.match(/YMid$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) { ctx.translate(0, height / 2.0 - desiredHeight / 2.0); }
				if (align.match(/^xMax/) && ((meetOrSlice == 'meet' && scaleMin == scaleY) || (meetOrSlice == 'slice' && scaleMax == scaleY))) { ctx.translate(width - desiredWidth, 0); }
				if (align.match(/YMax$/) && ((meetOrSlice == 'meet' && scaleMin == scaleX) || (meetOrSlice == 'slice' && scaleMax == scaleX))) { ctx.translate(0, height - desiredHeight); }
			}

			// scale
			if (align == 'none') { ctx.scale(scaleX, scaleY); }
			else if (meetOrSlice == 'meet') { ctx.scale(scaleMin, scaleMin); }
			else if (meetOrSlice == 'slice') { ctx.scale(scaleMax, scaleMax); }

			// translate
			ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);
		};

		// elements
		svg.Element = {};

		svg.EmptyProperty = new svg.Property('EMPTY', '');

		svg.Element.ElementBase = function(node) {
			this.attributes = {};
			this.styles = {};
			this.stylesSpecificity = {};
			this.children = [];

			// get or create attribute
			this.attribute = function(name, createIfNotExists) {
				var a = this.attributes[name];
				if (a != null) { return a; }

				if (createIfNotExists == true) { a = new svg.Property(name, ''); this.attributes[name] = a; }
				return a || svg.EmptyProperty;
			};

			this.getHrefAttribute = function() {
				for (var a in this.attributes) {
					if (a == 'href' || a.match(/:href$/)) {
						return this.attributes[a];
					}
				}
				return svg.EmptyProperty;
			};

			// get or create style, crawls up node tree
			this.style = function(name, createIfNotExists, skipAncestors) {
				var s = this.styles[name];
				if (s != null) { return s; }

				var a = this.attribute(name);
				if (a != null && a.hasValue()) {
					this.styles[name] = a; // move up to me to cache
					return a;
				}

				if (skipAncestors != true) {
					var p = this.parent;
					if (p != null) {
						var ps = p.style(name);
						if (ps != null && ps.hasValue()) {
							return ps;
						}
					}
				}

				if (createIfNotExists == true) { s = new svg.Property(name, ''); this.styles[name] = s; }
				return s || svg.EmptyProperty;
			};

			// base render
			this.render = function(ctx) {
				// don't render display=none
				if (this.style('display').value == 'none') { return; }

				// don't render visibility=hidden
				if (this.style('visibility').value == 'hidden') { return; }

				ctx.save();
				if (this.style('mask').hasValue()) { // mask
					var mask = this.style('mask').getDefinition();
					if (mask != null) { mask.apply(ctx, this); }
				}
				else if (this.style('filter').hasValue()) { // filter
					var filter = this.style('filter').getDefinition();
					if (filter != null) { filter.apply(ctx, this); }
				}
				else {
					this.setContext(ctx);
					this.renderChildren(ctx);
					this.clearContext(ctx);
				}
				ctx.restore();
			};

			// base set context
			this.setContext = function(ctx) {
				// OVERRIDE ME!
			};

			// base clear context
			this.clearContext = function(ctx) {
				// OVERRIDE ME!
			};

			// base render children
			this.renderChildren = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					this.children[i].render(ctx);
				}
			};

			this.addChild = function(childNode, create) {
				var child = childNode;
				if (create) { child = svg.CreateElement(childNode); }
				child.parent = this;
				if (child.type != 'title') { this.children.push(child);	}
			};

			this.addStylesFromStyleDefinition = function () {
				// add styles
				for (var selector in svg.Styles) {
					if (selector[0] != '@' && matchesSelector(node, selector)) {
						var styles = svg.Styles[selector];
						var specificity = svg.StylesSpecificity[selector];
						if (styles != null) {
							for (var name in styles) {
								var existingSpecificity = this.stylesSpecificity[name];
								if (typeof existingSpecificity == 'undefined') {
									existingSpecificity = '000';
								}
								if (specificity > existingSpecificity) {
									this.styles[name] = styles[name];
									this.stylesSpecificity[name] = specificity;
								}
							}
						}
					}
				}
			};

			if (node != null && node.nodeType == 1) { //ELEMENT_NODE
				// add attributes
				for (var i=0; i<node.attributes.length; i++) {
					var attribute = node.attributes[i];
					this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.value);
				}

				this.addStylesFromStyleDefinition();

				// add inline styles
				if (this.attribute('style').hasValue()) {
					var styles = this.attribute('style').value.split(';');
					for (var i=0; i<styles.length; i++) {
						if (svg.trim(styles[i]) != '') {
							var style = styles[i].split(':');
							var name = svg.trim(style[0]);
							var value = svg.trim(style[1]);
							this.styles[name] = new svg.Property(name, value);
						}
					}
				}

				// add id
				if (this.attribute('id').hasValue()) {
					if (svg.Definitions[this.attribute('id').value] == null) {
						svg.Definitions[this.attribute('id').value] = this;
					}
				}

				// add children
				for (var i=0; i<node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					if (childNode.nodeType == 1) { this.addChild(childNode, true); } //ELEMENT_NODE
					if (this.captureTextNodes && (childNode.nodeType == 3 || childNode.nodeType == 4)) {
						var text = childNode.value || childNode.text || childNode.textContent || '';
						if (svg.compressSpaces(text) != '') {
							this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
						}
					}
				}
			}
		};

		svg.Element.RenderedElementBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.setContext = function(ctx) {
				// fill
				if (this.style('fill').isUrlDefinition()) {
					var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
					if (fs != null) { ctx.fillStyle = fs; }
				}
				else if (this.style('fill').hasValue()) {
					var fillStyle = this.style('fill');
					if (fillStyle.value == 'currentColor') { fillStyle.value = this.style('color').value; }
					if (fillStyle.value != 'inherit') { ctx.fillStyle = (fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value); }
				}
				if (this.style('fill-opacity').hasValue()) {
					var fillStyle = new svg.Property('fill', ctx.fillStyle);
					fillStyle = fillStyle.addOpacity(this.style('fill-opacity'));
					ctx.fillStyle = fillStyle.value;
				}

				// stroke
				if (this.style('stroke').isUrlDefinition()) {
					var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
					if (fs != null) { ctx.strokeStyle = fs; }
				}
				else if (this.style('stroke').hasValue()) {
					var strokeStyle = this.style('stroke');
					if (strokeStyle.value == 'currentColor') { strokeStyle.value = this.style('color').value; }
					if (strokeStyle.value != 'inherit') { ctx.strokeStyle = (strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value); }
				}
				if (this.style('stroke-opacity').hasValue()) {
					var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
					strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity'));
					ctx.strokeStyle = strokeStyle.value;
				}
				if (this.style('stroke-width').hasValue()) {
					var newLineWidth = this.style('stroke-width').toPixels();
					ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
			    }
				if (this.style('stroke-linecap').hasValue()) { ctx.lineCap = this.style('stroke-linecap').value; }
				if (this.style('stroke-linejoin').hasValue()) { ctx.lineJoin = this.style('stroke-linejoin').value; }
				if (this.style('stroke-miterlimit').hasValue()) { ctx.miterLimit = this.style('stroke-miterlimit').value; }
				if (this.style('stroke-dasharray').hasValue() && this.style('stroke-dasharray').value != 'none') {
					var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);
					if (typeof ctx.setLineDash != 'undefined') { ctx.setLineDash(gaps); }
					else if (typeof ctx.webkitLineDash != 'undefined') { ctx.webkitLineDash = gaps; }
					else if (typeof ctx.mozDash != 'undefined' && !(gaps.length==1 && gaps[0]==0)) { ctx.mozDash = gaps; }

					var offset = this.style('stroke-dashoffset').numValueOrDefault(1);
					if (typeof ctx.lineDashOffset != 'undefined') { ctx.lineDashOffset = offset; }
					else if (typeof ctx.webkitLineDashOffset != 'undefined') { ctx.webkitLineDashOffset = offset; }
					else if (typeof ctx.mozDashOffset != 'undefined') { ctx.mozDashOffset = offset; }
				}

				// font
				if (typeof ctx.font != 'undefined') {
					ctx.font = svg.Font.CreateFont(
						this.style('font-style').value,
						this.style('font-variant').value,
						this.style('font-weight').value,
						this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '',
						this.style('font-family').value).toString();
				}

				// transform
				if (this.style('transform', false, true).hasValue()) {
					var transform = new svg.Transform(this.style('transform', false, true).value);
					transform.apply(ctx);
				}

				// clip
				if (this.style('clip-path', false, true).hasValue()) {
					var clip = this.style('clip-path', false, true).getDefinition();
					if (clip != null) { clip.apply(ctx); }
				}

				// opacity
				if (this.style('opacity').hasValue()) {
					ctx.globalAlpha = this.style('opacity').numValue();
				}
			};
		};
		svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase;

		svg.Element.PathElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.path = function(ctx) {
				if (ctx != null) { ctx.beginPath(); }
				return new svg.BoundingBox();
			};

			this.renderChildren = function(ctx) {
				this.path(ctx);
				svg.Mouse.checkPath(this, ctx);
				if (ctx.fillStyle != '') {
					if (this.style('fill-rule').valueOrDefault('inherit') != 'inherit') { ctx.fill(this.style('fill-rule').value); }
					else { ctx.fill(); }
				}
				if (ctx.strokeStyle != '') { ctx.stroke(); }

				var markers = this.getMarkers();
				if (markers != null) {
					if (this.style('marker-start').isUrlDefinition()) {
						var marker = this.style('marker-start').getDefinition();
						marker.render(ctx, markers[0][0], markers[0][1]);
					}
					if (this.style('marker-mid').isUrlDefinition()) {
						var marker = this.style('marker-mid').getDefinition();
						for (var i=1;i<markers.length-1;i++) {
							marker.render(ctx, markers[i][0], markers[i][1]);
						}
					}
					if (this.style('marker-end').isUrlDefinition()) {
						var marker = this.style('marker-end').getDefinition();
						marker.render(ctx, markers[markers.length-1][0], markers[markers.length-1][1]);
					}
				}
			};

			this.getBoundingBox = function() {
				return this.path();
			};

			this.getMarkers = function() {
				return null;
			};
		};
		svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase;

		// svg element
		svg.Element.svg = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.baseClearContext = this.clearContext;
			this.clearContext = function(ctx) {
				this.baseClearContext(ctx);
				svg.ViewPort.RemoveCurrent();
			};

			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				// initial values and defaults
				ctx.strokeStyle = 'rgba(0,0,0,0)';
				ctx.lineCap = 'butt';
				ctx.lineJoin = 'miter';
				ctx.miterLimit = 4;
				if (typeof ctx.font != 'undefined' && typeof window.getComputedStyle != 'undefined') {
					ctx.font = window.getComputedStyle(ctx.canvas).getPropertyValue('font');
				}

				this.baseSetContext(ctx);

				// create new view port
				if (!this.attribute('x').hasValue()) { this.attribute('x', true).value = 0; }
				if (!this.attribute('y').hasValue()) { this.attribute('y', true).value = 0; }
				ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));

				var width = svg.ViewPort.width();
				var height = svg.ViewPort.height();

				if (!this.attribute('width').hasValue()) { this.attribute('width', true).value = '100%'; }
				if (!this.attribute('height').hasValue()) { this.attribute('height', true).value = '100%'; }
				if (typeof this.root == 'undefined') {
					width = this.attribute('width').toPixels('x');
					height = this.attribute('height').toPixels('y');

					var x = 0;
					var y = 0;
					if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
						x = -this.attribute('refX').toPixels('x');
						y = -this.attribute('refY').toPixels('y');
					}

					if (this.attribute('overflow').valueOrDefault('hidden') != 'visible') {
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(width, y);
						ctx.lineTo(width, height);
						ctx.lineTo(x, height);
						ctx.closePath();
						ctx.clip();
					}
				}
				svg.ViewPort.SetCurrent(width, height);

				// viewbox
				if (this.attribute('viewBox').hasValue()) {
					var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
					var minX = viewBox[0];
					var minY = viewBox[1];
					width = viewBox[2];
					height = viewBox[3];

					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value,
									svg.ViewPort.width(),
									width,
									svg.ViewPort.height(),
									height,
									minX,
									minY,
									this.attribute('refX').value,
									this.attribute('refY').value);

					svg.ViewPort.RemoveCurrent();
					svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
				}
			};
		};
		svg.Element.svg.prototype = new svg.Element.RenderedElementBase;

		// rect element
		svg.Element.rect = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			this.path = function(ctx) {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				var rx = this.attribute('rx').toPixels('x');
				var ry = this.attribute('ry').toPixels('y');
				if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) { ry = rx; }
				if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) { rx = ry; }
				rx = Math.min(rx, width / 2.0);
				ry = Math.min(ry, height / 2.0);
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(x + rx, y);
					ctx.lineTo(x + width - rx, y);
					ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
					ctx.lineTo(x + width, y + height - ry);
					ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
					ctx.lineTo(x + rx, y + height);
					ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
					ctx.lineTo(x, y + ry);
					ctx.quadraticCurveTo(x, y, x + rx, y);
					ctx.closePath();
				}

				return new svg.BoundingBox(x, y, x + width, y + height);
			};
		};
		svg.Element.rect.prototype = new svg.Element.PathElementBase;

		// circle element
		svg.Element.circle = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			this.path = function(ctx) {
				var cx = this.attribute('cx').toPixels('x');
				var cy = this.attribute('cy').toPixels('y');
				var r = this.attribute('r').toPixels();

				if (ctx != null) {
					ctx.beginPath();
					ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
					ctx.closePath();
				}

				return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
			};
		};
		svg.Element.circle.prototype = new svg.Element.PathElementBase;

		// ellipse element
		svg.Element.ellipse = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			this.path = function(ctx) {
				var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
				var rx = this.attribute('rx').toPixels('x');
				var ry = this.attribute('ry').toPixels('y');
				var cx = this.attribute('cx').toPixels('x');
				var cy = this.attribute('cy').toPixels('y');

				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(cx, cy - ry);
					ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
					ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
					ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
					ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
					ctx.closePath();
				}

				return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
			};
		};
		svg.Element.ellipse.prototype = new svg.Element.PathElementBase;

		// line element
		svg.Element.line = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			this.getPoints = function() {
				return [
					new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')),
					new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
			};

			this.path = function(ctx) {
				var points = this.getPoints();

				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(points[0].x, points[0].y);
					ctx.lineTo(points[1].x, points[1].y);
				}

				return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
			};

			this.getMarkers = function() {
				var points = this.getPoints();
				var a = points[0].angleTo(points[1]);
				return [[points[0], a], [points[1], a]];
			};
		};
		svg.Element.line.prototype = new svg.Element.PathElementBase;

		// polyline element
		svg.Element.polyline = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			this.points = svg.CreatePath(this.attribute('points').value);
			this.path = function(ctx) {
				var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);
				if (ctx != null) {
					ctx.beginPath();
					ctx.moveTo(this.points[0].x, this.points[0].y);
				}
				for (var i=1; i<this.points.length; i++) {
					bb.addPoint(this.points[i].x, this.points[i].y);
					if (ctx != null) { ctx.lineTo(this.points[i].x, this.points[i].y); }
				}
				return bb;
			};

			this.getMarkers = function() {
				var markers = [];
				for (var i=0; i<this.points.length - 1; i++) {
					markers.push([this.points[i], this.points[i].angleTo(this.points[i+1])]);
				}
				if (markers.length > 0) {
					markers.push([this.points[this.points.length-1], markers[markers.length-1][1]]);
				}
				return markers;
			};
		};
		svg.Element.polyline.prototype = new svg.Element.PathElementBase;

		// polygon element
		svg.Element.polygon = function(node) {
			this.base = svg.Element.polyline;
			this.base(node);

			this.basePath = this.path;
			this.path = function(ctx) {
				var bb = this.basePath(ctx);
				if (ctx != null) {
					ctx.lineTo(this.points[0].x, this.points[0].y);
					ctx.closePath();
				}
				return bb;
			};
		};
		svg.Element.polygon.prototype = new svg.Element.polyline;

		// path element
		svg.Element.path = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);

			var d = this.attribute('d').value;
			// TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
			d = d.replace(/,/gm,' '); // get rid of all commas
			// As the end of a match can also be the start of the next match, we need to run this replace twice.
			for(var i=0; i<2; i++)
				{ d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); } // suffix commands with spaces
			d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // prefix commands with spaces
			d = d.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits on +- signs
			// Again, we need to run this twice to find all occurances
			for(var i=0; i<2; i++)
				{ d = d.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); } // separate digits when they start with a comma
			d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
			d = svg.compressSpaces(d); // compress multiple spaces
			d = svg.trim(d);
			this.PathParser = new (function(d) {
				this.tokens = d.split(' ');

				this.reset = function() {
					this.i = -1;
					this.command = '';
					this.previousCommand = '';
					this.start = new svg.Point(0, 0);
					this.control = new svg.Point(0, 0);
					this.current = new svg.Point(0, 0);
					this.points = [];
					this.angles = [];
				};

				this.isEnd = function() {
					return this.i >= this.tokens.length - 1;
				};

				this.isCommandOrEnd = function() {
					if (this.isEnd()) { return true; }
					return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
				};

				this.isRelativeCommand = function() {
					switch(this.command)
					{
						case 'm':
						case 'l':
						case 'h':
						case 'v':
						case 'c':
						case 's':
						case 'q':
						case 't':
						case 'a':
						case 'z':
							return true;
							break;
					}
					return false;
				};

				this.getToken = function() {
					this.i++;
					return this.tokens[this.i];
				};

				this.getScalar = function() {
					return parseFloat(this.getToken());
				};

				this.nextCommand = function() {
					this.previousCommand = this.command;
					this.command = this.getToken();
				};

				this.getPoint = function() {
					var p = new svg.Point(this.getScalar(), this.getScalar());
					return this.makeAbsolute(p);
				};

				this.getAsControlPoint = function() {
					var p = this.getPoint();
					this.control = p;
					return p;
				};

				this.getAsCurrentPoint = function() {
					var p = this.getPoint();
					this.current = p;
					return p;
				};

				this.getReflectedControlPoint = function() {
					if (this.previousCommand.toLowerCase() != 'c' &&
					    this.previousCommand.toLowerCase() != 's' &&
						this.previousCommand.toLowerCase() != 'q' &&
						this.previousCommand.toLowerCase() != 't' ){
						return this.current;
					}

					// reflect point
					var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
					return p;
				};

				this.makeAbsolute = function(p) {
					if (this.isRelativeCommand()) {
						p.x += this.current.x;
						p.y += this.current.y;
					}
					return p;
				};

				this.addMarker = function(p, from, priorTo) {
					// if the last angle isn't filled in because we didn't have this point yet ...
					if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length-1] == null) {
						this.angles[this.angles.length-1] = this.points[this.points.length-1].angleTo(priorTo);
					}
					this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
				};

				this.addMarkerAngle = function(p, a) {
					this.points.push(p);
					this.angles.push(a);
				};

				this.getMarkerPoints = function() { return this.points; };
				this.getMarkerAngles = function() {
					for (var i=0; i<this.angles.length; i++) {
						if (this.angles[i] == null) {
							for (var j=i+1; j<this.angles.length; j++) {
								if (this.angles[j] != null) {
									this.angles[i] = this.angles[j];
									break;
								}
							}
						}
					}
					return this.angles;
				};
			})(d);

			this.path = function(ctx) {
				var pp = this.PathParser;
				pp.reset();

				var bb = new svg.BoundingBox();
				if (ctx != null) { ctx.beginPath(); }
				while (!pp.isEnd()) {
					pp.nextCommand();
					switch (pp.command) {
					case 'M':
					case 'm':
						var p = pp.getAsCurrentPoint();
						pp.addMarker(p);
						bb.addPoint(p.x, p.y);
						if (ctx != null) { ctx.moveTo(p.x, p.y); }
						pp.start = pp.current;
						while (!pp.isCommandOrEnd()) {
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, pp.start);
							bb.addPoint(p.x, p.y);
							if (ctx != null) { ctx.lineTo(p.x, p.y); }
						}
						break;
					case 'L':
					case 'l':
						while (!pp.isCommandOrEnd()) {
							var c = pp.current;
							var p = pp.getAsCurrentPoint();
							pp.addMarker(p, c);
							bb.addPoint(p.x, p.y);
							if (ctx != null) { ctx.lineTo(p.x, p.y); }
						}
						break;
					case 'H':
					case 'h':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) { ctx.lineTo(pp.current.x, pp.current.y); }
						}
						break;
					case 'V':
					case 'v':
						while (!pp.isCommandOrEnd()) {
							var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
							pp.addMarker(newP, pp.current);
							pp.current = newP;
							bb.addPoint(pp.current.x, pp.current.y);
							if (ctx != null) { ctx.lineTo(pp.current.x, pp.current.y); }
						}
						break;
					case 'C':
					case 'c':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) { ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y); }
						}
						break;
					case 'S':
					case 's':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var p1 = pp.getReflectedControlPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, p1);
							bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) { ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y); }
						}
						break;
					case 'Q':
					case 'q':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) { ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y); }
						}
						break;
					case 'T':
					case 't':
						while (!pp.isCommandOrEnd()) {
							var curr = pp.current;
							var cntrl = pp.getReflectedControlPoint();
							pp.control = cntrl;
							var cp = pp.getAsCurrentPoint();
							pp.addMarker(cp, cntrl, cntrl);
							bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
							if (ctx != null) { ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y); }
						}
						break;
					case 'A':
					case 'a':
						while (!pp.isCommandOrEnd()) {
						    var curr = pp.current;
							var rx = pp.getScalar();
							var ry = pp.getScalar();
							var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
							var largeArcFlag = pp.getScalar();
							var sweepFlag = pp.getScalar();
							var cp = pp.getAsCurrentPoint();

							// Conversion from endpoint to center parameterization
							// http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
							// x1', y1'
							var currp = new svg.Point(
								Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0,
								-Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0
							);
							// adjust radii
							var l = Math.pow(currp.x,2)/Math.pow(rx,2)+Math.pow(currp.y,2)/Math.pow(ry,2);
							if (l > 1) {
								rx *= Math.sqrt(l);
								ry *= Math.sqrt(l);
							}
							// cx', cy'
							var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt(
								((Math.pow(rx,2)*Math.pow(ry,2))-(Math.pow(rx,2)*Math.pow(currp.y,2))-(Math.pow(ry,2)*Math.pow(currp.x,2))) /
								(Math.pow(rx,2)*Math.pow(currp.y,2)+Math.pow(ry,2)*Math.pow(currp.x,2))
							);
							if (isNaN(s)) { s = 0; }
							var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
							// cx, cy
							var centp = new svg.Point(
								(curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y,
								(curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y
							);
							// vector magnitude
							var m = function(v) { return Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2)); };
							// ratio between two vectors
							var r = function(u, v) { return (u[0]*v[0]+u[1]*v[1]) / (m(u)*m(v)) };
							// angle between two vectors
							var a = function(u, v) { return (u[0]*v[1] < u[1]*v[0] ? -1 : 1) * Math.acos(r(u,v)); };
							// initial angle
							var a1 = a([1,0], [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry]);
							// angle delta
							var u = [(currp.x-cpp.x)/rx,(currp.y-cpp.y)/ry];
							var v = [(-currp.x-cpp.x)/rx,(-currp.y-cpp.y)/ry];
							var ad = a(u, v);
							if (r(u,v) <= -1) { ad = Math.PI; }
							if (r(u,v) >= 1) { ad = 0; }

							// for markers
							var dir = 1 - sweepFlag ? 1.0 : -1.0;
							var ah = a1 + dir * (ad / 2.0);
							var halfWay = new svg.Point(
								centp.x + rx * Math.cos(ah),
								centp.y + ry * Math.sin(ah)
							);
							pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
							pp.addMarkerAngle(cp, ah - dir * Math.PI);

							bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better
							if (ctx != null) {
								var r = rx > ry ? rx : ry;
								var sx = rx > ry ? 1 : rx / ry;
								var sy = rx > ry ? ry / rx : 1;

								ctx.translate(centp.x, centp.y);
								ctx.rotate(xAxisRotation);
								ctx.scale(sx, sy);
								ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
								ctx.scale(1/sx, 1/sy);
								ctx.rotate(-xAxisRotation);
								ctx.translate(-centp.x, -centp.y);
							}
						}
						break;
					case 'Z':
					case 'z':
						if (ctx != null) { ctx.closePath(); }
						pp.current = pp.start;
					}
				}

				return bb;
			};

			this.getMarkers = function() {
				var points = this.PathParser.getMarkerPoints();
				var angles = this.PathParser.getMarkerAngles();

				var markers = [];
				for (var i=0; i<points.length; i++) {
					markers.push([points[i], angles[i]]);
				}
				return markers;
			};
		};
		svg.Element.path.prototype = new svg.Element.PathElementBase;

		// pattern element
		svg.Element.pattern = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.createPattern = function(ctx, element) {
				var width = this.attribute('width').toPixels('x', true);
				var height = this.attribute('height').toPixels('y', true);

				// render me using a temporary svg element
				var tempSvg = new svg.Element.svg();
				tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
				tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
				tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
				tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
				tempSvg.children = this.children;

				var c = document.createElement('canvas');
				c.width = width;
				c.height = height;
				var cctx = c.getContext('2d');
				if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
					cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
				}
				// render 3x3 grid so when we transform there's no white space on edges
				for (var x=-1; x<=1; x++) {
					for (var y=-1; y<=1; y++) {
						cctx.save();
						tempSvg.attributes['x'] = new svg.Property('x', x * c.width);
						tempSvg.attributes['y'] = new svg.Property('y', y * c.height);
						tempSvg.render(cctx);
						cctx.restore();
					}
				}
				var pattern = ctx.createPattern(c, 'repeat');
				return pattern;
			};
		};
		svg.Element.pattern.prototype = new svg.Element.ElementBase;

		// marker element
		svg.Element.marker = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.baseRender = this.render;
			this.render = function(ctx, point, angle) {
				ctx.translate(point.x, point.y);
				if (this.attribute('orient').valueOrDefault('auto') == 'auto') { ctx.rotate(angle); }
				if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') { ctx.scale(ctx.lineWidth, ctx.lineWidth); }
				ctx.save();

				// render me using a temporary svg element
				var tempSvg = new svg.Element.svg();
				tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
				tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
				tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
				tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
				tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
				tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
				tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
				tempSvg.children = this.children;
				tempSvg.render(ctx);

				ctx.restore();
				if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') { ctx.scale(1/ctx.lineWidth, 1/ctx.lineWidth); }
				if (this.attribute('orient').valueOrDefault('auto') == 'auto') { ctx.rotate(-angle); }
				ctx.translate(-point.x, -point.y);
			};
		};
		svg.Element.marker.prototype = new svg.Element.ElementBase;

		// definitions element
		svg.Element.defs = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.render = function(ctx) {
				// NOOP
			};
		};
		svg.Element.defs.prototype = new svg.Element.ElementBase;

		// base for gradients
		svg.Element.GradientBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.stops = [];
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				if (child.type == 'stop') { this.stops.push(child); }
			}

			this.getGradient = function() {
				// OVERRIDE ME!
			};

			this.gradientUnits = function () {
				return this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
			};

			this.attributesToInherit = ['gradientUnits'];

			this.inheritStopContainer = function (stopsContainer) {
				for (var i=0; i<this.attributesToInherit.length; i++) {
					var attributeToInherit = this.attributesToInherit[i];
					if (!this.attribute(attributeToInherit).hasValue() && stopsContainer.attribute(attributeToInherit).hasValue()) {
						this.attribute(attributeToInherit, true).value = stopsContainer.attribute(attributeToInherit).value;
					}
				}
			};

			this.createGradient = function(ctx, element, parentOpacityProp) {
				var stopsContainer = this;
				if (this.getHrefAttribute().hasValue()) {
					stopsContainer = this.getHrefAttribute().getDefinition();
					this.inheritStopContainer(stopsContainer);
				}

				var addParentOpacity = function (color) {
					if (parentOpacityProp.hasValue()) {
						var p = new svg.Property('color', color);
						return p.addOpacity(parentOpacityProp).value;
					}
					return color;
				};

				var g = this.getGradient(ctx, element);
				if (g == null) { return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color); }
				for (var i=0; i<stopsContainer.stops.length; i++) {
					g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
				}

				if (this.attribute('gradientTransform').hasValue()) {
					// render as transformed pattern on temporary canvas
					var rootView = svg.ViewPort.viewPorts[0];

					var rect = new svg.Element.rect();
					rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS/3.0);
					rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS/3.0);
					rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
					rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);

					var group = new svg.Element.g();
					group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
					group.children = [ rect ];

					var tempSvg = new svg.Element.svg();
					tempSvg.attributes['x'] = new svg.Property('x', 0);
					tempSvg.attributes['y'] = new svg.Property('y', 0);
					tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
					tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
					tempSvg.children = [ group ];

					var c = document.createElement('canvas');
					c.width = rootView.width;
					c.height = rootView.height;
					var tempCtx = c.getContext('2d');
					tempCtx.fillStyle = g;
					tempSvg.render(tempCtx);
					return tempCtx.createPattern(c, 'no-repeat');
				}

				return g;
			};
		};
		svg.Element.GradientBase.prototype = new svg.Element.ElementBase;

		// linear gradient element
		svg.Element.linearGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);

			this.attributesToInherit.push('x1');
			this.attributesToInherit.push('y1');
			this.attributesToInherit.push('x2');
			this.attributesToInherit.push('y2');

			this.getGradient = function(ctx, element) {
				var bb = this.gradientUnits() == 'objectBoundingBox' ? element.getBoundingBox() : null;

				if (!this.attribute('x1').hasValue()
				 && !this.attribute('y1').hasValue()
				 && !this.attribute('x2').hasValue()
				 && !this.attribute('y2').hasValue()) {
					this.attribute('x1', true).value = 0;
					this.attribute('y1', true).value = 0;
					this.attribute('x2', true).value = 1;
					this.attribute('y2', true).value = 0;
				 }

				var x1 = (this.gradientUnits() == 'objectBoundingBox'
					? bb.x() + bb.width() * this.attribute('x1').numValue()
					: this.attribute('x1').toPixels('x'));
				var y1 = (this.gradientUnits() == 'objectBoundingBox'
					? bb.y() + bb.height() * this.attribute('y1').numValue()
					: this.attribute('y1').toPixels('y'));
				var x2 = (this.gradientUnits() == 'objectBoundingBox'
					? bb.x() + bb.width() * this.attribute('x2').numValue()
					: this.attribute('x2').toPixels('x'));
				var y2 = (this.gradientUnits() == 'objectBoundingBox'
					? bb.y() + bb.height() * this.attribute('y2').numValue()
					: this.attribute('y2').toPixels('y'));

				if (x1 == x2 && y1 == y2) { return null; }
				return ctx.createLinearGradient(x1, y1, x2, y2);
			};
		};
		svg.Element.linearGradient.prototype = new svg.Element.GradientBase;

		// radial gradient element
		svg.Element.radialGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);

			this.attributesToInherit.push('cx');
			this.attributesToInherit.push('cy');
			this.attributesToInherit.push('r');
			this.attributesToInherit.push('fx');
			this.attributesToInherit.push('fy');

			this.getGradient = function(ctx, element) {
				var bb = element.getBoundingBox();

				if (!this.attribute('cx').hasValue()) { this.attribute('cx', true).value = '50%'; }
				if (!this.attribute('cy').hasValue()) { this.attribute('cy', true).value = '50%'; }
				if (!this.attribute('r').hasValue()) { this.attribute('r', true).value = '50%'; }

				var cx = (this.gradientUnits() == 'objectBoundingBox'
					? bb.x() + bb.width() * this.attribute('cx').numValue()
					: this.attribute('cx').toPixels('x'));
				var cy = (this.gradientUnits() == 'objectBoundingBox'
					? bb.y() + bb.height() * this.attribute('cy').numValue()
					: this.attribute('cy').toPixels('y'));

				var fx = cx;
				var fy = cy;
				if (this.attribute('fx').hasValue()) {
					fx = (this.gradientUnits() == 'objectBoundingBox'
					? bb.x() + bb.width() * this.attribute('fx').numValue()
					: this.attribute('fx').toPixels('x'));
				}
				if (this.attribute('fy').hasValue()) {
					fy = (this.gradientUnits() == 'objectBoundingBox'
					? bb.y() + bb.height() * this.attribute('fy').numValue()
					: this.attribute('fy').toPixels('y'));
				}

				var r = (this.gradientUnits() == 'objectBoundingBox'
					? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue()
					: this.attribute('r').toPixels());

				return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
			};
		};
		svg.Element.radialGradient.prototype = new svg.Element.GradientBase;

		// gradient stop element
		svg.Element.stop = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.offset = this.attribute('offset').numValue();
			if (this.offset < 0) { this.offset = 0; }
			if (this.offset > 1) { this.offset = 1; }

			var stopColor = this.style('stop-color', true);
			if (stopColor.value == '') { stopColor.value = '#000'; }
			if (this.style('stop-opacity').hasValue()) { stopColor = stopColor.addOpacity(this.style('stop-opacity')); }
			this.color = stopColor.value;
		};
		svg.Element.stop.prototype = new svg.Element.ElementBase;

		// animation base element
		svg.Element.AnimateBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			svg.Animations.push(this);

			this.duration = 0.0;
			this.begin = this.attribute('begin').toMilliseconds();
			this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();

			this.getProperty = function() {
				var attributeType = this.attribute('attributeType').value;
				var attributeName = this.attribute('attributeName').value;

				if (attributeType == 'CSS') {
					return this.parent.style(attributeName, true);
				}
				return this.parent.attribute(attributeName, true);
			};

			this.initialValue = null;
			this.initialUnits = '';
			this.removed = false;

			this.calcValue = function() {
				// OVERRIDE ME!
				return '';
			};

			this.update = function(delta) {
				// set initial value
				if (this.initialValue == null) {
					this.initialValue = this.getProperty().value;
					this.initialUnits = this.getProperty().getUnits();
				}

				// if we're past the end time
				if (this.duration > this.maxDuration) {
					// loop for indefinitely repeating animations
					if (this.attribute('repeatCount').value == 'indefinite'
					 || this.attribute('repeatDur').value == 'indefinite') {
						this.duration = 0.0;
					}
					else if (this.attribute('fill').valueOrDefault('remove') == 'freeze' && !this.frozen) {
						this.frozen = true;
						this.parent.animationFrozen = true;
						this.parent.animationFrozenValue = this.getProperty().value;
					}
					else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
						this.removed = true;
						this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue;
						return true;
					}
					return false;
				}
				this.duration = this.duration + delta;

				// if we're past the begin time
				var updated = false;
				if (this.begin < this.duration) {
					var newValue = this.calcValue(); // tween

					if (this.attribute('type').hasValue()) {
						// for transform, etc.
						var type = this.attribute('type').value;
						newValue = type + '(' + newValue + ')';
					}

					this.getProperty().value = newValue;
					updated = true;
				}

				return updated;
			};

			this.from = this.attribute('from');
			this.to = this.attribute('to');
			this.values = this.attribute('values');
			if (this.values.hasValue()) { this.values.value = this.values.value.split(';'); }

			// fraction of duration we've covered
			this.progress = function() {
				var ret = { progress: (this.duration - this.begin) / (this.maxDuration - this.begin) };
				if (this.values.hasValue()) {
					var p = ret.progress * (this.values.value.length - 1);
					var lb = Math.floor(p), ub = Math.ceil(p);
					ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
					ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
					ret.progress = (p - lb) / (ub - lb);
				}
				else {
					ret.from = this.from;
					ret.to = this.to;
				}
				return ret;
			};
		};
		svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;

		// animate element
		svg.Element.animate = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var p = this.progress();

				// tween value linearly
				var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress;
				return newValue + this.initialUnits;
			};
		};
		svg.Element.animate.prototype = new svg.Element.AnimateBase;

		// animate color element
		svg.Element.animateColor = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var p = this.progress();
				var from = new rgbcolor(p.from.value);
				var to = new rgbcolor(p.to.value);

				if (from.ok && to.ok) {
					// tween color linearly
					var r = from.r + (to.r - from.r) * p.progress;
					var g = from.g + (to.g - from.g) * p.progress;
					var b = from.b + (to.b - from.b) * p.progress;
					return 'rgb('+parseInt(r,10)+','+parseInt(g,10)+','+parseInt(b,10)+')';
				}
				return this.attribute('from').value;
			};
		};
		svg.Element.animateColor.prototype = new svg.Element.AnimateBase;

		// animate transform element
		svg.Element.animateTransform = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var p = this.progress();

				// tween value linearly
				var from = svg.ToNumberArray(p.from.value);
				var to = svg.ToNumberArray(p.to.value);
				var newValue = '';
				for (var i=0; i<from.length; i++) {
					newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
				}
				return newValue;
			};
		};
		svg.Element.animateTransform.prototype = new svg.Element.animate;

		// font element
		svg.Element.font = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.horizAdvX = this.attribute('horiz-adv-x').numValue();

			this.isRTL = false;
			this.isArabic = false;
			this.fontFace = null;
			this.missingGlyph = null;
			this.glyphs = [];
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				if (child.type == 'font-face') {
					this.fontFace = child;
					if (child.style('font-family').hasValue()) {
						svg.Definitions[child.style('font-family').value] = this;
					}
				}
				else if (child.type == 'missing-glyph') { this.missingGlyph = child; }
				else if (child.type == 'glyph') {
					if (child.arabicForm != '') {
						this.isRTL = true;
						this.isArabic = true;
						if (typeof this.glyphs[child.unicode] == 'undefined') { this.glyphs[child.unicode] = []; }
						this.glyphs[child.unicode][child.arabicForm] = child;
					}
					else {
						this.glyphs[child.unicode] = child;
					}
				}
			}
		};
		svg.Element.font.prototype = new svg.Element.ElementBase;

		// font-face element
		svg.Element.fontface = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.ascent = this.attribute('ascent').value;
			this.descent = this.attribute('descent').value;
			this.unitsPerEm = this.attribute('units-per-em').numValue();
		};
		svg.Element.fontface.prototype = new svg.Element.ElementBase;

		// missing-glyph element
		svg.Element.missingglyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);

			this.horizAdvX = 0;
		};
		svg.Element.missingglyph.prototype = new svg.Element.path;

		// glyph element
		svg.Element.glyph = function(node) {
			this.base = svg.Element.path;
			this.base(node);

			this.horizAdvX = this.attribute('horiz-adv-x').numValue();
			this.unicode = this.attribute('unicode').value;
			this.arabicForm = this.attribute('arabic-form').value;
		};
		svg.Element.glyph.prototype = new svg.Element.path;

		// text element
		svg.Element.text = function(node) {
			this.captureTextNodes = true;
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);

				var textBaseline = this.style('dominant-baseline').toTextBaseline();
				if (textBaseline == null) { textBaseline = this.style('alignment-baseline').toTextBaseline(); }
				if (textBaseline != null) { ctx.textBaseline = textBaseline; }
			};

			this.getBoundingBox = function () {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
				return new svg.BoundingBox(x, y - fontSize, x + Math.floor(fontSize * 2.0 / 3.0) * this.children[0].getText().length, y);
			};

			this.renderChildren = function(ctx) {
				this.x = this.attribute('x').toPixels('x');
				this.y = this.attribute('y').toPixels('y');
				if (this.attribute('dx').hasValue()) { this.x += this.attribute('dx').toPixels('x'); }
				if (this.attribute('dy').hasValue()) { this.y += this.attribute('dy').toPixels('y'); }
				this.x += this.getAnchorDelta(ctx, this, 0);
				for (var i=0; i<this.children.length; i++) {
					this.renderChild(ctx, this, this, i);
				}
			};

			this.getAnchorDelta = function (ctx, parent, startI) {
				var textAnchor = this.style('text-anchor').valueOrDefault('start');
				if (textAnchor != 'start') {
					var width = 0;
					for (var i=startI; i<parent.children.length; i++) {
						var child = parent.children[i];
						if (i > startI && child.attribute('x').hasValue()) { break; } // new group
						width += child.measureTextRecursive(ctx);
					}
					return -1 * (textAnchor == 'end' ? width : width / 2.0);
				}
				return 0;
			};

			this.renderChild = function(ctx, textParent, parent, i) {
				var child = parent.children[i];
				if (child.attribute('x').hasValue()) {
					child.x = child.attribute('x').toPixels('x') + textParent.getAnchorDelta(ctx, parent, i);
					if (child.attribute('dx').hasValue()) { child.x += child.attribute('dx').toPixels('x'); }
				}
				else {
					if (child.attribute('dx').hasValue()) { textParent.x += child.attribute('dx').toPixels('x'); }
					child.x = textParent.x;
				}
				textParent.x = child.x + child.measureText(ctx);

				if (child.attribute('y').hasValue()) {
					child.y = child.attribute('y').toPixels('y');
					if (child.attribute('dy').hasValue()) { child.y += child.attribute('dy').toPixels('y'); }
				}
				else {
					if (child.attribute('dy').hasValue()) { textParent.y += child.attribute('dy').toPixels('y'); }
					child.y = textParent.y;
				}
				textParent.y = child.y;

				child.render(ctx);

				for (var i=0; i<child.children.length; i++) {
					textParent.renderChild(ctx, textParent, child, i);
				}
			};
		};
		svg.Element.text.prototype = new svg.Element.RenderedElementBase;

		// text base
		svg.Element.TextElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.getGlyph = function(font, text, i) {
				var c = text[i];
				var glyph = null;
				if (font.isArabic) {
					var arabicForm = 'isolated';
					if ((i==0 || text[i-1]==' ') && i<text.length-2 && text[i+1]!=' ') { arabicForm = 'terminal'; }
					if (i>0 && text[i-1]!=' ' && i<text.length-2 && text[i+1]!=' ') { arabicForm = 'medial'; }
					if (i>0 && text[i-1]!=' ' && (i == text.length-1 || text[i+1]==' ')) { arabicForm = 'initial'; }
					if (typeof font.glyphs[c] != 'undefined') {
						glyph = font.glyphs[c][arabicForm];
						if (glyph == null && font.glyphs[c].type == 'glyph') { glyph = font.glyphs[c]; }
					}
				}
				else {
					glyph = font.glyphs[c];
				}
				if (glyph == null) { glyph = font.missingGlyph; }
				return glyph;
			};

			this.renderChildren = function(ctx) {
				var customFont = this.parent.style('font-family').getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
					var text = this.getText();
					if (customFont.isRTL) { text = text.split("").reverse().join(""); }

					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						var scale = fontSize / customFont.fontFace.unitsPerEm;
						ctx.translate(this.x, this.y);
						ctx.scale(scale, -scale);
						var lw = ctx.lineWidth;
						ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
						if (fontStyle == 'italic') { ctx.transform(1, 0, .4, 1, 0, 0); }
						glyph.render(ctx);
						if (fontStyle == 'italic') { ctx.transform(1, 0, -.4, 1, 0, 0); }
						ctx.lineWidth = lw;
						ctx.scale(1/scale, -1/scale);
						ctx.translate(-this.x, -this.y);

						this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;
						if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
							this.x += dx[i];
						}
					}
					return;
				}

				if (ctx.fillStyle != '') { ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y); }
				if (ctx.strokeStyle != '') { ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y); }
			};

			this.getText = function() {
				// OVERRIDE ME
			};

			this.measureTextRecursive = function(ctx) {
				var width = this.measureText(ctx);
				for (var i=0; i<this.children.length; i++) {
					width += this.children[i].measureTextRecursive(ctx);
				}
				return width;
			};

			this.measureText = function(ctx) {
				var customFont = this.parent.style('font-family').getDefinition();
				if (customFont != null) {
					var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
					var measure = 0;
					var text = this.getText();
					if (customFont.isRTL) { text = text.split("").reverse().join(""); }
					var dx = svg.ToNumberArray(this.parent.attribute('dx').value);
					for (var i=0; i<text.length; i++) {
						var glyph = this.getGlyph(customFont, text, i);
						measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
						if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
							measure += dx[i];
						}
					}
					return measure;
				}

				var textToMeasure = svg.compressSpaces(this.getText());
				if (!ctx.measureText) { return textToMeasure.length * 10; }

				ctx.save();
				this.setContext(ctx);
				var width = ctx.measureText(textToMeasure).width;
				ctx.restore();
				return width;
			};
		};
		svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase;

		// tspan
		svg.Element.tspan = function(node) {
			this.captureTextNodes = true;
			this.base = svg.Element.TextElementBase;
			this.base(node);

			this.text = svg.compressSpaces(node.value || node.text || node.textContent || '');
			this.getText = function() {
				// if this node has children, then they own the text
				if (this.children.length > 0) { return ''; }
				return this.text;
			};
		};
		svg.Element.tspan.prototype = new svg.Element.TextElementBase;

		// tref
		svg.Element.tref = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);

			this.getText = function() {
				var element = this.getHrefAttribute().getDefinition();
				if (element != null) { return element.children[0].getText(); }
			};
		};
		svg.Element.tref.prototype = new svg.Element.TextElementBase;

		// a element
		svg.Element.a = function(node) {
			this.base = svg.Element.TextElementBase;
			this.base(node);

			this.hasText = node.childNodes.length > 0;
			for (var i=0; i<node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType != 3) { this.hasText = false; }
			}

			// this might contain text
			this.text = this.hasText ? node.childNodes[0].value : '';
			this.getText = function() {
				return this.text;
			};

			this.baseRenderChildren = this.renderChildren;
			this.renderChildren = function(ctx) {
				if (this.hasText) {
					// render as text element
					this.baseRenderChildren(ctx);
					var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
					svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));
				}
				else if (this.children.length > 0) {
					// render as temporary group
					var g = new svg.Element.g();
					g.children = this.children;
					g.parent = this;
					g.render(ctx);
				}
			};

			this.onclick = function() {
				window.open(this.getHrefAttribute().value);
			};

			this.onmousemove = function() {
				svg.ctx.canvas.style.cursor = 'pointer';
			};
		};
		svg.Element.a.prototype = new svg.Element.TextElementBase;

		// image element
		svg.Element.image = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			var href = this.getHrefAttribute().value;
			if (href == '') { return; }
			var isSvg = href.match(/\.svg$/);

			svg.Images.push(this);
			this.loaded = false;
			if (!isSvg) {
				this.img = document.createElement('img');
				if (svg.opts['useCORS'] == true) { this.img.crossOrigin = 'Anonymous'; }
				var self = this;
				this.img.onload = function() { self.loaded = true; };
				this.img.onerror = function() { svg.log('ERROR: image "' + href + '" not found'); self.loaded = true; };
				this.img.src = href;
			}
			else {
				this.img = svg.ajax(href);
				this.loaded = true;
			}

			this.renderChildren = function(ctx) {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');

				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				if (width == 0 || height == 0) { return; }

				ctx.save();
				if (isSvg) {
					ctx.drawSvg(this.img, x, y, width, height);
				}
				else {
					ctx.translate(x, y);
					svg.AspectRatio(ctx,
									this.attribute('preserveAspectRatio').value,
									width,
									this.img.width,
									height,
									this.img.height,
									0,
									0);
					ctx.drawImage(this.img, 0, 0);
				}
				ctx.restore();
			};

			this.getBoundingBox = function() {
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');
				return new svg.BoundingBox(x, y, x + width, y + height);
			};
		};
		svg.Element.image.prototype = new svg.Element.RenderedElementBase;

		// group element
		svg.Element.g = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.getBoundingBox = function() {
				var bb = new svg.BoundingBox();
				for (var i=0; i<this.children.length; i++) {
					bb.addBoundingBox(this.children[i].getBoundingBox());
				}
				return bb;
			};
		};
		svg.Element.g.prototype = new svg.Element.RenderedElementBase;

		// symbol element
		svg.Element.symbol = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.render = function(ctx) {
				// NO RENDER
			};
		};
		svg.Element.symbol.prototype = new svg.Element.RenderedElementBase;

		// style element
		svg.Element.style = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			// text, or spaces then CDATA
			var css = '';
			for (var i=0; i<node.childNodes.length; i++) {
			  css += node.childNodes[i].data;
			}
			css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments
			css = svg.compressSpaces(css); // replace whitespace
			var cssDefs = css.split('}');
			for (var i=0; i<cssDefs.length; i++) {
				if (svg.trim(cssDefs[i]) != '') {
					var cssDef = cssDefs[i].split('{');
					var cssClasses = cssDef[0].split(',');
					var cssProps = cssDef[1].split(';');
					for (var j=0; j<cssClasses.length; j++) {
						var cssClass = svg.trim(cssClasses[j]);
						if (cssClass != '') {
							var props = svg.Styles[cssClass] || {};
							for (var k=0; k<cssProps.length; k++) {
								var prop = cssProps[k].indexOf(':');
								var name = cssProps[k].substr(0, prop);
								var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);
								if (name != null && value != null) {
									props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
								}
							}
							svg.Styles[cssClass] = props;
							svg.StylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
							if (cssClass == '@font-face') {
								var fontFamily = props['font-family'].value.replace(/"/g,'');
								var srcs = props['src'].value.split(',');
								for (var s=0; s<srcs.length; s++) {
									if (srcs[s].indexOf('format("svg")') > 0) {
										var urlStart = srcs[s].indexOf('url');
										var urlEnd = srcs[s].indexOf(')', urlStart);
										var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
										var doc = svg.parseXml(svg.ajax(url));
										var fonts = doc.getElementsByTagName('font');
										for (var f=0; f<fonts.length; f++) {
											var font = svg.CreateElement(fonts[f]);
											svg.Definitions[fontFamily] = font;
										}
									}
								}
							}
						}
					}
				}
			}
		};
		svg.Element.style.prototype = new svg.Element.ElementBase;

		// use element
		svg.Element.use = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);

			this.baseSetContext = this.setContext;
			this.setContext = function(ctx) {
				this.baseSetContext(ctx);
				if (this.attribute('x').hasValue()) { ctx.translate(this.attribute('x').toPixels('x'), 0); }
				if (this.attribute('y').hasValue()) { ctx.translate(0, this.attribute('y').toPixels('y')); }
			};

			var element = this.getHrefAttribute().getDefinition();

			this.path = function(ctx) {
				if (element != null) { element.path(ctx); }
			};

			this.getBoundingBox = function() {
				if (element != null) { return element.getBoundingBox(); }
			};

			this.renderChildren = function(ctx) {
				if (element != null) {
					var tempSvg = element;
					if (element.type == 'symbol') {
						// render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
						tempSvg = new svg.Element.svg();
						tempSvg.type = 'svg';
						tempSvg.attributes['viewBox'] = new svg.Property('viewBox', element.attribute('viewBox').value);
						tempSvg.attributes['preserveAspectRatio'] = new svg.Property('preserveAspectRatio', element.attribute('preserveAspectRatio').value);
						tempSvg.attributes['overflow'] = new svg.Property('overflow', element.attribute('overflow').value);
						tempSvg.children = element.children;
					}
					if (tempSvg.type == 'svg') {
						// if symbol or svg, inherit width/height from me
						if (this.attribute('width').hasValue()) { tempSvg.attributes['width'] = new svg.Property('width', this.attribute('width').value); }
						if (this.attribute('height').hasValue()) { tempSvg.attributes['height'] = new svg.Property('height', this.attribute('height').value); }
					}
					var oldParent = tempSvg.parent;
					tempSvg.parent = null;
					tempSvg.render(ctx);
					tempSvg.parent = oldParent;
				}
			};
		};
		svg.Element.use.prototype = new svg.Element.RenderedElementBase;

		// mask element
		svg.Element.mask = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.apply = function(ctx, element) {
				// render as temp svg
				var x = this.attribute('x').toPixels('x');
				var y = this.attribute('y').toPixels('y');
				var width = this.attribute('width').toPixels('x');
				var height = this.attribute('height').toPixels('y');

				if (width == 0 && height == 0) {
					var bb = new svg.BoundingBox();
					for (var i=0; i<this.children.length; i++) {
						bb.addBoundingBox(this.children[i].getBoundingBox());
					}
					var x = Math.floor(bb.x1);
					var y = Math.floor(bb.y1);
					var width = Math.floor(bb.width());
					var	height = Math.floor(bb.height());
				}

				// temporarily remove mask to avoid recursion
				var mask = element.attribute('mask').value;
				element.attribute('mask').value = '';

					var cMask = document.createElement('canvas');
					cMask.width = x + width;
					cMask.height = y + height;
					var maskCtx = cMask.getContext('2d');
					this.renderChildren(maskCtx);

					var c = document.createElement('canvas');
					c.width = x + width;
					c.height = y + height;
					var tempCtx = c.getContext('2d');
					element.render(tempCtx);
					tempCtx.globalCompositeOperation = 'destination-in';
					tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
					tempCtx.fillRect(0, 0, x + width, y + height);

					ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
					ctx.fillRect(0, 0, x + width, y + height);

				// reassign mask
				element.attribute('mask').value = mask;
			};

			this.render = function(ctx) {
				// NO RENDER
			};
		};
		svg.Element.mask.prototype = new svg.Element.ElementBase;

		// clip element
		svg.Element.clipPath = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.apply = function(ctx) {
				var oldBeginPath = CanvasRenderingContext2D.prototype.beginPath;
				CanvasRenderingContext2D.prototype.beginPath = function () { };

				var oldClosePath = CanvasRenderingContext2D.prototype.closePath;
				CanvasRenderingContext2D.prototype.closePath = function () { };

				oldBeginPath.call(ctx);
				for (var i=0; i<this.children.length; i++) {
					var child = this.children[i];
					if (typeof child.path != 'undefined') {
						var transform = null;
						if (child.style('transform', false, true).hasValue()) {
							transform = new svg.Transform(child.style('transform', false, true).value);
							transform.apply(ctx);
						}
						child.path(ctx);
						CanvasRenderingContext2D.prototype.closePath = oldClosePath;
						if (transform) { transform.unapply(ctx); }
					}
				}
				oldClosePath.call(ctx);
				ctx.clip();

				CanvasRenderingContext2D.prototype.beginPath = oldBeginPath;
				CanvasRenderingContext2D.prototype.closePath = oldClosePath;
			};

			this.render = function(ctx) {
				// NO RENDER
			};
		};
		svg.Element.clipPath.prototype = new svg.Element.ElementBase;

		// filters
		svg.Element.filter = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.apply = function(ctx, element) {
				// render as temp svg
				var bb = element.getBoundingBox();
				var x = Math.floor(bb.x1);
				var y = Math.floor(bb.y1);
				var width = Math.floor(bb.width());
				var	height = Math.floor(bb.height());

				// temporarily remove filter to avoid recursion
				var filter = element.style('filter').value;
				element.style('filter').value = '';

				var px = 0, py = 0;
				for (var i=0; i<this.children.length; i++) {
					var efd = this.children[i].extraFilterDistance || 0;
					px = Math.max(px, efd);
					py = Math.max(py, efd);
				}

				var c = document.createElement('canvas');
				c.width = width + 2*px;
				c.height = height + 2*py;
				var tempCtx = c.getContext('2d');
				tempCtx.translate(-x + px, -y + py);
				element.render(tempCtx);

				// apply filters
				for (var i=0; i<this.children.length; i++) {
					if (typeof this.children[i].apply == 'function') {
						this.children[i].apply(tempCtx, 0, 0, width + 2*px, height + 2*py);
					}
				}

				// render on me
				ctx.drawImage(c, 0, 0, width + 2*px, height + 2*py, x - px, y - py, width + 2*px, height + 2*py);

				// reassign filter
				element.style('filter', true).value = filter;
			};

			this.render = function(ctx) {
				// NO RENDER
			};
		};
		svg.Element.filter.prototype = new svg.Element.ElementBase;

		svg.Element.feMorphology = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.apply = function(ctx, x, y, width, height) {
				// TODO: implement
			};
		};
		svg.Element.feMorphology.prototype = new svg.Element.ElementBase;

		svg.Element.feComposite = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.apply = function(ctx, x, y, width, height) {
				// TODO: implement
			};
		};
		svg.Element.feComposite.prototype = new svg.Element.ElementBase;

		svg.Element.feColorMatrix = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			var matrix = svg.ToNumberArray(this.attribute('values').value);
			switch (this.attribute('type').valueOrDefault('matrix')) { // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
				case 'saturate':
					var s = matrix[0];
					matrix = [0.213+0.787*s,0.715-0.715*s,0.072-0.072*s,0,0,
							  0.213-0.213*s,0.715+0.285*s,0.072-0.072*s,0,0,
							  0.213-0.213*s,0.715-0.715*s,0.072+0.928*s,0,0,
							  0,0,0,1,0,
							  0,0,0,0,1];
					break;
				case 'hueRotate':
					var a = matrix[0] * Math.PI / 180.0;
					var c = function (m1,m2,m3) { return m1 + Math.cos(a)*m2 + Math.sin(a)*m3; };
					matrix = [c(0.213,0.787,-0.213),c(0.715,-0.715,-0.715),c(0.072,-0.072,0.928),0,0,
							  c(0.213,-0.213,0.143),c(0.715,0.285,0.140),c(0.072,-0.072,-0.283),0,0,
							  c(0.213,-0.213,-0.787),c(0.715,-0.715,0.715),c(0.072,0.928,0.072),0,0,
							  0,0,0,1,0,
							  0,0,0,0,1];
					break;
				case 'luminanceToAlpha':
					matrix = [0,0,0,0,0,
							  0,0,0,0,0,
							  0,0,0,0,0,
							  0.2125,0.7154,0.0721,0,0,
							  0,0,0,0,1];
					break;
			}

			function imGet(img, x, y, width, height, rgba) {
				return img[y*width*4 + x*4 + rgba];
			}

			function imSet(img, x, y, width, height, rgba, val) {
				img[y*width*4 + x*4 + rgba] = val;
			}

			function m(i, v) {
				var mi = matrix[i];
				return mi * (mi < 0 ? v - 255 : v);
			}

			this.apply = function(ctx, x, y, width, height) {
				// assuming x==0 && y==0 for now
				var srcData = ctx.getImageData(0, 0, width, height);
				for (var y = 0; y < height; y++) {
					for (var x = 0; x < width; x++) {
						var r = imGet(srcData.data, x, y, width, height, 0);
						var g = imGet(srcData.data, x, y, width, height, 1);
						var b = imGet(srcData.data, x, y, width, height, 2);
						var a = imGet(srcData.data, x, y, width, height, 3);
						imSet(srcData.data, x, y, width, height, 0, m(0,r)+m(1,g)+m(2,b)+m(3,a)+m(4,1));
						imSet(srcData.data, x, y, width, height, 1, m(5,r)+m(6,g)+m(7,b)+m(8,a)+m(9,1));
						imSet(srcData.data, x, y, width, height, 2, m(10,r)+m(11,g)+m(12,b)+m(13,a)+m(14,1));
						imSet(srcData.data, x, y, width, height, 3, m(15,r)+m(16,g)+m(17,b)+m(18,a)+m(19,1));
					}
				}
				ctx.clearRect(0, 0, width, height);
				ctx.putImageData(srcData, 0, 0);
			};
		};
		svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase;

		svg.Element.feGaussianBlur = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);

			this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
			this.extraFilterDistance = this.blurRadius;

			this.apply = function(ctx, x, y, width, height) {
				if (typeof stackblur.canvasRGBA == 'undefined') {
					svg.log('ERROR: StackBlur.js must be included for blur to work');
					return;
				}

				// StackBlur requires canvas be on document
				ctx.canvas.id = svg.UniqueId();
				ctx.canvas.style.display = 'none';
				document.body.appendChild(ctx.canvas);
				stackblur.canvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
				document.body.removeChild(ctx.canvas);
			};
		};
		svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase;

		// title element, do nothing
		svg.Element.title = function(node) {
		};
		svg.Element.title.prototype = new svg.Element.ElementBase;

		// desc element, do nothing
		svg.Element.desc = function(node) {
		};
		svg.Element.desc.prototype = new svg.Element.ElementBase;

		svg.Element.MISSING = function(node) {
			svg.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
		};
		svg.Element.MISSING.prototype = new svg.Element.ElementBase;

		// element factory
		svg.CreateElement = function(node) {
			var className = node.nodeName.replace(/^[^:]+:/,''); // remove namespace
			className = className.replace(/\-/g,''); // remove dashes
			var e = null;
			if (typeof svg.Element[className] != 'undefined') {
				e = new svg.Element[className](node);
			}
			else {
				e = new svg.Element.MISSING(node);
			}

			e.type = node.nodeName;
			return e;
		};

		// load from url
		svg.load = function(ctx, url) {
			svg.loadXml(ctx, svg.ajax(url));
		};

		// load from xml
		svg.loadXml = function(ctx, xml) {
			svg.loadXmlDoc(ctx, svg.parseXml(xml));
		};

		svg.loadXmlDoc = function(ctx, dom) {
			svg.init(ctx);

			var mapXY = function(p) {
				var e = ctx.canvas;
				while (e) {
					p.x -= e.offsetLeft;
					p.y -= e.offsetTop;
					e = e.offsetParent;
				}
				if (window.scrollX) { p.x += window.scrollX; }
				if (window.scrollY) { p.y += window.scrollY; }
				return p;
			};

			// bind mouse
			if (svg.opts['ignoreMouse'] != true) {
				ctx.canvas.onclick = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onclick(p.x, p.y);
				};
				ctx.canvas.onmousemove = function(e) {
					var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
					svg.Mouse.onmousemove(p.x, p.y);
				};
			}

			var e = svg.CreateElement(dom.documentElement);
			e.root = true;
			e.addStylesFromStyleDefinition();

			// render loop
			var isFirstRender = true;
			var draw = function() {
				svg.ViewPort.Clear();
				if (ctx.canvas.parentNode) { svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight); }

				if (svg.opts['ignoreDimensions'] != true) {
					// set canvas size
					if (e.style('width').hasValue()) {
						ctx.canvas.width = e.style('width').toPixels('x');
						ctx.canvas.style.width = ctx.canvas.width + 'px';
					}
					if (e.style('height').hasValue()) {
						ctx.canvas.height = e.style('height').toPixels('y');
						ctx.canvas.style.height = ctx.canvas.height + 'px';
					}
				}
				var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
				var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;
				if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
					cWidth = e.style('width').toPixels('x');
					cHeight = e.style('height').toPixels('y');
				}
				svg.ViewPort.SetCurrent(cWidth, cHeight);

				if (svg.opts['offsetX'] != null) { e.attribute('x', true).value = svg.opts['offsetX']; }
				if (svg.opts['offsetY'] != null) { e.attribute('y', true).value = svg.opts['offsetY']; }
				if (svg.opts['scaleWidth'] != null || svg.opts['scaleHeight'] != null) {
					var xRatio = null, yRatio = null, viewBox = svg.ToNumberArray(e.attribute('viewBox').value);

					if (svg.opts['scaleWidth'] != null) {
						if (e.attribute('width').hasValue()) { xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth']; }
						else if (!isNaN(viewBox[2])) { xRatio = viewBox[2] / svg.opts['scaleWidth']; }
					}

					if (svg.opts['scaleHeight'] != null) {
						if (e.attribute('height').hasValue()) { yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight']; }
						else if (!isNaN(viewBox[3])) { yRatio = viewBox[3] / svg.opts['scaleHeight']; }
					}

					if (xRatio == null) { xRatio = yRatio; }
					if (yRatio == null) { yRatio = xRatio; }

					e.attribute('width', true).value = svg.opts['scaleWidth'];
					e.attribute('height', true).value = svg.opts['scaleHeight'];
					e.style('transform', true, true).value += ' scale('+(1.0/xRatio)+','+(1.0/yRatio)+')';
				}

				// clear and render
				if (svg.opts['ignoreClear'] != true) {
					ctx.clearRect(0, 0, cWidth, cHeight);
				}
				e.render(ctx);
				if (isFirstRender) {
					isFirstRender = false;
					if (typeof svg.opts['renderCallback'] == 'function') { svg.opts['renderCallback'](dom); }
				}
			};

			var waitingForImages = true;
			if (svg.ImagesLoaded()) {
				waitingForImages = false;
				draw();
			}
			svg.intervalID = setInterval(function() {
				var needUpdate = false;

				if (waitingForImages && svg.ImagesLoaded()) {
					waitingForImages = false;
					needUpdate = true;
				}

				// need update from mouse events?
				if (svg.opts['ignoreMouse'] != true) {
					needUpdate = needUpdate | svg.Mouse.hasEvents();
				}

				// need update from animations?
				if (svg.opts['ignoreAnimation'] != true) {
					for (var i=0; i<svg.Animations.length; i++) {
						needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
					}
				}

				// need update from redraw?
				if (typeof svg.opts['forceRedraw'] == 'function') {
					if (svg.opts['forceRedraw']() == true) { needUpdate = true; }
				}

				// render if needed
				if (needUpdate) {
					draw();
					svg.Mouse.runEvents(); // run and clear our events
				}
			}, 1000 / svg.FRAMERATE);
		};

		svg.stop = function() {
			if (svg.intervalID) {
				clearInterval(svg.intervalID);
			}
		};

		svg.Mouse = new (function() {
			this.events = [];
			this.hasEvents = function() { return this.events.length != 0; };

			this.onclick = function(x, y) {
				this.events.push({ type: 'onclick', x: x, y: y,
					run: function(e) { if (e.onclick) { e.onclick(); } }
				});
			};

			this.onmousemove = function(x, y) {
				this.events.push({ type: 'onmousemove', x: x, y: y,
					run: function(e) { if (e.onmousemove) { e.onmousemove(); } }
				});
			};

			this.eventElements = [];

			this.checkPath = function(element, ctx) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) { this.eventElements[i] = element; }
				}
			};

			this.checkBoundingBox = function(element, bb) {
				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					if (bb.isPointInBox(e.x, e.y)) { this.eventElements[i] = element; }
				}
			};

			this.runEvents = function() {
				svg.ctx.canvas.style.cursor = '';

				for (var i=0; i<this.events.length; i++) {
					var e = this.events[i];
					var element = this.eventElements[i];
					while (element) {
						e.run(element);
						element = element.parent;
					}
				}

				// done running, clear
				this.events = [];
				this.eventElements = [];
			};
		});

		return svg;
	}
	var canvgBrowser = canvg;

	var xhtml = "http://www.w3.org/1999/xhtml";

	var namespaces = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") { name = name.slice(i + 1); }
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	}

	function creatorInherit(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml && document.documentElement.namespaceURI === xhtml
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	}

	function none() {}

	function selector(selector) {
	  return selector == null ? none : function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select(select) {
	  if (typeof select !== "function") { select = selector(select); }

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) { subnode.__data__ = node.__data__; }
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function empty() {
	  return [];
	}

	function selectorAll(selector) {
	  return selector == null ? empty : function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function selection_selectAll(select) {
	  if (typeof select !== "function") { select = selectorAll(select); }

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, parents);
	}

	var matcher = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};

	if (typeof document !== "undefined") {
	  var element = document.documentElement;
	  if (!element.matches) {
	    var vendorMatches = element.webkitMatchesSelector
	        || element.msMatchesSelector
	        || element.mozMatchesSelector
	        || element.oMatchesSelector;
	    matcher = function(selector) {
	      return function() {
	        return vendorMatches.call(this, selector);
	      };
	    };
	  }
	}

	var matcher$1 = matcher;

	function selection_filter(match) {
	  if (typeof match !== "function") { match = matcher$1(match); }

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function sparse(update) {
	  return new Array(update.length);
	}

	function selection_enter() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	}

	function EnterNode(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode.prototype = {
	  constructor: EnterNode,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function constant(x) {
	  return function() {
	    return x;
	  };
	}

	var keyPrefix = "$"; // Protect against keys like “__proto__”.

	function bindIndex(parent, group, enter, update, exit, data) {
	  var i = 0,
	      node,
	      groupLength = group.length,
	      dataLength = data.length;

	  // Put any non-null nodes that fit into update.
	  // Put any null nodes into enter.
	  // Put any remaining data into enter.
	  for (; i < dataLength; ++i) {
	    if (node = group[i]) {
	      node.__data__ = data[i];
	      update[i] = node;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, the duplicates are added to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (keyValue in nodeByKeyValue) {
	        exit[i] = node;
	      } else {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If there a node associated with this key, join and add it to update.
	  // If there is not (or the key is a duplicate), add it to enter.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);
	    if (node = nodeByKeyValue[keyValue]) {
	      update[i] = node;
	      node.__data__ = data[i];
	      nodeByKeyValue[keyValue] = null;
	    } else {
	      enter[i] = new EnterNode(parent, data[i]);
	    }
	  }

	  // Add any remaining nodes that were not bound to data to exit.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
	      exit[i] = node;
	    }
	  }
	}

	function selection_data(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") { value = constant(value); }

	  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
	    var parent = parents[j],
	        group = groups[j],
	        groupLength = group.length,
	        data = value.call(parent, parent && parent.__data__, j, parents),
	        dataLength = data.length,
	        enterGroup = enter[j] = new Array(dataLength),
	        updateGroup = update[j] = new Array(dataLength),
	        exitGroup = exit[j] = new Array(groupLength);

	    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

	    // Now connect the enter nodes to their following update node, such that
	    // appendChild can insert the materialized enter node before this node,
	    // rather than at the end of the parent node.
	    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
	      if (previous = enterGroup[i0]) {
	        if (i0 >= i1) { i1 = i0 + 1; }
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength){ }
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	function selection_exit() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_merge(selection$$1) {

	  for (var groups0 = this._groups, groups1 = selection$$1._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
	    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group0[i] || group1[i]) {
	        merge[i] = node;
	      }
	    }
	  }

	  for (; j < m0; ++j) {
	    merges[j] = groups0[j];
	  }

	  return new Selection(merges, this._parents);
	}

	function selection_order() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) { next.parentNode.insertBefore(node, next); }
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort(compare) {
	  if (!compare) { compare = ascending; }

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        sortgroup[i] = node;
	      }
	    }
	    sortgroup.sort(compareNode);
	  }

	  return new Selection(sortgroups, this._parents).order();
	}

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	}

	function selection_node() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) { return node; }
	    }
	  }

	  return null;
	}

	function selection_size() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	}

	function selection_empty() {
	  return !this.node();
	}

	function selection_each(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) { callback.call(node, node.__data__, i, group); }
	    }
	  }

	  return this;
	}

	function attrRemove(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) { this.removeAttribute(name); }
	    else { this.setAttribute(name, v); }
	  };
	}

	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) { this.removeAttributeNS(fullname.space, fullname.local); }
	    else { this.setAttributeNS(fullname.space, fullname.local, v); }
	  };
	}

	function selection_attr(name, value) {
	  var fullname = namespace(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS : attrFunction)
	      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
	}

	function defaultView(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

	function styleRemove(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) { this.style.removeProperty(name); }
	    else { this.style.setProperty(name, v, priority); }
	  };
	}

	function selection_style(name, value, priority) {
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : styleValue(this.node(), name);
	}

	function styleValue(node, name) {
	  return node.style.getPropertyValue(name)
	      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
	}

	function propertyRemove(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) { delete this[name]; }
	    else { this[name] = v; }
	  };
	}

	function selection_property(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
	}

	function classArray(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList(node) {
	  return node.classList || new ClassList(node);
	}

	function ClassList(node) {
	  this._node = node;
	  this._names = classArray(node.getAttribute("class") || "");
	}

	ClassList.prototype = {
	  add: function(name) {
	    var i = this._names.indexOf(name);
	    if (i < 0) {
	      this._names.push(name);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  remove: function(name) {
	    var i = this._names.indexOf(name);
	    if (i >= 0) {
	      this._names.splice(i, 1);
	      this._node.setAttribute("class", this._names.join(" "));
	    }
	  },
	  contains: function(name) {
	    return this._names.indexOf(name) >= 0;
	  }
	};

	function classedAdd(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) { list.add(names[i]); }
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) { list.remove(names[i]); }
	}

	function classedTrue(names) {
	  return function() {
	    classedAdd(this, names);
	  };
	}

	function classedFalse(names) {
	  return function() {
	    classedRemove(this, names);
	  };
	}

	function classedFunction(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
	  };
	}

	function selection_classed(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) { if (!list.contains(names[i])) { return false; } }
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	}

	function textRemove() {
	  this.textContent = "";
	}

	function textConstant(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	}

	function htmlRemove() {
	  this.innerHTML = "";
	}

	function htmlConstant(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	}

	function raise() {
	  if (this.nextSibling) { this.parentNode.appendChild(this); }
	}

	function selection_raise() {
	  return this.each(raise);
	}

	function lower() {
	  if (this.previousSibling) { this.parentNode.insertBefore(this, this.parentNode.firstChild); }
	}

	function selection_lower() {
	  return this.each(lower);
	}

	function selection_append(name) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(function() {
	    return this.appendChild(create.apply(this, arguments));
	  });
	}

	function constantNull() {
	  return null;
	}

	function selection_insert(name, before) {
	  var create = typeof name === "function" ? name : creator(name),
	      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
	  return this.select(function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  });
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) { parent.removeChild(this); }
	}

	function selection_remove() {
	  return this.each(remove);
	}

	function selection_cloneShallow() {
	  return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
	}

	function selection_cloneDeep() {
	  return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
	}

	function selection_clone(deep) {
	  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
	}

	function selection_datum(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	var filterEvents = {};

	if (typeof document !== "undefined") {
	  var element$1 = document.documentElement;
	  if (!("onmouseenter" in element$1)) {
	    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}

	function filterContextListener(listener, index, group) {
	  listener = contextListener(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}

	function contextListener(listener, index, group) {
	  return function(event1) {
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	    }
	  };
	}

	function parseTypenames(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) { name = t.slice(i + 1), t = t.slice(0, i); }
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) { return; }
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) { on.length = i; }
	    else { delete this.__on; }
	  };
	}

	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) { for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    } }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) { this.__on = [o]; }
	    else { on.push(o); }
	  };
	}

	function selection_on(typename, value, capture) {
	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

	  if (arguments.length < 2) {
	    var on = this.node().__on;
	    if (on) { for (var j = 0, m = on.length, o; j < m; ++j) {
	      for (i = 0, o = on[j]; i < n; ++i) {
	        if ((t = typenames[i]).type === o.type && t.name === o.name) {
	          return o.value;
	        }
	      }
	    } }
	    return;
	  }

	  on = value ? onAdd : onRemove;
	  if (capture == null) { capture = false; }
	  for (i = 0; i < n; ++i) { this.each(on(typenames[i], value, capture)); }
	  return this;
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (typeof event === "function") {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) { event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail; }
	    else { event.initEvent(type, false, false); }
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params);
	  };
	}

	function dispatchFunction(type, params) {
	  return function() {
	    return dispatchEvent(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
	}

	var root = [null];

	function Selection(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection() {
	  return new Selection([[document.documentElement]], root);
	}

	Selection.prototype = selection.prototype = {
	  constructor: Selection,
	  select: selection_select,
	  selectAll: selection_selectAll,
	  filter: selection_filter,
	  data: selection_data,
	  enter: selection_enter,
	  exit: selection_exit,
	  merge: selection_merge,
	  order: selection_order,
	  sort: selection_sort,
	  call: selection_call,
	  nodes: selection_nodes,
	  node: selection_node,
	  size: selection_size,
	  empty: selection_empty,
	  each: selection_each,
	  attr: selection_attr,
	  style: selection_style,
	  property: selection_property,
	  classed: selection_classed,
	  text: selection_text,
	  html: selection_html,
	  raise: selection_raise,
	  lower: selection_lower,
	  append: selection_append,
	  insert: selection_insert,
	  remove: selection_remove,
	  clone: selection_clone,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};

	function select(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	}

	function selectAll(selector) {
	  return typeof selector === "string"
	      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
	      : new Selection([selector == null ? [] : selector], root);
	}

	/**
	    @function svgPresets
	    @desc Adds SVG default attributes to a d3 selection in order to render it properly.
	    @param {Selection} selection
	*/
	function svgPresets(selection) {

	  // sets "stroke-width" attribute to `0` if not defined
	  var strokeWidth = selection.attr("stroke-width");
	  selection.attr("stroke-width", !strokeWidth ? 0 : strokeWidth);

	  // sets "fill-opacity" attribute to `0` if fill is "transparent" or "none"
	  var transparent = ["none", "transparent"].includes(selection.attr("fill"));
	  var fillOpacity = selection.attr("fill-opacity");
	  selection.attr("fill-opacity", transparent ? 0 : fillOpacity);

	}

	/**
	    @function htmlPresets
	    @desc Adds HTML default styles to a d3 selection in order to render it properly.
	    @param {Selection} selection
	*/
	function htmlPresets(selection$$1) {

	  selection$$1.selectAll("*")
	    .each(function() {
	      var tag = this.tagName.toLowerCase();
	      if (!["option"].includes(tag)) {

	        var elem = select(this);

	        /* forces minor unnoticible letter-spacing on any element where it is not defined to fix IE */
	        var letterSpacing = elem.style("letter-spacing");
	        elem.style("letter-spacing", letterSpacing === "normal" ? "0.1px" : letterSpacing);

	      }
	    });

	}

	var defaultOptions = {
	  background: false,
	  callback: function () {},
	  exclude: [],
	  padding: 0,
	  scale: 1
	};

	var canvgOptions = {
	  ignoreMouse: true,
	  ignoreAnimation: true,
	  ignoreDimensions: true,
	  ignoreClear: true
	};

	/**
	    @function parseTransform
	    @desc Extracts scale, x, and y position from an elements "transform" attribute, respecting cross-browser render differences.
	    @param {HTMLElement} elem The element to be analyzed.
	    @private
	*/
	function parseTransform(elem) {
	  var assign;


	  var property = select(elem).attr("transform");
	  var scale = 1, x = 0, y = 0;
	  if (property) {
	    scale = property.match(/scale\(([^a-z]+)\)/i);
	    if (scale) { scale = parseFloat(scale[1]); }
	    else { scale = 1; }
	    var translate = property.match(/translate\(([^a-z]+)\)/i);
	    if (translate) {
	      (assign = translate[1]
	        .replace(", ", ",")
	        .replace(/([^a-z]),*\s([^a-z])/gi, "$1,$2")
	        .split(",")
	        .map(function (d) { return parseFloat(d) * scale; }), x = assign[0], y = assign[1]);
	    }
	  }
	  return [scale, x, y];

	}

	/**
	    @function dom2canvas
	    @desc Renders HTML/SVG elements to a shared canvas.
	    @param {HTMLElement|Object|Array} elem The element or array of elements to be rendered to a single canvas. Additionally, a complex object can be passed as an element which can contain specific other properties.
	    @param {Number} [elem.x] The x offset of the element within the rendered canvas.
	    @param {Number} [elem.y] The y offset of the element within the rendered canvas.
	    @param {Object} [options] Additional options to specify.
	    @param {String} [options.background] Background color of the rendered canvas.
	    @param {Function} [options.callback] Callback function to be passed the canvas element after rendering.
	    @param {Array} [options.excludes] An array of HTMLElement objects to be excluded from the render.
	    @param {Number} [options.height] Pixel height for the final output. If a height value has not been passed, it will be inferred from the sizing of the first DOM element passed.
	    @param {Number} [options.padding = 0] Outer padding for the final file.
	    @param {Number} [options.scale = 1] Scale for the final file.
	    @param {Number} [options.width] Pixel width for the final output. If a width value has not been passed, it will be inferred from the sizing of the first DOM element passed.
	*/
	function dom2canvas(elem, options) {

	  if (!elem) { return; }
	  if (!(elem instanceof Array)) { elem = [elem]; }

	  options = Object.assign({}, defaultOptions, options);
	  var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);
	  var ratio = window ? window.devicePixelRatio || 1 : 1;

	  var reference = elem[0];
	  if (reference.constructor === Object) { reference = reference.element; }

	  var height = options.height ||
	          parseFloat(select(reference).style("height")) +
	          parseFloat(select(reference).style("padding-top")) +
	          parseFloat(select(reference).style("padding-bottom")),
	        width = options.width ||
	          parseFloat(select(reference).style("width")) +
	          parseFloat(select(reference).style("padding-left")) +
	          parseFloat(select(reference).style("padding-right"));

	  var layerX, layerY, offsetX = 0, offsetY = 0;
	  if (reference.getBoundingClientRect) {
	    var bounds = reference.getBoundingClientRect();
	    offsetX = bounds.left;
	    offsetY = bounds.top;
	  }
	  else {
	    offsetX = reference.offsetLeft;
	    offsetY = reference.offsetTop;
	  }

	  var canvas = document.createElement("canvas");
	  canvas.width = (width + options.padding * 2) * options.scale * ratio;
	  canvas.height = (height + options.padding * 2) * options.scale * ratio;
	  canvas.style.width = (width + options.padding * 2) * options.scale;
	  canvas.style.height = (height + options.padding * 2) * options.scale;

	  var context = canvas.getContext("2d");
	  context.scale(options.scale * ratio, options.scale * ratio);
	  context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);

	  if (options.background) {
	    context.beginPath();
	    context.rect(0, 0, canvas.width / ratio, canvas.height / ratio);
	    context.fillStyle = options.background;
	    context.fill();
	  }

	  var layers = [];

	  function checkRender(trans) {

	    var tag = (this.tagName || "").toLowerCase();
	    if (options.exclude.includes(this) || tag === "foreignobject") { return; }

	    var transform = Object.assign({}, trans);

	    // strips translate and scale from transform property
	    if (this.tagName) {

	      var opacity = select(this).attr("opacity") || select(this).style("opacity");
	      var display = select(this).style("display");
	      var visibility = select(this).style("visibility");
	      if (display === "none" || visibility === "hidden" || opacity && parseFloat(opacity) === 0) { return; }

	      var tag$1 = this.tagName.toLowerCase();

	      if (tag$1.length && ["defs", "title", "desc"].includes(tag$1)) { return; }

	      if (tag$1 === "svg") {

	        // do not perform this transform for SVGs nested within other SVGs
	        if (!transform.svg) {
	          var ref = this.getBoundingClientRect();
	          var left = ref.left;
	          var top = ref.top;
	          transform.x += left - offsetX;
	          transform.y += top - offsetY;
	          transform.svg = true;
	        }

	        var x = select(this).attr("x");
	        x = x ? parseFloat(x) * transform.scale : 0;
	        transform.x += x;
	        var y = select(this).attr("y");
	        y = y ? parseFloat(y) * transform.scale : 0;
	        transform.y += y;
	        transform.clip = {
	          height: parseFloat(select(this).attr("height") || select(this).style("height")),
	          width: parseFloat(select(this).attr("width") || select(this).style("width")),
	          x: x, y: y
	        };
	      }
	      else {
	        var x$1 = select(this).attr("x");
	        if (x$1) { transform.x += parseFloat(x$1) * transform.scale; }
	        var y$1 = select(this).attr("y");
	        if (y$1) { transform.y += parseFloat(y$1) * transform.scale; }
	      }

	    }

	    if (!tag.length) {
	      var test = (this.wholeText || "").replace(/\s/g, "");
	      if (test.length) {

	        var text = this.nodeValue
	          .replace(/^\s*/, "")
	          .replace(/^\n/, "")
	          .replace(/^\s*/, "")
	          .replace(/\n$/, "")
	          .replace(/\s*$/, "")
	          .replace(/\n$/, "");

	        layers.push({type: "text", style: this.parentNode, value: text, x: transform.x, y: transform.y});

	      }
	    }
	    else if (tag === "text") {
	      var elem = this.cloneNode(true);
	      select(elem).call(svgPresets);
	      layers.push(Object.assign({}, transform, {type: "svg", value: elem}));
	    }
	    else if (["image", "img"].includes(tag)) {

	      var url = select(this).attr("href") || select(this).attr("xlink:href");

	      if (url.length) {

	        var h = parseFloat(select(this).attr("height")) * transform.scale,
	              w = parseFloat(select(this).attr("width")) * transform.scale;

	        var data = {
	          clip: transform.clip,
	          height: h,
	          loaded: false,
	          type: "img",
	          width: w,
	          x: transform.x,
	          y: transform.y
	        };
	        layers.push(data);

	        var img = new Image();
	        img.crossOrigin = "Anonymous";
	        img.onload = function() {

	          var canvas2 = document.createElement("canvas");
	          var ctx2 = canvas2.getContext("2d");
	          canvas2.height = h * ratio;
	          canvas2.width = w * ratio;
	          ctx2.drawImage(this, 0, 0, w * ratio, h * ratio);
	          var himg = document.createElement("img");
	          himg.src = canvas2.toDataURL("image/png");

	          data.value = himg;
	          data.loaded = true;

	        };
	        img.src = url;

	      }

	    }
	    else if (!["svg", "g", "text"].includes(tag) && !select(this).selectAll("svg").size()) {

	      var s = options.scale * ratio;

	      var data$1 = {
	        height: Math.floor(height + options.padding * 2 + offsetY),
	        loaded: false,
	        type: "html",
	        width: Math.floor(width + options.padding * 2 + offsetX),
	        x: Math.floor(layerX - offsetX),
	        y: Math.floor(layerY - offsetY)
	      };

	      var tempCanvas = document.createElement("canvas");
	      tempCanvas.width = data$1.width * s;
	      tempCanvas.height = data$1.height * s;
	      tempCanvas.style.width = (data$1.width * s) + "px";
	      tempCanvas.style.height = (data$1.height * s) + "px";

	      var tempContext = tempCanvas.getContext("2d");
	      tempContext.scale(s, s);

	      layers.push(data$1);

	      htmlPresets(select(this));

	      html2canvas(this, {
	        allowTaint: true,
	        canvas: tempCanvas,
	        letterRendering: true
	      }).then(function (c) {
	        data$1.value = c;
	        data$1.loaded = true;
	      });

	    }
	    else if (tag !== "svg" && this.childNodes.length > 0 && !select(this).selectAll("image, img, svg").size()) {

	      var elem$1 = this.cloneNode(true);
	      select(elem$1).selectAll("*").each(function() {
	        select(this).call(svgPresets);
	        if (select(this).attr("opacity") === "0") { this.parentNode.removeChild(this); }
	      });

	      layers.push(Object.assign({}, transform, {type: "svg", value: elem$1, tag: tag}));

	    }
	    else if (this.childNodes.length > 0) {
	      checkChildren(this, transform);
	    }
	    else { // catches all SVG shapes

	      var elem$2 = this.cloneNode(true);
	      select(elem$2).selectAll("*").each(function() {
	        if (select(this).attr("opacity") === "0") { this.parentNode.removeChild(this); }
	      });

	      if (tag === "line") {
	        select(elem$2).attr("x1", parseFloat(select(elem$2).attr("x1")) + transform.x);
	        select(elem$2).attr("x2", parseFloat(select(elem$2).attr("x2")) + transform.x);
	        select(elem$2).attr("y1", parseFloat(select(elem$2).attr("y1")) + transform.y);
	        select(elem$2).attr("y2", parseFloat(select(elem$2).attr("y2")) + transform.y);
	      }
	      else if (tag === "path") {
	        var ref$1 = parseTransform(elem$2);
	        var scale = ref$1[0];
	        var x$2 = ref$1[1];
	        var y$2 = ref$1[2];
	        if (select(elem$2).attr("transform")) { select(elem$2).attr("transform", ("scale(" + scale + ")translate(" + (x$2 + transform.x) + "," + (y$2 + transform.y) + ")")); }
	      }
	      select(elem$2).call(svgPresets);

	      var fill = select(elem$2).attr("fill");
	      var defFill = fill && fill.indexOf("url") === 0;
	      // if (defFill) select(elem).attr("fill-opacity", 0);

	      layers.push(Object.assign({}, transform, {type: "svg", value: elem$2, tag: tag}));
	      if (defFill) {
	        var def = select(fill.slice(4, -1)).node().cloneNode(true);
	        var defTag = (def.tagName || "").toLowerCase();
	        if (defTag === "pattern") {

	          var ref$2 = parseTransform(elem$2);
	          var scale$1 = ref$2[0];
	          var x$3 = ref$2[1];
	          var y$3 = ref$2[2];
	          transform.scale *= scale$1;
	          transform.x += x$3;
	          transform.y += y$3;
	          checkChildren(def, transform);

	        }
	      }

	    }

	  }

	  function checkChildren(e, trans) {
	    selectAll(e.childNodes).each(function() {
	      checkRender.bind(this)(trans);
	    });
	  }

	  for (var i = 0; i < elem.length; i++) {

	    var e = elem[i],
	        options$1 = {scale: 1, x: 0, y: 0, svg: false};

	    if (e.constructor === Object) {
	      options$1 = Object.assign(options$1, e);
	      e = e.element;
	    }
	    layerX = options$1.x;
	    layerY = options$1.y;
	    checkRender.bind(e)(options$1);

	  }

	  function checkStatus() {

	    var allDone = true;
	    for (var i = 0; i < layers.length; i++) {
	      if (layers[i].loaded === false) {
	        allDone = false;
	        break;
	      }
	    }

	    if (allDone) { finish(); }
	    else { setTimeout(checkStatus, 500); }

	  }

	  // Wait for all images to load
	  checkStatus();

	  function finish() {

	    for (var i = 0; i < layers.length; i++) {

	      var layer = layers[i];
	      var clip = layer.clip || {height: height, width: width, x: 0, y: 0};

	      switch (layer.type) {

	        case "img":
	          context.save();
	          context.beginPath();
	          context.translate(options.padding + clip.x, options.padding + clip.y);
	          context.rect(0, 0, clip.width, clip.height);
	          context.clip();
	          context.drawImage(layer.value, layer.x + clip.x, layer.y + clip.y, layer.width, layer.height);
	          context.restore();
	          break;

	        case "html":
	          context.save();
	          context.beginPath();
	          context.translate(options.padding, options.padding);
	          context.drawImage(layer.value, layer.x, layer.y, layer.width, layer.height);
	          context.restore();
	          break;

	        case "text":

	          var parent = select(layer.style);
	          var title = layer.value
	            .replace(/&/g, "&amp;")
	            .replace(/"/g, "&quot;")
	            .replace(/'/g, "&#039;");

	          var fC = parent.style("color"),
	                fS = parent.style("font-size");

	          var fF = parent.style("font-family").split(",")[0];

	          if (fF.indexOf("'") !== 0) { fF = "'" + fF + "'"; }
	          var text = "<text stroke='none' dy='" + fS + "' fill='" + fC + "' font-family=" + fF + " font-size='" + fS + "'>" + title + "</text>";

	          context.save();
	          context.translate(options.padding, options.padding);
	          canvgBrowser(canvas, text, Object.assign({}, canvgOptions, {offsetX: layer.x, offsetY: layer.y}));
	          context.restore();

	          break;

	        case "svg":
	          var outer = IE ? (new XMLSerializer()).serializeToString(layer.value) : layer.value.outerHTML;
	          context.save();
	          context.translate(options.padding + clip.x + layer.x, options.padding + clip.y + layer.y);
	          context.rect(0, 0, clip.width, clip.height);
	          context.clip();
	          canvgBrowser(canvas, outer, Object.assign({}, canvgOptions, {offsetX: layer.x + clip.x, offsetY: layer.y + clip.y}));
	          context.restore();
	          break;

	        default:
	          console.warn("uncaught", layer);
	          break;

	      }

	    }

	    options.callback(canvas);

	  }

	}

	/* canvas-toBlob.js
	 * A canvas.toBlob() implementation.
	 * 2016-05-26
	 * 
	 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
	 * License: MIT
	 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */

	/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

	(function(view) {
	var
		  Uint8Array = view.Uint8Array
		, HTMLCanvasElement = view.HTMLCanvasElement
		, canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
		, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
		, to_data_url = "toDataURL"
		, base64_ranks
		, decode_base64 = function(base64) {
			var
				  len = base64.length
				, buffer = new Uint8Array(len / 4 * 3 | 0)
				, i = 0
				, outptr = 0
				, last = [0, 0]
				, state = 0
				, save = 0
				, rank
				, code
				, undef
			;
			while (len--) {
				code = base64.charCodeAt(i++);
				rank = base64_ranks[code-43];
				if (rank !== 255 && rank !== undef) {
					last[1] = last[0];
					last[0] = code;
					save = (save << 6) | rank;
					state++;
					if (state === 4) {
						buffer[outptr++] = save >>> 16;
						if (last[1] !== 61 /* padding character */) {
							buffer[outptr++] = save >>> 8;
						}
						if (last[0] !== 61 /* padding character */) {
							buffer[outptr++] = save;
						}
						state = 0;
					}
				}
			}
			// 2/3 chance there's going to be some null bytes at the end, but that
			// doesn't really matter with most image formats.
			// If it somehow matters for you, truncate the buffer up outptr.
			return buffer;
		}
	;
	if (Uint8Array) {
		base64_ranks = new Uint8Array([
			  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
			, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
			, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
			, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
			, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
		]);
	}
	if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
		if (!canvas_proto.toBlob)
		{ canvas_proto.toBlob = function(callback, type /*, ...args*/) {
			  if (!type) {
				type = "image/png";
			} if (this.mozGetAsFile) {
				callback(this.mozGetAsFile("canvas", type));
				return;
			} if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
				callback(this.msToBlob());
				return;
			}

			var
				  args = Array.prototype.slice.call(arguments, 1)
				, dataURI = this[to_data_url].apply(this, args)
				, header_end = dataURI.indexOf(",")
				, data = dataURI.substring(header_end + 1)
				, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
				, blob
			;
			if (Blob.fake) {
				// no reason to decode a data: URI that's just going to become a data URI again
				blob = new Blob;
				if (is_base64) {
					blob.encoding = "base64";
				} else {
					blob.encoding = "URI";
				}
				blob.data = data;
				blob.size = data.length;
			} else if (Uint8Array) {
				if (is_base64) {
					blob = new Blob([decode_base64(data)], {type: type});
				} else {
					blob = new Blob([decodeURIComponent(data)], {type: type});
				}
			}
			callback(blob);
		}; }

		if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
			canvas_proto.toBlobHD = function() {
				to_data_url = "toDataURLHD";
				var blob = this.toBlob();
				to_data_url = "toDataURL";
				return blob;
			};
		} else {
			canvas_proto.toBlobHD = canvas_proto.toBlob;
		}
	}
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || commonjsGlobal.content || commonjsGlobal));

	var FileSaver = createCommonjsModule(function (module) {
	/* FileSaver.js
	 * A saveAs() FileSaver implementation.
	 * 1.3.2
	 * 2016-06-16 18:25:19
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: MIT
	 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

	/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

	var saveAs = saveAs || (function(view) {
		// IE <10 is explicitly unsupported
		if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
			return;
		}
		var
			  doc = view.document
			  // only get URL when necessary in case Blob.js hasn't overridden it yet
			, get_URL = function() {
				return view.URL || view.webkitURL || view;
			}
			, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
			, can_use_save_link = "download" in save_link
			, click = function(node) {
				var event = new MouseEvent("click");
				node.dispatchEvent(event);
			}
			, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
			, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
			, throw_outside = function(ex) {
				(view.setImmediate || view.setTimeout)(function() {
					throw ex;
				}, 0);
			}
			, force_saveable_type = "application/octet-stream"
			// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
			, arbitrary_revoke_timeout = 1000 * 40 // in ms
			, revoke = function(file) {
				var revoker = function() {
					if (typeof file === "string") { // file is an object URL
						get_URL().revokeObjectURL(file);
					} else { // file is a File
						file.remove();
					}
				};
				setTimeout(revoker, arbitrary_revoke_timeout);
			}
			, dispatch = function(filesaver, event_types, event) {
				event_types = [].concat(event_types);
				var i = event_types.length;
				while (i--) {
					var listener = filesaver["on" + event_types[i]];
					if (typeof listener === "function") {
						try {
							listener.call(filesaver, event || filesaver);
						} catch (ex) {
							throw_outside(ex);
						}
					}
				}
			}
			, auto_bom = function(blob) {
				// prepend BOM for UTF-8 XML and text/* types (including HTML)
				// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
				if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
					return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
				}
				return blob;
			}
			, FileSaver = function(blob, name, no_auto_bom) {
				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				// First try a.download, then web filesystem, then object URLs
				var
					  filesaver = this
					, type = blob.type
					, force = type === force_saveable_type
					, object_url
					, dispatch_all = function() {
						dispatch(filesaver, "writestart progress write writeend".split(" "));
					}
					// on any filesys errors revert to saving with object URLs
					, fs_error = function() {
						if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
							// Safari doesn't allow downloading of blob urls
							var reader = new FileReader();
							reader.onloadend = function() {
								var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
								var popup = view.open(url, '_blank');
								if(!popup) { view.location.href = url; }
								url=undefined; // release reference before dispatching
								filesaver.readyState = filesaver.DONE;
								dispatch_all();
							};
							reader.readAsDataURL(blob);
							filesaver.readyState = filesaver.INIT;
							return;
						}
						// don't create more object URLs than needed
						if (!object_url) {
							object_url = get_URL().createObjectURL(blob);
						}
						if (force) {
							view.location.href = object_url;
						} else {
							var opened = view.open(object_url, "_blank");
							if (!opened) {
								// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
								view.location.href = object_url;
							}
						}
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
						revoke(object_url);
					}
				;
				filesaver.readyState = filesaver.INIT;

				if (can_use_save_link) {
					object_url = get_URL().createObjectURL(blob);
					setTimeout(function() {
						save_link.href = object_url;
						save_link.download = name;
						click(save_link);
						dispatch_all();
						revoke(object_url);
						filesaver.readyState = filesaver.DONE;
					});
					return;
				}

				fs_error();
			}
			, FS_proto = FileSaver.prototype
			, saveAs = function(blob, name, no_auto_bom) {
				return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
			}
		;
		// IE 10+ (native saveAs)
		if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
			return function(blob, name, no_auto_bom) {
				name = name || blob.name || "download";

				if (!no_auto_bom) {
					blob = auto_bom(blob);
				}
				return navigator.msSaveOrOpenBlob(blob, name);
			};
		}

		FS_proto.abort = function(){};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error =
		FS_proto.onwritestart =
		FS_proto.onprogress =
		FS_proto.onwrite =
		FS_proto.onabort =
		FS_proto.onerror =
		FS_proto.onwriteend =
			null;

		return saveAs;
	}(
		   typeof self !== "undefined" && self
		|| typeof window !== "undefined" && window
		|| commonjsGlobal.content
	));
	// `self` is undefined in Firefox for Android content script context
	// while `this` is nsIContentFrameMessageManager
	// with an attribute `content` that corresponds to the window

	if (module.exports) {
	  module.exports.saveAs = saveAs;
	}
	});
	var FileSaver_1 = FileSaver.saveAs;

	var defaultOptions$1 = {
	  filename: "download",
	  type: "png"
	};

	/**
	    @function saveElement
	    @desc Downloads an HTML Element as a bitmap PNG image.
	    @param {HTMLElement|Array} elem A single element or array of elements to be saved to one file.
	    @param {Object} [options] Additional options to specify.
	    @param {String} [options.filename = "download"] Filename for the downloaded file, without the extension.
	    @param {String} [options.type = "png"] File type of the saved document. Accepted values are `"png"` and `"jpg"`.
	    @param {Object} [renderOptions] Custom options to be passed to the dom2canvas function.
	*/
	function saveElement(elem, options, renderOptions) {
	  if ( options === void 0 ) options = {};
	  if ( renderOptions === void 0 ) renderOptions = {};


	  if (!elem) { return; }
	  options = Object.assign({}, defaultOptions$1, options);

	  var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);

	  if (!(elem instanceof Array) && options.type === "svg") {
	    var outer = IE ? (new XMLSerializer()).serializeToString(elem) : elem.outerHTML;
	    FileSaver_1(new Blob([outer], {type: "application/svg+xml"}), ((options.filename) + ".svg"));
	  }

	  dom2canvas(elem, Object.assign({}, renderOptions, {callback: function (canvas) {

	    if (renderOptions.callback) { renderOptions.callback(canvas); }

	    if (["jpg", "png"].includes(options.type)) {
	      canvas.toBlob(function (blob) { return FileSaver_1(blob, ((options.filename) + "." + (options.type))); });
	    }
	    // else if (options.type === "pdf") {

	    //   const outputHeight = 11,
	    //         outputWidth = 8.5;

	    //   const aspect = canvas.width / canvas.height,
	    //         orientation = aspect > 1 ? "landscape" : "portrait";

	    //   const pdf = new JsPDF({
	    //     orientation,
	    //     unit: "in",
	    //     format: [outputWidth, outputHeight]
	    //   });

	    //   let h = orientation === "landscape" ? outputWidth : outputHeight,
	    //       left,
	    //       top,
	    //       w = orientation === "landscape" ? outputHeight : outputWidth;

	    //   const margin = 0.5;

	    //   if (aspect < w / h) {
	    //     h -= margin * 2;
	    //     const tempWidth = h * aspect;
	    //     top = margin;
	    //     left = (w - tempWidth) / 2;
	    //     w = tempWidth;
	    //   }
	    //   else {
	    //     w -= margin * 2;
	    //     const tempHeight = w / aspect;
	    //     left = margin;
	    //     top = (h - tempHeight) / 2;
	    //     h = tempHeight;
	    //   }

	    //   pdf.addImage(canvas, "canvas", left, top, w, h);
	    //   pdf.save(options.filename);

	    // }

	  }}));

	}

	exports.dom2canvas = dom2canvas;
	exports.saveElement = saveElement;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-export.full.js.map
