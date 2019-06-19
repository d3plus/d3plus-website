/*
  d3plus v2.0.0-alpha.19
  Data visualization made easy. A javascript library that extends the popular D3.js to enable fast and beautiful visualizations.
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-axis'), require('d3plus-color'), require('d3plus-common'), require('d3plus-geomap'), require('d3plus-hierarchy'), require('d3plus-legend'), require('d3plus-network'), require('d3plus-plot'), require('d3plus-priestley'), require('d3plus-shape'), require('d3plus-text'), require('d3plus-timeline'), require('d3plus-tooltip'), require('d3plus-viz')) :
  typeof define === 'function' && define.amd ? define('d3plus', ['exports', 'd3plus-axis', 'd3plus-color', 'd3plus-common', 'd3plus-geomap', 'd3plus-hierarchy', 'd3plus-legend', 'd3plus-network', 'd3plus-plot', 'd3plus-priestley', 'd3plus-shape', 'd3plus-text', 'd3plus-timeline', 'd3plus-tooltip', 'd3plus-viz'], factory) :
  (factory((global.d3plus = {}),global.d3plusAxis,global.d3plusColor,global.d3plusCommon,global.d3plusGeomap,global.d3plusHierarchy,global.d3plusLegend,global.d3plusNetwork,global.d3plusPlot,global.d3plusPriestley,global.d3plusShape,global.d3plusText,global.d3plusTimeline,global.d3plusTooltip,global.d3plusViz));
}(this, (function (exports,d3plusAxis,d3plusColor,d3plusCommon,d3plusGeomap,d3plusHierarchy,d3plusLegend,d3plusNetwork,d3plusPlot,d3plusPriestley,d3plusShape,d3plusText,d3plusTimeline,d3plusTooltip,d3plusViz) { 'use strict';

  var version = "2.0.0-alpha.19";

  exports.Axis = d3plusAxis.Axis;
  exports.AxisBottom = d3plusAxis.AxisBottom;
  exports.AxisLeft = d3plusAxis.AxisLeft;
  exports.AxisRight = d3plusAxis.AxisRight;
  exports.AxisTop = d3plusAxis.AxisTop;
  exports.date = d3plusAxis.date;
  exports.colorAdd = d3plusColor.colorAdd;
  exports.colorAssign = d3plusColor.colorAssign;
  exports.colorContrast = d3plusColor.colorContrast;
  exports.colorDefaults = d3plusColor.colorDefaults;
  exports.colorLegible = d3plusColor.colorLegible;
  exports.colorLighter = d3plusColor.colorLighter;
  exports.colorSubtract = d3plusColor.colorSubtract;
  exports.accessor = d3plusCommon.accessor;
  exports.assign = d3plusCommon.assign;
  exports.attrize = d3plusCommon.attrize;
  exports.BaseClass = d3plusCommon.BaseClass;
  exports.closest = d3plusCommon.closest;
  exports.configPrep = d3plusCommon.configPrep;
  exports.constant = d3plusCommon.constant;
  exports.elem = d3plusCommon.elem;
  exports.isObject = d3plusCommon.isObject;
  exports.merge = d3plusCommon.merge;
  exports.parseSides = d3plusCommon.parseSides;
  exports.prefix = d3plusCommon.prefix;
  exports.stylize = d3plusCommon.stylize;
  exports.uuid = d3plusCommon.uuid;
  exports.Geomap = d3plusGeomap.Geomap;
  exports.Donut = d3plusHierarchy.Donut;
  exports.Pack = d3plusHierarchy.Pack;
  exports.Pie = d3plusHierarchy.Pie;
  exports.Tree = d3plusHierarchy.Tree;
  exports.Treemap = d3plusHierarchy.Treemap;
  exports.ckmeans = d3plusLegend.ckmeans;
  exports.ColorScale = d3plusLegend.ColorScale;
  exports.Legend = d3plusLegend.Legend;
  exports.Network = d3plusNetwork.Network;
  exports.Rings = d3plusNetwork.Rings;
  exports.Sankey = d3plusNetwork.Sankey;
  exports.AreaPlot = d3plusPlot.AreaPlot;
  exports.BarChart = d3plusPlot.BarChart;
  exports.LinePlot = d3plusPlot.LinePlot;
  exports.Plot = d3plusPlot.Plot;
  exports.StackedArea = d3plusPlot.StackedArea;
  exports.Priestley = d3plusPriestley.Priestley;
  exports.Area = d3plusShape.Area;
  exports.Bar = d3plusShape.Bar;
  exports.Box = d3plusShape.Box;
  exports.Circle = d3plusShape.Circle;
  exports.Image = d3plusShape.Image;
  exports.Line = d3plusShape.Line;
  exports.Path = d3plusShape.Path;
  exports.largestRect = d3plusShape.largestRect;
  exports.lineIntersection = d3plusShape.lineIntersection;
  exports.path2polygon = d3plusShape.path2polygon;
  exports.pointDistance = d3plusShape.pointDistance;
  exports.pointDistanceSquared = d3plusShape.pointDistanceSquared;
  exports.pointRotate = d3plusShape.pointRotate;
  exports.polygonInside = d3plusShape.polygonInside;
  exports.polygonRayCast = d3plusShape.polygonRayCast;
  exports.polygonRotate = d3plusShape.polygonRotate;
  exports.segmentBoxContains = d3plusShape.segmentBoxContains;
  exports.segmentsIntersect = d3plusShape.segmentsIntersect;
  exports.shapeEdgePoint = d3plusShape.shapeEdgePoint;
  exports.simplify = d3plusShape.simplify;
  exports.Rect = d3plusShape.Rect;
  exports.Shape = d3plusShape.Shape;
  exports.Whisker = d3plusShape.Whisker;
  exports.fontExists = d3plusText.fontExists;
  exports.rtl = d3plusText.rtl;
  exports.stringify = d3plusText.stringify;
  exports.strip = d3plusText.strip;
  exports.TextBox = d3plusText.TextBox;
  exports.textSplit = d3plusText.textSplit;
  exports.textWidth = d3plusText.textWidth;
  exports.textWrap = d3plusText.textWrap;
  exports.titleCase = d3plusText.titleCase;
  exports.trim = d3plusText.trim;
  exports.trimLeft = d3plusText.trimLeft;
  exports.trimRight = d3plusText.trimRight;
  exports.Timeline = d3plusTimeline.Timeline;
  exports.Tooltip = d3plusTooltip.Tooltip;
  exports.dataFold = d3plusViz.dataFold;
  exports.dataLoad = d3plusViz.dataLoad;
  exports.Viz = d3plusViz.Viz;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus.js.map
