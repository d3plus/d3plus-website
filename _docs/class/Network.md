---
name: Network
kind: class
---

  <a name="Network"></a>

### **Network** [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L17)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](#Viz).


* [Network](#Network) ⇐ [<code>Viz</code>](#Viz)
    * [new Network()](#new_Network_new)
    * [.hover([*value*])](#Network.hover) ↩︎
    * [.links(*links*, [*formatter*])](#Network.links) ↩︎
    * [.linkSize([*value*])](#Network.linkSize) ↩︎
    * [.linkSizeMin([*value*])](#Network.linkSizeMin) ↩︎
    * [.linkSizeScale([*value*])](#Network.linkSizeScale) ↩︎
    * [.nodeGroupBy([*value*])](#Network.nodeGroupBy) ↩︎
    * [.nodes(*nodes*, [*formatter*])](#Network.nodes) ↩︎
    * [.size([*value*])](#Network.size) ↩︎
    * [.sizeMax([*value*])](#Network.sizeMax) ↩︎
    * [.sizeMin([*value*])](#Network.sizeMin) ↩︎
    * [.sizeScale([*value*])](#Network.sizeScale) ↩︎
    * [.x([*value*])](#Network.x) ↩︎
    * [.y([*value*])](#Network.y) ↩︎
    * [.linkSize([*value*])](#Network.linkSize) ↩︎
    * [.linkSizeMin([*value*])](#Network.linkSizeMin) ↩︎
    * [.linkSizeScale([*value*])](#Network.linkSizeScale) ↩︎


<a name="new_Network_new" href="#new_Network_new">#</a> new **Network**()

Creates a network visualization based on a defined set of nodes and edges. [Click here](http://d3plus.org/examples/d3plus-network/getting-started/) for help getting started using the Network class.





<a name="Network.hover" href="#Network.hover">#</a> Network.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L480)

If *value* is specified, sets the hover method to the specified function and returns the current class instance.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.links" href="#Network.links">#</a> Network.**links**(*links*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L503)

A predefined *Array* of edges that connect each object passed to the [node](#Network.node) method. The `source` and `target` keys in each link need to map to the nodes in one of three ways:
1. The index of the node in the nodes array (as in [this](http://d3plus.org/examples/d3plus-network/getting-started/) example).
2. The actual node *Object* itself.
3. A *String* value matching the `id` of the node.

The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded. An optional formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final links *Array*.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *links* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Network.linkSize" href="#Network.linkSize">#</a> Network.**linkSize**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L520)

Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeMin" href="#Network.linkSizeMin">#</a> Network.**linkSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L530)

Defines the minimum pixel stroke width used in link sizing.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeScale" href="#Network.linkSizeScale">#</a> Network.**linkSizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L540)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodeGroupBy" href="#Network.nodeGroupBy">#</a> Network.**nodeGroupBy**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L550)

If *value* is specified, sets the node group accessor(s) to the specified string, function, or array of values and returns the current class instance. This method overrides the default .groupBy() function from being used with the data passed to .nodes(). If *value* is not specified, returns the current node group accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.nodes" href="#Network.nodes">#</a> Network.**nodes**(*nodes*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L576)

The list of nodes to be used for drawing the network. The value passed should either be an *Array* of data or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final node *Array*.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *nodes* | <code>Array</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Network.size" href="#Network.size">#</a> Network.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L593)

If *value* is specified, sets the size accessor to the specified function or data key and returns the current class instance. If *value* is not specified, returns the current size accessor.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMax" href="#Network.sizeMax">#</a> Network.**sizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L603)

Defines the maximum pixel radius used in size scaling. By default, the maximum size is determined by half the distance of the two closest nodes.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeMin" href="#Network.sizeMin">#</a> Network.**sizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L613)

Defines the minimum pixel radius used in size scaling.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.sizeScale" href="#Network.sizeScale">#</a> Network.**sizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L623)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of nodes in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.x" href="#Network.x">#</a> Network.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L633)

If *value* is specified, sets the x accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current x accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.y" href="#Network.y">#</a> Network.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Network.js#L651)

If *value* is specified, sets the y accessor to the specified function or string matching a key in the data and returns the current class instance. The data passed to .data() takes priority over the .nodes() data array. If *value* is not specified, returns the current y accessor. By default, the x and y positions are determined dynamically based on default force layout properties.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSize" href="#Network.linkSize">#</a> Network.**linkSize**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L534)

Defines the thickness of the links connecting each node. The value provided can be either a pixel Number to be used for all links, or an accessor function that returns a specific data value to be used in an automatically calculated linear scale.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeMin" href="#Network.linkSizeMin">#</a> Network.**linkSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L544)

Defines the minimum pixel stroke width used in link sizing.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.


<a name="Network.linkSizeScale" href="#Network.linkSizeScale">#</a> Network.**linkSizeScale**([*value*]) [<>](https://github.com/d3plus/d3plus-network/blob/master/src/Rings.js#L554)

Sets the specific type of [continuous d3-scale](https://github.com/d3/d3-scale#continuous-scales) used when calculating the pixel size of links in the network.


This is a static method of [<code>Network</code>](#Network), and is chainable with other methods of this Class.

