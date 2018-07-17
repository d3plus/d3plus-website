---
name: Pack
kind: class
---

  <a name="Pack"></a>

### **Pack** [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L25)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Pack](#Pack) ⇐ <code>Viz</code>
    * [new Pack()](#new_Pack_new)
    * [.hover([*value*])](#Pack.hover) ↩︎
    * [.layoutPadding([*value*])](#Pack.layoutPadding)
    * [.packOpacity([*value*])](#Pack.packOpacity)
    * [.sort([*comparator*])](#Pack.sort)
    * [.sum([*value*])](#Pack.sum)


<a name="new_Pack_new" href="#new_Pack_new">#</a> new **Pack**()

Uses the [d3 pack layout](https://github.com/d3/d3-hierarchy#pack) to creates Circle Packing chart based on an array of data.





<a name="Pack.hover" href="#Pack.hover">#</a> Pack.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L137)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Pack</code>](#Pack), and is chainable with other methods of this Class.


<a name="Pack.layoutPadding" href="#Pack.layoutPadding">#</a> Pack.**layoutPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L150)

If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.


This is a static method of [<code>Pack</code>](#Pack).


<a name="Pack.packOpacity" href="#Pack.packOpacity">#</a> Pack.**packOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L159)

If *value* is specified, sets the padding accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current pack opacity accessor.


This is a static method of [<code>Pack</code>](#Pack).


<a name="Pack.sort" href="#Pack.sort">#</a> Pack.**sort**([*comparator*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L172)

If *comparator* is specified, sets the sort order for the pack using the specified comparator function. If *comparator* is not specified, returns the current group sort order, which defaults to descending order by the associated input data's numeric value attribute.


This is a static method of [<code>Pack</code>](#Pack).


```js
function comparator(a, b) {
  return b.value - a.value;
}
```


<a name="Pack.sum" href="#Pack.sum">#</a> Pack.**sum**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Pack.js#L186)

If *value* is specified, sets the sum accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current sum accessor.


This is a static method of [<code>Pack</code>](#Pack).


```js
function sum(d) {
  return d.sum;
}
```

