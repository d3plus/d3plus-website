/*
  d3plus-network v0.1.2
  Javascript network visualizations built upon d3 modules.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-network', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Collection,global.scales,global.d3plusCommon,global.shapes,global.d3plusViz));
}(this, (function (exports,d3Array,d3Collection,scales,d3plusCommon,shapes,d3plusViz) { 'use strict';

// import {forceSimulation} from "d3-force";
/**
    @class Network
    @extends Viz
    @desc Creates an x/y plot based on an array of data.
*/
var Network = (function (Viz$$1) {
  function Network() {

    Viz$$1.call(this);
    this._links = [];
    this._nodes = [];
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._shape = d3plusCommon.constant("Circle");
    this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
      Path: {
        fill: "none",
        label: false,
        stroke: "#eee",
        strokeWidth: 1
      },
      textAnchor: "middle",
      verticalAlign: "middle"
    });
    this._x = d3plusCommon.accessor("x");
    this._y = d3plusCommon.accessor("y");

  }

  if ( Viz$$1 ) Network.__proto__ = Viz$$1;
  Network.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Network.prototype.constructor = Network;

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  Network.prototype.render = function render (callback) {
    var this$1 = this;


    Viz$$1.prototype.render.call(this, callback);

    var height = this._height - this._margin.top - this._margin.bottom,
          parent = this._select,
          transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    var data = this._filteredData.reduce(function (obj, d, i) {
      obj[this$1._id(d, i)] = d;
      return obj;
    }, {});

    var nodes = this._nodes.reduce(function (obj, d, i) {
      obj[this$1._nodeGroupBy ? this$1._nodeGroupBy[this$1._drawDepth](d, i) : this$1._id(d, i)] = d;
      return obj;
    }, {});

    nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map(function (id, i) {

      var d = data[id],
            n = nodes[id];

      return {
        __d3plus__: true,
        data: d || n,
        i: i, id: id,
        fx: d !== void 0 && this$1._x(d) !== void 0 ? this$1._x(d) : this$1._x(n),
        fy: d !== void 0 && this$1._y(d) !== void 0 ? this$1._y(d) : this$1._y(n),
        node: n,
        r: this$1._size ? d !== void 0 && this$1._size(d) !== void 0 ? this$1._size(d) : this$1._size(n) : 1,
        shape: d !== void 0 && this$1._shape(d) !== void 0 ? this$1._shape(d) : this$1._shape(n)
      };

    });

    var xExtent = d3Array.extent(nodes.map(function (n) { return n.fx; })),
          yExtent = d3Array.extent(nodes.map(function (n) { return n.fy; }));

    var x = scales.scaleLinear().domain(xExtent).range([0, width]),
          y = scales.scaleLinear().domain(yExtent).range([0, height]);

    var nodeRatio = (xExtent[1] - xExtent[0]) / (yExtent[1] - yExtent[0]),
          screenRatio = width / height;

    if (nodeRatio > screenRatio) {
      var h = height * screenRatio / nodeRatio;
      y.range([(height - h) / 2, height - (height - h) / 2]);
    }
    else {
      var w = width * nodeRatio / screenRatio;
      x.range([(width - w) / 2, width - (width - w) / 2]);
    }

    nodes.forEach(function (n) {
      n.x = x(n.fx);
      n.y = y(n.fy);
    });

    var rExtent = d3Array.extent(nodes.map(function (n) { return n.r; }));
    var rMax = this._sizeMax || d3Array.min(
          d3Array.merge(nodes
            .map(function (n1) { return nodes
              .map(function (n2) { return n1 === n2 ? null : shapes.pointDistance(n1, n2); }); }
            )
          )
        ) / 2;

    var r = scales[("scale" + (this._sizeScale.charAt(0).toUpperCase()) + (this._sizeScale.slice(1)))]()
                .domain(rExtent).range([rExtent[0] === rExtent[1] ? rMax : d3Array.min([rMax / 2, this._sizeMin]), rMax]),
          xDomain = x.domain(),
          yDomain = y.domain();

    var xOldSize = xDomain[1] - xDomain[0],
          yOldSize = yDomain[1] - yDomain[0];

    nodes.forEach(function (n) {
      var size = r(n.r);
      if (xDomain[0] > x.invert(n.x - size)) { xDomain[0] = x.invert(n.x - size); }
      if (xDomain[1] < x.invert(n.x + size)) { xDomain[1] = x.invert(n.x + size); }
      if (yDomain[0] > y.invert(n.y - size)) { yDomain[0] = y.invert(n.y - size); }
      if (yDomain[1] < y.invert(n.y + size)) { yDomain[1] = y.invert(n.y + size); }
    });

    var xNewSize = xDomain[1] - xDomain[0],
          yNewSize = yDomain[1] - yDomain[0];

    rMax *= d3Array.min([xOldSize / xNewSize, yOldSize / yNewSize]);
    r.range([rExtent[0] === rExtent[1] ? rMax : d3Array.min([rMax / 2, this._sizeMin]), rMax]);
    x.domain(xDomain);
    y.domain(yDomain);

    nodes.forEach(function (n) {
      n.x = x(n.fx);
      n.fx = n.x;
      n.y = y(n.fy);
      n.fy = n.y;
      n.r = r(n.r);
      n.width = n.r * 2;
      n.height = n.r * 2;
    });

    var nodeLookup = nodes.reduce(function (obj, d) {
      obj[d.id] = d;
      return obj;
    }, {});

    // forceSimulation(nodes)
    //   .on("tick", () => this._shapes.forEach(s => s.render()));

    var nodeIndices = nodes.map(function (n) { return n.node; });
    var links = this._links.map(function (l) { return ({
      source: typeof l.source === "number"
            ? nodes[nodeIndices.indexOf(this$1._nodes[l.source])]
            : nodeLookup[l.source.id],
      target: typeof l.target === "number"
            ? nodes[nodeIndices.indexOf(this$1._nodes[l.target])]
            : nodeLookup[l.target.id]
    }); });

    this._shapes.push(new shapes.Path()
      .config(this._shapeConfig)
      .config(this._shapeConfig.Path)
      .d(function (d) { return ("M" + (d.source.x) + "," + (d.source.y) + " " + (d.target.x) + "," + (d.target.y)); })
      .data(links)
      // .duration(0)
      .select(d3plusCommon.elem("g.d3plus-network-links", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
      .render());

    var shapeConfig = {
      // duration: 0,
      label: function (d) { return this$1._drawLabel(d.data || d.node, d.i); },
      select: d3plusCommon.elem("g.d3plus-network-nodes", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node()
    };

    d3Collection.nest().key(function (d) { return d.shape; }).entries(nodes).forEach(function (d) {
      this$1._shapes.push(new shapes[d.key]()
        .config(this$1._shapeConfigPrep(d.key))
        .config(shapeConfig)
        .data(d.values)
        .render());
    });

    return this;

  };

  /**
      @memberof Network
      @desc If *links* is specified, sets the links array to the specified array and returns the current class instance. If *links* is not specified, returns the current links array.
      @param {Array} [*links* = []]
  */
  Network.prototype.links = function links (_) {
    return arguments.length ? (this._links = _, this) : this._links;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
      @param {String|Function|Array} [*value* = undefined]
  */
  Network.prototype.nodeGroupBy = function nodeGroupBy (_) {
    var this$1 = this;

    if (!arguments.length) { return this._nodeGroupBy; }
    if (!(_ instanceof Array)) { _ = [_]; }
    return this._nodeGroupBy = _.map(function (k) {
      if (typeof k === "function") { return k; }
      else {
        if (!this$1._aggs[k]) {
          this$1._aggs[k] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
        return d3plusCommon.accessor(k);
      }
    }), this;
  };

  /**
      @memberof Network
      @desc If *nodes* is specified, sets the nodes array to the specified array and returns the current class instance. If *nodes* is not specified, returns the current nodes array.
      @param {Array} [*nodes* = []]
  */
  Network.prototype.nodes = function nodes (_) {
    return arguments.length ? (this._nodes = _, this) : this._nodes;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
  */
  Network.prototype.x = function x (_) {
    if (arguments.length) {
      if (typeof _ === "function") { this._x = _; }
      else {
        this._x = d3plusCommon.accessor(_);
        if (!this._aggs[_]) { this._aggs[_] = function (a) { return d3Array.mean(a); }; }
      }
      return this;
    }
    else { return this._x; }
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
      @param {Function|String} [*value*]
  */
  Network.prototype.size = function size (_) {
    return arguments.length
         ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this)
         : this._size;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
      @param {Number} [*value*]
  */
  Network.prototype.sizeMax = function sizeMax (_) {
    return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
      @param {Number} [*value* = 5]
  */
  Network.prototype.sizeMin = function sizeMin (_) {
    return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
      @param {String} [*value* = "sqrt"]
  */
  Network.prototype.sizeScale = function sizeScale (_) {
    return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
  */
  Network.prototype.y = function y (_) {
    if (arguments.length) {
      if (typeof _ === "function") { this._y = _; }
      else {
        this._y = d3plusCommon.accessor(_);
        if (!this._aggs[_]) { this._aggs[_] = function (a) { return d3Array.mean(a); }; }
      }
      return this;
    }
    else { return this._y; }
  };

  return Network;
}(d3plusViz.Viz));

exports.Network = Network;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-network.js.map
