function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
  d3plus-plot v1.0.3
  A reusable javascript x/y plot built on D3.
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
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-common'), require('d3-array'), require('d3-collection'), require('d3-scale'), require('d3-shape'), require('d3plus-axis'), require('d3plus-color'), require('d3plus-shape'), require('d3plus-text'), require('d3plus-viz'), require('d3-selection')) : typeof define === 'function' && define.amd ? define('d3plus-plot', ['exports', 'd3plus-common', 'd3-array', 'd3-collection', 'd3-scale', 'd3-shape', 'd3plus-axis', 'd3plus-color', 'd3plus-shape', 'd3plus-text', 'd3plus-viz', 'd3-selection'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3plus = {}, global.d3plusCommon, global.d3Array, global.d3Collection, global.scales, global.d3Shape, global.d3plusAxis, global.d3plusColor, global.shapes, global.d3plusText, global.d3plusViz, global.d3Selection));
})(this, function (exports, d3plusCommon, d3Array, d3Collection, scales, d3Shape, d3plusAxis, d3plusColor, shapes, d3plusText, d3plusViz, d3Selection) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);

    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function get() {
              return e[k];
            }
          });
        }
      });
    }

    n['default'] = e;
    return Object.freeze(n);
  }

  var scales__namespace = /*#__PURE__*/_interopNamespace(scales);

  var d3Shape__namespace = /*#__PURE__*/_interopNamespace(d3Shape);

  var shapes__namespace = /*#__PURE__*/_interopNamespace(shapes);
  /**
   * Adds left/right padding to a point or time scale.
   * @private
   */


  var discreteBuffer = function discreteBuffer(scale, data, discrete) {
    if (scale.padding) scale.padding(0.5);else {
      var closest = data.map(function (d) {
        return d[discrete];
      }).reduce(function (acc, curr, i, arr) {
        if (!i) return acc;
        var prev = arr[i - 1];
        if (!acc || curr - prev < acc) return curr - prev;else return acc;
      }, 0);
      var domain = scale.domain().slice();
      if (discrete === "y") domain.reverse();
      domain[0] = new Date(+domain[0] - closest / 2);
      domain[1] = new Date(+domain[1] + closest / 2);
      if (discrete === "y") domain.reverse();
      scale.domain(domain);
    }
  };
  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer = 10]
      @private
  */


  function BarBuffer(_ref) {
    var _this = this;

    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        x2 = _ref.x2,
        y2 = _ref.y2,
        _ref$buffer = _ref.buffer,
        buffer = _ref$buffer === void 0 ? 10 : _ref$buffer;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var oppScale = this._discrete === "x" ? y : x;
    var oppDomain = oppScale.domain().slice();
    var isDiscreteX = this._discrete === "x";
    if (isDiscreteX) oppDomain.reverse();
    var negVals, posVals;

    if (this._stacked) {
      var groupedData = d3Collection.nest().key(function (d) {
        return "".concat(d[_this._discrete], "_").concat(d.group);
      }).entries(data).map(function (d) {
        return d.values.map(function (x) {
          return x[isDiscreteX ? yKey : xKey];
        });
      });
      posVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d > 0;
        }));
      });
      negVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d < 0;
        }));
      });
    } else {
      posVals = data.map(function (d) {
        return d[isDiscreteX ? yKey : xKey];
      });
      negVals = posVals;
    }

    var bMax = oppScale(d3Array.max(posVals));
    if (isDiscreteX ? bMax < oppScale(0) : bMax > oppScale(0)) bMax += isDiscreteX ? -buffer : buffer;
    bMax = oppScale.invert(bMax);
    var bMin = oppScale(d3Array.min(negVals));
    if (isDiscreteX ? bMin > oppScale(0) : bMin < oppScale(0)) bMin += isDiscreteX ? buffer : -buffer;
    bMin = oppScale.invert(bMin);
    if (bMax > oppDomain[1]) oppDomain[1] = bMax;
    if (bMin < oppDomain[0]) oppDomain[0] = bMin;
    if (isDiscreteX) oppDomain.reverse();
    oppScale.domain(oppDomain);
    discreteBuffer(isDiscreteX ? x : y, data, this._discrete);
    return [x, y];
  }
  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer = 10]
      @private
  */


  function BoxBuffer(_ref2) {
    var _this2 = this;

    var data = _ref2.data,
        x = _ref2.x,
        y = _ref2.y,
        x2 = _ref2.x2,
        y2 = _ref2.y2,
        _ref2$buffer = _ref2.buffer,
        buffer = _ref2$buffer === void 0 ? 10 : _ref2$buffer;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var oppScale = this._discrete === "x" ? y : x;
    var oppDomain = oppScale.domain().slice();
    var isDiscreteX = this._discrete === "x";
    if (isDiscreteX) oppDomain.reverse();
    var negVals, posVals;

    if (this._stacked) {
      var groupedData = d3Collection.nest().key(function (d) {
        return d[_this2._discrete];
      }).entries(data).map(function (d) {
        return d.values.map(function (x) {
          return x[isDiscreteX ? yKey : xKey];
        });
      });
      posVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d > 0;
        }));
      });
      negVals = groupedData.map(function (arr) {
        return d3Array.sum(arr.filter(function (d) {
          return d < 0;
        }));
      });
    } else {
      posVals = data.map(function (d) {
        return d[isDiscreteX ? yKey : xKey];
      });
      negVals = posVals;
    }

    var bMax = oppScale(d3Array.max(posVals));
    bMax += isDiscreteX ? -buffer : buffer;
    bMax = oppScale.invert(bMax);
    var bMin = oppScale(d3Array.min(negVals));
    bMin += isDiscreteX ? buffer : -buffer;
    bMin = oppScale.invert(bMin);
    if (bMax > oppDomain[1]) oppDomain[1] = bMax;
    if (bMin < oppDomain[0]) oppDomain[0] = bMin;
    if (isDiscreteX) oppDomain.reverse();
    oppScale.domain(oppDomain);
    discreteBuffer(isDiscreteX ? x : y, data, this._discrete);
    return [x, y];
  }
  /** */


  function numericBuffer(axis, scale, value, size, range, domain, index, invert) {
    if (invert) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }

    var logMod = Math.abs(Math.log(domain[1] - domain[0]) / 10);

    var needsBuffer = function needsBuffer() {
      var tempAxis = axis.copy();
      var diverging = false;

      if (scale === "log") {
        var d = axis.domain().slice(),
            r = axis.range().slice();

        if (invert) {
          d = d.reverse();
          r = r.reverse();
        }

        diverging = d[0] * d[1] < 0;

        if (diverging) {
          var percentScale = scales.scaleLog().domain([1e-6, Math.abs(d[index])]).range([0, 1]);
          var leftPercentage = percentScale(Math.abs(d[index ? 0 : 1]));
          var zero = leftPercentage / (leftPercentage + 1) * (r[1] - r[0]);
          d = (index === 0 ? [d[0], 1e-6] : [1e-6, d[1]]).map(Math.abs);
          r = index === 0 ? [r[0], r[0] + zero] : [r[0] + zero, r[1]];
        }

        tempAxis = scales.scaleLog().domain(d).range(r);
      }

      var outside = false;
      var tempRange = tempAxis.range();
      var pixelValue;

      if (scale === "log") {
        pixelValue = diverging ? tempAxis(Math.abs(value)) : tempAxis(value);
      } else pixelValue = tempAxis(value);

      if (invert) {
        if (index === 0) outside = pixelValue + size > tempRange[index];else if (index === 1) outside = pixelValue - size < tempRange[index];
      } else {
        if (index === 0) outside = pixelValue - size < tempRange[index];else if (index === 1) outside = pixelValue + size > tempRange[index];
      }

      return outside;
    };

    if (axis.invert && needsBuffer()) {
      var mod = 10;

      if (scale === "log") {
        var i = 0;

        while (i < 10 && needsBuffer()) {
          var _mod = (index === 0 ? -1 : 1) * (domain[index] < 0 ? -1 : 1);

          domain[index] += domain[index] * logMod * _mod;
          axis.domain(invert ? domain.slice().reverse() : domain);
          i++;
        }
      } else if (index === 0) {
        var v = axis.invert(axis(value) + (size + mod) * (invert ? 1 : -1));

        if (v < domain[index]) {
          domain[index] = v;
          axis.domain(invert ? domain.slice().reverse() : domain);
        }
      } else if (index === 1) {
        var _v = axis.invert(axis(value) + (size + mod) * (invert ? -1 : 1));

        if (_v > domain[index]) {
          domain[index] = _v;
          axis.domain(invert ? domain.slice().reverse() : domain);
        }
      }
    }

    return invert ? domain.reverse() : domain;
  }
  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the radius of the largest Circle.
      @private
  */


  function CircleBuffer(_ref3) {
    var data = _ref3.data,
        x = _ref3.x,
        y = _ref3.y,
        x2 = _ref3.x2,
        y2 = _ref3.y2,
        yScale = _ref3.yScale,
        xScale = _ref3.xScale,
        config = _ref3.config,
        buffer = _ref3.buffer;
    x = x.copy();
    y = y.copy();
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var xD = x.domain().slice(),
        yD = y.domain().slice();
    var xR = x.range(),
        yR = y.range();
    if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
    if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

    if (x.invert || y.invert) {
      data.forEach(function (d) {
        var s = buffer ? buffer : config.r(d.data, d.i) * 2;

        if (x.invert) {
          xD = numericBuffer(x, xScale, d[xKey], s, xR, xD, 0, false);
          xD = numericBuffer(x, xScale, d[xKey], s, xR, xD, 1, false);
        }

        if (y.invert) {
          yD = numericBuffer(y, yScale, d[yKey], s, yR, yD, 0, true);
          yD = numericBuffer(y, yScale, d[yKey], s, yR, yD, 1, true);
        }
      });
    }

    return [x, y];
  }
  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the radius of the largest Circle.
      @private
  */


  function LineBuffer(_ref4) {
    var _this3 = this;

    var data = _ref4.data,
        x = _ref4.x,
        y = _ref4.y,
        x2 = _ref4.x2,
        y2 = _ref4.y2;
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var s = this._discrete === "x" ? y : x;
    var d = s.domain().slice();
    if (this._discrete === "x") d.reverse();
    var vals = data.map(function (d) {
      return d[_this3._discrete === "x" ? yKey : xKey];
    });
    var b = s.invert(s(d3Array.max(vals)) + (this._discrete === "x" ? -10 : 10));
    if (b > d[1]) d[1] = b;
    if (this._discrete === "x") d.reverse();
    s.domain(d);
    return [x, y];
  }
  /**
      Adds a buffer to either side of the non-discrete axis.
      @param {Array} data
      @param {D3Scale} x
      @param {D3Scale} y
      @param {Object} [config]
      @param {Number} [buffer] Defaults to the width/height of the largest Rect.
      @private
  */


  function RectBuffer(_ref5) {
    var data = _ref5.data,
        x = _ref5.x,
        y = _ref5.y,
        x2 = _ref5.x2,
        y2 = _ref5.y2,
        yScale = _ref5.yScale,
        xScale = _ref5.xScale,
        config = _ref5.config;
    x = x.copy();
    y = y.copy();
    var xKey = x2 ? "x2" : "x";
    var yKey = y2 ? "y2" : "y";
    var xD = x.domain().slice(),
        yD = y.domain().slice();
    var xR = x.range(),
        yR = y.range();
    if (!x.invert && x.padding) discreteBuffer(x, data, this._discrete);
    if (!y.invert && y.padding) discreteBuffer(y, data, this._discrete);

    if (x.invert || y.invert) {
      data.forEach(function (d) {
        if (x.invert) {
          var w = config.width(d.data, d.i);
          xD = numericBuffer(x, xScale, d[xKey], w, xR, xD, 0, false);
          xD = numericBuffer(x, xScale, d[xKey], w, xR, xD, 1, false);
        }

        if (y.invert) {
          var h = config.height(d.data, d.i);
          yD = numericBuffer(y, yScale, d[yKey], h, yR, yD, 0, true);
          yD = numericBuffer(y, yScale, d[yKey], h, yR, yD, 1, true);
        }
      });
    }

    return [x, y];
  }
  /* eslint no-cond-assign: 0 */


  var testLineShape = new shapes.Line();
  var testTextBox = new d3plusText.TextBox();
  /**
      @desc Logic for determining default sizes of shapes using the sizeScaleD3 internal function.
      @private
  */

  function defaultSize(d) {
    return this._sizeScaleD3(this._size ? this._size(d) : null);
  }
  /**
      @desc Logic for determining stackOrder ascending using groups.
      @private
  */


  function stackOrderAscending(series) {
    var sums = series.map(stackSum);
    var keys = series.map(function (d) {
      return d.key.split("_")[0];
    });
    return d3Shape.stackOrderNone(series).sort(function (a, b) {
      return keys[b].localeCompare(keys[a]) || sums[a] - sums[b];
    });
  }
  /**
      @desc Logic for determining stackOrder descending using groups.
      @private
  */


  function stackOrderDescending(series) {
    return stackOrderAscending(series).reverse();
  }
  /**
      @desc Logic for determining default sum of shapes using the stackSum function used in d3Shape.
      @private
  */


  function stackSum(series) {
    var i = -1,
        s = 0,
        v;
    var n = series.length;

    while (++i < n) {
      if (v = +series[i][1]) s += v;
    }

    return s;
  }
  /**
      @desc Logic for determining default sum of shapes using the stackSum function used in d3Shape.
      @private
  */


  function stackOffsetDiverging(series, order) {
    var n;
    if (!((n = series.length) > 0)) return;
    var d, dy, i, yn, yp;
    var m = series[order[0]].length;

    for (var j = 0; j < m; ++j) {
      for (yp = yn = 0, i = 0; i < n; ++i) {
        if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
          d[0] = yp, d[1] = yp += dy;
        } else if (dy < 0) {
          d[1] = yn, d[0] = yn += dy;
        } else {
          d[0] = yp;
        }
      }
    }
  }
  /**
   * Determines if a Bar label should be placed outside of the Bar.
   * @param {@} d
   * @param {*} i
   * @private
   */


  function outside(d, i) {
    if (this._stacked) return false;
    var other = this._discrete.charAt(0) === "x" ? "y" : "x";

    var nonDiscrete = this._discrete.replace(this._discrete.charAt(0), other);

    var range = this["_".concat(nonDiscrete, "Axis")]._d3Scale.range();

    var value = this["_".concat(nonDiscrete)](d, i);
    var negative = value < 0;

    var zero = this["_".concat(nonDiscrete, "Axis")]._getPosition(0);

    var space = nonDiscrete === "y" ? negative ? range[1] - zero : zero - range[0] : negative ? zero - range[0] : range[1] - zero;

    var pos = this["_".concat(nonDiscrete, "Axis")]._getPosition(value);

    var size = Math.abs(pos - zero);
    return size < space / 2;
  }
  /**
      @class Plot
      @extends Viz
      @desc Creates an x/y plot based on an array of data.
  */


  var Plot = /*#__PURE__*/function (_d3plusViz$Viz) {
    _inherits(Plot, _d3plusViz$Viz);

    var _super = _createSuper(Plot);

    /**
        @memberof Plot
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Plot() {
      var _this4;

      _classCallCheck(this, Plot);

      _this4 = _super.call(this);
      _this4._annotations = [];
      _this4._backgroundConfig = {
        duration: 0,
        fill: "transparent"
      };
      _this4._barPadding = 0;
      _this4._buffer = {
        Bar: BarBuffer,
        Box: BoxBuffer,
        Circle: CircleBuffer,
        Line: LineBuffer,
        Rect: RectBuffer
      };
      _this4._confidenceConfig = {
        fill: function fill(d, i) {
          var c = typeof _this4._shapeConfig.Line.stroke === "function" ? _this4._shapeConfig.Line.stroke(d, i) : _this4._shapeConfig.Line.stroke;
          return c;
        },
        fillOpacity: d3plusCommon.constant(0.5)
      };
      _this4._discreteCutoff = 100;
      _this4._groupPadding = 5;
      _this4._lineMarkerConfig = {
        fill: function fill(d, i) {
          return d3plusColor.colorAssign(_this4._id(d, i));
        },
        r: d3plusCommon.constant(3)
      };
      _this4._lineMarkers = false;
      _this4._previousShapes = [];
      _this4._shape = d3plusCommon.constant("Circle");
      _this4._shapeConfig = d3plusCommon.assign(_this4._shapeConfig, {
        Area: {
          label: function label(d, i) {
            return _this4._stacked ? _this4._drawLabel(d, i) : false;
          },
          labelBounds: function labelBounds(d, i, aes) {
            var r = shapes.largestRect(aes.points, {
              angle: d3Array.range(-20, 20, 5)
            });
            if (!r || r.height < 20 || r.width < 50) r = shapes.largestRect(aes.points, {
              angle: d3Array.range(-80, 80, 5)
            });
            if (!r) return null;
            var x = d3Array.min(aes.points, function (d) {
              return d[0];
            });
            var y = d3Array.max(aes.points.filter(function (d) {
              return d[0] === x;
            }), function (d) {
              return d[1];
            });
            return {
              angle: r.angle,
              width: r.width,
              height: r.height,
              x: r.cx - r.width / 2 - x,
              y: r.cy - r.height / 2 - y
            };
          },
          labelConfig: {
            fontMin: 6,
            fontResize: true,
            padding: 10
          }
        },
        ariaLabel: function ariaLabel(d, i) {
          var ariaLabelStr = "";
          if (d.nested) ariaLabelStr = "".concat(_this4._drawLabel(d.data, d.i));else {
            ariaLabelStr = "".concat(_this4._drawLabel(d, i));
            if (_this4._x(d, i) !== undefined) ariaLabelStr += ", x: ".concat(_this4._x(d, i));
            if (_this4._y(d, i) !== undefined) ariaLabelStr += ", y: ".concat(_this4._y(d, i));
            if (_this4._x2(d, i) !== undefined) ariaLabelStr += ", x2: ".concat(_this4._x2(d, i));
            if (_this4._y2(d, i) !== undefined) ariaLabelStr += ", y2: ".concat(_this4._y2(d, i));
          }
          return "".concat(ariaLabelStr, ".");
        },
        Bar: {
          labelBounds: function labelBounds(d, i, s) {
            var _ref7;

            var padding = 1;
            var width = this._discrete === "y" ? "width" : "height";
            var height = this._discrete === "y" ? "height" : "width";
            var other = this._discrete.charAt(0) === "x" ? "y" : "x";
            var invert = other === "y";

            var nonDiscrete = this._discrete.replace(this._discrete.charAt(0), other);

            var range = this["_".concat(nonDiscrete, "Axis")]._d3Scale.range();

            var space = Math.abs(range[1] - range[0]);
            var negative = this["_".concat(nonDiscrete)](d, i) < 0;

            if (outside.bind(this)(d, i)) {
              var _ref6;

              return _ref6 = {}, _defineProperty(_ref6, width, space - s[width]), _defineProperty(_ref6, height, s[height]), _defineProperty(_ref6, "x", invert ? -s.width / 2 : negative ? -space : s.width + padding), _defineProperty(_ref6, "y", invert ? negative ? s.height + padding : -space : -s.height / 2 + 1), _ref6;
            }

            return _ref7 = {}, _defineProperty(_ref7, width, s[width]), _defineProperty(_ref7, height, s[height]), _defineProperty(_ref7, "x", invert ? -s.width / 2 : negative ? this._stacked ? padding : padding - s.width : -padding), _defineProperty(_ref7, "y", invert ? negative ? this._stacked ? padding - s.height : padding : -s.height + padding : -s.height / 2 + padding), _ref7;
          },
          labelConfig: {
            fontMax: 16,
            fontMin: 6,
            fontResize: true,
            fontColor: function fontColor(d, i) {
              return outside.bind(this)(d, i) ? d3plusColor.colorDefaults.dark : d3plusColor.colorContrast(this._shapeConfig.fill(d, i));
            },
            fontStroke: function fontStroke(d, i) {
              return outside.bind(this)(d, i) ? d3plusColor.colorDefaults.light : "transparent";
            },
            fontStrokeWidth: function fontStrokeWidth(d, i) {
              return outside.bind(this)(d, i) ? 0.1 : 0;
            },
            padding: 3,
            textAnchor: function textAnchor(d, i) {
              var other = this._discrete.charAt(0) === "x" ? "y" : "x";
              var invert = other === "y";

              var nonDiscrete = this._discrete.replace(this._discrete.charAt(0), other);

              var negative = this["_".concat(nonDiscrete)](d, i) < 0;
              return invert ? "middle" : outside.bind(this)(d, i) ? negative ? "end" : "start" : negative ? "start" : "end";
            },
            verticalAlign: function verticalAlign(d, i) {
              var other = this._discrete.charAt(0) === "x" ? "y" : "x";
              var invert = other === "y";

              var nonDiscrete = this._discrete.replace(this._discrete.charAt(0), other);

              var negative = this["_".concat(nonDiscrete)](d, i) < 0;
              return invert ? outside.bind(this)(d, i) ? negative ? "top" : "bottom" : negative ? "bottom" : "top" : "middle";
            }
          }
        },
        Circle: {
          r: defaultSize.bind(_assertThisInitialized(_this4))
        },
        Line: {
          curve: function curve() {
            return _this4._discrete ? "monotone".concat(_this4._discrete.charAt(0).toUpperCase()) : "linear";
          },
          fill: d3plusCommon.constant("none"),
          labelConfig: {
            fontColor: function fontColor(d, i) {
              var c = typeof _this4._shapeConfig.Line.stroke === "function" ? _this4._shapeConfig.Line.stroke(d, i) : _this4._shapeConfig.Line.stroke;
              return d3plusColor.colorLegible(c);
            },
            fontResize: false,
            padding: 5,
            textAnchor: "start",
            verticalAlign: "middle"
          },
          stroke: function stroke(d, i) {
            return d3plusColor.colorAssign(_this4._id(d, i));
          },
          strokeWidth: d3plusCommon.constant(2)
        },
        Rect: {
          height: function height(d) {
            return defaultSize.bind(_assertThisInitialized(_this4))(d) * 2;
          },
          width: function width(d) {
            return defaultSize.bind(_assertThisInitialized(_this4))(d) * 2;
          }
        }
      });
      _this4._shapeOrder = ["Area", "Path", "Bar", "Box", "Line", "Rect", "Circle"];

      _this4._shapeSort = function (a, b) {
        return _this4._shapeOrder.indexOf(a) - _this4._shapeOrder.indexOf(b);
      };

      _this4._sizeMax = 20;
      _this4._sizeMin = 5;
      _this4._sizeScale = "sqrt";
      _this4._stackOffset = stackOffsetDiverging;
      _this4._stackOrder = stackOrderDescending;
      _this4._timelineConfig = d3plusCommon.assign(_this4._timelineConfig, {
        brushing: true
      });
      _this4._x = d3plusCommon.accessor("x");
      _this4._xAxis = new d3plusAxis.AxisBottom().align("end");
      _this4._xTest = new d3plusAxis.AxisBottom().align("end").gridSize(0);
      _this4._xConfig = {
        gridConfig: {
          stroke: function stroke(d) {
            if (_this4._discrete && _this4._discrete.charAt(0) === "x") return "transparent";

            var range = _this4._xAxis.range(); // hides left-most x gridline so it doesn't overlap with the y axis


            return range[0] === _this4._xAxis._getPosition.bind(_this4._xAxis)(d.id) ? "transparent" : "#eee";
          }
        }
      };
      _this4._xCutoff = 150;
      _this4._x2 = d3plusCommon.accessor("x2");
      _this4._x2Axis = new d3plusAxis.AxisTop().align("start");
      _this4._x2Test = new d3plusAxis.AxisTop().align("start").gridSize(0);
      _this4._x2Config = {
        padding: 0
      };
      _this4._y = d3plusCommon.accessor("y");
      _this4._yAxis = new d3plusAxis.AxisLeft().align("start");
      _this4._yTest = new d3plusAxis.AxisLeft().align("start").gridSize(0);
      _this4._yConfig = {
        gridConfig: {
          stroke: function stroke(d) {
            if (_this4._discrete && _this4._discrete.charAt(0) === "y") return "transparent";

            var range = _this4._yAxis.range(); // hides bottom-most y gridline so it doesn't overlap with the x axis


            return range[range.length - 1] === _this4._yAxis._getPosition.bind(_this4._yAxis)(d.id) ? "transparent" : "#eee";
          }
        }
      };
      _this4._yCutoff = 150;
      _this4._y2 = d3plusCommon.accessor("y2");
      _this4._y2Axis = new d3plusAxis.AxisRight().align("end");
      _this4._y2Test = new d3plusAxis.AxisLeft().align("end").gridSize(0);
      _this4._y2Config = {};
      return _this4;
    }
    /**
        Extends the preDraw behavior of the abstract Viz class.
        @private
    */


    _createClass(Plot, [{
      key: "_preDraw",
      value: function _preDraw() {
        var _this5 = this;

        // logic repeated for each axis
        ["x", "y", "x2", "y2"].forEach(function (k) {
          // if user has supplied a String key as the main method value
          if (_this5["_".concat(k, "Key")]) {
            var str = _this5["_".concat(k, "Key")]; // if axis is discrete and numerical, do not sum values


            if (!_this5._aggs[str] && _this5._discrete === k) {
              _this5._aggs[str] = function (a, c) {
                var v = Array.from(new Set(a.map(c)));
                return v.length === 1 ? v[0] : v;
              };
            } // set axis title if not discrete


            if (str !== k && _this5["_".concat(k, "Title")] === _this5["_".concat(k, "Config")].title && _this5._discrete !== k) {
              _this5["_".concat(k, "Title")] = str;
              _this5["_".concat(k, "Config")].title = str;
            }
          }
        });

        _get(_getPrototypeOf(Plot.prototype), "_preDraw", this).call(this);
      }
      /**
          Extends the draw behavior of the abstract Viz class.
          @private
      */

    }, {
      key: "_draw",
      value: function _draw(callback) {
        var _this6 = this;

        if (!this._filteredData.length) return this;

        var stackGroup = function stackGroup(d, i) {
          return _this6._stacked ? "".concat(_this6._groupBy.length > 1 ? _this6._ids(d, i).slice(0, -1).join("_") : "group") : "".concat(_this6._ids(d, i).join("_"));
        };

        var data = this._filteredData.map(function (d, i) {
          return {
            __d3plus__: true,
            data: d,
            group: stackGroup(d, i),
            i: i,
            hci: _this6._confidence && _this6._confidence[1] && _this6._confidence[1](d, i),
            id: _this6._ids(d, i).slice(0, _this6._drawDepth + 1).join("_"),
            lci: _this6._confidence && _this6._confidence[0] && _this6._confidence[0](d, i),
            shape: _this6._shape(d, i),
            x: _this6._x(d, i),
            x2: _this6._x2(d, i),
            y: _this6._y(d, i),
            y2: _this6._y2(d, i)
          };
        });

        this._formattedData = data;

        if (this._size) {
          var rExtent = d3Array.extent(data, function (d) {
            return _this6._size(d.data);
          });

          this._sizeScaleD3 = function () {
            return _this6._sizeMin;
          };

          this._sizeScaleD3 = scales__namespace["scale".concat(this._sizeScale.charAt(0).toUpperCase()).concat(this._sizeScale.slice(1))]().domain(rExtent).range([rExtent[0] === rExtent[1] ? this._sizeMax : d3Array.min([this._sizeMax / 2, this._sizeMin]), this._sizeMax]);
        } else {
          this._sizeScaleD3 = function () {
            return _this6._sizeMin;
          };
        }

        var x2Exists = data.some(function (d) {
          return d.x2 !== undefined;
        }),
            y2Exists = data.some(function (d) {
          return d.y2 !== undefined;
        });
        var height = this._height - this._margin.top - this._margin.bottom,
            opp = this._discrete ? this._discrete === "x" ? "y" : "x" : undefined,
            opp2 = this._discrete ? this._discrete === "x" ? "y2" : "x2" : undefined,
            opps = [opp, opp2].filter(function (d) {
          return d;
        }),
            parent = this._select,
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;

        var x2Time = this._time && data[0].x2 === this._time(data[0].data, data[0].i),
            xTime = this._time && data[0].x === this._time(data[0].data, data[0].i),
            y2Time = this._time && data[0].y2 === this._time(data[0].data, data[0].i),
            yTime = this._time && data[0].y === this._time(data[0].data, data[0].i);

        for (var i = 0; i < data.length; i++) {
          var d = data[i];
          if (xTime) d.x = d3plusAxis.date(d.x);
          if (x2Time) d.x2 = d3plusAxis.date(d.x2);
          if (yTime) d.y = d3plusAxis.date(d.y);
          if (y2Time) d.y2 = d3plusAxis.date(d.y2);
          d.discrete = d.shape === "Bar" ? "".concat(d[this._discrete], "_").concat(d.group) : "".concat(d[this._discrete]);
        }

        var discreteKeys, domains, stackData, stackKeys;

        if (this._stacked) {
          var _domains;

          var groupValues = d3Collection.nest().key(function (d) {
            return d.group;
          }).entries(data).reduce(function (obj, d) {
            if (!obj[d.key]) obj[d.key] = 0;
            obj[d.key] += d3Array.sum(d.values, function (dd) {
              return dd[opp];
            });
            return obj;
          }, {});
          data = data.sort(function (a, b) {
            if (_this6["_".concat(_this6._discrete, "Sort")]) return _this6["_".concat(_this6._discrete, "Sort")](a.data, b.data);
            var a1 = a[_this6._discrete],
                b1 = b[_this6._discrete];
            if (a1 - b1 !== 0) return a1 - b1;
            if (a.group !== b.group) return groupValues[b.group] - groupValues[a.group];
            return b[opp] - a[opp];
          });
          discreteKeys = Array.from(new Set(data.map(function (d) {
            return d.discrete;
          })));
          stackKeys = Array.from(new Set(data.map(function (d) {
            return d.id;
          })));
          stackData = d3Collection.nest().key(function (d) {
            return d.discrete;
          }).entries(data).map(function (d) {
            return d.values;
          });
          stackData.forEach(function (g) {
            var ids = Array.from(new Set(g.map(function (d) {
              return d.id;
            })));

            if (ids.length < stackKeys.length) {
              stackKeys.forEach(function (k) {
                if (!ids.includes(k)) {
                  var _d = data.filter(function (d) {
                    return d.id === k;
                  })[0];

                  if (_d.shape === "Area") {
                    var _fillerPoint;

                    var group = stackGroup(_d.data, _d.i);
                    var fillerPoint = (_fillerPoint = {
                      __d3plus__: true,
                      data: _d.data,
                      discrete: _d.shape === "Bar" ? "".concat(g[0][_this6._discrete], "_").concat(group) : "".concat(g[0][_this6._discrete]),
                      group: group,
                      id: k,
                      shape: _d.shape
                    }, _defineProperty(_fillerPoint, _this6._discrete, g[0][_this6._discrete]), _defineProperty(_fillerPoint, opp, 0), _fillerPoint);
                    data.push(fillerPoint);
                  }
                }
              });
            }
          });

          if (this["_".concat(this._discrete, "Sort")]) {
            data.sort(function (a, b) {
              return _this6["_".concat(_this6._discrete, "Sort")](a.data, b.data);
            });
          } else {
            data.sort(function (a, b) {
              return a[_this6._discrete] - b[_this6._discrete];
            });
          }

          var order = this._stackOrder;
          if (order instanceof Array) stackKeys.sort(function (a, b) {
            return order.indexOf(a) - order.indexOf(b);
          });else if (order === d3Shape.stackOrderNone) stackKeys.sort(function (a, b) {
            return a.localeCompare(b);
          });
          stackData = d3Shape.stack().keys(stackKeys).offset(this._stackOffset).order(order instanceof Array ? d3Shape.stackOrderNone : order).value(function (group, key) {
            var d = group.filter(function (g) {
              return g.id === key;
            });
            return d.length ? d[0][opp] : 0;
          })(stackData);
          domains = (_domains = {}, _defineProperty(_domains, this._discrete, d3Array.extent(data, function (d) {
            return d[_this6._discrete];
          })), _defineProperty(_domains, opp, [d3Array.min(stackData.map(function (g) {
            return d3Array.min(g.map(function (p) {
              return p[0];
            }));
          })), d3Array.max(stackData.map(function (g) {
            return d3Array.max(g.map(function (p) {
              return p[1];
            }));
          }))]), _domains);
        } else {
          var _discrete = this._discrete || "x";

          if (this["_".concat(this._discrete, "Sort")]) {
            data.sort(function (a, b) {
              return _this6["_".concat(_this6._discrete, "Sort")](a.data, b.data);
            });
          } else {
            data.sort(function (a, b) {
              return a[_discrete] - b[_discrete];
            });
          }

          var xData = _discrete === "x" ? data.map(function (d) {
            return d.x;
          }) : data.map(function (d) {
            return d.x;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var x2Data = _discrete === "x" ? data.map(function (d) {
            return d.x2;
          }) : data.map(function (d) {
            return d.x2;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var yData = _discrete === "y" ? data.map(function (d) {
            return d.y;
          }) : data.map(function (d) {
            return d.y;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          var y2Data = _discrete === "y" ? data.map(function (d) {
            return d.y2;
          }) : data.map(function (d) {
            return d.y2;
          }).concat(this._confidence && this._confidence[0] ? data.map(function (d) {
            return d.lci;
          }) : []).concat(this._confidence && this._confidence[1] ? data.map(function (d) {
            return d.hci;
          }) : []);
          domains = {
            x: this._xSort ? Array.from(new Set(data.filter(function (d) {
              return d.x;
            }).sort(function (a, b) {
              return _this6._xSort(a.data, b.data);
            }).map(function (d) {
              return d.x;
            }))) : d3Array.extent(xData, function (d) {
              return d;
            }),
            x2: this._x2Sort ? Array.from(new Set(data.filter(function (d) {
              return d.x2;
            }).sort(function (a, b) {
              return _this6._x2Sort(a.data, b.data);
            }).map(function (d) {
              return d.x2;
            }))) : d3Array.extent(x2Data, function (d) {
              return d;
            }),
            y: this._ySort ? Array.from(new Set(data.filter(function (d) {
              return d.y;
            }).sort(function (a, b) {
              return _this6._ySort(a.data, b.data);
            }).map(function (d) {
              return d.y;
            }))) : d3Array.extent(yData, function (d) {
              return d;
            }),
            y2: this._y2Sort ? Array.from(new Set(data.filter(function (d) {
              return d.y2;
            }).sort(function (a, b) {
              return _this6._y2Sort(a.data, b.data);
            }).map(function (d) {
              return d.y2;
            }))) : d3Array.extent(y2Data, function (d) {
              return d;
            })
          };
        }

        var xDomain = this._xDomain ? this._xDomain.slice() : domains.x,
            xScale = this._xSort ? "Point" : "Linear";
        if (xDomain[0] === void 0) xDomain[0] = domains.x[0];
        if (xDomain[1] === void 0) xDomain[1] = domains.x[1];

        if (xTime) {
          xDomain = xDomain.map(d3plusAxis.date);
          xScale = "Time";
        } else if (this._discrete === "x") {
          if (!this._xDomain) xDomain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.x));
          }).sort(function (a, b) {
            return _this6._xSort ? _this6._xSort(a.data, b.data) : a.x - b.x;
          }).map(function (d) {
            return d.x;
          })));
          xScale = "Point";
        }

        var x2Domain = this._x2Domain ? this._x2Domain.slice() : domains.x2,
            x2Scale = this._x2Sort ? "Point" : "Linear";
        if (x2Domain && x2Domain[0] === void 0) x2Domain[0] = domains.x2[0];
        if (x2Domain && x2Domain[1] === void 0) x2Domain[1] = domains.x2[1];

        if (x2Time) {
          x2Domain = x2Domain.map(d3plusAxis.date);
          x2Scale = "Time";
        } else if (this._discrete === "x") {
          if (!this._x2Domain) x2Domain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.x2));
          }).sort(function (a, b) {
            return _this6._x2Sort ? _this6._x2Sort(a.data, b.data) : a.x2 - b.x2;
          }).map(function (d) {
            return d.x2;
          })));
          x2Scale = "Point";
        }

        var yDomain = this._yDomain ? this._yDomain.slice() : domains.y,
            yScale = this._ySort ? "Point" : "Linear";
        if (yDomain[0] === void 0) yDomain[0] = domains.y[0];
        if (yDomain[1] === void 0) yDomain[1] = domains.y[1];
        var y2Domain = this._y2Domain ? this._y2Domain.slice() : domains.y2,
            y2Scale = this._y2Sort ? "Point" : "Linear";
        if (y2Domain && y2Domain[0] === void 0) y2Domain[0] = domains.y2[0];
        if (y2Domain && y2Domain[1] === void 0) y2Domain[1] = domains.y2[1];

        if (yTime) {
          yDomain = yDomain.map(d3plusAxis.date);
          yScale = "Time";
        } else if (this._discrete === "y") {
          if (!this._yDomain) yDomain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.y));
          }).sort(function (a, b) {
            return _this6._ySort ? _this6._ySort(a.data, b.data) : a.y - b.y;
          }).map(function (d) {
            return d.y;
          })));
          yScale = "Point";
          if (!this._y2Domain) y2Domain = Array.from(new Set(data.filter(function (d) {
            return ["number", "string"].includes(_typeof(d.y2));
          }).sort(function (a, b) {
            return _this6._y2Sort ? _this6._y2Sort(a.data, b.data) : a.y2 - b.y2;
          }).map(function (d) {
            return d.y2;
          })));
          y2Scale = "Point";
        }

        if (y2Time) {
          y2Domain = y2Domain.map(d3plusAxis.date);
          y2Scale = "Time";
        }

        var autoScale = function autoScale(axis, fallback) {
          var userScale = _this6["_".concat(axis, "Config")].scale;

          if (userScale === "auto") {
            if (_this6._discrete === axis) return fallback;
            var values = data.map(function (d) {
              return d[axis];
            });
            return d3Array.deviation(values) / d3Array.mean(values) > 3 ? "log" : "linear";
          }

          return userScale || fallback;
        };

        var yConfigScale = this._yConfigScale = autoScale("y", yScale).toLowerCase();
        var y2ConfigScale = this._y2ConfigScale = autoScale("y2", y2Scale).toLowerCase();
        var xConfigScale = this._xConfigScale = autoScale("x", xScale).toLowerCase();
        var x2ConfigScale = this._x2ConfigScale = autoScale("x2", x2Scale).toLowerCase();
        domains = {
          x: xDomain,
          x2: x2Domain || xDomain,
          y: yDomain,
          y2: y2Domain || yDomain
        };
        Object.keys(domains).forEach(function (axis) {
          if (_this6["_".concat(axis, "ConfigScale")] === "log" && domains[axis].includes(0)) {
            if (d3Array.min(domains[axis]) < 0) domains[axis][1] = d3Array.max(data.map(function (d) {
              return d[axis];
            }).filter(Boolean));else domains[axis][0] = d3Array.min(data.map(function (d) {
              return d[axis];
            }).filter(Boolean));
          }
        });
        opps.forEach(function (opp) {
          if (_this6["_".concat(opp, "Config")].domain) {
            var _d2 = _this6["_".concat(opp, "Config")].domain;

            if (_this6._discrete === "x") _d2.reverse();
            domains[opp] = _d2;
          } else if (opp && _this6._baseline !== void 0) {
            var b = _this6._baseline;
            if (domains[opp] && domains[opp][0] > b) domains[opp][0] = b;else if (domains[opp] && domains[opp][1] < b) domains[opp][1] = b;
          }
        });

        var _x2 = scales__namespace["scale".concat(xScale)]().domain(domains.x).range(d3Array.range(0, width + 1, width / (domains.x.length - 1))),
            x2 = scales__namespace["scale".concat(x2Scale)]().domain(domains.x2).range(d3Array.range(0, width + 1, width / (domains.x2.length - 1))),
            _y2 = scales__namespace["scale".concat(yScale)]().domain(domains.y.reverse()).range(d3Array.range(0, height + 1, height / (domains.y.length - 1))),
            y2 = scales__namespace["scale".concat(y2Scale)]().domain(domains.y2.reverse()).range(d3Array.range(0, height + 1, height / (domains.y2.length - 1)));

        var shapeData = d3Collection.nest().key(function (d) {
          return d.shape;
        }).entries(data).sort(function (a, b) {
          return _this6._shapeSort(a.key, b.key);
        });
        var oppScale = this._discrete === "x" ? yScale : xScale;

        if (oppScale !== "Point") {
          shapeData.forEach(function (d) {
            if (_this6._buffer[d.key]) {
              var res = _this6._buffer[d.key].bind(_this6)({
                data: d.values,
                x: _x2,
                y: _y2,
                yScale: yConfigScale,
                xScale: xConfigScale,
                config: _this6._shapeConfig[d.key]
              });

              _x2 = res[0];
              _y2 = res[1];

              var res2 = _this6._buffer[d.key].bind(_this6)({
                data: d.values,
                x: x2,
                y: y2,
                yScale: y2ConfigScale,
                xScale: x2ConfigScale,
                x2: true,
                y2: true,
                config: _this6._shapeConfig[d.key]
              });

              x2 = res2[0];
              y2 = res2[1];
            }
          });
        }

        xDomain = _x2.domain();
        x2Domain = x2.domain();
        yDomain = _y2.domain();
        y2Domain = y2.domain();
        var defaultConfig = {
          barConfig: {
            "stroke-width": 0
          },
          gridSize: 0,
          labels: [],
          title: false,
          tickSize: 0
        };
        var defaultX2Config = x2Exists ? {} : defaultConfig;
        var defaultY2Config = y2Exists ? {} : defaultConfig;
        var showX = this._discrete === "x" && this._width > this._discreteCutoff || this._width > this._xCutoff;
        var showY = this._discrete === "y" && this._height > this._discreteCutoff || this._height > this._yCutoff;
        var yC = {
          locale: this._locale,
          scalePadding: _y2.padding ? _y2.padding() : 0
        };

        if (!showX) {
          yC.barConfig = {
            stroke: "transparent"
          };
          yC.tickSize = 0;
          yC.shapeConfig = {
            labelBounds: function labelBounds(d, i) {
              var _d$labelBounds = d.labelBounds,
                  width = _d$labelBounds.width,
                  y = _d$labelBounds.y;
              var height = _this6._height / 2;
              var x = i ? -height : 0;
              return {
                x: x,
                y: y,
                width: width,
                height: height
              };
            },
            labelConfig: {
              padding: 0,
              rotate: 0,
              verticalAlign: function verticalAlign(d) {
                return d.id === yTicks[0] ? "top" : "bottom";
              }
            },
            labelRotation: false
          };
        }

        var testGroup = d3plusCommon.elem("g.d3plus-plot-test", {
          enter: {
            opacity: 0
          },
          parent: this._select
        });
        var x2Ticks = this._discrete === "x" && !x2Time ? domains.x2 : undefined,
            xTicks = !showY ? d3Array.extent(domains.x) : this._discrete === "x" && !xTime ? domains.x : undefined,
            y2Ticks = this._discrete === "y" && !y2Time ? domains.y2 : undefined,
            yTicks = !showX ? d3Array.extent(domains.y) : this._discrete === "y" && !yTime ? domains.y : undefined; // hides repetitive axis ticks in BarCharts

        var uniques = Array.from(new Set(this._filteredData.map(this._id))).length;
        if (x2Scale === "Point" && x2Ticks.length === uniques) x2Ticks = [];
        if (xScale === "Point" && xTicks.length === uniques) xTicks = [];
        if (y2Scale === "Point" && y2Ticks.length === uniques) y2Ticks = [];
        if (yScale === "Point" && yTicks.length === uniques) yTicks = [];

        if (showY) {
          this._yTest.domain(yDomain).height(height).maxSize(width / 2).range([undefined, undefined]).select(testGroup.node()).ticks(yTicks).width(width).config(yC).config(this._yConfig).scale(yConfigScale).render();
        }

        var yBounds = this._yTest.outerBounds();

        var yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;

        if (y2Exists) {
          this._y2Test.domain(y2Domain).height(height).range([undefined, undefined]).select(testGroup.node()).ticks(y2Ticks).width(width).config(yC).config(defaultY2Config).config(this._y2Config).scale(y2ConfigScale).render();
        }

        var y2Bounds = this._y2Test.outerBounds();

        var y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
        var xC = {
          locale: this._locale,
          scalePadding: _x2.padding ? _x2.padding() : 0
        };

        if (!showY) {
          xC.barConfig = {
            stroke: "transparent"
          };
          xC.tickSize = 0;
          xC.shapeConfig = {
            labelBounds: function labelBounds(d, i) {
              var _d$labelBounds2 = d.labelBounds,
                  height = _d$labelBounds2.height,
                  y = _d$labelBounds2.y;
              var width = _this6._width / 2;
              var x = i ? -width : 0;
              return {
                x: x,
                y: y,
                width: width,
                height: height
              };
            },
            labelConfig: {
              padding: 0,
              rotate: 0,
              textAnchor: function textAnchor(d) {
                return d.id === xTicks[0] ? "start" : "end";
              }
            },
            labelRotation: false
          };
        }

        var xRangeMax = undefined;

        if (showX) {
          this._xTest.domain(xDomain).height(height).maxSize(height / 2).range([undefined, xRangeMax]).select(testGroup.node()).ticks(xTicks).width(width).config(xC).config(this._xConfig).scale(xConfigScale).render();
        }

        var largestLabel;

        if (this._lineLabels) {
          var lineData = d3Collection.nest().key(function (d) {
            return d.id;
          }).entries(data.filter(function (d) {
            return d.shape === "Line";
          }));

          if (lineData.length && lineData.length < this._dataCutoff) {
            var userConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Line");
            testLineShape.config(userConfig);
            var lineLabelConfig = testLineShape.labelConfig();
            var fontSizeAccessor = lineLabelConfig.fontSize !== undefined ? lineLabelConfig.fontSize : testTextBox.fontSize();
            var fontWeightAccessor = lineLabelConfig.fontWeight !== undefined ? lineLabelConfig.fontWeight : testTextBox.fontWeight();
            var fontFamilyAccessor = lineLabelConfig.fontFamily !== undefined ? lineLabelConfig.fontFamily : testTextBox.fontFamily();
            var paddingAccessor = lineLabelConfig.padding !== undefined ? lineLabelConfig.padding : testTextBox.padding();
            var labelFunction = userConfig.label || this._drawLabel;

            var xEstimate = function xEstimate(d) {
              if (xConfigScale === "log" && d === 0) d = xDomain[0] < 0 ? _this6._xTest._d3Scale.domain()[1] : _this6._xTest._d3Scale.domain()[0];
              return _this6._xTest._getPosition.bind(_this6._xTest)(d);
            };

            var maxX = d3Array.max(lineData.map(function (group) {
              return d3Array.max(group.values.map(function (d) {
                return xEstimate(d.x);
              }));
            }));
            var labelWidths = lineData.map(function (group) {
              var d = group.values[group.values.length - 1];
              var i;

              while (d.__d3plus__ && d.data) {
                d = d.data;
                i = d.i;
              }

              var label = typeof labelFunction === "function" ? labelFunction(d, i) : labelFunction;
              var fontSize = typeof fontSizeAccessor === "function" ? fontSizeAccessor(d, i) : fontSizeAccessor;
              var fontWeight = typeof fontWeightAccessor === "function" ? fontWeightAccessor(d, i) : fontWeightAccessor;
              var fontFamily = typeof fontFamilyAccessor === "function" ? fontFamilyAccessor(d, i) : fontFamilyAccessor;
              if (fontFamily instanceof Array) fontFamily = fontFamily.map(function (f) {
                return "'".concat(f, "'");
              }).join(", ");
              var labelPadding = typeof paddingAccessor === "function" ? paddingAccessor(d, i) : paddingAccessor;
              var labelWidth = d3plusText.textWidth(label, {
                "font-size": fontSize,
                "font-family": fontFamily,
                "font-weight": fontWeight
              });
              var myMaxX = d3Array.max(group.values.map(function (d) {
                return xEstimate(d.x);
              }));
              return {
                labelWidth: labelWidth + labelPadding * 2,
                spaceNeeded: myMaxX - maxX + labelWidth + labelPadding * 2
              };
            });
            largestLabel = d3Array.max(labelWidths.map(function (d) {
              return d.labelWidth;
            }));
            var spaceNeeded = d3Array.max(labelWidths.map(function (d) {
              return d.spaceNeeded;
            }));
            var labelSpace = d3Array.min([spaceNeeded, width / 4]);
            xRangeMax = width - labelSpace - this._margin.right;
          }
        }

        if (showX && xRangeMax) {
          this._xTest.domain(xDomain).height(height).maxSize(height / 2).range([undefined, xRangeMax]).select(testGroup.node()).ticks(xTicks).width(width).config(xC).config(this._xConfig).scale(xConfigScale).render();
        }

        if (x2Exists) {
          this._x2Test.domain(x2Domain).height(height).range([undefined, xRangeMax]).select(testGroup.node()).ticks(x2Ticks).width(width).config(xC).tickSize(0).config(defaultX2Config).config(this._x2Config).scale(x2ConfigScale).render();
        }

        var xTestRange = this._xTest._getRange();

        var x2TestRange = this._x2Test._getRange();

        var x2Bounds = this._x2Test.outerBounds();

        var x2Height = x2Exists ? x2Bounds.height + this._x2Test.padding() : 0;
        var xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

        if (showX) {
          this._xTest.range([xOffsetLeft, undefined]).render();
        }

        var topOffset = showY ? this._yTest.shapeConfig().labelConfig.fontSize() / 2 : 0;
        var xOffsetRight = d3Array.max([y2Width, width - xTestRange[1], width - x2TestRange[1]]);

        var xBounds = this._xTest.outerBounds();

        var xHeight = xBounds.height + (showY ? this._xTest.padding() : 0);
        this._padding.left += xOffsetLeft;
        this._padding.right += xOffsetRight;
        this._padding.bottom += xHeight;
        this._padding.top += x2Height + topOffset;

        _get(_getPrototypeOf(Plot.prototype), "_draw", this).call(this, callback);

        var horizontalMargin = this._margin.left + this._margin.right;
        var verticalMargin = this._margin.top + this._margin.bottom;
        var yRange = [x2Height, height - (xHeight + topOffset + verticalMargin)];

        if (showY) {
          this._yTest.domain(yDomain).height(height).maxSize(width / 2).range(yRange).select(testGroup.node()).ticks(yTicks).width(width).config(yC).config(this._yConfig).scale(yConfigScale).render();
        }

        yBounds = this._yTest.outerBounds();
        yWidth = yBounds.width ? yBounds.width + this._yTest.padding() : undefined;
        xOffsetLeft = d3Array.max([yWidth, xTestRange[0], x2TestRange[0]]);

        if (y2Exists) {
          this._y2Test.config(yC).domain(y2Domain).gridSize(0).height(height).range(yRange).select(testGroup.node()).width(width - d3Array.max([0, xOffsetRight - y2Width])).title(false).config(this._y2Config).config(defaultY2Config).scale(y2ConfigScale).render();
        }

        y2Bounds = this._y2Test.outerBounds();
        y2Width = y2Bounds.width ? y2Bounds.width + this._y2Test.padding() : undefined;
        xOffsetRight = d3Array.max([0, y2Width, width - xTestRange[1], width - x2TestRange[1]]);
        var xRange = [xOffsetLeft, width - (xOffsetRight + horizontalMargin)];
        var rectGroup = d3plusCommon.elem("g.d3plus-plot-background", {
          parent: parent,
          transition: transition
        });
        var transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top + x2Height + topOffset, ")");
        var x2Transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top + topOffset, ")");
        var xGroup = showX && d3plusCommon.elem("g.d3plus-plot-x-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        });
        var x2Group = x2Exists && d3plusCommon.elem("g.d3plus-plot-x2-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: x2Transform
          },
          update: {
            transform: x2Transform
          }
        });
        var xTrans = xOffsetLeft > yWidth ? xOffsetLeft - yWidth : 0;
        var yTransform = "translate(".concat(this._margin.left + xTrans, ", ").concat(this._margin.top + topOffset, ")");
        var yGroup = showY && d3plusCommon.elem("g.d3plus-plot-y-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: yTransform
          },
          update: {
            transform: yTransform
          }
        });
        var y2Transform = "translate(-".concat(this._margin.right, ", ").concat(this._margin.top + topOffset, ")");
        var y2Group = y2Exists && d3plusCommon.elem("g.d3plus-plot-y2-axis", {
          parent: parent,
          transition: transition,
          enter: {
            transform: y2Transform
          },
          update: {
            transform: y2Transform
          }
        });

        this._xAxis.domain(xDomain).height(height - (x2Height + topOffset + verticalMargin)).maxSize(height / 2).range(xRange).select(showX ? xGroup.node() : undefined).ticks(xTicks).width(width).config(xC).config(this._xConfig).scale(xConfigScale).render();

        if (x2Exists) {
          this._x2Axis.domain(x2Domain).height(height - (xHeight + topOffset + verticalMargin)).range(xRange).select(x2Group.node()).ticks(x2Ticks).width(width).config(xC).config(defaultX2Config).config(this._x2Config).scale(x2ConfigScale).render();
        }

        this._xFunc = _x2 = function x(d, _x) {
          if (_x === "x2") {
            if (x2ConfigScale === "log" && d === 0) d = x2Domain[0] < 0 ? _this6._x2Axis._d3Scale.domain()[1] : _this6._x2Axis._d3Scale.domain()[0];
            return _this6._x2Axis._getPosition.bind(_this6._x2Axis)(d);
          } else {
            if (xConfigScale === "log" && d === 0) d = xDomain[0] < 0 ? _this6._xAxis._d3Scale.domain()[1] : _this6._xAxis._d3Scale.domain()[0];
            return _this6._xAxis._getPosition.bind(_this6._xAxis)(d);
          }
        };

        yRange = [this._xAxis.outerBounds().y + x2Height, height - (xHeight + topOffset + verticalMargin)];

        this._yAxis.domain(yDomain).height(height).maxSize(width / 2).range(yRange).select(showY ? yGroup.node() : undefined).ticks(yTicks).width(xRange[xRange.length - 1]).config(yC).config(this._yConfig).scale(yConfigScale).render();

        if (y2Exists) {
          this._y2Axis.config(yC).domain(y2Exists ? y2Domain : yDomain).gridSize(0).height(height).range(yRange).select(y2Group.node()).width(width - d3Array.max([0, xOffsetRight - y2Width])).title(false).config(this._y2Config).config(defaultY2Config).scale(y2ConfigScale).render();
        }

        this._yFunc = _y2 = function y(d, _y) {
          if (_y === "y2") {
            if (y2ConfigScale === "log" && d === 0) d = y2Domain[1] < 0 ? _this6._y2Axis._d3ScaleNegative.domain()[0] : _this6._y2Axis._d3Scale.domain()[1];
            return _this6._y2Axis._getPosition.bind(_this6._y2Axis)(d) - x2Height;
          } else {
            if (yConfigScale === "log" && d === 0) d = yDomain[1] < 0 ? _this6._yAxis._d3ScaleNegative.domain()[0] : _this6._yAxis._d3Scale.domain()[1];
            return _this6._yAxis._getPosition.bind(_this6._yAxis)(d) - x2Height;
          }
        };

        new shapes.Rect().data([{}]).select(rectGroup.node()).x(xRange[0] + (xRange[1] - xRange[0]) / 2).width(xRange[1] - xRange[0]).y(this._margin.top + topOffset + yRange[0] + (yRange[1] - yRange[0]) / 2).height(yRange[1] - yRange[0]).config(this._backgroundConfig).render();
        var annotationGroup = d3plusCommon.elem("g.d3plus-plot-annotations", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node();

        this._annotations.forEach(function (annotation) {
          new shapes__namespace[annotation.shape]().config(annotation).config({
            x: function x(d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            },
            x0: _this6._discrete === "x" ? function (d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            } : _x2(domains.x[0]),
            x1: _this6._discrete === "x" ? null : function (d) {
              return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
            },
            y: function y(d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
            },
            y0: _this6._discrete === "y" ? function (d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
            } : _y2(domains.y[1]) - yOffset,
            y1: _this6._discrete === "y" ? null : function (d) {
              return d.y2 ? _y2(d.y2, "y2") : _y2(d.y) - yOffset;
            }
          }).select(annotationGroup).render();
        });

        var yOffset = this._xAxis.barConfig()["stroke-width"];

        if (yOffset) yOffset /= 2;
        var discrete = this._discrete || "x";
        var shapeConfig = {
          discrete: this._discrete,
          duration: this._duration,
          label: function label(d) {
            return _this6._drawLabel(d.data, d.i);
          },
          select: d3plusCommon.elem("g.d3plus-plot-shapes", {
            parent: parent,
            transition: transition,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          }).node(),
          x: function x(d) {
            return d.x2 !== undefined ? _x2(d.x2, "x2") : _x2(d.x);
          },
          x0: discrete === "x" ? function (d) {
            return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
          } : _x2(typeof this._baseline === "number" ? this._baseline : domains.x[0]),
          x1: discrete === "x" ? null : function (d) {
            return d.x2 ? _x2(d.x2, "x2") : _x2(d.x);
          },
          y: function y(d) {
            return d.y2 !== undefined ? _y2(d.y2, "y2") : _y2(d.y);
          },
          y0: discrete === "y" ? function (d) {
            return d.y2 ? _y2(d.y2, "y2") : _y2(d.y);
          } : _y2(typeof this._baseline === "number" ? this._baseline : domains.y[1]) - yOffset,
          y1: discrete === "y" ? null : function (d) {
            return d.y2 ? _y2(d.y2, "y2") : _y2(d.y) - yOffset;
          }
        };

        if (this._stacked) {
          var scale = opp === "x" ? _x2 : _y2;

          shapeConfig["".concat(opp)] = shapeConfig["".concat(opp, "0")] = function (d) {
            var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
            return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][0]) : scale(domains[opp][opp === "x" ? 0 : 1]);
          };

          shapeConfig["".concat(opp, "1")] = function (d) {
            var dataIndex = stackKeys.indexOf(d.id),
                discreteIndex = discreteKeys.indexOf(d.discrete);
            return dataIndex >= 0 ? scale(stackData[dataIndex][discreteIndex][1]) : scale(domains[opp][opp === "x" ? 0 : 1]);
          };
        }

        var events = Object.keys(this._on);
        shapeData.forEach(function (d) {
          var s = new shapes__namespace[d.key]().config(shapeConfig).data(d.values);

          if (d.key === "Bar") {
            var space;

            var _scale = _this6._discrete === "x" ? _x2 : _y2;

            var scaleType = _this6._discrete === "x" ? xScale : yScale;
            var vals = _this6._discrete === "x" ? xDomain : yDomain;
            var range = _this6._discrete === "x" ? xRange : yRange;

            if (scaleType !== "Point" && vals.length === 2) {
              space = (_scale(d.values[_this6._discrete === "x" ? 0 : d.values.length - 1][_this6._discrete]) - _scale(vals[0])) * 2;
            } else if (vals.length > 1) space = _scale(vals[1]) - _scale(vals[0]);else space = range[range.length - 1] - range[0];

            if (_this6._groupPadding < space) space -= _this6._groupPadding;
            var barSize = space || 1;
            var groups = d3Collection.nest().key(function (d) {
              return d[_this6._discrete];
            }).key(function (d) {
              return d.group;
            }).entries(d.values);
            var ids = d3Array.merge(groups.map(function (d) {
              return d.values.map(function (v) {
                return v.key;
              });
            }));
            var uniqueIds = Array.from(new Set(ids));

            if (d3Array.max(groups.map(function (d) {
              return d.values.length;
            })) === 1) {
              s[_this6._discrete](function (d, i) {
                return shapeConfig[_this6._discrete](d, i);
              });
            } else {
              barSize = (barSize - _this6._barPadding * uniqueIds.length - 1) / uniqueIds.length;
              var offset = space / 2 - barSize / 2;
              var xMod = scales.scaleLinear().domain([0, uniqueIds.length - 1]).range([-offset, offset]);

              s[_this6._discrete](function (d, i) {
                return shapeConfig[_this6._discrete](d, i) + xMod(uniqueIds.indexOf(d.group));
              });
            }

            s.width(barSize);
            s.height(barSize);
          } else if (d.key === "Line") {
            s.duration(width * 1.5);

            if (_this6._confidence) {
              var areaConfig = Object.assign({}, shapeConfig);

              var _discrete2 = _this6._discrete || "x";

              var key = _discrete2 === "x" ? "y" : "x";
              var scaleFunction = _discrete2 === "x" ? _y2 : _x2;

              areaConfig["".concat(key, "0")] = function (d) {
                return scaleFunction(_this6._confidence[0] ? d.lci : d[key]);
              };

              areaConfig["".concat(key, "1")] = function (d) {
                return scaleFunction(_this6._confidence[1] ? d.hci : d[key]);
              };

              var area = new shapes.Area().config(areaConfig).data(d.values);
              var confidenceConfig = Object.assign(_this6._shapeConfig, _this6._confidenceConfig);
              area.config(d3plusCommon.assign(d3plusCommon.configPrep.bind(_this6)(confidenceConfig, "shape", "Line"), d3plusCommon.configPrep.bind(_this6)(confidenceConfig, "shape", "Area"))).render();

              _this6._shapes.push(area);
            }

            s.config({
              discrete: shapeConfig.discrete || "x",
              label: _this6._lineLabels ? _this6._drawLabel : false,
              labelBounds: _this6._lineLabels ? function (d, i, s) {
                var _s$points$ = _slicedToArray(s.points[0], 2),
                    firstX = _s$points$[0],
                    firstY = _s$points$[1];

                var _s$points = _slicedToArray(s.points[s.points.length - 1], 2),
                    lastX = _s$points[0],
                    lastY = _s$points[1];

                var height = _this6._height / 4;
                return {
                  x: lastX - firstX,
                  y: lastY - firstY - height / 2,
                  width: largestLabel,
                  height: height
                };
              } : false
            });
          }

          var classEvents = events.filter(function (e) {
            return e.includes(".".concat(d.key));
          }),
              globalEvents = events.filter(function (e) {
            return !e.includes(".");
          }),
              shapeEvents = events.filter(function (e) {
            return e.includes(".shape");
          });

          var _loop = function _loop(e) {
            s.on(globalEvents[e], function (d, i, x, event) {
              return _this6._on[globalEvents[e]](d.data, d.i, x, event);
            });
          };

          for (var e = 0; e < globalEvents.length; e++) {
            _loop(e);
          }

          var _loop2 = function _loop2(_e2) {
            s.on(shapeEvents[_e2], function (d, i, x, event) {
              return _this6._on[shapeEvents[_e2]](d.data, d.i, x, event);
            });
          };

          for (var _e2 = 0; _e2 < shapeEvents.length; _e2++) {
            _loop2(_e2);
          }

          var _loop3 = function _loop3(_e3) {
            s.on(classEvents[_e3], function (d, i, x, event) {
              return _this6._on[classEvents[_e3]](d.data, d.i, x, event);
            });
          };

          for (var _e3 = 0; _e3 < classEvents.length; _e3++) {
            _loop3(_e3);
          }

          var userConfig = d3plusCommon.configPrep.bind(_this6)(_this6._shapeConfig, "shape", d.key);
          if (_this6._shapeConfig.duration === undefined) delete userConfig.duration;
          s.config(userConfig).render();

          _this6._shapes.push(s);

          if (d.key === "Line" && _this6._lineMarkers) {
            var markers = new shapes.Circle().data(d.values).config(shapeConfig).config(_this6._lineMarkerConfig).id(function (d) {
              return "".concat(d.id, "_").concat(d.discrete);
            });

            var _loop4 = function _loop4(_e4) {
              markers.on(globalEvents[_e4], function (d, i, x, event) {
                return _this6._on[globalEvents[_e4]](d.data, d.i, x, event);
              });
            };

            for (var _e4 = 0; _e4 < globalEvents.length; _e4++) {
              _loop4(_e4);
            }

            var _loop5 = function _loop5(_e5) {
              markers.on(shapeEvents[_e5], function (d, i, x, event) {
                return _this6._on[shapeEvents[_e5]](d.data, d.i, x, event);
              });
            };

            for (var _e5 = 0; _e5 < shapeEvents.length; _e5++) {
              _loop5(_e5);
            }

            var _loop6 = function _loop6(_e6) {
              markers.on(classEvents[_e6], function (d, i, x, event) {
                return _this6._on[classEvents[_e6]](d.data, d.i, x, event);
              });
            };

            for (var _e6 = 0; _e6 < classEvents.length; _e6++) {
              _loop6(_e6);
            }

            markers.render();

            _this6._shapes.push(markers);
          }
        });
        var dataShapes = shapeData.map(function (d) {
          return d.key;
        });

        if (dataShapes.includes("Line")) {
          if (this._confidence) dataShapes.push("Area");
          if (this._labelMarkers) dataShapes.push("Circle");
        }

        var exitShapes = this._previousShapes.filter(function (d) {
          return !dataShapes.includes(d);
        });

        exitShapes.forEach(function (shape) {
          new shapes__namespace[shape]().config(shapeConfig).data([]).render();
        });
        this._previousShapes = dataShapes;
        return this;
      }
      /**
          @memberof Plot
          @desc Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.
          @param {Array|Object} *annotations* = []
          @chainable
      */

    }, {
      key: "annotations",
      value: function annotations(_) {
        return arguments.length ? (this._annotations = _ instanceof Array ? _ : [_], this) : this._annotations;
      }
      /**
           @memberof Plot
           @desc A d3plus-shape configuration Object used for styling the background rectangle of the inner x/y plot (behind all of the shapes and gridlines).
           @param {Object} [*value*]
           @chainable
       */

    }, {
      key: "backgroundConfig",
      value: function backgroundConfig(_) {
        return arguments.length ? (this._backgroundConfig = d3plusCommon.assign(this._backgroundConfig, _), this) : this._backgroundConfig;
      }
      /**
          @memberof Plot
          @desc Sets the pixel space between each bar in a group of bars.
          @param {Number} *value* = 0
          @chainable
      */

    }, {
      key: "barPadding",
      value: function barPadding(_) {
        return arguments.length ? (this._barPadding = _, this) : this._barPadding;
      }
      /**
          @memberof Plot
          @desc Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "baseline",
      value: function baseline(_) {
        return arguments.length ? (this._baseline = _, this) : this._baseline;
      }
      /**
           @memberof Plot
           @desc Sets the confidence to the specified array of lower and upper bounds.
           @param {String[]|Function[]} *value*
           @chainable
           @example <caption>Can be called with accessor functions or static keys:</caption>
           var data = {id: "alpha", value: 10, lci: 9, hci: 11};
           ...
           // Accessor functions
           .confidence([function(d) { return d.lci }, function(d) { return d.hci }])
            // Or static keys
           .confidence(["lci", "hci"])
       */

    }, {
      key: "confidence",
      value: function confidence(_) {
        if (arguments.length && _ instanceof Array) {
          this._confidence = [];
          var lower = _[0];
          this._confidence[0] = typeof lower === "function" || !lower ? lower : d3plusCommon.accessor(lower);
          var upper = _[1];
          this._confidence[1] = typeof upper === "function" || !upper ? upper : d3plusCommon.accessor(upper);
          return this;
        } else return this._confidence;
      }
      /**
           @memberof Plot
           @desc If *value* is specified, sets the config method for each shape rendered as a confidence interval and returns the current class instance.
           @param {Object} [*value*]
           @chainable
       */

    }, {
      key: "confidenceConfig",
      value: function confidenceConfig(_) {
        return arguments.length ? (this._confidenceConfig = d3plusCommon.assign(this._confidenceConfig, _), this) : this._confidenceConfig;
      }
      /**
          @memberof Plot
          @desc Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.
          @param {String} *value*
          @chainable
      */

    }, {
      key: "discrete",
      value: function discrete(_) {
        return arguments.length ? (this._discrete = _, this) : this._discrete;
      }
      /**
          @memberof Plot
          @desc When the width or height of the chart is less than or equal to this pixel value, the discrete axis will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "discreteCutoff",
      value: function discreteCutoff(_) {
        return arguments.length ? (this._discreteCutoff = _, this) : this._discreteCutoff;
      }
      /**
          @memberof Plot
          @desc Sets the pixel space between groups of bars.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "groupPadding",
      value: function groupPadding(_) {
        return arguments.length ? (this._groupPadding = _, this) : this._groupPadding;
      }
      /**
          @memberof Plot
          @desc Draws labels on the right side of any Line shapes that are drawn on the plot.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "lineLabels",
      value: function lineLabels(_) {
        return arguments.length ? (this._lineLabels = _, this) : this._lineLabels;
      }
      /**
          @memberof Plot
          @desc Shape config for the Circle shapes drawn by the lineMarkers method.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "lineMarkerConfig",
      value: function lineMarkerConfig(_) {
        return arguments.length ? (this._lineMarkerConfig = d3plusCommon.assign(this._lineMarkerConfig, _), this) : this._lineMarkerConfig;
      }
      /**
          @memberof Plot
          @desc Draws circle markers on each vertex of a Line.
          @param {Boolean} [*value* = false]
          @chainable
      */

    }, {
      key: "lineMarkers",
      value: function lineMarkers(_) {
        return arguments.length ? (this._lineMarkers = _, this) : this._lineMarkers;
      }
      /**
          @memberof Plot
          @desc A JavaScript [sort comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that receives each shape Class (ie. "Circle", "Line", etc) as it's comparator arguments. Shapes are drawn in groups based on their type, so you are defining the layering order for all shapes of said type.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "shapeSort",
      value: function shapeSort(_) {
        return arguments.length ? (this._shapeSort = _, this) : this._shapeSort;
      }
      /**
          @memberof Plot
          @desc Sets the size of bubbles to the given Number, data key, or function.
          @param {Function|Number|String} *value* = 10
          @chainable
      */

    }, {
      key: "size",
      value: function size(_) {
        return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
      }
      /**
          @memberof Plot
          @desc Sets the size scale maximum to the specified number.
          @param {Number} *value* = 20
          @chainable
      */

    }, {
      key: "sizeMax",
      value: function sizeMax(_) {
        return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
      }
      /**
          @memberof Plot
          @desc Sets the size scale minimum to the specified number.
          @param {Number} *value* = 5
          @chainable
      */

    }, {
      key: "sizeMin",
      value: function sizeMin(_) {
        return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
      }
      /**
          @memberof Plot
          @desc Sets the size scale to the specified string.
          @param {String} *value* = "sqrt"
          @chainable
      */

    }, {
      key: "sizeScale",
      value: function sizeScale(_) {
        return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
      }
      /**
          @memberof Plot
          @desc If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.
          @param {Boolean} *value* = false
          @chainable
      */

    }, {
      key: "stacked",
      value: function stacked(_) {
        return arguments.length ? (this._stacked = _, this) : this._stacked;
      }
      /**
          @memberof Plot
          @desc Sets the stack offset. If *value* is not specified, returns the current stack offset function.
          @param {Function|String} *value* = "descending"
          @chainable
      */

    }, {
      key: "stackOffset",
      value: function stackOffset(_) {
        return arguments.length ? (this._stackOffset = typeof _ === "function" ? _ : d3Shape__namespace["stackOffset".concat(_.charAt(0).toUpperCase() + _.slice(1))], this) : this._stackOffset;
      }
      /**
          @memberof Plot
          @desc Sets the stack order. If *value* is not specified, returns the current stack order function.
          @param {Function|String|Array} *value* = "none"
          @chainable
      */

    }, {
      key: "stackOrder",
      value: function stackOrder(_) {
        if (arguments.length) {
          if (typeof _ === "string") this._stackOrder = _ === "ascending" ? stackOrderAscending : _ === "descending" ? stackOrderDescending : d3Shape__namespace["stackOrder".concat(_.charAt(0).toUpperCase() + _.slice(1))];else this._stackOrder = _;
          return this;
        } else return this._stackOrder;
      }
      /**
          @memberof Plot
          @desc Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.
          @param {Function|Number} *value*
          @chainable
      */

    }, {
      key: "x",
      value: function x(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._x = _;else {
            this._x = d3plusCommon.accessor(_);
            this._xKey = _;
          }
          return this;
        } else return this._x;
      }
      /**
           @memberof Plot
           @desc Sets the x2 accessor to the specified function or number. If *value* is not specified, returns the current x2 accessor.
           @param {Function|Number} *value*
           @chainable
       */

    }, {
      key: "x2",
      value: function x2(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._x2 = _;else {
            this._x2 = d3plusCommon.accessor(_);
            this._x2Key = _;
          }
          return this;
        } else return this._x2;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "xConfig",
      value: function xConfig(_) {
        return arguments.length ? (this._xConfig = d3plusCommon.assign(this._xConfig, _), this) : this._xConfig;
      }
      /**
          @memberof Plot
          @desc When the width of the chart is less than or equal to this pixel value, and the x-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "xCutoff",
      value: function xCutoff(_) {
        return arguments.length ? (this._xCutoff = _, this) : this._xCutoff;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary x-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "x2Config",
      value: function x2Config(_) {
        return arguments.length ? (this._x2Config = d3plusCommon.assign(this._x2Config, _), this) : this._x2Config;
      }
      /**
          @memberof Plot
          @desc Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
          @param {Array} *value*
          @chainable
      */

    }, {
      key: "xDomain",
      value: function xDomain(_) {
        return arguments.length ? (this._xDomain = _, this) : this._xDomain;
      }
      /**
           @memberof Plot
           @desc Sets the x2 domain to the specified array. If *value* is not specified, returns the current x2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
           @param {Array} *value*
           @chainable
       */

    }, {
      key: "x2Domain",
      value: function x2Domain(_) {
        return arguments.length ? (this._x2Domain = _, this) : this._x2Domain;
      }
      /**
          @memberof Plot
          @desc Defines a custom sorting comparitor function to be used for discrete x axes.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "xSort",
      value: function xSort(_) {
        return arguments.length ? (this._xSort = _, this) : this._xSort;
      }
      /**
           @memberof Plot
           @desc Defines a custom sorting comparitor function to be used for discrete x2 axes.
           @param {Function} *value*
           @chainable
       */

    }, {
      key: "x2Sort",
      value: function x2Sort(_) {
        return arguments.length ? (this._x2Sort = _, this) : this._x2Sort;
      }
      /**
          @memberof Plot
          @desc Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.
          @param {Function|Number} *value*
          @chainable
      */

    }, {
      key: "y",
      value: function y(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._y = _;else {
            this._y = d3plusCommon.accessor(_);
            this._yKey = _;
          }
          return this;
        } else return this._y;
      }
      /**
           @memberof Plot
           @desc Sets the y2 accessor to the specified function or number. If *value* is not specified, returns the current y2 accessor.
           @param {Function|Number} *value*
           @chainable
       */

    }, {
      key: "y2",
      value: function y2(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._y2 = _;else {
            this._y2 = d3plusCommon.accessor(_);
            this._y2Key = _;
          }
          return this;
        } else return this._y2;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
      *Note:* If a "domain" array is passed to the y-axis config, it will be reversed.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "yConfig",
      value: function yConfig(_) {
        if (arguments.length) {
          if (_.domain) _.domain = _.domain.slice().reverse();
          this._yConfig = d3plusCommon.assign(this._yConfig, _);
          return this;
        }

        return this._yConfig;
      }
      /**
          @memberof Plot
          @desc When the height of the chart is less than or equal to this pixel value, and the y-axis is not the discrete axis, it will not be shown. This helps produce slick sparklines. Set this value to `0` to disable the behavior entirely.
          @param {Number} *value*
          @chainable
      */

    }, {
      key: "yCutoff",
      value: function yCutoff(_) {
        return arguments.length ? (this._yCutoff = _, this) : this._yCutoff;
      }
      /**
          @memberof Plot
          @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the secondary y-axis. Includes additional functionality where passing "auto" as the value for the [scale](http://d3plus.org/docs/#Axis.scale) method will determine if the scale should be "linear" or "log" based on the provided data.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "y2Config",
      value: function y2Config(_) {
        if (arguments.length) {
          if (_.domain) _.domain = _.domain.slice().reverse();
          this._y2Config = d3plusCommon.assign(this._y2Config, _);
          return this;
        }

        return this._y2Config;
      }
      /**
          @memberof Plot
          @desc Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
          @param {Array} *value*
          @chainable
      */

    }, {
      key: "yDomain",
      value: function yDomain(_) {
        return arguments.length ? (this._yDomain = _, this) : this._yDomain;
      }
      /**
           @memberof Plot
           @desc Sets the y2 domain to the specified array. If *value* is not specified, returns the current y2 domain. Additionally, if either value of the array is undefined, it will be calculated from the data.
           @param {Array} *value*
           @chainable
       */

    }, {
      key: "y2Domain",
      value: function y2Domain(_) {
        return arguments.length ? (this._y2Domain = _, this) : this._y2Domain;
      }
      /**
          @memberof Plot
          @desc Defines a custom sorting comparitor function to be used for discrete y axes.
          @param {Function} *value*
          @chainable
      */

    }, {
      key: "ySort",
      value: function ySort(_) {
        return arguments.length ? (this._ySort = _, this) : this._ySort;
      }
      /**
           @memberof Plot
           @desc Defines a custom sorting comparitor function to be used for discrete y2 axes.
           @param {Function} *value*
           @chainable
       */

    }, {
      key: "y2Sort",
      value: function y2Sort(_) {
        return arguments.length ? (this._y2Sort = _, this) : this._y2Sort;
      }
    }]);

    return Plot;
  }(d3plusViz.Viz);
  /**
      @class AreaPlot
      @extends Plot
      @desc Creates an area plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .baseline(0)
    .discrete("x")
    .shape("Area")
  */


  var AreaPlot = /*#__PURE__*/function (_Plot) {
    _inherits(AreaPlot, _Plot);

    var _super2 = _createSuper(AreaPlot);

    /**
        @memberof AreaPlot
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function AreaPlot() {
      var _this7;

      _classCallCheck(this, AreaPlot);

      _this7 = _super2.call(this);
      _this7._baseline = 0;
      _this7._discrete = "x";
      _this7._shape = d3plusCommon.constant("Area");

      _this7.x("x");

      return _this7;
    }

    return AreaPlot;
  }(Plot);
  /**
      @class BarChart
      @extends Plot
      @desc Creates a bar chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .baseline(0)
    .discrete("x")
    .shape("Bar")
  */


  var BarChart = /*#__PURE__*/function (_Plot2) {
    _inherits(BarChart, _Plot2);

    var _super3 = _createSuper(BarChart);

    /**
        @memberof BarChart
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BarChart() {
      var _this8;

      _classCallCheck(this, BarChart);

      _this8 = _super3.call(this);
      _this8._baseline = 0;
      _this8._discrete = "x";
      var defaultLegend = _this8._legend;

      _this8._legend = function (config, arr) {
        if (arr.length === _this8._filteredData.length) return false;
        return defaultLegend.bind(_assertThisInitialized(_this8))(config, arr);
      };

      _this8._shape = d3plusCommon.constant("Bar");

      _this8.x("x");

      return _this8;
    }

    return BarChart;
  }(Plot);
  /**
      @class BoxWhisker
      @extends Plot
      @desc Creates a simple box and whisker based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Box")
  */


  var BoxWhisker = /*#__PURE__*/function (_Plot3) {
    _inherits(BoxWhisker, _Plot3);

    var _super4 = _createSuper(BoxWhisker);

    /**
        @memberof BoxWhisker
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BoxWhisker() {
      var _this9;

      _classCallCheck(this, BoxWhisker);

      _this9 = _super4.call(this);
      _this9._discrete = "x";
      _this9._shape = d3plusCommon.constant("Box");

      _this9.x("x");

      _this9._tooltipConfig = d3plusCommon.assign(_this9._tooltipConfig, {
        title: function title(d, i) {
          if (!d) return "";

          while (d.__d3plus__ && d.data) {
            d = d.data;
            i = d.i;
          }

          if (_this9._label) return _this9._label(d, i);

          var l = _this9._ids(d, i).slice(0, _this9._drawDepth);

          return l[l.length - 1];
        }
      });
      return _this9;
    }

    return BoxWhisker;
  }(Plot);
  /**
      @class BumpChart
      @extends Plot
      @desc Creates a bump chart based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Line")
    .x("x")
    .y2(d => this._y(d))
    .yConfig({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const startData = data.filter(d => d.x === xDomain[0]);
        const d = startData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .y2Config({
      tickFormat: val => {
        const data = this._formattedData;
        const xDomain = this._xDomain;
        const endData = data.filter(d => d.x === xDomain[xDomain.length - 1]);
        const d = endData.find(d => d.y === val);
        return this._drawLabel(d, d.i);
       }
     })
    .ySort((a, b) => b.y - a.y)
    .y2Sort((a, b) => b.y - a.y)
  */


  var BumpChart = /*#__PURE__*/function (_Plot4) {
    _inherits(BumpChart, _Plot4);

    var _super5 = _createSuper(BumpChart);

    /**
        @memberof BumpChart
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function BumpChart() {
      var _this10;

      _classCallCheck(this, BumpChart);

      _this10 = _super5.call(this);
      _this10._discrete = "x";
      _this10._shape = d3plusCommon.constant("Line");

      _this10.x("x");

      _this10.y2(function (d) {
        return _this10._y(d);
      });

      _this10.yConfig({
        tickFormat: function tickFormat(val) {
          var data = _this10._formattedData;
          var xMin = data[0].x instanceof Date ? data[0].x.getTime() : data[0].x;
          var startData = data.filter(function (d) {
            return (d.x instanceof Date ? d.x.getTime() : d.x) === xMin;
          });
          var d = startData.find(function (d) {
            return d.y === val;
          });
          return d ? _this10._drawLabel(d, d.i) : "";
        }
      });

      _this10.y2Config({
        tickFormat: function tickFormat(val) {
          var data = _this10._formattedData;
          var xMax = data[data.length - 1].x instanceof Date ? data[data.length - 1].x.getTime() : data[data.length - 1].x;
          var endData = data.filter(function (d) {
            return (d.x instanceof Date ? d.x.getTime() : d.x) === xMax;
          });
          var d = endData.find(function (d) {
            return d.y === val;
          });
          return d ? _this10._drawLabel(d, d.i) : "";
        }
      });

      _this10.ySort(function (a, b) {
        return _this10._y(b) - _this10._y(a);
      });

      _this10.y2Sort(function (a, b) {
        return _this10._y(b) - _this10._y(a);
      });

      return _this10;
    }

    return BumpChart;
  }(Plot);
  /**
      @class LinePlot
      @extends Plot
      @desc Creates a line plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.Plot()
    .discrete("x")
    .shape("Line")
  */


  var LinePlot = /*#__PURE__*/function (_Plot5) {
    _inherits(LinePlot, _Plot5);

    var _super6 = _createSuper(LinePlot);

    /**
        @memberof LinePlot
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function LinePlot() {
      var _this11;

      _classCallCheck(this, LinePlot);

      _this11 = _super6.call(this);
      _this11._discrete = "x";
      _this11._shape = d3plusCommon.constant("Line");

      _this11.x("x");

      return _this11;
    }

    return LinePlot;
  }(Plot);
  /**
      @external Viz
      @see https://github.com/d3plus/d3plus-viz#Viz
  */


  var tau = Math.PI * 2;
  /**
      @class Radar
      @extends Viz
      @desc Creates a radar visualization based on an array of data.
  */

  var Radar = /*#__PURE__*/function (_d3plusViz$Viz2) {
    _inherits(Radar, _d3plusViz$Viz2);

    var _super7 = _createSuper(Radar);

    /**
        @memberof Radar
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Viz.
        @private
    */
    function Radar() {
      var _this12;

      _classCallCheck(this, Radar);

      _this12 = _super7.call(this);
      _this12._axisConfig = {
        shapeConfig: {
          fill: d3plusCommon.constant("none"),
          labelConfig: {
            fontColor: "#999",
            padding: 0,
            textAnchor: function textAnchor(d, i, x) {
              return x.textAnchor;
            },
            verticalAlign: "middle"
          },
          stroke: "#eee",
          strokeWidth: d3plusCommon.constant(1)
        }
      };
      _this12._discrete = "metric";
      _this12._levels = 6;
      _this12._metric = d3plusCommon.accessor("metric");
      _this12._outerPadding = 100;
      _this12._shape = d3plusCommon.constant("Path");
      _this12._value = d3plusCommon.accessor("value");
      return _this12;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Radar, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this13 = this;

        _get(_getPrototypeOf(Radar.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

        var radius = d3Array.min([height, width]) / 2 - this._outerPadding,
            transform = "translate(".concat(width / 2, ", ").concat(height / 2, ")");

        var nestedAxisData = d3Collection.nest().key(this._metric).entries(this._filteredData),
            nestedGroupData = d3Collection.nest().key(this._id).key(this._metric).entries(this._filteredData);
        var maxValue = d3Array.max(nestedGroupData.map(function (h) {
          return h.values.map(function (d) {
            return d3Array.sum(d.values, function (x, i) {
              return _this13._value(x, i);
            });
          });
        }).flat());
        var circularAxis = Array.from(Array(this._levels).keys()).map(function (d) {
          return {
            id: d,
            r: radius * ((d + 1) / _this13._levels)
          };
        });
        var circleConfig = d3plusCommon.configPrep.bind(this)(this._axisConfig.shapeConfig, "shape", "Circle");
        delete circleConfig.label;
        new shapes.Circle().data(circularAxis).select(d3plusCommon.elem("g.d3plus-Radar-radial-circles", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(circleConfig).render();
        var totalAxis = nestedAxisData.length;
        var polarAxis = nestedAxisData.map(function (d, i) {
          var width = _this13._outerPadding;
          var fontSize = _this13._shapeConfig.labelConfig.fontSize && _this13._shapeConfig.labelConfig.fontSize(d, i) || 11;
          var lineHeight = fontSize * 1.4;
          var height = lineHeight * 2;
          var padding = 10,
              quadrant = parseInt(360 - 360 / totalAxis * i / 90, 10) % 4 + 1,
              radians = tau / totalAxis * i;
          var angle = 360 / totalAxis * i;
          var textAnchor = "start";
          var x = padding;

          if (quadrant === 2 || quadrant === 3) {
            x = -width - padding;
            textAnchor = "end";
            angle += 180;
          }

          var labelBounds = {
            x: x,
            y: -height / 2,
            width: width,
            height: height
          };
          return {
            __d3plus__: true,
            data: d3plusCommon.merge(d.values, _this13._aggs),
            i: i,
            id: d.key,
            angle: angle,
            textAnchor: textAnchor,
            labelBounds: labelBounds,
            rotateAnchor: [-x, height / 2],
            x: radius * Math.cos(radians),
            y: radius * Math.sin(radians)
          };
        }).sort(function (a, b) {
          return a.key - b.key;
        });
        new shapes.Rect().data(polarAxis).rotate(function (d) {
          return d.angle || 0;
        }).width(0).height(0).x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).label(function (d) {
          return d.id;
        }).labelBounds(function (d) {
          return d.labelBounds;
        }).labelConfig(this._axisConfig.shapeConfig.labelConfig).select(d3plusCommon.elem("g.d3plus-Radar-text", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render();
        new shapes.Path().data(polarAxis).d(function (d) {
          return "M".concat(0, ",", 0, " ", -d.x, ",").concat(-d.y);
        }).select(d3plusCommon.elem("g.d3plus-Radar-axis", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(d3plusCommon.configPrep.bind(this)(this._axisConfig.shapeConfig, "shape", "Path")).render();
        var groupData = nestedGroupData.map(function (h) {
          var q = h.values.map(function (d, i) {
            var value = d3Array.sum(d.values, function (x, i) {
              return _this13._value(x, i);
            });
            var r = value / maxValue * radius,
                radians = tau / totalAxis * i;
            return {
              x: r * Math.cos(radians),
              y: r * Math.sin(radians)
            };
          });
          var d = "M ".concat(q[0].x, " ").concat(q[0].y, " ").concat(q.map(function (l) {
            return "L ".concat(l.x, " ").concat(l.y);
          }).join(" "), " L ").concat(q[0].x, " ").concat(q[0].y);
          return {
            arr: h.values.map(function (d) {
              return d3plusCommon.merge(d.values, _this13._aggs);
            }),
            id: h.key,
            points: q,
            d: d,
            __d3plus__: true,
            data: d3plusCommon.merge(h.values.map(function (d) {
              return d3plusCommon.merge(d.values, _this13._aggs);
            }), _this13._aggs)
          };
        });
        var pathConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "shape", "Path");
        var events = Object.keys(pathConfig.on);
        pathConfig.on = {};

        var _loop7 = function _loop7(e) {
          var event = events[e];

          pathConfig.on[event] = function (d, i, s, e) {
            var x = d.points.map(function (p) {
              return p.x + width / 2;
            });
            var y = d.points.map(function (p) {
              return p.y + height / 2;
            });
            var cursor = d3Selection.pointer(e, _this13._select.node());
            var xDist = x.map(function (p) {
              return Math.abs(p - cursor[0]);
            });
            var yDist = y.map(function (p) {
              return Math.abs(p - cursor[1]);
            });
            var dists = xDist.map(function (d, i) {
              return d + yDist[i];
            });

            _this13._on[event].bind(_this13)(d.arr[dists.indexOf(d3Array.min(dists))], i, s, e);
          };
        };

        for (var e = 0; e < events.length; e++) {
          _loop7(e);
        }

        this._shapes.push(new shapes.Path().data(groupData).d(function (d) {
          return d.d;
        }).select(d3plusCommon.elem("g.d3plus-Radar-items", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).config(pathConfig).render());

        return this;
      }
      /**
          @memberof Radar
          @desc Sets the config method used for the radial spokes, circles, and labels.
          @param {Object} *value*
          @chainable
      */

    }, {
      key: "axisConfig",
      value: function axisConfig(_) {
        return arguments.length ? (this._axisConfig = d3plusCommon.assign(this._axisConfig, _), this) : this._axisConfig;
      }
      /**
          @memberof Radar
          @desc Defines the value used as axis. If *value* is specified, sets the accessor to the specified metric function. If *value* is not specified, returns the current metric accessor.
          @param {Function|String} *value*
          @chainable
      */

    }, {
      key: "metric",
      value: function metric(_) {
        return arguments.length ? (this._metric = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._metric;
      }
      /**
          @memberof Radar
          @desc Determines how much pixel spaces to give the outer labels.
          @param {Number} [*value* = 100]
          @chainable
      */

    }, {
      key: "outerPadding",
      value: function outerPadding(_) {
        return arguments.length ? (this._outerPadding = _, this) : this._outerPadding;
      }
      /**
          @memberof Radar
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

    return Radar;
  }(d3plusViz.Viz);
  /**
      @class StackedArea
      @extends Area
      @desc Creates a stacked area plot based on an array of data.
      @example <caption>the equivalent of calling:</caption>
  new d3plus.AreaPlot()
    .stacked(true)
  */


  var StackedArea = /*#__PURE__*/function (_AreaPlot) {
    _inherits(StackedArea, _AreaPlot);

    var _super8 = _createSuper(StackedArea);

    /**
        @memberof StackedArea
        @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Plot.
        @private
    */
    function StackedArea() {
      var _this14;

      _classCallCheck(this, StackedArea);

      _this14 = _super8.call(this);
      _this14._stacked = true;
      return _this14;
    }

    return StackedArea;
  }(AreaPlot);

  exports.AreaPlot = AreaPlot;
  exports.BarChart = BarChart;
  exports.BoxWhisker = BoxWhisker;
  exports.BumpChart = BumpChart;
  exports.LinePlot = LinePlot;
  exports.Plot = Plot;
  exports.Radar = Radar;
  exports.StackedArea = StackedArea;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=d3plus-plot.js.map
