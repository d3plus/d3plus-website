---
name: Circle
kind: class
---

<a name="Circle"></a>

### **Circle** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Circle](#Circle) ⇐ [<code>Shape</code>](#Shape)
    * [new Circle()](#new_Circle_new)
    * [.render([*callback*])](#Circle.render) ↩︎
    * [.r([*value*])](#Circle.r) ↩︎


<a name="new_Circle_new" href="#new_Circle_new">#</a> new **Circle**()

Creates SVG circles based on an array of data.





<a name="Circle.render" href="#Circle.render">#</a> Circle.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L47)

Draws the circles.


This is a static method of [<code>Circle</code>](#Circle), and is chainable with other methods of this Class.


<a name="Circle.r" href="#Circle.r">#</a> Circle.**r**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L98)

If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Circle</code>](#Circle), and is chainable with other methods of this Class.


```js
function(d) {
  return d.r;
}
```

