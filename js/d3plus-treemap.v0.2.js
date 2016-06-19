(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-color'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-legend'), require('d3-collection'), require('d3-hierarchy'), require('d3-selection')) :
	typeof define === 'function' && define.amd ? define('d3plus-treemap', ['exports', 'd3plus-color', 'd3plus-common', 'd3plus-shape', 'd3plus-legend', 'd3-collection', 'd3-hierarchy', 'd3-selection'], factory) :
	(factory((global.d3plus_treemap = global.d3plus_treemap || {}),global.d3plus_color,global.d3plus_common,global.d3plus_shape,global.d3plus_legend,global.d3_collection,global.d3_hierarchy,global.d3_selection));
}(this, function (exports,d3plusColor,d3plusCommon,d3plusShape,d3plusLegend,d3Collection,d3Hierarchy,d3Selection) { 'use strict';

	var version = "0.2.0";

	/**
	    @function layout
	    @desc Uses the [d3 layout layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#layout.data) method.
	    @param {Array} [data = []]
	    @example <caption>using default key accessors</caption>
	var data = [
	  {"id": 0, "value": 100},
	  {"id": 1, "value": 50}
	];

	layout(data);
	@example <caption>using non-default key accessors</caption>
	var data = [
	  {"name": 0, "value": 20},
	  {"name": 1, "value": 10}
	];

	layout()
	  .id(function(d) {
	    return d.name;
	  })
	  .value(function(d) {
	    return d.value * 5;
	  })();
	*/
	function layout(data) {

	  /**
	  The default value accessor function.
	  @private
	  */
	  if ( data === void 0 ) data = [];

	  function layoutSort(a, b) {
	    return b.height - a.height || sum(b.data) - sum(a.data);
	  }

	  var shapes = d3plusShape.rect()
	          .height(function (d) { return d.y1 - d.y0; })
	          .width(function (d) { return d.x1 - d.x0; })
	          .x(function (d) { return d.x0 + (d.x1 - d.x0) / 2; })
	          .y(function (d) { return d.y0 + (d.y1 - d.y0) / 2; });

	  var duration = 600,
	      fill,
	      groupBy = [d3plusCommon.accessor("id")],
	      id,
	      label,
	      labelPadding = d3plusCommon.constant(5),
	      labelResize = d3plusCommon.constant(true),
	      legend = true,
	      select,
	      size,
	      sort = layoutSort,
	      sum = d3plusCommon.accessor("value");

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function layout(callback) {

	    if (select === void 0) {
	      layout.size(d3plusCommon.getSize(d3Selection.select("body").node()));
	      layout.select(d3Selection.select("body").append("svg").style("width", ((size[0]) + "px")).style("height", ((size[1]) + "px")).style("display", "block").node());
	    }
	    else if (size === void 0) layout.size(d3plusCommon.getSize(select.node()));

	    id = groupBy[groupBy.length - 1];
	    var drawLabel = label || id;
	    var drawFill = fill || function(d, i) {
	      return d3plusColor.assign(id(d, i));
	    };

	    var legendData = d3plusCommon.colorNest(data, drawFill, groupBy);

	    var legendGroup = select.selectAll("g.d3plus-treemap-legend")
	      .data(legend ? [0] : []);

	    legendGroup = legendGroup.enter().append("g")
	        .attr("class", "d3plus-treemap-legend")
	        .attr("transform", ("translate(0," + (size[1] / 2) + ")"))
	      .merge(legendGroup);

	    legendGroup.transition().duration(duration)
	      .attr("transform", ("translate(0," + (size[1] / 2) + ")"));

	    var legendGen = d3plusLegend.shape()
	      .duration(duration)
	      .data(legendData.data)
	      .fill(drawFill)
	      .id(legendData.id)
	      .height(size[1] / 2)
	      .label(legendData.id)
	      .select(legendGroup.node())
	      .verticalAlign("bottom")
	      .width(size[0])
	      ();

	    var tmapHeight = size[1] - legendGen.outerBounds().height - legendGen.padding() * 4;

	    var nestedData = d3Collection.nest();
	    for (var i = 0; i < groupBy.length; i++) nestedData.key(groupBy[i]);
	    nestedData = nestedData.entries(data);

	    var tmapData = d3Hierarchy.treemap()
	      .round(true)
	      .size([size[0], tmapHeight])
	      (d3Hierarchy.hierarchy({"values": nestedData}, function (d) { return d.values; }).sort(layoutSort).sum(sum))
	      .children;

	    var shapeData = [];

	    /**
	    Flattens and merge treemap data.
	    @private
	    */
	    function extractLayout(children) {
	      for (var i = 0; i < children.length; i++) {
	        var node = children[i];
	        if (node.depth < groupBy.length) extractLayout(node.children);
	        else {
	          node.id = groupBy.length + node.data.key;
	          node.data = d3plusCommon.merge(node.data.values);
	          shapeData.push(node);
	        }
	      }
	    }
	    if (tmapData) extractLayout(tmapData);

	    var shapeGroup = select.selectAll("g.d3plus-treemap-shapes").data([0]);

	    shapeGroup = shapeGroup.enter().append("g")
	      .attr("class", "d3plus-treemap-shapes")
	      .merge(shapeGroup);

	    shapes
	      .data(shapeData)
	      .duration(duration)
	      .fill(function (d, i) { return drawFill(d.data, i); })
	      .fontResize(function (d, i) { return labelResize(d.data, i); })
	      .label(function (d, i) { return drawLabel(d.data, i); })
	      .labelPadding(function (d, i) { return labelPadding(d.data, i); })
	      .select(shapeGroup.node())
	      ();

	    if (callback) setTimeout(callback, duration + 100);

	    return layout;

	  }

	  /**
	      @memberof layout
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
	      @param {Array} [*data* = []]
	  */
	  layout.data = function(_) {
	    return arguments.length ? (data = _, layout) : data;
	  };

	  /**
	      @memberof layout
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  layout.duration = function(_) {
	    return arguments.length ? (duration = _, layout) : duration;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor. By default, colors are assigned using the [d3plus-color assign](https://github.com/d3plus/d3plus-color/#assign) function based on each data point's unique id.
	      @param {Function|String} [*value*]
	      @example
	function value(d) {
	  return d3plus_color.assign(d.id);
	}
	  */
	  layout.fill = function(_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), layout) : fill;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns this generator. If *value* is not specified, returns the current group accessor.
	      @param {String|Function|Array} [*value*]
	      @example
	function value(d) {
	  return d.id;
	}
	  */
	  layout.groupBy = function(_) {
	    if (!arguments.length) return groupBy;
	    if (!(_ instanceof Array)) _ = [_];
	    return groupBy = _.map(function (k) { return typeof k === "function" ? k : d3plusCommon.accessor(k); }), layout;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  layout.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : d3plusCommon.constant(_), layout) : label;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label padding accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current label padding accessor.
	      @param {Function|Number} [*value* = 5]
	  */
	  layout.labelPadding = function(_) {
	    return arguments.length ? (labelPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), layout) : labelPadding;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current label resizing accessor.
	      @param {Function|Boolean} [*value* = true]
	  */
	  layout.labelResize = function(_) {
	    return arguments.length ? (labelResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), layout) : labelResize;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, toggles the legend based on the specified boolean and returns this generator. If *value* is not specified, returns the current legend visibility.
	      @param {Boolean} [*value*]
	  */
	  layout.legend = function(_) {
	    return arguments.length ? (legend = _, layout) : legend;
	  };

	  /**
	      @memberof layout
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  layout.select = function(_) {
	    return arguments.length ? (select = d3Selection.select(_), layout) : select;
	  };

	  /**
	      @memberof layout
	      @desc If *comparator* is specified, sets the sort order for the layout using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
	      @param {Array} [*comparator*]
	      @example
	function comparator(a, b) {
	  return b.value - a.value;
	}
	  */
	  layout.sort = function(_) {
	    return arguments.length ? (sort = _, layout) : sort;
	  };

	  /**
	      @memberof layout
	      @desc If *size* is specified, sets the available layout size to the specified two-element array of numbers representing x and y. If *size* is not specified, returns the current size. If no *size* is given before running the generator, it is determined by analyzing the element passed to [select](#layout.select).
	      @param {Array} [*size*]
	  */
	  layout.size = function(_) {
	    return arguments.length ? (size = _, layout) : size;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current sum accessor.
	      @param {Function|Number} [*value*]
	      @example
	function sum(d) {
	  return d.sum;
	}
	  */
	  layout.sum = function(_) {
	    return arguments.length ? (sum = typeof _ === "function" ? _ : d3plusCommon.constant(_), layout) : sum;
	  };

	  return data.length ? layout() : layout;

	}

	exports.version = version;
	exports.layout = layout;

}));