---
name: Geomap
kind: class
---

  <a name="Geomap"></a>

### **Geomap** [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L14)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Geomap](#Geomap) ⇐ <code>Viz</code>
    * [new Geomap()](#new_Geomap_new)
    * [.fitFilter([*value*])](#Geomap.fitFilter) ↩︎
    * [.fitKey(*value*)](#Geomap.fitKey) ↩︎
    * [.fitObject(*data*, [*formatter*])](#Geomap.fitObject) ↩︎
    * [.ocean([*value*])](#Geomap.ocean) ↩︎
    * [.padding([*value*])](#Geomap.padding) ↩︎
    * [.point([*value*])](#Geomap.point) ↩︎
    * [.pointSize([*value*])](#Geomap.pointSize) ↩︎
    * [.pointSizeMax([*value*])](#Geomap.pointSizeMax) ↩︎
    * [.pointSizeMin([*value*])](#Geomap.pointSizeMin) ↩︎
    * [.tiles([*value*])](#Geomap.tiles) ↩︎
    * [.topojson(*data*, [*formatter*])](#Geomap.topojson) ↩︎
    * [.topojsonFilter([*value*])](#Geomap.topojsonFilter) ↩︎
    * [.topojsonKey(*value*)](#Geomap.topojsonKey) ↩︎
    * [.topojsonId(*value*)](#Geomap.topojsonId) ↩︎
    * [.zoom([*value*])](#Geomap.zoom) ↩︎


<a name="new_Geomap_new" href="#new_Geomap_new">#</a> new **Geomap**()

Creates a geographical map with zooming, panning, image tiles, and the ability to layer choropleth paths and coordinate points. See [this example](https://d3plus.org/examples/d3plus-geomap/getting-started/) for help getting started.





<a name="Geomap.fitFilter" href="#Geomap.fitFilter">#</a> Geomap.**fitFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L602)

Topojson files sometimes include small geographies that negatively impact how the library determines the default zoom level (for example, a small island or territory far off the coast that is barely visible to the eye). The fitFilter method can be used to remove specific geographies from the logic used to determine the zooming.

The *value* passed can be a single id to remove, an array of ids, or a filter function. Take a look at the [Choropleth Example](http://d3plus.org/examples/d3plus-geomap/getting-started/) to see it in action.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.fitKey" href="#Geomap.fitKey">#</a> Geomap.**fitKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L619)

If the topojson being used to determine the zoom fit (either the main [topojson](#Geomap.topojson) object or the [fitObject](#Geomap.fitObject)) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use for the zoom fit.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.fitObject" href="#Geomap.fitObject">#</a> Geomap.**fitObject**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L632)

The topojson to be used for the initial projection [fit extent](https://github.com/d3/d3-geo#projection_fitExtent). The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function needs to return the final Topojson *Object*.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = `undefined` |
| [*formatter*] | <code>function</code> |  |



<a name="Geomap.ocean" href="#Geomap.ocean">#</a> Geomap.**ocean**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L642)

The color visible behind any shapes drawn on the map projection. By default, a color value matching the color used in the map tiles is used to help mask the loading time needed to render the tiles. Any value CSS color value may be used, including hexidecimal, rgb, rgba, and color strings like `"blue"` and `"transparent"`.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.padding" href="#Geomap.padding">#</a> Geomap.**padding**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L652)

The outer padding between the edge of the visualization and the shapes drawn. The value passed can be either a single number to be used on all sides, or a CSS string pattern (ie. `"20px 0 10px"`).


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.point" href="#Geomap.point">#</a> Geomap.**point**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L662)

The accessor to be used when detecting coordinate points in the objects passed to the [data](https://d3plus.org/docs/#Viz.data) method. Values are expected to be in the format `[longitude, latitude]`, which is in-line with d3's expected coordinate mapping.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSize" href="#Geomap.pointSize">#</a> Geomap.**pointSize**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L672)

The accessor or static value to be used for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSizeMax" href="#Geomap.pointSizeMax">#</a> Geomap.**pointSizeMax**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L682)

The maximum pixel radius used in the scale for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.pointSizeMin" href="#Geomap.pointSizeMin">#</a> Geomap.**pointSizeMin**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L692)

The minimum pixel radius used in the scale for sizing coordinate points.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.tiles" href="#Geomap.tiles">#</a> Geomap.**tiles**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L702)

Toggles the visibility of the map tiles.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojson" href="#Geomap.topojson">#</a> Geomap.**topojson**(*data*, [*formatter*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L715)

The topojson to be used for drawing geographical paths. The value passed should either be a valid Topojson *Object* or a *String* representing a filepath or URL to be loaded.

Additionally, a custom formatting function can be passed as a second argument to this method. This custom function will be passed the data that has been loaded, as long as there are no errors. This function should return the final Topojson *Obejct*.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

| Param | Type | Description |
| --- | --- | --- |
| *data* | <code>Object</code> \| <code>String</code> | = [] |
| [*formatter*] | <code>function</code> |  |



<a name="Geomap.topojsonFilter" href="#Geomap.topojsonFilter">#</a> Geomap.**topojsonFilter**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L725)

If the [topojson](#Geomap.topojson) being used contains boundaries that should not be shown, this method can be used to filter them out of the final output. The *value* passed can be a single id to remove, an array of ids, or a filter function.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojsonKey" href="#Geomap.topojsonKey">#</a> Geomap.**topojsonKey**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L742)

If the [topojson](#Geomap.topojson) contains multiple geographical sets (for example, a file containing state and county boundaries), use this method to indentify which set to use.

If not specified, the first key in the *Array* returned from using `Object.keys` on the topojson will be used.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.topojsonId" href="#Geomap.topojsonId">#</a> Geomap.**topojsonId**(*value*) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L752)

The accessor used to map each topojson geometry to it's corresponding [data](https://d3plus.org/docs/#Viz.data) point.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.


<a name="Geomap.zoom" href="#Geomap.zoom">#</a> Geomap.**zoom**([*value*]) [<>](https://github.com/d3plus/d3plus-geomap/blob/master/src/Geomap.js#L762)

Toggles the ability to zoom/pan the map.


This is a static method of [<code>Geomap</code>](#Geomap), and is chainable with other methods of this Class.

