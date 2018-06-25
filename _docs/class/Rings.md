---
name: Rings
kind: class
---

  <a name="Rings"></a>

### **Rings** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L15)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](#Viz).


* [Rings](#Rings) ⇐ [<code>Viz</code>](#Viz)
    * [new Rings()](#new_Rings_new)
    * [.center(_)](#Rings.center) ↩︎
    * [.hover([*value*])](#Rings.hover) ↩︎
    * [.links(*links*, [*formatter*])](#Rings.links) ↩︎
    * [.nodeGroupBy([*value*])](#Rings.nodeGroupBy) ↩︎
    * [.nodes(*nodes*, [*formatter*])](#Rings.nodes) ↩︎
    * [.size([*value*])](#Rings.size) ↩︎
    * [.sizeMax([*value*])](#Rings.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Rings.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Rings.sizeScale) ↩︎


<a name="new_Rings_new" href="#new_Rings_new">#</a> new **Rings**()

Creates a ring visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/simple-rings/) for help getting started using the Rings class.





<a name="Rings.center" href="#Rings.center">#</a> Rings.**center**(_) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L460)

Sets the center node to be the node with the given id.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.hover" href="#Rings.hover">#</a> Rings.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L470)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.links" href="#Rings.links">#</a> Rings.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L491)

A predefined *Array* of edges that connect each object passed to the [node](#Rings.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *links* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Rings.nodeGroupBy" href="#Rings.nodeGroupBy">#</a> Rings.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L508)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.nodes" href="#Rings.nodes">#</a> Rings.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L534)

The list of nodes to be used for drawing the rings network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Rings.size" href="#Rings.size">#</a> Rings.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L551)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMax" href="#Rings.sizeMax">#</a> Rings.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L561)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeMin" href="#Rings.sizeMin">#</a> Rings.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L571)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.


<a name="Rings.sizeScale" href="#Rings.sizeScale">#</a> Rings.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L581)

If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.


This is a static method of [<code>Rings</code>](#Rings), and is chainable with other methods of this Class.

