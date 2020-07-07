/*
  d3plus v2.0.0-alpha.29
  Data visualization made easy. A javascript library that extends the popular D3.js to enable fast and beautiful visualizations.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-export'), require('d3plus-geomap'), require('d3plus-format'), require('d3plus-hierarchy'), require('d3plus-legend'), require('d3plus-network'), require('d3plus-plot'), require('d3plus-priestley'), require('d3plus-shape'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus', ['exports', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-export', 'd3plus-geomap', 'd3plus-format', 'd3plus-hierarchy', 'd3plus-legend', 'd3plus-network', 'd3plus-plot', 'd3plus-priestley', 'd3plus-shape', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip', 'd3plus-viz'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3plusAxis, global.d3plusColor, global.d3plusCommon, global.d3plusExport, global.d3plusGeomap, global.d3plusFormat, global.d3plusHierarchy, global.d3plusLegend, global.d3plusNetwork, global.d3plusPlot, global.d3plusPriestley, global.d3plusShape, global.d3plusText, global.d3plusTimeline, global.d3plusTooltip, global.d3plusViz));
}(this, (function (exports, d3plusAxis, d3plusColor, d3plusCommon, d3plusExport, d3plusGeomap, d3plusFormat, d3plusHierarchy, d3plusLegend, d3plusNetwork, d3plusPlot, d3plusPriestley, d3plusShape, d3plusText, d3plusTimeline, d3plusTooltip, d3plusViz) { 'use strict';

  var version = "2.0.0-alpha.29";

  Object.defineProperty(exports, 'Axis', {
    enumerable: true,
    get: function () {
      return d3plusAxis.Axis;
    }
  });
  Object.defineProperty(exports, 'AxisBottom', {
    enumerable: true,
    get: function () {
      return d3plusAxis.AxisBottom;
    }
  });
  Object.defineProperty(exports, 'AxisLeft', {
    enumerable: true,
    get: function () {
      return d3plusAxis.AxisLeft;
    }
  });
  Object.defineProperty(exports, 'AxisRight', {
    enumerable: true,
    get: function () {
      return d3plusAxis.AxisRight;
    }
  });
  Object.defineProperty(exports, 'AxisTop', {
    enumerable: true,
    get: function () {
      return d3plusAxis.AxisTop;
    }
  });
  Object.defineProperty(exports, 'date', {
    enumerable: true,
    get: function () {
      return d3plusAxis.date;
    }
  });
  Object.defineProperty(exports, 'colorAdd', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorAdd;
    }
  });
  Object.defineProperty(exports, 'colorAssign', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorAssign;
    }
  });
  Object.defineProperty(exports, 'colorContrast', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorContrast;
    }
  });
  Object.defineProperty(exports, 'colorDefaults', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorDefaults;
    }
  });
  Object.defineProperty(exports, 'colorLegible', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorLegible;
    }
  });
  Object.defineProperty(exports, 'colorLighter', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorLighter;
    }
  });
  Object.defineProperty(exports, 'colorSubtract', {
    enumerable: true,
    get: function () {
      return d3plusColor.colorSubtract;
    }
  });
  Object.defineProperty(exports, 'BaseClass', {
    enumerable: true,
    get: function () {
      return d3plusCommon.BaseClass;
    }
  });
  Object.defineProperty(exports, 'RESET', {
    enumerable: true,
    get: function () {
      return d3plusCommon.RESET;
    }
  });
  Object.defineProperty(exports, 'accessor', {
    enumerable: true,
    get: function () {
      return d3plusCommon.accessor;
    }
  });
  Object.defineProperty(exports, 'assign', {
    enumerable: true,
    get: function () {
      return d3plusCommon.assign;
    }
  });
  Object.defineProperty(exports, 'attrize', {
    enumerable: true,
    get: function () {
      return d3plusCommon.attrize;
    }
  });
  Object.defineProperty(exports, 'closest', {
    enumerable: true,
    get: function () {
      return d3plusCommon.closest;
    }
  });
  Object.defineProperty(exports, 'configPrep', {
    enumerable: true,
    get: function () {
      return d3plusCommon.configPrep;
    }
  });
  Object.defineProperty(exports, 'constant', {
    enumerable: true,
    get: function () {
      return d3plusCommon.constant;
    }
  });
  Object.defineProperty(exports, 'elem', {
    enumerable: true,
    get: function () {
      return d3plusCommon.elem;
    }
  });
  Object.defineProperty(exports, 'findLocale', {
    enumerable: true,
    get: function () {
      return d3plusCommon.findLocale;
    }
  });
  Object.defineProperty(exports, 'isObject', {
    enumerable: true,
    get: function () {
      return d3plusCommon.isObject;
    }
  });
  Object.defineProperty(exports, 'merge', {
    enumerable: true,
    get: function () {
      return d3plusCommon.merge;
    }
  });
  Object.defineProperty(exports, 'parseSides', {
    enumerable: true,
    get: function () {
      return d3plusCommon.parseSides;
    }
  });
  Object.defineProperty(exports, 'prefix', {
    enumerable: true,
    get: function () {
      return d3plusCommon.prefix;
    }
  });
  Object.defineProperty(exports, 'stylize', {
    enumerable: true,
    get: function () {
      return d3plusCommon.stylize;
    }
  });
  Object.defineProperty(exports, 'unique', {
    enumerable: true,
    get: function () {
      return d3plusCommon.unique;
    }
  });
  Object.defineProperty(exports, 'uuid', {
    enumerable: true,
    get: function () {
      return d3plusCommon.uuid;
    }
  });
  Object.defineProperty(exports, 'dom2canvas', {
    enumerable: true,
    get: function () {
      return d3plusExport.dom2canvas;
    }
  });
  Object.defineProperty(exports, 'saveElement', {
    enumerable: true,
    get: function () {
      return d3plusExport.saveElement;
    }
  });
  Object.defineProperty(exports, 'Geomap', {
    enumerable: true,
    get: function () {
      return d3plusGeomap.Geomap;
    }
  });
  Object.defineProperty(exports, 'formatAbbreviate', {
    enumerable: true,
    get: function () {
      return d3plusFormat.formatAbbreviate;
    }
  });
  Object.defineProperty(exports, 'formatLocale', {
    enumerable: true,
    get: function () {
      return d3plusFormat.formatLocale;
    }
  });
  Object.defineProperty(exports, 'Donut', {
    enumerable: true,
    get: function () {
      return d3plusHierarchy.Donut;
    }
  });
  Object.defineProperty(exports, 'Pack', {
    enumerable: true,
    get: function () {
      return d3plusHierarchy.Pack;
    }
  });
  Object.defineProperty(exports, 'Pie', {
    enumerable: true,
    get: function () {
      return d3plusHierarchy.Pie;
    }
  });
  Object.defineProperty(exports, 'Tree', {
    enumerable: true,
    get: function () {
      return d3plusHierarchy.Tree;
    }
  });
  Object.defineProperty(exports, 'Treemap', {
    enumerable: true,
    get: function () {
      return d3plusHierarchy.Treemap;
    }
  });
  Object.defineProperty(exports, 'ColorScale', {
    enumerable: true,
    get: function () {
      return d3plusLegend.ColorScale;
    }
  });
  Object.defineProperty(exports, 'Legend', {
    enumerable: true,
    get: function () {
      return d3plusLegend.Legend;
    }
  });
  Object.defineProperty(exports, 'ckmeans', {
    enumerable: true,
    get: function () {
      return d3plusLegend.ckmeans;
    }
  });
  Object.defineProperty(exports, 'Network', {
    enumerable: true,
    get: function () {
      return d3plusNetwork.Network;
    }
  });
  Object.defineProperty(exports, 'Rings', {
    enumerable: true,
    get: function () {
      return d3plusNetwork.Rings;
    }
  });
  Object.defineProperty(exports, 'Sankey', {
    enumerable: true,
    get: function () {
      return d3plusNetwork.Sankey;
    }
  });
  Object.defineProperty(exports, 'AreaPlot', {
    enumerable: true,
    get: function () {
      return d3plusPlot.AreaPlot;
    }
  });
  Object.defineProperty(exports, 'BarChart', {
    enumerable: true,
    get: function () {
      return d3plusPlot.BarChart;
    }
  });
  Object.defineProperty(exports, 'BoxWhisker', {
    enumerable: true,
    get: function () {
      return d3plusPlot.BoxWhisker;
    }
  });
  Object.defineProperty(exports, 'BumpChart', {
    enumerable: true,
    get: function () {
      return d3plusPlot.BumpChart;
    }
  });
  Object.defineProperty(exports, 'LinePlot', {
    enumerable: true,
    get: function () {
      return d3plusPlot.LinePlot;
    }
  });
  Object.defineProperty(exports, 'Plot', {
    enumerable: true,
    get: function () {
      return d3plusPlot.Plot;
    }
  });
  Object.defineProperty(exports, 'Radar', {
    enumerable: true,
    get: function () {
      return d3plusPlot.Radar;
    }
  });
  Object.defineProperty(exports, 'StackedArea', {
    enumerable: true,
    get: function () {
      return d3plusPlot.StackedArea;
    }
  });
  Object.defineProperty(exports, 'Priestley', {
    enumerable: true,
    get: function () {
      return d3plusPriestley.Priestley;
    }
  });
  Object.defineProperty(exports, 'Area', {
    enumerable: true,
    get: function () {
      return d3plusShape.Area;
    }
  });
  Object.defineProperty(exports, 'Bar', {
    enumerable: true,
    get: function () {
      return d3plusShape.Bar;
    }
  });
  Object.defineProperty(exports, 'Box', {
    enumerable: true,
    get: function () {
      return d3plusShape.Box;
    }
  });
  Object.defineProperty(exports, 'Circle', {
    enumerable: true,
    get: function () {
      return d3plusShape.Circle;
    }
  });
  Object.defineProperty(exports, 'Image', {
    enumerable: true,
    get: function () {
      return d3plusShape.Image;
    }
  });
  Object.defineProperty(exports, 'Line', {
    enumerable: true,
    get: function () {
      return d3plusShape.Line;
    }
  });
  Object.defineProperty(exports, 'Path', {
    enumerable: true,
    get: function () {
      return d3plusShape.Path;
    }
  });
  Object.defineProperty(exports, 'Rect', {
    enumerable: true,
    get: function () {
      return d3plusShape.Rect;
    }
  });
  Object.defineProperty(exports, 'Shape', {
    enumerable: true,
    get: function () {
      return d3plusShape.Shape;
    }
  });
  Object.defineProperty(exports, 'Whisker', {
    enumerable: true,
    get: function () {
      return d3plusShape.Whisker;
    }
  });
  Object.defineProperty(exports, 'largestRect', {
    enumerable: true,
    get: function () {
      return d3plusShape.largestRect;
    }
  });
  Object.defineProperty(exports, 'lineIntersection', {
    enumerable: true,
    get: function () {
      return d3plusShape.lineIntersection;
    }
  });
  Object.defineProperty(exports, 'path2polygon', {
    enumerable: true,
    get: function () {
      return d3plusShape.path2polygon;
    }
  });
  Object.defineProperty(exports, 'pointDistance', {
    enumerable: true,
    get: function () {
      return d3plusShape.pointDistance;
    }
  });
  Object.defineProperty(exports, 'pointDistanceSquared', {
    enumerable: true,
    get: function () {
      return d3plusShape.pointDistanceSquared;
    }
  });
  Object.defineProperty(exports, 'pointRotate', {
    enumerable: true,
    get: function () {
      return d3plusShape.pointRotate;
    }
  });
  Object.defineProperty(exports, 'polygonInside', {
    enumerable: true,
    get: function () {
      return d3plusShape.polygonInside;
    }
  });
  Object.defineProperty(exports, 'polygonRayCast', {
    enumerable: true,
    get: function () {
      return d3plusShape.polygonRayCast;
    }
  });
  Object.defineProperty(exports, 'polygonRotate', {
    enumerable: true,
    get: function () {
      return d3plusShape.polygonRotate;
    }
  });
  Object.defineProperty(exports, 'segmentBoxContains', {
    enumerable: true,
    get: function () {
      return d3plusShape.segmentBoxContains;
    }
  });
  Object.defineProperty(exports, 'segmentsIntersect', {
    enumerable: true,
    get: function () {
      return d3plusShape.segmentsIntersect;
    }
  });
  Object.defineProperty(exports, 'shapeEdgePoint', {
    enumerable: true,
    get: function () {
      return d3plusShape.shapeEdgePoint;
    }
  });
  Object.defineProperty(exports, 'simplify', {
    enumerable: true,
    get: function () {
      return d3plusShape.simplify;
    }
  });
  Object.defineProperty(exports, 'TextBox', {
    enumerable: true,
    get: function () {
      return d3plusText.TextBox;
    }
  });
  Object.defineProperty(exports, 'fontExists', {
    enumerable: true,
    get: function () {
      return d3plusText.fontExists;
    }
  });
  Object.defineProperty(exports, 'rtl', {
    enumerable: true,
    get: function () {
      return d3plusText.rtl;
    }
  });
  Object.defineProperty(exports, 'stringify', {
    enumerable: true,
    get: function () {
      return d3plusText.stringify;
    }
  });
  Object.defineProperty(exports, 'strip', {
    enumerable: true,
    get: function () {
      return d3plusText.strip;
    }
  });
  Object.defineProperty(exports, 'textSplit', {
    enumerable: true,
    get: function () {
      return d3plusText.textSplit;
    }
  });
  Object.defineProperty(exports, 'textWidth', {
    enumerable: true,
    get: function () {
      return d3plusText.textWidth;
    }
  });
  Object.defineProperty(exports, 'textWrap', {
    enumerable: true,
    get: function () {
      return d3plusText.textWrap;
    }
  });
  Object.defineProperty(exports, 'titleCase', {
    enumerable: true,
    get: function () {
      return d3plusText.titleCase;
    }
  });
  Object.defineProperty(exports, 'trim', {
    enumerable: true,
    get: function () {
      return d3plusText.trim;
    }
  });
  Object.defineProperty(exports, 'trimLeft', {
    enumerable: true,
    get: function () {
      return d3plusText.trimLeft;
    }
  });
  Object.defineProperty(exports, 'trimRight', {
    enumerable: true,
    get: function () {
      return d3plusText.trimRight;
    }
  });
  Object.defineProperty(exports, 'Timeline', {
    enumerable: true,
    get: function () {
      return d3plusTimeline.Timeline;
    }
  });
  Object.defineProperty(exports, 'Tooltip', {
    enumerable: true,
    get: function () {
      return d3plusTooltip.Tooltip;
    }
  });
  Object.defineProperty(exports, 'Viz', {
    enumerable: true,
    get: function () {
      return d3plusViz.Viz;
    }
  });
  Object.defineProperty(exports, 'dataConcat', {
    enumerable: true,
    get: function () {
      return d3plusViz.dataConcat;
    }
  });
  Object.defineProperty(exports, 'dataFold', {
    enumerable: true,
    get: function () {
      return d3plusViz.dataFold;
    }
  });
  Object.defineProperty(exports, 'dataLoad', {
    enumerable: true,
    get: function () {
      return d3plusViz.dataLoad;
    }
  });
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus.js.map
