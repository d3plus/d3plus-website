(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('d3plus-treemap', ['exports'], factory) :
	(factory((global.d3plus_treemap = global.d3plus_treemap || {})));
}(this, function (exports) { 'use strict';

	var version = "0.2.0";

	function define(constructor, factory, prototype) {
	  constructor.prototype = factory.prototype = prototype;
	  prototype.constructor = constructor;
	}

	function extend(parent, definition) {
	  var prototype = Object.create(parent.prototype);
	  for (var key in definition) prototype[key] = definition[key];
	  return prototype;
	}

	function Color() {}

	var darker = 0.7;
	var brighter = 1 / darker;

	var reHex3 = /^#([0-9a-f]{3})$/;
	var reHex6 = /^#([0-9a-f]{6})$/;
	var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	var reRgbaInteger = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	var reRgbaPercent = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
	var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	var reHslaPercent = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/;
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
	  if (a <= 0) r = g = b = NaN;
	  return new Rgb(r, g, b, a);
	}

	function rgbConvert(o) {
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Rgb;
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
	  if (a <= 0) h = s = l = NaN;
	  else if (l <= 0 || l >= 1) h = s = NaN;
	  else if (s <= 0) h = NaN;
	  return new Hsl(h, s, l, a);
	}

	function hslConvert(o) {
	  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Color)) o = color(o);
	  if (!o) return new Hsl;
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
	    if (r === max) h = (g - b) / s + (g < b) * 6;
	    else if (g === max) h = (b - r) / s + 2;
	    else h = (r - g) / s + 4;
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
	  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
	  if (o instanceof Hcl) {
	    var h = o.h * deg2rad;
	    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
	  }
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
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
	  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
	  if (!(o instanceof Lab)) o = labConvert(o);
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
	  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
	  if (!(o instanceof Rgb)) o = rgbConvert(o);
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

	function ascending(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function bisector(compare) {
	  if (compare.length === 1) compare = ascendingComparator(compare);
	  return {
	    left: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) < 0) lo = mid + 1;
	        else hi = mid;
	      }
	      return lo;
	    },
	    right: function(a, x, lo, hi) {
	      if (lo == null) lo = 0;
	      if (hi == null) hi = a.length;
	      while (lo < hi) {
	        var mid = lo + hi >>> 1;
	        if (compare(a[mid], x) > 0) hi = mid;
	        else lo = mid + 1;
	      }
	      return lo;
	    }
	  };
	}

	function ascendingComparator(f) {
	  return function(d, x) {
	    return ascending(f(d), x);
	  };
	}

	var ascendingBisect = bisector(ascending);

	function max(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
	  }

	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
	  }

	  return a;
	}

	function merge(arrays) {
	  var n = arrays.length,
	      m,
	      i = -1,
	      j = 0,
	      merged,
	      array;

	  while (++i < n) j += arrays[i].length;
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

	function d3Min(array, f) {
	  var i = -1,
	      n = array.length,
	      a,
	      b;

	  if (f == null) {
	    while (++i < n) if ((b = array[i]) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
	  }

	  else {
	    while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) { a = b; break; }
	    while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
	  }

	  return a;
	}

	function sum(array, f) {
	  var s = 0,
	      n = array.length,
	      a,
	      i = -1;

	  if (f == null) {
	    while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.
	  }

	  else {
	    while (++i < n) if (a = +f(array[i], i, array)) s += a;
	  }

	  return s;
	}

	var prefix = "$";

	function Map() {}

	Map.prototype = map.prototype = {
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
	    for (var property in this) if (property[0] === prefix) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
	  }
	};

	function map(object, f) {
	  var map = new Map;

	  // Copy constructor.
	  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	var proto = map.prototype;

	var array = Array.prototype;

	var slice = array.slice;

	var implicit = {name: "implicit"};

	function ordinal() {
	  var index = map(),
	      domain = [],
	      range = [],
	      unknown = implicit;

	  function scale(d) {
	    var key = d + "", i = index.get(key);
	    if (!i) {
	      if (unknown !== implicit) return unknown;
	      index.set(key, i = domain.push(d));
	    }
	    return range[(i - 1) % range.length];
	  }

	  scale.domain = function(_) {
	    if (!arguments.length) return domain.slice();
	    domain = [], index = map();
	    var i = -1, n = _.length, d, key;
	    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
	    return scale;
	  };

	  scale.range = function(_) {
	    return arguments.length ? (range = slice.call(_), scale) : range.slice();
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

	function constant$1(x) {
	  return function() {
	    return x;
	  };
	}

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

	function interpolateHue(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$1(isNaN(a) ? b : a);
	}

	function gamma(y) {
	  return (y = +y) === 1 ? nogamma : function(a, b) {
	    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
	  };
	}

	function nogamma(a, b) {
	  var d = b - a;
	  return d ? linear$1(a, d) : constant$1(isNaN(a) ? b : a);
	}

	(function gamma$$(y) {
	  var interpolateColor = gamma(y);

	  function interpolateRgb(start, end) {
	    var r = interpolateColor((start = rgb(start)).r, (end = rgb(end)).r),
	        g = interpolateColor(start.g, end.g),
	        b = interpolateColor(start.b, end.b),
	        opacity = interpolateColor(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateRgb.gamma = gamma$$;

	  return interpolateRgb;
	})(1);

	(function gamma(y) {
	  y = +y;

	  function interpolateCubehelix(start, end) {
	    var h = interpolateHue((start = cubehelix(start)).h, (end = cubehelix(end)).h),
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

	  interpolateCubehelix.gamma = gamma;

	  return interpolateCubehelix;
	})(1);

	(function gamma(y) {
	  y = +y;

	  function interpolateCubehelixLong(start, end) {
	    var h = nogamma((start = cubehelix(start)).h, (end = cubehelix(end)).h),
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

	  interpolateCubehelixLong.gamma = gamma;

	  return interpolateCubehelixLong;
	})(1);

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
	    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
	    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
	    return range;
	  };

	  interval.filter = function(test) {
	    return newInterval(function(date) {
	      while (floori(date), !test(date)) date.setTime(date - 1);
	    }, function(date, step) {
	      while (--step >= 0) while (offseti(date, 1), !test(date));
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
	  if (!isFinite(k) || !(k > 0)) return null;
	  if (!(k > 1)) return millisecond;
	  return newInterval(function(date) {
	    date.setTime(Math.floor(date / k) * k);
	  }, function(date, step) {
	    date.setTime(+date + step * k);
	  }, function(start, end) {
	    return (end - start) / k;
	  });
	};

	var minute = 6e4;
	var day = 864e5;
	var week = 6048e5;

	var timeDay = newInterval(function(date) {
	  date.setHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setDate(date.getDate() + step);
	}, function(start, end) {
	  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * minute) / day;
	}, function(date) {
	  return date.getDate() - 1;
	});

	function weekday(i) {
	  return newInterval(function(date) {
	    date.setHours(0, 0, 0, 0);
	    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
	  }, function(date, step) {
	    date.setDate(date.getDate() + step * 7);
	  }, function(start, end) {
	    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * minute) / week;
	  });
	}

	var timeSunday = weekday(0);
	var timeMonday = weekday(1);

	var timeYear = newInterval(function(date) {
	  date.setHours(0, 0, 0, 0);
	  date.setMonth(0, 1);
	}, function(date, step) {
	  date.setFullYear(date.getFullYear() + step);
	}, function(start, end) {
	  return end.getFullYear() - start.getFullYear();
	}, function(date) {
	  return date.getFullYear();
	});

	var utcDay = newInterval(function(date) {
	  date.setUTCHours(0, 0, 0, 0);
	}, function(date, step) {
	  date.setUTCDate(date.getUTCDate() + step);
	}, function(start, end) {
	  return (end - start) / day;
	}, function(date) {
	  return date.getUTCDate() - 1;
	});

	function utcWeekday(i) {
	  return newInterval(function(date) {
	    date.setUTCHours(0, 0, 0, 0);
	    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
	  }, function(date, step) {
	    date.setUTCDate(date.getUTCDate() + step * 7);
	  }, function(start, end) {
	    return (end - start) / week;
	  });
	}

	var utcSunday = utcWeekday(0);
	var utcMonday = utcWeekday(1);

	var utcYear = newInterval(function(date) {
	  date.setUTCHours(0, 0, 0, 0);
	  date.setUTCMonth(0, 1);
	}, function(date, step) {
	  date.setUTCFullYear(date.getUTCFullYear() + step);
	}, function(start, end) {
	  return end.getUTCFullYear() - start.getUTCFullYear();
	}, function(date) {
	  return date.getUTCFullYear();
	});

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

	function locale$2(locale) {
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

	      if (!(date instanceof Date)) date = new Date(+date);

	      while (++i < n) {
	        if (specifier.charCodeAt(i) === 37) {
	          string.push(specifier.slice(j, i));
	          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
	          else pad = c === "e" ? " " : "0";
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
	    return function(string) {
	      var d = newYear(1900),
	          i = parseSpecifier(d, specifier, string += "", 0);
	      if (i != string.length) return null;

	      // The am-pm flag is 0 for AM, and 1 for PM.
	      if ("p" in d) d.H = d.H % 12 + d.p * 12;

	      // Convert day-of-week and week-of-year to day-of-year.
	      if ("W" in d || "U" in d) {
	        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
	        var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
	        d.m = 0;
	        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
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
	      if (j >= m) return -1;
	      c = specifier.charCodeAt(i++);
	      if (c === 37) {
	        c = specifier.charAt(i++);
	        parse = parses[c in pads ? specifier.charAt(i++) : c];
	        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
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
	  while (++i < n) map[names[i].toLowerCase()] = i;
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
	  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
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
	  return pad(timeSunday.count(timeYear(d), d), p, 2);
	}

	function formatWeekdayNumber(d) {
	  return d.getDay();
	}

	function formatWeekNumberMonday(d, p) {
	  return pad(timeMonday.count(timeYear(d), d), p, 2);
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

	var locale$1 = locale$2({
	  dateTime: "%a %b %e %X %Y",
	  date: "%m/%d/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});

	locale$2({
	  dateTime: "%A, %e de %B de %Y, %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],
	  shortDays: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],
	  months: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
	  shortMonths: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."]
	});

	locale$2({
	  dateTime: "%A, der %e. %B %Y, %X",
	  date: "%d.%m.%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	  shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	  shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	});

	locale$2({
	  dateTime: "%A, der %e. %B %Y, %X",
	  date: "%d.%m.%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
	  shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
	  months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
	  shortMonths: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
	});

	locale$2({
	  dateTime: "%a %b %e %X %Y",
	  date: "%Y-%m-%d",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});

	locale$2({
	  dateTime: "%a %e %b %X %Y",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});

	locale$2({
	  dateTime: "%A, %e de %B de %Y, %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
	  shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
	  months: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
	  shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
	});

	locale$2({
	  dateTime: "%A, %-d. %Bta %Y klo %X",
	  date: "%-d.%-m.%Y",
	  time: "%H:%M:%S",
	  periods: ["a.m.", "p.m."],
	  days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],
	  shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
	  months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
	  shortMonths: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä", "Elo", "Syys", "Loka", "Marras", "Joulu"]
	});

	locale$2({
	  dateTime: "%a %e %b %Y %X",
	  date: "%Y-%m-%d",
	  time: "%H:%M:%S",
	  periods: ["", ""],
	  days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	  shortDays: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
	  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	  shortMonths: ["jan", "fév", "mar", "avr", "mai", "jui", "jul", "aoû", "sep", "oct", "nov", "déc"]
	});

	locale$2({
	  dateTime: "%A, le %e %B %Y, %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
	  shortDays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
	  months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	  shortMonths: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
	});

	locale$2({
	  dateTime: "%A, %e ב%B %Y %X",
	  date: "%d.%m.%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
	  shortDays: ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"],
	  months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
	  shortMonths: ["ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳"]
	});

	locale$2({
	  dateTime: "%Y. %B %-e., %A %X",
	  date: "%Y. %m. %d.",
	  time: "%H:%M:%S",
	  periods: ["de.", "du."], // unused
	  days: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],
	  shortDays: ["V", "H", "K", "Sze", "Cs", "P", "Szo"],
	  months: ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
	  shortMonths: ["jan.", "feb.", "már.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."]
	});

	locale$2({
	  dateTime: "%A %e %B %Y, %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
	  shortDays: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
	  months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
	  shortMonths: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
	});

	locale$2({
	  dateTime: "%Y %b %e %a %X",
	  date: "%Y/%m/%d",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],
	  shortDays: ["日", "月", "火", "水", "木", "金", "土"],
	  months: ["睦月", "如月", "弥生", "卯月", "皐月", "水無月", "文月", "葉月", "長月", "神無月", "霜月", "師走"],
	  shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	});

	locale$2({
	  dateTime: "%Y/%m/%d %a %X",
	  date: "%Y/%m/%d",
	  time: "%H:%M:%S",
	  periods: ["오전", "오후"],
	  days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
	  shortDays: ["일", "월", "화", "수", "목", "금", "토"],
	  months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	  shortMonths: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	});

	locale$2({
	  dateTime: "%A, %e %B %Y г. %X",
	  date: "%d.%m.%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],
	  shortDays: ["нед", "пон", "вто", "сре", "чет", "пет", "саб"],
	  months: ["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"],
	  shortMonths: ["јан", "фев", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "ное", "дек"]
	});

	locale$2({
	  dateTime: "%a %e %B %Y %T",
	  date: "%d-%m-%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
	  shortDays: ["zo", "ma", "di", "wo", "do", "vr", "za"],
	  months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
	  shortMonths: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
	});

	locale$2({
	  dateTime: "%A, %e %B %Y, %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"], // unused
	  days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
	  shortDays: ["Niedz.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
	  months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
	  shortMonths: ["Stycz.", "Luty", "Marz.", "Kwie.", "Maj", "Czerw.", "Lipc.", "Sierp.", "Wrz.", "Paźdz.", "Listop.", "Grudz."]/* In Polish language abbraviated months are not commonly used so there is a dispute about the proper abbraviations. */
	});

	locale$2({
	  dateTime: "%A, %e de %B de %Y. %X",
	  date: "%d/%m/%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
	  shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
	  months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
	  shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
	});

	locale$2({
	  dateTime: "%A, %e %B %Y г. %X",
	  date: "%d.%m.%Y",
	  time: "%H:%M:%S",
	  periods: ["AM", "PM"],
	  days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
	  shortDays: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
	  months: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
	  shortMonths: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
	});

	locale$2({
	  dateTime: "%A den %d %B %Y %X",
	  date: "%Y-%m-%d",
	  time: "%H:%M:%S",
	  periods: ["fm", "em"],
	  days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
	  shortDays: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
	  months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
	  shortMonths: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
	});

	locale$2({
	  dateTime: "%a %b %e %X %Y",
	  date: "%Y/%-m/%-d",
	  time: "%H:%M:%S",
	  periods: ["上午", "下午"],
	  days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	  shortDays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
	  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	  shortMonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	});

	var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

	function formatIsoNative(date) {
	  return date.toISOString();
	}

	var formatIso = Date.prototype.toISOString
	    ? formatIsoNative
	    : locale$1.utcFormat(isoSpecifier);

	function parseIsoNative(string) {
	  var date = new Date(string);
	  return isNaN(date) ? null : date;
	}

	var parseIso = +new Date("2000-01-01T00:00:00.000Z")
	    ? parseIsoNative
	    : locale$1.utcParse(isoSpecifier);

	function colors(s) {
	  return s.match(/.{6}/g).map(function(x) {
	    return "#" + x;
	  });
	}

	var colors10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

	var colors20b = colors("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6");

	var colors20c = colors("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9");

	var colors20 = colors("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5");

	var rangeViridis = colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725");
	var rangeMagma = colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf");
	var rangeInferno = colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4");
	var rangePlasma = colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921");

	/**
	    @module {Object} defaults
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
	  "dark": "#444444",
	  "light": "#f7f7f7",
	  "missing": "#cccccc",
	  "off": "#b22200",
	  "on": "#224f20",
	  "scale": ordinal().range([
	    "#b22200", "#282f6b", "#eace3f", "#b35c1e", "#224f20", "#5f487c",
	    "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8",
	    "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"
	  ])
	};

	/**
	    Returns a color based on a key, whether it is present in a user supplied object or in the default object.
	    @private
	    @returns {String}
	*/
	function getColor(k, u) {
	  if ( u === void 0 ) u = {};

	  return k in u ? u[k] : defaults[k];
	}

	/**
	    @function assign
	    @desc Assigns a color to a value using a predefined set of defaults.
	    @param {String} c A valid CSS color string.
	    @param {Object} [u = defaults] An object containing overrides of the default colors.
	    @returns {String}
	*/
	function assign(c, u) {

	  // If the value is null or undefined, set to grey.
	  if ( u === void 0 ) u = {};

	  if ([null, void 0].indexOf(c) >= 0) return getColor("missing", u);
	  // Else if the value is true, set to green.
	  else if (c === true) return getColor("on", u);
	  // Else if the value is false, set to red.
	  else if (c === false) return getColor("off", u);

	  var p = color(c);
	  // If the value is not a valid color string, use the color scale.
	  if (!p) return getColor("scale", u)(c);

	  return c.toString();

	}

	/**
	    @function contrast
	    @desc A set of default color values used when assigning colors based on data.
	    @param {String} c A valid CSS color string.
	    @param {Object} [u = defaults] An object containing overrides of the default colors.
	    @returns {String}
	*/
	function contrast(c, u) {
	  if ( u === void 0 ) u = {};

	  c = rgb(c);
	  var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
	  return yiq >= 128 ? getColor("dark", u) : getColor("light", u);
	}

	/**
	    @function accessor
	    @desc Wraps an object key in a simple accessor function.
	    @param {String} key The key to be returned from each Object passed to the function.
	    @example <caption>this</caption>
	accessor("id");
	    @example <caption>returns this</caption>
	function(d) {
	  return d["id"];
	}
	*/
	function accessor(key) {
	  return function accessor(d) {
	    return d[key];
	  };
	}

	var prefix$1 = "$";

	function Map$1() {}

	Map$1.prototype = map$2.prototype = {
	  constructor: Map$1,
	  has: function(key) {
	    return (prefix$1 + key) in this;
	  },
	  get: function(key) {
	    return this[prefix$1 + key];
	  },
	  set: function(key, value) {
	    this[prefix$1 + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix$1 + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix$1) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix$1) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix$1) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix$1) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix$1) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix$1) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix$1) f(this[property], property.slice(1), this);
	  }
	};

	function map$2(object, f) {
	  var map = new Map$1;

	  // Copy constructor.
	  if (object instanceof Map$1) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	function nest$1() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;

	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup
	        ? rollup(array) : (sortValues
	        ? array.sort(sortValues)
	        : array);

	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map$2(),
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
	    if (depth >= keys.length) return map;

	    var array = [],
	        sortKey = sortKeys[depth++];

	    map.each(function(value, key) {
	      array.push({key: key, values: entries(value, depth)});
	    });

	    return sortKey
	        ? array.sort(function(a, b) { return sortKey(a.key, b.key); })
	        : array;
	  }

	  return nest = {
	    object: function(array) { return apply(array, 0, createObject$1, setObject$1); },
	    map: function(array) { return apply(array, 0, createMap$1, setMap$1); },
	    entries: function(array) { return entries(apply(array, 0, createMap$1, setMap$1), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	}

	function createObject$1() {
	  return {};
	}

	function setObject$1(object, key, value) {
	  object[key] = value;
	}

	function createMap$1() {
	  return map$2();
	}

	function setMap$1(map, key, value) {
	  map.set(key, value);
	}

	var proto$1 = map$2.prototype;

	function keys$1(map) {
	  var keys = [];
	  for (var key in map) keys.push(key);
	  return keys;
	}

	/**
	    @function merge
	    @desc Combines an Array of Objects together and returns a new Object.
	    @param {Array} objects The Array of objects to be merged together.
	    @example <caption>this</caption>
	merge([
	  {"id": "foo", "group": "A", "value": 10},
	  {"id": "bar", "group": "A", "value": 20}
	]);
	    @example <caption>returns this</caption>
	{"id": ["bar", "foo"], "group": "A", "value": 30}
	*/
	function combine(objects) {

	  var availableKeys = new Set(merge(objects.map(function (o) { return keys$1(o); }))),
	        newObject = {};

	  availableKeys.forEach(function (k) {
	    var values = objects.map(function (o) { return o[k]; });
	    var value;
	    if (values.map(function (v) { return typeof v; }).indexOf("string") >= 0) {
	      value = Array.from(new Set(values).values());
	      if (value.length === 1) value = value[0];
	    }
	    else value = sum(values);
	    newObject[k] = value;
	  });

	  return newObject;

	}

	/**
	    @function colorNest
	    @desc Returns an Array of data objects based on a given color accessor and groupBy levels.
	    @param {Array} raw The raw data Array to be grouped by color.
	    @param {Function} fill The color accessor for each data object.
	    @param {Array} [groupBy = []] An optional array of grouping accessors. Will autodetect if a certain group by level is assigning the colors, and will return the appropriate accessor.
	*/
	function colorNest(raw, fill, groupBy) {

	  if ( groupBy === void 0 ) groupBy = [];

	  if (groupBy && !(groupBy instanceof Array)) groupBy = [groupBy];

	  var colors = nest$1().key(fill).entries(raw);
	  var data, id;
	  if (groupBy.length) {
	    var numColors = colors.length;
	    var loop = function ( i ) {
	      var ids = colors.map(function (c) { return Array.from(new Set(c.values.map(function (d) { return groupBy[i](d); }))); }),
	            total = sum(ids, function (d) { return d.length; }),
	            uniques = new Set(merge(ids)).size;
	      if (total === numColors && uniques === numColors || i === groupBy.length - 1) {
	        id = groupBy[i];
	        data = nest$1().key(id).entries(raw).map(function (d) { return combine(d.values); });
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
	    data = colors.map(function (d) { return combine(d.values); });
	  }

	  return {data: data, id: id};

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
	function constant$3(value) {
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

	function namespace(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
	}

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

	function creator(name) {
	  var fullname = namespace(name);
	  return (fullname.local
	      ? creatorFixed
	      : creatorInherit)(fullname);
	}

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
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove(typename) {
	  return function() {
	    var this$1 = this;

	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this$1.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd(typename, value, capture) {
	  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
	  return function(d, i, group) {
	    var this$1 = this;

	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this$1.removeEventListener(o.type, o.listener, o.capture);
	        this$1.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	function selection_on(typename, value, capture) {
	  var this$1 = this;

	  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

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
	  for (i = 0; i < n; ++i) this$1.each(on(typenames[i], value, capture));
	  return this;
	}

	function selector(selector) {
	  return function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select(select) {
	  var this$1 = this;

	  if (typeof select !== "function") select = selector(select);

	  for (var groups = this$1._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function selectorAll(selector) {
	  return function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function selection_selectAll(select) {
	  var this$1 = this;

	  if (typeof select !== "function") select = selectorAll(select);

	  for (var groups = this$1._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection(subgroups, parents);
	}

	function selection_filter(match) {
	  var this$1 = this;

	  if (typeof match !== "function") match = matcher$1(match);

	  for (var groups = this$1._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup[i] = node;
	      }
	    }
	  }

	  return new Selection(subgroups, this._parents);
	}

	function constant$4(x) {
	  return function() {
	    return x;
	  };
	}

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
	  // If multiple nodes have the same key, only the first one counts.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
	      if (!nodeByKeyValue[keyValue]) {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If multiple data have the same key, only the first one counts.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix + key.call(parent, data[i], i, data);

	    // Is there a node associated with this key?
	    // If not, this datum is added to the enter selection.
	    if (!(node = nodeByKeyValue[keyValue])) {
	      enter[i] = new EnterNode(parent, data[i]);
	    }

	    // Did we already bind a node using this key? (Or is a duplicate?)
	    // If unique, the node and datum are joined in the update selection.
	    // Otherwise, the datum is ignored, neither entering nor exiting.
	    else if (node !== true) {
	      update[i] = node;
	      node.__data__ = data[i];
	    }

	    // Record that we consumed this key, either to enter or update.
	    nodeByKeyValue[keyValue] = true;
	  }

	  // Take any remaining nodes that were not bound to data,
	  // and place them in the exit selection.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] !== true)) {
	      exit[i] = node;
	    }
	  }
	}

	function selection_data(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }

	  var bind = key ? bindKey : bindIndex,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant$4(value);

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
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
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
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function sparse(update) {
	  return new Array(update.length);
	}

	function selection_enter() {
	  return new Selection(this._enter || this._groups.map(sparse), this._parents);
	}

	function selection_exit() {
	  return new Selection(this._exit || this._groups.map(sparse), this._parents);
	}

	function selection_merge(selection) {

	  var this$1 = this;

	  for (var groups0 = this$1._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
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

	  var this$1 = this;

	  for (var groups = this$1._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort(compare) {
	  var this$1 = this;

	  if (!compare) compare = ascending$1;

	  function compareNode(a, b) {
	    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
	  }

	  for (var groups = this$1._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
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

	function selection_call() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	}

	function selection_node() {

	  var this$1 = this;

	  for (var groups = this$1._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	}

	function selection_empty() {
	  return !this.node();
	}

	function selection_each(callback) {

	  var this$1 = this;

	  for (var groups = this$1._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

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
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr(name, value) {
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
	}

	function defaultView(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

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
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove : typeof value === "function"
	            ? styleFunction
	            : styleConstant)(name, value, priority == null ? "" : priority))
	      : defaultView(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	}

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
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	function selection_property(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove : typeof value === "function"
	          ? propertyFunction
	          : propertyConstant)(name, value))
	      : this.node()[name];
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
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove(node, names) {
	  var list = classList(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
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

	function selection_classed(name, value) {
	  var names = classArray(name + "");

	  if (arguments.length < 2) {
	    var list = classList(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction : value
	      ? classedTrue
	      : classedFalse)(names, value));
	}

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

	function selection_text(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove : (typeof value === "function"
	          ? textFunction
	          : textConstant)(value))
	      : this.node().textContent;
	}

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

	function selection_html(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove : (typeof value === "function"
	          ? htmlFunction
	          : htmlConstant)(value))
	      : this.node().innerHTML;
	}

	function raise$1() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	function selection_raise() {
	  return this.each(raise$1);
	}

	function lower() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower() {
	  return this.each(lower);
	}

	function append(create) {
	  return function() {
	    return this.appendChild(create.apply(this, arguments));
	  };
	}

	function insert(create, select) {
	  return function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  };
	}

	function constantNull() {
	  return null;
	}

	function selection_append(name, before) {
	  var create = typeof name === "function" ? name : creator(name);
	  return this.select(arguments.length < 2
	      ? append(create)
	      : insert(create, before == null
	          ? constantNull : typeof before === "function"
	          ? before
	          : selector(before)));
	}

	function remove() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove() {
	  return this.each(remove);
	}

	function selection_datum(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	function dispatchEvent(node, type, params) {
	  var window = defaultView(node),
	      event = window.CustomEvent;

	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
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

	function selection_dispatch(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction
	      : dispatchConstant)(type, params));
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
	  remove: selection_remove,
	  datum: selection_datum,
	  on: selection_on,
	  dispatch: selection_dispatch
	};

	function select(selector) {
	  return typeof selector === "string"
	      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection([[selector]], root);
	}

	/**
	  Given an HTMLElement and a "width" or "height" string, this function returns the current calculated size for the DOM element.
	  @private
	*/
	function elementSize(element, s) {

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
	    if (typeof val$1 === "number" && val$1 > 0) return val$1;
	    else return elementSize(element.parentNode, s);

	  }
	}

	/**
	    @function getSize
	    @desc Finds the available width and height for a specified HTMLElement, traversing it's parents until it finds something with constrained dimensions. Falls back to the inner dimensions of the browser window if none is found.
	    @param {HTMLElement} elem The HTMLElement to find dimensions for.
	*/
	function getSize(elem) {
	  return [elementSize(elem, "width"), elementSize(elem, "height")];
	}

	var xhtml$1 = "http://www.w3.org/1999/xhtml";

	var namespaces$1 = {
	  svg: "http://www.w3.org/2000/svg",
	  xhtml: xhtml$1,
	  xlink: "http://www.w3.org/1999/xlink",
	  xml: "http://www.w3.org/XML/1998/namespace",
	  xmlns: "http://www.w3.org/2000/xmlns/"
	};

	function namespace$1(name) {
	  var prefix = name += "", i = prefix.indexOf(":");
	  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
	  return namespaces$1.hasOwnProperty(prefix) ? {space: namespaces$1[prefix], local: name} : name;
	}

	function creatorInherit$1(name) {
	  return function() {
	    var document = this.ownerDocument,
	        uri = this.namespaceURI;
	    return uri === xhtml$1 && document.documentElement.namespaceURI === xhtml$1
	        ? document.createElement(name)
	        : document.createElementNS(uri, name);
	  };
	}

	function creatorFixed$1(fullname) {
	  return function() {
	    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
	  };
	}

	function creator$1(name) {
	  var fullname = namespace$1(name);
	  return (fullname.local
	      ? creatorFixed$1
	      : creatorInherit$1)(fullname);
	}

	var matcher$2 = function(selector) {
	  return function() {
	    return this.matches(selector);
	  };
	};

	if (typeof document !== "undefined") {
	  var element$2 = document.documentElement;
	  if (!element$2.matches) {
	    var vendorMatches$1 = element$2.webkitMatchesSelector
	        || element$2.msMatchesSelector
	        || element$2.mozMatchesSelector
	        || element$2.oMatchesSelector;
	    matcher$2 = function(selector) {
	      return function() {
	        return vendorMatches$1.call(this, selector);
	      };
	    };
	  }
	}

	var matcher$3 = matcher$2;

	var filterEvents$1 = {};

	var event$1 = null;

	if (typeof document !== "undefined") {
	  var element$3 = document.documentElement;
	  if (!("onmouseenter" in element$3)) {
	    filterEvents$1 = {mouseenter: "mouseover", mouseleave: "mouseout"};
	  }
	}

	function filterContextListener$1(listener, index, group) {
	  listener = contextListener$1(listener, index, group);
	  return function(event) {
	    var related = event.relatedTarget;
	    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
	      listener.call(this, event);
	    }
	  };
	}

	function contextListener$1(listener, index, group) {
	  return function(event1) {
	    var event0 = event$1; // Events can be reentrant (e.g., focus).
	    event$1 = event1;
	    try {
	      listener.call(this, this.__data__, index, group);
	    } finally {
	      event$1 = event0;
	    }
	  };
	}

	function parseTypenames$1(typenames) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    return {type: t, name: name};
	  });
	}

	function onRemove$1(typename) {
	  return function() {
	    var on = this.__on;
	    if (!on) return;
	    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
	      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	      } else {
	        on[++i] = o;
	      }
	    }
	    if (++i) on.length = i;
	    else delete this.__on;
	  };
	}

	function onAdd$1(typename, value, capture) {
	  var wrap = filterEvents$1.hasOwnProperty(typename.type) ? filterContextListener$1 : contextListener$1;
	  return function(d, i, group) {
	    var on = this.__on, o, listener = wrap(value, i, group);
	    if (on) for (var j = 0, m = on.length; j < m; ++j) {
	      if ((o = on[j]).type === typename.type && o.name === typename.name) {
	        this.removeEventListener(o.type, o.listener, o.capture);
	        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
	        o.value = value;
	        return;
	      }
	    }
	    this.addEventListener(typename.type, listener, capture);
	    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
	    if (!on) this.__on = [o];
	    else on.push(o);
	  };
	}

	function selection_on$1(typename, value, capture) {
	  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

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

	  on = value ? onAdd$1 : onRemove$1;
	  if (capture == null) capture = false;
	  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
	  return this;
	}

	function selector$1(selector) {
	  return function() {
	    return this.querySelector(selector);
	  };
	}

	function selection_select$1(select) {
	  if (typeof select !== "function") select = selector$1(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	function selectorAll$1(selector) {
	  return function() {
	    return this.querySelectorAll(selector);
	  };
	}

	function selection_selectAll$1(select) {
	  if (typeof select !== "function") select = selectorAll$1(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        subgroups.push(select.call(node, node.__data__, i, group));
	        parents.push(node);
	      }
	    }
	  }

	  return new Selection$1(subgroups, parents);
	}

	function selection_filter$1(match) {
	  if (typeof match !== "function") match = matcher$3(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup[i] = node;
	      }
	    }
	  }

	  return new Selection$1(subgroups, this._parents);
	}

	function constant$5(x) {
	  return function() {
	    return x;
	  };
	}

	var keyPrefix$1 = "$"; // Protect against keys like “__proto__”.

	function bindIndex$1(parent, group, enter, update, exit, data) {
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
	      enter[i] = new EnterNode$1(parent, data[i]);
	    }
	  }

	  // Put any non-null nodes that don’t fit into exit.
	  for (; i < groupLength; ++i) {
	    if (node = group[i]) {
	      exit[i] = node;
	    }
	  }
	}

	function bindKey$1(parent, group, enter, update, exit, data, key) {
	  var i,
	      node,
	      nodeByKeyValue = {},
	      groupLength = group.length,
	      dataLength = data.length,
	      keyValues = new Array(groupLength),
	      keyValue;

	  // Compute the key for each node.
	  // If multiple nodes have the same key, only the first one counts.
	  for (i = 0; i < groupLength; ++i) {
	    if (node = group[i]) {
	      keyValues[i] = keyValue = keyPrefix$1 + key.call(node, node.__data__, i, group);
	      if (!nodeByKeyValue[keyValue]) {
	        nodeByKeyValue[keyValue] = node;
	      }
	    }
	  }

	  // Compute the key for each datum.
	  // If multiple data have the same key, only the first one counts.
	  for (i = 0; i < dataLength; ++i) {
	    keyValue = keyPrefix$1 + key.call(parent, data[i], i, data);

	    // Is there a node associated with this key?
	    // If not, this datum is added to the enter selection.
	    if (!(node = nodeByKeyValue[keyValue])) {
	      enter[i] = new EnterNode$1(parent, data[i]);
	    }

	    // Did we already bind a node using this key? (Or is a duplicate?)
	    // If unique, the node and datum are joined in the update selection.
	    // Otherwise, the datum is ignored, neither entering nor exiting.
	    else if (node !== true) {
	      update[i] = node;
	      node.__data__ = data[i];
	    }

	    // Record that we consumed this key, either to enter or update.
	    nodeByKeyValue[keyValue] = true;
	  }

	  // Take any remaining nodes that were not bound to data,
	  // and place them in the exit selection.
	  for (i = 0; i < groupLength; ++i) {
	    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] !== true)) {
	      exit[i] = node;
	    }
	  }
	}

	function selection_data$1(value, key) {
	  if (!value) {
	    data = new Array(this.size()), j = -1;
	    this.each(function(d) { data[++j] = d; });
	    return data;
	  }

	  var bind = key ? bindKey$1 : bindIndex$1,
	      parents = this._parents,
	      groups = this._groups;

	  if (typeof value !== "function") value = constant$5(value);

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
	        if (i0 >= i1) i1 = i0 + 1;
	        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
	        previous._next = next || null;
	      }
	    }
	  }

	  update = new Selection$1(update, parents);
	  update._enter = enter;
	  update._exit = exit;
	  return update;
	}

	function EnterNode$1(parent, datum) {
	  this.ownerDocument = parent.ownerDocument;
	  this.namespaceURI = parent.namespaceURI;
	  this._next = null;
	  this._parent = parent;
	  this.__data__ = datum;
	}

	EnterNode$1.prototype = {
	  constructor: EnterNode$1,
	  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
	  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
	  querySelector: function(selector) { return this._parent.querySelector(selector); },
	  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
	};

	function sparse$1(update) {
	  return new Array(update.length);
	}

	function selection_enter$1() {
	  return new Selection$1(this._enter || this._groups.map(sparse$1), this._parents);
	}

	function selection_exit$1() {
	  return new Selection$1(this._exit || this._groups.map(sparse$1), this._parents);
	}

	function selection_merge$1(selection) {

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

	  return new Selection$1(merges, this._parents);
	}

	function selection_order$1() {

	  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
	    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
	      if (node = group[i]) {
	        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
	        next = node;
	      }
	    }
	  }

	  return this;
	}

	function selection_sort$1(compare) {
	  if (!compare) compare = ascending$2;

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

	  return new Selection$1(sortgroups, this._parents).order();
	}

	function ascending$2(a, b) {
	  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
	}

	function selection_call$1() {
	  var callback = arguments[0];
	  arguments[0] = this;
	  callback.apply(null, arguments);
	  return this;
	}

	function selection_nodes$1() {
	  var nodes = new Array(this.size()), i = -1;
	  this.each(function() { nodes[++i] = this; });
	  return nodes;
	}

	function selection_node$1() {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
	      var node = group[i];
	      if (node) return node;
	    }
	  }

	  return null;
	}

	function selection_size$1() {
	  var size = 0;
	  this.each(function() { ++size; });
	  return size;
	}

	function selection_empty$1() {
	  return !this.node();
	}

	function selection_each$1(callback) {

	  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
	    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
	      if (node = group[i]) callback.call(node, node.__data__, i, group);
	    }
	  }

	  return this;
	}

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

	function attrConstant$1(name, value) {
	  return function() {
	    this.setAttribute(name, value);
	  };
	}

	function attrConstantNS$1(fullname, value) {
	  return function() {
	    this.setAttributeNS(fullname.space, fullname.local, value);
	  };
	}

	function attrFunction$1(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttribute(name);
	    else this.setAttribute(name, v);
	  };
	}

	function attrFunctionNS$1(fullname, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
	    else this.setAttributeNS(fullname.space, fullname.local, v);
	  };
	}

	function selection_attr$1(name, value) {
	  var fullname = namespace$1(name);

	  if (arguments.length < 2) {
	    var node = this.node();
	    return fullname.local
	        ? node.getAttributeNS(fullname.space, fullname.local)
	        : node.getAttribute(fullname);
	  }

	  return this.each((value == null
	      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
	      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
	      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
	}

	function window$1(node) {
	  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
	      || (node.document && node) // node is a Window
	      || node.defaultView; // node is a Document
	}

	function styleRemove$1(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant$1(name, value, priority) {
	  return function() {
	    this.style.setProperty(name, value, priority);
	  };
	}

	function styleFunction$1(name, value, priority) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) this.style.removeProperty(name);
	    else this.style.setProperty(name, v, priority);
	  };
	}

	function selection_style$1(name, value, priority) {
	  var node;
	  return arguments.length > 1
	      ? this.each((value == null
	            ? styleRemove$1 : typeof value === "function"
	            ? styleFunction$1
	            : styleConstant$1)(name, value, priority == null ? "" : priority))
	      : window$1(node = this.node())
	          .getComputedStyle(node, null)
	          .getPropertyValue(name);
	}

	function propertyRemove$1(name) {
	  return function() {
	    delete this[name];
	  };
	}

	function propertyConstant$1(name, value) {
	  return function() {
	    this[name] = value;
	  };
	}

	function propertyFunction$1(name, value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    if (v == null) delete this[name];
	    else this[name] = v;
	  };
	}

	function selection_property$1(name, value) {
	  return arguments.length > 1
	      ? this.each((value == null
	          ? propertyRemove$1 : typeof value === "function"
	          ? propertyFunction$1
	          : propertyConstant$1)(name, value))
	      : this.node()[name];
	}

	function classArray$1(string) {
	  return string.trim().split(/^|\s+/);
	}

	function classList$1(node) {
	  return node.classList || new ClassList$1(node);
	}

	function ClassList$1(node) {
	  this._node = node;
	  this._names = classArray$1(node.getAttribute("class") || "");
	}

	ClassList$1.prototype = {
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

	function classedAdd$1(node, names) {
	  var list = classList$1(node), i = -1, n = names.length;
	  while (++i < n) list.add(names[i]);
	}

	function classedRemove$1(node, names) {
	  var list = classList$1(node), i = -1, n = names.length;
	  while (++i < n) list.remove(names[i]);
	}

	function classedTrue$1(names) {
	  return function() {
	    classedAdd$1(this, names);
	  };
	}

	function classedFalse$1(names) {
	  return function() {
	    classedRemove$1(this, names);
	  };
	}

	function classedFunction$1(names, value) {
	  return function() {
	    (value.apply(this, arguments) ? classedAdd$1 : classedRemove$1)(this, names);
	  };
	}

	function selection_classed$1(name, value) {
	  var names = classArray$1(name + "");

	  if (arguments.length < 2) {
	    var list = classList$1(this.node()), i = -1, n = names.length;
	    while (++i < n) if (!list.contains(names[i])) return false;
	    return true;
	  }

	  return this.each((typeof value === "function"
	      ? classedFunction$1 : value
	      ? classedTrue$1
	      : classedFalse$1)(names, value));
	}

	function textRemove$1() {
	  this.textContent = "";
	}

	function textConstant$1(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction$1(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.textContent = v == null ? "" : v;
	  };
	}

	function selection_text$1(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? textRemove$1 : (typeof value === "function"
	          ? textFunction$1
	          : textConstant$1)(value))
	      : this.node().textContent;
	}

	function htmlRemove$1() {
	  this.innerHTML = "";
	}

	function htmlConstant$1(value) {
	  return function() {
	    this.innerHTML = value;
	  };
	}

	function htmlFunction$1(value) {
	  return function() {
	    var v = value.apply(this, arguments);
	    this.innerHTML = v == null ? "" : v;
	  };
	}

	function selection_html$1(value) {
	  return arguments.length
	      ? this.each(value == null
	          ? htmlRemove$1 : (typeof value === "function"
	          ? htmlFunction$1
	          : htmlConstant$1)(value))
	      : this.node().innerHTML;
	}

	function raise$2() {
	  if (this.nextSibling) this.parentNode.appendChild(this);
	}

	function selection_raise$1() {
	  return this.each(raise$2);
	}

	function lower$1() {
	  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
	}

	function selection_lower$1() {
	  return this.each(lower$1);
	}

	function append$1(create) {
	  return function() {
	    return this.appendChild(create.apply(this, arguments));
	  };
	}

	function insert$1(create, select) {
	  return function() {
	    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
	  };
	}

	function constantNull$1() {
	  return null;
	}

	function selection_append$1(name, before) {
	  var create = typeof name === "function" ? name : creator$1(name);
	  return this.select(arguments.length < 2
	      ? append$1(create)
	      : insert$1(create, before == null
	          ? constantNull$1 : typeof before === "function"
	          ? before
	          : selector$1(before)));
	}

	function remove$1() {
	  var parent = this.parentNode;
	  if (parent) parent.removeChild(this);
	}

	function selection_remove$1() {
	  return this.each(remove$1);
	}

	function selection_datum$1(value) {
	  return arguments.length
	      ? this.property("__data__", value)
	      : this.node().__data__;
	}

	function dispatchEvent$1(node, type, params) {
	  var window = window$1(node),
	      event = window.CustomEvent;

	  if (event) {
	    event = new event(type, params);
	  } else {
	    event = window.document.createEvent("Event");
	    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
	    else event.initEvent(type, false, false);
	  }

	  node.dispatchEvent(event);
	}

	function dispatchConstant$1(type, params) {
	  return function() {
	    return dispatchEvent$1(this, type, params);
	  };
	}

	function dispatchFunction$1(type, params) {
	  return function() {
	    return dispatchEvent$1(this, type, params.apply(this, arguments));
	  };
	}

	function selection_dispatch$1(type, params) {
	  return this.each((typeof params === "function"
	      ? dispatchFunction$1
	      : dispatchConstant$1)(type, params));
	}

	var root$1 = [null];

	function Selection$1(groups, parents) {
	  this._groups = groups;
	  this._parents = parents;
	}

	function selection$1() {
	  return new Selection$1([[document.documentElement]], root$1);
	}

	Selection$1.prototype = selection$1.prototype = {
	  constructor: Selection$1,
	  select: selection_select$1,
	  selectAll: selection_selectAll$1,
	  filter: selection_filter$1,
	  data: selection_data$1,
	  enter: selection_enter$1,
	  exit: selection_exit$1,
	  merge: selection_merge$1,
	  order: selection_order$1,
	  sort: selection_sort$1,
	  call: selection_call$1,
	  nodes: selection_nodes$1,
	  node: selection_node$1,
	  size: selection_size$1,
	  empty: selection_empty$1,
	  each: selection_each$1,
	  attr: selection_attr$1,
	  style: selection_style$1,
	  property: selection_property$1,
	  classed: selection_classed$1,
	  text: selection_text$1,
	  html: selection_html$1,
	  raise: selection_raise$1,
	  lower: selection_lower$1,
	  append: selection_append$1,
	  remove: selection_remove$1,
	  datum: selection_datum$1,
	  on: selection_on$1,
	  dispatch: selection_dispatch$1
	};

	function d3Select(selector) {
	  return typeof selector === "string"
	      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
	      : new Selection$1([[selector]], root$1);
	}

	var noop = {value: function() {}};

	function dispatch() {
	  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	    if (!(t = arguments[i] + "") || (t in _)) throw new Error;
	    _[t] = [];
	  }
	  return new Dispatch(_);
	}

	function Dispatch(_) {
	  this._ = _;
	}

	function parseTypenames$2(typenames, types) {
	  return typenames.trim().split(/^|\s+/).map(function(t) {
	    var name = "", i = t.indexOf(".");
	    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	    if (t && !types.hasOwnProperty(t)) throw new Error;
	    return {type: t, name: name};
	  });
	}

	Dispatch.prototype = dispatch.prototype = {
	  constructor: Dispatch,
	  on: function(typename, callback) {
	    var _ = this._,
	        T = parseTypenames$2(typename + "", _),
	        t,
	        i = -1,
	        n = T.length;

	    // If no callback was specified, return the callback of the given type and name.
	    if (arguments.length < 2) {
	      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
	      return;
	    }

	    // If a type was specified, set the callback for the given type and name.
	    // Otherwise, if a null callback was specified, remove callbacks of the given name.
	    if (callback != null && typeof callback !== "function") throw new Error;
	    while (++i < n) {
	      if (t = (typename = T[i]).type) _[t] = set$3(_[t], typename.name, callback);
	      else if (callback == null) for (t in _) _[t] = set$3(_[t], typename.name, null);
	    }

	    return this;
	  },
	  copy: function() {
	    var copy = {}, _ = this._;
	    for (var t in _) copy[t] = _[t].slice();
	    return new Dispatch(copy);
	  },
	  call: function(type, that) {
	    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n; i < n; ++i) args[i] = arguments[i + 2];
	    this.apply(type, that, args);
	  },
	  apply: function(type, that, args) {
	    if (!this._.hasOwnProperty(type)) throw new Error;
	    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	  }
	};

	function get$1(type, name) {
	  for (var i = 0, n = type.length, c; i < n; ++i) {
	    if ((c = type[i]).name === name) {
	      return c.value;
	    }
	  }
	}

	function set$3(type, name, callback) {
	  for (var i = 0, n = type.length; i < n; ++i) {
	    if (type[i].name === name) {
	      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	      break;
	    }
	  }
	  if (callback != null) type.push({name: name, value: callback});
	  return type;
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
	var clock = typeof performance === "object" ? performance : Date;
	var setFrame = typeof requestAnimationFrame === "function"
	        ? (clock === Date ? function(f) { requestAnimationFrame(function() { f(clock.now()); }); } : requestAnimationFrame)
	        : function(f) { setTimeout(f, 17); };
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
	    if (typeof callback !== "function") throw new TypeError("callback is not a function");
	    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
	    if (!this._next && taskTail !== this) {
	      if (taskTail) taskTail._next = this;
	      else taskHead = this;
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
	    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
	    t = t._next;
	  }
	  --frame;
	}

	function wake(time) {
	  clockNow = (clockLast = time || clock.now()) + clockSkew;
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
	  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
	}

	function nap() {
	  var t0, t1 = taskHead, time = Infinity;
	  while (t1) {
	    if (t1._call) {
	      if (time > t1._time) time = t1._time;
	      t1 = (t0 = t1)._next;
	    } else {
	      t1 = t0 ? t0._next = t1._next : taskHead = t1._next;
	    }
	  }
	  taskTail = t0;
	  sleep(time);
	}

	function sleep(time) {
	  if (frame) return; // Soonest alarm already set, or will be.
	  if (timeout) timeout = clearTimeout(timeout);
	  var delay = time - clockNow;
	  if (delay > 24) {
	    if (time < Infinity) timeout = setTimeout(wake, delay);
	    if (interval) interval = clearInterval(interval);
	  } else {
	    if (!interval) interval = setInterval(poke, pokeDelay);
	    frame = 1, setFrame(wake);
	  }
	}

	function timeout$1(callback, delay, time) {
	  var t = new Timer;
	  delay = delay == null ? 0 : +delay;
	  t.restart(function(elapsed) {
	    t.stop();
	    callback(elapsed + delay);
	  }, delay, time);
	  return t;
	}

	var emptyOn = dispatch("start", "end", "interrupt");
	var emptyTween = [];

	var CREATED = 0;
	var SCHEDULED = 1;
	var STARTING = 2;
	var STARTED = 3;
	var ENDING = 4;
	var ENDED = 5;

	function schedule(node, name, id, index, group, timing) {
	  var schedules = node.__transition;
	  if (!schedules) node.__transition = {};
	  else if (id in schedules) return;
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
	}

	function init(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
	  return schedule;
	}

	function set$2(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
	  return schedule;
	}

	function get(node, id) {
	  var schedule = node.__transition;
	  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
	  return schedule;
	}

	function create(node, id, self) {
	  var schedules = node.__transition,
	      tween;

	  // Initialize the self timer when the transition is created.
	  // Note the actual delay is not known until the first callback!
	  schedules[id] = self;
	  self.timer = timer(schedule, 0, self.time);

	  // If the delay is greater than this first sleep, sleep some more;
	  // otherwise, start immediately.
	  function schedule(elapsed) {
	    self.state = SCHEDULED;
	    if (self.delay <= elapsed) start(elapsed - self.delay);
	    else self.timer.restart(start, self.delay, self.time);
	  }

	  function start(elapsed) {
	    var i, j, n, o;

	    for (i in schedules) {
	      o = schedules[i];
	      if (o.name !== self.name) continue;

	      // Interrupt the active transition, if any.
	      // Dispatch the interrupt event.
	      if (o.state === STARTED) {
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

	    // Defer the first tick to end of the current frame; see mbostock/d3#1576.
	    // Note the transition may be canceled after start and before the first tick!
	    // Note this must be scheduled before the start event; see d3/d3-transition#16!
	    // Assuming this is successful, subsequent callbacks go straight to tick.
	    timeout$1(function() {
	      if (self.state === STARTED) {
	        self.timer.restart(tick, self.delay, self.time);
	        tick(elapsed);
	      }
	    });

	    // Dispatch the start event.
	    // Note this must be done before the tween are initialized.
	    self.state = STARTING;
	    self.on.call("start", node, node.__data__, self.index, self.group);
	    if (self.state !== STARTING) return; // interrupted
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
	    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.state = ENDING, 1),
	        i = -1,
	        n = tween.length;

	    while (++i < n) {
	      tween[i].call(null, t);
	    }

	    // Dispatch the end event.
	    if (self.state === ENDING) {
	      self.state = ENDED;
	      self.timer.stop();
	      self.on.call("end", node, node.__data__, self.index, self.group);
	      for (i in schedules) if (+i !== id) return void delete schedules[id];
	      delete node.__transition;
	    }
	  }
	}

	function interrupt(node, name) {
	  var schedules = node.__transition,
	      schedule,
	      active,
	      empty = true,
	      i;

	  if (!schedules) return;

	  name = name == null ? null : name + "";

	  for (i in schedules) {
	    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
	    active = schedule.state === STARTED;
	    schedule.state = ENDED;
	    schedule.timer.stop();
	    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
	    delete schedules[i];
	  }

	  if (empty) delete node.__transition;
	}

	function selection_interrupt(name) {
	  return this.each(function() {
	    interrupt(this, name);
	  });
	}

	function constant$6(x) {
	  return function() {
	    return x;
	  };
	}

	function linear$2(a, d) {
	  return function(t) {
	    return a + t * d;
	  };
	}

	function exponential$1(a, b, y) {
	  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
	    return Math.pow(a + t * b, y);
	  };
	}

	function interpolateHue$1(a, b) {
	  var d = b - a;
	  return d ? linear$2(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$6(isNaN(a) ? b : a);
	}

	function gamma$1(y) {
	  return (y = +y) === 1 ? nogamma$1 : function(a, b) {
	    return b - a ? exponential$1(a, b, y) : constant$6(isNaN(a) ? b : a);
	  };
	}

	function nogamma$1(a, b) {
	  var d = b - a;
	  return d ? linear$2(a, d) : constant$6(isNaN(a) ? b : a);
	}

	var interpolateRgb = (function gamma(y) {
	  var interpolateColor = gamma$1(y);

	  function interpolateRgb(start, end) {
	    var r = interpolateColor((start = rgb(start)).r, (end = rgb(end)).r),
	        g = interpolateColor(start.g, end.g),
	        b = interpolateColor(start.b, end.b),
	        opacity = interpolateColor(start.opacity, end.opacity);
	    return function(t) {
	      start.r = r(t);
	      start.g = g(t);
	      start.b = b(t);
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateRgb.gamma = gamma;

	  return interpolateRgb;
	})(1);

	function interpolateNumber(a, b) {
	  return a = +a, b -= a, function(t) {
	    return a + b * t;
	  };
	}

	var reA$1 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
	var reB$1 = new RegExp(reA$1.source, "g");
	function zero$1(b) {
	  return function() {
	    return b;
	  };
	}

	function one$1(b) {
	  return function(t) {
	    return b(t) + "";
	  };
	}

	function interpolateString(a, b) {
	  var bi = reA$1.lastIndex = reB$1.lastIndex = 0, // scan index for next number in b
	      am, // current match in a
	      bm, // current match in b
	      bs, // string preceding current number in b, if any
	      i = -1, // index in s
	      s = [], // string constants and placeholders
	      q = []; // number interpolators

	  // Coerce inputs to strings.
	  a = a + "", b = b + "";

	  // Interpolate pairs of numbers in a & b.
	  while ((am = reA$1.exec(a))
	      && (bm = reB$1.exec(b))) {
	    if ((bs = bm.index) > bi) { // a string precedes the next number in b
	      bs = b.slice(bi, bs);
	      if (s[i]) s[i] += bs; // coalesce with previous string
	      else s[++i] = bs;
	    }
	    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
	      if (s[i]) s[i] += bm; // coalesce with previous string
	      else s[++i] = bm;
	    } else { // interpolate non-matching numbers
	      s[++i] = null;
	      q.push({i: i, x: interpolateNumber(am, bm)});
	    }
	    bi = reB$1.lastIndex;
	  }

	  // Add remains of b.
	  if (bi < b.length) {
	    bs = b.slice(bi);
	    if (s[i]) s[i] += bs; // coalesce with previous string
	    else s[++i] = bs;
	  }

	  // Special optimization for only a single match.
	  // Otherwise, interpolate each of the numbers and rejoin the string.
	  return s.length < 2 ? (q[0]
	      ? one$1(q[0].x)
	      : zero$1(b))
	      : (b = q.length, function(t) {
	          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
	          return s.join("");
	        });
	}

	var rad2deg$2 = 180 / Math.PI;

	var identity$4 = {
	  translateX: 0,
	  translateY: 0,
	  rotate: 0,
	  skewX: 0,
	  scaleX: 1,
	  scaleY: 1
	};

	function decompose$1(a, b, c, d, e, f) {
	  if (a * d === b * c) return null;

	  var scaleX = Math.sqrt(a * a + b * b);
	  a /= scaleX, b /= scaleX;

	  var skewX = a * c + b * d;
	  c -= a * skewX, d -= b * skewX;

	  var scaleY = Math.sqrt(c * c + d * d);
	  c /= scaleY, d /= scaleY, skewX /= scaleY;

	  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;

	  return {
	    translateX: e,
	    translateY: f,
	    rotate: Math.atan2(b, a) * rad2deg$2,
	    skewX: Math.atan(skewX) * rad2deg$2,
	    scaleX: scaleX,
	    scaleY: scaleY
	  };
	}

	var cssNode$1;
	var cssRoot$1;
	var cssView$1;
	var svgNode$1;
	function parseCss$1(value) {
	  if (value === "none") return identity$4;
	  if (!cssNode$1) cssNode$1 = document.createElement("DIV"), cssRoot$1 = document.documentElement, cssView$1 = document.defaultView;
	  cssNode$1.style.transform = value;
	  value = cssView$1.getComputedStyle(cssRoot$1.appendChild(cssNode$1), null).getPropertyValue("transform");
	  cssRoot$1.removeChild(cssNode$1);
	  var m = value.slice(7, -1).split(",");
	  return decompose$1(+m[0], +m[1], +m[2], +m[3], +m[4], +m[5]);
	}

	function parseSvg$1(value) {
	  if (!svgNode$1) svgNode$1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
	  svgNode$1.setAttribute("transform", value == null ? "" : value);
	  var m = svgNode$1.transform.baseVal.consolidate().matrix;
	  return decompose$1(m.a, m.b, m.c, m.d, m.e, m.f);
	}

	function interpolateTransform$1(parse, pxComma, pxParen, degParen) {

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
	      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
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
	      while (++i < n) s[(o = q[i]).i] = o.x(t);
	      return s.join("");
	    };
	  };
	}

	var interpolateTransform$2 = interpolateTransform$1(parseCss$1, "px, ", "px)", "deg)");
	var interpolateTransformSvg$1 = interpolateTransform$1(parseSvg$1, ", ", ")", ")");

	(function gamma(y) {
	  y = +y;

	  function interpolateCubehelix(start, end) {
	    var h = interpolateHue$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
	        s = nogamma$1(start.s, end.s),
	        l = nogamma$1(start.l, end.l),
	        opacity = nogamma$1(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(Math.pow(t, y));
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateCubehelix.gamma = gamma;

	  return interpolateCubehelix;
	})(1);

	(function gamma(y) {
	  y = +y;

	  function interpolateCubehelixLong(start, end) {
	    var h = nogamma$1((start = cubehelix(start)).h, (end = cubehelix(end)).h),
	        s = nogamma$1(start.s, end.s),
	        l = nogamma$1(start.l, end.l),
	        opacity = nogamma$1(start.opacity, end.opacity);
	    return function(t) {
	      start.h = h(t);
	      start.s = s(t);
	      start.l = l(Math.pow(t, y));
	      start.opacity = opacity(t);
	      return start + "";
	    };
	  }

	  interpolateCubehelixLong.gamma = gamma;

	  return interpolateCubehelixLong;
	})(1);

	function tweenRemove(id, name) {
	  var tween0, tween1;
	  return function() {
	    var schedule = set$2(this, id),
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
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    var schedule = set$2(this, id),
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
	      if (i === n) tween1.push(t);
	    }

	    schedule.tween = tween1;
	  };
	}

	function transition_tween(name, value) {
	  var id = this._id;

	  name += "";

	  if (arguments.length < 2) {
	    var tween = get(this.node(), id).tween;
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

	  transition.each(function() {
	    var schedule = set$2(this, id);
	    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
	  });

	  return function(node) {
	    return get(node, id).value[name];
	  };
	}

	function interpolate(a, b) {
	  var c;
	  return (typeof b === "number" ? interpolateNumber
	      : b instanceof color ? interpolateRgb
	      : (c = color(b)) ? (b = c, interpolateRgb)
	      : interpolateString)(a, b);
	}

	function attrRemove$2(name) {
	  return function() {
	    this.removeAttribute(name);
	  };
	}

	function attrRemoveNS$2(fullname) {
	  return function() {
	    this.removeAttributeNS(fullname.space, fullname.local);
	  };
	}

	function attrConstant$2(name, interpolate, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value1);
	  };
	}

	function attrConstantNS$2(fullname, interpolate, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value1);
	  };
	}

	function attrFunction$2(name, interpolate, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttribute(name);
	    value0 = this.getAttribute(name);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function attrFunctionNS$2(fullname, interpolate, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var value0, value1 = value(this);
	    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
	    value0 = this.getAttributeNS(fullname.space, fullname.local);
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function transition_attr(name, value) {
	  var fullname = namespace$1(name), i = fullname === "transform" ? interpolateTransformSvg$1 : interpolate;
	  return this.attrTween(name, typeof value === "function"
	      ? (fullname.local ? attrFunctionNS$2 : attrFunction$2)(fullname, i, tweenValue(this, "attr." + name, value))
	      : value == null ? (fullname.local ? attrRemoveNS$2 : attrRemove$2)(fullname)
	      : (fullname.local ? attrConstantNS$2 : attrConstant$2)(fullname, i, value));
	}

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

	function transition_attrTween(name, value) {
	  var key = "attr." + name;
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  var fullname = namespace$1(name);
	  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
	}

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

	function transition_delay(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? delayFunction
	          : delayConstant)(id, value))
	      : get(this.node(), id).delay;
	}

	function durationFunction(id, value) {
	  return function() {
	    set$2(this, id).duration = +value.apply(this, arguments);
	  };
	}

	function durationConstant(id, value) {
	  return value = +value, function() {
	    set$2(this, id).duration = value;
	  };
	}

	function transition_duration(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each((typeof value === "function"
	          ? durationFunction
	          : durationConstant)(id, value))
	      : get(this.node(), id).duration;
	}

	function easeConstant(id, value) {
	  if (typeof value !== "function") throw new Error;
	  return function() {
	    set$2(this, id).ease = value;
	  };
	}

	function transition_ease(value) {
	  var id = this._id;

	  return arguments.length
	      ? this.each(easeConstant(id, value))
	      : get(this.node(), id).ease;
	}

	function transition_filter(match) {
	  if (typeof match !== "function") match = matcher$3(match);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
	      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
	        subgroup[i] = node;
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, this._name, this._id);
	}

	function transition_merge(transition) {
	  if (transition._id !== this._id) throw new Error;

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
	  return (name + "").trim().split(/^|\s+/).every(function(t) {
	    var i = t.indexOf(".");
	    if (i >= 0) t = t.slice(0, i);
	    return !t || t === "start";
	  });
	}

	function onFunction(id, name, listener) {
	  var on0, on1, sit = start(name) ? init : set$2;
	  return function() {
	    var schedule = sit(this, id),
	        on = schedule.on;

	    // If this node shared a dispatch with the previous node,
	    // just assign the updated shared dispatch and we’re done!
	    // Otherwise, copy-on-write.
	    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

	    schedule.on = on1;
	  };
	}

	function transition_on(name, listener) {
	  var id = this._id;

	  return arguments.length < 2
	      ? get(this.node(), id).on.on(name)
	      : this.each(onFunction(id, name, listener));
	}

	function removeFunction(id) {
	  return function() {
	    var parent = this.parentNode;
	    for (var i in this.__transition) if (+i !== id) return;
	    if (parent) parent.removeChild(this);
	  };
	}

	function transition_remove() {
	  return this.on("end.remove", removeFunction(this._id));
	}

	function transition_select(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selector$1(select);

	  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
	      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
	        if ("__data__" in node) subnode.__data__ = node.__data__;
	        subgroup[i] = subnode;
	        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
	      }
	    }
	  }

	  return new Transition(subgroups, this._parents, name, id);
	}

	function transition_selectAll(select) {
	  var name = this._name,
	      id = this._id;

	  if (typeof select !== "function") select = selectorAll$1(select);

	  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
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

	var Selection$2 = selection$1.prototype.constructor;

	function transition_selection() {
	  return new Selection$2(this._groups, this._parents);
	}

	function styleRemove$2(name, interpolate) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = window$1(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function styleRemoveEnd(name) {
	  return function() {
	    this.style.removeProperty(name);
	  };
	}

	function styleConstant$2(name, interpolate, value1) {
	  var value00,
	      interpolate0;
	  return function() {
	    var value0 = window$1(this).getComputedStyle(this, null).getPropertyValue(name);
	    return value0 === value1 ? null
	        : value0 === value00 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value1);
	  };
	}

	function styleFunction$2(name, interpolate, value) {
	  var value00,
	      value10,
	      interpolate0;
	  return function() {
	    var style = window$1(this).getComputedStyle(this, null),
	        value0 = style.getPropertyValue(name),
	        value1 = value(this);
	    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
	    return value0 === value1 ? null
	        : value0 === value00 && value1 === value10 ? interpolate0
	        : interpolate0 = interpolate(value00 = value0, value10 = value1);
	  };
	}

	function transition_style(name, value, priority) {
	  var i = (name += "") === "transform" ? interpolateTransform$2 : interpolate;
	  return value == null ? this
	          .styleTween(name, styleRemove$2(name, i))
	          .on("end.style." + name, styleRemoveEnd(name))
	      : this.styleTween(name, typeof value === "function"
	          ? styleFunction$2(name, i, tweenValue(this, "style." + name, value))
	          : styleConstant$2(name, i, value), priority);
	}

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

	function transition_styleTween(name, value, priority) {
	  var key = "style." + (name += "");
	  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
	  if (value == null) return this.tween(key, null);
	  if (typeof value !== "function") throw new Error;
	  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
	}

	function textConstant$2(value) {
	  return function() {
	    this.textContent = value;
	  };
	}

	function textFunction$2(value) {
	  return function() {
	    var value1 = value(this);
	    this.textContent = value1 == null ? "" : value1;
	  };
	}

	function transition_text(value) {
	  return this.tween("text", typeof value === "function"
	      ? textFunction$2(tweenValue(this, "text", value))
	      : textConstant$2(value == null ? "" : value + ""));
	}

	function transition_transition() {
	  var name = this._name,
	      id0 = this._id,
	      id1 = newId();

	  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
	    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
	      if (node = group[i]) {
	        var inherit = get(node, id0);
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

	var id = 0;

	function Transition(groups, parents, name, id) {
	  this._groups = groups;
	  this._parents = parents;
	  this._name = name;
	  this._id = id;
	}

	function transition(name) {
	  return selection$1().transition(name);
	}

	function newId() {
	  return ++id;
	}

	var selection_prototype = selection$1.prototype;

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

	var tau = 2 * Math.PI;
	var amplitude = 1;
	var period = 0.3;
	var elasticIn = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticIn(t) {
	    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
	  }

	  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
	  elasticIn.period = function(p) { return custom(a, p); };

	  return elasticIn;
	})(amplitude, period);

	var elasticOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticOut(t) {
	    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
	  }

	  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
	  elasticOut.period = function(p) { return custom(a, p); };

	  return elasticOut;
	})(amplitude, period);

	var elasticInOut = (function custom(a, p) {
	  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

	  function elasticInOut(t) {
	    return ((t = t * 2 - 1) < 0
	        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
	        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
	  }

	  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
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

	function selection_transition(name) {
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
	}

	selection$1.prototype.interrupt = selection_interrupt;
	selection$1.prototype.transition = selection_transition;

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant$7(x) {
	  return function constant() {
	    return x;
	  };
	}

	var d3 = {
	  "select": d3Select,
	  "transition": transition
	};
	/**
	    The default height accessor function.
	    @private
	*/
	function imageHeight(d) {
	  return d.height;
	}

	/**
	    The default URL accessor function.
	    @private
	*/
	function imageUrl(d) {
	  return d.url;
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function imageWidth(d) {
	  return d.width;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function imageX(d) {
	  return d.x || 0;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function imageY(d) {
	  return d.y || 0;
	}

	/**
	    @function image
	    @desc Creates SVG images based on an array of data. If *data* is specified, immediately draws the images based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#image.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"url": "file.png", "width": "100", "height": "50"};
	@example <caption>passed to the generator</caption>
	image([data]);
	@example <caption>creates the following</caption>
	<image class="d3plus-shape-image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
	@example <caption>this is shorthand for the following</caption>
	image().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	image().data([data])(function() { alert("draw complete!"); })
	*/
	function image(data) {

	  if ( data === void 0 ) data = [];

	  var duration = 600,
	      height = imageHeight,
	      id = imageUrl,
	      select,
	      url = imageUrl,
	      width = imageWidth,
	      x = imageX,
	      y = imageY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function image(callback) {

	    if (select === void 0) image.select(d3.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());

	    var images = select.selectAll(".d3plus-shape-image").data(data, id);

	    var enter = images.enter().append("image")
	      .attr("class", "d3plus-shape-image")
	      .attr("opacity", 0);

	    var update = enter.merge(images);

	    update.attr("xlink:href", url)
	      .transition().duration(duration)
	        .attr("opacity", 1)
	        .attr("width", function (d, i) { return width(d, i); })
	        .attr("height", function (d, i) { return height(d, i); })
	        .attr("x", function (d, i) { return x(d, i); })
	        .attr("y", function (d, i) { return y(d, i); })
	        .each(function(d, i) {
	          var image = d3.select(this), link = url(d, i);
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

	    images.exit().transition().duration(duration)
	      .attr("width", function (d, i) { return width(d, i); })
	      .attr("height", function (d, i) { return height(d, i); })
	      .attr("x", function (d, i) { return x(d, i); })
	      .attr("y", function (d, i) { return y(d, i); })
	      .attr("opacity", 0).remove();

	    if (callback) setTimeout(callback, duration + 100);

	    return image;

	  }

	  /**
	      @memberof image
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  image.data = function(_) {
	    return arguments.length ? (data = _, image) : data;
	  };

	  /**
	      @memberof image
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  image.duration = function(_) {
	    return arguments.length ? (duration = _, image) : duration;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height;
	}
	  */
	  image.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant$7(_), image) : height;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.url;
	}
	  */
	  image.id = function(_) {
	    return arguments.length ? (id = _, image) : id;
	  };

	  /**
	      @memberof image
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
	  */
	  image.select = function(_) {
	    return arguments.length ? (select = d3.select(_), image) : select;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the URL accessor to the specified function and returns this generator. If *value* is not specified, returns the current URL accessor.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.url;
	}
	  */
	  image.url = function(_) {
	    return arguments.length ? (url = _, image) : url;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width;
	}
	  */
	  image.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant$7(_), image) : width;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x || 0;
	}
	  */
	  image.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$7(_), image) : x;
	  };

	  /**
	      @memberof image
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y || 0;
	}
	  */
	  image.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$7(_), image) : y;
	  };

	  return data.length ? image() : image;

	}

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant$8(x) {
	  return function constant() {
	    return x;
	  };
	}

	/**
	    @function stringify
	    @desc Coerces value into a String.
	    @param {String} value
	*/
	function stringify(value) {
	  if (value === void 0) value = "undefined";
	  else if (!(typeof value === "string" || value instanceof String)) value = JSON.stringify(value);
	  return value;
	}

	// scraped from http://www.fileformat.info/info/unicode/category/Mc/list.htm
	// and http://www.fileformat.info/info/unicode/category/Mn/list.htm
	// JSON.stringify([].slice.call(document.getElementsByClassName("table-list")[0].getElementsByTagName("tr")).filter(function(d){ return d.getElementsByTagName("a").length && d.getElementsByTagName("a")[0].innerHTML.length === 6; }).map(function(d){ return d.getElementsByTagName("a")[0].innerHTML.replace("U", "u").replace("+", ""); }).sort());
	var a = ["u0903", "u093B", "u093E", "u093F", "u0940", "u0949", "u094A", "u094B", "u094C", "u094E", "u094F", "u0982", "u0983", "u09BE", "u09BF", "u09C0", "u09C7", "u09C8", "u09CB", "u09CC", "u09D7", "u0A03", "u0A3E", "u0A3F", "u0A40", "u0A83", "u0ABE", "u0ABF", "u0AC0", "u0AC9", "u0ACB", "u0ACC", "u0B02", "u0B03", "u0B3E", "u0B40", "u0B47", "u0B48", "u0B4B", "u0B4C", "u0B57", "u0BBE", "u0BBF", "u0BC1", "u0BC2", "u0BC6", "u0BC7", "u0BC8", "u0BCA", "u0BCB", "u0BCC", "u0BD7", "u0C01", "u0C02", "u0C03", "u0C41", "u0C42", "u0C43", "u0C44", "u0C82", "u0C83", "u0CBE", "u0CC0", "u0CC1", "u0CC2", "u0CC3", "u0CC4", "u0CC7", "u0CC8", "u0CCA", "u0CCB", "u0CD5", "u0CD6", "u0D02", "u0D03", "u0D3E", "u0D3F", "u0D40", "u0D46", "u0D47", "u0D48", "u0D4A", "u0D4B", "u0D4C", "u0D57", "u0D82", "u0D83", "u0DCF", "u0DD0", "u0DD1", "u0DD8", "u0DD9", "u0DDA", "u0DDB", "u0DDC", "u0DDD", "u0DDE", "u0DDF", "u0DF2", "u0DF3", "u0F3E", "u0F3F", "u0F7F", "u102B", "u102C", "u1031", "u1038", "u103B", "u103C", "u1056", "u1057", "u1062", "u1063", "u1064", "u1067", "u1068", "u1069", "u106A", "u106B", "u106C", "u106D", "u1083", "u1084", "u1087", "u1088", "u1089", "u108A", "u108B", "u108C", "u108F", "u109A", "u109B", "u109C", "u17B6", "u17BE", "u17BF", "u17C0", "u17C1", "u17C2", "u17C3", "u17C4", "u17C5", "u17C7", "u17C8", "u1923", "u1924", "u1925", "u1926", "u1929", "u192A", "u192B", "u1930", "u1931", "u1933", "u1934", "u1935", "u1936", "u1937", "u1938", "u1A19", "u1A1A", "u1A55", "u1A57", "u1A61", "u1A63", "u1A64", "u1A6D", "u1A6E", "u1A6F", "u1A70", "u1A71", "u1A72", "u1B04", "u1B35", "u1B3B", "u1B3D", "u1B3E", "u1B3F", "u1B40", "u1B41", "u1B43", "u1B44", "u1B82", "u1BA1", "u1BA6", "u1BA7", "u1BAA", "u1BE7", "u1BEA", "u1BEB", "u1BEC", "u1BEE", "u1BF2", "u1BF3", "u1C24", "u1C25", "u1C26", "u1C27", "u1C28", "u1C29", "u1C2A", "u1C2B", "u1C34", "u1C35", "u1CE1", "u1CF2", "u1CF3", "u302E", "u302F", "uA823", "uA824", "uA827", "uA880", "uA881", "uA8B4", "uA8B5", "uA8B6", "uA8B7", "uA8B8", "uA8B9", "uA8BA", "uA8BB", "uA8BC", "uA8BD", "uA8BE", "uA8BF", "uA8C0", "uA8C1", "uA8C2", "uA8C3", "uA952", "uA953", "uA983", "uA9B4", "uA9B5", "uA9BA", "uA9BB", "uA9BD", "uA9BE", "uA9BF", "uA9C0", "uAA2F", "uAA30", "uAA33", "uAA34", "uAA4D", "uAA7B", "uAA7D", "uAAEB", "uAAEE", "uAAEF", "uAAF5", "uABE3", "uABE4", "uABE6", "uABE7", "uABE9", "uABEA", "uABEC"];
	var b = ["u0300", "u0301", "u0302", "u0303", "u0304", "u0305", "u0306", "u0307", "u0308", "u0309", "u030A", "u030B", "u030C", "u030D", "u030E", "u030F", "u0310", "u0311", "u0312", "u0313", "u0314", "u0315", "u0316", "u0317", "u0318", "u0319", "u031A", "u031B", "u031C", "u031D", "u031E", "u031F", "u0320", "u0321", "u0322", "u0323", "u0324", "u0325", "u0326", "u0327", "u0328", "u0329", "u032A", "u032B", "u032C", "u032D", "u032E", "u032F", "u0330", "u0331", "u0332", "u0333", "u0334", "u0335", "u0336", "u0337", "u0338", "u0339", "u033A", "u033B", "u033C", "u033D", "u033E", "u033F", "u0340", "u0341", "u0342", "u0343", "u0344", "u0345", "u0346", "u0347", "u0348", "u0349", "u034A", "u034B", "u034C", "u034D", "u034E", "u034F", "u0350", "u0351", "u0352", "u0353", "u0354", "u0355", "u0356", "u0357", "u0358", "u0359", "u035A", "u035B", "u035C", "u035D", "u035E", "u035F", "u0360", "u0361", "u0362", "u0363", "u0364", "u0365", "u0366", "u0367", "u0368", "u0369", "u036A", "u036B", "u036C", "u036D", "u036E", "u036F", "u0483", "u0484", "u0485", "u0486", "u0487", "u0591", "u0592", "u0593", "u0594", "u0595", "u0596", "u0597", "u0598", "u0599", "u059A", "u059B", "u059C", "u059D", "u059E", "u059F", "u05A0", "u05A1", "u05A2", "u05A3", "u05A4", "u05A5", "u05A6", "u05A7", "u05A8", "u05A9", "u05AA", "u05AB", "u05AC", "u05AD", "u05AE", "u05AF", "u05B0", "u05B1", "u05B2", "u05B3", "u05B4", "u05B5", "u05B6", "u05B7", "u05B8", "u05B9", "u05BA", "u05BB", "u05BC", "u05BD", "u05BF", "u05C1", "u05C2", "u05C4", "u05C5", "u05C7", "u0610", "u0611", "u0612", "u0613", "u0614", "u0615", "u0616", "u0617", "u0618", "u0619", "u061A", "u064B", "u064C", "u064D", "u064E", "u064F", "u0650", "u0651", "u0652", "u0653", "u0654", "u0655", "u0656", "u0657", "u0658", "u0659", "u065A", "u065B", "u065C", "u065D", "u065E", "u065F", "u0670", "u06D6", "u06D7", "u06D8", "u06D9", "u06DA", "u06DB", "u06DC", "u06DF", "u06E0", "u06E1", "u06E2", "u06E3", "u06E4", "u06E7", "u06E8", "u06EA", "u06EB", "u06EC", "u06ED", "u0711", "u0730", "u0731", "u0732", "u0733", "u0734", "u0735", "u0736", "u0737", "u0738", "u0739", "u073A", "u073B", "u073C", "u073D", "u073E", "u073F", "u0740", "u0741", "u0742", "u0743", "u0744", "u0745", "u0746", "u0747", "u0748", "u0749", "u074A", "u07A6", "u07A7", "u07A8", "u07A9", "u07AA", "u07AB", "u07AC", "u07AD", "u07AE", "u07AF", "u07B0", "u07EB", "u07EC", "u07ED", "u07EE", "u07EF", "u07F0", "u07F1", "u07F2", "u07F3", "u0816", "u0817", "u0818", "u0819", "u081B", "u081C", "u081D", "u081E", "u081F", "u0820", "u0821", "u0822", "u0823", "u0825", "u0826", "u0827", "u0829", "u082A", "u082B", "u082C", "u082D", "u0859", "u085A", "u085B", "u08E3", "u08E4", "u08E5", "u08E6", "u08E7", "u08E8", "u08E9", "u08EA", "u08EB", "u08EC", "u08ED", "u08EE", "u08EF", "u08F0", "u08F1", "u08F2", "u08F3", "u08F4", "u08F5", "u08F6", "u08F7", "u08F8", "u08F9", "u08FA", "u08FB", "u08FC", "u08FD", "u08FE", "u08FF", "u0900", "u0901", "u0902", "u093A", "u093C", "u0941", "u0942", "u0943", "u0944", "u0945", "u0946", "u0947", "u0948", "u094D", "u0951", "u0952", "u0953", "u0954", "u0955", "u0956", "u0957", "u0962", "u0963", "u0981", "u09BC", "u09C1", "u09C2", "u09C3", "u09C4", "u09CD", "u09E2", "u09E3", "u0A01", "u0A02", "u0A3C", "u0A41", "u0A42", "u0A47", "u0A48", "u0A4B", "u0A4C", "u0A4D", "u0A51", "u0A70", "u0A71", "u0A75", "u0A81", "u0A82", "u0ABC", "u0AC1", "u0AC2", "u0AC3", "u0AC4", "u0AC5", "u0AC7", "u0AC8", "u0ACD", "u0AE2", "u0AE3", "u0B01", "u0B3C", "u0B3F", "u0B41", "u0B42", "u0B43", "u0B44", "u0B4D", "u0B56", "u0B62", "u0B63", "u0B82", "u0BC0", "u0BCD", "u0C00", "u0C3E", "u0C3F", "u0C40", "u0C46", "u0C47", "u0C48", "u0C4A", "u0C4B", "u0C4C", "u0C4D", "u0C55", "u0C56", "u0C62", "u0C63", "u0C81", "u0CBC", "u0CBF", "u0CC6", "u0CCC", "u0CCD", "u0CE2", "u0CE3", "u0D01", "u0D41", "u0D42", "u0D43", "u0D44", "u0D4D", "u0D62", "u0D63", "u0DCA", "u0DD2", "u0DD3", "u0DD4", "u0DD6", "u0E31", "u0E34", "u0E35", "u0E36", "u0E37", "u0E38", "u0E39", "u0E3A", "u0E47", "u0E48", "u0E49", "u0E4A", "u0E4B", "u0E4C", "u0E4D", "u0E4E", "u0EB1", "u0EB4", "u0EB5", "u0EB6", "u0EB7", "u0EB8", "u0EB9", "u0EBB", "u0EBC", "u0EC8", "u0EC9", "u0ECA", "u0ECB", "u0ECC", "u0ECD", "u0F18", "u0F19", "u0F35", "u0F37", "u0F39", "u0F71", "u0F72", "u0F73", "u0F74", "u0F75", "u0F76", "u0F77", "u0F78", "u0F79", "u0F7A", "u0F7B", "u0F7C", "u0F7D", "u0F7E", "u0F80", "u0F81", "u0F82", "u0F83", "u0F84", "u0F86", "u0F87", "u0F8D", "u0F8E", "u0F8F", "u0F90", "u0F91", "u0F92", "u0F93", "u0F94", "u0F95", "u0F96", "u0F97", "u0F99", "u0F9A", "u0F9B", "u0F9C", "u0F9D", "u0F9E", "u0F9F", "u0FA0", "u0FA1", "u0FA2", "u0FA3", "u0FA4", "u0FA5", "u0FA6", "u0FA7", "u0FA8", "u0FA9", "u0FAA", "u0FAB", "u0FAC", "u0FAD", "u0FAE", "u0FAF", "u0FB0", "u0FB1", "u0FB2", "u0FB3", "u0FB4", "u0FB5", "u0FB6", "u0FB7", "u0FB8", "u0FB9", "u0FBA", "u0FBB", "u0FBC", "u0FC6", "u102D", "u102E", "u102F", "u1030", "u1032", "u1033", "u1034", "u1035", "u1036", "u1037", "u1039", "u103A", "u103D", "u103E", "u1058", "u1059", "u105E", "u105F", "u1060", "u1071", "u1072", "u1073", "u1074", "u1082", "u1085", "u1086", "u108D", "u109D", "u135D", "u135E", "u135F", "u1712", "u1713", "u1714", "u1732", "u1733", "u1734", "u1752", "u1753", "u1772", "u1773", "u17B4", "u17B5", "u17B7", "u17B8", "u17B9", "u17BA", "u17BB", "u17BC", "u17BD", "u17C6", "u17C9", "u17CA", "u17CB", "u17CC", "u17CD", "u17CE", "u17CF", "u17D0", "u17D1", "u17D2", "u17D3", "u17DD", "u180B", "u180C", "u180D", "u18A9", "u1920", "u1921", "u1922", "u1927", "u1928", "u1932", "u1939", "u193A", "u193B", "u1A17", "u1A18", "u1A1B", "u1A56", "u1A58", "u1A59", "u1A5A", "u1A5B", "u1A5C", "u1A5D", "u1A5E", "u1A60", "u1A62", "u1A65", "u1A66", "u1A67", "u1A68", "u1A69", "u1A6A", "u1A6B", "u1A6C", "u1A73", "u1A74", "u1A75", "u1A76", "u1A77", "u1A78", "u1A79", "u1A7A", "u1A7B", "u1A7C", "u1A7F", "u1AB0", "u1AB1", "u1AB2", "u1AB3", "u1AB4", "u1AB5", "u1AB6", "u1AB7", "u1AB8", "u1AB9", "u1ABA", "u1ABB", "u1ABC", "u1ABD", "u1B00", "u1B01", "u1B02", "u1B03", "u1B34", "u1B36", "u1B37", "u1B38", "u1B39", "u1B3A", "u1B3C", "u1B42", "u1B6B", "u1B6C", "u1B6D", "u1B6E", "u1B6F", "u1B70", "u1B71", "u1B72", "u1B73", "u1B80", "u1B81", "u1BA2", "u1BA3", "u1BA4", "u1BA5", "u1BA8", "u1BA9", "u1BAB", "u1BAC", "u1BAD", "u1BE6", "u1BE8", "u1BE9", "u1BED", "u1BEF", "u1BF0", "u1BF1", "u1C2C", "u1C2D", "u1C2E", "u1C2F", "u1C30", "u1C31", "u1C32", "u1C33", "u1C36", "u1C37", "u1CD0", "u1CD1", "u1CD2", "u1CD4", "u1CD5", "u1CD6", "u1CD7", "u1CD8", "u1CD9", "u1CDA", "u1CDB", "u1CDC", "u1CDD", "u1CDE", "u1CDF", "u1CE0", "u1CE2", "u1CE3", "u1CE4", "u1CE5", "u1CE6", "u1CE7", "u1CE8", "u1CED", "u1CF4", "u1CF8", "u1CF9", "u1DC0", "u1DC1", "u1DC2", "u1DC3", "u1DC4", "u1DC5", "u1DC6", "u1DC7", "u1DC8", "u1DC9", "u1DCA", "u1DCB", "u1DCC", "u1DCD", "u1DCE", "u1DCF", "u1DD0", "u1DD1", "u1DD2", "u1DD3", "u1DD4", "u1DD5", "u1DD6", "u1DD7", "u1DD8", "u1DD9", "u1DDA", "u1DDB", "u1DDC", "u1DDD", "u1DDE", "u1DDF", "u1DE0", "u1DE1", "u1DE2", "u1DE3", "u1DE4", "u1DE5", "u1DE6", "u1DE7", "u1DE8", "u1DE9", "u1DEA", "u1DEB", "u1DEC", "u1DED", "u1DEE", "u1DEF", "u1DF0", "u1DF1", "u1DF2", "u1DF3", "u1DF4", "u1DF5", "u1DFC", "u1DFD", "u1DFE", "u1DFF", "u20D0", "u20D1", "u20D2", "u20D3", "u20D4", "u20D5", "u20D6", "u20D7", "u20D8", "u20D9", "u20DA", "u20DB", "u20DC", "u20E1", "u20E5", "u20E6", "u20E7", "u20E8", "u20E9", "u20EA", "u20EB", "u20EC", "u20ED", "u20EE", "u20EF", "u20F0", "u2CEF", "u2CF0", "u2CF1", "u2D7F", "u2DE0", "u2DE1", "u2DE2", "u2DE3", "u2DE4", "u2DE5", "u2DE6", "u2DE7", "u2DE8", "u2DE9", "u2DEA", "u2DEB", "u2DEC", "u2DED", "u2DEE", "u2DEF", "u2DF0", "u2DF1", "u2DF2", "u2DF3", "u2DF4", "u2DF5", "u2DF6", "u2DF7", "u2DF8", "u2DF9", "u2DFA", "u2DFB", "u2DFC", "u2DFD", "u2DFE", "u2DFF", "u302A", "u302B", "u302C", "u302D", "u3099", "u309A", "uA66F", "uA674", "uA675", "uA676", "uA677", "uA678", "uA679", "uA67A", "uA67B", "uA67C", "uA67D", "uA69E", "uA69F", "uA6F0", "uA6F1", "uA802", "uA806", "uA80B", "uA825", "uA826", "uA8C4", "uA8E0", "uA8E1", "uA8E2", "uA8E3", "uA8E4", "uA8E5", "uA8E6", "uA8E7", "uA8E8", "uA8E9", "uA8EA", "uA8EB", "uA8EC", "uA8ED", "uA8EE", "uA8EF", "uA8F0", "uA8F1", "uA926", "uA927", "uA928", "uA929", "uA92A", "uA92B", "uA92C", "uA92D", "uA947", "uA948", "uA949", "uA94A", "uA94B", "uA94C", "uA94D", "uA94E", "uA94F", "uA950", "uA951", "uA980", "uA981", "uA982", "uA9B3", "uA9B6", "uA9B7", "uA9B8", "uA9B9", "uA9BC", "uA9E5", "uAA29", "uAA2A", "uAA2B", "uAA2C", "uAA2D", "uAA2E", "uAA31", "uAA32", "uAA35", "uAA36", "uAA43", "uAA4C", "uAA7C", "uAAB0", "uAAB2", "uAAB3", "uAAB4", "uAAB7", "uAAB8", "uAABE", "uAABF", "uAAC1", "uAAEC", "uAAED", "uAAF6", "uABE5", "uABE8", "uABED", "uFB1E", "uFE00", "uFE01", "uFE02", "uFE03", "uFE04", "uFE05", "uFE06", "uFE07", "uFE08", "uFE09", "uFE0A", "uFE0B", "uFE0C", "uFE0D", "uFE0E", "uFE0F", "uFE20", "uFE21", "uFE22", "uFE23", "uFE24", "uFE25", "uFE26", "uFE27", "uFE28", "uFE29", "uFE2A", "uFE2B", "uFE2C", "uFE2D", "uFE2E", "uFE2F"];
	var combiningMarks = a.concat(b);

	var splitChars = ["-",  "/",  ";",  ":",  "&",
	                    "u0E2F",  // thai character pairannoi
	                    "u0EAF",  // lao ellipsis
	                    "u0ECC",  // lao cancellation mark
	                    "u0EC6",  // lao ko la (word repetition)
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
	                    "uFF5E"  // wave dash
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
	var japaneseRange = "\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u3400-\u4dbf";
	var chineseRange = "\u3400-\u9FBF";
	var laoRange = "\u0E80-\u0EFF";

	var noSpaceRange = burmeseRange + chineseRange + laoRange;

	var splitWords = new RegExp(("[^\\s|\\" + (splitChars.join("|\\")) + "]+(\\" + (splitChars.join("|\\")) + ")*"), "g");
	var japaneseChars = new RegExp(("[" + japaneseRange + "]"));
	var noSpaceLanguage = new RegExp(("[" + noSpaceRange + "]"));
	var splitAllChars = new RegExp(("(\\" + (prefixChars.join("|\\")) + ")*[" + noSpaceRange + "]|[a-z0-9]+(\\" + (suffixChars.join("|\\")) + "|\\" + (combiningMarks.join("|\\")) + ")*"), "gi");

	/**
	    @function width
	    @desc Splits a given sentence into an array of words.
	    @param {String} sentence
	*/
	function defaultSplit(sentence) {
	  if (!noSpaceLanguage.test(sentence)) return stringify(sentence).match(splitWords);
	  return merge(stringify(sentence).match(splitWords).map(function (d) {
	    if (!japaneseChars.test(d) && noSpaceLanguage.test(d)) return d.match(splitAllChars);
	    return [d];
	  }));
	}

	/**
	    @function width
	    @desc Given a text string, returns the predicted pixel width of the string when placed into DOM.
	    @param {String|Array} text Can be either a single string or an array of strings to analyze.
	    @param {Object} [style] An object of CSS font styles to apply. Accepts any of the valid [CSS font property](http://www.w3schools.com/cssref/pr_font_font.asp) values.
	*/
	function measureText(text, style) {

	  if ( style === void 0 ) style = {"font-size": 10, "font-family": "sans-serif"};

	  var context = document.createElement("canvas").getContext("2d");

	  var font = [];
	  if ("font-style" in style) font.push(style["font-style"]);
	  if ("font-variant" in style) font.push(style["font-variant"]);
	  if ("font-weight" in style) font.push(style["font-weight"]);
	  if ("font-size" in style) {
	    var s = (style["font-size"]) + "px";
	    if ("line-height" in style) s += "/" + (style["line-height"]) + "px";
	    font.push(s);
	  }
	  if ("font-family" in style) font.push(style["font-family"]);

	  context.font = font.join(" ");

	  if (text instanceof Array) return text.map(function (t) { return context.measureText(t).width; });
	  return context.measureText(text).width;

	}

	/**
	    @function wrap
	    @desc Based on the defined styles and dimensions, breaks a string into an array of strings for each line of text.
	*/
	function wrap() {

	  var fontFamily = "sans-serif",
	      fontSize = 10,
	      height = 200,
	      lineHeight,
	      overflow = false,
	      split = defaultSplit,
	      width = 200;

	  /**
	      The inner return object and wraps the text and returns the line data array.
	      @private
	  */
	  function wrap(sentence) {

	    sentence = stringify(sentence);

	    if (lineHeight === void 0) lineHeight = Math.ceil(fontSize * 1.1);

	    var words = split(sentence);

	    var style = {
	      "font-family": fontFamily,
	      "font-size": fontSize,
	      "line-height": lineHeight
	    };

	    var line = 1,
	        textProg = "",
	        truncated = false,
	        widthProg = 0;

	    var lineData = [""],
	          sizes = measureText(words, style),
	          space = measureText(" ", style);

	    for (var i = 0; i < words.length; i++) {
	      var word = words[i];
	      var nextChar = sentence.charAt(textProg.length + word.length),
	            wordWidth = sizes[words.indexOf(word)];
	      if (nextChar === " ") word += nextChar;
	      if (widthProg + wordWidth > width - fontSize) {
	        lineData[line - 1] = lineData[line - 1].trimRight();
	        line++;
	        if (lineHeight * line > height || wordWidth > width && !overflow) {
	          truncated = true;
	          break;
	        }
	        widthProg = 0;
	        lineData.push(word);
	      }
	      else lineData[line - 1] += word;
	      textProg += word;
	      widthProg += wordWidth;
	      if (nextChar === " ") widthProg += space;
	    }

	    return {
	      "lines": lineData,
	      sentence: sentence, truncated: truncated, words: words
	    };

	  }

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family.
	      @param {Function|String} [*value*]
	  */
	  wrap.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = _, wrap) : fontFamily;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size.
	      @param {Function|Number} [*value*]
	  */
	  wrap.fontSize = function(_) {
	    return arguments.length ? (fontSize = _, wrap) : fontSize;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets height limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
	      @param {Number} [*value* = 200]
	  */
	  wrap.height = function(_) {
	    return arguments.length ? (height = _, wrap) : height;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#wrap.fontSize) by default.
	      @param {Function|Number} [*value*]
	  */
	  wrap.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = _, wrap) : lineHeight;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the overflow to the specified boolean and returns this generator. If *value* is not specified, returns the current overflow value.
	      @param {Boolean} [*value* = false]
	  */
	  wrap.overflow = function(_) {
	    return arguments.length ? (overflow = _, wrap) : overflow;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
	      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
	  */
	  wrap.split = function(_) {
	    return arguments.length ? (split = _, wrap) : split;
	  };

	  /**
	      @memberof wrap
	      @desc If *value* is specified, sets width limit to the specified value and returns this generator. If *value* is not specified, returns the current value.
	      @param {Number} [*value* = 200]
	  */
	  wrap.width = function(_) {
	    return arguments.length ? (width = _, wrap) : width;
	  };

	  return wrap;

	}

	var d3$2 = {
	  "max": max,
	  "min": d3Min,
	  "select": d3Select,
	  "sum": sum,
	  "transition": transition
	};

	/**
	    The default height accessor function.
	    @private
	*/
	function boxHeight(d) {
	  return d.height || 200;
	}

	/**
	    The default id accessor function.
	    @private
	*/
	function boxId(d, i) {
	  return d.id || ("" + i);
	}

	/**
	    The default text accessor function.
	    @private
	*/
	function boxText(d) {
	  return d.text;
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function boxWidth(d) {
	  return d.width || 200;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function boxX(d) {
	  return d.x || 0;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function boxY(d) {
	  return d.y || 0;
	}


	/**
	    @function box
	    @desc Creates a wrapped text box based on an array of data. If *data* is specified, immediately wraps the text based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#box.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"text": "Hello D3plus, please wrap this sentence for me."};
	@example <caption>passed to the generator</caption>
	box([data]);
	@example <caption>creates the following</caption>
	<text class="d3plus-text-box" id="d3plus-text-box-0" text-anchor="start" font-family="Helvetica Neue" font-size="16px" transform="translate(0,-3.6)">
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    Hello D3plus, please wrap
	  </tspan>
	  <tspan dominant-baseline="alphabetic" opacity="1" x="0px" dx="0px" dy="18px" style="baseline-shift: 0%;">
	    this sentence for me.
	  </tspan>
	</text>
	@example <caption>this is shorthand for the following</caption>
	box().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	box().data([data])(function() { alert("draw complete!"); })
	*/
	function box(data) {

	  /**
	      The default ellipsis function.
	      @private
	  */
	  if ( data === void 0 ) data = [];

	  function boxEllipsis(_) {
	    return (_ + "...");
	  }

	  var delay = 0,
	      duration = 0,
	      ellipsis = boxEllipsis,
	      fontColor,
	      fontFamily = constant$8("sans-serif"),
	      fontMax = constant$8(50),
	      fontMin = constant$8(8),
	      fontResize = constant$8(false),
	      fontSize = constant$8(10),
	      height = boxHeight,
	      id = boxId,
	      lineHeight,
	      overflow = constant$8(false),
	      select,
	      split = defaultSplit,
	      text = boxText,
	      textAnchor = constant$8("start"),
	      verticalAlign = constant$8("top"),
	      width = boxWidth,
	      x = boxX,
	      y = boxY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function box(callback) {

	    if (select === void 0) box.select(d3$2.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    var boxes = select.selectAll(".d3plus-text-box").data(data, id);

	    boxes.exit().transition().delay(duration).remove();

	    boxes.exit().selectAll("tspan").transition().duration(duration)
	      .attr("opacity", 0);

	    boxes.enter().append("text")
	        .attr("class", "d3plus-text-box")
	        .attr("id", function (d, i) { return ("d3plus-text-box-" + (id(d, i))); })
	      .merge(boxes)
	        .attr("y", function (d, i) { return ((y(d, i)) + "px"); })
	        .attr("fill", function (d, i) { return fontColor(d, i); })
	        .attr("text-anchor", function (d, i) { return textAnchor(d, i); })
	        .attr("font-family", function (d, i) { return fontFamily(d, i); })
	        .each(function(d, i) {

	          var resize = fontResize(d, i);

	          var fS = resize ? fontMax(d, i) : fontSize(d, i),
	              lH = resize ? fS * 1.1 : lineHeight(d, i),
	              line = 1,
	              lineData = [""],
	              sizes;

	          var style = {
	            "font-family": fontFamily(d, i),
	            "font-size": fS,
	            "line-height": lH
	          };

	          var fMax = fontMax(d, i),
	                fMin = fontMin(d, i),
	                h = height(d, i),
	                t = text(d, i),
	                tA = textAnchor(d, i),
	                vA = verticalAlign(d, i),
	                w = width(d, i),
	                words = split(t, i);

	          var dx = tA === "start" ? 0 : tA === "end" ? w : w / 2;

	          var wrapper = wrap()
	            .fontFamily(style["font-family"])
	            .fontSize(fS)
	            .lineHeight(lH)
	            .height(h)
	            .overflow(overflow(d, i))
	            .width(w);

	          /**
	              Figures out the lineData to be used for wrapping.
	              @private
	          */
	          function checkSize() {

	            if (fS < fMin) {
	              lineData = [];
	              return;
	            }
	            else if (fS > fMax) fS = fMax;

	            if (resize) {
	              lH = fS * 1.1;
	              wrapper
	                .fontSize(fS)
	                .lineHeight(lH);
	              style["font-size"] = fS;
	              style["line-height"] = lH;
	            }

	            var wrapResults = wrapper(t);
	            lineData = wrapResults.lines;
	            line = lineData.length + 1;

	            if (wrapResults.truncated)

	              if (resize) {
	                fS--;
	                if (fS < fMin) lineData = [];
	                else checkSize();
	              }
	              else if (line === 2 && !lineData[line - 2].length) lineData = [];
	              else lineData[line - 2] = ellipsis(lineData[line - 2]);


	          }

	          if (h > lH || resize) {

	            if (resize) {

	              sizes = measureText(words, style);

	              var areaMod = 1.165 + w / h * 0.1,
	                    boxArea = w * h,
	                    maxWidth = d3$2.max(sizes),
	                    textArea = d3$2.sum(sizes, function (d) { return d * lH; }) * areaMod;

	              if (maxWidth > w || textArea > boxArea) {
	                var areaRatio = Math.sqrt(boxArea / textArea),
	                      widthRatio = w / maxWidth;
	                var sizeRatio = d3$2.min([areaRatio, widthRatio]);
	                fS = Math.floor(fS * sizeRatio);
	              }

	              var heightMax = Math.floor(h * 0.8);
	              if (fS > heightMax) fS = heightMax;

	            }

	            checkSize();

	            d3$2.select(this)
	              .attr("font-size", (fS + "px"))
	              .style("font-size", (fS + "px"));

	          }

	          var tB = d3$2.select(this),
	                tH = line * lH;
	          var y = vA === "top" ? 0 : vA === "middle" ? h / 2 - tH / 2 : h - tH;
	          y -= lH * 0.2;

	          if (tB.attr("transform") === null) tB.attr("transform", ("translate(0," + y + ")"));
	          else tB.transition().duration(duration).attr("transform", ("translate(0," + y + ")"));

	          /**
	              Styles to apply to each <tspan> element.
	              @private
	          */
	          function tspanStyle(tspan) {
	            tspan
	              .text(function (d) { return d.trimRight(); })
	              .attr("x", ((x(d, i)) + "px"))
	              .attr("dx", (dx + "px"))
	              .attr("dy", (lH + "px"));
	          }

	          var tspans = d3$2.select(this).selectAll("tspan").data(lineData);

	          tspans.transition().duration(duration).call(tspanStyle);

	          tspans.exit().transition().duration(duration)
	            .attr("opacity", 0).remove();

	          tspans.enter().append("tspan")
	            .attr("dominant-baseline", "alphabetic")
	            .style("baseline-shift", "0%")
	            .attr("opacity", 0)
	            .call(tspanStyle)
	            .transition().duration(duration).delay(delay)
	              .attr("opacity", 1);

	        });

	    if (callback) setTimeout(callback, duration + 100);

	    return box;

	  }

	  /**
	      @memberof box
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A text box will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  box.data = function(_) {
	    return arguments.length ? (data = _, box) : data;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation delay to the specified number and returns this generator. If *value* is not specified, returns the current animation delay.
	      @param {Number} [*value* = 0]
	  */
	  box.delay = function(_) {
	    return arguments.length ? (delay = _, box) : delay;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the animation duration to the specified number and returns this generator. If *value* is not specified, returns the current animation duration.
	      @param {Number} [*value* = 0]
	  */
	  box.duration = function(_) {
	    return arguments.length ? (duration = _, box) : duration;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the ellipsis method to the specified function or string and returns this generator. If *value* is not specified, returns the current ellipsis method, which simply adds an ellipsis to the string by default.
	      @param {Function|String} [*value*]
	      @example
	function(d) {
	  return d + "...";
	}
	  */
	  box.ellipsis = function(_) {
	    return arguments.length ? (ellipsis = typeof _ === "function" ? _ : constant$8(_), box) : ellipsis;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font color accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant$8(_), box) : fontColor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font family accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|String} [*value*]
	  */
	  box.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant$8(_), box) : fontFamily;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the maximum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current maximum font size accessor. The maximum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 50]
	  */
	  box.fontMax = function(_) {
	    return arguments.length ? (fontMax = typeof _ === "function" ? _ : constant$8(_), box) : fontMax;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the minimum font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current minimum font size accessor. The minimum font size is used when [resizing fonts](#box.fontResize) dynamically.
	      @param {Function|Number} [*value* = 8]
	  */
	  box.fontMin = function(_) {
	    return arguments.length ? (fontMin = typeof _ === "function" ? _ : constant$8(_), box) : fontMin;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant$8(_), box) : fontResize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the font size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current font size accessor, which is inferred from the [container element](#box.select) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant$8(_), box) : fontSize;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height || 200;
	}
	  */
	  box.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant$8(_), box) : height;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the id accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d, i) {
	  return d.id || i + "";
	}
	  */
	  box.id = function(_) {
	    return arguments.length ? (id = typeof _ === "function" ? _ : constant$8(_), box) : id;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the line height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current line height accessor, which is 1.1 times the [font size](#box.fontSize) by default.
	      @param {Function|Number} [*value*]
	  */
	  box.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant$8(_), box) : lineHeight;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the overflow accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current overflow accessor.
	      @param {Function|Boolean} [*value* = false]
	  */
	  box.overflow = function(_) {
	    return arguments.length ? (overflow = typeof _ === "function" ? _ : constant$8(_), box) : overflow;
	  };

	  /**
	      @memberof box
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which adds an SVG element to the page by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  box.select = function(_) {
	    if (arguments.length) {
	      select = d3$2.select(_);
	      if (fontColor === void 0) box.fontColor(select.style("font-color"));
	      if (fontFamily === void 0) box.fontFamily(select.style("font-family"));
	      if (fontSize === void 0) box.fontSize(parseFloat(select.style("font-size"), 10));
	      return box;
	    }
	    return select;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the word split function to the specified function and returns this generator. If *value* is not specified, returns the current word split function.
	      @param {Function} [*value*] A function that, when passed a string, is expected to return that string split into an array of words to wrap. The default split function splits strings on the following characters: `-`, `/`, `;`, `:`, `&`
	  */
	  box.split = function(_) {
	    return arguments.length ? (split = _, box) : split;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the text accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor.
	      @param {Function|String} [*value*]
	      @example
	function(d) {
	  return d.text;
	}
	  */
	  box.text = function(_) {
	    return arguments.length ? (text = typeof _ === "function" ? _ : constant$8(_), box) : text;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the horizontal text anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current horizontal text anchor accessor.
	      @param {Function|String} [*value* = "start"] Analagous to the SVG [text-anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) property.
	  */
	  box.textAnchor = function(_) {
	    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : constant$8(_), box) : textAnchor;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor.
	      @param {Function|String} [*value* = "top"] Accepts `"top"`, `"middle"`, and `"bottom"`.
	  */
	  box.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : constant$8(_), box) : verticalAlign;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width || 200;
	}
	  */
	  box.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant$8(_), box) : width;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the left position of the box.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x || 0;
	}
	  */
	  box.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$8(_), box) : x;
	  };

	  /**
	      @memberof box
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the top position of the box.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y || 0;
	}
	  */
	  box.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$8(_), box) : y;
	  };

	  return data.length ? box() : box;

	}

	var d3$1 = {
	  "select": d3Select,
	  "transition": transition
	};

	/**
	    The default height accessor function.
	    @private
	*/
	function rectHeight(d) {
	  return d.height;
	}

	/**
	    The default id accessor function.
	    @private
	*/
	function rectId(d) {
	  return d.id;
	}

	/**
	    The default inner bounds function.
	    @private
	*/
	function rectInnerBounds(s) {
	  return {"width": s.width, "height": s.height, "x": -s.width / 2, "y": -s.height / 2};
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function rectWidth(d) {
	  return d.width;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function rectX(d) {
	  return d.x;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function rectY(d) {
	  return d.y;
	}

	/**
	    @function rect
	    @desc Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample row of data</caption>
	var data = {"id": 0, "x": 100, "y": 50, "width": 200, "height": 100};
	@example <caption>passed to the generator</caption>
	rect([data]);
	@example <caption>creates the following</caption>
	<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
	  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
	</g>
	@example <caption>this is shorthand for the following</caption>
	rect().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	rect().data([data])(function() { alert("draw complete!"); })
	*/
	function rect(data) {

	  /**
	      The default font-color accessor function.
	      @private
	  */
	  if ( data === void 0 ) data = [];

	  function rectFontColor(d, i) {
	    return contrast(fill(d, i));
	  }

	  var on = {};

	  var backgroundImage = constant$7(false),
	      duration = 600,
	      fill = constant$7("black"),
	      fontColor = rectFontColor,
	      fontFamily,
	      fontResize = constant$7(false),
	      fontSize,
	      height = rectHeight,
	      id = rectId,
	      innerBounds = rectInnerBounds,
	      label = constant$7(false),
	      labelPadding = constant$7(5),
	      lineHeight,
	      select,
	      stroke = constant$7("black"),
	      strokeWidth = constant$7(0),
	      textAnchor = constant$7("start"),
	      verticalAlign = constant$7("top"),
	      width = rectWidth,
	      x = rectX,
	      y = rectY;

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function rect(callback) {

	    if (select === void 0) rect.select(d3$1.select("body").append("svg").style("width", ((window.innerWidth) + "px")).style("height", ((window.innerHeight) + "px")).style("display", "block").node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    /**
	        Sets styles for both entering and updating rectangles.
	        @private
	    */
	    function rectStyle(r, show) {
	      if (show === void 0) show = true;

	      r
	        .attr("width", show ? function (d, i) { return width(d, i); } : 0)
	        .attr("height", show ? function (d, i) { return height(d, i); } : 0)
	        .attr("x", show ? function (d, i) { return -width(d, i) / 2; } : 0)
	        .attr("y", show ? function (d, i) { return -height(d, i) / 2; } : 0)
	        .attr("fill", function (d, i) { return fill(d, i); })
	        .attr("stroke", function (d, i) { return stroke(d, i); })
	        .attr("stroke-width", function (d, i) { return strokeWidth(d, i); });
	    }

	    /**
	        Updates inner contents of all rectangles.
	        @private
	    */
	    function contents(g, show) {
	      if (show === void 0) show = true;

	      g.each(function(d, i) {

	        var h = height(d, i),
	              w = width(d, i);

	        /* Draws background image */
	        var imageUrl = show ? backgroundImage(d, i) : false;
	        image()
	          .data(imageUrl ? [{"url": imageUrl}] : [])
	          .duration(duration)
	          .height(show ? h : 0)
	          .select(this)
	          .width(show ? w : 0)
	          .x(show ? -w / 2 : 0)
	          .y(show ? -h / 2 : 0)
	          ();

	        /* Draws label based on inner bounds */
	        var labelData = [],
	              labelText = show ? label(d, i) : false;

	        if (labelText) {
	          var bounds = innerBounds({"width": w, "height": h}, i),
	                padding = labelPadding(d, i);

	          bounds.height -= padding * 2;
	          bounds.width -= padding * 2;
	          bounds.x += padding;
	          bounds.y += padding;
	          labelData.push(bounds);
	        }

	        box()
	          .data(labelData)
	          .delay(duration / 2)
	          .duration(duration)
	          .fontColor(fontColor(d, i))
	          .fontFamily(fontFamily(d, i))
	          .fontResize(fontResize(d, i))
	          .fontSize(fontSize(d, i))
	          .lineHeight(lineHeight(d, i))
	          .textAnchor(textAnchor(d, i))
	          .verticalAlign(verticalAlign(d, i))
	          .select(this)
	          .text(label(d, i))
	          ();

	      });

	    }

	    var groups = select.selectAll(".d3plus-shape-rect").data(data, id);

	    groups.transition().duration(duration)
	      .attr("transform", function (d, i) { return ("translate(" + (x(d, i)) + "," + (y(d, i)) + ")"); });

	    groups.exit().transition().delay(duration).remove();

	    groups.exit().selectAll("rect").transition().duration(duration)
	      .attr("width", 0)
	      .attr("height", 0)
	      .attr("x", 0)
	      .attr("y", 0);

	    groups.exit().call(contents, false);

	    var enter = groups.enter().append("g")
	        .attr("class", "d3plus-shape-rect")
	        .attr("id", function (d, i) { return ("d3plus-shape-rect-" + (id(d, i))); })
	        .attr("transform", function (d, i) { return ("translate(" + (x(d, i)) + "," + (y(d, i)) + ")"); });

	    enter.append("rect")
	      .call(rectStyle, false);

	    var update = enter.merge(groups);

	    update.selectAll("rect").transition().duration(duration)
	      .call(rectStyle);

	    update.call(contents);

	    var events = Object.keys(on);
	    for (var e = 0; e < events.length; e++) update.on(events[e], on[events[e]]);

	    if (callback) setTimeout(callback, duration + 100);

	    return rect;

	  }

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background-image accessor.
	      @param {Function|String} [*value* = false]
	  */
	  rect.backgroundImage = function(_) {
	    return arguments.length ? (backgroundImage = typeof _ === "function" ? _ : constant$7(_), rect) : backgroundImage;
	  };

	  /**
	      @memberof rect
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  rect.data = function(_) {
	    return arguments.length ? (data = _, rect) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  rect.duration = function(_) {
	    return arguments.length ? (duration = _, rect) : duration;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.fill = function(_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : constant$7(_), rect) : fill;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  rect.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant$7(_), rect) : fontColor;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant$7(_), rect) : fontFamily;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#rect.label) will be resized the best fit the rectangle.
	      @param {Function|Boolean} [*value*]
	  */
	  rect.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant$7(_), rect) : fontResize;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant$7(_), rect) : fontSize;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height;
	}
	  */
	  rect.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant$7(_), rect) : height;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.id;
	}
	  */
	  rect.id = function(_) {
	    return arguments.length ? (id = _, rect) : id;
	  };

	  /**
	      @memberof rect
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	function(shape) {
	  return {
	    "width": shape.width,
	    "height": shape.height,
	    "x": -shape.width / 2,
	    "y": -shape.height / 2
	  };
	}
	      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  rect.innerBounds = function(_) {
	    return arguments.length ? (innerBounds = _, rect) : innerBounds;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  rect.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant$7(_), rect) : label;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding.
	      @param {Number} [*value* = 10]
	  */
	  rect.labelPadding = function(_) {
	    return arguments.length ? (labelPadding = typeof _ === "function" ? _ : constant$7(_), rect) : labelPadding;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor.
	      @param {Function|String} [*value*]
	  */
	  rect.lineHeight = function(_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant$7(_), rect) : lineHeight;
	  };

	  /**
	      @memberof rect
	      @desc Adds or removes a *listener* to each rectangle for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
	      @param {String} [*typenames*]
	      @param {Function} [*listener*]
	  */
	  rect.on = function(typenames, listener) {
	    return arguments.length === 2 ? (on[typenames] = listener, rect) : arguments.length ? on[typenames] : on;
	  };

	  /**
	      @memberof rect
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
	  */
	  rect.select = function(_) {
	    if (arguments.length) {
	      select = d3$1.select(_);
	      if (fontFamily === void 0) fontFamily = constant$7(select.style("font-family"));
	      if (fontSize === void 0) fontSize = constant$7(parseFloat(select.style("font-size"), 10));
	      return rect;
	    }
	    return select;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.stroke = function(_) {
	    return arguments.length ? (stroke = typeof _ === "function" ? _ : constant$7(_), rect) : stroke;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke-width accessor.
	      @param {Function|Number} [*value* = 0]
	  */
	  rect.strokeWidth = function(_) {
	    return arguments.length ? (strokeWidth = typeof _ === "function" ? _ : constant$7(_), rect) : strokeWidth;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`.
	      @param {Function|String} [*value* = "start"]
	  */
	  rect.textAnchor = function(_) {
	    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : constant$7(_), rect) : textAnchor;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`.
	      @param {Function|String} [*value* = "start"]
	  */
	  rect.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : constant$7(_), rect) : verticalAlign;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width;
	}
	  */
	  rect.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant$7(_), rect) : width;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x;
	}
	  */
	  rect.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$7(_), rect) : x;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y;
	}
	  */
	  rect.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$7(_), rect) : y;
	  };

	  return data.length ? rect() : rect;

	}

	/**
	    @function shape
	    @desc Creates an SVG shape legend based on an array of data. If *data* is specified, immediately draws based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.
	    @param {Array} [data = []]
	    @example <caption>a sample dataset</caption>
	var data = [
	  {"id": 0, "color": "brickred"},
	  {"id": 1, "color": "cornflowerblue"}
	];
	@example <caption>passed to the generator</caption>
	shape([data]);
	@example <caption>creates the following</caption>
	<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
	  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
	</g>
	@example <caption>this is shorthand for the following</caption>
	shape().data([data])();
	@example <caption>which also allows a post-draw callback function</caption>
	shape().data([data])(function() { alert("draw complete!"); })
	*/
	function shapeLegend(data) {

	  /**
	      The default y accessor function.
	      @private
	  */
	  if ( data === void 0 ) data = [];

	  function shapeLabelBounds(s, i) {
	    var d = lineData[i];
	    return {"width": d.width, "height": d.height, "x": s.width / 2 + padding, "y": 1 - d.height / 2};
	  }

	  /**
	      The default x accessor function.
	      @private
	  */
	  function shapeX(d, i) {
	    if (orient === "vertical") return outerBounds.x + size(d, i) / 2;
	    else return outerBounds.x + sum(data.slice(0, i).map(function (b, i) { return size(b, i); })) +
	                sum(lineData.slice(0, i).map(function (l) { return l.width - fontSize(d, i); })) +
	                size(d, i) / 2 + padding * 3 * i;
	  }

	  /**
	      The default y accessor function.
	      @private
	  */
	  function shapeY(d, i) {
	    if (orient === "horizontal") return outerBounds.y + max(lineData.map(function (l) { return l.height; }).concat(data.map(function (l, x) { return size(l, x); }))) / 2;
	    else {
	      var s = size(d, i);
	      var pad = lineData[i].height > s ? lineData[i].height / 2 : s / 2,
	            prev = sum(lineData.slice(0, i), function (l, x) { return max([l.height, size(l.data, x)]); });
	      return outerBounds.y + prev + pad + padding * i;
	    }
	  }

	  var on = {},
	        outerBounds = {"width": 0, "height": 0, "x": 0, "y": 0};

	  var align = "center",
	      backgroundColor = "transparent",
	      duration = 600,
	      fill = accessor("color"),
	      fontColor = constant$3("#444"),
	      fontFamily = constant$3("sans-serif"),
	      fontResize = constant$3(false),
	      fontSize = constant$3(10),
	      height = 100,
	      id = accessor("id"),
	      label = accessor("id"),
	      labelBounds = shapeLabelBounds,
	      lineData = [],
	      lineHeight,
	      orient = "horizontal",
	      padding = 5,
	      select,
	      shapeImage = constant$3(false),
	      size = constant$3(10),
	      verticalAlign = "middle",
	      width = 400,
	      x = shapeX,
	      y = shapeY;

	  /**
	    The inner return object and draw function that gets assigned the public methods.
	    @private
	  */
	  function shape(callback) {

	    if (select === void 0) shape.select(d3Select("body").append("svg").attr("width", ((window.innerWidth) + "px")).attr("height", ((window.innerHeight) + "px")).node());
	    if (lineHeight === void 0) lineHeight = function (d, i) { return fontSize(d, i) * 1.1; };

	    // Background Rectangle
	    rect()
	      .data([{"id": "legend-background"}])
	      .duration(duration)
	      .fill(backgroundColor)
	      .height(height)
	      .select(select.node())
	      .width(width)
	      .x(width / 2)
	      .y(height / 2)
	      ();

	    // Calculate Text Sizes
	    lineData = data.map(function (d, i) {
	      var f = fontFamily(d, i), lh = lineHeight(d, i), s = fontSize(d, i);
	      var h = orient === "horizontal" ? height - (data.length + 1) * padding : height,
	            w = orient === "vertical" ? width - padding * 3 - size(d, i) : width;
	      var res = wrap().fontFamily(f).fontSize(s).lineHeight(lh).width(w).height(h)(label(d, i));
	      res.width = Math.ceil(max(res.lines.map(function (t) { return measureText(t, {"font-family": f, "font-size": s}); }))) + s;
	      res.height = Math.ceil(res.lines.length * (lh + 1));
	      res.og = {
	        "height": res.height,
	        "width": res.width
	      };
	      res.data = d;
	      res.f = f;
	      res.s = s;
	      res.lh = lh;
	      return res;
	    });

	    var availableSpace, textSpace, visibleLabels = true;

	    if (orient === "horizontal") {
	      availableSpace = width - sum(data.map(function (d, i) { return size(d, i) + padding * 3; })) - padding * 2;
	      textSpace = sum(lineData.map(function (d, i) { return d.width - fontSize(d, i); }));
	      if (textSpace > availableSpace) {
	        var wrappable = lineData
	          .filter(function (d) { return d.words.length > 1; })
	          .sort(function (a, b) { return b.sentence.length - a.sentence.length; });

	        if (wrappable.length && height > wrappable[0].height * 2) {

	          var line = 2;
	          while (line <= 5) {
	            var labels = wrappable.filter(function (d) { return d.words.length >= line; });
	            if (!labels.length) break;
	            var loop = function ( x ) {
	              var label$1 = wrappable[x];
	              var h = label$1.og.height * line, w = label$1.og.width * (1.5 * (1 / line));
	              var res = wrap().fontFamily(label$1.f).fontSize(label$1.s).lineHeight(label$1.lh).width(w).height(h)(label$1.sentence);
	              if (!res.truncated) {
	                textSpace -= label$1.width;
	                label$1.width = Math.ceil(max(res.lines.map(function (t) { return measureText(t, {"font-family": label$1.f, "font-size": label$1.s}); }))) + label$1.s;
	                label$1.height = res.lines.length * (label$1.lh + 1);
	                textSpace += label$1.width;
	                if (textSpace <= availableSpace) return 'break';
	              }
	            };

	            for (var x$1 = 0; x$1 < wrappable.length; x$1++) {
	              var returned = loop( x$1 );

	              if ( returned === 'break' ) break;
	            }
	            if (textSpace <= availableSpace) break;
	            line++;

	          }

	        }
	        else visibleLabels = false;
	      }
	    }
	    if (textSpace > availableSpace) visibleLabels = false;

	    if (!visibleLabels) {
	      textSpace = 0;
	      for (var i = 0; i < lineData.length; i++) {
	        lineData[i].width = 0;
	        lineData[i].height = 0;
	      }
	    }

	    var innerHeight = max(lineData, function (d, i) { return max([d.height, size(d.data, i)]); }),
	          innerWidth = textSpace + sum(data, function (d, i) { return size(d, i); }) + padding * (data.length * (visibleLabels ? 3 : 1) - 2);
	    outerBounds.width = innerWidth;
	    outerBounds.height = innerHeight;

	    var xOffset = padding,
	        yOffset = padding;
	    if (align === "center") xOffset = (width - padding * 2 - innerWidth) / 2;
	    else if (align === "right") xOffset = width - padding * 2 - innerWidth;
	    if (verticalAlign === "middle") yOffset = (height - padding * 2 - innerHeight) / 2;
	    else if (verticalAlign === "bottom") yOffset = height - padding * 2 - innerHeight;
	    outerBounds.x = xOffset;
	    outerBounds.y = yOffset;

	    // Shape <g> Group
	    var shapeGroup = select.selectAll("g.d3plus-legend-shape-group")
	      .data([0]);

	    shapeGroup = shapeGroup.enter().append("g")
	        .attr("class", "d3plus-legend-shape-group")
	      .merge(shapeGroup);

	    // Legend Shapes
	    var legendShapes = rect()
	      .backgroundImage(shapeImage)
	      .data(data)
	      .duration(duration)
	      .fill(fill)
	      .fontColor(fontColor)
	      .fontFamily(fontFamily)
	      .fontResize(fontResize)
	      .fontSize(fontSize)
	      .height(size)
	      .id(id)
	      .innerBounds(labelBounds)
	      .label(visibleLabels ? label : false)
	      .labelPadding(0)
	      .lineHeight(lineHeight)
	      .select(shapeGroup.node())
	      .verticalAlign("top")
	      .width(size)
	      .x(x)
	      .y(y);

	    var events = Object.keys(on);
	    for (var e = 0; e < events.length; e++) legendShapes.on(events[e], on[events[e]]);
	    legendShapes();

	    if (callback) setTimeout(callback, duration + 100);

	    return shape;

	  }

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the horizontal alignment to the specified value and returns this generator. If *value* is not specified, returns the current horizontal alignment.
	      @param {String} [*value* = "center"] Supports `"left"` and `"center"` and `"right"`.
	  */
	  shape.align = function(_) {
	    return arguments.length ? (align = _, shape) : align;
	  };

	  /**
	      @memberof shape
	      @desc If a valid CSS *color* is specified, sets the overall background color to the specified value and returns this generator. If *color* is not specified, returns the current background color.
	      @param {String} [*color* = []]
	  */
	  shape.backgroundColor = function(_) {
	    return arguments.length ? (backgroundColor = _, shape) : backgroundColor;
	  };

	  /**
	      @memberof shape
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  shape.data = function(_) {
	    return arguments.length ? (data = _, shape) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  shape.duration = function(_) {
	    return arguments.length ? (duration = _, shape) : duration;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the fill accessor to the specified function and returns this generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function} [*value*]
	      @example
	function value(d) {
	  return d.color;
	}
	  */
	  shape.fill = function(_) {
	    return arguments.length ? (fill = _, shape) : fill;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  shape.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant$3(_), shape) : fontColor;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.
	      @param {Function|String} [*value*]
	  */
	  shape.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant$3(_), shape) : fontFamily;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#shape.label) will be resized the best fit the rectangle.
	      @param {Function|Boolean} [*value*]
	  */
	  shape.fontResize = function(_) {
	    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant$3(_), shape) : fontResize;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.
	      @param {Function|String} [*value*]
	  */
	  shape.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant$3(_), shape) : fontSize;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the overall height of the legend and returns this generator. If *value* is not specified, returns the current height value.
	      @param {Number} [*value* = 100]
	  */
	  shape.height = function(_) {
	    return arguments.length ? (height = _, shape) : height;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	function value(d) {
	  return d.id;
	}
	  */
	  shape.id = function(_) {
	    return arguments.length ? (id = _, shape) : id;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.
	      @param {Function|String} [*value*]
	  */
	  shape.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant$3(_), shape) : label;
	  };

	  /**
	      @memberof shape
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this legend generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	function(w, h) {
	  return {
	    "width": w,
	    "height": h,
	    "x": -w / 2,
	    "y": -h / 2
	  };
	}
	      @param {Function} [*bounds*] Given a shape's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  shape.labelBounds = function(_) {
	    return arguments.length ? (labelBounds = _, shape) : labelBounds;
	  };

	  /**
	      @memberof shape
	      @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
	      @param {String} [*typenames*]
	      @param {Function} [*listener*]
	  */
	  shape.on = function(typenames, listener) {
	    return arguments.length === 2 ? (on[typenames] = listener, shape) : arguments.length ? on[typenames] : on;
	  };

	  /**
	      @memberof shape
	      @desc If *orient* is specified, sets the orientation of the shape and returns this generator. If *orient* is not specified, returns the current orientation.
	      @param {String} [*orient* = "horizontal"] Supports `"horizontal"` and `"vertical"` orientations.
	  */
	  shape.orient = function(_) {
	    return arguments.length ? (orient = _, shape) : orient;
	  };

	  /**
	      @memberof shape
	      @desc If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.
	      @example
	{"width": 180, "height": 24, "x": 10, "y": 20}
	  */
	  shape.outerBounds = function() {
	    return outerBounds;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the padding between each key to the specified number and returns this generator. If *value* is not specified, returns the current padding value.
	      @param {Number} [*value* = 10]
	  */
	  shape.padding = function(_) {
	    return arguments.length ? (padding = _, shape) : padding;
	  };

	  /**
	      @memberof shape
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
	      @param {String|HTMLElement} [*selector* = d3Select("body").append("svg")]
	  */
	  shape.select = function(_) {
	    return arguments.length ? (select = d3Select(_), shape) : select;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the shape background image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current shape background image accessor, which by default returns a color that contrasts the fill color.
	      @param {Function|String} [*value*]
	  */
	  shape.shapeImage = function(_) {
	    return arguments.length ? (shapeImage = typeof _ === "function" ? _ : constant$3(_), shape) : shapeImage;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the size accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current size accessor.
	      @param {Function|Number} [*value* = 20]
	  */
	  shape.size = function(_) {
	    return arguments.length ? (size = typeof _ === "function" ? _ : constant$3(_), shape) : size;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the vertical alignment to the specified value and returns this generator. If *value* is not specified, returns the current vertical alignment.
	      @param {String} [*value* = "middle"] Supports `"top"` and `"middle"` and `"bottom"`.
	  */
	  shape.verticalAlign = function(_) {
	    return arguments.length ? (verticalAlign = _, shape) : verticalAlign;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the overall width of the legend and returns this generator. If *value* is not specified, returns the current width value.
	      @param {Number} [*value* = 400]
	  */
	  shape.width = function(_) {
	    return arguments.length ? (width = _, shape) : width;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
	      @param {Function|Number} [*value*]
	  */
	  shape.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$3(_), shape) : x;
	  };

	  /**
	      @memberof shape
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
	      @param {Function|Number} [*value*]
	  */
	  shape.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$3(_), shape) : y;
	  };

	  return data.length ? shape() : shape;

	}

	var prefix$2 = "$";

	function Map$2() {}

	Map$2.prototype = map$3.prototype = {
	  constructor: Map$2,
	  has: function(key) {
	    return (prefix$2 + key) in this;
	  },
	  get: function(key) {
	    return this[prefix$2 + key];
	  },
	  set: function(key, value) {
	    this[prefix$2 + key] = value;
	    return this;
	  },
	  remove: function(key) {
	    var property = prefix$2 + key;
	    return property in this && delete this[property];
	  },
	  clear: function() {
	    for (var property in this) if (property[0] === prefix$2) delete this[property];
	  },
	  keys: function() {
	    var keys = [];
	    for (var property in this) if (property[0] === prefix$2) keys.push(property.slice(1));
	    return keys;
	  },
	  values: function() {
	    var values = [];
	    for (var property in this) if (property[0] === prefix$2) values.push(this[property]);
	    return values;
	  },
	  entries: function() {
	    var entries = [];
	    for (var property in this) if (property[0] === prefix$2) entries.push({key: property.slice(1), value: this[property]});
	    return entries;
	  },
	  size: function() {
	    var size = 0;
	    for (var property in this) if (property[0] === prefix$2) ++size;
	    return size;
	  },
	  empty: function() {
	    for (var property in this) if (property[0] === prefix$2) return false;
	    return true;
	  },
	  each: function(f) {
	    for (var property in this) if (property[0] === prefix$2) f(this[property], property.slice(1), this);
	  }
	};

	function map$3(object, f) {
	  var map = new Map$2;

	  // Copy constructor.
	  if (object instanceof Map$2) object.each(function(value, key) { map.set(key, value); });

	  // Index array by numeric index or specified key function.
	  else if (Array.isArray(object)) {
	    var i = -1,
	        n = object.length,
	        o;

	    if (f == null) while (++i < n) map.set(i, object[i]);
	    else while (++i < n) map.set(f(o = object[i], i, object), o);
	  }

	  // Convert object to map.
	  else if (object) for (var key in object) map.set(key, object[key]);

	  return map;
	}

	function nest$2() {
	  var keys = [],
	      sortKeys = [],
	      sortValues,
	      rollup,
	      nest;

	  function apply(array, depth, createResult, setResult) {
	    if (depth >= keys.length) return rollup != null
	        ? rollup(array) : (sortValues != null
	        ? array.sort(sortValues)
	        : array);

	    var i = -1,
	        n = array.length,
	        key = keys[depth++],
	        keyValue,
	        value,
	        valuesByKey = map$3(),
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
	    if (++depth > keys.length) return map;
	    var array, sortKey = sortKeys[depth - 1];
	    if (rollup != null && depth >= keys.length) array = map.entries();
	    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
	    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
	  }

	  return nest = {
	    object: function(array) { return apply(array, 0, createObject$2, setObject$2); },
	    map: function(array) { return apply(array, 0, createMap$2, setMap$2); },
	    entries: function(array) { return entries(apply(array, 0, createMap$2, setMap$2), 0); },
	    key: function(d) { keys.push(d); return nest; },
	    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
	    sortValues: function(order) { sortValues = order; return nest; },
	    rollup: function(f) { rollup = f; return nest; }
	  };
	}

	function createObject$2() {
	  return {};
	}

	function setObject$2(object, key, value) {
	  object[key] = value;
	}

	function createMap$2() {
	  return map$3();
	}

	function setMap$2(map, key, value) {
	  map.set(key, value);
	}

	var proto$2 = map$3.prototype;

	function node_each(callback) {
	  var node = this, current, next = [node], children, i, n;
	  do {
	    current = next.reverse(), next = [];
	    while (node = current.pop()) {
	      callback(node), children = node.children;
	      if (children) for (i = 0, n = children.length; i < n; ++i) {
	        next.push(children[i]);
	      }
	    }
	  } while (next.length);
	  return this;
	}

	function node_eachBefore(callback) {
	  var node = this, nodes = [node], children, i;
	  while (node = nodes.pop()) {
	    callback(node), children = node.children;
	    if (children) for (i = children.length - 1; i >= 0; --i) {
	      nodes.push(children[i]);
	    }
	  }
	  return this;
	}

	function node_eachAfter(callback) {
	  var node = this, nodes = [node], next = [], children, i, n;
	  while (node = nodes.pop()) {
	    next.push(node), children = node.children;
	    if (children) for (i = 0, n = children.length; i < n; ++i) {
	      nodes.push(children[i]);
	    }
	  }
	  while (node = next.pop()) {
	    callback(node);
	  }
	  return this;
	}

	function node_sum(value) {
	  return this.eachAfter(function(node) {
	    var sum = +value(node.data) || 0,
	        children = node.children,
	        i = children && children.length;
	    while (--i >= 0) sum += children[i].value;
	    node.value = sum;
	  });
	}

	function node_sort(compare) {
	  return this.eachBefore(function(node) {
	    if (node.children) {
	      node.children.sort(compare);
	    }
	  });
	}

	function node_path(end) {
	  var start = this,
	      ancestor = leastCommonAncestor(start, end),
	      nodes = [start];
	  while (start !== ancestor) {
	    start = start.parent;
	    nodes.push(start);
	  }
	  var k = nodes.length;
	  while (end !== ancestor) {
	    nodes.splice(k, 0, end);
	    end = end.parent;
	  }
	  return nodes;
	}

	function leastCommonAncestor(a, b) {
	  if (a === b) return a;
	  var aNodes = a.ancestors(),
	      bNodes = b.ancestors(),
	      c = null;
	  a = aNodes.pop();
	  b = bNodes.pop();
	  while (a === b) {
	    c = a;
	    a = aNodes.pop();
	    b = bNodes.pop();
	  }
	  return c;
	}

	function node_ancestors() {
	  var node = this, nodes = [node];
	  while (node = node.parent) {
	    nodes.push(node);
	  }
	  return nodes;
	}

	function node_descendants() {
	  var nodes = [];
	  this.each(function(node) {
	    nodes.push(node);
	  });
	  return nodes;
	}

	function node_leaves() {
	  var leaves = [];
	  this.eachBefore(function(node) {
	    if (!node.children) {
	      leaves.push(node);
	    }
	  });
	  return leaves;
	}

	function node_links() {
	  var root = this, links = [];
	  root.each(function(node) {
	    if (node !== root) { // Don’t include the root’s parent, if any.
	      links.push({source: node.parent, target: node});
	    }
	  });
	  return links;
	}

	function hierarchy(data, children) {
	  var root = new Node(data),
	      valued = +data.value && (root.value = data.value),
	      node,
	      nodes = [root],
	      child,
	      childs,
	      i,
	      n;

	  if (children == null) children = defaultChildren;

	  while (node = nodes.pop()) {
	    if (valued) node.value = +node.data.value;
	    if ((childs = children(node.data)) && (n = childs.length)) {
	      node.children = new Array(n);
	      for (i = n - 1; i >= 0; --i) {
	        nodes.push(child = node.children[i] = new Node(childs[i]));
	        child.parent = node;
	        child.depth = node.depth + 1;
	      }
	    }
	  }

	  return root.eachBefore(computeHeight);
	}

	function node_copy() {
	  return hierarchy(this).eachBefore(copyData);
	}

	function defaultChildren(d) {
	  return d.children;
	}

	function copyData(node) {
	  node.data = node.data.data;
	}

	function computeHeight(node) {
	  var height = 0;
	  do node.height = height;
	  while ((node = node.parent) && (node.height < ++height));
	}

	function Node(data) {
	  this.data = data;
	  this.depth =
	  this.height = 0;
	  this.parent = null;
	}

	Node.prototype = hierarchy.prototype = {
	  constructor: Node,
	  each: node_each,
	  eachAfter: node_eachAfter,
	  eachBefore: node_eachBefore,
	  sum: node_sum,
	  sort: node_sort,
	  path: node_path,
	  ancestors: node_ancestors,
	  descendants: node_descendants,
	  leaves: node_leaves,
	  links: node_links,
	  copy: node_copy
	};

	function required(f) {
	  if (typeof f !== "function") throw new Error;
	  return f;
	}

	function constantZero() {
	  return 0;
	}

	function constant$9(x) {
	  return function() {
	    return x;
	  };
	}

	function roundNode(node) {
	  node.x0 = Math.round(node.x0);
	  node.y0 = Math.round(node.y0);
	  node.x1 = Math.round(node.x1);
	  node.y1 = Math.round(node.y1);
	}

	function dice(parent, x0, y0, x1, y1) {
	  var nodes = parent.children,
	      node,
	      i = -1,
	      n = nodes.length,
	      k = parent.value && (x1 - x0) / parent.value;

	  while (++i < n) {
	    node = nodes[i], node.y0 = y0, node.y1 = y1;
	    node.x0 = x0, node.x1 = x0 += node.value * k;
	  }
	}

	function slice$1(parent, x0, y0, x1, y1) {
	  var nodes = parent.children,
	      node,
	      i = -1,
	      n = nodes.length,
	      k = parent.value && (y1 - y0) / parent.value;

	  while (++i < n) {
	    node = nodes[i], node.x0 = x0, node.x1 = x1;
	    node.y0 = y0, node.y1 = y0 += node.value * k;
	  }
	}

	var squarify = (function custom(ratio) {

	  function squarify(parent, x0, y0, x1, y1) {
	    if (parent._squarify) return resquarify(parent, x0, y0, x1, y1);

	    var squarified = parent._squarify = [],
	        nodes = parent.children,
	        row,
	        nodeValue,
	        i0 = 0,
	        i1,
	        n = nodes.length,
	        dx, dy,
	        value = parent.value,
	        sumValue,
	        minValue,
	        maxValue,
	        newRatio,
	        minRatio,
	        alpha,
	        beta;

	    while (i0 < n) {
	      dx = x1 - x0, dy = y1 - y0;
	      minValue = maxValue = sumValue = nodes[i0].value;
	      alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
	      beta = sumValue * sumValue * alpha;
	      minRatio = Math.max(maxValue / beta, beta / minValue);

	      // Keep adding nodes while the aspect ratio maintains or improves.
	      for (i1 = i0 + 1; i1 < n; ++i1) {
	        sumValue += nodeValue = nodes[i1].value;
	        if (nodeValue < minValue) minValue = nodeValue;
	        if (nodeValue > maxValue) maxValue = nodeValue;
	        beta = sumValue * sumValue * alpha;
	        newRatio = Math.max(maxValue / beta, beta / minValue);
	        if (newRatio > minRatio) { sumValue -= nodeValue; break; }
	        minRatio = newRatio;
	      }

	      // Position and record the row orientation.
	      squarified.push(row = {value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1)});
	      if (row.dice) dice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
	      else slice$1(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
	      value -= sumValue, i0 = i1;
	    }
	  }

	  squarify.ratio = function(x) {
	    return custom((x = +x) > 1 ? x : 1);
	  };

	  return squarify;
	})((1 + Math.sqrt(5)) / 2, false);

	function resquarify(parent, x0, y0, x1, y1) {
	  var squarified = parent._squarify,
	      row,
	      nodes,
	      i,
	      j = -1,
	      n,
	      m = squarified.length,
	      value = parent.value;

	  while (++j < m) {
	    row = squarified[j], nodes = row.children;
	    for (i = row.value = 0, n = nodes.length; i < n; ++i) row.value += nodes[i].value;
	    if (row.dice) dice(row, x0, y0, x1, y0 += (y1 - y0) * row.value / value);
	    else slice$1(row, x0, y0, x0 += (x1 - x0) * row.value / value, y1);
	    value -= row.value;
	  }
	}

	function treemap() {
	  var tile = squarify,
	      round = false,
	      dx = 1,
	      dy = 1,
	      paddingStack = [0],
	      paddingInner = constantZero,
	      paddingTop = constantZero,
	      paddingRight = constantZero,
	      paddingBottom = constantZero,
	      paddingLeft = constantZero;

	  function treemap(root) {
	    root.x0 =
	    root.y0 = 0;
	    root.x1 = dx;
	    root.y1 = dy;
	    root.eachBefore(positionNode);
	    paddingStack = [0];
	    if (round) root.eachBefore(roundNode);
	    return root;
	  }

	  function positionNode(node) {
	    var p = paddingStack[node.depth],
	        x0 = node.x0 + p,
	        y0 = node.y0 + p,
	        x1 = node.x1 - p,
	        y1 = node.y1 - p;
	    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	    node.x0 = x0;
	    node.y0 = y0;
	    node.x1 = x1;
	    node.y1 = y1;
	    if (node.children) {
	      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
	      x0 += paddingLeft(node) - p;
	      y0 += paddingTop(node) - p;
	      x1 -= paddingRight(node) - p;
	      y1 -= paddingBottom(node) - p;
	      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
	      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
	      tile(node, x0, y0, x1, y1);
	    }
	  }

	  treemap.round = function(x) {
	    return arguments.length ? (round = !!x, treemap) : round;
	  };

	  treemap.size = function(x) {
	    return arguments.length ? (dx = +x[0], dy = +x[1], treemap) : [dx, dy];
	  };

	  treemap.tile = function(x) {
	    return arguments.length ? (tile = required(x), treemap) : tile;
	  };

	  treemap.padding = function(x) {
	    return arguments.length ? treemap.paddingInner(x).paddingOuter(x) : treemap.paddingInner();
	  };

	  treemap.paddingInner = function(x) {
	    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant$9(+x), treemap) : paddingInner;
	  };

	  treemap.paddingOuter = function(x) {
	    return arguments.length ? treemap.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap.paddingTop();
	  };

	  treemap.paddingTop = function(x) {
	    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant$9(+x), treemap) : paddingTop;
	  };

	  treemap.paddingRight = function(x) {
	    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant$9(+x), treemap) : paddingRight;
	  };

	  treemap.paddingBottom = function(x) {
	    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant$9(+x), treemap) : paddingBottom;
	  };

	  treemap.paddingLeft = function(x) {
	    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant$9(+x), treemap) : paddingLeft;
	  };

	  return treemap;
	}

	/**
	    @function layout
	    @desc Uses the [d3 layout layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. If *data* is specified, immediately draws the tree map based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#layout.data) method.
	    @param {Array} [data = []]
	    @example <caption>using default key accessors</caption>
	var data = [
	  {"id": 0, "value": 100},
	  {"id": 1, "value": 50}
	];

	layout(data);
	@example <caption>using non-default key accessors</caption>
	var data = [
	  {"name": 0, "value": 20},
	  {"name": 1, "value": 10}
	];

	layout()
	  .id(function(d) {
	    return d.name;
	  })
	  .value(function(d) {
	    return d.value * 5;
	  })();
	*/
	function layout(data) {

	  /**
	  The default value accessor function.
	  @private
	  */
	  if ( data === void 0 ) data = [];

	  function layoutSort(a, b) {
	    return b.height - a.height || sum(b.data) - sum(a.data);
	  }

	  var shapes = rect()
	          .height(function (d) { return d.y1 - d.y0; })
	          .width(function (d) { return d.x1 - d.x0; })
	          .x(function (d) { return d.x0 + (d.x1 - d.x0) / 2; })
	          .y(function (d) { return d.y0 + (d.y1 - d.y0) / 2; });

	  var duration = 600,
	      fill,
	      groupBy = [accessor("id")],
	      id,
	      label,
	      labelPadding = constant$3(5),
	      labelResize = constant$3(true),
	      legend = true,
	      select,
	      size,
	      sort = layoutSort,
	      sum = accessor("value");

	  /**
	      The inner return object and draw function that gets assigned the public methods.
	      @private
	  */
	  function layout(callback) {

	    if (select === void 0) {
	      layout.size(getSize(d3Select("body").node()));
	      layout.select(d3Select("body").append("svg").style("width", ((size[0]) + "px")).style("height", ((size[1]) + "px")).style("display", "block").node());
	    }
	    else if (size === void 0) layout.size(getSize(select.node()));

	    id = groupBy[groupBy.length - 1];
	    var drawLabel = label || id;
	    var drawFill = fill || function(d, i) {
	      return assign(id(d, i));
	    };

	    var legendData = colorNest(data, drawFill, groupBy);

	    var legendGroup = select.selectAll("g.d3plus-treemap-legend")
	      .data(legend ? [0] : []);

	    legendGroup = legendGroup.enter().append("g")
	        .attr("class", "d3plus-treemap-legend")
	        .attr("transform", ("translate(0," + (size[1] / 2) + ")"))
	      .merge(legendGroup);

	    legendGroup.transition().duration(duration)
	      .attr("transform", ("translate(0," + (size[1] / 2) + ")"));

	    var legendGen = shapeLegend()
	      .duration(duration)
	      .data(legendData.data)
	      .fill(drawFill)
	      .id(legendData.id)
	      .height(size[1] / 2)
	      .label(legendData.id)
	      .select(legendGroup.node())
	      .verticalAlign("bottom")
	      .width(size[0])
	      ();

	    var tmapHeight = size[1] - legendGen.outerBounds().height - legendGen.padding() * 4;

	    var nestedData = nest$2();
	    for (var i = 0; i < groupBy.length; i++) nestedData.key(groupBy[i]);
	    nestedData = nestedData.entries(data);

	    var tmapData = treemap()
	      .round(true)
	      .size([size[0], tmapHeight])
	      (hierarchy({"values": nestedData}, function (d) { return d.values; }).sort(layoutSort).sum(sum))
	      .children;

	    var shapeData = [];

	    /**
	    Flattens and merge treemap data.
	    @private
	    */
	    function extractLayout(children) {
	      for (var i = 0; i < children.length; i++) {
	        var node = children[i];
	        if (node.depth < groupBy.length) extractLayout(node.children);
	        else {
	          node.id = groupBy.length + node.data.key;
	          node.data = combine(node.data.values);
	          shapeData.push(node);
	        }
	      }
	    }
	    if (tmapData) extractLayout(tmapData);

	    var shapeGroup = select.selectAll("g.d3plus-treemap-shapes").data([0]);

	    shapeGroup = shapeGroup.enter().append("g")
	      .attr("class", "d3plus-treemap-shapes")
	      .merge(shapeGroup);

	    shapes
	      .data(shapeData)
	      .duration(duration)
	      .fill(function (d, i) { return drawFill(d.data, i); })
	      .fontResize(function (d, i) { return labelResize(d.data, i); })
	      .label(function (d, i) { return drawLabel(d.data, i); })
	      .labelPadding(function (d, i) { return labelPadding(d.data, i); })
	      .select(shapeGroup.node())
	      ();

	    if (callback) setTimeout(callback, duration + 100);

	    return layout;

	  }

	  /**
	      @memberof layout
	      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array.
	      @param {Array} [*data* = []]
	  */
	  layout.data = function(_) {
	    return arguments.length ? (data = _, layout) : data;
	  };

	  /**
	      @memberof layout
	      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
	      @param {Number} [*ms* = 600]
	  */
	  layout.duration = function(_) {
	    return arguments.length ? (duration = _, layout) : duration;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor. By default, colors are assigned using the [d3plus-color assign](https://github.com/d3plus/d3plus-color/#assign) function based on each data point's unique id.
	      @param {Function|String} [*value*]
	      @example
	function value(d) {
	  return d3plus_color.assign(d.id);
	}
	  */
	  layout.fill = function(_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : constant$3(_), layout) : fill;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the group accessor(s) to the specified string, function, or array of values and returns this generator. If *value* is not specified, returns the current group accessor.
	      @param {String|Function|Array} [*value*]
	      @example
	function value(d) {
	  return d.id;
	}
	  */
	  layout.groupBy = function(_) {
	    if (!arguments.length) return groupBy;
	    if (!(_ instanceof Array)) _ = [_];
	    return groupBy = _.map(function (k) { return typeof k === "function" ? k : accessor(k); }), layout;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  layout.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant$3(_), layout) : label;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label padding accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current label padding accessor.
	      @param {Function|Number} [*value* = 5]
	  */
	  layout.labelPadding = function(_) {
	    return arguments.length ? (labelPadding = typeof _ === "function" ? _ : constant$3(_), layout) : labelPadding;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the label resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current label resizing accessor.
	      @param {Function|Boolean} [*value* = true]
	  */
	  layout.labelResize = function(_) {
	    return arguments.length ? (labelResize = typeof _ === "function" ? _ : constant$3(_), layout) : labelResize;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, toggles the legend based on the specified boolean and returns this generator. If *value* is not specified, returns the current legend visibility.
	      @param {Boolean} [*value*]
	  */
	  layout.legend = function(_) {
	    return arguments.length ? (legend = _, layout) : legend;
	  };

	  /**
	      @memberof layout
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  layout.select = function(_) {
	    return arguments.length ? (select = d3Select(_), layout) : select;
	  };

	  /**
	      @memberof layout
	      @desc If *comparator* is specified, sets the sort order for the layout using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.
	      @param {Array} [*comparator*]
	      @example
	function comparator(a, b) {
	  return b.value - a.value;
	}
	  */
	  layout.sort = function(_) {
	    return arguments.length ? (sort = _, layout) : sort;
	  };

	  /**
	      @memberof layout
	      @desc If *size* is specified, sets the available layout size to the specified two-element array of numbers representing x and y. If *size* is not specified, returns the current size. If no *size* is given before running the generator, it is determined by analyzing the element passed to [select](#layout.select).
	      @param {Array} [*size*]
	  */
	  layout.size = function(_) {
	    return arguments.length ? (size = _, layout) : size;
	  };

	  /**
	      @memberof layout
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current sum accessor.
	      @param {Function|Number} [*value*]
	      @example
	function sum(d) {
	  return d.sum;
	}
	  */
	  layout.sum = function(_) {
	    return arguments.length ? (sum = typeof _ === "function" ? _ : constant$3(_), layout) : sum;
	  };

	  return data.length ? layout() : layout;

	}

	exports.version = version;
	exports.layout = layout;

}));