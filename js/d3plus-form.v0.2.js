/*
  d3plus-form v0.2.8
  Javascript rendered input forms.
  Copyright (c) 2019 D3plus - https://d3plus.org
  @license MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3plus-common')) :
  typeof define === 'function' && define.amd ? define('d3plus-form', ['exports', 'd3-selection', 'd3plus-common'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Selection, global.d3plusCommon));
}(this, function (exports, d3Selection, d3plusCommon) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /**
      @class Button
      @extends external:BaseClass
      @desc Creates a set of HTML radio input elements.
  */

  var Button =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Button, _BaseClass);

    /**
        @memberof Button
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Button() {
      var _this;

      _classCallCheck(this, Button);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));
      _this._buttonStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "margin": "0 5px"
      };
      _this._data = [];
      _this._text = d3plusCommon.accessor("text");
      _this._value = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        @memberof Button
        @desc Renders the element to the page.
        @chainable
    */


    _createClass(Button, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this._container === void 0) this.container(d3Selection.select("body").append("div").node());

        var container = this._container.selectAll("div#d3plus-Form-".concat(this._uuid)).data([0]);

        var svg = this._container.node().tagName.toLowerCase() === "foreignobject";
        container = container.enter().append(svg ? "xhtml:div" : "div").attr("id", "d3plus-Form-".concat(this._uuid)).attr("class", "d3plus-Form d3plus-Form-Button").merge(container);
        var button = container.selectAll("button").data(this._data, function (d, i) {
          return _this2._value(d, i);
        });
        button.exit().remove();
        button = button.enter().append("button").attr("class", "d3plus-Button").attr("type", "button").merge(button).call(d3plusCommon.stylize, this._buttonStyle).html(function (d, i) {
          return _this2._text(d, i);
        });

        for (var event in this._on) {
          if ({}.hasOwnProperty.call(this._on, event)) button.on(event, this._on[event]);
        }

        return this;
      }
      /**
          @memberof Button
          @desc Sets the css styles for the <input type="radio"> elements.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "buttonStyle",
      value: function buttonStyle(_) {
        return arguments.length ? (this._buttonStyle = _, this) : this._buttonStyle;
      }
      /**
          @memberof Button
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
          @param {String|HTMLElement} [*selector*]
          @chainable
      */

    }, {
      key: "container",
      value: function container(_) {
        return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
      }
      /**
          @memberof Radio
          @desc Defines the array of values to be created as <button> tags. If no value is passed, the current array is returned.
          @param {Array} [*value* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Button
          @desc Sets the inner text for each <button> element.
          @param {Function|String} [*value* = function(d) { return d.text; }]
          @chainable
      */

    }, {
      key: "text",
      value: function text(_) {
        return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
      }
      /**
          @memberof Button
          @desc Sets the value for each <button> element.
          @param {Function} [*value* = function(d) { return d.value; }]
          @chainable
      */

    }, {
      key: "value",
      value: function value(_) {
        return arguments.length ? (this._value = _, this) : this._value;
      }
    }]);

    return Button;
  }(d3plusCommon.BaseClass);

  /**
      @class Radio
      @extends external:BaseClass
      @desc Creates a set of HTML radio input elements.
  */

  var Radio =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Radio, _BaseClass);

    /**
        @memberof Radio
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Radio() {
      var _this;

      _classCallCheck(this, Radio);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Radio).call(this));
      _this._labelStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "padding-right": "5px"
      };
      _this._legendStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "padding-right": "5px"
      };
      _this._options = [];
      _this._radioStyle = {
        "margin-right": "10px"
      };
      _this._text = d3plusCommon.accessor("text");
      _this._value = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        @memberof Radio
        @desc Renders the element to the page.
        @chainable
    */


    _createClass(Radio, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this._container === void 0) this.container(d3Selection.select("body").append("div").node());
        var that = this;

        var container = this._container.selectAll("div#d3plus-Form-".concat(this._uuid)).data([0]);

        var svg = this._container.node().tagName.toLowerCase() === "foreignobject";
        container = container.enter().append(svg ? "xhtml:div" : "div").attr("id", "d3plus-Form-".concat(this._uuid)).attr("class", "d3plus-Form d3plus-Form-Radio").merge(container);
        var radios = container.selectAll("label").data(this._options, function (d, i) {
          return _this2._value(d, i);
        });
        radios.exit().each(function () {
          d3Selection.select(this.nextSibling).remove();
        }).remove();
        radios = radios.enter().append("label").attr("class", "d3plus-Label").attr("for", function (d, i) {
          return "".concat(_this2._uuid, "-").concat(_this2._value(d, i));
        }).each(function (d, i) {
          var input = document.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("name", "d3plus-Radio-".concat(that._uuid));
          input.setAttribute("id", "".concat(that._uuid, "-").concat(that._value(d, i)));
          input.setAttribute("value", that._value(d, i));
          this.parentNode.insertBefore(input, this.nextSibling);
        }).merge(radios).call(d3plusCommon.stylize, this._labelStyle).html(function (d, i) {
          return _this2._text(d, i);
        }).each(function (d, i) {
          var checked = that._checked === void 0 ? !i : "".concat(that._value(d, i)) === "".concat(that._checked);
          d3Selection.select(this).classed("active", checked).style("cursor", checked ? "default" : "pointer");
          var input = d3Selection.select(this.nextSibling).property("checked", checked).call(d3plusCommon.stylize, that._radioStyle).style("cursor", checked ? "default" : "pointer").on("change.d3plus", function () {
            that.checked(this.value);
            radios.each(function (d, i) {
              var checked = "".concat(that._value(d, i)) === "".concat(that._checked);
              d3Selection.select(this).classed("active", checked).style("cursor", checked ? "default" : "pointer");
              d3Selection.select(this.nextSibling).style("cursor", checked ? "default" : "pointer");
            });
          });

          for (var event in that._on) {
            if ({}.hasOwnProperty.call(that._on, event)) input.on(event, that._on[event]);
          }
        });
        var legend = container.selectAll("legend#d3plus-Legend-".concat(this._uuid)).data(this._legend ? [0] : []);
        legend.exit().remove();
        legend.enter().insert("legend", ".d3plus-Label").attr("id", "d3plus-Legend-".concat(this._uuid)).attr("class", "d3plus-Legend").merge(legend).call(d3plusCommon.stylize, this._legendStyle).html(this._legend);
        return this;
      }
      /**
          @memberof Radio
          @desc Defines the checked input.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "checked",
      value: function checked(_) {
        return arguments.length ? (this._checked = _, this) : this._checked;
      }
      /**
          @memberof Radio
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
          @param {String|HTMLElement} [*selector*]
          @chainable
      */

    }, {
      key: "container",
      value: function container(_) {
        return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
      }
      /**
          @memberof Radio
          @desc Sets the css styles for the <label> element.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "labelStyle",
      value: function labelStyle(_) {
        return arguments.length ? (this._labelStyle = _, this) : this._labelStyle;
      }
      /**
          @memberof Radio
          @desc Creates a <legend> tag for the <select> element.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "legend",
      value: function legend(_) {
        return arguments.length ? (this._legend = _, this) : this._legend;
      }
      /**
          @memberof Radio
          @desc Sets the css styles for the <legend> element.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "legendStyle",
      value: function legendStyle(_) {
        return arguments.length ? (this._legendStyle = _, this) : this._legendStyle;
      }
      /**
          @memberof Radio
          @desc Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.
          @param {Array} [*value* = []]
          @chainable
      */

    }, {
      key: "options",
      value: function options(_) {
        return arguments.length ? (this._options = _, this) : this._options;
      }
      /**
          @memberof Radio
          @desc Sets the css styles for the <input type="radio"> elements.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "radioStyle",
      value: function radioStyle(_) {
        return arguments.length ? (this._radioStyle = _, this) : this._radioStyle;
      }
      /**
          @memberof Radio
          @desc Sets the inner text for each <option> element.
          @param {Function|String} [*value* = function(d) { return d.text; }]
          @chainable
      */

    }, {
      key: "text",
      value: function text(_) {
        return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
      }
      /**
          @memberof Radio
          @desc Sets the value for each <option> element.
          @param {Function} [*value* = function(d) { return d.value; }]
          @chainable
      */

    }, {
      key: "value",
      value: function value(_) {
        return arguments.length ? (this._value = _, this) : this._value;
      }
    }]);

    return Radio;
  }(d3plusCommon.BaseClass);

  /**
      @class Select
      @extends external:BaseClass
      @desc Creates an HTML select element.
  */

  var Select =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Select, _BaseClass);

    /**
        @memberof Select
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Select() {
      var _this;

      _classCallCheck(this, Select);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this));
      _this._labelStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "margin-right": "5px"
      };
      _this._options = [];
      _this._optionStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px"
      };
      _this._selectStyle = {
        "background": "#fafafa",
        "border": "1px solid #ccc",
        "border-radius": "0",
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "outline": "0",
        "padding": "3px 5px 4px"
      };
      _this._text = d3plusCommon.accessor("text");
      _this._value = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        @memberof Select
        @desc Renders the element to the page.
        @chainable
    */


    _createClass(Select, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this._container === void 0) this.container(select("body").append("div").node());
        var that = this;

        var container = this._container.selectAll("div#d3plus-Form-".concat(this._uuid)).data([0]);

        var svg = this._container.node().tagName.toLowerCase() === "foreignobject";
        container = container.enter().append(svg ? "xhtml:div" : "div").attr("id", "d3plus-Form-".concat(this._uuid)).attr("class", "d3plus-Form d3plus-Form-Select").merge(container);
        var select = container.selectAll("select#d3plus-Select-".concat(this._uuid)).data([0]);
        select = select.enter().append("select").attr("id", "d3plus-Select-".concat(this._uuid)).attr("class", "d3plus-Select").merge(select).call(d3plusCommon.stylize, this._selectStyle).on("change.d3plus", function () {
          that.selected(this.value);
        });

        for (var event in this._on) {
          if ({}.hasOwnProperty.call(this._on, event)) select.on(event, this._on[event]);
        }

        var options = select.selectAll("option").data(this._options, function (d, i) {
          return _this2._value(d, i);
        });
        options.exit().remove();
        options.enter().append("option").attr("class", "d3plus-Option").merge(options).call(d3plusCommon.stylize, this._optionStyle).attr("value", function (d, i) {
          return _this2._value(d, i);
        }).html(function (d, i) {
          return _this2._text(d, i);
        }).property("selected", function (d, i) {
          return _this2._selected === void 0 ? !i : "".concat(_this2._value(d, i)) === "".concat(_this2._selected);
        });
        var label = container.selectAll("label#d3plus-Label-".concat(this._uuid)).data(this._label ? [0] : []);
        label.exit().remove();
        label.enter().insert("label", "#d3plus-Select-".concat(this._uuid)).attr("id", "d3plus-Label-".concat(this._uuid)).attr("class", "d3plus-Label").attr("for", "d3plus-Select-".concat(this._uuid)).merge(label).call(d3plusCommon.stylize, this._labelStyle).html(this._label);
        return this;
      }
      /**
          @memberof Select
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
          @param {String|HTMLElement} [*selector*]
          @chainable
      */

    }, {
      key: "container",
      value: function container(_) {
        return arguments.length ? (this._container = d3Selection.select(_), this) : this._container;
      }
      /**
          @memberof Select
          @desc Creates a <label> tag for the <select> element.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "label",
      value: function label(_) {
        return arguments.length ? (this._label = _, this) : this._label;
      }
      /**
          @memberof Select
          @desc Sets the css styles for the <label> element.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "labelStyle",
      value: function labelStyle(_) {
        return arguments.length ? (this._labelStyle = _, this) : this._labelStyle;
      }
      /**
          @memberof Select
          @desc Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.
          @param {Array} [*value* = []]
          @chainable
      */

    }, {
      key: "options",
      value: function options(_) {
        return arguments.length ? (this._options = _, this) : this._options;
      }
      /**
          @memberof Select
          @desc Sets the css styles for the <option> elements.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "optionStyle",
      value: function optionStyle(_) {
        return arguments.length ? (this._optionStyle = _, this) : this._optionStyle;
      }
      /**
          @memberof Select
          @desc Defines the selected option.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "selected",
      value: function selected(_) {
        return arguments.length ? (this._selected = _, this) : this._selected;
      }
      /**
          @memberof Select
          @desc Sets the css styles for the <select> element.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "selectStyle",
      value: function selectStyle(_) {
        return arguments.length ? (this._selectStyle = _, this) : this._selectStyle;
      }
      /**
          @memberof Select
          @desc Sets the inner text for each <option> element.
          @param {Function|String} [*value* = function(d) { return d.text; }]
          @chainable
      */

    }, {
      key: "text",
      value: function text(_) {
        return arguments.length ? (this._text = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._text;
      }
      /**
          @memberof Select
          @desc Sets the value for each <option> element.
          @param {Function} [*value* = function(d) { return d.value; }]
          @chainable
      */

    }, {
      key: "value",
      value: function value(_) {
        return arguments.length ? (this._value = _, this) : this._value;
      }
    }]);

    return Select;
  }(d3plusCommon.BaseClass);

  exports.Button = Button;
  exports.Radio = Radio;
  exports.Select = Select;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$1();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else hide(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      hide(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var nativeAssign = Object.assign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)
	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	var nativeStartsWith = ''.startsWith;
	var min$2 = Math.min;

	// `String.prototype.startsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('startsWith') }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = String(requireObjectCoercible(this));
	    notARegexp(searchString);
	    var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

	if (typeof window !== "undefined") {
	  (function () {
	    var serializeXML = function (node, output) {
	      var nodeType = node.nodeType;
	      if (nodeType === 3) {
	        output.push(node.textContent.replace(/&/, '&amp;').replace(/</, '&lt;').replace('>', '&gt;'));
	      } else if (nodeType === 1) {
	        output.push('<', node.tagName);
	        if (node.hasAttributes()) {
	          [].forEach.call(node.attributes, function(attrNode){
	            output.push(' ', attrNode.item.name, '=\'', attrNode.item.value, '\'');
	          });
	        }
	        if (node.hasChildNodes()) {
	          output.push('>');
	          [].forEach.call(node.childNodes, function(childNode){
	            serializeXML(childNode, output);
	          });
	          output.push('</', node.tagName, '>');
	        } else {
	          output.push('/>');
	        }
	      } else if (nodeType == 8) {
	        output.push('<!--', node.nodeValue, '-->');
	      }
	    };

	    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
	      get: function () {
	        var output = [];
	        var childNode = this.firstChild;
	        while (childNode) {
	          serializeXML(childNode, output);
	          childNode = childNode.nextSibling;
	        }
	        return output.join('');
	      },
	      set: function (markupText) {
	        while (this.firstChild) {
	          this.removeChild(this.firstChild);
	        }

	        try {
	          var dXML = new DOMParser();
	          dXML.async = false;

	          var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markupText + '</svg>';
	          var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;

	          var childNode = svgDocElement.firstChild;
	          while (childNode) {
	            this.appendChild(this.ownerDocument.importNode(childNode, true));
	            childNode = childNode.nextSibling;
	          }
	        } catch (e) {}      }
	    });

	    Object.defineProperty(SVGElement.prototype, 'innerSVG', {
	      get: function () {
	        return this.innerHTML;
	      },
	      set: function (markup) {
	        this.innerHTML = markup;
	      }
	    });

	  })();
	}

}));
//# sourceMappingURL=d3plus-form.js.map
