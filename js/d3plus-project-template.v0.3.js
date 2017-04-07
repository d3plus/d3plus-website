/*
  d3plus-project-template v0.3.1
  A starter environment for D3plus modules.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common')) :
	typeof define === 'function' && define.amd ? define('d3plus-project-template', ['exports', 'd3plus-common'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3plusCommon));
}(this, (function (exports,d3plusCommon) { 'use strict';

/**
    @class Sample
    @desc A sample chainable function.
    @param {Array} [data = []]
*/
var Sample = function Sample() {

  this._constant = d3plusCommon.constant("sample");
  this._id = function (d) { return d.id; };

};

/**
    @memberof Sample
    @desc If *value* is specified, sets the constant to the specified function or value and returns this generator. If *value* is not specified, returns the current constant.
    @param {Function|Number|String} [*value* = "sample"]
*/
Sample.prototype.constant = function constant$1 (_) {
  return arguments.length
       ? (this._constant = typeof _ === "function" ? _ : d3plusCommon.constant(_), this)
       : this._constant;
};

/**
    @memberof Sample
    @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
    @param {Function} [*value*]
    @example
function(d) {
return d.id;
}
*/
Sample.prototype.id = function id (_) {
  return arguments.length ? (this._id = _, this) : this._id;
};

exports.Sample = Sample;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-project-template.js.map
