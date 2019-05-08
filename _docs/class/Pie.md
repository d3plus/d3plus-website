---
name: Pie
kind: class
---

  <a name="Pie"></a>

### **Pie** [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L8)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Pie](#Pie) ⇐ <code>Viz</code>
    * [new Pie()](#new_Pie_new)
    * [.innerRadius([*value*])](#Pie.innerRadius)
    * [.padAngle([*value*])](#Pie.padAngle)
    * [.padPixel([*value*])](#Pie.padPixel)
    * [.sort([*comparator*])](#Pie.sort)
    * [.value(*value*)](#Pie.value)


<a name="new_Pie_new" href="#new_Pie_new">#</a> new **Pie**()

Uses the [d3 pie layout](https://github.com/d3/d3-shape#pies) to creates SVG arcs based on an array of data.





<a name="Pie.innerRadius" href="#Pie.innerRadius">#</a> Pie.**innerRadius**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L93)

If *value* is specified, sets the inner radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current inner radius accessor.


This is a static method of [<code>Pie</code>](#Pie).


<a name="Pie.padAngle" href="#Pie.padAngle">#</a> Pie.**padAngle**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L102)

If *value* is specified, sets the arc padding to the specified radian value and returns the current class instance. If *value* is not specified, returns the current radian padding.


This is a static method of [<code>Pie</code>](#Pie).


<a name="Pie.padPixel" href="#Pie.padPixel">#</a> Pie.**padPixel**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L111)

If *value* is specified, sets the arc padding to the specified pixel value and returns the current class instance. If *value* is not specified, returns the current pixel padding.


This is a static method of [<code>Pie</code>](#Pie).


<a name="Pie.sort" href="#Pie.sort">#</a> Pie.**sort**([*comparator*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L124)

If *comparator* is specified, sets the sort order for the pie slices using the specified comparator function. If *comparator* is not specified, returns the current sort order, which defaults to descending order by the associated input data's numeric value attribute.


This is a static method of [<code>Pie</code>](#Pie).


```js
function comparator(a, b) {
  return b.value - a.value;
}
```


<a name="Pie.value" href="#Pie.value">#</a> Pie.**value**(*value*) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pie.js#L137)

If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Pie</code>](#Pie).


```js
function value(d) {
  return d.value;
}
```

