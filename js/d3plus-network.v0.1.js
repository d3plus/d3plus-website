/*
  d3plus-network v0.1.7
  Javascript network visualizations built upon d3 modules.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-brush'), require('d3-collection'), require('d3-selection'), require('d3-scale'), require('d3-zoom'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus-network', ['exports', 'd3-array', 'd3-brush', 'd3-collection', 'd3-selection', 'd3-scale', 'd3-zoom', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3Array,global.d3Brush,global.d3Collection,global.d3Selection,global.scales,global.d3Zoom,global.d3plusCommon,global.shapes,global.d3plusViz));
}(this, (function (exports,d3Array,d3Brush,d3Collection,d3Selection,scales,d3Zoom,d3plusCommon,shapes,d3plusViz) { 'use strict';

/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

// import {forceSimulation} from "d3-force";
/**
    @class Network
    @extends external:Viz
    @desc Creates an x/y plot based on an array of data.
*/
var Network = (function (Viz$$1) {
  function Network() {
    var this$1 = this;


    Viz$$1.call(this);
    this._brushFilter = function () { return !d3Selection.event.button && d3Selection.event.detail < 2; };
    this._handleConfig = {
      fill: "#444"
    };
    this._handleSize = 6;
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

          var filterIds = [node.id],
                xDomain = [node.x - node.r, node.x + node.r],
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

          var filterIds = [id],
                xDomain = [nodes[0].x - nodes[0].r, nodes[0].x + nodes[0].r],
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
          this$1._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);

        }

        this$1._on["mousemove.legend"].bind(this$1)(d, i);

      }

    };
    this._selectionConfig = {
      "fill": "#777",
      "stroke-width": 0
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
    this._zoomBehavior = d3Zoom.zoom();
    this._zoomBrush = d3Brush.brush()
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));
    this._zoomMax = 16;
    this._zoomPan = true;
    this._zoomScroll = true;

  }

  if ( Viz$$1 ) Network.__proto__ = Viz$$1;
  Network.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Network.prototype.constructor = Network;

  /**
      @memberof Network
      @desc Triggered on brush "brush".
      @private
  */
  Network.prototype._brushBrush = function _brushBrush () {
    this._brushStyle();
  };

  /**
      @memberof Network
      @desc Triggered on brush "end".
      @private
  */
  Network.prototype._brushEnd = function _brushEnd () {

    if (!d3Selection.event.sourceEvent) { return; } // Only transition after input.

    // const domain = (event.selection ? event.selection
    //              : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
    //              .map(this._d3Scale.invert)
    //              .map(Number);

    console.log(d3Selection.event.selection);

    // const pixelDomain = domain.map(this._d3Scale),
    //       single = pixelDomain[0] === pixelDomain[1];
    // if (single) {
    //   pixelDomain[0] -= 0.1;
    //   pixelDomain[1] += 0.1;
    // }
    //
    // this._brushGroup.transition(this._transition).call(this._brush.move, pixelDomain);

    this._brushStyle();

  };

  /**
      @memberof Network
      @desc Triggered on brush "start".
      @private
  */
  Network.prototype._brushStart = function _brushStart () {
    this._brushStyle();
  };

  /**
      @memberof Network
      @desc Overrides the default brush styles.
      @private
  */
  Network.prototype._brushStyle = function _brushStyle () {

    this._brushGroup.selectAll(".selection")
      .call(d3plusCommon.attrize, this._selectionConfig);

    this._brushGroup.selectAll(".handle")
      .call(d3plusCommon.attrize, this._handleConfig);

  };

  /**
      Handles events dispatched from this._zoomBehavior
      @private
  */
  Network.prototype._zoomed = function _zoomed () {
    this._zoomGroup.attr("transform", d3Selection.event.transform);
  };

  /**
      Handles adding/removing zoom event listeners.
      @private
  */
  Network.prototype._zoomEvents = function _zoomEvents (brushing) {
    if ( brushing === void 0 ) brushing = false;


    if (brushing) {
      this._brushGroup.style("display", "inline");
      this._networkGroup.on(".zoom", null);
    }
    else if (this._zoom) {
      this._brushGroup.style("display", "none");
      this._networkGroup.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._networkGroup
          .on("mousewheel.zoom", null)
          .on("MozMousePixelScroll.zoom", null)
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._networkGroup
          .on("mousedown.zoom", null)
          .on("mousemove.zoom", null)
          .on("touchstart.zoom", null)
          .on("touchmove.zoom", null);
      }
    }
    else {
      this._networkGroup.on(".zoom", null);
    }

  };

  /**
      Zooms to given bounds.
      @private
  */
  Network.prototype._zoomToBounds = function _zoomToBounds (bounds) {

    if (bounds) {

      var ref = this._zoomBehavior.translateExtent()[1];
      var width = ref[0];
      var height = ref[1];

      var dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2;

      var scale = Math.max(1, Math.min(this._zoomMax, 0.9 / Math.max(dx / width, dy / height)));
      var translate = [width / 2 - scale * x, height / 2 - scale * y];

      var newZoom = d3Zoom.zoomIdentity
        .translate(translate[0], translate[1])
        .scale(scale);

      this._networkGroup.transition()
        .duration(this._zoomBehavior.duration())
        .call(this._zoomBehavior.transform, newZoom);

    }
    else {

      this._networkGroup.transition()
        .duration(this._zoomBehavior.duration())
        .call(this._zoomBehavior.transform, d3Zoom.zoomIdentity);

    }

  };

  /**
      Extends the render behavior of the abstract Viz class.
      @private
  */
  Network.prototype.render = function render (callback) {
    var this$1 = this;


    Viz$$1.prototype.render.call(this, callback);

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

    this._networkGroup = this._select.selectAll("svg.d3plus-network-svg").data([0]);

    this._networkGroup = this._networkGroup.enter().append("svg")
        .attr("class", "d3plus-network-svg")
        .attr("opacity", 0)
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "transparent")
      .merge(this._networkGroup);

    this._networkGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height);

    var hitArea = this._networkGroup.selectAll("rect.d3plus-network-hitArea").data([0]);
    hitArea.enter().append("rect")
        .attr("class", "d3plus-network-hitArea")
      .merge(hitArea)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "transparent");

    this._zoomGroup = this._networkGroup.selectAll("g.d3plus-network-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
        .attr("class", "d3plus-network-zoomGroup")
      .merge(this._zoomGroup);

    this._zoomBrush
      .extent([[0, 0], [width, height]])
      .filter(this._brushFilter)
      .handleSize(this._handleSize);

    var brushGroup = this._select.selectAll("g.brush").data([0]);
    this._brushGroup = brushGroup.enter().append("g")
        .attr("class", "brush")
      .merge(brushGroup)
      .call(this._zoomBrush);

    // select("body")
    //   .on(`keydown.network-${this.uuid}`, () => {
    //     if (event.keyCode === 16) this._zoomEvents(true);
    //   })
    //   .on(`keyup.network-${this.uuid}`, () => {
    //     if (event.keyCode === 16) this._zoomEvents(false);
    //   });

    this._zoomBehavior
      .scaleExtent([1, this._zoomMax])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", this._zoomed.bind(this));

    var parent = this._zoomGroup;

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

    this._zoomEvents();

    return this;

  };

  /**
      @memberof Network
      @desc If *links* is specified, sets the links array to the specified array and returns the current class instance. If *links* is not specified, returns the current links array.
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
    return arguments.length
         ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this)
         : this._size;
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

  /**
      @memberof Network
      @desc If *value* is specified, toggles overall zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current overall zooming value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Network.prototype.zoom = function zoom$$1 (_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  };

  /**
      @memberof Network
      @desc If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.
      @param {Number} [*value* = 16]
      @chainable
  */
  Network.prototype.zoomMax = function zoomMax (_) {
    return arguments.length ? (this._zoomMax = _, this) : this._zoomMax;
  };

  /**
      @memberof Network
      @desc If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Network.prototype.zoomPan = function zoomPan (_) {
    return arguments.length ? (this._zoomPan = _, this) : this._zoomPan;
  };

  /**
      @memberof Network
      @desc If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Network.prototype.zoomScroll = function zoomScroll (_) {
    return arguments.length ? (this._zoomScroll = _, this) : this._zoomScroll;
  };

  return Network;
}(d3plusViz.Viz));

exports.Network = Network;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-network.js.map
