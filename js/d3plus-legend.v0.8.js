/*
  d3plus-legend v0.8.17
  An easy to use javascript chart legend.
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-interpolate'), require('d3-scale'), require('d3-selection'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-text')) :
	typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3-array', 'd3-interpolate', 'd3-scale', 'd3-selection', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-shape', 'd3plus-text'], factory) :
	(factory((global.d3plus = {}),global.d3Array,global.d3Interpolate,global.d3Scale,global.d3Selection,global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.shapes,global.d3plusText));
}(this, (function (exports,d3Array,d3Interpolate,d3Scale,d3Selection,d3plusAxis,d3plusColor,d3plusCommon,shapes,d3plusText) { 'use strict';

/**
    @desc Sort an array of numbers by their numeric value, ensuring that the array is not changed in place.

This is necessary because the default behavior of .sort in JavaScript is to sort arrays as string values

[1, 10, 12, 102, 20].sort()
// output
[1, 10, 102, 12, 20]

    @param {Array<number>} array input array
    @return {Array<number>} sorted array
    @private
    @example
numericSort([3, 2, 1]) // => [1, 2, 3]
*/
function numericSort(array) {
  return array.slice().sort(function (a, b) { return a - b; });
}

/**
    For a sorted input, counting the number of unique values is possible in constant time and constant memory. This is a simple implementation of the algorithm.

    Values are compared with `===`, so objects and non-primitive objects are not handled in any special way.
    @private
    @param {Array} input an array of primitive values.
    @returns {number} count of unique values
    @example
uniqueCountSorted([1, 2, 3]); // => 3
uniqueCountSorted([1, 1, 1]); // => 1
*/
function uniqueCountSorted(input) {
  var lastSeenValue, uniqueValueCount = 0;
  for (var i = 0; i < input.length; i++) {
    if (i === 0 || input[i] !== lastSeenValue) {
      lastSeenValue = input[i];
      uniqueValueCount++;
    }
  }
  return uniqueValueCount;
}

/**
    Create a new column x row matrix.
    @private
    @param {number} columns
    @param {number} rows
    @return {Array<Array<number>>} matrix
    @example
makeMatrix(10, 10);
*/
function makeMatrix(columns, rows) {
  var matrix = [];
  for (var i = 0; i < columns; i++) {
    var column = [];
    for (var j = 0; j < rows; j++) { column.push(0); }
    matrix.push(column);
  }
  return matrix;
}

/**
    Generates incrementally computed values based on the sums and sums of squares for the data array
    @private
    @param {number} j
    @param {number} i
    @param {Array<number>} sums
    @param {Array<number>} sumsOfSquares
    @return {number}
    @example
ssq(0, 1, [-1, 0, 2], [1, 1, 5]);
*/
function ssq(j, i, sums, sumsOfSquares) {
  var sji; // s(j, i)

  if (j > 0) {
    var muji = (sums[i] - sums[j - 1]) / (i - j + 1); // mu(j, i)
    sji = sumsOfSquares[i] - sumsOfSquares[j - 1] - (i - j + 1) * muji * muji;
  }
  else { sji = sumsOfSquares[i] - sums[i] * sums[i] / (i + 1); }

  if (sji < 0) { return 0; }
  return sji;
}

/**
    Function that recursively divides and conquers computations for cluster j
    @private
    @param {number} iMin Minimum index in cluster to be computed
    @param {number} iMax Maximum index in cluster to be computed
    @param {number} cluster Index of the cluster currently being computed
    @param {Array<Array<number>>} matrix
    @param {Array<Array<number>>} backtrackMatrix
    @param {Array<number>} sums
    @param {Array<number>} sumsOfSquares
*/
function fillMatrixColumn(iMin, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares) {
  if (iMin > iMax) { return; }

  // Start at midpoint between iMin and iMax
  var i = Math.floor((iMin + iMax) / 2);

  matrix[cluster][i] = matrix[cluster - 1][i - 1];
  backtrackMatrix[cluster][i] = i;

  var jlow = cluster; // the lower end for j
  if (iMin > cluster) { jlow = Math.max(jlow, backtrackMatrix[cluster][iMin - 1] || 0); }
  jlow = Math.max(jlow, backtrackMatrix[cluster - 1][i] || 0);

  var jhigh = i - 1; // the upper end for j
  if (iMax < matrix.length - 1) { jhigh = Math.min(jhigh, backtrackMatrix[cluster][iMax + 1] || 0); }

  for (var j = jhigh; j >= jlow; --j) {
    var sji = ssq(j, i, sums, sumsOfSquares);

    if (sji + matrix[cluster - 1][jlow - 1] >= matrix[cluster][i]) { break; }

    // Examine the lower bound of the cluster border
    var sjlowi = ssq(jlow, i, sums, sumsOfSquares);

    var ssqjlow = sjlowi + matrix[cluster - 1][jlow - 1];

    if (ssqjlow < matrix[cluster][i]) {
      // Shrink the lower bound
      matrix[cluster][i] = ssqjlow;
      backtrackMatrix[cluster][i] = jlow;
    }
    jlow++;

    var ssqj = sji + matrix[cluster - 1][j - 1];
    if (ssqj < matrix[cluster][i]) {
      matrix[cluster][i] = ssqj;
      backtrackMatrix[cluster][i] = j;
    }
  }

  fillMatrixColumn(iMin, i - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
  fillMatrixColumn(i + 1, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);

}

/**
    Initializes the main matrices used in Ckmeans and kicks off the divide and conquer cluster computation strategy
    @private
    @param {Array<number>} data sorted array of values
    @param {Array<Array<number>>} matrix
    @param {Array<Array<number>>} backtrackMatrix
*/
function fillMatrices(data, matrix, backtrackMatrix) {
  var nValues = matrix[0].length;

  // Shift values by the median to improve numeric stability
  var shift = data[Math.floor(nValues / 2)];

  // Cumulative sum and cumulative sum of squares for all values in data array
  var sums = [];
  var sumsOfSquares = [];

  // Initialize first column in matrix & backtrackMatrix
  for (var i = 0, shiftedValue = (void 0); i < nValues; ++i) {
    shiftedValue = data[i] - shift;
    if (i === 0) {
      sums.push(shiftedValue);
      sumsOfSquares.push(shiftedValue * shiftedValue);
    }
    else {
      sums.push(sums[i - 1] + shiftedValue);
      sumsOfSquares.push(sumsOfSquares[i - 1] + shiftedValue * shiftedValue);
    }

    // Initialize for cluster = 0
    matrix[0][i] = ssq(0, i, sums, sumsOfSquares);
    backtrackMatrix[0][i] = 0;
  }

  // Initialize the rest of the columns
  for (var cluster = 1; cluster < matrix.length; ++cluster) {
    var iMin = nValues - 1;
    if (cluster < matrix.length - 1) { iMin = cluster; }
    fillMatrixColumn(iMin, nValues - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
  }
}

/**
    @desc Ported to ES6 from the excellent [simple-statistics](https://github.com/simple-statistics/simple-statistics) packages.

Ckmeans clustering is an improvement on heuristic-based clustering approaches like Jenks. The algorithm was developed in [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf) as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach to the problem of clustering numeric data into groups with the least within-group sum-of-squared-deviations.

Minimizing the difference within groups - what Wang & Song refer to as `withinss`, or within sum-of-squares, means that groups are optimally homogenous within and the data is split into representative groups. This is very useful for visualization, where you may want to represent a continuous variable in discrete color or style groups. This function can provide groups that emphasize differences between data.

Being a dynamic approach, this algorithm is based on two matrices that store incrementally-computed values for squared deviations and backtracking indexes.

This implementation is based on Ckmeans 3.4.6, which introduced a new divide and conquer approach that improved runtime from O(kn^2) to O(kn log(n)).

Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html), this implementation does not include any code to automatically determine the optimal number of clusters: this information needs to be explicitly provided.

### References
_Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic
Programming_ Haizhou Wang and Mingzhou Song ISSN 2073-4859 from The R Journal Vol. 3/2, December 2011
    @param {Array<number>} data input data, as an array of number values
    @param {number} nClusters number of desired classes. This cannot be greater than the number of values in the data array.
    @returns {Array<Array<number>>} clustered input
    @example
ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
// The input, clustered into groups of similar numbers.
//= [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
*/
function ckmeans(data, nClusters) {

  if (nClusters > data.length) {
    throw new Error("Cannot generate more classes than there are data values");
  }

  var sorted = numericSort(data);

  // we'll use this as the maximum number of clusters
  var uniqueCount = uniqueCountSorted(sorted);

  // if all of the input values are identical, there's one cluster with all of the input in it.
  if (uniqueCount === 1) { return [sorted]; }

  var backtrackMatrix = makeMatrix(nClusters, sorted.length),
        matrix = makeMatrix(nClusters, sorted.length);

  // This is a dynamic programming way to solve the problem of minimizing within-cluster sum of squares. It's similar to linear regression in this way, and this calculation incrementally computes the sum of squares that are later read.
  fillMatrices(sorted, matrix, backtrackMatrix);

  // The real work of Ckmeans clustering happens in the matrix generation: the generated matrices encode all possible clustering combinations, and once they're generated we can solve for the best clustering groups very quickly.
  var clusterRight = backtrackMatrix[0].length - 1;
  var clusters = [];

  // Backtrack the clusters from the dynamic programming matrix. This starts at the bottom-right corner of the matrix (if the top-left is 0, 0), and moves the cluster target with the loop.
  for (var cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {

    var clusterLeft = backtrackMatrix[cluster][clusterRight];

    // fill the cluster from the sorted input by taking a slice of the array. the backtrack matrix makes this easy - it stores the indexes where the cluster should start and end.
    clusters[cluster] = sorted.slice(clusterLeft, clusterRight + 1);

    if (cluster > 0) { clusterRight = clusterLeft - 1; }

  }

  return clusters;

}

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class ColorScale
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var ColorScale = (function (BaseClass) {
  function ColorScale() {

    BaseClass.call(this);

    this._axisClass = new d3plusAxis.Axis();
    this._axisConfig = {
      gridSize: 0
    };
    this._axisTest = new d3plusAxis.Axis();
    this._align = "middle";
    this._color = "#0C8040";
    this._data = [];
    this._duration = 600;
    this._height = 200;
    this._orient = "bottom";
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._rectClass = new shapes.Rect();
    this._rectConfig = {
      stroke: "#000",
      strokeWidth: 1
    };
    this._scale = "linear";
    this._size = 10;
    this._value = d3plusCommon.accessor("value");
    this._width = 400;

  }

  if ( BaseClass ) ColorScale.__proto__ = BaseClass;
  ColorScale.prototype = Object.create( BaseClass && BaseClass.prototype );
  ColorScale.prototype.constructor = ColorScale;

  /**
      @memberof ColorScale
      @desc Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  ColorScale.prototype.render = function render (callback) {
    var this$1 = this;
    var obj;


    if (this._select === void 0) { this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node()); }

    var horizontal = ["bottom", "top"].includes(this._orient);

    var height = horizontal ? "height" : "width",
          width = horizontal ? "width" : "height",
          x = horizontal ? "x" : "y",
          y = horizontal ? "y" : "x";

    // Shape <g> Group
    this._group = d3plusCommon.elem("g.d3plus-ColorScale", {parent: this._select});

    var domain = d3Array.extent(this._data, this._value);
    var colors = this._color, labels, ticks;

    if (!(colors instanceof Array)) {
      colors = [
        d3plusColor.colorLighter(colors, 0.9),
        d3plusColor.colorLighter(colors, 0.75),
        d3plusColor.colorLighter(colors, 0.5),
        d3plusColor.colorLighter(colors, 0.25),
        colors
      ];
    }

    if (this._scale === "jenks") {

      var data = this._data
        .map(this._value)
        .filter(function (d) { return d !== null && typeof d === "number"; });

      if (data.length <= colors.length) {

        var ts = d3Scale.scaleLinear()
          .domain(d3Array.range(0, data.length - 1))
          .interpolate(d3Interpolate.interpolateHsl)
          .range(colors);

        colors = data.slice(0, data.length - 1).map(function (d, i) { return ts(i); });
      }

      var jenks = ckmeans(data, colors.length);

      ticks = d3Array.merge(jenks.map(function (c, i) { return i === jenks.length - 1 ? [c[0], c[c.length - 1]] : [c[0]]; }));

      var tickSet = new Set(ticks);

      if (ticks.length !== tickSet.size) {
        labels = Array.from(tickSet);
      }

      this._colorScale = d3Scale.scaleThreshold()
        .domain(ticks)
        .range(["black"].concat(colors).concat(colors[colors.length - 1]));

    }
    else {

      var step = (domain[1] - domain[0]) / (colors.length - 1);
      var buckets = d3Array.range(domain[0], domain[1] + step / 2, step);

      if (this._scale === "buckets") { ticks = buckets; }

      this._colorScale = d3Scale.scaleLinear()
        .domain(buckets)
        .range(colors);

    }

    var axisConfig = Object.assign({
      domain: horizontal ? domain : domain.reverse(),
      duration: this._duration,
      height: this._height,
      labels: labels || ticks,
      orient: this._orient,
      padding: this._padding,
      ticks: ticks,
      width: this._width
    }, this._axisConfig);

    this._axisTest
      .select(d3plusCommon.elem("g.d3plus-ColorScale-axisTest", {enter: {opacity: 0}, parent: this._group}).node())
      .config(axisConfig)
      .render();

    var axisBounds = this._axisTest.outerBounds();

    this._outerBounds[width] = this[("_" + width)] - this._padding * 2;
    this._outerBounds[height] = axisBounds[height] + this._size;

    this._outerBounds[x] = this._padding;
    this._outerBounds[y] = this._padding;
    if (this._align === "middle") { this._outerBounds[y] = (this[("_" + height)] - this._outerBounds[height]) / 2; }
    else if (this._align === "end") { this._outerBounds[y] = this[("_" + height)] - this._padding - this._outerBounds[height]; }

    var groupOffset = this._outerBounds[y] + (["bottom", "right"].includes(this._orient) ? this._size : 0) - (axisConfig.padding || this._axisClass.padding());
    this._axisClass
      .select(d3plusCommon.elem("g.d3plus-ColorScale-axis", {
        parent: this._group,
        update: {transform: ("translate(" + (horizontal ? 0 : groupOffset) + ", " + (horizontal ? groupOffset : 0) + ")")}
      }).node())
      .config(axisConfig)
      .align("start")
      .render();

    var axisScale = this._axisTest._getPosition.bind(this._axisTest);
    var scaleRange = this._axisTest._getRange();

    var defs = this._group.selectAll("defs").data([0]);
    var defsEnter = defs.enter().append("defs");
    defsEnter.append("linearGradient").attr("id", ("gradient-" + (this._uuid)));
    defs = defsEnter.merge(defs);
    defs.select("linearGradient")
      .attr((x + "1"), horizontal ? "0%" : "100%")
      .attr((x + "2"), horizontal ? "100%" : "0%")
      .attr((y + "1"), "0%")
      .attr((y + "2"), "0%");
    var stops = defs.select("linearGradient").selectAll("stop")
      .data(colors);
    stops.enter().append("stop").merge(stops)
      .attr("offset", function (d, i) { return ((i / (colors.length - 1) * 100) + "%"); })
      .attr("stop-color", String);

    function bucketWidth(d, i) {
      var w = Math.abs(axisScale(ticks[i + 1]) - axisScale(d));
      return w || 2;
    }

    this._rectClass
      .data(ticks ? ticks.slice(0, ticks.length - 1) : [0])
      .id(function (d, i) { return i; })
      .select(d3plusCommon.elem("g.d3plus-ColorScale-Rect", {parent: this._group}).node())
      .config(( obj = {
        fill: ticks ? function (d) { return this$1._colorScale(d); } : ("url(#gradient-" + (this._uuid) + ")")
      }, obj[x] = ticks ? function (d, i) { return axisScale(d) + bucketWidth(d, i) / 2 - (["left", "right"].includes(this$1._orient) ? bucketWidth(d, i) : 0); } : scaleRange[0] + (scaleRange[1] - scaleRange[0]) / 2, obj[y] = this._outerBounds[y] + (["top", "left"].includes(this._orient) ? axisBounds[height] : 0) + this._size / 2, obj[width] = ticks ? bucketWidth : scaleRange[1] - scaleRange[0], obj[height] = this._size, obj))
      .config(this._rectConfig)
      .render();

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof ColorScale
      @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
      @param {Object} [*value*]
      @chainable
  */
  ColorScale.prototype.axisConfig = function axisConfig (_) {
    return arguments.length ? (this._axisConfig = Object.assign(this._axisConfig, _), this) : this._axisConfig;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  ColorScale.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof ColorScale
      @desc Defines the color or colors to be used for the scale. If only a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.
      @param {String|Array} [*value* = "#0C8040"]
      @chainable
  */
  ColorScale.prototype.color = function color (_) {
    return arguments.length ? (this._color = _, this) : this._color;
  };

  /**
      @memberof ColorScale
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  ColorScale.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  ColorScale.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  ColorScale.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof ColorScale
      @desc Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.
      @param {String} [*value* = "bottom"]
      @chainable
  */
  ColorScale.prototype.orient = function orient (_) {
    return arguments.length ? (this._orient = _, this) : this._orient;
  };

  /**
      @memberof ColorScale
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  ColorScale.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  ColorScale.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof ColorScale
      @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
      @param {Object} [*value*]
      @chainable
  */
  ColorScale.prototype.rectConfig = function rectConfig (_) {
    return arguments.length ? (this._rectConfig = Object.assign(this._rectConfig, _), this) : this._rectConfig;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.
      @param {String} [*value* = "linear"] Can either be "linear", "jenks", or "buckets".
      @chainable
  */
  ColorScale.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  };

  /**
      @memberof ColorScale
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  ColorScale.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof ColorScale
      @desc The height of horizontal color scales, and width when positioned vertical.
      @param {Number} [*value* = 10]
      @chainable
  */
  ColorScale.prototype.size = function size (_) {
    return arguments.length ? (this._size = _, this) : this._size;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.
      @param {Function|String} [*value*]
      @chainable
      @example
function value(d) {
  return d.value;
}
  */
  ColorScale.prototype.value = function value (_) {
    return arguments.length ? (this._value = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._value;
  };

  /**
      @memberof ColorScale
      @desc If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  ColorScale.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return ColorScale;
}(d3plusCommon.BaseClass));

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Legend
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var Legend = (function (BaseClass) {
  function Legend() {
    var this$1 = this;


    BaseClass.call(this);

    this._align = "center";
    this._data = [];
    this._direction = "row";
    this._duration = 600;
    this._height = 200;
    this._id = d3plusCommon.accessor("id");
    this._label = d3plusCommon.accessor("id");
    this._lineData = [];
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = d3plusCommon.constant("Rect");
    this._shapes = [];
    this._shapeConfig = {
      duration: this._duration,
      fill: d3plusCommon.accessor("color"),
      height: d3plusCommon.constant(10),
      hitArea: function (dd, i) {
        var d = this$1._lineData[i],
              h = d3Array.max([d.height, d.shapeHeight]);
        return {width: d.width + d.shapeWidth, height: h, x: -d.shapeWidth / 2, y: -h / 2};
      },
      labelBounds: function (dd, i, s) {
        var d = this$1._lineData[i],
              w = s.r !== void 0 ? s.r : s.width / 2;
        return {width: d.width, height: d.height, x: w + this$1._padding, y: -d.height / 2 + (d.lh - d.s) / 2 + 1};
      },
      labelConfig: {
        fontColor: d3plusCommon.constant("#444"),
        fontFamily: new d3plusText.TextBox().fontFamily(),
        fontResize: false,
        fontSize: d3plusCommon.constant(10)
      },
      opacity: 1,
      r: d3plusCommon.constant(5),
      width: d3plusCommon.constant(10),
      x: function (d, i) {
        var datum = this$1._lineData[i];
        var y = datum.y;
        var pad = this$1._align === "left" || this$1._align === "right" && this$1._direction === "column" ? 0 : this$1._align === "center"
          ? (this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }))) / 2
          : this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }));
        var prevWords = this$1._lineData.slice(0, i).filter(function (l) { return y === l.y; });
        return this$1._rowWidth(prevWords) + this$1._padding * (prevWords.length ? datum.sentence ? 2 : 1 : 0) +
               this$1._outerBounds.x + datum.shapeWidth / 2 + pad;
      },
      y: function (d, i) {
        var ld = this$1._lineData[i];
        return ld.y + this$1._titleHeight + this$1._outerBounds.y +
               d3Array.max(this$1._lineData.filter(function (l) { return ld.y === l.y; }).map(function (l) { return l.height; }).concat(this$1._data.map(function (l, x) { return this$1._fetchConfig("height", l, x); }))) / 2;
      }
    };
    this._titleClass = new d3plusText.TextBox();
    this._titleConfig = {};
    this._verticalAlign = "middle";
    this._width = 400;

  }

  if ( BaseClass ) Legend.__proto__ = BaseClass;
  Legend.prototype = Object.create( BaseClass && BaseClass.prototype );
  Legend.prototype.constructor = Legend;

  Legend.prototype._fetchConfig = function _fetchConfig (key, d, i) {
    var val = this._shapeConfig[key] || this._shapeConfig.labelConfig[key];
    if (!val && key === "lineHeight") { return this._fetchConfig("fontSize", d, i) * 1.4; }
    return typeof val === "function" ? val(d, i) : val;
  };

  Legend.prototype._rowHeight = function _rowHeight (row) {
    return d3Array.max(row.map(function (d) { return d.height; }).concat(row.map(function (d) { return d.shapeHeight; }))) + this._padding;
  };

  Legend.prototype._rowWidth = function _rowWidth (row) {
    var this$1 = this;

    return d3Array.sum(row.map(function (d, i) {
      var p = this$1._padding * (i === row.length - 1 ? 0 : d.width ? 2 : 1);
      return d.shapeWidth + d.width + p;
    }));
  };

  /**
      @memberof Legend
      @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  Legend.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) { this.select(d3Selection.select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node()); }

    // Shape <g> Group
    this._group = d3plusCommon.elem("g.d3plus-Legend", {parent: this._select});

    var availableHeight = this._height;
    this._titleHeight = 0;
    if (this._title) {

      var f = this._titleConfig.fontFamily || this._titleClass.fontFamily()(),
            s = this._titleConfig.fontSize || this._titleClass.fontSize()();
      var lH = lH = this._titleConfig.lineHeight || this._titleClass.lineHeight();
      lH = lH ? lH() : s * 1.4;

      var res = d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lH)
        .width(this._width)
        .height(this._height)
        (this._title);
      this._titleHeight = lH + res.lines.length + this._padding;
      availableHeight -= this._titleHeight;
    }

    // Calculate Text Sizes
    this._lineData = this._data.map(function (d, i) {

      var label = this$1._label(d, i);

      var res = {
        data: d,
        i: i,
        id: this$1._id(d, i),
        shapeWidth: this$1._fetchConfig("width", d, i),
        shapeHeight: this$1._fetchConfig("height", d, i),
        y: 0
      };

      if (!label) {
        res.sentence = false;
        res.words = [];
        res.height = 0;
        res.width = 0;
        return res;
      }

      var f = this$1._fetchConfig("fontFamily", d, i),
            lh = this$1._fetchConfig("lineHeight", d, i),
            s = this$1._fetchConfig("fontSize", d, i);

      var h = availableHeight - (this$1._data.length + 1) * this$1._padding,
            w = this$1._width;

      res = Object.assign(res, d3plusText.textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(w)
        .height(h)
        (label));

      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": f, "font-size": s}); }))) + s * 0.75;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.f = f;
      res.s = s;
      res.lh = lh;

      return res;

    });

    var spaceNeeded;
    var availableWidth = this._width - this._padding * 2;
    spaceNeeded = this._rowWidth(this._lineData);

    if (this._direction === "column" || spaceNeeded > availableWidth) {
      var lines = 1, newRows = [];

      var maxLines = d3Array.max(this._lineData.map(function (d) { return d.words.length; }));
      this._wrapLines = function() {
        var this$1 = this;


        lines++;

        if (lines > maxLines) { return; }

        var wrappable = lines === 1 ? this._lineData.slice()
          : this._lineData.filter(function (d) { return d.width + d.shapeWidth + this$1._padding * (d.width ? 2 : 1) > availableWidth && d.words.length >= lines; })
              .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

        if (wrappable.length && availableHeight > wrappable[0].height * lines) {

          var truncated = false;
          var loop = function ( x ) {
            var label = wrappable[x];
            var h = label.og.height * lines, w = label.og.width * (1.5 * (1 / lines));
            var res = d3plusText.textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
            if (!res.truncated) {
              label.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.textWidth(t, {"font-family": label.f, "font-size": label.s}); }))) + label.s;
              label.height = res.lines.length * (label.lh + 1);
            }
            else {
              truncated = true;
              return 'break';
            }
          };

          for (var x = 0; x < wrappable.length; x++) {
            var returned = loop( x );

            if ( returned === 'break' ) break;
          }
          if (!truncated) { this._wrapRows(); }
        }
        else {
          newRows = [];
          return;
        }

      };

      this._wrapRows = function() {
        var this$1 = this;

        newRows = [];
        var row = 1, rowWidth = 0;
        for (var i = 0; i < this._lineData.length; i++) {
          var d = this$1._lineData[i],
                w = d.width + this$1._padding * (d.width ? 2 : 1) + d.shapeWidth;
          if (d3Array.sum(newRows.map(function (row) { return d3Array.max(row, function (d) { return d3Array.max([d.height, d.shapeHeight]); }); })) > availableHeight) {
            newRows = [];
            break;
          }
          if (w > availableWidth) {
            newRows = [];
            this$1._wrapLines();
            break;
          }
          else if (rowWidth + w < availableWidth) {
            rowWidth += w;
          }
          else if (this$1._direction !== "column") {
            rowWidth = w;
            row++;
          }
          if (!newRows[row - 1]) { newRows[row - 1] = []; }
          newRows[row - 1].push(d);
          if (this$1._direction === "column") {
            rowWidth = 0;
            row++;
          }
        }
      };

      this._wrapRows();

      if (!newRows.length || d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding > availableHeight) {
        spaceNeeded = d3Array.sum(this._lineData.map(function (d) { return d.shapeWidth + this$1._padding; })) - this._padding;
        for (var i = 0; i < this._lineData.length; i++) {
          this$1._lineData[i].width = 0;
          this$1._lineData[i].height = 0;
        }
        this._wrapRows();
      }

      if (newRows.length && d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding < availableHeight) {
        newRows.forEach(function (row, i) {
          row.forEach(function (d) {
            if (i) {
              d.y = d3Array.sum(newRows.slice(0, i), this$1._rowHeight.bind(this$1));
            }
          });
        });
        spaceNeeded = d3Array.max(newRows, this._rowWidth.bind(this));
      }
    }

    var innerHeight = d3Array.max(this._lineData, function (d, i) { return d3Array.max([d.height, this$1._fetchConfig("height", d.data, i)]) + d.y; }) + this._titleHeight,
          innerWidth = spaceNeeded;

    this._outerBounds.width = innerWidth;
    this._outerBounds.height = innerHeight;

    var xOffset = this._padding,
        yOffset = this._padding;
    if (this._align === "center") { xOffset = (this._width - innerWidth) / 2; }
    else if (this._align === "right") { xOffset = this._width - this._padding - innerWidth; }
    if (this._verticalAlign === "middle") { yOffset = (this._height - innerHeight) / 2; }
    else if (this._verticalAlign === "bottom") { yOffset = this._height - this._padding - innerHeight; }
    this._outerBounds.x = xOffset;
    this._outerBounds.y = yOffset;

    this._titleClass
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .select(this._group.node())
      .textAnchor({left: "start", center: "middle", right: "end"}[this._align])
      .width(this._width - this._padding * 2)
      .x(this._padding)
      .y(this._outerBounds.y)
      .config(this._titleConfig)
      .render();

    this._shapes = [];
    var baseConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "legend"),
          config = {
            id: function (d) { return d.id; },
            label: function (d) { return d.label; },
            lineHeight: function (d) { return d.lH; }
          };

    var data = this._data.map(function (d, i) {

      var obj = {
        __d3plus__: true,
        data: d, i: i,
        id: this$1._id(d, i),
        label: this$1._lineData[i].width ? this$1._label(d, i) : false,
        lH: this$1._fetchConfig("lineHeight", d, i),
        shape: this$1._shape(d, i)
      };

      return obj;

    });

    // Legend Shapes
    this._shapes = [];
    ["Circle", "Rect"].forEach(function (Shape) {

      this$1._shapes.push(new shapes[Shape]()
        .data(data.filter(function (d) { return d.shape === Shape; }))
        .duration(this$1._duration)
        .labelConfig({padding: 0})
        .select(this$1._group.node())
        .verticalAlign("top")
        .config(d3plusCommon.assign({}, baseConfig, config))
        .render());

    });

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.
      @param {Function} [*value*]
      @chainable
  */
  Legend.prototype.active = function active (_) {
    this._shapes.forEach(function (s) { return s.active(_); });
    return this;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  Legend.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Legend
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  Legend.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Legend
      @desc Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.
      @param {String} [*value* = "row"]
      @chainable
  */
  Legend.prototype.direction = function direction (_) {
    return arguments.length ? (this._direction = _, this) : this._direction;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  Legend.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  Legend.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.
      @param {Function} [*value*]
      @chainable
  */
  Legend.prototype.hover = function hover (_) {
    this._shapes.forEach(function (s) { return s.hover(_); });
    return this;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @chainable
      @example
function value(d) {
  return d.id;
}
  */
  Legend.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
      @chainable
  */
  Legend.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
  };

  /**
      @memberof Legend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Legend.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  Legend.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Legend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Legend.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
      @chainable
  */
  Legend.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
  };

  /**
      @memberof Legend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
      @chainable
  */
  Legend.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
      @chainable
  */
  Legend.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Legend.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = d3plusCommon.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
      @chainable
  */
  Legend.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  Legend.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Legend;
}(d3plusCommon.BaseClass));

exports.ckmeans = ckmeans;
exports.ColorScale = ColorScale;
exports.Legend = Legend;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-legend.js.map
