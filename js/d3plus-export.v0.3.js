/*
  d3plus-export v0.3.14
  Export methods for transforming and downloading SVG.
  Copyright (c) 2019 D3plus - https://d3plus.org
  @license MIT
*/

if (typeof Object.assign !== "function") {
  Object.defineProperty(Object, "assign", {
    value: function assign(target) {
      "use strict";
      if (target === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function includes(searchElement, fromIndex) {

      var o = Object(this);

      var len = o.length >>> 0;

      if (len === 0) return false;

      var n = fromIndex | 0;

      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y);
      }

      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      return false;
    }
  });
}

if (!String.prototype.includes) {
  Object.defineProperty(String.prototype, 'includes', {
    value: function(search, start) {
      if (typeof start !== 'number') {
        start = 0
      }

      if (start + search.length > this.length) {
        return false
      } else {
        return this.indexOf(search, start) !== -1
      }
    }
  })
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
      value: function(search, pos) {
          pos = !pos || pos < 0 ? 0 : +pos;
          return this.substring(pos, pos + search.length) === search;
      }
  });
}

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
          })
        }
        if (node.hasChildNodes()) {
          output.push('>');
          [].forEach.call(node.childNodes, function(childNode){
            serializeXML(childNode, output);
          })
          output.push('</', node.tagName, '>');
        } else {
          output.push('/>');
        }
      } else if (nodeType == 8) {
        output.push('<!--', node.nodeValue, '-->');
      }
    }

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
        } catch (e) {};
      }
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

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('html2canvas'), require('canvg-browser'), require('canvas-toBlob'), require('file-saver')) :
  typeof define === 'function' && define.amd ? define('d3plus-export', ['exports', 'd3-selection', 'html2canvas', 'canvg-browser', 'canvas-toBlob', 'file-saver'], factory) :
  (factory((global.d3plus = {}),global.d3Selection,global.html2canvas,global.canvg,null,global.fileSaver));
}(this, (function (exports,d3Selection,html2canvas,canvg,canvasToBlob,fileSaver) { 'use strict';

  html2canvas = html2canvas && html2canvas.hasOwnProperty('default') ? html2canvas['default'] : html2canvas;
  canvg = canvg && canvg.hasOwnProperty('default') ? canvg['default'] : canvg;

  /**
      @function svgPresets
      @desc Adds SVG default attributes to a d3 selection in order to render it properly.
      @param {Selection} selection
  */
  function svgPresets(selection) {

    // sets "stroke-width" attribute to `0` if not defined
    var strokeWidth = selection.attr("stroke-width");
    selection.attr("stroke-width", !strokeWidth ? 0 : strokeWidth);

    // if there is no stroke, set the stroke color to "transparent" (fixes weird text rendering)
    if (!strokeWidth) { selection.attr("stroke", "transparent"); }

    // sets "fill-opacity" attribute to `0` if fill is "transparent" or "none"
    var transparent = ["none", "transparent"].includes(selection.attr("fill"));
    var fillOpacity = selection.attr("fill-opacity");
    selection.attr("fill-opacity", transparent ? 0 : fillOpacity);

    // "aria-label" properties interfere with text labels ¯\_(ツ)_/¯
    selection.attr("aria-label", null);

  }

  /**
      @function htmlPresets
      @desc Adds HTML default styles to a d3 selection in order to render it properly.
      @param {Selection} selection
  */
  function htmlPresets(selection) {

    selection.selectAll("*")
      .each(function() {
        var tag = this.tagName.toLowerCase();
        if (!["option"].includes(tag)) {

          var elem = d3Selection.select(this);

          /* forces minor unnoticible letter-spacing on any element where it is not defined to fix IE */
          var letterSpacing = elem.style("letter-spacing");
          elem.style("letter-spacing", letterSpacing === "normal" ? "0.1px" : letterSpacing);

        }
      });

  }

  var defaultOptions = {
    background: false,
    callback: function () {},
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
    var assign;


    var property = d3Selection.select(elem).attr("transform");
    var scale = 1, x = 0, y = 0;
    if (property) {
      scale = property.match(/scale\(([^a-z]+)\)/i);
      if (scale) { scale = parseFloat(scale[1]); }
      else { scale = 1; }
      var translate = property.match(/translate\(([^a-z]+)\)/i);
      if (translate) {
        (assign = translate[1]
          .replace(", ", ",")
          .replace(/([^a-z]),*\s([^a-z])/gi, "$1,$2")
          .split(",")
          .map(function (d) { return parseFloat(d) * scale; }), x = assign[0], y = assign[1]);
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
      @param {Array} [options.excludes] An array of HTMLElement objects to be excluded from the render.
      @param {Number} [options.height] Pixel height for the final output. If a height value has not been passed, it will be inferred from the sizing of the first DOM element passed.
      @param {Number} [options.padding = 0] Outer padding for the final file.
      @param {Number} [options.scale = 1] Scale for the final file.
      @param {Number} [options.width] Pixel width for the final output. If a width value has not been passed, it will be inferred from the sizing of the first DOM element passed.
  */
  function dom2canvas(elem, options) {

    if (!elem) { return; }
    if (!(elem instanceof Array)) { elem = [elem]; }

    options = Object.assign({}, defaultOptions, options);
    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);
    var ratio = window ? window.devicePixelRatio || 1 : 1;

    var reference = elem[0];
    if (reference.constructor === Object) { reference = reference.element; }

    var height = options.height ||
            parseFloat(d3Selection.select(reference).style("height")) +
            parseFloat(d3Selection.select(reference).style("padding-top")) +
            parseFloat(d3Selection.select(reference).style("padding-bottom")),
          width = options.width ||
            parseFloat(d3Selection.select(reference).style("width")) +
            parseFloat(d3Selection.select(reference).style("padding-left")) +
            parseFloat(d3Selection.select(reference).style("padding-right"));

    var layerX, layerY, offsetX = 0, offsetY = 0;
    if (reference.getBoundingClientRect) {
      var bounds = reference.getBoundingClientRect();
      offsetX = bounds.left;
      offsetY = bounds.top;
    }
    else {
      offsetX = reference.offsetLeft;
      offsetY = reference.offsetTop;
    }

    var canvas = document.createElement("canvas");
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

    function checkRender(trans) {

      var tag = (this.tagName || "").toLowerCase();
      if (options.exclude.includes(this) || tag === "foreignobject") { return; }

      var transform = Object.assign({}, trans);

      // strips translate and scale from transform property
      if (this.tagName) {

        var opacity = d3Selection.select(this).attr("opacity") || d3Selection.select(this).style("opacity");
        var display = d3Selection.select(this).style("display");
        var visibility = d3Selection.select(this).style("visibility");
        if (display === "none" || visibility === "hidden" || opacity && parseFloat(opacity) === 0) { return; }

        var tag$1 = this.tagName.toLowerCase();

        if (tag$1.length && ["defs", "title", "desc"].includes(tag$1)) { return; }

        if (tag$1 === "svg") {

          // do not perform this transform for SVGs nested within other SVGs
          if (!transform.svg) {
            var ref = this.getBoundingClientRect();
            var left = ref.left;
            var top = ref.top;
            transform.x += left - offsetX;
            transform.y += top - offsetY;
            transform.svg = true;
          }

          var x = d3Selection.select(this).attr("x");
          x = x ? parseFloat(x) * transform.scale : 0;
          transform.x += x;
          var y = d3Selection.select(this).attr("y");
          y = y ? parseFloat(y) * transform.scale : 0;
          transform.y += y;
          transform.clip = {
            height: parseFloat(d3Selection.select(this).attr("height") || d3Selection.select(this).style("height")),
            width: parseFloat(d3Selection.select(this).attr("width") || d3Selection.select(this).style("width")),
            x: x, y: y
          };
        }
        else {
          var x$1 = d3Selection.select(this).attr("x");
          if (x$1) { transform.x += parseFloat(x$1) * transform.scale; }
          var y$1 = d3Selection.select(this).attr("y");
          if (y$1) { transform.y += parseFloat(y$1) * transform.scale; }
        }

      }

      if (!tag.length) {
        var test = (this.wholeText || "").replace(/\s/g, "");
        if (test.length) {

          var text = this.nodeValue
            .replace(/^\s*/, "")
            .replace(/^\n/, "")
            .replace(/^\s*/, "")
            .replace(/\n$/, "")
            .replace(/\s*$/, "")
            .replace(/\n$/, "");

          layers.push({type: "text", style: this.parentNode, value: text, x: transform.x, y: transform.y});

        }
      }
      else if (tag === "text") {
        var elem = this.cloneNode(true);
        d3Selection.select(elem).call(svgPresets);
        layers.push(Object.assign({}, transform, {type: "svg", value: elem}));
      }
      else if (["image", "img"].includes(tag)) {

        var url = d3Selection.select(this).attr("href") || d3Selection.select(this).attr("xlink:href");

        if (url.length) {

          var h = parseFloat(d3Selection.select(this).attr("height")) * transform.scale,
                w = parseFloat(d3Selection.select(this).attr("width")) * transform.scale;

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
          img.onload = function() {

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
          img.src = url;

        }

      }
      else if (!["svg", "g", "text"].includes(tag) && !d3Selection.select(this).selectAll("svg").size()) {

        var s = options.scale * ratio;

        var data$1 = {
          height: Math.floor(height + options.padding * 2 + offsetY),
          loaded: false,
          type: "html",
          width: Math.floor(width + options.padding * 2 + offsetX),
          x: Math.floor(layerX - offsetX),
          y: Math.floor(layerY - offsetY)
        };

        var tempCanvas = document.createElement("canvas");
        tempCanvas.width = data$1.width * s;
        tempCanvas.height = data$1.height * s;
        tempCanvas.style.width = (data$1.width * s) + "px";
        tempCanvas.style.height = (data$1.height * s) + "px";

        var tempContext = tempCanvas.getContext("2d");
        tempContext.scale(s, s);

        layers.push(data$1);

        htmlPresets(d3Selection.select(this));

        html2canvas(this, {
          allowTaint: true,
          canvas: tempCanvas,
          letterRendering: true
        }).then(function (c) {
          data$1.value = c;
          data$1.loaded = true;
        });

      }
      else if (tag !== "svg" && this.childNodes.length > 0 && !d3Selection.select(this).selectAll("image, img, svg").size()) {

        var elem$1 = this.cloneNode(true);
        d3Selection.select(elem$1).selectAll("*").each(function() {
          d3Selection.select(this).call(svgPresets);
          if (d3Selection.select(this).attr("opacity") === "0") { this.parentNode.removeChild(this); }
        });

        layers.push(Object.assign({}, transform, {type: "svg", value: elem$1, tag: tag}));

      }
      else if (this.childNodes.length > 0) {
        var ref$1 = parseTransform(this);
        var scale = ref$1[0];
        var x$2 = ref$1[1];
        var y$2 = ref$1[2];
        transform.scale *= scale;
        transform.x += x$2;
        transform.y += y$2;
        checkChildren(this, transform);
      }
      else { // catches all SVG shapes

        var elem$2 = this.cloneNode(true);
        d3Selection.select(elem$2).selectAll("*").each(function() {
          if (d3Selection.select(this).attr("opacity") === "0") { this.parentNode.removeChild(this); }
        });

        if (tag === "line") {
          d3Selection.select(elem$2).attr("x1", parseFloat(d3Selection.select(elem$2).attr("x1")) + transform.x);
          d3Selection.select(elem$2).attr("x2", parseFloat(d3Selection.select(elem$2).attr("x2")) + transform.x);
          d3Selection.select(elem$2).attr("y1", parseFloat(d3Selection.select(elem$2).attr("y1")) + transform.y);
          d3Selection.select(elem$2).attr("y2", parseFloat(d3Selection.select(elem$2).attr("y2")) + transform.y);
        }
        else if (tag === "path") {
          var ref$2 = parseTransform(elem$2);
          var scale$1 = ref$2[0];
          var x$3 = ref$2[1];
          var y$3 = ref$2[2];
          if (d3Selection.select(elem$2).attr("transform")) { d3Selection.select(elem$2).attr("transform", ("scale(" + scale$1 + ")translate(" + (x$3 + transform.x) + "," + (y$3 + transform.y) + ")")); }
        }
        d3Selection.select(elem$2).call(svgPresets);

        var fill = d3Selection.select(elem$2).attr("fill");
        var defFill = fill && fill.indexOf("url") === 0;
        // if (defFill) select(elem).attr("fill-opacity", 0);

        layers.push(Object.assign({}, transform, {type: "svg", value: elem$2, tag: tag}));
        if (defFill) {
          var def = d3Selection.select(fill.slice(4, -1)).node().cloneNode(true);
          var defTag = (def.tagName || "").toLowerCase();
          if (defTag === "pattern") {

            var ref$3 = parseTransform(elem$2);
            var scale$2 = ref$3[0];
            var x$4 = ref$3[1];
            var y$4 = ref$3[2];
            transform.scale *= scale$2;
            transform.x += x$4;
            transform.y += y$4;
            checkChildren(def, transform);

          }
        }

      }

    }

    function checkChildren(e, trans) {
      d3Selection.selectAll(e.childNodes).each(function() {
        checkRender.bind(this)(trans);
      });
    }

    for (var i = 0; i < elem.length; i++) {

      var e = elem[i],
          options$1 = {scale: 1, x: 0, y: 0, svg: false};

      if (e.constructor === Object) {
        options$1 = Object.assign(options$1, e);
        e = e.element;
      }
      layerX = options$1.x;
      layerY = options$1.y;
      checkRender.bind(e)(options$1);

    }

    function checkStatus() {

      var allDone = true;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].loaded === false) {
          allDone = false;
          break;
        }
      }

      if (allDone) { finish(); }
      else { setTimeout(checkStatus, 500); }

    }

    // Wait for all images to load
    checkStatus();

    function finish() {

      for (var i = 0; i < layers.length; i++) {

        var layer = layers[i];
        var clip = layer.clip || {height: height, width: width, x: 0, y: 0};

        switch (layer.type) {

          case "img":
            context.save();
            context.beginPath();
            context.translate(options.padding + clip.x, options.padding + clip.y);
            context.rect(0, 0, clip.width, clip.height);
            context.clip();
            context.drawImage(layer.value, layer.x + clip.x, layer.y + clip.y, layer.width, layer.height);
            context.restore();
            break;

          case "html":
            context.save();
            context.beginPath();
            context.translate(options.padding, options.padding);
            context.drawImage(layer.value, layer.x, layer.y, layer.width, layer.height);
            context.restore();
            break;

          case "text":

            var parent = d3Selection.select(layer.style);
            var title = layer.value
              .replace(/&/g, "&amp;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");

            var fC = parent.style("color"),
                  fS = parent.style("font-size");

            var fF = parent.style("font-family").split(",")[0];

            if (fF.indexOf("'") !== 0) { fF = "'" + fF + "'"; }
            var text = "<text stroke='none' dy='" + fS + "' fill='" + fC + "' font-family=" + fF + " font-size='" + fS + "'>" + title + "</text>";

            context.save();
            context.translate(options.padding, options.padding);
            canvg(canvas, text, Object.assign({}, canvgOptions, {offsetX: layer.x, offsetY: layer.y}));
            context.restore();

            break;

          case "svg":
            var outer = IE ? (new XMLSerializer()).serializeToString(layer.value) : layer.value.outerHTML;
            context.save();
            context.translate(options.padding + clip.x + layer.x, options.padding + clip.y + layer.y);
            context.rect(0, 0, clip.width, clip.height);
            context.clip();
            canvg(canvas, outer, Object.assign({}, canvgOptions, {offsetX: layer.x + clip.x, offsetY: layer.y + clip.y}));
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
  function saveElement(elem, options, renderOptions) {
    if ( options === void 0 ) options = {};
    if ( renderOptions === void 0 ) renderOptions = {};


    if (!elem) { return; }
    options = Object.assign({}, defaultOptions$1, options);

    var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);

    if (!(elem instanceof Array) && options.type === "svg") {
      var outer = IE ? (new XMLSerializer()).serializeToString(elem) : elem.outerHTML;
      fileSaver.saveAs(new Blob([outer], {type: "application/svg+xml"}), ((options.filename) + ".svg"));
    }

    dom2canvas(elem, Object.assign({}, renderOptions, {callback: function (canvas) {

      if (renderOptions.callback) { renderOptions.callback(canvas); }

      if (["jpg", "png"].includes(options.type)) {
        canvas.toBlob(function (blob) { return fileSaver.saveAs(blob, ((options.filename) + "." + (options.type))); });
      }
      // else if (options.type === "pdf") {

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

    }}));

  }

  exports.dom2canvas = dom2canvas;
  exports.saveElement = saveElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-export.js.map
