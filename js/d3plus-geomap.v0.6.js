/*
  d3plus-geomap v0.6.13
  A reusable geo map built on D3 and Topojson
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
	  version: '3.3.3',
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
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

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

	var Symbol$1 = global_1.Symbol;
	var store$2 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$2[name] || (store$2[name] = nativeSymbol && Symbol$1[name]
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

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

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

})));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-color'), require('d3-zoom'), require('d3-geo'), require('d3-geo-projection'), require('d3-scale'), require('d3-tile'), require('topojson-client'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus-geomap', ['exports', 'd3-array', 'd3-color', 'd3-zoom', 'd3-geo', 'd3-geo-projection', 'd3-scale', 'd3-tile', 'topojson-client', 'd3plus-common', 'd3plus-shape', 'd3plus-viz'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Array, global.d3Color, global.d3Zoom, global.d3GeoCore, global.d3GeoProjection, global.scales, global.d3Tile, global.topojsonClient, global.d3plusCommon, global.d3plusShape, global.d3plusViz));
}(this, (function (exports, d3Array, d3Color, d3Zoom, d3GeoCore, d3GeoProjection, scales, d3Tile, topojsonClient, d3plusCommon, d3plusShape, d3plusViz) { 'use strict';

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var attributions = [{
    matches: ["cartodb", "cartocdn"],
    text: "© <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors, © <a href='https://carto.com/attribution' target='_blank'>CARTO</a>"
  }, {
    matches: ["opentopomap.org"],
    text: "© <a href='http://www.openstreetmap.org/copyright' target='_blank'>OpenStreetMap</a> contributors"
  }, {
    matches: ["arcgisonline.com"],
    text: "Powered by <a href='https://developers.arcgis.com/terms/attribution/' target='_blank'>Esri</a>"
  }, {
    matches: ["/watercolor/"],
    text: "Map tiles by <a href='http://stamen.com' target='_blank'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0' target='_blank'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org' target='_blank'>OpenStreetMap</a>, under <a href='http://www.openstreetmap.org/copyright' target='_blank'>ODbL</a>."
  }, {
    matches: ["stamen-tiles", "stamen.com"],
    text: "Map tiles by <a href='http://stamen.com' target='_blank'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0' target='_blank'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org' target='_blank'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0' target='_blank'>CC BY SA</a>."
  }];

  var d3Geo = Object.assign({}, d3GeoCore, d3GeoProjection);
  /**
   * @name findAttribution
   * @param {String} url
   * @private
   */

  function findAttribution(url) {
    var a = attributions.find(function (d) {
      return d.matches.some(function (m) {
        return url.includes(m);
      });
    });
    return a ? a.text : false;
  }
  /**
      @name topo2feature
      @desc Converts a specific topojson object key into a feature ready for projection.
      @param {Object} *topo* A valid topojson json object.
      @param {String} [*key*] The topojson object key to be used. If undefined, the first key available will be used.
      @private
  */


  function topo2feature(topo, key) {
    var k = key && topo.objects[key] ? key : Object.keys(topo.objects)[0];
    return topojsonClient.feature(topo, k);
  }
  /**
      @class Geomap
      @extends external:Viz
      @desc Creates a geographical map with zooming, panning, image tiles, and the ability to layer choropleth paths and coordinate points. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started.
  */


  var Geomap =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Geomap, _Viz);

    /**
        @memberof Geomap
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Geomap() {
      var _this;

      _classCallCheck(this, Geomap);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Geomap).call(this));
      _this._fitObject = false;
      _this._noDataMessage = false;
      _this._ocean = "#d4dadc";
      _this._point = d3plusCommon.accessor("point");
      _this._pointSize = d3plusCommon.constant(1);
      _this._pointSizeMax = 10;
      _this._pointSizeMin = 5;
      _this._pointSizeScale = "linear";
      _this._projection = d3Geo.geoMercator();
      _this._projectionPadding = d3plusCommon.parseSides(20);
      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          return "".concat(_this._drawLabel(d, i), ", ").concat(_this._pointSize(d, i));
        },
        hoverOpacity: 1,
        Path: {
          ariaLabel: function ariaLabel(d, i) {
            var validColorScale = _this._colorScale ? ", ".concat(_this._colorScale(d, i)) : "";
            return "".concat(_this._drawLabel(d, i)).concat(validColorScale, ".");
          },
          fill: function fill(d, i) {
            if (_this._colorScale && !_this._coordData.features.includes(d)) {
              var c = _this._colorScale(d);

              if (c !== undefined && c !== null) {
                if (_this._colorScaleClass._colorScale) {
                  return _this._colorScaleClass._colorScale(c);
                } else {
                  var _color = _this._colorScaleClass.color();

                  if (_color instanceof Array) _color = _color[_color.length - 1];
                  return _color;
                }
              }
            }

            return _this._topojsonFill(d, i);
          },
          on: {
            "mouseenter": function mouseenter(d) {
              return !_this._coordData.features.includes(d) ? _this._on.mouseenter.bind(_assertThisInitialized(_this))(d) : null;
            },
            "mousemove.shape": function mousemoveShape(d) {
              return !_this._coordData.features.includes(d) ? _this._on["mousemove.shape"].bind(_assertThisInitialized(_this))(d) : null;
            },
            "mouseleave": function mouseleave(d) {
              return !_this._coordData.features.includes(d) ? _this._on.mouseleave.bind(_assertThisInitialized(_this))(d) : null;
            }
          },
          stroke: function stroke(d, i) {
            var c = typeof _this._shapeConfig.Path.fill === "function" ? _this._shapeConfig.Path.fill(d, i) : _this._shapeConfig.Path.fill;
            return d3Color.color(c).darker();
          },
          strokeWidth: 1
        }
      });
      _this._tiles = true;
      _this._tileGen = d3Tile.tile();

      _this.tileUrl("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png");

      _this._topojson = false;
      _this._topojsonFill = d3plusCommon.constant("#f5f5f3");

      _this._topojsonFilter = function (d) {
        return !["010"].includes(d.id);
      };

      _this._topojsonId = d3plusCommon.accessor("id");
      _this._zoom = true;
      _this._zoomSet = false;
      return _this;
    }
    /**
        Renders map tiles based on the current zoom level.
        @private
    */


    _createClass(Geomap, [{
      key: "_renderTiles",
      value: function _renderTiles() {
        var _this2 = this;

        var transform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : d3Zoom.zoomTransform(this._container.node());
        var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var tileData = [];

        if (this._tiles) {
          tileData = this._tileGen.extent(this._zoomBehavior.translateExtent()).scale(this._projection.scale() * (2 * Math.PI) * transform.k).translate(transform.apply(this._projection.translate()))();

          this._tileGroup.transition().duration(duration).attr("transform", transform);
        }

        var images = this._tileGroup.selectAll("image.d3plus-geomap-tile").data(tileData, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              x = _ref2[0],
              y = _ref2[1],
              z = _ref2[2];

          return "".concat(x, "-").concat(y, "-").concat(z);
        });

        images.exit().transition().duration(duration).attr("opacity", 0).remove();
        var scale = tileData.scale / transform.k;
        var tileEnter = images.enter().append("image").attr("class", "d3plus-geomap-tile");
        tileEnter.attr("opacity", 0).transition().duration(duration).attr("opacity", 1);
        images.merge(tileEnter).attr("width", scale).attr("height", scale).attr("xlink:href", function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 3),
              x = _ref4[0],
              y = _ref4[1],
              z = _ref4[2];

          return _this2._tileUrl.replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0]).replace("{z}", z).replace("{x}", x).replace("{y}", y);
        }).attr("x", function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
              x = _ref6[0];

          return x * scale + tileData.translate[0] * scale - transform.x / transform.k;
        }).attr("y", function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              y = _ref8[1];

          return y * scale + tileData.translate[1] * scale - transform.y / transform.k;
        });
      }
      /**
          Extends the draw behavior of the abstract Viz class.
          @private
      */

    }, {
      key: "_draw",
      value: function _draw(callback) {
        var _this3 = this;

        _get(_getPrototypeOf(Geomap.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;
        this._container = this._select.selectAll("svg.d3plus-geomap").data([0]);
        this._container = this._container.enter().append("svg").attr("class", "d3plus-geomap").attr("opacity", 0).attr("width", width).attr("height", height).attr("x", this._margin.left).attr("y", this._margin.top).style("background-color", this._ocean || "transparent").merge(this._container);

        this._container.transition(this._transition).attr("opacity", 1).attr("width", width).attr("height", height).attr("x", this._margin.left).attr("y", this._margin.top);

        var ocean = this._container.selectAll("rect.d3plus-geomap-ocean").data([0]);

        ocean.enter().append("rect").attr("class", "d3plus-geomap-ocean").merge(ocean).attr("width", width).attr("height", height).attr("fill", this._ocean || "transparent");
        this._tileGroup = this._container.selectAll("g.d3plus-geomap-tileGroup").data([0]);
        this._tileGroup = this._tileGroup.enter().append("g").attr("class", "d3plus-geomap-tileGroup").merge(this._tileGroup);
        this._zoomGroup = this._container.selectAll("g.d3plus-geomap-zoomGroup").data([0]);
        this._zoomGroup = this._zoomGroup.enter().append("g").attr("class", "d3plus-geomap-zoomGroup").merge(this._zoomGroup);

        var pathGroup = this._zoomGroup.selectAll("g.d3plus-geomap-paths").data([0]);

        pathGroup = pathGroup.enter().append("g").attr("class", "d3plus-geomap-paths").merge(pathGroup);
        var coordData = this._coordData = this._topojson ? topo2feature(this._topojson, this._topojsonKey) : {
          type: "FeatureCollection",
          features: []
        };
        if (this._topojsonFilter) coordData.features = coordData.features.filter(this._topojsonFilter);
        var path = this._path = d3Geo.geoPath().projection(this._projection);

        var pointData = this._filteredData.filter(function (d, i) {
          return _this3._point(d, i) instanceof Array;
        });

        var pathData = this._filteredData.filter(function (d, i) {
          return !(_this3._point(d, i) instanceof Array);
        }).reduce(function (obj, d) {
          obj[_this3._id(d)] = d;
          return obj;
        }, {});

        var topoData = coordData.features.reduce(function (arr, feature) {
          var id = _this3._topojsonId(feature);

          arr.push({
            __d3plus__: true,
            data: pathData[id],
            feature: feature,
            id: id
          });
          return arr;
        }, []);
        var r = scales["scale".concat(this._pointSizeScale.charAt(0).toUpperCase()).concat(this._pointSizeScale.slice(1))]().domain(d3Array.extent(pointData, function (d, i) {
          return _this3._pointSize(d, i);
        })).range([this._pointSizeMin, this._pointSizeMax]);

        if (!this._zoomSet) {
          var fitData = this._fitObject ? topo2feature(this._fitObject, this._fitKey) : coordData;
          this._extentBounds = {
            type: "FeatureCollection",
            features: this._fitFilter ? fitData.features.filter(this._fitFilter) : fitData.features.slice()
          };
          this._extentBounds.features = this._extentBounds.features.reduce(function (arr, d) {
            if (d.geometry) {
              var reduced = {
                type: d.type,
                id: d.id,
                geometry: {
                  coordinates: d.geometry.coordinates,
                  type: d.geometry.type
                }
              };

              if (d.geometry.type === "MultiPolygon" && d.geometry.coordinates.length > 1) {
                var areas = [],
                    distances = [];
                d.geometry.coordinates.forEach(function (c) {
                  reduced.geometry.coordinates = [c];
                  areas.push(path.area(reduced));
                });
                reduced.geometry.coordinates = [d.geometry.coordinates[areas.indexOf(d3Array.max(areas))]];
                var center = path.centroid(reduced);
                d.geometry.coordinates.forEach(function (c) {
                  reduced.geometry.coordinates = [c];
                  distances.push(d3plusShape.pointDistance(path.centroid(reduced), center));
                });
                var distCutoff = d3Array.quantile(areas.reduce(function (arr, dist, i) {
                  if (dist) arr.push(areas[i] / dist);
                  return arr;
                }, []), 0.9);
                reduced.geometry.coordinates = d.geometry.coordinates.filter(function (c, i) {
                  var dist = distances[i];
                  return dist === 0 || areas[i] / dist >= distCutoff;
                });
              }

              arr.push(reduced);
            }

            return arr;
          }, []);

          if (!this._extentBounds.features.length && pointData.length) {
            var bounds = [[undefined, undefined], [undefined, undefined]];
            pointData.forEach(function (d, i) {
              var point = _this3._projection(_this3._point(d, i));

              if (bounds[0][0] === void 0 || point[0] < bounds[0][0]) bounds[0][0] = point[0];
              if (bounds[1][0] === void 0 || point[0] > bounds[1][0]) bounds[1][0] = point[0];
              if (bounds[0][1] === void 0 || point[1] < bounds[0][1]) bounds[0][1] = point[1];
              if (bounds[1][1] === void 0 || point[1] > bounds[1][1]) bounds[1][1] = point[1];
            });
            this._extentBounds = {
              type: "FeatureCollection",
              features: [{
                type: "Feature",
                geometry: {
                  type: "MultiPoint",
                  coordinates: bounds.map(function (b) {
                    return _this3._projection.invert(b);
                  })
                }
              }]
            };
            var maxSize = d3Array.max(pointData, function (d, i) {
              return r(_this3._pointSize(d, i));
            });
            this._projectionPadding.top += maxSize;
            this._projectionPadding.right += maxSize;
            this._projectionPadding.bottom += maxSize;
            this._projectionPadding.left += maxSize;
          }

          this._zoomBehavior.extent([[0, 0], [width, height]]).scaleExtent([1, this._zoomMax]).translateExtent([[0, 0], [width, height]]);

          this._zoomSet = true;
        }

        this._projection = this._projection.fitExtent(this._extentBounds.features.length ? [[this._projectionPadding.left, this._projectionPadding.top], [width - this._projectionPadding.right, height - this._projectionPadding.bottom]] : [[0, 0], [width, height]], this._extentBounds.features.length ? this._extentBounds : {
          type: "Sphere"
        });

        this._shapes.push(new d3plusShape.Path().data(topoData).d(function (d) {
          return path(d.feature);
        }).select(pathGroup.node()).x(0).y(0).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path")).render());

        var pointGroup = this._zoomGroup.selectAll("g.d3plus-geomap-pins").data([0]);

        pointGroup = pointGroup.enter().append("g").attr("class", "d3plus-geomap-pins").merge(pointGroup);
        var circles = new d3plusShape.Circle().config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle")).data(pointData).r(function (d, i) {
          return r(_this3._pointSize(d, i));
        }).select(pointGroup.node()).sort(function (a, b) {
          return _this3._pointSize(b) - _this3._pointSize(a);
        }).x(function (d, i) {
          return _this3._projection(_this3._point(d, i))[0];
        }).y(function (d, i) {
          return _this3._projection(_this3._point(d, i))[1];
        });
        var events = Object.keys(this._on);
        var classEvents = events.filter(function (e) {
          return e.includes(".Circle");
        }),
            globalEvents = events.filter(function (e) {
          return !e.includes(".");
        }),
            shapeEvents = events.filter(function (e) {
          return e.includes(".shape");
        });

        for (var e = 0; e < globalEvents.length; e++) {
          circles.on(globalEvents[e], this._on[globalEvents[e]]);
        }

        for (var _e = 0; _e < shapeEvents.length; _e++) {
          circles.on(shapeEvents[_e], this._on[shapeEvents[_e]]);
        }

        for (var _e2 = 0; _e2 < classEvents.length; _e2++) {
          circles.on(classEvents[_e2], this._on[classEvents[_e2]]);
        }

        this._shapes.push(circles.render());

        return this;
      }
      /**
          @memberof Geomap
          @desc Topojson files sometimes include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). The fitFilter method can be used to remove specific geographies from the logic used to determine the zooming.
      The *value* passed can be a single id to remove, an array of ids, or a filter function. Take a look at the [Choropleth Example](http://d3plus.org/examples/d3plus-geomap/getting-started/) to see it in action.
          @param {Number|String|Array|Function} [*value*]
          @chainable
      */

    }, {
      key: "fitFilter",
      value: function fitFilter(_) {
        if (arguments.length) {
          this._zoomSet = false;
          if (typeof _ === "function") return this._fitFilter = _, this;
          if (!(_ instanceof Array)) _ = [_];
          return this._fitFilter = function (d) {
            return _.includes(d.id);
          }, this;
        }

        return this._fitFilter;
      }
      /**
          @memberof Geomap
          @desc If the topojson being used to determine the zoom fit (either the main [topojson](#Geomap.topojson) object or the [fitObject](#Geomap.fitObject)) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use for the zoom fit.
      If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
          @param {String} *value*
          @chainable
      */

    }, {
      key: "fitKey",
      value: function fitKey(_) {
        if (arguments.length) {
          this._fitKey = _;
          this._zoomSet = false;
          return this;
        }

        return this._fitKey;
      }
      /**
          @memberof Geomap
          @desc The topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function needs to return the final Topojson *Object*.
          @param {Object|String} *data* = `undefined`
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "fitObject",
      value: function fitObject(_, f) {
        if (arguments.length) {
          if (typeof _ === "string") {
            var prev = this._queue.find(function (q) {
              return q[3] === "fitObject";
            });

            var d = [d3plusViz.dataLoad.bind(this), _, f, "fitObject"];
            if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          } else {
            this._fitObject = _;
          }

          this._zoomSet = false;
          return this;
        }

        return this._fitObject;
      }
      /**
          @memberof Geomap
          @desc The color visible behind any shapes drawn on the map projection. By default, a color value matching the color used in the map tiles is used to help mask the loading time needed to render the tiles. Any value CSS color value may be used, including hexidecimal, rgb, rgba, and color strings like `"blue"` and `"transparent"`.
          @param {String} [*value* = "#d4dadc"]
          @chainable
      */

    }, {
      key: "ocean",
      value: function ocean(_) {
        return arguments.length ? (this._ocean = _, this) : this._ocean;
      }
      /**
          @memberof Geomap
          @desc The accessor to be used when detecting coordinate points in the objects passed to the [data](https://d3plus.org/docs/#Viz.data) method. Values are expected to be in the format `[longitude, latitude]`, which is in-line with d3's expected coordinate mapping.
          @param {Function|Array} [*value*]
          @chainable
      */

    }, {
      key: "point",
      value: function point(_) {
        return arguments.length ? (this._point = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._point;
      }
      /**
          @memberof Geomap
          @desc The accessor or static value to be used for sizing coordinate points.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "pointSize",
      value: function pointSize(_) {
        return arguments.length ? (this._pointSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointSize;
      }
      /**
          @memberof Geomap
          @desc The maximum pixel radius used in the scale for sizing coordinate points.
          @param {Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "pointSizeMax",
      value: function pointSizeMax(_) {
        return arguments.length ? (this._pointSizeMax = _, this) : this._pointSizeMax;
      }
      /**
          @memberof Geomap
          @desc The minimum pixel radius used in the scale for sizing coordinate points.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "pointSizeMin",
      value: function pointSizeMin(_) {
        return arguments.length ? (this._pointSizeMin = _, this) : this._pointSizeMin;
      }
      /**
          @memberof Geomap
          @desc Sets the map projection used when displaying topojson and coordinate points. Any of the standard projections exported from [d3-geo](https://github.com/d3/d3-geo#projections) are accepted, whether as the string name (ie. "geoMercator") or the generator function itself. Map tiles are only usable when the projection is set to Mercator (which is also the default value).
          @param {Function|String} *projection* = "geoMercator"
          @chainable
      */

    }, {
      key: "projection",
      value: function projection(_) {
        if (arguments.length && _ !== "geoMercator") this.tiles(false);
        return arguments.length ? (this._projection = typeof _ === "string" ? d3Geo[_] ? d3Geo[_]() : d3Geo.geoMercator() : _, this) : this._projection;
      }
      /**
          @memberof Geomap
          @desc The outer padding between the edge of the visualization and the shapes drawn. The value passed can be either a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).
          @param {Number|String} [*value* = 20]
          @chainable
      */

    }, {
      key: "projectionPadding",
      value: function projectionPadding(_) {
        return arguments.length ? (this._projectionPadding = d3plusCommon.parseSides(_), this) : this._projectionPadding;
      }
      /**
          @memberof Geomap
          @desc An array that corresponds to the value passed to the projection's [rotate](https://github.com/d3/d3-geo#projection_rotate) function. Use this method to shift the centerpoint of a map.
          @param {Array} [*value* = [0, 0]]
          @chainable
      */

    }, {
      key: "projectionRotate",
      value: function projectionRotate(_) {
        if (arguments.length) {
          this._projection.rotate(_);

          this.tiles(false);
          this._zoomSet = false;
          return this;
        } else {
          return this._projectionRotate;
        }
      }
      /**
          @memberof Geomap
          @desc Toggles the visibility of the map tiles.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "tiles",
      value: function tiles(_) {
        if (arguments.length) {
          this._tiles = _;
          var attribution = findAttribution(this._tileUrl);
          if (_ && this._attribution === "") this._attribution = attribution;else if (!_ && this._attribution === attribution) this._attribution = "";
          return this;
        }

        return this._tiles;
      }
      /**
          @memberof Geomap
          @desc By default, d3plus uses the `light_all` style provided by [CARTO](https://carto.com/location-data-services/basemaps/) for it's map tiles. The [tileUrl](https://d3plus.org/docs/#Geomap.tileUrl) method changes the base URL used for fetching the tiles, as long as the string passed contains `{x}`, `{y}`, and `{z}` variables enclosed in curly brackets for the zoom logic to load the correct tiles.
          @param {String} [url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"]
          @chainable
      */

    }, {
      key: "tileUrl",
      value: function tileUrl(_) {
        if (arguments.length) {
          this._tileUrl = _;
          if (this._tiles) this._attribution = findAttribution(_);
          if (this._tileGroup) this._renderTiles.bind(this)();
          return this;
        }

        return this._tileUrl;
      }
      /**
          @memberof Geomap
          @desc The topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.
          @param {Object|String} *data* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "topojson",
      value: function topojson(_, f) {
        if (arguments.length) {
          if (typeof _ === "string") {
            var prev = this._queue.find(function (q) {
              return q[3] === "topojson";
            });

            var d = [d3plusViz.dataLoad.bind(this), _, f, "topojson"];
            if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          } else {
            this._topojson = _;
          }

          this._zoomSet = false;
          return this;
        }

        return this._topojson;
      }
      /**
          @memberof Geomap
          @desc The function is used to set default color of the map.
          @param {String|Function} *value* = string
          @chainable
      */

    }, {
      key: "topojsonFill",
      value: function topojsonFill(_) {
        return arguments.length ? (this._topojsonFill = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._topojsonFill;
      }
      /**
          @memberof Geomap
          @desc If the [topojson](#Geomap.topojson) being used contains boundaries that should not be shown, this method can be used to filter them out of the final output. The *value* passed can be a single id to remove, an array of ids, or a filter function.
          @param {Number|String|Array|Function} [*value*]
          @chainable
      */

    }, {
      key: "topojsonFilter",
      value: function topojsonFilter(_) {
        if (arguments.length) {
          this._zoomSet = false;
          if (typeof _ === "function") return this._topojsonFilter = _, this;
          if (!(_ instanceof Array)) _ = [_];
          return this._topojsonFilter = function (d) {
            return _.includes(d.id);
          }, this;
        }

        return this._topojsonFilter;
      }
      /**
          @memberof Geomap
          @desc If the [topojson](#Geomap.topojson) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use.
      If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.
          @param {String} *value*
          @chainable
      */

    }, {
      key: "topojsonKey",
      value: function topojsonKey(_) {
        if (arguments.length) {
          this._topojsonKey = _;
          this._zoomSet = false;
          return this;
        }

        return this._topojsonKey;
      }
      /**
          @memberof Geomap
          @desc The accessor used to map each topojson geometry to it's corresponding [data](https://d3plus.org/docs/#Viz.data) point.
          @param {String|Function} *value* = "id"
          @chainable
      */

    }, {
      key: "topojsonId",
      value: function topojsonId(_) {
        return arguments.length ? (this._topojsonId = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._topojsonId;
      }
    }]);

    return Geomap;
  }(d3plusViz.Viz);

  exports.Geomap = Geomap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-geomap.js.map
