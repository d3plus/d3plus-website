---
name: dataConcat
kind: function
---

<a name="dataConcat"></a>

### d3plus.**dataConcat**(arrayOfArray, [data]) [<>](https://github.com/d3plus/d3plus-viz/blob/master/src/data/concat.js#L1)

Reduce and concat all the elements included in arrayOfArrays if they are arrays. If it is a JSON object try to concat the array under given key data. If the key doesn't exists in object item, a warning message is lauched to the console. You need to implement DataFormat callback to concat the arrays manually.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arrayOfArray | <code>Array</code> |  | Array of elements |
| [data] | <code>String</code> | <code>&quot;data&quot;</code> | The key used for the flat data array if exists inside of the JSON object. |


