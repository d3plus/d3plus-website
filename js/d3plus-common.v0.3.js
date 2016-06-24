(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-selection')) :
	typeof define === 'function' && define.amd ? define('d3plus-common', ['exports', 'd3-array', 'd3-collection', 'd3-selection'], factory) :
	(factory((global.d3plus_common = global.d3plus_common || {}),global.d3_array,global.d3_collection,global.d3_selection));
}(this, function (exports,d3Array,d3Collection,d3Selection) { 'use strict';

	var version = "0.3.6";

	/**
	    @function accessor
	    @desc Wraps an object key in a simple accessor function.
	    @param {String} key The key to be returned from each Object passed to the function.
	    @param {*} [def] A default value to be returned if the key is not present.
	    @example <caption>this</caption>
	accessor("id");
	    @example <caption>returns this</caption>
	function(d) {
	  return d["id"];
	}
	*/
	function accessor(key, def) {
	  if (def === void 0) return function (d) { return d[key]; };
	  return function (d) { return d[key] === void 0 ? def : d[key]; };
	}

	/**
	    @function merge
	    @desc Combines an Array of Objects together and returns a new Object.
	    @param {Array} objects The Array of objects to be merged together.
	    @example <caption>this</caption>
	merge([
	  {id: "foo", group: "A", value: 10},
	  {id: "bar", group: "A", value: 20}
	]);
	    @example <caption>returns this</caption>
	{id: ["bar", "foo"], group: "A", value: 30}
	*/
	function combine(objects) {

	  var availableKeys = new Set(d3Array.merge(objects.map(function (o) { return d3Collection.keys(o); }))),
	        newObject = {};

	  availableKeys.forEach(function (k) {
	    var values = objects.map(function (o) { return o[k]; });
	    var value;
	    if (values.map(function (v) { return typeof v; }).indexOf("string") >= 0) {
	      value = Array.from(new Set(values).values());
	      if (value.length === 1) value = value[0];
	    }
	    else value = d3Array.sum(values);
	    newObject[k] = value;
	  });

	  return newObject;

	}

	/**
	    @function colorNest
	    @desc Returns an Array of data objects based on a given color accessor and groupBy levels.
	    @param {Array} raw The raw data Array to be grouped by color.
	    @param {Function} fill The color accessor for each data object.
	    @param {Array} [groupBy = []] An optional array of grouping accessors. Will autodetect if a certain group by level is assigning the colors, and will return the appropriate accessor.
	*/
	function colorNest(raw, fill, groupBy) {
	  if ( groupBy === void 0 ) groupBy = [];


	  if (groupBy && !(groupBy instanceof Array)) groupBy = [groupBy];

	  var colors = d3Collection.nest().key(fill).entries(raw);
	  var data, id;
	  if (groupBy.length) {
	    var numColors = colors.length;
	    var loop = function ( i ) {
	      var ids = colors.map(function (c) { return Array.from(new Set(c.values.map(function (d) { return groupBy[i](d); }))); }),
	            total = d3Array.sum(ids, function (d) { return d.length; }),
	            uniques = new Set(d3Array.merge(ids)).size;
	      if (total === numColors && uniques === numColors || i === groupBy.length - 1) {
	        id = groupBy[i];
	        data = d3Collection.nest().key(id).entries(raw).map(function (d) { return combine(d.values); });
	        return 'break';
	      }
	    };

	    for (var i = 0; i < groupBy.length; i++) {
	      var returned = loop( i );

	      if ( returned === 'break' ) break;
	    }
	  }
	  else {
	    id = fill;
	    data = colors.map(function (d) { return combine(d.values); });
	  }

	  return {data: data, id: id};

	}

	/**
	    @function constant
	    @desc Wraps non-function variables in a simple return function.
	    @param {Array|Number|Object|String} value The value to be returned from the function.
	    @example <caption>this</caption>
	constant(42);
	    @example <caption>returns this</caption>
	function() {
	  return 42;
	}
	*/
	function constant(value) {
	  return function constant() {
	    return value;
	  };
	}

	/**
	  Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
	  @private
	*/
	function elementSize(element, s) {

	  if (element.tagName === undefined || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {

	    var val  = window[("inner" + (s.charAt(0).toUpperCase() + s.slice(1)))];
	    var elem = d3Selection.select(element);

	    if (s === "width") {
	      val -= parseFloat(elem.style("margin-left"), 10);
	      val -= parseFloat(elem.style("margin-right"), 10);
	      val -= parseFloat(elem.style("padding-left"), 10);
	      val -= parseFloat(elem.style("padding-right"), 10);
	    }
	    else {
	      val -= parseFloat(elem.style("margin-top"), 10);
	      val -= parseFloat(elem.style("margin-bottom"), 10);
	      val -= parseFloat(elem.style("padding-top"), 10);
	      val -= parseFloat(elem.style("padding-bottom"), 10);
	    }

	    return val;

	  }
	  else {

	    var val$1 = parseFloat(d3Selection.select(element).style(s), 10);
	    if (typeof val$1 === "number" && val$1 > 0) return val$1;
	    else return elementSize(element.parentNode, s);

	  }
	}

	/**
	    @function getSize
	    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
	    @param {HTMLElement} elem The HTMLElement to find dimensions for.
	*/
	function getSize(elem) {
	  return [elementSize(elem, "width"), elementSize(elem, "height")];
	}

	exports.version = version;
	exports.accessor = accessor;
	exports.colorNest = colorNest;
	exports.constant = constant;
	exports.getSize = getSize;
	exports.merge = combine;

	Object.defineProperty(exports, '__esModule', { value: true });

}));