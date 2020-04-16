/*
  d3plus-shape v0.16.14
  Fancy SVG shapes for visualizations
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3plus-common'), require('d3-array'), require('d3-color'), require('d3plus-color'), require('d3-shape'), require('d3plus-text'), require('d3-collection'), require('d3-interpolate-path'), require('d3-polygon')) :
  typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3-selection', 'd3-transition', 'd3plus-common', 'd3-array', 'd3-color', 'd3plus-color', 'd3-shape', 'd3plus-text', 'd3-collection', 'd3-interpolate-path', 'd3-polygon'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Selection, global.d3Transition, global.d3plusCommon, global.d3Array, global.d3Color, global.d3plusColor, global.paths, global.d3plusText, global.d3Collection, global.d3InterpolatePath, global.d3Polygon));
}(this, function (exports, d3Selection, d3Transition, d3plusCommon, d3Array, d3Color, d3plusColor, paths, d3plusText, d3Collection, d3InterpolatePath, d3Polygon) { 'use strict';

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
      _classCallCheck(this, Image);

      this._duration = 600;
      this._height = d3plusCommon.accessor("height");
      this._id = d3plusCommon.accessor("id");
      this._opacity = d3plusCommon.constant(1);
      this._pointerEvents = d3plusCommon.constant("auto");
      this._select;
      this._url = d3plusCommon.accessor("url");
      this._width = d3plusCommon.accessor("width");
      this._x = d3plusCommon.accessor("x", 0);
      this._y = d3plusCommon.accessor("y", 0);
    }
    /**
        @memberof Image
        @desc Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass(Image, [{
      key: "render",
      value: function render(callback) {
        var _this = this;

        if (this._select === void 0) this.select(d3Selection.select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());

        var images = this._select.selectAll(".d3plus-Image").data(this._data, this._id);

        var enter = images.enter().append("image").attr("class", "d3plus-Image").attr("opacity", 0).attr("width", 0).attr("height", 0).attr("x", function (d, i) {
          return _this._x(d, i) + _this._width(d, i) / 2;
        }).attr("y", function (d, i) {
          return _this._y(d, i) + _this._height(d, i) / 2;
        });
        var t = d3Transition.transition().duration(this._duration),
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
          var image = d3Selection.select(this),
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
        return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
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
        return arguments.length ? (this._opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._opacity;
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
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
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
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
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
        return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
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
        return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
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
        return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
      }
    }]);

    return Image;
  }();

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

  /**
      @class Shape
      @extends external:BaseClass
      @desc An abstracted class for generating shapes.
  */

  var Shape =
  /*#__PURE__*/
  function (_BaseClass) {
    _inherits(Shape, _BaseClass);

    /**
        @memberof Shape
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Shape() {
      var _this;

      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "g";

      _classCallCheck(this, Shape);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Shape).call(this));
      _this._activeOpacity = 0.25;
      _this._activeStyle = {
        "stroke": function stroke(d, i) {
          var c = _this._fill(d, i);

          if (["transparent", "none"].includes(c)) c = _this._stroke(d, i);
          return d3Color.color(c).darker(1);
        },
        "stroke-width": function strokeWidth(d, i) {
          var s = _this._strokeWidth(d, i) || 1;
          return s * 3;
        }
      };
      _this._ariaLabel = d3plusCommon.constant("");
      _this._backgroundImage = d3plusCommon.constant(false);
      _this._backgroundImageClass = new Image();
      _this._data = [];
      _this._duration = 600;
      _this._fill = d3plusCommon.constant("black");
      _this._fillOpacity = d3plusCommon.constant(1);
      _this._hoverOpacity = 0.5;
      _this._hoverStyle = {
        "stroke": function stroke(d, i) {
          var c = _this._fill(d, i);

          if (["transparent", "none"].includes(c)) c = _this._stroke(d, i);
          return d3Color.color(c).darker(0.5);
        },
        "stroke-width": function strokeWidth(d, i) {
          var s = _this._strokeWidth(d, i) || 1;
          return s * 2;
        }
      };

      _this._id = function (d, i) {
        return d.id !== void 0 ? d.id : i;
      };

      _this._label = d3plusCommon.constant(false);
      _this._labelClass = new d3plusText.TextBox();
      _this._labelConfig = {
        fontColor: function fontColor(d, i) {
          return d3plusColor.colorContrast(_this._fill(d, i));
        },
        fontSize: 12,
        padding: 5
      };
      _this._name = "Shape";
      _this._opacity = d3plusCommon.constant(1);
      _this._pointerEvents = d3plusCommon.constant("visiblePainted");
      _this._role = d3plusCommon.constant("presentation");
      _this._rotate = d3plusCommon.constant(0);
      _this._rx = d3plusCommon.constant(0);
      _this._ry = d3plusCommon.constant(0);
      _this._scale = d3plusCommon.constant(1);
      _this._shapeRendering = d3plusCommon.constant("geometricPrecision");

      _this._stroke = function (d, i) {
        return d3Color.color(_this._fill(d, i)).darker(1);
      };

      _this._strokeDasharray = d3plusCommon.constant("0");
      _this._strokeLinecap = d3plusCommon.constant("butt");
      _this._strokeOpacity = d3plusCommon.constant(1);
      _this._strokeWidth = d3plusCommon.constant(0);
      _this._tagName = tagName;
      _this._textAnchor = d3plusCommon.constant("start");
      _this._vectorEffect = d3plusCommon.constant("non-scaling-stroke");
      _this._verticalAlign = d3plusCommon.constant("top");
      _this._x = d3plusCommon.accessor("x", 0);
      _this._y = d3plusCommon.accessor("y", 0);
      return _this;
    }
    /**
        @memberof Shape
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */


    _createClass(Shape, [{
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
              var cursor = d3Selection.mouse(_this2._select.node()),
                  values = d.values.map(function (d) {
                return pointDistance(cursor, [_this2._x(d, i), _this2._y(d, i)]);
              });
              d = d.values[values.indexOf(d3Array.min(values))];
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

        elem.transition().duration(0).call(d3plusCommon.attrize, styleObject);
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
          if (d3Selection.select(this).classed("d3plus-textBox")) d = d.data;

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
              if (parent === group) d3Selection.select(this).call(that._applyStyle.bind(that));else d3Selection.select(this).call(that._updateStyle.bind(that, d3Selection.select(this), that._activeStyle));
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
          if (d3Selection.select(this).classed("d3plus-textBox")) d = d.data;

          if (d.__d3plusShape__ || d.__d3plus__) {
            while (d && (d.__d3plusShape__ || d.__d3plus__)) {
              i = d.i;
              d = d.data;
            }
          } else i = that._data.indexOf(d);

          var group = !that._hover || typeof that._hover !== "function" || !that._hover(d, i) ? parent : that._hoverGroup.node();
          if (group !== this.parentNode) group.appendChild(this);

          if (this.className.baseVal.includes("d3plus-Shape")) {
            if (parent === group) d3Selection.select(this).call(that._applyStyle.bind(that));else d3Selection.select(this).call(that._updateStyle.bind(that, d3Selection.select(this), that._hoverStyle));
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

        this._backgroundImageClass.data(imageData).duration(this._duration).opacity(this._nestWrapper(this._opacity)).pointerEvents("none").select(d3plusCommon.elem("g.d3plus-".concat(this._name, "-image"), {
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
        }).select(d3plusCommon.elem("g.d3plus-".concat(this._name, "-text"), {
          parent: this._group,
          update: {
            opacity: this._active ? this._activeOpacity : 1
          }
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._labelConfig)).render();
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
          this.select(d3Selection.select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
        }

        this._transition = d3Transition.transition().duration(this._duration);
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

        d3Selection.selectAll("g.d3plus-".concat(this._name, "-hover > *, g.d3plus-").concat(this._name, "-active > *")).each(function (d) {
          if (d && d.parentNode) d.parentNode.appendChild(this);else this.parentNode.removeChild(this);
        }); // Makes the update state of the group selection accessible.

        this._group = d3plusCommon.elem("g.d3plus-".concat(this._name, "-group"), {
          parent: this._select
        });
        var update = this._update = d3plusCommon.elem("g.d3plus-".concat(this._name, "-shape"), {
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
          return "d3plus-Shape d3plus-".concat(_this6._name, " d3plus-id-").concat(d3plusText.strip(_this6._nestWrapper(_this6._id)(d, i)));
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

        this._hoverGroup = d3plusCommon.elem("g.d3plus-".concat(this._name, "-hover"), {
          parent: this._group
        });
        this._activeGroup = d3plusCommon.elem("g.d3plus-".concat(this._name, "-active"), {
          parent: this._group
        });

        var hitAreas = this._group.selectAll(".d3plus-HitArea").data(this._hitArea && Object.keys(this._on).length ? data : [], key);

        hitAreas.order().call(this._applyTransform.bind(this));
        var isLine = this._name === "Line";
        isLine && this._path.curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).defined(this._defined).x(this._x).y(this._y);
        var hitEnter = hitAreas.enter().append(isLine ? "path" : "rect").attr("class", function (d, i) {
          return "d3plus-HitArea d3plus-id-".concat(d3plusText.strip(_this6._nestWrapper(_this6._id)(d, i)));
        }).attr("fill", "black").attr("stroke", "black").attr("pointer-events", "painted").attr("opacity", 0).call(this._applyTransform.bind(this));
        var that = this;
        var hitUpdates = hitAreas.merge(hitEnter).each(function (d) {
          var i = that._data.indexOf(d);

          var h = that._hitArea(d, i, that._aes(d, i));

          return h && !(that._name === "Line" && parseFloat(that._strokeWidth(d, i)) > 10) ? d3Selection.select(this).call(d3plusCommon.attrize, h) : d3Selection.select(this).remove();
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
        return arguments.length ? (this._activeStyle = d3plusCommon.assign({}, this._activeStyle, _), this) : this._activeStyle;
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
        return _ !== undefined ? (this._ariaLabel = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._ariaLabel;
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
        return arguments.length ? (this._backgroundImage = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._backgroundImage;
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
        return arguments.length ? (this._fill = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fill;
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
        return arguments.length ? (this._fillOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._fillOpacity;
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
        return arguments.length ? (this._hoverStyle = d3plusCommon.assign({}, this._hoverStyle, _), this) : this._hoverStyle;
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
        return arguments.length ? (this._hitArea = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._hitArea;
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
        return arguments.length ? (this._label = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._label;
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
        return arguments.length ? (this._labelBounds = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._labelBounds;
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
        return arguments.length ? (this._labelConfig = d3plusCommon.assign(this._labelConfig, _), this) : this._labelConfig;
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
        return arguments.length ? (this._opacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._opacity;
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
        return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._pointerEvents;
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
        return _ !== undefined ? (this._role = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._role;
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
        return arguments.length ? (this._rotate = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._rotate;
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
        return arguments.length ? (this._rx = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._rx;
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
        return arguments.length ? (this._ry = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._ry;
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
        return arguments.length ? (this._scale = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._scale;
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
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
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
        return arguments.length ? (this._shapeRendering = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._shapeRendering;
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
        return arguments.length ? (this._stroke = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._stroke;
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
        return arguments.length ? (this._strokeDasharray = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeDasharray;
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
        return arguments.length ? (this._strokeLinecap = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeLinecap;
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
        return arguments.length ? (this._strokeOpacity = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeOpacity;
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
        return arguments.length ? (this._strokeWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._strokeWidth;
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
        return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._textAnchor;
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
        return arguments.length ? (this._vectorEffect = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._vectorEffect;
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
        return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._verticalAlign;
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
        return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
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
        return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
      }
    }]);

    return Shape;
  }(d3plusCommon.BaseClass);

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

    return d3Polygon.polygonContains(polyB, polyA[0]);
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
        _origin2 = _slicedToArray(_origin, 2),
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
      angle: d3Array.range(-90, 90 + angleStep, angleStep),
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
      cacheString = d3Array.merge(poly).join(",");
      cacheString += "-".concat(options.minAspectRatio);
      cacheString += "-".concat(options.maxAspectRatio);
      cacheString += "-".concat(options.minHeight);
      cacheString += "-".concat(options.minWidth);
      cacheString += "-".concat(angles.join(","));
      cacheString += "-".concat(origins.join(","));
      if (polyCache[cacheString]) return polyCache[cacheString];
    }

    var area = Math.abs(d3Polygon.polygonArea(poly)); // take absolute value of the signed area

    if (area === 0) {
      if (options.verbose) console.error("polygon has 0 area", poly);
      return null;
    } // get the width of the bounding box of the original polygon to determine tolerance


    var _extent = d3Array.extent(poly, function (d) {
      return d[0];
    }),
        _extent2 = _slicedToArray(_extent, 2),
        minx = _extent2[0],
        maxx = _extent2[1];

    var _extent3 = d3Array.extent(poly, function (d) {
      return d[1];
    }),
        _extent4 = _slicedToArray(_extent3, 2),
        miny = _extent4[0],
        maxy = _extent4[1]; // simplify polygon


    var tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;
    if (tolerance > 0) poly = simplify(poly, tolerance);
    if (options.events) events.push({
      type: "simplify",
      poly: poly
    }); // get the width of the bounding box of the simplified polygon

    var _extent5 = d3Array.extent(poly, function (d) {
      return d[0];
    });

    var _extent6 = _slicedToArray(_extent5, 2);

    minx = _extent6[0];
    maxx = _extent6[1];

    var _extent7 = d3Array.extent(poly, function (d) {
      return d[1];
    });

    var _extent8 = _slicedToArray(_extent7, 2);

    miny = _extent8[0];
    maxy = _extent8[1];
    var boxWidth = maxx - minx,
        boxHeight = maxy - miny; // discretize the binary search for optimal width to a resolution of this times the polygon width

    var widthStep = Math.min(boxWidth, boxHeight) / 50; // populate possible center points with random points inside the polygon

    if (!origins.length) {
      // get the centroid of the polygon
      var centroid = d3Polygon.polygonCentroid(poly);

      if (!isFinite(centroid[0])) {
        if (options.verbose) console.error("cannot find centroid", poly);
        return null;
      }

      if (d3Polygon.polygonContains(poly, centroid)) origins.push(centroid);
      var nTries = options.nTries; // get few more points inside the polygon

      while (nTries) {
        var rndX = Math.random() * boxWidth + minx;
        var rndY = Math.random() * boxHeight + miny;
        var rndPoint = [rndX, rndY];

        if (d3Polygon.polygonContains(poly, rndPoint)) {
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
            _polygonRayCast2 = _slicedToArray(_polygonRayCast, 2),
            p1W = _polygonRayCast2[0],
            p2W = _polygonRayCast2[1];

        var _polygonRayCast3 = polygonRayCast(poly, origOrigin, angleRad + Math.PI / 2),
            _polygonRayCast4 = _slicedToArray(_polygonRayCast3, 2),
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

        for (var _i = 0; _i < modifOrigins.length; _i++) {
          var origin = modifOrigins[_i];
          if (options.events) events.push({
            type: "origin",
            cx: origin[0],
            cy: origin[1]
          });

          var _polygonRayCast5 = polygonRayCast(poly, origin, angleRad),
              _polygonRayCast6 = _slicedToArray(_polygonRayCast5, 2),
              _p1W = _polygonRayCast6[0],
              _p2W = _polygonRayCast6[1];

          if (_p1W === null || _p2W === null) continue;
          var minSqDistW = Math.min(pointDistanceSquared(origin, _p1W), pointDistanceSquared(origin, _p2W));
          var maxWidth = 2 * Math.sqrt(minSqDistW);

          var _polygonRayCast7 = polygonRayCast(poly, origin, angleRad + Math.PI / 2),
              _polygonRayCast8 = _slicedToArray(_polygonRayCast7, 2),
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
            aRatios = d3Array.range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
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

              var _origin = _slicedToArray(origin, 2),
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

  /**
      @class Area
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */

  var Area =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Area, _Shape);

    /**
        @memberof Area
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Area() {
      var _this;

      _classCallCheck(this, Area);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Area).call(this));
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
      _this._x = d3plusCommon.accessor("x");
      _this._x0 = d3plusCommon.accessor("x");
      _this._x1 = null;
      _this._y = d3plusCommon.constant(0);
      _this._y0 = d3plusCommon.constant(0);
      _this._y1 = d3plusCommon.accessor("y");
      return _this;
    }
    /**
        @memberof Area
        @desc Given a specific data point and index, returns the aesthetic properties of the shape.
        @param {Object} *data point*
        @param {Number} *index*
        @private
    */


    _createClass(Area, [{
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

        var areas = d3Collection.nest().key(this._id).entries(data).map(function (d) {
          d.data = d3plusCommon.merge(d.values);
          d.i = data.indexOf(d.values[0]);
          var x = d3Array.extent(d.values.map(_this3._x).concat(d.values.map(_this3._x0)).concat(_this3._x1 ? d.values.map(_this3._x1) : []));
          d.xR = x;
          d.width = x[1] - x[0];
          d.x = x[0] + d.width / 2;
          var y = d3Array.extent(d.values.map(_this3._y).concat(d.values.map(_this3._y0)).concat(_this3._y1 ? d.values.map(_this3._y1) : []));
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

        _get(_getPrototypeOf(Area.prototype), "render", this).call(this, callback);

        var path = this._path = paths.area().defined(this._defined).curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).x(this._x).x0(this._x0).x1(this._x1).y(this._y).y0(this._y0).y1(this._y1);
        var exitPath = paths.area().defined(function (d) {
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
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), path(d.values));
        });

        this._update.select("path").transition(this._transition).attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attrTween("d", function (d) {
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), path(d.values));
        }).call(this._applyStyle.bind(this));

        this._exit.select("path").transition(this._transition).attrTween("d", function (d) {
          return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), exitPath(d.values));
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
        this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        this._x0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._x1;
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
        this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        this._y0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._y1;
      }
    }]);

    return Area;
  }(Shape);

  /**
      @class Bar
      @extends Shape
      @desc Creates SVG areas based on an array of data.
  */

  var Bar =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Bar, _Shape);

    /**
        @memberof Bar
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Bar() {
      var _this;

      _classCallCheck(this, Bar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Bar).call(this, "rect"));
      _this._name = "Bar";
      _this._height = d3plusCommon.constant(10);

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.width,
          height: s.height,
          x: _this._x1 !== null ? _this._getX(d, i) : -s.width / 2,
          y: _this._x1 === null ? _this._getY(d, i) : -s.height / 2
        };
      };

      _this._width = d3plusCommon.constant(10);
      _this._x = d3plusCommon.accessor("x");
      _this._x0 = d3plusCommon.accessor("x");
      _this._x1 = null;
      _this._y = d3plusCommon.constant(0);
      _this._y0 = d3plusCommon.constant(0);
      _this._y1 = d3plusCommon.accessor("y");
      return _this;
    }
    /**
        @memberof Bar
        @desc Draws the bars.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass(Bar, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Bar.prototype), "render", this).call(this, callback);

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
        return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
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
        return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
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
        this._x0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        return arguments.length ? (this._x1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._x1;
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
        this._y0 = typeof _ === "function" ? _ : d3plusCommon.constant(_);
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
        return arguments.length ? (this._y1 = typeof _ === "function" || _ === null ? _ : d3plusCommon.constant(_), this) : this._y1;
      }
    }]);

    return Bar;
  }(Shape);

  /**
      @class Circle
      @extends Shape
      @desc Creates SVG circles based on an array of data.
  */

  var Circle =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Circle, _Shape);

    /**
        @memberof Circle
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Circle() {
      var _this;

      _classCallCheck(this, Circle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, "circle"));

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.r * 1.5,
          height: s.r * 1.5,
          x: -s.r * 0.75,
          y: -s.r * 0.75
        };
      };

      _this._labelConfig = d3plusCommon.assign(_this._labelConfig, {
        textAnchor: "middle",
        verticalAlign: "middle"
      });
      _this._name = "Circle";
      _this._r = d3plusCommon.accessor("r");
      return _this;
    }
    /**
        @memberof Circle
        @desc Provides the default positioning to the <rect> elements.
        @private
    */


    _createClass(Circle, [{
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
        _get(_getPrototypeOf(Circle.prototype), "render", this).call(this, callback);

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
        return arguments.length ? (this._r = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._r;
      }
    }]);

    return Circle;
  }(Shape);

  /**
      @class Rect
      @extends Shape
      @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
  */

  var Rect =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Rect, _Shape);

    /**
        @memberof Rect
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Rect() {
      var _this;

      _classCallCheck(this, Rect);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, "rect"));
      _this._height = d3plusCommon.accessor("height");

      _this._labelBounds = function (d, i, s) {
        return {
          width: s.width,
          height: s.height,
          x: -s.width / 2,
          y: -s.height / 2
        };
      };

      _this._name = "Rect";
      _this._width = d3plusCommon.accessor("width");
      return _this;
    }
    /**
        @memberof Rect
        @desc Draws the rectangles.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass(Rect, [{
      key: "render",
      value: function render(callback) {
        _get(_getPrototypeOf(Rect.prototype), "render", this).call(this, callback);

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
        return arguments.length ? (this._height = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._height;
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
        return arguments.length ? (this._width = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._width;
      }
    }]);

    return Rect;
  }(Shape);

  /**
      @class Line
      @extends Shape
      @desc Creates SVG lines based on an array of data.
  */

  var Line =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Line, _Shape);

    /**
        @memberof Line
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Line() {
      var _this;

      _classCallCheck(this, Line);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this));
      _this._curve = "linear";

      _this._defined = function (d) {
        return d;
      };

      _this._fill = d3plusCommon.constant("none");
      _this._hitArea = d3plusCommon.constant({
        "d": function d(_d) {
          return _this._path(_d.values);
        },
        "fill": "none",
        "stroke-width": 10,
        "transform": null
      });
      _this._name = "Line";
      _this._path = paths.line();
      _this._stroke = d3plusCommon.constant("black");
      _this._strokeWidth = d3plusCommon.constant(1);
      return _this;
    }
    /**
        @memberof Line
        @desc Filters/manipulates the data array before binding each point to an SVG group.
        @param {Array} [*data* = the data array to be filtered]
        @private
    */


    _createClass(Line, [{
      key: "_dataFilter",
      value: function _dataFilter(data) {
        var _this2 = this;

        var lines = d3Collection.nest().key(this._id).entries(data).map(function (d) {
          d.data = d3plusCommon.merge(d.values);
          d.i = data.indexOf(d.values[0]);
          var x = d3Array.extent(d.values, _this2._x);
          d.xR = x;
          d.width = x[1] - x[0];
          d.x = x[0] + d.width / 2;
          var y = d3Array.extent(d.values, _this2._y);
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

        _get(_getPrototypeOf(Line.prototype), "render", this).call(this, callback);

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
          newStrokeArray[newStrokeArray.length - 1] += d.initialLength - d3Array.sum(newStrokeArray);
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
            return d3InterpolatePath.interpolatePath(d3Selection.select(this).attr("d"), that._path(d.values));
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
    _inherits(Whisker, _BaseClass);

    /**
        @memberof Whisker
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
        @private
    */
    function Whisker() {
      var _this;

      _classCallCheck(this, Whisker);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Whisker).call(this));
      _this._endpoint = d3plusCommon.accessor("endpoint", "Rect");
      _this._endpointConfig = {
        Circle: {
          r: d3plusCommon.accessor("r", 5)
        }
      };
      _this._length = d3plusCommon.accessor("length", 25);
      _this._lineConfig = {};
      _this._orient = d3plusCommon.accessor("orient", "top");
      _this._x = d3plusCommon.accessor("x", 0);
      _this._y = d3plusCommon.accessor("y", 0);
      return _this;
    }
    /**
        @memberof Whisker
        @desc Draws the whisker.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass(Whisker, [{
      key: "render",
      value: function render(callback) {
        var _this2 = this;

        if (this._select === void 0) {
          this.select(d3Selection.select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
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


        this._line = new Line().data(lineData).select(d3plusCommon.elem("g.d3plus-Whisker", {
          parent: this._select
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._lineConfig, "shape")).render(callback);

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
        d3Collection.nest().key(function (d) {
          return d.endpoint;
        }).entries(whiskerData).forEach(function (shapeData) {
          var shapeName = shapeData.key;

          _this2._whiskerEndpoint.push(new shapes[shapeName]().data(shapeData.values).select(d3plusCommon.elem("g.d3plus-Whisker-Endpoint-".concat(shapeName), {
            parent: _this2._select
          }).node()).config({
            height: function height(d) {
              return d.orient === "top" || d.orient === "bottom" ? 5 : 20;
            },
            width: function width(d) {
              return d.orient === "top" || d.orient === "bottom" ? 20 : 5;
            }
          }).config(d3plusCommon.configPrep.bind(_this2)(_this2._endpointConfig, "shape", shapeName)).render());
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
        return arguments.length ? (this._endpoint = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._endpoint;
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
        return arguments.length ? (this._endpointConfig = d3plusCommon.assign(this._endpointConfig, _), this) : this._endpointConfig;
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
        return arguments.length ? (this._length = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._length;
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
        return arguments.length ? (this._lineConfig = d3plusCommon.assign(this._lineConfig, _), this) : this._lineConfig;
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
        return arguments.length ? (this._orient = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._orient;
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
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
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
        return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._x;
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
        return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._y;
      }
    }]);

    return Whisker;
  }(d3plusCommon.BaseClass);

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
    _inherits(Box, _BaseClass);

    /**
        @memberof Box
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
        @private
    */
    function Box() {
      var _this;

      _classCallCheck(this, Box);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Box).call(this));
      _this._medianConfig = {
        fill: d3plusCommon.constant("black")
      };
      _this._orient = d3plusCommon.accessor("orient", "vertical");
      _this._outlier = d3plusCommon.accessor("outlier", "Circle");
      _this._outlierConfig = {
        Circle: {
          r: d3plusCommon.accessor("r", 5)
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
        fill: d3plusCommon.constant("white"),
        stroke: d3plusCommon.constant("black"),
        strokeWidth: d3plusCommon.constant(1)
      };
      _this._rectWidth = d3plusCommon.constant(50);
      _this._whiskerConfig = {};
      _this._whiskerMode = ["tukey", "tukey"];
      _this._x = d3plusCommon.accessor("x", 250);
      _this._y = d3plusCommon.accessor("y", 250);
      return _this;
    }
    /**
        @memberof Box
        @desc Draws the Box.
        @param {Function} [*callback*]
        @chainable
    */


    _createClass(Box, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        if (this._select === void 0) {
          this.select(d3Selection.select("body").append("svg").style("width", "".concat(window.innerWidth, "px")).style("height", "".concat(window.innerHeight, "px")).style("display", "block").node());
        }

        var outlierData = [];
        var filteredData = d3Collection.nest().key(function (d, i) {
          return _this2._orient(d, i) === "vertical" ? _this2._x(d, i) : _this2._y(d, i);
        }).entries(this._data).map(function (d) {
          d.data = d3plusCommon.merge(d.values);
          d.i = _this2._data.indexOf(d.values[0]);
          d.orient = _this2._orient(d.data, d.i);
          var values = d.values.map(d.orient === "vertical" ? _this2._y : _this2._x);
          values.sort(function (a, b) {
            return a - b;
          });
          d.first = d3Array.quantile(values, 0.25);
          d.median = d3Array.quantile(values, 0.50);
          d.third = d3Array.quantile(values, 0.75);
          var mode = _this2._whiskerMode;

          if (mode[0] === "tukey") {
            d.lowerLimit = d.first - (d.third - d.first) * 1.5;
            if (d.lowerLimit < d3Array.min(values)) d.lowerLimit = d3Array.min(values);
          } else if (mode[0] === "extent") d.lowerLimit = d3Array.min(values);else if (typeof mode[0] === "number") d.lowerLimit = d3Array.quantile(values, mode[0]);

          if (mode[1] === "tukey") {
            d.upperLimit = d.third + (d.third - d.first) * 1.5;
            if (d.upperLimit > d3Array.max(values)) d.upperLimit = d3Array.max(values);
          } else if (mode[1] === "extent") d.upperLimit = d3Array.max(values);else if (typeof mode[1] === "number") d.upperLimit = d3Array.quantile(values, mode[1]);

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
        }).select(d3plusCommon.elem("g.d3plus-Box", {
          parent: this._select
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._rectConfig, "shape")).render(); // Draw median.

        this._median = new Rect().data(filteredData).x(function (d) {
          return d.orient === "vertical" ? d.x : d.median;
        }).y(function (d) {
          return d.orient === "vertical" ? d.median : d.y;
        }).height(function (d) {
          return d.orient === "vertical" ? 1 : d.height;
        }).width(function (d) {
          return d.orient === "vertical" ? d.width : 1;
        }).select(d3plusCommon.elem("g.d3plus-Box-Median", {
          parent: this._select
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._medianConfig, "shape")).render(); // Draw 2 lines using Whisker class.
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

        this._whisker = new Whisker().data(whiskerData).select(d3plusCommon.elem("g.d3plus-Box-Whisker", {
          parent: this._select
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._whiskerConfig, "shape")).render(); // Draw outliers.

        this._whiskerEndpoint = [];
        d3Collection.nest().key(function (d) {
          return d.outlier;
        }).entries(outlierData).forEach(function (shapeData) {
          var shapeName = shapeData.key;

          _this2._whiskerEndpoint.push(new shapes$1[shapeName]().data(shapeData.values).select(d3plusCommon.elem("g.d3plus-Box-Outlier-".concat(shapeName), {
            parent: _this2._select
          }).node()).config(d3plusCommon.configPrep.bind(_this2)(_this2._outlierConfig, "shape", shapeName)).render());
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
        return arguments.length ? (this._medianConfig = d3plusCommon.assign(this._medianConfig, _), this) : this._medianConfig;
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
        return arguments.length ? (this._orient = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._orient;
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
        return arguments.length ? (this._outlier = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._outlier;
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
        return arguments.length ? (this._outlierConfig = d3plusCommon.assign(this._outlierConfig, _), this) : this._outlierConfig;
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
        return arguments.length ? (this._rectConfig = d3plusCommon.assign(this._rectConfig, _), this) : this._rectConfig;
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
        return arguments.length ? (this._rectWidth = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._rectWidth;
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
        return arguments.length ? (this._select = d3Selection.select(_), this) : this._select;
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
        return arguments.length ? (this._whiskerConfig = d3plusCommon.assign(this._whiskerConfig, _), this) : this._whiskerConfig;
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
        return arguments.length ? (this._x = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._x;
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
        return arguments.length ? (this._y = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._y;
      }
    }]);

    return Box;
  }(d3plusCommon.BaseClass);

  var pi = Math.PI;
  /**
      @function shapeEdgePoint
      @desc Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
      @param {Number} angle The angle, in radians, of the offset point.
      @param {Number} distance The pixel distance away from the origin.
      @returns {String} [shape = "circle"] The type of shape, which can be either "circle" or "square".
  */

  var shapeEdgePoint = (function (angle, distance) {
    var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "circle";
    if (angle < 0) angle = pi * 2 + angle;

    if (shape === "square") {
      var diagonal = 45 * (pi / 180);
      var x = 0,
          y = 0;

      if (angle < pi / 2) {
        var tan = Math.tan(angle);
        x += angle < diagonal ? distance : distance / tan;
        y += angle < diagonal ? tan * distance : distance;
      } else if (angle <= pi) {
        var _tan = Math.tan(pi - angle);

        x -= angle < pi - diagonal ? distance / _tan : distance;
        y += angle < pi - diagonal ? distance : _tan * distance;
      } else if (angle < diagonal + pi) {
        x -= distance;
        y -= Math.tan(angle - pi) * distance;
      } else if (angle < 3 * pi / 2) {
        x -= distance / Math.tan(angle - pi);
        y -= distance;
      } else if (angle < 2 * pi - diagonal) {
        x += distance / Math.tan(2 * pi - angle);
        y -= distance;
      } else {
        x += distance;
        y -= Math.tan(2 * pi - angle) * distance;
      }

      return [x, y];
    } else if (shape === "circle") {
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    } else return null;
  });

  var pi$1 = Math.PI;
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
        if (points[2]) angle = pi$1 * 2 - angle;
        var step = angle / (angle / (pi$1 * 2) * (radius * pi$1 * 2) / segmentLength);
        var start = Math.atan2(-prev[1], -prev[0]) - pi$1;
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

  /**
      @class Path
      @extends Shape
      @desc Creates SVG Paths based on an array of data.
  */

  var Path =
  /*#__PURE__*/
  function (_Shape) {
    _inherits(Path, _Shape);

    /**
        @memberof Path
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
        @private
    */
    function Path() {
      var _this;

      _classCallCheck(this, Path);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Path).call(this, "path"));
      _this._d = d3plusCommon.accessor("path");

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


    _createClass(Path, [{
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
        _get(_getPrototypeOf(Path.prototype), "render", this).call(this, callback);

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
        return arguments.length ? (this._d = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._d;
      }
    }]);

    return Path;
  }(Shape);

  exports.Area = Area;
  exports.Bar = Bar;
  exports.Box = Box;
  exports.Circle = Circle;
  exports.Image = Image;
  exports.Line = Line;
  exports.Path = Path;
  exports.Rect = Rect;
  exports.Shape = Shape;
  exports.Whisker = Whisker;
  exports.largestRect = largestRect;
  exports.lineIntersection = lineIntersection;
  exports.path2polygon = path2polygon;
  exports.pointDistance = pointDistance;
  exports.pointDistanceSquared = pointDistanceSquared;
  exports.pointRotate = pointRotate;
  exports.polygonInside = polygonInside;
  exports.polygonRayCast = polygonRayCast;
  exports.polygonRotate = polygonRotate;
  exports.segmentBoxContains = segmentBoxContains;
  exports.segmentsIntersect = segmentsIntersect;
  exports.shapeEdgePoint = shapeEdgePoint;
  exports.simplify = simplify;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=d3plus-shape.js.map
