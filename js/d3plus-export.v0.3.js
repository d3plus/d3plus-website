/*
  d3plus-export v0.3.19
  Export methods for transforming and downloading SVG.
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
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
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

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
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

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
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
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

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
	var functionBindContext = function (fn, that, length) {
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
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

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
	    var boundFunction = functionBindContext(callbackfn, that, 3);
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

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $find = arrayIteration.find;



	var FIND = 'find';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $includes = arrayIncludes.includes;



	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$1 }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var nativeAssign = Object.assign;
	var defineProperty$1 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$1({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$1(this, 'b', {
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
	    try {
	      if (typeof SVGElement === 'undefined' || Boolean(SVGElement.prototype.innerHTML)) {
	        return;
	      }
	    } catch (e) {
	        return;
	    }

	    function serializeNode (node) {
	      switch (node.nodeType) {
	        case 1:
	          return serializeElementNode(node);
	        case 3:
	          return serializeTextNode(node);
	        case 8:
	          return serializeCommentNode(node);
	      }
	    }

	    function serializeTextNode (node) {
	        return node.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	    }

	    function serializeCommentNode (node) {
	        return '<!--' + node.nodeValue + '-->'
	    }

	    function serializeElementNode (node) {
	        var output = '';

	        output += '<' + node.tagName;

	        if (node.hasAttributes()) {
	            [].forEach.call(node.attributes, function(attrNode) {
	                output += ' ' + attrNode.name + '="' + attrNode.value + '"';
	            });
	        }

	        output += '>';

	        if (node.hasChildNodes()) {
	            [].forEach.call(node.childNodes, function(childNode) {
	                output += serializeNode(childNode);
	            });
	        }

	        output += '</' + node.tagName + '>';

	        return output;
	    }

	    Object.defineProperty(SVGElement.prototype, 'innerHTML', {
	      get: function () {
	        var output = '';

	        [].forEach.call(this.childNodes, function(childNode) {
	            output += serializeNode(childNode);
	        });

	        return output;
	      },
	      set: function (markup) {
	        while (this.firstChild) {
	          this.removeChild(this.firstChild);
	        }

	        try {
	          var dXML = new DOMParser();
	          dXML.async = false;

	          var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markup + '</svg>';
	          var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;

	          [].forEach.call(svgDocElement.childNodes, function(childNode) {
	              this.appendChild(this.ownerDocument.importNode(childNode, true));
	          }.bind(this));
	        } catch (e) {
	            throw new Error('Error parsing markup string');
	        }
	      }
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('html2canvas'), require('canvg-browser'), require('d3-selection'), require('canvas-toBlob'), require('file-saver')) :
  typeof define === 'function' && define.amd ? define('d3plus-export', ['exports', 'html2canvas', 'canvg-browser', 'd3-selection', 'canvas-toBlob', 'file-saver'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.html2canvas, global.canvg, global.d3Selection, null, global.fileSaver));
}(this, (function (exports, html2canvas, canvg, d3Selection, canvasToBlob, fileSaver) { 'use strict';

  html2canvas = html2canvas && Object.prototype.hasOwnProperty.call(html2canvas, 'default') ? html2canvas['default'] : html2canvas;
  canvg = canvg && Object.prototype.hasOwnProperty.call(canvg, 'default') ? canvg['default'] : canvg;

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
      @function svgPresets
      @desc Adds SVG default attributes to a d3 selection in order to render it properly.
      @param {Selection} selection
  */
  function svgPresets (selection) {
    // sets "stroke-width" attribute to `0` if not defined
    var strokeWidth = selection.attr("stroke-width");
    selection.attr("stroke-width", !strokeWidth ? 0 : strokeWidth); // if there is no stroke, set the stroke color to "transparent" (fixes weird text rendering)

    if (!strokeWidth) selection.attr("stroke", "transparent"); // sets "fill-opacity" attribute to `0` if fill is "transparent" or "none"

    var transparent = ["none", "transparent"].includes(selection.attr("fill"));
    var fillOpacity = selection.attr("fill-opacity");
    selection.attr("fill-opacity", transparent ? 0 : fillOpacity); // "aria-label" properties interfere with text labels ¯\_(ツ)_/¯

    selection.attr("aria-label", null);
  }

  /**
      @function htmlPresets
      @desc Adds HTML default styles to a d3 selection in order to render it properly.
      @param {Selection} selection
  */

  function htmlPresets (selection) {
    selection.selectAll("*").each(function () {
      var tag = this.tagName.toLowerCase();

      if (!["option"].includes(tag)) {
        var elem = d3Selection.select(this);
        /* forces minor unnoticible letter-spacing on any element where it is not defined to fix IE */

        var letterSpacing = elem.style("letter-spacing");
        elem.style("letter-spacing", letterSpacing === "normal" ? "0.1px" : letterSpacing);
      }
    });
  }

  var defaultOptions = {
    background: false,
    callback: function callback() {},
    exclude: [],
    padding: 0,
    scale: 1
  };
  var canvgOptions = {
    ignoreMouse: true,
    ignoreAnimation: true,
    ignoreDimensions: true,
    ignoreClear: true
  };
  /**
      @function parseTransform
      @desc Extracts scale, x, and y position from an elements "transform" attribute, respecting cross-browser render differences.
      @param {HTMLElement} elem The element to be analyzed.
      @private
  */

  function parseTransform(elem) {
    var property = d3Selection.select(elem).attr("transform");
    var scale = 1,
        x = 0,
        y = 0;

    if (property) {
      scale = property.match(/scale\(([^a-z]+)\)/i);
      if (scale) scale = parseFloat(scale[1]);else scale = 1;
      var translate = property.match(/translate\(([^a-z]+)\)/i);

      if (translate) {
        var _translate$1$replace$ = translate[1].replace(", ", ",").replace(/([^a-z]),*\s([^a-z])/gi, "$1,$2").split(",").map(function (d) {
          return parseFloat(d) * scale;
        });

        var _translate$1$replace$2 = _slicedToArray(_translate$1$replace$, 2);

        x = _translate$1$replace$2[0];
        y = _translate$1$replace$2[1];
      }
    }

    return [scale, x, y];
  }
  /**
      @function dom2canvas
      @desc Renders HTML/SVG elements to a shared canvas.
      @param {HTMLElement|Object|Array} elem The element or array of elements to be rendered to a single canvas. Additionally, a complex object can be passed as an element which can contain specific other properties.
      @param {Number} [elem.x] The x offset of the element within the rendered canvas.
      @param {Number} [elem.y] The y offset of the element within the rendered canvas.
      @param {Object} [options] Additional options to specify.
      @param {String} [options.background] Background color of the rendered canvas.
      @param {Function} [options.callback] Callback function to be passed the canvas element after rendering.
      @param {HTMLElement} [options.canvas] A canvas DOM element to draw onto. If no element is supplied, a canvas element will be created in memory and passed to the callback function when drawing is complete.
      @param {Array} [options.excludes] An array of HTMLElement objects to be excluded from the render.
      @param {Number} [options.height] Pixel height for the final output. If a height value has not been passed, it will be inferred from the sizing of the first DOM element passed.
      @param {Number} [options.padding = 0] Outer padding for the final file.
      @param {Number} [options.scale = 1] Scale for the final file.
      @param {Number} [options.width] Pixel width for the final output. If a width value has not been passed, it will be inferred from the sizing of the first DOM element passed.
  */


  function dom2canvas (elem, options) {
    if (!elem) return;
    if (!(elem instanceof Array)) elem = [elem];
    options = Object.assign({}, defaultOptions, options);
    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);
    var ratio = window ? window.devicePixelRatio || 1 : 1;
    var reference = elem[0];
    if (reference.constructor === Object) reference = reference.element;
    var height = options.height || parseFloat(d3Selection.select(reference).style("height")) + parseFloat(d3Selection.select(reference).style("padding-top")) + parseFloat(d3Selection.select(reference).style("padding-bottom")),
        width = options.width || parseFloat(d3Selection.select(reference).style("width")) + parseFloat(d3Selection.select(reference).style("padding-left")) + parseFloat(d3Selection.select(reference).style("padding-right"));
    var layerX,
        layerY,
        offsetX = 0,
        offsetY = 0;

    if (reference.getBoundingClientRect) {
      var bounds = reference.getBoundingClientRect();
      offsetX = bounds.left;
      offsetY = bounds.top;
    } else {
      offsetX = reference.offsetLeft;
      offsetY = reference.offsetTop;
    }

    var canvas = options.canvas || document.createElement("canvas");
    canvas.width = (width + options.padding * 2) * options.scale * ratio;
    canvas.height = (height + options.padding * 2) * options.scale * ratio;
    canvas.style.width = (width + options.padding * 2) * options.scale;
    canvas.style.height = (height + options.padding * 2) * options.scale;
    var context = canvas.getContext("2d");
    context.scale(options.scale * ratio, options.scale * ratio);
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);

    if (options.background) {
      context.beginPath();
      context.rect(0, 0, canvas.width / ratio, canvas.height / ratio);
      context.fillStyle = options.background;
      context.fill();
    }

    var layers = [];
    /**
     * Determines how a given DOM element should be rendered.
     * @param {Object} trans ancestral transform properties
     * @private
     */

    function checkRender(trans) {
      var tag = (this.tagName || "").toLowerCase();
      if (options.exclude.includes(this) || tag === "foreignobject") return;
      var transform = Object.assign({}, trans); // strips translate and scale from transform property

      if (this.tagName) {
        var opacity = d3Selection.select(this).attr("opacity") || d3Selection.select(this).style("opacity");
        var display = d3Selection.select(this).style("display");
        var visibility = d3Selection.select(this).style("visibility");
        if (display === "none" || visibility === "hidden" || opacity && parseFloat(opacity) === 0) return;

        var _tag = this.tagName.toLowerCase();

        if (_tag.length && ["defs", "title", "desc"].includes(_tag)) return;

        if (_tag === "svg") {
          // do not perform this transform for SVGs nested within other SVGs
          if (!transform.svg) {
            var _this$getBoundingClie = this.getBoundingClientRect(),
                left = _this$getBoundingClie.left,
                top = _this$getBoundingClie.top;

            transform.x += left - offsetX;
            transform.y += top - offsetY;
            transform.svg = true;
          }

          var x = d3Selection.select(this).attr("x");
          x = x ? parseFloat(x) * transform.scale : 0;
          transform.x += x;
          var y = d3Selection.select(this).attr("y");
          y = y ? parseFloat(y) * transform.scale : 0;
          transform.y += y;
          transform.clip = {
            height: parseFloat(d3Selection.select(this).attr("height") || d3Selection.select(this).style("height")),
            width: parseFloat(d3Selection.select(this).attr("width") || d3Selection.select(this).style("width")),
            x: x,
            y: y
          };
        } else {
          var _x = d3Selection.select(this).attr("x");

          if (_x) transform.x += parseFloat(_x) * transform.scale;

          var _y = d3Selection.select(this).attr("y");

          if (_y) transform.y += parseFloat(_y) * transform.scale;
        }
      }

      if (!tag.length) {
        var test = (this.wholeText || "").replace(/\s/g, "");

        if (test.length) {
          var text = this.nodeValue.replace(/^\s*/, "").replace(/^\n/, "").replace(/^\s*/, "").replace(/\n$/, "").replace(/\s*$/, "").replace(/\n$/, "");
          layers.push({
            type: "text",
            style: this.parentNode,
            value: text,
            x: transform.x,
            y: transform.y
          });
        }
      } else if (tag === "text") {
        var _elem = this.cloneNode(true);

        d3Selection.select(_elem).call(svgPresets);
        layers.push(Object.assign({}, transform, {
          type: "svg",
          value: _elem
        }));
      } else if (["image", "img"].includes(tag)) {
        var url = d3Selection.select(this).attr("href") || d3Selection.select(this).attr("xlink:href");

        if (url.length) {
          var h = parseFloat(d3Selection.select(this).attr("height")) * transform.scale,
              w = parseFloat(d3Selection.select(this).attr("width")) * transform.scale;
          var data = {
            clip: transform.clip,
            height: h,
            loaded: false,
            type: "img",
            width: w,
            x: transform.x,
            y: transform.y
          };
          layers.push(data);
          var img = new Image();
          img.crossOrigin = "Anonymous";

          img.onload = function () {
            var canvas2 = document.createElement("canvas");
            var ctx2 = canvas2.getContext("2d");
            canvas2.height = h * ratio;
            canvas2.width = w * ratio;
            ctx2.drawImage(this, 0, 0, w * ratio, h * ratio);
            var himg = document.createElement("img");
            himg.src = canvas2.toDataURL("image/png");
            data.value = himg;
            data.loaded = true;
          };

          img.onerror = function () {
            data.loaded = true;
            data.value = false;
          };

          img.src = url;
        }
      } else if (!["svg", "g", "text"].includes(tag) && !d3Selection.select(this).selectAll("svg").size()) {
        var s = options.scale * ratio;
        var _data = {
          height: Math.floor(height + options.padding * 2 + offsetY),
          loaded: false,
          type: "html",
          width: Math.floor(width + options.padding * 2 + offsetX),
          x: Math.floor(layerX - offsetX),
          y: Math.floor(layerY - offsetY)
        };
        var tempCanvas = document.createElement("canvas");
        tempCanvas.width = _data.width * s;
        tempCanvas.height = _data.height * s;
        tempCanvas.style.width = "".concat(_data.width * s, "px");
        tempCanvas.style.height = "".concat(_data.height * s, "px");
        var tempContext = tempCanvas.getContext("2d");
        tempContext.scale(s, s);
        layers.push(_data);
        htmlPresets(d3Selection.select(this));
        html2canvas(this, {
          allowTaint: true,
          canvas: tempCanvas,
          letterRendering: true
        }).then(function (c) {
          _data.value = c;
          _data.loaded = true;
        });
      } else if (tag !== "svg" && this.childNodes.length > 0 && !d3Selection.select(this).selectAll("image, img, svg").size()) {
        var _elem2 = this.cloneNode(true);

        d3Selection.select(_elem2).selectAll("*").each(function () {
          d3Selection.select(this).call(svgPresets);
          if (d3Selection.select(this).attr("opacity") === "0") this.parentNode.removeChild(this);
        });
        layers.push(Object.assign({}, transform, {
          type: "svg",
          value: _elem2,
          tag: tag
        }));
      } else if (this.childNodes.length > 0) {
        var _parseTransform = parseTransform(this),
            _parseTransform2 = _slicedToArray(_parseTransform, 3),
            scale = _parseTransform2[0],
            _x2 = _parseTransform2[1],
            _y2 = _parseTransform2[2];

        transform.scale *= scale;
        transform.x += _x2;
        transform.y += _y2;
        checkChildren(this, transform);
      } else {
        // catches all SVG shapes
        var _elem3 = this.cloneNode(true);

        d3Selection.select(_elem3).selectAll("*").each(function () {
          if (d3Selection.select(this).attr("opacity") === "0") this.parentNode.removeChild(this);
        });

        if (tag === "line") {
          d3Selection.select(_elem3).attr("x1", parseFloat(d3Selection.select(_elem3).attr("x1")) + transform.x);
          d3Selection.select(_elem3).attr("x2", parseFloat(d3Selection.select(_elem3).attr("x2")) + transform.x);
          d3Selection.select(_elem3).attr("y1", parseFloat(d3Selection.select(_elem3).attr("y1")) + transform.y);
          d3Selection.select(_elem3).attr("y2", parseFloat(d3Selection.select(_elem3).attr("y2")) + transform.y);
        } else if (tag === "path") {
          var _parseTransform3 = parseTransform(_elem3),
              _parseTransform4 = _slicedToArray(_parseTransform3, 3),
              _scale = _parseTransform4[0],
              _x3 = _parseTransform4[1],
              _y3 = _parseTransform4[2];

          if (d3Selection.select(_elem3).attr("transform")) d3Selection.select(_elem3).attr("transform", "scale(".concat(_scale, ")translate(").concat(_x3 + transform.x, ",").concat(_y3 + transform.y, ")"));
        }

        d3Selection.select(_elem3).call(svgPresets);
        var fill = d3Selection.select(_elem3).attr("fill");
        var defFill = fill && fill.indexOf("url") === 0; // if (defFill) select(elem).attr("fill-opacity", 0);

        layers.push(Object.assign({}, transform, {
          type: "svg",
          value: _elem3,
          tag: tag
        }));

        if (defFill) {
          var def = d3Selection.select(fill.slice(4, -1)).node().cloneNode(true);
          var defTag = (def.tagName || "").toLowerCase();

          if (defTag === "pattern") {
            var _parseTransform5 = parseTransform(_elem3),
                _parseTransform6 = _slicedToArray(_parseTransform5, 3),
                _scale2 = _parseTransform6[0],
                _x4 = _parseTransform6[1],
                _y4 = _parseTransform6[2];

            transform.scale *= _scale2;
            transform.x += _x4;
            transform.y += _y4;
            checkChildren(def, transform);
          }
        }
      }
    }
    /**
     * Performs "checkRender" on all childNodes of a DOM element (used recursively by checkRender)
     * @param {HTMLElement} e DOM node to traverse
     * @param {Object} trans ancestral transform properties
     * @private
     */


    function checkChildren(e, trans) {
      d3Selection.selectAll(e.childNodes).each(function () {
        checkRender.bind(this)(trans);
      });
    }

    for (var i = 0; i < elem.length; i++) {
      var e = elem[i],
          _options = {
        scale: 1,
        x: 0,
        y: 0,
        svg: false
      };

      if (e.constructor === Object) {
        _options = Object.assign(_options, e);
        e = e.element;
      }

      layerX = _options.x;
      layerY = _options.y;
      checkRender.bind(e)(_options);
    }
    /**
     * Checks the status of each render layer every 500ms, and finishes render once all are complete.
     * @private
     */


    function checkStatus() {
      var allDone = true;

      for (var _i = 0; _i < layers.length; _i++) {
        if (layers[_i].loaded === false) {
          allDone = false;
          break;
        }
      }

      if (allDone) finish();else setTimeout(checkStatus, 500);
    }

    checkStatus();
    /**
     * Finishes the render after all layers have been rendered to canvas.
     * @private
     */

    function finish() {
      for (var _i2 = 0; _i2 < layers.length; _i2++) {
        var layer = layers[_i2];
        var clip = layer.clip || {
          height: height,
          width: width,
          x: 0,
          y: 0
        };

        switch (layer.type) {
          case "img":
            if (layer.value) {
              context.save();
              context.beginPath();
              context.translate(options.padding + clip.x, options.padding + clip.y);
              context.rect(0, 0, clip.width, clip.height);
              context.clip();
              context.drawImage(layer.value, layer.x + clip.x, layer.y + clip.y, layer.width, layer.height);
              context.restore();
            }

            break;

          case "html":
            context.save();
            context.beginPath();
            context.translate(options.padding, options.padding);
            context.drawImage(layer.value, layer.x, layer.y, layer.width, layer.height);
            context.restore();
            break;

          case "text":
            var parent = d3Selection.select(layer.style);
            var title = layer.value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            var fC = parent.style("color"),
                fS = parent.style("font-size");
            var fF = parent.style("font-family").split(",")[0];
            if (fF.indexOf("'") !== 0) fF = "'".concat(fF, "'");
            var text = "<text stroke='none' dy='".concat(fS, "' fill='").concat(fC, "' font-family=").concat(fF, " font-size='").concat(fS, "'>").concat(title, "</text>");
            context.save();
            context.translate(options.padding, options.padding);
            canvg(canvas, text, Object.assign({}, canvgOptions, {
              offsetX: layer.x,
              offsetY: layer.y
            }));
            context.restore();
            break;

          case "svg":
            var outer = IE ? new XMLSerializer().serializeToString(layer.value) : layer.value.outerHTML;
            context.save();
            context.translate(options.padding + clip.x + layer.x, options.padding + clip.y + layer.y);
            context.rect(0, 0, clip.width, clip.height);
            context.clip();
            canvg(canvas, outer, Object.assign({}, canvgOptions, {
              offsetX: layer.x + clip.x,
              offsetY: layer.y + clip.y
            }));
            context.restore();
            break;

          default:
            console.warn("uncaught", layer);
            break;
        }
      }

      options.callback(canvas);
    }
  }

  var defaultOptions$1 = {
    filename: "download",
    type: "png"
  };
  /**
      @function saveElement
      @desc Downloads an HTML Element as a bitmap PNG image.
      @param {HTMLElement|Array} elem A single element or array of elements to be saved to one file.
      @param {Object} [options] Additional options to specify.
      @param {String} [options.filename = "download"] Filename for the downloaded file, without the extension.
      @param {String} [options.type = "png"] File type of the saved document. Accepted values are `"png"` and `"jpg"`.
      @param {Object} [renderOptions] Custom options to be passed to the dom2canvas function.
  */

  function saveElement (elem) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var renderOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!elem) return;
    options = Object.assign({}, defaultOptions$1, options);
    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);

    if (!(elem instanceof Array) && options.type === "svg") {
      var outer = IE ? new XMLSerializer().serializeToString(elem) : elem.outerHTML;
      fileSaver.saveAs(new Blob([outer], {
        type: "application/svg+xml"
      }), "".concat(options.filename, ".svg"));
    }

    dom2canvas(elem, Object.assign({}, renderOptions, {
      callback: function callback(canvas) {
        if (renderOptions.callback) renderOptions.callback(canvas);

        if (["jpg", "png"].includes(options.type)) {
          canvas.toBlob(function (blob) {
            return fileSaver.saveAs(blob, "".concat(options.filename, ".").concat(options.type));
          });
        } // else if (options.type === "pdf") {
        //   const outputHeight = 11,
        //         outputWidth = 8.5;
        //   const aspect = canvas.width / canvas.height,
        //         orientation = aspect > 1 ? "landscape" : "portrait";
        //   const pdf = new JsPDF({
        //     orientation,
        //     unit: "in",
        //     format: [outputWidth, outputHeight]
        //   });
        //   let h = orientation === "landscape" ? outputWidth : outputHeight,
        //       left,
        //       top,
        //       w = orientation === "landscape" ? outputHeight : outputWidth;
        //   const margin = 0.5;
        //   if (aspect < w / h) {
        //     h -= margin * 2;
        //     const tempWidth = h * aspect;
        //     top = margin;
        //     left = (w - tempWidth) / 2;
        //     w = tempWidth;
        //   }
        //   else {
        //     w -= margin * 2;
        //     const tempHeight = w / aspect;
        //     left = margin;
        //     top = (h - tempHeight) / 2;
        //     h = tempHeight;
        //   }
        //   pdf.addImage(canvas, "canvas", left, top, w, h);
        //   pdf.save(options.filename);
        // }

      }
    }));
  }

  exports.dom2canvas = dom2canvas;
  exports.saveElement = saveElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-export.js.map
