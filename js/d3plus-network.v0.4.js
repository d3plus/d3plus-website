/*
  d3plus-network v0.4.3
  Javascript network visualizations built upon d3 modules.
  Copyright (c) 2018 D3plus - https://d3plus.org
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-zoom'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3plus-color'), require('d3-sankey')) :
  typeof define === 'function' && define.amd ? define('d3plus-network', ['exports', 'd3-array', 'd3-collection', 'd3-scale', 'd3-zoom', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3plus-color', 'd3-sankey'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Collection,global.scales,global.d3Zoom,global.d3plusCommon,global.shapes,global.d3plusViz,global.d3plusColor,global.d3Sankey));
}(this, (function (exports,d3Array,d3Collection,scales,d3Zoom,d3plusCommon,shapes,d3plusViz,d3plusColor,d3Sankey) { 'use strict';

  /**
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */

  /**
      @class Network
      @extends external:Viz
      @desc Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.
  */
  var Network = (function (Viz) {
    function Network() {
      var this$1 = this;


      Viz.call(this);
      this._labelCutoff = 100;
      this._links = [];
      this._noDataMessage = false;
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

            this$1.hover(false);

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

            this$1.hover(false);

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
        ariaLabel: function (d, i) {
          var validSize = this$1._size ? (", " + (this$1._size(d, i))) : "";
          return ("" + (this$1._drawLabel(d, i)) + validSize + ".");
        },
        labelConfig: {
          duration: 0,
          fontMin: 1,
          fontResize: true,
          labelPadding: 0,
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

    if ( Viz ) Network.__proto__ = Viz;
    Network.prototype = Object.create( Viz && Viz.prototype );
    Network.prototype.constructor = Network;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Network.prototype._draw = function _draw (callback) {
      var this$1 = this;


      Viz.prototype._draw.call(this, callback);

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

        if (n === undefined) { return false; }

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

      }).filter(function (n) { return n; });

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
          .attr("fill", "transparent")
          .on("click", function () {
            if (this$1._focus) {
              this$1.active(false);
              this$1._focus = undefined;
              this$1._zoomToBounds(null);
            }
          });

      this._zoomGroup = this._container.selectAll("g.d3plus-network-zoomGroup").data([0]);
      var parent = this._zoomGroup = this._zoomGroup.enter().append("g")
          .attr("class", "d3plus-network-zoomGroup")
        .merge(this._zoomGroup);

      this._shapes.push(new shapes.Path()
        .config(this._shapeConfig)
        .config(this._shapeConfig.Path)
        .d(function (d) { return ("M" + (d.source.x) + "," + (d.source.y) + " " + (d.target.x) + "," + (d.target.y)); })
        .data(links)
        .select(d3plusCommon.elem("g.d3plus-network-links", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
        .render());

      var shapeConfig = {
        label: function (d) { return nodes.length <= this$1._labelCutoff || (this$1._hover && this$1._hover(d) || this$1._active && this$1._active(d)) ? this$1._drawLabel(d.data || d.node, d.i) : false; },
        select: d3plusCommon.elem("g.d3plus-network-nodes", {parent: parent, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node()
      };

      d3Collection.nest().key(function (d) { return d.shape; }).entries(nodes).forEach(function (d) {
        this$1._shapes.push(new shapes[d.key]()
          .config(d3plusCommon.configPrep.bind(this$1)(this$1._shapeConfig, "shape", d.key))
          .config(shapeConfig)
          .config(shapeConfig[d.key] || {})
          .data(d.values)
          .render());
      });

      return this;

    };

    /**
        @memberof Network
        @desc Defines the maximum number of nodes that allow all labels to be shown. When the number of nodes is over this amount, labels will only be shown on hover and click.
        @param {Number} *value* = 100
        @chainable
    */
    Network.prototype.labelCutoff = function labelCutoff (_) {
      return arguments.length ? (this._labelCutoff = _, this) : this._labelCutoff;
    };

    /**
        @memberof Network
        @desc A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
  1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
  2. The actual node *Object* itself.
  3. A *String* value matching the `id` of the node.

  The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
        @param {Array|String} *links* = []
        @param {Function} [*formatter*]
        @chainable
    */
    Network.prototype.links = function links (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "links"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._links;
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
        @desc The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

  Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
        @param {Array|String} *nodes* = []
        @param {Function} [*formatter*]
        @chainable
    */
    Network.prototype.nodes = function nodes (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "nodes"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._nodes;
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

  /**
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */

  /**
      @class Rings
      @extends external:Viz
      @desc Creates a ring visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/simple-rings/) for help getting started using the Rings class.
  */
  var Rings = (function (Viz) {
    function Rings() {
      var this$1 = this;


      Viz.call(this);
      this._labelCutoff = 100;
      this._links = [];
      this._noDataMessage = false;
      this._nodes = [];
      this._on.mouseenter = function () {};
      this._on["mouseleave.shape"] = function () {
        this$1.hover(false);
      };
      var defaultMouseMove = this._on["mousemove.shape"];
      this._on["mousemove.shape"] = function (d, i) {
        defaultMouseMove(d, i);
        if (this$1._focus && this$1._focus === d.id) {
          this$1.hover(false);
          this$1._on.mouseenter.bind(this$1)(d, i);

          this$1._focus = undefined;
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

          this$1.hover(function (h, x) {
            if (h.source && h.target) { return h.source.id === node.id || h.target.id === node.id; }
            else { return filterIds.includes(this$1._ids(h, x)[this$1._drawDepth]); }
          });
        }
      };
      this._on["click.shape"] = function (d) {
        this$1._center = d.id;
        this$1._draw();
      };
      this._sizeMin = 5;
      this._sizeScale = "sqrt";
      this._shape = d3plusCommon.constant("Circle");
      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        ariaLabel: function (d, i) {
          var validSize = this$1._size ? (", " + (this$1._size(d, i))) : "";
          return ("" + (this$1._drawLabel(d, i)) + validSize + ".");
        },
        labelConfig: {
          duration: 0,
          fontMin: 1,
          fontResize: true,
          labelPadding: 0,
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

    }

    if ( Viz ) Rings.__proto__ = Viz;
    Rings.prototype = Object.create( Viz && Viz.prototype );
    Rings.prototype.constructor = Rings;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Rings.prototype._draw = function _draw (callback) {
      var this$1 = this;


      Viz.prototype._draw.call(this, callback);

      var data = this._filteredData.reduce(function (obj, d, i) {
        obj[this$1._id(d, i)] = d;
        return obj;
      }, {});

      var nodes = this._nodes;

      if (!this._nodes.length && this._links.length) {
        var nodeIds = Array.from(new Set(this._links.reduce(function (ids, link) { return ids.concat([link.source, link.target]); }, [])));
        nodes = nodeIds.map(function (node) { return typeof node === "object" ? node : {id: node}; });
      }

      nodes = nodes.reduce(function (obj, d, i) {
        obj[this$1._nodeGroupBy ? this$1._nodeGroupBy[this$1._drawDepth](d, i) : this$1._id(d, i)] = d;
        return obj;
      }, {});

      nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map(function (id, i) {

        var d = data[id],
              n = nodes[id];

        if (n === undefined) { return false; }

        return {
          __d3plus__: true,
          data: d || n,
          i: i, id: id,
          node: n,
          shape: d !== undefined && this$1._shape(d) !== undefined ? this$1._shape(d) : this$1._shape(n)
        };

      }).filter(function (n) { return n; });

      var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d) {
        obj[d.id] = d;
        return obj;
      }, {});

      var links = this._links.map(function (link) {
        var check = ["source", "target"];
        return check.reduce(function (result, check) {
          result[check] = typeof link[check] === "number" ? nodes[link[check]] : nodeLookup[link[check].id || link[check]];
          return result;
        }, {});
      });

      var linkMap = links.reduce(function (map, link) {
        if (!map[link.source.id]) {
          map[link.source.id] = [];
        }
        map[link.source.id].push(link);
        if (!map[link.target.id]) {
          map[link.target.id] = [];
        }
        map[link.target.id].push(link);
        return map;
      }, {});

      var height = this._height - this._margin.top - this._margin.bottom,
            transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;

      var edges = [],
            radius = d3Array.min([height, width]) / 2,
            ringWidth = radius / 3;

      var primaryRing = ringWidth,
            secondaryRing = ringWidth * 2;

      var center = nodeLookup[this._center];

      center.x = width / 2;
      center.y = height / 2;
      center.r = this._sizeMin ? d3Array.max([this._sizeMin, primaryRing * .65]) : this._sizeMax ? d3Array.min([this._sizeMax, primaryRing * .65]) : primaryRing * .65;

      var claimed = [center],
            primaries = [];

      linkMap[this._center].forEach(function (edge) {
        var node = edge.source.id === this$1._center ? edge.target : edge.source;
        node.edges = linkMap[node.id].filter(function (link) { return link.source.id !== this$1._center || link.target.id !== this$1._center; });
        node.edge = edge;

        claimed.push(node);
        primaries.push(node);
      });

      primaries.sort(function (a, b) { return a.edges.length - b.edges.length; });

      var secondaries = [];
      var totalEndNodes = 0;

      primaries.forEach(function (p) {
        var primaryId = p.id;

        p.edges = p.edges.filter(function (edge) { return !claimed.includes(edge.source) && edge.target.id === primaryId ||
                                         !claimed.includes(edge.target) && edge.source.id === primaryId; });

        totalEndNodes += p.edges.length || 1;

        p.edges.forEach(function (edge) {
          var source = edge.source;
          var target = edge.target;
          var claim = target.id === primaryId ? source : target;
          claimed.push(claim);
        });
      });

      var tau = Math.PI * 2;
      var offset = 0;

      primaries.forEach(function (p, i) {
        var children = p.edges.length || 1;
        var space = tau / totalEndNodes * children;

        if (i === 0) {
          offset -= space / 2;
        }

        var angle = offset + space / 2 - tau / 4;

        p.radians = angle;
        p.x = width / 2 + primaryRing * Math.cos(angle);
        p.y = height / 2 + primaryRing * Math.sin(angle);

        offset += space;

        p.edges.forEach(function (edge, i) {
          var node = edge.source.id === p.id ? edge.target : edge.source;
          var s = tau / totalEndNodes;
          var a = angle - s * children / 2 + s / 2 + s * i;

          node.radians = a;
          node.x = width / 2 + secondaryRing * Math.cos(a);
          node.y = height / 2 + secondaryRing * Math.sin(a);

          secondaries.push(node);
        });
      });

      var primaryDistance = ringWidth / 2;
      var secondaryDistance = ringWidth / 4;

      var primaryMax = primaryDistance / 2 - 4;
      if (primaryDistance / 2 - 4 < 8) {
        primaryMax = d3Array.min([primaryDistance / 2, 8]);
      }

      var secondaryMax = secondaryDistance / 2 - 4;
      if (secondaryDistance / 2 - 4 < 4) {
        secondaryMax = d3Array.min([secondaryDistance / 2, 4]);
      }

      if (secondaryMax > ringWidth / 10) {
        secondaryMax = ringWidth / 10;
      }

      if (secondaryMax > primaryMax && secondaryMax > 10) {
        secondaryMax = primaryMax * .75;
      }
      if (primaryMax > secondaryMax * 1.5) {
        primaryMax = secondaryMax * 1.5;
      }

      primaryMax = Math.floor(primaryMax);
      secondaryMax = Math.floor(secondaryMax);

      var radiusFn;

      if (this._size) {
        var domain = d3Array.extent(data, function (d) { return d.size; });

        if (domain[0] === domain[1]) {
          domain[0] = 0;
        }

        radiusFn = scales.scaleLinear()
          .domain(domain)
          .rangeRound([3, d3Array.min([primaryMax, secondaryMax])]);

        var val = center.size;
        center.r = radiusFn(val);
      }
      else {
        radiusFn = scales.scaleLinear()
          .domain([1, 2])
          .rangeRound([primaryMax, secondaryMax]);
      }

      secondaries.forEach(function (s) {
        s.ring = 2;
        var val = this$1._size ? s.size : 2;
        s.r = this$1._sizeMin ? d3Array.max([this$1._sizeMin, radiusFn(val)]) : this$1._sizeMax ? d3Array.min([this$1._sizeMax, radiusFn(val)]) : radiusFn(val);
      });

      primaries.forEach(function (p) {
        p.ring = 1;
        var val = this$1._size ? p.size : 1;
        p.r = this$1._sizeMin ? d3Array.max([this$1._sizeMin, radiusFn(val)]) : this$1._sizeMax ? d3Array.min([this$1._sizeMax, radiusFn(val)]) : radiusFn(val);
      });

      nodes = [center].concat(primaries).concat(secondaries);

      primaries.forEach(function (p) {
        var check = ["source", "target"];
        var edge = p.edge;

        check.forEach(function (node) {
          edge[node] = nodes.find(function (n) { return n.id === edge[node].id; });
        });

        edges.push(edge);

        linkMap[p.id].forEach(function (edge) {
          var node = edge.source.id === p.id ? edge.target : edge.source;

          if (node.id !== center.id) {
            var target = secondaries.find(function (s) { return s.id === node.id; });

            if (!target) {
              target = primaries.find(function (s) { return s.id === node.id; });
            }

            if (target) {
              edge.spline = true;

              var centerX = width / 2;
              var centerY = height / 2;
              var middleRing = primaryRing + (secondaryRing - primaryRing) * 0.5;

              var check = ["source", "target"];

              check.forEach(function (node, i) {
                edge[(node + "X")] = edge[node].x + Math.cos(edge[node].ring === 2 ? edge[node].radians + Math.PI : edge[node].radians) * edge[node].r;
                edge[(node + "Y")] = edge[node].y + Math.sin(edge[node].ring === 2 ? edge[node].radians + Math.PI : edge[node].radians) * edge[node].r;
                edge[(node + "BisectX")] = centerX + middleRing * Math.cos(edge[node].radians);
                edge[(node + "BisectY")] = centerY + middleRing * Math.sin(edge[node].radians);

                edge[node] = nodes.find(function (n) { return n.id === edge[node].id; });

                if (edge[node].edges === undefined) { edge[node].edges = {}; }

                var oppId = i === 0 ? edge.target.id : edge.source.id;

                if (edge[node].id === p.id) {
                  edge[node].edges[oppId] = {
                    angle: p.radians + Math.PI,
                    radius: ringWidth / 2
                  };
                }
                else {
                  edge[node].edges[oppId] = {
                    angle: target.radians,
                    radius: ringWidth / 2
                  };
                }
              });

              edges.push(edge);
            }
          }
        });
      });

      nodes.forEach(function (node) {

        if (node.id !== this$1._center) {
          var fontSize = this$1._shapeConfig.labelConfig.fontSize && this$1._shapeConfig.labelConfig.fontSize(node) || 11;
          var lineHeight = fontSize * 1.4;
          var height = lineHeight * 2;
          var padding = 5;
          var width = ringWidth - node.r;

          var angle = node.radians * (180 / Math.PI);
          var x = node.r + padding;
          var textAnchor = "start";

          if (angle < -90 || angle > 90) {
            x = -node.r - width - padding;
            textAnchor = "end";
            angle += 180;
          }

          node.labelBounds = {
            x: x,
            y: -lineHeight / 2,
            width: width,
            height: height
          };

          node.rotate = angle;
          node.textAnchor = textAnchor;
        }
        else {
          node.labelBounds = {
            x: -primaryRing / 2,
            y: -primaryRing / 2,
            width: primaryRing,
            height: primaryRing
          };
        }
      });

      this._linkLookup = links.reduce(function (obj, d) {
        if (!obj[d.source.id]) { obj[d.source.id] = []; }
        obj[d.source.id].push(d.target);
        if (!obj[d.target.id]) { obj[d.target.id] = []; }
        obj[d.target.id].push(d.source);
        return obj;
      }, {});

      this._shapes.push(new shapes.Path()
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "edge", "Path"))
        .id(function (d) { return ((d.source.id) + "_" + (d.target.id)); })
        .d(function (d) { return d.spline ? ("M" + (d.sourceX) + "," + (d.sourceY) + "C" + (d.sourceBisectX) + "," + (d.sourceBisectY) + " " + (d.targetBisectX) + "," + (d.targetBisectY) + " " + (d.targetX) + "," + (d.targetY)) : ("M" + (d.source.x) + "," + (d.source.y) + " " + (d.target.x) + "," + (d.target.y)); })
        .data(edges)
        .select(d3plusCommon.elem("g.d3plus-rings-links", {parent: this._select, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node())
        .render());

      var that = this;

      var shapeConfig = {
        label: function (d) { return nodes.length <= this$1._labelCutoff || (this$1._hover && this$1._hover(d) || this$1._active && this$1._active(d)) ? this$1._drawLabel(d.data || d.node, d.i) : false; },
        labelBounds: function (d) { return d.labelBounds; },
        labelConfig: {
          fontColor: function (d) { return d.data.data.id === this$1._center ? d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.fontColor(d) : d3plusColor.colorLegible(d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).fill(d)); },
          fontResize: function (d) { return d.data.data.id === this$1._center; },
          padding: 0,
          textAnchor: function (d) { return nodeLookup[d.data.data.id].textAnchor || d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.textAnchor; },
          verticalAlign: function (d) { return d.data.data.id === this$1._center ? "middle" : "top"; }
        },
        rotate: function (d) { return nodeLookup[d.id].rotate || 0; },
        select: d3plusCommon.elem("g.d3plus-rings-nodes", {parent: this._select, transition: transition, enter: {transform: transform}, update: {transform: transform}}).node()
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
     @memberof Rings
     @desc Sets the center node to be the node with the given id.
     @param {String}
     @chainable
     */
    Rings.prototype.center = function center (_) {
      return arguments.length ? (this._center = _, this) : this._center;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
     */
    Rings.prototype.hover = function hover (_) {
      this._hover = _;

      this._shapes.forEach(function (s) { return s.hover(_); });
      if (this._legend) { this._legendClass.hover(_); }

      return this;
    };

    /**
        @memberof Rings
        @desc A predefined *Array* of edges that connect each object passed to the [node](#Rings.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
  1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
  2. The actual node *Object* itself.
  3. A *String* value matching the `id` of the node.

  The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
        @param {Array|String} *links* = []
        @param {Function} [*formatter*]
        @chainable
    */
    Rings.prototype.links = function links (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "links"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._links;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
        @param {String|Function|Array} [*value* = undefined]
        @chainable
    */
    Rings.prototype.nodeGroupBy = function nodeGroupBy (_) {
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
        @memberof Rings
        @desc The list of nodes to be used for drawing the rings network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

  Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
        @param {Array|String} *nodes* = []
        @param {Function} [*formatter*]
        @chainable
    */
    Rings.prototype.nodes = function nodes (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "nodes"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._nodes;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
        @param {Function|String} [*value*]
        @chainable
    */
    Rings.prototype.size = function size (_) {
      return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
        @param {Number} [*value*]
        @chainable
    */
    Rings.prototype.sizeMax = function sizeMax (_) {
      return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
        @param {Number} [*value* = 5]
        @chainable
    */
    Rings.prototype.sizeMin = function sizeMin (_) {
      return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
    };

    /**
        @memberof Rings
        @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
        @param {String} [*value* = "sqrt"]
        @chainable
    */
    Rings.prototype.sizeScale = function sizeScale (_) {
      return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
    };

    return Rings;
  }(d3plusViz.Viz));

  /**
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */

  var sankeyAligns = {
    center: d3Sankey.sankeyCenter,
    justify: d3Sankey.sankeyJustify,
    left: d3Sankey.sankeyLeft,
    right: d3Sankey.sankeyRight
  };

  /**
      @class Sankey
      @extends external:Viz
      @desc Creates a sankey visualization based on a defined set of nodes and links. [Click here](http://d3plus.org/examples/d3plus-network/sankey-diagram/) for help getting started using the Sankey class.
  */
  var Sankey = (function (Viz) {
    function Sankey() {
      var this$1 = this;

      Viz.call(this);
      this._nodeId = d3plusCommon.accessor("id");
      this._links = d3plusCommon.accessor("links");
      this._noDataMessage = false;
      this._nodes = d3plusCommon.accessor("nodes");
      this._nodeAlign = sankeyAligns.justify;
      this._nodeWidth = 30;
      this._on.mouseenter = function () {};
      this._on["mouseleave.shape"] = function () {
        this$1.hover(false);
      };
      var defaultMouseMove = this._on["mousemove.shape"];
      this._on["mousemove.shape"] = function (d, i) {
        defaultMouseMove(d, i);
        if (this$1._focus && this$1._focus === d.id) {
          this$1.hover(false);
          this$1._on.mouseenter.bind(this$1)(d, i);

          this$1._focus = undefined;
        }
        else {
          var id = this$1._nodeId(d, i),
                node = this$1._nodeLookup[id],
                nodeLookup = Object.keys(this$1._nodeLookup).reduce(function (all, item) {
                  all[this$1._nodeLookup[item]] = !isNaN(item) ? parseInt(item, 10) : item;
                  return all;
                }, {});

          var links = this$1._linkLookup[node];
          var filterIds = [id];

          links.forEach(function (l) {
            filterIds.push(nodeLookup[l]);
          });

          this$1.hover(function (h, x) {
            if (h.source && h.target) {
              return h.source.id === id || h.target.id === id;
            }
            else {
              return filterIds.includes(this$1._nodeId(h, x));
            }
          });
        }
      };
      this._path = d3Sankey.sankeyLinkHorizontal();
      this._sankey = d3Sankey.sankey();
      this._shape = d3plusCommon.constant("Rect");
      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        Path: {
          fill: "none",
          hoverStyle: {
            "stroke-width": function (d) { return Math.max(1, Math.abs(d.source.y1 - d.source.y0) * (d.value / d.source.value) - 2); }
          },
          label: false,
          stroke: "#DBDBDB",
          strokeOpacity: 0.5,
          strokeWidth: function (d) { return Math.max(1, Math.abs(d.source.y1 - d.source.y0) * (d.value / d.source.value) - 2); }

        },
        Rect: {}
      });
      this._value = d3plusCommon.constant(1);
    }

    if ( Viz ) Sankey.__proto__ = Viz;
    Sankey.prototype = Object.create( Viz && Viz.prototype );
    Sankey.prototype.constructor = Sankey;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Sankey.prototype._draw = function _draw (callback) {
      var this$1 = this;

      Viz.prototype._draw.call(this, callback);

      var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

      var nodes = this._nodes
        .map(function (n, i) { return ({
          __d3plus__: true,
          data: n,
          i: i,
          id: this$1._nodeId(n, i),
          node: n,
          shape: "Rect"
        }); });

      var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d, i) {
        obj[d.id] = i;
        return obj;
      }, {});

      var links = this._links.map(function (link, i) {
        var check = ["source", "target"];
        var linkLookup = check.reduce(function (result, item) {
          result[item] =
            typeof link[item] === "number"
              ? nodeLookup[link[item]]
              : nodeLookup[link[item]];
          return result;
        }, {});
        return {
          source: linkLookup.source,
          target: linkLookup.target,
          value: this$1._value(link, i)
        };
      });

      this._linkLookup = links.reduce(function (obj, d) {
        if (!obj[d.source]) { obj[d.source] = []; }
        obj[d.source].push(d.target);
        if (!obj[d.target]) { obj[d.target] = []; }
        obj[d.target].push(d.source);
        return obj;
      }, {});

      var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")";

      this._sankey
        .nodeAlign(this._nodeAlign)
        .nodeWidth(this._nodeWidth)
        .nodes(nodes)
        .links(links)
        .size([width, height])();

      this._shapes.push(
        new shapes.Path()
          .config(this._shapeConfig.Path)
          .data(links)
          .d(this._path)
          .select(
            d3plusCommon.elem("g.d3plus-Links", {
              parent: this._select,
              enter: {transform: transform},
              update: {transform: transform}
            }).node()
          )
          .render()
      );
      d3Collection.nest()
        .key(function (d) { return d.shape; })
        .entries(nodes)
        .forEach(function (d) {
          this$1._shapes.push(
            new shapes[d.key]()
              .data(d.values)
              .height(function (d) { return d.y1 - d.y0; })
              .width(function (d) { return d.x1 - d.x0; })
              .x(function (d) { return (d.x1 + d.x0) / 2; })
              .y(function (d) { return (d.y1 + d.y0) / 2; })
              .select(
                d3plusCommon.elem("g.d3plus-sankey-nodes", {
                  parent: this$1._select,
                  enter: {transform: transform},
                  update: {transform: transform}
                }).node()
              )
              .config(d3plusCommon.configPrep.bind(this$1)(this$1._shapeConfig, "shape", d.key))
              .render()
          );
        });
      return this;
    };

    /**
        @memberof Sankey
        @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
     */
    Sankey.prototype.hover = function hover (_) {
      this._hover = _;
      this._shapes.forEach(function (s) { return s.hover(_); });
      if (this._legend) { this._legendClass.hover(_); }

      return this;
    };

    /**
        @memberof Sankey
        @desc A predefined *Array* of edges that connect each object passed to the [node](#Sankey.node) method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
  1. A *String* value matching the `id` of the node.

  The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
        @param {Array} *links* = []
        @chainable
    */
    Sankey.prototype.links = function links (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "links"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._links;
    };

    /**
        @memberof Sankey
        @desc Sets the nodeAlign property of the sankey layout, which can either be "left", "right", "center", or "justify".
        @param {Function|String} [*value* = "justify"]
        @chainable
    */
    Sankey.prototype.nodeAlign = function nodeAlign (_) {
      return arguments.length
        ? (this._nodeAlign = typeof _ === "function" ? _ : sankeyAligns[_], this)
        : this._nodeAlign;
    };

    /**
        @memberof Sankey
        @desc If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.
        @param {String} [*value* = "id"]
        @chainable
    */
    Sankey.prototype.nodeId = function nodeId (_) {
      return arguments.length
        ? (this._nodeId = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this)
        : this._nodeId;
    };

    /**
        @memberof Sankey
        @desc The list of nodes to be used for drawing the network. The value passed must be an *Array* of data.

  Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
        @param {Array} *nodes* = []
        @chainable
    */
    Sankey.prototype.nodes = function nodes (_, f) {
      if (arguments.length) {
        var prev = this._queue.find(function (q) { return q[3] === "nodes"; });
        var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
        if (prev) { this._queue[this._queue.indexOf(prev)] = d; }
        else { this._queue.push(d); }
        return this;
      }
      return this._nodes;
    };

    /**
        @memberof Sankey
        @desc If *value* is specified, sets the width of the node and returns the current class instance. If *value* is not specified, returns the current nodeWidth. By default, the nodeWidth size is 30.
        @param {Number} [*value* = 30]
        @chainable
    */
    Sankey.prototype.nodeWidth = function nodeWidth (_) {
      return arguments.length ? (this._nodeWidth = _, this) : this._nodeWidth;
    };

    /**
        @memberof Sankey
        @desc If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.
        @param {Function|Number} *value*
        @example
  function value(d) {
    return d.value;
  }
    */
    Sankey.prototype.value = function value (_) {

      return arguments.length
        ? (this._value = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this)
        : this._value;
    };

    return Sankey;
  }(d3plusViz.Viz));

  exports.Network = Network;
  exports.Rings = Rings;
  exports.Sankey = Sankey;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-network.js.map
