---
name: Shape
kind: class
---

  <a name="Shape"></a>

### **Shape** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L18)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).


* [Shape](#Shape) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new Shape()](#new_Shape_new)
    * [.render([*callback*])](#Shape.render) ↩︎
    * [.active([*value*])](#Shape.active) ↩︎
    * [.activeOpacity([*value*])](#Shape.activeOpacity) ↩︎
    * [.backgroundImage([*value*])](#Shape.backgroundImage) ↩︎
    * [.data([*data*])](#Shape.data) ↩︎
    * [.duration([*ms*])](#Shape.duration) ↩︎
    * [.fill([*value*])](#Shape.fill) ↩︎
    * [.fillOpacity([*value*])](#Shape.fillOpacity) ↩︎
    * [.hover([*value*])](#Shape.hover) ↩︎
    * [.hoverOpacity([*value*])](#Shape.hoverOpacity) ↩︎
    * [.hitArea([*bounds*])](#Shape.hitArea) ↩︎
    * [.id([*value*])](#Shape.id) ↩︎
    * [.label([*value*])](#Shape.label) ↩︎
    * [.labelBounds([*bounds*])](#Shape.labelBounds) ↩︎
    * [.labelConfig([*value*])](#Shape.labelConfig) ↩︎
    * [.labelPadding([*value*])](#Shape.labelPadding) ↩︎
    * [.opacity([*value*])](#Shape.opacity) ↩︎
    * [.rx([*value*])](#Shape.rx) ↩︎
    * [.ry([*value*])](#Shape.ry) ↩︎
    * [.scale([*value*])](#Shape.scale) ↩︎
    * [.select([*selector*])](#Shape.select) ↩︎
    * [.shapeRendering([*value*])](#Shape.shapeRendering) ↩︎
    * [.sort([*value*])](#Shape.sort) ↩︎
    * [.stroke([*value*])](#Shape.stroke) ↩︎
    * [.strokeDasharray([*value*])](#Shape.strokeDasharray) ↩︎
    * [.strokeLinecap([*value*])](#Shape.strokeLinecap) ↩︎
    * [.strokeOpacity([*value*])](#Shape.strokeOpacity) ↩︎
    * [.strokeWidth([*value*])](#Shape.strokeWidth) ↩︎
    * [.textAnchor([*value*])](#Shape.textAnchor) ↩︎
    * [.vectorEffect([*value*])](#Shape.vectorEffect) ↩︎
    * [.verticalAlign([*value*])](#Shape.verticalAlign) ↩︎
    * [.x([*value*])](#Shape.x) ↩︎
    * [.y([*value*])](#Shape.y) ↩︎


<a name="new_Shape_new" href="#new_Shape_new">#</a> new **Shape**()

An abstracted class for generating shapes.





<a name="Shape.render" href="#Shape.render">#</a> Shape.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L367)

Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.active" href="#Shape.active">#</a> Shape.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L463)

If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.activeOpacity" href="#Shape.activeOpacity">#</a> Shape.**activeOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L516)

If *value* is specified, sets the active opacity to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.backgroundImage" href="#Shape.backgroundImage">#</a> Shape.**backgroundImage**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L526)

If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.data" href="#Shape.data">#</a> Shape.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L538)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.duration" href="#Shape.duration">#</a> Shape.**duration**([*ms*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L550)

If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.fill" href="#Shape.fill">#</a> Shape.**fill**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L562)

If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.fillOpacity" href="#Shape.fillOpacity">#</a> Shape.**fillOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L574)

Defines the "fill-opacity" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hover" href="#Shape.hover">#</a> Shape.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L586)

If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hoverOpacity" href="#Shape.hoverOpacity">#</a> Shape.**hoverOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L633)

If *value* is specified, sets the hover opacity to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hitArea" href="#Shape.hitArea">#</a> Shape.**hitArea**([*bounds*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L652)

If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
```


<a name="Shape.id" href="#Shape.id">#</a> Shape.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L662)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.label" href="#Shape.label">#</a> Shape.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L672)

If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.labelBounds" href="#Shape.labelBounds">#</a> Shape.**labelBounds**([*bounds*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L691)

If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
```


<a name="Shape.labelConfig" href="#Shape.labelConfig">#</a> Shape.**labelConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L701)

A pass-through to the config method of the TextBox class used to create a shape's labels.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.labelPadding" href="#Shape.labelPadding">#</a> Shape.**labelPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L711)

If *value* is specified, sets the label padding to the specified number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.opacity" href="#Shape.opacity">#</a> Shape.**opacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L721)

If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.rx" href="#Shape.rx">#</a> Shape.**rx**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L731)

Defines the "rx" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.ry" href="#Shape.ry">#</a> Shape.**ry**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L741)

Defines the "rx" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.scale" href="#Shape.scale">#</a> Shape.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L751)

If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.select" href="#Shape.select">#</a> Shape.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L761)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.shapeRendering" href="#Shape.shapeRendering">#</a> Shape.**shapeRendering**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L775)

If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Shape.sort" href="#Shape.sort">#</a> Shape.**sort**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L785)

If *value* is specified, sets the sort comparator to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.stroke" href="#Shape.stroke">#</a> Shape.**stroke**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L795)

If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeDasharray" href="#Shape.strokeDasharray">#</a> Shape.**strokeDasharray**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L805)

Defines the "stroke-dasharray" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeLinecap" href="#Shape.strokeLinecap">#</a> Shape.**strokeLinecap**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L815)

Defines the "stroke-linecap" attribute for the shapes. Accepted values are `"butt"`, `"round"`, and `"square"`.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeOpacity" href="#Shape.strokeOpacity">#</a> Shape.**strokeOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L825)

Defines the "stroke-opacity" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeWidth" href="#Shape.strokeWidth">#</a> Shape.**strokeWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L835)

If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.textAnchor" href="#Shape.textAnchor">#</a> Shape.**textAnchor**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L845)

If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.vectorEffect" href="#Shape.vectorEffect">#</a> Shape.**vectorEffect**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L855)

If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.verticalAlign" href="#Shape.verticalAlign">#</a> Shape.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L865)

If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.x" href="#Shape.x">#</a> Shape.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L879)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Shape.y" href="#Shape.y">#</a> Shape.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L893)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y;
}
```

