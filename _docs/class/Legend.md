---
name: Legend
kind: class
---

  <a name="Legend"></a>

### **Legend** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L13)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).


* [Legend](#Legend) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new Legend()](#new_Legend_new)
    * [.render([*callback*])](#Legend.render) ↩︎
    * [.active([*value*])](#Legend.active) ↩︎
    * [.align([*value*])](#Legend.align) ↩︎
    * [.data([*data*])](#Legend.data) ↩︎
    * [.direction([*value*])](#Legend.direction) ↩︎
    * [.duration([*value*])](#Legend.duration) ↩︎
    * [.height([*value*])](#Legend.height) ↩︎
    * [.hover([*value*])](#Legend.hover) ↩︎
    * [.id([*value*])](#Legend.id) ↩︎
    * [.label([*value*])](#Legend.label) ↩︎
    * [.outerBounds()](#Legend.outerBounds)
    * [.padding([*value*])](#Legend.padding) ↩︎
    * [.select([*selector*])](#Legend.select) ↩︎
    * [.shape([*value*])](#Legend.shape) ↩︎
    * [.shapeConfig([*config*])](#Legend.shapeConfig) ↩︎
    * [.title([*value*])](#Legend.title) ↩︎
    * [.titleConfig([*value*])](#Legend.titleConfig) ↩︎
    * [.verticalAlign([*value*])](#Legend.verticalAlign) ↩︎
    * [.width([*value*])](#Legend.width) ↩︎


<a name="new_Legend_new" href="#new_Legend_new">#</a> new **Legend**()

Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.





<a name="Legend.render" href="#Legend.render">#</a> Legend.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L110)

Renders the current Legend to the page. If a *callback* is specified, it will be called once the legend is done drawing.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.active" href="#Legend.active">#</a> Legend.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L358)

If *value* is specified, sets the active method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current active method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.align" href="#Legend.align">#</a> Legend.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L369)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.data" href="#Legend.data">#</a> Legend.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L379)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.direction" href="#Legend.direction">#</a> Legend.**direction**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L389)

Sets the flow of the items inside the legend. If no value is passed, the current flow will be returned.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.duration" href="#Legend.duration">#</a> Legend.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L399)

If *value* is specified, sets the transition duration of the legend and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.height" href="#Legend.height">#</a> Legend.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L409)

If *value* is specified, sets the overall height of the legend and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.hover" href="#Legend.hover">#</a> Legend.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L419)

If *value* is specified, sets the hover method for all shapes to the specified function and returns the current class instance. If *value* is not specified, returns the current hover method.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.id" href="#Legend.id">#</a> Legend.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L434)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.id;
}
```


<a name="Legend.label" href="#Legend.label">#</a> Legend.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L444)

If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current label accessor, which is the [id](#shape.id) accessor by default.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.outerBounds" href="#Legend.outerBounds">#</a> Legend.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L454)

If called after the elements have been drawn to DOM, will returns the outer bounds of the legend content.


This is a static method of [<code>Legend</code>](#Legend).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="Legend.padding" href="#Legend.padding">#</a> Legend.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L464)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.select" href="#Legend.select">#</a> Legend.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L474)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shape" href="#Legend.shape">#</a> Legend.**shape**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L484)

If *value* is specified, sets the shape accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape accessor.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.shapeConfig" href="#Legend.shapeConfig">#</a> Legend.**shapeConfig**([*config*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L494)

If *config* is specified, sets the methods that correspond to the key/value pairs for each shape and returns the current class instance. If *config* is not specified, returns the current shape configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.title" href="#Legend.title">#</a> Legend.**title**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L504)

If *value* is specified, sets the title of the legend and returns the current class instance. If *value* is not specified, returns the current title.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.titleConfig" href="#Legend.titleConfig">#</a> Legend.**titleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L514)

If *value* is specified, sets the title configuration of the legend and returns the current class instance. If *value* is not specified, returns the current title configuration.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.verticalAlign" href="#Legend.verticalAlign">#</a> Legend.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L524)

If *value* is specified, sets the vertical alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current vertical alignment.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.


<a name="Legend.width" href="#Legend.width">#</a> Legend.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/Legend.js#L534)

If *value* is specified, sets the overall width of the legend and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>Legend</code>](#Legend), and is chainable with other methods of this Class.

