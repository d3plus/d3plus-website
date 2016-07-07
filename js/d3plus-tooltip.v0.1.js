/*
  d3plus-tooltip v0.1.2
  A javascript-only tooltip.
  Copyright (c) 2016 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-selection'), require('d3-transition')) :
  typeof define === 'function' && define.amd ? define('d3plus-tooltip', ['exports', 'd3plus-common', 'd3-selection', 'd3-transition'], factory) :
  (factory((global.d3plus = global.d3plus || {}),global.d3plusCommon,global.d3Selection,global.d3Transition));
}(this, function (exports,d3plusCommon,d3Selection,d3Transition) { 'use strict';

  var val = undefined;

  function prefix() {
    if (val !== void 0) return val;
    if ("-webkit-transform" in document.body.style) val = "-webkit-";
    else if ("-moz-transform" in document.body.style) val = "-moz-";
    else if ("-ms-transform" in document.body.style) val = "-ms-";
    else if ("-o-transform" in document.body.style) val = "-o-";
    else val = "";
    return val;
  }

  var d3 = {
    select: d3Selection.select, transition: d3Transition.transition
  };

  /**
      The default id accessor function.
      @private
  */
  function tooltipId(d, i) {
    return d.id || ("" + i);
  }

  /**
      The default translate accessor function.
      @private
  */
  function tooltipTranslate(d) {
    return [d.x, d.y];
  }

  /**
      @function tooltip
      @desc Creates HTML tooltips in the body of a webpage. If *data* is specified, immediately draws the tooltips based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#tooltip.data) method.
      @param {Array} [data = []]
  */
  function tooltip(data) {
    if ( data === void 0 ) data = [];


    /**
        Sets styles for both enter and update.
        @private
    */
    function boxStyles(box) {
      box
        .style("background", background)
        .style((pre + "border-radius"), borderRadius)
        .style("pointer-events", pointerEvents)
        .style("padding", padding)
        .style("width", width)
        .style("height", height)
        .style("border", function(d, i) {
          var b = d3.select(this).style("border");
          return b !== "0px none rgb(0, 0, 0)" ? b : border(d, i);
        })
        .style("top", function(d, i) {
          return ((translate(d, i)[1] - this.offsetHeight - offset(d, i)) + "px");
        })
        .style("left", function(d, i) {
          return ((translate(d, i)[0] - this.offsetWidth / 2) + "px");
        });
    }

    /**
        Fetches table contents given functions or values.
        @private
    */
    function cellContent(d) {
      if (typeof d === "function") {
        var datum = d3.select(this.parentNode.parentNode).datum();
        return d(datum, data.indexOf(datum));
      }
      else return d;
    }

    var pre = prefix();

    var background = d3plusCommon.constant("rgba(255, 255, 255, 0.75)"),
        body = d3plusCommon.accessor("body", ""),
        bodyStyle = {
          "font-size": "10px",
          "font-weight": "400"
        },
        border = d3plusCommon.constant("1px solid rgba(0, 0, 0, 0.1)"),
        borderRadius = d3plusCommon.constant("2px"),
        className = "d3plus-tooltip",
        duration = d3plusCommon.constant(200),
        footer = d3plusCommon.accessor("footer", ""),
        footerStyle = {
          "font-size": "10px",
          "font-weight": "400"
        },
        height = d3plusCommon.constant("auto"),
        id = tooltipId,
        offset = d3plusCommon.constant(10),
        padding = d3plusCommon.constant("5px"),
        pointerEvents = d3plusCommon.constant("auto"),
        tableStyle = {
          "border-spacing": "0",
          "width": "100%"
        },
        tbody = [],
        tbodyStyle = {
          "font-size": "10px",
          "text-align": "center"
        },
        thead = [],
        theadStyle = {
          "font-size": "10px",
          "font-weight": "600",
          "text-align": "center"
        },
        title = d3plusCommon.accessor("title", ""),
        titleStyle = {
          "font-size": "12px",
          "font-weight": "600"
        },
        translate = tooltipTranslate,
        width = d3plusCommon.constant("auto");

    /**
        The inner return object and draw function that gets assigned the public methods.
        @private
    */
    function tooltip(callback) {

      var tooltips = d3.select("body").selectAll(("." + className))
        .data(data, id);

      var enter = tooltips.enter().append("div")
        .attr("class", className)
        .style("position", "absolute")
        .style((pre + "transform"), "scale(0)")
        .style((pre + "transform-origin"), "50% 100%");

      var update = tooltips.merge(enter);

      /**
          Creates DIV elements with a unique class and styles.
          @private
      */
      function divElement(cat) {
        enter.append("div").attr("class", ("d3plus-tooltip-" + cat));
        var div = update.select((".d3plus-tooltip-" + cat)).html(eval(cat));
        d3plusCommon.stylize(div, eval((cat + "Style")));
      }

      divElement("title");
      divElement("body");

      var tableEnter = enter.append("table").attr("class", "d3plus-tooltip-table");
      var table = update.select(".d3plus-tooltip-table");
      d3plusCommon.stylize(table, tableStyle);

      tableEnter.append("thead").attr("class", "d3plus-tooltip-thead");
      var tableHead = update.select(".d3plus-tooltip-thead");
      d3plusCommon.stylize(tableHead, theadStyle);
      var th = tableHead.selectAll("th").data(thead);
      th.enter().append("th").merge(th).html(cellContent);
      th.exit().remove();

      tableEnter.append("tbody").attr("class", "d3plus-tooltip-tbody");
      var tableBody = update.select(".d3plus-tooltip-tbody");
      d3plusCommon.stylize(tableBody, tbodyStyle);
      var tr = tableBody.selectAll("tr").data(tbody);
      var trEnter = tr.enter().append("tr");
      tr.exit().remove();
      var trUpdate = tr.merge(trEnter);
      var td = trUpdate.selectAll("td").data(function (d) { return d; });
      td.enter().append("td").merge(td).html(cellContent);

      divElement("footer");

      enter.call(boxStyles);

      update
        .attr("id", function (d, i) { return ("d3plus-tooltip-" + (id(d, i))); })
        .transition().duration(duration)
          .style((pre + "transform"), "scale(1)")
          .call(boxStyles);

      tooltips.exit()
        .transition().duration(duration)
        .style((pre + "transform"), "scale(0)")
        .remove();

      if (callback) setTimeout(callback, 100);

      return tooltip;

    }

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the background accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background accessor.
        @param {Function|String} [*value* = "rgba(255, 255, 255, 0.75)"]
    */
    tooltip.background = function(_) {
      return arguments.length ? (background = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : background;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the body accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current body accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.body || "";
  }
    */
    tooltip.body = function(_) {
      return arguments.length ? (body = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : body;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the body styles to the specified values and returns this generator. If *value* is not specified, returns the current body styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-size": "10px",
    "font-weight": "400"
  }
    */
    tooltip.bodyStyle = function(_) {
      return arguments.length ? (bodyStyle = Object.assign(bodyStyle, _), tooltip) : bodyStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the border accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border accessor.
        @param {Function|String} [*value* = "1px solid rgba(0, 0, 0, 0.1)"]
    */
    tooltip.border = function(_) {
      return arguments.length ? (border = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : border;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the border-radius accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border-radius accessor.
        @param {Function|String} [*value* = "2px"]
    */
    tooltip.borderRadius = function(_) {
      return arguments.length ? (borderRadius = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : borderRadius;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the class name to the specified string and returns this generator. If *value* is not specified, returns the current class name.
        @param {String} [*value* = "d3plus-tooltip"]
    */
    tooltip.className = function(_) {
      return arguments.length ? (className = _, tooltip) : className;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this generator. If *value* is not specified, returns the current configuration.
        @param {Object} [*value*]
    */
    tooltip.config = function(_) {
      if (arguments.length) {
        for (var k in _) if ({}.hasOwnProperty.call(_, k)) tooltip[k](_[k]);
        return tooltip;
      }
      else {
        var config = {};
        for (var k$1 in tooltip.prototype.constructor) if (k$1 !== "config" && {}.hasOwnProperty.call(tooltip, k$1)) config[k$1] = tooltip[k$1]();
        return config;
      }
    };

    /**
        @memberof tooltip
        @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
        @param {Array} [*data* = []]
    */
    tooltip.data = function(_) {
      return arguments.length ? (data = _, tooltip) : data;
    };

    /**
        @memberof tooltip
        @desc If *ms* is specified, sets the duration accessor to the specified function or number and returns this generator. If *ms* is not specified, returns the current duration accessor.
        @param {Function|Number} [*ms* = 200]
    */
    tooltip.duration = function(_) {
      return arguments.length ? (duration = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : duration;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the footer accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current footer accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.footer || "";
  }
    */
    tooltip.footer = function(_) {
      return arguments.length ? (footer = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : footer;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the footer styles to the specified values and returns this generator. If *value* is not specified, returns the current footer styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-size": "10px",
    "font-weight": "400"
  }
    */
    tooltip.footerStyle = function(_) {
      return arguments.length ? (footerStyle = Object.assign(footerStyle, _), tooltip) : footerStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current height accessor.
        @param {Function|String} [*value* = "auto"]
    */
    tooltip.height = function(_) {
      return arguments.length ? (height = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : height;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the id accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current id accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d, i) {
    return d.id || "" + i;
  }
    */
    tooltip.id = function(_) {
      return arguments.length ? (id = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : id;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the offset accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current offset accessor.
        @param {Function|Number} [*value* = 10]
    */
    tooltip.offset = function(_) {
      return arguments.length ? (offset = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : offset;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the padding accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current padding accessor.
        @param {Function|String} [*value* = "5px"]
    */
    tooltip.padding = function(_) {
      return arguments.length ? (padding = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : padding;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.
        @param {Function|String} [*value* = "auto"]
    */
    tooltip.pointerEvents = function(_) {
      return arguments.length ? (pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : pointerEvents;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the table styles to the specified values and returns this generator. If *value* is not specified, returns the current table styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "border-spacing": "0",
    "width": "100%"
  }
    */
    tooltip.tableStyle = function(_) {
      return arguments.length ? (tableStyle = Object.assign(tableStyle, _), tooltip) : tableStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the contents of the table body to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table body data.
        @param {Array} [*value* = []]
    */
    tooltip.tbody = function(_) {
      return arguments.length ? (tbody = _, tooltip) : tbody;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the table body styles to the specified values and returns this generator. If *value* is not specified, returns the current table body styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-size": "10px",
    "font-weight": "600",
    "text-align": "center"
  }
    */
    tooltip.tbodyStyle = function(_) {
      return arguments.length ? (tbodyStyle = Object.assign(tbodyStyle, _), tooltip) : tbodyStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the contents of the table head to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table head data.
        @param {Array} [*value* = []]
    */
    tooltip.thead = function(_) {
      return arguments.length ? (thead = _, tooltip) : thead;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the table head styles to the specified values and returns this generator. If *value* is not specified, returns the current table head styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-size": "10px",
    "font-weight": "600",
    "text-align": "center"
  }
    */
    tooltip.theadStyle = function(_) {
      return arguments.length ? (theadStyle = Object.assign(theadStyle, _), tooltip) : theadStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the title accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current title accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.title || "";
  }
    */
    tooltip.title = function(_) {
      return arguments.length ? (title = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : title;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the title styles to the specified values and returns this generator. If *value* is not specified, returns the current title styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-size": "12px",
    "font-weight": "600"
  }
    */
    tooltip.titleStyle = function(_) {
      return arguments.length ? (titleStyle = Object.assign(titleStyle, _), tooltip) : titleStyle;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the translate accessor to the specified function or array and returns this generator. If *value* is not specified, returns the current translate accessor.
        @param {Function|Array} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return [d.x, d.y];
  }
    */
    tooltip.translate = function(_) {
      return arguments.length ? (translate = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : translate;
    };

    /**
        @memberof tooltip
        @desc If *value* is specified, sets the width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current width accessor.
        @param {Function|String} [*value* = "auto"]
    */
    tooltip.width = function(_) {
      return arguments.length ? (width = typeof _ === "function" ? _ : d3plusCommon.constant(_), tooltip) : width;
    };

    return data.length ? tooltip() : tooltip;

  }

  exports.tooltip = tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));