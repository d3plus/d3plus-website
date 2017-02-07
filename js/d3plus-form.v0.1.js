/*
  d3plus-form v0.1.0
  Javascript rendered input forms.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3plus-common')) :
	typeof define === 'function' && define.amd ? define('d3plus-form', ['exports', 'd3-selection', 'd3plus-common'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3Selection,global.d3plusCommon));
}(this, (function (exports,d3Selection,d3plusCommon) { 'use strict';

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
      "font-family": "Verdana",
      "font-size": "12px",
      "margin-right": "5px"
    };
    this._options = [];
    this._optionStyle = {
      "font-family": "Verdana",
      "font-size": "12px"
    };
    this._selectStyle = ( obj = {
      "background": "#fafafa",
      "border": "1px solid #ccc",
      "border-radius": "0",
      "font-family": "Verdana",
      "font-size": "12px",
      "outline": "0",
      "padding": "3px 5px 4px"
    }, obj[((d3plusCommon.prefix()) + "appearance")] = "none", obj );
    var obj;
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


    if (this._container === void 0) { this.container(d3Selection.select("body").append("div").node()); }
    var that = this;

    var container = this._container.selectAll(("select#d3plus-Select-" + (this._uuid))).data([0]);
    container = container.enter().append("select")
        .attr("id", ("d3plus-Select-" + (this._uuid)))
        .attr("class", "d3plus-Select")
      .merge(container)
        .call(d3plusCommon.stylize, this._selectStyle)
        .on("change.d3plus", function() {
          that.selected(this.value);
        });

    for (var event in this$1._on) {
      if ({}.hasOwnProperty.call(this$1._on, event)) { container.on(event, this$1._on[event]); }
    }

    var options = container.selectAll("option")
      .data(this._options, function (d, i) { return this$1._value(d, i); });

    options.exit().remove();

    options.enter().append("option")
        .attr("class", "d3plus-Option")
      .merge(options)
        .call(d3plusCommon.stylize, this._optionStyle)
        .attr("value", function (d, i) { return this$1._value(d, i); })
        .html(function (d, i) { return this$1._text(d, i); })
        .property("selected", function (d, i) { return this$1._selected === void 0 ? !i : ("" + (this$1._value(d, i))) === ("" + (this$1._selected)); });

    var label = this._container.selectAll(("select#d3plus-Label-" + (this._uuid))).data(this._label ? [0] : []);
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

exports.Select = Select;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-form.js.map
