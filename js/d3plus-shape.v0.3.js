(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('d3plus-text'), require('d3plus-color')) :
	typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3', 'd3plus-text', 'd3plus-color'], factory) :
	(factory((global.d3plus_shape = {}),global.d3,global.d3plus_text,global.d3plus_color));
}(this, function (exports,d3,d3plusText,d3plusColor) { 'use strict';

	d3 = 'default' in d3 ? d3['default'] : d3;

	var version = "0.3.1";

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant (x) {
	  return function constant() {
	    return x;
	  };
	}

	/**
	    The default height accessor function.
	    @private
	*/
	function rectHeight(d) {
	  return d.height;
	}

	/**
	    The default id accessor function.
	    @private
	*/
	function rectId(d) {
	  return d.id;
	}

	/**
	    The default inner bounds function.
	    @private
	*/
	function rectInnerBounds(w, h) {
	  return { "width": w, "height": h, "x": -w / 2, "y": -h / 2 };
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function rectWidth(d) {
	  return d.width;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function rectX(d) {
	  return d.x;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function rectY(d) {
	  return d.y;
	}

	/**
	    @function rect
	    @desc Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this rectangle generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"id": 0, "x": 100, "y": 50, "width": 200, "height": 100};
	@example <caption>passed to the generator</caption>
	rect([data]);
	@example <caption>creates the following</caption>
	<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
	  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
	</g>
	*/
	function rect () {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  var fill = constant("black"),
	      height = rectHeight,
	      id = rectId,
	      innerBounds = rectInnerBounds,
	      label = undefined,
	      select = undefined,
	      timing = 600,
	      width = rectWidth,
	      x = rectX,
	      y = rectY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function rect() {

	    if (select === void 0) select = d3.select("body").append("svg").style("width", window.innerWidth + "px").style("height", window.innerHeight + "px");

	    /* Bind data array to elements using provided id matching. */
	    var groups = select.selectAll(".d3plus-shape-rect").data(data, id);

	    /* Enter */
	    var enter = groups.enter().append("g").attr("class", "d3plus-shape-rect").attr("id", function (d, i) {
	      return "d3plus-shape-rect-" + id(d, i);
	    }).attr("transform", function (d, i) {
	      return "translate(" + x(d, i) + "," + y(d, i) + ")";
	    });

	    enter.append("rect").attr("width", 0).attr("height", 0).attr("x", 0).attr("y", 0).attr("fill", function (d, i) {
	      return fill(d, i);
	    });

	    /* Update */
	    groups.transition().duration(timing).attr("transform", function (d, i) {
	      return "translate(" + x(d, i) + "," + y(d, i) + ")";
	    });

	    groups.selectAll("rect").transition().duration(timing).attr("width", function (d, i) {
	      return width(d, i);
	    }).attr("height", function (d, i) {
	      return height(d, i);
	    }).attr("x", function (d, i) {
	      return -width(d, i) / 2;
	    }).attr("y", function (d, i) {
	      return -height(d, i) / 2;
	    }).attr("fill", function (d, i) {
	      return fill(d, i);
	    });

	    /* Exit */
	    groups.exit().transition().delay(timing).remove();

	    groups.exit().selectAll("rect").transition().duration(timing).attr("width", 0).attr("height", 0).attr("x", function (d, i) {
	      return x(d, i);
	    }).attr("y", function (d, i) {
	      return y(d, i);
	    });

	    /* Draw labels based on inner bounds */
	    groups.each(function (d, i) {

	      if (label !== void 0) {
	        var b = innerBounds(width(d, i), height(d, i));
	        if (b) {

	          var elem = d3.select(this).selectAll("text").data([0]);
	          elem.enter().append("text").html(label(d, i));

	          d3plusText.box().fontColor(function () {
	            return d3plusColor.contrast(fill(d, i));
	          }).height(b.height).select(elem.node()).width(b.width).x(b.x).y(b.y)();
	        } else d3.select(this).select("text").remove();
	      } else d3.select(this).select("text").remove();
	    });

	    return rect;
	  }

	  /**
	      @memberof rect
	      @desc If *data* is specified, sets the data array to the specified array and returns this rectangle generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  rect.data = function (_) {
	    return arguments.length ? (data = _, rect) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.fill = function (_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : constant(_), rect) : fill;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.height;
	  }
	  */
	  rect.height = function (_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), rect) : height;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this rectangle generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	  function(d) {
	  return d.id;
	  }
	  */
	  rect.id = function (_) {
	    return arguments.length ? (id = _, rect) : id;
	  };

	  /**
	      @memberof rect
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this rectangle generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	  function(w, h) {
	  return {
	    "width": w,
	    "height": h,
	    "x": -w / 2,
	    "y": -h / 2
	  };
	  }
	      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  rect.innerBounds = function (_) {
	    return arguments.length ? (innerBounds = _, rect) : innerBounds;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  rect.label = function (_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), rect) : label;
	  };

	  /**
	      @memberof rect
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this rectangle generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
	  */
	  rect.select = function (_) {
	    return arguments.length ? (select = d3.select(_), rect) : select;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation timing to the specified number and returns this rectangle generator. If *ms* is not specified, returns the current animation timing.
	      @param {Number} [*ms* = 600]
	  */
	  rect.timing = function (_) {
	    return arguments.length ? (timing = _, rect) : timing;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.width;
	  }
	  */
	  rect.width = function (_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), rect) : width;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.x;
	  }
	  */
	  rect.x = function (_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), rect) : x;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	  function(d) {
	  return d.y;
	  }
	  */
	  rect.y = function (_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), rect) : y;
	  };

	  return data.length ? rect() : rect;
	}

	exports.version = version;
	exports.rect = rect;

}));