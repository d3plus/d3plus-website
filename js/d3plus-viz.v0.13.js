function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  d3plus-viz v0.13.5
  Abstract ES6 class that drives d3plus visualizations.
  Copyright (c) 2021 D3plus - https://d3plus.org
  @license MIT
*/
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function require(path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global_1 = // eslint-disable-next-line no-undef
  check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == 'object' && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window) || check((typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self) || check(_typeof(commonjsGlobal) == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
  function () {
    return this;
  }() || Function('return this')();

  var fails = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  }; // Thank's IE8 for his funny defineProperty


  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1] != 7;
  });
  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;
  var objectPropertyIsEnumerable = {
    f: f
  };

  var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function classofRaw(it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object; // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  }; // toObject with fallback for non-array-like ES3 strings


  var toIndexedObject = function toIndexedObject(it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function isObject(it) {
    return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
  }; // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string


  var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function has(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function documentCreateElement(it) {
    return EXISTS ? document$1.createElement(it) : {};
  }; // Thank's IE8 for his funny defineProperty


  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });
  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
    f: f$1
  };

  var anObject = function anObject(it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty

  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
    f: f$2
  };
  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function setGlobal(key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }

    return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});
  var sharedStore = store;
  var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;
  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));
  var shared = createCommonjsModule(function (module) {
    (module.exports = function (key, value) {
      return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.8.1',
      mode: 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
  });
  var id = 0;
  var postfix = Math.random();

  var uid = function uid(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function sharedKey(key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};
  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function enforce(it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;

    set = function set(it, metadata) {
      metadata.facade = it;
      wmset.call(store$1, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget.call(store$1, it) || {};
    };

    has$1 = function has$1(it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;

    set = function set(it, metadata) {
      metadata.facade = it;
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return has(it, STATE) ? it[STATE] : {};
    };

    has$1 = function has$1(it) {
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
    var TEMPLATE = String(String).split('String');
    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;
      var state;

      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) {
          createNonEnumerableProperty(value, 'name', key);
        }

        state = enforceInternalState(value);

        if (!state.source) {
          state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
      }

      if (O === global_1) {
        if (simple) O[key] = value;else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }

      if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
    });
  });
  var path = global_1;

  var aFunction = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger

  var toInteger = function toInteger(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min; // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength

  var toLength = function toLength(argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  }; // `Array.prototype.{ indexOf, includes }` methods implementation


  var createMethod = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
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

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has(hiddenKeys, key) && has(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  }; // IE8- don't enum bug keys


  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
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
  }; // all object keys, includes non-enumerable and symbols

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function copyConstructorProperties(target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function isForced(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
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

  var _export = function _export(options, source) {
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

      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (_typeof(sourceProperty) === _typeof(targetProperty)) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      } // extend global


      redefine(target, key, sourceProperty, options);
    }
  };

  var aFunction$1 = function aFunction$1(it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  }; // optional / simple context binding


  var functionBindContext = function functionBindContext(fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  }; // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject


  var toObject = function toObject(argument) {
    return Object(requireObjectCoercible(argument));
  }; // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray


  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });
  var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
  && !Symbol.sham // eslint-disable-next-line no-undef
  && _typeof(Symbol.iterator) == 'symbol';
  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function wellKnownSymbol(name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }

    return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate = function arraySpeciesCreate(originalArray, length) {
    var C;

    if (isArray(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }

    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

  var createMethod$1 = function createMethod$1(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);

          if (TYPE) {
            if (IS_MAP) target[index] = result; // map
            else if (result) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return value;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  push.call(target, value);
                // filter
              } else switch (TYPE) {
                case 4:
                  return false;
                // every

                case 7:
                  push.call(target, value);
                // filterOut
              }
          }
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
    findIndex: createMethod$1(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$1(7)
  }; // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys

  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  }; // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties


  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) {
      objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    }

    return O;
  };
  var html = getBuiltIn('document', 'documentElement');
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function EmptyConstructor() {
    /* empty */
  };

  var scriptTag = function scriptTag(content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var _NullProtoObject = function NullProtoObject() {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    _NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;

    while (length--) {
      delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    }

    return _NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true; // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O;
    } else result = _NullProtoObject();

    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables = function addToUnscopables(key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var defineProperty = Object.defineProperty;
  var cache = {};

  var thrower = function thrower(it) {
    throw it;
  };

  var arrayMethodUsesToLength = function arrayMethodUsesToLength(METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;
    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = {
        length: -1
      };
      if (ACCESSORS) defineProperty(O, 1, {
        enumerable: true,
        get: thrower
      });else O[1] = 1;
      method.call(O, argument0, argument1);
    });
  };

  var $find = arrayIteration.find;
  var FIND = 'find';
  var SKIPS_HOLES = true;
  var USES_TO_LENGTH = arrayMethodUsesToLength(FIND); // Shouldn't skip holes

  if (FIND in []) Array(1)[FIND](function () {
    SKIPS_HOLES = false;
  }); // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find

  _export({
    target: 'Array',
    proto: true,
    forced: SKIPS_HOLES || !USES_TO_LENGTH
  }, {
    find: function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables


  addToUnscopables(FIND);
  var $includes = arrayIncludes.includes;
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', {
    ACCESSORS: true,
    1: 0
  }); // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes

  _export({
    target: 'Array',
    proto: true,
    forced: !USES_TO_LENGTH$1
  }, {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables


  addToUnscopables('includes');
  var nativeAssign = Object.assign;
  var defineProperty$1 = Object.defineProperty; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign

  var objectAssign = !nativeAssign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && nativeAssign({
      b: 1
    }, nativeAssign(defineProperty$1({}, 'a', {
      enumerable: true,
      get: function get() {
        defineProperty$1(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), {
      b: 2
    })).b !== 1) return true; // should work with symbols and should have deterministic property order (V8 bug)

    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
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
    }

    return T;
  } : nativeAssign; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign

  _export({
    target: 'Object',
    stat: true,
    forced: Object.assign !== objectAssign
  }, {
    assign: objectAssign
  });

  var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp

  var isRegexp = function isRegexp(it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function notARegexp(it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    }

    return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function correctIsRegexpLogic(METHOD_NAME) {
    var regexp = /./;

    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }

    return false;
  }; // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes


  _export({
    target: 'String',
    proto: true,
    forced: !correctIsRegexpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var nativeStartsWith = ''.startsWith;
  var min$2 = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith'); // https://github.com/zloirock/core-js/pull/702

  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }(); // `String.prototype.startsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.startswith

  _export({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
  }, {
    startsWith: function startsWith(searchString
    /* , position = 0 */
    ) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });

  if (typeof window !== "undefined") {
    (function () {
      try {
        if (typeof SVGElement === 'undefined' || Boolean(SVGElement.prototype.innerHTML)) {
          return;
        }
      } catch (e) {
        return;
      }

      function serializeNode(node) {
        switch (node.nodeType) {
          case 1:
            return serializeElementNode(node);

          case 3:
            return serializeTextNode(node);

          case 8:
            return serializeCommentNode(node);
        }
      }

      function serializeTextNode(node) {
        return node.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function serializeCommentNode(node) {
        return '<!--' + node.nodeValue + '-->';
      }

      function serializeElementNode(node) {
        var output = '';
        output += '<' + node.tagName;

        if (node.hasAttributes()) {
          [].forEach.call(node.attributes, function (attrNode) {
            output += ' ' + attrNode.name + '="' + attrNode.value + '"';
          });
        }

        output += '>';

        if (node.hasChildNodes()) {
          [].forEach.call(node.childNodes, function (childNode) {
            output += serializeNode(childNode);
          });
        }

        output += '</' + node.tagName + '>';
        return output;
      }

      Object.defineProperty(SVGElement.prototype, 'innerHTML', {
        get: function get() {
          var output = '';
          [].forEach.call(this.childNodes, function (childNode) {
            output += serializeNode(childNode);
          });
          return output;
        },
        set: function set(markup) {
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }

          try {
            var dXML = new DOMParser();
            dXML.async = false;
            var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markup + '</svg>';
            var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;
            [].forEach.call(svgDocElement.childNodes, function (childNode) {
              this.appendChild(this.ownerDocument.importNode(childNode, true));
            }.bind(this));
          } catch (e) {
            throw new Error('Error parsing markup string');
          }
        }
      });
      Object.defineProperty(SVGElement.prototype, 'innerSVG', {
        get: function get() {
          return this.innerHTML;
        },
        set: function set(markup) {
          this.innerHTML = markup;
        }
      });
    })();
  }
});

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-request'), require('d3-array'), require('d3-brush'), require('d3-color'), require('d3-collection'), require('d3-queue'), require('d3-selection'), require('d3-transition'), require('d3-zoom'), require('lrucache'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-form'), require('d3plus-format'), require('d3plus-legend'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip'), require('d3plus-export')) : typeof define === 'function' && define.amd ? define('d3plus-viz', ['exports', 'd3-request', 'd3-array', 'd3-brush', 'd3-color', 'd3-collection', 'd3-queue', 'd3-selection', 'd3-transition', 'd3-zoom', 'lrucache', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-form', 'd3plus-format', 'd3plus-legend', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip', 'd3plus-export'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3plus = {}, global.d3Request, global.d3Array, global.d3Brush, global.d3Color, global.d3Collection, global.d3Queue, global.d3Selection, global.d3Transition, global.d3Zoom, global.lrucache, global.d3plusAxis, global.d3plusColor, global.d3plusCommon, global.d3plusForm, global.d3plusFormat, global.d3plusLegend, global.d3plusText, global.d3plusTimeline, global.d3plusTooltip, global.d3plusExport));
})(this, function (exports, d3Request, d3Array, d3Brush, d3Color, d3Collection, d3Queue, d3Selection, d3Transition, d3Zoom, lrucache, d3plusAxis, d3plusColor, d3plusCommon, d3plusForm, d3plusFormat, d3plusLegend, d3plusText, d3plusTimeline, d3plusTooltip, d3plusExport) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && _typeof(e) === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var lrucache__default = /*#__PURE__*/_interopDefaultLegacy(lrucache);
  /**
    @function dataConcat
    @desc Reduce and concat all the elements included in arrayOfArrays if they are arrays. If it is a JSON object try to concat the array under given key data. If the key doesn't exists in object item, a warning message is lauched to the console. You need to implement DataFormat callback to concat the arrays manually.
    @param {Array} arrayOfArray Array of elements
    @param {String} [data = "data"] The key used for the flat data array if exists inside of the JSON object.
  */


  var concat = function concat(arrayOfArrays) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data";
    return arrayOfArrays.reduce(function (acc, item) {
      var dataArray = [];

      if (Array.isArray(item)) {
        dataArray = item;
      } else {
        if (item[data]) {
          dataArray = item[data];
        } else {
          console.warn("d3plus-viz: Please implement a \"dataFormat\" callback to concat the arrays manually (consider using the d3plus.dataConcat method in your callback). Currently unable to concatenate (using key: \"".concat(data, "\") the following response:"), item);
        }
      }

      return acc.concat(dataArray);
    }, []);
  };
  /**
    @function isData
    @desc Returns true/false whether the argument provided to the function should be loaded using an internal XHR request. Valid data can either be a string URL or an Object with "url" and "headers" keys.
    @param {*} dataItem The value to be tested
  */


  var isData = function isData(dataItem) {
    return typeof dataItem === "string" || _typeof(dataItem) === "object" && dataItem.url && dataItem.headers;
  };
  /**
    @function dataFold
    @desc Given a JSON object where the data values and headers have been split into separate key lookups, this function will combine the data values with the headers and returns one large array of objects.
    @param {Object} json A JSON data Object with `data` and `headers` keys.
    @param {String} [data = "data"] The key used for the flat data array inside of the JSON object.
    @param {String} [headers = "headers"] The key used for the flat headers array inside of the JSON object.
  */


  var fold = function fold(json) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "data";
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "headers";
    return json[data].map(function (data) {
      return json[headers].reduce(function (obj, header, i) {
        return obj[header] = data[i], obj;
      }, {});
    });
  };
  /**
    @function dataLoad
    @desc Loads data from a filepath or URL, converts it to a valid JSON object, and returns it to a callback function.
    @param {Array|String} path The path to the file or url to be loaded. Also support array of paths strings. If an Array of objects is passed, the xhr request logic is skipped.
    @param {Function} [formatter] An optional formatter function that is run on the loaded data.
    @param {String} [key] The key in the `this` context to save the resulting data to.
    @param {Function} [callback] A function that is called when the final data is loaded. It is passed 2 variables, any error present and the data loaded.
  */


  function load(path, formatter, key, callback) {
    var _this = this;

    var parser;

    var getParser = function getParser(path) {
      var ext = path.slice(path.length - 4);

      switch (ext) {
        case ".csv":
          return d3Request.csv;

        case ".tsv":
          return d3Request.tsv;

        case ".txt":
          return d3Request.text;

        default:
          return d3Request.json;
      }
    };

    var validateData = function validateData(err, parser, data) {
      if (parser !== d3Request.json && !err && data && data instanceof Array) {
        data.forEach(function (d) {
          for (var k in d) {
            if (!isNaN(d[k])) d[k] = parseFloat(d[k]);else if (d[k].toLowerCase() === "false") d[k] = false;else if (d[k].toLowerCase() === "true") d[k] = true;else if (d[k].toLowerCase() === "null") d[k] = null;else if (d[k].toLowerCase() === "undefined") d[k] = undefined;
          }
        });
      }

      return data;
    };

    var loadedLength = function loadedLength(loadedArray) {
      return loadedArray.reduce(function (prev, current) {
        return current ? prev + 1 : prev;
      }, 0);
    };

    var getPathIndex = function getPathIndex(url, array) {
      return array.indexOf(url);
    }; // If path param is a not an Array then convert path to a 1 element Array to re-use logic


    if (!(path instanceof Array)) path = [path];
    var needToLoad = path.find(isData);
    var loaded = new Array(path.length);
    var toLoad = []; // If there is a string I'm assuming is a Array to merge, urls or data

    if (needToLoad) {
      path.forEach(function (dataItem, ix) {
        if (isData(dataItem)) toLoad.push(dataItem);else loaded[ix] = dataItem;
      });
    } // Data array itself
    else {
        loaded[0] = path;
      } // Load all urls an combine them with data arrays


    var alreadyLoaded = loadedLength(loaded);
    toLoad.forEach(function (dataItem) {
      var headers = {},
          url = dataItem;

      if (_typeof(dataItem) === "object") {
        url = dataItem.url;
        headers = dataItem.headers;
      }

      parser = getParser(url);
      var request = parser(url);

      for (var _key in headers) {
        if ({}.hasOwnProperty.call(headers, _key)) {
          request.header(_key, headers[_key]);
        }
      }

      request.get(function (err, data) {
        data = err ? [] : data;
        if (data && !(data instanceof Array) && data.data && data.headers) data = fold(data);
        data = validateData(err, parser, data);
        loaded[getPathIndex(url, path)] = data;

        if (loadedLength(loaded) - alreadyLoaded === toLoad.length) {
          // All urls loaded
          // Format data
          data = loadedLength(loaded) === 1 ? loaded[0] : loaded;
          if (_this._cache) _this._lrucache.set("".concat(key, "_").concat(url), data);

          if (formatter) {
            var formatterResponse = formatter(loadedLength(loaded) === 1 ? loaded[0] : loaded);

            if (key === "data" && !(formatterResponse instanceof Array)) {
              data = formatterResponse.data;
              delete formatterResponse.data;

              _this.config(formatterResponse);
            } else data = formatterResponse;
          } else if (key === "data") {
            data = concat(loaded, "data");
          }

          if (key && "_".concat(key) in _this) _this["_".concat(key)] = data;
          if (callback) callback(err, data);
        }
      });
    }); // If there is no data to Load response is immediately

    if (toLoad.length === 0) {
      loaded = loaded.map(function (data) {
        if (data && !(data instanceof Array) && data.data && data.headers) data = fold(data);
        return data;
      }); // Format data

      var data = loadedLength(loaded) === 1 ? loaded[0] : loaded;

      if (formatter) {
        var formatterResponse = formatter(loadedLength(loaded) === 1 ? loaded[0] : loaded);

        if (key === "data" && !(formatterResponse instanceof Array)) {
          data = formatterResponse.data;
          delete formatterResponse.data;
          this.config(formatterResponse);
        } else data = formatterResponse;
      } else if (key === "data") {
        data = concat(loaded, "data");
      }

      if (key && "_".concat(key) in this) this["_".concat(key)] = data;
      if (callback) callback(null, data);
    }
  }
  /**
    @function isData
    @desc Adds the provided value to the internal queue to be loaded, if necessary. This is used internally in new d3plus visualizations that fold in additional data sources, like the nodes and links of Network or the topojson of Geomap.
    @param {Array|String|Object} data The data to be loaded
    @param {Function} [data] An optional data formatter/callback
    @param {String} data The internal Viz method to be modified
  */


  function addToQueue(_, f, key) {
    if (!(_ instanceof Array)) _ = [_];

    var needToLoad = _.find(isData);

    if (needToLoad) {
      var prev = this._queue.find(function (q) {
        return q[3] === key;
      });

      var d = [load.bind(this), _, f, key];
      if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
    } else {
      this["_".concat(key)] = _;
    }
  }
  /**
      @class Message
      @desc Displays a message using plain HTML.
      @private
  */


  var Message = /*#__PURE__*/function () {
    /**
        @memberof Message
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Message() {
      _classCallCheck(this, Message);

      this._isVisible = false;
    }
    /**
        @memberof Message
        @desc Removes the message from the page.
        @chainable
    */


    _createClass(Message, [{
      key: "exit",
      value: function exit(elem, duration) {
        elem.transition().duration(duration).style("opacity", 0).transition().remove();
        this._isVisible = false;
      }
      /**
          @memberof Message
          @desc Removes the message from the page.
          @chainable
      */

    }, {
      key: "hide",
      value: function hide() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$duration = _ref.duration,
            duration = _ref$duration === void 0 ? 600 : _ref$duration,
            callback = _ref.callback;

        this.mask.call(this.exit.bind(this), duration);
        this.elem.call(this.exit.bind(this), duration);
        if (callback) setTimeout(callback, duration + 100);
        this._isVisible = false;
        return this;
      }
      /**
          @memberof Message
          @desc Draws the message given the specified configuration.
          @param {Object} [*config*]
          @chainable
      */

    }, {
      key: "render",
      value: function render() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            callback = _ref2.callback,
            _ref2$container = _ref2.container,
            container = _ref2$container === void 0 ? "body" : _ref2$container,
            _ref2$duration = _ref2.duration,
            duration = _ref2$duration === void 0 ? 600 : _ref2$duration,
            _ref2$html = _ref2.html,
            html = _ref2$html === void 0 ? "Please Wait" : _ref2$html,
            _ref2$mask = _ref2.mask,
            mask = _ref2$mask === void 0 ? "rgba(0, 0, 0, 0.05)" : _ref2$mask,
            _ref2$style = _ref2.style,
            style = _ref2$style === void 0 ? {} : _ref2$style;

        var parent = d3Selection.select(container);
        this.mask = parent.selectAll("div.d3plus-Mask").data(mask ? [mask] : []);
        this.mask = this.mask.enter().append("div").attr("class", "d3plus-Mask").style("opacity", 1).merge(this.mask);
        this.mask.exit().call(this.exit.bind(this), duration);
        d3plusCommon.stylize(this.mask, {
          "background-color": String,
          "bottom": "0px",
          "left": "0px",
          "position": "absolute",
          "right": "0px",
          "top": "0px"
        });
        this.elem = parent.selectAll("div.d3plus-Message").data([html]);
        this.elem = this.elem.enter().append("div").attr("class", "d3plus-Message").style("opacity", 1).merge(this.elem).html(String);
        d3plusCommon.stylize(this.elem, style);
        if (callback) setTimeout(callback, 100);
        this._isVisible = true;
        return this;
      }
    }]);

    return Message;
  }();
  /**
      @function _drawBack
      @desc Draws a back button if there are states in this._history.
      @private
  */


  function drawBack() {
    var visible = this._history.length;
    var backGroup = d3plusCommon.elem("g.d3plus-viz-back", {
      parent: this._select,
      transition: this._transition,
      update: {
        transform: "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")")
      }
    }).node();

    this._backClass.data(visible ? [{
      text: "\u2190 ".concat(this._translate("Back")),
      x: 0,
      y: 0
    }] : []).select(backGroup).config(this._backConfig).render();

    this._margin.top += visible ? this._backClass.fontSize()() + this._backClass.padding()() * 2 : 0;
  }
  /**
      @function _drawColorScale
      @desc Renders the color scale if this._colorScale is not falsey.
      @private
  */


  function drawColorScale() {
    var _this2 = this;

    var data = this._data;
    var position = this._colorScalePosition || "bottom";
    var wide = ["top", "bottom"].includes(position);
    var padding = this._colorScalePadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var availableWidth = this._width - (this._margin.left + this._margin.right + padding.left + padding.right);
    var width = wide ? d3Array.min([this._colorScaleMaxSize, availableWidth]) : this._width - (this._margin.left + this._margin.right);
    var availableHeight = this._height - (this._margin.bottom + this._margin.top + padding.bottom + padding.top);
    var height = !wide ? d3Array.min([this._colorScaleMaxSize, availableHeight]) : this._height - (this._margin.bottom + this._margin.top);
    var transform = {
      opacity: this._colorScalePosition ? 1 : 0,
      transform: "translate(".concat(wide ? this._margin.left + padding.left + (availableWidth - width) / 2 : this._margin.left, ", ").concat(wide ? this._margin.top : this._margin.top + padding.top + (availableHeight - height) / 2, ")")
    };
    var showColorScale = this._colorScale && data && data.length > 1;
    var scaleGroup = d3plusCommon.elem("g.d3plus-viz-colorScale", {
      condition: showColorScale && !this._colorScaleConfig.select,
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    if (showColorScale) {
      var scaleData = data.filter(function (d, i) {
        var c = _this2._colorScale(d, i);

        return c !== undefined && c !== null;
      });

      this._colorScaleClass.align({
        bottom: "end",
        left: "start",
        right: "end",
        top: "start"
      }[position] || "bottom").duration(this._duration).data(scaleData).height(height).locale(this._locale).orient(position).select(scaleGroup).value(this._colorScale).width(width).config(this._colorScaleConfig).render();

      var scaleBounds = this._colorScaleClass.outerBounds();

      if (this._colorScalePosition && !this._colorScaleConfig.select && scaleBounds.height) {
        if (wide) this._margin[position] += scaleBounds.height + this._legendClass.padding() * 2;else this._margin[position] += scaleBounds.width + this._legendClass.padding() * 2;
      }
    } else {
      this._colorScaleClass.config(this._colorScaleConfig);
    }
  }

  var formTypes = {
    Button: d3plusForm.Button,
    Radio: d3plusForm.Radio,
    Select: d3plusForm.Select
  };
  /**
      @function _drawLegend
      @desc Renders the legend if this._legend is not falsy.
      @param {Array} dara The filtered data array to be displayed.
      @private
  */

  function drawControls() {
    var _this3 = this;

    var that = this;
    var padding = this._controlPadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var areas = ["left", "right", "top", "bottom"];

    var _loop = function _loop(a) {
      var area = areas[a];
      var controls = (_this3._controls || []).filter(function (c) {
        return !c.position && area === "bottom" || c.position === area;
      });

      if (_this3._downloadButton && _this3._downloadPosition === area) {
        controls.push({
          data: [{
            text: _this3._translate("Download"),
            value: 1
          }],
          label: "downloadButton",
          on: {
            click: function click() {
              var resize = _this3._detectResize;
              if (resize) _this3.detectResize(false).render();
              d3plusExport.saveElement(_this3._select.node(), Object.assign({
                title: _this3._title || undefined
              }, _this3._downloadConfig), {
                callback: function callback() {
                  setTimeout(function () {
                    if (resize) _this3.detectResize(resize).render();
                  }, 5000);
                }
              });
            }
          },
          type: "Button"
        });
      }

      var wide = area === "top" || area === "bottom";
      var transform = {
        height: wide ? _this3._height - (_this3._margin.top + _this3._margin.bottom) : _this3._height - (_this3._margin.top + _this3._margin.bottom + padding.top + padding.bottom),
        width: wide ? _this3._width - (_this3._margin.left + _this3._margin.right + padding.left + padding.right) : _this3._width - (_this3._margin.left + _this3._margin.right)
      };
      transform.x = (wide ? _this3._margin.left + padding.left : _this3._margin.left) + (area === "right" ? _this3._width - _this3._margin.bottom : 0);
      transform.y = (wide ? _this3._margin.top : _this3._margin.top + padding.top) + (area === "bottom" ? _this3._height - _this3._margin.bottom : 0);
      var foreign = d3plusCommon.elem("foreignObject.d3plus-viz-controls-".concat(area), {
        condition: controls.length,
        enter: Object.assign({
          opacity: 0
        }, transform),
        exit: Object.assign({
          opacity: 0
        }, transform),
        parent: _this3._select,
        transition: _this3._transition,
        update: {
          height: transform.height,
          opacity: 1,
          width: transform.width
        }
      });
      var container = foreign.selectAll("div.d3plus-viz-controls-container").data([null]);
      container = container.enter().append("xhtml:div").attr("class", "d3plus-viz-controls-container").merge(container);

      if (controls.length) {
        var _loop2 = function _loop2(i) {
          var control = Object.assign({}, controls[i]);
          var on = {};

          if (control.on) {
            var _loop3 = function _loop3(event) {
              if ({}.hasOwnProperty.call(control.on, event)) {
                on[event] = function () {
                  control.on[event].bind(that)(this.value);
                };
              }
            };

            for (var event in control.on) {
              _loop3(event);
            }
          }

          var id = control.label || "".concat(area, "-").concat(i);

          if (!_this3._controlCache[id]) {
            var type = control.type && formTypes[control.type] ? control.type : "Select";
            _this3._controlCache[id] = new formTypes[type]().container(container.node());
            if (control.checked) _this3._controlCache[id].checked(control.checked);
            if (control.selected) _this3._controlCache[id].selected(control.selected);
          }

          delete control.checked;
          delete control.selected;

          _this3._controlCache[id].config(control).config({
            on: on
          }).config(_this3._controlConfig).render();
        };

        for (var i = 0; i < controls.length; i++) {
          _loop2(i);
        }

        container.style("display", ["top", "bottom"].includes(area) ? "block" : "inline-block").style("text-align", ["top", "bottom"].includes(area) ? "center" : area);
        var bounds = container.node().getBoundingClientRect();
        foreign.transition(_this3._transition).attr("x", transform.x - (area === "right" ? bounds.width : 0)).attr("y", transform.y - (area === "bottom" ? bounds.height : 0)).attr("height", wide ? bounds.height : transform.height).attr("width", wide ? transform.width : bounds.width);
        _this3._margin[area] += ["top", "bottom"].includes(area) ? bounds.height : bounds.width;
      }
    };

    for (var a = 0; a < areas.length; a++) {
      _loop(a);
    }
  }
  /**
      @function legendLabel
      @desc Default label function for the legend.
      @private
  */


  function legendLabel(d, i) {
    return this._drawLabel(d, i, this._legendDepth);
  }
  /**
      @function _drawLegend
      @desc Renders the legend if this._legend is not falsy.
      @param {Array} data The filtered data array to be displayed.
      @private
  */


  function drawLegend() {
    var _this4 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var legendBounds = this._legendClass.outerBounds();

    var position = this._legendPosition;
    var wide = ["top", "bottom"].includes(position);
    var padding = this._legendPadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var transform = {
      transform: "translate(".concat(wide ? this._margin.left + padding.left : this._margin.left, ", ").concat(wide ? this._margin.top : this._margin.top + padding.top, ")")
    };
    var legendGroup = d3plusCommon.elem("g.d3plus-viz-legend", {
      condition: this._legend && !this._legendConfig.select,
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();
    var legendData = [];

    var color = function color(d, i) {
      var shape = _this4._shape(d, i);

      var attr = shape === "Line" ? "stroke" : "fill";
      var value = _this4._shapeConfig[shape] && _this4._shapeConfig[shape][attr] ? _this4._shapeConfig[shape][attr] : _this4._shapeConfig[attr];
      return typeof value === "function" ? value.bind(_this4)(d, i) : value;
    };

    var opacity = function opacity(d, i) {
      var shape = _this4._shape(d, i);

      var value = _this4._shapeConfig[shape] && _this4._shapeConfig[shape].opacity ? _this4._shapeConfig[shape].opacity : _this4._shapeConfig.opacity;
      return typeof value === "function" ? value.bind(_this4)(d, i) : value;
    };

    var fill = function fill(d, i) {
      return "".concat(color(d, i), "_").concat(opacity(d, i));
    };

    if (this._legend) {
      d3Collection.nest().key(fill).rollup(function (leaves) {
        return legendData.push(d3plusCommon.merge(leaves, _this4._aggs));
      }).entries(this._colorScale ? data.filter(function (d, i) {
        return _this4._colorScale(d, i) === undefined;
      }) : data);
    }

    legendData.sort(this._legendSort);
    var labels = legendData.map(function (d, i) {
      return _this4._ids(d, i).slice(0, _this4._drawDepth + 1);
    });
    this._legendDepth = 0;

    var _loop4 = function _loop4(x) {
      var values = labels.map(function (l) {
        return l[x];
      });

      if (!values.some(function (v) {
        return v instanceof Array;
      }) && Array.from(new Set(values)).length === legendData.length) {
        _this4._legendDepth = x;
        return "break";
      }
    };

    for (var x = 0; x <= this._drawDepth; x++) {
      var _ret = _loop4(x);

      if (_ret === "break") break;
    }

    var hidden = function hidden(d, i) {
      var id = _this4._id(d, i);

      if (id instanceof Array) id = id[0];
      return _this4._hidden.includes(id) || _this4._solo.length && !_this4._solo.includes(id);
    };

    this._legendClass.id(fill).align(wide ? "center" : position).direction(wide ? "row" : "column").duration(this._duration).data(legendData.length > this._legendCutoff || this._colorScale ? legendData : []).height(wide ? this._height - (this._margin.bottom + this._margin.top) : this._height - (this._margin.bottom + this._margin.top + padding.bottom + padding.top)).locale(this._locale).parent(this).select(legendGroup).verticalAlign(!wide ? "middle" : position).width(wide ? this._width - (this._margin.left + this._margin.right + padding.left + padding.right) : this._width - (this._margin.left + this._margin.right)).shapeConfig(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "legend")).shapeConfig({
      fill: function fill(d, i) {
        return hidden(d, i) ? _this4._hiddenColor(d, i) : color(d, i);
      },
      labelConfig: {
        fontOpacity: function fontOpacity(d, i) {
          return hidden(d, i) ? _this4._hiddenOpacity(d, i) : 1;
        }
      },
      opacity: opacity
    }).config(this._legendConfig).render();

    if (!this._legendConfig.select && legendBounds.height) {
      if (wide) this._margin[position] += legendBounds.height + this._legendClass.padding() * 2;else this._margin[position] += legendBounds.width + this._legendClass.padding() * 2;
    }
  }
  /**
      @function setTimeFilter
      @desc Determines whether or not to update the timeFilter method of the Viz.
      @param {Array|Date} The timeline selection given from the d3 brush.
      @private
  */


  function setTimeFilter(s) {
    var _this5 = this;

    if (!(s instanceof Array)) s = [s, s];

    if (JSON.stringify(s) !== JSON.stringify(this._timelineSelection)) {
      this._timelineSelection = s;
      s = s.map(Number);
      this.timeFilter(function (d) {
        var ms = d3plusAxis.date(_this5._time(d)).getTime();
        return ms >= s[0] && ms <= s[1];
      }).render();
    }
  }
  /**
      @function _drawTimeline
      @desc Renders the timeline if this._time and this._timeline are not falsy and there are more than 1 tick available.
      @param {Array} data The filtered data array to be displayed.
      @private
  */


  function drawTimeline() {
    var _this6 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var timelinePossible = this._time && this._timeline;
    var ticks = timelinePossible ? d3plusCommon.unique(this._data.map(this._time)).map(d3plusAxis.date) : [];
    timelinePossible = timelinePossible && ticks.length > 1;
    var padding = this._timelinePadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var transform = {
      transform: "translate(".concat(this._margin.left + padding.left, ", 0)")
    };
    var timelineGroup = d3plusCommon.elem("g.d3plus-viz-timeline", {
      condition: timelinePossible,
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    if (timelinePossible) {
      var timeline = this._timelineClass.domain(d3Array.extent(ticks)).duration(this._duration).height(this._height - this._margin.bottom).locale(this._locale).select(timelineGroup).ticks(ticks.sort(function (a, b) {
        return +a - +b;
      })).width(this._width - (this._margin.left + this._margin.right + padding.left + padding.right));

      if (timeline.selection() === undefined) {
        this._timelineSelection = d3Array.extent(data, this._time).map(d3plusAxis.date);
        timeline.selection(this._timelineSelection);
      }

      var config = this._timelineConfig;
      timeline.config(config) // .on("brush", s => {
      //   setTimeFilter.bind(this)(s);
      //   if (config.on && config.on.brush) config.on.brush(s);
      // })
      .on("end", function (s) {
        setTimeFilter.bind(_this6)(s);
        if (config.on && config.on.end) config.on.end(s);
      }).render();
      this._margin.bottom += timeline.outerBounds().height + timeline.padding() * 2;
    }
  }
  /**
      @function _drawTitle
      @desc Draws a title if this._title is defined.
      @param {Array} [*data*] The currently filtered dataset.
      @private
  */


  function drawTitle() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var text = this._title ? this._title(data) : false;
    var padding = this._titlePadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var transform = {
      transform: "translate(".concat(this._margin.left + padding.left, ", ").concat(this._margin.top, ")")
    };
    var group = d3plusCommon.elem("g.d3plus-viz-title", {
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    this._titleClass.data(text ? [{
      text: text
    }] : []).locale(this._locale).select(group).width(this._width - (this._margin.left + this._margin.right + padding.left + padding.right)).config(this._titleConfig).render();

    this._margin.top += text ? group.getBBox().height : 0;
  }
  /**
      @function _drawTotal
      @desc Draws a total title if this._total is defined.
      @param {Array} [*data*] The currently filtered dataset.
      @private
  */


  function drawTotal() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var total = typeof this._total === "function" ? d3Array.sum(data.map(this._total)) : this._total === true && this._size ? d3Array.sum(data.map(this._size)) : false;
    var padding = this._totalPadding() ? this._padding : {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var transform = {
      transform: "translate(".concat(this._margin.left + padding.left, ", ").concat(this._margin.top, ")")
    };
    var group = d3plusCommon.elem("g.d3plus-viz-total", {
      enter: transform,
      parent: this._select,
      transition: this._transition,
      update: transform
    }).node();

    this._totalClass.data(total ? [{
      text: this._totalFormat(total)
    }] : []).locale(this._locale).select(group).width(this._width - (this._margin.left + this._margin.right + padding.left + padding.right)).config(this._totalConfig).render();

    this._margin.top += total ? group.getBBox().height + this._totalConfig.padding * 2 : 0;
  }
  /**
    @desc Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
    @private
  */


  function _elementSize(element, s) {
    if (!element) return undefined;

    if (element.tagName === undefined || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {
      var val = window["inner".concat(s.charAt(0).toUpperCase() + s.slice(1))];
      var elem = d3Selection.select(element);

      if (s === "width") {
        val -= parseFloat(elem.style("margin-left"), 10);
        val -= parseFloat(elem.style("margin-right"), 10);
        val -= parseFloat(elem.style("padding-left"), 10);
        val -= parseFloat(elem.style("padding-right"), 10);
      } else {
        val -= parseFloat(elem.style("margin-top"), 10);
        val -= parseFloat(elem.style("margin-bottom"), 10);
        val -= parseFloat(elem.style("padding-top"), 10);
        val -= parseFloat(elem.style("padding-bottom"), 10);
      }

      return val;
    } else {
      var _val = parseFloat(d3Selection.select(element).style(s), 10);

      if (typeof _val === "number" && _val > 0) return _val;else return _elementSize(element.parentNode, s);
    }
  }
  /**
      @function getSize
      @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
      @param {HTMLElement} elem The HTMLElement to find dimensions for.
      @private
  */


  function getSize(elem) {
    return [_elementSize(elem, "width"), _elementSize(elem, "height")];
  }
  /**
    @desc Returns a *Boolean* denoting whether or not a given DOM element is visible in the current window.
    @param {DOMElement} elem The DOM element to analyze.
    @param {Number} [buffer = 0] A pixel offset from the edge of the top and bottom of the screen. If a positive value, the element will be deemed visible when it is that many pixels away from entering the viewport. If negative, the element will have to enter the viewport by that many pixels before being deemed visible.
    @private
  */


  function inViewport(elem) {
    var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var pageX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    var pageY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var bounds = elem.getBoundingClientRect();
    var height = bounds.height,
        left = bounds.left + pageX,
        top = bounds.top + pageY,
        width = bounds.width;
    return pageY + window.innerHeight > top + buffer && pageY + buffer < top + height && pageX + window.innerWidth > left + buffer && pageX + buffer < left + width;
  }
  /**
      @desc On click event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */


  function clickShape(d, i) {
    this._select.style("cursor", "auto");

    if (this._drawDepth < this._groupBy.length - 1) {
      var filterGroup = this._groupBy[this._drawDepth],
          filterId = filterGroup(d, i);
      this.hover(false);
      if (this._tooltip(d, i)) this._tooltipClass.data([]).render();
      var oldFilter = this._filter;

      this._history.push({
        depth: this._depth,
        filter: oldFilter
      });

      this.config({
        depth: this._drawDepth + 1,
        filter: function filter(f, x) {
          return (!oldFilter || oldFilter(f, x)) && filterGroup(f, x) === filterId;
        }
      }).render();
    }
  }
  /**
      @desc On click event for all legend shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */


  function clickLegend(d, i) {
    var _this7 = this;

    this._select.style("cursor", "auto");

    if (this._tooltip(d, i)) this._tooltipClass.data([]).render();

    var id = this._id(d, i);

    if (!(id instanceof Array)) id = [id];

    var hiddenIndex = this._hidden.indexOf(id[0]);

    var soloIndex = this._solo.indexOf(id[0]);

    var dataLength = d3Array.merge(this._legendClass.data().map(function (d, i) {
      var id = _this7._id(d, i);

      if (!(id instanceof Array)) id = [id];
      return id;
    })).length;

    if (d3Selection.event.shiftKey) {
      if (hiddenIndex < 0 && !this._solo.length) {
        this._hidden = this._hidden.concat(id);
        if (this._solo.length === dataLength) this._solo = [];
        if (this._hidden.length === dataLength) this._hidden = [];
        this.render();
      } else if (soloIndex >= 0) {
        this._solo = [];
        this._hidden = [];
        this.render();
      }
    } else {
      if (soloIndex < 0 && this._hidden.length < dataLength - 1) {
        this._solo = id;
        this._hidden = [];
      } else {
        this._solo = [];
        this._hidden = [];
      }

      this.render();
    }
  }

  var flattenIds = function flattenIds(levels) {
    return levels.reduce(function (arr, level) {
      if (level instanceof Array) {
        if (arr.length) {
          var oldArray = arr.slice();
          arr = [];
          level.forEach(function (id) {
            return arr = arr.concat(oldArray.map(function (a) {
              return "".concat(a, "_").concat(id);
            }));
          });
        } else {
          arr = level.slice();
        }
      } else if (arr.length) {
        arr = arr.map(function (a) {
          return "".concat(a, "_").concat(level);
        });
      } else {
        arr.push(level);
      }

      return arr;
    }, []);
  };
  /**
      @desc On mouseenter event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */


  function mouseenter(d, i) {
    var _this8 = this;

    if (this._shapeConfig.hoverOpacity !== 1) {
      var filterIds = flattenIds(this._ids(d, i));
      this.hover(function (h, x) {
        var ids = flattenIds(_this8._ids(h, x));
        return filterIds.some(function (id) {
          return ids.includes(id);
        });
      });
    }
  }
  /**
      @desc On mouseleave event for all shapes in a Viz.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @private
  */


  function mouseleave(d, i) {
    var _this9 = this;

    setTimeout(function () {
      if (_this9._shapeConfig.hoverOpacity !== 1 && _this9._hover ? _this9._hover(d, i) : true) {
        _this9.hover(false);
      }

      var tooltipData = _this9._tooltipClass.data();

      if (tooltipData.length && _this9._tooltip(d, i)) {
        var tooltipDatum = tooltipData[0];

        while (tooltipDatum.__d3plus__ && tooltipDatum.data) {
          tooltipDatum = tooltipDatum.data;
        }

        if (_this9._id(tooltipDatum) === _this9._id(d)) _this9._tooltipClass.data([]).render();
      }
    }, 50);

    this._select.style("cursor", "auto");
  }
  /**
      @desc Tooltip logic for a specified data point.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @param {Object} [*config*] Optional configuration methods for the Tooltip class.
      @private
  */


  function mousemoveLegend(d, i, x) {
    var _this10 = this;

    var position = d3Selection.event.touches ? [d3Selection.event.touches[0].clientX, d3Selection.event.touches[0].clientY] : [d3Selection.event.clientX, d3Selection.event.clientY];
    var dataLength = d3Array.merge(this._legendClass.data().map(function (d, i) {
      var id = _this10._id(d, i);

      if (!(id instanceof Array)) id = [id];
      return id;
    })).length;

    if (d && this._tooltip(d, i)) {
      var id = this._id(d, i);

      if (id instanceof Array) id = id[0];
      var t = this._translate;

      this._select.style("cursor", "pointer");

      this._tooltipClass.data([x || d]).footer(this._solo.length && !this._solo.includes(id) ? t("Click to Highlight") : this._solo.length === 1 && this._solo.includes(id) || this._hidden.length === dataLength - 1 ? t("Click to Reset") : this._solo.includes(id) ? t("Click to Hide") : this._hidden.includes(id) ? t("Click to Highlight") : "".concat(t("Click to Highlight"), "<br />").concat(t("Shift+Click to Hide"))).title(this._legendConfig.label ? this._legendClass.label() : legendLabel.bind(this)).position(position).config(d3plusCommon.configPrep.bind(this)(this._tooltipConfig)).config(d3plusCommon.configPrep.bind(this)(this._legendTooltip)).render();
    }
  }
  /**
      @desc Tooltip logic for a specified data point.
      @param {Object} *d* The data object being interacted with.
      @param {Number} *i* The index of the data object being interacted with.
      @param {Object} [*config*] Optional configuration methods for the Tooltip class.
      @private
  */


  function mousemoveShape(d, i, x) {
    if (d && this._tooltip(d, i)) {
      this._select.style("cursor", "pointer");

      var position = d3Selection.event.touches ? [d3Selection.event.touches[0].clientX, d3Selection.event.touches[0].clientY] : [d3Selection.event.clientX, d3Selection.event.clientY];

      this._tooltipClass.data([x || d]).footer(this._drawDepth < this._groupBy.length - 1 ? this._translate("Click to Expand") : false).title(this._drawLabel).position(position).config(d3plusCommon.configPrep.bind(this)(this._tooltipConfig)).render();
    }
  }
  /**
   @desc On touchstart event for the Body element.
   @private
   */


  function touchstartBody(d) {
    d3Selection.event.preventDefault();
    d3Selection.event.stopPropagation();
    if (!d) this._tooltipClass.data([]).render();
  }

  var brushing = false;
  /**
      @name zoomControls
      @desc Sets up initial zoom events and controls.
      @private
  */

  function zoomControls() {
    if (!this._container || !this._zoomGroup) return;
    var height = this._zoomHeight || this._height - this._margin.top - this._margin.bottom,
        that = this,
        width = this._zoomWidth || this._width - this._margin.left - this._margin.right;

    this._zoomBehavior.extent([[0, 0], [width, height]]).scaleExtent([1, this._zoomMax]).translateExtent([[0, 0], [width, height]]).on("zoom", zoomed.bind(this));

    this._zoomToBounds = zoomToBounds.bind(this);
    var control = d3Selection.select(this._select.node().parentNode).selectAll("div.d3plus-zoom-control").data(this._zoom ? [0] : []);
    var controlEnter = control.enter().append("div").attr("class", "d3plus-zoom-control");
    control.exit().remove();
    control = control.merge(controlEnter).style("position", "absolute").style("top", "".concat(this._margin.top, "px")).style("left", "".concat(this._margin.left, "px"));
    controlEnter.append("div").attr("class", "zoom-control zoom-in");
    control.select(".zoom-in").on("click", zoomMath.bind(this, this._zoomFactor)).html("&#65291;");
    controlEnter.append("div").attr("class", "zoom-control zoom-out");
    control.select(".zoom-out").on("click", zoomMath.bind(this, 1 / this._zoomFactor)).html("&#65293;");
    controlEnter.append("div").attr("class", "zoom-control zoom-reset");
    control.select(".zoom-reset").on("click", zoomMath.bind(this, 0)).html("&#8634");
    controlEnter.append("div").attr("class", "zoom-control zoom-brush");
    control.select(".zoom-brush").on("click", function () {
      d3Selection.select(this).classed("active", !brushing).call(d3plusCommon.stylize, brushing ? that._zoomControlStyle || {} : that._zoomControlStyleActive || {});
      zoomEvents.bind(that)(!brushing);
    }).html("&#164");
    control.selectAll(".zoom-control").call(d3plusCommon.stylize, that._zoomControlStyle).on("mouseenter", function () {
      d3Selection.select(this).call(d3plusCommon.stylize, that._zoomControlStyleHover || {});
    }).on("mouseleave", function () {
      d3Selection.select(this).call(d3plusCommon.stylize, d3Selection.select(this).classed("active") ? that._zoomControlStyleActive || {} : that._zoomControlStyle || {});
    });

    this._zoomBrush.extent([[0, 0], [width, height]]).filter(function () {
      return !d3Selection.event.button && d3Selection.event.detail < 2;
    }).handleSize(this._zoomBrushHandleSize).on("start", brushStart.bind(this)).on("brush", brushBrush.bind(this)).on("end", brushEnd.bind(this));

    var brushGroup = this._container.selectAll("g.brush").data([0]);

    this._brushGroup = brushGroup.enter().append("g").attr("class", "brush").merge(brushGroup).call(this._zoomBrush);
    zoomEvents.bind(this)();
    if (this._renderTiles) this._renderTiles(d3Zoom.zoomTransform(this._container.node()), 0);
  }
  /**
      @name zoomEvents
      @desc Handles adding/removing zoom event listeners.
      @private
  */


  function zoomEvents() {
    var brush = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    brushing = brush;
    if (brushing) this._brushGroup.style("display", "inline");else this._brushGroup.style("display", "none");

    if (!brushing && this._zoom) {
      this._container.call(this._zoomBehavior);

      if (!this._zoomScroll) {
        this._container.on("wheel.zoom", null);
      }

      if (!this._zoomPan) {
        this._container.on("mousedown.zoom mousemove.zoom", null).on("touchstart.zoom touchmove.zoom touchend.zoom touchcancel.zoom", null);
      }
    } else {
      this._container.on(".zoom", null);
    }
  }
  /**
      @name zoomed
      @desc Handles events dispatched from this._zoomBehavior
      @param {Object} [*transform* = event.transform]
      @param {Number} [*duration* = 0]
      @private
  */


  function zoomed() {
    var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    // console.log(transform || event.transform);
    if (this._zoomGroup) {
      if (!duration) this._zoomGroup.attr("transform", transform || d3Selection.event.transform);else this._zoomGroup.transition().duration(duration).attr("transform", transform || d3Selection.event.transform);
    }

    if (this._renderTiles) this._renderTiles(d3Zoom.zoomTransform(this._container.node()), duration);
  }
  /**
      @name zoomMath
      @desc Zooms in or out based on the provided multiplier.
      @param {Number} [*factor* = 0]
      @private
  */


  function zoomMath() {
    var factor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!this._container) return;

    var center = this._zoomBehavior.extent().bind(document)()[1].map(function (d) {
      return d / 2;
    }),
        scaleExtent = this._zoomBehavior.scaleExtent(),
        t = d3Zoom.zoomTransform(this._container.node());

    if (!factor) {
      t.k = scaleExtent[0];
      t.x = 0;
      t.y = 0;
    } else {
      var translate0 = [(center[0] - t.x) / t.k, (center[1] - t.y) / t.k];
      t.k = Math.min(scaleExtent[1], t.k * factor);

      if (t.k <= scaleExtent[0]) {
        t.k = scaleExtent[0];
        t.x = 0;
        t.y = 0;
      } else {
        t.x += center[0] - (translate0[0] * t.k + t.x);
        t.y += center[1] - (translate0[1] * t.k + t.y);
      }
    }

    zoomed.bind(this)(t, this._duration);
  }
  /**
      @name zoomToBounds
      @desc Zooms to given bounds.
      @param {Array} *bounds*
      @param {Number} [*duration* = 0]
      @private
  */


  function zoomToBounds(bounds) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._duration;

    var scaleExtent = this._zoomBehavior.scaleExtent(),
        t = d3Zoom.zoomTransform(this._container.node());

    if (bounds) {
      var _this$_zoomBehavior$t = _slicedToArray(this._zoomBehavior.translateExtent()[1], 2),
          width = _this$_zoomBehavior$t[0],
          height = _this$_zoomBehavior$t[1],
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1];

      var k = Math.min(scaleExtent[1], 1 / Math.max(dx / width, dy / height));
      var xMod, yMod;

      if (dx / dy < width / height) {
        k *= (height - this._zoomPadding * 2) / height;
        xMod = (width - dx * k) / 2 / k;
        yMod = this._zoomPadding / k;
      } else {
        k *= (width - this._zoomPadding * 2) / width;
        yMod = (height - dy * k) / 2 / k;
        xMod = this._zoomPadding / k;
      }

      t.x = (t.x - bounds[0][0] + xMod) * (t.k * k / t.k);
      t.y = (t.y - bounds[0][1] + yMod) * (t.k * k / t.k);
      t.k *= k;
      if (t.x > 0) t.x = 0;else if (t.x < width * -t.k + width) t.x = width * -t.k + width;
      if (t.y > 0) t.y = 0;else if (t.y < height * -t.k + height) t.y = height * -t.k + height;
    } else {
      t.k = scaleExtent[0];
      t.x = 0;
      t.y = 0;
    }

    zoomed.bind(this)(t, duration);
  }
  /**
      @desc Triggered on brush "brush".
      @private
  */


  function brushBrush() {
    brushStyle.bind(this)();
  }
  /**
      @desc Triggered on brush "end".
      @private
  */


  function brushEnd() {
    if (!d3Selection.event.selection) return; // Only transition after input.

    this._brushGroup.call(this._zoomBrush.move, null);

    zoomToBounds.bind(this)(d3Selection.event.selection);
  }
  /**
      @desc Triggered on brush "start".
      @private
  */


  function brushStart() {
    brushStyle.bind(this)();
  }
  /**
      @desc Overrides the default brush styles.
      @private
  */


  function brushStyle() {
    this._brushGroup.selectAll(".selection").call(d3plusCommon.attrize, this._zoomBrushSelectionStyle || {});

    this._brushGroup.selectAll(".handle").call(d3plusCommon.attrize, this._zoomBrushHandleStyle || {});
  }
  /**
      @name _drawAttribution
      @desc Draws absolute positioned attribution text.
      @private
  */


  function drawAttribution() {
    var attr = d3Selection.select(this._select.node().parentNode).selectAll("div.d3plus-attribution").data(this._attribution ? [0] : []);
    var attrEnter = attr.enter().append("div").attr("class", "d3plus-attribution");
    attr.exit().remove();
    attr = attr.merge(attrEnter).style("position", "absolute").html(this._attribution).style("right", "".concat(this._margin.right, "px")).style("bottom", "".concat(this._margin.bottom, "px")).call(d3plusCommon.stylize, this._attributionStyle);
  }
  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  /**
   * Default padding logic that will return false if the screen is less than 600 pixels wide.
   */


  function defaultPadding() {
    return typeof window !== "undefined" ? window.innerWidth > 600 : true;
  }
  /**
   * Turns an array of values into a list string.
   */


  function listify(n) {
    return n.reduce(function (str, item, i) {
      if (!i) str += item;else if (i === n.length - 1 && i === 1) str += " and ".concat(item);else if (i === n.length - 1) str += ", and ".concat(item);else str += ", ".concat(item);
      return str;
    }, "");
  }
  /**
      @class Viz
      @extends external:BaseClass
      @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
  */


  var Viz = /*#__PURE__*/function (_d3plusCommon$BaseCla) {
    _inherits(Viz, _d3plusCommon$BaseCla);

    var _super = _createSuper(Viz);

    /**
        @memberof Viz
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Viz() {
      var _this11;

      _classCallCheck(this, Viz);

      _this11 = _super.call(this);
      _this11._aggs = {};
      _this11._ariaHidden = true;
      _this11._attribution = false;
      _this11._attributionStyle = {
        background: "rgba(255, 255, 255, 0.75)",
        border: "1px solid rgba(0, 0, 0, 0.25)",
        color: "rgba(0, 0, 0, 0.75)",
        display: "block",
        font: "400 11px/11px 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        margin: "5px",
        opacity: 0.75,
        padding: "4px 6px 3px"
      };
      _this11._backClass = new d3plusText.TextBox().on("click", function () {
        if (_this11._history.length) _this11.config(_this11._history.pop()).render();else _this11.depth(_this11._drawDepth - 1).filter(false).render();
      }).on("mousemove", function () {
        return _this11._backClass.select().style("cursor", "pointer");
      });
      _this11._backConfig = {
        fontSize: 10,
        padding: 5,
        resize: false
      };
      _this11._cache = true;

      _this11._color = function (d, i) {
        return _this11._groupBy[0](d, i);
      };

      _this11._colorScaleClass = new d3plusLegend.ColorScale();
      _this11._colorScaleConfig = {};
      _this11._colorScalePadding = defaultPadding;
      _this11._colorScalePosition = "bottom";
      _this11._colorScaleMaxSize = 600;
      var controlTest = new d3plusForm.Select();
      _this11._controlCache = {};
      _this11._controlConfig = {
        selectStyle: Object.assign({
          margin: "5px"
        }, controlTest.selectStyle())
      };
      _this11._controlPadding = defaultPadding;
      _this11._data = [];
      _this11._dataCutoff = 100;
      _this11._detectResize = true;
      _this11._detectResizeDelay = 400;
      _this11._detectVisible = true;
      _this11._detectVisibleInterval = 1000;
      _this11._downloadButton = false;
      _this11._downloadConfig = {
        type: "png"
      };
      _this11._downloadPosition = "top";
      _this11._duration = 600;
      _this11._hidden = [];
      _this11._hiddenColor = d3plusCommon.constant("#aaa");
      _this11._hiddenOpacity = d3plusCommon.constant(0.5);
      _this11._history = [];
      _this11._groupBy = [d3plusCommon.accessor("id")];
      _this11._legend = true;
      _this11._legendClass = new d3plusLegend.Legend();
      _this11._legendConfig = {
        label: legendLabel.bind(_assertThisInitialized(_this11)),
        shapeConfig: {
          ariaLabel: legendLabel.bind(_assertThisInitialized(_this11)),
          labelConfig: {
            fontColor: undefined,
            fontResize: false,
            padding: 0
          }
        }
      };
      _this11._legendCutoff = 1;
      _this11._legendPadding = defaultPadding;
      _this11._legendPosition = "bottom";

      _this11._legendSort = function (a, b) {
        return _this11._drawLabel(a).localeCompare(_this11._drawLabel(b));
      };

      _this11._legendTooltip = {};

      _this11._loadingHTML = function () {
        return "\n    <div style=\"left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%); font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;\">\n      <strong>".concat(_this11._translate("Loading Visualization"), "</strong>\n      <sub style=\"bottom: 0; display: block; line-height: 1; margin-top: 5px;\"><a href=\"https://d3plus.org\" target=\"_blank\">").concat(_this11._translate("Powered by D3plus"), "</a></sub>\n    </div>");
      };

      _this11._loadingMessage = true;
      _this11._lrucache = lrucache__default['default'](10);
      _this11._messageClass = new Message();
      _this11._messageMask = "rgba(0, 0, 0, 0.05)";
      _this11._messageStyle = {
        "bottom": "0",
        "left": "0",
        "position": "absolute",
        "right": "0",
        "text-align": "center",
        "top": "0"
      };

      _this11._noDataHTML = function () {
        return "\n    <div style=\"left: 50%; top: 50%; position: absolute; transform: translate(-50%, -50%); font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;\">\n      <strong>".concat(_this11._translate("No Data Available"), "</strong>\n    </div>");
      };

      _this11._noDataMessage = true;
      _this11._on = {
        "click.shape": clickShape.bind(_assertThisInitialized(_this11)),
        "click.legend": clickLegend.bind(_assertThisInitialized(_this11)),
        "mouseenter": mouseenter.bind(_assertThisInitialized(_this11)),
        "mouseleave": mouseleave.bind(_assertThisInitialized(_this11)),
        "mousemove.shape": mousemoveShape.bind(_assertThisInitialized(_this11)),
        "mousemove.legend": mousemoveLegend.bind(_assertThisInitialized(_this11))
      };
      _this11._queue = [];
      _this11._scrollContainer = (typeof window === "undefined" ? "undefined" : _typeof(window)) === undefined ? "" : window;
      _this11._shape = d3plusCommon.constant("Rect");
      _this11._shapes = [];
      _this11._shapeConfig = {
        ariaLabel: function ariaLabel(d, i) {
          return _this11._drawLabel(d, i);
        },
        fill: function fill(d, i) {
          while (d.__d3plus__ && d.data) {
            d = d.data;
            i = d.i;
          }

          if (_this11._colorScale) {
            var _c = _this11._colorScale(d, i);

            if (_c !== undefined && _c !== null) {
              var scale = _this11._colorScaleClass._colorScale;

              var colors = _this11._colorScaleClass.color();

              if (!scale) return colors instanceof Array ? colors[colors.length - 1] : colors;else if (!scale.domain().length) return scale.range()[scale.range().length - 1];
              return scale(_c);
            }
          }

          var c = _this11._color(d, i);

          if (d3Color.color(c)) return c;
          return d3plusColor.colorAssign(c);
        },
        labelConfig: {
          fontColor: function fontColor(d, i) {
            var c = typeof _this11._shapeConfig.fill === "function" ? _this11._shapeConfig.fill(d, i) : _this11._shapeConfig.fill;
            return d3plusColor.colorContrast(c);
          }
        },
        opacity: d3plusCommon.constant(1),
        stroke: function stroke(d, i) {
          var c = typeof _this11._shapeConfig.fill === "function" ? _this11._shapeConfig.fill(d, i) : _this11._shapeConfig.fill;
          return d3Color.color(c).darker();
        },
        role: "presentation",
        strokeWidth: d3plusCommon.constant(0)
      };
      _this11._solo = [];
      _this11._svgDesc = "";
      _this11._svgTitle = "";
      _this11._timeline = true;
      _this11._timelineClass = new d3plusTimeline.Timeline().align("end");
      _this11._timelineConfig = {
        brushing: false,
        padding: 5
      };
      _this11._timelinePadding = defaultPadding;
      _this11._threshold = d3plusCommon.constant(0.0001);
      _this11._thresholdKey = undefined;

      _this11._thresholdName = function () {
        return _this11._translate("Values");
      };

      _this11._titleClass = new d3plusText.TextBox();
      _this11._titleConfig = {
        ariaHidden: true,
        fontSize: 12,
        padding: 5,
        resize: false,
        textAnchor: "middle"
      };
      _this11._titlePadding = defaultPadding;
      _this11._tooltip = d3plusCommon.constant(true);
      _this11._tooltipClass = new d3plusTooltip.Tooltip();
      _this11._tooltipConfig = {
        pointerEvents: "none",
        titleStyle: {
          "max-width": "200px"
        }
      };
      _this11._totalClass = new d3plusText.TextBox();
      _this11._totalConfig = {
        fontSize: 10,
        padding: 5,
        resize: false,
        textAnchor: "middle"
      };

      _this11._totalFormat = function (d) {
        return "".concat(_this11._translate("Total"), ": ").concat(d3plusFormat.formatAbbreviate(d, _this11._locale));
      };

      _this11._totalPadding = defaultPadding;
      _this11._zoom = false;
      _this11._zoomBehavior = d3Zoom.zoom();
      _this11._zoomBrush = d3Brush.brush();
      _this11._zoomBrushHandleSize = 1;
      _this11._zoomBrushHandleStyle = {
        fill: "#444"
      };
      _this11._zoomBrushSelectionStyle = {
        "fill": "#777",
        "stroke-width": 0
      };
      _this11._zoomControlStyle = {
        "background": "rgba(255, 255, 255, 0.75)",
        "border": "1px solid rgba(0, 0, 0, 0.75)",
        "color": "rgba(0, 0, 0, 0.75)",
        "display": "block",
        "font": "900 15px/21px 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        "height": "20px",
        "margin": "5px",
        "opacity": 0.75,
        "padding": 0,
        "text-align": "center",
        "width": "20px"
      };
      _this11._zoomControlStyleActive = {
        background: "rgba(0, 0, 0, 0.75)",
        color: "rgba(255, 255, 255, 0.75)",
        opacity: 1
      };
      _this11._zoomControlStyleHover = {
        cursor: "pointer",
        opacity: 1
      };
      _this11._zoomFactor = 2;
      _this11._zoomMax = 16;
      _this11._zoomPadding = 20;
      _this11._zoomPan = true;
      _this11._zoomScroll = true;
      return _this11;
    }
    /**
     @memberof Viz
     @desc Called by draw before anything is drawn. Formats the data and performs preparations for draw.
     @private
     */


    _createClass(Viz, [{
      key: "_preDraw",
      value: function _preDraw() {
        var _this12 = this;

        var that = this; // based on the groupBy, determine the draw depth and current depth id

        this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
        this._id = this._groupBy[this._drawDepth];

        this._ids = function (d, i) {
          return _this12._groupBy.map(function (g) {
            return !d || d.__d3plus__ && !d.data ? undefined : g(d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i);
          }).filter(function (g) {
            return g !== undefined && g !== null;
          });
        };

        this._drawLabel = function (d, i) {
          var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this12._drawDepth;
          if (!d) return "";

          while (d.__d3plus__ && d.data) {
            d = d.data;
            i = d.i;
          }

          if (d._isAggregation) {
            return "".concat(_this12._thresholdName(d, i), " < ").concat(d3plusFormat.formatAbbreviate(d._threshold * 100, _this12._locale), "%");
          }

          if (_this12._label) return "".concat(_this12._label(d, i));

          var l = that._ids(d, i).slice(0, depth + 1);

          var n = l.reverse().find(function (ll) {
            return !(ll instanceof Array);
          }) || l[l.length - 1];
          return n instanceof Array ? listify(n) : "".concat(n);
        }; // set the default timeFilter if it has not been specified


        if (this._time && !this._timeFilter && this._data.length) {
          var dates = this._data.map(this._time).map(d3plusAxis.date);

          var d = this._data[0],
              i = 0;

          if (this._discrete && "_".concat(this._discrete) in this && this["_".concat(this._discrete)](d, i) === this._time(d, i)) {
            this._timeFilter = function () {
              return true;
            };
          } else {
            var latestTime = +d3Array.max(dates);

            this._timeFilter = function (d, i) {
              return +d3plusAxis.date(_this12._time(d, i)) === latestTime;
            };
          }
        }

        this._filteredData = [];
        this._legendData = [];
        var flatData = [];

        if (this._data.length) {
          flatData = this._timeFilter ? this._data.filter(this._timeFilter) : this._data;
          if (this._filter) flatData = flatData.filter(this._filter);
          var dataNest = d3Collection.nest();

          for (var _i2 = 0; _i2 <= this._drawDepth; _i2++) {
            dataNest.key(this._groupBy[_i2]);
          }

          if (this._discrete && "_".concat(this._discrete) in this) dataNest.key(this["_".concat(this._discrete)]);
          if (this._discrete && "_".concat(this._discrete, "2") in this) dataNest.key(this["_".concat(this._discrete, "2")]);
          var tree = dataNest.rollup(function (leaves) {
            var index = _this12._data.indexOf(leaves[0]);

            var shape = _this12._shape(leaves[0], index);

            var id = _this12._id(leaves[0], index);

            var d = d3plusCommon.merge(leaves, _this12._aggs);

            if (!_this12._hidden.includes(id) && (!_this12._solo.length || _this12._solo.includes(id))) {
              if (!_this12._discrete && shape === "Line") _this12._filteredData = _this12._filteredData.concat(leaves);else _this12._filteredData.push(d);
            }

            _this12._legendData.push(d);
          }).entries(flatData);
          this._filteredData = this._thresholdFunction(this._filteredData, tree);
        } // overrides the hoverOpacity of shapes if data is larger than cutoff


        var uniqueIds = d3Collection.nest().key(this._id).entries(this._filteredData).length;

        if (uniqueIds > this._dataCutoff) {
          if (this._userHover === undefined) this._userHover = this._shapeConfig.hoverOpacity || 0.5;
          if (this._userDuration === undefined) this._userDuration = this._shapeConfig.duration || 600;
          this._shapeConfig.hoverOpacity = 1;
          this._shapeConfig.duration = 0;
        } else if (this._userHover !== undefined) {
          this._shapeConfig.hoverOpacity = this._userHover;
          this._shapeConfig.duration = this._userDuration;
        }

        if (this._noDataMessage && !this._filteredData.length) {
          this._messageClass.render({
            container: this._select.node().parentNode,
            html: this._noDataHTML(this),
            mask: false,
            style: this._messageStyle
          });
        }
      }
      /**
          @memberof Viz
          @desc Called by render once all checks are passed.
          @private
      */

    }, {
      key: "_draw",
      value: function _draw() {
        if (this._legendPosition === "left" || this._legendPosition === "right") drawLegend.bind(this)(this._filteredData);
        if (this._colorScalePosition === "left" || this._colorScalePosition === "right" || this._colorScalePosition === false) drawColorScale.bind(this)(this._filteredData);
        drawBack.bind(this)();
        drawTitle.bind(this)(this._filteredData);
        drawTotal.bind(this)(this._filteredData);
        drawTimeline.bind(this)(this._filteredData);
        drawControls.bind(this)(this._filteredData);
        if (this._legendPosition === "top" || this._legendPosition === "bottom") drawLegend.bind(this)(this._legendData);
        if (this._colorScalePosition === "top" || this._colorScalePosition === "bottom") drawColorScale.bind(this)(this._filteredData);
        this._shapes = []; // Draws a container and zoomGroup to test functionality.
        // this._testGroup = this._select.selectAll("g.d3plus-viz-testGroup").data([0]);
        // const enterTest = this._testGroup.enter().append("g").attr("class", "d3plus-viz-testGroup")
        //   .merge(this._testGroup);
        // this._testGroup = enterTest.merge(this._testGroup);
        // const bgHeight = this._height - this._margin.top - this._margin.bottom;
        // const bgWidth = this._width - this._margin.left - this._margin.right;
        // new Rect()
        //   .data([{id: "background"}])
        //   .select(this._testGroup.node())
        //   .x(bgWidth / 2 + this._margin.left)
        //   .y(bgHeight / 2 + this._margin.top)
        //   .width(bgWidth)
        //   .height(bgHeight)
        //   .fill("#ccc")
        //   .render();
        // this._zoomGroup = this._select.selectAll("g.d3plus-viz-zoomGroup").data([0]);
        // const enter = this._zoomGroup.enter().append("g").attr("class", "d3plus-viz-zoomGroup")
        //   .merge(this._zoomGroup);
        // this._zoomGroup = enter.merge(this._zoomGroup);
        // const testConfig = {
        //   on: {
        //     click: this._on["click.shape"],
        //     mouseenter: this._on.mouseenter,
        //     mouseleave: this._on.mouseleave,
        //     mousemove: this._on["mousemove.shape"]
        //   }
        // };
        // const testWidth = 10;
        // this._shapes.push(new Rect()
        //   .config(this._shapeConfig)
        //   .config(configPrep.bind(this)(testConfig))
        //   .data(this._filteredData)
        //   .label("Test Label")
        //   .select(this._zoomGroup.node())
        //   .id(this._id)
        //   .x(() => Math.random() * bgWidth)
        //   .y(() => Math.random() * bgHeight)
        //   .width(testWidth)
        //   .height(testWidth)
        //   .render());
      }
      /**
       * Applies the threshold algorithm according to the type of chart used.
       * @param {Array} data The data to process.
       */

    }, {
      key: "_thresholdFunction",
      value: function _thresholdFunction(data) {
        return data;
      }
      /**
          @memberof Viz
          @desc Draws the visualization given the specified configuration.
          @param {Function} [*callback*] An optional callback function that, if passed, will be called after animation is complete.
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this13 = this;

        // Resets margins and padding
        this._margin = {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        };
        this._padding = {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        };
        this._transition = d3Transition.transition().duration(this._duration); // Appends a fullscreen SVG to the BODY if a container has not been provided through .select().

        if (this._select === void 0 || this._select.node().tagName.toLowerCase() !== "svg") {
          var _parent = this._select === void 0 ? d3Selection.select("body").append("div") : this._select;

          var svg = _parent.append("svg");

          this.select(svg.node());
        }
        /** detects width and height and sets SVG properties */


        function setSVGSize() {
          var display = this._select.style("display");

          this._select.style("display", "none");

          var _getSize = getSize(this._select.node().parentNode),
              _getSize2 = _slicedToArray(_getSize, 2),
              w = _getSize2[0],
              h = _getSize2[1];

          w -= parseFloat(this._select.style("border-left-width"), 10);
          w -= parseFloat(this._select.style("border-right-width"), 10);
          h -= parseFloat(this._select.style("border-top-width"), 10);
          h -= parseFloat(this._select.style("border-bottom-width"), 10);

          this._select.style("display", display);

          if (this._autoWidth) {
            this.width(w);

            this._select.style("width", "".concat(this._width, "px")).attr("width", "".concat(this._width, "px"));
          }

          if (this._autoHeight) {
            this.height(h);

            this._select.style("height", "".concat(this._height, "px")).attr("height", "".concat(this._height, "px"));
          }
        } // Calculates the width and/or height of the Viz based on the this._select, if either has not been defined.


        if ((!this._width || !this._height) && (!this._detectVisible || inViewport(this._select.node()))) {
          this._autoWidth = this._width === undefined;
          this._autoHeight = this._height === undefined;
          setSVGSize.bind(this)();
        }

        this._select.attr("class", "d3plus-viz").attr("aria-hidden", this._ariaHidden).attr("aria-labelledby", "".concat(this._uuid, "-title ").concat(this._uuid, "-desc")).attr("role", "img").attr("xmlns", "http://www.w3.org/2000/svg").attr("xmlns:xlink", "http://www.w3.org/1999/xlink").transition(d3Transition.transition).style("width", this._width !== undefined ? "".concat(this._width, "px") : undefined).style("height", this._height !== undefined ? "".concat(this._height, "px") : undefined).attr("width", this._width !== undefined ? "".concat(this._width, "px") : undefined).attr("height", this._height !== undefined ? "".concat(this._height, "px") : undefined); // sets "position: relative" on the SVG parent if currently undefined


        var parent = d3Selection.select(this._select.node().parentNode);
        var position = parent.style("position");
        if (position === "static") parent.style("position", "relative"); // Updates the <title> tag if already exists else creates a new <title> tag on this.select.

        var svgTitle = this._select.selectAll("title").data([0]);

        var svgTitleEnter = svgTitle.enter().append("title").attr("id", "".concat(this._uuid, "-title"));
        svgTitle.merge(svgTitleEnter).text(this._svgTitle); // Updates the <desc> tag if already exists else creates a new <desc> tag on this.select.

        var svgDesc = this._select.selectAll("desc").data([0]);

        var svgDescEnter = svgDesc.enter().append("desc").attr("id", "".concat(this._uuid, "-desc"));
        svgDesc.merge(svgDescEnter).text(this._svgDesc);
        this._visiblePoll = clearInterval(this._visiblePoll);
        this._resizePoll = clearTimeout(this._resizePoll);
        this._scrollPoll = clearTimeout(this._scrollPoll);
        d3Selection.select(this._scrollContainer).on("scroll.".concat(this._uuid), null);
        d3Selection.select(this._scrollContainer).on("resize.".concat(this._uuid), null);

        if (this._detectVisible && this._select.style("visibility") === "hidden") {
          this._visiblePoll = setInterval(function () {
            if (_this13._select.style("visibility") !== "hidden") {
              _this13._visiblePoll = clearInterval(_this13._visiblePoll);

              _this13.render(callback);
            }
          }, this._detectVisibleInterval);
        } else if (this._detectVisible && this._select.style("display") === "none") {
          this._visiblePoll = setInterval(function () {
            if (_this13._select.style("display") !== "none") {
              _this13._visiblePoll = clearInterval(_this13._visiblePoll);

              _this13.render(callback);
            }
          }, this._detectVisibleInterval);
        } else if (this._detectVisible && !inViewport(this._select.node())) {
          d3Selection.select(this._scrollContainer).on("scroll.".concat(this._uuid), function () {
            if (!_this13._scrollPoll) {
              _this13._scrollPoll = setTimeout(function () {
                if (inViewport(_this13._select.node())) {
                  d3Selection.select(_this13._scrollContainer).on("scroll.".concat(_this13._uuid), null);

                  _this13.render(callback);
                }

                _this13._scrollPoll = clearTimeout(_this13._scrollPoll);
              }, _this13._detectVisibleInterval);
            }
          });
        } else {
          var q = d3Queue.queue();

          this._queue.forEach(function (p) {
            var cache = _this13._cache ? _this13._lrucache.get("".concat(p[3], "_").concat(p[1])) : undefined;
            if (!cache) q.defer.apply(q, _toConsumableArray(p));else _this13["_".concat(p[3])] = p[2] ? p[2](cache) : cache;
          });

          this._queue = [];

          if (this._loadingMessage && q._tasks.length) {
            this._messageClass.render({
              container: this._select.node().parentNode,
              html: this._loadingHTML(this),
              mask: this._filteredData ? this._messageMask : false,
              style: this._messageStyle
            });
          }

          q.awaitAll(function () {
            var columns = _this13._data instanceof Array && _this13._data.length > 0 ? Object.keys(_this13._data[0]) : [];

            var svgTable = _this13._select.selectAll("g.data-table").data(!_this13._ariaHidden && _this13._data instanceof Array && _this13._data.length ? [0] : []);

            var svgTableEnter = svgTable.enter().append("g").attr("class", "data-table").attr("role", "table");
            svgTable.exit().remove();
            var rows = svgTable.merge(svgTableEnter).selectAll("text").data(_this13._data instanceof Array ? d3Array.range(0, _this13._data.length + 1) : []);
            rows.exit().remove();
            var cells = rows.merge(rows.enter().append("text").attr("role", "row")).selectAll("tspan").data(function (d, i) {
              return columns.map(function (c) {
                return {
                  role: i ? "cell" : "columnheader",
                  text: i ? _this13._data[i - 1][c] : c
                };
              });
            });
            cells.exit().remove();
            cells.merge(cells.enter().append("tspan")).attr("role", function (d) {
              return d.role;
            }).attr("dy", "-1000px").html(function (d) {
              return d.text;
            });

            _this13._preDraw();

            _this13._draw(callback);

            zoomControls.bind(_this13)();
            drawAttribution.bind(_this13)();
            if (_this13._messageClass._isVisible && (!_this13._noDataMessage || _this13._filteredData.length)) _this13._messageClass.hide();

            if (_this13._detectResize && (_this13._autoWidth || _this13._autoHeight)) {
              d3Selection.select(_this13._scrollContainer).on("resize.".concat(_this13._uuid), function () {
                _this13._resizePoll = clearTimeout(_this13._resizePoll);
                _this13._resizePoll = setTimeout(function () {
                  _this13._resizePoll = clearTimeout(_this13._resizePoll);
                  setSVGSize.bind(_this13)();

                  _this13.render(callback);
                }, _this13._detectResizeDelay);
              });
            }

            if (callback) setTimeout(callback, _this13._duration + 100);
          });
        } // Attaches touchstart event listener to the BODY to hide the tooltip when the user touches any element without data


        d3Selection.select("body").on("touchstart.".concat(this._uuid), touchstartBody.bind(this));
        return this;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the active method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "active",
      value: function active(_) {
        this._active = _;

        if (this._shapeConfig.activeOpacity !== 1) {
          this._shapes.forEach(function (s) {
            return s.active(_);
          });

          if (this._legend) this._legendClass.active(_);
        }

        return this;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the aggregation method for each key in the object and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "aggs",
      value: function aggs(_) {
        return arguments.length ? (this._aggs = d3plusCommon.assign(this._aggs, _), this) : this._aggs;
      }
      /**
          @memberof Viz
          @desc Sets the "aria-hidden" attribute of the containing SVG element. The default value is "false", but it you need to hide the SVG from screen readers set this property to "true".
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "ariaHidden",
      value: function ariaHidden(_) {
        return arguments.length ? (this._ariaHidden = _, this) : this._ariaHidden;
      }
      /**
          @memberof Viz
          @desc Sets text to be shown positioned absolute on top of the visualization in the bottom-right corner. This is most often used in Geomaps to display the copyright of map tiles. The text is rendered as HTML, so any valid HTML string will render as expected (eg. anchor links work).
          @param {HTMLString|Boolean} *value* = false
          @chainable
      */

    }, {
      key: "attribution",
      value: function attribution(_) {
        return arguments.length ? (this._attribution = _, this) : this._attribution;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the back button and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "attributionStyle",
      value: function attributionStyle(_) {
        return arguments.length ? (this._attributionStyle = d3plusCommon.assign(this._attributionStyle, _), this) : this._attributionStyle;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the back button and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "backConfig",
      value: function backConfig(_) {
        return arguments.length ? (this._backConfig = d3plusCommon.assign(this._backConfig, _), this) : this._backConfig;
      }
      /**
          @memberof Viz
          @desc Enables a lru cache that stores up to 5 previously loaded files/URLs. Helpful when constantly writing over the data array with a URL in the render function of a react component.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "cache",
      value: function cache(_) {
        return arguments.length ? (this._cache = _, this) : this._cache;
      }
      /**
          @memberof Viz
          @desc Defines the main color to be used for each data point in a visualization. Can be either an accessor function or a string key to reference in each data point. If a color value is returned, it will be used as is. If a string is returned, a unique color will be assigned based on the string.
          @param {Function|String|False} [*value*]
          @chainable
      */

    }, {
      key: "color",
      value: function color(_) {
        return arguments.length ? (this._color = !_ || typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._color;
      }
      /**
          @memberof Viz
          @desc Defines the value to be used for a color scale. Can be either an accessor function or a string key to reference in each data point.
          @param {Function|String|False} [*value*]
          @chainable
      */

    }, {
      key: "colorScale",
      value: function colorScale(_) {
        return arguments.length ? (this._colorScale = !_ || typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._colorScale;
      }
      /**
          @memberof Viz
          @desc A pass-through to the config method of ColorScale.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "colorScaleConfig",
      value: function colorScaleConfig(_) {
        return arguments.length ? (this._colorScaleConfig = d3plusCommon.assign(this._colorScaleConfig, _), this) : this._colorScaleConfig;
      }
      /**
          @memberof Viz
          @desc Tells the colorScale whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the colorScale appears centered above the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "colorScalePadding",
      value: function colorScalePadding(_) {
        return arguments.length ? (this._colorScalePadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._colorScalePadding;
      }
      /**
          @memberof Viz
          @desc Defines which side of the visualization to anchor the color scale. Acceptable values are `"top"`, `"bottom"`, `"left"`, `"right"`, and `false`. A `false` value will cause the color scale to not be displayed, but will still color shapes based on the scale.
          @param {String|Boolean} [*value* = "bottom"]
          @chainable
      */

    }, {
      key: "colorScalePosition",
      value: function colorScalePosition(_) {
        return arguments.length ? (this._colorScalePosition = _, this) : this._colorScalePosition;
      }
      /**
          @memberof Viz
          @desc Sets the maximum pixel size for drawing the color scale: width for horizontal scales and height for vertical scales.
          @param {Number} [*value* = 600]
          @chainable
      */

    }, {
      key: "colorScaleMaxSize",
      value: function colorScaleMaxSize(_) {
        return arguments.length ? (this._colorScaleMaxSize = _, this) : this._colorScaleMaxSize;
      }
      /**
          @memberof Viz
          @desc Defines a list of controls to be rendered at the bottom of the visualization.
          @param {Array} [*value*]
          @chainable
      */

    }, {
      key: "controls",
      value: function controls(_) {
        return arguments.length ? (this._controls = _, this) : this._controls;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the controls and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "controlConfig",
      value: function controlConfig(_) {
        return arguments.length ? (this._controlConfig = d3plusCommon.assign(this._controlConfig, _), this) : this._controlConfig;
      }
      /**
          @memberof Viz
          @desc Tells the controls whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the controls appears centered above the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "controlPadding",
      value: function controlPadding(_) {
        return arguments.length ? (this._controlPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._controlPadding;
      }
      /**
          @memberof Viz
          @desc Sets the primary data array to be used when drawing the visualization. The value passed should be an *Array* of objects or a *String* representing a filepath or URL to be loaded. The following filetypes are supported: `csv`, `tsv`, `txt`, and `json`.
      If your data URL needs specific headers to be set, an Object with "url" and "headers" keys may also be passed.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final array of obejcts to be used as the primary data array. For example, some JSON APIs return the headers split from the data values to save bandwidth. These would need be joined using a custom formatter.
      If you would like to specify certain configuration options based on the yet-to-be-loaded data, you can also return a full `config` object from the data formatter (including the new `data` array as a key in the object).
      If *data* is not specified, this method returns the current primary data array, which defaults to an empty array (`[]`);
          @param {Array|String} *data* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_, f) {
        if (arguments.length) {
          addToQueue.bind(this)(_, f, "data");
          this._hidden = [];
          this._solo = [];
          return this;
        }

        return this._data;
      }
      /**
          @memberof Viz
          @desc If the number of visible data points exceeds this number, the default hover behavior will be disabled (helpful for very large visualizations bogging down the DOM with opacity updates).
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "dataCutoff",
      value: function dataCutoff(_) {
        return arguments.length ? (this._dataCutoff = _, this) : this._dataCutoff;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the depth to the specified number and returns the current class instance. The *value* should correspond with an index in the [groupBy](#groupBy) array.
          @param {Number} [*value*]
          @chainable
      */

    }, {
      key: "depth",
      value: function depth(_) {
        return arguments.length ? (this._depth = _, this) : this._depth;
      }
      /**
          @memberof Viz
          @desc If the width and/or height of a Viz is not user-defined, it is determined by the size of it's parent element. When this method is set to `true`, the Viz will listen for the `window.onresize` event and adjust it's dimensions accordingly.
          @param {Boolean} *value* = true
          @chainable
      */

    }, {
      key: "detectResize",
      value: function detectResize(_) {
        return arguments.length ? (this._detectResize = _, this) : this._detectResize;
      }
      /**
          @memberof Viz
          @desc When resizing the browser window, this is the millisecond delay to trigger the resize event.
          @param {Number} *value* = 400
          @chainable
      */

    }, {
      key: "detectResizeDelay",
      value: function detectResizeDelay(_) {
        return arguments.length ? (this._detectResizeDelay = _, this) : this._detectResizeDelay;
      }
      /**
          @memberof Viz
          @desc Toggles whether or not the Viz should try to detect if it visible in the current viewport. When this method is set to `true`, the Viz will only be rendered when it has entered the viewport either through scrolling or if it's display or visibility is changed.
          @param {Boolean} *value* = true
          @chainable
      */

    }, {
      key: "detectVisible",
      value: function detectVisible(_) {
        return arguments.length ? (this._detectVisible = _, this) : this._detectVisible;
      }
      /**
          @memberof Viz
          @desc The interval, in milliseconds, for checking if the visualization is visible on the page.
          @param {Number} *value* = 1000
          @chainable
      */

    }, {
      key: "detectVisibleInterval",
      value: function detectVisibleInterval(_) {
        return arguments.length ? (this._detectVisibleInterval = _, this) : this._detectVisibleInterval;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the discrete accessor to the specified method name (usually an axis) and returns the current class instance.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "discrete",
      value: function discrete(_) {
        return arguments.length ? (this._discrete = _, this) : this._discrete;
      }
      /**
          @memberof Viz
          @desc Shows a button that allows for downloading the current visualization.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "downloadButton",
      value: function downloadButton(_) {
        return arguments.length ? (this._downloadButton = _, this) : this._downloadButton;
      }
      /**
          @memberof Viz
          @desc Sets specific options of the saveElement function used when downloading the visualization.
          @param {Object} [*value* = {type: "png"}]
          @chainable
      */

    }, {
      key: "downloadConfig",
      value: function downloadConfig(_) {
        return arguments.length ? (this._downloadConfig = d3plusCommon.assign(this._downloadConfig, _), this) : this._downloadConfig;
      }
      /**
          @memberof Viz
          @desc Defines which control group to add the download button into.
          @param {String} [*value* = "top"]
          @chainable
      */

    }, {
      key: "downloadPosition",
      value: function downloadPosition(_) {
        return arguments.length ? (this._downloadPosition = _, this) : this._downloadPosition;
      }
      /**
          @memberof Viz
          @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
          @param {Number} [*ms* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the filter to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "filter",
      value: function filter(_) {
        return arguments.length ? (this._filter = _, this) : this._filter;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns the current class instance.
          @param {String|Function|Array} [*value*]
          @chainable
          @example
      function value(d) {
      return d.id;
      }
      */

    }, {
      key: "groupBy",
      value: function groupBy(_) {
        var _this14 = this;

        if (!arguments.length) return this._groupBy;
        if (!(_ instanceof Array)) _ = [_];
        return this._groupBy = _.map(function (k) {
          if (typeof k === "function") return k;else {
            if (!_this14._aggs[k]) {
              _this14._aggs[k] = function (a, c) {
                var v = d3plusCommon.unique(a.map(c));
                return v.length === 1 ? v[0] : v;
              };
            }

            return d3plusCommon.accessor(k);
          }
        }), this;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the overall height to the specified number and returns the current class instance.
          @param {Number} [*value* = window.innerHeight]
          @chainable
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = _, this) : this._height;
      }
      /**
          @memberof Viz
          @desc Defines the color used for legend shapes when the corresponding grouping is hidden from display (by clicking on the legend).
          @param {Function|String} [*value* = "#aaa"]
          @chainable
      */

    }, {
      key: "hiddenColor",
      value: function hiddenColor(_) {
        return arguments.length ? (this._hiddenColor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._hiddenColor;
      }
      /**
          @memberof Viz
          @desc Defines the opacity used for legend labels when the corresponding grouping is hidden from display (by clicking on the legend).
          @param {Function|Number} [*value* = 0.5]
          @chainable
      */

    }, {
      key: "hiddenOpacity",
      value: function hiddenOpacity(_) {
        return arguments.length ? (this._hiddenOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._hiddenOpacity;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "hover",
      value: function hover(_) {
        var _this15 = this;

        var hoverFunction = this._hover = _;

        if (this._shapeConfig.hoverOpacity !== 1) {
          if (typeof _ === "function") {
            var shapeData = d3Array.merge(this._shapes.map(function (s) {
              return s.data();
            }));
            shapeData = shapeData.concat(this._legendClass.data());
            var activeData = _ ? shapeData.filter(_) : [];
            var activeIds = [];
            activeData.map(this._ids).forEach(function (ids) {
              for (var x = 1; x <= ids.length; x++) {
                activeIds.push(JSON.stringify(ids.slice(0, x)));
              }
            });
            activeIds = activeIds.filter(function (id, i) {
              return activeIds.indexOf(id) === i;
            });
            if (activeIds.length) hoverFunction = function hoverFunction(d, i) {
              return activeIds.includes(JSON.stringify(_this15._ids(d, i)));
            };
          }

          this._shapes.forEach(function (s) {
            return s.hover(hoverFunction);
          });

          if (this._legend) this._legendClass.hover(hoverFunction);
        }

        return this;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "label",
      value: function label(_) {
        return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "legend",
      value: function legend(_) {
        return arguments.length ? (this._legend = _, this) : this._legend;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, the object is passed to the legend's config method.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "legendConfig",
      value: function legendConfig(_) {
        return arguments.length ? (this._legendConfig = d3plusCommon.assign(this._legendConfig, _), this) : this._legendConfig;
      }
      /**
       * @memberof Viz
       * @desc If *value* is specified, sets the cutoff for the amount of categories in the legend.
       * @param {Number} [*value* = 1]
       * @chainable
       */

    }, {
      key: "legendCutoff",
      value: function legendCutoff(_) {
        return arguments.length ? (this._legendCutoff = _, this) : this._legendCutoff;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the legend tooltip and returns the current class instance.
          @param {Object} [*value* = {}]
          @chainable
      */

    }, {
      key: "legendTooltip",
      value: function legendTooltip(_) {
        return arguments.length ? (this._legendTooltip = d3plusCommon.assign(this._legendTooltip, _), this) : this._legendTooltip;
      }
      /**
          @memberof Viz
          @desc Tells the legend whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the legend appears centered underneath the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "legendPadding",
      value: function legendPadding(_) {
        return arguments.length ? (this._legendPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._legendPadding;
      }
      /**
          @memberof Viz
          @desc Defines which side of the visualization to anchor the legend. Expected values are `"top"`, `"bottom"`, `"left"`, and `"right"`.
          @param {String} [*value* = "bottom"]
          @chainable
      */

    }, {
      key: "legendPosition",
      value: function legendPosition(_) {
        return arguments.length ? (this._legendPosition = _, this) : this._legendPosition;
      }
      /**
          @memberof Viz
          @desc A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) used to sort the legend.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "legendSort",
      value: function legendSort(_) {
        return arguments.length ? (this._legendSort = _, this) : this._legendSort;
      }
      /**
          @memberof Viz
          @desc Sets the inner HTML of the status message that is displayed when loading AJAX requests and displaying errors. Must be a valid HTML string or a function that, when passed this Viz instance, returns a valid HTML string.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "loadingHTML",
      value: function loadingHTML(_) {
        return arguments.length ? (this._loadingHTML = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._loadingHTML;
      }
      /**
          @memberof Viz
          @desc Toggles the visibility of the status message that is displayed when loading AJAX requests and displaying errors.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "loadingMessage",
      value: function loadingMessage(_) {
        return arguments.length ? (this._loadingMessage = _, this) : this._loadingMessage;
      }
      /**
          @memberof Viz
          @desc Sets the color of the mask used underneath the status message that is displayed when loading AJAX requests and displaying errors. Additionally, `false` will turn off the mask completely.
          @param {Boolean|String} [*value* = "rgba(0, 0, 0, 0.1)"]
          @chainable
      */

    }, {
      key: "messageMask",
      value: function messageMask(_) {
        return arguments.length ? (this._messageMask = _, this) : this._messageMask;
      }
      /**
          @memberof Viz
          @desc Defines the CSS style properties for the status message that is displayed when loading AJAX requests and displaying errors.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "messageStyle",
      value: function messageStyle(_) {
        return arguments.length ? (this._messageStyle = d3plusCommon.assign(this._messageStyle, _), this) : this._messageStyle;
      }
      /**
          @memberof Viz
          @desc Sets the inner HTML of the status message that is displayed when no data is supplied to the visualization. Must be a valid HTML string or a function that, when passed this Viz instance, returns a valid HTML string.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "noDataHTML",
      value: function noDataHTML(_) {
        return arguments.length ? (this._noDataHTML = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._noDataHTML;
      }
      /**
         @memberof Viz
         @desc Toggles the visibility of the status message that is displayed when no data is supplied to the visualization.
         @param {Boolean} [*value* = true]
         @chainable
      */

    }, {
      key: "noDataMessage",
      value: function noDataMessage(_) {
        return arguments.length ? (this._noDataMessage = _, this) : this._noDataMessage;
      }
      /**
          @memberof Viz
          @desc If using scroll or visibility detection, this method allow a custom override of the element to which the scroll detection function gets attached.
          @param {String|HTMLElement} *selector*
          @chainable
      */

    }, {
      key: "scrollContainer",
      value: function scrollContainer(_) {
        return arguments.length ? (this._scrollContainer = _, this) : this._scrollContainer;
      }
      /**
          @memberof Viz
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
          @param {String|HTMLElement} [*selector*]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the shape accessor to the specified function or number and returns the current class instance.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "shape",
      value: function shape(_) {
        return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for each shape and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "shapeConfig",
      value: function shapeConfig(_) {
        return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the description accessor to the specified string and returns the current class instance.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "svgDesc",
      value: function svgDesc(_) {
        return arguments.length ? (this._svgDesc = _, this) : this._svgDesc;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the title accessor to the specified string and returns the current class instance.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "svgTitle",
      value: function svgTitle(_) {
        return arguments.length ? (this._svgTitle = _, this) : this._svgTitle;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the threshold for buckets to the specified function or string, and returns the current class instance.
          @param {Function|Number} [value]
          @chainable
       */

    }, {
      key: "threshold",
      value: function threshold(_) {
        if (arguments.length) {
          if (typeof _ === "function") {
            this._threshold = _;
          } else if (isFinite(_) && !isNaN(_)) {
            this._threshold = d3plusCommon.constant(_ * 1);
          }

          return this;
        } else return this._threshold;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the accesor for the value used in the threshold algorithm, and returns the current class instance.
          @param {Function|Number} [value]
          @chainable
       */

    }, {
      key: "thresholdKey",
      value: function thresholdKey(key) {
        if (arguments.length) {
          if (typeof key === "function") {
            this._thresholdKey = key;
          } else {
            this._thresholdKey = d3plusCommon.accessor(key);
          }

          return this;
        } else return this._thresholdKey;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the label for the bucket item, and returns the current class instance.
          @param {Function|String} [value]
          @chainable
       */

    }, {
      key: "thresholdName",
      value: function thresholdName(_) {
        return arguments.length ? (this._thresholdName = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._thresholdName;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the time accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "time",
      value: function time(_) {
        if (arguments.length) {
          if (typeof _ === "function") {
            this._time = _;
          } else {
            this._time = d3plusCommon.accessor(_);

            if (!this._aggs[_]) {
              this._aggs[_] = function (a, c) {
                var v = d3plusCommon.unique(a.map(c));
                return v.length === 1 ? v[0] : v;
              };
            }
          }

          this._timeFilter = false;
          return this;
        } else return this._time;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the time filter to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "timeFilter",
      value: function timeFilter(_) {
        return arguments.length ? (this._timeFilter = _, this) : this._timeFilter;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, toggles the timeline based on the specified boolean and returns the current class instance.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "timeline",
      value: function timeline(_) {
        return arguments.length ? (this._timeline = _, this) : this._timeline;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the timeline and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "timelineConfig",
      value: function timelineConfig(_) {
        return arguments.length ? (this._timelineConfig = d3plusCommon.assign(this._timelineConfig, _), this) : this._timelineConfig;
      }
      /**
          @memberof Viz
          @desc Tells the timeline whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the timeline appears centered underneath the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "timelinePadding",
      value: function timelinePadding(_) {
        return arguments.length ? (this._timelinePadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._timelinePadding;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the title accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "title",
      value: function title(_) {
        return arguments.length ? (this._title = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._title;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the title and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "titleConfig",
      value: function titleConfig(_) {
        return arguments.length ? (this._titleConfig = d3plusCommon.assign(this._titleConfig, _), this) : this._titleConfig;
      }
      /**
          @memberof Viz
          @desc Tells the title whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the title appears centered above the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "titlePadding",
      value: function titlePadding(_) {
        return arguments.length ? (this._titlePadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._titlePadding;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance.
          @param {Boolean|Function} [*value* = true]
          @chainable
      */

    }, {
      key: "tooltip",
      value: function tooltip(_) {
        return arguments.length ? (this._tooltip = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._tooltip;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the tooltip and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "tooltipConfig",
      value: function tooltipConfig(_) {
        return arguments.length ? (this._tooltipConfig = d3plusCommon.assign(this._tooltipConfig, _), this) : this._tooltipConfig;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the total accessor to the specified function or string and returns the current class instance.
          @param {Boolean|Function|String} [*value*]
          @chainable
      */

    }, {
      key: "total",
      value: function total(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._total = _;else if (_) this._total = d3plusCommon.accessor(_);else this._total = false;
          return this;
        } else return this._total;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the config method for the total and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "totalConfig",
      value: function totalConfig(_) {
        return arguments.length ? (this._totalConfig = d3plusCommon.assign(this._totalConfig, _), this) : this._totalConfig;
      }
      /**
          @memberof Viz
          @desc Formatter function for the value in the total bar.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "totalFormat",
      value: function totalFormat(_) {
        return arguments.length ? (this._totalFormat = _, this) : this._totalFormat;
      }
      /**
          @memberof Viz
          @desc Tells the total whether or not to use the internal padding defined by the visualization in it's positioning. For example, d3plus-plot will add padding on the left so that the total appears centered above the x-axis. By default, this padding is only applied on screens larger than 600 pixels wide.
          @param {Boolean|Function} [*value*]
          @chainable
      */

    }, {
      key: "totalPadding",
      value: function totalPadding(_) {
        return arguments.length ? (this._totalPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._totalPadding;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the overallwidth to the specified number and returns the current class instance.
          @param {Number} [*value* = window.innerWidth]
          @chainable
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = _, this) : this._width;
      }
      /**
          @memberof Viz
          @desc Toggles the ability to zoom/pan the visualization. Certain parameters for zooming are required to be hooked up on a visualization by visualization basis.
          @param {Boolean} *value* = false
          @chainable
      */

    }, {
      key: "zoom",
      value: function zoom(_) {
        return arguments.length ? (this._zoom = _, this) : this._zoom;
      }
      /**
          @memberof Viz
          @desc The pixel stroke-width of the zoom brush area.
          @param {Number} *value* = 1
          @chainable
      */

    }, {
      key: "zoomBrushHandleSize",
      value: function zoomBrushHandleSize(_) {
        return arguments.length ? (this._zoomBrushHandleSize = _, this) : this._zoomBrushHandleSize;
      }
      /**
          @memberof Viz
          @desc An object containing CSS key/value pairs that is used to style the outer handle area of the zoom brush. Passing `false` will remove all default styling.
          @param {Object|Boolean} *value*
          @chainable
      */

    }, {
      key: "zoomBrushHandleStyle",
      value: function zoomBrushHandleStyle(_) {
        return arguments.length ? (this._zoomBrushHandleStyle = _, this) : this._zoomBrushHandleStyle;
      }
      /**
          @memberof Viz
          @desc An object containing CSS key/value pairs that is used to style the inner selection area of the zoom brush. Passing `false` will remove all default styling.
          @param {Object|Boolean} *value*
          @chainable
      */

    }, {
      key: "zoomBrushSelectionStyle",
      value: function zoomBrushSelectionStyle(_) {
        return arguments.length ? (this._zoomBrushSelectionStyle = _, this) : this._zoomBrushSelectionStyle;
      }
      /**
          @memberof Viz
          @desc An object containing CSS key/value pairs that is used to style each zoom control button (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
          @param {Object|Boolean} *value*
          @chainable
      */

    }, {
      key: "zoomControlStyle",
      value: function zoomControlStyle(_) {
        return arguments.length ? (this._zoomControlStyle = _, this) : this._zoomControlStyle;
      }
      /**
          @memberof Viz
          @desc An object containing CSS key/value pairs that is used to style each zoom control button when active (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
          @param {Object|Boolean} *value*
          @chainable
      */

    }, {
      key: "zoomControlStyleActive",
      value: function zoomControlStyleActive(_) {
        return arguments.length ? (this._zoomControlStyleActive = _, this) : this._zoomControlStyleActive;
      }
      /**
          @memberof Viz
          @desc An object containing CSS key/value pairs that is used to style each zoom control button on hover (`.zoom-in`, `.zoom-out`, `.zoom-reset`, and `.zoom-brush`). Passing `false` will remove all default styling.
          @param {Object|Boolean} *value*
          @chainable
      */

    }, {
      key: "zoomControlStyleHover",
      value: function zoomControlStyleHover(_) {
        return arguments.length ? (this._zoomControlStyleHover = _, this) : this._zoomControlStyleHover;
      }
      /**
          @memberof Viz
          @desc The multiplier that is used in with the control buttons when zooming in and out.
          @param {Number} *value* = 2
          @chainable
      */

    }, {
      key: "zoomFactor",
      value: function zoomFactor(_) {
        return arguments.length ? (this._zoomFactor = _, this) : this._zoomFactor;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.
          @param {Number} *value* = 16
          @chainable
      */

    }, {
      key: "zoomMax",
      value: function zoomMax(_) {
        return arguments.length ? (this._zoomMax = _, this) : this._zoomMax;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.
          @param {Boolean} *value* = true
          @chainable
      */

    }, {
      key: "zoomPan",
      value: function zoomPan(_) {
        return arguments.length ? (this._zoomPan = _, this) : this._zoomPan;
      }
      /**
          @memberof Viz
          @desc A pixel value to be used to pad all sides of a zoomed area.
          @param {Number} *value* = 20
          @chainable
      */

    }, {
      key: "zoomPadding",
      value: function zoomPadding(_) {
        return arguments.length ? (this._zoomPadding = _, this) : this._zoomPadding;
      }
      /**
          @memberof Viz
          @desc If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "zoomScroll",
      value: function zoomScroll(_) {
        return arguments.length ? (this._zoomScroll = _, this) : this._zoomScroll;
      }
    }]);

    return Viz;
  }(d3plusCommon.BaseClass);

  exports.Viz = Viz;
  exports.addToQueue = addToQueue;
  exports.dataConcat = concat;
  exports.dataFold = fold;
  exports.dataLoad = load;
  exports.isData = isData;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=d3plus-viz.js.map
