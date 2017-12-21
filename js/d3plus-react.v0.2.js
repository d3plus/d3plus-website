/*
  d3plus-react v0.2.21
  React components for d3plus visualizations.
  Copyright (c) 2017 D3plus - https://d3plus.org
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

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-plot'), require('react'), require('prop-types'), require('d3plus-common'), require('d3plus-hierarchy'), require('d3plus-geomap'), require('d3plus-network'), require('d3plus-priestley')) :
	typeof define === 'function' && define.amd ? define('d3plus-react', ['exports', 'd3plus-plot', 'react', 'prop-types', 'd3plus-common', 'd3plus-hierarchy', 'd3plus-geomap', 'd3plus-network', 'd3plus-priestley'], factory) :
	(factory((global.d3plus = {}),global.d3plusPlot,global.React,global.PropTypes,global.d3plusCommon,global.d3plusHierarchy,global.d3plusGeomap,global.d3plusNetwork,global.d3plusPriestley));
}(this, (function (exports,d3plusPlot,React,PropTypes,d3plusCommon,d3plusHierarchy,d3plusGeomap,d3plusNetwork,d3plusPriestley) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

/**
    @class Viz
    @extends React.Component
    @desc Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.
*/
var Viz = (function (superclass) {
  function Viz () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) Viz.__proto__ = superclass;
  Viz.prototype = Object.create( superclass && superclass.prototype );
  Viz.prototype.constructor = Viz;

  Viz.prototype.componentDidMount = function componentDidMount () {

    var ref = this.props;
    var type = ref.type;
    var Constructor = type;

    var viz = new Constructor()
      .select(this.container);

    this.setState({viz: viz});
  };

  /**
      @memberof Viz
      @desc Updates visualization config on component update.
      @private
  */
  Viz.prototype.componentDidUpdate = function componentDidUpdate () {

    var ref = this.context;
    var d3plus = ref.d3plus;
    var ref$1 = this.props;
    var config = ref$1.config;
    var dataFormat = ref$1.dataFormat;
    var ref$2 = this.state;
    var viz = ref$2.viz;

    if (dataFormat && config.data) {
      viz
        .config(d3plusCommon.assign({}, d3plus || {}, config, {data: []}))
        .data(config.data, dataFormat);
    }
    else { viz.config(d3plusCommon.assign({}, d3plus || {}, config)); }

    viz.render();

  };

  /**
      @memberof Viz
      @desc Renders an empty container to hold the visualization.
      @private
  */
  Viz.prototype.render = function render () {
    var this$1 = this;

    return React.createElement('div', {className: "viz", ref: function (container) { return this$1.container = container; }});
  };

  return Viz;
}(React.Component));

Viz.contextTypes = {d3plus: PropTypes.object};

/**
    @class AreaPlot
    @extends Viz
*/
var AreaPlot$1 = (function (Shell$$1) {
    function AreaPlot$$1 () {
        Shell$$1.apply(this, arguments);
    }if ( Shell$$1 ) AreaPlot$$1.__proto__ = Shell$$1;
    AreaPlot$$1.prototype = Object.create( Shell$$1 && Shell$$1.prototype );
    AreaPlot$$1.prototype.constructor = AreaPlot$$1;

    

    return AreaPlot$$1;
}(Viz));
AreaPlot$1.defaultProps = {type: d3plusPlot.AreaPlot};

/**
    @class BarChart
    @extends Viz
*/
var BarChart$1 = (function (Shell) {
    function BarChart$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) BarChart$$1.__proto__ = Shell;
    BarChart$$1.prototype = Object.create( Shell && Shell.prototype );
    BarChart$$1.prototype.constructor = BarChart$$1;

    

    return BarChart$$1;
}(Viz));
BarChart$1.defaultProps = {type: d3plusPlot.BarChart};

/**
    @class Donut
    @extends Viz
*/
var Donut$1 = (function (Shell) {
    function Donut$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Donut$$1.__proto__ = Shell;
    Donut$$1.prototype = Object.create( Shell && Shell.prototype );
    Donut$$1.prototype.constructor = Donut$$1;

    

    return Donut$$1;
}(Viz));
Donut$1.defaultProps = {type: d3plusHierarchy.Donut};

/**
    @class Geomap
    @extends Viz
*/
var Geomap$1 = (function (Shell) {
    function Geomap$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Geomap$$1.__proto__ = Shell;
    Geomap$$1.prototype = Object.create( Shell && Shell.prototype );
    Geomap$$1.prototype.constructor = Geomap$$1;

    

    return Geomap$$1;
}(Viz));
Geomap$1.defaultProps = {type: d3plusGeomap.Geomap};

/**
    @class LinePlot
    @extends Viz
*/
var LinePlot$1 = (function (Shell) {
    function LinePlot$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) LinePlot$$1.__proto__ = Shell;
    LinePlot$$1.prototype = Object.create( Shell && Shell.prototype );
    LinePlot$$1.prototype.constructor = LinePlot$$1;

    

    return LinePlot$$1;
}(Viz));
LinePlot$1.defaultProps = {type: d3plusPlot.LinePlot};

/**
    @class Network
    @extends Viz
*/
var Network$1 = (function (Shell) {
    function Network$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Network$$1.__proto__ = Shell;
    Network$$1.prototype = Object.create( Shell && Shell.prototype );
    Network$$1.prototype.constructor = Network$$1;

    

    return Network$$1;
}(Viz));
Network$1.defaultProps = {type: d3plusNetwork.Network};

/**
    @class Pie
    @extends Viz
*/
var Pie$1 = (function (Shell) {
    function Pie$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Pie$$1.__proto__ = Shell;
    Pie$$1.prototype = Object.create( Shell && Shell.prototype );
    Pie$$1.prototype.constructor = Pie$$1;

    

    return Pie$$1;
}(Viz));
Pie$1.defaultProps = {type: d3plusHierarchy.Pie};

/**
    @class Plot
    @extends Viz
*/
var Plot$1 = (function (Shell) {
    function Plot$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Plot$$1.__proto__ = Shell;
    Plot$$1.prototype = Object.create( Shell && Shell.prototype );
    Plot$$1.prototype.constructor = Plot$$1;

    

    return Plot$$1;
}(Viz));
Plot$1.defaultProps = {type: d3plusPlot.Plot};

/**
    @class Priestley
    @extends Viz
*/
var Priestley$1 = (function (Shell) {
    function Priestley$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Priestley$$1.__proto__ = Shell;
    Priestley$$1.prototype = Object.create( Shell && Shell.prototype );
    Priestley$$1.prototype.constructor = Priestley$$1;

    

    return Priestley$$1;
}(Viz));
Priestley$1.defaultProps = {type: d3plusPriestley.Priestley};

/**
    @class StackedArea
    @extends Viz
*/
var StackedArea$1 = (function (Shell) {
    function StackedArea$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) StackedArea$$1.__proto__ = Shell;
    StackedArea$$1.prototype = Object.create( Shell && Shell.prototype );
    StackedArea$$1.prototype.constructor = StackedArea$$1;

    

    return StackedArea$$1;
}(Viz));
StackedArea$1.defaultProps = {type: d3plusPlot.StackedArea};

/**
    @class Tree
    @extends Viz
*/
var Tree$1 = (function (Shell) {
    function Tree$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Tree$$1.__proto__ = Shell;
    Tree$$1.prototype = Object.create( Shell && Shell.prototype );
    Tree$$1.prototype.constructor = Tree$$1;

    

    return Tree$$1;
}(Viz));
Tree$1.defaultProps = {type: d3plusHierarchy.Tree};

/**
    @class Treemap
    @extends Viz
*/
var Treemap$1 = (function (Shell) {
    function Treemap$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) Treemap$$1.__proto__ = Shell;
    Treemap$$1.prototype = Object.create( Shell && Shell.prototype );
    Treemap$$1.prototype.constructor = Treemap$$1;

    

    return Treemap$$1;
}(Viz));
Treemap$1.defaultProps = {type: d3plusHierarchy.Treemap};

exports.AreaPlot = AreaPlot$1;
exports.BarChart = BarChart$1;
exports.Donut = Donut$1;
exports.Geomap = Geomap$1;
exports.LinePlot = LinePlot$1;
exports.Network = Network$1;
exports.Pie = Pie$1;
exports.Plot = Plot$1;
exports.Priestley = Priestley$1;
exports.StackedArea = StackedArea$1;
exports.Tree = Tree$1;
exports.Treemap = Treemap$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-react.js.map
