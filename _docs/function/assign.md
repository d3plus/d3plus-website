---
name: assign
kind: function
---

<a name="assign"></a>

### d3plus.**assign**(...objects) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/assign.js#L3)

A deeply recursive version of `Object.assign`.


This is a global function.
this

```js
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    
```
returns this

```js
{id: "bar", deep: {group: "A", value: 20}}
```
