/*
  d3plus-network v0.5.11
  Javascript network visualizations built upon d3 modules.
  Copyright (c) 2019 D3plus - https://d3plus.org
  @license MIT
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-force'), require('d3-polygon'), require('d3-scale'), require('d3-zoom'), require('d3plus-common'), require('d3plus-shape'), require('d3plus-viz'), require('d3plus-color'), require('d3-sankey')) :
  typeof define === 'function' && define.amd ? define('d3plus-network', ['exports', 'd3-array', 'd3-collection', 'd3-force', 'd3-polygon', 'd3-scale', 'd3-zoom', 'd3plus-common', 'd3plus-shape', 'd3plus-viz', 'd3plus-color', 'd3-sankey'], factory) :
  (global = global || self, factory(global.d3plus = {}, global.d3Array, global.d3Collection, global.d3Force, global.d3Polygon, global.scales, global.d3Zoom, global.d3plusCommon, global.shapes, global.d3plusViz, global.d3plusColor, global.d3Sankey));
}(this, function (exports, d3Array, d3Collection, d3Force, d3Polygon, scales, d3Zoom, d3plusCommon, shapes, d3plusViz, d3plusColor, d3Sankey) { 'use strict';

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

  /**
      @class Network
      @extends external:Viz
      @desc Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.
  */

  var Network =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Network, _Viz);

    /**
        @memberof Network
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Network() {
      var _this;

      _classCallCheck(this, Network);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Network).call(this));
      _this._links = [];
      _this._linkSize = d3plusCommon.constant(1);
      _this._linkSizeMin = 1;
      _this._linkSizeScale = "sqrt";
      _this._noDataMessage = false;
      _this._nodes = [];

      _this._on["click.shape"] = function (d, i) {
        _this._tooltipClass.data([]).render();

        if (_this._hover && _this._drawDepth >= _this._groupBy.length - 1) {
          var id = "".concat(_this._nodeGroupBy && _this._nodeGroupBy[_this._drawDepth](d, i) ? _this._nodeGroupBy[_this._drawDepth](d, i) : _this._id(d, i));

          if (_this._focus && _this._focus === id) {
            _this.active(false);

            _this._on.mouseenter.bind(_assertThisInitialized(_this))(d, i);

            _this._focus = undefined;

            _this._zoomToBounds(null);
          } else {
            _this.hover(false);

            var links = _this._linkLookup[id],
                node = _this._nodeLookup[id];
            var filterIds = [id];
            var xDomain = [node.x - node.r, node.x + node.r],
                yDomain = [node.y - node.r, node.y + node.r];
            links.forEach(function (l) {
              filterIds.push(l.id);
              if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
              if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
              if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
              if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
            });

            _this.active(function (h, x) {
              if (h.source && h.target) return h.source.id === id || h.target.id === id;else return filterIds.includes("".concat(_this._ids(h, x)[_this._drawDepth]));
            });

            _this._focus = id;
            var t = d3Zoom.zoomTransform(_this._container.node());
            xDomain = xDomain.map(function (d) {
              return d * t.k + t.x;
            });
            yDomain = yDomain.map(function (d) {
              return d * t.k + t.y;
            });

            _this._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);
          }
        }
      };

      _this._on["click.legend"] = function (d, i) {
        var ids = _this._id(d);

        var id = _this._ids(d);

        id = id[id.length - 1];

        if (_this._hover && _this._drawDepth >= _this._groupBy.length - 1) {
          if (_this._focus && _this._focus === ids) {
            _this.active(false);

            _this._focus = undefined;

            _this._zoomToBounds(null);
          } else {
            _this.hover(false);

            var nodes = ids.map(function (id) {
              return _this._nodeLookup[id];
            });
            var filterIds = ["".concat(id)];
            var xDomain = [nodes[0].x - nodes[0].r, nodes[0].x + nodes[0].r],
                yDomain = [nodes[0].y - nodes[0].r, nodes[0].y + nodes[0].r];
            nodes.forEach(function (l) {
              filterIds.push(l.id);
              if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
              if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
              if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
              if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
            });

            _this.active(function (h, x) {
              if (h.source && h.target) return filterIds.includes(h.source.id) && filterIds.includes(h.target.id);else {
                var myIds = _this._ids(h, x);

                return filterIds.includes("".concat(myIds[myIds.length - 1]));
              }
            });

            _this._focus = ids;
            var t = d3Zoom.zoomTransform(_this._container.node());
            xDomain = xDomain.map(function (d) {
              return d * t.k + t.x;
            });
            yDomain = yDomain.map(function (d) {
              return d * t.k + t.y;
            });

            _this._zoomToBounds([[xDomain[0], yDomain[0]], [xDomain[1], yDomain[1]]]);
          }

          _this._on.mouseenter.bind(_assertThisInitialized(_this))(d, i);

          _this._on["mousemove.legend"].bind(_assertThisInitialized(_this))(d, i);
        }
      };

      _this._on.mouseenter = function () {};

      _this._on["mouseleave.shape"] = function () {
        _this.hover(false);
      };

      var defaultMouseMove = _this._on["mousemove.shape"];

      _this._on["mousemove.shape"] = function (d, i) {
        defaultMouseMove(d, i);
        var id = "".concat(_this._nodeGroupBy && _this._nodeGroupBy[_this._drawDepth](d, i) ? _this._nodeGroupBy[_this._drawDepth](d, i) : _this._id(d, i)),
            links = _this._linkLookup[id],
            node = _this._nodeLookup[id];
        var filterIds = [id];
        var xDomain = [node.x - node.r, node.x + node.r],
            yDomain = [node.y - node.r, node.y + node.r];
        links.forEach(function (l) {
          filterIds.push(l.id);
          if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
          if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
          if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
          if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
        });

        _this.hover(function (h, x) {
          if (h.source && h.target) return h.source.id === id || h.target.id === id;else return filterIds.includes("".concat(_this._ids(h, x)[_this._drawDepth]));
        });
      };

      _this._sizeMin = 5;
      _this._sizeScale = "sqrt";
      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          var validSize = _this._size ? ", ".concat(_this._size(d, i)) : "";
          return "".concat(_this._drawLabel(d, i)).concat(validSize, ".");
        },
        labelConfig: {
          duration: 0,
          fontMin: 1,
          fontResize: true,
          labelPadding: 0,
          textAnchor: "middle",
          verticalAlign: "middle"
        },
        Path: {
          fill: "none",
          label: false,
          stroke: "#eee"
        }
      });
      _this._x = d3plusCommon.accessor("x");
      _this._y = d3plusCommon.accessor("y");
      _this._zoom = true;
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Network, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Network.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")"),
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;

        var data = this._filteredData.reduce(function (obj, d, i) {
          obj[_this2._id(d, i)] = d;
          return obj;
        }, {});

        var nodes = this._nodes.reduce(function (obj, d, i) {
          obj[_this2._nodeGroupBy ? _this2._nodeGroupBy[_this2._drawDepth](d, i) : d.id] = d;
          return obj;
        }, {});

        nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map(function (id, i) {
          var d = data[id],
              n = nodes[id];
          if (n === undefined) return false;
          return {
            __d3plus__: true,
            data: d || n,
            i: i,
            id: id,
            fx: d !== undefined && _this2._x(d) !== undefined ? _this2._x(d) : _this2._x(n),
            fy: d !== undefined && _this2._y(d) !== undefined ? _this2._y(d) : _this2._y(n),
            node: n,
            r: _this2._size ? d !== undefined && _this2._size(d) !== undefined ? _this2._size(d) : _this2._size(n) : _this2._sizeMin,
            shape: d !== undefined && _this2._shape(d) !== undefined ? _this2._shape(d) : _this2._shape(n)
          };
        }).filter(function (n) {
          return n;
        });
        var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d) {
          obj[d.id] = d;
          return obj;
        }, {});
        var nodeIndices = nodes.map(function (n) {
          return n.node;
        });

        var links = this._links.map(function (l) {
          var referenceType = _typeof(l.source);

          return {
            size: _this2._linkSize(l),
            source: referenceType === "number" ? nodes[nodeIndices.indexOf(_this2._nodes[l.source])] : referenceType === "string" ? nodeLookup[l.source] : nodeLookup[l.source.id],
            target: referenceType === "number" ? nodes[nodeIndices.indexOf(_this2._nodes[l.target])] : referenceType === "string" ? nodeLookup[l.target] : nodeLookup[l.target.id]
          };
        });

        this._linkLookup = links.reduce(function (obj, d) {
          if (!obj[d.source.id]) obj[d.source.id] = [];
          obj[d.source.id].push(d.target);
          if (!obj[d.target.id]) obj[d.target.id] = [];
          obj[d.target.id].push(d.source);
          return obj;
        }, {});
        var missingCoords = nodes.some(function (n) {
          return n.fx === undefined || n.fy === undefined;
        });

        if (missingCoords) {
          var linkStrength = scales.scaleLinear().domain(d3Array.extent(links, function (d) {
            return d.size;
          })).range([0.1, 0.5]);
          var simulation = d3Force.forceSimulation().force("link", d3Force.forceLink(links).id(function (d) {
            return d.id;
          }).distance(1).strength(function (d) {
            return linkStrength(d.size);
          }).iterations(4)).force("charge", d3Force.forceManyBody().strength(-1)).stop();
          var iterations = 300;
          var alphaMin = 0.001;
          var alphaDecay = 1 - Math.pow(alphaMin, 1 / iterations);
          simulation.velocityDecay(0);
          simulation.alphaMin(alphaMin);
          simulation.alphaDecay(alphaDecay);
          simulation.alphaDecay(0);
          simulation.nodes(nodes);
          simulation.tick(iterations).stop();
          var hull = d3Polygon.polygonHull(nodes.map(function (n) {
            return [n.vx, n.vy];
          }));

          var _shapes$largestRect = shapes.largestRect(hull),
              angle = _shapes$largestRect.angle,
              cx = _shapes$largestRect.cx,
              cy = _shapes$largestRect.cy;

          nodes.forEach(function (n) {
            var p = shapes.pointRotate([n.vx, n.vy], -1 * (Math.PI / 180 * angle), [cx, cy]);
            n.fx = p[0];
            n.fy = p[1];
          });
        }

        var xExtent = d3Array.extent(nodes.map(function (n) {
          return n.fx;
        })),
            yExtent = d3Array.extent(nodes.map(function (n) {
          return n.fy;
        }));
        var x = scales.scaleLinear().domain(xExtent).range([0, width]),
            y = scales.scaleLinear().domain(yExtent).range([0, height]);
        var nodeRatio = (xExtent[1] - xExtent[0]) / (yExtent[1] - yExtent[0]),
            screenRatio = width / height;

        if (nodeRatio > screenRatio) {
          var h = height * screenRatio / nodeRatio;
          y.range([(height - h) / 2, height - (height - h) / 2]);
        } else {
          var w = width * nodeRatio / screenRatio;
          x.range([(width - w) / 2, width - (width - w) / 2]);
        }

        nodes.forEach(function (n) {
          n.x = x(n.fx);
          n.y = y(n.fy);
        });
        var rExtent = d3Array.extent(nodes.map(function (n) {
          return n.r;
        }));
        var rMax = this._sizeMax || d3Array.max([1, d3Array.min(d3Array.merge(nodes.map(function (n1) {
          return nodes.map(function (n2) {
            return n1 === n2 ? null : shapes.pointDistance([n1.x, n1.y], [n2.x, n2.y]);
          });
        }))) / 2]);
        var r = scales["scale".concat(this._sizeScale.charAt(0).toUpperCase()).concat(this._sizeScale.slice(1))]().domain(rExtent).range([rExtent[0] === rExtent[1] ? rMax : d3Array.min([rMax / 2, this._sizeMin]), rMax]),
            xDomain = x.domain(),
            yDomain = y.domain();
        var xOldSize = xDomain[1] - xDomain[0],
            yOldSize = yDomain[1] - yDomain[0];
        nodes.forEach(function (n) {
          var size = r(n.r);
          if (xDomain[0] > x.invert(n.x - size)) xDomain[0] = x.invert(n.x - size);
          if (xDomain[1] < x.invert(n.x + size)) xDomain[1] = x.invert(n.x + size);
          if (yDomain[0] > y.invert(n.y - size)) yDomain[0] = y.invert(n.y - size);
          if (yDomain[1] < y.invert(n.y + size)) yDomain[1] = y.invert(n.y + size);
        });
        var xNewSize = xDomain[1] - xDomain[0],
            yNewSize = yDomain[1] - yDomain[0];
        rMax *= d3Array.min([xOldSize / xNewSize, yOldSize / yNewSize]);
        r.range([rExtent[0] === rExtent[1] ? rMax : d3Array.min([rMax / 2, this._sizeMin]), rMax]);
        x.domain(xDomain);
        y.domain(yDomain);
        nodes.forEach(function (n) {
          n.x = x(n.fx);
          n.fx = n.x;
          n.y = y(n.fy);
          n.fy = n.y;
          n.r = r(n.r);
          n.width = n.r * 2;
          n.height = n.r * 2;
        });
        this._container = this._select.selectAll("svg.d3plus-network").data([0]);
        this._container = this._container.enter().append("svg").attr("class", "d3plus-network").attr("opacity", 0).attr("width", width).attr("height", height).attr("x", this._margin.left).attr("y", this._margin.top).style("background-color", "transparent").merge(this._container);

        this._container.transition(this._transition).attr("opacity", 1).attr("width", width).attr("height", height).attr("x", this._margin.left).attr("y", this._margin.top);

        var hitArea = this._container.selectAll("rect.d3plus-network-hitArea").data([0]);

        hitArea.enter().append("rect").attr("class", "d3plus-network-hitArea").merge(hitArea).attr("width", width).attr("height", height).attr("fill", "transparent").on("click", function () {
          if (_this2._focus) {
            _this2.active(false);

            _this2._focus = undefined;

            _this2._zoomToBounds(null);
          }
        });
        this._zoomGroup = this._container.selectAll("g.d3plus-network-zoomGroup").data([0]);

        var parent = this._zoomGroup = this._zoomGroup.enter().append("g").attr("class", "d3plus-network-zoomGroup").merge(this._zoomGroup);

        var strokeExtent = d3Array.extent(links, function (d) {
          return d.size;
        });

        if (strokeExtent[0] !== strokeExtent[1]) {
          var strokeScale = scales["scale".concat(this._linkSizeScale.charAt(0).toUpperCase()).concat(this._linkSizeScale.slice(1))]().domain(strokeExtent).range([this._linkSizeMin, r.range()[0]]);
          links.forEach(function (link) {
            link.size = strokeScale(link.size);
          });
        }

        var linkConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "edge", "Path");
        delete linkConfig.on;

        this._shapes.push(new shapes.Path().config(linkConfig).strokeWidth(function (d) {
          return d.size;
        }).activeStyle({
          "stroke-width": function strokeWidth(d) {
            return d.size;
          }
        }).d(function (d) {
          return "M".concat(d.source.x, ",").concat(d.source.y, " ").concat(d.target.x, ",").concat(d.target.y);
        }).data(links).select(d3plusCommon.elem("g.d3plus-network-links", {
          parent: parent,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render());

        var shapeConfig = {
          label: function label(d) {
            return nodes.length <= _this2._dataCutoff || _this2._hover && _this2._hover(d) || _this2._active && _this2._active(d) ? _this2._drawLabel(d.data || d.node, d.i) : false;
          },
          select: d3plusCommon.elem("g.d3plus-network-nodes", {
            parent: parent,
            transition: transition,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          }).node()
        };
        d3Collection.nest().key(function (d) {
          return d.shape;
        }).entries(nodes).forEach(function (d) {
          _this2._shapes.push(new shapes[d.key]().config(d3plusCommon.configPrep.bind(_this2)(_this2._shapeConfig, "shape", d.key)).config(shapeConfig).config(shapeConfig[d.key] || {}).data(d.values).render());
        });
        return this;
      }
      /**
          @memberof Network
          @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
       */

    }, {
      key: "hover",
      value: function hover(_) {
        this._hover = _;

        if (this._nodes.length < this._dataCutoff) {
          this._shapes.forEach(function (s) {
            return s.hover(_);
          });

          if (this._legend) this._legendClass.hover(_);
        }

        return this;
      }
      /**
          @memberof Network
          @desc A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
      1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
      2. The actual node *Object* itself.
      3. A *String* value matching the `id` of the node.
      The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
          @param {Array|String} *links* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "links",
      value: function links(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "links";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._links;
      }
      /**
          @memberof Network
          @desc Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.
          @param {Function|Name} [*value* = 1]
          @chainable
      */

    }, {
      key: "linkSize",
      value: function linkSize(_) {
        return arguments.length ? (this._linkSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._linkSize;
      }
      /**
          @memberof Network
          @desc Defines the minimum pixel stroke width used in link sizing.
          @param {Number} [*value* = 2]
          @chainable
      */

    }, {
      key: "linkSizeMin",
      value: function linkSizeMin(_) {
        return arguments.length ? (this._linkSizeMin = _, this) : this._linkSizeMin;
      }
      /**
          @memberof Network
          @desc Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.
          @param {String} [*value* = "sqrt"]
          @chainable
      */

    }, {
      key: "linkSizeScale",
      value: function linkSizeScale(_) {
        return arguments.length ? (this._linkSizeScale = _, this) : this._linkSizeScale;
      }
      /**
          @memberof Network
          @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
          @param {String|Function|Array} [*value* = undefined]
          @chainable
      */

    }, {
      key: "nodeGroupBy",
      value: function nodeGroupBy(_) {
        var _this3 = this;

        if (!arguments.length) return this._nodeGroupBy;
        if (!(_ instanceof Array)) _ = [_];
        return this._nodeGroupBy = _.map(function (k) {
          if (typeof k === "function") return k;else {
            if (!_this3._aggs[k]) {
              _this3._aggs[k] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }

            return d3plusCommon.accessor(k);
          }
        }), this;
      }
      /**
          @memberof Network
          @desc The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
          @param {Array|String} *nodes* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "nodes",
      value: function nodes(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "nodes";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._nodes;
      }
      /**
          @memberof Network
          @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "size",
      value: function size(_) {
        return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
      }
      /**
          @memberof Network
          @desc Defines the maximum pixel radius used in size scaling. By default, the maximum size is determined by half the distance of the two closest nodes.
          @param {Number} [*value*]
          @chainable
      */

    }, {
      key: "sizeMax",
      value: function sizeMax(_) {
        return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
      }
      /**
          @memberof Network
          @desc Defines the minimum pixel radius used in size scaling.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "sizeMin",
      value: function sizeMin(_) {
        return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
      }
      /**
          @memberof Network
          @desc Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of nodes in the network.
          @param {String} [*value* = "sqrt"]
          @chainable
      */

    }, {
      key: "sizeScale",
      value: function sizeScale(_) {
        return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
      }
      /**
          @memberof Network
          @desc If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "x",
      value: function x(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._x = _;else {
            this._x = d3plusCommon.accessor(_);
            if (!this._aggs[_]) this._aggs[_] = function (a) {
              return d3Array.mean(a);
            };
          }
          return this;
        } else return this._x;
      }
      /**
          @memberof Network
          @desc If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "y",
      value: function y(_) {
        if (arguments.length) {
          if (typeof _ === "function") this._y = _;else {
            this._y = d3plusCommon.accessor(_);
            if (!this._aggs[_]) this._aggs[_] = function (a) {
              return d3Array.mean(a);
            };
          }
          return this;
        } else return this._y;
      }
    }]);

    return Network;
  }(d3plusViz.Viz);

  /**
      @class Rings
      @extends external:Viz
      @desc Creates a ring visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/simple-rings/) for help getting started using the Rings class.
  */

  var Rings =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Rings, _Viz);

    /**
        @memberof Rings
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Rings() {
      var _this;

      _classCallCheck(this, Rings);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rings).call(this));
      _this._links = [];
      _this._linkSize = d3plusCommon.constant(1);
      _this._linkSizeMin = 1;
      _this._linkSizeScale = "sqrt";
      _this._noDataMessage = false;
      _this._nodes = [];

      _this._on.mouseenter = function () {};

      _this._on["mouseleave.shape"] = function () {
        _this.hover(false);
      };

      var defaultMouseMove = _this._on["mousemove.shape"];

      _this._on["mousemove.shape"] = function (d, i) {
        defaultMouseMove(d, i);

        if (_this._focus && _this._focus === d.id) {
          _this.hover(false);

          _this._on.mouseenter.bind(_assertThisInitialized(_this))(d, i);

          _this._focus = undefined;
        } else {
          var id = _this._nodeGroupBy && _this._nodeGroupBy[_this._drawDepth](d, i) ? _this._nodeGroupBy[_this._drawDepth](d, i) : _this._id(d, i),
              links = _this._linkLookup[id],
              node = _this._nodeLookup[id];
          var filterIds = [node.id];
          var xDomain = [node.x - node.r, node.x + node.r],
              yDomain = [node.y - node.r, node.y + node.r];
          links.forEach(function (l) {
            filterIds.push(l.id);
            if (l.x - l.r < xDomain[0]) xDomain[0] = l.x - l.r;
            if (l.x + l.r > xDomain[1]) xDomain[1] = l.x + l.r;
            if (l.y - l.r < yDomain[0]) yDomain[0] = l.y - l.r;
            if (l.y + l.r > yDomain[1]) yDomain[1] = l.y + l.r;
          });

          _this.hover(function (h, x) {
            if (h.source && h.target) return h.source.id === node.id || h.target.id === node.id;else return filterIds.includes(_this._ids(h, x)[_this._drawDepth]);
          });
        }
      };

      _this._on["click.shape"] = function (d) {
        _this._center = d.id;

        _this._draw();
      };

      _this._sizeMin = 5;
      _this._sizeScale = "sqrt";
      _this._shape = d3plusCommon.constant("Circle");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        ariaLabel: function ariaLabel(d, i) {
          var validSize = _this._size ? ", ".concat(_this._size(d, i)) : "";
          return "".concat(_this._drawLabel(d, i)).concat(validSize, ".");
        },
        labelConfig: {
          duration: 0,
          fontMin: 1,
          fontResize: true,
          labelPadding: 0,
          textAnchor: "middle",
          verticalAlign: "middle"
        },
        Path: {
          fill: "none",
          label: false,
          stroke: "#eee",
          strokeWidth: 1
        }
      });
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Rings, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Rings.prototype), "_draw", this).call(this, callback);

        var data = this._filteredData.reduce(function (obj, d, i) {
          obj[_this2._id(d, i)] = d;
          return obj;
        }, {});

        var nodes = this._nodes;

        if (!this._nodes.length && this._links.length) {
          var nodeIds = Array.from(new Set(this._links.reduce(function (ids, link) {
            return ids.concat([link.source, link.target]);
          }, [])));
          nodes = nodeIds.map(function (node) {
            return _typeof(node) === "object" ? node : {
              id: node
            };
          });
        }

        nodes = nodes.reduce(function (obj, d, i) {
          obj[_this2._nodeGroupBy ? _this2._nodeGroupBy[_this2._drawDepth](d, i) : _this2._id(d, i)] = d;
          return obj;
        }, {});
        nodes = Array.from(new Set(Object.keys(data).concat(Object.keys(nodes)))).map(function (id, i) {
          var d = data[id],
              n = nodes[id];
          if (n === undefined) return false;
          return {
            __d3plus__: true,
            data: d || n,
            i: i,
            id: id,
            node: n,
            shape: d !== undefined && _this2._shape(d) !== undefined ? _this2._shape(d) : _this2._shape(n)
          };
        }).filter(function (n) {
          return n;
        });
        var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d) {
          obj[d.id] = d;
          return obj;
        }, {});

        var links = this._links.map(function (link) {
          var check = ["source", "target"];
          var edge = check.reduce(function (result, check) {
            result[check] = typeof link[check] === "number" ? nodes[link[check]] : nodeLookup[link[check].id || link[check]];
            return result;
          }, {});
          edge.size = _this2._linkSize(link);
          return edge;
        });

        var linkMap = links.reduce(function (map, link) {
          if (!map[link.source.id]) {
            map[link.source.id] = [];
          }

          map[link.source.id].push(link);

          if (!map[link.target.id]) {
            map[link.target.id] = [];
          }

          map[link.target.id].push(link);
          return map;
        }, {});
        var height = this._height - this._margin.top - this._margin.bottom,
            transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")"),
            transition = this._transition,
            width = this._width - this._margin.left - this._margin.right;
        var edges = [],
            radius = d3Array.min([height, width]) / 2,
            ringWidth = radius / 3;
        var primaryRing = ringWidth,
            secondaryRing = ringWidth * 2;
        var center = nodeLookup[this._center];
        center.x = width / 2;
        center.y = height / 2;
        center.r = this._sizeMin ? d3Array.max([this._sizeMin, primaryRing * .65]) : this._sizeMax ? d3Array.min([this._sizeMax, primaryRing * .65]) : primaryRing * .65;
        var claimed = [center],
            primaries = [];

        linkMap[this._center].forEach(function (edge) {
          var node = edge.source.id === _this2._center ? edge.target : edge.source;
          node.edges = linkMap[node.id].filter(function (link) {
            return link.source.id !== _this2._center || link.target.id !== _this2._center;
          });
          node.edge = edge;
          claimed.push(node);
          primaries.push(node);
        });

        primaries.sort(function (a, b) {
          return a.edges.length - b.edges.length;
        });
        var secondaries = [];
        var totalEndNodes = 0;
        primaries.forEach(function (p) {
          var primaryId = p.id;
          p.edges = p.edges.filter(function (edge) {
            return !claimed.includes(edge.source) && edge.target.id === primaryId || !claimed.includes(edge.target) && edge.source.id === primaryId;
          });
          totalEndNodes += p.edges.length || 1;
          p.edges.forEach(function (edge) {
            var source = edge.source,
                target = edge.target;
            var claim = target.id === primaryId ? source : target;
            claimed.push(claim);
          });
        });
        var tau = Math.PI * 2;
        var offset = 0;
        primaries.forEach(function (p, i) {
          var children = p.edges.length || 1;
          var space = tau / totalEndNodes * children;

          if (i === 0) {
            offset -= space / 2;
          }

          var angle = offset + space / 2 - tau / 4;
          p.radians = angle;
          p.x = width / 2 + primaryRing * Math.cos(angle);
          p.y = height / 2 + primaryRing * Math.sin(angle);
          offset += space;
          p.edges.forEach(function (edge, i) {
            var node = edge.source.id === p.id ? edge.target : edge.source;
            var s = tau / totalEndNodes;
            var a = angle - s * children / 2 + s / 2 + s * i;
            node.radians = a;
            node.x = width / 2 + secondaryRing * Math.cos(a);
            node.y = height / 2 + secondaryRing * Math.sin(a);
            secondaries.push(node);
          });
        });
        var primaryDistance = ringWidth / 2;
        var secondaryDistance = ringWidth / 4;
        var primaryMax = primaryDistance / 2 - 4;

        if (primaryDistance / 2 - 4 < 8) {
          primaryMax = d3Array.min([primaryDistance / 2, 8]);
        }

        var secondaryMax = secondaryDistance / 2 - 4;

        if (secondaryDistance / 2 - 4 < 4) {
          secondaryMax = d3Array.min([secondaryDistance / 2, 4]);
        }

        if (secondaryMax > ringWidth / 10) {
          secondaryMax = ringWidth / 10;
        }

        if (secondaryMax > primaryMax && secondaryMax > 10) {
          secondaryMax = primaryMax * .75;
        }

        if (primaryMax > secondaryMax * 1.5) {
          primaryMax = secondaryMax * 1.5;
        }

        primaryMax = Math.floor(primaryMax);
        secondaryMax = Math.floor(secondaryMax);
        var radiusFn;

        if (this._size) {
          var domain = d3Array.extent(data, function (d) {
            return d.size;
          });

          if (domain[0] === domain[1]) {
            domain[0] = 0;
          }

          radiusFn = scales.scaleLinear().domain(domain).rangeRound([3, d3Array.min([primaryMax, secondaryMax])]);
          var val = center.size;
          center.r = radiusFn(val);
        } else {
          radiusFn = scales.scaleLinear().domain([1, 2]).rangeRound([primaryMax, secondaryMax]);
        }

        secondaries.forEach(function (s) {
          s.ring = 2;
          var val = _this2._size ? s.size : 2;
          s.r = _this2._sizeMin ? d3Array.max([_this2._sizeMin, radiusFn(val)]) : _this2._sizeMax ? d3Array.min([_this2._sizeMax, radiusFn(val)]) : radiusFn(val);
        });
        primaries.forEach(function (p) {
          p.ring = 1;
          var val = _this2._size ? p.size : 1;
          p.r = _this2._sizeMin ? d3Array.max([_this2._sizeMin, radiusFn(val)]) : _this2._sizeMax ? d3Array.min([_this2._sizeMax, radiusFn(val)]) : radiusFn(val);
        });
        nodes = [center].concat(primaries).concat(secondaries);
        primaries.forEach(function (p) {
          var check = ["source", "target"];
          var edge = p.edge;
          check.forEach(function (node) {
            edge[node] = nodes.find(function (n) {
              return n.id === edge[node].id;
            });
          });
          edges.push(edge);
          linkMap[p.id].forEach(function (edge) {
            var node = edge.source.id === p.id ? edge.target : edge.source;

            if (node.id !== center.id) {
              var target = secondaries.find(function (s) {
                return s.id === node.id;
              });

              if (!target) {
                target = primaries.find(function (s) {
                  return s.id === node.id;
                });
              }

              if (target) {
                edge.spline = true;
                var centerX = width / 2;
                var centerY = height / 2;
                var middleRing = primaryRing + (secondaryRing - primaryRing) * 0.5;
                var _check = ["source", "target"];

                _check.forEach(function (node, i) {
                  edge["".concat(node, "X")] = edge[node].x + Math.cos(edge[node].ring === 2 ? edge[node].radians + Math.PI : edge[node].radians) * edge[node].r;
                  edge["".concat(node, "Y")] = edge[node].y + Math.sin(edge[node].ring === 2 ? edge[node].radians + Math.PI : edge[node].radians) * edge[node].r;
                  edge["".concat(node, "BisectX")] = centerX + middleRing * Math.cos(edge[node].radians);
                  edge["".concat(node, "BisectY")] = centerY + middleRing * Math.sin(edge[node].radians);
                  edge[node] = nodes.find(function (n) {
                    return n.id === edge[node].id;
                  });
                  if (edge[node].edges === undefined) edge[node].edges = {};
                  var oppId = i === 0 ? edge.target.id : edge.source.id;

                  if (edge[node].id === p.id) {
                    edge[node].edges[oppId] = {
                      angle: p.radians + Math.PI,
                      radius: ringWidth / 2
                    };
                  } else {
                    edge[node].edges[oppId] = {
                      angle: target.radians,
                      radius: ringWidth / 2
                    };
                  }
                });

                edges.push(edge);
              }
            }
          });
        });
        nodes.forEach(function (node) {
          if (node.id !== _this2._center) {
            var fontSize = _this2._shapeConfig.labelConfig.fontSize && _this2._shapeConfig.labelConfig.fontSize(node) || 11;
            var lineHeight = fontSize * 1.4;

            var _height = lineHeight * 2;

            var padding = 5;

            var _width = ringWidth - node.r;

            var angle = node.radians * (180 / Math.PI);
            var x = node.r + padding;
            var textAnchor = "start";

            if (angle < -90 || angle > 90) {
              x = -node.r - _width - padding;
              textAnchor = "end";
              angle += 180;
            }

            node.labelBounds = {
              x: x,
              y: -lineHeight / 2,
              width: _width,
              height: _height
            };
            node.rotate = angle;
            node.textAnchor = textAnchor;
          } else {
            node.labelBounds = {
              x: -primaryRing / 2,
              y: -primaryRing / 2,
              width: primaryRing,
              height: primaryRing
            };
          }
        });
        this._linkLookup = links.reduce(function (obj, d) {
          if (!obj[d.source.id]) obj[d.source.id] = [];
          obj[d.source.id].push(d.target);
          if (!obj[d.target.id]) obj[d.target.id] = [];
          obj[d.target.id].push(d.source);
          return obj;
        }, {});
        var strokeExtent = d3Array.extent(links, function (d) {
          return d.size;
        });

        if (strokeExtent[0] !== strokeExtent[1]) {
          var _radius = d3Array.min(nodes, function (d) {
            return d.r;
          });

          var strokeScale = scales["scale".concat(this._linkSizeScale.charAt(0).toUpperCase()).concat(this._linkSizeScale.slice(1))]().domain(strokeExtent).range([this._linkSizeMin, _radius]);
          links.forEach(function (link) {
            link.size = strokeScale(link.size);
          });
        }

        var linkConfig = d3plusCommon.configPrep.bind(this)(this._shapeConfig, "edge", "Path");
        delete linkConfig.on;

        this._shapes.push(new shapes.Path().config(linkConfig).strokeWidth(function (d) {
          return d.size;
        }).id(function (d) {
          return "".concat(d.source.id, "_").concat(d.target.id);
        }).d(function (d) {
          return d.spline ? "M".concat(d.sourceX, ",").concat(d.sourceY, "C").concat(d.sourceBisectX, ",").concat(d.sourceBisectY, " ").concat(d.targetBisectX, ",").concat(d.targetBisectY, " ").concat(d.targetX, ",").concat(d.targetY) : "M".concat(d.source.x, ",").concat(d.source.y, " ").concat(d.target.x, ",").concat(d.target.y);
        }).data(edges).select(d3plusCommon.elem("g.d3plus-rings-links", {
          parent: this._select,
          transition: transition,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render());

        var that = this;
        var shapeConfig = {
          label: function label(d) {
            return nodes.length <= _this2._dataCutoff || _this2._hover && _this2._hover(d) || _this2._active && _this2._active(d) ? _this2._drawLabel(d.data || d.node, d.i) : false;
          },
          labelBounds: function labelBounds(d) {
            return d.labelBounds;
          },
          labelConfig: {
            fontColor: function fontColor(d) {
              return d.id === _this2._center ? d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.fontColor(d) : d3plusColor.colorLegible(d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).fill(d));
            },
            fontResize: function fontResize(d) {
              return d.id === _this2._center;
            },
            padding: 0,
            textAnchor: function textAnchor(d) {
              return nodeLookup[d.id].textAnchor || d3plusCommon.configPrep.bind(that)(that._shapeConfig, "shape", d.key).labelConfig.textAnchor;
            },
            verticalAlign: function verticalAlign(d) {
              return d.id === _this2._center ? "middle" : "top";
            }
          },
          rotate: function rotate(d) {
            return nodeLookup[d.id].rotate || 0;
          },
          select: d3plusCommon.elem("g.d3plus-rings-nodes", {
            parent: this._select,
            transition: transition,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          }).node()
        };
        d3Collection.nest().key(function (d) {
          return d.shape;
        }).entries(nodes).forEach(function (d) {
          _this2._shapes.push(new shapes[d.key]().config(d3plusCommon.configPrep.bind(_this2)(_this2._shapeConfig, "shape", d.key)).config(shapeConfig).data(d.values).render());
        });
        return this;
      }
      /**
       @memberof Rings
       @desc Sets the center node to be the node with the given id.
       @param {String}
       @chainable
       */

    }, {
      key: "center",
      value: function center(_) {
        return arguments.length ? (this._center = _, this) : this._center;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
       */

    }, {
      key: "hover",
      value: function hover(_) {
        this._hover = _;

        this._shapes.forEach(function (s) {
          return s.hover(_);
        });

        if (this._legend) this._legendClass.hover(_);
        return this;
      }
      /**
          @memberof Rings
          @desc A predefined *Array* of edges that connect each object passed to the [node](#Rings.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
      1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
      2. The actual node *Object* itself.
      3. A *String* value matching the `id` of the node.
      The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
          @param {Array|String} *links* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "links",
      value: function links(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "links";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._links;
      }
      /**
          @memberof Network
          @desc Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.
          @param {Function|Name} [*value* = 1]
          @chainable
      */

    }, {
      key: "linkSize",
      value: function linkSize(_) {
        return arguments.length ? (this._linkSize = typeof _ === "function" ? _ : d3plusCommon.constant(_), this) : this._linkSize;
      }
      /**
          @memberof Network
          @desc Defines the minimum pixel stroke width used in link sizing.
          @param {Number} [*value* = 2]
          @chainable
      */

    }, {
      key: "linkSizeMin",
      value: function linkSizeMin(_) {
        return arguments.length ? (this._linkSizeMin = _, this) : this._linkSizeMin;
      }
      /**
          @memberof Network
          @desc Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.
          @param {String} [*value* = "sqrt"]
          @chainable
      */

    }, {
      key: "linkSizeScale",
      value: function linkSizeScale(_) {
        return arguments.length ? (this._linkSizeScale = _, this) : this._linkSizeScale;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.
          @param {String|Function|Array} [*value* = undefined]
          @chainable
      */

    }, {
      key: "nodeGroupBy",
      value: function nodeGroupBy(_) {
        var _this3 = this;

        if (!arguments.length) return this._nodeGroupBy;
        if (!(_ instanceof Array)) _ = [_];
        return this._nodeGroupBy = _.map(function (k) {
          if (typeof k === "function") return k;else {
            if (!_this3._aggs[k]) {
              _this3._aggs[k] = function (a) {
                var v = Array.from(new Set(a));
                return v.length === 1 ? v[0] : v;
              };
            }

            return d3plusCommon.accessor(k);
          }
        }), this;
      }
      /**
          @memberof Rings
          @desc The list of nodes to be used for drawing the rings network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
          @param {Array|String} *nodes* = []
          @param {Function} [*formatter*]
          @chainable
      */

    }, {
      key: "nodes",
      value: function nodes(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "nodes";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._nodes;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.
          @param {Function|String} [*value*]
          @chainable
      */

    }, {
      key: "size",
      value: function size(_) {
        return arguments.length ? (this._size = typeof _ === "function" || !_ ? _ : d3plusCommon.accessor(_), this) : this._size;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.
          @param {Number} [*value*]
          @chainable
      */

    }, {
      key: "sizeMax",
      value: function sizeMax(_) {
        return arguments.length ? (this._sizeMax = _, this) : this._sizeMax;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.
          @param {Number} [*value* = 5]
          @chainable
      */

    }, {
      key: "sizeMin",
      value: function sizeMin(_) {
        return arguments.length ? (this._sizeMin = _, this) : this._sizeMin;
      }
      /**
          @memberof Rings
          @desc If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.
          @param {String} [*value* = "sqrt"]
          @chainable
      */

    }, {
      key: "sizeScale",
      value: function sizeScale(_) {
        return arguments.length ? (this._sizeScale = _, this) : this._sizeScale;
      }
    }]);

    return Rings;
  }(d3plusViz.Viz);

  var sankeyAligns = {
    center: d3Sankey.sankeyCenter,
    justify: d3Sankey.sankeyJustify,
    left: d3Sankey.sankeyLeft,
    right: d3Sankey.sankeyRight
  };
  /**
      @class Sankey
      @extends external:Viz
      @desc Creates a sankey visualization based on a defined set of nodes and links. [Click here](http://d3plus.org/examples/d3plus-network/sankey-diagram/) for help getting started using the Sankey class.
  */

  var Sankey =
  /*#__PURE__*/
  function (_Viz) {
    _inherits(Sankey, _Viz);

    /**
        @memberof Sankey
        @desc Invoked when creating a new class instance, and sets any default parameters.
        @private
    */
    function Sankey() {
      var _this;

      _classCallCheck(this, Sankey);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Sankey).call(this));
      _this._nodeId = d3plusCommon.accessor("id");
      _this._links = d3plusCommon.accessor("links");
      _this._linksSource = "source";
      _this._linksTarget = "target";
      _this._noDataMessage = false;
      _this._nodes = d3plusCommon.accessor("nodes");
      _this._nodeAlign = sankeyAligns.justify;
      _this._nodePadding = 8;
      _this._nodeWidth = 30;

      _this._on.mouseenter = function () {};

      _this._on["mouseleave.shape"] = function () {
        _this.hover(false);
      };

      var defaultMouseMove = _this._on["mousemove.shape"];

      _this._on["mousemove.shape"] = function (d, i) {
        defaultMouseMove(d, i);

        if (_this._focus && _this._focus === d.id) {
          _this.hover(false);

          _this._on.mouseenter.bind(_assertThisInitialized(_this))(d, i);

          _this._focus = undefined;
        } else {
          var id = _this._nodeId(d, i),
              node = _this._nodeLookup[id],
              nodeLookup = Object.keys(_this._nodeLookup).reduce(function (all, item) {
            all[_this._nodeLookup[item]] = !isNaN(item) ? parseInt(item, 10) : item;
            return all;
          }, {});

          var links = _this._linkLookup[node];
          var filterIds = [id];
          links.forEach(function (l) {
            filterIds.push(nodeLookup[l]);
          });

          _this.hover(function (h, x) {
            if (h.source && h.target) {
              return h.source.id === id || h.target.id === id;
            } else {
              return filterIds.includes(_this._nodeId(h, x));
            }
          });
        }
      };

      _this._path = d3Sankey.sankeyLinkHorizontal();
      _this._sankey = d3Sankey.sankey();
      _this._shape = d3plusCommon.constant("Rect");
      _this._shapeConfig = d3plusCommon.assign(_this._shapeConfig, {
        Path: {
          fill: "none",
          hoverStyle: {
            "stroke-width": function strokeWidth(d) {
              return Math.max(1, Math.abs(d.source.y1 - d.source.y0) * (d.value / d.source.value) - 2);
            }
          },
          label: false,
          stroke: "#DBDBDB",
          strokeOpacity: 0.5,
          strokeWidth: function strokeWidth(d) {
            return Math.max(1, Math.abs(d.source.y1 - d.source.y0) * (d.value / d.source.value) - 2);
          }
        },
        Rect: {}
      });
      _this._value = d3plusCommon.constant(1);
      return _this;
    }
    /**
        Extends the draw behavior of the abstract Viz class.
        @private
    */


    _createClass(Sankey, [{
      key: "_draw",
      value: function _draw(callback) {
        var _this2 = this;

        _get(_getPrototypeOf(Sankey.prototype), "_draw", this).call(this, callback);

        var height = this._height - this._margin.top - this._margin.bottom,
            width = this._width - this._margin.left - this._margin.right;

        var _nodes = Array.isArray(this._nodes) ? this._nodes : this._links.reduce(function (all, d) {
          if (!all.includes(d[_this2._linksSource])) all.push(d[_this2._linksSource]);
          if (!all.includes(d[_this2._linksTarget])) all.push(d[_this2._linksTarget]);
          return all;
        }, []).map(function (id) {
          return {
            id: id
          };
        });

        var nodes = _nodes.map(function (n, i) {
          return {
            __d3plus__: true,
            data: n,
            i: i,
            id: _this2._nodeId(n, i),
            node: n,
            shape: "Rect"
          };
        });

        var nodeLookup = this._nodeLookup = nodes.reduce(function (obj, d, i) {
          obj[d.id] = i;
          return obj;
        }, {});

        var links = this._links.map(function (link, i) {
          var check = [_this2._linksSource, _this2._linksTarget];
          var linkLookup = check.reduce(function (result, item) {
            result[item] = nodeLookup[link[item]];
            return result;
          }, {});
          return {
            source: linkLookup[_this2._linksSource],
            target: linkLookup[_this2._linksTarget],
            value: _this2._value(link, i)
          };
        });

        this._linkLookup = links.reduce(function (obj, d) {
          if (!obj[d.source]) obj[d.source] = [];
          obj[d.source].push(d.target);
          if (!obj[d.target]) obj[d.target] = [];
          obj[d.target].push(d.source);
          return obj;
        }, {});
        var transform = "translate(".concat(this._margin.left, ", ").concat(this._margin.top, ")");

        this._sankey.nodeAlign(this._nodeAlign).nodePadding(this._nodePadding).nodeWidth(this._nodeWidth).nodes(nodes).links(links).size([width, height])();

        this._shapes.push(new shapes.Path().config(this._shapeConfig.Path).data(links).d(this._path).select(d3plusCommon.elem("g.d3plus-Links", {
          parent: this._select,
          enter: {
            transform: transform
          },
          update: {
            transform: transform
          }
        }).node()).render());

        d3Collection.nest().key(function (d) {
          return d.shape;
        }).entries(nodes).forEach(function (d) {
          _this2._shapes.push(new shapes[d.key]().data(d.values).height(function (d) {
            return d.y1 - d.y0;
          }).width(function (d) {
            return d.x1 - d.x0;
          }).x(function (d) {
            return (d.x1 + d.x0) / 2;
          }).y(function (d) {
            return (d.y1 + d.y0) / 2;
          }).select(d3plusCommon.elem("g.d3plus-sankey-nodes", {
            parent: _this2._select,
            enter: {
              transform: transform
            },
            update: {
              transform: transform
            }
          }).node()).config(d3plusCommon.configPrep.bind(_this2)(_this2._shapeConfig, "shape", d.key)).render());
        });
        return this;
      }
      /**
          @memberof Sankey
          @desc If *value* is specified, sets the hover method to the specified function and returns the current class instance.
          @param {Function} [*value*]
          @chainable
       */

    }, {
      key: "hover",
      value: function hover(_) {
        this._hover = _;

        this._shapes.forEach(function (s) {
          return s.hover(_);
        });

        if (this._legend) this._legendClass.hover(_);
        return this;
      }
      /**
          @memberof Sankey
          @desc A predefined *Array* of edges that connect each object passed to the [node](#Sankey.node) method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
      1. A *String* value matching the `id` of the node.
      The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.
          @param {Array} *links* = []
          @chainable
      */

    }, {
      key: "links",
      value: function links(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "links";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "links"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._links;
      }
      /**
          @memberof Sankey
          @desc The key inside of each link Object that references the source node.
          @param {String} [*value* = "source"]
          @chainable
      */

    }, {
      key: "linksSource",
      value: function linksSource(_) {
        return arguments.length ? (this._linksSource = _, this) : this._linksSource;
      }
      /**
          @memberof Sankey
          @desc The key inside of each link Object that references the target node.
          @param {String} [*value* = "target"]
          @chainable
      */

    }, {
      key: "linksTarget",
      value: function linksTarget(_) {
        return arguments.length ? (this._linksTarget = _, this) : this._linksTarget;
      }
      /**
          @memberof Sankey
          @desc Sets the nodeAlign property of the sankey layout, which can either be "left", "right", "center", or "justify".
          @param {Function|String} [*value* = "justify"]
          @chainable
      */

    }, {
      key: "nodeAlign",
      value: function nodeAlign(_) {
        return arguments.length ? (this._nodeAlign = typeof _ === "function" ? _ : sankeyAligns[_], this) : this._nodeAlign;
      }
      /**
          @memberof Sankey
          @desc If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.
          @param {String} [*value* = "id"]
          @chainable
      */

    }, {
      key: "nodeId",
      value: function nodeId(_) {
        return arguments.length ? (this._nodeId = typeof _ === "function" ? _ : d3plusCommon.accessor(_), this) : this._nodeId;
      }
      /**
          @memberof Sankey
          @desc The list of nodes to be used for drawing the network. The value passed must be an *Array* of data.
      Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.
          @param {Array} *nodes* = []
          @chainable
      */

    }, {
      key: "nodes",
      value: function nodes(_, f) {
        if (arguments.length) {
          var prev = this._queue.find(function (q) {
            return q[3] === "nodes";
          });

          var d = [d3plusViz.dataLoad.bind(this), _, f, "nodes"];
          if (prev) this._queue[this._queue.indexOf(prev)] = d;else this._queue.push(d);
          return this;
        }

        return this._nodes;
      }
      /**
          @memberof Sankey
          @desc If *value* is specified, sets the padding of the node and returns the current class instance. If *value* is not specified, returns the current nodePadding. By default, the nodePadding size is 8.
          @param {Number} [*value* = 8]
          @chainable
      */

    }, {
      key: "nodePadding",
      value: function nodePadding(_) {
        return arguments.length ? (this._nodePadding = _, this) : this._nodePadding;
      }
      /**
          @memberof Sankey
          @desc If *value* is specified, sets the width of the node and returns the current class instance. If *value* is not specified, returns the current nodeWidth. By default, the nodeWidth size is 30.
          @param {Number} [*value* = 30]
          @chainable
      */

    }, {
      key: "nodeWidth",
      value: function nodeWidth(_) {
        return arguments.length ? (this._nodeWidth = _, this) : this._nodeWidth;
      }
      /**
          @memberof Sankey
          @desc If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.
          @param {Function|Number} *value*
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

    return Sankey;
  }(d3plusViz.Viz);

  exports.Network = Network;
  exports.Rings = Rings;
  exports.Sankey = Sankey;

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
//# sourceMappingURL=d3plus-network.js.map
