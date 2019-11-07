---
name: Radar
kind: class
---

  <a name="Radar"></a>

### **Radar** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L15)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Radar](#Radar) ⇐ <code>Viz</code>
    * [new Radar()](#new_Radar_new)
    * [.axisConfig(*value*)](#Radar.axisConfig) ↩︎
    * [.metric(*value*)](#Radar.metric) ↩︎
    * [.outerPadding([*value*])](#Radar.outerPadding) ↩︎
    * [.value(*value*)](#Radar.value)


<a name="new_Radar_new" href="#new_Radar_new">#</a> new **Radar**()

Creates a radar visualization based on an array of data.





<a name="Radar.axisConfig" href="#Radar.axisConfig">#</a> Radar.**axisConfig**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L240)

Sets the config method used for the radial spokes, circles, and labels.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.metric" href="#Radar.metric">#</a> Radar.**metric**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L250)

Defines the value used as axis. If *value* is specified, sets the accessor to the specified metric function. If *value* is not specified, returns the current metric accessor.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.outerPadding" href="#Radar.outerPadding">#</a> Radar.**outerPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L260)

Determines how much pixel spaces to give the outer labels.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.value" href="#Radar.value">#</a> Radar.**value**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L273)

If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Radar</code>](#Radar).


```js
function value(d) {
  return d.value;
}
```

