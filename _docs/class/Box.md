---
name: Box
kind: class
---

  <a name="Box"></a>

### **Box** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L13)


This is a global class, and extends all of the methods and functionality of <code>BaseClass</code>.


* [Box](#Box) ⇐ <code>BaseClass</code>
    * [new Box()](#new_Box_new)
    * [.render([*callback*])](#Box.render) ↩︎
    * [.data([*data*])](#Box.data) ↩︎
    * [.medianConfig([*value*])](#Box.medianConfig) ↩︎
    * [.orient([*value*])](#Box.orient) ↩︎
    * [.outlier(_)](#Box.outlier) ↩︎
    * [.outlierConfig([*value*])](#Box.outlierConfig) ↩︎
    * [.rectConfig([*value*])](#Box.rectConfig) ↩︎
    * [.rectWidth([*value*])](#Box.rectWidth) ↩︎
    * [.select([*selector*])](#Box.select) ↩︎
    * [.whiskerConfig([*value*])](#Box.whiskerConfig) ↩︎
    * [.whiskerMode([*value*])](#Box.whiskerMode) ↩︎
    * [.x([*value*])](#Box.x) ↩︎
    * [.y([*value*])](#Box.y) ↩︎


<a name="new_Box_new" href="#new_Box_new">#</a> new **Box**()

Creates SVG box based on an array of data.





<a name="Box.render" href="#Box.render">#</a> Box.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L62)

Draws the Box.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.data" href="#Box.data">#</a> Box.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L228)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.medianConfig" href="#Box.medianConfig">#</a> Box.**medianConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L238)

If *value* is specified, sets the config method for median and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.orient" href="#Box.orient">#</a> Box.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L248)

If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.outlier" href="#Box.outlier">#</a> Box.**outlier**(_) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L258)

If *value* is specified, sets the outlier accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.outlierConfig" href="#Box.outlierConfig">#</a> Box.**outlierConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L268)

If *value* is specified, sets the config method for each outlier point and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.rectConfig" href="#Box.rectConfig">#</a> Box.**rectConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L278)

If *value* is specified, sets the config method for rect shape and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.rectWidth" href="#Box.rectWidth">#</a> Box.**rectWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L292)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```


<a name="Box.select" href="#Box.select">#</a> Box.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L302)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.whiskerConfig" href="#Box.whiskerConfig">#</a> Box.**whiskerConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L312)

If *value* is specified, sets the config method for whisker and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.whiskerMode" href="#Box.whiskerMode">#</a> Box.**whiskerMode**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L322)

Determines the value used for each whisker. Can be passed a single value to apply for both whiskers, or an Array of 2 values for the lower and upper whiskers (in that order). Accepted values are `"tukey"`, `"extent"`, or a Number representing a quantile.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


<a name="Box.x" href="#Box.x">#</a> Box.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L336)

If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Box.y" href="#Box.y">#</a> Box.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Box.js#L350)

If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.


This is a static method of [<code>Box</code>](#Box), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y;
}
```

