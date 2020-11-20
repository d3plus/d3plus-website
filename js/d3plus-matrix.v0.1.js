function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  d3plus-matrix v0.1.2
  Row/column layouts
  Copyright (c) 2020 D3plus - https://d3plus.org
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
      version: '3.7.0',
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

  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

  var createMethod$1 = function createMethod$1(TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
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
              } else if (IS_EVERY) return false; // every
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
    findIndex: createMethod$1(6)
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
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-axis'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3-array'), require('d3-shape'), require('d3plus-text')) : typeof define === 'function' && define.amd ? define('d3plus-matrix', ['exports', 'd3plus-axis', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3-array', 'd3-shape', 'd3plus-text'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3plus = {}, global.d3plusAxis, global.d3plusCommon, global.d3plusShape, global.d3plusViz, global.d3Array, global.d3Shape, global.d3plusText));
})(this, function (exports, d3plusAxis, d3plusCommon, d3plusShape, d3plusViz, d3Array, d3Shape, d3plusText) {
  'use strict';
  /**
   *
   * @param {String} type
   * @param {Object} d
   * @param {Number} i
   * @private
   */

  function getProp(type, d, i) {
    return d[type] || this["_".concat(type)](d, i);
  }

  var cartesian = function cartesian(a, b) {
    var _ref;

    return (_ref = []).concat.apply(_ref, _toConsumableArray(a.map(function (d) {
      return b.map(function (e) {
        return [].concat(d, e);
      });
    })));
  };
  /**
   * @private
   */


  function prepData() {
    var _this = this;

    var data = this._filteredData;
    var rowValues = d3plusCommon.unique(data.map(this._row)).sort(this._rowSort);
    var columnValues = d3plusCommon.unique(data.map(this._column)).sort(this._columnSort);
    if (!rowValues.length || !columnValues.length) return this;
    var shapeData = cartesian(rowValues, columnValues).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          rowValue = _ref3[0],
          columnValue = _ref3[1];

      var dataObj = {
        __d3plusTooltip__: true,
        __d3plus__: true,
        column: columnValue,
        row: rowValue
      };
      var dataIndex = data.findIndex(function (d, i) {
        return _this._row(d, i) === rowValue && _this._column(d, i) === columnValue;
      });

      if (dataIndex >= 0) {
        dataObj.i = dataIndex;
        dataObj.data = data[dataIndex];
      } else {
        dataObj.data = {
          row: rowValue,
          column: columnValue
        };
      }

      return dataObj;
    });
    return {
      rowValues: rowValues,
      columnValues: columnValues,
      shapeData: shapeData
    };
  }

  var defaultAxisConfig = {
    align: "start",
    barConfig: {
      stroke: 0
    },
    gridSize: 0,
    paddingInner: 0,
    paddingOuter: 0,
    scale: "band",
    tickSize: 0
  };
  /**
      @class Matrix
      @extends Viz
      @desc Creates a simple rows/columns Matrix view of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/getting-started/) for help getting started using the Matrix class.
  */

  var Matrix = /*#__PURE__*/function (_d3plusViz$Viz) {
    _inherits(Matrix, _d3plusViz$Viz);

    var _super = _createSuper(Matrix);

    /**
      @memberof Matrix
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
    */
    function Matrix() {
      var _this2;

      _classCallCheck(this, Matrix);

      _this2 = _super.call(this);
      _this2._cellPadding = 2;
      _this2._column = d3plusCommon.accessor("column");
      _this2._columnAxis = new d3plusAxis.Axis();
      _this2._columnConfig = d3plusCommon.assign({
        orient: "top"
      }, defaultAxisConfig);

      _this2._columnSort = function (a, b) {
        return "".concat(a).localeCompare("".concat(b));
      };

      _this2._label = function (d, i) {
        return "".concat(getProp.bind(_assertThisInitialized(_this2))("row", d, i), " / ").concat(getProp.bind(_assertThisInitialized(_this2))("column", d, i));
      };

      var defaultMouseMoveShape = _this2._on["mousemove.shape"];

      _this2._on["mousemove.shape"] = function (d, i) {
        defaultMouseMoveShape(d, i);
        var row = getProp.bind(_assertThisInitialized(_this2))("row", d, i);
        var column = getProp.bind(_assertThisInitialized(_this2))("column", d, i);

        _this2.hover(function (h, ii) {
          return getProp.bind(_assertThisInitialized(_this2))("row", h, ii) === row || getProp.bind(_assertThisInitialized(_this2))("column", h, ii) === column;
        });
      };

      _this2._row = d3plusCommon.accessor("row");
      _this2._rowAxis = new d3plusAxis.Axis();
      _this2._rowConfig = d3plusCommon.assign({
        orient: "left"
      }, defaultAxisConfig);

      _this2._rowSort = function (a, b) {
        return "".concat(a).localeCompare("".concat(b));
      };

      return _this2;
    }
    /**
        @memberof Matrix
        @desc Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Matrix, [{
      key: "_draw",
      value: function _draw(callback) {
        var _prepData$bind = prepData.bind(this)(this._filteredData),
            rowValues = _prepData$bind.rowValues,
            columnValues = _prepData$bind.columnValues,
            shapeData = _prepData$bind.shapeData;

        if (!rowValues.length || !columnValues.length) return this;
        var height = this._height - this._margin.top - this._margin.bottom,
            parent = this._select,
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;
        var hidden = {
          opacity: 0
        };
        var visible = {
          opacity: 1
        };

        var selectElem = function selectElem(name, opts) {
          return d3plusCommon.elem("g.d3plus-Matrix-".concat(name), Object.assign({
            parent: parent,
            transition: transition
          }, opts)).node();
        };

        this._rowAxis.select(selectElem("row", {
          enter: hidden,
          update: hidden
        })).domain(rowValues).height(height).maxSize(width / 2).width(width).config(this._rowConfig).render();

        var rowPadding = this._rowAxis.outerBounds().width - this._rowAxis.padding() * 2;
        this._padding.left += rowPadding;
        var columnTransform = "translate(".concat(rowPadding + this._margin.left, ", ").concat(this._margin.top, ")");
        var hiddenTransform = Object.assign({
          transform: columnTransform
        }, hidden);

        this._columnAxis.select(selectElem("column", {
          enter: hiddenTransform,
          update: hiddenTransform
        })).domain(columnValues).height(height).maxSize(height / 2).width(width).config(this._columnConfig).render();

        var columnPadding = this._columnAxis.outerBounds().height - this._columnAxis.padding() * 2;
        this._padding.top += columnPadding;

        _get(_getPrototypeOf(Matrix.prototype), "_draw", this).call(this, callback);

        var rowTransform = "translate(".concat(this._margin.left, ", ").concat(columnPadding + this._margin.top, ")");
        columnTransform = "translate(".concat(rowPadding + this._margin.left, ", ").concat(this._margin.top, ")");
        var visibleTransform = Object.assign({
          transform: columnTransform
        }, visible);

        this._rowAxis.select(selectElem("row", {
          update: Object.assign({
            transform: rowTransform
          }, visible)
        })).height(height - this._margin.top - this._margin.bottom - columnPadding).width(rowPadding + this._rowAxis.padding() * 2).render();

        this._columnAxis.select(selectElem("column", {
          update: visibleTransform
        })).height(columnPadding + this._columnAxis.padding() * 2).width(width - this._margin.left - this._margin.right - rowPadding).render();

        var rowScale = this._rowAxis._getPosition.bind(this._rowAxis);

        var columnScale = this._columnAxis._getPosition.bind(this._columnAxis);

        var cellHeight = rowValues.length > 1 ? rowScale(rowValues[1]) - rowScale(rowValues[0]) : this._rowAxis.height();
        var cellWidth = columnValues.length > 1 ? columnScale(columnValues[1]) - columnScale(columnValues[0]) : this._columnAxis.width();
        var transform = "translate(".concat(this._margin.left + rowPadding, ", ").concat(this._margin.top + columnPadding, ")");
        var rectConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Rect");

        this._shapes.push(new d3plusShape.Rect().data(shapeData).select(d3plusCommon.elem("g.d3plus-Matrix-cells", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config({
          height: cellHeight - this._cellPadding,
          width: cellWidth - this._cellPadding,
          x: function x(d) {
            return columnScale(d.column) + cellWidth / 2;
          },
          y: function y(d) {
            return rowScale(d.row) + cellHeight / 2;
          }
        }).config(rectConfig).render());

        return this;
      }
      /**
          @memberof Matrix
          @desc The pixel padding in between each cell.
          @param {Number} [*value* = 2]
      */

    }, {
      key: "cellPadding",
      value: function cellPadding(_) {
        return arguments.length ? (this._cellPadding = _, this) : this._cellPadding;
      }
      /**
          @memberof Matrix
          @desc Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.
          @param {String|Function} [*value*]
          @example
      function column(d) {
      return d.name;
      }
      */

    }, {
      key: "column",
      value: function column(_) {
        return arguments.length ? (this._column = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._column;
      }
      /**
          @memberof Matrix
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "columnConfig",
      value: function columnConfig(_) {
        return arguments.length ? (this._columnConfig = d3plusCommon.assign(this._columnConfig, _), this) : this._columnConfig;
      }
      /**
          @memberof Matrix
          @desc A sort comparator function that is run on the unique set of column values.
          @param {Function} [*value*]
          @example
      function column(a, b) {
      return a.localeCompare(b);
      }
      */

    }, {
      key: "columnSort",
      value: function columnSort(_) {
        return arguments.length ? (this._columnSort = _, this) : this._columnSort;
      }
      /**
          @memberof Matrix
          @desc Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.
          @param {String|Function} [*value*]
          @example
      function row(d) {
      return d.name;
      }
      */

    }, {
      key: "row",
      value: function row(_) {
        return arguments.length ? (this._row = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._row;
      }
      /**
          @memberof Matrix
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the row labels.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "rowConfig",
      value: function rowConfig(_) {
        return arguments.length ? (this._rowConfig = d3plusCommon.assign(this._rowConfig, _), this) : this._rowConfig;
      }
      /**
          @memberof Matrix
          @desc A sort comparator function that is run on the unique set of row values.
          @param {Function} [*value*]
          @example
      function row(a, b) {
      return a.localeCompare(b);
      }
      */

    }, {
      key: "rowSort",
      value: function rowSort(_) {
        return arguments.length ? (this._rowSort = _, this) : this._rowSort;
      }
    }]);

    return Matrix;
  }(d3plusViz.Viz);

  var tau = Math.PI * 2;
  /**
      @class RadialMatrix
      @extends Viz
      @desc Creates a radial layout of a rows/columns Matrix of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/radial-matrix/) for help getting started using the Matrix class.
  */

  var RadialMatrix = /*#__PURE__*/function (_d3plusViz$Viz2) {
    _inherits(RadialMatrix, _d3plusViz$Viz2);

    var _super2 = _createSuper(RadialMatrix);

    /**
      @memberof RadialMatrix
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
    */
    function RadialMatrix() {
      var _this3;

      _classCallCheck(this, RadialMatrix);

      _this3 = _super2.call(this);
      _this3._cellPadding = 2;
      _this3._column = d3plusCommon.accessor("column");
      _this3._columnConfig = {
        shapeConfig: {
          labelConfig: {
            fontColor: "#000",
            padding: 5,
            textAnchor: function textAnchor(d) {
              return [0, 180].includes(d.angle) ? "middle" : [2, 3].includes(d.quadrant) ? "end" : "start";
            },
            verticalAlign: function verticalAlign(d) {
              return [90, 270].includes(d.angle) ? "middle" : [2, 1].includes(d.quadrant) ? "bottom" : "top";
            }
          }
        }
      };

      _this3._columnSort = function (a, b) {
        return "".concat(a).localeCompare("".concat(b));
      };

      _this3._innerRadius = function (radius) {
        return radius / 5;
      };

      _this3._label = function (d, i) {
        return "".concat(getProp.bind(_assertThisInitialized(_this3))("row", d, i), " / ").concat(getProp.bind(_assertThisInitialized(_this3))("column", d, i));
      };

      var defaultMouseMoveShape = _this3._on["mousemove.shape"];

      _this3._on["mousemove.shape"] = function (d, i) {
        defaultMouseMoveShape(d, i);
        var row = getProp.bind(_assertThisInitialized(_this3))("row", d, i);
        var column = getProp.bind(_assertThisInitialized(_this3))("column", d, i);

        _this3.hover(function (h, ii) {
          return getProp.bind(_assertThisInitialized(_this3))("row", h, ii) === row || getProp.bind(_assertThisInitialized(_this3))("column", h, ii) === column;
        });
      };

      _this3._row = d3plusCommon.accessor("row");

      _this3._rowSort = function (a, b) {
        return "".concat(a).localeCompare("".concat(b));
      };

      _this3._columnLabels = new d3plusText.TextBox();
      return _this3;
    }
    /**
        @memberof RadialMatrix
        @desc Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(RadialMatrix, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this4 = this;

        var _prepData$bind2 = prepData.bind(this)(this._filteredData),
            rowValues = _prepData$bind2.rowValues,
            columnValues = _prepData$bind2.columnValues,
            shapeData = _prepData$bind2.shapeData;

        if (!rowValues.length || !columnValues.length) return this;

        _get(_getPrototypeOf(RadialMatrix.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            parent = this._select,
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;
        var labelHeight = 50,
            labelWidth = 100;
        var radius = d3Array.min([height - labelHeight * 2, width - labelWidth * 2]) / 2,
            transform = "translate(".concat(width / 2 + this._margin.left, ", ").concat(height / 2 + this._margin.top, ")");
        var flippedColumns = columnValues.slice().reverse();
        flippedColumns.unshift(flippedColumns.pop());
        var total = flippedColumns.length;
        var labelData = flippedColumns.map(function (key, i) {
          var radians = i / total * tau;
          var angle = Math.round(radians * 180 / Math.PI);
          var quadrant = Math.floor((angle + 90) / 90 % 4 + 1);
          var xMod = [0, 180].includes(angle) ? -labelWidth / 2 : [2, 3].includes(quadrant) ? -labelWidth : 0;
          var yMod = [90, 270].includes(angle) ? -labelHeight / 2 : [2, 1].includes(quadrant) ? -labelHeight : 0;
          return {
            key: key,
            angle: angle,
            quadrant: quadrant,
            radians: radians,
            x: radius * Math.sin(radians + Math.PI) + xMod,
            y: radius * Math.cos(radians + Math.PI) + yMod
          };
        });

        this._columnLabels.data(labelData).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).text(function (d) {
          return d.key;
        }).width(labelWidth).height(labelHeight).config(this._columnConfig.shapeConfig.labelConfig).select(d3plusCommon.elem("g.d3plus-RadialMatrix-columns", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render();

        var innerRadius = this._innerRadius(radius);

        var rowHeight = (radius - innerRadius) / rowValues.length;
        var columnWidth = labelData.length > 1 ? labelData[1].radians - labelData[0].radians : tau;
        var flippedRows = rowValues.slice().reverse();
        var arcData = d3Shape.arc().padAngle(this._cellPadding / radius).innerRadius(function (d) {
          return innerRadius + flippedRows.indexOf(d.row) * rowHeight + _this4._cellPadding / 2;
        }).outerRadius(function (d) {
          return innerRadius + (flippedRows.indexOf(d.row) + 1) * rowHeight - _this4._cellPadding / 2;
        }).startAngle(function (d) {
          return labelData[columnValues.indexOf(d.column)].radians - columnWidth / 2;
        }).endAngle(function (d) {
          return labelData[columnValues.indexOf(d.column)].radians + columnWidth / 2;
        });

        this._shapes.push(new d3plusShape.Path().data(shapeData).d(arcData).select(d3plusCommon.elem("g.d3plus-RadialMatrix-arcs", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config({
          id: function id(d) {
            return _this4._ids(d).join("-");
          },
          x: 0,
          y: 0
        }).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path")).render());

        return this;
      }
      /**
          @memberof RadialMatrix
          @desc The pixel padding in between each cell.
          @param {Number} [*value* = 2]
      */

    }, {
      key: "cellPadding",
      value: function cellPadding(_) {
        return arguments.length ? (this._cellPadding = _, this) : this._cellPadding;
      }
      /**
          @memberof RadialMatrix
          @desc Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.
          @param {String|Function} [*value*]
          @example
      function column(d) {
      return d.name;
      }
      */

    }, {
      key: "column",
      value: function column(_) {
        return arguments.length ? (this._column = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._column;
      }
      /**
          @memberof RadialMatrix
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "columnConfig",
      value: function columnConfig(_) {
        return arguments.length ? (this._columnConfig = d3plusCommon.assign(this._columnConfig, _), this) : this._columnConfig;
      }
      /**
          @memberof RadialMatrix
          @desc A sort comparator function that is run on the unique set of column values.
          @param {Function} [*value*]
          @example
      function column(a, b) {
      return a.localeCompare(b);
      }
      */

    }, {
      key: "columnSort",
      value: function columnSort(_) {
        return arguments.length ? (this._columnSort = _, this) : this._columnSort;
      }
      /**
          @memberof RadialMatrix
          @desc The radius (in pixels) for the inner donut hole of the diagram. Can either be a static Number, or an accessor function that receives the outer radius as it's only argument.
          @param {Function|Number} [*value*]
          @example
      function(outerRadius) {
      return outerRadius / 5;
      }
      */

    }, {
      key: "innerRadius",
      value: function innerRadius(_) {
        return arguments.length ? (this._innerRadius = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._innerRadius;
      }
      /**
          @memberof RadialMatrix
          @desc Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.
          @param {String|Function} [*value*]
          @example
      function row(d) {
      return d.name;
      }
      */

    }, {
      key: "row",
      value: function row(_) {
        return arguments.length ? (this._row = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._row;
      }
      /**
          @memberof RadialMatrix
          @desc A sort comparator function that is run on the unique set of row values.
          @param {Function} [*value*]
          @example
      function row(a, b) {
      return a.localeCompare(b);
      }
      */

    }, {
      key: "rowSort",
      value: function rowSort(_) {
        return arguments.length ? (this._rowSort = _, this) : this._rowSort;
      }
    }]);

    return RadialMatrix;
  }(d3plusViz.Viz);

  exports.Matrix = Matrix;
  exports.RadialMatrix = RadialMatrix;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=d3plus-matrix.js.map
