---
name: unique
kind: function
---

<a name="unique"></a>

### d3plus.**unique**(arr, [accessor]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/unique.js#L1)

ES5 implementation to reduce an Array of values to unique instances.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The Array of objects to be filtered. |
| [accessor] | <code>function</code> | An optional accessor function used to extract data points from an Array of Objects. |

this

```js
unique(["apple", "banana", "apple"]);
    
```
returns this

```js
["apple", "banana"]
```

