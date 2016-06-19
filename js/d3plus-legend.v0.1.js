(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-selection'), require('d3plus-shape'), require('d3plus-text')) :
	typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3plus-common', 'd3-array', 'd3-selection', 'd3plus-shape', 'd3plus-text'], factory) :
	(factory((global.d3plus_legend = global.d3plus_legend || {}),global.d3plus_common,global.d3_array,global.d3_selection,global.d3plus_shape,global.d3plus_text));
}(this, function (exports,d3plusCommon,d3Array,d3Selection,d3plusShape,d3plusText) { 'use strict';

	var version = "0.1.3";

	/**
	    @function shape
	    @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample dataset</caption>
	var data = [
	  {"id": 0, "color": "brickred"},
	  {"id": 1, "color": "cornflowerblue"}
	];
	@example <caption>passed to the generator</caption>
	shape([data]);
	@example <caption>creates the following</caption>
	<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
	  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
	</g>
	@example <caption>this is shorthand for the following</caption>
	shape().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	shape().data([data])(function() { alert("draw complete!"); })
	*/
	function shape(data) {

	  /**
	      The default y accessor function.
	      @private
	  */
	  if ( data === void 0 ) data = [];

	  function shapeLabelBounds(s, i) {
	    var d = lineData[i];
	    return {"width": d.width, "height": d.height, "x": s.width / 2 + padding, "y": 1 - d.height / 2};
	  }

	  /**
	      The default x accessor function.
	      @private
	  */
	  function shapeX(d, i) {
	    if (orient === "vertical") return outerBounds.x + size(d, i) / 2;
	    else return outerBounds.x + d3Array.sum(data.slice(0, i).map(function (b, i) { return size(b, i); })) +
	                d3Array.sum(lineData.slice(0, i).map(function (l) { return l.width - fontSize(d, i); })) +
	                size(d, i) / 2 + padding * 3 * i;
	  }

	  /**
	      The default y accessor function.
	      @private
	  */
	  function shapeY(d, i) {
	    if (orient === "horizontal") return outerBounds.y + d3Array.max(lineData.map(function (l) { return l.height; }).concat(data.map(function (l, x) { return size(l, x); }))) / 2;
	    else {
	      var s = size(d, i);
	      var pad = lineData[i].height > s ? lineData[i].height / 2 : s / 2,
	            prev = d3Array.sum(lineData.slice(0, i), function (l, x) { return d3Array.max([l.height, size(l.data, x)]); });
	      return outerBounds.y + prev + pad + padding * i;
	    }
	  }

	  var on = {},
	        outerBounds = {"width": 0, "height": 0, "x": 0, "y": 0};

	  var align = "center",
	      backgroundColor = "transparent",
	      duration = 600,
	      fill = d3plusCommon.accessor("color"),
	      fontColor = d3plusCommon.constant("#444"),
	      fontFamily = d3plusCommon.constant("sans-serif"),
	      fontResize = d3plusCommon.constant(false),
	      fontSize = d3plusCommon.constant(10),
	      height = 100,
	      id = d3plusCommon.accessor("id"),
	      label = d3plusCommon.accessor("id"),
	      labelBounds = shapeLabelBounds,
	      lineData = [],
	      lineHeight,
	      orient = "horizontal",
	      padding = 5,
	      select,
	      shapeImage = d3plusCommon.constant(false),
	      size = d3plusCommon.constant(10),
	      verticalAlign = "middle",
	      width = 400,
	      x = shapeX,
	      y = shapeY;

	  /**
	    The inner return object and draw function that gets assigned the public methods.
	    @private
	  */
	  function shape(callback) {

	    if (select === void 0) shape.select(d3Selection.select("body").append("svg").attr("width", ((window.innerWidth) + "px")).attr("height", ((window.innerHeight) + "px")).node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    // Background Rectangle
	    d3plusShape.rect()
	      .data([{"id": "legend-background"}])
	      .duration(duration)
	      .fill(backgroundColor)
	      .height(height)
	      .select(select.node())
	      .width(width)
	      .x(width / 2)
	      .y(height / 2)
	      ();

	    // Calculate Text Sizes
	    lineData = data.map(function (d, i) {
	      var f = fontFamily(d, i), lh = lineHeight(d, i), s = fontSize(d, i);
	      var h = orient === "horizontal" ? height - (data.length + 1) * padding : height,
	            w = orient === "vertical" ? width - padding * 3 - size(d, i) : width;
	      var res = d3plusText.wrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(label(d, i));
	      res.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.width(t, {"font-family": f, "font-size": s}); }))) + s;
	      res.height = Math.ceil(res.lines.length * (lh + 1));
	      res.og = {
	        "height": res.height,
	        "width": res.width
	      };
	      res.data = d;
	      res.f = f;
	      res.s = s;
	      res.lh = lh;
	      return res;
	    });

	    var availableSpace, textSpace, visibleLabels = true;

	    if (orient === "horizontal") {
	      availableSpace = width - d3Array.sum(data.map(function (d, i) { return size(d, i) + padding * 3; })) - padding * 2;
	      textSpace = d3Array.sum(lineData.map(function (d, i) { return d.width - fontSize(d, i); }));
	      if (textSpace > availableSpace) {
	        var wrappable = lineData
	          .filter(function (d) { return d.words.length > 1; })
	          .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

	        if (wrappable.length && height > wrappable[0].height * 2) {

	          var line = 2;
	          while (line <= 5) {
	            var labels = wrappable.filter(function (d) { return d.words.length >= line; });
	            if (!labels.length) break;
	            var loop = function ( x ) {
	              var label$1 = wrappable[x];
	              var h = label$1.og.height * line, w = label$1.og.width * (1.5 * (1 / line));
	              var res = d3plusText.wrap().fontFamily(label$1.f).fontSize(label$1.s).lineHeight(label$1.lh).width(w).height(h)(label$1.sentence);
	              if (!res.truncated) {
	                textSpace -= label$1.width;
	                label$1.width = Math.ceil(d3Array.max(res.lines.map(function (t) { return d3plusText.width(t, {"font-family": label$1.f, "font-size": label$1.s}); }))) + label$1.s;
	                label$1.height = res.lines.length * (label$1.lh + 1);
	                textSpace += label$1.width;
	                if (textSpace <= availableSpace) return 'break';
	              }
	            };

	            for (var x$1 = 0; x$1 < wrappable.length; x$1++) {
	              var returned = loop( x$1 );

	              if ( returned === 'break' ) break;
	            }
	            if (textSpace <= availableSpace) break;
	            line++;

	          }

	        }
	        else visibleLabels = false;
	      }
	    }
	    if (textSpace > availableSpace) visibleLabels = false;

	    if (!visibleLabels) {
	      textSpace = 0;
	      for (var i = 0; i < lineData.length; i++) {
	        lineData[i].width = 0;
	        lineData[i].height = 0;
	      }
	    }

	    var innerHeight = d3Array.max(lineData, function (d, i) { return d3Array.max([d.height, size(d.data, i)]); }),
	          innerWidth = textSpace + d3Array.sum(data, function (d, i) { return size(d, i); }) + padding * (data.length * (visibleLabels ? 3 : 1) - 2);
	    outerBounds.width = innerWidth;
	    outerBounds.height = innerHeight;

	    var xOffset = padding,
	        yOffset = padding;
	    if (align === "center") xOffset = (width - padding * 2 - innerWidth) / 2;
	    else if (align === "right") xOffset = width - padding * 2 - innerWidth;
	    if (verticalAlign === "middle") yOffset = (height - padding * 2 - innerHeight) / 2;
	    else if (verticalAlign === "bottom") yOffset = height - padding * 2 - innerHeight;
	    outerBounds.x = xOffset;
	    outerBounds.y = yOffset;

	    // Shape <g> Group
	    var shapeGroup = select.selectAll("g.d3plus-legend-shape-group")
	      .data([0]);

	    shapeGroup = shapeGroup.enter().append("g")
	        .attr("class", "d3plus-legend-shape-group")
	      .merge(shapeGroup);

	    // Legend Shapes
	    var legendShapes = d3plusShape.rect()
	      .backgroundImage(shapeImage)
	      .data(data)
	      .duration(duration)
	      .fill(fill)
	      .fontColor(fontColor)
	      .fontFamily(fontFamily)
	      .fontResize(fontResize)
	      .fontSize(fontSize)
	      .height(size)
	      .id(id)
	      .innerBounds(labelBounds)
	      .label(visibleLabels ? label : false)
	      .labelPadding(0)
	      .lineHeight(lineHeight)
	      .select(shapeGroup.node())
	      .verticalAlign("top")
	      .width(size)
	      .x(x)
	      .y(y);

	    var events = Object.keys(on);
	    for (var e = 0; e < events.length; e++) legendShapes.on(events[e], on[events[e]]);
	    legendShapes();

	    if (callback) setTimeout(callback, duration + 100);

	    return shape;

	  }

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
	      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
	  */
	  shape.align = function(_) {
	    return arguments.length ? (align = _, shape) : align;
	  };

	  /**
	      @memberof shape
	      @desc If a valid CSS *color* is specified, sets the overall background color to the specified value and returns this generator. If *color* is not specified, returns the current background color.
	      @param {String} [*color* = []]
	  */
	  shape.backgroundColor = function(_) {
	    return arguments.length ? (backgroundColor = _, shape) : backgroundColor;
	  };

	  /**
	      @memberof shape
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  shape.data = function(_) {
	    return arguments.length ? (data = _, shape) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  shape.duration = function(_) {
	    return arguments.length ? (duration = _, shape) : duration;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the fill accessor to the specified function and returns this generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function} [*value*]
	      @example
	function value(d) {
	  return d.color;
	}
	  */
	  shape.fill = function(_) {
	    return arguments.length ? (fill = _, shape) : fill;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  shape.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : fontColor;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.
	      @param {Function|String} [*value*]
	  */
	  shape.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : fontFamily;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#shape.label) will be resized the best fit the rectangle.
	      @param {Function|Boolean} [*value*]
	  */
	  shape.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : fontResize;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.
	      @param {Function|String} [*value*]
	  */
	  shape.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : fontSize;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
	      @param {Number} [*value* = 100]
	  */
	  shape.height = function(_) {
	    return arguments.length ? (height = _, shape) : height;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	function value(d) {
	  return d.id;
	}
	  */
	  shape.id = function(_) {
	    return arguments.length ? (id = _, shape) : id;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
	      @param {Function|String} [*value*]
	  */
	  shape.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : label;
	  };

	  /**
	      @memberof shape
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this legend generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	function(w, h) {
	  return {
	    "width": w,
	    "height": h,
	    "x": -w / 2,
	    "y": -h / 2
	  };
	}
	      @param {Function} [*bounds*] Given a shape's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  shape.labelBounds = function(_) {
	    return arguments.length ? (labelBounds = _, shape) : labelBounds;
	  };

	  /**
	      @memberof shape
	      @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
	      @param {String} [*typenames*]
	      @param {Function} [*listener*]
	  */
	  shape.on = function(typenames, listener) {
	    return arguments.length === 2 ? (on[typenames] = listener, shape) : arguments.length ? on[typenames] : on;
	  };

	  /**
	      @memberof shape
	      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
	      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
	  */
	  shape.orient = function(_) {
	    return arguments.length ? (orient = _, shape) : orient;
	  };

	  /**
	      @memberof shape
	      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
	      @example
	{"width": 180, "height": 24, "x": 10, "y": 20}
	  */
	  shape.outerBounds = function() {
	    return outerBounds;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
	      @param {Number} [*value* = 10]
	  */
	  shape.padding = function(_) {
	    return arguments.length ? (padding = _, shape) : padding;
	  };

	  /**
	      @memberof shape
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3Select("body").append("svg")]
	  */
	  shape.select = function(_) {
	    return arguments.length ? (select = d3Selection.select(_), shape) : select;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the shape background image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape background image accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  shape.shapeImage = function(_) {
	    return arguments.length ? (shapeImage = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : shapeImage;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current size accessor.
	      @param {Function|Number} [*value* = 20]
	  */
	  shape.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : size;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.
	      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
	  */
	  shape.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = _, shape) : verticalAlign;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
	      @param {Number} [*value* = 400]
	  */
	  shape.width = function(_) {
	    return arguments.length ? (width = _, shape) : width;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
	      @param {Function|Number} [*value*]
	  */
	  shape.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : x;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
	      @param {Function|Number} [*value*]
	  */
	  shape.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : d3plusCommon.constant(_), shape) : y;
	  };

	  return data.length ? shape() : shape;

	}

	exports.version = version;
	exports.shape = shape;

}));