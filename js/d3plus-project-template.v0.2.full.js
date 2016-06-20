(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('d3plus-project-template', ['exports'], factory) :
	(factory((global.d3plus_project_template = global.d3plus_project_template || {})));
}(this, function (exports) { 'use strict';

	var version = "0.2.0";

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
	    @example <caption>a sample row of data</caption>
	var data = {"id": "sample"};
	@example <caption>passed to the generator</caption>
	sample([data]);
	@example <caption>creates the following</caption>
	<html code goes here>
	@example <caption>this is shorthand for the following</caption>
	sample().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	sample().data([data])(function() { alert("draw complete!"); })
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

	exports.version = version;
	exports.sample = sample;

	Object.defineProperty(exports, '__esModule', { value: true });

}));