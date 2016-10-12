/*
  d3plus-treemap v0.5.12
  A reusable tree map built on D3
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-collection'), require('d3-hierarchy'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-treemap', ['exports', 'd3-collection', 'd3-hierarchy', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Collection,global.d3Hierarchy,global.d3plusCommon,global.d3plusShape,global.d3plusViz));
}(this, (function (exports,d3Collection,d3Hierarchy,d3plusCommon,d3plusShape,d3plusViz) { 'use strict';

/**
    @class Treemap
    @extends Viz
    @desc Uses the [d3 treemap layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
var Treemap = (function (Viz) {
  function Treemap() {

    Viz.call(this);

    this._padding = 1;
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      fontResize: true
    });
    this._sort = function (a, b) { return b.value - a.value; };
    this._sum = d3plusCommon.accessor("value");
    this._tile = d3Hierarchy.treemapSquarify;
    this._treemap = d3Hierarchy.treemap().round(true);

  }

  if ( Viz ) Treemap.__proto__ = Viz;
  Treemap.prototype = Object.create( Viz && Viz.prototype );
  Treemap.prototype.constructor = Treemap;

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  Treemap.prototype.render = function render (callback) {
    var this$1 = this;


    Viz.prototype.render.call(this, callback);

    var nestedData = d3Collection.nest();
    for (var i = 0; i <= this._drawDepth; i++) nestedData.key(this$1._groupBy[i]);
    nestedData = nestedData.entries(this._filteredData);

    var tmapData = this._treemap
      .padding(this._padding)
      .size([this._width - this._margin.left - this._margin.right, this._height - this._margin.top - this._margin.bottom])
      .tile(this._tile)
      (d3Hierarchy.hierarchy({values: nestedData}, function (d) { return d.values; }).sum(this._sum).sort(this._sort));

    var shapeData = [], that = this;

    /**
        Flattens and merges treemap data.
        @private
    */
    function extractLayout(children) {
      for (var i = 0; i < children.length; i++) {
        var node = children[i];
        if (node.depth <= that._drawDepth) extractLayout(node.children);
        else {
          node.id = node.data.key;
          node.data = d3plusCommon.merge(node.data.values);
          shapeData.push(node);
        }
      }
    }
    if (tmapData.children) extractLayout(tmapData.children);
    var total = tmapData.value;

    var c = this._shapeConfig, config = {};
    var loop = function ( k ) {
      if (k !== "labelBounds" && {}.hasOwnProperty.call(c, k)) {
        if (typeof c[k] === "function") config[k] = function (d, i) { return c[k](d.data, i); };
        else config[k] = c[k];
      }
    };

    for (var k in c) loop( k );

    var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")";
    this._shapes.push(new d3plusShape.Rect()
      .config({on: Object.keys(this._on)
        .filter(function (e) { return !e.includes(".") || e.includes(".shape"); })
        .reduce(function (obj, e) {
          obj[e] = function (d, i) { return this$1._on[e](d.data, i); };
          return obj;
        }, {})})
      .data(shapeData)
      .duration(this._duration)
      .height(function (d) { return d.y1 - d.y0; })
      .label(function (d, i) { return [this$1._drawLabel(d.data, i), ((Math.round(this$1._sum(d.data, i) / total * 100)) + "%")]; })
      .labelBounds(function (d, i, s) {
        var h = s.height;
        var sh = Math.min(50, h * 0.25);
        return [
          {width: s.width, height: h - sh, x: -s.width / 2, y: -h / 2},
          {width: s.width, height: sh, x: -s.width / 2, y: h / 2 - sh}
        ];
      })
      .select(d3plusCommon.elem("g.d3plus-Treemap", {parent: this._select, enter: {transform: transform}, update: {transform: transform}}).node())
      .textAnchor(["start", "middle"])
      .verticalAlign(["top", "bottom"])
      .width(function (d) { return d.x1 - d.x0; })
      .x(function (d) { return d.x0 + (d.x1 - d.x0) / 2; })
      .y(function (d) { return d.y0 + (d.y1 - d.y0) / 2; })
      .config(config)
      .render());

    return this;

  };

  /**
      @memberof Treemap
      @desc If *value* is specified, sets the inner and outer padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current padding accessor.
      @param {Function|Number} [*value*]
  */
  Treemap.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._padding;
  };

  /**
      @memberof Treemap
      @desc If *comparator* is specified, sets the sort order for the treemap using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
      @param {Array} [*comparator*]
      @example
function comparator(a, b) {
  return b.value - a.value;
}
  */
  Treemap.prototype.sort = function sort (_) {
    return arguments.length ? (this._sort = _, this) : this._sort;
  };

  /**
      @memberof Treemap
      @desc If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.
      @param {Function|Number} [*value*]
      @example
function sum(d) {
  return d.sum;
}
  */
  Treemap.prototype.sum = function sum (_) {
    return arguments.length ? (this._sum = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._sum;
  };

  /**
      @memberof Treemap
      @desc If *value* is specified, sets the [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling) to the specified function and returns the current class instance. If *value* is not specified, returns the current [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling).
      @param {Function} [*value*]
  */
  Treemap.prototype.tile = function tile (_) {
    return arguments.length ? (this._tile = _, this) : this._tile;
  };

  return Treemap;
}(d3plusViz.Viz));

exports.Treemap = Treemap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-treemap.js.map
