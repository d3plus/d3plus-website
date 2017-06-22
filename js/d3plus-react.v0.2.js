/*
  d3plus-react v0.2.12
  React components for d3plus visualizations.
  Copyright (c) 2017 D3plus - https://d3plus.org
  @license MIT
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3plus-plot'), require('react'), require('prop-types'), require('d3plus-common'), require('d3plus-geomap'), require('d3plus-hierarchy'), require('d3plus-network'), require('d3plus-priestley')) :
	typeof define === 'function' && define.amd ? define('d3plus-react', ['exports', 'd3plus-plot', 'react', 'prop-types', 'd3plus-common', 'd3plus-geomap', 'd3plus-hierarchy', 'd3plus-network', 'd3plus-priestley'], factory) :
	(factory((global.d3plus = global.d3plus || {}),global.d3plusPlot,global.React,global.PropTypes,global.d3plusCommon,global.d3plusGeomap,global.d3plusHierarchy,global.d3plusNetwork,global.d3plusPriestley));
}(this, (function (exports,d3plusPlot,React,PropTypes,d3plusCommon,d3plusGeomap,d3plusHierarchy,d3plusNetwork,d3plusPriestley) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

var typeLookup = {AreaPlot: d3plusPlot.AreaPlot, BarChart: d3plusPlot.BarChart, Donut: d3plusHierarchy.Donut, Geomap: d3plusGeomap.Geomap, LinePlot: d3plusPlot.LinePlot, Network: d3plusNetwork.Network, Pie: d3plusHierarchy.Pie, Plot: d3plusPlot.Plot, Priestley: d3plusPriestley.Priestley, StackedArea: d3plusPlot.StackedArea, Tree: d3plusHierarchy.Tree, Treemap: d3plusHierarchy.Treemap};

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
    var Constructor = typeof type === "string" ? typeLookup[type] : type;

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
    @memberof Viz
    @param {Object} [config = {}] An object containing method/value pairs to be passed to the visualization's .config( ) method.
    @param {Function} [dataFormat = d3plus.dataFold] A custom formatting function to be used when formatting data from an AJAX request. The function will be passed the raw data returned from the request, and is expected to return an array of values used for the data method.
*/
Viz.defaultProps = {type: d3plusHierarchy.Treemap};

/**
    @class AreaPlot
    @extends Viz
*/
var AreaPlot$1 = (function (Shell) {
    function AreaPlot$$1 () {
        Shell.apply(this, arguments);
    }if ( Shell ) AreaPlot$$1.__proto__ = Shell;
    AreaPlot$$1.prototype = Object.create( Shell && Shell.prototype );
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
exports.Viz = Viz;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3plus-react.js.map
