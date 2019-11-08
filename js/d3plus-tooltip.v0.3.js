/*
  d3plus-tooltip v0.3.14
  A javascript-only tooltip.
  Copyright (c) 2019 D3plus - https://d3plus.org
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
	  version: '3.4.0',
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3plus-common'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define('d3plus-tooltip', ['exports', 'd3-selection', 'd3plus-common', 'popper.js'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Selection, global.d3plusCommon, global.Popper));
}(this, (function (exports, d3Selection, d3plusCommon, Popper) { 'use strict';

  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

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

  /**
      @class Tooltip
      @extends BaseClass
      @desc Creates HTML tooltips in the body of a webpage.
  */

  var Tooltip =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Tooltip, _BaseClass);

    /**
        @memberof Tooltip
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Tooltip() {
      var _this;

      _classCallCheck(this, Tooltip);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this));
      _this._arrow = d3plusCommon.accessor("arrow", "");
      _this._arrowStyle = {
        "content": "",
        "background": "inherit",
        "border": "inherit",
        "border-width": "0 1px 1px 0",
        "height": "10px",
        "position": "absolute",
        "transform": "rotate(45deg)",
        "width": "10px",
        "z-index": "-1"
      };
      _this._background = d3plusCommon.constant("rgba(255, 255, 255, 1)");
      _this._body = d3plusCommon.accessor("body", "");
      _this._bodyStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "400",
        "z-index": "1"
      };
      _this._border = d3plusCommon.constant("1px solid rgba(0, 0, 0, 0.1)");
      _this._borderRadius = d3plusCommon.constant("2px");
      _this._className = "d3plus-tooltip";
      _this._data = [];
      _this._footer = d3plusCommon.accessor("footer", "");
      _this._footerStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "400",
        "z-index": "1"
      };
      _this._height = d3plusCommon.constant("auto");

      _this._id = function (d, i) {
        return "".concat(i);
      };

      _this._offset = d3plusCommon.constant(5);
      _this._padding = d3plusCommon.constant("5px");
      _this._pointerEvents = d3plusCommon.constant("auto");
      _this._popperClasses = {};

      _this._position = function (d) {
        return [d.x, d.y];
      };

      _this._prefix = d3plusCommon.prefix();
      _this._tableStyle = {
        "border-collapse": "collapse",
        "border-spacing": "0",
        "width": "100%"
      };
      _this._tbody = [];
      _this._tbodyStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "text-align": "center"
      };
      _this._thead = [];
      _this._theadStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "12px",
        "font-weight": "600",
        "text-align": "center"
      };
      _this._title = d3plusCommon.accessor("title", "");
      _this._titleStyle = {
        "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
        "font-size": "14px",
        "font-weight": "600"
      };
      _this._trStyle = {
        "border-top": "1px solid rgba(0, 0, 0, 0.1)"
      };
      _this._tdStyle = {};
      _this._width = d3plusCommon.constant("auto");
      return _this;
    }
    /**
        The inner return object and draw function that gets assigned the public methods.
        @private
    */


    _createClass(Tooltip, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        var that = this;
        var tooltips = d3Selection.select("body").selectAll(".".concat(this._className)).data(this._data, this._id);
        var enter = tooltips.enter().append("div").attr("class", this._className);
        var update = tooltips.merge(enter);
        /**
            Creates DIV elements with a unique class and styles.
            @private
        */

        function divElement(cat) {
          enter.append("div").attr("class", "d3plus-tooltip-".concat(cat)).attr("id", function (d, i) {
            return "d3plus-tooltip-".concat(cat, "-").concat(d ? that._id(d, i) : "");
          });
          var div = update.select(".d3plus-tooltip-".concat(cat)).html(function (d, i) {
            return that["_".concat(cat)](d, i);
          }).style("display", function (d, i) {
            var val = that["_".concat(cat)](d, i);
            var visible = val !== false && val !== undefined && val !== null;
            return visible ? "block" : "none";
          });
          d3plusCommon.stylize(div, that["_".concat(cat, "Style")]);
        }
        /**
            Fetches table contents given functions or values.
            @private
        */


        function cellContent(d) {
          if (typeof d === "function") {
            var datum = d3Selection.select(this.parentNode.parentNode).datum();
            return d(datum, that._data.indexOf(datum));
          } else return d;
        }
        /**
            Sets styles for both enter and update.
            @private
        */


        function boxStyles(box) {
          box.style("background", that._background).style("".concat(that._prefix, "border-radius"), that._borderRadius).style("pointer-events", that._pointerEvents).style("padding", that._padding).style("width", that._width).style("height", that._height).style("border", function (d, i) {
            var b = d3Selection.select(this).style("border");
            return b !== "0px none rgb(0, 0, 0)" ? b : that._border(d, i);
          });
        }

        divElement("title");
        divElement("body");
        var tableEnter = enter.append("table").attr("class", "d3plus-tooltip-table");
        var table = update.select(".d3plus-tooltip-table");
        d3plusCommon.stylize(table, this._tableStyle);
        tableEnter.append("thead").attr("class", "d3plus-tooltip-thead");
        var tableHead = update.select(".d3plus-tooltip-thead");
        d3plusCommon.stylize(tableHead, this._theadStyle);
        var th = tableHead.selectAll("th").data(this._thead);
        th.enter().append("th").merge(th).html(cellContent);
        th.exit().remove();
        tableEnter.append("tbody").attr("class", "d3plus-tooltip-tbody");
        var tableBody = update.select(".d3plus-tooltip-tbody");
        d3plusCommon.stylize(tableBody, this._tbodyStyle);
        var tr = tableBody.selectAll("tr").data(this._tbody);
        var trEnter = tr.enter().append("tr");
        tr.exit().remove();
        var trUpdate = tr.merge(trEnter);
        d3plusCommon.stylize(trUpdate, this._trStyle);
        var td = trUpdate.selectAll("td").data(function (d) {
          return d;
        });
        td.enter().append("td").merge(td).html(cellContent);
        d3plusCommon.stylize(td, this._tdStyle);
        divElement("footer");
        divElement("arrow");
        enter.attr("id", function (d, i) {
          return "d3plus-tooltip-".concat(d ? _this2._id(d, i) : "");
        }).call(boxStyles).each(function (d, i) {
          var id = that._id(d, i);

          var tooltip = document.getElementById("d3plus-tooltip-".concat(id));
          var arrow = document.getElementById("d3plus-tooltip-arrow-".concat(id));
          var arrowHeight = arrow.offsetHeight;
          var arrowDistance = arrow.getBoundingClientRect().height / 2;
          arrow.style.bottom = "-".concat(arrowHeight / 2, "px");

          var position = that._position(d, i);

          var referenceObject = Array.isArray(position) ? {
            clientWidth: 0,
            clientHeight: 0,
            getBoundingClientRect: function getBoundingClientRect() {
              return {
                top: position[1],
                right: position[0],
                bottom: position[1],
                left: position[0],
                width: 0,
                height: 0
              };
            }
          } : position;
          _this2._popperClasses[id] = new Popper(referenceObject, tooltip, {
            placement: "top",
            placements: ["top", "bottom", "left", "right"],
            modifiers: {
              arrow: {
                element: arrow
              },
              offset: {
                offset: "0,".concat(that._offset(d, i) + arrowDistance)
              },
              preventOverflow: {
                boundariesElement: "scrollParent"
              },
              flip: {
                behavior: "flip",
                boundariesElement: "viewport"
              }
            },
            onUpdate: function onUpdate(_ref) {
              var arrowElement = _ref.arrowElement,
                  flipped = _ref.flipped;

              if (flipped) {
                arrowElement.style.transform = "rotate(225deg)";
                arrowElement.style.top = "-".concat(arrowHeight / 2, "px");
              } else {
                arrowElement.style.transform = "rotate(45deg)";
                arrowElement.style.bottom = "-".concat(arrowHeight / 2, "px");
              }
            },
            removeOnDestroy: true
          });
        });
        update.each(function (d, i) {
          var id = that._id(d, i);

          var position = that._position(d, i);

          var instance = _this2._popperClasses[id];

          if (instance) {
            var referenceObject = Array.isArray(position) ? {
              clientWidth: 0,
              clientHeight: 0,
              getBoundingClientRect: function getBoundingClientRect() {
                return {
                  top: position[1],
                  right: position[0],
                  bottom: position[1],
                  left: position[0],
                  width: 0,
                  height: 0
                };
              }
            } : position;
            instance.reference = referenceObject;
            instance.scheduleUpdate();
          }
        }).call(boxStyles);
        tooltips.exit().each(function (d, i) {
          var id = that._id(d, i);

          var instance = _this2._popperClasses[id];

          if (instance) {
            instance.destroy();
            delete _this2._popperClasses[id];
          }
        }).remove();
        if (callback) setTimeout(callback, 100);
        return this;
      }
      /**
       @memberof Tooltip
       @desc Sets the inner HTML content of the arrow element, which by default is empty.
       @param {Function|String} [*value*]
       @example <caption>default accessor</caption>
       function value(d) {
      return d.arrow || "";
      }
       */

    }, {
      key: "arrow",
      value: function arrow(_) {
        return arguments.length ? (this._arrow = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._arrow;
      }
      /**
       @memberof Tooltip
       @desc If *value* is specified, sets the arrow styles to the specified values and returns this generator. If *value* is not specified, returns the current arrow styles.
       @param {Object} [*value*]
       @example <caption>default styles</caption>
       {
         "content": "",
         "border-width": "10px",
         "border-style": "solid",
         "border-color": "rgba(255, 255, 255, 0.75) transparent transparent transparent",
         "position": "absolute"
       }
       */

    }, {
      key: "arrowStyle",
      value: function arrowStyle(_) {
        return arguments.length ? (this._arrowStyle = Object.assign(this._arrowStyle, _), this) : this._arrowStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the background accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background accessor.
          @param {Function|String} [*value* = "rgba(255, 255, 255, 0.75)"]
      */

    }, {
      key: "background",
      value: function background(_) {
        return arguments.length ? (this._background = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._background;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the body accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current body accessor.
          @param {Function|String} [*value*]
          @example <caption>default accessor</caption>
      function value(d) {
      return d.body || "";
      }
      */

    }, {
      key: "body",
      value: function body(_) {
        return arguments.length ? (this._body = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._body;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the body styles to the specified values and returns this generator. If *value* is not specified, returns the current body styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "12px",
      "font-weight": "400"
      }
      */

    }, {
      key: "bodyStyle",
      value: function bodyStyle(_) {
        return arguments.length ? (this._bodyStyle = Object.assign(this._bodyStyle, _), this) : this._bodyStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the border accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border accessor.
          @param {Function|String} [*value* = "1px solid rgba(0, 0, 0, 0.1)"]
      */

    }, {
      key: "border",
      value: function border(_) {
        return arguments.length ? (this._border = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._border;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the border-radius accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border-radius accessor.
          @param {Function|String} [*value* = "2px"]
      */

    }, {
      key: "borderRadius",
      value: function borderRadius(_) {
        return arguments.length ? (this._borderRadius = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._borderRadius;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the class name to the specified string and returns this generator. If *value* is not specified, returns the current class name.
          @param {String} [*value* = "d3plus-tooltip"]
      */

    }, {
      key: "className",
      value: function className(_) {
        return arguments.length ? (this._className = _, this) : this._className;
      }
      /**
          @memberof Tooltip
          @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
          @param {Array} [*data* = []]
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the footer accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current footer accessor.
          @param {Function|String} [*value*]
          @example <caption>default accessor</caption>
      function value(d) {
      return d.footer || "";
      }
      */

    }, {
      key: "footer",
      value: function footer(_) {
        return arguments.length ? (this._footer = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._footer;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the footer styles to the specified values and returns this generator. If *value* is not specified, returns the current footer styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "12px",
      "font-weight": "400"
      }
      */

    }, {
      key: "footerStyle",
      value: function footerStyle(_) {
        return arguments.length ? (this._footerStyle = Object.assign(this._footerStyle, _), this) : this._footerStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current height accessor.
          @param {Function|String} [*value* = "auto"]
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the id accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current id accessor.
          @param {Function|String} [*value*]
          @example <caption>default accessor</caption>
      function value(d, i) {
      return d.id || "" + i;
      }
      */

    }, {
      key: "id",
      value: function id(_) {
        return arguments.length ? (this._id = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._id;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the offset accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current offset accessor.
          @param {Function|Number} [*value* = 10]
      */

    }, {
      key: "offset",
      value: function offset(_) {
        return arguments.length ? (this._offset = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._offset;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the padding accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current padding accessor.
          @param {Function|String} [*value* = "5px"]
      */

    }, {
      key: "padding",
      value: function padding(_) {
        return arguments.length ? (this._padding = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._padding;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.
          @param {Function|String} [*value* = "auto"]
      */

    }, {
      key: "pointerEvents",
      value: function pointerEvents(_) {
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the position accessor to the specified function or array and returns this generator. If *value* is not specified, returns the current position accessor. If *value* is an HTMLElement, anchors the Tooltip to that HTMLElement. If *value* is a selection string, anchors the Tooltip to the HTMLElement selected by that string. Otherwise, coordinate points must be in reference to the client viewport, not the overall page.
          @param {Function|Array|HTMLElement|String} [*value*]
          @example <caption>default accessor</caption>
       function value(d) {
        return [d.x, d.y];
      }
       */

    }, {
      key: "position",
      value: function position(_) {
        return arguments.length ? (this._position = typeof _ === "string" ? d3plusCommon.constant(d3Selection.select(_).node() || [0, 0]) : typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._position;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the table styles to the specified values and returns this generator. If *value* is not specified, returns the current table styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "border-collapse": "collapse",
      "border-spacing": "0",
      "width": "100%"
      }
      */

    }, {
      key: "tableStyle",
      value: function tableStyle(_) {
        return arguments.length ? (this._tableStyle = Object.assign(this._tableStyle, _), this) : this._tableStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the contents of the table body to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table body data.
          @param {Array} [*value* = []]
      */

    }, {
      key: "tbody",
      value: function tbody(_) {
        return arguments.length ? (this._tbody = _, this) : this._tbody;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the table body styles to the specified values and returns this generator. If *value* is not specified, returns the current table body styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "12px",
      "font-weight": "600",
      "text-align": "center"
      }
      */

    }, {
      key: "tbodyStyle",
      value: function tbodyStyle(_) {
        return arguments.length ? (this._tbodyStyle = Object.assign(this._tbodyStyle, _), this) : this._tbodyStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the contents of the table head to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table head data.
          @param {Array} [*value* = []]
      */

    }, {
      key: "thead",
      value: function thead(_) {
        return arguments.length ? (this._thead = _, this) : this._thead;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the table head styles to the specified values and returns this generator. If *value* is not specified, returns the current table head styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "12px",
      "font-weight": "600",
      "text-align": "center"
      }
      */

    }, {
      key: "theadStyle",
      value: function theadStyle(_) {
        return arguments.length ? (this._theadStyle = Object.assign(this._theadStyle, _), this) : this._theadStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the title accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current title accessor.
          @param {Function|String} [*value*]
          @example <caption>default accessor</caption>
      function value(d) {
      return d.title || "";
      }
      */

    }, {
      key: "title",
      value: function title(_) {
        return arguments.length ? (this._title = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._title;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the title styles to the specified values and returns this generator. If *value* is not specified, returns the current title styles.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
      "font-family": "'Roboto', 'Helvetica Neue', 'HelveticaNeue', 'Helvetica', 'Arial', sans-serif",
      "font-size": "14px",
      "font-weight": "600",
      "padding-bottom": "5px"
      }
      */

    }, {
      key: "titleStyle",
      value: function titleStyle(_) {
        return arguments.length ? (this._titleStyle = Object.assign(this._titleStyle, _), this) : this._titleStyle;
      }
      /**
          @memberof Tooltip
          @desc An object with CSS keys and values to be applied to all <tr> elements inside of each <tbody>.
          @param {Object} [*value*]
          @example <caption>default styles</caption>
      {
        "border-top": "1px solid rgba(0, 0, 0, 0.1)"
      }
       */

    }, {
      key: "trStyle",
      value: function trStyle(_) {
        return arguments.length ? (this._trStyle = Object.assign(this._trStyle, _), this) : this._trStyle;
      }
      /**
          @memberof Tooltip
          @desc An object with CSS keys and values to be applied to all <td> elements inside of each <tr>.
          @param {Object} [*value*]
       */

    }, {
      key: "tdStyle",
      value: function tdStyle(_) {
        return arguments.length ? (this._tdStyle = Object.assign(this._tdStyle, _), this) : this._tdStyle;
      }
      /**
          @memberof Tooltip
          @desc If *value* is specified, sets the width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current width accessor.
          @param {Function|String} [*value* = "auto"]
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
      }
    }]);

    return Tooltip;
  }(d3plusCommon.BaseClass);

  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-tooltip.js.map
