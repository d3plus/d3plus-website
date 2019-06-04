/*
  d3plus-hierarchy v0.8.5
  Nested, hierarchical, and cluster charts built on D3
  Copyright (c) 2019 D3plus - https://d3plus.org
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

if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function(search, start) {
      if (typeof start !== 'number') {
        start = 0
      }

      if (start + search.length > this.length) {
        return false
      } else {
        return this.indexOf(search, start) !== -1
      }
    }
  })
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, pos) {
          pos = !pos || pos < 0 ? 0 : +pos;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

if (typeof window !== "undefined") {
  (function () {
    var serializeXML = function (node, output) {
      var nodeType = node.nodeType;
      if (nodeType === 3) {
        output.push(node.textContent.replace(/&/, '&amp;').replace(/</, '&lt;').replace('>', '&gt;'));
      } else if (nodeType === 1) {
        output.push('<', node.tagName);
        if (node.hasAttributes()) {
          [].forEach.call(node.attributes, function(attrNode){
            output.push(' ', attrNode.item.name, '=\'', attrNode.item.value, '\'');
          })
        }
        if (node.hasChildNodes()) {
          output.push('>');
          [].forEach.call(node.childNodes, function(childNode){
            serializeXML(childNode, output);
          })
          output.push('</', node.tagName, '>');
        } else {
          output.push('/>');
        }
      } else if (nodeType == 8) {
        output.push('<!--', node.nodeValue, '-->');
      }
    }

    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
      get: function () {
        var output = [];
        var childNode = this.firstChild;
        while (childNode) {
          serializeXML(childNode, output);
          childNode = childNode.nextSibling;
        }
        return output.join('');
      },
      set: function (markupText) {
        while (this.firstChild) {
          this.removeChild(this.firstChild);
        }

        try {
          var dXML = new DOMParser();
          dXML.async = false;

          var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markupText + '</svg>';
          var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;

          var childNode = svgDocElement.firstChild;
          while (childNode) {
            this.appendChild(this.ownerDocument.importNode(childNode, true));
            childNode = childNode.nextSibling;
          }
        } catch (e) {};
      }
    });

    Object.defineProperty(SVGElement.prototype, 'innerSVG', {
      get: function () {
        return this.innerHTML;
      },
      set: function (markup) {
        this.innerHTML = markup;
      }
    });

  })();
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-shape'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3-collection'), require('d3-hierarchy'), require('d3-scale'), require('d3plus-format')) :
  typeof define === 'function' && define.amd ? define('d3plus-hierarchy', ['exports', 'd3-array', 'd3-shape', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3-collection', 'd3-hierarchy', 'd3-scale', 'd3plus-format'], factory) :
  (factory((global.d3plus = {}),global.d3Array,global.d3Shape,global.d3plusCommon,global.d3plusShape,global.d3plusViz,global.d3Collection,global.d3Hierarchy,global.d3Scale,global.d3plusFormat));
}(this, (function (exports,d3Array,d3Shape,d3plusCommon,d3plusShape,d3plusViz,d3Collection,d3Hierarchy,d3Scale,d3plusFormat) { 'use strict';

  /**
      @class Pie
      @extends Viz
      @desc Uses the [d3 pie layout](https://github.com/d3/d3-shape#pies) to creates SVG arcs based on an array of data.
  */
  var Pie = /*@__PURE__*/(function (Viz) {
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
      this._legendSort = function (a, b) { return this$1._value(b) - this$1._value(a); };
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
        .label(this._drawLabel)
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
  var Donut = /*@__PURE__*/(function (Pie$$1) {
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
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */

  var recursionCircles = function (d, arr) {
    if ( arr === void 0 ) arr = [];

    if (d.values) {
      d.values.forEach(function (h) {
        arr.push(h);
        recursionCircles(h, arr);
      });
    }
    else {
      arr.push(d);
    }
    return arr;
  };

  /**
      @class Pack
      @extends Viz
      @desc Uses the [d3 pack layout](https://github.com/d3/d3-hierarchy#pack) to creates Circle Packing chart based on an array of data.
  */
  var Pack = /*@__PURE__*/(function (Viz) {
    function Pack() {
      var this$1 = this;


      Viz.call(this);

      this._layoutPadding = 1;
      this._on.mouseenter = function () {};

      var defaultMouseMoveLegend = this._on["mousemove.legend"];
      this._on["mousemove.legend"] = function (d, i) {
        defaultMouseMoveLegend(d, i);

        var ids = this$1._ids(d, i);
        var hoverData = recursionCircles(d);

        this$1.hover(function (h) {
          var hover = Object.keys(h).filter(function (key) { return key !== "value"; }).every(function (key) { return d[key] && d[key].includes(h[key]); });

          if (hover) { hoverData.push(h); }
          else if (ids.includes(h.key)) { hoverData.push.apply(hoverData, recursionCircles(h, [h])); }

          return hoverData.includes(h);
        });

      };
      var defaultMouseMoveShape = this._on["mousemove.shape"];
      this._on["mousemove.shape"] = function (d, i) {
        if (d.__d3plusTooltip__) { defaultMouseMoveShape(d, i); }
        this$1.hover(function (h) { return recursionCircles(d, [d]).includes(h); });
      };
      this._pack = d3Hierarchy.pack();
      this._packOpacity = d3plusCommon.constant(0.25);
      this._shape = d3plusCommon.constant("Circle");
      this._shapeConfig = d3plusCommon.assign(this._shapeConfig, {
        Circle: {
          label: function (d) { return d.parent && !d.children ? d.id : false; },
          labelConfig: {
            fontResize: true
          },
          opacity: function (d) { return d.__d3plusOpacity__; }
        }
      });
      this._sort = function (a, b) { return b.value - a.value; };
      this._sum = d3plusCommon.accessor("value");

    }

    if ( Viz ) Pack.__proto__ = Viz;
    Pack.prototype = Object.create( Viz && Viz.prototype );
    Pack.prototype.constructor = Pack;

    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */
    Pack.prototype._draw = function _draw (callback) {
      var this$1 = this;

      Viz.prototype._draw.call(this, callback);

      var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

      var diameter = Math.min(height, width);
      var transform = "translate(" + ((width - diameter) / 2) + ", " + ((height - diameter) / 2) + ")";

      var nestedData = d3Collection.nest();
      for (var i = 0; i <= this._drawDepth; i++) { nestedData.key(this._groupBy[i]); }
      nestedData = nestedData.entries(this._filteredData);

      var packData = this._pack
        .padding(this._layoutPadding)
        .size([diameter, diameter])
        (d3Hierarchy.hierarchy({key: nestedData.key, values: nestedData}, function (d) { return d.values; }).sum(this._sum).sort(this._sort))
        .descendants();

      packData.forEach(function (d, i) {
        d.__d3plus__ = true;
        d.i = i;
        d.id = d.parent ? d.parent.data.key : null;
        d.data.__d3plusOpacity__ = d.height ? this$1._packOpacity(d.data, i) : 1;
        d.data.__d3plusTooltip__ = !d.height ? true : false;
      });

      this._shapes.push(
        new d3plusShape.Circle()
          .data(packData)
          .select(
            d3plusCommon.elem("g.d3plus-Pack", {
              parent: this._select,
              enter: {transform: transform},
              update: {transform: transform}
            }).node()
          )
          .config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle"))
          .render()
      );

      return this;
    };

    /**
        @memberof Pack
        @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
        @param {Function} [*value*]
        @chainable
     */
    Pack.prototype.hover = function hover (_) {
      this._hover = _;
      this._shapes.forEach(function (s) { return s.hover(_); });

      if (this._legend) { this._legendClass.hover(_); }
      return this;
    };

    /**
        @memberof Pack
        @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.
        @param {Function|Number} [*value*]
    */
    Pack.prototype.layoutPadding = function layoutPadding (_) {
      return arguments.length ? (this._layoutPadding = _, this) : this._layoutPadding;
    };

    /**
        @memberof Pack
        @desc If *value* is specified, sets the padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.
        @param {Function|Number} [*value*]
    */
    Pack.prototype.packOpacity = function packOpacity (_) {
      return arguments.length ? (this._packOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._packOpacity;
    };

    /**
        @memberof Pack
        @desc If *comparator* is specified, sets the sort order for the pack using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
        @param {Array} [*comparator*]
        @example
  function comparator(a, b) {
    return b.value - a.value;
  }
    */
    Pack.prototype.sort = function sort (_) {
      return arguments.length ? (this._sort = _, this) : this._sort;
    };


    /**
        @memberof Pack
        @desc If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.
        @param {Function|Number} [*value*]
        @example
  function sum(d) {
    return d.sum;
  }
    */
    Pack.prototype.sum = function sum (_) {
      return arguments.length ? (this._sum = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._sum;
    };

    return Pack;
  }(d3plusViz.Viz));

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
  var Tree = /*@__PURE__*/(function (Viz) {
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

            return ( obj = {}, obj[width] = w, obj[height] = h, obj[x] = -w / 2, obj[y] = d.children && d.depth !== this$1._groupBy.length ? -(s.r + h) : s.r, obj );

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
  var Treemap = /*@__PURE__*/(function (Viz) {
    function Treemap() {
      var this$1 = this;


      Viz.call(this);

      this._layoutPadding = 1;
      this._legendSort = function (a, b) { return this$1._sum(b) - this$1._sum(a); };
      this._shapeConfig = d3plusCommon.assign({}, this._shapeConfig, {
        ariaLabel: function (d, i) {
          var rank = this$1._rankData ? ((this$1._rankData.indexOf(d) + 1) + ". ") : "";
          return ("" + rank + (this$1._drawLabel(d, i)) + ", " + (this$1._sum(d, i)) + ".");
        },
        labelConfig: {
          fontMax: 20,
          fontMin: 8,
          fontResize: true,
          padding: 5
        }
      });
      this._sort = function (a, b) {
        var aggA = isAggregated(a);
        var aggB = isAggregated(b);
        return aggA && !aggB ? 1 : !aggA && aggB ? -1 : b.value - a.value;
      };
      this._sum = d3plusCommon.accessor("value");
      this._thresholdKey = this._sum;
      this._tile = d3Hierarchy.treemapSquarify;
      this._tooltipConfig = d3plusCommon.assign({}, this._tooltipConfig, {
        tbody: [
          ["Share", function (d, i, x) { return ((d3plusFormat.formatAbbreviate(x.share * 100, this$1._locale)) + "%"); }]
        ]
      });
      this._treemap = d3Hierarchy.treemap().round(true);

      var isAggregated = function (leaf) { return leaf.children && leaf.children.length === 1 && leaf.children[0].data._isAggregation; };

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
      for (var i = 0; i <= this._drawDepth; i++) { nestedData.key(this._groupBy[i]); }
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
            var index = node.data.values.length === 1 ? that._filteredData.indexOf(node.data.values[0]) : undefined;
            node.__d3plus__ = true;
            node.id = node.data.key;
            node.i = index > -1 ? index : undefined;
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
      shapeData.forEach(function (d) {
        d.share = this$1._sum(d.data, d.i) / total;
      });

      var transform = "translate(" + (this._margin.left) + ", " + (this._margin.top) + ")";
      var rectConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Rect");
      var fontMin = rectConfig.labelConfig.fontMin;
      var padding = rectConfig.labelConfig.padding;

      this._shapes.push(new d3plusShape.Rect()
        .data(shapeData)
        .label(function (d) { return [
          this$1._drawLabel(d.data, d.i),
          ((d3plusFormat.formatAbbreviate(d.share * 100, this$1._locale)) + "%")
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
            var sh = Math.min(50, (h - padding * 2) * 0.5);
            if (sh < fontMin) { sh = 0; }
            return [
              {width: s.width, height: h - sh, x: -s.width / 2, y: -h / 2},
              {width: s.width, height: sh + padding * 2, x: -s.width / 2, y: h / 2 - sh - padding * 2}
            ];
          },
          labelConfig: {
            textAnchor: function (d, i, x) {
              var line, parent = x;
              while (typeof line === "undefined" && parent) {
                if (typeof parent.l !== "undefined") { line = parent.l; }
                parent = parent.__d3plusParent__;
              }
              return line ? "middle" : "start";
            },
            verticalAlign: function (d, i, x) {
              var line, parent = x;
              while (typeof line === "undefined" && parent) {
                if (typeof parent.l !== "undefined") { line = parent.l; }
                parent = parent.__d3plusParent__;
              }
              return line ? "bottom" : "top";
            }
          },
          width: function (d) { return d.x1 - d.x0; }
        })
        .config(rectConfig)
        .render());

      return this;

    };

    /**
     * Applies the threshold algorithm for Treemaps.
     * @param {Array} data The data to process.
     */
    Treemap.prototype._thresholdFunction = function _thresholdFunction (data, tree) {
      var aggs = this._aggs;
      var drawDepth = this._drawDepth;
      var groupBy = this._groupBy;
      var threshold = this._threshold;
      var thresholdKey = this._thresholdKey;

      if (threshold && thresholdKey) {
        var finalDataset = data.slice();
        var totalSum = d3Array.sum(finalDataset, this._thresholdKey);

        var n = tree.length;
        while (n--) {
          var branch = tree[n];
          thresholdByDepth(finalDataset, totalSum, data, branch, 0);
        }

        return finalDataset;
      }

      /**
       * @memberof Treemap
       * @desc Explores the data tree recursively and merges elements under the indicated threshold.
       * @param {object[]} finalDataset The array of data that will be returned after modifications.
       * @param {number} totalSum The total sum of the values in the initial dataset.
       * @param {object[]} currentDataset The current subset of the dataset to work on.
       * @param {object} branch The branch of the dataset tree to explore.
       * @param {number} depth The depth of the current branch.
       * @private
       */
      function thresholdByDepth(finalDataset, totalSum, currentDataset, branch, depth) {
        if (depth >= drawDepth) { return; }

        var currentAccesor = groupBy[depth];
        var nextDataset = currentDataset.filter(
          function (item) { return currentAccesor(item) === branch.key; }
        );

        if (depth + 1 === drawDepth) {
          var removedItems = [];
          var thresholdPercent = Math.min(1, Math.max(0, threshold(nextDataset)));

          if (!isFinite(thresholdPercent) || isNaN(thresholdPercent)) { return; }

          var thresholdValue = thresholdPercent * totalSum;

          var n = nextDataset.length;
          while (n--) {
            var item = nextDataset[n];
            if (thresholdKey(item) < thresholdValue) {
              var index = finalDataset.indexOf(item);
              finalDataset.splice(index, 1);
              removedItems.push(item);
            }
          }

          if (removedItems.length > 0) {
            var mergedItem = d3plusCommon.merge(removedItems, aggs);
            mergedItem._isAggregation = true;
            mergedItem._threshold = thresholdPercent;
            finalDataset.push(mergedItem);
          }
        }
        else {
          var leaves = branch.values;
          var n$1 = leaves.length;
          while (n$1--) {
            thresholdByDepth(finalDataset, totalSum, nextDataset, leaves[n$1], depth + 1);
          }
        }
      }

      return data;
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
      if (arguments.length) {
        this._sum = typeof _ === "function" ? _ : d3plusCommon.accessor(_);
        this._thresholdKey = this._sum;
        return this;
      }
      else { return this._sum; }
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
  exports.Pack = Pack;
  exports.Pie = Pie;
  exports.Tree = Tree;
  exports.Treemap = Treemap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-hierarchy.js.map
