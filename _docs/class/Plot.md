---
name: Plot
kind: class
---

  <a name="Plot"></a>

### **Plot** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L21)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Plot](#Plot) ⇐ <code>Viz</code>
    * [new Plot()](#new_Plot_new)
    * [.annotations(*annotations*)](#Plot.annotations) ↩︎
    * [.barPadding(*value*)](#Plot.barPadding) ↩︎
    * [.baseline(*value*)](#Plot.baseline) ↩︎
    * [.discrete(*value*)](#Plot.discrete) ↩︎
    * [.groupPadding([*value*])](#Plot.groupPadding) ↩︎
    * [.size(*value*)](#Plot.size) ↩︎
    * [.sizeMax(*value*)](#Plot.sizeMax) ↩︎
    * [.sizeMin(*value*)](#Plot.sizeMin) ↩︎
    * [.sizeScale(*value*)](#Plot.sizeScale) ↩︎
    * [.stacked(*value*)](#Plot.stacked) ↩︎
    * [.stackOffset(*value*)](#Plot.stackOffset) ↩︎
    * [.stackOrder(*value*)](#Plot.stackOrder) ↩︎
    * [.x(*value*)](#Plot.x) ↩︎
    * [.xConfig(*value*)](#Plot.xConfig) ↩︎
    * [.x2Config(*value*)](#Plot.x2Config) ↩︎
    * [.xDomain(*value*)](#Plot.xDomain) ↩︎
    * [.xSort(*value*)](#Plot.xSort) ↩︎
    * [.y(*value*)](#Plot.y) ↩︎
    * [.yConfig(*value*)](#Plot.yConfig) ↩︎
    * [.y2Config(*value*)](#Plot.y2Config) ↩︎
    * [.yDomain(*value*)](#Plot.yDomain) ↩︎
    * [.ySort(*value*)](#Plot.ySort) ↩︎


<a name="new_Plot_new" href="#new_Plot_new">#</a> new **Plot**()

Creates an x/y plot based on an array of data.





<a name="Plot.annotations" href="#Plot.annotations">#</a> Plot.**annotations**(*annotations*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L521)

Allows drawing custom shapes to be used as annotations in the provided x/y plot. This method accepts custom config objects for the [Shape](http://d3plus.org/docs/#Shape) class, either a single config object or an array of config objects. Each config object requires an additional parameter, the "shape", which denotes which [Shape](http://d3plus.org/docs/#Shape) sub-class to use ([Rect](http://d3plus.org/docs/#Rect), [Line](http://d3plus.org/docs/#Line), etc). Annotations will be drawn underneath the data to be displayed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.barPadding" href="#Plot.barPadding">#</a> Plot.**barPadding**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L531)

Sets the pixel space between each bar in a group of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.baseline" href="#Plot.baseline">#</a> Plot.**baseline**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L541)

Sets the baseline for the x/y plot. If *value* is not specified, returns the current baseline.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.discrete" href="#Plot.discrete">#</a> Plot.**discrete**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L551)

Sets the discrete axis to the specified string. If *value* is not specified, returns the current discrete axis.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.groupPadding" href="#Plot.groupPadding">#</a> Plot.**groupPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L561)

Sets the pixel space between groups of bars.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.size" href="#Plot.size">#</a> Plot.**size**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L571)

Sets the size of bubbles to the given Number, data key, or function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMax" href="#Plot.sizeMax">#</a> Plot.**sizeMax**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L581)

Sets the size scale maximum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeMin" href="#Plot.sizeMin">#</a> Plot.**sizeMin**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L591)

Sets the size scale minimum to the specified number.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.sizeScale" href="#Plot.sizeScale">#</a> Plot.**sizeScale**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L601)

Sets the size scale to the specified string.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stacked" href="#Plot.stacked">#</a> Plot.**stacked**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L611)

If *value* is specified, toggles shape stacking. If *value* is not specified, returns the current stack value.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOffset" href="#Plot.stackOffset">#</a> Plot.**stackOffset**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L621)

Sets the stack offset. If *value* is not specified, returns the current stack offset function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.stackOrder" href="#Plot.stackOrder">#</a> Plot.**stackOrder**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L631)

Sets the stack order. If *value* is not specified, returns the current stack order function.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x" href="#Plot.x">#</a> Plot.**x**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L641)

Sets the x accessor to the specified function or number. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xConfig" href="#Plot.xConfig">#</a> Plot.**xConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L664)

Sets the config method for the x-axis. If *value* is not specified, returns the current x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.x2Config" href="#Plot.x2Config">#</a> Plot.**x2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L674)

Sets the config method for the secondary x-axis. If *value* is not specified, returns the current secondary x-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xDomain" href="#Plot.xDomain">#</a> Plot.**xDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L684)

Sets the x domain to the specified array. If *value* is not specified, returns the current x domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.xSort" href="#Plot.xSort">#</a> Plot.**xSort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L694)

Defines a custom sorting comparitor function to be used for discrete x axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y" href="#Plot.y">#</a> Plot.**y**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L704)

Sets the y accessor to the specified function or number. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yConfig" href="#Plot.yConfig">#</a> Plot.**yConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L729)

Sets the config method for the y-axis. If *value* is not specified, returns the current y-axis configuration.
Note:* If a "domain" array is passed to the y-axis config, it will be reversed.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.y2Config" href="#Plot.y2Config">#</a> Plot.**y2Config**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L744)

Sets the config method for the secondary y-axis. If *value* is not specified, returns the current secondary y-axis configuration.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.yDomain" href="#Plot.yDomain">#</a> Plot.**yDomain**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L754)

Sets the y domain to the specified array. If *value* is not specified, returns the current y domain. Additionally, if either value of the array is undefined, it will be calculated from the data.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.


<a name="Plot.ySort" href="#Plot.ySort">#</a> Plot.**ySort**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Plot.js#L764)

Defines a custom sorting comparitor function to be used for discrete y axes.


This is a static method of [<code>Plot</code>](#Plot), and is chainable with other methods of this Class.

