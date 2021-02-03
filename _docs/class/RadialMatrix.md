---
name: RadialMatrix
kind: class
---

<a name="RadialMatrix"></a>

### **RadialMatrix** [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L12)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [RadialMatrix](#RadialMatrix) ⇐ <code>Viz</code>
    * [new RadialMatrix()](#new_RadialMatrix_new)
    * [.cellPadding([*value*])](#RadialMatrix.cellPadding)
    * [.column([*value*])](#RadialMatrix.column)
    * [.columnConfig(*value*)](#RadialMatrix.columnConfig) ↩︎
    * [.columnSort([*value*])](#RadialMatrix.columnSort)
    * [.innerRadius([*value*])](#RadialMatrix.innerRadius)
    * [.row([*value*])](#RadialMatrix.row)
    * [.rowSort([*value*])](#RadialMatrix.rowSort)


<a name="new_RadialMatrix_new" href="#new_RadialMatrix_new">#</a> new **RadialMatrix**()

Creates a radial layout of a rows/columns Matrix of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/radial-matrix/) for help getting started using the Matrix class.





<a name="RadialMatrix.cellPadding" href="#RadialMatrix.cellPadding">#</a> RadialMatrix.**cellPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L160)

The pixel padding in between each cell.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


<a name="RadialMatrix.column" href="#RadialMatrix.column">#</a> RadialMatrix.**column**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L173)

Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function column(d) {
  return d.name;
}
```


<a name="RadialMatrix.columnConfig" href="#RadialMatrix.columnConfig">#</a> RadialMatrix.**columnConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L183)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix), and is chainable with other methods of this Class.


<a name="RadialMatrix.columnSort" href="#RadialMatrix.columnSort">#</a> RadialMatrix.**columnSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L196)

A sort comparator function that is run on the unique set of column values.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function column(a, b) {
  return a.localeCompare(b);
}
```


<a name="RadialMatrix.innerRadius" href="#RadialMatrix.innerRadius">#</a> RadialMatrix.**innerRadius**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L209)

The radius (in pixels) for the inner donut hole of the diagram. Can either be a static Number, or an accessor function that receives the outer radius as it's only argument.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function(outerRadius) {
  return outerRadius / 5;
}
```


<a name="RadialMatrix.row" href="#RadialMatrix.row">#</a> RadialMatrix.**row**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L222)

Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function row(d) {
  return d.name;
}
```


<a name="RadialMatrix.rowSort" href="#RadialMatrix.rowSort">#</a> RadialMatrix.**rowSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L235)

A sort comparator function that is run on the unique set of row values.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function row(a, b) {
  return a.localeCompare(b);
}
```

