---
name: isData
kind: function
---

<a name="isData"></a>

### d3plus.**isData**(data, [data], data) [<>](https://github.com/d3plus/d3plus-viz/blob/master/src/data/addToQueue.js#L4)

Adds the provided value to the internal queue to be loaded, if necessary. This is used internally in new d3plus visualizations that fold in additional data sources, like the nodes and links of Network or the topojson of Geomap.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> \| <code>String</code> \| <code>Object</code> | The data to be loaded |
| [data] | <code>function</code> | An optional data formatter/callback |
| data | <code>String</code> | The internal Viz method to be modified |


