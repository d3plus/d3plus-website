---
name: Radar
kind: class
---

  <a name="Radar"></a>

### **Radar** [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L13)


This is a global class, and extends all of the methods and functionality of [<code>Plot</code>](#Plot).


* [Radar](#Radar) ⇐ [<code>Plot</code>](#Plot)
    * [new Radar()](#new_Radar_new)
    * [.metric(*value*)](#Radar.metric) ↩︎
    * [.radarPadding([*value*])](#Radar.radarPadding) ↩︎
    * [.value(*value*)](#Radar.value)


<a name="new_Radar_new" href="#new_Radar_new">#</a> new **Radar**()

Creates a radar visualization based on an array of data.





<a name="Radar.metric" href="#Radar.metric">#</a> Radar.**metric**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L212)

Defines the value used as axis. If *value* is specified, sets the accessor to the specified metric function. If *value* is not specified, returns the current metric accessor.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.radarPadding" href="#Radar.radarPadding">#</a> Radar.**radarPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L222)

If *value* is specified, sets the padding of the chart and returns the current class instance. If *value* is not specified, returns the current radarPadding. By default, the radarPadding is 100.


This is a static method of [<code>Radar</code>](#Radar), and is chainable with other methods of this Class.


<a name="Radar.value" href="#Radar.value">#</a> Radar.**value**(*value*) [<>](https://github.com/d3plus/d3plus-plot/blob/master/src/Radar.js#L237)

If *value* is specified, sets the value accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>Radar</code>](#Radar).


```js
function value(d) {
  return d.value;
}
```

