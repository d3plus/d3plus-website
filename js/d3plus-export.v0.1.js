/*
  d3plus-export v0.1.1
  Export methods for transforming and downloading SVG.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('canvas-toBlob'), require('canvg-browser'), require('d3-selection'), require('file-saver')) :
	typeof define === 'function' && define.amd ? define('d3plus-export', ['exports', 'canvas-toBlob', 'canvg-browser', 'd3-selection', 'file-saver'], factory) :
	(factory((global.d3plus = global.d3plus || {}),null,global.canvg,global.d3Selection,global.fileSaver));
}(this, (function (exports,canvasToBlob,canvg,d3Selection,fileSaver) { 'use strict';

canvg = 'default' in canvg ? canvg['default'] : canvg;

// import {default as JsPDF} from "jspdf";

var defaultOptions = {
  callback: function () {},
  filename: "download",
  padding: 0,
  scale: 1,
  type: "png"
};

var canvgOptions = {
  ignoreMouse: true,
  ignoreAnimation: true,
  ignoreDimensions: true,
  ignoreClear: true
};

/**
    @function savePNG
    @desc Downloads an HTML Element as a bitmap PNG image.
    @param {HTMLElement} elem The element to be saved.
    @param {String} [options] Additional options to specify.
    @param {Function} [options.callback] Callback function to be passed the canvas element after rendering.
    @param {String} [options.filename = "download"] Filename for the downloaded file, without the extension.
    @param {Number} [options.padding = 0] Outer padding for the final file.
    @param {Number} [options.scale = 1] Scale for the final file.
*/
var saveElement = function(elem, options) {

  if (!elem) { return; }
  options = Object.assign({}, defaultOptions, options);
  var IE = new RegExp(/(MSIE|Trident\/|Edge\/)/i).test(navigator.userAgent);

  if (options.type === "svg") {
    var outer = IE ? (new XMLSerializer()).serializeToString(elem) : elem.outerHTML;
    fileSaver.saveAs(new Blob([outer], {type: "application/svg+xml"}), ((options.filename) + ".svg"));
    return;
  }

  var height = parseFloat(d3Selection.select(elem).style("height")),
        width = parseFloat(d3Selection.select(elem).style("width"));

  var canvas = document.createElement("canvas");
  canvas.width = (width + options.padding * 2) * options.scale;
  canvas.height = (height + options.padding * 2) * options.scale;

  var context = canvas.getContext("2d");
  context.scale(options.scale, options.scale);
  context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

  if (options.type === "pdf") {
    context.beginPath();
    context.rect(0, 0, canvas.width / 2, canvas.height / 2);
    context.fillStyle = "white";
    context.fill();
  }

  var layers = [];

  function checkChildren(e, trans) {
    if ( trans === void 0 ) trans = {x: 0, y: 0, scale: 1};

    d3Selection.selectAll(e.childNodes).each(function() {
      var transform = Object.assign({}, trans);

      // strips translate and scale from transform property
      if (this.tagName) {

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

      var patterns = tag.length ? d3Selection.select(this).selectAll("*")
        .filter(function() {
          var fill = d3Selection.select(this).attr("fill");
          return fill && fill.indexOf("url") === 0;
        }).size() : 0;

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

          layers.push({type: "text", style: this.parentNode, value: text});

        }
      }
      else if (tag === "defs") { return; }
      else if (tag === "g" && this.childNodes.length > 0 && !d3Selection.select(this).selectAll("pattern, image, foreignobject").size() && !patterns) {
        var opacity = d3Selection.select(this).attr("opacity") || d3Selection.select(this).style("opacity");
        if (opacity && parseFloat(opacity) > 0) {
          d3Selection.select(this).selectAll("*").each(function() {
            if (d3Selection.select(this).attr("stroke-width") === null) { d3Selection.select(this).attr("stroke-width", 0); }
          });
          layers.push(Object.assign({}, transform, {type: "svg", value: this}));
        }
      }
      else if (tag === "text") {
        if (d3Selection.select(this).attr("stroke-width") === null) { d3Selection.select(this).attr("stroke-width", 0); }
        layers.push(Object.assign({}, transform, {type: "svg", value: this}));
      }
      else if (this.childNodes.length > 0) {
        var opacity$1 = d3Selection.select(this).attr("opacity") || d3Selection.select(this).style("opacity");
        if (opacity$1 && parseFloat(opacity$1) > 0) { checkChildren(this, transform); }
      }
      else if (["image", "img"].includes(tag)) {

        var url = d3Selection.select(this).attr("href") || d3Selection.select(this).attr("xlink:href");

        if (url.length) {
          var height = parseFloat(d3Selection.select(this).attr("height")) * transform.scale,
                width = parseFloat(d3Selection.select(this).attr("width")) * transform.scale;

          var data = {
            clip: transform.clip,
            height: height,
            loaded: false,
            type: "img",
            width: width,
            x: transform.x,
            y: transform.y
          };
          layers.push(data);

          var img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = function() {

            var canvas2 = document.createElement("canvas");
            var ctx2 = canvas2.getContext("2d");
            canvas2.height = height;
            canvas2.width = width;
            ctx2.drawImage(this, 0, 0, width, height);
            var himg = document.createElement("img");
            himg.src = canvas2.toDataURL("image/png");

            data.loaded = true;
            data.value = himg;

          };
          img.src = url;

        }

      }
      else {

        if (d3Selection.select(this).attr("stroke-width") === null) { d3Selection.select(this).attr("stroke-width", 0); }
        layers.push(Object.assign({}, transform, {type: "svg", value: this}));
        // if (["pattern"].includes(tag)) layers.push(Object.assign({}, transform, {type: "svg", value: this}));
        // else layers.push({type: "svg", value: this});
        var fill = d3Selection.select(this).attr("fill");
        if (fill && fill.indexOf("url") === 0) {
          var property$1 = d3Selection.select(this).attr("transform");

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

    });
  }
  checkChildren(elem);

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
          canvg(canvas, text, canvgOptions);
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

    options.callback(canvas);

  }

};

exports.saveElement = saveElement;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-export.js.map
