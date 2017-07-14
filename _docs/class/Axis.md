---
name: Axis
kind: class
---

<a name="Axis"></a>

### **Axis** [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L17)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).

* [Axis](#Axis) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new Axis()](#new_Axis_new)
    * [.render([*callback*])](#Axis.render) ↩︎
    * [.align([*value*])](#Axis.align) ↩︎
    * [.barConfig([*value*])](#Axis.barConfig) ↩︎
    * [.domain([*value*])](#Axis.domain) ↩︎
    * [.duration([*value*])](#Axis.duration) ↩︎
    * [.grid([*value*])](#Axis.grid) ↩︎
    * [.gridConfig([*value*])](#Axis.gridConfig) ↩︎
    * [.gridSize([*value*])](#Axis.gridSize) ↩︎
    * [.height([*value*])](#Axis.height) ↩︎
    * [.labels([*value*])](#Axis.labels) ↩︎
    * [.orient([*orient*])](#Axis.orient) ↩︎
    * [.outerBounds()](#Axis.outerBounds)
    * [.padding([*value*])](#Axis.padding) ↩︎
    * [.paddingInner([*value*])](#Axis.paddingInner) ↩︎
    * [.paddingOuter([*value*])](#Axis.paddingOuter) ↩︎
    * [.range([*value*])](#Axis.range) ↩︎
    * [.scale([*value*])](#Axis.scale) ↩︎
    * [.select([*selector*])](#Axis.select) ↩︎
    * [.shape([*value*])](#Axis.shape) ↩︎
    * [.shapeConfig([*value*])](#Axis.shapeConfig) ↩︎
    * [.tickFormat([*value*])](#Axis.tickFormat) ↩︎
    * [.ticks([*value*])](#Axis.ticks) ↩︎
    * [.tickSize([*value*])](#Axis.tickSize) ↩︎
    * [.title([*value*])](#Axis.title) ↩︎
    * [.titleConfig([*value*])](#Axis.titleConfig) ↩︎
    * [.width([*value*])](#Axis.width) ↩︎

<a name="new_Axis_new" href="#new_Axis_new">#</a> new **Axis**()

Creates an SVG scale based on an array of data.



<a name="Axis.render" href="#Axis.render">#</a> Axis.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L132)

Renders the current Axis to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.align" href="#Axis.align">#</a> Axis.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L490)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.barConfig" href="#Axis.barConfig">#</a> Axis.**barConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L500)

If *value* is specified, sets the axis line style and returns the current class instance. If *value* is not specified, returns the current axis line style.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.domain" href="#Axis.domain">#</a> Axis.**domain**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L510)

If *value* is specified, sets the scale domain of the axis and returns the current class instance. If *value* is not specified, returns the current scale domain.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.duration" href="#Axis.duration">#</a> Axis.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L520)

If *value* is specified, sets the transition duration of the axis and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.grid" href="#Axis.grid">#</a> Axis.**grid**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L530)

If *value* is specified, sets the grid values of the axis and returns the current class instance. If *value* is not specified, returns the current grid values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.gridConfig" href="#Axis.gridConfig">#</a> Axis.**gridConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L540)

If *value* is specified, sets the grid style of the axis and returns the current class instance. If *value* is not specified, returns the current grid style.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.gridSize" href="#Axis.gridSize">#</a> Axis.**gridSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L550)

If *value* is specified, sets the grid size of the axis and returns the current class instance. If *value* is not specified, returns the current grid size, which defaults to taking up as much space as available.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.height" href="#Axis.height">#</a> Axis.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L560)

If *value* is specified, sets the overall height of the axis and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.labels" href="#Axis.labels">#</a> Axis.**labels**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L570)

If *value* is specified, sets the visible tick labels of the axis and returns the current class instance. If *value* is not specified, returns the current visible tick labels, which defaults to showing all labels.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.orient" href="#Axis.orient">#</a> Axis.**orient**([*orient*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L580)

If *orient* is specified, sets the orientation of the shape and returns the current class instance. If *orient* is not specified, returns the current orientation.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.outerBounds" href="#Axis.outerBounds">#</a> Axis.**outerBounds**() [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L607)

If called after the elements have been drawn to DOM, will returns the outer bounds of the axis content.


This is a static method of [<code>Axis</code>](#Axis).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```
<a name="Axis.padding" href="#Axis.padding">#</a> Axis.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L617)

If *value* is specified, sets the padding between each tick label to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.paddingInner" href="#Axis.paddingInner">#</a> Axis.**paddingInner**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L627)

If *value* is specified, sets the inner padding of band scale to the specified number and returns the current class instance. If *value* is not specified, returns the current inner padding value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.paddingOuter" href="#Axis.paddingOuter">#</a> Axis.**paddingOuter**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L637)

If *value* is specified, sets the outer padding of band scales to the specified number and returns the current class instance. If *value* is not specified, returns the current outer padding value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.range" href="#Axis.range">#</a> Axis.**range**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L647)

If *value* is specified, sets the scale range (in pixels) of the axis and returns the current class instance. The given array must have 2 values, but one may be `undefined` to allow the default behavior for that value. If *value* is not specified, returns the current scale range.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.scale" href="#Axis.scale">#</a> Axis.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L657)

If *value* is specified, sets the scale of the axis and returns the current class instance. If *value* is not specified, returns the current this._d3Scale


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.select" href="#Axis.select">#</a> Axis.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L667)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.shape" href="#Axis.shape">#</a> Axis.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L677)

If *value* is specified, sets the tick shape constructor and returns the current class instance. If *value* is not specified, returns the current shape.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.shapeConfig" href="#Axis.shapeConfig">#</a> Axis.**shapeConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L687)

If *value* is specified, sets the tick style of the axis and returns the current class instance. If *value* is not specified, returns the current tick style.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.tickFormat" href="#Axis.tickFormat">#</a> Axis.**tickFormat**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L697)

If *value* is specified, sets the tick formatter and returns the current class instance. If *value* is not specified, returns the current tick formatter, which by default is retrieved from the [d3-scale](https://github.com/d3/d3-scale#continuous_tickFormat).


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.ticks" href="#Axis.ticks">#</a> Axis.**ticks**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L707)

If *value* is specified, sets the tick values of the axis and returns the current class instance. If *value* is not specified, returns the current tick values, which by default are interpreted based on the [domain](#Axis.domain) and the available [width](#Axis.width).


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.tickSize" href="#Axis.tickSize">#</a> Axis.**tickSize**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L717)

If *value* is specified, sets the tick size of the axis and returns the current class instance. If *value* is not specified, returns the current tick size.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.title" href="#Axis.title">#</a> Axis.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L727)

If *value* is specified, sets the title of the axis and returns the current class instance. If *value* is not specified, returns the current title.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.titleConfig" href="#Axis.titleConfig">#</a> Axis.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L737)

If *value* is specified, sets the title configuration of the axis and returns the current class instance. If *value* is not specified, returns the current title configuration.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
<a name="Axis.width" href="#Axis.width">#</a> Axis.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-axis/blob/master/src/Axis.js#L747)

If *value* is specified, sets the overall width of the axis and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>Axis</code>](#Axis), and is chainable with other methods of this Class.
