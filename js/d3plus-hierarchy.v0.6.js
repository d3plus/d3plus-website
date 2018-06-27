/*
  d3plus-hierarchy v0.6.3
  Nested, hierarchical, and cluster charts built on D3
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-shape'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3-collection'), require('d3-hierarchy'), require('d3-scale')) :
  typeof define === 'function' && define.amd ? define('d3plus-hierarchy', ['exports', 'd3-array', 'd3-shape', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3-collection', 'd3-hierarchy', 'd3-scale'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Shape,global.d3plusCommon,global.d3plusShape,global.d3plusViz,global.d3Collection,global.d3Hierarchy,global.d3Scale));
}(this, (function (exports,d3Array,d3Shape,d3plusCommon,d3plusShape,d3plusViz,d3Collection,d3Hierarchy,d3Scale) { 'use strict';

  /**
      @class Pie
      @extends Viz
      @desc Uses the [d3 pie layout](https://github.com/d3/d3-shape#pies) to creates SVG arcs based on an array of data.
  */
  var Pie = (function (Viz) {
    function Pie() {
      var this$1 = this;


      Viz.call(this);

      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        ariaLabel: function (d, i) { return this$1._pieData ? ((++this$1._pieData[i].index) + ". " + (this$1._drawLabel(d, i)) + ", " + (this$1._value(d, i)) + ".") : ""; },
        Path: {
          labelConfig: {
            fontResize: true
          }
        }
      });
      this._innerRadius = 0;
      this._padPixel = 0;
      this._pie = d3Shape.pie();
      this._sort = function (a, b) { return this$1._value(b) - this$1._value(a); };
      this._value = d3plusCommon.accessor("value");
    }

    if ( Viz ) Pie.__proto__ = Viz;
    Pie.prototype = Object.create( Viz && Viz.prototype );
    Pie.prototype.constructor = Pie;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Pie.prototype._draw = function _draw (callback) {
      var this$1 = this;


      Viz.prototype._draw.call(this, callback);

      var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

      var outerRadius = d3Array.min([width, height]) / 2;

      var pieData = this._pieData = this._pie
        .padAngle(this._padAngle || this._padPixel / outerRadius)
        .sort(this._sort)
        .value(this._value)
        (this._filteredData);

      pieData.forEach(function (d, i) {
        d.__d3plus__ = true;
        d.i = i;
      });

      var arcData = d3Shape.arc()
        .innerRadius(this._innerRadius)
        .outerRadius(outerRadius);

      var transform = "translate(" + (width / 2 + this._margin.left) + ", " + (height / 2 + this._margin.top) + ")";
      this._shapes.push(new d3plusShape.Path()
        .data(pieData)
        .d(arcData)
        .select(d3plusCommon.elem("g.d3plus-Pie", {
          parent: this._select,
          enter: {transform: transform},
          update: {transform: transform}
        }).node())
        .config({
          id: function (d) { return this$1._ids(d).join("-"); },
          x: 0,
          y: 0
        })
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .render());

      return this;
    };

    /**
        @memberof Pie
        @desc If *value* is specified, sets the inner radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current inner radius accessor.
        @param {Function|Number} [*value*]
    */
    Pie.prototype.innerRadius = function innerRadius (_) {
      return arguments.length ? (this._innerRadius = _, this) : this._innerRadius;
    };

    /**
        @memberof Pie
        @desc If *value* is specified, sets the arc padding to the specified radian value and returns the current class instance. If *value* is not specified, returns the current radian padding.
        @param {Number} [*value*]
    */
    Pie.prototype.padAngle = function padAngle (_) {
      return arguments.length ? (this._padAngle = _, this) : this._padAngle;
    };

    /**
        @memberof Pie
        @desc If *value* is specified, sets the arc padding to the specified pixel value and returns the current class instance. If *value* is not specified, returns the current pixel padding.
        @param {Number} [*value*]
    */
    Pie.prototype.padPixel = function padPixel (_) {
      return arguments.length ? (this._padPixel = _, this) : this._padPixel;
    };

    /**
        @memberof Pie
        @desc If *comparator* is specified, sets the sort order for the pie slices using the specified comparator function. If *comparator* is not specified, returns the current sort order, which defaults to descending order by the associated input data's numeric value attribute.
        @param {Array} [*comparator*]
        @example
  function comparator(a, b) {
    return b.value - a.value;
  }
    */
    Pie.prototype.sort = function sort (_) {
      return arguments.length ? (this._sort = _, this) : this._sort;
    };

    /**
        @memberof Pie
        @desc If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.
        @param {Function|String} *value*
        @example
  function value(d) {
    return d.value;
  }
    */
    Pie.prototype.value = function value (_) {
      return arguments.length ? (this._value = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._value;
    };

    return Pie;
  }(d3plusViz.Viz));

  /**
      @class Donut
      @extends Pie
      @desc Extends the Pie visualization to create a donut chart.
  */
  var Donut = (function (Pie$$1) {
    function Donut() {
      var this$1 = this;


      Pie$$1.call(this);

      this._innerRadius = function () { return d3Array.min([
        this$1._width - this$1._margin.left - this$1._margin.right,
        this$1._height - this$1._margin.top - this$1._margin.bottom
      ]) / 4; };
      this._padPixel = 2;

    }

    if ( Pie$$1 ) Donut.__proto__ = Pie$$1;
    Donut.prototype = Object.create( Pie$$1 && Pie$$1.prototype );
    Donut.prototype.constructor = Donut;

    return Donut;
  }(Pie));

  /**
      @function nest
      @summary Extends the base behavior of d3.nest to allow for multiple depth levels.
      @param {Array} *data* The data array to be nested.
      @param {Array} *keys* An array of key accessors that signify each nest level.
  */
  function nest(data, keys) {

    if (!(keys instanceof Array)) { keys = [keys]; }

    var dataNest = d3Collection.nest();
    for (var i = 0; i < keys.length; i++) { dataNest.key(keys[i]); }
    var nestedData = dataNest.entries(data);

    return bubble(nestedData);

  }

  /**
      Bubbles up values that do not nest to the furthest key.
      @param {Array} *values* The "values" of a nest object.
      @private
  */
  function bubble(values) {

    return values.map(function (d) {

      if (d.key && d.values) {
        if (d.values[0].key === "undefined") { return d.values[0].values[0]; }
        else { d.values = bubble(d.values); }
      }

      return d;

    });

  }

  /**
      @class Tree
      @extends Viz
      @desc Uses d3's [tree layout](https://github.com/d3/d3-hierarchy#tree) to create a tidy tree chart based on an array of data.
  */
  var Tree = (function (Viz) {
    function Tree() {
      var this$1 = this;


      Viz.call(this);

      this._orient = "vertical";
      this._separation = function (a, b) { return a.parent === b.parent ? 1 : 2; };

      this._shape = d3plusCommon.constant("Circle");
      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        ariaLabel: function (d, i) { return this$1._treeData ? ((this$1._treeData[i].depth) + ". " + (this$1._drawLabel(d, i)) + ".") : ""; },
        labelConfig: {
          fontColor: "#444"
        },
        Path: {
          fill: "none",
          stroke: "#ccc",
          strokeWidth: 1
        },
        r: d3plusCommon.constant(5),
        width: d3plusCommon.constant(10),
        height: d3plusCommon.constant(10)
      });

      this._tree = d3Hierarchy.tree();

    }

    if ( Viz ) Tree.__proto__ = Viz;
    Tree.prototype = Object.create( Viz && Viz.prototype );
    Tree.prototype.constructor = Tree;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Tree.prototype._draw = function _draw (callback) {
      var this$1 = this;


      Viz.prototype._draw.call(this, callback);

      var height = this._orient === "vertical"
              ? this._height - this._margin.top - this._margin.bottom
              : this._width - this._margin.left - this._margin.right,
            left = this._orient === "vertical" ? "left" : "top",
            that = this,
            transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")",
            width = this._orient === "horizontal"
              ? this._height - this._margin.top - this._margin.bottom
              : this._width - this._margin.left - this._margin.right;

      var treeData = this._treeData = this._tree
        .separation(this._separation)
        .size([width, height])
        (d3Hierarchy.hierarchy({
          key: "root",
          values: nest(this._filteredData, this._groupBy.slice(0, this._drawDepth + 1))
        }, function (d) { return d.key && d.values ? d.values : null; }).sort(this._sort))
        .descendants()
        .filter(function (d) { return d.depth <= this$1._groupBy.length && d.parent; });

      /**
          Merges the values of a given nest branch.
          @private
      */
      function flattenBranchData(branch) {
        return d3plusCommon.merge(branch.values.map(function (l) { return l.key && l.values ? flattenBranchData(l) : l; }), that._aggs);
      }

      treeData.forEach(function (d, i) {
        if (d.data.key && d.data.values) { d.data = flattenBranchData(d.data); }
        d.__d3plus__ = true;
        d.i = i;
      });

      var r = this._shapeConfig.r;
      if (typeof r !== "function") { r = d3plusCommon.constant(r); }
      var rBufferRoot = d3Array.max(treeData, function (d) { return d.depth === 1 ? r(d.data, d.i) : 0; });
      var rBufferEnd = d3Array.max(treeData, function (d) { return d.children ? 0 : r(d.data, d.i); });

      var yExtent = d3Array.extent(treeData, function (d) { return d.y; });
      this._labelHeight = d3Array.min([
        this._orient === "vertical" ? 50 : 100,
        (yExtent[1] - rBufferRoot - rBufferEnd) / (this._groupBy.length + 1)
      ]);

      this._labelWidths = nest(treeData, function (d) { return d.depth; })
        .map(function (d) { return d.values.reduce(function (num, v, i) {
          var next = i < d.values.length - 1 ? d.values[i + 1].x : width + this$1._margin[left],
                prev = i ? d.values[i - 1].x : this$1._margin[left];
          return d3Array.min([num, next - v.x, v.x - prev]);
        }, width); });

      var yScale = d3Scale.scaleLinear()
        .domain(yExtent)
        .range([rBufferRoot + this._labelHeight, height - rBufferEnd - this._labelHeight]);

      treeData.forEach(function (d) {
        var val = yScale(d.y);
        if (this$1._orient === "horizontal") {
          d.y = d.x;
          d.x = val;
        }
        else { d.y = val; }
      });

      var elemObject = {parent: this._select, enter: {transform: transform}, update: {transform: transform}};

      this._shapes.push(new d3plusShape.Path()
        .data(treeData.filter(function (d) { return d.depth > 1; }))
        .select(d3plusCommon.elem("g.d3plus-Tree-Links", elemObject).node())
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path"))
        .config({
          d: function (d) {

            var r = this$1._shapeConfig.r;

            if (typeof r === "function") { r = r(d.data, d.i); }

            var px = d.parent.x - d.x + (this$1._orient === "vertical" ? 0 : r),
                  py = d.parent.y - d.y + (this$1._orient === "vertical" ? r : 0),
                  x = this$1._orient === "vertical" ? 0 : -r,
                  y = this$1._orient === "vertical" ? -r : 0;

            return this$1._orient === "vertical"
              ? ("M" + x + "," + y + "C" + x + "," + ((y + py) / 2) + " " + px + "," + ((y + py) / 2) + " " + px + "," + py)
              : ("M" + x + "," + y + "C" + ((x + px) / 2) + "," + y + " " + ((x + px) / 2) + "," + py + " " + px + "," + py);

          },
          id: function (d, i) { return this$1._ids(d, i).join("-"); }
        })
        .render());

      this._shapes.push(new d3plusShape.Circle()
        .data(treeData)
        .select(d3plusCommon.elem("g.d3plus-Tree-Shapes", elemObject).node())
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
        .config({
          id: function (d, i) { return this$1._ids(d, i).join("-"); },
          label: function (d, i) {
            if (this$1._label) { return this$1._label(d.data, i); }
            var ids = this$1._ids(d, i).slice(0, d.depth);
            return ids[ids.length - 1];
          },
          labelConfig: {
            textAnchor: function (d) { return this$1._orient === "vertical" ? "middle"
            : d.data.children && d.data.depth !== this$1._groupBy.length ? "end" : "start"; },
            verticalAlign: function (d) { return this$1._orient === "vertical" ? d.data.depth === 1 ? "bottom" : "top" : "middle"; }
          },
          hitArea: function (d, i, s) {

            var h = this$1._labelHeight,
                  w = this$1._labelWidths[d.depth - 1];

            return {
              width: this$1._orient === "vertical" ? w : s.r * 2 + w,
              height: this$1._orient === "horizontal" ? h : s.r * 2 + h,
              x: this$1._orient === "vertical" ? -w / 2 : d.children && d.depth !== this$1._groupBy.length ? -(s.r + w) : -s.r,
              y: this$1._orient === "horizontal" ? -h / 2 : d.children && d.depth !== this$1._groupBy.length ? -(s.r + this$1._labelHeight) : -s.r
            };

          },
          labelBounds: function (d, i, s) {
            var obj;


            var h = this$1._labelHeight,
                  height = this$1._orient === "vertical" ? "height" : "width",
                  w = this$1._labelWidths[d.depth - 1],
                  width = this$1._orient === "vertical" ? "width" : "height",
                  x = this$1._orient === "vertical" ? "x" : "y",
                  y = this$1._orient === "vertical" ? "y" : "x";

            return ( obj = {}, obj[width] = w, obj[height] = h, obj[x] = -w / 2, obj[y] = d.children && d.depth !== this$1._groupBy.length ? -(s.r + h) : s.r, obj);

          }
        })
        .render());

      return this;

    };

    /**
        @memberof Tree
        @desc If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.
        @param {String} [*value* = "vertical"] Accepts either "vertical" or "horizontal".
    */
    Tree.prototype.orient = function orient (_) {
      return arguments.length ? (this._orient = _, this) : this._orient;
    };

    /**
        @memberof Tree
        @desc If *value* is specified, sets the separation accessor to the specified function. If *value* is not specified, returns the current separation accessor.

  From the [d3-hierarchy documentation](https://github.com/d3/d3-hierarchy#tree_separation):
  > The separation accessor is used to separate neighboring nodes. The separation function is passed two nodes a and b, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.
        @param {Function} [*value*]
        @example
  function separation(a, b) {
    return a.parent === b.parent ? 1 : 2;
  }
    */
    Tree.prototype.separation = function separation (_) {
      return arguments.length ? (this._separation = _, this) : this._separation;
    };

    return Tree;
  }(d3plusViz.Viz));

  /**
      @class Treemap
      @extends Viz
      @desc Uses the [d3 treemap layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-hierarchy/getting-started/) for help getting started using the treemap generator.
  */
  var Treemap = (function (Viz) {
    function Treemap() {
      var this$1 = this;


      Viz.call(this);

      this._layoutPadding = 1;
      this._shapeConfig = d3plusCommon.assign({}, this._shapeConfig, {
        ariaLabel: function (d, i) {
          var rank = this$1._rankData ? ((this$1._rankData.indexOf(d) + 1) + ". ") : "";
          return ("" + rank + (this$1._drawLabel(d, i)) + ", " + (this$1._sum(d, i)) + ".");
        },
        labelConfig: {
          fontMax: 20,
          fontResize: true,
          padding: 15
        }
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
        @memberof Treemap
        @desc Extends the draw behavior of the abstract Viz class.
        @private
    */
    Treemap.prototype._draw = function _draw (callback) {
      var this$1 = this;


      Viz.prototype._draw.call(this, callback);
      
      var nestedData = d3Collection.nest();
      for (var i = 0; i <= this._drawDepth; i++) { nestedData.key(this$1._groupBy[i]); }
      nestedData = nestedData.entries(this._filteredData);

      var tmapData = this._treemap
        .padding(this._layoutPadding)
        .size([
          this._width - this._margin.left - this._margin.right,
          this._height - this._margin.top - this._margin.bottom
        ])
        .tile(this._tile)
        (d3Hierarchy.hierarchy({values: nestedData}, function (d) { return d.values; }).sum(this._sum).sort(this._sort));

      var shapeData = [], that = this;

      /**
          @memberof Treemap
          @desc Flattens and merges treemap data.
          @private
      */
      function extractLayout(children) {
        for (var i = 0; i < children.length; i++) {
          var node = children[i];
          if (node.depth <= that._drawDepth) { extractLayout(node.children); }
          else {
            node.__d3plus__ = true;
            node.id = node.data.key;
            node.i = node.data.values.length === 1 && that._filteredData.includes(node.data.values[0]) ? that._filteredData.indexOf(node.data.values[0]) : undefined;
            node.data = d3plusCommon.merge(node.data.values);
            node.x = node.x0 + (node.x1 - node.x0) / 2;
            node.y = node.y0 + (node.y1 - node.y0) / 2;
            shapeData.push(node);
          }
        }
      }
      if (tmapData.children) { extractLayout(tmapData.children); }

      this._rankData = shapeData.sort(this._sort).map(function (d) { return d.data; });
      var total = tmapData.value;

      var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")";
      this._shapes.push(new d3plusShape.Rect()
        .data(shapeData)
        .label(function (d) { return [
          this$1._drawLabel(d.data, d.i),
          ((Math.round(this$1._sum(d.data, d.i) / total * 100)) + "%")
        ]; })
        .select(d3plusCommon.elem("g.d3plus-Treemap", {
          parent: this._select,
          enter: {transform: transform},
          update: {transform: transform}
        }).node())
        .config({
          height: function (d) { return d.y1 - d.y0; },
          labelBounds: function (d, i, s) {
            var h = s.height;
            var sh = Math.min(50, h * 0.25);
            return [
              {width: s.width, height: h - sh, x: -s.width / 2, y: -h / 2},
              {width: s.width, height: sh, x: -s.width / 2, y: h / 2 - sh}
            ];
          },
          labelConfig: {
            textAnchor: function (d) { return d.l ? "middle" : "start"; },
            verticalAlign: function (d) { return d.l ? "bottom" : "top"; }
          },
          width: function (d) { return d.x1 - d.x0; }
        })
        .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Rect"))
        .render());

      return this;

    };

    /**
        @memberof Treemap
        @desc If *value* is specified, sets the inner and outer padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current padding accessor.
        @param {Function|Number} [*value*]
    */
    Treemap.prototype.layoutPadding = function layoutPadding (_) {
      return arguments.length ? (this._layoutPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._layoutPadding;
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
      return arguments.length ? (this._sum = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._sum;
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

  exports.Donut = Donut;
  exports.Pie = Pie;
  exports.Tree = Tree;
  exports.Treemap = Treemap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-hierarchy.js.map
