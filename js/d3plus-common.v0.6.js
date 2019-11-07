/*
  d3plus-common v0.6.60
  Common functions and methods used across D3plus modules.
  Copyright (c) 2019 D3plus - https://d3plus.org
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('windows-locale'), require('iso639-codes'), require('d3-selection'), require('d3-transition'), require('d3-array'), require('d3-collection')) :
  typeof define === 'function' && define.amd ? define('d3plus-common', ['exports', 'windows-locale', 'iso639-codes', 'd3-selection', 'd3-transition', 'd3-array', 'd3-collection'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.lcid, global.iso, global.d3Selection, global.d3Transition, global.d3Array, global.d3Collection));
}(this, function (exports, lcid, iso, d3Selection, d3Transition, d3Array, d3Collection) { 'use strict';

  lcid = lcid && lcid.hasOwnProperty('default') ? lcid['default'] : lcid;
  iso = iso && iso.hasOwnProperty('default') ? iso['default'] : iso;

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
  function accessor (key, def) {
    if (def === void 0) return function (d) {
      return d[key];
    };
    return function (d) {
      return d[key] === void 0 ? def : d[key];
    };
  }

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

  /**
      @function isObject
      @desc Detects if a variable is a javascript Object.
      @param {*} item
  */
  function isObject (item) {
    return item && _typeof(item) === "object" && (typeof window === "undefined" || item !== window && item !== window.document && !(item instanceof Element)) && !Array.isArray(item) ? true : false;
  }

  /**
      @function validObject
      @desc Determines if the object passed is the document or window.
      @param {Object} obj
      @private
  */

  function validObject(obj) {
    if (typeof window === "undefined") return true;else return obj !== window && obj !== document;
  }
  /**
      @function assign
      @desc A deeply recursive version of `Object.assign`.
      @param {...Object} objects
      @example <caption>this</caption>
  assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
      @example <caption>returns this</caption>
  {id: "bar", deep: {group: "A", value: 20}}
  */


  function assign() {
    var _arguments = arguments;
    var target = arguments.length <= 0 ? undefined : arguments[0];

    var _loop = function _loop(i) {
      var source = i < 0 || _arguments.length <= i ? undefined : _arguments[i];
      Object.keys(source).forEach(function (prop) {
        var value = source[prop];

        if (isObject(value) && validObject(value)) {
          if (target.hasOwnProperty(prop) && isObject(target[prop])) target[prop] = assign({}, target[prop], value);else target[prop] = assign({}, value);
        } else if (Array.isArray(value)) target[prop] = value.slice();else target[prop] = value;
      });
    };

    for (var i = 1; i < arguments.length; i++) {
      _loop(i);
    }

    return target;
  }

  /**
      @function attrize
      @desc Applies each key/value in an object as an attr.
      @param {D3selection} elem The D3 element to apply the styles to.
      @param {Object} attrs An object of key/value attr pairs.
  */
  function attrize (e) {
    var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var k in a) {
      if ({}.hasOwnProperty.call(a, k)) e.attr(k, a[k]);
    }
  }

  var locales = [];
  var isoKeys = Object.keys(iso);
  Object.keys(lcid).map(function (id) {
    var locale = lcid[id];
    var isoLanguage = isoKeys.find(function (name) {
      return name.toLowerCase() === locale.language.toLowerCase();
    });

    if (locale.location && isoLanguage) {
      var _locales$push;

      locales.push((_locales$push = {}, _defineProperty(_locales$push, "name", locale.language), _defineProperty(_locales$push, "location", locale.location), _defineProperty(_locales$push, "tag", locale.tag), _defineProperty(_locales$push, "lcid", locale.id), _defineProperty(_locales$push, "iso639-2", iso[isoLanguage]["iso639-2"]), _defineProperty(_locales$push, "iso639-1", iso[isoLanguage]["iso639-1"]), _locales$push));
    }
  });
  var defaultLocales = {
    ar: "ar-SA",
    ca: "ca-ES",
    da: "da-DK",
    en: "en-US",
    ko: "ko-KR",
    pa: "pa-IN",
    pt: "pt-BR",
    sv: "sv-SE"
  };
  /**
   * Converts a 2-digit language into a full language-LOCATION locale.
   * @param {String} locale
   */

  function findLocale (locale) {
    if (typeof locale !== "string" || locale.length === 5) return locale;
    if (defaultLocales[locale]) return defaultLocales[locale];
    var list = locales.filter(function (d) {
      return d["iso639-1"] === locale;
    });
    if (!list.length) return locale;else if (list.length === 1) return list[0].tag;else if (list.find(function (d) {
      return d.tag === "".concat(locale, "-").concat(locale.toUpperCase());
    })) return "".concat(locale, "-").concat(locale.toUpperCase());else return list[0].tag;
  }

  /**
      @function s
      @desc Returns 4 random characters, used for constructing unique identifiers.
      @private
  */
  function s() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  /**
      @function uuid
      @summary Returns a unique identifier.
  */


  function uuid () {
    return "".concat(s()).concat(s(), "-").concat(s(), "-").concat(s(), "-").concat(s(), "-").concat(s()).concat(s()).concat(s());
  }

  /**
      @constant RESET
      @desc String constant used to reset an individual config property.
  */
  var RESET = "D3PLUS-COMMON-RESET";

  var esES = {
    "and": "y",
    "Back": "Atrás",
    "Click to Expand": "Clic para Ampliar",
    "Click to Hide": "Clic para Ocultar",
    "Click to Highlight": "Clic para Resaltar",
    "Click to Reset": "Clic para Restablecer",
    "Download": "Descargar",
    "Loading Visualization": "Cargando Visualización",
    "No Data Available": "Datos No Disponibles",
    "Powered by D3plus": "Funciona con D3plus",
    "Share": "Porcentaje",
    "Shift+Click to Hide": "Mayús+Clic para Ocultar",
    "Total": "Total",
    "Values": "Valores"
  };

  var dictionaries = {
    "es-ES": esES
  };

  /**
      @desc Recursive function that resets nested Object configs.
      @param {Object} obj
      @param {Object} defaults
      @private
  */

  function nestedReset(obj, defaults) {
    if (isObject(obj)) {
      for (var nestedKey in obj) {
        if ({}.hasOwnProperty.call(obj, nestedKey) && !nestedKey.startsWith("_")) {
          var defaultValue = defaults && isObject(defaults) ? defaults[nestedKey] : undefined;

          if (obj[nestedKey] === RESET) {
            if (defaultValue) obj[nestedKey] = defaultValue;else delete obj[nestedKey];
          } else if (isObject(obj[nestedKey])) {
            nestedReset(obj[nestedKey], defaultValue);
          }
        }
      }
    }
  }
  /**
   * @desc finds all prototype methods of a class and it's parent classes
   * @param {*} obj
   * @private
   */


  function getAllMethods(obj) {
    var props = [];

    do {
      props = props.concat(Object.getOwnPropertyNames(obj));
      obj = Object.getPrototypeOf(obj);
    } while (obj && obj !== Object.prototype);

    return props.filter(function (e) {
      return e.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(e);
    });
  }
  /**
      @class BaseClass
      @summary An abstract class that contains some global methods and functionality.
  */


  var BaseClass =
  /*#__PURE__*/
  function () {
    /**
        @memberof BaseClass
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function BaseClass() {
      var _this = this;

      _classCallCheck(this, BaseClass);

      this._locale = "en-US";
      this._on = {};

      this._translate = function (d) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this._locale;
        var dictionary = dictionaries[locale];
        return dictionary && dictionary[d] ? dictionary[d] : d;
      };

      this._uuid = uuid();
    }
    /**
        @memberof BaseClass
        @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
        @param {Object} [*value*]
        @chainable
    */


    _createClass(BaseClass, [{
      key: "config",
      value: function config(_) {
        var _this2 = this;

        if (!this._configDefault) {
          var config = {};
          getAllMethods(this.__proto__).forEach(function (k) {
            var v = _this2[k]();

            config[k] = isObject(v) ? assign({}, v) : v;
          });
          this._configDefault = config;
        }

        if (arguments.length) {
          for (var k in _) {
            if ({}.hasOwnProperty.call(_, k) && k in this) {
              var v = _[k];

              if (v === RESET) {
                if (k === "on") this._on = this._configDefault[k];else this[k](this._configDefault[k]);
              } else {
                nestedReset(v, this._configDefault[k]);
                this[k](v);
              }
            }
          }

          return this;
        } else {
          var _config = {};
          getAllMethods(this.__proto__).forEach(function (k) {
            _config[k] = _this2[k]();
          });
          return _config;
        }
      }
      /**
          @memberof BaseClass
          @desc Sets the locale used for all text and number formatting. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). The locale can be defined as a complex Object (like in d3plus-format), a locale code (like "en-US"), or a 2-digit language code (like "en"). If a 2-digit code is provided, the "findLocale" function is used to identify the most approximate locale from d3plus-format.
          @param {Object|String} [*value* = "en-US"]
          @chainable
          @example
          {
            separator: "",
            suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
            grouping: [3],
            delimiters: {
              thousands: ",",
              decimal: "."
            },
            currency: ["$", ""]
          }
      */

    }, {
      key: "locale",
      value: function locale(_) {
        return arguments.length ? (this._locale = findLocale(_), this) : this._locale;
      }
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

    }, {
      key: "on",
      value: function on(_, f) {
        return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
      }
      /**
          @memberof BaseClass
          @desc Defines how informational text strings should be displayed. By default, this function will try to find the string in question (which is the first argument provided to this function) inside of an internally managed translation Object. If you'd like to override to use custom text, simply pass this method your own custom formatting function.
          @param {Function} [*value*]
          @chainable
          @example <caption>For example, if we wanted to only change the string "Back" and allow all other string to return in English:</caption>
      .translate(function(d) {
      return d === "Back" ? "Get outta here" : d;
      })
      */

    }, {
      key: "translate",
      value: function translate(_) {
        return arguments.length ? (this._translate = _, this) : this._translate;
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
        return arguments.length ? (this._shapeConfig = assign(this._shapeConfig, _), this) : this._shapeConfig;
      }
    }]);

    return BaseClass;
  }();

  /**
      @function closest
      @desc Finds the closest numeric value in an array.
      @param {Number} n The number value to use when searching the array.
      @param {Array} arr The array of values to test against.
  */
  function closest (n) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!arr || !(arr instanceof Array) || !arr.length) return undefined;
    return arr.reduce(function (prev, curr) {
      return Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev;
    });
  }

  /**
      @function configPrep
      @desc Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.
      @param {Object} [config = this._shapeConfig] The configuration object to parse.
      @param {String} [type = "shape"] The event classifier to user for "on" events. For example, the default event type of "shape" will apply all events in the "on" config object with that key, like "click.shape" and "mouseleave.shape", in addition to any gloval events like "click" and "mouseleave".
      @param {String} [nest] An optional nested key to bubble up to the parent config level.
  */
  function configPrep() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._shapeConfig;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "shape";
    var nest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var newConfig = {
      duration: this._duration,
      on: {}
    };

    var wrapFunction = function wrapFunction(func) {
      return function (d, i, s) {
        var parent;

        while (d.__d3plus__) {
          if (parent) d.__d3plusParent__ = parent;
          parent = d;
          i = d.i;
          d = d.data || d.feature;
        }

        return func.bind(_this)(d, i, s || parent);
      };
    };

    var parseEvents = function parseEvents(newObj, on) {
      for (var event in on) {
        if ({}.hasOwnProperty.call(on, event) && !event.includes(".") || event.includes(".".concat(type))) {
          newObj.on[event] = wrapFunction(on[event]);
        }
      }
    };

    var arrayEval = function arrayEval(arr) {
      return arr.map(function (d) {
        if (d instanceof Array) return arrayEval(d);else if (_typeof(d) === "object") return keyEval({}, d);else if (typeof d === "function") return wrapFunction(d);else return d;
      });
    };

    var keyEval = function keyEval(newObj, obj) {
      for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
          if (key === "on") parseEvents(newObj, obj[key]);else if (typeof obj[key] === "function") {
            newObj[key] = wrapFunction(obj[key]);
          } else if (obj[key] instanceof Array) {
            newObj[key] = arrayEval(obj[key]);
          } else if (_typeof(obj[key]) === "object") {
            newObj[key] = {
              on: {}
            };
            keyEval(newObj[key], obj[key]);
          } else newObj[key] = obj[key];
        }
      }
    };

    keyEval(newConfig, config);
    if (this._on) parseEvents(newConfig, this._on);

    if (nest && config[nest]) {
      keyEval(newConfig, config[nest]);
      if (config[nest].on) parseEvents(newConfig, config[nest].on);
    }

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
  function constant (value) {
    return function constant() {
      return value;
    };
  }

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

  function elem (selector, p) {
    // overrides default params
    p = Object.assign({}, {
      condition: true,
      enter: {},
      exit: {},
      parent: d3Selection.select("body"),
      transition: d3Transition.transition().duration(0),
      update: {}
    }, p);
    var className = /\.([^#]+)/g.exec(selector),
        id = /#([^\.]+)/g.exec(selector),
        tag = /^([^.^#]+)/g.exec(selector)[1];
    var elem = p.parent.selectAll(selector.includes(":") ? selector.split(":")[1] : selector).data(p.condition ? [null] : []);
    var enter = elem.enter().append(tag).call(attrize, p.enter);
    if (id) enter.attr("id", id[1]);
    if (className) enter.attr("class", className[1]);
    elem.exit().transition(p.transition).call(attrize, p.exit).remove();
    var update = enter.merge(elem);
    update.transition(p.transition).call(attrize, p.update);
    return update;
  }

  /**
      @function unique
      @desc ES5 implementation to reduce an Array of values to unique instances.
      @param {Array} objects The Array of objects to be filtered.
      @example <caption>this</caption>
  unique(["apple", "banana", "apple"]);
      @example <caption>returns this</caption>
  ["apple", "banana"]
  */
  function unique (arr) {
    return arr.filter(function (k, i, a) {
      return a.indexOf(k) === i;
    });
  }

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

  function objectMerge(objects) {
    var aggs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var availableKeys = unique(d3Array.merge(objects.map(function (o) {
      return d3Collection.keys(o);
    }))),
        newObject = {};
    availableKeys.forEach(function (k) {
      var values = objects.map(function (o) {
        return o[k];
      });
      var value;
      if (aggs[k]) value = aggs[k](values);else {
        var types = values.map(function (v) {
          return v || v === false ? v.constructor : v;
        }).filter(function (v) {
          return v !== void 0;
        });
        if (!types.length) value = undefined;else if (types.indexOf(Array) >= 0) {
          value = d3Array.merge(values.map(function (v) {
            return v instanceof Array ? v : [v];
          }));
          value = unique(value);
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(String) >= 0) {
          value = unique(values);
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(Number) >= 0) value = d3Array.sum(values);else if (types.indexOf(Object) >= 0) {
          value = unique(values.filter(function (v) {
            return v;
          }));
          if (value.length === 1) value = value[0];else value = objectMerge(value);
        } else {
          value = unique(values.filter(function (v) {
            return v !== void 0;
          }));
          if (value.length === 1) value = value[0];
        }
      }
      newObject[k] = value;
    });
    return newObject;
  }

  /**
   @function parseSides
   @desc Converts a string of directional CSS shorthand values into an object with the values expanded.
   @param {String|Number} sides The CSS shorthand string to expand.
   */
  function parseSides (sides) {
    var values;
    if (typeof sides === "number") values = [sides];else values = sides.split(/\s+/);
    if (values.length === 1) values = [values[0], values[0], values[0], values[0]];else if (values.length === 2) values = values.concat(values);else if (values.length === 3) values.push(values[1]);
    return ["top", "right", "bottom", "left"].reduce(function (acc, direction, i) {
      var value = parseFloat(values[i]);
      acc[direction] = value || 0;
      return acc;
    }, {});
  }

  /**
      @function prefix
      @desc Returns the appropriate CSS vendor prefix, given the current browser.
  */
  function prefix () {
    if ("-webkit-transform" in document.body.style) return "-webkit-";else if ("-moz-transform" in document.body.style) return "-moz-";else if ("-ms-transform" in document.body.style) return "-ms-";else if ("-o-transform" in document.body.style) return "-o-";else return "";
  }

  /**
      @function stylize
      @desc Applies each key/value in an object as a style.
      @param {D3selection} elem The D3 element to apply the styles to.
      @param {Object} styles An object of key/value style pairs.
  */
  function stylize (e) {
    var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var k in s) {
      if ({}.hasOwnProperty.call(s, k)) e.style(k, s[k]);
    }
  }

  exports.BaseClass = BaseClass;
  exports.RESET = RESET;
  exports.accessor = accessor;
  exports.assign = assign;
  exports.attrize = attrize;
  exports.closest = closest;
  exports.configPrep = configPrep;
  exports.constant = constant;
  exports.elem = elem;
  exports.findLocale = findLocale;
  exports.isObject = isObject;
  exports.merge = objectMerge;
  exports.parseSides = parseSides;
  exports.prefix = prefix;
  exports.stylize = stylize;
  exports.unique = unique;
  exports.uuid = uuid;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-common.js.map
