/*
  d3plus-network v0.1.10
  Javascript network visualizations built upon d3 modules.
  Copyright (c) 2017 D3plus - https://d3plus.org
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

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-zoom'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus-network', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3-zoom', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
	(factory((global.d3plus = {}),global.d3Array,global.d3Collection,global.scales,global.d3Zoom,global.d3plusCommon,global.shapes,global.d3plusViz));
}(this, (function (exports,d3Array,d3Collection,scales,d3Zoom,d3plusCommon,shapes,d3plusViz) { 'use strict';

/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

// import {forceSimulation} from "d3-force";
/**
    @class Network
    @extends external:Viz
    @desc Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.
*/
var Network = (function (Viz$$1) {
  function Network() {
    var this$1 = this;


    Viz$$1.call(this);
    this._links = [];
    this._nodes = [];
    this._on["click.shape"] = function (d, i) {

      this$1._tooltipClass.data([]).render();

      if (this$1._hover && this$1._drawDepth >= this$1._groupBy.length - 1) {

        if (this$1._focus && this$1._focus === d.id) {

          this$1.active(false);
          this$1._on.mouseenter.bind(this$1)(d, i);

          this$1._focus = undefined;
          this$1._zoomToBounds(null);

        }
        else {

          var id = this$1._nodeGroupBy && this$1._nodeGroupBy[this$1._drawDepth](d, i) ? this$1._nodeGroupBy[this$1._drawDepth](d, i) : this$1._id(d, i),
                links = this$1._linkLookup[id],
                node = this$1._nodeLookup[id];

          var filterIds = [node.id];
          var xDomain = [node.x - node.r, node.x + node.r],
              yDomain = [node.y - node.r, node.y + node.r];

          links.forEach(function (l) {
            filterIds.push(l.id);
            if (l.x - l.r < xDomain[0]) { xDomain[0] = l.x - l.r; }
            if (l.x + l.r > xDomain[1]) { xDomain[1] = l.x + l.r; }
            if (l.y - l.r < yDomain[0]) { yDomain[0] = l.y - l.r; }
            if (l.y + l.r > yDomain[1]) { yDomain[1] = l.y + l.r; }
          });

          this$1.active(function (h, x) {
            if (h.source && h.target) { return h.source.id === node.id || h.target.id === node.id; }
            else { return filterIds.includes(this$1._ids(h, x)[this$1._drawDepth]); }
          });

          this$1._focus = d.id;
          var t = d3Zoom.zoomTransform(this$1._container.node());
          xDomain = xDomain.map(function (d) { return d * t.k + t.x; });
          yDomain = yDomain.map(function (d) { return d * t.k + t.y; });
          this$1._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);

        }

      }

    };
    this._on["click.legend"] = function (d, i) {

      var ids = this$1._id(d);
      var id = this$1._ids(d);
      id = id[id.length - 1];

      if (this$1._hover && this$1._drawDepth >= this$1._groupBy.length - 1) {

        if (this$1._focus && this$1._focus === ids) {

          this$1.active(false);
          this$1._on.mouseenter.bind(this$1)(d, i);

          this$1._focus = undefined;
          this$1._zoomToBounds(null);

        }
        else {

          var nodes = ids.map(function (id) { return this$1._nodeLookup[id]; });

          var filterIds = [id];
          var xDomain = [nodes[0].x - nodes[0].r, nodes[0].x + nodes[0].r],
              yDomain = [nodes[0].y - nodes[0].r, nodes[0].y + nodes[0].r];

          nodes.forEach(function (l) {
            filterIds.push(l.id);
            if (l.x - l.r < xDomain[0]) { xDomain[0] = l.x - l.r; }
            if (l.x + l.r > xDomain[1]) { xDomain[1] = l.x + l.r; }
            if (l.y - l.r < yDomain[0]) { yDomain[0] = l.y - l.r; }
            if (l.y + l.r > yDomain[1]) { yDomain[1] = l.y + l.r; }
          });

          this$1.active(function (h, x) {
            if (h.source && h.target) { return filterIds.includes(h.source.id) && filterIds.includes(h.target.id); }
            else {
              var myIds = this$1._ids(h, x);
              return filterIds.includes(myIds[myIds.length - 1]);
            }
          });

          this$1._focus = ids;
          var t = d3Zoom.zoomTransform(this$1._container.node());
          xDomain = xDomain.map(function (d) { return d * t.k + t.x; });
          yDomain = yDomain.map(function (d) { return d * t.k + t.y; });
          this$1._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);

        }

        this$1._on["mousemove.legend"].bind(this$1)(d, i);

      }

    };
    this._sizeMin = 5;
    this._sizeScale = "sqrt";
    this._shape = d3plusCommon.constant("Circle");
    this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
      labelConfig: {
        textAnchor: "middle",
        verticalAlign: "middle"
      },
      Path: {
        fill: "none",
        label: false,
        stroke: "#eee",
        strokeWidth: 1
      }
    });
    this._x = d3plusCommon.accessor("x");
    this._y = d3plusCommon.accessor("y");

    this._zoom = true;

  }

  if ( Viz$$1 ) Network.__proto__ = Viz$$1;
  Network.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Network.prototype.constructor = Network;

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  Network.prototype._draw = function _draw (callback) {
    var this$1 = this;


    Viz$$1.prototype._draw.call(this, callback);

    var height = this._height - this._margin.top - this._margin.bottom,
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
        fx: d !== undefined && this$1._x(d) !== undefined ? this$1._x(d) : this$1._x(n),
        fy: d !== undefined && this$1._y(d) !== undefined ? this$1._y(d) : this$1._y(n),
        node: n,
        r: this$1._size ? d !== undefined && this$1._size(d) !== undefined ? this$1._size(d) : this$1._size(n) : this$1._sizeMin,
        shape: d !== undefined && this$1._shape(d) !== undefined ? this$1._shape(d) : this$1._shape(n)
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
          .map(function (n2) { return n1 === n2 ? null : shapes.pointDistance([n1.x, n1.y], [n2.x, n2.y]); }); }
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

    var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d) {
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

    this._linkLookup = links.reduce(function (obj, d) {
      if (!obj[d.source.id]) { obj[d.source.id] = []; }
      obj[d.source.id].push(d.target);
      if (!obj[d.target.id]) { obj[d.target.id] = []; }
      obj[d.target.id].push(d.source);
      return obj;
    }, {});

    this._container = this._select.selectAll("svg.d3plus-network").data([0]);

    this._container = this._container.enter().append("svg")
        .attr("class", "d3plus-network")
        .attr("opacity", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("x", this._margin.left)
        .attr("y", this._margin.top)
        .style("background-color", "transparent")
      .merge(this._container);

    this._container.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top);

    var hitArea = this._container.selectAll("rect.d3plus-network-hitArea").data([0]);
    hitArea.enter().append("rect")
        .attr("class", "d3plus-network-hitArea")
      .merge(hitArea)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent");

    this._zoomGroup = this._container.selectAll("g.d3plus-network-zoomGroup").data([0]);
    var parent = this._zoomGroup = this._zoomGroup.enter().append("g")
        .attr("class", "d3plus-network-zoomGroup")
      .merge(this._zoomGroup);

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
        .config(d3plusCommon.configPrep.bind(this$1)(this$1._shapeConfig, "shape", d.key))
        .config(shapeConfig)
        .data(d.values)
        .render());
    });

    return this;

  };

  /**
      @memberof Network
      @desc A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.
      @param {Array} [*links* = []]
      @chainable
  */
  Network.prototype.links = function links (_) {
    return arguments.length ? (this._links = _, this) : this._links;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
      @param {String|Function|Array} [*value* = undefined]
      @chainable
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
      @chainable
  */
  Network.prototype.nodes = function nodes (_) {
    return arguments.length ? (this._nodes = _, this) : this._nodes;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  Network.prototype.size = function size (_) {
    return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
      @param {Number} [*value*]
      @chainable
  */
  Network.prototype.sizeMax = function sizeMax (_) {
    return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
      @param {Number} [*value* = 5]
      @chainable
  */
  Network.prototype.sizeMin = function sizeMin (_) {
    return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
      @param {String} [*value* = "sqrt"]
      @chainable
  */
  Network.prototype.sizeScale = function sizeScale (_) {
    return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
      @chainable
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
      @desc If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
      @param {Function|String} [*value*]
      @chainable
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
