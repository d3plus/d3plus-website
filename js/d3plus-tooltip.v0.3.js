/*
  d3plus-tooltip v0.3.0
  A javascript-only tooltip.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define('d3plus-tooltip', ['exports', 'd3-selection', 'd3-transition', 'd3plus-common', 'popper.js'], factory) :
  (factory((global.d3plus = {}),global.d3Selection,global.d3Transition,global.d3plusCommon,global.Popper));
}(this, (function (exports,d3Selection,d3Transition,d3plusCommon,Popper) { 'use strict';

  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  /**
      @class Tooltip
      @extends BaseClass
      @desc Creates HTML tooltips in the body of a webpage.
  */
  var Tooltip = (function (BaseClass) {
    function Tooltip() {

      BaseClass.call(this);

      this._arrow = d3plusCommon.accessor("arrow", "");
      this._arrowStyle = {
        "content": "",
        "background": "inherit",
        "border": "inherit",
        "border-width": "0 1px 1px 0",
        "height": "10px",
        "position": "absolute",
        "transform": "rotate(45deg)",
        "width": "10px",
        "z-index": "-1"
      };
      this._background = d3plusCommon.constant("rgba(255, 255, 255, 1)");
      this._body = d3plusCommon.accessor("body", "");
      this._bodyStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "400",
        "z-index": "1"
      };
      this._border = d3plusCommon.constant("1px solid rgba(0, 0, 0, 0.1)");
      this._borderRadius = d3plusCommon.constant("2px");
      this._className = "d3plus-tooltip";
      this._data = [];
      this._duration = d3plusCommon.constant(200);
      this._footer = d3plusCommon.accessor("footer", "");
      this._footerStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "400",
        "z-index": "1"
      };
      this._height = d3plusCommon.constant("auto");
      this._id = function (d, i) { return d.id || ("" + i); };
      this._offset = d3plusCommon.constant(5);
      this._padding = d3plusCommon.constant("5px");
      this._pointerEvents = d3plusCommon.constant("auto");
      this._position = function (d) { return [d.x, d.y]; };
      this._prefix = d3plusCommon.prefix();
      this._tableStyle = {
        "border-spacing": "0",
        "width": "100%"
      };
      this._tbody = [];
      this._tbodyStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "text-align": "center"
      };
      this._thead = [];
      this._theadStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "600",
        "text-align": "center"
      };
      this._title = d3plusCommon.accessor("title", "");
      this._titleStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "font-weight": "600"
      };
      this._width = d3plusCommon.constant("auto");
    }

    if ( BaseClass ) Tooltip.__proto__ = BaseClass;
    Tooltip.prototype = Object.create( BaseClass && BaseClass.prototype );
    Tooltip.prototype.constructor = Tooltip;

    /**
        The inner return object and draw function that gets assigned the public methods.
        @private
    */
    Tooltip.prototype.render = function render (callback) {
      var this$1 = this;


      var that = this;

      var tooltips = d3Selection.select("body").selectAll(("." + (this._className)))
        .data(this._data, this._id);

      var enter = tooltips.enter().append("div")
        .attr("class", this._className);

      var update = tooltips.merge(enter);

      /**
          Creates DIV elements with a unique class and styles.
          @private
      */
      function divElement(cat) {
        enter.append("div").attr("class", ("d3plus-tooltip-" + cat))
                           .attr("id", function (d, i) { return ("d3plus-tooltip-" + cat + "-" + (d ? that._id(d, i) : "")); });

        var div = update.select((".d3plus-tooltip-" + cat)).html(that[("_" + cat)]);
        d3plusCommon.stylize(div, that[("_" + cat + "Style")]);
      }

      /**
          Fetches table contents given functions or values.
          @private
      */
      function cellContent(d) {
        if (typeof d === "function") {
          var datum = d3Selection.select(this.parentNode.parentNode).datum();
          return d(datum, that._data.indexOf(datum));
        }
        else { return d; }
      }

      /**
          Sets styles for both enter and update.
          @private
      */
      function boxStyles(box) {

        box
          .style("background", that._background)
          .style(((that._prefix) + "border-radius"), that._borderRadius)
          .style("pointer-events", that._pointerEvents)
          .style("padding", that._padding)
          .style("width", that._width)
          .style("height", that._height)
          .style("border", function(d, i) {
            var b = d3Selection.select(this).style("border");
            return b !== "0px none rgb(0, 0, 0)" ? b : that._border(d, i);
          });
      }

      divElement("title");
      divElement("body");

      var tableEnter = enter.append("table").attr("class", "d3plus-tooltip-table");
      var table = update.select(".d3plus-tooltip-table");
      d3plusCommon.stylize(table, this._tableStyle);

      tableEnter.append("thead").attr("class", "d3plus-tooltip-thead");
      var tableHead = update.select(".d3plus-tooltip-thead");
      d3plusCommon.stylize(tableHead, this._theadStyle);
      var th = tableHead.selectAll("th").data(this._thead);
      th.enter().append("th").merge(th).html(cellContent);
      th.exit().remove();

      tableEnter.append("tbody").attr("class", "d3plus-tooltip-tbody");
      var tableBody = update.select(".d3plus-tooltip-tbody");
      d3plusCommon.stylize(tableBody, this._tbodyStyle);
      var tr = tableBody.selectAll("tr").data(this._tbody);
      var trEnter = tr.enter().append("tr");
      tr.exit().remove();
      var trUpdate = tr.merge(trEnter);
      var td = trUpdate.selectAll("td").data(function (d) { return d; });
      td.enter().append("td").merge(td).html(cellContent);

      divElement("footer");

      divElement("arrow");

      enter.call(boxStyles);

      var t = d3Transition.transition().duration(this._duration);

      update
        .attr("id", function (d, i) { return ("d3plus-tooltip-" + (d ? this$1._id(d, i) : "")); })
        .transition(t)
          .style("opacity", 1)
          .call(boxStyles);

      tooltips.exit()
        .transition(t)
          .style("opacity", 0)
        .remove();

      for (var i = 0; i < this._data.length; i++) {
        var d = that._data[i];

        if (d) {
          var tooltip = document.getElementById(("d3plus-tooltip-" + (that._id(d, i))));
          var arrow = document.getElementById(("d3plus-tooltip-arrow-" + (that._id(d, i))));
          var arrowHeight = arrow.offsetHeight;
          var arrowDistance = arrow.getBoundingClientRect().height / 2;
          arrow.style.bottom = "-" + (arrowHeight / 2) + "px";

          var position = that._position(d, i);

          var referenceObject = Array.isArray(position) ? {
            clientWidth: 0,
            clientHeight: 0,
            getBoundingClientRect: function () { return ({
              top: position[1],
              right: position[0],
              bottom: position[1],
              left: position[0],
              width: 0,
              height: 0
            }); }
          }
            : that._position(d, i);

          new Popper(referenceObject, tooltip, {
            placement: "top",
            placements: ["top", "bottom", "left", "right"],
            modifiers: {
              arrow: {
                element: arrow
              },
              offset: {
                offset: ("0," + (that._offset(d, i) + arrowDistance))
              },
              preventOverflow: {
                boundariesElement: "scrollParent"
              },
              flip: {
                behavior: "flip",
                boundariesElement: "viewport"
              }
            },
            onCreate: function onCreate(ref) {
              var instance = ref.instance;

              document.onmousemove = function () {
                instance.scheduleUpdate();
              };
            },
            onUpdate: function onUpdate(ref) {
              var arrowElement = ref.arrowElement;
              var flipped = ref.flipped;

              if (flipped) {
                arrowElement.style.transform = "rotate(225deg)";
                arrowElement.style.top = "-" + (arrowHeight / 2) + "px";
              }
              else {
                arrowElement.style.transform = "rotate(45deg)";
                arrowElement.style.bottom = "-" + (arrowHeight / 2) + "px";
              }
            }
          });
        }
      }

      if (callback) { setTimeout(callback, this._duration + 100); }

      return this;

    };

    /**
     @memberof Tooltip
     @desc Sets the inner HTML content of the arrow element, which by default is empty.
     @param {Function|String} [*value*]
     @example <caption>default accessor</caption>
     function value(d) {
    return d.arrow || "";
  }
     */
    Tooltip.prototype.arrow = function arrow (_) {
      return arguments.length ? (this._arrow = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._arrow;
    };

    /**
     @memberof Tooltip
     @desc If *value* is specified, sets the arrow styles to the specified values and returns this generator. If *value* is not specified, returns the current arrow styles.
     @param {Object} [*value*]
     @example <caption>default styles</caption>
     {
       "content": "",
       "border-width": "10px",
       "border-style": "solid",
       "border-color": "rgba(255, 255, 255, 0.75) transparent transparent transparent",
       "position": "absolute"
     }
     */
    Tooltip.prototype.arrowStyle = function arrowStyle (_) {
      return arguments.length ? (this._arrowStyle = Object.assign(this._arrowStyle, _), this) : this._arrowStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the background accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background accessor.
        @param {Function|String} [*value* = "rgba(255, 255, 255, 0.75)"]
    */
    Tooltip.prototype.background = function background (_) {
      return arguments.length ? (this._background = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._background;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the body accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current body accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.body || "";
  }
    */
    Tooltip.prototype.body = function body (_) {
      return arguments.length ? (this._body = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._body;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the body styles to the specified values and returns this generator. If *value* is not specified, returns the current body styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
    "font-size": "12px",
    "font-weight": "400"
  }
    */
    Tooltip.prototype.bodyStyle = function bodyStyle (_) {
      return arguments.length ? (this._bodyStyle = Object.assign(this._bodyStyle, _), this) : this._bodyStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the border accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border accessor.
        @param {Function|String} [*value* = "1px solid rgba(0, 0, 0, 0.1)"]
    */
    Tooltip.prototype.border = function border (_) {
      return arguments.length ? (this._border = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._border;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the border-radius accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border-radius accessor.
        @param {Function|String} [*value* = "2px"]
    */
    Tooltip.prototype.borderRadius = function borderRadius (_) {
      return arguments.length ? (this._borderRadius = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._borderRadius;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the class name to the specified string and returns this generator. If *value* is not specified, returns the current class name.
        @param {String} [*value* = "d3plus-tooltip"]
    */
    Tooltip.prototype.className = function className (_) {
      return arguments.length ? (this._className = _, this) : this._className;
    };

    /**
        @memberof Tooltip
        @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
        @param {Array} [*data* = []]
    */
    Tooltip.prototype.data = function data (_) {
      return arguments.length ? (this._data = _, this) : this._data;
    };

    /**
        @memberof Tooltip
        @desc If *ms* is specified, sets the duration accessor to the specified function or number and returns this generator. If *ms* is not specified, returns the current duration accessor.
        @param {Function|Number} [*ms* = 200]
    */
    Tooltip.prototype.duration = function duration (_) {
      return arguments.length ? (this._duration = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._duration;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the footer accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current footer accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.footer || "";
  }
    */
    Tooltip.prototype.footer = function footer (_) {
      return arguments.length ? (this._footer = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._footer;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the footer styles to the specified values and returns this generator. If *value* is not specified, returns the current footer styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
    "font-size": "12px",
    "font-weight": "400"
  }
    */
    Tooltip.prototype.footerStyle = function footerStyle (_) {
      return arguments.length ? (this._footerStyle = Object.assign(this._footerStyle, _), this) : this._footerStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current height accessor.
        @param {Function|String} [*value* = "auto"]
    */
    Tooltip.prototype.height = function height (_) {
      return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the id accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current id accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d, i) {
    return d.id || "" + i;
  }
    */
    Tooltip.prototype.id = function id (_) {
      return arguments.length ? (this._id = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._id;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the offset accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current offset accessor.
        @param {Function|Number} [*value* = 10]
    */
    Tooltip.prototype.offset = function offset (_) {
      return arguments.length ? (this._offset = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._offset;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the padding accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current padding accessor.
        @param {Function|String} [*value* = "5px"]
    */
    Tooltip.prototype.padding = function padding (_) {
      return arguments.length ? (this._padding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._padding;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.
        @param {Function|String} [*value* = "auto"]
    */
    Tooltip.prototype.pointerEvents = function pointerEvents (_) {
      return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the position accessor to the specified function or array and returns this generator. If *value* is not specified, returns the current position accessor. If *value* is an HTMLElement, positions the Tooltip near that HTMLElement. Otherwise, coordinate points must be in reference to the client viewport, not the overall page.
        @param {Function|Array|HTMLElement} [*value*]
        @example <caption>default accessor</caption>
     function value(d) {
      return [d.x, d.y];
    }
     */
    Tooltip.prototype.position = function position (_) {
      return arguments.length ? (this._position = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._position;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the table styles to the specified values and returns this generator. If *value* is not specified, returns the current table styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "border-spacing": "0",
    "width": "100%"
  }
    */
    Tooltip.prototype.tableStyle = function tableStyle (_) {
      return arguments.length ? (this._tableStyle = Object.assign(this._tableStyle, _), this) : this._tableStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the contents of the table body to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table body data.
        @param {Array} [*value* = []]
    */
    Tooltip.prototype.tbody = function tbody (_) {
      return arguments.length ? (this._tbody = _, this) : this._tbody;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the table body styles to the specified values and returns this generator. If *value* is not specified, returns the current table body styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
    "font-size": "12px",
    "font-weight": "600",
    "text-align": "center"
  }
    */
    Tooltip.prototype.tbodyStyle = function tbodyStyle (_) {
      return arguments.length ? (this._tbodyStyle = Object.assign(this._tbodyStyle, _), this) : this._tbodyStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the contents of the table head to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table head data.
        @param {Array} [*value* = []]
    */
    Tooltip.prototype.thead = function thead (_) {
      return arguments.length ? (this._thead = _, this) : this._thead;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the table head styles to the specified values and returns this generator. If *value* is not specified, returns the current table head styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
    "font-size": "12px",
    "font-weight": "600",
    "text-align": "center"
  }
    */
    Tooltip.prototype.theadStyle = function theadStyle (_) {
      return arguments.length ? (this._theadStyle = Object.assign(this._theadStyle, _), this) : this._theadStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the title accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current title accessor.
        @param {Function|String} [*value*]
        @example <caption>default accessor</caption>
  function value(d) {
    return d.title || "";
  }
    */
    Tooltip.prototype.title = function title (_) {
      return arguments.length ? (this._title = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._title;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the title styles to the specified values and returns this generator. If *value* is not specified, returns the current title styles.
        @param {Object} [*value*]
        @example <caption>default styles</caption>
  {
    "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
    "font-size": "14px",
    "font-weight": "600",
    "padding-bottom": "5px"
  }
    */
    Tooltip.prototype.titleStyle = function titleStyle (_) {
      return arguments.length ? (this._titleStyle = Object.assign(this._titleStyle, _), this) : this._titleStyle;
    };

    /**
        @memberof Tooltip
        @desc If *value* is specified, sets the width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current width accessor.
        @param {Function|String} [*value* = "auto"]
    */
    Tooltip.prototype.width = function width (_) {
      return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
    };

    return Tooltip;
  }(d3plusCommon.BaseClass));

  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-tooltip.js.map
