---
name: Matrix
kind: class
---

<a name="Matrix"></a>

### **Matrix** [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L21)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Matrix](#Matrix) ⇐ <code>Viz</code>
    * [new Matrix()](#new_Matrix_new)
    * [.cellPadding([*value*])](#Matrix.cellPadding)
    * [.column([*value*])](#Matrix.column)
    * [.columnConfig(*value*)](#Matrix.columnConfig) ↩︎
    * [.columnList([*value*])](#Matrix.columnList)
    * [.columnSort([*value*])](#Matrix.columnSort)
    * [.row([*value*])](#Matrix.row)
    * [.rowConfig(*value*)](#Matrix.rowConfig) ↩︎
    * [.rowList([*value*])](#Matrix.rowList)
    * [.rowSort([*value*])](#Matrix.rowSort)


<a name="new_Matrix_new" href="#new_Matrix_new">#</a> new **Matrix**()

Creates a simple rows/columns Matrix view of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/getting-started/) for help getting started using the Matrix class.





<a name="Matrix.cellPadding" href="#Matrix.cellPadding">#</a> Matrix.**cellPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L168)

The pixel padding in between each cell.


This is a static method of [<code>Matrix</code>](#Matrix).


<a name="Matrix.column" href="#Matrix.column">#</a> Matrix.**column**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L181)

Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function column(d) {
  return d.name;
}
```


<a name="Matrix.columnConfig" href="#Matrix.columnConfig">#</a> Matrix.**columnConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L191)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.


This is a static method of [<code>Matrix</code>](#Matrix), and is chainable with other methods of this Class.


<a name="Matrix.columnList" href="#Matrix.columnList">#</a> Matrix.**columnList**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L200)

A manual list of IDs to be used for columns.


This is a static method of [<code>Matrix</code>](#Matrix).


<a name="Matrix.columnSort" href="#Matrix.columnSort">#</a> Matrix.**columnSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L213)

A sort comparator function that is run on the unique set of column values.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function column(a, b) {
  return a.localeCompare(b);
}
```


<a name="Matrix.row" href="#Matrix.row">#</a> Matrix.**row**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L226)

Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function row(d) {
  return d.name;
}
```


<a name="Matrix.rowConfig" href="#Matrix.rowConfig">#</a> Matrix.**rowConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L236)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the row labels.


This is a static method of [<code>Matrix</code>](#Matrix), and is chainable with other methods of this Class.


<a name="Matrix.rowList" href="#Matrix.rowList">#</a> Matrix.**rowList**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L245)

A manual list of IDs to be used for rows.


This is a static method of [<code>Matrix</code>](#Matrix).


<a name="Matrix.rowSort" href="#Matrix.rowSort">#</a> Matrix.**rowSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L258)

A sort comparator function that is run on the unique set of row values.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function row(a, b) {
  return a.localeCompare(b);
}
```

