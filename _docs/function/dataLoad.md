---
name: dataLoad
kind: function
---

<a name="dataLoad"></a>

### d3plus.**dataLoad**(path, [formatter], [key], [callback]) [<>](https://github.com/d3plus/d3plus-viz/blob/master/src/data/load.js#L7)

Loads data from a filepath or URL, converts it to a valid JSON object, and returns it to a callback function.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| path | <code>Array</code> \| <code>String</code> | The path to the file or url to be loaded. Also support array of paths strings. If an Array of objects is passed, the xhr request logic is skipped. |
| [formatter] | <code>function</code> | An optional formatter function that is run on the loaded data. |
| [key] | <code>String</code> | The key in the `this` context to save the resulting data to. |
| [callback] | <code>function</code> | A function that is called when the final data is loaded. It is passed 2 variables, any error present and the data loaded. |


