---
name: BaseClass
kind: class
---

<a name="BaseClass"></a>

### **BaseClass** [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L46)


This is a global class.


* [BaseClass](#BaseClass)
    * [.config([*value*])](#BaseClass.config) ↩︎
    * [.locale([*value*])](#BaseClass.locale) ↩︎
    * [.on([*typenames*], [*listener*])](#BaseClass.on) ↩︎
    * [.translate([*value*])](#BaseClass.translate) ↩︎


<a name="BaseClass.config" href="#BaseClass.config">#</a> BaseClass.**config**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L74)

If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.


<a name="BaseClass.locale" href="#BaseClass.locale">#</a> BaseClass.**locale**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L129)

Sets the locale used for all text and number formatting. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). The locale can be defined as a complex Object (like in d3plus-format), a locale code (like "en-US"), or a 2-digit language code (like "en"). If a 2-digit code is provided, the "findLocale" function is used to identify the most approximate locale from d3plus-format.


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


<a name="BaseClass.on" href="#BaseClass.on">#</a> BaseClass.**on**([*typenames*], [*listener*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L148)

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


<a name="BaseClass.translate" href="#BaseClass.translate">#</a> BaseClass.**translate**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L172)

Defines how informational text strings should be displayed. By default, this function will try to find the string in question (which is the first argument provided to this function) inside of an internally managed translation Object. If you'd like to override to use custom text, simply pass this method your own custom formatting function.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.
For example, if we wanted to only change the string &quot;Back&quot; and allow all other string to return in English:

```js
.translate(function(d) {
  return d === "Back" ? "Get outta here" : d;
})
```

