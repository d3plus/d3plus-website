/*
  d3plus-common v0.6.18
  Common functions and methods used across D3plus modules.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('i18next'), require('d3-array'), require('d3-collection')) :
	typeof define === 'function' && define.amd ? define('d3plus-common', ['exports', 'd3-selection', 'd3-transition', 'i18next', 'd3-array', 'd3-collection'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3Selection,global.d3Transition,global.i18next,global.d3Array,global.d3Collection));
}(this, (function (exports,d3Selection,d3Transition,i18next,d3Array,d3Collection) { 'use strict';

i18next = 'default' in i18next ? i18next['default'] : i18next;

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
var accessor = function(key, def) {
  if (def === void 0) { return function (d) { return d[key]; }; }
  return function (d) { return d[key] === void 0 ? def : d[key]; };
};

/**
    @function isObject
    @desc Detects if a variable is a javascript Object.
    @param {*} item
*/
var isObject = function(item) {
  return item && typeof item === "object" && !Array.isArray(item) && item !== void 0 ? true : false;
};

/**
    @function assign
    @desc A deeply recursive version of `Object.assign`.
    @param {...Object} objects
    @example <caption>this</caption>
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    @example <caption>returns this</caption>
{id: "bar", group: "A", value: 20}
*/
function assign() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];


  var target = objects[0];
  var loop = function ( i ) {

    var source = objects[i];

    Object.keys(source).forEach(function (prop) {

      var value = source[prop];

      if (isObject(value)) {

        if (target.hasOwnProperty(prop) && isObject(target[prop])) { target[prop] = assign(target[prop], value); }
        else { target[prop] = value; }

      }
      else if (Array.isArray(value)) {

        if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {

          var targetArray = target[prop];

          value.forEach(function (sourceItem, itemIndex) {

            if (itemIndex < targetArray.length) {
              var targetItem = targetArray[itemIndex];

              if (Object.is(targetItem, sourceItem)) { return; }

              if (isObject(targetItem) && isObject(sourceItem) || Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                targetArray[itemIndex] = assign(targetItem, sourceItem);
              }
              else { targetArray[itemIndex] = sourceItem; }

            }
            else { targetArray.push(sourceItem); }

          });
        }
        else { target[prop] = value; }

      }
      else { target[prop] = value; }

    });
  };

  for (var i = 1; i < objects.length; i++) loop( i );

  return target;

}

/**
    @function attrize
    @desc Applies each key/value in an object as an attr.
    @param {D3selection} elem The D3 element to apply the styles to.
    @param {Object} attrs An object of key/value attr pairs.
*/
var attrize = function(e, a) {
  if ( a === void 0 ) a = {};

  for (var k in a) { if ({}.hasOwnProperty.call(a, k)) { e.attr(k, a[k]); } }
};

/**
    @function s
    @desc Returns 4 random characters, used for constructing unique identifiers.
    @private
*/
function s() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}


/**
    @class BaseClass
    @summary An abstract class that contains some global methods and functionality.
*/
var BaseClass = function BaseClass() {
  this._on = {};
  this._uuid = "" + (s()) + (s()) + "-" + (s()) + "-" + (s()) + "-" + (s()) + "-" + (s()) + (s()) + (s());
};

/**
    @memberof BaseClass
    @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
    @param {Object} [*value*]
    @chainable
*/
BaseClass.prototype.config = function config (_) {
    var this$1 = this;

  if (arguments.length) {
    for (var k in _) { if ({}.hasOwnProperty.call(_, k) && k in this$1) { this$1[k](_[k]); } }
    return this;
  }
  else {
    var config = {};
    for (var k$1 in this$1.__proto__) { if (k$1.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(k$1)) { config[k$1] = this$1[k$1](); } }
    return config;
  }
};

/**
    @memberof BaseClass
    @desc Adds or removes a *listener* to each object for the specified event *typenames*. If a *listener* is not specified, returns the currently assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
    @param {String} [*typenames*]
    @param {Function} [*listener*]
    @chainable
    @example <caption>By default, listeners apply globally to all objects, however, passing a namespace with the class name gives control over specific elements:</caption>
new Plot
.on("click.Shape", function(d) {
  console.log("data for shape clicked:", d);
})
.on("click.Legend", function(d) {
  console.log("data for legend clicked:", d);
})
*/
BaseClass.prototype.on = function on (_, f) {
  return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
};

/**
    @function closest
    @desc Finds the closest numeric value in an array.
    @param {Number} n The number value to use when searching the array.
    @param {Array} arr The array of values to test against.
*/
var closest = function(n, arr) {
  if ( arr === void 0 ) arr = [];

  if (!arr || !(arr instanceof Array) || !arr.length) { return undefined; }
  return arr.reduce(function (prev, curr) { return Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev; });
};

/**
    @function configPrep
    @desc Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.
    @param {Object} [config = this._shapeConfig] The configuration object to parse.
    @param {String} [type = "shape"] The event classifier to user for "on" events. For example, the default event type of "shape" will apply all events in the "on" config object with that key, like "click.shape" and "mouseleave.shape", in addition to any gloval events like "click" and "mouseleave".
    @param {String} [nest] An optional nested key to bubble up to the parent config level.
*/
function configPrep(config, type, nest) {
  if ( config === void 0 ) config = this._shapeConfig;
  if ( type === void 0 ) type = "shape";
  if ( nest === void 0 ) nest = false;


  var newConfig = {duration: this._duration, on: {}};

  var wrapFunction = function (func) { return function (d, i, s) {
    while (d.__d3plus__ && d.data) {
      i = d.i;
      d = d.data;
    }
    return func(d, i, s);
  }; };

  var parseEvents = function (newObj, on) {

    for (var event in on) {

      if ({}.hasOwnProperty.call(on, event) && !event.includes(".") || event.includes(("." + type))) {

        newObj.on[event] = wrapFunction(on[event]);

      }

    }

  };

  var keyEval = function (newObj, obj) {

    for (var key in obj) {

      if ({}.hasOwnProperty.call(obj, key)) {

        if (key === "on") { parseEvents(newObj, obj[key]); }
        else if (typeof obj[key] === "function") {
          newObj[key] = wrapFunction(obj[key]);
        }
        else if (typeof obj[key] === "object" && !(obj instanceof Array)) {
          newObj[key] = {on: {}};
          keyEval(newObj[key], obj[key]);
        }
        else { newObj[key] = obj[key]; }

      }

    }

  };

  keyEval(newConfig, config);
  if (this._on) { parseEvents(newConfig, this._on); }

  if (nest && config[nest]) { newConfig = assign(newConfig, config[nest]); }
  return newConfig;

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
var constant = function(value) {
  return function constant() {
    return value;
  };
};

/**
    @function elem
    @desc Manages the enter/update/exit pattern for a single DOM element.
    @param {String} selector A D3 selector, which must include the tagname and a class and/or ID.
    @param {Object} params Additional parameters.
    @param {Boolean} [params.condition = true] Whether or not the element should be rendered (or removed).
    @param {Object} [params.enter = {}] A collection of key/value pairs that map to attributes to be given on enter.
    @param {Object} [params.exit = {}] A collection of key/value pairs that map to attributes to be given on exit.
    @param {D3Selection} [params.parent = d3.select("body")] The parent element for this new element to be appended to.
    @param {D3Transition} [params.transition = d3.transition().duration(0)] The transition to use when animated the different life cycle stages.
    @param {Object} [params.update = {}] A collection of key/value pairs that map to attributes to be given on update.
*/
var elem = function(selector, p) {

  // overrides default params
  p = Object.assign({}, {
    condition: true,
    enter: {},
    exit: {},
    parent: d3Selection.select("body"),
    transition: d3Transition.transition().duration(0),
    update: {}
  }, p);

  var className = (/\.([^#]+)/g).exec(selector),
        id = (/#([^\.]+)/g).exec(selector),
        tag = (/^([^.^#]+)/g).exec(selector)[1];

  var elem = p.parent.selectAll(selector.includes(":") ? selector.split(":")[1] : selector)
    .data(p.condition ? [null] : []);

  var enter = elem.enter().append(tag).call(attrize, p.enter);

  if (id) { enter.attr("id", id[1]); }
  if (className) { enter.attr("class", className[1]); }

  elem.exit().transition(p.transition).call(attrize, p.exit).remove();

  var update = enter.merge(elem);
  update.transition(p.transition).call(attrize, p.update);

  return update;

};

var Back = "Back";
var Total = "Total";
var array = {"lowercase":["a","an","and","as","at","but","by","for","from","if","in","into","near","nor","of","on","onto","or","per","that","the","to","with","via","vs","vs."],"uppercase":["CEO","CFO","CNC","COO","CPU","GDP","HVAC","ID","IT","R&D","TV","UI"]};
var enUS = {
	Back: Back,
	Total: Total,
	array: array
};

var Back$1 = "Atrás";
var Total$1 = "Total";
var array$1 = {"lowercase":["una","y","en","pero","en","de","o","el","la","los","las","para","a","con"],"uppercase":["CEO","CFO","CNC","COO","CPU","PIB","HVAC","ID","TI","I&D","TV","UI"]};
var esES = {
	Back: Back$1,
	Total: Total$1,
	array: array$1
};

var namespace = "d3plus";
var locale = i18next.init({
  fallbackLng: "en-US",
  defaultNS: namespace,
  fallbackNS: namespace,
  initImmediate: false,
  ns: namespace,
  resources: {
    "en-US": ( obj = {}, obj[namespace] = enUS, obj ),
    "es-ES": ( obj$1 = {}, obj$1[namespace] = esES, obj$1 )
  }
});
var obj;
var obj$1;

/**
    @function merge
    @desc Combines an Array of Objects together and returns a new Object.
    @param {Array} objects The Array of objects to be merged together.
    @param {Object} aggs An object containing specific aggregation methods (functions) for each key type. By default, numbers are summed and strings are returned as an array of unique values.
    @example <caption>this</caption>
merge([
  {id: "foo", group: "A", value: 10, links: [1, 2]},
  {id: "bar", group: "A", value: 20, links: [1, 3]}
]);
    @example <caption>returns this</caption>
{id: ["bar", "foo"], group: "A", value: 30, links: [1, 2, 3]}
*/
function objectMerge(objects, aggs) {
  if ( aggs === void 0 ) aggs = {};


  var availableKeys = new Set(d3Array.merge(objects.map(function (o) { return d3Collection.keys(o); }))),
        newObject = {};

  availableKeys.forEach(function (k) {
    var values = objects.map(function (o) { return o[k]; });
    var value;
    if (aggs[k]) { value = aggs[k](values); }
    else {
      var types = values.map(function (v) { return v || v === false ? v.constructor : v; }).filter(function (v) { return v !== void 0; });
      if (!types.length) { value = undefined; }
      else if (types.indexOf(Array) >= 0) {
        value = d3Array.merge(values.map(function (v) { return v instanceof Array ? v : [v]; }));
        value = Array.from(new Set(value));
        if (value.length === 1) { value = value[0]; }
      }
      else if (types.indexOf(String) >= 0) {
        value = Array.from(new Set(values));
        if (value.length === 1) { value = value[0]; }
      }
      else if (types.indexOf(Number) >= 0) { value = d3Array.sum(values); }
      else if (types.indexOf(Object) >= 0) { value = objectMerge(values.filter(function (v) { return v; })); }
      else {
        value = Array.from(new Set(values.filter(function (v) { return v !== void 0; })));
        if (value.length === 1) { value = value[0]; }
      }
    }
    newObject[k] = value;
  });

  return newObject;

}

/**
    @function prefix
    @desc Returns the appropriate CSS vendor prefix, given the current browser.
*/
var prefix = function() {
  if ("-webkit-transform" in document.body.style) { return "-webkit-"; }
  else if ("-moz-transform" in document.body.style) { return "-moz-"; }
  else if ("-ms-transform" in document.body.style) { return "-ms-"; }
  else if ("-o-transform" in document.body.style) { return "-o-"; }
  else { return ""; }
};

/**
    @function stylize
    @desc Applies each key/value in an object as a style.
    @param {D3selection} elem The D3 element to apply the styles to.
    @param {Object} styles An object of key/value style pairs.
*/
var stylize = function(e, s) {
  if ( s === void 0 ) s = {};

  for (var k in s) { if ({}.hasOwnProperty.call(s, k)) { e.style(k, s[k]); } }
};

exports.accessor = accessor;
exports.assign = assign;
exports.attrize = attrize;
exports.BaseClass = BaseClass;
exports.closest = closest;
exports.configPrep = configPrep;
exports.constant = constant;
exports.elem = elem;
exports.isObject = isObject;
exports.locale = locale;
exports.merge = objectMerge;
exports.prefix = prefix;
exports.stylize = stylize;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-common.js.map
