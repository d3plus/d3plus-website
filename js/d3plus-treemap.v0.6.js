/*
  d3plus-treemap v0.6.0
  DEPRECATED: Please use https://github.com/d3plus/d3plus-hierarchy
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-hierarchy')) :
	typeof define === 'function' && define.amd ? define('d3plus-treemap', ['exports', 'd3plus-hierarchy'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3plusHierarchy));
}(this, (function (exports,d3plusHierarchy) { 'use strict';

exports.Treemap = d3plusHierarchy.Treemap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-treemap.js.map
