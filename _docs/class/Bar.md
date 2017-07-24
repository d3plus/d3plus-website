---
name: Bar
kind: class
---

  <a name="Bar"></a>

### **Bar** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Bar](#Bar) ⇐ [<code>Shape</code>](#Shape)
    * [new Bar()](#new_Bar_new)
    * [.render([*callback*])](#Bar.render) ↩︎
    * [.height([*value*])](#Bar.height) ↩︎
    * [.width([*value*])](#Bar.width) ↩︎
    * [.x0([*value*])](#Bar.x0) ↩︎
    * [.x1([*value*])](#Bar.x1) ↩︎
    * [.y0([*value*])](#Bar.y0) ↩︎
    * [.y1([*value*])](#Bar.y1) ↩︎


<a name="new_Bar_new" href="#new_Bar_new">#</a> new **Bar**()

Creates SVG areas based on an array of data.





<a name="Bar.render" href="#Bar.render">#</a> Bar.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L45)

Draws the bars.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.height" href="#Bar.height">#</a> Bar.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L157)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Bar.width" href="#Bar.width">#</a> Bar.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L173)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```


<a name="Bar.x0" href="#Bar.x0">#</a> Bar.**x0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L185)

If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.x1" href="#Bar.x1">#</a> Bar.**x1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L198)

If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.y0" href="#Bar.y0">#</a> Bar.**y0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L210)

If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.y1" href="#Bar.y1">#</a> Bar.**y1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L223)

If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.

