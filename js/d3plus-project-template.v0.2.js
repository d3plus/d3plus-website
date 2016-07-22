/*
  d3plus-project-template v0.2.3
  A starter environment for D3plus modules.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common')) :
  typeof define === 'function' && define.amd ? define('d3plus-project-template', ['exports', 'd3plus-common'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon));
}(this, function (exports,d3plusCommon) { 'use strict';

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

  exports.sample = sample;

  Object.defineProperty(exports, '__esModule', { value: true });

}));