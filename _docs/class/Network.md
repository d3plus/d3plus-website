---
name: Network
kind: class
---

  <a name="Network"></a>

### **Network** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L18)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](#Viz).


* [Network](#Network) ⇐ [<code>Viz</code>](#Viz)
    * [new Network()](#new_Network_new)
    * [.links([*links*])](#Network.links) ↩︎
    * [.nodeGroupBy([*value*])](#Network.nodeGroupBy) ↩︎
    * [.nodes([*nodes*])](#Network.nodes) ↩︎
    * [.size([*value*])](#Network.size) ↩︎
    * [.sizeMax([*value*])](#Network.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Network.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Network.sizeScale) ↩︎
    * [.x([*value*])](#Network.x) ↩︎
    * [.y([*value*])](#Network.y) ↩︎
    * [.zoom([*value*])](#Network.zoom) ↩︎
    * [.zoomMax([*value*])](#Network.zoomMax) ↩︎
    * [.zoomPan([*value*])](#Network.zoomPan) ↩︎
    * [.zoomScroll([*value*])](#Network.zoomScroll) ↩︎


<a name="new_Network_new" href="#new_Network_new">#</a> new **Network**()

Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.





<a name="Network.links" href="#Network.links">#</a> Network.**links**([*links*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L534)

A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodeGroupBy" href="#Network.nodeGroupBy">#</a> Network.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L544)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodes" href="#Network.nodes">#</a> Network.**nodes**([*nodes*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L567)

If *nodes* is specified, sets the nodes array to the specified array and returns the current class instance. If *nodes* is not specified, returns the current nodes array.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.size" href="#Network.size">#</a> Network.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L577)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMax" href="#Network.sizeMax">#</a> Network.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L587)

If *value* is specified, sets the size scale maximum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale maximum. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMin" href="#Network.sizeMin">#</a> Network.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L597)

If *value* is specified, sets the size scale minimum to the specified number and returns the current class instance. If *value* is not specified, returns the current size scale minimum.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeScale" href="#Network.sizeScale">#</a> Network.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L607)

If *value* is specified, sets the size scale to the specified string and returns the current class instance. If *value* is not specified, returns the current size scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.x" href="#Network.x">#</a> Network.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L617)

If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.y" href="#Network.y">#</a> Network.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L635)

If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoom" href="#Network.zoom">#</a> Network.**zoom**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L653)

If *value* is specified, toggles overall zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current overall zooming value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomMax" href="#Network.zoomMax">#</a> Network.**zoomMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L663)

If *value* is specified, sets the max zoom scale to the specified number and returns the current class instance. If *value* is not specified, returns the current max zoom scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomPan" href="#Network.zoomPan">#</a> Network.**zoomPan**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L673)

If *value* is specified, toggles panning to the specified boolean and returns the current class instance. If *value* is not specified, returns the current panning value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.zoomScroll" href="#Network.zoomScroll">#</a> Network.**zoomScroll**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L683)

If *value* is specified, toggles scroll zooming to the specified boolean and returns the current class instance. If *value* is not specified, returns the current scroll zooming value.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

