---
name: Whisker
kind: class
---

<a name="Whisker"></a>

### **Whisker** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L12)


This is a global class, and extends all of the methods and functionality of <code>BaseClass</code>.


* [Whisker](#Whisker) ⇐ <code>BaseClass</code>
    * [new Whisker()](#new_Whisker_new)
    * [.render([*callback*])](#Whisker.render) ↩︎
    * [.active([*value*])](#Whisker.active) ↩︎
    * [.data([*data*])](#Whisker.data) ↩︎
    * [.endpoint(_)](#Whisker.endpoint) ↩︎
    * [.endpointConfig([*value*])](#Whisker.endpointConfig) ↩︎
    * [.hover([*value*])](#Whisker.hover) ↩︎
    * [.length([*value*])](#Whisker.length) ↩︎
    * [.lineConfig([*value*])](#Whisker.lineConfig) ↩︎
    * [.orient([*value*])](#Whisker.orient) ↩︎
    * [.select([*selector*])](#Whisker.select) ↩︎
    * [.x([*value*])](#Whisker.x) ↩︎
    * [.y([*value*])](#Whisker.y) ↩︎


<a name="new_Whisker_new" href="#new_Whisker_new">#</a> new **Whisker**()

Creates SVG whisker based on an array of data.





<a name="Whisker.render" href="#Whisker.render">#</a> Whisker.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L48)

Draws the whisker.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.active" href="#Whisker.active">#</a> Whisker.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L136)

Sets the highlight accessor to the Shape class's active function.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.data" href="#Whisker.data">#</a> Whisker.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L147)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.endpoint" href="#Whisker.endpoint">#</a> Whisker.**endpoint**(_) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L157)

If *value* is specified, sets the endpoint accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.endpointConfig" href="#Whisker.endpointConfig">#</a> Whisker.**endpointConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L167)

If *value* is specified, sets the config method for each endpoint and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.hover" href="#Whisker.hover">#</a> Whisker.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L177)

Sets the highlight accessor to the Shape class's hover function.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.length" href="#Whisker.length">#</a> Whisker.**length**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L188)

If *value* is specified, sets the length accessor for whisker and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.lineConfig" href="#Whisker.lineConfig">#</a> Whisker.**lineConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L198)

If *value* is specified, sets the config method for line shape and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.orient" href="#Whisker.orient">#</a> Whisker.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L208)

If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.select" href="#Whisker.select">#</a> Whisker.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L218)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


<a name="Whisker.x" href="#Whisker.x">#</a> Whisker.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L232)

If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Whisker.y" href="#Whisker.y">#</a> Whisker.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Whisker.js#L246)

If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.


This is a static method of [<code>Whisker</code>](#Whisker), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y;
}
```

