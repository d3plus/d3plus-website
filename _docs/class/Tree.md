---
name: Tree
kind: class
---

  <a name="Tree"></a>

### **Tree** [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Tree.js#L11)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Tree](#Tree) ⇐ <code>Viz</code>
    * [new Tree()](#new_Tree_new)
    * [.orient([*value*])](#Tree.orient)
    * [.separation([*value*])](#Tree.separation)


<a name="new_Tree_new" href="#new_Tree_new">#</a> new **Tree**()

Uses d3's [tree layout](https://github.com/d3/d3-hierarchy#tree) to create a tidy tree chart based on an array of data.





<a name="Tree.orient" href="#Tree.orient">#</a> Tree.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Tree.js#L208)

If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.


This is a static method of [<code>Tree</code>](#Tree).


<a name="Tree.separation" href="#Tree.separation">#</a> Tree.**separation**([*value*]) [<>](https://github.com/d3plus/d3plus-hierarchy/blob/master/src/Tree.js#L224)

If *value* is specified, sets the separation accessor to the specified function. If *value* is not specified, returns the current separation accessor.

From the [d3-hierarchy documentation](https://github.com/d3/d3-hierarchy#tree_separation):
> The separation accessor is used to separate neighboring nodes. The separation function is passed two nodes a and b, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.


This is a static method of [<code>Tree</code>](#Tree).


```js
function separation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}
```

