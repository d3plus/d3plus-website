---
name: Timeline
kind: class
---

  <a name="Timeline"></a>

### **Timeline** [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L12)


This is a global class, and extends all of the methods and functionality of [<code>Axis</code>](#Axis).


* [Timeline](#Timeline) ⇐ [<code>Axis</code>](#Axis)
    * [.render([*callback*])](#Timeline.render) ↩︎
    * [.brushing([*value*])](#Timeline.brushing) ↩︎
    * [.brushFilter([*value*])](#Timeline.brushFilter) ↩︎
    * [.handleConfig([*value*])](#Timeline.handleConfig) ↩︎
    * [.handleSize([*value*])](#Timeline.handleSize) ↩︎
    * [.on([*typename*], [*listener*])](#Timeline.on) ↩︎
    * [.selectionConfig([*value*])](#Timeline.selectionConfig) ↩︎
    * [.selection([*value*])](#Timeline.selection) ↩︎
    * [.snapping([*value*])](#Timeline.snapping) ↩︎


<a name="Timeline.render" href="#Timeline.render">#</a> Timeline.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L198)

Draws the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushing" href="#Timeline.brushing">#</a> Timeline.**brushing**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L245)

If *value* is specified, toggles the brushing value and returns the current class instance. If *value* is not specified, returns the current brushing value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.brushFilter" href="#Timeline.brushFilter">#</a> Timeline.**brushFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L259)

If *value* is specified, sets the brush event filter and returns the current class instance. If *value* is not specified, returns the current brush event filter.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


```js
function() {
  return !event.button && event.detail < 2;
}
```


<a name="Timeline.handleConfig" href="#Timeline.handleConfig">#</a> Timeline.**handleConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L269)

If *value* is specified, sets the handle style and returns the current class instance. If *value* is not specified, returns the current handle style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.handleSize" href="#Timeline.handleSize">#</a> Timeline.**handleSize**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L279)

If *value* is specified, sets the handle size and returns the current class instance. If *value* is not specified, returns the current handle size.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.on" href="#Timeline.on">#</a> Timeline.**on**([*typename*], [*listener*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L290)

Adds or removes a *listener* for the specified brush event *typename*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-brush](https://github.com/d3/d3-brush#brush_on) behavior.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

| Param | Type |
| --- | --- |
| [*typename*] | <code>String</code> \| <code>Object</code> | 
| [*listener*] | <code>function</code> | 



<a name="Timeline.selectionConfig" href="#Timeline.selectionConfig">#</a> Timeline.**selectionConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L300)

If *value* is specified, sets the selection style and returns the current class instance. If *value* is not specified, returns the current selection style.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.selection" href="#Timeline.selection">#</a> Timeline.**selection**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L310)

If *value* is specified, sets the selection and returns the current class instance. If *value* is not specified, returns the current selection. Defaults to the most recent year in the timeline.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.


<a name="Timeline.snapping" href="#Timeline.snapping">#</a> Timeline.**snapping**([*value*]) [<>](https://github.com/d3plus/d3plus-timeline/blob/master/src/Timeline.js#L320)

If *value* is specified, toggles the snapping value and returns the current class instance. If *value* is not specified, returns the current snapping value.


This is a static method of [<code>Timeline</code>](#Timeline), and is chainable with other methods of this Class.

