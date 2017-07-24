---
name: Rect
kind: class
---

  <a name="Rect"></a>

### **Rect** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Rect](#Rect) ⇐ [<code>Shape</code>](#Shape)
    * [new Rect()](#new_Rect_new)
    * [.render([*callback*])](#Rect.render) ↩︎
    * [.height([*value*])](#Rect.height) ↩︎
    * [.width([*value*])](#Rect.width) ↩︎


<a name="new_Rect_new" href="#new_Rect_new">#</a> new **Rect**()

Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.





<a name="Rect.render" href="#Rect.render">#</a> Rect.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L32)

Draws the rectangles.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


<a name="Rect.height" href="#Rect.height">#</a> Rect.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L90)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Rect.width" href="#Rect.width">#</a> Rect.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L106)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```

