---
name: Sample
kind: class
---

<a name="Sample"></a>

### **Sample** [<>](https://github.com/d3plus/d3plus-project-template/blob/master/src/Sample.js#L3)


This is a global class.

* [Sample](#Sample)
    * [new Sample([data])](#new_Sample_new)
    * [.constant([*value*])](#Sample.constant)
    * [.id([*value*])](#Sample.id)

<a name="new_Sample_new" href="#new_Sample_new">#</a> new **Sample**([data])

A sample chainable function.



<a name="Sample.constant" href="#Sample.constant">#</a> Sample.**constant**([*value*]) [<>](https://github.com/d3plus/d3plus-project-template/blob/master/src/Sample.js#L27)

If *value* is specified, sets the constant to the specified function or value and returns this generator. If *value* is not specified, returns the current constant.


This is a static method of [<code>Sample</code>](#Sample).
<a name="Sample.id" href="#Sample.id">#</a> Sample.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-project-template/blob/master/src/Sample.js#L42)

If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.


This is a static method of [<code>Sample</code>](#Sample).


```js
function(d) {
  return d.id;
}
```
