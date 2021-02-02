function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  d3plus-export v1.0.0
  Export methods for transforming and downloading SVG.
  Copyright (c) 2021 D3plus - https://d3plus.org
  @license MIT
*/
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  function createCommonjsModule(fn) {
    var module = {
      exports: {}
    };
    return fn(module, module.exports), module.exports;
  }

  var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var hasOwnProperty = {}.hasOwnProperty;

  var _has = function _has(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var _fails = function _fails(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  }; // Thank's IE8 for his funny defineProperty


  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var _core = createCommonjsModule(function (module) {
    var core = module.exports = {
      version: '2.6.12'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });

  var _isObject = function _isObject(it) {
    return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function _anObject(it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var document$1 = _global.document; // typeof document.createElement is 'object' in old IE

  var is = _isObject(document$1) && _isObject(document$1.createElement);

  var _domCreate = function _domCreate(it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  }); // 7.1.1 ToPrimitive(input [, PreferredType])
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string


  var _toPrimitive = function _toPrimitive(it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;
  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);

    P = _toPrimitive(P, true);

    _anObject(Attributes);

    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var _objectDp = {
    f: f
  };

  var _propertyDesc = function _propertyDesc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var id = 0;
  var px = Math.random();

  var _uid = function _uid(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };

  var _library = false;

  var _shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: _core.version,
      mode: 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
  });

  var _functionToString = _shared('native-function-to-string', Function.toString);

  var _redefine = createCommonjsModule(function (module) {
    var SRC = _uid('src');

    var TO_STRING = 'toString';

    var TPL = ('' + _functionToString).split(TO_STRING);

    _core.inspectSource = function (it) {
      return _functionToString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];

        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || _functionToString.call(this);
    });
  });

  var _aFunction = function _aFunction(it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  }; // optional / simple context binding


  var _ctx = function _ctx(fn, that, length) {
    _aFunction(fn);

    if (that === undefined) return fn;

    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function ()
    /* ...args */
    {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE = 'prototype';

  var $export = function $export(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;

    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

      out = (own ? target : source)[key]; // bind timers to global for call from export context

      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out; // extend global

      if (target) _redefine(target, key, out, type & $export.U); // export

      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };

  _global.core = _core; // type bitmap

  $export.F = 1; // forced

  $export.G = 2; // global

  $export.S = 4; // static

  $export.P = 8; // proto

  $export.B = 16; // bind

  $export.W = 32; // wrap

  $export.U = 64; // safe

  $export.R = 128; // real proto method for `library`

  var _export = $export;

  var _meta = createCommonjsModule(function (module) {
    var META = _uid('meta');

    var setDesc = _objectDp.f;
    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var FREEZE = !_fails(function () {
      return isExtensible(Object.preventExtensions({}));
    });

    var setMeta = function setMeta(it) {
      setDesc(it, META, {
        value: {
          i: 'O' + ++id,
          // object ID
          w: {} // weak collections IDs

        }
      });
    };

    var fastKey = function fastKey(it, create) {
      // return primitive with prefix
      if (!_isObject(it)) return _typeof(it) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F'; // not necessary to add metadata

        if (!create) return 'E'; // add missing metadata

        setMeta(it); // return object ID
      }

      return it[META].i;
    };

    var getWeak = function getWeak(it, create) {
      if (!_has(it, META)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true; // not necessary to add metadata

        if (!create) return false; // add missing metadata

        setMeta(it); // return hash weak collections IDs
      }

      return it[META].w;
    }; // add metadata on freeze-family methods calling


    var onFreeze = function onFreeze(it) {
      if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
      return it;
    };

    var meta = module.exports = {
      KEY: META,
      NEED: false,
      fastKey: fastKey,
      getWeak: getWeak,
      onFreeze: onFreeze
    };
  });

  var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');

    var _Symbol = _global.Symbol;
    var USE_SYMBOL = typeof _Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function _setToStringTag(it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
      configurable: true,
      value: tag
    });
  };

  var f$1 = _wks;
  var _wksExt = {
    f: f$1
  };
  var defineProperty = _objectDp.f;

  var _wksDefine = function _wksDefine(name) {
    var $Symbol = _core.Symbol || (_core.Symbol = _global.Symbol || {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
      value: _wksExt.f(name)
    });
  };

  var toString = {}.toString;

  var _cof = function _cof(it) {
    return toString.call(it).slice(8, -1);
  }; // fallback for non-array-like ES3 and non-enumerable old V8 strings
  // eslint-disable-next-line no-prototype-builtins


  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  }; // 7.2.1 RequireObjectCoercible(argument)


  var _defined = function _defined(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  }; // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function _toIobject(it) {
    return _iobject(_defined(it));
  }; // 7.1.4 ToInteger


  var ceil = Math.ceil;
  var floor = Math.floor;

  var _toInteger = function _toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }; // 7.1.15 ToLength


  var min = Math.min;

  var _toLength = function _toLength(it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
  }; // false -> Array#indexOf
  // true  -> Array#includes


  var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);

      var length = _toLength(O.length);

      var index = _toAbsoluteIndex(fromIndex, length);

      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
      }
      return !IS_INCLUDES && -1;
    };
  };

  var shared = _shared('keys');

  var _sharedKey = function _sharedKey(key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);

  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function _objectKeysInternal(object, names) {
    var O = _toIobject(object);

    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      if (key != IE_PROTO) _has(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (_has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    }

    return result;
  }; // IE 8- don't enum bug keys


  var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(','); // 19.1.2.14 / 15.2.3.14 Object.keys(O)


  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var f$2 = Object.getOwnPropertySymbols;
  var _objectGops = {
    f: f$2
  };
  var f$3 = {}.propertyIsEnumerable;
  var _objectPie = {
    f: f$3
  }; // all enumerable object keys, includes symbols

  var _enumKeys = function _enumKeys(it) {
    var result = _objectKeys(it);

    var getSymbols = _objectGops.f;

    if (getSymbols) {
      var symbols = getSymbols(it);
      var isEnum = _objectPie.f;
      var i = 0;
      var key;

      while (symbols.length > i) {
        if (isEnum.call(it, key = symbols[i++])) result.push(key);
      }
    }

    return result;
  }; // 7.2.2 IsArray(argument)


  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  }; // 7.1.13 ToObject(argument)


  var _toObject = function _toObject(it) {
    return Object(_defined(it));
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);

    var keys = _objectKeys(Properties);

    var length = keys.length;
    var i = 0;
    var P;

    while (length > i) {
      _objectDp.f(O, P = keys[i++], Properties[P]);
    }

    return O;
  };

  var document$2 = _global.document;

  var _html = document$2 && document$2.documentElement; // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


  var IE_PROTO$1 = _sharedKey('IE_PROTO');

  var Empty = function Empty() {
    /* empty */
  };

  var PROTOTYPE$1 = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

  var _createDict = function createDict() {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');

    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';

    _html.appendChild(iframe);

    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);

    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    _createDict = iframeDocument.F;

    while (i--) {
      delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
    }

    return _createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = _createDict();

    return Properties === undefined ? result : _objectDps(result, Properties);
  }; // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)


  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
    f: f$4
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

  var gOPN = _objectGopn.f;
  var toString$1 = {}.toString;
  var windowNames = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function getWindowNames(it) {
    try {
      return gOPN(it);
    } catch (e) {
      return windowNames.slice();
    }
  };

  var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
  };

  var _objectGopnExt = {
    f: f$5
  };
  var gOPD = Object.getOwnPropertyDescriptor;
  var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) {
      /* empty */
    }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };
  var _objectGopd = {
    f: f$6
  }; // ECMAScript 6 symbols shim

  var META = _meta.KEY;
  var gOPD$1 = _objectGopd.f;
  var dP$1 = _objectDp.f;
  var gOPN$1 = _objectGopnExt.f;
  var $Symbol = _global.Symbol;
  var $JSON = _global.JSON;

  var _stringify = $JSON && $JSON.stringify;

  var PROTOTYPE$2 = 'prototype';

  var HIDDEN = _wks('_hidden');

  var TO_PRIMITIVE = _wks('toPrimitive');

  var isEnum = {}.propertyIsEnumerable;

  var SymbolRegistry = _shared('symbol-registry');

  var AllSymbols = _shared('symbols');

  var OPSymbols = _shared('op-symbols');

  var ObjectProto = Object[PROTOTYPE$2];
  var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
  var QObject = _global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
      get: function get() {
        return dP$1(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
  }) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto, key);
    if (protoDesc) delete ObjectProto[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
  } : dP$1;

  var wrap = function wrap(tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);

    sym._k = tag;
    return sym;
  };

  var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
    return _typeof(it) == 'symbol';
  } : function (it) {
    return it instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto) $defineProperty(OPSymbols, key, D);

    _anObject(it);

    key = _toPrimitive(key, true);

    _anObject(D);

    if (_has(AllSymbols, key)) {
      if (!D.enumerable) {
        if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
        it[HIDDEN][key] = true;
      } else {
        if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
        D = _objectCreate(D, {
          enumerable: _propertyDesc(0, false)
        });
      }

      return setSymbolDesc(it, key, D);
    }

    return dP$1(it, key, D);
  };

  var $defineProperties = function defineProperties(it, P) {
    _anObject(it);

    var keys = _enumKeys(P = _toIobject(P));

    var i = 0;
    var l = keys.length;
    var key;

    while (l > i) {
      $defineProperty(it, key = keys[i++], P[key]);
    }

    return it;
  };

  var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    }

    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;

    while (names.length > i) {
      if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
    }

    return result;
  }; // 19.4.1.1 Symbol([description])


  if (!USE_NATIVE) {
    $Symbol = function _Symbol2() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');

      var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);

      var $set = function $set(value) {
        if (this === ObjectProto) $set.call(OPSymbols, value);
        if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDesc(this, tag, _propertyDesc(1, value));
      };

      if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, {
        configurable: true,
        set: $set
      });
      return wrap(tag);
    };

    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
      return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
      _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
      return wrap(_wks(name));
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, {
    Symbol: $Symbol
  });

  for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
    _wks(es6Symbols[j++]);
  }

  for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) {
    _wksDefine(wellKnownSymbols[k++]);
  }

  _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function _for(key) {
      return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

      for (var key in SymbolRegistry) {
        if (SymbolRegistry[key] === sym) return key;
      }
    },
    useSetter: function useSetter() {
      setter = true;
    },
    useSimple: function useSimple() {
      setter = false;
    }
  });

  _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443


  var FAILS_ON_PRIMITIVES = _fails(function () {
    _objectGops.f(1);
  });

  _export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return _objectGops.f(_toObject(it));
    }
  }); // 24.3.2 JSON.stringify(value [, replacer [, space]])


  $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols

    return _stringify([S]) != '[null]' || _stringify({
      a: S
    }) != '{}' || _stringify(Object(S)) != '{}';
  })), 'JSON', {
    stringify: function stringify(it) {
      var args = [it];
      var i = 1;
      var replacer, $replacer;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      $replacer = replacer = args[1];
      if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

      if (!_isArray(replacer)) replacer = function replacer(key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return _stringify.apply($JSON, args);
    }
  }); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

  $Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

  _setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]


  _setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]


  _setToStringTag(_global.JSON, 'JSON', true); // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


  _export(_export.S, 'Object', {
    create: _objectCreate
  }); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)


  _export(_export.S + _export.F * !_descriptors, 'Object', {
    defineProperty: _objectDp.f
  }); // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)


  _export(_export.S + _export.F * !_descriptors, 'Object', {
    defineProperties: _objectDps
  }); // most Object methods by ES6 should accept primitives


  var _objectSap = function _objectSap(KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);

    _export(_export.S + _export.F * _fails(function () {
      fn(1);
    }), 'Object', exp);
  }; // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)


  var $getOwnPropertyDescriptor$1 = _objectGopd.f;

  _objectSap('getOwnPropertyDescriptor', function () {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor$1(_toIobject(it), key);
    };
  }); // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');

  var ObjectProto$1 = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectProto$1 : null;
  }; // 19.1.2.9 Object.getPrototypeOf(O)


  _objectSap('getPrototypeOf', function () {
    return function getPrototypeOf(it) {
      return _objectGpo(_toObject(it));
    };
  }); // 19.1.2.14 Object.keys(O)


  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  }); // 19.1.2.7 Object.getOwnPropertyNames(O)


  _objectSap('getOwnPropertyNames', function () {
    return _objectGopnExt.f;
  }); // 19.1.2.5 Object.freeze(O)


  var meta = _meta.onFreeze;

  _objectSap('freeze', function ($freeze) {
    return function freeze(it) {
      return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
    };
  }); // 19.1.2.17 Object.seal(O)


  var meta$1 = _meta.onFreeze;

  _objectSap('seal', function ($seal) {
    return function seal(it) {
      return $seal && _isObject(it) ? $seal(meta$1(it)) : it;
    };
  }); // 19.1.2.15 Object.preventExtensions(O)


  var meta$2 = _meta.onFreeze;

  _objectSap('preventExtensions', function ($preventExtensions) {
    return function preventExtensions(it) {
      return $preventExtensions && _isObject(it) ? $preventExtensions(meta$2(it)) : it;
    };
  }); // 19.1.2.12 Object.isFrozen(O)


  _objectSap('isFrozen', function ($isFrozen) {
    return function isFrozen(it) {
      return _isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
    };
  }); // 19.1.2.13 Object.isSealed(O)


  _objectSap('isSealed', function ($isSealed) {
    return function isSealed(it) {
      return _isObject(it) ? $isSealed ? $isSealed(it) : false : true;
    };
  }); // 19.1.2.11 Object.isExtensible(O)


  _objectSap('isExtensible', function ($isExtensible) {
    return function isExtensible(it) {
      return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
    };
  }); // 19.1.2.1 Object.assign(target, source, ...)


  var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

  var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
      B[k] = k;
    });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = _toObject(target);

    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;

    while (aLen > index) {
      var S = _iobject(arguments[index++]);

      var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : $assign; // 19.1.3.1 Object.assign(target, source)


  _export(_export.S + _export.F, 'Object', {
    assign: _objectAssign
  }); // 7.2.9 SameValue(x, y)


  var _sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  }; // 19.1.3.10 Object.is(value1, value2)


  _export(_export.S, 'Object', {
    is: _sameValue
  }); // Works with __proto__ only. Old v8 can't work with null proto objects.

  /* eslint-disable no-proto */


  var check = function check(O, proto) {
    _anObject(O);

    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };

  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }

      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  }; // 19.1.3.19 Object.setPrototypeOf(O, proto)

  _export(_export.S, 'Object', {
    setPrototypeOf: _setProto.set
  }); // getting tag from 19.1.3.6 Object.prototype.toString()


  var TAG$1 = _wks('toStringTag'); // ES3 wrong here


  var ARG = _cof(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (e) {
      /* empty */
    }
  };

  var _classof = function _classof(it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T // builtinTag case
    : ARG ? _cof(O) // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  }; // 19.1.3.6 Object.prototype.toString()


  var test = {};
  test[_wks('toStringTag')] = 'z';

  if (test + '' != '[object z]') {
    _redefine(Object.prototype, 'toString', function toString() {
      return '[object ' + _classof(this) + ']';
    }, true);
  } // fast apply, http://jsperf.lnkit.com/fast-apply/5


  var _invoke = function _invoke(fn, args, that) {
    var un = that === undefined;

    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);

      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);

      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }

    return fn.apply(that, args);
  };

  var arraySlice = [].slice;
  var factories = {};

  var construct = function construct(F, len, args) {
    if (!(len in factories)) {
      for (var n = [], i = 0; i < len; i++) {
        n[i] = 'a[' + i + ']';
      } // eslint-disable-next-line no-new-func


      factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
    }

    return factories[len](F, args);
  };

  var _bind = Function.bind || function bind(that
  /* , ...args */
  ) {
    var fn = _aFunction(this);

    var partArgs = arraySlice.call(arguments, 1);

    var bound = function bound()
    /* args... */
    {
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
    };

    if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
    return bound;
  }; // 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


  _export(_export.P, 'Function', {
    bind: _bind
  });

  var dP$2 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name'; // 19.2.4.2 name

  NAME in FProto || _descriptors && dP$2(FProto, NAME, {
    configurable: true,
    get: function get() {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  var HAS_INSTANCE = _wks('hasInstance');

  var FunctionProto = Function.prototype; // 19.2.3.6 Function.prototype[@@hasInstance](V)

  if (!(HAS_INSTANCE in FunctionProto)) _objectDp.f(FunctionProto, HAS_INSTANCE, {
    value: function value(O) {
      if (typeof this != 'function' || !_isObject(O)) return false;
      if (!_isObject(this.prototype)) return O instanceof this; // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:

      while (O = _objectGpo(O)) {
        if (this.prototype === O) return true;
      }

      return false;
    }
  });

  var _stringWs = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

  var space = '[' + _stringWs + ']';
  var non = "\u200B\x85";
  var ltrim = RegExp('^' + space + space + '*');
  var rtrim = RegExp(space + space + '*$');

  var exporter = function exporter(KEY, exec, ALIAS) {
    var exp = {};

    var FORCE = _fails(function () {
      return !!_stringWs[KEY]() || non[KEY]() != non;
    });

    var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
    if (ALIAS) exp[ALIAS] = fn;

    _export(_export.P + _export.F * FORCE, 'String', exp);
  }; // 1 -> String#trimLeft
  // 2 -> String#trimRight
  // 3 -> String#trim


  var trim = exporter.trim = function (string, TYPE) {
    string = String(_defined(string));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };

  var _stringTrim = exporter;
  var $parseInt = _global.parseInt;
  var $trim = _stringTrim.trim;
  var hex = /^[-+]?0[xX]/;

  var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
    var string = $trim(String(str), 3);
    return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
  } : $parseInt; // 18.2.5 parseInt(string, radix)


  _export(_export.G + _export.F * (parseInt != _parseInt), {
    parseInt: _parseInt
  });

  var $parseFloat = _global.parseFloat;
  var $trim$1 = _stringTrim.trim;

  var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
    var string = $trim$1(String(str), 3);
    var result = $parseFloat(string);
    return result === 0 && string.charAt(0) == '-' ? -0 : result;
  } : $parseFloat; // 18.2.4 parseFloat(string)


  _export(_export.G + _export.F * (parseFloat != _parseFloat), {
    parseFloat: _parseFloat
  });

  var setPrototypeOf = _setProto.set;

  var _inheritIfRequired = function _inheritIfRequired(that, target, C) {
    var S = target.constructor;
    var P;

    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
      setPrototypeOf(that, P);
    }

    return that;
  };

  var gOPN$2 = _objectGopn.f;
  var gOPD$2 = _objectGopd.f;
  var dP$3 = _objectDp.f;
  var $trim$2 = _stringTrim.trim;
  var NUMBER = 'Number';
  var $Number = _global[NUMBER];
  var Base = $Number;
  var proto = $Number.prototype; // Opera ~12 has broken Object#toString

  var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
  var TRIM = ('trim' in String.prototype); // 7.1.3 ToNumber(argument)

  var toNumber = function toNumber(argument) {
    var it = _toPrimitive(argument, false);

    if (typeof it == 'string' && it.length > 2) {
      it = TRIM ? it.trim() : $trim$2(it, 3);
      var first = it.charCodeAt(0);
      var third, radix, maxCode;

      if (first === 43 || first === 45) {
        third = it.charCodeAt(2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (it.charCodeAt(1)) {
          case 66:
          case 98:
            radix = 2;
            maxCode = 49;
            break;
          // fast equal /^0b[01]+$/i

          case 79:
          case 111:
            radix = 8;
            maxCode = 55;
            break;
          // fast equal /^0o[0-7]+$/i

          default:
            return +it;
        }

        for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
          code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
          // but ToNumber should return NaN if a string contains unavailable symbols

          if (code < 48 || code > maxCode) return NaN;
        }

        return parseInt(digits, radix);
      }
    }

    return +it;
  };

  if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
    $Number = function Number(value) {
      var it = arguments.length < 1 ? 0 : value;
      var that = this;
      return that instanceof $Number // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () {
        proto.valueOf.call(that);
      }) : _cof(that) != NUMBER) ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
    };

    for (var keys = _descriptors ? gOPN$2(Base) : ( // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j$1 = 0, key; keys.length > j$1; j$1++) {
      if (_has(Base, key = keys[j$1]) && !_has($Number, key)) {
        dP$3($Number, key, gOPD$2(Base, key));
      }
    }

    $Number.prototype = proto;
    proto.constructor = $Number;

    _redefine(_global, NUMBER, $Number);
  }

  var _aNumberValue = function _aNumberValue(it, msg) {
    if (typeof it != 'number' && _cof(it) != 'Number') throw TypeError(msg);
    return +it;
  };

  var _stringRepeat = function repeat(count) {
    var str = String(_defined(this));
    var res = '';

    var n = _toInteger(count);

    if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");

    for (; n > 0; (n >>>= 1) && (str += str)) {
      if (n & 1) res += str;
    }

    return res;
  };

  var $toFixed = 1.0.toFixed;
  var floor$1 = Math.floor;
  var data = [0, 0, 0, 0, 0, 0];
  var ERROR = 'Number.toFixed: incorrect invocation!';
  var ZERO = '0';

  var multiply = function multiply(n, c) {
    var i = -1;
    var c2 = c;

    while (++i < 6) {
      c2 += n * data[i];
      data[i] = c2 % 1e7;
      c2 = floor$1(c2 / 1e7);
    }
  };

  var divide = function divide(n) {
    var i = 6;
    var c = 0;

    while (--i >= 0) {
      c += data[i];
      data[i] = floor$1(c / n);
      c = c % n * 1e7;
    }
  };

  var numToString = function numToString() {
    var i = 6;
    var s = '';

    while (--i >= 0) {
      if (s !== '' || i === 0 || data[i] !== 0) {
        var t = String(data[i]);
        s = s === '' ? t : s + _stringRepeat.call(ZERO, 7 - t.length) + t;
      }
    }

    return s;
  };

  var pow = function pow(x, n, acc) {
    return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  };

  var log = function log(x) {
    var n = 0;
    var x2 = x;

    while (x2 >= 4096) {
      n += 12;
      x2 /= 4096;
    }

    while (x2 >= 2) {
      n += 1;
      x2 /= 2;
    }

    return n;
  };

  _export(_export.P + _export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !_fails(function () {
    // V8 ~ Android 4.3-
    $toFixed.call({});
  })), 'Number', {
    toFixed: function toFixed(fractionDigits) {
      var x = _aNumberValue(this, ERROR);

      var f = _toInteger(fractionDigits);

      var s = '';
      var m = ZERO;
      var e, z, j, k;
      if (f < 0 || f > 20) throw RangeError(ERROR); // eslint-disable-next-line no-self-compare

      if (x != x) return 'NaN';
      if (x <= -1e21 || x >= 1e21) return String(x);

      if (x < 0) {
        s = '-';
        x = -x;
      }

      if (x > 1e-21) {
        e = log(x * pow(2, 69, 1)) - 69;
        z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
        z *= 0x10000000000000;
        e = 52 - e;

        if (e > 0) {
          multiply(0, z);
          j = f;

          while (j >= 7) {
            multiply(1e7, 0);
            j -= 7;
          }

          multiply(pow(10, j, 1), 0);
          j = e - 1;

          while (j >= 23) {
            divide(1 << 23);
            j -= 23;
          }

          divide(1 << j);
          multiply(1, 1);
          divide(2);
          m = numToString();
        } else {
          multiply(0, z);
          multiply(1 << -e, 0);
          m = numToString() + _stringRepeat.call(ZERO, f);
        }
      }

      if (f > 0) {
        k = m.length;
        m = s + (k <= f ? '0.' + _stringRepeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
      } else {
        m = s + m;
      }

      return m;
    }
  });

  var $toPrecision = 1.0.toPrecision;

  _export(_export.P + _export.F * (_fails(function () {
    // IE7-
    return $toPrecision.call(1, undefined) !== '1';
  }) || !_fails(function () {
    // V8 ~ Android 4.3-
    $toPrecision.call({});
  })), 'Number', {
    toPrecision: function toPrecision(precision) {
      var that = _aNumberValue(this, 'Number#toPrecision: incorrect invocation!');

      return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
    }
  }); // 20.1.2.1 Number.EPSILON


  _export(_export.S, 'Number', {
    EPSILON: Math.pow(2, -52)
  }); // 20.1.2.2 Number.isFinite(number)


  var _isFinite = _global.isFinite;

  _export(_export.S, 'Number', {
    isFinite: function isFinite(it) {
      return typeof it == 'number' && _isFinite(it);
    }
  }); // 20.1.2.3 Number.isInteger(number)


  var floor$2 = Math.floor;

  var _isInteger = function isInteger(it) {
    return !_isObject(it) && isFinite(it) && floor$2(it) === it;
  }; // 20.1.2.3 Number.isInteger(number)


  _export(_export.S, 'Number', {
    isInteger: _isInteger
  }); // 20.1.2.4 Number.isNaN(number)


  _export(_export.S, 'Number', {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare
      return number != number;
    }
  }); // 20.1.2.5 Number.isSafeInteger(number)


  var abs = Math.abs;

  _export(_export.S, 'Number', {
    isSafeInteger: function isSafeInteger(number) {
      return _isInteger(number) && abs(number) <= 0x1fffffffffffff;
    }
  }); // 20.1.2.6 Number.MAX_SAFE_INTEGER


  _export(_export.S, 'Number', {
    MAX_SAFE_INTEGER: 0x1fffffffffffff
  }); // 20.1.2.10 Number.MIN_SAFE_INTEGER


  _export(_export.S, 'Number', {
    MIN_SAFE_INTEGER: -0x1fffffffffffff
  }); // 20.1.2.12 Number.parseFloat(string)


  _export(_export.S + _export.F * (Number.parseFloat != _parseFloat), 'Number', {
    parseFloat: _parseFloat
  }); // 20.1.2.13 Number.parseInt(string, radix)


  _export(_export.S + _export.F * (Number.parseInt != _parseInt), 'Number', {
    parseInt: _parseInt
  }); // 20.2.2.20 Math.log1p(x)


  var _mathLog1p = Math.log1p || function log1p(x) {
    return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
  }; // 20.2.2.3 Math.acosh(x)


  var sqrt = Math.sqrt;
  var $acosh = Math.acosh;

  _export(_export.S + _export.F * !($acosh // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710 // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity), 'Math', {
    acosh: function acosh(x) {
      return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : _mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
    }
  }); // 20.2.2.5 Math.asinh(x)


  var $asinh = Math.asinh;

  function asinh(x) {
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
  } // Tor Browser bug: Math.asinh(0) -> -0


  _export(_export.S + _export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {
    asinh: asinh
  }); // 20.2.2.7 Math.atanh(x)


  var $atanh = Math.atanh; // Tor Browser bug: Math.atanh(-0) -> 0

  _export(_export.S + _export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
    atanh: function atanh(x) {
      return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
    }
  }); // 20.2.2.28 Math.sign(x)


  var _mathSign = Math.sign || function sign(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
  }; // 20.2.2.9 Math.cbrt(x)


  _export(_export.S, 'Math', {
    cbrt: function cbrt(x) {
      return _mathSign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
    }
  }); // 20.2.2.11 Math.clz32(x)


  _export(_export.S, 'Math', {
    clz32: function clz32(x) {
      return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
    }
  }); // 20.2.2.12 Math.cosh(x)


  var exp = Math.exp;

  _export(_export.S, 'Math', {
    cosh: function cosh(x) {
      return (exp(x = +x) + exp(-x)) / 2;
    }
  }); // 20.2.2.14 Math.expm1(x)


  var $expm1 = Math.expm1;

  var _mathExpm1 = !$expm1 // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 // Tor Browser bug
  || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
  } : $expm1; // 20.2.2.14 Math.expm1(x)


  _export(_export.S + _export.F * (_mathExpm1 != Math.expm1), 'Math', {
    expm1: _mathExpm1
  }); // 20.2.2.16 Math.fround(x)


  var pow$1 = Math.pow;
  var EPSILON = pow$1(2, -52);
  var EPSILON32 = pow$1(2, -23);
  var MAX32 = pow$1(2, 127) * (2 - EPSILON32);
  var MIN32 = pow$1(2, -126);

  var roundTiesToEven = function roundTiesToEven(n) {
    return n + 1 / EPSILON - 1 / EPSILON;
  };

  var _mathFround = Math.fround || function fround(x) {
    var $abs = Math.abs(x);

    var $sign = _mathSign(x);

    var a, result;
    if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs); // eslint-disable-next-line no-self-compare

    if (result > MAX32 || result != result) return $sign * Infinity;
    return $sign * result;
  }; // 20.2.2.16 Math.fround(x)


  _export(_export.S, 'Math', {
    fround: _mathFround
  }); // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])


  var abs$1 = Math.abs;

  _export(_export.S, 'Math', {
    hypot: function hypot(value1, value2) {
      // eslint-disable-line no-unused-vars
      var sum = 0;
      var i = 0;
      var aLen = arguments.length;
      var larg = 0;
      var arg, div;

      while (i < aLen) {
        arg = abs$1(arguments[i++]);

        if (larg < arg) {
          div = larg / arg;
          sum = sum * div * div + 1;
          larg = arg;
        } else if (arg > 0) {
          div = arg / larg;
          sum += div * div;
        } else sum += arg;
      }

      return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
    }
  }); // 20.2.2.18 Math.imul(x, y)


  var $imul = Math.imul; // some WebKit versions fails with big numbers, some has wrong arity

  _export(_export.S + _export.F * _fails(function () {
    return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
  }), 'Math', {
    imul: function imul(x, y) {
      var UINT16 = 0xffff;
      var xn = +x;
      var yn = +y;
      var xl = UINT16 & xn;
      var yl = UINT16 & yn;
      return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
    }
  }); // 20.2.2.21 Math.log10(x)


  _export(_export.S, 'Math', {
    log10: function log10(x) {
      return Math.log(x) * Math.LOG10E;
    }
  }); // 20.2.2.20 Math.log1p(x)


  _export(_export.S, 'Math', {
    log1p: _mathLog1p
  }); // 20.2.2.22 Math.log2(x)


  _export(_export.S, 'Math', {
    log2: function log2(x) {
      return Math.log(x) / Math.LN2;
    }
  }); // 20.2.2.28 Math.sign(x)


  _export(_export.S, 'Math', {
    sign: _mathSign
  }); // 20.2.2.30 Math.sinh(x)


  var exp$1 = Math.exp; // V8 near Chromium 38 has a problem with very small numbers

  _export(_export.S + _export.F * _fails(function () {
    return !Math.sinh(-2e-17) != -2e-17;
  }), 'Math', {
    sinh: function sinh(x) {
      return Math.abs(x = +x) < 1 ? (_mathExpm1(x) - _mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (Math.E / 2);
    }
  }); // 20.2.2.33 Math.tanh(x)


  var exp$2 = Math.exp;

  _export(_export.S, 'Math', {
    tanh: function tanh(x) {
      var a = _mathExpm1(x = +x);

      var b = _mathExpm1(-x);

      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
    }
  }); // 20.2.2.34 Math.trunc(x)


  _export(_export.S, 'Math', {
    trunc: function trunc(it) {
      return (it > 0 ? Math.floor : Math.ceil)(it);
    }
  });

  var fromCharCode = String.fromCharCode;
  var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

  _export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function fromCodePoint(x) {
      // eslint-disable-line no-unused-vars
      var res = [];
      var aLen = arguments.length;
      var i = 0;
      var code;

      while (aLen > i) {
        code = +arguments[i++];
        if (_toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
      }

      return res.join('');
    }
  });

  _export(_export.S, 'String', {
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function raw(callSite) {
      var tpl = _toIobject(callSite.raw);

      var len = _toLength(tpl.length);

      var aLen = arguments.length;
      var res = [];
      var i = 0;

      while (len > i) {
        res.push(String(tpl[i++]));
        if (i < aLen) res.push(String(arguments[i]));
      }

      return res.join('');
    }
  }); // 21.1.3.25 String.prototype.trim()


  _stringTrim('trim', function ($trim) {
    return function trim() {
      return $trim(this, 3);
    };
  }); // true  -> String#at
  // false -> String#codePointAt


  var _stringAt = function _stringAt(TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));

      var i = _toInteger(pos);

      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };

  var _iterators = {};
  var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

  _hide(IteratorPrototype, _wks('iterator'), function () {
    return this;
  });

  var _iterCreate = function _iterCreate(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, {
      next: _propertyDesc(1, next)
    });

    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  var ITERATOR = _wks('iterator');

  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function returnThis() {
    return this;
  };

  var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);

    var getMethod = function getMethod(kind) {
      if (!BUGGY && kind in proto) return proto[kind];

      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };

        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }

      return function entries() {
        return new Constructor(this, kind);
      };
    };

    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype; // Fix native

    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));

      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines


        if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    } // fix Array#{values, @@iterator}.name in V8 / FF


    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;

      $default = function values() {
        return $native.call(this);
      };
    } // Define iterator


    if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
      _hide(proto, ITERATOR, $default);
    } // Plug for library


    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;

    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }

    return methods;
  };

  var $at = _stringAt(true); // 21.1.3.27 String.prototype[@@iterator]()


  _iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target

    this._i = 0; // next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return {
      value: undefined,
      done: true
    };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });

  var $at$1 = _stringAt(false);

  _export(_export.P, 'String', {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: function codePointAt(pos) {
      return $at$1(this, pos);
    }
  }); // 7.2.8 IsRegExp(argument)


  var MATCH = _wks('match');

  var _isRegexp = function _isRegexp(it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  }; // helper for String#{startsWith, endsWith, includes}


  var _stringContext = function _stringContext(that, searchString, NAME) {
    if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
    return String(_defined(that));
  };

  var MATCH$1 = _wks('match');

  var _failsIsRegexp = function _failsIsRegexp(KEY) {
    var re = /./;

    try {
      '/./'[KEY](re);
    } catch (e) {
      try {
        re[MATCH$1] = false;
        return !'/./'[KEY](re);
      } catch (f) {
        /* empty */
      }
    }

    return true;
  };

  var ENDS_WITH = 'endsWith';
  var $endsWith = ''[ENDS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
    endsWith: function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = _stringContext(this, searchString, ENDS_WITH);

      var endPosition = arguments.length > 1 ? arguments[1] : undefined;

      var len = _toLength(that.length);

      var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
      var search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }
  });

  var INCLUDES = 'includes';

  _export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~_stringContext(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _export(_export.P, 'String', {
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: _stringRepeat
  });

  var STARTS_WITH = 'startsWith';
  var $startsWith = ''[STARTS_WITH];

  _export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
    startsWith: function startsWith(searchString
    /* , position = 0 */
    ) {
      var that = _stringContext(this, searchString, STARTS_WITH);

      var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));

      var search = String(searchString);
      return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
    }
  });

  var quot = /"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)

  var createHTML = function createHTML(string, tag, attribute, value) {
    var S = String(_defined(string));
    var p1 = '<' + tag;
    if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
    return p1 + '>' + S + '</' + tag + '>';
  };

  var _stringHtml = function _stringHtml(NAME, exec) {
    var O = {};
    O[NAME] = exec(createHTML);

    _export(_export.P + _export.F * _fails(function () {
      var test = ''[NAME]('"');
      return test !== test.toLowerCase() || test.split('"').length > 3;
    }), 'String', O);
  }; // B.2.3.2 String.prototype.anchor(name)


  _stringHtml('anchor', function (createHTML) {
    return function anchor(name) {
      return createHTML(this, 'a', 'name', name);
    };
  }); // B.2.3.3 String.prototype.big()


  _stringHtml('big', function (createHTML) {
    return function big() {
      return createHTML(this, 'big', '', '');
    };
  }); // B.2.3.4 String.prototype.blink()


  _stringHtml('blink', function (createHTML) {
    return function blink() {
      return createHTML(this, 'blink', '', '');
    };
  }); // B.2.3.5 String.prototype.bold()


  _stringHtml('bold', function (createHTML) {
    return function bold() {
      return createHTML(this, 'b', '', '');
    };
  }); // B.2.3.6 String.prototype.fixed()


  _stringHtml('fixed', function (createHTML) {
    return function fixed() {
      return createHTML(this, 'tt', '', '');
    };
  }); // B.2.3.7 String.prototype.fontcolor(color)


  _stringHtml('fontcolor', function (createHTML) {
    return function fontcolor(color) {
      return createHTML(this, 'font', 'color', color);
    };
  }); // B.2.3.8 String.prototype.fontsize(size)


  _stringHtml('fontsize', function (createHTML) {
    return function fontsize(size) {
      return createHTML(this, 'font', 'size', size);
    };
  }); // B.2.3.9 String.prototype.italics()


  _stringHtml('italics', function (createHTML) {
    return function italics() {
      return createHTML(this, 'i', '', '');
    };
  }); // B.2.3.10 String.prototype.link(url)


  _stringHtml('link', function (createHTML) {
    return function link(url) {
      return createHTML(this, 'a', 'href', url);
    };
  }); // B.2.3.11 String.prototype.small()


  _stringHtml('small', function (createHTML) {
    return function small() {
      return createHTML(this, 'small', '', '');
    };
  }); // B.2.3.12 String.prototype.strike()


  _stringHtml('strike', function (createHTML) {
    return function strike() {
      return createHTML(this, 'strike', '', '');
    };
  }); // B.2.3.13 String.prototype.sub()


  _stringHtml('sub', function (createHTML) {
    return function sub() {
      return createHTML(this, 'sub', '', '');
    };
  }); // B.2.3.14 String.prototype.sup()


  _stringHtml('sup', function (createHTML) {
    return function sup() {
      return createHTML(this, 'sup', '', '');
    };
  }); // 20.3.3.1 / 15.9.4.4 Date.now()


  _export(_export.S, 'Date', {
    now: function now() {
      return new Date().getTime();
    }
  });

  _export(_export.P + _export.F * _fails(function () {
    return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({
      toISOString: function toISOString() {
        return 1;
      }
    }) !== 1;
  }), 'Date', {
    // eslint-disable-next-line no-unused-vars
    toJSON: function toJSON(key) {
      var O = _toObject(this);

      var pv = _toPrimitive(O);

      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
    }
  }); // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()


  var getTime = Date.prototype.getTime;
  var $toISOString = Date.prototype.toISOString;

  var lz = function lz(num) {
    return num > 9 ? num : '0' + num;
  }; // PhantomJS / old WebKit has a broken implementations


  var _dateToIsoString = _fails(function () {
    return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
  }) || !_fails(function () {
    $toISOString.call(new Date(NaN));
  }) ? function toISOString() {
    if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
    var d = this;
    var y = d.getUTCFullYear();
    var m = d.getUTCMilliseconds();
    var s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  } : $toISOString; // 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
  // PhantomJS / old WebKit has a broken implementations


  _export(_export.P + _export.F * (Date.prototype.toISOString !== _dateToIsoString), 'Date', {
    toISOString: _dateToIsoString
  });

  var DateProto = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING = 'toString';
  var $toString = DateProto[TO_STRING];
  var getTime$1 = DateProto.getTime;

  if (new Date(NaN) + '' != INVALID_DATE) {
    _redefine(DateProto, TO_STRING, function toString() {
      var value = getTime$1.call(this); // eslint-disable-next-line no-self-compare

      return value === value ? $toString.call(this) : INVALID_DATE;
    });
  }

  var NUMBER$1 = 'number';

  var _dateToPrimitive = function _dateToPrimitive(hint) {
    if (hint !== 'string' && hint !== NUMBER$1 && hint !== 'default') throw TypeError('Incorrect hint');
    return _toPrimitive(_anObject(this), hint != NUMBER$1);
  };

  var TO_PRIMITIVE$1 = _wks('toPrimitive');

  var proto$1 = Date.prototype;
  if (!(TO_PRIMITIVE$1 in proto$1)) _hide(proto$1, TO_PRIMITIVE$1, _dateToPrimitive); // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)

  _export(_export.S, 'Array', {
    isArray: _isArray
  }); // call something on iterator step with safe closing on error


  var _iterCall = function _iterCall(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  }; // check on default Array iterator


  var ITERATOR$1 = _wks('iterator');

  var ArrayProto = Array.prototype;

  var _isArrayIter = function _isArrayIter(it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
  };

  var _createProperty = function _createProperty(object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
  };

  var ITERATOR$2 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
  };

  var ITERATOR$3 = _wks('iterator');

  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$3]();

    riter['return'] = function () {
      SAFE_CLOSING = true;
    }; // eslint-disable-next-line no-throw-literal


    Array.from(riter, function () {
      throw 2;
    });
  } catch (e) {
    /* empty */
  }

  var _iterDetect = function _iterDetect(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;

    try {
      var arr = [7];
      var iter = arr[ITERATOR$3]();

      iter.next = function () {
        return {
          done: safe = true
        };
      };

      arr[ITERATOR$3] = function () {
        return iter;
      };

      exec(arr);
    } catch (e) {
      /* empty */
    }

    return safe;
  };

  _export(_export.S + _export.F * !_iterDetect(function (iter) {
    Array.from(iter);
  }), 'Array', {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function from(arrayLike
    /* , mapfn = undefined, thisArg = undefined */
    ) {
      var O = _toObject(arrayLike);

      var C = typeof this == 'function' ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
          _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
        }
      } else {
        length = _toLength(O.length);

        for (result = new C(length); length > index; index++) {
          _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }

      result.length = index;
      return result;
    }
  }); // WebKit Array.of isn't generic


  _export(_export.S + _export.F * _fails(function () {
    function F() {
      /* empty */
    }

    return !(Array.of.call(F) instanceof F);
  }), 'Array', {
    // 22.1.2.3 Array.of( ...items)
    of: function of()
    /* ...args */
    {
      var index = 0;
      var aLen = arguments.length;
      var result = new (typeof this == 'function' ? this : Array)(aLen);

      while (aLen > index) {
        _createProperty(result, index, arguments[index++]);
      }

      result.length = aLen;
      return result;
    }
  });

  var _strictMethod = function _strictMethod(method, arg) {
    return !!method && _fails(function () {
      // eslint-disable-next-line no-useless-call
      arg ? method.call(null, function () {
        /* empty */
      }, 1) : method.call(null);
    });
  }; // 22.1.3.13 Array.prototype.join(separator)


  var arrayJoin = [].join; // fallback for not array-like strings

  _export(_export.P + _export.F * (_iobject != Object || !_strictMethod(arrayJoin)), 'Array', {
    join: function join(separator) {
      return arrayJoin.call(_toIobject(this), separator === undefined ? ',' : separator);
    }
  });

  var arraySlice$1 = [].slice; // fallback for not array-like ES3 strings and DOM objects

  _export(_export.P + _export.F * _fails(function () {
    if (_html) arraySlice$1.call(_html);
  }), 'Array', {
    slice: function slice(begin, end) {
      var len = _toLength(this.length);

      var klass = _cof(this);

      end = end === undefined ? len : end;
      if (klass == 'Array') return arraySlice$1.call(this, begin, end);

      var start = _toAbsoluteIndex(begin, len);

      var upTo = _toAbsoluteIndex(end, len);

      var size = _toLength(upTo - start);

      var cloned = new Array(size);
      var i = 0;

      for (; i < size; i++) {
        cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
      }

      return cloned;
    }
  });

  var $sort = [].sort;
  var test$1 = [1, 2, 3];

  _export(_export.P + _export.F * (_fails(function () {
    // IE8-
    test$1.sort(undefined);
  }) || !_fails(function () {
    // V8 bug
    test$1.sort(null); // Old WebKit
  }) || !_strictMethod($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined ? $sort.call(_toObject(this)) : $sort.call(_toObject(this), _aFunction(comparefn));
    }
  });

  var SPECIES = _wks('species');

  var _arraySpeciesConstructor = function _arraySpeciesConstructor(original) {
    var C;

    if (_isArray(original)) {
      C = original.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;

      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array : C;
  }; // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function _arraySpeciesCreate(original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  }; // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex


  var _arrayMethods = function _arrayMethods(TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject($this);

      var self = _iobject(O);

      var f = _ctx(callbackfn, that, 3);

      var length = _toLength(self.length);

      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;

      for (; length > index; index++) {
        if (NO_HOLES || index in self) {
          val = self[index];
          res = f(val, index, O);

          if (TYPE) {
            if (IS_MAP) result[index] = res; // map
            else if (res) switch (TYPE) {
                case 3:
                  return true;
                // some

                case 5:
                  return val;
                // find

                case 6:
                  return index;
                // findIndex

                case 2:
                  result.push(val);
                // filter
              } else if (IS_EVERY) return false; // every
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  var $forEach = _arrayMethods(0);

  var STRICT = _strictMethod([].forEach, true);

  _export(_export.P + _export.F * !STRICT, 'Array', {
    // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
    forEach: function forEach(callbackfn
    /* , thisArg */
    ) {
      return $forEach(this, callbackfn, arguments[1]);
    }
  });

  var $map = _arrayMethods(1);

  _export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
    // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments[1]);
    }
  });

  var $filter = _arrayMethods(2);

  _export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
    // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
    filter: function filter(callbackfn
    /* , thisArg */
    ) {
      return $filter(this, callbackfn, arguments[1]);
    }
  });

  var $some = _arrayMethods(3);

  _export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
    // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
    some: function some(callbackfn
    /* , thisArg */
    ) {
      return $some(this, callbackfn, arguments[1]);
    }
  });

  var $every = _arrayMethods(4);

  _export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
    // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return $every(this, callbackfn, arguments[1]);
    }
  });

  var _arrayReduce = function _arrayReduce(that, callbackfn, aLen, memo, isRight) {
    _aFunction(callbackfn);

    var O = _toObject(that);

    var self = _iobject(O);

    var length = _toLength(O.length);

    var index = isRight ? length - 1 : 0;
    var i = isRight ? -1 : 1;
    if (aLen < 2) for (;;) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (isRight ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; isRight ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }

    return memo;
  };

  _export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
    // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
    reduce: function reduce(callbackfn
    /* , initialValue */
    ) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
    }
  });

  _export(_export.P + _export.F * !_strictMethod([].reduceRight, true), 'Array', {
    // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
    reduceRight: function reduceRight(callbackfn
    /* , initialValue */
    ) {
      return _arrayReduce(this, callbackfn, arguments.length, arguments[1], true);
    }
  });

  var $indexOf = _arrayIncludes(false);

  var $native = [].indexOf;
  var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

  _export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
    // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      return NEGATIVE_ZERO // convert -0 to +0
      ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
    }
  });

  var $native$1 = [].lastIndexOf;
  var NEGATIVE_ZERO$1 = !!$native$1 && 1 / [1].lastIndexOf(1, -0) < 0;

  _export(_export.P + _export.F * (NEGATIVE_ZERO$1 || !_strictMethod($native$1)), 'Array', {
    // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
    lastIndexOf: function lastIndexOf(searchElement
    /* , fromIndex = @[*-1] */
    ) {
      // convert -0 to +0
      if (NEGATIVE_ZERO$1) return $native$1.apply(this, arguments) || 0;

      var O = _toIobject(this);

      var length = _toLength(O.length);

      var index = length - 1;
      if (arguments.length > 1) index = Math.min(index, _toInteger(arguments[1]));
      if (index < 0) index = length + index;

      for (; index >= 0; index--) {
        if (index in O) if (O[index] === searchElement) return index || 0;
      }

      return -1;
    }
  });

  var _arrayCopyWithin = [].copyWithin || function copyWithin(target
  /* = 0 */
  , start
  /* = 0, end = @length */
  ) {
    var O = _toObject(this);

    var len = _toLength(O.length);

    var to = _toAbsoluteIndex(target, len);

    var from = _toAbsoluteIndex(start, len);

    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = Math.min((end === undefined ? len : _toAbsoluteIndex(end, len)) - from, len - to);
    var inc = 1;

    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count-- > 0) {
      if (from in O) O[to] = O[from];else delete O[to];
      to += inc;
      from += inc;
    }

    return O;
  }; // 22.1.3.31 Array.prototype[@@unscopables]


  var UNSCOPABLES = _wks('unscopables');

  var ArrayProto$1 = Array.prototype;
  if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});

  var _addToUnscopables = function _addToUnscopables(key) {
    ArrayProto$1[UNSCOPABLES][key] = true;
  }; // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


  _export(_export.P, 'Array', {
    copyWithin: _arrayCopyWithin
  });

  _addToUnscopables('copyWithin');

  var _arrayFill = function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = _toObject(this);

    var length = _toLength(O.length);

    var aLen = arguments.length;

    var index = _toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);

    var end = aLen > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : _toAbsoluteIndex(end, length);

    while (endPos > index) {
      O[index++] = value;
    }

    return O;
  }; // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


  _export(_export.P, 'Array', {
    fill: _arrayFill
  });

  _addToUnscopables('fill'); // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)


  var $find = _arrayMethods(5);

  var KEY = 'find';
  var forced = true; // Shouldn't skip holes

  if (KEY in []) Array(1)[KEY](function () {
    forced = false;
  });

  _export(_export.P + _export.F * forced, 'Array', {
    find: function find(callbackfn
    /* , that = undefined */
    ) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables(KEY); // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)


  var $find$1 = _arrayMethods(6);

  var KEY$1 = 'findIndex';
  var forced$1 = true; // Shouldn't skip holes

  if (KEY$1 in []) Array(1)[KEY$1](function () {
    forced$1 = false;
  });

  _export(_export.P + _export.F * forced$1, 'Array', {
    findIndex: function findIndex(callbackfn
    /* , that = undefined */
    ) {
      return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables(KEY$1);

  var SPECIES$1 = _wks('species');

  var _setSpecies = function _setSpecies(KEY) {
    var C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function get() {
        return this;
      }
    });
  };

  _setSpecies('Array');

  var _iterStep = function _iterStep(done, value) {
    return {
      value: value,
      done: !!done
    };
  }; // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()


  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target

    this._i = 0; // next index

    this._k = kind; // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;

    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }

    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)


  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');

  _addToUnscopables('values');

  _addToUnscopables('entries'); // 21.2.5.3 get RegExp.prototype.flags


  var _flags = function _flags() {
    var that = _anObject(this);

    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var dP$4 = _objectDp.f;
  var gOPN$3 = _objectGopn.f;
  var $RegExp = _global.RegExp;
  var Base$1 = $RegExp;
  var proto$2 = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g; // "new" creates a new object, old webkit buggy here

  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function () {
    re2[_wks('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;

      var piRE = _isRegexp(p);

      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : _inheritIfRequired(CORRECT_NEW ? new Base$1(piRE && !fiU ? p.source : p, f) : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f), tiRE ? this : proto$2, $RegExp);
    };

    var proxy = function proxy(key) {
      key in $RegExp || dP$4($RegExp, key, {
        configurable: true,
        get: function get() {
          return Base$1[key];
        },
        set: function set(it) {
          Base$1[key] = it;
        }
      });
    };

    for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) {
      proxy(keys$1[i++]);
    }

    proto$2.constructor = $RegExp;
    $RegExp.prototype = proto$2;

    _redefine(_global, 'RegExp', $RegExp);
  }

  _setSpecies('RegExp');

  var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
  // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
  // which loads this file before patching the method.

  var nativeReplace = String.prototype.replace;
  var patchedExec = nativeExec;
  var LAST_INDEX = 'lastIndex';

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/,
        re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  }(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
      match = nativeExec.call(re, str);

      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        // eslint-disable-next-line no-loop-func
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var _regexpExec = patchedExec;

  _export({
    target: 'RegExp',
    proto: true,
    forced: _regexpExec !== /./.exec
  }, {
    exec: _regexpExec
  }); // 21.2.5.3 get RegExp.prototype.flags()


  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });
  var TO_STRING$1 = 'toString';
  var $toString$1 = /./[TO_STRING$1];

  var define = function define(fn) {
    _redefine(RegExp.prototype, TO_STRING$1, fn, true);
  }; // 21.2.5.14 RegExp.prototype.toString()


  if (_fails(function () {
    return $toString$1.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  })) {
    define(function toString() {
      var R = _anObject(this);

      return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    }); // FF44- RegExp#toString has a wrong name
  } else if ($toString$1.name != TO_STRING$1) {
    define(function toString() {
      return $toString$1.call(this);
    });
  }

  var at = _stringAt(true); // `AdvanceStringIndex` abstract operation
  // https://tc39.github.io/ecma262/#sec-advancestringindex


  var _advanceStringIndex = function _advanceStringIndex(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };

  var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
  // https://tc39.github.io/ecma262/#sec-regexpexec

  var _regexpExecAbstract = function _regexpExecAbstract(R, S) {
    var exec = R.exec;

    if (typeof exec === 'function') {
      var result = exec.call(R, S);

      if (_typeof(result) !== 'object') {
        throw new TypeError('RegExp exec method returned something other than an Object or null');
      }

      return result;
    }

    if (_classof(R) !== 'RegExp') {
      throw new TypeError('RegExp#exec called on incompatible receiver');
    }

    return builtinExec.call(R, S);
  };

  var SPECIES$2 = _wks('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    };

    return ''.replace(re, '$<a>') !== '7';
  });

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    var re = /(?:)/;
    var originalExec = re.exec;

    re.exec = function () {
      return originalExec.apply(this, arguments);
    };

    var result = 'ab'.split(re);
    return result.length === 2 && result[0] === 'a' && result[1] === 'b';
  }();

  var _fixReWks = function _fixReWks(KEY, length, exec) {
    var SYMBOL = _wks(KEY);

    var DELEGATES_TO_SYMBOL = !_fails(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      re.exec = function () {
        execCalled = true;
        return null;
      };

      if (KEY === 'split') {
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};

        re.constructor[SPECIES$2] = function () {
          return re;
        };
      }

      re[SYMBOL]('');
      return !execCalled;
    }) : undefined;

    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(_defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === _regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      var strfn = fns[0];
      var rxfn = fns[1];

      _redefine(String.prototype, KEY, strfn);

      _hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) {
        return rxfn.call(string, this, arg);
      } // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) {
        return rxfn.call(string, this);
      });
    }
  }; // @@match logic


  _fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;

      var rx = _anObject(regexp);

      var S = String(this);
      if (!rx.global) return _regexpExecAbstract(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;

      while ((result = _regexpExecAbstract(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
        n++;
      }

      return n === 0 ? null : A;
    }];
  });

  var max$1 = Math.max;
  var min$2 = Math.min;
  var floor$3 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

  var maybeToString = function maybeToString(it) {
    return it === undefined ? it : String(it);
  }; // @@replace logic


  _fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
    return [// `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = _anObject(regexp);

      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;

      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];

      while (true) {
        var result = _regexpExecAbstract(rx, S);

        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) {
          captures.push(maybeToString(result[j]));
        }

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }

        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + S.slice(nextSourcePosition);
    }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

      if (namedCaptures !== undefined) {
        namedCaptures = _toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }

      return $replace.call(replacement, symbols, function (match, ch) {
        var capture;

        switch (ch.charAt(0)) {
          case '$':
            return '$';

          case '&':
            return matched;

          case '`':
            return str.slice(0, position);

          case "'":
            return str.slice(tailPos);

          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;

          default:
            // \d\d?
            var n = +ch;
            if (n === 0) return match;

            if (n > m) {
              var f = floor$3(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }

            capture = captures[n - 1];
        }

        return capture === undefined ? '' : capture;
      });
    }
  }); // @@search logic


  _fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
    return [// `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    }, // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;

      var rx = _anObject(regexp);

      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;

      var result = _regexpExecAbstract(rx, S);

      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }];
  }); // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES$3 = _wks('species');

  var _speciesConstructor = function _speciesConstructor(O, D) {
    var C = _anObject(O).constructor;

    var S;
    return C === undefined || (S = _anObject(C)[SPECIES$3]) == undefined ? D : _aFunction(S);
  };

  var $min = Math.min;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX$1 = 'lastIndex';
  var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

  var SUPPORTS_Y = !_fails(function () {
    RegExp(MAX_UINT32, 'y');
  }); // @@split logic

  _fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
    var internalSplit;

    if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function internalSplit(separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

        if (!_isRegexp(separator)) return $split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;

        while (match = _regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy[LAST_INDEX$1];

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }

          if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
        }

        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));

        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      }; // Chakra, V8

    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      internalSplit = function internalSplit(separator, limit) {
        return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
      };
    } else {
      internalSplit = $split;
    }

    return [// `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    }, // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = _anObject(regexp);

      var S = String(this);

      var C = _speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.

      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];

      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;

        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));

        var e;

        if (z === null || (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
          q = _advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;

          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }

          q = p = e;
        }
      }

      A.push(S.slice(p));
      return A;
    }];
  });

  var _anInstance = function _anInstance(it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
      throw TypeError(name + ': incorrect invocation!');
    }

    return it;
  };

  var _forOf = createCommonjsModule(function (module) {
    var BREAK = {};
    var RETURN = {};

    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () {
        return iterable;
      } : core_getIteratorMethod(iterable);

      var f = _ctx(fn, that, entries ? 2 : 1);

      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!'); // fast case for arrays with default iterator

      if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = _iterCall(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };

    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  var process = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function run() {
    var id = +this; // eslint-disable-next-line no-prototype-builtins

    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var listener = function listener(event) {
    run.call(event.data);
  }; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;

      while (arguments.length > i) {
        args.push(arguments[i++]);
      }

      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };

      defer(counter);
      return counter;
    };

    clearTask = function clearImmediate(id) {
      delete queue[id];
    }; // Node.js 0.8-


    if (_cof(process) == 'process') {
      defer = function defer(id) {
        process.nextTick(_ctx(run, id, 1));
      }; // Sphere (JS game engine) Dispatch API

    } else if (Dispatch && Dispatch.now) {
      defer = function defer(id) {
        Dispatch.now(_ctx(run, id, 1));
      }; // Browsers with MessageChannel, includes WebWorkers

    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function defer(id) {
        _global.postMessage(id + '', '*');
      };

      _global.addEventListener('message', listener, false); // IE8-

    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function defer(id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);

          run.call(id);
        };
      }; // Rest old browsers

    } else {
      defer = function defer(id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }

  var _task = {
    set: setTask,
    clear: clearTask
  };
  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$1 = _global.process;
  var Promise$1 = _global.Promise;
  var isNode = _cof(process$1) == 'process';

  var _microtask = function _microtask() {
    var head, last, notify;

    var flush = function flush() {
      var parent, fn;
      if (isNode && (parent = process$1.domain)) parent.exit();

      while (head) {
        fn = head.fn;
        head = head.next;

        try {
          fn();
        } catch (e) {
          if (head) notify();else last = undefined;
          throw e;
        }
      }

      last = undefined;
      if (parent) parent.enter();
    }; // Node.js


    if (isNode) {
      notify = function notify() {
        process$1.nextTick(flush);
      }; // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339

    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, {
        characterData: true
      }); // eslint-disable-line no-new

      notify = function notify() {
        node.data = toggle = !toggle;
      }; // environments with maybe non-completely correct, but existent Promise

    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);

      notify = function notify() {
        promise.then(flush);
      }; // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout

    } else {
      notify = function notify() {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      var task = {
        fn: fn,
        next: undefined
      };
      if (last) last.next = task;

      if (!head) {
        head = task;
        notify();
      }

      last = task;
    };
  }; // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$7 = function f$7(C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
    f: f$7
  };

  var _perform = function _perform(exec) {
    try {
      return {
        e: false,
        v: exec()
      };
    } catch (e) {
      return {
        e: true,
        v: e
      };
    }
  };

  var navigator = _global.navigator;

  var _userAgent = navigator && navigator.userAgent || '';

  var _promiseResolve = function _promiseResolve(C, x) {
    _anObject(C);

    if (_isObject(x) && x.constructor === C) return x;

    var promiseCapability = _newPromiseCapability.f(C);

    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function _redefineAll(target, src, safe) {
    for (var key in src) {
      _redefine(target, key, src[key], safe);
    }

    return target;
  };

  var task = _task.set;

  var microtask = _microtask();

  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$2 = _global.process;
  var versions = process$2 && process$2.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = _global[PROMISE];
  var isNode$1 = _classof(process$2) == 'process';

  var empty = function empty() {
    /* empty */
  };

  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;
  var USE_NATIVE$1 = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);

      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


      return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0 && _userAgent.indexOf('Chrome/66') === -1;
    } catch (e) {
      /* empty */
    }
  }(); // helpers

  var isThenable = function isThenable(it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify = function notify(promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;

      var run = function run(reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;

        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }

            if (handler === true) result = value;else {
              if (domain) domain.enter();
              result = handler(value); // may throw

              if (domain) {
                domain.exit();
                exited = true;
              }
            }

            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };

      while (chain.length > i) {
        run(chain[i++]);
      } // variable length - can't use forEach


      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };

  var onUnhandled = function onUnhandled(promise) {
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;

      if (unhandled) {
        result = _perform(function () {
          if (isNode$1) {
            process$2.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({
              promise: promise,
              reason: value
            });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      }

      promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };

  var isUnhandled = function isUnhandled(promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };

  var onHandleUnhandled = function onHandleUnhandled(promise) {
    task.call(_global, function () {
      var handler;

      if (isNode$1) {
        process$2.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({
          promise: promise,
          reason: promise._v
        });
      }
    });
  };

  var $reject = function $reject(value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap

    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };

  var $resolve = function $resolve(value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap

    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");

      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = {
            _w: promise,
            _d: false
          }; // wrap

          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({
        _w: promise,
        _d: false
      }, e); // wrap
    }
  }; // constructor polyfill


  if (!USE_NATIVE$1) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, '_h');

      _aFunction(executor);

      Internal.call(this);

      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    }; // eslint-disable-next-line no-unused-vars


    Internal = function Promise(executor) {
      this._c = []; // <- awaiting reactions

      this._a = undefined; // <- checked in isUnhandled reactions

      this._s = 0; // <- state

      this._d = false; // <- done

      this._v = undefined; // <- value

      this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

      this._n = false; // <- notify
    };

    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$1 ? process$2.domain : undefined;

        this._c.push(reaction);

        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function _catch(onRejected) {
        return this.then(undefined, onRejected);
      }
    });

    OwnPromiseCapability = function OwnPromiseCapability() {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };

    _newPromiseCapability.f = newPromiseCapability = function newPromiseCapability(C) {
      return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, {
    Promise: $Promise
  });

  _setToStringTag($Promise, PROMISE);

  _setSpecies(PROMISE);

  Wrapper = _core[PROMISE]; // statics

  _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });

  _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(this, x);
    }
  });

  _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;

      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;

        _forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });

        --remaining || resolve(values);
      });

      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;

      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });

      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  var _validateCollection = function _validateCollection(it, TYPE) {
    if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
    return it;
  };

  var dP$5 = _objectDp.f;
  var fastKey = _meta.fastKey;
  var SIZE = _descriptors ? '_s' : 'size';

  var getEntry = function getEntry(that, key) {
    // fast case
    var index = fastKey(key);
    var entry;
    if (index !== 'F') return that._i[index]; // frozen object case

    for (entry = that._f; entry; entry = entry.n) {
      if (entry.k == key) return entry;
    }
  };

  var _collectionStrong = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');

        that._t = NAME; // collection type

        that._i = _objectCreate(null); // index

        that._f = undefined; // first entry

        that._l = undefined; // last entry

        that[SIZE] = 0; // size

        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });

      _redefineAll(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
            entry.r = true;
            if (entry.p) entry.p = entry.p.n = undefined;
            delete data[entry.i];
          }

          that._f = that._l = undefined;
          that[SIZE] = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        'delete': function _delete(key) {
          var that = _validateCollection(this, NAME);

          var entry = getEntry(that, key);

          if (entry) {
            var next = entry.n;
            var prev = entry.p;
            delete that._i[entry.i];
            entry.r = true;
            if (prev) prev.n = next;
            if (next) next.p = prev;
            if (that._f == entry) that._f = next;
            if (that._l == entry) that._l = prev;
            that[SIZE]--;
          }

          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn
        /* , that = undefined */
        ) {
          _validateCollection(this, NAME);

          var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);

          var entry;

          while (entry = entry ? entry.n : this._f) {
            f(entry.v, entry.k, this); // revert to the last existing entry

            while (entry && entry.r) {
              entry = entry.p;
            }
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(_validateCollection(this, NAME), key);
        }
      });

      if (_descriptors) dP$5(C.prototype, 'size', {
        get: function get() {
          return _validateCollection(this, NAME)[SIZE];
        }
      });
      return C;
    },
    def: function def(that, key, value) {
      var entry = getEntry(that, key);
      var prev, index; // change existing entry

      if (entry) {
        entry.v = value; // create new entry
      } else {
        that._l = entry = {
          i: index = fastKey(key, true),
          // <- index
          k: key,
          // <- key
          v: value,
          // <- value
          p: prev = that._l,
          // <- previous entry
          n: undefined,
          // <- next entry
          r: false // <- removed

        };
        if (!that._f) that._f = entry;
        if (prev) prev.n = entry;
        that[SIZE]++; // add to index

        if (index !== 'F') that._i[index] = entry;
      }

      return that;
    },
    getEntry: getEntry,
    setStrong: function setStrong(C, NAME, IS_MAP) {
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      _iterDefine(C, NAME, function (iterated, kind) {
        this._t = _validateCollection(iterated, NAME); // target

        this._k = kind; // kind

        this._l = undefined; // previous
      }, function () {
        var that = this;
        var kind = that._k;
        var entry = that._l; // revert to the last existing entry

        while (entry && entry.r) {
          entry = entry.p;
        } // get next entry


        if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
          // or finish the iteration
          that._t = undefined;
          return _iterStep(1);
        } // return step by kind


        if (kind == 'keys') return _iterStep(0, entry.k);
        if (kind == 'values') return _iterStep(0, entry.v);
        return _iterStep(0, [entry.k, entry.v]);
      }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2


      _setSpecies(NAME);
    }
  };

  var _collection = function _collection(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
    var Base = _global[NAME];
    var C = Base;
    var ADDER = IS_MAP ? 'set' : 'add';
    var proto = C && C.prototype;
    var O = {};

    var fixMethod = function fixMethod(KEY) {
      var fn = proto[KEY];

      _redefine(proto, KEY, KEY == 'delete' ? function (a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) {
        fn.call(this, a === 0 ? 0 : a);
        return this;
      } : function set(a, b) {
        fn.call(this, a === 0 ? 0 : a, b);
        return this;
      });
    };

    if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
      new C().entries().next();
    }))) {
      // create collection constructor
      C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);

      _redefineAll(C.prototype, methods);

      _meta.NEED = true;
    } else {
      var instance = new C(); // early implementations not supports chaining

      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false

      var THROWS_ON_PRIMITIVES = _fails(function () {
        instance.has(1);
      }); // most early implementations doesn't supports iterables, most modern - not close it correctly


      var ACCEPT_ITERABLES = _iterDetect(function (iter) {
        new C(iter);
      }); // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same


      var BUGGY_ZERO = !IS_WEAK && _fails(function () {
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C();
        var index = 5;

        while (index--) {
          $instance[ADDER](index, index);
        }

        return !$instance.has(-0);
      });

      if (!ACCEPT_ITERABLES) {
        C = wrapper(function (target, iterable) {
          _anInstance(target, C, NAME);

          var that = _inheritIfRequired(new Base(), target, C);

          if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
          return that;
        });
        C.prototype = proto;
        proto.constructor = C;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

      if (IS_WEAK && proto.clear) delete proto.clear;
    }

    _setToStringTag(C, NAME);

    O[NAME] = C;

    _export(_export.G + _export.W + _export.F * (C != Base), O);

    if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);
    return C;
  };

  var MAP = 'Map'; // 23.1 Map Objects

  var es6_map = _collection(MAP, function (get) {
    return function Map() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function get(key) {
      var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);

      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function set(key, value) {
      return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
    }
  }, _collectionStrong, true);

  var SET = 'Set'; // 23.2 Set Objects

  var es6_set = _collection(SET, function (get) {
    return function Set() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function add(value) {
      return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
    }
  }, _collectionStrong);

  var getWeak = _meta.getWeak;

  var arrayFind = _arrayMethods(5);

  var arrayFindIndex = _arrayMethods(6);

  var id$1 = 0; // fallback for uncaught frozen keys

  var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
    return that._l || (that._l = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function UncaughtFrozenStore() {
    this.a = [];
  };

  var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
    return arrayFind(store.a, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function get(key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function has(key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function set(key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;else this.a.push([key, value]);
    },
    'delete': function _delete(key) {
      var index = arrayFindIndex(this.a, function (it) {
        return it[0] === key;
      });
      if (~index) this.a.splice(index, 1);
      return !!~index;
    }
  };
  var _collectionWeak = {
    getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        _anInstance(that, C, NAME, '_i');

        that._t = NAME; // collection type

        that._i = id$1++; // collection id

        that._l = undefined; // leak store for uncaught frozen objects

        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
      });

      _redefineAll(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        'delete': function _delete(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
          return data && _has(data, this._i) && delete data[this._i];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          if (!_isObject(key)) return false;
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
          return data && _has(data, this._i);
        }
      });

      return C;
    },
    def: function def(that, key, value) {
      var data = getWeak(_anObject(key), true);
      if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
      return that;
    },
    ufstore: uncaughtFrozenStore
  };
  var es6_weakMap = createCommonjsModule(function (module) {
    var each = _arrayMethods(0);

    var NATIVE_WEAK_MAP = _validateCollection;
    var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
    var WEAK_MAP = 'WeakMap';
    var getWeak = _meta.getWeak;
    var isExtensible = Object.isExtensible;
    var uncaughtFrozenStore = _collectionWeak.ufstore;
    var InternalMap;

    var wrapper = function wrapper(get) {
      return function WeakMap() {
        return get(this, arguments.length > 0 ? arguments[0] : undefined);
      };
    };

    var methods = {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        if (_isObject(key)) {
          var data = getWeak(key);
          if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
          return data ? data[this._i] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
      }
    }; // 23.3 WeakMap Objects

    var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true); // IE11 WeakMap frozen keys fix


    if (NATIVE_WEAK_MAP && IS_IE11) {
      InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);

      _objectAssign(InternalMap.prototype, methods);

      _meta.NEED = true;
      each(['delete', 'has', 'get', 'set'], function (key) {
        var proto = $WeakMap.prototype;
        var method = proto[key];

        _redefine(proto, key, function (a, b) {
          // store frozen objects on internal weakmap shim
          if (_isObject(a) && !isExtensible(a)) {
            if (!this._f) this._f = new InternalMap();

            var result = this._f[key](a, b);

            return key == 'set' ? this : result; // store all the rest on native weakmap
          }

          return method.call(this, a, b);
        });
      });
    }
  });
  var WEAK_SET = 'WeakSet'; // 23.4 WeakSet Objects

  _collection(WEAK_SET, function (get) {
    return function WeakSet() {
      return get(this, arguments.length > 0 ? arguments[0] : undefined);
    };
  }, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function add(value) {
      return _collectionWeak.def(_validateCollection(this, WEAK_SET), value, true);
    }
  }, _collectionWeak, false, true);

  var TYPED = _uid('typed_array');

  var VIEW = _uid('view');

  var ABV = !!(_global.ArrayBuffer && _global.DataView);
  var CONSTR = ABV;
  var i$1 = 0;
  var l = 9;
  var Typed;
  var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

  while (i$1 < l) {
    if (Typed = _global[TypedArrayConstructors[i$1++]]) {
      _hide(Typed.prototype, TYPED, true);

      _hide(Typed.prototype, VIEW, true);
    } else CONSTR = false;
  }

  var _typed = {
    ABV: ABV,
    CONSTR: CONSTR,
    TYPED: TYPED,
    VIEW: VIEW
  }; // https://tc39.github.io/ecma262/#sec-toindex

  var _toIndex = function _toIndex(it) {
    if (it === undefined) return 0;

    var number = _toInteger(it);

    var length = _toLength(number);

    if (number !== length) throw RangeError('Wrong length!');
    return length;
  };

  var _typedBuffer = createCommonjsModule(function (module, exports) {
    var gOPN = _objectGopn.f;
    var dP = _objectDp.f;
    var ARRAY_BUFFER = 'ArrayBuffer';
    var DATA_VIEW = 'DataView';
    var PROTOTYPE = 'prototype';
    var WRONG_LENGTH = 'Wrong length!';
    var WRONG_INDEX = 'Wrong index!';
    var $ArrayBuffer = _global[ARRAY_BUFFER];
    var $DataView = _global[DATA_VIEW];
    var Math = _global.Math;
    var RangeError = _global.RangeError; // eslint-disable-next-line no-shadow-restricted-names

    var Infinity = _global.Infinity;
    var BaseBuffer = $ArrayBuffer;
    var abs = Math.abs;
    var pow = Math.pow;
    var floor = Math.floor;
    var log = Math.log;
    var LN2 = Math.LN2;
    var BUFFER = 'buffer';
    var BYTE_LENGTH = 'byteLength';
    var BYTE_OFFSET = 'byteOffset';
    var $BUFFER = _descriptors ? '_b' : BUFFER;
    var $LENGTH = _descriptors ? '_l' : BYTE_LENGTH;
    var $OFFSET = _descriptors ? '_o' : BYTE_OFFSET; // IEEE754 conversions based on https://github.com/feross/ieee754

    function packIEEE754(value, mLen, nBytes) {
      var buffer = new Array(nBytes);
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
      var i = 0;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      var e, m, c;
      value = abs(value); // eslint-disable-next-line no-self-compare

      if (value != value || value === Infinity) {
        // eslint-disable-next-line no-self-compare
        m = value != value ? 1 : 0;
        e = eMax;
      } else {
        e = floor(log(value) / LN2);

        if (value * (c = pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }

        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * pow(2, 1 - eBias);
        }

        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * pow(2, eBias - 1) * pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {
        ;
      }

      e = e << mLen | m;
      eLen += mLen;

      for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {
        ;
      }

      buffer[--i] |= s * 128;
      return buffer;
    }

    function unpackIEEE754(buffer, mLen, nBytes) {
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = eLen - 7;
      var i = nBytes - 1;
      var s = buffer[i--];
      var e = s & 127;
      var m;
      s >>= 7;

      for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {
        ;
      }

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;

      for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {
        ;
      }

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : s ? -Infinity : Infinity;
      } else {
        m = m + pow(2, mLen);
        e = e - eBias;
      }

      return (s ? -1 : 1) * m * pow(2, e - mLen);
    }

    function unpackI32(bytes) {
      return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
    }

    function packI8(it) {
      return [it & 0xff];
    }

    function packI16(it) {
      return [it & 0xff, it >> 8 & 0xff];
    }

    function packI32(it) {
      return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
    }

    function packF64(it) {
      return packIEEE754(it, 52, 8);
    }

    function packF32(it) {
      return packIEEE754(it, 23, 4);
    }

    function addGetter(C, key, internal) {
      dP(C[PROTOTYPE], key, {
        get: function get() {
          return this[internal];
        }
      });
    }

    function get(view, bytes, index, isLittleEndian) {
      var numIndex = +index;

      var intIndex = _toIndex(numIndex);

      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = store.slice(start, start + bytes);
      return isLittleEndian ? pack : pack.reverse();
    }

    function set(view, bytes, index, conversion, value, isLittleEndian) {
      var numIndex = +index;

      var intIndex = _toIndex(numIndex);

      if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
      var store = view[$BUFFER]._b;
      var start = intIndex + view[$OFFSET];
      var pack = conversion(+value);

      for (var i = 0; i < bytes; i++) {
        store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
      }
    }

    if (!_typed.ABV) {
      $ArrayBuffer = function ArrayBuffer(length) {
        _anInstance(this, $ArrayBuffer, ARRAY_BUFFER);

        var byteLength = _toIndex(length);

        this._b = _arrayFill.call(new Array(byteLength), 0);
        this[$LENGTH] = byteLength;
      };

      $DataView = function DataView(buffer, byteOffset, byteLength) {
        _anInstance(this, $DataView, DATA_VIEW);

        _anInstance(buffer, $ArrayBuffer, DATA_VIEW);

        var bufferLength = buffer[$LENGTH];

        var offset = _toInteger(byteOffset);

        if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
        byteLength = byteLength === undefined ? bufferLength - offset : _toLength(byteLength);
        if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
        this[$BUFFER] = buffer;
        this[$OFFSET] = offset;
        this[$LENGTH] = byteLength;
      };

      if (_descriptors) {
        addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
        addGetter($DataView, BUFFER, '_b');
        addGetter($DataView, BYTE_LENGTH, '_l');
        addGetter($DataView, BYTE_OFFSET, '_o');
      }

      _redefineAll($DataView[PROTOTYPE], {
        getInt8: function getInt8(byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24;
        },
        getUint8: function getUint8(byteOffset) {
          return get(this, 1, byteOffset)[0];
        },
        getInt16: function getInt16(byteOffset
        /* , littleEndian */
        ) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
        },
        getUint16: function getUint16(byteOffset
        /* , littleEndian */
        ) {
          var bytes = get(this, 2, byteOffset, arguments[1]);
          return bytes[1] << 8 | bytes[0];
        },
        getInt32: function getInt32(byteOffset
        /* , littleEndian */
        ) {
          return unpackI32(get(this, 4, byteOffset, arguments[1]));
        },
        getUint32: function getUint32(byteOffset
        /* , littleEndian */
        ) {
          return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
        },
        getFloat32: function getFloat32(byteOffset
        /* , littleEndian */
        ) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
        },
        getFloat64: function getFloat64(byteOffset
        /* , littleEndian */
        ) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
        },
        setInt8: function setInt8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setUint8: function setUint8(byteOffset, value) {
          set(this, 1, byteOffset, packI8, value);
        },
        setInt16: function setInt16(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setUint16: function setUint16(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 2, byteOffset, packI16, value, arguments[2]);
        },
        setInt32: function setInt32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setUint32: function setUint32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packI32, value, arguments[2]);
        },
        setFloat32: function setFloat32(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 4, byteOffset, packF32, value, arguments[2]);
        },
        setFloat64: function setFloat64(byteOffset, value
        /* , littleEndian */
        ) {
          set(this, 8, byteOffset, packF64, value, arguments[2]);
        }
      });
    } else {
      if (!_fails(function () {
        $ArrayBuffer(1);
      }) || !_fails(function () {
        new $ArrayBuffer(-1); // eslint-disable-line no-new
      }) || _fails(function () {
        new $ArrayBuffer(); // eslint-disable-line no-new

        new $ArrayBuffer(1.5); // eslint-disable-line no-new

        new $ArrayBuffer(NaN); // eslint-disable-line no-new

        return $ArrayBuffer.name != ARRAY_BUFFER;
      })) {
        $ArrayBuffer = function ArrayBuffer(length) {
          _anInstance(this, $ArrayBuffer);

          return new BaseBuffer(_toIndex(length));
        };

        var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];

        for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
          if (!((key = keys[j++]) in $ArrayBuffer)) _hide($ArrayBuffer, key, BaseBuffer[key]);
        }

        ArrayBufferProto.constructor = $ArrayBuffer;
      } // iOS Safari 7.x bug


      var view = new $DataView(new $ArrayBuffer(2));
      var $setInt8 = $DataView[PROTOTYPE].setInt8;
      view.setInt8(0, 2147483648);
      view.setInt8(1, 2147483649);
      if (view.getInt8(0) || !view.getInt8(1)) _redefineAll($DataView[PROTOTYPE], {
        setInt8: function setInt8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        },
        setUint8: function setUint8(byteOffset, value) {
          $setInt8.call(this, byteOffset, value << 24 >> 24);
        }
      }, true);
    }

    _setToStringTag($ArrayBuffer, ARRAY_BUFFER);

    _setToStringTag($DataView, DATA_VIEW);

    _hide($DataView[PROTOTYPE], _typed.VIEW, true);

    exports[ARRAY_BUFFER] = $ArrayBuffer;
    exports[DATA_VIEW] = $DataView;
  });

  var ArrayBuffer = _global.ArrayBuffer;
  var $ArrayBuffer = _typedBuffer.ArrayBuffer;
  var $DataView = _typedBuffer.DataView;
  var $isView = _typed.ABV && ArrayBuffer.isView;
  var $slice = $ArrayBuffer.prototype.slice;
  var VIEW$1 = _typed.VIEW;
  var ARRAY_BUFFER = 'ArrayBuffer';

  _export(_export.G + _export.W + _export.F * (ArrayBuffer !== $ArrayBuffer), {
    ArrayBuffer: $ArrayBuffer
  });

  _export(_export.S + _export.F * !_typed.CONSTR, ARRAY_BUFFER, {
    // 24.1.3.1 ArrayBuffer.isView(arg)
    isView: function isView(it) {
      return $isView && $isView(it) || _isObject(it) && VIEW$1 in it;
    }
  });

  _export(_export.P + _export.U + _export.F * _fails(function () {
    return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
  }), ARRAY_BUFFER, {
    // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
    slice: function slice(start, end) {
      if ($slice !== undefined && end === undefined) return $slice.call(_anObject(this), start); // FF fix

      var len = _anObject(this).byteLength;

      var first = _toAbsoluteIndex(start, len);

      var fin = _toAbsoluteIndex(end === undefined ? len : end, len);

      var result = new (_speciesConstructor(this, $ArrayBuffer))(_toLength(fin - first));
      var viewS = new $DataView(this);
      var viewT = new $DataView(result);
      var index = 0;

      while (first < fin) {
        viewT.setUint8(index++, viewS.getUint8(first++));
      }

      return result;
    }
  });

  _setSpecies(ARRAY_BUFFER);

  _export(_export.G + _export.W + _export.F * !_typed.ABV, {
    DataView: _typedBuffer.DataView
  });

  var _typedArray = createCommonjsModule(function (module) {
    if (_descriptors) {
      var LIBRARY = _library;
      var global = _global;
      var fails = _fails;
      var $export = _export;
      var $typed = _typed;
      var $buffer = _typedBuffer;
      var ctx = _ctx;
      var anInstance = _anInstance;
      var propertyDesc = _propertyDesc;
      var hide = _hide;
      var redefineAll = _redefineAll;
      var toInteger = _toInteger;
      var toLength = _toLength;
      var toIndex = _toIndex;
      var toAbsoluteIndex = _toAbsoluteIndex;
      var toPrimitive = _toPrimitive;
      var has = _has;
      var classof = _classof;
      var isObject = _isObject;
      var toObject = _toObject;
      var isArrayIter = _isArrayIter;
      var create = _objectCreate;
      var getPrototypeOf = _objectGpo;
      var gOPN = _objectGopn.f;
      var getIterFn = core_getIteratorMethod;
      var uid = _uid;
      var wks = _wks;
      var createArrayMethod = _arrayMethods;
      var createArrayIncludes = _arrayIncludes;
      var speciesConstructor = _speciesConstructor;
      var ArrayIterators = es6_array_iterator;
      var Iterators = _iterators;
      var $iterDetect = _iterDetect;
      var setSpecies = _setSpecies;
      var arrayFill = _arrayFill;
      var arrayCopyWithin = _arrayCopyWithin;
      var $DP = _objectDp;
      var $GOPD = _objectGopd;
      var dP = $DP.f;
      var gOPD = $GOPD.f;
      var RangeError = global.RangeError;
      var TypeError = global.TypeError;
      var Uint8Array = global.Uint8Array;
      var ARRAY_BUFFER = 'ArrayBuffer';
      var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
      var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
      var PROTOTYPE = 'prototype';
      var ArrayProto = Array[PROTOTYPE];
      var $ArrayBuffer = $buffer.ArrayBuffer;
      var $DataView = $buffer.DataView;
      var arrayForEach = createArrayMethod(0);
      var arrayFilter = createArrayMethod(2);
      var arraySome = createArrayMethod(3);
      var arrayEvery = createArrayMethod(4);
      var arrayFind = createArrayMethod(5);
      var arrayFindIndex = createArrayMethod(6);
      var arrayIncludes = createArrayIncludes(true);
      var arrayIndexOf = createArrayIncludes(false);
      var arrayValues = ArrayIterators.values;
      var arrayKeys = ArrayIterators.keys;
      var arrayEntries = ArrayIterators.entries;
      var arrayLastIndexOf = ArrayProto.lastIndexOf;
      var arrayReduce = ArrayProto.reduce;
      var arrayReduceRight = ArrayProto.reduceRight;
      var arrayJoin = ArrayProto.join;
      var arraySort = ArrayProto.sort;
      var arraySlice = ArrayProto.slice;
      var arrayToString = ArrayProto.toString;
      var arrayToLocaleString = ArrayProto.toLocaleString;
      var ITERATOR = wks('iterator');
      var TAG = wks('toStringTag');
      var TYPED_CONSTRUCTOR = uid('typed_constructor');
      var DEF_CONSTRUCTOR = uid('def_constructor');
      var ALL_CONSTRUCTORS = $typed.CONSTR;
      var TYPED_ARRAY = $typed.TYPED;
      var VIEW = $typed.VIEW;
      var WRONG_LENGTH = 'Wrong length!';
      var $map = createArrayMethod(1, function (O, length) {
        return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
      });
      var LITTLE_ENDIAN = fails(function () {
        // eslint-disable-next-line no-undef
        return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
      });
      var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
        new Uint8Array(1).set({});
      });

      var toOffset = function toOffset(it, BYTES) {
        var offset = toInteger(it);
        if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
        return offset;
      };

      var validate = function validate(it) {
        if (isObject(it) && TYPED_ARRAY in it) return it;
        throw TypeError(it + ' is not a typed array!');
      };

      var allocate = function allocate(C, length) {
        if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
          throw TypeError('It is not a typed array constructor!');
        }

        return new C(length);
      };

      var speciesFromList = function speciesFromList(O, list) {
        return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
      };

      var fromList = function fromList(C, list) {
        var index = 0;
        var length = list.length;
        var result = allocate(C, length);

        while (length > index) {
          result[index] = list[index++];
        }

        return result;
      };

      var addGetter = function addGetter(it, key, internal) {
        dP(it, key, {
          get: function get() {
            return this._d[internal];
          }
        });
      };

      var $from = function from(source
      /* , mapfn, thisArg */
      ) {
        var O = toObject(source);
        var aLen = arguments.length;
        var mapfn = aLen > 1 ? arguments[1] : undefined;
        var mapping = mapfn !== undefined;
        var iterFn = getIterFn(O);
        var i, length, values, result, step, iterator;

        if (iterFn != undefined && !isArrayIter(iterFn)) {
          for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
            values.push(step.value);
          }

          O = values;
        }

        if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);

        for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
          result[i] = mapping ? mapfn(O[i], i) : O[i];
        }

        return result;
      };

      var $of = function of()
      /* ...items */
      {
        var index = 0;
        var length = arguments.length;
        var result = allocate(this, length);

        while (length > index) {
          result[index] = arguments[index++];
        }

        return result;
      }; // iOS Safari 6.x fails here


      var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
        arrayToLocaleString.call(new Uint8Array(1));
      });

      var $toLocaleString = function toLocaleString() {
        return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
      };

      var proto = {
        copyWithin: function copyWithin(target, start
        /* , end */
        ) {
          return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
        },
        every: function every(callbackfn
        /* , thisArg */
        ) {
          return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        fill: function fill(value
        /* , start, end */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayFill.apply(validate(this), arguments);
        },
        filter: function filter(callbackfn
        /* , thisArg */
        ) {
          return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
        },
        find: function find(predicate
        /* , thisArg */
        ) {
          return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        findIndex: function findIndex(predicate
        /* , thisArg */
        ) {
          return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
        },
        forEach: function forEach(callbackfn
        /* , thisArg */
        ) {
          arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        indexOf: function indexOf(searchElement
        /* , fromIndex */
        ) {
          return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        includes: function includes(searchElement
        /* , fromIndex */
        ) {
          return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
        },
        join: function join(separator) {
          // eslint-disable-line no-unused-vars
          return arrayJoin.apply(validate(this), arguments);
        },
        lastIndexOf: function lastIndexOf(searchElement
        /* , fromIndex */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayLastIndexOf.apply(validate(this), arguments);
        },
        map: function map(mapfn
        /* , thisArg */
        ) {
          return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        reduce: function reduce(callbackfn
        /* , initialValue */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayReduce.apply(validate(this), arguments);
        },
        reduceRight: function reduceRight(callbackfn
        /* , initialValue */
        ) {
          // eslint-disable-line no-unused-vars
          return arrayReduceRight.apply(validate(this), arguments);
        },
        reverse: function reverse() {
          var that = this;
          var length = validate(that).length;
          var middle = Math.floor(length / 2);
          var index = 0;
          var value;

          while (index < middle) {
            value = that[index];
            that[index++] = that[--length];
            that[length] = value;
          }

          return that;
        },
        some: function some(callbackfn
        /* , thisArg */
        ) {
          return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        },
        sort: function sort(comparefn) {
          return arraySort.call(validate(this), comparefn);
        },
        subarray: function subarray(begin, end) {
          var O = validate(this);
          var length = O.length;
          var $begin = toAbsoluteIndex(begin, length);
          return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
        }
      };

      var $slice = function slice(start, end) {
        return speciesFromList(this, arraySlice.call(validate(this), start, end));
      };

      var $set = function set(arrayLike
      /* , offset */
      ) {
        validate(this);
        var offset = toOffset(arguments[1], 1);
        var length = this.length;
        var src = toObject(arrayLike);
        var len = toLength(src.length);
        var index = 0;
        if (len + offset > length) throw RangeError(WRONG_LENGTH);

        while (index < len) {
          this[offset + index] = src[index++];
        }
      };

      var $iterators = {
        entries: function entries() {
          return arrayEntries.call(validate(this));
        },
        keys: function keys() {
          return arrayKeys.call(validate(this));
        },
        values: function values() {
          return arrayValues.call(validate(this));
        }
      };

      var isTAIndex = function isTAIndex(target, key) {
        return isObject(target) && target[TYPED_ARRAY] && _typeof(key) != 'symbol' && key in target && String(+key) == String(key);
      };

      var $getDesc = function getOwnPropertyDescriptor(target, key) {
        return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
      };

      var $setDesc = function defineProperty(target, key, desc) {
        if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set') // TODO: add validation descriptor w/o calling accessors
        && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
          target[key] = desc.value;
          return target;
        }

        return dP(target, key, desc);
      };

      if (!ALL_CONSTRUCTORS) {
        $GOPD.f = $getDesc;
        $DP.f = $setDesc;
      }

      $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
        getOwnPropertyDescriptor: $getDesc,
        defineProperty: $setDesc
      });

      if (fails(function () {
        arrayToString.call({});
      })) {
        arrayToString = arrayToLocaleString = function toString() {
          return arrayJoin.call(this);
        };
      }

      var $TypedArrayPrototype$ = redefineAll({}, proto);
      redefineAll($TypedArrayPrototype$, $iterators);
      hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
      redefineAll($TypedArrayPrototype$, {
        slice: $slice,
        set: $set,
        constructor: function constructor() {
          /* noop */
        },
        toString: arrayToString,
        toLocaleString: $toLocaleString
      });
      addGetter($TypedArrayPrototype$, 'buffer', 'b');
      addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
      addGetter($TypedArrayPrototype$, 'byteLength', 'l');
      addGetter($TypedArrayPrototype$, 'length', 'e');
      dP($TypedArrayPrototype$, TAG, {
        get: function get() {
          return this[TYPED_ARRAY];
        }
      }); // eslint-disable-next-line max-statements

      module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
        CLAMPED = !!CLAMPED;
        var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
        var GETTER = 'get' + KEY;
        var SETTER = 'set' + KEY;
        var TypedArray = global[NAME];
        var Base = TypedArray || {};
        var TAC = TypedArray && getPrototypeOf(TypedArray);
        var FORCED = !TypedArray || !$typed.ABV;
        var O = {};
        var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];

        var getter = function getter(that, index) {
          var data = that._d;
          return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
        };

        var setter = function setter(that, index, value) {
          var data = that._d;
          if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
          data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
        };

        var addElement = function addElement(that, index) {
          dP(that, index, {
            get: function get() {
              return getter(this, index);
            },
            set: function set(value) {
              return setter(this, index, value);
            },
            enumerable: true
          });
        };

        if (FORCED) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME, '_d');
            var index = 0;
            var offset = 0;
            var buffer, byteLength, length, klass;

            if (!isObject(data)) {
              length = toIndex(data);
              byteLength = length * BYTES;
              buffer = new $ArrayBuffer(byteLength);
            } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              buffer = data;
              offset = toOffset($offset, BYTES);
              var $len = data.byteLength;

              if ($length === undefined) {
                if ($len % BYTES) throw RangeError(WRONG_LENGTH);
                byteLength = $len - offset;
                if (byteLength < 0) throw RangeError(WRONG_LENGTH);
              } else {
                byteLength = toLength($length) * BYTES;
                if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
              }

              length = byteLength / BYTES;
            } else if (TYPED_ARRAY in data) {
              return fromList(TypedArray, data);
            } else {
              return $from.call(TypedArray, data);
            }

            hide(that, '_d', {
              b: buffer,
              o: offset,
              l: byteLength,
              e: length,
              v: new $DataView(buffer)
            });

            while (index < length) {
              addElement(that, index++);
            }
          });
          TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
          hide(TypedArrayPrototype, 'constructor', TypedArray);
        } else if (!fails(function () {
          TypedArray(1);
        }) || !fails(function () {
          new TypedArray(-1); // eslint-disable-line no-new
        }) || !$iterDetect(function (iter) {
          new TypedArray(); // eslint-disable-line no-new

          new TypedArray(null); // eslint-disable-line no-new

          new TypedArray(1.5); // eslint-disable-line no-new

          new TypedArray(iter); // eslint-disable-line no-new
        }, true)) {
          TypedArray = wrapper(function (that, data, $offset, $length) {
            anInstance(that, TypedArray, NAME);
            var klass; // `ws` module bug, temporarily remove validation length for Uint8Array
            // https://github.com/websockets/ws/pull/645

            if (!isObject(data)) return new Base(toIndex(data));

            if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
              return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
            }

            if (TYPED_ARRAY in data) return fromList(TypedArray, data);
            return $from.call(TypedArray, data);
          });
          arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
            if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
          });
          TypedArray[PROTOTYPE] = TypedArrayPrototype;
          if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
        }

        var $nativeIterator = TypedArrayPrototype[ITERATOR];
        var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
        var $iterator = $iterators.values;
        hide(TypedArray, TYPED_CONSTRUCTOR, true);
        hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
        hide(TypedArrayPrototype, VIEW, true);
        hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

        if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
          dP(TypedArrayPrototype, TAG, {
            get: function get() {
              return NAME;
            }
          });
        }

        O[NAME] = TypedArray;
        $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
        $export($export.S, NAME, {
          BYTES_PER_ELEMENT: BYTES
        });
        $export($export.S + $export.F * fails(function () {
          Base.of.call(TypedArray, 1);
        }), NAME, {
          from: $from,
          of: $of
        });
        if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
        $export($export.P, NAME, proto);
        setSpecies(NAME);
        $export($export.P + $export.F * FORCED_SET, NAME, {
          set: $set
        });
        $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
        if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;
        $export($export.P + $export.F * fails(function () {
          new TypedArray(1).slice();
        }), NAME, {
          slice: $slice
        });
        $export($export.P + $export.F * (fails(function () {
          return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
        }) || !fails(function () {
          TypedArrayPrototype.toLocaleString.call([1, 2]);
        })), NAME, {
          toLocaleString: $toLocaleString
        });
        Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
        if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
      };
    } else module.exports = function () {
      /* empty */
    };
  });

  _typedArray('Int8', 1, function (init) {
    return function Int8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint8', 1, function (init) {
    return function Uint8ClampedArray(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  }, true);

  _typedArray('Int16', 2, function (init) {
    return function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint16', 2, function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Int32', 4, function (init) {
    return function Int32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Uint32', 4, function (init) {
    return function Uint32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float32', 4, function (init) {
    return function Float32Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  _typedArray('Float64', 8, function (init) {
    return function Float64Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  }); // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)


  var rApply = (_global.Reflect || {}).apply;
  var fApply = Function.apply; // MS Edge argumentsList argument is optional

  _export(_export.S + _export.F * !_fails(function () {
    rApply(function () {
      /* empty */
    });
  }), 'Reflect', {
    apply: function apply(target, thisArgument, argumentsList) {
      var T = _aFunction(target);

      var L = _anObject(argumentsList);

      return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
    }
  }); // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])


  var rConstruct = (_global.Reflect || {}).construct; // MS Edge supports only 2 arguments and argumentsList argument is optional
  // FF Nightly sets third argument as `new.target`, but does not create `this` from it

  var NEW_TARGET_BUG = _fails(function () {
    function F() {
      /* empty */
    }

    return !(rConstruct(function () {
      /* empty */
    }, [], F) instanceof F);
  });

  var ARGS_BUG = !_fails(function () {
    rConstruct(function () {
      /* empty */
    });
  });

  _export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
    construct: function construct(Target, args
    /* , newTarget */
    ) {
      _aFunction(Target);

      _anObject(args);

      var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
      if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);

      if (Target == newTarget) {
        // w/o altered newTarget, optimization for 0-4 arguments
        switch (args.length) {
          case 0:
            return new Target();

          case 1:
            return new Target(args[0]);

          case 2:
            return new Target(args[0], args[1]);

          case 3:
            return new Target(args[0], args[1], args[2]);

          case 4:
            return new Target(args[0], args[1], args[2], args[3]);
        } // w/o altered newTarget, lot of arguments case


        var $args = [null];
        $args.push.apply($args, args);
        return new (_bind.apply(Target, $args))();
      } // with altered newTarget, not support built-in constructors


      var proto = newTarget.prototype;

      var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);

      var result = Function.apply.call(Target, instance, args);
      return _isObject(result) ? result : instance;
    }
  }); // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
  // MS Edge has broken Reflect.defineProperty - throwing instead of returning false


  _export(_export.S + _export.F * _fails(function () {
    // eslint-disable-next-line no-undef
    Reflect.defineProperty(_objectDp.f({}, 1, {
      value: 1
    }), 1, {
      value: 2
    });
  }), 'Reflect', {
    defineProperty: function defineProperty(target, propertyKey, attributes) {
      _anObject(target);

      propertyKey = _toPrimitive(propertyKey, true);

      _anObject(attributes);

      try {
        _objectDp.f(target, propertyKey, attributes);

        return true;
      } catch (e) {
        return false;
      }
    }
  }); // 26.1.4 Reflect.deleteProperty(target, propertyKey)


  var gOPD$3 = _objectGopd.f;

  _export(_export.S, 'Reflect', {
    deleteProperty: function deleteProperty(target, propertyKey) {
      var desc = gOPD$3(_anObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    }
  }); // 26.1.5 Reflect.enumerate(target)


  var Enumerate = function Enumerate(iterated) {
    this._t = _anObject(iterated); // target

    this._i = 0; // next index

    var keys = this._k = []; // keys

    var key;

    for (key in iterated) {
      keys.push(key);
    }
  };

  _iterCreate(Enumerate, 'Object', function () {
    var that = this;
    var keys = that._k;
    var key;

    do {
      if (that._i >= keys.length) return {
        value: undefined,
        done: true
      };
    } while (!((key = keys[that._i++]) in that._t));

    return {
      value: key,
      done: false
    };
  });

  _export(_export.S, 'Reflect', {
    enumerate: function enumerate(target) {
      return new Enumerate(target);
    }
  }); // 26.1.6 Reflect.get(target, propertyKey [, receiver])


  function get(target, propertyKey
  /* , receiver */
  ) {
    var receiver = arguments.length < 3 ? target : arguments[2];
    var desc, proto;
    if (_anObject(target) === receiver) return target[propertyKey];
    if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
    if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
  }

  _export(_export.S, 'Reflect', {
    get: get
  }); // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)


  _export(_export.S, 'Reflect', {
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
      return _objectGopd.f(_anObject(target), propertyKey);
    }
  }); // 26.1.8 Reflect.getPrototypeOf(target)


  _export(_export.S, 'Reflect', {
    getPrototypeOf: function getPrototypeOf(target) {
      return _objectGpo(_anObject(target));
    }
  }); // 26.1.9 Reflect.has(target, propertyKey)


  _export(_export.S, 'Reflect', {
    has: function has(target, propertyKey) {
      return propertyKey in target;
    }
  }); // 26.1.10 Reflect.isExtensible(target)


  var $isExtensible = Object.isExtensible;

  _export(_export.S, 'Reflect', {
    isExtensible: function isExtensible(target) {
      _anObject(target);

      return $isExtensible ? $isExtensible(target) : true;
    }
  }); // all object keys, includes non-enumerable and symbols


  var Reflect$1 = _global.Reflect;

  var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
    var keys = _objectGopn.f(_anObject(it));

    var getSymbols = _objectGops.f;
    return getSymbols ? keys.concat(getSymbols(it)) : keys;
  }; // 26.1.11 Reflect.ownKeys(target)


  _export(_export.S, 'Reflect', {
    ownKeys: _ownKeys
  }); // 26.1.12 Reflect.preventExtensions(target)


  var $preventExtensions = Object.preventExtensions;

  _export(_export.S, 'Reflect', {
    preventExtensions: function preventExtensions(target) {
      _anObject(target);

      try {
        if ($preventExtensions) $preventExtensions(target);
        return true;
      } catch (e) {
        return false;
      }
    }
  }); // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])


  function set(target, propertyKey, V
  /* , receiver */
  ) {
    var receiver = arguments.length < 4 ? target : arguments[3];

    var ownDesc = _objectGopd.f(_anObject(target), propertyKey);

    var existingDescriptor, proto;

    if (!ownDesc) {
      if (_isObject(proto = _objectGpo(target))) {
        return set(proto, propertyKey, V, receiver);
      }

      ownDesc = _propertyDesc(0);
    }

    if (_has(ownDesc, 'value')) {
      if (ownDesc.writable === false || !_isObject(receiver)) return false;

      if (existingDescriptor = _objectGopd.f(receiver, propertyKey)) {
        if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
        existingDescriptor.value = V;

        _objectDp.f(receiver, propertyKey, existingDescriptor);
      } else _objectDp.f(receiver, propertyKey, _propertyDesc(0, V));

      return true;
    }

    return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
  }

  _export(_export.S, 'Reflect', {
    set: set
  }); // 26.1.14 Reflect.setPrototypeOf(target, proto)


  if (_setProto) _export(_export.S, 'Reflect', {
    setPrototypeOf: function setPrototypeOf(target, proto) {
      _setProto.check(target, proto);

      try {
        _setProto.set(target, proto);

        return true;
      } catch (e) {
        return false;
      }
    }
  }); // https://github.com/tc39/Array.prototype.includes

  var $includes = _arrayIncludes(true);

  _export(_export.P, 'Array', {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  _addToUnscopables('includes'); // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


  var IS_CONCAT_SPREADABLE = _wks('isConcatSpreadable');

  function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? _ctx(mapper, thisArg, 3) : false;
    var element, spreadable;

    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
        spreadable = false;

        if (_isObject(element)) {
          spreadable = element[IS_CONCAT_SPREADABLE];
          spreadable = spreadable !== undefined ? !!spreadable : _isArray(element);
        }

        if (spreadable && depth > 0) {
          targetIndex = flattenIntoArray(target, original, element, _toLength(element.length), targetIndex, depth - 1) - 1;
        } else {
          if (targetIndex >= 0x1fffffffffffff) throw TypeError();
          target[targetIndex] = element;
        }

        targetIndex++;
      }

      sourceIndex++;
    }

    return targetIndex;
  }

  var _flattenIntoArray = flattenIntoArray; // https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap

  _export(_export.P, 'Array', {
    flatMap: function flatMap(callbackfn
    /* , thisArg */
    ) {
      var O = _toObject(this);

      var sourceLen, A;

      _aFunction(callbackfn);

      sourceLen = _toLength(O.length);
      A = _arraySpeciesCreate(O, 0);

      _flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);

      return A;
    }
  });

  _addToUnscopables('flatMap'); // https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten


  _export(_export.P, 'Array', {
    flatten: function flatten()
    /* depthArg = 1 */
    {
      var depthArg = arguments[0];

      var O = _toObject(this);

      var sourceLen = _toLength(O.length);

      var A = _arraySpeciesCreate(O, 0);

      _flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : _toInteger(depthArg));

      return A;
    }
  });

  _addToUnscopables('flatten'); // https://github.com/mathiasbynens/String.prototype.at


  var $at$2 = _stringAt(true);

  var FORCED = _fails(function () {
    return '𠮷'.at(0) !== '𠮷';
  });

  _export(_export.P + _export.F * FORCED, 'String', {
    at: function at(pos) {
      return $at$2(this, pos);
    }
  }); // https://github.com/tc39/proposal-string-pad-start-end


  var _stringPad = function _stringPad(that, maxLength, fillString, left) {
    var S = String(_defined(that));
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : String(fillString);

    var intMaxLength = _toLength(maxLength);

    if (intMaxLength <= stringLength || fillStr == '') return S;
    var fillLen = intMaxLength - stringLength;

    var stringFiller = _stringRepeat.call(fillStr, Math.ceil(fillLen / fillStr.length));

    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
    return left ? stringFiller + S : S + stringFiller;
  }; // https://github.com/tc39/proposal-string-pad-start-end
  // https://github.com/zloirock/core-js/issues/280


  var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

  _export(_export.P + _export.F * WEBKIT_BUG, 'String', {
    padStart: function padStart(maxLength
    /* , fillString = ' ' */
    ) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
    }
  }); // https://github.com/tc39/proposal-string-pad-start-end
  // https://github.com/zloirock/core-js/issues/280


  var WEBKIT_BUG$1 = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(_userAgent);

  _export(_export.P + _export.F * WEBKIT_BUG$1, 'String', {
    padEnd: function padEnd(maxLength
    /* , fillString = ' ' */
    ) {
      return _stringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
    }
  }); // https://github.com/sebmarkbage/ecmascript-string-left-right-trim


  _stringTrim('trimLeft', function ($trim) {
    return function trimLeft() {
      return $trim(this, 1);
    };
  }, 'trimStart'); // https://github.com/sebmarkbage/ecmascript-string-left-right-trim


  _stringTrim('trimRight', function ($trim) {
    return function trimRight() {
      return $trim(this, 2);
    };
  }, 'trimEnd'); // https://tc39.github.io/String.prototype.matchAll/


  var RegExpProto = RegExp.prototype;

  var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
    this._r = regexp;
    this._s = string;
  };

  _iterCreate($RegExpStringIterator, 'RegExp String', function next() {
    var match = this._r.exec(this._s);

    return {
      value: match,
      done: match === null
    };
  });

  _export(_export.P, 'String', {
    matchAll: function matchAll(regexp) {
      _defined(this);

      if (!_isRegexp(regexp)) throw TypeError(regexp + ' is not a regexp!');
      var S = String(this);
      var flags = 'flags' in RegExpProto ? String(regexp.flags) : _flags.call(regexp);
      var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
      rx.lastIndex = _toLength(regexp.lastIndex);
      return new $RegExpStringIterator(rx, S);
    }
  });

  _wksDefine('asyncIterator');

  _wksDefine('observable'); // https://github.com/tc39/proposal-object-getownpropertydescriptors


  _export(_export.S, 'Object', {
    getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
      var O = _toIobject(object);

      var getDesc = _objectGopd.f;

      var keys = _ownKeys(O);

      var result = {};
      var i = 0;
      var key, desc;

      while (keys.length > i) {
        desc = getDesc(O, key = keys[i++]);
        if (desc !== undefined) _createProperty(result, key, desc);
      }

      return result;
    }
  });

  var isEnum$1 = _objectPie.f;

  var _objectToArray = function _objectToArray(isEntries) {
    return function (it) {
      var O = _toIobject(it);

      var keys = _objectKeys(O);

      var length = keys.length;
      var i = 0;
      var result = [];
      var key;

      while (length > i) {
        key = keys[i++];

        if (!_descriptors || isEnum$1.call(O, key)) {
          result.push(isEntries ? [key, O[key]] : O[key]);
        }
      }

      return result;
    };
  }; // https://github.com/tc39/proposal-object-values-entries


  var $values = _objectToArray(false);

  _export(_export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    }
  }); // https://github.com/tc39/proposal-object-values-entries


  var $entries = _objectToArray(true);

  _export(_export.S, 'Object', {
    entries: function entries(it) {
      return $entries(it);
    }
  }); // Forced replacement prototype accessors methods


  var _objectForcedPam = !_fails(function () {
    var K = Math.random(); // In FF throws only define methods
    // eslint-disable-next-line no-undef, no-useless-call

    __defineSetter__.call(null, K, function () {
      /* empty */
    });

    delete _global[K];
  }); // B.2.2.2 Object.prototype.__defineGetter__(P, getter)


  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __defineGetter__: function __defineGetter__(P, getter) {
      _objectDp.f(_toObject(this), P, {
        get: _aFunction(getter),
        enumerable: true,
        configurable: true
      });
    }
  }); // B.2.2.3 Object.prototype.__defineSetter__(P, setter)

  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __defineSetter__: function __defineSetter__(P, setter) {
      _objectDp.f(_toObject(this), P, {
        set: _aFunction(setter),
        enumerable: true,
        configurable: true
      });
    }
  });
  var getOwnPropertyDescriptor = _objectGopd.f; // B.2.2.4 Object.prototype.__lookupGetter__(P)

  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = _toObject(this);

      var K = _toPrimitive(P, true);

      var D;

      do {
        if (D = getOwnPropertyDescriptor(O, K)) return D.get;
      } while (O = _objectGpo(O));
    }
  });
  var getOwnPropertyDescriptor$1 = _objectGopd.f; // B.2.2.5 Object.prototype.__lookupSetter__(P)

  _descriptors && _export(_export.P + _objectForcedPam, 'Object', {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = _toObject(this);

      var K = _toPrimitive(P, true);

      var D;

      do {
        if (D = getOwnPropertyDescriptor$1(O, K)) return D.set;
      } while (O = _objectGpo(O));
    }
  });

  var _arrayFromIterable = function _arrayFromIterable(iter, ITERATOR) {
    var result = [];

    _forOf(iter, false, result.push, result, ITERATOR);

    return result;
  }; // https://github.com/DavidBruant/Map-Set.prototype.toJSON


  var _collectionToJson = function _collectionToJson(NAME) {
    return function toJSON() {
      if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
      return _arrayFromIterable(this);
    };
  }; // https://github.com/DavidBruant/Map-Set.prototype.toJSON


  _export(_export.P + _export.R, 'Map', {
    toJSON: _collectionToJson('Map')
  }); // https://github.com/DavidBruant/Map-Set.prototype.toJSON


  _export(_export.P + _export.R, 'Set', {
    toJSON: _collectionToJson('Set')
  }); // https://tc39.github.io/proposal-setmap-offrom/


  var _setCollectionOf = function _setCollectionOf(COLLECTION) {
    _export(_export.S, COLLECTION, {
      of: function of() {
        var length = arguments.length;
        var A = new Array(length);

        while (length--) {
          A[length] = arguments[length];
        }

        return new this(A);
      }
    });
  }; // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of


  _setCollectionOf('Map'); // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of


  _setCollectionOf('Set'); // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of


  _setCollectionOf('WeakMap'); // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of


  _setCollectionOf('WeakSet'); // https://tc39.github.io/proposal-setmap-offrom/


  var _setCollectionFrom = function _setCollectionFrom(COLLECTION) {
    _export(_export.S, COLLECTION, {
      from: function from(source
      /* , mapFn, thisArg */
      ) {
        var mapFn = arguments[1];
        var mapping, A, n, cb;

        _aFunction(this);

        mapping = mapFn !== undefined;
        if (mapping) _aFunction(mapFn);
        if (source == undefined) return new this();
        A = [];

        if (mapping) {
          n = 0;
          cb = _ctx(mapFn, arguments[2], 2);

          _forOf(source, false, function (nextItem) {
            A.push(cb(nextItem, n++));
          });
        } else {
          _forOf(source, false, A.push, A);
        }

        return new this(A);
      }
    });
  }; // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from


  _setCollectionFrom('Map'); // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from


  _setCollectionFrom('Set'); // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from


  _setCollectionFrom('WeakMap'); // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from


  _setCollectionFrom('WeakSet'); // https://github.com/tc39/proposal-global


  _export(_export.G, {
    global: _global
  }); // https://github.com/tc39/proposal-global


  _export(_export.S, 'System', {
    global: _global
  }); // https://github.com/ljharb/proposal-is-error


  _export(_export.S, 'Error', {
    isError: function isError(it) {
      return _cof(it) === 'Error';
    }
  }); // https://rwaldron.github.io/proposal-math-extensions/


  _export(_export.S, 'Math', {
    clamp: function clamp(x, lower, upper) {
      return Math.min(upper, Math.max(lower, x));
    }
  }); // https://rwaldron.github.io/proposal-math-extensions/


  _export(_export.S, 'Math', {
    DEG_PER_RAD: Math.PI / 180
  }); // https://rwaldron.github.io/proposal-math-extensions/


  var RAD_PER_DEG = 180 / Math.PI;

  _export(_export.S, 'Math', {
    degrees: function degrees(radians) {
      return radians * RAD_PER_DEG;
    }
  }); // https://rwaldron.github.io/proposal-math-extensions/


  var _mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
    if (arguments.length === 0 // eslint-disable-next-line no-self-compare
    || x != x // eslint-disable-next-line no-self-compare
    || inLow != inLow // eslint-disable-next-line no-self-compare
    || inHigh != inHigh // eslint-disable-next-line no-self-compare
    || outLow != outLow // eslint-disable-next-line no-self-compare
    || outHigh != outHigh) return NaN;
    if (x === Infinity || x === -Infinity) return x;
    return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
  }; // https://rwaldron.github.io/proposal-math-extensions/


  _export(_export.S, 'Math', {
    fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
      return _mathFround(_mathScale(x, inLow, inHigh, outLow, outHigh));
    }
  }); // https://gist.github.com/BrendanEich/4294d5c212a6d2254703


  _export(_export.S, 'Math', {
    iaddh: function iaddh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
    }
  }); // https://gist.github.com/BrendanEich/4294d5c212a6d2254703


  _export(_export.S, 'Math', {
    isubh: function isubh(x0, x1, y0, y1) {
      var $x0 = x0 >>> 0;
      var $x1 = x1 >>> 0;
      var $y0 = y0 >>> 0;
      return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
    }
  }); // https://gist.github.com/BrendanEich/4294d5c212a6d2254703


  _export(_export.S, 'Math', {
    imulh: function imulh(u, v) {
      var UINT16 = 0xffff;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >> 16;
      var v1 = $v >> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
    }
  }); // https://rwaldron.github.io/proposal-math-extensions/


  _export(_export.S, 'Math', {
    RAD_PER_DEG: 180 / Math.PI
  }); // https://rwaldron.github.io/proposal-math-extensions/


  var DEG_PER_RAD = Math.PI / 180;

  _export(_export.S, 'Math', {
    radians: function radians(degrees) {
      return degrees * DEG_PER_RAD;
    }
  }); // https://rwaldron.github.io/proposal-math-extensions/


  _export(_export.S, 'Math', {
    scale: _mathScale
  }); // https://gist.github.com/BrendanEich/4294d5c212a6d2254703


  _export(_export.S, 'Math', {
    umulh: function umulh(u, v) {
      var UINT16 = 0xffff;
      var $u = +u;
      var $v = +v;
      var u0 = $u & UINT16;
      var v0 = $v & UINT16;
      var u1 = $u >>> 16;
      var v1 = $v >>> 16;
      var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
      return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
    }
  }); // http://jfbastien.github.io/papers/Math.signbit.html


  _export(_export.S, 'Math', {
    signbit: function signbit(x) {
      // eslint-disable-next-line no-self-compare
      return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
    }
  });

  _export(_export.P + _export.R, 'Promise', {
    'finally': function _finally(onFinally) {
      var C = _speciesConstructor(this, _core.Promise || _global.Promise);

      var isFunction = typeof onFinally == 'function';
      return this.then(isFunction ? function (x) {
        return _promiseResolve(C, onFinally()).then(function () {
          return x;
        });
      } : onFinally, isFunction ? function (e) {
        return _promiseResolve(C, onFinally()).then(function () {
          throw e;
        });
      } : onFinally);
    }
  }); // https://github.com/tc39/proposal-promise-try


  _export(_export.S, 'Promise', {
    'try': function _try(callbackfn) {
      var promiseCapability = _newPromiseCapability.f(this);

      var result = _perform(callbackfn);

      (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
      return promiseCapability.promise;
    }
  });

  var shared$1 = _shared('metadata');

  var store = shared$1.store || (shared$1.store = new es6_weakMap());

  var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
    var targetMetadata = store.get(target);

    if (!targetMetadata) {
      if (!create) return undefined;
      store.set(target, targetMetadata = new es6_map());
    }

    var keyMetadata = targetMetadata.get(targetKey);

    if (!keyMetadata) {
      if (!create) return undefined;
      targetMetadata.set(targetKey, keyMetadata = new es6_map());
    }

    return keyMetadata;
  };

  var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
  };

  var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
    var metadataMap = getOrCreateMetadataMap(O, P, false);
    return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
  };

  var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
    getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
  };

  var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
    var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) metadataMap.forEach(function (_, key) {
      keys.push(key);
    });
    return keys;
  };

  var toMetaKey = function toMetaKey(it) {
    return it === undefined || _typeof(it) == 'symbol' ? it : String(it);
  };

  var exp$3 = function exp$3(O) {
    _export(_export.S, 'Reflect', O);
  };

  var _metadata = {
    store: store,
    map: getOrCreateMetadataMap,
    has: ordinaryHasOwnMetadata,
    get: ordinaryGetOwnMetadata,
    set: ordinaryDefineOwnMetadata,
    keys: ordinaryOwnMetadataKeys,
    key: toMetaKey,
    exp: exp$3
  };
  var toMetaKey$1 = _metadata.key;
  var ordinaryDefineOwnMetadata$1 = _metadata.set;

  _metadata.exp({
    defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
      ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, _anObject(target), toMetaKey$1(targetKey));
    }
  });

  var toMetaKey$2 = _metadata.key;
  var getOrCreateMetadataMap$1 = _metadata.map;
  var store$1 = _metadata.store;

  _metadata.exp({
    deleteMetadata: function deleteMetadata(metadataKey, target
    /* , targetKey */
    ) {
      var targetKey = arguments.length < 3 ? undefined : toMetaKey$2(arguments[2]);
      var metadataMap = getOrCreateMetadataMap$1(_anObject(target), targetKey, false);
      if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
      if (metadataMap.size) return true;
      var targetMetadata = store$1.get(target);
      targetMetadata['delete'](targetKey);
      return !!targetMetadata.size || store$1['delete'](target);
    }
  });

  var ordinaryHasOwnMetadata$1 = _metadata.has;
  var ordinaryGetOwnMetadata$1 = _metadata.get;
  var toMetaKey$3 = _metadata.key;

  var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
    if (hasOwn) return ordinaryGetOwnMetadata$1(MetadataKey, O, P);

    var parent = _objectGpo(O);

    return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
  };

  _metadata.exp({
    getMetadata: function getMetadata(metadataKey, target
    /* , targetKey */
    ) {
      return ordinaryGetMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$3(arguments[2]));
    }
  });

  var ordinaryOwnMetadataKeys$1 = _metadata.keys;
  var toMetaKey$4 = _metadata.key;

  var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
    var oKeys = ordinaryOwnMetadataKeys$1(O, P);

    var parent = _objectGpo(O);

    if (parent === null) return oKeys;
    var pKeys = ordinaryMetadataKeys(parent, P);
    return pKeys.length ? oKeys.length ? _arrayFromIterable(new es6_set(oKeys.concat(pKeys))) : pKeys : oKeys;
  };

  _metadata.exp({
    getMetadataKeys: function getMetadataKeys(target
    /* , targetKey */
    ) {
      return ordinaryMetadataKeys(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$4(arguments[1]));
    }
  });

  var ordinaryGetOwnMetadata$2 = _metadata.get;
  var toMetaKey$5 = _metadata.key;

  _metadata.exp({
    getOwnMetadata: function getOwnMetadata(metadataKey, target
    /* , targetKey */
    ) {
      return ordinaryGetOwnMetadata$2(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$5(arguments[2]));
    }
  });

  var ordinaryOwnMetadataKeys$2 = _metadata.keys;
  var toMetaKey$6 = _metadata.key;

  _metadata.exp({
    getOwnMetadataKeys: function getOwnMetadataKeys(target
    /* , targetKey */
    ) {
      return ordinaryOwnMetadataKeys$2(_anObject(target), arguments.length < 2 ? undefined : toMetaKey$6(arguments[1]));
    }
  });

  var ordinaryHasOwnMetadata$2 = _metadata.has;
  var toMetaKey$7 = _metadata.key;

  var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
    var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
    if (hasOwn) return true;

    var parent = _objectGpo(O);

    return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
  };

  _metadata.exp({
    hasMetadata: function hasMetadata(metadataKey, target
    /* , targetKey */
    ) {
      return ordinaryHasMetadata(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$7(arguments[2]));
    }
  });

  var ordinaryHasOwnMetadata$3 = _metadata.has;
  var toMetaKey$8 = _metadata.key;

  _metadata.exp({
    hasOwnMetadata: function hasOwnMetadata(metadataKey, target
    /* , targetKey */
    ) {
      return ordinaryHasOwnMetadata$3(metadataKey, _anObject(target), arguments.length < 3 ? undefined : toMetaKey$8(arguments[2]));
    }
  });

  var toMetaKey$9 = _metadata.key;
  var ordinaryDefineOwnMetadata$2 = _metadata.set;

  _metadata.exp({
    metadata: function metadata(metadataKey, metadataValue) {
      return function decorator(target, targetKey) {
        ordinaryDefineOwnMetadata$2(metadataKey, metadataValue, (targetKey !== undefined ? _anObject : _aFunction)(target), toMetaKey$9(targetKey));
      };
    }
  }); // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask


  var microtask$1 = _microtask();

  var process$3 = _global.process;
  var isNode$2 = _cof(process$3) == 'process';

  _export(_export.G, {
    asap: function asap(fn) {
      var domain = isNode$2 && process$3.domain;
      microtask$1(domain ? domain.bind(fn) : fn);
    }
  }); // https://github.com/zenparsing/es-observable


  var microtask$2 = _microtask();

  var OBSERVABLE = _wks('observable');

  var RETURN = _forOf.RETURN;

  var getMethod = function getMethod(fn) {
    return fn == null ? undefined : _aFunction(fn);
  };

  var cleanupSubscription = function cleanupSubscription(subscription) {
    var cleanup = subscription._c;

    if (cleanup) {
      subscription._c = undefined;
      cleanup();
    }
  };

  var subscriptionClosed = function subscriptionClosed(subscription) {
    return subscription._o === undefined;
  };

  var closeSubscription = function closeSubscription(subscription) {
    if (!subscriptionClosed(subscription)) {
      subscription._o = undefined;
      cleanupSubscription(subscription);
    }
  };

  var Subscription = function Subscription(observer, subscriber) {
    _anObject(observer);

    this._c = undefined;
    this._o = observer;
    observer = new SubscriptionObserver(this);

    try {
      var cleanup = subscriber(observer);
      var subscription = cleanup;

      if (cleanup != null) {
        if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
          subscription.unsubscribe();
        };else _aFunction(cleanup);
        this._c = cleanup;
      }
    } catch (e) {
      observer.error(e);
      return;
    }

    if (subscriptionClosed(this)) cleanupSubscription(this);
  };

  Subscription.prototype = _redefineAll({}, {
    unsubscribe: function unsubscribe() {
      closeSubscription(this);
    }
  });

  var SubscriptionObserver = function SubscriptionObserver(subscription) {
    this._s = subscription;
  };

  SubscriptionObserver.prototype = _redefineAll({}, {
    next: function next(value) {
      var subscription = this._s;

      if (!subscriptionClosed(subscription)) {
        var observer = subscription._o;

        try {
          var m = getMethod(observer.next);
          if (m) return m.call(observer, value);
        } catch (e) {
          try {
            closeSubscription(subscription);
          } finally {
            throw e;
          }
        }
      }
    },
    error: function error(value) {
      var subscription = this._s;
      if (subscriptionClosed(subscription)) throw value;
      var observer = subscription._o;
      subscription._o = undefined;

      try {
        var m = getMethod(observer.error);
        if (!m) throw value;
        value = m.call(observer, value);
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }

      cleanupSubscription(subscription);
      return value;
    },
    complete: function complete(value) {
      var subscription = this._s;

      if (!subscriptionClosed(subscription)) {
        var observer = subscription._o;
        subscription._o = undefined;

        try {
          var m = getMethod(observer.complete);
          value = m ? m.call(observer, value) : undefined;
        } catch (e) {
          try {
            cleanupSubscription(subscription);
          } finally {
            throw e;
          }
        }

        cleanupSubscription(subscription);
        return value;
      }
    }
  });

  var $Observable = function Observable(subscriber) {
    _anInstance(this, $Observable, 'Observable', '_f')._f = _aFunction(subscriber);
  };

  _redefineAll($Observable.prototype, {
    subscribe: function subscribe(observer) {
      return new Subscription(observer, this._f);
    },
    forEach: function forEach(fn) {
      var that = this;
      return new (_core.Promise || _global.Promise)(function (resolve, reject) {
        _aFunction(fn);

        var subscription = that.subscribe({
          next: function next(value) {
            try {
              return fn(value);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  });

  _redefineAll($Observable, {
    from: function from(x) {
      var C = typeof this === 'function' ? this : $Observable;
      var method = getMethod(_anObject(x)[OBSERVABLE]);

      if (method) {
        var observable = _anObject(method.call(x));

        return observable.constructor === C ? observable : new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      return new C(function (observer) {
        var done = false;
        microtask$2(function () {
          if (!done) {
            try {
              if (_forOf(x, false, function (it) {
                observer.next(it);
                if (done) return RETURN;
              }) === RETURN) return;
            } catch (e) {
              if (done) throw e;
              observer.error(e);
              return;
            }

            observer.complete();
          }
        });
        return function () {
          done = true;
        };
      });
    },
    of: function of() {
      for (var i = 0, l = arguments.length, items = new Array(l); i < l;) {
        items[i] = arguments[i++];
      }

      return new (typeof this === 'function' ? this : $Observable)(function (observer) {
        var done = false;
        microtask$2(function () {
          if (!done) {
            for (var j = 0; j < items.length; ++j) {
              observer.next(items[j]);
              if (done) return;
            }

            observer.complete();
          }
        });
        return function () {
          done = true;
        };
      });
    }
  });

  _hide($Observable.prototype, OBSERVABLE, function () {
    return this;
  });

  _export(_export.G, {
    Observable: $Observable
  });

  _setSpecies('Observable'); // ie9- setTimeout & setInterval additional parameters fix


  var slice = [].slice;
  var MSIE = /MSIE .\./.test(_userAgent); // <- dirty ie9- check

  var wrap$1 = function wrap$1(set) {
    return function (fn, time
    /* , ...args */
    ) {
      var boundArgs = arguments.length > 2;
      var args = boundArgs ? slice.call(arguments, 2) : false;
      return set(boundArgs ? function () {
        // eslint-disable-next-line no-new-func
        (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
      } : fn, time);
    };
  };

  _export(_export.G + _export.B + _export.F * MSIE, {
    setTimeout: wrap$1(_global.setTimeout),
    setInterval: wrap$1(_global.setInterval)
  });

  _export(_export.G + _export.B, {
    setImmediate: _task.set,
    clearImmediate: _task.clear
  });

  var ITERATOR$4 = _wks('iterator');

  var TO_STRING_TAG = _wks('toStringTag');

  var ArrayValues = _iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true,
    // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true,
    // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
    var NAME$1 = collections[i$2];
    var explicit = DOMIterables[NAME$1];
    var Collection = _global[NAME$1];
    var proto$3 = Collection && Collection.prototype;
    var key$1;

    if (proto$3) {
      if (!proto$3[ITERATOR$4]) _hide(proto$3, ITERATOR$4, ArrayValues);
      if (!proto$3[TO_STRING_TAG]) _hide(proto$3, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit) for (key$1 in es6_array_iterator) {
        if (!proto$3[key$1]) _redefine(proto$3, key$1, es6_array_iterator[key$1], true);
      }
    }
  }
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  createCommonjsModule(function (module) {
    var runtime = function (exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }

      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
      } catch (err) {
        define = function define(obj, key, value) {
          return obj[key] = value;
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return PromiseImpl.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports);

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
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

      function serializeNode(node) {
        switch (node.nodeType) {
          case 1:
            return serializeElementNode(node);

          case 3:
            return serializeTextNode(node);

          case 8:
            return serializeCommentNode(node);
        }
      }

      function serializeTextNode(node) {
        return node.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      function serializeCommentNode(node) {
        return '<!--' + node.nodeValue + '-->';
      }

      function serializeElementNode(node) {
        var output = '';
        output += '<' + node.tagName;

        if (node.hasAttributes()) {
          [].forEach.call(node.attributes, function (attrNode) {
            output += ' ' + attrNode.name + '="' + attrNode.value + '"';
          });
        }

        output += '>';

        if (node.hasChildNodes()) {
          [].forEach.call(node.childNodes, function (childNode) {
            output += serializeNode(childNode);
          });
        }

        output += '</' + node.tagName + '>';
        return output;
      }

      Object.defineProperty(SVGElement.prototype, 'innerHTML', {
        get: function get() {
          var output = '';
          [].forEach.call(this.childNodes, function (childNode) {
            output += serializeNode(childNode);
          });
          return output;
        },
        set: function set(markup) {
          while (this.firstChild) {
            this.removeChild(this.firstChild);
          }

          try {
            var dXML = new DOMParser();
            dXML.async = false;
            var sXML = '<svg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'>' + markup + '</svg>';
            var svgDocElement = dXML.parseFromString(sXML, 'text/xml').documentElement;
            [].forEach.call(svgDocElement.childNodes, function (childNode) {
              this.appendChild(this.ownerDocument.importNode(childNode, true));
            }.bind(this));
          } catch (e) {
            throw new Error('Error parsing markup string');
          }
        }
      });
      Object.defineProperty(SVGElement.prototype, 'innerSVG', {
        get: function get() {
          return this.innerHTML;
        },
        set: function set(markup) {
          this.innerHTML = markup;
        }
      });
    })();
  }
});

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('d3plus-export', ['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3plus = {}));
})(this, function (exports) {
  var _marked = /*#__PURE__*/regeneratorRuntime.mark(selection_iterator);

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = {
      exports: {}
    };
    return fn(module, module.exports), module.exports;
  }

  function commonjsRequire(target) {
    throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
  }
  /*
    html2canvas 0.5.0-beta4 <http://html2canvas.hertzen.com>
    Copyright (c) 2016 Niklas von Hertzen
  	  Released under  License
  */


  var html2canvas = createCommonjsModule(function (module, exports) {
    (function (f) {
      {
        module.exports = f();
      }
    })(function () {
      return function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof commonjsRequire == "function" && commonjsRequire;
              if (!u && a) return a(o, !0);
              if (i) return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }

            var l = n[o] = {
              exports: {}
            };
            t[o][0].call(l.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }

          return n[o].exports;
        }

        var i = typeof commonjsRequire == "function" && commonjsRequire;

        for (var o = 0; o < r.length; o++) {
          s(r[o]);
        }

        return s;
      }({
        1: [function (_dereq_, module, exports) {
          (function (global) {
            (function (root) {
              /** Detect free variables */
              var freeExports = _typeof(exports) == 'object' && exports && !exports.nodeType && exports;
              var freeModule = _typeof(module) == 'object' && module && !module.nodeType && module;
              var freeGlobal = _typeof(global) == 'object' && global;

              if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
                root = freeGlobal;
              }
              /**
               * The `punycode` object.
               * @name punycode
               * @type Object
               */


              var punycode,

              /** Highest positive signed 32-bit float value */
              maxInt = 2147483647,
                  // aka. 0x7FFFFFFF or 2^31-1

              /** Bootstring parameters */
              base = 36,
                  tMin = 1,
                  tMax = 26,
                  skew = 38,
                  damp = 700,
                  initialBias = 72,
                  initialN = 128,
                  // 0x80
              delimiter = '-',
                  // '\x2D'

              /** Regular expressions */
              regexPunycode = /^xn--/,
                  regexNonASCII = /[^\x20-\x7E]/,
                  // unprintable ASCII chars + non-ASCII chars
              regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
                  // RFC 3490 separators

              /** Error messages */
              errors = {
                'overflow': 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input'
              },

              /** Convenience shortcuts */
              baseMinusTMin = base - tMin,
                  floor = Math.floor,
                  stringFromCharCode = String.fromCharCode,

              /** Temporary variable */
              key;
              /*--------------------------------------------------------------------------*/

              /**
               * A generic error utility function.
               * @private
               * @param {String} type The error type.
               * @returns {Error} Throws a `RangeError` with the applicable error message.
               */

              function error(type) {
                throw new RangeError(errors[type]);
              }
              /**
               * A generic `Array#map` utility function.
               * @private
               * @param {Array} array The array to iterate over.
               * @param {Function} callback The function that gets called for every array
               * item.
               * @returns {Array} A new array of values returned by the callback function.
               */


              function map(array, fn) {
                var length = array.length;
                var result = [];

                while (length--) {
                  result[length] = fn(array[length]);
                }

                return result;
              }
              /**
               * A simple `Array#map`-like wrapper to work with domain name strings or email
               * addresses.
               * @private
               * @param {String} domain The domain name or email address.
               * @param {Function} callback The function that gets called for every
               * character.
               * @returns {Array} A new string of characters returned by the callback
               * function.
               */


              function mapDomain(string, fn) {
                var parts = string.split('@');
                var result = '';

                if (parts.length > 1) {
                  // In email addresses, only the domain name should be punycoded. Leave
                  // the local part (i.e. everything up to `@`) intact.
                  result = parts[0] + '@';
                  string = parts[1];
                } // Avoid `split(regex)` for IE8 compatibility. See #17.


                string = string.replace(regexSeparators, '\x2E');
                var labels = string.split('.');
                var encoded = map(labels, fn).join('.');
                return result + encoded;
              }
              /**
               * Creates an array containing the numeric code points of each Unicode
               * character in the string. While JavaScript uses UCS-2 internally,
               * this function will convert a pair of surrogate halves (each of which
               * UCS-2 exposes as separate characters) into a single code point,
               * matching UTF-16.
               * @see `punycode.ucs2.encode`
               * @see <https://mathiasbynens.be/notes/javascript-encoding>
               * @memberOf punycode.ucs2
               * @name decode
               * @param {String} string The Unicode input string (UCS-2).
               * @returns {Array} The new array of code points.
               */


              function ucs2decode(string) {
                var output = [],
                    counter = 0,
                    length = string.length,
                    value,
                    extra;

                while (counter < length) {
                  value = string.charCodeAt(counter++);

                  if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                    // high surrogate, and there is a next character
                    extra = string.charCodeAt(counter++);

                    if ((extra & 0xFC00) == 0xDC00) {
                      // low surrogate
                      output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                    } else {
                      // unmatched surrogate; only append this code unit, in case the next
                      // code unit is the high surrogate of a surrogate pair
                      output.push(value);
                      counter--;
                    }
                  } else {
                    output.push(value);
                  }
                }

                return output;
              }
              /**
               * Creates a string based on an array of numeric code points.
               * @see `punycode.ucs2.decode`
               * @memberOf punycode.ucs2
               * @name encode
               * @param {Array} codePoints The array of numeric code points.
               * @returns {String} The new Unicode string (UCS-2).
               */


              function ucs2encode(array) {
                return map(array, function (value) {
                  var output = '';

                  if (value > 0xFFFF) {
                    value -= 0x10000;
                    output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                    value = 0xDC00 | value & 0x3FF;
                  }

                  output += stringFromCharCode(value);
                  return output;
                }).join('');
              }
              /**
               * Converts a basic code point into a digit/integer.
               * @see `digitToBasic()`
               * @private
               * @param {Number} codePoint The basic numeric code point value.
               * @returns {Number} The numeric value of a basic code point (for use in
               * representing integers) in the range `0` to `base - 1`, or `base` if
               * the code point does not represent a value.
               */


              function basicToDigit(codePoint) {
                if (codePoint - 48 < 10) {
                  return codePoint - 22;
                }

                if (codePoint - 65 < 26) {
                  return codePoint - 65;
                }

                if (codePoint - 97 < 26) {
                  return codePoint - 97;
                }

                return base;
              }
              /**
               * Converts a digit/integer into a basic code point.
               * @see `basicToDigit()`
               * @private
               * @param {Number} digit The numeric value of a basic code point.
               * @returns {Number} The basic code point whose value (when used for
               * representing integers) is `digit`, which needs to be in the range
               * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
               * used; else, the lowercase form is used. The behavior is undefined
               * if `flag` is non-zero and `digit` has no uppercase form.
               */


              function digitToBasic(digit, flag) {
                //  0..25 map to ASCII a..z or A..Z
                // 26..35 map to ASCII 0..9
                return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
              }
              /**
               * Bias adaptation function as per section 3.4 of RFC 3492.
               * https://tools.ietf.org/html/rfc3492#section-3.4
               * @private
               */


              function adapt(delta, numPoints, firstTime) {
                var k = 0;
                delta = firstTime ? floor(delta / damp) : delta >> 1;
                delta += floor(delta / numPoints);

                for (;
                /* no initialization */
                delta > baseMinusTMin * tMax >> 1; k += base) {
                  delta = floor(delta / baseMinusTMin);
                }

                return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
              }
              /**
               * Converts a Punycode string of ASCII-only symbols to a string of Unicode
               * symbols.
               * @memberOf punycode
               * @param {String} input The Punycode string of ASCII-only symbols.
               * @returns {String} The resulting string of Unicode symbols.
               */


              function decode(input) {
                // Don't use UCS-2
                var output = [],
                    inputLength = input.length,
                    out,
                    i = 0,
                    n = initialN,
                    bias = initialBias,
                    basic,
                    j,
                    index,
                    oldi,
                    w,
                    k,
                    digit,
                    t,

                /** Cached calculation results */
                baseMinusT; // Handle the basic code points: let `basic` be the number of input code
                // points before the last delimiter, or `0` if there is none, then copy
                // the first basic code points to the output.

                basic = input.lastIndexOf(delimiter);

                if (basic < 0) {
                  basic = 0;
                }

                for (j = 0; j < basic; ++j) {
                  // if it's not a basic code point
                  if (input.charCodeAt(j) >= 0x80) {
                    error('not-basic');
                  }

                  output.push(input.charCodeAt(j));
                } // Main decoding loop: start just after the last delimiter if any basic code
                // points were copied; start at the beginning otherwise.


                for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
                /* no final expression */
                {
                  // `index` is the index of the next character to be consumed.
                  // Decode a generalized variable-length integer into `delta`,
                  // which gets added to `i`. The overflow checking is easier
                  // if we increase `i` as we go, then subtract off its starting
                  // value at the end to obtain `delta`.
                  for (oldi = i, w = 1, k = base;;
                  /* no condition */
                  k += base) {
                    if (index >= inputLength) {
                      error('invalid-input');
                    }

                    digit = basicToDigit(input.charCodeAt(index++));

                    if (digit >= base || digit > floor((maxInt - i) / w)) {
                      error('overflow');
                    }

                    i += digit * w;
                    t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                    if (digit < t) {
                      break;
                    }

                    baseMinusT = base - t;

                    if (w > floor(maxInt / baseMinusT)) {
                      error('overflow');
                    }

                    w *= baseMinusT;
                  }

                  out = output.length + 1;
                  bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
                  // incrementing `n` each time, so we'll fix that now:

                  if (floor(i / out) > maxInt - n) {
                    error('overflow');
                  }

                  n += floor(i / out);
                  i %= out; // Insert `n` at position `i` of the output

                  output.splice(i++, 0, n);
                }

                return ucs2encode(output);
              }
              /**
               * Converts a string of Unicode symbols (e.g. a domain name label) to a
               * Punycode string of ASCII-only symbols.
               * @memberOf punycode
               * @param {String} input The string of Unicode symbols.
               * @returns {String} The resulting Punycode string of ASCII-only symbols.
               */


              function encode(input) {
                var n,
                    delta,
                    handledCPCount,
                    basicLength,
                    bias,
                    j,
                    m,
                    q,
                    k,
                    t,
                    currentValue,
                    output = [],

                /** `inputLength` will hold the number of code points in `input`. */
                inputLength,

                /** Cached calculation results */
                handledCPCountPlusOne,
                    baseMinusT,
                    qMinusT; // Convert the input in UCS-2 to Unicode

                input = ucs2decode(input); // Cache the length

                inputLength = input.length; // Initialize the state

                n = initialN;
                delta = 0;
                bias = initialBias; // Handle the basic code points

                for (j = 0; j < inputLength; ++j) {
                  currentValue = input[j];

                  if (currentValue < 0x80) {
                    output.push(stringFromCharCode(currentValue));
                  }
                }

                handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
                // `basicLength` is the number of basic code points.
                // Finish the basic string - if it is not empty - with a delimiter

                if (basicLength) {
                  output.push(delimiter);
                } // Main encoding loop:


                while (handledCPCount < inputLength) {
                  // All non-basic code points < n have been handled already. Find the next
                  // larger one:
                  for (m = maxInt, j = 0; j < inputLength; ++j) {
                    currentValue = input[j];

                    if (currentValue >= n && currentValue < m) {
                      m = currentValue;
                    }
                  } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                  // but guard against overflow


                  handledCPCountPlusOne = handledCPCount + 1;

                  if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                    error('overflow');
                  }

                  delta += (m - n) * handledCPCountPlusOne;
                  n = m;

                  for (j = 0; j < inputLength; ++j) {
                    currentValue = input[j];

                    if (currentValue < n && ++delta > maxInt) {
                      error('overflow');
                    }

                    if (currentValue == n) {
                      // Represent delta as a generalized variable-length integer
                      for (q = delta, k = base;;
                      /* no condition */
                      k += base) {
                        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

                        if (q < t) {
                          break;
                        }

                        qMinusT = q - t;
                        baseMinusT = base - t;
                        output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                        q = floor(qMinusT / baseMinusT);
                      }

                      output.push(stringFromCharCode(digitToBasic(q, 0)));
                      bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                      delta = 0;
                      ++handledCPCount;
                    }
                  }

                  ++delta;
                  ++n;
                }

                return output.join('');
              }
              /**
               * Converts a Punycode string representing a domain name or an email address
               * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
               * it doesn't matter if you call it on a string that has already been
               * converted to Unicode.
               * @memberOf punycode
               * @param {String} input The Punycoded domain name or email address to
               * convert to Unicode.
               * @returns {String} The Unicode representation of the given Punycode
               * string.
               */


              function toUnicode(input) {
                return mapDomain(input, function (string) {
                  return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                });
              }
              /**
               * Converts a Unicode string representing a domain name or an email address to
               * Punycode. Only the non-ASCII parts of the domain name will be converted,
               * i.e. it doesn't matter if you call it with a domain that's already in
               * ASCII.
               * @memberOf punycode
               * @param {String} input The domain name or email address to convert, as a
               * Unicode string.
               * @returns {String} The Punycode representation of the given domain name or
               * email address.
               */


              function toASCII(input) {
                return mapDomain(input, function (string) {
                  return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
                });
              }
              /*--------------------------------------------------------------------------*/

              /** Define the public API */


              punycode = {
                /**
                 * A string representing the current Punycode.js version number.
                 * @memberOf punycode
                 * @type String
                 */
                'version': '1.3.2',

                /**
                 * An object of methods to convert from JavaScript's internal character
                 * representation (UCS-2) to Unicode code points, and back.
                 * @see <https://mathiasbynens.be/notes/javascript-encoding>
                 * @memberOf punycode
                 * @type Object
                 */
                'ucs2': {
                  'decode': ucs2decode,
                  'encode': ucs2encode
                },
                'decode': decode,
                'encode': encode,
                'toASCII': toASCII,
                'toUnicode': toUnicode
              };
              /** Expose `punycode` */
              // Some AMD build optimizers, like r.js, check for specific condition patterns
              // like the following:

              if (freeExports && freeModule) {
                if (module.exports == freeExports) {
                  // in Node.js, io.js, or RingoJS v0.8.0+
                  freeModule.exports = punycode;
                } else {
                  // in Narwhal or RingoJS v0.7.0-
                  for (key in punycode) {
                    punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                  }
                }
              } else {
                // in Rhino or a web browser
                root.punycode = punycode;
              }
            })(this);
          }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}],
        2: [function (_dereq_, module, exports) {
          var log = _dereq_('./log');

          function restoreOwnerScroll(ownerDocument, x, y) {
            if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
              ownerDocument.defaultView.scrollTo(x, y);
            }
          }

          function cloneCanvasContents(canvas, clonedCanvas) {
            try {
              if (clonedCanvas) {
                clonedCanvas.width = canvas.width;
                clonedCanvas.height = canvas.height;
                clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
              }
            } catch (e) {
              log("Unable to copy canvas content from", canvas, e);
            }
          }

          function cloneNode(node, javascriptEnabled) {
            var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);
            var child = node.firstChild;

            while (child) {
              if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
                clone.appendChild(cloneNode(child, javascriptEnabled));
              }

              child = child.nextSibling;
            }

            if (node.nodeType === 1) {
              clone._scrollTop = node.scrollTop;
              clone._scrollLeft = node.scrollLeft;

              if (node.nodeName === "CANVAS") {
                cloneCanvasContents(node, clone);
              } else if (node.nodeName === "TEXTAREA" || node.nodeName === "SELECT") {
                clone.value = node.value;
              }
            }

            return clone;
          }

          function initNode(node) {
            if (node.nodeType === 1) {
              node.scrollTop = node._scrollTop;
              node.scrollLeft = node._scrollLeft;
              var child = node.firstChild;

              while (child) {
                initNode(child);
                child = child.nextSibling;
              }
            }
          }

          module.exports = function (ownerDocument, containerDocument, width, height, options, x, y) {
            var documentElement = cloneNode(ownerDocument.documentElement, options.javascriptEnabled);
            var container = containerDocument.createElement("iframe");
            container.className = "html2canvas-container";
            container.style.visibility = "hidden";
            container.style.position = "fixed";
            container.style.left = "-10000px";
            container.style.top = "0px";
            container.style.border = "0";
            container.width = width;
            container.height = height;
            container.scrolling = "no"; // ios won't scroll without it

            containerDocument.body.appendChild(container);
            return new Promise(function (resolve) {
              var documentClone = container.contentWindow.document;
              /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
               if window url is about:blank, we can assign the url to current by writing onto the document
               */

              container.contentWindow.onload = container.onload = function () {
                var interval = setInterval(function () {
                  if (documentClone.body.childNodes.length > 0) {
                    initNode(documentClone.documentElement);
                    clearInterval(interval);

                    if (options.type === "view") {
                      container.contentWindow.scrollTo(x, y);

                      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (container.contentWindow.scrollY !== y || container.contentWindow.scrollX !== x)) {
                        documentClone.documentElement.style.top = -y + "px";
                        documentClone.documentElement.style.left = -x + "px";
                        documentClone.documentElement.style.position = 'absolute';
                      }
                    }

                    resolve(container);
                  }
                }, 50);
              };

              documentClone.open();
              documentClone.write("<!DOCTYPE html><html></html>"); // Chrome scrolls the parent document for some reason after the write to the cloned window???

              restoreOwnerScroll(ownerDocument, x, y);
              documentClone.replaceChild(documentClone.adoptNode(documentElement), documentClone.documentElement);
              documentClone.close();
            });
          };
        }, {
          "./log": 13
        }],
        3: [function (_dereq_, module, exports) {
          // http://dev.w3.org/csswg/css-color/
          function Color(value) {
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = null;
            this.fromArray(value) || this.namedColor(value) || this.rgb(value) || this.rgba(value) || this.hex6(value) || this.hex3(value);
          }

          Color.prototype.darken = function (amount) {
            var a = 1 - amount;
            return new Color([Math.round(this.r * a), Math.round(this.g * a), Math.round(this.b * a), this.a]);
          };

          Color.prototype.isTransparent = function () {
            return this.a === 0;
          };

          Color.prototype.isBlack = function () {
            return this.r === 0 && this.g === 0 && this.b === 0;
          };

          Color.prototype.fromArray = function (array) {
            if (Array.isArray(array)) {
              this.r = Math.min(array[0], 255);
              this.g = Math.min(array[1], 255);
              this.b = Math.min(array[2], 255);

              if (array.length > 3) {
                this.a = array[3];
              }
            }

            return Array.isArray(array);
          };

          var _hex3 = /^#([a-f0-9]{3})$/i;

          Color.prototype.hex3 = function (value) {
            var match = null;

            if ((match = value.match(_hex3)) !== null) {
              this.r = parseInt(match[1][0] + match[1][0], 16);
              this.g = parseInt(match[1][1] + match[1][1], 16);
              this.b = parseInt(match[1][2] + match[1][2], 16);
            }

            return match !== null;
          };

          var _hex6 = /^#([a-f0-9]{6})$/i;

          Color.prototype.hex6 = function (value) {
            var match = null;

            if ((match = value.match(_hex6)) !== null) {
              this.r = parseInt(match[1].substring(0, 2), 16);
              this.g = parseInt(match[1].substring(2, 4), 16);
              this.b = parseInt(match[1].substring(4, 6), 16);
            }

            return match !== null;
          };

          var _rgb = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

          Color.prototype.rgb = function (value) {
            var match = null;

            if ((match = value.match(_rgb)) !== null) {
              this.r = Number(match[1]);
              this.g = Number(match[2]);
              this.b = Number(match[3]);
            }

            return match !== null;
          };

          var _rgba = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;

          Color.prototype.rgba = function (value) {
            var match = null;

            if ((match = value.match(_rgba)) !== null) {
              this.r = Number(match[1]);
              this.g = Number(match[2]);
              this.b = Number(match[3]);
              this.a = Number(match[4]);
            }

            return match !== null;
          };

          Color.prototype.toString = function () {
            return this.a !== null && this.a !== 1 ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")";
          };

          Color.prototype.namedColor = function (value) {
            value = value.toLowerCase();
            var color = colors[value];

            if (color) {
              this.r = color[0];
              this.g = color[1];
              this.b = color[2];
            } else if (value === "transparent") {
              this.r = this.g = this.b = this.a = 0;
              return true;
            }

            return !!color;
          };

          Color.prototype.isColor = true; // JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))

          var colors = {
            "aliceblue": [240, 248, 255],
            "antiquewhite": [250, 235, 215],
            "aqua": [0, 255, 255],
            "aquamarine": [127, 255, 212],
            "azure": [240, 255, 255],
            "beige": [245, 245, 220],
            "bisque": [255, 228, 196],
            "black": [0, 0, 0],
            "blanchedalmond": [255, 235, 205],
            "blue": [0, 0, 255],
            "blueviolet": [138, 43, 226],
            "brown": [165, 42, 42],
            "burlywood": [222, 184, 135],
            "cadetblue": [95, 158, 160],
            "chartreuse": [127, 255, 0],
            "chocolate": [210, 105, 30],
            "coral": [255, 127, 80],
            "cornflowerblue": [100, 149, 237],
            "cornsilk": [255, 248, 220],
            "crimson": [220, 20, 60],
            "cyan": [0, 255, 255],
            "darkblue": [0, 0, 139],
            "darkcyan": [0, 139, 139],
            "darkgoldenrod": [184, 134, 11],
            "darkgray": [169, 169, 169],
            "darkgreen": [0, 100, 0],
            "darkgrey": [169, 169, 169],
            "darkkhaki": [189, 183, 107],
            "darkmagenta": [139, 0, 139],
            "darkolivegreen": [85, 107, 47],
            "darkorange": [255, 140, 0],
            "darkorchid": [153, 50, 204],
            "darkred": [139, 0, 0],
            "darksalmon": [233, 150, 122],
            "darkseagreen": [143, 188, 143],
            "darkslateblue": [72, 61, 139],
            "darkslategray": [47, 79, 79],
            "darkslategrey": [47, 79, 79],
            "darkturquoise": [0, 206, 209],
            "darkviolet": [148, 0, 211],
            "deeppink": [255, 20, 147],
            "deepskyblue": [0, 191, 255],
            "dimgray": [105, 105, 105],
            "dimgrey": [105, 105, 105],
            "dodgerblue": [30, 144, 255],
            "firebrick": [178, 34, 34],
            "floralwhite": [255, 250, 240],
            "forestgreen": [34, 139, 34],
            "fuchsia": [255, 0, 255],
            "gainsboro": [220, 220, 220],
            "ghostwhite": [248, 248, 255],
            "gold": [255, 215, 0],
            "goldenrod": [218, 165, 32],
            "gray": [128, 128, 128],
            "green": [0, 128, 0],
            "greenyellow": [173, 255, 47],
            "grey": [128, 128, 128],
            "honeydew": [240, 255, 240],
            "hotpink": [255, 105, 180],
            "indianred": [205, 92, 92],
            "indigo": [75, 0, 130],
            "ivory": [255, 255, 240],
            "khaki": [240, 230, 140],
            "lavender": [230, 230, 250],
            "lavenderblush": [255, 240, 245],
            "lawngreen": [124, 252, 0],
            "lemonchiffon": [255, 250, 205],
            "lightblue": [173, 216, 230],
            "lightcoral": [240, 128, 128],
            "lightcyan": [224, 255, 255],
            "lightgoldenrodyellow": [250, 250, 210],
            "lightgray": [211, 211, 211],
            "lightgreen": [144, 238, 144],
            "lightgrey": [211, 211, 211],
            "lightpink": [255, 182, 193],
            "lightsalmon": [255, 160, 122],
            "lightseagreen": [32, 178, 170],
            "lightskyblue": [135, 206, 250],
            "lightslategray": [119, 136, 153],
            "lightslategrey": [119, 136, 153],
            "lightsteelblue": [176, 196, 222],
            "lightyellow": [255, 255, 224],
            "lime": [0, 255, 0],
            "limegreen": [50, 205, 50],
            "linen": [250, 240, 230],
            "magenta": [255, 0, 255],
            "maroon": [128, 0, 0],
            "mediumaquamarine": [102, 205, 170],
            "mediumblue": [0, 0, 205],
            "mediumorchid": [186, 85, 211],
            "mediumpurple": [147, 112, 219],
            "mediumseagreen": [60, 179, 113],
            "mediumslateblue": [123, 104, 238],
            "mediumspringgreen": [0, 250, 154],
            "mediumturquoise": [72, 209, 204],
            "mediumvioletred": [199, 21, 133],
            "midnightblue": [25, 25, 112],
            "mintcream": [245, 255, 250],
            "mistyrose": [255, 228, 225],
            "moccasin": [255, 228, 181],
            "navajowhite": [255, 222, 173],
            "navy": [0, 0, 128],
            "oldlace": [253, 245, 230],
            "olive": [128, 128, 0],
            "olivedrab": [107, 142, 35],
            "orange": [255, 165, 0],
            "orangered": [255, 69, 0],
            "orchid": [218, 112, 214],
            "palegoldenrod": [238, 232, 170],
            "palegreen": [152, 251, 152],
            "paleturquoise": [175, 238, 238],
            "palevioletred": [219, 112, 147],
            "papayawhip": [255, 239, 213],
            "peachpuff": [255, 218, 185],
            "peru": [205, 133, 63],
            "pink": [255, 192, 203],
            "plum": [221, 160, 221],
            "powderblue": [176, 224, 230],
            "purple": [128, 0, 128],
            "rebeccapurple": [102, 51, 153],
            "red": [255, 0, 0],
            "rosybrown": [188, 143, 143],
            "royalblue": [65, 105, 225],
            "saddlebrown": [139, 69, 19],
            "salmon": [250, 128, 114],
            "sandybrown": [244, 164, 96],
            "seagreen": [46, 139, 87],
            "seashell": [255, 245, 238],
            "sienna": [160, 82, 45],
            "silver": [192, 192, 192],
            "skyblue": [135, 206, 235],
            "slateblue": [106, 90, 205],
            "slategray": [112, 128, 144],
            "slategrey": [112, 128, 144],
            "snow": [255, 250, 250],
            "springgreen": [0, 255, 127],
            "steelblue": [70, 130, 180],
            "tan": [210, 180, 140],
            "teal": [0, 128, 128],
            "thistle": [216, 191, 216],
            "tomato": [255, 99, 71],
            "turquoise": [64, 224, 208],
            "violet": [238, 130, 238],
            "wheat": [245, 222, 179],
            "white": [255, 255, 255],
            "whitesmoke": [245, 245, 245],
            "yellow": [255, 255, 0],
            "yellowgreen": [154, 205, 50]
          };
          module.exports = Color;
        }, {}],
        4: [function (_dereq_, module, exports) {
          var Support = _dereq_('./support');

          var CanvasRenderer = _dereq_('./renderers/canvas');

          var ImageLoader = _dereq_('./imageloader');

          var NodeParser = _dereq_('./nodeparser');

          var NodeContainer = _dereq_('./nodecontainer');

          var log = _dereq_('./log');

          var utils = _dereq_('./utils');

          var createWindowClone = _dereq_('./clone');

          var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

          var getBounds = utils.getBounds;
          var html2canvasNodeAttribute = "data-html2canvas-node";
          var html2canvasCloneIndex = 0;

          function html2canvas(nodeList, options) {
            var index = html2canvasCloneIndex++;
            options = options || {};

            if (options.logging) {
              log.options.logging = true;
              log.options.start = Date.now();
            }

            options.async = typeof options.async === "undefined" ? true : options.async;
            options.allowTaint = typeof options.allowTaint === "undefined" ? false : options.allowTaint;
            options.removeContainer = typeof options.removeContainer === "undefined" ? true : options.removeContainer;
            options.javascriptEnabled = typeof options.javascriptEnabled === "undefined" ? false : options.javascriptEnabled;
            options.imageTimeout = typeof options.imageTimeout === "undefined" ? 10000 : options.imageTimeout;
            options.renderer = typeof options.renderer === "function" ? options.renderer : CanvasRenderer;
            options.strict = !!options.strict;

            if (typeof nodeList === "string") {
              if (typeof options.proxy !== "string") {
                return Promise.reject("Proxy must be used when rendering url");
              }

              var width = options.width != null ? options.width : window.innerWidth;
              var height = options.height != null ? options.height : window.innerHeight;
              return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function (container) {
                return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
              });
            }

            var node = (nodeList === undefined ? [document.documentElement] : nodeList.length ? nodeList : [nodeList])[0];
            node.setAttribute(html2canvasNodeAttribute + index, index);
            return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function (canvas) {
              if (typeof options.onrendered === "function") {
                log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
                options.onrendered(canvas);
              }

              return canvas;
            });
          }

          html2canvas.CanvasRenderer = CanvasRenderer;
          html2canvas.NodeContainer = NodeContainer;
          html2canvas.log = log;
          html2canvas.utils = utils;
          var html2canvasExport = typeof document === "undefined" || typeof Object.create !== "function" || typeof document.createElement("canvas").getContext !== "function" ? function () {
            return Promise.reject("No canvas support");
          } : html2canvas;
          module.exports = html2canvasExport;

          function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
            return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function (container) {
              log("Document cloned");
              var attributeName = html2canvasNodeAttribute + html2canvasIndex;
              var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
              document.querySelector(selector).removeAttribute(attributeName);
              var clonedWindow = container.contentWindow;
              var node = clonedWindow.document.querySelector(selector);
              var oncloneHandler = typeof options.onclone === "function" ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
              return oncloneHandler.then(function () {
                return renderWindow(node, container, options, windowWidth, windowHeight);
              });
            });
          }

          function renderWindow(node, container, options, windowWidth, windowHeight) {
            var clonedWindow = container.contentWindow;
            var support = new Support(clonedWindow.document);
            var imageLoader = new ImageLoader(options, support);
            var bounds = getBounds(node);
            var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
            var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
            var renderer = new options.renderer(width, height, imageLoader, options, document);
            var parser = new NodeParser(node, renderer, support, imageLoader, options);
            return parser.ready.then(function () {
              log("Finished rendering");
              var canvas;

              if (options.type === "view") {
                canvas = crop(renderer.canvas, {
                  width: renderer.canvas.width,
                  height: renderer.canvas.height,
                  top: 0,
                  left: 0,
                  x: 0,
                  y: 0
                });
              } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
                canvas = renderer.canvas;
              } else {
                canvas = crop(renderer.canvas, {
                  width: options.width != null ? options.width : bounds.width,
                  height: options.height != null ? options.height : bounds.height,
                  top: bounds.top,
                  left: bounds.left,
                  x: 0,
                  y: 0
                });
              }

              cleanupContainer(container, options);
              return canvas;
            });
          }

          function cleanupContainer(container, options) {
            if (options.removeContainer) {
              container.parentNode.removeChild(container);
              log("Cleaned up container");
            }
          }

          function crop(canvas, bounds) {
            var croppedCanvas = document.createElement("canvas");
            var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
            var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
            var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
            var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
            croppedCanvas.width = bounds.width;
            croppedCanvas.height = bounds.height;
            var width = x2 - x1;
            var height = y2 - y1;
            log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", width, "height:", height);
            log("Resulting crop with width", bounds.width, "and height", bounds.height, "with x", x1, "and y", y1);
            croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, bounds.x, bounds.y, width, height);
            return croppedCanvas;
          }

          function documentWidth(doc) {
            return Math.max(Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth), Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth), Math.max(doc.body.clientWidth, doc.documentElement.clientWidth));
          }

          function documentHeight(doc) {
            return Math.max(Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight), Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight), Math.max(doc.body.clientHeight, doc.documentElement.clientHeight));
          }

          function absoluteUrl(url) {
            var link = document.createElement("a");
            link.href = url;
            link.href = link.href;
            return link;
          }
        }, {
          "./clone": 2,
          "./imageloader": 11,
          "./log": 13,
          "./nodecontainer": 14,
          "./nodeparser": 15,
          "./proxy": 16,
          "./renderers/canvas": 20,
          "./support": 22,
          "./utils": 26
        }],
        5: [function (_dereq_, module, exports) {
          var log = _dereq_('./log');

          var smallImage = _dereq_('./utils').smallImage;

          function DummyImageContainer(src) {
            this.src = src;
            log("DummyImageContainer for", src);

            if (!this.promise || !this.image) {
              log("Initiating DummyImageContainer");
              DummyImageContainer.prototype.image = new Image();
              var image = this.image;
              DummyImageContainer.prototype.promise = new Promise(function (resolve, reject) {
                image.onload = resolve;
                image.onerror = reject;
                image.src = smallImage();

                if (image.complete === true) {
                  resolve(image);
                }
              });
            }
          }

          module.exports = DummyImageContainer;
        }, {
          "./log": 13,
          "./utils": 26
        }],
        6: [function (_dereq_, module, exports) {
          var smallImage = _dereq_('./utils').smallImage;

          function Font(family, size) {
            var container = document.createElement('div'),
                img = document.createElement('img'),
                span = document.createElement('span'),
                sampleText = 'Hidden Text',
                baseline,
                middle;
            container.style.visibility = "hidden";
            container.style.fontFamily = family;
            container.style.fontSize = size;
            container.style.margin = 0;
            container.style.padding = 0;
            document.body.appendChild(container);
            img.src = smallImage();
            img.width = 1;
            img.height = 1;
            img.style.margin = 0;
            img.style.padding = 0;
            img.style.verticalAlign = "baseline";
            span.style.fontFamily = family;
            span.style.fontSize = size;
            span.style.margin = 0;
            span.style.padding = 0;
            span.appendChild(document.createTextNode(sampleText));
            container.appendChild(span);
            container.appendChild(img);
            baseline = img.offsetTop - span.offsetTop + 1;
            container.removeChild(span);
            container.appendChild(document.createTextNode(sampleText));
            container.style.lineHeight = "normal";
            img.style.verticalAlign = "super";
            middle = img.offsetTop - container.offsetTop + 1;
            document.body.removeChild(container);
            this.baseline = baseline;
            this.lineWidth = 1;
            this.middle = middle;
          }

          module.exports = Font;
        }, {
          "./utils": 26
        }],
        7: [function (_dereq_, module, exports) {
          var Font = _dereq_('./font');

          function FontMetrics() {
            this.data = {};
          }

          FontMetrics.prototype.getMetrics = function (family, size) {
            if (this.data[family + "-" + size] === undefined) {
              this.data[family + "-" + size] = new Font(family, size);
            }

            return this.data[family + "-" + size];
          };

          module.exports = FontMetrics;
        }, {
          "./font": 6
        }],
        8: [function (_dereq_, module, exports) {
          var utils = _dereq_('./utils');

          var getBounds = utils.getBounds;

          var loadUrlDocument = _dereq_('./proxy').loadUrlDocument;

          function FrameContainer(container, sameOrigin, options) {
            this.image = null;
            this.src = container;
            var self = this;
            var bounds = getBounds(container);
            this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function (resolve) {
              if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
                container.contentWindow.onload = container.onload = function () {
                  resolve(container);
                };
              } else {
                resolve(container);
              }
            })).then(function (container) {
              var html2canvas = _dereq_('./core');

              return html2canvas(container.contentWindow.document.documentElement, {
                type: 'view',
                width: container.width,
                height: container.height,
                proxy: options.proxy,
                javascriptEnabled: options.javascriptEnabled,
                removeContainer: options.removeContainer,
                allowTaint: options.allowTaint,
                imageTimeout: options.imageTimeout / 2
              });
            }).then(function (canvas) {
              return self.image = canvas;
            });
          }

          FrameContainer.prototype.proxyLoad = function (proxy, bounds, options) {
            var container = this.src;
            return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
          };

          module.exports = FrameContainer;
        }, {
          "./core": 4,
          "./proxy": 16,
          "./utils": 26
        }],
        9: [function (_dereq_, module, exports) {
          function GradientContainer(imageData) {
            this.src = imageData.value;
            this.colorStops = [];
            this.type = null;
            this.x0 = 0.5;
            this.y0 = 0.5;
            this.x1 = 0.5;
            this.y1 = 0.5;
            this.promise = Promise.resolve(true);
          }

          GradientContainer.TYPES = {
            LINEAR: 1,
            RADIAL: 2
          }; // TODO: support hsl[a], negative %/length values
          // TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )

          GradientContainer.REGEXP_COLORSTOP = /^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i;
          module.exports = GradientContainer;
        }, {}],
        10: [function (_dereq_, module, exports) {
          function ImageContainer(src, cors) {
            this.src = src;
            this.image = new Image();
            var self = this;
            this.tainted = null;
            this.promise = new Promise(function (resolve, reject) {
              self.image.onload = resolve;
              self.image.onerror = reject;

              if (cors) {
                self.image.crossOrigin = "anonymous";
              }

              self.image.src = src;

              if (self.image.complete === true) {
                resolve(self.image);
              }
            });
          }

          module.exports = ImageContainer;
        }, {}],
        11: [function (_dereq_, module, exports) {
          var log = _dereq_('./log');

          var ImageContainer = _dereq_('./imagecontainer');

          var DummyImageContainer = _dereq_('./dummyimagecontainer');

          var ProxyImageContainer = _dereq_('./proxyimagecontainer');

          var FrameContainer = _dereq_('./framecontainer');

          var SVGContainer = _dereq_('./svgcontainer');

          var SVGNodeContainer = _dereq_('./svgnodecontainer');

          var LinearGradientContainer = _dereq_('./lineargradientcontainer');

          var WebkitGradientContainer = _dereq_('./webkitgradientcontainer');

          var bind = _dereq_('./utils').bind;

          function ImageLoader(options, support) {
            this.link = null;
            this.options = options;
            this.support = support;
            this.origin = this.getOrigin(window.location.href);
          }

          ImageLoader.prototype.findImages = function (nodes) {
            var images = [];
            nodes.reduce(function (imageNodes, container) {
              switch (container.node.nodeName) {
                case "IMG":
                  return imageNodes.concat([{
                    args: [container.node.src],
                    method: "url"
                  }]);

                case "svg":
                case "IFRAME":
                  return imageNodes.concat([{
                    args: [container.node],
                    method: container.node.nodeName
                  }]);
              }

              return imageNodes;
            }, []).forEach(this.addImage(images, this.loadImage), this);
            return images;
          };

          ImageLoader.prototype.findBackgroundImage = function (images, container) {
            container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
            return images;
          };

          ImageLoader.prototype.addImage = function (images, callback) {
            return function (newImage) {
              newImage.args.forEach(function (image) {
                if (!this.imageExists(images, image)) {
                  images.splice(0, 0, callback.call(this, newImage));
                  log('Added image #' + images.length, typeof image === "string" ? image.substring(0, 100) : image);
                }
              }, this);
            };
          };

          ImageLoader.prototype.hasImageBackground = function (imageData) {
            return imageData.method !== "none";
          };

          ImageLoader.prototype.loadImage = function (imageData) {
            if (imageData.method === "url") {
              var src = imageData.args[0];

              if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
                return new SVGContainer(src);
              } else if (src.match(/data:image\/.*;base64,/i)) {
                return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
              } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
                return new ImageContainer(src, false);
              } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
                return new ImageContainer(src, true);
              } else if (this.options.proxy) {
                return new ProxyImageContainer(src, this.options.proxy);
              } else {
                return new DummyImageContainer(src);
              }
            } else if (imageData.method === "linear-gradient") {
              return new LinearGradientContainer(imageData);
            } else if (imageData.method === "gradient") {
              return new WebkitGradientContainer(imageData);
            } else if (imageData.method === "svg") {
              return new SVGNodeContainer(imageData.args[0], this.support.svg);
            } else if (imageData.method === "IFRAME") {
              return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
            } else {
              return new DummyImageContainer(imageData);
            }
          };

          ImageLoader.prototype.isSVG = function (src) {
            return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
          };

          ImageLoader.prototype.imageExists = function (images, src) {
            return images.some(function (image) {
              return image.src === src;
            });
          };

          ImageLoader.prototype.isSameOrigin = function (url) {
            return this.getOrigin(url) === this.origin;
          };

          ImageLoader.prototype.getOrigin = function (url) {
            var link = this.link || (this.link = document.createElement("a"));
            link.href = url;
            link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/

            return link.protocol + link.hostname + link.port;
          };

          ImageLoader.prototype.getPromise = function (container) {
            return this.timeout(container, this.options.imageTimeout)['catch'](function () {
              var dummy = new DummyImageContainer(container.src);
              return dummy.promise.then(function (image) {
                container.image = image;
              });
            });
          };

          ImageLoader.prototype.get = function (src) {
            var found = null;
            return this.images.some(function (img) {
              return (found = img).src === src;
            }) ? found : null;
          };

          ImageLoader.prototype.fetch = function (nodes) {
            this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
            this.images.forEach(function (image, index) {
              image.promise.then(function () {
                log("Succesfully loaded image #" + (index + 1), image);
              }, function (e) {
                log("Failed loading image #" + (index + 1), image, e);
              });
            });
            this.ready = Promise.all(this.images.map(this.getPromise, this));
            log("Finished searching images");
            return this;
          };

          ImageLoader.prototype.timeout = function (container, timeout) {
            var timer;
            var promise = Promise.race([container.promise, new Promise(function (res, reject) {
              timer = setTimeout(function () {
                log("Timed out loading image", container);
                reject(container);
              }, timeout);
            })]).then(function (container) {
              clearTimeout(timer);
              return container;
            });
            promise['catch'](function () {
              clearTimeout(timer);
            });
            return promise;
          };

          module.exports = ImageLoader;
        }, {
          "./dummyimagecontainer": 5,
          "./framecontainer": 8,
          "./imagecontainer": 10,
          "./lineargradientcontainer": 12,
          "./log": 13,
          "./proxyimagecontainer": 17,
          "./svgcontainer": 23,
          "./svgnodecontainer": 24,
          "./utils": 26,
          "./webkitgradientcontainer": 27
        }],
        12: [function (_dereq_, module, exports) {
          var GradientContainer = _dereq_('./gradientcontainer');

          var Color = _dereq_('./color');

          function LinearGradientContainer(imageData) {
            GradientContainer.apply(this, arguments);
            this.type = GradientContainer.TYPES.LINEAR;
            var hasDirection = LinearGradientContainer.REGEXP_DIRECTION.test(imageData.args[0]) || !GradientContainer.REGEXP_COLORSTOP.test(imageData.args[0]);

            if (hasDirection) {
              imageData.args[0].split(/\s+/).reverse().forEach(function (position, index) {
                switch (position) {
                  case "left":
                    this.x0 = 0;
                    this.x1 = 1;
                    break;

                  case "top":
                    this.y0 = 0;
                    this.y1 = 1;
                    break;

                  case "right":
                    this.x0 = 1;
                    this.x1 = 0;
                    break;

                  case "bottom":
                    this.y0 = 1;
                    this.y1 = 0;
                    break;

                  case "to":
                    var y0 = this.y0;
                    var x0 = this.x0;
                    this.y0 = this.y1;
                    this.x0 = this.x1;
                    this.x1 = x0;
                    this.y1 = y0;
                    break;

                  case "center":
                    break;
                  // centered by default
                  // Firefox internally converts position keywords to percentages:
                  // http://www.w3.org/TR/2010/WD-CSS2-20101207/colors.html#propdef-background-position

                  default:
                    // percentage or absolute length
                    // TODO: support absolute start point positions (e.g., use bounds to convert px to a ratio)
                    var ratio = parseFloat(position, 10) * 1e-2;

                    if (isNaN(ratio)) {
                      // invalid or unhandled value
                      break;
                    }

                    if (index === 0) {
                      this.y0 = ratio;
                      this.y1 = 1 - this.y0;
                    } else {
                      this.x0 = ratio;
                      this.x1 = 1 - this.x0;
                    }

                    break;
                }
              }, this);
            } else {
              this.y0 = 0;
              this.y1 = 1;
            }

            this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function (colorStop) {
              var colorStopMatch = colorStop.match(GradientContainer.REGEXP_COLORSTOP);
              var value = +colorStopMatch[2];
              var unit = value === 0 ? "%" : colorStopMatch[3]; // treat "0" as "0%"

              return {
                color: new Color(colorStopMatch[1]),
                // TODO: support absolute stop positions (e.g., compute gradient line length & convert px to ratio)
                stop: unit === "%" ? value / 100 : null
              };
            });

            if (this.colorStops[0].stop === null) {
              this.colorStops[0].stop = 0;
            }

            if (this.colorStops[this.colorStops.length - 1].stop === null) {
              this.colorStops[this.colorStops.length - 1].stop = 1;
            } // calculates and fills-in explicit stop positions when omitted from rule


            this.colorStops.forEach(function (colorStop, index) {
              if (colorStop.stop === null) {
                this.colorStops.slice(index).some(function (find, count) {
                  if (find.stop !== null) {
                    colorStop.stop = (find.stop - this.colorStops[index - 1].stop) / (count + 1) + this.colorStops[index - 1].stop;
                    return true;
                  } else {
                    return false;
                  }
                }, this);
              }
            }, this);
          }

          LinearGradientContainer.prototype = Object.create(GradientContainer.prototype); // TODO: support <angle> (e.g. -?\d{1,3}(?:\.\d+)deg, etc. : https://developer.mozilla.org/docs/Web/CSS/angle )

          LinearGradientContainer.REGEXP_DIRECTION = /^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i;
          module.exports = LinearGradientContainer;
        }, {
          "./color": 3,
          "./gradientcontainer": 9
        }],
        13: [function (_dereq_, module, exports) {
          var logger = function logger() {
            if (logger.options.logging && window.console && window.console.log) {
              Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - logger.options.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
            }
          };

          logger.options = {
            logging: false
          };
          module.exports = logger;
        }, {}],
        14: [function (_dereq_, module, exports) {
          var Color = _dereq_('./color');

          var utils = _dereq_('./utils');

          var getBounds = utils.getBounds;
          var parseBackgrounds = utils.parseBackgrounds;
          var offsetBounds = utils.offsetBounds;

          function NodeContainer(node, parent) {
            this.node = node;
            this.parent = parent;
            this.stack = null;
            this.bounds = null;
            this.borders = null;
            this.clip = [];
            this.backgroundClip = [];
            this.offsetBounds = null;
            this.visible = null;
            this.computedStyles = null;
            this.colors = {};
            this.styles = {};
            this.backgroundImages = null;
            this.transformData = null;
            this.transformMatrix = null;
            this.isPseudoElement = false;
            this.opacity = null;
          }

          NodeContainer.prototype.cloneTo = function (stack) {
            stack.visible = this.visible;
            stack.borders = this.borders;
            stack.bounds = this.bounds;
            stack.clip = this.clip;
            stack.backgroundClip = this.backgroundClip;
            stack.computedStyles = this.computedStyles;
            stack.styles = this.styles;
            stack.backgroundImages = this.backgroundImages;
            stack.opacity = this.opacity;
          };

          NodeContainer.prototype.getOpacity = function () {
            return this.opacity === null ? this.opacity = this.cssFloat('opacity') : this.opacity;
          };

          NodeContainer.prototype.assignStack = function (stack) {
            this.stack = stack;
            stack.children.push(this);
          };

          NodeContainer.prototype.isElementVisible = function () {
            return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : this.css('display') !== "none" && this.css('visibility') !== "hidden" && !this.node.hasAttribute("data-html2canvas-ignore") && (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden");
          };

          NodeContainer.prototype.css = function (attribute) {
            if (!this.computedStyles) {
              this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
            }

            return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
          };

          NodeContainer.prototype.prefixedCss = function (attribute) {
            var prefixes = ["webkit", "moz", "ms", "o"];
            var value = this.css(attribute);

            if (value === undefined) {
              prefixes.some(function (prefix) {
                value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
                return value !== undefined;
              }, this);
            }

            return value === undefined ? null : value;
          };

          NodeContainer.prototype.computedStyle = function (type) {
            return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
          };

          NodeContainer.prototype.cssInt = function (attribute) {
            var value = parseInt(this.css(attribute), 10);
            return isNaN(value) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
          };

          NodeContainer.prototype.color = function (attribute) {
            return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
          };

          NodeContainer.prototype.cssFloat = function (attribute) {
            var value = parseFloat(this.css(attribute));
            return isNaN(value) ? 0 : value;
          };

          NodeContainer.prototype.fontWeight = function () {
            var weight = this.css("fontWeight");

            switch (parseInt(weight, 10)) {
              case 401:
                weight = "bold";
                break;

              case 400:
                weight = "normal";
                break;
            }

            return weight;
          };

          NodeContainer.prototype.parseClip = function () {
            var matches = this.css('clip').match(this.CLIP);

            if (matches) {
              return {
                top: parseInt(matches[1], 10),
                right: parseInt(matches[2], 10),
                bottom: parseInt(matches[3], 10),
                left: parseInt(matches[4], 10)
              };
            }

            return null;
          };

          NodeContainer.prototype.parseBackgroundImages = function () {
            return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
          };

          NodeContainer.prototype.cssList = function (property, index) {
            var value = (this.css(property) || '').split(',');
            value = value[index || 0] || value[0] || 'auto';
            value = value.trim().split(' ');

            if (value.length === 1) {
              value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
            }

            return value;
          };

          NodeContainer.prototype.parseBackgroundSize = function (bounds, image, index) {
            var size = this.cssList("backgroundSize", index);
            var width, height;

            if (isPercentage(size[0])) {
              width = bounds.width * parseFloat(size[0]) / 100;
            } else if (/contain|cover/.test(size[0])) {
              var targetRatio = bounds.width / bounds.height,
                  currentRatio = image.width / image.height;
              return targetRatio < currentRatio ^ size[0] === 'contain' ? {
                width: bounds.height * currentRatio,
                height: bounds.height
              } : {
                width: bounds.width,
                height: bounds.width / currentRatio
              };
            } else {
              width = parseInt(size[0], 10);
            }

            if (size[0] === 'auto' && size[1] === 'auto') {
              height = image.height;
            } else if (size[1] === 'auto') {
              height = width / image.width * image.height;
            } else if (isPercentage(size[1])) {
              height = bounds.height * parseFloat(size[1]) / 100;
            } else {
              height = parseInt(size[1], 10);
            }

            if (size[0] === 'auto') {
              width = height / image.height * image.width;
            }

            return {
              width: width,
              height: height
            };
          };

          NodeContainer.prototype.parseBackgroundPosition = function (bounds, image, index, backgroundSize) {
            var position = this.cssList('backgroundPosition', index);
            var left, top;

            if (isPercentage(position[0])) {
              left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
            } else {
              left = parseInt(position[0], 10);
            }

            if (position[1] === 'auto') {
              top = left / image.width * image.height;
            } else if (isPercentage(position[1])) {
              top = (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
            } else {
              top = parseInt(position[1], 10);
            }

            if (position[0] === 'auto') {
              left = top / image.height * image.width;
            }

            return {
              left: left,
              top: top
            };
          };

          NodeContainer.prototype.parseBackgroundRepeat = function (index) {
            return this.cssList("backgroundRepeat", index)[0];
          };

          NodeContainer.prototype.parseTextShadows = function () {
            var textShadow = this.css("textShadow");
            var results = [];

            if (textShadow && textShadow !== 'none') {
              var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);

              for (var i = 0; shadows && i < shadows.length; i++) {
                var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
                results.push({
                  color: new Color(s[0]),
                  offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                  offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                  blur: s[3] ? s[3].replace('px', '') : 0
                });
              }
            }

            return results;
          };

          NodeContainer.prototype.parseTransform = function () {
            if (!this.transformData) {
              if (this.hasTransform()) {
                var offset = this.parseBounds();
                var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
                origin[0] += offset.left;
                origin[1] += offset.top;
                this.transformData = {
                  origin: origin,
                  matrix: this.parseTransformMatrix()
                };
              } else {
                this.transformData = {
                  origin: [0, 0],
                  matrix: [1, 0, 0, 1, 0, 0]
                };
              }
            }

            return this.transformData;
          };

          NodeContainer.prototype.parseTransformMatrix = function () {
            if (!this.transformMatrix) {
              var transform = this.prefixedCss("transform");
              var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
              this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
            }

            return this.transformMatrix;
          };

          NodeContainer.prototype.parseBounds = function () {
            return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
          };

          NodeContainer.prototype.hasTransform = function () {
            return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || this.parent && this.parent.hasTransform();
          };

          NodeContainer.prototype.getValue = function () {
            var value = this.node.value || "";

            if (this.node.tagName === "SELECT") {
              value = selectionValue(this.node);
            } else if (this.node.type === "password") {
              value = Array(value.length + 1).join("\u2022"); // jshint ignore:line
            }

            return value.length === 0 ? this.node.placeholder || "" : value;
          };

          NodeContainer.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/;
          NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
          NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
          NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

          function selectionValue(node) {
            var option = node.options[node.selectedIndex || 0];
            return option ? option.text || "" : "";
          }

          function parseMatrix(match) {
            if (match && match[1] === "matrix") {
              return match[2].split(",").map(function (s) {
                return parseFloat(s.trim());
              });
            } else if (match && match[1] === "matrix3d") {
              var matrix3d = match[2].split(",").map(function (s) {
                return parseFloat(s.trim());
              });
              return [matrix3d[0], matrix3d[1], matrix3d[4], matrix3d[5], matrix3d[12], matrix3d[13]];
            }
          }

          function isPercentage(value) {
            return value.toString().indexOf("%") !== -1;
          }

          function removePx(str) {
            return str.replace("px", "");
          }

          function asFloat(str) {
            return parseFloat(str);
          }

          module.exports = NodeContainer;
        }, {
          "./color": 3,
          "./utils": 26
        }],
        15: [function (_dereq_, module, exports) {
          var log = _dereq_('./log');

          var punycode = _dereq_('punycode');

          var NodeContainer = _dereq_('./nodecontainer');

          var TextContainer = _dereq_('./textcontainer');

          var PseudoElementContainer = _dereq_('./pseudoelementcontainer');

          var FontMetrics = _dereq_('./fontmetrics');

          var Color = _dereq_('./color');

          var StackingContext = _dereq_('./stackingcontext');

          var utils = _dereq_('./utils');

          var bind = utils.bind;
          var getBounds = utils.getBounds;
          var parseBackgrounds = utils.parseBackgrounds;
          var offsetBounds = utils.offsetBounds;

          function NodeParser(element, renderer, support, imageLoader, options) {
            log("Starting NodeParser");
            this.renderer = renderer;
            this.options = options;
            this.range = null;
            this.support = support;
            this.renderQueue = [];
            this.stack = new StackingContext(true, 1, element.ownerDocument, null);
            var parent = new NodeContainer(element, null);

            if (options.background) {
              renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
            }

            if (element === element.ownerDocument.documentElement) {
              // http://www.w3.org/TR/css3-background/#special-backgrounds
              var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
              renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
            }

            parent.visibile = parent.isElementVisible();
            this.createPseudoHideStyles(element.ownerDocument);
            this.disableAnimations(element.ownerDocument);
            this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function (container) {
              return container.visible = container.isElementVisible();
            }).map(this.getPseudoElements, this));
            this.fontMetrics = new FontMetrics();
            log("Fetched nodes, total:", this.nodes.length);
            log("Calculate overflow clips");
            this.calculateOverflowClips();
            log("Start fetching images");
            this.images = imageLoader.fetch(this.nodes.filter(isElement));
            this.ready = this.images.ready.then(bind(function () {
              log("Images loaded, starting parsing");
              log("Creating stacking contexts");
              this.createStackingContexts();
              log("Sorting stacking contexts");
              this.sortStackingContexts(this.stack);
              this.parse(this.stack);
              log("Render queue created with " + this.renderQueue.length + " items");
              return new Promise(bind(function (resolve) {
                if (!options.async) {
                  this.renderQueue.forEach(this.paint, this);
                  resolve();
                } else if (typeof options.async === "function") {
                  options.async.call(this, this.renderQueue, resolve);
                } else if (this.renderQueue.length > 0) {
                  this.renderIndex = 0;
                  this.asyncRenderer(this.renderQueue, resolve);
                } else {
                  resolve();
                }
              }, this));
            }, this));
          }

          NodeParser.prototype.calculateOverflowClips = function () {
            this.nodes.forEach(function (container) {
              if (isElement(container)) {
                if (isPseudoElement(container)) {
                  container.appendToDOM();
                }

                container.borders = this.parseBorders(container);
                var clip = container.css('overflow') === "hidden" ? [container.borders.clip] : [];
                var cssClip = container.parseClip();

                if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                  clip.push([["rect", container.bounds.left + cssClip.left, container.bounds.top + cssClip.top, cssClip.right - cssClip.left, cssClip.bottom - cssClip.top]]);
                }

                container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
                container.backgroundClip = container.css('overflow') !== "hidden" ? container.clip.concat([container.borders.clip]) : container.clip;

                if (isPseudoElement(container)) {
                  container.cleanDOM();
                }
              } else if (isTextNode(container)) {
                container.clip = hasParentClip(container) ? container.parent.clip : [];
              }

              if (!isPseudoElement(container)) {
                container.bounds = null;
              }
            }, this);
          };

          function hasParentClip(container) {
            return container.parent && container.parent.clip.length;
          }

          NodeParser.prototype.asyncRenderer = function (queue, resolve, asyncTimer) {
            asyncTimer = asyncTimer || Date.now();
            this.paint(queue[this.renderIndex++]);

            if (queue.length === this.renderIndex) {
              resolve();
            } else if (asyncTimer + 20 > Date.now()) {
              this.asyncRenderer(queue, resolve, asyncTimer);
            } else {
              setTimeout(bind(function () {
                this.asyncRenderer(queue, resolve);
              }, this), 0);
            }
          };

          NodeParser.prototype.createPseudoHideStyles = function (document) {
            this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' + '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
          };

          NodeParser.prototype.disableAnimations = function (document) {
            this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' + '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
          };

          NodeParser.prototype.createStyles = function (document, styles) {
            var hidePseudoElements = document.createElement('style');
            hidePseudoElements.innerHTML = styles;
            document.body.appendChild(hidePseudoElements);
          };

          NodeParser.prototype.getPseudoElements = function (container) {
            var nodes = [[container]];

            if (container.node.nodeType === Node.ELEMENT_NODE) {
              var before = this.getPseudoElement(container, ":before");
              var after = this.getPseudoElement(container, ":after");

              if (before) {
                nodes.push(before);
              }

              if (after) {
                nodes.push(after);
              }
            }

            return flatten(nodes);
          };

          function toCamelCase(str) {
            return str.replace(/(\-[a-z])/g, function (match) {
              return match.toUpperCase().replace('-', '');
            });
          }

          NodeParser.prototype.getPseudoElement = function (container, type) {
            var style = container.computedStyle(type);

            if (!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
              return null;
            }

            var content = stripQuotes(style.content);
            var isImage = content.substr(0, 3) === 'url';
            var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
            var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

            for (var i = style.length - 1; i >= 0; i--) {
              var property = toCamelCase(style.item(i));
              pseudoNode.style[property] = style[property];
            }

            pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

            if (isImage) {
              pseudoNode.src = parseBackgrounds(content)[0].args[0];
              return [pseudoContainer];
            } else {
              var text = document.createTextNode(content);
              pseudoNode.appendChild(text);
              return [pseudoContainer, new TextContainer(text, pseudoContainer)];
            }
          };

          NodeParser.prototype.getChildren = function (parentContainer) {
            return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function (node) {
              var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
              return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : [] : container;
            }, this));
          };

          NodeParser.prototype.newStackingContext = function (container, hasOwnStacking) {
            var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
            container.cloneTo(stack);
            var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
            parentStack.contexts.push(stack);
            container.stack = stack;
          };

          NodeParser.prototype.createStackingContexts = function () {
            this.nodes.forEach(function (container) {
              if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
                this.newStackingContext(container, true);
              } else if (isElement(container) && (isPositioned(container) && zIndex0(container) || isInlineBlock(container) || isFloating(container))) {
                this.newStackingContext(container, false);
              } else {
                container.assignStack(container.parent.stack);
              }
            }, this);
          };

          NodeParser.prototype.isBodyWithTransparentRoot = function (container) {
            return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
          };

          NodeParser.prototype.isRootElement = function (container) {
            return container.parent === null;
          };

          NodeParser.prototype.sortStackingContexts = function (stack) {
            stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
            stack.contexts.forEach(this.sortStackingContexts, this);
          };

          NodeParser.prototype.parseTextBounds = function (container) {
            return function (text, index, textList) {
              if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
                if (this.support.rangeBounds && !container.parent.hasTransform()) {
                  var offset = textList.slice(0, index).join("").length;
                  return this.getRangeBounds(container.node, offset, text.length);
                } else if (container.node && typeof container.node.data === "string") {
                  var replacementNode = container.node.splitText(text.length);
                  var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                  container.node = replacementNode;
                  return bounds;
                }
              } else if (!this.support.rangeBounds || container.parent.hasTransform()) {
                container.node = container.node.splitText(text.length);
              }

              return {};
            };
          };

          NodeParser.prototype.getWrapperBounds = function (node, transform) {
            var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
            var parent = node.parentNode,
                backupText = node.cloneNode(true);
            wrapper.appendChild(node.cloneNode(true));
            parent.replaceChild(wrapper, node);
            var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
            parent.replaceChild(backupText, wrapper);
            return bounds;
          };

          NodeParser.prototype.getRangeBounds = function (node, offset, length) {
            var range = this.range || (this.range = node.ownerDocument.createRange());
            range.setStart(node, offset);
            range.setEnd(node, offset + length);
            return range.getBoundingClientRect();
          };

          function ClearTransform() {}

          NodeParser.prototype.parse = function (stack) {
            // http://www.w3.org/TR/CSS21/visuren.html#z-index
            var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).

            var descendantElements = stack.children.filter(isElement);
            var descendantNonFloats = descendantElements.filter(not(isFloating));
            var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.

            var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.

            var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.

            var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.

            var text = stack.children.filter(isTextNode).filter(hasText);
            var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).

            negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats).concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function (container) {
              this.renderQueue.push(container);

              if (isStackingContext(container)) {
                this.parse(container);
                this.renderQueue.push(new ClearTransform());
              }
            }, this);
          };

          NodeParser.prototype.paint = function (container) {
            try {
              if (container instanceof ClearTransform) {
                this.renderer.ctx.restore();
              } else if (isTextNode(container)) {
                if (isPseudoElement(container.parent)) {
                  container.parent.appendToDOM();
                }

                this.paintText(container);

                if (isPseudoElement(container.parent)) {
                  container.parent.cleanDOM();
                }
              } else {
                this.paintNode(container);
              }
            } catch (e) {
              log(e);

              if (this.options.strict) {
                throw e;
              }
            }
          };

          NodeParser.prototype.paintNode = function (container) {
            if (isStackingContext(container)) {
              this.renderer.setOpacity(container.opacity);
              this.renderer.ctx.save();

              if (container.hasTransform()) {
                this.renderer.setTransform(container.parseTransform());
              }
            }

            if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
              this.paintCheckbox(container);
            } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
              this.paintRadio(container);
            } else {
              this.paintElement(container);
            }
          };

          NodeParser.prototype.paintElement = function (container) {
            var bounds = container.parseBounds();
            this.renderer.clip(container.backgroundClip, function () {
              this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
            }, this);
            this.renderer.clip(container.clip, function () {
              this.renderer.renderBorders(container.borders.borders);
            }, this);
            this.renderer.clip(container.backgroundClip, function () {
              switch (container.node.nodeName) {
                case "svg":
                case "IFRAME":
                  var imgContainer = this.images.get(container.node);

                  if (imgContainer) {
                    this.renderer.renderImage(container, bounds, container.borders, imgContainer);
                  } else {
                    log("Error loading <" + container.node.nodeName + ">", container.node);
                  }

                  break;

                case "IMG":
                  var imageContainer = this.images.get(container.node.src);

                  if (imageContainer) {
                    this.renderer.renderImage(container, bounds, container.borders, imageContainer);
                  } else {
                    log("Error loading <img>", container.node.src);
                  }

                  break;

                case "CANVAS":
                  this.renderer.renderImage(container, bounds, container.borders, {
                    image: container.node
                  });
                  break;

                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                  this.paintFormValue(container);
                  break;
              }
            }, this);
          };

          NodeParser.prototype.paintCheckbox = function (container) {
            var b = container.parseBounds();
            var size = Math.min(b.width, b.height);
            var bounds = {
              width: size - 1,
              height: size - 1,
              top: b.top,
              left: b.left
            };
            var r = [3, 3];
            var radius = [r, r, r, r];
            var borders = [1, 1, 1, 1].map(function (w) {
              return {
                color: new Color('#A5A5A5'),
                width: w
              };
            });
            var borderPoints = calculateCurvePoints(bounds, radius, borders);
            this.renderer.clip(container.backgroundClip, function () {
              this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
              this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));

              if (container.node.checked) {
                this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', size - 3 + "px", 'arial');
                this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
              }
            }, this);
          };

          NodeParser.prototype.paintRadio = function (container) {
            var bounds = container.parseBounds();
            var size = Math.min(bounds.width, bounds.height) - 2;
            this.renderer.clip(container.backgroundClip, function () {
              this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));

              if (container.node.checked) {
                this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
              }
            }, this);
          };

          NodeParser.prototype.paintFormValue = function (container) {
            var value = container.getValue();

            if (value.length > 0) {
              var document = container.node.ownerDocument;
              var wrapper = document.createElement('html2canvaswrapper');
              var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth', 'boxSizing', 'whiteSpace', 'wordWrap'];
              properties.forEach(function (property) {
                try {
                  wrapper.style[property] = container.css(property);
                } catch (e) {
                  // Older IE has issues with "border"
                  log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
                }
              });
              var bounds = container.parseBounds();
              wrapper.style.position = "fixed";
              wrapper.style.left = bounds.left + "px";
              wrapper.style.top = bounds.top + "px";
              wrapper.textContent = value;
              document.body.appendChild(wrapper);
              this.paintText(new TextContainer(wrapper.firstChild, container));
              document.body.removeChild(wrapper);
            }
          };

          NodeParser.prototype.paintText = function (container) {
            container.applyTextTransform();
            var characters = punycode.ucs2.decode(container.node.data);
            var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function (character) {
              return punycode.ucs2.encode([character]);
            });
            var weight = container.parent.fontWeight();
            var size = container.parent.css('fontSize');
            var family = container.parent.css('fontFamily');
            var shadows = container.parent.parseTextShadows();
            this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);

            if (shadows.length) {
              // TODO: support multiple text shadows
              this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
            } else {
              this.renderer.clearShadow();
            }

            this.renderer.clip(container.parent.clip, function () {
              textList.map(this.parseTextBounds(container), this).forEach(function (bounds, index) {
                if (bounds) {
                  this.renderer.text(textList[index], bounds.left, bounds.bottom);
                  this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
                }
              }, this);
            }, this);
          };

          NodeParser.prototype.renderTextDecoration = function (container, bounds, metrics) {
            switch (container.css("textDecoration").split(" ")[0]) {
              case "underline":
                // Draws a line at the baseline of the font
                // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
                this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;

              case "overline":
                this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
                break;

              case "line-through":
                // TODO try and find exact position for line-through
                this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;
            }
          };

          var borderColorTransforms = {
            inset: [["darken", 0.60], ["darken", 0.10], ["darken", 0.10], ["darken", 0.60]]
          };

          NodeParser.prototype.parseBorders = function (container) {
            var nodeBounds = container.parseBounds();
            var radius = getBorderRadiusData(container);
            var borders = ["Top", "Right", "Bottom", "Left"].map(function (side, index) {
              var style = container.css('border' + side + 'Style');
              var color = container.color('border' + side + 'Color');

              if (style === "inset" && color.isBlack()) {
                color = new Color([255, 255, 255, color.a]); // this is wrong, but
              }

              var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
              return {
                width: container.cssInt('border' + side + 'Width'),
                color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
                args: null
              };
            });
            var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);
            return {
              clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
              borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
            };
          };

          function calculateBorders(borders, nodeBounds, borderPoints, radius) {
            return borders.map(function (border, borderSide) {
              if (border.width > 0) {
                var bx = nodeBounds.left;
                var by = nodeBounds.top;
                var bw = nodeBounds.width;
                var bh = nodeBounds.height - borders[2].width;

                switch (borderSide) {
                  case 0:
                    // top border
                    bh = borders[0].width;
                    border.args = drawSide({
                      c1: [bx, by],
                      c2: [bx + bw, by],
                      c3: [bx + bw - borders[1].width, by + bh],
                      c4: [bx + borders[3].width, by + bh]
                    }, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                    break;

                  case 1:
                    // right border
                    bx = nodeBounds.left + nodeBounds.width - borders[1].width;
                    bw = borders[1].width;
                    border.args = drawSide({
                      c1: [bx + bw, by],
                      c2: [bx + bw, by + bh + borders[2].width],
                      c3: [bx, by + bh],
                      c4: [bx, by + borders[0].width]
                    }, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                    break;

                  case 2:
                    // bottom border
                    by = by + nodeBounds.height - borders[2].width;
                    bh = borders[2].width;
                    border.args = drawSide({
                      c1: [bx + bw, by + bh],
                      c2: [bx, by + bh],
                      c3: [bx + borders[3].width, by],
                      c4: [bx + bw - borders[3].width, by]
                    }, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                    break;

                  case 3:
                    // left border
                    bw = borders[3].width;
                    border.args = drawSide({
                      c1: [bx, by + bh + borders[2].width],
                      c2: [bx, by],
                      c3: [bx + bw, by + borders[0].width],
                      c4: [bx + bw, by + bh]
                    }, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                    break;
                }
              }

              return border;
            });
          }

          NodeParser.prototype.parseBackgroundClip = function (container, borderPoints, borders, radius, bounds) {
            var backgroundClip = container.css('backgroundClip'),
                borderArgs = [];

            switch (backgroundClip) {
              case "content-box":
              case "padding-box":
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
                break;

              default:
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
                break;
            }

            return borderArgs;
          };

          function getCurvePoints(x, y, r1, r2) {
            var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
            var ox = r1 * kappa,
                // control point offset horizontal
            oy = r2 * kappa,
                // control point offset vertical
            xm = x + r1,
                // x-middle
            ym = y + r2; // y-middle

            return {
              topLeft: bezierCurve({
                x: x,
                y: ym
              }, {
                x: x,
                y: ym - oy
              }, {
                x: xm - ox,
                y: y
              }, {
                x: xm,
                y: y
              }),
              topRight: bezierCurve({
                x: x,
                y: y
              }, {
                x: x + ox,
                y: y
              }, {
                x: xm,
                y: ym - oy
              }, {
                x: xm,
                y: ym
              }),
              bottomRight: bezierCurve({
                x: xm,
                y: y
              }, {
                x: xm,
                y: y + oy
              }, {
                x: x + ox,
                y: ym
              }, {
                x: x,
                y: ym
              }),
              bottomLeft: bezierCurve({
                x: xm,
                y: ym
              }, {
                x: xm - ox,
                y: ym
              }, {
                x: x,
                y: y + oy
              }, {
                x: x,
                y: y
              })
            };
          }

          function calculateCurvePoints(bounds, borderRadius, borders) {
            var x = bounds.left,
                y = bounds.top,
                width = bounds.width,
                height = bounds.height,
                tlh = borderRadius[0][0] < width / 2 ? borderRadius[0][0] : width / 2,
                tlv = borderRadius[0][1] < height / 2 ? borderRadius[0][1] : height / 2,
                trh = borderRadius[1][0] < width / 2 ? borderRadius[1][0] : width / 2,
                trv = borderRadius[1][1] < height / 2 ? borderRadius[1][1] : height / 2,
                brh = borderRadius[2][0] < width / 2 ? borderRadius[2][0] : width / 2,
                brv = borderRadius[2][1] < height / 2 ? borderRadius[2][1] : height / 2,
                blh = borderRadius[3][0] < width / 2 ? borderRadius[3][0] : width / 2,
                blv = borderRadius[3][1] < height / 2 ? borderRadius[3][1] : height / 2;
            var topWidth = width - trh,
                rightHeight = height - brv,
                bottomWidth = width - brh,
                leftHeight = height - blv;
            return {
              topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
              topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
              topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
              topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, topWidth > width + borders[3].width ? 0 : trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
              bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
              bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width), brv - borders[2].width).bottomRight.subdivide(0.5),
              bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
              bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
            };
          }

          function bezierCurve(start, startControl, endControl, end) {
            var lerp = function lerp(a, b, t) {
              return {
                x: a.x + (b.x - a.x) * t,
                y: a.y + (b.y - a.y) * t
              };
            };

            return {
              start: start,
              startControl: startControl,
              endControl: endControl,
              end: end,
              subdivide: function subdivide(t) {
                var ab = lerp(start, startControl, t),
                    bc = lerp(startControl, endControl, t),
                    cd = lerp(endControl, end, t),
                    abbc = lerp(ab, bc, t),
                    bccd = lerp(bc, cd, t),
                    dest = lerp(abbc, bccd, t);
                return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
              },
              curveTo: function curveTo(borderArgs) {
                borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
              },
              curveToReversed: function curveToReversed(borderArgs) {
                borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
              }
            };
          }

          function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
            var borderArgs = [];

            if (radius1[0] > 0 || radius1[1] > 0) {
              borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
              outer1[1].curveTo(borderArgs);
            } else {
              borderArgs.push(["line", borderData.c1[0], borderData.c1[1]]);
            }

            if (radius2[0] > 0 || radius2[1] > 0) {
              borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
              outer2[0].curveTo(borderArgs);
              borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
              inner2[0].curveToReversed(borderArgs);
            } else {
              borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
              borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
            }

            if (radius1[0] > 0 || radius1[1] > 0) {
              borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
              inner1[1].curveToReversed(borderArgs);
            } else {
              borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
            }

            return borderArgs;
          }

          function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
            if (radius1[0] > 0 || radius1[1] > 0) {
              borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
              corner1[0].curveTo(borderArgs);
              corner1[1].curveTo(borderArgs);
            } else {
              borderArgs.push(["line", x, y]);
            }

            if (radius2[0] > 0 || radius2[1] > 0) {
              borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
            }
          }

          function negativeZIndex(container) {
            return container.cssInt("zIndex") < 0;
          }

          function positiveZIndex(container) {
            return container.cssInt("zIndex") > 0;
          }

          function zIndex0(container) {
            return container.cssInt("zIndex") === 0;
          }

          function inlineLevel(container) {
            return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
          }

          function isStackingContext(container) {
            return container instanceof StackingContext;
          }

          function hasText(container) {
            return container.node.data.trim().length > 0;
          }

          function noLetterSpacing(container) {
            return /^(normal|none|0px)$/.test(container.parent.css("letterSpacing"));
          }

          function getBorderRadiusData(container) {
            return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (side) {
              var value = container.css('border' + side + 'Radius');
              var arr = value.split(" ");

              if (arr.length <= 1) {
                arr[1] = arr[0];
              }

              return arr.map(asInt);
            });
          }

          function renderableNode(node) {
            return node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE;
          }

          function isPositionedForStacking(container) {
            var position = container.css("position");
            var zIndex = ["absolute", "relative", "fixed"].indexOf(position) !== -1 ? container.css("zIndex") : "auto";
            return zIndex !== "auto";
          }

          function isPositioned(container) {
            return container.css("position") !== "static";
          }

          function isFloating(container) {
            return container.css("float") !== "none";
          }

          function isInlineBlock(container) {
            return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
          }

          function not(callback) {
            var context = this;
            return function () {
              return !callback.apply(context, arguments);
            };
          }

          function isElement(container) {
            return container.node.nodeType === Node.ELEMENT_NODE;
          }

          function isPseudoElement(container) {
            return container.isPseudoElement === true;
          }

          function isTextNode(container) {
            return container.node.nodeType === Node.TEXT_NODE;
          }

          function zIndexSort(contexts) {
            return function (a, b) {
              return a.cssInt("zIndex") + contexts.indexOf(a) / contexts.length - (b.cssInt("zIndex") + contexts.indexOf(b) / contexts.length);
            };
          }

          function hasOpacity(container) {
            return container.getOpacity() < 1;
          }

          function asInt(value) {
            return parseInt(value, 10);
          }

          function getWidth(border) {
            return border.width;
          }

          function nonIgnoredElement(nodeContainer) {
            return nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1;
          }

          function flatten(arrays) {
            return [].concat.apply([], arrays);
          }

          function stripQuotes(content) {
            var first = content.substr(0, 1);
            return first === content.substr(content.length - 1) && first.match(/'|"/) ? content.substr(1, content.length - 2) : content;
          }

          function getWords(characters) {
            var words = [],
                i = 0,
                onWordBoundary = false,
                word;

            while (characters.length) {
              if (isWordBoundary(characters[i]) === onWordBoundary) {
                word = characters.splice(0, i);

                if (word.length) {
                  words.push(punycode.ucs2.encode(word));
                }

                onWordBoundary = !onWordBoundary;
                i = 0;
              } else {
                i++;
              }

              if (i >= characters.length) {
                word = characters.splice(0, i);

                if (word.length) {
                  words.push(punycode.ucs2.encode(word));
                }
              }
            }

            return words;
          }

          function isWordBoundary(characterCode) {
            return [32, // <space>
            13, // \r
            10, // \n
            9, // \t
            45 // -
            ].indexOf(characterCode) !== -1;
          }

          function hasUnicode(string) {
            return /[^\u0000-\u00ff]/.test(string);
          }

          module.exports = NodeParser;
        }, {
          "./color": 3,
          "./fontmetrics": 7,
          "./log": 13,
          "./nodecontainer": 14,
          "./pseudoelementcontainer": 18,
          "./stackingcontext": 21,
          "./textcontainer": 25,
          "./utils": 26,
          "punycode": 1
        }],
        16: [function (_dereq_, module, exports) {
          var XHR = _dereq_('./xhr');

          var utils = _dereq_('./utils');

          var log = _dereq_('./log');

          var createWindowClone = _dereq_('./clone');

          var decode64 = utils.decode64;

          function Proxy(src, proxyUrl, document) {
            var supportsCORS = ('withCredentials' in new XMLHttpRequest());

            if (!proxyUrl) {
              return Promise.reject("No proxy configured");
            }

            var callback = createCallback(supportsCORS);
            var url = createProxyUrl(proxyUrl, src, callback);
            return supportsCORS ? XHR(url) : jsonp(document, url, callback).then(function (response) {
              return decode64(response.content);
            });
          }

          var proxyCount = 0;

          function ProxyURL(src, proxyUrl, document) {
            var supportsCORSImage = ('crossOrigin' in new Image());
            var callback = createCallback(supportsCORSImage);
            var url = createProxyUrl(proxyUrl, src, callback);
            return supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function (response) {
              return "data:" + response.type + ";base64," + response.content;
            });
          }

          function jsonp(document, url, callback) {
            return new Promise(function (resolve, reject) {
              var s = document.createElement("script");

              var cleanup = function cleanup() {
                delete window.html2canvas.proxy[callback];
                document.body.removeChild(s);
              };

              window.html2canvas.proxy[callback] = function (response) {
                cleanup();
                resolve(response);
              };

              s.src = url;

              s.onerror = function (e) {
                cleanup();
                reject(e);
              };

              document.body.appendChild(s);
            });
          }

          function createCallback(useCORS) {
            return !useCORS ? "html2canvas_" + Date.now() + "_" + ++proxyCount + "_" + Math.round(Math.random() * 100000) : "";
          }

          function createProxyUrl(proxyUrl, src, callback) {
            return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
          }

          function documentFromHTML(src) {
            return function (html) {
              var parser = new DOMParser(),
                  doc;

              try {
                doc = parser.parseFromString(html, "text/html");
              } catch (e) {
                log("DOMParser not supported, falling back to createHTMLDocument");
                doc = document.implementation.createHTMLDocument("");

                try {
                  doc.open();
                  doc.write(html);
                  doc.close();
                } catch (ee) {
                  log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                  doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
                }
              }

              var b = doc.querySelector("base");

              if (!b || !b.href.host) {
                var base = doc.createElement("base");
                base.href = src;
                doc.head.insertBefore(base, doc.head.firstChild);
              }

              return doc;
            };
          }

          function loadUrlDocument(src, proxy, document, width, height, options) {
            return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function (doc) {
              return createWindowClone(doc, document, width, height, options, 0, 0);
            });
          }

          exports.Proxy = Proxy;
          exports.ProxyURL = ProxyURL;
          exports.loadUrlDocument = loadUrlDocument;
        }, {
          "./clone": 2,
          "./log": 13,
          "./utils": 26,
          "./xhr": 28
        }],
        17: [function (_dereq_, module, exports) {
          var ProxyURL = _dereq_('./proxy').ProxyURL;

          function ProxyImageContainer(src, proxy) {
            var link = document.createElement("a");
            link.href = src;
            src = link.href;
            this.src = src;
            this.image = new Image();
            var self = this;
            this.promise = new Promise(function (resolve, reject) {
              self.image.crossOrigin = "Anonymous";
              self.image.onload = resolve;
              self.image.onerror = reject;
              new ProxyURL(src, proxy, document).then(function (url) {
                self.image.src = url;
              })['catch'](reject);
            });
          }

          module.exports = ProxyImageContainer;
        }, {
          "./proxy": 16
        }],
        18: [function (_dereq_, module, exports) {
          var NodeContainer = _dereq_('./nodecontainer');

          function PseudoElementContainer(node, parent, type) {
            NodeContainer.call(this, node, parent);
            this.isPseudoElement = true;
            this.before = type === ":before";
          }

          PseudoElementContainer.prototype.cloneTo = function (stack) {
            PseudoElementContainer.prototype.cloneTo.call(this, stack);
            stack.isPseudoElement = true;
            stack.before = this.before;
          };

          PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

          PseudoElementContainer.prototype.appendToDOM = function () {
            if (this.before) {
              this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
            } else {
              this.parent.node.appendChild(this.node);
            }

            this.parent.node.className += " " + this.getHideClass();
          };

          PseudoElementContainer.prototype.cleanDOM = function () {
            this.node.parentNode.removeChild(this.node);
            this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
          };

          PseudoElementContainer.prototype.getHideClass = function () {
            return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
          };

          PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
          PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
          module.exports = PseudoElementContainer;
        }, {
          "./nodecontainer": 14
        }],
        19: [function (_dereq_, module, exports) {
          var log = _dereq_('./log');

          function Renderer(width, height, images, options, document) {
            this.width = width;
            this.height = height;
            this.images = images;
            this.options = options;
            this.document = document;
          }

          Renderer.prototype.renderImage = function (container, bounds, borderData, imageContainer) {
            var paddingLeft = container.cssInt('paddingLeft'),
                paddingTop = container.cssInt('paddingTop'),
                paddingRight = container.cssInt('paddingRight'),
                paddingBottom = container.cssInt('paddingBottom'),
                borders = borderData.borders;
            var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
            var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
            this.drawImage(imageContainer, 0, 0, imageContainer.image.width || width, imageContainer.image.height || height, bounds.left + paddingLeft + borders[3].width, bounds.top + paddingTop + borders[0].width, width, height);
          };

          Renderer.prototype.renderBackground = function (container, bounds, borderData) {
            if (bounds.height > 0 && bounds.width > 0) {
              this.renderBackgroundColor(container, bounds);
              this.renderBackgroundImage(container, bounds, borderData);
            }
          };

          Renderer.prototype.renderBackgroundColor = function (container, bounds) {
            var color = container.color("backgroundColor");

            if (!color.isTransparent()) {
              this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
            }
          };

          Renderer.prototype.renderBorders = function (borders) {
            borders.forEach(this.renderBorder, this);
          };

          Renderer.prototype.renderBorder = function (data) {
            if (!data.color.isTransparent() && data.args !== null) {
              this.drawShape(data.args, data.color);
            }
          };

          Renderer.prototype.renderBackgroundImage = function (container, bounds, borderData) {
            var backgroundImages = container.parseBackgroundImages();
            backgroundImages.reverse().forEach(function (backgroundImage, index, arr) {
              switch (backgroundImage.method) {
                case "url":
                  var image = this.images.get(backgroundImage.args[0]);

                  if (image) {
                    this.renderBackgroundRepeating(container, bounds, image, arr.length - (index + 1), borderData);
                  } else {
                    log("Error loading background-image", backgroundImage.args[0]);
                  }

                  break;

                case "linear-gradient":
                case "gradient":
                  var gradientImage = this.images.get(backgroundImage.value);

                  if (gradientImage) {
                    this.renderBackgroundGradient(gradientImage, bounds, borderData);
                  } else {
                    log("Error loading background-image", backgroundImage.args[0]);
                  }

                  break;

                case "none":
                  break;

                default:
                  log("Unknown background-image type", backgroundImage.args[0]);
              }
            }, this);
          };

          Renderer.prototype.renderBackgroundRepeating = function (container, bounds, imageContainer, index, borderData) {
            var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
            var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
            var repeat = container.parseBackgroundRepeat(index);

            switch (repeat) {
              case "repeat-x":
              case "repeat no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
                break;

              case "repeat-y":
              case "no-repeat repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
                break;

              case "no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
                break;

              default:
                this.renderBackgroundRepeat(imageContainer, position, size, {
                  top: bounds.top,
                  left: bounds.left
                }, borderData[3], borderData[0]);
                break;
            }
          };

          module.exports = Renderer;
        }, {
          "./log": 13
        }],
        20: [function (_dereq_, module, exports) {
          var Renderer = _dereq_('../renderer');

          var LinearGradientContainer = _dereq_('../lineargradientcontainer');

          var log = _dereq_('../log');

          function CanvasRenderer(width, height) {
            Renderer.apply(this, arguments);
            this.canvas = this.options.canvas || this.document.createElement("canvas");

            if (!this.options.canvas) {
              this.canvas.width = width;
              this.canvas.height = height;
            }

            this.ctx = this.canvas.getContext("2d");
            this.taintCtx = this.document.createElement("canvas").getContext("2d");
            this.ctx.textBaseline = "bottom";
            this.variables = {};
            log("Initialized CanvasRenderer with size", width, "x", height);
          }

          CanvasRenderer.prototype = Object.create(Renderer.prototype);

          CanvasRenderer.prototype.setFillStyle = function (fillStyle) {
            this.ctx.fillStyle = _typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
            return this.ctx;
          };

          CanvasRenderer.prototype.rectangle = function (left, top, width, height, color) {
            this.setFillStyle(color).fillRect(left, top, width, height);
          };

          CanvasRenderer.prototype.circle = function (left, top, size, color) {
            this.setFillStyle(color);
            this.ctx.beginPath();
            this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
          };

          CanvasRenderer.prototype.circleStroke = function (left, top, size, color, stroke, strokeColor) {
            this.circle(left, top, size, color);
            this.ctx.strokeStyle = strokeColor.toString();
            this.ctx.stroke();
          };

          CanvasRenderer.prototype.drawShape = function (shape, color) {
            this.shape(shape);
            this.setFillStyle(color).fill();
          };

          CanvasRenderer.prototype.taints = function (imageContainer) {
            if (imageContainer.tainted === null) {
              this.taintCtx.drawImage(imageContainer.image, 0, 0);

              try {
                this.taintCtx.getImageData(0, 0, 1, 1);
                imageContainer.tainted = false;
              } catch (e) {
                this.taintCtx = document.createElement("canvas").getContext("2d");
                imageContainer.tainted = true;
              }
            }

            return imageContainer.tainted;
          };

          CanvasRenderer.prototype.drawImage = function (imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
            if (!this.taints(imageContainer) || this.options.allowTaint) {
              this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
            }
          };

          CanvasRenderer.prototype.clip = function (shapes, callback, context) {
            this.ctx.save();
            shapes.filter(hasEntries).forEach(function (shape) {
              this.shape(shape).clip();
            }, this);
            callback.call(context);
            this.ctx.restore();
          };

          CanvasRenderer.prototype.shape = function (shape) {
            this.ctx.beginPath();
            shape.forEach(function (point, index) {
              if (point[0] === "rect") {
                this.ctx.rect.apply(this.ctx, point.slice(1));
              } else {
                this.ctx[index === 0 ? "moveTo" : point[0] + "To"].apply(this.ctx, point.slice(1));
              }
            }, this);
            this.ctx.closePath();
            return this.ctx;
          };

          CanvasRenderer.prototype.font = function (color, style, variant, weight, size, family) {
            this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
          };

          CanvasRenderer.prototype.fontShadow = function (color, offsetX, offsetY, blur) {
            this.setVariable("shadowColor", color.toString()).setVariable("shadowOffsetY", offsetX).setVariable("shadowOffsetX", offsetY).setVariable("shadowBlur", blur);
          };

          CanvasRenderer.prototype.clearShadow = function () {
            this.setVariable("shadowColor", "rgba(0,0,0,0)");
          };

          CanvasRenderer.prototype.setOpacity = function (opacity) {
            this.ctx.globalAlpha = opacity;
          };

          CanvasRenderer.prototype.setTransform = function (transform) {
            this.ctx.translate(transform.origin[0], transform.origin[1]);
            this.ctx.transform.apply(this.ctx, transform.matrix);
            this.ctx.translate(-transform.origin[0], -transform.origin[1]);
          };

          CanvasRenderer.prototype.setVariable = function (property, value) {
            if (this.variables[property] !== value) {
              this.variables[property] = this.ctx[property] = value;
            }

            return this;
          };

          CanvasRenderer.prototype.text = function (text, left, bottom) {
            this.ctx.fillText(text, left, bottom);
          };

          CanvasRenderer.prototype.backgroundRepeatShape = function (imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
            var shape = [["line", Math.round(left), Math.round(top)], ["line", Math.round(left + width), Math.round(top)], ["line", Math.round(left + width), Math.round(height + top)], ["line", Math.round(left), Math.round(height + top)]];
            this.clip([shape], function () {
              this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
            }, this);
          };

          CanvasRenderer.prototype.renderBackgroundRepeat = function (imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
            var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft),
                offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
            this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
            this.ctx.translate(offsetX, offsetY);
            this.ctx.fill();
            this.ctx.translate(-offsetX, -offsetY);
          };

          CanvasRenderer.prototype.renderBackgroundGradient = function (gradientImage, bounds) {
            if (gradientImage instanceof LinearGradientContainer) {
              var gradient = this.ctx.createLinearGradient(bounds.left + bounds.width * gradientImage.x0, bounds.top + bounds.height * gradientImage.y0, bounds.left + bounds.width * gradientImage.x1, bounds.top + bounds.height * gradientImage.y1);
              gradientImage.colorStops.forEach(function (colorStop) {
                gradient.addColorStop(colorStop.stop, colorStop.color.toString());
              });
              this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
            }
          };

          CanvasRenderer.prototype.resizeImage = function (imageContainer, size) {
            var image = imageContainer.image;

            if (image.width === size.width && image.height === size.height) {
              return image;
            }

            var ctx,
                canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height);
            return canvas;
          };

          function hasEntries(array) {
            return array.length > 0;
          }

          module.exports = CanvasRenderer;
        }, {
          "../lineargradientcontainer": 12,
          "../log": 13,
          "../renderer": 19
        }],
        21: [function (_dereq_, module, exports) {
          var NodeContainer = _dereq_('./nodecontainer');

          function StackingContext(hasOwnStacking, opacity, element, parent) {
            NodeContainer.call(this, element, parent);
            this.ownStacking = hasOwnStacking;
            this.contexts = [];
            this.children = [];
            this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
          }

          StackingContext.prototype = Object.create(NodeContainer.prototype);

          StackingContext.prototype.getParentStack = function (context) {
            var parentStack = this.parent ? this.parent.stack : null;
            return parentStack ? parentStack.ownStacking ? parentStack : parentStack.getParentStack(context) : context.stack;
          };

          module.exports = StackingContext;
        }, {
          "./nodecontainer": 14
        }],
        22: [function (_dereq_, module, exports) {
          function Support(document) {
            this.rangeBounds = this.testRangeBounds(document);
            this.cors = this.testCORS();
            this.svg = this.testSVG();
          }

          Support.prototype.testRangeBounds = function (document) {
            var range,
                testElement,
                rangeBounds,
                rangeHeight,
                support = false;

            if (document.createRange) {
              range = document.createRange();

              if (range.getBoundingClientRect) {
                testElement = document.createElement('boundtest');
                testElement.style.height = "123px";
                testElement.style.display = "block";
                document.body.appendChild(testElement);
                range.selectNode(testElement);
                rangeBounds = range.getBoundingClientRect();
                rangeHeight = rangeBounds.height;

                if (rangeHeight === 123) {
                  support = true;
                }

                document.body.removeChild(testElement);
              }
            }

            return support;
          };

          Support.prototype.testCORS = function () {
            return typeof new Image().crossOrigin !== "undefined";
          };

          Support.prototype.testSVG = function () {
            var img = new Image();
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

            try {
              ctx.drawImage(img, 0, 0);
              canvas.toDataURL();
            } catch (e) {
              return false;
            }

            return true;
          };

          module.exports = Support;
        }, {}],
        23: [function (_dereq_, module, exports) {
          var XHR = _dereq_('./xhr');

          var decode64 = _dereq_('./utils').decode64;

          function SVGContainer(src) {
            this.src = src;
            this.image = null;
            var self = this;
            this.promise = this.hasFabric().then(function () {
              return self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src);
            }).then(function (svg) {
              return new Promise(function (resolve) {
                window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
              });
            });
          }

          SVGContainer.prototype.hasFabric = function () {
            return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
          };

          SVGContainer.prototype.inlineFormatting = function (src) {
            return /^data:image\/svg\+xml;base64,/.test(src) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
          };

          SVGContainer.prototype.removeContentType = function (src) {
            return src.replace(/^data:image\/svg\+xml(;base64)?,/, '');
          };

          SVGContainer.prototype.isInline = function (src) {
            return /^data:image\/svg\+xml/i.test(src);
          };

          SVGContainer.prototype.createCanvas = function (resolve) {
            var self = this;
            return function (objects, options) {
              var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
              self.image = canvas.lowerCanvasEl;
              canvas.setWidth(options.width).setHeight(options.height).add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options)).renderAll();
              resolve(canvas.lowerCanvasEl);
            };
          };

          SVGContainer.prototype.decode64 = function (str) {
            return typeof window.atob === "function" ? window.atob(str) : decode64(str);
          };

          module.exports = SVGContainer;
        }, {
          "./utils": 26,
          "./xhr": 28
        }],
        24: [function (_dereq_, module, exports) {
          var SVGContainer = _dereq_('./svgcontainer');

          function SVGNodeContainer(node, _native) {
            this.src = node;
            this.image = null;
            var self = this;
            this.promise = _native ? new Promise(function (resolve, reject) {
              self.image = new Image();
              self.image.onload = resolve;
              self.image.onerror = reject;
              self.image.src = "data:image/svg+xml," + new XMLSerializer().serializeToString(node);

              if (self.image.complete === true) {
                resolve(self.image);
              }
            }) : this.hasFabric().then(function () {
              return new Promise(function (resolve) {
                window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
              });
            });
          }

          SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);
          module.exports = SVGNodeContainer;
        }, {
          "./svgcontainer": 23
        }],
        25: [function (_dereq_, module, exports) {
          var NodeContainer = _dereq_('./nodecontainer');

          function TextContainer(node, parent) {
            NodeContainer.call(this, node, parent);
          }

          TextContainer.prototype = Object.create(NodeContainer.prototype);

          TextContainer.prototype.applyTextTransform = function () {
            this.node.data = this.transform(this.parent.css("textTransform"));
          };

          TextContainer.prototype.transform = function (transform) {
            var text = this.node.data;

            switch (transform) {
              case "lowercase":
                return text.toLowerCase();

              case "capitalize":
                return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);

              case "uppercase":
                return text.toUpperCase();

              default:
                return text;
            }
          };

          function capitalize(m, p1, p2) {
            if (m.length > 0) {
              return p1 + p2.toUpperCase();
            }
          }

          module.exports = TextContainer;
        }, {
          "./nodecontainer": 14
        }],
        26: [function (_dereq_, module, exports) {
          exports.smallImage = function smallImage() {
            return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
          };

          exports.bind = function (callback, context) {
            return function () {
              return callback.apply(context, arguments);
            };
          };
          /*
           * base64-arraybuffer
           * https://github.com/niklasvh/base64-arraybuffer
           *
           * Copyright (c) 2012 Niklas von Hertzen
           * Licensed under the MIT license.
           */


          exports.decode64 = function (base64) {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var len = base64.length,
                i,
                encoded1,
                encoded2,
                encoded3,
                encoded4,
                byte1,
                byte2,
                byte3;
            var output = "";

            for (i = 0; i < len; i += 4) {
              encoded1 = chars.indexOf(base64[i]);
              encoded2 = chars.indexOf(base64[i + 1]);
              encoded3 = chars.indexOf(base64[i + 2]);
              encoded4 = chars.indexOf(base64[i + 3]);
              byte1 = encoded1 << 2 | encoded2 >> 4;
              byte2 = (encoded2 & 15) << 4 | encoded3 >> 2;
              byte3 = (encoded3 & 3) << 6 | encoded4;

              if (encoded3 === 64) {
                output += String.fromCharCode(byte1);
              } else if (encoded4 === 64 || encoded4 === -1) {
                output += String.fromCharCode(byte1, byte2);
              } else {
                output += String.fromCharCode(byte1, byte2, byte3);
              }
            }

            return output;
          };

          exports.getBounds = function (node) {
            if (node.getBoundingClientRect) {
              var clientRect = node.getBoundingClientRect();
              var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
              return {
                top: clientRect.top,
                bottom: clientRect.bottom || clientRect.top + clientRect.height,
                right: clientRect.left + width,
                left: clientRect.left,
                width: width,
                height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
              };
            }

            return {};
          };

          exports.offsetBounds = function (node) {
            var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {
              top: 0,
              left: 0
            };
            return {
              top: node.offsetTop + parent.top,
              bottom: node.offsetTop + node.offsetHeight + parent.top,
              right: node.offsetLeft + parent.left + node.offsetWidth,
              left: node.offsetLeft + parent.left,
              width: node.offsetWidth,
              height: node.offsetHeight
            };
          };

          exports.parseBackgrounds = function (backgroundImage) {
            var whitespace = ' \r\n\t',
                method,
                definition,
                prefix,
                prefix_i,
                block,
                results = [],
                mode = 0,
                numParen = 0,
                quote,
                args;

            var appendResult = function appendResult() {
              if (method) {
                if (definition.substr(0, 1) === '"') {
                  definition = definition.substr(1, definition.length - 2);
                }

                if (definition) {
                  args.push(definition);
                }

                if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1) + 1) > 0) {
                  prefix = method.substr(0, prefix_i);
                  method = method.substr(prefix_i);
                }

                results.push({
                  prefix: prefix,
                  method: method.toLowerCase(),
                  value: block,
                  args: args,
                  image: null
                });
              }

              args = [];
              method = prefix = definition = block = '';
            };

            args = [];
            method = prefix = definition = block = '';
            backgroundImage.split("").forEach(function (c) {
              if (mode === 0 && whitespace.indexOf(c) > -1) {
                return;
              }

              switch (c) {
                case '"':
                  if (!quote) {
                    quote = c;
                  } else if (quote === c) {
                    quote = null;
                  }

                  break;

                case '(':
                  if (quote) {
                    break;
                  } else if (mode === 0) {
                    mode = 1;
                    block += c;
                    return;
                  } else {
                    numParen++;
                  }

                  break;

                case ')':
                  if (quote) {
                    break;
                  } else if (mode === 1) {
                    if (numParen === 0) {
                      mode = 0;
                      block += c;
                      appendResult();
                      return;
                    } else {
                      numParen--;
                    }
                  }

                  break;

                case ',':
                  if (quote) {
                    break;
                  } else if (mode === 0) {
                    appendResult();
                    return;
                  } else if (mode === 1) {
                    if (numParen === 0 && !method.match(/^url$/i)) {
                      args.push(definition);
                      definition = '';
                      block += c;
                      return;
                    }
                  }

                  break;
              }

              block += c;

              if (mode === 0) {
                method += c;
              } else {
                definition += c;
              }
            });
            appendResult();
            return results;
          };
        }, {}],
        27: [function (_dereq_, module, exports) {
          var GradientContainer = _dereq_('./gradientcontainer');

          function WebkitGradientContainer(imageData) {
            GradientContainer.apply(this, arguments);
            this.type = imageData.args[0] === "linear" ? GradientContainer.TYPES.LINEAR : GradientContainer.TYPES.RADIAL;
          }

          WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);
          module.exports = WebkitGradientContainer;
        }, {
          "./gradientcontainer": 9
        }],
        28: [function (_dereq_, module, exports) {
          function XHR(url) {
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url);

              xhr.onload = function () {
                if (xhr.status === 200) {
                  resolve(xhr.responseText);
                } else {
                  reject(new Error(xhr.statusText));
                }
              };

              xhr.onerror = function () {
                reject(new Error("Network Error"));
              };

              xhr.send();
            });
          }

          module.exports = XHR;
        }, {}]
      }, {}, [4])(4);
    });
  });
  /*
  	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
  	http://www.phpied.com/rgb-color-parser-in-javascript/
  */

  var rgbcolor = function rgbcolor(color_string) {
    this.ok = false;
    this.alpha = 1.0; // strip any leading #

    if (color_string.charAt(0) == '#') {
      // remove # if any
      color_string = color_string.substr(1, 6);
    }

    color_string = color_string.replace(/ /g, '');
    color_string = color_string.toLowerCase(); // before getting into regexps, try simple matches
    // and overwrite the input

    var simple_colors = {
      aliceblue: 'f0f8ff',
      antiquewhite: 'faebd7',
      aqua: '00ffff',
      aquamarine: '7fffd4',
      azure: 'f0ffff',
      beige: 'f5f5dc',
      bisque: 'ffe4c4',
      black: '000000',
      blanchedalmond: 'ffebcd',
      blue: '0000ff',
      blueviolet: '8a2be2',
      brown: 'a52a2a',
      burlywood: 'deb887',
      cadetblue: '5f9ea0',
      chartreuse: '7fff00',
      chocolate: 'd2691e',
      coral: 'ff7f50',
      cornflowerblue: '6495ed',
      cornsilk: 'fff8dc',
      crimson: 'dc143c',
      cyan: '00ffff',
      darkblue: '00008b',
      darkcyan: '008b8b',
      darkgoldenrod: 'b8860b',
      darkgray: 'a9a9a9',
      darkgreen: '006400',
      darkkhaki: 'bdb76b',
      darkmagenta: '8b008b',
      darkolivegreen: '556b2f',
      darkorange: 'ff8c00',
      darkorchid: '9932cc',
      darkred: '8b0000',
      darksalmon: 'e9967a',
      darkseagreen: '8fbc8f',
      darkslateblue: '483d8b',
      darkslategray: '2f4f4f',
      darkturquoise: '00ced1',
      darkviolet: '9400d3',
      deeppink: 'ff1493',
      deepskyblue: '00bfff',
      dimgray: '696969',
      dodgerblue: '1e90ff',
      feldspar: 'd19275',
      firebrick: 'b22222',
      floralwhite: 'fffaf0',
      forestgreen: '228b22',
      fuchsia: 'ff00ff',
      gainsboro: 'dcdcdc',
      ghostwhite: 'f8f8ff',
      gold: 'ffd700',
      goldenrod: 'daa520',
      gray: '808080',
      green: '008000',
      greenyellow: 'adff2f',
      honeydew: 'f0fff0',
      hotpink: 'ff69b4',
      indianred: 'cd5c5c',
      indigo: '4b0082',
      ivory: 'fffff0',
      khaki: 'f0e68c',
      lavender: 'e6e6fa',
      lavenderblush: 'fff0f5',
      lawngreen: '7cfc00',
      lemonchiffon: 'fffacd',
      lightblue: 'add8e6',
      lightcoral: 'f08080',
      lightcyan: 'e0ffff',
      lightgoldenrodyellow: 'fafad2',
      lightgrey: 'd3d3d3',
      lightgreen: '90ee90',
      lightpink: 'ffb6c1',
      lightsalmon: 'ffa07a',
      lightseagreen: '20b2aa',
      lightskyblue: '87cefa',
      lightslateblue: '8470ff',
      lightslategray: '778899',
      lightsteelblue: 'b0c4de',
      lightyellow: 'ffffe0',
      lime: '00ff00',
      limegreen: '32cd32',
      linen: 'faf0e6',
      magenta: 'ff00ff',
      maroon: '800000',
      mediumaquamarine: '66cdaa',
      mediumblue: '0000cd',
      mediumorchid: 'ba55d3',
      mediumpurple: '9370d8',
      mediumseagreen: '3cb371',
      mediumslateblue: '7b68ee',
      mediumspringgreen: '00fa9a',
      mediumturquoise: '48d1cc',
      mediumvioletred: 'c71585',
      midnightblue: '191970',
      mintcream: 'f5fffa',
      mistyrose: 'ffe4e1',
      moccasin: 'ffe4b5',
      navajowhite: 'ffdead',
      navy: '000080',
      oldlace: 'fdf5e6',
      olive: '808000',
      olivedrab: '6b8e23',
      orange: 'ffa500',
      orangered: 'ff4500',
      orchid: 'da70d6',
      palegoldenrod: 'eee8aa',
      palegreen: '98fb98',
      paleturquoise: 'afeeee',
      palevioletred: 'd87093',
      papayawhip: 'ffefd5',
      peachpuff: 'ffdab9',
      peru: 'cd853f',
      pink: 'ffc0cb',
      plum: 'dda0dd',
      powderblue: 'b0e0e6',
      purple: '800080',
      red: 'ff0000',
      rosybrown: 'bc8f8f',
      royalblue: '4169e1',
      saddlebrown: '8b4513',
      salmon: 'fa8072',
      sandybrown: 'f4a460',
      seagreen: '2e8b57',
      seashell: 'fff5ee',
      sienna: 'a0522d',
      silver: 'c0c0c0',
      skyblue: '87ceeb',
      slateblue: '6a5acd',
      slategray: '708090',
      snow: 'fffafa',
      springgreen: '00ff7f',
      steelblue: '4682b4',
      tan: 'd2b48c',
      teal: '008080',
      thistle: 'd8bfd8',
      tomato: 'ff6347',
      turquoise: '40e0d0',
      violet: 'ee82ee',
      violetred: 'd02090',
      wheat: 'f5deb3',
      white: 'ffffff',
      whitesmoke: 'f5f5f5',
      yellow: 'ffff00',
      yellowgreen: '9acd32'
    };
    color_string = simple_colors[color_string] || color_string; // emd of simple type-in colors
    // array of color definition objects

    var color_defs = [{
      re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
      example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
      process: function process(bits) {
        return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3]), parseFloat(bits[4])];
      }
    }, {
      re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
      process: function process(bits) {
        return [parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])];
      }
    }, {
      re: /^(\w{2})(\w{2})(\w{2})$/,
      example: ['#00ff00', '336699'],
      process: function process(bits) {
        return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)];
      }
    }, {
      re: /^(\w{1})(\w{1})(\w{1})$/,
      example: ['#fb0', 'f0f'],
      process: function process(bits) {
        return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)];
      }
    }]; // search through the definitions to find a match

    for (var i = 0; i < color_defs.length; i++) {
      var re = color_defs[i].re;
      var processor = color_defs[i].process;
      var bits = re.exec(color_string);

      if (bits) {
        var channels = processor(bits);
        this.r = channels[0];
        this.g = channels[1];
        this.b = channels[2];

        if (channels.length > 3) {
          this.alpha = channels[3];
        }

        this.ok = true;
      }
    } // validate/cleanup values


    this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
    this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
    this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
    this.alpha = this.alpha < 0 ? 0 : this.alpha > 1.0 || isNaN(this.alpha) ? 1.0 : this.alpha; // some getters

    this.toRGB = function () {
      return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    };

    this.toRGBA = function () {
      return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    };

    this.toHex = function () {
      var r = this.r.toString(16);
      var g = this.g.toString(16);
      var b = this.b.toString(16);
      if (r.length == 1) r = '0' + r;
      if (g.length == 1) g = '0' + g;
      if (b.length == 1) b = '0' + b;
      return '#' + r + g + b;
    }; // help


    this.getHelpXML = function () {
      var examples = new Array(); // add regexps

      for (var i = 0; i < color_defs.length; i++) {
        var example = color_defs[i].example;

        for (var j = 0; j < example.length; j++) {
          examples[examples.length] = example[j];
        }
      } // add type-in colors


      for (var sc in simple_colors) {
        examples[examples.length] = sc;
      }

      var xml = document.createElement('ul');
      xml.setAttribute('id', 'rgbcolor-examples');

      for (var i = 0; i < examples.length; i++) {
        try {
          var list_item = document.createElement('li');
          var list_color = new RGBColor(examples[i]);
          var example_div = document.createElement('div');
          example_div.style.cssText = 'margin: 3px; ' + 'border: 1px solid black; ' + 'background:' + list_color.toHex() + '; ' + 'color:' + list_color.toHex();
          example_div.appendChild(document.createTextNode('test'));
          var list_item_value = document.createTextNode(' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex());
          list_item.appendChild(example_div);
          list_item.appendChild(list_item_value);
          xml.appendChild(list_item);
        } catch (e) {}
      }

      return xml;
    };
  };
  /*
  	StackBlur - a fast almost Gaussian Blur For Canvas
  	Version: 	0.5
  Author:		Mario Klingemann
  Contact: 	mario@quasimondo.com
  Website:	http://www.quasimondo.com/StackBlurForCanvas
  Twitter:	@quasimondo
  	In case you find this class useful - especially in commercial projects -
  I am not totally unhappy for a small donation to my PayPal account
  mario@quasimondo.de
  	Or support me on flattr: 
  https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
  	Copyright (c) 2010 Mario Klingemann
  	Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:
  	The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  */


  var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

  function blur(pixels, width, height, radius) {
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;
    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
    var div = radius + radius + 1;
    var widthMinus1 = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1 = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
    var stackStart = new BlurStack();
    var stack = stackStart;

    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();
      if (i == radiusPlus1) var stackEnd = stack;
    }

    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;
    yw = yi = 0;
    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++) {
      r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;
      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;
        stack = stack.next;
      }

      stackIn = stackStart;
      stackOut = stackEnd;

      for (x = 0; x < width; x++) {
        pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;

        if (pa != 0) {
          pa = 255 / pa;
          pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;
        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;
        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
        r_in_sum += stackIn.r = pixels[p];
        g_in_sum += stackIn.g = pixels[p + 1];
        b_in_sum += stackIn.b = pixels[p + 2];
        a_in_sum += stackIn.a = pixels[p + 3];
        r_sum += r_in_sum;
        g_sum += g_in_sum;
        b_sum += b_in_sum;
        a_sum += a_in_sum;
        stackIn = stackIn.next;
        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;
        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;
        stackOut = stackOut.next;
        yi += 4;
      }

      yw += width;
    }

    for (x = 0; x < width; x++) {
      g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
      yi = x << 2;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;
      stack = stackStart;

      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }

      yp = width;

      for (i = 1; i <= radius; i++) {
        yi = yp + x << 2;
        r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;
        stack = stack.next;

        if (i < heightMinus1) {
          yp += width;
        }
      }

      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;

      for (y = 0; y < height; y++) {
        p = yi << 2;
        pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;

        if (pa > 0) {
          pa = 255 / pa;
          pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        }

        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;
        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;
        p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
        r_sum += r_in_sum += stackIn.r = pixels[p];
        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
        a_sum += a_in_sum += stackIn.a = pixels[p + 3];
        stackIn = stackIn.next;
        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;
        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;
        stackOut = stackOut.next;
        yi += width;
      }
    }
  }

  function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  }

  var stackblur = blur; //[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
  //[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
  //[5]   	Name	   ::=   	NameStartChar (NameChar)*

  var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/; //\u10000-\uEFFFF

  var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
  var tagNamePattern = new RegExp('^' + nameStartChar.source + nameChar.source + '*(?:\:' + nameStartChar.source + nameChar.source + '*)?$'); //var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
  //var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')
  //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
  //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE

  var S_TAG = 0; //tag name offerring

  var S_ATTR = 1; //attr name offerring 

  var S_ATTR_SPACE = 2; //attr name end and space offer

  var S_EQ = 3; //=space?

  var S_ATTR_NOQUOT_VALUE = 4; //attr value(no quot value only)

  var S_ATTR_END = 5; //attr value end and no space(quot end)

  var S_TAG_SPACE = 6; //(attr value end || tag end ) && (space offer)

  var S_TAG_CLOSE = 7; //closed el<el />

  function XMLReader() {}

  XMLReader.prototype = {
    parse: function parse(source, defaultNSMap, entityMap) {
      var domBuilder = this.domBuilder;
      domBuilder.startDocument();

      _copy(defaultNSMap, defaultNSMap = {});

      _parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);

      domBuilder.endDocument();
    }
  };

  function _parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
    function fixedFromCharCode(code) {
      // String.prototype.fromCharCode does not supports
      // > 2 bytes unicode chars directly
      if (code > 0xffff) {
        code -= 0x10000;
        var surrogate1 = 0xd800 + (code >> 10),
            surrogate2 = 0xdc00 + (code & 0x3ff);
        return String.fromCharCode(surrogate1, surrogate2);
      } else {
        return String.fromCharCode(code);
      }
    }

    function entityReplacer(a) {
      var k = a.slice(1, -1);

      if (k in entityMap) {
        return entityMap[k];
      } else if (k.charAt(0) === '#') {
        return fixedFromCharCode(parseInt(k.substr(1).replace('x', '0x')));
      } else {
        errorHandler.error('entity not found:' + a);
        return a;
      }
    }

    function appendText(end) {
      //has some bugs
      if (end > start) {
        var xt = source.substring(start, end).replace(/&#?\w+;/g, entityReplacer);
        locator && position(start);
        domBuilder.characters(xt, 0, end - start);
        start = end;
      }
    }

    function position(p, m) {
      while (p >= lineEnd && (m = linePattern.exec(source))) {
        lineStart = m.index;
        lineEnd = lineStart + m[0].length;
        locator.lineNumber++; //console.log('line++:',locator,startPos,endPos)
      }

      locator.columnNumber = p - lineStart + 1;
    }

    var lineStart = 0;
    var lineEnd = 0;
    var linePattern = /.*(?:\r\n?|\n)|.*$/g;
    var locator = domBuilder.locator;
    var parseStack = [{
      currentNSMap: defaultNSMapCopy
    }];
    var closeMap = {};
    var start = 0;

    while (true) {
      try {
        var tagStart = source.indexOf('<', start);

        if (tagStart < 0) {
          if (!source.substr(start).match(/^\s*$/)) {
            var doc = domBuilder.doc;
            var text = doc.createTextNode(source.substr(start));
            doc.appendChild(text);
            domBuilder.currentElement = text;
          }

          return;
        }

        if (tagStart > start) {
          appendText(tagStart);
        }

        switch (source.charAt(tagStart + 1)) {
          case '/':
            var end = source.indexOf('>', tagStart + 3);
            var tagName = source.substring(tagStart + 2, end);
            var config = parseStack.pop();

            if (end < 0) {
              tagName = source.substring(tagStart + 2).replace(/[\s<].*/, ''); //console.error('#@@@@@@'+tagName)

              errorHandler.error("end tag name: " + tagName + ' is not complete:' + config.tagName);
              end = tagStart + 1 + tagName.length;
            } else if (tagName.match(/\s</)) {
              tagName = tagName.replace(/[\s<].*/, '');
              errorHandler.error("end tag name: " + tagName + ' maybe not complete');
              end = tagStart + 1 + tagName.length;
            } //console.error(parseStack.length,parseStack)
            //console.error(config);


            var localNSMap = config.localNSMap;
            var endMatch = config.tagName == tagName;
            var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();

            if (endIgnoreCaseMach) {
              domBuilder.endElement(config.uri, config.localName, tagName);

              if (localNSMap) {
                for (var prefix in localNSMap) {
                  domBuilder.endPrefixMapping(prefix);
                }
              }

              if (!endMatch) {
                errorHandler.fatalError("end tag name: " + tagName + ' is not match the current start tagName:' + config.tagName);
              }
            } else {
              parseStack.push(config);
            }

            end++;
            break;
          // end elment

          case '?':
            // <?...?>
            locator && position(tagStart);
            end = parseInstruction(source, tagStart, domBuilder);
            break;

          case '!':
            // <!doctype,<![CDATA,<!--
            locator && position(tagStart);
            end = parseDCC(source, tagStart, domBuilder, errorHandler);
            break;

          default:
            locator && position(tagStart);
            var el = new ElementAttributes();
            var currentNSMap = parseStack[parseStack.length - 1].currentNSMap; //elStartEnd

            var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
            var len = el.length;

            if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
              el.closed = true;

              if (!entityMap.nbsp) {
                errorHandler.warning('unclosed xml attribute');
              }
            }

            if (locator && len) {
              var locator2 = copyLocator(locator, {}); //try{//attribute position fixed

              for (var i = 0; i < len; i++) {
                var a = el[i];
                position(a.offset);
                a.locator = copyLocator(locator, {});
              } //}catch(e){console.error('@@@@@'+e)}


              domBuilder.locator = locator2;

              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }

              domBuilder.locator = locator;
            } else {
              if (appendElement(el, domBuilder, currentNSMap)) {
                parseStack.push(el);
              }
            }

            if (el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed) {
              end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
            } else {
              end++;
            }

        }
      } catch (e) {
        errorHandler.error('element parse error: ' + e); //errorHandler.error('element parse error: '+e);

        end = -1; //throw e;
      }

      if (end > start) {
        start = end;
      } else {
        //TODO: 这里有可能sax回退，有位置错误风险
        appendText(Math.max(tagStart, start) + 1);
      }
    }
  }

  function copyLocator(f, t) {
    t.lineNumber = f.lineNumber;
    t.columnNumber = f.columnNumber;
    return t;
  }
  /**
   * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
   * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
   */


  function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
    var attrName;
    var value;
    var p = ++start;
    var s = S_TAG; //status

    while (true) {
      var c = source.charAt(p);

      switch (c) {
        case '=':
          if (s === S_ATTR) {
            //attrName
            attrName = source.slice(start, p);
            s = S_EQ;
          } else if (s === S_ATTR_SPACE) {
            s = S_EQ;
          } else {
            //fatalError: equal must after attrName or space after attrName
            throw new Error('attribute equal must after attrName');
          }

          break;

        case '\'':
        case '"':
          if (s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
          ) {
              //equal
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }

              start = p + 1;
              p = source.indexOf(c, start);

              if (p > 0) {
                value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                el.add(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                //fatalError: no end quot match
                throw new Error('attribute value no end \'' + c + '\' match');
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
            value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer); //console.log(attrName,value,start,p)

            el.add(attrName, value, start); //console.dir(el)

            errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ')!!');
            start = p + 1;
            s = S_ATTR_END;
          } else {
            //fatalError: no equal before
            throw new Error('attribute value must after "="');
          }

          break;

        case '/':
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));

            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              s = S_TAG_CLOSE;
              el.closed = true;

            case S_ATTR_NOQUOT_VALUE:
            case S_ATTR:
            case S_ATTR_SPACE:
              break;
            //case S_EQ:

            default:
              throw new Error("attribute invalid close char('/')");
          }

          break;

        case '':
          //end document
          //throw new Error('unexpected end of input')
          errorHandler.error('unexpected end of input');

          if (s == S_TAG) {
            el.setTagName(source.slice(start, p));
          }

          return p;

        case '>':
          switch (s) {
            case S_TAG:
              el.setTagName(source.slice(start, p));

            case S_ATTR_END:
            case S_TAG_SPACE:
            case S_TAG_CLOSE:
              break;
            //normal

            case S_ATTR_NOQUOT_VALUE: //Compatible state

            case S_ATTR:
              value = source.slice(start, p);

              if (value.slice(-1) === '/') {
                el.closed = true;
                value = value.slice(0, -1);
              }

            case S_ATTR_SPACE:
              if (s === S_ATTR_SPACE) {
                value = attrName;
              }

              if (s == S_ATTR_NOQUOT_VALUE) {
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                el.add(attrName, value.replace(/&#?\w+;/g, entityReplacer), start);
              } else {
                if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)) {
                  errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                }

                el.add(value, value, start);
              }

              break;

            case S_EQ:
              throw new Error('attribute value missed!!');
          } //			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))


          return p;

        /*xml space '\x20' | #x9 | #xD | #xA; */

        case "\x80":
          c = ' ';

        default:
          if (c <= ' ') {
            //space
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p)); //tagName

                s = S_TAG_SPACE;
                break;

              case S_ATTR:
                attrName = source.slice(start, p);
                s = S_ATTR_SPACE;
                break;

              case S_ATTR_NOQUOT_VALUE:
                var value = source.slice(start, p).replace(/&#?\w+;/g, entityReplacer);
                errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                el.add(attrName, value, start);

              case S_ATTR_END:
                s = S_TAG_SPACE;
                break;
              //case S_TAG_SPACE:
              //case S_EQ:
              //case S_ATTR_SPACE:
              //	void();break;
              //case S_TAG_CLOSE:
              //ignore warning
            }
          } else {
            //not space
            //S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
            //S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
            switch (s) {
              //case S_TAG:void();break;
              //case S_ATTR:void();break;
              //case S_ATTR_NOQUOT_VALUE:void();break;
              case S_ATTR_SPACE:
                el.tagName;

                if (currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                  errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                }

                el.add(attrName, attrName, start);
                start = p;
                s = S_ATTR;
                break;

              case S_ATTR_END:
                errorHandler.warning('attribute space is required"' + attrName + '"!!');

              case S_TAG_SPACE:
                s = S_ATTR;
                start = p;
                break;

              case S_EQ:
                s = S_ATTR_NOQUOT_VALUE;
                start = p;
                break;

              case S_TAG_CLOSE:
                throw new Error("elements closed character '/' and '>' must be connected to");
            }
          }

      } //end outer switch
      //console.log('p++',p)


      p++;
    }
  }
  /**
   * @return true if has new namespace define
   */


  function appendElement(el, domBuilder, currentNSMap) {
    var tagName = el.tagName;
    var localNSMap = null; //var currentNSMap = parseStack[parseStack.length-1].currentNSMap;

    var i = el.length;

    while (i--) {
      var a = el[i];
      var qName = a.qName;
      var value = a.value;
      var nsp = qName.indexOf(':');

      if (nsp > 0) {
        var prefix = a.prefix = qName.slice(0, nsp);
        var localName = qName.slice(nsp + 1);
        var nsPrefix = prefix === 'xmlns' && localName;
      } else {
        localName = qName;
        prefix = null;
        nsPrefix = qName === 'xmlns' && '';
      } //can not set prefix,because prefix !== ''


      a.localName = localName; //prefix == null for no ns prefix attribute 

      if (nsPrefix !== false) {
        //hack!!
        if (localNSMap == null) {
          localNSMap = {}; //console.log(currentNSMap,0)

          _copy(currentNSMap, currentNSMap = {}); //console.log(currentNSMap,1)

        }

        currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
        a.uri = 'http://www.w3.org/2000/xmlns/';
        domBuilder.startPrefixMapping(nsPrefix, value);
      }
    }

    var i = el.length;

    while (i--) {
      a = el[i];
      var prefix = a.prefix;

      if (prefix) {
        //no prefix attribute has no namespace
        if (prefix === 'xml') {
          a.uri = 'http://www.w3.org/XML/1998/namespace';
        }

        if (prefix !== 'xmlns') {
          a.uri = currentNSMap[prefix || '']; //{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
        }
      }
    }

    var nsp = tagName.indexOf(':');

    if (nsp > 0) {
      prefix = el.prefix = tagName.slice(0, nsp);
      localName = el.localName = tagName.slice(nsp + 1);
    } else {
      prefix = null; //important!!

      localName = el.localName = tagName;
    } //no prefix element has default namespace


    var ns = el.uri = currentNSMap[prefix || ''];
    domBuilder.startElement(ns, localName, tagName, el); //endPrefixMapping and startPrefixMapping have not any help for dom builder
    //localNSMap = null

    if (el.closed) {
      domBuilder.endElement(ns, localName, tagName);

      if (localNSMap) {
        for (prefix in localNSMap) {
          domBuilder.endPrefixMapping(prefix);
        }
      }
    } else {
      el.currentNSMap = currentNSMap;
      el.localNSMap = localNSMap; //parseStack.push(el);

      return true;
    }
  }

  function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
    if (/^(?:script|textarea)$/i.test(tagName)) {
      var elEndStart = source.indexOf('</' + tagName + '>', elStartEnd);
      var text = source.substring(elStartEnd + 1, elEndStart);

      if (/[&<]/.test(text)) {
        if (/^script$/i.test(tagName)) {
          //if(!/\]\]>/.test(text)){
          //lexHandler.startCDATA();
          domBuilder.characters(text, 0, text.length); //lexHandler.endCDATA();

          return elEndStart; //}
        } //}else{//text area


        text = text.replace(/&#?\w+;/g, entityReplacer);
        domBuilder.characters(text, 0, text.length);
        return elEndStart; //}
      }
    }

    return elStartEnd + 1;
  }

  function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
    //if(tagName in closeMap){
    var pos = closeMap[tagName];

    if (pos == null) {
      //console.log(tagName)
      pos = source.lastIndexOf('</' + tagName + '>');

      if (pos < elStartEnd) {
        //忘记闭合
        pos = source.lastIndexOf('</' + tagName);
      }

      closeMap[tagName] = pos;
    }

    return pos < elStartEnd; //} 
  }

  function _copy(source, target) {
    for (var n in source) {
      target[n] = source[n];
    }
  }

  function parseDCC(source, start, domBuilder, errorHandler) {
    //sure start with '<!'
    var next = source.charAt(start + 2);

    switch (next) {
      case '-':
        if (source.charAt(start + 3) === '-') {
          var end = source.indexOf('-->', start + 4); //append comment source.substring(4,end)//<!--

          if (end > start) {
            domBuilder.comment(source, start + 4, end - start - 4);
            return end + 3;
          } else {
            errorHandler.error("Unclosed comment");
            return -1;
          }
        } else {
          //error
          return -1;
        }

      default:
        if (source.substr(start + 3, 6) == 'CDATA[') {
          var end = source.indexOf(']]>', start + 9);
          domBuilder.startCDATA();
          domBuilder.characters(source, start + 9, end - start - 9);
          domBuilder.endCDATA();
          return end + 3;
        } //<!DOCTYPE
        //startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 


        var matchs = split(source, start);
        var len = matchs.length;

        if (len > 1 && /!doctype/i.test(matchs[0][0])) {
          var name = matchs[1][0];
          var pubid = len > 3 && /^public$/i.test(matchs[2][0]) && matchs[3][0];
          var sysid = len > 4 && matchs[4][0];
          var lastMatch = matchs[len - 1];
          domBuilder.startDTD(name, pubid && pubid.replace(/^(['"])(.*?)\1$/, '$2'), sysid && sysid.replace(/^(['"])(.*?)\1$/, '$2'));
          domBuilder.endDTD();
          return lastMatch.index + lastMatch[0].length;
        }

    }

    return -1;
  }

  function parseInstruction(source, start, domBuilder) {
    var end = source.indexOf('?>', start);

    if (end) {
      var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);

      if (match) {
        match[0].length;
        domBuilder.processingInstruction(match[1], match[2]);
        return end + 2;
      } else {
        //error
        return -1;
      }
    }

    return -1;
  }
  /**
   * @param source
   */


  function ElementAttributes(source) {}

  ElementAttributes.prototype = {
    setTagName: function setTagName(tagName) {
      if (!tagNamePattern.test(tagName)) {
        throw new Error('invalid tagName:' + tagName);
      }

      this.tagName = tagName;
    },
    add: function add(qName, value, offset) {
      if (!tagNamePattern.test(qName)) {
        throw new Error('invalid attribute:' + qName);
      }

      this[this.length++] = {
        qName: qName,
        value: value,
        offset: offset
      };
    },
    length: 0,
    getLocalName: function getLocalName(i) {
      return this[i].localName;
    },
    getLocator: function getLocator(i) {
      return this[i].locator;
    },
    getQName: function getQName(i) {
      return this[i].qName;
    },
    getURI: function getURI(i) {
      return this[i].uri;
    },
    getValue: function getValue(i) {
      return this[i].value;
    } //	,getIndex:function(uri, localName)){
    //		if(localName){
    //			
    //		}else{
    //			var qName = uri
    //		}
    //	},
    //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
    //	getType:function(uri,localName){}
    //	getType:function(i){},

  };

  function _set_proto_(thiz, parent) {
    thiz.__proto__ = parent;
    return thiz;
  }

  if (!(_set_proto_({}, _set_proto_.prototype) instanceof _set_proto_)) {
    _set_proto_ = function _set_proto_(thiz, parent) {
      function p() {}

      p.prototype = parent;
      p = new p();

      for (parent in thiz) {
        p[parent] = thiz[parent];
      }

      return p;
    };
  }

  function split(source, start) {
    var match;
    var buf = [];
    var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
    reg.lastIndex = start;
    reg.exec(source); //skip <

    while (match = reg.exec(source)) {
      buf.push(match);
      if (match[1]) return buf;
    }
  }

  var XMLReader_1 = XMLReader;
  var sax = {
    XMLReader: XMLReader_1
  };
  /*
   * DOM Level 2
   * Object DOMException
   * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
   * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
   */

  function copy(src, dest) {
    for (var p in src) {
      dest[p] = src[p];
    }
  }
  /**
  ^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
  ^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
   */


  function _extends(Class, Super) {
    var pt = Class.prototype;

    if (Object.create) {
      var ppt = Object.create(Super.prototype);
      pt.__proto__ = ppt;
    }

    if (!(pt instanceof Super)) {
      var t = function t() {};

      t.prototype = Super.prototype;
      t = new t();
      copy(pt, t);
      Class.prototype = pt = t;
    }

    if (pt.constructor != Class) {
      if (typeof Class != 'function') {
        console.error("unknow Class:" + Class);
      }

      pt.constructor = Class;
    }
  }

  var htmlns = 'http://www.w3.org/1999/xhtml'; // Node Types

  var NodeType = {};
  var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
  var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
  var TEXT_NODE = NodeType.TEXT_NODE = 3;
  var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
  var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
  var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
  var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
  var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
  var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
  var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
  var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
  var NOTATION_NODE = NodeType.NOTATION_NODE = 12; // ExceptionCode

  var ExceptionCode = {};
  var ExceptionMessage = {};
  ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
  ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
  var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
  ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
  ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
  ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
  ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
  var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
  ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
  var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10); //level2

  ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
  ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
  ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
  ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
  ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);

  function DOMException(code, message) {
    if (message instanceof Error) {
      var error = message;
    } else {
      error = this;
      Error.call(this, ExceptionMessage[code]);
      this.message = ExceptionMessage[code];
      if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
    }

    error.code = code;
    if (message) this.message = this.message + ": " + message;
    return error;
  }

  DOMException.prototype = Error.prototype;
  copy(ExceptionCode, DOMException);
  /**
   * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
   * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
   * The items in the NodeList are accessible via an integral index, starting from 0.
   */

  function NodeList() {}

  NodeList.prototype = {
    /**
     * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
     * @standard level1
     */
    length: 0,

    /**
     * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
     * @standard level1
     * @param index  unsigned long 
     *   Index into the collection.
     * @return Node
     * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
     */
    item: function item(index) {
      return this[index] || null;
    },
    toString: function toString(isHTML, nodeFilter) {
      for (var buf = [], i = 0; i < this.length; i++) {
        serializeToString(this[i], buf, isHTML, nodeFilter);
      }

      return buf.join('');
    }
  };

  function LiveNodeList(node, refresh) {
    this._node = node;
    this._refresh = refresh;

    _updateLiveList(this);
  }

  function _updateLiveList(list) {
    var inc = list._node._inc || list._node.ownerDocument._inc;

    if (list._inc != inc) {
      var ls = list._refresh(list._node); //console.log(ls.length)


      __set__(list, 'length', ls.length);

      copy(ls, list);
      list._inc = inc;
    }
  }

  LiveNodeList.prototype.item = function (i) {
    _updateLiveList(this);

    return this[i];
  };

  _extends(LiveNodeList, NodeList);
  /**
   * 
   * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
   * NamedNodeMap objects in the DOM are live.
   * used for attributes or DocumentType entities 
   */


  function NamedNodeMap() {}

  function _findNodeIndex(list, node) {
    var i = list.length;

    while (i--) {
      if (list[i] === node) {
        return i;
      }
    }
  }

  function _addNamedNode(el, list, newAttr, oldAttr) {
    if (oldAttr) {
      list[_findNodeIndex(list, oldAttr)] = newAttr;
    } else {
      list[list.length++] = newAttr;
    }

    if (el) {
      newAttr.ownerElement = el;
      var doc = el.ownerDocument;

      if (doc) {
        oldAttr && _onRemoveAttribute(doc, el, oldAttr);

        _onAddAttribute(doc, el, newAttr);
      }
    }
  }

  function _removeNamedNode(el, list, attr) {
    //console.log('remove attr:'+attr)
    var i = _findNodeIndex(list, attr);

    if (i >= 0) {
      var lastIndex = list.length - 1;

      while (i < lastIndex) {
        list[i] = list[++i];
      }

      list.length = lastIndex;

      if (el) {
        var doc = el.ownerDocument;

        if (doc) {
          _onRemoveAttribute(doc, el, attr);

          attr.ownerElement = null;
        }
      }
    } else {
      throw DOMException(NOT_FOUND_ERR, new Error(el.tagName + '@' + attr));
    }
  }

  NamedNodeMap.prototype = {
    length: 0,
    item: NodeList.prototype.item,
    getNamedItem: function getNamedItem(key) {
      //		if(key.indexOf(':')>0 || key == 'xmlns'){
      //			return null;
      //		}
      //console.log()
      var i = this.length;

      while (i--) {
        var attr = this[i]; //console.log(attr.nodeName,key)

        if (attr.nodeName == key) {
          return attr;
        }
      }
    },
    setNamedItem: function setNamedItem(attr) {
      var el = attr.ownerElement;

      if (el && el != this._ownerElement) {
        throw new DOMException(INUSE_ATTRIBUTE_ERR);
      }

      var oldAttr = this.getNamedItem(attr.nodeName);

      _addNamedNode(this._ownerElement, this, attr, oldAttr);

      return oldAttr;
    },

    /* returns Node */
    setNamedItemNS: function setNamedItemNS(attr) {
      // raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
      var el = attr.ownerElement,
          oldAttr;

      if (el && el != this._ownerElement) {
        throw new DOMException(INUSE_ATTRIBUTE_ERR);
      }

      oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);

      _addNamedNode(this._ownerElement, this, attr, oldAttr);

      return oldAttr;
    },

    /* returns Node */
    removeNamedItem: function removeNamedItem(key) {
      var attr = this.getNamedItem(key);

      _removeNamedNode(this._ownerElement, this, attr);

      return attr;
    },
    // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
    //for level2
    removeNamedItemNS: function removeNamedItemNS(namespaceURI, localName) {
      var attr = this.getNamedItemNS(namespaceURI, localName);

      _removeNamedNode(this._ownerElement, this, attr);

      return attr;
    },
    getNamedItemNS: function getNamedItemNS(namespaceURI, localName) {
      var i = this.length;

      while (i--) {
        var node = this[i];

        if (node.localName == localName && node.namespaceURI == namespaceURI) {
          return node;
        }
      }

      return null;
    }
  };
  /**
   * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
   */

  function DOMImplementation(
  /* Object */
  features) {
    this._features = {};

    if (features) {
      for (var feature in features) {
        this._features = features[feature];
      }
    }
  }

  DOMImplementation.prototype = {
    hasFeature: function hasFeature(
    /* string */
    feature,
    /* string */
    version) {
      var versions = this._features[feature.toLowerCase()];

      if (versions && (!version || version in versions)) {
        return true;
      } else {
        return false;
      }
    },
    // Introduced in DOM Level 2:
    createDocument: function createDocument(namespaceURI, qualifiedName, doctype) {
      // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
      var doc = new Document();
      doc.implementation = this;
      doc.childNodes = new NodeList();
      doc.doctype = doctype;

      if (doctype) {
        doc.appendChild(doctype);
      }

      if (qualifiedName) {
        var root = doc.createElementNS(namespaceURI, qualifiedName);
        doc.appendChild(root);
      }

      return doc;
    },
    // Introduced in DOM Level 2:
    createDocumentType: function createDocumentType(qualifiedName, publicId, systemId) {
      // raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
      var node = new DocumentType();
      node.name = qualifiedName;
      node.nodeName = qualifiedName;
      node.publicId = publicId;
      node.systemId = systemId; // Introduced in DOM Level 2:
      //readonly attribute DOMString        internalSubset;
      //TODO:..
      //  readonly attribute NamedNodeMap     entities;
      //  readonly attribute NamedNodeMap     notations;

      return node;
    }
  };
  /**
   * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
   */

  function Node$1() {}

  Node$1.prototype = {
    firstChild: null,
    lastChild: null,
    previousSibling: null,
    nextSibling: null,
    attributes: null,
    parentNode: null,
    childNodes: null,
    ownerDocument: null,
    nodeValue: null,
    namespaceURI: null,
    prefix: null,
    localName: null,
    // Modified in DOM Level 2:
    insertBefore: function insertBefore(newChild, refChild) {
      //raises 
      return _insertBefore(this, newChild, refChild);
    },
    replaceChild: function replaceChild(newChild, oldChild) {
      //raises 
      this.insertBefore(newChild, oldChild);

      if (oldChild) {
        this.removeChild(oldChild);
      }
    },
    removeChild: function removeChild(oldChild) {
      return _removeChild(this, oldChild);
    },
    appendChild: function appendChild(newChild) {
      return this.insertBefore(newChild, null);
    },
    hasChildNodes: function hasChildNodes() {
      return this.firstChild != null;
    },
    cloneNode: function cloneNode(deep) {
      return _cloneNode(this.ownerDocument || this, this, deep);
    },
    // Modified in DOM Level 2:
    normalize: function normalize() {
      var child = this.firstChild;

      while (child) {
        var next = child.nextSibling;

        if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
          this.removeChild(next);
          child.appendData(next.data);
        } else {
          child.normalize();
          child = next;
        }
      }
    },
    // Introduced in DOM Level 2:
    isSupported: function isSupported(feature, version) {
      return this.ownerDocument.implementation.hasFeature(feature, version);
    },
    // Introduced in DOM Level 2:
    hasAttributes: function hasAttributes() {
      return this.attributes.length > 0;
    },
    lookupPrefix: function lookupPrefix(namespaceURI) {
      var el = this;

      while (el) {
        var map = el._nsMap; //console.dir(map)

        if (map) {
          for (var n in map) {
            if (map[n] == namespaceURI) {
              return n;
            }
          }
        }

        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }

      return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI: function lookupNamespaceURI(prefix) {
      var el = this;

      while (el) {
        var map = el._nsMap; //console.dir(map)

        if (map) {
          if (prefix in map) {
            return map[prefix];
          }
        }

        el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
      }

      return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace: function isDefaultNamespace(namespaceURI) {
      var prefix = this.lookupPrefix(namespaceURI);
      return prefix == null;
    }
  };

  function _xmlEncoder(c) {
    return c == '<' && '&lt;' || c == '>' && '&gt;' || c == '&' && '&amp;' || c == '"' && '&quot;' || '&#' + c.charCodeAt() + ';';
  }

  copy(NodeType, Node$1);
  copy(NodeType, Node$1.prototype);
  /**
   * @param callback return true for continue,false for break
   * @return boolean true: break visit;
   */

  function _visitNode(node, callback) {
    if (callback(node)) {
      return true;
    }

    if (node = node.firstChild) {
      do {
        if (_visitNode(node, callback)) {
          return true;
        }
      } while (node = node.nextSibling);
    }
  }

  function Document() {}

  function _onAddAttribute(doc, el, newAttr) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;

    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      el._nsMap[newAttr.prefix ? newAttr.localName : ''] = newAttr.value;
    }
  }

  function _onRemoveAttribute(doc, el, newAttr, remove) {
    doc && doc._inc++;
    var ns = newAttr.namespaceURI;

    if (ns == 'http://www.w3.org/2000/xmlns/') {
      //update namespace
      delete el._nsMap[newAttr.prefix ? newAttr.localName : ''];
    }
  }

  function _onUpdateChild(doc, el, newChild) {
    if (doc && doc._inc) {
      doc._inc++; //update childNodes

      var cs = el.childNodes;

      if (newChild) {
        cs[cs.length++] = newChild;
      } else {
        //console.log(1)
        var child = el.firstChild;
        var i = 0;

        while (child) {
          cs[i++] = child;
          child = child.nextSibling;
        }

        cs.length = i;
      }
    }
  }
  /**
   * attributes;
   * children;
   * 
   * writeable properties:
   * nodeValue,Attr:value,CharacterData:data
   * prefix
   */


  function _removeChild(parentNode, child) {
    var previous = child.previousSibling;
    var next = child.nextSibling;

    if (previous) {
      previous.nextSibling = next;
    } else {
      parentNode.firstChild = next;
    }

    if (next) {
      next.previousSibling = previous;
    } else {
      parentNode.lastChild = previous;
    }

    _onUpdateChild(parentNode.ownerDocument, parentNode);

    return child;
  }
  /**
   * preformance key(refChild == null)
   */


  function _insertBefore(parentNode, newChild, nextChild) {
    var cp = newChild.parentNode;

    if (cp) {
      cp.removeChild(newChild); //remove and update
    }

    if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
      var newFirst = newChild.firstChild;

      if (newFirst == null) {
        return newChild;
      }

      var newLast = newChild.lastChild;
    } else {
      newFirst = newLast = newChild;
    }

    var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;
    newFirst.previousSibling = pre;
    newLast.nextSibling = nextChild;

    if (pre) {
      pre.nextSibling = newFirst;
    } else {
      parentNode.firstChild = newFirst;
    }

    if (nextChild == null) {
      parentNode.lastChild = newLast;
    } else {
      nextChild.previousSibling = newLast;
    }

    do {
      newFirst.parentNode = parentNode;
    } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));

    _onUpdateChild(parentNode.ownerDocument || parentNode, parentNode); //console.log(parentNode.lastChild.nextSibling == null)


    if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
      newChild.firstChild = newChild.lastChild = null;
    }

    return newChild;
  }

  function _appendSingleChild(parentNode, newChild) {
    var cp = newChild.parentNode;

    if (cp) {
      var pre = parentNode.lastChild;
      cp.removeChild(newChild); //remove and update

      var pre = parentNode.lastChild;
    }

    var pre = parentNode.lastChild;
    newChild.parentNode = parentNode;
    newChild.previousSibling = pre;
    newChild.nextSibling = null;

    if (pre) {
      pre.nextSibling = newChild;
    } else {
      parentNode.firstChild = newChild;
    }

    parentNode.lastChild = newChild;

    _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);

    return newChild; //console.log("__aa",parentNode.lastChild.nextSibling == null)
  }

  Document.prototype = {
    //implementation : null,
    nodeName: '#document',
    nodeType: DOCUMENT_NODE,
    doctype: null,
    documentElement: null,
    _inc: 1,
    insertBefore: function insertBefore(newChild, refChild) {
      //raises 
      if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
        var child = newChild.firstChild;

        while (child) {
          var next = child.nextSibling;
          this.insertBefore(child, refChild);
          child = next;
        }

        return newChild;
      }

      if (this.documentElement == null && newChild.nodeType == ELEMENT_NODE) {
        this.documentElement = newChild;
      }

      return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, newChild;
    },
    removeChild: function removeChild(oldChild) {
      if (this.documentElement == oldChild) {
        this.documentElement = null;
      }

      return _removeChild(this, oldChild);
    },
    // Introduced in DOM Level 2:
    importNode: function importNode(importedNode, deep) {
      return _importNode(this, importedNode, deep);
    },
    // Introduced in DOM Level 2:
    getElementById: function getElementById(id) {
      var rtv = null;

      _visitNode(this.documentElement, function (node) {
        if (node.nodeType == ELEMENT_NODE) {
          if (node.getAttribute('id') == id) {
            rtv = node;
            return true;
          }
        }
      });

      return rtv;
    },
    //document factory method:
    createElement: function createElement(tagName) {
      var node = new Element$1();
      node.ownerDocument = this;
      node.nodeName = tagName;
      node.tagName = tagName;
      node.childNodes = new NodeList();
      var attrs = node.attributes = new NamedNodeMap();
      attrs._ownerElement = node;
      return node;
    },
    createDocumentFragment: function createDocumentFragment() {
      var node = new DocumentFragment();
      node.ownerDocument = this;
      node.childNodes = new NodeList();
      return node;
    },
    createTextNode: function createTextNode(data) {
      var node = new Text();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createComment: function createComment(data) {
      var node = new Comment();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createCDATASection: function createCDATASection(data) {
      var node = new CDATASection();
      node.ownerDocument = this;
      node.appendData(data);
      return node;
    },
    createProcessingInstruction: function createProcessingInstruction(target, data) {
      var node = new ProcessingInstruction();
      node.ownerDocument = this;
      node.tagName = node.target = target;
      node.nodeValue = node.data = data;
      return node;
    },
    createAttribute: function createAttribute(name) {
      var node = new Attr();
      node.ownerDocument = this;
      node.name = name;
      node.nodeName = name;
      node.localName = name;
      node.specified = true;
      return node;
    },
    createEntityReference: function createEntityReference(name) {
      var node = new EntityReference();
      node.ownerDocument = this;
      node.nodeName = name;
      return node;
    },
    // Introduced in DOM Level 2:
    createElementNS: function createElementNS(namespaceURI, qualifiedName) {
      var node = new Element$1();
      var pl = qualifiedName.split(':');
      var attrs = node.attributes = new NamedNodeMap();
      node.childNodes = new NodeList();
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.tagName = qualifiedName;
      node.namespaceURI = namespaceURI;

      if (pl.length == 2) {
        node.prefix = pl[0];
        node.localName = pl[1];
      } else {
        //el.prefix = null;
        node.localName = qualifiedName;
      }

      attrs._ownerElement = node;
      return node;
    },
    // Introduced in DOM Level 2:
    createAttributeNS: function createAttributeNS(namespaceURI, qualifiedName) {
      var node = new Attr();
      var pl = qualifiedName.split(':');
      node.ownerDocument = this;
      node.nodeName = qualifiedName;
      node.name = qualifiedName;
      node.namespaceURI = namespaceURI;
      node.specified = true;

      if (pl.length == 2) {
        node.prefix = pl[0];
        node.localName = pl[1];
      } else {
        //el.prefix = null;
        node.localName = qualifiedName;
      }

      return node;
    }
  };

  _extends(Document, Node$1);

  function Element$1() {
    this._nsMap = {};
  }

  Element$1.prototype = {
    nodeType: ELEMENT_NODE,
    hasAttribute: function hasAttribute(name) {
      return this.getAttributeNode(name) != null;
    },
    getAttribute: function getAttribute(name) {
      var attr = this.getAttributeNode(name);
      return attr && attr.value || '';
    },
    getAttributeNode: function getAttributeNode(name) {
      return this.attributes.getNamedItem(name);
    },
    setAttribute: function setAttribute(name, value) {
      var attr = this.ownerDocument.createAttribute(name);
      attr.value = attr.nodeValue = "" + value;
      this.setAttributeNode(attr);
    },
    removeAttribute: function removeAttribute(name) {
      var attr = this.getAttributeNode(name);
      attr && this.removeAttributeNode(attr);
    },
    //four real opeartion method
    appendChild: function appendChild(newChild) {
      if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
        return this.insertBefore(newChild, null);
      } else {
        return _appendSingleChild(this, newChild);
      }
    },
    setAttributeNode: function setAttributeNode(newAttr) {
      return this.attributes.setNamedItem(newAttr);
    },
    setAttributeNodeNS: function setAttributeNodeNS(newAttr) {
      return this.attributes.setNamedItemNS(newAttr);
    },
    removeAttributeNode: function removeAttributeNode(oldAttr) {
      //console.log(this == oldAttr.ownerElement)
      return this.attributes.removeNamedItem(oldAttr.nodeName);
    },
    //get real attribute name,and remove it by removeAttributeNode
    removeAttributeNS: function removeAttributeNS(namespaceURI, localName) {
      var old = this.getAttributeNodeNS(namespaceURI, localName);
      old && this.removeAttributeNode(old);
    },
    hasAttributeNS: function hasAttributeNS(namespaceURI, localName) {
      return this.getAttributeNodeNS(namespaceURI, localName) != null;
    },
    getAttributeNS: function getAttributeNS(namespaceURI, localName) {
      var attr = this.getAttributeNodeNS(namespaceURI, localName);
      return attr && attr.value || '';
    },
    setAttributeNS: function setAttributeNS(namespaceURI, qualifiedName, value) {
      var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
      attr.value = attr.nodeValue = "" + value;
      this.setAttributeNode(attr);
    },
    getAttributeNodeNS: function getAttributeNodeNS(namespaceURI, localName) {
      return this.attributes.getNamedItemNS(namespaceURI, localName);
    },
    getElementsByTagName: function getElementsByTagName(tagName) {
      return new LiveNodeList(this, function (base) {
        var ls = [];

        _visitNode(base, function (node) {
          if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)) {
            ls.push(node);
          }
        });

        return ls;
      });
    },
    getElementsByTagNameNS: function getElementsByTagNameNS(namespaceURI, localName) {
      return new LiveNodeList(this, function (base) {
        var ls = [];

        _visitNode(base, function (node) {
          if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)) {
            ls.push(node);
          }
        });

        return ls;
      });
    }
  };
  Document.prototype.getElementsByTagName = Element$1.prototype.getElementsByTagName;
  Document.prototype.getElementsByTagNameNS = Element$1.prototype.getElementsByTagNameNS;

  _extends(Element$1, Node$1);

  function Attr() {}

  Attr.prototype.nodeType = ATTRIBUTE_NODE;

  _extends(Attr, Node$1);

  function CharacterData() {}

  CharacterData.prototype = {
    data: '',
    substringData: function substringData(offset, count) {
      return this.data.substring(offset, offset + count);
    },
    appendData: function appendData(text) {
      text = this.data + text;
      this.nodeValue = this.data = text;
      this.length = text.length;
    },
    insertData: function insertData(offset, text) {
      this.replaceData(offset, 0, text);
    },
    appendChild: function appendChild(newChild) {
      throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
    },
    deleteData: function deleteData(offset, count) {
      this.replaceData(offset, count, "");
    },
    replaceData: function replaceData(offset, count, text) {
      var start = this.data.substring(0, offset);
      var end = this.data.substring(offset + count);
      text = start + text + end;
      this.nodeValue = this.data = text;
      this.length = text.length;
    }
  };

  _extends(CharacterData, Node$1);

  function Text() {}

  Text.prototype = {
    nodeName: "#text",
    nodeType: TEXT_NODE,
    splitText: function splitText(offset) {
      var text = this.data;
      var newText = text.substring(offset);
      text = text.substring(0, offset);
      this.data = this.nodeValue = text;
      this.length = text.length;
      var newNode = this.ownerDocument.createTextNode(newText);

      if (this.parentNode) {
        this.parentNode.insertBefore(newNode, this.nextSibling);
      }

      return newNode;
    }
  };

  _extends(Text, CharacterData);

  function Comment() {}

  Comment.prototype = {
    nodeName: "#comment",
    nodeType: COMMENT_NODE
  };

  _extends(Comment, CharacterData);

  function CDATASection() {}

  CDATASection.prototype = {
    nodeName: "#cdata-section",
    nodeType: CDATA_SECTION_NODE
  };

  _extends(CDATASection, CharacterData);

  function DocumentType() {}

  DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;

  _extends(DocumentType, Node$1);

  function Notation() {}

  Notation.prototype.nodeType = NOTATION_NODE;

  _extends(Notation, Node$1);

  function Entity() {}

  Entity.prototype.nodeType = ENTITY_NODE;

  _extends(Entity, Node$1);

  function EntityReference() {}

  EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;

  _extends(EntityReference, Node$1);

  function DocumentFragment() {}

  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;

  _extends(DocumentFragment, Node$1);

  function ProcessingInstruction() {}

  ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;

  _extends(ProcessingInstruction, Node$1);

  function XMLSerializer$1() {}

  XMLSerializer$1.prototype.serializeToString = function (node, isHtml, nodeFilter) {
    return nodeSerializeToString.call(node, isHtml, nodeFilter);
  };

  Node$1.prototype.toString = nodeSerializeToString;

  function nodeSerializeToString(isHtml, nodeFilter) {
    var buf = [];
    var refNode = this.nodeType == 9 ? this.documentElement : this;
    var prefix = refNode.prefix;
    var uri = refNode.namespaceURI;

    if (uri && prefix == null) {
      //console.log(prefix)
      var prefix = refNode.lookupPrefix(uri);

      if (prefix == null) {
        //isHTML = true;
        var visibleNamespaces = [{
          namespace: uri,
          prefix: null
        } //{namespace:uri,prefix:''}
        ];
      }
    }

    serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces); //console.log('###',this.nodeType,uri,prefix,buf.join(''))

    return buf.join('');
  }

  function needNamespaceDefine(node, isHTML, visibleNamespaces) {
    var prefix = node.prefix || '';
    var uri = node.namespaceURI;

    if (!prefix && !uri) {
      return false;
    }

    if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" || uri == 'http://www.w3.org/2000/xmlns/') {
      return false;
    }

    var i = visibleNamespaces.length; //console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)

    while (i--) {
      var ns = visibleNamespaces[i]; // get namespace prefix
      //console.log(node.nodeType,node.tagName,ns.prefix,prefix)

      if (ns.prefix == prefix) {
        return ns.namespace != uri;
      }
    } //console.log(isHTML,uri,prefix=='')
    //if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
    //	return false;
    //}
    //node.flag = '11111'
    //console.error(3,true,node.flag,node.prefix,node.namespaceURI)


    return true;
  }

  function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
    if (nodeFilter) {
      node = nodeFilter(node);

      if (node) {
        if (typeof node == 'string') {
          buf.push(node);
          return;
        }
      } else {
        return;
      } //buf.sort.apply(attrs, attributeSorter);

    }

    switch (node.nodeType) {
      case ELEMENT_NODE:
        if (!visibleNamespaces) visibleNamespaces = [];
        visibleNamespaces.length;
        var attrs = node.attributes;
        var len = attrs.length;
        var child = node.firstChild;
        var nodeName = node.tagName;
        isHTML = htmlns === node.namespaceURI || isHTML;
        buf.push('<', nodeName);

        for (var i = 0; i < len; i++) {
          // add namespaces for attributes
          var attr = attrs.item(i);

          if (attr.prefix == 'xmlns') {
            visibleNamespaces.push({
              prefix: attr.localName,
              namespace: attr.value
            });
          } else if (attr.nodeName == 'xmlns') {
            visibleNamespaces.push({
              prefix: '',
              namespace: attr.value
            });
          }
        }

        for (var i = 0; i < len; i++) {
          var attr = attrs.item(i);

          if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
            var prefix = attr.prefix || '';
            var uri = attr.namespaceURI;
            var ns = prefix ? ' xmlns:' + prefix : " xmlns";
            buf.push(ns, '="', uri, '"');
            visibleNamespaces.push({
              prefix: prefix,
              namespace: uri
            });
          }

          serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
        } // add namespace for current node		


        if (needNamespaceDefine(node, isHTML, visibleNamespaces)) {
          var prefix = node.prefix || '';
          var uri = node.namespaceURI;
          var ns = prefix ? ' xmlns:' + prefix : " xmlns";
          buf.push(ns, '="', uri, '"');
          visibleNamespaces.push({
            prefix: prefix,
            namespace: uri
          });
        }

        if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
          buf.push('>'); //if is cdata child node

          if (isHTML && /^script$/i.test(nodeName)) {
            while (child) {
              if (child.data) {
                buf.push(child.data);
              } else {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
              }

              child = child.nextSibling;
            }
          } else {
            while (child) {
              serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
              child = child.nextSibling;
            }
          }

          buf.push('</', nodeName, '>');
        } else {
          buf.push('/>');
        } // remove added visible namespaces
        //visibleNamespaces.length = startVisibleNamespaces;


        return;

      case DOCUMENT_NODE:
      case DOCUMENT_FRAGMENT_NODE:
        var child = node.firstChild;

        while (child) {
          serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces);
          child = child.nextSibling;
        }

        return;

      case ATTRIBUTE_NODE:
        return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g, _xmlEncoder), '"');

      case TEXT_NODE:
        return buf.push(node.data.replace(/[<&]/g, _xmlEncoder));

      case CDATA_SECTION_NODE:
        return buf.push('<![CDATA[', node.data, ']]>');

      case COMMENT_NODE:
        return buf.push("<!--", node.data, "-->");

      case DOCUMENT_TYPE_NODE:
        var pubid = node.publicId;
        var sysid = node.systemId;
        buf.push('<!DOCTYPE ', node.name);

        if (pubid) {
          buf.push(' PUBLIC "', pubid);

          if (sysid && sysid != '.') {
            buf.push('" "', sysid);
          }

          buf.push('">');
        } else if (sysid && sysid != '.') {
          buf.push(' SYSTEM "', sysid, '">');
        } else {
          var sub = node.internalSubset;

          if (sub) {
            buf.push(" [", sub, "]");
          }

          buf.push(">");
        }

        return;

      case PROCESSING_INSTRUCTION_NODE:
        return buf.push("<?", node.target, " ", node.data, "?>");

      case ENTITY_REFERENCE_NODE:
        return buf.push('&', node.nodeName, ';');
      //case ENTITY_NODE:
      //case NOTATION_NODE:

      default:
        buf.push('??', node.nodeName);
    }
  }

  function _importNode(doc, node, deep) {
    var node2;

    switch (node.nodeType) {
      case ELEMENT_NODE:
        node2 = node.cloneNode(false);
        node2.ownerDocument = doc;
      //var attrs = node2.attributes;
      //var len = attrs.length;
      //for(var i=0;i<len;i++){
      //node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
      //}

      case DOCUMENT_FRAGMENT_NODE:
        break;

      case ATTRIBUTE_NODE:
        deep = true;
        break;
      //case ENTITY_REFERENCE_NODE:
      //case PROCESSING_INSTRUCTION_NODE:
      ////case TEXT_NODE:
      //case CDATA_SECTION_NODE:
      //case COMMENT_NODE:
      //	deep = false;
      //	break;
      //case DOCUMENT_NODE:
      //case DOCUMENT_TYPE_NODE:
      //cannot be imported.
      //case ENTITY_NODE:
      //case NOTATION_NODE：
      //can not hit in level3
      //default:throw e;
    }

    if (!node2) {
      node2 = node.cloneNode(false); //false
    }

    node2.ownerDocument = doc;
    node2.parentNode = null;

    if (deep) {
      var child = node.firstChild;

      while (child) {
        node2.appendChild(_importNode(doc, child, deep));
        child = child.nextSibling;
      }
    }

    return node2;
  } //
  //var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
  //					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};


  function _cloneNode(doc, node, deep) {
    var node2 = new node.constructor();

    for (var n in node) {
      var v = node[n];

      if (_typeof(v) != 'object') {
        if (v != node2[n]) {
          node2[n] = v;
        }
      }
    }

    if (node.childNodes) {
      node2.childNodes = new NodeList();
    }

    node2.ownerDocument = doc;

    switch (node2.nodeType) {
      case ELEMENT_NODE:
        var attrs = node.attributes;
        var attrs2 = node2.attributes = new NamedNodeMap();
        var len = attrs.length;
        attrs2._ownerElement = node2;

        for (var i = 0; i < len; i++) {
          node2.setAttributeNode(_cloneNode(doc, attrs.item(i), true));
        }

        break;

      case ATTRIBUTE_NODE:
        deep = true;
    }

    if (deep) {
      var child = node.firstChild;

      while (child) {
        node2.appendChild(_cloneNode(doc, child, deep));
        child = child.nextSibling;
      }
    }

    return node2;
  }

  function __set__(object, key, value) {
    object[key] = value;
  } //do dynamic


  try {
    if (Object.defineProperty) {
      var getTextContent = function getTextContent(node) {
        switch (node.nodeType) {
          case ELEMENT_NODE:
          case DOCUMENT_FRAGMENT_NODE:
            var buf = [];
            node = node.firstChild;

            while (node) {
              if (node.nodeType !== 7 && node.nodeType !== 8) {
                buf.push(getTextContent(node));
              }

              node = node.nextSibling;
            }

            return buf.join('');

          default:
            return node.nodeValue;
        }
      };

      Object.defineProperty(LiveNodeList.prototype, 'length', {
        get: function get() {
          _updateLiveList(this);

          return this.$$length;
        }
      });
      Object.defineProperty(Node$1.prototype, 'textContent', {
        get: function get() {
          return getTextContent(this);
        },
        set: function set(data) {
          switch (this.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              while (this.firstChild) {
                this.removeChild(this.firstChild);
              }

              if (data || String(data)) {
                this.appendChild(this.ownerDocument.createTextNode(data));
              }

              break;

            default:
              //TODO:
              this.data = data;
              this.value = data;
              this.nodeValue = data;
          }
        }
      });

      __set__ = function __set__(object, key, value) {
        //console.log(value)
        object['$$' + key] = value;
      };
    }
  } catch (e) {//ie8
  } //if(typeof require == 'function'){


  var DOMImplementation_1 = DOMImplementation;
  var XMLSerializer_1 = XMLSerializer$1; //}

  var dom = {
    DOMImplementation: DOMImplementation_1,
    XMLSerializer: XMLSerializer_1
  };
  createCommonjsModule(function (module, exports) {
    function DOMParser(options) {
      this.options = options || {
        locator: {}
      };
    }

    DOMParser.prototype.parseFromString = function (source, mimeType) {
      var options = this.options;
      var sax = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler(); //contentHandler and LexicalHandler

      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var entityMap = {
        'lt': '<',
        'gt': '>',
        'amp': '&',
        'quot': '"',
        'apos': "'"
      };

      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }

      sax.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax.domBuilder = options.domBuilder || domBuilder;

      if (/\/x?html?$/.test(mimeType)) {
        entityMap.nbsp = '\xa0';
        entityMap.copy = '\xa9';
        defaultNSMap[''] = 'http://www.w3.org/1999/xhtml';
      }

      defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';

      if (source) {
        sax.parse(source, defaultNSMap, entityMap);
      } else {
        sax.errorHandler.error("invalid doc source");
      }

      return domBuilder.doc;
    };

    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }

        errorImpl = domBuilder;
      }

      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};

      function build(key) {
        var fn = errorImpl[key];

        if (!fn && isCallback) {
          fn = errorImpl.length == 2 ? function (msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }

        errorHandler[key] = fn && function (msg) {
          fn('[xmldom ' + key + ']\t' + msg + _locator(locator));
        } || function () {};
      }

      build('warning');
      build('error');
      build('fatalError');
      return errorHandler;
    } //console.log('#\n\n\n\n\n\n\n####')

    /**
     * +ContentHandler+ErrorHandler
     * +LexicalHandler+EntityResolver2
     * -DeclHandler-DTDHandler 
     * 
     * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
     * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
     * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
     */


    function DOMHandler() {
      this.cdata = false;
    }

    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    /**
     * @see org.xml.sax.ContentHandler#startDocument
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
     */


    DOMHandler.prototype = {
      startDocument: function startDocument() {
        this.doc = new DOMImplementation().createDocument(null, null, null);

        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function startElement(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);

        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function endElement(namespaceURI, localName, qName) {
        var current = this.currentElement;
        current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function startPrefixMapping(prefix, uri) {},
      endPrefixMapping: function endPrefixMapping(prefix) {},
      processingInstruction: function processingInstruction(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function ignorableWhitespace(ch, start, length) {},
      characters: function characters(chars, start, length) {
        chars = _toString.apply(this, arguments); //console.log(chars)

        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }

          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode); //process xml
          }

          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function skippedEntity(name) {},
      endDocument: function endDocument() {
        this.doc.normalize();
      },
      setDocumentLocator: function setDocumentLocator(locator) {
        if (this.locator = locator) {
          // && !('lineNumber' in locator)){
          locator.lineNumber = 0;
        }
      },
      //LexicalHandler
      comment: function comment(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function startCDATA() {
        //used in characters() methods
        this.cdata = true;
      },
      endCDATA: function endCDATA() {
        this.cdata = false;
      },
      startDTD: function startDTD(name, publicId, systemId) {
        var impl = this.doc.implementation;

        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
        }
      },

      /**
       * @see org.xml.sax.ErrorHandler
       * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function warning(error) {
        console.warn('[xmldom warning]\t' + error, _locator(this.locator));
      },
      error: function error(_error) {
        console.error('[xmldom error]\t' + _error, _locator(this.locator));
      },
      fatalError: function fatalError(error) {
        console.error('[xmldom fatalError]\t' + error, _locator(this.locator));
        throw error;
      }
    };

    function _locator(l) {
      if (l) {
        return '\n@' + (l.systemId || '') + '#[line:' + l.lineNumber + ',col:' + l.columnNumber + ']';
      }
    }

    function _toString(chars, start, length) {
      if (typeof chars == 'string') {
        return chars.substr(start, length);
      } else {
        //java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + '';
        }

        return chars;
      }
    }
    /*
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
     * used method of org.xml.sax.ext.LexicalHandler:
     *  #comment(chars, start, length)
     *  #startCDATA()
     *  #endCDATA()
     *  #startDTD(name, publicId, systemId)
     *
     *
     * IGNORED method of org.xml.sax.ext.LexicalHandler:
     *  #endDTD()
     *  #startEntity(name)
     *  #endEntity(name)
     *
     *
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
     * IGNORED method of org.xml.sax.ext.DeclHandler
     * 	#attributeDecl(eName, aName, type, mode, value)
     *  #elementDecl(name, model)
     *  #externalEntityDecl(name, publicId, systemId)
     *  #internalEntityDecl(name, value)
     * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
     * IGNORED method of org.xml.sax.EntityResolver2
     *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
     *  #resolveEntity(publicId, systemId)
     *  #getExternalSubset(name, baseURI)
     * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
     * IGNORED method of org.xml.sax.DTDHandler
     *  #notationDecl(name, publicId, systemId) {};
     *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
     */


    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (key) {
      DOMHandler.prototype[key] = function () {
        return null;
      };
    });
    /* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */

    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    } //appendChild and setAttributeNS are preformance key
    //if(typeof require == 'function'){


    var XMLReader = sax.XMLReader;
    var DOMImplementation = exports.DOMImplementation = dom.DOMImplementation;
    exports.XMLSerializer = dom.XMLSerializer;
    exports.DOMParser = DOMParser; //}
  });
  /*
   * canvg.js - Javascript SVG parser and renderer on Canvas
   * MIT Licensed
   * Gabe Lerner (gabelerner@gmail.com)
   * http://code.google.com/p/canvg/
   *
   * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
   */

  /*
  canvg(target, s)
    empty parameters: replace all 'svg' elements on page with 'canvas' elements
    target: canvas element or the id of a canvas element
    s: svg string, url to svg file, or xml document
    opts: optional hash of options
      ignoreMouse: true => ignore mouse events
      ignoreAnimation: true => ignore animations
      ignoreDimensions: true => does not try to resize canvas
      ignoreClear: true => does not clear canvas
      offsetX: int => draws at a x offset
      offsetY: int => draws at a y offset
      scaleWidth: int => scales horizontally to width
      scaleHeight: int => scales vertically to height
      renderCallback: function => will call the function after the first render is completed
      forceRedraw: function => will call the function on every frame, if it returns true, will redraw
  */

  function canvg(target, s, opts) {
    // no parameters
    if (target == null && s == null && opts == null) {
      var svgTags = document.querySelectorAll('svg');

      for (var i = 0; i < svgTags.length; i++) {
        var svgTag = svgTags[i];
        var c = document.createElement('canvas');
        c.width = svgTag.clientWidth;
        c.height = svgTag.clientHeight;
        svgTag.parentNode.insertBefore(c, svgTag);
        svgTag.parentNode.removeChild(svgTag);
        var div = document.createElement('div');
        div.appendChild(svgTag);
        canvg(c, div.innerHTML);
      }

      return;
    }

    if (typeof target == 'string') {
      target = document.getElementById(target);
    } // store class on canvas


    if (target.svg != null) target.svg.stop();
    var svg = build(opts || {}); // on i.e. 8 for flash canvas, we can't assign the property so check for it

    if (!(target.childNodes.length == 1 && target.childNodes[0].nodeName == 'OBJECT')) target.svg = svg;
    var ctx = target.getContext('2d');

    if (typeof s.documentElement != 'undefined') {
      // load from xml doc
      svg.loadXmlDoc(ctx, s);
    } else if (s.substr(0, 1) == '<') {
      // load from xml string
      svg.loadXml(ctx, s);
    } else {
      // load from url
      svg.load(ctx, s);
    }
  }

  function getMatchesSelector() {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Element.matches
    var matchesSelector;

    if (typeof Element.prototype.matches != 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.matches(selector);
      };
    } else if (typeof Element.prototype.webkitMatchesSelector != 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.webkitMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.mozMatchesSelector != 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.mozMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.msMatchesSelector != 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.msMatchesSelector(selector);
      };
    } else if (typeof Element.prototype.oMatchesSelector != 'undefined') {
      matchesSelector = function matchesSelector(node, selector) {
        return node.oMatchesSelector(selector);
      };
    } else {
      // requires Sizzle: https://github.com/jquery/sizzle/wiki/Sizzle-Documentation
      // or jQuery: http://jquery.com/download/
      // or Zepto: http://zeptojs.com/#
      // without it, this is a ReferenceError
      if (typeof jQuery == 'function' || typeof Zepto == 'function') {
        matchesSelector = function matchesSelector(node, selector) {
          return $(node).is(selector);
        };
      }

      if (typeof matchesSelector == 'undefined') {
        matchesSelector = Sizzle.matchesSelector;
      }
    }

    return matchesSelector;
  }

  function getSelectorSpecificity(selector) {
    var typeCount = [0, 0, 0]; // slightly modified version of https://github.com/keeganstreet/specificity/blob/master/specificity.js

    var attributeRegex = /(\[[^\]]+\])/g;
    var idRegex = /(#[^\s\+>~\.\[:]+)/g;
    var classRegex = /(\.[^\s\+>~\.\[:]+)/g;
    var pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi;
    var pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi;
    var pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g;
    var elementRegex = /([^\s\+>~\.\[:]+)/g;

    var findMatch = function findMatch(regex, type) {
      var matches = selector.match(regex);

      if (matches == null) {
        return;
      }

      typeCount[type] += matches.length;
      selector = selector.replace(regex, ' ');
    };

    selector = selector.replace(/:not\(([^\)]*)\)/g, '     $1 ');
    selector = selector.replace(/{[^]*/gm, ' ');
    findMatch(attributeRegex, 1);
    findMatch(idRegex, 0);
    findMatch(classRegex, 1);
    findMatch(pseudoElementRegex, 2);
    findMatch(pseudoClassWithBracketsRegex, 1);
    findMatch(pseudoClassRegex, 1);
    selector = selector.replace(/[\*\s\+>~]/g, ' ');
    selector = selector.replace(/[#\.]/g, ' ');
    findMatch(elementRegex, 2);
    return typeCount.join('');
  }

  function build(opts) {
    var svg = {
      opts: opts
    };
    var matchesSelector = getMatchesSelector();

    if (typeof CanvasRenderingContext2D != 'undefined') {
      CanvasRenderingContext2D.prototype.drawSvg = function (s, dx, dy, dw, dh, opts) {
        var cOpts = {
          ignoreMouse: true,
          ignoreAnimation: true,
          ignoreDimensions: true,
          ignoreClear: true,
          offsetX: dx,
          offsetY: dy,
          scaleWidth: dw,
          scaleHeight: dh
        };

        for (var prop in opts) {
          if (opts.hasOwnProperty(prop)) {
            cOpts[prop] = opts[prop];
          }
        }

        canvg(this.canvas, s, cOpts);
      };
    }

    svg.FRAMERATE = 30;
    svg.MAX_VIRTUAL_PIXELS = 30000;

    svg.log = function (msg) {};

    if (svg.opts.log == true && typeof console != 'undefined') {
      svg.log = function (msg) {
        console.log(msg);
      };
    } // globals


    svg.init = function (ctx) {
      var uniqueId = 0;

      svg.UniqueId = function () {
        uniqueId++;
        return 'canvg' + uniqueId;
      };

      svg.Definitions = {};
      svg.Styles = {};
      svg.StylesSpecificity = {};
      svg.Animations = [];
      svg.Images = [];
      svg.ctx = ctx;
      svg.ViewPort = new function () {
        this.viewPorts = [];

        this.Clear = function () {
          this.viewPorts = [];
        };

        this.SetCurrent = function (width, height) {
          this.viewPorts.push({
            width: width,
            height: height
          });
        };

        this.RemoveCurrent = function () {
          this.viewPorts.pop();
        };

        this.Current = function () {
          return this.viewPorts[this.viewPorts.length - 1];
        };

        this.width = function () {
          return this.Current().width;
        };

        this.height = function () {
          return this.Current().height;
        };

        this.ComputeSize = function (d) {
          if (d != null && typeof d == 'number') return d;
          if (d == 'x') return this.width();
          if (d == 'y') return this.height();
          return Math.sqrt(Math.pow(this.width(), 2) + Math.pow(this.height(), 2)) / Math.sqrt(2);
        };
      }();
    };

    svg.init(); // images loaded

    svg.ImagesLoaded = function () {
      for (var i = 0; i < svg.Images.length; i++) {
        if (!svg.Images[i].loaded) return false;
      }

      return true;
    }; // trim


    svg.trim = function (s) {
      return s.replace(/^\s+|\s+$/g, '');
    }; // compress spaces


    svg.compressSpaces = function (s) {
      return s.replace(/[\s\r\t\n]+/gm, ' ');
    }; // ajax


    svg.ajax = function (url) {
      var AJAX;

      if (window.XMLHttpRequest) {
        AJAX = new XMLHttpRequest();
      } else {
        AJAX = new ActiveXObject('Microsoft.XMLHTTP');
      }

      if (AJAX) {
        AJAX.open('GET', url, false);
        AJAX.send(null);
        return AJAX.responseText;
      }

      return null;
    }; // parse xml


    svg.parseXml = function (xml) {
      if (typeof Windows != 'undefined' && typeof Windows.Data != 'undefined' && typeof Windows.Data.Xml != 'undefined') {
        var xmlDoc = new Windows.Data.Xml.Dom.XmlDocument();
        var settings = new Windows.Data.Xml.Dom.XmlLoadSettings();
        settings.prohibitDtd = false;
        xmlDoc.loadXml(xml, settings);
        return xmlDoc;
      } else if (window.DOMParser) {
        var parser = new DOMParser();
        return parser.parseFromString(xml, 'text/xml');
      } else {
        xml = xml.replace(/<!DOCTYPE svg[^>]*>/, '');
        var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = 'false';
        xmlDoc.loadXML(xml);
        return xmlDoc;
      }
    };

    svg.Property = function (name, value) {
      this.name = name;
      this.value = value;
    };

    svg.Property.prototype.getValue = function () {
      return this.value;
    };

    svg.Property.prototype.hasValue = function () {
      return this.value != null && this.value != '';
    }; // return the numerical value of the property


    svg.Property.prototype.numValue = function () {
      if (!this.hasValue()) return 0;
      var n = parseFloat(this.value);

      if ((this.value + '').match(/%$/)) {
        n = n / 100.0;
      }

      return n;
    };

    svg.Property.prototype.valueOrDefault = function (def) {
      if (this.hasValue()) return this.value;
      return def;
    };

    svg.Property.prototype.numValueOrDefault = function (def) {
      if (this.hasValue()) return this.numValue();
      return def;
    }; // color extensions
    // augment the current color value with the opacity


    svg.Property.prototype.addOpacity = function (opacityProp) {
      var newValue = this.value;

      if (opacityProp.value != null && opacityProp.value != '' && typeof this.value == 'string') {
        // can only add opacity to colors, not patterns
        var color = new rgbcolor(this.value);

        if (color.ok) {
          newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacityProp.numValue() + ')';
        }
      }

      return new svg.Property(this.name, newValue);
    }; // definition extensions
    // get the definition from the definitions table


    svg.Property.prototype.getDefinition = function () {
      var name = this.value.match(/#([^\)'"]+)/);

      if (name) {
        name = name[1];
      }

      if (!name) {
        name = this.value;
      }

      return svg.Definitions[name];
    };

    svg.Property.prototype.isUrlDefinition = function () {
      return this.value.indexOf('url(') == 0;
    };

    svg.Property.prototype.getFillStyleDefinition = function (e, opacityProp) {
      var def = this.getDefinition(); // gradient

      if (def != null && def.createGradient) {
        return def.createGradient(svg.ctx, e, opacityProp);
      } // pattern


      if (def != null && def.createPattern) {
        if (def.getHrefAttribute().hasValue()) {
          var pt = def.attribute('patternTransform');
          def = def.getHrefAttribute().getDefinition();

          if (pt.hasValue()) {
            def.attribute('patternTransform', true).value = pt.value;
          }
        }

        return def.createPattern(svg.ctx, e);
      }

      return null;
    }; // length extensions


    svg.Property.prototype.getDPI = function (viewPort) {
      return 96.0; // TODO: compute?
    };

    svg.Property.prototype.getEM = function (viewPort) {
      var em = 12;
      var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
      if (fontSize.hasValue()) em = fontSize.toPixels(viewPort);
      return em;
    };

    svg.Property.prototype.getUnits = function () {
      var s = this.value + '';
      return s.replace(/[0-9\.\-]/g, '');
    }; // get the length as pixels


    svg.Property.prototype.toPixels = function (viewPort, processPercent) {
      if (!this.hasValue()) return 0;
      var s = this.value + '';
      if (s.match(/em$/)) return this.numValue() * this.getEM(viewPort);
      if (s.match(/ex$/)) return this.numValue() * this.getEM(viewPort) / 2.0;
      if (s.match(/px$/)) return this.numValue();
      if (s.match(/pt$/)) return this.numValue() * this.getDPI(viewPort) * (1.0 / 72.0);
      if (s.match(/pc$/)) return this.numValue() * 15;
      if (s.match(/cm$/)) return this.numValue() * this.getDPI(viewPort) / 2.54;
      if (s.match(/mm$/)) return this.numValue() * this.getDPI(viewPort) / 25.4;
      if (s.match(/in$/)) return this.numValue() * this.getDPI(viewPort);
      if (s.match(/%$/)) return this.numValue() * svg.ViewPort.ComputeSize(viewPort);
      var n = this.numValue();
      if (processPercent && n < 1.0) return n * svg.ViewPort.ComputeSize(viewPort);
      return n;
    }; // time extensions
    // get the time as milliseconds


    svg.Property.prototype.toMilliseconds = function () {
      if (!this.hasValue()) return 0;
      var s = this.value + '';
      if (s.match(/s$/)) return this.numValue() * 1000;
      if (s.match(/ms$/)) return this.numValue();
      return this.numValue();
    }; // angle extensions
    // get the angle as radians


    svg.Property.prototype.toRadians = function () {
      if (!this.hasValue()) return 0;
      var s = this.value + '';
      if (s.match(/deg$/)) return this.numValue() * (Math.PI / 180.0);
      if (s.match(/grad$/)) return this.numValue() * (Math.PI / 200.0);
      if (s.match(/rad$/)) return this.numValue();
      return this.numValue() * (Math.PI / 180.0);
    }; // text extensions
    // get the text baseline


    var textBaselineMapping = {
      'baseline': 'alphabetic',
      'before-edge': 'top',
      'text-before-edge': 'top',
      'middle': 'middle',
      'central': 'middle',
      'after-edge': 'bottom',
      'text-after-edge': 'bottom',
      'ideographic': 'ideographic',
      'alphabetic': 'alphabetic',
      'hanging': 'hanging',
      'mathematical': 'alphabetic'
    };

    svg.Property.prototype.toTextBaseline = function () {
      if (!this.hasValue()) return null;
      return textBaselineMapping[this.value];
    }; // fonts


    svg.Font = new function () {
      this.Styles = 'normal|italic|oblique|inherit';
      this.Variants = 'normal|small-caps|inherit';
      this.Weights = 'normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit';

      this.CreateFont = function (fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
        var f = inherit != null ? this.Parse(inherit) : this.CreateFont('', '', '', '', '', svg.ctx.font);
        return {
          fontFamily: fontFamily || f.fontFamily,
          fontSize: fontSize || f.fontSize,
          fontStyle: fontStyle || f.fontStyle,
          fontWeight: fontWeight || f.fontWeight,
          fontVariant: fontVariant || f.fontVariant,
          toString: function toString() {
            return [this.fontStyle, this.fontVariant, this.fontWeight, this.fontSize, this.fontFamily].join(' ');
          }
        };
      };

      var that = this;

      this.Parse = function (s) {
        var f = {};
        var d = svg.trim(svg.compressSpaces(s || '')).split(' ');
        var set = {
          fontSize: false,
          fontStyle: false,
          fontWeight: false,
          fontVariant: false
        };
        var ff = '';

        for (var i = 0; i < d.length; i++) {
          if (!set.fontStyle && that.Styles.indexOf(d[i]) != -1) {
            if (d[i] != 'inherit') f.fontStyle = d[i];
            set.fontStyle = true;
          } else if (!set.fontVariant && that.Variants.indexOf(d[i]) != -1) {
            if (d[i] != 'inherit') f.fontVariant = d[i];
            set.fontStyle = set.fontVariant = true;
          } else if (!set.fontWeight && that.Weights.indexOf(d[i]) != -1) {
            if (d[i] != 'inherit') f.fontWeight = d[i];
            set.fontStyle = set.fontVariant = set.fontWeight = true;
          } else if (!set.fontSize) {
            if (d[i] != 'inherit') f.fontSize = d[i].split('/')[0];
            set.fontStyle = set.fontVariant = set.fontWeight = set.fontSize = true;
          } else {
            if (d[i] != 'inherit') ff += d[i];
          }
        }

        if (ff != '') f.fontFamily = ff;
        return f;
      };
    }(); // points and paths

    svg.ToNumberArray = function (s) {
      var a = svg.trim(svg.compressSpaces((s || '').replace(/,/g, ' '))).split(' ');

      for (var i = 0; i < a.length; i++) {
        a[i] = parseFloat(a[i]);
      }

      return a;
    };

    svg.Point = function (x, y) {
      this.x = x;
      this.y = y;
    };

    svg.Point.prototype.angleTo = function (p) {
      return Math.atan2(p.y - this.y, p.x - this.x);
    };

    svg.Point.prototype.applyTransform = function (v) {
      var xp = this.x * v[0] + this.y * v[2] + v[4];
      var yp = this.x * v[1] + this.y * v[3] + v[5];
      this.x = xp;
      this.y = yp;
    };

    svg.CreatePoint = function (s) {
      var a = svg.ToNumberArray(s);
      return new svg.Point(a[0], a[1]);
    };

    svg.CreatePath = function (s) {
      var a = svg.ToNumberArray(s);
      var path = [];

      for (var i = 0; i < a.length; i += 2) {
        path.push(new svg.Point(a[i], a[i + 1]));
      }

      return path;
    }; // bounding box


    svg.BoundingBox = function (x1, y1, x2, y2) {
      // pass in initial points if you want
      this.x1 = Number.NaN;
      this.y1 = Number.NaN;
      this.x2 = Number.NaN;
      this.y2 = Number.NaN;

      this.x = function () {
        return this.x1;
      };

      this.y = function () {
        return this.y1;
      };

      this.width = function () {
        return this.x2 - this.x1;
      };

      this.height = function () {
        return this.y2 - this.y1;
      };

      this.addPoint = function (x, y) {
        if (x != null) {
          if (isNaN(this.x1) || isNaN(this.x2)) {
            this.x1 = x;
            this.x2 = x;
          }

          if (x < this.x1) this.x1 = x;
          if (x > this.x2) this.x2 = x;
        }

        if (y != null) {
          if (isNaN(this.y1) || isNaN(this.y2)) {
            this.y1 = y;
            this.y2 = y;
          }

          if (y < this.y1) this.y1 = y;
          if (y > this.y2) this.y2 = y;
        }
      };

      this.addX = function (x) {
        this.addPoint(x, null);
      };

      this.addY = function (y) {
        this.addPoint(null, y);
      };

      this.addBoundingBox = function (bb) {
        this.addPoint(bb.x1, bb.y1);
        this.addPoint(bb.x2, bb.y2);
      };

      this.addQuadraticCurve = function (p0x, p0y, p1x, p1y, p2x, p2y) {
        var cp1x = p0x + 2 / 3 * (p1x - p0x); // CP1 = QP0 + 2/3 *(QP1-QP0)

        var cp1y = p0y + 2 / 3 * (p1y - p0y); // CP1 = QP0 + 2/3 *(QP1-QP0)

        var cp2x = cp1x + 1 / 3 * (p2x - p0x); // CP2 = CP1 + 1/3 *(QP2-QP0)

        var cp2y = cp1y + 1 / 3 * (p2y - p0y); // CP2 = CP1 + 1/3 *(QP2-QP0)

        this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
      };

      this.addBezierCurve = function (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
        // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
        var p0 = [p0x, p0y],
            p1 = [p1x, p1y],
            p2 = [p2x, p2y],
            p3 = [p3x, p3y];
        this.addPoint(p0[0], p0[1]);
        this.addPoint(p3[0], p3[1]);

        for (var i = 0; i <= 1; i++) {
          var f = function f(t) {
            return Math.pow(1 - t, 3) * p0[i] + 3 * Math.pow(1 - t, 2) * t * p1[i] + 3 * (1 - t) * Math.pow(t, 2) * p2[i] + Math.pow(t, 3) * p3[i];
          };

          var b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
          var a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
          var c = 3 * p1[i] - 3 * p0[i];

          if (a == 0) {
            if (b == 0) continue;
            var t = -c / b;

            if (0 < t && t < 1) {
              if (i == 0) this.addX(f(t));
              if (i == 1) this.addY(f(t));
            }

            continue;
          }

          var b2ac = Math.pow(b, 2) - 4 * c * a;
          if (b2ac < 0) continue;
          var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);

          if (0 < t1 && t1 < 1) {
            if (i == 0) this.addX(f(t1));
            if (i == 1) this.addY(f(t1));
          }

          var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);

          if (0 < t2 && t2 < 1) {
            if (i == 0) this.addX(f(t2));
            if (i == 1) this.addY(f(t2));
          }
        }
      };

      this.isPointInBox = function (x, y) {
        return this.x1 <= x && x <= this.x2 && this.y1 <= y && y <= this.y2;
      };

      this.addPoint(x1, y1);
      this.addPoint(x2, y2);
    }; // transforms


    svg.Transform = function (v) {
      var that = this;
      this.Type = {}; // translate

      this.Type.translate = function (s) {
        this.p = svg.CreatePoint(s);

        this.apply = function (ctx) {
          ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
        };

        this.unapply = function (ctx) {
          ctx.translate(-1.0 * this.p.x || 0.0, -1.0 * this.p.y || 0.0);
        };

        this.applyToPoint = function (p) {
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
        };
      }; // rotate


      this.Type.rotate = function (s) {
        var a = svg.ToNumberArray(s);
        this.angle = new svg.Property('angle', a[0]);
        this.cx = a[1] || 0;
        this.cy = a[2] || 0;

        this.apply = function (ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        };

        this.unapply = function (ctx) {
          ctx.translate(this.cx, this.cy);
          ctx.rotate(-1.0 * this.angle.toRadians());
          ctx.translate(-this.cx, -this.cy);
        };

        this.applyToPoint = function (p) {
          var a = this.angle.toRadians();
          p.applyTransform([1, 0, 0, 1, this.p.x || 0.0, this.p.y || 0.0]);
          p.applyTransform([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0]);
          p.applyTransform([1, 0, 0, 1, -this.p.x || 0.0, -this.p.y || 0.0]);
        };
      };

      this.Type.scale = function (s) {
        this.p = svg.CreatePoint(s);

        this.apply = function (ctx) {
          ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
        };

        this.unapply = function (ctx) {
          ctx.scale(1.0 / this.p.x || 1.0, 1.0 / this.p.y || this.p.x || 1.0);
        };

        this.applyToPoint = function (p) {
          p.applyTransform([this.p.x || 0.0, 0, 0, this.p.y || 0.0, 0, 0]);
        };
      };

      this.Type.matrix = function (s) {
        this.m = svg.ToNumberArray(s);

        this.apply = function (ctx) {
          ctx.transform(this.m[0], this.m[1], this.m[2], this.m[3], this.m[4], this.m[5]);
        };

        this.unapply = function (ctx) {
          var a = this.m[0];
          var b = this.m[2];
          var c = this.m[4];
          var d = this.m[1];
          var e = this.m[3];
          var f = this.m[5];
          var g = 0.0;
          var h = 0.0;
          var i = 1.0;
          var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g));
          ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c * h - b * i), det * (a * i - c * g), det * (b * f - c * e), det * (c * d - a * f));
        };

        this.applyToPoint = function (p) {
          p.applyTransform(this.m);
        };
      };

      this.Type.SkewBase = function (s) {
        this.base = that.Type.matrix;
        this.base(s);
        this.angle = new svg.Property('angle', s);
      };

      this.Type.SkewBase.prototype = new this.Type.matrix();

      this.Type.skewX = function (s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, 0, Math.tan(this.angle.toRadians()), 1, 0, 0];
      };

      this.Type.skewX.prototype = new this.Type.SkewBase();

      this.Type.skewY = function (s) {
        this.base = that.Type.SkewBase;
        this.base(s);
        this.m = [1, Math.tan(this.angle.toRadians()), 0, 1, 0, 0];
      };

      this.Type.skewY.prototype = new this.Type.SkewBase();
      this.transforms = [];

      this.apply = function (ctx) {
        for (var i = 0; i < this.transforms.length; i++) {
          this.transforms[i].apply(ctx);
        }
      };

      this.unapply = function (ctx) {
        for (var i = this.transforms.length - 1; i >= 0; i--) {
          this.transforms[i].unapply(ctx);
        }
      };

      this.applyToPoint = function (p) {
        for (var i = 0; i < this.transforms.length; i++) {
          this.transforms[i].applyToPoint(p);
        }
      };

      var data = svg.trim(svg.compressSpaces(v)).replace(/\)([a-zA-Z])/g, ') $1').replace(/\)(\s?,\s?)/g, ') ').split(/\s(?=[a-z])/);

      for (var i = 0; i < data.length; i++) {
        var type = svg.trim(data[i].split('(')[0]);
        var s = data[i].split('(')[1].replace(')', '');
        var transformType = this.Type[type];

        if (typeof transformType != 'undefined') {
          var transform = new transformType(s);
          transform.type = type;
          this.transforms.push(transform);
        }
      }
    }; // aspect ratio


    svg.AspectRatio = function (ctx, aspectRatio, width, desiredWidth, height, desiredHeight, minX, minY, refX, refY) {
      // aspect ratio - http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
      aspectRatio = svg.compressSpaces(aspectRatio);
      aspectRatio = aspectRatio.replace(/^defer\s/, ''); // ignore defer

      var align = aspectRatio.split(' ')[0] || 'xMidYMid';
      var meetOrSlice = aspectRatio.split(' ')[1] || 'meet'; // calculate scale

      var scaleX = width / desiredWidth;
      var scaleY = height / desiredHeight;
      var scaleMin = Math.min(scaleX, scaleY);
      var scaleMax = Math.max(scaleX, scaleY);

      if (meetOrSlice == 'meet') {
        desiredWidth *= scaleMin;
        desiredHeight *= scaleMin;
      }

      if (meetOrSlice == 'slice') {
        desiredWidth *= scaleMax;
        desiredHeight *= scaleMax;
      }

      refX = new svg.Property('refX', refX);
      refY = new svg.Property('refY', refY);

      if (refX.hasValue() && refY.hasValue()) {
        ctx.translate(-scaleMin * refX.toPixels('x'), -scaleMin * refY.toPixels('y'));
      } else {
        // align
        if (align.match(/^xMid/) && (meetOrSlice == 'meet' && scaleMin == scaleY || meetOrSlice == 'slice' && scaleMax == scaleY)) ctx.translate(width / 2.0 - desiredWidth / 2.0, 0);
        if (align.match(/YMid$/) && (meetOrSlice == 'meet' && scaleMin == scaleX || meetOrSlice == 'slice' && scaleMax == scaleX)) ctx.translate(0, height / 2.0 - desiredHeight / 2.0);
        if (align.match(/^xMax/) && (meetOrSlice == 'meet' && scaleMin == scaleY || meetOrSlice == 'slice' && scaleMax == scaleY)) ctx.translate(width - desiredWidth, 0);
        if (align.match(/YMax$/) && (meetOrSlice == 'meet' && scaleMin == scaleX || meetOrSlice == 'slice' && scaleMax == scaleX)) ctx.translate(0, height - desiredHeight);
      } // scale


      if (align == 'none') ctx.scale(scaleX, scaleY);else if (meetOrSlice == 'meet') ctx.scale(scaleMin, scaleMin);else if (meetOrSlice == 'slice') ctx.scale(scaleMax, scaleMax); // translate

      ctx.translate(minX == null ? 0 : -minX, minY == null ? 0 : -minY);
    }; // elements


    svg.Element = {};
    svg.EmptyProperty = new svg.Property('EMPTY', '');

    svg.Element.ElementBase = function (node) {
      this.attributes = {};
      this.styles = {};
      this.stylesSpecificity = {};
      this.children = []; // get or create attribute

      this.attribute = function (name, createIfNotExists) {
        var a = this.attributes[name];
        if (a != null) return a;

        if (createIfNotExists == true) {
          a = new svg.Property(name, '');
          this.attributes[name] = a;
        }

        return a || svg.EmptyProperty;
      };

      this.getHrefAttribute = function () {
        for (var a in this.attributes) {
          if (a == 'href' || a.match(/:href$/)) {
            return this.attributes[a];
          }
        }

        return svg.EmptyProperty;
      }; // get or create style, crawls up node tree


      this.style = function (name, createIfNotExists, skipAncestors) {
        var s = this.styles[name];
        if (s != null) return s;
        var a = this.attribute(name);

        if (a != null && a.hasValue()) {
          this.styles[name] = a; // move up to me to cache

          return a;
        }

        if (skipAncestors != true) {
          var p = this.parent;

          if (p != null) {
            var ps = p.style(name);

            if (ps != null && ps.hasValue()) {
              return ps;
            }
          }
        }

        if (createIfNotExists == true) {
          s = new svg.Property(name, '');
          this.styles[name] = s;
        }

        return s || svg.EmptyProperty;
      }; // base render


      this.render = function (ctx) {
        // don't render display=none
        if (this.style('display').value == 'none') return; // don't render visibility=hidden

        if (this.style('visibility').value == 'hidden') return;
        ctx.save();

        if (this.style('mask').hasValue()) {
          // mask
          var mask = this.style('mask').getDefinition();
          if (mask != null) mask.apply(ctx, this);
        } else if (this.style('filter').hasValue()) {
          // filter
          var filter = this.style('filter').getDefinition();
          if (filter != null) filter.apply(ctx, this);
        } else {
          this.setContext(ctx);
          this.renderChildren(ctx);
          this.clearContext(ctx);
        }

        ctx.restore();
      }; // base set context


      this.setContext = function (ctx) {// OVERRIDE ME!
      }; // base clear context


      this.clearContext = function (ctx) {// OVERRIDE ME!
      }; // base render children


      this.renderChildren = function (ctx) {
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].render(ctx);
        }
      };

      this.addChild = function (childNode, create) {
        var child = childNode;
        if (create) child = svg.CreateElement(childNode);
        child.parent = this;

        if (child.type != 'title') {
          this.children.push(child);
        }
      };

      this.addStylesFromStyleDefinition = function () {
        // add styles
        for (var selector in svg.Styles) {
          if (selector[0] != '@' && matchesSelector(node, selector)) {
            var styles = svg.Styles[selector];
            var specificity = svg.StylesSpecificity[selector];

            if (styles != null) {
              for (var name in styles) {
                var existingSpecificity = this.stylesSpecificity[name];

                if (typeof existingSpecificity == 'undefined') {
                  existingSpecificity = '000';
                }

                if (specificity > existingSpecificity) {
                  this.styles[name] = styles[name];
                  this.stylesSpecificity[name] = specificity;
                }
              }
            }
          }
        }
      };

      if (node != null && node.nodeType == 1) {
        //ELEMENT_NODE
        // add attributes
        for (var i = 0; i < node.attributes.length; i++) {
          var attribute = node.attributes[i];
          this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.value);
        }

        this.addStylesFromStyleDefinition(); // add inline styles

        if (this.attribute('style').hasValue()) {
          var styles = this.attribute('style').value.split(';');

          for (var i = 0; i < styles.length; i++) {
            if (svg.trim(styles[i]) != '') {
              var style = styles[i].split(':');
              var name = svg.trim(style[0]);
              var value = svg.trim(style[1]);
              this.styles[name] = new svg.Property(name, value);
            }
          }
        } // add id


        if (this.attribute('id').hasValue()) {
          if (svg.Definitions[this.attribute('id').value] == null) {
            svg.Definitions[this.attribute('id').value] = this;
          }
        } // add children


        for (var i = 0; i < node.childNodes.length; i++) {
          var childNode = node.childNodes[i];
          if (childNode.nodeType == 1) this.addChild(childNode, true); //ELEMENT_NODE

          if (this.captureTextNodes && (childNode.nodeType == 3 || childNode.nodeType == 4)) {
            var text = childNode.value || childNode.text || childNode.textContent || '';

            if (svg.compressSpaces(text) != '') {
              this.addChild(new svg.Element.tspan(childNode), false); // TEXT_NODE
            }
          }
        }
      }
    };

    svg.Element.RenderedElementBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.setContext = function (ctx) {
        // fill
        if (this.style('fill').isUrlDefinition()) {
          var fs = this.style('fill').getFillStyleDefinition(this, this.style('fill-opacity'));
          if (fs != null) ctx.fillStyle = fs;
        } else if (this.style('fill').hasValue()) {
          var fillStyle = this.style('fill');
          if (fillStyle.value == 'currentColor') fillStyle.value = this.style('color').value;
          if (fillStyle.value != 'inherit') ctx.fillStyle = fillStyle.value == 'none' ? 'rgba(0,0,0,0)' : fillStyle.value;
        }

        if (this.style('fill-opacity').hasValue()) {
          var fillStyle = new svg.Property('fill', ctx.fillStyle);
          fillStyle = fillStyle.addOpacity(this.style('fill-opacity'));
          ctx.fillStyle = fillStyle.value;
        } // stroke


        if (this.style('stroke').isUrlDefinition()) {
          var fs = this.style('stroke').getFillStyleDefinition(this, this.style('stroke-opacity'));
          if (fs != null) ctx.strokeStyle = fs;
        } else if (this.style('stroke').hasValue()) {
          var strokeStyle = this.style('stroke');
          if (strokeStyle.value == 'currentColor') strokeStyle.value = this.style('color').value;
          if (strokeStyle.value != 'inherit') ctx.strokeStyle = strokeStyle.value == 'none' ? 'rgba(0,0,0,0)' : strokeStyle.value;
        }

        if (this.style('stroke-opacity').hasValue()) {
          var strokeStyle = new svg.Property('stroke', ctx.strokeStyle);
          strokeStyle = strokeStyle.addOpacity(this.style('stroke-opacity'));
          ctx.strokeStyle = strokeStyle.value;
        }

        if (this.style('stroke-width').hasValue()) {
          var newLineWidth = this.style('stroke-width').toPixels();
          ctx.lineWidth = newLineWidth == 0 ? 0.001 : newLineWidth; // browsers don't respect 0
        }

        if (this.style('stroke-linecap').hasValue()) ctx.lineCap = this.style('stroke-linecap').value;
        if (this.style('stroke-linejoin').hasValue()) ctx.lineJoin = this.style('stroke-linejoin').value;
        if (this.style('stroke-miterlimit').hasValue()) ctx.miterLimit = this.style('stroke-miterlimit').value;

        if (this.style('stroke-dasharray').hasValue() && this.style('stroke-dasharray').value != 'none') {
          var gaps = svg.ToNumberArray(this.style('stroke-dasharray').value);

          if (typeof ctx.setLineDash != 'undefined') {
            ctx.setLineDash(gaps);
          } else if (typeof ctx.webkitLineDash != 'undefined') {
            ctx.webkitLineDash = gaps;
          } else if (typeof ctx.mozDash != 'undefined' && !(gaps.length == 1 && gaps[0] == 0)) {
            ctx.mozDash = gaps;
          }

          var offset = this.style('stroke-dashoffset').numValueOrDefault(1);

          if (typeof ctx.lineDashOffset != 'undefined') {
            ctx.lineDashOffset = offset;
          } else if (typeof ctx.webkitLineDashOffset != 'undefined') {
            ctx.webkitLineDashOffset = offset;
          } else if (typeof ctx.mozDashOffset != 'undefined') {
            ctx.mozDashOffset = offset;
          }
        } // font


        if (typeof ctx.font != 'undefined') {
          ctx.font = svg.Font.CreateFont(this.style('font-style').value, this.style('font-variant').value, this.style('font-weight').value, this.style('font-size').hasValue() ? this.style('font-size').toPixels() + 'px' : '', this.style('font-family').value).toString();
        } // transform


        if (this.style('transform', false, true).hasValue()) {
          var transform = new svg.Transform(this.style('transform', false, true).value);
          transform.apply(ctx);
        } // clip


        if (this.style('clip-path', false, true).hasValue()) {
          var clip = this.style('clip-path', false, true).getDefinition();
          if (clip != null) clip.apply(ctx);
        } // opacity


        if (this.style('opacity').hasValue()) {
          ctx.globalAlpha = this.style('opacity').numValue();
        }
      };
    };

    svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase();

    svg.Element.PathElementBase = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.path = function (ctx) {
        if (ctx != null) ctx.beginPath();
        return new svg.BoundingBox();
      };

      this.renderChildren = function (ctx) {
        this.path(ctx);
        svg.Mouse.checkPath(this, ctx);

        if (ctx.fillStyle != '') {
          if (this.style('fill-rule').valueOrDefault('inherit') != 'inherit') {
            ctx.fill(this.style('fill-rule').value);
          } else {
            ctx.fill();
          }
        }

        if (ctx.strokeStyle != '') ctx.stroke();
        var markers = this.getMarkers();

        if (markers != null) {
          if (this.style('marker-start').isUrlDefinition()) {
            var marker = this.style('marker-start').getDefinition();
            marker.render(ctx, markers[0][0], markers[0][1]);
          }

          if (this.style('marker-mid').isUrlDefinition()) {
            var marker = this.style('marker-mid').getDefinition();

            for (var i = 1; i < markers.length - 1; i++) {
              marker.render(ctx, markers[i][0], markers[i][1]);
            }
          }

          if (this.style('marker-end').isUrlDefinition()) {
            var marker = this.style('marker-end').getDefinition();
            marker.render(ctx, markers[markers.length - 1][0], markers[markers.length - 1][1]);
          }
        }
      };

      this.getBoundingBox = function () {
        return this.path();
      };

      this.getMarkers = function () {
        return null;
      };
    };

    svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase(); // svg element

    svg.Element.svg = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseClearContext = this.clearContext;

      this.clearContext = function (ctx) {
        this.baseClearContext(ctx);
        svg.ViewPort.RemoveCurrent();
      };

      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        // initial values and defaults
        ctx.strokeStyle = 'rgba(0,0,0,0)';
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 4;

        if (typeof ctx.font != 'undefined' && typeof window.getComputedStyle != 'undefined') {
          ctx.font = window.getComputedStyle(ctx.canvas).getPropertyValue('font');
        }

        this.baseSetContext(ctx); // create new view port

        if (!this.attribute('x').hasValue()) this.attribute('x', true).value = 0;
        if (!this.attribute('y').hasValue()) this.attribute('y', true).value = 0;
        ctx.translate(this.attribute('x').toPixels('x'), this.attribute('y').toPixels('y'));
        var width = svg.ViewPort.width();
        var height = svg.ViewPort.height();
        if (!this.attribute('width').hasValue()) this.attribute('width', true).value = '100%';
        if (!this.attribute('height').hasValue()) this.attribute('height', true).value = '100%';

        if (typeof this.root == 'undefined') {
          width = this.attribute('width').toPixels('x');
          height = this.attribute('height').toPixels('y');
          var x = 0;
          var y = 0;

          if (this.attribute('refX').hasValue() && this.attribute('refY').hasValue()) {
            x = -this.attribute('refX').toPixels('x');
            y = -this.attribute('refY').toPixels('y');
          }

          if (this.attribute('overflow').valueOrDefault('hidden') != 'visible') {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(width, y);
            ctx.lineTo(width, height);
            ctx.lineTo(x, height);
            ctx.closePath();
            ctx.clip();
          }
        }

        svg.ViewPort.SetCurrent(width, height); // viewbox

        if (this.attribute('viewBox').hasValue()) {
          var viewBox = svg.ToNumberArray(this.attribute('viewBox').value);
          var minX = viewBox[0];
          var minY = viewBox[1];
          width = viewBox[2];
          height = viewBox[3];
          svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, svg.ViewPort.width(), width, svg.ViewPort.height(), height, minX, minY, this.attribute('refX').value, this.attribute('refY').value);
          svg.ViewPort.RemoveCurrent();
          svg.ViewPort.SetCurrent(viewBox[2], viewBox[3]);
        }
      };
    };

    svg.Element.svg.prototype = new svg.Element.RenderedElementBase(); // rect element

    svg.Element.rect = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
        if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
        rx = Math.min(rx, width / 2.0);
        ry = Math.min(ry, height / 2.0);

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(x + rx, y);
          ctx.lineTo(x + width - rx, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
          ctx.lineTo(x + width, y + height - ry);
          ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
          ctx.lineTo(x + rx, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
          ctx.lineTo(x, y + ry);
          ctx.quadraticCurveTo(x, y, x + rx, y);
          ctx.closePath();
        }

        return new svg.BoundingBox(x, y, x + width, y + height);
      };
    };

    svg.Element.rect.prototype = new svg.Element.PathElementBase(); // circle element

    svg.Element.circle = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');
        var r = this.attribute('r').toPixels();

        if (ctx != null) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2, true);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - r, cy - r, cx + r, cy + r);
      };
    };

    svg.Element.circle.prototype = new svg.Element.PathElementBase(); // ellipse element

    svg.Element.ellipse = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.path = function (ctx) {
        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
        var rx = this.attribute('rx').toPixels('x');
        var ry = this.attribute('ry').toPixels('y');
        var cx = this.attribute('cx').toPixels('x');
        var cy = this.attribute('cy').toPixels('y');

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(cx, cy - ry);
          ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
          ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
          ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
          ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
          ctx.closePath();
        }

        return new svg.BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
      };
    };

    svg.Element.ellipse.prototype = new svg.Element.PathElementBase(); // line element

    svg.Element.line = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);

      this.getPoints = function () {
        return [new svg.Point(this.attribute('x1').toPixels('x'), this.attribute('y1').toPixels('y')), new svg.Point(this.attribute('x2').toPixels('x'), this.attribute('y2').toPixels('y'))];
      };

      this.path = function (ctx) {
        var points = this.getPoints();

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          ctx.lineTo(points[1].x, points[1].y);
        }

        return new svg.BoundingBox(points[0].x, points[0].y, points[1].x, points[1].y);
      };

      this.getMarkers = function () {
        var points = this.getPoints();
        var a = points[0].angleTo(points[1]);
        return [[points[0], a], [points[1], a]];
      };
    };

    svg.Element.line.prototype = new svg.Element.PathElementBase(); // polyline element

    svg.Element.polyline = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);
      this.points = svg.CreatePath(this.attribute('points').value);

      this.path = function (ctx) {
        var bb = new svg.BoundingBox(this.points[0].x, this.points[0].y);

        if (ctx != null) {
          ctx.beginPath();
          ctx.moveTo(this.points[0].x, this.points[0].y);
        }

        for (var i = 1; i < this.points.length; i++) {
          bb.addPoint(this.points[i].x, this.points[i].y);
          if (ctx != null) ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        return bb;
      };

      this.getMarkers = function () {
        var markers = [];

        for (var i = 0; i < this.points.length - 1; i++) {
          markers.push([this.points[i], this.points[i].angleTo(this.points[i + 1])]);
        }

        if (markers.length > 0) {
          markers.push([this.points[this.points.length - 1], markers[markers.length - 1][1]]);
        }

        return markers;
      };
    };

    svg.Element.polyline.prototype = new svg.Element.PathElementBase(); // polygon element

    svg.Element.polygon = function (node) {
      this.base = svg.Element.polyline;
      this.base(node);
      this.basePath = this.path;

      this.path = function (ctx) {
        var bb = this.basePath(ctx);

        if (ctx != null) {
          ctx.lineTo(this.points[0].x, this.points[0].y);
          ctx.closePath();
        }

        return bb;
      };
    };

    svg.Element.polygon.prototype = new svg.Element.polyline(); // path element

    svg.Element.path = function (node) {
      this.base = svg.Element.PathElementBase;
      this.base(node);
      var d = this.attribute('d').value; // TODO: convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF

      d = d.replace(/,/gm, ' '); // get rid of all commas
      // As the end of a match can also be the start of the next match, we need to run this replace twice.

      for (var i = 0; i < 2; i++) {
        d = d.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, '$1 $2');
      } // suffix commands with spaces


      d = d.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, '$1 $2'); // prefix commands with spaces

      d = d.replace(/([0-9])([+\-])/gm, '$1 $2'); // separate digits on +- signs
      // Again, we need to run this twice to find all occurances

      for (var i = 0; i < 2; i++) {
        d = d.replace(/(\.[0-9]*)(\.)/gm, '$1 $2');
      } // separate digits when they start with a comma


      d = d.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm, '$1 $3 $4 '); // shorthand elliptical arc path syntax

      d = svg.compressSpaces(d); // compress multiple spaces

      d = svg.trim(d);
      this.PathParser = new function (d) {
        this.tokens = d.split(' ');

        this.reset = function () {
          this.i = -1;
          this.command = '';
          this.previousCommand = '';
          this.start = new svg.Point(0, 0);
          this.control = new svg.Point(0, 0);
          this.current = new svg.Point(0, 0);
          this.points = [];
          this.angles = [];
        };

        this.isEnd = function () {
          return this.i >= this.tokens.length - 1;
        };

        this.isCommandOrEnd = function () {
          if (this.isEnd()) return true;
          return this.tokens[this.i + 1].match(/^[A-Za-z]$/) != null;
        };

        this.isRelativeCommand = function () {
          switch (this.command) {
            case 'm':
            case 'l':
            case 'h':
            case 'v':
            case 'c':
            case 's':
            case 'q':
            case 't':
            case 'a':
            case 'z':
              return true;
          }

          return false;
        };

        this.getToken = function () {
          this.i++;
          return this.tokens[this.i];
        };

        this.getScalar = function () {
          return parseFloat(this.getToken());
        };

        this.nextCommand = function () {
          this.previousCommand = this.command;
          this.command = this.getToken();
        };

        this.getPoint = function () {
          var p = new svg.Point(this.getScalar(), this.getScalar());
          return this.makeAbsolute(p);
        };

        this.getAsControlPoint = function () {
          var p = this.getPoint();
          this.control = p;
          return p;
        };

        this.getAsCurrentPoint = function () {
          var p = this.getPoint();
          this.current = p;
          return p;
        };

        this.getReflectedControlPoint = function () {
          if (this.previousCommand.toLowerCase() != 'c' && this.previousCommand.toLowerCase() != 's' && this.previousCommand.toLowerCase() != 'q' && this.previousCommand.toLowerCase() != 't') {
            return this.current;
          } // reflect point


          var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);
          return p;
        };

        this.makeAbsolute = function (p) {
          if (this.isRelativeCommand()) {
            p.x += this.current.x;
            p.y += this.current.y;
          }

          return p;
        };

        this.addMarker = function (p, from, priorTo) {
          // if the last angle isn't filled in because we didn't have this point yet ...
          if (priorTo != null && this.angles.length > 0 && this.angles[this.angles.length - 1] == null) {
            this.angles[this.angles.length - 1] = this.points[this.points.length - 1].angleTo(priorTo);
          }

          this.addMarkerAngle(p, from == null ? null : from.angleTo(p));
        };

        this.addMarkerAngle = function (p, a) {
          this.points.push(p);
          this.angles.push(a);
        };

        this.getMarkerPoints = function () {
          return this.points;
        };

        this.getMarkerAngles = function () {
          for (var i = 0; i < this.angles.length; i++) {
            if (this.angles[i] == null) {
              for (var j = i + 1; j < this.angles.length; j++) {
                if (this.angles[j] != null) {
                  this.angles[i] = this.angles[j];
                  break;
                }
              }
            }
          }

          return this.angles;
        };
      }(d);

      this.path = function (ctx) {
        var pp = this.PathParser;
        pp.reset();
        var bb = new svg.BoundingBox();
        if (ctx != null) ctx.beginPath();

        while (!pp.isEnd()) {
          pp.nextCommand();

          switch (pp.command) {
            case 'M':
            case 'm':
              var p = pp.getAsCurrentPoint();
              pp.addMarker(p);
              bb.addPoint(p.x, p.y);
              if (ctx != null) ctx.moveTo(p.x, p.y);
              pp.start = pp.current;

              while (!pp.isCommandOrEnd()) {
                var p = pp.getAsCurrentPoint();
                pp.addMarker(p, pp.start);
                bb.addPoint(p.x, p.y);
                if (ctx != null) ctx.lineTo(p.x, p.y);
              }

              break;

            case 'L':
            case 'l':
              while (!pp.isCommandOrEnd()) {
                var c = pp.current;
                var p = pp.getAsCurrentPoint();
                pp.addMarker(p, c);
                bb.addPoint(p.x, p.y);
                if (ctx != null) ctx.lineTo(p.x, p.y);
              }

              break;

            case 'H':
            case 'h':
              while (!pp.isCommandOrEnd()) {
                var newP = new svg.Point((pp.isRelativeCommand() ? pp.current.x : 0) + pp.getScalar(), pp.current.y);
                pp.addMarker(newP, pp.current);
                pp.current = newP;
                bb.addPoint(pp.current.x, pp.current.y);
                if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
              }

              break;

            case 'V':
            case 'v':
              while (!pp.isCommandOrEnd()) {
                var newP = new svg.Point(pp.current.x, (pp.isRelativeCommand() ? pp.current.y : 0) + pp.getScalar());
                pp.addMarker(newP, pp.current);
                pp.current = newP;
                bb.addPoint(pp.current.x, pp.current.y);
                if (ctx != null) ctx.lineTo(pp.current.x, pp.current.y);
              }

              break;

            case 'C':
            case 'c':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var p1 = pp.getPoint();
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                pp.addMarker(cp, cntrl, p1);
                bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
              }

              break;

            case 'S':
            case 's':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var p1 = pp.getReflectedControlPoint();
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                pp.addMarker(cp, cntrl, p1);
                bb.addBezierCurve(curr.x, curr.y, p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
                if (ctx != null) ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
              }

              break;

            case 'Q':
            case 'q':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var cntrl = pp.getAsControlPoint();
                var cp = pp.getAsCurrentPoint();
                pp.addMarker(cp, cntrl, cntrl);
                bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
                if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
              }

              break;

            case 'T':
            case 't':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var cntrl = pp.getReflectedControlPoint();
                pp.control = cntrl;
                var cp = pp.getAsCurrentPoint();
                pp.addMarker(cp, cntrl, cntrl);
                bb.addQuadraticCurve(curr.x, curr.y, cntrl.x, cntrl.y, cp.x, cp.y);
                if (ctx != null) ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
              }

              break;

            case 'A':
            case 'a':
              while (!pp.isCommandOrEnd()) {
                var curr = pp.current;
                var rx = pp.getScalar();
                var ry = pp.getScalar();
                var xAxisRotation = pp.getScalar() * (Math.PI / 180.0);
                var largeArcFlag = pp.getScalar();
                var sweepFlag = pp.getScalar();
                var cp = pp.getAsCurrentPoint(); // Conversion from endpoint to center parameterization
                // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                // x1', y1'

                var currp = new svg.Point(Math.cos(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.sin(xAxisRotation) * (curr.y - cp.y) / 2.0, -Math.sin(xAxisRotation) * (curr.x - cp.x) / 2.0 + Math.cos(xAxisRotation) * (curr.y - cp.y) / 2.0); // adjust radii

                var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);

                if (l > 1) {
                  rx *= Math.sqrt(l);
                  ry *= Math.sqrt(l);
                } // cx', cy'


                var s = (largeArcFlag == sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(currp.y, 2) - Math.pow(ry, 2) * Math.pow(currp.x, 2)) / (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
                if (isNaN(s)) s = 0;
                var cpp = new svg.Point(s * rx * currp.y / ry, s * -ry * currp.x / rx); // cx, cy

                var centp = new svg.Point((curr.x + cp.x) / 2.0 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (curr.y + cp.y) / 2.0 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y); // vector magnitude

                var m = function m(v) {
                  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
                }; // ratio between two vectors


                var r = function r(u, v) {
                  return (u[0] * v[0] + u[1] * v[1]) / (m(u) * m(v));
                }; // angle between two vectors


                var a = function a(u, v) {
                  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(r(u, v));
                }; // initial angle


                var a1 = a([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]); // angle delta

                var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
                var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
                var ad = a(u, v);
                if (r(u, v) <= -1) ad = Math.PI;
                if (r(u, v) >= 1) ad = 0; // for markers

                var dir = 1 - sweepFlag ? 1.0 : -1.0;
                var ah = a1 + dir * (ad / 2.0);
                var halfWay = new svg.Point(centp.x + rx * Math.cos(ah), centp.y + ry * Math.sin(ah));
                pp.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
                pp.addMarkerAngle(cp, ah - dir * Math.PI);
                bb.addPoint(cp.x, cp.y); // TODO: this is too naive, make it better

                if (ctx != null) {
                  var r = rx > ry ? rx : ry;
                  var sx = rx > ry ? 1 : rx / ry;
                  var sy = rx > ry ? ry / rx : 1;
                  ctx.translate(centp.x, centp.y);
                  ctx.rotate(xAxisRotation);
                  ctx.scale(sx, sy);
                  ctx.arc(0, 0, r, a1, a1 + ad, 1 - sweepFlag);
                  ctx.scale(1 / sx, 1 / sy);
                  ctx.rotate(-xAxisRotation);
                  ctx.translate(-centp.x, -centp.y);
                }
              }

              break;

            case 'Z':
            case 'z':
              if (ctx != null) ctx.closePath();
              pp.current = pp.start;
          }
        }

        return bb;
      };

      this.getMarkers = function () {
        var points = this.PathParser.getMarkerPoints();
        var angles = this.PathParser.getMarkerAngles();
        var markers = [];

        for (var i = 0; i < points.length; i++) {
          markers.push([points[i], angles[i]]);
        }

        return markers;
      };
    };

    svg.Element.path.prototype = new svg.Element.PathElementBase(); // pattern element

    svg.Element.pattern = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.createPattern = function (ctx, element) {
        var width = this.attribute('width').toPixels('x', true);
        var height = this.attribute('height').toPixels('y', true); // render me using a temporary svg element

        var tempSvg = new svg.Element.svg();
        tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes['width'] = new svg.Property('width', width + 'px');
        tempSvg.attributes['height'] = new svg.Property('height', height + 'px');
        tempSvg.attributes['transform'] = new svg.Property('transform', this.attribute('patternTransform').value);
        tempSvg.children = this.children;
        var c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        var cctx = c.getContext('2d');

        if (this.attribute('x').hasValue() && this.attribute('y').hasValue()) {
          cctx.translate(this.attribute('x').toPixels('x', true), this.attribute('y').toPixels('y', true));
        } // render 3x3 grid so when we transform there's no white space on edges


        for (var x = -1; x <= 1; x++) {
          for (var y = -1; y <= 1; y++) {
            cctx.save();
            tempSvg.attributes['x'] = new svg.Property('x', x * c.width);
            tempSvg.attributes['y'] = new svg.Property('y', y * c.height);
            tempSvg.render(cctx);
            cctx.restore();
          }
        }

        var pattern = ctx.createPattern(c, 'repeat');
        return pattern;
      };
    };

    svg.Element.pattern.prototype = new svg.Element.ElementBase(); // marker element

    svg.Element.marker = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.baseRender = this.render;

      this.render = function (ctx, point, angle) {
        ctx.translate(point.x, point.y);
        if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(angle);
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(ctx.lineWidth, ctx.lineWidth);
        ctx.save(); // render me using a temporary svg element

        var tempSvg = new svg.Element.svg();
        tempSvg.attributes['viewBox'] = new svg.Property('viewBox', this.attribute('viewBox').value);
        tempSvg.attributes['refX'] = new svg.Property('refX', this.attribute('refX').value);
        tempSvg.attributes['refY'] = new svg.Property('refY', this.attribute('refY').value);
        tempSvg.attributes['width'] = new svg.Property('width', this.attribute('markerWidth').value);
        tempSvg.attributes['height'] = new svg.Property('height', this.attribute('markerHeight').value);
        tempSvg.attributes['fill'] = new svg.Property('fill', this.attribute('fill').valueOrDefault('black'));
        tempSvg.attributes['stroke'] = new svg.Property('stroke', this.attribute('stroke').valueOrDefault('none'));
        tempSvg.children = this.children;
        tempSvg.render(ctx);
        ctx.restore();
        if (this.attribute('markerUnits').valueOrDefault('strokeWidth') == 'strokeWidth') ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
        if (this.attribute('orient').valueOrDefault('auto') == 'auto') ctx.rotate(-angle);
        ctx.translate(-point.x, -point.y);
      };
    };

    svg.Element.marker.prototype = new svg.Element.ElementBase(); // definitions element

    svg.Element.defs = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.render = function (ctx) {// NOOP
      };
    };

    svg.Element.defs.prototype = new svg.Element.ElementBase(); // base for gradients

    svg.Element.GradientBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.stops = [];

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child.type == 'stop') this.stops.push(child);
      }

      this.getGradient = function () {// OVERRIDE ME!
      };

      this.gradientUnits = function () {
        return this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
      };

      this.attributesToInherit = ['gradientUnits'];

      this.inheritStopContainer = function (stopsContainer) {
        for (var i = 0; i < this.attributesToInherit.length; i++) {
          var attributeToInherit = this.attributesToInherit[i];

          if (!this.attribute(attributeToInherit).hasValue() && stopsContainer.attribute(attributeToInherit).hasValue()) {
            this.attribute(attributeToInherit, true).value = stopsContainer.attribute(attributeToInherit).value;
          }
        }
      };

      this.createGradient = function (ctx, element, parentOpacityProp) {
        var stopsContainer = this;

        if (this.getHrefAttribute().hasValue()) {
          stopsContainer = this.getHrefAttribute().getDefinition();
          this.inheritStopContainer(stopsContainer);
        }

        var addParentOpacity = function addParentOpacity(color) {
          if (parentOpacityProp.hasValue()) {
            var p = new svg.Property('color', color);
            return p.addOpacity(parentOpacityProp).value;
          }

          return color;
        };

        var g = this.getGradient(ctx, element);
        if (g == null) return addParentOpacity(stopsContainer.stops[stopsContainer.stops.length - 1].color);

        for (var i = 0; i < stopsContainer.stops.length; i++) {
          g.addColorStop(stopsContainer.stops[i].offset, addParentOpacity(stopsContainer.stops[i].color));
        }

        if (this.attribute('gradientTransform').hasValue()) {
          // render as transformed pattern on temporary canvas
          var rootView = svg.ViewPort.viewPorts[0];
          var rect = new svg.Element.rect();
          rect.attributes['x'] = new svg.Property('x', -svg.MAX_VIRTUAL_PIXELS / 3.0);
          rect.attributes['y'] = new svg.Property('y', -svg.MAX_VIRTUAL_PIXELS / 3.0);
          rect.attributes['width'] = new svg.Property('width', svg.MAX_VIRTUAL_PIXELS);
          rect.attributes['height'] = new svg.Property('height', svg.MAX_VIRTUAL_PIXELS);
          var group = new svg.Element.g();
          group.attributes['transform'] = new svg.Property('transform', this.attribute('gradientTransform').value);
          group.children = [rect];
          var tempSvg = new svg.Element.svg();
          tempSvg.attributes['x'] = new svg.Property('x', 0);
          tempSvg.attributes['y'] = new svg.Property('y', 0);
          tempSvg.attributes['width'] = new svg.Property('width', rootView.width);
          tempSvg.attributes['height'] = new svg.Property('height', rootView.height);
          tempSvg.children = [group];
          var c = document.createElement('canvas');
          c.width = rootView.width;
          c.height = rootView.height;
          var tempCtx = c.getContext('2d');
          tempCtx.fillStyle = g;
          tempSvg.render(tempCtx);
          return tempCtx.createPattern(c, 'no-repeat');
        }

        return g;
      };
    };

    svg.Element.GradientBase.prototype = new svg.Element.ElementBase(); // linear gradient element

    svg.Element.linearGradient = function (node) {
      this.base = svg.Element.GradientBase;
      this.base(node);
      this.attributesToInherit.push('x1');
      this.attributesToInherit.push('y1');
      this.attributesToInherit.push('x2');
      this.attributesToInherit.push('y2');

      this.getGradient = function (ctx, element) {
        var bb = this.gradientUnits() == 'objectBoundingBox' ? element.getBoundingBox() : null;

        if (!this.attribute('x1').hasValue() && !this.attribute('y1').hasValue() && !this.attribute('x2').hasValue() && !this.attribute('y2').hasValue()) {
          this.attribute('x1', true).value = 0;
          this.attribute('y1', true).value = 0;
          this.attribute('x2', true).value = 1;
          this.attribute('y2', true).value = 0;
        }

        var x1 = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x1').numValue() : this.attribute('x1').toPixels('x');
        var y1 = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y1').numValue() : this.attribute('y1').toPixels('y');
        var x2 = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('x2').numValue() : this.attribute('x2').toPixels('x');
        var y2 = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('y2').numValue() : this.attribute('y2').toPixels('y');
        if (x1 == x2 && y1 == y2) return null;
        return ctx.createLinearGradient(x1, y1, x2, y2);
      };
    };

    svg.Element.linearGradient.prototype = new svg.Element.GradientBase(); // radial gradient element

    svg.Element.radialGradient = function (node) {
      this.base = svg.Element.GradientBase;
      this.base(node);
      this.attributesToInherit.push('cx');
      this.attributesToInherit.push('cy');
      this.attributesToInherit.push('r');
      this.attributesToInherit.push('fx');
      this.attributesToInherit.push('fy');

      this.getGradient = function (ctx, element) {
        var bb = element.getBoundingBox();
        if (!this.attribute('cx').hasValue()) this.attribute('cx', true).value = '50%';
        if (!this.attribute('cy').hasValue()) this.attribute('cy', true).value = '50%';
        if (!this.attribute('r').hasValue()) this.attribute('r', true).value = '50%';
        var cx = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('cx').numValue() : this.attribute('cx').toPixels('x');
        var cy = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('cy').numValue() : this.attribute('cy').toPixels('y');
        var fx = cx;
        var fy = cy;

        if (this.attribute('fx').hasValue()) {
          fx = this.gradientUnits() == 'objectBoundingBox' ? bb.x() + bb.width() * this.attribute('fx').numValue() : this.attribute('fx').toPixels('x');
        }

        if (this.attribute('fy').hasValue()) {
          fy = this.gradientUnits() == 'objectBoundingBox' ? bb.y() + bb.height() * this.attribute('fy').numValue() : this.attribute('fy').toPixels('y');
        }

        var r = this.gradientUnits() == 'objectBoundingBox' ? (bb.width() + bb.height()) / 2.0 * this.attribute('r').numValue() : this.attribute('r').toPixels();
        return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
      };
    };

    svg.Element.radialGradient.prototype = new svg.Element.GradientBase(); // gradient stop element

    svg.Element.stop = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.offset = this.attribute('offset').numValue();
      if (this.offset < 0) this.offset = 0;
      if (this.offset > 1) this.offset = 1;
      var stopColor = this.style('stop-color', true);
      if (stopColor.value == '') stopColor.value = '#000';
      if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity'));
      this.color = stopColor.value;
    };

    svg.Element.stop.prototype = new svg.Element.ElementBase(); // animation base element

    svg.Element.AnimateBase = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      svg.Animations.push(this);
      this.duration = 0.0;
      this.begin = this.attribute('begin').toMilliseconds();
      this.maxDuration = this.begin + this.attribute('dur').toMilliseconds();

      this.getProperty = function () {
        var attributeType = this.attribute('attributeType').value;
        var attributeName = this.attribute('attributeName').value;

        if (attributeType == 'CSS') {
          return this.parent.style(attributeName, true);
        }

        return this.parent.attribute(attributeName, true);
      };

      this.initialValue = null;
      this.initialUnits = '';
      this.removed = false;

      this.calcValue = function () {
        // OVERRIDE ME!
        return '';
      };

      this.update = function (delta) {
        // set initial value
        if (this.initialValue == null) {
          this.initialValue = this.getProperty().value;
          this.initialUnits = this.getProperty().getUnits();
        } // if we're past the end time


        if (this.duration > this.maxDuration) {
          // loop for indefinitely repeating animations
          if (this.attribute('repeatCount').value == 'indefinite' || this.attribute('repeatDur').value == 'indefinite') {
            this.duration = 0.0;
          } else if (this.attribute('fill').valueOrDefault('remove') == 'freeze' && !this.frozen) {
            this.frozen = true;
            this.parent.animationFrozen = true;
            this.parent.animationFrozenValue = this.getProperty().value;
          } else if (this.attribute('fill').valueOrDefault('remove') == 'remove' && !this.removed) {
            this.removed = true;
            this.getProperty().value = this.parent.animationFrozen ? this.parent.animationFrozenValue : this.initialValue;
            return true;
          }

          return false;
        }

        this.duration = this.duration + delta; // if we're past the begin time

        var updated = false;

        if (this.begin < this.duration) {
          var newValue = this.calcValue(); // tween

          if (this.attribute('type').hasValue()) {
            // for transform, etc.
            var type = this.attribute('type').value;
            newValue = type + '(' + newValue + ')';
          }

          this.getProperty().value = newValue;
          updated = true;
        }

        return updated;
      };

      this.from = this.attribute('from');
      this.to = this.attribute('to');
      this.values = this.attribute('values');
      if (this.values.hasValue()) this.values.value = this.values.value.split(';'); // fraction of duration we've covered

      this.progress = function () {
        var ret = {
          progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
        };

        if (this.values.hasValue()) {
          var p = ret.progress * (this.values.value.length - 1);
          var lb = Math.floor(p),
              ub = Math.ceil(p);
          ret.from = new svg.Property('from', parseFloat(this.values.value[lb]));
          ret.to = new svg.Property('to', parseFloat(this.values.value[ub]));
          ret.progress = (p - lb) / (ub - lb);
        } else {
          ret.from = this.from;
          ret.to = this.to;
        }

        return ret;
      };
    };

    svg.Element.AnimateBase.prototype = new svg.Element.ElementBase(); // animate element

    svg.Element.animate = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress(); // tween value linearly

        var newValue = p.from.numValue() + (p.to.numValue() - p.from.numValue()) * p.progress;
        return newValue + this.initialUnits;
      };
    };

    svg.Element.animate.prototype = new svg.Element.AnimateBase(); // animate color element

    svg.Element.animateColor = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress();
        var from = new rgbcolor(p.from.value);
        var to = new rgbcolor(p.to.value);

        if (from.ok && to.ok) {
          // tween color linearly
          var r = from.r + (to.r - from.r) * p.progress;
          var g = from.g + (to.g - from.g) * p.progress;
          var b = from.b + (to.b - from.b) * p.progress;
          return 'rgb(' + parseInt(r, 10) + ',' + parseInt(g, 10) + ',' + parseInt(b, 10) + ')';
        }

        return this.attribute('from').value;
      };
    };

    svg.Element.animateColor.prototype = new svg.Element.AnimateBase(); // animate transform element

    svg.Element.animateTransform = function (node) {
      this.base = svg.Element.AnimateBase;
      this.base(node);

      this.calcValue = function () {
        var p = this.progress(); // tween value linearly

        var from = svg.ToNumberArray(p.from.value);
        var to = svg.ToNumberArray(p.to.value);
        var newValue = '';

        for (var i = 0; i < from.length; i++) {
          newValue += from[i] + (to[i] - from[i]) * p.progress + ' ';
        }

        return newValue;
      };
    };

    svg.Element.animateTransform.prototype = new svg.Element.animate(); // font element

    svg.Element.font = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.horizAdvX = this.attribute('horiz-adv-x').numValue();
      this.isRTL = false;
      this.isArabic = false;
      this.fontFace = null;
      this.missingGlyph = null;
      this.glyphs = [];

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        if (child.type == 'font-face') {
          this.fontFace = child;

          if (child.style('font-family').hasValue()) {
            svg.Definitions[child.style('font-family').value] = this;
          }
        } else if (child.type == 'missing-glyph') this.missingGlyph = child;else if (child.type == 'glyph') {
          if (child.arabicForm != '') {
            this.isRTL = true;
            this.isArabic = true;
            if (typeof this.glyphs[child.unicode] == 'undefined') this.glyphs[child.unicode] = [];
            this.glyphs[child.unicode][child.arabicForm] = child;
          } else {
            this.glyphs[child.unicode] = child;
          }
        }
      }
    };

    svg.Element.font.prototype = new svg.Element.ElementBase(); // font-face element

    svg.Element.fontface = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.ascent = this.attribute('ascent').value;
      this.descent = this.attribute('descent').value;
      this.unitsPerEm = this.attribute('units-per-em').numValue();
    };

    svg.Element.fontface.prototype = new svg.Element.ElementBase(); // missing-glyph element

    svg.Element.missingglyph = function (node) {
      this.base = svg.Element.path;
      this.base(node);
      this.horizAdvX = 0;
    };

    svg.Element.missingglyph.prototype = new svg.Element.path(); // glyph element

    svg.Element.glyph = function (node) {
      this.base = svg.Element.path;
      this.base(node);
      this.horizAdvX = this.attribute('horiz-adv-x').numValue();
      this.unicode = this.attribute('unicode').value;
      this.arabicForm = this.attribute('arabic-form').value;
    };

    svg.Element.glyph.prototype = new svg.Element.path(); // text element

    svg.Element.text = function (node) {
      this.captureTextNodes = true;
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        this.baseSetContext(ctx);
        var textBaseline = this.style('dominant-baseline').toTextBaseline();
        if (textBaseline == null) textBaseline = this.style('alignment-baseline').toTextBaseline();
        if (textBaseline != null) ctx.textBaseline = textBaseline;
      };

      this.getBoundingBox = function () {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
        return new svg.BoundingBox(x, y - fontSize, x + Math.floor(fontSize * 2.0 / 3.0) * this.children[0].getText().length, y);
      };

      this.renderChildren = function (ctx) {
        this.x = this.attribute('x').toPixels('x');
        this.y = this.attribute('y').toPixels('y');
        if (this.attribute('dx').hasValue()) this.x += this.attribute('dx').toPixels('x');
        if (this.attribute('dy').hasValue()) this.y += this.attribute('dy').toPixels('y');
        this.x += this.getAnchorDelta(ctx, this, 0);

        for (var i = 0; i < this.children.length; i++) {
          this.renderChild(ctx, this, this, i);
        }
      };

      this.getAnchorDelta = function (ctx, parent, startI) {
        var textAnchor = this.style('text-anchor').valueOrDefault('start');

        if (textAnchor != 'start') {
          var width = 0;

          for (var i = startI; i < parent.children.length; i++) {
            var child = parent.children[i];
            if (i > startI && child.attribute('x').hasValue()) break; // new group

            width += child.measureTextRecursive(ctx);
          }

          return -1 * (textAnchor == 'end' ? width : width / 2.0);
        }

        return 0;
      };

      this.renderChild = function (ctx, textParent, parent, i) {
        var child = parent.children[i];

        if (child.attribute('x').hasValue()) {
          child.x = child.attribute('x').toPixels('x') + textParent.getAnchorDelta(ctx, parent, i);
          if (child.attribute('dx').hasValue()) child.x += child.attribute('dx').toPixels('x');
        } else {
          if (child.attribute('dx').hasValue()) textParent.x += child.attribute('dx').toPixels('x');
          child.x = textParent.x;
        }

        textParent.x = child.x + child.measureText(ctx);

        if (child.attribute('y').hasValue()) {
          child.y = child.attribute('y').toPixels('y');
          if (child.attribute('dy').hasValue()) child.y += child.attribute('dy').toPixels('y');
        } else {
          if (child.attribute('dy').hasValue()) textParent.y += child.attribute('dy').toPixels('y');
          child.y = textParent.y;
        }

        textParent.y = child.y;
        child.render(ctx);

        for (var i = 0; i < child.children.length; i++) {
          textParent.renderChild(ctx, textParent, child, i);
        }
      };
    };

    svg.Element.text.prototype = new svg.Element.RenderedElementBase(); // text base

    svg.Element.TextElementBase = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getGlyph = function (font, text, i) {
        var c = text[i];
        var glyph = null;

        if (font.isArabic) {
          var arabicForm = 'isolated';
          if ((i == 0 || text[i - 1] == ' ') && i < text.length - 2 && text[i + 1] != ' ') arabicForm = 'terminal';
          if (i > 0 && text[i - 1] != ' ' && i < text.length - 2 && text[i + 1] != ' ') arabicForm = 'medial';
          if (i > 0 && text[i - 1] != ' ' && (i == text.length - 1 || text[i + 1] == ' ')) arabicForm = 'initial';

          if (typeof font.glyphs[c] != 'undefined') {
            glyph = font.glyphs[c][arabicForm];
            if (glyph == null && font.glyphs[c].type == 'glyph') glyph = font.glyphs[c];
          }
        } else {
          glyph = font.glyphs[c];
        }

        if (glyph == null) glyph = font.missingGlyph;
        return glyph;
      };

      this.renderChildren = function (ctx) {
        var customFont = this.parent.style('font-family').getDefinition();

        if (customFont != null) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var fontStyle = this.parent.style('font-style').valueOrDefault(svg.Font.Parse(svg.ctx.font).fontStyle);
          var text = this.getText();
          if (customFont.isRTL) text = text.split("").reverse().join("");
          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);

          for (var i = 0; i < text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            var scale = fontSize / customFont.fontFace.unitsPerEm;
            ctx.translate(this.x, this.y);
            ctx.scale(scale, -scale);
            var lw = ctx.lineWidth;
            ctx.lineWidth = ctx.lineWidth * customFont.fontFace.unitsPerEm / fontSize;
            if (fontStyle == 'italic') ctx.transform(1, 0, .4, 1, 0, 0);
            glyph.render(ctx);
            if (fontStyle == 'italic') ctx.transform(1, 0, -.4, 1, 0, 0);
            ctx.lineWidth = lw;
            ctx.scale(1 / scale, -1 / scale);
            ctx.translate(-this.x, -this.y);
            this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / customFont.fontFace.unitsPerEm;

            if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
              this.x += dx[i];
            }
          }

          return;
        }

        if (ctx.fillStyle != '') ctx.fillText(svg.compressSpaces(this.getText()), this.x, this.y);
        if (ctx.strokeStyle != '') ctx.strokeText(svg.compressSpaces(this.getText()), this.x, this.y);
      };

      this.getText = function () {// OVERRIDE ME
      };

      this.measureTextRecursive = function (ctx) {
        var width = this.measureText(ctx);

        for (var i = 0; i < this.children.length; i++) {
          width += this.children[i].measureTextRecursive(ctx);
        }

        return width;
      };

      this.measureText = function (ctx) {
        var customFont = this.parent.style('font-family').getDefinition();

        if (customFont != null) {
          var fontSize = this.parent.style('font-size').numValueOrDefault(svg.Font.Parse(svg.ctx.font).fontSize);
          var measure = 0;
          var text = this.getText();
          if (customFont.isRTL) text = text.split("").reverse().join("");
          var dx = svg.ToNumberArray(this.parent.attribute('dx').value);

          for (var i = 0; i < text.length; i++) {
            var glyph = this.getGlyph(customFont, text, i);
            measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;

            if (typeof dx[i] != 'undefined' && !isNaN(dx[i])) {
              measure += dx[i];
            }
          }

          return measure;
        }

        var textToMeasure = svg.compressSpaces(this.getText());
        if (!ctx.measureText) return textToMeasure.length * 10;
        ctx.save();
        this.setContext(ctx);
        var width = ctx.measureText(textToMeasure).width;
        ctx.restore();
        return width;
      };
    };

    svg.Element.TextElementBase.prototype = new svg.Element.RenderedElementBase(); // tspan

    svg.Element.tspan = function (node) {
      this.captureTextNodes = true;
      this.base = svg.Element.TextElementBase;
      this.base(node);
      this.text = svg.compressSpaces(node.value || node.text || node.textContent || '');

      this.getText = function () {
        // if this node has children, then they own the text
        if (this.children.length > 0) {
          return '';
        }

        return this.text;
      };
    };

    svg.Element.tspan.prototype = new svg.Element.TextElementBase(); // tref

    svg.Element.tref = function (node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);

      this.getText = function () {
        var element = this.getHrefAttribute().getDefinition();
        if (element != null) return element.children[0].getText();
      };
    };

    svg.Element.tref.prototype = new svg.Element.TextElementBase(); // a element

    svg.Element.a = function (node) {
      this.base = svg.Element.TextElementBase;
      this.base(node);
      this.hasText = node.childNodes.length > 0;

      for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType != 3) this.hasText = false;
      } // this might contain text


      this.text = this.hasText ? node.childNodes[0].value : '';

      this.getText = function () {
        return this.text;
      };

      this.baseRenderChildren = this.renderChildren;

      this.renderChildren = function (ctx) {
        if (this.hasText) {
          // render as text element
          this.baseRenderChildren(ctx);
          var fontSize = new svg.Property('fontSize', svg.Font.Parse(svg.ctx.font).fontSize);
          svg.Mouse.checkBoundingBox(this, new svg.BoundingBox(this.x, this.y - fontSize.toPixels('y'), this.x + this.measureText(ctx), this.y));
        } else if (this.children.length > 0) {
          // render as temporary group
          var g = new svg.Element.g();
          g.children = this.children;
          g.parent = this;
          g.render(ctx);
        }
      };

      this.onclick = function () {
        window.open(this.getHrefAttribute().value);
      };

      this.onmousemove = function () {
        svg.ctx.canvas.style.cursor = 'pointer';
      };
    };

    svg.Element.a.prototype = new svg.Element.TextElementBase(); // image element

    svg.Element.image = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      var href = this.getHrefAttribute().value;

      if (href == '') {
        return;
      }

      var isSvg = href.match(/\.svg$/);
      svg.Images.push(this);
      this.loaded = false;

      if (!isSvg) {
        this.img = document.createElement('img');

        if (svg.opts['useCORS'] == true) {
          this.img.crossOrigin = 'Anonymous';
        }

        var self = this;

        this.img.onload = function () {
          self.loaded = true;
        };

        this.img.onerror = function () {
          svg.log('ERROR: image "' + href + '" not found');
          self.loaded = true;
        };

        this.img.src = href;
      } else {
        this.img = svg.ajax(href);
        this.loaded = true;
      }

      this.renderChildren = function (ctx) {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        if (width == 0 || height == 0) return;
        ctx.save();

        if (isSvg) {
          ctx.drawSvg(this.img, x, y, width, height);
        } else {
          ctx.translate(x, y);
          svg.AspectRatio(ctx, this.attribute('preserveAspectRatio').value, width, this.img.width, height, this.img.height, 0, 0);
          ctx.drawImage(this.img, 0, 0);
        }

        ctx.restore();
      };

      this.getBoundingBox = function () {
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');
        return new svg.BoundingBox(x, y, x + width, y + height);
      };
    };

    svg.Element.image.prototype = new svg.Element.RenderedElementBase(); // group element

    svg.Element.g = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.getBoundingBox = function () {
        var bb = new svg.BoundingBox();

        for (var i = 0; i < this.children.length; i++) {
          bb.addBoundingBox(this.children[i].getBoundingBox());
        }

        return bb;
      };
    };

    svg.Element.g.prototype = new svg.Element.RenderedElementBase(); // symbol element

    svg.Element.symbol = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);

      this.render = function (ctx) {// NO RENDER
      };
    };

    svg.Element.symbol.prototype = new svg.Element.RenderedElementBase(); // style element

    svg.Element.style = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node); // text, or spaces then CDATA

      var css = '';

      for (var i = 0; i < node.childNodes.length; i++) {
        css += node.childNodes[i].data;
      }

      css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, ''); // remove comments

      css = svg.compressSpaces(css); // replace whitespace

      var cssDefs = css.split('}');

      for (var i = 0; i < cssDefs.length; i++) {
        if (svg.trim(cssDefs[i]) != '') {
          var cssDef = cssDefs[i].split('{');
          var cssClasses = cssDef[0].split(',');
          var cssProps = cssDef[1].split(';');

          for (var j = 0; j < cssClasses.length; j++) {
            var cssClass = svg.trim(cssClasses[j]);

            if (cssClass != '') {
              var props = svg.Styles[cssClass] || {};

              for (var k = 0; k < cssProps.length; k++) {
                var prop = cssProps[k].indexOf(':');
                var name = cssProps[k].substr(0, prop);
                var value = cssProps[k].substr(prop + 1, cssProps[k].length - prop);

                if (name != null && value != null) {
                  props[svg.trim(name)] = new svg.Property(svg.trim(name), svg.trim(value));
                }
              }

              svg.Styles[cssClass] = props;
              svg.StylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);

              if (cssClass == '@font-face') {
                var fontFamily = props['font-family'].value.replace(/"/g, '');
                var srcs = props['src'].value.split(',');

                for (var s = 0; s < srcs.length; s++) {
                  if (srcs[s].indexOf('format("svg")') > 0) {
                    var urlStart = srcs[s].indexOf('url');
                    var urlEnd = srcs[s].indexOf(')', urlStart);
                    var url = srcs[s].substr(urlStart + 5, urlEnd - urlStart - 6);
                    var doc = svg.parseXml(svg.ajax(url));
                    var fonts = doc.getElementsByTagName('font');

                    for (var f = 0; f < fonts.length; f++) {
                      var font = svg.CreateElement(fonts[f]);
                      svg.Definitions[fontFamily] = font;
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    svg.Element.style.prototype = new svg.Element.ElementBase(); // use element

    svg.Element.use = function (node) {
      this.base = svg.Element.RenderedElementBase;
      this.base(node);
      this.baseSetContext = this.setContext;

      this.setContext = function (ctx) {
        this.baseSetContext(ctx);
        if (this.attribute('x').hasValue()) ctx.translate(this.attribute('x').toPixels('x'), 0);
        if (this.attribute('y').hasValue()) ctx.translate(0, this.attribute('y').toPixels('y'));
      };

      var element = this.getHrefAttribute().getDefinition();

      this.path = function (ctx) {
        if (element != null) element.path(ctx);
      };

      this.getBoundingBox = function () {
        if (element != null) return element.getBoundingBox();
      };

      this.renderChildren = function (ctx) {
        if (element != null) {
          var tempSvg = element;

          if (element.type == 'symbol') {
            // render me using a temporary svg element in symbol cases (http://www.w3.org/TR/SVG/struct.html#UseElement)
            tempSvg = new svg.Element.svg();
            tempSvg.type = 'svg';
            tempSvg.attributes['viewBox'] = new svg.Property('viewBox', element.attribute('viewBox').value);
            tempSvg.attributes['preserveAspectRatio'] = new svg.Property('preserveAspectRatio', element.attribute('preserveAspectRatio').value);
            tempSvg.attributes['overflow'] = new svg.Property('overflow', element.attribute('overflow').value);
            tempSvg.children = element.children;
          }

          if (tempSvg.type == 'svg') {
            // if symbol or svg, inherit width/height from me
            if (this.attribute('width').hasValue()) tempSvg.attributes['width'] = new svg.Property('width', this.attribute('width').value);
            if (this.attribute('height').hasValue()) tempSvg.attributes['height'] = new svg.Property('height', this.attribute('height').value);
          }

          var oldParent = tempSvg.parent;
          tempSvg.parent = null;
          tempSvg.render(ctx);
          tempSvg.parent = oldParent;
        }
      };
    };

    svg.Element.use.prototype = new svg.Element.RenderedElementBase(); // mask element

    svg.Element.mask = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, element) {
        // render as temp svg
        var x = this.attribute('x').toPixels('x');
        var y = this.attribute('y').toPixels('y');
        var width = this.attribute('width').toPixels('x');
        var height = this.attribute('height').toPixels('y');

        if (width == 0 && height == 0) {
          var bb = new svg.BoundingBox();

          for (var i = 0; i < this.children.length; i++) {
            bb.addBoundingBox(this.children[i].getBoundingBox());
          }

          var x = Math.floor(bb.x1);
          var y = Math.floor(bb.y1);
          var width = Math.floor(bb.width());
          var height = Math.floor(bb.height());
        } // temporarily remove mask to avoid recursion


        var mask = element.attribute('mask').value;
        element.attribute('mask').value = '';
        var cMask = document.createElement('canvas');
        cMask.width = x + width;
        cMask.height = y + height;
        var maskCtx = cMask.getContext('2d');
        this.renderChildren(maskCtx);
        var c = document.createElement('canvas');
        c.width = x + width;
        c.height = y + height;
        var tempCtx = c.getContext('2d');
        element.render(tempCtx);
        tempCtx.globalCompositeOperation = 'destination-in';
        tempCtx.fillStyle = maskCtx.createPattern(cMask, 'no-repeat');
        tempCtx.fillRect(0, 0, x + width, y + height);
        ctx.fillStyle = tempCtx.createPattern(c, 'no-repeat');
        ctx.fillRect(0, 0, x + width, y + height); // reassign mask

        element.attribute('mask').value = mask;
      };

      this.render = function (ctx) {// NO RENDER
      };
    };

    svg.Element.mask.prototype = new svg.Element.ElementBase(); // clip element

    svg.Element.clipPath = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx) {
        var oldBeginPath = CanvasRenderingContext2D.prototype.beginPath;

        CanvasRenderingContext2D.prototype.beginPath = function () {};

        var oldClosePath = CanvasRenderingContext2D.prototype.closePath;

        CanvasRenderingContext2D.prototype.closePath = function () {};

        oldBeginPath.call(ctx);

        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];

          if (typeof child.path != 'undefined') {
            var transform = null;

            if (child.style('transform', false, true).hasValue()) {
              transform = new svg.Transform(child.style('transform', false, true).value);
              transform.apply(ctx);
            }

            child.path(ctx);
            CanvasRenderingContext2D.prototype.closePath = oldClosePath;

            if (transform) {
              transform.unapply(ctx);
            }
          }
        }

        oldClosePath.call(ctx);
        ctx.clip();
        CanvasRenderingContext2D.prototype.beginPath = oldBeginPath;
        CanvasRenderingContext2D.prototype.closePath = oldClosePath;
      };

      this.render = function (ctx) {// NO RENDER
      };
    };

    svg.Element.clipPath.prototype = new svg.Element.ElementBase(); // filters

    svg.Element.filter = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, element) {
        // render as temp svg
        var bb = element.getBoundingBox();
        var x = Math.floor(bb.x1);
        var y = Math.floor(bb.y1);
        var width = Math.floor(bb.width());
        var height = Math.floor(bb.height()); // temporarily remove filter to avoid recursion

        var filter = element.style('filter').value;
        element.style('filter').value = '';
        var px = 0,
            py = 0;

        for (var i = 0; i < this.children.length; i++) {
          var efd = this.children[i].extraFilterDistance || 0;
          px = Math.max(px, efd);
          py = Math.max(py, efd);
        }

        var c = document.createElement('canvas');
        c.width = width + 2 * px;
        c.height = height + 2 * py;
        var tempCtx = c.getContext('2d');
        tempCtx.translate(-x + px, -y + py);
        element.render(tempCtx); // apply filters

        for (var i = 0; i < this.children.length; i++) {
          if (typeof this.children[i].apply == 'function') {
            this.children[i].apply(tempCtx, 0, 0, width + 2 * px, height + 2 * py);
          }
        } // render on me


        ctx.drawImage(c, 0, 0, width + 2 * px, height + 2 * py, x - px, y - py, width + 2 * px, height + 2 * py); // reassign filter

        element.style('filter', true).value = filter;
      };

      this.render = function (ctx) {// NO RENDER
      };
    };

    svg.Element.filter.prototype = new svg.Element.ElementBase();

    svg.Element.feMorphology = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, x, y, width, height) {// TODO: implement
      };
    };

    svg.Element.feMorphology.prototype = new svg.Element.ElementBase();

    svg.Element.feComposite = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);

      this.apply = function (ctx, x, y, width, height) {// TODO: implement
      };
    };

    svg.Element.feComposite.prototype = new svg.Element.ElementBase();

    svg.Element.feColorMatrix = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      var matrix = svg.ToNumberArray(this.attribute('values').value);

      switch (this.attribute('type').valueOrDefault('matrix')) {
        // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
        case 'saturate':
          var s = matrix[0];
          matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
          break;

        case 'hueRotate':
          var a = matrix[0] * Math.PI / 180.0;

          var c = function c(m1, m2, m3) {
            return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
          };

          matrix = [c(0.213, 0.787, -0.213), c(0.715, -0.715, -0.715), c(0.072, -0.072, 0.928), 0, 0, c(0.213, -0.213, 0.143), c(0.715, 0.285, 0.140), c(0.072, -0.072, -0.283), 0, 0, c(0.213, -0.213, -0.787), c(0.715, -0.715, 0.715), c(0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
          break;

        case 'luminanceToAlpha':
          matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
          break;
      }

      function imGet(img, x, y, width, height, rgba) {
        return img[y * width * 4 + x * 4 + rgba];
      }

      function imSet(img, x, y, width, height, rgba, val) {
        img[y * width * 4 + x * 4 + rgba] = val;
      }

      function m(i, v) {
        var mi = matrix[i];
        return mi * (mi < 0 ? v - 255 : v);
      }

      this.apply = function (ctx, x, y, width, height) {
        // assuming x==0 && y==0 for now
        var srcData = ctx.getImageData(0, 0, width, height);

        for (var y = 0; y < height; y++) {
          for (var x = 0; x < width; x++) {
            var r = imGet(srcData.data, x, y, width, height, 0);
            var g = imGet(srcData.data, x, y, width, height, 1);
            var b = imGet(srcData.data, x, y, width, height, 2);
            var a = imGet(srcData.data, x, y, width, height, 3);
            imSet(srcData.data, x, y, width, height, 0, m(0, r) + m(1, g) + m(2, b) + m(3, a) + m(4, 1));
            imSet(srcData.data, x, y, width, height, 1, m(5, r) + m(6, g) + m(7, b) + m(8, a) + m(9, 1));
            imSet(srcData.data, x, y, width, height, 2, m(10, r) + m(11, g) + m(12, b) + m(13, a) + m(14, 1));
            imSet(srcData.data, x, y, width, height, 3, m(15, r) + m(16, g) + m(17, b) + m(18, a) + m(19, 1));
          }
        }

        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(srcData, 0, 0);
      };
    };

    svg.Element.feColorMatrix.prototype = new svg.Element.ElementBase();

    svg.Element.feGaussianBlur = function (node) {
      this.base = svg.Element.ElementBase;
      this.base(node);
      this.blurRadius = Math.floor(this.attribute('stdDeviation').numValue());
      this.extraFilterDistance = this.blurRadius;

      this.apply = function (ctx, x, y, width, height) {
        if (typeof stackblur.canvasRGBA == 'undefined') {
          svg.log('ERROR: StackBlur.js must be included for blur to work');
          return;
        } // StackBlur requires canvas be on document


        ctx.canvas.id = svg.UniqueId();
        ctx.canvas.style.display = 'none';
        document.body.appendChild(ctx.canvas);
        stackblur.canvasRGBA(ctx.canvas.id, x, y, width, height, this.blurRadius);
        document.body.removeChild(ctx.canvas);
      };
    };

    svg.Element.feGaussianBlur.prototype = new svg.Element.ElementBase(); // title element, do nothing

    svg.Element.title = function (node) {};

    svg.Element.title.prototype = new svg.Element.ElementBase(); // desc element, do nothing

    svg.Element.desc = function (node) {};

    svg.Element.desc.prototype = new svg.Element.ElementBase();

    svg.Element.MISSING = function (node) {
      svg.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
    };

    svg.Element.MISSING.prototype = new svg.Element.ElementBase(); // element factory

    svg.CreateElement = function (node) {
      var className = node.nodeName.replace(/^[^:]+:/, ''); // remove namespace

      className = className.replace(/\-/g, ''); // remove dashes

      var e = null;

      if (typeof svg.Element[className] != 'undefined') {
        e = new svg.Element[className](node);
      } else {
        e = new svg.Element.MISSING(node);
      }

      e.type = node.nodeName;
      return e;
    }; // load from url


    svg.load = function (ctx, url) {
      svg.loadXml(ctx, svg.ajax(url));
    }; // load from xml


    svg.loadXml = function (ctx, xml) {
      svg.loadXmlDoc(ctx, svg.parseXml(xml));
    };

    svg.loadXmlDoc = function (ctx, dom) {
      svg.init(ctx);

      var mapXY = function mapXY(p) {
        var e = ctx.canvas;

        while (e) {
          p.x -= e.offsetLeft;
          p.y -= e.offsetTop;
          e = e.offsetParent;
        }

        if (window.scrollX) p.x += window.scrollX;
        if (window.scrollY) p.y += window.scrollY;
        return p;
      }; // bind mouse


      if (svg.opts['ignoreMouse'] != true) {
        ctx.canvas.onclick = function (e) {
          var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
          svg.Mouse.onclick(p.x, p.y);
        };

        ctx.canvas.onmousemove = function (e) {
          var p = mapXY(new svg.Point(e != null ? e.clientX : event.clientX, e != null ? e.clientY : event.clientY));
          svg.Mouse.onmousemove(p.x, p.y);
        };
      }

      var e = svg.CreateElement(dom.documentElement);
      e.root = true;
      e.addStylesFromStyleDefinition(); // render loop

      var isFirstRender = true;

      var draw = function draw() {
        svg.ViewPort.Clear();
        if (ctx.canvas.parentNode) svg.ViewPort.SetCurrent(ctx.canvas.parentNode.clientWidth, ctx.canvas.parentNode.clientHeight);

        if (svg.opts['ignoreDimensions'] != true) {
          // set canvas size
          if (e.style('width').hasValue()) {
            ctx.canvas.width = e.style('width').toPixels('x');
            ctx.canvas.style.width = ctx.canvas.width + 'px';
          }

          if (e.style('height').hasValue()) {
            ctx.canvas.height = e.style('height').toPixels('y');
            ctx.canvas.style.height = ctx.canvas.height + 'px';
          }
        }

        var cWidth = ctx.canvas.clientWidth || ctx.canvas.width;
        var cHeight = ctx.canvas.clientHeight || ctx.canvas.height;

        if (svg.opts['ignoreDimensions'] == true && e.style('width').hasValue() && e.style('height').hasValue()) {
          cWidth = e.style('width').toPixels('x');
          cHeight = e.style('height').toPixels('y');
        }

        svg.ViewPort.SetCurrent(cWidth, cHeight);
        if (svg.opts['offsetX'] != null) e.attribute('x', true).value = svg.opts['offsetX'];
        if (svg.opts['offsetY'] != null) e.attribute('y', true).value = svg.opts['offsetY'];

        if (svg.opts['scaleWidth'] != null || svg.opts['scaleHeight'] != null) {
          var xRatio = null,
              yRatio = null,
              viewBox = svg.ToNumberArray(e.attribute('viewBox').value);

          if (svg.opts['scaleWidth'] != null) {
            if (e.attribute('width').hasValue()) xRatio = e.attribute('width').toPixels('x') / svg.opts['scaleWidth'];else if (!isNaN(viewBox[2])) xRatio = viewBox[2] / svg.opts['scaleWidth'];
          }

          if (svg.opts['scaleHeight'] != null) {
            if (e.attribute('height').hasValue()) yRatio = e.attribute('height').toPixels('y') / svg.opts['scaleHeight'];else if (!isNaN(viewBox[3])) yRatio = viewBox[3] / svg.opts['scaleHeight'];
          }

          if (xRatio == null) {
            xRatio = yRatio;
          }

          if (yRatio == null) {
            yRatio = xRatio;
          }

          e.attribute('width', true).value = svg.opts['scaleWidth'];
          e.attribute('height', true).value = svg.opts['scaleHeight'];
          e.style('transform', true, true).value += ' scale(' + 1.0 / xRatio + ',' + 1.0 / yRatio + ')';
        } // clear and render


        if (svg.opts['ignoreClear'] != true) {
          ctx.clearRect(0, 0, cWidth, cHeight);
        }

        e.render(ctx);

        if (isFirstRender) {
          isFirstRender = false;
          if (typeof svg.opts['renderCallback'] == 'function') svg.opts['renderCallback'](dom);
        }
      };

      var waitingForImages = true;

      if (svg.ImagesLoaded()) {
        waitingForImages = false;
        draw();
      }

      svg.intervalID = setInterval(function () {
        var needUpdate = false;

        if (waitingForImages && svg.ImagesLoaded()) {
          waitingForImages = false;
          needUpdate = true;
        } // need update from mouse events?


        if (svg.opts['ignoreMouse'] != true) {
          needUpdate = needUpdate | svg.Mouse.hasEvents();
        } // need update from animations?


        if (svg.opts['ignoreAnimation'] != true) {
          for (var i = 0; i < svg.Animations.length; i++) {
            needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
          }
        } // need update from redraw?


        if (typeof svg.opts['forceRedraw'] == 'function') {
          if (svg.opts['forceRedraw']() == true) needUpdate = true;
        } // render if needed


        if (needUpdate) {
          draw();
          svg.Mouse.runEvents(); // run and clear our events
        }
      }, 1000 / svg.FRAMERATE);
    };

    svg.stop = function () {
      if (svg.intervalID) {
        clearInterval(svg.intervalID);
      }
    };

    svg.Mouse = new function () {
      this.events = [];

      this.hasEvents = function () {
        return this.events.length != 0;
      };

      this.onclick = function (x, y) {
        this.events.push({
          type: 'onclick',
          x: x,
          y: y,
          run: function run(e) {
            if (e.onclick) e.onclick();
          }
        });
      };

      this.onmousemove = function (x, y) {
        this.events.push({
          type: 'onmousemove',
          x: x,
          y: y,
          run: function run(e) {
            if (e.onmousemove) e.onmousemove();
          }
        });
      };

      this.eventElements = [];

      this.checkPath = function (element, ctx) {
        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          if (ctx.isPointInPath && ctx.isPointInPath(e.x, e.y)) this.eventElements[i] = element;
        }
      };

      this.checkBoundingBox = function (element, bb) {
        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          if (bb.isPointInBox(e.x, e.y)) this.eventElements[i] = element;
        }
      };

      this.runEvents = function () {
        svg.ctx.canvas.style.cursor = '';

        for (var i = 0; i < this.events.length; i++) {
          var e = this.events[i];
          var element = this.eventElements[i];

          while (element) {
            e.run(element);
            element = element.parent;
          }
        } // done running, clear


        this.events = [];
        this.eventElements = [];
      };
    }();
    return svg;
  }

  var canvgBrowser = canvg;
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "",
        i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {
      space: namespaces[prefix],
      local: name
    } : name; // eslint-disable-line no-prototype-builtins
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

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function () {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
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

  function array(x) {
    return _typeof(x) === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function () {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function () {
      var group = select.apply(this, arguments);
      return group == null ? [] : array(group);
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);else select = selectorAll(select);

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

  function matcher(selector) {
    return function () {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function (node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function () {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return this.children;
  }

  function childrenFilter(match) {
    return function () {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
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

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
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

  function constant(x) {
    return function () {
      return x;
    };
  }

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
        nodeByKeyValue = new Map(),
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue; // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.

    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";

        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    } // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.


    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";

      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue["delete"](keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    } // Add any remaining nodes that were not bound to data to exit.


    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;
    if (typeof value !== "function") value = constant(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = array(value.call(parent, parent && parent.__data__, j, parents)),
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
            ;
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

  function selection_exit() {
    return new Selection(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(),
        update = this,
        exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove();else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    if (!(selection instanceof Selection)) throw new Error("invalid merge");

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

  function selection_order() {
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

  function selection_sort(compare) {
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

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    var size = 0;

    var _iterator = _createForOfIteratorHelper(this),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;
        ++size;
      } // eslint-disable-line no-unused-vars

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {
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

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }

    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  function defaultView(node) {
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

  function selection_style(name, value, priority) {
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

  function selection_property(name, value) {
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

  function selection_classed(name, value) {
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

  function selection_text(value) {
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

  function selection_html(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function () {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
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

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false),
        parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true),
        parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  function contextListener(listener) {
    return function (event) {
      listener.call(this, event, this.__data__);
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
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }

      if (++i) on.length = i;else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function () {
      var on = this.__on,
          o,
          listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {
        type: typename.type,
        name: typename.name,
        value: value,
        listener: listener,
        options: options
      };
      if (!on) this.__on = [o];else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
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

    for (i = 0; i < n; ++i) {
      this.each(on(typenames[i], value, options));
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

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
  }

  function selection_iterator() {
    var groups, j, m, group, i, n, node;
    return regeneratorRuntime.wrap(function selection_iterator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            groups = this._groups, j = 0, m = groups.length;

          case 1:
            if (!(j < m)) {
              _context.next = 13;
              break;
            }

            group = groups[j], i = 0, n = group.length;

          case 3:
            if (!(i < n)) {
              _context.next = 10;
              break;
            }

            if (!(node = group[i])) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return node;

          case 7:
            ++i;
            _context.next = 3;
            break;

          case 10:
            ++j;
            _context.next = 1;
            break;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this);
  }

  var root = [null];

  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection_selection() {
    return this;
  }

  Selection.prototype = _defineProperty({
    constructor: Selection,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
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
  }, Symbol.iterator, selection_iterator);

  function select(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  function selectAll(selector) {
    return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([selector == null ? [] : array(selector)], root);
  }
  /**
      @function svgPresets
      @desc Adds SVG default attributes to a d3 selection in order to render it properly.
      @param {Selection} selection
  */


  function svgPresets(selection) {
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


  function htmlPresets(selection) {
    selection.selectAll("*").each(function () {
      var tag = this.tagName.toLowerCase();

      if (!["option"].includes(tag)) {
        var elem = select(this);
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
    var property = select(elem).attr("transform");
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


  function dom2canvas(elem, options) {
    if (!elem) return;
    if (!(elem instanceof Array)) elem = [elem];
    options = Object.assign({}, defaultOptions, options);
    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);
    var ratio = window ? window.devicePixelRatio || 1 : 1;
    var reference = elem[0];
    if (reference.constructor === Object) reference = reference.element;
    var height = options.height || parseFloat(select(reference).style("height")) + parseFloat(select(reference).style("padding-top")) + parseFloat(select(reference).style("padding-bottom")),
        width = options.width || parseFloat(select(reference).style("width")) + parseFloat(select(reference).style("padding-left")) + parseFloat(select(reference).style("padding-right"));
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
        var opacity = select(this).attr("opacity") || select(this).style("opacity");
        var display = select(this).style("display");
        var visibility = select(this).style("visibility");
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

          var x = select(this).attr("x");
          x = x ? parseFloat(x) * transform.scale : 0;
          transform.x += x;
          var y = select(this).attr("y");
          y = y ? parseFloat(y) * transform.scale : 0;
          transform.y += y;
          transform.clip = {
            height: parseFloat(select(this).attr("height") || select(this).style("height")),
            width: parseFloat(select(this).attr("width") || select(this).style("width")),
            x: x,
            y: y
          };
        } else {
          var _x = select(this).attr("x");

          if (_x) transform.x += parseFloat(_x) * transform.scale;

          var _y = select(this).attr("y");

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

        select(_elem).call(svgPresets);
        layers.push(Object.assign({}, transform, {
          type: "svg",
          value: _elem
        }));
      } else if (["image", "img"].includes(tag)) {
        var url = select(this).attr("href") || select(this).attr("xlink:href");

        if (url.length) {
          var h = parseFloat(select(this).attr("height")) * transform.scale,
              w = parseFloat(select(this).attr("width")) * transform.scale;
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
      } else if (!["svg", "g", "text"].includes(tag) && !select(this).selectAll("svg").size()) {
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
        htmlPresets(select(this));
        html2canvas(this, {
          allowTaint: true,
          canvas: tempCanvas,
          letterRendering: true
        }).then(function (c) {
          _data.value = c;
          _data.loaded = true;
        });
      } else if (tag !== "svg" && this.childNodes.length > 0 && !select(this).selectAll("image, img, svg").size()) {
        var _elem2 = this.cloneNode(true);

        select(_elem2).selectAll("*").each(function () {
          select(this).call(svgPresets);
          if (select(this).attr("opacity") === "0") this.parentNode.removeChild(this);
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

        select(_elem3).selectAll("*").each(function () {
          if (select(this).attr("opacity") === "0") this.parentNode.removeChild(this);
        });

        if (tag === "line") {
          select(_elem3).attr("x1", parseFloat(select(_elem3).attr("x1")) + transform.x);
          select(_elem3).attr("x2", parseFloat(select(_elem3).attr("x2")) + transform.x);
          select(_elem3).attr("y1", parseFloat(select(_elem3).attr("y1")) + transform.y);
          select(_elem3).attr("y2", parseFloat(select(_elem3).attr("y2")) + transform.y);
        } else if (tag === "path") {
          var _parseTransform3 = parseTransform(_elem3),
              _parseTransform4 = _slicedToArray(_parseTransform3, 3),
              _scale = _parseTransform4[0],
              _x3 = _parseTransform4[1],
              _y3 = _parseTransform4[2];

          if (select(_elem3).attr("transform")) select(_elem3).attr("transform", "scale(".concat(_scale, ")translate(").concat(_x3 + transform.x, ",").concat(_y3 + transform.y, ")"));
        }

        select(_elem3).call(svgPresets);
        var fill = select(_elem3).attr("fill");
        var defFill = fill && fill.indexOf("url") === 0; // if (defFill) select(elem).attr("fill-opacity", 0);

        layers.push(Object.assign({}, transform, {
          type: "svg",
          value: _elem3,
          tag: tag
        }));

        if (defFill) {
          var def = select(fill.slice(4, -1)).node().cloneNode(true);
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
      selectAll(e.childNodes).each(function () {
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

      for (var _i2 = 0; _i2 < layers.length; _i2++) {
        if (layers[_i2].loaded === false) {
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
      for (var _i3 = 0; _i3 < layers.length; _i3++) {
        var layer = layers[_i3];
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
            var parent = select(layer.style);
            var title = layer.value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            var fC = parent.style("color"),
                fS = parent.style("font-size");
            var fF = parent.style("font-family").split(",")[0];
            if (fF.indexOf("'") !== 0) fF = "'".concat(fF, "'");
            var text = "<text stroke='none' dy='".concat(fS, "' fill='").concat(fC, "' font-family=").concat(fF, " font-size='").concat(fS, "'>").concat(title, "</text>");
            context.save();
            context.translate(options.padding, options.padding);
            canvgBrowser(canvas, text, Object.assign({}, canvgOptions, {
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
            canvgBrowser(canvas, outer, Object.assign({}, canvgOptions, {
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
  /* canvas-toBlob.js
   * A canvas.toBlob() implementation.
   * 2016-05-26
   * 
   * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
   * License: MIT
   *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
   */

  /*global self */

  /*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
    plusplus: true */

  /*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */


  (function (view) {
    var Uint8Array = view.Uint8Array,
        HTMLCanvasElement = view.HTMLCanvasElement,
        canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
        is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
        to_data_url = "toDataURL",
        base64_ranks,
        decode_base64 = function decode_base64(base64) {
      var len = base64.length,
          buffer = new Uint8Array(len / 4 * 3 | 0),
          i = 0,
          outptr = 0,
          last = [0, 0],
          state = 0,
          save = 0,
          rank,
          code,
          undef;

      while (len--) {
        code = base64.charCodeAt(i++);
        rank = base64_ranks[code - 43];

        if (rank !== 255 && rank !== undef) {
          last[1] = last[0];
          last[0] = code;
          save = save << 6 | rank;
          state++;

          if (state === 4) {
            buffer[outptr++] = save >>> 16;

            if (last[1] !== 61
            /* padding character */
            ) {
                buffer[outptr++] = save >>> 8;
              }

            if (last[0] !== 61
            /* padding character */
            ) {
                buffer[outptr++] = save;
              }

            state = 0;
          }
        }
      } // 2/3 chance there's going to be some null bytes at the end, but that
      // doesn't really matter with most image formats.
      // If it somehow matters for you, truncate the buffer up outptr.


      return buffer;
    };

    if (Uint8Array) {
      base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
    }

    if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
      if (!canvas_proto.toBlob) canvas_proto.toBlob = function (callback, type
      /*, ...args*/
      ) {
        if (!type) {
          type = "image/png";
        }

        if (this.mozGetAsFile) {
          callback(this.mozGetAsFile("canvas", type));
          return;
        }

        if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
          callback(this.msToBlob());
          return;
        }

        var args = Array.prototype.slice.call(arguments, 1),
            dataURI = this[to_data_url].apply(this, args),
            header_end = dataURI.indexOf(","),
            data = dataURI.substring(header_end + 1),
            is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
            blob;

        if (Blob.fake) {
          // no reason to decode a data: URI that's just going to become a data URI again
          blob = new Blob();

          if (is_base64) {
            blob.encoding = "base64";
          } else {
            blob.encoding = "URI";
          }

          blob.data = data;
          blob.size = data.length;
        } else if (Uint8Array) {
          if (is_base64) {
            blob = new Blob([decode_base64(data)], {
              type: type
            });
          } else {
            blob = new Blob([decodeURIComponent(data)], {
              type: type
            });
          }
        }

        callback(blob);
      };

      if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
        canvas_proto.toBlobHD = function () {
          to_data_url = "toDataURLHD";
          var blob = this.toBlob();
          to_data_url = "toDataURL";
          return blob;
        };
      } else {
        canvas_proto.toBlobHD = canvas_proto.toBlob;
      }
    }
  })(typeof self !== "undefined" && self || typeof window !== "undefined" && window || commonjsGlobal.content || commonjsGlobal);
  /* FileSaver.js
   * A saveAs() FileSaver implementation.
   * 1.3.2
   * 2016-06-16 18:25:19
   *
   * By Eli Grey, http://eligrey.com
   * License: MIT
   *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
   */


  var FileSaver = createCommonjsModule(function (module) {
    /*global self */

    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
    var saveAs = saveAs || function (view) {
      // IE <10 is explicitly unsupported
      if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
      }

      var doc = view.document // only get URL when necessary in case Blob.js hasn't overridden it yet
      ,
          get_URL = function get_URL() {
        return view.URL || view.webkitURL || view;
      },
          save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
          can_use_save_link = ("download" in save_link),
          click = function click(node) {
        var event = new MouseEvent("click");
        node.dispatchEvent(event);
      },
          is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
          is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
          throw_outside = function throw_outside(ex) {
        (view.setImmediate || view.setTimeout)(function () {
          throw ex;
        }, 0);
      },
          force_saveable_type = "application/octet-stream" // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
      ,
          arbitrary_revoke_timeout = 1000 * 40 // in ms
      ,
          revoke = function revoke(file) {
        var revoker = function revoker() {
          if (typeof file === "string") {
            // file is an object URL
            get_URL().revokeObjectURL(file);
          } else {
            // file is a File
            file.remove();
          }
        };

        setTimeout(revoker, arbitrary_revoke_timeout);
      },
          dispatch = function dispatch(filesaver, event_types, event) {
        event_types = [].concat(event_types);
        var i = event_types.length;

        while (i--) {
          var listener = filesaver["on" + event_types[i]];

          if (typeof listener === "function") {
            try {
              listener.call(filesaver, event || filesaver);
            } catch (ex) {
              throw_outside(ex);
            }
          }
        }
      },
          auto_bom = function auto_bom(blob) {
        // prepend BOM for UTF-8 XML and text/* types (including HTML)
        // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
        if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
          return new Blob([String.fromCharCode(0xFEFF), blob], {
            type: blob.type
          });
        }

        return blob;
      },
          FileSaver = function FileSaver(blob, name, no_auto_bom) {
        if (!no_auto_bom) {
          blob = auto_bom(blob);
        } // First try a.download, then web filesystem, then object URLs


        var filesaver = this,
            type = blob.type,
            force = type === force_saveable_type,
            object_url,
            dispatch_all = function dispatch_all() {
          dispatch(filesaver, "writestart progress write writeend".split(" "));
        } // on any filesys errors revert to saving with object URLs
        ,
            fs_error = function fs_error() {
          if ((is_chrome_ios || force && is_safari) && view.FileReader) {
            // Safari doesn't allow downloading of blob urls
            var reader = new FileReader();

            reader.onloadend = function () {
              var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
              var popup = view.open(url, '_blank');
              if (!popup) view.location.href = url;
              url = undefined; // release reference before dispatching

              filesaver.readyState = filesaver.DONE;
              dispatch_all();
            };

            reader.readAsDataURL(blob);
            filesaver.readyState = filesaver.INIT;
            return;
          } // don't create more object URLs than needed


          if (!object_url) {
            object_url = get_URL().createObjectURL(blob);
          }

          if (force) {
            view.location.href = object_url;
          } else {
            var opened = view.open(object_url, "_blank");

            if (!opened) {
              // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
              view.location.href = object_url;
            }
          }

          filesaver.readyState = filesaver.DONE;
          dispatch_all();
          revoke(object_url);
        };

        filesaver.readyState = filesaver.INIT;

        if (can_use_save_link) {
          object_url = get_URL().createObjectURL(blob);
          setTimeout(function () {
            save_link.href = object_url;
            save_link.download = name;
            click(save_link);
            dispatch_all();
            revoke(object_url);
            filesaver.readyState = filesaver.DONE;
          });
          return;
        }

        fs_error();
      },
          FS_proto = FileSaver.prototype,
          saveAs = function saveAs(blob, name, no_auto_bom) {
        return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
      }; // IE 10+ (native saveAs)


      if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name, no_auto_bom) {
          name = name || blob.name || "download";

          if (!no_auto_bom) {
            blob = auto_bom(blob);
          }

          return navigator.msSaveOrOpenBlob(blob, name);
        };
      }

      FS_proto.abort = function () {};

      FS_proto.readyState = FS_proto.INIT = 0;
      FS_proto.WRITING = 1;
      FS_proto.DONE = 2;
      FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
      return saveAs;
    }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || commonjsGlobal.content); // `self` is undefined in Firefox for Android content script context
    // while `this` is nsIContentFrameMessageManager
    // with an attribute `content` that corresponds to the window


    if (module.exports) {
      module.exports.saveAs = saveAs;
    }
  });
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

  function saveElement(elem) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var renderOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!elem) return;
    options = Object.assign({}, defaultOptions$1, options);
    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);

    if (!(elem instanceof Array) && options.type === "svg") {
      var outer = IE ? new XMLSerializer().serializeToString(elem) : elem.outerHTML;
      FileSaver.saveAs(new Blob([outer], {
        type: "application/svg+xml"
      }), "".concat(options.filename, ".svg"));
    }

    dom2canvas(elem, Object.assign({}, renderOptions, {
      callback: function callback(canvas) {
        if (renderOptions.callback) renderOptions.callback(canvas);

        if (["jpg", "png"].includes(options.type)) {
          canvas.toBlob(function (blob) {
            return FileSaver.saveAs(blob, "".concat(options.filename, ".").concat(options.type));
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
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=d3plus-export.full.js.map
