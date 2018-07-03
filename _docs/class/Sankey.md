---
name: Sankey
kind: class
---

  <a name="Sankey"></a>

### **Sankey** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L13)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](#Viz).


* [Sankey](#Sankey) ⇐ [<code>Viz</code>](#Viz)
    * [new Sankey()](#new_Sankey_new)
    * [.hover([*value*])](#Sankey.hover) ↩︎
    * [.links(*links*)](#Sankey.links) ↩︎
    * [.nodeId([*value*])](#Sankey.nodeId) ↩︎
    * [.nodes(*nodes*)](#Sankey.nodes) ↩︎
    * [.nodeWidth([*value*])](#Sankey.nodeWidth) ↩︎
    * [.value(*value*)](#Sankey.value)


<a name="new_Sankey_new" href="#new_Sankey_new">#</a> new **Sankey**()

Creates a sankey visualization based on a defined set of nodes and links. [Click here](http://d3plus.org/examples/d3plus-network/sankey-diagram/) for help getting started using the Sankey class.





<a name="Sankey.hover" href="#Sankey.hover">#</a> Sankey.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L192)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.links" href="#Sankey.links">#</a> Sankey.**links**(*links*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L209)

A predefined *Array* of edges that connect each object passed to the [node](#Sankey.node) method. The `source` and `target` keys in each link need to map to the nodes in one of one way:
1. A *String* value matching the `id` of the node.

The value passed should be an *Array* of data. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeId" href="#Sankey.nodeId">#</a> Sankey.**nodeId**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L226)

If *value* is specified, sets the node id accessor(s) to the specified array of values and returns the current class instance. If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodes" href="#Sankey.nodes">#</a> Sankey.**nodes**(*nodes*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L240)

The list of nodes to be used for drawing the network. The value passed must be an *Array* of data.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.nodeWidth" href="#Sankey.nodeWidth">#</a> Sankey.**nodeWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L257)

If *value* is specified, sets the width of the node and returns the current class instance. If *value* is not specified, returns the current nodeWidth. By default, the nodeWidth size is 30.


This is a static method of [<code>Sankey</code>](#Sankey), and is chainable with other methods of this Class.


<a name="Sankey.value" href="#Sankey.value">#</a> Sankey.**value**(*value*) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Sankey.js#L270)

If *value* is specified, sets the width of the links and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Sankey</code>](#Sankey).


```js
function value(d) {
  return d.value;
}
```

