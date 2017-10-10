---
name: Plot
kind: class
---

  <a name="Plot"></a>

### **Plot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L17)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.barPadding([*value*])](#Plot.barPadding)
    * [.baseline([*value*])](#Plot.baseline)
    * [.discrete([*value*])](#Plot.discrete)
    * [.groupPadding([*value*])](#Plot.groupPadding)
    * [.stacked([*value*])](#Plot.stacked)
    * [.stackOffset([*value*])](#Plot.stackOffset)
    * [.stackOrder([*value*])](#Plot.stackOrder)
    * [.x([*value*])](#Plot.x)
    * [.xConfig([*value*])](#Plot.xConfig)
    * [.x2Config([*value*])](#Plot.x2Config)
    * [.xDomain([*value*])](#Plot.xDomain)
    * [.xSort([*value*])](#Plot.xSort)
    * [.y([*value*])](#Plot.y)
    * [.yConfig([*value*])](#Plot.yConfig)
    * [.y2Config([*value*])](#Plot.y2Config)
    * [.yDomain([*value*])](#Plot.yDomain)
    * [.ySort([*value*])](#Plot.ySort)


<a name="new_Plot_new" href="#new_Plot_new">#</a> new **Plot**()

Creates an x/y plot based on an array of data.





<a name="Plot.barPadding" href="#Plot.barPadding">#</a> Plot.**barPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L485)

Sets the pixel space between each bar in a group of bars.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.baseline" href="#Plot.baseline">#</a> Plot.**baseline**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L494)

If *value* is specified, sets the baseline for the x/y plot and returns the current class instance. If *value* is not specified, returns the current baseline.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.discrete" href="#Plot.discrete">#</a> Plot.**discrete**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L503)

If *value* is specified, sets the discrete axis to the specified string and returns the current class instance. If *value* is not specified, returns the current discrete axis.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.groupPadding" href="#Plot.groupPadding">#</a> Plot.**groupPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L512)

Sets the pixel space between groups of bars.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.stacked" href="#Plot.stacked">#</a> Plot.**stacked**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L521)

If *value* is specified, toggles shape stacking and returns the current class instance. If *value* is not specified, returns the current stack value.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.stackOffset" href="#Plot.stackOffset">#</a> Plot.**stackOffset**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L530)

If *value* is specified, sets the stack offset and returns the current class instance. If *value* is not specified, returns the current stack offset function.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.stackOrder" href="#Plot.stackOrder">#</a> Plot.**stackOrder**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L539)

If *value* is specified, sets the stack order and returns the current class instance. If *value* is not specified, returns the current stack order function.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.x" href="#Plot.x">#</a> Plot.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L548)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.xConfig" href="#Plot.xConfig">#</a> Plot.**xConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L570)

If *value* is specified, sets the config method for the x-axis and returns the current class instance. If *value* is not specified, returns the current x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.x2Config" href="#Plot.x2Config">#</a> Plot.**x2Config**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L579)

If *value* is specified, sets the config method for the secondary x-axis and returns the current class instance. If *value* is not specified, returns the current secondary x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.xDomain" href="#Plot.xDomain">#</a> Plot.**xDomain**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L588)

If *value* is specified, sets the x domain to the specified array and returns the current class instance. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.xSort" href="#Plot.xSort">#</a> Plot.**xSort**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L597)

Defines a custom sorting comparitor function to be used for discrete x axes.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.y" href="#Plot.y">#</a> Plot.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L606)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.yConfig" href="#Plot.yConfig">#</a> Plot.**yConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L630)

If *value* is specified, sets the config method for the y-axis and returns the current class instance. If *value* is not specified, returns the current y-axis configuration.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.y2Config" href="#Plot.y2Config">#</a> Plot.**y2Config**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L644)

If *value* is specified, sets the config method for the secondary y-axis and returns the current class instance. If *value* is not specified, returns the current secondary y-axis configuration.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.yDomain" href="#Plot.yDomain">#</a> Plot.**yDomain**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L653)

If *value* is specified, sets the y domain to the specified array and returns the current class instance. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot).


<a name="Plot.ySort" href="#Plot.ySort">#</a> Plot.**ySort**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L662)

Defines a custom sorting comparitor function to be used for discrete y axes.


This is a static method of [<code>Plot</code>](#Plot).

