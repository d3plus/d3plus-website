function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  d3plus-legend v0.9.2
  An easy to use javascript chart legend.
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
  Function('return this')();

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
      version: '3.6.5',
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
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;

    set = function set(it, metadata) {
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

      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
        enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
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
    } catch (e) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) {
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
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-selection'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-text'), require('d3-scale'), require('d3-transition'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-format')) : typeof define === 'function' && define.amd ? define('d3plus-legend', ['exports', 'd3-array', 'd3-selection', 'd3plus-common', 'd3plus-shape', 'd3plus-text', 'd3-scale', 'd3-transition', 'd3plus-axis', 'd3plus-color', 'd3plus-format'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3plus = {}, global.d3Array, global.d3Selection, global.d3plusCommon, global.shapes, global.d3plusText, global.d3Scale, global.d3Transition, global.d3plusAxis, global.d3plusColor, global.d3plusFormat));
})(this, function (exports, d3Array, d3Selection, d3plusCommon, shapes, d3plusText, d3Scale, d3Transition, d3plusAxis, d3plusColor, d3plusFormat) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) {
      return e;
    } else {
      var n = Object.create(null);

      if (e) {
        Object.keys(e).forEach(function (k) {
          if (k !== 'default') {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function get() {
                return e[k];
              }
            });
          }
        });
      }

      n['default'] = e;
      return Object.freeze(n);
    }
  }

  var shapes__namespace = /*#__PURE__*/_interopNamespace(shapes);
  /**
      @desc Sort an array of numbers by their numeric value, ensuring that the array is not changed in place.
   This is necessary because the default behavior of .sort in JavaScript is to sort arrays as string values
   [1, 10, 12, 102, 20].sort()
  // output
  [1, 10, 102, 12, 20]
       @param {Array<number>} array input array
      @return {Array<number>} sorted array
      @private
      @example
  numericSort([3, 2, 1]) // => [1, 2, 3]
  */


  function numericSort(array) {
    return array.slice().sort(function (a, b) {
      return a - b;
    });
  }
  /**
      For a sorted input, counting the number of unique values is possible in constant time and constant memory. This is a simple implementation of the algorithm.
       Values are compared with `===`, so objects and non-primitive objects are not handled in any special way.
      @private
      @param {Array} input an array of primitive values.
      @returns {number} count of unique values
      @example
  uniqueCountSorted([1, 2, 3]); // => 3
  uniqueCountSorted([1, 1, 1]); // => 1
  */


  function uniqueCountSorted(input) {
    var lastSeenValue,
        uniqueValueCount = 0;

    for (var i = 0; i < input.length; i++) {
      if (i === 0 || input[i] !== lastSeenValue) {
        lastSeenValue = input[i];
        uniqueValueCount++;
      }
    }

    return uniqueValueCount;
  }
  /**
      Create a new column x row matrix.
      @private
      @param {number} columns
      @param {number} rows
      @return {Array<Array<number>>} matrix
      @example
  makeMatrix(10, 10);
  */


  function makeMatrix(columns, rows) {
    var matrix = [];

    for (var i = 0; i < columns; i++) {
      var column = [];

      for (var j = 0; j < rows; j++) {
        column.push(0);
      }

      matrix.push(column);
    }

    return matrix;
  }
  /**
      Generates incrementally computed values based on the sums and sums of squares for the data array
      @private
      @param {number} j
      @param {number} i
      @param {Array<number>} sums
      @param {Array<number>} sumsOfSquares
      @return {number}
      @example
  ssq(0, 1, [-1, 0, 2], [1, 1, 5]);
  */


  function ssq(j, i, sums, sumsOfSquares) {
    var sji; // s(j, i)

    if (j > 0) {
      var muji = (sums[i] - sums[j - 1]) / (i - j + 1); // mu(j, i)

      sji = sumsOfSquares[i] - sumsOfSquares[j - 1] - (i - j + 1) * muji * muji;
    } else sji = sumsOfSquares[i] - sums[i] * sums[i] / (i + 1);

    if (sji < 0) return 0;
    return sji;
  }
  /**
      Function that recursively divides and conquers computations for cluster j
      @private
      @param {number} iMin Minimum index in cluster to be computed
      @param {number} iMax Maximum index in cluster to be computed
      @param {number} cluster Index of the cluster currently being computed
      @param {Array<Array<number>>} matrix
      @param {Array<Array<number>>} backtrackMatrix
      @param {Array<number>} sums
      @param {Array<number>} sumsOfSquares
  */


  function fillMatrixColumn(iMin, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares) {
    if (iMin > iMax) return; // Start at midpoint between iMin and iMax

    var i = Math.floor((iMin + iMax) / 2);
    matrix[cluster][i] = matrix[cluster - 1][i - 1];
    backtrackMatrix[cluster][i] = i;
    var jlow = cluster; // the lower end for j

    if (iMin > cluster) jlow = Math.max(jlow, backtrackMatrix[cluster][iMin - 1] || 0);
    jlow = Math.max(jlow, backtrackMatrix[cluster - 1][i] || 0);
    var jhigh = i - 1; // the upper end for j

    if (iMax < matrix.length - 1) jhigh = Math.min(jhigh, backtrackMatrix[cluster][iMax + 1] || 0);

    for (var j = jhigh; j >= jlow; --j) {
      var sji = ssq(j, i, sums, sumsOfSquares);
      if (sji + matrix[cluster - 1][jlow - 1] >= matrix[cluster][i]) break; // Examine the lower bound of the cluster border

      var sjlowi = ssq(jlow, i, sums, sumsOfSquares);
      var ssqjlow = sjlowi + matrix[cluster - 1][jlow - 1];

      if (ssqjlow < matrix[cluster][i]) {
        // Shrink the lower bound
        matrix[cluster][i] = ssqjlow;
        backtrackMatrix[cluster][i] = jlow;
      }

      jlow++;
      var ssqj = sji + matrix[cluster - 1][j - 1];

      if (ssqj < matrix[cluster][i]) {
        matrix[cluster][i] = ssqj;
        backtrackMatrix[cluster][i] = j;
      }
    }

    fillMatrixColumn(iMin, i - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
    fillMatrixColumn(i + 1, iMax, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
  }
  /**
      Initializes the main matrices used in Ckmeans and kicks off the divide and conquer cluster computation strategy
      @private
      @param {Array<number>} data sorted array of values
      @param {Array<Array<number>>} matrix
      @param {Array<Array<number>>} backtrackMatrix
  */


  function fillMatrices(data, matrix, backtrackMatrix) {
    var nValues = matrix[0] ? matrix[0].length : 0; // Shift values by the median to improve numeric stability

    var shift = data[Math.floor(nValues / 2)]; // Cumulative sum and cumulative sum of squares for all values in data array

    var sums = [];
    var sumsOfSquares = []; // Initialize first column in matrix & backtrackMatrix

    for (var i = 0, shiftedValue = void 0; i < nValues; ++i) {
      shiftedValue = data[i] - shift;

      if (i === 0) {
        sums.push(shiftedValue);
        sumsOfSquares.push(shiftedValue * shiftedValue);
      } else {
        sums.push(sums[i - 1] + shiftedValue);
        sumsOfSquares.push(sumsOfSquares[i - 1] + shiftedValue * shiftedValue);
      } // Initialize for cluster = 0


      matrix[0][i] = ssq(0, i, sums, sumsOfSquares);
      backtrackMatrix[0][i] = 0;
    } // Initialize the rest of the columns


    for (var cluster = 1; cluster < matrix.length; ++cluster) {
      var iMin = nValues - 1;
      if (cluster < matrix.length - 1) iMin = cluster;
      fillMatrixColumn(iMin, nValues - 1, cluster, matrix, backtrackMatrix, sums, sumsOfSquares);
    }
  }
  /**
      @desc Ported to ES6 from the excellent [simple-statistics](https://github.com/simple-statistics/simple-statistics) packages.
   Ckmeans clustering is an improvement on heuristic-based clustering approaches like Jenks. The algorithm was developed in [Haizhou Wang and Mingzhou Song](http://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf) as a [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming) approach to the problem of clustering numeric data into groups with the least within-group sum-of-squared-deviations.
   Minimizing the difference within groups - what Wang & Song refer to as `withinss`, or within sum-of-squares, means that groups are optimally homogenous within and the data is split into representative groups. This is very useful for visualization, where you may want to represent a continuous variable in discrete color or style groups. This function can provide groups that emphasize differences between data.
   Being a dynamic approach, this algorithm is based on two matrices that store incrementally-computed values for squared deviations and backtracking indexes.
   This implementation is based on Ckmeans 3.4.6, which introduced a new divide and conquer approach that improved runtime from O(kn^2) to O(kn log(n)).
   Unlike the [original implementation](https://cran.r-project.org/web/packages/Ckmeans.1d.dp/index.html), this implementation does not include any code to automatically determine the optimal number of clusters: this information needs to be explicitly provided.
   ### References
  _Ckmeans.1d.dp: Optimal k-means Clustering in One Dimension by Dynamic
  Programming_ Haizhou Wang and Mingzhou Song ISSN 2073-4859 from The R Journal Vol. 3/2, December 2011
      @param {Array<number>} data input data, as an array of number values
      @param {number} nClusters number of desired classes. This cannot be greater than the number of values in the data array.
      @returns {Array<Array<number>>} clustered input
      @example
  ckmeans([-1, 2, -1, 2, 4, 5, 6, -1, 2, -1], 3);
  // The input, clustered into groups of similar numbers.
  //= [[-1, -1, -1, -1], [2, 2, 2], [4, 5, 6]]);
  */


  function ckmeans(data, nClusters) {
    if (nClusters > data.length) {
      throw new Error("Cannot generate more classes than there are data values");
    }

    var sorted = numericSort(data); // we'll use this as the maximum number of clusters

    var uniqueCount = uniqueCountSorted(sorted); // if all of the input values are identical, there's one cluster with all of the input in it.

    if (uniqueCount === 1) {
      return [sorted];
    }

    var backtrackMatrix = makeMatrix(nClusters, sorted.length),
        matrix = makeMatrix(nClusters, sorted.length); // This is a dynamic programming way to solve the problem of minimizing within-cluster sum of squares. It's similar to linear regression in this way, and this calculation incrementally computes the sum of squares that are later read.

    fillMatrices(sorted, matrix, backtrackMatrix); // The real work of Ckmeans clustering happens in the matrix generation: the generated matrices encode all possible clustering combinations, and once they're generated we can solve for the best clustering groups very quickly.

    var clusterRight = backtrackMatrix[0] ? backtrackMatrix[0].length - 1 : 0;
    var clusters = []; // Backtrack the clusters from the dynamic programming matrix. This starts at the bottom-right corner of the matrix (if the top-left is 0, 0), and moves the cluster target with the loop.

    for (var cluster = backtrackMatrix.length - 1; cluster >= 0; cluster--) {
      var clusterLeft = backtrackMatrix[cluster][clusterRight]; // fill the cluster from the sorted input by taking a slice of the array. the backtrack matrix makes this easy - it stores the indexes where the cluster should start and end.

      clusters[cluster] = sorted.slice(clusterLeft, clusterRight + 1);
      if (cluster > 0) clusterRight = clusterLeft - 1;
    }

    return clusters;
  }
  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  /**
      @class Legend
      @extends external:BaseClass
      @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */


  var Legend = /*#__PURE__*/function (_d3plusCommon$BaseCla) {
    _inherits(Legend, _d3plusCommon$BaseCla);

    var _super = _createSuper(Legend);

    /**
        @memberof Legend
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Legend() {
      var _this;

      _classCallCheck(this, Legend);

      _this = _super.call(this);
      _this._align = "center";
      _this._data = [];
      _this._direction = "row";
      _this._duration = 600;
      _this._height = 200;
      _this._id = d3plusCommon.accessor("id");
      _this._label = d3plusCommon.accessor("id");
      _this._lineData = [];
      _this._outerBounds = {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      _this._padding = 5;
      _this._shape = d3plusCommon.constant("Rect");
      _this._shapes = [];
      _this._shapeConfig = {
        fill: d3plusCommon.accessor("color"),
        height: d3plusCommon.constant(10),
        hitArea: function hitArea(dd, i) {
          var d = _this._lineData[i],
              h = d3Array.max([d.height, d.shapeHeight]);
          return {
            width: d.width + d.shapeWidth,
            height: h,
            x: -d.shapeWidth / 2,
            y: -h / 2
          };
        },
        labelBounds: function labelBounds(dd, i) {
          var d = _this._lineData[i];
          var x = d.shapeWidth;
          if (d.shape === "Circle") x -= d.shapeR;
          var height = d3Array.max([d.shapeHeight, d.height]);
          return {
            width: d.width,
            height: height,
            x: x,
            y: -height / 2
          };
        },
        labelConfig: {
          fontColor: d3plusCommon.constant("#444"),
          fontFamily: new d3plusText.TextBox().fontFamily(),
          fontResize: false,
          fontSize: d3plusCommon.constant(10),
          verticalAlign: "middle"
        },
        opacity: 1,
        r: d3plusCommon.constant(5),
        width: d3plusCommon.constant(10),
        x: function x(d, i) {
          var datum = _this._lineData[i];
          var y = datum.y;
          var pad = _this._align === "left" || _this._align === "right" && _this._direction === "column" ? 0 : _this._align === "center" ? (_this._outerBounds.width - _this._rowWidth(_this._lineData.filter(function (l) {
            return y === l.y;
          }))) / 2 : _this._outerBounds.width - _this._rowWidth(_this._lineData.filter(function (l) {
            return y === l.y;
          }));

          var prevWords = _this._lineData.slice(0, i).filter(function (l) {
            return y === l.y;
          });

          return _this._rowWidth(prevWords) + _this._padding * (prevWords.length ? datum.sentence ? 2 : 1 : 0) + _this._outerBounds.x + datum.shapeWidth / 2 + pad;
        },
        y: function y(d, i) {
          var ld = _this._lineData[i];
          return ld.y + _this._titleHeight + _this._outerBounds.y + d3Array.max(_this._lineData.filter(function (l) {
            return ld.y === l.y;
          }).map(function (l) {
            return l.height;
          }).concat(_this._data.map(function (l, x) {
            return _this._fetchConfig("height", l, x);
          }))) / 2;
        }
      };
      _this._titleClass = new d3plusText.TextBox();
      _this._titleConfig = {};
      _this._verticalAlign = "middle";
      _this._width = 400;
      return _this;
    }

    _createClass(Legend, [{
      key: "_fetchConfig",
      value: function _fetchConfig(key, d, i) {
        var val = this._shapeConfig[key] !== undefined ? this._shapeConfig[key] : this._shapeConfig.labelConfig[key];
        if (!val && key === "lineHeight") return this._fetchConfig("fontSize", d, i) * 1.4;
        return typeof val === "function" ? val(d, i) : val;
      }
    }, {
      key: "_rowHeight",
      value: function _rowHeight(row) {
        return d3Array.max(row.map(function (d) {
          return d.height;
        }).concat(row.map(function (d) {
          return d.shapeHeight;
        }))) + this._padding;
      }
    }, {
      key: "_rowWidth",
      value: function _rowWidth(row) {
        var _this2 = this;

        return d3Array.sum(row.map(function (d, i) {
          var p = _this2._padding * (i === row.length - 1 ? 0 : d.width ? 2 : 1);
          return d.shapeWidth + d.width + p;
        }));
      }
      /**
          @memberof Legend
          @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
          @param {Function} [*callback* = undefined]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this3 = this;

        if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", "".concat(this._width, "px")).attr("height", "".concat(this._height, "px")).node()); // Legend Container <g> Groups

        this._group = d3plusCommon.elem("g.d3plus-Legend", {
          parent: this._select
        });
        this._titleGroup = d3plusCommon.elem("g.d3plus-Legend-title", {
          parent: this._group
        });
        this._shapeGroup = d3plusCommon.elem("g.d3plus-Legend-shape", {
          parent: this._group
        });
        var availableHeight = this._height;
        this._titleHeight = 0;
        this._titleWidth = 0;

        if (this._title) {
          var f = this._titleConfig.fontFamily || this._titleClass.fontFamily()(),
              s = this._titleConfig.fontSize || this._titleClass.fontSize()();

          var lH = lH = this._titleConfig.lineHeight || this._titleClass.lineHeight();

          lH = lH ? lH() : s * 1.4;
          var res = d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(lH).width(this._width).height(this._height)(this._title);
          this._titleHeight = lH + res.lines.length + this._padding;
          this._titleWidth = d3Array.max(res.widths);
          availableHeight -= this._titleHeight;
        } // Calculate Text Sizes


        this._lineData = this._data.map(function (d, i) {
          var label = _this3._label(d, i);

          var shape = _this3._shape(d, i);

          var r = _this3._fetchConfig("r", d, i);

          var res = {
            data: d,
            i: i,
            id: _this3._id(d, i),
            shape: shape,
            shapeR: r,
            shapeWidth: shape === "Circle" ? r * 2 : _this3._fetchConfig("width", d, i),
            shapeHeight: shape === "Circle" ? r * 2 : _this3._fetchConfig("height", d, i),
            y: 0
          };

          if (!label) {
            res.sentence = false;
            res.words = [];
            res.height = 0;
            res.width = 0;
            return res;
          }

          var f = _this3._fetchConfig("fontFamily", d, i),
              lh = _this3._fetchConfig("lineHeight", d, i),
              s = _this3._fetchConfig("fontSize", d, i);

          var h = availableHeight - (_this3._data.length + 1) * _this3._padding,
              w = _this3._width;
          res = Object.assign(res, d3plusText.textWrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(label));
          res.width = Math.ceil(d3Array.max(res.lines.map(function (t) {
            return d3plusText.textWidth(t, {
              "font-family": f,
              "font-size": s
            });
          }))) + s * 0.75;
          res.height = Math.ceil(res.lines.length * (lh + 1));
          res.og = {
            height: res.height,
            width: res.width
          };
          res.f = f;
          res.s = s;
          res.lh = lh;
          return res;
        });
        var spaceNeeded;
        var availableWidth = this._width - this._padding * 2;
        spaceNeeded = this._rowWidth(this._lineData);

        if (this._direction === "column" || spaceNeeded > availableWidth) {
          var lines = 1,
              newRows = [];
          var maxLines = d3Array.max(this._lineData.map(function (d) {
            return d.words.length;
          }));

          this._wrapLines = function () {
            var _this4 = this;

            lines++;
            if (lines > maxLines) return;
            var wrappable = lines === 1 ? this._lineData.slice() : this._lineData.filter(function (d) {
              return d.width + d.shapeWidth + _this4._padding * (d.width ? 2 : 1) > availableWidth && d.words.length >= lines;
            }).sort(function (a, b) {
              return b.sentence.length - a.sentence.length;
            });

            if (wrappable.length && availableHeight > wrappable[0].height * lines) {
              var truncated = false;

              var _loop = function _loop(x) {
                var label = wrappable[x];
                var h = label.og.height * lines,
                    w = label.og.width * (1.5 * (1 / lines));
                var res = d3plusText.textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);

                if (!res.truncated) {
                  label.width = Math.ceil(d3Array.max(res.lines.map(function (t) {
                    return d3plusText.textWidth(t, {
                      "font-family": label.f,
                      "font-size": label.s
                    });
                  }))) + label.s;
                  label.height = res.lines.length * (label.lh + 1);
                } else {
                  truncated = true;
                  return "break";
                }
              };

              for (var x = 0; x < wrappable.length; x++) {
                var _ret = _loop(x);

                if (_ret === "break") break;
              }

              if (!truncated) this._wrapRows();
            } else {
              newRows = [];
              return;
            }
          };

          this._wrapRows = function () {
            newRows = [];
            var row = 1,
                rowWidth = 0;

            for (var i = 0; i < this._lineData.length; i++) {
              var d = this._lineData[i],
                  w = d.width + this._padding * (d.width ? 2 : 1) + d.shapeWidth;

              if (d3Array.sum(newRows.map(function (row) {
                return d3Array.max(row, function (d) {
                  return d3Array.max([d.height, d.shapeHeight]);
                });
              })) > availableHeight) {
                newRows = [];
                break;
              }

              if (w > availableWidth) {
                newRows = [];

                this._wrapLines();

                break;
              } else if (rowWidth + w < availableWidth) {
                rowWidth += w;
              } else if (this._direction !== "column") {
                rowWidth = w;
                row++;
              }

              if (!newRows[row - 1]) newRows[row - 1] = [];
              newRows[row - 1].push(d);

              if (this._direction === "column") {
                rowWidth = 0;
                row++;
              }
            }
          };

          this._wrapRows();

          if (!newRows.length || d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding > availableHeight) {
            spaceNeeded = d3Array.sum(this._lineData.map(function (d) {
              return d.shapeWidth + _this3._padding;
            })) - this._padding;

            for (var i = 0; i < this._lineData.length; i++) {
              this._lineData[i].width = 0;
              this._lineData[i].height = 0;
            }

            this._wrapRows();
          }

          if (newRows.length && d3Array.sum(newRows, this._rowHeight.bind(this)) + this._padding < availableHeight) {
            newRows.forEach(function (row, i) {
              row.forEach(function (d) {
                if (i) {
                  d.y = d3Array.sum(newRows.slice(0, i), _this3._rowHeight.bind(_this3));
                }
              });
            });
            spaceNeeded = d3Array.max(newRows, this._rowWidth.bind(this));
          }
        }

        var innerHeight = d3Array.max(this._lineData, function (d, i) {
          return d3Array.max([d.height, _this3._fetchConfig("height", d.data, i)]) + d.y;
        }) + this._titleHeight,
            innerWidth = d3Array.max([spaceNeeded, this._titleWidth]);

        this._outerBounds.width = innerWidth;
        this._outerBounds.height = innerHeight;
        var xOffset = this._padding,
            yOffset = this._padding;
        if (this._align === "center") xOffset = (this._width - innerWidth) / 2;else if (this._align === "right") xOffset = this._width - this._padding - innerWidth;
        if (this._verticalAlign === "middle") yOffset = (this._height - innerHeight) / 2;else if (this._verticalAlign === "bottom") yOffset = this._height - this._padding - innerHeight;
        this._outerBounds.x = xOffset;
        this._outerBounds.y = yOffset;

        this._titleClass.data(this._title ? [{
          text: this._title
        }] : []).duration(this._duration).select(this._titleGroup.node()).textAnchor({
          left: "start",
          center: "middle",
          right: "end"
        }[this._align]).width(this._width - this._padding * 2).x(this._padding).y(this._outerBounds.y).config(this._titleConfig).render();

        this._shapes = [];
        var baseConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "legend"),
            config = {
          id: function id(d) {
            return d.id;
          },
          label: function label(d) {
            return d.label;
          },
          lineHeight: function lineHeight(d) {
            return d.lH;
          }
        };

        var data = this._data.map(function (d, i) {
          var obj = {
            __d3plus__: true,
            data: d,
            i: i,
            id: _this3._id(d, i),
            label: _this3._lineData[i].width ? _this3._label(d, i) : false,
            lH: _this3._fetchConfig("lineHeight", d, i),
            shape: _this3._shape(d, i)
          };
          return obj;
        }); // Legend Shapes


        this._shapes = [];
        ["Circle", "Rect"].forEach(function (Shape) {
          _this3._shapes.push(new shapes__namespace[Shape]().parent(_this3).data(data.filter(function (d) {
            return d.shape === Shape;
          })).duration(_this3._duration).labelConfig({
            padding: 0
          }).select(_this3._shapeGroup.node()).verticalAlign("top").config(d3plusCommon.assign({}, baseConfig, config)).render());
        });
        if (callback) setTimeout(callback, this._duration + 100);
        return this;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "active",
      value: function active(_) {
        this._shapes.forEach(function (s) {
          return s.active(_);
        });

        return this;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
          @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
          @chainable
      */

    }, {
      key: "align",
      value: function align(_) {
        return arguments.length ? (this._align = _, this) : this._align;
      }
      /**
          @memberof Legend
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Legend
          @desc Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.
          @param {String} [*value* = "row"]
          @chainable
      */

    }, {
      key: "direction",
      value: function direction(_) {
        return arguments.length ? (this._direction = _, this) : this._direction;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
          @param {Number} [*value* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = _, this) : this._height;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "hover",
      value: function hover(_) {
        this._shapes.forEach(function (s) {
          return s.hover(_);
        });

        return this;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
          @param {Function} [*value*]
          @chainable
          @example
      function value(d) {
      return d.id;
      }
      */

    }, {
      key: "id",
      value: function id(_) {
        return arguments.length ? (this._id = _, this) : this._id;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "label",
      value: function label(_) {
        return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
      }
      /**
          @memberof Legend
          @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
          @example
      {"width": 180, "height": 24, "x": 10, "y": 20}
      */

    }, {
      key: "outerBounds",
      value: function outerBounds() {
        return this._outerBounds;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
          @param {Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "padding",
      value: function padding(_) {
        return arguments.length ? (this._padding = _, this) : this._padding;
      }
      /**
          @memberof Legend
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
          @param {Function|String} [*value* = "Rect"]
          @chainable
      */

    }, {
      key: "shape",
      value: function shape(_) {
        return arguments.length ? (this._shape = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shape;
      }
      /**
          @memberof Legend
          @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
          @param {Object} [*config* = {}]
          @chainable
      */

    }, {
      key: "shapeConfig",
      value: function shapeConfig(_) {
        return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "title",
      value: function title(_) {
        return arguments.length ? (this._title = _, this) : this._title;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "titleConfig",
      value: function titleConfig(_) {
        return arguments.length ? (this._titleConfig = d3plusCommon.assign(this._titleConfig, _), this) : this._titleConfig;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
          @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
          @chainable
      */

    }, {
      key: "verticalAlign",
      value: function verticalAlign(_) {
        return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
      }
      /**
          @memberof Legend
          @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
          @param {Number} [*value* = 400]
          @chainable
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = _, this) : this._width;
      }
    }]);

    return Legend;
  }(d3plusCommon.BaseClass);
  /**
      @external BaseClass
      @see https://github.com/d3plus/d3plus-common#BaseClass
  */

  /**
      @class ColorScale
      @extends external:BaseClass
      @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
  */


  var ColorScale = /*#__PURE__*/function (_d3plusCommon$BaseCla2) {
    _inherits(ColorScale, _d3plusCommon$BaseCla2);

    var _super2 = _createSuper(ColorScale);

    /**
        @memberof ColorScale
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function ColorScale() {
      var _this5;

      _classCallCheck(this, ColorScale);

      _this5 = _super2.call(this);
      _this5._axisClass = new d3plusAxis.Axis();
      _this5._axisConfig = {
        gridSize: 0,
        shapeConfig: {
          labelConfig: {
            fontColor: "#222"
          }
        },
        titleConfig: {
          fontSize: 12
        }
      };
      _this5._axisTest = new d3plusAxis.Axis();
      _this5._align = "middle";
      _this5._buckets = 5;
      _this5._bucketAxis = false;

      _this5._bucketFormat = function (tick, i, ticks, allValues) {
        var format = _this5._axisConfig.tickFormat ? _this5._axisConfig.tickFormat : d3plusFormat.formatAbbreviate;
        var next = ticks[i + 1];
        var prev = i ? ticks[i - 1] : false;
        var last = i === ticks.length - 1;

        if (tick === next || last) {
          var suffix = last && tick < d3Array.max(allValues) ? "+" : "";
          return "".concat(format(tick)).concat(suffix);
        } else {
          var mod = next ? next / 100 : tick / 100;
          var pow = mod >= 1 || mod <= -1 ? Math.round(mod).toString().length - 1 : mod.toString().split(".")[1].replace(/([1-9])[1-9].*$/, "$1").length * -1;
          var ten = Math.pow(10, pow);
          return prev === tick && i === 1 ? "".concat(format(d3Array.min([tick + ten, allValues.find(function (d) {
            return d > tick && d < next;
          })])), " - ").concat(format(next)) : "".concat(format(tick), " - ").concat(format(d3Array.max([next - ten, allValues.reverse().find(function (d) {
            return d > tick && d < next;
          })])));
        }
      };

      _this5._centered = true;
      _this5._colorMax = "#0C8040";
      _this5._colorMid = "#f7f7f7";
      _this5._colorMin = "#b22200";
      _this5._data = [];
      _this5._duration = 600;
      _this5._height = 200;
      _this5._labelClass = new d3plusText.TextBox();
      _this5._legendClass = new Legend();
      _this5._legendConfig = {
        shapeConfig: {
          labelConfig: {
            fontColor: "#222"
          },
          stroke: "#444",
          strokeWidth: 1
        }
      };
      _this5._midpoint = 0;
      _this5._orient = "bottom";
      _this5._outerBounds = {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      _this5._padding = 5;
      _this5._rectClass = new shapes.Rect().parent(_assertThisInitialized(_this5));
      _this5._rectConfig = {
        stroke: "#444",
        strokeWidth: 1
      };
      _this5._scale = "linear";
      _this5._size = 10;
      _this5._value = d3plusCommon.accessor("value");
      _this5._width = 400;
      return _this5;
    }
    /**
        @memberof ColorScale
        @desc Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.
        @param {Function} [*callback* = undefined]
        @chainable
    */


    _createClass(ColorScale, [{
      key: "render",
      value: function render(callback) {
        var _this6 = this;

        if (this._select === void 0) this.select(d3Selection.select("body").append("svg").attr("width", "".concat(this._width, "px")).attr("height", "".concat(this._height, "px")).node());
        var horizontal = ["bottom", "top"].includes(this._orient);
        var height = horizontal ? "height" : "width",
            width = horizontal ? "width" : "height",
            x = horizontal ? "x" : "y",
            y = horizontal ? "y" : "x"; // Shape <g> Group

        this._group = d3plusCommon.elem("g.d3plus-ColorScale", {
          parent: this._select
        });

        var allValues = this._data.map(this._value).sort(function (a, b) {
          return a - b;
        });

        var domain = d3Array.extent(allValues);
        var negative = domain[0] < this._midpoint;
        var positive = domain[1] > this._midpoint;
        var diverging = negative && positive;
        var numBuckets = this._buckets instanceof Array ? this._buckets.length : this._buckets;
        var colors = this._color,
            labels,
            ticks;

        if (colors && !(colors instanceof Array)) {
          colors = d3Array.range(0, numBuckets, 1).map(function (i) {
            return d3plusColor.colorLighter(colors, (i + 1) / numBuckets);
          }).reverse();
        }

        if (this._scale === "jenks") {
          var data = this._data.map(this._value).filter(function (d) {
            return d !== null && typeof d === "number";
          });

          var buckets = d3Array.min([colors ? colors.length : numBuckets, data.length]);
          var jenks = [];

          if (this._buckets instanceof Array) {
            ticks = this._buckets;
          } else {
            if (diverging && this._centered) {
              var half = Math.floor(buckets / 2);
              var residual = buckets % 2;
              var negatives = data.filter(function (d) {
                return d < _this6._midpoint;
              });
              var negativesDeviation = d3Array.deviation(negatives);
              var positives = data.concat(this._midpoint).filter(function (d) {
                return d >= _this6._midpoint;
              });
              var positivesDeviation = d3Array.deviation(positives);
              var isNegativeMax = negativesDeviation > positivesDeviation ? 1 : 0;
              var isPositiveMax = positivesDeviation > negativesDeviation ? 1 : 0;
              var negativeJenks = ckmeans(negatives, half + residual * isNegativeMax);
              var positiveJenks = ckmeans(positives, half + residual * isPositiveMax);
              jenks = negativeJenks.concat(positiveJenks);
            } else {
              jenks = ckmeans(data, buckets);
            }

            ticks = jenks.map(function (c) {
              return c[0];
            });
          }

          var tickSet = new Set(ticks);

          if (ticks.length !== tickSet.size) {
            labels = Array.from(tickSet);
          }

          if (!colors) {
            if (diverging) {
              colors = [this._colorMin, this._colorMid, this._colorMax];

              var _negatives = ticks.slice(0, buckets).filter(function (d, i) {
                return d < _this6._midpoint && ticks[i + 1] <= _this6._midpoint;
              });

              var spanning = ticks.slice(0, buckets).filter(function (d, i) {
                return d <= _this6._midpoint && ticks[i + 1] > _this6._midpoint;
              });

              var _positives = ticks.slice(0, buckets).filter(function (d, i) {
                return d > _this6._midpoint && ticks[i + 1] > _this6._midpoint;
              });

              var negativeColors = _negatives.map(function (d, i) {
                return !i ? colors[0] : d3plusColor.colorLighter(colors[0], i / _negatives.length);
              });

              var spanningColors = spanning.map(function () {
                return colors[1];
              });

              var positiveColors = _positives.map(function (d, i) {
                return i === _positives.length - 1 ? colors[2] : d3plusColor.colorLighter(colors[2], 1 - (i + 1) / _positives.length);
              });

              colors = negativeColors.concat(spanningColors).concat(positiveColors);
            } else {
              colors = d3Array.range(0, numBuckets, 1).map(function (i) {
                return d3plusColor.colorLighter(_this6._colorMax, i / numBuckets);
              }).reverse();
            }
          }

          if (data.length <= buckets) {
            colors = colors.slice(buckets - data.length);
          }

          colors = [colors[0]].concat(colors);
          this._colorScale = d3Scale.scaleThreshold().domain(ticks).range(colors);
        } else {
          var _buckets = this._buckets instanceof Array ? this._buckets : undefined;

          if (diverging && !colors) {
            var _half = Math.floor(numBuckets / 2);

            var _negativeColors = d3Array.range(0, _half, 1).map(function (i) {
              return !i ? _this6._colorMin : d3plusColor.colorLighter(_this6._colorMin, i / _half);
            });

            var _spanningColors = (numBuckets % 2 ? [0] : []).map(function () {
              return _this6._colorMid;
            });

            var _positiveColors = d3Array.range(0, _half, 1).map(function (i) {
              return !i ? _this6._colorMax : d3plusColor.colorLighter(_this6._colorMax, i / _half);
            }).reverse();

            colors = _negativeColors.concat(_spanningColors).concat(_positiveColors);

            if (!_buckets) {
              var step = (colors.length - 1) / 2;
              _buckets = [domain[0], this._midpoint, domain[1]];
              _buckets = d3Array.range(domain[0], this._midpoint, -(domain[0] - this._midpoint) / step).concat(d3Array.range(this._midpoint, domain[1], (domain[1] - this._midpoint) / step)).concat([domain[1]]);
            }
          } else {
            if (!colors) {
              if (this._scale === "buckets" || this._scale === "quantile") {
                colors = d3Array.range(0, numBuckets, 1).map(function (i) {
                  return d3plusColor.colorLighter(negative ? _this6._colorMin : _this6._colorMax, i / numBuckets);
                });
                if (positive) colors = colors.reverse();
              } else {
                colors = negative ? [this._colorMin, d3plusColor.colorLighter(this._colorMin, 0.8)] : [d3plusColor.colorLighter(this._colorMax, 0.8), this._colorMax];
              }
            }

            if (!_buckets) {
              if (this._scale === "quantile") {
                var _step = 1 / (colors.length - 1);

                _buckets = d3Array.range(0, 1 + _step / 2, _step).map(function (d) {
                  return d3Array.quantile(allValues, d);
                });
              } else if (diverging && this._color && this._centered) {
                var negativeStep = (this._midpoint - domain[0]) / Math.floor(colors.length / 2);
                var positiveStep = (domain[1] - this._midpoint) / Math.floor(colors.length / 2);
                var negativeBuckets = d3Array.range(domain[0], this._midpoint, negativeStep);
                var positiveBuckets = d3Array.range(this._midpoint, domain[1] + positiveStep / 2, positiveStep);
                _buckets = negativeBuckets.concat(positiveBuckets);
              } else {
                var _step2 = (domain[1] - domain[0]) / (colors.length - 1);

                _buckets = d3Array.range(domain[0], domain[1] + _step2 / 2, _step2);
              }
            }
          }

          if (this._scale === "buckets" || this._scale === "quantile") {
            ticks = _buckets;
            colors = [colors[0]].concat(colors);
          } else if (this._scale === "log") {
            var _negativeBuckets = _buckets.filter(function (d) {
              return d < 0;
            });

            if (_negativeBuckets.length) {
              var minVal = _negativeBuckets[0];

              var newNegativeBuckets = _negativeBuckets.map(function (d) {
                return -Math.pow(Math.abs(minVal), d / minVal);
              });

              _negativeBuckets.forEach(function (bucket, i) {
                _buckets[_buckets.indexOf(bucket)] = newNegativeBuckets[i];
              });
            }

            var _positiveBuckets = _buckets.filter(function (d) {
              return d > 0;
            });

            if (_positiveBuckets.length) {
              var maxVal = _positiveBuckets[_positiveBuckets.length - 1];

              var newPositiveBuckets = _positiveBuckets.map(function (d) {
                return Math.pow(maxVal, d / maxVal);
              });

              _positiveBuckets.forEach(function (bucket, i) {
                _buckets[_buckets.indexOf(bucket)] = newPositiveBuckets[i];
              });
            }

            if (_buckets.includes(0)) _buckets[_buckets.indexOf(0)] = 1;
          }

          this._colorScale = (this._scale === "buckets" || this._scale === "quantile" ? d3Scale.scaleThreshold : d3Scale.scaleLinear)().domain(_buckets).range(colors);
        }

        var gradient = this._bucketAxis || !["buckets", "jenks", "quantile"].includes(this._scale);
        var t = d3Transition.transition().duration(this._duration);
        var groupParams = {
          enter: {
            opacity: 0
          },
          exit: {
            opacity: 0
          },
          parent: this._group,
          transition: t,
          update: {
            opacity: 1
          }
        };
        var labelGroup = d3plusCommon.elem("g.d3plus-ColorScale-labels", Object.assign({
          condition: gradient
        }, groupParams));
        var rectGroup = d3plusCommon.elem("g.d3plus-ColorScale-Rect", Object.assign({
          condition: gradient
        }, groupParams));
        var legendGroup = d3plusCommon.elem("g.d3plus-ColorScale-legend", Object.assign({
          condition: !gradient
        }, groupParams));

        if (gradient) {
          var _d3plusCommon$assign;

          var offsets = {
            x: 0,
            y: 0
          };
          var axisDomain = domain.slice();

          if (this._bucketAxis) {
            var last = axisDomain[axisDomain.length - 1];
            var prev = axisDomain[axisDomain.length - 2];
            var mod = last ? last / 10 : prev / 10;
            var pow = mod >= 1 || mod <= -1 ? Math.round(mod).toString().length - 1 : mod.toString().split(".")[1].replace(/([1-9])[1-9].*$/, "$1").length * -1;
            var ten = Math.pow(10, pow);
            axisDomain[axisDomain.length - 1] = last + ten;
          }

          var axisConfig = d3plusCommon.assign({
            domain: axisDomain,
            duration: this._duration,
            height: this._height,
            labels: labels || ticks,
            orient: this._orient,
            padding: this._padding,
            scale: this._scale === "log" ? "log" : "linear",
            ticks: ticks,
            width: this._width
          }, this._axisConfig);
          var labelConfig = d3plusCommon.assign({
            height: this["_".concat(height)] / 2,
            width: this["_".concat(width)] / 2
          }, this._labelConfig || this._axisConfig.titleConfig);

          this._labelClass.config(labelConfig);

          var labelData = [];

          if (horizontal && this._labelMin) {
            var labelCSS = {
              "font-family": this._labelClass.fontFamily()(this._labelMin),
              "font-size": this._labelClass.fontSize()(this._labelMin),
              "font-weight": this._labelClass.fontWeight()(this._labelMin)
            };
            if (labelCSS["font-family"] instanceof Array) labelCSS["font-family"] = labelCSS["font-family"][0];
            var labelMinWidth = d3plusText.textWidth(this._labelMin, labelCSS);

            if (labelMinWidth && labelMinWidth < this["_".concat(width)] / 2) {
              labelData.push(this._labelMin);
              labelMinWidth += this._padding;
              if (horizontal) offsets.x += labelMinWidth;
              axisConfig[width] -= labelMinWidth;
            }
          }

          if (horizontal && this._labelMax) {
            var _labelCSS = {
              "font-family": this._labelClass.fontFamily()(this._labelMax),
              "font-size": this._labelClass.fontSize()(this._labelMax),
              "font-weight": this._labelClass.fontWeight()(this._labelMax)
            };
            if (_labelCSS["font-family"] instanceof Array) _labelCSS["font-family"] = _labelCSS["font-family"][0];
            var labelMaxWidth = d3plusText.textWidth(this._labelMax, _labelCSS);

            if (labelMaxWidth && labelMaxWidth < this["_".concat(width)] / 2) {
              labelData.push(this._labelMax);
              labelMaxWidth += this._padding;
              if (!horizontal) offsets.y += labelMaxWidth;
              axisConfig[width] -= labelMaxWidth;
            }
          }

          this._axisTest.select(d3plusCommon.elem("g.d3plus-ColorScale-axisTest", {
            enter: {
              opacity: 0
            },
            parent: this._group
          }).node()).config(axisConfig).duration(0).render();

          var axisBounds = this._axisTest.outerBounds();

          this._outerBounds[width] = this["_".concat(width)] - this._padding * 2;
          this._outerBounds[height] = axisBounds[height] + this._size;
          this._outerBounds[x] = this._padding;
          this._outerBounds[y] = this._padding;
          if (this._align === "middle") this._outerBounds[y] = (this["_".concat(height)] - this._outerBounds[height]) / 2;else if (this._align === "end") this._outerBounds[y] = this["_".concat(height)] - this._padding - this._outerBounds[height];

          var axisGroupOffset = this._outerBounds[y] + (["bottom", "right"].includes(this._orient) ? this._size : 0) - (axisConfig.padding || this._axisClass.padding());

          var transform = "translate(".concat(offsets.x + (horizontal ? 0 : axisGroupOffset), ", ").concat(offsets.y + (horizontal ? axisGroupOffset : 0), ")");

          this._axisClass.select(d3plusCommon.elem("g.d3plus-ColorScale-axis", d3plusCommon.assign(groupParams, {
            condition: true,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          })).node()).config(axisConfig).align("start").render();

          var axisScale = this._axisTest._getPosition.bind(this._axisTest);

          var scaleRange = this._axisTest._getRange();

          var defs = this._group.selectAll("defs").data([0]);

          var defsEnter = defs.enter().append("defs");
          defsEnter.append("linearGradient").attr("id", "gradient-".concat(this._uuid));
          defs = defsEnter.merge(defs);
          defs.select("linearGradient").attr("".concat(x, "1"), horizontal ? "0%" : "100%").attr("".concat(x, "2"), horizontal ? "100%" : "0%").attr("".concat(y, "1"), "0%").attr("".concat(y, "2"), "0%");
          var stops = defs.select("linearGradient").selectAll("stop").data(colors);

          var scaleDomain = this._colorScale.domain();

          var offsetScale = d3Scale.scaleLinear().domain(scaleRange).range(horizontal ? [0, 100] : [100, 0]);
          stops.enter().append("stop").merge(stops).attr("offset", function (d, i) {
            return "".concat(i <= scaleDomain.length - 1 ? offsetScale(axisScale(scaleDomain[i])) : 100, "%");
          }).attr("stop-color", String);
          /** determines the width of buckets */

          var bucketWidth = function bucketWidth(d, i) {
            var next = ticks[i + 1] || axisDomain[axisDomain.length - 1];
            return Math.abs(axisScale(next) - axisScale(d));
          };

          var rectConfig = d3plusCommon.assign((_d3plusCommon$assign = {
            duration: this._duration,
            fill: ticks ? function (d) {
              return _this6._colorScale(d);
            } : "url(#gradient-".concat(this._uuid, ")")
          }, _defineProperty(_d3plusCommon$assign, x, ticks ? function (d, i) {
            return axisScale(d) + bucketWidth(d, i) / 2 - (["left", "right"].includes(_this6._orient) ? bucketWidth(d, i) : 0);
          } : scaleRange[0] + (scaleRange[1] - scaleRange[0]) / 2 + offsets[x]), _defineProperty(_d3plusCommon$assign, y, this._outerBounds[y] + (["top", "left"].includes(this._orient) ? axisBounds[height] : 0) + this._size / 2 + offsets[y]), _defineProperty(_d3plusCommon$assign, width, ticks ? bucketWidth : scaleRange[1] - scaleRange[0]), _defineProperty(_d3plusCommon$assign, height, this._size), _d3plusCommon$assign), this._rectConfig);

          this._rectClass.data(ticks || [0]).id(function (d, i) {
            return i;
          }).select(rectGroup.node()).config(rectConfig).render();

          labelConfig.height = this._outerBounds[height];
          labelConfig.width = this._outerBounds[width];

          this._labelClass.config(labelConfig).data(labelData).select(labelGroup.node()).x(function (d) {
            return d === _this6._labelMax ? rectConfig.x + rectConfig.width / 2 + _this6._padding : _this6._outerBounds.x;
          }).y(function (d) {
            return rectConfig.y - _this6._labelClass.fontSize()(d) / 2;
          }).text(function (d) {
            return d;
          }).rotate(horizontal ? 0 : this._orient === "right" ? 90 : -90).render();
        } else {
          d3plusCommon.elem("g.d3plus-ColorScale-axis", Object.assign({
            condition: gradient
          }, groupParams));
          var legendData = ticks.reduce(function (arr, tick, i) {
            var label = _this6._bucketFormat.bind(_this6)(tick, i, ticks, allValues);

            arr.push({
              color: colors[i + 1],
              id: label
            });
            return arr;
          }, []);
          var legendConfig = d3plusCommon.assign({
            align: horizontal ? "center" : {
              start: "left",
              middle: "center",
              end: "right"
            }[this._align],
            direction: horizontal ? "row" : "column",
            duration: this._duration,
            height: this._height,
            padding: this._padding,
            shapeConfig: d3plusCommon.assign({
              duration: this._duration
            }, this._axisConfig.shapeConfig || {}),
            title: this._axisConfig.title,
            titleConfig: this._axisConfig.titleConfig || {},
            width: this._width,
            verticalAlign: horizontal ? {
              start: "top",
              middle: "middle",
              end: "bottom"
            }[this._align] : "middle"
          }, this._legendConfig);

          this._legendClass.data(legendData).select(legendGroup.node()).config(legendConfig).render();

          this._outerBounds = this._legendClass.outerBounds();
        }

        if (callback) setTimeout(callback, this._duration + 100);
        return this;
      }
      /**
          @memberof ColorScale
          @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "axisConfig",
      value: function axisConfig(_) {
        return arguments.length ? (this._axisConfig = d3plusCommon.assign(this._axisConfig, _), this) : this._axisConfig;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
          @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
          @chainable
      */

    }, {
      key: "align",
      value: function align(_) {
        return arguments.length ? (this._align = _, this) : this._align;
      }
      /**
          @memberof ColorScale
          @desc The number of discrete buckets to create in a bucketed color scale. Will be overridden by any custom Array of colors passed to the `color` method. Optionally, users can supply an Array of values used to separate buckets, such as `[0, 10, 25, 50, 90]` for a percentage scale. This value would create 4 buckets, with each value representing the break point between each bucket (so 5 values makes 4 buckets).
          @param {Number|Array} [*value* = 5]
          @chainable
      */

    }, {
      key: "buckets",
      value: function buckets(_) {
        return arguments.length ? (this._buckets = _, this) : this._buckets;
      }
      /**
          @memberof ColorScale
          @desc Determines whether or not to use an Axis to display bucket scales (both "buckets" and "jenks"). When set to `false`, bucketed scales will use the `Legend` class to display squares for each range of data. When set to `true`, bucketed scales will be displayed on an `Axis`, similar to "linear" scales.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "bucketAxis",
      value: function bucketAxis(_) {
        return arguments.length ? (this._bucketAxis = _, this) : this._bucketAxis;
      }
      /**
          @memberof ColorScale
          @desc A function for formatting the labels associated to each bucket in a bucket-type scale ("jenks", "quantile", etc). The function is passed four arguments: the start value of the current bucket, it's index in the full Array of buckets, the full Array of buckets, and an Array of every value present in the data used to construct the buckets. Keep in mind that the end value for the bucket is not actually the next bucket in the list, but includes every value up until that next bucket value (less than, but not equal to). By default, d3plus will make the end value slightly less than it's current value, so that it does not overlap with the start label for the next bucket.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "bucketFormat",
      value: function bucketFormat(_) {
        return arguments.length ? (this._bucketFormat = _, this) : this._bucketFormat;
      }
      /**
          @memberof ColorScale
          @desc Determines whether or not to display a midpoint centered Axis. Does not apply to quantile scales.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "centered",
      value: function centered(_) {
        return arguments.length ? (this._centered = _, this) : this._centered;
      }
      /**
          @memberof ColorScale
          @desc Overrides the default internal logic of `colorMin`, `colorMid`, and `colorMax` to only use just this specified color. If a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.
          @param {String|Array} [*value*]
          @chainable
      */

    }, {
      key: "color",
      value: function color(_) {
        return arguments.length ? (this._color = _, this) : this._color;
      }
      /**
          @memberof ColorScale
          @desc Defines the color to be used for numbers greater than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
          @param {String} [*value* = "#0C8040"]
          @chainable
      */

    }, {
      key: "colorMax",
      value: function colorMax(_) {
        return arguments.length ? (this._colorMax = _, this) : this._colorMax;
      }
      /**
          @memberof ColorScale
          @desc Defines the color to be used for the midpoint of a diverging scale, based on the current value of the `midpoint` method (defaults to `0`). Colors in between this value and the values of `colorMin` and `colorMax` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
          @param {String} [*value* = "#f7f7f7"]
          @chainable
      */

    }, {
      key: "colorMid",
      value: function colorMid(_) {
        return arguments.length ? (this._colorMid = _, this) : this._colorMid;
      }
      /**
          @memberof ColorScale
          @desc Defines the color to be used for numbers less than the value of the `midpoint` on the scale (defaults to `0`). Colors in between this value and the value of `colorMid` will be interpolated, unless a custom Array of colors has been specified using the `color` method.
          @param {String} [*value* = "#b22200"]
          @chainable
      */

    }, {
      key: "colorMin",
      value: function colorMin(_) {
        return arguments.length ? (this._colorMin = _, this) : this._colorMin;
      }
      /**
          @memberof ColorScale
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.
          @param {Number} [*value* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = _, this) : this._height;
      }
      /**
          @memberof ColorScale
          @desc A pass-through for the [TextBox](http://d3plus.org/docs/#TextBox) class used to style the labelMin and labelMax text.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "labelConfig",
      value: function labelConfig(_) {
        return arguments.length ? (this._labelConfig = _, this) : this._labelConfig;
      }
      /**
          @memberof ColorScale
          @desc Defines a text label to be displayed off of the end of the minimum point in the scale (currently only available in horizontal orientation).
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "labelMin",
      value: function labelMin(_) {
        return arguments.length ? (this._labelMin = _, this) : this._labelMin;
      }
      /**
          @memberof ColorScale
          @desc Defines a text label to be displayed off of the end of the maximum point in the scale (currently only available in horizontal orientation).
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "labelMax",
      value: function labelMax(_) {
        return arguments.length ? (this._labelMax = _, this) : this._labelMax;
      }
      /**
          @memberof ColorScale
          @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "legendConfig",
      value: function legendConfig(_) {
        return arguments.length ? (this._legendConfig = d3plusCommon.assign(this._legendConfig, _), this) : this._legendConfig;
      }
      /**
          @memberof ColorScale
          @desc The number value to be used as the anchor for `colorMid`, and defines the center point of the diverging color scale.
          @param {Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "midpoint",
      value: function midpoint(_) {
        return arguments.length ? (this._midpoint = _, this) : this._midpoint;
      }
      /**
          @memberof ColorScale
          @desc Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.
          @param {String} [*value* = "bottom"]
          @chainable
      */

    }, {
      key: "orient",
      value: function orient(_) {
        return arguments.length ? (this._orient = _, this) : this._orient;
      }
      /**
          @memberof ColorScale
          @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.
          @example
      {"width": 180, "height": 24, "x": 10, "y": 20}
      */

    }, {
      key: "outerBounds",
      value: function outerBounds() {
        return this._outerBounds;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
          @param {Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "padding",
      value: function padding(_) {
        return arguments.length ? (this._padding = _, this) : this._padding;
      }
      /**
          @memberof ColorScale
          @desc The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "rectConfig",
      value: function rectConfig(_) {
        return arguments.length ? (this._rectConfig = d3plusCommon.assign(this._rectConfig, _), this) : this._rectConfig;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.
          @param {String} [*value* = "linear"] Can either be "linear", "jenks", or "buckets".
          @chainable
      */

    }, {
      key: "scale",
      value: function scale(_) {
        return arguments.length ? (this._scale = _, this) : this._scale;
      }
      /**
          @memberof ColorScale
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
      }
      /**
          @memberof ColorScale
          @desc The height of horizontal color scales, and width when positioned vertical.
          @param {Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "size",
      value: function size(_) {
        return arguments.length ? (this._size = _, this) : this._size;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.
          @param {Function|String} [*value*]
          @chainable
          @example
      function value(d) {
      return d.value;
      }
      */

    }, {
      key: "value",
      value: function value(_) {
        return arguments.length ? (this._value = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._value;
      }
      /**
          @memberof ColorScale
          @desc If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.
          @param {Number} [*value* = 400]
          @chainable
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = _, this) : this._width;
      }
    }]);

    return ColorScale;
  }(d3plusCommon.BaseClass);

  exports.ColorScale = ColorScale;
  exports.Legend = Legend;
  exports.ckmeans = ckmeans;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=d3plus-legend.js.map
