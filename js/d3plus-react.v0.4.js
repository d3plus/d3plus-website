/*
  d3plus-react v0.4.2
  React components for d3plus visualizations.
  Copyright (c) 2018 D3plus - https://d3plus.org
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
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('d3plus-common'), require('d3plus-plot'), require('d3plus-hierarchy'), require('d3plus-geomap'), require('d3plus-network'), require('d3plus-priestley')) :
  typeof define === 'function' && define.amd ? define('d3plus-react', ['exports', 'react', 'prop-types', 'd3plus-common', 'd3plus-plot', 'd3plus-hierarchy', 'd3plus-geomap', 'd3plus-network', 'd3plus-priestley'], factory) :
  (factory((global.d3plus = {}),global.React,global.PropTypes,global.d3plusCommon,global.d3plusPlot,global.d3plusHierarchy,global.d3plusGeomap,global.d3plusNetwork,global.d3plusPriestley));
}(this, (function (exports,React,PropTypes,d3plusCommon,d3plusPlot,d3plusHierarchy,d3plusGeomap,d3plusNetwork,d3plusPriestley) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

  /**
      @class Viz
      @extends React.Component
      @desc Creates SVG paths and coordinate points based on an array of data. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started using the geomap generator.
  */
  var Viz = (function (Component) {
    function Viz () {
      Component.apply(this, arguments);
    }

    if ( Component ) Viz.__proto__ = Component;
    Viz.prototype = Object.create( Component && Component.prototype );
    Viz.prototype.constructor = Viz;

    Viz.prototype.componentDidMount = function componentDidMount () {
      var ref = this.props;
      var Constructor = ref.type;

      this.viz = new Constructor().select(this.container);
      this.renderViz.bind(this)();

    };

    /**
        @memberof Viz
        @desc Updates visualization config on component update.
        @private
    */
    Viz.prototype.componentDidUpdate = function componentDidUpdate (prevProps) {

      var globalConfig = this.context.d3plus || {};
      var ref = this.props;
      var config = ref.config;
      var forceUpdate = ref.forceUpdate;
      var c = d3plusCommon.assign({}, globalConfig, config);
      var c2 = d3plusCommon.assign({}, globalConfig, prevProps.config);

      var same = forceUpdate ? false : JSON.stringify(c) === JSON.stringify(c2);
      if (!same) { this.renderViz.bind(this)(); }

    };

    /**
        @memberof Viz
        @desc Sets visualization config, accounting for dataFormat, and renders the visualization.
        @private
    */
    Viz.prototype.renderViz = function renderViz () {
      var ref = this;
      var viz = ref.viz;
      var ref$1 = this.props;
      var config = ref$1.config;
      var dataFormat = ref$1.dataFormat;
      var globalConfig = this.context.d3plus || {};
      var c = d3plusCommon.assign({}, globalConfig, config);

      if (dataFormat && c.data) { viz.config(c).data(c.data, dataFormat); }
      else { viz.config(c); }
      viz.render();

    };

    /**
        @memberof Viz
        @desc Renders an empty container to hold the visualization.
        @private
    */
    Viz.prototype.render = function render () {
      var this$1 = this;

      var ref = this.props;
      var className = ref.className;
      return React__default.createElement('div', {className: className, ref: function (container) { return this$1.container = container; }});
    };

    return Viz;
  }(React.Component));

  Viz.contextTypes = {d3plus: PropTypes.object};
  Viz.defaultProps = {
    className: "viz",
    forceUpdate: false
  };

  /**
      @class AreaPlot
      @extends Viz
  */
  var AreaPlot = (function (Shell) {
      function AreaPlot () {
          Shell.apply(this, arguments);
      }if ( Shell ) AreaPlot.__proto__ = Shell;
      AreaPlot.prototype = Object.create( Shell && Shell.prototype );
      AreaPlot.prototype.constructor = AreaPlot;

      

      return AreaPlot;
  }(Viz));
  AreaPlot.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.AreaPlot});

  /**
      @class BarChart
      @extends Viz
  */
  var BarChart = (function (Shell) {
      function BarChart () {
          Shell.apply(this, arguments);
      }if ( Shell ) BarChart.__proto__ = Shell;
      BarChart.prototype = Object.create( Shell && Shell.prototype );
      BarChart.prototype.constructor = BarChart;

      

      return BarChart;
  }(Viz));
  BarChart.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.BarChart});

  /**
      @class BumpChart
      @extends Viz
  */
  var BumpChart = (function (Shell) {
      function BumpChart () {
          Shell.apply(this, arguments);
      }if ( Shell ) BumpChart.__proto__ = Shell;
      BumpChart.prototype = Object.create( Shell && Shell.prototype );
      BumpChart.prototype.constructor = BumpChart;

      

      return BumpChart;
  }(Viz));
  BumpChart.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.BumpChart});

  /**
      @class Donut
      @extends Viz
  */
  var Donut = (function (Shell) {
      function Donut () {
          Shell.apply(this, arguments);
      }if ( Shell ) Donut.__proto__ = Shell;
      Donut.prototype = Object.create( Shell && Shell.prototype );
      Donut.prototype.constructor = Donut;

      

      return Donut;
  }(Viz));
  Donut.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusHierarchy.Donut});

  /**
      @class Geomap
      @extends Viz
  */
  var Geomap = (function (Shell) {
      function Geomap () {
          Shell.apply(this, arguments);
      }if ( Shell ) Geomap.__proto__ = Shell;
      Geomap.prototype = Object.create( Shell && Shell.prototype );
      Geomap.prototype.constructor = Geomap;

      

      return Geomap;
  }(Viz));
  Geomap.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusGeomap.Geomap});

  /**
      @class LinePlot
      @extends Viz
  */
  var LinePlot = (function (Shell) {
      function LinePlot () {
          Shell.apply(this, arguments);
      }if ( Shell ) LinePlot.__proto__ = Shell;
      LinePlot.prototype = Object.create( Shell && Shell.prototype );
      LinePlot.prototype.constructor = LinePlot;

      

      return LinePlot;
  }(Viz));
  LinePlot.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.LinePlot});

  /**
      @class Network
      @extends Viz
  */
  var Network = (function (Shell) {
      function Network () {
          Shell.apply(this, arguments);
      }if ( Shell ) Network.__proto__ = Shell;
      Network.prototype = Object.create( Shell && Shell.prototype );
      Network.prototype.constructor = Network;

      

      return Network;
  }(Viz));
  Network.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusNetwork.Network});

  /**
      @class Pie
      @extends Viz
  */
  var Pie = (function (Shell) {
      function Pie () {
          Shell.apply(this, arguments);
      }if ( Shell ) Pie.__proto__ = Shell;
      Pie.prototype = Object.create( Shell && Shell.prototype );
      Pie.prototype.constructor = Pie;

      

      return Pie;
  }(Viz));
  Pie.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusHierarchy.Pie});

  /**
      @class Plot
      @extends Viz
  */
  var Plot = (function (Shell) {
      function Plot () {
          Shell.apply(this, arguments);
      }if ( Shell ) Plot.__proto__ = Shell;
      Plot.prototype = Object.create( Shell && Shell.prototype );
      Plot.prototype.constructor = Plot;

      

      return Plot;
  }(Viz));
  Plot.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.Plot});

  /**
      @class Priestley
      @extends Viz
  */
  var Priestley = (function (Shell) {
      function Priestley () {
          Shell.apply(this, arguments);
      }if ( Shell ) Priestley.__proto__ = Shell;
      Priestley.prototype = Object.create( Shell && Shell.prototype );
      Priestley.prototype.constructor = Priestley;

      

      return Priestley;
  }(Viz));
  Priestley.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPriestley.Priestley});

  /**
      @class Rings
      @extends Viz
  */
  var Rings = (function (Shell) {
      function Rings () {
          Shell.apply(this, arguments);
      }if ( Shell ) Rings.__proto__ = Shell;
      Rings.prototype = Object.create( Shell && Shell.prototype );
      Rings.prototype.constructor = Rings;

      

      return Rings;
  }(Viz));
  Rings.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusNetwork.Rings});

  /**
      @class Sankey
      @extends Viz
  */
  var Sankey = (function (Shell) {
      function Sankey () {
          Shell.apply(this, arguments);
      }if ( Shell ) Sankey.__proto__ = Shell;
      Sankey.prototype = Object.create( Shell && Shell.prototype );
      Sankey.prototype.constructor = Sankey;

      

      return Sankey;
  }(Viz));
  Sankey.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusNetwork.Sankey});

  /**
      @class StackedArea
      @extends Viz
  */
  var StackedArea = (function (Shell) {
      function StackedArea () {
          Shell.apply(this, arguments);
      }if ( Shell ) StackedArea.__proto__ = Shell;
      StackedArea.prototype = Object.create( Shell && Shell.prototype );
      StackedArea.prototype.constructor = StackedArea;

      

      return StackedArea;
  }(Viz));
  StackedArea.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusPlot.StackedArea});

  /**
      @class Tree
      @extends Viz
  */
  var Tree = (function (Shell) {
      function Tree () {
          Shell.apply(this, arguments);
      }if ( Shell ) Tree.__proto__ = Shell;
      Tree.prototype = Object.create( Shell && Shell.prototype );
      Tree.prototype.constructor = Tree;

      

      return Tree;
  }(Viz));
  Tree.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusHierarchy.Tree});

  /**
      @class Treemap
      @extends Viz
  */
  var Treemap = (function (Shell) {
      function Treemap () {
          Shell.apply(this, arguments);
      }if ( Shell ) Treemap.__proto__ = Shell;
      Treemap.prototype = Object.create( Shell && Shell.prototype );
      Treemap.prototype.constructor = Treemap;

      

      return Treemap;
  }(Viz));
  Treemap.defaultProps = Object.assign({}, Viz.defaultProps, {type: d3plusHierarchy.Treemap});

  exports.AreaPlot = AreaPlot;
  exports.BarChart = BarChart;
  exports.BumpChart = BumpChart;
  exports.Donut = Donut;
  exports.Geomap = Geomap;
  exports.LinePlot = LinePlot;
  exports.Network = Network;
  exports.Pie = Pie;
  exports.Plot = Plot;
  exports.Priestley = Priestley;
  exports.Rings = Rings;
  exports.Sankey = Sankey;
  exports.StackedArea = StackedArea;
  exports.Tree = Tree;
  exports.Treemap = Treemap;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-react.js.map
