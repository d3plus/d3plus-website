/*
  d3plus-form v0.2.6
  Javascript rendered input forms.
  Copyright (c) 2017 D3plus - https://d3plus.org
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
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3plus-common')) :
	typeof define === 'function' && define.amd ? define('d3plus-form', ['exports', 'd3-selection', 'd3plus-common'], factory) :
	(factory((global.d3plus = {}),global.d3Selection,global.d3plusCommon));
}(this, (function (exports,d3Selection,d3plusCommon) { 'use strict';

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/
/**
    @class Button
    @extends external:BaseClass
    @desc Creates a set of HTML radio input elements.
*/
var Button = (function (BaseClass$$1) {
  function Button() {

    BaseClass$$1.call(this);

    this._buttonStyle = {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "margin": "0 5px"
    };
    this._data = [];
    this._text = d3plusCommon.accessor("text");
    this._value = d3plusCommon.accessor("value");

  }

  if ( BaseClass$$1 ) Button.__proto__ = BaseClass$$1;
  Button.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Button.prototype.constructor = Button;

  /**
      @memberof Button
      @desc Renders the element to the page.
      @chainable
  */
  Button.prototype.render = function render () {
    var this$1 = this;


    if (this._container === void 0) { this.container(d3Selection.select("body").append("div").node()); }

    var container = this._container.selectAll(("div#d3plus-Form-" + (this._uuid))).data([0]);
    var svg = this._container.node().tagName.toLowerCase() === "foreignobject";

    container = container.enter().append(svg ? "xhtml:div" : "div")
        .attr("id", ("d3plus-Form-" + (this._uuid)))
        .attr("class", "d3plus-Form d3plus-Form-Button")
      .merge(container);

    var button = container.selectAll("button")
      .data(this._data, function (d, i) { return this$1._value(d, i); });

    button.exit().remove();

    button = button.enter().append("button")
        .attr("class", "d3plus-Button")
        .attr("type", "button")
      .merge(button)
        .call(d3plusCommon.stylize, this._buttonStyle)
        .html(function (d, i) { return this$1._text(d, i); });

    for (var event in this$1._on) {
      if ({}.hasOwnProperty.call(this$1._on, event)) { button.on(event, this$1._on[event]); }
    }

    return this;

  };

  /**
      @memberof Button
      @desc Sets the css styles for the <input type="radio"> elements.
      @param {Object} [*value*]
      @chainable
  */
  Button.prototype.buttonStyle = function buttonStyle (_) {
    return arguments.length ? (this._buttonStyle = _, this) : this._buttonStyle;
  };

  /**
      @memberof Button
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Button.prototype.container = function container (_) {
    return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
  };

  /**
      @memberof Radio
      @desc Defines the array of values to be created as <button> tags. If no value is passed, the current array is returned.
      @param {Array} [*value* = []]
      @chainable
  */
  Button.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Button
      @desc Sets the inner text for each <button> element.
      @param {Function|String} [*value* = function(d) { return d.text; }]
      @chainable
  */
  Button.prototype.text = function text (_) {
    return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
  };

  /**
      @memberof Button
      @desc Sets the value for each <button> element.
      @param {Function} [*value* = function(d) { return d.value; }]
      @chainable
  */
  Button.prototype.value = function value (_) {
    return arguments.length ? (this._value = _, this) : this._value;
  };

  return Button;
}(d3plusCommon.BaseClass));

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/
/**
    @class Radio
    @extends external:BaseClass
    @desc Creates a set of HTML radio input elements.
*/
var Radio = (function (BaseClass$$1) {
  function Radio() {

    BaseClass$$1.call(this);

    this._labelStyle = {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "padding-right": "5px"
    };
    this._legendStyle = {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "padding-right": "5px"
    };
    this._options = [];
    this._radioStyle = {
      "margin-right": "10px"
    };
    this._text = d3plusCommon.accessor("text");
    this._value = d3plusCommon.accessor("value");

  }

  if ( BaseClass$$1 ) Radio.__proto__ = BaseClass$$1;
  Radio.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Radio.prototype.constructor = Radio;

  /**
      @memberof Radio
      @desc Renders the element to the page.
      @chainable
  */
  Radio.prototype.render = function render () {
    var this$1 = this;


    if (this._container === void 0) { this.container(d3Selection.select("body").append("div").node()); }
    var that = this;

    var container = this._container.selectAll(("div#d3plus-Form-" + (this._uuid))).data([0]);
    var svg = this._container.node().tagName.toLowerCase() === "foreignobject";

    container = container.enter().append(svg ? "xhtml:div" : "div")
        .attr("id", ("d3plus-Form-" + (this._uuid)))
        .attr("class", "d3plus-Form d3plus-Form-Radio")
      .merge(container);

    var radios = container.selectAll("label")
      .data(this._options, function (d, i) { return this$1._value(d, i); });

    radios.exit()
      .each(function() {
        d3Selection.select(this.nextSibling).remove();
      })
      .remove();

    radios = radios.enter().append("label")
        .attr("class", "d3plus-Label")
        .attr("for", function (d, i) { return ((this$1._uuid) + "-" + (this$1._value(d, i))); })
        .each(function(d, i) {
          var input = document.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("name", ("d3plus-Radio-" + (that._uuid)));
          input.setAttribute("id", ((that._uuid) + "-" + (that._value(d, i))));
          input.setAttribute("value", that._value(d, i));
          this.parentNode.insertBefore(input, this.nextSibling);
        })
      .merge(radios)
        .call(d3plusCommon.stylize, this._labelStyle)
        .html(function (d, i) { return this$1._text(d, i); })
        .each(function(d, i) {
          var checked = that._checked === void 0 ? !i : ("" + (that._value(d, i))) === ("" + (that._checked));
          d3Selection.select(this)
            .classed("active", checked)
            .style("cursor", checked ? "default" : "pointer");
          var input = d3Selection.select(this.nextSibling)
            .property("checked", checked)
            .call(d3plusCommon.stylize, that._radioStyle)
            .style("cursor", checked ? "default" : "pointer")
            .on("change.d3plus", function() {
              that.checked(this.value);
              radios.each(function(d, i) {
                var checked = ("" + (that._value(d, i))) === ("" + (that._checked));
                d3Selection.select(this).classed("active", checked).style("cursor", checked ? "default" : "pointer");
                d3Selection.select(this.nextSibling).style("cursor", checked ? "default" : "pointer");
              });
            });

          for (var event in that._on) {
            if ({}.hasOwnProperty.call(that._on, event)) { input.on(event, that._on[event]); }
          }

        });

    var legend = container.selectAll(("legend#d3plus-Legend-" + (this._uuid)))
      .data(this._legend ? [0] : []);
    legend.exit().remove();
    legend.enter().insert("legend", ".d3plus-Label")
        .attr("id", ("d3plus-Legend-" + (this._uuid)))
        .attr("class", "d3plus-Legend")
      .merge(legend)
        .call(d3plusCommon.stylize, this._legendStyle)
        .html(this._legend);

    return this;

  };

  /**
      @memberof Radio
      @desc Defines the checked input.
      @param {Function} [*value*]
      @chainable
  */
  Radio.prototype.checked = function checked (_) {
    return arguments.length ? (this._checked = _, this) : this._checked;
  };

  /**
      @memberof Radio
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Radio.prototype.container = function container (_) {
    return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
  };

  /**
      @memberof Radio
      @desc Sets the css styles for the <label> element.
      @param {Object} [*value*]
      @chainable
  */
  Radio.prototype.labelStyle = function labelStyle (_) {
    return arguments.length ? (this._labelStyle = _, this) : this._labelStyle;
  };

  /**
      @memberof Radio
      @desc Creates a <legend> tag for the <select> element.
      @param {String} [*value*]
      @chainable
  */
  Radio.prototype.legend = function legend (_) {
    return arguments.length ? (this._legend = _, this) : this._legend;
  };

  /**
      @memberof Radio
      @desc Sets the css styles for the <legend> element.
      @param {Object} [*value*]
      @chainable
  */
  Radio.prototype.legendStyle = function legendStyle (_) {
    return arguments.length ? (this._legendStyle = _, this) : this._legendStyle;
  };

  /**
      @memberof Radio
      @desc Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.
      @param {Array} [*value* = []]
      @chainable
  */
  Radio.prototype.options = function options (_) {
    return arguments.length ? (this._options = _, this) : this._options;
  };

  /**
      @memberof Radio
      @desc Sets the css styles for the <input type="radio"> elements.
      @param {Object} [*value*]
      @chainable
  */
  Radio.prototype.radioStyle = function radioStyle (_) {
    return arguments.length ? (this._radioStyle = _, this) : this._radioStyle;
  };

  /**
      @memberof Radio
      @desc Sets the inner text for each <option> element.
      @param {Function|String} [*value* = function(d) { return d.text; }]
      @chainable
  */
  Radio.prototype.text = function text (_) {
    return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
  };

  /**
      @memberof Radio
      @desc Sets the value for each <option> element.
      @param {Function} [*value* = function(d) { return d.value; }]
      @chainable
  */
  Radio.prototype.value = function value (_) {
    return arguments.length ? (this._value = _, this) : this._value;
  };

  return Radio;
}(d3plusCommon.BaseClass));

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/
/**
    @class Select
    @extends external:BaseClass
    @desc Creates an HTML select element.
*/
var Select = (function (BaseClass$$1) {
  function Select() {

    BaseClass$$1.call(this);

    this._labelStyle = {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "margin-right": "5px"
    };
    this._options = [];
    this._optionStyle = {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px"
    };
    this._selectStyle = {
      "background": "#fafafa",
      "border": "1px solid #ccc",
      "border-radius": "0",
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "outline": "0",
      "padding": "3px 5px 4px"
    };
    this._text = d3plusCommon.accessor("text");
    this._value = d3plusCommon.accessor("value");

  }

  if ( BaseClass$$1 ) Select.__proto__ = BaseClass$$1;
  Select.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Select.prototype.constructor = Select;

  /**
      @memberof Select
      @desc Renders the element to the page.
      @chainable
  */
  Select.prototype.render = function render () {
    var this$1 = this;


    if (this._container === void 0) { this.container(select$$1("body").append("div").node()); }
    var that = this;

    var container = this._container.selectAll(("div#d3plus-Form-" + (this._uuid))).data([0]);
    var svg = this._container.node().tagName.toLowerCase() === "foreignobject";

    container = container.enter().append(svg ? "xhtml:div" : "div")
        .attr("id", ("d3plus-Form-" + (this._uuid)))
        .attr("class", "d3plus-Form d3plus-Form-Select")
      .merge(container);

    var select$$1 = container.selectAll(("select#d3plus-Select-" + (this._uuid))).data([0]);
    select$$1 = select$$1.enter().append("select")
        .attr("id", ("d3plus-Select-" + (this._uuid)))
        .attr("class", "d3plus-Select")
      .merge(select$$1)
        .call(d3plusCommon.stylize, this._selectStyle)
        .on("change.d3plus", function() {
          that.selected(this.value);
        });

    for (var event in this$1._on) {
      if ({}.hasOwnProperty.call(this$1._on, event)) { select$$1.on(event, this$1._on[event]); }
    }

    var options = select$$1.selectAll("option")
      .data(this._options, function (d, i) { return this$1._value(d, i); });

    options.exit().remove();

    options.enter().append("option")
        .attr("class", "d3plus-Option")
      .merge(options)
        .call(d3plusCommon.stylize, this._optionStyle)
        .attr("value", function (d, i) { return this$1._value(d, i); })
        .html(function (d, i) { return this$1._text(d, i); })
        .property("selected", function (d, i) { return this$1._selected === void 0 ? !i : ("" + (this$1._value(d, i))) === ("" + (this$1._selected)); });

    var label = container.selectAll(("label#d3plus-Label-" + (this._uuid)))
      .data(this._label ? [0] : []);
    label.exit().remove();
    label.enter().insert("label", ("#d3plus-Select-" + (this._uuid)))
        .attr("id", ("d3plus-Label-" + (this._uuid)))
        .attr("class", "d3plus-Label")
        .attr("for", ("d3plus-Select-" + (this._uuid)))
      .merge(label)
        .call(d3plusCommon.stylize, this._labelStyle)
        .html(this._label);

    return this;

  };

  /**
      @memberof Select
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Select.prototype.container = function container (_) {
    return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
  };

  /**
      @memberof Select
      @desc Creates a <label> tag for the <select> element.
      @param {String} [*value*]
      @chainable
  */
  Select.prototype.label = function label (_) {
    return arguments.length ? (this._label = _, this) : this._label;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <label> element.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.labelStyle = function labelStyle (_) {
    return arguments.length ? (this._labelStyle = _, this) : this._labelStyle;
  };

  /**
      @memberof Select
      @desc Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.
      @param {Array} [*value* = []]
      @chainable
  */
  Select.prototype.options = function options (_) {
    return arguments.length ? (this._options = _, this) : this._options;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <option> elements.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.optionStyle = function optionStyle (_) {
    return arguments.length ? (this._optionStyle = _, this) : this._optionStyle;
  };

  /**
      @memberof Select
      @desc Defines the selected option.
      @param {Function} [*value*]
      @chainable
  */
  Select.prototype.selected = function selected (_) {
    return arguments.length ? (this._selected = _, this) : this._selected;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <select> element.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.selectStyle = function selectStyle (_) {
    return arguments.length ? (this._selectStyle = _, this) : this._selectStyle;
  };

  /**
      @memberof Select
      @desc Sets the inner text for each <option> element.
      @param {Function|String} [*value* = function(d) { return d.text; }]
      @chainable
  */
  Select.prototype.text = function text (_) {
    return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
  };

  /**
      @memberof Select
      @desc Sets the value for each <option> element.
      @param {Function} [*value* = function(d) { return d.value; }]
      @chainable
  */
  Select.prototype.value = function value (_) {
    return arguments.length ? (this._value = _, this) : this._value;
  };

  return Select;
}(d3plusCommon.BaseClass));

exports.Button = Button;
exports.Radio = Radio;
exports.Select = Select;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-form.js.map
