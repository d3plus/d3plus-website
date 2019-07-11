/*
  d3plus-axis v0.4.11
  Beautiful javascript scales and axes.
  Copyright (c) 2019 D3plus - https://d3plus.org
  @license MIT
*/

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
      keys.push.apply(keys, Object.getOwnPropertySymbols(object));
    }

    if (enumerableOnly) keys = keys.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
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

  function Set$1() {}

  var proto = map.prototype;
  Set$1.prototype = set.prototype = {
    constructor: Set$1,
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
    var set = new Set$1(); // Copy constructor.

    if (object instanceof Set$1) object.each(function (value) {
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

  var rho = Math.SQRT2;

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
      _classCallCheck$1(this, BaseClass);

      this._locale = "en-US";
      this._on = {};
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
          @desc If *value* is specified, sets the locale to the specified string and returns the current class instance. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). In another case, you can define an Object with a custom locale.
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
        return arguments.length ? (this._locale = _, this) : this._locale;
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
    var availableKeys = new Set(merge(objects.map(function (o) {
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
          value = Array.from(new Set(value));
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(String) >= 0) {
          value = Array.from(new Set(values));
          if (value.length === 1) value = value[0];
        } else if (types.indexOf(Number) >= 0) value = sum(values);else if (types.indexOf(Object) >= 0) value = objectMerge(values.filter(function (v) {
          return v;
        }));else {
          value = Array.from(new Set(values.filter(function (v) {
            return v !== void 0;
          })));
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
  var formatLocale$2 = {
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
    "es-CL": {
      separator: "",
      suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
      grouping: [3],
      delimiters: {
        thousands: ".",
        decimal: ","
      },
      currency: ["$", ""]
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
    var length = n.toString().split(".")[0].replace("-", "").length,
        localeConfig = _typeof$3(locale) === "object" ? locale : formatLocale$2[locale] || formatLocale$2["en-US"],
        suffixes = localeConfig.suffixes.map(parseSuffixes);
    var decimal = localeConfig.delimiters.decimal || ".",
        separator = localeConfig.separator || "",
        thousands = localeConfig.delimiters.thousands || ",";
    var d3plusFormatLocale = formatLocale$1({
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
    return val.replace(/(\.[1-9]*)[0]*$/g, "$1") // removes any trailing zeros
    .replace(/[.]$/g, ""); // removes any trailing decimal point
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
        update.attr("xlink:href", this._url).style("pointer-events", this._pointerEvents).transition(t).attr("opacity", 1).attr("width", function (d, i) {
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
      reHex3$1 = /^#([0-9a-f]{3})$/,
      reHex6$1 = /^#([0-9a-f]{6})$/,
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
  function color$1(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3$1.exec(format)) ? (m = parseInt(m[1], 16), new Rgb$1(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    ) : (m = reHex6$1.exec(format)) ? rgbn$1(parseInt(m[1], 16)) // #ff0000
    : (m = reRgbInteger$1.exec(format)) ? new Rgb$1(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent$1.exec(format)) ? new Rgb$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger$1.exec(format)) ? rgba$1(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent$1.exec(format)) ? rgba$1(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent$1.exec(format)) ? hsla$1(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named$1.hasOwnProperty(format) ? rgbn$1(named$1[format]) : format === "transparent" ? new Rgb$1(NaN, NaN, NaN, 0) : null;
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
    hex: function hex() {
      return "#" + _hex$1(this.r) + _hex$1(this.g) + _hex$1(this.b);
    },
    toString: function toString() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  function _hex$1(value) {
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
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb$1(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var deg2rad$1 = Math.PI / 180;
  var rad2deg$1 = 180 / Math.PI;

  var K$1 = 18,
      Xn$1 = 0.96422,
      Yn$1 = 1,
      Zn$1 = 0.82521,
      t0$2 = 4 / 29,
      t1$2 = 6 / 29,
      t2$1 = 3 * t1$2 * t1$2,
      t3$1 = t1$2 * t1$2 * t1$2;

  function labConvert$1(o) {
    if (o instanceof Lab$1) return new Lab$1(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl$1) return hcl2lab(o);
    if (!(o instanceof Rgb$1)) o = rgbConvert$1(o);
    var r = rgb2lrgb$1(o.r),
        g = rgb2lrgb$1(o.g),
        b = rgb2lrgb$1(o.b),
        y = xyz2lab$1((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn$1),
        x,
        z;
    if (r === g && g === b) x = z = y;else {
      x = xyz2lab$1((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn$1);
      z = xyz2lab$1((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn$1);
    }
    return new Lab$1(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }
  function lab$1(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert$1(l) : new Lab$1(l, a, b, opacity == null ? 1 : opacity);
  }
  function Lab$1(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }
  define$1(Lab$1, lab$1, extend$1(Color$1, {
    brighter: function brighter(k) {
      return new Lab$1(this.l + K$1 * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function darker(k) {
      return new Lab$1(this.l - K$1 * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn$1 * lab2xyz$1(x);
      y = Yn$1 * lab2xyz$1(y);
      z = Zn$1 * lab2xyz$1(z);
      return new Rgb$1(lrgb2rgb$1(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb$1(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb$1(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
  }));

  function xyz2lab$1(t) {
    return t > t3$1 ? Math.pow(t, 1 / 3) : t / t2$1 + t0$2;
  }

  function lab2xyz$1(t) {
    return t > t1$2 ? t * t * t : t2$1 * (t - t0$2);
  }

  function lrgb2rgb$1(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb$1(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert$1(o) {
    if (o instanceof Hcl$1) return new Hcl$1(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab$1)) o = labConvert$1(o);
    if (o.a === 0 && o.b === 0) return new Hcl$1(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg$1;
    return new Hcl$1(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl$1(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert$1(h) : new Hcl$1(h, c, l, opacity == null ? 1 : opacity);
  }
  function Hcl$1(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  function hcl2lab(o) {
    if (isNaN(o.h)) return new Lab$1(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad$1;
    return new Lab$1(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  define$1(Hcl$1, hcl$1, extend$1(Color$1, {
    brighter: function brighter(k) {
      return new Hcl$1(this.h, this.c, this.l + K$1 * (k == null ? 1 : k), this.opacity);
    },
    darker: function darker(k) {
      return new Hcl$1(this.h, this.c, this.l - K$1 * (k == null ? 1 : k), this.opacity);
    },
    rgb: function rgb() {
      return hcl2lab(this).rgb();
    }
  }));

  var A$1 = -0.14861,
      B$1 = +1.78277,
      C$1 = -0.29227,
      D$1 = -0.90649,
      E$1 = +1.97294,
      ED$1 = E$1 * D$1,
      EB$1 = E$1 * B$1,
      BC_DA$1 = B$1 * C$1 - D$1 * A$1;

  function cubehelixConvert$1(o) {
    if (o instanceof Cubehelix$1) return new Cubehelix$1(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb$1)) o = rgbConvert$1(o);
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        l = (BC_DA$1 * b + ED$1 * r - EB$1 * g) / (BC_DA$1 + ED$1 - EB$1),
        bl = b - l,
        k = (E$1 * (g - l) - C$1 * bl) / D$1,
        s = Math.sqrt(k * k + bl * bl) / (E$1 * l * (1 - l)),
        // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * rad2deg$1 - 120 : NaN;
    return new Cubehelix$1(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix$1(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert$1(h) : new Cubehelix$1(h, s, l, opacity == null ? 1 : opacity);
  }
  function Cubehelix$1(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define$1(Cubehelix$1, cubehelix$1, extend$1(Color$1, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$1 : Math.pow(_brighter$1, k);
      return new Cubehelix$1(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$1 : Math.pow(_darker$1, k);
      return new Cubehelix$1(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad$1,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
      return new Rgb$1(255 * (l + a * (A$1 * cosh + B$1 * sinh)), 255 * (l + a * (C$1 * cosh + D$1 * sinh)), 255 * (l + a * (E$1 * cosh)), this.opacity);
    }
  }));

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
      reHex3$2 = /^#([0-9a-f]{3})$/,
      reHex6$2 = /^#([0-9a-f]{6})$/,
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
  function color$2(format) {
    var m;
    format = (format + "").trim().toLowerCase();
    return (m = reHex3$2.exec(format)) ? (m = parseInt(m[1], 16), new Rgb$2(m >> 8 & 0xf | m >> 4 & 0x0f0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
    ) : (m = reHex6$2.exec(format)) ? rgbn$2(parseInt(m[1], 16)) // #ff0000
    : (m = reRgbInteger$2.exec(format)) ? new Rgb$2(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
    : (m = reRgbPercent$2.exec(format)) ? new Rgb$2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
    : (m = reRgbaInteger$2.exec(format)) ? rgba$2(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
    : (m = reRgbaPercent$2.exec(format)) ? rgba$2(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
    : (m = reHslPercent$2.exec(format)) ? hsla$2(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
    : (m = reHslaPercent$2.exec(format)) ? hsla$2(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
    : named$2.hasOwnProperty(format) ? rgbn$2(named$2[format]) : format === "transparent" ? new Rgb$2(NaN, NaN, NaN, 0) : null;
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
    hex: function hex() {
      return "#" + _hex$2(this.r) + _hex$2(this.g) + _hex$2(this.b);
    },
    toString: function toString() {
      var a = this.opacity;
      a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  function _hex$2(value) {
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
    }
  }));
  /* From FvD 13.37, CSS Color Module Level 3 */

  function hsl2rgb$2(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  var deg2rad$2 = Math.PI / 180;
  var rad2deg$2 = 180 / Math.PI;

  var K$2 = 18,
      Xn$2 = 0.96422,
      Yn$2 = 1,
      Zn$2 = 0.82521,
      t0$3 = 4 / 29,
      t1$3 = 6 / 29,
      t2$2 = 3 * t1$3 * t1$3,
      t3$2 = t1$3 * t1$3 * t1$3;

  function labConvert$2(o) {
    if (o instanceof Lab$2) return new Lab$2(o.l, o.a, o.b, o.opacity);
    if (o instanceof Hcl$2) return hcl2lab$1(o);
    if (!(o instanceof Rgb$2)) o = rgbConvert$2(o);
    var r = rgb2lrgb$2(o.r),
        g = rgb2lrgb$2(o.g),
        b = rgb2lrgb$2(o.b),
        y = xyz2lab$2((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn$2),
        x,
        z;
    if (r === g && g === b) x = z = y;else {
      x = xyz2lab$2((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn$2);
      z = xyz2lab$2((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn$2);
    }
    return new Lab$2(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
  }
  function lab$2(l, a, b, opacity) {
    return arguments.length === 1 ? labConvert$2(l) : new Lab$2(l, a, b, opacity == null ? 1 : opacity);
  }
  function Lab$2(l, a, b, opacity) {
    this.l = +l;
    this.a = +a;
    this.b = +b;
    this.opacity = +opacity;
  }
  define$2(Lab$2, lab$2, extend$2(Color$2, {
    brighter: function brighter(k) {
      return new Lab$2(this.l + K$2 * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    darker: function darker(k) {
      return new Lab$2(this.l - K$2 * (k == null ? 1 : k), this.a, this.b, this.opacity);
    },
    rgb: function rgb() {
      var y = (this.l + 16) / 116,
          x = isNaN(this.a) ? y : y + this.a / 500,
          z = isNaN(this.b) ? y : y - this.b / 200;
      x = Xn$2 * lab2xyz$2(x);
      y = Yn$2 * lab2xyz$2(y);
      z = Zn$2 * lab2xyz$2(z);
      return new Rgb$2(lrgb2rgb$2(3.1338561 * x - 1.6168667 * y - 0.4906146 * z), lrgb2rgb$2(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z), lrgb2rgb$2(0.0719453 * x - 0.2289914 * y + 1.4052427 * z), this.opacity);
    }
  }));

  function xyz2lab$2(t) {
    return t > t3$2 ? Math.pow(t, 1 / 3) : t / t2$2 + t0$3;
  }

  function lab2xyz$2(t) {
    return t > t1$3 ? t * t * t : t2$2 * (t - t0$3);
  }

  function lrgb2rgb$2(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
  }

  function rgb2lrgb$2(x) {
    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  }

  function hclConvert$2(o) {
    if (o instanceof Hcl$2) return new Hcl$2(o.h, o.c, o.l, o.opacity);
    if (!(o instanceof Lab$2)) o = labConvert$2(o);
    if (o.a === 0 && o.b === 0) return new Hcl$2(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
    var h = Math.atan2(o.b, o.a) * rad2deg$2;
    return new Hcl$2(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
  }
  function hcl$2(h, c, l, opacity) {
    return arguments.length === 1 ? hclConvert$2(h) : new Hcl$2(h, c, l, opacity == null ? 1 : opacity);
  }
  function Hcl$2(h, c, l, opacity) {
    this.h = +h;
    this.c = +c;
    this.l = +l;
    this.opacity = +opacity;
  }

  function hcl2lab$1(o) {
    if (isNaN(o.h)) return new Lab$2(o.l, 0, 0, o.opacity);
    var h = o.h * deg2rad$2;
    return new Lab$2(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }

  define$2(Hcl$2, hcl$2, extend$2(Color$2, {
    brighter: function brighter(k) {
      return new Hcl$2(this.h, this.c, this.l + K$2 * (k == null ? 1 : k), this.opacity);
    },
    darker: function darker(k) {
      return new Hcl$2(this.h, this.c, this.l - K$2 * (k == null ? 1 : k), this.opacity);
    },
    rgb: function rgb() {
      return hcl2lab$1(this).rgb();
    }
  }));

  var A$2 = -0.14861,
      B$2 = +1.78277,
      C$2 = -0.29227,
      D$2 = -0.90649,
      E$2 = +1.97294,
      ED$2 = E$2 * D$2,
      EB$2 = E$2 * B$2,
      BC_DA$2 = B$2 * C$2 - D$2 * A$2;

  function cubehelixConvert$2(o) {
    if (o instanceof Cubehelix$2) return new Cubehelix$2(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Rgb$2)) o = rgbConvert$2(o);
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        l = (BC_DA$2 * b + ED$2 * r - EB$2 * g) / (BC_DA$2 + ED$2 - EB$2),
        bl = b - l,
        k = (E$2 * (g - l) - C$2 * bl) / D$2,
        s = Math.sqrt(k * k + bl * bl) / (E$2 * l * (1 - l)),
        // NaN if l=0 or l=1
    h = s ? Math.atan2(k, bl) * rad2deg$2 - 120 : NaN;
    return new Cubehelix$2(h < 0 ? h + 360 : h, s, l, o.opacity);
  }

  function cubehelix$2(h, s, l, opacity) {
    return arguments.length === 1 ? cubehelixConvert$2(h) : new Cubehelix$2(h, s, l, opacity == null ? 1 : opacity);
  }
  function Cubehelix$2(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define$2(Cubehelix$2, cubehelix$2, extend$2(Color$2, {
    brighter: function brighter(k) {
      k = k == null ? _brighter$2 : Math.pow(_brighter$2, k);
      return new Cubehelix$2(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function darker(k) {
      k = k == null ? _darker$2 : Math.pow(_darker$2, k);
      return new Cubehelix$2(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function rgb() {
      var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad$2,
          l = +this.l,
          a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
          cosh = Math.cos(h),
          sinh = Math.sin(h);
      return new Rgb$2(255 * (l + a * (A$2 * cosh + B$2 * sinh)), 255 * (l + a * (C$2 * cosh + D$2 * sinh)), 255 * (l + a * (E$2 * cosh)), this.opacity);
    }
  }));

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

  var pi$1 = Math.PI,
      tau$1 = 2 * pi$1,
      epsilon = 1e-6,
      tauEpsilon = tau$1 - epsilon;

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
                  l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
                  t01 = l / l01,
                  t21 = l / l21; // If the start tangent is not coincident with (x0,y0), line to.

              if (Math.abs(t01 - 1) > epsilon) {
                this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
              }

              this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
            }
    },
    arc: function arc(x, y, r, a0, a1, ccw) {
      x = +x, y = +y, r = +r;
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

      if (da < 0) da = da % tau$1 + tau$1; // Is this a complete circle? Draw two arcs to complete the circle.

      if (da > tauEpsilon) {
        this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
      } // Is this arc non-empty? Draw an arc!
      else if (da > epsilon) {
          this._ += "A" + r + "," + r + ",0," + +(da >= pi$1) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
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
  var pi$2 = Math.PI;
  var halfPi = pi$2 / 2;
  var tau$2 = 2 * pi$2;
  function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi$2 : Math.acos(x);
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
      else if (da > tau$2 - epsilon$1) {
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

              if (da < pi$2 && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
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
          a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$2 / 2;
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

  function identity$4 (d) {
    return d;
  }

  function pie () {
    var value = identity$4,
        sortValues = descending,
        sort = null,
        startAngle = constant$4(0),
        endAngle = constant$4(tau$2),
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
          da = Math.min(tau$2, Math.max(-tau$2, endAngle.apply(this, arguments) - a0)),
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
      var r = Math.sqrt(size / pi$2);
      context.moveTo(r, 0);
      context.arc(0, 0, r, 0, tau$2);
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

  var ka = 0.89081309152928522810,
      kr = Math.sin(pi$2 / 10) / Math.sin(7 * pi$2 / 10),
      kx = Math.sin(tau$2 / 10) * kr,
      ky = -Math.cos(tau$2 / 10) * kr;
  var star = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size * ka),
          x = kx * r,
          y = ky * r;
      context.moveTo(0, -r);
      context.lineTo(x, y);

      for (var i = 1; i < 5; ++i) {
        var a = tau$2 * i / 5,
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
    if (input === " ") return input;
    var doc = new DOMParser().parseFromString(input.replace(/<[^>]+>/g, ""), "text/html");
    return doc.documentElement.textContent;
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
    return str.replace(/^\s+|\s+$/g, "");
  }
  /**
      @function trimRight
      @desc Cross-browser implementation of [trimRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/TrimRight).
      @param {String} str
  */


  function trimRight(str) {
    return str.replace(/\s+$/, "");
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

  var splitChars = ["-", ";", ":", "&", "u0E2F", // thai character pairannoi
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

          lineData[line - 1] = trimRight(lineData[line - 1]);
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
  var tagLookup = {
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
      _this._html = true;

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
          var wrapper = textWrap().fontFamily(style["font-family"]).fontSize(fS).fontWeight(style["font-weight"]).lineHeight(lH).maxLines(_this2._maxLines(d, i)).height(h).overflow(_this2._overflow(d, i)).width(w);

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
                var tag = tagLookup[a] ? "<tspan style=\"".concat(tagLookup[a], "\">") : "";
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
          @desc Toggles the ability to render simple HTML tags. Currently supports `<b>`, `<strong>`, `<i>`, and `<em>`.
          @param {Boolean} [*value* = true]
          @chainable
      */

    }, {
      key: "html",
      value: function html(_) {
        return arguments.length ? (this._html = _, this) : this._html;
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

        this._backgroundImageClass.data(imageData).duration(this._duration).pointerEvents("none").select(elem("g.d3plus-".concat(this._name, "-image"), {
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

        this._labelClass.data(labelData).duration(this._duration).pointerEvents("none").rotate(function (d) {
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

        update.order().transition(this._transition).call(this._applyTransform.bind(this)); // Makes the enter state of the group selection accessible.

        var enter = this._enter = update.enter().append(this._tagName).attr("class", function (d, i) {
          return "d3plus-Shape d3plus-".concat(_this6._name, " d3plus-id-").concat(strip(_this6._nestWrapper(_this6._id)(d, i)));
        }).call(this._applyTransform.bind(this)).attr("aria-label", this._ariaLabel).attr("role", this._role).attr("opacity", this._nestWrapper(this._opacity));
        var enterUpdate = enter.merge(update);
        enterUpdate.attr("shape-rendering", this._nestWrapper(this._shapeRendering)).attr("pointer-events", "none").transition(this._transition).attr("opacity", this._nestWrapper(this._opacity)).attr("pointer-events", this._pointerEvents); // Makes the exit state of the group selection accessible.

        var exit = this._exit = update.exit();
        exit.transition().delay(this._duration).remove();

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
              interpolatedCommand[arg] = (1 - t) * aCommand[arg] + t * bCommand[arg];
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
        _get(_getPrototypeOf$3(Area.prototype), "render", this).call(this, callback);

        var path = this._path = area().defined(this._defined).curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).x(this._x).x0(this._x0).x1(this._x1).y(this._y).y0(this._y0).y1(this._y1);
        var exitPath = area().defined(function (d) {
          return d;
        }).curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).x(this._x).x0(this._x0).x1(this._x1).y(this._y).y0(this._y0).y1(this._y1);

        this._enter.append("path").attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attr("d", function (d) {
          return path(d.values);
        }).call(this._applyStyle.bind(this));

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

        this._enter.attr("width", function (d, i) {
          return _this2._x1 === null ? _this2._getWidth(d, i) : 0;
        }).attr("height", function (d, i) {
          return _this2._x1 !== null ? _this2._getHeight(d, i) : 0;
        }).attr("x", function (d, i) {
          return _this2._x1 === null ? -_this2._getWidth(d, i) / 2 : 0;
        }).attr("y", function (d, i) {
          return _this2._x1 !== null ? -_this2._getHeight(d, i) / 2 : 0;
        }).call(this._applyStyle.bind(this)).transition(this._transition).call(this._applyPosition.bind(this));

        this._update.transition(this._transition).call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));

        this._exit.transition(this._transition).attr("width", function (d, i) {
          return _this2._x1 === null ? _this2._getWidth(d, i) : 0;
        }).attr("height", function (d, i) {
          return _this2._x1 !== null ? _this2._getHeight(d, i) : 0;
        }).attr("x", function (d, i) {
          return _this2._x1 === null ? -_this2._getWidth(d, i) / 2 : 0;
        }).attr("y", function (d, i) {
          return _this2._x1 !== null ? -_this2._getHeight(d, i) / 2 : 0;
        });

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

        this._enter.attr("r", 0).attr("x", 0).attr("y", 0).call(this._applyStyle.bind(this)).transition(this._transition).call(this._applyPosition.bind(this));

        this._update.transition(this._transition).call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));

        this._exit.transition(this._transition).attr("r", 0).attr("x", 0).attr("y", 0);

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

        this._enter.attr("width", 0).attr("height", 0).attr("x", 0).attr("y", 0).call(this._applyStyle.bind(this)).transition(this._transition).call(this._applyPosition.bind(this));

        this._update.transition(this._transition).call(this._applyStyle.bind(this)).call(this._applyPosition.bind(this));

        this._exit.transition(this._transition).attr("width", 0).attr("height", 0).attr("x", 0).attr("y", 0);

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

        this._path.curve(paths["curve".concat(this._curve.charAt(0).toUpperCase()).concat(this._curve.slice(1))]).defined(this._defined).x(this._x).y(this._y);

        this._enter.append("path").attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attr("d", function (d) {
          return _this3._path(d.values);
        }).call(this._applyStyle.bind(this));

        this._update.select("path").transition(this._transition).attr("transform", function (d) {
          return "translate(".concat(-d.xR[0] - d.width / 2, ", ").concat(-d.yR[0] - d.height / 2, ")");
        }).attrTween("d", function (d) {
          return interpolatePath(_select(this).attr("d"), that._path(d.values));
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

  var pi$3 = Math.PI;
  /**
      @function shapeEdgePoint
      @desc Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
      @param {Number} angle The angle, in radians, of the offset point.
      @param {Number} distance The pixel distance away from the origin.
      @returns {String} [shape = "circle"] The type of shape, which can be either "circle" or "square".
  */

  var shapeEdgePoint = (function (angle, distance) {
    var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "circle";
    if (angle < 0) angle = pi$3 * 2 + angle;

    if (shape === "square") {
      var diagonal = 45 * (pi$3 / 180);
      var x = 0,
          y = 0;

      if (angle < pi$3 / 2) {
        var tan = Math.tan(angle);
        x += angle < diagonal ? distance : distance / tan;
        y += angle < diagonal ? tan * distance : distance;
      } else if (angle <= pi$3) {
        var _tan = Math.tan(pi$3 - angle);

        x -= angle < pi$3 - diagonal ? distance / _tan : distance;
        y += angle < pi$3 - diagonal ? distance : _tan * distance;
      } else if (angle < diagonal + pi$3) {
        x -= distance;
        y -= Math.tan(angle - pi$3) * distance;
      } else if (angle < 3 * pi$3 / 2) {
        x -= distance / Math.tan(angle - pi$3);
        y -= distance;
      } else if (angle < 2 * pi$3 - diagonal) {
        x += distance / Math.tan(2 * pi$3 - angle);
        y -= distance;
      } else {
        x += distance;
        y -= Math.tan(2 * pi$3 - angle) * distance;
      }

      return [x, y];
    } else if (shape === "circle") {
      return [distance * Math.cos(angle), distance * Math.sin(angle)];
    } else return null;
  });

  var pi$4 = Math.PI;
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
        if (points[2]) angle = pi$4 * 2 - angle;
        var step = angle / (angle / (pi$4 * 2) * (radius * pi$4 * 2) / segmentLength);
        var start = Math.atan2(-prev[1], -prev[0]) - pi$4;
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

        this._enter.attr("opacity", 0).attr("d", this._d).call(this._applyStyle.bind(this)).transition(this._transition).attr("opacity", 1);

        this._update.transition(this._transition).call(this._applyStyle.bind(this)).attr("opacity", 1).attr("d", this._d);

        this._exit.transition(this._transition).attr("opacity", 0);

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

  var formatDay = timeFormat("%a %d"),
      formatHour = timeFormat("%I %p"),
      formatMillisecond = timeFormat(".%L"),
      formatMinute = timeFormat("%I:%M"),
      formatMonth = timeFormat("%b"),
      formatSecond = timeFormat(":%S"),
      formatWeek = timeFormat("%b %d"),
      formatYear$1 = timeFormat("%Y");
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

        bar.call(attrize, this._barConfig).attr("".concat(x, "1"), this._getPosition(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0)).attr("".concat(x, "2"), this._getPosition(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0)).attr("".concat(y, "1"), position).attr("".concat(y, "2"), position);
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
        var domain = this._scale === "ordinal" ? ticks : extent(ticks);
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
        var _this3 = this,
            _this$_outerBounds;

        /**
         * Creates an SVG element to contain the axis if none
         * has been specified using the "select" method.
         */
        if (this._select === void 0) {
          this.select(_select("body").append("svg").attr("width", "".concat(this._width, "px")).attr("height", "".concat(this._height, "px")).node());
        }
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


          this._d3Scale = scales["scale".concat(this._scale.charAt(0).toUpperCase()).concat(this._scale.slice(1))]().domain(this._scale === "time" ? this._domain.map(date$2) : this._domain);
          if (this._d3Scale.round) this._d3Scale.round(true);
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
            var prevPosition = i - diff < 0 ? rangeOuter[0] : position - (position - textData[i - diff].position) / 2;
            var prevSpace = Math.abs(position - prevPosition);
            var nextPosition = i + diff > textData.length - 1 ? rangeOuter[1] : position - (position - textData[i + diff].position) / 2;
            var nextSpace = Math.abs(position - nextPosition);
            return min([prevSpace, nextSpace]) * 2;
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
            return (second(d) < d ? formatMillisecond : minute(d) < d ? formatSecond : hour(d) < d ? formatMinute : day(d) < d ? formatHour : month(d) < d ? sunday(d) < d ? formatDay : formatWeek : year(d) < d ? formatMonth : formatYear$1)(d);
          } else if (_this3._scale === "ordinal") {
            return d;
          }

          var n = _this3._d3Scale.tickFormat ? _this3._d3Scale.tickFormat(labels.length - 1)(d) : d;
          n = n.replace(/[^\d\.\-\+]/g, "") * 1;

          if (isNaN(n)) {
            return n;
          } else if (_this3._scale === "linear" && _this3._tickSuffix === "smallest") {
            var locale = _typeof(_this3._locale) === "object" ? _this3._locale : formatLocale$2[_this3._locale];
            var separator = locale.separator,
                suffixes = locale.suffixes;
            var suff = n >= 1000 ? suffixes[_this3._tickUnit + 8] : "";
            var tick = n / Math.pow(10, 3 * _this3._tickUnit);
            var number = formatAbbreviate(tick, locale, ",.".concat(tick.toString().length, "r"));
            return "".concat(number).concat(separator).concat(suff);
          } else {
            return formatAbbreviate(n, _this3._locale);
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
          var wrap = textWrap().fontFamily(fF).fontSize(fS).lineHeight(this._shapeConfig.lineHeight ? this._shapeConfig.lineHeight(d, i) : undefined)[w](horizontal ? space : min([this._maxSize, this._width]) - hBuff - p - this._margin.left - this._margin.right)[h](horizontal ? min([this._maxSize, this._height]) - hBuff - p - this._margin.top - this._margin.bottom : space);
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
        }).verticalAlign("middle").width(range[range.length - 1] - range[0]).x(horizontal ? range[0] : this._orient === "left" ? margin[this._orient] / 2 - (range[range.length - 1] - range[0]) / 2 + p : p - margin.right / 2).y(horizontal ? this._orient === "bottom" ? bounds.height - margin.bottom + p : bounds.y : range[0] + (range[range.length - 1] - range[0]) / 2 - margin[this._orient] / 2).config(this._titleConfig).render();

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
	  version: '3.1.3',
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
//# sourceMappingURL=d3plus-axis.full.js.map
