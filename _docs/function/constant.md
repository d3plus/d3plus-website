---
name: constant
kind: function
---

<a name="constant"></a>

### d3plus.**constant**(value) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/constant.js#L1)

Wraps non-function variables in a simple return function.


This is a global function.
this

```js
constant(42);
    
```
returns this

```js
function() {
  return 42;
}
```

