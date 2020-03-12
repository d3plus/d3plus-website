/*
  d3plus-axis v0.4.19
  Beautiful javascript scales and axes.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-time'), require('d3-time-format'), require('d3-scale'), require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3plus-format'), require('d3plus-shape'), require('d3plus-text')) :
  typeof define === 'function' && define.amd ? define('d3plus-axis', ['exports', 'd3-array', 'd3-time', 'd3-time-format', 'd3-scale', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3plus-format', 'd3plus-shape', 'd3plus-text'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Array, global.d3Time, global.d3TimeFormat, global.scales, global.d3Selection, global.d3Transition, global.d3plusCommon, global.d3plusFormat, global.shapes, global.d3plusText));
}(this, function (exports, d3Array, d3Time, d3TimeFormat, scales, d3Selection, d3Transition, d3plusCommon, d3plusFormat, shapes, d3plusText) { 'use strict';

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
      @function date
      @summary Parses numbers and strings to valid Javascript Date objects.
      @description Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.
      @param {Number|String} *date*
  */
  function date (d) {
    // returns if already Date object
    if (d.constructor === Date) return d; // detects if milliseconds
    else if (d.constructor === Number && "".concat(d).length > 5 && d % 1 === 0) return new Date(d);
    var s = "".concat(d);
    var dayFormat = new RegExp(/^\d{1,2}[./-]\d{1,2}[./-](-*\d{1,4})$/g).exec(s),
        strFormat = new RegExp(/^[A-z]{1,3} [A-z]{1,3} \d{1,2} (-*\d{1,4}) \d{1,2}:\d{1,2}:\d{1,2} [A-z]{1,3}-*\d{1,4} \([A-z]{1,3}\)/g).exec(s); // tests for XX/XX/XXXX format

    if (dayFormat) {
      var year = dayFormat[1];
      if (year.indexOf("-") === 0) s = s.replace(year, year.substr(1));
      var date = new Date(s);
      date.setFullYear(year);
      return date;
    } // tests for full Date object string format
    else if (strFormat) {
        var _year = strFormat[1];
        if (_year.indexOf("-") === 0) s = s.replace(_year, _year.substr(1));

        var _date = new Date(s);

        _date.setFullYear(_year);

        return _date;
      } // detects if only passing a year value
      else if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
          var _date2 = new Date("".concat(s, "/01/01"));

          _date2.setFullYear(d);

          return _date2;
        } // parses string to Date object
        else return new Date(s);
  }

  var locale = {
    "de-DE": {
      dateTime: "%A, der %e. %B %Y, %X",
      date: "%d.%m.%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    },
    "en-GB": {
      dateTime: "%a %e %b %X %Y",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    "en-US": {
      dateTime: "%x, %X",
      date: "%-m/%-d/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    "es-ES": {
      dateTime: "%A, %e de %B de %Y, %X",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    },
    "es-MX": {
      dateTime: "%x, %X",
      date: "%d/%m/%Y",
      time: "%-I:%M:%S %p",
      periods: ["AM", "PM"],
      days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    },
    "fr-FR": {
      dateTime: "%A, le %e %B %Y, %X",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
      shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
      months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
    },
    "it-IT": {
      dateTime: "%A %e %B %Y, %X",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
      shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
      months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
      shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
    },
    "pt-BR": {
      dateTime: "%A, %e de %B de %Y. %X",
      date: "%d/%m/%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    }
  };

  /**
      @class Axis
      @extends external:BaseClass
      @desc Creates an SVG scale based on an array of data.
  */

  var Axis =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Axis, _BaseClass);

    /**
        @memberof Axis
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Axis() {
      var _this;

      _classCallCheck(this, Axis);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Axis).call(this));
      _this._align = "middle";
      _this._barConfig = {
        "stroke": "#000",
        "stroke-width": 1
      };
      _this._domain = [0, 10];
      _this._duration = 600;
      _this._gridConfig = {
        "stroke": "#ccc",
        "stroke-width": 1
      };
      _this._gridLog = false;
      _this._height = 400;
      _this._labelOffset = true;

      _this.orient("bottom");

      _this._outerBounds = {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      _this._padding = 5;
      _this._paddingInner = 0.1;
      _this._paddingOuter = 0.1;
      _this._rotateLabels = false;
      _this._scale = "linear";
      _this._scalePadding = 0.5;
      _this._shape = "Line";
      _this._shapeConfig = {
        fill: "#000",
        height: function height(d) {
          return d.tick ? 8 : 0;
        },
        label: function label(d) {
          return d.text;
        },
        labelBounds: function labelBounds(d) {
          return d.labelBounds;
        },
        labelConfig: {
          fontColor: "#000",
          fontFamily: new d3plusText.TextBox().fontFamily(),
          fontResize: false,
          fontSize: d3plusCommon.constant(10),
          padding: 0,
          textAnchor: function textAnchor() {
            var rtl = d3plusText.rtl();
            return _this._orient === "left" ? rtl ? "start" : "end" : _this._orient === "right" ? rtl ? "end" : "start" : _this._rotateLabels ? _this._orient === "bottom" ? "end" : "start" : "middle";
          },
          verticalAlign: function verticalAlign() {
            return _this._orient === "bottom" ? "top" : _this._orient === "top" ? "bottom" : "middle";
          }
        },
        r: function r(d) {
          return d.tick ? 4 : 0;
        },
        stroke: "#000",
        strokeWidth: 1,
        width: function width(d) {
          return d.tick ? 8 : 0;
        }
      };
      _this._tickSize = 5;
      _this._tickSpecifier = undefined;
      _this._tickSuffix = "normal";
      _this._tickUnit = 0;
      _this._timeLocale = undefined;
      _this._titleClass = new d3plusText.TextBox();
      _this._titleConfig = {
        fontSize: 12,
        textAnchor: "middle"
      };
      _this._width = 400;
      return _this;
    }
    /**
        @memberof Axis
        @desc Sets positioning for the axis bar.
        @param {D3Selection} *bar*
        @private
    */


    _createClass(Axis, [{
      key: "_barPosition",
      value: function _barPosition(bar) {
        var _this$_position = this._position,
            height = _this$_position.height,
            x = _this$_position.x,
            y = _this$_position.y,
            opposite = _this$_position.opposite,
            domain = this._getDomain(),
            offset = this._margin[opposite],
            position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

        var x1mod = this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : this._scale === "point" ? this._d3Scale.step() * this._d3Scale.padding() : 0;
        var x2mod = this._scale === "band" ? this._d3Scale.step() : this._scale === "point" ? this._d3Scale.step() * this._d3Scale.padding() : 0;
        bar.call(d3plusCommon.attrize, this._barConfig).attr("".concat(x, "1"), this._getPosition(domain[0]) - x1mod).attr("".concat(x, "2"), this._getPosition(domain[domain.length - 1]) + x2mod).attr("".concat(y, "1"), position).attr("".concat(y, "2"), position);
      }
      /**
          @memberof Axis
          @desc Returns the scale's domain, taking into account negative and positive log scales.
          @private
      */

    }, {
      key: "_getDomain",
      value: function _getDomain() {
        var ticks = [];
        if (this._d3ScaleNegative) ticks = this._d3ScaleNegative.domain();
        if (this._d3Scale) ticks = ticks.concat(this._d3Scale.domain());
        var domain = ["band", "ordinal", "point"].includes(this._scale) ? ticks : d3Array.extent(ticks);
        return ticks[0] > ticks[1] ? domain.reverse() : domain;
      }
      /**
          @memberof Axis
          @desc Returns a value's scale position, taking into account negative and positive log scales.
          @param {Number|String} *d*
          @private
      */

    }, {
      key: "_getPosition",
      value: function _getPosition(d) {
        return d < 0 && this._d3ScaleNegative ? this._d3ScaleNegative(d) : this._d3Scale(d);
      }
      /**
          @memberof Axis
          @desc Returns the scale's range, taking into account negative and positive log scales.
          @private
      */

    }, {
      key: "_getRange",
      value: function _getRange() {
        var ticks = [];
        if (this._d3ScaleNegative) ticks = this._d3ScaleNegative.range();
        if (this._d3Scale) ticks = ticks.concat(this._d3Scale.range());
        return ticks[0] > ticks[1] ? d3Array.extent(ticks).reverse() : d3Array.extent(ticks);
      }
      /**
          @memberof Axis
          @desc Returns the scale's ticks, taking into account negative and positive log scales.
          @private
      */

    }, {
      key: "_getTicks",
      value: function _getTicks() {
        var tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
        var ticks = [];

        if (this._d3ScaleNegative) {
          var negativeRange = this._d3ScaleNegative.range();

          var size = negativeRange[1] - negativeRange[0];
          ticks = this._d3ScaleNegative.ticks(Math.floor(size / tickScale(size)));
        }

        if (this._d3Scale) {
          var positiveRange = this._d3Scale.range();

          var _size = positiveRange[1] - positiveRange[0];

          ticks = ticks.concat(this._d3Scale.ticks(Math.floor(_size / tickScale(_size))));
        }

        return ticks;
      }
      /**
          @memberof Axis
          @desc Sets positioning for the grid lines.
          @param {D3Selection} *lines*
          @private
      */

    }, {
      key: "_gridPosition",
      value: function _gridPosition(lines) {
        var last = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var _this$_position2 = this._position,
            height = _this$_position2.height,
            x = _this$_position2.x,
            y = _this$_position2.y,
            opposite = _this$_position2.opposite,
            offset = this._margin[opposite],
            position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
            scale = last ? this._lastScale || this._getPosition.bind(this) : this._getPosition.bind(this),
            size = ["top", "left"].includes(this._orient) ? offset : -offset,
            xDiff = this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0,
            xPos = function xPos(d) {
          return scale(d.id) + xDiff;
        };

        lines.call(d3plusCommon.attrize, this._gridConfig).attr("".concat(x, "1"), xPos).attr("".concat(x, "2"), xPos).attr("".concat(y, "1"), position).attr("".concat(y, "2"), last ? position : position + size);
      }
      /**
          @memberof Axis
          @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
          @param {Function} [*callback* = undefined]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this3 = this,
            _this$_outerBounds;

        /**
         * Creates an SVG element to contain the axis if none
         * has been specified using the "select" method.
         */
        if (this._select === void 0) {
          this.select(d3Selection.select("body").append("svg").attr("width", "".concat(this._width, "px")).attr("height", "".concat(this._height, "px")).node());
        }

        var timeLocale = this._timeLocale || locale[this._locale] || locale["en-US"];
        d3TimeFormat.timeFormatDefaultLocale(timeLocale).format();
        var formatDay = d3TimeFormat.timeFormat("%a %d"),
            formatHour = d3TimeFormat.timeFormat("%I %p"),
            formatMillisecond = d3TimeFormat.timeFormat(".%L"),
            formatMinute = d3TimeFormat.timeFormat("%I:%M"),
            formatMonth = d3TimeFormat.timeFormat("%b"),
            formatSecond = d3TimeFormat.timeFormat(":%S"),
            formatWeek = d3TimeFormat.timeFormat("%b %d"),
            formatYear = d3TimeFormat.timeFormat("%Y");
        /**
         * Declares some commonly used variables.
         */

        var _this$_position3 = this._position,
            width = _this$_position3.width,
            height = _this$_position3.height,
            x = _this$_position3.x,
            y = _this$_position3.y,
            horizontal = _this$_position3.horizontal,
            opposite = _this$_position3.opposite,
            clipId = "d3plus-Axis-clip-".concat(this._uuid),
            flip = ["top", "left"].includes(this._orient),
            p = this._padding,
            parent = this._select,
            rangeOuter = [p, this["_".concat(width)] - p],
            t = d3Transition.transition().duration(this._duration);
        var tickValue = this._shape === "Circle" ? this._shapeConfig.r : this._shape === "Rect" ? this._shapeConfig[width] : this._shapeConfig.strokeWidth;
        var tickGet = typeof tickValue !== "function" ? function () {
          return tickValue;
        } : tickValue;
        /**
         * Zeros out the margins for re-calculation.
         */

        var margin = this._margin = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
        var labels, range, ticks;
        /**
         * (Re)calculates the internal d3 scale
         * @param {} newRange
         */

        function setScale() {
          var _this2 = this;

          var newRange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._range;

          /**
           * Calculates the internal "range" array to use, including
           * fallbacks if not specified with the "range" method.
           */
          range = newRange ? newRange.slice() : [undefined, undefined];
          var minRange = rangeOuter[0],
              maxRange = rangeOuter[1];

          if (this._range) {
            if (this._range[0] !== undefined) minRange = this._range[0];
            if (this._range[this._range.length - 1] !== undefined) maxRange = this._range[this._range.length - 1];
          }

          if (range[0] === undefined || range[0] < minRange) range[0] = minRange;
          if (range[1] === undefined || range[1] > maxRange) range[1] = maxRange;
          var sizeInner = maxRange - minRange;

          if (this._scale === "ordinal" && this._domain.length > range.length) {
            if (newRange === this._range) {
              var buckets = this._domain.length + 1;
              range = d3Array.range(buckets).map(function (d) {
                return range[0] + sizeInner * (d / (buckets - 1));
              }).slice(1, buckets);
              range = range.map(function (d) {
                return d - range[0] / 2;
              });
            } else {
              var _buckets = this._domain.length;
              var size = range[1] - range[0];
              range = d3Array.range(_buckets).map(function (d) {
                return range[0] + size * (d / (_buckets - 1));
              });
            }
          } else if (newRange === this._range) {
            var tickScale = scales.scaleSqrt().domain([10, 400]).range([10, 50]);
            var domain = this._scale === "time" ? this._domain.map(date) : this._domain;
            var scaleTicks = d3Array.ticks(domain[0], domain[1], Math.floor(sizeInner / tickScale(sizeInner)));
            ticks = (this._ticks ? this._scale === "time" ? this._ticks.map(date) : this._ticks : scaleTicks).slice();
            labels = (this._labels ? this._scale === "time" ? this._labels.map(date) : this._labels : scaleTicks).slice();
            var _buckets2 = labels.length;

            if (_buckets2) {
              var pad = Math.ceil(sizeInner / _buckets2 / 2);
              range = [range[0] + pad, range[1] - pad];
            }
          }
          /**
           * Sets up the initial d3 scale, using this._domain and the
           * previously defined range variable.
           */


          this._d3Scale = scales["scale".concat(this._scale.charAt(0).toUpperCase()).concat(this._scale.slice(1))]().domain(this._scale === "time" ? this._domain.map(date) : this._domain);
          if (this._d3Scale.round) this._d3Scale.round(true);
          if (this._d3Scale.padding) this._d3Scale.padding(this._scalePadding);
          if (this._d3Scale.paddingInner) this._d3Scale.paddingInner(this._paddingInner);
          if (this._d3Scale.paddingOuter) this._d3Scale.paddingOuter(this._paddingOuter);
          if (this._d3Scale.rangeRound) this._d3Scale.rangeRound(range);else this._d3Scale.range(range);
          /**
           * Constructs a separate "negative only" scale for logarithmic
           * domains, as they cannot pass zero.
           */

          this._d3ScaleNegative = null;

          if (this._scale === "log") {
            var _domain = this._d3Scale.domain();

            if (_domain[0] === 0) _domain[0] = 1;
            if (_domain[_domain.length - 1] === 0) _domain[_domain.length - 1] = -1;

            var _range = this._d3Scale.range();

            if (_domain[0] < 0 && _domain[_domain.length - 1] < 0) {
              this._d3ScaleNegative = this._d3Scale.copy().domain(_domain).range(_range);
              this._d3Scale = null;
            } else if (_domain[0] > 0 && _domain[_domain.length - 1] > 0) {
              this._d3Scale.domain(_domain).range(_range);
            } else {
              var percentScale = scales.scaleLog().domain([1, _domain[_domain[1] > 0 ? 1 : 0]]).range([0, 1]);
              var leftPercentage = percentScale(Math.abs(_domain[_domain[1] < 0 ? 1 : 0]));
              var zero = leftPercentage / (leftPercentage + 1) * (_range[1] - _range[0]);
              if (_domain[0] > 0) zero = _range[1] - _range[0] - zero;
              this._d3ScaleNegative = this._d3Scale.copy();
              (_domain[0] < 0 ? this._d3Scale : this._d3ScaleNegative).domain([Math.sign(_domain[1]), _domain[1]]).range([_range[0] + zero, _range[1]]);
              (_domain[0] < 0 ? this._d3ScaleNegative : this._d3Scale).domain([_domain[0], Math.sign(_domain[0])]).range([_range[0], _range[0] + zero]);
            }
          }
          /**
           * Determines the of values array to use
           * for the "ticks" and the "labels"
           */


          ticks = (this._ticks ? this._scale === "time" ? this._ticks.map(date) : this._ticks : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks) ? this._getTicks() : this._domain).slice();
          labels = (this._labels ? this._scale === "time" ? this._labels.map(date) : this._labels : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks) ? this._getTicks() : ticks).slice();

          if (this._scale === "log") {
            labels = labels.filter(function (t) {
              return Math.abs(t).toString().charAt(0) === "1" && (_this2._d3Scale ? t !== -1 : t !== 1);
            });
          } else if (this._scale === "time") {
            ticks = ticks.map(Number);
            labels = labels.map(Number);
          }

          ticks = ticks.sort(function (a, b) {
            return _this2._getPosition(a) - _this2._getPosition(b);
          });
          labels = labels.sort(function (a, b) {
            return _this2._getPosition(a) - _this2._getPosition(b);
          });
          /**
           * Get the smallest suffix.
           */

          if (this._scale === "linear" && this._tickSuffix === "smallest") {
            var suffixes = labels.filter(function (d) {
              return d >= 1000;
            });

            if (suffixes.length > 0) {
              var _min = Math.min.apply(Math, _toConsumableArray(suffixes));

              var i = 1;

              while (i && i < 7) {
                var n = Math.pow(10, 3 * i);

                if (_min / n >= 1) {
                  this._tickUnit = i;
                  i += 1;
                } else {
                  break;
                }
              }
            }
          }
          /**
           * Removes ticks when they overlap other ticks.
           */


          var pixels = [];
          this._availableTicks = ticks;
          ticks.forEach(function (d, i) {
            var s = tickGet({
              id: d,
              tick: true
            }, i);
            if (_this2._shape === "Circle") s *= 2;

            var t = _this2._getPosition(d);

            if (!pixels.length || Math.abs(d3plusCommon.closest(t, pixels) - t) > s * 2) pixels.push(t);else pixels.push(false);
          });
          ticks = ticks.filter(function (d, i) {
            return pixels[i] !== false;
          });
          this._visibleTicks = ticks;
        }

        setScale.bind(this)();
        /**
         * Calculates the space available for a given label.
         * @param {Object} datum
         */

        function calculateSpace(datum) {
          var diff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var i = datum.i,
              position = datum.position;

          if (this._scale === "band") {
            return this._d3Scale.bandwidth();
          } else {
            var prevPosition = i - diff < 0 ? textData.length === 1 || !this._range ? rangeOuter[0] : (position - textData[i + diff].position) / 2 - position : position - (position - textData[i - diff].position) / 2;
            var prevSpace = Math.abs(position - prevPosition);
            var nextPosition = i + diff > textData.length - 1 ? textData.length === 1 || !this._range ? rangeOuter[1] : (position - textData[i - diff].position) / 2 - position : position - (position - textData[i + diff].position) / 2;
            var nextSpace = Math.abs(position - nextPosition);
            return d3Array.min([prevSpace, nextSpace]) * 2;
          }
        }
        /**
         * Constructs the tick formatter function.
         */


        var tickFormat = this._tickFormat ? this._tickFormat : function (d) {
          if (_this3._scale === "log") {
            var _p = Math.round(Math.log(Math.abs(d)) / Math.LN10);

            var _t = Math.abs(d).toString().charAt(0);

            var _n = "10 ".concat("".concat(_p).split("").map(function (c) {
              return "⁰¹²³⁴⁵⁶⁷⁸⁹"[c];
            }).join(""));

            if (_t !== "1") _n = "".concat(_t, " x ").concat(_n);
            return d < 0 ? "-".concat(_n) : _n;
          } else if (_this3._scale === "time") {
            return (d3Time.timeSecond(d) < d ? formatMillisecond : d3Time.timeMinute(d) < d ? formatSecond : d3Time.timeHour(d) < d ? formatMinute : d3Time.timeDay(d) < d ? formatHour : d3Time.timeMonth(d) < d ? d3Time.timeWeek(d) < d ? formatDay : formatWeek : d3Time.timeYear(d) < d ? formatMonth : formatYear)(d);
          } else if (["band", "ordinal", "point"].includes(_this3._scale)) {
            return d;
          }

          var n = _this3._d3Scale.tickFormat ? _this3._d3Scale.tickFormat(labels.length - 1)(d) : d;
          n = typeof n === "string" ? n.replace(/[^\d\.\-\+]/g, "") * 1 : n;

          if (isNaN(n)) {
            return n;
          } else if (_this3._scale === "linear" && _this3._tickSuffix === "smallest") {
            var _locale = _typeof(_this3._locale) === "object" ? _this3._locale : d3plusFormat.formatLocale[_this3._locale];

            var separator = _locale.separator,
                suffixes = _locale.suffixes;
            var suff = n >= 1000 ? suffixes[_this3._tickUnit + 8] : "";
            var tick = n / Math.pow(10, 3 * _this3._tickUnit);
            var number = d3plusFormat.formatAbbreviate(tick, _locale, ",.".concat(tick.toString().length, "r"));
            return "".concat(number).concat(separator).concat(suff);
          } else {
            return d3plusFormat.formatAbbreviate(n, _this3._locale);
          }
        };
        /**
         * Pre-calculates the size of the title, if defined, in order
         * to adjust the internal margins.
         */

        if (this._title) {
          var _this$_titleConfig = this._titleConfig,
              fontFamily = _this$_titleConfig.fontFamily,
              fontSize = _this$_titleConfig.fontSize,
              lineHeight = _this$_titleConfig.lineHeight;
          var titleWrap = d3plusText.textWrap().fontFamily(typeof fontFamily === "function" ? fontFamily() : fontFamily).fontSize(typeof fontSize === "function" ? fontSize() : fontSize).lineHeight(typeof lineHeight === "function" ? lineHeight() : lineHeight).width(range[range.length - 1] - range[0] - p * 2).height(this["_".concat(height)] - this._tickSize - p * 2);
          var lines = titleWrap(this._title).lines.length;
          margin[this._orient] = lines * titleWrap.lineHeight() + p;
        }

        var hBuff = this._shape === "Circle" ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({
          tick: true
        }) : this._shapeConfig.r : this._shape === "Rect" ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({
          tick: true
        }) : this._shapeConfig[height] : this._tickSize,
            wBuff = tickGet({
          tick: true
        });
        if (typeof hBuff === "function") hBuff = d3Array.max(ticks.map(hBuff));
        if (this._shape === "Rect") hBuff /= 2;
        if (typeof wBuff === "function") wBuff = d3Array.max(ticks.map(wBuff));
        if (this._shape !== "Circle") wBuff /= 2;
        /**
         * Calculates the space each label would take up, given
         * the provided this._space size.
         */

        var textData = labels.map(function (d, i) {
          var fF = _this3._shapeConfig.labelConfig.fontFamily(d, i),
              fS = _this3._shapeConfig.labelConfig.fontSize(d, i),
              position = _this3._getPosition(d);

          var lineHeight = _this3._shapeConfig.lineHeight ? _this3._shapeConfig.lineHeight(d, i) : fS * 1.4;
          return {
            d: d,
            i: i,
            fF: fF,
            fS: fS,
            lineHeight: lineHeight,
            position: position
          };
        });
        /**
         * Calculates the text wrapping and size of a given textData object.
         * @param {Object} datum
         */

        function calculateLabelSize(datum) {
          var d = datum.d,
              i = datum.i,
              fF = datum.fF,
              fS = datum.fS,
              rotate = datum.rotate,
              space = datum.space;
          var h = rotate ? "width" : "height",
              w = rotate ? "height" : "width";
          var wSize = d3Array.min([this._maxSize, this._width]);
          var hSize = d3Array.min([this._maxSize, this._height]);
          var wrap = d3plusText.textWrap().fontFamily(fF).fontSize(fS).lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined)[w](horizontal ? space : wSize - hBuff - p - this._margin.left - this._margin.right)[h](horizontal ? hSize - hBuff - p - this._margin.top - this._margin.bottom : space);
          var res = wrap(tickFormat(d));
          res.lines = res.lines.filter(function (d) {
            return d !== "";
          });
          res.width = res.lines.length ? Math.ceil(d3Array.max(res.widths)) + fS / 4 : 0;
          if (res.width % 2) res.width++;
          res.height = res.lines.length ? Math.ceil(res.lines.length * wrap.lineHeight()) + fS / 4 : 0;
          if (res.height % 2) res.height++;
          return res;
        }

        textData = textData.map(function (datum) {
          datum.rotate = _this3._labelRotation;
          datum.space = calculateSpace.bind(_this3)(datum);
          var res = calculateLabelSize.bind(_this3)(datum);
          return Object.assign(res, datum);
        });
        this._rotateLabels = horizontal && this._labelRotation === undefined ? textData.some(function (d) {
          return d.truncated;
        }) : this._labelRotation;

        if (this._rotateLabels) {
          textData = textData.map(function (datum) {
            datum.rotate = true;
            var res = calculateLabelSize.bind(_this3)(datum);
            return Object.assign(datum, res);
          });
        }
        /**
         * "spillover" will contain the pixel spillover of the first and last label,
         * and then adjust the scale range accordingly.
         */


        var spillover = [0, 0];

        for (var index = 0; index < 2; index++) {
          var datum = textData[index ? textData.length - 1 : 0];
          if (!datum) break;
          var _height = datum.height,
              position = datum.position,
              rotate = datum.rotate,
              _width = datum.width;
          var compPosition = index ? rangeOuter[1] : rangeOuter[0];
          var halfSpace = (rotate || !horizontal ? _height : _width) / 2;
          var spill = index ? position + halfSpace - compPosition : position - halfSpace - compPosition;
          spillover[index] = spill;
        }

        var first = range[0];
        var last = range[range.length - 1];
        var newRange = [first - spillover[0], last - spillover[1]];

        if (this._range) {
          if (this._range[0] !== undefined) newRange[0] = this._range[0];
          if (this._range[this._range.length - 1] !== undefined) newRange[1] = this._range[this._range.length - 1];
        }

        if (newRange[0] !== first || newRange[1] !== last) {
          setScale.bind(this)(newRange);
          textData = labels.map(function (d, i) {
            var fF = _this3._shapeConfig.labelConfig.fontFamily(d, i),
                fS = _this3._shapeConfig.labelConfig.fontSize(d, i),
                position = _this3._getPosition(d);

            var lineHeight = _this3._shapeConfig.lineHeight ? _this3._shapeConfig.lineHeight(d, i) : fS * 1.4;
            return {
              d: d,
              i: i,
              fF: fF,
              fS: fS,
              lineHeight: lineHeight,
              position: position
            };
          });
          textData = textData.map(function (datum) {
            datum.rotate = _this3._rotateLabels;
            datum.space = calculateSpace.bind(_this3)(datum);
            var res = calculateLabelSize.bind(_this3)(datum);
            return Object.assign(res, datum);
          });
        }

        var labelHeight = d3Array.max(textData, function (t) {
          return t.height;
        }) || 0;
        this._rotateLabels = horizontal && this._labelRotation === undefined ? textData.some(function (datum) {
          var i = datum.i,
              height = datum.height,
              position = datum.position,
              truncated = datum.truncated;
          var prev = textData[i - 1];
          return truncated || i && prev.position + prev.height / 2 > position - height / 2;
        }) : this._labelRotation;

        if (this._rotateLabels) {
          var offset = 0;
          textData = textData.map(function (datum) {
            datum.space = calculateSpace.bind(_this3)(datum, 2);
            var res = calculateLabelSize.bind(_this3)(datum);
            datum = Object.assign(datum, res);
            var prev = textData[datum.i - 1];

            if (!prev) {
              offset = 1;
            } else if (prev.position + prev.height / 2 > datum.position) {
              if (offset) {
                datum.offset = prev.width;
                offset = 0;
              } else offset = 1;
            }

            return datum;
          });
        }

        var globalOffset = this._labelOffset ? d3Array.max(textData, function (d) {
          return d.offset || 0;
        }) : 0;
        textData.forEach(function (datum) {
          return datum.offset = datum.offset ? globalOffset : 0;
        });
        var tBuff = this._shape === "Line" ? 0 : hBuff;
        var bounds = this._outerBounds = (_this$_outerBounds = {}, _defineProperty(_this$_outerBounds, height, (d3Array.max(textData, function (t) {
          return Math.ceil(t[t.rotate || !horizontal ? "width" : "height"] + t.offset);
        }) || 0) + (textData.length ? p : 0)), _defineProperty(_this$_outerBounds, width, rangeOuter[rangeOuter.length - 1] - rangeOuter[0]), _defineProperty(_this$_outerBounds, x, rangeOuter[0]), _this$_outerBounds);
        bounds[height] = d3Array.max([this._minSize, bounds[height]]);
        margin[this._orient] += hBuff;
        margin[opposite] = this._gridSize !== undefined ? d3Array.max([this._gridSize, tBuff]) : this["_".concat(height)] - margin[this._orient] - bounds[height] - p;
        bounds[height] += margin[opposite] + margin[this._orient];
        bounds[y] = this._align === "start" ? this._padding : this._align === "end" ? this["_".concat(height)] - bounds[height] - this._padding : this["_".concat(height)] / 2 - bounds[height] / 2;
        var group = d3plusCommon.elem("g#d3plus-Axis-".concat(this._uuid), {
          parent: parent
        });
        this._group = group;
        var grid = d3plusCommon.elem("g.grid", {
          parent: group
        }).selectAll("line").data((this._gridSize !== 0 ? this._grid || this._scale === "log" && !this._gridLog ? labels : ticks : []).map(function (d) {
          return {
            id: d
          };
        }), function (d) {
          return d.id;
        });
        grid.exit().transition(t).attr("opacity", 0).call(this._gridPosition.bind(this)).remove();
        grid.enter().append("line").attr("opacity", 0).attr("clip-path", "url(#".concat(clipId, ")")).call(this._gridPosition.bind(this), true).merge(grid).transition(t).attr("opacity", 1).call(this._gridPosition.bind(this));
        var labelOnly = labels.filter(function (d, i) {
          return textData[i].lines.length && !ticks.includes(d);
        });
        var rotated = textData.some(function (d) {
          return d.rotate;
        });
        var tickData = ticks.concat(labelOnly).map(function (d) {
          var _tickConfig;

          var data = textData.find(function (td) {
            return td.d === d;
          });

          var xPos = _this3._getPosition(d);

          var space = data ? data.space : 0;
          var lines = data ? data.lines.length : 1;
          var lineHeight = data ? data.lineHeight : 1;
          var labelOffset = data && _this3._labelOffset ? data.offset : 0;
          var labelWidth = horizontal ? space : bounds.width - margin[_this3._position.opposite] - hBuff - margin[_this3._orient] + p;
          var offset = margin[opposite],
              size = (hBuff + labelOffset) * (flip ? -1 : 1),
              yPos = flip ? bounds[y] + bounds[height] - offset : bounds[y] + offset;
          var tickConfig = (_tickConfig = {
            id: d,
            labelBounds: rotated && data ? {
              x: -data.width / 2 + data.fS / 4,
              y: _this3._orient === "bottom" ? size + p + (data.width - lineHeight * lines) / 2 : size - p * 2 - (data.width + lineHeight * lines) / 2,
              width: data.width,
              height: data.height
            } : {
              x: horizontal ? -space / 2 : _this3._orient === "left" ? -labelWidth - p + size : size + p,
              y: horizontal ? _this3._orient === "bottom" ? size + p : size - p - labelHeight : -space / 2,
              width: horizontal ? space : labelWidth,
              height: horizontal ? labelHeight : space
            },
            rotate: data ? data.rotate : false,
            size: labels.includes(d) ? size : 0,
            text: labels.includes(d) ? tickFormat(d) : false,
            tick: ticks.includes(d)
          }, _defineProperty(_tickConfig, x, xPos + (_this3._scale === "band" ? _this3._d3Scale.bandwidth() / 2 : 0)), _defineProperty(_tickConfig, y, yPos), _tickConfig);
          return tickConfig;
        });

        if (this._shape === "Line") {
          tickData = tickData.concat(tickData.map(function (d) {
            var dupe = Object.assign({}, d);
            dupe[y] += d.size;
            return dupe;
          }));
        }

        new shapes[this._shape]().data(tickData).duration(this._duration).labelConfig({
          ellipsis: function ellipsis(d) {
            return d && d.length ? "".concat(d, "...") : "";
          },
          rotate: function rotate(d) {
            return d.rotate ? -90 : 0;
          }
        }).select(d3plusCommon.elem("g.ticks", {
          parent: group
        }).node()).config(this._shapeConfig).render();
        var bar = group.selectAll("line.bar").data([null]);
        bar.enter().append("line").attr("class", "bar").attr("opacity", 0).call(this._barPosition.bind(this)).merge(bar).transition(t).attr("opacity", 1).call(this._barPosition.bind(this));

        this._titleClass.data(this._title ? [{
          text: this._title
        }] : []).duration(this._duration).height(margin[this._orient]).rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0).select(d3plusCommon.elem("g.d3plus-Axis-title", {
          parent: group
        }).node()).text(function (d) {
          return d.text;
        }).verticalAlign("middle").width(range[range.length - 1] - range[0]).x(horizontal ? range[0] : this._orient === "left" ? bounds.x + margin.left / 2 - (range[range.length - 1] - range[0]) / 2 : bounds.x + bounds.width - margin.right / 2 - (range[range.length - 1] - range[0]) / 2).y(horizontal ? this._orient === "bottom" ? bounds.y + bounds.height - margin.bottom : bounds.y : range[0] + (range[range.length - 1] - range[0]) / 2 - margin[this._orient] / 2).config(this._titleConfig).render();

        this._lastScale = this._getPosition.bind(this);
        if (callback) setTimeout(callback, this._duration + 100);
        return this;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance.
          @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
          @chainable
      */

    }, {
      key: "align",
      value: function align(_) {
        return arguments.length ? (this._align = _, this) : this._align;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the axis line style and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "barConfig",
      value: function barConfig(_) {
        return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance.
          @param {Array} [*value* = [0, 10]]
          @chainable
      */

    }, {
      key: "domain",
      value: function domain(_) {
        return arguments.length ? (this._domain = _, this) : this._domain;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance.
          @param {Number} [*value* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the grid values of the axis and returns the current class instance.
          @param {Array} [*value*]
          @chainable
      */

    }, {
      key: "grid",
      value: function grid(_) {
        return arguments.length ? (this._grid = _, this) : this._grid;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the grid config of the axis and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "gridConfig",
      value: function gridConfig(_) {
        return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the grid behavior of the axis when scale is logarithmic and returns the current class instance.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "gridLog",
      value: function gridLog(_) {
        return arguments.length ? (this._gridLog = _, this) : this._gridLog;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the grid size of the axis and returns the current class instance.
          @param {Number} [*value* = undefined]
          @chainable
      */

    }, {
      key: "gridSize",
      value: function gridSize(_) {
        return arguments.length ? (this._gridSize = _, this) : this._gridSize;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the overall height of the axis and returns the current class instance.
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = _, this) : this._height;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance.
          @param {Array} [*value*]
          @chainable
      */

    }, {
      key: "labels",
      value: function labels(_) {
        return arguments.length ? (this._labels = _, this) : this._labels;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets whether offsets will be used to position some labels further away from the axis in order to allow space for the text.
          @param {Boolean} [*value* = true]
          @chainable
       */

    }, {
      key: "labelOffset",
      value: function labelOffset(_) {
        return arguments.length ? (this._labelOffset = _, this) : this._labelOffset;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets whether whether horizontal axis labels are rotated -90 degrees.
          @param {Boolean}
          @chainable
       */

    }, {
      key: "labelRotation",
      value: function labelRotation(_) {
        return arguments.length ? (this._labelRotation = _, this) : this._labelRotation;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the maximum size allowed for the space that contains the axis tick labels and title.
          @param {Number}
          @chainable
       */

    }, {
      key: "maxSize",
      value: function maxSize(_) {
        return arguments.length ? (this._maxSize = _, this) : this._maxSize;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the minimum size alloted for the space that contains the axis tick labels and title.
          @param {Number}
          @chainable
       */

    }, {
      key: "minSize",
      value: function minSize(_) {
        return arguments.length ? (this._minSize = _, this) : this._minSize;
      }
      /**
          @memberof Axis
          @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
          @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
          @chainable
      */

    }, {
      key: "orient",
      value: function orient(_) {
        if (arguments.length) {
          var horizontal = ["top", "bottom"].includes(_),
              opps = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right"
          };
          this._position = {
            horizontal: horizontal,
            width: horizontal ? "width" : "height",
            height: horizontal ? "height" : "width",
            x: horizontal ? "x" : "y",
            y: horizontal ? "y" : "x",
            opposite: opps[_]
          };
          return this._orient = _, this;
        }

        return this._orient;
      }
      /**
          @memberof Axis
          @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.
          @example
      {"width": 180, "height": 24, "x": 10, "y": 20}
      */

    }, {
      key: "outerBounds",
      value: function outerBounds() {
        return this._outerBounds;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance.
          @param {Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "padding",
      value: function padding(_) {
        return arguments.length ? (this._padding = _, this) : this._padding;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance.
          @param {Number} [*value* = 0.1]
          @chainable
      */

    }, {
      key: "paddingInner",
      value: function paddingInner(_) {
        return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance.
          @param {Number} [*value* = 0.1]
          @chainable
      */

    }, {
      key: "paddingOuter",
      value: function paddingOuter(_) {
        return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value.
          @param {Array} [*value*]
          @chainable
      */

    }, {
      key: "range",
      value: function range(_) {
        return arguments.length ? (this._range = _, this) : this._range;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the scale of the axis and returns the current class instance.
          @param {String} [*value* = "linear"]
          @chainable
      */

    }, {
      key: "scale",
      value: function scale(_) {
        return arguments.length ? (this._scale = _, this) : this._scale;
      }
      /**
          @memberof Axis
          @desc Sets the "padding" property of the scale, often used in point scales.
          @param {Number} [*value* = 0.5]
          @chainable
      */

    }, {
      key: "scalePadding",
      value: function scalePadding(_) {
        return arguments.length ? (this._scalePadding = _, this) : this._scalePadding;
      }
      /**
          @memberof Axis
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
          @memberof Axis
          @desc If *value* is specified, sets the tick shape constructor and returns the current class instance.
          @param {String} [*value* = "Line"]
          @chainable
      */

    }, {
      key: "shape",
      value: function shape(_) {
        return arguments.length ? (this._shape = _, this) : this._shape;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the tick style of the axis and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "shapeConfig",
      value: function shapeConfig(_) {
        return arguments.length ? (this._shapeConfig = d3plusCommon.assign(this._shapeConfig, _), this) : this._shapeConfig;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the tick formatter and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "tickFormat",
      value: function tickFormat(_) {
        return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the tick values of the axis and returns the current class instance.
          @param {Array} [*value*]
          @chainable
      */

    }, {
      key: "ticks",
      value: function ticks(_) {
        return arguments.length ? (this._ticks = _, this) : this._ticks;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the tick size of the axis and returns the current class instance.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "tickSize",
      value: function tickSize(_) {
        return arguments.length ? (this._tickSize = _, this) : this._tickSize;
      }
      /**
          @memberof Axis
          @desc Sets the tick specifier for the [tickFormat](https://github.com/d3/d3-scale#continuous_tickFormat) function. If this method is called without any arguments, the default tick specifier is returned.
          @param {String} [*value* = undefined]
          @chainable
      */

    }, {
      key: "tickSpecifier",
      value: function tickSpecifier(_) {
        return arguments.length ? (this._tickSpecifier = _, this) : this._tickSpecifier;
      }
      /**
          @memberof Axis
          @desc Sets the behavior of the abbreviations when you are using linear scale. This method accepts two options: "normal" (uses formatAbbreviate to determinate the abbreviation) and "smallest" (uses suffix from the smallest tick as reference in every tick).
          @param {String} [*value* = "normal"]
          @chainable
      */

    }, {
      key: "tickSuffix",
      value: function tickSuffix(_) {
        return arguments.length ? (this._tickSuffix = _, this) : this._tickSuffix;
      }
      /**
          @memberof Axis
          @desc Defines a custom locale object to be used in time scale. This object must include the following properties: dateTime, date, time, periods, days, shortDays, months, shortMonths. For more information, you can revise [d3p.d3-time-format](https://github.com/d3/d3-time-format/blob/master/README.md#timeFormatLocale).
          @param {Object} [*value* = undefined]
          @chainable
      */

    }, {
      key: "timeLocale",
      value: function timeLocale(_) {
        return arguments.length ? (this._timeLocale = _, this) : this._timeLocale;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the title of the axis and returns the current class instance.
          @param {String} [*value*]
          @chainable
      */

    }, {
      key: "title",
      value: function title(_) {
        return arguments.length ? (this._title = _, this) : this._title;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "titleConfig",
      value: function titleConfig(_) {
        return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
      }
      /**
          @memberof Axis
          @desc If *value* is specified, sets the overall width of the axis and returns the current class instance.
          @param {Number} [*value* = 400]
          @chainable
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = _, this) : this._width;
      }
    }]);

    return Axis;
  }(d3plusCommon.BaseClass);

  /**
      @class AxisBottom
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn below the horizontal domain path. Extends all functionality of the base [Axis](#Axis) class.
  */

  var AxisBottom =
  /*#__PURE__*/
  function (_Axis) {
    _inherits(AxisBottom, _Axis);

    /**
        @memberof AxisBottom
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
        @private
    */
    function AxisBottom() {
      var _this;

      _classCallCheck(this, AxisBottom);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AxisBottom).call(this));

      _this.orient("bottom");

      return _this;
    }

    return AxisBottom;
  }(Axis);

  /**
      @class AxisLeft
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn to the left of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */

  var AxisLeft =
  /*#__PURE__*/
  function (_Axis) {
    _inherits(AxisLeft, _Axis);

    /**
        @memberof AxisLeft
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
        @private
    */
    function AxisLeft() {
      var _this;

      _classCallCheck(this, AxisLeft);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AxisLeft).call(this));

      _this.orient("left");

      return _this;
    }

    return AxisLeft;
  }(Axis);

  /**
      @class AxisRight
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn to the right of the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */

  var AxisRight =
  /*#__PURE__*/
  function (_Axis) {
    _inherits(AxisRight, _Axis);

    /**
        @memberof AxisRight
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
        @private
    */
    function AxisRight() {
      var _this;

      _classCallCheck(this, AxisRight);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AxisRight).call(this));

      _this.orient("right");

      return _this;
    }

    return AxisRight;
  }(Axis);

  /**
      @class AxisTop
      @extends Axis
      @desc Shorthand method for creating an axis where the ticks are drawn above the vertical domain path. Extends all functionality of the base [Axis](#Axis) class.
  */

  var AxisTop =
  /*#__PURE__*/
  function (_Axis) {
    _inherits(AxisTop, _Axis);

    /**
        @memberof AxisTop
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Axis.
        @private
    */
    function AxisTop() {
      var _this;

      _classCallCheck(this, AxisTop);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AxisTop).call(this));

      _this.orient("top");

      return _this;
    }

    return AxisTop;
  }(Axis);

  exports.Axis = Axis;
  exports.AxisBottom = AxisBottom;
  exports.AxisLeft = AxisLeft;
  exports.AxisRight = AxisRight;
  exports.AxisTop = AxisTop;
  exports.date = date;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-axis.js.map
