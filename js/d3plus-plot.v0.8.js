/*
  d3plus-plot v0.8.36
  A reusable javascript x/y plot built on D3.
  Copyright (c) 2020 D3plus - https://d3plus.org
  @license MIT
*/

(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
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

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.4.7',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = Function.toString;

	var inspectSource = shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

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
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
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
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
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
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
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
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
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

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol() == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
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
	  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, objectCreate(null));
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
	var defineProperty = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
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

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;






	var nativeStartsWith = ''.startsWith;
	var min$2 = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
	// https://github.com/zloirock/core-js/pull/702
	var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
	  return descriptor && !descriptor.writable;
	}();

	// `String.prototype.startsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
	_export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
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

})));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-shape'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-shape'), require('d3plus-viz'), require('d3-selection')) :
  typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3plus-common', 'd3-array', 'd3-collection', 'd3-scale', 'd3-shape', 'd3plus-axis', 'd3plus-color', 'd3plus-shape', 'd3plus-viz', 'd3-selection'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3plusCommon, global.d3Array, global.d3Collection, global.scales, global.d3Shape, global.d3plusAxis, global.d3plusColor, global.shapes, global.d3plusViz, global.d3Selection));
}(this, (function (exports, d3plusCommon, d3Array, d3Collection, scales, d3Shape, d3plusAxis, d3plusColor, shapes, d3plusViz, d3Selection) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  /**
   * Adds left/right padding to a point or time scale.
   * @private
   */
  var discreteBuffer = (function (scale, data, discrete) {
    if (scale.padding) scale.padding(0.5);else {
      var closest = data.map(function (d) {
        return d[discrete];
      }).reduce(function (acc, curr, i, arr) {
        if (!i) return acc;
        var prev = arr[i - 1];
        if (!acc || curr - prev < acc) return curr - prev;else return acc;
      }, 0);
      var domain = scale.domain().slice();
      if (discrete === "y") domain.reverse();
      domain[0] = new Date(+domain[0] - closest / 2);
      domain[1] = new Date(+domain[1] + closest / 2);
      if (discrete === "y") domain.reverse();
      scale.domain(domain);
    }
  });

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer = 10]
      @private
  */

  function BarBuffer (_ref) {
    var _this = this;

    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2,
        _ref$buffer = _ref.buffer,
        buffer = _ref$buffer === void 0 ? 10 : _ref$buffer;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var oppScale = this._discrete === "x" ? y : x;
    var oppDomain = oppScale.domain().slice();
    var isDiscreteX = this._discrete === "x";
    if (isDiscreteX) oppDomain.reverse();
    var negVals, posVals;

    if (this._stacked) {
      var groupedData = d3Collection.nest().key(function (d) {
        return "".concat(d[_this._discrete], "_").concat(d.group);
      }).entries(data).map(function (d) {
        return d.values.map(function (x) {
          return x[isDiscreteX ? yKey : xKey];
        });
      });
      posVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d > 0;
        }));
      });
      negVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d < 0;
        }));
      });
    } else {
      posVals = data.map(function (d) {
        return d[isDiscreteX ? yKey : xKey];
      });
      negVals = posVals;
    }

    var bMax = oppScale(d3Array.max(posVals));
    if (isDiscreteX ? bMax < oppScale(0) : bMax > oppScale(0)) bMax += isDiscreteX ? -buffer : buffer;
    bMax = oppScale.invert(bMax);
    var bMin = oppScale(d3Array.min(negVals));
    if (isDiscreteX ? bMin > oppScale(0) : bMin < oppScale(0)) bMin += isDiscreteX ? buffer : -buffer;
    bMin = oppScale.invert(bMin);
    if (bMax > oppDomain[1]) oppDomain[1] = bMax;
    if (bMin < oppDomain[0]) oppDomain[0] = bMin;
    if (isDiscreteX) oppDomain.reverse();
    oppScale.domain(oppDomain);
    discreteBuffer(isDiscreteX ? x : y, data, this._discrete);
    return [x, y];
  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer = 10]
      @private
  */

  function BoxBuffer (_ref) {
    var _this = this;

    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2,
        _ref$buffer = _ref.buffer,
        buffer = _ref$buffer === void 0 ? 10 : _ref$buffer;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var oppScale = this._discrete === "x" ? y : x;
    var oppDomain = oppScale.domain().slice();
    var isDiscreteX = this._discrete === "x";
    if (isDiscreteX) oppDomain.reverse();
    var negVals, posVals;

    if (this._stacked) {
      var groupedData = d3Collection.nest().key(function (d) {
        return d[_this._discrete];
      }).entries(data).map(function (d) {
        return d.values.map(function (x) {
          return x[isDiscreteX ? yKey : xKey];
        });
      });
      posVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d > 0;
        }));
      });
      negVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d < 0;
        }));
      });
    } else {
      posVals = data.map(function (d) {
        return d[isDiscreteX ? yKey : xKey];
      });
      negVals = posVals;
    }

    var bMax = oppScale(d3Array.max(posVals));
    bMax += isDiscreteX ? -buffer : buffer;
    bMax = oppScale.invert(bMax);
    var bMin = oppScale(d3Array.min(negVals));
    bMin += isDiscreteX ? buffer : -buffer;
    bMin = oppScale.invert(bMin);
    if (bMax > oppDomain[1]) oppDomain[1] = bMax;
    if (bMin < oppDomain[0]) oppDomain[0] = bMin;
    if (isDiscreteX) oppDomain.reverse();
    oppScale.domain(oppDomain);
    discreteBuffer(isDiscreteX ? x : y, data, this._discrete);
    return [x, y];
  }

  /** */

  function numericBuffer (axis, scale, value, size, range, domain, index, invert) {
    // console.log("\n");
    // console.log(invert ? "Y Axis" : "X Axis");
    // console.log("Index:", index);
    // console.log("Range", range);
    if (invert) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    var needsBuffer = function needsBuffer() {
      var tempAxis = axis.copy();
      var diverging = false;

      if (scale === "log") {
        var d = axis.domain().slice(),
            r = axis.range().slice();

        if (invert) {
          d = d.reverse();
          r = r.reverse();
        }

        diverging = d[0] * d[1] < 0;

        if (diverging) {
          var percentScale = scales.scaleLog().domain([1, Math.abs(d[index])]).range([0, 1]);
          var leftPercentage = percentScale(Math.abs(d[index ? 0 : 1]));
          var zero = leftPercentage / (leftPercentage + 1) * (r[1] - r[0]);
          d = (index === 0 ? [d[0], 1] : [1, d[1]]).map(Math.abs);
          r = index === 0 ? [r[0], r[0] + zero] : [r[0] + zero, r[1]];
        }

        tempAxis = scales.scaleLog().domain(d).range(r);
      }

      var outside = false;
      var tempRange = tempAxis.range();
      var pixelValue;

      if (scale === "log") {
        pixelValue = !diverging || value < 0 && !index || value > 0 && index ? tempAxis(Math.abs(value)) : tempRange[value < 0 ? 0 : 1];
      } else pixelValue = tempAxis(value);

      if (invert) {
        if (index === 0) outside = pixelValue + size > tempRange[index];else if (index === 1) outside = pixelValue - size < tempRange[index];
      } else {
        if (index === 0) outside = pixelValue - size < tempRange[index];else if (index === 1) outside = pixelValue + size > tempRange[index];
      } // console.log("temp", pixelValue, size, tempAxis.domain(), tempRange);


      return outside;
    };

    if (axis.invert && needsBuffer()) {
      if (scale === "log") {
        var decrease = index === 0 && domain[0] > 0 || index === 1 && domain[1] < 0;
        var log = Math[decrease ? "ceil" : "floor"](Math.log10(Math.abs(domain[index]))); // console.log("Log start:", log, decrease);

        while (needsBuffer() && log < 20) {
          log = decrease ? log - 1 : log + 1;
          var mod = domain[index] < 0 ? -1 : 1;

          if (log < 0) {
            log = 1;
            decrease = !decrease;
            mod = !mod;
          }

          domain[index] = Math.pow(10, log) * mod;
          axis.domain(invert ? domain.slice().reverse() : domain); // console.log("change!", domain);
        }
      } else if (index === 0) {
        var v = axis.invert(axis(value) + size * (invert ? 1 : -1)); // console.log("value", v, domain);

        if (v < domain[index]) {
          domain[index] = v;
          axis.domain(invert ? domain.slice().reverse() : domain);
        }
      } else if (index === 1) {
        var _v = axis.invert(axis(value) + size * (invert ? -1 : 1));

        if (_v > domain[index]) {
          domain[index] = _v;
          axis.domain(invert ? domain.slice().reverse() : domain);
        }
      }
    }

    return invert ? domain.reverse() : domain;
  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the radius of the largest Circle.
      @private
  */

  function CircleBuffer (_ref) {
    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2,
        yScale = _ref.yScale,
        xScale = _ref.xScale,
        config = _ref.config,
        buffer = _ref.buffer;
    x = x.copy();
    y = y.copy();
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var xD = x.domain().slice(),
        yD = y.domain().slice();
    var xR = x.range(),
        yR = y.range();
    if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
    if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

    if (x.invert || y.invert) {
      data.forEach(function (d) {
        var s = buffer ? buffer : config.r(d.data, d.i) * 2;

        if (x.invert) {
          xD = numericBuffer(x, xScale, d[xKey], s, xR, xD, 0, false);
          xD = numericBuffer(x, xScale, d[xKey], s, xR, xD, 1, false);
        }

        if (y.invert) {
          yD = numericBuffer(y, yScale, d[yKey], s, yR, yD, 0, true);
          yD = numericBuffer(y, yScale, d[yKey], s, yR, yD, 1, true);
        }
      });
    }

    return [x, y];
  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the radius of the largest Circle.
      @private
  */

  function LineBuffer (_ref) {
    var _this = this;

    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var s = this._discrete === "x" ? y : x;
    var d = s.domain().slice();
    if (this._discrete === "x") d.reverse();
    var vals = data.map(function (d) {
      return d[_this._discrete === "x" ? yKey : xKey];
    });
    var b = s.invert(s(d3Array.max(vals)) + (this._discrete === "x" ? -10 : 10));
    if (b > d[1]) d[1] = b;
    if (this._discrete === "x") d.reverse();
    s.domain(d);
    return [x, y];
  }

  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the width/height of the largest Rect.
      @private
  */

  function RectBuffer (_ref) {
    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2,
        yScale = _ref.yScale,
        xScale = _ref.xScale,
        config = _ref.config;
    x = x.copy();
    y = y.copy();
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var xD = x.domain().slice(),
        yD = y.domain().slice();
    var xR = x.range(),
        yR = y.range();
    if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
    if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

    if (x.invert || y.invert) {
      data.forEach(function (d) {
        if (x.invert) {
          var w = config.width(d.data, d.i);
          xD = numericBuffer(x, xScale, d[xKey], w, xR, xD, 0, false);
          xD = numericBuffer(x, xScale, d[xKey], w, xR, xD, 1, false);
        }

        if (y.invert) {
          var h = config.height(d.data, d.i);
          yD = numericBuffer(y, yScale, d[yKey], h, yR, yD, 0, true);
          yD = numericBuffer(y, yScale, d[yKey], h, yR, yD, 1, true);
        }
      });
    }

    return [x, y];
  }

  /**
      @desc Logic for determining default sizes of shapes using the sizeScaleD3 internal function.
      @private
  */

  function defaultSize(d) {
    return this._sizeScaleD3(this._size ? this._size(d) : null);
  }
  /**
      @desc Logic for determining stackOrder ascending using groups.
      @private
  */


  function stackOrderAscending(series) {
    var sums = series.map(stackSum);
    var keys = series.map(function (d) {
      return d.key.split("_")[0];
    });
    return d3Shape.stackOrderNone(series).sort(function (a, b) {
      return keys[b].localeCompare(keys[a]) || sums[a] - sums[b];
    });
  }
  /**
      @desc Logic for determining stackOrder descending using groups.
      @private
  */


  function stackOrderDescending(series) {
    return stackOrderAscending(series).reverse();
  }
  /**
      @desc Logic for determining default sum of shapes using the stackSum function used in d3Shape.
      @private
  */


  function stackSum(series) {
    var i = -1,
        s = 0,
        v;
    var n = series.length;

    while (++i < n) {
      if (v = +series[i][1]) s += v;
    }

    return s;
  }
  /**
      @desc Logic for determining default sum of shapes using the stackSum function used in d3Shape.
      @private
  */


  function stackOffsetDiverging(series, order) {
    var n;
    if (!((n = series.length) > 0)) return;
    var d, dy, i, yn, yp;
    var m = series[order[0]].length;

    for (var j = 0; j < m; ++j) {
      for (yp = yn = 0, i = 0; i < n; ++i) {
        if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
          d[0] = yp, d[1] = yp += dy;
        } else if (dy < 0) {
          d[1] = yn, d[0] = yn += dy;
        } else {
          d[0] = yp;
        }
      }
    }
  }
  /**
      @class Plot
      @extends Viz
      @desc Creates an x/y plot based on an array of data.
  */


  var Plot =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Plot, _Viz);

    /**
        @memberof Plot
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Plot() {
      var _this;

      _classCallCheck(this, Plot);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Plot).call(this));
      _this._annotations = [];
      _this._backgroundConfig = {
        duration: 0,
        fill: "transparent"
      };
      _this._barPadding = 0;
      _this._buffer = {
        Bar: BarBuffer,
        Box: BoxBuffer,
        Circle: CircleBuffer,
        Line: LineBuffer,
        Rect: RectBuffer
      };
      _this._confidenceConfig = {
        fillOpacity: d3plusCommon.constant(0.5)
      };
      _this._discreteCutoff = 100;
      _this._groupPadding = 5;
      _this._previousShapes = [];
      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        Area: {
          label: function label(d, i) {
            return _this._stacked ? _this._drawLabel(d, i) : false;
          },
          labelConfig: {
            fontResize: true
          }
        },
        ariaLabel: function ariaLabel(d, i) {
          var ariaLabelStr = "";
          if (d.nested) ariaLabelStr = "".concat(_this._drawLabel(d.data, d.i));else {
            ariaLabelStr = "".concat(_this._drawLabel(d, i));
            if (_this._x(d, i) !== undefined) ariaLabelStr += ", x: ".concat(_this._x(d, i));
            if (_this._y(d, i) !== undefined) ariaLabelStr += ", y: ".concat(_this._y(d, i));
            if (_this._x2(d, i) !== undefined) ariaLabelStr += ", x2: ".concat(_this._x2(d, i));
            if (_this._y2(d, i) !== undefined) ariaLabelStr += ", y2: ".concat(_this._y2(d, i));
          }
          return "".concat(ariaLabelStr, ".");
        },
        Bar: {
          labelConfig: {
            textAnchor: function textAnchor() {
              return _this._discrete === "x" ? "middle" : "end";
            },
            verticalAlign: function verticalAlign() {
              return _this._discrete === "x" ? "top" : "middle";
            }
          }
        },
        Circle: {
          r: defaultSize.bind(_assertThisInitialized(_this))
        },
        Line: {
          fill: d3plusCommon.constant("none"),
          label: false,
          stroke: function stroke(d, i) {
            return d3plusColor.colorAssign(_this._id(d, i));
          },
          strokeWidth: d3plusCommon.constant(1)
        },
        Rect: {
          height: function height(d) {
            return defaultSize.bind(_assertThisInitialized(_this))(d) * 2;
          },
          width: function width(d) {
            return defaultSize.bind(_assertThisInitialized(_this))(d) * 2;
          }
        }
      });
      _this._shapeOrder = ["Area", "Path", "Bar", "Box", "Line", "Rect", "Circle"];

      _this._shapeSort = function (a, b) {
        return _this._shapeOrder.indexOf(a) - _this._shapeOrder.indexOf(b);
      };

      _this._sizeMax = 20;
      _this._sizeMin = 5;
      _this._sizeScale = "sqrt";
      _this._stackOffset = stackOffsetDiverging;
      _this._stackOrder = stackOrderDescending;
      _this._timelineConfig = d3plusCommon.assign(_this._timelineConfig, {
        brushing: true
      });
      _this._x = d3plusCommon.accessor("x");
      _this._xAxis = new d3plusAxis.AxisBottom().align("end");
      _this._xTest = new d3plusAxis.AxisBottom().align("end").gridSize(0);
      _this._xConfig = {};
      _this._xCutoff = 150;
      _this._x2 = d3plusCommon.accessor("x2");
      _this._x2Axis = new d3plusAxis.AxisTop().align("start");
      _this._x2Test = new d3plusAxis.AxisTop().align("start").gridSize(0);
      _this._x2Config = {
        padding: 0
      };
      _this._y = d3plusCommon.accessor("y");
      _this._yAxis = new d3plusAxis.AxisLeft().align("start");
      _this._yTest = new d3plusAxis.AxisLeft().align("start").gridSize(0);
      _this._yConfig = {
        gridConfig: {
          stroke: function stroke(d) {
            var domain = _this._yAxis.domain();

            return domain[domain.length - 1] === d.id ? "transparent" : "#ccc";
          }
        }
      };
      _this._yCutoff = 150;
      _this._y2 = d3plusCommon.accessor("y2");
      _this._y2Axis = new d3plusAxis.AxisRight().align("end");
      _this._y2Test = new d3plusAxis.AxisLeft().align("end").gridSize(0);
      _this._y2Config = {};
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Plot, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        if (!this._filteredData.length) return this;

        var stackGroup = function stackGroup(d, i) {
          return _this2._stacked ? "".concat(_this2._groupBy.length > 1 ? _this2._ids(d, i).slice(0, -1).join("_") : "group") : "".concat(_this2._ids(d, i).join("_"));
        };

        var data = this._filteredData.map(function (d, i) {
          return {
            __d3plus__: true,
            data: d,
            group: stackGroup(d, i),
            i: i,
            hci: _this2._confidence && _this2._confidence[1] && _this2._confidence[1](d, i),
            id: _this2._ids(d, i).slice(0, _this2._drawDepth + 1).join("_"),
            lci: _this2._confidence && _this2._confidence[0] && _this2._confidence[0](d, i),
            shape: _this2._shape(d, i),
            x: _this2._x(d, i),
            x2: _this2._x2(d, i),
            y: _this2._y(d, i),
            y2: _this2._y2(d, i)
          };
        });

        this._formattedData = data;

        if (this._size) {
          var rExtent = d3Array.extent(data, function (d) {
            return _this2._size(d.data);
          });

          this._sizeScaleD3 = function () {
            return _this2._sizeMin;
          };

          this._sizeScaleD3 = scales["scale".concat(this._sizeScale.charAt(0).toUpperCase()).concat(this._sizeScale.slice(1))]().domain(rExtent).range([rExtent[0] === rExtent[1] ? this._sizeMax : d3Array.min([this._sizeMax / 2, this._sizeMin]), this._sizeMax]);
        } else {
          this._sizeScaleD3 = function () {
            return _this2._sizeMin;
          };
        }

        var x2Exists = data.some(function (d) {
          return d.x2 !== undefined;
        }),
            y2Exists = data.some(function (d) {
          return d.y2 !== undefined;
        });
        var height = this._height - this._margin.top - this._margin.bottom,
            opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
            opp2 = this._discrete ? this._discrete === "x" ? "y2" : "x2" : undefined,
            opps = [opp, opp2].filter(function (d) {
          return d;
        }),
            parent = this._select,
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;

        var x2Time = this._time && data[0].x2 === this._time(data[0].data, data[0].i),
            xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
            y2Time = this._time && data[0].y2 === this._time(data[0].data, data[0].i),
            yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

        for (var i = 0; i < data.length; i++) {
          var d = data[i];
          if (xTime) d.x = d3plusAxis.date(d.x);
          if (x2Time) d.x2 = d3plusAxis.date(d.x2);
          if (yTime) d.y = d3plusAxis.date(d.y);
          if (y2Time) d.y2 = d3plusAxis.date(d.y2);
          d.discrete = d.shape === "Bar" ? "".concat(d[this._discrete], "_").concat(d.group) : "".concat(d[this._discrete]);
        }

        var discreteKeys, domains, stackData, stackKeys;

        if (this._stacked) {
          var _domains;

          var groupValues = d3Collection.nest().key(function (d) {
            return d.group;
          }).entries(data).reduce(function (obj, d) {
            if (!obj[d.key]) obj[d.key] = 0;
            obj[d.key] += d3Array.sum(d.values, function (dd) {
              return dd[opp];
            });
            return obj;
          }, {});
          data = data.sort(function (a, b) {
            if (_this2["_".concat(_this2._discrete, "Sort")]) return _this2["_".concat(_this2._discrete, "Sort")](a.data, b.data);
            var a1 = a[_this2._discrete],
                b1 = b[_this2._discrete];
            if (a1 - b1 !== 0) return a1 - b1;
            if (a.group !== b.group) return groupValues[b.group] - groupValues[a.group];
            return b[opp] - a[opp];
          });
          discreteKeys = Array.from(new Set(data.map(function (d) {
            return d.discrete;
          })));
          stackKeys = Array.from(new Set(data.map(function (d) {
            return d.id;
          })));
          stackData = d3Collection.nest().key(function (d) {
            return d.discrete;
          }).entries(data).map(function (d) {
            return d.values;
          });
          stackData.forEach(function (g) {
            var ids = Array.from(new Set(g.map(function (d) {
              return d.id;
            })));

            if (ids.length < stackKeys.length) {
              stackKeys.forEach(function (k) {
                if (!ids.includes(k)) {
                  var _d = data.filter(function (d) {
                    return d.id === k;
                  })[0];

                  if (_d.shape === "Area") {
                    var _fillerPoint;

                    var group = stackGroup(_d.data, _d.i);
                    var fillerPoint = (_fillerPoint = {
                      __d3plus__: true,
                      data: _d.data,
                      discrete: _d.shape === "Bar" ? "".concat(g[0][_this2._discrete], "_").concat(group) : "".concat(g[0][_this2._discrete]),
                      group: group,
                      id: k,
                      shape: _d.shape
                    }, _defineProperty(_fillerPoint, _this2._discrete, g[0][_this2._discrete]), _defineProperty(_fillerPoint, opp, 0), _fillerPoint);
                    data.push(fillerPoint);
                  }
                }
              });
            }
          });

          if (this["_".concat(this._discrete, "Sort")]) {
            data.sort(function (a, b) {
              return _this2["_".concat(_this2._discrete, "Sort")](a.data, b.data);
            });
          } else {
            data.sort(function (a, b) {
              return a[_this2._discrete] - b[_this2._discrete];
            });
          }

          var order = this._stackOrder;
          if (order instanceof Array) stackKeys.sort(function (a, b) {
            return order.indexOf(a) - order.indexOf(b);
          });else if (order === d3Shape.stackOrderNone) stackKeys.sort(function (a, b) {
            return a.localeCompare(b);
          });
          stackData = d3Shape.stack().keys(stackKeys).offset(this._stackOffset).order(order instanceof Array ? d3Shape.stackOrderNone : order).value(function (group, key) {
            var d = group.filter(function (g) {
              return g.id === key;
            });
            return d.length ? d[0][opp] : 0;
          })(stackData);
          domains = (_domains = {}, _defineProperty(_domains, this._discrete, d3Array.extent(data, function (d) {
            return d[_this2._discrete];
          })), _defineProperty(_domains, opp, [d3Array.min(stackData.map(function (g) {
            return d3Array.min(g.map(function (p) {
              return p[0];
            }));
          })), d3Array.max(stackData.map(function (g) {
            return d3Array.max(g.map(function (p) {
              return p[1];
            }));
          }))]), _domains);
        } else {
          var _discrete = this._discrete || "x";

          if (this["_".concat(this._discrete, "Sort")]) {
            data.sort(function (a, b) {
              return _this2["_".concat(_this2._discrete, "Sort")](a.data, b.data);
            });
          } else {
            data.sort(function (a, b) {
              return a[_discrete] - b[_discrete];
            });
          }

          var xData = _discrete === "x" ? data.map(function (d) {
            return d.x;
          }) : data.map(function (d) {
            return d.x;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var x2Data = _discrete === "x" ? data.map(function (d) {
            return d.x2;
          }) : data.map(function (d) {
            return d.x2;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var yData = _discrete === "y" ? data.map(function (d) {
            return d.y;
          }) : data.map(function (d) {
            return d.y;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var y2Data = _discrete === "y" ? data.map(function (d) {
            return d.y2;
          }) : data.map(function (d) {
            return d.y2;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          domains = {
            x: this._xSort ? Array.from(new Set(data.filter(function (d) {
              return d.x;
            }).sort(function (a, b) {
              return _this2._xSort(a.data, b.data);
            }).map(function (d) {
              return d.x;
            }))) : d3Array.extent(xData, function (d) {
              return d;
            }),
            x2: this._x2Sort ? Array.from(new Set(data.filter(function (d) {
              return d.x2;
            }).sort(function (a, b) {
              return _this2._x2Sort(a.data, b.data);
            }).map(function (d) {
              return d.x2;
            }))) : d3Array.extent(x2Data, function (d) {
              return d;
            }),
            y: this._ySort ? Array.from(new Set(data.filter(function (d) {
              return d.y;
            }).sort(function (a, b) {
              return _this2._ySort(a.data, b.data);
            }).map(function (d) {
              return d.y;
            }))) : d3Array.extent(yData, function (d) {
              return d;
            }),
            y2: this._y2Sort ? Array.from(new Set(data.filter(function (d) {
              return d.y2;
            }).sort(function (a, b) {
              return _this2._y2Sort(a.data, b.data);
            }).map(function (d) {
              return d.y2;
            }))) : d3Array.extent(y2Data, function (d) {
              return d;
            })
          };
        }

        var xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
            xScale = this._xSort ? "Point" : "Linear";
        if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
        if (xDomain[1] === void 0) xDomain[1] = domains.x[1];

        if (xTime) {
          xDomain = xDomain.map(d3plusAxis.date);
          xScale = "Time";
        } else if (this._discrete === "x") {
          xDomain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.x));
          }).sort(function (a, b) {
            return _this2._xSort ? _this2._xSort(a.data, b.data) : a.x - b.x;
          }).map(function (d) {
            return d.x;
          })));
          xScale = "Point";
        }

        var x2Domain = this._x2Domain ? this._x2Domain.slice() : domains.x2,
            x2Scale = this._x2Sort ? "Point" : "Linear";
        if (x2Domain && x2Domain[0] === void 0) x2Domain[0] = domains.x2[0];
        if (x2Domain && x2Domain[1] === void 0) x2Domain[1] = domains.x2[1];

        if (x2Time) {
          x2Domain = x2Domain.map(d3plusAxis.date);
          x2Scale = "Time";
        } else if (this._discrete === "x") {
          x2Domain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.x2));
          }).sort(function (a, b) {
            return _this2._x2Sort ? _this2._x2Sort(a.data, b.data) : a.x2 - b.x2;
          }).map(function (d) {
            return d.x2;
          })));
          x2Scale = "Point";
        }

        var yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
            yScale = this._ySort ? "Point" : "Linear";
        if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
        if (yDomain[1] === void 0) yDomain[1] = domains.y[1];
        var y2Domain = this._y2Domain ? this._y2Domain.slice() : domains.y2,
            y2Scale = this._y2Sort ? "Point" : "Linear";
        if (y2Domain && y2Domain[0] === void 0) y2Domain[0] = domains.y2[0];
        if (y2Domain && y2Domain[1] === void 0) y2Domain[1] = domains.y2[1];

        if (yTime) {
          yDomain = yDomain.map(d3plusAxis.date);
          yScale = "Time";
        } else if (this._discrete === "y") {
          yDomain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.y));
          }).sort(function (a, b) {
            return _this2._ySort ? _this2._ySort(a.data, b.data) : a.y - b.y;
          }).map(function (d) {
            return d.y;
          })));
          yScale = "Point";
          y2Domain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.y2));
          }).sort(function (a, b) {
            return _this2._y2Sort ? _this2._y2Sort(a.data, b.data) : a.y2 - b.y2;
          }).map(function (d) {
            return d.y2;
          })));
          y2Scale = "Point";
        }

        if (y2Time) {
          y2Domain = y2Domain.map(d3plusAxis.date);
          y2Scale = "Time";
        }

        domains = {
          x: xDomain,
          x2: x2Domain || xDomain,
          y: yDomain,
          y2: y2Domain || yDomain
        };
        opps.forEach(function (opp) {
          if (_this2["_".concat(opp, "Config")].domain) {
            var _d2 = _this2["_".concat(opp, "Config")].domain;

            if (_this2._discrete === "x") _d2.reverse();
            domains[opp] = _d2;
          } else if (opp && _this2._baseline !== void 0) {
            var b = _this2._baseline;
            if (domains[opp] && domains[opp][0] > b) domains[opp][0] = b;else if (domains[opp] && domains[opp][1] < b) domains[opp][1] = b;
          }
        });

        var _x2 = scales["scale".concat(xScale)]().domain(domains.x).range(d3Array.range(0, width + 1, width / (domains.x.length - 1))),
            x2 = scales["scale".concat(x2Scale)]().domain(domains.x2).range(d3Array.range(0, width + 1, width / (domains.x2.length - 1))),
            _y2 = scales["scale".concat(yScale)]().domain(domains.y.reverse()).range(d3Array.range(0, height + 1, height / (domains.y.length - 1))),
            y2 = scales["scale".concat(y2Scale)]().domain(domains.y2.reverse()).range(d3Array.range(0, height + 1, height / (domains.y2.length - 1)));

        var shapeData = d3Collection.nest().key(function (d) {
          return d.shape;
        }).entries(data).sort(function (a, b) {
          return _this2._shapeSort(a.key, b.key);
        });

        var autoScale = function autoScale(axis, fallback) {
          var userScale = _this2["_".concat(axis, "Config")].scale;

          if (userScale === "auto") {
            if (_this2._discrete === axis) return fallback;
            var values = data.map(function (d) {
              return d[axis];
            });
            return d3Array.deviation(values) / d3Array.mean(values) > 3 ? "log" : "linear";
          }

          return userScale || fallback;
        };

        var yConfigScale = autoScale("y", yScale).toLowerCase();
        var y2ConfigScale = autoScale("y2", y2Scale).toLowerCase();
        var xConfigScale = autoScale("x", xScale).toLowerCase();
        var x2ConfigScale = autoScale("x2", x2Scale).toLowerCase();
        var oppScale = this._discrete === "x" ? yScale : xScale;

        if (oppScale !== "Point") {
          shapeData.forEach(function (d) {
            if (_this2._buffer[d.key]) {
              var res = _this2._buffer[d.key].bind(_this2)({
                data: d.values,
                x: _x2,
                y: _y2,
                yScale: yConfigScale,
                xScale: xConfigScale,
                config: _this2._shapeConfig[d.key]
              });

              _x2 = res[0];
              _y2 = res[1];

              var res2 = _this2._buffer[d.key].bind(_this2)({
                data: d.values,
                x: x2,
                y: y2,
                yScale: y2ConfigScale,
                xScale: x2ConfigScale,
                x2: true,
                y2: true,
                config: _this2._shapeConfig[d.key]
              });

              x2 = res2[0];
              y2 = res2[1];
            }
          });
        }

        xDomain = _x2.domain();
        x2Domain = x2.domain();
        yDomain = _y2.domain();
        y2Domain = y2.domain();
        var defaultConfig = {
          barConfig: {
            "stroke-width": 0
          },
          gridSize: 0,
          labels: [],
          title: false,
          tickSize: 0
        };
        var defaultX2Config = x2Exists ? {} : defaultConfig;
        var defaultY2Config = y2Exists ? {} : defaultConfig;
        var showX = this._discrete === "x" && this._width > this._discreteCutoff || this._width > this._xCutoff;
        var showY = this._discrete === "y" && this._height > this._discreteCutoff || this._height > this._yCutoff;
        var yC = {
          gridConfig: {
            stroke: !this._discrete || this._discrete === "x" ? this._yTest.gridConfig().stroke : "transparent"
          },
          locale: this._locale,
          scalePadding: _y2.padding ? _y2.padding() : 0
        };

        if (!showX) {
          yC.barConfig = {
            stroke: "transparent"
          };
          yC.tickSize = 0;
          yC.shapeConfig = {
            labelBounds: function labelBounds(d, i) {
              var _d$labelBounds = d.labelBounds,
                  width = _d$labelBounds.width,
                  y = _d$labelBounds.y;
              var height = _this2._height / 2;
              var x = i ? -height : 0;
              return {
                x: x,
                y: y,
                width: width,
                height: height
              };
            },
            labelConfig: {
              padding: 0,
              rotate: 0,
              verticalAlign: function verticalAlign(d) {
                return d.id === yTicks[0] ? "top" : "bottom";
              }
            },
            labelRotation: false
          };
        }

        var testGroup = d3plusCommon.elem("g.d3plus-plot-test", {
          enter: {
            opacity: 0
          },
          parent: this._select
        }),
            x2Ticks = this._discrete === "x" && !x2Time ? domains.x2 : undefined,
            xTicks = !showY ? d3Array.extent(domains.x) : this._discrete === "x" && !xTime ? domains.x : undefined,
            y2Ticks = this._discrete === "y" && !y2Time ? domains.y2 : undefined,
            yTicks = !showX ? d3Array.extent(domains.y) : this._discrete === "y" && !yTime ? domains.y : undefined;

        if (showY) {
          this._yTest.domain(yDomain).height(height).maxSize(width / 2).range([undefined, undefined]).select(testGroup.node()).ticks(yTicks).width(width).config(yC).config(this._yConfig).scale(yConfigScale).render();
        }

        var yBounds = this._yTest.outerBounds();

        var yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

        if (y2Exists) {
          this._y2Test.domain(y2Domain).height(height).range([undefined, undefined]).select(testGroup.node()).ticks(y2Ticks).width(width).config(yC).config(defaultY2Config).config(this._y2Config).scale(y2ConfigScale).render();
        }

        var y2Bounds = this._y2Test.outerBounds();

        var y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
        var xC = {
          gridConfig: {
            stroke: !this._discrete || this._discrete === "y" ? this._xTest.gridConfig().stroke : "transparent"
          },
          locale: this._locale,
          scalePadding: _x2.padding ? _x2.padding() : 0
        };

        if (!showY) {
          xC.barConfig = {
            stroke: "transparent"
          };
          xC.tickSize = 0;
          xC.shapeConfig = {
            labelBounds: function labelBounds(d, i) {
              var _d$labelBounds2 = d.labelBounds,
                  height = _d$labelBounds2.height,
                  y = _d$labelBounds2.y;
              var width = _this2._width / 2;
              var x = i ? -width : 0;
              return {
                x: x,
                y: y,
                width: width,
                height: height
              };
            },
            labelConfig: {
              padding: 0,
              rotate: 0,
              textAnchor: function textAnchor(d) {
                return d.id === xTicks[0] ? "start" : "end";
              }
            },
            labelRotation: false
          };
        }

        if (showX) {
          this._xTest.domain(xDomain).height(height).maxSize(height / 2).range([undefined, undefined]).select(testGroup.node()).ticks(xTicks).width(width).config(xC).config(this._xConfig).scale(xConfigScale).render();
        }

        if (x2Exists) {
          this._x2Test.domain(x2Domain).height(height).range([undefined, undefined]).select(testGroup.node()).ticks(x2Ticks).width(width).config(xC).tickSize(0).config(defaultX2Config).config(this._x2Config).scale(x2ConfigScale).render();
        }

        var xTestRange = this._xTest._getRange();

        var x2TestRange = this._x2Test._getRange();

        var x2Bounds = this._x2Test.outerBounds();

        var x2Height = x2Exists ? x2Bounds.height + this._x2Test.padding() : 0;
        var xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

        if (showX) {
          this._xTest.range([xOffsetLeft, undefined]).render();
        }

        var topOffset = showY ? this._yTest.shapeConfig().labelConfig.fontSize() / 2 : 0;
        var xOffsetRight = d3Array.max([y2Width, width - xTestRange[1], width - x2TestRange[1]]);

        var xBounds = this._xTest.outerBounds();

        var xHeight = xBounds.height + (showY ? this._xTest.padding() : 0);
        this._padding.left += xOffsetLeft;
        this._padding.right += xOffsetRight;
        this._padding.bottom += xHeight;
        this._padding.top += x2Height + topOffset;

        _get(_getPrototypeOf(Plot.prototype), "_draw", this).call(this, callback);

        var horizontalMargin = this._margin.left + this._margin.right;
        var verticalMargin = this._margin.top + this._margin.bottom;
        var yRange = [x2Height, height - (xHeight + topOffset + verticalMargin)];

        if (showY) {
          this._yTest.domain(yDomain).height(height).maxSize(width / 2).range(yRange).select(testGroup.node()).ticks(yTicks).width(width).config(yC).config(this._yConfig).scale(yConfigScale).render();
        }

        yBounds = this._yTest.outerBounds();
        yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;
        xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

        if (y2Exists) {
          this._y2Test.config(yC).domain(y2Domain).gridSize(0).height(height).range(yRange).select(testGroup.node()).width(width - d3Array.max([0, xOffsetRight - y2Width])).title(false).config(this._y2Config).config(defaultY2Config).scale(y2ConfigScale).render();
        }

        y2Bounds = this._y2Test.outerBounds();
        y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
        xOffsetRight = d3Array.max([0, y2Width, width - xTestRange[1], width - x2TestRange[1]]);
        var xRange = [xOffsetLeft, width - (xOffsetRight + horizontalMargin)];
        var rectGroup = d3plusCommon.elem("g.d3plus-plot-background", {
          parent: parent,
          transition: transition
        });
        var transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top + x2Height + topOffset, ")");
        var x2Transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top + topOffset, ")");
        var xGroup = showX && d3plusCommon.elem("g.d3plus-plot-x-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        });
        var x2Group = x2Exists && d3plusCommon.elem("g.d3plus-plot-x2-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: x2Transform
          },
          update: {
            transform: x2Transform
          }
        });
        var xTrans = xOffsetLeft > yWidth ? xOffsetLeft - yWidth : 0;
        var yTransform = "translate(".concat(this._margin.left + xTrans, ", ").concat(this._margin.top + topOffset, ")");
        var yGroup = showY && d3plusCommon.elem("g.d3plus-plot-y-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: yTransform
          },
          update: {
            transform: yTransform
          }
        });
        var y2Transform = "translate(-".concat(this._margin.right, ", ").concat(this._margin.top + topOffset, ")");
        var y2Group = y2Exists && d3plusCommon.elem("g.d3plus-plot-y2-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: y2Transform
          },
          update: {
            transform: y2Transform
          }
        });

        this._xAxis.domain(xDomain).height(height - (x2Height + topOffset + verticalMargin)).maxSize(height / 2).range(xRange).select(showX ? xGroup.node() : undefined).ticks(xTicks).width(width).config(xC).config(this._xConfig).scale(xConfigScale).render();

        if (x2Exists) {
          this._x2Axis.domain(x2Domain).height(height - (xHeight + topOffset + verticalMargin)).range(xRange).select(x2Group.node()).ticks(x2Ticks).width(width).config(xC).config(defaultX2Config).config(this._x2Config).scale(x2ConfigScale).render();
        }

        _x2 = function x(d, _x) {
          if (_x === "x2") {
            if (_this2._x2Config.scale === "log" && d === 0) d = x2Domain[0] < 0 ? -1 : 1;
            return _this2._x2Axis._getPosition.bind(_this2._x2Axis)(d);
          } else {
            if (_this2._xConfig.scale === "log" && d === 0) d = xDomain[0] < 0 ? -1 : 1;
            return _this2._xAxis._getPosition.bind(_this2._xAxis)(d);
          }
        };

        yRange = [this._xAxis.outerBounds().y + x2Height, height - (xHeight + topOffset + verticalMargin)];

        this._yAxis.domain(yDomain).height(height).maxSize(width / 2).range(yRange).select(showY ? yGroup.node() : undefined).ticks(yTicks).width(xRange[xRange.length - 1]).config(yC).config(this._yConfig).scale(yConfigScale).render();

        if (y2Exists) {
          this._y2Axis.config(yC).domain(y2Exists ? y2Domain : yDomain).gridSize(0).height(height).range(yRange).select(y2Group.node()).width(width - d3Array.max([0, xOffsetRight - y2Width])).title(false).config(this._y2Config).config(defaultY2Config).scale(y2ConfigScale).render();
        }

        _y2 = function y(d, _y) {
          if (_y === "y2") {
            if (_this2._y2Config.scale === "log" && d === 0) d = y2Domain[0] < 0 ? -1 : 1;
            return _this2._y2Axis._getPosition.bind(_this2._y2Axis)(d) - x2Height;
          } else {
            if (_this2._yConfig.scale === "log" && d === 0) d = yDomain[0] < 0 ? -1 : 1;
            return _this2._yAxis._getPosition.bind(_this2._yAxis)(d) - x2Height;
          }
        };

        new shapes.Rect().data([{}]).select(rectGroup.node()).x(xRange[0] + (xRange[1] - xRange[0]) / 2).width(xRange[1] - xRange[0]).y(this._margin.top + topOffset + yRange[0] + (yRange[1] - yRange[0]) / 2).height(yRange[1] - yRange[0]).config(this._backgroundConfig).render();
        var annotationGroup = d3plusCommon.elem("g.d3plus-plot-annotations", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node();

        this._annotations.forEach(function (annotation) {
          new shapes[annotation.shape]().config(annotation).config({
            x: function x(d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            },
            x0: _this2._discrete === "x" ? function (d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            } : _x2(domains.x[0]),
            x1: _this2._discrete === "x" ? null : function (d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            },
            y: function y(d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
            },
            y0: _this2._discrete === "y" ? function (d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
            } : _y2(domains.y[1]) - yOffset,
            y1: _this2._discrete === "y" ? null : function (d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y) - yOffset;
            }
          }).select(annotationGroup).render();
        });

        var yOffset = this._xAxis.barConfig()["stroke-width"];

        if (yOffset) yOffset /= 2;
        var discrete = this._discrete || "x";
        var shapeConfig = {
          duration: this._duration,
          label: function label(d) {
            return _this2._drawLabel(d.data, d.i);
          },
          select: d3plusCommon.elem("g.d3plus-plot-shapes", {
            parent: parent,
            transition: transition,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          }).node(),
          x: function x(d) {
            return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
          },
          x0: discrete === "x" ? function (d) {
            return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
          } : _x2(typeof this._baseline === "number" ? this._baseline : domains.x[0]),
          x1: discrete === "x" ? null : function (d) {
            return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
          },
          y: function y(d) {
            return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
          },
          y0: discrete === "y" ? function (d) {
            return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
          } : _y2(typeof this._baseline === "number" ? this._baseline : domains.y[1]) - yOffset,
          y1: discrete === "y" ? null : function (d) {
            return d.y2 ? _y2(d.y2, "y2") : _y2(d.y) - yOffset;
          }
        };

        if (this._stacked) {
          var scale = opp === "x" ? _x2 : _y2;

          shapeConfig["".concat(opp)] = shapeConfig["".concat(opp, "0")] = function (d) {
            var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
            return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(domains[opp][opp === "x" ? 0 : 1]);
          };

          shapeConfig["".concat(opp, "1")] = function (d) {
            var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
            return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(domains[opp][opp === "x" ? 0 : 1]);
          };
        }

        var events = Object.keys(this._on);
        shapeData.forEach(function (d) {
          var s = new shapes[d.key]().config(shapeConfig).data(d.values);

          if (d.key === "Bar") {
            var space;

            var _scale = _this2._discrete === "x" ? _x2 : _y2;

            var scaleType = _this2._discrete === "x" ? xScale : yScale;
            var vals = _this2._discrete === "x" ? xDomain : yDomain;

            var _range = _this2._discrete === "x" ? xRange : yRange;

            if (scaleType !== "Point" && vals.length === 2) {
              space = (_scale(d.values[_this2._discrete === "x" ? 0 : d.values.length - 1][_this2._discrete]) - _scale(vals[0])) * 2;
            } else if (vals.length > 1) space = _scale(vals[1]) - _scale(vals[0]);else space = _range[_range.length - 1] - _range[0];

            if (_this2._groupPadding < space) space -= _this2._groupPadding;
            var barSize = space || 1;
            var groups = d3Collection.nest().key(function (d) {
              return d[_this2._discrete];
            }).key(function (d) {
              return d.group;
            }).entries(d.values);
            var ids = d3Array.merge(groups.map(function (d) {
              return d.values.map(function (v) {
                return v.key;
              });
            }));
            var uniqueIds = Array.from(new Set(ids));

            if (d3Array.max(groups.map(function (d) {
              return d.values.length;
            })) === 1) {
              s[_this2._discrete](function (d, i) {
                return shapeConfig[_this2._discrete](d, i);
              });
            } else {
              barSize = (barSize - _this2._barPadding * uniqueIds.length - 1) / uniqueIds.length;
              var offset = space / 2 - barSize / 2;
              var xMod = scales.scaleLinear().domain([0, uniqueIds.length - 1]).range([-offset, offset]);

              s[_this2._discrete](function (d, i) {
                return shapeConfig[_this2._discrete](d, i) + xMod(uniqueIds.indexOf(d.group));
              });
            }

            s.width(barSize);
            s.height(barSize);
          } else if (d.key === "Line") {
            s.duration(width * 1.5);

            if (_this2._confidence) {
              var areaConfig = Object.assign({}, shapeConfig);

              var _discrete2 = _this2._discrete || "x";

              var key = _discrete2 === "x" ? "y" : "x";
              var scaleFunction = _discrete2 === "x" ? _y2 : _x2;

              areaConfig["".concat(key, "0")] = function (d) {
                return scaleFunction(_this2._confidence[0] ? d.lci : d[key]);
              };

              areaConfig["".concat(key, "1")] = function (d) {
                return scaleFunction(_this2._confidence[1] ? d.hci : d[key]);
              };

              var area = new shapes.Area().config(areaConfig).data(d.values);
              var confidenceConfig = Object.assign(_this2._shapeConfig, _this2._confidenceConfig);
              area.config(d3plusCommon.configPrep.bind(_this2)(confidenceConfig, "shape", "Area")).render();

              _this2._shapes.push(area);
            }
          }

          var classEvents = events.filter(function (e) {
            return e.includes(".".concat(d.key));
          }),
              globalEvents = events.filter(function (e) {
            return !e.includes(".");
          }),
              shapeEvents = events.filter(function (e) {
            return e.includes(".shape");
          });

          var _loop = function _loop(e) {
            s.on(globalEvents[e], function (d) {
              return _this2._on[globalEvents[e]](d.data, d.i);
            });
          };

          for (var e = 0; e < globalEvents.length; e++) {
            _loop(e);
          }

          var _loop2 = function _loop2(_e) {
            s.on(shapeEvents[_e], function (d) {
              return _this2._on[shapeEvents[_e]](d.data, d.i);
            });
          };

          for (var _e = 0; _e < shapeEvents.length; _e++) {
            _loop2(_e);
          }

          var _loop3 = function _loop3(_e2) {
            s.on(classEvents[_e2], function (d) {
              return _this2._on[classEvents[_e2]](d.data, d.i);
            });
          };

          for (var _e2 = 0; _e2 < classEvents.length; _e2++) {
            _loop3(_e2);
          }

          var userConfig = d3plusCommon.configPrep.bind(_this2)(_this2._shapeConfig, "shape", d.key);
          if (_this2._shapeConfig.duration === undefined) delete userConfig.duration;
          s.config(userConfig).render();

          _this2._shapes.push(s);
        });
        var dataShapes = shapeData.map(function (d) {
          return d.key;
        });
        if (this._confidence && dataShapes.includes("Line")) dataShapes.push("Area");

        var exitShapes = this._previousShapes.filter(function (d) {
          return !dataShapes.includes(d);
        });

        exitShapes.forEach(function (shape) {
          new shapes[shape]().config(shapeConfig).data([]).render();
        });
        this._previousShapes = dataShapes;
        return this;
      }
      /**
          @memberof Plot
          @desc Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.
          @param {Array|Object} *annotations* = []
          @chainable
      */

    }, {
      key: "annotations",
      value: function annotations(_) {
        return arguments.length ? (this._annotations = _ instanceof Array ? _ : [_], this) : this._annotations;
      }
      /**
           @memberof Plot
           @desc A d3plus-shape configuration Object used for styling the background rectangle of the inner x/y plot (behind all of the shapes and gridlines).
           @param {Object} [*value*]
           @chainable
       */

    }, {
      key: "backgroundConfig",
      value: function backgroundConfig(_) {
        return arguments.length ? (this._backgroundConfig = d3plusCommon.assign(this._backgroundConfig, _), this) : this._backgroundConfig;
      }
      /**
          @memberof Plot
          @desc Sets the pixel space between each bar in a group of bars.
          @param {Number} *value* = 0
          @chainable
      */

    }, {
      key: "barPadding",
      value: function barPadding(_) {
        return arguments.length ? (this._barPadding = _, this) : this._barPadding;
      }
      /**
          @memberof Plot
          @desc Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "baseline",
      value: function baseline(_) {
        return arguments.length ? (this._baseline = _, this) : this._baseline;
      }
      /**
           @memberof Plot
           @desc Sets the confidence to the specified array of lower and upper bounds.
           @param {String[]|Function[]} *value*
           @chainable
           @example <caption>Can be called with accessor functions or static keys:</caption>
           var data = {id: "alpha", value: 10, lci: 9, hci: 11};
           ...
           // Accessor functions
           .confidence([function(d) { return d.lci }, function(d) { return d.hci }])
            // Or static keys
           .confidence(["lci", "hci"])
       */

    }, {
      key: "confidence",
      value: function confidence(_) {
        if (arguments.length && _ instanceof Array) {
          this._confidence = [];
          var lower = _[0];
          this._confidence[0] = typeof lower === "function" || !lower ? lower : d3plusCommon.accessor(lower);
          var upper = _[1];
          this._confidence[1] = typeof upper === "function" || !upper ? upper : d3plusCommon.accessor(upper);
          return this;
        } else return this._confidence;
      }
      /**
           @memberof Plot
           @desc If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.
           @param {Object} [*value*]
           @chainable
       */

    }, {
      key: "confidenceConfig",
      value: function confidenceConfig(_) {
        return arguments.length ? (this._confidenceConfig = d3plusCommon.assign(this._confidenceConfig, _), this) : this._confidenceConfig;
      }
      /**
          @memberof Plot
          @desc Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.
          @param {String} *value*
          @chainable
      */

    }, {
      key: "discrete",
      value: function discrete(_) {
        return arguments.length ? (this._discrete = _, this) : this._discrete;
      }
      /**
          @memberof Plot
          @desc When the width or height of the chart is less than or equal to this pixel value, the discrete axis will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "discreteCutoff",
      value: function discreteCutoff(_) {
        return arguments.length ? (this._discreteCutoff = _, this) : this._discreteCutoff;
      }
      /**
          @memberof Plot
          @desc Sets the pixel space between groups of bars.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "groupPadding",
      value: function groupPadding(_) {
        return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
      }
      /**
          @memberof Plot
          @desc A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "shapeSort",
      value: function shapeSort(_) {
        return arguments.length ? (this._shapeSort = _, this) : this._shapeSort;
      }
      /**
          @memberof Plot
          @desc Sets the size of bubbles to the given Number, data key, or function.
          @param {Function|Number|String} *value* = 10
          @chainable
      */

    }, {
      key: "size",
      value: function size(_) {
        return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
      }
      /**
          @memberof Plot
          @desc Sets the size scale maximum to the specified number.
          @param {Number} *value* = 20
          @chainable
      */

    }, {
      key: "sizeMax",
      value: function sizeMax(_) {
        return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
      }
      /**
          @memberof Plot
          @desc Sets the size scale minimum to the specified number.
          @param {Number} *value* = 5
          @chainable
      */

    }, {
      key: "sizeMin",
      value: function sizeMin(_) {
        return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
      }
      /**
          @memberof Plot
          @desc Sets the size scale to the specified string.
          @param {String} *value* = "sqrt"
          @chainable
      */

    }, {
      key: "sizeScale",
      value: function sizeScale(_) {
        return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
      }
      /**
          @memberof Plot
          @desc If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.
          @param {Boolean} *value* = false
          @chainable
      */

    }, {
      key: "stacked",
      value: function stacked(_) {
        return arguments.length ? (this._stacked = _, this) : this._stacked;
      }
      /**
          @memberof Plot
          @desc Sets the stack offset. If *value* is not specified, returns the current stack offset function.
          @param {Function|String} *value* = "descending"
          @chainable
      */

    }, {
      key: "stackOffset",
      value: function stackOffset(_) {
        return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape["stackOffset".concat(_.charAt(0).toUpperCase() + _.slice(1))], this) : this._stackOffset;
      }
      /**
          @memberof Plot
          @desc Sets the stack order. If *value* is not specified, returns the current stack order function.
          @param {Function|String|Array} *value* = "none"
          @chainable
      */

    }, {
      key: "stackOrder",
      value: function stackOrder(_) {
        if (arguments.length) {
          if (typeof _ === "string") this._stackOrder = _ === "ascending" ? stackOrderAscending : _ === "descending" ? stackOrderDescending : d3Shape["stackOrder".concat(_.charAt(0).toUpperCase() + _.slice(1))];else this._stackOrder = _;
          return this;
        } else return this._stackOrder;
      }
      /**
          @memberof Plot
          @desc Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.
          @param {Function|Number} *value*
          @chainable
      */

    }, {
      key: "x",
      value: function x(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._x = _;else {
            this._x = d3plusCommon.accessor(_);

            if (!this._aggs[_] && this._discrete === "x") {
              this._aggs[_] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }
          }
          return this;
        } else return this._x;
      }
      /**
           @memberof Plot
           @desc Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.
           @param {Function|Number} *value*
           @chainable
       */

    }, {
      key: "x2",
      value: function x2(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._x2 = _;else {
            this._x2 = d3plusCommon.accessor(_);

            if (!this._aggs[_] && this._discrete === "x") {
              this._aggs[_] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }
          }
          return this;
        } else return this._x2;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "xConfig",
      value: function xConfig(_) {
        return arguments.length ? (this._xConfig = d3plusCommon.assign(this._xConfig, _), this) : this._xConfig;
      }
      /**
          @memberof Plot
          @desc When the width of the chart is less than or equal to this pixel value, and the x-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "xCutoff",
      value: function xCutoff(_) {
        return arguments.length ? (this._xCutoff = _, this) : this._xCutoff;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "x2Config",
      value: function x2Config(_) {
        return arguments.length ? (this._x2Config = d3plusCommon.assign(this._x2Config, _), this) : this._x2Config;
      }
      /**
          @memberof Plot
          @desc Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
          @param {Array} *value*
          @chainable
      */

    }, {
      key: "xDomain",
      value: function xDomain(_) {
        return arguments.length ? (this._xDomain = _, this) : this._xDomain;
      }
      /**
           @memberof Plot
           @desc Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
           @param {Array} *value*
           @chainable
       */

    }, {
      key: "x2Domain",
      value: function x2Domain(_) {
        return arguments.length ? (this._x2Domain = _, this) : this._x2Domain;
      }
      /**
          @memberof Plot
          @desc Defines a custom sorting comparitor function to be used for discrete x axes.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "xSort",
      value: function xSort(_) {
        return arguments.length ? (this._xSort = _, this) : this._xSort;
      }
      /**
           @memberof Plot
           @desc Defines a custom sorting comparitor function to be used for discrete x2 axes.
           @param {Function} *value*
           @chainable
       */

    }, {
      key: "x2Sort",
      value: function x2Sort(_) {
        return arguments.length ? (this._x2Sort = _, this) : this._x2Sort;
      }
      /**
          @memberof Plot
          @desc Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.
          @param {Function|Number} *value*
          @chainable
      */

    }, {
      key: "y",
      value: function y(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._y = _;else {
            this._y = d3plusCommon.accessor(_);

            if (!this._aggs[_] && this._discrete === "y") {
              this._aggs[_] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }
          }
          return this;
        } else return this._y;
      }
      /**
           @memberof Plot
           @desc Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.
           @param {Function|Number} *value*
           @chainable
       */

    }, {
      key: "y2",
      value: function y2(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._y2 = _;else {
            this._y2 = d3plusCommon.accessor(_);

            if (!this._aggs[_] && this._discrete === "y2") {
              this._aggs[_] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }
          }
          return this;
        } else return this._y2;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
      *Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "yConfig",
      value: function yConfig(_) {
        if (arguments.length) {
          if (_.domain) _.domain = _.domain.slice().reverse();
          this._yConfig = d3plusCommon.assign(this._yConfig, _);
          return this;
        }

        return this._yConfig;
      }
      /**
          @memberof Plot
          @desc When the height of the chart is less than or equal to this pixel value, and the y-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "yCutoff",
      value: function yCutoff(_) {
        return arguments.length ? (this._yCutoff = _, this) : this._yCutoff;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "y2Config",
      value: function y2Config(_) {
        return arguments.length ? (this._y2Config = d3plusCommon.assign(this._y2Config, _), this) : this._y2Config;
      }
      /**
          @memberof Plot
          @desc Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
          @param {Array} *value*
          @chainable
      */

    }, {
      key: "yDomain",
      value: function yDomain(_) {
        return arguments.length ? (this._yDomain = _, this) : this._yDomain;
      }
      /**
           @memberof Plot
           @desc Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
           @param {Array} *value*
           @chainable
       */

    }, {
      key: "y2Domain",
      value: function y2Domain(_) {
        return arguments.length ? (this._y2Domain = _, this) : this._y2Domain;
      }
      /**
          @memberof Plot
          @desc Defines a custom sorting comparitor function to be used for discrete y axes.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "ySort",
      value: function ySort(_) {
        return arguments.length ? (this._ySort = _, this) : this._ySort;
      }
      /**
           @memberof Plot
           @desc Defines a custom sorting comparitor function to be used for discrete y2 axes.
           @param {Function} *value*
           @chainable
       */

    }, {
      key: "y2Sort",
      value: function y2Sort(_) {
        return arguments.length ? (this._y2Sort = _, this) : this._y2Sort;
      }
    }]);

    return Plot;
  }(d3plusViz.Viz);

  /**
      @class AreaPlot
      @extends Plot
      @desc Creates an area plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .baseline(0)
    .discrete("x")
    .shape("Area")
  */

  var AreaPlot =
  /*#__PURE__*/
  function (_Plot) {
    _inherits(AreaPlot, _Plot);

    /**
        @memberof AreaPlot
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function AreaPlot() {
      var _this;

      _classCallCheck(this, AreaPlot);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AreaPlot).call(this));
      _this._baseline = 0;
      _this._discrete = "x";
      _this._shape = d3plusCommon.constant("Area");

      _this.x("x");

      return _this;
    }

    return AreaPlot;
  }(Plot);

  /**
      @class BarChart
      @extends Plot
      @desc Creates a bar chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .baseline(0)
    .discrete("x")
    .shape("Bar")
  */

  var BarChart =
  /*#__PURE__*/
  function (_Plot) {
    _inherits(BarChart, _Plot);

    /**
        @memberof BarChart
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BarChart() {
      var _this;

      _classCallCheck(this, BarChart);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BarChart).call(this));
      _this._baseline = 0;
      _this._discrete = "x";
      _this._shape = d3plusCommon.constant("Bar");

      _this.x("x");

      return _this;
    }

    return BarChart;
  }(Plot);

  /**
      @class BoxWhisker
      @extends Plot
      @desc Creates a simple box and whisker based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Box")
  */

  var BoxWhisker =
  /*#__PURE__*/
  function (_Plot) {
    _inherits(BoxWhisker, _Plot);

    /**
        @memberof BoxWhisker
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BoxWhisker() {
      var _this;

      _classCallCheck(this, BoxWhisker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BoxWhisker).call(this));
      _this._discrete = "x";
      _this._shape = d3plusCommon.constant("Box");

      _this.x("x");

      _this._tooltipConfig = d3plusCommon.assign(_this._tooltipConfig, {
        title: function title(d, i) {
          if (!d) return "";

          while (d.__d3plus__ && d.data) {
            d = d.data;
            i = d.i;
          }

          if (_this._label) return _this._label(d, i);

          var l = _this._ids(d, i).slice(0, _this._drawDepth);

          return l[l.length - 1];
        }
      });
      return _this;
    }

    return BoxWhisker;
  }(Plot);

  /**
      @class BumpChart
      @extends Plot
      @desc Creates a bump chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Line")
    .x("x")
    .y2(d => this._y(d))
    .yConfig({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const startData = data.filter(d => d.x === xDomain[0]);
        const d = startData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .y2Config({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const endData = data.filter(d => d.x === xDomain[xDomain.length - 1]);
        const d = endData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .ySort((a, b) => b.y - a.y)
    .y2Sort((a, b) => b.y - a.y)
  */

  var BumpChart =
  /*#__PURE__*/
  function (_Plot) {
    _inherits(BumpChart, _Plot);

    /**
        @memberof BumpChart
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BumpChart() {
      var _this;

      _classCallCheck(this, BumpChart);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(BumpChart).call(this));
      _this._discrete = "x";
      _this._shape = d3plusCommon.constant("Line");

      _this.x("x");

      _this.y2(function (d) {
        return _this._y(d);
      });

      _this.yConfig({
        tickFormat: function tickFormat(val) {
          var data = _this._formattedData;
          var xMin = data[0].x instanceof Date ? data[0].x.getTime() : data[0].x;
          var startData = data.filter(function (d) {
            return (d.x instanceof Date ? d.x.getTime() : d.x) === xMin;
          });
          var d = startData.find(function (d) {
            return d.y === val;
          });
          return d ? _this._drawLabel(d, d.i) : "";
        }
      });

      _this.y2Config({
        tickFormat: function tickFormat(val) {
          var data = _this._formattedData;
          var xMax = data[data.length - 1].x instanceof Date ? data[data.length - 1].x.getTime() : data[data.length - 1].x;
          var endData = data.filter(function (d) {
            return (d.x instanceof Date ? d.x.getTime() : d.x) === xMax;
          });
          var d = endData.find(function (d) {
            return d.y === val;
          });
          return d ? _this._drawLabel(d, d.i) : "";
        }
      });

      _this.ySort(function (a, b) {
        return _this._y(b) - _this._y(a);
      });

      _this.y2Sort(function (a, b) {
        return _this._y(b) - _this._y(a);
      });

      return _this;
    }

    return BumpChart;
  }(Plot);

  /**
      @class LinePlot
      @extends Plot
      @desc Creates a line plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Line")
  */

  var LinePlot =
  /*#__PURE__*/
  function (_Plot) {
    _inherits(LinePlot, _Plot);

    /**
        @memberof LinePlot
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function LinePlot() {
      var _this;

      _classCallCheck(this, LinePlot);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LinePlot).call(this));
      _this._shape = d3plusCommon.constant("Line");
      return _this;
    }

    return LinePlot;
  }(Plot);

  var tau = Math.PI * 2;
  /**
      @class Radar
      @extends Viz
      @desc Creates a radar visualization based on an array of data.
  */

  var Radar =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Radar, _Viz);

    /**
        @memberof Radar
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Viz.
        @private
    */
    function Radar() {
      var _this;

      _classCallCheck(this, Radar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Radar).call(this));
      _this._axisConfig = {
        shapeConfig: {
          fill: d3plusCommon.constant("none"),
          labelConfig: {
            fontColor: "#000",
            padding: 0,
            textAnchor: function textAnchor(d, i, x) {
              return x.textAnchor;
            },
            verticalAlign: "middle"
          },
          stroke: "#ccc",
          strokeWidth: d3plusCommon.constant(1)
        }
      };
      _this._discrete = "metric";
      _this._levels = 6;
      _this._metric = d3plusCommon.accessor("metric");
      _this._outerPadding = 100;
      _this._shape = d3plusCommon.constant("Path");
      _this._value = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Radar, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Radar.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

        var radius = d3Array.min([height, width]) / 2 - this._outerPadding,
            transform = "translate(".concat(width / 2, ", ").concat(height / 2, ")");

        var nestedAxisData = d3Collection.nest().key(this._metric).entries(this._filteredData),
            nestedGroupData = d3Collection.nest().key(this._id).key(this._metric).entries(this._filteredData);
        var maxValue = d3Array.max(nestedGroupData.map(function (h) {
          return h.values.map(function (d) {
            return d3Array.sum(d.values, function (x, i) {
              return _this2._value(x, i);
            });
          });
        }).flat());
        var circularAxis = Array.from(Array(this._levels).keys()).map(function (d) {
          return {
            id: d,
            r: radius * ((d + 1) / _this2._levels)
          };
        });
        var circleConfig = d3plusCommon.configPrep.bind(this)(this._axisConfig.shapeConfig, "shape", "Circle");
        delete circleConfig.label;
        new shapes.Circle().data(circularAxis).select(d3plusCommon.elem("g.d3plus-Radar-radial-circles", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(circleConfig).render();
        var totalAxis = nestedAxisData.length;
        var polarAxis = nestedAxisData.map(function (d, i) {
          var width = _this2._outerPadding;
          var fontSize = _this2._shapeConfig.labelConfig.fontSize && _this2._shapeConfig.labelConfig.fontSize(d, i) || 11;
          var lineHeight = fontSize * 1.4;
          var height = lineHeight * 2;
          var padding = 10,
              quadrant = parseInt(360 - 360 / totalAxis * i / 90, 10) % 4 + 1,
              radians = tau / totalAxis * i;
          var angle = 360 / totalAxis * i;
          var textAnchor = "start";
          var x = padding;

          if (quadrant === 2 || quadrant === 3) {
            x = -width - padding;
            textAnchor = "end";
            angle += 180;
          }

          var labelBounds = {
            x: x,
            y: -height / 2,
            width: width,
            height: height
          };
          return {
            __d3plus__: true,
            data: d3plusCommon.merge(d.values),
            i: i,
            id: d.key,
            angle: angle,
            textAnchor: textAnchor,
            labelBounds: labelBounds,
            rotateAnchor: [-x, height / 2],
            x: radius * Math.cos(radians),
            y: radius * Math.sin(radians)
          };
        }).sort(function (a, b) {
          return a.key - b.key;
        });
        new shapes.Rect().data(polarAxis).rotate(function (d) {
          return d.angle || 0;
        }).width(0).height(0).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).label(function (d) {
          return d.id;
        }).labelBounds(function (d) {
          return d.labelBounds;
        }).labelConfig(this._axisConfig.shapeConfig.labelConfig).select(d3plusCommon.elem("g.d3plus-Radar-text", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render();
        new shapes.Path().data(polarAxis).d(function (d) {
          return "M".concat(0, ",", 0, " ", -d.x, ",").concat(-d.y);
        }).select(d3plusCommon.elem("g.d3plus-Radar-axis", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._axisConfig.shapeConfig, "shape", "Path")).render();
        var groupData = nestedGroupData.map(function (h) {
          var q = h.values.map(function (d, i) {
            var value = d3Array.sum(d.values, function (x, i) {
              return _this2._value(x, i);
            });
            var r = value / maxValue * radius,
                radians = tau / totalAxis * i;
            return {
              x: r * Math.cos(radians),
              y: r * Math.sin(radians)
            };
          });
          var d = "M ".concat(q[0].x, " ").concat(q[0].y, " ").concat(q.map(function (l) {
            return "L ".concat(l.x, " ").concat(l.y);
          }).join(" "), " L ").concat(q[0].x, " ").concat(q[0].y);
          return {
            arr: h.values.map(function (d) {
              return d3plusCommon.merge(d.values);
            }),
            id: h.key,
            points: q,
            d: d,
            __d3plus__: true,
            data: d3plusCommon.merge(h.values.map(function (d) {
              return d3plusCommon.merge(d.values);
            }))
          };
        });
        var pathConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path");
        var events = Object.keys(pathConfig.on);
        pathConfig.on = {};

        var _loop = function _loop(e) {
          var event = events[e];

          pathConfig.on[event] = function (d, i) {
            var x = d.points.map(function (p) {
              return p.x + width / 2;
            });
            var y = d.points.map(function (p) {
              return p.y + height / 2;
            });
            var cursor = d3Selection.mouse(_this2._select.node());
            var xDist = x.map(function (p) {
              return Math.abs(p - cursor[0]);
            });
            var yDist = y.map(function (p) {
              return Math.abs(p - cursor[1]);
            });
            var dists = xDist.map(function (d, i) {
              return d + yDist[i];
            });

            _this2._on[event].bind(_this2)(d.arr[dists.indexOf(d3Array.min(dists))], i);
          };
        };

        for (var e = 0; e < events.length; e++) {
          _loop(e);
        }

        this._shapes.push(new shapes.Path().data(groupData).d(function (d) {
          return d.d;
        }).select(d3plusCommon.elem("g.d3plus-Radar-items", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(pathConfig).render());

        return this;
      }
      /**
          @memberof Radar
          @desc Sets the config method used for the radial spokes, circles, and labels.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "axisConfig",
      value: function axisConfig(_) {
        return arguments.length ? (this._axisConfig = d3plusCommon.assign(this._axisConfig, _), this) : this._axisConfig;
      }
      /**
          @memberof Radar
          @desc Defines the value used as axis. If *value* is specified, sets the accessor to the specified metric function. If *value* is not specified, returns the current metric accessor.
          @param {Function|String} *value*
          @chainable
      */

    }, {
      key: "metric",
      value: function metric(_) {
        return arguments.length ? (this._metric = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._metric;
      }
      /**
          @memberof Radar
          @desc Determines how much pixel spaces to give the outer labels.
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "outerPadding",
      value: function outerPadding(_) {
        return arguments.length ? (this._outerPadding = _, this) : this._outerPadding;
      }
      /**
          @memberof Radar
          @desc If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.
          @param {Function|String} *value*
          @example
      function value(d) {
      return d.value;
      }
      */

    }, {
      key: "value",
      value: function value(_) {
        return arguments.length ? (this._value = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._value;
      }
    }]);

    return Radar;
  }(d3plusViz.Viz);

  /**
      @class StackedArea
      @extends Area
      @desc Creates a stacked area plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.AreaPlot()
    .stacked(true)
  */

  var StackedArea =
  /*#__PURE__*/
  function (_AreaPlot) {
    _inherits(StackedArea, _AreaPlot);

    /**
        @memberof StackedArea
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function StackedArea() {
      var _this;

      _classCallCheck(this, StackedArea);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(StackedArea).call(this));
      _this._stacked = true;
      return _this;
    }

    return StackedArea;
  }(AreaPlot);

  exports.AreaPlot = AreaPlot;
  exports.BarChart = BarChart;
  exports.BoxWhisker = BoxWhisker;
  exports.BumpChart = BumpChart;
  exports.LinePlot = LinePlot;
  exports.Plot = Plot;
  exports.Radar = Radar;
  exports.StackedArea = StackedArea;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-plot.js.map
