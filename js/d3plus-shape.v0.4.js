(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3plus-text'), require('d3plus-color')) :
	typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3-selection', 'd3-transition', 'd3plus-text', 'd3plus-color'], factory) :
	(factory((global.d3plus_shape = global.d3plus_shape || {}),global.d3_selection,global.d3_transition,global.d3plus_text,global.d3plus_color));
}(this, function (exports,d3Selection,d3Transition,d3plusText,d3plusColor) { 'use strict';

	var version = "0.4.4";

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant(x) {
	  return function constant() {
	    return x;
	  };
	}

	var d3 = {
	  "select": d3Selection.select,
	  "transition": d3Transition.transition
	};
	/**
	    The default height accessor function.
	    @private
	*/
	function imageHeight(d) {
	  return d.height;
	}

	/**
	    The default URL accessor function.
	    @private
	*/
	function imageUrl(d) {
	  return d.url;
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function imageWidth(d) {
	  return d.width;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function imageX(d) {
	  return d.x || 0;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function imageY(d) {
	  return d.y || 0;
	}

	/**
	    @function image
	    @desc Creates SVG images based on an array of data. If *data* is specified, immediately draws the images based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#image.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"url": "file.png", "width": "100", "height": "50"};
	@example <caption>passed to the generator</caption>
	image([data]);
	@example <caption>creates the following</caption>
	<image class="d3plus-shape-image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
	@example <caption>this is shorthand for the following</caption>
	image().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	image().data([data])(function() { alert("draw complete!"); })
	*/
	function image(data) {

	  if ( data === void 0 ) data = [];

	  var duration = 600,
	      height = imageHeight,
	      id = imageUrl,
	      select,
	      url = imageUrl,
	      width = imageWidth,
	      x = imageX,
	      y = imageY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function image(callback) {

	    if (select === void 0) image.select(d3.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());

	    var images = select.selectAll(".d3plus-shape-image").data(data, id);

	    var enter = images.enter().append("image")
	      .attr("class", "d3plus-shape-image")
	      .attr("opacity", 0);

	    var update = enter.merge(images);

	    update.attr("xlink:href", url)
	      .transition().duration(duration)
	        .attr("opacity", 1)
	        .attr("width", function (d, i) { return width(d, i); })
	        .attr("height", function (d, i) { return height(d, i); })
	        .attr("x", function (d, i) { return x(d, i); })
	        .attr("y", function (d, i) { return y(d, i); })
	        .each(function(d, i) {
	          var image = d3.select(this), link = url(d, i);
	          var fullAddress = link.indexOf("http://") === 0 || link.indexOf("https://") === 0;
	          if (!fullAddress || link.indexOf(window.location.hostname) === 0) {
	            var img = new Image();
	            img.src = link;
	            img.crossOrigin = "Anonymous";
	            img.onload = function() {
	              var canvas = document.createElement("canvas");
	              canvas.width = this.width;
	              canvas.height = this.height;
	              var context = canvas.getContext("2d");
	              context.drawImage(this, 0, 0);
	              image.attr("xlink:href", canvas.toDataURL("image/png"));
	            };
	          }
	        });

	    images.exit().transition().duration(duration)
	      .attr("width", function (d, i) { return width(d, i); })
	      .attr("height", function (d, i) { return height(d, i); })
	      .attr("x", function (d, i) { return x(d, i); })
	      .attr("y", function (d, i) { return y(d, i); })
	      .attr("opacity", 0).remove();

	    if (callback) setTimeout(callback, duration + 100);

	    return image;

	  }

	  /**
	      @memberof image
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  image.data = function(_) {
	    return arguments.length ? (data = _, image) : data;
	  };

	  /**
	      @memberof image
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  image.duration = function(_) {
	    return arguments.length ? (duration = _, image) : duration;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height;
	}
	  */
	  image.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), image) : height;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.url;
	}
	  */
	  image.id = function(_) {
	    return arguments.length ? (id = _, image) : id;
	  };

	  /**
	      @memberof image
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
	  */
	  image.select = function(_) {
	    return arguments.length ? (select = d3.select(_), image) : select;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the URL accessor to the specified function and returns this generator. If *value* is not specified, returns the current URL accessor.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.url;
	}
	  */
	  image.url = function(_) {
	    return arguments.length ? (url = _, image) : url;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width;
	}
	  */
	  image.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), image) : width;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x || 0;
	}
	  */
	  image.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), image) : x;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y || 0;
	}
	  */
	  image.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), image) : y;
	  };

	  return data.length ? image() : image;

	}

	var d3$1 = {
	  "select": d3Selection.select,
	  "transition": d3Transition.transition
	};

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
	function rectInnerBounds(s) {
	  return {"width": s.width, "height": s.height, "x": -s.width / 2, "y": -s.height / 2};
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
	    @desc Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"id": 0, "x": 100, "y": 50, "width": 200, "height": 100};
	@example <caption>passed to the generator</caption>
	rect([data]);
	@example <caption>creates the following</caption>
	<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
	  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
	</g>
	@example <caption>this is shorthand for the following</caption>
	rect().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	rect().data([data])(function() { alert("draw complete!"); })
	*/
	function rect(data) {

	  /**
	      The default font-color accessor function.
	      @private
	  */
	  if ( data === void 0 ) data = [];

	  function rectFontColor(d, i) {
	    return d3plusColor.contrast(fill(d, i));
	  }

	  var on = {};

	  var backgroundImage = constant(false),
	      duration = 600,
	      fill = constant("black"),
	      fontColor = rectFontColor,
	      fontFamily,
	      fontResize = constant(false),
	      fontSize,
	      height = rectHeight,
	      id = rectId,
	      innerBounds = rectInnerBounds,
	      label = constant(false),
	      labelPadding = constant(5),
	      lineHeight,
	      select,
	      stroke = constant("black"),
	      strokeWidth = constant(0),
	      textAnchor = constant("start"),
	      verticalAlign = constant("top"),
	      width = rectWidth,
	      x = rectX,
	      y = rectY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function rect(callback) {

	    if (select === void 0) rect.select(d3$1.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    /**
	        Sets styles for both entering and updating rectangles.
	        @private
	    */
	    function rectStyle(r, show) {
	      if (show === void 0) show = true;

	      r
	        .attr("width", show ? function (d, i) { return width(d, i); } : 0)
	        .attr("height", show ? function (d, i) { return height(d, i); } : 0)
	        .attr("x", show ? function (d, i) { return -width(d, i) / 2; } : 0)
	        .attr("y", show ? function (d, i) { return -height(d, i) / 2; } : 0)
	        .attr("fill", function (d, i) { return fill(d, i); })
	        .attr("stroke", function (d, i) { return stroke(d, i); })
	        .attr("stroke-width", function (d, i) { return strokeWidth(d, i); });
	    }

	    /**
	        Updates inner contents of all rectangles.
	        @private
	    */
	    function contents(g, show) {
	      if (show === void 0) show = true;

	      g.each(function(d, i) {

	        var h = height(d, i),
	              w = width(d, i);

	        /* Draws background image */
	        var imageUrl = show ? backgroundImage(d, i) : false;
	        image()
	          .data(imageUrl ? [{"url": imageUrl}] : [])
	          .duration(duration)
	          .height(show ? h : 0)
	          .select(this)
	          .width(show ? w : 0)
	          .x(show ? -w / 2 : 0)
	          .y(show ? -h / 2 : 0)
	          ();

	        /* Draws label based on inner bounds */
	        var labelData = [],
	              labelText = show ? label(d, i) : false;

	        if (labelText) {
	          var bounds = innerBounds({"width": w, "height": h}, i),
	                padding = labelPadding(d, i);

	          bounds.height -= padding * 2;
	          bounds.width -= padding * 2;
	          bounds.x += padding;
	          bounds.y += padding;
	          labelData.push(bounds);
	        }

	        d3plusText.box()
	          .data(labelData)
	          .delay(duration / 2)
	          .duration(duration)
	          .fontColor(fontColor(d, i))
	          .fontFamily(fontFamily(d, i))
	          .fontResize(fontResize(d, i))
	          .fontSize(fontSize(d, i))
	          .lineHeight(lineHeight(d, i))
	          .textAnchor(textAnchor(d, i))
	          .verticalAlign(verticalAlign(d, i))
	          .select(this)
	          .text(label(d, i))
	          ();

	      });

	    }

	    var groups = select.selectAll(".d3plus-shape-rect").data(data, id);

	    groups.transition().duration(duration)
	      .attr("transform", function (d, i) { return ("translate(" + (x(d, i)) + "," + (y(d, i)) + ")"); });

	    groups.exit().transition().delay(duration).remove();

	    groups.exit().selectAll("rect").transition().duration(duration)
	      .attr("width", 0)
	      .attr("height", 0)
	      .attr("x", 0)
	      .attr("y", 0);

	    groups.exit().call(contents, false);

	    var enter = groups.enter().append("g")
	        .attr("class", "d3plus-shape-rect")
	        .attr("id", function (d, i) { return ("d3plus-shape-rect-" + (id(d, i))); })
	        .attr("transform", function (d, i) { return ("translate(" + (x(d, i)) + "," + (y(d, i)) + ")"); });

	    enter.append("rect")
	      .call(rectStyle, false);

	    var update = enter.merge(groups);

	    update.selectAll("rect").transition().duration(duration)
	      .call(rectStyle);

	    update.call(contents);

	    var events = Object.keys(on);
	    for (var e = 0; e < events.length; e++) update.on(events[e], on[events[e]]);

	    if (callback) setTimeout(callback, duration + 100);

	    return rect;

	  }

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background-image accessor.
	      @param {Function|String} [*value* = false]
	  */
	  rect.backgroundImage = function(_) {
	    return arguments.length ? (backgroundImage = typeof _ === "function" ? _ : constant(_), rect) : backgroundImage;
	  };

	  /**
	      @memberof rect
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  rect.data = function(_) {
	    return arguments.length ? (data = _, rect) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  rect.duration = function(_) {
	    return arguments.length ? (duration = _, rect) : duration;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.fill = function(_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : constant(_), rect) : fill;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  rect.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant(_), rect) : fontColor;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant(_), rect) : fontFamily;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#rect.label) will be resized the best fit the rectangle.
	      @param {Function|Boolean} [*value*]
	  */
	  rect.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant(_), rect) : fontResize;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant(_), rect) : fontSize;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height;
	}
	  */
	  rect.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), rect) : height;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.id;
	}
	  */
	  rect.id = function(_) {
	    return arguments.length ? (id = _, rect) : id;
	  };

	  /**
	      @memberof rect
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	function(shape) {
	  return {
	    "width": shape.width,
	    "height": shape.height,
	    "x": -shape.width / 2,
	    "y": -shape.height / 2
	  };
	}
	      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  rect.innerBounds = function(_) {
	    return arguments.length ? (innerBounds = _, rect) : innerBounds;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  rect.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), rect) : label;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding.
	      @param {Number} [*value* = 10]
	  */
	  rect.labelPadding = function(_) {
	    return arguments.length ? (labelPadding = typeof _ === "function" ? _ : constant(_), rect) : labelPadding;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant(_), rect) : lineHeight;
	  };

	  /**
	      @memberof rect
	      @desc Adds or removes a *listener* to each rectangle for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
	      @param {String} [*typenames*]
	      @param {Function} [*listener*]
	  */
	  rect.on = function(typenames, listener) {
	    return arguments.length === 2 ? (on[typenames] = listener, rect) : arguments.length ? on[typenames] : on;
	  };

	  /**
	      @memberof rect
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
	  */
	  rect.select = function(_) {
	    if (arguments.length) {
	      select = d3$1.select(_);
	      if (fontFamily === void 0) fontFamily = constant(select.style("font-family"));
	      if (fontSize === void 0) fontSize = constant(parseFloat(select.style("font-size"), 10));
	      return rect;
	    }
	    return select;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.stroke = function(_) {
	    return arguments.length ? (stroke = typeof _ === "function" ? _ : constant(_), rect) : stroke;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke-width accessor.
	      @param {Function|Number} [*value* = 0]
	  */
	  rect.strokeWidth = function(_) {
	    return arguments.length ? (strokeWidth = typeof _ === "function" ? _ : constant(_), rect) : strokeWidth;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`.
	      @param {Function|String} [*value* = "start"]
	  */
	  rect.textAnchor = function(_) {
	    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : constant(_), rect) : textAnchor;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`.
	      @param {Function|String} [*value* = "start"]
	  */
	  rect.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : constant(_), rect) : verticalAlign;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width;
	}
	  */
	  rect.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), rect) : width;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x;
	}
	  */
	  rect.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), rect) : x;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y;
	}
	  */
	  rect.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), rect) : y;
	  };

	  return data.length ? rect() : rect;

	}

	exports.version = version;
	exports.image = image;
	exports.rect = rect;

}));