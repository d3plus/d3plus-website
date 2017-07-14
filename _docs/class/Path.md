---
name: Path
kind: class
---

<a name="Path"></a>

### **Path** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L7)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).

* [Path](#Path) ⇐ [<code>Shape</code>](#Shape)
    * [new Path()](#new_Path_new)
    * [.render([*callback*])](#Path.render) ↩︎
    * [.d([*value*])](#Path.d) ↩︎

<a name="new_Path_new" href="#new_Path_new">#</a> new **Path**()

Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.



<a name="Path.render" href="#Path.render">#</a> Path.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L50)

Draws the paths.


This is a static method of [<code>Path</code>](#Path), and is chainable with other methods of this Class.
<a name="Path.d" href="#Path.d">#</a> Path.**d**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L83)

If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current "d" attribute accessor.


This is a static method of [<code>Path</code>](#Path), and is chainable with other methods of this Class.


```js
function(d) {
  return d.path;
}
```
