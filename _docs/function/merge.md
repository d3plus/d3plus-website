---
name: merge
kind: function
---

  <a name="merge"></a>

### d3plus.**merge**(objects, aggs) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/merge.js#L4)

Combines an Array of Objects together and returns a new Object.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Array</code> | The Array of objects to be merged together. |
| aggs | <code>Object</code> | An object containing specific aggregation methods (functions) for each key type. By default, numbers are summed and strings are returned as an array of unique values. |

this

```js
merge([
  {id: "foo", group: "A", value: 10, links: [1, 2]},
  {id: "bar", group: "A", value: 20, links: [1, 3]}
]);
    
```
returns this

```js
{id: ["bar", "foo"], group: "A", value: 30, links: [1, 2, 3]}
```

