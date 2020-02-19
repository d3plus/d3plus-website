/*
  d3plus-hierarchy v0.8.10
  Nested, hierarchical, and cluster charts built on D3
  Copyright (c) 2020 D3plus - https://d3plus.org
  @license MIT
*/

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
	  version: '3.2.1',
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

}));

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-shape'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3-collection'), require('d3-hierarchy'), require('d3-scale'), require('d3plus-format')) :
  typeof define === 'function' && define.amd ? define('d3plus-hierarchy', ['exports', 'd3-array', 'd3-shape', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3-collection', 'd3-hierarchy', 'd3-scale', 'd3plus-format'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Array, global.d3Shape, global.d3plusCommon, global.d3plusShape, global.d3plusViz, global.d3Collection, global.d3Hierarchy, global.d3Scale, global.d3plusFormat));
}(this, function (exports, d3Array, d3Shape, d3plusCommon, d3plusShape, d3plusViz, d3Collection, d3Hierarchy, d3Scale, d3plusFormat) { 'use strict';

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
      @class Pie
      @extends Viz
      @desc Uses the [d3 pie layout](https://github.com/d3/d3-shape#pies) to creates SVG arcs based on an array of data.
  */

  var Pie =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Pie, _Viz);

    /**
        @memberof Pie
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Pie() {
      var _this;

      _classCallCheck(this, Pie);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Pie).call(this));
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          return _this._pieData ? "".concat(++_this._pieData[i].index, ". ").concat(_this._drawLabel(d, i), ", ").concat(_this._value(d, i), ".") : "";
        },
        Path: {
          labelConfig: {
            fontResize: true
          }
        }
      });
      _this._innerRadius = 0;

      _this._legendSort = function (a, b) {
        return _this._value(b) - _this._value(a);
      };

      _this._padPixel = 0;
      _this._pie = d3Shape.pie();

      _this._sort = function (a, b) {
        return _this._value(b) - _this._value(a);
      };

      _this._value = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Pie, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Pie.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;
        var outerRadius = d3Array.min([width, height]) / 2;

        var pieData = this._pieData = this._pie.padAngle(this._padAngle || this._padPixel / outerRadius).sort(this._sort).value(this._value)(this._filteredData);

        pieData.forEach(function (d, i) {
          d.__d3plus__ = true;
          d.i = i;
        });
        var arcData = d3Shape.arc().innerRadius(this._innerRadius).outerRadius(outerRadius);
        var transform = "translate(".concat(width / 2 + this._margin.left, ", ").concat(height / 2 + this._margin.top, ")");

        this._shapes.push(new d3plusShape.Path().data(pieData).d(arcData).select(d3plusCommon.elem("g.d3plus-Pie", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config({
          id: function id(d) {
            return _this2._ids(d).join("-");
          },
          x: 0,
          y: 0
        }).label(this._drawLabel).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path")).render());

        return this;
      }
      /**
          @memberof Pie
          @desc If *value* is specified, sets the inner radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current inner radius accessor.
          @param {Function|Number} [*value*]
      */

    }, {
      key: "innerRadius",
      value: function innerRadius(_) {
        return arguments.length ? (this._innerRadius = _, this) : this._innerRadius;
      }
      /**
          @memberof Pie
          @desc If *value* is specified, sets the arc padding to the specified radian value and returns the current class instance. If *value* is not specified, returns the current radian padding.
          @param {Number} [*value*]
      */

    }, {
      key: "padAngle",
      value: function padAngle(_) {
        return arguments.length ? (this._padAngle = _, this) : this._padAngle;
      }
      /**
          @memberof Pie
          @desc If *value* is specified, sets the arc padding to the specified pixel value and returns the current class instance. If *value* is not specified, returns the current pixel padding.
          @param {Number} [*value*]
      */

    }, {
      key: "padPixel",
      value: function padPixel(_) {
        return arguments.length ? (this._padPixel = _, this) : this._padPixel;
      }
      /**
          @memberof Pie
          @desc If *comparator* is specified, sets the sort order for the pie slices using the specified comparator function. If *comparator* is not specified, returns the current sort order, which defaults to descending order by the associated input data's numeric value attribute.
          @param {Array} [*comparator*]
          @example
      function comparator(a, b) {
      return b.value - a.value;
      }
      */

    }, {
      key: "sort",
      value: function sort(_) {
        return arguments.length ? (this._sort = _, this) : this._sort;
      }
      /**
          @memberof Pie
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

    return Pie;
  }(d3plusViz.Viz);

  /**
      @class Donut
      @extends Pie
      @desc Extends the Pie visualization to create a donut chart.
  */

  var Donut =
  /*#__PURE__*/
  function (_Pie) {
    _inherits(Donut, _Pie);

    /**
        @memberof Donut
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Donut() {
      var _this;

      _classCallCheck(this, Donut);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Donut).call(this));

      _this._innerRadius = function () {
        return d3Array.min([_this._width - _this._margin.left - _this._margin.right, _this._height - _this._margin.top - _this._margin.bottom]) / 4;
      };

      _this._padPixel = 2;
      return _this;
    }

    return Donut;
  }(Pie);

  var recursionCircles = function recursionCircles(d) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (d.values) {
      d.values.forEach(function (h) {
        arr.push(h);
        recursionCircles(h, arr);
      });
    } else {
      arr.push(d);
    }

    return arr;
  };
  /**
      @class Pack
      @extends Viz
      @desc Uses the [d3 pack layout](https://github.com/d3/d3-hierarchy#pack) to creates Circle Packing chart based on an array of data.
  */


  var Pack =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Pack, _Viz);

    /**
        @memberof Pack
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Pack() {
      var _this;

      _classCallCheck(this, Pack);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Pack).call(this));
      _this._layoutPadding = 1;

      _this._on.mouseenter = function () {};

      var defaultMouseMoveLegend = _this._on["mousemove.legend"];

      _this._on["mousemove.legend"] = function (d, i) {
        defaultMouseMoveLegend(d, i);

        var ids = _this._ids(d, i);

        var hoverData = recursionCircles(d);

        _this.hover(function (h) {
          var hover = Object.keys(h).filter(function (key) {
            return key !== "value";
          }).every(function (key) {
            return d[key] && d[key].includes(h[key]);
          });
          if (hover) hoverData.push(h);else if (ids.includes(h.key)) hoverData.push.apply(hoverData, _toConsumableArray(recursionCircles(h, [h])));
          return hoverData.includes(h);
        });
      };

      var defaultMouseMoveShape = _this._on["mousemove.shape"];

      _this._on["mousemove.shape"] = function (d, i) {
        if (d.__d3plusTooltip__) defaultMouseMoveShape(d, i);

        _this.hover(function (h) {
          return recursionCircles(d, [d]).includes(h);
        });
      };

      _this._pack = d3Hierarchy.pack();
      _this._packOpacity = d3plusCommon.constant(0.25);
      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        Circle: {
          label: function label(d) {
            return d.parent && !d.children ? d.id : false;
          },
          labelConfig: {
            fontResize: true
          },
          opacity: function opacity(d) {
            return d.__d3plusOpacity__;
          }
        }
      });

      _this._sort = function (a, b) {
        return b.value - a.value;
      };

      _this._sum = d3plusCommon.accessor("value");
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Pack, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Pack.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;
        var diameter = Math.min(height, width);
        var transform = "translate(".concat((width - diameter) / 2, ", ").concat((height - diameter) / 2, ")");
        var nestedData = d3Collection.nest();

        for (var i = 0; i <= this._drawDepth; i++) {
          nestedData.key(this._groupBy[i]);
        }

        nestedData = nestedData.entries(this._filteredData);

        var packData = this._pack.padding(this._layoutPadding).size([diameter, diameter])(d3Hierarchy.hierarchy({
          key: nestedData.key,
          values: nestedData
        }, function (d) {
          return d.values;
        }).sum(this._sum).sort(this._sort)).descendants();

        packData.forEach(function (d, i) {
          d.__d3plus__ = true;
          d.i = i;
          d.id = d.parent ? d.parent.data.key : null;
          d.data.__d3plusOpacity__ = d.height ? _this2._packOpacity(d.data, i) : 1;
          d.data.__d3plusTooltip__ = !d.height ? true : false;
        });

        this._shapes.push(new d3plusShape.Circle().data(packData).select(d3plusCommon.elem("g.d3plus-Pack", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle")).render());

        return this;
      }
      /**
          @memberof Pack
          @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
       */

    }, {
      key: "hover",
      value: function hover(_) {
        this._hover = _;

        this._shapes.forEach(function (s) {
          return s.hover(_);
        });

        if (this._legend) this._legendClass.hover(_);
        return this;
      }
      /**
          @memberof Pack
          @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.
          @param {Function|Number} [*value*]
      */

    }, {
      key: "layoutPadding",
      value: function layoutPadding(_) {
        return arguments.length ? (this._layoutPadding = _, this) : this._layoutPadding;
      }
      /**
          @memberof Pack
          @desc If *value* is specified, sets the padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.
          @param {Function|Number} [*value*]
      */

    }, {
      key: "packOpacity",
      value: function packOpacity(_) {
        return arguments.length ? (this._packOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._packOpacity;
      }
      /**
          @memberof Pack
          @desc If *comparator* is specified, sets the sort order for the pack using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
          @param {Array} [*comparator*]
          @example
      function comparator(a, b) {
      return b.value - a.value;
      }
      */

    }, {
      key: "sort",
      value: function sort(_) {
        return arguments.length ? (this._sort = _, this) : this._sort;
      }
      /**
          @memberof Pack
          @desc If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.
          @param {Function|Number} [*value*]
          @example
      function sum(d) {
      return d.sum;
      }
      */

    }, {
      key: "sum",
      value: function sum(_) {
        return arguments.length ? (this._sum = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._sum;
      }
    }]);

    return Pack;
  }(d3plusViz.Viz);

  /**
      @function nest
      @summary Extends the base behavior of d3.nest to allow for multiple depth levels.
      @param {Array} *data* The data array to be nested.
      @param {Array} *keys* An array of key accessors that signify each nest level.
  */

  function nest (data, keys) {
    if (!(keys instanceof Array)) keys = [keys];
    var dataNest = d3Collection.nest();

    for (var i = 0; i < keys.length; i++) {
      dataNest.key(keys[i]);
    }

    var nestedData = dataNest.entries(data);
    return bubble(nestedData);
  }
  /**
      Bubbles up values that do not nest to the furthest key.
      @param {Array} *values* The "values" of a nest object.
      @private
  */

  function bubble(values) {
    return values.map(function (d) {
      if (d.key && d.values) {
        if (d.values[0].key === "undefined") return d.values[0].values[0];else d.values = bubble(d.values);
      }

      return d;
    });
  }

  /**
      @class Tree
      @extends Viz
      @desc Uses d3's [tree layout](https://github.com/d3/d3-hierarchy#tree) to create a tidy tree chart based on an array of data.
  */

  var Tree =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Tree, _Viz);

    /**
        @memberof Tree
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Tree() {
      var _this;

      _classCallCheck(this, Tree);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Tree).call(this));
      _this._orient = "vertical";

      _this._separation = function (a, b) {
        return a.parent === b.parent ? 1 : 2;
      };

      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          return _this._treeData ? "".concat(_this._treeData[i].depth, ". ").concat(_this._drawLabel(d, i), ".") : "";
        },
        labelConfig: {
          fontColor: "#444"
        },
        Path: {
          fill: "none",
          stroke: "#ccc",
          strokeWidth: 1
        },
        r: d3plusCommon.constant(5),
        width: d3plusCommon.constant(10),
        height: d3plusCommon.constant(10)
      });
      _this._tree = d3Hierarchy.tree();
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Tree, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Tree.prototype), "_draw", this).call(this, callback);

        var height = this._orient === "vertical" ? this._height - this._margin.top - this._margin.bottom : this._width - this._margin.left - this._margin.right,
            left = this._orient === "vertical" ? "left" : "top",
            that = this,
            transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")"),
            width = this._orient === "horizontal" ? this._height - this._margin.top - this._margin.bottom : this._width - this._margin.left - this._margin.right;

        var treeData = this._treeData = this._tree.separation(this._separation).size([width, height])(d3Hierarchy.hierarchy({
          key: "root",
          values: nest(this._filteredData, this._groupBy.slice(0, this._drawDepth + 1))
        }, function (d) {
          return d.key && d.values ? d.values : null;
        }).sort(this._sort)).descendants().filter(function (d) {
          return d.depth <= _this2._groupBy.length && d.parent;
        });
        /**
            Merges the values of a given nest branch.
            @private
        */


        function flattenBranchData(branch) {
          return d3plusCommon.merge(branch.values.map(function (l) {
            return l.key && l.values ? flattenBranchData(l) : l;
          }), that._aggs);
        }

        treeData.forEach(function (d, i) {
          if (d.data.key && d.data.values) d.data = flattenBranchData(d.data);
          d.__d3plus__ = true;
          d.i = i;
        });
        var r = this._shapeConfig.r;
        if (typeof r !== "function") r = d3plusCommon.constant(r);
        var rBufferRoot = d3Array.max(treeData, function (d) {
          return d.depth === 1 ? r(d.data, d.i) : 0;
        });
        var rBufferEnd = d3Array.max(treeData, function (d) {
          return d.children ? 0 : r(d.data, d.i);
        });
        var yExtent = d3Array.extent(treeData, function (d) {
          return d.y;
        });
        this._labelHeight = d3Array.min([this._orient === "vertical" ? 50 : 100, (yExtent[1] - rBufferRoot - rBufferEnd) / (this._groupBy.length + 1)]);
        this._labelWidths = nest(treeData, function (d) {
          return d.depth;
        }).map(function (d) {
          return d.values.reduce(function (num, v, i) {
            var next = i < d.values.length - 1 ? d.values[i + 1].x : width + _this2._margin[left],
                prev = i ? d.values[i - 1].x : _this2._margin[left];
            return d3Array.min([num, next - v.x, v.x - prev]);
          }, width);
        });
        var yScale = d3Scale.scaleLinear().domain(yExtent).range([rBufferRoot + this._labelHeight, height - rBufferEnd - this._labelHeight]);
        treeData.forEach(function (d) {
          var val = yScale(d.y);

          if (_this2._orient === "horizontal") {
            d.y = d.x;
            d.x = val;
          } else d.y = val;
        });
        var elemObject = {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        };

        this._shapes.push(new d3plusShape.Path().data(treeData.filter(function (d) {
          return d.depth > 1;
        })).select(d3plusCommon.elem("g.d3plus-Tree-Links", elemObject).node()).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path")).config({
          d: function d(_d) {
            var r = _this2._shapeConfig.r;
            if (typeof r === "function") r = r(_d.data, _d.i);
            var px = _d.parent.x - _d.x + (_this2._orient === "vertical" ? 0 : r),
                py = _d.parent.y - _d.y + (_this2._orient === "vertical" ? r : 0),
                x = _this2._orient === "vertical" ? 0 : -r,
                y = _this2._orient === "vertical" ? -r : 0;
            return _this2._orient === "vertical" ? "M".concat(x, ",").concat(y, "C").concat(x, ",").concat((y + py) / 2, " ").concat(px, ",").concat((y + py) / 2, " ").concat(px, ",").concat(py) : "M".concat(x, ",").concat(y, "C").concat((x + px) / 2, ",").concat(y, " ").concat((x + px) / 2, ",").concat(py, " ").concat(px, ",").concat(py);
          },
          id: function id(d, i) {
            return _this2._ids(d, i).join("-");
          }
        }).render());

        this._shapes.push(new d3plusShape.Circle().data(treeData).select(d3plusCommon.elem("g.d3plus-Tree-Shapes", elemObject).node()).config(d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Circle")).config({
          id: function id(d, i) {
            return _this2._ids(d, i).join("-");
          },
          label: function label(d, i) {
            if (_this2._label) return _this2._label(d.data, i);

            var ids = _this2._ids(d, i).slice(0, d.depth);

            return ids[ids.length - 1];
          },
          labelConfig: {
            textAnchor: function textAnchor(d) {
              return _this2._orient === "vertical" ? "middle" : d.data.children && d.data.depth !== _this2._groupBy.length ? "end" : "start";
            },
            verticalAlign: function verticalAlign(d) {
              return _this2._orient === "vertical" ? d.data.depth === 1 ? "bottom" : "top" : "middle";
            }
          },
          hitArea: function hitArea(d, i, s) {
            var h = _this2._labelHeight,
                w = _this2._labelWidths[d.depth - 1];
            return {
              width: _this2._orient === "vertical" ? w : s.r * 2 + w,
              height: _this2._orient === "horizontal" ? h : s.r * 2 + h,
              x: _this2._orient === "vertical" ? -w / 2 : d.children && d.depth !== _this2._groupBy.length ? -(s.r + w) : -s.r,
              y: _this2._orient === "horizontal" ? -h / 2 : d.children && d.depth !== _this2._groupBy.length ? -(s.r + _this2._labelHeight) : -s.r
            };
          },
          labelBounds: function labelBounds(d, i, s) {
            var _ref;

            var h = _this2._labelHeight,
                height = _this2._orient === "vertical" ? "height" : "width",
                w = _this2._labelWidths[d.depth - 1],
                width = _this2._orient === "vertical" ? "width" : "height",
                x = _this2._orient === "vertical" ? "x" : "y",
                y = _this2._orient === "vertical" ? "y" : "x";
            return _ref = {}, _defineProperty(_ref, width, w), _defineProperty(_ref, height, h), _defineProperty(_ref, x, -w / 2), _defineProperty(_ref, y, d.children && d.depth !== _this2._groupBy.length ? -(s.r + h) : s.r), _ref;
          }
        }).render());

        return this;
      }
      /**
          @memberof Tree
          @desc If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.
          @param {String} [*value* = "vertical"] Accepts either "vertical" or "horizontal".
      */

    }, {
      key: "orient",
      value: function orient(_) {
        return arguments.length ? (this._orient = _, this) : this._orient;
      }
      /**
          @memberof Tree
          @desc If *value* is specified, sets the separation accessor to the specified function. If *value* is not specified, returns the current separation accessor.
      From the [d3-hierarchy documentation](https://github.com/d3/d3-hierarchy#tree_separation):
      > The separation accessor is used to separate neighboring nodes. The separation function is passed two nodes a and b, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.
          @param {Function} [*value*]
          @example
      function separation(a, b) {
      return a.parent === b.parent ? 1 : 2;
      }
      */

    }, {
      key: "separation",
      value: function separation(_) {
        return arguments.length ? (this._separation = _, this) : this._separation;
      }
    }]);

    return Tree;
  }(d3plusViz.Viz);

  /**
      @class Treemap
      @extends Viz
      @desc Uses the [d3 treemap layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-hierarchy/getting-started/) for help getting started using the treemap generator.
  */

  var Treemap =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Treemap, _Viz);

    /**
      @memberof Treemap
      @desc Invoked when creating a new class instance, and sets any default parameters.
      @private
    */
    function Treemap() {
      var _this;

      _classCallCheck(this, Treemap);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Treemap).call(this));
      _this._layoutPadding = 1;

      _this._legendSort = function (a, b) {
        return _this._sum(b) - _this._sum(a);
      };

      _this._legendTooltip = d3plusCommon.assign({}, _this._legendTooltip, {
        tbody: []
      });
      _this._shapeConfig = d3plusCommon.assign({}, _this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          var rank = _this._rankData ? "".concat(_this._rankData.indexOf(d) + 1, ". ") : "";
          return "".concat(rank).concat(_this._drawLabel(d, i), ", ").concat(_this._sum(d, i), ".");
        },
        labelConfig: {
          fontMax: 20,
          fontMin: 8,
          fontResize: true,
          padding: 5
        }
      });

      _this._sort = function (a, b) {
        var aggA = isAggregated(a);
        var aggB = isAggregated(b);
        return aggA && !aggB ? 1 : !aggA && aggB ? -1 : b.value - a.value;
      };

      _this._sum = d3plusCommon.accessor("value");
      _this._thresholdKey = _this._sum;
      _this._tile = d3Hierarchy.treemapSquarify;
      _this._tooltipConfig = d3plusCommon.assign({}, _this._tooltipConfig, {
        tbody: [[function () {
          return _this._translate("Share");
        }, function (d, i, x) {
          return "".concat(d3plusFormat.formatAbbreviate(x.share * 100, _this._locale), "%");
        }]]
      });
      _this._treemap = d3Hierarchy.treemap().round(true);

      var isAggregated = function isAggregated(leaf) {
        return leaf.children && leaf.children.length === 1 && leaf.children[0].data._isAggregation;
      };

      return _this;
    }
    /**
        @memberof Treemap
        @desc Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Treemap, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Treemap.prototype), "_draw", this).call(this, callback);

        var nestedData = d3Collection.nest();

        for (var i = 0; i <= this._drawDepth; i++) {
          nestedData.key(this._groupBy[i]);
        }

        nestedData = nestedData.entries(this._filteredData);

        var tmapData = this._treemap.padding(this._layoutPadding).size([this._width - this._margin.left - this._margin.right, this._height - this._margin.top - this._margin.bottom]).tile(this._tile)(d3Hierarchy.hierarchy({
          values: nestedData
        }, function (d) {
          return d.values;
        }).sum(this._sum).sort(this._sort));

        var shapeData = [],
            that = this;
        /**
            @memberof Treemap
            @desc Flattens and merges treemap data.
            @private
        */

        function extractLayout(children) {
          for (var _i = 0; _i < children.length; _i++) {
            var node = children[_i];
            if (node.depth <= that._drawDepth) extractLayout(node.children);else {
              var index = node.data.values.length === 1 ? that._filteredData.indexOf(node.data.values[0]) : undefined;
              node.__d3plus__ = true;
              node.id = node.data.key;
              node.i = index > -1 ? index : undefined;
              node.data = d3plusCommon.merge(node.data.values);
              node.x = node.x0 + (node.x1 - node.x0) / 2;
              node.y = node.y0 + (node.y1 - node.y0) / 2;
              shapeData.push(node);
            }
          }
        }

        if (tmapData.children) extractLayout(tmapData.children);
        this._rankData = shapeData.sort(this._sort).map(function (d) {
          return d.data;
        });
        var total = tmapData.value;
        shapeData.forEach(function (d) {
          d.share = _this2._sum(d.data, d.i) / total;
        });
        var transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")");
        var rectConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Rect");
        var fontMin = rectConfig.labelConfig.fontMin;
        var padding = rectConfig.labelConfig.padding;

        this._shapes.push(new d3plusShape.Rect().data(shapeData).label(function (d) {
          return [_this2._drawLabel(d.data, d.i), "".concat(d3plusFormat.formatAbbreviate(d.share * 100, _this2._locale), "%")];
        }).select(d3plusCommon.elem("g.d3plus-Treemap", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config({
          height: function height(d) {
            return d.y1 - d.y0;
          },
          labelBounds: function labelBounds(d, i, s) {
            var h = s.height;
            var sh = Math.min(50, (h - padding * 2) * 0.5);
            if (sh < fontMin) sh = 0;
            return [{
              width: s.width,
              height: h - sh,
              x: -s.width / 2,
              y: -h / 2
            }, {
              width: s.width,
              height: sh + padding * 2,
              x: -s.width / 2,
              y: h / 2 - sh - padding * 2
            }];
          },
          labelConfig: {
            textAnchor: function textAnchor(d, i, x) {
              var line,
                  parent = x;

              while (typeof line === "undefined" && parent) {
                if (typeof parent.l !== "undefined") line = parent.l;
                parent = parent.__d3plusParent__;
              }

              return line ? "middle" : "start";
            },
            verticalAlign: function verticalAlign(d, i, x) {
              var line,
                  parent = x;

              while (typeof line === "undefined" && parent) {
                if (typeof parent.l !== "undefined") line = parent.l;
                parent = parent.__d3plusParent__;
              }

              return line ? "bottom" : "top";
            }
          },
          width: function width(d) {
            return d.x1 - d.x0;
          }
        }).config(rectConfig).render());

        return this;
      }
      /**
       * Applies the threshold algorithm for Treemaps.
       * @param {Array} data The data to process.
       */

    }, {
      key: "_thresholdFunction",
      value: function _thresholdFunction(data) {
        var aggs = this._aggs;
        var drawDepth = this._drawDepth;
        var groupBy = this._groupBy;
        var threshold = this._threshold;
        var thresholdKey = this._thresholdKey;
        var totalSum = d3Array.sum(data, thresholdKey);

        if (threshold && thresholdKey) {
          return thresholdByDepth(data, 0);
        }
        /**
         * @memberof Treemap
         * @desc Explores the data tree recursively and merges elements under the indicated threshold.
         * @param {object[]} branchData The current subset of the dataset to work on.
         * @param {number} depth The depth of the current branch.
         * @private
         */


        function thresholdByDepth(branchData, depth) {
          if (depth < drawDepth) {
            return d3Collection.nest().key(groupBy[depth]).entries(branchData).reduce(function (bulk, leaf) {
              var subBranchData = thresholdByDepth(leaf.values, depth + 1);
              return bulk.concat(subBranchData);
            }, []);
          }

          if (depth === drawDepth) {
            var thresholdPercent = Math.min(1, Math.max(0, threshold(branchData)));
            if (!isFinite(thresholdPercent) || isNaN(thresholdPercent)) return null;
            var removedItems = [];
            var branchDataCopy = branchData.slice();
            var thresholdValue = thresholdPercent * totalSum;
            var n = branchDataCopy.length;

            while (n--) {
              var datum = branchDataCopy[n];

              if (thresholdKey(datum) < thresholdValue) {
                var index = branchDataCopy.indexOf(datum);
                branchDataCopy.splice(index, 1);
                removedItems.push(datum);
              }
            }

            if (removedItems.length > 0) {
              var mergedItem = d3plusCommon.merge(removedItems, aggs);
              mergedItem._isAggregation = true;
              mergedItem._threshold = thresholdPercent;
              branchDataCopy.push(mergedItem);
            }

            return branchDataCopy;
          }

          throw new Error("Depth is higher than the amount of grouping levels.");
        }

        return data;
      }
      /**
          @memberof Treemap
          @desc If *value* is specified, sets the inner and outer padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current padding accessor.
          @param {Function|Number} [*value*]
      */

    }, {
      key: "layoutPadding",
      value: function layoutPadding(_) {
        return arguments.length ? (this._layoutPadding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._layoutPadding;
      }
      /**
          @memberof Treemap
          @desc If *comparator* is specified, sets the sort order for the treemap using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
          @param {Array} [*comparator*]
          @example
      function comparator(a, b) {
      return b.value - a.value;
      }
      */

    }, {
      key: "sort",
      value: function sort(_) {
        return arguments.length ? (this._sort = _, this) : this._sort;
      }
      /**
          @memberof Treemap
          @desc If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.
          @param {Function|Number} [*value*]
          @example
      function sum(d) {
      return d.sum;
      }
      */

    }, {
      key: "sum",
      value: function sum(_) {
        if (arguments.length) {
          this._sum = typeof _ === "function" ? _ : d3plusCommon.accessor(_);
          this._thresholdKey = this._sum;
          return this;
        } else return this._sum;
      }
      /**
          @memberof Treemap
          @desc If *value* is specified, sets the [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling) to the specified function and returns the current class instance. If *value* is not specified, returns the current [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling).
          @param {Function} [*value*]
      */

    }, {
      key: "tile",
      value: function tile(_) {
        return arguments.length ? (this._tile = _, this) : this._tile;
      }
    }]);

    return Treemap;
  }(d3plusViz.Viz);

  exports.Donut = Donut;
  exports.Pack = Pack;
  exports.Pie = Pie;
  exports.Tree = Tree;
  exports.Treemap = Treemap;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-hierarchy.js.map
