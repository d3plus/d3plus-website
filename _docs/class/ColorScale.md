---
name: ColorScale
kind: class
---

  <a name="ColorScale"></a>

### **ColorScale** [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L18)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](#BaseClass).


* [ColorScale](#ColorScale) ⇐ [<code>BaseClass</code>](#BaseClass)
    * [new ColorScale()](#new_ColorScale_new)
    * [.render([*callback*])](#ColorScale.render) ↩︎
    * [.axisConfig([*value*])](#ColorScale.axisConfig) ↩︎
    * [.align([*value*])](#ColorScale.align) ↩︎
    * [.bucketAxis([*value*])](#ColorScale.bucketAxis) ↩︎
    * [.color([*value*])](#ColorScale.color) ↩︎
    * [.data([*data*])](#ColorScale.data) ↩︎
    * [.duration([*value*])](#ColorScale.duration) ↩︎
    * [.height([*value*])](#ColorScale.height) ↩︎
    * [.legendConfig([*value*])](#ColorScale.legendConfig) ↩︎
    * [.orient([*value*])](#ColorScale.orient) ↩︎
    * [.outerBounds()](#ColorScale.outerBounds)
    * [.padding([*value*])](#ColorScale.padding) ↩︎
    * [.rectConfig([*value*])](#ColorScale.rectConfig) ↩︎
    * [.scale([*value*])](#ColorScale.scale) ↩︎
    * [.select([*selector*])](#ColorScale.select) ↩︎
    * [.size([*value*])](#ColorScale.size) ↩︎
    * [.value([*value*])](#ColorScale.value) ↩︎
    * [.width([*value*])](#ColorScale.width) ↩︎


<a name="new_ColorScale_new" href="#new_ColorScale_new">#</a> new **ColorScale**()

Creates an SVG scale based on an array of data. If *data* is specified, immediately draws based on the specified array and returns the current class instance. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#shape.data) method.





<a name="ColorScale.render" href="#ColorScale.render">#</a> ColorScale.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L81)

Renders the current ColorScale to the page. If a *callback* is specified, it will be called once the ColorScale is done drawing.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.axisConfig" href="#ColorScale.axisConfig">#</a> ColorScale.**axisConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L277)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.align" href="#ColorScale.align">#</a> ColorScale.**align**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L287)

If *value* is specified, sets the horizontal alignment to the specified value and returns the current class instance. If *value* is not specified, returns the current horizontal alignment.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.bucketAxis" href="#ColorScale.bucketAxis">#</a> ColorScale.**bucketAxis**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L297)

Determines whether or not to use an Axis to display bucket scales (both "buckets" and "jenks"). When set to `false`, bucketed scales will use the `Legend` class to display squares for each range of data. When set to `true`, bucketed scales will be displayed on an `Axis`, similar to "linear" scales.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.color" href="#ColorScale.color">#</a> ColorScale.**color**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L307)

Defines the color or colors to be used for the scale. If only a single color is given as a String, then the scale is interpolated by lightening that color. Otherwise, the function expects an Array of color values to be used in order for the scale.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.data" href="#ColorScale.data">#</a> ColorScale.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L317)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape key will be drawn for each object in the array.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.duration" href="#ColorScale.duration">#</a> ColorScale.**duration**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L327)

If *value* is specified, sets the transition duration of the ColorScale and returns the current class instance. If *value* is not specified, returns the current duration.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.height" href="#ColorScale.height">#</a> ColorScale.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L337)

If *value* is specified, sets the overall height of the ColorScale and returns the current class instance. If *value* is not specified, returns the current height value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.legendConfig" href="#ColorScale.legendConfig">#</a> ColorScale.**legendConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L347)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Axis](http://d3plus.org/docs/#Axis). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.orient" href="#ColorScale.orient">#</a> ColorScale.**orient**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L357)

Sets the flow of the items inside the ColorScale. If no value is passed, the current flow will be returned.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.outerBounds" href="#ColorScale.outerBounds">#</a> ColorScale.**outerBounds**() [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L367)

If called after the elements have been drawn to DOM, will returns the outer bounds of the ColorScale content.


This is a static method of [<code>ColorScale</code>](#ColorScale).


```js
{"width": 180, "height": 24, "x": 10, "y": 20}
```


<a name="ColorScale.padding" href="#ColorScale.padding">#</a> ColorScale.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L377)

If *value* is specified, sets the padding between each key to the specified number and returns the current class instance. If *value* is not specified, returns the current padding value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.rectConfig" href="#ColorScale.rectConfig">#</a> ColorScale.**rectConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L387)

The [ColorScale](http://d3plus.org/docs/#ColorScale) is constructed by combining an [Axis](http://d3plus.org/docs/#Axis) for the ticks/labels and a [Rect](http://d3plus.org/docs/#Rect) for the actual color box (or multiple boxes, as in a jenks scale). Because of this, there are separate configs for the [Axis](http://d3plus.org/docs/#Axis) class used to display the text ([axisConfig](http://d3plus.org/docs/#ColorScale.axisConfig)) and the [Rect](http://d3plus.org/docs/#Rect) class used to draw the color breaks ([rectConfig](http://d3plus.org/docs/#ColorScale.rectConfig)). This method acts as a pass-through to the config method of the [Rect](http://d3plus.org/docs/#Rect). An example usage of this method can be seen [here](http://d3plus.org/examples/d3plus-legend/colorScale-dark/).


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.scale" href="#ColorScale.scale">#</a> ColorScale.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L397)

If *value* is specified, sets the scale of the ColorScale and returns the current class instance. If *value* is not specified, returns the current scale value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.select" href="#ColorScale.select">#</a> ColorScale.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L407)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.size" href="#ColorScale.size">#</a> ColorScale.**size**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L417)

The height of horizontal color scales, and width when positioned vertical.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


<a name="ColorScale.value" href="#ColorScale.value">#</a> ColorScale.**value**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L431)

If *value* is specified, sets the value accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current value accessor.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.


```js
function value(d) {
  return d.value;
}
```


<a name="ColorScale.width" href="#ColorScale.width">#</a> ColorScale.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-legend/blob/master/src/ColorScale.js#L441)

If *value* is specified, sets the overall width of the ColorScale and returns the current class instance. If *value* is not specified, returns the current width value.


This is a static method of [<code>ColorScale</code>](#ColorScale), and is chainable with other methods of this Class.

