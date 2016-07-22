/*
  d3plus-project-template v0.2.3
  A starter environment for D3plus modules.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3plus-project-template', ['exports'], factory) :
  (factory((global.d3plus = global.d3plus || {})));
}(this, function (exports) { 'use strict';

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector(compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;
          else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;
          else lo = mid + 1;
        }
        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function(d, x) {
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);

  /**
      @function constant
      @desc Wraps non-function variables in a simple return function.
      @param {Array|Number|Object|String} value The value to be returned from the function.
      @example <caption>this</caption>
  constant(42);
      @example <caption>returns this</caption>
  function() {
    return 42;
  }
  */
  function constant$1(value) {
    return function constant() {
      return value;
    };
  }

  /**
      A default accessor function.
      @private
  */
  function sampleId(d) {
    return d.id;
  }

  /**
      @function sample
      @desc A sample chainable function. If *data* is specified, immediately draws and returns this sample generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#sample.data) method.
      @param {Array} [data = []]
  */
  function sample(data) {
    if ( data === void 0 ) data = [];


    var id = sampleId,
        sampleConstant = constant$1("sample");

    /**
        The inner return object and draw function that gets assigned the public methods.
        @private
    */
    function sample(callback) {

      if (callback) setTimeout(callback, 100);

      return sample;

    }

    /**
        @memberof sample
        @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
        @param {Function} [*value*]
        @example
  function(d) {
    return d.id;
  }
    */
    sample.id = function(_) {
      return arguments.length ? (id = _, sample) : id;
    };

    /**
        @memberof sample
        @desc If *value* is specified, sets the accessor to the specified function or value and returns this generator. If *value* is not specified, returns the current accessor.
        @param {Function|Number|String} [*value* = "sample"]
    */
    sample.sampleConstant = function(_) {
      return arguments.length ? (sampleConstant = typeof _ === "function" ? _ : constant$1(_), sample) : sampleConstant;
    };

    return data.length ? sample() : sample;

  }

  exports.sample = sample;

  Object.defineProperty(exports, '__esModule', { value: true });

}));