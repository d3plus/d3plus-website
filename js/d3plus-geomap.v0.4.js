/*
  d3plus-geomap v0.4.12
  A reusable geo map built on D3 and Topojson
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-color'), require('d3-geo'), require('d3-scale'), require('d3-selection'), require('d3-tile'), require('d3-zoom'), require('topojson-client'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus-geomap', ['exports', 'd3-array', 'd3-color', 'd3-geo', 'd3-scale', 'd3-selection', 'd3-tile', 'd3-zoom', 'topojson-client', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
	(factory((global.d3plus = {}),global.d3Array,global.d3Color,global.d3Geo,global.scales,global.d3Selection,global.d3Tile,global.d3Zoom,global.topojsonClient,global.d3plusCommon,global.d3plusShape,global.d3plusViz));
}(this, (function (exports,d3Array,d3Color,d3Geo,scales,d3Selection,d3Tile,d3Zoom,topojsonClient,d3plusCommon,d3plusShape,d3plusViz) { 'use strict';

/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/

/**
    @class Geomap
    @extends external:Viz
    @desc Creates a geographical map with zooming, panning, image tiles, and the ability to layer choropleth paths and coordinate points. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started.
*/
var Geomap = (function (Viz$$1) {
  function Geomap() {
    var this$1 = this;


    Viz$$1.call(this);

    this._fitObject = false;
    this._ocean = "#cdd1d3";

    this._padding = 20;

    this._point = d3plusCommon.accessor("point");
    this._pointSize = d3plusCommon.constant(1);
    this._pointSizeMax = 10;
    this._pointSizeMin = 5;
    this._pointSizeScale = "linear";

    this._projection = d3Geo.geoMercator();

    this._rotate = [0, 0];

    this._shape = d3plusCommon.constant("Circle");
    this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
      Path: {
        fill: function (d) {
          if (this$1._colorScale && !this$1._coordData.features.includes(d)) {
            var c = this$1._colorScale(d);
            if (c !== undefined && c !== null) { return this$1._colorScaleClass._colorScale(c); }
          }
          return "#f5f5f3";
        },
        on: {
          "mouseenter": function (d) { return !this$1._coordData.features.includes(d) ? this$1._on.mouseenter.bind(this$1)(d) : null; },
          "mousemove.shape": function (d) { return !this$1._coordData.features.includes(d) ? this$1._on["mousemove.shape"].bind(this$1)(d) : null; },
          "mouseleave": function (d) { return !this$1._coordData.features.includes(d) ? this$1._on.mouseleave.bind(this$1)(d) : null; }
        },
        stroke: function (d, i) { return d3Color.color(this$1._shapeConfig.Path.fill(d, i)).darker(); },
        strokeWidth: 1
      }
    });

    this._tiles = true;
    this._tileGen = d3Tile.tile().wrap(false);
    this._tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png";

    this._topojson = false;
    this._topojsonFilter = function (d) { return !["010"].includes(d.id); };
    this._topojsonId = d3plusCommon.accessor("id");

    this._zoom = true;
    this._zoomBehavior = d3Zoom.zoom();
    this._zoomBrush = false;
    // this._zoomFactor = 2;
    this._zoomPan = true;
    // this._zoomReset = true;
    this._zoomScroll = true;
    this._zoomSet = false;

  }

  if ( Viz$$1 ) Geomap.__proto__ = Viz$$1;
  Geomap.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Geomap.prototype.constructor = Geomap;

  /**
      Renders map tiles based on the current zoom level.
      @private
  */
  Geomap.prototype._renderTiles = function _renderTiles () {
    var this$1 = this;


    var tau = 2 * Math.PI,
          transform = d3Zoom.zoomTransform(this._geomapGroup.node());

    var tileData = [];
    if (this._tiles) {
      // const d = this._projection(this._rotate)[0] - this._projection([0, 0])[0];
      tileData = this._tileGen
        .extent(this._zoomBehavior.translateExtent())
        .scale(this._projection.scale() * tau * transform.k)
        .translate(transform.apply(this._projection.translate()))
        ();

      this._tileGroup.attr("transform", ("scale(" + (tileData.scale) + ")translate(" + (tileData.translate) + ")"));

    }

    var images = this._tileGroup.selectAll("image.tile")
        .data(tileData, function (d) { return ((d.x) + "-" + (d.y) + "-" + (d.z)); });

    images.exit().remove();

    images.enter().append("image")
      .attr("class", "tile")
      .attr("xlink:href", function (d) { return this$1._tileUrl
        .replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0])
        .replace("{z}", d.z)
        .replace("{x}", d.x)
        .replace("{y}", d.y); })
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y; });

  };

  /**
      Handles events dispatched from this._zoomBehavior
      @private
  */
  Geomap.prototype._zoomed = function _zoomed () {

    this._zoomGroup.attr("transform", d3Selection.event.transform);
    this._renderTiles();

    //   if (event && !this._zoomPan) {
    //     this._zoomPan = true;
    //     zoomEvents();
    //   }

    //   let s = this._zoomBehavior.scale();
    //   const trans = this._zoomBehavior.translate();
    //
    //   let pz = s / this._polyZoom;
    //
    //   if (pz < minZoom) {
    //     pz = minZoom;
    //     s = pz * this._polyZoom;
    //     this._zoomBehavior.scale(s);
    //   }
    // const nh = height;
    // const bh = coordBounds[1][1] - coordBounds[0][1];
    // const bw = coordBounds[1][0] - coordBounds[0][0];
    // const xoffset = (width - bw * pz) / 2;
    // const xmin = xoffset > 0 ? xoffset : 0;
    // const xmax = xoffset > 0 ? width - xoffset : width;
    // const yoffset = (nh - bh * pz) / 2;
    // const ymin = yoffset > 0 ? yoffset : 0;
    // const ymax = yoffset > 0 ? nh - yoffset : nh;
    //
    // const extent = this._zoomBehavior.translateExtent();
    // if (transform.x + extent[0][0] * transform.k > xmin) {
    //   transform.x = -extent[0][0] * transform.k + xmin;
    // }
    // else if (transform.x + extent[1][0] * transform.k < xmax) {
    //   transform.x = xmax - extent[1][0] * transform.k;
    // }
    //
    // if (transform.y + extent[0][1] * transform.k > ymin) {
    //   transform.y = -extent[0][1] * transform.k + ymin;
    // }
    // else if (transform.y + extent[1][1] * transform.k < ymax) {
    //   transform.y = ymax - extent[1][1] * transform.k;
    // }
    // console.log(transform, this._zoomBehavior.translateExtent());
    //   this._zoomBehavior.translate(trans);

  };



  /**
      Handles adding/removing zoom event listeners.
      @private
  */
  Geomap.prototype._zoomEvents = function _zoomEvents () {

    if (this._zoomBrush) {
      // brushGroup.style("display", "inline");
      this._geomapGroup.on(".zoom", null);
    }
    else if (this._zoom) {
      // brushGroup.style("display", "none");
      this._geomapGroup.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._geomapGroup
          .on("mousewheel.zoom", null)
          .on("MozMousePixelScroll.zoom", null)
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._geomapGroup
          .on("mousedown.zoom", null)
          .on("mousemove.zoom", null)
          .on("touchstart.zoom", null)
          .on("touchmove.zoom", null);
      }
    }
    else {
      this._geomapGroup.on(".zoom", null);
    }

  };

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  Geomap.prototype._draw = function _draw (callback) {
    var this$1 = this;


    Viz$$1.prototype._draw.call(this, callback);

    var height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    this._geomapGroup = this._select.selectAll("svg.d3plus-geomap-geomapGroup").data([0]);
    this._geomapGroup = this._geomapGroup.enter().append("svg")
      .attr("class", "d3plus-geomap-geomapGroup")
      .attr("opacity", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top)
      .style("background-color", this._ocean || "transparent")
      .merge(this._geomapGroup);
    this._geomapGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top);

    var ocean = this._geomapGroup.selectAll("rect.d3plus-geomap-ocean").data([0]);
    ocean.enter().append("rect")
        .attr("class", "d3plus-geomap-ocean")
      .merge(ocean)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", this._ocean || "transparent");

    this._tileGroup = this._geomapGroup.selectAll("g.d3plus-geomap-tileGroup").data([0]);
    this._tileGroup = this._tileGroup.enter().append("g")
      .attr("class", "d3plus-geomap-tileGroup")
      .merge(this._tileGroup);

    this._zoomGroup = this._geomapGroup.selectAll("g.d3plus-geomap-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
      .attr("class", "d3plus-geomap-zoomGroup")
      .merge(this._zoomGroup);

    var pathGroup = this._zoomGroup.selectAll("g.d3plus-geomap-paths").data([0]);
    pathGroup = pathGroup.enter().append("g")
      .attr("class", "d3plus-geomap-paths")
      .merge(pathGroup);

    // TODO: Brush to Zoom
    // const brushGroup = this._select.selectAll("g.brush").data([0]);
    // brushGroup.enter().append("g").attr("class", "brush");
    //
    // var xBrush = d3.scale.identity().domain([0, width]),
    //     yBrush = d3.scale.identity().domain([0, height]);
    //
    // function brushended(e) {
    //
    //   if (!event.sourceEvent) return;
    //
    //   const extent = brush.extent();
    //   brushGroup.call(brush.clear());
    //
    //   const zs = this._zoomBehavior.scale(), zt = this._zoomBehavior.translate();
    //
    //   const pos1 = extent[0].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //   const pos2 = extent[1].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //
    //   zoomToBounds([pos1, pos2]);
    //
    // }
    //
    // var brush = d3.svg.brush()
    //   .x(xBrush)
    //   .y(yBrush)
    //   .on("brushend", brushended);
    //
    // if (this._zoom) brushGroup.call(brush);

    function topo2feature(topo, key) {
      var k = key && topo.objects[key] ? key : Object.keys(topo.objects)[0];
      return topojsonClient.feature(topo, topo.objects[k]);
    }

    var coordData = this._coordData = this._topojson
      ? topo2feature(this._topojson, this._topojsonKey)
      : {type: "FeatureCollection", features: []};

    if (this._topojsonFilter) { coordData.features = coordData.features.filter(this._topojsonFilter); }

    var path = this._path = d3Geo.geoPath()
      .projection(this._projection);

    var pointData = this._filteredData
      .filter(function (d, i) { return this$1._point(d, i) instanceof Array; });

    var pathData = this._filteredData
      .filter(function (d, i) { return !(this$1._point(d, i) instanceof Array); })
      .reduce(function (obj, d) {
        obj[this$1._id(d)] = d;
        return obj;
      }, {});

    var topoData = coordData.features.reduce(function (arr, feature$$1) {
      var id = this$1._topojsonId(feature$$1);
      arr.push({
        __d3plus__: true,
        data: pathData[id],
        feature: feature$$1,
        id: id
      });
      return arr;
    }, []);

    var r = scales[("scale" + (this._pointSizeScale.charAt(0).toUpperCase()) + (this._pointSizeScale.slice(1)))]()
      .domain(d3Array.extent(pointData, function (d, i) { return this$1._pointSize(d, i); }))
      .range([this._pointSizeMin, this._pointSizeMax]);

    if (!this._zoomSet) {

      var fitData = this._fitObject ? topo2feature(this._fitObject, this._fitKey) : coordData;

      var extentBounds = {
        type: "FeatureCollection",
        features: this._fitFilter ? fitData.features.filter(this._fitFilter) : fitData.features.slice()
      };

      extentBounds.features = extentBounds.features.reduce(function (arr, d) {

        var reduced = {
          type: d.type,
          id: d.id,
          geometry: {
            coordinates: d.geometry.coordinates,
            type: d.geometry.type
          }
        };

        if (d.geometry.coordinates.length > 1) {

          var areas = [],
                distances = [];

          d.geometry.coordinates.forEach(function (c) {

            reduced.geometry.coordinates = [c];
            areas.push(path.area(reduced));

          });

          reduced.geometry.coordinates = [d.geometry.coordinates[areas.indexOf(d3Array.max(areas))]];
          var center = path.centroid(reduced);

          d.geometry.coordinates.forEach(function (c) {

            reduced.geometry.coordinates = [c];
            distances.push(d3plusShape.pointDistance(path.centroid(reduced), center));

          });

          var distCutoff = d3Array.quantile(areas.reduce(function (arr, dist, i) {
            if (dist) { arr.push(areas[i] / dist); }
            return arr;
          }, []), 0.9);

          reduced.geometry.coordinates = d.geometry.coordinates.filter(function (c, i) {
            var dist = distances[i];
            return dist === 0 || areas[i] / dist >= distCutoff;
          });

        }

        arr.push(reduced);
        return arr;

      }, []);

      var pad = this._padding;
      if (typeof pad === "string") {
        pad = pad.match(/([-\d\.]+)/g).map(Number);
        if (pad.length === 3) { pad.push(pad[1]); }
        if (pad.length === 2) { pad = pad.concat(pad); }
        if (pad.length === 1) { pad = Array(4).fill(pad); }
      }
      else {
        pad = Array(4).fill(pad);
      }

      if (!extentBounds.features.length && pointData.length) {

        var bounds = [[undefined, undefined], [undefined, undefined]];
        pointData.forEach(function (d, i) {

          var point = this$1._projection(this$1._point(d, i));
          if (bounds[0][0] === void 0 || point[0] < bounds[0][0]) { bounds[0][0] = point[0]; }
          if (bounds[1][0] === void 0 || point[0] > bounds[1][0]) { bounds[1][0] = point[0]; }
          if (bounds[0][1] === void 0 || point[1] < bounds[0][1]) { bounds[0][1] = point[1]; }
          if (bounds[1][1] === void 0 || point[1] > bounds[1][1]) { bounds[1][1] = point[1]; }

        });

        extentBounds = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "MultiPoint",
              coordinates: bounds.map(function (b) { return this$1._projection.invert(b); })
            }
          }]
        };
        var maxSize = d3Array.max(pointData, function (d, i) { return r(this$1._pointSize(d, i)); });
        pad = pad.map(function (p) { return p + maxSize; });

      }

      this._projection = this._projection
        .fitExtent(
          extentBounds.features.length ? [[pad[3], pad[0]], [width - pad[1] * 2, height - pad[2] * 2]] : [[0, 0], [width, height]],
          extentBounds.features.length ? extentBounds : {type: "Sphere"}
        );

      this._zoomBehavior
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 16])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", this._zoomed.bind(this));

      this._zoomSet = true;

    }

    // TODO: Zoom math?
    // function zoomMath(factor) {
    //
    //   const center = [width / 2, height / 2];
    //
    //   const extent = this._zoomBehavior.scaleExtent(),
    //         scale = this._zoomBehavior.scale(),
    //         translate = this._zoomBehavior.translate();
    //
    //   let targetScale = scale * factor,
    //       x = translate[0],
    //       y = translate[1];
    //
    //   // If we're already at an extent, done
    //   if (targetScale === extent[0] || targetScale === extent[1]) return false;
    //
    //   // If the factor is too much, scale it down to reach the extent exactly
    //   const clampedScale = Math.max(extent[0], Math.min(extent[1], targetScale));
    //   if (clampedScale !== targetScale) {
    //     targetScale = clampedScale;
    //     factor = targetScale / scale;
    //   }
    //
    //   // Center each vector, stretch, then put back
    //   x = (x - center[0]) * factor + center[0];
    //   y = (y - center[1]) * factor + center[1];
    //
    //   this._zoomBehavior.scale(targetScale).translate([x, y]);
    //   zoomed(this._duration);
    //
    //   return true;
    //
    // }

    // TODO: Zoom controls
    // if (this._zoom) {
    //
    //   const controls = this._select.selectAll(".map-controls").data([0]);
    //   const controlsEnter = controls.enter().append("div")
    //     .attr("class", "map-controls");
    //
    //   controlsEnter.append("div").attr("class", "zoom-in")
    //     .on("click", () => zoomMath(this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-out")
    //     .on("click", () => zoomMath(1 / this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-reset");
    //   controls.select(".zoom-reset").on("click", () => {
    //     // vars.highlight.value = false;
    //     // this._highlightPath = undefined;
    //     zoomLogic();
    //   });
    //
    // }

    // TODO: Zoom logic? What's this do?
    // function zoomLogic(d) {
    //
    //   this._zoomReset = true;
    //
    //   if (d) zoomToBounds(this._path.bounds(d));
    //   else {
    //
    //     let ns = s;
    //
    //     // next line might not be needed?
    //     ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //     this._zoomBehavior.scale(ns * 2 * Math.PI).translate(t);
    //     zoomed(this._duration);
    //
    //   }
    //
    // }

    this._shapes.push(new d3plusShape.Path()
      .data(topoData)
      .d(function (d) { return path(d.feature); })
      .select(pathGroup.node())
      .x(0).y(0)
      .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
      .render());

    var pointGroup = this._zoomGroup.selectAll("g.d3plus-geomap-pins").data([0]);
    pointGroup = pointGroup.enter().append("g")
      .attr("class", "d3plus-geomap-pins")
      .merge(pointGroup);

    var circles = new d3plusShape.Circle()
      .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
      .data(pointData)
      .r(function (d, i) { return r(this$1._pointSize(d, i)); })
      .select(pointGroup.node())
      .sort(function (a, b) { return this$1._pointSize(b) - this$1._pointSize(a); })
      .x(function (d, i) { return this$1._projection(this$1._point(d, i))[0]; })
      .y(function (d, i) { return this$1._projection(this$1._point(d, i))[1]; });

    var events = Object.keys(this._on);
    var classEvents = events.filter(function (e) { return e.includes(".Circle"); }),
          globalEvents = events.filter(function (e) { return !e.includes("."); }),
          shapeEvents = events.filter(function (e) { return e.includes(".shape"); });
    for (var e = 0; e < globalEvents.length; e++) { circles.on(globalEvents[e], this$1._on[globalEvents[e]]); }
    for (var e$1 = 0; e$1 < shapeEvents.length; e$1++) { circles.on(shapeEvents[e$1], this$1._on[shapeEvents[e$1]]); }
    for (var e$2 = 0; e$2 < classEvents.length; e$2++) { circles.on(classEvents[e$2], this$1._on[classEvents[e$2]]); }

    this._shapes.push(circles.render());

    // Attaches any initial zoom event handlers.
    this._zoomEvents();

    // TODO: Zooming to Bounds
    // function zoomToBounds(b, mod = 250) {
    //
    //   const w = width - mod;
    //
    //   let ns = this._scale / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / height);
    //   const nt = [(w - ns * (b[1][0] + b[0][0])) / 2, (height - ns * (b[1][1] + b[0][1])) / 2];
    //
    //   ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //   this._zoomBehavior.scale(ns * 2 * Math.PI).translate(nt);
    //   zoomed(this._duration);
    //
    // }

    // TODO: Detect zoom brushing
    // select("body")
    //   .on(`keydown.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = true;
    //       zoomEvents();
    //     }
    //   })
    //   .on(`keyup.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = false;
    //       zoomEvents();
    //     }
    //   });

    this._renderTiles();

    return this;

  };

  /**
      @memberof Geomap
      @desc Topojson files sometimes include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). The fitFilter method can be used to remove specific geographies from the logic used to determine the zooming.

The *value* passed can be a single id to remove, an array of ids, or a filter function. Take a look at the [Choropleth Example](http://d3plus.org/examples/d3plus-geomap/getting-started/) to see it in action.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  Geomap.prototype.fitFilter = function fitFilter (_) {
    if (arguments.length) {
      if (typeof _ === "function") { return this._fitFilter = _, this; }
      if (!(_ instanceof Array)) { _ = [_]; }
      return this._fitFilter = function (d) { return _.includes(d.id); }, this;
    }
    return this._fitFilter;
  };

  /**
      @memberof Geomap
      @desc If the topojson being used to determine the zoom fit (either the main [topojson](#Geomap.topojson) object or the [fitObject](#Geomap.fitObject)) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use for the zoom fit.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
      @param {String} *value*
      @chainable
  */
  Geomap.prototype.fitKey = function fitKey (_) {
    return arguments.length ? (this._fitKey = _, this) : this._fitKey;
  };

  /**
      @memberof Geomap
      @desc The topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function needs to return the final Topojson *Object*.
      @param {Object|String} *data* = `undefined`
      @param {Function} [*formatter*]
      @chainable
  */
  Geomap.prototype.fitObject = function fitObject (_, f) {
    return arguments.length ? (this._queue.push([d3plusViz.dataLoad.bind(this), _, f, "fitObject"]), this) : this._fitObject;
  };

  /**
      @memberof Geomap
      @desc The color visible behind any shapes drawn on the map projection. By default, a color value matching the color used in the map tiles is used to help mask the loading time needed to render the tiles. Any value CSS color value may be used, including hexidecimal, rgb, rgba, and color strings like `"blue"` and `"transparent"`.
      @param {String} [*value* = "#cdd1d3"]
      @chainable
  */
  Geomap.prototype.ocean = function ocean (_) {
    return arguments.length ? (this._ocean = _, this) : this._ocean;
  };

  /**
      @memberof Geomap
      @desc The outer padding between the edge of the visualization and the shapes drawn. The value passed can be either a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).
      @param {Number|String} [*value* = 20]
      @chainable
  */
  Geomap.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Geomap
      @desc The accessor to be used when detecting coordinate points in the objects passed to the [data](https://d3plus.org/docs/#Viz.data) method. Values are expected to be in the format `[longitude, latitude]`, which is in-line with d3's expected coordinate mapping.
      @param {Function|Array} [*value*]
      @chainable
  */
  Geomap.prototype.point = function point (_) {
    return arguments.length ? (this._point = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._point;
  };

  /**
      @memberof Geomap
      @desc The accessor or static value to be used for sizing coordinate points.
      @param {Function|Number} [*value*]
      @chainable
  */
  Geomap.prototype.pointSize = function pointSize (_) {
    return arguments.length ? (this._pointSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointSize;
  };

  /**
      @memberof Geomap
      @desc The maximum pixel radius used in the scale for sizing coordinate points.
      @param {Number} [*value* = 10]
      @chainable
  */
  Geomap.prototype.pointSizeMax = function pointSizeMax (_) {
    return arguments.length ? (this._pointSizeMax = _, this) : this._pointSizeMax;
  };

  /**
      @memberof Geomap
      @desc The minimum pixel radius used in the scale for sizing coordinate points.
      @param {Number} [*value* = 5]
      @chainable
  */
  Geomap.prototype.pointSizeMin = function pointSizeMin (_) {
    return arguments.length ? (this._pointSizeMin = _, this) : this._pointSizeMin;
  };

  /**
      @memberof Geomap
      @desc Toggles the visibility of the map tiles.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Geomap.prototype.tiles = function tiles (_) {
    return arguments.length ? (this._tiles = _, this) : this._tiles;
  };

  /**
      @memberof Geomap
      @desc By default, d3plus uses the `light_all` style provided by [CARTO](https://carto.com/location-data-services/basemaps/) for it's map tiles. The [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method changes the base URL used for fetching the tiles, as long as the string passed contains `{x}`, `{y}`, and `{z}` variables enclosed in curly brackets for the zoom logic to load the correct tiles.
      @param {String} [url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"]
      @chainable
  */
  Geomap.prototype.tileUrl = function tileUrl (_) {
    return arguments.length ? (this._tileUrl = _, this) : this._tileUrl;
  };

  /**
      @memberof Geomap
      @desc The topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.
      @param {Object|String} *data* = []
      @param {Function} [*formatter*]
      @chainable
  */
  Geomap.prototype.topojson = function topojson (_, f) {
    return arguments.length ? (this._queue.push([d3plusViz.dataLoad.bind(this), _, f, "topojson"]), this) : this._topojson;
  };

  /**
      @memberof Geomap
      @desc If the [topojson](#Geomap.topojson) being used contains boundaries that should not be shown, this method can be used to filter them out of the final output. The *value* passed can be a single id to remove, an array of ids, or a filter function.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  Geomap.prototype.topojsonFilter = function topojsonFilter (_) {
    if (arguments.length) {
      if (typeof _ === "function") { return this._topojsonFilter = _, this; }
      if (!(_ instanceof Array)) { _ = [_]; }
      return this._topojsonFilter = function (d) { return _.includes(d.id); }, this;
    }
    return this._topojsonFilter;
  };

  /**
      @memberof Geomap
      @desc If the [topojson](#Geomap.topojson) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
      @param {String} *value*
      @chainable
  */
  Geomap.prototype.topojsonKey = function topojsonKey (_) {
    return arguments.length ? (this._topojsonKey = _, this) : this._topojsonKey;
  };

  /**
      @memberof Geomap
      @desc The accessor used to map each topojson geometry to it's corresponding [data](https://d3plus.org/docs/#Viz.data) point.
      @param {String|Function} *value* = "id"
      @chainable
  */
  Geomap.prototype.topojsonId = function topojsonId (_) {
    return arguments.length ? (this._topojsonId = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this, this) : this._topojsonId;
  };

  /**
      @memberof Geomap
      @desc Toggles the ability to zoom/pan the map.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Geomap.prototype.zoom = function zoom$$1 (_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  };

  return Geomap;
}(d3plusViz.Viz));

exports.Geomap = Geomap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-geomap.js.map
