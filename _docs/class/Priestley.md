---
name: Priestley
kind: class
---

  <a name="Priestley"></a>

### **Priestley** [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L15)


This is a global class, and extends all of the methods and functionality of [<code>Viz</code>](#Viz).


* [Priestley](#Priestley) ⇐ [<code>Viz</code>](#Viz)
    * [new Priestley()](#new_Priestley_new)
    * [.axisConfig([*value*])](#Priestley.axisConfig) ↩︎
    * [.end([*value*])](#Priestley.end) ↩︎
    * [.paddingInner([*value*])](#Priestley.paddingInner) ↩︎
    * [.paddingOuter([*value*])](#Priestley.paddingOuter) ↩︎
    * [.start([*value*])](#Priestley.start) ↩︎


<a name="new_Priestley_new" href="#new_Priestley_new">#</a> new **Priestley**()

Creates a priestley timeline based on an array of data.





<a name="Priestley.axisConfig" href="#Priestley.axisConfig">#</a> Priestley.**axisConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L147)

If *value* is specified, sets the config method for the axis and returns the current class instance. If *value* is not specified, returns the current axis configuration.


This is a static method of [<code>Priestley</code>](#Priestley), and is chainable with other methods of this Class.


<a name="Priestley.end" href="#Priestley.end">#</a> Priestley.**end**([*value*]) [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L157)

If *value* is specified, sets the end accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current end accessor.


This is a static method of [<code>Priestley</code>](#Priestley), and is chainable with other methods of this Class.


<a name="Priestley.paddingInner" href="#Priestley.paddingInner">#</a> Priestley.**paddingInner**([*value*]) [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L175)

Sets the [paddingInner](https://github.com/d3/d3-scale#band_paddingInner) value of the underlining [Band Scale](https://github.com/d3/d3-scale#band-scales) used to determine the height of each bar. Values should be a ratio between 0 and 1 representing the space in between each rectangle.


This is a static method of [<code>Priestley</code>](#Priestley), and is chainable with other methods of this Class.


<a name="Priestley.paddingOuter" href="#Priestley.paddingOuter">#</a> Priestley.**paddingOuter**([*value*]) [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L185)

Sets the [paddingOuter](https://github.com/d3/d3-scale#band_paddingOuter) value of the underlining [Band Scale](https://github.com/d3/d3-scale#band-scales) used to determine the height of each bar. Values should be a ratio between 0 and 1 representing the space around the outer rectangles.


This is a static method of [<code>Priestley</code>](#Priestley), and is chainable with other methods of this Class.


<a name="Priestley.start" href="#Priestley.start">#</a> Priestley.**start**([*value*]) [<>](https://github.com/d3plus/d3plus-priestley/blob/master/src/Priestley.js#L195)

If *value* is specified, sets the start accessor to the specified function or key and returns the current class instance. If *value* is not specified, returns the current start accessor.


This is a static method of [<code>Priestley</code>](#Priestley), and is chainable with other methods of this Class.

