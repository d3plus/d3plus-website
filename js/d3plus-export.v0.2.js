/*
  d3plus-export v0.2.0
  Export methods for transforming and downloading SVG.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('html2canvas'), require('canvg-browser'), require('d3-selection'), require('canvas-toBlob'), require('file-saver')) :
	typeof define === 'function' && define.amd ? define('d3plus-export', ['exports', 'html2canvas', 'canvg-browser', 'd3-selection', 'canvas-toBlob', 'file-saver'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.html2canvas,global.canvg,global.d3Selection,null,global.fileSaver));
}(this, (function (exports,html2canvas,canvg,d3Selection,canvasToBlob,fileSaver) { 'use strict';

html2canvas = 'default' in html2canvas ? html2canvas['default'] : html2canvas;
canvg = 'default' in canvg ? canvg['default'] : canvg;

var defaultOptions = {
  background: false,
  callback: function () {},
  excludes: [],
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
var dom2canvas = function(elem, options) {

  if (!elem) { return; }
  if (!(elem instanceof Array)) { elem = [elem]; }

  options = Object.assign({}, defaultOptions, options);
  var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);
  var ratio = window ? window.devicePixelRatio || 1 : 1;

  function strokeWidth(selection) {
    var stroke = selection.attr("stroke-width");
    selection.attr("stroke-width", !stroke ? 0 : stroke * ratio);
  }

  var reference = elem[0];
  if (reference.constructor === Object) { reference = reference.element; }

  var height = options.height || parseFloat(d3Selection.select(reference).style("height")),
        width = options.width || parseFloat(d3Selection.select(reference).style("width"));

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
  context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

  if (options.background) {
    context.beginPath();
    context.rect(0, 0, canvas.width / 2, canvas.height / 2);
    context.fillStyle = options.background;
    context.fill();
  }

  var layers = [];

  function checkRender(trans) {

    if (options.exclude.includes(this)) { return; }

    var transform = Object.assign({}, trans);

    // strips translate and scale from transform property
    if (this.tagName) {

      var opacity = d3Selection.select(this).attr("opacity") || d3Selection.select(this).style("opacity");
      var display = d3Selection.select(this).style("display");
      var visibility = d3Selection.select(this).style("visibility");
      if (display === "none" || visibility === "hidden" || opacity && opacity === 0) { return; }

      var property = d3Selection.select(this).attr("transform"),
            tag$1 = this.tagName.toLowerCase();

      if (tag$1 === "g" && property) {
        var scale = property.match(/scale\(([^a-z]+)\)/i);
        if (scale) { transform.scale *= Math.round(parseFloat(scale[1])); }
        var translate = property.match(/translate\(([^a-z]+)\)/i);
        if (translate) {
          var ref = translate[1]
            .replace(/([^a-z]),*\s([^a-z])/gi, "$1,$2")
            .split(",")
            .map(function (d) { return Math.round(parseFloat(d) * transform.scale); });
          var x = ref[0];
          var y = ref[1];
          transform.x += x;
          transform.y += y;
        }
      }

      if (tag$1 === "svg") {
        var x$1 = d3Selection.select(this).attr("x");
        x$1 = x$1 ? Math.round(parseFloat(x$1)) * transform.scale : 0;
        transform.x += x$1;
        var y$1 = d3Selection.select(this).attr("y");
        y$1 = y$1 ? Math.round(parseFloat(y$1)) * transform.scale : 0;
        transform.y += y$1;
        transform.clip = {
          height: Math.round(parseFloat(d3Selection.select(this).attr("height") || d3Selection.select(this).style("height"))),
          width: Math.round(parseFloat(d3Selection.select(this).attr("width") || d3Selection.select(this).style("width"))),
          x: x$1, y: y$1
        };
      }
      else {
        var x$2 = d3Selection.select(this).attr("x");
        if (x$2) { transform.x += parseFloat(x$2) * transform.scale; }
        var y$2 = d3Selection.select(this).attr("y");
        if (y$2) { transform.y += parseFloat(y$2) * transform.scale; }
      }

    }

    var tag = (this.tagName || "").toLowerCase();

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
    else if (tag === "defs") { return; }
    else if (tag === "text") {
      var elem = this.cloneNode(true);
      d3Selection.select(elem).call(strokeWidth);
      layers.push(Object.assign({}, transform, {type: "svg", value: elem}));
    }
    else if (["div", "foreignobject", "span"].includes(tag) && !d3Selection.select(this).selectAll("svg").size()) {

      var data = {
        height: height,
        loaded: false,
        type: "html",
        width: width,
        x: layerX - offsetX,
        y: layerY - offsetY
      };

      var tempCanvas = document.createElement("canvas");
      tempCanvas.width = (width + options.padding * 2) * options.scale * ratio;
      tempCanvas.height = (height + options.padding * 2) * options.scale * ratio;

      var tempContext = tempCanvas.getContext("2d");
      tempContext.scale(options.scale * ratio, options.scale * ratio);

      layers.push(data);
      html2canvas(this, {
        allowTaint: true,
        background: undefined,
        canvas: tempCanvas,
        height: height,
        letterRendering: true,
        taintTest: false,
        width: width
      }).then(function (c) {
        data.value = c;
        data.loaded = true;
      });

    }
    else if (this.childNodes.length > 0) {
      if (tag === "svg") {
        var rect = this.getBoundingClientRect();
        transform.x += rect.left - offsetX;
        transform.y += rect.top - offsetY;
      }
      checkChildren(this, transform);
    }
    else if (["image", "img"].includes(tag)) {

      var url = d3Selection.select(this).attr("href") || d3Selection.select(this).attr("xlink:href");

      if (url.length) {
        var height$1 = parseFloat(d3Selection.select(this).attr("height")) * transform.scale,
              width$1 = parseFloat(d3Selection.select(this).attr("width")) * transform.scale;

        var data$1 = {
          clip: transform.clip,
          height: height$1,
          loaded: false,
          type: "img",
          width: width$1,
          x: transform.x,
          y: transform.y
        };
        layers.push(data$1);

        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {

          var canvas2 = document.createElement("canvas");
          var ctx2 = canvas2.getContext("2d");
          canvas2.height = height$1 * ratio;
          canvas2.width = width$1 * ratio;
          ctx2.drawImage(this, 0, 0, width$1 * ratio, height$1 * ratio);
          var himg = document.createElement("img");
          himg.src = canvas2.toDataURL("image/png");

          data$1.value = himg;
          data$1.loaded = true;

        };
        img.src = url;

      }

    }
    else if (tag !== "g") { // catches all SVG shapes

      var elem$1 = this.cloneNode(true);
      d3Selection.select(elem$1).call(strokeWidth);
      layers.push(Object.assign({}, transform, {type: "svg", value: elem$1}));
      // if (["pattern"].includes(tag)) layers.push(Object.assign({}, transform, {type: "svg", value: elem}));
      // else layers.push({type: "svg", value: elem});
      var fill = d3Selection.select(elem$1).attr("fill");
      if (fill && fill.indexOf("url") === 0) {
        var property$1 = d3Selection.select(elem$1).attr("transform");

        if (property$1) {
          var scale$1 = property$1.match(/scale\(([^a-z]+)\)/i);
          if (scale$1) { transform.scale *= Math.round(parseFloat(scale$1[1])); }
          var translate$1 = property$1.match(/translate\(([^a-z]+)\)/i);
          if (translate$1) {
            var ref$1 = translate$1[1]
              .replace(/([^a-z]),*\s([^a-z])/gi, "$1,$2")
              .split(",")
              .map(function (d) { return Math.round(parseFloat(d) * transform.scale); });
            var x$3 = ref$1[0];
            var y$3 = ref$1[1];
            transform.x += x$3;
            transform.y += y$3;
          }
        }
        checkChildren(d3Selection.select(fill.slice(4, -1)).node(), transform);
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
        options$1 = {scale: 1, x: 0, y: 0};

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
      var clip = layer.clip;

      switch (layer.type) {

        case "img":
          context.save();
          context.beginPath();
          context.translate(options.padding, options.padding);
          context.rect(clip ? clip.x : 0, clip ? clip.y : 0, clip ? clip.width : width, clip ? clip.height : height);
          context.clip();
          context.drawImage(layer.value, layer.x, layer.y, layer.width, layer.height);
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
          canvg(canvas, text, Object.assign({offsetX: layer.x, offsetY: layer.y}, canvgOptions));
          context.restore();

          break;

        case "svg":

          var outer = IE ? (new XMLSerializer()).serializeToString(layer.value) : layer.value.outerHTML;
          context.save();
          context.translate(options.padding, options.padding);
          context.rect(clip ? clip.x : 0, clip ? clip.y : 0, clip ? clip.width : width, clip ? clip.height : height);
          context.clip();
          canvg(canvas, outer, Object.assign({offsetX: layer.x, offsetY: layer.y}, canvgOptions));
          context.restore();
          break;

        default:
          console.warn("uncaught", layer);
          break;

      }

    }

    options.callback(canvas);

  }

};

// import {default as JsPDF} from "jspdf";

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
var saveElement = function(elem, options, renderOptions) {
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
      canvas.toBlob(function (blob) { return fileSaver.saveAs(blob, options.filename); });
    }
    // else if (options.type === "pdf") {
    //
    //   const outputHeight = 11,
    //         outputUnit = "in",
    //         outputWidth = 8.5;
    //
    //   const aspect = canvas.width / canvas.height,
    //         orientation = aspect > 1 ? "landscape" : "portrait";
    //
    //   const pdf = new JsPDF(orientation, outputUnit, [outputWidth, outputHeight]);
    //
    //   let h = orientation === "landscape" ? outputWidth : outputHeight,
    //       left,
    //       top,
    //       w = orientation === "landscape" ? outputHeight : outputWidth;
    //
    //   const margin = 0.5;
    //
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
    //
    //   pdf.addImage(canvas, "canvas", left, top, w, h);
    //   pdf.save(options.filename);
    //
    // }

  }}));

};

exports.dom2canvas = dom2canvas;
exports.saveElement = saveElement;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-export.js.map
