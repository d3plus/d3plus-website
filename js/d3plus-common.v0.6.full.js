/*
  d3plus-common v0.6.57
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3plus-common', ['exports'], factory) :
  (global = global || self, factory(global.d3plus = {}));
}(this, function (exports) {
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

  var aa = {
  	language: "Afar",
  	location: null,
  	id: 4096,
  	tag: "aa",
  	version: "Release 10"
  };
  var af = {
  	language: "Afrikaans",
  	location: null,
  	id: 54,
  	tag: "af",
  	version: "Release 7"
  };
  var agq = {
  	language: "Aghem",
  	location: null,
  	id: 4096,
  	tag: "agq",
  	version: "Release 10"
  };
  var ak = {
  	language: "Akan",
  	location: null,
  	id: 4096,
  	tag: "ak",
  	version: "Release 10"
  };
  var sq = {
  	language: "Albanian",
  	location: null,
  	id: 28,
  	tag: "sq",
  	version: "Release 7"
  };
  var gsw = {
  	language: "Alsatian",
  	location: null,
  	id: 132,
  	tag: "gsw",
  	version: "Release 7"
  };
  var am = {
  	language: "Amharic",
  	location: null,
  	id: 94,
  	tag: "am",
  	version: "Release 7"
  };
  var ar = {
  	language: "Arabic",
  	location: null,
  	id: 1,
  	tag: "ar",
  	version: "Release 7"
  };
  var hy = {
  	language: "Armenian",
  	location: null,
  	id: 43,
  	tag: "hy",
  	version: "Release 7"
  };
  var as = {
  	language: "Assamese",
  	location: null,
  	id: 77,
  	tag: "as",
  	version: "Release 7"
  };
  var ast = {
  	language: "Asturian",
  	location: null,
  	id: 4096,
  	tag: "ast",
  	version: "Release 10"
  };
  var asa = {
  	language: "Asu",
  	location: null,
  	id: 4096,
  	tag: "asa",
  	version: "Release 10"
  };
  var az = {
  	language: "Azerbaijani (Latin)",
  	location: null,
  	id: 44,
  	tag: "az",
  	version: "Release 7"
  };
  var ksf = {
  	language: "Bafia",
  	location: null,
  	id: 4096,
  	tag: "ksf",
  	version: "Release 10"
  };
  var bm = {
  	language: "Bamanankan",
  	location: null,
  	id: 4096,
  	tag: "bm",
  	version: "Release 10"
  };
  var bn = {
  	language: "Bangla",
  	location: null,
  	id: 69,
  	tag: "bn",
  	version: "Release 7"
  };
  var bas = {
  	language: "Basaa",
  	location: null,
  	id: 4096,
  	tag: "bas",
  	version: "Release 10"
  };
  var ba = {
  	language: "Bashkir",
  	location: null,
  	id: 109,
  	tag: "ba",
  	version: "Release 7"
  };
  var eu = {
  	language: "Basque",
  	location: null,
  	id: 45,
  	tag: "eu",
  	version: "Release 7"
  };
  var be = {
  	language: "Belarusian",
  	location: null,
  	id: 35,
  	tag: "be",
  	version: "Release 7"
  };
  var bem = {
  	language: "Bemba",
  	location: null,
  	id: 4096,
  	tag: "bem",
  	version: "Release 10"
  };
  var bez = {
  	language: "Bena",
  	location: null,
  	id: 4096,
  	tag: "bez",
  	version: "Release 10"
  };
  var byn = {
  	language: "Blin",
  	location: null,
  	id: 4096,
  	tag: "byn",
  	version: "Release 10"
  };
  var brx = {
  	language: "Bodo",
  	location: null,
  	id: 4096,
  	tag: "brx",
  	version: "Release 10"
  };
  var bs = {
  	language: "Bosnian (Latin)",
  	location: null,
  	id: 30746,
  	tag: "bs",
  	version: "Release 7"
  };
  var br = {
  	language: "Breton",
  	location: null,
  	id: 126,
  	tag: "br",
  	version: "Release 7"
  };
  var bg = {
  	language: "Bulgarian",
  	location: null,
  	id: 2,
  	tag: "bg",
  	version: "Release 7"
  };
  var my = {
  	language: "Burmese",
  	location: null,
  	id: 85,
  	tag: "my",
  	version: "Release 8.1"
  };
  var ca = {
  	language: "Catalan",
  	location: null,
  	id: 3,
  	tag: "ca",
  	version: "Release 7"
  };
  var ku = {
  	language: "Central Kurdish",
  	location: null,
  	id: 146,
  	tag: "ku",
  	version: "Release 8"
  };
  var chr = {
  	language: "Cherokee",
  	location: null,
  	id: 92,
  	tag: "chr",
  	version: "Release 8"
  };
  var cgg = {
  	language: "Chiga",
  	location: null,
  	id: 4096,
  	tag: "cgg",
  	version: "Release 10"
  };
  var zh = {
  	language: "Chinese (Simplified)",
  	location: null,
  	id: 30724,
  	tag: "zh",
  	version: "Windows 7"
  };
  var swc = {
  	language: "Congo Swahili",
  	location: null,
  	id: 4096,
  	tag: "swc",
  	version: "Release 10"
  };
  var kw = {
  	language: "Cornish",
  	location: null,
  	id: 4096,
  	tag: "kw",
  	version: "Release 10"
  };
  var co = {
  	language: "Corsican",
  	location: null,
  	id: 131,
  	tag: "co",
  	version: "Release 7"
  };
  var cs = {
  	language: "Czech",
  	location: null,
  	id: 5,
  	tag: "cs",
  	version: "Release 7"
  };
  var da = {
  	language: "Danish",
  	location: null,
  	id: 6,
  	tag: "da",
  	version: "Release 7"
  };
  var prs = {
  	language: "Dari",
  	location: null,
  	id: 140,
  	tag: "prs",
  	version: "Release 7"
  };
  var dv = {
  	language: "Divehi",
  	location: null,
  	id: 101,
  	tag: "dv",
  	version: "Release 7"
  };
  var dua = {
  	language: "Duala",
  	location: null,
  	id: 4096,
  	tag: "dua",
  	version: "Release 10"
  };
  var nl = {
  	language: "Dutch",
  	location: null,
  	id: 19,
  	tag: "nl",
  	version: "Release 7"
  };
  var dz = {
  	language: "Dzongkha",
  	location: null,
  	id: 4096,
  	tag: "dz",
  	version: "Release 10"
  };
  var ebu = {
  	language: "Embu",
  	location: null,
  	id: 4096,
  	tag: "ebu",
  	version: "Release 10"
  };
  var en = {
  	language: "English",
  	location: null,
  	id: 9,
  	tag: "en",
  	version: "Release 7"
  };
  var eo = {
  	language: "Esperanto",
  	location: null,
  	id: 4096,
  	tag: "eo",
  	version: "Release 10"
  };
  var et = {
  	language: "Estonian",
  	location: null,
  	id: 37,
  	tag: "et",
  	version: "Release 7"
  };
  var ee = {
  	language: "Ewe",
  	location: null,
  	id: 4096,
  	tag: "ee",
  	version: "Release 10"
  };
  var ewo = {
  	language: "Ewondo",
  	location: null,
  	id: 4096,
  	tag: "ewo",
  	version: "Release 10"
  };
  var fo = {
  	language: "Faroese",
  	location: null,
  	id: 56,
  	tag: "fo",
  	version: "Release 7"
  };
  var fil = {
  	language: "Filipino",
  	location: null,
  	id: 100,
  	tag: "fil",
  	version: "Release 7"
  };
  var fi = {
  	language: "Finnish",
  	location: null,
  	id: 11,
  	tag: "fi",
  	version: "Release 7"
  };
  var fr = {
  	language: "French",
  	location: null,
  	id: 12,
  	tag: "fr",
  	version: "Release 7"
  };
  var fy = {
  	language: "Frisian",
  	location: null,
  	id: 98,
  	tag: "fy",
  	version: "Release 7"
  };
  var fur = {
  	language: "Friulian",
  	location: null,
  	id: 4096,
  	tag: "fur",
  	version: "Release 10"
  };
  var ff = {
  	language: "Fulah",
  	location: null,
  	id: 103,
  	tag: "ff",
  	version: "Release 8"
  };
  var gl = {
  	language: "Galician",
  	location: null,
  	id: 86,
  	tag: "gl",
  	version: "Release 7"
  };
  var lg = {
  	language: "Ganda",
  	location: null,
  	id: 4096,
  	tag: "lg",
  	version: "Release 10"
  };
  var ka = {
  	language: "Georgian",
  	location: null,
  	id: 55,
  	tag: "ka",
  	version: "Release 7"
  };
  var de = {
  	language: "German",
  	location: null,
  	id: 7,
  	tag: "de",
  	version: "Release 7"
  };
  var el = {
  	language: "Greek",
  	location: null,
  	id: 8,
  	tag: "el",
  	version: "Release 7"
  };
  var kl = {
  	language: "Greenlandic",
  	location: null,
  	id: 111,
  	tag: "kl",
  	version: "Release 7"
  };
  var gn = {
  	language: "Guarani",
  	location: null,
  	id: 116,
  	tag: "gn",
  	version: "Release 8.1"
  };
  var gu = {
  	language: "Gujarati",
  	location: null,
  	id: 71,
  	tag: "gu",
  	version: "Release 7"
  };
  var guz = {
  	language: "Gusii",
  	location: null,
  	id: 4096,
  	tag: "guz",
  	version: "Release 10"
  };
  var ha = {
  	language: "Hausa (Latin)",
  	location: null,
  	id: 104,
  	tag: "ha",
  	version: "Release 7"
  };
  var haw = {
  	language: "Hawaiian",
  	location: null,
  	id: 117,
  	tag: "haw",
  	version: "Release 8"
  };
  var he = {
  	language: "Hebrew",
  	location: null,
  	id: 13,
  	tag: "he",
  	version: "Release 7"
  };
  var hi = {
  	language: "Hindi",
  	location: null,
  	id: 57,
  	tag: "hi",
  	version: "Release 7"
  };
  var hu = {
  	language: "Hungarian",
  	location: null,
  	id: 14,
  	tag: "hu",
  	version: "Release 7"
  };
  var is = {
  	language: "Icelandic",
  	location: null,
  	id: 15,
  	tag: "is",
  	version: "Release 7"
  };
  var ig = {
  	language: "Igbo",
  	location: null,
  	id: 112,
  	tag: "ig",
  	version: "Release 7"
  };
  var id = {
  	language: "Indonesian",
  	location: null,
  	id: 33,
  	tag: "id",
  	version: "Release 7"
  };
  var ia = {
  	language: "Interlingua",
  	location: null,
  	id: 4096,
  	tag: "ia",
  	version: "Release 10"
  };
  var iu = {
  	language: "Inuktitut (Latin)",
  	location: null,
  	id: 93,
  	tag: "iu",
  	version: "Release 7"
  };
  var ga = {
  	language: "Irish",
  	location: null,
  	id: 60,
  	tag: "ga",
  	version: "Windows 7"
  };
  var it = {
  	language: "Italian",
  	location: null,
  	id: 16,
  	tag: "it",
  	version: "Release 7"
  };
  var ja = {
  	language: "Japanese",
  	location: null,
  	id: 17,
  	tag: "ja",
  	version: "Release 7"
  };
  var jv = {
  	language: "Javanese",
  	location: null,
  	id: 4096,
  	tag: "jv",
  	version: "Release 8.1"
  };
  var dyo = {
  	language: "Jola-Fonyi",
  	location: null,
  	id: 4096,
  	tag: "dyo",
  	version: "Release 10"
  };
  var kea = {
  	language: "Kabuverdianu",
  	location: null,
  	id: 4096,
  	tag: "kea",
  	version: "Release 10"
  };
  var kab = {
  	language: "Kabyle",
  	location: null,
  	id: 4096,
  	tag: "kab",
  	version: "Release 10"
  };
  var kkj = {
  	language: "Kako",
  	location: null,
  	id: 4096,
  	tag: "kkj",
  	version: "Release 10"
  };
  var kln = {
  	language: "Kalenjin",
  	location: null,
  	id: 4096,
  	tag: "kln",
  	version: "Release 10"
  };
  var kam = {
  	language: "Kamba",
  	location: null,
  	id: 4096,
  	tag: "kam",
  	version: "Release 10"
  };
  var kn = {
  	language: "Kannada",
  	location: null,
  	id: 75,
  	tag: "kn",
  	version: "Release 7"
  };
  var ks = {
  	language: "Kashmiri",
  	location: null,
  	id: 96,
  	tag: "ks",
  	version: "Release 10"
  };
  var kk = {
  	language: "Kazakh",
  	location: null,
  	id: 63,
  	tag: "kk",
  	version: "Release 7"
  };
  var km = {
  	language: "Khmer",
  	location: null,
  	id: 83,
  	tag: "km",
  	version: "Release 7"
  };
  var quc = {
  	language: "K'iche",
  	location: null,
  	id: 134,
  	tag: "quc",
  	version: "Release 10"
  };
  var ki = {
  	language: "Kikuyu",
  	location: null,
  	id: 4096,
  	tag: "ki",
  	version: "Release 10"
  };
  var rw = {
  	language: "Kinyarwanda",
  	location: null,
  	id: 135,
  	tag: "rw",
  	version: "Release 7"
  };
  var sw = {
  	language: "Kiswahili",
  	location: null,
  	id: 65,
  	tag: "sw",
  	version: "Release 7"
  };
  var kok = {
  	language: "Konkani",
  	location: null,
  	id: 87,
  	tag: "kok",
  	version: "Release 7"
  };
  var ko = {
  	language: "Korean",
  	location: null,
  	id: 18,
  	tag: "ko",
  	version: "Release 7"
  };
  var khq = {
  	language: "Koyra Chiini",
  	location: null,
  	id: 4096,
  	tag: "khq",
  	version: "Release 10"
  };
  var ses = {
  	language: "Koyraboro Senni",
  	location: null,
  	id: 4096,
  	tag: "ses",
  	version: "Release 10"
  };
  var nmg = {
  	language: "Kwasio",
  	location: null,
  	id: 4096,
  	tag: "nmg",
  	version: "Release 10"
  };
  var ky = {
  	language: "Kyrgyz",
  	location: null,
  	id: 64,
  	tag: "ky",
  	version: "Release 7"
  };
  var lkt = {
  	language: "Lakota",
  	location: null,
  	id: 4096,
  	tag: "lkt",
  	version: "Release 10"
  };
  var lag = {
  	language: "Langi",
  	location: null,
  	id: 4096,
  	tag: "lag",
  	version: "Release 10"
  };
  var lo = {
  	language: "Lao",
  	location: null,
  	id: 84,
  	tag: "lo",
  	version: "Release 7"
  };
  var lv = {
  	language: "Latvian",
  	location: null,
  	id: 38,
  	tag: "lv",
  	version: "Release 7"
  };
  var ln = {
  	language: "Lingala",
  	location: null,
  	id: 4096,
  	tag: "ln",
  	version: "Release 10"
  };
  var lt = {
  	language: "Lithuanian",
  	location: null,
  	id: 39,
  	tag: "lt",
  	version: "Release 7"
  };
  var nds = {
  	language: "Low German",
  	location: null,
  	id: 4096,
  	tag: "nds",
  	version: "Release 10.2"
  };
  var dsb = {
  	language: "Lower Sorbian",
  	location: null,
  	id: 31790,
  	tag: "dsb",
  	version: "Windows 7"
  };
  var lu = {
  	language: "Luba-Katanga",
  	location: null,
  	id: 4096,
  	tag: "lu",
  	version: "Release 10"
  };
  var luo = {
  	language: "Luo",
  	location: null,
  	id: 4096,
  	tag: "luo",
  	version: "Release 10"
  };
  var lb = {
  	language: "Luxembourgish",
  	location: null,
  	id: 110,
  	tag: "lb",
  	version: "Release 7"
  };
  var luy = {
  	language: "Luyia",
  	location: null,
  	id: 4096,
  	tag: "luy",
  	version: "Release 10"
  };
  var mk = {
  	language: "Macedonian",
  	location: null,
  	id: 47,
  	tag: "mk",
  	version: "Release 7"
  };
  var jmc = {
  	language: "Machame",
  	location: null,
  	id: 4096,
  	tag: "jmc",
  	version: "Release 10"
  };
  var mgh = {
  	language: "Makhuwa-Meetto",
  	location: null,
  	id: 4096,
  	tag: "mgh",
  	version: "Release 10"
  };
  var kde = {
  	language: "Makonde",
  	location: null,
  	id: 4096,
  	tag: "kde",
  	version: "Release 10"
  };
  var mg = {
  	language: "Malagasy",
  	location: null,
  	id: 4096,
  	tag: "mg",
  	version: "Release 8.1"
  };
  var ms = {
  	language: "Malay",
  	location: null,
  	id: 62,
  	tag: "ms",
  	version: "Release 7"
  };
  var ml = {
  	language: "Malayalam",
  	location: null,
  	id: 76,
  	tag: "ml",
  	version: "Release 7"
  };
  var mt = {
  	language: "Maltese",
  	location: null,
  	id: 58,
  	tag: "mt",
  	version: "Release 7"
  };
  var gv = {
  	language: "Manx",
  	location: null,
  	id: 4096,
  	tag: "gv",
  	version: "Release 10"
  };
  var mi = {
  	language: "Maori",
  	location: null,
  	id: 129,
  	tag: "mi",
  	version: "Release 7"
  };
  var arn = {
  	language: "Mapudungun",
  	location: null,
  	id: 122,
  	tag: "arn",
  	version: "Release 7"
  };
  var mr = {
  	language: "Marathi",
  	location: null,
  	id: 78,
  	tag: "mr",
  	version: "Release 7"
  };
  var mas = {
  	language: "Masai",
  	location: null,
  	id: 4096,
  	tag: "mas",
  	version: "Release 10"
  };
  var mer = {
  	language: "Meru",
  	location: null,
  	id: 4096,
  	tag: "mer",
  	version: "Release 10"
  };
  var mgo = {
  	language: "Meta'",
  	location: null,
  	id: 4096,
  	tag: "mgo",
  	version: "Release 10"
  };
  var moh = {
  	language: "Mohawk",
  	location: null,
  	id: 124,
  	tag: "moh",
  	version: "Release 7"
  };
  var mn = {
  	language: "Mongolian (Cyrillic)",
  	location: null,
  	id: 80,
  	tag: "mn",
  	version: "Release 7"
  };
  var mfe = {
  	language: "Morisyen",
  	location: null,
  	id: 4096,
  	tag: "mfe",
  	version: "Release 10"
  };
  var mua = {
  	language: "Mundang",
  	location: null,
  	id: 4096,
  	tag: "mua",
  	version: "Release 10"
  };
  var nqo = {
  	language: "N'ko",
  	location: null,
  	id: 4096,
  	tag: "nqo",
  	version: "Release 8.1"
  };
  var naq = {
  	language: "Nama",
  	location: null,
  	id: 4096,
  	tag: "naq",
  	version: "Release 10"
  };
  var ne = {
  	language: "Nepali",
  	location: null,
  	id: 97,
  	tag: "ne",
  	version: "Release 7"
  };
  var nnh = {
  	language: "Ngiemboon",
  	location: null,
  	id: 4096,
  	tag: "nnh",
  	version: "Release 10"
  };
  var jgo = {
  	language: "Ngomba",
  	location: null,
  	id: 4096,
  	tag: "jgo",
  	version: "Release 10"
  };
  var nd = {
  	language: "North Ndebele",
  	location: null,
  	id: 4096,
  	tag: "nd",
  	version: "Release 10"
  };
  var no = {
  	language: "Norwegian (Bokmal)",
  	location: null,
  	id: 20,
  	tag: "no",
  	version: "Release 7"
  };
  var nb = {
  	language: "Norwegian (Bokmal)",
  	location: null,
  	id: 31764,
  	tag: "nb",
  	version: "Release 7"
  };
  var nn = {
  	language: "Norwegian (Nynorsk)",
  	location: null,
  	id: 30740,
  	tag: "nn",
  	version: "Release 7"
  };
  var nus = {
  	language: "Nuer",
  	location: null,
  	id: 4096,
  	tag: "nus",
  	version: "Release 10"
  };
  var nyn = {
  	language: "Nyankole",
  	location: null,
  	id: 4096,
  	tag: "nyn",
  	version: "Release 10"
  };
  var oc = {
  	language: "Occitan",
  	location: null,
  	id: 130,
  	tag: "oc",
  	version: "Release 7"
  };
  var or = {
  	language: "Odia",
  	location: null,
  	id: 72,
  	tag: "or",
  	version: "Release 7"
  };
  var om = {
  	language: "Oromo",
  	location: null,
  	id: 114,
  	tag: "om",
  	version: "Release 8.1"
  };
  var os = {
  	language: "Ossetian",
  	location: null,
  	id: 4096,
  	tag: "os",
  	version: "Release 10"
  };
  var ps = {
  	language: "Pashto",
  	location: null,
  	id: 99,
  	tag: "ps",
  	version: "Release 7"
  };
  var fa = {
  	language: "Persian",
  	location: null,
  	id: 41,
  	tag: "fa",
  	version: "Release 7"
  };
  var pl = {
  	language: "Polish",
  	location: null,
  	id: 21,
  	tag: "pl",
  	version: "Release 7"
  };
  var pt = {
  	language: "Portuguese",
  	location: null,
  	id: 22,
  	tag: "pt",
  	version: "Release 7"
  };
  var pa = {
  	language: "Punjabi",
  	location: null,
  	id: 70,
  	tag: "pa",
  	version: "Release 7"
  };
  var quz = {
  	language: "Quechua",
  	location: null,
  	id: 107,
  	tag: "quz",
  	version: "Release 7"
  };
  var ksh = {
  	language: "Ripuarian",
  	location: null,
  	id: 4096,
  	tag: "ksh",
  	version: "Release 10"
  };
  var ro = {
  	language: "Romanian",
  	location: null,
  	id: 24,
  	tag: "ro",
  	version: "Release 7"
  };
  var rm = {
  	language: "Romansh",
  	location: null,
  	id: 23,
  	tag: "rm",
  	version: "Release 7"
  };
  var rof = {
  	language: "Rombo",
  	location: null,
  	id: 4096,
  	tag: "rof",
  	version: "Release 10"
  };
  var rn = {
  	language: "Rundi",
  	location: null,
  	id: 4096,
  	tag: "rn",
  	version: "Release 10"
  };
  var ru = {
  	language: "Russian",
  	location: null,
  	id: 25,
  	tag: "ru",
  	version: "Release 7"
  };
  var rwk = {
  	language: "Rwa",
  	location: null,
  	id: 4096,
  	tag: "rwk",
  	version: "Release 10"
  };
  var ssy = {
  	language: "Saho",
  	location: null,
  	id: 4096,
  	tag: "ssy",
  	version: "Release 10"
  };
  var sah = {
  	language: "Sakha",
  	location: null,
  	id: 133,
  	tag: "sah",
  	version: "Release 7"
  };
  var saq = {
  	language: "Samburu",
  	location: null,
  	id: 4096,
  	tag: "saq",
  	version: "Release 10"
  };
  var smn = {
  	language: "Sami (Inari)",
  	location: null,
  	id: 28731,
  	tag: "smn",
  	version: "Windows 7"
  };
  var smj = {
  	language: "Sami (Lule)",
  	location: null,
  	id: 31803,
  	tag: "smj",
  	version: "Windows 7"
  };
  var se = {
  	language: "Sami (Northern)",
  	location: null,
  	id: 59,
  	tag: "se",
  	version: "Release 7"
  };
  var sms = {
  	language: "Sami (Skolt)",
  	location: null,
  	id: 29755,
  	tag: "sms",
  	version: "Windows 7"
  };
  var sma = {
  	language: "Sami (Southern)",
  	location: null,
  	id: 30779,
  	tag: "sma",
  	version: "Windows 7"
  };
  var sg = {
  	language: "Sango",
  	location: null,
  	id: 4096,
  	tag: "sg",
  	version: "Release 10"
  };
  var sbp = {
  	language: "Sangu",
  	location: null,
  	id: 4096,
  	tag: "sbp",
  	version: "Release 10"
  };
  var sa = {
  	language: "Sanskrit",
  	location: null,
  	id: 79,
  	tag: "sa",
  	version: "Release 7"
  };
  var gd = {
  	language: "Scottish Gaelic",
  	location: null,
  	id: 145,
  	tag: "gd",
  	version: "Windows 7"
  };
  var seh = {
  	language: "Sena",
  	location: null,
  	id: 4096,
  	tag: "seh",
  	version: "Release 10"
  };
  var sr = {
  	language: "Serbian (Latin)",
  	location: null,
  	id: 31770,
  	tag: "sr",
  	version: "Release 7"
  };
  var nso = {
  	language: "Sesotho sa Leboa",
  	location: null,
  	id: 108,
  	tag: "nso",
  	version: "Release 7"
  };
  var tn = {
  	language: "Setswana",
  	location: null,
  	id: 50,
  	tag: "tn",
  	version: "Release 7"
  };
  var ksb = {
  	language: "Shambala",
  	location: null,
  	id: 4096,
  	tag: "ksb",
  	version: "Release 10"
  };
  var sn = {
  	language: "Shona",
  	location: null,
  	id: 4096,
  	tag: "sn",
  	version: "Release 8.1"
  };
  var sd = {
  	language: "Sindhi",
  	location: null,
  	id: 89,
  	tag: "sd",
  	version: "Release 8"
  };
  var si = {
  	language: "Sinhala",
  	location: null,
  	id: 91,
  	tag: "si",
  	version: "Release 7"
  };
  var sk = {
  	language: "Slovak",
  	location: null,
  	id: 27,
  	tag: "sk",
  	version: "Release 7"
  };
  var sl = {
  	language: "Slovenian",
  	location: null,
  	id: 36,
  	tag: "sl",
  	version: "Release 7"
  };
  var xog = {
  	language: "Soga",
  	location: null,
  	id: 4096,
  	tag: "xog",
  	version: "Release 10"
  };
  var so = {
  	language: "Somali",
  	location: null,
  	id: 119,
  	tag: "so",
  	version: "Release 8.1"
  };
  var st = {
  	language: "Sotho",
  	location: null,
  	id: 48,
  	tag: "st",
  	version: "Release 8.1"
  };
  var nr = {
  	language: "South Ndebele",
  	location: null,
  	id: 4096,
  	tag: "nr",
  	version: "Release 10"
  };
  var es = {
  	language: "Spanish",
  	location: null,
  	id: 10,
  	tag: "es",
  	version: "Release 7"
  };
  var zgh = {
  	language: "Standard Moroccan ",
  	location: null,
  	id: 4096,
  	tag: "zgh",
  	version: "Release 8.1"
  };
  var ss = {
  	language: "Swati",
  	location: null,
  	id: 4096,
  	tag: "ss",
  	version: "Release 10"
  };
  var sv = {
  	language: "Swedish",
  	location: null,
  	id: 29,
  	tag: "sv",
  	version: "Release 7"
  };
  var syr = {
  	language: "Syriac",
  	location: null,
  	id: 90,
  	tag: "syr",
  	version: "Release 7"
  };
  var shi = {
  	language: "Tachelhit",
  	location: null,
  	id: 4096,
  	tag: "shi",
  	version: "Release 10"
  };
  var dav = {
  	language: "Taita",
  	location: null,
  	id: 4096,
  	tag: "dav",
  	version: "Release 10"
  };
  var tg = {
  	language: "Tajik (Cyrillic)",
  	location: null,
  	id: 40,
  	tag: "tg",
  	version: "Release 7"
  };
  var tzm = {
  	language: "Tamazight (Latin)",
  	location: null,
  	id: 95,
  	tag: "tzm",
  	version: "Release 7"
  };
  var ta = {
  	language: "Tamil",
  	location: null,
  	id: 73,
  	tag: "ta",
  	version: "Release 7"
  };
  var twq = {
  	language: "Tasawaq",
  	location: null,
  	id: 4096,
  	tag: "twq",
  	version: "Release 10"
  };
  var tt = {
  	language: "Tatar",
  	location: null,
  	id: 68,
  	tag: "tt",
  	version: "Release 7"
  };
  var te = {
  	language: "Telugu",
  	location: null,
  	id: 74,
  	tag: "te",
  	version: "Release 7"
  };
  var teo = {
  	language: "Teso",
  	location: null,
  	id: 4096,
  	tag: "teo",
  	version: "Release 10"
  };
  var th = {
  	language: "Thai",
  	location: null,
  	id: 30,
  	tag: "th",
  	version: "Release 7"
  };
  var bo = {
  	language: "Tibetan",
  	location: null,
  	id: 81,
  	tag: "bo",
  	version: "Release 7"
  };
  var tig = {
  	language: "Tigre",
  	location: null,
  	id: 4096,
  	tag: "tig",
  	version: "Release 10"
  };
  var ti = {
  	language: "Tigrinya",
  	location: null,
  	id: 115,
  	tag: "ti",
  	version: "Release 8"
  };
  var to = {
  	language: "Tongan",
  	location: null,
  	id: 4096,
  	tag: "to",
  	version: "Release 10"
  };
  var ts = {
  	language: "Tsonga",
  	location: null,
  	id: 49,
  	tag: "ts",
  	version: "Release 8.1"
  };
  var tr = {
  	language: "Turkish",
  	location: null,
  	id: 31,
  	tag: "tr",
  	version: "Release 7"
  };
  var tk = {
  	language: "Turkmen",
  	location: null,
  	id: 66,
  	tag: "tk",
  	version: "Release 7"
  };
  var uk = {
  	language: "Ukrainian",
  	location: null,
  	id: 34,
  	tag: "uk",
  	version: "Release 7"
  };
  var hsb = {
  	language: "Upper Sorbian",
  	location: null,
  	id: 46,
  	tag: "hsb",
  	version: "Release 7"
  };
  var ur = {
  	language: "Urdu",
  	location: null,
  	id: 32,
  	tag: "ur",
  	version: "Release 7"
  };
  var ug = {
  	language: "Uyghur",
  	location: null,
  	id: 128,
  	tag: "ug",
  	version: "Release 7"
  };
  var uz = {
  	language: "Uzbek (Latin)",
  	location: null,
  	id: 67,
  	tag: "uz",
  	version: "Release 7"
  };
  var vai = {
  	language: "Vai",
  	location: null,
  	id: 4096,
  	tag: "vai",
  	version: "Release 10"
  };
  var ve = {
  	language: "Venda",
  	location: null,
  	id: 51,
  	tag: "ve",
  	version: "Release 10"
  };
  var vi = {
  	language: "Vietnamese",
  	location: null,
  	id: 42,
  	tag: "vi",
  	version: "Release 7"
  };
  var vo = {
  	language: "Volapük",
  	location: null,
  	id: 4096,
  	tag: "vo",
  	version: "Release 10"
  };
  var vun = {
  	language: "Vunjo",
  	location: null,
  	id: 4096,
  	tag: "vun",
  	version: "Release 10"
  };
  var wae = {
  	language: "Walser",
  	location: null,
  	id: 4096,
  	tag: "wae",
  	version: "Release 10"
  };
  var cy = {
  	language: "Welsh",
  	location: null,
  	id: 82,
  	tag: "cy",
  	version: "Release 7"
  };
  var wal = {
  	language: "Wolaytta",
  	location: null,
  	id: 4096,
  	tag: "wal",
  	version: "Release 10"
  };
  var wo = {
  	language: "Wolof",
  	location: null,
  	id: 136,
  	tag: "wo",
  	version: "Release 7"
  };
  var xh = {
  	language: "Xhosa",
  	location: null,
  	id: 52,
  	tag: "xh",
  	version: "Release 7"
  };
  var yav = {
  	language: "Yangben",
  	location: null,
  	id: 4096,
  	tag: "yav",
  	version: "Release 10"
  };
  var ii = {
  	language: "Yi",
  	location: null,
  	id: 120,
  	tag: "ii",
  	version: "Release 7"
  };
  var yo = {
  	language: "Yoruba",
  	location: null,
  	id: 106,
  	tag: "yo",
  	version: "Release 7"
  };
  var dje = {
  	language: "Zarma",
  	location: null,
  	id: 4096,
  	tag: "dje",
  	version: "Release 10"
  };
  var zu = {
  	language: "Zulu",
  	location: null,
  	id: 53,
  	tag: "zu",
  	version: "Release 7"
  };
  var lcid = {
  	aa: aa,
  	"aa-dj": {
  	language: "Afar",
  	location: "Djibouti",
  	id: 4096,
  	tag: "aa-DJ",
  	version: "Release 10"
  },
  	"aa-er": {
  	language: "Afar",
  	location: "Eritrea",
  	id: 4096,
  	tag: "aa-ER",
  	version: "Release 10"
  },
  	"aa-et": {
  	language: "Afar",
  	location: "Ethiopia",
  	id: 4096,
  	tag: "aa-ET",
  	version: "Release 10"
  },
  	af: af,
  	"af-na": {
  	language: "Afrikaans",
  	location: "Namibia",
  	id: 4096,
  	tag: "af-NA",
  	version: "Release 10"
  },
  	"af-za": {
  	language: "Afrikaans",
  	location: "South Africa",
  	id: 1078,
  	tag: "af-ZA",
  	version: "Release B"
  },
  	agq: agq,
  	"agq-cm": {
  	language: "Aghem",
  	location: "Cameroon",
  	id: 4096,
  	tag: "agq-CM",
  	version: "Release 10"
  },
  	ak: ak,
  	"ak-gh": {
  	language: "Akan",
  	location: "Ghana",
  	id: 4096,
  	tag: "ak-GH",
  	version: "Release 10"
  },
  	sq: sq,
  	"sq-al": {
  	language: "Albanian",
  	location: "Albania",
  	id: 1052,
  	tag: "sq-AL",
  	version: "Release B"
  },
  	"sq-mk": {
  	language: "Albanian",
  	location: "North Macedonia",
  	id: 4096,
  	tag: "sq-MK",
  	version: "Release 10"
  },
  	gsw: gsw,
  	"gsw-fr": {
  	language: "Alsatian",
  	location: "France",
  	id: 1156,
  	tag: "gsw-FR",
  	version: "Release V"
  },
  	"gsw-li": {
  	language: "Alsatian",
  	location: "Liechtenstein",
  	id: 4096,
  	tag: "gsw-LI",
  	version: "Release 10"
  },
  	"gsw-ch": {
  	language: "Alsatian",
  	location: "Switzerland",
  	id: 4096,
  	tag: "gsw-CH",
  	version: "Release 10"
  },
  	am: am,
  	"am-et": {
  	language: "Amharic",
  	location: "Ethiopia",
  	id: 1118,
  	tag: "am-ET",
  	version: "Release V"
  },
  	ar: ar,
  	"ar-dz": {
  	language: "Arabic",
  	location: "Algeria",
  	id: 5121,
  	tag: "ar-DZ",
  	version: "Release B"
  },
  	"ar-bh": {
  	language: "Arabic",
  	location: "Bahrain",
  	id: 15361,
  	tag: "ar-BH",
  	version: "Release B"
  },
  	"ar-td": {
  	language: "Arabic",
  	location: "Chad",
  	id: 4096,
  	tag: "ar-TD",
  	version: "Release 10"
  },
  	"ar-km": {
  	language: "Arabic",
  	location: "Comoros",
  	id: 4096,
  	tag: "ar-KM",
  	version: "Release 10"
  },
  	"ar-dj": {
  	language: "Arabic",
  	location: "Djibouti",
  	id: 4096,
  	tag: "ar-DJ",
  	version: "Release 10"
  },
  	"ar-eg": {
  	language: "Arabic",
  	location: "Egypt",
  	id: 3073,
  	tag: "ar-EG",
  	version: "Release B"
  },
  	"ar-er": {
  	language: "Arabic",
  	location: "Eritrea",
  	id: 4096,
  	tag: "ar-ER",
  	version: "Release 10"
  },
  	"ar-iq": {
  	language: "Arabic",
  	location: "Iraq",
  	id: 2049,
  	tag: "ar-IQ",
  	version: "Release B"
  },
  	"ar-il": {
  	language: "Arabic",
  	location: "Israel",
  	id: 4096,
  	tag: "ar-IL",
  	version: "Release 10"
  },
  	"ar-jo": {
  	language: "Arabic",
  	location: "Jordan",
  	id: 11265,
  	tag: "ar-JO",
  	version: "Release B"
  },
  	"ar-kw": {
  	language: "Arabic",
  	location: "Kuwait",
  	id: 13313,
  	tag: "ar-KW",
  	version: "Release B"
  },
  	"ar-lb": {
  	language: "Arabic",
  	location: "Lebanon",
  	id: 12289,
  	tag: "ar-LB",
  	version: "Release B"
  },
  	"ar-ly": {
  	language: "Arabic",
  	location: "Libya",
  	id: 4097,
  	tag: "ar-LY",
  	version: "Release B"
  },
  	"ar-mr": {
  	language: "Arabic",
  	location: "Mauritania",
  	id: 4096,
  	tag: "ar-MR",
  	version: "Release 10"
  },
  	"ar-ma": {
  	language: "Arabic",
  	location: "Morocco",
  	id: 6145,
  	tag: "ar-MA",
  	version: "Release B"
  },
  	"ar-om": {
  	language: "Arabic",
  	location: "Oman",
  	id: 8193,
  	tag: "ar-OM",
  	version: "Release B"
  },
  	"ar-ps": {
  	language: "Arabic",
  	location: "Palestinian Authority",
  	id: 4096,
  	tag: "ar-PS",
  	version: "Release 10"
  },
  	"ar-qa": {
  	language: "Arabic",
  	location: "Qatar",
  	id: 16385,
  	tag: "ar-QA",
  	version: "Release B"
  },
  	"ar-sa": {
  	language: "Arabic",
  	location: "Saudi Arabia",
  	id: 1025,
  	tag: "ar-SA",
  	version: "Release B"
  },
  	"ar-so": {
  	language: "Arabic",
  	location: "Somalia",
  	id: 4096,
  	tag: "ar-SO",
  	version: "Release 10"
  },
  	"ar-ss": {
  	language: "Arabic",
  	location: "South Sudan",
  	id: 4096,
  	tag: "ar-SS",
  	version: "Release 10"
  },
  	"ar-sd": {
  	language: "Arabic",
  	location: "Sudan",
  	id: 4096,
  	tag: "ar-SD",
  	version: "Release 10"
  },
  	"ar-sy": {
  	language: "Arabic",
  	location: "Syria",
  	id: 10241,
  	tag: "ar-SY",
  	version: "Release B"
  },
  	"ar-tn": {
  	language: "Arabic",
  	location: "Tunisia",
  	id: 7169,
  	tag: "ar-TN",
  	version: "Release B"
  },
  	"ar-ae": {
  	language: "Arabic",
  	location: "U.A.E.",
  	id: 14337,
  	tag: "ar-AE",
  	version: "Release B"
  },
  	"ar-001": {
  	language: "Arabic",
  	location: "World",
  	id: 4096,
  	tag: "ar-001",
  	version: "Release 10"
  },
  	"ar-ye": {
  	language: "Arabic",
  	location: "Yemen",
  	id: 9217,
  	tag: "ar-YE",
  	version: "Release B"
  },
  	hy: hy,
  	"hy-am": {
  	language: "Armenian",
  	location: "Armenia",
  	id: 1067,
  	tag: "hy-AM",
  	version: "Release C"
  },
  	as: as,
  	"as-in": {
  	language: "Assamese",
  	location: "India",
  	id: 1101,
  	tag: "as-IN",
  	version: "Release V"
  },
  	ast: ast,
  	"ast-es": {
  	language: "Asturian",
  	location: "Spain",
  	id: 4096,
  	tag: "ast-ES",
  	version: "Release 10"
  },
  	asa: asa,
  	"asa-tz": {
  	language: "Asu",
  	location: "Tanzania",
  	id: 4096,
  	tag: "asa-TZ",
  	version: "Release 10"
  },
  	"az-cyrl": {
  	language: "Azerbaijani (Cyrillic)",
  	location: null,
  	id: 29740,
  	tag: "az-Cyrl",
  	version: "Windows 7"
  },
  	"az-cyrl-az": {
  	language: "Azerbaijani (Cyrillic)",
  	location: "Azerbaijan",
  	id: 2092,
  	tag: "az-Cyrl-AZ",
  	version: "Release C"
  },
  	az: az,
  	"az-latn": {
  	language: "Azerbaijani (Latin)",
  	location: null,
  	id: 30764,
  	tag: "az-Latn",
  	version: "Windows 7"
  },
  	"az-latn-az": {
  	language: "Azerbaijani (Latin)",
  	location: "Azerbaijan",
  	id: 1068,
  	tag: "az-Latn-AZ",
  	version: "Release C"
  },
  	ksf: ksf,
  	"ksf-cm": {
  	language: "Bafia",
  	location: "Cameroon",
  	id: 4096,
  	tag: "ksf-CM",
  	version: "Release 10"
  },
  	bm: bm,
  	"bm-latn-ml": {
  	language: "Bamanankan (Latin)",
  	location: "Mali",
  	id: 4096,
  	tag: "bm-Latn-ML",
  	version: "Release 10"
  },
  	bn: bn,
  	"bn-bd": {
  	language: "Bangla",
  	location: "Bangladesh",
  	id: 2117,
  	tag: "bn-BD",
  	version: "Release V"
  },
  	"bn-in": {
  	language: "Bangla",
  	location: "India",
  	id: 1093,
  	tag: "bn-IN",
  	version: "Release E1"
  },
  	bas: bas,
  	"bas-cm": {
  	language: "Basaa",
  	location: "Cameroon",
  	id: 4096,
  	tag: "bas-CM",
  	version: "Release 10"
  },
  	ba: ba,
  	"ba-ru": {
  	language: "Bashkir",
  	location: "Russia",
  	id: 1133,
  	tag: "ba-RU",
  	version: "Release V"
  },
  	eu: eu,
  	"eu-es": {
  	language: "Basque",
  	location: "Spain",
  	id: 1069,
  	tag: "eu-ES",
  	version: "Release B"
  },
  	be: be,
  	"be-by": {
  	language: "Belarusian",
  	location: "Belarus",
  	id: 1059,
  	tag: "be-BY",
  	version: "Release B"
  },
  	bem: bem,
  	"bem-zm": {
  	language: "Bemba",
  	location: "Zambia",
  	id: 4096,
  	tag: "bem-ZM",
  	version: "Release 10"
  },
  	bez: bez,
  	"bez-tz": {
  	language: "Bena",
  	location: "Tanzania",
  	id: 4096,
  	tag: "bez-TZ",
  	version: "Release 10"
  },
  	byn: byn,
  	"byn-er": {
  	language: "Blin",
  	location: "Eritrea",
  	id: 4096,
  	tag: "byn-ER",
  	version: "Release 10"
  },
  	brx: brx,
  	"brx-in": {
  	language: "Bodo",
  	location: "India",
  	id: 4096,
  	tag: "brx-IN",
  	version: "Release 10"
  },
  	"bs-cyrl": {
  	language: "Bosnian (Cyrillic)",
  	location: null,
  	id: 25626,
  	tag: "bs-Cyrl",
  	version: "Windows 7"
  },
  	"bs-cyrl-ba": {
  	language: "Bosnian (Cyrillic)",
  	location: "Bosnia and Herzegovina",
  	id: 8218,
  	tag: "bs-Cyrl-BA",
  	version: "Release E1"
  },
  	"bs-latn": {
  	language: "Bosnian (Latin)",
  	location: null,
  	id: 26650,
  	tag: "bs-Latn",
  	version: "Windows 7"
  },
  	bs: bs,
  	"bs-latn-ba": {
  	language: "Bosnian (Latin)",
  	location: "Bosnia and Herzegovina",
  	id: 5146,
  	tag: "bs-Latn-BA",
  	version: "Release E1"
  },
  	br: br,
  	"br-fr": {
  	language: "Breton",
  	location: "France",
  	id: 1150,
  	tag: "br-FR",
  	version: "Release V"
  },
  	bg: bg,
  	"bg-bg": {
  	language: "Bulgarian",
  	location: "Bulgaria",
  	id: 1026,
  	tag: "bg-BG",
  	version: "Release B"
  },
  	my: my,
  	"my-mm": {
  	language: "Burmese",
  	location: "Myanmar",
  	id: 1109,
  	tag: "my-MM",
  	version: "Release 8.1"
  },
  	ca: ca,
  	"ca-ad": {
  	language: "Catalan",
  	location: "Andorra",
  	id: 4096,
  	tag: "ca-AD",
  	version: "Release 10"
  },
  	"ca-fr": {
  	language: "Catalan",
  	location: "France",
  	id: 4096,
  	tag: "ca-FR",
  	version: "Release 10"
  },
  	"ca-it": {
  	language: "Catalan",
  	location: "Italy",
  	id: 4096,
  	tag: "ca-IT",
  	version: "Release 10"
  },
  	"ca-es": {
  	language: "Catalan",
  	location: "Spain",
  	id: 1027,
  	tag: "ca-ES",
  	version: "Release B"
  },
  	"tzm-latn-": {
  	language: "Central Atlas Tamazight ",
  	location: "Morocco",
  	id: 4096,
  	tag: "tzm-Latn-",
  	version: "Release 10"
  },
  	ku: ku,
  	"ku-arab": {
  	language: "Central Kurdish",
  	location: null,
  	id: 31890,
  	tag: "ku-Arab",
  	version: "Release 8"
  },
  	"ku-arab-iq": {
  	language: "Central Kurdish",
  	location: "Iraq",
  	id: 1170,
  	tag: "ku-Arab-IQ",
  	version: "Release 8"
  },
  	"cd-ru": {
  	language: "Chechen",
  	location: "Russia",
  	id: 4096,
  	tag: "cd-RU",
  	version: "Release 10.1"
  },
  	chr: chr,
  	"chr-cher": {
  	language: "Cherokee",
  	location: null,
  	id: 31836,
  	tag: "chr-Cher",
  	version: "Release 8"
  },
  	"chr-cher-us": {
  	language: "Cherokee",
  	location: "United States",
  	id: 1116,
  	tag: "chr-Cher-US",
  	version: "Release 8"
  },
  	cgg: cgg,
  	"cgg-ug": {
  	language: "Chiga",
  	location: "Uganda",
  	id: 4096,
  	tag: "cgg-UG",
  	version: "Release 10"
  },
  	"zh-hans": {
  	language: "Chinese (Simplified)",
  	location: null,
  	id: 4,
  	tag: "zh-Hans",
  	version: "Release A"
  },
  	zh: zh,
  	"zh-cn": {
  	language: "Chinese (Simplified)",
  	location: "People's Republic of China",
  	id: 2052,
  	tag: "zh-CN",
  	version: "Release A"
  },
  	"zh-sg": {
  	language: "Chinese (Simplified)",
  	location: "Singapore",
  	id: 4100,
  	tag: "zh-SG",
  	version: "Release A"
  },
  	"zh-hant": {
  	language: "Chinese (Traditional)",
  	location: null,
  	id: 31748,
  	tag: "zh-Hant",
  	version: "Release A"
  },
  	"zh-hk": {
  	language: "Chinese (Traditional)",
  	location: "Hong Kong S.A.R.",
  	id: 3076,
  	tag: "zh-HK",
  	version: "Release A"
  },
  	"zh-mo": {
  	language: "Chinese (Traditional)",
  	location: "Macao S.A.R.",
  	id: 5124,
  	tag: "zh-MO",
  	version: "Release D"
  },
  	"zh-tw": {
  	language: "Chinese (Traditional)",
  	location: "Taiwan",
  	id: 1028,
  	tag: "zh-TW",
  	version: "Release A"
  },
  	"cu-ru": {
  	language: "Church Slavic",
  	location: "Russia",
  	id: 4096,
  	tag: "cu-RU",
  	version: "Release 10.1"
  },
  	swc: swc,
  	"swc-cd": {
  	language: "Congo Swahili",
  	location: "Congo DRC",
  	id: 4096,
  	tag: "swc-CD",
  	version: "Release 10"
  },
  	kw: kw,
  	"kw-gb": {
  	language: "Cornish",
  	location: "United Kingdom",
  	id: 4096,
  	tag: "kw-GB",
  	version: "Release 10"
  },
  	co: co,
  	"co-fr": {
  	language: "Corsican",
  	location: "France",
  	id: 1155,
  	tag: "co-FR",
  	version: "Release V"
  },
  	"hr,": {
  	language: "Croatian",
  	location: null,
  	id: 26,
  	tag: "hr,",
  	version: "Release 7"
  },
  	"hr-hr": {
  	language: "Croatian",
  	location: "Croatia",
  	id: 1050,
  	tag: "hr-HR",
  	version: "Release A"
  },
  	"hr-ba": {
  	language: "Croatian (Latin)",
  	location: "Bosnia and Herzegovina",
  	id: 4122,
  	tag: "hr-BA",
  	version: "Release E1"
  },
  	cs: cs,
  	"cs-cz": {
  	language: "Czech",
  	location: "Czech Republic",
  	id: 1029,
  	tag: "cs-CZ",
  	version: "Release A"
  },
  	da: da,
  	"da-dk": {
  	language: "Danish",
  	location: "Denmark",
  	id: 1030,
  	tag: "da-DK",
  	version: "Release A"
  },
  	"da-gl": {
  	language: "Danish",
  	location: "Greenland",
  	id: 4096,
  	tag: "da-GL",
  	version: "Release 10"
  },
  	prs: prs,
  	"prs-af": {
  	language: "Dari",
  	location: "Afghanistan",
  	id: 1164,
  	tag: "prs-AF",
  	version: "Release V"
  },
  	dv: dv,
  	"dv-mv": {
  	language: "Divehi",
  	location: "Maldives",
  	id: 1125,
  	tag: "dv-MV",
  	version: "ReleaseD"
  },
  	dua: dua,
  	"dua-cm": {
  	language: "Duala",
  	location: "Cameroon",
  	id: 4096,
  	tag: "dua-CM",
  	version: "Release 10"
  },
  	nl: nl,
  	"nl-aw": {
  	language: "Dutch",
  	location: "Aruba",
  	id: 4096,
  	tag: "nl-AW",
  	version: "Release 10"
  },
  	"nl-be": {
  	language: "Dutch",
  	location: "Belgium",
  	id: 2067,
  	tag: "nl-BE",
  	version: "Release A"
  },
  	"nl-bq": {
  	language: "Dutch",
  	location: "Bonaire, Sint Eustatius and Saba",
  	id: 4096,
  	tag: "nl-BQ",
  	version: "Release 10"
  },
  	"nl-cw": {
  	language: "Dutch",
  	location: "Curaçao",
  	id: 4096,
  	tag: "nl-CW",
  	version: "Release 10"
  },
  	"nl-nl": {
  	language: "Dutch",
  	location: "Netherlands",
  	id: 1043,
  	tag: "nl-NL",
  	version: "Release A"
  },
  	"nl-sx": {
  	language: "Dutch",
  	location: "Sint Maarten",
  	id: 4096,
  	tag: "nl-SX",
  	version: "Release 10"
  },
  	"nl-sr": {
  	language: "Dutch",
  	location: "Suriname",
  	id: 4096,
  	tag: "nl-SR",
  	version: "Release 10"
  },
  	dz: dz,
  	"dz-bt": {
  	language: "Dzongkha",
  	location: "Bhutan",
  	id: 3153,
  	tag: "dz-BT",
  	version: "Release 10"
  },
  	ebu: ebu,
  	"ebu-ke": {
  	language: "Embu",
  	location: "Kenya",
  	id: 4096,
  	tag: "ebu-KE",
  	version: "Release 10"
  },
  	en: en,
  	"en-as": {
  	language: "English",
  	location: "American Samoa",
  	id: 4096,
  	tag: "en-AS",
  	version: "Release 10"
  },
  	"en-ai": {
  	language: "English",
  	location: "Anguilla",
  	id: 4096,
  	tag: "en-AI",
  	version: "Release 10"
  },
  	"en-ag": {
  	language: "English",
  	location: "Antigua and Barbuda",
  	id: 4096,
  	tag: "en-AG",
  	version: "Release 10"
  },
  	"en-au": {
  	language: "English",
  	location: "Australia",
  	id: 3081,
  	tag: "en-AU",
  	version: "Release A"
  },
  	"en-at": {
  	language: "English",
  	location: "Austria",
  	id: 4096,
  	tag: "en-AT",
  	version: "Release 10.1"
  },
  	"en-bs": {
  	language: "English",
  	location: "Bahamas",
  	id: 4096,
  	tag: "en-BS",
  	version: "Release 10"
  },
  	"en-bb": {
  	language: "English",
  	location: "Barbados",
  	id: 4096,
  	tag: "en-BB",
  	version: "Release 10"
  },
  	"en-be": {
  	language: "English",
  	location: "Belgium",
  	id: 4096,
  	tag: "en-BE",
  	version: "Release 10"
  },
  	"en-bz": {
  	language: "English",
  	location: "Belize",
  	id: 10249,
  	tag: "en-BZ",
  	version: "Release B"
  },
  	"en-bm": {
  	language: "English",
  	location: "Bermuda",
  	id: 4096,
  	tag: "en-BM",
  	version: "Release 10"
  },
  	"en-bw": {
  	language: "English",
  	location: "Botswana",
  	id: 4096,
  	tag: "en-BW",
  	version: "Release 10"
  },
  	"en-io": {
  	language: "English",
  	location: "British Indian Ocean Territory",
  	id: 4096,
  	tag: "en-IO",
  	version: "Release 10"
  },
  	"en-vg": {
  	language: "English",
  	location: "British Virgin Islands",
  	id: 4096,
  	tag: "en-VG",
  	version: "Release 10"
  },
  	"en-bi": {
  	language: "English",
  	location: "Burundi",
  	id: 4096,
  	tag: "en-BI",
  	version: "Release 10.1"
  },
  	"en-cm": {
  	language: "English",
  	location: "Cameroon",
  	id: 4096,
  	tag: "en-CM",
  	version: "Release 10"
  },
  	"en-ca": {
  	language: "English",
  	location: "Canada",
  	id: 4105,
  	tag: "en-CA",
  	version: "Release A"
  },
  	"en-029": {
  	language: "English",
  	location: "Caribbean",
  	id: 9225,
  	tag: "en-029",
  	version: "Release B"
  },
  	"en-ky": {
  	language: "English",
  	location: "Cayman Islands",
  	id: 4096,
  	tag: "en-KY",
  	version: "Release 10"
  },
  	"en-cx": {
  	language: "English",
  	location: "Christmas Island",
  	id: 4096,
  	tag: "en-CX",
  	version: "Release 10"
  },
  	"en-cc": {
  	language: "English",
  	location: "Cocos [Keeling] Islands",
  	id: 4096,
  	tag: "en-CC",
  	version: "Release 10"
  },
  	"en-ck": {
  	language: "English",
  	location: "Cook Islands",
  	id: 4096,
  	tag: "en-CK",
  	version: "Release 10"
  },
  	"en-cy": {
  	language: "English",
  	location: "Cyprus",
  	id: 4096,
  	tag: "en-CY",
  	version: "Release 10.1"
  },
  	"en-dk": {
  	language: "English",
  	location: "Denmark",
  	id: 4096,
  	tag: "en-DK",
  	version: "Release 10.1"
  },
  	"en-dm": {
  	language: "English",
  	location: "Dominica",
  	id: 4096,
  	tag: "en-DM",
  	version: "Release 10"
  },
  	"en-er": {
  	language: "English",
  	location: "Eritrea",
  	id: 4096,
  	tag: "en-ER",
  	version: "Release 10"
  },
  	"en-150": {
  	language: "English",
  	location: "Europe",
  	id: 4096,
  	tag: "en-150",
  	version: "Release 10"
  },
  	"en-fk": {
  	language: "English",
  	location: "Falkland Islands",
  	id: 4096,
  	tag: "en-FK",
  	version: "Release 10"
  },
  	"en-fi": {
  	language: "English",
  	location: "Finland",
  	id: 4096,
  	tag: "en-FI",
  	version: "Release 10.1"
  },
  	"en-fj": {
  	language: "English",
  	location: "Fiji",
  	id: 4096,
  	tag: "en-FJ",
  	version: "Release 10"
  },
  	"en-gm": {
  	language: "English",
  	location: "Gambia",
  	id: 4096,
  	tag: "en-GM",
  	version: "Release 10"
  },
  	"en-de": {
  	language: "English",
  	location: "Germany",
  	id: 4096,
  	tag: "en-DE",
  	version: "Release 10.1"
  },
  	"en-gh": {
  	language: "English",
  	location: "Ghana",
  	id: 4096,
  	tag: "en-GH",
  	version: "Release 10"
  },
  	"en-gi": {
  	language: "English",
  	location: "Gibraltar",
  	id: 4096,
  	tag: "en-GI",
  	version: "Release 10"
  },
  	"en-gd": {
  	language: "English",
  	location: "Grenada",
  	id: 4096,
  	tag: "en-GD",
  	version: "Release 10"
  },
  	"en-gu": {
  	language: "English",
  	location: "Guam",
  	id: 4096,
  	tag: "en-GU",
  	version: "Release 10"
  },
  	"en-gg": {
  	language: "English",
  	location: "Guernsey",
  	id: 4096,
  	tag: "en-GG",
  	version: "Release 10"
  },
  	"en-gy": {
  	language: "English",
  	location: "Guyana",
  	id: 4096,
  	tag: "en-GY",
  	version: "Release 10"
  },
  	"en-hk": {
  	language: "English",
  	location: "Hong Kong",
  	id: 15369,
  	tag: "en-HK",
  	version: "Release 8.1"
  },
  	"en-in": {
  	language: "English",
  	location: "India",
  	id: 16393,
  	tag: "en-IN",
  	version: "Release V"
  },
  	"en-ie": {
  	language: "English",
  	location: "Ireland",
  	id: 6153,
  	tag: "en-IE",
  	version: "Release A"
  },
  	"en-im": {
  	language: "English",
  	location: "Isle of Man",
  	id: 4096,
  	tag: "en-IM",
  	version: "Release 10"
  },
  	"en-il": {
  	language: "English",
  	location: "Israel",
  	id: 4096,
  	tag: "en-IL",
  	version: "Release 10.1"
  },
  	"en-jm": {
  	language: "English",
  	location: "Jamaica",
  	id: 8201,
  	tag: "en-JM",
  	version: "Release B"
  },
  	"en-je": {
  	language: "English",
  	location: "Jersey",
  	id: 4096,
  	tag: "en-JE",
  	version: "Release 10"
  },
  	"en-ke": {
  	language: "English",
  	location: "Kenya",
  	id: 4096,
  	tag: "en-KE",
  	version: "Release 10"
  },
  	"en-ki": {
  	language: "English",
  	location: "Kiribati",
  	id: 4096,
  	tag: "en-KI",
  	version: "Release 10"
  },
  	"en-ls": {
  	language: "English",
  	location: "Lesotho",
  	id: 4096,
  	tag: "en-LS",
  	version: "Release 10"
  },
  	"en-lr": {
  	language: "English",
  	location: "Liberia",
  	id: 4096,
  	tag: "en-LR",
  	version: "Release 10"
  },
  	"en-mo": {
  	language: "English",
  	location: "Macao SAR",
  	id: 4096,
  	tag: "en-MO",
  	version: "Release 10"
  },
  	"en-mg": {
  	language: "English",
  	location: "Madagascar",
  	id: 4096,
  	tag: "en-MG",
  	version: "Release 10"
  },
  	"en-mw": {
  	language: "English",
  	location: "Malawi",
  	id: 4096,
  	tag: "en-MW",
  	version: "Release 10"
  },
  	"en-my": {
  	language: "English",
  	location: "Malaysia",
  	id: 17417,
  	tag: "en-MY",
  	version: "Release V"
  },
  	"en-mt": {
  	language: "English",
  	location: "Malta",
  	id: 4096,
  	tag: "en-MT",
  	version: "Release 10"
  },
  	"en-mh": {
  	language: "English",
  	location: "Marshall Islands",
  	id: 4096,
  	tag: "en-MH",
  	version: "Release 10"
  },
  	"en-mu": {
  	language: "English",
  	location: "Mauritius",
  	id: 4096,
  	tag: "en-MU",
  	version: "Release 10"
  },
  	"en-fm": {
  	language: "English",
  	location: "Micronesia",
  	id: 4096,
  	tag: "en-FM",
  	version: "Release 10"
  },
  	"en-ms": {
  	language: "English",
  	location: "Montserrat",
  	id: 4096,
  	tag: "en-MS",
  	version: "Release 10"
  },
  	"en-na": {
  	language: "English",
  	location: "Namibia",
  	id: 4096,
  	tag: "en-NA",
  	version: "Release 10"
  },
  	"en-nr": {
  	language: "English",
  	location: "Nauru",
  	id: 4096,
  	tag: "en-NR",
  	version: "Release 10"
  },
  	"en-nl": {
  	language: "English",
  	location: "Netherlands",
  	id: 4096,
  	tag: "en-NL",
  	version: "Release 10.1"
  },
  	"en-nz": {
  	language: "English",
  	location: "New Zealand",
  	id: 5129,
  	tag: "en-NZ",
  	version: "Release A"
  },
  	"en-ng": {
  	language: "English",
  	location: "Nigeria",
  	id: 4096,
  	tag: "en-NG",
  	version: "Release 10"
  },
  	"en-nu": {
  	language: "English",
  	location: "Niue",
  	id: 4096,
  	tag: "en-NU",
  	version: "Release 10"
  },
  	"en-nf": {
  	language: "English",
  	location: "Norfolk Island",
  	id: 4096,
  	tag: "en-NF",
  	version: "Release 10"
  },
  	"en-mp": {
  	language: "English",
  	location: "Northern Mariana Islands",
  	id: 4096,
  	tag: "en-MP",
  	version: "Release 10"
  },
  	"en-pk": {
  	language: "English",
  	location: "Pakistan",
  	id: 4096,
  	tag: "en-PK",
  	version: "Release 10"
  },
  	"en-pw": {
  	language: "English",
  	location: "Palau",
  	id: 4096,
  	tag: "en-PW",
  	version: "Release 10"
  },
  	"en-pg": {
  	language: "English",
  	location: "Papua New Guinea",
  	id: 4096,
  	tag: "en-PG",
  	version: "Release 10"
  },
  	"en-pn": {
  	language: "English",
  	location: "Pitcairn Islands",
  	id: 4096,
  	tag: "en-PN",
  	version: "Release 10"
  },
  	"en-pr": {
  	language: "English",
  	location: "Puerto Rico",
  	id: 4096,
  	tag: "en-PR",
  	version: "Release 10"
  },
  	"en-ph": {
  	language: "English",
  	location: "Republic of the Philippines",
  	id: 13321,
  	tag: "en-PH",
  	version: "Release C"
  },
  	"en-rw": {
  	language: "English",
  	location: "Rwanda",
  	id: 4096,
  	tag: "en-RW",
  	version: "Release 10"
  },
  	"en-kn": {
  	language: "English",
  	location: "Saint Kitts and Nevis",
  	id: 4096,
  	tag: "en-KN",
  	version: "Release 10"
  },
  	"en-lc": {
  	language: "English",
  	location: "Saint Lucia",
  	id: 4096,
  	tag: "en-LC",
  	version: "Release 10"
  },
  	"en-vc": {
  	language: "English",
  	location: "Saint Vincent and the Grenadines",
  	id: 4096,
  	tag: "en-VC",
  	version: "Release 10"
  },
  	"en-ws": {
  	language: "English",
  	location: "Samoa",
  	id: 4096,
  	tag: "en-WS",
  	version: "Release 10"
  },
  	"en-sc": {
  	language: "English",
  	location: "Seychelles",
  	id: 4096,
  	tag: "en-SC",
  	version: "Release 10"
  },
  	"en-sl": {
  	language: "English",
  	location: "Sierra Leone",
  	id: 4096,
  	tag: "en-SL",
  	version: "Release 10"
  },
  	"en-sg": {
  	language: "English",
  	location: "Singapore",
  	id: 18441,
  	tag: "en-SG",
  	version: "Release V"
  },
  	"en-sx": {
  	language: "English",
  	location: "Sint Maarten",
  	id: 4096,
  	tag: "en-SX",
  	version: "Release 10"
  },
  	"en-si": {
  	language: "English",
  	location: "Slovenia",
  	id: 4096,
  	tag: "en-SI",
  	version: "Release 10.1"
  },
  	"en-sb": {
  	language: "English",
  	location: "Solomon Islands",
  	id: 4096,
  	tag: "en-SB",
  	version: "Release 10"
  },
  	"en-za": {
  	language: "English",
  	location: "South Africa",
  	id: 7177,
  	tag: "en-ZA",
  	version: "Release B"
  },
  	"en-ss": {
  	language: "English",
  	location: "South Sudan",
  	id: 4096,
  	tag: "en-SS",
  	version: "Release 10"
  },
  	"en-sh": {
  	language: "English",
  	location: "St Helena, Ascension, Tristan da ",
  	id: 4096,
  	tag: "en-SH",
  	version: "Release 10"
  },
  	"en-sd": {
  	language: "English",
  	location: "Sudan",
  	id: 4096,
  	tag: "en-SD",
  	version: "Release 10"
  },
  	"en-sz": {
  	language: "English",
  	location: "Swaziland",
  	id: 4096,
  	tag: "en-SZ",
  	version: "Release 10"
  },
  	"en-se": {
  	language: "English",
  	location: "Sweden",
  	id: 4096,
  	tag: "en-SE",
  	version: "Release 10.1"
  },
  	"en-ch": {
  	language: "English",
  	location: "Switzerland",
  	id: 4096,
  	tag: "en-CH",
  	version: "Release 10.1"
  },
  	"en-tz": {
  	language: "English",
  	location: "Tanzania",
  	id: 4096,
  	tag: "en-TZ",
  	version: "Release 10"
  },
  	"en-tk": {
  	language: "English",
  	location: "Tokelau",
  	id: 4096,
  	tag: "en-TK",
  	version: "Release 10"
  },
  	"en-to": {
  	language: "English",
  	location: "Tonga",
  	id: 4096,
  	tag: "en-TO",
  	version: "Release 10"
  },
  	"en-tt": {
  	language: "English",
  	location: "Trinidad and Tobago",
  	id: 11273,
  	tag: "en-TT",
  	version: "Release B"
  },
  	"en-tc": {
  	language: "English",
  	location: "Turks and Caicos Islands",
  	id: 4096,
  	tag: "en-TC",
  	version: "Release 10"
  },
  	"en-tv": {
  	language: "English",
  	location: "Tuvalu",
  	id: 4096,
  	tag: "en-TV",
  	version: "Release 10"
  },
  	"en-ug": {
  	language: "English",
  	location: "Uganda",
  	id: 4096,
  	tag: "en-UG",
  	version: "Release 10"
  },
  	"en-gb": {
  	language: "English",
  	location: "United Kingdom",
  	id: 2057,
  	tag: "en-GB",
  	version: "Release A"
  },
  	"en-us": {
  	language: "English",
  	location: "United States",
  	id: 1033,
  	tag: "en-US",
  	version: "Release A"
  },
  	"en-um": {
  	language: "English",
  	location: "US Minor Outlying Islands",
  	id: 4096,
  	tag: "en-UM",
  	version: "Release 10"
  },
  	"en-vi": {
  	language: "English",
  	location: "US Virgin Islands",
  	id: 4096,
  	tag: "en-VI",
  	version: "Release 10"
  },
  	"en-vu": {
  	language: "English",
  	location: "Vanuatu",
  	id: 4096,
  	tag: "en-VU",
  	version: "Release 10"
  },
  	"en-001": {
  	language: "English",
  	location: "World",
  	id: 4096,
  	tag: "en-001",
  	version: "Release 10"
  },
  	"en-zm": {
  	language: "English",
  	location: "Zambia",
  	id: 4096,
  	tag: "en-ZM",
  	version: "Release 10"
  },
  	"en-zw": {
  	language: "English",
  	location: "Zimbabwe",
  	id: 12297,
  	tag: "en-ZW",
  	version: "Release C"
  },
  	eo: eo,
  	"eo-001": {
  	language: "Esperanto",
  	location: "World",
  	id: 4096,
  	tag: "eo-001",
  	version: "Release 10"
  },
  	et: et,
  	"et-ee": {
  	language: "Estonian",
  	location: "Estonia",
  	id: 1061,
  	tag: "et-EE",
  	version: "Release B"
  },
  	ee: ee,
  	"ee-gh": {
  	language: "Ewe",
  	location: "Ghana",
  	id: 4096,
  	tag: "ee-GH",
  	version: "Release 10"
  },
  	"ee-tg": {
  	language: "Ewe",
  	location: "Togo",
  	id: 4096,
  	tag: "ee-TG",
  	version: "Release 10"
  },
  	ewo: ewo,
  	"ewo-cm": {
  	language: "Ewondo",
  	location: "Cameroon",
  	id: 4096,
  	tag: "ewo-CM",
  	version: "Release 10"
  },
  	fo: fo,
  	"fo-dk": {
  	language: "Faroese",
  	location: "Denmark",
  	id: 4096,
  	tag: "fo-DK",
  	version: "Release 10.1"
  },
  	"fo-fo": {
  	language: "Faroese",
  	location: "Faroe Islands",
  	id: 1080,
  	tag: "fo-FO",
  	version: "Release B"
  },
  	fil: fil,
  	"fil-ph": {
  	language: "Filipino",
  	location: "Philippines",
  	id: 1124,
  	tag: "fil-PH",
  	version: "Release E2"
  },
  	fi: fi,
  	"fi-fi": {
  	language: "Finnish",
  	location: "Finland",
  	id: 1035,
  	tag: "fi-FI",
  	version: "Release A"
  },
  	fr: fr,
  	"fr-dz": {
  	language: "French",
  	location: "Algeria",
  	id: 4096,
  	tag: "fr-DZ",
  	version: "Release 10"
  },
  	"fr-be": {
  	language: "French",
  	location: "Belgium",
  	id: 2060,
  	tag: "fr-BE",
  	version: "Release A"
  },
  	"fr-bj": {
  	language: "French",
  	location: "Benin",
  	id: 4096,
  	tag: "fr-BJ",
  	version: "Release 10"
  },
  	"fr-bf": {
  	language: "French",
  	location: "Burkina Faso",
  	id: 4096,
  	tag: "fr-BF",
  	version: "Release 10"
  },
  	"fr-bi": {
  	language: "French",
  	location: "Burundi",
  	id: 4096,
  	tag: "fr-BI",
  	version: "Release 10"
  },
  	"fr-cm": {
  	language: "French",
  	location: "Cameroon",
  	id: 11276,
  	tag: "fr-CM",
  	version: "Release 8.1"
  },
  	"fr-ca": {
  	language: "French",
  	location: "Canada",
  	id: 3084,
  	tag: "fr-CA",
  	version: "Release A"
  },
  	"fr-cf": {
  	language: "French",
  	location: "Central African Republic",
  	id: 4096,
  	tag: "fr-CF",
  	version: "Release 10"
  },
  	"fr-td": {
  	language: "French",
  	location: "Chad",
  	id: 4096,
  	tag: "fr-TD",
  	version: "Release 10"
  },
  	"fr-km": {
  	language: "French",
  	location: "Comoros",
  	id: 4096,
  	tag: "fr-KM",
  	version: "Release 10"
  },
  	"fr-cg": {
  	language: "French",
  	location: "Congo",
  	id: 4096,
  	tag: "fr-CG",
  	version: "Release 10"
  },
  	"fr-cd": {
  	language: "French",
  	location: "Congo, DRC",
  	id: 9228,
  	tag: "fr-CD",
  	version: "Release 8.1"
  },
  	"fr-ci": {
  	language: "French",
  	location: "Côte d'Ivoire",
  	id: 12300,
  	tag: "fr-CI",
  	version: "Release 8.1"
  },
  	"fr-dj": {
  	language: "French",
  	location: "Djibouti",
  	id: 4096,
  	tag: "fr-DJ",
  	version: "Release 10"
  },
  	"fr-gq": {
  	language: "French",
  	location: "Equatorial Guinea",
  	id: 4096,
  	tag: "fr-GQ",
  	version: "Release 10"
  },
  	"fr-fr": {
  	language: "French",
  	location: "France",
  	id: 1036,
  	tag: "fr-FR",
  	version: "Release A"
  },
  	"fr-gf": {
  	language: "French",
  	location: "French Guiana",
  	id: 4096,
  	tag: "fr-GF",
  	version: "Release 10"
  },
  	"fr-pf": {
  	language: "French",
  	location: "French Polynesia",
  	id: 4096,
  	tag: "fr-PF",
  	version: "Release 10"
  },
  	"fr-ga": {
  	language: "French",
  	location: "Gabon",
  	id: 4096,
  	tag: "fr-GA",
  	version: "Release 10"
  },
  	"fr-gp": {
  	language: "French",
  	location: "Guadeloupe",
  	id: 4096,
  	tag: "fr-GP",
  	version: "Release 10"
  },
  	"fr-gn": {
  	language: "French",
  	location: "Guinea",
  	id: 4096,
  	tag: "fr-GN",
  	version: "Release 10"
  },
  	"fr-ht": {
  	language: "French",
  	location: "Haiti",
  	id: 15372,
  	tag: "fr-HT",
  	version: "Release 8.1"
  },
  	"fr-lu": {
  	language: "French",
  	location: "Luxembourg",
  	id: 5132,
  	tag: "fr-LU",
  	version: "Release A"
  },
  	"fr-mg": {
  	language: "French",
  	location: "Madagascar",
  	id: 4096,
  	tag: "fr-MG",
  	version: "Release 10"
  },
  	"fr-ml": {
  	language: "French",
  	location: "Mali",
  	id: 13324,
  	tag: "fr-ML",
  	version: "Release 8.1"
  },
  	"fr-mq": {
  	language: "French",
  	location: "Martinique",
  	id: 4096,
  	tag: "fr-MQ",
  	version: "Release 10"
  },
  	"fr-mr": {
  	language: "French",
  	location: "Mauritania",
  	id: 4096,
  	tag: "fr-MR",
  	version: "Release 10"
  },
  	"fr-mu": {
  	language: "French",
  	location: "Mauritius",
  	id: 4096,
  	tag: "fr-MU",
  	version: "Release 10"
  },
  	"fr-yt": {
  	language: "French",
  	location: "Mayotte",
  	id: 4096,
  	tag: "fr-YT",
  	version: "Release 10"
  },
  	"fr-ma": {
  	language: "French",
  	location: "Morocco",
  	id: 14348,
  	tag: "fr-MA",
  	version: "Release 8.1"
  },
  	"fr-nc": {
  	language: "French",
  	location: "New Caledonia",
  	id: 4096,
  	tag: "fr-NC",
  	version: "Release 10"
  },
  	"fr-ne": {
  	language: "French",
  	location: "Niger",
  	id: 4096,
  	tag: "fr-NE",
  	version: "Release 10"
  },
  	"fr-mc": {
  	language: "French",
  	location: "Principality of Monaco",
  	id: 6156,
  	tag: "fr-MC",
  	version: "Release A"
  },
  	"fr-re": {
  	language: "French",
  	location: "Reunion",
  	id: 8204,
  	tag: "fr-RE",
  	version: "Release 8.1"
  },
  	"fr-rw": {
  	language: "French",
  	location: "Rwanda",
  	id: 4096,
  	tag: "fr-RW",
  	version: "Release 10"
  },
  	"fr-bl": {
  	language: "French",
  	location: "Saint Barthélemy",
  	id: 4096,
  	tag: "fr-BL",
  	version: "Release 10"
  },
  	"fr-mf": {
  	language: "French",
  	location: "Saint Martin",
  	id: 4096,
  	tag: "fr-MF",
  	version: "Release 10"
  },
  	"fr-pm": {
  	language: "French",
  	location: "Saint Pierre and Miquelon",
  	id: 4096,
  	tag: "fr-PM",
  	version: "Release 10"
  },
  	"fr-sn": {
  	language: "French",
  	location: "Senegal",
  	id: 10252,
  	tag: "fr-SN",
  	version: "Release 8.1"
  },
  	"fr-sc": {
  	language: "French",
  	location: "Seychelles",
  	id: 4096,
  	tag: "fr-SC",
  	version: "Release 10"
  },
  	"fr-ch": {
  	language: "French",
  	location: "Switzerland",
  	id: 4108,
  	tag: "fr-CH",
  	version: "Release A"
  },
  	"fr-sy": {
  	language: "French",
  	location: "Syria",
  	id: 4096,
  	tag: "fr-SY",
  	version: "Release 10"
  },
  	"fr-tg": {
  	language: "French",
  	location: "Togo",
  	id: 4096,
  	tag: "fr-TG",
  	version: "Release 10"
  },
  	"fr-tn": {
  	language: "French",
  	location: "Tunisia",
  	id: 4096,
  	tag: "fr-TN",
  	version: "Release 10"
  },
  	"fr-vu": {
  	language: "French",
  	location: "Vanuatu",
  	id: 4096,
  	tag: "fr-VU",
  	version: "Release 10"
  },
  	"fr-wf": {
  	language: "French",
  	location: "Wallis and Futuna",
  	id: 4096,
  	tag: "fr-WF",
  	version: "Release 10"
  },
  	fy: fy,
  	"fy-nl": {
  	language: "Frisian",
  	location: "Netherlands",
  	id: 1122,
  	tag: "fy-NL",
  	version: "Release E2"
  },
  	fur: fur,
  	"fur-it": {
  	language: "Friulian",
  	location: "Italy",
  	id: 4096,
  	tag: "fur-IT",
  	version: "Release 10"
  },
  	ff: ff,
  	"ff-latn": {
  	language: "Fulah (Latin)",
  	location: null,
  	id: 31847,
  	tag: "ff-Latn",
  	version: "Release 8"
  },
  	"ff-latn-bf": {
  	language: "Fulah (Latin)",
  	location: "Burkina Faso",
  	id: 4096,
  	tag: "ff-Latn-BF",
  	version: "Release 10.4"
  },
  	"ff-cm": {
  	language: "Fulah",
  	location: "Cameroon",
  	id: 4096,
  	tag: "ff-CM",
  	version: "Release 10"
  },
  	"ff-latn-cm": {
  	language: "Fulah (Latin)",
  	location: "Cameroon",
  	id: 4096,
  	tag: "ff-Latn-CM",
  	version: "Release 10.4"
  },
  	"ff-latn-gm": {
  	language: "Fulah (Latin)",
  	location: "Gambia",
  	id: 4096,
  	tag: "ff-Latn-GM",
  	version: "Release 10.4"
  },
  	"ff-latn-gh": {
  	language: "Fulah (Latin)",
  	location: "Ghana",
  	id: 4096,
  	tag: "ff-Latn-GH",
  	version: "Release 10.4"
  },
  	"ff-gn": {
  	language: "Fulah",
  	location: "Guinea",
  	id: 4096,
  	tag: "ff-GN",
  	version: "Release 10"
  },
  	"ff-latn-gn": {
  	language: "Fulah (Latin)",
  	location: "Guinea",
  	id: 4096,
  	tag: "ff-Latn-GN",
  	version: "Release 10.4"
  },
  	"ff-latn-gw": {
  	language: "Fulah (Latin)",
  	location: "Guinea-Bissau",
  	id: 4096,
  	tag: "ff-Latn-GW",
  	version: "Release 10.4"
  },
  	"ff-latn-lr": {
  	language: "Fulah (Latin)",
  	location: "Liberia",
  	id: 4096,
  	tag: "ff-Latn-LR",
  	version: "Release 10.4"
  },
  	"ff-mr": {
  	language: "Fulah",
  	location: "Mauritania",
  	id: 4096,
  	tag: "ff-MR",
  	version: "Release 10"
  },
  	"ff-latn-mr": {
  	language: "Fulah (Latin)",
  	location: "Mauritania",
  	id: 4096,
  	tag: "ff-Latn-MR",
  	version: "Release 10.4"
  },
  	"ff-latn-ne": {
  	language: "Fulah (Latin)",
  	location: "Niger",
  	id: 4096,
  	tag: "ff-Latn-NE",
  	version: "Release 10.4"
  },
  	"ff-ng": {
  	language: "Fulah",
  	location: "Nigeria",
  	id: 4096,
  	tag: "ff-NG",
  	version: "Release 10"
  },
  	"ff-latn-ng": {
  	language: "Fulah (Latin)",
  	location: "Nigeria",
  	id: 4096,
  	tag: "ff-Latn-NG",
  	version: "Release 10.4"
  },
  	"ff-latn-sn": {
  	language: "Fulah",
  	location: "Senegal",
  	id: 2151,
  	tag: "ff-Latn-SN",
  	version: "Release 8"
  },
  	"ff-latn-sl": {
  	language: "Fulah (Latin)",
  	location: "Sierra Leone",
  	id: 4096,
  	tag: "ff-Latn-SL",
  	version: "Release 10.4"
  },
  	gl: gl,
  	"gl-es": {
  	language: "Galician",
  	location: "Spain",
  	id: 1110,
  	tag: "gl-ES",
  	version: "Release D"
  },
  	lg: lg,
  	"lg-ug": {
  	language: "Ganda",
  	location: "Uganda",
  	id: 4096,
  	tag: "lg-UG",
  	version: "Release 10"
  },
  	ka: ka,
  	"ka-ge": {
  	language: "Georgian",
  	location: "Georgia",
  	id: 1079,
  	tag: "ka-GE",
  	version: "Release C"
  },
  	de: de,
  	"de-at": {
  	language: "German",
  	location: "Austria",
  	id: 3079,
  	tag: "de-AT",
  	version: "Release A"
  },
  	"de-be": {
  	language: "German",
  	location: "Belgium",
  	id: 4096,
  	tag: "de-BE",
  	version: "Release 10"
  },
  	"de-de": {
  	language: "German",
  	location: "Germany",
  	id: 1031,
  	tag: "de-DE",
  	version: "Release A"
  },
  	"de-it": {
  	language: "German",
  	location: "Italy",
  	id: 4096,
  	tag: "de-IT",
  	version: "Release 10.2"
  },
  	"de-li": {
  	language: "German",
  	location: "Liechtenstein",
  	id: 5127,
  	tag: "de-LI",
  	version: "Release B"
  },
  	"de-lu": {
  	language: "German",
  	location: "Luxembourg",
  	id: 4103,
  	tag: "de-LU",
  	version: "Release B"
  },
  	"de-ch": {
  	language: "German",
  	location: "Switzerland",
  	id: 2055,
  	tag: "de-CH",
  	version: "Release A"
  },
  	el: el,
  	"el-cy": {
  	language: "Greek",
  	location: "Cyprus",
  	id: 4096,
  	tag: "el-CY",
  	version: "Release 10"
  },
  	"el-gr": {
  	language: "Greek",
  	location: "Greece",
  	id: 1032,
  	tag: "el-GR",
  	version: "Release A"
  },
  	kl: kl,
  	"kl-gl": {
  	language: "Greenlandic",
  	location: "Greenland",
  	id: 1135,
  	tag: "kl-GL",
  	version: "Release V"
  },
  	gn: gn,
  	"gn-py": {
  	language: "Guarani",
  	location: "Paraguay",
  	id: 1140,
  	tag: "gn-PY",
  	version: "Release 8.1"
  },
  	gu: gu,
  	"gu-in": {
  	language: "Gujarati",
  	location: "India",
  	id: 1095,
  	tag: "gu-IN",
  	version: "Release D"
  },
  	guz: guz,
  	"guz-ke": {
  	language: "Gusii",
  	location: "Kenya",
  	id: 4096,
  	tag: "guz-KE",
  	version: "Release 10"
  },
  	ha: ha,
  	"ha-latn": {
  	language: "Hausa (Latin)",
  	location: null,
  	id: 31848,
  	tag: "ha-Latn",
  	version: "Windows 7"
  },
  	"ha-latn-gh": {
  	language: "Hausa (Latin)",
  	location: "Ghana",
  	id: 4096,
  	tag: "ha-Latn-GH",
  	version: "Release 10"
  },
  	"ha-latn-ne": {
  	language: "Hausa (Latin)",
  	location: "Niger",
  	id: 4096,
  	tag: "ha-Latn-NE",
  	version: "Release 10"
  },
  	"ha-latn-ng": {
  	language: "Hausa (Latin)",
  	location: "Nigeria",
  	id: 1128,
  	tag: "ha-Latn-NG",
  	version: "Release V"
  },
  	haw: haw,
  	"haw-us": {
  	language: "Hawaiian",
  	location: "United States",
  	id: 1141,
  	tag: "haw-US",
  	version: "Release 8"
  },
  	he: he,
  	"he-il": {
  	language: "Hebrew",
  	location: "Israel",
  	id: 1037,
  	tag: "he-IL",
  	version: "Release B"
  },
  	hi: hi,
  	"hi-in": {
  	language: "Hindi",
  	location: "India",
  	id: 1081,
  	tag: "hi-IN",
  	version: "Release C"
  },
  	hu: hu,
  	"hu-hu": {
  	language: "Hungarian",
  	location: "Hungary",
  	id: 1038,
  	tag: "hu-HU",
  	version: "Release A"
  },
  	is: is,
  	"is-is": {
  	language: "Icelandic",
  	location: "Iceland",
  	id: 1039,
  	tag: "is-IS",
  	version: "Release A"
  },
  	ig: ig,
  	"ig-ng": {
  	language: "Igbo",
  	location: "Nigeria",
  	id: 1136,
  	tag: "ig-NG",
  	version: "Release V"
  },
  	id: id,
  	"id-id": {
  	language: "Indonesian",
  	location: "Indonesia",
  	id: 1057,
  	tag: "id-ID",
  	version: "Release B"
  },
  	ia: ia,
  	"ia-fr": {
  	language: "Interlingua",
  	location: "France",
  	id: 4096,
  	tag: "ia-FR",
  	version: "Release 10"
  },
  	"ia-001": {
  	language: "Interlingua",
  	location: "World",
  	id: 4096,
  	tag: "ia-001",
  	version: "Release 10"
  },
  	iu: iu,
  	"iu-latn": {
  	language: "Inuktitut (Latin)",
  	location: null,
  	id: 31837,
  	tag: "iu-Latn",
  	version: "Windows 7"
  },
  	"iu-latn-ca": {
  	language: "Inuktitut (Latin)",
  	location: "Canada",
  	id: 2141,
  	tag: "iu-Latn-CA",
  	version: "Release E2"
  },
  	"iu-cans": {
  	language: "Inuktitut (Syllabics)",
  	location: null,
  	id: 30813,
  	tag: "iu-Cans",
  	version: "Windows 7"
  },
  	"iu-cans-ca": {
  	language: "Inuktitut (Syllabics)",
  	location: "Canada",
  	id: 1117,
  	tag: "iu-Cans-CA",
  	version: "Release V"
  },
  	ga: ga,
  	"ga-ie": {
  	language: "Irish",
  	location: "Ireland",
  	id: 2108,
  	tag: "ga-IE",
  	version: "Release E2"
  },
  	it: it,
  	"it-it": {
  	language: "Italian",
  	location: "Italy",
  	id: 1040,
  	tag: "it-IT",
  	version: "Release A"
  },
  	"it-sm": {
  	language: "Italian",
  	location: "San Marino",
  	id: 4096,
  	tag: "it-SM",
  	version: "Release 10"
  },
  	"it-ch": {
  	language: "Italian",
  	location: "Switzerland",
  	id: 2064,
  	tag: "it-CH",
  	version: "Release A"
  },
  	"it-va": {
  	language: "Italian",
  	location: "Vatican City",
  	id: 4096,
  	tag: "it-VA",
  	version: "Release 10.3"
  },
  	ja: ja,
  	"ja-jp": {
  	language: "Japanese",
  	location: "Japan",
  	id: 1041,
  	tag: "ja-JP",
  	version: "Release A"
  },
  	jv: jv,
  	"jv-latn": {
  	language: "Javanese",
  	location: "Latin",
  	id: 4096,
  	tag: "jv-Latn",
  	version: "Release 8.1"
  },
  	"jv-latn-id": {
  	language: "Javanese",
  	location: "Latin, Indonesia",
  	id: 4096,
  	tag: "jv-Latn-ID",
  	version: "Release 8.1"
  },
  	dyo: dyo,
  	"dyo-sn": {
  	language: "Jola-Fonyi",
  	location: "Senegal",
  	id: 4096,
  	tag: "dyo-SN",
  	version: "Release 10"
  },
  	kea: kea,
  	"kea-cv": {
  	language: "Kabuverdianu",
  	location: "Cabo Verde",
  	id: 4096,
  	tag: "kea-CV",
  	version: "Release 10"
  },
  	kab: kab,
  	"kab-dz": {
  	language: "Kabyle",
  	location: "Algeria",
  	id: 4096,
  	tag: "kab-DZ",
  	version: "Release 10"
  },
  	kkj: kkj,
  	"kkj-cm": {
  	language: "Kako",
  	location: "Cameroon",
  	id: 4096,
  	tag: "kkj-CM",
  	version: "Release 10"
  },
  	kln: kln,
  	"kln-ke": {
  	language: "Kalenjin",
  	location: "Kenya",
  	id: 4096,
  	tag: "kln-KE",
  	version: "Release 10"
  },
  	kam: kam,
  	"kam-ke": {
  	language: "Kamba",
  	location: "Kenya",
  	id: 4096,
  	tag: "kam-KE",
  	version: "Release 10"
  },
  	kn: kn,
  	"kn-in": {
  	language: "Kannada",
  	location: "India",
  	id: 1099,
  	tag: "kn-IN",
  	version: "Release D"
  },
  	ks: ks,
  	"ks-arab": {
  	language: "Kashmiri",
  	location: "Perso-Arabic",
  	id: 1120,
  	tag: "ks-Arab",
  	version: "Release 10"
  },
  	"ks-arab-in": {
  	language: "Kashmiri",
  	location: "Perso-Arabic",
  	id: 4096,
  	tag: "ks-Arab-IN",
  	version: "Release 10"
  },
  	kk: kk,
  	"kk-kz": {
  	language: "Kazakh",
  	location: "Kazakhstan",
  	id: 1087,
  	tag: "kk-KZ",
  	version: "Release C"
  },
  	km: km,
  	"km-kh": {
  	language: "Khmer",
  	location: "Cambodia",
  	id: 1107,
  	tag: "km-KH",
  	version: "Release V"
  },
  	quc: quc,
  	"quc-latn-gt": {
  	language: "K'iche",
  	location: "Guatemala",
  	id: 1158,
  	tag: "quc-Latn-GT",
  	version: "Release 10"
  },
  	ki: ki,
  	"ki-ke": {
  	language: "Kikuyu",
  	location: "Kenya",
  	id: 4096,
  	tag: "ki-KE",
  	version: "Release 10"
  },
  	rw: rw,
  	"rw-rw": {
  	language: "Kinyarwanda",
  	location: "Rwanda",
  	id: 1159,
  	tag: "rw-RW",
  	version: "Release V"
  },
  	sw: sw,
  	"sw-ke": {
  	language: "Kiswahili",
  	location: "Kenya",
  	id: 1089,
  	tag: "sw-KE",
  	version: "Release C"
  },
  	"sw-tz": {
  	language: "Kiswahili",
  	location: "Tanzania",
  	id: 4096,
  	tag: "sw-TZ",
  	version: "Release 10"
  },
  	"sw-ug": {
  	language: "Kiswahili",
  	location: "Uganda",
  	id: 4096,
  	tag: "sw-UG",
  	version: "Release 10"
  },
  	kok: kok,
  	"kok-in": {
  	language: "Konkani",
  	location: "India",
  	id: 1111,
  	tag: "kok-IN",
  	version: "Release C"
  },
  	ko: ko,
  	"ko-kr": {
  	language: "Korean",
  	location: "Korea",
  	id: 1042,
  	tag: "ko-KR",
  	version: "Release A"
  },
  	"ko-kp": {
  	language: "Korean",
  	location: "North Korea",
  	id: 4096,
  	tag: "ko-KP",
  	version: "Release 10.1"
  },
  	khq: khq,
  	"khq-ml": {
  	language: "Koyra Chiini",
  	location: "Mali",
  	id: 4096,
  	tag: "khq-ML",
  	version: "Release 10"
  },
  	ses: ses,
  	"ses-ml": {
  	language: "Koyraboro Senni",
  	location: "Mali",
  	id: 4096,
  	tag: "ses-ML",
  	version: "Release 10"
  },
  	nmg: nmg,
  	"nmg-cm": {
  	language: "Kwasio",
  	location: "Cameroon",
  	id: 4096,
  	tag: "nmg-CM",
  	version: "Release 10"
  },
  	ky: ky,
  	"ky-kg": {
  	language: "Kyrgyz",
  	location: "Kyrgyzstan",
  	id: 1088,
  	tag: "ky-KG",
  	version: "Release D"
  },
  	"ku-arab-ir": {
  	language: "Kurdish",
  	location: "Perso-Arabic, Iran",
  	id: 4096,
  	tag: "ku-Arab-IR",
  	version: "Release 10.1"
  },
  	lkt: lkt,
  	"lkt-us": {
  	language: "Lakota",
  	location: "United States",
  	id: 4096,
  	tag: "lkt-US",
  	version: "Release 10"
  },
  	lag: lag,
  	"lag-tz": {
  	language: "Langi",
  	location: "Tanzania",
  	id: 4096,
  	tag: "lag-TZ",
  	version: "Release 10"
  },
  	lo: lo,
  	"lo-la": {
  	language: "Lao",
  	location: "Lao P.D.R.",
  	id: 1108,
  	tag: "lo-LA",
  	version: "Release V"
  },
  	lv: lv,
  	"lv-lv": {
  	language: "Latvian",
  	location: "Latvia",
  	id: 1062,
  	tag: "lv-LV",
  	version: "Release B"
  },
  	ln: ln,
  	"ln-ao": {
  	language: "Lingala",
  	location: "Angola",
  	id: 4096,
  	tag: "ln-AO",
  	version: "Release 10"
  },
  	"ln-cf": {
  	language: "Lingala",
  	location: "Central African Republic",
  	id: 4096,
  	tag: "ln-CF",
  	version: "Release 10"
  },
  	"ln-cg": {
  	language: "Lingala",
  	location: "Congo",
  	id: 4096,
  	tag: "ln-CG",
  	version: "Release 10"
  },
  	"ln-cd": {
  	language: "Lingala",
  	location: "Congo DRC",
  	id: 4096,
  	tag: "ln-CD",
  	version: "Release 10"
  },
  	lt: lt,
  	"lt-lt": {
  	language: "Lithuanian",
  	location: "Lithuania",
  	id: 1063,
  	tag: "lt-LT",
  	version: "Release B"
  },
  	nds: nds,
  	"nds-de": {
  	language: "Low German ",
  	location: "Germany",
  	id: 4096,
  	tag: "nds-DE",
  	version: "Release 10.2"
  },
  	"nds-nl": {
  	language: "Low German",
  	location: "Netherlands",
  	id: 4096,
  	tag: "nds-NL",
  	version: "Release 10.2"
  },
  	dsb: dsb,
  	"dsb-de": {
  	language: "Lower Sorbian",
  	location: "Germany",
  	id: 2094,
  	tag: "dsb-DE",
  	version: "Release V"
  },
  	lu: lu,
  	"lu-cd": {
  	language: "Luba-Katanga",
  	location: "Congo DRC",
  	id: 4096,
  	tag: "lu-CD",
  	version: "Release 10"
  },
  	luo: luo,
  	"luo-ke": {
  	language: "Luo",
  	location: "Kenya",
  	id: 4096,
  	tag: "luo-KE",
  	version: "Release 10"
  },
  	lb: lb,
  	"lb-lu": {
  	language: "Luxembourgish",
  	location: "Luxembourg",
  	id: 1134,
  	tag: "lb-LU",
  	version: "Release E2"
  },
  	luy: luy,
  	"luy-ke": {
  	language: "Luyia",
  	location: "Kenya",
  	id: 4096,
  	tag: "luy-KE",
  	version: "Release 10"
  },
  	mk: mk,
  	"mk-mk": {
  	language: "Macedonian",
  	location: "North Macedonia ",
  	id: 1071,
  	tag: "mk-MK",
  	version: "Release C"
  },
  	jmc: jmc,
  	"jmc-tz": {
  	language: "Machame",
  	location: "Tanzania",
  	id: 4096,
  	tag: "jmc-TZ",
  	version: "Release 10"
  },
  	mgh: mgh,
  	"mgh-mz": {
  	language: "Makhuwa-Meetto",
  	location: "Mozambique",
  	id: 4096,
  	tag: "mgh-MZ",
  	version: "Release 10"
  },
  	kde: kde,
  	"kde-tz": {
  	language: "Makonde",
  	location: "Tanzania",
  	id: 4096,
  	tag: "kde-TZ",
  	version: "Release 10"
  },
  	mg: mg,
  	"mg-mg": {
  	language: "Malagasy",
  	location: "Madagascar",
  	id: 4096,
  	tag: "mg-MG",
  	version: "Release 8.1"
  },
  	ms: ms,
  	"ms-bn": {
  	language: "Malay",
  	location: "Brunei Darussalam",
  	id: 2110,
  	tag: "ms-BN",
  	version: "Release C"
  },
  	"ms-my": {
  	language: "Malay",
  	location: "Malaysia",
  	id: 1086,
  	tag: "ms-MY",
  	version: "Release C"
  },
  	ml: ml,
  	"ml-in": {
  	language: "Malayalam",
  	location: "India",
  	id: 1100,
  	tag: "ml-IN",
  	version: "Release E1"
  },
  	mt: mt,
  	"mt-mt": {
  	language: "Maltese",
  	location: "Malta",
  	id: 1082,
  	tag: "mt-MT",
  	version: "Release E1"
  },
  	gv: gv,
  	"gv-im": {
  	language: "Manx",
  	location: "Isle of Man",
  	id: 4096,
  	tag: "gv-IM",
  	version: "Release 10"
  },
  	mi: mi,
  	"mi-nz": {
  	language: "Maori",
  	location: "New Zealand",
  	id: 1153,
  	tag: "mi-NZ",
  	version: "Release E1"
  },
  	arn: arn,
  	"arn-cl": {
  	language: "Mapudungun",
  	location: "Chile",
  	id: 1146,
  	tag: "arn-CL",
  	version: "Release E2"
  },
  	mr: mr,
  	"mr-in": {
  	language: "Marathi",
  	location: "India",
  	id: 1102,
  	tag: "mr-IN",
  	version: "Release C"
  },
  	mas: mas,
  	"mas-ke": {
  	language: "Masai",
  	location: "Kenya",
  	id: 4096,
  	tag: "mas-KE",
  	version: "Release 10"
  },
  	"mas-tz": {
  	language: "Masai",
  	location: "Tanzania",
  	id: 4096,
  	tag: "mas-TZ",
  	version: "Release 10"
  },
  	"mzn-ir": {
  	language: "Mazanderani",
  	location: "Iran",
  	id: 4096,
  	tag: "mzn-IR",
  	version: "Release 10.1"
  },
  	mer: mer,
  	"mer-ke": {
  	language: "Meru",
  	location: "Kenya",
  	id: 4096,
  	tag: "mer-KE",
  	version: "Release 10"
  },
  	mgo: mgo,
  	"mgo-cm": {
  	language: "Meta'",
  	location: "Cameroon",
  	id: 4096,
  	tag: "mgo-CM",
  	version: "Release 10"
  },
  	moh: moh,
  	"moh-ca": {
  	language: "Mohawk",
  	location: "Canada",
  	id: 1148,
  	tag: "moh-CA",
  	version: "Release E2"
  },
  	mn: mn,
  	"mn-cyrl": {
  	language: "Mongolian (Cyrillic)",
  	location: null,
  	id: 30800,
  	tag: "mn-Cyrl",
  	version: "Windows 7"
  },
  	"mn-mn": {
  	language: "Mongolian (Cyrillic)",
  	location: "Mongolia",
  	id: 1104,
  	tag: "mn-MN",
  	version: "Release D"
  },
  	"mn-mong": {
  	language: "Mongolian (Traditional ",
  	location: null,
  	id: 31824,
  	tag: "mn-Mong",
  	version: "Windows 7"
  },
  	"mn-mong-": {
  	language: "Mongolian (Traditional ",
  	location: "Mongolia",
  	id: 3152,
  	tag: "mn-Mong-",
  	version: "Windows 7"
  },
  	mfe: mfe,
  	"mfe-mu": {
  	language: "Morisyen",
  	location: "Mauritius",
  	id: 4096,
  	tag: "mfe-MU",
  	version: "Release 10"
  },
  	mua: mua,
  	"mua-cm": {
  	language: "Mundang",
  	location: "Cameroon",
  	id: 4096,
  	tag: "mua-CM",
  	version: "Release 10"
  },
  	nqo: nqo,
  	"nqo-gn": {
  	language: "N'ko",
  	location: "Guinea",
  	id: 4096,
  	tag: "nqo-GN",
  	version: "Release 8.1"
  },
  	naq: naq,
  	"naq-na": {
  	language: "Nama",
  	location: "Namibia",
  	id: 4096,
  	tag: "naq-NA",
  	version: "Release 10"
  },
  	ne: ne,
  	"ne-in": {
  	language: "Nepali",
  	location: "India",
  	id: 2145,
  	tag: "ne-IN",
  	version: "Release 8.1"
  },
  	"ne-np": {
  	language: "Nepali",
  	location: "Nepal",
  	id: 1121,
  	tag: "ne-NP",
  	version: "Release E2"
  },
  	nnh: nnh,
  	"nnh-cm": {
  	language: "Ngiemboon",
  	location: "Cameroon",
  	id: 4096,
  	tag: "nnh-CM",
  	version: "Release 10"
  },
  	jgo: jgo,
  	"jgo-cm": {
  	language: "Ngomba",
  	location: "Cameroon",
  	id: 4096,
  	tag: "jgo-CM",
  	version: "Release 10"
  },
  	"lrc-iq": {
  	language: "Northern Luri",
  	location: "Iraq",
  	id: 4096,
  	tag: "lrc-IQ",
  	version: "Release 10.1"
  },
  	"lrc-ir": {
  	language: "Northern Luri",
  	location: "Iran",
  	id: 4096,
  	tag: "lrc-IR",
  	version: "Release 10.1"
  },
  	nd: nd,
  	"nd-zw": {
  	language: "North Ndebele",
  	location: "Zimbabwe",
  	id: 4096,
  	tag: "nd-ZW",
  	version: "Release 10"
  },
  	no: no,
  	nb: nb,
  	"nb-no": {
  	language: "Norwegian (Bokmal)",
  	location: "Norway",
  	id: 1044,
  	tag: "nb-NO",
  	version: "Release A"
  },
  	nn: nn,
  	"nn-no": {
  	language: "Norwegian (Nynorsk)",
  	location: "Norway",
  	id: 2068,
  	tag: "nn-NO",
  	version: "Release A"
  },
  	"nb-sj": {
  	language: "Norwegian Bokmål",
  	location: "Svalbard and Jan Mayen",
  	id: 4096,
  	tag: "nb-SJ",
  	version: "Release 10"
  },
  	nus: nus,
  	"nus-sd": {
  	language: "Nuer",
  	location: "Sudan",
  	id: 4096,
  	tag: "nus-SD",
  	version: "Release 10"
  },
  	"nus-ss": {
  	language: "Nuer",
  	location: "South Sudan",
  	id: 4096,
  	tag: "nus-SS",
  	version: "Release 10.1"
  },
  	nyn: nyn,
  	"nyn-ug": {
  	language: "Nyankole",
  	location: "Uganda",
  	id: 4096,
  	tag: "nyn-UG",
  	version: "Release 10"
  },
  	oc: oc,
  	"oc-fr": {
  	language: "Occitan",
  	location: "France",
  	id: 1154,
  	tag: "oc-FR",
  	version: "Release V"
  },
  	or: or,
  	"or-in": {
  	language: "Odia",
  	location: "India",
  	id: 1096,
  	tag: "or-IN",
  	version: "Release V"
  },
  	om: om,
  	"om-et": {
  	language: "Oromo",
  	location: "Ethiopia",
  	id: 1138,
  	tag: "om-ET",
  	version: "Release 8.1"
  },
  	"om-ke": {
  	language: "Oromo",
  	location: "Kenya",
  	id: 4096,
  	tag: "om-KE",
  	version: "Release 10"
  },
  	os: os,
  	"os-ge": {
  	language: "Ossetian",
  	location: "Cyrillic, Georgia",
  	id: 4096,
  	tag: "os-GE",
  	version: "Release 10"
  },
  	"os-ru": {
  	language: "Ossetian",
  	location: "Cyrillic, Russia",
  	id: 4096,
  	tag: "os-RU",
  	version: "Release 10"
  },
  	ps: ps,
  	"ps-af": {
  	language: "Pashto",
  	location: "Afghanistan",
  	id: 1123,
  	tag: "ps-AF",
  	version: "Release E2"
  },
  	fa: fa,
  	"fa-af": {
  	language: "Persian",
  	location: "Afghanistan",
  	id: 4096,
  	tag: "fa-AF",
  	version: "Release 10"
  },
  	"fa-ir": {
  	language: "Persian",
  	location: "Iran",
  	id: 1065,
  	tag: "fa-IR",
  	version: "Release B"
  },
  	pl: pl,
  	"pl-pl": {
  	language: "Polish",
  	location: "Poland",
  	id: 1045,
  	tag: "pl-PL",
  	version: "Release A"
  },
  	pt: pt,
  	"pt-ao": {
  	language: "Portuguese",
  	location: "Angola",
  	id: 4096,
  	tag: "pt-AO",
  	version: "Release 8.1"
  },
  	"pt-br": {
  	language: "Portuguese",
  	location: "Brazil",
  	id: 1046,
  	tag: "pt-BR",
  	version: "ReleaseA"
  },
  	"pt-cv": {
  	language: "Portuguese",
  	location: "Cabo Verde",
  	id: 4096,
  	tag: "pt-CV",
  	version: "Release 10"
  },
  	"pt-gq": {
  	language: "Portuguese",
  	location: "Equatorial Guinea",
  	id: 4096,
  	tag: "pt-GQ",
  	version: "Release 10.2"
  },
  	"pt-gw": {
  	language: "Portuguese",
  	location: "Guinea-Bissau",
  	id: 4096,
  	tag: "pt-GW",
  	version: "Release 10"
  },
  	"pt-lu": {
  	language: "Portuguese",
  	location: "Luxembourg",
  	id: 4096,
  	tag: "pt-LU",
  	version: "Release 10.2"
  },
  	"pt-mo": {
  	language: "Portuguese",
  	location: "Macao SAR",
  	id: 4096,
  	tag: "pt-MO",
  	version: "Release 10"
  },
  	"pt-mz": {
  	language: "Portuguese",
  	location: "Mozambique",
  	id: 4096,
  	tag: "pt-MZ",
  	version: "Release 10"
  },
  	"pt-pt": {
  	language: "Portuguese",
  	location: "Portugal",
  	id: 2070,
  	tag: "pt-PT",
  	version: "Release A"
  },
  	"pt-st": {
  	language: "Portuguese",
  	location: "São Tomé and Príncipe",
  	id: 4096,
  	tag: "pt-ST",
  	version: "Release 10"
  },
  	"pt-ch": {
  	language: "Portuguese",
  	location: "Switzerland",
  	id: 4096,
  	tag: "pt-CH",
  	version: "Release 10.2"
  },
  	"pt-tl": {
  	language: "Portuguese",
  	location: "Timor-Leste",
  	id: 4096,
  	tag: "pt-TL",
  	version: "Release 10"
  },
  	"prg-001": {
  	language: "Prussian",
  	location: null,
  	id: 4096,
  	tag: "prg-001",
  	version: "Release 10.1"
  },
  	"qps-ploca": {
  	language: "Pseudo Language",
  	location: "Pseudo locale for east Asian/complex ",
  	id: 1534,
  	tag: "qps-ploca",
  	version: "Release 7"
  },
  	"qps-ploc": {
  	language: "Pseudo Language",
  	location: "Pseudo locale used for localization ",
  	id: 1281,
  	tag: "qps-ploc",
  	version: "Release 7"
  },
  	"qps-plocm": {
  	language: "Pseudo Language",
  	location: "Pseudo locale used for localization ",
  	id: 2559,
  	tag: "qps-plocm",
  	version: "Release 7"
  },
  	pa: pa,
  	"pa-arab": {
  	language: "Punjabi",
  	location: null,
  	id: 31814,
  	tag: "pa-Arab",
  	version: "Release 8"
  },
  	"pa-in": {
  	language: "Punjabi",
  	location: "India",
  	id: 1094,
  	tag: "pa-IN",
  	version: "Release D"
  },
  	"pa-arab-pk": {
  	language: "Punjabi",
  	location: "Islamic Republic of Pakistan",
  	id: 2118,
  	tag: "pa-Arab-PK",
  	version: "Release 8"
  },
  	quz: quz,
  	"quz-bo": {
  	language: "Quechua",
  	location: "Bolivia",
  	id: 1131,
  	tag: "quz-BO",
  	version: "Release E1"
  },
  	"quz-ec": {
  	language: "Quechua",
  	location: "Ecuador",
  	id: 2155,
  	tag: "quz-EC",
  	version: "Release E1"
  },
  	"quz-pe": {
  	language: "Quechua",
  	location: "Peru",
  	id: 3179,
  	tag: "quz-PE",
  	version: "Release E1"
  },
  	ksh: ksh,
  	"ksh-de": {
  	language: "Ripuarian",
  	location: "Germany",
  	id: 4096,
  	tag: "ksh-DE",
  	version: "Release 10"
  },
  	ro: ro,
  	"ro-md": {
  	language: "Romanian",
  	location: "Moldova",
  	id: 2072,
  	tag: "ro-MD",
  	version: "Release 8.1"
  },
  	"ro-ro": {
  	language: "Romanian",
  	location: "Romania",
  	id: 1048,
  	tag: "ro-RO",
  	version: "Release A"
  },
  	rm: rm,
  	"rm-ch": {
  	language: "Romansh",
  	location: "Switzerland",
  	id: 1047,
  	tag: "rm-CH",
  	version: "Release E2"
  },
  	rof: rof,
  	"rof-tz": {
  	language: "Rombo",
  	location: "Tanzania",
  	id: 4096,
  	tag: "rof-TZ",
  	version: "Release 10"
  },
  	rn: rn,
  	"rn-bi": {
  	language: "Rundi",
  	location: "Burundi",
  	id: 4096,
  	tag: "rn-BI",
  	version: "Release 10"
  },
  	ru: ru,
  	"ru-by": {
  	language: "Russian",
  	location: "Belarus",
  	id: 4096,
  	tag: "ru-BY",
  	version: "Release 10"
  },
  	"ru-kz": {
  	language: "Russian",
  	location: "Kazakhstan",
  	id: 4096,
  	tag: "ru-KZ",
  	version: "Release 10"
  },
  	"ru-kg": {
  	language: "Russian",
  	location: "Kyrgyzstan",
  	id: 4096,
  	tag: "ru-KG",
  	version: "Release 10"
  },
  	"ru-md": {
  	language: "Russian",
  	location: "Moldova",
  	id: 2073,
  	tag: "ru-MD",
  	version: "Release 10"
  },
  	"ru-ru": {
  	language: "Russian",
  	location: "Russia",
  	id: 1049,
  	tag: "ru-RU",
  	version: "Release A"
  },
  	"ru-ua": {
  	language: "Russian",
  	location: "Ukraine",
  	id: 4096,
  	tag: "ru-UA",
  	version: "Release 10"
  },
  	rwk: rwk,
  	"rwk-tz": {
  	language: "Rwa",
  	location: "Tanzania",
  	id: 4096,
  	tag: "rwk-TZ",
  	version: "Release 10"
  },
  	ssy: ssy,
  	"ssy-er": {
  	language: "Saho",
  	location: "Eritrea",
  	id: 4096,
  	tag: "ssy-ER",
  	version: "Release 10"
  },
  	sah: sah,
  	"sah-ru": {
  	language: "Sakha",
  	location: "Russia",
  	id: 1157,
  	tag: "sah-RU",
  	version: "Release V"
  },
  	saq: saq,
  	"saq-ke": {
  	language: "Samburu",
  	location: "Kenya",
  	id: 4096,
  	tag: "saq-KE",
  	version: "Release 10"
  },
  	smn: smn,
  	"smn-fi": {
  	language: "Sami (Inari)",
  	location: "Finland",
  	id: 9275,
  	tag: "smn-FI",
  	version: "Release E1"
  },
  	smj: smj,
  	"smj-no": {
  	language: "Sami (Lule)",
  	location: "Norway",
  	id: 4155,
  	tag: "smj-NO",
  	version: "Release E1"
  },
  	"smj-se": {
  	language: "Sami (Lule)",
  	location: "Sweden",
  	id: 5179,
  	tag: "smj-SE",
  	version: "Release E1"
  },
  	se: se,
  	"se-fi": {
  	language: "Sami (Northern)",
  	location: "Finland",
  	id: 3131,
  	tag: "se-FI",
  	version: "Release E1"
  },
  	"se-no": {
  	language: "Sami (Northern)",
  	location: "Norway",
  	id: 1083,
  	tag: "se-NO",
  	version: "Release E1"
  },
  	"se-se": {
  	language: "Sami (Northern)",
  	location: "Sweden",
  	id: 2107,
  	tag: "se-SE",
  	version: "Release E1"
  },
  	sms: sms,
  	"sms-fi": {
  	language: "Sami (Skolt)",
  	location: "Finland",
  	id: 8251,
  	tag: "sms-FI",
  	version: "Release E1"
  },
  	sma: sma,
  	"sma-no": {
  	language: "Sami (Southern)",
  	location: "Norway",
  	id: 6203,
  	tag: "sma-NO",
  	version: "Release E1"
  },
  	"sma-se": {
  	language: "Sami (Southern)",
  	location: "Sweden",
  	id: 7227,
  	tag: "sma-SE",
  	version: "Release E1"
  },
  	sg: sg,
  	"sg-cf": {
  	language: "Sango",
  	location: "Central African Republic",
  	id: 4096,
  	tag: "sg-CF",
  	version: "Release 10"
  },
  	sbp: sbp,
  	"sbp-tz": {
  	language: "Sangu",
  	location: "Tanzania",
  	id: 4096,
  	tag: "sbp-TZ",
  	version: "Release 10"
  },
  	sa: sa,
  	"sa-in": {
  	language: "Sanskrit",
  	location: "India",
  	id: 1103,
  	tag: "sa-IN",
  	version: "Release C"
  },
  	gd: gd,
  	"gd-gb": {
  	language: "Scottish Gaelic",
  	location: "United Kingdom",
  	id: 1169,
  	tag: "gd-GB",
  	version: "Release 7"
  },
  	seh: seh,
  	"seh-mz": {
  	language: "Sena",
  	location: "Mozambique",
  	id: 4096,
  	tag: "seh-MZ",
  	version: "Release 10"
  },
  	"sr-cyrl": {
  	language: "Serbian (Cyrillic)",
  	location: null,
  	id: 27674,
  	tag: "sr-Cyrl",
  	version: "Windows 7"
  },
  	"sr-cyrl-ba": {
  	language: "Serbian (Cyrillic)",
  	location: "Bosnia and Herzegovina",
  	id: 7194,
  	tag: "sr-Cyrl-BA",
  	version: "Release E1"
  },
  	"sr-cyrl-me": {
  	language: "Serbian (Cyrillic)",
  	location: "Montenegro",
  	id: 12314,
  	tag: "sr-Cyrl-ME",
  	version: "Release 7"
  },
  	"sr-cyrl-rs": {
  	language: "Serbian (Cyrillic)",
  	location: "Serbia",
  	id: 10266,
  	tag: "sr-Cyrl-RS",
  	version: "Release 7"
  },
  	"sr-cyrl-cs": {
  	language: "Serbian (Cyrillic)",
  	location: "Serbia and Montenegro (Former)",
  	id: 3098,
  	tag: "sr-Cyrl-CS",
  	version: "Release B"
  },
  	"sr-latn": {
  	language: "Serbian (Latin)",
  	location: null,
  	id: 28698,
  	tag: "sr-Latn",
  	version: "Windows 7"
  },
  	sr: sr,
  	"sr-latn-ba": {
  	language: "Serbian (Latin)",
  	location: "Bosnia and Herzegovina",
  	id: 6170,
  	tag: "sr-Latn-BA",
  	version: "Release E1"
  },
  	"sr-latn-me": {
  	language: "Serbian (Latin)",
  	location: "Montenegro",
  	id: 11290,
  	tag: "sr-Latn-ME",
  	version: "Release 7"
  },
  	"sr-latn-rs": {
  	language: "Serbian (Latin)",
  	location: "Serbia",
  	id: 9242,
  	tag: "sr-Latn-RS",
  	version: "Release 7"
  },
  	"sr-latn-cs": {
  	language: "Serbian (Latin)",
  	location: "Serbia and Montenegro (Former)",
  	id: 2074,
  	tag: "sr-Latn-CS",
  	version: "Release B"
  },
  	nso: nso,
  	"nso-za": {
  	language: "Sesotho sa Leboa",
  	location: "South Africa",
  	id: 1132,
  	tag: "nso-ZA",
  	version: "Release E1"
  },
  	tn: tn,
  	"tn-bw": {
  	language: "Setswana",
  	location: "Botswana",
  	id: 2098,
  	tag: "tn-BW",
  	version: "Release 8"
  },
  	"tn-za": {
  	language: "Setswana",
  	location: "South Africa",
  	id: 1074,
  	tag: "tn-ZA",
  	version: "Release E1"
  },
  	ksb: ksb,
  	"ksb-tz": {
  	language: "Shambala",
  	location: "Tanzania",
  	id: 4096,
  	tag: "ksb-TZ",
  	version: "Release 10"
  },
  	sn: sn,
  	"sn-latn": {
  	language: "Shona",
  	location: "Latin",
  	id: 4096,
  	tag: "sn-Latn",
  	version: "Release 8.1"
  },
  	"sn-latn-zw": {
  	language: "Shona",
  	location: "Zimbabwe",
  	id: 4096,
  	tag: "sn-Latn-ZW",
  	version: "Release 8.1"
  },
  	sd: sd,
  	"sd-arab": {
  	language: "Sindhi",
  	location: null,
  	id: 31833,
  	tag: "sd-Arab",
  	version: "Release 8"
  },
  	"sd-arab-pk": {
  	language: "Sindhi",
  	location: "Islamic Republic of Pakistan",
  	id: 2137,
  	tag: "sd-Arab-PK",
  	version: "Release 8"
  },
  	si: si,
  	"si-lk": {
  	language: "Sinhala",
  	location: "Sri Lanka",
  	id: 1115,
  	tag: "si-LK",
  	version: "Release V"
  },
  	sk: sk,
  	"sk-sk": {
  	language: "Slovak",
  	location: "Slovakia",
  	id: 1051,
  	tag: "sk-SK",
  	version: "Release A"
  },
  	sl: sl,
  	"sl-si": {
  	language: "Slovenian",
  	location: "Slovenia",
  	id: 1060,
  	tag: "sl-SI",
  	version: "Release A"
  },
  	xog: xog,
  	"xog-ug": {
  	language: "Soga",
  	location: "Uganda",
  	id: 4096,
  	tag: "xog-UG",
  	version: "Release 10"
  },
  	so: so,
  	"so-dj": {
  	language: "Somali",
  	location: "Djibouti",
  	id: 4096,
  	tag: "so-DJ",
  	version: "Release 10"
  },
  	"so-et": {
  	language: "Somali",
  	location: "Ethiopia",
  	id: 4096,
  	tag: "so-ET",
  	version: "Release 10"
  },
  	"so-ke": {
  	language: "Somali",
  	location: "Kenya",
  	id: 4096,
  	tag: "so-KE",
  	version: "Release 10"
  },
  	"so-so": {
  	language: "Somali",
  	location: "Somalia",
  	id: 1143,
  	tag: "so-SO",
  	version: "Release 8.1"
  },
  	st: st,
  	"st-za": {
  	language: "Sotho",
  	location: "South Africa",
  	id: 1072,
  	tag: "st-ZA",
  	version: "Release 8.1"
  },
  	nr: nr,
  	"nr-za": {
  	language: "South Ndebele",
  	location: "South Africa",
  	id: 4096,
  	tag: "nr-ZA",
  	version: "Release 10"
  },
  	"st-ls": {
  	language: "Southern Sotho",
  	location: "Lesotho",
  	id: 4096,
  	tag: "st-LS",
  	version: "Release 10"
  },
  	es: es,
  	"es-ar": {
  	language: "Spanish",
  	location: "Argentina",
  	id: 11274,
  	tag: "es-AR",
  	version: "Release B"
  },
  	"es-bz": {
  	language: "Spanish",
  	location: "Belize",
  	id: 4096,
  	tag: "es-BZ",
  	version: "Release 10.3"
  },
  	"es-ve": {
  	language: "Spanish",
  	location: "Bolivarian Republic of Venezuela",
  	id: 8202,
  	tag: "es-VE",
  	version: "Release B"
  },
  	"es-bo": {
  	language: "Spanish",
  	location: "Bolivia",
  	id: 16394,
  	tag: "es-BO",
  	version: "Release B"
  },
  	"es-br": {
  	language: "Spanish",
  	location: "Brazil",
  	id: 4096,
  	tag: "es-BR",
  	version: "Release 10.2"
  },
  	"es-cl": {
  	language: "Spanish",
  	location: "Chile",
  	id: 13322,
  	tag: "es-CL",
  	version: "Release B"
  },
  	"es-co": {
  	language: "Spanish",
  	location: "Colombia",
  	id: 9226,
  	tag: "es-CO",
  	version: "Release B"
  },
  	"es-cr": {
  	language: "Spanish",
  	location: "Costa Rica",
  	id: 5130,
  	tag: "es-CR",
  	version: "Release B"
  },
  	"es-cu": {
  	language: "Spanish",
  	location: "Cuba",
  	id: 23562,
  	tag: "es-CU",
  	version: "Release 10"
  },
  	"es-do": {
  	language: "Spanish",
  	location: "Dominican Republic",
  	id: 7178,
  	tag: "es-DO",
  	version: "Release B"
  },
  	"es-ec": {
  	language: "Spanish",
  	location: "Ecuador",
  	id: 12298,
  	tag: "es-EC",
  	version: "Release B"
  },
  	"es-sv": {
  	language: "Spanish",
  	location: "El Salvador",
  	id: 17418,
  	tag: "es-SV",
  	version: "Release B"
  },
  	"es-gq": {
  	language: "Spanish",
  	location: "Equatorial Guinea",
  	id: 4096,
  	tag: "es-GQ",
  	version: "Release 10"
  },
  	"es-gt": {
  	language: "Spanish",
  	location: "Guatemala",
  	id: 4106,
  	tag: "es-GT",
  	version: "Release B"
  },
  	"es-hn": {
  	language: "Spanish",
  	location: "Honduras",
  	id: 18442,
  	tag: "es-HN",
  	version: "Release B"
  },
  	"es-419": {
  	language: "Spanish",
  	location: "Latin America",
  	id: 22538,
  	tag: "es-419",
  	version: "Release 8.1"
  },
  	"es-mx": {
  	language: "Spanish",
  	location: "Mexico",
  	id: 2058,
  	tag: "es-MX",
  	version: "Release A"
  },
  	"es-ni": {
  	language: "Spanish",
  	location: "Nicaragua",
  	id: 19466,
  	tag: "es-NI",
  	version: "Release B"
  },
  	"es-pa": {
  	language: "Spanish",
  	location: "Panama",
  	id: 6154,
  	tag: "es-PA",
  	version: "Release B"
  },
  	"es-py": {
  	language: "Spanish",
  	location: "Paraguay",
  	id: 15370,
  	tag: "es-PY",
  	version: "Release B"
  },
  	"es-pe": {
  	language: "Spanish",
  	location: "Peru",
  	id: 10250,
  	tag: "es-PE",
  	version: "Release B"
  },
  	"es-ph": {
  	language: "Spanish",
  	location: "Philippines",
  	id: 4096,
  	tag: "es-PH",
  	version: "Release 10"
  },
  	"es-pr": {
  	language: "Spanish",
  	location: "Puerto Rico",
  	id: 20490,
  	tag: "es-PR",
  	version: "Release B"
  },
  	"es-es_tradnl": {
  	language: "Spanish",
  	location: "Spain",
  	id: 1034,
  	tag: "es-ES_tradnl",
  	version: "Release A"
  },
  	"es-es": {
  	language: "Spanish",
  	location: "Spain",
  	id: 3082,
  	tag: "es-ES",
  	version: "Release A"
  },
  	"es-us": {
  	language: "Spanish",
  	location: "United States",
  	id: 21514,
  	tag: "es-US",
  	version: "Release V"
  },
  	"es-uy": {
  	language: "Spanish",
  	location: "Uruguay",
  	id: 14346,
  	tag: "es-UY",
  	version: "Release B"
  },
  	zgh: zgh,
  	"zgh-tfng-ma": {
  	language: "Standard Moroccan ",
  	location: "Morocco",
  	id: 4096,
  	tag: "zgh-Tfng-MA",
  	version: "Release 8.1"
  },
  	"zgh-tfng": {
  	language: "Standard Moroccan ",
  	location: "Tifinagh",
  	id: 4096,
  	tag: "zgh-Tfng",
  	version: "Release 8.1"
  },
  	ss: ss,
  	"ss-za": {
  	language: "Swati",
  	location: "South Africa",
  	id: 4096,
  	tag: "ss-ZA",
  	version: "Release 10"
  },
  	"ss-sz": {
  	language: "Swati",
  	location: "Swaziland",
  	id: 4096,
  	tag: "ss-SZ",
  	version: "Release 10"
  },
  	sv: sv,
  	"sv-ax": {
  	language: "Swedish",
  	location: "Åland Islands",
  	id: 4096,
  	tag: "sv-AX",
  	version: "Release 10"
  },
  	"sv-fi": {
  	language: "Swedish",
  	location: "Finland",
  	id: 2077,
  	tag: "sv-FI",
  	version: "ReleaseB"
  },
  	"sv-se": {
  	language: "Swedish",
  	location: "Sweden",
  	id: 1053,
  	tag: "sv-SE",
  	version: "Release A"
  },
  	syr: syr,
  	"syr-sy": {
  	language: "Syriac",
  	location: "Syria",
  	id: 1114,
  	tag: "syr-SY",
  	version: "Release D"
  },
  	shi: shi,
  	"shi-tfng": {
  	language: "Tachelhit",
  	location: "Tifinagh",
  	id: 4096,
  	tag: "shi-Tfng",
  	version: "Release 10"
  },
  	"shi-tfng-ma": {
  	language: "Tachelhit",
  	location: "Tifinagh, Morocco",
  	id: 4096,
  	tag: "shi-Tfng-MA",
  	version: "Release 10"
  },
  	"shi-latn": {
  	language: "Tachelhit (Latin)",
  	location: null,
  	id: 4096,
  	tag: "shi-Latn",
  	version: "Release 10"
  },
  	"shi-latn-ma": {
  	language: "Tachelhit (Latin)",
  	location: "Morocco",
  	id: 4096,
  	tag: "shi-Latn-MA",
  	version: "Release 10"
  },
  	dav: dav,
  	"dav-ke": {
  	language: "Taita",
  	location: "Kenya",
  	id: 4096,
  	tag: "dav-KE",
  	version: "Release 10"
  },
  	tg: tg,
  	"tg-cyrl": {
  	language: "Tajik (Cyrillic)",
  	location: null,
  	id: 31784,
  	tag: "tg-Cyrl",
  	version: "Windows 7"
  },
  	"tg-cyrl-tj": {
  	language: "Tajik (Cyrillic)",
  	location: "Tajikistan",
  	id: 1064,
  	tag: "tg-Cyrl-TJ",
  	version: "Release V"
  },
  	tzm: tzm,
  	"tzm-latn": {
  	language: "Tamazight (Latin)",
  	location: null,
  	id: 31839,
  	tag: "tzm-Latn",
  	version: "Windows 7"
  },
  	"tzm-latn-dz": {
  	language: "Tamazight (Latin)",
  	location: "Algeria",
  	id: 2143,
  	tag: "tzm-Latn-DZ",
  	version: "Release V"
  },
  	ta: ta,
  	"ta-in": {
  	language: "Tamil",
  	location: "India",
  	id: 1097,
  	tag: "ta-IN",
  	version: "Release C"
  },
  	"ta-my": {
  	language: "Tamil",
  	location: "Malaysia",
  	id: 4096,
  	tag: "ta-MY",
  	version: "Release 10"
  },
  	"ta-sg": {
  	language: "Tamil",
  	location: "Singapore",
  	id: 4096,
  	tag: "ta-SG",
  	version: "Release 10"
  },
  	"ta-lk": {
  	language: "Tamil",
  	location: "Sri Lanka",
  	id: 2121,
  	tag: "ta-LK",
  	version: "Release 8"
  },
  	twq: twq,
  	"twq-ne": {
  	language: "Tasawaq",
  	location: "Niger",
  	id: 4096,
  	tag: "twq-NE",
  	version: "Release 10"
  },
  	tt: tt,
  	"tt-ru": {
  	language: "Tatar",
  	location: "Russia",
  	id: 1092,
  	tag: "tt-RU",
  	version: "Release D"
  },
  	te: te,
  	"te-in": {
  	language: "Telugu",
  	location: "India",
  	id: 1098,
  	tag: "te-IN",
  	version: "Release D"
  },
  	teo: teo,
  	"teo-ke": {
  	language: "Teso",
  	location: "Kenya",
  	id: 4096,
  	tag: "teo-KE",
  	version: "Release 10"
  },
  	"teo-ug": {
  	language: "Teso",
  	location: "Uganda",
  	id: 4096,
  	tag: "teo-UG",
  	version: "Release 10"
  },
  	th: th,
  	"th-th": {
  	language: "Thai",
  	location: "Thailand",
  	id: 1054,
  	tag: "th-TH",
  	version: "Release B"
  },
  	bo: bo,
  	"bo-in": {
  	language: "Tibetan",
  	location: "India",
  	id: 4096,
  	tag: "bo-IN",
  	version: "Release 10"
  },
  	"bo-cn": {
  	language: "Tibetan",
  	location: "People's Republic of China",
  	id: 1105,
  	tag: "bo-CN",
  	version: "Release V"
  },
  	tig: tig,
  	"tig-er": {
  	language: "Tigre",
  	location: "Eritrea",
  	id: 4096,
  	tag: "tig-ER",
  	version: "Release 10"
  },
  	ti: ti,
  	"ti-er": {
  	language: "Tigrinya",
  	location: "Eritrea",
  	id: 2163,
  	tag: "ti-ER",
  	version: "Release 8"
  },
  	"ti-et": {
  	language: "Tigrinya",
  	location: "Ethiopia",
  	id: 1139,
  	tag: "ti-ET",
  	version: "Release 8"
  },
  	to: to,
  	"to-to": {
  	language: "Tongan",
  	location: "Tonga",
  	id: 4096,
  	tag: "to-TO",
  	version: "Release 10"
  },
  	ts: ts,
  	"ts-za": {
  	language: "Tsonga",
  	location: "South Africa",
  	id: 1073,
  	tag: "ts-ZA",
  	version: "Release 8.1"
  },
  	tr: tr,
  	"tr-cy": {
  	language: "Turkish",
  	location: "Cyprus",
  	id: 4096,
  	tag: "tr-CY",
  	version: "Release 10"
  },
  	"tr-tr": {
  	language: "Turkish",
  	location: "Turkey",
  	id: 1055,
  	tag: "tr-TR",
  	version: "Release A"
  },
  	tk: tk,
  	"tk-tm": {
  	language: "Turkmen",
  	location: "Turkmenistan",
  	id: 1090,
  	tag: "tk-TM",
  	version: "Release V"
  },
  	uk: uk,
  	"uk-ua": {
  	language: "Ukrainian",
  	location: "Ukraine",
  	id: 1058,
  	tag: "uk-UA",
  	version: "Release B"
  },
  	hsb: hsb,
  	"hsb-de": {
  	language: "Upper Sorbian",
  	location: "Germany",
  	id: 1070,
  	tag: "hsb-DE",
  	version: "Release V"
  },
  	ur: ur,
  	"ur-in": {
  	language: "Urdu",
  	location: "India",
  	id: 2080,
  	tag: "ur-IN",
  	version: "Release 8.1"
  },
  	"ur-pk": {
  	language: "Urdu",
  	location: "Islamic Republic of Pakistan",
  	id: 1056,
  	tag: "ur-PK",
  	version: "Release C"
  },
  	ug: ug,
  	"ug-cn": {
  	language: "Uyghur",
  	location: "People's Republic of China",
  	id: 1152,
  	tag: "ug-CN",
  	version: "Release V"
  },
  	"uz-arab": {
  	language: "Uzbek",
  	location: "Perso-Arabic",
  	id: 4096,
  	tag: "uz-Arab",
  	version: "Release 10"
  },
  	"uz-arab-af": {
  	language: "Uzbek",
  	location: "Perso-Arabic, Afghanistan",
  	id: 4096,
  	tag: "uz-Arab-AF",
  	version: "Release 10"
  },
  	"uz-cyrl": {
  	language: "Uzbek (Cyrillic)",
  	location: null,
  	id: 30787,
  	tag: "uz-Cyrl",
  	version: "Windows 7"
  },
  	"uz-cyrl-uz": {
  	language: "Uzbek (Cyrillic)",
  	location: "Uzbekistan",
  	id: 2115,
  	tag: "uz-Cyrl-UZ",
  	version: "Release C"
  },
  	uz: uz,
  	"uz-latn": {
  	language: "Uzbek (Latin)",
  	location: null,
  	id: 31811,
  	tag: "uz-Latn",
  	version: "Windows 7"
  },
  	"uz-latn-uz": {
  	language: "Uzbek (Latin)",
  	location: "Uzbekistan",
  	id: 1091,
  	tag: "uz-Latn-UZ",
  	version: "Release C"
  },
  	vai: vai,
  	"vai-vaii": {
  	language: "Vai",
  	location: null,
  	id: 4096,
  	tag: "vai-Vaii",
  	version: "Release 10"
  },
  	"vai-vaii-lr": {
  	language: "Vai",
  	location: "Liberia",
  	id: 4096,
  	tag: "vai-Vaii-LR",
  	version: "Release 10"
  },
  	"vai-latn-lr": {
  	language: "Vai (Latin)",
  	location: "Liberia",
  	id: 4096,
  	tag: "vai-Latn-LR",
  	version: "Release 10"
  },
  	"vai-latn": {
  	language: "Vai (Latin)",
  	location: null,
  	id: 4096,
  	tag: "vai-Latn",
  	version: "Release 10"
  },
  	"ca-es-": {
  	language: "Valencian",
  	location: "Spain",
  	id: 2051,
  	tag: "ca-ES-",
  	version: "Release 8"
  },
  	ve: ve,
  	"ve-za": {
  	language: "Venda",
  	location: "South Africa",
  	id: 1075,
  	tag: "ve-ZA",
  	version: "Release 10"
  },
  	vi: vi,
  	"vi-vn": {
  	language: "Vietnamese",
  	location: "Vietnam",
  	id: 1066,
  	tag: "vi-VN",
  	version: "Release B"
  },
  	vo: vo,
  	"vo-001": {
  	language: "Volapük",
  	location: "World",
  	id: 4096,
  	tag: "vo-001",
  	version: "Release 10"
  },
  	vun: vun,
  	"vun-tz": {
  	language: "Vunjo",
  	location: "Tanzania",
  	id: 4096,
  	tag: "vun-TZ",
  	version: "Release 10"
  },
  	wae: wae,
  	"wae-ch": {
  	language: "Walser",
  	location: "Switzerland",
  	id: 4096,
  	tag: "wae-CH",
  	version: "Release 10"
  },
  	cy: cy,
  	"cy-gb": {
  	language: "Welsh",
  	location: "United Kingdom",
  	id: 1106,
  	tag: "cy-GB",
  	version: "ReleaseE1"
  },
  	wal: wal,
  	"wal-et": {
  	language: "Wolaytta",
  	location: "Ethiopia",
  	id: 4096,
  	tag: "wal-ET",
  	version: "Release 10"
  },
  	wo: wo,
  	"wo-sn": {
  	language: "Wolof",
  	location: "Senegal",
  	id: 1160,
  	tag: "wo-SN",
  	version: "Release V"
  },
  	xh: xh,
  	"xh-za": {
  	language: "Xhosa",
  	location: "South Africa",
  	id: 1076,
  	tag: "xh-ZA",
  	version: "Release E1"
  },
  	yav: yav,
  	"yav-cm": {
  	language: "Yangben",
  	location: "Cameroon",
  	id: 4096,
  	tag: "yav-CM",
  	version: "Release 10"
  },
  	ii: ii,
  	"ii-cn": {
  	language: "Yi",
  	location: "People's Republic of China",
  	id: 1144,
  	tag: "ii-CN",
  	version: "Release V"
  },
  	yo: yo,
  	"yo-bj": {
  	language: "Yoruba",
  	location: "Benin",
  	id: 4096,
  	tag: "yo-BJ",
  	version: "Release 10"
  },
  	"yo-ng": {
  	language: "Yoruba",
  	location: "Nigeria",
  	id: 1130,
  	tag: "yo-NG",
  	version: "Release V"
  },
  	dje: dje,
  	"dje-ne": {
  	language: "Zarma",
  	location: "Niger",
  	id: 4096,
  	tag: "dje-NE",
  	version: "Release 10"
  },
  	zu: zu,
  	"zu-za": {
  	language: "Zulu",
  	location: "South Africa",
  	id: 1077,
  	tag: "zu-ZA",
  	version: "Release E1"
  }
  };

  var Abkhazian = {
  	name: "Abkhazian",
  	names: [
  		"Abkhazian"
  	],
  	"iso639-2": "abk",
  	"iso639-1": "ab"
  };
  var Achinese = {
  	name: "Achinese",
  	names: [
  		"Achinese"
  	],
  	"iso639-2": "ace",
  	"iso639-1": null
  };
  var Acoli = {
  	name: "Acoli",
  	names: [
  		"Acoli"
  	],
  	"iso639-2": "ach",
  	"iso639-1": null
  };
  var Adangme = {
  	name: "Adangme",
  	names: [
  		"Adangme"
  	],
  	"iso639-2": "ada",
  	"iso639-1": null
  };
  var Adygei = {
  	name: "Adygei",
  	names: [
  		"Adyghe",
  		"Adygei"
  	],
  	"iso639-2": "ady",
  	"iso639-1": null
  };
  var Adyghe = {
  	name: "Adyghe",
  	names: [
  		"Adyghe",
  		"Adygei"
  	],
  	"iso639-2": "ady",
  	"iso639-1": null
  };
  var Afar = {
  	name: "Afar",
  	names: [
  		"Afar"
  	],
  	"iso639-2": "aar",
  	"iso639-1": "aa"
  };
  var Afrihili = {
  	name: "Afrihili",
  	names: [
  		"Afrihili"
  	],
  	"iso639-2": "afh",
  	"iso639-1": null
  };
  var Afrikaans = {
  	name: "Afrikaans",
  	names: [
  		"Afrikaans"
  	],
  	"iso639-2": "afr",
  	"iso639-1": "af"
  };
  var Ainu = {
  	name: "Ainu",
  	names: [
  		"Ainu"
  	],
  	"iso639-2": "ain",
  	"iso639-1": null
  };
  var Akan = {
  	name: "Akan",
  	names: [
  		"Akan"
  	],
  	"iso639-2": "aka",
  	"iso639-1": "ak"
  };
  var Akkadian = {
  	name: "Akkadian",
  	names: [
  		"Akkadian"
  	],
  	"iso639-2": "akk",
  	"iso639-1": null
  };
  var Albanian = {
  	name: "Albanian",
  	names: [
  		"Albanian"
  	],
  	"iso639-2": "alb/sqi",
  	"iso639-1": "sq"
  };
  var Alemannic = {
  	name: "Alemannic",
  	names: [
  		"Swiss German",
  		"Alemannic",
  		"Alsatian"
  	],
  	"iso639-2": "gsw",
  	"iso639-1": null
  };
  var Aleut = {
  	name: "Aleut",
  	names: [
  		"Aleut"
  	],
  	"iso639-2": "ale",
  	"iso639-1": null
  };
  var Alsatian = {
  	name: "Alsatian",
  	names: [
  		"Swiss German",
  		"Alemannic",
  		"Alsatian"
  	],
  	"iso639-2": "gsw",
  	"iso639-1": null
  };
  var Amharic = {
  	name: "Amharic",
  	names: [
  		"Amharic"
  	],
  	"iso639-2": "amh",
  	"iso639-1": "am"
  };
  var Angika = {
  	name: "Angika",
  	names: [
  		"Angika"
  	],
  	"iso639-2": "anp",
  	"iso639-1": null
  };
  var Arabic = {
  	name: "Arabic",
  	names: [
  		"Arabic"
  	],
  	"iso639-2": "ara",
  	"iso639-1": "ar"
  };
  var Aragonese = {
  	name: "Aragonese",
  	names: [
  		"Aragonese"
  	],
  	"iso639-2": "arg",
  	"iso639-1": "an"
  };
  var Arapaho = {
  	name: "Arapaho",
  	names: [
  		"Arapaho"
  	],
  	"iso639-2": "arp",
  	"iso639-1": null
  };
  var Arawak = {
  	name: "Arawak",
  	names: [
  		"Arawak"
  	],
  	"iso639-2": "arw",
  	"iso639-1": null
  };
  var Armenian = {
  	name: "Armenian",
  	names: [
  		"Armenian"
  	],
  	"iso639-2": "arm/hye",
  	"iso639-1": "hy"
  };
  var Aromanian = {
  	name: "Aromanian",
  	names: [
  		"Aromanian",
  		"Arumanian",
  		"Macedo-Romanian"
  	],
  	"iso639-2": "rup",
  	"iso639-1": null
  };
  var Arumanian = {
  	name: "Arumanian",
  	names: [
  		"Aromanian",
  		"Arumanian",
  		"Macedo-Romanian"
  	],
  	"iso639-2": "rup",
  	"iso639-1": null
  };
  var Assamese = {
  	name: "Assamese",
  	names: [
  		"Assamese"
  	],
  	"iso639-2": "asm",
  	"iso639-1": "as"
  };
  var Asturian = {
  	name: "Asturian",
  	names: [
  		"Asturian",
  		"Bable",
  		"Leonese",
  		"Asturleonese"
  	],
  	"iso639-2": "ast",
  	"iso639-1": null
  };
  var Asturleonese = {
  	name: "Asturleonese",
  	names: [
  		"Asturian",
  		"Bable",
  		"Leonese",
  		"Asturleonese"
  	],
  	"iso639-2": "ast",
  	"iso639-1": null
  };
  var Avaric = {
  	name: "Avaric",
  	names: [
  		"Avaric"
  	],
  	"iso639-2": "ava",
  	"iso639-1": "av"
  };
  var Avestan = {
  	name: "Avestan",
  	names: [
  		"Avestan"
  	],
  	"iso639-2": "ave",
  	"iso639-1": "ae"
  };
  var Awadhi = {
  	name: "Awadhi",
  	names: [
  		"Awadhi"
  	],
  	"iso639-2": "awa",
  	"iso639-1": null
  };
  var Aymara = {
  	name: "Aymara",
  	names: [
  		"Aymara"
  	],
  	"iso639-2": "aym",
  	"iso639-1": "ay"
  };
  var Azerbaijani = {
  	name: "Azerbaijani",
  	names: [
  		"Azerbaijani"
  	],
  	"iso639-2": "aze",
  	"iso639-1": "az"
  };
  var Bable = {
  	name: "Bable",
  	names: [
  		"Asturian",
  		"Bable",
  		"Leonese",
  		"Asturleonese"
  	],
  	"iso639-2": "ast",
  	"iso639-1": null
  };
  var Balinese = {
  	name: "Balinese",
  	names: [
  		"Balinese"
  	],
  	"iso639-2": "ban",
  	"iso639-1": null
  };
  var Baluchi = {
  	name: "Baluchi",
  	names: [
  		"Baluchi"
  	],
  	"iso639-2": "bal",
  	"iso639-1": null
  };
  var Bambara = {
  	name: "Bambara",
  	names: [
  		"Bambara"
  	],
  	"iso639-2": "bam",
  	"iso639-1": "bm"
  };
  var Basa = {
  	name: "Basa",
  	names: [
  		"Basa"
  	],
  	"iso639-2": "bas",
  	"iso639-1": null
  };
  var Bashkir = {
  	name: "Bashkir",
  	names: [
  		"Bashkir"
  	],
  	"iso639-2": "bak",
  	"iso639-1": "ba"
  };
  var Basque = {
  	name: "Basque",
  	names: [
  		"Basque"
  	],
  	"iso639-2": "baq/eus",
  	"iso639-1": "eu"
  };
  var Bedawiyet = {
  	name: "Bedawiyet",
  	names: [
  		"Beja",
  		"Bedawiyet"
  	],
  	"iso639-2": "bej",
  	"iso639-1": null
  };
  var Beja = {
  	name: "Beja",
  	names: [
  		"Beja",
  		"Bedawiyet"
  	],
  	"iso639-2": "bej",
  	"iso639-1": null
  };
  var Belarusian = {
  	name: "Belarusian",
  	names: [
  		"Belarusian"
  	],
  	"iso639-2": "bel",
  	"iso639-1": "be"
  };
  var Bemba = {
  	name: "Bemba",
  	names: [
  		"Bemba"
  	],
  	"iso639-2": "bem",
  	"iso639-1": null
  };
  var Bengali = {
  	name: "Bengali",
  	names: [
  		"Bengali"
  	],
  	"iso639-2": "ben",
  	"iso639-1": "bn"
  };
  var Bhojpuri = {
  	name: "Bhojpuri",
  	names: [
  		"Bhojpuri"
  	],
  	"iso639-2": "bho",
  	"iso639-1": null
  };
  var Bikol = {
  	name: "Bikol",
  	names: [
  		"Bikol"
  	],
  	"iso639-2": "bik",
  	"iso639-1": null
  };
  var Bilin = {
  	name: "Bilin",
  	names: [
  		"Blin",
  		"Bilin"
  	],
  	"iso639-2": "byn",
  	"iso639-1": null
  };
  var Bini = {
  	name: "Bini",
  	names: [
  		"Bini",
  		"Edo"
  	],
  	"iso639-2": "bin",
  	"iso639-1": null
  };
  var Bislama = {
  	name: "Bislama",
  	names: [
  		"Bislama"
  	],
  	"iso639-2": "bis",
  	"iso639-1": "bi"
  };
  var Blin = {
  	name: "Blin",
  	names: [
  		"Blin",
  		"Bilin"
  	],
  	"iso639-2": "byn",
  	"iso639-1": null
  };
  var Bliss = {
  	name: "Bliss",
  	names: [
  		"Blissymbols",
  		"Blissymbolics",
  		"Bliss"
  	],
  	"iso639-2": "zbl",
  	"iso639-1": null
  };
  var Blissymbolics = {
  	name: "Blissymbolics",
  	names: [
  		"Blissymbols",
  		"Blissymbolics",
  		"Bliss"
  	],
  	"iso639-2": "zbl",
  	"iso639-1": null
  };
  var Blissymbols = {
  	name: "Blissymbols",
  	names: [
  		"Blissymbols",
  		"Blissymbolics",
  		"Bliss"
  	],
  	"iso639-2": "zbl",
  	"iso639-1": null
  };
  var Bosnian = {
  	name: "Bosnian",
  	names: [
  		"Bosnian"
  	],
  	"iso639-2": "bos",
  	"iso639-1": "bs"
  };
  var Braj = {
  	name: "Braj",
  	names: [
  		"Braj"
  	],
  	"iso639-2": "bra",
  	"iso639-1": null
  };
  var Breton = {
  	name: "Breton",
  	names: [
  		"Breton"
  	],
  	"iso639-2": "bre",
  	"iso639-1": "br"
  };
  var Buginese = {
  	name: "Buginese",
  	names: [
  		"Buginese"
  	],
  	"iso639-2": "bug",
  	"iso639-1": null
  };
  var Bulgarian = {
  	name: "Bulgarian",
  	names: [
  		"Bulgarian"
  	],
  	"iso639-2": "bul",
  	"iso639-1": "bg"
  };
  var Buriat = {
  	name: "Buriat",
  	names: [
  		"Buriat"
  	],
  	"iso639-2": "bua",
  	"iso639-1": null
  };
  var Burmese = {
  	name: "Burmese",
  	names: [
  		"Burmese"
  	],
  	"iso639-2": "bur/mya",
  	"iso639-1": "my"
  };
  var Caddo = {
  	name: "Caddo",
  	names: [
  		"Caddo"
  	],
  	"iso639-2": "cad",
  	"iso639-1": null
  };
  var Castilian = {
  	name: "Castilian",
  	names: [
  		"Spanish",
  		"Castilian"
  	],
  	"iso639-2": "spa",
  	"iso639-1": "es"
  };
  var Catalan = {
  	name: "Catalan",
  	names: [
  		"Catalan",
  		"Valencian"
  	],
  	"iso639-2": "cat",
  	"iso639-1": "ca"
  };
  var Cebuano = {
  	name: "Cebuano",
  	names: [
  		"Cebuano"
  	],
  	"iso639-2": "ceb",
  	"iso639-1": null
  };
  var Chagatai = {
  	name: "Chagatai",
  	names: [
  		"Chagatai"
  	],
  	"iso639-2": "chg",
  	"iso639-1": null
  };
  var Chamorro = {
  	name: "Chamorro",
  	names: [
  		"Chamorro"
  	],
  	"iso639-2": "cha",
  	"iso639-1": "ch"
  };
  var Chechen = {
  	name: "Chechen",
  	names: [
  		"Chechen"
  	],
  	"iso639-2": "che",
  	"iso639-1": "ce"
  };
  var Cherokee = {
  	name: "Cherokee",
  	names: [
  		"Cherokee"
  	],
  	"iso639-2": "chr",
  	"iso639-1": null
  };
  var Chewa = {
  	name: "Chewa",
  	names: [
  		"Chichewa",
  		"Chewa",
  		"Nyanja"
  	],
  	"iso639-2": "nya",
  	"iso639-1": "ny"
  };
  var Cheyenne = {
  	name: "Cheyenne",
  	names: [
  		"Cheyenne"
  	],
  	"iso639-2": "chy",
  	"iso639-1": null
  };
  var Chibcha = {
  	name: "Chibcha",
  	names: [
  		"Chibcha"
  	],
  	"iso639-2": "chb",
  	"iso639-1": null
  };
  var Chichewa = {
  	name: "Chichewa",
  	names: [
  		"Chichewa",
  		"Chewa",
  		"Nyanja"
  	],
  	"iso639-2": "nya",
  	"iso639-1": "ny"
  };
  var Chinese = {
  	name: "Chinese",
  	names: [
  		"Chinese"
  	],
  	"iso639-2": "chi/zho",
  	"iso639-1": "zh"
  };
  var Chipewyan = {
  	name: "Chipewyan",
  	names: [
  		"Chipewyan",
  		"Dene Suline"
  	],
  	"iso639-2": "chp",
  	"iso639-1": null
  };
  var Choctaw = {
  	name: "Choctaw",
  	names: [
  		"Choctaw"
  	],
  	"iso639-2": "cho",
  	"iso639-1": null
  };
  var Chuang = {
  	name: "Chuang",
  	names: [
  		"Zhuang",
  		"Chuang"
  	],
  	"iso639-2": "zha",
  	"iso639-1": "za"
  };
  var Chuukese = {
  	name: "Chuukese",
  	names: [
  		"Chuukese"
  	],
  	"iso639-2": "chk",
  	"iso639-1": null
  };
  var Chuvash = {
  	name: "Chuvash",
  	names: [
  		"Chuvash"
  	],
  	"iso639-2": "chv",
  	"iso639-1": "cv"
  };
  var Coptic = {
  	name: "Coptic",
  	names: [
  		"Coptic"
  	],
  	"iso639-2": "cop",
  	"iso639-1": null
  };
  var Cornish = {
  	name: "Cornish",
  	names: [
  		"Cornish"
  	],
  	"iso639-2": "cor",
  	"iso639-1": "kw"
  };
  var Corsican = {
  	name: "Corsican",
  	names: [
  		"Corsican"
  	],
  	"iso639-2": "cos",
  	"iso639-1": "co"
  };
  var Cree = {
  	name: "Cree",
  	names: [
  		"Cree"
  	],
  	"iso639-2": "cre",
  	"iso639-1": "cr"
  };
  var Creek = {
  	name: "Creek",
  	names: [
  		"Creek"
  	],
  	"iso639-2": "mus",
  	"iso639-1": null
  };
  var Croatian = {
  	name: "Croatian",
  	names: [
  		"Croatian"
  	],
  	"iso639-2": "hrv",
  	"iso639-1": "hr"
  };
  var Czech = {
  	name: "Czech",
  	names: [
  		"Czech"
  	],
  	"iso639-2": "cze/ces",
  	"iso639-1": "cs"
  };
  var Dakota = {
  	name: "Dakota",
  	names: [
  		"Dakota"
  	],
  	"iso639-2": "dak",
  	"iso639-1": null
  };
  var Danish = {
  	name: "Danish",
  	names: [
  		"Danish"
  	],
  	"iso639-2": "dan",
  	"iso639-1": "da"
  };
  var Dargwa = {
  	name: "Dargwa",
  	names: [
  		"Dargwa"
  	],
  	"iso639-2": "dar",
  	"iso639-1": null
  };
  var Delaware = {
  	name: "Delaware",
  	names: [
  		"Delaware"
  	],
  	"iso639-2": "del",
  	"iso639-1": null
  };
  var Dhivehi = {
  	name: "Dhivehi",
  	names: [
  		"Divehi",
  		"Dhivehi",
  		"Maldivian"
  	],
  	"iso639-2": "div",
  	"iso639-1": "dv"
  };
  var Dimili = {
  	name: "Dimili",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Dimli = {
  	name: "Dimli",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Dinka = {
  	name: "Dinka",
  	names: [
  		"Dinka"
  	],
  	"iso639-2": "din",
  	"iso639-1": null
  };
  var Divehi = {
  	name: "Divehi",
  	names: [
  		"Divehi",
  		"Dhivehi",
  		"Maldivian"
  	],
  	"iso639-2": "div",
  	"iso639-1": "dv"
  };
  var Dogri = {
  	name: "Dogri",
  	names: [
  		"Dogri"
  	],
  	"iso639-2": "doi",
  	"iso639-1": null
  };
  var Dogrib = {
  	name: "Dogrib",
  	names: [
  		"Dogrib"
  	],
  	"iso639-2": "dgr",
  	"iso639-1": null
  };
  var Duala = {
  	name: "Duala",
  	names: [
  		"Duala"
  	],
  	"iso639-2": "dua",
  	"iso639-1": null
  };
  var Dutch = {
  	name: "Dutch",
  	names: [
  		"Dutch",
  		"Flemish"
  	],
  	"iso639-2": "dut/nld",
  	"iso639-1": "nl"
  };
  var Dyula = {
  	name: "Dyula",
  	names: [
  		"Dyula"
  	],
  	"iso639-2": "dyu",
  	"iso639-1": null
  };
  var Dzongkha = {
  	name: "Dzongkha",
  	names: [
  		"Dzongkha"
  	],
  	"iso639-2": "dzo",
  	"iso639-1": "dz"
  };
  var Edo = {
  	name: "Edo",
  	names: [
  		"Bini",
  		"Edo"
  	],
  	"iso639-2": "bin",
  	"iso639-1": null
  };
  var Efik = {
  	name: "Efik",
  	names: [
  		"Efik"
  	],
  	"iso639-2": "efi",
  	"iso639-1": null
  };
  var Ekajuk = {
  	name: "Ekajuk",
  	names: [
  		"Ekajuk"
  	],
  	"iso639-2": "eka",
  	"iso639-1": null
  };
  var Elamite = {
  	name: "Elamite",
  	names: [
  		"Elamite"
  	],
  	"iso639-2": "elx",
  	"iso639-1": null
  };
  var English = {
  	name: "English",
  	names: [
  		"English"
  	],
  	"iso639-2": "eng",
  	"iso639-1": "en"
  };
  var Erzya = {
  	name: "Erzya",
  	names: [
  		"Erzya"
  	],
  	"iso639-2": "myv",
  	"iso639-1": null
  };
  var Esperanto = {
  	name: "Esperanto",
  	names: [
  		"Esperanto"
  	],
  	"iso639-2": "epo",
  	"iso639-1": "eo"
  };
  var Estonian = {
  	name: "Estonian",
  	names: [
  		"Estonian"
  	],
  	"iso639-2": "est",
  	"iso639-1": "et"
  };
  var Ewe = {
  	name: "Ewe",
  	names: [
  		"Ewe"
  	],
  	"iso639-2": "ewe",
  	"iso639-1": "ee"
  };
  var Ewondo = {
  	name: "Ewondo",
  	names: [
  		"Ewondo"
  	],
  	"iso639-2": "ewo",
  	"iso639-1": null
  };
  var Fang = {
  	name: "Fang",
  	names: [
  		"Fang"
  	],
  	"iso639-2": "fan",
  	"iso639-1": null
  };
  var Fanti = {
  	name: "Fanti",
  	names: [
  		"Fanti"
  	],
  	"iso639-2": "fat",
  	"iso639-1": null
  };
  var Faroese = {
  	name: "Faroese",
  	names: [
  		"Faroese"
  	],
  	"iso639-2": "fao",
  	"iso639-1": "fo"
  };
  var Fijian = {
  	name: "Fijian",
  	names: [
  		"Fijian"
  	],
  	"iso639-2": "fij",
  	"iso639-1": "fj"
  };
  var Filipino = {
  	name: "Filipino",
  	names: [
  		"Filipino",
  		"Pilipino"
  	],
  	"iso639-2": "fil",
  	"iso639-1": null
  };
  var Finnish = {
  	name: "Finnish",
  	names: [
  		"Finnish"
  	],
  	"iso639-2": "fin",
  	"iso639-1": "fi"
  };
  var Flemish = {
  	name: "Flemish",
  	names: [
  		"Dutch",
  		"Flemish"
  	],
  	"iso639-2": "dut/nld",
  	"iso639-1": "nl"
  };
  var Fon = {
  	name: "Fon",
  	names: [
  		"Fon"
  	],
  	"iso639-2": "fon",
  	"iso639-1": null
  };
  var French = {
  	name: "French",
  	names: [
  		"French"
  	],
  	"iso639-2": "fre/fra",
  	"iso639-1": "fr"
  };
  var Friulian = {
  	name: "Friulian",
  	names: [
  		"Friulian"
  	],
  	"iso639-2": "fur",
  	"iso639-1": null
  };
  var Fulah = {
  	name: "Fulah",
  	names: [
  		"Fulah"
  	],
  	"iso639-2": "ful",
  	"iso639-1": "ff"
  };
  var Ga = {
  	name: "Ga",
  	names: [
  		"Ga"
  	],
  	"iso639-2": "gaa",
  	"iso639-1": null
  };
  var Gaelic = {
  	name: "Gaelic",
  	names: [
  		"Gaelic",
  		"Scottish Gaelic"
  	],
  	"iso639-2": "gla",
  	"iso639-1": "gd"
  };
  var Galician = {
  	name: "Galician",
  	names: [
  		"Galician"
  	],
  	"iso639-2": "glg",
  	"iso639-1": "gl"
  };
  var Ganda = {
  	name: "Ganda",
  	names: [
  		"Ganda"
  	],
  	"iso639-2": "lug",
  	"iso639-1": "lg"
  };
  var Gayo = {
  	name: "Gayo",
  	names: [
  		"Gayo"
  	],
  	"iso639-2": "gay",
  	"iso639-1": null
  };
  var Gbaya = {
  	name: "Gbaya",
  	names: [
  		"Gbaya"
  	],
  	"iso639-2": "gba",
  	"iso639-1": null
  };
  var Geez = {
  	name: "Geez",
  	names: [
  		"Geez"
  	],
  	"iso639-2": "gez",
  	"iso639-1": null
  };
  var Georgian = {
  	name: "Georgian",
  	names: [
  		"Georgian"
  	],
  	"iso639-2": "geo/kat",
  	"iso639-1": "ka"
  };
  var German = {
  	name: "German",
  	names: [
  		"German"
  	],
  	"iso639-2": "ger/deu",
  	"iso639-1": "de"
  };
  var Gikuyu = {
  	name: "Gikuyu",
  	names: [
  		"Kikuyu",
  		"Gikuyu"
  	],
  	"iso639-2": "kik",
  	"iso639-1": "ki"
  };
  var Gilbertese = {
  	name: "Gilbertese",
  	names: [
  		"Gilbertese"
  	],
  	"iso639-2": "gil",
  	"iso639-1": null
  };
  var Gondi = {
  	name: "Gondi",
  	names: [
  		"Gondi"
  	],
  	"iso639-2": "gon",
  	"iso639-1": null
  };
  var Gorontalo = {
  	name: "Gorontalo",
  	names: [
  		"Gorontalo"
  	],
  	"iso639-2": "gor",
  	"iso639-1": null
  };
  var Gothic = {
  	name: "Gothic",
  	names: [
  		"Gothic"
  	],
  	"iso639-2": "got",
  	"iso639-1": null
  };
  var Grebo = {
  	name: "Grebo",
  	names: [
  		"Grebo"
  	],
  	"iso639-2": "grb",
  	"iso639-1": null
  };
  var Greenlandic = {
  	name: "Greenlandic",
  	names: [
  		"Kalaallisut",
  		"Greenlandic"
  	],
  	"iso639-2": "kal",
  	"iso639-1": "kl"
  };
  var Guarani = {
  	name: "Guarani",
  	names: [
  		"Guarani"
  	],
  	"iso639-2": "grn",
  	"iso639-1": "gn"
  };
  var Gujarati = {
  	name: "Gujarati",
  	names: [
  		"Gujarati"
  	],
  	"iso639-2": "guj",
  	"iso639-1": "gu"
  };
  var Haida = {
  	name: "Haida",
  	names: [
  		"Haida"
  	],
  	"iso639-2": "hai",
  	"iso639-1": null
  };
  var Haitian = {
  	name: "Haitian",
  	names: [
  		"Haitian",
  		"Haitian Creole"
  	],
  	"iso639-2": "hat",
  	"iso639-1": "ht"
  };
  var Hausa = {
  	name: "Hausa",
  	names: [
  		"Hausa"
  	],
  	"iso639-2": "hau",
  	"iso639-1": "ha"
  };
  var Hawaiian = {
  	name: "Hawaiian",
  	names: [
  		"Hawaiian"
  	],
  	"iso639-2": "haw",
  	"iso639-1": null
  };
  var Hebrew = {
  	name: "Hebrew",
  	names: [
  		"Hebrew"
  	],
  	"iso639-2": "heb",
  	"iso639-1": "he"
  };
  var Herero = {
  	name: "Herero",
  	names: [
  		"Herero"
  	],
  	"iso639-2": "her",
  	"iso639-1": "hz"
  };
  var Hiligaynon = {
  	name: "Hiligaynon",
  	names: [
  		"Hiligaynon"
  	],
  	"iso639-2": "hil",
  	"iso639-1": null
  };
  var Hindi = {
  	name: "Hindi",
  	names: [
  		"Hindi"
  	],
  	"iso639-2": "hin",
  	"iso639-1": "hi"
  };
  var Hittite = {
  	name: "Hittite",
  	names: [
  		"Hittite"
  	],
  	"iso639-2": "hit",
  	"iso639-1": null
  };
  var Hmong = {
  	name: "Hmong",
  	names: [
  		"Hmong",
  		"Mong"
  	],
  	"iso639-2": "hmn",
  	"iso639-1": null
  };
  var Hungarian = {
  	name: "Hungarian",
  	names: [
  		"Hungarian"
  	],
  	"iso639-2": "hun",
  	"iso639-1": "hu"
  };
  var Hupa = {
  	name: "Hupa",
  	names: [
  		"Hupa"
  	],
  	"iso639-2": "hup",
  	"iso639-1": null
  };
  var Iban = {
  	name: "Iban",
  	names: [
  		"Iban"
  	],
  	"iso639-2": "iba",
  	"iso639-1": null
  };
  var Icelandic = {
  	name: "Icelandic",
  	names: [
  		"Icelandic"
  	],
  	"iso639-2": "ice/isl",
  	"iso639-1": "is"
  };
  var Ido = {
  	name: "Ido",
  	names: [
  		"Ido"
  	],
  	"iso639-2": "ido",
  	"iso639-1": "io"
  };
  var Igbo = {
  	name: "Igbo",
  	names: [
  		"Igbo"
  	],
  	"iso639-2": "ibo",
  	"iso639-1": "ig"
  };
  var Iloko = {
  	name: "Iloko",
  	names: [
  		"Iloko"
  	],
  	"iso639-2": "ilo",
  	"iso639-1": null
  };
  var Indonesian = {
  	name: "Indonesian",
  	names: [
  		"Indonesian"
  	],
  	"iso639-2": "ind",
  	"iso639-1": "id"
  };
  var Ingush = {
  	name: "Ingush",
  	names: [
  		"Ingush"
  	],
  	"iso639-2": "inh",
  	"iso639-1": null
  };
  var Interlingue = {
  	name: "Interlingue",
  	names: [
  		"Interlingue",
  		"Occidental"
  	],
  	"iso639-2": "ile",
  	"iso639-1": "ie"
  };
  var Inuktitut = {
  	name: "Inuktitut",
  	names: [
  		"Inuktitut"
  	],
  	"iso639-2": "iku",
  	"iso639-1": "iu"
  };
  var Inupiaq = {
  	name: "Inupiaq",
  	names: [
  		"Inupiaq"
  	],
  	"iso639-2": "ipk",
  	"iso639-1": "ik"
  };
  var Irish = {
  	name: "Irish",
  	names: [
  		"Irish"
  	],
  	"iso639-2": "gle",
  	"iso639-1": "ga"
  };
  var Italian = {
  	name: "Italian",
  	names: [
  		"Italian"
  	],
  	"iso639-2": "ita",
  	"iso639-1": "it"
  };
  var Japanese = {
  	name: "Japanese",
  	names: [
  		"Japanese"
  	],
  	"iso639-2": "jpn",
  	"iso639-1": "ja"
  };
  var Javanese = {
  	name: "Javanese",
  	names: [
  		"Javanese"
  	],
  	"iso639-2": "jav",
  	"iso639-1": "jv"
  };
  var Jingpho = {
  	name: "Jingpho",
  	names: [
  		"Kachin",
  		"Jingpho"
  	],
  	"iso639-2": "kac",
  	"iso639-1": null
  };
  var Kabardian = {
  	name: "Kabardian",
  	names: [
  		"Kabardian"
  	],
  	"iso639-2": "kbd",
  	"iso639-1": null
  };
  var Kabyle = {
  	name: "Kabyle",
  	names: [
  		"Kabyle"
  	],
  	"iso639-2": "kab",
  	"iso639-1": null
  };
  var Kachin = {
  	name: "Kachin",
  	names: [
  		"Kachin",
  		"Jingpho"
  	],
  	"iso639-2": "kac",
  	"iso639-1": null
  };
  var Kalaallisut = {
  	name: "Kalaallisut",
  	names: [
  		"Kalaallisut",
  		"Greenlandic"
  	],
  	"iso639-2": "kal",
  	"iso639-1": "kl"
  };
  var Kalmyk = {
  	name: "Kalmyk",
  	names: [
  		"Kalmyk",
  		"Oirat"
  	],
  	"iso639-2": "xal",
  	"iso639-1": null
  };
  var Kamba = {
  	name: "Kamba",
  	names: [
  		"Kamba"
  	],
  	"iso639-2": "kam",
  	"iso639-1": null
  };
  var Kannada = {
  	name: "Kannada",
  	names: [
  		"Kannada"
  	],
  	"iso639-2": "kan",
  	"iso639-1": "kn"
  };
  var Kanuri = {
  	name: "Kanuri",
  	names: [
  		"Kanuri"
  	],
  	"iso639-2": "kau",
  	"iso639-1": "kr"
  };
  var Kapampangan = {
  	name: "Kapampangan",
  	names: [
  		"Pampanga",
  		"Kapampangan"
  	],
  	"iso639-2": "pam",
  	"iso639-1": null
  };
  var Karelian = {
  	name: "Karelian",
  	names: [
  		"Karelian"
  	],
  	"iso639-2": "krl",
  	"iso639-1": null
  };
  var Kashmiri = {
  	name: "Kashmiri",
  	names: [
  		"Kashmiri"
  	],
  	"iso639-2": "kas",
  	"iso639-1": "ks"
  };
  var Kashubian = {
  	name: "Kashubian",
  	names: [
  		"Kashubian"
  	],
  	"iso639-2": "csb",
  	"iso639-1": null
  };
  var Kawi = {
  	name: "Kawi",
  	names: [
  		"Kawi"
  	],
  	"iso639-2": "kaw",
  	"iso639-1": null
  };
  var Kazakh = {
  	name: "Kazakh",
  	names: [
  		"Kazakh"
  	],
  	"iso639-2": "kaz",
  	"iso639-1": "kk"
  };
  var Khasi = {
  	name: "Khasi",
  	names: [
  		"Khasi"
  	],
  	"iso639-2": "kha",
  	"iso639-1": null
  };
  var Khotanese = {
  	name: "Khotanese",
  	names: [
  		"Khotanese",
  		"Sakan"
  	],
  	"iso639-2": "kho",
  	"iso639-1": null
  };
  var Kikuyu = {
  	name: "Kikuyu",
  	names: [
  		"Kikuyu",
  		"Gikuyu"
  	],
  	"iso639-2": "kik",
  	"iso639-1": "ki"
  };
  var Kimbundu = {
  	name: "Kimbundu",
  	names: [
  		"Kimbundu"
  	],
  	"iso639-2": "kmb",
  	"iso639-1": null
  };
  var Kinyarwanda = {
  	name: "Kinyarwanda",
  	names: [
  		"Kinyarwanda"
  	],
  	"iso639-2": "kin",
  	"iso639-1": "rw"
  };
  var Kirdki = {
  	name: "Kirdki",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Kirghiz = {
  	name: "Kirghiz",
  	names: [
  		"Kirghiz",
  		"Kyrgyz"
  	],
  	"iso639-2": "kir",
  	"iso639-1": "ky"
  };
  var Kirmanjki = {
  	name: "Kirmanjki",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Klingon = {
  	name: "Klingon",
  	names: [
  		"Klingon",
  		"tlhIngan-Hol"
  	],
  	"iso639-2": "tlh",
  	"iso639-1": null
  };
  var Komi = {
  	name: "Komi",
  	names: [
  		"Komi"
  	],
  	"iso639-2": "kom",
  	"iso639-1": "kv"
  };
  var Kongo = {
  	name: "Kongo",
  	names: [
  		"Kongo"
  	],
  	"iso639-2": "kon",
  	"iso639-1": "kg"
  };
  var Konkani = {
  	name: "Konkani",
  	names: [
  		"Konkani"
  	],
  	"iso639-2": "kok",
  	"iso639-1": null
  };
  var Korean = {
  	name: "Korean",
  	names: [
  		"Korean"
  	],
  	"iso639-2": "kor",
  	"iso639-1": "ko"
  };
  var Kosraean = {
  	name: "Kosraean",
  	names: [
  		"Kosraean"
  	],
  	"iso639-2": "kos",
  	"iso639-1": null
  };
  var Kpelle = {
  	name: "Kpelle",
  	names: [
  		"Kpelle"
  	],
  	"iso639-2": "kpe",
  	"iso639-1": null
  };
  var Kuanyama = {
  	name: "Kuanyama",
  	names: [
  		"Kuanyama",
  		"Kwanyama"
  	],
  	"iso639-2": "kua",
  	"iso639-1": "kj"
  };
  var Kumyk = {
  	name: "Kumyk",
  	names: [
  		"Kumyk"
  	],
  	"iso639-2": "kum",
  	"iso639-1": null
  };
  var Kurdish = {
  	name: "Kurdish",
  	names: [
  		"Kurdish"
  	],
  	"iso639-2": "kur",
  	"iso639-1": "ku"
  };
  var Kurukh = {
  	name: "Kurukh",
  	names: [
  		"Kurukh"
  	],
  	"iso639-2": "kru",
  	"iso639-1": null
  };
  var Kutenai = {
  	name: "Kutenai",
  	names: [
  		"Kutenai"
  	],
  	"iso639-2": "kut",
  	"iso639-1": null
  };
  var Kwanyama = {
  	name: "Kwanyama",
  	names: [
  		"Kuanyama",
  		"Kwanyama"
  	],
  	"iso639-2": "kua",
  	"iso639-1": "kj"
  };
  var Kyrgyz = {
  	name: "Kyrgyz",
  	names: [
  		"Kirghiz",
  		"Kyrgyz"
  	],
  	"iso639-2": "kir",
  	"iso639-1": "ky"
  };
  var Ladino = {
  	name: "Ladino",
  	names: [
  		"Ladino"
  	],
  	"iso639-2": "lad",
  	"iso639-1": null
  };
  var Lahnda = {
  	name: "Lahnda",
  	names: [
  		"Lahnda"
  	],
  	"iso639-2": "lah",
  	"iso639-1": null
  };
  var Lamba = {
  	name: "Lamba",
  	names: [
  		"Lamba"
  	],
  	"iso639-2": "lam",
  	"iso639-1": null
  };
  var Lao = {
  	name: "Lao",
  	names: [
  		"Lao"
  	],
  	"iso639-2": "lao",
  	"iso639-1": "lo"
  };
  var Latin = {
  	name: "Latin",
  	names: [
  		"Latin"
  	],
  	"iso639-2": "lat",
  	"iso639-1": "la"
  };
  var Latvian = {
  	name: "Latvian",
  	names: [
  		"Latvian"
  	],
  	"iso639-2": "lav",
  	"iso639-1": "lv"
  };
  var Leonese = {
  	name: "Leonese",
  	names: [
  		"Asturian",
  		"Bable",
  		"Leonese",
  		"Asturleonese"
  	],
  	"iso639-2": "ast",
  	"iso639-1": null
  };
  var Letzeburgesch = {
  	name: "Letzeburgesch",
  	names: [
  		"Luxembourgish",
  		"Letzeburgesch"
  	],
  	"iso639-2": "ltz",
  	"iso639-1": "lb"
  };
  var Lezghian = {
  	name: "Lezghian",
  	names: [
  		"Lezghian"
  	],
  	"iso639-2": "lez",
  	"iso639-1": null
  };
  var Limburgan = {
  	name: "Limburgan",
  	names: [
  		"Limburgan",
  		"Limburger",
  		"Limburgish"
  	],
  	"iso639-2": "lim",
  	"iso639-1": "li"
  };
  var Limburger = {
  	name: "Limburger",
  	names: [
  		"Limburgan",
  		"Limburger",
  		"Limburgish"
  	],
  	"iso639-2": "lim",
  	"iso639-1": "li"
  };
  var Limburgish = {
  	name: "Limburgish",
  	names: [
  		"Limburgan",
  		"Limburger",
  		"Limburgish"
  	],
  	"iso639-2": "lim",
  	"iso639-1": "li"
  };
  var Lingala = {
  	name: "Lingala",
  	names: [
  		"Lingala"
  	],
  	"iso639-2": "lin",
  	"iso639-1": "ln"
  };
  var Lithuanian = {
  	name: "Lithuanian",
  	names: [
  		"Lithuanian"
  	],
  	"iso639-2": "lit",
  	"iso639-1": "lt"
  };
  var Lojban = {
  	name: "Lojban",
  	names: [
  		"Lojban"
  	],
  	"iso639-2": "jbo",
  	"iso639-1": null
  };
  var Lozi = {
  	name: "Lozi",
  	names: [
  		"Lozi"
  	],
  	"iso639-2": "loz",
  	"iso639-1": null
  };
  var Luiseno = {
  	name: "Luiseno",
  	names: [
  		"Luiseno"
  	],
  	"iso639-2": "lui",
  	"iso639-1": null
  };
  var Lunda = {
  	name: "Lunda",
  	names: [
  		"Lunda"
  	],
  	"iso639-2": "lun",
  	"iso639-1": null
  };
  var Lushai = {
  	name: "Lushai",
  	names: [
  		"Lushai"
  	],
  	"iso639-2": "lus",
  	"iso639-1": null
  };
  var Luxembourgish = {
  	name: "Luxembourgish",
  	names: [
  		"Luxembourgish",
  		"Letzeburgesch"
  	],
  	"iso639-2": "ltz",
  	"iso639-1": "lb"
  };
  var Macedonian = {
  	name: "Macedonian",
  	names: [
  		"Macedonian"
  	],
  	"iso639-2": "mac/mkd",
  	"iso639-1": "mk"
  };
  var Madurese = {
  	name: "Madurese",
  	names: [
  		"Madurese"
  	],
  	"iso639-2": "mad",
  	"iso639-1": null
  };
  var Magahi = {
  	name: "Magahi",
  	names: [
  		"Magahi"
  	],
  	"iso639-2": "mag",
  	"iso639-1": null
  };
  var Maithili = {
  	name: "Maithili",
  	names: [
  		"Maithili"
  	],
  	"iso639-2": "mai",
  	"iso639-1": null
  };
  var Makasar = {
  	name: "Makasar",
  	names: [
  		"Makasar"
  	],
  	"iso639-2": "mak",
  	"iso639-1": null
  };
  var Malagasy = {
  	name: "Malagasy",
  	names: [
  		"Malagasy"
  	],
  	"iso639-2": "mlg",
  	"iso639-1": "mg"
  };
  var Malay = {
  	name: "Malay",
  	names: [
  		"Malay"
  	],
  	"iso639-2": "may/msa",
  	"iso639-1": "ms"
  };
  var Malayalam = {
  	name: "Malayalam",
  	names: [
  		"Malayalam"
  	],
  	"iso639-2": "mal",
  	"iso639-1": "ml"
  };
  var Maldivian = {
  	name: "Maldivian",
  	names: [
  		"Divehi",
  		"Dhivehi",
  		"Maldivian"
  	],
  	"iso639-2": "div",
  	"iso639-1": "dv"
  };
  var Maltese = {
  	name: "Maltese",
  	names: [
  		"Maltese"
  	],
  	"iso639-2": "mlt",
  	"iso639-1": "mt"
  };
  var Manchu = {
  	name: "Manchu",
  	names: [
  		"Manchu"
  	],
  	"iso639-2": "mnc",
  	"iso639-1": null
  };
  var Mandar = {
  	name: "Mandar",
  	names: [
  		"Mandar"
  	],
  	"iso639-2": "mdr",
  	"iso639-1": null
  };
  var Mandingo = {
  	name: "Mandingo",
  	names: [
  		"Mandingo"
  	],
  	"iso639-2": "man",
  	"iso639-1": null
  };
  var Manipuri = {
  	name: "Manipuri",
  	names: [
  		"Manipuri"
  	],
  	"iso639-2": "mni",
  	"iso639-1": null
  };
  var Manx = {
  	name: "Manx",
  	names: [
  		"Manx"
  	],
  	"iso639-2": "glv",
  	"iso639-1": "gv"
  };
  var Maori = {
  	name: "Maori",
  	names: [
  		"Maori"
  	],
  	"iso639-2": "mao/mri",
  	"iso639-1": "mi"
  };
  var Mapuche = {
  	name: "Mapuche",
  	names: [
  		"Mapudungun",
  		"Mapuche"
  	],
  	"iso639-2": "arn",
  	"iso639-1": null
  };
  var Mapudungun = {
  	name: "Mapudungun",
  	names: [
  		"Mapudungun",
  		"Mapuche"
  	],
  	"iso639-2": "arn",
  	"iso639-1": null
  };
  var Marathi = {
  	name: "Marathi",
  	names: [
  		"Marathi"
  	],
  	"iso639-2": "mar",
  	"iso639-1": "mr"
  };
  var Mari = {
  	name: "Mari",
  	names: [
  		"Mari"
  	],
  	"iso639-2": "chm",
  	"iso639-1": null
  };
  var Marshallese = {
  	name: "Marshallese",
  	names: [
  		"Marshallese"
  	],
  	"iso639-2": "mah",
  	"iso639-1": "mh"
  };
  var Marwari = {
  	name: "Marwari",
  	names: [
  		"Marwari"
  	],
  	"iso639-2": "mwr",
  	"iso639-1": null
  };
  var Masai = {
  	name: "Masai",
  	names: [
  		"Masai"
  	],
  	"iso639-2": "mas",
  	"iso639-1": null
  };
  var Mende = {
  	name: "Mende",
  	names: [
  		"Mende"
  	],
  	"iso639-2": "men",
  	"iso639-1": null
  };
  var Micmac = {
  	name: "Micmac",
  	names: [
  		"Mi'kmaq",
  		"Micmac"
  	],
  	"iso639-2": "mic",
  	"iso639-1": null
  };
  var Minangkabau = {
  	name: "Minangkabau",
  	names: [
  		"Minangkabau"
  	],
  	"iso639-2": "min",
  	"iso639-1": null
  };
  var Mirandese = {
  	name: "Mirandese",
  	names: [
  		"Mirandese"
  	],
  	"iso639-2": "mwl",
  	"iso639-1": null
  };
  var Mohawk = {
  	name: "Mohawk",
  	names: [
  		"Mohawk"
  	],
  	"iso639-2": "moh",
  	"iso639-1": null
  };
  var Moksha = {
  	name: "Moksha",
  	names: [
  		"Moksha"
  	],
  	"iso639-2": "mdf",
  	"iso639-1": null
  };
  var Moldavian = {
  	name: "Moldavian",
  	names: [
  		"Romanian",
  		"Moldavian",
  		"Moldovan"
  	],
  	"iso639-2": "rum/ron",
  	"iso639-1": "ro"
  };
  var Moldovan = {
  	name: "Moldovan",
  	names: [
  		"Romanian",
  		"Moldavian",
  		"Moldovan"
  	],
  	"iso639-2": "rum/ron",
  	"iso639-1": "ro"
  };
  var Mong = {
  	name: "Mong",
  	names: [
  		"Hmong",
  		"Mong"
  	],
  	"iso639-2": "hmn",
  	"iso639-1": null
  };
  var Mongo = {
  	name: "Mongo",
  	names: [
  		"Mongo"
  	],
  	"iso639-2": "lol",
  	"iso639-1": null
  };
  var Mongolian = {
  	name: "Mongolian",
  	names: [
  		"Mongolian"
  	],
  	"iso639-2": "mon",
  	"iso639-1": "mn"
  };
  var Montenegrin = {
  	name: "Montenegrin",
  	names: [
  		"Montenegrin"
  	],
  	"iso639-2": "cnr",
  	"iso639-1": null
  };
  var Mossi = {
  	name: "Mossi",
  	names: [
  		"Mossi"
  	],
  	"iso639-2": "mos",
  	"iso639-1": null
  };
  var Nauru = {
  	name: "Nauru",
  	names: [
  		"Nauru"
  	],
  	"iso639-2": "nau",
  	"iso639-1": "na"
  };
  var Navaho = {
  	name: "Navaho",
  	names: [
  		"Navajo",
  		"Navaho"
  	],
  	"iso639-2": "nav",
  	"iso639-1": "nv"
  };
  var Navajo = {
  	name: "Navajo",
  	names: [
  		"Navajo",
  		"Navaho"
  	],
  	"iso639-2": "nav",
  	"iso639-1": "nv"
  };
  var Ndonga = {
  	name: "Ndonga",
  	names: [
  		"Ndonga"
  	],
  	"iso639-2": "ndo",
  	"iso639-1": "ng"
  };
  var Neapolitan = {
  	name: "Neapolitan",
  	names: [
  		"Neapolitan"
  	],
  	"iso639-2": "nap",
  	"iso639-1": null
  };
  var Nepali = {
  	name: "Nepali",
  	names: [
  		"Nepali"
  	],
  	"iso639-2": "nep",
  	"iso639-1": "ne"
  };
  var Newari = {
  	name: "Newari",
  	names: [
  		"Nepal Bhasa",
  		"Newari"
  	],
  	"iso639-2": "new",
  	"iso639-1": null
  };
  var Nias = {
  	name: "Nias",
  	names: [
  		"Nias"
  	],
  	"iso639-2": "nia",
  	"iso639-1": null
  };
  var Niuean = {
  	name: "Niuean",
  	names: [
  		"Niuean"
  	],
  	"iso639-2": "niu",
  	"iso639-1": null
  };
  var Nogai = {
  	name: "Nogai",
  	names: [
  		"Nogai"
  	],
  	"iso639-2": "nog",
  	"iso639-1": null
  };
  var Norwegian = {
  	name: "Norwegian",
  	names: [
  		"Norwegian"
  	],
  	"iso639-2": "nor",
  	"iso639-1": "no"
  };
  var Nuosu = {
  	name: "Nuosu",
  	names: [
  		"Sichuan Yi",
  		"Nuosu"
  	],
  	"iso639-2": "iii",
  	"iso639-1": "ii"
  };
  var Nyamwezi = {
  	name: "Nyamwezi",
  	names: [
  		"Nyamwezi"
  	],
  	"iso639-2": "nym",
  	"iso639-1": null
  };
  var Nyanja = {
  	name: "Nyanja",
  	names: [
  		"Chichewa",
  		"Chewa",
  		"Nyanja"
  	],
  	"iso639-2": "nya",
  	"iso639-1": "ny"
  };
  var Nyankole = {
  	name: "Nyankole",
  	names: [
  		"Nyankole"
  	],
  	"iso639-2": "nyn",
  	"iso639-1": null
  };
  var Nyoro = {
  	name: "Nyoro",
  	names: [
  		"Nyoro"
  	],
  	"iso639-2": "nyo",
  	"iso639-1": null
  };
  var Nzima = {
  	name: "Nzima",
  	names: [
  		"Nzima"
  	],
  	"iso639-2": "nzi",
  	"iso639-1": null
  };
  var Occidental = {
  	name: "Occidental",
  	names: [
  		"Interlingue",
  		"Occidental"
  	],
  	"iso639-2": "ile",
  	"iso639-1": "ie"
  };
  var Oirat = {
  	name: "Oirat",
  	names: [
  		"Kalmyk",
  		"Oirat"
  	],
  	"iso639-2": "xal",
  	"iso639-1": null
  };
  var Ojibwa = {
  	name: "Ojibwa",
  	names: [
  		"Ojibwa"
  	],
  	"iso639-2": "oji",
  	"iso639-1": "oj"
  };
  var Oriya = {
  	name: "Oriya",
  	names: [
  		"Oriya"
  	],
  	"iso639-2": "ori",
  	"iso639-1": "or"
  };
  var Oromo = {
  	name: "Oromo",
  	names: [
  		"Oromo"
  	],
  	"iso639-2": "orm",
  	"iso639-1": "om"
  };
  var Osage = {
  	name: "Osage",
  	names: [
  		"Osage"
  	],
  	"iso639-2": "osa",
  	"iso639-1": null
  };
  var Ossetian = {
  	name: "Ossetian",
  	names: [
  		"Ossetian",
  		"Ossetic"
  	],
  	"iso639-2": "oss",
  	"iso639-1": "os"
  };
  var Ossetic = {
  	name: "Ossetic",
  	names: [
  		"Ossetian",
  		"Ossetic"
  	],
  	"iso639-2": "oss",
  	"iso639-1": "os"
  };
  var Pahlavi = {
  	name: "Pahlavi",
  	names: [
  		"Pahlavi"
  	],
  	"iso639-2": "pal",
  	"iso639-1": null
  };
  var Palauan = {
  	name: "Palauan",
  	names: [
  		"Palauan"
  	],
  	"iso639-2": "pau",
  	"iso639-1": null
  };
  var Pali = {
  	name: "Pali",
  	names: [
  		"Pali"
  	],
  	"iso639-2": "pli",
  	"iso639-1": "pi"
  };
  var Pampanga = {
  	name: "Pampanga",
  	names: [
  		"Pampanga",
  		"Kapampangan"
  	],
  	"iso639-2": "pam",
  	"iso639-1": null
  };
  var Pangasinan = {
  	name: "Pangasinan",
  	names: [
  		"Pangasinan"
  	],
  	"iso639-2": "pag",
  	"iso639-1": null
  };
  var Panjabi = {
  	name: "Panjabi",
  	names: [
  		"Panjabi",
  		"Punjabi"
  	],
  	"iso639-2": "pan",
  	"iso639-1": "pa"
  };
  var Papiamento = {
  	name: "Papiamento",
  	names: [
  		"Papiamento"
  	],
  	"iso639-2": "pap",
  	"iso639-1": null
  };
  var Pashto = {
  	name: "Pashto",
  	names: [
  		"Pushto",
  		"Pashto"
  	],
  	"iso639-2": "pus",
  	"iso639-1": "ps"
  };
  var Pedi = {
  	name: "Pedi",
  	names: [
  		"Pedi",
  		"Sepedi",
  		"Northern Sotho"
  	],
  	"iso639-2": "nso",
  	"iso639-1": null
  };
  var Persian = {
  	name: "Persian",
  	names: [
  		"Persian"
  	],
  	"iso639-2": "per/fas",
  	"iso639-1": "fa"
  };
  var Phoenician = {
  	name: "Phoenician",
  	names: [
  		"Phoenician"
  	],
  	"iso639-2": "phn",
  	"iso639-1": null
  };
  var Pilipino = {
  	name: "Pilipino",
  	names: [
  		"Filipino",
  		"Pilipino"
  	],
  	"iso639-2": "fil",
  	"iso639-1": null
  };
  var Pohnpeian = {
  	name: "Pohnpeian",
  	names: [
  		"Pohnpeian"
  	],
  	"iso639-2": "pon",
  	"iso639-1": null
  };
  var Polish = {
  	name: "Polish",
  	names: [
  		"Polish"
  	],
  	"iso639-2": "pol",
  	"iso639-1": "pl"
  };
  var Portuguese = {
  	name: "Portuguese",
  	names: [
  		"Portuguese"
  	],
  	"iso639-2": "por",
  	"iso639-1": "pt"
  };
  var Punjabi = {
  	name: "Punjabi",
  	names: [
  		"Panjabi",
  		"Punjabi"
  	],
  	"iso639-2": "pan",
  	"iso639-1": "pa"
  };
  var Pushto = {
  	name: "Pushto",
  	names: [
  		"Pushto",
  		"Pashto"
  	],
  	"iso639-2": "pus",
  	"iso639-1": "ps"
  };
  var Quechua = {
  	name: "Quechua",
  	names: [
  		"Quechua"
  	],
  	"iso639-2": "que",
  	"iso639-1": "qu"
  };
  var Rajasthani = {
  	name: "Rajasthani",
  	names: [
  		"Rajasthani"
  	],
  	"iso639-2": "raj",
  	"iso639-1": null
  };
  var Rapanui = {
  	name: "Rapanui",
  	names: [
  		"Rapanui"
  	],
  	"iso639-2": "rap",
  	"iso639-1": null
  };
  var Rarotongan = {
  	name: "Rarotongan",
  	names: [
  		"Rarotongan",
  		"Cook Islands Maori"
  	],
  	"iso639-2": "rar",
  	"iso639-1": null
  };
  var Romanian = {
  	name: "Romanian",
  	names: [
  		"Romanian",
  		"Moldavian",
  		"Moldovan"
  	],
  	"iso639-2": "rum/ron",
  	"iso639-1": "ro"
  };
  var Romansh = {
  	name: "Romansh",
  	names: [
  		"Romansh"
  	],
  	"iso639-2": "roh",
  	"iso639-1": "rm"
  };
  var Romany = {
  	name: "Romany",
  	names: [
  		"Romany"
  	],
  	"iso639-2": "rom",
  	"iso639-1": null
  };
  var Rundi = {
  	name: "Rundi",
  	names: [
  		"Rundi"
  	],
  	"iso639-2": "run",
  	"iso639-1": "rn"
  };
  var Russian = {
  	name: "Russian",
  	names: [
  		"Russian"
  	],
  	"iso639-2": "rus",
  	"iso639-1": "ru"
  };
  var Sakan = {
  	name: "Sakan",
  	names: [
  		"Khotanese",
  		"Sakan"
  	],
  	"iso639-2": "kho",
  	"iso639-1": null
  };
  var Samoan = {
  	name: "Samoan",
  	names: [
  		"Samoan"
  	],
  	"iso639-2": "smo",
  	"iso639-1": "sm"
  };
  var Sandawe = {
  	name: "Sandawe",
  	names: [
  		"Sandawe"
  	],
  	"iso639-2": "sad",
  	"iso639-1": null
  };
  var Sango = {
  	name: "Sango",
  	names: [
  		"Sango"
  	],
  	"iso639-2": "sag",
  	"iso639-1": "sg"
  };
  var Sanskrit = {
  	name: "Sanskrit",
  	names: [
  		"Sanskrit"
  	],
  	"iso639-2": "san",
  	"iso639-1": "sa"
  };
  var Santali = {
  	name: "Santali",
  	names: [
  		"Santali"
  	],
  	"iso639-2": "sat",
  	"iso639-1": null
  };
  var Sardinian = {
  	name: "Sardinian",
  	names: [
  		"Sardinian"
  	],
  	"iso639-2": "srd",
  	"iso639-1": "sc"
  };
  var Sasak = {
  	name: "Sasak",
  	names: [
  		"Sasak"
  	],
  	"iso639-2": "sas",
  	"iso639-1": null
  };
  var Scots = {
  	name: "Scots",
  	names: [
  		"Scots"
  	],
  	"iso639-2": "sco",
  	"iso639-1": null
  };
  var Selkup = {
  	name: "Selkup",
  	names: [
  		"Selkup"
  	],
  	"iso639-2": "sel",
  	"iso639-1": null
  };
  var Sepedi = {
  	name: "Sepedi",
  	names: [
  		"Pedi",
  		"Sepedi",
  		"Northern Sotho"
  	],
  	"iso639-2": "nso",
  	"iso639-1": null
  };
  var Serbian = {
  	name: "Serbian",
  	names: [
  		"Serbian"
  	],
  	"iso639-2": "srp",
  	"iso639-1": "sr"
  };
  var Serer = {
  	name: "Serer",
  	names: [
  		"Serer"
  	],
  	"iso639-2": "srr",
  	"iso639-1": null
  };
  var Shan = {
  	name: "Shan",
  	names: [
  		"Shan"
  	],
  	"iso639-2": "shn",
  	"iso639-1": null
  };
  var Shona = {
  	name: "Shona",
  	names: [
  		"Shona"
  	],
  	"iso639-2": "sna",
  	"iso639-1": "sn"
  };
  var Sicilian = {
  	name: "Sicilian",
  	names: [
  		"Sicilian"
  	],
  	"iso639-2": "scn",
  	"iso639-1": null
  };
  var Sidamo = {
  	name: "Sidamo",
  	names: [
  		"Sidamo"
  	],
  	"iso639-2": "sid",
  	"iso639-1": null
  };
  var Siksika = {
  	name: "Siksika",
  	names: [
  		"Siksika"
  	],
  	"iso639-2": "bla",
  	"iso639-1": null
  };
  var Sindhi = {
  	name: "Sindhi",
  	names: [
  		"Sindhi"
  	],
  	"iso639-2": "snd",
  	"iso639-1": "sd"
  };
  var Sinhala = {
  	name: "Sinhala",
  	names: [
  		"Sinhala",
  		"Sinhalese"
  	],
  	"iso639-2": "sin",
  	"iso639-1": "si"
  };
  var Sinhalese = {
  	name: "Sinhalese",
  	names: [
  		"Sinhala",
  		"Sinhalese"
  	],
  	"iso639-2": "sin",
  	"iso639-1": "si"
  };
  var Slovak = {
  	name: "Slovak",
  	names: [
  		"Slovak"
  	],
  	"iso639-2": "slo/slk",
  	"iso639-1": "sk"
  };
  var Slovenian = {
  	name: "Slovenian",
  	names: [
  		"Slovenian"
  	],
  	"iso639-2": "slv",
  	"iso639-1": "sl"
  };
  var Sogdian = {
  	name: "Sogdian",
  	names: [
  		"Sogdian"
  	],
  	"iso639-2": "sog",
  	"iso639-1": null
  };
  var Somali = {
  	name: "Somali",
  	names: [
  		"Somali"
  	],
  	"iso639-2": "som",
  	"iso639-1": "so"
  };
  var Soninke = {
  	name: "Soninke",
  	names: [
  		"Soninke"
  	],
  	"iso639-2": "snk",
  	"iso639-1": null
  };
  var Spanish = {
  	name: "Spanish",
  	names: [
  		"Spanish",
  		"Castilian"
  	],
  	"iso639-2": "spa",
  	"iso639-1": "es"
  };
  var Sukuma = {
  	name: "Sukuma",
  	names: [
  		"Sukuma"
  	],
  	"iso639-2": "suk",
  	"iso639-1": null
  };
  var Sumerian = {
  	name: "Sumerian",
  	names: [
  		"Sumerian"
  	],
  	"iso639-2": "sux",
  	"iso639-1": null
  };
  var Sundanese = {
  	name: "Sundanese",
  	names: [
  		"Sundanese"
  	],
  	"iso639-2": "sun",
  	"iso639-1": "su"
  };
  var Susu = {
  	name: "Susu",
  	names: [
  		"Susu"
  	],
  	"iso639-2": "sus",
  	"iso639-1": null
  };
  var Swahili = {
  	name: "Swahili",
  	names: [
  		"Swahili"
  	],
  	"iso639-2": "swa",
  	"iso639-1": "sw"
  };
  var Swati = {
  	name: "Swati",
  	names: [
  		"Swati"
  	],
  	"iso639-2": "ssw",
  	"iso639-1": "ss"
  };
  var Swedish = {
  	name: "Swedish",
  	names: [
  		"Swedish"
  	],
  	"iso639-2": "swe",
  	"iso639-1": "sv"
  };
  var Syriac = {
  	name: "Syriac",
  	names: [
  		"Syriac"
  	],
  	"iso639-2": "syr",
  	"iso639-1": null
  };
  var Tagalog = {
  	name: "Tagalog",
  	names: [
  		"Tagalog"
  	],
  	"iso639-2": "tgl",
  	"iso639-1": "tl"
  };
  var Tahitian = {
  	name: "Tahitian",
  	names: [
  		"Tahitian"
  	],
  	"iso639-2": "tah",
  	"iso639-1": "ty"
  };
  var Tajik = {
  	name: "Tajik",
  	names: [
  		"Tajik"
  	],
  	"iso639-2": "tgk",
  	"iso639-1": "tg"
  };
  var Tamashek = {
  	name: "Tamashek",
  	names: [
  		"Tamashek"
  	],
  	"iso639-2": "tmh",
  	"iso639-1": null
  };
  var Tamil = {
  	name: "Tamil",
  	names: [
  		"Tamil"
  	],
  	"iso639-2": "tam",
  	"iso639-1": "ta"
  };
  var Tatar = {
  	name: "Tatar",
  	names: [
  		"Tatar"
  	],
  	"iso639-2": "tat",
  	"iso639-1": "tt"
  };
  var Telugu = {
  	name: "Telugu",
  	names: [
  		"Telugu"
  	],
  	"iso639-2": "tel",
  	"iso639-1": "te"
  };
  var Tereno = {
  	name: "Tereno",
  	names: [
  		"Tereno"
  	],
  	"iso639-2": "ter",
  	"iso639-1": null
  };
  var Tetum = {
  	name: "Tetum",
  	names: [
  		"Tetum"
  	],
  	"iso639-2": "tet",
  	"iso639-1": null
  };
  var Thai = {
  	name: "Thai",
  	names: [
  		"Thai"
  	],
  	"iso639-2": "tha",
  	"iso639-1": "th"
  };
  var Tibetan = {
  	name: "Tibetan",
  	names: [
  		"Tibetan"
  	],
  	"iso639-2": "tib/bod",
  	"iso639-1": "bo"
  };
  var Tigre = {
  	name: "Tigre",
  	names: [
  		"Tigre"
  	],
  	"iso639-2": "tig",
  	"iso639-1": null
  };
  var Tigrinya = {
  	name: "Tigrinya",
  	names: [
  		"Tigrinya"
  	],
  	"iso639-2": "tir",
  	"iso639-1": "ti"
  };
  var Timne = {
  	name: "Timne",
  	names: [
  		"Timne"
  	],
  	"iso639-2": "tem",
  	"iso639-1": null
  };
  var Tiv = {
  	name: "Tiv",
  	names: [
  		"Tiv"
  	],
  	"iso639-2": "tiv",
  	"iso639-1": null
  };
  var Tlingit = {
  	name: "Tlingit",
  	names: [
  		"Tlingit"
  	],
  	"iso639-2": "tli",
  	"iso639-1": null
  };
  var Tokelau = {
  	name: "Tokelau",
  	names: [
  		"Tokelau"
  	],
  	"iso639-2": "tkl",
  	"iso639-1": null
  };
  var Tsimshian = {
  	name: "Tsimshian",
  	names: [
  		"Tsimshian"
  	],
  	"iso639-2": "tsi",
  	"iso639-1": null
  };
  var Tsonga = {
  	name: "Tsonga",
  	names: [
  		"Tsonga"
  	],
  	"iso639-2": "tso",
  	"iso639-1": "ts"
  };
  var Tswana = {
  	name: "Tswana",
  	names: [
  		"Tswana"
  	],
  	"iso639-2": "tsn",
  	"iso639-1": "tn"
  };
  var Tumbuka = {
  	name: "Tumbuka",
  	names: [
  		"Tumbuka"
  	],
  	"iso639-2": "tum",
  	"iso639-1": null
  };
  var Turkish = {
  	name: "Turkish",
  	names: [
  		"Turkish"
  	],
  	"iso639-2": "tur",
  	"iso639-1": "tr"
  };
  var Turkmen = {
  	name: "Turkmen",
  	names: [
  		"Turkmen"
  	],
  	"iso639-2": "tuk",
  	"iso639-1": "tk"
  };
  var Tuvalu = {
  	name: "Tuvalu",
  	names: [
  		"Tuvalu"
  	],
  	"iso639-2": "tvl",
  	"iso639-1": null
  };
  var Tuvinian = {
  	name: "Tuvinian",
  	names: [
  		"Tuvinian"
  	],
  	"iso639-2": "tyv",
  	"iso639-1": null
  };
  var Twi = {
  	name: "Twi",
  	names: [
  		"Twi"
  	],
  	"iso639-2": "twi",
  	"iso639-1": "tw"
  };
  var Udmurt = {
  	name: "Udmurt",
  	names: [
  		"Udmurt"
  	],
  	"iso639-2": "udm",
  	"iso639-1": null
  };
  var Ugaritic = {
  	name: "Ugaritic",
  	names: [
  		"Ugaritic"
  	],
  	"iso639-2": "uga",
  	"iso639-1": null
  };
  var Uighur = {
  	name: "Uighur",
  	names: [
  		"Uighur",
  		"Uyghur"
  	],
  	"iso639-2": "uig",
  	"iso639-1": "ug"
  };
  var Ukrainian = {
  	name: "Ukrainian",
  	names: [
  		"Ukrainian"
  	],
  	"iso639-2": "ukr",
  	"iso639-1": "uk"
  };
  var Umbundu = {
  	name: "Umbundu",
  	names: [
  		"Umbundu"
  	],
  	"iso639-2": "umb",
  	"iso639-1": null
  };
  var Undetermined = {
  	name: "Undetermined",
  	names: [
  		"Undetermined"
  	],
  	"iso639-2": "und",
  	"iso639-1": null
  };
  var Urdu = {
  	name: "Urdu",
  	names: [
  		"Urdu"
  	],
  	"iso639-2": "urd",
  	"iso639-1": "ur"
  };
  var Uyghur = {
  	name: "Uyghur",
  	names: [
  		"Uighur",
  		"Uyghur"
  	],
  	"iso639-2": "uig",
  	"iso639-1": "ug"
  };
  var Uzbek = {
  	name: "Uzbek",
  	names: [
  		"Uzbek"
  	],
  	"iso639-2": "uzb",
  	"iso639-1": "uz"
  };
  var Vai = {
  	name: "Vai",
  	names: [
  		"Vai"
  	],
  	"iso639-2": "vai",
  	"iso639-1": null
  };
  var Valencian = {
  	name: "Valencian",
  	names: [
  		"Catalan",
  		"Valencian"
  	],
  	"iso639-2": "cat",
  	"iso639-1": "ca"
  };
  var Venda = {
  	name: "Venda",
  	names: [
  		"Venda"
  	],
  	"iso639-2": "ven",
  	"iso639-1": "ve"
  };
  var Vietnamese = {
  	name: "Vietnamese",
  	names: [
  		"Vietnamese"
  	],
  	"iso639-2": "vie",
  	"iso639-1": "vi"
  };
  var Votic = {
  	name: "Votic",
  	names: [
  		"Votic"
  	],
  	"iso639-2": "vot",
  	"iso639-1": null
  };
  var Walloon = {
  	name: "Walloon",
  	names: [
  		"Walloon"
  	],
  	"iso639-2": "wln",
  	"iso639-1": "wa"
  };
  var Waray = {
  	name: "Waray",
  	names: [
  		"Waray"
  	],
  	"iso639-2": "war",
  	"iso639-1": null
  };
  var Washo = {
  	name: "Washo",
  	names: [
  		"Washo"
  	],
  	"iso639-2": "was",
  	"iso639-1": null
  };
  var Welsh = {
  	name: "Welsh",
  	names: [
  		"Welsh"
  	],
  	"iso639-2": "wel/cym",
  	"iso639-1": "cy"
  };
  var Wolaitta = {
  	name: "Wolaitta",
  	names: [
  		"Wolaitta",
  		"Wolaytta"
  	],
  	"iso639-2": "wal",
  	"iso639-1": null
  };
  var Wolaytta = {
  	name: "Wolaytta",
  	names: [
  		"Wolaitta",
  		"Wolaytta"
  	],
  	"iso639-2": "wal",
  	"iso639-1": null
  };
  var Wolof = {
  	name: "Wolof",
  	names: [
  		"Wolof"
  	],
  	"iso639-2": "wol",
  	"iso639-1": "wo"
  };
  var Xhosa = {
  	name: "Xhosa",
  	names: [
  		"Xhosa"
  	],
  	"iso639-2": "xho",
  	"iso639-1": "xh"
  };
  var Yakut = {
  	name: "Yakut",
  	names: [
  		"Yakut"
  	],
  	"iso639-2": "sah",
  	"iso639-1": null
  };
  var Yao = {
  	name: "Yao",
  	names: [
  		"Yao"
  	],
  	"iso639-2": "yao",
  	"iso639-1": null
  };
  var Yapese = {
  	name: "Yapese",
  	names: [
  		"Yapese"
  	],
  	"iso639-2": "yap",
  	"iso639-1": null
  };
  var Yiddish = {
  	name: "Yiddish",
  	names: [
  		"Yiddish"
  	],
  	"iso639-2": "yid",
  	"iso639-1": "yi"
  };
  var Yoruba = {
  	name: "Yoruba",
  	names: [
  		"Yoruba"
  	],
  	"iso639-2": "yor",
  	"iso639-1": "yo"
  };
  var Zapotec = {
  	name: "Zapotec",
  	names: [
  		"Zapotec"
  	],
  	"iso639-2": "zap",
  	"iso639-1": null
  };
  var Zaza = {
  	name: "Zaza",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Zazaki = {
  	name: "Zazaki",
  	names: [
  		"Zaza",
  		"Dimili",
  		"Dimli",
  		"Kirdki",
  		"Kirmanjki",
  		"Zazaki"
  	],
  	"iso639-2": "zza",
  	"iso639-1": null
  };
  var Zenaga = {
  	name: "Zenaga",
  	names: [
  		"Zenaga"
  	],
  	"iso639-2": "zen",
  	"iso639-1": null
  };
  var Zhuang = {
  	name: "Zhuang",
  	names: [
  		"Zhuang",
  		"Chuang"
  	],
  	"iso639-2": "zha",
  	"iso639-1": "za"
  };
  var Zulu = {
  	name: "Zulu",
  	names: [
  		"Zulu"
  	],
  	"iso639-2": "zul",
  	"iso639-1": "zu"
  };
  var Zuni = {
  	name: "Zuni",
  	names: [
  		"Zuni"
  	],
  	"iso639-2": "zun",
  	"iso639-1": null
  };
  var iso = {
  	Abkhazian: Abkhazian,
  	Achinese: Achinese,
  	Acoli: Acoli,
  	Adangme: Adangme,
  	Adygei: Adygei,
  	Adyghe: Adyghe,
  	Afar: Afar,
  	Afrihili: Afrihili,
  	Afrikaans: Afrikaans,
  	"Afro-Asiatic languages": {
  	name: "Afro-Asiatic languages",
  	names: [
  		"Afro-Asiatic languages"
  	],
  	"iso639-2": "afa",
  	"iso639-1": null
  },
  	Ainu: Ainu,
  	Akan: Akan,
  	Akkadian: Akkadian,
  	Albanian: Albanian,
  	Alemannic: Alemannic,
  	Aleut: Aleut,
  	"Algonquian languages": {
  	name: "Algonquian languages",
  	names: [
  		"Algonquian languages"
  	],
  	"iso639-2": "alg",
  	"iso639-1": null
  },
  	Alsatian: Alsatian,
  	"Altaic languages": {
  	name: "Altaic languages",
  	names: [
  		"Altaic languages"
  	],
  	"iso639-2": "tut",
  	"iso639-1": null
  },
  	Amharic: Amharic,
  	Angika: Angika,
  	"Apache languages": {
  	name: "Apache languages",
  	names: [
  		"Apache languages"
  	],
  	"iso639-2": "apa",
  	"iso639-1": null
  },
  	Arabic: Arabic,
  	Aragonese: Aragonese,
  	Arapaho: Arapaho,
  	Arawak: Arawak,
  	Armenian: Armenian,
  	Aromanian: Aromanian,
  	"Artificial languages": {
  	name: "Artificial languages",
  	names: [
  		"Artificial languages"
  	],
  	"iso639-2": "art",
  	"iso639-1": null
  },
  	Arumanian: Arumanian,
  	Assamese: Assamese,
  	Asturian: Asturian,
  	Asturleonese: Asturleonese,
  	"Athapascan languages": {
  	name: "Athapascan languages",
  	names: [
  		"Athapascan languages"
  	],
  	"iso639-2": "ath",
  	"iso639-1": null
  },
  	"Australian languages": {
  	name: "Australian languages",
  	names: [
  		"Australian languages"
  	],
  	"iso639-2": "aus",
  	"iso639-1": null
  },
  	"Austronesian languages": {
  	name: "Austronesian languages",
  	names: [
  		"Austronesian languages"
  	],
  	"iso639-2": "map",
  	"iso639-1": null
  },
  	Avaric: Avaric,
  	Avestan: Avestan,
  	Awadhi: Awadhi,
  	Aymara: Aymara,
  	Azerbaijani: Azerbaijani,
  	Bable: Bable,
  	Balinese: Balinese,
  	"Baltic languages": {
  	name: "Baltic languages",
  	names: [
  		"Baltic languages"
  	],
  	"iso639-2": "bat",
  	"iso639-1": null
  },
  	Baluchi: Baluchi,
  	Bambara: Bambara,
  	"Bamileke languages": {
  	name: "Bamileke languages",
  	names: [
  		"Bamileke languages"
  	],
  	"iso639-2": "bai",
  	"iso639-1": null
  },
  	"Banda languages": {
  	name: "Banda languages",
  	names: [
  		"Banda languages"
  	],
  	"iso639-2": "bad",
  	"iso639-1": null
  },
  	"Bantu languages": {
  	name: "Bantu languages",
  	names: [
  		"Bantu languages"
  	],
  	"iso639-2": "bnt",
  	"iso639-1": null
  },
  	Basa: Basa,
  	Bashkir: Bashkir,
  	Basque: Basque,
  	"Batak languages": {
  	name: "Batak languages",
  	names: [
  		"Batak languages"
  	],
  	"iso639-2": "btk",
  	"iso639-1": null
  },
  	Bedawiyet: Bedawiyet,
  	Beja: Beja,
  	Belarusian: Belarusian,
  	Bemba: Bemba,
  	Bengali: Bengali,
  	"Berber languages": {
  	name: "Berber languages",
  	names: [
  		"Berber languages"
  	],
  	"iso639-2": "ber",
  	"iso639-1": null
  },
  	Bhojpuri: Bhojpuri,
  	"Bihari languages": {
  	name: "Bihari languages",
  	names: [
  		"Bihari languages"
  	],
  	"iso639-2": "bih",
  	"iso639-1": "bh"
  },
  	Bikol: Bikol,
  	Bilin: Bilin,
  	Bini: Bini,
  	Bislama: Bislama,
  	Blin: Blin,
  	Bliss: Bliss,
  	Blissymbolics: Blissymbolics,
  	Blissymbols: Blissymbols,
  	"Bokmål, Norwegian": {
  	name: "Bokmål, Norwegian",
  	names: [
  		"Bokmål, Norwegian",
  		"Norwegian Bokmål"
  	],
  	"iso639-2": "nob",
  	"iso639-1": "nb"
  },
  	Bosnian: Bosnian,
  	Braj: Braj,
  	Breton: Breton,
  	Buginese: Buginese,
  	Bulgarian: Bulgarian,
  	Buriat: Buriat,
  	Burmese: Burmese,
  	Caddo: Caddo,
  	Castilian: Castilian,
  	Catalan: Catalan,
  	"Caucasian languages": {
  	name: "Caucasian languages",
  	names: [
  		"Caucasian languages"
  	],
  	"iso639-2": "cau",
  	"iso639-1": null
  },
  	Cebuano: Cebuano,
  	"Celtic languages": {
  	name: "Celtic languages",
  	names: [
  		"Celtic languages"
  	],
  	"iso639-2": "cel",
  	"iso639-1": null
  },
  	"Central American Indian languages": {
  	name: "Central American Indian languages",
  	names: [
  		"Central American Indian languages"
  	],
  	"iso639-2": "cai",
  	"iso639-1": null
  },
  	"Central Khmer": {
  	name: "Central Khmer",
  	names: [
  		"Central Khmer"
  	],
  	"iso639-2": "khm",
  	"iso639-1": "km"
  },
  	Chagatai: Chagatai,
  	"Chamic languages": {
  	name: "Chamic languages",
  	names: [
  		"Chamic languages"
  	],
  	"iso639-2": "cmc",
  	"iso639-1": null
  },
  	Chamorro: Chamorro,
  	Chechen: Chechen,
  	Cherokee: Cherokee,
  	Chewa: Chewa,
  	Cheyenne: Cheyenne,
  	Chibcha: Chibcha,
  	Chichewa: Chichewa,
  	Chinese: Chinese,
  	"Chinook jargon": {
  	name: "Chinook jargon",
  	names: [
  		"Chinook jargon"
  	],
  	"iso639-2": "chn",
  	"iso639-1": null
  },
  	Chipewyan: Chipewyan,
  	Choctaw: Choctaw,
  	Chuang: Chuang,
  	"Church Slavic": {
  	name: "Church Slavic",
  	names: [
  		"Church Slavic",
  		"Old Slavonic",
  		"Church Slavonic",
  		"Old Bulgarian",
  		"Old Church Slavonic"
  	],
  	"iso639-2": "chu",
  	"iso639-1": "cu"
  },
  	"Church Slavonic": {
  	name: "Church Slavonic",
  	names: [
  		"Church Slavic",
  		"Old Slavonic",
  		"Church Slavonic",
  		"Old Bulgarian",
  		"Old Church Slavonic"
  	],
  	"iso639-2": "chu",
  	"iso639-1": "cu"
  },
  	Chuukese: Chuukese,
  	Chuvash: Chuvash,
  	"Classical Nepal Bhasa": {
  	name: "Classical Nepal Bhasa",
  	names: [
  		"Classical Newari",
  		"Old Newari",
  		"Classical Nepal Bhasa"
  	],
  	"iso639-2": "nwc",
  	"iso639-1": null
  },
  	"Classical Newari": {
  	name: "Classical Newari",
  	names: [
  		"Classical Newari",
  		"Old Newari",
  		"Classical Nepal Bhasa"
  	],
  	"iso639-2": "nwc",
  	"iso639-1": null
  },
  	"Classical Syriac": {
  	name: "Classical Syriac",
  	names: [
  		"Classical Syriac"
  	],
  	"iso639-2": "syc",
  	"iso639-1": null
  },
  	"Cook Islands Maori": {
  	name: "Cook Islands Maori",
  	names: [
  		"Rarotongan",
  		"Cook Islands Maori"
  	],
  	"iso639-2": "rar",
  	"iso639-1": null
  },
  	Coptic: Coptic,
  	Cornish: Cornish,
  	Corsican: Corsican,
  	Cree: Cree,
  	Creek: Creek,
  	"Creoles and pidgins": {
  	name: "Creoles and pidgins",
  	names: [
  		"Creoles and pidgins"
  	],
  	"iso639-2": "crp",
  	"iso639-1": null
  },
  	"Creoles and pidgins, English based": {
  	name: "Creoles and pidgins, English based",
  	names: [
  		"Creoles and pidgins, English based"
  	],
  	"iso639-2": "cpe",
  	"iso639-1": null
  },
  	"Creoles and pidgins, French-based": {
  	name: "Creoles and pidgins, French-based",
  	names: [
  		"Creoles and pidgins, French-based"
  	],
  	"iso639-2": "cpf",
  	"iso639-1": null
  },
  	"Creoles and pidgins, Portuguese-based": {
  	name: "Creoles and pidgins, Portuguese-based",
  	names: [
  		"Creoles and pidgins, Portuguese-based"
  	],
  	"iso639-2": "cpp",
  	"iso639-1": null
  },
  	"Crimean Tatar": {
  	name: "Crimean Tatar",
  	names: [
  		"Crimean Tatar",
  		"Crimean Turkish"
  	],
  	"iso639-2": "crh",
  	"iso639-1": null
  },
  	"Crimean Turkish": {
  	name: "Crimean Turkish",
  	names: [
  		"Crimean Tatar",
  		"Crimean Turkish"
  	],
  	"iso639-2": "crh",
  	"iso639-1": null
  },
  	Croatian: Croatian,
  	"Cushitic languages": {
  	name: "Cushitic languages",
  	names: [
  		"Cushitic languages"
  	],
  	"iso639-2": "cus",
  	"iso639-1": null
  },
  	Czech: Czech,
  	Dakota: Dakota,
  	Danish: Danish,
  	Dargwa: Dargwa,
  	Delaware: Delaware,
  	"Dene Suline": {
  	name: "Dene Suline",
  	names: [
  		"Chipewyan",
  		"Dene Suline"
  	],
  	"iso639-2": "chp",
  	"iso639-1": null
  },
  	Dhivehi: Dhivehi,
  	Dimili: Dimili,
  	Dimli: Dimli,
  	Dinka: Dinka,
  	Divehi: Divehi,
  	Dogri: Dogri,
  	Dogrib: Dogrib,
  	"Dravidian languages": {
  	name: "Dravidian languages",
  	names: [
  		"Dravidian languages"
  	],
  	"iso639-2": "dra",
  	"iso639-1": null
  },
  	Duala: Duala,
  	Dutch: Dutch,
  	"Dutch, Middle (ca.1050-1350)": {
  	name: "Dutch, Middle (ca.1050-1350)",
  	names: [
  		"Dutch, Middle (ca.1050-1350)"
  	],
  	"iso639-2": "dum",
  	"iso639-1": null
  },
  	Dyula: Dyula,
  	Dzongkha: Dzongkha,
  	"Eastern Frisian": {
  	name: "Eastern Frisian",
  	names: [
  		"Eastern Frisian"
  	],
  	"iso639-2": "frs",
  	"iso639-1": null
  },
  	Edo: Edo,
  	Efik: Efik,
  	"Egyptian (Ancient)": {
  	name: "Egyptian (Ancient)",
  	names: [
  		"Egyptian (Ancient)"
  	],
  	"iso639-2": "egy",
  	"iso639-1": null
  },
  	Ekajuk: Ekajuk,
  	Elamite: Elamite,
  	English: English,
  	"English, Middle (1100-1500)": {
  	name: "English, Middle (1100-1500)",
  	names: [
  		"English, Middle (1100-1500)"
  	],
  	"iso639-2": "enm",
  	"iso639-1": null
  },
  	"English, Old (ca.450-1100)": {
  	name: "English, Old (ca.450-1100)",
  	names: [
  		"English, Old (ca.450-1100)"
  	],
  	"iso639-2": "ang",
  	"iso639-1": null
  },
  	Erzya: Erzya,
  	Esperanto: Esperanto,
  	Estonian: Estonian,
  	Ewe: Ewe,
  	Ewondo: Ewondo,
  	Fang: Fang,
  	Fanti: Fanti,
  	Faroese: Faroese,
  	Fijian: Fijian,
  	Filipino: Filipino,
  	Finnish: Finnish,
  	"Finno-Ugrian languages": {
  	name: "Finno-Ugrian languages",
  	names: [
  		"Finno-Ugrian languages"
  	],
  	"iso639-2": "fiu",
  	"iso639-1": null
  },
  	Flemish: Flemish,
  	Fon: Fon,
  	French: French,
  	"French, Middle (ca.1400-1600)": {
  	name: "French, Middle (ca.1400-1600)",
  	names: [
  		"French, Middle (ca.1400-1600)"
  	],
  	"iso639-2": "frm",
  	"iso639-1": null
  },
  	"French, Old (842-ca.1400)": {
  	name: "French, Old (842-ca.1400)",
  	names: [
  		"French, Old (842-ca.1400)"
  	],
  	"iso639-2": "fro",
  	"iso639-1": null
  },
  	Friulian: Friulian,
  	Fulah: Fulah,
  	Ga: Ga,
  	Gaelic: Gaelic,
  	"Galibi Carib": {
  	name: "Galibi Carib",
  	names: [
  		"Galibi Carib"
  	],
  	"iso639-2": "car",
  	"iso639-1": null
  },
  	Galician: Galician,
  	Ganda: Ganda,
  	Gayo: Gayo,
  	Gbaya: Gbaya,
  	Geez: Geez,
  	Georgian: Georgian,
  	German: German,
  	"German, Low": {
  	name: "German, Low",
  	names: [
  		"Low German",
  		"Low Saxon",
  		"German, Low",
  		"Saxon, Low"
  	],
  	"iso639-2": "nds",
  	"iso639-1": null
  },
  	"German, Middle High (ca.1050-1500)": {
  	name: "German, Middle High (ca.1050-1500)",
  	names: [
  		"German, Middle High (ca.1050-1500)"
  	],
  	"iso639-2": "gmh",
  	"iso639-1": null
  },
  	"German, Old High (ca.750-1050)": {
  	name: "German, Old High (ca.750-1050)",
  	names: [
  		"German, Old High (ca.750-1050)"
  	],
  	"iso639-2": "goh",
  	"iso639-1": null
  },
  	"Germanic languages": {
  	name: "Germanic languages",
  	names: [
  		"Germanic languages"
  	],
  	"iso639-2": "gem",
  	"iso639-1": null
  },
  	Gikuyu: Gikuyu,
  	Gilbertese: Gilbertese,
  	Gondi: Gondi,
  	Gorontalo: Gorontalo,
  	Gothic: Gothic,
  	Grebo: Grebo,
  	"Greek, Ancient (to 1453)": {
  	name: "Greek, Ancient (to 1453)",
  	names: [
  		"Greek, Ancient (to 1453)"
  	],
  	"iso639-2": "grc",
  	"iso639-1": null
  },
  	"Greek, Modern (1453-)": {
  	name: "Greek, Modern (1453-)",
  	names: [
  		"Greek, Modern (1453-)"
  	],
  	"iso639-2": "gre/ell",
  	"iso639-1": "el"
  },
  	Greenlandic: Greenlandic,
  	Guarani: Guarani,
  	Gujarati: Gujarati,
  	"Gwich'in": {
  	name: "Gwich'in",
  	names: [
  		"Gwich'in"
  	],
  	"iso639-2": "gwi",
  	"iso639-1": null
  },
  	Haida: Haida,
  	Haitian: Haitian,
  	"Haitian Creole": {
  	name: "Haitian Creole",
  	names: [
  		"Haitian",
  		"Haitian Creole"
  	],
  	"iso639-2": "hat",
  	"iso639-1": "ht"
  },
  	Hausa: Hausa,
  	Hawaiian: Hawaiian,
  	Hebrew: Hebrew,
  	Herero: Herero,
  	Hiligaynon: Hiligaynon,
  	"Himachali languages": {
  	name: "Himachali languages",
  	names: [
  		"Himachali languages",
  		"Western Pahari languages"
  	],
  	"iso639-2": "him",
  	"iso639-1": null
  },
  	Hindi: Hindi,
  	"Hiri Motu": {
  	name: "Hiri Motu",
  	names: [
  		"Hiri Motu"
  	],
  	"iso639-2": "hmo",
  	"iso639-1": "ho"
  },
  	Hittite: Hittite,
  	Hmong: Hmong,
  	Hungarian: Hungarian,
  	Hupa: Hupa,
  	Iban: Iban,
  	Icelandic: Icelandic,
  	Ido: Ido,
  	Igbo: Igbo,
  	"Ijo languages": {
  	name: "Ijo languages",
  	names: [
  		"Ijo languages"
  	],
  	"iso639-2": "ijo",
  	"iso639-1": null
  },
  	Iloko: Iloko,
  	"Imperial Aramaic (700-300 BCE)": {
  	name: "Imperial Aramaic (700-300 BCE)",
  	names: [
  		"Official Aramaic (700-300 BCE)",
  		"Imperial Aramaic (700-300 BCE)"
  	],
  	"iso639-2": "arc",
  	"iso639-1": null
  },
  	"Inari Sami": {
  	name: "Inari Sami",
  	names: [
  		"Inari Sami"
  	],
  	"iso639-2": "smn",
  	"iso639-1": null
  },
  	"Indic languages": {
  	name: "Indic languages",
  	names: [
  		"Indic languages"
  	],
  	"iso639-2": "inc",
  	"iso639-1": null
  },
  	"Indo-European languages": {
  	name: "Indo-European languages",
  	names: [
  		"Indo-European languages"
  	],
  	"iso639-2": "ine",
  	"iso639-1": null
  },
  	Indonesian: Indonesian,
  	Ingush: Ingush,
  	"Interlingua (International Auxiliary Language Association)": {
  	name: "Interlingua (International Auxiliary Language Association)",
  	names: [
  		"Interlingua (International Auxiliary Language Association)"
  	],
  	"iso639-2": "ina",
  	"iso639-1": "ia"
  },
  	Interlingue: Interlingue,
  	Inuktitut: Inuktitut,
  	Inupiaq: Inupiaq,
  	"Iranian languages": {
  	name: "Iranian languages",
  	names: [
  		"Iranian languages"
  	],
  	"iso639-2": "ira",
  	"iso639-1": null
  },
  	Irish: Irish,
  	"Irish, Middle (900-1200)": {
  	name: "Irish, Middle (900-1200)",
  	names: [
  		"Irish, Middle (900-1200)"
  	],
  	"iso639-2": "mga",
  	"iso639-1": null
  },
  	"Irish, Old (to 900)": {
  	name: "Irish, Old (to 900)",
  	names: [
  		"Irish, Old (to 900)"
  	],
  	"iso639-2": "sga",
  	"iso639-1": null
  },
  	"Iroquoian languages": {
  	name: "Iroquoian languages",
  	names: [
  		"Iroquoian languages"
  	],
  	"iso639-2": "iro",
  	"iso639-1": null
  },
  	Italian: Italian,
  	Japanese: Japanese,
  	Javanese: Javanese,
  	Jingpho: Jingpho,
  	"Judeo-Arabic": {
  	name: "Judeo-Arabic",
  	names: [
  		"Judeo-Arabic"
  	],
  	"iso639-2": "jrb",
  	"iso639-1": null
  },
  	"Judeo-Persian": {
  	name: "Judeo-Persian",
  	names: [
  		"Judeo-Persian"
  	],
  	"iso639-2": "jpr",
  	"iso639-1": null
  },
  	Kabardian: Kabardian,
  	Kabyle: Kabyle,
  	Kachin: Kachin,
  	Kalaallisut: Kalaallisut,
  	Kalmyk: Kalmyk,
  	Kamba: Kamba,
  	Kannada: Kannada,
  	Kanuri: Kanuri,
  	Kapampangan: Kapampangan,
  	"Kara-Kalpak": {
  	name: "Kara-Kalpak",
  	names: [
  		"Kara-Kalpak"
  	],
  	"iso639-2": "kaa",
  	"iso639-1": null
  },
  	"Karachay-Balkar": {
  	name: "Karachay-Balkar",
  	names: [
  		"Karachay-Balkar"
  	],
  	"iso639-2": "krc",
  	"iso639-1": null
  },
  	Karelian: Karelian,
  	"Karen languages": {
  	name: "Karen languages",
  	names: [
  		"Karen languages"
  	],
  	"iso639-2": "kar",
  	"iso639-1": null
  },
  	Kashmiri: Kashmiri,
  	Kashubian: Kashubian,
  	Kawi: Kawi,
  	Kazakh: Kazakh,
  	Khasi: Khasi,
  	"Khoisan languages": {
  	name: "Khoisan languages",
  	names: [
  		"Khoisan languages"
  	],
  	"iso639-2": "khi",
  	"iso639-1": null
  },
  	Khotanese: Khotanese,
  	Kikuyu: Kikuyu,
  	Kimbundu: Kimbundu,
  	Kinyarwanda: Kinyarwanda,
  	Kirdki: Kirdki,
  	Kirghiz: Kirghiz,
  	Kirmanjki: Kirmanjki,
  	Klingon: Klingon,
  	Komi: Komi,
  	Kongo: Kongo,
  	Konkani: Konkani,
  	Korean: Korean,
  	Kosraean: Kosraean,
  	Kpelle: Kpelle,
  	"Kru languages": {
  	name: "Kru languages",
  	names: [
  		"Kru languages"
  	],
  	"iso639-2": "kro",
  	"iso639-1": null
  },
  	Kuanyama: Kuanyama,
  	Kumyk: Kumyk,
  	Kurdish: Kurdish,
  	Kurukh: Kurukh,
  	Kutenai: Kutenai,
  	Kwanyama: Kwanyama,
  	Kyrgyz: Kyrgyz,
  	Ladino: Ladino,
  	Lahnda: Lahnda,
  	Lamba: Lamba,
  	"Land Dayak languages": {
  	name: "Land Dayak languages",
  	names: [
  		"Land Dayak languages"
  	],
  	"iso639-2": "day",
  	"iso639-1": null
  },
  	Lao: Lao,
  	Latin: Latin,
  	Latvian: Latvian,
  	Leonese: Leonese,
  	Letzeburgesch: Letzeburgesch,
  	Lezghian: Lezghian,
  	Limburgan: Limburgan,
  	Limburger: Limburger,
  	Limburgish: Limburgish,
  	Lingala: Lingala,
  	Lithuanian: Lithuanian,
  	Lojban: Lojban,
  	"Low German": {
  	name: "Low German",
  	names: [
  		"Low German",
  		"Low Saxon",
  		"German, Low",
  		"Saxon, Low"
  	],
  	"iso639-2": "nds",
  	"iso639-1": null
  },
  	"Low Saxon": {
  	name: "Low Saxon",
  	names: [
  		"Low German",
  		"Low Saxon",
  		"German, Low",
  		"Saxon, Low"
  	],
  	"iso639-2": "nds",
  	"iso639-1": null
  },
  	"Lower Sorbian": {
  	name: "Lower Sorbian",
  	names: [
  		"Lower Sorbian"
  	],
  	"iso639-2": "dsb",
  	"iso639-1": null
  },
  	Lozi: Lozi,
  	"Luba-Katanga": {
  	name: "Luba-Katanga",
  	names: [
  		"Luba-Katanga"
  	],
  	"iso639-2": "lub",
  	"iso639-1": "lu"
  },
  	"Luba-Lulua": {
  	name: "Luba-Lulua",
  	names: [
  		"Luba-Lulua"
  	],
  	"iso639-2": "lua",
  	"iso639-1": null
  },
  	Luiseno: Luiseno,
  	"Lule Sami": {
  	name: "Lule Sami",
  	names: [
  		"Lule Sami"
  	],
  	"iso639-2": "smj",
  	"iso639-1": null
  },
  	Lunda: Lunda,
  	"Luo (Kenya and Tanzania)": {
  	name: "Luo (Kenya and Tanzania)",
  	names: [
  		"Luo (Kenya and Tanzania)"
  	],
  	"iso639-2": "luo",
  	"iso639-1": null
  },
  	Lushai: Lushai,
  	Luxembourgish: Luxembourgish,
  	"Macedo-Romanian": {
  	name: "Macedo-Romanian",
  	names: [
  		"Aromanian",
  		"Arumanian",
  		"Macedo-Romanian"
  	],
  	"iso639-2": "rup",
  	"iso639-1": null
  },
  	Macedonian: Macedonian,
  	Madurese: Madurese,
  	Magahi: Magahi,
  	Maithili: Maithili,
  	Makasar: Makasar,
  	Malagasy: Malagasy,
  	Malay: Malay,
  	Malayalam: Malayalam,
  	Maldivian: Maldivian,
  	Maltese: Maltese,
  	Manchu: Manchu,
  	Mandar: Mandar,
  	Mandingo: Mandingo,
  	Manipuri: Manipuri,
  	"Manobo languages": {
  	name: "Manobo languages",
  	names: [
  		"Manobo languages"
  	],
  	"iso639-2": "mno",
  	"iso639-1": null
  },
  	Manx: Manx,
  	Maori: Maori,
  	Mapuche: Mapuche,
  	Mapudungun: Mapudungun,
  	Marathi: Marathi,
  	Mari: Mari,
  	Marshallese: Marshallese,
  	Marwari: Marwari,
  	Masai: Masai,
  	"Mayan languages": {
  	name: "Mayan languages",
  	names: [
  		"Mayan languages"
  	],
  	"iso639-2": "myn",
  	"iso639-1": null
  },
  	Mende: Mende,
  	"Mi'kmaq": {
  	name: "Mi'kmaq",
  	names: [
  		"Mi'kmaq",
  		"Micmac"
  	],
  	"iso639-2": "mic",
  	"iso639-1": null
  },
  	Micmac: Micmac,
  	Minangkabau: Minangkabau,
  	Mirandese: Mirandese,
  	Mohawk: Mohawk,
  	Moksha: Moksha,
  	Moldavian: Moldavian,
  	Moldovan: Moldovan,
  	"Mon-Khmer languages": {
  	name: "Mon-Khmer languages",
  	names: [
  		"Mon-Khmer languages"
  	],
  	"iso639-2": "mkh",
  	"iso639-1": null
  },
  	Mong: Mong,
  	Mongo: Mongo,
  	Mongolian: Mongolian,
  	Montenegrin: Montenegrin,
  	Mossi: Mossi,
  	"Multiple languages": {
  	name: "Multiple languages",
  	names: [
  		"Multiple languages"
  	],
  	"iso639-2": "mul",
  	"iso639-1": null
  },
  	"Munda languages": {
  	name: "Munda languages",
  	names: [
  		"Munda languages"
  	],
  	"iso639-2": "mun",
  	"iso639-1": null
  },
  	"N'Ko": {
  	name: "N'Ko",
  	names: [
  		"N'Ko"
  	],
  	"iso639-2": "nqo",
  	"iso639-1": null
  },
  	"Nahuatl languages": {
  	name: "Nahuatl languages",
  	names: [
  		"Nahuatl languages"
  	],
  	"iso639-2": "nah",
  	"iso639-1": null
  },
  	Nauru: Nauru,
  	Navaho: Navaho,
  	Navajo: Navajo,
  	"Ndebele, North": {
  	name: "Ndebele, North",
  	names: [
  		"Ndebele, North",
  		"North Ndebele"
  	],
  	"iso639-2": "nde",
  	"iso639-1": "nd"
  },
  	"Ndebele, South": {
  	name: "Ndebele, South",
  	names: [
  		"Ndebele, South",
  		"South Ndebele"
  	],
  	"iso639-2": "nbl",
  	"iso639-1": "nr"
  },
  	Ndonga: Ndonga,
  	Neapolitan: Neapolitan,
  	"Nepal Bhasa": {
  	name: "Nepal Bhasa",
  	names: [
  		"Nepal Bhasa",
  		"Newari"
  	],
  	"iso639-2": "new",
  	"iso639-1": null
  },
  	Nepali: Nepali,
  	Newari: Newari,
  	Nias: Nias,
  	"Niger-Kordofanian languages": {
  	name: "Niger-Kordofanian languages",
  	names: [
  		"Niger-Kordofanian languages"
  	],
  	"iso639-2": "nic",
  	"iso639-1": null
  },
  	"Nilo-Saharan languages": {
  	name: "Nilo-Saharan languages",
  	names: [
  		"Nilo-Saharan languages"
  	],
  	"iso639-2": "ssa",
  	"iso639-1": null
  },
  	Niuean: Niuean,
  	"No linguistic content": {
  	name: "No linguistic content",
  	names: [
  		"No linguistic content",
  		"Not applicable"
  	],
  	"iso639-2": "zxx",
  	"iso639-1": null
  },
  	Nogai: Nogai,
  	"Norse, Old": {
  	name: "Norse, Old",
  	names: [
  		"Norse, Old"
  	],
  	"iso639-2": "non",
  	"iso639-1": null
  },
  	"North American Indian languages": {
  	name: "North American Indian languages",
  	names: [
  		"North American Indian languages"
  	],
  	"iso639-2": "nai",
  	"iso639-1": null
  },
  	"North Ndebele": {
  	name: "North Ndebele",
  	names: [
  		"Ndebele, North",
  		"North Ndebele"
  	],
  	"iso639-2": "nde",
  	"iso639-1": "nd"
  },
  	"Northern Frisian": {
  	name: "Northern Frisian",
  	names: [
  		"Northern Frisian"
  	],
  	"iso639-2": "frr",
  	"iso639-1": null
  },
  	"Northern Sami": {
  	name: "Northern Sami",
  	names: [
  		"Northern Sami"
  	],
  	"iso639-2": "sme",
  	"iso639-1": "se"
  },
  	"Northern Sotho": {
  	name: "Northern Sotho",
  	names: [
  		"Pedi",
  		"Sepedi",
  		"Northern Sotho"
  	],
  	"iso639-2": "nso",
  	"iso639-1": null
  },
  	Norwegian: Norwegian,
  	"Norwegian Bokmål": {
  	name: "Norwegian Bokmål",
  	names: [
  		"Bokmål, Norwegian",
  		"Norwegian Bokmål"
  	],
  	"iso639-2": "nob",
  	"iso639-1": "nb"
  },
  	"Norwegian Nynorsk": {
  	name: "Norwegian Nynorsk",
  	names: [
  		"Norwegian Nynorsk",
  		"Nynorsk, Norwegian"
  	],
  	"iso639-2": "nno",
  	"iso639-1": "nn"
  },
  	"Not applicable": {
  	name: "Not applicable",
  	names: [
  		"No linguistic content",
  		"Not applicable"
  	],
  	"iso639-2": "zxx",
  	"iso639-1": null
  },
  	"Nubian languages": {
  	name: "Nubian languages",
  	names: [
  		"Nubian languages"
  	],
  	"iso639-2": "nub",
  	"iso639-1": null
  },
  	Nuosu: Nuosu,
  	Nyamwezi: Nyamwezi,
  	Nyanja: Nyanja,
  	Nyankole: Nyankole,
  	"Nynorsk, Norwegian": {
  	name: "Nynorsk, Norwegian",
  	names: [
  		"Norwegian Nynorsk",
  		"Nynorsk, Norwegian"
  	],
  	"iso639-2": "nno",
  	"iso639-1": "nn"
  },
  	Nyoro: Nyoro,
  	Nzima: Nzima,
  	Occidental: Occidental,
  	"Occitan (post 1500)": {
  	name: "Occitan (post 1500)",
  	names: [
  		"Occitan (post 1500)"
  	],
  	"iso639-2": "oci",
  	"iso639-1": "oc"
  },
  	"Occitan, Old (to 1500)": {
  	name: "Occitan, Old (to 1500)",
  	names: [
  		"Provençal, Old (to 1500)",
  		"Occitan, Old (to 1500)"
  	],
  	"iso639-2": "pro",
  	"iso639-1": null
  },
  	"Official Aramaic (700-300 BCE)": {
  	name: "Official Aramaic (700-300 BCE)",
  	names: [
  		"Official Aramaic (700-300 BCE)",
  		"Imperial Aramaic (700-300 BCE)"
  	],
  	"iso639-2": "arc",
  	"iso639-1": null
  },
  	Oirat: Oirat,
  	Ojibwa: Ojibwa,
  	"Old Bulgarian": {
  	name: "Old Bulgarian",
  	names: [
  		"Church Slavic",
  		"Old Slavonic",
  		"Church Slavonic",
  		"Old Bulgarian",
  		"Old Church Slavonic"
  	],
  	"iso639-2": "chu",
  	"iso639-1": "cu"
  },
  	"Old Church Slavonic": {
  	name: "Old Church Slavonic",
  	names: [
  		"Church Slavic",
  		"Old Slavonic",
  		"Church Slavonic",
  		"Old Bulgarian",
  		"Old Church Slavonic"
  	],
  	"iso639-2": "chu",
  	"iso639-1": "cu"
  },
  	"Old Newari": {
  	name: "Old Newari",
  	names: [
  		"Classical Newari",
  		"Old Newari",
  		"Classical Nepal Bhasa"
  	],
  	"iso639-2": "nwc",
  	"iso639-1": null
  },
  	"Old Slavonic": {
  	name: "Old Slavonic",
  	names: [
  		"Church Slavic",
  		"Old Slavonic",
  		"Church Slavonic",
  		"Old Bulgarian",
  		"Old Church Slavonic"
  	],
  	"iso639-2": "chu",
  	"iso639-1": "cu"
  },
  	Oriya: Oriya,
  	Oromo: Oromo,
  	Osage: Osage,
  	Ossetian: Ossetian,
  	Ossetic: Ossetic,
  	"Otomian languages": {
  	name: "Otomian languages",
  	names: [
  		"Otomian languages"
  	],
  	"iso639-2": "oto",
  	"iso639-1": null
  },
  	Pahlavi: Pahlavi,
  	Palauan: Palauan,
  	Pali: Pali,
  	Pampanga: Pampanga,
  	Pangasinan: Pangasinan,
  	Panjabi: Panjabi,
  	Papiamento: Papiamento,
  	"Papuan languages": {
  	name: "Papuan languages",
  	names: [
  		"Papuan languages"
  	],
  	"iso639-2": "paa",
  	"iso639-1": null
  },
  	Pashto: Pashto,
  	Pedi: Pedi,
  	Persian: Persian,
  	"Persian, Old (ca.600-400 B.C.)": {
  	name: "Persian, Old (ca.600-400 B.C.)",
  	names: [
  		"Persian, Old (ca.600-400 B.C.)"
  	],
  	"iso639-2": "peo",
  	"iso639-1": null
  },
  	"Philippine languages": {
  	name: "Philippine languages",
  	names: [
  		"Philippine languages"
  	],
  	"iso639-2": "phi",
  	"iso639-1": null
  },
  	Phoenician: Phoenician,
  	Pilipino: Pilipino,
  	Pohnpeian: Pohnpeian,
  	Polish: Polish,
  	Portuguese: Portuguese,
  	"Prakrit languages": {
  	name: "Prakrit languages",
  	names: [
  		"Prakrit languages"
  	],
  	"iso639-2": "pra",
  	"iso639-1": null
  },
  	"Provençal, Old (to 1500)": {
  	name: "Provençal, Old (to 1500)",
  	names: [
  		"Provençal, Old (to 1500)",
  		"Occitan, Old (to 1500)"
  	],
  	"iso639-2": "pro",
  	"iso639-1": null
  },
  	Punjabi: Punjabi,
  	Pushto: Pushto,
  	Quechua: Quechua,
  	Rajasthani: Rajasthani,
  	Rapanui: Rapanui,
  	Rarotongan: Rarotongan,
  	"Reserved for local use": {
  	name: "Reserved for local use",
  	names: [
  		"Reserved for local use"
  	],
  	"iso639-2": "qaa-qtz",
  	"iso639-1": null
  },
  	"Romance languages": {
  	name: "Romance languages",
  	names: [
  		"Romance languages"
  	],
  	"iso639-2": "roa",
  	"iso639-1": null
  },
  	Romanian: Romanian,
  	Romansh: Romansh,
  	Romany: Romany,
  	Rundi: Rundi,
  	Russian: Russian,
  	Sakan: Sakan,
  	"Salishan languages": {
  	name: "Salishan languages",
  	names: [
  		"Salishan languages"
  	],
  	"iso639-2": "sal",
  	"iso639-1": null
  },
  	"Samaritan Aramaic": {
  	name: "Samaritan Aramaic",
  	names: [
  		"Samaritan Aramaic"
  	],
  	"iso639-2": "sam",
  	"iso639-1": null
  },
  	"Sami languages": {
  	name: "Sami languages",
  	names: [
  		"Sami languages"
  	],
  	"iso639-2": "smi",
  	"iso639-1": null
  },
  	Samoan: Samoan,
  	Sandawe: Sandawe,
  	Sango: Sango,
  	Sanskrit: Sanskrit,
  	Santali: Santali,
  	Sardinian: Sardinian,
  	Sasak: Sasak,
  	"Saxon, Low": {
  	name: "Saxon, Low",
  	names: [
  		"Low German",
  		"Low Saxon",
  		"German, Low",
  		"Saxon, Low"
  	],
  	"iso639-2": "nds",
  	"iso639-1": null
  },
  	Scots: Scots,
  	"Scottish Gaelic": {
  	name: "Scottish Gaelic",
  	names: [
  		"Gaelic",
  		"Scottish Gaelic"
  	],
  	"iso639-2": "gla",
  	"iso639-1": "gd"
  },
  	Selkup: Selkup,
  	"Semitic languages": {
  	name: "Semitic languages",
  	names: [
  		"Semitic languages"
  	],
  	"iso639-2": "sem",
  	"iso639-1": null
  },
  	Sepedi: Sepedi,
  	Serbian: Serbian,
  	Serer: Serer,
  	Shan: Shan,
  	Shona: Shona,
  	"Sichuan Yi": {
  	name: "Sichuan Yi",
  	names: [
  		"Sichuan Yi",
  		"Nuosu"
  	],
  	"iso639-2": "iii",
  	"iso639-1": "ii"
  },
  	Sicilian: Sicilian,
  	Sidamo: Sidamo,
  	"Sign Languages": {
  	name: "Sign Languages",
  	names: [
  		"Sign Languages"
  	],
  	"iso639-2": "sgn",
  	"iso639-1": null
  },
  	Siksika: Siksika,
  	Sindhi: Sindhi,
  	Sinhala: Sinhala,
  	Sinhalese: Sinhalese,
  	"Sino-Tibetan languages": {
  	name: "Sino-Tibetan languages",
  	names: [
  		"Sino-Tibetan languages"
  	],
  	"iso639-2": "sit",
  	"iso639-1": null
  },
  	"Siouan languages": {
  	name: "Siouan languages",
  	names: [
  		"Siouan languages"
  	],
  	"iso639-2": "sio",
  	"iso639-1": null
  },
  	"Skolt Sami": {
  	name: "Skolt Sami",
  	names: [
  		"Skolt Sami"
  	],
  	"iso639-2": "sms",
  	"iso639-1": null
  },
  	"Slave (Athapascan)": {
  	name: "Slave (Athapascan)",
  	names: [
  		"Slave (Athapascan)"
  	],
  	"iso639-2": "den",
  	"iso639-1": null
  },
  	"Slavic languages": {
  	name: "Slavic languages",
  	names: [
  		"Slavic languages"
  	],
  	"iso639-2": "sla",
  	"iso639-1": null
  },
  	Slovak: Slovak,
  	Slovenian: Slovenian,
  	Sogdian: Sogdian,
  	Somali: Somali,
  	"Songhai languages": {
  	name: "Songhai languages",
  	names: [
  		"Songhai languages"
  	],
  	"iso639-2": "son",
  	"iso639-1": null
  },
  	Soninke: Soninke,
  	"Sorbian languages": {
  	name: "Sorbian languages",
  	names: [
  		"Sorbian languages"
  	],
  	"iso639-2": "wen",
  	"iso639-1": null
  },
  	"Sotho, Northern": {
  	name: "Sotho, Northern",
  	names: [
  		"Pedi",
  		"Sepedi",
  		"Northern Sotho"
  	],
  	"iso639-2": "nso",
  	"iso639-1": null
  },
  	"Sotho, Southern": {
  	name: "Sotho, Southern",
  	names: [
  		"Sotho, Southern"
  	],
  	"iso639-2": "sot",
  	"iso639-1": "st"
  },
  	"South American Indian languages": {
  	name: "South American Indian languages",
  	names: [
  		"South American Indian languages"
  	],
  	"iso639-2": "sai",
  	"iso639-1": null
  },
  	"South Ndebele": {
  	name: "South Ndebele",
  	names: [
  		"Ndebele, South",
  		"South Ndebele"
  	],
  	"iso639-2": "nbl",
  	"iso639-1": "nr"
  },
  	"Southern Altai": {
  	name: "Southern Altai",
  	names: [
  		"Southern Altai"
  	],
  	"iso639-2": "alt",
  	"iso639-1": null
  },
  	"Southern Sami": {
  	name: "Southern Sami",
  	names: [
  		"Southern Sami"
  	],
  	"iso639-2": "sma",
  	"iso639-1": null
  },
  	Spanish: Spanish,
  	"Sranan Tongo": {
  	name: "Sranan Tongo",
  	names: [
  		"Sranan Tongo"
  	],
  	"iso639-2": "srn",
  	"iso639-1": null
  },
  	"Standard Moroccan Tamazight": {
  	name: "Standard Moroccan Tamazight",
  	names: [
  		"Standard Moroccan Tamazight"
  	],
  	"iso639-2": "zgh",
  	"iso639-1": null
  },
  	Sukuma: Sukuma,
  	Sumerian: Sumerian,
  	Sundanese: Sundanese,
  	Susu: Susu,
  	Swahili: Swahili,
  	Swati: Swati,
  	Swedish: Swedish,
  	"Swiss German": {
  	name: "Swiss German",
  	names: [
  		"Swiss German",
  		"Alemannic",
  		"Alsatian"
  	],
  	"iso639-2": "gsw",
  	"iso639-1": null
  },
  	Syriac: Syriac,
  	Tagalog: Tagalog,
  	Tahitian: Tahitian,
  	"Tai languages": {
  	name: "Tai languages",
  	names: [
  		"Tai languages"
  	],
  	"iso639-2": "tai",
  	"iso639-1": null
  },
  	Tajik: Tajik,
  	Tamashek: Tamashek,
  	Tamil: Tamil,
  	Tatar: Tatar,
  	Telugu: Telugu,
  	Tereno: Tereno,
  	Tetum: Tetum,
  	Thai: Thai,
  	Tibetan: Tibetan,
  	Tigre: Tigre,
  	Tigrinya: Tigrinya,
  	Timne: Timne,
  	Tiv: Tiv,
  	"tlhIngan-Hol": {
  	name: "tlhIngan-Hol",
  	names: [
  		"Klingon",
  		"tlhIngan-Hol"
  	],
  	"iso639-2": "tlh",
  	"iso639-1": null
  },
  	Tlingit: Tlingit,
  	"Tok Pisin": {
  	name: "Tok Pisin",
  	names: [
  		"Tok Pisin"
  	],
  	"iso639-2": "tpi",
  	"iso639-1": null
  },
  	Tokelau: Tokelau,
  	"Tonga (Nyasa)": {
  	name: "Tonga (Nyasa)",
  	names: [
  		"Tonga (Nyasa)"
  	],
  	"iso639-2": "tog",
  	"iso639-1": null
  },
  	"Tonga (Tonga Islands)": {
  	name: "Tonga (Tonga Islands)",
  	names: [
  		"Tonga (Tonga Islands)"
  	],
  	"iso639-2": "ton",
  	"iso639-1": "to"
  },
  	Tsimshian: Tsimshian,
  	Tsonga: Tsonga,
  	Tswana: Tswana,
  	Tumbuka: Tumbuka,
  	"Tupi languages": {
  	name: "Tupi languages",
  	names: [
  		"Tupi languages"
  	],
  	"iso639-2": "tup",
  	"iso639-1": null
  },
  	Turkish: Turkish,
  	"Turkish, Ottoman (1500-1928)": {
  	name: "Turkish, Ottoman (1500-1928)",
  	names: [
  		"Turkish, Ottoman (1500-1928)"
  	],
  	"iso639-2": "ota",
  	"iso639-1": null
  },
  	Turkmen: Turkmen,
  	Tuvalu: Tuvalu,
  	Tuvinian: Tuvinian,
  	Twi: Twi,
  	Udmurt: Udmurt,
  	Ugaritic: Ugaritic,
  	Uighur: Uighur,
  	Ukrainian: Ukrainian,
  	Umbundu: Umbundu,
  	"Uncoded languages": {
  	name: "Uncoded languages",
  	names: [
  		"Uncoded languages"
  	],
  	"iso639-2": "mis",
  	"iso639-1": null
  },
  	Undetermined: Undetermined,
  	"Upper Sorbian": {
  	name: "Upper Sorbian",
  	names: [
  		"Upper Sorbian"
  	],
  	"iso639-2": "hsb",
  	"iso639-1": null
  },
  	Urdu: Urdu,
  	Uyghur: Uyghur,
  	Uzbek: Uzbek,
  	Vai: Vai,
  	Valencian: Valencian,
  	Venda: Venda,
  	Vietnamese: Vietnamese,
  	"Volapük": {
  	name: "Volapük",
  	names: [
  		"Volapük"
  	],
  	"iso639-2": "vol",
  	"iso639-1": "vo"
  },
  	Votic: Votic,
  	"Wakashan languages": {
  	name: "Wakashan languages",
  	names: [
  		"Wakashan languages"
  	],
  	"iso639-2": "wak",
  	"iso639-1": null
  },
  	Walloon: Walloon,
  	Waray: Waray,
  	Washo: Washo,
  	Welsh: Welsh,
  	"Western Frisian": {
  	name: "Western Frisian",
  	names: [
  		"Western Frisian"
  	],
  	"iso639-2": "fry",
  	"iso639-1": "fy"
  },
  	"Western Pahari languages": {
  	name: "Western Pahari languages",
  	names: [
  		"Himachali languages",
  		"Western Pahari languages"
  	],
  	"iso639-2": "him",
  	"iso639-1": null
  },
  	Wolaitta: Wolaitta,
  	Wolaytta: Wolaytta,
  	Wolof: Wolof,
  	Xhosa: Xhosa,
  	Yakut: Yakut,
  	Yao: Yao,
  	Yapese: Yapese,
  	Yiddish: Yiddish,
  	Yoruba: Yoruba,
  	"Yupik languages": {
  	name: "Yupik languages",
  	names: [
  		"Yupik languages"
  	],
  	"iso639-2": "ypk",
  	"iso639-1": null
  },
  	"Zande languages": {
  	name: "Zande languages",
  	names: [
  		"Zande languages"
  	],
  	"iso639-2": "znd",
  	"iso639-1": null
  },
  	Zapotec: Zapotec,
  	Zaza: Zaza,
  	Zazaki: Zazaki,
  	Zenaga: Zenaga,
  	Zhuang: Zhuang,
  	Zulu: Zulu,
  	Zuni: Zuni
  };

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
            obj[nestedKey] = defaultValue;
          } else if (isObject(obj[nestedKey])) {
            nestedReset(obj[nestedKey], defaultValue);
          }
        }
      }
    }
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
        if (!this._configDefault) {
          var config = {};

          for (var k in this.__proto__) {
            if (k.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(k)) {
              var v = this[k]();
              config[k] = isObject(v) ? assign({}, v) : v;
            }
          }

          this._configDefault = config;
        }

        if (arguments.length) {
          for (var _k in _) {
            if ({}.hasOwnProperty.call(_, _k) && _k in this) {
              var _v = _[_k];

              if (_v === RESET) {
                if (_k === "on") this._on = this._configDefault[_k];else this[_k](this._configDefault[_k]);
              } else {
                nestedReset(_v, this._configDefault[_k]);

                this[_k](_v);
              }
            }
          }

          return this;
        } else {
          var _config = {};

          for (var _k2 in this.__proto__) {
            if (_k2.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(_k2)) _config[_k2] = this[_k2]();
          }

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

  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace (name) {
    var prefix = name += "",
        i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {
      space: namespaces[prefix],
      local: name
    } : name;
  }

  function creatorInherit(name) {
    return function () {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml ? document.createElement(name) : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function () {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator (name) {
    var fullname = namespace(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  function none() {}

  function selector (selector) {
    return selector == null ? none : function () {
      return this.querySelector(selector);
    };
  }

  function selection_select (select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function empty() {
    return [];
  }

  function selectorAll (selector) {
    return selector == null ? empty : function () {
      return this.querySelectorAll(selector);
    };
  }

  function selection_selectAll (select) {
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection(subgroups, parents);
  }

  function matcher (selector) {
    return function () {
      return this.matches(selector);
    };
  }

  function selection_filter (match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection(subgroups, this._parents);
  }

  function sparse (update) {
    return new Array(update.length);
  }

  function selection_enter () {
    return new Selection(this._enter || this._groups.map(sparse), this._parents);
  }
  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function appendChild(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function insertBefore(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function querySelector(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function querySelectorAll(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  function constant$1 (x) {
    return function () {
      return x;
    };
  }

  var keyPrefix = "$"; // Protect against keys like “__proto__”.

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length; // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.

    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    } // Put any non-null nodes that don’t fit into exit.


    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = {},
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue; // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.

    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);

        if (keyValue in nodeByKeyValue) {
          exit[i] = node;
        } else {
          nodeByKeyValue[keyValue] = node;
        }
      }
    } // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.


    for (i = 0; i < dataLength; ++i) {
      keyValue = keyPrefix + key.call(parent, data[i], i, data);

      if (node = nodeByKeyValue[keyValue]) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue[keyValue] = null;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    } // Add any remaining nodes that were not bound to data to exit.


    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) {
        exit[i] = node;
      }
    }
  }

  function selection_data (value, key) {
    if (!value) {
      data = new Array(this.size()), j = -1;
      this.each(function (d) {
        data[++j] = d;
      });
      return data;
    }

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;
    if (typeof value !== "function") value = constant$1(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = value.call(parent, parent && parent.__data__, j, parents),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key); // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.

      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;

          while (!(next = updateGroup[i1]) && ++i1 < dataLength) {
          }

          previous._next = next || null;
        }
      }
    }

    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit () {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join (onenter, onupdate, onexit) {
    var enter = this.enter(),
        update = this,
        exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove();else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge (selection) {
    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection(merges, this._parents);
  }

  function selection_order () {
    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort (compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }

      sortgroup.sort(compareNode);
    }

    return new Selection(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call () {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes () {
    var nodes = new Array(this.size()),
        i = -1;
    this.each(function () {
      nodes[++i] = this;
    });
    return nodes;
  }

  function selection_node () {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size () {
    var size = 0;
    this.each(function () {
      ++size;
    });
    return size;
  }

  function selection_empty () {
    return !this.node();
  }

  function selection_each (callback) {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove(name) {
    return function () {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function () {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, value) {
    return function () {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS(fullname, value) {
    return function () {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS(fullname, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr (name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }

    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  function defaultView (node) {
    return node.ownerDocument && node.ownerDocument.defaultView || // node is a Node
    node.document && node // node is a Window
    || node.defaultView; // node is a Document
  }

  function styleRemove(name) {
    return function () {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, value, priority) {
    return function () {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction(name, value, priority) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style (name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function () {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function () {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function () {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];else this[name] = v;
    };
  }

  function selection_property (name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function add(name) {
      var i = this._names.indexOf(name);

      if (i < 0) {
        this._names.push(name);

        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function remove(name) {
      var i = this._names.indexOf(name);

      if (i >= 0) {
        this._names.splice(i, 1);

        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function contains(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node),
        i = -1,
        n = names.length;

    while (++i < n) {
      list.add(names[i]);
    }
  }

  function classedRemove(node, names) {
    var list = classList(node),
        i = -1,
        n = names.length;

    while (++i < n) {
      list.remove(names[i]);
    }
  }

  function classedTrue(names) {
    return function () {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function () {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function () {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed (name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()),
          i = -1,
          n = names.length;

      while (++i < n) {
        if (!list.contains(names[i])) return false;
      }

      return true;
    }

    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant(value) {
    return function () {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text (value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function () {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function () {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html (value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise () {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower () {
    return this.each(lower);
  }

  function selection_append (name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function () {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert (name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function () {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove () {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    return this.parentNode.insertBefore(this.cloneNode(false), this.nextSibling);
  }

  function selection_cloneDeep() {
    return this.parentNode.insertBefore(this.cloneNode(true), this.nextSibling);
  }

  function selection_clone (deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum (value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  var filterEvents = {};

  if (typeof document !== "undefined") {
    var element = document.documentElement;

    if (!("onmouseenter" in element)) {
      filterEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
    }
  }

  function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function (event) {
      var related = event.relatedTarget;

      if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) {
        listener.call(this, event);
      }
    };
  }

  function contextListener(listener, index, group) {
    return function (event1) {

      try {
        listener.call(this, this.__data__, index, group);
      } finally {
      }
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function (t) {
      var name = "",
          i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {
        type: t,
        name: name
      };
    });
  }

  function onRemove(typename) {
    return function () {
      var on = this.__on;
      if (!on) return;

      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
        } else {
          on[++i] = o;
        }
      }

      if (++i) on.length = i;else delete this.__on;
    };
  }

  function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function (d, i, group) {
      var on = this.__on,
          o,
          listener = wrap(value, i, group);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.capture);
          this.addEventListener(o.type, o.listener = listener, o.capture = capture);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, capture);
      o = {
        type: typename.type,
        name: typename.name,
        value: value,
        listener: listener,
        capture: capture
      };
      if (!on) this.__on = [o];else on.push(o);
    };
  }

  function selection_on (typename, value, capture) {
    var typenames = parseTypenames(typename + ""),
        i,
        n = typenames.length,
        t;

    if (arguments.length < 2) {
      var on = this.node().__on;

      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    if (capture == null) capture = false;

    for (i = 0; i < n; ++i) {
      this.each(on(typenames[i], value, capture));
    }

    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function () {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function () {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch (type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  var root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection([[document.documentElement]], root);
  }

  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch
  };

  function select (selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  var noop = {
    value: function value() {}
  };

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _) throw new Error("illegal type: " + t);
      _[t] = [];
    }

    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function (t) {
      var name = "",
          i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {
        type: t,
        name: name
      };
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function on(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length; // If no callback was specified, return the callback of the given type and name.

      if (arguments.length < 2) {
        while (++i < n) {
          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
        }

        return;
      } // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.


      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);

      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);else if (callback == null) for (t in _) {
          _[t] = set(_[t], typename.name, null);
        }
      }

      return this;
    },
    copy: function copy() {
      var copy = {},
          _ = this._;

      for (var t in _) {
        copy[t] = _[t].slice();
      }

      return new Dispatch(copy);
    },
    call: function call(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) {
        args[i] = arguments[i + 2];
      }
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (t = this._[type], i = 0, n = t.length; i < n; ++i) {
        t[i].value.apply(that, args);
      }
    },
    apply: function apply(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);

      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) {
        t[i].value.apply(that, args);
      }
    }
  };

  function get(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }

    if (callback != null) type.push({
      name: name,
      value: callback
    });
    return type;
  }

  var frame = 0,
      // is an animation frame pending?
  timeout = 0,
      // is a timeout pending?
  interval = 0,
      // are any timers active?
  pokeDelay = 1000,
      // how frequently we check for clock skew
  taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && performance.now ? performance : Date,
      setFrame = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function restart(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);

      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;else taskHead = this;
        taskTail = this;
      }

      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function stop() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }
  function timerFlush() {
    now(); // Get the current time, if not already set.

    ++frame; // Pretend we’ve set an alarm, if we haven’t already.

    var t = taskHead,
        e;

    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }

    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;

    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(),
        delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0,
        t1 = taskHead,
        t2,
        time = Infinity;

    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }

    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.

    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.

    if (delay > 24) {
      if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout$1 (callback, delay, time) {
    var t = new Timer();
    delay = delay == null ? 0 : +delay;
    t.restart(function (elapsed) {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule (node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index,
      // For context during callback.
      group: group,
      // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id) {
    var schedule = get$1(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }
  function set$1(node, id) {
    var schedule = get$1(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }
  function get$1(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween; // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!

    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time); // If the elapsed delay is less than our first sleep, start immediately.

      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o; // If the state is not SCHEDULED, then we previously errored on start.

      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue; // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!

        if (o.state === STARTED) return timeout$1(start); // Interrupt the active transition, if any.

        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } // Cancel any pre-empted transitions.
        else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
      } // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.


      timeout$1(function () {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      }); // Dispatch the start event.
      // Note this must be done before the tween are initialized.

      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted

      self.state = STARTED; // Initialize the tween, deleting null tween.

      tween = new Array(n = self.tween.length);

      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }

      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      } // Dispatch the end event.


      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];

      for (var i in schedules) {
        return;
      } // eslint-disable-line no-unused-vars


      delete node.__transition;
    }
  }

  function interrupt (node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;
    if (!schedules) return;
    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) {
        empty = false;
        continue;
      }

      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt (name) {
    return this.each(function () {
      interrupt(this, name);
    });
  }

  function define (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) {
      prototype[key] = definition[key];
    }

    return prototype;
  }

  function Color() {}
  var _darker = 0.7;

  var _brighter = 1 / _darker;
  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex3 = /^#([0-9a-f]{3})$/,
      reHex6 = /^#([0-9a-f]{6})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };
  define(Color, color, {
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: function hex() {
      return this.rgb().hex();
    },
    toString: function toString() {
      return this.rgb() + "";
    }
  });
  function color(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    ) : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
    : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Rgb, rgb, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: function hex() {
      return "#" + _hex(this.r) + _hex(this.g) + _hex(this.b);
    },
    toString: function toString() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  function _hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl();
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;

    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;else if (g === max) h = (b - r) / s + 2;else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }

    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var deg2rad = Math.PI / 180;
  var rad2deg = 180 / Math.PI;

  var K = 18,
      Xn = 0.96422,
      Yn = 1,
      Zn = 0.82521,
      t0 = 4 / 29,
      t1 = 6 / 29,
      t2 = 3 * t1 * t1,
      t3 = t1 * t1 * t1;

  function labConvert(o) {
    if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);

    if (o instanceof Hcl) {
      if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
      var h = o.h * deg2rad;
      return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
    }

    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = rgb2lrgb(o.r),
        g = rgb2lrgb(o.g),
        b = rgb2lrgb(o.b),
        y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn),
        x,
        z;
    if (r === g && g === b) x = z = y;else {
      x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
      z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
    }
    return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }
  function lab(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
  }
  function Lab(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }
  define(Lab, lab, extend(Color, {
    brighter: function brighter(k) {
      return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function darker(k) {
      return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn * lab2xyz(x);
      y = Yn * lab2xyz(y);
      z = Zn * lab2xyz(z);
      return new Rgb(lrgb2rgb(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
  }));

  function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
  }

  function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
  }

  function lrgb2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert(o) {
    if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab)) o = labConvert(o);
    if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg;
    return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
  }
  function Hcl(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }
  define(Hcl, hcl, extend(Color, {
    brighter: function brighter(k) {
      return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
    },
    darker: function darker(k) {
      return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
    },
    rgb: function rgb() {
      return labConvert(this).rgb();
    }
  }));

  var A = -0.14861,
      B = +1.78277,
      C = -0.29227,
      D = -0.90649,
      E = +1.97294,
      ED = E * D,
      EB = E * B,
      BC_DA = B * C - D * A;

  function cubehelixConvert(o) {
    if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb)) o = rgbConvert(o);
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
        bl = b - l,
        k = (E * (g - l) - C * bl) / D,
        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)),
        // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
    return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
  }
  function Cubehelix(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define(Cubehelix, cubehelix, extend(Color, {
    brighter: function brighter(k) {
      k = k == null ? _brighter : Math.pow(_brighter, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker : Math.pow(_darker, k);
      return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
      return new Rgb(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
    }
  }));

  function constant$2 (x) {
    return function () {
      return x;
    };
  }

  function linear(a, d) {
    return function (t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function (t) {
      return Math.pow(a + t * b, y);
    };
  }
  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function (a, b) {
      return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant$2(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;
    return rgb$1;
  })(1);

  function interpolateNumber (a, b) {
    return a = +a, b -= a, function (t) {
      return a + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function () {
      return b;
    };
  }

  function one(b) {
    return function (t) {
      return b(t) + "";
    };
  }

  function interpolateString (a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0,
        // scan index for next number in b
    am,
        // current match in a
    bm,
        // current match in b
    bs,
        // string preceding current number in b, if any
    i = -1,
        // index in s
    s = [],
        // string constants and placeholders
    q = []; // number interpolators
    // Coerce inputs to strings.

    a = a + "", b = b + ""; // Interpolate pairs of numbers in a & b.

    while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      if ((am = am[0]) === (bm = bm[0])) {
        // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else {
        // interpolate non-matching numbers
        s[++i] = null;
        q.push({
          i: i,
          x: interpolateNumber(am, bm)
        });
      }

      bi = reB.lastIndex;
    } // Add remains of b.


    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    } // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.


    return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function (t) {
      for (var i = 0, o; i < b; ++i) {
        s[(o = q[i]).i] = o.x(t);
      }

      return s.join("");
    });
  }

  var degrees = 180 / Math.PI;
  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose (a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var cssNode, cssRoot, cssView, svgNode;
  function parseCss(value) {
    if (value === "none") return identity;
    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
    cssNode.style.transform = value;
    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
    cssRoot.removeChild(cssNode);
    value = value.slice(7, -1).split(",");
    return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
  }
  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({
          i: i - 4,
          x: interpolateNumber(xa, xb)
        }, {
          i: i - 2,
          x: interpolateNumber(ya, yb)
        });
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360;else if (b - a > 180) a += 360; // shortest path

        q.push({
          i: s.push(pop(s) + "rotate(", null, degParen) - 2,
          x: interpolateNumber(a, b)
        });
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({
          i: s.push(pop(s) + "skewX(", null, degParen) - 2,
          x: interpolateNumber(a, b)
        });
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({
          i: i - 4,
          x: interpolateNumber(xa, xb)
        }, {
          i: i - 2,
          x: interpolateNumber(ya, yb)
        });
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function (a, b) {
      var s = [],
          // string constants and placeholders
      q = []; // number interpolators

      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc

      return function (t) {
        var i = -1,
            n = q.length,
            o;

        while (++i < n) {
          s[(o = q[i]).i] = o.x(t);
        }

        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var rho = Math.SQRT2;

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function () {
      var schedule = set$1(this, id),
          tween = schedule.tween; // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.

      if (tween !== tween0) {
        tween1 = tween0 = tween;

        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error();
    return function () {
      var schedule = set$1(this, id),
          tween = schedule.tween; // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.

      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();

        for (var t = {
          name: name,
          value: value
        }, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }

        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween (name, value) {
    var id = this._id;
    name += "";

    if (arguments.length < 2) {
      var tween = get$1(this.node(), id).tween;

      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }

      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }
  function tweenValue(transition, name, value) {
    var id = transition._id;
    transition.each(function () {
      var schedule = set$1(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function (node) {
      return get$1(node, id).value[name];
    };
  }

  function interpolate (a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber : b instanceof color ? interpolateRgb : (c = color(b)) ? (b = c, interpolateRgb) : interpolateString)(a, b);
  }

  function attrRemove$1(name) {
    return function () {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function () {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function () {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS$1(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function () {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction$1(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function () {
      var string0,
          value1 = value(this),
          string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS$1(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function () {
      var string0,
          value1 = value(this),
          string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr (name, value) {
    var fullname = namespace(name),
        i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname) : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function (t) {
      this.setAttribute(name, i(t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function (t) {
      this.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;

    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }

    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;

    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }

    tween._value = value;
    return tween;
  }

  function transition_attrTween (name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function () {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function () {
      init(this, id).delay = value;
    };
  }

  function transition_delay (value) {
    var id = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : get$1(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function () {
      set$1(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function () {
      set$1(this, id).duration = value;
    };
  }

  function transition_duration (value) {
    var id = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get$1(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error();
    return function () {
      set$1(this, id).ease = value;
    };
  }

  function transition_ease (value) {
    var id = this._id;
    return arguments.length ? this.each(easeConstant(id, value)) : get$1(this.node(), id).ease;
  }

  function transition_filter (match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge (transition) {
    if (transition._id !== this._id) throw new Error();

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function (t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0,
        on1,
        sit = start(name) ? init : set$1;
    return function () {
      var schedule = sit(this, id),
          on = schedule.on; // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.

      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }

  function transition_on (name, listener) {
    var id = this._id;
    return arguments.length < 2 ? get$1(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function () {
      var parent = this.parentNode;

      for (var i in this.__transition) {
        if (+i !== id) return;
      }

      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove () {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select (select) {
    var name = this._name,
        id = this._id;
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll (select) {
    var name = this._name,
        id = this._id;
    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }

          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection$1 = selection.prototype.constructor;
  function transition_selection () {
    return new Selection$1(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function () {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove$1(name) {
    return function () {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function () {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction$1(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function () {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0,
        on1,
        listener0,
        key = "style." + name,
        event = "end." + key,
        remove;
    return function () {
      var schedule = set$1(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove$1(name)) : undefined; // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.

      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }

  function transition_style (name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove$1(name)) : typeof value === "function" ? this.styleTween(name, styleFunction$1(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant$1(name, i, value), priority).on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function (t) {
      this.style.setProperty(name, i(t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;

    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }

    tween._value = value;
    return tween;
  }

  function transition_styleTween (name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant$1(value) {
    return function () {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function () {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text (value) {
    return this.tween("text", typeof value === "function" ? textFunction$1(tweenValue(this, "text", value)) : textConstant$1(value == null ? "" : value + ""));
  }

  function transition_transition () {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get$1(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end () {
    var on0,
        on1,
        that = this,
        id = that._id,
        size = that.size();
    return new Promise(function (resolve, reject) {
      var cancel = {
        value: reject
      },
          end = {
        value: function value() {
          if (--size === 0) resolve();
        }
      };
      that.each(function () {
        var schedule = set$1(this, id),
            on = schedule.on; // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.

        if (on !== on0) {
          on1 = (on0 = on).copy();

          on1._.cancel.push(cancel);

          on1._.interrupt.push(cancel);

          on1._.end.push(end);
        }

        schedule.on = on1;
      });
    });
  }

  var id$1 = 0;
  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }
  function transition(name) {
    return selection().transition(name);
  }
  function newId() {
    return ++id$1;
  }
  var selection_prototype = selection.prototype;
  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    end: transition_end
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var pi = Math.PI;

  var tau = 2 * Math.PI;

  var defaultTiming = {
    time: null,
    // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;

    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        return defaultTiming.time = now(), defaultTiming;
      }
    }

    return timing;
  }

  function selection_transition (name) {
    var id, timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

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
      parent: select("body"),
      transition: transition().duration(0),
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

  function ascending$1 (a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function bisector (compare) {
    if (compare.length === 1) compare = ascendingComparator(compare);
    return {
      left: function left(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
        }

        return lo;
      },
      right: function right(a, x, lo, hi) {
        if (lo == null) lo = 0;
        if (hi == null) hi = a.length;

        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
        }

        return lo;
      }
    };
  }

  function ascendingComparator(f) {
    return function (d, x) {
      return ascending$1(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending$1);

  function merge (arrays) {
    var n = arrays.length,
        m,
        i = -1,
        j = 0,
        merged,
        array;

    while (++i < n) {
      j += arrays[i].length;
    }

    merged = new Array(j);

    while (--n >= 0) {
      array = arrays[n];
      m = array.length;

      while (--m >= 0) {
        merged[--j] = array[m];
      }
    }

    return merged;
  }

  function sum (values, valueof) {
    var n = values.length,
        i = -1,
        value,
        sum = 0;

    if (valueof == null) {
      while (++i < n) {
        if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
      }
    } else {
      while (++i < n) {
        if (value = +valueof(values[i], i, values)) sum += value;
      }
    }

    return sum;
  }

  var prefix = "$";

  function Map() {}

  Map.prototype = map.prototype = {
    constructor: Map,
    has: function has(key) {
      return prefix + key in this;
    },
    get: function get(key) {
      return this[prefix + key];
    },
    set: function set(key, value) {
      this[prefix + key] = value;
      return this;
    },
    remove: function remove(key) {
      var property = prefix + key;
      return property in this && delete this[property];
    },
    clear: function clear() {
      for (var property in this) {
        if (property[0] === prefix) delete this[property];
      }
    },
    keys: function keys() {
      var keys = [];

      for (var property in this) {
        if (property[0] === prefix) keys.push(property.slice(1));
      }

      return keys;
    },
    values: function values() {
      var values = [];

      for (var property in this) {
        if (property[0] === prefix) values.push(this[property]);
      }

      return values;
    },
    entries: function entries() {
      var entries = [];

      for (var property in this) {
        if (property[0] === prefix) entries.push({
          key: property.slice(1),
          value: this[property]
        });
      }

      return entries;
    },
    size: function size() {
      var size = 0;

      for (var property in this) {
        if (property[0] === prefix) ++size;
      }

      return size;
    },
    empty: function empty() {
      for (var property in this) {
        if (property[0] === prefix) return false;
      }

      return true;
    },
    each: function each(f) {
      for (var property in this) {
        if (property[0] === prefix) f(this[property], property.slice(1), this);
      }
    }
  };

  function map(object, f) {
    var map = new Map(); // Copy constructor.

    if (object instanceof Map) object.each(function (value, key) {
      map.set(key, value);
    }); // Index array by numeric index or specified key function.
    else if (Array.isArray(object)) {
        var i = -1,
            n = object.length,
            o;
        if (f == null) while (++i < n) {
          map.set(i, object[i]);
        } else while (++i < n) {
          map.set(f(o = object[i], i, object), o);
        }
      } // Convert object to map.
      else if (object) for (var key in object) {
          map.set(key, object[key]);
        }
    return map;
  }

  function Set() {}

  var proto = map.prototype;
  Set.prototype = set$2.prototype = {
    constructor: Set,
    has: proto.has,
    add: function add(value) {
      value += "";
      this[prefix + value] = value;
      return this;
    },
    remove: proto.remove,
    clear: proto.clear,
    values: proto.keys,
    size: proto.size,
    empty: proto.empty,
    each: proto.each
  };

  function set$2(object, f) {
    var set = new Set(); // Copy constructor.

    if (object instanceof Set) object.each(function (value) {
      set.add(value);
    }); // Otherwise, assume it’s an array.
    else if (object) {
        var i = -1,
            n = object.length;
        if (f == null) while (++i < n) {
          set.add(object[i]);
        } else while (++i < n) {
          set.add(f(object[i], i, object));
        }
      }
    return set;
  }

  function keys (map) {
    var keys = [];

    for (var key in map) {
      keys.push(key);
    }

    return keys;
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
    var availableKeys = unique(merge(objects.map(function (o) {
      return keys(o);
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
          value = merge(values.map(function (v) {
            return v instanceof Array ? v : [v];
          }));
          value = unique(value);
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(String) >= 0) {
          value = unique(values);
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(Number) >= 0) value = sum(values);else if (types.indexOf(Object) >= 0) {
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
  function prefix$1 () {
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
  exports.prefix = prefix$1;
  exports.stylize = stylize;
  exports.unique = unique;
  exports.uuid = uuid;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-common.full.js.map
