/*
  d3plus-geomap v0.3.1
  A reusable geo map built on D3 and Topojson
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('d3plus-geomap', ['exports'], factory) :
	(factory((global.d3plus = global.d3plus || {})));
}(this, (function (exports) { 'use strict';

var ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};

var bisector = function(compare) {
  if (compare.length === 1) { compare = ascendingComparator(compare); }
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) { lo = 0; }
      if (hi == null) { hi = a.length; }
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) { lo = mid + 1; }
        else { hi = mid; }
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) { lo = 0; }
      if (hi == null) { hi = a.length; }
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) { hi = mid; }
        else { lo = mid + 1; }
      }
      return lo;
    }
  };
};

function ascendingComparator(f) {
  return function(d, x) {
    return ascending(f(d), x);
  };
}

var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;

var number = function(x) {
  return x === null ? NaN : +x;
};

var extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;

  if (f == null) {
    while (++i < n) { if ((b = array[i]) != null && b >= b) { a = c = b; break; } }
    while (++i < n) { if ((b = array[i]) != null) {
      if (a > b) { a = b; }
      if (c < b) { c = b; }
    } }
  }

  else {
    while (++i < n) { if ((b = f(array[i], i, array)) != null && b >= b) { a = c = b; break; } }
    while (++i < n) { if ((b = f(array[i], i, array)) != null) {
      if (a > b) { a = b; }
      if (c < b) { c = b; }
    } }
  }

  return [a, c];
};

var identity = function(x) {
  return x;
};

var d3Range = function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
};

var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);

var ticks = function(start, stop, count) {
  var step = tickStep(start, stop, count);
  return d3Range(
    Math.ceil(start / step) * step,
    Math.floor(stop / step) * step + step / 2, // inclusive
    step
  );
};

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) { step1 *= 10; }
  else if (error >= e5) { step1 *= 5; }
  else if (error >= e2) { step1 *= 2; }
  return stop < start ? -step1 : step1;
}

var sturges = function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
};

var threshold = function(array, p, f) {
  if (f == null) { f = number; }
  if (!(n = array.length)) { return; }
  if ((p = +p) <= 0 || n < 2) { return +f(array[0], 0, array); }
  if (p >= 1) { return +f(array[n - 1], n - 1, array); }
  var n,
      h = (n - 1) * p,
      i = Math.floor(h),
      a = +f(array[i], i, array),
      b = +f(array[i + 1], i + 1, array);
  return a + (b - a) * (h - i);
};

var max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;

  if (f == null) {
    while (++i < n) { if ((b = array[i]) != null && b >= b) { a = b; break; } }
    while (++i < n) { if ((b = array[i]) != null && b > a) { a = b; } }
  }

  else {
    while (++i < n) { if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; } }
    while (++i < n) { if ((b = f(array[i], i, array)) != null && b > a) { a = b; } }
  }

  return a;
};

var merge = function(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) { j += arrays[i].length; }
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
};

var min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;

  if (f == null) {
    while (++i < n) { if ((b = array[i]) != null && b >= b) { a = b; break; } }
    while (++i < n) { if ((b = array[i]) != null && a > b) { a = b; } }
  }

  else {
    while (++i < n) { if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; } }
    while (++i < n) { if ((b = f(array[i], i, array)) != null && a > b) { a = b; } }
  }

  return a;
};

var sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (f == null) {
    while (++i < n) { if (a = +array[i]) { s += a; } } // Note: zero and null are equivalent.
  }

  else {
    while (++i < n) { if (a = +f(array[i], i, array)) { s += a; } }
  }

  return s;
};

function length(d) {
  return d.length;
}

// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

var adder = function() {
  return new Adder;
};

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) { this.t += temp.t; }
    else { this.s = temp.t; }
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}

var epsilon = 1e-6;

var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;

var exp = Math.exp;

var log = Math.log;

var sin = Math.sin;

var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function noop() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(feature, stream) {
    streamGeometry(feature.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) { streamGeometry(features[i].geometry, stream); }
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) { object = coordinates[i], stream.point(object[0], object[1], object[2]); }
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) { streamLine(coordinates[i], stream, 0); }
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) { streamPolygon(coordinates[i], stream); }
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) { streamGeometry(geometries[i], stream); }
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) { coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]); }
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) { streamLine(coordinates[i], stream, 1); }
  stream.polygonEnd();
}

var geoStream = function(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
};

var areaRingSum = adder();

var areaSum = adder();
var lambda00;
var phi00;
var lambda0;
var cosPhi0;
var sinPhi0;

function spherical(cartesian) {
  return [atan2(cartesian[1], cartesian[0]), asin(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var lambda0$1;
var phi0;
var lambda1;
var phi1;
var lambda2;
var lambda00$1;
var phi00$1;
var p0;
var deltaSum = adder();
var ranges;
var range;

var W0;
var X0;
var Y0;
var Z0; // previous point

var compose = function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) { compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  }; }

  return compose;
};

function rotationIdentity(lambda, phi) {
  return [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi),
      sinDeltaPhi = sin(deltaPhi),
      cosDeltaGamma = cos(deltaGamma),
      sinDeltaGamma = sin(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos(phi),
        x = cos(lambda) * cosPhi,
        y = sin(lambda) * cosPhi,
        z = sin(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) { return; }
  var cosRadius = cos(radius),
      sinRadius = sin(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) { t0 += direction * tau; }
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}

var clipBuffer = function() {
  var lines = [],
      line;
  return {
    point: function(x, y) {
      line.push([x, y]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop,
    rejoin: function() {
      if (lines.length > 1) { lines.push(lines.pop().concat(lines.shift())); }
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
};

var clipLine = function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) { return; }
  r /= dx;
  if (dx < 0) {
    if (r < t0) { return; }
    if (r < t1) { t1 = r; }
  } else if (dx > 0) {
    if (r > t1) { return; }
    if (r > t0) { t0 = r; }
  }

  r = x1 - ax;
  if (!dx && r < 0) { return; }
  r /= dx;
  if (dx < 0) {
    if (r > t1) { return; }
    if (r > t0) { t0 = r; }
  } else if (dx > 0) {
    if (r < t0) { return; }
    if (r < t1) { t1 = r; }
  }

  r = y0 - ay;
  if (!dy && r > 0) { return; }
  r /= dy;
  if (dy < 0) {
    if (r < t0) { return; }
    if (r < t1) { t1 = r; }
  } else if (dy > 0) {
    if (r > t1) { return; }
    if (r > t0) { t0 = r; }
  }

  r = y1 - ay;
  if (!dy && r < 0) { return; }
  r /= dy;
  if (dy < 0) {
    if (r > t1) { return; }
    if (r > t0) { t0 = r; }
  } else if (dy > 0) {
    if (r < t0) { return; }
    if (r < t1) { t1 = r; }
  }

  if (t0 > 0) { a[0] = ax + t0 * dx, a[1] = ay + t0 * dy; }
  if (t1 < 1) { b[0] = ax + t1 * dx, b[1] = ay + t1 * dy; }
  return true;
};

var pointEqual = function(a, b) {
  return abs(a[0] - b[0]) < epsilon && abs(a[1] - b[1]) < epsilon;
};

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
var clipPolygon = function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) { return; }
    var n, p0 = segment[0], p1 = segment[n], x;

    // If the first and last points of a segment are coincident, then treat as a
    // closed ring. TODO if all rings are closed, then the winding order of the
    // exterior ring should be checked.
    if (pointEqual(p0, p1)) {
      stream.lineStart();
      for (i = 0; i < n; ++i) { stream.point((p0 = segment[i])[0], p0[1]); }
      stream.lineEnd();
      return;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) { return; }

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) { if ((current = current.n) === start) { return; } }
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) { stream.point((point = points[i])[0], point[1]); }
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) { stream.point((point = points[i])[0], point[1]); }
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
};

function link(array) {
  if (!(n = array.length)) { return; }
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

var clipMax = 1e9;
var clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipExtent(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do { stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0); }
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs(p[0] - x0) < epsilon ? direction > 0 ? 0 : 3
        : abs(p[0] - x1) < epsilon ? direction > 0 ? 2 : 1
        : abs(p[1] - y0) < epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) { activeStream.point(x, y); }
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) { ++winding; } }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) { --winding; } }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipPolygon(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) { polygon.push(ring = []); }
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) { bufferStream.rejoin(); }
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) { activeStream.lineEnd(); }
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) { ring.push([x, y]); }
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) { activeStream.point(x, y); }
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) { activeStream.lineEnd(); }
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var lengthSum = adder();
var lambda0$2;
var sinPhi0$1;
var cosPhi0$1;

var identity$1 = function(x) {
  return x;
};

var areaSum$1 = adder();
var areaRingSum$1 = adder();
var x00;
var y00;
var x0$1;
var y0$1;

var areaStream$1 = {
  point: noop,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: function() {
    areaStream$1.lineStart = areaRingStart$1;
    areaStream$1.lineEnd = areaRingEnd$1;
  },
  polygonEnd: function() {
    areaStream$1.lineStart = areaStream$1.lineEnd = areaStream$1.point = noop;
    areaSum$1.add(abs(areaRingSum$1));
    areaRingSum$1.reset();
  },
  result: function() {
    var area = areaSum$1 / 2;
    areaSum$1.reset();
    return area;
  }
};

function areaRingStart$1() {
  areaStream$1.point = areaPointFirst$1;
}

function areaPointFirst$1(x, y) {
  areaStream$1.point = areaPoint$1;
  x00 = x0$1 = x, y00 = y0$1 = y;
}

function areaPoint$1(x, y) {
  areaRingSum$1.add(y0$1 * x - x0$1 * y);
  x0$1 = x, y0$1 = y;
}

function areaRingEnd$1() {
  areaPoint$1(x00, y00);
}

var x0$2 = Infinity;
var y0$2 = x0$2;
var x1 = -x0$2;
var y1 = x1;

var boundsStream$1 = {
  point: boundsPoint$1,
  lineStart: noop,
  lineEnd: noop,
  polygonStart: noop,
  polygonEnd: noop,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};

function boundsPoint$1(x, y) {
  if (x < x0$2) { x0$2 = x; }
  if (x > x1) { x1 = x; }
  if (y < y0$2) { y0$2 = y; }
  if (y > y1) { y1 = y; }
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0$1 = 0;
var Y0$1 = 0;
var Z0$1 = 0;
var X1$1 = 0;
var Y1$1 = 0;
var Z1$1 = 0;
var X2$1 = 0;
var Y2$1 = 0;
var Z2$1 = 0;
var x00$1;
var y00$1;
var x0$3;
var y0$3;

var centroidStream$1 = {
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.point = centroidPoint$1;
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  },
  result: function() {
    var centroid = Z2$1 ? [X2$1 / Z2$1, Y2$1 / Z2$1]
        : Z1$1 ? [X1$1 / Z1$1, Y1$1 / Z1$1]
        : Z0$1 ? [X0$1 / Z0$1, Y0$1 / Z0$1]
        : [NaN, NaN];
    X0$1 = Y0$1 = Z0$1 =
    X1$1 = Y1$1 = Z1$1 =
    X2$1 = Y2$1 = Z2$1 = 0;
    return centroid;
  }
};

function centroidPoint$1(x, y) {
  X0$1 += x;
  Y0$1 += y;
  ++Z0$1;
}

function centroidLineStart$1() {
  centroidStream$1.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream$1.point = centroidPointLine;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$3, dy = y - y0$3, z = sqrt(dx * dx + dy * dy);
  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}

function centroidRingStart$1() {
  centroidStream$1.point = centroidPointFirstRing;
}

function centroidRingEnd$1() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream$1.point = centroidPointRing;
  centroidPoint$1(x00$1 = x0$3 = x, y00$1 = y0$3 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$3,
      dy = y - y0$3,
      z = sqrt(dx * dx + dy * dy);

  X1$1 += z * (x0$3 + x) / 2;
  Y1$1 += z * (y0$3 + y) / 2;
  Z1$1 += z;

  z = y0$3 * x - x0$3 * y;
  X2$1 += z * (x0$3 + x);
  Y2$1 += z * (y0$3 + y);
  Z2$1 += z * 3;
  centroidPoint$1(x0$3 = x, y0$3 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) { this._context.closePath(); }
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop
};

var lengthSum$1 = adder();
var lengthRing;
var x00$2;
var y00$2;
var x0$4;
var y0$4;

var lengthStream$1 = {
  point: noop,
  lineStart: function() {
    lengthStream$1.point = lengthPointFirst$1;
  },
  lineEnd: function() {
    if (lengthRing) { lengthPoint$1(x00$2, y00$2); }
    lengthStream$1.point = noop;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum$1;
    lengthSum$1.reset();
    return length;
  }
};

function lengthPointFirst$1(x, y) {
  lengthStream$1.point = lengthPoint$1;
  x00$2 = x0$4 = x, y00$2 = y0$4 = y;
}

function lengthPoint$1(x, y) {
  x0$4 -= x, y0$4 -= y;
  lengthSum$1.add(sqrt(x0$4 * x0$4 + y0$4 * y0$4));
  x0$4 = x, y0$4 = y;
}

function PathString() {
  this._string = [];
}

PathString.prototype = {
  _circle: circle$1(4.5),
  pointRadius: function(_) {
    return this._circle = circle$1(_), this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) { this._string.push("Z"); }
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    }
  }
};

function circle$1(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}

var index = function(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") { contextStream.pointRadius(+pointRadius.apply(this, arguments)); }
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream$1));
    return areaStream$1.result();
  };

  Object.defineProperty(path, "length", {
    writable: true,
    enumerable: true,
    configurable: true,
    value: function(object) {
      geoStream(object, projectionStream(lengthStream$1));
      return lengthStream$1.result();
    }
  });

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream$1));
    return boundsStream$1.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream$1));
    return centroidStream$1.result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, identity$1) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) { return context; }
    contextStream = _ == null ? (context = null, new PathString) : new PathContext(context = _);
    if (typeof pointRadius !== "function") { contextStream.pointRadius(pointRadius); }
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) { return pointRadius; }
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
};

var sum$1 = adder();

var polygonContains = function(polygon, point) {
  var lambda = point[0],
      phi = point[1],
      normal = [sin(lambda), -cos(lambda), 0],
      angle = 0,
      winding = 0;

  sum$1.reset();

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) { continue; }
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = point0[0],
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin(phi0),
        cosPhi0 = cos(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = point1[0],
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin(phi1),
          cosPhi1 = cos(phi1),
          delta = lambda1 - lambda0,
          sign$$1 = delta >= 0 ? 1 : -1,
          absDelta = sign$$1 * delta,
          antimeridian = absDelta > pi,
          k = sinPhi0 * sinPhi1;

      sum$1.add(atan2(k * sign$$1 * sin(absDelta), cosPhi0 * cosPhi1 + k * cos(absDelta)));
      angle += antimeridian ? delta + sign$$1 * tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon || angle < epsilon && sum$1 < -epsilon) ^ (winding & 1);
};

var clip = function(pointVisible, clipLine, interpolate, start) {
  return function(rotate, sink) {
    var line = clipLine(sink),
        rotatedStart = rotate.invert(start[0], start[1]),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, rotatedStart);
        if (segments.length) {
          if (!polygonStarted) { sink.polygonStart(), polygonStarted = true; }
          clipPolygon(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) { sink.polygonStart(), polygonStarted = true; }
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) { sink.polygonEnd(), polygonStarted = false; }
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      var point = rotate(lambda, phi);
      if (pointVisible(lambda = point[0], phi = point[1])) { sink.point(lambda, phi); }
    }

    function pointLine(lambda, phi) {
      var point = rotate(lambda, phi);
      line.point(point[0], point[1]);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      var point = rotate(lambda, phi);
      ringSink.point(point[0], point[1]);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) { return; }

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) { sink.polygonStart(), polygonStarted = true; }
          sink.lineStart();
          for (i = 0; i < m; ++i) { sink.point((point = segment[i])[0], point[1]); }
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) { ringSegments.push(ringSegments.pop().concat(ringSegments.shift())); }

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
};

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi - epsilon : halfPi - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi : -pi,
          delta = abs(lambda1 - lambda0);
      if (abs(delta - pi) < epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) { // line crosses antimeridian
        if (abs(lambda0 - sign0) < epsilon) { lambda0 -= sign0 * epsilon; } // handle degeneracies
        if (abs(lambda1 - sign1) < epsilon) { lambda1 -= sign1 * epsilon; }
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin(lambda0 - lambda1);
  return abs(sinLambda0Lambda1) > epsilon
      ? atan((sin(phi0) * (cosPhi1 = cos(phi1)) * sin(lambda1)
          - sin(phi1) * (cosPhi0 = cos(phi0)) * sin(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

var clipCircle = function(radius, delta) {
  var cr = cos(radius),
      smallRadius = cr > 0,
      notHemisphere = abs(cr) > epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) { stream.lineStart(); }
        // Handle degeneracies.
        // TODO ignore if not clipping polygons.
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (pointEqual(point0, point2) || pointEqual(point1, point2)) {
            point1[0] += epsilon;
            point1[1] += epsilon;
            v = visible(point1[0], point1[1]);
          }
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1]);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) { stream.lineEnd(); }
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian(a),
        pb = cartesian(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross(pa, pb),
        n2n2 = cartesianDot(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) { return !two && a; }

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot(A, u),
        uu = cartesianDot(u, u),
        t2 = w * w - uu * (cartesianDot(A, A) - 1);

    if (t2 < 0) { return; }

    var t = sqrt(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical(q);

    if (!two) { return q; }

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) { z = lambda0, lambda0 = lambda1, lambda1 = z; }

    var delta = lambda1 - lambda0,
        polar = abs(delta - pi) < epsilon,
        meridian = polar || delta < epsilon;

    if (!polar && phi1 < phi0) { z = phi0, phi0 = phi1, phi1 = z; }

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs(q[0] - lambda0) < epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius,
        code = 0;
    if (lambda < -r) { code |= 1; } // left
    else if (lambda > r) { code |= 2; } // right
    if (phi < -r) { code |= 4; } // below
    else if (phi > r) { code |= 8; } // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi, radius - pi]);
};

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) { s[key] = methods[key]; }
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fitExtent(projection, extent, object) {
  var w = extent[1][0] - extent[0][0],
      h = extent[1][1] - extent[0][1],
      clip = projection.clipExtent && projection.clipExtent();

  projection
      .scale(150)
      .translate([0, 0]);

  if (clip != null) { projection.clipExtent(null); }

  geoStream(object, projection.stream(boundsStream$1));

  var b = boundsStream$1.result(),
      k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
      x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
      y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

  if (clip != null) { projection.clipExtent(clip); }

  return projection
      .scale(k * 150)
      .translate([x, y]);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

var maxDepth = 16;
var cosMinDistance = cos(30 * radians); // cos(minimum angular distance)

var resample = function(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
};

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt(a * a + b * b + c * c),
          phi2 = asin(c /= m),
          lambda2 = abs(abs(c) - 1) < epsilon || abs(lambda0 - lambda1) < epsilon ? (lambda0 + lambda1) / 2 : atan2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians, y * radians);
  }
});

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      dx, dy, lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, projectRotate, // rotate
      theta = null, preclip = clipAntimeridian, // clip angle
      x0 = null, y0, x1, y1, postclip = identity$1, // clip extent
      delta2 = 0.5, projectResample = resample(projectTransform, delta2), // precision
      cache,
      cacheStream;

  function projection(point) {
    point = projectRotate(point[0] * radians, point[1] * radians);
    return [point[0] * k + dx, dy - point[1] * k];
  }

  function invert(point) {
    point = projectRotate.invert((point[0] - dx) / k, (dy - point[1]) / k);
    return point && [point[0] * degrees, point[1] * degrees];
  }

  function projectTransform(x, y) {
    return x = project(x, y), [x[0] * k + dx, dy - x[1] * k];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(preclip(rotate, projectResample(postclip(cacheStream = stream))));
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians, 6 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$1) : clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians, phi = _[1] % 360 * radians, recenter()) : [lambda * degrees, phi * degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians, deltaPhi = _[1] % 360 * radians, deltaGamma = _.length > 2 ? _[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees, deltaPhi * degrees, deltaGamma * degrees];
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  function recenter() {
    projectRotate = compose(rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma), project);
    var center = project(lambda, phi);
    dx = x - center[0] * k;
    dy = y + center[1] * k;
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers

function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = cos(x),
        cy = cos(y),
        k = scale(cx * cy);
    return [
      k * cy * sin(x),
      k * sin(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt(x * x + y * y),
        c = angle(z),
        sc = sin(c),
        cc = cos(c);
    return [
      atan2(x * sc, z * cc),
      asin(z && y * sc / z)
    ];
  }
}

var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z) {
  return 2 * asin(z / 2);
});

var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});

azimuthalEquidistantRaw.invert = azimuthalInvert(function(z) {
  return z;
});

function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * atan(exp(y)) - halfPi];
};

var mercator = function() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / tau);
};

function mercatorProjection(project) {
  var m = projection(project),
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      clipAuto;

  m.scale = function(_) {
    return arguments.length ? (scale(_), clipAuto && m.clipExtent(null), m) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), clipAuto && m.clipExtent(null), m) : translate();
  };

  m.clipExtent = function(_) {
    if (!arguments.length) { return clipAuto ? null : clipExtent(); }
    if (clipAuto = _ == null) {
      var k = pi * scale(),
          t = translate();
      _ = [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]];
    }
    clipExtent(_);
    return m;
  };

  return m.clipExtent(null);
}

var prefix = "$";

function Map() {}

Map.prototype = map$1.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    var this$1 = this;

    for (var property in this$1) { if (property[0] === prefix) { delete this$1[property]; } }
  },
  keys: function() {
    var this$1 = this;

    var keys = [];
    for (var property in this$1) { if (property[0] === prefix) { keys.push(property.slice(1)); } }
    return keys;
  },
  values: function() {
    var this$1 = this;

    var values = [];
    for (var property in this$1) { if (property[0] === prefix) { values.push(this$1[property]); } }
    return values;
  },
  entries: function() {
    var this$1 = this;

    var entries = [];
    for (var property in this$1) { if (property[0] === prefix) { entries.push({key: property.slice(1), value: this$1[property]}); } }
    return entries;
  },
  size: function() {
    var this$1 = this;

    var size = 0;
    for (var property in this$1) { if (property[0] === prefix) { ++size; } }
    return size;
  },
  empty: function() {
    var this$1 = this;

    for (var property in this$1) { if (property[0] === prefix) { return false; } }
    return true;
  },
  each: function(f) {
    var this$1 = this;

    for (var property in this$1) { if (property[0] === prefix) { f(this$1[property], property.slice(1), this$1); } }
  }
};

function map$1(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) { object.each(function(value, key) { map.set(key, value); }); }

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) { while (++i < n) { map.set(i, object[i]); } }
    else { while (++i < n) { map.set(f(o = object[i], i, object), o); } }
  }

  // Convert object to map.
  else if (object) { for (var key in object) { map.set(key, object[key]); } }

  return map;
}

var nest = function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) { return rollup != null
        ? rollup(array) : (sortValues != null
        ? array.sort(sortValues)
        : array); }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map$1(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) { return map; }
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) { array = map.entries(); }
    else { array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); }); }
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
};

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map$1();
}

function setMap(map, key, value) {
  map.set(key, value);
}

function Set$1() {}

var proto = map$1.prototype;

Set$1.prototype = set.prototype = {
  constructor: Set$1,
  has: proto.has,
  add: function(value) {
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
  var set = new Set$1;

  // Copy constructor.
  if (object instanceof Set$1) { object.each(function(value) { set.add(value); }); }

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) { while (++i < n) { set.add(object[i]); } }
    else { while (++i < n) { set.add(f(object[i], i, object)); } }
  }

  return set;
}

var keys = function(map) {
  var keys = [];
  for (var key in map) { keys.push(key); }
  return keys;
};

var array$1 = Array.prototype;

var map$3 = array$1.map;
var slice$1 = array$1.slice;

var implicit = {name: "implicit"};

function ordinal(range) {
  var index = map$1(),
      domain = [],
      unknown = implicit;

  range = range == null ? [] : slice$1.call(range);

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) { return unknown; }
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) { return domain.slice(); }
    domain = [], index = map$1();
    var i = -1, n = _.length, d, key;
    while (++i < n) { if (!index.has(key = (d = _[i]) + "")) { index.set(key, domain.push(d)); } }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice$1.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range$$1 = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range$$1[1] < range$$1[0],
        start = range$$1[reverse - 0],
        stop = range$$1[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) { step = Math.floor(step); }
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) { start = Math.round(start), bandwidth = Math.round(bandwidth); }
    var values = d3Range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = [+_[0], +_[1]], rescale()) : range$$1.slice();
  };

  scale.rangeRound = function(_) {
    return range$$1 = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band()
        .domain(domain())
        .range(range$$1)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return rescale();
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band().paddingInner(1));
}

var define = function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) { prototype[key] = definition[key]; }
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex3 = /^#([0-9a-f]{3})$/;
var reHex6 = /^#([0-9a-f]{6})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

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
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) { r = g = b = NaN; }
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) { o = color(o); }
  if (!o) { return new Rgb; }
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) { h = s = l = NaN; }
  else if (l <= 0 || l >= 1) { h = s = NaN; }
  else if (s <= 0) { h = NaN; }
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) { return new Hsl(o.h, o.s, o.l, o.opacity); }
  if (!(o instanceof Color)) { o = color(o); }
  if (!o) { return new Hsl; }
  if (o instanceof Hsl) { return o; }
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
    if (r === max) { h = (g - b) / s + (g < b) * 6; }
    else if (g === max) { h = (b - r) / s + 2; }
    else { h = (r - g) / s + 4; }
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

var Kn = 18;
var Xn = 0.950470;
var Yn = 1;
var Zn = 1.088830;
var t0 = 4 / 29;
var t1 = 6 / 29;
var t2 = 3 * t1 * t1;
var t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) { return new Lab(o.l, o.a, o.b, o.opacity); }
  if (o instanceof Hcl) {
    var h = o.h * deg2rad;
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof Rgb)) { o = rgbConvert(o); }
  var b = rgb2xyz(o.r),
      a = rgb2xyz(o.g),
      l = rgb2xyz(o.b),
      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
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
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new Rgb(
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) { return new Hcl(o.h, o.c, o.l, o.opacity); }
  if (!(o instanceof Lab)) { o = labConvert(o); }
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
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));

var A = -0.14861;
var B = +1.78277;
var C = -0.29227;
var D = -0.90649;
var E = +1.97294;
var ED = E * D;
var EB = E * B;
var BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) { return new Cubehelix(o.h, o.s, o.l, o.opacity); }
  if (!(o instanceof Rgb)) { o = rgbConvert(o); }
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

var constant$2 = function(x) {
  return function() {
    return x;
  };
};

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear$1(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$2(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant$2(isNaN(a) ? b : a);
}

var interpolateRgb = ((function rgbGamma(y) {
  var color$$1 = gamma(y);

  function rgb$$1(start, end) {
    var r = color$$1((start = rgb(start)).r, (end = rgb(end)).r),
        g = color$$1(start.g, end.g),
        b = color$$1(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$$1.gamma = rgbGamma;

  return rgb$$1;
}))(1);

var array$2 = function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(nb),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) { x[i] = interpolate$1(a[i], b[i]); }
  for (; i < nb; ++i) { c[i] = b[i]; }

  return function(t) {
    for (i = 0; i < na; ++i) { c[i] = x[i](t); }
    return c;
  };
};

var date = function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
};

var interpolateNumber = function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
};

var object$1 = function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") { a = {}; }
  if (b === null || typeof b !== "object") { b = {}; }

  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) { c[k] = i[k](t); }
    return c;
  };
};

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

var interpolateString = function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) { s[i] += bs; } // coalesce with previous string
      else { s[++i] = bs; }
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) { s[i] += bm; } // coalesce with previous string
      else { s[++i] = bm; }
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) { s[i] += bs; } // coalesce with previous string
    else { s[++i] = bs; }
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) { s[(o = q[i]).i] = o.x(t); }
          return s.join("");
        });
};

var interpolate$1 = function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$2(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array$2
      : isNaN(b) ? object$1
      : interpolateNumber)(a, b);
};

var interpolateRound = function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
};

var degrees$1 = 180 / Math.PI;

var identity$4 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

var decompose = function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) { a /= scaleX, b /= scaleX; }
  if (skewX = a * c + b * d) { c -= a * skewX, d -= b * skewX; }
  if (scaleY = Math.sqrt(c * c + d * d)) { c /= scaleY, d /= scaleY, skewX /= scaleY; }
  if (a * d < b * c) { a = -a, b = -b, skewX = -skewX, scaleX = -scaleX; }
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees$1,
    skewX: Math.atan(skewX) * degrees$1,
    scaleX: scaleX,
    scaleY: scaleY
  };
};

var cssNode;
var cssRoot;
var cssView;
var svgNode;

function parseCss(value) {
  if (value === "none") { return identity$4; }
  if (!cssNode) { cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView; }
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) { return identity$4; }
  if (!svgNode) { svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g"); }
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) { return identity$4; }
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
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) { b += 360; } else if (b - a > 180) { a += 360; } // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) { s[(o = q[i]).i] = o.x(t); }
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var rho = Math.SQRT2;
var rho2 = 2;
var rho4 = 4;
var epsilon2$1 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
var interpolateZoom = function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2$1) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    };
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    };
  }

  i.duration = S * 1000;

  return i;
};

function cubehelix$1(hue$$1) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix$$1(start, end) {
      var h = hue$$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix$$1.gamma = cubehelixGamma;

    return cubehelix$$1;
  })(1);
}

cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);

var constant$3 = function(x) {
  return function() {
    return x;
  };
};

var number$1 = function(x) {
  return +x;
};

var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constant$3(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range$$1, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range$$1[0], r1 = range$$1[1];
  if (d1 < d0) { d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0); }
  else { d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1); }
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range$$1, deinterpolate, reinterpolate) {
  var j = Math.min(domain.length, range$$1.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range$$1 = range$$1.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate(range$$1[i], range$$1[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range$$1 = unit,
      interpolate$$1 = interpolate$1,
      clamp = false,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range$$1.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise(domain, range$$1, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate$$1)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise(range$$1, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = map$3.call(_, number$1), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice$1.call(_), rescale()) : range$$1.slice();
  };

  scale.rangeRound = function(_) {
    return range$$1 = slice$1.call(_), interpolate$$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$$1 = _, rescale()) : interpolate$$1;
  };

  return rescale();
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
var formatDecimal = function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) { return null; } // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
};

var exponent = function(x) {
  return x = formatDecimal(Math.abs(x)), x ? x[1] : NaN;
};

var formatGroup = function(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) { g = Math.max(1, width - length); }
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) { break; }
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
};

var formatDefault = function(x, p) {
  x = x.toPrecision(p);

  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (x[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) { i0 = i; } i1 = i; break;
      case "e": break out;
      default: if (i0 > 0) { i0 = 0; } break;
    }
  }

  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
};

var prefixExponent;

var formatPrefixAuto = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) { return x + ""; }
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimal(x, Math.max(0, p + i - 1))[0]; // less than 1y!
};

var formatRounded = function(x, p) {
  var d = formatDecimal(x, p);
  if (!d) { return x + ""; }
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
};

var formatTypes = {
  "": formatDefault,
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

// [[fill]align][sign][symbol][0][width][,][.precision][type]
var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

var formatSpecifier = function(specifier) {
  return new FormatSpecifier(specifier);
};

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) { throw new Error("invalid format: " + specifier); }

  var match,
      fill = match[1] || " ",
      align = match[2] || ">",
      sign = match[3] || "-",
      symbol = match[4] || "",
      zero = !!match[5],
      width = match[6] && +match[6],
      comma = !!match[7],
      precision = match[8] && +match[8].slice(1),
      type = match[9] || "";

  // The "n" type is an alias for ",g".
  if (type === "n") { comma = true, type = "g"; }

  // Map invalid types to the default format.
  else if (!formatTypes[type]) { type = ""; }

  // If zero fill is specified, padding goes after sign and before digits.
  if (zero || (fill === "0" && align === "=")) { zero = true, fill = "0", align = "="; }

  this.fill = fill;
  this.align = align;
  this.sign = sign;
  this.symbol = symbol;
  this.zero = zero;
  this.width = width;
  this.comma = comma;
  this.precision = precision;
  this.type = type;
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + this.type;
};

var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function identity$5(x) {
  return x;
}

var formatLocale = function(locale) {
  var group = locale.grouping && locale.thousands ? formatGroup(locale.grouping, locale.thousands) : identity$5,
      currency = locale.currency,
      decimal = locale.decimal;

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
        type = specifier.type;

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? "%" : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = !type || /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? (type ? 6 : 12)
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Convert negative to positive, and compute the prefix.
        // Note that -0 is not less than 0, but 1 / -0 is!
        var valueNegative = (value < 0 || 1 / value < 0) && (value *= -1, true);

        // Perform the initial formatting.
        value = formatType(value, precision);

        // If the original value was negative, it may be rounded to zero during
        // formatting; treat this as (positive) zero.
        if (valueNegative) {
          i = -1, n = value.length;
          valueNegative = false;
          while (++i < n) {
            if (c = value.charCodeAt(i), (48 < c && c < 58)
                || (type === "x" && 96 < c && c < 103)
                || (type === "X" && 64 < c && c < 71)) {
              valueNegative = true;
              break;
            }
          }
        }

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
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
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) { value = group(value, Infinity); }

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) { value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = ""; }

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": return valuePrefix + value + valueSuffix + padding;
        case "=": return valuePrefix + padding + value + valueSuffix;
        case "^": return padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
      }
      return padding + valuePrefix + value + valueSuffix;
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
};

var locale$1;
var format;
var formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale$1 = formatLocale(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

var precisionFixed = function(step) {
  return Math.max(0, -exponent(Math.abs(step)));
};

var precisionPrefix = function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
};

var precisionRound = function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
};

var tickFormat = function(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = tickStep(start, stop, count == null ? 10 : count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) { specifier.precision = precision; }
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) { specifier.precision = precision - (specifier.type === "e"); }
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) { specifier.precision = precision - (specifier.type === "%") * 2; }
      break;
    }
  }
  return format(specifier);
};

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return tickFormat(domain(), count, specifier);
  };

  scale.nice = function(count) {
    var d = domain(),
        i = d.length - 1,
        n = count == null ? 10 : count,
        start = d[0],
        stop = d[i],
        step = tickStep(start, stop, n);

    if (step) {
      step = tickStep(Math.floor(start / step) * step, Math.ceil(stop / step) * step, n);
      d[0] = Math.floor(start / step) * step;
      d[i] = Math.ceil(stop / step) * step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous(deinterpolateLinear, interpolateNumber);

  scale.copy = function() {
    return copy(scale, linear());
  };

  return linearish(scale);
}

function identity$3() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map$3.call(_, number$1), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity$3().domain(domain);
  };

  return linearish(scale);
}

var nice = function(domain, interval) {
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
};

function deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : constant$3(b);
}

function reinterpolate(a, b) {
  return a < 0
      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log$1() {
  var scale = continuous(deinterpolate, reinterpolate).domain([1, 10]),
      domain = scale.domain,
      base = 10,
      logs = logp(10),
      pows = powp(10);

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) { logs = reflect(logs), pows = reflect(pows); }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) { i = u, u = v, v = i; }

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) { for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) { continue; }
          if (t > v) { break; }
          z.push(t);
        }
      } } else { for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) { continue; }
          if (t > v) { break; }
          z.push(t);
        }
      } }
    } else {
      z = ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) { specifier = base === 10 ? ".0e" : ","; }
    if (typeof specifier !== "function") { specifier = format(specifier); }
    if (count === Infinity) { return specifier; }
    if (count == null) { count = 10; }
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) { i *= base; }
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  scale.copy = function() {
    return copy(scale, log$1().base(base));
  };

  return scale;
}

function raise(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow$1() {
  var exponent = 1,
      scale = continuous(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise(b, exponent) - (a = raise(a, exponent)))
        ? function(x) { return (raise(x, exponent) - a) / b; }
        : constant$3(b);
  }

  function reinterpolate(a, b) {
    b = raise(b, exponent) - (a = raise(a, exponent));
    return function(t) { return raise(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return copy(scale, pow$1().exponent(exponent));
  };

  return linearish(scale);
}

function sqrt$1() {
  return pow$1().exponent(0.5);
}

function quantile$$1() {
  var domain = [],
      range$$1 = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range$$1.length);
    thresholds = new Array(n - 1);
    while (++i < n) { thresholds[i - 1] = threshold(domain, i / n); }
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) { return range$$1[bisectRight(thresholds, x)]; }
  }

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) { return domain.slice(); }
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) { if (d = _[i], d != null && !isNaN(d = +d)) { domain.push(d); } }
    domain.sort(ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice$1.call(_), rescale()) : range$$1.slice();
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile$$1()
        .domain(domain)
        .range(range$$1);
  };

  return scale;
}

function quantize$1() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range$$1 = [0, 1];

  function scale(x) {
    if (x <= x) { return range$$1[bisectRight(domain, x, 0, n)]; }
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) { domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1); }
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range$$1 = slice$1.call(_)).length - 1, rescale()) : range$$1.slice();
  };

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize$1()
        .domain([x0, x1])
        .range(range$$1);
  };

  return linearish(scale);
}

function threshold$1() {
  var domain = [0.5],
      range$$1 = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) { return range$$1[bisectRight(domain, x, 0, n)]; }
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice$1.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range$$1 = slice$1.call(_), n = Math.min(domain.length, range$$1.length - 1), scale) : range$$1.slice();
  };

  scale.invertExtent = function(y) {
    var i = range$$1.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold$1()
        .domain(domain)
        .range(range$$1);
  };

  return scale;
}

var t0$1 = new Date;
var t1$1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) { return range; } // also handles Invalid Date
    do { range.push(new Date(+start)); } while (offseti(start, step), floori(start), start < stop)
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) { while (floori(date), !test(date)) { date.setTime(date - 1); } }
    }, function(date, step) {
      if (date >= date) { while (--step >= 0) { while (offseti(date, 1), !test(date)) {} } } // eslint-disable-line no-empty
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0$1.setTime(+start), t1$1.setTime(+end);
      floori(t0$1), floori(t1$1);
      return Math.floor(count(t0$1, t1$1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) { return null; }
  if (!(k > 1)) { return millisecond; }
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};

var durationSecond$1 = 1e3;
var durationMinute$1 = 6e4;
var durationHour$1 = 36e5;
var durationDay$1 = 864e5;
var durationWeek$1 = 6048e5;

var second = newInterval(function(date) {
  date.setTime(Math.floor(date / durationSecond$1) * durationSecond$1);
}, function(date, step) {
  date.setTime(+date + step * durationSecond$1);
}, function(start, end) {
  return (end - start) / durationSecond$1;
}, function(date) {
  return date.getUTCSeconds();
});

var minute = newInterval(function(date) {
  date.setTime(Math.floor(date / durationMinute$1) * durationMinute$1);
}, function(date, step) {
  date.setTime(+date + step * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date) {
  return date.getMinutes();
});

var hour = newInterval(function(date) {
  var offset = date.getTimezoneOffset() * durationMinute$1 % durationHour$1;
  if (offset < 0) { offset += durationHour$1; }
  date.setTime(Math.floor((+date - offset) / durationHour$1) * durationHour$1 + offset);
}, function(date, step) {
  date.setTime(+date + step * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date) {
  return date.getHours();
});

var day = newInterval(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationDay$1;
}, function(date) {
  return date.getDate() - 1;
});

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute$1) / durationWeek$1;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute$1);
}, function(start, end) {
  return (end - start) / durationMinute$1;
}, function(date) {
  return date.getUTCMinutes();
});

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour$1);
}, function(start, end) {
  return (end - start) / durationHour$1;
}, function(date) {
  return date.getUTCHours();
});

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay$1;
}, function(date) {
  return date.getUTCDate() - 1;
});

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek$1;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
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
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
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
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "S": formatSeconds,
    "U": formatWeekNumberSunday,
    "w": formatWeekdayNumber,
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
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "S": formatUTCSeconds,
    "U": formatUTCWeekNumberSunday,
    "w": formatUTCWeekdayNumber,
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
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "S": parseSeconds,
    "U": parseWeekNumberSunday,
    "w": parseWeekdayNumber,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) { date = new Date(+date); }

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) { c = specifier.charAt(++i); }
          else { pad = c === "e" ? " " : "0"; }
          if (format = formats[c]) { c = format(date, pad); }
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0);
      if (i != string.length) { return null; }

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) { d.H = d.H % 12 + d.p * 12; }

      // Convert day-of-week and week-of-year to day-of-year.
      if ("W" in d || "U" in d) {
        if (!("w" in d)) { d.w = "W" in d ? 1 : 0; }
        var day$$1 = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$$1 + 5) % 7 : d.w + d.U * 7 - (day$$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
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
      if (j >= m) { return -1; }
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) { return -1; }
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
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"};
var numberRe = /^\s*\d+/;
var percentRe = /^%/;
var requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

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
  var map = {}, i = -1, n = names.length;
  while (++i < n) { map[names[i].toLowerCase()] = i; }
  return map;
}

function parseWeekdayNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
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
  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
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

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
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

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d), d), p, 2);
}

function formatWeekdayNumber(d) {
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
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
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

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d), d), p, 2);
}

function formatUTCWeekdayNumber(d) {
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

var locale$2;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$2 = formatLocale$1(definition);
  timeFormat = locale$2.format;
  timeParse = locale$2.parse;
  utcFormat = locale$2.utcFormat;
  utcParse = locale$2.utcParse;
  return locale$2;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : utcParse(isoSpecifier);

var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationMonth = durationDay * 30;
var durationYear = durationDay * 365;

function date$1(t) {
  return new Date(t);
}

function number$2(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format) {
  var scale = continuous(deinterpolateLinear, interpolateNumber),
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

  var tickIntervals = [
    [second$$1,  1,      durationSecond],
    [second$$1,  5,  5 * durationSecond],
    [second$$1, 15, 15 * durationSecond],
    [second$$1, 30, 30 * durationSecond],
    [minute$$1,  1,      durationMinute],
    [minute$$1,  5,  5 * durationMinute],
    [minute$$1, 15, 15 * durationMinute],
    [minute$$1, 30, 30 * durationMinute],
    [  hour$$1,  1,      durationHour  ],
    [  hour$$1,  3,  3 * durationHour  ],
    [  hour$$1,  6,  6 * durationHour  ],
    [  hour$$1, 12, 12 * durationHour  ],
    [   day$$1,  1,      durationDay   ],
    [   day$$1,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month$$1,  1,      durationMonth ],
    [ month$$1,  3,  3 * durationMonth ],
    [  year$$1,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second$$1(date) < date ? formatMillisecond
        : minute$$1(date) < date ? formatSecond
        : hour$$1(date) < date ? formatMinute
        : day$$1(date) < date ? formatHour
        : month$$1(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year$$1(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) { interval = 10; }

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = tickStep(start / durationYear, stop / durationYear, interval);
        interval = year$$1;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = tickStep(start, stop, interval);
        interval = millisecond$$1;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map$3.call(_, number$2)) : domain().map(date$1);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) { t = t0, t0 = t1, t1 = t; }
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(year$$1, month$$1, week, day$$1, hour$$1, minute$$1, second$$1, millisecond$$1, format));
  };

  return scale;
}

var time = function() {
  return calendar(year, month, sunday, day, hour, minute, second, millisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
};

var utcTime = function() {
  return calendar(utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, millisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
};

var colors = function(s) {
  return s.match(/.{6}/g).map(function(x) {
    return "#" + x;
  });
};

var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

var category20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

var category20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

var category20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

var cubehelix$3 = cubehelixLong(cubehelix(300, 0.5, 0.0), cubehelix(-240, 0.5, 1.0));

var warm = cubehelixLong(cubehelix(-100, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var cool = cubehelixLong(cubehelix(260, 0.75, 0.35), cubehelix(80, 1.50, 0.8));

var rainbow = cubehelix();

var rainbow$1 = function(t) {
  if (t < 0 || t > 1) { t -= Math.floor(t); }
  var ts = Math.abs(t - 0.5);
  rainbow.h = 360 * t - 100;
  rainbow.s = 1.5 - 1.5 * ts;
  rainbow.l = 0.8 - 0.9 * ts;
  return rainbow + "";
};

function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));

var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

function sequential(interpolator) {
  var x0 = 0,
      x1 = 1,
      clamp = false;

  function scale(x) {
    var t = (x - x0) / (x1 - x0);
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
  };

  return linearish(scale);
}



var scales = Object.freeze({
	scaleBand: band,
	scalePoint: point,
	scaleIdentity: identity$3,
	scaleLinear: linear,
	scaleLog: log$1,
	scaleOrdinal: ordinal,
	scaleImplicit: implicit,
	scalePow: pow$1,
	scaleSqrt: sqrt$1,
	scaleQuantile: quantile$$1,
	scaleQuantize: quantize$1,
	scaleThreshold: threshold$1,
	scaleTime: time,
	scaleUtc: utcTime,
	schemeCategory10: category10,
	schemeCategory20b: category20b,
	schemeCategory20c: category20c,
	schemeCategory20: category20,
	interpolateCubehelixDefault: cubehelix$3,
	interpolateRainbow: rainbow$1,
	interpolateWarm: warm,
	interpolateCool: cool,
	interpolateViridis: viridis,
	interpolateMagma: magma,
	interpolateInferno: inferno,
	interpolatePlasma: plasma,
	scaleSequential: sequential
});

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

var namespace = function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") { name = name.slice(i + 1); }
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
};

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

var creator = function(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
};

var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

var matcher$1 = matcher;

var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element$1 = document.documentElement;
  if (!("onmouseenter" in element$1)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
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
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) { name = t.slice(i + 1), t = t.slice(0, i); }
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var this$1 = this;

    var on = this.__on;
    if (!on) { return; }
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this$1.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) { on.length = i; }
    else { delete this.__on; }
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var this$1 = this;

    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) { for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this$1.removeEventListener(o.type, o.listener, o.capture);
        this$1.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    } }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) { this.__on = [o]; }
    else { on.push(o); }
  };
}

var selection_on = function(typename, value, capture) {
  var this$1 = this;

  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) { for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    } }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) { capture = false; }
  for (i = 0; i < n; ++i) { this$1.each(on(typenames[i], value, capture)); }
  return this;
};

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}

var sourceEvent = function() {
  var current = event, source;
  while (source = current.sourceEvent) { current = source; }
  return current;
};

var point$1 = function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};

var mouse = function(node) {
  var event = sourceEvent();
  if (event.changedTouches) { event = event.changedTouches[0]; }
  return point$1(node, event);
};

function none() {}

var selector = function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
};

var selection_select = function(select) {
  if (typeof select !== "function") { select = selector(select); }

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) { subnode.__data__ = node.__data__; }
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

function empty() {
  return [];
}

var selectorAll = function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
};

var selection_selectAll = function(select) {
  if (typeof select !== "function") { select = selectorAll(select); }

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
};

var selection_filter = function(match) {
  if (typeof match !== "function") { match = matcher$1(match); }

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
};

var sparse = function(update) {
  return new Array(update.length);
};

var selection_enter = function() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
};

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

var constant$4 = function(x) {
  return function() {
    return x;
  };
};

var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
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
      keyValue;

  // Compute the key for each node.
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
  }

  // Compute the key for each datum.
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
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

var selection_data = function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") { value = constant$4(value); }

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) { i1 = i0 + 1; }
        while (!(next = updateGroup[i1]) && ++i1 < dataLength){  }
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};

var selection_exit = function() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
};

var selection_merge = function(selection) {

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
};

var selection_order = function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) { next.parentNode.insertBefore(node, next); }
        next = node;
      }
    }
  }

  return this;
};

var selection_sort = function(compare) {
  if (!compare) { compare = ascending$1; }

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
};

function ascending$1(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

var selection_call = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};

var selection_nodes = function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
};

var selection_node = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) { return node; }
    }
  }

  return null;
};

var selection_size = function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
};

var selection_empty = function() {
  return !this.node();
};

var selection_each = function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) { callback.call(node, node.__data__, i, group); }
    }
  }

  return this;
};

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) { this.removeAttribute(name); }
    else { this.setAttribute(name, v); }
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) { this.removeAttributeNS(fullname.space, fullname.local); }
    else { this.setAttributeNS(fullname.space, fullname.local, v); }
  };
}

var selection_attr = function(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
};

var window$1 = function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
};

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) { this.style.removeProperty(name); }
    else { this.style.setProperty(name, v, priority); }
  };
}

var selection_style = function(name, value, priority) {
  var node;
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : window$1(node = this.node())
          .getComputedStyle(node, null)
          .getPropertyValue(name);
};

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) { delete this[name]; }
    else { this[name] = v; }
  };
}

var selection_property = function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
};

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
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) { list.add(names[i]); }
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) { list.remove(names[i]); }
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

var selection_classed = function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) { if (!list.contains(names[i])) { return false; } }
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
};

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

var selection_text = function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
};

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

var selection_html = function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
};

function raise$1() {
  if (this.nextSibling) { this.parentNode.appendChild(this); }
}

var selection_raise = function() {
  return this.each(raise$1);
};

function lower() {
  if (this.previousSibling) { this.parentNode.insertBefore(this, this.parentNode.firstChild); }
}

var selection_lower = function() {
  return this.each(lower);
};

var selection_append = function(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
};

function constantNull() {
  return null;
}

var selection_insert = function(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};

function remove() {
  var parent = this.parentNode;
  if (parent) { parent.removeChild(this); }
}

var selection_remove = function() {
  return this.each(remove);
};

var selection_datum = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
};

function dispatchEvent(node, type, params) {
  var window = window$1(node),
      event = window.CustomEvent;

  if (event) {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) { event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail; }
    else { event.initEvent(type, false, false); }
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

var selection_dispatch = function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
};

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
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch
};

var select = function(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
};

var selectAll = function(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
};

var touch = function(node, touches, identifier) {
  if (arguments.length < 3) { identifier = touches, touches = sourceEvent().changedTouches; }

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return point$1(node, touch);
    }
  }

  return null;
};

var tile = function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      tx = (x0 + x1) / 2,
      ty = (y0 + y1) / 2,
      scale = 256,
      zoomDelta = 0;

  function tile() {
    var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
        z0 = Math.round(z + zoomDelta),
        k = Math.pow(2, z - z0 + 8),
        x = tx - scale / 2,
        y = ty - scale / 2,
        tiles = [],
        cols = d3Range(Math.max(0, Math.floor((x0 - x) / k)), Math.max(0, Math.ceil((x1 - x) / k))),
        rows = d3Range(Math.max(0, Math.floor((y0 - y) / k)), Math.max(0, Math.ceil((y1 - y) / k)));

    rows.forEach(function(y) {
      cols.forEach(function(x) {
        tiles.push([x, y, z0]);
      });
    });

    tiles.translate = [x / k, y / k];
    tiles.scale = k;
    return tiles;
  }

  tile.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], tile) : [x1, y1];
  };

  tile.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], tile) : [[x0, y0], [x1, y1]];
  };

  tile.scale = function(_) {
    return arguments.length ? (scale = +_, tile) : scale;
  };

  tile.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], tile) : [tx, ty];
  };

  tile.zoomDelta = function(_) {
    return arguments.length ? (zoomDelta = +_, tile) : zoomDelta;
  };

  return tile;
};

var noop$1 = {value: function() {}};

function dispatch() {
  var arguments$1 = arguments;

  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments$1[i] + "") || (t in _)) { throw new Error("illegal type: " + t); }
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) { name = t.slice(i + 1), t = t.slice(0, i); }
    if (t && !types.hasOwnProperty(t)) { throw new Error("unknown type: " + t); }
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames$1(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) { if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) { return t; } }
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") { throw new Error("invalid callback: " + callback); }
    while (++i < n) {
      if (t = (typename = T[i]).type) { _[t] = set$2(_[t], typename.name, callback); }
      else if (callback == null) { for (t in _) { _[t] = set$2(_[t], typename.name, null); } }
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) { copy[t] = _[t].slice(); }
    return new Dispatch(copy);
  },
  call: function(type, that) {
    var arguments$1 = arguments;

    if ((n = arguments.length - 2) > 0) { for (var args = new Array(n), i = 0, n, t; i < n; ++i) { args[i] = arguments$1[i + 2]; } }
    if (!this._.hasOwnProperty(type)) { throw new Error("unknown type: " + type); }
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) { t[i].value.apply(that, args); }
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) { throw new Error("unknown type: " + type); }
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) { t[i].value.apply(that, args); }
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$2(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop$1, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) { type.push({name: name, value: callback}); }
  return type;
}

var noevent = function() {
  event.preventDefault();
  event.stopImmediatePropagation();
};

var dragDisable = function(view) {
  var root = view.document.documentElement,
      selection$$1 = select(view).on("dragstart.drag", noevent, true);
  if ("onselectstart" in root) {
    selection$$1.on("selectstart.drag", noevent, true);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
};

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection$$1 = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection$$1.on("click.drag", noevent, true);
    setTimeout(function() { selection$$1.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection$$1.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1000;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") { throw new TypeError("callback is not a function"); }
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) { taskTail._next = this; }
      else { taskHead = this; }
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) { t._call.call(null, e); }
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
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) { clockSkew -= delay, clockLast = now; }
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) { time = t1._time; }
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
  if (frame) { return; } // Soonest alarm already set, or will be.
  if (timeout) { timeout = clearTimeout(timeout); }
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) { timeout = setTimeout(wake, delay); }
    if (interval) { interval = clearInterval(interval); }
  } else {
    if (!interval) { interval = setInterval(poke, pokeDelay); }
    frame = 1, setFrame(wake);
  }
}

var timeout$1 = function(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
};

var emptyOn = dispatch("start", "end", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

var schedule = function(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) { node.__transition = {}; }
  else if (id in schedules) { return; }
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
};

function init(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) { throw new Error("too late"); }
  return schedule;
}

function set$3(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) { throw new Error("too late"); }
  return schedule;
}

function get$1(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) { throw new Error("too late"); }
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) { start(elapsed - self.delay); }
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) { return stop(); }

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) { continue; }

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) { return timeout$1(start); }

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout$1(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) { return; } // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
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
      tween[i].call(null, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) { return; } // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

var interrupt = function(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) { return; }

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    if (active) { schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group); }
    delete schedules[i];
  }

  if (empty) { delete node.__transition; }
};

var selection_interrupt = function(name) {
  return this.each(function() {
    interrupt(this, name);
  });
};

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set$3(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
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
  if (typeof value !== "function") { throw new Error; }
  return function() {
    var schedule = set$3(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) { tween1.push(t); }
    }

    schedule.tween = tween1;
  };
}

var transition_tween = function(name, value) {
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
};

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set$3(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get$1(node, id).value[name];
  };
}

var interpolate$2 = function(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
};

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrConstantNS$1(fullname, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function attrFunction$1(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) { return void this.removeAttribute(name); }
    value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS$1(fullname, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) { return void this.removeAttributeNS(fullname.space, fullname.local); }
    value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

var transition_attr = function(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate$2;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS$1 : attrRemove$1)(fullname)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, i, value));
};

function attrTweenNS(fullname, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttribute(name, i(t));
    };
  }
  tween._value = value;
  return tween;
}

var transition_attrTween = function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) { return (key = this.tween(key)) && key._value; }
  if (value == null) { return this.tween(key, null); }
  if (typeof value !== "function") { throw new Error; }
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
};

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

var transition_delay = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get$1(this.node(), id).delay;
};

function durationFunction(id, value) {
  return function() {
    set$3(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set$3(this, id).duration = value;
  };
}

var transition_duration = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get$1(this.node(), id).duration;
};

function easeConstant(id, value) {
  if (typeof value !== "function") { throw new Error; }
  return function() {
    set$3(this, id).ease = value;
  };
}

var transition_ease = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get$1(this.node(), id).ease;
};

var transition_filter = function(match) {
  if (typeof match !== "function") { match = matcher$1(match); }

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
};

var transition_merge = function(transition) {
  if (transition._id !== this._id) { throw new Error; }

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
};

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) { t = t.slice(0, i); }
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set$3;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) { (on1 = (on0 = on).copy()).on(name, listener); }

    schedule.on = on1;
  };
}

var transition_on = function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get$1(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
};

function removeFunction(id) {
  return function() {
    var this$1 = this;

    var parent = this.parentNode;
    for (var i in this$1.__transition) { if (+i !== id) { return; } }
    if (parent) { parent.removeChild(this); }
  };
}

var transition_remove = function() {
  return this.on("end.remove", removeFunction(this._id));
};

var transition_select = function(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") { select$$1 = selector(select$$1); }

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select$$1.call(node, node.__data__, i, group))) {
        if ("__data__" in node) { subnode.__data__ = node.__data__; }
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get$1(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
};

var transition_selectAll = function(select$$1) {
  var name = this._name,
      id = this._id;

  if (typeof select$$1 !== "function") { select$$1 = selectorAll(select$$1); }

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select$$1.call(node, node.__data__, i, group), child, inherit = get$1(node, id), k = 0, l = children.length; k < l; ++k) {
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
};

var Selection$1 = selection.prototype.constructor;

var transition_selection = function() {
  return new Selection$1(this._groups, this._parents);
};

function styleRemove$1(name, interpolate$$1) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = window$1(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, interpolate$$1, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = window$1(this).getComputedStyle(this, null).getPropertyValue(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value1);
  };
}

function styleFunction$1(name, interpolate$$1, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = window$1(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = value(this);
    if (value1 == null) { value1 = (this.style.removeProperty(name), style.getPropertyValue(name)); }
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate$$1(value00 = value0, value10 = value1);
  };
}

var transition_style = function(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate$2;
  return value == null ? this
          .styleTween(name, styleRemove$1(name, i))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, typeof value === "function"
          ? styleFunction$1(name, i, tweenValue(this, "style." + name, value))
          : styleConstant$1(name, i, value), priority);
};

function styleTween(name, value, priority) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.style.setProperty(name, i(t), priority);
    };
  }
  tween._value = value;
  return tween;
}

var transition_styleTween = function(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) { return (key = this.tween(key)) && key._value; }
  if (value == null) { return this.tween(key, null); }
  if (typeof value !== "function") { throw new Error; }
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
};

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

var transition_text = function(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction$1(tweenValue(this, "text", value))
      : textConstant$1(value == null ? "" : value + ""));
};

var transition_transition = function() {
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
};

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
  ease: transition_ease
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var exponent$1 = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent$1);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent$1);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent$1);

var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);

var tau$1 = 2 * Math.PI;
var amplitude = 1;
var period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau$1); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau$1); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau$1);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau$1); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);

var defaultTiming = {
  time: null, // Set on use.
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

var selection_transition = function(name) {
  var id,
      timing;

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
};

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

var constant$6 = function(x) {
  return function() {
    return x;
  };
};

function ZoomEvent(target, type, transform) {
  this.target = target;
  this.type = type;
  this.transform = transform;
}

function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity$6 = new Transform(1, 0, 0);

transform$1.prototype = Transform.prototype;

function transform$1(node) {
  return node.__zoom || identity$6;
}

function nopropagation$1() {
  event.stopImmediatePropagation();
}

var noevent$1 = function() {
  event.preventDefault();
  event.stopImmediatePropagation();
};

// Ignore right-click, since that should open the context menu.
function defaultFilter() {
  return !event.button;
}

function defaultExtent() {
  var e = this, w, h;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    w = e.width.baseVal.value;
    h = e.height.baseVal.value;
  } else {
    w = e.clientWidth;
    h = e.clientHeight;
  }
  return [[0, 0], [w, h]];
}

function defaultTransform() {
  return this.__zoom || identity$6;
}

var zoom = function() {
  var filter = defaultFilter,
      extent = defaultExtent,
      k0 = 0,
      k1 = Infinity,
      x0 = -k1,
      x1 = k1,
      y0 = x0,
      y1 = x1,
      duration = 250,
      interpolate$$1 = interpolateZoom,
      gestures = [],
      listeners = dispatch("start", "zoom", "end"),
      touchstarting,
      touchending,
      touchDelay = 500,
      wheelDelay = 150;

  function zoom(selection$$1) {
    selection$$1
        .on("wheel.zoom", wheeled)
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        .property("__zoom", defaultTransform);
  }

  zoom.transform = function(collection, transform) {
    var selection$$1 = collection.selection ? collection.selection() : collection;
    selection$$1.property("__zoom", defaultTransform);
    if (collection !== selection$$1) {
      schedule(collection, transform);
    } else {
      selection$$1.interrupt().each(function() {
        gesture(this, arguments)
            .start()
            .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
            .end();
      });
    }
  };

  zoom.scaleBy = function(selection$$1, k) {
    zoom.scaleTo(selection$$1, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    });
  };

  zoom.scaleTo = function(selection$$1, k) {
    zoom.transform(selection$$1, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = centroid(e),
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e);
    });
  };

  zoom.translateBy = function(selection$$1, x, y) {
    zoom.transform(selection$$1, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments));
    });
  };

  function scale(transform, k) {
    k = Math.max(k0, Math.min(k1, k));
    return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
  }

  function constrain(transform, extent) {
    var dx0 = transform.invertX(extent[0][0]) - x0,
        dx1 = transform.invertX(extent[1][0]) - x1,
        dy0 = transform.invertY(extent[0][1]) - y0,
        dy1 = transform.invertY(extent[1][1]) - y1;
    return transform.translate(
      dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
      dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
    );
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition$$1, transform, center) {
    transition$$1
        .on("start.zoom", function() { gesture(this, arguments).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args),
              e = extent.apply(that, args),
              p = center || centroid(e),
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate$$1(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) { t = b; } // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args) {
    for (var i = 0, n = gestures.length, g; i < n; ++i) {
      if ((g = gestures[i]).that === that) {
        return g;
      }
    }
    return new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.index = -1;
    this.active = 0;
    this.extent = extent.apply(that, args);
  }

  Gesture.prototype = {
    start: function() {
      if (++this.active === 1) {
        this.index = gestures.push(this) - 1;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") { this.mouse[1] = transform.invert(this.mouse[0]); }
      if (this.touch0 && key !== "touch") { this.touch0[1] = transform.invert(this.touch0[0]); }
      if (this.touch1 && key !== "touch") { this.touch1[1] = transform.invert(this.touch1[0]); }
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        gestures.splice(this.index, 1);
        this.index = -1;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      customEvent(new ZoomEvent(zoom, type, this.that.__zoom), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function wheeled() {
    if (!filter.apply(this, arguments)) { return; }
    var g = gesture(this, arguments),
        t = this.__zoom,
        k = Math.max(k0, Math.min(k1, t.k * Math.pow(2, -event.deltaY * (event.deltaMode ? 120 : 1) / 500))),
        p = mouse(this);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) { return; }

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      interrupt(this);
      g.start();
    }

    noevent$1();
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned() {
    if (touchending || !filter.apply(this, arguments)) { return; }
    var g = gesture(this, arguments),
        v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = mouse(this);

    dragDisable(event.view);
    nopropagation$1();
    g.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g.start();

    function mousemoved() {
      noevent$1();
      g.moved = true;
      g.zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = mouse(g.that), g.mouse[1]), g.extent));
    }

    function mouseupped() {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event.view, g.moved);
      noevent$1();
      g.end();
    }
  }

  function dblclicked() {
    if (!filter.apply(this, arguments)) { return; }
    var t0 = this.__zoom,
        p0 = mouse(this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, arguments));

    noevent$1();
    if (duration > 0) { select(this).transition().duration(duration).call(schedule, t1, p0); }
    else { select(this).call(zoom.transform, t1); }
  }

  function touchstarted() {
    var this$1 = this;

    if (!filter.apply(this, arguments)) { return; }
    var g = gesture(this, arguments),
        touches$$1 = event.changedTouches,
        started,
        n = touches$$1.length, i, t, p;

    nopropagation$1();
    for (i = 0; i < n; ++i) {
      t = touches$$1[i], p = touch(this$1, touches$$1, t.identifier);
      p = [p, this$1.__zoom.invert(p), t.identifier];
      if (!g.touch0) { g.touch0 = p, started = true; }
      else if (!g.touch1) { g.touch1 = p; }
    }

    // If this is a dbltap, reroute to the (optional) dblclick.zoom handler.
    if (touchstarting) {
      touchstarting = clearTimeout(touchstarting);
      if (!g.touch1) {
        g.end();
        p = select(this).on("dblclick.zoom");
        if (p) { p.apply(this, arguments); }
        return;
      }
    }

    if (started) {
      touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      interrupt(this);
      g.start();
    }
  }

  function touchmoved() {
    var this$1 = this;

    var g = gesture(this, arguments),
        touches$$1 = event.changedTouches,
        n = touches$$1.length, i, t, p, l;

    noevent$1();
    if (touchstarting) { touchstarting = clearTimeout(touchstarting); }
    for (i = 0; i < n; ++i) {
      t = touches$$1[i], p = touch(this$1, touches$$1, t.identifier);
      if (g.touch0 && g.touch0[2] === t.identifier) { g.touch0[0] = p; }
      else if (g.touch1 && g.touch1[2] === t.identifier) { g.touch1[0] = p; }
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) { p = g.touch0[0], l = g.touch0[1]; }
    else { return; }
    g.zoom("touch", constrain(translate(t, p, l), g.extent));
  }

  function touchended() {
    var g = gesture(this, arguments),
        touches$$1 = event.changedTouches,
        n = touches$$1.length, i, t;

    nopropagation$1();
    if (touchending) { clearTimeout(touchending); }
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches$$1[i];
      if (g.touch0 && g.touch0[2] === t.identifier) { delete g.touch0; }
      else if (g.touch1 && g.touch1[2] === t.identifier) { delete g.touch1; }
    }
    if (g.touch1 && !g.touch0) { g.touch0 = g.touch1, delete g.touch1; }
    if (!g.touch0) { g.end(); }
  }

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$6(!!_), zoom) : filter;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$6([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (k0 = +_[0], k1 = +_[1], zoom) : [k0, k1];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], zoom) : [[x0, y0], [x1, y1]];
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate$$1 = _, zoom) : interpolate$$1;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  return zoom;
};

var identity$7 = function(x) {
  return x;
};

var transform$2 = function(topology) {
  if ((transform = topology.transform) == null) { return identity$7; }
  var transform,
      x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(point, i) {
    if (!i) { x0 = y0 = 0; }
    point[0] = (x0 += point[0]) * kx + dx;
    point[1] = (y0 += point[1]) * ky + dy;
    return point;
  };
};

var reverse = function(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) { t = array[i], array[i++] = array[j], array[j] = t; }
};

var feature = function(topology, o) {
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature$1(topology, o); })}
      : feature$1(topology, o);
};

function feature$1(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object$2(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object$2(topology, o) {
  var transformPoint = transform$2(topology),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) { points.pop(); }
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k].slice(), k));
    }
    if (i < 0) { reverse(points, n); }
  }

  function point(p) {
    return transformPoint(p.slice());
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) { arc(arcs[i], points); }
    if (points.length < 2) { points.push(points[0].slice()); }
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) { points.push(points[0].slice()); }
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}

var bisect$1 = function(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) { lo = mid + 1; }
    else { hi = mid; }
  }
  return lo;
};

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
var accessor = function(key, def) {
  if (def === void 0) { return function (d) { return d[key]; }; }
  return function (d) { return d[key] === void 0 ? def : d[key]; };
};

/**
    @function isObject
    @desc Detects if a variable is a javascript Object.
    @param {*} item
*/
var isObject = function(item) {
  return item && typeof item === "object" && !Array.isArray(item) && item !== void 0 ? true : false;
};

/**
    @function assign
    @desc A deeply recursive version of `Object.assign`.
    @param {...Object} objects
    @example <caption>this</caption>
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    @example <caption>returns this</caption>
{id: "bar", group: "A", value: 20}
*/
function assign() {
  var objects = [], len = arguments.length;
  while ( len-- ) objects[ len ] = arguments[ len ];


  var target = objects[0];
  var loop = function ( i ) {

    var source = objects[i];

    Object.keys(source).forEach(function (prop) {

      var value = source[prop];

      if (isObject(value)) {

        if (target.hasOwnProperty(prop) && isObject(target[prop])) { target[prop] = assign(target[prop], value); }
        else { target[prop] = value; }

      }
      else if (Array.isArray(value)) {

        if (target.hasOwnProperty(prop) && Array.isArray(target[prop])) {

          var targetArray = target[prop];

          value.forEach(function (sourceItem, itemIndex) {

            if (itemIndex < targetArray.length) {
              var targetItem = targetArray[itemIndex];

              if (Object.is(targetItem, sourceItem)) { return; }

              if (isObject(targetItem) && isObject(sourceItem) || Array.isArray(targetItem) && Array.isArray(sourceItem)) {
                targetArray[itemIndex] = assign(targetItem, sourceItem);
              }
              else { targetArray[itemIndex] = sourceItem; }

            }
            else { targetArray.push(sourceItem); }

          });
        }
        else { target[prop] = value; }

      }
      else { target[prop] = value; }

    });
  };

  for (var i = 1; i < objects.length; i++) loop( i );

  return target;

}

/**
    @function attrize
    @desc Applies each key/value in an object as an attr.
    @param {D3selection} elem The D3 element to apply the styles to.
    @param {Object} attrs An object of key/value attr pairs.
*/
var attrize = function(e, a) {
  if ( a === void 0 ) a = {};

  for (var k in a) { if ({}.hasOwnProperty.call(a, k)) { e.attr(k, a[k]); } }
};

/**
    @function s
    @desc Returns 4 random characters, used for constructing unique identifiers.
    @private
*/
function s() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}


/**
    @class BaseClass
    @desc An abstract class that contains some global methods and functionality.
*/
var BaseClass = function BaseClass() {
  this._on = {};
  this._uuid = "" + (s()) + (s()) + "-" + (s()) + "-" + (s()) + "-" + (s()) + "-" + (s()) + (s()) + (s());
};

/**
    @memberof BaseClass
    @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.
    @param {Object} [*value*]
    @chainable
*/
BaseClass.prototype.config = function config (_) {
    var this$1 = this;

  if (arguments.length) {
    for (var k in _) { if ({}.hasOwnProperty.call(_, k) && k in this$1) { this$1[k](_[k]); } }
    return this;
  }
  else {
    var config = {};
    for (var k$1 in this$1.__proto__) { if (k$1.indexOf("_") !== 0 && !["config", "constructor", "render"].includes(k$1)) { config[k$1] = this$1[k$1](); } }
    return config;
  }
};

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
BaseClass.prototype.on = function on (_, f) {
  return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
};

/**
    @function closest
    @desc Finds the closest numeric value in an array.
    @param {Number} n The number value to use when searching the array.
    @param {Array} arr The array of values to test against.
*/
var closest = function(n, arr) {
  if ( arr === void 0 ) arr = [];

  if (!arr || !(arr instanceof Array) || !arr.length) { return undefined; }
  return arr.reduce(function (prev, curr) { return Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev; });
};

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
var constant$7 = function(value) {
  return function constant() {
    return value;
  };
};

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
var elem = function(selector$$1, p) {

  // overrides default params
  p = Object.assign({}, {
    condition: true,
    enter: {},
    exit: {},
    parent: select("body"),
    transition: transition().duration(0),
    update: {}
  }, p);

  var className = (/\.([^#]+)/g).exec(selector$$1),
        id = (/#([^\.]+)/g).exec(selector$$1),
        tag = (/^([^.^#]+)/g).exec(selector$$1)[1];

  var elem = p.parent.selectAll(selector$$1.includes(":") ? selector$$1.split(":")[1] : selector$$1)
    .data(p.condition ? [null] : []);

  var enter = elem.enter().append(tag).call(attrize, p.enter);

  if (id) { enter.attr("id", id[1]); }
  if (className) { enter.attr("class", className[1]); }

  elem.exit().transition(p.transition).call(attrize, p.exit).remove();

  var update = enter.merge(elem);
  update.transition(p.transition).call(attrize, p.update);

  return update;

};

var _extends$1 = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var consoleLogger = {
  type: 'logger',

  log: function log(args) {
    this._output('log', args);
  },
  warn: function warn(args) {
    this._output('warn', args);
  },
  error: function error(args) {
    this._output('error', args);
  },
  _output: function _output(type, args) {
    if (console && console[type]) { console[type].apply(console, Array.prototype.slice.call(args)); }
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$1(this, Logger);

    this.init(concreteLogger, options);
  }

  Logger.prototype.init = function init(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug === false ? false : true;
  };

  Logger.prototype.setDebug = function setDebug(bool) {
    this.debug = bool;
  };

  Logger.prototype.log = function log() {
    this.forward(arguments, 'log', '', true);
  };

  Logger.prototype.warn = function warn() {
    this.forward(arguments, 'warn', '', true);
  };

  Logger.prototype.error = function error() {
    this.forward(arguments, 'error', '');
  };

  Logger.prototype.deprecate = function deprecate() {
    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
  };

  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) { return; }
    if (typeof args[0] === 'string') { args[0] = prefix + this.prefix + ' ' + args[0]; }
    this.logger[lvl](args);
  };

  Logger.prototype.create = function create(moduleName) {
    var sub = new Logger(this.logger, _extends$1({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));

    return sub;
  };

  // createInstance(options = {}) {
  //   return new Logger(options, callback);
  // }

  return Logger;
}();



var baseLogger = new Logger();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = function () {
	function EventEmitter() {
		_classCallCheck$2(this, EventEmitter);

		this.observers = {};
	}

	EventEmitter.prototype.on = function on(events, listener) {
		var _this = this;

		events.split(' ').forEach(function (event) {
			_this.observers[event] = _this.observers[event] || [];
			_this.observers[event].push(listener);
		});
	};

	EventEmitter.prototype.off = function off(event, listener) {
		var _this2 = this;

		if (!this.observers[event]) {
			return;
		}

		this.observers[event].forEach(function () {
			if (!listener) {
				delete _this2.observers[event];
			} else {
				var index = _this2.observers[event].indexOf(listener);
				if (index > -1) {
					_this2.observers[event].splice(index, 1);
				}
			}
		});
	};

	EventEmitter.prototype.emit = function emit(event) {
		var arguments$1 = arguments;

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments$1[_key];
		}

		if (this.observers[event]) {
			var cloned = [].concat(this.observers[event]);
			cloned.forEach(function (observer) {
				observer.apply(undefined, args);
			});
		}

		if (this.observers['*']) {
			var _cloned = [].concat(this.observers['*']);
			_cloned.forEach(function (observer) {
				var _ref;

				observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
			});
		}
	};

	return EventEmitter;
}();

function makeString(object) {
  if (object == null) { return ''; }
  return '' + object;
}

function copy$1(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) { t[m] = s[m]; }
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (!object) { return {}; }

    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) { object[key] = new Empty(); }
    object = object[key];
  }

  if (!object) { return {}; }
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}

function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) { obj[k] = obj[k].concat(newValue); }
  if (!concat) { obj[k].push(newValue); }
}

function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) { return undefined; }
  return obj[k];
}

function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop in target) {
      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
        if (overwrite) { target[prop] = source[prop]; }
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }return target;
}

function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/* eslint-disable */
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};
/* eslint-enable */

function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  } else {
    return data;
  }
}

var _extends$2 = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults$1(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$1(subClass, superClass); } }

var ResourceStore = function (_EventEmitter) {
  _inherits$1(ResourceStore, _EventEmitter);

  function ResourceStore() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ns: ['translation'], defaultNS: 'translation' };

    _classCallCheck$3(this, ResourceStore);

    var _this = _possibleConstructorReturn$1(this, _EventEmitter.call(this));

    _this.data = data;
    _this.options = options;
    return _this;
  }

  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  };

  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
    var index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  };

  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var keySeparator = options.keySeparator || this.options.keySeparator;
    if (keySeparator === undefined) { keySeparator = '.'; }

    var path = [lng, ns];
    if (key && typeof key !== 'string') { path = path.concat(key); }
    if (key && typeof key === 'string') { path = path.concat(keySeparator ? key.split(keySeparator) : key); }

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }

    return getPath(this.data, path);
  };

  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : { silent: false };

    var keySeparator = this.options.keySeparator;
    if (keySeparator === undefined) { keySeparator = '.'; }

    var path = [lng, ns];
    if (key) { path = path.concat(keySeparator ? key.split(keySeparator) : key); }

    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    setPath(this.data, path, value);

    if (!options.silent) { this.emit('added', lng, ns, key, value); }
  };

  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
    var this$1 = this;

    for (var m in resources) {
      if (typeof resources[m] === 'string') { this$1.addResource(lng, ns, m, resources[m], { silent: true }); }
    }
    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
    var path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }

    this.addNamespaces(ns);

    var pack = getPath(this.data, path) || {};

    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = _extends$2({}, pack, resources);
    }

    setPath(this.data, path, pack);

    this.emit('added', lng, ns, resources);
  };

  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);

    this.emit('removed', lng, ns);
  };

  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  };

  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
    if (!ns) { ns = this.options.defaultNS; }

    // TODO: COMPATIBILITY remove extend in v2.1.0
    if (this.options.compatibilityAPI === 'v1') { return _extends$2({}, this.getResource(lng, ns)); }

    return this.getResource(lng, ns);
  };

  ResourceStore.prototype.toJSON = function toJSON() {
    return this.data;
  };

  return ResourceStore;
}(EventEmitter);

var postProcessor = {

  processors: {},

  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) { value = _this.processors[processor].process(value, key, options, translator); }
    });

    return value;
  }
};

function convertInterpolation(options) {

  options.interpolation = {
    unescapeSuffix: 'HTML'
  };

  options.interpolation.prefix = options.interpolationPrefix || '__';
  options.interpolation.suffix = options.interpolationSuffix || '__';
  options.interpolation.escapeValue = options.escapeInterpolation || false;

  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
  options.interpolation.nestingSuffix = options.reuseSuffix || ')';

  return options;
}

function convertAPIOptions(options) {
  if (options.resStore) { options.resources = options.resStore; }

  if (options.ns && options.ns.defaultNs) {
    options.defaultNS = options.ns.defaultNs;
    options.ns = options.ns.namespaces;
  } else {
    options.defaultNS = options.ns || 'translation';
  }

  if (options.fallbackToDefaultNS && options.defaultNS) { options.fallbackNS = options.defaultNS; }

  options.saveMissing = options.sendMissing;
  options.saveMissingTo = options.sendMissingTo || 'current';
  options.returnNull = options.fallbackOnNull ? false : true;
  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
  options.returnObjects = options.returnObjectTrees;
  options.joinArrays = '\n';

  options.returnedObjectHandler = options.objectTreeKeyHandler;
  options.parseMissingKeyHandler = options.parseMissingKey;
  options.appendNamespaceToMissingKey = true;

  options.nsSeparator = options.nsseparator || ':';
  options.keySeparator = options.keyseparator || '.';

  if (options.shortcutFunction === 'sprintf') {
    options.overloadTranslationOptionHandler = function (args) {
      var values = [];

      for (var i = 1; i < args.length; i++) {
        values.push(args[i]);
      }

      return {
        postProcess: 'sprintf',
        sprintf: values
      };
    };
  }

  options.whitelist = options.lngWhitelist;
  options.preload = options.preload;
  if (options.load === 'current') { options.load = 'currentOnly'; }
  if (options.load === 'unspecific') { options.load = 'languageOnly'; }

  // backend
  options.backend = options.backend || {};
  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
  options.backend.allowMultiLoading = options.dynamicLoad;

  // cache
  options.cache = options.cache || {};
  options.cache.prefix = 'res_';
  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
  options.cache.enabled = options.useLocalStorage ? true : false;

  options = convertInterpolation(options);
  if (options.defaultVariables) { options.interpolation.defaultVariables = options.defaultVariables; }

  // TODO: deprecation
  // if (options.getAsync === false) throw deprecation error

  return options;
}

function convertJSONOptions(options) {
  options = convertInterpolation(options);
  options.joinArrays = '\n';

  return options;
}

function convertTOptions(options) {
  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
    options = convertInterpolation(options);
  }

  options.nsSeparator = options.nsseparator;
  options.keySeparator = options.keyseparator;

  options.returnObjects = options.returnObjectTrees;

  return options;
}

function appendBackwardsAPI(i18n) {
  i18n.lng = function () {
    baseLogger.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
  };

  i18n.preload = function (lngs, cb) {
    baseLogger.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
    i18n.loadLanguages(lngs, cb);
  };

  i18n.setLng = function (lng, options, callback) {
    baseLogger.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options) { options = {}; }

    if (options.fixLng === true) {
      if (callback) { return callback(null, i18n.getFixedT(lng)); }
    }

    i18n.changeLanguage(lng, callback);
  };

  i18n.addPostProcessor = function (name, fc) {
    baseLogger.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
    i18n.use({
      type: 'postProcessor',
      name: name,
      process: fc
    });
  };
}

var _extends$3 = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defaults$2(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$2(subClass, superClass); } }

var Translator = function (_EventEmitter) {
  _inherits$2(Translator, _EventEmitter);

  function Translator(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$4(this, Translator);

    var _this = _possibleConstructorReturn$2(this, _EventEmitter.call(this));

    copy$1(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

    _this.options = options;
    _this.logger = baseLogger.create('translator');
    return _this;
  }

  Translator.prototype.changeLanguage = function changeLanguage(lng) {
    if (lng) { this.language = lng; }
  };

  Translator.prototype.exists = function exists(key) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { interpolation: {} };

    if (this.options.compatibilityAPI === 'v1') {
      options = convertTOptions(options);
    }

    return this.resolve(key, options) !== undefined;
  };

  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
    if (nsSeparator === undefined) { nsSeparator = ':'; }
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    var namespaces = options.ns || this.options.defaultNS;
    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
      var parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) { namespaces = parts.shift(); }
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') { namespaces = [namespaces]; }

    return {
      key: key,
      namespaces: namespaces
    };
  };

  Translator.prototype.translate = function translate(keys) {
    var this$1 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if ((typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) !== 'object') {
      options = this.options.overloadTranslationOptionHandler(arguments);
    } else if (this.options.compatibilityAPI === 'v1') {
      options = convertTOptions(options);
    }

    // non valid keys handling
    if (keys === undefined || keys === null || keys === '') { return ''; }
    if (typeof keys === 'number') { keys = String(keys); }
    if (typeof keys === 'string') { keys = [keys]; }

    // separators
    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

    // get namespace(s)

    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
        key = _extractFromKey.key,
        namespaces = _extractFromKey.namespaces;

    var namespace = namespaces[namespaces.length - 1];

    // return key on CIMode
    var lng = options.lng || this.language;
    var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        var nsSeparator = options.nsSeparator || this.options.nsSeparator;
        return namespace + nsSeparator + key;
      }

      return key;
    }

    // resolve from store
    var res = this.resolve(keys, options);

    var resType = Object.prototype.toString.apply(res);
    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

    // object
    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
      }

      // if we got a separator we loop over children - else we just return object as is
      // as having it set to false means no hierarchy so no lookup for nested values
      if (options.keySeparator || this.options.keySeparator) {
        var copy$$1 = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

        for (var m in res) {
          copy$$1[m] = this$1.translate('' + key + keySeparator + m, _extends$3({ joinArrays: false, ns: namespaces }, options));
        }
        res = copy$$1;
      }
    }
    // array special treatment
    else if (joinArrays && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) { res = this.extendTranslation(res, key, options); }
      }
      // string, empty or null
      else {
          var usedDefault = false,
              usedKey = false;

          // fallback value
          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
            usedDefault = true;
            res = options.defaultValue;
          }
          if (!this.isValidLookup(res)) {
            usedKey = true;
            res = key;
          }

          // save missing
          if (usedKey || usedDefault) {
            this.logger.log('missingKey', lng, namespace, key, res);

            var lngs = [];
            var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
            if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
              for (var i = 0; i < fallbackLngs.length; i++) {
                lngs.push(fallbackLngs[i]);
              }
            } else if (this.options.saveMissingTo === 'all') {
              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
            } else {
              //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
              lngs.push(options.lng || this.language);
            }

            if (this.options.saveMissing) {
              if (this.options.missingKeyHandler) {
                this.options.missingKeyHandler(lngs, namespace, key, res);
              } else if (this.backendConnector && this.backendConnector.saveMissing) {
                this.backendConnector.saveMissing(lngs, namespace, key, res);
              }
            }

            this.emit('missingKey', lngs, namespace, key, res);
          }

          // extend
          res = this.extendTranslation(res, key, options);

          // append namespace if still key
          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) { res = namespace + ':' + key; }

          // parseMissingKeyHandler
          if (usedKey && this.options.parseMissingKeyHandler) { res = this.options.parseMissingKeyHandler(res); }
        }

    // return
    return res;
  };

  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
    var _this2 = this;

    if (options.interpolation) { this.interpolator.init(_extends$3({}, options, { interpolation: _extends$3({}, this.options.interpolation, options.interpolation) })); }

    // interpolate
    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
    if (this.options.interpolation.defaultVariables) { data = _extends$3({}, this.options.interpolation.defaultVariables, data); }
    res = this.interpolator.interpolate(res, data, this.language);

    // nesting
    res = this.interpolator.nest(res, function () {
      var arguments$1 = arguments;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments$1[_key];
      }

      return _this2.translate.apply(_this2, args);
    }, options);

    if (options.interpolation) { this.interpolator.reset(); }

    // post process
    var postProcess = options.postProcess || this.options.postProcess;
    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, options, this);
    }

    return res;
  };

  Translator.prototype.resolve = function resolve(keys) {
    var _this3 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var found = void 0;

    if (typeof keys === 'string') { keys = [keys]; }

    // forEach possible key
    keys.forEach(function (k) {
      if (_this3.isValidLookup(found)) { return; }

      var _extractFromKey2 = _this3.extractFromKey(k, options),
          key = _extractFromKey2.key,
          namespaces = _extractFromKey2.namespaces;

      if (_this3.options.fallbackNS) { namespaces = namespaces.concat(_this3.options.fallbackNS); }

      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

      namespaces.forEach(function (ns) {
        if (_this3.isValidLookup(found)) { return; }

        codes.forEach(function (code) {
          if (_this3.isValidLookup(found)) { return; }

          var finalKey = key;
          var finalKeys = [finalKey];

          var pluralSuffix = void 0;
          if (needsPluralHandling) { pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count); }

          // fallback for plural if context not found
          if (needsPluralHandling && needsContextHandling) { finalKeys.push(finalKey + pluralSuffix); }

          // get key for context if needed
          if (needsContextHandling) { finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context); }

          // get key for plural if needed
          if (needsPluralHandling) { finalKeys.push(finalKey += pluralSuffix); }

          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
          var possibleKey = void 0;
          while (possibleKey = finalKeys.pop()) {
            if (_this3.isValidLookup(found)) { continue; }
            found = _this3.getResource(code, ns, possibleKey, options);
          }
        });
      });
    });

    return found;
  };

  Translator.prototype.isValidLookup = function isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  };

  Translator.prototype.getResource = function getResource(code, ns, key) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    return this.resourceStore.getResource(code, ns, key, options);
  };

  return Translator;
}(EventEmitter);

function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck$5(this, LanguageUtil);

    this.options = options;

    this.whitelist = this.options.whitelist || false;
    this.logger = baseLogger.create('languageUtils');
  }

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (code.indexOf('-') < 0) { return code; }

    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
    var p = code.split('-');
    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
  };

  LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
    if (code.indexOf('-') < 0) { return null; }

    var p = code.split('-');
    if (p.length === 2) { return null; }
    p.pop();
    return this.formatLanguageCode(p.join('-'));
  };

  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
    if (code.indexOf('-') < 0) { return code; }

    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
    var p = code.split('-');
    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
  };

  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      var p = code.split('-');

      if (this.options.lowerCaseLng) {
        p = p.map(function (part) {
          return part.toLowerCase();
        });
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) { p[1] = capitalize(p[1].toLowerCase()); }
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();

        // if lenght 2 guess it's a country
        if (p[1].length === 2) { p[1] = p[1].toUpperCase(); }
        if (p[0] !== 'sgn' && p[2].length === 2) { p[2] = p[2].toUpperCase(); }

        if (specialCases.indexOf(p[1].toLowerCase()) > -1) { p[1] = capitalize(p[1].toLowerCase()); }
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) { p[2] = capitalize(p[2].toLowerCase()); }
      }

      return p.join('-');
    } else {
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  };

  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code, exactMatch) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist && !exactMatch) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
  };

  LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
    if (!fallbacks) { return []; }
    if (typeof fallbacks === 'string') { fallbacks = [fallbacks]; }
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') { return fallbacks; }

    // asume we have an object defining fallbacks
    var found = fallbacks[code];
    if (!found) { found = fallbacks[this.getScriptPartFromCode(code)]; }
    if (!found) { found = fallbacks[this.formatLanguageCode(code)]; }
    if (!found) { found = fallbacks.default; }

    return found || [];
  };

  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
    var _this = this;

    var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);

    var codes = [];
    var addCode = function addCode(code) {
      var exactMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!code) { return; }
      if (_this.isWhitelisted(code, exactMatch)) {
        codes.push(code);
      } else {
        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
      }
    };

    if (typeof code === 'string' && code.indexOf('-') > -1) {
      if (this.options.load !== 'languageOnly') { addCode(this.formatLanguageCode(code), true); }
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') { addCode(this.getScriptPartFromCode(code), true); }
      if (this.options.load !== 'currentOnly') { addCode(this.getLanguagePartFromCode(code)); }
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }

    fallbackCodes.forEach(function (fc) {
      if (codes.indexOf(fc) < 0) { addCode(_this.formatLanguageCode(fc)); }
    });

    return codes;
  };

  return LanguageUtil;
}();

var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
/* eslint-disable */
var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  }
};
/* eslint-enable */

function createRules() {
  var l,
      rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      return rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$6(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;

    this.logger = baseLogger.create('pluralResolver');

    this.rules = createRules();
  }

  PluralResolver.prototype.addRule = function addRule(lng, obj) {
    this.rules[lng] = obj;
  };

  PluralResolver.prototype.getRule = function getRule(code) {
    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  };

  PluralResolver.prototype.needsPlural = function needsPlural(code) {
    var rule = this.getRule(code);

    return rule && rule.numbers.length <= 1 ? false : true;
  };

  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
    var _this = this;

    var rule = this.getRule(code);

    if (rule) {
      var _ret = function () {
        if (rule.numbers.length === 1) { return {
            v: ''
          }; } // only singular

        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];

        // special treatment for lngs only having singular and plural
        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }

        var returnSuffix = function returnSuffix() {
          return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
        };

        // COMPATIBILITY JSON
        // v1
        if (_this.options.compatibilityJSON === 'v1') {
          if (suffix === 1) { return {
              v: ''
            }; }
          if (typeof suffix === 'number') { return {
              v: '_plural_' + suffix.toString()
            }; }
          return {
            v: returnSuffix()
          };
        }
        // v2
        else if (_this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
            return {
              v: returnSuffix()
            };
          }
          // v3 - gettext index
          else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
              return {
                v: returnSuffix()
              };
            }
        return {
          v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof$2(_ret)) === "object") { return _ret.v; }
    } else {
      this.logger.warn('no plural rule found for: ' + code);
      return '';
    }
  };

  return PluralResolver;
}();

function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck$7(this, Interpolator);

    this.logger = baseLogger.create('interpolator');

    this.init(options, true);
  }

  Interpolator.prototype.init = function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var reset = arguments[1];

    if (reset) {
      this.options = options;
      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };
      this.escape = options.interpolation && options.interpolation.escape || escape;
    }
    if (!options.interpolation) { options.interpolation = { escapeValue: true }; }

    var iOpts = options.interpolation;

    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;

    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
    this.formatSeparator = iOpts.formatSeparator ? regexEscape(iOpts.formatSeparator) : iOpts.formatSeparator || ',';

    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');

    // the regexp
    this.resetRegExp();
  };

  Interpolator.prototype.reset = function reset() {
    if (this.options) { this.init(this.options); }
  };

  Interpolator.prototype.resetRegExp = function resetRegExp() {
    // the regexp
    var regexpStr = this.prefix + '(.+?)' + this.suffix;
    this.regexp = new RegExp(regexpStr, 'g');

    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  };

  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
    var this$1 = this;

    var _this = this;

    var match = void 0,
        value = void 0;

    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }

    var handleFormat = function handleFormat(key) {
      if (key.indexOf(_this.formatSeparator) < 0) { return getPath(data, key); }

      var p = key.split(_this.formatSeparator);
      var k = p.shift().trim();
      var f = p.join(_this.formatSeparator).trim();

      return _this.format(getPath(data, k), f, lng);
    };

    this.resetRegExp();

    // unescape if has unescapePrefix/Suffix
    while (match = this.regexpUnescape.exec(str)) {
      var _value = handleFormat(match[1].trim());
      str = str.replace(match[0], _value);
      this$1.regexpUnescape.lastIndex = 0;
    }

    // regular escape on demand
    while (match = this.regexp.exec(str)) {
      value = handleFormat(match[1].trim());
      if (typeof value !== 'string') { value = makeString(value); }
      if (!value) {
        this$1.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      value = this$1.escapeValue ? regexSafe(this$1.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this$1.regexp.lastIndex = 0;
    }
    return str;
  };

  Interpolator.prototype.nest = function nest(str, fc) {
    var this$1 = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var match = void 0,
        value = void 0;

    var clonedOptions = JSON.parse(JSON.stringify(options));
    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

    function handleHasOptions(key) {
      if (key.indexOf(',') < 0) { return key; }

      var p = key.split(',');
      key = p.shift();
      var optionsString = p.join(',');
      optionsString = this.interpolate(optionsString, clonedOptions);
      optionsString = optionsString.replace(/'/g, '"');

      try {
        clonedOptions = JSON.parse(optionsString);
      } catch (e) {
        this.logger.error('failed parsing options string in nesting for key ' + key, e);
      }

      return key;
    }

    // regular escape on demand
    while (match = this.nestingRegexp.exec(str)) {
      value = fc(handleHasOptions.call(this$1, match[1].trim()), clonedOptions);
      if (typeof value !== 'string') { value = makeString(value); }
      if (!value) {
        this$1.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
        value = '';
      }
      // Nested keys should not be escaped by default #854
      // value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
      str = str.replace(match[0], value);
      this$1.regexp.lastIndex = 0;
    }
    return str;
  };

  return Interpolator;
}();

var _extends$4 = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) { break; } } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) { _i["return"](); } } finally { if (_d) { throw _e; } } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defaults$3(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$3(subClass, superClass); } }

function remove$1(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits$3(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck$8(this, Connector);

    var _this = _possibleConstructorReturn$3(this, _EventEmitter.call(this));

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');

    _this.state = {};
    _this.queue = [];

    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
    return _this;
  }

  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
    var _this2 = this;

    // find what needs to be loaded
    var toLoad = [],
        pending = [],
        toLoadLanguages = [],
        toLoadNamespaces = [];

    languages.forEach(function (lng) {
      var hasAllNamespaces = true;

      namespaces.forEach(function (ns) {
        var name = lng + '|' + ns;

        if (_this2.store.hasResourceBundle(lng, ns)) {
          _this2.state[name] = 2; // loaded
        } else if (_this2.state[name] < 0) {
          // nothing to do for err
        } else if (_this2.state[name] === 1) {
          if (pending.indexOf(name) < 0) { pending.push(name); }
        } else {
          _this2.state[name] = 1; // pending

          hasAllNamespaces = false;

          if (pending.indexOf(name) < 0) { pending.push(name); }
          if (toLoad.indexOf(name) < 0) { toLoad.push(name); }
          if (toLoadNamespaces.indexOf(ns) < 0) { toLoadNamespaces.push(ns); }
        }
      });

      if (!hasAllNamespaces) { toLoadLanguages.push(lng); }
    });

    if (toLoad.length || pending.length) {
      this.queue.push({
        pending: pending,
        loaded: {},
        errors: [],
        callback: callback
      });
    }

    return {
      toLoad: toLoad,
      pending: pending,
      toLoadLanguages: toLoadLanguages,
      toLoadNamespaces: toLoadNamespaces
    };
  };

  Connector.prototype.loaded = function loaded(name, err, data) {
    var _this3 = this;

    var _name$split = name.split('|'),
        _name$split2 = _slicedToArray(_name$split, 2),
        lng = _name$split2[0],
        ns = _name$split2[1];

    if (err) { this.emit('failedLoading', lng, ns, err); }

    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }

    // set loaded
    this.state[name] = err ? -1 : 2;
    // callback if ready
    this.queue.forEach(function (q) {
      pushPath(q.loaded, [lng], ns);
      remove$1(q.pending, name);

      if (err) { q.errors.push(err); }

      if (q.pending.length === 0 && !q.done) {
        _this3.emit('loaded', q.loaded);
        q.errors.length ? q.callback(q.errors) : q.callback();
        q.done = true;
      }
    });

    // remove done load requests
    this.queue = this.queue.filter(function (q) {
      return !q.done;
    });
  };

  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
    var _this4 = this;

    if (!tried) { tried = 0; }
    if (!wait) { wait = 250; }

    if (!lng.length) { return callback(null, {}); } // noting to load

    this.backend[fcName](lng, ns, function (err, data) {
      if (err && data /* = retryFlag */ && tried < 5) {
        setTimeout(function () {
          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    });
  };

  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this5 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    var options = _extends$4({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') { languages = this.services.languageUtils.toResolveHierarchy(languages); }
    if (typeof namespaces === 'string') { namespaces = [namespaces]; }

    var toLoad = this.queueLoad(languages, namespaces, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) { callback(); } // nothing to load and no pendings...callback now
      return; // pendings will trigger callback
    }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
        if (err) { _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err); }
        if (!err && data) { _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data); }

        toLoad.toLoad.forEach(function (name) {
          var _name$split3 = name.split('|'),
              _name$split4 = _slicedToArray(_name$split3, 2),
              l = _name$split4[0],
              n = _name$split4[1];

          var bundle = getPath(data, [l, n]);
          if (bundle) {
            _this5.loaded(name, err, bundle);
          } else {
            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
            _this5.loaded(name, _err);
            _this5.logger.error(_err);
          }
        });
      });
    }

    // load one by one
    else {
        (function () {
          var readOne = function readOne(name) {
            var _this6 = this;

            var _name$split5 = name.split('|'),
                _name$split6 = _slicedToArray(_name$split5, 2),
                lng = _name$split6[0],
                ns = _name$split6[1];

            this.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) { _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err); }
              if (!err && data) { _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data); }

              _this6.loaded(name, err, data);
            });
          };

          

          toLoad.toLoad.forEach(function (name) {
            readOne.call(_this5, name);
          });
        })();
      }
  };

  Connector.prototype.reload = function reload(languages, namespaces) {
    var _this7 = this;

    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
    }
    var options = _extends$4({}, this.backend.options, this.options.backend);

    if (typeof languages === 'string') { languages = this.services.languageUtils.toResolveHierarchy(languages); }
    if (typeof namespaces === 'string') { namespaces = [namespaces]; }

    // load with multi-load
    if (options.allowMultiLoading && this.backend.readMulti) {
      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
        if (err) { _this7.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err); }
        if (!err && data) { _this7.logger.log('reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data); }

        languages.forEach(function (l) {
          namespaces.forEach(function (n) {
            var bundle = getPath(data, [l, n]);
            if (bundle) {
              _this7.loaded(l + '|' + n, err, bundle);
            } else {
              var _err2 = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
              _this7.loaded(l + '|' + n, _err2);
              _this7.logger.error(_err2);
            }
          });
        });
      });
    }

    // load one by one
    else {
        (function () {
          var readOne = function readOne(name) {
            var _this8 = this;

            var _name$split7 = name.split('|'),
                _name$split8 = _slicedToArray(_name$split7, 2),
                lng = _name$split8[0],
                ns = _name$split8[1];

            this.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) { _this8.logger.warn('reloading namespace ' + ns + ' for language ' + lng + ' failed', err); }
              if (!err && data) { _this8.logger.log('reloaded namespace ' + ns + ' for language ' + lng, data); }

              _this8.loaded(name, err, data);
            });
          };

          

          languages.forEach(function (l) {
            namespaces.forEach(function (n) {
              readOne.call(_this7, l + '|' + n);
            });
          });
        })();
      }
  };

  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
    if (this.backend && this.backend.create) { this.backend.create(languages, namespace, key, fallbackValue); }

    // write to store to avoid resending
    if (!languages || !languages[0]) { return; }
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  };

  return Connector;
}(EventEmitter);

var _extends$5 = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults$4(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$4(subClass, superClass); } }

var Connector$1 = function (_EventEmitter) {
  _inherits$4(Connector, _EventEmitter);

  function Connector(cache, store, services) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck$9(this, Connector);

    var _this = _possibleConstructorReturn$4(this, _EventEmitter.call(this));

    _this.cache = cache;
    _this.store = store;
    _this.services = services;
    _this.options = options;
    _this.logger = baseLogger.create('cacheConnector');

    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
    return _this;
  }

  Connector.prototype.load = function load(languages, namespaces, callback) {
    var _this2 = this;

    if (!this.cache) { return callback && callback(); }
    var options = _extends$5({}, this.cache.options, this.options.cache);

    if (typeof languages === 'string') { languages = this.services.languageUtils.toResolveHierarchy(languages); }
    if (typeof namespaces === 'string') { namespaces = [namespaces]; }

    if (options.enabled) {
      this.cache.load(languages, function (err, data) {
        if (err) { _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err); }
        if (data) {
          for (var l in data) {
            for (var n in data[l]) {
              if (n === 'i18nStamp') { continue; }
              var bundle = data[l][n];
              if (bundle) { _this2.store.addResourceBundle(l, n, bundle); }
            }
          }
        }
        if (callback) { callback(); }
      });
    } else {
      if (callback) { callback(); }
    }
  };

  Connector.prototype.save = function save() {
    if (this.cache && this.options.cache && this.options.cache.enabled) { this.cache.save(this.store.data); }
  };

  return Connector;
}(EventEmitter);

function get$2() {
  return {
    debug: false,
    initImmediate: true,

    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false, // string or array of namespaces

    whitelist: false, // array with whitelisted languages
    nonExplicitWhitelist: false,
    load: 'all', // | currentOnly | languageOnly
    preload: false, // array with preload languages

    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',

    saveMissing: false, // enable to send missing values
    saveMissingTo: 'fallback', // 'current' || 'all'
    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

    postProcess: false, // string or array of postProcessor names
    returnNull: true, // allows null value as valid translation
    returnEmptyString: true, // allows empty string value as valid translation
    returnObjects: false,
    joinArrays: false, // or string to join array
    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
      return { defaultValue: args[1] };
    },

    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      // prefixEscaped: '{{',
      // suffixEscaped: '}}',
      // unescapeSuffix: '',
      unescapePrefix: '-',

      nestingPrefix: '$t(',
      nestingSuffix: ')',
      // nestingPrefixEscaped: '$t(',
      // nestingSuffixEscaped: ')',
      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
    }
  };
}

function transformOptions(options) {
  // create namespace object if namespace is passed in as string
  if (typeof options.ns === 'string') { options.ns = [options.ns]; }
  if (typeof options.fallbackLng === 'string') { options.fallbackLng = [options.fallbackLng]; }
  if (typeof options.fallbackNS === 'string') { options.fallbackNS = [options.fallbackNS]; }

  // extend whitelist with cimode
  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) { options.whitelist.push('cimode'); }

  return options;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) { Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } }

function noop$2() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {};

    if (callback && !_this.isInitialized && !options.isClone) { _this.init(options, callback); }
    return _this;
  }

  I18n.prototype.init = function init(options, callback) {
    var _this2 = this;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options) { options = {}; }

    if (options.compatibilityAPI === 'v1') {
      this.options = _extends({}, get$2(), transformOptions(convertAPIOptions(options)), {});
    } else if (options.compatibilityJSON === 'v1') {
      this.options = _extends({}, get$2(), transformOptions(convertJSONOptions(options)), {});
    } else {
      this.options = _extends({}, get$2(), this.options, transformOptions(options));
    }
    if (!callback) { callback = noop$2; }

    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) { return; }
      if (typeof ClassOrObject === 'function') { return new ClassOrObject(); }
      return ClassOrObject;
    }

    // init services
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }

      var lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);

      var s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.resourceStore.on('added removed', function (lng, ns) {
        s.cacheConnector.save();
      });
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
      s.interpolator = new Interpolator(this.options);

      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.backendConnector.on('*', function (event) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      s.backendConnector.on('loaded', function (loaded) {
        s.cacheConnector.save();
      });

      s.cacheConnector = new Connector$1(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
      // pipe events from backendConnector
      s.cacheConnector.on('*', function (event) {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments$1[_key2];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });

      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        s.languageDetector.init(s, this.options.detection, this.options);
      }

      this.translator = new Translator(this.services, this.options);
      // pipe events from translator
      this.translator.on('*', function (event) {
        var arguments$1 = arguments;

        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments$1[_key3];
        }

        _this2.emit.apply(_this2, [event].concat(args));
      });
    }

    // append api
    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
    storeApi.forEach(function (fcName) {
      _this2[fcName] = function () {
        return this.store[fcName].apply(this.store, arguments);
      };
    });

    // TODO: COMPATIBILITY remove this
    if (this.options.compatibilityAPI === 'v1') { appendBackwardsAPI(this); }

    var load = function load() {
      _this2.changeLanguage(_this2.options.lng, function (err, t) {
        _this2.isInitialized = true;
        _this2.logger.log('initialized', _this2.options);
        _this2.emit('initialized', _this2.options);

        callback(err, t);
      });
    };

    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }

    return this;
  };

  I18n.prototype.loadResources = function loadResources() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop$2;

    if (!this.options.resources) {
      var _ret = function () {
        if (_this3.language && _this3.language.toLowerCase() === 'cimode') { return {
            v: callback()
          }; } // avoid loading resources for cimode

        var toLoad = [];

        var append = function append(lng) {
          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) { toLoad.push(l); }
          });
        };

        append(_this3.language);

        if (_this3.options.preload) {
          _this3.options.preload.forEach(function (l) {
            append(l);
          });
        }

        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
        });
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") { return _ret.v; }
    } else {
      callback(null);
    }
  };

  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
    if (!lngs) { lngs = this.languages; }
    if (!ns) { ns = this.options.ns; }
    this.services.backendConnector.reload(lngs, ns);
  };

  I18n.prototype.use = function use(module) {
    if (module.type === 'backend') {
      this.modules.backend = module;
    }

    if (module.type === 'cache') {
      this.modules.cache = module;
    }

    if (module.type === 'logger' || module.log && module.warn && module.warn) {
      this.modules.logger = module;
    }

    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }

    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }

    return this;
  };

  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
    var _this4 = this;

    var done = function done(err) {
      if (lng) {
        _this4.emit('languageChanged', lng);
        _this4.logger.log('languageChanged', lng);
      }

      if (callback) { callback(err, function () {
        var arguments$1 = arguments;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments$1[_key4];
        }

        return _this4.t.apply(_this4, args);
      }); }
    };

    if (!lng && this.services.languageDetector) { lng = this.services.languageDetector.detect(); }

    if (lng) {
      this.language = lng;
      this.languages = this.services.languageUtils.toResolveHierarchy(lng);

      this.translator.changeLanguage(lng);

      if (this.services.languageDetector) { this.services.languageDetector.cacheUserLanguage(lng); }
    }

    this.loadResources(function (err) {
      done(err);
    });
  };

  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
    var _this5 = this;

    var fixedT = function fixedT(key) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var options = _extends({}, opts);
      options.lng = options.lng || fixedT.lng;
      options.ns = options.ns || fixedT.ns;
      return _this5.t(key, options);
    };
    fixedT.lng = lng;
    fixedT.ns = ns;
    return fixedT;
  };

  I18n.prototype.t = function t() {
    return this.translator && this.translator.translate.apply(this.translator, arguments);
  };

  I18n.prototype.exists = function exists() {
    return this.translator && this.translator.exists.apply(this.translator, arguments);
  };

  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  };

  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
    var _this6 = this;

    if (!this.options.ns) { return callback && callback(); }
    if (typeof ns === 'string') { ns = [ns]; }

    ns.forEach(function (n) {
      if (_this6.options.ns.indexOf(n) < 0) { _this6.options.ns.push(n); }
    });

    this.loadResources(callback);
  };

  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
    if (typeof lngs === 'string') { lngs = [lngs]; }
    var preloaded = this.options.preload || [];

    var newLngs = lngs.filter(function (lng) {
      return preloaded.indexOf(lng) < 0;
    });
    // Exit early if all given languages are already preloaded
    if (!newLngs.length) { return callback(); }

    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(callback);
  };

  I18n.prototype.dir = function dir(lng) {
    if (!lng) { lng = this.language; }
    if (!lng) { return 'rtl'; }

    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
  };

  I18n.prototype.createInstance = function createInstance() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments[1];

    return new I18n(options, callback);
  };

  I18n.prototype.cloneInstance = function cloneInstance() {
    var _this7 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$2;

    var mergedOptions = _extends({}, options, this.options, { isClone: true });
    var clone = new I18n(mergedOptions, callback);
    var membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(function (m) {
      clone[m] = _this7[m];
    });
    clone.translator = new Translator(clone.services, clone.options);
    clone.translator.on('*', function (event) {
      var arguments$1 = arguments;

      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments$1[_key5];
      }

      clone.emit.apply(clone, [event].concat(args));
    });
    clone.init(mergedOptions, callback);

    return clone;
  };

  return I18n;
}(EventEmitter);

var i18next$1 = new I18n();

var Back = "Back";
var Total = "Total";
var array$3 = {"lowercase":["a","an","and","as","at","but","by","for","from","if","in","into","near","nor","of","on","onto","or","per","that","the","to","with","via","vs","vs."],"uppercase":["CEO","CFO","CNC","COO","CPU","GDP","HVAC","ID","IT","R&D","TV","UI"]};
var enUS = {
	Back: Back,
	Total: Total,
	array: array$3
};

var Back$1 = "Atrás";
var Total$1 = "Total";
var array$4 = {"lowercase":["una","y","en","pero","en","de","o","el","la","los","las","para","a","con"],"uppercase":["CEO","CFO","CNC","COO","CPU","PIB","HVAC","ID","TI","I&D","TV","UI"]};
var esES = {
	Back: Back$1,
	Total: Total$1,
	array: array$4
};

var locale$3 = i18next$1.init({
  fallbackLng: "en-US",
  initImmediate: false,
  resources: {
    "en-US": {translation: enUS},
    "es-ES": {translation: esES}
  }
});

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
function objectMerge(objects, aggs) {
  if ( aggs === void 0 ) aggs = {};


  var availableKeys = new Set(merge(objects.map(function (o) { return keys(o); }))),
        newObject = {};

  availableKeys.forEach(function (k) {
    var values$$1 = objects.map(function (o) { return o[k]; });
    var value;
    if (aggs[k]) { value = aggs[k](values$$1); }
    else {
      var types = values$$1.map(function (v) { return v || v === false ? v.constructor : v; }).filter(function (v) { return v !== void 0; });
      if (!types.length) { value = undefined; }
      else if (types.indexOf(Array) >= 0) {
        value = merge(values$$1.map(function (v) { return v instanceof Array ? v : [v]; }));
        value = Array.from(new Set(value));
        if (value.length === 1) { value = value[0]; }
      }
      else if (types.indexOf(String) >= 0) {
        value = Array.from(new Set(values$$1));
        if (value.length === 1) { value = value[0]; }
      }
      else if (types.indexOf(Number) >= 0) { value = sum(values$$1); }
      else if (types.indexOf(Object) >= 0) { value = objectMerge(values$$1.filter(function (v) { return v; })); }
      else {
        value = Array.from(new Set(values$$1.filter(function (v) { return v !== void 0; })));
        if (value.length === 1) { value = value[0]; }
      }
    }
    newObject[k] = value;
  });

  return newObject;

}

/**
    @function prefix
    @desc Returns the appropriate CSS vendor prefix, given the current browser.
*/
var prefix$1 = function() {
  if ("-webkit-transform" in document.body.style) { return "-webkit-"; }
  else if ("-moz-transform" in document.body.style) { return "-moz-"; }
  else if ("-ms-transform" in document.body.style) { return "-ms-"; }
  else if ("-o-transform" in document.body.style) { return "-o-"; }
  else { return ""; }
};

/**
    @function stylize
    @desc Applies each key/value in an object as a style.
    @param {D3selection} elem The D3 element to apply the styles to.
    @param {Object} styles An object of key/value style pairs.
*/
var stylize = function(e, s) {
  if ( s === void 0 ) s = {};

  for (var k in s) { if ({}.hasOwnProperty.call(s, k)) { e.style(k, s[k]); } }
};

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
var Image = function Image() {
  this._duration = 600;
  this._height = accessor("height");
  this._id = accessor("id");
  this._pointerEvents = constant$7("auto");
  this._select;
  this._url = accessor("url");
  this._width = accessor("width");
  this._x = accessor("x", 0);
  this._y = accessor("y", 0);
};

/**
    @memberof Image
    @desc Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.
    @param {Function} [*callback*]
    @chainable
*/
Image.prototype.render = function render (callback) {
    var this$1 = this;


  if (this._select === void 0) { this.select(select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node()); }

  var images = this._select.selectAll(".d3plus-Image").data(this._data, this._id);

  var enter = images.enter().append("image")
    .attr("class", "d3plus-Image")
    .attr("opacity", 0)
    .attr("width", 0)
    .attr("height", 0)
    .attr("x", function (d, i) { return this$1._x(d, i) + this$1._width(d, i) / 2; })
    .attr("y", function (d, i) { return this$1._y(d, i) + this$1._height(d, i) / 2; });

  var t = transition().duration(this._duration),
        that = this,
        update = enter.merge(images);

  update
      .attr("xlink:href", this._url)
      .style("pointer-events", this._pointerEvents)
    .transition(t)
      .attr("opacity", 1)
      .attr("width", function (d, i) { return this$1._width(d, i); })
      .attr("height", function (d, i) { return this$1._height(d, i); })
      .attr("x", function (d, i) { return this$1._x(d, i); })
      .attr("y", function (d, i) { return this$1._y(d, i); })
      .each(function(d, i) {
        var image = select(this), link = that._url(d, i);
        var fullAddress = link.indexOf("http://") === 0 || link.indexOf("https://") === 0;
        if (!fullAddress || link.indexOf(window.location.hostname) === 0) {
          var img = new Image();
          img.src = link;
          img.crossOrigin = "Anonymous";
          img.onload = function() {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var context = canvas.getContext("2d");
            context.drawImage(this, 0, 0);
            image.attr("xlink:href", canvas.toDataURL("image/png"));
          };
        }
      });

  images.exit().transition(t)
    .attr("width", function (d, i) { return this$1._width(d, i); })
    .attr("height", function (d, i) { return this$1._height(d, i); })
    .attr("x", function (d, i) { return this$1._x(d, i); })
    .attr("y", function (d, i) { return this$1._y(d, i); })
    .attr("opacity", 0).remove();

  if (callback) { setTimeout(callback, this._duration + 100); }

  return this;

};

/**
    @memberof Image
    @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
    @param {Array} [*data* = []]
    @chainable
*/
Image.prototype.data = function data (_) {
  return arguments.length ? (this._data = _, this) : this._data;
};

/**
    @memberof Image
    @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
    @param {Number} [*ms* = 600]
    @chainable
*/
Image.prototype.duration = function duration (_) {
  return arguments.length ? (this._duration = _, this) : this._duration;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
    @param {Function|Number} [*value*]
    @chainable
    @example
function(d) {
return d.height;
}
*/
Image.prototype.height = function height (_) {
  return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$7(_), this) : this._height;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
    @param {Function} [*value*]
    @chainable
    @example
function(d) {
return d.id;
}
*/
Image.prototype.id = function id (_) {
  return arguments.length ? (this._id = _, this) : this._id;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current pointer-events accessor.
    @param {Function|String} [*value* = "auto"]
    @chainable
*/
Image.prototype.pointerEvents = function pointerEvents (_) {
  return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$7(_), this) : this._pointerEvents;
};

/**
    @memberof Image
    @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
    @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
    @chainable
*/
Image.prototype.select = function select$1 (_) {
  return arguments.length ? (this._select = select(_), this) : this._select;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the URL accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current URL accessor.
    @param {Function} [*value*]
    @chainable
    @example
function(d) {
return d.url;
}
*/
Image.prototype.url = function url (_) {
  return arguments.length ? (this._url = _, this) : this._url;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
    @param {Function|Number} [*value*]
    @chainable
    @example
function(d) {
return d.width;
}
*/
Image.prototype.width = function width (_) {
  return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$7(_), this) : this._width;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
    @param {Function|Number} [*value*]
    @chainable
    @example
function(d) {
return d.x || 0;
}
*/
Image.prototype.x = function x (_) {
  return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$7(_), this) : this._x;
};

/**
    @memberof Image
    @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
    @param {Function|Number} [*value*]
    @chainable
    @example
function(d) {
return d.y || 0;
}
*/
Image.prototype.y = function y (_) {
  return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$7(_), this) : this._y;
};

/**
    @function colorAdd
    @desc Adds two colors together.
    @param {String} c1 The first color, a valid CSS color string.
    @param {String} c2 The second color, also a valid CSS color string.
    @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
    @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
    @returns {String}
*/

/**
    @module {Object} colorDefaults
    @desc A set of default color values used when assigning colors based on data.
      *
      * | Name | Default | Description |
      * |---|---|---|
      * | dark | #444444 | Used in the [contrast](#contrast) function when the color given is very light. |
      * | light | #f7f7f7 | Used in the [contrast](#contrast) function when the color given is very dark. |
      * | missing | #cccccc | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
      * | off | #b22200 | Used in the [assign](#assign) function when the value passed is `false`. |
      * | on | #224f20 | Used in the [assign](#assign) function when the value passed is `true`. |
      * | scale | `scale.ordinal().range([ "#b22200", "#eace3f", "#282f6b", "#b35c1e", "#224f20", "#5f487c", "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8", "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"])` | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |
*/
var defaults = {
  dark: "#444444",
  light: "#f7f7f7",
  missing: "#cccccc",
  off: "#b22200",
  on: "#224f20",
  scale: ordinal().range([
    "#b22200", "#282f6b", "#eace3f", "#b35c1e", "#224f20", "#5f487c",
    "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8",
    "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"
  ])
};

/**
    Returns a color based on a key, whether it is present in a user supplied object or in the default object.
    @returns {String}
    @private
*/
function getColor(k, u) {
  if ( u === void 0 ) u = {};

  return k in u ? u[k] : k in defaults ? defaults[k] : defaults.missing;
}

/**
    @function colorAssign
    @desc Assigns a color to a value using a predefined set of defaults.
    @param {String} c A valid CSS color string.
    @param {Object} [u = defaults] An object containing overrides of the default colors.
    @returns {String}
*/
var colorAssign = function(c, u) {
  if ( u === void 0 ) u = {};


  // If the value is null or undefined, set to grey.
  if ([null, void 0].indexOf(c) >= 0) { return getColor("missing", u); }
  // Else if the value is true, set to green.
  else if (c === true) { return getColor("on", u); }
  // Else if the value is false, set to red.
  else if (c === false) { return getColor("off", u); }

  var p = color(c);
  // If the value is not a valid color string, use the color scale.
  if (!p) { return getColor("scale", u)(c); }

  return c.toString();

};

/**
    @function colorContrast
    @desc A set of default color values used when assigning colors based on data.
    @param {String} c A valid CSS color string.
    @param {Object} [u = defaults] An object containing overrides of the default colors.
    @returns {String}
*/
var colorContrast = function(c, u) {
  if ( u === void 0 ) u = {};

  c = rgb(c);
  var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
  return yiq >= 128 ? getColor("dark", u) : getColor("light", u);
};

/**
    @function colorLegible
    @desc Darkens a color so that it will appear legible on a white background.
    @param {String} c A valid CSS color string.
    @returns {String}
*/

/**
    @function colorLighter
    @desc Similar to d3.color.brighter, except that this also reduces saturation so that colors don't appear neon.
    @param {String} c A valid CSS color string.
    @param {String} [i = 0.5] A value from 0 to 1 dictating the strength of the function.
    @returns {String}
*/

/**
    @function colorSubtract
    @desc Subtracts one color from another.
    @param {String} c1 The base color, a valid CSS color string.
    @param {String} c2 The color to remove from the base color, also a valid CSS color string.
    @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
    @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
    @returns {String}
*/

/**
    @function textWidth
    @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
    @param {String|Array} text Can be either a single string or an array of strings to analyze.
    @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
*/
var textWidth = function(text, style) {

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
  font.push(typeof style["font-size"] === "string" ? style["font-size"] : ((style["font-size"]) + "px"));
  // let s = `${style["font-size"]}px`;
  // if ("line-height" in style) s += `/${style["line-height"]}px`;
  // font.push(s);
  font.push(style["font-family"]);

  context.font = font.join(" ");

  if (text instanceof Array) { return text.map(function (t) { return context.measureText(t).width; }); }
  return context.measureText(text).width;

};

/**
    @function stringify
    @desc Coerces value into a String.
    @param {String} value
*/
var stringify = function(value) {
  if (value === void 0) { value = "undefined"; }
  else if (!(typeof value === "string" || value instanceof String)) { value = JSON.stringify(value); }
  return value;
};

// great unicode list: http://asecuritysite.com/coding/asc2

var diacritics = [
  [/[\300-\305]/g, "A"], [/[\340-\345]/g, "a"],
  [/[\306]/g, "AE"], [/[\346]/g, "ae"],
  [/[\337]/g, "B"],
  [/[\307]/g, "C"], [/[\347]/g, "c"],
  [/[\320\336\376]/g, "D"], [/[\360]/g, "d"],
  [/[\310-\313]/g, "E"], [/[\350-\353]/g, "e"],
  [/[\314-\317]/g, "I"], [/[\354-\357]/g, "i"],
  [/[\321]/g, "N"], [/[\361]/g, "n"],
  [/[\322-\326\330]/g, "O"], [/[\362-\366\370]/g, "o"],
  [/[\331-\334]/g, "U"], [/[\371-\374]/g, "u"],
  [/[\327]/g, "x"],
  [/[\335]/g, "Y"], [/[\375\377]/g, "y"]
];

/**
    @function strip
    @desc Removes all non ASCII characters from a string.
    @param {String} value
*/
var strip = function(value) {

  return ("" + value).replace(/[^A-Za-z0-9\-_]/g, function (char) {

    if (char === " ") { return "-"; }

    var ret = false;
    for (var d = 0; d < diacritics.length; d++) {
      if (new RegExp(diacritics[d][0]).test(char)) {
        ret = diacritics[d][1];
        break;
      }
    }

    return ret || "";

  });
};

// scraped from http://www.fileformat.info/info/unicode/category/Mc/list.htm
// and http://www.fileformat.info/info/unicode/category/Mn/list.htm
// JSON.stringify([].slice.call(document.getElementsByClassName("table-list")[0].getElementsByTagName("tr")).filter(function(d){ return d.getElementsByTagName("a").length && d.getElementsByTagName("a")[0].innerHTML.length === 6; }).map(function(d){ return d.getElementsByTagName("a")[0].innerHTML.replace("U", "u").replace("+", ""); }).sort());
var a = ["u0903", "u093B", "u093E", "u093F", "u0940", "u0949", "u094A", "u094B", "u094C", "u094E", "u094F", "u0982", "u0983", "u09BE", "u09BF", "u09C0", "u09C7", "u09C8", "u09CB", "u09CC", "u09D7", "u0A03", "u0A3E", "u0A3F", "u0A40", "u0A83", "u0ABE", "u0ABF", "u0AC0", "u0AC9", "u0ACB", "u0ACC", "u0B02", "u0B03", "u0B3E", "u0B40", "u0B47", "u0B48", "u0B4B", "u0B4C", "u0B57", "u0BBE", "u0BBF", "u0BC1", "u0BC2", "u0BC6", "u0BC7", "u0BC8", "u0BCA", "u0BCB", "u0BCC", "u0BD7", "u0C01", "u0C02", "u0C03", "u0C41", "u0C42", "u0C43", "u0C44", "u0C82", "u0C83", "u0CBE", "u0CC0", "u0CC1", "u0CC2", "u0CC3", "u0CC4", "u0CC7", "u0CC8", "u0CCA", "u0CCB", "u0CD5", "u0CD6", "u0D02", "u0D03", "u0D3E", "u0D3F", "u0D40", "u0D46", "u0D47", "u0D48", "u0D4A", "u0D4B", "u0D4C", "u0D57", "u0D82", "u0D83", "u0DCF", "u0DD0", "u0DD1", "u0DD8", "u0DD9", "u0DDA", "u0DDB", "u0DDC", "u0DDD", "u0DDE", "u0DDF", "u0DF2", "u0DF3", "u0F3E", "u0F3F", "u0F7F", "u102B", "u102C", "u1031", "u1038", "u103B", "u103C", "u1056", "u1057", "u1062", "u1063", "u1064", "u1067", "u1068", "u1069", "u106A", "u106B", "u106C", "u106D", "u1083", "u1084", "u1087", "u1088", "u1089", "u108A", "u108B", "u108C", "u108F", "u109A", "u109B", "u109C", "u17B6", "u17BE", "u17BF", "u17C0", "u17C1", "u17C2", "u17C3", "u17C4", "u17C5", "u17C7", "u17C8", "u1923", "u1924", "u1925", "u1926", "u1929", "u192A", "u192B", "u1930", "u1931", "u1933", "u1934", "u1935", "u1936", "u1937", "u1938", "u1A19", "u1A1A", "u1A55", "u1A57", "u1A61", "u1A63", "u1A64", "u1A6D", "u1A6E", "u1A6F", "u1A70", "u1A71", "u1A72", "u1B04", "u1B35", "u1B3B", "u1B3D", "u1B3E", "u1B3F", "u1B40", "u1B41", "u1B43", "u1B44", "u1B82", "u1BA1", "u1BA6", "u1BA7", "u1BAA", "u1BE7", "u1BEA", "u1BEB", "u1BEC", "u1BEE", "u1BF2", "u1BF3", "u1C24", "u1C25", "u1C26", "u1C27", "u1C28", "u1C29", "u1C2A", "u1C2B", "u1C34", "u1C35", "u1CE1", "u1CF2", "u1CF3", "u302E", "u302F", "uA823", "uA824", "uA827", "uA880", "uA881", "uA8B4", "uA8B5", "uA8B6", "uA8B7", "uA8B8", "uA8B9", "uA8BA", "uA8BB", "uA8BC", "uA8BD", "uA8BE", "uA8BF", "uA8C0", "uA8C1", "uA8C2", "uA8C3", "uA952", "uA953", "uA983", "uA9B4", "uA9B5", "uA9BA", "uA9BB", "uA9BD", "uA9BE", "uA9BF", "uA9C0", "uAA2F", "uAA30", "uAA33", "uAA34", "uAA4D", "uAA7B", "uAA7D", "uAAEB", "uAAEE", "uAAEF", "uAAF5", "uABE3", "uABE4", "uABE6", "uABE7", "uABE9", "uABEA", "uABEC"];
var b = ["u0300", "u0301", "u0302", "u0303", "u0304", "u0305", "u0306", "u0307", "u0308", "u0309", "u030A", "u030B", "u030C", "u030D", "u030E", "u030F", "u0310", "u0311", "u0312", "u0313", "u0314", "u0315", "u0316", "u0317", "u0318", "u0319", "u031A", "u031B", "u031C", "u031D", "u031E", "u031F", "u0320", "u0321", "u0322", "u0323", "u0324", "u0325", "u0326", "u0327", "u0328", "u0329", "u032A", "u032B", "u032C", "u032D", "u032E", "u032F", "u0330", "u0331", "u0332", "u0333", "u0334", "u0335", "u0336", "u0337", "u0338", "u0339", "u033A", "u033B", "u033C", "u033D", "u033E", "u033F", "u0340", "u0341", "u0342", "u0343", "u0344", "u0345", "u0346", "u0347", "u0348", "u0349", "u034A", "u034B", "u034C", "u034D", "u034E", "u034F", "u0350", "u0351", "u0352", "u0353", "u0354", "u0355", "u0356", "u0357", "u0358", "u0359", "u035A", "u035B", "u035C", "u035D", "u035E", "u035F", "u0360", "u0361", "u0362", "u0363", "u0364", "u0365", "u0366", "u0367", "u0368", "u0369", "u036A", "u036B", "u036C", "u036D", "u036E", "u036F", "u0483", "u0484", "u0485", "u0486", "u0487", "u0591", "u0592", "u0593", "u0594", "u0595", "u0596", "u0597", "u0598", "u0599", "u059A", "u059B", "u059C", "u059D", "u059E", "u059F", "u05A0", "u05A1", "u05A2", "u05A3", "u05A4", "u05A5", "u05A6", "u05A7", "u05A8", "u05A9", "u05AA", "u05AB", "u05AC", "u05AD", "u05AE", "u05AF", "u05B0", "u05B1", "u05B2", "u05B3", "u05B4", "u05B5", "u05B6", "u05B7", "u05B8", "u05B9", "u05BA", "u05BB", "u05BC", "u05BD", "u05BF", "u05C1", "u05C2", "u05C4", "u05C5", "u05C7", "u0610", "u0611", "u0612", "u0613", "u0614", "u0615", "u0616", "u0617", "u0618", "u0619", "u061A", "u064B", "u064C", "u064D", "u064E", "u064F", "u0650", "u0651", "u0652", "u0653", "u0654", "u0655", "u0656", "u0657", "u0658", "u0659", "u065A", "u065B", "u065C", "u065D", "u065E", "u065F", "u0670", "u06D6", "u06D7", "u06D8", "u06D9", "u06DA", "u06DB", "u06DC", "u06DF", "u06E0", "u06E1", "u06E2", "u06E3", "u06E4", "u06E7", "u06E8", "u06EA", "u06EB", "u06EC", "u06ED", "u0711", "u0730", "u0731", "u0732", "u0733", "u0734", "u0735", "u0736", "u0737", "u0738", "u0739", "u073A", "u073B", "u073C", "u073D", "u073E", "u073F", "u0740", "u0741", "u0742", "u0743", "u0744", "u0745", "u0746", "u0747", "u0748", "u0749", "u074A", "u07A6", "u07A7", "u07A8", "u07A9", "u07AA", "u07AB", "u07AC", "u07AD", "u07AE", "u07AF", "u07B0", "u07EB", "u07EC", "u07ED", "u07EE", "u07EF", "u07F0", "u07F1", "u07F2", "u07F3", "u0816", "u0817", "u0818", "u0819", "u081B", "u081C", "u081D", "u081E", "u081F", "u0820", "u0821", "u0822", "u0823", "u0825", "u0826", "u0827", "u0829", "u082A", "u082B", "u082C", "u082D", "u0859", "u085A", "u085B", "u08E3", "u08E4", "u08E5", "u08E6", "u08E7", "u08E8", "u08E9", "u08EA", "u08EB", "u08EC", "u08ED", "u08EE", "u08EF", "u08F0", "u08F1", "u08F2", "u08F3", "u08F4", "u08F5", "u08F6", "u08F7", "u08F8", "u08F9", "u08FA", "u08FB", "u08FC", "u08FD", "u08FE", "u08FF", "u0900", "u0901", "u0902", "u093A", "u093C", "u0941", "u0942", "u0943", "u0944", "u0945", "u0946", "u0947", "u0948", "u094D", "u0951", "u0952", "u0953", "u0954", "u0955", "u0956", "u0957", "u0962", "u0963", "u0981", "u09BC", "u09C1", "u09C2", "u09C3", "u09C4", "u09CD", "u09E2", "u09E3", "u0A01", "u0A02", "u0A3C", "u0A41", "u0A42", "u0A47", "u0A48", "u0A4B", "u0A4C", "u0A4D", "u0A51", "u0A70", "u0A71", "u0A75", "u0A81", "u0A82", "u0ABC", "u0AC1", "u0AC2", "u0AC3", "u0AC4", "u0AC5", "u0AC7", "u0AC8", "u0ACD", "u0AE2", "u0AE3", "u0B01", "u0B3C", "u0B3F", "u0B41", "u0B42", "u0B43", "u0B44", "u0B4D", "u0B56", "u0B62", "u0B63", "u0B82", "u0BC0", "u0BCD", "u0C00", "u0C3E", "u0C3F", "u0C40", "u0C46", "u0C47", "u0C48", "u0C4A", "u0C4B", "u0C4C", "u0C4D", "u0C55", "u0C56", "u0C62", "u0C63", "u0C81", "u0CBC", "u0CBF", "u0CC6", "u0CCC", "u0CCD", "u0CE2", "u0CE3", "u0D01", "u0D41", "u0D42", "u0D43", "u0D44", "u0D4D", "u0D62", "u0D63", "u0DCA", "u0DD2", "u0DD3", "u0DD4", "u0DD6", "u0E31", "u0E34", "u0E35", "u0E36", "u0E37", "u0E38", "u0E39", "u0E3A", "u0E47", "u0E48", "u0E49", "u0E4A", "u0E4B", "u0E4C", "u0E4D", "u0E4E", "u0EB1", "u0EB4", "u0EB5", "u0EB6", "u0EB7", "u0EB8", "u0EB9", "u0EBB", "u0EBC", "u0EC8", "u0EC9", "u0ECA", "u0ECB", "u0ECC", "u0ECD", "u0F18", "u0F19", "u0F35", "u0F37", "u0F39", "u0F71", "u0F72", "u0F73", "u0F74", "u0F75", "u0F76", "u0F77", "u0F78", "u0F79", "u0F7A", "u0F7B", "u0F7C", "u0F7D", "u0F7E", "u0F80", "u0F81", "u0F82", "u0F83", "u0F84", "u0F86", "u0F87", "u0F8D", "u0F8E", "u0F8F", "u0F90", "u0F91", "u0F92", "u0F93", "u0F94", "u0F95", "u0F96", "u0F97", "u0F99", "u0F9A", "u0F9B", "u0F9C", "u0F9D", "u0F9E", "u0F9F", "u0FA0", "u0FA1", "u0FA2", "u0FA3", "u0FA4", "u0FA5", "u0FA6", "u0FA7", "u0FA8", "u0FA9", "u0FAA", "u0FAB", "u0FAC", "u0FAD", "u0FAE", "u0FAF", "u0FB0", "u0FB1", "u0FB2", "u0FB3", "u0FB4", "u0FB5", "u0FB6", "u0FB7", "u0FB8", "u0FB9", "u0FBA", "u0FBB", "u0FBC", "u0FC6", "u102D", "u102E", "u102F", "u1030", "u1032", "u1033", "u1034", "u1035", "u1036", "u1037", "u1039", "u103A", "u103D", "u103E", "u1058", "u1059", "u105E", "u105F", "u1060", "u1071", "u1072", "u1073", "u1074", "u1082", "u1085", "u1086", "u108D", "u109D", "u135D", "u135E", "u135F", "u1712", "u1713", "u1714", "u1732", "u1733", "u1734", "u1752", "u1753", "u1772", "u1773", "u17B4", "u17B5", "u17B7", "u17B8", "u17B9", "u17BA", "u17BB", "u17BC", "u17BD", "u17C6", "u17C9", "u17CA", "u17CB", "u17CC", "u17CD", "u17CE", "u17CF", "u17D0", "u17D1", "u17D2", "u17D3", "u17DD", "u180B", "u180C", "u180D", "u18A9", "u1920", "u1921", "u1922", "u1927", "u1928", "u1932", "u1939", "u193A", "u193B", "u1A17", "u1A18", "u1A1B", "u1A56", "u1A58", "u1A59", "u1A5A", "u1A5B", "u1A5C", "u1A5D", "u1A5E", "u1A60", "u1A62", "u1A65", "u1A66", "u1A67", "u1A68", "u1A69", "u1A6A", "u1A6B", "u1A6C", "u1A73", "u1A74", "u1A75", "u1A76", "u1A77", "u1A78", "u1A79", "u1A7A", "u1A7B", "u1A7C", "u1A7F", "u1AB0", "u1AB1", "u1AB2", "u1AB3", "u1AB4", "u1AB5", "u1AB6", "u1AB7", "u1AB8", "u1AB9", "u1ABA", "u1ABB", "u1ABC", "u1ABD", "u1B00", "u1B01", "u1B02", "u1B03", "u1B34", "u1B36", "u1B37", "u1B38", "u1B39", "u1B3A", "u1B3C", "u1B42", "u1B6B", "u1B6C", "u1B6D", "u1B6E", "u1B6F", "u1B70", "u1B71", "u1B72", "u1B73", "u1B80", "u1B81", "u1BA2", "u1BA3", "u1BA4", "u1BA5", "u1BA8", "u1BA9", "u1BAB", "u1BAC", "u1BAD", "u1BE6", "u1BE8", "u1BE9", "u1BED", "u1BEF", "u1BF0", "u1BF1", "u1C2C", "u1C2D", "u1C2E", "u1C2F", "u1C30", "u1C31", "u1C32", "u1C33", "u1C36", "u1C37", "u1CD0", "u1CD1", "u1CD2", "u1CD4", "u1CD5", "u1CD6", "u1CD7", "u1CD8", "u1CD9", "u1CDA", "u1CDB", "u1CDC", "u1CDD", "u1CDE", "u1CDF", "u1CE0", "u1CE2", "u1CE3", "u1CE4", "u1CE5", "u1CE6", "u1CE7", "u1CE8", "u1CED", "u1CF4", "u1CF8", "u1CF9", "u1DC0", "u1DC1", "u1DC2", "u1DC3", "u1DC4", "u1DC5", "u1DC6", "u1DC7", "u1DC8", "u1DC9", "u1DCA", "u1DCB", "u1DCC", "u1DCD", "u1DCE", "u1DCF", "u1DD0", "u1DD1", "u1DD2", "u1DD3", "u1DD4", "u1DD5", "u1DD6", "u1DD7", "u1DD8", "u1DD9", "u1DDA", "u1DDB", "u1DDC", "u1DDD", "u1DDE", "u1DDF", "u1DE0", "u1DE1", "u1DE2", "u1DE3", "u1DE4", "u1DE5", "u1DE6", "u1DE7", "u1DE8", "u1DE9", "u1DEA", "u1DEB", "u1DEC", "u1DED", "u1DEE", "u1DEF", "u1DF0", "u1DF1", "u1DF2", "u1DF3", "u1DF4", "u1DF5", "u1DFC", "u1DFD", "u1DFE", "u1DFF", "u20D0", "u20D1", "u20D2", "u20D3", "u20D4", "u20D5", "u20D6", "u20D7", "u20D8", "u20D9", "u20DA", "u20DB", "u20DC", "u20E1", "u20E5", "u20E6", "u20E7", "u20E8", "u20E9", "u20EA", "u20EB", "u20EC", "u20ED", "u20EE", "u20EF", "u20F0", "u2CEF", "u2CF0", "u2CF1", "u2D7F", "u2DE0", "u2DE1", "u2DE2", "u2DE3", "u2DE4", "u2DE5", "u2DE6", "u2DE7", "u2DE8", "u2DE9", "u2DEA", "u2DEB", "u2DEC", "u2DED", "u2DEE", "u2DEF", "u2DF0", "u2DF1", "u2DF2", "u2DF3", "u2DF4", "u2DF5", "u2DF6", "u2DF7", "u2DF8", "u2DF9", "u2DFA", "u2DFB", "u2DFC", "u2DFD", "u2DFE", "u2DFF", "u302A", "u302B", "u302C", "u302D", "u3099", "u309A", "uA66F", "uA674", "uA675", "uA676", "uA677", "uA678", "uA679", "uA67A", "uA67B", "uA67C", "uA67D", "uA69E", "uA69F", "uA6F0", "uA6F1", "uA802", "uA806", "uA80B", "uA825", "uA826", "uA8C4", "uA8E0", "uA8E1", "uA8E2", "uA8E3", "uA8E4", "uA8E5", "uA8E6", "uA8E7", "uA8E8", "uA8E9", "uA8EA", "uA8EB", "uA8EC", "uA8ED", "uA8EE", "uA8EF", "uA8F0", "uA8F1", "uA926", "uA927", "uA928", "uA929", "uA92A", "uA92B", "uA92C", "uA92D", "uA947", "uA948", "uA949", "uA94A", "uA94B", "uA94C", "uA94D", "uA94E", "uA94F", "uA950", "uA951", "uA980", "uA981", "uA982", "uA9B3", "uA9B6", "uA9B7", "uA9B8", "uA9B9", "uA9BC", "uA9E5", "uAA29", "uAA2A", "uAA2B", "uAA2C", "uAA2D", "uAA2E", "uAA31", "uAA32", "uAA35", "uAA36", "uAA43", "uAA4C", "uAA7C", "uAAB0", "uAAB2", "uAAB3", "uAAB4", "uAAB7", "uAAB8", "uAABE", "uAABF", "uAAC1", "uAAEC", "uAAED", "uAAF6", "uABE5", "uABE8", "uABED", "uFB1E", "uFE00", "uFE01", "uFE02", "uFE03", "uFE04", "uFE05", "uFE06", "uFE07", "uFE08", "uFE09", "uFE0A", "uFE0B", "uFE0C", "uFE0D", "uFE0E", "uFE0F", "uFE20", "uFE21", "uFE22", "uFE23", "uFE24", "uFE25", "uFE26", "uFE27", "uFE28", "uFE29", "uFE2A", "uFE2B", "uFE2C", "uFE2D", "uFE2E", "uFE2F"];
var combiningMarks = a.concat(b);

var splitChars = ["-",  "/",  ";",  ":",  "&",
  "u0E2F",  // thai character pairannoi
  "u0EAF",  // lao ellipsis
  "u0EC6",  // lao ko la (word repetition)
  "u0ECC",  // lao cancellation mark
  "u104A",  // myanmar sign little section
  "u104B",  // myanmar sign section
  "u104C",  // myanmar symbol locative
  "u104D",  // myanmar symbol completed
  "u104E",  // myanmar symbol aforementioned
  "u104F",  // myanmar symbol genitive
  "u2013",  // en dash
  "u2014",  // em dash
  "u2027",  // simplified chinese hyphenation point
  "u3000",  // simplified chinese ideographic space
  "u3001",  // simplified chinese ideographic comma
  "u3002",  // simplified chinese ideographic full stop
  "uFF0C",  // full-width comma
  "uFF5E"   // wave dash
];

var prefixChars = ["'",  "<",  "(",  "{",  "[",
  "u00AB",  // left-pointing double angle quotation mark
  "u300A",  // left double angle bracket
  "u3008"  // left angle bracket
];

var suffixChars = ["'",  ">",  ")",  "}",  "]",  ".",  "!",  "?",
  "u00BB",  // right-pointing double angle quotation mark
  "u300B",  // right double angle bracket
  "u3009"  // right angle bracket
].concat(splitChars);

var burmeseRange = "\u1000-\u102A\u103F-\u1049\u1050-\u1055";
var japaneseRange = "぀-ゟ\n                       ゠-ヿ\n                       ＀-＋\n                       －-｝\n                       ｟-ﾟ\n                       㐀-䶿";
var chineseRange = "\u3400-\u9FBF";
var laoRange = "\u0E81-\u0EAE\u0EB0-\u0EC4\u0EC8-\u0ECB\u0ECD-\u0EDD";

var noSpaceRange = burmeseRange + chineseRange + laoRange;

var splitWords = new RegExp(("(\\" + (splitChars.join("|\\")) + ")*[^\\s|\\" + (splitChars.join("|\\")) + "]+(\\" + (splitChars.join("|\\")) + ")*"), "g");
var japaneseChars = new RegExp(("[" + japaneseRange + "]"));
var noSpaceLanguage = new RegExp(("[" + noSpaceRange + "]"));
var splitAllChars = new RegExp(("(\\" + (prefixChars.join("|\\")) + ")*[" + noSpaceRange + "](\\" + (suffixChars.join("|\\")) + "|\\" + (combiningMarks.join("|\\")) + ")*|[a-z0-9]+"), "gi");

/**
    @function textSplit
    @desc Splits a given sentence into an array of words.
    @param {String} sentence
*/
var textSplit = function(sentence) {
  if (!noSpaceLanguage.test(sentence)) { return stringify(sentence).match(splitWords); }
  return merge(stringify(sentence).match(splitWords).map(function (d) {
    if (!japaneseChars.test(d) && noSpaceLanguage.test(d)) { return d.match(splitAllChars); }
    return [d];
  }));
};

/**
    @function textWrap
    @desc Based on the defined styles and dimensions, breaks a string into an array of strings for each line of text.
*/
var textWrap = function() {

  var fontFamily = "Verdana",
      fontSize = 10,
      fontWeight = 400,
      height = 200,
      lineHeight,
      overflow = false,
      split = textSplit,
      width = 200;

  /**
      The inner return object and wraps the text and returns the line data array.
      @private
  */
  function textWrap(sentence) {

    sentence = stringify(sentence);

    if (lineHeight === void 0) { lineHeight = Math.ceil(fontSize * 1.1); }

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
          sizes = textWidth(words, style),
          space = textWidth(" ", style);

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var wordWidth = sizes[words.indexOf(word)];
      word += sentence.slice(textProg.length + word.length).match("^ *", "g")[0];
      if (widthProg + wordWidth > width) {
        if (!i && !overflow) {
          truncated = true;
          break;
        }
        lineData[line - 1] = lineData[line - 1].trimRight();
        line++;
        if (lineHeight * line > height || wordWidth > width && !overflow) {
          truncated = true;
          break;
        }
        widthProg = 0;
        lineData.push(word);
      }
      else if (!i) { lineData[0] = word; }
      else { lineData[line - 1] += word; }
      textProg += word;
      widthProg += wordWidth;
      widthProg += word.match(/[\s]*$/g)[0].length * space;
    }

    return {
      lines: lineData,
      sentence: sentence, truncated: truncated, words: words
    };

  }

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family.
      @param {Function|String} [*value* = "Verdana"]
  */
  textWrap.fontFamily = function(_) {
    return arguments.length ? (fontFamily = _, textWrap) : fontFamily;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size.
      @param {Function|Number} [*value* = 10]
  */
  textWrap.fontSize = function(_) {
    return arguments.length ? (fontSize = _, textWrap) : fontSize;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the font weight accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font weight.
      @param {Function|Number|String} [*value* = 400]
  */
  textWrap.fontWeight = function(_) {
    return arguments.length ? (fontWeight = _, textWrap) : fontWeight;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets height limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
      @param {Number} [*value* = 200]
  */
  textWrap.height = function(_) {
    return arguments.length ? (height = _, textWrap) : height;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#textWrap.fontSize) by default.
      @param {Function|Number} [*value*]
  */
  textWrap.lineHeight = function(_) {
    return arguments.length ? (lineHeight = _, textWrap) : lineHeight;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the overflow to the specified boolean and returns this generator. If *value* is not specified, returns the current overflow value.
      @param {Boolean} [*value* = false]
  */
  textWrap.overflow = function(_) {
    return arguments.length ? (overflow = _, textWrap) : overflow;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to textWrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
  */
  textWrap.split = function(_) {
    return arguments.length ? (split = _, textWrap) : split;
  };

  /**
      @memberof textWrap
      @desc If *value* is specified, sets width limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
      @param {Number} [*value* = 200]
  */
  textWrap.width = function(_) {
    return arguments.length ? (width = _, textWrap) : width;
  };

  return textWrap;

};

/**
    @function TextBox
    @extends BaseClass
    @desc Creates a wrapped text box for each point in an array of data. See [this example](https://d3plus.org/examples/d3plus-text/getting-started/) for help getting started using the textBox function.
*/
var TextBox = (function (BaseClass$$1) {
  function TextBox() {

    BaseClass$$1.call(this);

    this._delay = 0;
    this._duration = 0;
    this._ellipsis = function (_) { return ((_.replace(/\.|,$/g, "")) + "..."); };
    this._fontColor = constant$7("black");
    this._fontFamily = constant$7("Verdana");
    this._fontMax = constant$7(50);
    this._fontMin = constant$7(8);
    this._fontResize = constant$7(false);
    this._fontSize = constant$7(10);
    this._fontWeight = constant$7(400);
    this._height = accessor("height", 200);
    this._id = function (d, i) { return d.id || ("" + i); };
    this._on = {};
    this._overflow = constant$7(false);
    this._pointerEvents = constant$7("auto");
    this._rotate = constant$7(0);
    this._split = textSplit;
    this._text = accessor("text");
    this._textAnchor = constant$7("start");
    this._verticalAlign = constant$7("top");
    this._width = accessor("width", 200);
    this._x = accessor("x", 0);
    this._y = accessor("y", 0);

  }

  if ( BaseClass$$1 ) TextBox.__proto__ = BaseClass$$1;
  TextBox.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  TextBox.prototype.constructor = TextBox;

  /**
      @memberof TextBox
      @desc Renders the text boxes. If a *callback* is specified, it will be called once the shapes are done drawing.
      @param {Function} [*callback* = undefined]
  */
  TextBox.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) { this.select(select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).node()); }
    if (this._lineHeight === void 0) { this._lineHeight = function (d, i) { return this$1._fontSize(d, i) * 1.1; }; }
    var that = this;

    var boxes = this._select.selectAll(".d3plus-textBox").data(this._data.reduce(function (arr, d, i) {

      var t = this$1._text(d, i);
      if (t === void 0) { return arr; }

      var resize = this$1._fontResize(d, i);

      var fS = resize ? this$1._fontMax(d, i) : this$1._fontSize(d, i),
          lH = resize ? fS * 1.1 : this$1._lineHeight(d, i),
          line = 1,
          lineData = [],
          sizes;

      var style = {
        "font-family": this$1._fontFamily(d, i),
        "font-size": fS,
        "font-weight": this$1._fontWeight(d, i),
        "line-height": lH
      };

      var h = this$1._height(d, i),
            w = this$1._width(d, i);

      var wrapper = textWrap()
        .fontFamily(style["font-family"])
        .fontSize(fS)
        .fontWeight(style["font-weight"])
        .lineHeight(lH)
        .height(h)
        .overflow(this$1._overflow(d, i))
        .width(w);

      var fMax = this$1._fontMax(d, i),
            fMin = this$1._fontMin(d, i),
            vA = this$1._verticalAlign(d, i),
            words = this$1._split(t, i);

      /**
          Figures out the lineData to be used for wrapping.
          @private
      */
      function checkSize() {

        if (fS < fMin) {
          lineData = [];
          return;
        }
        else if (fS > fMax) { fS = fMax; }

        if (resize) {
          lH = fS * 1.1;
          wrapper
            .fontSize(fS)
            .lineHeight(lH);
          style["font-size"] = fS;
          style["line-height"] = lH;
        }

        var wrapResults = wrapper(t);
        lineData = wrapResults.lines.filter(function (l) { return l !== ""; });
        line = lineData.length;

        if (wrapResults.truncated) {

          if (resize) {
            fS--;
            if (fS < fMin) { lineData = []; }
            else { checkSize(); }
          }
          else if (line < 1) { lineData = [that._ellipsis("")]; }
          else { lineData[line - 1] = that._ellipsis(lineData[line - 1]); }

        }


      }

      if (w > fMin && (h > lH || resize && h > fMin * 1.1)) {

        if (resize) {

          sizes = textWidth(words, style);

          var areaMod = 1.165 + w / h * 0.1,
                boxArea = w * h,
                maxWidth = max(sizes),
                textArea = sum(sizes, function (d) { return d * lH; }) * areaMod;

          if (maxWidth > w || textArea > boxArea) {
            var areaRatio = Math.sqrt(boxArea / textArea),
                  widthRatio = w / maxWidth;
            var sizeRatio = min([areaRatio, widthRatio]);
            fS = Math.floor(fS * sizeRatio);
          }

          var heightMax = Math.floor(h * 0.8);
          if (fS > heightMax) { fS = heightMax; }

        }

        checkSize();

      }

      if (lineData.length) {

        var tH = line * lH;
        var yP = vA === "top" ? 0 : vA === "middle" ? h / 2 - tH / 2 : h - tH;
        yP -= lH * 0.1;

        arr.push({
          data: d,
          i: i,
          lines: lineData,
          fC: this$1._fontColor(d, i),
          fF: style["font-family"],
          fW: style["font-weight"],
          id: this$1._id(d, i),
          tA: this$1._textAnchor(d, i),
          fS: fS, lH: lH, w: w, x: this$1._x(d, i), y: this$1._y(d, i) + yP
        });

      }

      return arr;

    }, []), this._id);

    var t = transition().duration(this._duration);

    if (this._duration === 0) {

      boxes.exit().remove();

    }
    else {

      boxes.exit().transition().delay(this._duration).remove();

      boxes.exit().selectAll("tspan").transition(t)
        .attr("opacity", 0);

    }

    function rotate(text) {
      text.attr("transform", function (d, i) { return ("rotate(" + (that._rotate(d, i)) + " " + (d.x + d.w / 2) + " " + (d.y + d.lH / 4 + d.lH * d.lines.length / 2) + ")"); });
    }

    var update = boxes.enter().append("text")
        .attr("class", "d3plus-textBox")
        .attr("id", function (d) { return ("d3plus-textBox-" + (d.id)); })
        .attr("y", function (d) { return ((d.y) + "px"); })
        .call(rotate)
      .merge(boxes);

    update
      .attr("fill", function (d) { return d.fC; })
      .attr("text-anchor", function (d) { return d.tA; })
      .attr("font-family", function (d) { return d.fF; })
      .style("font-family", function (d) { return d.fF; })
      .attr("font-size", function (d) { return ((d.fS) + "px"); })
      .style("font-size", function (d) { return ((d.fS) + "px"); })
      .attr("font-weight", function (d) { return d.fW; })
      .style("font-weight", function (d) { return d.fW; })
      .style("pointer-events", function (d) { return this$1._pointerEvents(d.data, d.i); })
      .each(function(d) {

        var dx = d.tA === "start" ? 0 : d.tA === "end" ? d.w : d.w / 2,
              tB = select(this);

        if (that._duration === 0) { tB.attr("y", function (d) { return ((d.y) + "px"); }); }
        else { tB.transition(t).attr("y", function (d) { return ((d.y) + "px"); }); }

        /**
            Styles to apply to each <tspan> element.
            @private
        */
        function tspanStyle(tspan) {
          tspan
            .text(function (t) { return t.trimRight(); })
            .attr("x", ((d.x) + "px"))
            .attr("dx", (dx + "px"))
            .attr("dy", ((d.lH) + "px"));
        }

        var tspans = tB.selectAll("tspan").data(d.lines);

        if (that._duration === 0) {

          tspans.call(tspanStyle);

          tspans.exit().remove();

          tspans.enter().append("tspan")
            .attr("dominant-baseline", "alphabetic")
            .style("baseline-shift", "0%")
            .call(tspanStyle);

        }
        else {

          tspans.transition(t).call(tspanStyle);

          tspans.exit().transition(t)
            .attr("opacity", 0).remove();

          tspans.enter().append("tspan")
              .attr("dominant-baseline", "alphabetic")
              .style("baseline-shift", "0%")
              .attr("opacity", 0)
              .call(tspanStyle)
            .merge(tspans).transition(t).delay(that._delay)
              .call(tspanStyle)
              .attr("opacity", 1);

        }

      })
      .transition(t).call(rotate);

    var events = Object.keys(this._on),
          on = events.reduce(function (obj, e) {
            obj[e] = function (d, i) { return this$1._on[e](d.data, i); };
            return obj;
          }, {});
    for (var e = 0; e < events.length; e++) { update.on(events[e], on[events[e]]); }

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof TextBox
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A text box will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  TextBox.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the animation delay to the specified number and returns this generator. If *value* is not specified, returns the current animation delay.
      @param {Number} [*value* = 0]
  */
  TextBox.prototype.delay = function delay (_) {
    return arguments.length ? (this._delay = _, this) : this._delay;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the animation duration to the specified number and returns this generator. If *value* is not specified, returns the current animation duration.
      @param {Number} [*value* = 0]
  */
  TextBox.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the ellipsis method to the specified function or string and returns this generator. If *value* is not specified, returns the current ellipsis method, which simply adds an ellipsis to the string by default.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d + "...";
}
  */
  TextBox.prototype.ellipsis = function ellipsis (_) {
    return arguments.length ? (this._ellipsis = typeof _ === "function" ? _ : constant$7(_), this) : this._ellipsis;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the font color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font color accessor, which is inferred from the [container element](#textBox.select) by default.
      @param {Function|String} [*value* = "black"]
  */
  TextBox.prototype.fontColor = function fontColor (_) {
    return arguments.length ? (this._fontColor = typeof _ === "function" ? _ : constant$7(_), this) : this._fontColor;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family accessor, which is inferred from the [container element](#textBox.select) by default.
      @param {Function|String} [*value* = "Verdana"]
  */
  TextBox.prototype.fontFamily = function fontFamily (_) {
    return arguments.length ? (this._fontFamily = typeof _ === "function" ? _ : constant$7(_), this) : this._fontFamily;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the maximum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current maximum font size accessor. The maximum font size is used when [resizing fonts](#textBox.fontResize) dynamically.
      @param {Function|Number} [*value* = 50]
  */
  TextBox.prototype.fontMax = function fontMax (_) {
    return arguments.length ? (this._fontMax = typeof _ === "function" ? _ : constant$7(_), this) : this._fontMax;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the minimum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current minimum font size accessor. The minimum font size is used when [resizing fonts](#textBox.fontResize) dynamically.
      @param {Function|Number} [*value* = 8]
  */
  TextBox.prototype.fontMin = function fontMin (_) {
    return arguments.length ? (this._fontMin = typeof _ === "function" ? _ : constant$7(_), this) : this._fontMin;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor.
      @param {Function|Boolean} [*value* = false]
  */
  TextBox.prototype.fontResize = function fontResize (_) {
    return arguments.length ? (this._fontResize = typeof _ === "function" ? _ : constant$7(_), this) : this._fontResize;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size accessor, which is inferred from the [container element](#textBox.select) by default.
      @param {Function|Number} [*value* = 10]
  */
  TextBox.prototype.fontSize = function fontSize (_) {
    return arguments.length ? (this._fontSize = typeof _ === "function" ? _ : constant$7(_), this) : this._fontSize;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the font weight accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font weight accessor, which is inferred from the [container element](#textBox.select) by default.
      @param {Function|Number|String} [*value* = 400]
  */
  TextBox.prototype.fontWeight = function fontWeight (_) {
    return arguments.length ? (this._fontWeight = typeof _ === "function" ? _ : constant$7(_), this) : this._fontWeight;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d.height || 200;
}
  */
  TextBox.prototype.height = function height (_) {
    return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$7(_), this) : this._height;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the id accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current id accessor.
      @param {Function|Number} [*value*]
      @example <caption>default accessor</caption>
function(d, i) {
  return d.id || i + "";
}
  */
  TextBox.prototype.id = function id (_) {
    return arguments.length ? (this._id = typeof _ === "function" ? _ : constant$7(_), this) : this._id;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#textBox.fontSize) by default.
      @param {Function|Number} [*value*]
  */
  TextBox.prototype.lineHeight = function lineHeight (_) {
    return arguments.length ? (this._lineHeight = typeof _ === "function" ? _ : constant$7(_), this) : this._lineHeight;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the overflow accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current overflow accessor.
      @param {Function|Boolean} [*value* = false]
  */
  TextBox.prototype.overflow = function overflow (_) {
    return arguments.length ? (this._overflow = typeof _ === "function" ? _ : constant$7(_), this) : this._overflow;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.
      @param {Function|String} [*value* = "auto"]
  */
  TextBox.prototype.pointerEvents = function pointerEvents (_) {
    return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$7(_), this) : this._pointerEvents;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the rotate accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current rotate accessor.
      @param {Function|Number} [*value* = 0]
  */
  TextBox.prototype.rotate = function rotate (_) {
    return arguments.length ? (this._rotate = typeof _ === "function" ? _ : constant$7(_), this) : this._rotate;
  };

  /**
      @memberof TextBox
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which adds an SVG element to the page by default.
      @param {String|HTMLElement} [*selector*]
  */
  TextBox.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
  */
  TextBox.prototype.split = function split (_) {
    return arguments.length ? (this._split = _, this) : this._split;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the text accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d.text;
}
  */
  TextBox.prototype.text = function text (_) {
    return arguments.length ? (this._text = typeof _ === "function" ? _ : constant$7(_), this) : this._text;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the horizontal text anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current horizontal text anchor accessor.
      @param {Function|String} [*value* = "start"] Analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.
  */
  TextBox.prototype.textAnchor = function textAnchor (_) {
    return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : constant$7(_), this) : this._textAnchor;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor.
      @param {Function|String} [*value* = "top"] Accepts `"top"`, `"middle"`, and `"bottom"`.
  */
  TextBox.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : constant$7(_), this) : this._verticalAlign;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d.width || 200;
}
  */
  TextBox.prototype.width = function width (_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$7(_), this) : this._width;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the left position of the textBox.
      @param {Function|Number} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d.x || 0;
}
  */
  TextBox.prototype.x = function x (_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : constant$7(_), this) : this._x;
  };

  /**
      @memberof TextBox
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the top position of the textBox.
      @param {Function|Number} [*value*]
      @example <caption>default accessor</caption>
function(d) {
  return d.y || 0;
}
  */
  TextBox.prototype.y = function y (_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant$7(_), this) : this._y;
  };

  return TextBox;
}(BaseClass));

/**
    @function titleCase
    @desc Capitalizes the first letter of each word in a phrase/sentence.
    @param {String} str The string to apply the title case logic.
    @param {Object} [opts] Optional parameters to apply.
    @param {String} [opts.lng] The locale to use when looking up all lowercase or uppecase words.
*/

/**
    @function pointDistanceSquared
    @desc Returns the squared euclidean distance between two points.
    @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
    @returns {Number}
*/
var pointDistanceSquared = function (p1, p2) {

  var dx = p2[0] - p1[0],
        dy = p2[1] - p1[1];

  return dx * dx + dy * dy;

};

/**
    @function pointDistance
    @desc Calculates the pixel distance between two points.
    @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
    @returns {Number}
*/
var pointDistance = function (p1, p2) { return Math.sqrt(pointDistanceSquared(p1, p2)); };

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Shape
    @extends external:BaseClass
    @desc An abstracted class for generating shapes.
*/
var Shape = (function (BaseClass$$1) {
  function Shape(tagName) {
    var this$1 = this;
    if ( tagName === void 0 ) tagName = "g";


    BaseClass$$1.call(this);

    this._activeOpacity = 0.75;
    this._activeStyle = {
      "stroke": function (d, i) { return color(this$1._stroke(d, i)).darker(2); },
      "stroke-width": function (d, i) {
        var s = this$1._strokeWidth(d, i);
        return s ? s * 2 : 1;
      }
    };
    this._backgroundImage = constant$7(false);
    this._data = [];
    this._duration = 600;
    this._fill = constant$7("black");

    this._fontColor = function (d, i) { return colorContrast(this$1._fill(d, i)); };
    this._fontFamily = constant$7("Verdana");
    this._fontResize = constant$7(false);
    this._fontSize = constant$7(12);

    this._hoverOpacity = 0.5;
    this._id = function (d, i) { return d.id !== void 0 ? d.id : i; };
    this._label = constant$7(false);
    this._labelRotate = constant$7(0);
    this._labelPadding = constant$7(5);
    this._name = "Shape";
    this._opacity = constant$7(1);
    this._scale = constant$7(1);
    this._shapeRendering = constant$7("geometricPrecision");
    this._stroke = function (d, i) { return color(this$1._fill(d, i)).darker(1); };
    this._strokeWidth = constant$7(0);
    this._tagName = tagName;
    this._textAnchor = constant$7("start");
    this._vectorEffect = constant$7("non-scaling-stroke");
    this._verticalAlign = constant$7("top");

    this._x = accessor("x", 0);
    this._y = accessor("y", 0);

  }

  if ( BaseClass$$1 ) Shape.__proto__ = BaseClass$$1;
  Shape.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Shape.prototype.constructor = Shape;

  /**
      @memberof Shape
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Shape.prototype._aes = function _aes () {
    return {};
  };

  /**
      @memberof Shape
      @desc Adds event listeners to each shape group or hit area.
      @param {D3Selection} *update* The update cycle of the data binding.
      @private
  */
  Shape.prototype._applyEvents = function _applyEvents (handler) {
    var this$1 = this;


    var events = Object.keys(this._on);
    var loop = function ( e ) {
      handler.on(events[e], function (d, i) {
        if (!this$1._on[events[e]]) { return; }
        if (d.i !== void 0) { i = d.i; }
        if (d.nested && d.values) {
          var cursor = mouse(this$1._select.node()),
                values = d.values.map(function (d) { return pointDistance(cursor, [this$1._x(d, i), this$1._y(d, i)]); });
          d = d.values[values.indexOf(min(values))];
        }
        this$1._on[events[e]].bind(this$1)(d, i);
      });
    };

    for (var e = 0; e < events.length; e++) loop( e );

  };

  /**
      @memberof Shape
      @desc Provides the default styling to the active shape elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyActive = function _applyActive (elem$$1) {
    var this$1 = this;


    var that = this;

    if (elem$$1.size() && elem$$1.node().tagName === "g") { elem$$1 = elem$$1.selectAll("*"); }

    /**
        @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
        @param {Object} *d* data point
        @param {Number} *i* index
        @private
    */
    function styleLogic(d, i) {
      return typeof this !== "function" ? this
           : d.nested && d.key && d.values
           ? this(d.values[0], that._data.indexOf(d.values[0]))
           : this(d, i);
    }

    var activeStyle = {};
    for (var key in this$1._activeStyle) {
      if ({}.hasOwnProperty.call(this$1._activeStyle, key)) {
        activeStyle[key] = styleLogic.bind(this$1._activeStyle[key]);
      }
    }

    elem$$1.transition().duration(0).call(attrize, activeStyle);

  };

  /**
      @memberof Shape
      @desc Provides the default styling to the shape elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyStyle = function _applyStyle (elem$$1) {

    var that = this;

    if (elem$$1.size() && elem$$1.node().tagName === "g") { elem$$1 = elem$$1.selectAll("*"); }

    /**
        @desc Determines whether a shape is a nested collection of data points, and uses the appropriate data and index for the given function context.
        @param {Object} *d* data point
        @param {Number} *i* index
        @private
    */
    function styleLogic(d, i) {
      return typeof this !== "function" ? this
           : d.nested && d.key && d.values
           ? this(d.values[0], that._data.indexOf(d.values[0]))
           : this(d, i);
    }

    elem$$1
      .attr("fill", styleLogic.bind(this._fill))
      .attr("stroke", styleLogic.bind(this._stroke))
      .attr("stroke-width", styleLogic.bind(this._strokeWidth))
      .attr("vector-effect", styleLogic.bind(this._vectorEffect));
  };

  /**
      @memberof Shape
      @desc Calculates the transform for the group elements.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._applyTransform = function _applyTransform (elem$$1) {
    var this$1 = this;


    elem$$1
      .attr("transform", function (d, i) { return ("\n        translate(" + (d.__d3plusShape__
                  ? d.translate ? d.translate
                  : ((this$1._x(d.data, d.i)) + "," + (this$1._y(d.data, d.i)))
                  : ((this$1._x(d, i)) + "," + (this$1._y(d, i)))) + ")\n        scale(" + (d.__d3plusShape__ ? d.scale || this$1._scale(d.data, d.i)
              : this$1._scale(d, i)) + ")"); });
  };

  /**
      @memberof Shape
      @desc Checks for nested data and uses the appropriate variables for accessor functions.
      @param {HTMLElement} *elem*
      @private
  */
  Shape.prototype._nestWrapper = function _nestWrapper (method) {
    return function (d, i) { return method(d.__d3plusShape__ ? d.data : d, d.__d3plusShape__ ? d.i : i); };
  };

  /**
      @memberof Shape
      @desc Adds background image to each shape group.
      @private
  */
  Shape.prototype._renderImage = function _renderImage () {
    var this$1 = this;


    var imageData = [];

    this._update.merge(this._enter).data()
      .forEach(function (datum, i) {

        var aes = this$1._aes(datum, i);

        if (aes.r || aes.width && aes.height) {

          var d = datum;
          if (datum.nested && datum.key && datum.values) {
            d = datum.values[0];
            i = this$1._data.indexOf(d);
          }

          var height = aes.r ? aes.r * 2 : aes.height,
                url = this$1._backgroundImage(d, i),
                width = aes.r ? aes.r * 2 : aes.width;

          if (url) {

            var x = d.__d3plusShape__ ? d.translate ? d.translate[0]
                  : this$1._x(d.data, d.i) : this$1._x(d, i),
                y = d.__d3plusShape__ ? d.translate ? d.translate[1]
                  : this$1._y(d.data, d.i) : this$1._y(d, i);

            if (aes.x) { x += aes.x; }
            if (aes.y) { y += aes.y; }

            if (d.__d3plusShape__) {
              d = d.data;
              i = d.i;
            }

            imageData.push({
              __d3plus__: true,
              data: d,
              height: height,
              i: i,
              id: this$1._id(d, i),
              url: url,
              width: width,
              x: x + -width / 2,
              y: y + -height / 2
            });

          }

        }

      });

    return new Image()
      .data(imageData)
      .duration(this._duration)
      .pointerEvents("none")
      .select(elem(("g.d3plus-" + (this._name) + "-image"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}}).node())
      .render();

  };

  /**
      @memberof Shape
      @desc Adds labels to each shape group.
      @private
  */
  Shape.prototype._renderLabels = function _renderLabels () {
    var this$1 = this;


    var labelData = [];

    this._update.merge(this._enter).data()
      .forEach(function (datum, i) {

        var d = datum;
        if (datum.nested && datum.key && datum.values) {
          d = datum.values[0];
          i = this$1._data.indexOf(d);
        }

        var labels = this$1._label(d, i);

        if (this$1._labelBounds && labels !== false && labels !== void 0) {

          var aes = this$1._aes(datum, i),
                bounds = this$1._labelBounds(d, i, aes);

          if (bounds) {

            if (labels.constructor !== Array) { labels = [labels]; }

            var x = d.__d3plusShape__ ? d.translate ? d.translate[0]
                    : this$1._x(d.data, d.i) : this$1._x(d, i),
                  y = d.__d3plusShape__ ? d.translate ? d.translate[1]
                    : this$1._y(d.data, d.i) : this$1._y(d, i);

            if (d.__d3plusShape__) {
              d = d.data;
              i = d.i;
            }

            var fC = this$1._fontColor(d, i),
                  fF = this$1._fontFamily(d, i),
                  fR = this$1._fontResize(d, i),
                  fS = this$1._fontSize(d, i),
                  lH = this$1._lineHeight(d, i),
                  padding = this$1._labelPadding(d, i),
                  r = this$1._labelRotate(d, i),
                  tA = this$1._textAnchor(d, i),
                  vA = this$1._verticalAlign(d, i);

            for (var l = 0; l < labels.length; l++) {

              var b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds),
                    p = padding.constructor === Array ? padding[l] : padding;

              labelData.push(Object.assign(b, {
                __d3plusShape__: true,
                data: d,
                fC: fC.constructor === Array ? fC[l] : fC,
                fF: fF.constructor === Array ? fF[l] : fF,
                fR: fR.constructor === Array ? fR[l] : fR,
                fS: fS.constructor === Array ? fS[l] : fS,
                height: b.height - p * 2,
                i: i,
                id: ((this$1._id(d, i)) + "_" + l),
                lH: lH.constructor === Array ? lH[l] : lH,
                r: bounds.angle !== void 0 ? bounds.angle : r.constructor === Array ? r[l] : r,
                tA: tA.constructor === Array ? tA[l] : tA,
                text: labels[l],
                vA: vA.constructor === Array ? vA[l] : vA,
                width: b.width - p * 2,
                x: x + b.x + p,
                y: y + b.y + p
              }));

            }

          }

        }

      });

    return new TextBox()
      .data(labelData)
      .duration(this._duration)
      .fontColor(function (d) { return d.fC; })
      .fontFamily(function (d) { return d.fF; })
      .fontResize(function (d) { return d.fR; })
      .fontSize(function (d) { return d.fS; })
      .lineHeight(function (d) { return d.lH; })
      .pointerEvents("none")
      .rotate(function (d) { return d.data.r; })
      .textAnchor(function (d) { return d.tA; })
      .verticalAlign(function (d) { return d.vA; })
      .select(elem(("g.d3plus-" + (this._name) + "-text"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}}).node())
      .render();

  };

  /**
      @memberof Shape
      @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
      @param {Function} [*callback*]
      @chainable
  */
  Shape.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .style("width", ((window.innerWidth) + "px"))
        .style("height", ((window.innerHeight) + "px"))
        .style("display", "block").node());
    }

    if (this._lineHeight === void 0) {
      this.lineHeight(function (d, i) { return this$1._fontSize(d, i) * 1.1; });
    }

    this._transition = transition().duration(this._duration);

    var data = this._data, key = this._id;
    if (this._dataFilter) {
      data = this._dataFilter(data);
      if (data.key) { key = data.key; }
    }

    if (this._sort) { data = data.sort(function (a, b) { return this$1._sort(a.__d3plusShape__ ? a.data : a, b.__d3plusShape__ ? b.data : b); }); }

    selectAll(("g.d3plus-" + (this._name) + "-hover > *, g.d3plus-" + (this._name) + "-active > *")).each(function(d) {
      if (d && d.parentNode) { d.parentNode.appendChild(this); }
      else { this.parentNode.removeChild(this); }
    });

    // Makes the update state of the group selection accessible.
    this._group = elem(("g.d3plus-" + (this._name) + "-group"), {parent: this._select});
    var update = this._update = elem(("g.d3plus-" + (this._name) + "-shape"), {parent: this._group, update: {opacity: this._active ? this._activeOpacity : 1}})
      .selectAll((".d3plus-" + (this._name)))
        .data(data, key);

    // Orders and transforms the updating Shapes.
    update.order().transition(this._transition)
      .call(this._applyTransform.bind(this));

    // Makes the enter state of the group selection accessible.
    var enter = this._enter = update.enter().append(this._tagName)
        .attr("class", function (d, i) { return ("d3plus-Shape d3plus-" + (this$1._name) + " d3plus-id-" + (strip(this$1._nestWrapper(this$1._id)(d, i)))); })
      .call(this._applyTransform.bind(this))
        .attr("opacity", this._nestWrapper(this._opacity));

    var enterUpdate = enter.merge(update);

    enterUpdate
        .attr("shape-rendering", this._nestWrapper(this._shapeRendering))
        .attr("pointer-events", "none")
      .transition(this._transition)
        .attr("opacity", this._nestWrapper(this._opacity))
      .transition()
        .attr("pointer-events", "all");

    // Makes the exit state of the group selection accessible.
    var exit = this._exit = update.exit();
    exit.transition().delay(this._duration).remove();

    this._renderImage();
    this._renderLabels();

    this._hoverGroup = elem(("g.d3plus-" + (this._name) + "-hover"), {parent: this._group});
    this._activeGroup = elem(("g.d3plus-" + (this._name) + "-active"), {parent: this._group});

    var that = this;

    var hitAreas = this._group.selectAll(".d3plus-HitArea")
      .data(this._hitArea ? data : [], key);

    hitAreas.order().transition(this._transition)
      .call(this._applyTransform.bind(this));

    var hitEnter = hitAreas.enter().append("rect")
        .attr("class", function (d, i) { return ("d3plus-HitArea d3plus-id-" + (strip(this$1._nestWrapper(this$1._id)(d, i)))); })
        .attr("fill", "transparent")
      .call(this._applyTransform.bind(this));

    var hitUpdates = hitAreas.merge(hitEnter)
      .each(function(d) {
        var h = that._hitArea(d, that._data.indexOf(d), that._aes(d, that._data.indexOf(d)));
        return h ? select(this).call(attrize, h) : select(this).remove();
      });

    hitAreas.exit().remove();

    this._applyEvents(this._hitArea ? hitUpdates : enterUpdate);
    this.active(this._active);

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight accessor.
      @param {Function} [*value*]
      @chainable
  */
  Shape.prototype.active = function active$$1 (_) {

    if (!arguments.length || _ === void 0) { return this._active; }
    this._active = _;

    var that = this;

    this._group.selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox")
      .each(function(d, i) {

        if (!d.parentNode) { d.parentNode = this.parentNode; }
        var parent = d.parentNode;

        if (this.tagName === "text") { d = d.data; }
        if (d.__d3plusShape__ || d.__d3plus__) {
          i = d.i;
          d = d.data;
        }
        else { i = that._data.indexOf(d); }

        var group = !_ || typeof _ !== "function" || !_(d, i) ? parent : that._activeGroup.node();
        if (group !== this.parentNode) {
          group.appendChild(this);
          if (this.className.baseVal.includes("d3plus-Shape")) {
            if (parent === group) { select(this).call(that._applyStyle.bind(that)); }
            else { select(this).call(that._applyActive.bind(that)); }
          }
        }

      });

    this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text"))
      .attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);

    return this;

  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the active opacity to the specified function and returns the current class instance. If *value* is not specified, returns the current active opacity.
      @param {Number} [*value* = 0.75]
      @chainable
  */
  Shape.prototype.activeOpacity = function activeOpacity (_) {
    return arguments.length ? (this._activeOpacity = _, this) : this._activeOpacity;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current background-image accessor.
      @param {Function|String} [*value* = false]
      @chainable
  */
  Shape.prototype.backgroundImage = function backgroundImage (_) {
    return arguments.length
         ? (this._backgroundImage = typeof _ === "function" ? _ : constant$7(_), this)
         : this._backgroundImage;
  };

  /**
      @memberof Shape
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  Shape.prototype.data = function data (_) {
    return arguments.length
         ? (this._data = _, this)
         : this._data;
  };

  /**
      @memberof Shape
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
      @chainable
  */
  Shape.prototype.duration = function duration (_) {
    return arguments.length
         ? (this._duration = _, this)
         : this._duration;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current fill accessor.
      @param {Function|String} [*value* = "black"]
      @chainable
  */
  Shape.prototype.fill = function fill (_) {
    return arguments.length
         ? (this._fill = typeof _ === "function" ? _ : constant$7(_), this)
         : this._fill;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
      @chainable
  */
  Shape.prototype.fontColor = function fontColor (_) {
    return arguments.length
         ? (this._fontColor = typeof _ === "function" ? _ : constant$7(_), this)
         : this._fontColor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "Verdana"]
      @chainable
  */
  Shape.prototype.fontFamily = function fontFamily (_) {
    return arguments.length
         ? (this._fontFamily = typeof _ === "function" ? _ : constant$7(_), this)
         : this._fontFamily;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns the current class instance. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Boolean|Array} [*value*]
      @chainable
  */
  Shape.prototype.fontResize = function fontResize (_) {
    return arguments.length
         ? (this._fontResize = typeof _ === "function" ? _ : constant$7(_), this)
         : this._fontResize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = 12]
      @chainable
  */
  Shape.prototype.fontSize = function fontSize (_) {
    return arguments.length
         ? (this._fontSize = typeof _ === "function" ? _ : constant$7(_), this)
         : this._fontSize;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight accessor.
      @param {Function} [*value*]
      @chainable
  */
  Shape.prototype.hover = function hover (_) {

    if (!arguments.length || _ === void 0) { return this._hover; }
    this._hover = _;

    var that = this;

    this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text, g.d3plus-" + (this._name) + "-hover"))
      .selectAll(".d3plus-Shape, .d3plus-Image, .d3plus-textBox")
      .each(function(d, i) {

        if (!d.parentNode) { d.parentNode = this.parentNode; }
        var parent = d.parentNode;

        if (this.tagName === "text") { d = d.data; }
        if (d.__d3plusShape__ || d.__d3plus__) {
          i = d.i;
          d = d.data;
        }
        else { i = that._data.indexOf(d); }

        var group = !_ || typeof _ !== "function" || !_(d, i) ? parent : that._hoverGroup.node();
        if (group !== this.parentNode) { group.appendChild(this); }

      });

    this._group.selectAll(("g.d3plus-" + (this._name) + "-shape, g.d3plus-" + (this._name) + "-image, g.d3plus-" + (this._name) + "-text"))
      .attr("opacity", this._hover ? this._hoverOpacity : this._active ? this._activeOpacity : 1);

    return this;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the hover opacity to the specified function and returns the current class instance. If *value* is not specified, returns the current hover opacity.
      @param {Number} [*value* = 0.5]
      @chainable
  */
  Shape.prototype.hoverOpacity = function hoverOpacity (_) {
    return arguments.length ? (this._hoverOpacity = _, this) : this._hoverOpacity;
  };

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
  Shape.prototype.hitArea = function hitArea (_) {
    return arguments.length
         ? (this._hitArea = typeof _ === "function" ? _ : constant$7(_), this)
         : this._hitArea;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @chainable
  */
  Shape.prototype.id = function id (_) {
    return arguments.length
         ? (this._id = _, this)
         : this._id;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.
      @param {Function|String|Array} [*value*]
      @chainable
  */
  Shape.prototype.label = function label (_) {
    return arguments.length
         ? (this._label = typeof _ === "function" ? _ : constant$7(_), this)
         : this._label;
  };

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
  Shape.prototype.labelBounds = function labelBounds (_) {
    return arguments.length
         ? (this._labelBounds = typeof _ === "function" ? _ : constant$7(_), this)
         : this._labelBounds;
  };

  /**
      @memberof Shape
      @desc Specifies the rotation angle, in degrees, of a shape's label. If *value* is not specified, returns the current label rotation. If an array is passed or returned from the function, each value will be used consecutively with each label.
      @param {Function|Number|Array} [angle = 0]
      @chainable
  */
  Shape.prototype.labelRotate = function labelRotate (_) {
    return arguments.length
         ? (this._labelRotate = typeof _ === "function" ? _ : constant$7(_), this)
         : this._labelRotate;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label padding to the specified number and returns the current class instance. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Number|Array} [*value* = 10]
      @chainable
  */
  Shape.prototype.labelPadding = function labelPadding (_) {
    return arguments.length
         ? (this._labelPadding = typeof _ === "function" ? _ : constant$7(_), this)
         : this._labelPadding;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
      @chainable
  */
  Shape.prototype.lineHeight = function lineHeight (_) {
    return arguments.length
         ? (this._lineHeight = typeof _ === "function" ? _ : constant$7(_), this)
         : this._lineHeight;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current opacity accessor.
      @param {Number} [*value* = 1]
      @chainable
  */
  Shape.prototype.opacity = function opacity (_) {
    return arguments.length
         ? (this._opacity = typeof _ === "function" ? _ : constant$7(_), this)
         : this._opacity;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current scale accessor.
      @param {Function|Number} [*value* = 1]
      @chainable
  */
  Shape.prototype.scale = function scale (_) {
    return arguments.length
         ? (this._scale = typeof _ === "function" ? _ : constant$7(_), this)
         : this._scale;
  };

  /**
      @memberof Shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Shape.prototype.select = function select$1 (_) {
    return arguments.length
         ? (this._select = select(_), this)
         : this._select;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape-rendering accessor.
      @param {Function|String} [*value* = "geometricPrecision"]
      @chainable
      @example
function(d) {
  return d.x;
}
  */
  Shape.prototype.shapeRendering = function shapeRendering (_) {
    return arguments.length
         ? (this._shapeRendering = typeof _ === "function" ? _ : constant$7(_), this)
         : this._shapeRendering;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the sort comparator to the specified function and returns the current class instance. If *value* is not specified, returns the current sort comparator.
      @param {false|Function} [*value* = []]
      @chainable
  */
  Shape.prototype.sort = function sort (_) {
    return arguments.length
         ? (this._sort = _, this)
         : this._sort;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke accessor.
      @param {Function|String} [*value* = "black"]
      @chainable
  */
  Shape.prototype.stroke = function stroke (_) {
    return arguments.length
         ? (this._stroke = typeof _ === "function" ? _ : constant$7(_), this)
         : this._stroke;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke-width accessor.
      @param {Function|Number} [*value* = 0]
      @chainable
  */
  Shape.prototype.strokeWidth = function strokeWidth (_) {
    return arguments.length
         ? (this._strokeWidth = typeof _ === "function" ? _ : constant$7(_), this)
         : this._strokeWidth;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
      @chainable
  */
  Shape.prototype.textAnchor = function textAnchor (_) {
    return arguments.length
         ? (this._textAnchor = typeof _ === "function" ? _ : constant$7(_), this)
         : this._textAnchor;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vector-effect accessor.
      @param {Function|String} [*value* = "non-scaling-stroke"]
      @chainable
  */
  Shape.prototype.vectorEffect = function vectorEffect (_) {
    return arguments.length
         ? (this._vectorEffect = typeof _ === "function" ? _ : constant$7(_), this)
         : this._vectorEffect;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
      @chainable
  */
  Shape.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length
         ? (this._verticalAlign = typeof _ === "function" ? _ : constant$7(_), this)
         : this._verticalAlign;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.x;
}
  */
  Shape.prototype.x = function x (_) {
    return arguments.length
         ? (this._x = typeof _ === "function" ? _ : constant$7(_), this)
         : this._x;
  };

  /**
      @memberof Shape
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.y;
}
  */
  Shape.prototype.y = function y (_) {
    return arguments.length
         ? (this._y = typeof _ === "function" ? _ : constant$7(_), this)
         : this._y;
  };

  return Shape;
}(BaseClass));

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
  A: ['rx', 'ry', 'xAxisRotation', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
};

/**
 * Convert to object representation of the command from a string
 *
 * @param {String} commandString Token string from the `d` attribute (e.g., L0,0)
 * @return {Object} An object representing this command.
 */
function commandObject(commandString) {
  // convert all spaces to commas
  commandString = commandString.trim().replace(/ /g, ',');

  var type = commandString[0];
  var args = commandString.substring(1).split(',');
  return typeMap[type.toUpperCase()].reduce(function (obj, param, i) {
    // parse X as float since we need it to do distance checks for extending points
    obj[param] = param === 'x' ? parseFloat(args[i]) : args[i];
    return obj;
  }, { type: type });
}

/**
 * Converts a command object to a string to be used in a `d` attribute
 * @param {Object} command A command object
 * @return {String} The string for the `d` attribute
 */
function commandToString(command) {
  var type = command.type;
  var params = typeMap[type.toUpperCase()];
  return ("" + type + (params.map(function (p) { return command[p]; }).join(',')));
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
    y2: 'y',
  };

  var readFromBKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag'];

  // convert (but ignore M types)
  if (aCommand.type !== bCommand.type && bCommand.type.toUpperCase() !== 'M') {
    var aConverted = {};
    Object.keys(bCommand).forEach(function (bKey) {
      var bValue = bCommand[bKey];
      // first read from the A command
      var aValue = aCommand[bKey];

      // if it is one of these values, read from B no matter what
      if (aValue === undefined) {
        if (readFromBKeys.includes(bKey)) {
          aValue = bValue;
        } else {
          // if it wasn't in the A command, see if an equivalent was
          if (aValue === undefined && conversionMap[bKey]) {
            aValue = aCommand[conversionMap[bKey]];
          }

          // if it doesn't have a converted value, use 0
          if (aValue === undefined) {
            aValue = 0;
          }
        }
      }

      aConverted[bKey] = aValue;
    });

    // update the type to match B
    aConverted.type = bCommand.type;
    aCommand = aConverted;
  }

  return aCommand;
}

/**
 * Extends an array of commands to the length of the second array
 * inserting points at the spot that is closest by X value. Ensures
 * all the points of commandsToExtend are in the extended array and that
 * only numPointsToExtend points are added.
 *
 * @param {Object[]} commandsToExtend The commands array to extend
 * @param {Object[]} referenceCommands The commands array to match
 * @return {Object[]} The extended commands1 array
 */
function extend$1(commandsToExtend, referenceCommands, numPointsToExtend) {
  // map each command in B to a command in A by counting how many times ideally
  // a command in A was in the initial path (see https://github.com/pbeshai/d3-interpolate-path/issues/8)
  var initialCommandIndex;
  if (commandsToExtend.length > 1 && commandsToExtend[0].type === 'M') {
    initialCommandIndex = 1;
  } else {
    initialCommandIndex = 0;
  }

  var counts = referenceCommands.reduce(function (counts, refCommand, i) {
    // skip first M
    if (i === 0 && refCommand.type === 'M') {
      counts[0] = 1;
      return counts;
    }

    var minDistance = Math.abs(commandsToExtend[initialCommandIndex].x - refCommand.x);
    var minCommand = initialCommandIndex;

    // find the closest point by X position in A
    for (var j = initialCommandIndex + 1; j < commandsToExtend.length; j++) {
      var distance = Math.abs(commandsToExtend[j].x - refCommand.x);
      if (distance < minDistance) {
        minDistance = distance;
        minCommand = j;
      // since we assume sorted by X, once we find a value farther, we can return the min.
      } else {
        break;
      }
    }

    counts[minCommand] = (counts[minCommand] || 0) + 1;
    return counts;
  }, {});

  // now extend the array adding in at the appropriate place as needed
  var extended = [];
  var numExtended = 0;
  for (var i = 0; i < commandsToExtend.length; i++) {
    // add in the initial point for this A command
    extended.push(commandsToExtend[i]);

    for (var j = 1; j < counts[i] && numExtended < numPointsToExtend; j++) {
      var commandToAdd = Object.assign({}, commandsToExtend[i]);
      // don't allow multiple Ms
      if (commandToAdd.type === 'M') {
        commandToAdd.type = 'L';
      } else {
        // try to set control points to x and y
        if (commandToAdd.x1 !== undefined) {
          commandToAdd.x1 = commandToAdd.x;
          commandToAdd.y1 = commandToAdd.y;
        }

        if (commandToAdd.x2 !== undefined) {
          commandToAdd.x2 = commandToAdd.x;
          commandToAdd.y2 = commandToAdd.y;
        }
      }
      extended.push(commandToAdd);
      numExtended += 1;
    }
  }

  return extended;
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
 */
function interpolatePath(a, b) {
  // remove Z, remove spaces after letters as seen in IE
  var aNormalized = a == null ? '' : a.replace(/[Z]/gi, '').replace(/([MLCSTQAHV])\s*/gi, '$1');
  var bNormalized = b == null ? '' : b.replace(/[Z]/gi, '').replace(/([MLCSTQAHV])\s*/gi, '$1');
  var aPoints = aNormalized === '' ? [] : aNormalized.split(/(?=[MLCSTQAHV])/gi);
  var bPoints = bNormalized === '' ? [] : bNormalized.split(/(?=[MLCSTQAHV])/gi);

  // if both are empty, interpolation is always the empty string.
  if (!aPoints.length && !bPoints.length) {
    return function nullInterpolator() {
      return '';
    };
  }

  // if A is empty, treat it as if it used to contain just the first point
  // of B. This makes it so the line extends out of from that first point.
  if (!aPoints.length) {
    aPoints.push(bPoints[0]);

  // otherwise if B is empty, treat it as if it contains the first point
  // of A. This makes it so the line retracts into the first point.
  } else if (!bPoints.length) {
    bPoints.push(aPoints[0]);
  }

  // convert to command objects so we can match types
  var aCommands = aPoints.map(commandObject);
  var bCommands = bPoints.map(commandObject);

  // extend to match equal size
  var numPointsToExtend = Math.abs(bPoints.length - aPoints.length);

  if (numPointsToExtend !== 0) {
    // B has more points than A, so add points to A before interpolating
    if (bCommands.length > aCommands.length) {
      aCommands = extend$1(aCommands, bCommands, numPointsToExtend);

    // else if A has more points than B, add more points to B
    } else if (bCommands.length < aCommands.length) {
      bCommands = extend$1(bCommands, aCommands, numPointsToExtend);
    }
  }

  // commands have same length now.
  // convert A to the same type of B
  aCommands = aCommands.map(function (aCommand, i) { return convertToSameType(aCommand, bCommands[i]); });

  var aProcessed = aCommands.map(commandToString).join('');
  var bProcessed = bCommands.map(commandToString).join('');

  // if both A and B end with Z add it back in
  if ((a == null || a[a.length - 1] === 'Z') &&
      (b == null || b[b.length - 1] === 'Z')) {
    aProcessed += 'Z';
    bProcessed += 'Z';
  }

  var stringInterpolator = interpolateString(aProcessed, bProcessed);

  return function pathInterpolator(t) {
    // at 1 return the final value without the extensions used during interpolation
    if (t === 1) {
      return b == null ? '' : b;
    }

    return stringInterpolator(t);
  };
}

var pi$2 = Math.PI;
var tau$2 = 2 * pi$2;
var epsilon$1 = 1e-6;
var tauEpsilon = tau$2 - epsilon$1;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) { throw new Error("negative radius: " + r); }

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) { throw new Error("negative radius: " + r); }

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) { return; }

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Otherwise, draw an arc!
    else {
      if (da < 0) { da = da % tau$2 + tau$2; }
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$2)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

var constant$8 = function(x) {
  return function constant() {
    return x;
  };
};

var epsilon$2 = 1e-12;
var pi$3 = Math.PI;
var halfPi$2 = pi$3 / 2;
var tau$3 = 2 * pi$3;

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

function asin$1(x) {
  return x >= 1 ? halfPi$2 : x <= -1 ? -halfPi$2 : Math.asin(x);
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01),
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
      d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) { cx0 = cx1, cy0 = cy1; }

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

var arc = function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant$8(0),
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
        a0 = startAngle.apply(this, arguments) - halfPi$2,
        a1 = endAngle.apply(this, arguments) - halfPi$2,
        da = Math.abs(a1 - a0),
        cw = a1 > a0;

    if (!context) { context = buffer = path(); }

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) { r = r1, r1 = r0, r0 = r; }

    // Is it a point?
    if (!(r1 > epsilon$2)) { context.moveTo(0, 0); }

    // Or is it a circle or annulus?
    else if (da > tau$3 - epsilon$2) {
      context.moveTo(r1 * Math.cos(a0), r1 * Math.sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$2) {
        context.moveTo(r0 * Math.cos(a1), r0 * Math.sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$2) && (padRadius ? +padRadius.apply(this, arguments) : Math.sqrt(r0 * r0 + r1 * r1)),
          rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$2) {
        var p0 = asin$1(rp / r0 * Math.sin(ap)),
            p1 = asin$1(rp / r1 * Math.sin(ap));
        if ((da0 -= p0 * 2) > epsilon$2) { p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0; }
        else { da0 = 0, a00 = a10 = (a0 + a1) / 2; }
        if ((da1 -= p1 * 2) > epsilon$2) { p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1; }
        else { da1 = 0, a01 = a11 = (a0 + a1) / 2; }
      }

      var x01 = r1 * Math.cos(a01),
          y01 = r1 * Math.sin(a01),
          x10 = r0 * Math.cos(a10),
          y10 = r0 * Math.sin(a10);

      // Apply rounded corners?
      if (rc > epsilon$2) {
        var x11 = r1 * Math.cos(a11),
            y11 = r1 * Math.sin(a11),
            x00 = r0 * Math.cos(a00),
            y00 = r0 * Math.sin(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < pi$3) {
          var oc = da0 > epsilon$2 ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2),
              lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$2)) { context.moveTo(x01, y01); }

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$2) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) { context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw); }

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else { context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw); }

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$2) || !(da0 > epsilon$2)) { context.lineTo(x10, y10); }

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$2) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) { context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t1.y01, t1.x01), !cw); }

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, Math.atan2(t0.y01, t0.x01), Math.atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, Math.atan2(t0.cy + t0.y11, t0.cx + t0.x11), Math.atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, Math.atan2(t1.y11, t1.x11), Math.atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else { context.arc(0, 0, r0, a10, a00, cw); }
    }

    context.closePath();

    if (buffer) { return context = null, buffer + "" || null; }
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$3 / 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant$8(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant$8(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant$8(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant$8(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$8(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$8(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$8(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
};

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

var curveLinear = function(context) {
  return new Linear(context);
};

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

var line = function() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant$8(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) { output = curve(buffer = path()); }

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) { output.lineStart(); }
        else { output.lineEnd(); }
      }
      if (defined0) { output.point(+x$$1(d, i, data), +y$$1(d, i, data)); }
    }

    if (buffer) { return output = null, buffer + "" || null; }
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant$8(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant$8(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$8(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
};

var area$1 = function() {
  var x0 = x,
      x1 = null,
      y0 = constant$8(0),
      y1 = y,
      defined = constant$8(true),
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

    if (context == null) { output = curve(buffer = path()); }

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

    if (buffer) { return output = null, buffer + "" || null; }
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$8(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$8(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$8(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$8(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$8(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$8(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant$8(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
};

var descending$1 = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};

var identity$8 = function(d) {
  return d;
};

var pie = function() {
  var value = identity$8,
      sortValues = descending$1,
      sort = null,
      startAngle = constant$8(0),
      endAngle = constant$8(tau$3),
      padAngle = constant$8(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$3, Math.max(-tau$3, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) { index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); }); }
    else if (sort != null) { index.sort(function(i, j) { return sort(data[i], data[j]); }); }

    // Compute the arcs! They are stored in the original data's order.
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

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$8(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant$8(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant$8(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant$8(+_), pie) : padAngle;
  };

  return pie;
};

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
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

function radialLine(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

var radialLine$1 = function() {
  return radialLine(line().curve(curveRadialLinear));
};

var radialArea = function() {
  var a = area$1().curve(curveRadialLinear),
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
  a.lineStartAngle = function() { return radialLine(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return radialLine(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return radialLine(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return radialLine(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
};

var circle$2 = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi$3);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$3);
  }
};

var cross = {
  draw: function(context, size) {
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

var tan30 = Math.sqrt(1 / 3);
var tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810;
var kr = Math.sin(pi$3 / 10) / Math.sin(7 * pi$3 / 10);
var kx = Math.sin(tau$3 / 10) * kr;
var ky = -Math.cos(tau$3 / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau$3 * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5;
var s$1 = Math.sqrt(3) / 2;
var k = 1 / Math.sqrt(12);
var a$1 = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a$1),
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

var symbols = [
  circle$2,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

var symbol = function() {
  var type = constant$8(circle$2),
      size = constant$8(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) { context = buffer = path(); }
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) { return context = null, buffer + "" || null; }
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$8(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$8(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
};

var noop$3 = function() {};

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$2(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basis$2 = function(context) {
  return new Basis(context);
};

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisClosed$1 = function(context) {
  return new BasisClosed(context);
};

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

var basisOpen = function(context) {
  return new BasisOpen(context);
};

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var this$1 = this;

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
        this$1._basis.point(
          this$1._beta * x[i] + (1 - this$1._beta) * (x0 + t * dx),
          this$1._beta * y[i] + (1 - this$1._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
}))(0.85);

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$3(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function point$4(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$2) {
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
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$4(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop$3,
  areaEnd: noop$3,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) { this._context.closePath(); }
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) { this._context.lineTo(x, y); }
    else { this._point = 1, this._context.moveTo(x, y); }
  }
};

var linearClosed = function(context) {
  return new LinearClosed(context);
};

function sign$1(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign$1(s0) + sign$1(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$5(that, t0, t1) {
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
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$5(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) { return; } // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$5(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$5(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
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
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var this$1 = this;

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
          this$1._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) { this._context.closePath(); }
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) { a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1]; }
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) { m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1]; }
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) { a[i] = (r[i] - a[i + 1]) / b[i]; }
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) { b[i] = 2 * x[i + 1] - a[i + 1]; }
  return [a, b];
}

var natural = function(context) {
  return new Natural(context);
};

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) { this._context.lineTo(this._x, this._y); }
    if (this._line || (this._line !== 0 && this._point === 1)) { this._context.closePath(); }
    if (this._line >= 0) { this._t = 1 - this._t, this._line = 1 - this._line; }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
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

var step = function(context) {
  return new Step(context, 0.5);
};

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

var slice$2 = Array.prototype.slice;

var none$1 = function(series, order) {
  if (!((n = series.length) > 1)) { return; }
  for (var i = 1, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (var j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
};

var none$2 = function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) { o[n] = n; }
  return o;
};

function stackValue(d, key) {
  return d[key];
}

var stack = function() {
  var keys = constant$8([]),
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

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$8(slice$2.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$8(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$2 : typeof _ === "function" ? _ : constant$8(slice$2.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none$1 : _, stack) : offset;
  };

  return stack;
};

var expand = function(series, order) {
  if (!((n = series.length) > 0)) { return; }
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) { y += series[i][j][1] || 0; }
    if (y) { for (i = 0; i < n; ++i) { series[i][j][1] /= y; } }
  }
  none$1(series, order);
};

var silhouette = function(series, order) {
  if (!((n = series.length) > 0)) { return; }
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) { y += series[i][j][1] || 0; }
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none$1(series, order);
};

var wiggle = function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) { return; }
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
    if (s1) { y -= s2 / s1; }
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none$1(series, order);
};

var ascending$2 = function(series) {
  var sums = series.map(sum$2);
  return none$2(series).sort(function(a, b) { return sums[a] - sums[b]; });
};

function sum$2(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) { if (v = +series[i][1]) { s += v; } }
  return s;
}

var descending$2 = function(series) {
  return ascending$2(series).reverse();
};

var insideOut = function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum$2),
      order = none$2(series).sort(function(a, b) { return sums[b] - sums[a]; }),
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
};

var reverse$1 = function(series) {
  return none$2(series).reverse();
};



var paths = Object.freeze({
	arc: arc,
	area: area$1,
	line: line,
	pie: pie,
	radialArea: radialArea,
	radialLine: radialLine$1,
	symbol: symbol,
	symbols: symbols,
	symbolCircle: circle$2,
	symbolCross: cross,
	symbolDiamond: diamond,
	symbolSquare: square,
	symbolStar: star,
	symbolTriangle: triangle,
	symbolWye: wye,
	curveBasisClosed: basisClosed$1,
	curveBasisOpen: basisOpen,
	curveBasis: basis$2,
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
	stackOffsetNone: none$1,
	stackOffsetSilhouette: silhouette,
	stackOffsetWiggle: wiggle,
	stackOrderAscending: ascending$2,
	stackOrderDescending: descending$2,
	stackOrderInsideOut: insideOut,
	stackOrderNone: none$2,
	stackOrderReverse: reverse$1
});

var polygonArea = function(polygon) {
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
};

var polygonCentroid = function(polygon) {
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
};

// Returns the 2D cross product of AB and AC vectors, i.e., the z-component of
// the 3D cross product in a quadrant I Cartesian coordinate system (+x is
// right, +y is up). Returns a positive value if ABC is counter-clockwise,
// negative if clockwise, and zero if the points are collinear.
var cross$1 = function(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
};

function lexicographicOrder(a, b) {
  return a[0] - b[0] || a[1] - b[1];
}

// Computes the upper convex hull per the monotone chain algorithm.
// Assumes points.length >= 3, is sorted by x, unique in y.
// Returns an array of indices into points in left-to-right order.
function computeUpperHullIndexes(points) {
  var n = points.length,
      indexes = [0, 1],
      size = 2;

  for (var i = 2; i < n; ++i) {
    while (size > 1 && cross$1(points[indexes[size - 2]], points[indexes[size - 1]], points[i]) <= 0) { --size; }
    indexes[size++] = i;
  }

  return indexes.slice(0, size); // remove popped points
}

var polygonContains$1 = function(polygon, point) {
  var n = polygon.length,
      p = polygon[n - 1],
      x = point[0], y = point[1],
      x0 = p[0], y0 = p[1],
      x1, y1,
      inside = false;

  for (var i = 0; i < n; ++i) {
    p = polygon[i], x1 = p[0], y1 = p[1];
    if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) { inside = !inside; }
    x0 = x1, y0 = y1;
  }

  return inside;
};

/**
    @function lineIntersection
    @desc Finds the intersection point (if there is one) of the lines p1q1 and p2q2.
    @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
var lineIntersection = function(p1, q1, p2, q2) {

  // allow for some margins due to numerical errors
  var eps = 1e-9;

  // find the intersection point between the two infinite lines
  var dx1 = p1[0] - q1[0],
        dx2 = p2[0] - q2[0],
        dy1 = p1[1] - q1[1],
        dy2 = p2[1] - q2[1];

  var denom = dx1 * dy2 - dy1 * dx2;

  if (Math.abs(denom) < eps) { return null; }

  var cross1 = p1[0] * q1[1] - p1[1] * q1[0],
        cross2 = p2[0] * q2[1] - p2[1] * q2[0];

  var px = (cross1 * dx2 - cross2 * dx1) / denom,
        py = (cross1 * dy2 - cross2 * dy1) / denom;

  return [px, py];

};

/**
    @function segmentBoxContains
    @desc Checks whether a point is inside the bounding box of a line segment.
    @param {Array} s1 The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
    @param {Array} s2 The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
    @param {Array} p The point to be checked, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
var segmentBoxContains = function(s1, s2, p) {

  var eps = 1e-9;
  var px = p[0];
  var py = p[1];

  return !(px < Math.min(s1[0], s2[0]) - eps || px > Math.max(s1[0], s2[0]) + eps ||
           py < Math.min(s1[1], s2[1]) - eps || py > Math.max(s1[1], s2[1]) + eps);

};

/**
    @function segmentsIntersect
    @desc Checks whether the line segments p1q1 && p2q2 intersect.
    @param {Array} p1 The first point of the first line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} q1 The second point of the first line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The first point of the second line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} q2 The second point of the second line segment, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
var segmentsIntersect = function(p1, q1, p2, q2) {

  var p = lineIntersection(p1, q1, p2, q2);
  if (!p) { return false; }
  return segmentBoxContains(p1, q1, p) && segmentBoxContains(p2, q2, p);

};

/**
    @function polygonInside
    @desc Checks if one polygon is inside another polygon.
    @param {Array} polyA An Array of `[x, y]` points to be used as the inner polygon, checking if it is inside polyA.
    @param {Array} polyB An Array of `[x, y]` points to be used as the containing polygon.
    @returns {Boolean}
*/
var polygonInside = function(polyA, polyB) {

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
      if (segmentsIntersect(aA, bA, aB, bB)) { return false; }
    }
  }

  return polygonContains$1(polyB, polyA[0]);

};

/**
    @function polygonRayCast
    @desc Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.
    @param {Array} poly The polygon to test against, which should be an `[x, y]` formatted Array.
    @param {Array} origin The origin point of the ray to be cast, which should be an `[x, y]` formatted Array.
    @param {Number} [alpha = 0] The angle in radians of the ray.
    @returns {Array} An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.
*/
var polygonRayCast = function(poly, origin, alpha) {
  if ( alpha === void 0 ) alpha = 0;


  var eps = 1e-9;
  origin = [origin[0] + eps * Math.cos(alpha), origin[1] + eps * Math.sin(alpha)];
  var x0 = origin[0];
  var y0 = origin[1];
  var shiftedOrigin = [x0 + Math.cos(alpha), y0 + Math.sin(alpha)];

  var idx = 0;
  if (Math.abs(shiftedOrigin[0] - x0) < eps) { idx = 1; }
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
      }
      else if (p[idx] > origin[idx]) {
        if (sqDist < minSqDistRight) {
          minSqDistRight = sqDist;
          closestPointRight = p;
        }
      }
    }
  }

  return [closestPointLeft, closestPointRight];

};

/**
    @function pointRotate
    @desc Rotates a point around a given origin.
    @param {Array} p The point to be rotated, which should always be an `[x, y]` formatted Array.
    @param {Number} alpha The angle in radians to rotate.
    @param {Array} [origin = [0, 0]] The origin point of the rotation, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
var pointRotate = function(p, alpha, origin) {
  if ( origin === void 0 ) origin = [0, 0];


  var cosAlpha = Math.cos(alpha),
        sinAlpha = Math.sin(alpha),
        xshifted = p[0] - origin[0],
        yshifted = p[1] - origin[1];

  return [
    cosAlpha * xshifted - sinAlpha * yshifted + origin[0],
    sinAlpha * xshifted + cosAlpha * yshifted + origin[1]
  ];

};

/**
    @function polygonRotate
    @desc Rotates a point around a given origin.
    @param {Array} poly The polygon to be rotated, which should be an Array of `[x, y]` values.
    @param {Number} alpha The angle in radians to rotate.
    @param {Array} [origin = [0, 0]] The origin point of the rotation, which should be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
var polygonRotate = function (poly, alpha, origin) {
    if ( origin === void 0 ) origin = [0, 0];

    return poly.map(function (p) { return pointRotate(p, alpha, origin); });
};

// square distance from a point to a segment
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

    }
    else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }

  }

  dx = p[0] - x;
  dy = p[1] - y;

  return dx * dx + dy * dy;

}
// rest of the code doesn't care about point format

// basic distance-based simplification
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

  if (prevPoint !== point) { newPoints.push(point); }

  return newPoints;
}

function simplifyDPStep(poly, first, last, sqTolerance, simplified) {

  var index, maxSqDist = sqTolerance;

  for (var i = first + 1; i < last; i++) {
    var sqDist = getSqSegDist(poly[i], poly[first], poly[last]);

    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (maxSqDist > sqTolerance) {
    if (index - first > 1) { simplifyDPStep(poly, first, index, sqTolerance, simplified); }
    simplified.push(poly[index]);
    if (last - index > 1) { simplifyDPStep(poly, index, last, sqTolerance, simplified); }
  }
}

// simplification using Ramer-Douglas-Peucker algorithm
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
var simplify = function (poly, tolerance, highestQuality) {
  if ( tolerance === void 0 ) tolerance = 1;
  if ( highestQuality === void 0 ) highestQuality = false;


  if (poly.length <= 2) { return poly; }

  var sqTolerance = tolerance * tolerance;

  poly = highestQuality ? poly : simplifyRadialDist(poly, sqTolerance);
  poly = simplifyDouglasPeucker(poly, sqTolerance);

  return poly;

};

// Algorithm constants
var aspectRatioStep = 0.5; // step size for the aspect ratio
var angleStep = 5; // step size for angles (in degrees); has linear impact on running time

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
    @return {LargestRect}
*/
var largestRect = function(poly, options) {
  if ( options === void 0 ) options = {};


  if (poly.length < 3) {
    if (options.verbose) { console.error("polygon has to have at least 3 points", poly); }
    return null;
  }

  // For visualization debugging purposes
  var events = [];

  // User's input normalization
  options = Object.assign({
    angle: d3Range(-90, 90 + angleStep, angleStep),
    maxAspectRatio: 15,
    minAspectRatio: 1,
    minHeight: 0,
    minWidth: 0,
    nTries: 20,
    tolerance: 0.02,
    verbose: false
  }, options);

  var angles = options.angle instanceof Array ? options.angle
               : typeof options.angle === "number" ? [options.angle]
               : typeof options.angle === "string" && !isNaN(options.angle) ? [Number(options.angle)]
               : [];

  var aspectRatios = options.aspectRatio instanceof Array ? options.aspectRatio
               : typeof options.aspectRatio === "number" ? [options.aspectRatio]
               : typeof options.aspectRatio === "string" && !isNaN(options.aspectRatio) ? [Number(options.aspectRatio)]
               : [];

  var origins = options.origin && options.origin instanceof Array
                ? options.origin[0] instanceof Array ? options.origin
                : [options.origin] : [];

  var area = Math.abs(polygonArea(poly)); // take absolute value of the signed area
  if (area === 0) {
    if (options.verbose) { console.error("polygon has 0 area", poly); }
    return null;
  }
  // get the width of the bounding box of the original polygon to determine tolerance
  var ref = extent(poly, function (d) { return d[0]; });
  var minx = ref[0];
  var maxx = ref[1];
  var ref$1 = extent(poly, function (d) { return d[1]; });
  var miny = ref$1[0];
  var maxy = ref$1[1];

  // simplify polygon
  var tolerance = Math.min(maxx - minx, maxy - miny) * options.tolerance;

  if (tolerance > 0) { poly = simplify(poly, tolerance); }
  if (options.events) { events.push({type: "simplify", poly: poly}); }

  // get the width of the bounding box of the simplified polygon
  var assign;
  (assign = extent(poly, function (d) { return d[0]; }), minx = assign[0], maxx = assign[1]);
  var assign$1;
  (assign$1 = extent(poly, function (d) { return d[1]; }), miny = assign$1[0], maxy = assign$1[1]);
  var ref$2 = [maxx - minx, maxy - miny];
  var boxWidth = ref$2[0];
  var boxHeight = ref$2[1];

  // discretize the binary search for optimal width to a resolution of this times the polygon width
  var widthStep = Math.min(boxWidth, boxHeight) / 50;

  // populate possible center points with random points inside the polygon
  if (!origins.length) {
    // get the centroid of the polygon
    var centroid = polygonCentroid(poly);
    if (isNaN(centroid[0])) {
      if (options.verbose) { console.error("cannot find centroid", poly); }
      return null;
    }
    if (polygonContains$1(poly, centroid)) { origins.push(centroid); }
    // get few more points inside the polygon
    while (origins.length < options.nTries) {
      var rndX = Math.random() * boxWidth + minx;
      var rndY = Math.random() * boxHeight + miny;
      var rndPoint = [rndX, rndY];
      if (polygonContains$1(poly, rndPoint)) { origins.push(rndPoint); }
    }
  }
  if (options.events) { events.push({type: "origins", points: origins}); }
  var maxArea = 0;
  var maxRect = null;

  for (var ai = 0; ai < angles.length; ai++) {
    var angle = angles[ai];
    var angleRad = -angle * Math.PI / 180;
    if (options.events) { events.push({type: "angle", angle: angle}); }
    for (var i = 0; i < origins.length; i++) {
      var origOrigin = origins[i];
      // generate improved origins
      var ref$3 = polygonRayCast(poly, origOrigin, angleRad);
      var p1W = ref$3[0];
      var p2W = ref$3[1];
      var ref$4 = polygonRayCast(poly, origOrigin, angleRad + Math.PI / 2);
      var p1H = ref$4[0];
      var p2H = ref$4[1];
      var modifOrigins = [];
      if (p1W && p2W) { modifOrigins.push([(p1W[0] + p2W[0]) / 2, (p1W[1] + p2W[1]) / 2]); } // average along with width axis
      if (p1H && p2H) { modifOrigins.push([(p1H[0] + p2H[0]) / 2, (p1H[1] + p2H[1]) / 2]); } // average along with height axis

      if (options.events) { events.push({type: "modifOrigin", idx: i, p1W: p1W, p2W: p2W, p1H: p1H, p2H: p2H, modifOrigins: modifOrigins}); }

      for (var i$1 = 0; i$1 < modifOrigins.length; i$1++) {

        var origin = modifOrigins[i$1];

        if (options.events) { events.push({type: "origin", cx: origin[0], cy: origin[1]}); }

        var ref$5 = polygonRayCast(poly, origin, angleRad);
        var p1W$1 = ref$5[0];
        var p2W$1 = ref$5[1];
        if (p1W$1 === null || p2W$1 === null) { continue; }
        var minSqDistW = Math.min(pointDistanceSquared(origin, p1W$1), pointDistanceSquared(origin, p2W$1));
        var maxWidth = 2 * Math.sqrt(minSqDistW);

        var ref$6 = polygonRayCast(poly, origin, angleRad + Math.PI / 2);
        var p1H$1 = ref$6[0];
        var p2H$1 = ref$6[1];
        if (p1H$1 === null || p2H$1 === null) { continue; }
        var minSqDistH = Math.min(pointDistanceSquared(origin, p1H$1), pointDistanceSquared(origin, p2H$1));
        var maxHeight = 2 * Math.sqrt(minSqDistH);

        if (maxWidth * maxHeight < maxArea) { continue; }

        var aRatios = aspectRatios;
        if (!aRatios.length) {
          var minAspectRatio = Math.max(options.minAspectRatio, options.minWidth / maxHeight, maxArea / (maxHeight * maxHeight));
          var maxAspectRatio = Math.min(options.maxAspectRatio, maxWidth / options.minHeight, maxWidth * maxWidth / maxArea);
          aRatios = d3Range(minAspectRatio, maxAspectRatio + aspectRatioStep, aspectRatioStep);
        }

        for (var a = 0; a < aRatios.length; a++) {

          var aRatio = aRatios[a];

          // do a binary search to find the max width that works
          var left = Math.max(options.minWidth, Math.sqrt(maxArea * aRatio));
          var right = Math.min(maxWidth, maxHeight * aRatio);
          if (right * maxHeight < maxArea) { continue; }

          if (options.events && right - left >= widthStep) { events.push({type: "aRatio", aRatio: aRatio}); }

          while (right - left >= widthStep) {
            var width = (left + right) / 2;
            var height = width / aRatio;
            var cx = origin[0];
            var cy = origin[1];
            var rectPoly = [
              [cx - width / 2, cy - height / 2],
              [cx + width / 2, cy - height / 2],
              [cx + width / 2, cy + height / 2],
              [cx - width / 2, cy + height / 2]
            ];
            rectPoly = polygonRotate(rectPoly, angleRad, origin);
            var insidePoly = polygonInside(rectPoly, poly);
            if (insidePoly) {
              // we know that the area is already greater than the maxArea found so far
              maxArea = width * height;
              rectPoly.push(rectPoly[0]);
              maxRect = {area: maxArea, cx: cx, cy: cy, width: width, height: height, angle: -angle, points: rectPoly};
              left = width; // increase the width in the binary search
            }
            else {
              right = width; // decrease the width in the binary search
            }
            if (options.events) { events.push({type: "rectangle", areaFraction: width * height / area, cx: cx, cy: cy, width: width, height: height, angle: angle, insidePoly: insidePoly}); }

          }

        }

      }

    }

  }

  return options.events ? Object.assign(maxRect || {}, {events: events}) : maxRect;

};

/**
    @class Area
    @extends Shape
    @desc Creates SVG areas based on an array of data.
*/
var Area = (function (Shape$$1) {
  function Area() {
    var this$1 = this;


    Shape$$1.call(this);

    this._curve = "linear";
    this._defined = function () { return true; };
    this._labelBounds = function (d, i, aes) {
      var r = largestRect(aes.points);
      if (!r) { return null; }
      return {angle: r.angle, width: r.width, height: r.height, x: r.cx - r.width / 2 - this$1._x(d, i), y: r.cy - r.height / 2 - this$1._y(d, i)};
    };
    this._name = "Area";
    this.textAnchor("middle");
    this.verticalAlign("middle");
    this._x = accessor("x");
    this._x0 = accessor("x");
    this._x1 = null;
    this._y = constant$7(0);
    this._y0 = constant$7(0);
    this._y1 = accessor("y");

  }

  if ( Shape$$1 ) Area.__proto__ = Shape$$1;
  Area.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Area.prototype.constructor = Area;

  /**
      @memberof Area
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Area.prototype._aes = function _aes (d) {
    var this$1 = this;

    var values$$1 = d.values.slice().sort(function (a, b) { return this$1._y1 ? this$1._x(a) - this$1._x(b) : this$1._y(a) - this$1._y(b); });
    var points1 = values$$1.map(function (v, z) { return [this$1._x0(v, z), this$1._y0(v, z)]; });
    var points2 = values$$1.reverse().map(function (v, z) { return this$1._y1 ? [this$1._x(v, z), this$1._y1(v, z)] : [this$1._x1(v, z), this$1._y(v, z)]; });
    var points = points1.concat(points2);
    if (points1[0][1] > points2[0][1]) { points = points.reverse(); }
    points.push(points[0]);
    return {points: points};
  };

  /**
      @memberof Area
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  Area.prototype._dataFilter = function _dataFilter (data) {
    var this$1 = this;


    var areas = nest().key(this._id).entries(data).map(function (d) {

      d.data = objectMerge(d.values);
      d.i = data.indexOf(d.values[0]);

      var x = extent(d.values.map(this$1._x)
        .concat(d.values.map(this$1._x0))
        .concat(this$1._x1 ? d.values.map(this$1._x1) : [])
      );
      d.xR = x;
      d.width = x[1] - x[0];
      d.x = x[0] + d.width / 2;

      var y = extent(d.values.map(this$1._y)
        .concat(d.values.map(this$1._y0))
        .concat(this$1._y1 ? d.values.map(this$1._y1) : [])
      );
      d.yR = y;
      d.height = y[1] - y[0];
      d.y = y[0] + d.height / 2;

      d.nested = true;
      d.translate = [d.x, d.y];
      d.__d3plusShape__ = true;

      return d;
    });

    areas.key = function (d) { return d.key; };
    return areas;

  };

  /**
      @memberof Area
      @desc Draws the area polygons.
      @param {Function} [*callback*]
      @chainable
  */
  Area.prototype.render = function render (callback) {

    Shape$$1.prototype.render.call(this, callback);

    var path = this._path = area$1()
      .defined(this._defined)
      .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
      .x(this._x).x0(this._x0).x1(this._x1)
      .y(this._y).y0(this._y0).y1(this._y1);

    var exitPath = area$1()
      .defined(function (d) { return d; })
      .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
      .x(this._x).x0(this._x0).x1(this._x1)
      .y(this._y).y0(this._y0).y1(this._y1);

    this._enter.append("path")
      .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
      .attr("d", function (d) { return path(d.values); })
      .call(this._applyStyle.bind(this));

    this._update.select("path").transition(this._transition)
      .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
      .attrTween("d", function(d) {
        return interpolatePath(select(this).attr("d"), path(d.values));
      })
      .call(this._applyStyle.bind(this));

    this._exit.select("path").transition(this._transition)
      .attrTween("d", function(d) {
        return interpolatePath(select(this).attr("d"), exitPath(d.values));
      });

    return this;

  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.
      @param {String} [*value* = "linear"]
      @chainable
  */
  Area.prototype.curve = function curve (_) {
    return arguments.length
         ? (this._curve = _, this)
         : this._curve;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
      @param {Function} [*value*]
      @chainable
  */
  Area.prototype.defined = function defined (_) {
    return arguments.length
         ? (this._defined = _, this)
         : this._defined;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Area.prototype.x = function x (_) {
    if (!arguments.length) { return this._x; }
    this._x = typeof _ === "function" ? _ : constant$7(_);
    this._x0 = this._x;
    return this;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Area.prototype.x0 = function x0 (_) {
    if (!arguments.length) { return this._x0; }
    this._x0 = typeof _ === "function" ? _ : constant$7(_);
    this._x = this._x0;
    return this;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.
      @param {Function|Number|null} [*value*]
      @chainable
  */
  Area.prototype.x1 = function x1 (_) {
    return arguments.length
         ? (this._x1 = typeof _ === "function" || _ === null ? _ : constant$7(_), this)
         : this._x1;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Area.prototype.y = function y (_) {
    if (!arguments.length) { return this._y; }
    this._y = typeof _ === "function" ? _ : constant$7(_);
    this._y0 = this._y;
    return this;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Area.prototype.y0 = function y0 (_) {
    if (!arguments.length) { return this._y0; }
    this._y0 = typeof _ === "function" ? _ : constant$7(_);
    this._y = this._y0;
    return this;
  };

  /**
      @memberof Area
      @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.
      @param {Function|Number|null} [*value*]
      @chainable
  */
  Area.prototype.y1 = function y1 (_) {
    return arguments.length
         ? (this._y1 = typeof _ === "function" || _ === null ? _ : constant$7(_), this)
         : this._y1;
  };

  return Area;
}(Shape));

/**
    @class Bar
    @extends Shape
    @desc Creates SVG areas based on an array of data.
*/
var Bar = (function (Shape$$1) {
  function Bar() {
    var this$1 = this;


    Shape$$1.call(this, "rect");

    this._name = "Bar";
    this._height = constant$7(10);
    this._labelBounds = function (d, i, s) { return ({
      width: s.width,
      height: s.height,
      x: this$1._x1 !== null ? this$1._getX(d, i) : -s.width / 2,
      y: this$1._x1 === null ? this$1._getY(d, i) : -s.height / 2
    }); };
    this._width = constant$7(10);
    this._x = accessor("x");
    this._x0 = accessor("x");
    this._x1 = null;
    this._y = constant$7(0);
    this._y0 = constant$7(0);
    this._y1 = accessor("y");

  }

  if ( Shape$$1 ) Bar.__proto__ = Shape$$1;
  Bar.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Bar.prototype.constructor = Bar;

  /**
      @memberof Bar
      @desc Draws the bars.
      @param {Function} [*callback*]
      @chainable
  */
  Bar.prototype.render = function render (callback) {
    var this$1 = this;


    Shape$$1.prototype.render.call(this, callback);

    this._enter
        .attr("width", function (d, i) { return this$1._x1 === null ? this$1._getWidth(d, i) : 0; })
        .attr("height", function (d, i) { return this$1._x1 !== null ? this$1._getHeight(d, i) : 0; })
        .attr("x", function (d, i) { return this$1._x1 === null ? -this$1._getWidth(d, i) / 2 : 0; })
        .attr("y", function (d, i) { return this$1._x1 !== null ? -this$1._getHeight(d, i) / 2 : 0; })
        .call(this._applyStyle.bind(this))
      .transition(this._transition)
        .call(this._applyPosition.bind(this));

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    this._exit.transition(this._transition)
      .attr("width", function (d, i) { return this$1._x1 === null ? this$1._getWidth(d, i) : 0; })
      .attr("height", function (d, i) { return this$1._x1 !== null ? this$1._getHeight(d, i) : 0; })
      .attr("x", function (d, i) { return this$1._x1 === null ? -this$1._getWidth(d, i) / 2 : 0; })
      .attr("y", function (d, i) { return this$1._x1 !== null ? -this$1._getHeight(d, i) / 2 : 0; });

    return this;

  };

  /**
      @memberof Bar
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Bar.prototype._aes = function _aes (d, i) {
    return {height: this._getHeight(d, i), width: this._getWidth(d, i)};
  };

  /**
      @memberof Bar
      @desc Provides the default positioning to the <rect> elements.
      @param {D3Selection} *elem*
      @private
  */
  Bar.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
      .attr("width", function (d, i) { return this$1._getWidth(d, i); })
      .attr("height", function (d, i) { return this$1._getHeight(d, i); })
      .attr("x", function (d, i) { return this$1._x1 !== null ? this$1._getX(d, i) : -this$1._getWidth(d, i) / 2; })
      .attr("y", function (d, i) { return this$1._x1 === null ? this$1._getY(d, i) : -this$1._getHeight(d, i) / 2; });
  };

  /**
      @memberof Bar
      @desc Calculates the height of the <rect> by assessing the x and y properties.
      @param {Object} *d*
      @param {Number} *i*
      @private
  */
  Bar.prototype._getHeight = function _getHeight (d, i) {
    if (this._x1 !== null) { return this._height(d, i); }
    return Math.abs(this._y1(d, i) - this._y(d, i));
  };

  /**
      @memberof Bar
      @desc Calculates the width of the <rect> by assessing the x and y properties.
      @param {Object} *d*
      @param {Number} *i*
      @private
  */
  Bar.prototype._getWidth = function _getWidth (d, i) {
    if (this._x1 === null) { return this._width(d, i); }
    return Math.abs(this._x1(d, i) - this._x(d, i));
  };

  /**
      @memberof Bar
      @desc Calculates the x of the <rect> by assessing the x and width properties.
      @param {Object} *d*
      @param {Number} *i*
      @private
  */
  Bar.prototype._getX = function _getX (d, i) {
    var w = this._x1 === null ? this._x(d, i) : this._x1(d, i) - this._x(d, i);
    if (w < 0) { return w; }
    else { return 0; }
  };

  /**
      @memberof Bar
      @desc Calculates the y of the <rect> by assessing the y and height properties.
      @param {Object} *d*
      @param {Number} *i*
      @private
  */
  Bar.prototype._getY = function _getY (d, i) {
    var h = this._x1 !== null ? this._y(d, i) : this._y1(d, i) - this._y(d, i);
    if (h < 0) { return h; }
    else { return 0; }
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.height;
}
  */
  Bar.prototype.height = function height (_) {
    return arguments.length
         ? (this._height = typeof _ === "function" ? _ : constant$7(_), this)
         : this._height;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.width;
}
  */
  Bar.prototype.width = function width (_) {
    return arguments.length
         ? (this._width = typeof _ === "function" ? _ : constant$7(_), this)
         : this._width;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Bar.prototype.x0 = function x0 (_) {
    if (!arguments.length) { return this._x0; }
    this._x0 = typeof _ === "function" ? _ : constant$7(_);
    this._x = this._x0;
    return this;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.
      @param {Function|Number|null} [*value*]
      @chainable
  */
  Bar.prototype.x1 = function x1 (_) {
    return arguments.length
         ? (this._x1 = typeof _ === "function" || _ === null ? _ : constant$7(_), this)
         : this._x1;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Bar.prototype.y0 = function y0 (_) {
    if (!arguments.length) { return this._y0; }
    this._y0 = typeof _ === "function" ? _ : constant$7(_);
    this._y = this._y0;
    return this;
  };

  /**
      @memberof Bar
      @desc If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.
      @param {Function|Number|null} [*value*]
      @chainable
  */
  Bar.prototype.y1 = function y1 (_) {
    return arguments.length
         ? (this._y1 = typeof _ === "function" || _ === null ? _ : constant$7(_), this)
         : this._y1;
  };

  return Bar;
}(Shape));

/**
    @class Circle
    @extends Shape
    @desc Creates SVG circles based on an array of data.
*/
var Circle = (function (Shape$$1) {
  function Circle() {
    Shape$$1.call(this, "circle");
    this._name = "Circle";
    this._r = accessor("r");
  }

  if ( Shape$$1 ) Circle.__proto__ = Shape$$1;
  Circle.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Circle.prototype.constructor = Circle;

  /**
      @memberof Circle
      @desc Provides the default positioning to the <rect> elements.
      @private
  */
  Circle.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
      .attr("r", function (d, i) { return this$1._r(d, i); })
      .attr("x", function (d, i) { return -this$1._r(d, i) / 2; })
      .attr("y", function (d, i) { return -this$1._r(d, i) / 2; });
  };

  /**
      @memberof Circle
      @desc Draws the circles.
      @param {Function} [*callback*]
      @chainable
  */
  Circle.prototype.render = function render (callback) {

    Shape$$1.prototype.render.call(this, callback);

    this._enter
        .attr("r", 0).attr("x", 0).attr("y", 0)
        .call(this._applyStyle.bind(this))
      .transition(this._transition)
        .call(this._applyPosition.bind(this));

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    this._exit.transition(this._transition)
      .attr("r", 0).attr("x", 0).attr("y", 0);

    return this;

  };

  /**
      @memberof Circle
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Circle.prototype._aes = function _aes (d, i) {
    return {r: this._r(d, i)};
  };

  /**
      @memberof Circle
      @desc If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current radius accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.r;
}
  */
  Circle.prototype.r = function r (_) {
    return arguments.length ? (this._r = typeof _ === "function" ? _ : constant$7(_), this) : this._r;
  };

  return Circle;
}(Shape));

/**
    @class Line
    @extends Shape
    @desc Creates SVG lines based on an array of data.
*/
var Line = (function (Shape$$1) {
  function Line() {

    Shape$$1.call(this);

    this._curve = "linear";
    this._defined = function (d) { return d; };
    this._fill = constant$7("none");
    this._name = "Line";
    this._path = line();
    this._stroke = constant$7("black");
    this._strokeWidth = constant$7(1);

  }

  if ( Shape$$1 ) Line.__proto__ = Shape$$1;
  Line.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Line.prototype.constructor = Line;

  /**
      @memberof Line
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  Line.prototype._dataFilter = function _dataFilter (data) {
    var this$1 = this;


    var lines = nest().key(this._id).entries(data).map(function (d) {

      d.data = objectMerge(d.values);
      d.i = data.indexOf(d.values[0]);

      var x = extent(d.values, this$1._x);
      d.xR = x;
      d.width = x[1] - x[0];
      d.x = x[0] + d.width / 2;

      var y = extent(d.values, this$1._y);
      d.yR = y;
      d.height = y[1] - y[0];
      d.y = y[0] + d.height / 2;

      d.nested = true;
      d.translate = [d.x, d.y];
      d.__d3plusShape__ = true;

      return d;
    });

    lines.key = function (d) { return d.key; };
    return lines;

  };

  /**
      @memberof Line
      @desc Draws the lines.
      @param {Function} [*callback*]
      @chainable
  */
  Line.prototype.render = function render (callback) {
    var this$1 = this;


    Shape$$1.prototype.render.call(this, callback);

    var that = this;

    this._path
      .curve(paths[("curve" + (this._curve.charAt(0).toUpperCase()) + (this._curve.slice(1)))])
      .defined(this._defined)
      .x(this._x)
      .y(this._y);

    this._enter.append("path")
      .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
      .attr("d", function (d) { return this$1._path(d.values); })
      .call(this._applyStyle.bind(this));

    this._update.select("path").transition(this._transition)
      .attr("transform", function (d) { return ("translate(" + (-d.xR[0] - d.width / 2) + ", " + (-d.yR[0] - d.height / 2) + ")"); })
      .attrTween("d", function(d) {
        return interpolatePath(select(this).attr("d"), that._path(d.values));
      })
      .call(this._applyStyle.bind(this));

    return this;

  };

  /**
      @memberof Line
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Line.prototype._aes = function _aes (d, i) {
    var this$1 = this;

    return {points: d.values.map(function (p) { return [this$1._x(p, i), this$1._y(p, i)]; })};
  };

  /**
      @memberof Line
      @desc If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.
      @param {String} [*value* = "linear"]
      @chainable
  */
  Line.prototype.curve = function curve (_) {
    return arguments.length ? (this._curve = _, this) : this._curve;
  };

  /**
      @memberof Line
      @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
      @param {Function} [*value*]
      @chainable
  */
  Line.prototype.defined = function defined (_) {
    return arguments.length ? (this._defined = _, this) : this._defined;
  };

  return Line;
}(Shape));

var pi$5 = Math.PI;

/**
    @function shapeEdgePoint
    @desc Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
    @param {Number} angle The angle, in radians, of the offset point.
    @param {Number} distance The pixel distance away from the origin.
    @returns {String} [shape = "circle"] The type of shape, which can be either "circle" or "square".
*/
var shapeEdgePoint = function (angle, distance, shape) {
  if ( shape === void 0 ) shape = "circle";


  if (angle < 0) { angle = pi$5 * 2 + angle; }

  if (shape === "square") {

    var diagonal = 45 * (pi$5 / 180);
    var x = 0, y = 0;

    if (angle < pi$5 / 2) {
      var tan = Math.tan(angle);
      x += angle < diagonal ? distance : distance / tan;
      y += angle < diagonal ? tan * distance : distance;
    }
    else if (angle <= pi$5) {
      var tan$1 = Math.tan(pi$5 - angle);
      x -= angle < pi$5 - diagonal ? distance / tan$1 : distance;
      y += angle < pi$5 - diagonal ? distance : tan$1 * distance;
    }
    else if (angle < diagonal + pi$5) {
      x -= distance;
      y -= Math.tan(angle - pi$5) * distance;
    }
    else if (angle < 3 * pi$5 / 2) {
      x -= distance / Math.tan(angle - pi$5);
      y -= distance;
    }
    else if (angle < 2 * pi$5 - diagonal) {
      x += distance / Math.tan(2 * pi$5 - angle);
      y -= distance;
    }
    else {
      x += distance;
      y -= Math.tan(2 * pi$5 - angle) * distance;
    }

    return [x, y];

  }
  else if (shape === "circle") {
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  }
  else { return null; }

};

var pi$4 = Math.PI;

/**
    @function path2polygon
    @desc Transforms a path string into an Array of points.
    @param {String} path An SVG string path, commonly the "d" property of a <path> element.
    @param {Number} [segmentLength = 20] The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid.
    @returns {Array}
*/
var path2polygon = function (path, segmentLength) {
  if ( segmentLength === void 0 ) segmentLength = 20;


  var poly = [],
        regex = /([MLA])([^MLAZ]+)/ig;

  var match = regex.exec(path);
  while (match !== null) {

    if (["M", "L"].includes(match[1])) { poly.push(match[2].split(",").map(Number)); }
    else if (match[1] === "A") {

      var points = match[2].split(",").map(Number);

      var last = points.slice(points.length - 2, points.length),
            prev = poly[poly.length - 1],
            radius = points[0],
            width = pointDistance(prev, last);

      var angle = Math.acos((radius * radius + radius * radius - width * width) / (2 * radius * radius));
      if (points[2]) { angle = pi$4 * 2 - angle; }

      var step = angle / (angle / (pi$4 * 2) * (radius * pi$4 * 2) / segmentLength);
      var start = Math.atan2(-prev[1], -prev[0]) - pi$4;
      var i = step;
      while (i < angle) {
        poly.push(shapeEdgePoint(start + i, radius));
        i += step;
      }
      poly.push(last);

    }
    match = regex.exec(path);

  }

  return poly;

};

/**
    @class Path
    @extends Shape
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
var Path$1 = (function (Shape$$1) {
  function Path() {
    var this$1 = this;

    Shape$$1.call(this, "path");
    this._d = accessor("path");
    this._labelBounds = function (d, i, aes) {
      var r = largestRect(aes.points, {angle: this$1._labelRotate(d, i)});
      return {angle: r.angle, width: r.width, height: r.height, x: r.cx - r.width / 2, y: r.cy - r.height / 2};
    };
    this._name = "Path";
    this.textAnchor("middle");
    this.verticalAlign("middle");
  }

  if ( Shape$$1 ) Path.__proto__ = Shape$$1;
  Path.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Path.prototype.constructor = Path;

  /**
      @memberof Path
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Path.prototype._aes = function _aes (d, i) {
    return {points: path2polygon(this._d(d, i))};
  };

  /**
      @memberof Path
      @desc Draws the paths.
      @param {Function} [*callback*]
      @chainable
  */
  Path.prototype.render = function render (callback) {

    Shape$$1.prototype.render.call(this, callback);

    this._enter
        .attr("opacity", 0)
        .attr("d", this._d)
      .call(this._applyStyle.bind(this))
      .transition(this._transition)
        .attr("opacity", 1);

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
        .attr("opacity", 1)
        .attr("d", this._d);

    this._exit.transition(this._transition)
      .attr("opacity", 0);

    return this;

  };

  /**
      @memberof Path
      @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current "d" attribute accessor.
      @param {Function|String} [*value*]
      @chainable
      @example
function(d) {
  return d.path;
}
  */
  Path.prototype.d = function d (_) {
    return arguments.length
         ? (this._d = typeof _ === "function" ? _ : constant$7(_), this)
         : this._d;
  };

  return Path;
}(Shape));

/**
    @class Rect
    @extends Shape
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
var Rect = (function (Shape$$1) {
  function Rect() {
    Shape$$1.call(this, "rect");
    this._height = accessor("height");
    this._labelBounds = function (d, i, s) { return ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2}); };
    this._name = "Rect";
    this._width = accessor("width");
  }

  if ( Shape$$1 ) Rect.__proto__ = Shape$$1;
  Rect.prototype = Object.create( Shape$$1 && Shape$$1.prototype );
  Rect.prototype.constructor = Rect;

  /**
      @memberof Rect
      @desc Draws the rectangles.
      @param {Function} [*callback*]
      @chainable
  */
  Rect.prototype.render = function render (callback) {

    Shape$$1.prototype.render.call(this, callback);

    this._enter
        .attr("width", 0).attr("height", 0)
        .attr("x", 0).attr("y", 0)
        .call(this._applyStyle.bind(this))
      .transition(this._transition)
        .call(this._applyPosition.bind(this));

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    this._exit.transition(this._transition)
      .attr("width", 0).attr("height", 0)
      .attr("x", 0).attr("y", 0);

    return this;

  };

  /**
      @memberof Rect
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  Rect.prototype._aes = function _aes (d, i) {
    return {width: this._width(d, i), height: this._height(d, i)};
  };

  /**
      @memberof Rect
      @desc Provides the default positioning to the <rect> elements.
      @param {D3Selection} *elem*
      @private
  */
  Rect.prototype._applyPosition = function _applyPosition (elem$$1) {
    var this$1 = this;

    elem$$1
      .attr("width", function (d, i) { return this$1._width(d, i); })
      .attr("height", function (d, i) { return this$1._height(d, i); })
      .attr("x", function (d, i) { return -this$1._width(d, i) / 2; })
      .attr("y", function (d, i) { return -this$1._height(d, i) / 2; });
  };

  /**
      @memberof Rect
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.height;
}
  */
  Rect.prototype.height = function height (_) {
    return arguments.length
         ? (this._height = typeof _ === "function" ? _ : constant$7(_), this)
         : this._height;
  };

  /**
      @memberof Rect
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.width;
}
  */
  Rect.prototype.width = function width (_) {
    return arguments.length
         ? (this._width = typeof _ === "function" ? _ : constant$7(_), this)
         : this._width;
  };

  return Rect;
}(Shape));



var shapes = Object.freeze({
	Image: Image,
	Shape: Shape,
	Area: Area,
	Bar: Bar,
	Circle: Circle,
	Line: Line,
	Path: Path$1,
	Rect: Rect,
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
  @function dataFold
  @desc Given a JSON object where the data values and headers have been split into separate key lookups, this function will combine the data values with the headers and returns one large array of objects.
  @param {Object} json A JSON data Object with `data` and `headers` keys.
  @param {String} [data = "data"] The key used for the flat data array inside of the JSON object.
  @param {String} [headers = "headers"] The key used for the flat headers array inside of the JSON object.
*/
var fold = function (json, data, headers) {
    if ( data === void 0 ) data = "data";
    if ( headers === void 0 ) headers = "headers";

    return json[data].map(function (data) { return json[headers].reduce(function (obj, header, i) { return (obj[header] = data[i], obj); }, {}); });
};

var request = function(url, callback) {
  var request,
      event = dispatch("beforesend", "progress", "load", "error"),
      mimeType,
      headers = map$1(),
      xhr = new XMLHttpRequest,
      user = null,
      password = null,
      response,
      responseType,
      timeout = 0;

  // If IE does not support CORS, use XDomainRequest.
  if (typeof XDomainRequest !== "undefined"
      && !("withCredentials" in xhr)
      && /^(http(s)?:)?\/\//.test(url)) { xhr = new XDomainRequest; }

  "onload" in xhr
      ? xhr.onload = xhr.onerror = xhr.ontimeout = respond
      : xhr.onreadystatechange = function(o) { xhr.readyState > 3 && respond(o); };

  function respond(o) {
    var status = xhr.status, result;
    if (!status && hasResponse(xhr)
        || status >= 200 && status < 300
        || status === 304) {
      if (response) {
        try {
          result = response.call(request, xhr);
        } catch (e) {
          event.call("error", request, e);
          return;
        }
      } else {
        result = xhr;
      }
      event.call("load", request, result);
    } else {
      event.call("error", request, o);
    }
  }

  xhr.onprogress = function(e) {
    event.call("progress", request, e);
  };

  request = {
    header: function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) { return headers.get(name); }
      if (value == null) { headers.remove(name); }
      else { headers.set(name, value + ""); }
      return request;
    },

    // If mimeType is non-null and no Accept header is set, a default is used.
    mimeType: function(value) {
      if (!arguments.length) { return mimeType; }
      mimeType = value == null ? null : value + "";
      return request;
    },

    // Specifies what type the response value should take;
    // for instance, arraybuffer, blob, document, or text.
    responseType: function(value) {
      if (!arguments.length) { return responseType; }
      responseType = value;
      return request;
    },

    timeout: function(value) {
      if (!arguments.length) { return timeout; }
      timeout = +value;
      return request;
    },

    user: function(value) {
      return arguments.length < 1 ? user : (user = value == null ? null : value + "", request);
    },

    password: function(value) {
      return arguments.length < 1 ? password : (password = value == null ? null : value + "", request);
    },

    // Specify how to convert the response content to a specific type;
    // changes the callback value on "load" events.
    response: function(value) {
      response = value;
      return request;
    },

    // Alias for send("GET", …).
    get: function(data, callback) {
      return request.send("GET", data, callback);
    },

    // Alias for send("POST", …).
    post: function(data, callback) {
      return request.send("POST", data, callback);
    },

    // If callback is non-null, it will be used for error and load events.
    send: function(method, data, callback) {
      xhr.open(method, url, true, user, password);
      if (mimeType != null && !headers.has("accept")) { headers.set("accept", mimeType + ",*/*"); }
      if (xhr.setRequestHeader) { headers.each(function(value, name) { xhr.setRequestHeader(name, value); }); }
      if (mimeType != null && xhr.overrideMimeType) { xhr.overrideMimeType(mimeType); }
      if (responseType != null) { xhr.responseType = responseType; }
      if (timeout > 0) { xhr.timeout = timeout; }
      if (callback == null && typeof data === "function") { callback = data, data = null; }
      if (callback != null && callback.length === 1) { callback = fixCallback(callback); }
      if (callback != null) { request.on("error", callback).on("load", function(xhr) { callback(null, xhr); }); }
      event.call("beforesend", request, xhr);
      xhr.send(data == null ? null : data);
      return request;
    },

    abort: function() {
      xhr.abort();
      return request;
    },

    on: function() {
      var value = event.on.apply(event, arguments);
      return value === event ? request : value;
    }
  };

  if (callback != null) {
    if (typeof callback !== "function") { throw new Error("invalid callback: " + callback); }
    return request.get(callback);
  }

  return request;
};

function fixCallback(callback) {
  return function(error, xhr) {
    callback(error == null ? xhr : null);
  };
}

function hasResponse(xhr) {
  var type = xhr.responseType;
  return type && type !== "text"
      ? xhr.response // null on error
      : xhr.responseText; // "" on error
}

var type = function(defaultMimeType, response) {
  return function(url, callback) {
    var r = request(url).mimeType(defaultMimeType).response(response);
    if (callback != null) {
      if (typeof callback !== "function") { throw new Error("invalid callback: " + callback); }
      return r.get(callback);
    }
    return r;
  };
};

type("text/html", function(xhr) {
  return document.createRange().createContextualFragment(xhr.responseText);
});

var json = type("application/json", function(xhr) {
  return JSON.parse(xhr.responseText);
});

var text = type("text/plain", function(xhr) {
  return xhr.responseText;
});

type("application/xml", function(xhr) {
  var xml = xhr.responseXML;
  if (!xml) { throw new Error("parse error"); }
  return xml;
});

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

var dsv = function(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) { return convert(row, i - 1); }
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns;
    return rows;
  }

  function parseRows(text, f) {
    var EOL = {}, // sentinel value for end-of-line
        EOF = {}, // sentinel value for end-of-file
        rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // the current line number
        t, // the current token
        eol; // is the current token followed by EOL?

    function token() {
      if (I >= N) { return EOF; } // special case: end of file
      if (eol) { return eol = false, EOL; } // special case: end of line

      // special case: quotes
      var j = I, c;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < N) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) { break; }
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) { ++I; }
        } else if (c === 10) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }

      // common case: find next delimiter or newline
      while (I < N) {
        var k = 1;
        c = text.charCodeAt(I++);
        if (c === 10) { eol = true; } // \n
        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) { ++I, ++k; } } // \r|\r\n
        else if (c !== delimiterCode) { continue; }
        return text.slice(j, I - k);
      }

      // special case: last token before EOF
      return text.slice(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && (a = f(a, n++)) == null) { continue; }
      rows.push(a);
    }

    return rows;
  }

  function format(rows, columns) {
    if (columns == null) { columns = inferColumns(rows); }
    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return text == null ? ""
        : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\""
        : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};

var csv$1 = dsv(",");

var csvParse = csv$1.parse;

var tsv = dsv("\t");

var tsvParse = tsv.parse;

var dsv$1 = function(defaultMimeType, parse) {
  return function(url, row, callback) {
    if (arguments.length < 3) { callback = row, row = null; }
    var r = request(url).mimeType(defaultMimeType);
    r.row = function(_) { return arguments.length ? r.response(responseOf(parse, row = _)) : row; };
    r.row(row);
    return callback ? r.get(callback) : r;
  };
};

function responseOf(parse, row) {
  return function(request$$1) {
    return parse(request$$1.responseText, row);
  };
}

var csv = dsv$1("text/csv", csvParse);

var tsv$1 = dsv$1("text/tab-separated-values", tsvParse);

/**
  @function dataLoad
  @desc Loads data from a filepath or URL, converts it to a valid JSON object, and returns it to a callback function.
  @param {Array|String} path The path to the file or url to be loaded. If an Array is passed, the xhr request logic is skipped.
  @param {Function} [formatter] An optional formatter function that is run on the loaded data.
  @param {String} [key] The key in the `this` context to save the resulting data to.
  @param {Function} [callback] A function that is called when the final data is loaded. It is passed 2 variables, any error present and the data loaded.
*/
var load = function(path, formatter, key, callback) {
  var this$1 = this;


  if (typeof path !== "string") {

    var data = formatter ? formatter(path) : path;
    if (key && ("_" + key) in this) { this[("_" + key)] = data; }
    if (callback) { callback(null, data); }

  }
  else {

    var parser = path.slice(path.length - 4) === ".csv" ? csv
                 : path.slice(path.length - 4) === ".tsv" ? tsv$1
                 : path.slice(path.length - 4) === ".txt" ? text
                 : json;

    parser(path, function (err, data) {

      if (parser !== json && !err && data && data instanceof Array) {
        data.forEach(function (d) {
          for (var k in d) {
            if (!isNaN(d[k])) { d[k] = parseFloat(d[k]); }
            else if (d[k].toLowerCase() === "false") { d[k] = false; }
            else if (d[k].toLowerCase() === "true") { d[k] = true; }
            else if (d[k].toLowerCase() === "null") { d[k] = null; }
            else if (d[k].toLowerCase() === "undefined") { d[k] = undefined; }
          }
        });
      }

      data = err ? [] : formatter ? formatter(data) : data;
      if (data && !(data instanceof Array) && data.data && data.headers) { data = fold(data); }
      if (key && ("_" + key) in this$1) { this$1[("_" + key)] = data; }
      if (callback) { callback(err, data); }

    });

  }

};

var slice$3 = [].slice;

var noabort = {};

function Queue(size) {
  if (!(size >= 1)) { throw new Error; }
  this._size = size;
  this._call =
  this._error = null;
  this._tasks = [];
  this._data = [];
  this._waiting =
  this._active =
  this._ended =
  this._start = 0; // inside a synchronous task callback?
}

Queue.prototype = queue.prototype = {
  constructor: Queue,
  defer: function(callback) {
    if (typeof callback !== "function" || this._call) { throw new Error; }
    if (this._error != null) { return this; }
    var t = slice$3.call(arguments, 1);
    t.push(callback);
    ++this._waiting, this._tasks.push(t);
    poke$1(this);
    return this;
  },
  abort: function() {
    if (this._error == null) { abort(this, new Error("abort")); }
    return this;
  },
  await: function(callback) {
    if (typeof callback !== "function" || this._call) { throw new Error; }
    this._call = function(error, results) { callback.apply(null, [error].concat(results)); };
    maybeNotify(this);
    return this;
  },
  awaitAll: function(callback) {
    if (typeof callback !== "function" || this._call) { throw new Error; }
    this._call = callback;
    maybeNotify(this);
    return this;
  }
};

function poke$1(q) {
  if (!q._start) {
    try { start$1(q); } // let the current task complete
    catch (e) {
      if (q._tasks[q._ended + q._active - 1]) { abort(q, e); } // task errored synchronously
      else if (!q._data) { throw e; } // await callback errored synchronously
    }
  }
}

function start$1(q) {
  while (q._start = q._waiting && q._active < q._size) {
    var i = q._ended + q._active,
        t = q._tasks[i],
        j = t.length - 1,
        c = t[j];
    t[j] = end(q, i);
    --q._waiting, ++q._active;
    t = c.apply(null, t);
    if (!q._tasks[i]) { continue; } // task finished synchronously
    q._tasks[i] = t || noabort;
  }
}

function end(q, i) {
  return function(e, r) {
    if (!q._tasks[i]) { return; } // ignore multiple callbacks
    --q._active, ++q._ended;
    q._tasks[i] = null;
    if (q._error != null) { return; } // ignore secondary errors
    if (e != null) {
      abort(q, e);
    } else {
      q._data[i] = r;
      if (q._waiting) { poke$1(q); }
      else { maybeNotify(q); }
    }
  };
}

function abort(q, e) {
  var i = q._tasks.length, t;
  q._error = e; // ignore active callbacks
  q._data = undefined; // allow gc
  q._waiting = NaN; // prevent starting

  while (--i >= 0) {
    if (t = q._tasks[i]) {
      q._tasks[i] = null;
      if (t.abort) {
        try { t.abort(); }
        catch (e) { /* ignore */ }
      }
    }
  }

  q._active = NaN; // allow notification
  maybeNotify(q);
}

function maybeNotify(q) {
  if (!q._active && q._call) {
    var d = q._data;
    q._data = undefined; // allow gc
    q._call(q._error, d);
  }
}

function queue(concurrency) {
  return new Queue(arguments.length ? +concurrency : Infinity);
}

/**
    @function date
    @desc Parses numbers and strings to valid Javascript Date obejcts.
    @param {Date|Number|String} *date*
*/
var date$2 = function(d) {

  // returns if already Date object
  if (d.constructor === Date) { return d; }
  // detects if milliseconds
  else if (d.constructor === Number && ("" + d).length > 5 && d % 1 === 0) { return new Date(d); }

  var s = "" + d;
  // detects if only passing a year value
  if (!s.includes("/") && !s.includes(" ") && (!s.includes("-") || !s.indexOf("-"))) {
    var date = new Date((s + "/01/01"));
    date.setFullYear(d);
    return date;
  }
  // parses string to Date object
  else { return new Date(s); }

};

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Axis
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data.
*/
var Axis = (function (BaseClass$$1) {
  function Axis() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._align = "middle";
    this._barConfig = {
      "stroke": "#000",
      "stroke-width": 1
    };
    this._domain = [0, 10];
    this._duration = 600;
    this._gridConfig = {
      "stroke": "#ccc",
      "stroke-width": 1
    };
    this._height = 400;
    this.orient("bottom");
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._paddingInner = 0.1;
    this._paddingOuter = 0.1;
    this._scale = "linear";
    this._shape = "Line";
    this._shapeConfig = {
      fill: "#000",
      fontColor: "#000",
      fontFamily: new TextBox().fontFamily(),
      fontResize: false,
      fontSize: constant$7(10),
      height: function (d) { return d.tick ? 8 : 0; },
      label: function (d) { return d.text; },
      labelBounds: function (d) { return d.labelBounds; },
      labelPadding: 0,
      r: function (d) { return d.tick ? 4 : 0; },
      stroke: "#000",
      strokeWidth: 1,
      textAnchor: function () { return this$1._orient === "left" ? "end" : this$1._orient === "right" ? "start" : "middle"; },
      verticalAlign: function () { return this$1._orient === "bottom" ? "top" : this$1._orient === "top" ? "bottom" : "middle"; },
      width: function (d) { return d.tick ? 8 : 0; }
    };
    this._tickSize = 5;
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13,
      textAnchor: "middle"
    };
    this._width = 400;

  }

  if ( BaseClass$$1 ) Axis.__proto__ = BaseClass$$1;
  Axis.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Axis.prototype.constructor = Axis;

  /**
      @memberof Axis
      @desc Sets positioning for the axis bar.
      @param {D3Selection} *bar*
      @private
  */
  Axis.prototype._barPosition = function _barPosition (bar) {

    var ref = this._position;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var opposite = ref.opposite;
    var domain = this._d3Scale.domain(),
          offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset;

    bar
      .call(attrize, this._barConfig)
      .attr((x + "1"), this._d3Scale(domain[0]) - (this._scale === "band" ? this._d3Scale.step() - this._d3Scale.bandwidth() : 0))
      .attr((x + "2"), this._d3Scale(domain[domain.length - 1]) + (this._scale === "band" ? this._d3Scale.step() : 0))
      .attr((y + "1"), position)
      .attr((y + "2"), position);

  };

  /**
      @memberof Axis
      @desc Sets positioning for the grid lines.
      @param {D3Selection} *lines*
      @private
  */
  Axis.prototype._gridPosition = function _gridPosition (lines, last) {
    if ( last === void 0 ) last = false;

    var ref = this._position;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var opposite = ref.opposite;
    var offset = this._margin[opposite],
          position = ["top", "left"].includes(this._orient) ? this._outerBounds[y] + this._outerBounds[height] - offset : this._outerBounds[y] + offset,
          scale = last ? this._lastScale || this._d3Scale : this._d3Scale,
          size = ["top", "left"].includes(this._orient) ? offset : -offset,
          xDiff = this._scale === "band" ? this._d3Scale.bandwidth() / 2 : 0,
          xPos = function (d) { return scale(d.id) + xDiff; };
    lines
      .call(attrize, this._gridConfig)
      .attr((x + "1"), xPos)
      .attr((x + "2"), xPos)
      .attr((y + "1"), position)
      .attr((y + "2"), last ? position : position + size);
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  Axis.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.barConfig = function barConfig (_) {
    return arguments.length ? (this._barConfig = Object.assign(this._barConfig, _), this) : this._barConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.
      @param {Array} [*value* = [0, 10]]
      @chainable
  */
  Axis.prototype.domain = function domain (_) {
    return arguments.length ? (this._domain = _, this) : this._domain;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  Axis.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.grid = function grid (_) {
    return arguments.length ? (this._grid = _, this) : this._grid;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.gridConfig = function gridConfig (_) {
    return arguments.length ? (this._gridConfig = Object.assign(this._gridConfig, _), this) : this._gridConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.
      @param {Number} [*value* = undefined]
      @chainable
  */
  Axis.prototype.gridSize = function gridSize (_) {
    return arguments.length ? (this._gridSize = _, this) : this._gridSize;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  Axis.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.labels = function labels (_) {
    return arguments.length ? (this._labels = _, this) : this._labels;
  };

  /**
      @memberof Axis
      @desc If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.
      @param {String} [*orient* = "bottom"] Supports `"top"`, `"right"`, `"bottom"`, and `"left"` orientations.
      @chainable
  */
  Axis.prototype.orient = function orient (_) {
    if (arguments.length) {

      var horizontal = ["top", "bottom"].includes(_),
            opps = {top: "bottom", right: "left", bottom: "top", left: "right"};

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
  };

  /**
      @memberof Axis
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Axis.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  Axis.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  Axis.prototype.paddingInner = function paddingInner (_) {
    return arguments.length ? (this._paddingInner = _, this) : this._paddingInner;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.
      @param {Number} [*value* = 0.1]
      @chainable
  */
  Axis.prototype.paddingOuter = function paddingOuter (_) {
    return arguments.length ? (this._paddingOuter = _, this) : this._paddingOuter;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.range = function range$$1 (_) {
    return arguments.length ? (this._range = _, this) : this._range;
  };

  /**
      @memberof Axis
      @desc Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  Axis.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .attr("width", ((this._width) + "px"))
        .attr("height", ((this._height) + "px"))
        .node());
    }

    if (this._lineHeight === void 0) {
      this._lineHeight = function (d, i) { return this$1._shapeConfig.fontSize(d, i) * 1.1; };
    }

    var ref = this._position;
    var width = ref.width;
    var height = ref.height;
    var x = ref.x;
    var y = ref.y;
    var horizontal = ref.horizontal;
    var opposite = ref.opposite;
    var clipId = "d3plus-Axis-clip-" + (this._uuid),
          p = this._padding,
          parent = this._select,
          t = transition().duration(this._duration);

    var range$$1 = this._range ? this._range.slice() : [undefined, undefined];
    if (range$$1[0] === void 0) { range$$1[0] = p; }
    if (range$$1[1] === void 0) { range$$1[1] = this[("_" + width)] - p; }
    this._size = range$$1[1] - range$$1[0];
    if (this._scale === "ordinal" && this._domain.length > range$$1.length) {
      range$$1 = d3Range(this._domain.length).map(function (d) { return this$1._size * (d / (this$1._domain.length - 1)) + range$$1[0]; });
    }

    this._margin = {top: 0, right: 0, bottom: 0, left: 0};

    if (this._title) {
      var lH = this._titleConfig.lineHeight ? this._titleConfig.lineHeight : this._titleConfig.fontSize * 1.1,
            titleWrap = textWrap()
              .fontFamily(this._titleConfig.fontFamily)
              .fontSize(this._titleConfig.fontSize)
              .lineHeight(lH)
              .width(this._size)
              .height(this[("_" + height)] - this._tickSize - p)
              (this._title);
      this._margin[this._orient] = titleWrap.lines.length * lH + p;
    }

    this._d3Scale = scales[("scale" + (this._scale.charAt(0).toUpperCase()) + (this._scale.slice(1)))]()
      .domain(this._scale === "time" ? this._domain.map(date$2) : this._domain);

    if (this._d3Scale.rangeRound) { this._d3Scale.rangeRound(range$$1); }
    else { this._d3Scale.range(range$$1); }

    if (this._d3Scale.round) { this._d3Scale.round(true); }
    if (this._d3Scale.paddingInner) { this._d3Scale.paddingInner(this._paddingInner); }
    if (this._d3Scale.paddingOuter) { this._d3Scale.paddingOuter(this._paddingOuter); }

    var tickScale = sqrt$1().domain([10, 400]).range([10, this._gridSize === 0 ? 50 : 75]);

    var ticks$$1 = this._ticks
              ? this._scale === "time" ? this._ticks.map(date$2) : this._ticks
              : this._d3Scale.ticks
              ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
              : this._domain;

    var labels = this._labels
               ? this._scale === "time" ? this._labels.map(date$2) : this._labels
               : this._d3Scale.ticks
               ? this._d3Scale.ticks(Math.floor(this._size / tickScale(this._size)))
               : ticks$$1;

    var tickFormat = this._tickFormat ? this._tickFormat : this._d3Scale.tickFormat
                     ? this._d3Scale.tickFormat(labels.length - 1)
                     : function (d) { return d; };

    if (this._scale === "time") {
      ticks$$1 = ticks$$1.map(Number);
      labels = labels.map(Number);
    }

    var tickSize = this._shape === "Circle" ? this._shapeConfig.r
                   : this._shape === "Rect" ? this._shapeConfig[width]
                   : this._shapeConfig.strokeWidth;

    var tickGet = typeof tickSize !== "function" ? function () { return tickSize; } : tickSize;

    var pixels = [];
    this._availableTicks = ticks$$1;
    ticks$$1.forEach(function (d, i) {
      var s = tickGet({id: d, tick: true}, i);
      if (this$1._shape === "Circle") { s *= 2; }
      var t = this$1._d3Scale(d);
      if (!pixels.length || Math.abs(closest(t, pixels) - t) > s * 2) { pixels.push(t); }
      else { pixels.push(false); }
    });
    ticks$$1 = ticks$$1.filter(function (d, i) { return pixels[i] !== false; });

    this._visibleTicks = ticks$$1;

    var hBuff = this._shape === "Circle"
              ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) : this._shapeConfig.r
              : this._shape === "Rect"
              ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
              : this._tickSize,
        wBuff = tickGet({tick: true});

    if (typeof hBuff === "function") { hBuff = max(ticks$$1.map(hBuff)); }
    if (this._shape === "Rect") { hBuff /= 2; }
    if (typeof wBuff === "function") { wBuff = max(ticks$$1.map(wBuff)); }
    if (this._shape !== "Circle") { wBuff /= 2; }

    if (this._scale === "band") {
      this._space = this._d3Scale.bandwidth();
    }
    else if (labels.length > 1) {
      this._space = 0;
      for (var i = 0; i < labels.length - 1; i++) {
        var s = this$1._d3Scale(labels[i + 1]) - this$1._d3Scale(labels[i]);
        if (s > this$1._space) { this$1._space = s; }
      }
    }
    else { this._space = this._size; }

    // Measures size of ticks
    var textData = labels.map(function (d, i) {

      var f = this$1._shapeConfig.fontFamily(d, i),
            s = this$1._shapeConfig.fontSize(d, i);

      var lh = this$1._shapeConfig.lineHeight ? this$1._shapeConfig.lineHeight(d, i) : s * 1.1;

      var res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(horizontal ? this$1._space : this$1._width - hBuff - p)
        .height(horizontal ? this$1._height - hBuff - p : this$1._space)
        (tickFormat(d));

      res.lines = res.lines.filter(function (d) { return d !== ""; });
      res.d = d;
      res.fS = s;
      res.width = Math.ceil(max(res.lines.map(function (t) { return textWidth(t, {"font-family": f, "font-size": s}); }))) + s / 4;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      if (res.width % 2) { res.width++; }

      return res;

    });

    // Calculates new range, based on any text that may be overflowing.
    var rangeOuter = range$$1.slice();
    var lastI = range$$1.length - 1;
    if (this._scale !== "band" && textData.length) {

      var first = textData[0],
            last = textData[textData.length - 1];

      var firstB = min([this._d3Scale(first.d) - first[width] / 2, range$$1[0] - wBuff]);
      if (firstB < range$$1[0]) {
        var d = range$$1[0] - firstB;
        if (this._range === void 0 || this._range[0] === void 0) {
          this._size -= d;
          range$$1[0] += d;
        }
        else if (this._range) {
          rangeOuter[0] -= d;
        }
      }

      var lastB = max([this._d3Scale(last.d) + last[width] / 2, range$$1[lastI] + wBuff]);
      if (lastB > range$$1[lastI]) {
        var d$1 = lastB - range$$1[lastI];
        if (this._range === void 0 || this._range[lastI] === void 0) {
          this._size -= d$1;
          range$$1[lastI] -= d$1;
        }
        else if (this._range) {
          rangeOuter[lastI] += d$1;
        }
      }

      if (this._d3Scale.rangeRound) { this._d3Scale.rangeRound(range$$1); }
      else { this._d3Scale.range(range$$1); }

    }

    var tBuff = this._shape === "Line" ? 0 : hBuff;
    this._outerBounds = ( obj = {}, obj[height] = (max(textData, function (t) { return t[height]; }) || 0) + (textData.length ? p : 0), obj[width] = rangeOuter[lastI] - rangeOuter[0], obj[x] = rangeOuter[0], obj );
    var obj;
    this._margin[opposite] = this._gridSize !== void 0 ? max([this._gridSize, tBuff]) : this[("_" + height)] - this._margin[this._orient] - this._outerBounds[height] - p * 2 - hBuff;
    this._margin[this._orient] += hBuff;
    this._outerBounds[height] += this._margin[opposite] + this._margin[this._orient];
    this._outerBounds[y] = this._align === "start" ? this._padding
                         : this._align === "end" ? this[("_" + height)] - this._outerBounds[height] - this._padding
                         : this[("_" + height)] / 2 - this._outerBounds[height] / 2;

    var group = elem(("g#d3plus-Axis-" + (this._uuid)), {parent: parent});
    this._group = group;

    var grid = elem("g.grid", {parent: group}).selectAll("line")
      .data((this._gridSize !== 0 ? this._grid || ticks$$1 : []).map(function (d) { return ({id: d}); }), function (d) { return d.id; });

    grid.exit().transition(t)
      .attr("opacity", 0)
      .call(this._gridPosition.bind(this))
      .remove();

    grid.enter().append("line")
        .attr("opacity", 0)
        .attr("clip-path", ("url(#" + clipId + ")"))
        .call(this._gridPosition.bind(this), true)
      .merge(grid).transition(t)
        .attr("opacity", 1)
        .call(this._gridPosition.bind(this));

    var labelHeight = max(textData, function (t) { return t.height; }) || 0,
          labelWidth = horizontal ? this._space * 1.1 : (this._outerBounds.width - this._margin[this._position.opposite] - hBuff - this._margin[this._orient] + p) * 1.1;
    var tickData = ticks$$1
      .concat(labels.filter(function (d, i) { return textData[i].lines.length && !ticks$$1.includes(d); }))
      .map(function (d) {
        var offset = this$1._margin[opposite],
              position = ["top", "left"].includes(this$1._orient) ? this$1._outerBounds[y] + this$1._outerBounds[height] - offset : this$1._outerBounds[y] + offset,
              size = ["top", "left"].includes(this$1._orient) ? -hBuff : hBuff,
              sizeOffset = this$1._shape === "Line" ? size / 2 : size;
        return ( obj = {
          id: d,
          labelBounds: {
            x: horizontal ? -labelWidth / 2 : this$1._orient === "left" ? -labelWidth - p + sizeOffset : sizeOffset + p,
            y: horizontal ? this$1._orient === "bottom" ? sizeOffset + p : sizeOffset - p - labelHeight : -labelHeight / 2,
            width: labelWidth,
            height: labelHeight
          },
          size: ticks$$1.includes(d) ? size : 0,
          text: labels.includes(d) ? tickFormat(d) : false,
          tick: ticks$$1.includes(d)
        }, obj[x] = this$1._d3Scale(d) + (this$1._scale === "band" ? this$1._d3Scale.bandwidth() / 2 : 0), obj[y] = position, obj );
        var obj;
      });

    if (this._shape === "Line") {
      tickData = tickData.concat(tickData.map(function (d) {
        var dupe = Object.assign({}, d);
        dupe[y] += d.size;
        return dupe;
      }));
    }

    new shapes[this._shape]()
      .data(tickData)
      .duration(this._duration)
      .select(elem("g.ticks", {parent: group}).node())
      .config(this._shapeConfig)
      .render();

    var bar = group.selectAll("line.bar").data([null]);

    bar.enter().append("line")
        .attr("class", "bar")
        .attr("opacity", 0)
        .call(this._barPosition.bind(this))
      .merge(bar).transition(t)
        .attr("opacity", 1)
        .call(this._barPosition.bind(this));

    new TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .height(this._outerBounds.height)
      .rotate(this._orient === "left" ? -90 : this._orient === "right" ? 90 : 0)
      .select(elem("g.d3plus-Axis-title", {parent: group}).node())
      .text(function (d) { return d.text; })
      .textAnchor("middle")
      .verticalAlign(this._orient === "bottom" ? "bottom" : "top")
      .width(this._outerBounds[width])
      .x(horizontal ? this._outerBounds.x : this._orient === "left" ? this._outerBounds.x + this._margin[this._orient] / 2 - this._outerBounds[width] / 2 : this._outerBounds.x + this._outerBounds.width - this._margin[this._orient] / 2 - this._outerBounds[width] / 2)
      .y(horizontal ? this._outerBounds.y : this._outerBounds.y - this._margin[this._orient] / 2 + this._outerBounds[width] / 2)
      .config(this._titleConfig)
      .render();

    this._lastScale = this._d3Scale;

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale
      @param {String} [*value* = "linear"]
      @chainable
  */
  Axis.prototype.scale = function scale (_) {
    return arguments.length ? (this._scale = _, this) : this._scale;
  };

  /**
      @memberof Axis
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Axis.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.
      @param {String} [*value* = "Line"]
      @chainable
  */
  Axis.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = _, this) : this._shape;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).
      @param {Function} [*value*]
      @chainable
  */
  Axis.prototype.tickFormat = function tickFormat (_) {
    return arguments.length ? (this._tickFormat = _, this) : this._tickFormat;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).
      @param {Array} [*value*]
      @chainable
  */
  Axis.prototype.ticks = function ticks$$1 (_) {
    return arguments.length ? (this._ticks = _, this) : this._ticks;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.
      @param {Number} [*value* = 5]
      @chainable
  */
  Axis.prototype.tickSize = function tickSize (_) {
    return arguments.length ? (this._tickSize = _, this) : this._tickSize;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
      @chainable
  */
  Axis.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Axis.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Axis
      @desc If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  Axis.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Axis;
}(BaseClass));

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/
/**
    @class Select
    @extends external:BaseClass
    @desc Creates an HTML select element.
*/
var Select = (function (BaseClass$$1) {
  function Select() {

    BaseClass$$1.call(this);

    this._labelStyle = {
      "font-family": "Verdana",
      "font-size": "12px",
      "margin-right": "5px"
    };
    this._options = [];
    this._optionStyle = {
      "font-family": "Verdana",
      "font-size": "12px"
    };
    this._selectStyle = ( obj = {
      "background": "#fafafa",
      "border": "1px solid #ccc",
      "border-radius": "0",
      "font-family": "Verdana",
      "font-size": "12px",
      "outline": "0",
      "padding": "3px 5px 4px"
    }, obj[((prefix$1()) + "appearance")] = "none", obj );
    var obj;
    this._text = accessor("text");
    this._value = accessor("value");

  }

  if ( BaseClass$$1 ) Select.__proto__ = BaseClass$$1;
  Select.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Select.prototype.constructor = Select;

  /**
      @memberof Select
      @desc Renders the element to the page.
      @chainable
  */
  Select.prototype.render = function render () {
    var this$1 = this;


    if (this._container === void 0) { this.container(select("body").append("div").node()); }
    var that = this;

    var container = this._container.selectAll(("select#d3plus-Select-" + (this._uuid))).data([0]);
    var svg = this._container.node().tagName.toLowerCase() === "foreignobject";

    container = container.enter().append(svg ? "xhtml:select" : "select")
        .attr("id", ("d3plus-Select-" + (this._uuid)))
        .attr("class", "d3plus-Select")
      .merge(container)
        .call(stylize, this._selectStyle)
        .on("change.d3plus", function() {
          that.selected(this.value);
        });

    for (var event$$1 in this$1._on) {
      if ({}.hasOwnProperty.call(this$1._on, event$$1)) { container.on(event$$1, this$1._on[event$$1]); }
    }

    var options = container.selectAll("option")
      .data(this._options, function (d, i) { return this$1._value(d, i); });

    options.exit().remove();

    options.enter().append("option")
        .attr("class", "d3plus-Option")
      .merge(options)
        .call(stylize, this._optionStyle)
        .attr("value", function (d, i) { return this$1._value(d, i); })
        .html(function (d, i) { return this$1._text(d, i); })
        .property("selected", function (d, i) { return this$1._selected === void 0 ? !i : ("" + (this$1._value(d, i))) === ("" + (this$1._selected)); });

    var label = this._container.selectAll(("label#d3plus-Label-" + (this._uuid))).data(this._label ? [0] : []);
    label.exit().remove();
    label.enter().insert(svg ? "xhtml:label" : "label", ("#d3plus-Select-" + (this._uuid)))
        .attr("id", ("d3plus-Label-" + (this._uuid)))
        .attr("class", "d3plus-Label")
        .attr("for", ("d3plus-Select-" + (this._uuid)))
      .merge(label)
        .call(stylize, this._labelStyle)
        .html(this._label);

    return this;

  };

  /**
      @memberof Select
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Select.prototype.container = function container (_) {
    return arguments.length ? (this._container = select(_), this) : this._container;
  };

  /**
      @memberof Select
      @desc Creates a <label> tag for the <select> element.
      @param {String} [*value*]
      @chainable
  */
  Select.prototype.label = function label (_) {
    return arguments.length ? (this._label = _, this) : this._label;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <label> element.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.labelStyle = function labelStyle (_) {
    return arguments.length ? (this._labelStyle = _, this) : this._labelStyle;
  };

  /**
      @memberof Select
      @desc Defines the array of values to be used as <option> tags inside of the <select> element. If no value is passed, the current array is returned.
      @param {Array} [*value* = []]
      @chainable
  */
  Select.prototype.options = function options (_) {
    return arguments.length ? (this._options = _, this) : this._options;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <option> elements.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.optionStyle = function optionStyle (_) {
    return arguments.length ? (this._optionStyle = _, this) : this._optionStyle;
  };

  /**
      @memberof Select
      @desc Defines the selected option.
      @param {Function} [*value*]
      @chainable
  */
  Select.prototype.selected = function selected (_) {
    return arguments.length ? (this._selected = _, this) : this._selected;
  };

  /**
      @memberof Select
      @desc Sets the css styles for the <select> element.
      @param {Object} [*value*]
      @chainable
  */
  Select.prototype.selectStyle = function selectStyle (_) {
    return arguments.length ? (this._selectStyle = _, this) : this._selectStyle;
  };

  /**
      @memberof Select
      @desc Sets the inner text for each <option> element.
      @param {Function|String} [*value* = function(d) { return d.text; }]
      @chainable
  */
  Select.prototype.text = function text (_) {
    return arguments.length ? (this._text = typeof _ === "function" ? _ : constant$7(_), this) : this._text;
  };

  /**
      @memberof Select
      @desc Sets the value for each <option> element.
      @param {Function} [*value* = function(d) { return d.value; }]
      @chainable
  */
  Select.prototype.value = function value (_) {
    return arguments.length ? (this._value = _, this) : this._value;
  };

  return Select;
}(BaseClass));

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Legend
    @extends external:BaseClass
    @desc Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
*/
var Legend = (function (BaseClass$$1) {
  function Legend() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._align = "center";
    this._data = [];
    this._direction = "row";
    this._duration = 600;
    this._height = 200;
    this._id = accessor("id");
    this._label = accessor("id");
    this._lineData = [];
    this._outerBounds = {width: 0, height: 0, x: 0, y: 0};
    this._padding = 5;
    this._shape = constant$7("Rect");
    this._shapeConfig = {
      duration: this._duration,
      fill: accessor("color"),
      fontColor: constant$7("#444"),
      fontFamily: new Rect().fontFamily(),
      fontResize: false,
      fontSize: constant$7(10),
      height: constant$7(10),
      hitArea: function (dd) {
        var d = this$1._lineData[this$1._data.indexOf(dd)],
              h = max([d.height, d.shapeHeight]);
        return {width: d.width + d.shapeWidth, height: h, x: -d.shapeWidth / 2, y: -h / 2};
      },
      labelBounds: function (dd, i, s) {
        var d = this$1._lineData[dd.i],
              w = s.r !== void 0 ? s.r : s.width / 2;
        return {width: d.width, height: d.height, x: w + this$1._padding, y: -d.height / 2};
      },
      opacity: 1,
      r: constant$7(5),
      width: constant$7(10),
      x: function (d, i) {
        var s = this$1._shapeConfig.width;
        var y = this$1._lineData[i].y;
        var pad = this$1._align === "left" || this$1._align === "right" && this$1._direction === "column" ? 0 : this$1._align === "center"
                  ? (this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }))) / 2
                  : this$1._outerBounds.width - this$1._rowWidth(this$1._lineData.filter(function (l) { return y === l.y; }));
        var prevWords = this$1._lineData.slice(0, i).filter(function (l) { return y === l.y; });
        return this$1._rowWidth(prevWords) + this$1._padding * (prevWords.length ? 2 : 0) +
               this$1._outerBounds.x + s(d, i) / 2 + pad;
      },
      y: function (d, i) {
        var s = this$1._shapeConfig.height;
        var ld = this$1._lineData[i];
        return ld.y + this$1._titleHeight + this$1._outerBounds.y +
               max(this$1._lineData.filter(function (l) { return ld.y === l.y; }).map(function (l) { return l.height; }).concat(this$1._data.map(function (l, x) { return s(l, x); }))) / 2;
      }
    };
    this._titleConfig = {
      fontFamily: "Verdana",
      fontSize: 12,
      lineHeight: 13
    };
    this._verticalAlign = "middle";
    this._width = 400;

  }

  if ( BaseClass$$1 ) Legend.__proto__ = BaseClass$$1;
  Legend.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Legend.prototype.constructor = Legend;

  Legend.prototype._fetchConfig = function _fetchConfig (key, d, i) {
    return typeof this._shapeConfig[key] === "function"
         ? this._shapeConfig[key](d, i) : this._shapeConfig[key];
  };

  Legend.prototype._rowHeight = function _rowHeight (row) {
    return max(row.map(function (d) { return d.height; }).concat(row.map(function (d) { return d.shapeHeight; }))) + this._padding;
  };

  Legend.prototype._rowWidth = function _rowWidth (row) {
    var this$1 = this;

    return sum(row.map(function (d, i) {
      var p = this$1._padding * (i === row.length - 1 ? 0 : d.width ? 2 : 1);
      return d.shapeWidth + d.width + p;
    }));
  };

  /**
      @memberof Legend
      @desc Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  Legend.prototype.render = function render (callback) {
    var this$1 = this;


    if (this._select === void 0) { this.select(select("body").append("svg").attr("width", ((this._width) + "px")).attr("height", ((this._height) + "px")).node()); }
    if (this._lineHeight === void 0) { this._lineHeight = function (d, i) { return this$1._fetchConfig("fontSize", d, i) * 1.1; }; }

    // Shape <g> Group
    this._group = elem("g.d3plus-Legend", {parent: this._select});

    var availableHeight = this._height;
    this._titleHeight = 0;
    if (this._title) {
      var f = this._titleConfig.fontFamily,
            lH = this._titleConfig.lineHeight,
            s = this._titleConfig.fontSize;
      var res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lH)
        .width(this._width)
        .height(this._height)
        (this._title);
      this._titleHeight = lH + res.lines.length + this._padding;
      availableHeight -= this._titleHeight;
    }

    // Calculate Text Sizes
    this._lineData = this._data.map(function (d, i) {
      var f = this$1._fetchConfig("fontFamily", d, i),
            lh = this$1._lineHeight(d, i),
            s = this$1._fetchConfig("fontSize", d, i),
            shapeWidth = this$1._fetchConfig("width", d, i);
      var h = availableHeight - (this$1._data.length + 1) * this$1._padding,
            w = this$1._width;
      var res = textWrap()
        .fontFamily(f)
        .fontSize(s)
        .lineHeight(lh)
        .width(w)
        .height(h)
        (this$1._label(d, i));
      res.width = Math.ceil(max(res.lines.map(function (t) { return textWidth(t, {"font-family": f, "font-size": s}); }))) + s * 0.75;
      res.height = Math.ceil(res.lines.length * (lh + 1));
      res.og = {height: res.height, width: res.width};
      res.data = d;
      res.f = f;
      res.s = s;
      res.lh = lh;
      res.y = 0;
      res.id = this$1._id(d, i);
      res.i = i;
      res.shapeWidth = shapeWidth;
      res.shapeHeight = this$1._fetchConfig("height", d, i);
      return res;
    });

    var spaceNeeded;
    var availableWidth = this._width - this._padding * 2;
    spaceNeeded = this._rowWidth(this._lineData);

    if (this._direction === "column" || spaceNeeded > availableWidth) {
      var lines = 1, newRows = [];

      var maxLines = max(this._lineData.map(function (d) { return d.words.length; }));
      this._wrapLines = function() {
        var this$1 = this;


        lines++;

        if (lines > maxLines) { return; }

        var wrappable = lines === 1 ? this._lineData.slice()
                        : this._lineData.filter(function (d) { return d.width + d.shapeWidth + this$1._padding * (d.width ? 2 : 1) > availableWidth && d.words.length >= lines; })
                            .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

        if (wrappable.length && availableHeight > wrappable[0].height * lines) {

          var truncated = false;
          var loop = function ( x ) {
            var label = wrappable[x];
            var h = label.og.height * lines, w = label.og.width * (1.5 * (1 / lines));
            var res = textWrap().fontFamily(label.f).fontSize(label.s).lineHeight(label.lh).width(w).height(h)(label.sentence);
            if (!res.truncated) {
              label.width = Math.ceil(max(res.lines.map(function (t) { return textWidth(t, {"font-family": label.f, "font-size": label.s}); }))) + label.s;
              label.height = res.lines.length * (label.lh + 1);
            }
            else {
              truncated = true;
              return 'break';
            }
          };

          for (var x = 0; x < wrappable.length; x++) {
            var returned = loop( x );

            if ( returned === 'break' ) break;
          }
          if (!truncated) { this._wrapRows(); }
        }
        else {
          newRows = [];
          return;
        }

      };

      this._wrapRows = function() {
        var this$1 = this;

        newRows = [];
        var row = 1, rowWidth = 0;
        for (var i = 0; i < this._lineData.length; i++) {
          var d = this$1._lineData[i],
                w = d.width + this$1._padding * (d.width ? 2 : 1) + d.shapeWidth;
          if (sum(newRows.map(function (row) { return max(row, function (d) { return max([d.height, d.shapeHeight]); }); })) > availableHeight) {
            newRows = [];
            break;
          }
          if (w > availableWidth) {
            newRows = [];
            this$1._wrapLines();
            break;
          }
          else if (rowWidth + w < availableWidth) {
            rowWidth += w;
          }
          else if (this$1._direction !== "column") {
            rowWidth = w;
            row++;
          }
          if (!newRows[row - 1]) { newRows[row - 1] = []; }
          newRows[row - 1].push(d);
          if (this$1._direction === "column") {
            rowWidth = 0;
            row++;
          }
        }
      };

      this._wrapRows();

      if (!newRows.length || sum(newRows, this._rowHeight.bind(this)) + this._padding > availableHeight) {
        spaceNeeded = sum(this._lineData.map(function (d) { return d.shapeWidth + this$1._padding; })) - this._padding;
        for (var i = 0; i < this._lineData.length; i++) {
          this$1._lineData[i].width = 0;
          this$1._lineData[i].height = 0;
        }
        this._wrapRows();
      }

      if (newRows.length && sum(newRows, this._rowHeight.bind(this)) + this._padding < availableHeight) {
        newRows.forEach(function (row, i) {
          row.forEach(function (d) {
            if (i) {
              d.y = sum(newRows.slice(0, i), this$1._rowHeight.bind(this$1));
            }
          });
        });
        spaceNeeded = max(newRows, this._rowWidth.bind(this));
      }
    }

    var innerHeight = max(this._lineData, function (d, i) { return max([d.height, this$1._fetchConfig("height", d.data, i)]) + d.y; }) + this._titleHeight,
          innerWidth = spaceNeeded;

    this._outerBounds.width = innerWidth;
    this._outerBounds.height = innerHeight;

    var xOffset = this._padding,
        yOffset = this._padding;
    if (this._align === "center") { xOffset = (this._width - innerWidth) / 2; }
    else if (this._align === "right") { xOffset = this._width - this._padding - innerWidth; }
    if (this._verticalAlign === "middle") { yOffset = (this._height - innerHeight) / 2; }
    else if (this._verticalAlign === "bottom") { yOffset = this._height - this._padding - innerHeight; }
    this._outerBounds.x = xOffset;
    this._outerBounds.y = yOffset;

    new TextBox()
      .data(this._title ? [{text: this._title}] : [])
      .duration(this._duration)
      .select(this._group.node())
      .textAnchor({left: "start", center: "middle", right: "end"}[this._align])
      .width(this._width - this._padding * 2)
      .x(this._padding)
      .y(this._outerBounds.y)
      .config(this._titleConfig)
      .render();

    this._shapes = [];
    var baseConfig = this._shapeConfig,
          config = {
            id: function (d) { return d.id; },
            label: function (d) { return d.label; },
            lineHeight: function (d) { return d.lH; }
          };

    var data = this._data.map(function (d, i) {

      var obj = {
        __d3plus__: true,
        data: d, i: i,
        id: this$1._id(d, i),
        label: this$1._lineData[i].width ? this$1._label(d, i) : false,
        lH: this$1._lineHeight(d, i),
        shape: this$1._shape(d, i)
      };

      var loop = function ( k ) {
        if (k !== "labelBounds" && {}.hasOwnProperty.call(baseConfig, k)) {
          if (typeof baseConfig[k] === "function") {
            obj[k] = baseConfig[k](d, i);
            config[k] = function (d) { return d[k]; };
          }
          else if (k === "on") {
            config[k] = {};
            var loop$1 = function ( t ) {
              if ({}.hasOwnProperty.call(baseConfig[k], t)) {
                config[k][t] = function(d) {
                  if (!baseConfig[k][t]) { return; }
                  baseConfig[k][t].bind(this)(d.data, d.i);
                };
              }
            };

            for (var t in baseConfig[k]) loop$1( t );
          }
        }
      };

      for (var k in baseConfig) loop( k );

      return obj;

    });

    // Legend Shapes
    this._shapes = [];
    ["Circle", "Rect"].forEach(function (Shape$$1) {

      this$1._shapes.push(new shapes[Shape$$1]()
        .data(data.filter(function (d) { return d.shape === Shape$$1; }))
        .duration(this$1._duration)
        .labelPadding(0)
        .select(this$1._group.node())
        .verticalAlign("top")
        .config(Object.assign({}, baseConfig, config))
        .render());

    });

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.
      @param {Function} [*value*]
      @chainable
  */
  Legend.prototype.active = function active (_) {
    this._shapes.forEach(function (s) { return s.active(_); });
    return this;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.
      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
      @chainable
  */
  Legend.prototype.align = function align (_) {
    return arguments.length ? (this._align = _, this) : this._align;
  };

  /**
      @memberof Legend
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
      @param {Array} [*data* = []]
      @chainable
  */
  Legend.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Legend
      @desc Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.
      @param {String} [*value* = "row"]
      @chainable
  */
  Legend.prototype.direction = function direction (_) {
    return arguments.length ? (this._direction = _, this) : this._direction;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.
      @param {Number} [*value* = 600]
      @chainable
  */
  Legend.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.
      @param {Number} [*value* = 100]
      @chainable
  */
  Legend.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.
      @param {Function} [*value*]
      @chainable
  */
  Legend.prototype.hover = function hover (_) {
    this._shapes.forEach(function (s) { return s.hover(_); });
    return this;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @chainable
      @example
function value(d) {
  return d.id;
}
  */
  Legend.prototype.id = function id (_) {
    return arguments.length ? (this._id = _, this) : this._id;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
      @param {Function|String} [*value*]
      @chainable
  */
  Legend.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : constant$7(_), this) : this._label;
  };

  /**
      @memberof Legend
      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
      @example
{"width": 180, "height": 24, "x": 10, "y": 20}
  */
  Legend.prototype.outerBounds = function outerBounds () {
    return this._outerBounds;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.
      @param {Number} [*value* = 10]
      @chainable
  */
  Legend.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Legend
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  Legend.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value* = "Rect"]
      @chainable
  */
  Legend.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : constant$7(_), this) : this._shape;
  };

  /**
      @memberof Legend
      @desc If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.
      @param {Object} [*config* = {}]
      @chainable
  */
  Legend.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = Object.assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.
      @param {String} [*value*]
      @chainable
  */
  Legend.prototype.title = function title (_) {
    return arguments.length ? (this._title = _, this) : this._title;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Legend.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = Object.assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.
      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
      @chainable
  */
  Legend.prototype.verticalAlign = function verticalAlign (_) {
    return arguments.length ? (this._verticalAlign = _, this) : this._verticalAlign;
  };

  /**
      @memberof Legend
      @desc If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.
      @param {Number} [*value* = 400]
      @chainable
  */
  Legend.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Legend;
}(BaseClass));

var constant$9 = function(x) {
  return function() {
    return x;
  };
};

var BrushEvent = function(target, type, selection) {
  this.target = target;
  this.type = type;
  this.selection = selection;
};

function nopropagation$2() {
  event.stopImmediatePropagation();
}

var noevent$2 = function() {
  event.preventDefault();
  event.stopImmediatePropagation();
};

var MODE_DRAG = {name: "drag"};
var MODE_SPACE = {name: "space"};
var MODE_HANDLE = {name: "handle"};
var MODE_CENTER = {name: "center"};

var X = {
  name: "x",
  handles: ["e", "w"].map(type$1),
  input: function(x, e) { return x && [[x[0], e[0][1]], [x[1], e[1][1]]]; },
  output: function(xy) { return xy && [xy[0][0], xy[1][0]]; }
};

var Y = {
  name: "y",
  handles: ["n", "s"].map(type$1),
  input: function(y, e) { return y && [[e[0][0], y[0]], [e[1][0], y[1]]]; },
  output: function(xy) { return xy && [xy[0][1], xy[1][1]]; }
};

var XY = {
  name: "xy",
  handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(type$1),
  input: function(xy) { return xy; },
  output: function(xy) { return xy; }
};

var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};

var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};

var signsX = {
  overlay: +1,
  selection: +1,
  n: null,
  e: +1,
  s: null,
  w: -1,
  nw: -1,
  ne: +1,
  se: +1,
  sw: -1
};

var signsY = {
  overlay: +1,
  selection: +1,
  n: -1,
  e: null,
  s: +1,
  w: null,
  nw: -1,
  ne: -1,
  se: +1,
  sw: +1
};

function type$1(t) {
  return {type: t};
}

// Ignore right-click, since that should open the context menu.
function defaultFilter$2() {
  return !event.button;
}

function defaultExtent$1() {
  var svg = this.ownerSVGElement || this;
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}

// Like d3.local, but with the name “__brush” rather than auto-generated.
function local$1(node) {
  while (!node.__brush) { if (!(node = node.parentNode)) { return; } }
  return node.__brush;
}

function empty$1(extent) {
  return extent[0][0] === extent[1][0]
      || extent[0][1] === extent[1][1];
}



function brushX() {
  return brush$1(X);
}



function brush$1(dim) {
  var extent = defaultExtent$1,
      filter = defaultFilter$2,
      listeners = dispatch(brush, "start", "brush", "end"),
      handleSize = 6,
      touchending;

  function brush(group) {
    var overlay = group
        .property("__brush", initialize)
      .selectAll(".overlay")
      .data([type$1("overlay")]);

    overlay.enter().append("rect")
        .attr("class", "overlay")
        .attr("pointer-events", "all")
        .attr("cursor", cursors.overlay)
      .merge(overlay)
        .each(function() {
          var extent = local$1(this).extent;
          select(this)
              .attr("x", extent[0][0])
              .attr("y", extent[0][1])
              .attr("width", extent[1][0] - extent[0][0])
              .attr("height", extent[1][1] - extent[0][1]);
        });

    group.selectAll(".selection")
      .data([type$1("selection")])
      .enter().append("rect")
        .attr("class", "selection")
        .attr("cursor", cursors.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");

    var handle = group.selectAll(".handle")
      .data(dim.handles, function(d) { return d.type; });

    handle.exit().remove();

    handle.enter().append("rect")
        .attr("class", function(d) { return "handle handle--" + d.type; })
        .attr("cursor", function(d) { return cursors[d.type]; });

    group
        .each(redraw)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        .on("mousedown.brush touchstart.brush", started);
  }

  brush.move = function(group, selection$$1) {
    if (group.selection) {
      group
          .on("start.brush", function() { emitter(this, arguments).beforestart().start(); })
          .on("interrupt.brush end.brush", function() { emitter(this, arguments).end(); })
          .tween("brush", function() {
            var that = this,
                state = that.__brush,
                emit = emitter(that, arguments),
                selection0 = state.selection,
                selection1 = dim.input(typeof selection$$1 === "function" ? selection$$1.apply(this, arguments) : selection$$1, state.extent),
                i = interpolate$1(selection0, selection1);

            function tween(t) {
              state.selection = t === 1 && empty$1(selection1) ? null : i(t);
              redraw.call(that);
              emit.brush();
            }

            return selection0 && selection1 ? tween : tween(1);
          });
    } else {
      group
          .each(function() {
            var that = this,
                args = arguments,
                state = that.__brush,
                selection1 = dim.input(typeof selection$$1 === "function" ? selection$$1.apply(that, args) : selection$$1, state.extent),
                emit = emitter(that, args).beforestart();

            interrupt(that);
            state.selection = selection1 == null || empty$1(selection1) ? null : selection1;
            redraw.call(that);
            emit.start().brush().end();
          });
    }
  };

  function redraw() {
    var group = select(this),
        selection$$1 = local$1(this).selection;

    if (selection$$1) {
      group.selectAll(".selection")
          .style("display", null)
          .attr("x", selection$$1[0][0])
          .attr("y", selection$$1[0][1])
          .attr("width", selection$$1[1][0] - selection$$1[0][0])
          .attr("height", selection$$1[1][1] - selection$$1[0][1]);

      group.selectAll(".handle")
          .style("display", null)
          .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection$$1[1][0] - handleSize / 2 : selection$$1[0][0] - handleSize / 2; })
          .attr("y", function(d) { return d.type[0] === "s" ? selection$$1[1][1] - handleSize / 2 : selection$$1[0][1] - handleSize / 2; })
          .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection$$1[1][0] - selection$$1[0][0] + handleSize : handleSize; })
          .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection$$1[1][1] - selection$$1[0][1] + handleSize : handleSize; });
    }

    else {
      group.selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
    }
  }

  function emitter(that, args) {
    return that.__brush.emitter || new Emitter(that, args);
  }

  function Emitter(that, args) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
  }

  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) { this.state.emitter = this, this.starting = true; }
      return this;
    },
    start: function() {
      if (this.starting) { this.starting = false, this.emit("start"); }
      return this;
    },
    brush: function() {
      this.emit("brush");
      return this;
    },
    end: function() {
      if (--this.active === 0) { delete this.state.emitter, this.emit("end"); }
      return this;
    },
    emit: function(type) {
      customEvent(new BrushEvent(brush, type, dim.output(this.state.selection)), listeners.apply, listeners, [type, this.that, this.args]);
    }
  };

  function started() {
    if (event.touches) { if (event.changedTouches.length < event.touches.length) { return noevent$2(); } }
    else if (touchending) { return; }
    if (!filter.apply(this, arguments)) { return; }

    var that = this,
        type = event.target.__data__.type,
        mode = (event.metaKey ? type = "overlay" : type) === "selection" ? MODE_DRAG : (event.altKey ? MODE_CENTER : MODE_HANDLE),
        signX = dim === Y ? null : signsX[type],
        signY = dim === X ? null : signsY[type],
        state = local$1(that),
        extent = state.extent,
        selection$$1 = state.selection,
        W = extent[0][0], w0, w1,
        N = extent[0][1], n0, n1,
        E = extent[1][0], e0, e1,
        S = extent[1][1], s0, s1,
        dx,
        dy,
        moving,
        shifting = signX && signY && event.shiftKey,
        lockX,
        lockY,
        point0 = mouse(that),
        point = point0,
        emit = emitter(that, arguments).beforestart();

    if (type === "overlay") {
      state.selection = selection$$1 = [
        [w0 = dim === Y ? W : point0[0], n0 = dim === X ? N : point0[1]],
        [e0 = dim === Y ? E : w0, s0 = dim === X ? S : n0]
      ];
    } else {
      w0 = selection$$1[0][0];
      n0 = selection$$1[0][1];
      e0 = selection$$1[1][0];
      s0 = selection$$1[1][1];
    }

    w1 = w0;
    n1 = n0;
    e1 = e0;
    s1 = s0;

    var group = select(that)
        .attr("pointer-events", "none");

    var overlay = group.selectAll(".overlay")
        .attr("cursor", cursors[type]);

    if (event.touches) {
      group
          .on("touchmove.brush", moved, true)
          .on("touchend.brush touchcancel.brush", ended, true);
    } else {
      var view = select(event.view)
          .on("keydown.brush", keydowned, true)
          .on("keyup.brush", keyupped, true)
          .on("mousemove.brush", moved, true)
          .on("mouseup.brush", ended, true);

      dragDisable(event.view);
    }

    nopropagation$2();
    interrupt(that);
    redraw.call(that);
    emit.start();

    function moved() {
      var point1 = mouse(that);
      if (shifting && !lockX && !lockY) {
        if (Math.abs(point1[0] - point[0]) > Math.abs(point1[1] - point[1])) { lockY = true; }
        else { lockX = true; }
      }
      point = point1;
      moving = true;
      noevent$2();
      move();
    }

    function move() {
      var t;

      dx = point[0] - point0[0];
      dy = point[1] - point0[1];

      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) { dx = Math.max(W - w0, Math.min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx; }
          if (signY) { dy = Math.max(N - n0, Math.min(S - s0, dy)), n1 = n0 + dy, s1 = s0 + dy; }
          break;
        }
        case MODE_HANDLE: {
          if (signX < 0) { dx = Math.max(W - w0, Math.min(E - w0, dx)), w1 = w0 + dx, e1 = e0; }
          else if (signX > 0) { dx = Math.max(W - e0, Math.min(E - e0, dx)), w1 = w0, e1 = e0 + dx; }
          if (signY < 0) { dy = Math.max(N - n0, Math.min(S - n0, dy)), n1 = n0 + dy, s1 = s0; }
          else if (signY > 0) { dy = Math.max(N - s0, Math.min(S - s0, dy)), n1 = n0, s1 = s0 + dy; }
          break;
        }
        case MODE_CENTER: {
          if (signX) { w1 = Math.max(W, Math.min(E, w0 - dx * signX)), e1 = Math.max(W, Math.min(E, e0 + dx * signX)); }
          if (signY) { n1 = Math.max(N, Math.min(S, n0 - dy * signY)), s1 = Math.max(N, Math.min(S, s0 + dy * signY)); }
          break;
        }
      }

      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type in flipX) { overlay.attr("cursor", cursors[type = flipX[type]]); }
      }

      if (s1 < n1) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n1, n1 = s1, s1 = t;
        if (type in flipY) { overlay.attr("cursor", cursors[type = flipY[type]]); }
      }

      if (state.selection) { selection$$1 = state.selection; } // May be set by brush.move!
      if (lockX) { w1 = selection$$1[0][0], e1 = selection$$1[1][0]; }
      if (lockY) { n1 = selection$$1[0][1], s1 = selection$$1[1][1]; }

      if (selection$$1[0][0] !== w1
          || selection$$1[0][1] !== n1
          || selection$$1[1][0] !== e1
          || selection$$1[1][1] !== s1) {
        state.selection = [[w1, n1], [e1, s1]];
        redraw.call(that);
        emit.brush();
      }
    }

    function ended() {
      nopropagation$2();
      if (event.touches) {
        if (event.touches.length) { return; }
        if (touchending) { clearTimeout(touchending); }
        touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
        group.on("touchmove.brush touchend.brush touchcancel.brush", null);
      } else {
        yesdrag(event.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) { selection$$1 = state.selection; } // May be set by brush.move (on start)!
      if (empty$1(selection$$1)) { state.selection = null, redraw.call(that); }
      emit.end();
    }

    function keydowned() {
      switch (event.keyCode) {
        case 16: { // SHIFT
          shifting = signX && signY;
          break;
        }
        case 18: { // ALT
          if (mode === MODE_HANDLE) {
            if (signX) { e0 = e1 - dx * signX, w0 = w1 + dx * signX; }
            if (signY) { s0 = s1 - dy * signY, n0 = n1 + dy * signY; }
            mode = MODE_CENTER;
            move();
          }
          break;
        }
        case 32: { // SPACE; takes priority over ALT
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) { e0 = e1 - dx; } else if (signX > 0) { w0 = w1 - dx; }
            if (signY < 0) { s0 = s1 - dy; } else if (signY > 0) { n0 = n1 - dy; }
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$2();
    }

    function keyupped() {
      switch (event.keyCode) {
        case 16: { // SHIFT
          if (shifting) {
            lockX = lockY = shifting = false;
            move();
          }
          break;
        }
        case 18: { // ALT
          if (mode === MODE_CENTER) {
            if (signX < 0) { e0 = e1; } else if (signX > 0) { w0 = w1; }
            if (signY < 0) { s0 = s1; } else if (signY > 0) { n0 = n1; }
            mode = MODE_HANDLE;
            move();
          }
          break;
        }
        case 32: { // SPACE
          if (mode === MODE_SPACE) {
            if (event.altKey) {
              if (signX) { e0 = e1 - dx * signX, w0 = w1 + dx * signX; }
              if (signY) { s0 = s1 - dy * signY, n0 = n1 + dy * signY; }
              mode = MODE_CENTER;
            } else {
              if (signX < 0) { e0 = e1; } else if (signX > 0) { w0 = w1; }
              if (signY < 0) { s0 = s1; } else if (signY > 0) { n0 = n1; }
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type]);
            move();
          }
          break;
        }
        default: return;
      }
      noevent$2();
    }
  }

  function initialize() {
    var state = this.__brush || {selection: null};
    state.extent = extent.apply(this, arguments);
    state.dim = dim;
    return state;
  }

  brush.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : constant$9([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), brush) : extent;
  };

  brush.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$9(!!_), brush) : filter;
  };

  brush.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush) : handleSize;
  };

  brush.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush : value;
  };

  return brush;
}

/**
    @external Axis
    @see https://github.com/d3plus/d3plus-axis#Axis
*/

/**
    @class Timeline
    @extends external:Axis
*/
var Timeline = (function (Axis$$1) {
  function Timeline() {
    var this$1 = this;


    Axis$$1.call(this);

    this._brushing = true;
    this._brushFilter = function () { return !event.button && event.detail < 2; };
    this._domain = [2001, 2010];
    this._gridSize = 0;
    this._handleConfig = {
      fill: "#444"
    };
    this._handleSize = 6;
    this._height = 100;
    this._on = {};
    this.orient("bottom");
    this._scale = "time";
    this._selectionConfig = {
      "fill": "#777",
      "stroke-width": 0
    };
    this._shape = "Rect";
    this._shapeConfig = Object.assign({}, this._shapeConfig, {
      height: function (d) { return d.tick ? 10 : 0; },
      width: function (d) { return d.tick ? this$1._domain.map(function (t) { return date$2(t).getTime(); }).includes(d.id) ? 2 : 1 : 0; }
    });
    this._snapping = true;

  }

  if ( Axis$$1 ) Timeline.__proto__ = Axis$$1;
  Timeline.prototype = Object.create( Axis$$1 && Axis$$1.prototype );
  Timeline.prototype.constructor = Timeline;

  /**
      @memberof Timeline
      @desc Triggered on brush "brush".
      @private
  */
  Timeline.prototype._brushBrush = function _brushBrush () {

    if (event.sourceEvent && event.sourceEvent.offsetX && event.selection !== null && (!this._brushing || this._snapping)) {

      var domain = (this._brushing ? event.selection
                   : [event.selection[0], event.selection[0]])
                   .map(this._d3Scale.invert)
                   .map(Number);

      var ticks = this._availableTicks.map(Number);
      domain[0] = date$2(closest(domain[0], ticks));
      domain[1] = date$2(closest(domain[1], ticks));

      var single = +domain[0] === +domain[1];

      this._selection = single ? domain[0] : domain;

      var pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    if (this._on.brush) { this._on.brush(this._selection); }

  };

  /**
      @memberof Timeline
      @desc Triggered on brush "end".
      @private
  */
  Timeline.prototype._brushEnd = function _brushEnd () {

    if (!event.sourceEvent) { return; } // Only transition after input.

    var domain = (event.selection && this._brushing ? event.selection
                 : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
                 .map(this._d3Scale.invert)
                 .map(Number);

    var ticks = this._availableTicks.map(Number);
    domain[0] = date$2(closest(domain[0], ticks));
    domain[1] = date$2(closest(domain[1], ticks));

    var single = +domain[0] === +domain[1];

    if (this._brushing || !this._snapping) {

      var pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.transition(this._transition).call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    this._selection = single ? domain[0] : domain;
    if (this._on.end) { this._on.end(this._selection); }

  };

  /**
      @memberof Timeline
      @desc Triggered on brush "start".
      @private
  */
  Timeline.prototype._brushStart = function _brushStart () {

    if (event.sourceEvent !== null && (!this._brushing || this._snapping)) {

      var domain = (event.selection && this._brushing ? event.selection
                   : [event.sourceEvent.offsetX, event.sourceEvent.offsetX])
                   .map(this._d3Scale.invert)
                   .map(Number);

      var ticks = this._availableTicks.map(Number);
      domain[0] = date$2(closest(domain[0], ticks));
      domain[1] = date$2(closest(domain[1], ticks));

      var single = +domain[0] === +domain[1];

      var pixelDomain = domain.map(this._d3Scale);

      if (single) {
        pixelDomain[0] -= 0.1;
        pixelDomain[1] += 0.1;
      }

      this._brushGroup.call(this._brush.move, pixelDomain);

    }

    this._brushStyle();
    if (this._on.start) { this._on.start(); }

  };

  /**
      @memberof Timeline
      @desc Overrides the default brush styles.
      @private
  */
  Timeline.prototype._brushStyle = function _brushStyle () {

    var ref = this._position;
    var height = ref.height;
    var timelineHeight = this._shape === "Circle"
                         ? typeof this._shapeConfig.r === "function" ? this._shapeConfig.r({tick: true}) * 2 : this._shapeConfig.r
                         : this._shape === "Rect"
                         ? typeof this._shapeConfig[height] === "function" ? this._shapeConfig[height]({tick: true}) : this._shapeConfig[height]
                         : this._tickSize;

    this._brushGroup.selectAll(".overlay")
      .attr("cursor", this._brushing ? "crosshair" : "pointer");

    this._brushGroup.selectAll(".selection")
      .call(attrize, this._selectionConfig)
      .attr("height", timelineHeight);

    this._brushGroup.selectAll(".handle")
      .call(attrize, this._handleConfig)
      .attr("height", timelineHeight + this._handleSize);

  };

  /**
      @memberof Timeline
      @desc Draws the timeline.
      @param {Function} [*callback* = undefined]
      @chainable
  */
  Timeline.prototype.render = function render (callback) {

    Axis$$1.prototype.render.call(this, callback);

    var ref = this._position;
    var height = ref.height;
    var y = ref.y;

    var offset = this._outerBounds[y],
          range = this._d3Scale.range();

    var brush$$1 = this._brush = brushX()
      .extent([[range[0], offset], [range[1], offset + this._outerBounds[height]]])
      .filter(this._brushFilter)
      .handleSize(this._handleSize)
      .on("start", this._brushStart.bind(this))
      .on("brush", this._brushBrush.bind(this))
      .on("end", this._brushEnd.bind(this));

    var latest = this._availableTicks[this._availableTicks.length - 1];
    var selection$$1 = (this._selection === void 0 ? [latest, latest]
                    : this._selection instanceof Array
                    ? this._selection.slice()
                    : [this._selection, this._selection])
                    .map(date$2)
                    .map(this._d3Scale);

    if (selection$$1[0] === selection$$1[1]) {
      selection$$1[0] -= 0.1;
      selection$$1[1] += 0.1;
    }

    this._brushGroup = elem("g.brushGroup", {parent: this._group});
    this._brushGroup.call(brush$$1).transition(this._transition)
      .call(brush$$1.move, selection$$1);

    this._outerBounds.y -= this._handleSize / 2;
    this._outerBounds.height += this._handleSize / 2;

    return this;

  };

  /**
      @memberof Timeline
      @desc If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Timeline.prototype.brushing = function brushing (_) {
    return arguments.length ? (this._brushing = _, this) : this._brushing;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.
      @param {Function} [*value*]
      @chainable
      @example
function() {
  return !event.button && event.detail < 2;
}
  */
  Timeline.prototype.brushFilter = function brushFilter (_) {
    return arguments.length ? (this._brushFilter = _, this) : this._brushFilter;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.
      @param {Object} [*value*]
      @chainable
  */
  Timeline.prototype.handleConfig = function handleConfig (_) {
    return arguments.length ? (this._handleConfig = Object.assign(this._handleConfig, _), this) : this._handleConfig;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.
      @param {Number} [*value* = 6]
      @chainable
  */
  Timeline.prototype.handleSize = function handleSize (_) {
    return arguments.length ? (this._handleSize = _, this) : this._handleSize;
  };

  /**
      @memberof Timeline
      @desc Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.
      @param {String|Object} [*typename*]
      @param {Function} [*listener*]
      @chainable
  */
  Timeline.prototype.on = function on (_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.
      @param {Object} [*value*]
      @chainable
  */
  Timeline.prototype.selectionConfig = function selectionConfig (_) {
    return arguments.length ? (this._selectionConfig = Object.assign(this._selectionConfig, _), this) : this._selectionConfig;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.
      @param {Array|Date|Number|String} [*value*]
      @chainable
  */
  Timeline.prototype.selection = function selection$$1 (_) {
    return arguments.length ? (this._selection = _, this) : this._selection;
  };

  /**
      @memberof Timeline
      @desc If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Timeline.prototype.snapping = function snapping (_) {
    return arguments.length ? (this._snapping = _, this) : this._snapping;
  };

  return Timeline;
}(Axis));

/**
    @class Tooltip
    @extends BaseClass
    @desc Creates HTML tooltips in the body of a webpage.
*/
var Tooltip = (function (BaseClass$$1) {
  function Tooltip() {

    BaseClass$$1.call(this);
    this._background = constant$7("rgba(255, 255, 255, 0.75)");
    this._body = accessor("body", "");
    this._bodyStyle = {
      "font-family": "Verdana",
      "font-size": "10px",
      "font-weight": "400"
    };
    this._border = constant$7("1px solid rgba(0, 0, 0, 0.1)");
    this._borderRadius = constant$7("2px");
    this._className = "d3plus-tooltip";
    this._data = [];
    this._duration = constant$7(200);
    this._footer = accessor("footer", "");
    this._footerStyle = {
      "font-family": "Verdana",
      "font-size": "10px",
      "font-weight": "400"
    };
    this._height = constant$7("auto");
    this._id = function (d, i) { return d.id || ("" + i); };
    this._offset = constant$7(10);
    this._padding = constant$7("5px");
    this._pointerEvents = constant$7("auto");
    this._prefix = prefix$1();
    this._tableStyle = {
      "border-spacing": "0",
      "width": "100%"
    };
    this._tbody = [];
    this._tbodyStyle = {
      "font-family": "Verdana",
      "font-size": "10px",
      "text-align": "center"
    };
    this._thead = [];
    this._theadStyle = {
      "font-family": "Verdana",
      "font-size": "10px",
      "font-weight": "600",
      "text-align": "center"
    };
    this._title = accessor("title", "");
    this._titleStyle = {
      "font-family": "Verdana",
      "font-size": "12px",
      "font-weight": "600"
    };
    this._translate = function (d) { return [d.x, d.y]; };
    this._width = constant$7("auto");

  }

  if ( BaseClass$$1 ) Tooltip.__proto__ = BaseClass$$1;
  Tooltip.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Tooltip.prototype.constructor = Tooltip;

  /**
      The inner return object and draw function that gets assigned the public methods.
      @private
  */
  Tooltip.prototype.render = function render (callback) {
    var this$1 = this;


    var that = this;

    var tooltips = select("body").selectAll(("." + (this._className)))
      .data(this._data, this._id);

    var enter = tooltips.enter().append("div")
      .attr("class", this._className)
      .style("position", "absolute")
      .style(((this._prefix) + "transform"), "scale(0)")
      .style(((this._prefix) + "transform-origin"), "50% 100%");

    var update = tooltips.merge(enter);

    /**
        Creates DIV elements with a unique class and styles.
        @private
    */
    function divElement(cat) {
      enter.append("div").attr("class", ("d3plus-tooltip-" + cat));
      var div = update.select((".d3plus-tooltip-" + cat)).html(that[("_" + cat)]);
      stylize(div, that[("_" + cat + "Style")]);
    }

    /**
        Fetches table contents given functions or values.
        @private
    */
    function cellContent(d) {
      if (typeof d === "function") {
        var datum = select(this.parentNode.parentNode).datum();
        return d(datum, that._data.indexOf(datum));
      }
      else { return d; }
    }

    /**
        Sets styles for both enter and update.
        @private
    */
    function boxStyles(box) {

      box
        .style("background", that._background)
        .style(((that._prefix) + "border-radius"), that._borderRadius)
        .style("pointer-events", that._pointerEvents)
        .style("padding", that._padding)
        .style("width", that._width)
        .style("height", that._height)
        .style("border", function(d, i) {
          var b = select(this).style("border");
          return b !== "0px none rgb(0, 0, 0)" ? b : that._border(d, i);
        })
        .style("top", function(d, i) {
          return ((that._translate(d, i)[1] - this.offsetHeight - that._offset(d, i)) + "px");
        })
        .style("left", function(d, i) {
          return ((that._translate(d, i)[0] - this.offsetWidth / 2) + "px");
        });

    }

    divElement("title");
    divElement("body");

    var tableEnter = enter.append("table").attr("class", "d3plus-tooltip-table");
    var table = update.select(".d3plus-tooltip-table");
    stylize(table, this._tableStyle);

    tableEnter.append("thead").attr("class", "d3plus-tooltip-thead");
    var tableHead = update.select(".d3plus-tooltip-thead");
    stylize(tableHead, this._theadStyle);
    var th = tableHead.selectAll("th").data(this._thead);
    th.enter().append("th").merge(th).html(cellContent);
    th.exit().remove();

    tableEnter.append("tbody").attr("class", "d3plus-tooltip-tbody");
    var tableBody = update.select(".d3plus-tooltip-tbody");
    stylize(tableBody, this._tbodyStyle);
    var tr = tableBody.selectAll("tr").data(this._tbody);
    var trEnter = tr.enter().append("tr");
    tr.exit().remove();
    var trUpdate = tr.merge(trEnter);
    var td = trUpdate.selectAll("td").data(function (d) { return d; });
    td.enter().append("td").merge(td).html(cellContent);

    divElement("footer");

    enter.call(boxStyles);

    var t = transition().duration(this._duration);

    update
      .attr("id", function (d, i) { return ("d3plus-tooltip-" + (this$1._id(d, i))); })
      .transition(t)
        .style(((this._prefix) + "transform"), "scale(1)")
        .call(boxStyles);

    tooltips.exit()
      .transition(t)
        .style(((this._prefix) + "transform"), "scale(0)")
        .remove();

    if (callback) { setTimeout(callback, this._duration + 100); }

    return this;

  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the background accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background accessor.
      @param {Function|String} [*value* = "rgba(255, 255, 255, 0.75)"]
  */
  Tooltip.prototype.background = function background (_) {
    return arguments.length ? (this._background = typeof _ === "function" ? _ : constant$7(_), this) : this._background;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the body accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current body accessor.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function value(d) {
  return d.body || "";
}
  */
  Tooltip.prototype.body = function body (_) {
    return arguments.length ? (this._body = typeof _ === "function" ? _ : constant$7(_), this) : this._body;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the body styles to the specified values and returns this generator. If *value* is not specified, returns the current body styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "font-family": "Verdana",
  "font-size": "10px",
  "font-weight": "400"
}
  */
  Tooltip.prototype.bodyStyle = function bodyStyle (_) {
    return arguments.length ? (this._bodyStyle = Object.assign(this._bodyStyle, _), this) : this._bodyStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the border accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border accessor.
      @param {Function|String} [*value* = "1px solid rgba(0, 0, 0, 0.1)"]
  */
  Tooltip.prototype.border = function border (_) {
    return arguments.length ? (this._border = typeof _ === "function" ? _ : constant$7(_), this) : this._border;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the border-radius accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current border-radius accessor.
      @param {Function|String} [*value* = "2px"]
  */
  Tooltip.prototype.borderRadius = function borderRadius (_) {
    return arguments.length ? (this._borderRadius = typeof _ === "function" ? _ : constant$7(_), this) : this._borderRadius;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the class name to the specified string and returns this generator. If *value* is not specified, returns the current class name.
      @param {String} [*value* = "d3plus-tooltip"]
  */
  Tooltip.prototype.className = function className (_) {
    return arguments.length ? (this._className = _, this) : this._className;
  };

  /**
      @memberof Tooltip
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
  */
  Tooltip.prototype.data = function data (_) {
    return arguments.length ? (this._data = _, this) : this._data;
  };

  /**
      @memberof Tooltip
      @desc If *ms* is specified, sets the duration accessor to the specified function or number and returns this generator. If *ms* is not specified, returns the current duration accessor.
      @param {Function|Number} [*ms* = 200]
  */
  Tooltip.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = typeof _ === "function" ? _ : constant$7(_), this) : this._duration;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the footer accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current footer accessor.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function value(d) {
  return d.footer || "";
}
  */
  Tooltip.prototype.footer = function footer (_) {
    return arguments.length ? (this._footer = typeof _ === "function" ? _ : constant$7(_), this) : this._footer;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the footer styles to the specified values and returns this generator. If *value* is not specified, returns the current footer styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "font-family": "Verdana",
  "font-size": "10px",
  "font-weight": "400"
}
  */
  Tooltip.prototype.footerStyle = function footerStyle (_) {
    return arguments.length ? (this._footerStyle = Object.assign(this._footerStyle, _), this) : this._footerStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current height accessor.
      @param {Function|String} [*value* = "auto"]
  */
  Tooltip.prototype.height = function height (_) {
    return arguments.length ? (this._height = typeof _ === "function" ? _ : constant$7(_), this) : this._height;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the id accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current id accessor.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function value(d, i) {
  return d.id || "" + i;
}
  */
  Tooltip.prototype.id = function id (_) {
    return arguments.length ? (this._id = typeof _ === "function" ? _ : constant$7(_), this) : this._id;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the offset accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current offset accessor.
      @param {Function|Number} [*value* = 10]
  */
  Tooltip.prototype.offset = function offset (_) {
    return arguments.length ? (this._offset = typeof _ === "function" ? _ : constant$7(_), this) : this._offset;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the padding accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current padding accessor.
      @param {Function|String} [*value* = "5px"]
  */
  Tooltip.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = typeof _ === "function" ? _ : constant$7(_), this) : this._padding;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the pointer-events accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current pointer-events accessor.
      @param {Function|String} [*value* = "auto"]
  */
  Tooltip.prototype.pointerEvents = function pointerEvents (_) {
    return arguments.length ? (this._pointerEvents = typeof _ === "function" ? _ : constant$7(_), this) : this._pointerEvents;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the table styles to the specified values and returns this generator. If *value* is not specified, returns the current table styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "border-spacing": "0",
  "width": "100%"
}
  */
  Tooltip.prototype.tableStyle = function tableStyle (_) {
    return arguments.length ? (this._tableStyle = Object.assign(this._tableStyle, _), this) : this._tableStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the contents of the table body to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table body data.
      @param {Array} [*value* = []]
  */
  Tooltip.prototype.tbody = function tbody (_) {
    return arguments.length ? (this._tbody = _, this) : this._tbody;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the table body styles to the specified values and returns this generator. If *value* is not specified, returns the current table body styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "font-family": "Verdana",
  "font-size": "10px",
  "font-weight": "600",
  "text-align": "center"
}
  */
  Tooltip.prototype.tbodyStyle = function tbodyStyle (_) {
    return arguments.length ? (this._tbodyStyle = Object.assign(this._tbodyStyle, _), this) : this._tbodyStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the contents of the table head to the specified array of functions or strings and returns this generator. If *value* is not specified, returns the current table head data.
      @param {Array} [*value* = []]
  */
  Tooltip.prototype.thead = function thead (_) {
    return arguments.length ? (this._thead = _, this) : this._thead;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the table head styles to the specified values and returns this generator. If *value* is not specified, returns the current table head styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "font-family": "Verdana",
  "font-size": "10px",
  "font-weight": "600",
  "text-align": "center"
}
  */
  Tooltip.prototype.theadStyle = function theadStyle (_) {
    return arguments.length ? (this._theadStyle = Object.assign(this._theadStyle, _), this) : this._theadStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the title accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current title accessor.
      @param {Function|String} [*value*]
      @example <caption>default accessor</caption>
function value(d) {
  return d.title || "";
}
  */
  Tooltip.prototype.title = function title (_) {
    return arguments.length ? (this._title = typeof _ === "function" ? _ : constant$7(_), this) : this._title;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the title styles to the specified values and returns this generator. If *value* is not specified, returns the current title styles.
      @param {Object} [*value*]
      @example <caption>default styles</caption>
{
  "font-family": "Verdana",
  "font-size": "12px",
  "font-weight": "600",
  "padding-bottom": "5px"
}
  */
  Tooltip.prototype.titleStyle = function titleStyle (_) {
    return arguments.length ? (this._titleStyle = Object.assign(this._titleStyle, _), this) : this._titleStyle;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the translate accessor to the specified function or array and returns this generator. If *value* is not specified, returns the current translate accessor.
      @param {Function|Array} [*value*]
      @example <caption>default accessor</caption>
function value(d) {
  return [d.x, d.y];
}
  */
  Tooltip.prototype.translate = function translate (_) {
    return arguments.length ? (this._translate = typeof _ === "function" ? _ : constant$7(_), this) : this._translate;
  };

  /**
      @memberof Tooltip
      @desc If *value* is specified, sets the width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|String} [*value* = "auto"]
  */
  Tooltip.prototype.width = function width (_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : constant$7(_), this) : this._width;
  };

  return Tooltip;
}(BaseClass));

/**
    @function _drawBack
    @desc Draws a back button if there are states in this._history.
    @private
*/
var drawBack = function() {

  var visible = this._history.length;

  var backGroup = elem("g.d3plus-viz-back", {
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  this._backClass
    .data(visible ? [{text: locale$3.t("Back", {lng: this._locale}), x: this._padding * 2, y: 0}] : [])
    .select(backGroup)
    .config(this._backConfig)
    .render();

  this._margin.top += visible ? this._backClass.fontSize()() + this._padding : 0;

};

/**
    @function _drawLegend
    @desc Renders the legend if this._legend is not falsy.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawControls = function() {
  var this$1 = this;


  var condition = this._controls && this._controls.length;
  var that = this;
  var transform = {
    height: this._height - this._margin.top - this._margin.bottom,
    width: this._width - this._margin.left - this._margin.right,
    x: this._margin.left,
    y: this._margin.top
  };

  var foreign = elem("foreignObject.d3plus-viz-controls", {
    condition: condition,
    enter: Object.assign({opacity: 0}, transform),
    exit: Object.assign({opacity: 0}, transform),
    parent: this._select,
    transition: this._transition,
    update: Object.assign({opacity: 1}, transform)
  });

  var container = foreign.selectAll("div.d3plus-viz-controls-container")
    .data([null]);

  container = container.enter().append("xhtml:div")
      .attr("class", "d3plus-viz-controls-container")
      .style("margin-top", ((transform.height) + "px"))
    .merge(container);

  if (condition) {

    var loop = function ( i ) {

      var control = this$1._controls[i];

      var on = {};
      if (control.on) {
        var loop$1 = function ( event ) {
          if ({}.hasOwnProperty.call(control.on, event)) {
            on[event] = function() {
              control.on[event].bind(that)(this.value);
            };
          }
        };

        for (var event in control.on) loop$1( event );

      }

      var id = control.label || i;
      if (!this$1._controlCache[id]) { this$1._controlCache[id] = new Select().container(container.node()); }
      this$1._controlCache[id]
        .config(control)
        .config({on: on})
        .config(this$1._controlConfig)
        .render();

    };

    for (var i = 0; i < this._controls.length; i++) loop( i );

    var bounds = container.node().getBoundingClientRect();

    container
        .style("text-align", "center")
      .transition(this._transition)
        .style("margin-top", ((transform.height - bounds.height) + "px"));

    this._margin.bottom += bounds.height;

  }

};

/**
    @function _colorNest
    @desc Returns an Array of data objects based on a given color accessor and groupBy levels.
    @param {Array} raw The raw data Array to be grouped by color.
    @param {Function} fill The color accessor for each data object.
    @param {Array} [groupBy = []] An optional array of grouping accessors. Will autodetect if a certain group by level is assigning the colors, and will return the appropriate accessor.
    @private
*/
var colorNest = function(raw, fill, groupBy) {
  if ( groupBy === void 0 ) groupBy = [];


  if (groupBy && !(groupBy instanceof Array)) { groupBy = [groupBy]; }

  var colors = nest().key(fill).entries(raw);
  if (colors.length < 2) { return {data: [], id: fill}; }
  var data, id;

  if (groupBy.length) {
    var numColors = colors.length;
    var loop = function ( i ) {
      var ids = colors.map(function (c) { return Array.from(new Set(c.values.map(function (d) { return groupBy[i](d); }))); }),
            total = sum(ids, function (d) { return d.length; }),
            uniques = new Set(merge(ids)).size;
      if (total === numColors && uniques === numColors || i === groupBy.length - 1) {
        id = groupBy[i];
        data = nest().key(id).entries(raw).map(function (d) { return objectMerge(d.values); });
        return 'break';
      }
    };

    for (var i = 0; i < groupBy.length; i++) {
      var returned = loop( i );

      if ( returned === 'break' ) break;
    }
  }
  else {
    id = fill;
    data = colors.map(function (d) { return objectMerge(d.values); });
  }

  return {data: data, id: id};

};

/**
    @function _drawLegend
    @desc Renders the legend if this._legend is not falsy.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawLegend = function(data) {
  var this$1 = this;
  if ( data === void 0 ) data = [];


  var position = this._legendPosition;
  var wide = ["top", "bottom"].includes(position);
  var transform = {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")};

  this._legendData = [];
  if (data.length) {

    var dataNest = nest();
    for (var i = 0; i <= this._drawDepth; i++) { dataNest.key(this$1._groupBy[i]); }
    dataNest.rollup(function (leaves) { return this$1._legendData.push(objectMerge(leaves, this$1._aggs)); }).entries(data);

  }

  var legendGroup = elem("g.d3plus-viz-legend", {
    condition: this._legend,
    enter: transform,
    parent: this._select,
    transition: this._transition,
    update: transform
  }).node();

  if (this._legend) {

    var legend = colorNest(this._legendData, this._shapeConfig.fill, this._groupBy);

    this._legendClass
      .id(legend.id)
      .align(wide ? "center" : position)
      .direction(wide ? "row" : "column")
      .duration(this._duration)
      .data(legend.data.length > 1 ? legend.data : [])
      .height(this._height - this._margin.bottom - this._margin.top)
      .label(this._label || legend.id)
      .select(legendGroup)
      .verticalAlign(!wide ? "middle" : position)
      .width(this._width - this._margin.left - this._margin.right)
      .shapeConfig(this._shapeConfig)
      .shapeConfig({on: Object.keys(this._on)
        .filter(function (e) { return !e.includes(".") || e.includes(".legend"); })
        .reduce(function (obj, e) {
          obj[e] = this$1._on[e];
          return obj;
        }, {})})
      .config(this._legendConfig)
      .render();

    var legendBounds = this._legendClass.outerBounds();
    if (legendBounds.height) {
      if (wide) { this._margin[position] += legendBounds.height + this._legendClass.padding() * 2; }
      else { this._margin[position] += legendBounds.width + this._legendClass.padding() * 2; }
    }

  }

};

/**
    @function _drawTimeline
    @desc Renders the timeline if this._time and this._timeline are not falsy and there are more than 1 tick available.
    @param {Array} dara The filtered data array to be displayed.
    @private
*/
var drawTimeline = function(data) {
  if ( data === void 0 ) data = [];


  var timelinePossible = this._time && this._timeline;
  var ticks$$1 = timelinePossible ? Array.from(new Set(this._data.map(this._time))).map(date$2) : [];
  timelinePossible = timelinePossible && ticks$$1.length > 1;

  var timelineGroup = elem("g.d3plus-viz-timeline", {
    condition: timelinePossible,
    parent: this._select,
    transition: this._transition
  }).node();

  if (timelinePossible) {

    var timeline = this._timelineClass
      .domain(extent(ticks$$1))
      .duration(this._duration)
      .height(this._height - this._margin.bottom)
      .select(timelineGroup)
      .ticks(ticks$$1.sort(function (a, b) { return +a - +b; }))
      .width(this._width);

    if (this._timelineSelection === void 0) {

      var dates = extent(data.map(this._time).map(date$2));
      this._timelineSelection = dates[0] === dates[1] ? dates[0] : dates;
      timeline.selection(this._timelineSelection);

    }

    timeline
      .config(this._timelineConfig)
      .render();

    this._margin.bottom += timeline.outerBounds().height + timeline.padding() * 2;

  }

};

/**
    @function _drawTitle
    @desc Draws a title if this._title is defined.
    @param {Array} [*data*] The currently filtered dataset.
    @private
*/
var drawTitle = function(data) {
  if ( data === void 0 ) data = [];


  var text = this._title ? this._title(data) : false;

  var group = elem("g.d3plus-viz-title", {
    enter: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")},
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  this._titleClass
    .data(text ? [{text: text}] : [])
    .select(group)
    .width(this._width - this._margin.left - this._margin.right)
    .config(this._titleConfig)
    .render();

  this._margin.top += text ? group.getBBox().height + this._padding : 0;

};

/**
    @function _drawTotal
    @desc Draws a total title if this._total is defined.
    @param {Array} [*data*] The currently filtered dataset.
    @private
*/
var drawTotal = function(data) {
  if ( data === void 0 ) data = [];


  var total = typeof this._total === "function" ? sum(data.map(this._total))
              : this._total === true && this._size ? sum(data.map(this._size)) : false;

  var group = elem("g.d3plus-viz-total", {
    enter: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")},
    parent: this._select,
    transition: this._transition,
    update: {transform: ("translate(" + (this._margin.left) + ", " + (this._margin.top) + ")")}
  }).node();

  var visible = typeof total === "number";

  this._totalClass
    .data(visible ? [{text: ((locale$3.t("Total", {lng: this._locale})) + ": " + total)}] : [])
    .select(group)
    .width(this._width - this._margin.left - this._margin.right)
    .config(this._totalConfig)
    .render();

  this._margin.top += visible ? group.getBBox().height + this._padding : 0;

};

/**
  @desc Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
  @private
*/
function _elementSize(element, s) {

  if (element.tagName === undefined || ["BODY", "HTML"].indexOf(element.tagName) >= 0) {

    var val  = window[("inner" + (s.charAt(0).toUpperCase() + s.slice(1)))];
    var elem = select(element);

    if (s === "width") {
      val -= parseFloat(elem.style("margin-left"), 10);
      val -= parseFloat(elem.style("margin-right"), 10);
      val -= parseFloat(elem.style("padding-left"), 10);
      val -= parseFloat(elem.style("padding-right"), 10);
    }
    else {
      val -= parseFloat(elem.style("margin-top"), 10);
      val -= parseFloat(elem.style("margin-bottom"), 10);
      val -= parseFloat(elem.style("padding-top"), 10);
      val -= parseFloat(elem.style("padding-bottom"), 10);
    }

    return val;

  }
  else {

    var val$1 = parseFloat(select(element).style(s), 10);
    if (typeof val$1 === "number" && val$1 > 0) { return val$1; }
    else { return _elementSize(element.parentNode, s); }

  }
}

/**
    @function getSize
    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
    @param {HTMLElement} elem The HTMLElement to find dimensions for.
    @private
*/
var getSize = function(elem) {
  return [_elementSize(elem, "width"), _elementSize(elem, "height")];
};

/**
  @desc Returns a *Boolean* denoting whether or not a given DOM element is visible in the current window.
  @param {DOMElement} elem The DOM element to analyze.
  @param {Number} [buffer = 0] A pixel offset from the edge of the top and bottom of the screen. If a positive value, the element will be deemed visible when it is that many pixels away from entering the viewport. If negative, the element will have to enter the viewport by that many pixels before being deemed visible.
  @private
*/
var inViewport = function(elem, buffer) {
  if ( buffer === void 0 ) buffer = 0;


  var pageX = window.pageXOffset !== undefined ? window.pageXOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
        pageY = window.pageYOffset !== undefined ? window.pageYOffset
              : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  var height = elem.offsetHeight,
      left = elem.offsetLeft,
      top = elem.offsetTop,
      width = elem.offsetWidth;

  if (height === void 0) {
    var bounds = elem.getBoundingClientRect();
    height = bounds.height;
    left = bounds.left + pageX;
    top = bounds.top + pageY;
    width = bounds.width;
  }

  return pageY + window.innerHeight > top + buffer && pageY + buffer < top + height &&
         pageX + window.innerWidth > left + buffer && pageX + buffer < left + width;

};

/**
    @desc On click event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var click = function(d, i) {

  this._select.style("cursor", "auto");
  
  if (this._drawDepth < this._groupBy.length - 1) {

    var filterGroup = this._groupBy[this._drawDepth],
          filterId = filterGroup(d, i);

    this.hover(false);
    if (this._tooltip) { this._tooltipClass.data([]).render(); }

    this._history.push({
      depth: this._depth,
      filter: this._filter
    });

    this.config({
      depth: this._drawDepth + 1,
      filter: function (f, x) { return filterGroup(f, x) === filterId; }
    }).render();

  }

};

/**
    @desc On mouseenter event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseenter = function(d, i) {
  var this$1 = this;


  var filterId = this._ids(d, i);

  this.hover(function (h, x) {
    var ids = this$1._ids(h, x);
    return filterId[filterId.length - 1] === ids[filterId.length - 1];
  });

};

/**
    @desc Tooltip logic for a specified data point.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @param {Object} [*config*] Optional configuration methods for the Tooltip class.
    @private
*/
var tooltip = function(d, i, config) {
  if ( config === void 0 ) config = {};


  if (this._tooltip) {
    this._select.style("cursor", "pointer");
    this._tooltipClass.data([d])
      .footer(this._drawDepth < this._groupBy.length - 1
            ? locale$3.t("Click to Expand", {lng: this._locale})
            : this._active && this._active(d, i)
            ? !this._focus || this._focus === this._id(d, i)
            ? locale$3.t("Click to Remove Highlight", {lng: this._locale})
            : locale$3.t("Click to Highlight", {lng: this._locale})
            : locale$3.t("Click to Highlight", {lng: this._locale}))
      .title(this._drawLabel)
      .translate(mouse(select("html").node()))
      .config(config)
      .config(this._tooltipConfig)
      .render();
  }

};

/**
    @desc On click event for Legend class.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var clickLegend = function(d, i) {
  var this$1 = this;


  if (this._hover && this._drawDepth >= this._groupBy.length - 1) {

    if (this._active && this._active(d, i)) {
      this.active(false);
      mouseenter.bind(this)(d, i);
    }
    else {

      var filterId = this._ids(d, i);

      this.active(function (h, x) {
        var ids = this$1._ids(h, x);
        return filterId[filterId.length - 1] === ids[filterId.length - 1];
      });
    }

    tooltip.bind(this)(d, i, {title: this._legendClass.label()});

  }

};

/**
    @desc On click event for Shape classes.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var clickShape = function(d, i) {
  var this$1 = this;


  if (this._hover && this._drawDepth >= this._groupBy.length - 1) {

    if (this._active && this._active(d, i)) {
      this.active(false);
      mouseenter.bind(this)(d, i);
    }
    else {

      var filterId = this._ids(d, i);

      this.active(function (h, x) {
        var ids = this$1._ids(h, x);
        return filterId[filterId.length - 1] === ids[filterId.length - 1];
      });
    }

    tooltip.bind(this)(d, i);

  }

};

/**
    @desc On mouseleave event for all shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mouseleave = function() {

  this.hover(false);
  this._select.style("cursor", "auto");
  if (this._tooltip) { this._tooltipClass.data([]).render(); }

};

/**
    @desc On mousemove event for all legend shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mousemoveLegend = function(d, i) {

  tooltip.bind(this)(d, i, {title: this._legendClass.label()});

};

/**
    @desc On mousemove event for all primary shapes in a Viz.
    @param {Object} *d* The data object being interacted with.
    @param {Number} *i* The index of the data object being interacted with.
    @private
*/
var mousemoveShape = function(d, i) {

  tooltip.bind(this)(d, i);

};

/**
    @external BaseClass
    @see https://github.com/d3plus/d3plus-common#BaseClass
*/

/**
    @class Viz
    @extends external:BaseClass
    @desc Creates an x/y plot based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#treemap.data) method. See [this example](https://d3plus.org/examples/d3plus-treemap/getting-started/) for help getting started using the treemap generator.
*/
var Viz = (function (BaseClass$$1) {
  function Viz() {
    var this$1 = this;


    BaseClass$$1.call(this);

    this._aggs = {};
    this._backClass = new TextBox()
      .on("click", function () {
        if (this$1._history.length) { this$1.config(this$1._history.pop()).render(); }
        else { this$1.depth(this$1._drawDepth - 1).filter(false).render(); }
      })
      .on("mousemove", function () { return this$1._backClass.select().style("cursor", "pointer"); });
    this._backConfig = {
      fontSize: 10,
      resize: false
    };
    var controlTest = new Select();
    this._controlCache = {};
    this._controlConfig = {
      selectStyle: Object.assign({margin: "5px"}, controlTest.selectStyle())
    };
    this._data = [];
    this._detectResize = true;
    this._detectVisible = true;
    this._duration = 600;
    this._history = [];
    this._groupBy = [accessor("id")];
    this._legend = true;
    this._legendConfig = {
      shapeConfig: {
        fontResize: false
      }
    };
    this._legendClass = new Legend();
    this._legendPosition = "bottom";
    this._locale = "en-US";
    this._on = {
      "click": click.bind(this),
      "click.legend": clickLegend.bind(this),
      "click.shape": clickShape.bind(this),
      "mouseenter": mouseenter.bind(this),
      "mousemove.legend": mousemoveLegend.bind(this),
      "mousemove.shape": mousemoveShape.bind(this),
      "mouseleave": mouseleave.bind(this)
    };
    this._padding = 5;
    this._queue = [];

    this._shapeConfig = {
      fill: function (d, i) { return colorAssign(this$1._groupBy[0](d, i)); },
      opacity: constant$7(1),
      stroke: function (d, i) { return color(colorAssign(this$1._groupBy[0](d, i))).darker(); },
      strokeWidth: constant$7(0)
    };

    this._timeline = true;
    this._timelineClass = new Timeline()
      .align("end")
      .on("brush", function (s) {
        if (JSON.stringify(s) !== JSON.stringify(this$1._timelineSelection)) {
          this$1._timelineSelection = s;
          if (!(s instanceof Array)) { s = [s, s]; }
          s = s.map(Number);
          this$1.timeFilter(function (d) {
            var ms = date$2(this$1._time(d)).getTime();
            return ms >= s[0] && ms <= s[1];
          }).render();
        }
      });
    this._timelineConfig = {};

    this._titleClass = new TextBox();
    this._titleConfig = {
      fontSize: 12,
      resize: false,
      textAnchor: "middle"
    };

    this._tooltip = true;
    this._tooltipClass = new Tooltip();
    this._tooltipConfig = {
      duration: 50,
      pointerEvents: "none"
    };

    this._totalClass = new TextBox();
    this._totalConfig = {
      fontSize: 10,
      resize: false,
      textAnchor: "middle"
    };

  }

  if ( BaseClass$$1 ) Viz.__proto__ = BaseClass$$1;
  Viz.prototype = Object.create( BaseClass$$1 && BaseClass$$1.prototype );
  Viz.prototype.constructor = Viz;

  /**
      @memberof Viz
      @desc Preps a shapeConfig object for d3plus data, and optionally bubbles up a specific shape type.
      @param {String} *shape* The shape key to bubble up to the parent config level.
      @private
  */
  Viz.prototype._shapeConfigPrep = function _shapeConfigPrep (shape) {
    var this$1 = this;
    if ( shape === void 0 ) shape = false;


    var newConfig = {duration: this._duration};

    var loop = function ( key ) {

      if ({}.hasOwnProperty.call(this$1._shapeConfig, key)) {

        if (typeof this$1._shapeConfig[key] === "function") {
          newConfig[key] = function (d, i, s) { return this$1._shapeConfig[key](d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i, s); };
        }
        else { newConfig[key] = this$1._shapeConfig[key]; }

      }

    };

    for (var key in this$1._shapeConfig) loop( key );

    newConfig.on = Object.keys(this._on)
      .filter(function (e) { return !e.includes(".") || e.includes(".shape"); })
      .reduce(function (obj, e) {
        obj[e] = function (d, i) { return this$1._on[e] ? this$1._on[e](d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i) : null; };
        return obj;
      }, {});

    if (shape && this._shapeConfig[shape]) { newConfig = assign(newConfig, this._shapeConfig[shape]); }
    return newConfig;

  };

  /**
      @memberof Viz
      @desc Called by render once all checks are passed.
      @private
  */
  Viz.prototype._draw = function _draw () {
    var this$1 = this;


    var that = this;

    // based on the groupBy, determine the draw depth and current depth id
    this._drawDepth = this._depth !== void 0 ? this._depth : this._groupBy.length - 1;
    this._id = this._groupBy[this._drawDepth];
    this._ids = function (d, i) { return this$1._groupBy
      .map(function (g) { return g(d.__d3plus__ ? d.data : d, d.__d3plus__ ? d.i : i); })
      .filter(function (g) { return g !== void 0 && g.constructor !== Array; }); };
    this._drawLabel = this._label || function(d, i) {
      var l = that._ids(d, i).filter(function (d) { return d && d.constructor !== Array; });
      return l[l.length - 1];
    };

    // set the default timeFilter if it has not been specified
    if (this._time && this._timeFilter === void 0) {

      var dates = this._data.map(this._time).map(date$2);
      var d = this._data[0], i = 0;

      if (this._discrete && ("_" + (this._discrete)) in this && this[("_" + (this._discrete))](d, i) === this._time(d, i)) {
        this._timeFilter = function () { return true; };
      }
      else {
        var latestTime = +max(dates);
        this._timeFilter = function (d, i) { return +date$2(this$1._time(d, i)) === latestTime; };
      }

    }

    this._filteredData = [];
    var flatData = [];
    if (this._data.length) {

      flatData = this._timeFilter ? this._data.filter(this._timeFilter) : this._data;
      if (this._filter) { flatData = flatData.filter(this._filter); }

      var dataNest = nest();
      for (var i$1 = 0; i$1 <= this._drawDepth; i$1++) { dataNest.key(this$1._groupBy[i$1]); }
      if (this._discrete && ("_" + (this._discrete)) in this) { dataNest.key(this[("_" + (this._discrete))]); }
      dataNest.rollup(function (leaves) { return this$1._filteredData.push(objectMerge(leaves, this$1._aggs)); }).entries(flatData);

    }

    drawTitle.bind(this)(flatData);
    drawControls.bind(this)(flatData);
    drawTimeline.bind(this)(flatData);
    drawLegend.bind(this)(flatData);
    drawBack.bind(this)();
    drawTotal.bind(this)(flatData);

    this._shapes = [];

    // Draws a rectangle showing the available space for a visualization.
    // const tester = this._select.selectAll(".tester").data([0]);
    // console.log(this._margin);
    // tester.enter().append("rect")
    //     .attr("class", "tester")
    //     .attr("fill", "#ccc")
    //   .merge(tester)
    //     .attr("width", this._width - this._margin.left - this._margin.right)
    //     .attr("height", this._height - this._margin.top - this._margin.bottom)
    //     .attr("x", this._margin.left)
    //     .attr("y", this._margin.top);

  };

  /**
      @memberof Viz
      @desc Draws the visualization given the specified configuration.
      @param {Function} [*callback*] An optional callback function that, if passed, will be called after animation is complete.
      @chainable
  */
  Viz.prototype.render = function render (callback) {
    var this$1 = this;


    // Resets margins
    this._margin = {bottom: 0, left: 0, right: 0, top: 0};
    this._transition = transition().duration(this._duration);

    // Appends a fullscreen SVG to the BODY if a container has not been provided through .select().
    if (this._select === void 0 || this._select.node().tagName.toLowerCase() !== "svg") {

      var parent = this._select === void 0 ? select("body") : this._select;
      var ref = getSize(parent.node());
      var w = ref[0];
      var h = ref[1];
      var svg = parent.append("svg");
      w -= parseFloat(svg.style("border-left-width"), 10);
      w -= parseFloat(svg.style("border-right-width"), 10);
      h -= parseFloat(svg.style("border-top-width"), 10);
      h -= parseFloat(svg.style("border-bottom-width"), 10);
      if (!this._width) {
        this._autoWidth = true;
        this.width(w);
      }
      if (!this._height) {
        this._autoHeight = true;
        this.height(h);
      }

      svg
        .style("width", ((this._width) + "px"))
        .style("height", ((this._height) + "px"));

      this.select(svg.node());

    }

    // Calculates the width and/or height of the Viz based on the this._select, if either has not been defined.
    if (!this._width || !this._height) {
      var ref$1 = getSize(this._select.node());
      var w$1 = ref$1[0];
      var h$1 = ref$1[1];
      if (!this._width) { this.width(w$1); }
      if (!this._height) { this.height(h$1); }
    }

    this._select.transition(this._transition)
      .style("width", ((this._width) + "px"))
      .style("height", ((this._height) + "px"));

    clearInterval(this._visiblePoll);
    clearTimeout(this._resizePoll);
    select(window).on(("scroll." + (this._uuid)), null);
    select(window).on(("resize." + (this._uuid)), null);
    if (this._detectVisible && this._select.style("visibility") === "hidden") {

      this._visiblePoll = setInterval(function () {
        if (this$1._select.style("visibility") !== "hidden") {
          clearInterval(this$1._visiblePoll);
          this$1.render(callback);
        }
      }, 1000);

    }
    else if (this._detectVisible && this._select.style("display") === "none") {

      this._visiblePoll = setInterval(function () {
        if (this$1._select.style("display") !== "none") {
          clearInterval(this$1._visiblePoll);
          this$1.render(callback);
        }
      }, 1000);

    }
    else if (this._detectVisible && !inViewport(this._select.node())) {

      select(window).on(("scroll." + (this._uuid)), function () {
        if (inViewport(this$1._select.node())) {
          select(window).on(("scroll." + (this$1._uuid)), null);
          this$1.render(callback);
        }
      });

    }
    else {

      var q = queue();
      this._queue.forEach(function (p) { return q.defer.apply(q, p); });
      this._queue = [];
      q.awaitAll(function () {
        this$1._draw(callback);

        if (this$1._detectResize && (this$1._autoWidth || this$1._autoHeight)) {
          select(window).on(("resize." + (this$1._uuid)), function () {
            clearTimeout(this$1._resizePoll);
            this$1._resizePoll = setTimeout(function () {
              clearTimeout(this$1._resizePoll);
              var display = this$1._select.style("display");
              this$1._select.style("display", "none");
              var ref = getSize(this$1._select.node().parentNode);
              var w = ref[0];
              var h = ref[1];
              w -= parseFloat(this$1._select.style("border-left-width"), 10);
              w -= parseFloat(this$1._select.style("border-right-width"), 10);
              h -= parseFloat(this$1._select.style("border-top-width"), 10);
              h -= parseFloat(this$1._select.style("border-bottom-width"), 10);
              this$1._select.style("display", display);
              if (this$1._autoWidth) { this$1.width(w); }
              if (this$1._autoHeight) { this$1.height(h); }
              this$1.render(callback);
            }, 200);
          });
        }

        if (callback) { setTimeout(callback, this$1._duration + 100); }
      });

    }

    return this;

  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the active method to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.active = function active$$1 (_) {

    this._active = _;
    this._shapes.forEach(function (s) { return s.active(_); });
    if (this._legend) { this._legendClass.active(_); }

    return this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the aggregation method for each key in the object and returns the current class instance. If *value* is not specified, returns the current defined aggregation methods.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.aggs = function aggs (_) {
    return arguments.length ? (this._aggs = assign(this._aggs, _), this) : this._aggs;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the back button and returns the current class instance. If *value* is not specified, returns the current back button configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.backConfig = function backConfig (_) {
    return arguments.length ? (this._backConfig = assign(this._backConfig, _), this) : this._backConfig;
  };

  /**
      @memberof Viz
      @desc Defines a list of controls to be rendered at the bottom of the visualization.
      @param {Array} [*value*]
      @chainable
  */
  Viz.prototype.controls = function controls (_) {
    return arguments.length ? (this._controls = _, this) : this._controls;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the controls and returns the current class instance. If *value* is not specified, returns the current control configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.controlConfig = function controlConfig (_) {
    return arguments.length ? (this._controlConfig = assign(this._controlConfig, _), this) : this._controlConfig;
  };

  /**
      @memberof Viz
      @desc Sets the primary data array to be used when drawing the visualization. The value passed should be an *Array* of objects or a *String* representing a filepath or URL to be loaded. The following filetypes are supported: `csv`, `tsv`, `txt`, and `json`.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final array of obejcts to be used as the primary data array. For example, some JSON APIs return the headers split from the data values to save bandwidth. These would need be joined using a custom formatter.

If *data* is not specified, this method returns the current primary data array, which defaults to an empty array (`[]`);
      @param {Array|String} *data* = []
      @param {Function} [*formatter*]
      @chainable
  */
  Viz.prototype.data = function data (_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "data"]), this) : this._data;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the depth to the specified number and returns the current class instance. The *value* should correspond with an index in the [groupBy](#groupBy) array. If *value* is not specified, returns the current depth.
      @param {Number} [*value*]
      @chainable
  */
  Viz.prototype.depth = function depth (_) {
    return arguments.length ? (this._depth = _, this) : this._depth;
  };

  /**
      @memberof Viz
      @desc If the width and/or height of a Viz is not user-defined, it is determined by the size of it's parent element. When this method is set to `true`, the Viz will listen for the `window.onresize` event and adjust it's dimensions accordingly.

If no value is specified, the method will return the current *Boolean* value.
      @param {Boolean} *value* = true
      @chainable
  */
  Viz.prototype.detectResize = function detectResize (_) {
    return arguments.length ? (this._detectResize = _, this) : this._detectResize;
  };

  /**
      @memberof Viz
      @desc Toggles whether or not the Viz should try to detect if it visible in the current viewport. When this method is set to `true`, the Viz will only be rendered when it has entered the viewport either through scrolling or if it's display or visibility is changed.

If no value is specified, the method will return the current *Boolean* value.
      @param {Boolean} *value* = true
      @chainable
  */
  Viz.prototype.detectVisible = function detectVisible (_) {
    return arguments.length ? (this._detectVisible = _, this) : this._detectVisible;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the discrete accessor to the specified method name (usually an axis) and returns the current class instance. If *value* is not specified, returns the current discrete method.
      @param {String} [*value*]
      @chainable
  */
  Viz.prototype.discrete = function discrete (_) {
    return arguments.length ? (this._discrete = _, this) : this._discrete;
  };

  /**
      @memberof Viz
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
      @chainable
  */
  Viz.prototype.duration = function duration (_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the filter to the specified function and returns the current class instance. If *value* is not specified, returns the current filter.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.filter = function filter (_) {
    return arguments.length ? (this._filter = _, this) : this._filter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns the current class instance. If *value* is not specified, returns the current group accessor.
      @param {String|Function|Array} [*value*]
      @chainable
      @example
function value(d) {
  return d.id;
}
  */
  Viz.prototype.groupBy = function groupBy (_) {
    var this$1 = this;

    if (!arguments.length) { return this._groupBy; }
    if (!(_ instanceof Array)) { _ = [_]; }
    return this._groupBy = _.map(function (k) {
      if (typeof k === "function") { return k; }
      else {
        if (!this$1._aggs[k]) {
          this$1._aggs[k] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
        return accessor(k);
      }
    }), this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overall height to the specified number and returns the current class instance. If *value* is not specified, returns the current overall height.
      @param {Number} [*value* = window.innerHeight]
      @chainable
  */
  Viz.prototype.height = function height (_) {
    return arguments.length ? (this._height = _, this) : this._height;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.hover = function hover (_) {
    var this$1 = this;


    var hoverFunction = this._hover = _;
    if (typeof _ === "function") {

      var shapeData = merge(this._shapes.map(function (s) { return s.data(); }));
      shapeData = shapeData.concat(this._legendClass.data());
      var activeData = _ ? shapeData.filter(_) : [];

      var activeIds = [];
      activeData.map(this._ids).forEach(function (ids) {
        for (var x = 1; x <= ids.length; x++) {
          activeIds.push(JSON.stringify(ids.slice(0, x)));
        }
      });
      activeIds = activeIds.filter(function (id, i) { return activeIds.indexOf(id) === i; });

      if (activeIds.length) { hoverFunction = function (d, i) { return activeIds.includes(JSON.stringify(this$1._ids(d, i))); }; }

    }

    this._shapes.forEach(function (s) { return s.hover(hoverFunction); });
    if (this._legend) { this._legendClass.hover(hoverFunction); }

    return this;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.label = function label (_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : constant$7(_), this) : this._label;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the legend based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current value.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.legend = function legend (_) {
    return arguments.length ? (this._legend = _, this) : this._legend;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, the object is passed to the legend's config method. If *value* is not specified, returns the current legend config.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.legendConfig = function legendConfig (_) {
    return arguments.length ? (this._legendConfig = _, this) : this._legendConfig;
  };

  /**
      @memberof Viz
      @desc Defines which side of the visualization to anchor the legend. Acceptable values are `"top"`, `"bottom"`, `"left"`, and `"right"`. If no value is passed, the current legend position will be returned.
      @param {String} [*value* = "bottom"]
      @chainable
  */
  Viz.prototype.legendPosition = function legendPosition (_) {
    return arguments.length ? (this._legendPosition = _, this) : this._legendPosition;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the locale to the specified string and returns the current class instance. If *value* is not specified, returns the current locale.
      @param {String} [*value* = "en-US"]
      @chainable
  */
  Viz.prototype.locale = function locale$$1 (_) {
    return arguments.length ? (this._locale = _, this) : this._locale;
  };

  /**
      @memberof Viz
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
      @param {String|HTMLElement} [*selector*]
      @chainable
  */
  Viz.prototype.select = function select$1 (_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the shape accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current shape accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.shape = function shape (_) {
    return arguments.length ? (this._shape = typeof _ === "function" ? _ : constant$7(_), this) : this._shape;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for each shape and returns the current class instance. If *value* is not specified, returns the current shape configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.shapeConfig = function shapeConfig (_) {
    return arguments.length ? (this._shapeConfig = assign(this._shapeConfig, _), this) : this._shapeConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the time accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current time accessor. The time values that are returned should be valid Date objects, 4-digit year values, or strings that can be parsed into javascript Date objects (click [here](http://dygraphs.com/date-formats.html) for valid string formats).
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.time = function time (_) {
    if (arguments.length) {
      if (typeof _ === "function") {
        this._time = _;
      }
      else {
        this._time = accessor(_);
        if (!this._aggs[_]) {
          this._aggs[_] = function (a) {
            var v = Array.from(new Set(a));
            return v.length === 1 ? v[0] : v;
          };
        }
      }
      return this;
    }
    else { return this._time; }
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the time filter to the specified function and returns the current class instance. If *value* is not specified, returns the current time filter.
      @param {Function} [*value*]
      @chainable
  */
  Viz.prototype.timeFilter = function timeFilter (_) {
    return arguments.length ? (this._timeFilter = _, this) : this._timeFilter;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the timeline based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current timeline visibility.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.timeline = function timeline (_) {
    return arguments.length ? (this._timeline = _, this) : this._timeline;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the timeline and returns the current class instance. If *value* is not specified, returns the current timeline configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.timelineConfig = function timelineConfig (_) {
    return arguments.length ? (this._timelineConfig = assign(this._timelineConfig, _), this) : this._timelineConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the title accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current title accessor.
      @param {Function|String} [*value*]
      @chainable
  */
  Viz.prototype.title = function title (_) {
    return arguments.length ? (this._title = typeof _ === "function" ? _ : constant$7(_), this) : this._title;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the title and returns the current class instance. If *value* is not specified, returns the current title configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.titleConfig = function titleConfig (_) {
    return arguments.length ? (this._titleConfig = assign(this._titleConfig, _), this) : this._titleConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, toggles the tooltip based on the specified boolean and returns the current class instance. If *value* is not specified, returns the current tooltip visibility.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Viz.prototype.tooltip = function tooltip (_) {
    return arguments.length ? (this._tooltip = _, this) : this._tooltip;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the tooltip and returns the current class instance. If *value* is not specified, returns the current tooltip configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.tooltipConfig = function tooltipConfig (_) {
    return arguments.length ? (this._tooltipConfig = assign(this._tooltipConfig, _), this) : this._tooltipConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the total accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current total accessor.
      @param {Boolean|Function|String} [*value*]
      @chainable
  */
  Viz.prototype.total = function total (_) {
    return arguments.length ? (this._total = typeof _ === "function" ? _ : accessor(_), this) : this._total;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the config method for the total and returns the current class instance. If *value* is not specified, returns the current total configuration.
      @param {Object} [*value*]
      @chainable
  */
  Viz.prototype.totalConfig = function totalConfig (_) {
    return arguments.length ? (this._totalConfig = assign(this._totalConfig, _), this) : this._totalConfig;
  };

  /**
      @memberof Viz
      @desc If *value* is specified, sets the overallwidth to the specified number and returns the current class instance. If *value* is not specified, returns the current overall width.
      @param {Number} [*value* = window.innerWidth]
      @chainable
  */
  Viz.prototype.width = function width (_) {
    return arguments.length ? (this._width = _, this) : this._width;
  };

  return Viz;
}(BaseClass));

/**
    @class Geomap
    @extends Viz
    @desc Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.
*/
var Geomap = (function (Viz$$1) {
  function Geomap() {

    Viz$$1.call(this);

    this._fitObject = false;
    this._ocean = "#cdd1d3";

    this._padding = 20;

    this._point = accessor("point");
    this._pointSize = constant$7(1);
    this._pointSizeMax = 10;
    this._pointSizeMin = 5;
    this._pointSizeScale = "linear";

    this._projection = mercator();

    this._rotate = [0, 0];

    this._shape = constant$7("Circle");
    this._shapeConfig = assign(this._shapeConfig, {
      Path: {
        fill: "#f5f5f3",
        stroke: "#b1babe",
        strokeWidth: 1
      }
    });

    this._tiles = true;
    this._tileGen = tile();
    // TODO: waiting on d3-tile release update
    // this._tileGen = tile().wrap(false);
    this._tileUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    this._topojson = false;
    this._topojsonFilter = function (d) { return !["010"].includes(d.id); };

    this._zoom = true;
    this._zoomBehavior = zoom();
    this._zoomBrush = false;
    // this._zoomFactor = 2;
    this._zoomPan = true;
    // this._zoomReset = true;
    this._zoomScroll = true;
    this._zoomSet = false;

  }

  if ( Viz$$1 ) Geomap.__proto__ = Viz$$1;
  Geomap.prototype = Object.create( Viz$$1 && Viz$$1.prototype );
  Geomap.prototype.constructor = Geomap;

  /**
      Renders map tiles based on the current zoom level.
      @private
  */
  Geomap.prototype._renderTiles = function _renderTiles () {
    var this$1 = this;


    var tau = 2 * Math.PI,
          transform$$1 = transform$1(this._geomapGroup.node());

    var tileData = [];
    if (this._tiles) {
      // const d = this._projection(this._rotate)[0] - this._projection([0, 0])[0];
      tileData = this._tileGen
        .extent(this._zoomBehavior.translateExtent())
        .scale(this._projection.scale() * tau * transform$$1.k)
        .translate(transform$$1.apply(this._projection.translate()))
        ();

      this._tileGroup.attr("transform", ("scale(" + (tileData.scale) + ")translate(" + (tileData.translate) + ")"));

    }

    var images = this._tileGroup.selectAll("image.tile")
        .data(tileData, function (d) { return d.join("-"); });

    images.exit().remove();

    images.enter().append("image")
      .attr("class", "tile")
      .attr("xlink:href", function (d) { return this$1._tileUrl
        .replace("{s}", ["a", "b", "c"][Math.random() * 3 | 0])
        .replace("{z}", d[2])
        .replace("{x}", d[0])
        .replace("{y}", d[1]); })
      .attr("width", 1)
      .attr("height", 1)
      .attr("x", function (d) { return d[0]; })
      .attr("y", function (d) { return d[1]; });

  };

  /**
      Handles events dispatched from this._zoomBehavior
      @private
  */
  Geomap.prototype._zoomed = function _zoomed () {

    this._zoomGroup.attr("transform", event.transform);
    this._renderTiles();

    //   if (event && !this._zoomPan) {
    //     this._zoomPan = true;
    //     zoomEvents();
    //   }

    //   let s = this._zoomBehavior.scale();
    //   const trans = this._zoomBehavior.translate();
    //
    //   let pz = s / this._polyZoom;
    //
    //   if (pz < minZoom) {
    //     pz = minZoom;
    //     s = pz * this._polyZoom;
    //     this._zoomBehavior.scale(s);
    //   }
    // const nh = height;
    // const bh = coordBounds[1][1] - coordBounds[0][1];
    // const bw = coordBounds[1][0] - coordBounds[0][0];
    // const xoffset = (width - bw * pz) / 2;
    // const xmin = xoffset > 0 ? xoffset : 0;
    // const xmax = xoffset > 0 ? width - xoffset : width;
    // const yoffset = (nh - bh * pz) / 2;
    // const ymin = yoffset > 0 ? yoffset : 0;
    // const ymax = yoffset > 0 ? nh - yoffset : nh;
    //
    // const extent = this._zoomBehavior.translateExtent();
    // if (transform.x + extent[0][0] * transform.k > xmin) {
    //   transform.x = -extent[0][0] * transform.k + xmin;
    // }
    // else if (transform.x + extent[1][0] * transform.k < xmax) {
    //   transform.x = xmax - extent[1][0] * transform.k;
    // }
    //
    // if (transform.y + extent[0][1] * transform.k > ymin) {
    //   transform.y = -extent[0][1] * transform.k + ymin;
    // }
    // else if (transform.y + extent[1][1] * transform.k < ymax) {
    //   transform.y = ymax - extent[1][1] * transform.k;
    // }
    // console.log(transform, this._zoomBehavior.translateExtent());
    //   this._zoomBehavior.translate(trans);

  };



  /**
      Handles adding/removing zoom event listeners.
      @private
  */
  Geomap.prototype._zoomEvents = function _zoomEvents () {

    if (this._zoomBrush) {
      // brushGroup.style("display", "inline");
      this._geomapGroup.on(".zoom", null);
    }
    else if (this._zoom) {
      // brushGroup.style("display", "none");
      this._geomapGroup.call(this._zoomBehavior);
      if (!this._zoomScroll) {
        this._geomapGroup
          .on("mousewheel.zoom", null)
          .on("MozMousePixelScroll.zoom", null)
          .on("wheel.zoom", null);
      }
      if (!this._zoomPan) {
        this._geomapGroup
          .on("mousedown.zoom", null)
          .on("mousemove.zoom", null)
          .on("touchstart.zoom", null)
          .on("touchmove.zoom", null);
      }
    }
    else {
      this._geomapGroup.on(".zoom", null);
    }

  };

  /**
      Extends the draw behavior of the abstract Viz class.
      @private
  */
  Geomap.prototype._draw = function _draw (callback) {
    var this$1 = this;


    Viz$$1.prototype._draw.call(this, callback);

    var height = this._height - this._margin.top - this._margin.bottom,
          width = this._width - this._margin.left - this._margin.right;

    this._geomapGroup = this._select.selectAll("svg.d3plus-geomap-geomapGroup").data([0]);
    this._geomapGroup = this._geomapGroup.enter().append("svg")
      .attr("class", "d3plus-geomap-geomapGroup")
      .attr("opacity", 0)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", this._ocean || "transparent")
      .merge(this._geomapGroup);
    this._geomapGroup.transition(this._transition)
      .attr("opacity", 1)
      .attr("width", width)
      .attr("height", height);

    var ocean = this._geomapGroup.selectAll("rect.d3plus-geomap-ocean").data([0]);
    ocean.enter().append("rect")
        .attr("class", "d3plus-geomap-ocean")
      .merge(ocean)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", this._ocean || "transparent");

    this._tileGroup = this._geomapGroup.selectAll("g.d3plus-geomap-tileGroup").data([0]);
    this._tileGroup = this._tileGroup.enter().append("g")
      .attr("class", "d3plus-geomap-tileGroup")
      .merge(this._tileGroup);

    this._zoomGroup = this._geomapGroup.selectAll("g.d3plus-geomap-zoomGroup").data([0]);
    this._zoomGroup = this._zoomGroup.enter().append("g")
      .attr("class", "d3plus-geomap-zoomGroup")
      .merge(this._zoomGroup);

    var pathGroup = this._zoomGroup.selectAll("g.d3plus-geomap-paths").data([0]);
    pathGroup = pathGroup.enter().append("g")
      .attr("class", "d3plus-geomap-paths")
      .merge(pathGroup);

    // TODO: Brush to Zoom
    // const brushGroup = this._select.selectAll("g.brush").data([0]);
    // brushGroup.enter().append("g").attr("class", "brush");
    //
    // var xBrush = d3.scale.identity().domain([0, width]),
    //     yBrush = d3.scale.identity().domain([0, height]);
    //
    // function brushended(e) {
    //
    //   if (!event.sourceEvent) return;
    //
    //   const extent = brush.extent();
    //   brushGroup.call(brush.clear());
    //
    //   const zs = this._zoomBehavior.scale(), zt = this._zoomBehavior.translate();
    //
    //   const pos1 = extent[0].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //   const pos2 = extent[1].map((p, i) => (p - zt[i]) / (zs / this._polyZoom));
    //
    //   zoomToBounds([pos1, pos2]);
    //
    // }
    //
    // var brush = d3.svg.brush()
    //   .x(xBrush)
    //   .y(yBrush)
    //   .on("brushend", brushended);
    //
    // if (this._zoom) brushGroup.call(brush);

    function topo2feature(topo, key) {
      var k = key && topo.objects[key] ? key : Object.keys(topo.objects)[0];
      return feature(topo, topo.objects[k]);
    }

    var coordData = this._topojson
                    ? topo2feature(this._topojson, this._topojsonKey)
                    : {type: "FeatureCollection", features: []};

    if (this._topojsonFilter) { coordData.features = coordData.features.filter(this._topojsonFilter); }

    var path = this._path = index()
      .projection(this._projection);

    var pointData = this._filteredData.filter(function (d, i) { return this$1._shape(d, i) !== "Path"; });

    var r = scales[("scale" + (this._pointSizeScale.charAt(0).toUpperCase()) + (this._pointSizeScale.slice(1)))]()
      .domain(extent(pointData, function (d, i) { return this$1._pointSize(d, i); }))
      .range([this._pointSizeMin, this._pointSizeMax]);

    if (!this._zoomSet) {

      var fitData = this._fitObject ? topo2feature(this._fitObject, this._fitKey) : coordData;

      var extentBounds = {
        type: "FeatureCollection",
        features: this._fitFilter ? fitData.features.filter(this._fitFilter) : fitData.features.slice()
      };

      extentBounds.features = extentBounds.features.reduce(function (arr, d) {

        var reduced = {
          type: d.type,
          id: d.id,
          geometry: {
            coordinates: d.geometry.coordinates,
            type: d.geometry.type
          }
        };

        if (d.geometry.coordinates.length > 1) {

          var areas = [],
                distances = [];

          d.geometry.coordinates.forEach(function (c) {

            reduced.geometry.coordinates = [c];
            areas.push(path.area(reduced));

          });

          reduced.geometry.coordinates = [d.geometry.coordinates[areas.indexOf(max(areas))]];
          var center = path.centroid(reduced);

          d.geometry.coordinates.forEach(function (c) {

            reduced.geometry.coordinates = [c];
            distances.push(pointDistance(path.centroid(reduced), center));

          });

          var distCutoff = threshold(areas.reduce(function (arr, dist, i) {
            if (dist) { arr.push(areas[i] / dist); }
            return arr;
          }, []), 0.9);

          reduced.geometry.coordinates = d.geometry.coordinates.filter(function (c, i) {
            var dist = distances[i];
            return dist === 0 || areas[i] / dist >= distCutoff;
          });

        }

        arr.push(reduced);
        return arr;

      }, []);

      var p = this._padding;
      if (!extentBounds.features.length && pointData.length) {

        var bounds = [[undefined, undefined], [undefined, undefined]];
        pointData.forEach(function (d, i) {

          var point = this$1._projection(this$1._point(d, i));
          if (bounds[0][0] === void 0 || point[0] < bounds[0][0]) { bounds[0][0] = point[0]; }
          if (bounds[1][0] === void 0 || point[0] > bounds[1][0]) { bounds[1][0] = point[0]; }
          if (bounds[0][1] === void 0 || point[1] < bounds[0][1]) { bounds[0][1] = point[1]; }
          if (bounds[1][1] === void 0 || point[1] > bounds[1][1]) { bounds[1][1] = point[1]; }

        });

        extentBounds = {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "MultiPoint",
              coordinates: bounds.map(function (b) { return this$1._projection.invert(b); })
            }
          }]
        };
        p = max(pointData, function (d, i) { return r(this$1._pointSize(d, i)) + p; });

      }

      this._projection = this._projection
        .fitExtent(
          extentBounds.features.length ? [[p, p], [width - p * 2, height - p * 2]] : [[0, 0], [width, height]],
          extentBounds.features.length ? extentBounds : {type: "Sphere"}
        );

      this._zoomBehavior
        .scaleExtent([1, 16])
        .translateExtent([[0, 0], [width, height]])
        .on("zoom", this._zoomed.bind(this));

      this._zoomSet = true;

    }

    // TODO: Zoom math?
    // function zoomMath(factor) {
    //
    //   const center = [width / 2, height / 2];
    //
    //   const extent = this._zoomBehavior.scaleExtent(),
    //         scale = this._zoomBehavior.scale(),
    //         translate = this._zoomBehavior.translate();
    //
    //   let targetScale = scale * factor,
    //       x = translate[0],
    //       y = translate[1];
    //
    //   // If we're already at an extent, done
    //   if (targetScale === extent[0] || targetScale === extent[1]) return false;
    //
    //   // If the factor is too much, scale it down to reach the extent exactly
    //   const clampedScale = Math.max(extent[0], Math.min(extent[1], targetScale));
    //   if (clampedScale !== targetScale) {
    //     targetScale = clampedScale;
    //     factor = targetScale / scale;
    //   }
    //
    //   // Center each vector, stretch, then put back
    //   x = (x - center[0]) * factor + center[0];
    //   y = (y - center[1]) * factor + center[1];
    //
    //   this._zoomBehavior.scale(targetScale).translate([x, y]);
    //   zoomed(this._duration);
    //
    //   return true;
    //
    // }

    // TODO: Zoom controls
    // if (this._zoom) {
    //
    //   const controls = this._select.selectAll(".map-controls").data([0]);
    //   const controlsEnter = controls.enter().append("div")
    //     .attr("class", "map-controls");
    //
    //   controlsEnter.append("div").attr("class", "zoom-in")
    //     .on("click", () => zoomMath(this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-out")
    //     .on("click", () => zoomMath(1 / this._zoomFactor));
    //
    //   controlsEnter.append("div").attr("class", "zoom-reset");
    //   controls.select(".zoom-reset").on("click", () => {
    //     // vars.highlight.value = false;
    //     // this._highlightPath = undefined;
    //     zoomLogic();
    //   });
    //
    // }

    // TODO: Zoom logic? What's this do?
    // function zoomLogic(d) {
    //
    //   this._zoomReset = true;
    //
    //   if (d) zoomToBounds(this._path.bounds(d));
    //   else {
    //
    //     let ns = s;
    //
    //     // next line might not be needed?
    //     ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //     this._zoomBehavior.scale(ns * 2 * Math.PI).translate(t);
    //     zoomed(this._duration);
    //
    //   }
    //
    // }

    this._shapes.push(new Path$1()
      .config(this._shapeConfig.Path)
      .data(coordData.features)
      .d(path)
      .select(pathGroup.node())
      .x(0).y(0)
      .render());

    var pointGroup = this._zoomGroup.selectAll("g.d3plus-geomap-pins").data([0]);
    pointGroup = pointGroup.enter().append("g")
      .attr("class", "d3plus-geomap-pins")
      .merge(pointGroup);

    var circles = new Circle()
      .config(this._shapeConfig)
      .config(this._shapeConfig.Circle || {})
      .data(pointData)
      .r(function (d, i) { return r(this$1._pointSize(d, i)); })
      .select(pointGroup.node())
      .sort(function (a, b) { return this$1._pointSize(b) - this$1._pointSize(a); })
      .x(function (d, i) { return this$1._projection(this$1._point(d, i))[0]; })
      .y(function (d, i) { return this$1._projection(this$1._point(d, i))[1]; });

    var events = Object.keys(this._on);
    var classEvents = events.filter(function (e) { return e.includes(".Circle"); }),
          globalEvents = events.filter(function (e) { return !e.includes("."); }),
          shapeEvents = events.filter(function (e) { return e.includes(".shape"); });
    for (var e = 0; e < globalEvents.length; e++) { circles.on(globalEvents[e], this$1._on[globalEvents[e]]); }
    for (var e$1 = 0; e$1 < shapeEvents.length; e$1++) { circles.on(shapeEvents[e$1], this$1._on[shapeEvents[e$1]]); }
    for (var e$2 = 0; e$2 < classEvents.length; e$2++) { circles.on(classEvents[e$2], this$1._on[classEvents[e$2]]); }

    this._shapes.push(circles.render());

    // Attaches any initial zoom event handlers.
    this._zoomEvents();

    // TODO: Zooming to Bounds
    // function zoomToBounds(b, mod = 250) {
    //
    //   const w = width - mod;
    //
    //   let ns = this._scale / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / height);
    //   const nt = [(w - ns * (b[1][0] + b[0][0])) / 2, (height - ns * (b[1][1] + b[0][1])) / 2];
    //
    //   ns = ns / Math.PI / 2 * this._polyZoom;
    //
    //   this._zoomBehavior.scale(ns * 2 * Math.PI).translate(nt);
    //   zoomed(this._duration);
    //
    // }

    // TODO: Detect zoom brushing
    // select("body")
    //   .on(`keydown.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = true;
    //       zoomEvents();
    //     }
    //   })
    //   .on(`keyup.d3plus-geomap-${this._uuid}`, function() {
    //     if (event.keyCode === 16) {
    //       this._zoomBrush = false;
    //       zoomEvents();
    //     }
    //   });

    this._renderTiles();

    return this;

  };

  /**
      @memberof Geomap
      @desc If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  Geomap.prototype.fitFilter = function fitFilter (_) {
    if (arguments.length) {
      if (typeof _ === "function") { return this._fitFilter = _, this; }
      if (!(_ instanceof Array)) { _ = [_]; }
      return this._fitFilter = function (d) { return _.includes(d.id); }, this;
    }
    return this._fitFilter;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.
      @param {String} *value*
      @chainable
  */
  Geomap.prototype.fitKey = function fitKey (_) {
    return arguments.length ? (this._fitKey = _, this) : this._fitKey;
  };

  /**
      @memberof Geomap
      @desc Sets the topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `undefined`.
      @param {Object|String} *data* = `undefined`
      @param {Function} [*formatter*]
      @chainable
  */
  Geomap.prototype.fitObject = function fitObject (_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "fitObject"]), this) : this._fitObject;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the ocean color and returns the current class instance. If *value* is not specified, returns the current ocean color.
      @param {String} [*value* = "#cdd1d3"]
      @chainable
  */
  Geomap.prototype.ocean = function ocean (_) {
    return arguments.length ? (this._ocean = _, this) : this._ocean;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the topojson outer padding and returns the current class instance. If *value* is not specified, returns the current topojson outer padding.
      @param {Number} [*value* = 20]
      @chainable
  */
  Geomap.prototype.padding = function padding (_) {
    return arguments.length ? (this._padding = _, this) : this._padding;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the point accessor to the specified function or array and returns the current class instance. Point values are expected in the format [longitude, latitude], which is in-line with d3's expected [x, y] mapping. If *value* is not specified, returns the current point accessor.
      @param {Function|Array} [*value*]
      @chainable
  */
  Geomap.prototype.point = function point (_) {
    return arguments.length ? (this._point = typeof _ === "function" ? _ : constant$7(_), this) : this._point;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the point size accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current point size accessor.
      @param {Function|Number} [*value*]
      @chainable
  */
  Geomap.prototype.pointSize = function pointSize (_) {
    return arguments.length ? (this._pointSize = typeof _ === "function" ? _ : constant$7(_), this) : this._pointSize;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the maximum point radius and returns the current class instance. If *value* is not specified, returns the current maximum point radius.
      @param {Number} [*value* = 10]
      @chainable
  */
  Geomap.prototype.pointSizeMax = function pointSizeMax (_) {
    return arguments.length ? (this._pointSizeMax = _, this) : this._pointSizeMax;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the minimum point radius and returns the current class instance. If *value* is not specified, returns the current minimum point radius.
      @param {Number} [*value* = 5]
      @chainable
  */
  Geomap.prototype.pointSizeMin = function pointSizeMin (_) {
    return arguments.length ? (this._pointSizeMin = _, this) : this._pointSizeMin;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, toggles the map tiles and returns the current class instance. If *value* is not specified, returns the current tiling boolean.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Geomap.prototype.tiles = function tiles (_) {
    return arguments.length ? (this._tiles = _, this) : this._tiles;
  };

  /**
      @memberof Geomap
      @desc Sets the topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.

If *data* is not specified, this method returns the current Topojson *Object*, which by default is `null`.
      @param {Object|String} *data* = []
      @param {Function} [*formatter*]
      @chainable
  */
  Geomap.prototype.topojson = function topojson (_, f) {
    return arguments.length ? (this._queue.push([load.bind(this), _, f, "topojson"]), this) : this._topojson;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, filters the features used to calculate the initial projection fitExtent based on an ID, array of IDs, or filter function and returns the current class instance. If *value* is not specified, returns the current bounds filter.
      @param {Number|String|Array|Function} [*value*]
      @chainable
  */
  Geomap.prototype.topojsonFilter = function topojsonFilter (_) {
    if (arguments.length) {
      if (typeof _ === "function") { return this._topojsonFilter = _, this; }
      if (!(_ instanceof Array)) { _ = [_]; }
      return this._topojsonFilter = function (d) { return _.includes(d.id); }, this;
    }
    return this._topojsonFilter;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, sets the topojson object key to be used and returns the current class instance. If *value* is not specified, returns the current topojson object key.
      @param {String} *value*
      @chainable
  */
  Geomap.prototype.topojsonKey = function topojsonKey (_) {
    return arguments.length ? (this._topojsonKey = _, this) : this._topojsonKey;
  };

  /**
      @memberof Geomap
      @desc If *value* is specified, toggles the zoom behavior and returns the current class instance. If *value* is not specified, returns the current zoom behavior.
      @param {Boolean} [*value* = true]
      @chainable
  */
  Geomap.prototype.zoom = function zoom$$1 (_) {
    return arguments.length ? (this._zoom = _, this) : this._zoom;
  };

  return Geomap;
}(Viz));

exports.Geomap = Geomap;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-geomap.full.js.map
