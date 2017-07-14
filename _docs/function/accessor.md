---
name: accessor
kind: function
---

<a name="accessor"></a>

### d3plus.**accessor**(key, [def]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/accessor.js#L1)

Wraps an object key in a simple accessor function.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to be returned from each Object passed to the function. |
| [def] | <code>\*</code> | A default value to be returned if the key is not present. |

this

```js
accessor("id");
    
```
returns this

```js
function(d) {
  return d["id"];
}
```
