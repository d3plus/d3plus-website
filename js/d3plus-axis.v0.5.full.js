/*
  d3plus-axis v0.5.3
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('d3plus-axis', ['exports'], factory) :
  (global = global || self, factory(global.d3plus = {}));
}(this, function (exports) {
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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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

  function ascending (a, b) {
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
      return ascending(f(d), x);
    };
  }

  var ascendingBisect = bisector(ascending);
  var bisectRight = ascendingBisect.right;

  function number (x) {
    return x === null ? NaN : +x;
  }

  function extent (values, valueof) {
    var n = values.length,
        i = -1,
        value,
        min,
        max;

    if (valueof == null) {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = values[i]) != null && value >= value) {
          min = max = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = values[i]) != null) {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      }
    } else {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = valueof(values[i], i, values)) != null && value >= value) {
          min = max = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = valueof(values[i], i, values)) != null) {
              if (min > value) min = value;
              if (max < value) max = value;
            }
          }
        }
      }
    }

    return [min, max];
  }

  function d3Range (start, stop, step) {
    start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
    var i = -1,
        n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
        range = new Array(n);

    while (++i < n) {
      range[i] = start + i * step;
    }

    return range;
  }

  var e10 = Math.sqrt(50),
      e5 = Math.sqrt(10),
      e2 = Math.sqrt(2);
  function d3Ticks (start, stop, count) {
    var reverse,
        i = -1,
        n,
        ticks,
        step;
    stop = +stop, start = +start, count = +count;
    if (start === stop && count > 0) return [start];
    if (reverse = stop < start) n = start, start = stop, stop = n;
    if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

    if (step > 0) {
      start = Math.ceil(start / step);
      stop = Math.floor(stop / step);
      ticks = new Array(n = Math.ceil(stop - start + 1));

      while (++i < n) {
        ticks[i] = (start + i) * step;
      }
    } else {
      start = Math.floor(start * step);
      stop = Math.ceil(stop * step);
      ticks = new Array(n = Math.ceil(start - stop + 1));

      while (++i < n) {
        ticks[i] = (start - i) / step;
      }
    }

    if (reverse) ticks.reverse();
    return ticks;
  }
  function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count),
        power = Math.floor(Math.log(step) / Math.LN10),
        error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count),
        step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
        error = step0 / step1;
    if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
  }

  function quantile (values, p, valueof) {
    if (valueof == null) valueof = number;
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
    if (p >= 1) return +valueof(values[n - 1], n - 1, values);
    var n,
        i = (n - 1) * p,
        i0 = Math.floor(i),
        value0 = +valueof(values[i0], i0, values),
        value1 = +valueof(values[i0 + 1], i0 + 1, values);
    return value0 + (value1 - value0) * (i - i0);
  }

  function max (values, valueof) {
    var n = values.length,
        i = -1,
        value,
        max;

    if (valueof == null) {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = values[i]) != null && value >= value) {
          max = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = values[i]) != null && value > max) {
              max = value;
            }
          }
        }
      }
    } else {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = valueof(values[i], i, values)) != null && value >= value) {
          max = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = valueof(values[i], i, values)) != null && value > max) {
              max = value;
            }
          }
        }
      }
    }

    return max;
  }

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

  function min (values, valueof) {
    var n = values.length,
        i = -1,
        value,
        min;

    if (valueof == null) {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = values[i]) != null && value >= value) {
          min = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = values[i]) != null && min > value) {
              min = value;
            }
          }
        }
      }
    } else {
      while (++i < n) {
        // Find the first comparable value.
        if ((value = valueof(values[i], i, values)) != null && value >= value) {
          min = value;

          while (++i < n) {
            // Compare the remaining values.
            if ((value = valueof(values[i], i, values)) != null && min > value) {
              min = value;
            }
          }
        }
      }
    }

    return min;
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

  var t0 = new Date(),
      t1 = new Date();
  function newInterval(floori, offseti, count, field) {
    function interval(date) {
      return floori(date = new Date(+date)), date;
    }

    interval.floor = interval;

    interval.ceil = function (date) {
      return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };

    interval.round = function (date) {
      var d0 = interval(date),
          d1 = interval.ceil(date);
      return date - d0 < d1 - date ? d0 : d1;
    };

    interval.offset = function (date, step) {
      return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };

    interval.range = function (start, stop, step) {
      var range = [],
          previous;
      start = interval.ceil(start);
      step = step == null ? 1 : Math.floor(step);
      if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date

      do {
        range.push(previous = new Date(+start)), offseti(start, step), floori(start);
      } while (previous < start && start < stop);

      return range;
    };

    interval.filter = function (test) {
      return newInterval(function (date) {
        if (date >= date) while (floori(date), !test(date)) {
          date.setTime(date - 1);
        }
      }, function (date, step) {
        if (date >= date) {
          if (step < 0) while (++step <= 0) {
            while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty

          } else while (--step >= 0) {
            while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty

          }
        }
      });
    };

    if (count) {
      interval.count = function (start, end) {
        t0.setTime(+start), t1.setTime(+end);
        floori(t0), floori(t1);
        return Math.floor(count(t0, t1));
      };

      interval.every = function (step) {
        step = Math.floor(step);
        return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function (d) {
          return field(d) % step === 0;
        } : function (d) {
          return interval.count(0, d) % step === 0;
        });
      };
    }

    return interval;
  }

  var millisecond = newInterval(function () {// noop
  }, function (date, step) {
    date.setTime(+date + step);
  }, function (start, end) {
    return end - start;
  }); // An optimized implementation for this simple case.

  millisecond.every = function (k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return newInterval(function (date) {
      date.setTime(Math.floor(date / k) * k);
    }, function (date, step) {
      date.setTime(+date + step * k);
    }, function (start, end) {
      return (end - start) / k;
    });
  };

  var durationSecond = 1e3;
  var durationMinute = 6e4;
  var durationHour = 36e5;
  var durationDay = 864e5;
  var durationWeek = 6048e5;

  var second = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds());
  }, function (date, step) {
    date.setTime(+date + step * durationSecond);
  }, function (start, end) {
    return (end - start) / durationSecond;
  }, function (date) {
    return date.getUTCSeconds();
  });

  var minute = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
  }, function (date, step) {
    date.setTime(+date + step * durationMinute);
  }, function (start, end) {
    return (end - start) / durationMinute;
  }, function (date) {
    return date.getMinutes();
  });

  var hour = newInterval(function (date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
  }, function (date, step) {
    date.setTime(+date + step * durationHour);
  }, function (start, end) {
    return (end - start) / durationHour;
  }, function (date) {
    return date.getHours();
  });

  var day = newInterval(function (date) {
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setDate(date.getDate() + step);
  }, function (start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay;
  }, function (date) {
    return date.getDate() - 1;
  });

  function weekday(i) {
    return newInterval(function (date) {
      date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
      date.setHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setDate(date.getDate() + step * 7);
    }, function (start, end) {
      return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
    });
  }

  var sunday = weekday(0);
  var monday = weekday(1);
  var tuesday = weekday(2);
  var wednesday = weekday(3);
  var thursday = weekday(4);
  var friday = weekday(5);
  var saturday = weekday(6);

  var month = newInterval(function (date) {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setMonth(date.getMonth() + step);
  }, function (start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
  }, function (date) {
    return date.getMonth();
  });

  var year = newInterval(function (date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setFullYear(date.getFullYear() + step);
  }, function (start, end) {
    return end.getFullYear() - start.getFullYear();
  }, function (date) {
    return date.getFullYear();
  }); // An optimized implementation for this simple case.

  year.every = function (k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
      date.setFullYear(Math.floor(date.getFullYear() / k) * k);
      date.setMonth(0, 1);
      date.setHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setFullYear(date.getFullYear() + step * k);
    });
  };

  var utcMinute = newInterval(function (date) {
    date.setUTCSeconds(0, 0);
  }, function (date, step) {
    date.setTime(+date + step * durationMinute);
  }, function (start, end) {
    return (end - start) / durationMinute;
  }, function (date) {
    return date.getUTCMinutes();
  });

  var utcHour = newInterval(function (date) {
    date.setUTCMinutes(0, 0, 0);
  }, function (date, step) {
    date.setTime(+date + step * durationHour);
  }, function (start, end) {
    return (end - start) / durationHour;
  }, function (date) {
    return date.getUTCHours();
  });

  var utcDay = newInterval(function (date) {
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCDate(date.getUTCDate() + step);
  }, function (start, end) {
    return (end - start) / durationDay;
  }, function (date) {
    return date.getUTCDate() - 1;
  });

  function utcWeekday(i) {
    return newInterval(function (date) {
      date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
      date.setUTCHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setUTCDate(date.getUTCDate() + step * 7);
    }, function (start, end) {
      return (end - start) / durationWeek;
    });
  }

  var utcSunday = utcWeekday(0);
  var utcMonday = utcWeekday(1);
  var utcTuesday = utcWeekday(2);
  var utcWednesday = utcWeekday(3);
  var utcThursday = utcWeekday(4);
  var utcFriday = utcWeekday(5);
  var utcSaturday = utcWeekday(6);

  var utcMonth = newInterval(function (date) {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
  }, function (start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
  }, function (date) {
    return date.getUTCMonth();
  });

  var utcYear = newInterval(function (date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function (date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
  }, function (start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
  }, function (date) {
    return date.getUTCFullYear();
  }); // An optimized implementation for this simple case.

  utcYear.every = function (k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function (date) {
      date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
      date.setUTCMonth(0, 1);
      date.setUTCHours(0, 0, 0, 0);
    }, function (date, step) {
      date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
  };

  function localDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
      date.setFullYear(d.y);
      return date;
    }

    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
  }

  function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
      var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
      date.setUTCFullYear(d.y);
      return date;
    }

    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
  }

  function newYear(y) {
    return {
      y: y,
      m: 0,
      d: 1,
      H: 0,
      M: 0,
      S: 0,
      L: 0
    };
  }

  function formatLocale(locale) {
    var locale_dateTime = locale.dateTime,
        locale_date = locale.date,
        locale_time = locale.time,
        locale_periods = locale.periods,
        locale_weekdays = locale.days,
        locale_shortWeekdays = locale.shortDays,
        locale_months = locale.months,
        locale_shortMonths = locale.shortMonths;
    var periodRe = formatRe(locale_periods),
        periodLookup = formatLookup(locale_periods),
        weekdayRe = formatRe(locale_weekdays),
        weekdayLookup = formatLookup(locale_weekdays),
        shortWeekdayRe = formatRe(locale_shortWeekdays),
        shortWeekdayLookup = formatLookup(locale_shortWeekdays),
        monthRe = formatRe(locale_months),
        monthLookup = formatLookup(locale_months),
        shortMonthRe = formatRe(locale_shortMonths),
        shortMonthLookup = formatLookup(locale_shortMonths);
    var formats = {
      "a": formatShortWeekday,
      "A": formatWeekday,
      "b": formatShortMonth,
      "B": formatMonth,
      "c": null,
      "d": formatDayOfMonth,
      "e": formatDayOfMonth,
      "f": formatMicroseconds,
      "H": formatHour24,
      "I": formatHour12,
      "j": formatDayOfYear,
      "L": formatMilliseconds,
      "m": formatMonthNumber,
      "M": formatMinutes,
      "p": formatPeriod,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatSeconds,
      "u": formatWeekdayNumberMonday,
      "U": formatWeekNumberSunday,
      "V": formatWeekNumberISO,
      "w": formatWeekdayNumberSunday,
      "W": formatWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatYear,
      "Y": formatFullYear,
      "Z": formatZone,
      "%": formatLiteralPercent
    };
    var utcFormats = {
      "a": formatUTCShortWeekday,
      "A": formatUTCWeekday,
      "b": formatUTCShortMonth,
      "B": formatUTCMonth,
      "c": null,
      "d": formatUTCDayOfMonth,
      "e": formatUTCDayOfMonth,
      "f": formatUTCMicroseconds,
      "H": formatUTCHour24,
      "I": formatUTCHour12,
      "j": formatUTCDayOfYear,
      "L": formatUTCMilliseconds,
      "m": formatUTCMonthNumber,
      "M": formatUTCMinutes,
      "p": formatUTCPeriod,
      "Q": formatUnixTimestamp,
      "s": formatUnixTimestampSeconds,
      "S": formatUTCSeconds,
      "u": formatUTCWeekdayNumberMonday,
      "U": formatUTCWeekNumberSunday,
      "V": formatUTCWeekNumberISO,
      "w": formatUTCWeekdayNumberSunday,
      "W": formatUTCWeekNumberMonday,
      "x": null,
      "X": null,
      "y": formatUTCYear,
      "Y": formatUTCFullYear,
      "Z": formatUTCZone,
      "%": formatLiteralPercent
    };
    var parses = {
      "a": parseShortWeekday,
      "A": parseWeekday,
      "b": parseShortMonth,
      "B": parseMonth,
      "c": parseLocaleDateTime,
      "d": parseDayOfMonth,
      "e": parseDayOfMonth,
      "f": parseMicroseconds,
      "H": parseHour24,
      "I": parseHour24,
      "j": parseDayOfYear,
      "L": parseMilliseconds,
      "m": parseMonthNumber,
      "M": parseMinutes,
      "p": parsePeriod,
      "Q": parseUnixTimestamp,
      "s": parseUnixTimestampSeconds,
      "S": parseSeconds,
      "u": parseWeekdayNumberMonday,
      "U": parseWeekNumberSunday,
      "V": parseWeekNumberISO,
      "w": parseWeekdayNumberSunday,
      "W": parseWeekNumberMonday,
      "x": parseLocaleDate,
      "X": parseLocaleTime,
      "y": parseYear,
      "Y": parseFullYear,
      "Z": parseZone,
      "%": parseLiteralPercent
    }; // These recursive directive definitions must be deferred.

    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);

    function newFormat(specifier, formats) {
      return function (date) {
        var string = [],
            i = -1,
            j = 0,
            n = specifier.length,
            c,
            pad,
            format;
        if (!(date instanceof Date)) date = new Date(+date);

        while (++i < n) {
          if (specifier.charCodeAt(i) === 37) {
            string.push(specifier.slice(j, i));
            if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);else pad = c === "e" ? " " : "0";
            if (format = formats[c]) c = format(date, pad);
            string.push(c);
            j = i + 1;
          }
        }

        string.push(specifier.slice(j, i));
        return string.join("");
      };
    }

    function newParse(specifier, newDate) {
      return function (string) {
        var d = newYear(1900),
            i = parseSpecifier(d, specifier, string += "", 0),
            week,
            day$1;
        if (i != string.length) return null; // If a UNIX timestamp is specified, return it.

        if ("Q" in d) return new Date(d.Q); // The am-pm flag is 0 for AM, and 1 for PM.

        if ("p" in d) d.H = d.H % 12 + d.p * 12; // Convert day-of-week and week-of-year to day-of-year.

        if ("V" in d) {
          if (d.V < 1 || d.V > 53) return null;
          if (!("w" in d)) d.w = 1;

          if ("Z" in d) {
            week = utcDate(newYear(d.y)), day$1 = week.getUTCDay();
            week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
            week = utcDay.offset(week, (d.V - 1) * 7);
            d.y = week.getUTCFullYear();
            d.m = week.getUTCMonth();
            d.d = week.getUTCDate() + (d.w + 6) % 7;
          } else {
            week = newDate(newYear(d.y)), day$1 = week.getDay();
            week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
            week = day.offset(week, (d.V - 1) * 7);
            d.y = week.getFullYear();
            d.m = week.getMonth();
            d.d = week.getDate() + (d.w + 6) % 7;
          }
        } else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
          day$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
          d.m = 0;
          d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
        } // If a time zone is specified, all fields are interpreted as UTC and then
        // offset according to the specified time zone.


        if ("Z" in d) {
          d.H += d.Z / 100 | 0;
          d.M += d.Z % 100;
          return utcDate(d);
        } // Otherwise, all fields are in local time.


        return newDate(d);
      };
    }

    function parseSpecifier(d, specifier, string, j) {
      var i = 0,
          n = specifier.length,
          m = string.length,
          c,
          parse;

      while (i < n) {
        if (j >= m) return -1;
        c = specifier.charCodeAt(i++);

        if (c === 37) {
          c = specifier.charAt(i++);
          parse = parses[c in pads ? specifier.charAt(i++) : c];
          if (!parse || (j = parse(d, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }

      return j;
    }

    function parsePeriod(d, string, i) {
      var n = periodRe.exec(string.slice(i));
      return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortWeekday(d, string, i) {
      var n = shortWeekdayRe.exec(string.slice(i));
      return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseWeekday(d, string, i) {
      var n = weekdayRe.exec(string.slice(i));
      return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseShortMonth(d, string, i) {
      var n = shortMonthRe.exec(string.slice(i));
      return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseMonth(d, string, i) {
      var n = monthRe.exec(string.slice(i));
      return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }

    function parseLocaleDateTime(d, string, i) {
      return parseSpecifier(d, locale_dateTime, string, i);
    }

    function parseLocaleDate(d, string, i) {
      return parseSpecifier(d, locale_date, string, i);
    }

    function parseLocaleTime(d, string, i) {
      return parseSpecifier(d, locale_time, string, i);
    }

    function formatShortWeekday(d) {
      return locale_shortWeekdays[d.getDay()];
    }

    function formatWeekday(d) {
      return locale_weekdays[d.getDay()];
    }

    function formatShortMonth(d) {
      return locale_shortMonths[d.getMonth()];
    }

    function formatMonth(d) {
      return locale_months[d.getMonth()];
    }

    function formatPeriod(d) {
      return locale_periods[+(d.getHours() >= 12)];
    }

    function formatUTCShortWeekday(d) {
      return locale_shortWeekdays[d.getUTCDay()];
    }

    function formatUTCWeekday(d) {
      return locale_weekdays[d.getUTCDay()];
    }

    function formatUTCShortMonth(d) {
      return locale_shortMonths[d.getUTCMonth()];
    }

    function formatUTCMonth(d) {
      return locale_months[d.getUTCMonth()];
    }

    function formatUTCPeriod(d) {
      return locale_periods[+(d.getUTCHours() >= 12)];
    }

    return {
      format: function format(specifier) {
        var f = newFormat(specifier += "", formats);

        f.toString = function () {
          return specifier;
        };

        return f;
      },
      parse: function parse(specifier) {
        var p = newParse(specifier += "", localDate);

        p.toString = function () {
          return specifier;
        };

        return p;
      },
      utcFormat: function utcFormat(specifier) {
        var f = newFormat(specifier += "", utcFormats);

        f.toString = function () {
          return specifier;
        };

        return f;
      },
      utcParse: function utcParse(specifier) {
        var p = newParse(specifier, utcDate);

        p.toString = function () {
          return specifier;
        };

        return p;
      }
    };
  }
  var pads = {
    "-": "",
    "_": " ",
    "0": "0"
  },
      numberRe = /^\s*\d+/,
      // note: ignores next directive
  percentRe = /^%/,
      requoteRe = /[\\^$*+?|[\]().{}]/g;

  function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "",
        string = (sign ? -value : value) + "",
        length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }

  function requote(s) {
    return s.replace(requoteRe, "\\$&");
  }

  function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
  }

  function formatLookup(names) {
    var map = {},
        i = -1,
        n = names.length;

    while (++i < n) {
      map[names[i].toLowerCase()] = i;
    }

    return map;
  }

  function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
  }

  function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
  }

  function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
  }

  function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
  }

  function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
  }

  function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
  }

  function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
  }

  function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
  }

  function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
  }

  function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
  }

  function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
  }

  function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
  }

  function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
  }

  function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
  }

  function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }

  function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
  }

  function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0] * 1000, i + n[0].length) : -1;
  }

  function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
  }

  function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
  }

  function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
  }

  function formatDayOfYear(d, p) {
    return pad(1 + day.count(year(d), d), p, 3);
  }

  function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
  }

  function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
  }

  function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
  }

  function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
  }

  function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
  }

  function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
  }

  function formatWeekNumberSunday(d, p) {
    return pad(sunday.count(year(d), d), p, 2);
  }

  function formatWeekNumberISO(d, p) {
    var day = d.getDay();
    d = day >= 4 || day === 0 ? thursday(d) : thursday.ceil(d);
    return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
  }

  function formatWeekdayNumberSunday(d) {
    return d.getDay();
  }

  function formatWeekNumberMonday(d, p) {
    return pad(monday.count(year(d), d), p, 2);
  }

  function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
  }

  function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
  }

  function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
  }

  function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
  }

  function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
  }

  function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
  }

  function formatUTCDayOfYear(d, p) {
    return pad(1 + utcDay.count(utcYear(d), d), p, 3);
  }

  function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
  }

  function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
  }

  function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
  }

  function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
  }

  function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
  }

  function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
  }

  function formatUTCWeekNumberSunday(d, p) {
    return pad(utcSunday.count(utcYear(d), d), p, 2);
  }

  function formatUTCWeekNumberISO(d, p) {
    var day = d.getUTCDay();
    d = day >= 4 || day === 0 ? utcThursday(d) : utcThursday.ceil(d);
    return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
  }

  function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
  }

  function formatUTCWeekNumberMonday(d, p) {
    return pad(utcMonday.count(utcYear(d), d), p, 2);
  }

  function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
  }

  function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
  }

  function formatUTCZone() {
    return "+0000";
  }

  function formatLiteralPercent() {
    return "%";
  }

  function formatUnixTimestamp(d) {
    return +d;
  }

  function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
  }

  var locale;
  var timeFormat;
  var timeParse;
  var utcFormat;
  var utcParse;
  defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  function defaultLocale(definition) {
    locale = formatLocale(definition);
    timeFormat = locale.format;
    timeParse = locale.parse;
    utcFormat = locale.utcFormat;
    utcParse = locale.utcParse;
    return locale;
  }

  var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

  function formatIsoNative(date) {
    return date.toISOString();
  }

  var formatIso = Date.prototype.toISOString ? formatIsoNative : utcFormat(isoSpecifier);

  function parseIsoNative(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  }

  var parseIso = +new Date("2000-01-01T00:00:00.000Z") ? parseIsoNative : utcParse(isoSpecifier);

  function initRange(domain, range) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.range(domain);
        break;

      default:
        this.range(range).domain(domain);
        break;
    }

    return this;
  }
  function initInterpolator(domain, interpolator) {
    switch (arguments.length) {
      case 0:
        break;

      case 1:
        this.interpolator(domain);
        break;

      default:
        this.interpolator(interpolator).domain(domain);
        break;
    }

    return this;
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

  function nest () {
    var keys = [],
        _sortKeys = [],
        _sortValues,
        _rollup,
        nest;

    function apply(array, depth, createResult, setResult) {
      if (depth >= keys.length) {
        if (_sortValues != null) array.sort(_sortValues);
        return _rollup != null ? _rollup(array) : array;
      }

      var i = -1,
          n = array.length,
          key = keys[depth++],
          keyValue,
          value,
          valuesByKey = map(),
          values,
          result = createResult();

      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
          values.push(value);
        } else {
          valuesByKey.set(keyValue, [value]);
        }
      }

      valuesByKey.each(function (values, key) {
        setResult(result, key, apply(values, depth, createResult, setResult));
      });
      return result;
    }

    function _entries(map, depth) {
      if (++depth > keys.length) return map;
      var array,
          sortKey = _sortKeys[depth - 1];
      if (_rollup != null && depth >= keys.length) array = map.entries();else array = [], map.each(function (v, k) {
        array.push({
          key: k,
          values: _entries(v, depth)
        });
      });
      return sortKey != null ? array.sort(function (a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }

    return nest = {
      object: function object(array) {
        return apply(array, 0, createObject, setObject);
      },
      map: function map(array) {
        return apply(array, 0, createMap, setMap);
      },
      entries: function entries(array) {
        return _entries(apply(array, 0, createMap, setMap), 0);
      },
      key: function key(d) {
        keys.push(d);
        return nest;
      },
      sortKeys: function sortKeys(order) {
        _sortKeys[keys.length - 1] = order;
        return nest;
      },
      sortValues: function sortValues(order) {
        _sortValues = order;
        return nest;
      },
      rollup: function rollup(f) {
        _rollup = f;
        return nest;
      }
    };
  }

  function createObject() {
    return {};
  }

  function setObject(object, key, value) {
    object[key] = value;
  }

  function createMap() {
    return map();
  }

  function setMap(map, key, value) {
    map.set(key, value);
  }

  function Set() {}

  var proto = map.prototype;
  Set.prototype = set.prototype = {
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

  function set(object, f) {
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

  var array = Array.prototype;
  var map$1 = array.map;
  var slice = array.slice;

  var implicit = {
    name: "implicit"
  };
  function ordinal() {
    var index = map(),
        domain = [],
        range = [],
        unknown = implicit;

    function scale(d) {
      var key = d + "",
          i = index.get(key);

      if (!i) {
        if (unknown !== implicit) return unknown;
        index.set(key, i = domain.push(d));
      }

      return range[(i - 1) % range.length];
    }

    scale.domain = function (_) {
      if (!arguments.length) return domain.slice();
      domain = [], index = map();
      var i = -1,
          n = _.length,
          d,
          key;

      while (++i < n) {
        if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
      }

      return scale;
    };

    scale.range = function (_) {
      return arguments.length ? (range = slice.call(_), scale) : range.slice();
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function () {
      return ordinal(domain, range).unknown(unknown);
    };

    initRange.apply(scale, arguments);
    return scale;
  }

  function band() {
    var scale = ordinal().unknown(undefined),
        domain = scale.domain,
        ordinalRange = scale.range,
        range = [0, 1],
        step,
        bandwidth,
        round = false,
        paddingInner = 0,
        paddingOuter = 0,
        align = 0.5;
    delete scale.unknown;

    function rescale() {
      var n = domain().length,
          reverse = range[1] < range[0],
          start = range[reverse - 0],
          stop = range[1 - reverse];
      step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
      if (round) step = Math.floor(step);
      start += (stop - start - step * (n - paddingInner)) * align;
      bandwidth = step * (1 - paddingInner);
      if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
      var values = d3Range(n).map(function (i) {
        return start + step * i;
      });
      return ordinalRange(reverse ? values.reverse() : values);
    }

    scale.domain = function (_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.range = function (_) {
      return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return range = [+_[0], +_[1]], round = true, rescale();
    };

    scale.bandwidth = function () {
      return bandwidth;
    };

    scale.step = function () {
      return step;
    };

    scale.round = function (_) {
      return arguments.length ? (round = !!_, rescale()) : round;
    };

    scale.padding = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };

    scale.paddingInner = function (_) {
      return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };

    scale.paddingOuter = function (_) {
      return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };

    scale.align = function (_) {
      return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };

    scale.copy = function () {
      return band(domain(), range).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
    };

    return initRange.apply(rescale(), arguments);
  }

  function pointish(scale) {
    var copy = scale.copy;
    scale.padding = scale.paddingOuter;
    delete scale.paddingInner;
    delete scale.paddingOuter;

    scale.copy = function () {
      return pointish(copy());
    };

    return scale;
  }

  function point() {
    return pointish(band.apply(null, arguments).paddingInner(1));
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
      t0$1 = 4 / 29,
      t1$1 = 6 / 29,
      t2 = 3 * t1$1 * t1$1,
      t3 = t1$1 * t1$1 * t1$1;

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
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0$1;
  }

  function lab2xyz(t) {
    return t > t1$1 ? t * t * t : t2 * (t - t0$1);
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

  function constant (x) {
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
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }
  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
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

  function array$1 (a, b) {
    var nb = b ? b.length : 0,
        na = a ? Math.min(nb, a.length) : 0,
        x = new Array(na),
        c = new Array(nb),
        i;

    for (i = 0; i < na; ++i) {
      x[i] = interpolateValue(a[i], b[i]);
    }

    for (; i < nb; ++i) {
      c[i] = b[i];
    }

    return function (t) {
      for (i = 0; i < na; ++i) {
        c[i] = x[i](t);
      }

      return c;
    };
  }

  function date (a, b) {
    var d = new Date();
    return a = +a, b -= a, function (t) {
      return d.setTime(a + b * t), d;
    };
  }

  function interpolateNumber (a, b) {
    return a = +a, b -= a, function (t) {
      return a + b * t;
    };
  }

  function object (a, b) {
    var i = {},
        c = {},
        k;
    if (a === null || _typeof(a) !== "object") a = {};
    if (b === null || _typeof(b) !== "object") b = {};

    for (k in b) {
      if (k in a) {
        i[k] = interpolateValue(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function (t) {
      for (k in i) {
        c[k] = i[k](t);
      }

      return c;
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

  function interpolateValue (a, b) {
    var t = _typeof(b),
        c;

    return b == null || t === "boolean" ? constant(b) : (t === "number" ? interpolateNumber : t === "string" ? (c = color(b)) ? (b = c, interpolateRgb) : interpolateString : b instanceof color ? interpolateRgb : b instanceof Date ? date : Array.isArray(b) ? array$1 : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object : interpolateNumber)(a, b);
  }

  function interpolateRound (a, b) {
    return a = +a, b -= a, function (t) {
      return Math.round(a + b * t);
    };
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

  function constant$1 (x) {
    return function () {
      return x;
    };
  }

  function number$1 (x) {
    return +x;
  }

  var unit = [0, 1];
  function identity$1(x) {
    return x;
  }

  function normalize(a, b) {
    return (b -= a = +a) ? function (x) {
      return (x - a) / b;
    } : constant$1(isNaN(b) ? NaN : 0.5);
  }

  function clamper(domain) {
    var a = domain[0],
        b = domain[domain.length - 1],
        t;
    if (a > b) t = a, a = b, b = t;
    return function (x) {
      return Math.max(a, Math.min(b, x));
    };
  } // normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
  // interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].


  function bimap(domain, range, interpolate) {
    var d0 = domain[0],
        d1 = domain[1],
        r0 = range[0],
        r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function (x) {
      return r0(d0(x));
    };
  }

  function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1,
        d = new Array(j),
        r = new Array(j),
        i = -1; // Reverse descending domains.

    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range[i], range[i + 1]);
    }

    return function (x) {
      var i = bisectRight(domain, x, 1, j) - 1;
      return r[i](d[i](x));
    };
  }

  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit,
        range = unit,
        interpolate = interpolateValue,
        transform,
        untransform,
        unknown,
        clamp = identity$1,
        piecewise,
        output,
        input;

    function rescale() {
      piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
      output = input = null;
      return scale;
    }

    function scale(x) {
      return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }

    scale.invert = function (y) {
      return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
    };

    scale.domain = function (_) {
      return arguments.length ? (domain = map$1.call(_, number$1), clamp === identity$1 || (clamp = clamper(domain)), rescale()) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
    };

    scale.rangeRound = function (_) {
      return range = slice.call(_), interpolate = interpolateRound, rescale();
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = _ ? clamper(domain) : identity$1, scale) : clamp !== identity$1;
    };

    scale.interpolate = function (_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t, u) {
      transform = t, untransform = u;
      return rescale();
    };
  }
  function continuous(transform, untransform) {
    return transformer()(transform, untransform);
  }

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal (x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

    var i,
        coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent (x) {
    return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup (grouping, thousands) {
    return function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    return new FormatSpecifier(specifier);
  }
  formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

  function FormatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    this.fill = match[1] || " ";
    this.align = match[2] || ">";
    this.sign = match[3] || "-";
    this.symbol = match[4] || "";
    this.zero = !!match[5];
    this.width = match[6] && +match[6];
    this.comma = !!match[7];
    this.precision = match[8] && +match[8].slice(1);
    this.trim = !!match[9];
    this.type = match[10] || "";
  }

  FormatSpecifier.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width == null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim (s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;

        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;

        default:
          if (i0 > 0) {
            if (!+s[i]) break out;
            i0 = 0;
          }

          break;
      }
    }

    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent;
  function formatPrefixAuto (x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded (x, p) {
    var d = formatDecimal(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes = {
    "%": function _(x, p) {
      return (x * 100).toFixed(p);
    },
    "b": function b(x) {
      return Math.round(x).toString(2);
    },
    "c": function c(x) {
      return x + "";
    },
    "d": function d(x) {
      return Math.round(x).toString(10);
    },
    "e": function e(x, p) {
      return x.toExponential(p);
    },
    "f": function f(x, p) {
      return x.toFixed(p);
    },
    "g": function g(x, p) {
      return x.toPrecision(p);
    },
    "o": function o(x) {
      return Math.round(x).toString(8);
    },
    "p": function p(x, _p) {
      return formatRounded(x * 100, _p);
    },
    "r": formatRounded,
    "s": formatPrefixAuto,
    "X": function X(x) {
      return Math.round(x).toString(16).toUpperCase();
    },
    "x": function x(_x) {
      return Math.round(_x).toString(16);
    }
  };

  function identity$2 (x) {
    return x;
  }

  var prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale$1 (locale) {
    var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$2,
        currency = locale.currency,
        decimal = locale.decimal,
        numerals = locale.numerals ? formatNumerals(locale.numerals) : identity$2,
        percent = locale.percent || "%";

    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type; // The "n" type is an alias for ",g".

      if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes[type]) precision == null && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

      if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.

      var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : ""; // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?

      var formatType = formatTypes[type],
          maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].

      precision = precision == null ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i,
            n,
            c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value; // Perform the initial formatting.

          var valueNegative = value < 0;
          value = formatType(Math.abs(value), precision); // Trim insignificant zeros.

          if (trim) value = formatTrim(value); // If a negative value rounds to zero during formatting, treat as positive.

          if (valueNegative && +value === 0) valueNegative = false; // Compute the prefix and suffix.

          valuePrefix = (valueNegative ? sign === "(" ? sign : "-" : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.

          if (maybeSuffix) {
            i = -1, n = value.length;

            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        } // If the fill character is not "0", grouping is applied before padding.


        if (comma && !zero) value = group(value, Infinity); // Compute the padding.

        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;

          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;

          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;

          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  var locale$1;
  var format;
  var formatPrefix;
  defaultLocale$1({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale$1(definition) {
    locale$1 = formatLocale$1(definition);
    format = locale$1.format;
    formatPrefix = locale$1.formatPrefix;
    return locale$1;
  }

  function precisionFixed (step) {
    return Math.max(0, -exponent(Math.abs(step)));
  }

  function precisionPrefix (step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
  }

  function precisionRound (step, max) {
    step = Math.abs(step), max = Math.abs(max) - step;
    return Math.max(0, exponent(max) - exponent(step)) + 1;
  }

  function tickFormat (start, stop, count, specifier) {
    var step = tickStep(start, stop, count),
        precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);

    switch (specifier.type) {
      case "s":
        {
          var value = Math.max(Math.abs(start), Math.abs(stop));
          if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
          return formatPrefix(specifier, value);
        }

      case "":
      case "e":
      case "g":
      case "p":
      case "r":
        {
          if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
          break;
        }

      case "f":
      case "%":
        {
          if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
          break;
        }
    }

    return format(specifier);
  }

  function linearish(scale) {
    var domain = scale.domain;

    scale.ticks = function (count) {
      var d = domain();
      return d3Ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };

    scale.tickFormat = function (count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };

    scale.nice = function (count) {
      if (count == null) count = 10;
      var d = domain(),
          i0 = 0,
          i1 = d.length - 1,
          start = d[i0],
          stop = d[i1],
          step;

      if (stop < start) {
        step = start, start = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }

      step = tickIncrement(start, stop, count);

      if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
        step = tickIncrement(start, stop, count);
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
        step = tickIncrement(start, stop, count);
      }

      if (step > 0) {
        d[i0] = Math.floor(start / step) * step;
        d[i1] = Math.ceil(stop / step) * step;
        domain(d);
      } else if (step < 0) {
        d[i0] = Math.ceil(start * step) / step;
        d[i1] = Math.floor(stop * step) / step;
        domain(d);
      }

      return scale;
    };

    return scale;
  }
  function linear$1() {
    var scale = continuous(identity$1, identity$1);

    scale.copy = function () {
      return copy(scale, linear$1());
    };

    initRange.apply(scale, arguments);
    return linearish(scale);
  }

  function identity$3(domain) {
    var unknown;

    function scale(x) {
      return isNaN(x = +x) ? unknown : x;
    }

    scale.invert = scale;

    scale.domain = scale.range = function (_) {
      return arguments.length ? (domain = map$1.call(_, number$1), scale) : domain.slice();
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function () {
      return identity$3(domain).unknown(unknown);
    };

    domain = arguments.length ? map$1.call(domain, number$1) : [0, 1];
    return linearish(scale);
  }

  function nice (domain, interval) {
    domain = domain.slice();
    var i0 = 0,
        i1 = domain.length - 1,
        x0 = domain[i0],
        x1 = domain[i1],
        t;

    if (x1 < x0) {
      t = i0, i0 = i1, i1 = t;
      t = x0, x0 = x1, x1 = t;
    }

    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
  }

  function transformLog(x) {
    return Math.log(x);
  }

  function transformExp(x) {
    return Math.exp(x);
  }

  function transformLogn(x) {
    return -Math.log(-x);
  }

  function transformExpn(x) {
    return -Math.exp(-x);
  }

  function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
  }

  function powp(base) {
    return base === 10 ? pow10 : base === Math.E ? Math.exp : function (x) {
      return Math.pow(base, x);
    };
  }

  function logp(base) {
    return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function (x) {
      return Math.log(x) / base;
    });
  }

  function reflect(f) {
    return function (x) {
      return -f(-x);
    };
  }

  function loggish(transform) {
    var scale = transform(transformLog, transformExp),
        domain = scale.domain,
        base = 10,
        logs,
        pows;

    function rescale() {
      logs = logp(base), pows = powp(base);

      if (domain()[0] < 0) {
        logs = reflect(logs), pows = reflect(pows);
        transform(transformLogn, transformExpn);
      } else {
        transform(transformLog, transformExp);
      }

      return scale;
    }

    scale.base = function (_) {
      return arguments.length ? (base = +_, rescale()) : base;
    };

    scale.domain = function (_) {
      return arguments.length ? (domain(_), rescale()) : domain();
    };

    scale.ticks = function (count) {
      var d = domain(),
          u = d[0],
          v = d[d.length - 1],
          r;
      if (r = v < u) i = u, u = v, v = i;
      var i = logs(u),
          j = logs(v),
          p,
          k,
          t,
          n = count == null ? 10 : +count,
          z = [];

      if (!(base % 1) && j - i < n) {
        i = Math.round(i) - 1, j = Math.round(j) + 1;
        if (u > 0) for (; i < j; ++i) {
          for (k = 1, p = pows(i); k < base; ++k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        } else for (; i < j; ++i) {
          for (k = base - 1, p = pows(i); k >= 1; --k) {
            t = p * k;
            if (t < u) continue;
            if (t > v) break;
            z.push(t);
          }
        }
      } else {
        z = d3Ticks(i, j, Math.min(j - i, n)).map(pows);
      }

      return r ? z.reverse() : z;
    };

    scale.tickFormat = function (count, specifier) {
      if (specifier == null) specifier = base === 10 ? ".0e" : ",";
      if (typeof specifier !== "function") specifier = format(specifier);
      if (count === Infinity) return specifier;
      if (count == null) count = 10;
      var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?

      return function (d) {
        var i = d / pows(Math.round(logs(d)));
        if (i * base < base - 0.5) i *= base;
        return i <= k ? specifier(d) : "";
      };
    };

    scale.nice = function () {
      return domain(nice(domain(), {
        floor: function floor(x) {
          return pows(Math.floor(logs(x)));
        },
        ceil: function ceil(x) {
          return pows(Math.ceil(logs(x)));
        }
      }));
    };

    return scale;
  }
  function log() {
    var scale = loggish(transformer()).domain([1, 10]);

    scale.copy = function () {
      return copy(scale, log()).base(scale.base());
    };

    initRange.apply(scale, arguments);
    return scale;
  }

  function transformSymlog(c) {
    return function (x) {
      return Math.sign(x) * Math.log1p(Math.abs(x / c));
    };
  }

  function transformSymexp(c) {
    return function (x) {
      return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
    };
  }

  function symlogish(transform) {
    var c = 1,
        scale = transform(transformSymlog(c), transformSymexp(c));

    scale.constant = function (_) {
      return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
    };

    return linearish(scale);
  }
  function symlog() {
    var scale = symlogish(transformer());

    scale.copy = function () {
      return copy(scale, symlog()).constant(scale.constant());
    };

    return initRange.apply(scale, arguments);
  }

  function transformPow(exponent) {
    return function (x) {
      return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
    };
  }

  function transformSqrt(x) {
    return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
  }

  function transformSquare(x) {
    return x < 0 ? -x * x : x * x;
  }

  function powish(transform) {
    var scale = transform(identity$1, identity$1),
        exponent = 1;

    function rescale() {
      return exponent === 1 ? transform(identity$1, identity$1) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
    }

    scale.exponent = function (_) {
      return arguments.length ? (exponent = +_, rescale()) : exponent;
    };

    return linearish(scale);
  }
  function pow() {
    var scale = powish(transformer());

    scale.copy = function () {
      return copy(scale, pow()).exponent(scale.exponent());
    };

    initRange.apply(scale, arguments);
    return scale;
  }
  function sqrt() {
    return pow.apply(null, arguments).exponent(0.5);
  }

  function quantile$1() {
    var domain = [],
        range = [],
        thresholds = [],
        unknown;

    function rescale() {
      var i = 0,
          n = Math.max(1, range.length);
      thresholds = new Array(n - 1);

      while (++i < n) {
        thresholds[i - 1] = quantile(domain, i / n);
      }

      return scale;
    }

    function scale(x) {
      return isNaN(x = +x) ? unknown : range[bisectRight(thresholds, x)];
    }

    scale.invertExtent = function (y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN] : [i > 0 ? thresholds[i - 1] : domain[0], i < thresholds.length ? thresholds[i] : domain[domain.length - 1]];
    };

    scale.domain = function (_) {
      if (!arguments.length) return domain.slice();
      domain = [];

      for (var i = 0, n = _.length, d; i < n; ++i) {
        if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
      }

      domain.sort(ascending);
      return rescale();
    };

    scale.range = function (_) {
      return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.quantiles = function () {
      return thresholds.slice();
    };

    scale.copy = function () {
      return quantile$1().domain(domain).range(range).unknown(unknown);
    };

    return initRange.apply(scale, arguments);
  }

  function quantize() {
    var x0 = 0,
        x1 = 1,
        n = 1,
        domain = [0.5],
        range = [0, 1],
        unknown;

    function scale(x) {
      return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
    }

    function rescale() {
      var i = -1;
      domain = new Array(n);

      while (++i < n) {
        domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
      }

      return scale;
    }

    scale.domain = function (_) {
      return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
    };

    scale.range = function (_) {
      return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
    };

    scale.invertExtent = function (y) {
      var i = range.indexOf(y);
      return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n ? [domain[n - 1], x1] : [domain[i - 1], domain[i]];
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : scale;
    };

    scale.thresholds = function () {
      return domain.slice();
    };

    scale.copy = function () {
      return quantize().domain([x0, x1]).range(range).unknown(unknown);
    };

    return initRange.apply(linearish(scale), arguments);
  }

  function threshold() {
    var domain = [0.5],
        range = [0, 1],
        unknown,
        n = 1;

    function scale(x) {
      return x <= x ? range[bisectRight(domain, x, 0, n)] : unknown;
    }

    scale.domain = function (_) {
      return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
    };

    scale.range = function (_) {
      return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
    };

    scale.invertExtent = function (y) {
      var i = range.indexOf(y);
      return [domain[i - 1], domain[i]];
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    scale.copy = function () {
      return threshold().domain(domain).range(range).unknown(unknown);
    };

    return initRange.apply(scale, arguments);
  }

  var durationSecond$1 = 1000,
      durationMinute$1 = durationSecond$1 * 60,
      durationHour$1 = durationMinute$1 * 60,
      durationDay$1 = durationHour$1 * 24,
      durationWeek$1 = durationDay$1 * 7,
      durationMonth = durationDay$1 * 30,
      durationYear = durationDay$1 * 365;

  function date$1(t) {
    return new Date(t);
  }

  function number$2(t) {
    return t instanceof Date ? +t : +new Date(+t);
  }

  function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
    var scale = continuous(identity$1, identity$1),
        invert = scale.invert,
        domain = scale.domain;
    var formatMillisecond = format(".%L"),
        formatSecond = format(":%S"),
        formatMinute = format("%I:%M"),
        formatHour = format("%I %p"),
        formatDay = format("%a %d"),
        formatWeek = format("%b %d"),
        formatMonth = format("%B"),
        formatYear = format("%Y");
    var tickIntervals = [[second, 1, durationSecond$1], [second, 5, 5 * durationSecond$1], [second, 15, 15 * durationSecond$1], [second, 30, 30 * durationSecond$1], [minute, 1, durationMinute$1], [minute, 5, 5 * durationMinute$1], [minute, 15, 15 * durationMinute$1], [minute, 30, 30 * durationMinute$1], [hour, 1, durationHour$1], [hour, 3, 3 * durationHour$1], [hour, 6, 6 * durationHour$1], [hour, 12, 12 * durationHour$1], [day, 1, durationDay$1], [day, 2, 2 * durationDay$1], [week, 1, durationWeek$1], [month, 1, durationMonth], [month, 3, 3 * durationMonth], [year, 1, durationYear]];

    function tickFormat(date) {
      return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
    }

    function tickInterval(interval, start, stop, step) {
      if (interval == null) interval = 10; // If a desired tick count is specified, pick a reasonable tick interval
      // based on the extent of the domain and a rough estimate of tick size.
      // Otherwise, assume interval is already a time interval and use it.

      if (typeof interval === "number") {
        var target = Math.abs(stop - start) / interval,
            i = bisector(function (i) {
          return i[2];
        }).right(tickIntervals, target);

        if (i === tickIntervals.length) {
          step = tickStep(start / durationYear, stop / durationYear, interval);
          interval = year;
        } else if (i) {
          i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
          step = i[1];
          interval = i[0];
        } else {
          step = Math.max(tickStep(start, stop, interval), 1);
          interval = millisecond;
        }
      }

      return step == null ? interval : interval.every(step);
    }

    scale.invert = function (y) {
      return new Date(invert(y));
    };

    scale.domain = function (_) {
      return arguments.length ? domain(map$1.call(_, number$2)) : domain().map(date$1);
    };

    scale.ticks = function (interval, step) {
      var d = domain(),
          t0 = d[0],
          t1 = d[d.length - 1],
          r = t1 < t0,
          t;
      if (r) t = t0, t0 = t1, t1 = t;
      t = tickInterval(interval, t0, t1, step);
      t = t ? t.range(t0, t1 + 1) : []; // inclusive stop

      return r ? t.reverse() : t;
    };

    scale.tickFormat = function (count, specifier) {
      return specifier == null ? tickFormat : format(specifier);
    };

    scale.nice = function (interval, step) {
      var d = domain();
      return (interval = tickInterval(interval, d[0], d[d.length - 1], step)) ? domain(nice(d, interval)) : scale;
    };

    scale.copy = function () {
      return copy(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
    };

    return scale;
  }
  function time () {
    return initRange.apply(calendar(year, month, sunday, day, hour, minute, second, millisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
  }

  function utcTime () {
    return initRange.apply(calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
  }

  function transformer$1() {
    var x0 = 0,
        x1 = 1,
        t0,
        t1,
        k10,
        transform,
        interpolator = identity$1,
        clamp = false,
        unknown;

    function scale(x) {
      return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
    }

    scale.domain = function (_) {
      return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = !!_, scale) : clamp;
    };

    scale.interpolator = function (_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t) {
      transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
      return scale;
    };
  }

  function copy$1(source, target) {
    return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
  }
  function sequential() {
    var scale = linearish(transformer$1()(identity$1));

    scale.copy = function () {
      return copy$1(scale, sequential());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function sequentialLog() {
    var scale = loggish(transformer$1()).domain([1, 10]);

    scale.copy = function () {
      return copy$1(scale, sequentialLog()).base(scale.base());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function sequentialSymlog() {
    var scale = symlogish(transformer$1());

    scale.copy = function () {
      return copy$1(scale, sequentialSymlog()).constant(scale.constant());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function sequentialPow() {
    var scale = powish(transformer$1());

    scale.copy = function () {
      return copy$1(scale, sequentialPow()).exponent(scale.exponent());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function sequentialSqrt() {
    return sequentialPow.apply(null, arguments).exponent(0.5);
  }

  function sequentialQuantile() {
    var domain = [],
        interpolator = identity$1;

    function scale(x) {
      if (!isNaN(x = +x)) return interpolator((bisectRight(domain, x) - 1) / (domain.length - 1));
    }

    scale.domain = function (_) {
      if (!arguments.length) return domain.slice();
      domain = [];

      for (var i = 0, n = _.length, d; i < n; ++i) {
        if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
      }

      domain.sort(ascending);
      return scale;
    };

    scale.interpolator = function (_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };

    scale.copy = function () {
      return sequentialQuantile(interpolator).domain(domain);
    };

    return initInterpolator.apply(scale, arguments);
  }

  function transformer$2() {
    var x0 = 0,
        x1 = 0.5,
        x2 = 1,
        t0,
        t1,
        t2,
        k10,
        k21,
        interpolator = identity$1,
        transform,
        clamp = false,
        unknown;

    function scale(x) {
      return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
    }

    scale.domain = function (_) {
      return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), t2 = transform(x2 = +_[2]), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
    };

    scale.clamp = function (_) {
      return arguments.length ? (clamp = !!_, scale) : clamp;
    };

    scale.interpolator = function (_) {
      return arguments.length ? (interpolator = _, scale) : interpolator;
    };

    scale.unknown = function (_) {
      return arguments.length ? (unknown = _, scale) : unknown;
    };

    return function (t) {
      transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
      return scale;
    };
  }

  function diverging() {
    var scale = linearish(transformer$2()(identity$1));

    scale.copy = function () {
      return copy$1(scale, diverging());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function divergingLog() {
    var scale = loggish(transformer$2()).domain([0.1, 1, 10]);

    scale.copy = function () {
      return copy$1(scale, divergingLog()).base(scale.base());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function divergingSymlog() {
    var scale = symlogish(transformer$2());

    scale.copy = function () {
      return copy$1(scale, divergingSymlog()).constant(scale.constant());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function divergingPow() {
    var scale = powish(transformer$2());

    scale.copy = function () {
      return copy$1(scale, divergingPow()).exponent(scale.exponent());
    };

    return initInterpolator.apply(scale, arguments);
  }
  function divergingSqrt() {
    return divergingPow.apply(null, arguments).exponent(0.5);
  }



  var scales = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scaleBand: band,
    scalePoint: point,
    scaleIdentity: identity$3,
    scaleLinear: linear$1,
    scaleLog: log,
    scaleSymlog: symlog,
    scaleOrdinal: ordinal,
    scaleImplicit: implicit,
    scalePow: pow,
    scaleSqrt: sqrt,
    scaleQuantile: quantile$1,
    scaleQuantize: quantize,
    scaleThreshold: threshold,
    scaleTime: time,
    scaleUtc: utcTime,
    scaleSequential: sequential,
    scaleSequentialLog: sequentialLog,
    scaleSequentialPow: sequentialPow,
    scaleSequentialSqrt: sequentialSqrt,
    scaleSequentialSymlog: sequentialSymlog,
    scaleSequentialQuantile: sequentialQuantile,
    scaleDiverging: diverging,
    scaleDivergingLog: divergingLog,
    scaleDivergingPow: divergingPow,
    scaleDivergingSqrt: divergingSqrt,
    scaleDivergingSymlog: divergingSymlog,
    tickFormat: tickFormat
  });

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

  function constant$2 (x) {
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
    if (typeof value !== "function") value = constant$2(value);

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
    if (!compare) compare = ascending$1;

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

  function ascending$1(a, b) {
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
  var event = null;

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
      var event0 = event; // Events can be reentrant (e.g., focus).

      event = event1;

      try {
        listener.call(this, this.__data__, index, group);
      } finally {
        event = event0;
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

  function _select (selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  function sourceEvent () {
    var current = event,
        source;

    while (source = current.sourceEvent) {
      current = source;
    }

    return current;
  }

  function point$1 (node, event) {
    var svg = node.ownerSVGElement || node;

    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }

    var rect = node.getBoundingClientRect();
    return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
  }

  function mouse (node) {
    var event = sourceEvent();
    if (event.changedTouches) event = event.changedTouches[0];
    return point$1(node, event);
  }

  function selectAll (selector) {
    return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([selector == null ? [] : selector], root);
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
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);else if (callback == null) for (t in _) {
          _[t] = set$1(_[t], typename.name, null);
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

  function set$1(type, name, callback) {
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
  function set$2(node, id) {
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

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function () {
      var schedule = set$2(this, id),
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
      var schedule = set$2(this, id),
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
      var schedule = set$2(this, id);
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
      set$2(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function () {
      set$2(this, id).duration = value;
    };
  }

  function transition_duration (value) {
    var id = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : get$1(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error();
    return function () {
      set$2(this, id).ease = value;
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
        sit = start(name) ? init : set$2;
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
      var schedule = set$2(this, id),
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
        var schedule = set$2(this, id),
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

  var id = 0;
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
    return ++id;
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

  function _typeof$1(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$1 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$1 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$1(obj);
  }
  /**
      @function isObject
      @desc Detects if a variable is a javascript Object.
      @param {*} item
  */


  function isObject (item) {
    return item && _typeof$1(item) === "object" && (typeof window === "undefined" || item !== window && item !== window.document && !(item instanceof Element)) && !Array.isArray(item) ? true : false;
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
  var id$1 = {
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
  	id: id$1,
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

  function _defineProperty$1(obj, key, value) {
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
  var locales = [];
  var isoKeys = Object.keys(iso);
  Object.keys(lcid).map(function (id) {
    var locale = lcid[id];
    var isoLanguage = isoKeys.find(function (name) {
      return name.toLowerCase() === locale.language.toLowerCase();
    });

    if (locale.location && isoLanguage) {
      var _locales$push;

      locales.push((_locales$push = {}, _defineProperty$1(_locales$push, "name", locale.language), _defineProperty$1(_locales$push, "location", locale.location), _defineProperty$1(_locales$push, "tag", locale.tag), _defineProperty$1(_locales$push, "lcid", locale.id), _defineProperty$1(_locales$push, "iso639-2", iso[isoLanguage]["iso639-2"]), _defineProperty$1(_locales$push, "iso639-1", iso[isoLanguage]["iso639-1"]), _locales$push));
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

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }
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

      _classCallCheck$1(this, BaseClass);

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


    _createClass$1(BaseClass, [{
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

  function _typeof$2(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$2 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$2 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$2(obj);
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
        if (d instanceof Array) return arrayEval(d);else if (_typeof$2(d) === "object") return keyEval({}, d);else if (typeof d === "function") return wrapFunction(d);else return d;
      });
    };

    var keyEval = function keyEval(newObj, obj) {
      for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
          if (key === "on") parseEvents(newObj, obj[key]);else if (typeof obj[key] === "function") {
            newObj[key] = wrapFunction(obj[key]);
          } else if (obj[key] instanceof Array) {
            newObj[key] = arrayEval(obj[key]);
          } else if (_typeof$2(obj[key]) === "object") {
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
  function constant$3 (value) {
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
      parent: _select("body"),
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

  // Computes the decimal coefficient and exponent of the specified number x with
  // significant digits p, where x is positive and p is in [1, 21] or undefined.
  // For example, formatDecimal(1.23) returns ["123", 0].
  function formatDecimal$1 (x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity

    var i,
        coefficient = x.slice(0, i); // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).

    return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
  }

  function exponent$1 (x) {
    return x = formatDecimal$1(Math.abs(x)), x ? x[1] : NaN;
  }

  function formatGroup$1 (grouping, thousands) {
    return function (value, width) {
      var i = value.length,
          t = [],
          j = 0,
          g = grouping[0],
          length = 0;

      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = grouping[j = (j + 1) % grouping.length];
      }

      return t.reverse().join(thousands);
    };
  }

  function formatNumerals$1 (numerals) {
    return function (value) {
      return value.replace(/[0-9]/g, function (i) {
        return numerals[+i];
      });
    };
  }

  // [[fill]align][sign][symbol][0][width][,][.precision][~][type]
  var re$1 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier$1(specifier) {
    if (!(match = re$1.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier$1({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier$1.prototype = FormatSpecifier$1.prototype; // instanceof

  function FormatSpecifier$1(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
  }

  FormatSpecifier$1.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
  function formatTrim$1 (s) {
    out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
      switch (s[i]) {
        case ".":
          i0 = i1 = i;
          break;

        case "0":
          if (i0 === 0) i0 = i;
          i1 = i;
          break;

        default:
          if (!+s[i]) break out;
          if (i0 > 0) i0 = 0;
          break;
      }
    }

    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  var prefixExponent$1;
  function formatPrefixAuto$1 (x, p) {
    var d = formatDecimal$1(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1],
        i = exponent - (prefixExponent$1 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
        n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimal$1(x, Math.max(0, p + i - 1))[0]; // less than 1y!
  }

  function formatRounded$1 (x, p) {
    var d = formatDecimal$1(x, p);
    if (!d) return x + "";
    var coefficient = d[0],
        exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  var formatTypes$1 = {
    "%": function _(x, p) {
      return (x * 100).toFixed(p);
    },
    "b": function b(x) {
      return Math.round(x).toString(2);
    },
    "c": function c(x) {
      return x + "";
    },
    "d": function d(x) {
      return Math.round(x).toString(10);
    },
    "e": function e(x, p) {
      return x.toExponential(p);
    },
    "f": function f(x, p) {
      return x.toFixed(p);
    },
    "g": function g(x, p) {
      return x.toPrecision(p);
    },
    "o": function o(x) {
      return Math.round(x).toString(8);
    },
    "p": function p(x, _p) {
      return formatRounded$1(x * 100, _p);
    },
    "r": formatRounded$1,
    "s": formatPrefixAuto$1,
    "X": function X(x) {
      return Math.round(x).toString(16).toUpperCase();
    },
    "x": function x(_x) {
      return Math.round(_x).toString(16);
    }
  };

  function identity$4 (x) {
    return x;
  }

  var map$2 = Array.prototype.map,
      prefixes$1 = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function formatLocale$2 (locale) {
    var group = locale.grouping === undefined || locale.thousands === undefined ? identity$4 : formatGroup$1(map$2.call(locale.grouping, Number), locale.thousands + ""),
        currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
        currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
        decimal = locale.decimal === undefined ? "." : locale.decimal + "",
        numerals = locale.numerals === undefined ? identity$4 : formatNumerals$1(map$2.call(locale.numerals, String)),
        percent = locale.percent === undefined ? "%" : locale.percent + "",
        minus = locale.minus === undefined ? "-" : locale.minus + "",
        nan = locale.nan === undefined ? "NaN" : locale.nan + "";

    function newFormat(specifier) {
      specifier = formatSpecifier$1(specifier);
      var fill = specifier.fill,
          align = specifier.align,
          sign = specifier.sign,
          symbol = specifier.symbol,
          zero = specifier.zero,
          width = specifier.width,
          comma = specifier.comma,
          precision = specifier.precision,
          trim = specifier.trim,
          type = specifier.type; // The "n" type is an alias for ",g".

      if (type === "n") comma = true, type = "g"; // The "" type, and any invalid type, is an alias for ".12~g".
      else if (!formatTypes$1[type]) precision === undefined && (precision = 12), trim = true, type = "g"; // If zero fill is specified, padding goes after sign and before digits.

      if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "="; // Compute the prefix and suffix.
      // For SI-prefix, the suffix is lazily computed.

      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
          suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : ""; // What format function should we use?
      // Is this an integer type?
      // Can this type generate exponential notation?

      var formatType = formatTypes$1[type],
          maybeSuffix = /[defgprs%]/.test(type); // Set the default precision if not specified,
      // or clamp the specified precision to the supported range.
      // For significant precision, it must be in [1, 21].
      // For fixed precision, it must be in [0, 20].

      precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));

      function format(value) {
        var valuePrefix = prefix,
            valueSuffix = suffix,
            i,
            n,
            c;

        if (type === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value; // Determine the sign. -0 is not less than 0, but 1 / -0 is!

          var valueNegative = value < 0 || 1 / value < 0; // Perform the initial formatting.

          value = isNaN(value) ? nan : formatType(Math.abs(value), precision); // Trim insignificant zeros.

          if (trim) value = formatTrim$1(value); // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.

          if (valueNegative && +value === 0 && sign !== "+") valueNegative = false; // Compute the prefix and suffix.

          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type === "s" ? prefixes$1[8 + prefixExponent$1 / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : ""); // Break the formatted value into the integer “value” part that can be
          // grouped, and fractional or exponential “suffix” part that is not.

          if (maybeSuffix) {
            i = -1, n = value.length;

            while (++i < n) {
              if (c = value.charCodeAt(i), 48 > c || c > 57) {
                valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        } // If the fill character is not "0", grouping is applied before padding.


        if (comma && !zero) value = group(value, Infinity); // Compute the padding.

        var length = valuePrefix.length + value.length + valueSuffix.length,
            padding = length < width ? new Array(width - length + 1).join(fill) : ""; // If the fill character is "0", grouping is applied after padding.

        if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; // Reconstruct the final output based on the desired alignment.

        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;

          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;

          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;

          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }

        return numerals(value);
      }

      format.toString = function () {
        return specifier + "";
      };

      return format;
    }

    function formatPrefix(specifier, value) {
      var f = newFormat((specifier = formatSpecifier$1(specifier), specifier.type = "f", specifier)),
          e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
          k = Math.pow(10, -e),
          prefix = prefixes$1[8 + e / 3];
      return function (value) {
        return f(k * value) + prefix;
      };
    }

    return {
      format: newFormat,
      formatPrefix: formatPrefix
    };
  }

  /**
      @namespace {Object} formatLocale
      @desc A set of default locale formatters used when assigning suffixes and currency in numbers.
        *
        * | Name | Default | Description |
        * |---|---|---|
        * | separator | "" | Separation between the number with the suffix. |
        * | suffixes | [] | List of suffixes used to format numbers. |
        * | grouping | [3] | The array of group sizes, |
        * | delimiters | {thousands: ",", decimal: "."} | Decimal and group separators. |
        * | currency | ["$", ""] | The currency prefix and suffix. |
  */
  var formatLocale$3 = {
    "en-GB": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      currency: ["£", ""]
    },
    "en-US": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      currency: ["$", ""]
    },
    "es-CL": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "MM", "B", "T", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      currency: ["$", ""]
    },
    "es-MX": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "MM", "B", "T", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ",",
        decimal: "."
      },
      currency: ["$", ""]
    },
    "es-ES": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "mm", "b", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      currency: ["€", ""]
    },
    "et-EE": {
      separator: " ",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "tuhat", "miljonit", "miljardit", "triljonit", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: " ",
        decimal: ","
      },
      currency: ["", "eurot"]
    },
    "fr-FR": {
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "m", "b", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: " ",
        decimal: ","
      },
      currency: ["€", ""]
    }
  };

  function _typeof$3(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$3 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$3 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$3(obj);
  }

  var round = function round(x, n) {
    return parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
  };
  /**
   * @private
  */


  function formatSuffix(value, precision, suffixes) {
    var i = 0;

    if (value) {
      if (value < 0) value *= -1;
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
    }

    var d = suffixes[8 + i / 3];
    return {
      number: round(d.scale(value), precision),
      symbol: d.symbol
    };
  }
  /**
   * @private
  */


  function parseSuffixes(d, i) {
    var k = Math.pow(10, Math.abs(8 - i) * 3);
    return {
      scale: i > 8 ? function (d) {
        return d / k;
      } : function (d) {
        return d * k;
      },
      symbol: d
    };
  }
  /**
      @function formatAbbreviate
      @desc Formats a number to an appropriate number of decimal places and rounding, adding suffixes if applicable (ie. `1200000` to `"1.2M"`).
      @param {Number|String} n The number to be formatted.
      @param {Object|String} locale The locale config to be used. If *value* is an object, the function will format the numbers according the object. The object must include `suffixes`, `delimiter` and `currency` properties.
      @returns {String}
  */


  function formatAbbreviate (n) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en-US";
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    if (isFinite(n)) n *= 1;else return "N/A";
    var negative = n < 0;
    var length = n.toString().split(".")[0].replace("-", "").length,
        localeConfig = _typeof$3(locale) === "object" ? locale : formatLocale$3[locale] || formatLocale$3["en-US"],
        suffixes = localeConfig.suffixes.map(parseSuffixes);
    var decimal = localeConfig.delimiters.decimal || ".",
        separator = localeConfig.separator || "",
        thousands = localeConfig.delimiters.thousands || ",";
    var d3plusFormatLocale = formatLocale$2({
      currency: localeConfig.currency || ["$", ""],
      decimal: decimal,
      grouping: localeConfig.grouping || [3],
      thousands: thousands
    });
    var val;
    if (precision) val = d3plusFormatLocale.format(precision)(n);else if (n === 0) val = "0";else if (length >= 3) {
      var f = formatSuffix(d3plusFormatLocale.format(".3r")(n), 2, suffixes);
      var num = parseFloat(f.number).toString().replace(".", decimal);
      var _char = f.symbol;
      val = "".concat(num).concat(separator).concat(_char);
    } else if (length === 3) val = d3plusFormatLocale.format(",f")(n);else if (n < 1 && n > -1) val = d3plusFormatLocale.format(".2g")(n);else val = d3plusFormatLocale.format(".3g")(n);
    return "".concat(negative && val.charAt(0) !== "-" ? "-" : "").concat(val).replace(/(\.[0]*[1-9]*)[0]*$/g, "$1") // removes any trailing zeros
    .replace(/\.[0]*$/g, ""); // removes any trailing decimal point
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$2(Constructor, staticProps);
    return Constructor;
  }
  /**
      @class Image
      @desc Creates SVG images based on an array of data.
      @example <caption>a sample row of data</caption>
  var data = {"url": "file.png", "width": "100", "height": "50"};
  @example <caption>passed to the generator</caption>
  new Image().data([data]).render();
  @example <caption>creates the following</caption>
  <image class="d3plus-Image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
  @example <caption>this is shorthand for the following</caption>
  image().data([data])();
  @example <caption>which also allows a post-draw callback function</caption>
  image().data([data])(function() { alert("draw complete!"); })
  */

  var Image =
  /*#__PURE__*/
  function () {
    /**
        @memberof Image
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Image() {
      _classCallCheck$2(this, Image);

      this._duration = 600;
      this._height = accessor("height");
      this._id = accessor("id");
      this._opacity = constant$3(1);
      this._pointerEvents = constant$3("auto");
      this._select;
      this._url = accessor("url");
      this._width = accessor("width");
      this._x = accessor("x", 0);
      this._y = accessor("y", 0);
    }
    /**
        @memberof Image
        @desc Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass$2(Image, [{
      key: "render",
      value: function render(callback) {
        var _this = this;

        if (this._select === void 0) this.select(_select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());

        var images = this._select.selectAll(".d3plus-Image").data(this._data, this._id);

        var enter = images.enter().append("image").attr("class", "d3plus-Image").attr("opacity", 0).attr("width", 0).attr("height", 0).attr("x", function (d, i) {
          return _this._x(d, i) + _this._width(d, i) / 2;
        }).attr("y", function (d, i) {
          return _this._y(d, i) + _this._height(d, i) / 2;
        });
        var t = transition().duration(this._duration),
            that = this,
            update = enter.merge(images);
        update.attr("xlink:href", this._url).style("pointer-events", this._pointerEvents).transition(t).attr("opacity", this._opacity).attr("width", function (d, i) {
          return _this._width(d, i);
        }).attr("height", function (d, i) {
          return _this._height(d, i);
        }).attr("x", function (d, i) {
          return _this._x(d, i);
        }).attr("y", function (d, i) {
          return _this._y(d, i);
        }).each(function (d, i) {
          var image = _select(this),
              link = that._url(d, i);

          var fullAddress = link.indexOf("http://") === 0 || link.indexOf("https://") === 0;

          if (!fullAddress || link.indexOf(window.location.hostname) === 0) {
            var img = new Image();
            img.src = link;
            img.crossOrigin = "Anonymous";

            img.onload = function () {
              var canvas = document.createElement("canvas");
              canvas.width = this.width;
              canvas.height = this.height;
              var context = canvas.getContext("2d");
              context.drawImage(this, 0, 0);
              image.attr("xlink:href", canvas.toDataURL("image/png"));
            };
          }
        });
        images.exit().transition(t).attr("width", function (d, i) {
          return _this._width(d, i);
        }).attr("height", function (d, i) {
          return _this._height(d, i);
        }).attr("x", function (d, i) {
          return _this._x(d, i);
        }).attr("y", function (d, i) {
          return _this._y(d, i);
        }).attr("opacity", 0).remove();
        if (callback) setTimeout(callback, this._duration + 100);
        return this;
      }
      /**
          @memberof Image
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Image
          @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
          @param {Number} [*ms* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.height;
      }
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$3(_), this) : this._height;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
          @example
      function(d) {
      return d.id;
      }
      */

    }, {
      key: "id",
      value: function id(_) {
        return arguments.length ? (this._id = _, this) : this._id;
      }
      /**
          @memberof Image
          @desc Sets the opacity of the image.
          @param {Number} [*value* = 1]
          @chainable
      */

    }, {
      key: "opacity",
      value: function opacity(_) {
        return arguments.length ? (this._opacity = typeof _ === "function" ? _ : constant$3(_), this) : this._opacity;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = "auto"]
          @chainable
      */

    }, {
      key: "pointerEvents",
      value: function pointerEvents(_) {
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$3(_), this) : this._pointerEvents;
      }
      /**
          @memberof Image
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = _select(_), this) : this._select;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the URL accessor to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
          @example
      function(d) {
      return d.url;
      }
      */

    }, {
      key: "url",
      value: function url(_) {
        return arguments.length ? (this._url = _, this) : this._url;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.width;
      }
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$3(_), this) : this._width;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.x || 0;
      }
      */

    }, {
      key: "x",
      value: function x(_) {
        return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$3(_), this) : this._x;
      }
      /**
          @memberof Image
          @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.y || 0;
      }
      */

    }, {
      key: "y",
      value: function y(_) {
        return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$3(_), this) : this._y;
      }
    }]);

    return Image;
  }();

  function define$1 (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend$1(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) {
      prototype[key] = definition[key];
    }

    return prototype;
  }

  function Color$1() {}
  var _darker$1 = 0.7;

  var _brighter$1 = 1 / _darker$1;
  var reI$1 = "\\s*([+-]?\\d+)\\s*",
      reN$1 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP$1 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger$1 = new RegExp("^rgb\\(" + [reI$1, reI$1, reI$1] + "\\)$"),
      reRgbPercent$1 = new RegExp("^rgb\\(" + [reP$1, reP$1, reP$1] + "\\)$"),
      reRgbaInteger$1 = new RegExp("^rgba\\(" + [reI$1, reI$1, reI$1, reN$1] + "\\)$"),
      reRgbaPercent$1 = new RegExp("^rgba\\(" + [reP$1, reP$1, reP$1, reN$1] + "\\)$"),
      reHslPercent$1 = new RegExp("^hsl\\(" + [reN$1, reP$1, reP$1] + "\\)$"),
      reHslaPercent$1 = new RegExp("^hsla\\(" + [reN$1, reP$1, reP$1, reN$1] + "\\)$");
  var named$1 = {
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
  define$1(Color$1, color$1, {
    copy: function copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert$1(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color$1(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn$1(m) // #ff0000
    : l === 3 ? new Rgb$1(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? new Rgb$1(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? new Rgb$1(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger$1.exec(format)) ? new Rgb$1(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent$1.exec(format)) ? new Rgb$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger$1.exec(format)) ? rgba$1(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent$1.exec(format)) ? rgba$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named$1.hasOwnProperty(format) ? rgbn$1(named$1[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb$1(NaN, NaN, NaN, 0) : null;
  }

  function rgbn$1(n) {
    return new Rgb$1(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba$1(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb$1(r, g, b, a);
  }

  function rgbConvert$1(o) {
    if (!(o instanceof Color$1)) o = color$1(o);
    if (!o) return new Rgb$1();
    o = o.rgb();
    return new Rgb$1(o.r, o.g, o.b, o.opacity);
  }
  function rgb$1(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert$1(r) : new Rgb$1(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb$1(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define$1(Rgb$1, rgb$1, extend$1(Color$1, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$1 : Math.pow(_brighter$1, k);
      return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$1 : Math.pow(_darker$1, k);
      return new Rgb$1(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla$1(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl$1(h, s, l, a);
  }

  function hslConvert$1(o) {
    if (o instanceof Hsl$1) return new Hsl$1(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color$1)) o = color$1(o);
    if (!o) return new Hsl$1();
    if (o instanceof Hsl$1) return o;
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

    return new Hsl$1(h, s, l, o.opacity);
  }
  function hsl$1(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert$1(h) : new Hsl$1(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl$1(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define$1(Hsl$1, hsl$1, extend$1(Color$1, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$1 : Math.pow(_brighter$1, k);
      return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$1 : Math.pow(_darker$1, k);
      return new Hsl$1(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb$1(hsl2rgb$1(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb$1(h, m1, m2), hsl2rgb$1(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function formatHsl() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb$1(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  function define$2 (constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend$2(parent, definition) {
    var prototype = Object.create(parent.prototype);

    for (var key in definition) {
      prototype[key] = definition[key];
    }

    return prototype;
  }

  function Color$2() {}
  var _darker$2 = 0.7;

  var _brighter$2 = 1 / _darker$2;
  var reI$2 = "\\s*([+-]?\\d+)\\s*",
      reN$2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP$2 = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex$1 = /^#([0-9a-f]{3,8})$/,
      reRgbInteger$2 = new RegExp("^rgb\\(" + [reI$2, reI$2, reI$2] + "\\)$"),
      reRgbPercent$2 = new RegExp("^rgb\\(" + [reP$2, reP$2, reP$2] + "\\)$"),
      reRgbaInteger$2 = new RegExp("^rgba\\(" + [reI$2, reI$2, reI$2, reN$2] + "\\)$"),
      reRgbaPercent$2 = new RegExp("^rgba\\(" + [reP$2, reP$2, reP$2, reN$2] + "\\)$"),
      reHslPercent$2 = new RegExp("^hsl\\(" + [reN$2, reP$2, reP$2] + "\\)$"),
      reHslaPercent$2 = new RegExp("^hsla\\(" + [reN$2, reP$2, reP$2, reN$2] + "\\)$");
  var named$2 = {
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
  define$2(Color$2, color$2, {
    copy: function copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable: function displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex$1,
    // Deprecated! Use color.formatHex.
    formatHex: color_formatHex$1,
    formatHsl: color_formatHsl$1,
    formatRgb: color_formatRgb$1,
    toString: color_formatRgb$1
  });

  function color_formatHex$1() {
    return this.rgb().formatHex();
  }

  function color_formatHsl$1() {
    return hslConvert$2(this).formatHsl();
  }

  function color_formatRgb$1() {
    return this.rgb().formatRgb();
  }

  function color$2(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex$1.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn$2(m) // #ff0000
    : l === 3 ? new Rgb$2(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    : l === 8 ? new Rgb$2(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
    : l === 4 ? new Rgb$2(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
    : null // invalid hex
    ) : (m = reRgbInteger$2.exec(format)) ? new Rgb$2(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent$2.exec(format)) ? new Rgb$2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger$2.exec(format)) ? rgba$2(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent$2.exec(format)) ? rgba$2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent$2.exec(format)) ? hsla$2(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent$2.exec(format)) ? hsla$2(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named$2.hasOwnProperty(format) ? rgbn$2(named$2[format]) // eslint-disable-line no-prototype-builtins
    : format === "transparent" ? new Rgb$2(NaN, NaN, NaN, 0) : null;
  }

  function rgbn$2(n) {
    return new Rgb$2(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba$2(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb$2(r, g, b, a);
  }

  function rgbConvert$2(o) {
    if (!(o instanceof Color$2)) o = color$2(o);
    if (!o) return new Rgb$2();
    o = o.rgb();
    return new Rgb$2(o.r, o.g, o.b, o.opacity);
  }
  function rgb$2(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert$2(r) : new Rgb$2(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb$2(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define$2(Rgb$2, rgb$2, extend$2(Color$2, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$2 : Math.pow(_brighter$2, k);
      return new Rgb$2(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$2 : Math.pow(_darker$2, k);
      return new Rgb$2(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function rgb() {
      return this;
    },
    displayable: function displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex$1,
    // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex$1,
    formatRgb: rgb_formatRgb$1,
    toString: rgb_formatRgb$1
  }));

  function rgb_formatHex$1() {
    return "#" + hex$1(this.r) + hex$1(this.g) + hex$1(this.b);
  }

  function rgb_formatRgb$1() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex$1(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla$2(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;else if (l <= 0 || l >= 1) h = s = NaN;else if (s <= 0) h = NaN;
    return new Hsl$2(h, s, l, a);
  }

  function hslConvert$2(o) {
    if (o instanceof Hsl$2) return new Hsl$2(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color$2)) o = color$2(o);
    if (!o) return new Hsl$2();
    if (o instanceof Hsl$2) return o;
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

    return new Hsl$2(h, s, l, o.opacity);
  }
  function hsl$2(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert$2(h) : new Hsl$2(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl$2(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define$2(Hsl$2, hsl$2, extend$2(Color$2, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$2 : Math.pow(_brighter$2, k);
      return new Hsl$2(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$2 : Math.pow(_darker$2, k);
      return new Hsl$2(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb$2(hsl2rgb$2(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb$2(h, m1, m2), hsl2rgb$2(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function formatHsl() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb$2(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  /**
      @namespace {Object} colorDefaults
      @desc A set of default color values used when assigning colors based on data.
        *
        * | Name | Default | Description |
        * |---|---|---|
        * | dark | #444444 | Used in the [contrast](#contrast) function when the color given is very light. |
        * | light | #f7f7f7 | Used in the [contrast](#contrast) function when the color given is very dark. |
        * | missing | #cccccc | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
        * | off | #b22200 | Used in the [assign](#assign) function when the value passed is `false`. |
        * | on | #224f20 | Used in the [assign](#assign) function when the value passed is `true`. |
        * | scale | #b22200, #eace3f, #282f6b, #b35c1e, #224f20, #5f487c, #759143, #419391, #993c88, #e89c89, #ffee8d, #afd5e8, #f7ba77, #a5c697, #c5b5e5, #d1d392, #bbefd0, #e099cf | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |
  */

  var defaults = {
    dark: "#444444",
    light: "#f7f7f7",
    missing: "#cccccc",
    off: "#b22200",
    on: "#224f20",
    scale: ordinal().range(["#b22200", "#282f6b", "#eace3f", "#b35c1e", "#224f20", "#5f487c", "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8", "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"])
  };
  /**
      Returns a color based on a key, whether it is present in a user supplied object or in the default object.
      @returns {String}
      @private
  */

  function getColor(k) {
    var u = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return k in u ? u[k] : k in defaults ? defaults[k] : defaults.missing;
  }

  /**
      @function colorContrast
      @desc A set of default color values used when assigning colors based on data.
      @param {String} c A valid CSS color string.
      @param {Object} [u = defaults] An object containing overrides of the default colors.
      @returns {String}
  */

  function colorContrast (c) {
    var u = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    c = rgb$2(c);
    var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
    return yiq >= 128 ? getColor("dark", u) : getColor("light", u);
  }

  var pi = Math.PI,
      tau = 2 * pi,
      epsilon = 1e-6,
      tauEpsilon = tau - epsilon;

  function Path() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath

    this._ = "";
  }

  function path() {
    return new Path();
  }

  Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function moveTo(x, y) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    },
    lineTo: function lineTo(x, y) {
      this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function quadraticCurveTo(x1, y1, x, y) {
      this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
      this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function arcTo(x1, y1, x2, y2, r) {
      x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
      var x0 = this._x1,
          y0 = this._y1,
          x21 = x2 - x1,
          y21 = y2 - y1,
          x01 = x0 - x1,
          y01 = y0 - y1,
          l01_2 = x01 * x01 + y01 * y01; // Is the radius negative? Error.

      if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x1,y1).

      if (this._x1 === null) {
        this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
      } // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
      else if (!(l01_2 > epsilon)) ; // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
        // Equivalently, is (x1,y1) coincident with (x2,y2)?
        // Or, is the radius zero? Line to (x1,y1).
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
            this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
          } // Otherwise, draw an arc!
          else {
              var x20 = x2 - x0,
                  y20 = y2 - y0,
                  l21_2 = x21 * x21 + y21 * y21,
                  l20_2 = x20 * x20 + y20 * y20,
                  l21 = Math.sqrt(l21_2),
                  l01 = Math.sqrt(l01_2),
                  l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                  t01 = l / l01,
                  t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

              if (Math.abs(t01 - 1) > epsilon) {
                this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
              }

              this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
            }
    },
    arc: function arc(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r, ccw = !!ccw;
      var dx = r * Math.cos(a0),
          dy = r * Math.sin(a0),
          x0 = x + dx,
          y0 = y + dy,
          cw = 1 ^ ccw,
          da = ccw ? a0 - a1 : a1 - a0; // Is the radius negative? Error.

      if (r < 0) throw new Error("negative radius: " + r); // Is this path empty? Move to (x0,y0).

      if (this._x1 === null) {
        this._ += "M" + x0 + "," + y0;
      } // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
      else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
          this._ += "L" + x0 + "," + y0;
        } // Is this arc empty? We’re done.


      if (!r) return; // Does the angle go the wrong way? Flip the direction.

      if (da < 0) da = da % tau + tau; // Is this a complete circle? Draw two arcs to complete the circle.

      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      } // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
          this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
        }
    },
    rect: function rect(x, y, w, h) {
      this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
    },
    toString: function toString() {
      return this._;
    }
  };

  function constant$4 (x) {
    return function constant() {
      return x;
    };
  }

  var abs = Math.abs;
  var atan2 = Math.atan2;
  var cos = Math.cos;
  var max$1 = Math.max;
  var min$1 = Math.min;
  var sin = Math.sin;
  var sqrt$1 = Math.sqrt;
  var epsilon$1 = 1e-12;
  var pi$1 = Math.PI;
  var halfPi = pi$1 / 2;
  var tau$1 = 2 * pi$1;
  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
  }
  function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
  }

  function arcInnerRadius(d) {
    return d.innerRadius;
  }

  function arcOuterRadius(d) {
    return d.outerRadius;
  }

  function arcStartAngle(d) {
    return d.startAngle;
  }

  function arcEndAngle(d) {
    return d.endAngle;
  }

  function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
  }

  function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0,
        y10 = y1 - y0,
        x32 = x3 - x2,
        y32 = y3 - y2,
        t = y32 * x10 - x32 * y10;
    if (t * t < epsilon$1) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [x0 + t * x10, y0 + t * y10];
  } // Compute perpendicular offset line of length rc.
  // http://mathworld.wolfram.com/Circle-LineIntersection.html


  function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1,
        y01 = y0 - y1,
        lo = (cw ? rc : -rc) / sqrt$1(x01 * x01 + y01 * y01),
        ox = lo * y01,
        oy = -lo * x01,
        x11 = x0 + ox,
        y11 = y0 + oy,
        x10 = x1 + ox,
        y10 = y1 + oy,
        x00 = (x11 + x10) / 2,
        y00 = (y11 + y10) / 2,
        dx = x10 - x11,
        dy = y10 - y11,
        d2 = dx * dx + dy * dy,
        r = r1 - rc,
        D = x11 * y10 - x10 * y11,
        d = (dy < 0 ? -1 : 1) * sqrt$1(max$1(0, r * r * d2 - D * D)),
        cx0 = (D * dy - dx * d) / d2,
        cy0 = (-D * dx - dy * d) / d2,
        cx1 = (D * dy + dx * d) / d2,
        cy1 = (-D * dx + dy * d) / d2,
        dx0 = cx0 - x00,
        dy0 = cy0 - y00,
        dx1 = cx1 - x00,
        dy1 = cy1 - y00; // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?

    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return {
      cx: cx0,
      cy: cy0,
      x01: -ox,
      y01: -oy,
      x11: cx0 * (r1 / r - 1),
      y11: cy0 * (r1 / r - 1)
    };
  }

  function arc () {
    var innerRadius = arcInnerRadius,
        outerRadius = arcOuterRadius,
        cornerRadius = constant$4(0),
        padRadius = null,
        startAngle = arcStartAngle,
        endAngle = arcEndAngle,
        padAngle = arcPadAngle,
        context = null;

    function arc() {
      var buffer,
          r,
          r0 = +innerRadius.apply(this, arguments),
          r1 = +outerRadius.apply(this, arguments),
          a0 = startAngle.apply(this, arguments) - halfPi,
          a1 = endAngle.apply(this, arguments) - halfPi,
          da = abs(a1 - a0),
          cw = a1 > a0;
      if (!context) context = buffer = path(); // Ensure that the outer radius is always larger than the inner radius.

      if (r1 < r0) r = r1, r1 = r0, r0 = r; // Is it a point?

      if (!(r1 > epsilon$1)) context.moveTo(0, 0); // Or is it a circle or annulus?
      else if (da > tau$1 - epsilon$1) {
          context.moveTo(r1 * cos(a0), r1 * sin(a0));
          context.arc(0, 0, r1, a0, a1, !cw);

          if (r0 > epsilon$1) {
            context.moveTo(r0 * cos(a1), r0 * sin(a1));
            context.arc(0, 0, r0, a1, a0, cw);
          }
        } // Or is it a circular or annular sector?
        else {
            var a01 = a0,
                a11 = a1,
                a00 = a0,
                a10 = a1,
                da0 = da,
                da1 = da,
                ap = padAngle.apply(this, arguments) / 2,
                rp = ap > epsilon$1 && (padRadius ? +padRadius.apply(this, arguments) : sqrt$1(r0 * r0 + r1 * r1)),
                rc = min$1(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
                rc0 = rc,
                rc1 = rc,
                t0,
                t1; // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.

            if (rp > epsilon$1) {
              var p0 = asin(rp / r0 * sin(ap)),
                  p1 = asin(rp / r1 * sin(ap));
              if ((da0 -= p0 * 2) > epsilon$1) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;else da0 = 0, a00 = a10 = (a0 + a1) / 2;
              if ((da1 -= p1 * 2) > epsilon$1) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;else da1 = 0, a01 = a11 = (a0 + a1) / 2;
            }

            var x01 = r1 * cos(a01),
                y01 = r1 * sin(a01),
                x10 = r0 * cos(a10),
                y10 = r0 * sin(a10); // Apply rounded corners?

            if (rc > epsilon$1) {
              var x11 = r1 * cos(a11),
                  y11 = r1 * sin(a11),
                  x00 = r0 * cos(a00),
                  y00 = r0 * sin(a00),
                  oc; // Restrict the corner radius according to the sector angle.

              if (da < pi$1 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
                var ax = x01 - oc[0],
                    ay = y01 - oc[1],
                    bx = x11 - oc[0],
                    by = y11 - oc[1],
                    kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt$1(ax * ax + ay * ay) * sqrt$1(bx * bx + by * by))) / 2),
                    lc = sqrt$1(oc[0] * oc[0] + oc[1] * oc[1]);
                rc0 = min$1(rc, (r0 - lc) / (kc - 1));
                rc1 = min$1(rc, (r1 - lc) / (kc + 1));
              }
            } // Is the sector collapsed to a line?


            if (!(da1 > epsilon$1)) context.moveTo(x01, y01); // Does the sector’s outer ring have rounded corners?
            else if (rc1 > epsilon$1) {
                t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
                t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
                context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

                if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
                else {
                    context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                    context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                    context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
                  }
              } // Or is the outer ring just a circular arc?
              else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw); // Is there no inner ring, and it’s a circular sector?
            // Or perhaps it’s an annular sector collapsed due to padding?

            if (!(r0 > epsilon$1) || !(da0 > epsilon$1)) context.lineTo(x10, y10); // Does the sector’s inner ring (or point) have rounded corners?
            else if (rc0 > epsilon$1) {
                t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
                t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
                context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01); // Have the corners merged?

                if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw); // Otherwise, draw the two corners and the ring.
                else {
                    context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
                    context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                    context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
                  }
              } // Or is the inner ring just a circular arc?
              else context.arc(0, 0, r0, a10, a00, cw);
          }
      context.closePath();
      if (buffer) return context = null, buffer + "" || null;
    }

    arc.centroid = function () {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
      return [cos(a) * r, sin(a) * r];
    };

    arc.innerRadius = function (_) {
      return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$4(+_), arc) : innerRadius;
    };

    arc.outerRadius = function (_) {
      return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$4(+_), arc) : outerRadius;
    };

    arc.cornerRadius = function (_) {
      return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$4(+_), arc) : cornerRadius;
    };

    arc.padRadius = function (_) {
      return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$4(+_), arc) : padRadius;
    };

    arc.startAngle = function (_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$4(+_), arc) : startAngle;
    };

    arc.endAngle = function (_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$4(+_), arc) : endAngle;
    };

    arc.padAngle = function (_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$4(+_), arc) : padAngle;
    };

    arc.context = function (_) {
      return arguments.length ? (context = _ == null ? null : _, arc) : context;
    };

    return arc;
  }

  function Linear(context) {
    this._context = context;
  }

  Linear.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
        // proceed

        default:
          this._context.lineTo(x, y);

          break;
      }
    }
  };
  function curveLinear (context) {
    return new Linear(context);
  }

  function x(p) {
    return p[0];
  }
  function y(p) {
    return p[1];
  }

  function line () {
    var x$1 = x,
        y$1 = y,
        defined = constant$4(true),
        context = null,
        curve = curveLinear,
        output = null;

    function line(data) {
      var i,
          n = data.length,
          d,
          defined0 = false,
          buffer;
      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) output.lineStart();else output.lineEnd();
        }

        if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    line.x = function (_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$4(+_), line) : x$1;
    };

    line.y = function (_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$4(+_), line) : y$1;
    };

    line.defined = function (_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$4(!!_), line) : defined;
    };

    line.curve = function (_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function (_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
  }

  function area () {
    var x0 = x,
        x1 = null,
        y0 = constant$4(0),
        y1 = y,
        defined = constant$4(true),
        context = null,
        curve = curveLinear,
        output = null;

    function area(data) {
      var i,
          j,
          k,
          n = data.length,
          d,
          defined0 = false,
          buffer,
          x0z = new Array(n),
          y0z = new Array(n);
      if (context == null) output = curve(buffer = path());

      for (i = 0; i <= n; ++i) {
        if (!(i < n && defined(d = data[i], i, data)) === defined0) {
          if (defined0 = !defined0) {
            j = i;
            output.areaStart();
            output.lineStart();
          } else {
            output.lineEnd();
            output.lineStart();

            for (k = i - 1; k >= j; --k) {
              output.point(x0z[k], y0z[k]);
            }

            output.lineEnd();
            output.areaEnd();
          }
        }

        if (defined0) {
          x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
          output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
        }
      }

      if (buffer) return output = null, buffer + "" || null;
    }

    function arealine() {
      return line().defined(defined).curve(curve).context(context);
    }

    area.x = function (_) {
      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$4(+_), x1 = null, area) : x0;
    };

    area.x0 = function (_) {
      return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$4(+_), area) : x0;
    };

    area.x1 = function (_) {
      return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$4(+_), area) : x1;
    };

    area.y = function (_) {
      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$4(+_), y1 = null, area) : y0;
    };

    area.y0 = function (_) {
      return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$4(+_), area) : y0;
    };

    area.y1 = function (_) {
      return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$4(+_), area) : y1;
    };

    area.lineX0 = area.lineY0 = function () {
      return arealine().x(x0).y(y0);
    };

    area.lineY1 = function () {
      return arealine().x(x0).y(y1);
    };

    area.lineX1 = function () {
      return arealine().x(x1).y(y0);
    };

    area.defined = function (_) {
      return arguments.length ? (defined = typeof _ === "function" ? _ : constant$4(!!_), area) : defined;
    };

    area.curve = function (_) {
      return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
    };

    area.context = function (_) {
      return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
    };

    return area;
  }

  function descending (a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  }

  function identity$5 (d) {
    return d;
  }

  function pie () {
    var value = identity$5,
        sortValues = descending,
        sort = null,
        startAngle = constant$4(0),
        endAngle = constant$4(tau$1),
        padAngle = constant$4(0);

    function pie(data) {
      var i,
          n = data.length,
          j,
          k,
          sum = 0,
          index = new Array(n),
          arcs = new Array(n),
          a0 = +startAngle.apply(this, arguments),
          da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
          a1,
          p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
          pa = p * (da < 0 ? -1 : 1),
          v;

      for (i = 0; i < n; ++i) {
        if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
          sum += v;
        }
      } // Optionally sort the arcs by previously-computed values or by data.


      if (sortValues != null) index.sort(function (i, j) {
        return sortValues(arcs[i], arcs[j]);
      });else if (sort != null) index.sort(function (i, j) {
        return sort(data[i], data[j]);
      }); // Compute the arcs! They are stored in the original data's order.

      for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
        j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
          data: data[j],
          index: i,
          value: v,
          startAngle: a0,
          endAngle: a1,
          padAngle: p
        };
      }

      return arcs;
    }

    pie.value = function (_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant$4(+_), pie) : value;
    };

    pie.sortValues = function (_) {
      return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
    };

    pie.sort = function (_) {
      return arguments.length ? (sort = _, sortValues = null, pie) : sort;
    };

    pie.startAngle = function (_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$4(+_), pie) : startAngle;
    };

    pie.endAngle = function (_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$4(+_), pie) : endAngle;
    };

    pie.padAngle = function (_) {
      return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$4(+_), pie) : padAngle;
    };

    return pie;
  }

  var curveRadialLinear = curveRadial(curveLinear);

  function Radial(curve) {
    this._curve = curve;
  }

  Radial.prototype = {
    areaStart: function areaStart() {
      this._curve.areaStart();
    },
    areaEnd: function areaEnd() {
      this._curve.areaEnd();
    },
    lineStart: function lineStart() {
      this._curve.lineStart();
    },
    lineEnd: function lineEnd() {
      this._curve.lineEnd();
    },
    point: function point(a, r) {
      this._curve.point(r * Math.sin(a), r * -Math.cos(a));
    }
  };
  function curveRadial(curve) {
    function radial(context) {
      return new Radial(curve(context));
    }

    radial._curve = curve;
    return radial;
  }

  function lineRadial(l) {
    var c = l.curve;
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;

    l.curve = function (_) {
      return arguments.length ? c(curveRadial(_)) : c()._curve;
    };

    return l;
  }
  function lineRadial$1 () {
    return lineRadial(line().curve(curveRadialLinear));
  }

  function areaRadial () {
    var a = area().curve(curveRadialLinear),
        c = a.curve,
        x0 = a.lineX0,
        x1 = a.lineX1,
        y0 = a.lineY0,
        y1 = a.lineY1;
    a.angle = a.x, delete a.x;
    a.startAngle = a.x0, delete a.x0;
    a.endAngle = a.x1, delete a.x1;
    a.radius = a.y, delete a.y;
    a.innerRadius = a.y0, delete a.y0;
    a.outerRadius = a.y1, delete a.y1;
    a.lineStartAngle = function () {
      return lineRadial(x0());
    }, delete a.lineX0;
    a.lineEndAngle = function () {
      return lineRadial(x1());
    }, delete a.lineX1;
    a.lineInnerRadius = function () {
      return lineRadial(y0());
    }, delete a.lineY0;
    a.lineOuterRadius = function () {
      return lineRadial(y1());
    }, delete a.lineY1;

    a.curve = function (_) {
      return arguments.length ? c(curveRadial(_)) : c()._curve;
    };

    return a;
  }

  function pointRadial (x, y) {
    return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
  }

  var slice$1 = Array.prototype.slice;

  function linkSource(d) {
    return d.source;
  }

  function linkTarget(d) {
    return d.target;
  }

  function link(curve) {
    var source = linkSource,
        target = linkTarget,
        x$1 = x,
        y$1 = y,
        context = null;

    function link() {
      var buffer,
          argv = slice$1.call(arguments),
          s = source.apply(this, argv),
          t = target.apply(this, argv);
      if (!context) context = buffer = path();
      curve(context, +x$1.apply(this, (argv[0] = s, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
      if (buffer) return context = null, buffer + "" || null;
    }

    link.source = function (_) {
      return arguments.length ? (source = _, link) : source;
    };

    link.target = function (_) {
      return arguments.length ? (target = _, link) : target;
    };

    link.x = function (_) {
      return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant$4(+_), link) : x$1;
    };

    link.y = function (_) {
      return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant$4(+_), link) : y$1;
    };

    link.context = function (_) {
      return arguments.length ? (context = _ == null ? null : _, link) : context;
    };

    return link;
  }

  function curveHorizontal(context, x0, y0, x1, y1) {
    context.moveTo(x0, y0);
    context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
  }

  function curveVertical(context, x0, y0, x1, y1) {
    context.moveTo(x0, y0);
    context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
  }

  function curveRadial$1(context, x0, y0, x1, y1) {
    var p0 = pointRadial(x0, y0),
        p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
        p2 = pointRadial(x1, y0),
        p3 = pointRadial(x1, y1);
    context.moveTo(p0[0], p0[1]);
    context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  }

  function linkHorizontal() {
    return link(curveHorizontal);
  }
  function linkVertical() {
    return link(curveVertical);
  }
  function linkRadial() {
    var l = link(curveRadial$1);
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    return l;
  }

  var circle = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size / pi$1);
      context.moveTo(r, 0);
      context.arc(0, 0, r, 0, tau$1);
    }
  };

  var cross = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size / 5) / 2;
      context.moveTo(-3 * r, -r);
      context.lineTo(-r, -r);
      context.lineTo(-r, -3 * r);
      context.lineTo(r, -3 * r);
      context.lineTo(r, -r);
      context.lineTo(3 * r, -r);
      context.lineTo(3 * r, r);
      context.lineTo(r, r);
      context.lineTo(r, 3 * r);
      context.lineTo(-r, 3 * r);
      context.lineTo(-r, r);
      context.lineTo(-3 * r, r);
      context.closePath();
    }
  };

  var tan30 = Math.sqrt(1 / 3),
      tan30_2 = tan30 * 2;
  var diamond = {
    draw: function draw(context, size) {
      var y = Math.sqrt(size / tan30_2),
          x = y * tan30;
      context.moveTo(0, -y);
      context.lineTo(x, 0);
      context.lineTo(0, y);
      context.lineTo(-x, 0);
      context.closePath();
    }
  };

  var ka$1 = 0.89081309152928522810,
      kr = Math.sin(pi$1 / 10) / Math.sin(7 * pi$1 / 10),
      kx = Math.sin(tau$1 / 10) * kr,
      ky$1 = -Math.cos(tau$1 / 10) * kr;
  var star = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size * ka$1),
          x = kx * r,
          y = ky$1 * r;
      context.moveTo(0, -r);
      context.lineTo(x, y);

      for (var i = 1; i < 5; ++i) {
        var a = tau$1 * i / 5,
            c = Math.cos(a),
            s = Math.sin(a);
        context.lineTo(s * r, -c * r);
        context.lineTo(c * x - s * y, s * x + c * y);
      }

      context.closePath();
    }
  };

  var square = {
    draw: function draw(context, size) {
      var w = Math.sqrt(size),
          x = -w / 2;
      context.rect(x, x, w, w);
    }
  };

  var sqrt3 = Math.sqrt(3);
  var triangle = {
    draw: function draw(context, size) {
      var y = -Math.sqrt(size / (sqrt3 * 3));
      context.moveTo(0, y * 2);
      context.lineTo(-sqrt3 * y, -y);
      context.lineTo(sqrt3 * y, -y);
      context.closePath();
    }
  };

  var c = -0.5,
      s$1 = Math.sqrt(3) / 2,
      k = 1 / Math.sqrt(12),
      a = (k / 2 + 1) * 3;
  var wye = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size / a),
          x0 = r / 2,
          y0 = r * k,
          x1 = x0,
          y1 = r * k + r,
          x2 = -x1,
          y2 = y1;
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(c * x0 - s$1 * y0, s$1 * x0 + c * y0);
      context.lineTo(c * x1 - s$1 * y1, s$1 * x1 + c * y1);
      context.lineTo(c * x2 - s$1 * y2, s$1 * x2 + c * y2);
      context.lineTo(c * x0 + s$1 * y0, c * y0 - s$1 * x0);
      context.lineTo(c * x1 + s$1 * y1, c * y1 - s$1 * x1);
      context.lineTo(c * x2 + s$1 * y2, c * y2 - s$1 * x2);
      context.closePath();
    }
  };

  var symbols = [circle, cross, diamond, square, star, triangle, wye];
  function symbol () {
    var type = constant$4(circle),
        size = constant$4(64),
        context = null;

    function symbol() {
      var buffer;
      if (!context) context = buffer = path();
      type.apply(this, arguments).draw(context, +size.apply(this, arguments));
      if (buffer) return context = null, buffer + "" || null;
    }

    symbol.type = function (_) {
      return arguments.length ? (type = typeof _ === "function" ? _ : constant$4(_), symbol) : type;
    };

    symbol.size = function (_) {
      return arguments.length ? (size = typeof _ === "function" ? _ : constant$4(+_), symbol) : size;
    };

    symbol.context = function (_) {
      return arguments.length ? (context = _ == null ? null : _, symbol) : context;
    };

    return symbol;
  }

  function noop$1 () {}

  function _point(that, x, y) {
    that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
  }
  function Basis(context) {
    this._context = context;
  }
  Basis.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 3:
          _point(this, this._x1, this._y1);

        // proceed

        case 2:
          this._context.lineTo(this._x1, this._y1);

          break;
      }

      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;

          this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);

        // proceed

        default:
          _point(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };
  function basis (context) {
    return new Basis(context);
  }

  function BasisClosed(context) {
    this._context = context;
  }

  BasisClosed.prototype = {
    areaStart: noop$1,
    areaEnd: noop$1,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          {
            this._context.moveTo(this._x2, this._y2);

            this._context.closePath();

            break;
          }

        case 2:
          {
            this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);

            this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);

            this._context.closePath();

            break;
          }

        case 3:
          {
            this.point(this._x2, this._y2);
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            break;
          }
      }
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._x2 = x, this._y2 = y;
          break;

        case 1:
          this._point = 2;
          this._x3 = x, this._y3 = y;
          break;

        case 2:
          this._point = 3;
          this._x4 = x, this._y4 = y;

          this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);

          break;

        default:
          _point(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };
  function basisClosed (context) {
    return new BasisClosed(context);
  }

  function BasisOpen(context) {
    this._context = context;
  }

  BasisOpen.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;
          var x0 = (this._x0 + 4 * this._x1 + x) / 6,
              y0 = (this._y0 + 4 * this._y1 + y) / 6;
          this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
          break;

        case 3:
          this._point = 4;
        // proceed

        default:
          _point(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
    }
  };
  function basisOpen (context) {
    return new BasisOpen(context);
  }

  function Bundle(context, beta) {
    this._basis = new Basis(context);
    this._beta = beta;
  }

  Bundle.prototype = {
    lineStart: function lineStart() {
      this._x = [];
      this._y = [];

      this._basis.lineStart();
    },
    lineEnd: function lineEnd() {
      var x = this._x,
          y = this._y,
          j = x.length - 1;

      if (j > 0) {
        var x0 = x[0],
            y0 = y[0],
            dx = x[j] - x0,
            dy = y[j] - y0,
            i = -1,
            t;

        while (++i <= j) {
          t = i / j;

          this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
        }
      }

      this._x = this._y = null;

      this._basis.lineEnd();
    },
    point: function point(x, y) {
      this._x.push(+x);

      this._y.push(+y);
    }
  };
  var bundle = (function custom(beta) {
    function bundle(context) {
      return beta === 1 ? new Basis(context) : new Bundle(context, beta);
    }

    bundle.beta = function (beta) {
      return custom(+beta);
    };

    return bundle;
  })(0.85);

  function _point$1(that, x, y) {
    that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
  }
  function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  Cardinal.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);

          break;

        case 3:
          _point$1(this, this._x1, this._y1);

          break;
      }

      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
          this._x1 = x, this._y1 = y;
          break;

        case 2:
          this._point = 3;
        // proceed

        default:
          _point$1(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var cardinal = (function custom(tension) {
    function cardinal(context) {
      return new Cardinal(context, tension);
    }

    cardinal.tension = function (tension) {
      return custom(+tension);
    };

    return cardinal;
  })(0);

  function CardinalClosed(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  CardinalClosed.prototype = {
    areaStart: noop$1,
    areaEnd: noop$1,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          {
            this._context.moveTo(this._x3, this._y3);

            this._context.closePath();

            break;
          }

        case 2:
          {
            this._context.lineTo(this._x3, this._y3);

            this._context.closePath();

            break;
          }

        case 3:
          {
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            this.point(this._x5, this._y5);
            break;
          }
      }
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._x3 = x, this._y3 = y;
          break;

        case 1:
          this._point = 2;

          this._context.moveTo(this._x4 = x, this._y4 = y);

          break;

        case 2:
          this._point = 3;
          this._x5 = x, this._y5 = y;
          break;

        default:
          _point$1(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var cardinalClosed = (function custom(tension) {
    function cardinal(context) {
      return new CardinalClosed(context, tension);
    }

    cardinal.tension = function (tension) {
      return custom(+tension);
    };

    return cardinal;
  })(0);

  function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
  }
  CardinalOpen.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;
          this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
          break;

        case 3:
          this._point = 4;
        // proceed

        default:
          _point$1(this, x, y);

          break;
      }

      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var cardinalOpen = (function custom(tension) {
    function cardinal(context) {
      return new CardinalOpen(context, tension);
    }

    cardinal.tension = function (tension) {
      return custom(+tension);
    };

    return cardinal;
  })(0);

  function _point$2(that, x, y) {
    var x1 = that._x1,
        y1 = that._y1,
        x2 = that._x2,
        y2 = that._y2;

    if (that._l01_a > epsilon$1) {
      var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
          n = 3 * that._l01_a * (that._l01_a + that._l12_a);
      x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
      y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
    }

    if (that._l23_a > epsilon$1) {
      var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
          m = 3 * that._l23_a * (that._l23_a + that._l12_a);
      x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
      y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
    }

    that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
  }

  function CatmullRom(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }

  CatmullRom.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);

          break;

        case 3:
          this.point(this._x2, this._y2);
          break;
      }

      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      if (this._point) {
        var x23 = this._x2 - x,
            y23 = this._y2 - y;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;
        // proceed

        default:
          _point$2(this, x, y);

          break;
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var catmullRom = (function custom(alpha) {
    function catmullRom(context) {
      return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
    }

    catmullRom.alpha = function (alpha) {
      return custom(+alpha);
    };

    return catmullRom;
  })(0.5);

  function CatmullRomClosed(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }

  CatmullRomClosed.prototype = {
    areaStart: noop$1,
    areaEnd: noop$1,
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 1:
          {
            this._context.moveTo(this._x3, this._y3);

            this._context.closePath();

            break;
          }

        case 2:
          {
            this._context.lineTo(this._x3, this._y3);

            this._context.closePath();

            break;
          }

        case 3:
          {
            this.point(this._x3, this._y3);
            this.point(this._x4, this._y4);
            this.point(this._x5, this._y5);
            break;
          }
      }
    },
    point: function point(x, y) {
      x = +x, y = +y;

      if (this._point) {
        var x23 = this._x2 - x,
            y23 = this._y2 - y;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1;
          this._x3 = x, this._y3 = y;
          break;

        case 1:
          this._point = 2;

          this._context.moveTo(this._x4 = x, this._y4 = y);

          break;

        case 2:
          this._point = 3;
          this._x5 = x, this._y5 = y;
          break;

        default:
          _point$2(this, x, y);

          break;
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var catmullRomClosed = (function custom(alpha) {
    function catmullRom(context) {
      return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
    }

    catmullRom.alpha = function (alpha) {
      return custom(+alpha);
    };

    return catmullRom;
  })(0.5);

  function CatmullRomOpen(context, alpha) {
    this._context = context;
    this._alpha = alpha;
  }

  CatmullRomOpen.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
      this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      if (this._point) {
        var x23 = this._x2 - x,
            y23 = this._y2 - y;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
      }

      switch (this._point) {
        case 0:
          this._point = 1;
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;
          this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
          break;

        case 3:
          this._point = 4;
        // proceed

        default:
          _point$2(this, x, y);

          break;
      }

      this._l01_a = this._l12_a, this._l12_a = this._l23_a;
      this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
      this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
  };
  var catmullRomOpen = (function custom(alpha) {
    function catmullRom(context) {
      return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
    }

    catmullRom.alpha = function (alpha) {
      return custom(+alpha);
    };

    return catmullRom;
  })(0.5);

  function LinearClosed(context) {
    this._context = context;
  }

  LinearClosed.prototype = {
    areaStart: noop$1,
    areaEnd: noop$1,
    lineStart: function lineStart() {
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (this._point) this._context.closePath();
    },
    point: function point(x, y) {
      x = +x, y = +y;
      if (this._point) this._context.lineTo(x, y);else this._point = 1, this._context.moveTo(x, y);
    }
  };
  function linearClosed (context) {
    return new LinearClosed(context);
  }

  function sign(x) {
    return x < 0 ? -1 : 1;
  } // Calculate the slopes of the tangents (Hermite-type interpolation) based on
  // the following paper: Steffen, M. 1990. A Simple Method for Monotonic
  // Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
  // NOV(II), P. 443, 1990.


  function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0,
        h1 = x2 - that._x1,
        s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
        s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
        p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
  } // Calculate a one-sided slope.


  function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
  } // According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
  // "you can express cubic Hermite interpolation in terms of cubic Bézier curves
  // with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".


  function _point$3(that, t0, t1) {
    var x0 = that._x0,
        y0 = that._y0,
        x1 = that._x1,
        y1 = that._y1,
        dx = (x1 - x0) / 3;

    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
  }

  function MonotoneX(context) {
    this._context = context;
  }

  MonotoneX.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);

          break;

        case 3:
          _point$3(this, this._t0, slope2(this, this._t0));

          break;
      }

      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      this._line = 1 - this._line;
    },
    point: function point(x, y) {
      var t1 = NaN;
      x = +x, y = +y;
      if (x === this._x1 && y === this._y1) return; // Ignore coincident points.

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
          break;

        case 2:
          this._point = 3;

          _point$3(this, slope2(this, t1 = slope3(this, x, y)), t1);

          break;

        default:
          _point$3(this, this._t0, t1 = slope3(this, x, y));

          break;
      }

      this._x0 = this._x1, this._x1 = x;
      this._y0 = this._y1, this._y1 = y;
      this._t0 = t1;
    }
  };

  function MonotoneY(context) {
    this._context = new ReflectContext(context);
  }

  (MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function (x, y) {
    MonotoneX.prototype.point.call(this, y, x);
  };

  function ReflectContext(context) {
    this._context = context;
  }

  ReflectContext.prototype = {
    moveTo: function moveTo(x, y) {
      this._context.moveTo(y, x);
    },
    closePath: function closePath() {
      this._context.closePath();
    },
    lineTo: function lineTo(x, y) {
      this._context.lineTo(y, x);
    },
    bezierCurveTo: function bezierCurveTo(x1, y1, x2, y2, x, y) {
      this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
    }
  };
  function monotoneX(context) {
    return new MonotoneX(context);
  }
  function monotoneY(context) {
    return new MonotoneY(context);
  }

  function Natural(context) {
    this._context = context;
  }

  Natural.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x = [];
      this._y = [];
    },
    lineEnd: function lineEnd() {
      var x = this._x,
          y = this._y,
          n = x.length;

      if (n) {
        this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);

        if (n === 2) {
          this._context.lineTo(x[1], y[1]);
        } else {
          var px = controlPoints(x),
              py = controlPoints(y);

          for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
            this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
          }
        }
      }

      if (this._line || this._line !== 0 && n === 1) this._context.closePath();
      this._line = 1 - this._line;
      this._x = this._y = null;
    },
    point: function point(x, y) {
      this._x.push(+x);

      this._y.push(+y);
    }
  }; // See https://www.particleincell.com/2012/bezier-splines/ for derivation.

  function controlPoints(x) {
    var i,
        n = x.length - 1,
        m,
        a = new Array(n),
        b = new Array(n),
        r = new Array(n);
    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];

    for (i = 1; i < n - 1; ++i) {
      a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
    }

    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];

    for (i = 1; i < n; ++i) {
      m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    }

    a[n - 1] = r[n - 1] / b[n - 1];

    for (i = n - 2; i >= 0; --i) {
      a[i] = (r[i] - a[i + 1]) / b[i];
    }

    b[n - 1] = (x[n] + a[n - 1]) / 2;

    for (i = 0; i < n - 1; ++i) {
      b[i] = 2 * x[i + 1] - a[i + 1];
    }

    return [a, b];
  }

  function natural (context) {
    return new Natural(context);
  }

  function Step(context, t) {
    this._context = context;
    this._t = t;
  }

  Step.prototype = {
    areaStart: function areaStart() {
      this._line = 0;
    },
    areaEnd: function areaEnd() {
      this._line = NaN;
    },
    lineStart: function lineStart() {
      this._x = this._y = NaN;
      this._point = 0;
    },
    lineEnd: function lineEnd() {
      if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
      if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
      if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
    },
    point: function point(x, y) {
      x = +x, y = +y;

      switch (this._point) {
        case 0:
          this._point = 1;
          this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
          break;

        case 1:
          this._point = 2;
        // proceed

        default:
          {
            if (this._t <= 0) {
              this._context.lineTo(this._x, y);

              this._context.lineTo(x, y);
            } else {
              var x1 = this._x * (1 - this._t) + x * this._t;

              this._context.lineTo(x1, this._y);

              this._context.lineTo(x1, y);
            }

            break;
          }
      }

      this._x = x, this._y = y;
    }
  };
  function step (context) {
    return new Step(context, 0.5);
  }
  function stepBefore(context) {
    return new Step(context, 0);
  }
  function stepAfter(context) {
    return new Step(context, 1);
  }

  function none$1 (series, order) {
    if (!((n = series.length) > 1)) return;

    for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
      s0 = s1, s1 = series[order[i]];

      for (j = 0; j < m; ++j) {
        s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
      }
    }
  }

  function none$2 (series) {
    var n = series.length,
        o = new Array(n);

    while (--n >= 0) {
      o[n] = n;
    }

    return o;
  }

  function stackValue(d, key) {
    return d[key];
  }

  function stack () {
    var keys = constant$4([]),
        order = none$2,
        offset = none$1,
        value = stackValue;

    function stack(data) {
      var kz = keys.apply(this, arguments),
          i,
          m = data.length,
          n = kz.length,
          sz = new Array(n),
          oz;

      for (i = 0; i < n; ++i) {
        for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
          si[j] = sij = [0, +value(data[j], ki, j, data)];
          sij.data = data[j];
        }

        si.key = ki;
      }

      for (i = 0, oz = order(sz); i < n; ++i) {
        sz[oz[i]].index = i;
      }

      offset(sz, oz);
      return sz;
    }

    stack.keys = function (_) {
      return arguments.length ? (keys = typeof _ === "function" ? _ : constant$4(slice$1.call(_)), stack) : keys;
    };

    stack.value = function (_) {
      return arguments.length ? (value = typeof _ === "function" ? _ : constant$4(+_), stack) : value;
    };

    stack.order = function (_) {
      return arguments.length ? (order = _ == null ? none$2 : typeof _ === "function" ? _ : constant$4(slice$1.call(_)), stack) : order;
    };

    stack.offset = function (_) {
      return arguments.length ? (offset = _ == null ? none$1 : _, stack) : offset;
    };

    return stack;
  }

  function expand (series, order) {
    if (!((n = series.length) > 0)) return;

    for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
      for (y = i = 0; i < n; ++i) {
        y += series[i][j][1] || 0;
      }

      if (y) for (i = 0; i < n; ++i) {
        series[i][j][1] /= y;
      }
    }

    none$1(series, order);
  }

  function diverging$1 (series, order) {
    if (!((n = series.length) > 0)) return;

    for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
      for (yp = yn = 0, i = 0; i < n; ++i) {
        if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
          d[0] = yp, d[1] = yp += dy;
        } else if (dy < 0) {
          d[1] = yn, d[0] = yn += dy;
        } else {
          d[0] = 0, d[1] = dy;
        }
      }
    }
  }

  function silhouette (series, order) {
    if (!((n = series.length) > 0)) return;

    for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
      for (var i = 0, y = 0; i < n; ++i) {
        y += series[i][j][1] || 0;
      }

      s0[j][1] += s0[j][0] = -y / 2;
    }

    none$1(series, order);
  }

  function wiggle (series, order) {
    if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;

    for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
      for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
        var si = series[order[i]],
            sij0 = si[j][1] || 0,
            sij1 = si[j - 1][1] || 0,
            s3 = (sij0 - sij1) / 2;

        for (var k = 0; k < i; ++k) {
          var sk = series[order[k]],
              skj0 = sk[j][1] || 0,
              skj1 = sk[j - 1][1] || 0;
          s3 += skj0 - skj1;
        }

        s1 += sij0, s2 += s3 * sij0;
      }

      s0[j - 1][1] += s0[j - 1][0] = y;
      if (s1) y -= s2 / s1;
    }

    s0[j - 1][1] += s0[j - 1][0] = y;
    none$1(series, order);
  }

  function appearance (series) {
    var peaks = series.map(peak);
    return none$2(series).sort(function (a, b) {
      return peaks[a] - peaks[b];
    });
  }

  function peak(series) {
    var i = -1,
        j = 0,
        n = series.length,
        vi,
        vj = -Infinity;

    while (++i < n) {
      if ((vi = +series[i][1]) > vj) vj = vi, j = i;
    }

    return j;
  }

  function ascending$2 (series) {
    var sums = series.map(sum$1);
    return none$2(series).sort(function (a, b) {
      return sums[a] - sums[b];
    });
  }
  function sum$1(series) {
    var s = 0,
        i = -1,
        n = series.length,
        v;

    while (++i < n) {
      if (v = +series[i][1]) s += v;
    }

    return s;
  }

  function descending$1 (series) {
    return ascending$2(series).reverse();
  }

  function insideOut (series) {
    var n = series.length,
        i,
        j,
        sums = series.map(sum$1),
        order = appearance(series),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];

    for (i = 0; i < n; ++i) {
      j = order[i];

      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }

    return bottoms.reverse().concat(tops);
  }

  function reverse (series) {
    return none$2(series).reverse();
  }



  var paths = /*#__PURE__*/Object.freeze({
    __proto__: null,
    arc: arc,
    area: area,
    line: line,
    pie: pie,
    areaRadial: areaRadial,
    radialArea: areaRadial,
    lineRadial: lineRadial$1,
    radialLine: lineRadial$1,
    pointRadial: pointRadial,
    linkHorizontal: linkHorizontal,
    linkVertical: linkVertical,
    linkRadial: linkRadial,
    symbol: symbol,
    symbols: symbols,
    symbolCircle: circle,
    symbolCross: cross,
    symbolDiamond: diamond,
    symbolSquare: square,
    symbolStar: star,
    symbolTriangle: triangle,
    symbolWye: wye,
    curveBasisClosed: basisClosed,
    curveBasisOpen: basisOpen,
    curveBasis: basis,
    curveBundle: bundle,
    curveCardinalClosed: cardinalClosed,
    curveCardinalOpen: cardinalOpen,
    curveCardinal: cardinal,
    curveCatmullRomClosed: catmullRomClosed,
    curveCatmullRomOpen: catmullRomOpen,
    curveCatmullRom: catmullRom,
    curveLinearClosed: linearClosed,
    curveLinear: curveLinear,
    curveMonotoneX: monotoneX,
    curveMonotoneY: monotoneY,
    curveNatural: natural,
    curveStep: step,
    curveStepAfter: stepAfter,
    curveStepBefore: stepBefore,
    stack: stack,
    stackOffsetExpand: expand,
    stackOffsetDiverging: diverging$1,
    stackOffsetNone: none$1,
    stackOffsetSilhouette: silhouette,
    stackOffsetWiggle: wiggle,
    stackOrderAppearance: appearance,
    stackOrderAscending: ascending$2,
    stackOrderDescending: descending$1,
    stackOrderInsideOut: insideOut,
    stackOrderNone: none$2,
    stackOrderReverse: reverse
  });

  /**
   * Strips HTML and "un-escapes" escape characters.
   * @param {String} input
   */
  function htmlDecode(input) {
    if (input.replace(/\s+/g, "") === "") return input;
    var doc = new DOMParser().parseFromString(input.replace(/<[^>]+>/g, ""), "text/html");
    return doc.documentElement ? doc.documentElement.textContent : input;
  }
  /**
      @function textWidth
      @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
      @param {String|Array} text Can be either a single string or an array of strings to analyze.
      @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
  */


  function measure (text, style) {
    style = Object.assign({
      "font-size": 10,
      "font-family": "sans-serif",
      "font-style": "normal",
      "font-weight": 400,
      "font-variant": "normal"
    }, style);
    var context = document.createElement("canvas").getContext("2d");
    var font = [];
    font.push(style["font-style"]);
    font.push(style["font-variant"]);
    font.push(style["font-weight"]);
    font.push(typeof style["font-size"] === "string" ? style["font-size"] : "".concat(style["font-size"], "px"));
    font.push(style["font-family"]);
    context.font = font.join(" ");
    if (text instanceof Array) return text.map(function (t) {
      return context.measureText(htmlDecode(t)).width;
    });
    return context.measureText(htmlDecode(text)).width;
  }

  /**
      @function trim
      @desc Cross-browser implementation of [trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim).
      @param {String} str
  */
  function trim(str) {
    return str.toString().replace(/^\s+|\s+$/g, "");
  }
  /**
      @function trimRight
      @desc Cross-browser implementation of [trimRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimRight).
      @param {String} str
  */


  function trimRight(str) {
    return str.toString().replace(/\s+$/, "");
  }

  var alpha = "abcdefghiABCDEFGHI_!@#$%^&*()_+1234567890",
      checked = {},
      height = 32;
  var dejavu, macos, monospace, proportional;
  /**
      @function fontExists
      @desc Given either a single font-family or a list of fonts, returns the name of the first font that can be rendered, or `false` if none are installed on the user's machine.
      @param {String|Array} font Can be either a valid CSS font-family string (single or comma-separated names) or an Array of string names.
  */

  var fontExists = function fontExists(font) {
    if (!dejavu) {
      dejavu = measure(alpha, {
        "font-family": "DejaVuSans",
        "font-size": height
      });
      macos = measure(alpha, {
        "font-family": "-apple-system",
        "font-size": height
      });
      monospace = measure(alpha, {
        "font-family": "monospace",
        "font-size": height
      });
      proportional = measure(alpha, {
        "font-family": "sans-serif",
        "font-size": height
      });
    }

    if (!(font instanceof Array)) font = font.split(",");
    font = font.map(function (f) {
      return trim(f);
    });

    for (var i = 0; i < font.length; i++) {
      var fam = font[i];
      if (checked[fam] || ["-apple-system", "monospace", "sans-serif", "DejaVuSans"].includes(fam)) return fam;else if (checked[fam] === false) continue;
      var width = measure(alpha, {
        "font-family": fam,
        "font-size": height
      });
      checked[fam] = width !== monospace;
      if (checked[fam]) checked[fam] = width !== proportional;
      if (macos && checked[fam]) checked[fam] = width !== macos;
      if (dejavu && checked[fam]) checked[fam] = width !== dejavu;
      if (checked[fam]) return fam;
    }

    return false;
  };

  /**
      @function rtl
      @desc Returns `true` if the HTML or body element has either the "dir" HTML attribute or the "direction" CSS property set to "rtl".
  */

  var detectRTL = (function () {
    return _select("html").attr("dir") === "rtl" || _select("body").attr("dir") === "rtl" || _select("html").style("direction") === "rtl" || _select("body").style("direction") === "rtl";
  });

  /**
      @function stringify
      @desc Coerces value into a String.
      @param {String} value
  */
  function stringify (value) {
    if (value === void 0) value = "undefined";else if (!(typeof value === "string" || value instanceof String)) value = JSON.stringify(value);
    return value;
  }

  // great unicode list: http://asecuritysite.com/coding/asc2
  var diacritics = [[/[\300-\305]/g, "A"], [/[\340-\345]/g, "a"], [/[\306]/g, "AE"], [/[\346]/g, "ae"], [/[\337]/g, "B"], [/[\307]/g, "C"], [/[\347]/g, "c"], [/[\320\336\376]/g, "D"], [/[\360]/g, "d"], [/[\310-\313]/g, "E"], [/[\350-\353]/g, "e"], [/[\314-\317]/g, "I"], [/[\354-\357]/g, "i"], [/[\321]/g, "N"], [/[\361]/g, "n"], [/[\322-\326\330]/g, "O"], [/[\362-\366\370]/g, "o"], [/[\331-\334]/g, "U"], [/[\371-\374]/g, "u"], [/[\327]/g, "x"], [/[\335]/g, "Y"], [/[\375\377]/g, "y"]];
  /**
      @function strip
      @desc Removes all non ASCII characters from a string.
      @param {String} value
  */

  function strip (value) {
    return "".concat(value).replace(/[^A-Za-z0-9\-_]/g, function (_char) {
      if (_char === " ") return "-";
      var ret = false;

      for (var d = 0; d < diacritics.length; d++) {
        if (new RegExp(diacritics[d][0]).test(_char)) {
          ret = diacritics[d][1];
          break;
        }
      }

      return ret || "";
    });
  }

  // scraped from http://www.fileformat.info/info/unicode/category/Mc/list.htm
  // and http://www.fileformat.info/info/unicode/category/Mn/list.htm
  // JSON.stringify([].slice.call(document.getElementsByClassName("table-list")[0].getElementsByTagName("tr")).filter(function(d){ return d.getElementsByTagName("a").length && d.getElementsByTagName("a")[0].innerHTML.length === 6; }).map(function(d){ return d.getElementsByTagName("a")[0].innerHTML.replace("U", "u").replace("+", ""); }).sort());
  // The following unicode characters combine to form new characters and should never be split from surrounding characters.
  var a$1 = ["u0903", "u093B", "u093E", "u093F", "u0940", "u0949", "u094A", "u094B", "u094C", "u094E", "u094F", "u0982", "u0983", "u09BE", "u09BF", "u09C0", "u09C7", "u09C8", "u09CB", "u09CC", "u09D7", "u0A03", "u0A3E", "u0A3F", "u0A40", "u0A83", "u0ABE", "u0ABF", "u0AC0", "u0AC9", "u0ACB", "u0ACC", "u0B02", "u0B03", "u0B3E", "u0B40", "u0B47", "u0B48", "u0B4B", "u0B4C", "u0B57", "u0BBE", "u0BBF", "u0BC1", "u0BC2", "u0BC6", "u0BC7", "u0BC8", "u0BCA", "u0BCB", "u0BCC", "u0BD7", "u0C01", "u0C02", "u0C03", "u0C41", "u0C42", "u0C43", "u0C44", "u0C82", "u0C83", "u0CBE", "u0CC0", "u0CC1", "u0CC2", "u0CC3", "u0CC4", "u0CC7", "u0CC8", "u0CCA", "u0CCB", "u0CD5", "u0CD6", "u0D02", "u0D03", "u0D3E", "u0D3F", "u0D40", "u0D46", "u0D47", "u0D48", "u0D4A", "u0D4B", "u0D4C", "u0D57", "u0D82", "u0D83", "u0DCF", "u0DD0", "u0DD1", "u0DD8", "u0DD9", "u0DDA", "u0DDB", "u0DDC", "u0DDD", "u0DDE", "u0DDF", "u0DF2", "u0DF3", "u0F3E", "u0F3F", "u0F7F", "u102B", "u102C", "u1031", "u1038", "u103B", "u103C", "u1056", "u1057", "u1062", "u1063", "u1064", "u1067", "u1068", "u1069", "u106A", "u106B", "u106C", "u106D", "u1083", "u1084", "u1087", "u1088", "u1089", "u108A", "u108B", "u108C", "u108F", "u109A", "u109B", "u109C", "u17B6", "u17BE", "u17BF", "u17C0", "u17C1", "u17C2", "u17C3", "u17C4", "u17C5", "u17C7", "u17C8", "u1923", "u1924", "u1925", "u1926", "u1929", "u192A", "u192B", "u1930", "u1931", "u1933", "u1934", "u1935", "u1936", "u1937", "u1938", "u1A19", "u1A1A", "u1A55", "u1A57", "u1A61", "u1A63", "u1A64", "u1A6D", "u1A6E", "u1A6F", "u1A70", "u1A71", "u1A72", "u1B04", "u1B35", "u1B3B", "u1B3D", "u1B3E", "u1B3F", "u1B40", "u1B41", "u1B43", "u1B44", "u1B82", "u1BA1", "u1BA6", "u1BA7", "u1BAA", "u1BE7", "u1BEA", "u1BEB", "u1BEC", "u1BEE", "u1BF2", "u1BF3", "u1C24", "u1C25", "u1C26", "u1C27", "u1C28", "u1C29", "u1C2A", "u1C2B", "u1C34", "u1C35", "u1CE1", "u1CF2", "u1CF3", "u302E", "u302F", "uA823", "uA824", "uA827", "uA880", "uA881", "uA8B4", "uA8B5", "uA8B6", "uA8B7", "uA8B8", "uA8B9", "uA8BA", "uA8BB", "uA8BC", "uA8BD", "uA8BE", "uA8BF", "uA8C0", "uA8C1", "uA8C2", "uA8C3", "uA952", "uA953", "uA983", "uA9B4", "uA9B5", "uA9BA", "uA9BB", "uA9BD", "uA9BE", "uA9BF", "uA9C0", "uAA2F", "uAA30", "uAA33", "uAA34", "uAA4D", "uAA7B", "uAA7D", "uAAEB", "uAAEE", "uAAEF", "uAAF5", "uABE3", "uABE4", "uABE6", "uABE7", "uABE9", "uABEA", "uABEC"];
  var b = ["u0300", "u0301", "u0302", "u0303", "u0304", "u0305", "u0306", "u0307", "u0308", "u0309", "u030A", "u030B", "u030C", "u030D", "u030E", "u030F", "u0310", "u0311", "u0312", "u0313", "u0314", "u0315", "u0316", "u0317", "u0318", "u0319", "u031A", "u031B", "u031C", "u031D", "u031E", "u031F", "u0320", "u0321", "u0322", "u0323", "u0324", "u0325", "u0326", "u0327", "u0328", "u0329", "u032A", "u032B", "u032C", "u032D", "u032E", "u032F", "u0330", "u0331", "u0332", "u0333", "u0334", "u0335", "u0336", "u0337", "u0338", "u0339", "u033A", "u033B", "u033C", "u033D", "u033E", "u033F", "u0340", "u0341", "u0342", "u0343", "u0344", "u0345", "u0346", "u0347", "u0348", "u0349", "u034A", "u034B", "u034C", "u034D", "u034E", "u034F", "u0350", "u0351", "u0352", "u0353", "u0354", "u0355", "u0356", "u0357", "u0358", "u0359", "u035A", "u035B", "u035C", "u035D", "u035E", "u035F", "u0360", "u0361", "u0362", "u0363", "u0364", "u0365", "u0366", "u0367", "u0368", "u0369", "u036A", "u036B", "u036C", "u036D", "u036E", "u036F", "u0483", "u0484", "u0485", "u0486", "u0487", "u0591", "u0592", "u0593", "u0594", "u0595", "u0596", "u0597", "u0598", "u0599", "u059A", "u059B", "u059C", "u059D", "u059E", "u059F", "u05A0", "u05A1", "u05A2", "u05A3", "u05A4", "u05A5", "u05A6", "u05A7", "u05A8", "u05A9", "u05AA", "u05AB", "u05AC", "u05AD", "u05AE", "u05AF", "u05B0", "u05B1", "u05B2", "u05B3", "u05B4", "u05B5", "u05B6", "u05B7", "u05B8", "u05B9", "u05BA", "u05BB", "u05BC", "u05BD", "u05BF", "u05C1", "u05C2", "u05C4", "u05C5", "u05C7", "u0610", "u0611", "u0612", "u0613", "u0614", "u0615", "u0616", "u0617", "u0618", "u0619", "u061A", "u064B", "u064C", "u064D", "u064E", "u064F", "u0650", "u0651", "u0652", "u0653", "u0654", "u0655", "u0656", "u0657", "u0658", "u0659", "u065A", "u065B", "u065C", "u065D", "u065E", "u065F", "u0670", "u06D6", "u06D7", "u06D8", "u06D9", "u06DA", "u06DB", "u06DC", "u06DF", "u06E0", "u06E1", "u06E2", "u06E3", "u06E4", "u06E7", "u06E8", "u06EA", "u06EB", "u06EC", "u06ED", "u0711", "u0730", "u0731", "u0732", "u0733", "u0734", "u0735", "u0736", "u0737", "u0738", "u0739", "u073A", "u073B", "u073C", "u073D", "u073E", "u073F", "u0740", "u0741", "u0742", "u0743", "u0744", "u0745", "u0746", "u0747", "u0748", "u0749", "u074A", "u07A6", "u07A7", "u07A8", "u07A9", "u07AA", "u07AB", "u07AC", "u07AD", "u07AE", "u07AF", "u07B0", "u07EB", "u07EC", "u07ED", "u07EE", "u07EF", "u07F0", "u07F1", "u07F2", "u07F3", "u0816", "u0817", "u0818", "u0819", "u081B", "u081C", "u081D", "u081E", "u081F", "u0820", "u0821", "u0822", "u0823", "u0825", "u0826", "u0827", "u0829", "u082A", "u082B", "u082C", "u082D", "u0859", "u085A", "u085B", "u08E3", "u08E4", "u08E5", "u08E6", "u08E7", "u08E8", "u08E9", "u08EA", "u08EB", "u08EC", "u08ED", "u08EE", "u08EF", "u08F0", "u08F1", "u08F2", "u08F3", "u08F4", "u08F5", "u08F6", "u08F7", "u08F8", "u08F9", "u08FA", "u08FB", "u08FC", "u08FD", "u08FE", "u08FF", "u0900", "u0901", "u0902", "u093A", "u093C", "u0941", "u0942", "u0943", "u0944", "u0945", "u0946", "u0947", "u0948", "u094D", "u0951", "u0952", "u0953", "u0954", "u0955", "u0956", "u0957", "u0962", "u0963", "u0981", "u09BC", "u09C1", "u09C2", "u09C3", "u09C4", "u09CD", "u09E2", "u09E3", "u0A01", "u0A02", "u0A3C", "u0A41", "u0A42", "u0A47", "u0A48", "u0A4B", "u0A4C", "u0A4D", "u0A51", "u0A70", "u0A71", "u0A75", "u0A81", "u0A82", "u0ABC", "u0AC1", "u0AC2", "u0AC3", "u0AC4", "u0AC5", "u0AC7", "u0AC8", "u0ACD", "u0AE2", "u0AE3", "u0B01", "u0B3C", "u0B3F", "u0B41", "u0B42", "u0B43", "u0B44", "u0B4D", "u0B56", "u0B62", "u0B63", "u0B82", "u0BC0", "u0BCD", "u0C00", "u0C3E", "u0C3F", "u0C40", "u0C46", "u0C47", "u0C48", "u0C4A", "u0C4B", "u0C4C", "u0C4D", "u0C55", "u0C56", "u0C62", "u0C63", "u0C81", "u0CBC", "u0CBF", "u0CC6", "u0CCC", "u0CCD", "u0CE2", "u0CE3", "u0D01", "u0D41", "u0D42", "u0D43", "u0D44", "u0D4D", "u0D62", "u0D63", "u0DCA", "u0DD2", "u0DD3", "u0DD4", "u0DD6", "u0E31", "u0E34", "u0E35", "u0E36", "u0E37", "u0E38", "u0E39", "u0E3A", "u0E47", "u0E48", "u0E49", "u0E4A", "u0E4B", "u0E4C", "u0E4D", "u0E4E", "u0EB1", "u0EB4", "u0EB5", "u0EB6", "u0EB7", "u0EB8", "u0EB9", "u0EBB", "u0EBC", "u0EC8", "u0EC9", "u0ECA", "u0ECB", "u0ECC", "u0ECD", "u0F18", "u0F19", "u0F35", "u0F37", "u0F39", "u0F71", "u0F72", "u0F73", "u0F74", "u0F75", "u0F76", "u0F77", "u0F78", "u0F79", "u0F7A", "u0F7B", "u0F7C", "u0F7D", "u0F7E", "u0F80", "u0F81", "u0F82", "u0F83", "u0F84", "u0F86", "u0F87", "u0F8D", "u0F8E", "u0F8F", "u0F90", "u0F91", "u0F92", "u0F93", "u0F94", "u0F95", "u0F96", "u0F97", "u0F99", "u0F9A", "u0F9B", "u0F9C", "u0F9D", "u0F9E", "u0F9F", "u0FA0", "u0FA1", "u0FA2", "u0FA3", "u0FA4", "u0FA5", "u0FA6", "u0FA7", "u0FA8", "u0FA9", "u0FAA", "u0FAB", "u0FAC", "u0FAD", "u0FAE", "u0FAF", "u0FB0", "u0FB1", "u0FB2", "u0FB3", "u0FB4", "u0FB5", "u0FB6", "u0FB7", "u0FB8", "u0FB9", "u0FBA", "u0FBB", "u0FBC", "u0FC6", "u102D", "u102E", "u102F", "u1030", "u1032", "u1033", "u1034", "u1035", "u1036", "u1037", "u1039", "u103A", "u103D", "u103E", "u1058", "u1059", "u105E", "u105F", "u1060", "u1071", "u1072", "u1073", "u1074", "u1082", "u1085", "u1086", "u108D", "u109D", "u135D", "u135E", "u135F", "u1712", "u1713", "u1714", "u1732", "u1733", "u1734", "u1752", "u1753", "u1772", "u1773", "u17B4", "u17B5", "u17B7", "u17B8", "u17B9", "u17BA", "u17BB", "u17BC", "u17BD", "u17C6", "u17C9", "u17CA", "u17CB", "u17CC", "u17CD", "u17CE", "u17CF", "u17D0", "u17D1", "u17D2", "u17D3", "u17DD", "u180B", "u180C", "u180D", "u18A9", "u1920", "u1921", "u1922", "u1927", "u1928", "u1932", "u1939", "u193A", "u193B", "u1A17", "u1A18", "u1A1B", "u1A56", "u1A58", "u1A59", "u1A5A", "u1A5B", "u1A5C", "u1A5D", "u1A5E", "u1A60", "u1A62", "u1A65", "u1A66", "u1A67", "u1A68", "u1A69", "u1A6A", "u1A6B", "u1A6C", "u1A73", "u1A74", "u1A75", "u1A76", "u1A77", "u1A78", "u1A79", "u1A7A", "u1A7B", "u1A7C", "u1A7F", "u1AB0", "u1AB1", "u1AB2", "u1AB3", "u1AB4", "u1AB5", "u1AB6", "u1AB7", "u1AB8", "u1AB9", "u1ABA", "u1ABB", "u1ABC", "u1ABD", "u1B00", "u1B01", "u1B02", "u1B03", "u1B34", "u1B36", "u1B37", "u1B38", "u1B39", "u1B3A", "u1B3C", "u1B42", "u1B6B", "u1B6C", "u1B6D", "u1B6E", "u1B6F", "u1B70", "u1B71", "u1B72", "u1B73", "u1B80", "u1B81", "u1BA2", "u1BA3", "u1BA4", "u1BA5", "u1BA8", "u1BA9", "u1BAB", "u1BAC", "u1BAD", "u1BE6", "u1BE8", "u1BE9", "u1BED", "u1BEF", "u1BF0", "u1BF1", "u1C2C", "u1C2D", "u1C2E", "u1C2F", "u1C30", "u1C31", "u1C32", "u1C33", "u1C36", "u1C37", "u1CD0", "u1CD1", "u1CD2", "u1CD4", "u1CD5", "u1CD6", "u1CD7", "u1CD8", "u1CD9", "u1CDA", "u1CDB", "u1CDC", "u1CDD", "u1CDE", "u1CDF", "u1CE0", "u1CE2", "u1CE3", "u1CE4", "u1CE5", "u1CE6", "u1CE7", "u1CE8", "u1CED", "u1CF4", "u1CF8", "u1CF9", "u1DC0", "u1DC1", "u1DC2", "u1DC3", "u1DC4", "u1DC5", "u1DC6", "u1DC7", "u1DC8", "u1DC9", "u1DCA", "u1DCB", "u1DCC", "u1DCD", "u1DCE", "u1DCF", "u1DD0", "u1DD1", "u1DD2", "u1DD3", "u1DD4", "u1DD5", "u1DD6", "u1DD7", "u1DD8", "u1DD9", "u1DDA", "u1DDB", "u1DDC", "u1DDD", "u1DDE", "u1DDF", "u1DE0", "u1DE1", "u1DE2", "u1DE3", "u1DE4", "u1DE5", "u1DE6", "u1DE7", "u1DE8", "u1DE9", "u1DEA", "u1DEB", "u1DEC", "u1DED", "u1DEE", "u1DEF", "u1DF0", "u1DF1", "u1DF2", "u1DF3", "u1DF4", "u1DF5", "u1DFC", "u1DFD", "u1DFE", "u1DFF", "u20D0", "u20D1", "u20D2", "u20D3", "u20D4", "u20D5", "u20D6", "u20D7", "u20D8", "u20D9", "u20DA", "u20DB", "u20DC", "u20E1", "u20E5", "u20E6", "u20E7", "u20E8", "u20E9", "u20EA", "u20EB", "u20EC", "u20ED", "u20EE", "u20EF", "u20F0", "u2CEF", "u2CF0", "u2CF1", "u2D7F", "u2DE0", "u2DE1", "u2DE2", "u2DE3", "u2DE4", "u2DE5", "u2DE6", "u2DE7", "u2DE8", "u2DE9", "u2DEA", "u2DEB", "u2DEC", "u2DED", "u2DEE", "u2DEF", "u2DF0", "u2DF1", "u2DF2", "u2DF3", "u2DF4", "u2DF5", "u2DF6", "u2DF7", "u2DF8", "u2DF9", "u2DFA", "u2DFB", "u2DFC", "u2DFD", "u2DFE", "u2DFF", "u302A", "u302B", "u302C", "u302D", "u3099", "u309A", "uA66F", "uA674", "uA675", "uA676", "uA677", "uA678", "uA679", "uA67A", "uA67B", "uA67C", "uA67D", "uA69E", "uA69F", "uA6F0", "uA6F1", "uA802", "uA806", "uA80B", "uA825", "uA826", "uA8C4", "uA8E0", "uA8E1", "uA8E2", "uA8E3", "uA8E4", "uA8E5", "uA8E6", "uA8E7", "uA8E8", "uA8E9", "uA8EA", "uA8EB", "uA8EC", "uA8ED", "uA8EE", "uA8EF", "uA8F0", "uA8F1", "uA926", "uA927", "uA928", "uA929", "uA92A", "uA92B", "uA92C", "uA92D", "uA947", "uA948", "uA949", "uA94A", "uA94B", "uA94C", "uA94D", "uA94E", "uA94F", "uA950", "uA951", "uA980", "uA981", "uA982", "uA9B3", "uA9B6", "uA9B7", "uA9B8", "uA9B9", "uA9BC", "uA9E5", "uAA29", "uAA2A", "uAA2B", "uAA2C", "uAA2D", "uAA2E", "uAA31", "uAA32", "uAA35", "uAA36", "uAA43", "uAA4C", "uAA7C", "uAAB0", "uAAB2", "uAAB3", "uAAB4", "uAAB7", "uAAB8", "uAABE", "uAABF", "uAAC1", "uAAEC", "uAAED", "uAAF6", "uABE5", "uABE8", "uABED", "uFB1E", "uFE00", "uFE01", "uFE02", "uFE03", "uFE04", "uFE05", "uFE06", "uFE07", "uFE08", "uFE09", "uFE0A", "uFE0B", "uFE0C", "uFE0D", "uFE0E", "uFE0F", "uFE20", "uFE21", "uFE22", "uFE23", "uFE24", "uFE25", "uFE26", "uFE27", "uFE28", "uFE29", "uFE2A", "uFE2B", "uFE2C", "uFE2D", "uFE2E", "uFE2F"];
  var combiningMarks = a$1.concat(b);

  var splitChars = ["-", ";", ":", "&", "|", "u0E2F", // thai character pairannoi
  "u0EAF", // lao ellipsis
  "u0EC6", // lao ko la (word repetition)
  "u0ECC", // lao cancellation mark
  "u104A", // myanmar sign little section
  "u104B", // myanmar sign section
  "u104C", // myanmar symbol locative
  "u104D", // myanmar symbol completed
  "u104E", // myanmar symbol aforementioned
  "u104F", // myanmar symbol genitive
  "u2013", // en dash
  "u2014", // em dash
  "u2027", // simplified chinese hyphenation point
  "u3000", // simplified chinese ideographic space
  "u3001", // simplified chinese ideographic comma
  "u3002", // simplified chinese ideographic full stop
  "uFF0C", // full-width comma
  "uFF5E" // wave dash
  ];
  var prefixChars = ["'", "<", "(", "{", "[", "u00AB", // left-pointing double angle quotation mark
  "u300A", // left double angle bracket
  "u3008" // left angle bracket
  ];
  var suffixChars = ["'", ">", ")", "}", "]", ".", "!", "?", "/", "u00BB", // right-pointing double angle quotation mark
  "u300B", // right double angle bracket
  "u3009" // right angle bracket
  ].concat(splitChars);
  var burmeseRange = "\u1000-\u102A\u103F-\u1049\u1050-\u1055";
  var japaneseRange = "\u3040-\u309F\u30A0-\u30FF\uFF00-\uFF0B\uFF0D-\uFF5D\uFF5F-\uFF9F\u3400-\u4DBF";
  var chineseRange = "\u3400-\u9FBF";
  var laoRange = "\u0E81-\u0EAE\u0EB0-\u0EC4\u0EC8-\u0ECB\u0ECD-\u0EDD";
  var noSpaceRange = burmeseRange + chineseRange + japaneseRange + laoRange;
  var splitWords = new RegExp("(\\".concat(splitChars.join("|\\"), ")*[^\\s|\\").concat(splitChars.join("|\\"), "]*(\\").concat(splitChars.join("|\\"), ")*"), "g");
  var noSpaceLanguage = new RegExp("[".concat(noSpaceRange, "]"));
  var splitAllChars = new RegExp("(\\".concat(prefixChars.join("|\\"), ")*[").concat(noSpaceRange, "](\\").concat(suffixChars.join("|\\"), "|\\").concat(combiningMarks.join("|\\"), ")*|[a-z0-9]+"), "gi");
  /**
      @function textSplit
      @desc Splits a given sentence into an array of words.
      @param {String} sentence
  */

  function textSplit (sentence) {
    if (!noSpaceLanguage.test(sentence)) return stringify(sentence).match(splitWords).filter(function (w) {
      return w.length;
    });
    return merge(stringify(sentence).match(splitWords).map(function (d) {
      if (noSpaceLanguage.test(d)) return d.match(splitAllChars);
      return [d];
    }));
  }

  /**
      @function textWrap
      @desc Based on the defined styles and dimensions, breaks a string into an array of strings for each line of text.
  */

  function textWrap () {
    var fontFamily = "sans-serif",
        fontSize = 10,
        fontWeight = 400,
        height = 200,
        lineHeight,
        maxLines = null,
        overflow = false,
        split = textSplit,
        width = 200;
    /**
        The inner return object and wraps the text and returns the line data array.
        @private
    */

    function textWrap(sentence) {
      sentence = stringify(sentence);
      if (lineHeight === void 0) lineHeight = Math.ceil(fontSize * 1.4);
      var words = split(sentence);
      var style = {
        "font-family": fontFamily,
        "font-size": fontSize,
        "font-weight": fontWeight,
        "line-height": lineHeight
      };
      var line = 1,
          textProg = "",
          truncated = false,
          widthProg = 0;
      var lineData = [],
          sizes = measure(words, style),
          space = measure(" ", style);

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var wordWidth = sizes[words.indexOf(word)];
        word += sentence.slice(textProg.length + word.length).match("^( |\n)*", "g")[0];

        if (textProg.slice(-1) === "\n" || widthProg + wordWidth > width) {
          if (!i && !overflow) {
            truncated = true;
            break;
          }

          if (lineData.length >= line) lineData[line - 1] = trimRight(lineData[line - 1]);
          line++;

          if (lineHeight * line > height || wordWidth > width && !overflow || maxLines && line > maxLines) {
            truncated = true;
            break;
          }

          widthProg = 0;
          lineData.push(word);
        } else if (!i) lineData[0] = word;else lineData[line - 1] += word;

        textProg += word;
        widthProg += wordWidth;
        widthProg += word.match(/[\s]*$/g)[0].length * space;
      }

      return {
        lines: lineData,
        sentence: sentence,
        truncated: truncated,
        widths: measure(lineData, style),
        words: words
      };
    }
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family.
        @param {Function|String} [*value* = "sans-serif"]
    */


    textWrap.fontFamily = function (_) {
      return arguments.length ? (fontFamily = _, textWrap) : fontFamily;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size.
        @param {Function|Number} [*value* = 10]
    */


    textWrap.fontSize = function (_) {
      return arguments.length ? (fontSize = _, textWrap) : fontSize;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the font weight accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font weight.
        @param {Function|Number|String} [*value* = 400]
    */


    textWrap.fontWeight = function (_) {
      return arguments.length ? (fontWeight = _, textWrap) : fontWeight;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets height limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
        @param {Number} [*value* = 200]
    */


    textWrap.height = function (_) {
      return arguments.length ? (height = _, textWrap) : height;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#textWrap.fontSize) by default.
        @param {Function|Number} [*value*]
    */


    textWrap.lineHeight = function (_) {
      return arguments.length ? (lineHeight = _, textWrap) : lineHeight;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the maximum number of lines allowed when wrapping.
        @param {Function|Number} [*value*]
    */


    textWrap.maxLines = function (_) {
      return arguments.length ? (maxLines = _, textWrap) : maxLines;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the overflow to the specified boolean and returns this generator. If *value* is not specified, returns the current overflow value.
        @param {Boolean} [*value* = false]
    */


    textWrap.overflow = function (_) {
      return arguments.length ? (overflow = _, textWrap) : overflow;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
        @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to textWrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
    */


    textWrap.split = function (_) {
      return arguments.length ? (split = _, textWrap) : split;
    };
    /**
        @memberof textWrap
        @desc If *value* is specified, sets width limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
        @param {Number} [*value* = 200]
    */


    textWrap.width = function (_) {
      return arguments.length ? (width = _, textWrap) : width;
    };

    return textWrap;
  }

  function _typeof$4(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$4 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$4 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$4(obj);
  }

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$3(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$3(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$3(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$3(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$1(self, call) {
    if (call && (_typeof$4(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf$1(o) {
    _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$1(o);
  }

  function _inherits$1(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$1(subClass, superClass);
  }

  function _setPrototypeOf$1(o, p) {
    _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$1(o, p);
  }
  var defaultHtmlLookup = {
    i: "font-style: italic;",
    em: "font-style: italic;",
    b: "font-weight: bold;",
    strong: "font-weight: bold;"
  };
  /**
      @class TextBox
      @extends external:BaseClass
      @desc Creates a wrapped text box for each point in an array of data. See [this example](https://d3plus.org/examples/d3plus-text/getting-started/) for help getting started using the TextBox class.
  */

  var TextBox =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits$1(TextBox, _BaseClass);
    /**
        @memberof TextBox
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */


    function TextBox() {
      var _this;

      _classCallCheck$3(this, TextBox);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(TextBox).call(this));
      _this._ariaHidden = constant$3("false");
      _this._delay = 0;
      _this._duration = 0;

      _this._ellipsis = function (text, line) {
        return line ? "".concat(text.replace(/\.|,$/g, ""), "...") : "";
      };

      _this._fontColor = constant$3("black");
      _this._fontFamily = constant$3(["Roboto", "Helvetica Neue", "HelveticaNeue", "Helvetica", "Arial", "sans-serif"]);
      _this._fontMax = constant$3(50);
      _this._fontMin = constant$3(8);
      _this._fontOpacity = constant$3(1);
      _this._fontResize = constant$3(false);
      _this._fontSize = constant$3(10);
      _this._fontWeight = constant$3(400);
      _this._height = accessor("height", 200);
      _this._html = defaultHtmlLookup;

      _this._id = function (d, i) {
        return d.id || "".concat(i);
      };

      _this._lineHeight = function (d, i) {
        return _this._fontSize(d, i) * 1.2;
      };

      _this._maxLines = constant$3(null);
      _this._on = {};
      _this._overflow = constant$3(false);
      _this._padding = constant$3(0);
      _this._pointerEvents = constant$3("auto");
      _this._rotate = constant$3(0);

      _this._rotateAnchor = function (d) {
        return [d.w / 2, d.h / 2];
      };

      _this._split = textSplit;
      _this._text = accessor("text");
      _this._textAnchor = constant$3("start");
      _this._verticalAlign = constant$3("top");
      _this._width = accessor("width", 200);
      _this._x = accessor("x", 0);
      _this._y = accessor("y", 0);
      return _this;
    }
    /**
        @memberof TextBox
        @desc Renders the text boxes. If a *callback* is specified, it will be called once the shapes are done drawing.
        @param {Function} [*callback* = undefined]
    */


    _createClass$3(TextBox, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        if (this._select === void 0) this.select(_select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).node());
        var that = this;

        var boxes = this._select.selectAll(".d3plus-textBox").data(this._data.reduce(function (arr, d, i) {
          var t = _this2._text(d, i);

          if (t === void 0) return arr;
          t = trim(t);

          var resize = _this2._fontResize(d, i);

          var lHRatio = _this2._lineHeight(d, i) / _this2._fontSize(d, i);

          var fS = resize ? _this2._fontMax(d, i) : _this2._fontSize(d, i),
              lH = resize ? fS * lHRatio : _this2._lineHeight(d, i),
              line = 1,
              lineData = [],
              sizes,
              wrapResults;
          var style = {
            "font-family": fontExists(_this2._fontFamily(d, i)),
            "font-size": fS,
            "font-weight": _this2._fontWeight(d, i),
            "line-height": lH
          };
          var padding = parseSides(_this2._padding(d, i));
          var h = _this2._height(d, i) - (padding.top + padding.bottom),
              w = _this2._width(d, i) - (padding.left + padding.right);
          var wrapper = textWrap().fontFamily(style["font-family"]).fontSize(fS).fontWeight(style["font-weight"]).lineHeight(lH).maxLines(_this2._maxLines(d, i)).height(h).overflow(_this2._overflow(d, i)).width(w).split(_this2._split);

          var fMax = _this2._fontMax(d, i),
              fMin = _this2._fontMin(d, i),
              vA = _this2._verticalAlign(d, i),
              words = _this2._split(t, i);
          /**
              Figures out the lineData to be used for wrapping.
              @private
          */


          function checkSize() {
            var truncate = function truncate() {
              if (line < 1) lineData = [that._ellipsis("", line)];else lineData[line - 1] = that._ellipsis(lineData[line - 1], line);
            }; // Constraint the font size


            fS = max([fS, fMin]);
            fS = min([fS, fMax]);

            if (resize) {
              lH = fS * lHRatio;
              wrapper.fontSize(fS).lineHeight(lH);
              style["font-size"] = fS;
              style["line-height"] = lH;
            }

            wrapResults = wrapper(t);
            lineData = wrapResults.lines.filter(function (l) {
              return l !== "";
            });
            line = lineData.length;

            if (wrapResults.truncated) {
              if (resize) {
                fS--;

                if (fS < fMin) {
                  fS = fMin;
                  truncate();
                  return;
                } else checkSize();
              } else truncate();
            }
          }

          if (w > fMin && (h > lH || resize && h > fMin * lHRatio)) {
            if (resize) {
              sizes = measure(words, style);
              var areaMod = 1.165 + w / h * 0.1,
                  boxArea = w * h,
                  maxWidth = max(sizes),
                  textArea = sum(sizes, function (d) {
                return d * lH;
              }) * areaMod;

              if (maxWidth > w || textArea > boxArea) {
                var areaRatio = Math.sqrt(boxArea / textArea),
                    widthRatio = w / maxWidth;
                var sizeRatio = min([areaRatio, widthRatio]);
                fS = Math.floor(fS * sizeRatio);
              }

              var heightMax = Math.floor(h * 0.8);
              if (fS > heightMax) fS = heightMax;
            }

            checkSize();
          }

          if (lineData.length) {
            var tH = line * lH;

            var r = _this2._rotate(d, i);

            var yP = r === 0 ? vA === "top" ? 0 : vA === "middle" ? h / 2 - tH / 2 : h - tH : 0;
            yP -= lH * 0.1;
            arr.push({
              aH: _this2._ariaHidden(d, i),
              data: d,
              i: i,
              lines: lineData,
              fC: _this2._fontColor(d, i),
              fF: style["font-family"],
              fO: _this2._fontOpacity(d, i),
              fW: style["font-weight"],
              id: _this2._id(d, i),
              tA: _this2._textAnchor(d, i),
              vA: _this2._verticalAlign(d, i),
              widths: wrapResults.widths,
              fS: fS,
              lH: lH,
              w: w,
              h: h,
              r: r,
              x: _this2._x(d, i) + padding.left,
              y: _this2._y(d, i) + yP + padding.top
            });
          }

          return arr;
        }, []), function (d) {
          return _this2._id(d.data, d.i);
        });

        var t = transition().duration(this._duration);

        if (this._duration === 0) {
          boxes.exit().remove();
        } else {
          boxes.exit().transition().delay(this._duration).remove();
          boxes.exit().selectAll("text").transition(t).attr("opacity", 0).style("opacity", 0);
        }
        /**
         * Applies translate and rotate to a text element.
         * @param {D3Selection} text
         * @private
         */


        function rotate(text) {
          text.attr("transform", function (d, i) {
            var rotateAnchor = that._rotateAnchor(d, i);

            return "translate(".concat(d.x, ", ").concat(d.y, ") rotate(").concat(d.r, ", ").concat(rotateAnchor[0], ", ").concat(rotateAnchor[1], ")");
          });
        }

        var update = boxes.enter().append("g").attr("class", "d3plus-textBox").attr("id", function (d) {
          return "d3plus-textBox-".concat(strip(d.id));
        }).call(rotate).merge(boxes);
        var rtl = detectRTL();
        update.style("pointer-events", function (d) {
          return _this2._pointerEvents(d.data, d.i);
        }).each(function (d) {
          /**
              Sets the inner text content of each <text> element.
              @private
          */
          function textContent(text) {
            text[that._html ? "html" : "text"](function (t) {
              return trimRight(t).replace(/&([^\;&]*)/g, function (str, a) {
                return a === "amp" ? str : "&amp;".concat(a);
              }) // replaces all non-HTML ampersands with escaped entity
              .replace(/<([^A-z^/]+)/g, function (str, a) {
                return "&lt;".concat(a);
              }).replace(/<$/g, "&lt;") // replaces all non-HTML left angle brackets with escaped entity
              .replace(/(<[^>^\/]+>)([^<^>]+)$/g, function (str, a, b) {
                return "".concat(a).concat(b).concat(a.replace("<", "</"));
              }) // ands end tag to lines before mid-HTML break
              .replace(/^([^<^>]+)(<\/[^>]+>)/g, function (str, a, b) {
                return "".concat(b.replace("</", "<")).concat(a).concat(b);
              }) // ands start tag to lines after mid-HTML break
              .replace(/<([A-z]+)[^>]*>([^<^>]+)<\/[^>]+>/g, function (str, a, b) {
                var tag = that._html[a] ? "<tspan style=\"".concat(that._html[a], "\">") : "";
                return "".concat(tag.length ? tag : "").concat(b).concat(tag.length ? "</tspan>" : "");
              });
            });
          }
          /**
              Styles to apply to each <text> element.
              @private
          */


          function textStyle(text) {
            text.attr("aria-hidden", d.aH).attr("dir", rtl ? "rtl" : "ltr").attr("fill", d.fC).attr("text-anchor", d.tA).attr("font-family", d.fF).style("font-family", d.fF).attr("font-size", "".concat(d.fS, "px")).style("font-size", "".concat(d.fS, "px")).attr("font-weight", d.fW).style("font-weight", d.fW).attr("x", "".concat(d.tA === "middle" ? d.w / 2 : rtl ? d.tA === "start" ? d.w : 0 : d.tA === "end" ? d.w : 2 * Math.sin(Math.PI * d.r / 180), "px")).attr("y", function (t, i) {
              return d.r === 0 || d.vA === "top" ? "".concat((i + 1) * d.lH - (d.lH - d.fS), "px") : d.vA === "middle" ? "".concat((d.h + d.fS) / 2 - (d.lH - d.fS) + (i - d.lines.length / 2 + 0.5) * d.lH, "px") : "".concat(d.h - 2 * (d.lH - d.fS) - (d.lines.length - (i + 1)) * d.lH + 2 * Math.cos(Math.PI * d.r / 180), "px");
            });
          }

          var texts = _select(this).selectAll("text").data(d.lines);

          if (that._duration === 0) {
            texts.call(textContent).call(textStyle);
            texts.exit().remove();
            texts.enter().append("text").attr("dominant-baseline", "alphabetic").style("baseline-shift", "0%").attr("unicode-bidi", "bidi-override").call(textContent).call(textStyle).attr("opacity", d.fO).style("opacity", d.fO);
          } else {
            texts.call(textContent).transition(t).call(textStyle);
            texts.exit().transition(t).attr("opacity", 0).remove();
            texts.enter().append("text").attr("dominant-baseline", "alphabetic").style("baseline-shift", "0%").attr("opacity", 0).style("opacity", 0).call(textContent).call(textStyle).merge(texts).transition(t).delay(that._delay).call(textStyle).attr("opacity", d.fO).style("opacity", d.fO);
          }
        }).transition(t).call(rotate);
        var events = Object.keys(this._on),
            on = events.reduce(function (obj, e) {
          obj[e] = function (d, i) {
            return _this2._on[e](d.data, i);
          };

          return obj;
        }, {});

        for (var e = 0; e < events.length; e++) {
          update.on(events[e], on[events[e]]);
        }

        if (callback) setTimeout(callback, this._duration + 100);
        return this;
      }
      /**
          @memberof TextBox
          @desc If *value* is specified, sets the aria-hidden attribute to the specified function or string and returns the current class instance.
          @param {Function|String} *value*
          @chainable
      */

    }, {
      key: "ariaHidden",
      value: function ariaHidden(_) {
        return _ !== undefined ? (this._ariaHidden = typeof _ === "function" ? _ : constant$3(_), this) : this._ariaHidden;
      }
      /**
          @memberof TextBox
          @desc Sets the data array to the specified array. A text box will be drawn for each object in the array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof TextBox
          @desc Sets the animation delay to the specified number in milliseconds.
          @param {Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "delay",
      value: function delay(_) {
        return arguments.length ? (this._delay = _, this) : this._delay;
      }
      /**
          @memberof TextBox
          @desc Sets the animation duration to the specified number in milliseconds.
          @param {Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof TextBox
          @desc Sets the function that handles what to do when a line is truncated. It should return the new value for the line, and is passed 2 arguments: the String of text for the line in question, and the number of the line. By default, an ellipsis is added to the end of any line except if it is the first word that cannot fit (in that case, an empty string is returned).
          @param {Function|String} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(text, line) {
      return line ? text.replace(/\.|,$/g, "") + "..." : "";
      }
      */

    }, {
      key: "ellipsis",
      value: function ellipsis(_) {
        return arguments.length ? (this._ellipsis = typeof _ === "function" ? _ : constant$3(_), this) : this._ellipsis;
      }
      /**
          @memberof TextBox
          @desc Sets the font color to the specified accessor function or static string, which is inferred from the [DOM selection](#textBox.select) by default.
          @param {Function|String} [*value* = "black"]
          @chainable
      */

    }, {
      key: "fontColor",
      value: function fontColor(_) {
        return arguments.length ? (this._fontColor = typeof _ === "function" ? _ : constant$3(_), this) : this._fontColor;
      }
      /**
          @memberof TextBox
          @desc Defines the font-family to be used. The value passed can be either a *String* name of a font, a comma-separated list of font-family fallbacks, an *Array* of fallbacks, or a *Function* that returns either a *String* or an *Array*. If supplying multiple fallback fonts, the [fontExists](#fontExists) function will be used to determine the first available font on the client's machine.
          @param {Array|Function|String} [*value* = ["Roboto", "Helvetica Neue", "HelveticaNeue", "Helvetica", "Arial", "sans-serif"]]
          @chainable
      */

    }, {
      key: "fontFamily",
      value: function fontFamily(_) {
        return arguments.length ? (this._fontFamily = typeof _ === "function" ? _ : constant$3(_), this) : this._fontFamily;
      }
      /**
          @memberof TextBox
          @desc Sets the maximum font size to the specified accessor function or static number (which corresponds to pixel units), which is used when [dynamically resizing fonts](#textBox.fontResize).
          @param {Function|Number} [*value* = 50]
          @chainable
      */

    }, {
      key: "fontMax",
      value: function fontMax(_) {
        return arguments.length ? (this._fontMax = typeof _ === "function" ? _ : constant$3(_), this) : this._fontMax;
      }
      /**
          @memberof TextBox
          @desc Sets the minimum font size to the specified accessor function or static number (which corresponds to pixel units), which is used when [dynamically resizing fonts](#textBox.fontResize).
          @param {Function|Number} [*value* = 8]
          @chainable
      */

    }, {
      key: "fontMin",
      value: function fontMin(_) {
        return arguments.length ? (this._fontMin = typeof _ === "function" ? _ : constant$3(_), this) : this._fontMin;
      }
      /**
          @memberof TextBox
          @desc Sets the font opacity to the specified accessor function or static number between 0 and 1.
          @param {Function|Number} [*value* = 1]
          @chainable
       */

    }, {
      key: "fontOpacity",
      value: function fontOpacity(_) {
        return arguments.length ? (this._fontOpacity = typeof _ === "function" ? _ : constant$3(_), this) : this._fontOpacity;
      }
      /**
          @memberof TextBox
          @desc Toggles font resizing, which can either be defined as a static boolean for all data points, or an accessor function that returns a boolean. See [this example](http://d3plus.org/examples/d3plus-text/resizing-text/) for a side-by-side comparison.
          @param {Function|Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "fontResize",
      value: function fontResize(_) {
        return arguments.length ? (this._fontResize = typeof _ === "function" ? _ : constant$3(_), this) : this._fontResize;
      }
      /**
          @memberof TextBox
          @desc Sets the font size to the specified accessor function or static number (which corresponds to pixel units), which is inferred from the [DOM selection](#textBox.select) by default.
          @param {Function|Number} [*value* = 10]
          @chainable
      */

    }, {
      key: "fontSize",
      value: function fontSize(_) {
        return arguments.length ? (this._fontSize = typeof _ === "function" ? _ : constant$3(_), this) : this._fontSize;
      }
      /**
          @memberof TextBox
          @desc Sets the font weight to the specified accessor function or static number, which is inferred from the [DOM selection](#textBox.select) by default.
          @param {Function|Number|String} [*value* = 400]
          @chainable
      */

    }, {
      key: "fontWeight",
      value: function fontWeight(_) {
        return arguments.length ? (this._fontWeight = typeof _ === "function" ? _ : constant$3(_), this) : this._fontWeight;
      }
      /**
          @memberof TextBox
          @desc Sets the height for each box to the specified accessor function or static number.
          @param {Function|Number} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d) {
      return d.height || 200;
      }
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$3(_), this) : this._height;
      }
      /**
          @memberof TextBox
          @desc Configures the ability to render simple HTML tags. Defaults to supporting `<b>`, `<strong>`, `<i>`, and `<em>`, set to false to disable or provide a mapping of tags to svg styles
          @param {Object|Boolean} [*value* = {
                    i: 'font-style: italic;',
                    em: 'font-style: italic;',
                    b: 'font-weight: bold;',
                    strong: 'font-weight: bold;'
                }]
          @chainable
      */

    }, {
      key: "html",
      value: function html(_) {
        return arguments.length ? (this._html = typeof _ === "boolean" ? _ ? defaultHtmlLookup : false : _, this) : this._html;
      }
      /**
          @memberof TextBox
          @desc Defines the unique id for each box to the specified accessor function or static number.
          @param {Function|Number} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d, i) {
      return d.id || i + "";
      }
      */

    }, {
      key: "id",
      value: function id(_) {
        return arguments.length ? (this._id = typeof _ === "function" ? _ : constant$3(_), this) : this._id;
      }
      /**
          @memberof TextBox
          @desc Sets the line height to the specified accessor function or static number, which is 1.2 times the [font size](#textBox.fontSize) by default.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "lineHeight",
      value: function lineHeight(_) {
        return arguments.length ? (this._lineHeight = typeof _ === "function" ? _ : constant$3(_), this) : this._lineHeight;
      }
      /**
          @memberof TextBox
          @desc Restricts the maximum number of lines to wrap onto, which is null (unlimited) by default.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "maxLines",
      value: function maxLines(_) {
        return arguments.length ? (this._maxLines = typeof _ === "function" ? _ : constant$3(_), this) : this._maxLines;
      }
      /**
          @memberof TextBox
          @desc Sets the text overflow to the specified accessor function or static boolean.
          @param {Function|Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "overflow",
      value: function overflow(_) {
        return arguments.length ? (this._overflow = typeof _ === "function" ? _ : constant$3(_), this) : this._overflow;
      }
      /**
          @memberof TextBox
          @desc Sets the padding to the specified accessor function, CSS shorthand string, or static number, which is 0 by default.
          @param {Function|Number|String} [*value*]
          @chainable
      */

    }, {
      key: "padding",
      value: function padding(_) {
        return arguments.length ? (this._padding = typeof _ === "function" ? _ : constant$3(_), this) : this._padding;
      }
      /**
          @memberof TextBox
          @desc Sets the pointer-events to the specified accessor function or static string.
          @param {Function|String} [*value* = "auto"]
          @chainable
      */

    }, {
      key: "pointerEvents",
      value: function pointerEvents(_) {
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$3(_), this) : this._pointerEvents;
      }
      /**
          @memberof TextBox
          @desc Sets the rotate percentage for each box to the specified accessor function or static string.
          @param {Function|Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "rotate",
      value: function rotate(_) {
        return arguments.length ? (this._rotate = typeof _ === "function" ? _ : constant$3(_), this) : this._rotate;
      }
      /**
          @memberof TextBox
          @desc Sets the anchor point around which to rotate the text box.
          @param {Function|Number[]}
          @chainable
       */

    }, {
      key: "rotateAnchor",
      value: function rotateAnchor(_) {
        return arguments.length ? (this._rotateAnchor = typeof _ === "function" ? _ : constant$3(_), this) : this._rotateAnchor;
      }
      /**
          @memberof TextBox
          @desc Sets the SVG container element to the specified d3 selector or DOM element. If not explicitly specified, an SVG element will be added to the page for use.
          @param {String|HTMLElement} [*selector*]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = _select(_), this) : this._select;
      }
      /**
          @memberof TextBox
          @desc Sets the word split behavior to the specified function, which when passed a string is expected to return that string split into an array of words.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "split",
      value: function split(_) {
        return arguments.length ? (this._split = _, this) : this._split;
      }
      /**
          @memberof TextBox
          @desc Sets the text for each box to the specified accessor function or static string.
          @param {Function|String} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d) {
      return d.text;
      }
      */

    }, {
      key: "text",
      value: function text(_) {
        return arguments.length ? (this._text = typeof _ === "function" ? _ : constant$3(_), this) : this._text;
      }
      /**
          @memberof TextBox
          @desc Sets the horizontal text anchor to the specified accessor function or static string, whose values are analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.
          @param {Function|String} [*value* = "start"]
          @chainable
      */

    }, {
      key: "textAnchor",
      value: function textAnchor(_) {
        return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : constant$3(_), this) : this._textAnchor;
      }
      /**
          @memberof TextBox
          @desc Sets the vertical alignment to the specified accessor function or static string. Accepts `"top"`, `"middle"`, and `"bottom"`.
          @param {Function|String} [*value* = "top"]
          @chainable
      */

    }, {
      key: "verticalAlign",
      value: function verticalAlign(_) {
        return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : constant$3(_), this) : this._verticalAlign;
      }
      /**
          @memberof TextBox
          @desc Sets the width for each box to the specified accessor function or static number.
          @param {Function|Number} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d) {
      return d.width || 200;
      }
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$3(_), this) : this._width;
      }
      /**
          @memberof TextBox
          @desc Sets the x position for each box to the specified accessor function or static number. The number given should correspond to the left side of the textBox.
          @param {Function|Number} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d) {
      return d.x || 0;
      }
      */

    }, {
      key: "x",
      value: function x(_) {
        return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$3(_), this) : this._x;
      }
      /**
          @memberof TextBox
          @desc Sets the y position for each box to the specified accessor function or static number. The number given should correspond to the top side of the textBox.
          @param {Function|Number} [*value*]
          @chainable
          @example <caption>default accessor</caption>
      function(d) {
      return d.y || 0;
      }
      */

    }, {
      key: "y",
      value: function y(_) {
        return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$3(_), this) : this._y;
      }
    }]);

    return TextBox;
  }(BaseClass);

  /**
      @function pointDistanceSquared
      @desc Returns the squared euclidean distance between two points.
      @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
      @returns {Number}
  */
  var pointDistanceSquared = (function (p1, p2) {
    var dx = p2[0] - p1[0],
        dy = p2[1] - p1[1];
    return dx * dx + dy * dy;
  });

  /**
      @function pointDistance
      @desc Calculates the pixel distance between two points.
      @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
      @returns {Number}
  */

  var pointDistance = (function (p1, p2) {
    return Math.sqrt(pointDistanceSquared(p1, p2));
  });

  function _typeof$5(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$5 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$5 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$5(obj);
  }

  function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$4(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$4(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$4(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$4(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$2(self, call) {
    if (call && (_typeof$5(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$2(self);
  }

  function _assertThisInitialized$2(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf$2(o) {
    _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$2(o);
  }

  function _inherits$2(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$2(subClass, superClass);
  }

  function _setPrototypeOf$2(o, p) {
    _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$2(o, p);
  }
  /**
      @class Shape
      @extends external:BaseClass
      @desc An abstracted class for generating shapes.
  */

  var Shape =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits$2(Shape, _BaseClass);
    /**
        @memberof Shape
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */


    function Shape() {
      var _this;

      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "g";

      _classCallCheck$4(this, Shape);

      _this = _possibleConstructorReturn$2(this, _getPrototypeOf$2(Shape).call(this));
      _this._activeOpacity = 0.25;
      _this._activeStyle = {
        "stroke": function stroke(d, i) {
          var c = _this._fill(d, i);

          if (["transparent", "none"].includes(c)) c = _this._stroke(d, i);
          return color$1(c).darker(1);
        },
        "stroke-width": function strokeWidth(d, i) {
          var s = _this._strokeWidth(d, i) || 1;
          return s * 3;
        }
      };
      _this._ariaLabel = constant$3("");
      _this._backgroundImage = constant$3(false);
      _this._backgroundImageClass = new Image();
      _this._data = [];
      _this._duration = 600;
      _this._fill = constant$3("black");
      _this._fillOpacity = constant$3(1);
      _this._hoverOpacity = 0.5;
      _this._hoverStyle = {
        "stroke": function stroke(d, i) {
          var c = _this._fill(d, i);

          if (["transparent", "none"].includes(c)) c = _this._stroke(d, i);
          return color$1(c).darker(0.5);
        },
        "stroke-width": function strokeWidth(d, i) {
          var s = _this._strokeWidth(d, i) || 1;
          return s * 2;
        }
      };

      _this._id = function (d, i) {
        return d.id !== void 0 ? d.id : i;
      };

      _this._label = constant$3(false);
      _this._labelClass = new TextBox();
      _this._labelConfig = {
        fontColor: function fontColor(d, i) {
          return colorContrast(_this._fill(d, i));
        },
        fontSize: 12,
        padding: 5
      };
      _this._name = "Shape";
      _this._opacity = constant$3(1);
      _this._pointerEvents = constant$3("visiblePainted");
      _this._role = constant$3("presentation");
      _this._rotate = constant$3(0);
      _this._rx = constant$3(0);
      _this._ry = constant$3(0);
      _this._scale = constant$3(1);
      _this._shapeRendering = constant$3("geometricPrecision");

      _this._stroke = function (d, i) {
        return color$1(_this._fill(d, i)).darker(1);
      };

      _this._strokeDasharray = constant$3("0");
      _this._strokeLinecap = constant$3("butt");
      _this._strokeOpacity = constant$3(1);
      _this._strokeWidth = constant$3(0);
      _this._tagName = tagName;
      _this._textAnchor = constant$3("start");
      _this._vectorEffect = constant$3("non-scaling-stroke");
      _this._verticalAlign = constant$3("top");
      _this._x = accessor("x", 0);
      _this._y = accessor("y", 0);
      return _this;
    }
    /**
        @memberof Shape
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */


    _createClass$4(Shape, [{
      key: "_aes",
      value: function _aes() {
        return {};
      }
      /**
          @memberof Shape
          @desc Adds event listeners to each shape group or hit area.
          @param {D3Selection} *update* The update cycle of the data binding.
          @private
      */

    }, {
      key: "_applyEvents",
      value: function _applyEvents(handler) {
        var _this2 = this;

        var events = Object.keys(this._on);

        var _loop = function _loop(e) {
          handler.on(events[e], function (d, i) {
            if (!_this2._on[events[e]]) return;
            if (d.i !== void 0) i = d.i;

            if (d.nested && d.values) {
              var cursor = mouse(_this2._select.node()),
                  values = d.values.map(function (d) {
                return pointDistance(cursor, [_this2._x(d, i), _this2._y(d, i)]);
              });
              d = d.values[values.indexOf(min(values))];
            }

            _this2._on[events[e]].bind(_this2)(d, i);
          });
        };

        for (var e = 0; e < events.length; e++) {
          _loop(e);
        }
      }
      /**
          @memberof Shape
          @desc Provides the updated styling to the given shape elements.
          @param {HTMLElement} *elem*
          @param {Object} *style*
          @private
      */

    }, {
      key: "_updateStyle",
      value: function _updateStyle(elem, style) {
        var that = this;
        if (elem.size() && elem.node().tagName === "g") elem = elem.selectAll("*");
        /**
            @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
            @param {Object} *d* data point
            @param {Number} *i* index
            @private
        */

        function styleLogic(d, i) {
          return typeof this !== "function" ? this : d.nested && d.key && d.values ? this(d.values[0], that._data.indexOf(d.values[0])) : this(d, i);
        }

        var styleObject = {};

        for (var key in style) {
          if ({}.hasOwnProperty.call(style, key)) {
            styleObject[key] = styleLogic.bind(style[key]);
          }
        }

        elem.transition().duration(0).call(attrize, styleObject);
      }
      /**
          @memberof Shape
          @desc Provides the default styling to the shape elements.
          @param {HTMLElement} *elem*
          @private
      */

    }, {
      key: "_applyStyle",
      value: function _applyStyle(elem) {
        var that = this;
        if (elem.size() && elem.node().tagName === "g") elem = elem.selectAll("*");
        /**
            @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
            @param {Object} *d* data point
            @param {Number} *i* index
            @private
        */

        function styleLogic(d, i) {
          return typeof this !== "function" ? this : d.nested && d.key && d.values ? this(d.values[0], that._data.indexOf(d.values[0])) : this(d, i);
        }

        elem.attr("fill", styleLogic.bind(this._fill)).attr("fill-opacity", styleLogic.bind(this._fillOpacity)).attr("rx", styleLogic.bind(this._rx)).attr("ry", styleLogic.bind(this._ry)).attr("stroke", styleLogic.bind(this._stroke)).attr("stroke-dasharray", styleLogic.bind(this._strokeDasharray)).attr("stroke-linecap", styleLogic.bind(this._strokeLinecap)).attr("stroke-opacity", styleLogic.bind(this._strokeOpacity)).attr("stroke-width", styleLogic.bind(this._strokeWidth)).attr("vector-effect", styleLogic.bind(this._vectorEffect));
      }
      /**
          @memberof Shape
          @desc Calculates the transform for the group elements.
          @param {HTMLElement} *elem*
          @private
      */

    }, {
      key: "_applyTransform",
      value: function _applyTransform(elem) {
        var _this3 = this;

        elem.attr("transform", function (d, i) {
          return "\n        translate(".concat(d.__d3plusShape__ ? d.translate ? d.translate : "".concat(_this3._x(d.data, d.i), ",").concat(_this3._y(d.data, d.i)) : "".concat(_this3._x(d, i), ",").concat(_this3._y(d, i)), ")\n        scale(").concat(d.__d3plusShape__ ? d.scale || _this3._scale(d.data, d.i) : _this3._scale(d, i), ")\n        rotate(").concat(d.__d3plusShape__ ? d.rotate ? d.rotate : _this3._rotate(d.data || d, d.i) : _this3._rotate(d.data || d, d.i), ")");
        });
      }
      /**
          @memberof Shape
          @desc Checks for nested data and uses the appropriate variables for accessor functions.
          @param {HTMLElement} *elem*
          @private
      */

    }, {
      key: "_nestWrapper",
      value: function _nestWrapper(method) {
        return function (d, i) {
          return method(d.__d3plusShape__ ? d.data : d, d.__d3plusShape__ ? d.i : i);
        };
      }
      /**
          @memberof Shape
          @desc Modifies existing shapes to show active status.
          @private
      */

    }, {
      key: "_renderActive",
      value: function _renderActive() {
        var that = this;

        this._group.selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox").each(function (d, i) {
          if (!d) d = {};
          if (!d.parentNode) d.parentNode = this.parentNode;
          var parent = d.parentNode;
          if (_select(this).classed("d3plus-textBox")) d = d.data;

          if (d.__d3plusShape__ || d.__d3plus__) {
            while (d && (d.__d3plusShape__ || d.__d3plus__)) {
              i = d.i;
              d = d.data;
            }
          } else i = that._data.indexOf(d);

          var group = !that._active || typeof that._active !== "function" || !that._active(d, i) ? parent : that._activeGroup.node();

          if (group !== this.parentNode) {
            group.appendChild(this);

            if (this.className.baseVal.includes("d3plus-Shape")) {
              if (parent === group) _select(this).call(that._applyStyle.bind(that));else _select(this).call(that._updateStyle.bind(that, _select(this), that._activeStyle));
            }
          }
        }); // this._renderImage();
        // this._renderLabels();


        this._group.selectAll("g.d3plus-".concat(this._name, "-shape, g.d3plus-").concat(this._name, "-image, g.d3plus-").concat(this._name, "-text")).attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);
      }
      /**
          @memberof Shape
          @desc Modifies existing shapes to show hover status.
          @private
      */

    }, {
      key: "_renderHover",
      value: function _renderHover() {
        var that = this;

        this._group.selectAll("g.d3plus-".concat(this._name, "-shape, g.d3plus-").concat(this._name, "-image, g.d3plus-").concat(this._name, "-text, g.d3plus-").concat(this._name, "-hover")).selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox").each(function (d, i) {
          if (!d) d = {};
          if (!d.parentNode) d.parentNode = this.parentNode;
          var parent = d.parentNode;
          if (_select(this).classed("d3plus-textBox")) d = d.data;

          if (d.__d3plusShape__ || d.__d3plus__) {
            while (d && (d.__d3plusShape__ || d.__d3plus__)) {
              i = d.i;
              d = d.data;
            }
          } else i = that._data.indexOf(d);

          var group = !that._hover || typeof that._hover !== "function" || !that._hover(d, i) ? parent : that._hoverGroup.node();
          if (group !== this.parentNode) group.appendChild(this);

          if (this.className.baseVal.includes("d3plus-Shape")) {
            if (parent === group) _select(this).call(that._applyStyle.bind(that));else _select(this).call(that._updateStyle.bind(that, _select(this), that._hoverStyle));
          }
        }); // this._renderImage();
        // this._renderLabels();


        this._group.selectAll("g.d3plus-".concat(this._name, "-shape, g.d3plus-").concat(this._name, "-image, g.d3plus-").concat(this._name, "-text")).attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);
      }
      /**
          @memberof Shape
          @desc Adds background image to each shape group.
          @private
      */

    }, {
      key: "_renderImage",
      value: function _renderImage() {
        var _this4 = this;

        var imageData = [];

        this._update.merge(this._enter).data().forEach(function (datum, i) {
          var aes = _this4._aes(datum, i);

          if (aes.r || aes.width && aes.height) {
            var d = datum;

            if (datum.nested && datum.key && datum.values) {
              d = datum.values[0];
              i = _this4._data.indexOf(d);
            }

            var height = aes.r ? aes.r * 2 : aes.height,
                url = _this4._backgroundImage(d, i),
                width = aes.r ? aes.r * 2 : aes.width;

            if (url) {
              var x = d.__d3plusShape__ ? d.translate ? d.translate[0] : _this4._x(d.data, d.i) : _this4._x(d, i),
                  y = d.__d3plusShape__ ? d.translate ? d.translate[1] : _this4._y(d.data, d.i) : _this4._y(d, i);
              if (aes.x) x += aes.x;
              if (aes.y) y += aes.y;

              if (d.__d3plusShape__) {
                d = d.data;
                i = d.i;
              }

              imageData.push({
                __d3plus__: true,
                data: d,
                height: height,
                i: i,
                id: _this4._id(d, i),
                url: url,
                width: width,
                x: x + -width / 2,
                y: y + -height / 2
              });
            }
          }
        });

        this._backgroundImageClass.data(imageData).duration(this._duration).opacity(this._nestWrapper(this._opacity)).pointerEvents("none").select(elem("g.d3plus-".concat(this._name, "-image"), {
          parent: this._group,
          update: {
            opacity: this._active ? this._activeOpacity : 1
          }
        }).node()).render();
      }
      /**
          @memberof Shape
          @desc Adds labels to each shape group.
          @private
      */

    }, {
      key: "_renderLabels",
      value: function _renderLabels() {
        var _this5 = this;

        var labelData = [];

        this._update.merge(this._enter).data().forEach(function (datum, i) {
          var d = datum;

          if (datum.nested && datum.key && datum.values) {
            d = datum.values[0];
            i = _this5._data.indexOf(d);
          }

          var labels = _this5._label(d, i);

          if (_this5._labelBounds && labels !== false && labels !== undefined && labels !== null) {
            var bounds = _this5._labelBounds(d, i, _this5._aes(datum, i));

            if (bounds) {
              if (labels.constructor !== Array) labels = [labels];
              var x = d.__d3plusShape__ ? d.translate ? d.translate[0] : _this5._x(d.data, d.i) : _this5._x(d, i),
                  y = d.__d3plusShape__ ? d.translate ? d.translate[1] : _this5._y(d.data, d.i) : _this5._y(d, i);

              if (d.__d3plusShape__) {
                d = d.data;
                i = d.i;
              }

              for (var l = 0; l < labels.length; l++) {
                var b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds);

                var rotate = _this5._rotate(d, i);

                var r = d.labelConfig && d.labelConfig.rotate ? d.labelConfig.rotate : bounds.angle !== undefined ? bounds.angle : 0;
                r += rotate;
                var rotateAnchor = rotate !== 0 ? [b.x * -1 || 0, b.y * -1 || 0] : [b.width / 2, b.height / 2];
                labelData.push({
                  __d3plus__: true,
                  data: d,
                  height: b.height,
                  l: l,
                  id: "".concat(_this5._id(d, i), "_").concat(l),
                  r: r,
                  rotateAnchor: rotateAnchor,
                  text: labels[l],
                  width: b.width,
                  x: x + b.x,
                  y: y + b.y
                });
              }
            }
          }
        });

        this._labelClass.data(labelData).duration(this._duration).fontOpacity(this._nestWrapper(this._opacity)).pointerEvents("none").rotate(function (d) {
          return d.__d3plus__ ? d.r : d.data.r;
        }).rotateAnchor(function (d) {
          return d.__d3plus__ ? d.rotateAnchor : d.data.rotateAnchor;
        }).select(elem("g.d3plus-".concat(this._name, "-text"), {
          parent: this._group,
          update: {
            opacity: this._active ? this._activeOpacity : 1
          }
        }).node()).config(configPrep.bind(this)(this._labelConfig)).render();
      }
      /**
          @memberof Shape
          @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
          @param {Function} [*callback*]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this6 = this;

        if (this._select === void 0) {
          this.select(_select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
        }

        this._transition = transition().duration(this._duration);
        var data = this._data,
            key = this._id;

        if (this._dataFilter) {
          data = this._dataFilter(data);
          if (data.key) key = data.key;
        }

        if (this._sort) {
          data = data.sort(function (a, b) {
            while (a.__d3plusShape__ || a.__d3plus__) {
              a = a.data;
            }

            while (b.__d3plusShape__ || b.__d3plus__) {
              b = b.data;
            }

            return _this6._sort(a, b);
          });
        }

        selectAll("g.d3plus-".concat(this._name, "-hover > *, g.d3plus-").concat(this._name, "-active > *")).each(function (d) {
          if (d && d.parentNode) d.parentNode.appendChild(this);else this.parentNode.removeChild(this);
        }); // Makes the update state of the group selection accessible.

        this._group = elem("g.d3plus-".concat(this._name, "-group"), {
          parent: this._select
        });
        var update = this._update = elem("g.d3plus-".concat(this._name, "-shape"), {
          parent: this._group,
          update: {
            opacity: this._active ? this._activeOpacity : 1
          }
        }).selectAll(".d3plus-".concat(this._name)).data(data, key); // Orders and transforms the updating Shapes.

        update.order();

        if (this._duration) {
          update.transition(this._transition).call(this._applyTransform.bind(this));
        } else {
          update.call(this._applyTransform.bind(this));
        } // Makes the enter state of the group selection accessible.


        var enter = this._enter = update.enter().append(this._tagName).attr("class", function (d, i) {
          return "d3plus-Shape d3plus-".concat(_this6._name, " d3plus-id-").concat(strip(_this6._nestWrapper(_this6._id)(d, i)));
        }).call(this._applyTransform.bind(this)).attr("aria-label", this._ariaLabel).attr("role", this._role).attr("opacity", this._nestWrapper(this._opacity));
        var enterUpdate = enter.merge(update);
        var enterUpdateRender = enterUpdate.attr("shape-rendering", this._nestWrapper(this._shapeRendering));

        if (this._duration) {
          enterUpdateRender = enterUpdateRender.attr("pointer-events", "none").transition(this._transition).transition().delay(100).attr("pointer-events", this._pointerEvents);
        }

        enterUpdateRender.attr("opacity", this._nestWrapper(this._opacity)); // Makes the exit state of the group selection accessible.

        var exit = this._exit = update.exit();
        if (this._duration) exit.transition().delay(this._duration).remove();else exit.remove();

        this._renderImage();

        this._renderLabels();

        this._hoverGroup = elem("g.d3plus-".concat(this._name, "-hover"), {
          parent: this._group
        });
        this._activeGroup = elem("g.d3plus-".concat(this._name, "-active"), {
          parent: this._group
        });

        var hitAreas = this._group.selectAll(".d3plus-HitArea").data(this._hitArea ? data : [], key);

        hitAreas.order().call(this._applyTransform.bind(this));
        var isLine = this._name === "Line";
        isLine && this._path.curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).defined(this._defined).x(this._x).y(this._y);
        var hitEnter = hitAreas.enter().append(isLine ? "path" : "rect").attr("class", function (d, i) {
          return "d3plus-HitArea d3plus-id-".concat(strip(_this6._nestWrapper(_this6._id)(d, i)));
        }).attr("fill", "black").attr("stroke", "black").attr("pointer-events", "painted").attr("opacity", 0).call(this._applyTransform.bind(this));
        var that = this;
        var hitUpdates = hitAreas.merge(hitEnter).each(function (d) {
          var i = that._data.indexOf(d);

          var h = that._hitArea(d, i, that._aes(d, i));

          return h && !(that._name === "Line" && parseFloat(that._strokeWidth(d, i)) > 10) ? _select(this).call(attrize, h) : _select(this).remove();
        });
        hitAreas.exit().remove();

        this._applyEvents(this._hitArea ? hitUpdates : enterUpdate);

        setTimeout(function () {
          if (_this6._active) _this6._renderActive();else if (_this6._hover) _this6._renderHover();
          if (callback) callback();
        }, this._duration + 100);
        return this;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "active",
      value: function active(_) {
        if (!arguments.length || _ === undefined) return this._active;
        this._active = _;

        if (this._group) {
          // this._renderImage();
          // this._renderLabels();
          this._renderActive();
        }

        return this;
      }
      /**
          @memberof Shape
          @desc When shapes are active, this is the opacity of any shape that is not active.
          @param {Number} *value* = 0.25
          @chainable
      */

    }, {
      key: "activeOpacity",
      value: function activeOpacity(_) {
        return arguments.length ? (this._activeOpacity = _, this) : this._activeOpacity;
      }
      /**
          @memberof Shape
          @desc The style to apply to active shapes.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "activeStyle",
      value: function activeStyle(_) {
        return arguments.length ? (this._activeStyle = assign({}, this._activeStyle, _), this) : this._activeStyle;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the aria-label attribute to the specified function or string and returns the current class instance.
          @param {Function|String} *value*
          @chainable
      */

    }, {
      key: "ariaLabel",
      value: function ariaLabel(_) {
        return _ !== undefined ? (this._ariaLabel = typeof _ === "function" ? _ : constant$3(_), this) : this._ariaLabel;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = false]
          @chainable
      */

    }, {
      key: "backgroundImage",
      value: function backgroundImage(_) {
        return arguments.length ? (this._backgroundImage = typeof _ === "function" ? _ : constant$3(_), this) : this._backgroundImage;
      }
      /**
          @memberof Shape
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Shape
          @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
          @param {Number} [*ms* = 600]
          @chainable
      */

    }, {
      key: "duration",
      value: function duration(_) {
        return arguments.length ? (this._duration = _, this) : this._duration;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = "black"]
          @chainable
      */

    }, {
      key: "fill",
      value: function fill(_) {
        return arguments.length ? (this._fill = typeof _ === "function" ? _ : constant$3(_), this) : this._fill;
      }
      /**
          @memberof Shape
          @desc Defines the "fill-opacity" attribute for the shapes.
          @param {Function|Number} [*value* = 1]
          @chainable
      */

    }, {
      key: "fillOpacity",
      value: function fillOpacity(_) {
        return arguments.length ? (this._fillOpacity = typeof _ === "function" ? _ : constant$3(_), this) : this._fillOpacity;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "hover",
      value: function hover(_) {
        if (!arguments.length || _ === void 0) return this._hover;
        this._hover = _;

        if (this._group) {
          // this._renderImage();
          // this._renderLabels();
          this._renderHover();
        }

        return this;
      }
      /**
          @memberof Shape
          @desc The style to apply to hovered shapes.
          @param {Object} *value*
          @chainable
       */

    }, {
      key: "hoverStyle",
      value: function hoverStyle(_) {
        return arguments.length ? (this._hoverStyle = assign({}, this._hoverStyle, _), this) : this._hoverStyle;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the hover opacity to the specified function and returns the current class instance.
          @param {Number} [*value* = 0.5]
          @chainable
      */

    }, {
      key: "hoverOpacity",
      value: function hoverOpacity(_) {
        return arguments.length ? (this._hoverOpacity = _, this) : this._hoverOpacity;
      }
      /**
          @memberof Shape
          @desc If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.
          @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`.
          @chainable
          @example
      function(d, i, shape) {
      return {
        "width": shape.width,
        "height": shape.height,
        "x": -shape.width / 2,
        "y": -shape.height / 2
      };
      }
      */

    }, {
      key: "hitArea",
      value: function hitArea(_) {
        return arguments.length ? (this._hitArea = typeof _ === "function" ? _ : constant$3(_), this) : this._hitArea;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "id",
      value: function id(_) {
        return arguments.length ? (this._id = _, this) : this._id;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.
          @param {Function|String|Array} [*value*]
          @chainable
      */

    }, {
      key: "label",
      value: function label(_) {
        return arguments.length ? (this._label = typeof _ === "function" ? _ : constant$3(_), this) : this._label;
      }
      /**
          @memberof Shape
          @desc If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.
          @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
          @chainable
          @example
      function(d, i, shape) {
      return {
        "width": shape.width,
        "height": shape.height,
        "x": -shape.width / 2,
        "y": -shape.height / 2
      };
      }
      */

    }, {
      key: "labelBounds",
      value: function labelBounds(_) {
        return arguments.length ? (this._labelBounds = typeof _ === "function" ? _ : constant$3(_), this) : this._labelBounds;
      }
      /**
          @memberof Shape
          @desc A pass-through to the config method of the TextBox class used to create a shape's labels.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "labelConfig",
      value: function labelConfig(_) {
        return arguments.length ? (this._labelConfig = assign(this._labelConfig, _), this) : this._labelConfig;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance.
          @param {Number} [*value* = 1]
          @chainable
      */

    }, {
      key: "opacity",
      value: function opacity(_) {
        return arguments.length ? (this._opacity = typeof _ === "function" ? _ : constant$3(_), this) : this._opacity;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the pointerEvents accessor to the specified function or string and returns the current class instance.
          @param {String} [*value*]
          @chainable
       */

    }, {
      key: "pointerEvents",
      value: function pointerEvents(_) {
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$3(_), this) : this._pointerEvents;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the role attribute to the specified function or string and returns the current class instance.
          @param {Function|String} *value*
          @chainable
      */

    }, {
      key: "role",
      value: function role(_) {
        return _ !== undefined ? (this._role = typeof _ === "function" ? _ : constant$3(_), this) : this._role;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the rotate accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value* = 0]
          @chainable
       */

    }, {
      key: "rotate",
      value: function rotate(_) {
        return arguments.length ? (this._rotate = typeof _ === "function" ? _ : constant$3(_), this) : this._rotate;
      }
      /**
          @memberof Shape
          @desc Defines the "rx" attribute for the shapes.
          @param {Function|Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "rx",
      value: function rx(_) {
        return arguments.length ? (this._rx = typeof _ === "function" ? _ : constant$3(_), this) : this._rx;
      }
      /**
          @memberof Shape
          @desc Defines the "rx" attribute for the shapes.
          @param {Function|Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "ry",
      value: function ry(_) {
        return arguments.length ? (this._ry = typeof _ === "function" ? _ : constant$3(_), this) : this._ry;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance.
          @param {Function|Number} [*value* = 1]
          @chainable
      */

    }, {
      key: "scale",
      value: function scale(_) {
        return arguments.length ? (this._scale = typeof _ === "function" ? _ : constant$3(_), this) : this._scale;
      }
      /**
          @memberof Shape
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = _select(_), this) : this._select;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = "geometricPrecision"]
          @chainable
          @example
      function(d) {
      return d.x;
      }
      */

    }, {
      key: "shapeRendering",
      value: function shapeRendering(_) {
        return arguments.length ? (this._shapeRendering = typeof _ === "function" ? _ : constant$3(_), this) : this._shapeRendering;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the sort comparator to the specified function and returns the current class instance.
          @param {false|Function} [*value* = []]
          @chainable
      */

    }, {
      key: "sort",
      value: function sort(_) {
        return arguments.length ? (this._sort = _, this) : this._sort;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = "black"]
          @chainable
      */

    }, {
      key: "stroke",
      value: function stroke(_) {
        return arguments.length ? (this._stroke = typeof _ === "function" ? _ : constant$3(_), this) : this._stroke;
      }
      /**
          @memberof Shape
          @desc Defines the "stroke-dasharray" attribute for the shapes.
          @param {Function|String} [*value* = "1"]
          @chainable
      */

    }, {
      key: "strokeDasharray",
      value: function strokeDasharray(_) {
        return arguments.length ? (this._strokeDasharray = typeof _ === "function" ? _ : constant$3(_), this) : this._strokeDasharray;
      }
      /**
          @memberof Shape
          @desc Defines the "stroke-linecap" attribute for the shapes. Accepted values are `"butt"`, `"round"`, and `"square"`.
          @param {Function|String} [*value* = "butt"]
          @chainable
      */

    }, {
      key: "strokeLinecap",
      value: function strokeLinecap(_) {
        return arguments.length ? (this._strokeLinecap = typeof _ === "function" ? _ : constant$3(_), this) : this._strokeLinecap;
      }
      /**
          @memberof Shape
          @desc Defines the "stroke-opacity" attribute for the shapes.
          @param {Function|Number} [*value* = 1]
          @chainable
      */

    }, {
      key: "strokeOpacity",
      value: function strokeOpacity(_) {
        return arguments.length ? (this._strokeOpacity = typeof _ === "function" ? _ : constant$3(_), this) : this._strokeOpacity;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance.
          @param {Function|Number} [*value* = 0]
          @chainable
      */

    }, {
      key: "strokeWidth",
      value: function strokeWidth(_) {
        return arguments.length ? (this._strokeWidth = typeof _ === "function" ? _ : constant$3(_), this) : this._strokeWidth;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance.
          @param {Function|String|Array} [*value* = "start"]
          @chainable
      */

    }, {
      key: "textAnchor",
      value: function textAnchor(_) {
        return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : constant$3(_), this) : this._textAnchor;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance.
          @param {Function|String} [*value* = "non-scaling-stroke"]
          @chainable
      */

    }, {
      key: "vectorEffect",
      value: function vectorEffect(_) {
        return arguments.length ? (this._vectorEffect = typeof _ === "function" ? _ : constant$3(_), this) : this._vectorEffect;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance.
          @param {Function|String|Array} [*value* = "start"]
          @chainable
      */

    }, {
      key: "verticalAlign",
      value: function verticalAlign(_) {
        return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : constant$3(_), this) : this._verticalAlign;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.x;
      }
      */

    }, {
      key: "x",
      value: function x(_) {
        return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$3(_), this) : this._x;
      }
      /**
          @memberof Shape
          @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.y;
      }
      */

    }, {
      key: "y",
      value: function y(_) {
        return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$3(_), this) : this._y;
      }
    }]);

    return Shape;
  }(BaseClass);

  /**
   * de Casteljau's algorithm for drawing and splitting bezier curves.
   * Inspired by https://pomax.github.io/bezierinfo/
   *
   * @param {Number[][]} points Array of [x,y] points: [start, control1, control2, ..., end]
   *   The original segment to split.
   * @param {Number} t Where to split the curve (value between [0, 1])
   * @return {Object} An object { left, right } where left is the segment from 0..t and
   *   right is the segment from t..1.
   */
  function decasteljau(points, t) {
    var left = [];
    var right = [];

    function decasteljauRecurse(points, t) {
      if (points.length === 1) {
        left.push(points[0]);
        right.push(points[0]);
      } else {
        var newPoints = Array(points.length - 1);

        for (var i = 0; i < newPoints.length; i++) {
          if (i === 0) {
            left.push(points[0]);
          }

          if (i === newPoints.length - 1) {
            right.push(points[i + 1]);
          }

          newPoints[i] = [(1 - t) * points[i][0] + t * points[i + 1][0], (1 - t) * points[i][1] + t * points[i + 1][1]];
        }

        decasteljauRecurse(newPoints, t);
      }
    }

    if (points.length) {
      decasteljauRecurse(points, t);
    }

    return {
      left: left,
      right: right.reverse()
    };
  }
  /**
   * Convert segments represented as points back into a command object
   *
   * @param {Number[][]} points Array of [x,y] points: [start, control1, control2, ..., end]
   *   Represents a segment
   * @return {Object} A command object representing the segment.
   */


  function pointsToCommand(points) {
    var command = {};

    if (points.length === 4) {
      command.x2 = points[2][0];
      command.y2 = points[2][1];
    }

    if (points.length >= 3) {
      command.x1 = points[1][0];
      command.y1 = points[1][1];
    }

    command.x = points[points.length - 1][0];
    command.y = points[points.length - 1][1];

    if (points.length === 4) {
      // start, control1, control2, end
      command.type = 'C';
    } else if (points.length === 3) {
      // start, control, end
      command.type = 'Q';
    } else {
      // start, end
      command.type = 'L';
    }

    return command;
  }
  /**
   * Runs de Casteljau's algorithm enough times to produce the desired number of segments.
   *
   * @param {Number[][]} points Array of [x,y] points for de Casteljau (the initial segment to split)
   * @param {Number} segmentCount Number of segments to split the original into
   * @return {Number[][][]} Array of segments
   */


  function splitCurveAsPoints(points, segmentCount) {
    segmentCount = segmentCount || 2;
    var segments = [];
    var remainingCurve = points;
    var tIncrement = 1 / segmentCount; // x-----x-----x-----x
    // t=  0.33   0.66   1
    // x-----o-----------x
    // r=  0.33
    //       x-----o-----x
    // r=         0.5  (0.33 / (1 - 0.33))  === tIncrement / (1 - (tIncrement * (i - 1))
    // x-----x-----x-----x----x
    // t=  0.25   0.5   0.75  1
    // x-----o----------------x
    // r=  0.25
    //       x-----o----------x
    // r=         0.33  (0.25 / (1 - 0.25))
    //             x-----o----x
    // r=         0.5  (0.25 / (1 - 0.5))

    for (var i = 0; i < segmentCount - 1; i++) {
      var tRelative = tIncrement / (1 - tIncrement * i);
      var split = decasteljau(remainingCurve, tRelative);
      segments.push(split.left);
      remainingCurve = split.right;
    } // last segment is just to the end from the last point


    segments.push(remainingCurve);
    return segments;
  }
  /**
   * Convert command objects to arrays of points, run de Casteljau's algorithm on it
   * to split into to the desired number of segments.
   *
   * @param {Object} commandStart The start command object
   * @param {Object} commandEnd The end command object
   * @param {Number} segmentCount The number of segments to create
   * @return {Object[]} An array of commands representing the segments in sequence
   */


  function splitCurve(commandStart, commandEnd, segmentCount) {
    var points = [[commandStart.x, commandStart.y]];

    if (commandEnd.x1 != null) {
      points.push([commandEnd.x1, commandEnd.y1]);
    }

    if (commandEnd.x2 != null) {
      points.push([commandEnd.x2, commandEnd.y2]);
    }

    points.push([commandEnd.x, commandEnd.y]);
    return splitCurveAsPoints(points, segmentCount).map(pointsToCommand);
  }

  var commandTokenRegex = /[MLCSTQAHVmlcstqahv]|[\d.-]+/g;
  /**
   * List of params for each command type in a path `d` attribute
   */

  var typeMap = {
    M: ['x', 'y'],
    L: ['x', 'y'],
    H: ['x'],
    V: ['y'],
    C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
    S: ['x2', 'y2', 'x', 'y'],
    Q: ['x1', 'y1', 'x', 'y'],
    T: ['x', 'y'],
    A: ['rx', 'ry', 'xAxisRotation', 'largeArcFlag', 'sweepFlag', 'x', 'y']
  }; // Add lower case entries too matching uppercase (e.g. 'm' == 'M')

  Object.keys(typeMap).forEach(function (key) {
    typeMap[key.toLowerCase()] = typeMap[key];
  });

  function arrayOfLength(length, value) {
    var array = Array(length);

    for (var i = 0; i < length; i++) {
      array[i] = value;
    }

    return array;
  }
  /**
   * Converts a command object to a string to be used in a `d` attribute
   * @param {Object} command A command object
   * @return {String} The string for the `d` attribute
   */


  function commandToString(command) {
    return "".concat(command.type).concat(typeMap[command.type].map(function (p) {
      return command[p];
    }).join(','));
  }
  /**
   * Converts command A to have the same type as command B.
   *
   * e.g., L0,5 -> C0,5,0,5,0,5
   *
   * Uses these rules:
   * x1 <- x
   * x2 <- x
   * y1 <- y
   * y2 <- y
   * rx <- 0
   * ry <- 0
   * xAxisRotation <- read from B
   * largeArcFlag <- read from B
   * sweepflag <- read from B
   *
   * @param {Object} aCommand Command object from path `d` attribute
   * @param {Object} bCommand Command object from path `d` attribute to match against
   * @return {Object} aCommand converted to type of bCommand
   */


  function convertToSameType(aCommand, bCommand) {
    var conversionMap = {
      x1: 'x',
      y1: 'y',
      x2: 'x',
      y2: 'y'
    };
    var readFromBKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag']; // convert (but ignore M types)

    if (aCommand.type !== bCommand.type && bCommand.type.toUpperCase() !== 'M') {
      var aConverted = {};
      Object.keys(bCommand).forEach(function (bKey) {
        var bValue = bCommand[bKey]; // first read from the A command

        var aValue = aCommand[bKey]; // if it is one of these values, read from B no matter what

        if (aValue === undefined) {
          if (readFromBKeys.includes(bKey)) {
            aValue = bValue;
          } else {
            // if it wasn't in the A command, see if an equivalent was
            if (aValue === undefined && conversionMap[bKey]) {
              aValue = aCommand[conversionMap[bKey]];
            } // if it doesn't have a converted value, use 0


            if (aValue === undefined) {
              aValue = 0;
            }
          }
        }

        aConverted[bKey] = aValue;
      }); // update the type to match B

      aConverted.type = bCommand.type;
      aCommand = aConverted;
    }

    return aCommand;
  }
  /**
   * Interpolate between command objects commandStart and commandEnd segmentCount times.
   * If the types are L, Q, or C then the curves are split as per de Casteljau's algorithm.
   * Otherwise we just copy commandStart segmentCount - 1 times, finally ending with commandEnd.
   *
   * @param {Object} commandStart Command object at the beginning of the segment
   * @param {Object} commandEnd Command object at the end of the segment
   * @param {Number} segmentCount The number of segments to split this into. If only 1
   *   Then [commandEnd] is returned.
   * @return {Object[]} Array of ~segmentCount command objects between commandStart and
   *   commandEnd. (Can be segmentCount+1 objects if commandStart is type M).
   */


  function splitSegment(commandStart, commandEnd, segmentCount) {
    var segments = []; // line, quadratic bezier, or cubic bezier

    if (commandEnd.type === 'L' || commandEnd.type === 'Q' || commandEnd.type === 'C') {
      segments = segments.concat(splitCurve(commandStart, commandEnd, segmentCount)); // general case - just copy the same point
    } else {
      var copyCommand = Object.assign({}, commandStart); // convert M to L

      if (copyCommand.type === 'M') {
        copyCommand.type = 'L';
      }

      segments = segments.concat(arrayOfLength(segmentCount - 1).map(function () {
        return copyCommand;
      }));
      segments.push(commandEnd);
    }

    return segments;
  }
  /**
   * Extends an array of commandsToExtend to the length of the referenceCommands by
   * splitting segments until the number of commands match. Ensures all the actual
   * points of commandsToExtend are in the extended array.
   *
   * @param {Object[]} commandsToExtend The command object array to extend
   * @param {Object[]} referenceCommands The command object array to match in length
   * @param {Function} excludeSegment a function that takes a start command object and
   *   end command object and returns true if the segment should be excluded from splitting.
   * @return {Object[]} The extended commandsToExtend array
   */


  function extend$3(commandsToExtend, referenceCommands, excludeSegment) {
    // compute insertion points:
    // number of segments in the path to extend
    var numSegmentsToExtend = commandsToExtend.length - 1; // number of segments in the reference path.

    var numReferenceSegments = referenceCommands.length - 1; // this value is always between [0, 1].

    var segmentRatio = numSegmentsToExtend / numReferenceSegments; // create a map, mapping segments in referenceCommands to how many points
    // should be added in that segment (should always be >= 1 since we need each
    // point itself).
    // 0 = segment 0-1, 1 = segment 1-2, n-1 = last vertex

    var countPointsPerSegment = arrayOfLength(numReferenceSegments).reduce(function (accum, d, i) {
      var insertIndex = Math.floor(segmentRatio * i); // handle excluding segments

      if (excludeSegment && insertIndex < commandsToExtend.length - 1 && excludeSegment(commandsToExtend[insertIndex], commandsToExtend[insertIndex + 1])) {
        // set the insertIndex to the segment that this point should be added to:
        // round the insertIndex essentially so we split half and half on
        // neighbouring segments. hence the segmentRatio * i < 0.5
        var addToPriorSegment = segmentRatio * i % 1 < 0.5; // only skip segment if we already have 1 point in it (can't entirely remove a segment)

        if (accum[insertIndex]) {
          // TODO - Note this is a naive algorithm that should work for most d3-area use cases
          // but if two adjacent segments are supposed to be skipped, this will not perform as
          // expected. Could be updated to search for nearest segment to place the point in, but
          // will only do that if necessary.
          // add to the prior segment
          if (addToPriorSegment) {
            if (insertIndex > 0) {
              insertIndex -= 1; // not possible to add to previous so adding to next
            } else if (insertIndex < commandsToExtend.length - 1) {
              insertIndex += 1;
            } // add to next segment

          } else if (insertIndex < commandsToExtend.length - 1) {
            insertIndex += 1; // not possible to add to next so adding to previous
          } else if (insertIndex > 0) {
            insertIndex -= 1;
          }
        }
      }

      accum[insertIndex] = (accum[insertIndex] || 0) + 1;
      return accum;
    }, []); // extend each segment to have the correct number of points for a smooth interpolation

    var extended = countPointsPerSegment.reduce(function (extended, segmentCount, i) {
      // if last command, just add `segmentCount` number of times
      if (i === commandsToExtend.length - 1) {
        var lastCommandCopies = arrayOfLength(segmentCount, Object.assign({}, commandsToExtend[commandsToExtend.length - 1])); // convert M to L

        if (lastCommandCopies[0].type === 'M') {
          lastCommandCopies.forEach(function (d) {
            d.type = 'L';
          });
        }

        return extended.concat(lastCommandCopies);
      } // otherwise, split the segment segmentCount times.


      return extended.concat(splitSegment(commandsToExtend[i], commandsToExtend[i + 1], segmentCount));
    }, []); // add in the very first point since splitSegment only adds in the ones after it

    extended.unshift(commandsToExtend[0]);
    return extended;
  }
  /**
   * Takes a path `d` string and converts it into an array of command
   * objects. Drops the `Z` character.
   *
   * @param {String|null} d A path `d` string
   */


  function makeCommands(d) {
    // split into valid tokens
    var tokens = (d || '').match(commandTokenRegex) || [];
    var commands = [];
    var commandArgs;
    var command; // iterate over each token, checking if we are at a new command
    // by presence in the typeMap

    for (var i = 0; i < tokens.length; ++i) {
      commandArgs = typeMap[tokens[i]]; // new command found:

      if (commandArgs) {
        command = {
          type: tokens[i]
        }; // add each of the expected args for this command:

        for (var a = 0; a < commandArgs.length; ++a) {
          command[commandArgs[a]] = +tokens[i + a + 1];
        } // need to increment our token index appropriately since
        // we consumed token args


        i += commandArgs.length;
        commands.push(command);
      }
    }

    return commands;
  }
  /**
   * Interpolate from A to B by extending A and B during interpolation to have
   * the same number of points. This allows for a smooth transition when they
   * have a different number of points.
   *
   * Ignores the `Z` character in paths unless both A and B end with it.
   *
   * @param {String} a The `d` attribute for a path
   * @param {String} b The `d` attribute for a path
   * @param {Function} excludeSegment a function that takes a start command object and
   *   end command object and returns true if the segment should be excluded from splitting.
   * @returns {Function} Interpolation function that maps t ([0, 1]) to a path `d` string.
   */


  function interpolatePath(a, b, excludeSegment) {
    var aCommands = makeCommands(a);
    var bCommands = makeCommands(b);

    if (!aCommands.length && !bCommands.length) {
      return function nullInterpolator() {
        return '';
      };
    } // if A is empty, treat it as if it used to contain just the first point
    // of B. This makes it so the line extends out of from that first point.


    if (!aCommands.length) {
      aCommands.push(bCommands[0]); // otherwise if B is empty, treat it as if it contains the first point
      // of A. This makes it so the line retracts into the first point.
    } else if (!bCommands.length) {
      bCommands.push(aCommands[0]);
    } // extend to match equal size


    var numPointsToExtend = Math.abs(bCommands.length - aCommands.length);

    if (numPointsToExtend !== 0) {
      // B has more points than A, so add points to A before interpolating
      if (bCommands.length > aCommands.length) {
        aCommands = extend$3(aCommands, bCommands, excludeSegment); // else if A has more points than B, add more points to B
      } else if (bCommands.length < aCommands.length) {
        bCommands = extend$3(bCommands, aCommands, excludeSegment);
      }
    } // commands have same length now.
    // convert commands in A to the same type as those in B


    aCommands = aCommands.map(function (aCommand, i) {
      return convertToSameType(aCommand, bCommands[i]);
    }); // create mutable interpolated command objects

    var interpolatedCommands = aCommands.map(function (aCommand) {
      return _objectSpread2({}, aCommand);
    });
    var addZ = (a == null || a[a.length - 1] === 'Z') && (b == null || b[b.length - 1] === 'Z');
    return function pathInterpolator(t) {
      // at 1 return the final value without the extensions used during interpolation
      if (t === 1) {
        return b == null ? '' : b;
      } // interpolate the commands using the mutable interpolated command objs
      // we can skip at t=0 since we copied aCommands to begin


      if (t > 0) {
        for (var i = 0; i < interpolatedCommands.length; ++i) {
          var aCommand = aCommands[i];
          var bCommand = bCommands[i];
          var interpolatedCommand = interpolatedCommands[i];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = typeMap[interpolatedCommand.type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var arg = _step.value;
              interpolatedCommand[arg] = (1 - t) * aCommand[arg] + t * bCommand[arg]; // do not use floats for flags (#27), round to integer

              if (arg === 'largeArcFlag' || arg === 'sweepFlag') {
                interpolatedCommand[arg] = Math.round(interpolatedCommand[arg]);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      } // convert to a string (fastest concat: https://jsperf.com/join-concat/150)


      var interpolatedString = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = interpolatedCommands[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _interpolatedCommand = _step2.value;
          interpolatedString += commandToString(_interpolatedCommand);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (addZ) {
        interpolatedString += 'Z';
      }

      return interpolatedString;
    };
  }

  function polygonArea (polygon) {
    var i = -1,
        n = polygon.length,
        a,
        b = polygon[n - 1],
        area = 0;

    while (++i < n) {
      a = b;
      b = polygon[i];
      area += a[1] * b[0] - a[0] * b[1];
    }

    return area / 2;
  }

  function polygonCentroid (polygon) {
    var i = -1,
        n = polygon.length,
        x = 0,
        y = 0,
        a,
        b = polygon[n - 1],
        c,
        k = 0;

    while (++i < n) {
      a = b;
      b = polygon[i];
      k += c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }

    return k *= 3, [x / k, y / k];
  }

  function polygonContains (polygon, point) {
    var n = polygon.length,
        p = polygon[n - 1],
        x = point[0],
        y = point[1],
        x0 = p[0],
        y0 = p[1],
        x1,
        y1,
        inside = false;

    for (var i = 0; i < n; ++i) {
      p = polygon[i], x1 = p[0], y1 = p[1];
      if (y1 > y !== y0 > y && x < (x0 - x1) * (y - y1) / (y0 - y1) + x1) inside = !inside;
      x0 = x1, y0 = y1;
    }

    return inside;
  }

  /**
      @function lineIntersection
      @desc Finds the intersection point (if there is one) of the lines p1q1 and p2q2.
      @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function lineIntersection (p1, q1, p2, q2) {
    // allow for some margins due to numerical errors
    var eps = 1e-9; // find the intersection point between the two infinite lines

    var dx1 = p1[0] - q1[0],
        dx2 = p2[0] - q2[0],
        dy1 = p1[1] - q1[1],
        dy2 = p2[1] - q2[1];
    var denom = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(denom) < eps) return null;
    var cross1 = p1[0] * q1[1] - p1[1] * q1[0],
        cross2 = p2[0] * q2[1] - p2[1] * q2[0];
    var px = (cross1 * dx2 - cross2 * dx1) / denom,
        py = (cross1 * dy2 - cross2 * dy1) / denom;
    return [px, py];
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  /**
      @function segmentBoxContains
      @desc Checks whether a point is inside the bounding box of a line segment.
      @param {Array} s1 The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
      @param {Array} s2 The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
      @param {Array} p The point to be checked, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */


  function segmentBoxContains (s1, s2, p) {
    var eps = 1e-9,
        _p = _slicedToArray(p, 2),
        px = _p[0],
        py = _p[1];

    return !(px < Math.min(s1[0], s2[0]) - eps || px > Math.max(s1[0], s2[0]) + eps || py < Math.min(s1[1], s2[1]) - eps || py > Math.max(s1[1], s2[1]) + eps);
  }

  /**
      @function segmentsIntersect
      @desc Checks whether the line segments p1q1 && p2q2 intersect.
      @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
      @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */

  function segmentsIntersect (p1, q1, p2, q2) {
    var p = lineIntersection(p1, q1, p2, q2);
    if (!p) return false;
    return segmentBoxContains(p1, q1, p) && segmentBoxContains(p2, q2, p);
  }

  /**
      @function polygonInside
      @desc Checks if one polygon is inside another polygon.
      @param {Array} polyA An Array of `[x, y]` points to be used as the inner polygon, checking if it is inside polyA.
      @param {Array} polyB An Array of `[x, y]` points to be used as the containing polygon.
      @returns {Boolean}
  */

  function polygonInside (polyA, polyB) {
    var iA = -1;
    var nA = polyA.length;
    var nB = polyB.length;
    var bA = polyA[nA - 1];

    while (++iA < nA) {
      var aA = bA;
      bA = polyA[iA];
      var iB = -1;
      var bB = polyB[nB - 1];

      while (++iB < nB) {
        var aB = bB;
        bB = polyB[iB];
        if (segmentsIntersect(aA, bA, aB, bB)) return false;
      }
    }

    return polygonContains(polyB, polyA[0]);
  }

  function _slicedToArray$1(arr, i) {
    return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
  }

  function _nonIterableRest$1() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit$1(arr, i) {
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

  function _arrayWithHoles$1(arr) {
    if (Array.isArray(arr)) return arr;
  }
  /**
      @function polygonRayCast
      @desc Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.
      @param {Array} poly The polygon to test against, which should be an `[x, y]` formatted Array.
      @param {Array} origin The origin point of the ray to be cast, which should be an `[x, y]` formatted Array.
      @param {Number} [alpha = 0] The angle in radians of the ray.
      @returns {Array} An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.
  */

  function polygonRayCast (poly, origin) {
    var alpha = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var eps = 1e-9;
    origin = [origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha)];

    var _origin = origin,
        _origin2 = _slicedToArray$1(_origin, 2),
        x0 = _origin2[0],
        y0 = _origin2[1];

    var shiftedOrigin = [x0 + Math.cos(alpha), y0 + Math.sin(alpha)];
    var idx = 0;
    if (Math.abs(shiftedOrigin[0] - x0) < eps) idx = 1;
    var i = -1;
    var n = poly.length;
    var b = poly[n - 1];
    var minSqDistLeft = Number.MAX_VALUE;
    var minSqDistRight = Number.MAX_VALUE;
    var closestPointLeft = null;
    var closestPointRight = null;

    while (++i < n) {
      var a = b;
      b = poly[i];
      var p = lineIntersection(origin, shiftedOrigin, a, b);

      if (p && segmentBoxContains(a, b, p)) {
        var sqDist = pointDistanceSquared(origin, p);

        if (p[idx] < origin[idx]) {
          if (sqDist < minSqDistLeft) {
            minSqDistLeft = sqDist;
            closestPointLeft = p;
          }
        } else if (p[idx] > origin[idx]) {
          if (sqDist < minSqDistRight) {
            minSqDistRight = sqDist;
            closestPointRight = p;
          }
        }
      }
    }

    return [closestPointLeft, closestPointRight];
  }

  /**
      @function pointRotate
      @desc Rotates a point around a given origin.
      @param {Array} p The point to be rotated, which should always be an `[x, y]` formatted Array.
      @param {Number} alpha The angle in radians to rotate.
      @param {Array} [origin = [0, 0]] The origin point of the rotation, which should always be an `[x, y]` formatted Array.
      @returns {Boolean}
  */
  function pointRotate (p, alpha) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
    var cosAlpha = Math.cos(alpha),
        sinAlpha = Math.sin(alpha),
        xshifted = p[0] - origin[0],
        yshifted = p[1] - origin[1];
    return [cosAlpha * xshifted - sinAlpha * yshifted + origin[0], sinAlpha * xshifted + cosAlpha * yshifted + origin[1]];
  }

  /**
      @function polygonRotate
      @desc Rotates a point around a given origin.
      @param {Array} poly The polygon to be rotated, which should be an Array of `[x, y]` values.
      @param {Number} alpha The angle in radians to rotate.
      @param {Array} [origin = [0, 0]] The origin point of the rotation, which should be an `[x, y]` formatted Array.
      @returns {Boolean}
  */

  var polygonRotate = (function (poly, alpha) {
    var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
    return poly.map(function (p) {
      return pointRotate(p, alpha, origin);
    });
  });

  /**
      @desc square distance from a point to a segment
      @param {Array} point
      @param {Array} segmentAnchor1
      @param {Array} segmentAnchor2
      @private
  */

  function getSqSegDist(p, p1, p2) {
    var x = p1[0],
        y = p1[1];
    var dx = p2[0] - x,
        dy = p2[1] - y;

    if (dx !== 0 || dy !== 0) {
      var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

      if (t > 1) {
        x = p2[0];
        y = p2[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
  }
  /**
      @desc basic distance-based simplification
      @param {Array} polygon
      @param {Number} sqTolerance
      @private
  */


  function simplifyRadialDist(poly, sqTolerance) {
    var point,
        prevPoint = poly[0];
    var newPoints = [prevPoint];

    for (var i = 1, len = poly.length; i < len; i++) {
      point = poly[i];

      if (pointDistanceSquared(point, prevPoint) > sqTolerance) {
        newPoints.push(point);
        prevPoint = point;
      }
    }

    if (prevPoint !== point) newPoints.push(point);
    return newPoints;
  }
  /**
      @param {Array} polygon
      @param {Number} first
      @param {Number} last
      @param {Number} sqTolerance
      @param {Array} simplified
      @private
  */


  function simplifyDPStep(poly, first, last, sqTolerance, simplified) {
    var index,
        maxSqDist = sqTolerance;

    for (var i = first + 1; i < last; i++) {
      var sqDist = getSqSegDist(poly[i], poly[first], poly[last]);

      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      if (index - first > 1) simplifyDPStep(poly, first, index, sqTolerance, simplified);
      simplified.push(poly[index]);
      if (last - index > 1) simplifyDPStep(poly, index, last, sqTolerance, simplified);
    }
  }
  /**
      @desc simplification using Ramer-Douglas-Peucker algorithm
      @param {Array} polygon
      @param {Number} sqTolerance
      @private
  */


  function simplifyDouglasPeucker(poly, sqTolerance) {
    var last = poly.length - 1;
    var simplified = [poly[0]];
    simplifyDPStep(poly, 0, last, sqTolerance, simplified);
    simplified.push(poly[last]);
    return simplified;
  }
  /**
      @function largestRect
      @desc Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent [Simplify.js](http://mourner.github.io/simplify-js/).
      @author Vladimir Agafonkin
      @param {Array} poly An Array of points that represent a polygon.
      @param {Number} [tolerance = 1] Affects the amount of simplification (in the same metric as the point coordinates).
      @param {Boolean} [highestQuality = false] Excludes distance-based preprocessing step which leads to highest quality simplification but runs ~10-20 times slower.

  */


  var simplify = (function (poly) {
    var tolerance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var highestQuality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (poly.length <= 2) return poly;
    var sqTolerance = tolerance * tolerance;
    poly = highestQuality ? poly : simplifyRadialDist(poly, sqTolerance);
    poly = simplifyDouglasPeucker(poly, sqTolerance);
    return poly;
  });

  function _slicedToArray$2(arr, i) {
    return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _nonIterableRest$2();
  }

  function _nonIterableRest$2() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _iterableToArrayLimit$2(arr, i) {
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

  function _arrayWithHoles$2(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var aspectRatioStep = 0.5; // step size for the aspect ratio

  var angleStep = 5; // step size for angles (in degrees); has linear impact on running time

  var polyCache = {};
  /**
      @typedef {Object} LargestRect
      @desc The returned Object of the largestRect function.
      @property {Number} width The width of the rectangle
      @property {Number} height The height of the rectangle
      @property {Number} cx The x coordinate of the rectangle's center
      @property {Number} cy The y coordinate of the rectangle's center
      @property {Number} angle The rotation angle of the rectangle in degrees. The anchor of rotation is the center point.
      @property {Number} area The area of the largest rectangle.
      @property {Array} points An array of x/y coordinates for each point in the rectangle, useful for rendering paths.
  */

  /**
      @function largestRect
      @author Daniel Smilkov [dsmilkov@gmail.com]
      @desc An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.
      @param {Array} poly An Array of points that represent a polygon.
      @param {Object} [options] An Object that allows for overriding various parameters of the algorithm.
      @param {Number|String|Array} [options.angle = d3.range(-90, 95, 5)] The allowed rotations of the final rectangle.
      @param {Number|String|Array} [options.aspectRatio] The ratio between the width and height of the rectangle. The value can be a number, a string which is parsed to a number, or an array of numbers specifying the possible aspect ratios of the final rectangle.
      @param {Number} [options.maxAspectRatio = 15] The maximum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided.
      @param {Number} [options.minAspectRatio = 1] The minimum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided.
      @param {Number} [options.nTries = 20] The number of randomly drawn points inside the polygon which the algorithm explores as possible center points of the maximal rectangle.
      @param {Number} [options.minHeight = 0] The minimum height of the rectangle.
      @param {Number} [options.minWidth = 0] The minimum width of the rectangle.
      @param {Number} [options.tolerance = 0.02] The simplification tolerance factor, between 0 and 1. A larger tolerance corresponds to more extensive simplification.
      @param {Array} [options.origin] The center point of the rectangle. If specified, the rectangle will be fixed at that point, otherwise the algorithm optimizes across all possible points. The given value can be either a two dimensional array specifying the x and y coordinate of the origin or an array of two dimensional points specifying multiple possible center points of the rectangle.
      @param {Boolean} [options.cache] Whether or not to cache the result, which would be used in subsequent calculations to preserve consistency and speed up calculation time.
      @return {LargestRect}
  */

  function largestRect (poly) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (poly.length < 3) {
      if (options.verbose) console.error("polygon has to have at least 3 points", poly);
      return null;
    } // For visualization debugging purposes


    var events = []; // User's input normalization

    options = Object.assign({
      angle: d3Range(-90, 90 + angleStep, angleStep),
      cache: true,
      maxAspectRatio: 15,
      minAspectRatio: 1,
      minHeight: 0,
      minWidth: 0,
      nTries: 20,
      tolerance: 0.02,
      verbose: false
    }, options);
    var angles = options.angle instanceof Array ? options.angle : typeof options.angle === "number" ? [options.angle] : typeof options.angle === "string" && !isNaN(options.angle) ? [Number(options.angle)] : [];
    var aspectRatios = options.aspectRatio instanceof Array ? options.aspectRatio : typeof options.aspectRatio === "number" ? [options.aspectRatio] : typeof options.aspectRatio === "string" && !isNaN(options.aspectRatio) ? [Number(options.aspectRatio)] : [];
    var origins = options.origin && options.origin instanceof Array ? options.origin[0] instanceof Array ? options.origin : [options.origin] : [];
    var cacheString;

    if (options.cache) {
      cacheString = merge(poly).join(",");
      cacheString += "-".concat(options.minAspectRatio);
      cacheString += "-".concat(options.maxAspectRatio);
      cacheString += "-".concat(options.minHeight);
      cacheString += "-".concat(options.minWidth);
      cacheString += "-".concat(angles.join(","));
      cacheString += "-".concat(origins.join(","));
      if (polyCache[cacheString]) return polyCache[cacheString];
    }

    var area = Math.abs(polygonArea(poly)); // take absolute value of the signed area

    if (area === 0) {
      if (options.verbose) console.error("polygon has 0 area", poly);
      return null;
    } // get the width of the bounding box of the original polygon to determine tolerance


    var _extent = extent(poly, function (d) {
      return d[0];
    }),
        _extent2 = _slicedToArray$2(_extent, 2),
        minx = _extent2[0],
        maxx = _extent2[1];

    var _extent3 = extent(poly, function (d) {
      return d[1];
    }),
        _extent4 = _slicedToArray$2(_extent3, 2),
        miny = _extent4[0],
        maxy = _extent4[1]; // simplify polygon


    var tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;
    if (tolerance > 0) poly = simplify(poly, tolerance);
    if (options.events) events.push({
      type: "simplify",
      poly: poly
    }); // get the width of the bounding box of the simplified polygon

    var _extent5 = extent(poly, function (d) {
      return d[0];
    });

    var _extent6 = _slicedToArray$2(_extent5, 2);

    minx = _extent6[0];
    maxx = _extent6[1];

    var _extent7 = extent(poly, function (d) {
      return d[1];
    });

    var _extent8 = _slicedToArray$2(_extent7, 2);

    miny = _extent8[0];
    maxy = _extent8[1];
    var boxWidth = maxx - minx,
        boxHeight = maxy - miny; // discretize the binary search for optimal width to a resolution of this times the polygon width

    var widthStep = Math.min(boxWidth, boxHeight) / 50; // populate possible center points with random points inside the polygon

    if (!origins.length) {
      // get the centroid of the polygon
      var centroid = polygonCentroid(poly);

      if (!isFinite(centroid[0])) {
        if (options.verbose) console.error("cannot find centroid", poly);
        return null;
      }

      if (polygonContains(poly, centroid)) origins.push(centroid);
      var nTries = options.nTries; // get few more points inside the polygon

      while (nTries) {
        var rndX = Math.random() * boxWidth + minx;
        var rndY = Math.random() * boxHeight + miny;
        var rndPoint = [rndX, rndY];

        if (polygonContains(poly, rndPoint)) {
          origins.push(rndPoint);
        }

        nTries--;
      }
    }

    if (options.events) events.push({
      type: "origins",
      points: origins
    });
    var maxArea = 0;
    var maxRect = null;

    for (var ai = 0; ai < angles.length; ai++) {
      var angle = angles[ai];
      var angleRad = -angle * Math.PI / 180;
      if (options.events) events.push({
        type: "angle",
        angle: angle
      });

      for (var i = 0; i < origins.length; i++) {
        var origOrigin = origins[i]; // generate improved origins

        var _polygonRayCast = polygonRayCast(poly, origOrigin, angleRad),
            _polygonRayCast2 = _slicedToArray$2(_polygonRayCast, 2),
            p1W = _polygonRayCast2[0],
            p2W = _polygonRayCast2[1];

        var _polygonRayCast3 = polygonRayCast(poly, origOrigin, angleRad + Math.PI / 2),
            _polygonRayCast4 = _slicedToArray$2(_polygonRayCast3, 2),
            p1H = _polygonRayCast4[0],
            p2H = _polygonRayCast4[1];

        var modifOrigins = [];
        if (p1W && p2W) modifOrigins.push([(p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2]); // average along with width axis

        if (p1H && p2H) modifOrigins.push([(p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2]); // average along with height axis

        if (options.events) events.push({
          type: "modifOrigin",
          idx: i,
          p1W: p1W,
          p2W: p2W,
          p1H: p1H,
          p2H: p2H,
          modifOrigins: modifOrigins
        });

        for (var _i2 = 0; _i2 < modifOrigins.length; _i2++) {
          var origin = modifOrigins[_i2];
          if (options.events) events.push({
            type: "origin",
            cx: origin[0],
            cy: origin[1]
          });

          var _polygonRayCast5 = polygonRayCast(poly, origin, angleRad),
              _polygonRayCast6 = _slicedToArray$2(_polygonRayCast5, 2),
              _p1W = _polygonRayCast6[0],
              _p2W = _polygonRayCast6[1];

          if (_p1W === null || _p2W === null) continue;
          var minSqDistW = Math.min(pointDistanceSquared(origin, _p1W), pointDistanceSquared(origin, _p2W));
          var maxWidth = 2 * Math.sqrt(minSqDistW);

          var _polygonRayCast7 = polygonRayCast(poly, origin, angleRad + Math.PI / 2),
              _polygonRayCast8 = _slicedToArray$2(_polygonRayCast7, 2),
              _p1H = _polygonRayCast8[0],
              _p2H = _polygonRayCast8[1];

          if (_p1H === null || _p2H === null) continue;
          var minSqDistH = Math.min(pointDistanceSquared(origin, _p1H), pointDistanceSquared(origin, _p2H));
          var maxHeight = 2 * Math.sqrt(minSqDistH);
          if (maxWidth * maxHeight < maxArea) continue;
          var aRatios = aspectRatios;

          if (!aRatios.length) {
            var minAspectRatio = Math.max(options.minAspectRatio, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
            var maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, maxWidth * maxWidth / maxArea);
            aRatios = d3Range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
          }

          for (var a = 0; a < aRatios.length; a++) {
            var aRatio = aRatios[a]; // do a binary search to find the max width that works

            var left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
            var right = Math.min(maxWidth, maxHeight * aRatio);
            if (right * maxHeight < maxArea) continue;
            if (options.events && right - left >= widthStep) events.push({
              type: "aRatio",
              aRatio: aRatio
            });

            while (right - left >= widthStep) {
              var width = (left + right) / 2;
              var height = width / aRatio;

              var _origin = _slicedToArray$2(origin, 2),
                  cx = _origin[0],
                  cy = _origin[1];

              var rectPoly = [[cx - width / 2, cy - height / 2], [cx + width / 2, cy - height / 2], [cx + width / 2, cy + height / 2], [cx - width / 2, cy + height / 2]];
              rectPoly = polygonRotate(rectPoly, angleRad, origin);
              var insidePoly = polygonInside(rectPoly, poly);

              if (insidePoly) {
                // we know that the area is already greater than the maxArea found so far
                maxArea = width * height;
                rectPoly.push(rectPoly[0]);
                maxRect = {
                  area: maxArea,
                  cx: cx,
                  cy: cy,
                  width: width,
                  height: height,
                  angle: -angle,
                  points: rectPoly
                };
                left = width; // increase the width in the binary search
              } else {
                right = width; // decrease the width in the binary search
              }

              if (options.events) events.push({
                type: "rectangle",
                areaFraction: width * height / area,
                cx: cx,
                cy: cy,
                width: width,
                height: height,
                angle: angle,
                insidePoly: insidePoly
              });
            }
          }
        }
      }
    }

    if (options.cache) {
      polyCache[cacheString] = maxRect;
    }

    return options.events ? Object.assign(maxRect || {}, {
      events: events
    }) : maxRect;
  }

  function _typeof$6(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$6 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$6 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$6(obj);
  }

  function _classCallCheck$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$5(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$5(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$5(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$5(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$3(self, call) {
    if (call && (_typeof$6(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$3(self);
  }

  function _assertThisInitialized$3(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
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

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$3(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$3(o) {
    _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$3(o);
  }

  function _inherits$3(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$3(subClass, superClass);
  }

  function _setPrototypeOf$3(o, p) {
    _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$3(o, p);
  }
  /**
      @class Area
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */

  var Area =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$3(Area, _Shape);
    /**
        @memberof Area
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Area() {
      var _this;

      _classCallCheck$5(this, Area);

      _this = _possibleConstructorReturn$3(this, _getPrototypeOf$3(Area).call(this));
      _this._curve = "linear";

      _this._defined = function () {
        return true;
      };

      _this._labelBounds = function (d, i, aes) {
        var r = largestRect(aes.points);
        if (!r) return null;
        return {
          angle: r.angle,
          width: r.width,
          height: r.height,
          x: r.cx - r.width / 2 - _this._x(d, i),
          y: r.cy - r.height / 2 - _this._y(d, i)
        };
      };

      _this._labelConfig = Object.assign(_this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      _this._name = "Area";
      _this._x = accessor("x");
      _this._x0 = accessor("x");
      _this._x1 = null;
      _this._y = constant$3(0);
      _this._y0 = constant$3(0);
      _this._y1 = accessor("y");
      return _this;
    }
    /**
        @memberof Area
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */


    _createClass$5(Area, [{
      key: "_aes",
      value: function _aes(d) {
        var _this2 = this;

        var values = d.values.slice().sort(function (a, b) {
          return _this2._y1 ? _this2._x(a) - _this2._x(b) : _this2._y(a) - _this2._y(b);
        });
        var points1 = values.map(function (v, z) {
          return [_this2._x0(v, z), _this2._y0(v, z)];
        });
        var points2 = values.reverse().map(function (v, z) {
          return _this2._y1 ? [_this2._x(v, z), _this2._y1(v, z)] : [_this2._x1(v, z), _this2._y(v, z)];
        });
        var points = points1.concat(points2);
        if (points1[0][1] > points2[0][1]) points = points.reverse();
        points.push(points[0]);
        return {
          points: points
        };
      }
      /**
          @memberof Area
          @desc Filters/manipulates the data array before binding each point to an SVG group.
          @param {Array} [*data* = the data array to be filtered]
          @private
      */

    }, {
      key: "_dataFilter",
      value: function _dataFilter(data) {
        var _this3 = this;

        var areas = nest().key(this._id).entries(data).map(function (d) {
          d.data = objectMerge(d.values);
          d.i = data.indexOf(d.values[0]);
          var x = extent(d.values.map(_this3._x).concat(d.values.map(_this3._x0)).concat(_this3._x1 ? d.values.map(_this3._x1) : []));
          d.xR = x;
          d.width = x[1] - x[0];
          d.x = x[0] + d.width / 2;
          var y = extent(d.values.map(_this3._y).concat(d.values.map(_this3._y0)).concat(_this3._y1 ? d.values.map(_this3._y1) : []));
          d.yR = y;
          d.height = y[1] - y[0];
          d.y = y[0] + d.height / 2;
          d.nested = true;
          d.translate = [d.x, d.y];
          d.__d3plusShape__ = true;
          return d;
        });

        areas.key = function (d) {
          return d.key;
        };

        return areas;
      }
      /**
          @memberof Area
          @desc Draws the area polygons.
          @param {Function} [*callback*]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this4 = this;

        _get(_getPrototypeOf$3(Area.prototype), "render", this).call(this, callback);

        var path = this._path = area().defined(this._defined).curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).x(this._x).x0(this._x0).x1(this._x1).y(this._y).y0(this._y0).y1(this._y1);
        var exitPath = area().defined(function (d) {
          return d;
        }).curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).x(this._x).y(this._y).x0(function (d, i) {
          return _this4._x1 ? _this4._x0(d, i) + (_this4._x1(d, i) - _this4._x0(d, i)) / 2 : _this4._x0(d, i);
        }).x1(function (d, i) {
          return _this4._x1 ? _this4._x0(d, i) + (_this4._x1(d, i) - _this4._x0(d, i)) / 2 : _this4._x0(d, i);
        }).y0(function (d, i) {
          return _this4._y1 ? _this4._y0(d, i) + (_this4._y1(d, i) - _this4._y0(d, i)) / 2 : _this4._y0(d, i);
        }).y1(function (d, i) {
          return _this4._y1 ? _this4._y0(d, i) + (_this4._y1(d, i) - _this4._y0(d, i)) / 2 : _this4._y0(d, i);
        });

        this._enter.append("path").attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attr("d", function (d) {
          return exitPath(d.values);
        }).call(this._applyStyle.bind(this)).transition(this._transition).attrTween("d", function (d) {
          return interpolatePath(_select(this).attr("d"), path(d.values));
        });

        this._update.select("path").transition(this._transition).attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attrTween("d", function (d) {
          return interpolatePath(_select(this).attr("d"), path(d.values));
        }).call(this._applyStyle.bind(this));

        this._exit.select("path").transition(this._transition).attrTween("d", function (d) {
          return interpolatePath(_select(this).attr("d"), exitPath(d.values));
        });

        return this;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.
          @param {String} [*value* = "linear"]
          @chainable
      */

    }, {
      key: "curve",
      value: function curve(_) {
        return arguments.length ? (this._curve = _, this) : this._curve;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "defined",
      value: function defined(_) {
        return arguments.length ? (this._defined = _, this) : this._defined;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "x",
      value: function x(_) {
        if (!arguments.length) return this._x;
        this._x = typeof _ === "function" ? _ : constant$3(_);
        this._x0 = this._x;
        return this;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "x0",
      value: function x0(_) {
        if (!arguments.length) return this._x0;
        this._x0 = typeof _ === "function" ? _ : constant$3(_);
        this._x = this._x0;
        return this;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.
          @param {Function|Number|null} [*value*]
          @chainable
      */

    }, {
      key: "x1",
      value: function x1(_) {
        return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : constant$3(_), this) : this._x1;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "y",
      value: function y(_) {
        if (!arguments.length) return this._y;
        this._y = typeof _ === "function" ? _ : constant$3(_);
        this._y0 = this._y;
        return this;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "y0",
      value: function y0(_) {
        if (!arguments.length) return this._y0;
        this._y0 = typeof _ === "function" ? _ : constant$3(_);
        this._y = this._y0;
        return this;
      }
      /**
          @memberof Area
          @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.
          @param {Function|Number|null} [*value*]
          @chainable
      */

    }, {
      key: "y1",
      value: function y1(_) {
        return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : constant$3(_), this) : this._y1;
      }
    }]);

    return Area;
  }(Shape);

  function _typeof$7(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$7 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$7 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$7(obj);
  }

  function _classCallCheck$6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$6(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$6(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$6(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$6(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$4(self, call) {
    if (call && (_typeof$7(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$4(self);
  }

  function _assertThisInitialized$4(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _get$1(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$1 = Reflect.get;
    } else {
      _get$1 = function _get(target, property, receiver) {
        var base = _superPropBase$1(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$1(target, property, receiver || target);
  }

  function _superPropBase$1(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$4(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$4(o) {
    _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$4(o);
  }

  function _inherits$4(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$4(subClass, superClass);
  }

  function _setPrototypeOf$4(o, p) {
    _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$4(o, p);
  }
  /**
      @class Bar
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */

  var Bar =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$4(Bar, _Shape);
    /**
        @memberof Bar
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Bar() {
      var _this;

      _classCallCheck$6(this, Bar);

      _this = _possibleConstructorReturn$4(this, _getPrototypeOf$4(Bar).call(this, "rect"));
      _this._name = "Bar";
      _this._height = constant$3(10);

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.width,
          height: s.height,
          x: _this._x1 !== null ? _this._getX(d, i) : -s.width / 2,
          y: _this._x1 === null ? _this._getY(d, i) : -s.height / 2
        };
      };

      _this._width = constant$3(10);
      _this._x = accessor("x");
      _this._x0 = accessor("x");
      _this._x1 = null;
      _this._y = constant$3(0);
      _this._y0 = constant$3(0);
      _this._y1 = accessor("y");
      return _this;
    }
    /**
        @memberof Bar
        @desc Draws the bars.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass$6(Bar, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        _get$1(_getPrototypeOf$4(Bar.prototype), "render", this).call(this, callback);

        var enter = this._enter.attr("width", function (d, i) {
          return _this2._x1 === null ? _this2._getWidth(d, i) : 0;
        }).attr("height", function (d, i) {
          return _this2._x1 !== null ? _this2._getHeight(d, i) : 0;
        }).attr("x", function (d, i) {
          return _this2._x1 === null ? -_this2._getWidth(d, i) / 2 : 0;
        }).attr("y", function (d, i) {
          return _this2._x1 !== null ? -_this2._getHeight(d, i) / 2 : 0;
        }).call(this._applyStyle.bind(this));

        var update = this._update;

        if (this._duration) {
          enter = enter.transition(this._transition);
          update = update.transition(this._transition);

          this._exit.transition(this._transition).attr("width", function (d, i) {
            return _this2._x1 === null ? _this2._getWidth(d, i) : 0;
          }).attr("height", function (d, i) {
            return _this2._x1 !== null ? _this2._getHeight(d, i) : 0;
          }).attr("x", function (d, i) {
            return _this2._x1 === null ? -_this2._getWidth(d, i) / 2 : 0;
          }).attr("y", function (d, i) {
            return _this2._x1 !== null ? -_this2._getHeight(d, i) / 2 : 0;
          });
        }

        enter.call(this._applyPosition.bind(this));
        update.call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));
        return this;
      }
      /**
          @memberof Bar
          @desc Given a specific data point and index, returns the aesthetic properties of the shape.
          @param {Object} *data point*
          @param {Number} *index*
          @private
      */

    }, {
      key: "_aes",
      value: function _aes(d, i) {
        return {
          height: this._getHeight(d, i),
          width: this._getWidth(d, i)
        };
      }
      /**
          @memberof Bar
          @desc Provides the default positioning to the <rect> elements.
          @param {D3Selection} *elem*
          @private
      */

    }, {
      key: "_applyPosition",
      value: function _applyPosition(elem) {
        var _this3 = this;

        elem.attr("width", function (d, i) {
          return _this3._getWidth(d, i);
        }).attr("height", function (d, i) {
          return _this3._getHeight(d, i);
        }).attr("x", function (d, i) {
          return _this3._x1 !== null ? _this3._getX(d, i) : -_this3._getWidth(d, i) / 2;
        }).attr("y", function (d, i) {
          return _this3._x1 === null ? _this3._getY(d, i) : -_this3._getHeight(d, i) / 2;
        });
      }
      /**
          @memberof Bar
          @desc Calculates the height of the <rect> by assessing the x and y properties.
          @param {Object} *d*
          @param {Number} *i*
          @private
      */

    }, {
      key: "_getHeight",
      value: function _getHeight(d, i) {
        if (this._x1 !== null) return this._height(d, i);
        return Math.abs(this._y1(d, i) - this._y(d, i));
      }
      /**
          @memberof Bar
          @desc Calculates the width of the <rect> by assessing the x and y properties.
          @param {Object} *d*
          @param {Number} *i*
          @private
      */

    }, {
      key: "_getWidth",
      value: function _getWidth(d, i) {
        if (this._x1 === null) return this._width(d, i);
        return Math.abs(this._x1(d, i) - this._x(d, i));
      }
      /**
          @memberof Bar
          @desc Calculates the x of the <rect> by assessing the x and width properties.
          @param {Object} *d*
          @param {Number} *i*
          @private
      */

    }, {
      key: "_getX",
      value: function _getX(d, i) {
        var w = this._x1 === null ? this._x(d, i) : this._x1(d, i) - this._x(d, i);
        if (w < 0) return w;else return 0;
      }
      /**
          @memberof Bar
          @desc Calculates the y of the <rect> by assessing the y and height properties.
          @param {Object} *d*
          @param {Number} *i*
          @private
      */

    }, {
      key: "_getY",
      value: function _getY(d, i) {
        var h = this._x1 !== null ? this._y(d, i) : this._y1(d, i) - this._y(d, i);
        if (h < 0) return h;else return 0;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.height;
      }
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$3(_), this) : this._height;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.width;
      }
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$3(_), this) : this._width;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "x0",
      value: function x0(_) {
        if (!arguments.length) return this._x0;
        this._x0 = typeof _ === "function" ? _ : constant$3(_);
        this._x = this._x0;
        return this;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance.
          @param {Function|Number|null} [*value*]
          @chainable
      */

    }, {
      key: "x1",
      value: function x1(_) {
        return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : constant$3(_), this) : this._x1;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "y0",
      value: function y0(_) {
        if (!arguments.length) return this._y0;
        this._y0 = typeof _ === "function" ? _ : constant$3(_);
        this._y = this._y0;
        return this;
      }
      /**
          @memberof Bar
          @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance.
          @param {Function|Number|null} [*value*]
          @chainable
      */

    }, {
      key: "y1",
      value: function y1(_) {
        return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : constant$3(_), this) : this._y1;
      }
    }]);

    return Bar;
  }(Shape);

  function _typeof$8(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$8 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$8 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$8(obj);
  }

  function _classCallCheck$7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$7(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$7(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$7(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$7(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$5(self, call) {
    if (call && (_typeof$8(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$5(self);
  }

  function _assertThisInitialized$5(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _get$2(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$2 = Reflect.get;
    } else {
      _get$2 = function _get(target, property, receiver) {
        var base = _superPropBase$2(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$2(target, property, receiver || target);
  }

  function _superPropBase$2(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$5(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$5(o) {
    _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$5(o);
  }

  function _inherits$5(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$5(subClass, superClass);
  }

  function _setPrototypeOf$5(o, p) {
    _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$5(o, p);
  }
  /**
      @class Circle
      @extends Shape
      @desc Creates SVG circles based on an array of data.
  */

  var Circle =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$5(Circle, _Shape);
    /**
        @memberof Circle
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Circle() {
      var _this;

      _classCallCheck$7(this, Circle);

      _this = _possibleConstructorReturn$5(this, _getPrototypeOf$5(Circle).call(this, "circle"));

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.r * 1.5,
          height: s.r * 1.5,
          x: -s.r * 0.75,
          y: -s.r * 0.75
        };
      };

      _this._labelConfig = assign(_this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      _this._name = "Circle";
      _this._r = accessor("r");
      return _this;
    }
    /**
        @memberof Circle
        @desc Provides the default positioning to the <rect> elements.
        @private
    */


    _createClass$7(Circle, [{
      key: "_applyPosition",
      value: function _applyPosition(elem) {
        var _this2 = this;

        elem.attr("r", function (d, i) {
          return _this2._r(d, i);
        }).attr("x", function (d, i) {
          return -_this2._r(d, i) / 2;
        }).attr("y", function (d, i) {
          return -_this2._r(d, i) / 2;
        });
      }
      /**
          @memberof Circle
          @desc Draws the circles.
          @param {Function} [*callback*]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        _get$2(_getPrototypeOf$5(Circle.prototype), "render", this).call(this, callback);

        var enter = this._enter.call(this._applyStyle.bind(this));

        var update = this._update;

        if (this._duration) {
          enter.attr("r", 0).attr("x", 0).attr("y", 0).transition(this._transition).call(this._applyPosition.bind(this));
          update = update.transition(this._transition);

          this._exit.transition(this._transition).attr("r", 0).attr("x", 0).attr("y", 0);
        } else {
          enter.call(this._applyPosition.bind(this));
        }

        update.call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));
        return this;
      }
      /**
          @memberof Circle
          @desc Given a specific data point and index, returns the aesthetic properties of the shape.
          @param {Object} *data point*
          @param {Number} *index*
          @private
      */

    }, {
      key: "_aes",
      value: function _aes(d, i) {
        return {
          r: this._r(d, i)
        };
      }
      /**
          @memberof Circle
          @desc If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.r;
      }
      */

    }, {
      key: "r",
      value: function r(_) {
        return arguments.length ? (this._r = typeof _ === "function" ? _ : constant$3(_), this) : this._r;
      }
    }]);

    return Circle;
  }(Shape);

  function _typeof$9(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$9 = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$9 = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$9(obj);
  }

  function _classCallCheck$8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$8(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$8(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$8(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$8(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$6(self, call) {
    if (call && (_typeof$9(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$6(self);
  }

  function _assertThisInitialized$6(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _get$3(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$3 = Reflect.get;
    } else {
      _get$3 = function _get(target, property, receiver) {
        var base = _superPropBase$3(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$3(target, property, receiver || target);
  }

  function _superPropBase$3(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$6(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$6(o) {
    _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$6(o);
  }

  function _inherits$6(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$6(subClass, superClass);
  }

  function _setPrototypeOf$6(o, p) {
    _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$6(o, p);
  }
  /**
      @class Rect
      @extends Shape
      @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
  */

  var Rect =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$6(Rect, _Shape);
    /**
        @memberof Rect
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Rect() {
      var _this;

      _classCallCheck$8(this, Rect);

      _this = _possibleConstructorReturn$6(this, _getPrototypeOf$6(Rect).call(this, "rect"));
      _this._height = accessor("height");

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.width,
          height: s.height,
          x: -s.width / 2,
          y: -s.height / 2
        };
      };

      _this._name = "Rect";
      _this._width = accessor("width");
      return _this;
    }
    /**
        @memberof Rect
        @desc Draws the rectangles.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass$8(Rect, [{
      key: "render",
      value: function render(callback) {
        _get$3(_getPrototypeOf$6(Rect.prototype), "render", this).call(this, callback);

        var enter = this._enter.attr("width", 0).attr("height", 0).attr("x", 0).attr("y", 0).call(this._applyStyle.bind(this));

        var update = this._update;

        if (this._duration) {
          enter = enter.transition(this._transition);
          update = update.transition(this._transition);

          this._exit.transition(this._transition).attr("width", 0).attr("height", 0).attr("x", 0).attr("y", 0);
        }

        enter.call(this._applyPosition.bind(this));
        update.call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));
        return this;
      }
      /**
          @memberof Rect
          @desc Given a specific data point and index, returns the aesthetic properties of the shape.
          @param {Object} *data point*
          @param {Number} *index*
          @private
      */

    }, {
      key: "_aes",
      value: function _aes(d, i) {
        return {
          width: this._width(d, i),
          height: this._height(d, i)
        };
      }
      /**
          @memberof Rect
          @desc Provides the default positioning to the <rect> elements.
          @param {D3Selection} *elem*
          @private
      */

    }, {
      key: "_applyPosition",
      value: function _applyPosition(elem) {
        var _this2 = this;

        elem.attr("width", function (d, i) {
          return _this2._width(d, i);
        }).attr("height", function (d, i) {
          return _this2._height(d, i);
        }).attr("x", function (d, i) {
          return -_this2._width(d, i) / 2;
        }).attr("y", function (d, i) {
          return -_this2._height(d, i) / 2;
        });
      }
      /**
          @memberof Rect
          @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.height;
      }
      */

    }, {
      key: "height",
      value: function height(_) {
        return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$3(_), this) : this._height;
      }
      /**
          @memberof Rect
          @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.width;
      }
      */

    }, {
      key: "width",
      value: function width(_) {
        return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$3(_), this) : this._width;
      }
    }]);

    return Rect;
  }(Shape);

  function _typeof$a(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$a = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$a = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$a(obj);
  }

  function _classCallCheck$9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$9(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$9(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$9(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$9(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$7(self, call) {
    if (call && (_typeof$a(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$7(self);
  }

  function _assertThisInitialized$7(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _get$4(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$4 = Reflect.get;
    } else {
      _get$4 = function _get(target, property, receiver) {
        var base = _superPropBase$4(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$4(target, property, receiver || target);
  }

  function _superPropBase$4(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$7(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$7(o) {
    _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$7(o);
  }

  function _inherits$7(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$7(subClass, superClass);
  }

  function _setPrototypeOf$7(o, p) {
    _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$7(o, p);
  }
  /**
      @class Line
      @extends Shape
      @desc Creates SVG lines based on an array of data.
  */

  var Line =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$7(Line, _Shape);
    /**
        @memberof Line
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Line() {
      var _this;

      _classCallCheck$9(this, Line);

      _this = _possibleConstructorReturn$7(this, _getPrototypeOf$7(Line).call(this));
      _this._curve = "linear";

      _this._defined = function (d) {
        return d;
      };

      _this._fill = constant$3("none");
      _this._hitArea = constant$3({
        "d": function d(_d) {
          return _this._path(_d.values);
        },
        "fill": "none",
        "stroke-width": 10,
        "transform": null
      });
      _this._name = "Line";
      _this._path = line();
      _this._stroke = constant$3("black");
      _this._strokeWidth = constant$3(1);
      return _this;
    }
    /**
        @memberof Line
        @desc Filters/manipulates the data array before binding each point to an SVG group.
        @param {Array} [*data* = the data array to be filtered]
        @private
    */


    _createClass$9(Line, [{
      key: "_dataFilter",
      value: function _dataFilter(data) {
        var _this2 = this;

        var lines = nest().key(this._id).entries(data).map(function (d) {
          d.data = objectMerge(d.values);
          d.i = data.indexOf(d.values[0]);
          var x = extent(d.values, _this2._x);
          d.xR = x;
          d.width = x[1] - x[0];
          d.x = x[0] + d.width / 2;
          var y = extent(d.values, _this2._y);
          d.yR = y;
          d.height = y[1] - y[0];
          d.y = y[0] + d.height / 2;
          d.nested = true;
          d.translate = [d.x, d.y];
          d.__d3plusShape__ = true;
          return d;
        });

        lines.key = function (d) {
          return d.key;
        };

        return lines;
      }
      /**
          @memberof Line
          @desc Draws the lines.
          @param {Function} [*callback*]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        var _this3 = this;

        _get$4(_getPrototypeOf$7(Line.prototype), "render", this).call(this, callback);

        var that = this;
        /**
            @desc Calculates the stroke-dasharray used for animations
            @param {Object} *d* data point
            @private
        */

        function calculateStrokeDashArray(d) {
          d.initialLength = this.getTotalLength();

          var strokeArray = that._strokeDasharray(d.values[0], that._data.indexOf(d.values[0])).split(" ").map(Number);

          if (strokeArray.length === 1 && strokeArray[0] === 0) strokeArray = [d.initialLength];else if (strokeArray.length === 1) strokeArray.push(strokeArray[0]);else if (strokeArray.length % 2) strokeArray = strokeArray.concat(strokeArray);
          var newStrokeArray = [];
          var strokeLength = 0;

          while (strokeLength < d.initialLength) {
            for (var i = 0; i < strokeArray.length; i++) {
              var num = strokeArray[i];
              strokeLength += num;
              newStrokeArray.push(num);
              if (strokeLength >= d.initialLength) break;
            }
          }

          if (newStrokeArray.length > 1 && newStrokeArray.length % 2) newStrokeArray.pop();
          newStrokeArray[newStrokeArray.length - 1] += d.initialLength - sum(newStrokeArray);
          if (newStrokeArray.length % 2 === 0) newStrokeArray.push(0);
          d.initialStrokeArray = newStrokeArray.join(" ");
        }

        this._path.curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).defined(this._defined).x(this._x).y(this._y);

        var enter = this._enter.append("path").attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attr("d", function (d) {
          return _this3._path(d.values);
        }).call(this._applyStyle.bind(this));

        var update = this._update.select("path").attr("stroke-dasharray", function (d) {
          return that._strokeDasharray(d.values[0], that._data.indexOf(d.values[0]));
        });

        if (this._duration) {
          enter.each(calculateStrokeDashArray).attr("stroke-dasharray", function (d) {
            return "".concat(d.initialStrokeArray, " ").concat(d.initialLength);
          }).attr("stroke-dashoffset", function (d) {
            return d.initialLength;
          }).transition(this._transition).attr("stroke-dashoffset", 0);
          update = update.transition(this._transition).attrTween("d", function (d) {
            return interpolatePath(_select(this).attr("d"), that._path(d.values));
          });

          this._exit.selectAll("path").each(calculateStrokeDashArray).attr("stroke-dasharray", function (d) {
            return "".concat(d.initialStrokeArray, " ").concat(d.initialLength);
          }).transition(this._transition).attr("stroke-dashoffset", function (d) {
            return -d.initialLength;
          });
        } else {
          update = update.attr("d", function (d) {
            return that._path(d.values);
          });
        }

        update.attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).call(this._applyStyle.bind(this));
        return this;
      }
      /**
          @memberof Line
          @desc Given a specific data point and index, returns the aesthetic properties of the shape.
          @param {Object} *data point*
          @param {Number} *index*
          @private
      */

    }, {
      key: "_aes",
      value: function _aes(d, i) {
        var _this4 = this;

        return {
          points: d.values.map(function (p) {
            return [_this4._x(p, i), _this4._y(p, i)];
          })
        };
      }
      /**
          @memberof Line
          @desc If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.
          @param {String} [*value* = "linear"]
          @chainable
      */

    }, {
      key: "curve",
      value: function curve(_) {
        return arguments.length ? (this._curve = _, this) : this._curve;
      }
      /**
          @memberof Line
          @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "defined",
      value: function defined(_) {
        return arguments.length ? (this._defined = _, this) : this._defined;
      }
    }]);

    return Line;
  }(Shape);

  function _typeof$b(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$b = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$b = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$b(obj);
  }

  function _classCallCheck$a(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$a(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$a(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$a(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$a(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$8(self, call) {
    if (call && (_typeof$b(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$8(self);
  }

  function _assertThisInitialized$8(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf$8(o) {
    _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$8(o);
  }

  function _inherits$8(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$8(subClass, superClass);
  }

  function _setPrototypeOf$8(o, p) {
    _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$8(o, p);
  }
  var shapes = {
    Circle: Circle,
    Rect: Rect
  };
  /**
      @class Whisker
      @extends BaseClass
      @desc Creates SVG whisker based on an array of data.
  */

  var Whisker =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits$8(Whisker, _BaseClass);
    /**
        @memberof Whisker
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
        @private
    */


    function Whisker() {
      var _this;

      _classCallCheck$a(this, Whisker);

      _this = _possibleConstructorReturn$8(this, _getPrototypeOf$8(Whisker).call(this));
      _this._endpoint = accessor("endpoint", "Rect");
      _this._endpointConfig = {
        Circle: {
          r: accessor("r", 5)
        }
      };
      _this._length = accessor("length", 25);
      _this._lineConfig = {};
      _this._orient = accessor("orient", "top");
      _this._x = accessor("x", 0);
      _this._y = accessor("y", 0);
      return _this;
    }
    /**
        @memberof Whisker
        @desc Draws the whisker.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass$a(Whisker, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        if (this._select === void 0) {
          this.select(_select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
        }

        var lineData = [];

        this._data.forEach(function (d, i) {
          var orient = _this2._orient(d, i);

          var x = _this2._x(d, i);

          var y = _this2._y(d, i);

          var endpointX = x;
          if (orient === "left") endpointX -= _this2._length(d, i);else if (orient === "right") endpointX += _this2._length(d, i);
          var endpointY = y;
          if (orient === "top") endpointY -= _this2._length(d, i);else if (orient === "bottom") endpointY += _this2._length(d, i);
          lineData.push({
            __d3plus__: true,
            data: d,
            i: i,
            id: i,
            x: x,
            y: y
          });
          lineData.push({
            __d3plus__: true,
            data: d,
            i: i,
            id: i,
            x: endpointX,
            y: endpointY
          });
        }); // Draw whisker line.


        this._line = new Line().data(lineData).select(elem("g.d3plus-Whisker", {
          parent: this._select
        }).node()).config(configPrep.bind(this)(this._lineConfig, "shape")).render(callback);

        var whiskerData = this._data.map(function (d, i) {
          var dataObj = {};
          dataObj.__d3plus__ = true;
          dataObj.data = d;
          dataObj.i = i;
          dataObj.endpoint = _this2._endpoint(d, i);
          dataObj.length = _this2._length(d, i);
          dataObj.orient = _this2._orient(d, i);

          var endpointX = _this2._x(d, i);

          if (dataObj.orient === "left") endpointX -= dataObj.length;else if (dataObj.orient === "right") endpointX += dataObj.length;

          var endpointY = _this2._y(d, i);

          if (dataObj.orient === "top") endpointY -= dataObj.length;else if (dataObj.orient === "bottom") endpointY += dataObj.length;
          dataObj.x = endpointX;
          dataObj.y = endpointY;
          return dataObj;
        }); // Draw whisker endpoint.


        this._whiskerEndpoint = [];
        nest().key(function (d) {
          return d.endpoint;
        }).entries(whiskerData).forEach(function (shapeData) {
          var shapeName = shapeData.key;

          _this2._whiskerEndpoint.push(new shapes[shapeName]().data(shapeData.values).select(elem("g.d3plus-Whisker-Endpoint-".concat(shapeName), {
            parent: _this2._select
          }).node()).config({
            height: function height(d) {
              return d.orient === "top" || d.orient === "bottom" ? 5 : 20;
            },
            width: function width(d) {
              return d.orient === "top" || d.orient === "bottom" ? 20 : 5;
            }
          }).config(configPrep.bind(_this2)(_this2._endpointConfig, "shape", shapeName)).render());
        });
        return this;
      }
      /**
          @memberof Whisker
          @desc Sets the highlight accessor to the Shape class's active function.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "active",
      value: function active(_) {
        if (this._line) this._line.active(_);
        if (this._whiskerEndpoint) this._whiskerEndpoint.forEach(function (endPoint) {
          return endPoint.active(_);
        });
      }
      /**
          @memberof Whisker
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the endpoint accessor to the specified function or string and returns the current class instance.
          @param {Function|String}
          @chainable
      */

    }, {
      key: "endpoint",
      value: function endpoint(_) {
        return arguments.length ? (this._endpoint = typeof _ === "function" ? _ : constant$3(_), this) : this._endpoint;
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the config method for each endpoint and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "endpointConfig",
      value: function endpointConfig(_) {
        return arguments.length ? (this._endpointConfig = assign(this._endpointConfig, _), this) : this._endpointConfig;
      }
      /**
          @memberof Whisker
          @desc Sets the highlight accessor to the Shape class's hover function.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "hover",
      value: function hover(_) {
        if (this._line) this._line.hover(_);
        if (this._whiskerEndpoint) this._whiskerEndpoint.forEach(function (endPoint) {
          return endPoint.hover(_);
        });
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the length accessor for whisker and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
      */

    }, {
      key: "length",
      value: function length(_) {
        return arguments.length ? (this._length = typeof _ === "function" ? _ : constant$3(_), this) : this._length;
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the config method for line shape and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "lineConfig",
      value: function lineConfig(_) {
        return arguments.length ? (this._lineConfig = assign(this._lineConfig, _), this) : this._lineConfig;
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.
          @param {Function|String} [*value* = "top"] Accepts "top", "right", "bottom" or "left"
          @chainable
      */

    }, {
      key: "orient",
      value: function orient(_) {
        return arguments.length ? (this._orient = typeof _ === "function" ? _ : constant$3(_), this) : this._orient;
      }
      /**
          @memberof Whisker
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = _select(_), this) : this._select;
      }
      /**
        @memberof Whisker
        @desc If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.
        @param {Function|Number} [*value*]
        @chainable
        @example
      function(d) {
      return d.x;
      }
      */

    }, {
      key: "x",
      value: function x(_) {
        return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$3(_), this) : this._x;
      }
      /**
          @memberof Whisker
          @desc If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.y;
      }
      */

    }, {
      key: "y",
      value: function y(_) {
        return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$3(_), this) : this._y;
      }
    }]);

    return Whisker;
  }(BaseClass);

  function _typeof$c(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$c = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$c = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$c(obj);
  }

  function _classCallCheck$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$b(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$b(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$b(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$b(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$9(self, call) {
    if (call && (_typeof$c(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$9(self);
  }

  function _assertThisInitialized$9(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf$9(o) {
    _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$9(o);
  }

  function _inherits$9(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$9(subClass, superClass);
  }

  function _setPrototypeOf$9(o, p) {
    _setPrototypeOf$9 = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$9(o, p);
  }
  var shapes$1 = {
    Circle: Circle,
    Rect: Rect
  };
  /**
      @class Box
      @extends BaseClass
      @desc Creates SVG box based on an array of data.
  */

  var Box =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits$9(Box, _BaseClass);
    /**
        @memberof Box
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
        @private
    */


    function Box() {
      var _this;

      _classCallCheck$b(this, Box);

      _this = _possibleConstructorReturn$9(this, _getPrototypeOf$9(Box).call(this));
      _this._medianConfig = {
        fill: constant$3("black")
      };
      _this._orient = accessor("orient", "vertical");
      _this._outlier = accessor("outlier", "Circle");
      _this._outlierConfig = {
        Circle: {
          r: accessor("r", 5)
        },
        Rect: {
          height: function height(d, i) {
            return _this._orient(d, i) === "vertical" ? 5 : 20;
          },
          width: function width(d, i) {
            return _this._orient(d, i) === "vertical" ? 20 : 5;
          }
        }
      };
      _this._rectConfig = {
        fill: constant$3("white"),
        stroke: constant$3("black"),
        strokeWidth: constant$3(1)
      };
      _this._rectWidth = constant$3(50);
      _this._whiskerConfig = {};
      _this._whiskerMode = ["tukey", "tukey"];
      _this._x = accessor("x", 250);
      _this._y = accessor("y", 250);
      return _this;
    }
    /**
        @memberof Box
        @desc Draws the Box.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass$b(Box, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this._select === void 0) {
          this.select(_select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
        }

        var outlierData = [];
        var filteredData = nest().key(function (d, i) {
          return _this2._orient(d, i) === "vertical" ? _this2._x(d, i) : _this2._y(d, i);
        }).entries(this._data).map(function (d) {
          d.data = objectMerge(d.values);
          d.i = _this2._data.indexOf(d.values[0]);
          d.orient = _this2._orient(d.data, d.i);
          var values = d.values.map(d.orient === "vertical" ? _this2._y : _this2._x);
          values.sort(function (a, b) {
            return a - b;
          });
          d.first = quantile(values, 0.25);
          d.median = quantile(values, 0.50);
          d.third = quantile(values, 0.75);
          var mode = _this2._whiskerMode;

          if (mode[0] === "tukey") {
            d.lowerLimit = d.first - (d.third - d.first) * 1.5;
            if (d.lowerLimit < min(values)) d.lowerLimit = min(values);
          } else if (mode[0] === "extent") d.lowerLimit = min(values);else if (typeof mode[0] === "number") d.lowerLimit = quantile(values, mode[0]);

          if (mode[1] === "tukey") {
            d.upperLimit = d.third + (d.third - d.first) * 1.5;
            if (d.upperLimit > max(values)) d.upperLimit = max(values);
          } else if (mode[1] === "extent") d.upperLimit = max(values);else if (typeof mode[1] === "number") d.upperLimit = quantile(values, mode[1]);

          var rectLength = d.third - d.first; // Compute values for vertical orientation.

          if (d.orient === "vertical") {
            d.height = rectLength;
            d.width = _this2._rectWidth(d.data, d.i);
            d.x = _this2._x(d.data, d.i);
            d.y = d.first + rectLength / 2;
          } else if (d.orient === "horizontal") {
            // Compute values for horizontal orientation.
            d.height = _this2._rectWidth(d.data, d.i);
            d.width = rectLength;
            d.x = d.first + rectLength / 2;
            d.y = _this2._y(d.data, d.i);
          } // Compute data for outliers.


          d.values.forEach(function (eachValue, index) {
            var value = d.orient === "vertical" ? _this2._y(eachValue, index) : _this2._x(eachValue, index);

            if (value < d.lowerLimit || value > d.upperLimit) {
              var dataObj = {};
              dataObj.__d3plus__ = true;
              dataObj.data = eachValue;
              dataObj.i = index;
              dataObj.outlier = _this2._outlier(eachValue, index);

              if (d.orient === "vertical") {
                dataObj.x = d.x;
                dataObj.y = value;
                outlierData.push(dataObj);
              } else if (d.orient === "horizontal") {
                dataObj.y = d.y;
                dataObj.x = value;
                outlierData.push(dataObj);
              }
            }
          });
          d.__d3plus__ = true;
          return d;
        }); // Draw box.

        this._box = new Rect().data(filteredData).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).select(elem("g.d3plus-Box", {
          parent: this._select
        }).node()).config(configPrep.bind(this)(this._rectConfig, "shape")).render(); // Draw median.

        this._median = new Rect().data(filteredData).x(function (d) {
          return d.orient === "vertical" ? d.x : d.median;
        }).y(function (d) {
          return d.orient === "vertical" ? d.median : d.y;
        }).height(function (d) {
          return d.orient === "vertical" ? 1 : d.height;
        }).width(function (d) {
          return d.orient === "vertical" ? d.width : 1;
        }).select(elem("g.d3plus-Box-Median", {
          parent: this._select
        }).node()).config(configPrep.bind(this)(this._medianConfig, "shape")).render(); // Draw 2 lines using Whisker class.
        // Construct coordinates for whisker startpoints and push it to the whiskerData.

        var whiskerData = [];
        filteredData.forEach(function (d, i) {
          var x = d.x;
          var y = d.y;
          var topLength = d.first - d.lowerLimit;
          var bottomLength = d.upperLimit - d.third;

          if (d.orient === "vertical") {
            var topY = y - d.height / 2;
            var bottomY = y + d.height / 2;
            whiskerData.push({
              __d3plus__: true,
              data: d,
              i: i,
              x: x,
              y: topY,
              length: topLength,
              orient: "top"
            }, {
              __d3plus__: true,
              data: d,
              i: i,
              x: x,
              y: bottomY,
              length: bottomLength,
              orient: "bottom"
            });
          } else if (d.orient === "horizontal") {
            var topX = x + d.width / 2;
            var bottomX = x - d.width / 2;
            whiskerData.push({
              __d3plus__: true,
              data: d,
              i: i,
              x: topX,
              y: y,
              length: bottomLength,
              orient: "right"
            }, {
              __d3plus__: true,
              data: d,
              i: i,
              x: bottomX,
              y: y,
              length: topLength,
              orient: "left"
            });
          }
        }); // Draw whiskers.

        this._whisker = new Whisker().data(whiskerData).select(elem("g.d3plus-Box-Whisker", {
          parent: this._select
        }).node()).config(configPrep.bind(this)(this._whiskerConfig, "shape")).render(); // Draw outliers.

        this._whiskerEndpoint = [];
        nest().key(function (d) {
          return d.outlier;
        }).entries(outlierData).forEach(function (shapeData) {
          var shapeName = shapeData.key;

          _this2._whiskerEndpoint.push(new shapes$1[shapeName]().data(shapeData.values).select(elem("g.d3plus-Box-Outlier-".concat(shapeName), {
            parent: _this2._select
          }).node()).config(configPrep.bind(_this2)(_this2._outlierConfig, "shape", shapeName)).render());
        });
        return this;
      }
      /**
          @memberof Box
          @desc Sets the highlight accessor to the Shape class's active function.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "active",
      value: function active(_) {
        if (this._box) this._box.active(_);
        if (this._median) this._median.active(_);
        if (this._whisker) this._whisker.active(_);
        if (this._whiskerEndpoint) this._whiskerEndpoint.forEach(function (endPoint) {
          return endPoint.active(_);
        });
      }
      /**
          @memberof Box
          @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
          @param {Array} [*data* = []]
          @chainable
      */

    }, {
      key: "data",
      value: function data(_) {
        return arguments.length ? (this._data = _, this) : this._data;
      }
      /**
          @memberof Box
          @desc Sets the highlight accessor to the Shape class's hover function.
          @param {Function} [*value*]
          @chainable
      */

    }, {
      key: "hover",
      value: function hover(_) {
        if (this._box) this._box.hover(_);
        if (this._median) this._median.hover(_);
        if (this._whisker) this._whisker.hover(_);
        if (this._whiskerEndpoint) this._whiskerEndpoint.forEach(function (endPoint) {
          return endPoint.hover(_);
        });
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the config method for median and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "medianConfig",
      value: function medianConfig(_) {
        return arguments.length ? (this._medianConfig = assign(this._medianConfig, _), this) : this._medianConfig;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.
          @param {Function|String} [*value* = "vertical"] Accepts "vertical" or "horizontal"
          @chainable
      */

    }, {
      key: "orient",
      value: function orient(_) {
        return arguments.length ? (this._orient = typeof _ === "function" ? _ : constant$3(_), this) : this._orient;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the outlier accessor to the specified function or string and returns the current class instance.
          @param {Function|String}
          @chainable
      */

    }, {
      key: "outlier",
      value: function outlier(_) {
        return arguments.length ? (this._outlier = typeof _ === "function" ? _ : constant$3(_), this) : this._outlier;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the config method for each outlier point and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "outlierConfig",
      value: function outlierConfig(_) {
        return arguments.length ? (this._outlierConfig = assign(this._outlierConfig, _), this) : this._outlierConfig;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the config method for rect shape and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "rectConfig",
      value: function rectConfig(_) {
        return arguments.length ? (this._rectConfig = assign(this._rectConfig, _), this) : this._rectConfig;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.width;
      }
      */

    }, {
      key: "rectWidth",
      value: function rectWidth(_) {
        return arguments.length ? (this._rectWidth = typeof _ === "function" ? _ : constant$3(_), this) : this._rectWidth;
      }
      /**
          @memberof Box
          @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
          @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
          @chainable
      */

    }, {
      key: "select",
      value: function select(_) {
        return arguments.length ? (this._select = _select(_), this) : this._select;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the config method for whisker and returns the current class instance.
          @param {Object} [*value*]
          @chainable
      */

    }, {
      key: "whiskerConfig",
      value: function whiskerConfig(_) {
        return arguments.length ? (this._whiskerConfig = assign(this._whiskerConfig, _), this) : this._whiskerConfig;
      }
      /**
          @memberof Box
          @desc Determines the value used for each whisker. Can be passed a single value to apply for both whiskers, or an Array of 2 values for the lower and upper whiskers (in that order). Accepted values are `"tukey"`, `"extent"`, or a Number representing a quantile.
          @param {String|Number|String[]|Number[]} [*value* = "tukey"]
          @chainable
      */

    }, {
      key: "whiskerMode",
      value: function whiskerMode(_) {
        return arguments.length ? (this._whiskerMode = _ instanceof Array ? _ : [_, _], this) : this._whiskerMode;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.x;
      }
      */

    }, {
      key: "x",
      value: function x(_) {
        return arguments.length ? (this._x = typeof _ === "function" ? _ : accessor(_), this) : this._x;
      }
      /**
          @memberof Box
          @desc If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.
          @param {Function|Number} [*value*]
          @chainable
          @example
      function(d) {
      return d.y;
      }
      */

    }, {
      key: "y",
      value: function y(_) {
        return arguments.length ? (this._y = typeof _ === "function" ? _ : accessor(_), this) : this._y;
      }
    }]);

    return Box;
  }(BaseClass);

  var pi$2 = Math.PI;
  /**
      @function shapeEdgePoint
      @desc Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
      @param {Number} angle The angle, in radians, of the offset point.
      @param {Number} distance The pixel distance away from the origin.
      @returns {String} [shape = "circle"] The type of shape, which can be either "circle" or "square".
  */

  var shapeEdgePoint = (function (angle, distance) {
    var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "circle";
    if (angle < 0) angle = pi$2 * 2 + angle;

    if (shape === "square") {
      var diagonal = 45 * (pi$2 / 180);
      var x = 0,
          y = 0;

      if (angle < pi$2 / 2) {
        var tan = Math.tan(angle);
        x += angle < diagonal ? distance : distance / tan;
        y += angle < diagonal ? tan * distance : distance;
      } else if (angle <= pi$2) {
        var _tan = Math.tan(pi$2 - angle);

        x -= angle < pi$2 - diagonal ? distance / _tan : distance;
        y += angle < pi$2 - diagonal ? distance : _tan * distance;
      } else if (angle < diagonal + pi$2) {
        x -= distance;
        y -= Math.tan(angle - pi$2) * distance;
      } else if (angle < 3 * pi$2 / 2) {
        x -= distance / Math.tan(angle - pi$2);
        y -= distance;
      } else if (angle < 2 * pi$2 - diagonal) {
        x += distance / Math.tan(2 * pi$2 - angle);
        y -= distance;
      } else {
        x += distance;
        y -= Math.tan(2 * pi$2 - angle) * distance;
      }

      return [x, y];
    } else if (shape === "circle") {
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    } else return null;
  });

  var pi$3 = Math.PI;
  /**
      @function path2polygon
      @desc Transforms a path string into an Array of points.
      @param {String} path An SVG string path, commonly the "d" property of a <path> element.
      @param {Number} [segmentLength = 20] The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid.
      @returns {Array}
  */

  var path2polygon = (function (path) {
    var segmentLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var poly = [],
        regex = /([MLA])([^MLAZ]+)/ig;
    var match = regex.exec(path);

    while (match !== null) {
      if (["M", "L"].includes(match[1])) poly.push(match[2].split(",").map(Number));else if (match[1] === "A") {
        var points = match[2].split(",").map(Number);
        var last = points.slice(points.length - 2, points.length),
            prev = poly[poly.length - 1],
            radius = points[0],
            width = pointDistance(prev, last);
        var angle = Math.acos((radius * radius + radius * radius - width * width) / (2 * radius * radius));
        if (points[2]) angle = pi$3 * 2 - angle;
        var step = angle / (angle / (pi$3 * 2) * (radius * pi$3 * 2) / segmentLength);
        var start = Math.atan2(-prev[1], -prev[0]) - pi$3;
        var i = step;

        while (i < angle) {
          poly.push(shapeEdgePoint(points[4] ? start + i : start - i, radius));
          i += step;
        }

        poly.push(last);
      }
      match = regex.exec(path);
    }

    return poly;
  });

  function _typeof$d(obj) {
    if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") {
      _typeof$d = function _typeof$1(obj) {
        return _typeof(obj);
      };
    } else {
      _typeof$d = function _typeof$1(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
      };
    }

    return _typeof$d(obj);
  }

  function _classCallCheck$c(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$c(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$c(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$c(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$c(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn$a(self, call) {
    if (call && (_typeof$d(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$a(self);
  }

  function _assertThisInitialized$a(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _get$5(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get$5 = Reflect.get;
    } else {
      _get$5 = function _get(target, property, receiver) {
        var base = _superPropBase$5(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get$5(target, property, receiver || target);
  }

  function _superPropBase$5(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf$a(object);
      if (object === null) break;
    }

    return object;
  }

  function _getPrototypeOf$a(o) {
    _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf$a(o);
  }

  function _inherits$a(subClass, superClass) {
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
    if (superClass) _setPrototypeOf$a(subClass, superClass);
  }

  function _setPrototypeOf$a(o, p) {
    _setPrototypeOf$a = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf$a(o, p);
  }
  /**
      @class Path
      @extends Shape
      @desc Creates SVG Paths based on an array of data.
  */

  var Path$1 =
  /*#__PURE__*/
  function (_Shape) {
    _inherits$a(Path, _Shape);
    /**
        @memberof Path
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */


    function Path() {
      var _this;

      _classCallCheck$c(this, Path);

      _this = _possibleConstructorReturn$a(this, _getPrototypeOf$a(Path).call(this, "path"));
      _this._d = accessor("path");

      _this._labelBounds = function (d, i, aes) {
        var r = largestRect(aes.points, {
          angle: _this._labelConfig.rotate ? _this._labelConfig.rotate(d, i) : 0
        });
        return r ? {
          angle: r.angle,
          width: r.width,
          height: r.height,
          x: r.cx - r.width / 2,
          y: r.cy - r.height / 2
        } : false;
      };

      _this._name = "Path";
      _this._labelConfig = Object.assign(_this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      return _this;
    }
    /**
        @memberof Path
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */


    _createClass$c(Path, [{
      key: "_aes",
      value: function _aes(d, i) {
        return {
          points: path2polygon(this._d(d, i))
        };
      }
      /**
          @memberof Path
          @desc Draws the paths.
          @param {Function} [*callback*]
          @chainable
      */

    }, {
      key: "render",
      value: function render(callback) {
        _get$5(_getPrototypeOf$a(Path.prototype), "render", this).call(this, callback);

        var enter = this._enter.attr("d", this._d).call(this._applyStyle.bind(this));

        var update = this._update;

        if (this._duration) {
          enter.attr("opacity", 0).transition(this._transition).attr("opacity", 1);
          update = update.transition(this._transition);

          this._exit.transition(this._transition).attr("opacity", 0);
        }

        update.call(this._applyStyle.bind(this)).attr("d", this._d);
        return this;
      }
      /**
          @memberof Path
          @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance.
          @param {Function|String} [*value*]
          @chainable
          @example
      function(d) {
      return d.path;
      }
      */

    }, {
      key: "d",
      value: function d(_) {
        return arguments.length ? (this._d = typeof _ === "function" ? _ : constant$3(_), this) : this._d;
      }
    }]);

    return Path;
  }(Shape);



  var shapes$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Image: Image,
    Shape: Shape,
    Area: Area,
    Bar: Bar,
    Box: Box,
    Circle: Circle,
    Line: Line,
    Path: Path$1,
    Rect: Rect,
    Whisker: Whisker,
    largestRect: largestRect,
    lineIntersection: lineIntersection,
    path2polygon: path2polygon,
    pointDistance: pointDistance,
    pointDistanceSquared: pointDistanceSquared,
    pointRotate: pointRotate,
    polygonInside: polygonInside,
    polygonRayCast: polygonRayCast,
    polygonRotate: polygonRotate,
    segmentBoxContains: segmentBoxContains,
    segmentsIntersect: segmentsIntersect,
    shapeEdgePoint: shapeEdgePoint,
    simplify: simplify
  });

  /**
      @function date
      @summary Parses numbers and strings to valid Javascript Date objects.
      @description Returns a javascript Date object for a given a Number (representing either a 4-digit year or milliseconds since epoch) or a String that is in [valid dateString format](http://dygraphs.com/date-formats.html). Besides the 4-digit year parsing, this function is useful when needing to parse negative (BC) years, which the vanilla Date object cannot parse.
      @param {Number|String} *date*
  */
  function date$2 (d) {
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

  var locale$2 = {
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
          fontFamily: new TextBox().fontFamily(),
          fontResize: false,
          fontSize: constant$3(10),
          padding: 0,
          textAnchor: function textAnchor() {
            var rtl = detectRTL();
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
      _this._titleClass = new TextBox();
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
        bar.call(attrize, this._barConfig).attr("".concat(x, "1"), this._getPosition(domain[0]) - x1mod).attr("".concat(x, "2"), this._getPosition(domain[domain.length - 1]) + x2mod).attr("".concat(y, "1"), position).attr("".concat(y, "2"), position);
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
        var domain = ["band", "ordinal", "point"].includes(this._scale) ? ticks : extent(ticks);
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
        return ticks[0] > ticks[1] ? extent(ticks).reverse() : extent(ticks);
      }
      /**
          @memberof Axis
          @desc Returns the scale's ticks, taking into account negative and positive log scales.
          @private
      */

    }, {
      key: "_getTicks",
      value: function _getTicks() {
        var tickScale = sqrt().domain([10, 400]).range([10, 50]);
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

        lines.call(attrize, this._gridConfig).attr("".concat(x, "1"), xPos).attr("".concat(x, "2"), xPos).attr("".concat(y, "1"), position).attr("".concat(y, "2"), last ? position : position + size);
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
        var _this2 = this,
            _this$_outerBounds;

        /**
         * Creates an SVG element to contain the axis if none
         * has been specified using the "select" method.
         */
        if (this._select === void 0) {
          this.select(_select("body").append("svg").attr("width", "".concat(this._width, "px")).attr("height", "".concat(this._height, "px")).node());
        }

        var timeLocale = this._timeLocale || locale$2[this._locale] || locale$2["en-US"];
        defaultLocale(timeLocale).format();
        var formatDay = timeFormat("%a %d"),
            formatHour = timeFormat("%I %p"),
            formatMillisecond = timeFormat(".%L"),
            formatMinute = timeFormat("%I:%M"),
            formatMonth = timeFormat("%b"),
            formatSecond = timeFormat(":%S"),
            formatWeek = timeFormat("%b %d"),
            formatYear = timeFormat("%Y");
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
            t = transition().duration(this._duration);
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
         * Constructs the tick formatter function.
         */

        var tickFormat = this._tickFormat ? this._tickFormat : function (d) {
          if (_this2._scale === "time") {
            return (second(d) < d ? formatMillisecond : minute(d) < d ? formatSecond : hour(d) < d ? formatMinute : day(d) < d ? formatHour : month(d) < d ? sunday(d) < d ? formatDay : formatWeek : year(d) < d ? formatMonth : formatYear)(d);
          } else if (["band", "ordinal", "point"].includes(_this2._scale)) {
            return d;
          }

          if (isNaN(d)) {
            return d;
          } else if (_this2._scale === "linear" && _this2._tickSuffix === "smallest") {
            var _locale = _typeof(_this2._locale) === "object" ? _this2._locale : formatLocale$3[_this2._locale];

            var separator = _locale.separator,
                suffixes = _locale.suffixes;
            var suff = d >= 1000 ? suffixes[_this2._tickUnit + 8] : "";
            var tick = d / Math.pow(10, 3 * _this2._tickUnit);
            var number = formatAbbreviate(tick, _locale, ",.".concat(tick.toString().length, "r"));
            return "".concat(number).concat(separator).concat(suff);
          } else {
            return formatAbbreviate(d, _this2._locale);
          }
        };
        /**
         * (Re)calculates the internal d3 scale
         * @param {} newRange
         */

        function setScale() {
          var _this3 = this;

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
              range = d3Range(buckets).map(function (d) {
                return range[0] + sizeInner * (d / (buckets - 1));
              }).slice(1, buckets);
              range = range.map(function (d) {
                return d - range[0] / 2;
              });
            } else {
              var _buckets = this._domain.length;
              var size = range[1] - range[0];
              range = d3Range(_buckets).map(function (d) {
                return range[0] + size * (d / (_buckets - 1));
              });
            }
          } else if (newRange === this._range) {
            var tickScale = sqrt().domain([10, 400]).range([10, 50]);
            var domain = this._scale === "time" ? this._domain.map(date$2) : this._domain;
            var scaleTicks = d3Ticks(domain[0], domain[1], Math.floor(sizeInner / tickScale(sizeInner)));
            ticks = (this._ticks ? this._scale === "time" ? this._ticks.map(date$2) : this._ticks : scaleTicks).slice();
            labels = (this._labels ? this._scale === "time" ? this._labels.map(date$2) : this._labels : scaleTicks).slice();
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


          var scale = "scale".concat(this._scale.charAt(0).toUpperCase()).concat(this._scale.slice(1));
          this._d3Scale = scales[scale]().domain(this._scale === "time" ? this._domain.map(date$2) : this._domain).range(range);
          if (this._d3Scale.padding) this._d3Scale.padding(this._scalePadding);
          if (this._d3Scale.paddingInner) this._d3Scale.paddingInner(this._paddingInner);
          if (this._d3Scale.paddingOuter) this._d3Scale.paddingOuter(this._paddingOuter);
          /**
           * Constructs a separate "negative only" scale for logarithmic
           * domains, as they cannot pass zero.
           */

          this._d3ScaleNegative = null;

          if (this._scale === "log") {
            var _domain = this._d3Scale.domain();

            if (_domain[0] === 0) {
              _domain[0] = Math.abs(_domain[_domain.length - 1]) <= 1 ? 1e-6 : 1;
              if (_domain[_domain.length - 1] < 0) _domain[0] *= -1;
            } else if (_domain[_domain.length - 1] === 0) {
              _domain[_domain.length - 1] = Math.abs(_domain[0]) <= 1 ? 1e-6 : 1;
              if (_domain[0] < 0) _domain[_domain.length - 1] *= -1;
            }

            var _range = this._d3Scale.range();

            if (_domain[0] < 0 && _domain[_domain.length - 1] < 0) {
              this._d3ScaleNegative = this._d3Scale.copy().domain(_domain).range(_range);
              this._d3Scale = null;
            } else if (_domain[0] > 0 && _domain[_domain.length - 1] > 0) {
              this._d3Scale.domain(_domain).range(_range);
            } else {
              var percentScale = log().domain([1, _domain[_domain[1] > 0 ? 1 : 0]]).range([0, 1]);
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


          ticks = (this._ticks ? this._scale === "time" ? this._ticks.map(date$2) : this._ticks : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks) ? this._getTicks() : this._domain).slice();
          labels = (this._labels ? this._scale === "time" ? this._labels.map(date$2) : this._labels : (this._d3Scale ? this._d3Scale.ticks : this._d3ScaleNegative.ticks) ? this._getTicks() : ticks).slice();

          if (this._scale === "log") {
            var tens = labels.filter(function (t) {
              return Math.abs(t).toString().charAt(0) === "1" && (_this3._d3Scale ? t !== -1 : t !== 1);
            });

            if (tens.length > 2) {
              labels = tens;
              ticks = tens;
            } else if (labels.length >= 10) {
              labels = labels.filter(function (t) {
                return t % 5 === 0 || tickFormat(t).substr(-1) === "1";
              });
            }
          }

          if (this._scale === "time") {
            ticks = ticks.map(Number);
            labels = labels.map(Number);
          }

          ticks = ticks.sort(function (a, b) {
            return _this3._getPosition(a) - _this3._getPosition(b);
          });
          labels = labels.sort(function (a, b) {
            return _this3._getPosition(a) - _this3._getPosition(b);
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
            if (_this3._shape === "Circle") s *= 2;

            var t = _this3._getPosition(d);

            if (!pixels.length || Math.abs(closest(t, pixels) - t) > s * 2) pixels.push(t);else pixels.push(false);
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
            return min([prevSpace, nextSpace]) * 2;
          }
        }
        /**
         * Pre-calculates the size of the title, if defined, in order
         * to adjust the internal margins.
         */


        if (this._title) {
          var _this$_titleConfig = this._titleConfig,
              fontFamily = _this$_titleConfig.fontFamily,
              fontSize = _this$_titleConfig.fontSize,
              lineHeight = _this$_titleConfig.lineHeight;
          var titleWrap = textWrap().fontFamily(typeof fontFamily === "function" ? fontFamily() : fontFamily).fontSize(typeof fontSize === "function" ? fontSize() : fontSize).lineHeight(typeof lineHeight === "function" ? lineHeight() : lineHeight).width(range[range.length - 1] - range[0] - p * 2).height(this["_".concat(height)] - this._tickSize - p * 2);
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
        if (typeof hBuff === "function") hBuff = max(ticks.map(hBuff));
        if (this._shape === "Rect") hBuff /= 2;
        if (typeof wBuff === "function") wBuff = max(ticks.map(wBuff));
        if (this._shape !== "Circle") wBuff /= 2;
        /**
         * Calculates the space each label would take up, given
         * the provided this._space size.
         */

        var textData = labels.map(function (d, i) {
          var fF = _this2._shapeConfig.labelConfig.fontFamily(d, i),
              fS = _this2._shapeConfig.labelConfig.fontSize(d, i),
              position = _this2._getPosition(d);

          var lineHeight = _this2._shapeConfig.lineHeight ? _this2._shapeConfig.lineHeight(d, i) : fS * 1.4;
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
          var wSize = min([this._maxSize, this._width]);
          var hSize = min([this._maxSize, this._height]);
          var wrap = textWrap().fontFamily(fF).fontSize(fS).lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined)[w](horizontal ? space : wSize - hBuff - p - this._margin.left - this._margin.right)[h](horizontal ? hSize - hBuff - p - this._margin.top - this._margin.bottom : space);
          var res = wrap(tickFormat(d));
          res.lines = res.lines.filter(function (d) {
            return d !== "";
          });
          res.width = res.lines.length ? Math.ceil(max(res.widths)) + fS / 4 : 0;
          if (res.width % 2) res.width++;
          res.height = res.lines.length ? Math.ceil(res.lines.length * wrap.lineHeight()) + fS / 4 : 0;
          if (res.height % 2) res.height++;
          return res;
        }

        textData = textData.map(function (datum) {
          datum.rotate = _this2._labelRotation;
          datum.space = calculateSpace.bind(_this2)(datum);
          var res = calculateLabelSize.bind(_this2)(datum);
          return Object.assign(res, datum);
        });
        this._rotateLabels = horizontal && this._labelRotation === undefined ? textData.some(function (d) {
          return d.truncated;
        }) : this._labelRotation;

        if (this._rotateLabels) {
          textData = textData.map(function (datum) {
            datum.rotate = true;
            var res = calculateLabelSize.bind(_this2)(datum);
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
            var fF = _this2._shapeConfig.labelConfig.fontFamily(d, i),
                fS = _this2._shapeConfig.labelConfig.fontSize(d, i),
                position = _this2._getPosition(d);

            var lineHeight = _this2._shapeConfig.lineHeight ? _this2._shapeConfig.lineHeight(d, i) : fS * 1.4;
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
            datum.rotate = _this2._rotateLabels;
            datum.space = calculateSpace.bind(_this2)(datum);
            var res = calculateLabelSize.bind(_this2)(datum);
            return Object.assign(res, datum);
          });
        }

        var labelHeight = max(textData, function (t) {
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
            datum.space = calculateSpace.bind(_this2)(datum, 2);
            var res = calculateLabelSize.bind(_this2)(datum);
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

        var globalOffset = this._labelOffset ? max(textData, function (d) {
          return d.offset || 0;
        }) : 0;
        textData.forEach(function (datum) {
          return datum.offset = datum.offset ? globalOffset : 0;
        });
        var tBuff = this._shape === "Line" ? 0 : hBuff;
        var bounds = this._outerBounds = (_this$_outerBounds = {}, _defineProperty(_this$_outerBounds, height, (max(textData, function (t) {
          return Math.ceil(t[t.rotate || !horizontal ? "width" : "height"] + t.offset);
        }) || 0) + (textData.length ? p : 0)), _defineProperty(_this$_outerBounds, width, rangeOuter[rangeOuter.length - 1] - rangeOuter[0]), _defineProperty(_this$_outerBounds, x, rangeOuter[0]), _this$_outerBounds);
        bounds[height] = max([this._minSize, bounds[height]]);
        margin[this._orient] += hBuff;
        margin[opposite] = this._gridSize !== undefined ? max([this._gridSize, tBuff]) : this["_".concat(height)] - margin[this._orient] - bounds[height] - p;
        bounds[height] += margin[opposite] + margin[this._orient];
        bounds[y] = this._align === "start" ? this._padding : this._align === "end" ? this["_".concat(height)] - bounds[height] - this._padding : this["_".concat(height)] / 2 - bounds[height] / 2;
        var group = elem("g#d3plus-Axis-".concat(this._uuid), {
          parent: parent
        });
        this._group = group;
        var grid = elem("g.grid", {
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

          var xPos = _this2._getPosition(d);

          var space = data ? data.space : 0;
          var lines = data ? data.lines.length : 1;
          var lineHeight = data ? data.lineHeight : 1;
          var labelOffset = data && _this2._labelOffset ? data.offset : 0;
          var labelWidth = horizontal ? space : bounds.width - margin[_this2._position.opposite] - hBuff - margin[_this2._orient] + p;
          var offset = margin[opposite],
              size = (hBuff + labelOffset) * (flip ? -1 : 1),
              yPos = flip ? bounds[y] + bounds[height] - offset : bounds[y] + offset;
          var tickConfig = (_tickConfig = {
            id: d,
            labelBounds: rotated && data ? {
              x: -data.width / 2 + data.fS / 4,
              y: _this2._orient === "bottom" ? size + p + (data.width - lineHeight * lines) / 2 : size - p * 2 - (data.width + lineHeight * lines) / 2,
              width: data.width,
              height: data.height
            } : {
              x: horizontal ? -space / 2 : _this2._orient === "left" ? -labelWidth - p + size : size + p,
              y: horizontal ? _this2._orient === "bottom" ? size + p : size - p - labelHeight : -space / 2,
              width: horizontal ? space : labelWidth,
              height: horizontal ? labelHeight : space
            },
            rotate: data ? data.rotate : false,
            size: labels.includes(d) ? size : 0,
            text: labels.includes(d) ? tickFormat(d) : false,
            tick: ticks.includes(d)
          }, _defineProperty(_tickConfig, x, xPos + (_this2._scale === "band" ? _this2._d3Scale.bandwidth() / 2 : 0)), _defineProperty(_tickConfig, y, yPos), _tickConfig);
          return tickConfig;
        });

        if (this._shape === "Line") {
          tickData = tickData.concat(tickData.map(function (d) {
            var dupe = Object.assign({}, d);
            dupe[y] += d.size;
            return dupe;
          }));
        }

        new shapes$2[this._shape]().data(tickData).duration(this._duration).labelConfig({
          ellipsis: function ellipsis(d) {
            return d && d.length ? "".concat(d, "...") : "";
          },
          rotate: function rotate(d) {
            return d.rotate ? -90 : 0;
          }
        }).select(elem("g.ticks", {
          parent: group
        }).node()).config(this._shapeConfig).render();
        var bar = group.selectAll("line.bar").data([null]);
        bar.enter().append("line").attr("class", "bar").attr("opacity", 0).call(this._barPosition.bind(this)).merge(bar).transition(t).attr("opacity", 1).call(this._barPosition.bind(this));

        this._titleClass.data(this._title ? [{
          text: this._title
        }] : []).duration(this._duration).height(margin[this._orient]).rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0).select(elem("g.d3plus-Axis-title", {
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
        return arguments.length ? (this._select = _select(_), this) : this._select;
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
        return arguments.length ? (this._shapeConfig = assign(this._shapeConfig, _), this) : this._shapeConfig;
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
  }(BaseClass);

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
  exports.date = date$2;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-axis.full.js.map
