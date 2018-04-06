---
name: Treemap
kind: class
---

  <a name="Treemap"></a>

### **Treemap** [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Treemap.js#L8)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Treemap](#Treemap) ⇐ <code>Viz</code>
    * [new Treemap()](#new_Treemap_new)
    * [.padding([*value*])](#Treemap.padding)
    * [.sort([*comparator*])](#Treemap.sort)
    * [.sum([*value*])](#Treemap.sum)
    * [.tile([*value*])](#Treemap.tile)


<a name="new_Treemap_new" href="#new_Treemap_new">#</a> new **Treemap**()

Uses the [d3 treemap layout](https://github.com/mbostock/d3/wiki/Treemap-Layout) to creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-hierarchy/getting-started/) for help getting started using the treemap generator.





<a name="Treemap.padding" href="#Treemap.padding">#</a> Treemap.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Treemap.js#L124)

If *value* is specified, sets the inner and outer padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current padding accessor.


This is a static method of [<code>Treemap</code>](#Treemap).


<a name="Treemap.sort" href="#Treemap.sort">#</a> Treemap.**sort**([*comparator*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Treemap.js#L137)

If *comparator* is specified, sets the sort order for the treemap using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.


This is a static method of [<code>Treemap</code>](#Treemap).


```js
function comparator(a, b) {
  return b.value - a.value;
}
```


<a name="Treemap.sum" href="#Treemap.sum">#</a> Treemap.**sum**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Treemap.js#L150)

If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.


This is a static method of [<code>Treemap</code>](#Treemap).


```js
function sum(d) {
  return d.sum;
}
```


<a name="Treemap.tile" href="#Treemap.tile">#</a> Treemap.**tile**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Treemap.js#L159)

If *value* is specified, sets the [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling) to the specified function and returns the current class instance. If *value* is not specified, returns the current [tiling method](https://github.com/d3/d3-hierarchy#treemap-tiling).


This is a static method of [<code>Treemap</code>](#Treemap).

