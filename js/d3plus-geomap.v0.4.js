/*
  d3plus-geomap v0.4.14
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-color'), require('d3-geo'), require('d3-scale'), require('d3-tile'), require('topojson-client'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
	typeof define === 'function' && define.amd ? define('d3plus-geomap', ['exports', 'd3-array', 'd3-color', 'd3-geo', 'd3-scale', 'd3-tile', 'topojson-client', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
	(factory((global.d3plus = {}),global.d3Array,global.d3Color,global.d3Geo,global.scales,global.d3Tile,global.topojsonClient,global.d3plusCommon,global.d3plusShape,global.d3plusViz));
}(this, (function (exports,d3Array,d3Color,d3Geo,scales,d3Tile,topojsonClient,d3plusCommon,d3plusShape,d3plusViz) { 'use strict';

/**
    @external Viz
    @see https://github.com/d3plus/d3plus-viz#Viz
*/
/**
    @name topo2feature
    @desc Converts a specific topojson object key into a feature ready for projection.
    @param {Object} *topo* A valid topojson json object.
    @param {String} [*key*] The topojson object key to be used. If undefined, the first key available will be used.
    @private
*/
function topo2feature(topo, key) {
  var k = key && topo.objects[key] ? key : Object.keys(topo.objects)[0];
  return topojsonClient.feature(topo, topo.objects[k]);
}

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
    this._zoomSet = false;

  }

  if ( Viz$$1 ) Geomap.__proto__ = Viz$$1;
  Geomap.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Geomap.prototype.constructor = Geomap;

  /**
      Renders map tiles based on the current zoom level.
      @private
  */
  Geomap.prototype._renderTiles = function _renderTiles (transform, duration) {
    var this$1 = this;
    if ( duration === void 0 ) duration = 0;


    var tileData = [];
    if (this._tiles) {

      tileData = this._tileGen
        .extent(this._zoomBehavior.translateExtent())
        .scale(this._projection.scale() * (2 * Math.PI) * transform.k)
        .translate(transform.apply(this._projection.translate()))
        ();

      this._tileGroup.transition().duration(duration).attr("transform", transform);

    }

    var images = this._tileGroup.selectAll("image.tile")
        .data(tileData, function (d) { return ((d.x) + "-" + (d.y) + "-" + (d.z)); });

    images.exit().transition().duration(duration)
      .attr("opacity", 0).remove();

    var scale = tileData.scale / transform.k;

    images.enter().append("image")
        .attr("class", "tile")
        .attr("opacity", 0)
        .attr("xlink:href", function (d) { return this$1._tileUrl
          .replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0])
          .replace("{z}", d.z)
          .replace("{x}", d.x)
          .replace("{y}", d.y); })
        .attr("width", scale)
        .attr("height", scale)
        .attr("x", function (d) { return d.x * scale + tileData.translate[0] * scale - transform.x / transform.k; })
        .attr("y", function (d) { return d.y * scale + tileData.translate[1] * scale - transform.y / transform.k; })
      .transition().duration(duration)
        .attr("opacity", 1);

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

    this._container = this._select.selectAll("svg.d3plus-geomap").data([0]);
    this._container = this._container.enter().append("svg")
      .attr("class", "d3plus-geomap")
      .attr("opacity", 0)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top)
      .style("background-color", this._ocean || "transparent")
      .merge(this._container);
    this._container.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height)
      .attr("x", this._margin.left)
      .attr("y", this._margin.top);

    var ocean = this._container.selectAll("rect.d3plus-geomap-ocean").data([0]);
    ocean.enter().append("rect")
        .attr("class", "d3plus-geomap-ocean")
      .merge(ocean)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", this._ocean || "transparent");

    this._tileGroup = this._container.selectAll("g.d3plus-geomap-tileGroup").data([0]);
    this._tileGroup = this._tileGroup.enter().append("g")
      .attr("class", "d3plus-geomap-tileGroup")
      .merge(this._tileGroup);

    this._zoomGroup = this._container.selectAll("g.d3plus-geomap-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
      .attr("class", "d3plus-geomap-zoomGroup")
      .merge(this._zoomGroup);

    var pathGroup = this._zoomGroup.selectAll("g.d3plus-geomap-paths").data([0]);
    pathGroup = pathGroup.enter().append("g")
      .attr("class", "d3plus-geomap-paths")
      .merge(pathGroup);

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
        .scaleExtent([1, this._zoomMax])
        .translateExtent([[0, 0], [width, height]]);

      this._zoomSet = true;

    }

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

  return Geomap;
}(d3plusViz.Viz));

exports.Geomap = Geomap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-geomap.js.map
