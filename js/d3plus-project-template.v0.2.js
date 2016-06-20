(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common')) :
	typeof define === 'function' && define.amd ? define('d3plus-project-template', ['exports', 'd3plus-common'], factory) :
	(factory((global.d3plus_project_template = global.d3plus_project_template || {}),global.d3plus_common));
}(this, function (exports,d3plusCommon) { 'use strict';

	var version = "0.2.0";

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
	      sampleConstant = d3plusCommon.constant("sample");

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
	    return arguments.length ? (sampleConstant = typeof _ === "function" ? _ : d3plusCommon.constant(_), sample) : sampleConstant;
	  };

	  return data.length ? sample() : sample;

	}

	exports.version = version;
	exports.sample = sample;

	Object.defineProperty(exports, '__esModule', { value: true });

}));