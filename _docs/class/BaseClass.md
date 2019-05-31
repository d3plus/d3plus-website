---
name: BaseClass
kind: class
---

  <a name="BaseClass"></a>

### **BaseClass** [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L28)


This is a global class.


* [BaseClass](#BaseClass)
    * [.config([*value*])](#BaseClass.config) ↩︎
    * [.locale([*value*])](#BaseClass.locale) ↩︎
    * [.on([*typenames*], [*listener*])](#BaseClass.on) ↩︎


<a name="BaseClass.config" href="#BaseClass.config">#</a> BaseClass.**config**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L51)

If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.


<a name="BaseClass.locale" href="#BaseClass.locale">#</a> BaseClass.**locale**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L102)

If *value* is specified, sets the locale to the specified string and returns the current class instance. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). In another case, you can define an Object with a custom locale.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.


```js
{
        separator: "",
        suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
        grouping: [3],
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        currency: ["$", ""]
      }
```


<a name="BaseClass.on" href="#BaseClass.on">#</a> BaseClass.**on**([*typenames*], [*listener*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L121)

Adds or removes a *listener* to each object for the specified event *typenames*. If a *listener* is not specified, returns the currently assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> | 
| [*listener*] | <code>function</code> | 

By default, listeners apply globally to all objects, however, passing a namespace with the class name gives control over specific elements:

```js
new Plot
  .on("click.Shape", function(d) {
    console.log("data for shape clicked:", d);
  })
  .on("click.Legend", function(d) {
    console.log("data for legend clicked:", d);
  })
```

