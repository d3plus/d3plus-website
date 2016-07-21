/*
  d3plus-treemap v0.4.0
  A reusable tree map built on D3
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-color'), require('d3plus-common'), require('d3plus-legend'), require('d3plus-tooltip'), require('d3plus-shape'), require('d3plus-text'), require('d3-color'), require('d3-collection'), require('d3-hierarchy'), require('d3-selection')) :
  typeof define === 'function' && define.amd ? define('d3plus-treemap', ['exports', 'd3plus-color', 'd3plus-common', 'd3plus-legend', 'd3plus-tooltip', 'd3plus-shape', 'd3plus-text', 'd3-color', 'd3-collection', 'd3-hierarchy', 'd3-selection'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusColor,global.d3plusCommon,global.d3plusLegend,global.d3plusTooltip,global.d3plusShape,global.d3plusText,global.d3Color,global.d3Collection,global.d3Hierarchy,global.d3Selection));
}(this, function (exports,d3plusColor,d3plusCommon,d3plusLegend,d3plusTooltip,d3plusShape,d3plusText,d3Color,d3Collection,d3Hierarchy,d3Selection) { 'use strict';

  var d3plus = {
    rect: d3plusShape.rect,
    textBox: d3plusText.textBox,
    tooltip: d3plusTooltip.tooltip
  };

  var d3 = {
    color: d3Color.color,
    hierarchy: d3Hierarchy.hierarchy,
    mouse: d3Selection.mouse,
    nest: d3Collection.nest,
    select: d3Selection.select,
    treemap: d3Hierarchy.treemap
  };

  /**
      @function treemap
      @desc Uses the [d3 treemap layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method.
      @param {Array} [data = []]
      @example <caption>using default key accessors</caption>
  var data = [
    {"id": 0, "value": 100},
    {"id": 1, "value": 50}
  ];

  treemap(data);
  @example <caption>using non-default key accessors</caption>
  var data = [
    {"name": 0, "value": 20},
    {"name": 1, "value": 10}
  ];

  treemap()
    .id(function(d) {
      return d.name;
    })
    .value(function(d) {
      return d.value * 5;
    })();
  */
  function treemap$1(data) {
    if ( data === void 0 ) data = [];


    /**
        The default value accessor function.
        @private
    */
    function treemapSort(a, b) {
      return b.value - a.value;
    }

    var backGen = d3plus.textBox()
      .on("click", function () {
        if (history.length) {
          // const c = history.pop();
          treemap.config(history.pop())();
        }
        else treemap.depth(drawDepth - 1).filter(false)();
      });

    var tooltipGen = d3plus.tooltip()
      .pointerEvents("none");

    var legendGen = d3plusLegend.legend(),
          shapes = d3plus.rect()
            .height(function (d) { return d.y1 - d.y0; })
            .width(function (d) { return d.x1 - d.x0; })
            .x(function (d) { return margin.left + d.x0 + (d.x1 - d.x0) / 2; })
            .y(function (d) { return margin.top + d.y0 + (d.y1 - d.y0) / 2; });

    var on = {
      click: function (d, i) {
        if (drawDepth < groupBy.length - 1) {
          var filterGroup = groupBy[drawDepth],
                filterId = id(d, i);
          highlight = false;
          if (tooltip) tooltipGen.data([])();
          history.push({
            depth: treemap.depth(),
            filter: treemap.filter()
          });
          treemap.config({
            depth: drawDepth + 1,
            filter: function (f, x) { return filterGroup(f, x) === filterId; }
          })();
        }
      },
      mouseenter: function (d, i) {
        var filterId = id(d, i);
        highlight = function (h, x) {
          var myId = id(h, x);
          if (myId.constructor === Array && filterId.constructor !== Array) return myId.includes(filterId);
          if (myId.constructor !== Array && filterId.constructor === Array) return filterId.includes(myId);
          return myId === filterId;
        };
        if (tooltip) {
          tooltipGen.data([d])
            .footer(drawDepth < groupBy.length - 1 ? "Click to Expand" : "")
            .translate(d3.mouse(d3.select("html").node()))
            ();
        }
        treemap.update(100);
      },
      mousemove: function () {
        var dd = tooltipGen.duration();
        if (tooltip) {
          tooltipGen
            .duration(0)
            .translate(d3.mouse(d3.select("html").node()))
            ().duration(dd);
        }
      },
      mouseleave: function () {
        highlight = false;
        if (tooltip) tooltipGen.data([])();
        treemap.update(100);
      }
    };

    var history = [],
          margin = {bottom: 0, left: 0, right: 0, top: 0};

    var depth,
        drawDepth,
        duration = 600,
        fill = function (d, i) { return d3plusColor.assign(id(d, i)); },
        filter,
        groupBy = [d3plusCommon.accessor("id")],
        highlight = false,
        id,
        label,
        labelPadding = d3plusCommon.constant(5),
        labelResize = d3plusCommon.constant(true),
        legend = true,
        opacity = function (d, i) { return highlight ? highlight(d, i) ? 1 : 0.25 : 1; },
        padding = 2,
        rect = {},
        select,
        size,
        sort = treemapSort,
        stroke = function (d, i) { return d3.color(fill(d, i)).darker(); },
        strokeWidth = function (d, i) { return highlight ? highlight(d, i) ? 1 : 0 : 0; },
        sum = d3plusCommon.accessor("value"),
        tile = d3Hierarchy.treemapSquarify,
        tooltip = true;

    /**
        The inner return object and draw function that gets assigned the public methods.
        @private
    */
    function treemap(callback) {

      var config = {
              fill: function (d, i) { return fill(d.data, i); },
              opacity: function (d, i) { return opacity(d.data, i); },
              stroke: function (d, i) { return stroke(d.data, i); },
              strokeWidth: function (d, i) { return strokeWidth(d.data, i); }
            },
            events = Object.keys(on),
            globalEvents = events.filter(function (e) { return !e.includes("."); }),
            legendEvents = events.filter(function (e) { return e.includes(".legend"); }),
            shapeEvents = events.filter(function (e) { return e.includes(".shape"); });

      drawDepth = depth !== void 0 ? depth : groupBy.length - 1;
      id = groupBy[drawDepth];

      if (select === void 0) {
        treemap.size(d3plusCommon.getSize(d3.select("body").node()));
        treemap.select(d3.select("body").append("svg").style("width", ((size[0]) + "px")).style("height", ((size[1]) + "px")).style("display", "block").node());
      }
      else if (size === void 0) treemap.size(d3plusCommon.getSize(select.node()));

      var drawLabel = label || function(d, i) {
        var l = id(d, i);
        if (l.constructor !== Array) return l;
        for (var x = drawDepth; x >= 0; x--) {
          l = groupBy[x](d, i);
          if (l.constructor !== Array) break;
        }
        return l;
      };

      var filteredData = filter ? data.filter(filter) : data;

      var legendData = d3plusCommon.colorNest(filteredData, fill, groupBy);

      legendData.data = legendData.data.map(function (d, i) {
        var retObj = {
          data: d,
          id: legendData.id(d, i)
        };
        return retObj;
      });

      var legendGroup = select.selectAll("g.d3plus-treemap-legend")
        .data(legend ? [0] : []);

      legendGroup = legendGroup.enter().append("g")
          .attr("class", "d3plus-treemap-legend")
          .attr("transform", ("translate(0," + (size[1] / 2) + ")"))
        .merge(legendGroup);

      legendGroup.transition().duration(duration)
        .attr("transform", ("translate(0," + (size[1] / 2) + ")"));

      legendGen
        .config(config)
        .duration(duration)
        .data(legendData.data)
        .height(size[1] / 2)
        .label(function (d, i) { return drawLabel(d.data, i); })
        .select(legendGroup.node())
        .verticalAlign("bottom")
        .width(size[0]);
      var loop = function ( e ) {
        legendGen.on(globalEvents[e], function (d, i) { return on[globalEvents[e]](d.data, i); });
      };

      for (var e = 0; e < globalEvents.length; e++) loop( e );
      var loop$1 = function ( e ) {
        legendGen.on(legendEvents[e], function (d, i) { return on[legendEvents[e]](d.data, i); });
      };

      for (var e$1 = 0; e$1 < legendEvents.length; e$1++) loop$1( e$1 );
      if (legend.constructor === Object) legendGen.config(legend);
      legendGen();

      margin.bottom = legendGen.outerBounds().height + legendGen.padding() * 4;

      var titleGroup = select.selectAll("g.d3plus-treemap-titles").data([0]);

      titleGroup = titleGroup.enter().append("g")
        .attr("class", "d3plus-treemap-titles")
        .merge(titleGroup);

      backGen
        .data(history.length ? [{text: "Back"}] : [])
        .select(titleGroup.node())
        .x(padding * 2)
        .y(0)
        ();

      margin.top = history.length ? backGen.fontSize()() + padding : 0;
      var nestedData = d3.nest();
      for (var i = 0; i <= drawDepth; i++) nestedData.key(groupBy[i]);
      nestedData = nestedData.entries(filteredData);

      var tmapData = d3.treemap()
        .padding(padding)
        .round(true)
        .size([size[0] - margin.left - margin.right, size[1] - margin.top - margin.bottom])
        .tile(tile)
        (d3.hierarchy({values: nestedData}, function (d) { return d.values; }).sum(sum).sort(sort));

      var shapeData = [];

      /**
          Flattens and merges treemap data.
          @private
      */
      function extractLayout(children) {
        for (var i = 0; i < children.length; i++) {
          var node = children[i];
          if (node.depth <= drawDepth) extractLayout(node.children);
          else {
            node.id = drawDepth + node.data.key;
            node.data = d3plusCommon.merge(node.data.values);
            shapeData.push(node);
          }
        }
      }
      if (tmapData.children) extractLayout(tmapData.children);
      var total = tmapData.value;

      var shapeGroup = select.selectAll("g.d3plus-treemap-shapes").data([0]);

      shapeGroup = shapeGroup.enter().append("g")
        .attr("class", "d3plus-treemap-shapes")
        .merge(shapeGroup);

      shapes
        .config(config)
        .data(shapeData)
        .duration(duration)
        .fontResize(function (d, i) { return labelResize(d.data, i); })
        .innerBounds(function (s) {
          var h = s.height;
          var sh = Math.min(50, h / 2);
          return [
            {width: s.width, height: h - sh, x: -s.width / 2, y: -h / 2},
            {width: s.width, height: sh, x: -s.width / 2, y: h / 2 - sh}
          ];
        })
        .label(function (d, i) { return [drawLabel(d.data, i), ((Math.round(sum(d.data, i) / total * 100)) + "%")]; })
        .labelPadding(function (d, i) { return labelPadding(d.data, i); })
        .select(shapeGroup.node())
        .textAnchor(["start", "middle"])
        .verticalAlign(["top", "bottom"]);
      var loop$2 = function ( e ) {
        shapes.on(globalEvents[e], function (d, i) { return on[globalEvents[e]](d.data, i); });
      };

      for (var e$2 = 0; e$2 < globalEvents.length; e$2++) loop$2( e$2 );
      var loop$3 = function ( e ) {
        shapes.on(shapeEvents[e], function (d, i) { return on[shapeEvents[e]](d.data, i); });
      };

      for (var e$3 = 0; e$3 < shapeEvents.length; e$3++) loop$3( e$3 );
      if (rect.constructor === Object) shapes.config(rect);
      shapes();

      tooltipGen
        .tbody([[sum, function (d, i) { return ((Math.round(sum(d, i) / total * 100)) + "%"); }]])
        .thead(["Value", "Share"])
        .title(drawLabel);
      if (tooltip.constructor === Object) tooltipGen.config(tooltip);

      if (callback) setTimeout(callback, duration + 100);

      return treemap;

    }

    /**
        @memberof treemap
        @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
        @param {Object} [*value*]
    */
    treemap.config = function(_) {
      if (arguments.length) {
        for (var k in _) if ({}.hasOwnProperty.call(_, k)) treemap[k](_[k]);
        return treemap;
      }
      else {
        var config = {};
        for (var k$1 in treemap.prototype.constructor) if (k$1 !== "config" && {}.hasOwnProperty.call(treemap, k$1)) config[k$1] = treemap[k$1]();
        return config;
      }
    };

    /**
        @memberof treemap
        @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
        @param {Array} [*data* = []]
    */
    treemap.data = function(_) {
      return arguments.length ? (data = _, treemap) : data;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the depth to the specified number and returns this generator. The *value* should correspond with an index in the [groupBy](#groupBy) array. If *value* is not specified, returns the current depth.
        @param {Number} [*value*]
    */
    treemap.depth = function(_) {
      return arguments.length ? (depth = _, treemap) : depth;
    };

    /**
        @memberof treemap
        @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
        @param {Number} [*ms* = 600]
    */
    treemap.duration = function(_) {
      return arguments.length ? (duration = _, treemap) : duration;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor. By default, colors are assigned using the [d3plus-color assign](https://github.com/d3plus/d3plus-color/#assign) function based on each data point's unique id.
        @param {Function|String} [*value*]
        @example
  function value(d) {
    return d3plus_color.assign(d.id);
  }
    */
    treemap.fill = function(_) {
      return arguments.length ? (fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : fill;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the filter to the specified function and returns this generator. If *value* is not specified, returns the current filter.
        @param {Function} [*value*]
    */
    treemap.filter = function(_) {
      return arguments.length ? (filter = _, treemap) : filter;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns this generator. If *value* is not specified, returns the current group accessor.
        @param {String|Function|Array} [*value*]
        @example
  function value(d) {
    return d.id;
  }
    */
    treemap.groupBy = function(_) {
      if (!arguments.length) return groupBy;
      if (!(_ instanceof Array)) _ = [_];
      return groupBy = _.map(function (k) { return typeof k === "function" ? k : d3plusCommon.accessor(k); }), treemap;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the highlight filter to the specified function and returns this generator. If *value* is not specified, returns the current highlight filter. When the highlight function returns true given a data point, the highlight styles will be used.
        @param {Function} [*value* = false]
    */
    treemap.highlight = function(_) {
      return arguments.length ? (highlight = _, treemap) : highlight;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
        @param {Function|String} [*value*]
    */
    treemap.label = function(_) {
      return arguments.length ? (label = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : label;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the label padding accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current label padding accessor.
        @param {Function|Number} [*value* = 5]
    */
    treemap.labelPadding = function(_) {
      return arguments.length ? (labelPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : labelPadding;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the label resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current label resizing accessor.
        @param {Function|Boolean} [*value* = true]
    */
    treemap.labelResize = function(_) {
      return arguments.length ? (labelResize = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : labelResize;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, toggles the legend based on the specified boolean and returns this generator. If *value* is an object, then it is passed to the legend's config method. If *value* is not specified, returns the current value.
        @param {Boolean|Object} [*value* = true]
    */
    treemap.legend = function(_) {
      return arguments.length ? (legend = _, treemap) : legend;
    };

    /**
        @memberof treemap
        @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
        @param {String} [*typenames*]
        @param {Function} [*listener*]
        @example <caption>By default, listeners apply to both the shapes and the legend. Passing a namespace with the typename gives control over specific elements:</caption>
  treemap
    .on("click.shape", function(d) {
      console.log("data for rectangle clicked:", d);
    })
    .on("click.legend", function(d) {
      console.log("data for legend clicked:", d);
    })
    */
    treemap.on = function(typenames, listener) {
      return arguments.length === 2 ? (on[typenames] = listener, treemap) : arguments.length ? on[typenames] : on;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current opacity accessor.
        @param {Function|Number} [*value*]
    */
    treemap.opacity = function(_) {
      return arguments.length ? (opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : opacity;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the inner and outer padding accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current padding accessor.
        @param {Function|Number} [*value*]
    */
    treemap.padding = function(_) {
      return arguments.length ? (padding = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : padding;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, then it is passed to the rectangle generator's config method. If *value* is not specified, returns the current rectangle config.
        @param {Object} [*value*]
    */
    treemap.rect = function(_) {
      return arguments.length ? (rect = _, treemap) : rect;
    };

    /**
        @memberof treemap
        @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
        @param {String|HTMLElement} [*selector*]
    */
    treemap.select = function(_) {
      return arguments.length ? (select = d3.select(_), treemap) : select;
    };

    /**
        @memberof treemap
        @desc If *comparator* is specified, sets the sort order for the treemap using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
        @param {Array} [*comparator*]
        @example
  function comparator(a, b) {
    return b.value - a.value;
  }
    */
    treemap.sort = function(_) {
      return arguments.length ? (sort = _, treemap) : sort;
    };

    /**
        @memberof treemap
        @desc If *size* is specified, sets the available treemap size to the specified two-element array of numbers representing x and y. If *size* is not specified, returns the current size. If no *size* is given before running the generator, it is determined by analyzing the element passed to [select](#treemap.select).
        @param {Array} [*size*]
    */
    treemap.size = function(_) {
      return arguments.length ? (size = _, treemap) : size;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.
        @param {Function|String} [*value*]
        @example <caption>default behavior:</caption>
  function value(d) {
    return d3.color(treemap.fill(d, i)).darker();
  }
    */
    treemap.stroke = function(_) {
      return arguments.length ? (stroke = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : stroke;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the stroke-width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current stroke-width accessor.
        @param {Function|Number} [*value* = 0]
    */
    treemap.strokeWidth = function(_) {
      return arguments.length ? (strokeWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : strokeWidth;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current sum accessor.
        @param {Function|Number} [*value*]
        @example
  function sum(d) {
    return d.sum;
  }
    */
    treemap.sum = function(_) {
      return arguments.length ? (sum = typeof _ === "function" ? _ : d3plusCommon.constant(_), treemap) : sum;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, sets the [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling) to the specified function and returns this generator. If *value* is not specified, returns the current [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling).
        @param {Function} [*value*]
    */
    treemap.tile = function(_) {
      return arguments.length ? (tile = _, treemap) : tile;
    };

    /**
        @memberof treemap
        @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns this generator. If *value* is an object, then it is passed to the tooltip's config method. If *value* is not specified, returns the current tooltip visibility.
        @param {Boolean|Object} [*value* = true]
    */
    treemap.tooltip = function(_) {
      return arguments.length ? (tooltip = _, treemap) : tooltip;
    };

    /**
        @memberof treemap
        @desc If *ms* is specified, all shapes will redraw using the specified duration and return this generator. If *ms* is not specified, shapes will redraw instantly. This method is useful when only needing to change visual styles (and not data), like when setting custom [mouse events](#treemap.on).
        @param {Number} [*ms* = 0]
    */
    treemap.update = function(_) {
      if ( _ === void 0 ) _ = 0;

      legendGen.duration(_)().duration(duration);
      shapes.duration(_)().duration(duration);
      return treemap;
    };

    return data.length ? treemap() : treemap;

  }

  exports.treemap = treemap$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));